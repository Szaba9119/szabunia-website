import { NextResponse } from "next/server";
import { getClientIp, isLeadRateLimited } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { isAllowedOrigin } from "@/lib/origin";
import { escapeHtml, isEmail, sendEmail, utmHtmlBlock, MAIL_FROM, NOTIFY_TO } from "@/lib/mail";
import { pushToCrm } from "@/lib/crm";

// Zapis na lead magnet (darmowy poradnik) — wysyłka maili przez Resend REST API
// (bez dodatkowej paczki npm). Wymagana zmienna: RESEND_API_KEY.
// Opcjonalne: CONTACT_TO_EMAIL (powiadomienie dla Marcina), CONTACT_FROM_EMAIL (nadawca).
export const runtime = "nodejs";

const SITE = "https://szabunia.pl";
const PDF_URL = `${SITE}/poradnik-przygotowanie-do-sesji.pdf`;
const TO = NOTIFY_TO;
const FROM = MAIL_FROM;


// Treść klauzuli zgody marketingowej z formularza poradnika. Musi być zgodna
// z etykietą w src/components/PoradnikForm.tsx. Wersjonujemy datą.
const CONSENT_TEXT =
  "v2026-07-29: Wyrażam zgodę na przetwarzanie mojego adresu e-mail w celu wysłania poradnika oraz okazjonalnych wskazówek związanych z sesją, zgodnie z polityką prywatności.";

export async function POST(req: Request) {
  // Odcięcie żądań z obcych originów przed jakąkolwiek pracą (audyt PELNY2907-44).
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: "Nieprawidłowe żądanie" }, { status: 403 });
  }

  const ip = getClientIp(req);
  if (await isLeadRateLimited(ip)) {
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

  if (data.consent !== true) {
    return NextResponse.json({ error: "Wymagana jest zgoda na przetwarzanie danych" }, { status: 400 });
  }
  const consentTs = new Date().toISOString();

  const email = String(data.email ?? "").trim();
  if (!email || email.length > 320 || !isEmail(email)) {
    return NextResponse.json(
      { error: "Podaj poprawny adres e-mail" },
      { status: 400 }
    );
  }

  // Źródło ruchu (UTM/gclid) — opcjonalne, przechwycone z URL wejściowego (src/lib/utm.ts).
  // Limit 200 zn./pole — ochrona przed sztucznie napompowanym payloadem.
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

  // 1) Mail do subskrybenta — link do poradnika.
  const guideHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#334155;max-width:520px;line-height:1.55">
      <h2 style="color:#0F172A;margin:0 0 12px">Twój pakiet przygotowania do sesji</h2>
      <p>Cześć! Dzięki za pobranie poradnika. Znajdziesz w nim checklisty, planer stylizacji, ściągę kolorów i mini-brief: wszystko, żeby wejść na plan spokojnie i z głową.</p>
      <p style="margin:22px 0">
        <a href="${PDF_URL}" style="background:#2563EB;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold;display:inline-block">Pobierz poradnik (PDF)</a>
      </p>
      <p style="font-size:13px;color:#64748B">Gdyby przycisk nie działał, skopiuj ten link do przeglądarki:<br>
        <a href="${PDF_URL}" style="color:#2563EB">${PDF_URL}</a>
      </p>
      <p>Masz pytanie o przygotowanie albo chcesz umówić sesję? Po prostu odpisz na tego maila, odpowiadam osobiście.</p>
      <p style="margin-top:24px">Marcin Szabunia<br>
        <span style="color:#64748B;font-size:13px">Fotograf biznesowy i twórca wideo · szabunia.pl</span>
      </p>
    </div>
  `;

  // Kolejność odwrócona po audycie PELNY2907-15: najpierw powiadomienie do
  // Marcina i zapis do CRM, dopiero potem mail z poradnikiem do subskrybenta.
  // Wcześniej odbicie maila do subskrybenta kończyło się 502 i Marcin nie
  // dowiadywał się nawet, że ktoś próbował pobrać poradnik.
  try {
    const utmHtml = utmHtmlBlock(utm);
    await sendEmail(apiKey, {
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Nowy zapis na poradnik: ${email}`,
      html: `<h2>Nowy zapis na poradnik</h2><p><strong>E-mail:</strong> ${escapeHtml(
        email
      )}</p><p><strong>Zgoda marketingowa:</strong> TAK, ${escapeHtml(consentTs)}<br><em>${escapeHtml(
        CONSENT_TEXT
      )}</em></p>${utmHtml}`,
    });
  } catch (notifyErr) {
    console.error("Resend notify error:", notifyErr);
  }

  try {
    await pushToCrm({ name: "", email, source: "lead-magnet", consent: consentTs, ...utm });
  } catch (crmErr) {
    console.error("CRM webhook error:", crmErr);
  }

  try {
    const guideRes = await sendEmail(apiKey, {
      from: FROM,
      to: [email],
      reply_to: TO,
      subject: "Twój pakiet przygotowania do sesji: link do pobrania",
      html: guideHtml,
    });

    if (!guideRes.ok) {
      // Lead jest już zapisany (powiadomienie + CRM wyżej), a PDF pobiera się
      // po stronie klienta — dlatego odbicie tego maila NIE wywraca całej
      // odpowiedzi. Błąd zostaje w logach z markerem do wyfiltrowania, a front
      // dostaje `guideSent: false` i nie obiecuje maila, którego nie ma.
      const detail = await guideRes.text();
      console.error("[ALERT] Resend error (guide):", guideRes.status, detail);
      return NextResponse.json({ ok: true, guideSent: false });
    }

    return NextResponse.json({ ok: true, guideSent: true });
  } catch (err) {
    console.error("Błąd /api/lead:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
