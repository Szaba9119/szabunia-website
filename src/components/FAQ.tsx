"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

const faqs = [
  {
    q: "Ile kosztuje sesja?",
    a: "Sesje portretowe zaczynają się od 1 000 zł netto. Konkretną wycenę przygotuję po krótkim briefie. Wycena zależy od liczby osób, lokalizacji i zakresu postprodukcji. Zawsze wyceniam indywidualnie, żeby nie przepłacać za to, czego nie potrzebujesz.",
  },
  {
    q: "Jak szybko otrzymam gotowe materiały?",
    a: "Standardowy czas oddania zdjęć to 14 dni roboczych, a materiałów wideo do 21 dni. Oferuję również usługę ekspresową (24-48h) za dodatkową opłatą (+50% wartości zlecenia).",
  },
  {
    q: "Jak wygląda sesja zdjęciowa krok po kroku?",
    a: "Zaczynamy od krótkiego briefu (telefon lub mail), w którym ustalamy cel, styl i logistykę. Przed sesją przygotowuję poseboard z przykładowymi kadrami. W dniu sesji prowadzę Cię przez pozowanie i dobór ujęć. Po sesji wybierasz zdjęcia z galerii online, a ja zajmuję się retuszem. Gotowe materiały dostajesz w ciągu 14 dni.",
  },
  {
    q: "Czy mogę zobaczyć zdjęcia przed retuszem?",
    a: "Tak. Po sesji udostępniam album ze wszystkimi wykonanymi ujęciami (jako galeria online). Z tego albumu wybierasz zdjęcia, które mają trafić do retuszu i postprodukcji. Dzięki temu masz pełną kontrolę nad tym, które ujęcia trafią do finalnej edycji.",
  },
  {
    q: "Czy dojeżdżasz poza Poznań?",
    a: "Tak, realizuję zlecenia na terenie całej Polski oraz Europy. Dojazd w Poznaniu: 0 zł. Poza Poznaniem: 2,50 zł netto za kilometr, liczony od granicy miasta w obie strony według Google Maps. Przy dłuższych wyjazdach (powyżej jednego dnia pracy) doliczany jest również nocleg.",
  },
  {
    q: "Czy przekazujesz surowe pliki RAW?",
    a: "Standardowo nie przekazuję surowych plików RAW. Otrzymujesz starannie wyselekcjonowane i poddane autorskiej postprodukcji materiały, które stanowią gotowy, spójny produkt. Przekazanie plików RAW jest możliwe tylko przy specjalnych ustaleniach licencyjnych.",
  },
  {
    q: "Czy mogę użyć zdjęć na LinkedIn / stronie / w reklamie?",
    a: "Tak. Wszystkie licencje obejmują użytek komercyjny: strona www, social media, materiały drukowane, reklama online. Bez limitów czasowych.",
  },
  {
    q: "Ile osób mogę sfotografować w jeden dzień?",
    a: "Przy portretach biznesowych fotografuję do 40 osób dziennie (przy setupie studyjnym na miejscu). Każda osoba potrzebuje ok. 10-15 minut. Mogę przyjechać do biura z mobilnym studio.",
  },
  {
    q: "Co jeśli nie jestem fotogeniczny/a?",
    a: "Słyszę to bardzo często i za każdym razem efekt pozytywnie zaskakuje. Prowadzę Cię przez całą sesję: pomagam z pozowaniem, ustawiam światło pod Twoją twarz, dbam o naturalny wyraz. W studiu zawsze ustawiam lustro przed modelem, żebyś mógł na bieżąco widzieć siebie i poprawiać drobne detale. Nie musisz być modelem, wystarczy być sobą. Reszta to moja robota.",
  },
  {
    q: "Czy wystawiam fakturę VAT?",
    a: "Tak, jestem czynnym płatnikiem VAT. Płatność realizowana przez platformę Useme (faktura VAT). Termin płatności: 7 dni.",
  },
  {
    q: "Ile tur poprawek otrzymuję w cenie?",
    a: "Zdjęcia: 2 tury poprawek w cenie. Wideo: 3 tury poprawek montażowych w cenie. Każda dodatkowa godzina pracy nad zmianami: 200 zł netto. W praktyce pierwsza tura prawie zawsze wystarcza, bo zależy mi, żeby finalny materiał w 100% odpowiadał Twoim oczekiwaniom.",
  },
  {
    q: "Jakiego sprzętu używasz do zdjęć i wideo?",
    a: "Pracuję na dwóch aparatach Canon R6. Obiektywy: Sigma 20mm f/1.4, Sigma 35mm f/1.4, Sigma 50mm f/1.4, Sigma 70-200mm f/2.8, Tamron 24-70mm f/2.8, Tokina 16-28mm. Oświetlenie studyjne Godox wraz z różnymi modyfikatorami. Dron DJI Mini 5 Pro. Rejestracja dźwięku: Zoom Recorder, Rode Wireless PRO oraz Rode VideoMicro II.",
  },
  {
    q: "Czy pracujesz z AI w zdjęciach i wideo?",
    a: "Tak. Jeżeli projekt tego wymaga, wspieram się narzędziami AI: generowanie grafik, fotomanipulacje, edycje zdjęć, kreatywna postprodukcja wideo. AI traktuję jako rozszerzenie warsztatu, nie zastępstwo dla autorskiego podejścia. Zawsze informuję klienta, w którym miejscu procesu AI zostało użyte.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Najczęstsze pytania
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            Zanim napiszesz, sprawdź, czy odpowiedź już tu jest.
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <AnimatedSection key={faq.q} delay={i * 0.04}>
                <div
                  className={`bg-white dark:bg-dark-card rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-blue dark:border-blue-light shadow-sm shadow-blue/5"
                      : "border-border dark:border-dark-border hover:border-blue/50 dark:hover:border-blue-light/30"
                  }`}
                >
                  <h3 className="m-0">
                    <button
                      id={`faq-question-${i}`}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      className="w-full px-5 py-4 flex items-center justify-between text-left group"
                    >
                      <span
                        className={`font-barlow font-bold text-sm pr-4 transition-colors duration-200 ${
                          isOpen
                            ? "text-blue dark:text-blue-light"
                            : "text-navy dark:text-white group-hover:text-blue dark:group-hover:text-blue-light"
                        }`}
                      >
                        {faq.q}
                      </span>
                      <svg
                        className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 text-blue dark:text-blue-light"
                            : "text-steel dark:text-dark-text-muted"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-[13px] text-steel dark:text-dark-text-muted leading-relaxed border-t border-border/50 dark:border-dark-border pt-3">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
