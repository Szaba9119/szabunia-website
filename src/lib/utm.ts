// Przechwytywanie parametrów UTM/gclid z URL wejściowego i przekazywanie ich
// do leadów (formularz kontaktowy, lead magnet), żeby wiedzieć skąd przyszło
// zapytanie. Zapis i odczyt tylko po zgodzie; odmowa usuwa wcześniejszy zapis.
import { hasAnalyticsConsent } from "@/lib/consent";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  // Google Ads wysyła `wbraid` i `gbraid` ZAMIAST `gclid` w kontekstach
  // z ograniczeniami prywatności (ruch z aplikacji, część ścieżek iOS).
  // Bez nich taki lead przychodzi bez bloku „Źródło" i w skrzynce wygląda
  // dokładnie jak organiczny: zaniża Ads, zawyża organic (audyt PELNY2608-35).
  "wbraid",
  "gbraid",
  "landing_page",
  "referrer",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];
export type UtmData = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "utm_data";

/** Zapisuje parametry UTM/gclid z bieżącego URL do sessionStorage (jeśli są obecne). */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* Storage unavailable. */ }
    return;
  }
  const params = new URLSearchParams(window.location.search);
  const found: UtmData = {};
  let hasAny = false;
  for (const key of UTM_KEYS) {
    if (key === "landing_page" || key === "referrer") continue;
    const value = params.get(key);
    if (value) {
      found[key] = value.slice(0, 200);
      hasAny = true;
    }
  }
  try {
    // Pierwsza strona po zgodzie, bez query mogącego zawierać dane osobowe.
    const previous = getUtmParams();
    found.landing_page = previous.landing_page ?? window.location.pathname;
    if (document.referrer) {
      const referrer = new URL(document.referrer);
      found.referrer = previous.referrer ?? referrer.origin;
    }
    if (!hasAny && previous.landing_page) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // sessionStorage niedostępny (tryb prywatny / limit) — pomijamy bez błędu
  }
}

/** Odczytuje wcześniej przechwycone parametry UTM/gclid dla tej sesji (jeśli są). */
export function getUtmParams(): UtmData {
  if (!hasAnalyticsConsent()) return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(UTM_KEYS.flatMap((key) => {
      const value = (parsed as Record<string, unknown>)[key];
      return typeof value === "string" ? [[key, value.slice(0, 200)]] : [];
    })) as UtmData;
  } catch {
    return {};
  }
}
