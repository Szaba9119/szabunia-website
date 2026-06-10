"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

export default function Publications() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-[11px] uppercase tracking-widest text-steel dark:text-dark-text-muted mb-3 font-barlow font-semibold text-center">
            Publikacje
          </p>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Zdjęcia, które trafiają do druku
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            Zdjęcia, które robię dla moich klientów, trafiają nie tylko do internetu. Licencjonuję je do reklam drukowanych, outdooru, katalogów i międzynarodowej prasy branżowej.
          </p>
        </AnimatedSection>

        {/* Karta publikacji: Big Furniture Group Magazine */}
        <AnimatedSection>
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 md:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
            <a
              href="https://bigfurnituregroup.com/big-furniture-group-magazine-april-2026-now-live/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Okładka Big Furniture Group Magazine, kwiecień 2026 (otwiera się w nowej karcie)"
              className="block shrink-0 w-40 sm:w-44 mx-auto sm:mx-0 rounded-lg overflow-hidden border border-border dark:border-dark-border shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src="/images/publikacje/bfg-april-2026.jpg"
                alt="Okładka Big Furniture Group Magazine, kwiecień 2026, z meblami Forte na okładce"
                width={290}
                height={416}
                className="w-full h-auto"
              />
            </a>
            <div className="min-w-0">
            <p className="text-[10px] font-barlow font-semibold uppercase tracking-wider text-steel dark:text-dark-text-muted mb-3">
              Prasa branżowa · UK · 2026
            </p>
            <h3 className="font-barlow font-bold text-xl text-navy dark:text-white mb-1">
              Big Furniture Group Magazine
            </h3>
            <p className="text-[13px] text-steel dark:text-dark-text-muted mb-4">
              Kwiecień 2026, wydanie z Forte jako cover story
            </p>
            <p className="text-[15px] text-steel dark:text-dark-text-muted leading-relaxed mb-6">
              Fotografie wykonane dla <strong className="text-navy dark:text-white font-semibold">Grupa Forte S.A.</strong> znalazły się w kwietniowym wydaniu Big Furniture Group Magazine, brytyjskiego pisma branży meblarskiej audytowanego przez ABC. Wydanie, w którym Forte była cover story.
            </p>
            <a
              href="https://bigfurnituregroup.com/big-furniture-group-magazine-april-2026-now-live/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue dark:text-blue-light hover:text-blue-light dark:hover:text-white text-[13px] font-barlow font-semibold transition-colors"
            >
              Zobacz wydanie →
            </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
