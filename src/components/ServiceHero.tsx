"use client";

import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import type { ServiceData } from "@/data/services";

interface Props {
  service: ServiceData;
}

export default function ServiceHero({ service }: Props) {
  return (
    <section className="pt-28 pb-12 md:pt-36 md:pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <AnimatedSection>
          <nav aria-label="Ścieżka nawigacji" className="mb-8">
            <ol className="flex items-center gap-1.5 text-[13px] text-steel dark:text-dark-text-muted flex-wrap">
              <li>
                <Link href="/" className="hover:text-blue dark:hover:text-blue-light transition-colors">
                  Strona główna
                </Link>
              </li>
              <li aria-hidden="true" className="text-steel-light">/</li>
              <li>
                <Link href="/#uslugi" className="hover:text-blue dark:hover:text-blue-light transition-colors">
                  Usługi
                </Link>
              </li>
              <li aria-hidden="true" className="text-steel-light">/</li>
              <li>
                <span className="text-navy dark:text-white font-semibold">{service.title}</span>
              </li>
            </ol>
          </nav>
        </AnimatedSection>

        {/* Tekst + zdjęcie: kolejność w DOM = kolejność na mobile (tekst i CTA
            pierwsze, zdjęcie pod spodem, nie spycha ich pod fold). Desktop:
            dwie kolumny obok siebie (brief-22 zad. 8). */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Text */}
          <AnimatedSection>
            <div className="w-12 h-12 rounded-xl bg-blue-pale dark:bg-blue/15 flex items-center justify-center mb-5" aria-hidden="true">
              {service.icon}
            </div>
            <h1 className="font-barlow font-black text-3xl md:text-[44px] leading-tight tracking-tight text-navy dark:text-white mb-2">
              {service.title}
            </h1>
            {/* Kotwica cenowa, mały element typograficzny — nie badge (brief-22 §3). */}
            <p className="font-barlow font-semibold text-sm text-steel dark:text-dark-text-muted tracking-wide mb-4">
              {service.price} netto
            </p>
            <p className="text-steel dark:text-dark-text-muted text-[15px] leading-relaxed mb-4">
              {service.subtitle}
            </p>
            <p className="text-text-body dark:text-dark-text text-[14px] leading-relaxed">
              {service.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                data-cta="wycena_hero"
                className="bg-gradient-to-br from-blue to-blue-light text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] btn-glow transition-transform hover:scale-[1.02]"
              >
                Zapytaj o ofertę
              </a>
            </div>
            {/* Chipy zaufania — spójne z hero strony głównej (audyt podstron
                2026-07-07). Poprzedni zlepek z kropkami łamał się przypadkowo,
                a „2 tury poprawek" było nieścisłe dla usług wideo (3 tury). */}
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Najważniejsze warunki współpracy">
              <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border dark:border-dark-border text-[12px] text-steel dark:text-dark-text-muted">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Odpowiedź w 24h
              </li>
              <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border dark:border-dark-border text-[12px] text-steel dark:text-dark-text-muted">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Faktura VAT
              </li>
              <li>
                <a
                  href="tel:+48514900688"
                  data-cta="tel_service_hero"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue/40 dark:border-blue-light/40 text-[12px] font-barlow font-semibold text-blue dark:text-blue-light hover:bg-blue hover:text-white dark:hover:bg-blue-light dark:hover:text-navy transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  514 900 688
                </a>
              </li>
            </ul>
          </AnimatedSection>

          {/* Zdjęcie usługi (brief-22 zad. 8) — priority, LCP element strony. */}
          <AnimatedSection delay={0.15}>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-border dark:bg-dark-card">
              <Image
                src={service.heroImage}
                alt={`${service.title}, Poznań`}
                fill
                className="object-cover"
                style={{ objectPosition: service.heroImagePos ?? "center" }}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={72}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0YxRjVGOSIvPjwvc3ZnPg=="
              />
            </div>
          </AnimatedSection>
        </div>

        {/* Dla kogo — pod hero, nie w kolumnie ze zdjęciem (brief-22 zad. 8). */}
        <AnimatedSection delay={0.25} className="mt-8 md:mt-10">
          <div className="max-w-xl bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 md:p-8">
            <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-5">
              Dla kogo?
            </h2>
            <ul className="flex flex-col gap-3">
              {service.forWhom.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue dark:text-blue-light flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-text-body dark:text-dark-text text-[14px] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            {service.portfolioSlug && (
              <Link
                href={`/portfolio/${service.portfolioSlug}`}
                className="mt-6 inline-flex items-center gap-2 text-blue dark:text-blue-light text-[13px] font-barlow font-semibold hover:underline"
              >
                Zobacz realizacje
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
