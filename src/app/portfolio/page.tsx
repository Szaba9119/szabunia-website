import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { portfolioCategories, portfolioItems } from "@/data/portfolio";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedSection from "@/components/AnimatedSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import ErrorBoundary from "@/components/ErrorBoundary";

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg==";

export const metadata: Metadata = {
  title: "Portfolio — realizacje fotograficzne i wideo | Marcin Szabunia Poznań",
  description:
    "Wybrane realizacje: sesje wizerunkowe, fotografia eventowa, sesje korporacyjne i packshoty produktowe dla firm B2B. Poznań, cała Polska i Europa.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio — realizacje fotograficzne i wideo | Marcin Szabunia",
    description:
      "Wybrane realizacje fotograficzne i wideo dla firm B2B. Poznań, cała Polska i Europa.",
    url: "https://szabunia.pl/portfolio",
    images: [
      {
        url: "/images/marcin-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio fotografii biznesowej — Marcin Szabunia, Poznań",
      },
    ],
  },
};

export default function PortfolioPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://szabunia.pl" },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://szabunia.pl/portfolio" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Portfolio — realizacje Marcina Szabuni",
      itemListElement: portfolioCategories.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        url: c.externalUrl ?? `https://szabunia.pl/portfolio/${c.slug}`,
      })),
    },
  ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-[11px] uppercase tracking-widest text-steel dark:text-dark-text-muted mb-3 font-barlow font-semibold text-center">
              Realizacje
            </p>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Portfolio
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
              Projekty dla firm, które stawiają na profesjonalny wizerunek —
              sesje wizerunkowe, reportaże z eventów, sesje korporacyjne i
              fotografia produktowa.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {portfolioItems.map((item, i) => {
              const overlay = (
                <>
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className={`object-cover ${item.imagePosition === "top" ? "object-top" : ""} transition-transform duration-500 group-hover:scale-105`}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL={blurPlaceholder}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-4 py-3 text-[13px] font-barlow font-semibold">
                    {item.label}
                  </div>
                </>
              );
              return (
                <AnimatedSection
                  key={item.slug}
                  delay={i * 0.06}
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
                      {overlay}
                    </a>
                  ) : (
                    <Link href={`/portfolio/${item.slug}`} className="block w-full h-full">
                      {overlay}
                    </Link>
                  )}
                </AnimatedSection>
              );
            })}
          </div>
        </div>
        <div className="mt-12">
          <ErrorBoundary>
            <CTA />
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
      <MobileFAB />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
