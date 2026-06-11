// Cienki helper GA4 (gtag.js). Loader i consent-init są w layout.tsx.
// Zdarzenia trafiają do dataLayer niezależnie od zgody — GA respektuje
// consent mode (denied = brak cookies, pingi cookieless lub brak wysyłki).

export const GA_ID = "G-MD8FJ0CZG3";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Wyślij zdarzenie GA4 (no-op w SSR i gdy gtag nie jest załadowany). */
export function gtagEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params ?? {});
}

/** Zaktualizuj zgodę analityczną i reklamową (wołane z banera cookie).
 *  ad_storage/ad_user_data/ad_personalization są potrzebne do atrybucji
 *  konwersji Google Ads (GCLID) — bez nich Ads nie połączy leada z kliknięciem. */
export function updateAnalyticsConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  const value = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}
