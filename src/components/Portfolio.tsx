import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { portfolioItems, getCategoryBySlug } from "@/data/portfolio";
import { galleryAlt } from "@/data/galleryAlts";
import ProjectMetadata from "./ProjectMetadata";
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
          <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3">Wybrane realizacje</h2>
          <p className="text-steel dark:text-dark-text-muted text-[15px] mb-8">Cel, zakres i materiały, które trafiły do komunikacji firm.</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((item, index) => {
            const project = getCategoryBySlug(item.slug)?.caseStudy;
            return <AnimatedSection key={item.slug} className={index === 0 ? 'md:col-span-3' : ''}>
              <Link href={`/portfolio/${item.slug}`} data-cta={`case_${item.slug}`} className={`group grid overflow-hidden rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card h-full ${index === 0 ? 'md:grid-cols-2' : 'grid-cols-[104px_minmax(0,1fr)] sm:grid-cols-[144px_minmax(0,1fr)] md:grid-cols-1'}`}>
                <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[16/10] md:aspect-auto md:min-h-[340px]' : 'min-h-[168px] md:min-h-0 md:aspect-[4/3]'}`}>
                  <Image src={item.image} alt={galleryAlt(item.image, `Zdjęcie z realizacji: ${item.label}`)} fill className={`object-cover ${item.imagePosition === 'top' ? 'object-top' : ''} transition-transform duration-500 group-hover:scale-105`} sizes={index === 0 ? '(max-width: 768px) 100vw, 576px' : '(max-width: 639px) 104px, (max-width: 767px) 144px, 380px'} quality={85} placeholder="blur" blurDataURL={blurPlaceholder} />
                  {item.hasVideo && <span className="absolute bottom-4 left-4 bg-navy/85 text-white rounded-full px-3 py-1.5 text-xs">▶ Film z realizacji</span>}
                </div>
                <div className={`${index === 0 ? 'p-5' : 'p-4'} md:p-6 flex flex-col justify-center`}>
                  <p className="text-[10px] text-blue dark:text-blue-light uppercase tracking-widest mb-2">{index === 0 ? project?.client : project?.area?.join(' · ')}</p>
                  <h3 className={`font-barlow font-bold ${index === 0 ? 'text-xl' : 'text-base'} md:text-2xl text-navy dark:text-white`}>{item.label}</h3>
                  {index === 0 ? <ProjectMetadata data={project} compact /> : <p className='text-xs text-steel dark:text-dark-text-muted my-3'>{project?.capabilities?.join(' · ')}</p>}
                  {index === 0 && <p className="text-sm text-steel dark:text-dark-text-muted leading-relaxed mb-4">{project?.goal}</p>}
                  <span className="text-sm text-blue dark:text-blue-light font-semibold">Zobacz realizację →</span>
                </div>
              </Link>
            </AnimatedSection>;
          })}
        </div>
        <Link href="/kontakt" data-cta="wycena_home_portfolio" className="block mt-5 rounded-2xl border border-border dark:border-dark-border p-5 text-center text-navy dark:text-white font-semibold">Masz podobny projekt? <span className="text-blue dark:text-blue-light">Zapytaj o ofertę →</span></Link>
      </div>
    </section>
  );
}
