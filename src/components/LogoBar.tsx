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
                ? "border-y border-border dark:border-dark-border py-6 lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12 lg:items-start"
                : ""
            }
          >
            <div>
              <p
                className={`text-[11px] md:text-xs font-barlow font-semibold uppercase tracking-[0.16em] text-steel dark:text-dark-text-muted ${
                  highlight ? "mb-4" : "text-center mb-6"
                }`}
              >
                Realizacje dla marek i firm
              </p>
              <ul
                className={`flex flex-wrap items-center gap-x-7 md:gap-x-10 gap-y-4 ${
                  highlight ? "" : "justify-center"
                }`}
              >
                {brands.map((brand) => (
                  <li
                    key={brand}
                    className={`font-barlow font-bold tracking-tight ${
                      highlight
                        ? "text-[15px] md:text-[17px] text-navy dark:text-dark-text"
                        : "text-base md:text-xl text-steel dark:text-dark-text-muted"
                    }`}
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </div>

            {highlight && (
              <p className="mt-5 lg:mt-0 text-[14px] leading-relaxed text-text-body dark:text-dark-text max-w-[62ch]">
                {highlight.text}
                {highlight.href && (
                  <>
                    {" "}
                    {/* Dyskretny link, nie CTA: obok stoi główne CTA podstrony. */}
                    <a
                      href={highlight.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1 align-middle text-blue dark:text-blue-light font-barlow font-semibold hover:underline"
                    >
                      {highlight.linkLabel ?? "Zobacz"}
                      <span aria-hidden="true">→</span>
                      <span className="sr-only">(otwiera się w nowej karcie)</span>
                    </a>
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
