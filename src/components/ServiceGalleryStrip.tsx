import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import ServiceGalleryLightbox from "./ServiceGalleryLightbox";
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
  portrety: ["portret-12", "portret-03", "portret-07", "portret-11", "portret-05", "portret-08"].map(
    (n) => `/images/galeria/portrety/${n}.jpg`
  ),
  eventy: ["event-04", "event-05", "event-15", "event-14", "event-09", "event-17"].map(
    (n) => `/images/galeria/eventy/${n}.jpg`
  ),
  produktowe: [
    "produkt-00b-kieliszki", // toast kieliszkami wódki
    "produkt-03", // auto w środku lasu
    "produkt-06", // danie z fasolką na białym talerzu
    "produkt-08", // bransoletka na dłoni
    "produkt-14", // kobieta w żółtej sukience
    "produkt-18", // koszulka na ciemnym tle
    "produkt-20", // patyczek do makijażu
    "produkt-11", // grejfrutowy koktajl / alkohol
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

export default function ServiceGalleryStrip({
  category,
  ctaLabel: ctaLabelProp,
  href: hrefProp,
}: {
  category: GalleryCategoryKey;
  ctaLabel?: string;
  href?: string;
}) {
  const meta = META[category];
  // `obiekty` nie ma własnego folderu w public/images/galeria, bo korzysta z plików
  // kategorii `dron` (patrz CURATED). Link „zobacz więcej" musi prowadzić tam, gdzie
  // te zdjęcia faktycznie są, inaczej trafia na pustą filtrowaną galerię.
  const href =
    hrefProp ??
    (category === "zespolowe"
      ? "/portfolio/idcom-headshoty-zespolu"
      : `/galeria?kat=${category === "obiekty" ? "dron" : category}`);

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

  if (category === "wideo") {
    const vids = galleryVideos.slice(0, 4);
    if (vids.length === 0) return null;
    return (
      <Shell label={meta.label} sub={meta.sub} href={href} ctaLabel={ctaLabel}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {vids.map((v) => (
            <Link
              key={v.youtubeId}
              href={href}
              aria-label={`Wideo: ${v.title}`}
              className="group relative aspect-square rounded-xl overflow-hidden bg-navy"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                alt={v.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white group-hover:bg-blue group-hover:border-blue transition-colors">
                  <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Shell>
    );
  }

  const images = (CURATED[category] ?? listGalleryImages(category)).slice(0, category === "produktowe" ? 8 : 6);
  if (images.length === 0) return null;

  return (
    <Shell label={meta.label} sub={meta.sub} href={href} ctaLabel={ctaLabel}>
      <ServiceGalleryLightbox
        images={images}
        altBase={meta.alt}
        aspectClass={
          category === "portrety" || category === "zespolowe"
            ? "aspect-[3/4]"
            : category === "eventy" || category === "dron" || category === "obiekty"
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
  children,
}: {
  label: string;
  sub: string;
  href: string;
  ctaLabel?: string;
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
            <p className="text-steel dark:text-dark-text-muted text-[14px] mt-1">{sub}</p>
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
