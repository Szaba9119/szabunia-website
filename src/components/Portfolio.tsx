import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { portfolioItems, getCategoryBySlug } from "@/data/portfolio";
import { galleryAlt } from "@/data/galleryAlts";
import type { PortfolioItem } from "@/data/portfolio";

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg==";

// Na home pokazujemy dopracowane case studies (podstrony realizacji gotowe).
// KOLEJNOŚĆ USTALONA PRZEZ MARCINA 10.08.2026: E-commerce All-in otwiera sekcję,
// potem IDcom, Yes Butcher, Artech.
//
// ⚠ To ŚWIADOMIE COFA ZDJ2608-32 (decyzja z 04.08.2026), która zdjęła woohoo-autopay
// z pierwszego miejsca. Powód tamtej decyzji zostaje tu zapisany, żeby nie zniknął:
// wszystkie pięć obrazów tego case study to grafiki i klatki z filmu (plansza
// „E-COMMERCE All in", okładki reelsów), a `gallery` jest puste, więc klient szukający
// ZDJĘĆ widział jako pierwszą planszę tytułową, nie fotografię.
// Marcin zna ten koszt i mimo to chce tej kolejności.
//
// Gdyby to miało wrócić do dyskusji, właściwym rozwiązaniem jest wariant B z tamtego
// audytu: dołożyć do tego case study prawdziwe kadry foto z eventu (pliki spoza repo),
// a nie przestawiać kolejność w tę i z powrotem.
// Wejście do galerii (miniatury + link) wyprowadzone 22.09.2026 wieczorem do osobnej
// sekcji `GalleryPeek.tsx`, która stoi NAD tą sekcją (decyzja Marcina).
const FEATURED_SLUGS = [
  "woohoo-autopay",
  "idcom-headshoty-zespolu",
  "yes-butcher-przewodnik-michelin",
  "artech-fotografia-produktowa",
];

export default function Portfolio() {
  const featured = FEATURED_SLUGS.map((slug) => portfolioItems.find((item) => item.slug === slug))
    .filter((item): item is PortfolioItem => Boolean(item));
  return (
    <section id="portfolio" className="py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-blue dark:text-blue-light text-xs uppercase tracking-widest mb-3">Wybrane projekty</p>
          <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-4">Wybrane realizacje</h2>
          <p className="text-steel dark:text-dark-text-muted text-[15px] mb-8">Cel, zakres i materiały, które trafiły do komunikacji firm.</p>
        </AnimatedSection>
        {/* CZTERY RÓWNE KAFLE, 14.09.2026 (polecenie Marcina: „to portfolio na 4 równe
            kafelki"). Wcześniej pierwsza realizacja zajmowała cały rząd (md:col-span-3,
            metadane i cel projektu), a trzy pozostałe stały pod nią mniejsze.
            Kolejność FEATURED_SLUGS bez zmian, tylko nie niesie już różnicy wagi.
            Telefon: zwarte karty ze zdjęciem obok opisu (układ z 13.09, krótsza sekcja).
            sm: dwie kolumny, lg: cztery w jednym rzędzie. Każdy kafel ma tę samą treść:
            obszar, nazwa, zakres, link. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((item) => {
            const project = getCategoryBySlug(item.slug)?.caseStudy;
            return <AnimatedSection key={item.slug}>
              <Link href={`/portfolio/${item.slug}`} data-cta={`case_${item.slug}`} className="group grid grid-cols-[104px_minmax(0,1fr)] sm:grid-cols-1 sm:grid-rows-[auto_1fr] overflow-hidden rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card h-full hover:border-blue dark:hover:border-blue transition-colors">
                <div className="relative overflow-hidden min-h-[140px] sm:min-h-0 sm:aspect-[4/3]">
                  <Image src={item.image} alt={galleryAlt(item.image, `Zdjęcie z realizacji: ${item.label}`)} fill className="object-cover transition-transform duration-500 group-hover:scale-105" style={{ objectPosition: item.imagePosition }} sizes="(max-width: 639px) 104px, (max-width: 1023px) 50vw, 280px" quality={85} placeholder="blur" blurDataURL={blurPlaceholder} />
                  {item.hasVideo && <span className="hidden sm:inline-flex absolute bottom-3 left-3 bg-navy/85 text-white rounded-full px-3 py-1.5 text-xs">▶ Film z realizacji</span>}
                </div>
                <div className="p-4 md:p-5 flex flex-col">
                  <p className="text-[10px] text-blue dark:text-blue-light uppercase tracking-widest mb-2">{project?.area?.join(' · ')}</p>
                  <h3 className="font-barlow font-bold text-base md:text-lg leading-snug text-navy dark:text-white">{item.label}</h3>
                  <p className="text-xs text-steel dark:text-dark-text-muted mt-2 mb-3">{project?.capabilities?.join(' · ')}</p>
                  <span className="mt-auto text-sm text-blue dark:text-blue-light font-semibold">Zobacz realizację →</span>
                </div>
              </Link>
            </AnimatedSection>;
          })}
        </div>
        {/* `#kontakt`, nie `/kontakt` — patrz komentarz w `Hero.tsx`. */}
        <a href="#kontakt" data-cta="wycena_home_portfolio" className="block mt-5 rounded-2xl border border-border dark:border-dark-border hover:border-blue dark:hover:border-blue-light transition-colors p-5 text-center text-navy dark:text-white font-semibold">Masz podobny projekt? <span className="text-blue dark:text-blue-light whitespace-nowrap">Zapytaj o ofertę →</span></a>
      </div>
    </section>
  );
}
