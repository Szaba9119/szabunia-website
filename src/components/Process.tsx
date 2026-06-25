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

        {/* === WARUNKI WSPÓŁPRACY === */}
        <AnimatedSection>
          <div className="mt-16 pt-12 border-t border-border dark:border-dark-border">
            <h3 className="font-barlow font-bold text-xl text-navy dark:text-white mb-8 text-center">
              Warunki Współpracy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  Bezpłatna zmiana terminu min. 48h przed sesją. Odwołanie &lt;48h: 50% wartości. Archiwizacja plików: 1 rok.
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
                  Poznań i okolice: 0 zł. Poza Poznaniem: 2,50 zł/km. Cała Polska i Europa: koszty ustalane indywidualnie.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
