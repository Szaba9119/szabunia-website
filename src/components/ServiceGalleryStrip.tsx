import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import ServiceGalleryLightbox from "./ServiceGalleryLightbox";
import ServiceVideoGrid from "./ServiceVideoGrid";
import { listGalleryImages, type GalleryCategoryKey } from "@/lib/galleryImages";
import { galleryVideos } from "@/data/galeria";

const META: Record<GalleryCategoryKey, { label: string; sub: string; alt: string }> = {
  portrety: {
    label: "Przykłady z galerii: portrety",
    sub: "Wybrane portrety biznesowe i headshoty z moich realizacji.",
    alt: "Portret biznesowy, Marcin Szabunia, Poznań",
  },
  eventy: {
    label: "Przykłady z galerii: eventy",
    sub: "Wybrane kadry z konferencji, targów i gal firmowych.",
    alt: "Fotografia eventowa, Marcin Szabunia, Poznań",
  },
  produktowe: {
    label: "Przykłady z galerii: produktowe",
    sub: "Wybrane packshoty i zdjęcia produktów z realizacji e-commerce.",
    alt: "Fotografia produktowa, packshot, Marcin Szabunia",
  },
  wideo: {
    label: "Przykłady z galerii: wideo",
    sub: "Wybrane realizacje wideo i reelsy.",
    alt: "Realizacja wideo, Marcin Szabunia",
  },
  "wideo-produktowe": {
    label: "Przykłady z galerii: wideo produktowe",
    sub: "Pionowe reelsy i krótkie reklamy produktu, kręcone dla marek i lokali.",
    alt: "Wideo produktowe i reels, Marcin Szabunia",
  },
  dron: {
    label: "Przykłady z galerii: zdjęcia z drona",
    sub: "Wybrane kadry z powietrza: biurowce, osiedla i inwestycje w Poznaniu.",
    alt: "Zdjęcia z drona, Poznań, Marcin Szabunia",
  },
  obiekty: {
    label: "Przykłady z galerii: obiekty i architektura",
    sub: "Budynki, osiedla i inwestycje w Poznaniu, fotografowane z powietrza.",
    alt: "Fotografia obiektu i architektury, Marcin Szabunia, Poznań",
  },
  wnetrza: {
    label: "Przykłady z galerii: wnętrza i hale",
    sub: "Hale, lokale użytkowe i wnętrza obiektów, fotografowane ze światłem zastanym.",
    alt: "Fotografia wnętrza obiektu, hala i lokal użytkowy, Marcin Szabunia, Poznań",
  },
  zespolowe: {
    label: "Przykłady z sesji zespołowej",
    sub: "Ten sam standard światła i retuszu, trzy tła: białe, czarne z niebieskim światłem i kremowe. Realizacja dla IDcom Group.",
    alt: "Headshot z sesji zespołowej dla IDcom Group, Marcin Szabunia",
  },
};

// Wyselekcjonowane najlepsze 6 kadrów per kategoria (zamiast pierwszych z
// brzegu). Dobrane pod B2B: różnorodność i jakość. Reszta kategorii → fallback.
const CURATED: Partial<Record<GalleryCategoryKey, string[]>> = {
  // portret-07 wypadł 04.08.2026: to ta sama osoba w tej samej marynarce co
  // `_F2A9376-Edit-2` z sesji IDcom, więc na podstronie sesji zespołowych ta sama
  // twarz wychodziła dwa razy, raz w każdym pasku (zgłoszone przez Marcina).
  portrety: ["portret-12", "portret-03", "portret-10", "portret-11", "portret-05", "portret-08"].map(
    (n) => `/images/galeria/portrety/${n}.jpg`
  ),
  eventy: ["event-04", "event-05", "event-15", "event-14", "event-09", "event-17"].map(
    (n) => `/images/galeria/eventy/${n}.jpg`
  ),
  produktowe: [
    "produkt-01", // toast kieliszkami wódki
    "produkt-23", // auto w środku lasu
    "produkt-05", // danie z fasolką na białym talerzu
    "produkt-19", // bransoletka na dłoni
    "produkt-07", // kobieta w żółtej sukience
    "produkt-14", // koszulka na ciemnym tle
    "produkt-16", // patyczek do makijażu
    "produkt-02", // grejfrutowy koktajl / alkohol
  ].map((n) => `/images/galeria/produktowe/${n}.jpg`),
  // 6 różnych obiektów (bez powtórki tego samego budynku, np. Bałtyk z dwóch stron).
  dron: [
    "dron-01-centrum-poznania-biurowce",
    "dron-03-nowoczesny-budynek-poznan",
    "dron-09-nowoczesne-osiedle-poznan",
    "dron-06-apartamenty-nad-rzeka-poznan",
    "dron-07-osiedle-mieszkaniowe-poznan",
    "dron-05-panorama-poznania-zachod-slonca",
  ].map((n) => `/images/galeria/dron/${n}.jpg`),
  // Te same pliki co w galerii dronowej: osiem z dziewięciu kadrów w folderze `dron`
  // to budynki i inwestycje, nie tereny (sprawdzone 2026-07-31). Wskazujemy je stąd
  // zamiast kopiować pliki: jeden plik na dysku, dwa konteksty użycia. Panorama
  // (`dron-05`) świadomie NIE wchodzi tutaj, bo to jedyny kadr, który jest terenem,
  // i zostaje wyróżnikiem galerii dronowej.
  obiekty: [
    "dron-02-wiezowiec-biurowy-poznan",
    "dron-04-biurowiec-poznan",
    "dron-08-inwestycja-tereny-zielone-poznan",
    "dron-01-centrum-poznania-biurowce",
    "dron-06-apartamenty-nad-rzeka-poznan",
    "dron-09-nowoczesne-osiedle-poznan",
  ].map((n) => `/images/galeria/dron/${n}.jpg`),
  // Sesja dla IDcom: po kolei trzy tła (białe, czarne z niebieskim, kremowe), jedna osoba na kadr.
  zespolowe: [
    "/images/portfolio/idcom/_F2A9424-Edit-2.jpg", // 1. białe tło
    "/images/portfolio/idcom/_F0I9883-Edit-2.jpg", // 2. kremowe tło
    "/images/portfolio/idcom/_F2A9229-Edit-2.jpg", // 3. czarne tło, niebieskie światło
    "/images/portfolio/idcom/_F2A9433-Edit-2.jpg", // 4. białe tło
    "/images/portfolio/idcom/_F2A9376-Edit-2.jpg", // 5. kremowe tło
    "/images/portfolio/idcom/_F2A9264-Edit-2.jpg", // 6. czarne tło, niebieskie światło
  ],
};

// Kategorie oparte na filmach, nie na plikach z dysku.
const VIDEO_CATEGORIES: GalleryCategoryKey[] = ["wideo", "wideo-produktowe"];

// Kolejność filmów w pasku produktowym ustawiona przez Marcina 04.08.2026:
// najpierw pizzeria, potem śniadaniownia, na końcu reklama kamerki.
// Bez tej listy pasek brał pierwsze cztery pozycje z galleryVideos, czyli
// film z eventu i film z hali produkcyjnej.
const CURATED_VIDEOS: Partial<Record<GalleryCategoryKey, string[]>> = {
  // Podstrona „Wideo dla firm”. Wcześniej pasek brał pierwsze cztery pozycje
  // z galleryVideos, przez co na stronie o filmach korporacyjnych stała
  // zapowiedź imprezy w Klubie 58. Zestaw ułożony pod to, co ta podstrona
  // sprzedaje: event firmowy, film o zakładzie, reklama produktu, krótka forma.
  wideo: [
    "m42ywMWjthw", // Film eventowy dla Woohoo
    "hLO5iInREaI", // Film z produkcji dla Artech Group
    "CmHUCptLu90", // Reklama kamerki samochodowej 70mai
    "xByfmDzNPMI", // Reels dla śniadaniowni Sunday
  ],
  "wideo-produktowe": [
    "fRoffxZ1tVM", // Reels dla Pizzerii Sicilia Marco Giuliano
    "xByfmDzNPMI", // Reels dla śniadaniowni Sunday
    "CmHUCptLu90", // Reklama kamerki samochodowej 70mai
  ],
};

// Kategorie bez własnej zakładki na /galeria muszą prowadzić tam, gdzie
// te materiały faktycznie są, inaczej przycisk trafia na pustą galerię.
const GALLERY_TAB: Partial<Record<GalleryCategoryKey, string>> = {
  obiekty: "dron",
  "wideo-produktowe": "wideo",
};

export default function ServiceGalleryStrip({
  category,
  ctaLabel: ctaLabelProp,
  href: hrefProp,
  sub: subProp,
}: {
  category: GalleryCategoryKey;
  ctaLabel?: string;
  href?: string;
  /** Nadpisuje domyślny podtytuł paska. Używane, gdy pasek stoi na obcej
      podstronie i musi tłumaczyć, po co tam jest (np. sesja zespołowa
      na podstronie eventowej). */
  sub?: string;
}) {
  const meta = META[category];
  // `obiekty` nie ma własnego folderu w public/images/galeria, bo korzysta z plików
  // kategorii `dron` (patrz CURATED). Link „zobacz więcej" musi prowadzić tam, gdzie
  // te zdjęcia faktycznie są, inaczej trafia na pustą filtrowaną galerię.
  const href =
    hrefProp ??
    (category === "zespolowe"
      ? "/portfolio/idcom-headshoty-zespolu"
      : `/galeria?kat=${GALLERY_TAB[category] ?? category}`);

  // Kategoria `zespolowe` prowadzi do case study, nie do filtrowanej galerii,
  // więc przycisk nie może obiecywać galerii. `obiekty` prowadzi do zakładki
  // „Zdjęcia z drona" (patrz `href` wyżej), więc też nie może mówić „cała galeria" —
  // klient kliknąłby po wnętrza, a trafiłby na ujęcia lotnicze.
  const ctaLabel =
    ctaLabelProp ??
    (category === "zespolowe"
      ? "Zobacz całą realizację"
      : category === "obiekty"
      ? "Zobacz obiekty z powietrza"
      : "Zobacz całą galerię");

  if (VIDEO_CATEGORIES.includes(category)) {
    const ids = CURATED_VIDEOS[category];
    const vids = ids
      ? ids.map((id) => galleryVideos.find((v) => v.youtubeId === id)).filter((v) => !!v)
      : galleryVideos.slice(0, 4);
    if (vids.length === 0) return null;
    return (
      <Shell label={meta.label} sub={subProp ?? meta.sub} href={href} ctaLabel={ctaLabel} prominentSub={!!subProp}>
        <ServiceVideoGrid
          videos={vids.map((v) => ({ youtubeId: v.youtubeId, title: v.title, vertical: v.vertical }))}
          gridClass={
            vids.length === 3
              ? "grid grid-cols-1 sm:grid-cols-3 gap-2.5"
              : "grid grid-cols-2 sm:grid-cols-4 gap-2.5"
          }
        />
      </Shell>
    );
  }

  const images = (CURATED[category] ?? listGalleryImages(category)).slice(0, category === "produktowe" ? 8 : 6);
  if (images.length === 0) return null;

  return (
    <Shell label={meta.label} sub={subProp ?? meta.sub} href={href} ctaLabel={ctaLabel} prominentSub={!!subProp}>
      <ServiceGalleryLightbox
        images={images}
        altBase={meta.alt}
        aspectClass={
          category === "portrety" || category === "zespolowe"
            ? "aspect-[3/4]"
            : category === "eventy" || category === "dron" || category === "obiekty" || category === "wnetrza"
            ? "aspect-[4/3]"
            : "aspect-square"
        }
        thumbPosition={category === "portrety" || category === "zespolowe" ? "center 20%" : "center"}
        gridClass={
          category === "produktowe"
            ? "grid grid-cols-2 sm:grid-cols-4 gap-2.5"
            : "grid grid-cols-3 sm:grid-cols-6 gap-2.5"
        }
      />
    </Shell>
  );
}

function Shell({
  label,
  sub,
  href,
  ctaLabel = "Zobacz całą galerię",
  prominentSub = false,
  children,
}: {
  label: string;
  sub: string;
  href: string;
  ctaLabel?: string;
  /** Podtytuł pochodzi z podstrony, nie z META — renderuj go jak zdanie, nie jak podpis. */
  prominentSub?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="mb-6">
            <h2 className="font-barlow font-extrabold text-2xl md:text-3xl tracking-tight text-navy dark:text-white">
              {label}
            </h2>
            {/* Podtytuł nadpisany z podstrony niesie argument sprzedażowy, a nie opis
                kategorii, więc dostaje wagę zdania, nie szarej linijki pod nagłówkiem
                (Marcin 04.08.2026: „chciałbym, żeby to zdanie bardziej wybrzmiało"). */}
            {prominentSub ? (
              // Ten sam rozmiar i kolor co podpis pod „Przykładowa realizacja wideo"
              // (15 px, steel), żeby na jednej podstronie nie było dwóch różnych
              // formatowań tego samego rodzaju zdania. Wyróżnia go tylko oddech:
              // szersza interlinia i węższa kolumna (Marcin, 04.08.2026).
              <p className="text-steel dark:text-dark-text-muted text-[15px] leading-relaxed mt-2 max-w-2xl">
                {sub}
              </p>
            ) : (
              <p className="text-steel dark:text-dark-text-muted text-[14px] mt-1">{sub}</p>
            )}
          </div>
        </AnimatedSection>
        <AnimatedSection>{children}</AnimatedSection>
        {/* Przycisk pod przykładami, a nie w nagłówku (decyzja Marcina, 03.08.2026):
            po obejrzeniu kadrów, a nie przed. Wariant obrysowany, ten sam co
            „Zapytaj o ofertę" w PortfolioVideoShowcase, żeby nie konkurował
            z głównym CTA kontaktowym na tej samej podstronie. */}
        <AnimatedSection>
          <div className="mt-8 flex justify-center">
            <Link
              href={href}
              className="inline-flex items-center gap-2 border border-border dark:border-dark-border text-navy dark:text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] hover:border-blue hover:text-blue dark:hover:border-blue-light dark:hover:text-blue-light transition-colors"
            >
              {ctaLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
