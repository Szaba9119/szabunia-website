"use client";

import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import { serviceItems } from "@/data/services";

export default function Services() {
  return (
    <section id="uslugi" className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Czym mogę pomóc Twojej firmie
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            Kompleksowe usługi foto i wideo dla firm.
          </p>
        </AnimatedSection>

        {/* Usługi — grid 3×2 + Pakiety (bestseller) na pełną szerokość ostatniego
            rzędu: bez „sieroty" w gridzie, z poziomym układem na md+ i badge
            „Bestseller" (audyt UX 2026-07-06). Obrazy na mobile w 16:9 zamiast
            4:3 — sekcja zajmowała ~6,4 ekranu telefonu. */}
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {serviceItems.map((s) => {
              const isPakiet = s.slug === "pakiety-foto-wideo";
              // Wariant C (chowanie zdjęć części usług na mobile) WYCOFANY decyzją
              // Marcina po obejrzeniu (2026-07-06): zdjęcia zawsze widoczne — to
              // wizytówka fotografa. Nie przywracać bez jego wyraźnej prośby.
              return (
                <div
                  key={s.title}
                  className={`bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border hover:border-blue dark:hover:border-blue transition-all hover:-translate-y-0.5 group overflow-hidden${
                    isPakiet ? " sm:col-span-2 md:col-span-3" : ""
                  }`}
                >
                  <Link
                    href={`/uslugi/${s.slug}`}
                    className={isPakiet ? "block md:flex md:items-stretch" : "block"}
                  >
                    {s.image && (
                      <div
                        className={`relative overflow-hidden bg-border dark:bg-dark-border ${
                          isPakiet
                            ? // 3:2 na md+ = natywna proporcja zdjęcia (zero przycinania);
                              // objectPosition dla mobile ustawiony w SERVICE_TILE_POS.
                              "aspect-video md:aspect-[3/2] md:w-2/5"
                            : "aspect-video sm:aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={s.image}
                          alt={`${s.title}, przykładowa realizacja`}
                          fill
                          sizes={
                            isPakiet
                              ? "(max-width: 768px) 100vw, 40vw"
                              : "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          }
                          style={{ objectPosition: s.imagePos }}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {isPakiet && (
                          <span className="absolute top-3 left-3 bg-blue text-white px-3 py-1 rounded-full text-[10px] font-barlow font-bold uppercase tracking-wider shadow-lg">
                            Bestseller
                          </span>
                        )}
                        {s.slug === "wideo-marketing" && (
                          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/50 flex items-center justify-center text-white shadow-lg">
                              <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          </span>
                        )}
                      </div>
                    )}
                    <div className={isPakiet ? "p-6 md:p-8 md:flex-1 md:self-center" : "p-6"}>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true">
                          {s.icon}
                        </div>
                        <h3 className="font-barlow font-bold text-base text-navy dark:text-white">
                          {s.title}
                        </h3>
                      </div>
                      <p className="text-steel dark:text-dark-text-muted text-[13px] leading-relaxed mb-3">
                        {s.desc}
                      </p>
                      <p className="text-blue dark:text-blue-light text-[12px] font-barlow font-semibold">
                        {s.price}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Linijka o modelu wyceny „na zapytanie" + CTA do formularza
            (2026-07-23, prośba Marcina). Wyjątek od „bez bocznych wyjść": to CTA
            konwersyjne do #kontakt (ten sam cel co hero), nie link informacyjny.
            Głos strony, bez żargonu „brief". */}
        <AnimatedSection>
          <div className="mt-12 text-center">
            <p className="text-steel dark:text-dark-text-muted text-[15px] max-w-xl mx-auto">
              Każdy projekt wyceniam indywidualnie. Napisz w kilku zdaniach, co
              planujesz, a wrócę do Ciebie z gotową ofertą{" "}
              <span className="text-navy dark:text-white font-semibold">w ciągu 24h</span>.
            </p>
            <a
              href="#kontakt"
              data-cta="wycena_home_uslugi"
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]"
            >
              Zapytaj o ofertę
              <span className="text-white/80">→</span>
            </a>
          </div>
        </AnimatedSection>

        {/* Link „Zobacz wszystkie usługi" usunięty (decyzja Marcina, 2026-07-07:
            lejek bez bocznych wyjść — kafle i tak prowadzą do podstron usług).
            Link SEO z home do huba /uslugi przeniesiony do stopki (Footer.tsx). */}
      </div>
    </section>
  );
}
