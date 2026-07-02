"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import PricingCalculator from "./PricingCalculator";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-blue dark:text-blue-light flex-shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
        open ? "rotate-180 text-blue dark:text-blue-light" : "text-steel dark:text-dark-text-muted"
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/** Formatuje cenę netto w zł (np. "1 000 zł"). */
function formatPriceLabel(netto: number): string {
  return `${netto.toLocaleString("pl-PL")} zł`;
}

/** Prefill formularza kontaktowego (ten sam most co kalkulator) i przewinięcie do #kontakt. */
function askAboutPackage(serviceSlug: string, packageLabel: string) {
  window.dispatchEvent(
    new CustomEvent("calc-to-form", {
      detail: {
        service: serviceSlug,
        message: `Interesuje mnie pakiet ${packageLabel}. Proszę o szczegóły i dostępne terminy.`,
      },
    })
  );
  document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
}

function AskButton({ slug, label }: { slug: string; label: string }) {
  return (
    <button
      onClick={() => askAboutPackage(slug, label)}
      className="mt-4 w-full py-2.5 rounded-xl border border-blue/40 dark:border-blue-light/40 text-blue dark:text-blue-light text-[13px] font-barlow font-bold hover:bg-blue hover:text-white dark:hover:bg-blue-light dark:hover:text-navy hover:border-blue dark:hover:border-blue-light transition-colors"
    >
      Zapytaj o ten pakiet →
    </button>
  );
}

export default function Pricing() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isOpen = (id: string) => openSections.has(id);

  return (
    <section id="cennik" className="py-12 md:py-16 px-4 bg-gray-bg dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Cennik
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-6 max-w-xl mx-auto">
            Przejrzyste pakiety dostosowane do potrzeb nowoczesnego biznesu.
          </p>
        </AnimatedSection>

        {/* === CENY NETTO (B2B) === */}
        <AnimatedSection>
          <p className="text-center text-[12px] text-steel dark:text-dark-text-muted mb-6">
            Wszystkie ceny są kwotami netto (+23% VAT), faktura VAT przez Useme. Dojazd: Poznań i okolice 0 zł, poza Poznaniem 2,50 zł/km (od granicy miasta, w obie strony).
          </p>
        </AnimatedSection>

        {/* === SZYBKA NAWIGACJA PO CENNIKU === */}
        <AnimatedSection>
          <nav aria-label="Kategorie cennika" className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: "cennik-portrety", label: "Portrety" },
              { id: "cennik-hybrydy", label: "Foto + Wideo" },
              { id: "pricing-card-eventy", label: "Eventy", open: "eventy" },
              { id: "pricing-card-dron", label: "Dron", open: "dron" },
              { id: "pricing-card-wideo", label: "Wideo", open: "wideo" },
              { id: "pricing-card-zespoly", label: "Zespoły", open: "zespoly" },
              { id: "pricing-card-produkt", label: "Produktowa", open: "produkt" },
              { id: "kalkulator", label: "Kalkulator" },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => {
                  const sectionToOpen = chip.open;
                  if (sectionToOpen) {
                    setOpenSections((prev) => new Set(prev).add(sectionToOpen));
                  }
                  // setTimeout: poczekaj na render rozwiniętej sekcji przed scrollem
                  setTimeout(() => {
                    document.getElementById(chip.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 50);
                }}
                className="px-4 py-2 rounded-full border border-border dark:border-dark-border bg-white dark:bg-dark-card text-[13px] font-barlow font-semibold text-steel dark:text-dark-text-muted hover:border-blue hover:text-blue dark:hover:border-blue-light dark:hover:text-blue-light transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </nav>
        </AnimatedSection>

        {/* === PORTRETY BIZNESOWE & HEADSHOTY (PIERWSZE) === */}
        <AnimatedSection>
          <h3 id="cennik-portrety" className="scroll-mt-24 font-barlow font-bold text-xl text-blue dark:text-blue-light mb-8 text-center">
            Portrety Biznesowe & Headshoty
          </h3>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {/* Essential */}
          <AnimatedSection delay={0}>
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-border dark:border-dark-border h-full flex flex-col">
              <h4 className="font-barlow font-bold text-lg text-navy dark:text-white mb-1">
                PORTRET STANDARD
              </h4>
              <div className="font-barlow font-extrabold text-3xl text-blue dark:text-blue-light mb-6">
                {formatPriceLabel(1000)}
              </div>
              <ul className="space-y-3 text-[13px] text-steel dark:text-dark-text-muted mb-6 flex-grow">
                <li className="flex items-start gap-2"><CheckIcon /> 1 osoba, do 2 stylizacji</li>
                <li className="flex items-start gap-2"><CheckIcon /> 90 min sesji</li>
                <li className="flex items-start gap-2"><CheckIcon /> 3 wyretuszowane zdjęcia (wybór ze 100+ ujęć)</li>
                <li className="flex items-start gap-2"><CheckIcon /> Studio w cenie pakietu, indywidualnie dopasowane do Twojego projektu</li>
                <li className="flex items-start gap-2"><CheckIcon /> GRATIS: Poseboard przed sesją</li>
              </ul>
              <p className="text-[11px] text-steel dark:text-dark-text-muted pt-4 border-t border-border dark:border-dark-border">
                Dodatkowe ujęcie: {formatPriceLabel(120)}
              </p>
              <AskButton slug="wizerunek-portrety" label="PORTRET STANDARD" />
            </div>
          </AnimatedSection>

          {/* Professional — recommended */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border-2 border-blue dark:border-blue-light h-full flex flex-col relative shadow-lg shadow-blue/5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue text-white px-3 py-0.5 rounded-full text-[10px] font-barlow font-bold uppercase tracking-wider" role="note">
                Rekomendowany
              </div>
              <h4 className="font-barlow font-bold text-lg text-navy dark:text-white mb-1">
                PORTRET PROFESSIONAL
              </h4>
              <div className="font-barlow font-extrabold text-4xl text-blue dark:text-blue-light mb-6">
                {formatPriceLabel(1300)}
              </div>
              <ul className="space-y-3 text-[13px] text-navy dark:text-white mb-6 flex-grow">
                <li className="flex items-start gap-2"><CheckIcon /> 1 osoba, 2-3 stylizacje</li>
                <li className="flex items-start gap-2"><CheckIcon /> 2 godziny sesji</li>
                <li className="flex items-start gap-2"><CheckIcon /> 8 wyretuszowanych zdjęć (wybór ze 150+ ujęć)</li>
                <li className="flex items-start gap-2"><CheckIcon /> Studio w cenie pakietu, indywidualnie dopasowane do Twojego projektu</li>
                <li className="flex items-start gap-2"><CheckIcon /> GRATIS: Poseboard przed sesją</li>
              </ul>
              <p className="text-[11px] text-steel dark:text-dark-text-muted pt-4 border-t border-border dark:border-dark-border">
                Dodatkowe ujęcie: {formatPriceLabel(100)}
              </p>
              <AskButton slug="wizerunek-portrety" label="PORTRET PROFESSIONAL" />
            </div>
          </AnimatedSection>

          {/* Pro Branding */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-border dark:border-dark-border h-full flex flex-col">
              <h4 className="font-barlow font-bold text-lg text-navy dark:text-white mb-1">
                PORTRET PREMIUM
              </h4>
              <div className="font-barlow font-extrabold text-3xl text-blue dark:text-blue-light mb-6">
                {formatPriceLabel(1800)}
              </div>
              <ul className="space-y-3 text-[13px] text-steel dark:text-dark-text-muted mb-6 flex-grow">
                <li className="flex items-start gap-2"><CheckIcon /> 1 osoba, 3-4 stylizacje</li>
                <li className="flex items-start gap-2"><CheckIcon /> Do 3 godzin sesji</li>
                <li className="flex items-start gap-2"><CheckIcon /> 15 wyretuszowanych zdjęć (wybór z 200+ ujęć)</li>
                <li className="flex items-start gap-2"><CheckIcon /> Pełna kontrola nad stylem i klimatem</li>
                <li className="flex items-start gap-2"><CheckIcon /> Studio w cenie pakietu, indywidualnie dopasowane do Twojego projektu</li>
                <li className="flex items-start gap-2"><CheckIcon /> GRATIS: Poseboard przed sesją</li>
              </ul>
              <p className="text-[11px] text-steel dark:text-dark-text-muted pt-4 border-t border-border dark:border-dark-border">
                Dodatkowe ujęcie: {formatPriceLabel(80)}
              </p>
              <AskButton slug="wizerunek-portrety" label="PORTRET PREMIUM" />
            </div>
          </AnimatedSection>
        </div>

        {/* === PAKIETY HYBRYDOWE (DRUGIE) === */}
        <AnimatedSection>
          <h3 id="cennik-hybrydy" className="scroll-mt-24 font-barlow font-bold text-xl text-blue dark:text-blue-light mb-8 text-center">
            Pakiety Hybrydowe (Foto + Wideo + Dron)
          </h3>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-16">
          <AnimatedSection>
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-border dark:border-dark-border h-full">
              <h4 className="font-barlow font-bold text-lg text-navy dark:text-white mb-1">
                EVENT STANDARD
              </h4>
              <div className="font-barlow font-extrabold text-3xl text-blue dark:text-blue-light mb-5">
                {formatPriceLabel(1800)}
              </div>
              <ul className="space-y-3 text-[13px] text-steel dark:text-dark-text-muted">
                <li className="flex items-start gap-2"><CheckIcon /> 3 godziny obecności</li>
                <li className="flex items-start gap-2"><CheckIcon /> 50+ zdjęć po selekcji i pełnej obróbce</li>
                <li className="flex items-start gap-2"><CheckIcon /> Wideo w formacie Reels (30s)</li>
                <li className="flex items-start gap-2"><CheckIcon /> Pełny montaż i postprodukcja wideo</li>
                <li className="flex items-start gap-2"><CheckIcon /> Ujęcia z drona w cenie pakietu</li>
              </ul>
              <AskButton slug="pakiety-foto-wideo" label="EVENT STANDARD" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border-2 border-blue dark:border-blue-light h-full relative shadow-lg shadow-blue/5">
              <div className="absolute -top-3 right-4 bg-blue text-white px-3 py-0.5 rounded-full text-[10px] font-barlow font-bold uppercase tracking-wider">
                Rekomendowany
              </div>
              <h4 className="font-barlow font-bold text-lg text-navy dark:text-white mb-1">
                EVENT PROFESSIONAL
              </h4>
              <div className="font-barlow font-extrabold text-4xl text-blue dark:text-blue-light mb-5">
                {formatPriceLabel(3200)}
              </div>
              <ul className="space-y-3 text-[13px] text-navy dark:text-white">
                <li className="flex items-start gap-2"><CheckIcon /> 6 godzin obecności</li>
                <li className="flex items-start gap-2"><CheckIcon /> 150+ zdjęć po selekcji i pełnej obróbce</li>
                <li className="flex items-start gap-2"><CheckIcon /> Główne wideo podsumowujące (60s)</li>
                <li className="flex items-start gap-2"><CheckIcon /> Krótki teaser do Social Media (15s)</li>
                <li className="flex items-start gap-2"><CheckIcon /> Pełny montaż i postprodukcja wideo</li>
                <li className="flex items-start gap-2"><CheckIcon /> Ujęcia z drona w cenie pakietu</li>
              </ul>
              <AskButton slug="pakiety-foto-wideo" label="EVENT PROFESSIONAL" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-border dark:border-dark-border h-full relative">
              <div className="absolute -top-3 right-4 bg-blue text-white px-3 py-0.5 rounded-full text-[10px] font-barlow font-bold uppercase tracking-wider">
                NOWOŚĆ
              </div>
              <h4 className="font-barlow font-bold text-lg text-navy dark:text-white mb-1">
                EVENT PREMIUM
              </h4>
              <div className="font-barlow font-extrabold text-3xl text-blue dark:text-blue-light mb-5">
                {formatPriceLabel(4500)}
              </div>
              <ul className="space-y-3 text-[13px] text-steel dark:text-dark-text-muted">
                <li className="flex items-start gap-2"><CheckIcon /> Do 8 godzin na miejscu</li>
                <li className="flex items-start gap-2"><CheckIcon /> Kompletny reportaż, min. 200 zdjęć</li>
                <li className="flex items-start gap-2"><CheckIcon /> Główny film z wydarzenia (do 90s)</li>
                <li className="flex items-start gap-2"><CheckIcon /> Dynamiczny teaser Social Media (15s)</li>
                <li className="flex items-start gap-2"><CheckIcon /> 3 wywiady do 30 sekund z uczestnikami</li>
                <li className="flex items-start gap-2"><CheckIcon /> Autorska selekcja + profesjonalna obróbka zdjęć</li>
                <li className="flex items-start gap-2"><CheckIcon /> Pełen montaż wideo i post-produkcja wywiadów</li>
                <li className="flex items-start gap-2"><CheckIcon /> Ujęcia z drona w cenie pakietu</li>
              </ul>
              <AskButton slug="pakiety-foto-wideo" label="EVENT PREMIUM" />
            </div>
          </AnimatedSection>
        </div>

        {/* === SEKCJE ZWIJANE === */}
        <div className="space-y-3">
          {/* --- Reportaż & Eventy --- */}
          <AnimatedSection>
            <div id="pricing-card-eventy" className={`scroll-mt-24 bg-white dark:bg-dark-card rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen("eventy") ? "border-blue dark:border-blue-light shadow-sm shadow-blue/5" : "border-border dark:border-dark-border hover:border-blue/50 dark:hover:border-blue-light/30"
            }`}>
              <button
                onClick={() => toggleSection("eventy")}
                aria-expanded={isOpen("eventy")}
                aria-controls="pricing-eventy"
                className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-barlow font-bold text-lg transition-colors ${isOpen("eventy") ? "text-blue dark:text-blue-light" : "text-navy dark:text-white group-hover:text-blue dark:group-hover:text-blue-light"}`}>
                      Reportaż & Eventy
                    </h3>
                    <p className="text-[13px] text-steel dark:text-dark-text-muted">
                      od {formatPriceLabel(600)}
                    </p>
                  </div>
                </div>
                <ChevronIcon open={isOpen("eventy")} />
              </button>

              <div
                id="pricing-eventy"
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen("eventy") ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 md:px-8 pb-6 pt-2 border-t border-border/50 dark:border-dark-border space-y-4 text-[13px] text-steel dark:text-dark-text-muted">
                    <div className="flex justify-between items-center">
                      <span>Pierwsza godzina pracy</span>
                      <span className="font-barlow font-bold text-lg text-blue dark:text-blue-light">{formatPriceLabel(600)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Każda kolejna godzina</span>
                      <span className="font-barlow font-bold text-lg text-blue dark:text-blue-light">{formatPriceLabel(400)}</span>
                    </div>
                    <div className="bg-blue/5 dark:bg-blue-light/5 rounded-xl p-4 border border-blue/10 dark:border-blue-light/10 flex justify-between items-center">
                      <div>
                        <span className="text-navy dark:text-white font-semibold">Pakiet 4h (event)</span>
                      </div>
                      <div className="text-right">
                        <span className="font-barlow font-extrabold text-2xl text-blue dark:text-blue-light block">{formatPriceLabel(1600)}</span>
                        <span className="text-[10px] text-blue/70 dark:text-blue-light/70 font-semibold">Oszczędzasz {formatPriceLabel(200)}</span>
                      </div>
                    </div>
                    <div className="bg-blue/5 dark:bg-blue-light/5 rounded-xl p-4 border border-blue/10 dark:border-blue-light/10 flex justify-between items-center">
                      <div>
                        <span className="text-navy dark:text-white font-semibold">Pakiet całodniowy (8h)</span>
                      </div>
                      <div className="text-right">
                        <span className="font-barlow font-extrabold text-2xl text-blue dark:text-blue-light block">{formatPriceLabel(2800)}</span>
                        <span className="text-[10px] text-blue/70 dark:text-blue-light/70 font-semibold">Oszczędzasz {formatPriceLabel(600)}</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border dark:border-dark-border">
                      <p className="text-navy dark:text-white text-[13px] font-semibold mb-2">Opcje dodatkowe:</p>
                      <div className="space-y-1.5 pl-3 border-l-2 border-blue/30 dark:border-blue-light/30">
                        <div className="flex justify-between"><span>Live editing (Social Media)</span><span>{formatPriceLabel(20)} / zdjęcie</span></div>
                        <div className="flex justify-between"><span>Ekspresowa dostawa (do 48h po evencie)</span><span>+50% ceny</span></div>
                        <div className="flex justify-between"><span>Ujęcia z drona</span><span>+{formatPriceLabel(200)}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* --- Zdjęcia i wideo z drona --- */}
          <AnimatedSection>
            <div id="pricing-card-dron" className={`scroll-mt-24 bg-white dark:bg-dark-card rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen("dron") ? "border-blue dark:border-blue-light shadow-sm shadow-blue/5" : "border-border dark:border-dark-border hover:border-blue/50 dark:hover:border-blue-light/30"
            }`}>
              <button
                onClick={() => toggleSection("dron")}
                aria-expanded={isOpen("dron")}
                aria-controls="pricing-dron"
                className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="6" cy="6" r="2.5" />
                      <circle cx="18" cy="6" r="2.5" />
                      <circle cx="6" cy="18" r="2.5" />
                      <circle cx="18" cy="18" r="2.5" />
                      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
                      <path strokeLinecap="round" d="M7.8 7.8l1.7 1.7M16.2 7.8l-1.7 1.7M7.8 16.2l1.7-1.7M16.2 16.2l-1.7-1.7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-barlow font-bold text-lg transition-colors ${isOpen("dron") ? "text-blue dark:text-blue-light" : "text-navy dark:text-white group-hover:text-blue dark:group-hover:text-blue-light"}`}>
                      Zdjęcia i wideo z drona
                    </h3>
                    <p className="text-[13px] text-steel dark:text-dark-text-muted">
                      od {formatPriceLabel(500)}
                    </p>
                  </div>
                </div>
                <ChevronIcon open={isOpen("dron")} />
              </button>

              <div
                id="pricing-dron"
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen("dron") ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 md:px-8 pb-6 pt-2 border-t border-border/50 dark:border-dark-border space-y-4 text-[13px] text-steel dark:text-dark-text-muted">
                    <p className="text-[12px]">
                      1h lotu w cenie. W godzinę wykonuję do 10 wyretuszowanych zdjęć lub do 60 s zmontowanego materiału 4K.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-navy dark:text-white font-semibold">Zdjęcia z drona</span>
                        <span className="block text-[11px]">Do 10 wyretuszowanych zdjęć z powietrza</span>
                      </div>
                      <span className="font-barlow font-bold text-lg text-blue dark:text-blue-light whitespace-nowrap">{formatPriceLabel(600)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-navy dark:text-white font-semibold">Przebitki 4K do montażu własnego</span>
                        <span className="block text-[11px]">Wyselekcjonowane ujęcia 4K, korekcja barwna, bez montażu</span>
                      </div>
                      <span className="font-barlow font-bold text-lg text-blue dark:text-blue-light whitespace-nowrap">{formatPriceLabel(500)}</span>
                    </div>
                    <div className="bg-blue/5 dark:bg-blue-light/5 rounded-xl p-4 border border-blue/10 dark:border-blue-light/10 flex justify-between items-center">
                      <div>
                        <span className="text-navy dark:text-white font-semibold">Wideo z drona 4K</span>
                        <span className="block text-[11px] text-blue/70 dark:text-blue-light/70 font-semibold">Rekomendowane · zmontowany materiał do 60 s</span>
                      </div>
                      <span className="font-barlow font-extrabold text-2xl text-blue dark:text-blue-light whitespace-nowrap">{formatPriceLabel(900)}</span>
                    </div>
                    <div className="pt-3 border-t border-border dark:border-dark-border">
                      <p className="text-navy dark:text-white text-[13px] font-semibold mb-2">Komplet z jednego lotu:</p>
                      <div className="space-y-1.5 pl-3 border-l-2 border-blue/30 dark:border-blue-light/30">
                        <div className="flex justify-between"><span>Zdjęcia + przebitki 4K</span><span>{formatPriceLabel(700)}</span></div>
                        <div className="flex justify-between"><span>Zdjęcia + wideo (montaż)</span><span>{formatPriceLabel(1100)}</span></div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border dark:border-dark-border">
                      <p className="text-navy dark:text-white text-[13px] font-semibold mb-2">Opcje dodatkowe:</p>
                      <div className="space-y-1.5 pl-3 border-l-2 border-blue/30 dark:border-blue-light/30">
                        <div className="flex justify-between"><span>Kolejna godzina lotu</span><span>{formatPriceLabel(300)}</span></div>
                        <div className="flex justify-between"><span>Dodatkowe zdjęcie</span><span>{formatPriceLabel(80)}</span></div>
                        <div className="flex justify-between"><span>Jako dodatek do innej sesji (do 3 ujęć)</span><span>{formatPriceLabel(200)}</span></div>
                      </div>
                    </div>
                    <p className="text-[11px]">
                      Dron DJI, certyfikat operatora A1/A3 i ubezpieczenie OC. W standardowych lokalizacjach loty bez dopłat, w strefach kontrolowanych zgody PAŻP wyceniane indywidualnie.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* --- Wideo Marketing --- */}
          <AnimatedSection>
            <div id="pricing-card-wideo" className={`scroll-mt-24 bg-white dark:bg-dark-card rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen("wideo") ? "border-blue dark:border-blue-light shadow-sm shadow-blue/5" : "border-border dark:border-dark-border hover:border-blue/50 dark:hover:border-blue-light/30"
            }`}>
              <button
                onClick={() => toggleSection("wideo")}
                aria-expanded={isOpen("wideo")}
                aria-controls="pricing-wideo"
                className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-barlow font-bold text-lg transition-colors ${isOpen("wideo") ? "text-blue dark:text-blue-light" : "text-navy dark:text-white group-hover:text-blue dark:group-hover:text-blue-light"}`}>
                      Wideo Marketing
                    </h3>
                    <p className="text-[13px] text-steel dark:text-dark-text-muted">
                      od {formatPriceLabel(300)}
                    </p>
                  </div>
                </div>
                <ChevronIcon open={isOpen("wideo")} />
              </button>

              <div
                id="pricing-wideo"
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen("wideo") ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 md:px-8 pb-6 pt-2 border-t border-border/50 dark:border-dark-border space-y-4 text-[13px] text-steel dark:text-dark-text-muted">
                    <div className="pt-1">
                      <p className="text-navy dark:text-white text-[13px] font-semibold mb-2">Praca operatora:</p>
                      <div className="space-y-1.5 pl-3 border-l-2 border-blue/30 dark:border-blue-light/30">
                        <div className="flex justify-between"><span>Pierwsza godzina</span><span>{formatPriceLabel(400)}</span></div>
                        <div className="flex justify-between"><span>Każda kolejna godzina</span><span>{formatPriceLabel(200)}</span></div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border dark:border-dark-border">
                      <p className="text-navy dark:text-white text-[13px] font-semibold mb-2">Pakiety montażowe:</p>
                      <div className="space-y-1.5 pl-3 border-l-2 border-blue/30 dark:border-blue-light/30">
                        <div className="flex justify-between"><span>XS Teaser (&lt;15s)</span><span>{formatPriceLabel(300)}</span></div>
                        <div className="flex justify-between"><span>S Reels (&lt;30s)</span><span>{formatPriceLabel(600)}</span></div>
                        <div className="flex justify-between"><span>M Event recap (&lt;60s)</span><span>{formatPriceLabel(900)}</span></div>
                        <div className="flex justify-between"><span>L Promo (1-2min)</span><span>{formatPriceLabel(1400)}</span></div>
                        <div className="flex justify-between"><span>XL Dokument (~3min)</span><span>{formatPriceLabel(1800)}</span></div>
                      </div>
                    </div>
                    <div className="bg-blue/5 dark:bg-blue-light/5 rounded-xl p-4 border border-blue/10 dark:border-blue-light/10">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-navy dark:text-white font-semibold">Monthly Content</span>
                        <span className="font-barlow font-extrabold text-xl text-blue dark:text-blue-light">{formatPriceLabel(4900)} / m-c</span>
                      </div>
                      <p className="text-[11px] text-steel dark:text-dark-text-muted">
                        1 dzień zdjęciowy + montaż 4 reelsów (min. 3 miesiące umowy)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* --- Zespoły i Biura --- */}
          <AnimatedSection>
            <div id="pricing-card-zespoly" className={`scroll-mt-24 bg-white dark:bg-dark-card rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen("zespoly") ? "border-blue dark:border-blue-light shadow-sm shadow-blue/5" : "border-border dark:border-dark-border hover:border-blue/50 dark:hover:border-blue-light/30"
            }`}>
              <button
                onClick={() => toggleSection("zespoly")}
                aria-expanded={isOpen("zespoly")}
                aria-controls="pricing-zespoly"
                className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-barlow font-bold text-lg transition-colors ${isOpen("zespoly") ? "text-blue dark:text-blue-light" : "text-navy dark:text-white group-hover:text-blue dark:group-hover:text-blue-light"}`}>
                      Zespoły i Biura
                    </h3>
                    <p className="text-[13px] text-steel dark:text-dark-text-muted">
                      od {formatPriceLabel(150)}
                    </p>
                  </div>
                </div>
                <ChevronIcon open={isOpen("zespoly")} />
              </button>

              <div
                id="pricing-zespoly"
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen("zespoly") ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 md:px-8 pb-6 pt-2 border-t border-border/50 dark:border-dark-border space-y-4 text-[13px] text-steel dark:text-dark-text-muted">
                    <div>
                      <p className="text-navy dark:text-white text-[13px] font-semibold mb-2">Stawka za osobę (1 retusz, progresywnie):</p>
                      <div className="space-y-1.5 pl-3 border-l-2 border-blue/30 dark:border-blue-light/30">
                        <div className="flex justify-between"><span>Osoby 4-10</span><span>{formatPriceLabel(150)}</span></div>
                        <div className="flex justify-between"><span>Osoby 11-30</span><span>{formatPriceLabel(120)}</span></div>
                        <div className="flex justify-between"><span>Osoby od 31</span><span>{formatPriceLabel(100)}</span></div>
                      </div>
                      <p className="text-[11px] text-steel dark:text-dark-text-muted mt-1.5">
                        Niższa cena dotyczy tylko osób w danym przedziale, nie całej grupy — więcej osób nigdy nie obniża sumy.
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border dark:border-dark-border">
                      <span>Dodatkowe ujęcie</span><span>{formatPriceLabel(80)}</span>
                    </div>
                    <div className="pt-3">
                      <p className="text-navy dark:text-white text-[13px] font-semibold mb-2">Wynajem studia zewnętrznego:</p>
                      <div className="space-y-1.5 pl-3 border-l-2 border-blue/30 dark:border-blue-light/30">
                        <div className="flex justify-between"><span>Do 2h</span><span>{formatPriceLabel(300)}</span></div>
                        <div className="flex justify-between"><span>Do 4h</span><span>{formatPriceLabel(400)}</span></div>
                        <div className="flex justify-between"><span>Bez limitu</span><span>{formatPriceLabel(800)}</span></div>
                      </div>
                    </div>
                    <div className="bg-blue/5 dark:bg-blue-light/5 rounded-xl p-4 border border-blue/10 dark:border-blue-light/10">
                      <div className="flex justify-between items-start mb-1 gap-3">
                        <span className="text-navy dark:text-white font-semibold">lub rozstawienie mobilnego studia w Twoim biurze</span>
                        <span className="font-barlow font-extrabold text-xl text-blue dark:text-blue-light whitespace-nowrap">{formatPriceLabel(450)}</span>
                      </div>
                      <p className="text-[11px] text-steel dark:text-dark-text-muted">
                        Mobilne studio u Ciebie w biurze, rozstawienie ok. 20 min, wystarczy ~3 m².
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* --- Fotografia Produktowa --- */}
          <AnimatedSection>
            <div id="pricing-card-produkt" className={`scroll-mt-24 bg-white dark:bg-dark-card rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen("produkt") ? "border-blue dark:border-blue-light shadow-sm shadow-blue/5" : "border-border dark:border-dark-border hover:border-blue/50 dark:hover:border-blue-light/30"
            }`}>
              <button
                onClick={() => toggleSection("produkt")}
                aria-expanded={isOpen("produkt")}
                aria-controls="pricing-produkt"
                className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-barlow font-bold text-lg transition-colors ${isOpen("produkt") ? "text-blue dark:text-blue-light" : "text-navy dark:text-white group-hover:text-blue dark:group-hover:text-blue-light"}`}>
                      Fotografia Produktowa
                    </h3>
                    <p className="text-[13px] text-steel dark:text-dark-text-muted">
                      od {formatPriceLabel(55)}
                    </p>
                  </div>
                </div>
                <ChevronIcon open={isOpen("produkt")} />
              </button>

              <div
                id="pricing-produkt"
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen("produkt") ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 md:px-8 pb-6 pt-2 border-t border-border/50 dark:border-dark-border space-y-4 text-[13px] text-steel dark:text-dark-text-muted">
                    <div className="bg-blue/5 dark:bg-blue-light/5 rounded-xl p-3 text-[12px] text-navy dark:text-white border border-blue/10 dark:border-blue-light/10">
                      Minimalne zamówienie: {formatPriceLabel(500)} lub 6 zdjęć
                    </div>
                    <div className="pt-2">
                      <p className="text-navy dark:text-white text-[13px] font-semibold mb-2">Packshot (białe tło, progresywnie):</p>
                      <div className="space-y-1.5 pl-3 border-l-2 border-blue/30 dark:border-blue-light/30">
                        <div className="flex justify-between"><span>Sztuki 1-20</span><span>{formatPriceLabel(90)}</span></div>
                        <div className="flex justify-between"><span>Sztuki 21-50</span><span>{formatPriceLabel(70)}</span></div>
                        <div className="flex justify-between"><span>Sztuki od 51</span><span>{formatPriceLabel(55)}</span></div>
                      </div>
                      <p className="text-[11px] text-steel dark:text-dark-text-muted mt-1.5">
                        Niższa cena dotyczy tylko sztuk w danym przedziale, nie całego zamówienia — więcej sztuk nigdy nie obniża sumy.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-border dark:border-dark-border">
                      <p className="text-navy dark:text-white text-[13px] font-semibold mb-2">Zdjęcia kreatywne / reklamowe:</p>
                      <div className="space-y-1.5 pl-3 border-l-2 border-blue/30 dark:border-blue-light/30">
                        <div className="flex justify-between"><span>Internet / Social Media</span><span>od {formatPriceLabel(200)}</span></div>
                        <div className="flex justify-between"><span>Druk / Outdoor</span><span>od {formatPriceLabel(600)}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* === KALKULATOR WYCENY (STAŁY KAFELEK) === */}
          <AnimatedSection>
            <div id="kalkulator" className="scroll-mt-24 bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border overflow-hidden">
              <div className="px-6 md:px-8 py-5 flex items-center gap-4 border-b border-border/50 dark:border-dark-border">
                <div className="w-10 h-10 rounded-xl bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-barlow font-bold text-lg text-blue dark:text-blue-light">
                    Kalkulator Wyceny
                  </h3>
                  <p className="text-[13px] text-steel dark:text-dark-text-muted">
                    Oblicz szacunkowy koszt usługi
                  </p>
                </div>
              </div>
              <div className="px-6 md:px-8 pb-8 pt-4">
                <PricingCalculator />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
