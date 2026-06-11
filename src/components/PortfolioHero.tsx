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

export default function PortfolioHero({ category }: Props) {
  const hasPricing = Boolean(category.tiers?.length || category.tables?.length);
  const heroAspect =
    (category.heroAspect ?? category.galleryAspect) === "portrait"
      ? "aspect-[3/4] max-w-md mx-auto md:mx-0"
      : "aspect-[4/3]";
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
                href={hasPricing ? "#cennik" : "/#cennik"}
                className="bg-gradient-to-br from-blue to-blue-light text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] btn-glow transition-transform hover:scale-[1.02]"
              >
                Zobacz cennik
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
                  className="object-cover"
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
