"use client";

import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const PHONE = "+48514900688";
const EMAIL = "marcin@szabunia.pl";

// Przyklejony, mobilny pasek akcji (pojawia się przy scrollu). Kolejność:
// Wyceń (główny CTA), e-mail, telefon. Po lewej stronie. Gdy widoczny jest baner
// cookies, pasek unosi się nad niego, a po zamknięciu banera zjeżdża na dół.
// Ukrywa się, gdy sekcja kontaktu jest na ekranie (formularz już widoczny).
export default function MobileFAB() {
  const scrollY = useScrollPosition();
  const [contactInView, setContactInView] = useState(false);
  const [bannerH, setBannerH] = useState(0);

  useEffect(() => {
    const el = document.getElementById("kontakt");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setContactInView(entries[0].isIntersecting),
      { rootMargin: "0px 0px -35% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Nasłuch wysokości banera cookies, żeby unieść pasek nad niego.
  useEffect(() => {
    const onBanner = (e: Event) => {
      const detail = (e as CustomEvent<{ height?: number }>).detail;
      setBannerH(detail?.height ?? 0);
    };
    window.addEventListener("cookie-banner-change", onBanner);
    return () => window.removeEventListener("cookie-banner-change", onBanner);
  }, []);

  const visible = scrollY > 600 && !contactInView;
  if (!visible) return null;

  // Strona z formularzem (#kontakt) → przewijamy do niego. Strona bez niego
  // (blog, poradnik) → href="/kontakt" prowadzi na stronę kontaktu (nigdy martwy link).
  const handleCtaClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById("kontakt");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const iconBtn =
    "w-11 h-11 rounded-full flex items-center justify-center text-navy dark:text-white hover:bg-blue-pale dark:hover:bg-blue/15 transition-colors";

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-40 md:hidden transition-[bottom] duration-300"
      style={{ bottom: bannerH ? bannerH + 16 : 20 }}
    >
      {/* Wyśrodkowana „wyspa" — jeden spójny pasek akcji: Wyceń, e-mail, telefon */}
      <div className="glass-strong flex items-center gap-1.5 rounded-full p-1.5">
        <a
          href="/kontakt"
          onClick={handleCtaClick}
          data-cta="wycena_sticky"
          aria-label="Wyślij brief, przejdź do formularza"
          className="flex items-center gap-2 pl-4 pr-5 py-2.5 bg-gradient-to-br from-blue to-blue-light text-white rounded-full btn-glow font-barlow font-bold text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
          </svg>
          Wycena
        </a>
        <a href={`mailto:${EMAIL}`} data-cta="email_fab" aria-label="Napisz e-mail" className={iconBtn}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </a>
        <a href={`tel:${PHONE}`} data-cta="tel_fab" aria-label="Zadzwoń" className={iconBtn}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
