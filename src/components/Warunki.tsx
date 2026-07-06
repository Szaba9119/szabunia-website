"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

// Warunki współpracy jako osobna sekcja (decyzja Marcina, 2026-07-06 noc):
// wydzielone z Process.tsx i przeniesione na koniec ścieżki decyzyjnej
// (home: po FAQ, przed formularzem; /galeria: po cenniku). Treść w jednym
// miejscu — to NIE jest powrót starego, zduplikowanego Warunki.tsx.
export default function Warunki() {
  // Mobile: 6 kart zwiniętych za przyciskiem (~1 ekran telefonu mniej);
  // na md+ zawsze rozwinięte.
  const [warunkiOpen, setWarunkiOpen] = useState(false);

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h3 className="font-barlow font-bold text-xl text-navy dark:text-white mb-8 text-center">
            Warunki Współpracy
          </h3>
          <div className="md:hidden mb-4">
            <button
              onClick={() => setWarunkiOpen((v) => !v)}
              aria-expanded={warunkiOpen}
              aria-controls="warunki-grid"
              className="w-full max-w-md mx-auto flex items-center justify-center gap-2 py-3 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-blue dark:text-blue-light font-barlow font-bold text-[13px]"
            >
              {warunkiOpen ? "Zwiń warunki" : "Rozwiń warunki (6)"}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${warunkiOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div
            id="warunki-grid"
            className={`${warunkiOpen ? "grid" : "hidden"} md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}
          >
            <div className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-border dark:border-dark-border">
              <p className="text-navy dark:text-white text-[11px] uppercase tracking-widest mb-2 font-barlow font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
                Rozliczenia
              </p>
              <p className="text-[12px] text-steel dark:text-dark-text-muted leading-relaxed">
                Po pierwszym retuszu wysyłam proformę z podglądem materiału. Masz 7 dni na akceptację (foto lub wideo), brak odpowiedzi oznacza akceptację. Po opłacie dostajesz pełne pliki (social media i druk) oraz fakturę VAT przez Useme.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-border dark:border-dark-border">
              <p className="text-navy dark:text-white text-[11px] uppercase tracking-widest mb-2 font-barlow font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Czas realizacji
              </p>
              <p className="text-[12px] text-steel dark:text-dark-text-muted leading-relaxed">
                Zdjęcia: 14 dni roboczych. Wideo: 21 dni roboczych. Express do 48h: +50% wartości zlecenia.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-border dark:border-dark-border">
              <p className="text-navy dark:text-white text-[11px] uppercase tracking-widest mb-2 font-barlow font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Poprawki
              </p>
              <p className="text-[12px] text-steel dark:text-dark-text-muted leading-relaxed">
                Zdjęcia: 2 tury w cenie. Wideo: 3 tury w cenie. Dodatkowe poprawki: 200 zł/h netto.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-border dark:border-dark-border">
              <p className="text-navy dark:text-white text-[11px] uppercase tracking-widest mb-2 font-barlow font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Pliki
              </p>
              <p className="text-[12px] text-steel dark:text-dark-text-muted leading-relaxed">
                Pełna jakość + wersja web. Na życzenie: PNG z przezroczystym tłem, TIFF do druku. Nie udostępniam RAW.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-border dark:border-dark-border">
              <p className="text-navy dark:text-white text-[11px] uppercase tracking-widest mb-2 font-barlow font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Odwołanie
              </p>
              <p className="text-[12px] text-steel dark:text-dark-text-muted leading-relaxed">
                Bezpłatna zmiana terminu min. 48h przed sesją. Odwołanie &lt;48h: 50% wartości. Archiwizacja gotowych plików: 1 rok. Po pełnej akceptacji dzieła masz do 7 dni na dodatkowe poprawki.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-border dark:border-dark-border">
              <p className="text-navy dark:text-white text-[11px] uppercase tracking-widest mb-2 font-barlow font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Dojazd
              </p>
              <p className="text-[12px] text-steel dark:text-dark-text-muted leading-relaxed">
                Poznań i okolice: 0 zł. Poza Poznaniem: 2,50 zł/km (w obie strony). Europa i zagranica: koszty ustalane indywidualnie.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
