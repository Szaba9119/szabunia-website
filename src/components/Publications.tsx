import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

export default function Publications() {
  return (
    <section className="py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          {/* Etykieta, nagłówek i podtytuł w jednym Parallaxie (14.09.2026): sam h2 jeździł
              ±24 px między dwoma odstępami po 12 px i nachodził na etykietę albo podtytuł.
              Wzór z Services.tsx. */}
          <Parallax distance={PARALLAX.accent} direction="up">
            <p className="text-[11px] uppercase tracking-widest text-steel dark:text-dark-text-muted mb-3 font-barlow font-semibold text-center">
              Publikacje
            </p>
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-4 text-center">
              Gdzie trafiły moje zdjęcia
            </h2>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-10 max-w-2xl mx-auto leading-relaxed">
              Zdjęcia, które robię dla klientów, trafiają do reklam drukowanych, na billboardy, do katalogów, międzynarodowej prasy branżowej i przewodnika Michelin. O publikacji decydowały tam redakcje i agencje, nie ja.
            </p>
          </Parallax>
        </AnimatedSection>

        {/* Dwie publikacje wydzielone z rzędu logotypów (korekta_pozycjonowania_2026-07.md
            §4d, decyzja Marcina 30.07.2026): to jedyne dwie pozycje w portfolio spoza
            eventów i najmocniejsze dowody jakości, jakich nie ma żaden inny fotograf
            w Poznaniu. W rzędzie logotypów obok reszty marek ginęły. */}
        {/* Pion na telefonie, poziom na komputerze (prośba Marcina 30.07.2026).
            23.09.2026: na telefonie okładka zeszła z 160 px nad tekstem do miniatury 96 px
            obok etykiety i tytułu (siatka 6rem + reszta), opis i link na pełną szerokość
            pod spodem. Sekcja miała na telefonie 1 548 px, najwięcej po usługach i formularzu.
            Od `lg` karta wraca do układu flex: okładka po lewej, cały tekst po prawej
            (wrapper tekstu ma `contents` tylko poniżej `lg`). Treść bez zmian. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Karta publikacji: Big Furniture Group Magazine */}
        <AnimatedSection>
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 md:p-8 h-full grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 gap-y-4 items-center lg:flex lg:flex-row lg:gap-8 lg:items-start">
            <a
              href="https://bigfurnituregroup.com/big-furniture-group-magazine-april-2026-now-live/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Okładka Big Furniture Group Magazine, kwiecień 2026 (otwiera się w nowej karcie)"
              className="block shrink-0 w-24 lg:w-44 rounded-lg overflow-hidden border border-border dark:border-dark-border shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src="/images/publikacje/bfg-april-2026.jpg"
                alt="Okładka Big Furniture Group Magazine, kwiecień 2026, z meblami Forte na okładce"
                width={290}
                height={416}
                className="w-full h-auto"
              />
            </a>
            <div className="contents lg:flex lg:min-w-0 lg:self-stretch lg:flex-col">
            <div className="min-w-0">
            <p className="text-[10px] font-barlow font-semibold uppercase tracking-wider text-steel dark:text-dark-text-muted mb-3">
              Prasa branżowa · UK · 2026
            </p>
            <h3 className="font-barlow font-bold text-xl text-navy dark:text-white mb-1">
              Big Furniture Group Magazine
            </h3>
            <p className="text-[13px] text-steel dark:text-dark-text-muted mb-4">
              Kwiecień 2026, wydanie z Forte na okładce
            </p>
            </div>
            <p className="col-span-2 text-[15px] text-steel dark:text-dark-text-muted leading-relaxed lg:mb-6">
              Kadry wykonane dla <strong className="text-navy dark:text-white font-semibold">Grupy Forte S.A.</strong> na targach meblowych w Poznaniu, trafiły do kwietniowego wydania Big Furniture Group Magazine, brytyjskiego pisma branży meblarskiej. Jedno z nich znalazło się na okładce.
            </p>
            <a
              href="https://bigfurnituregroup.com/big-furniture-group-magazine-april-2026-now-live/"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 justify-self-start mt-auto inline-flex items-center gap-1 py-2 text-blue dark:text-blue-light hover:text-blue-light dark:hover:text-white text-[13px] font-barlow font-semibold transition-colors"
            >
              Zobacz wydanie →
            </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Karta publikacji: przewodnik Michelin (Yes Butcher!) */}
        <AnimatedSection>
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 md:p-8 h-full grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 gap-y-4 items-center lg:flex lg:flex-row lg:gap-8 lg:items-start">
            <a
              href="https://guide.michelin.com/en/wielkopolskie/poznan_2395985/restaurant/yes-butcher"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil Yes Butcher! w przewodniku Michelin (otwiera się w nowej karcie)"
              className="block shrink-0 w-24 lg:w-44 rounded-lg overflow-hidden border border-border dark:border-dark-border shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src="/images/portfolio/yes-butcher/yes-butcher-44.jpg"
                alt="Stek ribeye nagrodzony w World Steak Challenge 2025 w firmowym pudełku Yes Butcher!, zdjęcie z sesji, która trafiła do przewodnika Michelin"
                width={290}
                height={435}
                className="w-full h-auto"
              />
            </a>
            <div className="contents lg:flex lg:min-w-0 lg:self-stretch lg:flex-col">
            <div className="min-w-0">
            <p className="text-[10px] font-barlow font-semibold uppercase tracking-wider text-steel dark:text-dark-text-muted mb-3">
              Przewodnik Michelin · Poznań · 2026
            </p>
            <h3 className="font-barlow font-bold text-xl text-navy dark:text-white mb-1">
              Yes Butcher! Shop &amp; Bistro
            </h3>
            <p className="text-[13px] text-steel dark:text-dark-text-muted mb-4">
              Profil restauracji w przewodniku Michelin
            </p>
            </div>
            <p className="col-span-2 text-[15px] text-steel dark:text-dark-text-muted leading-relaxed lg:mb-6">
              Komplet materiału z jednego dnia dla steakhouse&apos;u w Starych Koszarach: ujęcie z drona, wnętrza, portrety szefa kuchni i stek nagrodzony w World Steak Challenge. Zdjęcia trafiły na profil restauracji w <strong className="text-navy dark:text-white font-semibold">przewodniku Michelin</strong>.
            </p>
            <Link
              href="/portfolio/yes-butcher-przewodnik-michelin"
              className="col-span-2 justify-self-start mt-auto inline-flex items-center gap-1 py-2 text-blue dark:text-blue-light hover:text-blue-light dark:hover:text-white text-[13px] font-barlow font-semibold transition-colors"
            >
              Zobacz case study →
            </Link>
            </div>
          </div>
        </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
