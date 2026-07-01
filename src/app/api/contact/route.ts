import { NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";

// Wysyłka maili przez Resend REST API (bez dodatkowej paczki npm).
// Wymagana zmienna środowiskowa: RESEND_API_KEY
// Opcjonalne: CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO = process.env.CONTACT_TO_EMAIL || "marcin.szabunia@gmail.com";
const FROM =
  process.env.CONTACT_FROM_EMAIL || "Formularz szabunia.pl <onboarding@resend.dev>";

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

// Best-effort zapis leada do CRM (Google Sheets, Apps Script webhook).
// Wymaga: CRM_WEBHOOK_URL + CRM_WEBHOOK_SECRET. Brak zmiennych = no-op.
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

export async function POST(req: Request) {
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

  // Źródło ruchu (UTM/gclid) — opcjonalne, przechwycone z URL wejściowego (src/lib/utm.ts).
  const UTM_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;
  const utm: Record<string, string> = {};
  for (const key of UTM_FIELDS) {
    const value = String(data[key] ?? "").trim();
    if (value) utm[key] = value;
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
    inne: "Inne zapytanie",
  };
  const serviceLabel = SERVICE_LABELS[service] ?? service;

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

  const utmHtml = Object.keys(utm).length
    ? `<p><strong>Źródło:</strong> ${escapeHtml(
        Object.entries(utm)
          .map(([k, v]) => `${k}: ${v}`)
          .join(" · ")
      )}</p>`
    : "";

  const html = `
    <h2>Nowe zgłoszenie z formularza szabunia.pl</h2>
    <p><strong>Imię / firma:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone) || "—"}</p>
    <p><strong>Usługa:</strong> ${escapeHtml(serviceLabel) || "—"}</p>
    <p><strong>Wiadomość:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>") || "—"}</p>
    ${utmHtml}
  `;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Nowe zapytanie ze strony: ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", res.status, detail);
      return NextResponse.json({ error: "Nie udało się wysłać" }, { status: 502 });
    }

    // Zapis do CRM — best-effort, nie blokuje sukcesu formularza.
    try {
      await pushToCrm({ name, email, phone, service, message, source: "contact", ...utm });
    } catch (crmErr) {
      console.error("CRM webhook error:", crmErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Błąd /api/contact:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
