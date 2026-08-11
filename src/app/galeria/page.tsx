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
import Warunki from "@/components/Warunki";
import FAQ from "@/components/FAQ";
import BlogPreview from "@/components/BlogPreview";
import PoradnikTeaser from "@/components/PoradnikTeaser";
import MobileFAB from "@/components/MobileFAB";
import { galleryVideos } from "@/data/galeria";
import { listGalleryImagesSized } from "@/lib/galleryImages";
import { galleryAlt } from "@/data/galleryAlts";
import Breadcrumbs, { breadcrumbJsonLd, type Crumb } from "@/components/Breadcrumbs";

// Przejście z aktywnej kategorii galerii do odpowiadającej usługi.
// Dodane 11.08.2026 (decyzja Marcina, audyt /galeria, punkt B1).
//
// Powód: linkowanie było jednokierunkowe. Cztery podstrony usług dawały razem
// SZEŚĆ linków do `/galeria?kat=*`, a galeria nie oddawała ani jednego linku
// do usługi. Kto wchodził z wyszukiwarki prosto na galerię, oglądał 74 kadry
// i nie miał przejścia do oferty poza ogólnym „Zapytaj o ofertę" na górze.
//
// Nazwy biorą się z pola `shortTitle` w `services.tsx`, czyli z tego samego
// źródła co okruszek i `Service.name` w JSON-LD. Jeden słownik, nie drugi.
//
// ⛔ KATEGORIA `wideo` CELOWO NIE MA TU WPISU. Po scaleniu z 10.08 nie istnieje
// osobna usługa wideo: `/uslugi/wideo-marketing` to 308 na `/uslugi/wizerunek-portrety`.
// Zawartość zakładki Wideo to filmy eventowe, przemysłowe i gastronomiczne,
// czyli ani jeden materiał wizerunkowy, więc link na wizerunek obiecywałby
// co innego, niż pokazuje. Zakładka zachowuje swoje własne przejście do dwóch
// case studies w `GalleryView`. Nie dopisywać tu `wideo` bez nowej decyzji.
//
// `dron` i `wnetrza` celowo wskazują TĘ SAMĄ usługę: wszystkie dziewięć kadrów
// dronowych to budynki i osiedla, a pasek dronowy stoi już na tej podstronie
// jako `extraGallery`. Ten sam tekst dla obu jest świadomy (Marcin, 11.08.2026:
// „chcę zachować prosty, spójny wzorzec").
const CATEGORY_SERVICE: Record<string, { label: string; href: string }> = {
  portrety: { label: "Wizerunek firmy", href: "/uslugi/wizerunek-portrety" },
  eventy: { label: "Wydarzenia firmowe", href: "/uslugi/eventy-reportaze" },
  produktowe: { label: "Fotografia produktowa", href: "/uslugi/fotografia-produktowa" },
  wnetrza: { label: "Nieruchomości i przemysł", href: "/uslugi/nieruchomosci-przemysl" },
  dron: { label: "Nieruchomości i przemysł", href: "/uslugi/nieruchomosci-przemysl" },
};

export const metadata: Metadata = {
  title: "Galeria kadrów z realizacji | Szabunia",
  description:
    "Kadry z eventów firmowych, portrety, sesje zespołowe, packshoty i ujęcia z drona. Przegląd po kategoriach. Poznań i cała Polska.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: "Galeria kadrów z realizacji | Szabunia",
    description:
      "Eventy firmowe, portrety, sesje zespołowe, packshoty i ujęcia z drona. Przegląd kadrów po kategoriach.",
    url: "https://szabunia.pl/galeria",
    images: [
      {
        url: "/images/og/strony/galeria.jpg",
        width: 1200,
        height: 630,
        alt: "Galeria kadrów z realizacji, Marcin Szabunia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeria kadrów z realizacji | Szabunia",
    description:
      "Eventy firmowe, portrety, sesje zespołowe, packshoty i ujęcia z drona. Przegląd kadrów po kategoriach.",
    images: ["/images/og/strony/galeria.jpg"],
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
      // ZDJ2608-04: pięć wariantów na czternaście kadrów zniknęło. Opisy per plik
      // są w `src/data/galleryAlts.ts` i dokładają się niżej, w kolejności plików.
    },
    {
      key: "eventy",
      label: "Eventy",
      folder: "eventy",
      alt: "Fotografia eventowa, Marcin Szabunia, Poznań",
      // ZDJ2608-04: pięć wariantów na piętnaście kadrów zniknęło. To one nazywały
      // osła „fotografią konferencyjną", a DJ-a „zdjęciem z gali". Opisy per plik
      // są w `src/data/galleryAlts.ts`.
    },
    {
      key: "produktowe",
      label: "Produktowe",
      folder: "produktowe",
      // Jedyna kategoria z tak rozstrzelonymi proporcjami (0,56 do 1,50), więc
      // jako jedyna dostaje równe kafelki zamiast siatki murowanej.
      uniformTiles: true,
      alt: "Fotografia produktowa, packshot, Marcin Szabunia",
      altVariants: [
        "Packshot produktu na białym tle, fotografia e-commerce",
        "Zdjęcie produktowe do sklepu internetowego, Marcin Szabunia",
        "Fotografia produktowa kreatywna, aranżacja reklamowa",
        "Zdjęcie katalogowe produktu, studio, Poznań",
      ],
    },
    {
      key: "wnetrza",
      // ZDJ2608-06 (04.08.2026): etykieta poszerzona z „Wnętrza i hale". Cztery z dwunastu
      // kadrów w tej zakładce to zewnętrza (czwarty rząd, obiekty z powietrza), a nazwa
      // usługi brzmi „Wnętrza, obiekty i architektura". Klucz `kat=wnetrza` BEZ ZMIAN: to adres.
      label: "Wnętrza, hale i obiekty",
      folder: "wnetrza",
      alt: "Fotografia wnętrz i hal, Marcin Szabunia, Poznań",
      // ZDJ2608-04 / ZDJ2608-12: dwanaście opisów pod dwanaście kadrów przeniesione
      // 04.08.2026 do `src/data/galleryAlts.ts`, bez zmiany treści. Powód przenosin:
      // pasek „Przykłady z galerii" na podstronie obiektowej pokazuje te same pliki
      // i musi mieć te same opisy, a nie drugi zestaw. Kolejność ustawiona przez
      // Marcina 04.08.2026 (rząd 1 hale, rząd 2 obiekt z zewnątrz i strefy wspólne,
      // rząd 3 lokale gastronomiczne, rząd 4 obiekty z powietrza) zostaje bez zmian.
    },
    {
      key: "dron",
      label: "Dron",
      folder: "dron",
      alt: "Zdjęcia z drona, Poznań, Marcin Szabunia",
      // ZDJ2608-04 / ZDJ2608-12: dziewięć opisów pod dziewięć kadrów przeniesione
      // 04.08.2026 do `src/data/galleryAlts.ts`, bez zmiany treści. Kategoria
      // `obiekty` w pasku usług wskazuje te same pliki, więc korzysta z tych samych
      // opisów. Wieżowiec zszedł na koniec 04.08.2026 (prośba Marcina), a opisy idą
      // teraz za plikiem, nie za pozycją, więc taka zmiana ich nie rozjeżdża.
    },
  ];

  // ZDJ2608-04 (04.08.2026): opis alternatywny bierze się z pliku, nie z pozycji.
  // Kategoria, która nie ma własnej listy w `defs`, dostaje po jednym opisie na kadr
  // z `GALLERY_ALTS` (klucz to nazwa pliku), w kolejności plików. Kategoria z własną,
  // krótszą listą (dziś tylko `produktowe`, 4 warianty na 24 kadry) zostaje na rotacji
  // do czasu własnej rundy: jej kadrów ta tura nie oglądała.
  const categories: GalleryCategory[] = defs
    .map((d) => {
      const images = listGalleryImagesSized(d.folder);
      return {
        key: d.key,
        label: d.label,
        images,
        alt: d.alt,
        altVariants: d.altVariants ?? images.map((img) => galleryAlt(img.src, d.alt)),
        uniformTiles: d.uniformTiles,
        service: CATEGORY_SERVICE[d.key],
      };
    })
    .filter((c) => c.images.length > 0);

  const validKeys = [...categories.map((c) => c.key), "wideo"];
  const initialActive = kat && validKeys.includes(kat) ? kat : categories[0]?.key ?? "wideo";

  const crumbs: Crumb[] = [{ name: "Strona główna", href: "/" }, { name: "Galeria" }];

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
    breadcrumbJsonLd(crumbs),
  ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <AnimatedSection>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Galeria kadrów z realizacji
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-6 max-w-2xl mx-auto">
              Wybrane kadry z realizacji: portrety biznesowe, eventy, fotografia produktowa, wideo oraz zdjęcia z drona.
            </p>
            <div className="flex justify-center mb-10">
              <a
                href="#kontakt"
                data-cta="wycena_galeria"
                className="inline-block bg-gradient-to-br from-blue to-blue text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[14px] btn-glow hover:scale-[1.02] transition-transform"
              >
                Zapytaj o ofertę
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

        {/* Warunki (wydzielone z Process.tsx, 2026-07-06) — bez tego /galeria
            straciłaby je razem z wydzieleniem. Sekcja Wycena skasowana
            całkowicie (brief-22) — kotwice „od X zł" zostają w kartach usług
            na home, /galeria ich nie duplikowała. */}
        <ErrorBoundary>
          <Warunki />
        </ErrorBoundary>

        <ErrorBoundary>
          <BlogPreview />
        </ErrorBoundary>

        <ErrorBoundary>
          <PoradnikTeaser />
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
