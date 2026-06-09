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

/** Zaktualizuj zgodę analityczną (wołane z banera cookie). */
export function updateAnalyticsConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  window.gtag?.("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}
