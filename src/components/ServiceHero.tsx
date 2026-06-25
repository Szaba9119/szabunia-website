"use client";

import Link from "next/link";
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

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Text */}
          <AnimatedSection>
            <div className="w-12 h-12 rounded-xl bg-blue-pale dark:bg-blue/15 flex items-center justify-center mb-5" aria-hidden="true">
              {service.icon}
            </div>
            <h1 className="font-barlow font-black text-3xl md:text-[44px] leading-tight tracking-tight text-navy dark:text-white mb-4">
              {service.title}
            </h1>
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
                Zapytaj o wycenę
              </a>
              <a
                href="#cennik"
                className="border border-border dark:border-dark-border text-navy dark:text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] hover:border-blue dark:hover:border-blue-light transition-colors"
              >
                Zobacz cennik
              </a>
            </div>
            <p className="mt-4 text-[12.5px] text-steel dark:text-dark-text-muted">
              Odpowiadam w 24h · Faktura VAT · 2 tury poprawek w cenie
            </p>
          </AnimatedSection>

          {/* Dla kogo */}
          <AnimatedSection delay={0.15}>
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 md:p-8">
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
      </div>
    </section>
  );
}
