import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ErrorBoundary from "@/components/ErrorBoundary";
import AnimatedSection from "@/components/AnimatedSection";
import GalleryView, { type GalleryCategory } from "@/components/GalleryView";
import LogoBar from "@/components/LogoBar";
import Testimonials from "@/components/Testimonials";
import Publications from "@/components/Publications";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import BlogPreview from "@/components/BlogPreview";
import PoradnikTeaser from "@/components/PoradnikTeaser";
import Warunki from "@/components/Warunki";
import MobileFAB from "@/components/MobileFAB";
import { galleryVideos } from "@/data/galeria";
import { listGalleryImagesSized } from "@/lib/galleryImages";

export const metadata: Metadata = {
  title: "Galeria zdjęć i wideo | Marcin Szabunia, fotograf biznesowy Poznań",
  description:
    "Wybrane kadry z realizacji: portrety biznesowe, fotografia eventowa, produktowa, wideo oraz zdjęcia z drona. Marcin Szabunia, Poznań i cała Polska.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: "Galeria zdjęć i wideo | Marcin Szabunia",
    description:
      "Portrety biznesowe, fotografia eventowa, produktowa, wideo i zdjęcia z drona. Wybrane kadry z realizacji.",
    url: "https://szabunia.pl/galeria",
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

export default async function GaleriaPage({
  searchParams,
}: {
  searchParams: Promise<{ kat?: string }>;
}) {
  const { kat } = await searchParams;

  // Rotujące, opisowe alt teksty (SEO obrazów): kolejne zdjęcia w kategorii
  // dostają kolejne warianty z listy zamiast jednego szablonu z numerem.
  const defs = [
    {
      key: "portrety",
      label: "Portrety",
      folder: "portrety",
      alt: "Portret biznesowy, Marcin Szabunia, Poznań",
      altVariants: [
        "Portret biznesowy w studio, fotograf Marcin Szabunia, Poznań",
        "Headshot biznesowy do LinkedIn, sesja wizerunkowa, Poznań",
        "Zdjęcie wizerunkowe dla firmy, fotografia korporacyjna, Poznań",
        "Profesjonalny portret pracownika, sesja biznesowa, Marcin Szabunia",
        "Sesja personal branding, portret eksperta, fotograf Poznań",
      ],
    },
    {
      key: "eventy",
      label: "Eventy",
      folder: "eventy",
      alt: "Fotografia eventowa, Marcin Szabunia, Poznań",
      altVariants: [
        "Reportaż z eventu firmowego, fotograf eventowy Poznań",
        "Fotografia konferencyjna, relacja z wydarzenia biznesowego",
        "Zdjęcie z gali firmowej, fotograf Marcin Szabunia",
        "Fotoreportaż z eventu korporacyjnego, Poznań",
        "Relacja zdjęciowa z targów i wydarzeń firmowych",
      ],
    },
    {
      key: "produktowe",
      label: "Produktowe",
      folder: "produktowe",
      alt: "Fotografia produktowa, packshot, Marcin Szabunia",
      altVariants: [
        "Packshot produktu na białym tle, fotografia e-commerce",
        "Zdjęcie produktowe do sklepu internetowego, Marcin Szabunia",
        "Fotografia produktowa kreatywna, aranżacja reklamowa",
        "Zdjęcie katalogowe produktu, studio, Poznań",
      ],
    },
    {
      key: "dron",
      label: "Dron",
      folder: "dron",
      alt: "Zdjęcia z drona, Poznań, Marcin Szabunia",
      altVariants: [
        "Zdjęcia z drona, biurowce w centrum Poznania z lotu ptaka",
        "Wideo i zdjęcia z drona, wieżowiec biurowy w Poznaniu",
        "Fotografia z drona dla firm, nowoczesny budynek komercyjny, Poznań",
        "Zdjęcia z drona nieruchomości, osiedle mieszkaniowe, Poznań",
        "Panorama Poznania z drona o zachodzie słońca",
        "Zdjęcia z drona inwestycji i terenów, Poznań i okolice",
      ],
    },
  ];

  const categories: GalleryCategory[] = defs
    .map((d) => ({
      key: d.key,
      label: d.label,
      images: listGalleryImagesSized(d.folder),
      alt: d.alt,
      altVariants: d.altVariants,
    }))
    .filter((c) => c.images.length > 0);

  const validKeys = [...categories.map((c) => c.key), "wideo"];
  const initialActive = kat && validKeys.includes(kat) ? kat : categories[0]?.key ?? "wideo";

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "Galeria — Marcin Szabunia",
      description:
        "Portrety biznesowe, fotografia eventowa, produktowa, wideo oraz zdjęcia z drona. Wybrane kadry z realizacji.",
      url: "https://szabunia.pl/galeria",
      author: { "@type": "Person", name: "Marcin Szabunia", url: "https://szabunia.pl" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://szabunia.pl" },
        { "@type": "ListItem", position: 2, name: "Galeria" },
      ],
    },
  ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Galeria
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-6 max-w-2xl mx-auto">
              Wybrane kadry z realizacji: portrety biznesowe, eventy, fotografia produktowa, wideo oraz zdjęcia z drona.
            </p>
            <div className="flex justify-center mb-10">
              <a
                href="#kontakt"
                data-cta="wycena_galeria"
                className="inline-block bg-gradient-to-br from-blue to-blue-light text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[14px] btn-glow hover:scale-[1.02] transition-transform"
              >
                Zapytaj o wycenę
              </a>
            </div>
          </AnimatedSection>

          <ErrorBoundary>
            <GalleryView categories={categories} videos={galleryVideos} initialActive={initialActive} />
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <LogoBar />
        </ErrorBoundary>

        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>

        <ErrorBoundary>
          <Publications />
        </ErrorBoundary>

        <ErrorBoundary>
          <Process />
        </ErrorBoundary>

        <ErrorBoundary>
          <Pricing />
        </ErrorBoundary>

        <ErrorBoundary>
          <BlogPreview />
        </ErrorBoundary>

        <ErrorBoundary>
          <PoradnikTeaser />
        </ErrorBoundary>

        <ErrorBoundary>
          <Warunki />
        </ErrorBoundary>

        <ErrorBoundary>
          <FAQ />
        </ErrorBoundary>

        <div className="mt-6">
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
