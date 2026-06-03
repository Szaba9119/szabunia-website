"use client";

import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

type GearItem = { label: string; desc?: string };
type GearGroup = { category: string; brand: string; items: GearItem[]; note?: string };

const gear: GearGroup[] = [
  {
    category: "Aparaty",
    brand: "Canon",
    items: [
      { label: "2× Canon R6", desc: "Pełna redundancja zapisu (dual SD) na każdym zleceniu." },
    ],
  },
  {
    category: "Obiektywy",
    brand: "Sigma · Tamron · Tokina",
    items: [
      {
        label: "Sigma 20 / 35 / 50 mm f/1.4 Art",
        desc: "Portrety i eventy przy słabym świetle, bez flesza — oddają klimat miejsca.",
      },
      {
        label: "Sigma 70-200 mm f/2.8 Sport",
        desc: "Portrety studyjne i eventy plenerowe.",
      },
      {
        label: "Tamron 24-70 mm f/2.8",
        desc: "Uniwersalny do większości zadań — także jako backup.",
      },
      { label: "Tokina 16-28 mm f/2.8", desc: "Wnętrza i nieruchomości." },
    ],
    note: "Pokrycie 16-200 mm — bez dziur w ogniskowych.",
  },
  {
    category: "Oświetlenie",
    brand: "Godox",
    items: [
      { label: "Mobilny system flash Godox", desc: "Z kompletem modyfikatorów." },
      { label: "Studyjne światło ciągłe LED", desc: "2× Godox LA200D." },
    ],
    note: "Dwa niezależne systemy — flash i LED mogą działać równolegle.",
  },
  {
    category: "Dźwięk",
    brand: "Rode · Zoom",
    items: [
      { label: "Rode Wireless PRO" },
      { label: "Rode VideoMicro II" },
      { label: "Zoom Recorder" },
    ],
  },
];

export default function Equipment() {
  return (
    <section className="py-12 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-[11px] uppercase tracking-widest text-steel-light dark:text-dark-text-muted mb-3 font-barlow font-semibold text-center">
            Warsztat
          </p>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Sprzęt, na którym pracuję
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            Dwa korpusy Canon R6 z pełną redundancją zapisu, komplet obiektywów Sigma, Tamron i Tokina (16-200 mm), dwa niezależne systemy oświetlenia Godox — flash i LED — oraz dron i profesjonalna rejestracja dźwięku. Świadomy wybór narzędzi, które dają powtarzalność na planie i spójną jakość między kadrami — niezależnie od tego, czy sesja trwa godzinę, czy cały dzień.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {gear.map((g, i) => (
            <AnimatedSection key={g.category} delay={i * 0.08}>
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 h-full">
                <div className="flex items-baseline justify-between gap-3 mb-4">
                  <span className="font-barlow font-extrabold text-lg text-navy dark:text-white">
                    {g.category}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-blue dark:text-blue-light font-barlow font-semibold text-right">
                    {g.brand}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {g.items.map((item) => (
                    <li key={item.label} className="flex gap-2">
                      <span className="text-blue dark:text-blue-light mt-[2px] shrink-0">•</span>
                      <span>
                        <span className="block text-[14px] text-navy dark:text-dark-text leading-relaxed">
                          {item.label}
                        </span>
                        {item.desc && (
                          <span className="block text-[12px] text-steel dark:text-dark-text-muted leading-relaxed mt-0.5">
                            {item.desc}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                {g.note && (
                  <p className="text-[12px] text-steel dark:text-dark-text-muted mt-4 pt-4 border-t border-border dark:border-dark-border">
                    {g.note}
                  </p>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.32}>
          <div className="mt-4 max-w-4xl mx-auto bg-blue-pale dark:bg-dark-card rounded-2xl border border-blue/30 dark:border-blue-light/30 p-6">
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <span className="font-barlow font-extrabold text-lg text-navy dark:text-white">
                Dron
              </span>
              <span className="text-[11px] uppercase tracking-wider text-blue dark:text-blue-light font-barlow font-semibold text-right">
                DJI Mini 5 Pro
              </span>
            </div>
            <p className="text-[14px] text-navy dark:text-dark-text leading-relaxed">
              Zdjęcia i wideo z drona — eventy, architektura oraz tereny i obiekty firmowe. Certyfikat A1/A3. Pełna oferta foto, wideo i dron w jednym zespole.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
