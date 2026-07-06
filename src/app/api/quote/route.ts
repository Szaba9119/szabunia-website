import { NextResponse } from "next/server";
import { getClientIp, isQuoteRateLimited } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";

// "Wyślij wycenę na maila" na /kalkulator — lżejsza alternatywa dla pełnego formularza
// kontaktowego: wystarczy e-mail, dostaje policzoną cenę + konfigurację, Marcin dostaje
// powiadomienie. Wysyłka przez Resend REST API. Wymagana zmienna: RESEND_API_KEY.
export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO = process.env.CONTACT_TO_EMAIL || "marcin.szabunia@gmail.com";
const FROM =
  process.env.CONTACT_FROM_EMAIL || "Marcin Szabunia <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function pushToCrm(lead: Record<string, string>): Promise<void> {
  const url = process.env.CRM_WEBHOOK_URL;
  const secret = process.env.CRM_WEBHOOK_SECRET;
  if (!url || !secret) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...lead, secret }),
    signal: AbortSignal.timeout(5000),
  });
}

async function sendEmail(
  apiKey: string,
  payload: Record<string, unknown>
): Promise<Response> {
  return fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (await isQuoteRateLimited(ip)) {
    return NextResponse.json(
      { error: "Zbyt wiele prób. Spróbuj ponownie za chwilę." },
      { status: 429 }
    );
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane" }, { status: 400 });
  }

  // Honeypot — boty wypełniają to pole; udajemy sukces i nic nie wysyłamy.
  if (typeof data._gotcha === "string" && data._gotcha.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const turnstileOk = await verifyTurnstile(String(data.turnstileToken ?? ""), ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "Weryfikacja nie powiodła się. Odśwież stronę i spróbuj ponownie." },
      { status: 400 }
    );
  }

  const email = String(data.email ?? "").trim();
  if (!email || !isEmail(email)) {
    return NextResponse.json(
      { error: "Podaj poprawny adres e-mail" },
      { status: 400 }
    );
  }

  const service = String(data.service ?? "").trim();
  const configSummary = String(data.configSummary ?? "").trim();
  const priceLabel = String(data.priceLabel ?? "").trim();

  // Twarde limity długości — ten route wysyła mail NA ADRES PODANY PRZEZ
  // UŻYTKOWNIKA, więc bez limitów działałby jak przekaźnik dowolnej treści.
  // Realne payloady z kalkulatora są o rząd wielkości mniejsze.
  if (email.length > 320 || service.length > 120 || configSummary.length > 2000 || priceLabel.length > 100) {
    return NextResponse.json({ error: "Treść pola jest zbyt długa" }, { status: 400 });
  }

  const UTM_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;
  const utm: Record<string, string> = {};
  for (const key of UTM_FIELDS) {
    const value = String(data[key] ?? "").trim();
    if (value) utm[key] = value.slice(0, 200);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY nie jest ustawiony.");
    return NextResponse.json(
      { error: "Usługa e-mail nie jest skonfigurowana" },
      { status: 500 }
    );
  }

  const configLines = configSummary
    .split("\n")
    .map((line) => `<p style="margin:2px 0">${escapeHtml(line)}</p>`)
    .join("");

  const quoteHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#334155;max-width:520px;line-height:1.55">
      <h2 style="color:#0F172A;margin:0 0 12px">Twoja szacunkowa wycena</h2>
      <div style="background:#F9FAFB;border-radius:8px;padding:16px;margin:16px 0">
        ${configLines}
        <p style="font-weight:bold;font-size:18px;color:#0F172A;margin-top:10px">${escapeHtml(priceLabel)}</p>
      </div>
      <p>To wycena szacunkowa. Ostateczną cenę potwierdzam po krótkim briefie — wystarczy odpisać na tego maila albo napisać na marcin@szabunia.pl.</p>
      <p style="margin-top:24px">Marcin Szabunia<br>
        <span style="color:#64748B;font-size:13px">Fotograf biznesowy i twórca wideo · szabunia.pl</span>
      </p>
    </div>
  `;

  try {
    const quoteRes = await sendEmail(apiKey, {
      from: FROM,
      to: [email],
      reply_to: TO,
      subject: "Twoja szacunkowa wycena — szabunia.pl",
      html: quoteHtml,
    });

    if (!quoteRes.ok) {
      const detail = await quoteRes.text();
      console.error("Resend error (quote):", quoteRes.status, detail);
      return NextResponse.json({ error: "Nie udało się wysłać" }, { status: 502 });
    }

    try {
      const utmHtml = Object.keys(utm).length
        ? `<p><strong>Źródło:</strong> ${escapeHtml(
            Object.entries(utm)
              .map(([k, v]) => `${k}: ${v}`)
              .join(" · ")
          )}</p>`
        : "";
      await sendEmail(apiKey, {
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Wycena z kalkulatora wysłana na maila: ${email}`,
        html: `<h2>Ktoś poprosił o wycenę mailem z kalkulatora</h2><p><strong>E-mail:</strong> ${escapeHtml(
          email
        )}</p><p><strong>Usługa:</strong> ${escapeHtml(service)}</p>${configLines}<p><strong>Kwota:</strong> ${escapeHtml(priceLabel)}</p>${utmHtml}`,
      });
    } catch (notifyErr) {
      console.error("Resend notify error:", notifyErr);
    }

    try {
      await pushToCrm({ name: "", email, source: "calculator-quote", service, ...utm });
    } catch (crmErr) {
      console.error("CRM webhook error:", crmErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Błąd /api/quote:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
