"use client";

import { useState, useEffect } from "react";
import { updateAnalyticsConsent } from "@/lib/gtag";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    updateAnalyticsConsent(true);
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    updateAnalyticsConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Informacja o plikach cookie"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border shadow-xl shadow-navy/10 dark:shadow-black/30 p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] text-text-body dark:text-dark-text leading-relaxed">
            Ta strona korzysta z plików cookie w celu zapewnienia prawidłowego
            działania, analizy ruchu i pomiaru skuteczności reklam.{" "}
            <a
              href="/polityka-prywatnosci"
              className="text-blue dark:text-blue-light underline hover:no-underline"
            >
              Polityka prywatności
            </a>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-[13px] font-barlow font-semibold text-steel dark:text-dark-text-muted hover:text-navy dark:hover:text-white border border-border dark:border-dark-border rounded-xl transition-colors"
          >
            Odrzuć
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-[13px] font-barlow font-semibold text-white bg-gradient-to-br from-blue to-blue-light rounded-xl hover:scale-[1.02] transition-transform"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
