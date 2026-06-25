"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";

const PHONE = "+48514900688";
const EMAIL = "marcin@szabunia.pl";

// Przyklejony, mobilny pasek akcji (pojawia się przy scrollu). Szybkie kontakty:
// telefon, e-mail oraz główny przycisk prowadzący do formularza (wycena).
export default function MobileFAB() {
  const scrollY = useScrollPosition();
  const visible = scrollY > 600;

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 md:hidden">
      <a
        href={`tel:${PHONE}`}
        aria-label="Zadzwoń"
        className="w-12 h-12 rounded-full bg-white dark:bg-dark-card border border-border dark:border-dark-border shadow-lg shadow-navy/10 flex items-center justify-center text-navy dark:text-white"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      </a>
      <a
        href={`mailto:${EMAIL}`}
        aria-label="Napisz e-mail"
        className="w-12 h-12 rounded-full bg-white dark:bg-dark-card border border-border dark:border-dark-border shadow-lg shadow-navy/10 flex items-center justify-center text-navy dark:text-white"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      </a>
      <a
        href="#kontakt"
        aria-label="Wyślij brief — przejdź do formularza"
        className="flex items-center gap-2 pl-4 pr-5 py-3 bg-gradient-to-br from-blue to-blue-light text-white rounded-full btn-glow shadow-lg shadow-blue/30 font-barlow font-bold text-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
        </svg>
        Wyceń
      </a>
    </div>
  );
}
