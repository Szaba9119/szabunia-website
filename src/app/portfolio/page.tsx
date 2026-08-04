import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { portfolioCategories, portfolioItems } from "@/data/portfolio";
import { galleryAlt } from "@/data/galleryAlts";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedSection from "@/components/AnimatedSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import ErrorBoundary from "@/components/ErrorBoundary";
import Breadcrumbs, { breadcrumbJsonLd, type Crumb } from "@/components/Breadcrumbs";

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg==";

export const metadata: Metadata = {
  title: "Portfolio realizacji foto i wideo | Szabunia",
  description:
    "Eventy firmowe, sesje zespołowe, packshoty i film z produkcji. Współpracowałem z H&M, Santanderem, Warner Music i John Deere.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio realizacji foto i wideo | Szabunia",
    description:
      "Case studies realizacji foto i wideo dla firm. Poznań, cała Polska i Europa.",
    url: "https://szabunia.pl/portfolio",
    images: [
      {
        url: "/images/og/strony/portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio realizacji, Marcin Szabunia, fotograf biznesowy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio realizacji foto i wideo | Szabunia",
    description:
      "Case studies realizacji foto i wideo dla firm. Poznań, cała Polska i Europa.",
    images: ["/images/og/strony/portfolio.jpg"],
  },
};

export default function PortfolioPage() {
  const crumbs: Crumb[] = [{ name: "Strona główna", href: "/" }, { name: "Portfolio" }];

  const structuredData = [
    breadcrumbJsonLd(crumbs),
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
          <Breadcrumbs items={crumbs} className="mb-6" />
          <AnimatedSection>
            <p className="text-[11px] uppercase tracking-widest text-steel dark:text-dark-text-muted mb-3 font-barlow font-semibold text-center">
              Realizacje
            </p>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Portfolio realizacji foto i wideo
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
              Wybrane realizacje dla firm: event firmowy, headshoty zespołu,
              packshoty i film z produkcji oraz sesja do przewodnika Michelin.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {portfolioItems.map((item, i) => {
              const overlay = (
                <>
                  <Image
                    src={item.image}
                    /* ZDJ2608-11: opis obejrzanego kadru zamiast etykiety kafelka. */
                    alt={galleryAlt(item.image, item.label)}
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
                      aria-label={`${item.label}, otwiera się w nowej karcie`}
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
