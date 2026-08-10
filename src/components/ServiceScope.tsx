import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import type { ServiceData } from "@/data/services";

interface Props {
  data: NonNullable<ServiceData["scope"]>;
}

// Sekcja „Zakres realizacji" (pakiet 4, 10.08.2026). Stoi POD portfolio,
// świadomie. To lektura dla kogoś, kto zobaczył już zdjęcia i uznał, że jestem
// kandydatem, a teraz układa, co dokładnie zamawia. Nikt nie czyta specyfikacji
// przed obejrzeniem pracy fotografa.
//
// Format: nazwa bloku plus JEDNO zdanie konkretu. Bez list wypunktowanych
// wewnątrz bloków, bo wtedy sekcja rozrasta się w drugi cennik.
export default function ServiceScope({ data }: Props) {
  if (data.items.length === 0) return null;

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[40px] leading-tight tracking-tight text-navy dark:text-white mb-10 text-center">
              {data.heading ?? "Zakres realizacji"}
            </h2>
          </Parallax>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-4">
            {data.items.map((item, i) => (
              <div
                key={item.title}
                className={`bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 ${
                  // Nieparzysta liczba bloków zostawiłaby sierotę w ostatnim
                  // rzędzie siatki dwukolumnowej. Ostatni element rozciąga się
                  // wtedy na oba pola i rząd jest pełny.
                  data.items.length % 2 === 1 && i === data.items.length - 1
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <h3 className="font-barlow font-bold text-base text-navy dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-steel dark:text-dark-text-muted text-[14px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
