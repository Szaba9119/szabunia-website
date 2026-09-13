/* Regression checks: execute real TypeScript with isolated mail/CRM/limiter doubles.
   Never reads .env or sends a request. Run: node scripts/verify-forms.mjs */
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
let checks = 0;
function compile(file, mocks, context = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const compiledModule = { exports: {} };
  vm.runInNewContext(code, { module: compiledModule, exports: compiledModule.exports, require: (name) => {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    throw new Error('Unexpected dependency: ' + name);
  }, Response, Request, URL, URLSearchParams, Event, console: { error: () => {} }, process: { env: { RESEND_API_KEY: 'test-only' } }, ...context }, { filename: file });
  return compiledModule.exports;
}
async function run(kind, payload, options = {}) {
  const sent = [], alerts = [];
  const mail = compile('src/lib/mail.ts', {});
  mail.sendEmail = async (_key, data) => { sent.push(data); if (options.throwGuide && sent.length === 2) throw Error('offline'); return new Response('', { status: (options.statuses || [])[sent.length - 1] || 200 }); };
  const route = compile(`src/app/api/${kind}/route.ts`, {
    'next/server': { NextResponse: { json: (body, init) => Response.json(body, init) } },
    '@/lib/origin': { isAllowedOrigin: () => options.origin !== false },
    '@/lib/ratelimit': { getClientIp: () => 'test', isRateLimited: limit, isLeadRateLimited: limit },
    '@/lib/turnstile': { verifyTurnstile: async () => options.captcha !== false },
    '@/lib/mail': mail, '@/lib/crm': { pushToCrm: async () => {} },
  }, { console: { error: (...args) => alerts.push(args.join(' ')) } });
  async function limit() { if (options.limiterError) throw Error('offline'); return !!options.limited; }
  const response = await route.POST(new Request('http://localhost/api/' + kind, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
  return { status: response.status, body: await response.json(), sent, alerts };
}
(async () => {
  const valid = { name: 'Test <script>', email: 'test@example.com', service: 'wizerunek', consent: true, message: 'Test & check' };
  for (const kind of ['contact', 'lead']) {
    for (const payload of [null, [], 'text', 12, false, { ...valid, email: ['test@example.com'] }, { ...valid, consent: false }]) {
      const r = await run(kind, payload); assert.equal(r.status, 400); assert.equal(r.sent.length, 0); checks++;
    }
    for (const [options, status] of [[{ origin: false },403], [{ limited:true },429], [{ limiterError:true },503], [{ captcha:false },400]]) {
      const r = await run(kind, valid, options); assert.equal(r.status,status); assert.equal(r.sent.length,0); checks++;
    }
    const bot = await run(kind, { ...valid, _gotcha: 'spam' }); assert.equal(bot.status,200); assert.equal(bot.sent.length,0); assert.equal(kind === 'contact' ? bot.body.sent : bot.body.accepted,false); checks++;
  }
  for (const service of ['toString','constructor','__proto__','unknown']) { const r = await run('contact',{...valid,service}); assert.equal(r.status,400); assert.equal(r.sent.length,0); checks++; }
  const contact = await run('contact',valid); assert.equal(contact.body.sent,true); assert.match(contact.sent[0].html,/Test &lt;script&gt;/); assert.match(contact.sent[0].html,/Test &amp; check/); checks++;
  assert.equal((await run('contact',valid,{statuses:[502]})).status,502); checks++;
  const notificationFailed = await run('lead',valid,{statuses:[429,200]}); assert.equal(notificationFailed.body.guideSent,true); assert.ok(notificationFailed.alerts.some(s=>s.includes('429'))); checks++;
  for (const options of [{statuses:[200,502]},{throwGuide:true}]) { const r=await run('lead',valid,options);assert.equal(r.body.accepted,true);assert.equal(r.body.guideSent,false);checks++; }
  let granted=false, storage=new Map(), events=[];
  const context={ window:{location:{search:'?utm_source=test&gclid=click',pathname:'/uslugi/fotografia-produktowa'},gtag:(...args)=>events.push(args)},document:{referrer:'https://example.com/path?private=value'},localStorage:{getItem:()=>granted?'accepted':'declined'}, sessionStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)} };
  const consent={'@/lib/consent':{hasAnalyticsConsent:()=>granted,setSessionConsent:()=>{}}};
  const utm=compile('src/lib/utm.ts',consent,context); const gtag=compile('src/lib/gtag.ts',consent,context);
  utm.captureUtmParams();gtag.gtagEvent('test');assert.equal(storage.size,0);assert.equal(events.length,0);checks++;
  granted=true;utm.captureUtmParams();gtag.gtagEvent('test');assert.equal(utm.getUtmParams().gclid,'click');assert.equal(utm.getUtmParams().referrer,'https://example.com');assert.equal(events.length,1);checks++;
  granted=false;utm.captureUtmParams();gtag.gtagEvent('test');assert.equal(storage.size,0);assert.equal(Object.keys(utm.getUtmParams()).length,0);assert.equal(events.length,1);checks++;
  for (const scope of [[], 'x'.repeat(201)]) { const r=await run('contact',{...valid,scope}); assert.equal(r.status,400); assert.equal(r.sent.length,0); checks++; }
  const scoped=await run('contact',{...valid,scope:'12 <osób>'}); assert.match(scoped.sent[0].html,/12 &lt;osób&gt;/); checks++;
  const noStorage=compile('src/lib/consent.ts',{}, {window:{dispatchEvent:()=>{}},localStorage:{getItem:()=>{throw Error('blocked')}}});
  assert.equal(noStorage.hasAnalyticsConsent(),false); checks++;
  noStorage.setSessionConsent(true); assert.equal(noStorage.hasAnalyticsConsent(),true); checks++;
  noStorage.setSessionConsent(false); assert.equal(noStorage.hasAnalyticsConsent(),false); checks++;
  granted=true; context.window.location.search='?referrer=https://spoof.example/private&landing_page=/wrong'; storage.clear(); utm.captureUtmParams();
  assert.equal(utm.getUtmParams().referrer,'https://example.com'); assert.equal(utm.getUtmParams().landing_page,'/uslugi/fotografia-produktowa'); checks++;
  console.log(`PASS: ${checks} isolated form/consent regression cases; no network or messages.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
