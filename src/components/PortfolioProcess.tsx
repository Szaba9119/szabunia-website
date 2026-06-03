"use client";

import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import type { ProcessStep } from "@/data/portfolio";

interface Props {
  steps: ProcessStep[];
}

export default function PortfolioProcess({ steps }: Props) {
  return (
    <section className="py-12 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[40px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Jak wygląda współpraca
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            4 proste kroki od pierwszego kontaktu do gotowych materiałów.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <AnimatedSection
              key={step.num}
              delay={i * 0.1}
              className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-border dark:border-dark-border text-center hover:border-blue hover:-translate-y-0.5 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue to-blue-light text-white flex items-center justify-center font-barlow font-extrabold text-lg mx-auto mb-3.5 shadow-md shadow-blue/20">
                {step.num}
              </div>
              <h3 className="font-barlow font-bold text-sm text-navy dark:text-white mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-steel dark:text-dark-text-muted leading-relaxed">
                {step.desc}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
