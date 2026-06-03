"use client";

import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import BeforeAfterSlider from "./BeforeAfterSlider";

const examples = [
  {
    beforeSrc: "/images/before-after/before-1.svg",
    afterSrc: "/images/before-after/after-1.svg",
    beforeAlt: "Zdjęcie przed retuszem — portret biznesowy",
    afterAlt: "Zdjęcie po retuszu — portret biznesowy",
    label: "Portret biznesowy",
  },
  {
    beforeSrc: "/images/before-after/before-2.svg",
    afterSrc: "/images/before-after/after-2.svg",
    beforeAlt: "Zdjęcie przed retuszem — packshot produktowy",
    afterAlt: "Zdjęcie po retuszu — packshot produktowy",
    label: "Packshot produktowy",
  },
];

export default function BeforeAfter() {
  return (
    <section className="py-12 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Przed i po retuszu
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            Przesuń suwak, żeby zobaczyć różnicę. Naturalny retusz, który nie zmienia osoby — poprawia jakość.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examples.map((ex, i) => (
            <AnimatedSection key={ex.label} delay={0.1 * i}>
              <BeforeAfterSlider
                beforeSrc={ex.beforeSrc}
                afterSrc={ex.afterSrc}
                beforeAlt={ex.beforeAlt}
                afterAlt={ex.afterAlt}
              />
              <p className="text-center text-steel dark:text-dark-text-muted text-[13px] font-barlow font-semibold mt-3">
                {ex.label}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
