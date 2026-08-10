"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import { gtagEvent } from "@/lib/gtag";
import { homeFaqs as faqs } from "@/data/faq";

// PODNIESIONE Z 6 NA 7, 10.08.2026: `homeFaqs` ma teraz dokładnie siedem pozycji
// (przegląd strony głównej, decyzja Marcina), więc przycisk „Pokaż wszystkie
// pytania" odsłaniałby jedno pytanie. Przy tej wartości próg nie jest przekroczony,
// przycisk się nie renderuje i cała siódemka jest widoczna od razu.
//
// Jeśli lista kiedyś urośnie powyżej siedmiu, przycisk wróci sam i to jest OK.
//
// UWAGA (audyt PELNY2907-09): renderujemy WSZYSTKIE pozycje i chowamy nadmiar
// CSS-em, a nie `slice`. JSON-LD FAQPage w page.tsx deklaruje tę samą tablicę, więc
// cięcie dawało rozjazd między markupem a DOM — niezgodność z wytycznymi
// Google „oznaczona treść musi być na stronie". Nie wracać do `slice`.
const DEFAULT_VISIBLE = 7;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Najczęstsze pytania
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            Zanim napiszesz, sprawdź, czy odpowiedź już tu jest.
          </p>
        </AnimatedSection>

        <div id="faq-list" className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const hiddenByFold = !expanded && i >= DEFAULT_VISIBLE;
            return (
              <div key={faq.q} className={hiddenByFold ? "hidden" : undefined}>
              <AnimatedSection delay={(hiddenByFold ? 0 : i) * 0.04}>
                <div
                  className={`bg-white dark:bg-dark-card rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-blue dark:border-blue-light shadow-sm shadow-blue/5"
                      : "border-border dark:border-dark-border hover:border-blue/50 dark:hover:border-blue-light/30"
                  }`}
                >
                  <h3 className="m-0">
                    <button
                      id={`faq-question-${i}`}
                      onClick={() => {
                        // Mapa obiekcji: które pytania klienci realnie otwierają.
                        if (!isOpen) gtagEvent("faq_open", { question: faq.q });
                        setOpenIndex(isOpen ? null : i);
                      }}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      className="w-full px-5 py-4 flex items-center justify-between text-left group"
                    >
                      <span
                        className={`font-barlow font-bold text-sm pr-4 transition-colors duration-200 ${
                          isOpen
                            ? "text-blue dark:text-blue-light"
                            : "text-navy dark:text-white group-hover:text-blue dark:group-hover:text-blue-light"
                        }`}
                      >
                        {faq.q}
                      </span>
                      <svg
                        className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 text-blue dark:text-blue-light"
                            : "text-steel dark:text-dark-text-muted"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    // Zamknięta odpowiedź jest schowana WIZUALNIE (grid-rows-[0fr]
                    // + opacity-0), a nie atrybutem `hidden` — inaczej ginie
                    // animacja rozwijania. Dla czytnika ekranu treść zostawała
                    // wtedy w drzewie dostępności, więc pod zwiniętym pytaniem
                    // czytała się odpowiedź (finding PELNY2608-66). `aria-hidden`
                    // domyka to bez ruszania animacji. Bezpieczne, bo `faq.a`
                    // jest czystym tekstem: nie ma tu elementów fokusowalnych,
                    // które trafiłyby w konflikt aria-hidden + tabindex.
                    aria-hidden={!isOpen}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-[13px] text-steel dark:text-dark-text-muted leading-relaxed border-t border-border/50 dark:border-dark-border pt-3">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              </div>
            );
          })}
        </div>

        {!expanded && faqs.length > DEFAULT_VISIBLE && (
          <div className="text-center mt-6">
            <button
              onClick={() => setExpanded(true)}
              aria-expanded={expanded}
              aria-controls="faq-list"
              className="inline-block py-2 text-blue dark:text-blue-light font-barlow font-semibold text-sm hover:underline"
            >
              Pokaż wszystkie pytania ({faqs.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
