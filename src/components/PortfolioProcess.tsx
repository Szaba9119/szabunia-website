import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import type { ProcessStep } from "@/data/portfolio";

interface Props {
  steps: ProcessStep[];
  /** Nagłówek sekcji. Domyślnie „Jak wygląda współpraca” (strony portfolio).
      Strony usług podają własny, z frazą (audyt 2026-07-30). */
  heading?: string;
}

export default function PortfolioProcess({ steps, heading }: Props) {
  if (steps.length === 0) return null;
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          {/* Nagłówek i podtytuł w jednym Parallaxie (14.09.2026): sam h2 jeździł ±24 px
              nad odstępem 12 px i przy scrollu nachodził na podtytuł. Wzór z Services.tsx. */}
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[40px] leading-tight tracking-tight text-navy dark:text-white mb-4 text-center">
              {heading ?? "Jak wygląda współpraca"}
            </h2>
            <p className="text-steel dark:text-dark-text-muted text-[15px] leading-relaxed text-center mb-12 max-w-md mx-auto">
              Cztery kroki od pierwszego kontaktu do gotowych materiałów.
            </p>
          </Parallax>
        </AnimatedSection>

        {/* JEDNA LISTA W DOM, 14.09.2026 (audyt MASTER, P0-035). Wcześniej komponent
            renderował dwie kopie tych samych kroków: pozioma oś `hidden md:block`
            i pionowa `md:hidden`. W HTML każda podstrona usługi i każde case study
            z procesem miały więc po osiem nagłówków h3 zamiast czterech, a zmiana
            wyglądu jednej wersji nie przenosiła się na drugą.
            Wygląd obu wersji zostaje jeden do jednego, przełącza go wyłącznie CSS:
            telefon = pionowa oś z łącznikiem między kółkami, desktop = pozioma oś
            z gradientową linią przez cztery kroki. */}
        <AnimatedSection>
          <div className="relative">
            {steps.length === 4 && (
              <div
                className="hidden md:block absolute top-[28px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-0.5 bg-gradient-to-r from-blue/30 via-blue to-blue/30"
                aria-hidden="true"
              />
            )}
            <ol aria-label="Etapy współpracy" className="relative md:grid md:grid-cols-4 md:gap-6">
              {steps.map((step, i) => (
                <li
                  key={step.num}
                  className="flex gap-4 md:gap-0 md:flex-col md:items-center md:text-center"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue to-blue text-white flex items-center justify-center font-barlow font-extrabold text-base md:text-xl shadow-md shadow-blue/20 md:shadow-lg md:shadow-blue/25 md:mb-5">
                      {step.num}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="md:hidden w-0.5 flex-1 bg-blue/20 my-1" aria-hidden="true" />
                    )}
                  </div>
                  <div className="bg-white dark:bg-dark-card rounded-2xl p-4 md:p-5 border border-border dark:border-dark-border flex-1 w-full mb-3 md:mb-0 md:hover:border-blue md:hover:-translate-y-0.5 transition-all">
                    <h3 className="font-barlow font-bold text-sm md:text-base text-navy dark:text-white mb-1 md:mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-[13px] text-steel dark:text-dark-text-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
