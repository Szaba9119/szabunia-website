import AnimatedSection from "@/components/AnimatedSection";
import { clients } from "@/data/proof";
import type { ServiceData } from "@/data/services";

// Pasek marek. Kolejność domyślnego zestawu zachowuje decyzję właściciela
// z 10.08.2026. Jeden zestaw w DOM, bez automatycznego przewijania.
//
// PRZEBUDOWA 22.09.2026: komponent przyjmuje dane, zamiast zawsze renderować
// `clients` z `proof.ts`. Powód jest merytoryczny, nie techniczny. Ta sama lista
// dziewięciu marek stała na wszystkich czterech podstronach usług, a inwentaryzacja
// archiwum pokazała, że dziesięć z jedenastu marek referencyjnych to realizacje
// eventowe i targowe. Na wizerunku, obiektach i produktowej lista dowodziła więc
// czegoś innego, niż sprzedaje podstrona.
//
// Strona główna i `/galeria` wołają komponent BEZ propsów i dostają zestaw
// domyślny — tam blok mówi o całej działalności, więc lista ogólna jest właściwa.
//
// ⛔ NAZWY, NIE LOGOTYPY. Nie dodawać plików graficznych: mniej problemów
// z brandingiem, mniej requestów, spójniejszy layout.
//
// ⛔ NAGŁÓWEK „Realizacje dla marek i firm", NIE „Zaufali mi" ani „Moi klienci".
// Część realizacji przyszła przez agencję albo inne studio (IDcom przez Self Brand,
// Warner Music z fakturą na pośrednika, Amica i Posnania z polecenia). Obecne
// brzmienie jest prawdziwe w każdym z tych przypadków.

export default function LogoBar({ proof }: { proof?: ServiceData['proof'] }) {
  const brands = proof?.brands ?? clients;
  const highlight = proof?.highlight;

  return (
    <AnimatedSection>
      <section className="pt-8 pb-6 px-4" aria-label="Realizacje dla marek i firm">
        <div className="max-w-6xl mx-auto">
          {/* Bez `highlight` blok zostaje wyśrodkowany, dokładnie jak przed zmianą.
              Z `highlight` przechodzi na dwie kolumny od `lg` i wyrównanie do lewej:
              zdanie dowodu czyta się jak zdanie, nie jak podpis. */}
          <div
            className={
              highlight
                ? "border-y border-border dark:border-dark-border py-7 md:py-8 max-w-4xl mx-auto text-center"
                : ""
            }
          >
            <div>
              <p
                className="text-[11px] md:text-xs font-barlow font-semibold uppercase tracking-[0.16em] text-steel dark:text-dark-text-muted text-center mb-6"
              >
                Realizacje dla marek i firm
              </p>
              <ul
                className="flex flex-wrap items-center justify-center gap-x-7 md:gap-x-10 gap-y-4"
              >
                {brands.map((brand) => (
                  <li
                    key={brand}
                    className="font-barlow font-bold tracking-tight text-base md:text-xl text-steel dark:text-dark-text-muted"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </div>

            {highlight && (
              /* Editorial proof, nie karta: nadtytuł, tytuł, dwa zdania, mały link.
                 `max-w-[46ch]` trzyma wiersz w czytelnej długości i nie pozwala
                 tekstowi rozjechać się na całą kolumnę przy 1440 px. */
              <div className="mt-7 pt-7 border-t border-border dark:border-dark-border max-w-xl mx-auto">
                <p className="text-[11px] md:text-xs font-barlow font-semibold uppercase tracking-[0.16em] text-blue dark:text-blue-light mb-4">
                  {highlight.eyebrow}
                </p>
                <p className="font-barlow font-bold text-[15px] md:text-[17px] leading-snug text-navy dark:text-white mb-2">
                  {highlight.title}
                </p>
                <p className="text-[14px] leading-relaxed text-steel dark:text-dark-text-muted">
                  {highlight.text}
                </p>
                {highlight.href && (
                  <a
                    href={highlight.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-barlow font-semibold text-blue dark:text-blue-light hover:underline"
                  >
                    {highlight.linkLabel ?? "Zobacz"}
                    <span aria-hidden="true">→</span>
                    <span className="sr-only">(otwiera się w nowej karcie)</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
