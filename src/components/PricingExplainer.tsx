/* Blok „Jak powstaje wycena" — dodany 14.08.2026 razem z depricingiem.
 *
 * PO CO ISTNIEJE. Do 14.08 strona odpowiadała na pytanie „ile to kosztuje"
 * kwotą startową przy każdej usłudze. Kwoty zeszły z powierzchni ofertowych
 * (`services.tsx`, JSON-LD, FAQ). Samo odjęcie zostawiłoby stronę uboższą
 * o informację i nie dałoby nic w zamian: klient z pytaniem o cenę nie
 * dostawałby żadnego sygnału, że w ogóle dostanie odpowiedź. Ten blok jest
 * drugą połową tamtej zmiany.
 *
 * CO MÓWI, A CZEGO NIE. Mówi, JAK powstaje cena i KIEDY klient ją dostanie.
 * Nie podaje żadnej kwoty i nie ma jej podawać: gdyby ją podawał, byłby
 * cennikiem pod inną nazwą.
 *
 * ŹRÓDŁO TREŚCI. `01_Biznes/_System/05_Produkcja/proces_oferty_v1.md` §2
 * (pięć czynników ceny w języku klienta) i §1 (etapy 1 i 3). Zmiana treści
 * tutaj bez zmiany tam rozjedzie stronę z procesem ofertowym.
 *
 * ⚠ NIE POWIELA `pricingBlurb`. Ten blok jest OGÓLNY i identyczny na każdej
 * powierzchni, a `pricingBlurb` w `services.tsx` mówi o czynnikach właściwych
 * dla JEDNEJ usługi i wchodzi do pytania cenowego w FAQ. Jeśli kiedyś zaczną
 * mówić to samo, usuwa się ten blok, nie `pricingBlurb`: tamten jest per usługa
 * i zasila dane strukturalne.
 */

const STEPS = [
  "Piszesz w kilku zdaniach, co planujesz.",
  "Dopytuję o to, czego brakuje: skalę, termin, lokalizację i to, gdzie materiał trafi.",
  "Odsyłam wycenę w trzech wariantach, w ciągu 24 godzin.",
];

const FACTORS = [
  {
    title: "Zdjęcia, film, czy jedno i drugie",
    desc: "Film nagrany przy okazji zdjęć kosztuje mniej niż zamówiony osobno, bo to jeden dzień zdjęciowy zamiast dwóch.",
  },
  {
    title: "Skala",
    desc: "Ile osób, ile produktów, ile godzin trwa wydarzenie. Przy zespole płacisz za liczbę osób, nie za długość jednej sesji.",
  },
  {
    title: "Co trzeba rozstawić na miejscu",
    desc: "Portret przy oknie i mobilne studio z dwoma systemami światła to różne sesje, nawet jeśli zdjęć wychodzi tyle samo.",
  },
  {
    title: "Gdzie",
    desc: "W Poznaniu dojazd nic nie kosztuje. Poza miastem liczą się kilometry od granicy miasta w obie strony.",
  },
  {
    title: "Co dzieje się po sesji",
    desc: "Korekta partiami przy reportażu to inna praca niż indywidualna obróbka każdego kadru, a materiał do druku wymaga więcej niż materiał na LinkedIn.",
  },
];

/* `showFactors` istnieje po to, żeby ten blok NIE mówił dwa razy tego samego
 * na jednej stronie.
 *
 * Na `/uslugi/[slug]` pierwszym pytaniem FAQ jest pytanie cenowe, a jego treść
 * to `pricingBlurb` tej usługi, czyli lista czynników wyceny właściwych dla
 * NIEJ (`getPriceFaq` w `services.tsx`). Gdyby blok pokazywał tam swoją ogólną
 * piątkę, klient dostałby dwie listy czynników w odległości kilku ekranów,
 * a ta bardziej szczegółowa byłaby niżej. Dlatego podstrony usług biorą sam
 * proces, a pełna lista stoi na `/kontakt`, gdzie żadnego FAQ cenowego nie ma.
 */
export default function PricingExplainer({
  className = "",
  showFactors = true,
}: {
  className?: string;
  showFactors?: boolean;
}) {
  return (
    <section className={className} aria-labelledby="jak-powstaje-wycena">
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 md:p-8">
        <h2
          id="jak-powstaje-wycena"
          className="font-barlow font-extrabold text-xl md:text-2xl text-navy dark:text-white mb-2"
        >
          Jak powstaje wycena
        </h2>
        <p className="text-steel dark:text-dark-text-muted text-[14px] leading-relaxed mb-6">
          Cennika w formie tabeli nie ma, bo dwie realizacje o tej samej nazwie
          potrafią różnić się zakresem na tyle, że jedna cena byłaby nieprawdziwa
          dla obu. Zamiast tabeli jest to:
        </p>

        {/* Kroki procesu. `<ol>`, bo kolejność niesie znaczenie. */}
        <ol className={`space-y-2.5 ${showFactors ? "mb-7" : ""}`}>
          {STEPS.map((step, i) => (
            <li key={step} className="flex gap-3 text-[14px] leading-relaxed">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-pale dark:bg-blue/15 text-blue dark:text-blue-light font-barlow font-bold text-[12px] flex items-center justify-center"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="text-navy dark:text-white pt-0.5">{step}</span>
            </li>
          ))}
        </ol>

        {showFactors && (
          <>
            <p className="font-barlow font-bold text-[13px] uppercase tracking-wide text-steel dark:text-dark-text-muted mb-3">
              Na cenę wpływa
            </p>
            <ul className="space-y-3">
              {FACTORS.map((f) => (
                <li key={f.title} className="text-[14px] leading-relaxed">
                  <span className="font-barlow font-semibold text-navy dark:text-white">
                    {f.title}.
                  </span>{" "}
                  <span className="text-steel dark:text-dark-text-muted">{f.desc}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
