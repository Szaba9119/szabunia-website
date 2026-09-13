import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

const steps = [
  {
    num: 1,
    title: "Rozmowa",
    desc: "Krótka rozmowa o celu, terminie i budżecie. Wstępną wycenę dostajesz w ciągu 24h.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    num: 2,
    // Krok 2 był pisany pod portrety („Prowadzę Cię przez pozowanie") i czytał się
    // absurdalnie w galerii wnętrz, hal, obiektów i drona — nikt nie pozuje hali.
    // Ten komponent renderuje się na stronie głównej i na /galeria, czyli w miejscach
    // opisujących CAŁĄ ofertę, więc opis musi być prawdziwy dla ośmiu usług naraz.
    // Portretowa obietnica „nie musisz nic umieć" żyje tam, gdzie jest prawdziwa:
    // `services.tsx`, proces usługi `wizerunek-portrety`. (Marcin, 05.08.2026)
    title: "Realizacja",
    desc: "Przyjeżdżam na miejsce albo umawiamy studio. Światło, sprzęt i logistykę zdjęciową biorę na siebie.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Selekcja",
    desc: "W 48h dostajesz galerię online. Sam zaznaczasz ujęcia do retuszu, masz pełną kontrolę.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: 4,
    title: "Dostawa",
    desc: "Wyretuszowane materiały w 14 dni (wideo 21). Ekspres do 48h dostępny.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

// Warunki współpracy wydzielone do osobnego komponentu Warunki.tsx
// (2026-07-06, decyzja Marcina) — na home renderowane po FAQ, na /galeria po cenniku.
export default function Process() {
  return (
    <section className="py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Jak wygląda współpraca
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-10 max-w-md mx-auto">
            4 kroki od pierwszego kontaktu do gotowych materiałów.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <ol aria-label="Etapy współpracy" className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <li key={step.num} className="flex md:flex-col gap-4 md:items-center md:text-center">
                <span className="shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-full bg-blue text-white flex items-center justify-center font-barlow font-bold text-lg">{step.num}</span>
                <div className="flex-1 w-full border-t border-border dark:border-dark-border pt-4">
                  <h3 className="font-barlow font-bold text-base text-navy dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-steel dark:text-dark-text-muted leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </AnimatedSection>
      </div>
    </section>
  );
}
