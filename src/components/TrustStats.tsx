import AnimatedSection from "./AnimatedSection";

// Pasek zaufania — twarde liczby budujące wiarygodność przy pierwszym zetknięciu.
// Czysty CSS, bez obrazków, więc nie obciąża LCP. Liczby zaokrąglone (8 lat pracy
// dla firm, ~100 marek, 6 lat ~150-250 sesji/rok → ostrożnie ponad 1000 realizacji).
const STATS = [
  { value: "8 lat", label: "doświadczenia w foto i wideo dla firm" },
  { value: "100+", label: "obsłużonych marek i firm" },
  { value: "1000+", label: "zrealizowanych sesji i eventów" },
  { value: "24h", label: "odpowiedź na zapytanie" },
];

export default function TrustStats() {
  return (
    <section className="py-10 md:py-12 px-4" aria-label="Statystyki i doświadczenie">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border dark:bg-dark-border rounded-2xl overflow-hidden border border-border dark:border-dark-border">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white dark:bg-dark-card px-5 py-6 text-center">
                <div className="font-barlow font-extrabold text-3xl md:text-[40px] leading-none tracking-tight text-blue dark:text-blue-light mb-2">
                  {s.value}
                </div>
                <div className="text-[12px] md:text-[13px] text-steel dark:text-dark-text-muted leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
