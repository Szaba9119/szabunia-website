import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import type { ProcessStep } from "@/data/portfolio";

interface Props {
  steps: ProcessStep[];
  /** Nagłówek sekcji. Domyślnie „Jak wygląda współpraca” (strony portfolio).
      Strony usług podają własny, z frazą (audyt 2026-07-30). */
  heading?: string;
}

// Liczebnik do podtytułu. Do 22.09.2026 stało tu na sztywno „Cztery kroki",
// co przestało być prawdą w chwili, gdy fotografia produktowa dostała piąty
// etap (dostarczenie produktów do studia).
const LICZEBNIK: Record<number, string> = {
  3: "Trzy kroki",
  4: "Cztery kroki",
  5: "Pięć kroków",
  6: "Sześć kroków",
};

export default function PortfolioProcess({ steps, heading }: Props) {
  if (steps.length === 0) return null;
  // Tailwind skanuje klasy statycznie, więc kolumny muszą stać jako pełne nazwy.
  //
  // ⚠ DZIŚ WSZYSTKIE DANE MAJĄ DOKŁADNIE CZTERY KROKI (cztery usługi i cztery case
  // studies, sprawdzone 22.09.2026). Gałęzie na 3 i 5 zostają mimo to, bo kosztują
  // osiem linii, a pilnują realnej awarii: w trakcie tej sesji podstrona produktowa
  // miała przez chwilę pięć kroków i przy sztywnym `md:grid-cols-4` ostatni zawijał
  // się sam do drugiego rzędu, a podtytuł dalej mówił „Cztery kroki".
  //
  // Pięć kroków rozkłada się dopiero od `lg`, nie od `md`: zmierzone przy 768 px
  // pięć kolumn dawało 125 px na krok i tytuły łamały się na dwa wiersze.
  const kolumny =
    steps.length === 5
      ? "lg:grid-cols-5"
      : steps.length === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-4";

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          {/* Nagłówek i podtytuł w jednym Parallaxie (14.09.2026): sam h2 jeździł ±24 px
              nad odstępem 12 px i przy scrollu nachodził na podtytuł. Wzór z Services.tsx. */}
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[40px] leading-tight tracking-tight text-navy dark:text-white mb-4 text-center">
              {heading ?? "Jak wygląda współpraca"}
            </h2>
            <p className="text-steel dark:text-dark-text-muted text-[15px] leading-relaxed text-center mb-10 max-w-md mx-auto">
              {LICZEBNIK[steps.length] ?? `${steps.length} kroków`} od pierwszego
              kontaktu do gotowych materiałów.
            </p>
          </Parallax>
        </AnimatedSection>

        {/* WZORZEC ZE STRONY GŁÓWNEJ, 22.09.2026 (decyzja Marcina: „bardzo blisko
            rozwiązania ze strony głównej, brak zbędnych kart").

            Co zeszło: białe karty `rounded-2xl border` pod każdym krokiem, gradientowa
            linia łącząca kółka na desktopie i pionowy łącznik na telefonie. Powód jest
            kompozycyjny. Na podstronie usługi ta sekcja stała między opinią (karta),
            blokiem autorskim (karta) i „Przykładowymi realizacjami" (karty), więc
            cztery kroki procesu były piątym z rzędu blokiem w ramce. Na stronie
            głównej ten sam proces stoi bez kart i czyta się jako lista etapów.

            Co zostaje: numer w niebieskim kole, cienka linia nad tytułem, mocny tytuł,
            opis. Jeden wzorzec na home i na podstronach (spójność, punkt 27 briefu).

            ⚠ JEDNA LISTA W DOM (P0-035 z 14.09.2026) OBOWIĄZUJE DALEJ. Nie wracać do
            dwóch kopii kroków przełączanych przez `hidden md:block`: dawało to po osiem
            nagłówków h3 na podstronę zamiast czterech. Telefon i desktop różni wyłącznie
            kierunek flexa. */}
        <AnimatedSection>
          <ol
            aria-label="Etapy współpracy"
            className={`grid grid-cols-1 gap-6 ${kolumny}`}
          >
            {steps.map((step) => (
              <li
                key={step.num}
                className={`flex gap-4 ${steps.length === 5 ? "lg:flex-col lg:items-center lg:text-center" : "md:flex-col md:items-center md:text-center"}`}
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-full bg-blue text-white flex items-center justify-center font-barlow font-bold text-lg"
                >
                  {step.num}
                </span>
                <div className="flex-1 w-full border-t border-border dark:border-dark-border pt-4">
                  <h3 className="font-barlow font-bold text-base text-navy dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-steel dark:text-dark-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </AnimatedSection>
      </div>
    </section>
  );
}
