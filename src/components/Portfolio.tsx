"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import { portfolioItems } from "@/data/portfolio";

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg==";

export default function Portfolio() {
  if (portfolioItems.length < 4) return null;

  return (
    <section id="portfolio" className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Wybrane realizacje
            </h2>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
              Projekty dla firm, które stawiają na profesjonalny wizerunek.
            </p>
          </Parallax>
        </AnimatedSection>

        {/* Desktop: 3 kolumny, 3 wiersze */}
        <div className="hidden md:grid md:grid-cols-3 gap-3" style={{ gridTemplateRows: "360px 260px 180px" }}>
          {/* Górny lewy — zdj 0 poziome (2 kolumny) */}
          <AnimatedSection className="col-span-2 group relative overflow-hidden rounded-2xl bg-border dark:bg-dark-card">
            {portfolioItems[0].externalUrl ? (
              <a
                href={portfolioItems[0].externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
                aria-label={`${portfolioItems[0].label} — otwiera się w nowej karcie`}
              >
                <Parallax distance={PARALLAX.accent} direction="up" className="absolute inset-0">
                  <div className="absolute inset-0 scale-[1.15]">
                    <Image
                      src={portfolioItems[0].image}
                      alt={portfolioItems[0].label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1200px) 66vw, 800px"
                      quality={85}
                      placeholder="blur"
                      blurDataURL={blurPlaceholder}
                    />
                  </div>
                </Parallax>
                <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-4 py-3 text-[13px] font-barlow font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  {portfolioItems[0].label}
                </div>
              </a>
            ) : (
              <Link href={`/portfolio/${portfolioItems[0].slug}`} className="block w-full h-full">
                <Parallax distance={PARALLAX.accent} direction="up" className="absolute inset-0">
                  <div className="absolute inset-0 scale-[1.15]">
                    <Image
                      src={portfolioItems[0].image}
                      alt={portfolioItems[0].label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1200px) 66vw, 800px"
                      quality={85}
                      placeholder="blur"
                      blurDataURL={blurPlaceholder}
                    />
                  </div>
                </Parallax>
                <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-4 py-3 text-[13px] font-barlow font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  {portfolioItems[0].label}
                </div>
              </Link>
            )}
          </AnimatedSection>

          {/* Górny prawy — zdj 3 portret */}
          <AnimatedSection
            delay={0.1}
            className="group relative overflow-hidden rounded-2xl bg-border dark:bg-dark-card"
          >
            {portfolioItems[3].externalUrl ? (
              <a
                href={portfolioItems[3].externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
                aria-label={`${portfolioItems[3].label} — otwiera się w nowej karcie`}
              >
                <Image
                  src={portfolioItems[3].image}
                  alt={portfolioItems[3].label}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1200px) 33vw, 400px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-3 py-2.5 text-xs font-barlow font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  {portfolioItems[3].label}
                </div>
              </a>
            ) : (
              <Link href={`/portfolio/${portfolioItems[3].slug}`} className="block w-full h-full">
                <Image
                  src={portfolioItems[3].image}
                  alt={portfolioItems[3].label}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1200px) 33vw, 400px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-3 py-2.5 text-xs font-barlow font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  {portfolioItems[3].label}
                </div>
              </Link>
            )}
          </AnimatedSection>

          {/* Dolny lewy — zdj 1 */}
          <AnimatedSection
            delay={0.2}
            className="group relative overflow-hidden rounded-2xl bg-border dark:bg-dark-card hover:scale-[1.02] transition-transform duration-300"
          >
            {portfolioItems[1].externalUrl ? (
              <a
                href={portfolioItems[1].externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
                aria-label={`${portfolioItems[1].label} — otwiera się w nowej karcie`}
              >
                <Image
                  src={portfolioItems[1].image}
                  alt={portfolioItems[1].label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1200px) 33vw, 400px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-3 py-2.5 text-xs font-barlow font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  {portfolioItems[1].label}
                </div>
              </a>
            ) : (
              <Link href={`/portfolio/${portfolioItems[1].slug}`} className="block w-full h-full">
                <Image
                  src={portfolioItems[1].image}
                  alt={portfolioItems[1].label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1200px) 33vw, 400px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-3 py-2.5 text-xs font-barlow font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  {portfolioItems[1].label}
                </div>
              </Link>
            )}
          </AnimatedSection>

          {/* Dolny środek — zdj 2 */}
          <AnimatedSection
            delay={0.3}
            className="group relative overflow-hidden rounded-2xl bg-border dark:bg-dark-card hover:scale-[1.02] transition-transform duration-300"
          >
            {portfolioItems[2].externalUrl ? (
              <a
                href={portfolioItems[2].externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
                aria-label={`${portfolioItems[2].label} — otwiera się w nowej karcie`}
              >
                <Image
                  src={portfolioItems[2].image}
                  alt={portfolioItems[2].label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1200px) 33vw, 400px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-3 py-2.5 text-xs font-barlow font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  {portfolioItems[2].label}
                </div>
              </a>
            ) : (
              <Link href={`/portfolio/${portfolioItems[2].slug}`} className="block w-full h-full">
                <Image
                  src={portfolioItems[2].image}
                  alt={portfolioItems[2].label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1200px) 33vw, 400px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-3 py-2.5 text-xs font-barlow font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  {portfolioItems[2].label}
                </div>
              </Link>
            )}
          </AnimatedSection>

          {/* Dolny prawy — zdj 4 */}
          <AnimatedSection
            delay={0.4}
            className="group relative overflow-hidden rounded-2xl bg-border dark:bg-dark-card hover:scale-[1.02] transition-transform duration-300"
          >
            {portfolioItems[4].externalUrl ? (
              <a
                href={portfolioItems[4].externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
                aria-label={`${portfolioItems[4].label} — otwiera się w nowej karcie`}
              >
                <Image
                  src={portfolioItems[4].image}
                  alt={portfolioItems[4].label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1200px) 33vw, 400px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-3 py-2.5 text-xs font-barlow font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  {portfolioItems[4].label}
                </div>
              </a>
            ) : (
              <Link href={`/portfolio/${portfolioItems[4].slug}`} className="block w-full h-full">
                <Image
                  src={portfolioItems[4].image}
                  alt={portfolioItems[4].label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1200px) 33vw, 400px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-3 py-2.5 text-xs font-barlow font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  {portfolioItems[4].label}
                </div>
              </Link>
            )}
          </AnimatedSection>

          {/* Dolny wiersz — CTA */}
          <AnimatedSection
            delay={0.5}
            className="col-span-3 group relative overflow-hidden rounded-2xl bg-navy dark:bg-dark-card border border-navy-light dark:border-dark-border hover:scale-[1.005] transition-transform duration-300"
          >
            <a
              href="#kontakt"
              className="flex items-center justify-center gap-3 h-full text-center px-6"
            >
              <span className="text-white/60 text-2xl group-hover:scale-110 transition-transform duration-300">→</span>
              <span className="font-barlow font-semibold text-white text-[14px]">
                Chcesz zobaczyć więcej?
              </span>
              <span className="text-white/50 text-[11px]">
                Napisz do mnie
              </span>
            </a>
          </AnimatedSection>
        </div>

        {/* Mobile: 2 kolumny, proste kafelki */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {portfolioItems.map((item, i) => (
            <AnimatedSection
              key={item.label}
              delay={0.1 * i}
              className="group relative overflow-hidden rounded-2xl bg-border dark:bg-dark-card aspect-[4/3]"
            >
              {item.externalUrl ? (
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                  aria-label={`${item.label} — otwiera się w nowej karcie`}
                >
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="50vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL={blurPlaceholder}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-3 py-2.5 text-xs font-barlow font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                    {item.label}
                  </div>
                </a>
              ) : (
                <Link href={`/portfolio/${item.slug}`} className="block w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="50vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL={blurPlaceholder}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-3 py-2.5 text-xs font-barlow font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                    {item.label}
                  </div>
                </Link>
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
