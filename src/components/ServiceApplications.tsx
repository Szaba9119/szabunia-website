import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import type { ServiceData } from "@/data/services";

interface Props {
  data: NonNullable<ServiceData["applications"]>;
}

// Sekcja „Dla jakich wydarzeń" plus „Gdzie materiał pracuje dalej"
// (pakiet 4, 10.08.2026). Stoi WYSOKO na podstronie, zaraz pod logotypami
// i PRZED portfolio, bo pełni funkcję kwalifikacji, nie opisu: czytelnik
// odhacza „moje wydarzenie jest na tej liście" w kilkanaście sekund i dopiero
// wtedy schodzi do zdjęć.
//
// Druga lista odpowiada na pytanie, którego pierwsza nie obsługuje:
// „po co mi właściwie te zdjęcia po wydarzeniu". To ona przenosi rozmowę
// z kosztu na zwrot z materiału.
//
// ⚠ Obie listy mają zostać KRÓTKIE (Marcin, 10.08.2026: „nie rozbudowujmy
// jej w kolejny blok SEO"). Same hasła, bez zdań rozwijających.
export default function ServiceApplications({ data }: Props) {
  if (data.items.length === 0) return null;

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[40px] leading-tight tracking-tight text-navy dark:text-white mb-8 text-center">
              {data.heading}
            </h2>
          </Parallax>
        </AnimatedSection>

        <AnimatedSection>
          <ul className="flex flex-wrap justify-center gap-2.5 mb-14">
            {data.items.map((item) => (
              <li
                key={item}
                className="px-4 py-2 rounded-full border border-border dark:border-dark-border bg-white dark:bg-dark-card text-[14px] text-text-body dark:text-dark-text"
              >
                {item}
              </li>
            ))}
          </ul>
        </AnimatedSection>

        {data.uses.length > 0 && (
          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <h3 className="font-barlow font-bold text-lg md:text-xl text-navy dark:text-white mb-5 text-center">
                {data.usesHeading}
              </h3>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {data.uses.map((use) => (
                  <li
                    key={use}
                    className="flex items-start gap-2.5 text-[15px] text-steel dark:text-dark-text-muted"
                  >
                    <svg
                      className="w-4 h-4 mt-1 flex-shrink-0 text-blue dark:text-blue-light"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
