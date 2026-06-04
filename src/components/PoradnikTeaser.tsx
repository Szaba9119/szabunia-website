"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function PoradnikTeaser() {
  return (
    <section id="poradnik" className="py-12 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="relative rounded-[20px] overflow-hidden bg-navy dark:bg-dark-card dark:border dark:border-dark-border px-6 py-10 md:px-12 md:py-14">
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              {/* Text */}
              <div>
                <p className="text-[11px] font-barlow font-semibold uppercase tracking-[0.16em] text-blue-light mb-3">
                  Darmowy poradnik
                </p>
                <h2 className="font-barlow font-black text-3xl md:text-[36px] leading-[1.1] tracking-tight text-white mb-3">
                  Przygotuj się do sesji
                  <br />
                  jak zawodowiec
                </h2>
                <p className="text-steel-light text-[15px] leading-relaxed mb-7 max-w-md">
                  Checklisty, planer stylizacji, ściąga kolorów i mini-brief w jednym
                  pliku PDF. Wyjdziesz na zdjęciach pewnie i naturalnie — nawet jeśli
                  zwykle nie lubisz się fotografować.
                </p>
                <Link
                  href="/poradnik"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-6 py-3.5 rounded-xl font-barlow font-bold text-sm btn-glow hover:scale-[1.01] transition-transform"
                >
                  Pobierz za darmo
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Cover */}
              <div className="hidden md:block">
                <Link href="/poradnik" aria-label="Pobierz darmowy poradnik" className="block">
                  <div className="relative aspect-[210/297] max-w-[260px] ml-auto rounded-xl overflow-hidden bg-white shadow-2xl ring-1 ring-white/10 rotate-[2deg] hover:rotate-0 transition-transform">
                    <Image
                      src="/images/poradnik-cover.png"
                      alt="Podgląd poradnika — Pakiet przygotowania do sesji biznesowej"
                      fill
                      className="object-cover"
                      sizes="260px"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
