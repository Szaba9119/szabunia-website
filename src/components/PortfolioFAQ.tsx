"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import type { FAQItem } from "@/data/portfolio";

interface Props {
  faqs: FAQItem[];
}

export default function PortfolioFAQ({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[40px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Najczęstsze pytania
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            Odpowiedzi na pytania, które najczęściej zadają klienci.
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <AnimatedSection key={faq.q} delay={i * 0.04}>
                <div
                  className={`bg-white dark:bg-dark-card rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-blue dark:border-blue-light shadow-sm shadow-blue/5"
                      : "border-border dark:border-dark-border hover:border-blue/50 dark:hover:border-blue-light/30"
                  }`}
                >
                  <h3 className="m-0">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`pfaq-answer-${i}`}
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
                    id={`pfaq-answer-${i}`}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
