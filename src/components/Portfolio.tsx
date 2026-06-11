"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import { portfolioItems } from "@/data/portfolio";
import type { PortfolioItem } from "@/data/portfolio";

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg==";

// Na home pokazujemy dopracowane case studies (podstrony realizacji gotowe).
const FEATURED_SLUGS = [
  "woohoo-autopay",
  "artech-fotografia-produktowa",
  "idcom-headshoty-zespolu",
  "yes-butcher-przewodnik-michelin",
];

export default function Portfolio() {
  const featured = FEATURED_SLUGS.map((slug) =>
    portfolioItems.find((item) => item.slug === slug)
  ).filter((item): item is PortfolioItem => Boolean(item));
  if (featured.length === 0) return null;

  const tile = (item: PortfolioItem) => (
    <>
      <Parallax distance={PARALLAX.accent} direction="up" className="absolute inset-0">
        <div className="absolute inset-0 scale-[1.15]">
          <Image
            src={item.image}
            alt={item.label}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 576px"
            quality={85}
            placeholder="blur"
            blurDataURL={blurPlaceholder}
          />
        </div>
      </Parallax>
      <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-4 py-3 text-[13px] font-barlow font-semibold flex items-center justify-between gap-3">
        <span>{item.label}</span>
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

        <div
          className={`grid grid-cols-1 gap-3 ${
            featured.length > 1 ? "md:grid-cols-2" : ""
          }`}
        >
          {featured.map((item, i) => (
            <AnimatedSection
              key={item.slug}
              delay={i * 0.1}
              className="group relative overflow-hidden rounded-2xl bg-border dark:bg-dark-card h-[260px] md:h-[340px]"
            >
              {item.externalUrl ? (
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                  aria-label={`${item.label} (otwiera się w nowej karcie)`}
                >
                  {tile(item)}
                </a>
              ) : (
                <Link href={`/portfolio/${item.slug}`} className="block w-full h-full">
                  {tile(item)}
                </Link>
              )}
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection
          delay={0.15}
          className="group mt-3 relative overflow-hidden rounded-2xl bg-white dark:bg-dark-card border border-border dark:border-dark-border hover:scale-[1.005] transition-transform duration-300"
        >
          <a
            href="#kontakt"
            className="flex items-center justify-center gap-3 text-center px-6 py-5"
          >
            <span className="text-blue dark:text-blue-light text-2xl group-hover:scale-110 transition-transform duration-300">→</span>
            <span className="font-barlow font-semibold text-navy dark:text-white text-[14px]">
              Chcesz zobaczyć więcej?
            </span>
            <span className="text-steel dark:text-dark-text-muted text-[11px]">Napisz do mnie</span>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
