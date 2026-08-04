import { NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { isAllowedOrigin } from "@/lib/origin";
import { escapeHtml, isEmail, sendEmail, utmHtmlBlock, MAIL_FROM, NOTIFY_TO } from "@/lib/mail";
import { pushToCrm } from "@/lib/crm";

// Wysyłka maili przez Resend REST API (bez dodatkowej paczki npm).
// Wymagana zmienna środowiskowa: RESEND_API_KEY
// Opcjonalne: CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
export const runtime = "nodejs";

const TO = NOTIFY_TO;
const FROM = MAIL_FROM;


// Treść klauzuli zgody obowiązująca na formularzu kontaktowym. Musi być
// zgodna z etykietą w src/components/CTA.tsx (CONSENT_TEXT). Wersjonujemy datą,
// żeby po zmianie treści dało się odtworzyć, na co zgadzał się dany lead.
const CONSENT_TEXT =
  "v2026-07-29: Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie, zgodnie z polityką prywatności.";

export async function POST(req: Request) {
  // Odcięcie żądań z obcych originów przed jakąkolwiek pracą (audyt PELNY2907-44).
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: "Nieprawidłowe żądanie" }, { status: 403 });
  }

  const ip = getClientIp(req);
  if (await isRateLimited(ip)) {
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

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const service = String(data.service ?? "").trim();
  const message = String(data.message ?? "").trim();

  // Twarde limity długości pól — chronią przed wielomegabajtowym payloadem
  // i nadużyciem maila jako przekaźnika treści (realne dane nigdy ich nie tkną).
  const LIMITS = { name: 200, email: 320, phone: 50, service: 100, message: 5000 } as const;
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    phone.length > LIMITS.phone ||
    service.length > LIMITS.service ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json({ error: "Treść pola jest zbyt długa" }, { status: 400 });
  }

  // Źródło ruchu (UTM/gclid) — opcjonalne, przechwycone z URL wejściowego (src/lib/utm.ts).
  const UTM_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;
  const utm: Record<string, string> = {};
  for (const key of UTM_FIELDS) {
    const value = String(data[key] ?? "").trim();
    if (value) utm[key] = value.slice(0, 200);
  }

  // Kod usługi z dropdowna → czytelna nazwa w mailu (żeby lead był jasny).
  const SERVICE_LABELS: Record<string, string> = {
    wizerunek: "Portrety biznesowe / Headshoty",
    zespol: "Sesje zespołowe",
    produkt: "Fotografia produktowa / przemysłowa",
    event: "Reportaż z eventu",
    wideo: "Wideo marketing",
    pakiet: "Pakiet foto + wideo",
    dron: "Zdjęcia i wideo z drona",
    // TRESC2608-03 (04.08.2026): bez tej linii wysyłka formularza z ósmą usługą
    // kończyła się błędem 400 „Nieznany rodzaj usługi" (twarda lista niżej).
    obiekty: "Fotografia hal, obiektów i wnętrz",
    inne: "Inne zapytanie",
  };
  // Twarda lista kodów usług — bez niej pole `service` przyjmowało dowolne
  // 100 znaków i trafiało do maila jako „kategoria z listy" (audyt PELNY2907-21).
  if (service && !(service in SERVICE_LABELS)) {
    return NextResponse.json({ error: "Nieznany rodzaj usługi" }, { status: 400 });
  }
  const serviceLabel = SERVICE_LABELS[service] ?? service;

  // Zgoda RODO — walidowana po stronie serwera; bez niej żądanie złożone poza
  // formularzem przechodziło bez śladu zgody (audyt PELNY2907-07).
  // Treść klauzuli i znacznik czasu ustala SERWER, nie klient — inaczej „dowód"
  // byłby w całości sterowany przez wysyłającego i nic by nie znaczył.
  if (data.consent !== true) {
    return NextResponse.json({ error: "Wymagana jest zgoda na przetwarzanie danych" }, { status: 400 });
  }
  const consentText = CONSENT_TEXT;
  const consentTs = new Date().toISOString();

  if (!name || !email) {
    return NextResponse.json({ error: "Brak wymaganych pól" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "Podaj poprawny adres e-mail" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY nie jest ustawiony.");
    return NextResponse.json(
      { error: "Usługa e-mail nie jest skonfigurowana" },
      { status: 500 }
    );
  }

  const utmHtml = utmHtmlBlock(utm);

  const html = `
    <h2>Nowe zgłoszenie z formularza szabunia.pl</h2>
    <p><strong>Imię / firma:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone) || "—"}</p>
    <p><strong>Usługa:</strong> ${escapeHtml(serviceLabel) || "—"}</p>
    <p><strong>Wiadomość:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>") || "—"}</p>
    <p><strong>Zgoda RODO:</strong> TAK${consentTs ? `, ${escapeHtml(consentTs)}` : ""}${
      consentText ? `<br><em>${escapeHtml(consentText)}</em>` : ""
    }</p>
    ${utmHtml}
  `;

  // Zapis do CRM PRZED wysyłką maila — best-effort. Wcześniej `pushToCrm`
  // stało w gałęzi sukcesu, więc awaria Resend kasowała leada z obu kanałów
  // naraz (audyt PELNY2907-14). CRM jest niezależną usługą i może go uratować.
  void pushToCrm({ name, email, phone, service, message, source: "contact", consent: consentTs, ...utm }).catch(
    (crmErr) => console.error("CRM webhook error:", crmErr)
  );

  try {
    const res = await sendEmail(apiKey, {
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Nowe zapytanie ze strony: ${name}`,
      html,
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", res.status, detail);
      return NextResponse.json({ error: "Nie udało się wysłać" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Błąd /api/contact:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
