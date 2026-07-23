import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

interface Props {
  /** Kotwica cenowa usługi, np. "od 1 000 zł". */
  price: string;
  /** 2-3 zdania: co wpływa na wycenę tej usługi. Bez kwot. */
  blurb: string;
}

// Sekcja "Wycena" na podstronach usług (§4.2 brief-20). Zastępuje dawną
// PortfolioPricing (pełne pakiety/tabele) — ta zostaje nietknięta, bo jest
// współdzielona z case studies portfolio (poza zakresem depricingu).
export default function ServicePricing({ price, blurb }: Props) {
  return (
    <>
      {/* Kotwica wsteczna: stare linki do /#cennik nadal trafiają w to miejsce. */}
      <div id="cennik" className="scroll-mt-24" aria-hidden="true" />
      <section id="wycena" className="scroll-mt-24 py-12 md:py-16 px-4 bg-gray-bg dark:bg-dark-bg">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <Parallax distance={PARALLAX.accent} direction="up">
              <h2 className="font-barlow font-extrabold text-3xl md:text-[40px] leading-tight tracking-tight text-navy dark:text-white mb-3">
                Wycena
              </h2>
            </Parallax>
            <p className="font-barlow font-extrabold text-3xl md:text-4xl text-blue dark:text-blue-light mb-5">
              {price} netto
            </p>
            <p className="text-steel dark:text-dark-text-muted text-[15px] leading-relaxed mb-6 max-w-xl mx-auto">
              {blurb}
            </p>
            <p className="text-[13px] text-steel dark:text-dark-text-muted mb-8">
              2 tury poprawek foto / 3 wideo w cenie · ekspres do 48h +50% · faktura VAT
            </p>
            <a
              href="#kontakt"
              data-cta="wycena_usluga_sekcja"
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
