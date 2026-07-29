// Wspólne narzędzia obu tras formularzowych (audyt PELNY2907-43).
//
// Powód wydzielenia: `escapeHtml`, `isEmail` i wysyłka przez Resend istniały
// w dwóch identycznych kopiach w `/api/contact` i `/api/lead`. Przez tę
// dywergencję poprawka dowodu zgody RODO trafiła najpierw tylko do jednego
// routu i przeszła niezauważona. Jedno źródło zamyka tę klasę błędu.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Adres odbiorcy powiadomień. Domyślnie skrzynka prywatna — na produkcji nadpisywane. */
export const NOTIFY_TO = process.env.CONTACT_TO_EMAIL || "marcin.szabunia@gmail.com";

/** Nadawca. UWAGA: domyślny `onboarding@resend.dev` to sandbox Resend, który
 *  przepuszcza maile wyłącznie na adres właściciela konta. Na produkcji
 *  `CONTACT_FROM_EMAIL` musi wskazywać zweryfikowaną domenę, inaczej mail
 *  z poradnikiem do subskrybenta się odbije (audyt PELNY2907-15). */
export const MAIL_FROM =
  process.env.CONTACT_FROM_EMAIL || "Formularz szabunia.pl <onboarding@resend.dev>";

/** Escapowanie treści od użytkownika przed wstawieniem do HTML maila.
 *  Apostrof świadomie pominięty — wartości trafiają wyłącznie do węzłów
 *  tekstowych, nigdy do atrybutów. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Wysyłka przez Resend REST API — bez dodatkowej paczki npm. */
export async function sendEmail(
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

/** Blok HTML ze źródłem ruchu (UTM/gclid) albo pusty string. */
export function utmHtmlBlock(utm: Record<string, string>): string {
  if (!Object.keys(utm).length) return "";
  return `<p><strong>Źródło:</strong> ${escapeHtml(
    Object.entries(utm)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" · ")
  )}</p>`;
}
