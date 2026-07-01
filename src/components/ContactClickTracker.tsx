"use client";

import { useEffect } from "react";
import { gtagEvent } from "@/lib/gtag";
import { captureUtmParams } from "@/lib/utm";

/**
 * Globalny pomiar kliknięć w linki tel: i mailto: (GA4: phone_click / email_click)
 * oraz jednorazowe przechwycenie parametrów UTM/gclid z URL wejściowego (żeby
 * dało się je dołączyć do leada niezależnie od tego, na której podstronie
 * użytkownik ostatecznie wyśle formularz).
 * Jeden listener na document zamiast onClick w każdym komponencie z linkiem
 * kontaktowym (CTA, Footer, /kontakt, podstrony usług).
 */
export default function ContactClickTracker() {
  useEffect(() => {
    captureUtmParams();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        gtagEvent("phone_click", { link_url: href });
      } else if (href.startsWith("mailto:")) {
        gtagEvent("email_click", { link_url: href });
      }
      // Kliknięcia CTA lejka (atrybut data-cta) — działa też na linkach
      // renderowanych po stronie serwera, bez onClick w każdym komponencie.
      const cta = anchor.getAttribute("data-cta");
      if (cta) {
        gtagEvent("cta_click", { cta, link_url: href });
      }
    };
    document.addEventListener("click", handler, { capture: true, passive: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
}
