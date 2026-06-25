import AnimatedSection from "./AnimatedSection";
import CountUp from "./CountUp";

// Pasek zaufania — twarde liczby budujące wiarygodność (te same co w sekcji "O mnie",
// dla spójności). Animowane CountUp, czysty CSS, bez obrazków — nie obciąża LCP.
const STATS = [
  { end: 250000, suffix: "+", label: "wykonanych zdjęć" },
  { end: 1000, suffix: "+", label: "zrealizowanych sesji i eventów" },
  { end: 100, suffix: "+", label: "obsłużonych marek i firm" },
  { end: 8, suffix: "+", label: "lat doświadczenia" },
];

export default function TrustStats() {
  return (
    <section className="py-10 md:py-12 px-4" aria-label="Statystyki i doświadczenie">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card px-6 py-8 md:py-9">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-barlow font-extrabold text-3xl md:text-[40px] leading-none tracking-tight text-blue dark:text-blue-light mb-1.5">
                    <CountUp end={s.end} suffix={s.suffix} duration={s.end > 10000 ? 2500 : 1800} />
                  </p>
                  <p className="text-[12px] md:text-[13px] text-steel dark:text-dark-text-muted leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
