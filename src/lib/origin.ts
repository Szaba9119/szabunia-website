// Sprawdzenie pochodzenia żądania dla tras /api/* (audyt PELNY2907-44).
//
// Kontekst: obie bariery antybotowe są świadomie fail-open — Turnstile przepuszcza
// przy braku klucza (src/lib/turnstile.ts), rate-limit przy braku Redisa
// (src/lib/ratelimit.ts). To dobre decyzje z osobna (awaria strony trzeciej nie ma
// kosztować leadów), ale w scenariuszu łącznym jedyną barierą zostaje honeypot,
// a po drugiej stronie stoi klucz Resend. Sprawdzenie Origin jest tanie i domyka tę lukę
// dla klasycznego nadużycia z obcej strony, które zawsze niesie nagłówek Origin.
//
// Świadomie NIE odrzucamy żądań bez Origin: nagłówek bywa pomijany przez starsze
// klienty i część proxy, a formularz ma działać. Cel to odcięcie obcych originów,
// nie budowanie szczelnej bramy.

const ALLOWED_HOSTS = new Set([
  "szabunia.pl",
  "www.szabunia.pl",
  "marcinszabunia.pl",
  "www.marcinszabunia.pl",
]);

function hostOf(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).hostname;
  } catch {
    return null;
  }
}

/** false = żądanie przyszło z obcego originu i należy je odrzucić (403). */
export function isAllowedOrigin(req: Request): boolean {
  if (process.env.NODE_ENV !== "production") return true;

  const origin = hostOf(req.headers.get("origin"));
  if (origin) return ALLOWED_HOSTS.has(origin);

  // Brak Origin (np. nawigacja klasycznym formularzem) — sprawdzamy Referer,
  // a gdy i jego nie ma, przepuszczamy.
  const referer = hostOf(req.headers.get("referer"));
  if (referer) return ALLOWED_HOSTS.has(referer);

  return true;
}
