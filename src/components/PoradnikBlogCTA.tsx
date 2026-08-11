import Image from "next/image";
import Link from "next/link";

export default function PoradnikBlogCTA() {
  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-blue-pale/60 dark:bg-blue/10 p-5 md:p-6 flex flex-col sm:flex-row items-center gap-5">
      <Link href="/poradnik" aria-label="Pobierz darmowy poradnik" className="flex-shrink-0">
        <div className="relative w-[88px] aspect-[210/297] rounded-lg overflow-hidden bg-white shadow-lg ring-1 ring-border dark:ring-dark-border">
          <Image
            src="/images/poradnik-cover.png"
            alt="Poradnik, przygotowanie do sesji biznesowej"
            fill
            className="object-cover"
            sizes="88px"
          />
        </div>
      </Link>
      <div className="flex-1 text-center sm:text-left">
        <p className="text-[11px] font-barlow font-semibold uppercase tracking-wider text-blue dark:text-blue-light mb-1">
          Darmowy poradnik
        </p>
        <h3 className="font-barlow font-bold text-lg text-navy dark:text-white mb-1.5">
          Przygotuj się do sesji jak zawodowiec
        </h3>
        {/* `text-text-body`, NIE `text-steel` (11.08.2026, pomiar Lighthouse 13
            na produkcji). `#64748b` na pale-blue tle tej karty (`#f3f8fd`) dawało
            kontrast 4,45 przy wymaganych 4,5 dla tekstu 13 px — WCAG 2.1 AA
            formalnie niespełnione, jedyny błąd A11y na `/uslugi/wizerunek-portrety`.
            `#334155` daje 9,2. Ciemny motyw zostaje bez zmian, tam tło jest inne. */}
        <p className="text-[13px] text-text-body dark:text-dark-text-muted mb-4 leading-relaxed">
          Checklisty, planer stylizacji, ściąga kolorów i gotowa lista pytań: pobierz cały
          pakiet PDF za darmo.
        </p>
        {/* PELNY2608-13: ta sama nazwa co w `PoradnikTeaser`, żeby oba wejścia
            na lead magnet liczyły się w jednej pozycji raportu. */}
        {/* ⚠ `py-3` I `text-[14px]` ZAMIAST `py-2.5` I `text-sm`, 11.08.2026
            (audyt końcowy UI, finding F3, decyzja Marcina). Wysokość rosła z 40
            na 45 px, czyli powyżej progu 44 px z WCAG 2.5.8. Ten przycisk był
            jedynym gradientowym CTA w serwisie poniżej progu, a wygląda na
            element pierwszego poziomu.

            Rozmiar pisma się NIE ZMIENIA: `text-sm` i `text-[14px]` renderują
            tak samo 14 px. Różni je wyłącznie interlinia (20 wobec 21 px) i to
            ona plus dwa piksele paddingu dają brakujące 5 px. Dobrane tak, żeby
            wyjść dokładnie na 45 px, czyli tyle co CTA przed FAQ na podstronach
            usług, a nie „gdzieś powyżej 44".

            Kolory, gradient, poświata, promień, tekst, `href` i `data-cta`
            bez zmian. Poziomy padding też: `px-5` zostaje, bo ten przycisk stoi
            w wąskiej karcie, a nie na całej szerokości sekcji. */}
        <Link
          href="/poradnik"
          data-cta="poradnik_wejscie"
          className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue text-white px-5 py-3 rounded-xl font-barlow font-bold text-[14px] btn-glow hover:scale-[1.01] transition-transform"
        >
          Pobierz poradnik
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
