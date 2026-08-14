import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems } from "@/data/portfolio";
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
      // `portfolioItems`, nie `portfolioCategories`: lista niefiltrowana zawierała
      // draft Box17 (`noindex`) i inną kolejność niż widoczna siatka, czyli dawała
      // Googlebotowi ścieżkę odkrycia do strony świadomie ukrytej (PELNY2608-28).
      itemListElement: portfolioItems.map((c, i) => ({
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
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-6 max-w-2xl mx-auto leading-relaxed">
              Wybrane realizacje dla firm: event firmowy, headshoty zespołu,
              packshoty i film z produkcji oraz sesja do przewodnika Michelin.
            </p>
            {/* CTA POD LEADEM, 11.08.2026 (audyt UI, finding A2, decyzja Marcina).
                Powód, zmierzony przy 1280 px: strona miała 2612 px i ANI JEDNEGO
                elementu prowadzącego do kontaktu aż do przycisku „Wyślij zapytanie"
                na y = 1872, czyli na 72% długości. Osiem kafli realizacji, potem
                od razu formularz. Dla porównania `/galeria` i `/uslugi` mają
                gradientowe CTA wysoko, a `/portfolio` jest stroną, na którą
                wchodzi ruch z wizytówki Google.

                Wzorzec skopiowany 1:1 z `/galeria` (`galeria/page.tsx`), bo tam
                układ jest ten sam: kicker, H1, lead, CTA, siatka. Ta sama klasa,
                ta sama etykieta ze słownika, to samo miejsce. Nie tworzy nowego
                wariantu przycisku.

                Odstęp: lead zszedł z `mb-12` na `mb-6`, a `mb-12` przejął wrapper
                CTA, więc dystans lead → siatka rośnie tylko o wysokość przycisku,
                a nie o cały nowy blok. */}
            <div className="flex justify-center mb-12">
              <a
                href="#kontakt"
                data-cta="wycena_hub_portfolio"
                className="inline-block bg-gradient-to-br from-blue to-blue text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[14px] btn-glow hover:scale-[1.02] transition-transform"
              >
                Sprawdź termin i cenę
              </a>
            </div>
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
                    /* ⚠ `priority` na DWÓCH pierwszych kafelkach, 11.08.2026
                       (pomiar Lighthouse 13 na produkcji, mobile). Elementem LCP
                       jest pierwszy kafelek, a bez `priority` `next/image` daje
                       `loading="lazy"` — zmierzony `resourceLoadDelay` 532 ms
                       przy LCP 4,7 s i performance 83.

                       Dwa, nie jeden, bo siatka ma NA TELEFONIE dwie kolumny
                       (`grid-cols-2`), więc oba górne kafelki są nad zgięciem.
                       Na `/blog` z tego samego powodu też są dwa, ale tam siatka
                       jest jednokolumnowa i drugi jest zapasem, nie regułą.
                       ⛔ Nie rozszerzać na kolejne: priorytet dla wszystkiego
                       to brak priorytetu. */
                    priority={i < 2}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-navy/85 backdrop-blur-sm text-white px-4 py-3 text-[13px] font-barlow font-semibold">
                    {item.label}
                  </div>
                </>
              );
              // Wspólne klasy kafelka: kolejność i wygląd mają być identyczne
              // niezależnie od tego, czy wjazd robi `.reveal`, czy `.hero-intro`.
              const tileClass =
                "group relative overflow-hidden rounded-2xl bg-border dark:bg-dark-card aspect-[4/3]";

              const tile = (
                <>
                  {item.externalUrl ? (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                      data-cta={`case_${item.slug}`}
                      aria-label={`${item.label}, otwiera się w nowej karcie`}
                    >
                      {overlay}
                    </a>
                  ) : (
                    // `data-cta` tą samą konwencją co kafle na stronie głównej,
                    // żeby oba huby dały się zsumować w jednym raporcie (PELNY2608-13).
                    <Link href={`/portfolio/${item.slug}`} data-cta={`case_${item.slug}`} className="block w-full h-full">
                      {overlay}
                    </Link>
                  )}
                </>
              );

              /* DWA PIERWSZE KAFELKI POZA `.reveal`, 11.08.2026 — dokładnie ten
                 sam zabieg i z tego samego powodu co na `/blog`.

                 Pomiary Lighthouse 13, mobile, ta strona:
                   stan wyjściowy      LCP 4,7 s, load delay 532 ms,
                                       render delay 60 ms
                   po samym `priority` load delay spadł do 44-51 ms, ale render
                                       delay wyszedł na 638 ms, a LCP na 7,0 s

                 Dopóki obrazek ładował się pół sekundy, `.reveal` chował się
                 w cieniu tego czekania. Po przyspieszeniu ładowania to on jest
                 ogranicznikiem — przy 27 kartach na `/blog` i kilkunastu tutaj
                 hydratacja kosztuje więcej niż samo pobranie obrazka.

                 ⛔ Kafelki pod zgięciem zostają na `AnimatedSection` — wjazd
                 przy przewijaniu jest tam poprawny i ma zostać. */
              if (i < 2) {
                return (
                  <div key={item.slug} className={`hero-intro ${tileClass}`}>
                    {tile}
                  </div>
                );
              }

              return (
                <AnimatedSection key={item.slug} delay={i * 0.06} className={tileClass}>
                  {tile}
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
