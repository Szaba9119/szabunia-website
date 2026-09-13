// Wspólna decyzja dla zdarzeń i atrybucji. Brak dostępu do storage = brak zgody.
let sessionChoice: boolean | undefined;

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  if (sessionChoice !== undefined) return sessionChoice;
  try {
    return localStorage.getItem("cookie-consent") === "accepted";
  } catch {
    return false;
  }
}

export function setSessionConsent(granted: boolean): void {
  sessionChoice = granted;
  window.dispatchEvent(new Event("analytics-consent-change"));
}
