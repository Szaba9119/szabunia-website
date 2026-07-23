"use client";

import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import { serviceItems } from "@/data/services";

// Sekcja "Wycena" na home (§4.1 brief-20). Zastępuje dawny #cennik z tabami,
// pakietami i kartą kalkulatora — depricing: strona pokazuje wyłącznie kotwice
// "od X zł", proces wyceny i jedno CTA dalej.
export default function Pricing() {
  return (
    <>
      {/* Kotwica wsteczna: stare linki do /#cennik nadal trafiają w to miejsce. */}
      <div id="cennik" className="scroll-mt-24" aria-hidden="true" />
      <section id="wycena" className="scroll-mt-24 py-12 md:py-16 px-4 bg-gray-bg dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <Parallax distance={PARALLAX.accent} direction="up">
              <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
                Wycena
              </h2>
            </Parallax>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-10 max-w-xl mx-auto">
              Każdy projekt wyceniam indywidualnie — po krótkim briefie dostajesz konkretną ofertę w 24h.
            </p>
          </AnimatedSection>

          {/* Kafelki usług: kotwica "od X zł" + link do podstrony usługi. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {serviceItems.map((s, i) => (
              <AnimatedSection key={s.slug} delay={i * 0.05}>
                <Link
                  href={`/uslugi/${s.slug}`}
                  data-cta="wycena_kafelek"
                  className="flex items-center justify-between gap-3 bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border px-5 py-4 h-full hover:border-blue dark:hover:border-blue-light hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      {s.icon}
                    </div>
                    <span className="font-barlow font-bold text-[14px] text-navy dark:text-white truncate">
                      {s.title}
                    </span>
                  </div>
                  <span className="text-blue dark:text-blue-light text-[13px] font-barlow font-semibold whitespace-nowrap">
                    {s.price}
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <p className="text-center text-[12px] text-steel dark:text-dark-text-muted mb-8">
              Ceny netto (+23% VAT) · Faktura VAT · Dojazd: Poznań 0 zł, poza Poznaniem 2,50 zł/km
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <p className="text-center text-[13px] text-steel dark:text-dark-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              <span className="text-navy dark:text-white font-semibold">1. Piszesz brief</span>
              {" → "}
              <span className="text-navy dark:text-white font-semibold">2. Dostajesz ofertę w 3 wariantach w 24h</span>
              {" → "}
              <span className="text-navy dark:text-white font-semibold">3. Wybierasz zakres dopasowany do budżetu</span>
            </p>
          </AnimatedSection>

          <AnimatedSection className="text-center">
            <a
              href="#kontakt"
              data-cta="wycena_home_sekcja"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]"
            >
              Zapytaj o ofertę
              <span className="text-white/80">→</span>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
