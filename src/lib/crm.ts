// Best-effort zapis leada do CRM (Google Sheets przez webhook Apps Script).
// Wydzielone z obu tras formularzowych (audyt PELNY2907-43).
//
// STAN NA 2026-07-29: `CRM_WEBHOOK_URL` i `CRM_WEBHOOK_SECRET` NIE są ustawione
// na produkcji (sprawdzone w panelu Vercel), więc ta funkcja jest tam no-opem,
// a arkusz CRM_Szabunia_2026 nie dostaje leadów ze strony. Wdrożenie webhooka
// czeka po stronie Marcina. Jeśli decyzja padnie na „nie wdrażamy", ten plik
// i jego wywołania należy usunąć — kod, który wygląda na działającą
// automatyzację, a nią nie jest, jest gorszy niż brak kodu.

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
