import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import PricingCalculator from "@/components/PricingCalculator";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import ErrorBoundary from "@/components/ErrorBoundary";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Kalkulator wyceny sesji foto i wideo | Marcin Szabunia Poznań",
  description:
    "Oblicz koszt swojej sesji fotograficznej lub wideo w Poznaniu. Portrety biznesowe, eventy, wideo marketing. Szacunkowa wycena w 1 minutę, ostateczna cena po krótkim briefie.",
  alternates: { canonical: "/kalkulator" },
  openGraph: {
    title: "Kalkulator wyceny sesji foto i wideo | Marcin Szabunia Poznań",
    description:
      "Oblicz koszt swojej sesji fotograficznej lub wideo w Poznaniu. Portrety biznesowe, eventy, wideo marketing. Szacunkowa wycena w 1 minutę, ostateczna cena po krótkim briefie.",
    url: "https://szabunia.pl/kalkulator",
    images: [
      {
        url: "/images/marcin-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Marcin Szabunia — Fotograf biznesowy Poznań",
      },
    ],
  },
};

export default function KalkulatorPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://szabunia.pl" },
        { "@type": "ListItem", position: 2, name: "Kalkulator wyceny" },
      ],
    },
  ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Kalkulator wyceny
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-lg mx-auto">
              Wybierz usługę, skonfiguruj opcje i poznaj szacunkową cenę. Ostateczną wycenę przygotuję po krótkim briefie.
            </p>
          </AnimatedSection>

          <ErrorBoundary>
            <PricingCalculator />
          </ErrorBoundary>
        </div>

        <div className="mt-16">
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
