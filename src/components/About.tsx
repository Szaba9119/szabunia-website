"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import CountUp from "./CountUp";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

export default function About() {
  return (
    <section id="o-mnie" className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Zdjęcie — tylko na desktopie. Na telefonie sekcja jest tekstowa
              (bez dublowania portretu z hero w pierwszym przewinięciu). */}
          <AnimatedSection className="hidden lg:block">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-border dark:bg-dark-card">
              <Parallax distance={PARALLAX.subtle} direction="up" className="absolute inset-0">
                <div className="absolute inset-0 scale-[1.15]">
                  <Image
                    src="/images/marcin-o-mnie.jpg"
                    alt="Marcin Szabunia, fotograf biznesowy, portret, Poznań"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0px, 520px"
                    quality={80}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg=="
                  />
                </div>
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
            </div>
          </AnimatedSection>

          {/* Tekst */}
          <AnimatedSection delay={0.15}>
            <div>
              <Parallax distance={PARALLAX.accent} direction="up">
                <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-6 text-center lg:text-left">
                  O mnie
                </h2>
              </Parallax>

              <div className="space-y-5 text-steel dark:text-dark-text-muted text-[15px] leading-relaxed">
                <p>
                  Cześć, jestem Marcin. <strong>Od 2018 roku</strong> buduję wizerunek firm poprzez
                  fotografię biznesową i wideo marketing. Bazuję w Poznaniu,
                  pracuję w całej Polsce i Europie.
                </p>
                <p>
                  Ukończyłem <strong>studia z zarządzania</strong>, więc rozumiem nie tylko kadr,
                  ale i biznesowy cel, któremu zdjęcia mają służyć.
                  Specjalizuję się w obsłudze <strong>marek B2B i korporacji</strong>, które
                  potrzebują powtarzalnego standardu wizerunkowego między sesjami.
                  Portrety biznesowe, reportaże z eventów, fotografia produktowa,
                  wideo marketingowe. <strong>Jeden twórca</strong>, spójny materiał i krótka droga
                  od briefu do dostawy.
                </p>
                <p>
                  Współpracowałem m.in. z <strong>H&amp;M</strong>,{" "}
                  <strong>Warner Music Poland</strong>, <strong>Santander Bank Polska</strong>,{" "}
                  <strong>John Deere</strong>, <strong>IQOS</strong>, <strong>Amica</strong>,{" "}
                  <strong>Grupa Forte S.A.</strong>, <strong>Centrum Posnania</strong> i{" "}
                  <strong>Woohoo</strong>. Otrzymałem wyróżnienie
                  w ogólnopolskim konkursie <strong>Portret 2022</strong>.
                </p>
              </div>

              {/* Stats bar */}
              <div className="mt-8 pt-6 border-t border-border dark:border-dark-border">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { end: 250000, suffix: "+", label: "wykonanych zdjęć" },
                    { end: 1000, suffix: "+", label: "zrealizowanych sesji i eventów" },
                    { end: 100, suffix: "+", label: "obsłużonych marek i firm" },
                    { end: 8, suffix: "+", label: "lat doświadczenia" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-barlow font-extrabold text-2xl md:text-3xl text-blue dark:text-blue-light leading-none mb-1">
                        <CountUp end={stat.end} suffix={stat.suffix} duration={stat.end > 10000 ? 2500 : 2000} />
                      </p>
                      <p className="text-[11px] text-steel dark:text-dark-text-muted leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instagram link — wyśrodkowany na mobile/tablecie (spójnie z hero
                  i nagłówkiem „O mnie"); na desktopie lg do lewej (układ 2-kol.). */}
              <div className="mt-8 text-center lg:text-left">
                <a
                  href="https://instagram.com/szabunia.biz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-navy dark:text-white hover:text-blue dark:hover:text-blue-light transition-colors group"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="font-barlow font-semibold text-sm">
                    @szabunia.biz
                  </span>
                  <span className="text-steel group-hover:text-blue transition-colors">
                    →
                  </span>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
