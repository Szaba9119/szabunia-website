import { NextResponse } from "next/server";

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

export async function POST(req: Request) {
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

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const service = String(data.service ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name || !email) {
    return NextResponse.json({ error: "Brak wymaganych pól" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY nie jest ustawiony.");
    return NextResponse.json(
      { error: "Usługa e-mail nie jest skonfigurowana" },
      { status: 500 }
    );
  }

  const html = `
    <h2>Nowe zgłoszenie z formularza szabunia.pl</h2>
    <p><strong>Imię / firma:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone) || "—"}</p>
    <p><strong>Usługa:</strong> ${escapeHtml(service) || "—"}</p>
    <p><strong>Wiadomość:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>") || "—"}</p>
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Błąd /api/contact:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
