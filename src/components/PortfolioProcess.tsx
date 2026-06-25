"use client";

import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import type { ProcessStep } from "@/data/portfolio";

interface Props {
  steps: ProcessStep[];
}

export default function PortfolioProcess({ steps }: Props) {
  if (steps.length === 0) return null;
  return (
    <section className="py-12 md:py-16 px-4">
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

        {/* Desktop: pozioma oś czasu */}
        <AnimatedSection>
          <div className="hidden md:block" role="list" aria-label="Etapy współpracy">
            <div className="relative">
              {steps.length === 4 && (
                <div
                  className="absolute top-[28px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-0.5 bg-gradient-to-r from-blue/30 via-blue to-blue/30"
                  aria-hidden="true"
                />
              )}
              <div className="grid grid-cols-4 gap-6 relative">
                {steps.map((step) => (
                  <div key={step.num} role="listitem" className="flex flex-col items-center text-center">
                    <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-blue to-blue-light text-white flex items-center justify-center font-barlow font-extrabold text-xl shadow-lg shadow-blue/25 mb-5">
                      {step.num}
                    </div>
                    <div className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-border dark:border-dark-border w-full flex-1 hover:border-blue dark:hover:border-blue hover:-translate-y-0.5 transition-all">
                      <h3 className="font-barlow font-bold text-base text-navy dark:text-white mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-[13px] text-steel dark:text-dark-text-muted leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Mobile: pionowa oś czasu */}
        <AnimatedSection>
          <div className="md:hidden space-y-0" role="list" aria-label="Etapy współpracy">
            {steps.map((step, i) => (
              <div key={step.num} role="listitem" className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue to-blue-light text-white flex items-center justify-center font-barlow font-extrabold text-base shadow-md shadow-blue/20 shrink-0 z-10">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-blue/20 my-1" aria-hidden="true" />
                  )}
                </div>
                <div className="bg-white dark:bg-dark-card rounded-2xl p-4 border border-border dark:border-dark-border flex-1 mb-3">
                  <h3 className="font-barlow font-bold text-sm text-navy dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-steel dark:text-dark-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
