import Link from "next/link";
import Image from "next/image";
import { galleryAlt } from "@/data/galleryAlts";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import { serviceItems } from "@/data/services";

export default function Services() {
  return (
    <section id="uslugi" className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Czym mogę pomóc Twojej firmie
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            {/* Przepisane 10.08.2026. Poprzednio: „Zdjęcia, film i dron dla firm,
                od jednej osoby". Dron stał jako trzeci RÓWNORZĘDNY element oferty,
                co było prawdą przy ośmiu usługach, a dziś jest fragmentem jednej
                z czterech (Nieruchomości i przemysł) i nie występuje w Wizerunku
                ani w Produktowej.
                „Od jednej osoby" zostaje świadomie: audyt 10.08.2026 potwierdził,
                że nigdzie nie obiecuje jednoosobowej realizacji, tylko jednego
                wykonawcę odpowiedzialnego za całość. FAQ na podstronie Wydarzeń
                wprost mówi o drugim operatorze przy dużym wydarzeniu. */}
            Zdjęcia i film dla firm w czterech obszarach, od jednej osoby.
          </p>
        </AnimatedSection>

        {/* Usługi — siatka 2×2 (10.08.2026, po przejściu na cztery usługi).
            Wcześniej: sześć kolumn, sześć wąskich kafelków i dwa szerokie
            domykające rząd — konstrukcja istniała wyłącznie po to, żeby przy
            ośmiu usługach nie zostawała „sierota" w ostatnim rzędzie. Przy
            czterech usługach dzieli się równo, więc `wide` i plakietka
            „Bestseller" (dotyczyła usuniętych pakietów) są zbędne.
            Obrazy na mobile w 16:9 zamiast 4:3 — sekcja zajmowała ~6,4 ekranu. */}
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {serviceItems.map((s) => {
              // Wariant C (chowanie zdjęć części usług na mobile) WYCOFANY decyzją
              // Marcina po obejrzeniu (2026-07-06): zdjęcia zawsze widoczne — to
              // wizytówka fotografa. Nie przywracać bez jego wyraźnej prośby.
              return (
                <div
                  key={s.title}
                  className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border hover:border-blue dark:hover:border-blue transition-all hover:-translate-y-0.5 group overflow-hidden"
                >
                  {/* Kafel usługi to jedyne miejsce, gdzie klient deklaruje,
                      czego chce, ZANIM dojdzie do formularza. Bez `data-cta`
                      delegat go nie łapie i nie wiadomo, czy porzucenie następuje
                      na wyborze usługi, czy na formularzu (PELNY2608-13). */}
                  <Link
                    href={`/uslugi/${s.slug}`}
                    data-cta={`uslugi_karta_${s.slug}`}
                    className="block"
                  >
                    {s.image && (
                      <div className="relative overflow-hidden bg-border dark:bg-dark-border aspect-video sm:aspect-[3/2]">
                        <Image
                          src={s.image}
                          /* ZDJ2608-11: opis obejrzanego kadru zamiast szablonu z nazwy usługi. */
                          alt={galleryAlt(s.image, `${s.title}, przykładowa realizacja`)}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          style={{ objectPosition: s.imagePos }}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true">
                          {s.icon}
                        </div>
                        <h3 className="font-barlow font-bold text-base text-navy dark:text-white">
                          {s.title}
                        </h3>
                      </div>
                      <p className="text-steel dark:text-dark-text-muted text-[13px] leading-relaxed mb-3">
                        {s.desc}
                      </p>
                      <p className="text-blue dark:text-blue-light text-[12px] font-barlow font-semibold">
                        {s.priceLabel}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          {/* DOPRECYZOWANIE KWOT, 10.08.2026 (decyzja Marcina, przegląd strony głównej).
              Problem, który to zdanie zamyka: kafelek eventów mówi „Zdjęcia, film
              i dron z jednego dnia", a pod spodem stoi „od 600 zł netto". Czytane
              razem sugerowało cały dzień z fotografem, filmem i dronem za 600 zł.

              Świadomie JEDNA linijka pod całą siatką, a nie dopisek przy każdej
              z czterech cen: dotyczy wszystkich usług tak samo, a cztery powtórzenia
              zrobiłyby z tego szum.

              Słowo „startowe" jest tu nośnikiem informacji, nie ozdobą. Zdanie
              o indywidualnej wycenie stoi już niżej, przy CTA, ale mówi tylko
              JAK wyceniam, a nie CZYM jest kwota na kafelku.

              To zdanie przejęło też rolę słowa „pakiety", które do dziś stało
              przy cenie nieruchomości (`services.tsx`, `heroPriceLabel`). */}
          <p className="mt-6 text-center text-[13px] text-steel dark:text-dark-text-muted">
            Kwoty startowe. Zakres i cena ustalane indywidualnie.
          </p>
        </AnimatedSection>

        {/* Linijka o modelu wyceny „na zapytanie" + CTA do formularza
            (2026-07-23, prośba Marcina). Wyjątek od „bez bocznych wyjść": to CTA
            konwersyjne do #kontakt (ten sam cel co hero), nie link informacyjny.
            Głos strony, bez żargonu „brief". */}
        <AnimatedSection>
          <div className="mt-12 text-center">
            <p className="text-steel dark:text-dark-text-muted text-[15px] max-w-xl mx-auto">
              Każdy projekt wyceniam indywidualnie. Napisz w kilku zdaniach, co
              planujesz, a wrócę do Ciebie ze wstępną wyceną{" "}
              <span className="text-navy dark:text-white font-semibold">w ciągu 24h</span>.
            </p>
            <a
              href="#kontakt"
              data-cta="wycena_home_uslugi"
              className="mt-6 inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]"
            >
              Zapytaj o ofertę
              <span className="text-white/80">→</span>
            </a>
          </div>
        </AnimatedSection>

        {/* Link „Zobacz wszystkie usługi" usunięty (decyzja Marcina, 2026-07-07:
            lejek bez bocznych wyjść — kafle i tak prowadzą do podstron usług).
            Link SEO z home do huba /uslugi przeniesiony do stopki (Footer.tsx). */}
      </div>
    </section>
  );
}
