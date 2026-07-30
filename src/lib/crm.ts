// Best-effort zapis leada do CRM (Google Sheets przez webhook Apps Script).
// Wydzielone z obu tras formularzowych (audyt PELNY2907-43).
//
// STAN NA 2026-07-30: decyzja D2/A — webhook wdrażamy. Skrypt Apps Script leży
// gotowy w `01_Biznes/_System/04_Sprzedaz/CRM_2026/webhook.gs`, instrukcja
// wdrożenia obok. Do działania potrzebne są dwie zmienne na Vercelu:
// `CRM_WEBHOOK_URL` (adres `/exec` z wdrożenia Apps Script) i `CRM_WEBHOOK_SECRET`
// (ten sam ciąg co stała SECRET w webhook.gs). Dopóki ich nie ma, funkcja jest
// cichym no-opem i arkusz nie dostaje leadów ze strony.
//
// Uwaga: `consent` i parametry UTM są wysyłane, ale arkusz nie ma na nie kolumn,
// więc webhook je ignoruje. Dowód zgody RODO żyje dziś wyłącznie w mailu z Resend.

/** Zapis leada. Brak zmiennych środowiskowych = cichy no-op (świadomie). */
export async function pushToCrm(lead: Record<string, string>): Promise<void> {
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
