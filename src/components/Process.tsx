"use client";

import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

const steps = [
  {
    num: 1,
    title: "Brief",
    desc: "Krótka rozmowa o celu, terminie i budżecie. Wycenę dostajesz w ciągu 24h.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "Sesja",
    desc: "Przyjeżdżam do Twojej firmy lub umawiamy studio. Prowadzę Cię przez pozowanie.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Selekcja",
    desc: "W 48h dostajesz galerię online. Sam zaznaczasz ujęcia do retuszu, masz pełną kontrolę.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: 4,
    title: "Dostawa",
    desc: "Wyretuszowane materiały w 14 dni (wideo 21). Express do 48h dostępny.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

// Warunki współpracy wydzielone do osobnego komponentu Warunki.tsx
// (2026-07-06, decyzja Marcina) — na home renderowane po FAQ, na /galeria po cenniku.
export default function Process() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Jak wygląda współpraca
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-14 max-w-md mx-auto">
            4 proste kroki od pierwszego kontaktu do gotowych materiałów.
          </p>
        </AnimatedSection>

        {/* Desktop: horizontal timeline */}
        <AnimatedSection>
          <div className="hidden md:block" role="list" aria-label="Etapy współpracy">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-[28px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-0.5 bg-gradient-to-r from-blue/30 via-blue to-blue/30" aria-hidden="true" />

              <div className="grid grid-cols-4 gap-6 relative">
                {steps.map((step) => (
                  <div
                    key={step.num}
                    role="listitem"
                    className="flex flex-col items-center text-center"
                  >
                    {/* Number circle */}
                    <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-blue to-blue-light text-white flex items-center justify-center font-barlow font-extrabold text-xl shadow-lg shadow-blue/25 mb-5">
                      {step.num}
                    </div>
                    <div className="bg-white dark:bg-dark-card rounded-2xl p-5 border border-border dark:border-dark-border w-full flex-1 hover:border-blue dark:hover:border-blue hover:-translate-y-0.5 transition-all">
                      <div className="w-9 h-9 rounded-lg bg-blue-pale dark:bg-blue/15 flex items-center justify-center text-blue mx-auto mb-3" aria-hidden="true">
                        {step.icon}
                      </div>
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

        {/* Mobile: vertical timeline */}
        <AnimatedSection>
          <div className="md:hidden space-y-0" role="list" aria-label="Etapy współpracy">
            {steps.map((step, i) => (
              <div
                key={step.num}
                role="listitem"
                className="flex gap-4 relative"
              >
                {/* Vertical line + circle */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue to-blue-light text-white flex items-center justify-center font-barlow font-extrabold text-base shadow-md shadow-blue/20 shrink-0 z-10">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-blue/20 my-1" aria-hidden="true" />
                  )}
                </div>

                {/* Content card */}
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
