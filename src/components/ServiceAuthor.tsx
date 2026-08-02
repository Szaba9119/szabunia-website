import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import CountUp from "./CountUp";
import { TRUST_STATS } from "./TrustStats";

// Blok autorski na podstronach usług (analiza lejka 2026-08-02).
// Powód: 67% budżetu Google Ads ląduje na /uslugi/*, a te strony nie mają ani
// jednego zdania o tym, kto stoi za usługą. `About.tsx` renderuje się wyłącznie
// na stronie głównej, więc wchodzący z reklamy nie dostaje żadnego kontekstu.
// Świadomie BEZ nagłówka H1 i bez powtarzania hasła ze strony głównej: H1 na
// podstronie niesie frazę (pole `h1` w ServiceData, decyzja SEO z 30.07.2026),
// a duplikat hero z home zderzyłby dwa bloki nagłówkowe.
// Świadomie BEZ linku do „O mnie": lejek podstron nie ma bocznych wyjść
// (decyzja Marcina, 2026-07-06).
// Wszystkie fakty pochodzą z istniejącej sekcji About na stronie głównej,
// żadne twierdzenie nie jest nowe.
export default function ServiceAuthor() {
  return (
    <section className="py-10 md:py-12 px-4" aria-labelledby="kto-to-zrobi">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8">
              <div className="relative w-28 h-28 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden bg-border dark:bg-dark-bg">
                <Image
                  // Portret z hero strony głównej, nie marcin-o-mnie.jpg: w kadrze
                  // 112-160 px sylwetka z aparatem daje twarz wielkości znaczka,
                  // a headshot na jasnym tle czyta się od razu. Na podstronie usług
                  // hero ze zdjęciem Marcina i tak się nie renderuje, więc nie ma
                  // duplikatu w obrębie strony.
                  src="/images/marcin-hero-light-4.jpg"
                  alt="Marcin Szabunia, fotograf biznesowy i twórca wideo, Poznań"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 12%" }}
                  sizes="(max-width: 640px) 112px, 160px"
                  quality={78}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0YxRjVGOSIvPjwvc3ZnPg=="
                />
              </div>

              <div className="text-center sm:text-left">
                <h2
                  id="kto-to-zrobi"
                  className="font-barlow font-extrabold text-xl md:text-2xl leading-tight tracking-tight text-navy dark:text-white mb-3"
                >
                  Kto to zrobi
                </h2>
                <div className="space-y-3 text-steel dark:text-dark-text-muted text-[15px] leading-relaxed">
                  <p>
                    Cześć, jestem Marcin. Od 2018 roku fotografuję dla firm. Bazuję
                    w Poznaniu, pracuję w całej Polsce i Europie.
                  </p>
                  <p>
                    Zdjęcia, film i ujęcia z drona robię sam. Dostajesz jeden
                    termin, jedną fakturę i spójny materiał. Ukończyłem studia
                    z zarządzania, więc patrzę nie tylko na kadr, ale i na cel,
                    któremu zdjęcia mają służyć.
                  </p>
                </div>
              </div>
            </div>

            {/* Liczby z TRUST_STATS: wchłonięte tutaj zamiast osobnej sekcji
                TrustStats, żeby dodanie karty autorskiej nie wydłużyło strony
                (podstrona ma już ~9,6 ekranu na telefonie). Jedno źródło danych,
                import z TrustStats.tsx. */}
            <div className="mt-6 md:mt-8 pt-6 border-t border-border dark:border-dark-border">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                {TRUST_STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-barlow font-extrabold text-2xl md:text-[32px] leading-none tracking-tight text-blue dark:text-blue-light mb-1.5">
                      <CountUp end={s.end} suffix={s.suffix} duration={s.end > 10000 ? 2500 : 1800} />
                    </p>
                    <p className="text-[11px] md:text-[13px] text-steel dark:text-dark-text-muted leading-tight">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
