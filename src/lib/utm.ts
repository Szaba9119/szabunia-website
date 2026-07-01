// Przechwytywanie parametrów UTM/gclid z URL wejściowego i przekazywanie ich
// do leadów (formularz kontaktowy, lead magnet), żeby wiedzieć skąd przyszło
// zapytanie — niezależnie od GA4 (mail trafia bezpośrednio do Marcina).

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];
export type UtmData = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "utm_data";

/** Zapisuje parametry UTM/gclid z bieżącego URL do sessionStorage (jeśli są obecne). */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: UtmData = {};
  let hasAny = false;
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      found[key] = value;
      hasAny = true;
    }
  }
  if (!hasAny) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // sessionStorage niedostępny (tryb prywatny / limit) — pomijamy bez błędu
  }
}

/** Odczytuje wcześniej przechwycone parametry UTM/gclid dla tej sesji (jeśli są). */
export function getUtmParams(): UtmData {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmData) : {};
  } catch {
    return {};
  }
}
