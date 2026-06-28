"use client";

import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

const TERMS: { title: string; desc: string }[] = [
  {
    title: "Realizacja",
    desc: "Zdjęcia do 14 dni, wideo do 21 dni roboczych. Tryb ekspresowy 48h za dopłatą +50%.",
  },
  {
    title: "Poprawki w cenie",
    desc: "2 tury poprawek przy zdjęciach, 3 tury przy wideo. Każda kolejna 200 zł/h.",
  },
  {
    title: "Płatność",
    desc: "Faktura VAT przez Useme. Proforma po pierwszym retuszu, akceptacja w 7 dni.",
  },
  {
    title: "Dojazd",
    desc: "Poznań i okolice 0 zł. Poza Poznaniem 2,50 zł/km netto, w obie strony. Europa i zagranica indywidualnie.",
  },
  {
    title: "Pliki i archiwizacja",
    desc: "Gotowe pliki w pełnej jakości i wersji web. Archiwizacja 1 rok, 7 dni na poprawki po akceptacji.",
  },
  {
    title: "Kontakt i terminy",
    desc: "Odpowiadam na zapytania w 24h. Wolne terminy zwykle w 1-3 tygodnie.",
  },
];

export default function Warunki() {
  return (
    <section id="warunki" className="py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Warunki współpracy
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-10 max-w-xl mx-auto">
            Najważniejsze zasady w jednym miejscu, żeby nic Cię nie zaskoczyło.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TERMS.map((t, i) => (
            <AnimatedSection key={t.title} delay={i * 0.05}>
              <div className="h-full bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-5">
                <h3 className="font-barlow font-bold text-[15px] text-navy dark:text-white mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue dark:bg-blue-light flex-shrink-0" />
                  {t.title}
                </h3>
                <p className="text-[13px] text-steel dark:text-dark-text-muted leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
