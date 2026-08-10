import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import CountUp from "./CountUp";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

export default function About() {
  return (
    <section id="o-mnie" className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Zdjęcie — tylko na desktopie. Na telefonie sekcja jest tekstowa
              (bez dublowania portretu z hero w pierwszym przewinięciu). */}
          <AnimatedSection className="hidden lg:block">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-border dark:bg-dark-card">
              <Parallax distance={PARALLAX.subtle} direction="up" className="absolute inset-0">
                <div className="absolute inset-0 scale-[1.15]">
                  <Image
                    src="/images/marcin-o-mnie.jpg"
                    alt="Marcin Szabunia, fotograf biznesowy, portret, Poznań"
                    fill
                    className="object-cover"
                    // ZDJ2608-25 (04.08.2026): kolumna w max-w-6xl z gap-16 to (1152-64)/2 = 544 px,
                    // a obraz siedzi w scale-[1.15] (wyżej), czyli renderuje się na ~626 px.
                    // Poprzednie 520 px kazało przeglądarce pobrać węższy wariant, niż potrzeba.
                    sizes="(max-width: 1024px) 0px, 630px"
                    quality={80}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg=="
                  />
                </div>
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
            </div>
          </AnimatedSection>

          {/* Tekst */}
          <AnimatedSection delay={0.15}>
            <div>
              <Parallax distance={PARALLAX.accent} direction="up">
                <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-6 text-center lg:text-left">
                  O mnie
                </h2>
              </Parallax>

              <div className="space-y-5 text-steel dark:text-dark-text-muted text-[15px] leading-relaxed">
                <p>
                  {/* „wideo marketing" (nazwa usuniętej usługi) zdjęte 10.08.2026.
                      Słowo „profesjonalny" świadomie NIE dopisane, mimo propozycji:
                      docs/zasady-tekstow.md:31 zakazuje go jako jedynego określenia. */}
                  Cześć, jestem Marcin. <strong>Od 2018 roku</strong> buduję wizerunek firm poprzez
                  fotografię i wideo. Bazuję w Poznaniu,
                  pracuję w całej Polsce i Europie.
                </p>
                <p>
                  Ukończyłem <strong>studia z zarządzania</strong>, więc rozumiem nie tylko kadr,
                  ale i biznesowy cel, któremu zdjęcia mają służyć.
                  Specjalizuję się w obsłudze <strong>marek B2B i korporacji</strong>, które
                  potrzebują powtarzalnego standardu wizerunkowego między sesjami.
                  {/* Lista przepisana 10.08.2026 na cztery filary. Poprzednia
                      („Portrety biznesowe, reportaże z eventów, fotografia
                      produktowa, wideo marketingowe") wymieniała cztery pozycje,
                      ale ze STAREJ architektury: brakowało całego filaru
                      nieruchomości i przemysłu, a była nazwa usuniętej usługi.
                      Sekcja „O mnie" stoi NAD siatką usług, więc klient czytał
                      najpierw starą listę, a potem nową.
                      Wideo świadomie nie jest piątą pozycją: jest sposobem
                      realizacji każdej z czterech, nie osobną kategorią. */}
                  Portrety biznesowe, reportaże z eventów, fotografia nieruchomości
                  i przemysłowa oraz fotografia produktowa. <strong>Jeden twórca</strong>,
                  spójny materiał i krótka droga od pierwszej rozmowy do dostawy.
                </p>
                <p>
                  Współpracowałem m.in. z <strong>H&amp;M</strong>,{" "}
                  <strong>Warner Music Poland</strong>, <strong>Santander Bank Polska</strong>,{" "}
                  <strong>John Deere</strong>, <strong>IQOS</strong>, <strong>Amica</strong>,{" "}
                  <strong>Grupa Forte S.A.</strong>, <strong>Centrum Posnania</strong> i{" "}
                  <strong>Woohoo</strong>. Otrzymałem wyróżnienie
                  w ogólnopolskim konkursie <strong>Portret 2022</strong>.
                </p>
              </div>

              {/* Stats bar */}
              <div className="mt-8 pt-6 border-t border-border dark:border-dark-border">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { end: 250000, suffix: "+", label: "wykonanych zdjęć" },
                    { end: 1000, suffix: "+", label: "zrealizowanych sesji i eventów" },
                    { end: 100, suffix: "+", label: "obsłużonych marek i firm" },
                    { end: 8, suffix: "+", label: "lat doświadczenia" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-barlow font-extrabold text-2xl md:text-3xl text-blue dark:text-blue-light leading-none mb-1">
                        <CountUp end={stat.end} suffix={stat.suffix} duration={stat.end > 10000 ? 2500 : 2000} />
                      </p>
                      <p className="text-[11px] text-steel dark:text-dark-text-muted leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
