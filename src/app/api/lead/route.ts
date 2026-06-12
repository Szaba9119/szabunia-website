import { NextResponse } from "next/server";

// Zapis na lead magnet (darmowy poradnik) — wysyłka maili przez Resend REST API
// (bez dodatkowej paczki npm). Wymagana zmienna: RESEND_API_KEY.
// Opcjonalne: CONTACT_TO_EMAIL (powiadomienie dla Marcina), CONTACT_FROM_EMAIL (nadawca).
export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const SITE = "https://szabunia.pl";
const PDF_URL = `${SITE}/poradnik-przygotowanie-do-sesji.pdf`;
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

  const email = String(data.email ?? "").trim();
  if (!email || !isEmail(email)) {
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

  // 1) Mail do subskrybenta — link do poradnika.
  const guideHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#334155;max-width:520px;line-height:1.55">
      <h2 style="color:#0F172A;margin:0 0 12px">Twój pakiet przygotowania do sesji</h2>
      <p>Cześć! Dzięki za pobranie poradnika. Znajdziesz w nim checklisty, planer stylizacji, ściągę kolorów i mini-brief — wszystko, żeby wejść na plan spokojnie i z głową.</p>
      <p style="margin:22px 0">
        <a href="${PDF_URL}" style="background:#2563EB;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold;display:inline-block">Pobierz poradnik (PDF)</a>
      </p>
      <p style="font-size:13px;color:#64748B">Gdyby przycisk nie działał, skopiuj ten link do przeglądarki:<br>
        <a href="${PDF_URL}" style="color:#2563EB">${PDF_URL}</a>
      </p>
      <p>Masz pytanie o przygotowanie albo chcesz umówić sesję? Po prostu odpisz na tego maila — odpowiadam osobiście.</p>
      <p style="margin-top:24px">Marcin Szabunia<br>
        <span style="color:#64748B;font-size:13px">Fotograf biznesowy i twórca wideo · szabunia.pl</span>
      </p>
    </div>
  `;

  try {
    const guideRes = await sendEmail(apiKey, {
      from: FROM,
      to: [email],
      reply_to: TO,
      subject: "Twój pakiet przygotowania do sesji — link do pobrania",
      html: guideHtml,
    });

    if (!guideRes.ok) {
      const detail = await guideRes.text();
      console.error("Resend error (guide):", guideRes.status, detail);
      return NextResponse.json({ error: "Nie udało się wysłać" }, { status: 502 });
    }

    // 2) Powiadomienie do Marcina — best-effort, nie blokuje sukcesu.
    try {
      await sendEmail(apiKey, {
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Nowy zapis na poradnik: ${email}`,
        html: `<h2>Nowy zapis na poradnik</h2><p><strong>E-mail:</strong> ${escapeHtml(
          email
        )}</p>`,
      });
    } catch (notifyErr) {
      console.error("Resend notify error:", notifyErr);
    }

    // Zapis do CRM — best-effort, nie blokuje sukcesu.
    try {
      await pushToCrm({ name: "", email, source: "lead-magnet" });
    } catch (crmErr) {
      console.error("CRM webhook error:", crmErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Błąd /api/lead:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
