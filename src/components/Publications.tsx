import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

export default function Publications() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-[11px] uppercase tracking-widest text-steel dark:text-dark-text-muted mb-3 font-barlow font-semibold text-center">
            Publikacje
          </p>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Gdzie trafiły moje zdjęcia
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            Zdjęcia, które robię dla klientów, przechodzą przez cudzą redakcję. Trafiają do reklam drukowanych, outdooru, katalogów, międzynarodowej prasy branżowej i do przewodnika Michelin.
          </p>
        </AnimatedSection>

        {/* Dwie publikacje wydzielone z rzędu logotypów (korekta_pozycjonowania_2026-07.md
            §4d, decyzja Marcina 30.07.2026): to jedyne dwie pozycje w portfolio spoza
            eventów i najmocniejsze dowody jakości, jakich nie ma żaden inny fotograf
            w Poznaniu. W rzędzie logotypów obok reszty marek ginęły. */}
        <div className="space-y-6">

        {/* Karta publikacji: Big Furniture Group Magazine */}
        <AnimatedSection>
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 md:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
            <a
              href="https://bigfurnituregroup.com/big-furniture-group-magazine-april-2026-now-live/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Okładka Big Furniture Group Magazine, kwiecień 2026 (otwiera się w nowej karcie)"
              className="block shrink-0 w-40 sm:w-44 mx-auto sm:mx-0 rounded-lg overflow-hidden border border-border dark:border-dark-border shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src="/images/publikacje/bfg-april-2026.jpg"
                alt="Okładka Big Furniture Group Magazine, kwiecień 2026, z meblami Forte na okładce"
                width={290}
                height={416}
                className="w-full h-auto"
              />
            </a>
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
            <p className="text-[15px] text-steel dark:text-dark-text-muted leading-relaxed mb-6">
              Zdjęcia, które wykonałem dla <strong className="text-navy dark:text-white font-semibold">Grupa Forte S.A.</strong> na targach meblowych w Poznaniu, trafiły do kwietniowego wydania Big Furniture Group Magazine, brytyjskiego pisma branży meblarskiej audytowanego przez ABC. Jedno z nich znalazło się na okładce.
            </p>
            <a
              href="https://bigfurnituregroup.com/big-furniture-group-magazine-april-2026-now-live/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 py-2 text-blue dark:text-blue-light hover:text-blue-light dark:hover:text-white text-[13px] font-barlow font-semibold transition-colors"
            >
              Zobacz wydanie →
            </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Karta publikacji: przewodnik Michelin (Yes Butcher!) */}
        <AnimatedSection>
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 md:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
            <a
              href="https://guide.michelin.com/en/wielkopolskie/poznan_2395985/restaurant/yes-butcher"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil Yes Butcher! w przewodniku Michelin (otwiera się w nowej karcie)"
              className="block shrink-0 w-40 sm:w-44 mx-auto sm:mx-0 rounded-lg overflow-hidden border border-border dark:border-dark-border shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src="/images/portfolio/yes-butcher/yes-butcher-44.jpg"
                alt="Stek ribeye nagrodzony w World Steak Challenge 2025 w firmowym pudełku Yes Butcher!, zdjęcie z sesji, która trafiła do przewodnika Michelin"
                width={290}
                height={435}
                className="w-full h-auto"
              />
            </a>
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
            <p className="text-[15px] text-steel dark:text-dark-text-muted leading-relaxed mb-6">
              Komplet materiału z jednego dnia dla steakhouse&apos;u w Starych Koszarach: ujęcie z drona, wnętrza, portrety szefa kuchni i stek nagrodzony w World Steak Challenge. Zdjęcia trafiły na profil restauracji w <strong className="text-navy dark:text-white font-semibold">przewodniku Michelin</strong>.
            </p>
            <Link
              href="/portfolio/yes-butcher-przewodnik-michelin"
              className="inline-flex items-center gap-1 py-2 text-blue dark:text-blue-light hover:text-blue-light dark:hover:text-white text-[13px] font-barlow font-semibold transition-colors"
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
