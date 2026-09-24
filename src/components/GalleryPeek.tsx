import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { galleryAlt } from "@/data/galleryAlts";

// WEJŚCIE DO GALERII NAD PORTFOLIO (22.09.2026, decyzja Marcina: „galerię daj wyżej niż
// portfolio i popraw kadrowanie zdjęć").
//
// ⚠ UKŁAD ZMIENIONY TEGO SAMEGO WIECZORU (Marcin, zrzut z telefonu: „te sekcje można
// ładniej, bo jest tak jak ta pierwsza na stronie"). Pierwsza wersja to była siatka 2x2
// z podpisem na gradiencie u dołu kafla, czyli ten sam wzór co kolaż w hero 1 500 px
// wyżej. Dwa identyczne bloki czytały się jak dwa menu usług.
//
// Teraz blok ma czytać się jak GALERIA, nie jak nawigacja:
// - telefon: pozioma taśma dużych kadrów 4:5 (72% szerokości ekranu, kolejny wystaje
//   zza krawędzi, więc widać, że jedzie), przewijanie z przyciąganiem `snap`;
// - od `md`: mozaika, jeden duży kadr 2x2, pionowy portret na dwa rzędy, dwa mniejsze;
// - kategoria to mała plakietka w lewym górnym rogu, bez gradientu (w hero podpis
//   stoi na dole na ciemnym przejściu);
// - pod zdjęciami rząd pigułek z kategoriami w tym samym stylu co zakładki `/galeria`,
//   więc blok zapowiada to, co klient zobaczy po kliknięciu.
//
// Kolejność kadrów = kolejność usług (`servicePillars.ts`, eventy pierwsze). Pliki nie
// powtarzają się z hero, z kafelkami usług ani z kartami portfolio na tej stronie.
// `position` jest strojone pod OBA kontenery (4:5 na telefonie, kafel mozaiki od `md`).
// Podmiana pliku bez sprawdzenia kadru w obu proporcjach zepsuje kompozycję.
type Tile = {
  kat: string;
  label: string;
  src: string;
  position: string;
  /** Klasy kafla od `md` (miejsce w mozaice) albo `md:hidden` dla kadrów tylko w taśmie. */
  desktop: string;
  sizes: string;
};

const MOBILE = "(max-width: 767px) 72vw";

const TILES: Tile[] = [
  {
    kat: "eventy",
    label: "Eventy",
    // 22.09.2026: zamiast `event-20-gala-wreczenie-wyroznien` (Marcin: „na eventy dałbym
    // inne zdjęcie"). Tamten kadr był statyczny, z czerwoną torbą z logo na pierwszym
    // planie. Saksofonista na bankiecie ma ruch, emocję i salę z gośćmi w tle.
    // 3:2 poziomy. W 4:5 zostaje 53% szerokości, w kwadracie mozaiki 67%: 60% trzyma
    // całego saksofonistę razem z czarą instrumentu po lewej.
    src: "/images/galeria/eventy/event-24-saksofonista-bankiet.jpg",
    position: "60% 40%",
    desktop: "md:col-span-2 md:row-span-2",
    sizes: `${MOBILE}, (max-width: 1183px) 50vw, 568px`,
  },
  {
    kat: "portrety",
    label: "Portrety",
    // 4:5 pionowy. Od `md` kafel na dwa rzędy (ok. 1:2), więc zostaje 62% szerokości,
    // postać stoi na środku kadru.
    src: "/images/galeria/portrety/portret-18-mezczyzna-zielony-garnitur.jpg",
    position: "50% 40%",
    desktop: "md:row-span-2",
    sizes: `${MOBILE}, (max-width: 1183px) 25vw, 276px`,
  },
  {
    kat: "wnetrza",
    label: "Hale i obiekty",
    // Hala z osią symetrii na środku kadru.
    src: "/images/galeria/wnetrza/wnetrze-07-hala-strefa-kompletacji.jpg",
    position: "50% 50%",
    desktop: "",
    sizes: `${MOBILE}, (max-width: 1183px) 25vw, 276px`,
  },
  {
    kat: "produktowe",
    label: "Produkty",
    // 4:5 pionowy: 30% w pionie zostawia w kwadracie korek butelki i grejpfruta.
    src: "/images/galeria/produktowe/produkt-01-caprice.jpg",
    position: "50% 30%",
    desktop: "",
    sizes: `${MOBILE}, (max-width: 1183px) 25vw, 276px`,
  },
  // Dwa kadry tylko w taśmie na telefonie: tam miejsce jest za darmo (przewijanie),
  // a w mozaice zabrakłoby komórek. Każda kategoria RAZ: drugi kadr eventowy
  // (`event-13-networking`) wypadł 23.09.2026, bo plakietka „Eventy" stała w taśmie
  // dwa razy (zgłoszenie Marcina).
  {
    kat: "dron",
    label: "Dron",
    // 4:3 poziomy, w 4:5 zostaje 60% szerokości: 30% trzyma biurowiec po lewej.
    src: "/images/galeria/dron/dron-01-centrum-poznania-biurowce.jpg",
    position: "30% 50%",
    desktop: "md:hidden",
    sizes: MOBILE,
  },
  {
    kat: "gastronomia",
    label: "Gastronomia",
    // 2:3 pionowy, twarz kucharki w połowie wysokości.
    src: "/images/galeria/gastronomia/gastro-05-kucharz-toku-wydaje.jpg",
    position: "50% 45%",
    desktop: "md:hidden",
    sizes: MOBILE,
  },
];

// Te same klucze i ta sama kolejność co zakładki na `/galeria` (defs w `galeria/page.tsx`).
const CATEGORIES = [
  { kat: "eventy", label: "Eventy" },
  { kat: "portrety", label: "Portrety" },
  { kat: "produktowe", label: "Produktowe" },
  { kat: "gastronomia", label: "Gastronomia" },
  { kat: "wnetrza", label: "Wnętrza, hale i obiekty" },
  { kat: "dron", label: "Dron" },
  { kat: "wideo", label: "Wideo" },
];

export default function GalleryPeek() {
  return (
    <section id="galeria-podglad" className="py-8 md:py-12 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-blue dark:text-blue-light text-xs uppercase tracking-widest mb-3">Galeria</p>
          <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-4">Kadry z realizacji</h2>
          <p className="text-steel dark:text-dark-text-muted text-[15px] mb-6 md:mb-8">Wybrane zdjęcia z pracy dla firm. Pełną galerię przejrzysz po kategoriach.</p>
        </AnimatedSection>

        {/* Telefon: taśma. `-mx-4 px-4` wyciąga ją do krawędzi ekranu, a `scroll-px-4`
            trzyma przyciąganie przy marginesie treści. Od `md` ten sam `ul` jest siatką. */}
        <ul
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 scroll-px-4 md:mx-0 md:px-0 md:overflow-visible md:grid md:grid-cols-4 md:grid-rows-2 md:gap-4 md:h-[560px]"
          aria-label="Wybrane kadry z galerii"
        >
          {TILES.map((t) => (
            <li
              key={t.src}
              className={`shrink-0 w-[72%] aspect-[4/5] snap-start md:w-auto md:aspect-auto ${t.desktop}`}
            >
              <Link
                href={`/galeria?kat=${t.kat}`}
                data-cta={`galeria_home_${t.kat}`}
                className="group relative block h-full overflow-hidden rounded-2xl bg-border dark:bg-dark-card focus-visible:outline-offset-[-4px]"
              >
                <Image
                  src={t.src}
                  alt={galleryAlt(t.src, `Galeria: ${t.label}`)}
                  fill
                  sizes={t.sizes}
                  style={{ objectPosition: t.position }}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 dark:bg-navy/80 backdrop-blur px-3 py-1 text-[11px] font-barlow font-bold uppercase tracking-wider text-navy dark:text-white">
                  {t.label}
                </span>
              </Link>
            </li>
          ))}
          {/* Ostatni element taśmy: wyjście do całej galerii, tylko na telefonie
              (od `md` ten sam link stoi pod mozaiką). */}
          <li className="shrink-0 w-[72%] aspect-[4/5] snap-start md:hidden">
            <Link
              href="/galeria"
              data-cta="galeria_home_tasma"
              className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-center px-6"
            >
              <span className="font-barlow font-extrabold text-xl text-navy dark:text-white">Cała galeria</span>
              <span className="text-blue dark:text-blue-light font-barlow font-semibold text-sm">Zobacz wszystkie kadry →</span>
            </Link>
          </li>
        </ul>

        {/* Pigułki POD zdjęciami: nad nimi zajmowały na telefonie trzy rzędy i spychały
            pierwszy kadr pod krawędź ekranu. Najpierw obraz, potem wybór kategorii. */}
        <ul className="flex flex-wrap justify-center gap-2 mt-6 md:mt-8" aria-label="Kategorie galerii">
          {CATEGORIES.map((c) => (
            <li key={c.kat}>
              <Link
                href={`/galeria?kat=${c.kat}`}
                data-cta={`galeria_home_kat_${c.kat}`}
                className="inline-flex items-center min-h-9 px-4 py-2 rounded-full text-[13px] font-barlow font-semibold bg-blue-pale dark:bg-dark-card text-text-body dark:text-dark-text-muted hover:text-navy dark:hover:text-white border border-transparent dark:border-dark-border transition-colors"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Styl ramki jak „Masz podobny projekt?” w `Portfolio.tsx` (prośba Marcina 24.09.2026):
            jeden wzorzec dla przejść „zobacz więcej” pod sekcjami strony głównej. */}
        <Link
          href="/galeria"
          data-cta="galeria_home"
          className="block rounded-2xl border border-border dark:border-dark-border hover:border-blue dark:hover:border-blue-light transition-colors p-5 text-center font-semibold mt-5 text-blue dark:text-blue-light"
        >
          Zobacz pełną galerię <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
