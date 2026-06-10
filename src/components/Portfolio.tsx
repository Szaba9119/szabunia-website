"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import { portfolioItems } from "@/data/portfolio";

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg==";

// Na home pokazujemy na razie tylko jedno, dopracowane case study.
// Kolejne kafelki wrócą, gdy podstrony realizacji będą gotowe.
const FEATURED_SLUG = "woohoo-autopay";

export default function Portfolio() {
  const featured =
    portfolioItems.find((item) => item.slug === FEATURED_SLUG) ?? portfolioItems[0];
  if (!featured) return null;

  const tile = (
    <>
      <Parallax distance={PARALLAX.accent} direction="up" className="absolute inset-0">
        <div className="absolute inset-0 scale-[1.15]">
          <Image
            src={featured.image}
            alt={featured.label}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1200px) 100vw, 1152px"
            quality={85}
            placeholder="blur"
            blurDataURL={blurPlaceholder}
          />
        </div>
      </Parallax>
      <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-4 py-3 text-[13px] font-barlow font-semibold flex items-center justify-between gap-3">
        <span>{featured.label}</span>
        <span className="text-white/70 text-xs shrink-0">Zobacz case study →</span>
      </div>
    </>
  );

  return (
    <section id="portfolio" className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Wybrane realizacje
            </h2>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
              Pełne case study: cel, przebieg realizacji i efekt końcowy.
            </p>
          </Parallax>
        </AnimatedSection>

        <AnimatedSection className="group relative overflow-hidden rounded-2xl bg-border dark:bg-dark-card h-[260px] md:h-[420px]">
          {featured.externalUrl ? (
            <a
              href={featured.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
              aria-label={`${featured.label} (otwiera się w nowej karcie)`}
            >
              {tile}
            </a>
          ) : (
            <Link href={`/portfolio/${featured.slug}`} className="block w-full h-full">
              {tile}
            </Link>
          )}
        </AnimatedSection>

        <AnimatedSection
          delay={0.15}
          className="group mt-3 relative overflow-hidden rounded-2xl bg-navy dark:bg-dark-card border border-navy-light dark:border-dark-border hover:scale-[1.005] transition-transform duration-300"
        >
          <a
            href="#kontakt"
            className="flex items-center justify-center gap-3 text-center px-6 py-5"
          >
            <span className="text-white/60 text-2xl group-hover:scale-110 transition-transform duration-300">→</span>
            <span className="font-barlow font-semibold text-white text-[14px]">
              Chcesz zobaczyć więcej?
            </span>
            <span className="text-white/50 text-[11px]">Napisz do mnie</span>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
