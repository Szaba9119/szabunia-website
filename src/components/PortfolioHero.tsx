"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import type { PortfolioCategory } from "@/data/portfolio";

interface Props {
  category: PortfolioCategory;
}

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg==";

/** Ikona chipu linku klienta dobierana po adresie (Instagram / mapa / globus). */
function ClientLinkIcon({ url }: { url: string }) {
  const cls = "w-3.5 h-3.5 shrink-0";
  const common = {
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.8,
    "aria-hidden": true as const,
  };
  if (url.includes("instagram.com")) {
    return (
      <svg className={cls} {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (url.includes("share.google") || url.includes("maps.")) {
    return (
      <svg className={cls} {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    );
  }
  return (
    <svg className={cls} {...common}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M3 12h18M12 3c2.5 2.6 3.75 5.7 3.75 9S14.5 18.4 12 21c-2.5-2.6-3.75-5.7-3.75-9S9.5 5.6 12 3z" />
    </svg>
  );
}

export default function PortfolioHero({ category }: Props) {
  const isPortrait = (category.heroAspect ?? category.galleryAspect) === "portrait";
  const heroAspect = isPortrait ? "aspect-[3/4] max-w-md mx-auto md:mx-0" : "aspect-[4/3]";
  // Pionowe kadry kotwiczymy do góry, żeby nie ucinać głów.
  const heroObjectPosition = isPortrait ? "object-top" : "";
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
                <Link href="/#portfolio" className="hover:text-blue dark:hover:text-blue-light transition-colors">
                  Portfolio
                </Link>
              </li>
              <li aria-hidden="true" className="text-steel-light">/</li>
              <li>
                <span className="text-navy dark:text-white font-semibold">{category.label}</span>
              </li>
            </ol>
          </nav>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text */}
          <AnimatedSection>
            <h1 className="font-barlow font-black text-3xl md:text-[44px] leading-tight tracking-tight text-navy dark:text-white mb-4">
              {category.heroTitle}
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] leading-relaxed mb-4">
              {category.heroSubtitle}
            </p>
            <p className="text-text-body dark:text-dark-text text-[14px] leading-relaxed">
              {category.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="bg-gradient-to-br from-blue to-blue-light text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] btn-glow transition-transform hover:scale-[1.02]"
              >
                Zapytaj o ofertę
              </a>
              <a
                href="#kontakt"
                className="border border-border dark:border-dark-border text-navy dark:text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] hover:border-blue dark:hover:border-blue-light transition-colors"
              >
                Zapytaj o termin
              </a>
            </div>
            {category.proofLink && (
              <a
                href={category.proofLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-5 text-[13px] font-barlow font-semibold text-blue dark:text-blue-light hover:gap-2.5 transition-all"
              >
                {category.proofLink.label}
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {category.clientLinks && category.clientLinks.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {category.clientLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border dark:border-dark-border bg-white dark:bg-dark-card text-[12px] font-barlow font-semibold text-steel dark:text-dark-text-muted hover:border-blue hover:text-blue dark:hover:border-blue-light dark:hover:text-blue-light transition-colors"
                  >
                    <ClientLinkIcon url={link.url} />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </AnimatedSection>

          {/* Image */}
          <AnimatedSection delay={0.15}>
            <Parallax distance={PARALLAX.subtle} direction="up">
              <div className={`relative ${heroAspect} rounded-2xl overflow-hidden bg-border dark:bg-dark-card`}>
                <Image
                  src={category.thumbnail}
                  alt={category.label}
                  fill
                  priority
                  className={`object-cover ${heroObjectPosition}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                />
              </div>
            </Parallax>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
