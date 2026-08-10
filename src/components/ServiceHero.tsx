import Image from "next/image";
import { galleryAlt } from "@/data/galleryAlts";
import AnimatedSection from "./AnimatedSection";
import type { ServiceData } from "@/data/services";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import TrustLine from "./TrustLine";

interface Props {
  service: ServiceData;
  /** Ta sama tablica, z której strona buduje JSON-LD (audyt PELNY2907-10). */
  crumbs: Crumb[];
}

export default function ServiceHero({ service, crumbs }: Props) {
  // `price` w services.tsx niesie już słowo „netto" („od 600 zł netto").
  // Historycznie `heroPriceLabel` go nie niósł („pakiety od 1 100 zł") — dziś
  // wszystkie trzy etykiety mają „netto", ale zabezpieczenie zostaje, bo nowa
  // etykieta bez tego słowa wróciłaby do starego błędu. Doklejanie „ netto" w JSX
  // dawało na sześciu z siedmiu opublikowanych podstron „od 600 zł netto netto"
  // (na produkcji od 2026-07-23). Doklejamy tylko wtedy, gdy słowa jeszcze nie ma.
  const rawPrice = service.heroPriceLabel ?? service.price;
  const priceLabel = rawPrice.includes("netto") ? rawPrice : `${rawPrice} netto`;

  return (
    // Pionowe marginesy ścięte 10.08.2026 (brief hero, punkt 1 i 10): było
    // md:pt-36 / md:pb-20, czyli 144 i 80 px, przy nagłówku, który zaczynał się
    // dopiero pod okruszkami. Sekcja zaczyna się teraz wyżej i kończy bliżej
    // następnej, a rytm wewnątrz kolumny robi spacing między blokami, nie
    // padding sekcji.
    <section className="pt-28 pb-10 md:pt-32 md:pb-14 px-4">
      {/* max-w-6xl (nie standardowe max-w-5xl podstron usług): hero na pełną
          szerokość, symetryczny split 50/50 (brief-23 zad. 2). */}
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Breadcrumbs items={crumbs} className="mb-6 md:mb-7" />
        </AnimatedSection>

        {/* Kolejność (prośba Marcina, 2026-07-23): tytuł → cena → krótki opis
            → ZDJĘCIE → długi opis → chipy → CTA na końcu. DOM = kolejność na
            mobile; desktop: zdjęcie w prawej kolumnie przez oba rzędy (split
            50/50 z brief-23 zostaje), tekst w lewej rozbity na dwa rzędy.
            Rzędy [auto_1fr] (NIE auto_auto!): kwadratowe zdjęcie jest wyższe
            niż tekst, więc przy auto_auto nadmiar wysokości rozkładał się po
            równo i wpychał ~112 px pustki MIĘDZY bloki tekstu. 1fr w drugim
            rzędzie pochłania nadmiar na dole, luka = tylko gap-y-8 (32 px).
            Fix 2026-07-23 (Marcin: „na komputerze dużo wolnego miejsca"). */}
        {/* `md:items-stretch` zamiast `items-start` (brief hero, punkt 9):
            zdjęcie ma dostać wysokość CAŁEJ kolumny tekstowej, a nie własną
            z proporcji kwadratu. To ono zamykało wcześniej hero pustką: kolumna
            tekstu kończyła się wyżej albo niżej niż kadr i zostawał martwy pas.
            Kolumny 1.05/0.95 zamiast 50/50 — lewa dostaje tyle, żeby H1 łamał
            się na trzy linie, a nie na cztery. */}
        <div className="grid md:grid-cols-[1.05fr_0.95fr] md:grid-rows-[auto_1fr] gap-6 md:gap-x-12 lg:gap-x-16 md:gap-y-7 md:items-stretch">
          {/* 1. Kicker + H1 + lead */}
          {/* text-center na mobile = parytet ze stroną główną i hubami
              (Hero.tsx:35). Wcześniej przycisk „Zapytaj o ofertę" siedział przy
              lewej krawędzi z 202 px pustki obok (pomiar @375 px, 2026-07-30). */}
          <AnimatedSection className="md:col-start-1 md:row-start-1 text-center md:text-left">
            {/* Kicker: ten sam zabieg typograficzny co H1 na stronie głównej
                (wersaliki, tracking 0.16em, 11-12 px, kolor steel). Renderuje
                się tylko tam, gdzie usługa ma `heroLabel`. Wersalik robi CSS,
                a nie dane, więc czytnik ekranu dostaje normalny zapis. */}
            {/* Bez ikony (ósma tura, punkt 1). Kicker na stronie głównej też jej
                nie ma: to sam tekst wersalikami. Ikona robiła z etykiety trzeci
                element graficzny w pierwszych 200 px sekcji. */}
            {service.heroLabel && (
              <p className="mb-3 md:mb-4 font-barlow font-semibold text-[11px] md:text-xs tracking-[0.16em] uppercase text-steel dark:text-dark-text-muted">
                {service.heroLabel}
              </p>
            )}
            {/* H1 mocniejszy niż był (44 px stałe → 46-52 px na desktopie),
                ale z ciaśniejszą interlinią, więc trzy linie zajmują mniej
                miejsca w pionie niż wcześniej dwie i pół. `text-balance`
                wyrównuje długości linii, żeby ostatnia nie zostawała sama. */}
            <h1 className="font-barlow font-black text-[clamp(30px,8vw,34px)] md:text-[clamp(38px,3.9vw,52px)] leading-[1.04] tracking-[-1px] md:tracking-[-1.6px] text-navy dark:text-white text-balance">
              {service.h1 ?? service.title}
            </h1>
            {/* Lead renderuje się tylko tam, gdzie usługa go nie wyłączyła.
                Eventy mają `heroHideSubtitle`, bo tamten akapit powtarzał to,
                co stoi niżej w „Dla jakich wydarzeń" i w „Zakresie" (ósma tura,
                punkt 3). Trzy pozostałe usługi mają lead jak dotąd. */}
            {!service.heroHideSubtitle && (
              <p className="mt-4 md:mt-5 text-steel dark:text-dark-text-muted text-[15px] md:text-base leading-relaxed md:max-w-[46ch]">
                {service.subtitle}
              </p>
            )}
            {/* JEDEN akapit opisowy, przeniesiony tu z dolnego bloku (ósma tura,
                punkt 10): hierarchia ma iść kicker → H1 → opis → zdjęcie, a na
                telefonie to właśnie kolejność DOM. Dolny blok trzyma już tylko
                dowód społeczny i wywołanie do działania. */}
            <p className="mt-4 md:mt-5 text-text-body dark:text-dark-text text-[15px] leading-relaxed md:max-w-[52ch]">
              {service.description}
            </p>
          </AnimatedSection>

          {/* 2. Zdjęcie usługi (mobile: zaraz po krótkim opisie; desktop: prawa
              kolumna przez oba rzędy) — priority, LCP element strony.

              ⛔ TU NIE WOLNO UŻYĆ `AnimatedSection`. Zmierzone Lighthouse 12 na
              produkcji 10.08.2026, `/uslugi/eventy-reportaze` na telefonie:
              LCP 6,4 s, z czego **Render Delay 5,07 s, czyli 79%**. Sam obraz
              pobierał się w 374 ms — problem nie był w zdjęciu, tylko w tym,
              że element LCP startował z `opacity: 0`.

              `AnimatedSection` nadaje klasę `.reveal` (`globals.css`), a ta ustawia
              `opacity: 0` i czeka na hydratację, `IntersectionObserver`, 0,15 s
              `transitionDelay` i 0,5 s przejścia. Na dławionym CPU telefonu składa
              się to na te pięć sekund.

              Zamiast tego `.hero-intro`: animacja WYŁĄCZNIE na `transform`, czysty
              CSS, bez opacity i bez obserwatora. Dokładnie ten sam wzorzec, którego
              używa hero strony głównej (`Hero.tsx:67`) i który jest opisany
              w `globals.css` przy definicji `@keyframes heroIntro`. Dowód, że
              działa: Render Delay na stronie głównej wynosił 663 ms wobec 5072 ms tutaj.

              Wjazd wizualny zostaje, znika tylko wygaszanie. `prefers-reduced-motion`
              nadal wyłącza ruch globalną regułą z `globals.css`. */}
          <div className="hero-intro md:col-start-2 md:row-start-1 md:row-span-2 md:h-full">
            {/* Kwadrat tylko na telefonie. Na desktopie kadr bierze pełną
                wysokość kolumny tekstowej (`md:h-full` na komórce siatki, która
                jest rozciągnięta przez `items-stretch`), więc dolne krawędzie
                obu kolumn kończą się równo. `min-h` to zabezpieczenie dla usług
                z krótszym tekstem, żeby zdjęcie nie zapadło się do paska. */}
            <div className="relative aspect-square md:aspect-auto md:h-full md:min-h-[520px] rounded-3xl overflow-hidden bg-border dark:bg-dark-card">
              <Image
                src={service.heroImage}
                /* ZDJ2608-11 (04.08.2026): opis z obejrzanego kadru zamiast szablonu
                   `${service.title}, Poznań`, który opisywał usługę, a nie zdjęcie,
                   i doklejał miasto przecinkiem wbrew docs/zasady-tekstow.md.
                   Bez wpisu w mapie zostaje stary szablon, żeby nic nie zniknęło. */
                alt={galleryAlt(service.heroImage, `${service.title}, Poznań`)}
                fill
                className="object-cover"
                style={{ objectPosition: service.heroImagePos ?? "center" }}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 45vw"
                quality={72}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0YxRjVGOSIvPjwvc3ZnPg=="
              />
            </div>
          </div>

          {/* 3. Dowód społeczny + cena + CTA (mobile: pod zdjęciem; desktop:
              lewa kolumna, dolny rząd). Opis przeniesiony wyżej, do bloku 1,
              a trzy korzyści usunięte bez zastępnika (ósma tura, punkt 5). */}
          <AnimatedSection className="md:col-start-1 md:row-start-2 text-center md:text-left">
            {/* DOKŁADNIE ten sam element co w hero strony głównej, ten sam plik.
                Marcin: „nie twórz nowego komponentu wizualnego tylko dla
                podstrony". Typografia, ikony i odstępy wewnętrzne przychodzą
                z `TrustLine.tsx`, tutaj ustawiamy wyłącznie margines górny. */}
            <TrustLine />
            {/* BLOK CENA → KONTAKT (brief hero, punkty 7 i 8).
                Zastąpił trzy osobne kapsułki („Wstępna wycena w 24h",
                „Faktura VAT", numer w ramce) plus stojący pod nimi przycisk.
                Cztery elementy o czterech różnych wagach czytały się jak zbiór
                niezależnych odznak; teraz to jedna sekwencja: ile to kosztuje →
                co zrobić → na jakich warunkach.

                Układ jeden do jednego z hero strony głównej (Hero.tsx): przycisk
                i telefon w jednym rzędzie, mikrocopy zwykłym zdaniem pod spodem,
                bez ramek. Dzięki temu obie sekcje kończą się tym samym gestem.

                ⚠ `data-cta` na obu linkach zostaje bez zmian
                (`wycena_hero`, `tel_service_hero`) — po tych atrybutach chodzi
                pomiar konwersji, podmiana nazwy zrywa ciągłość danych. */}
            {/* Kotwica cenowa, mały element typograficzny, nie badge (brief-22 §3).
                ZESZŁA Z 17-18 px BOLD NA 15 px SEMIBOLD (ósma tura, punkt 8):
                w poprzedniej turze podniosłem ją tak, że razem z własnym
                marginesem tworzyła osobne piętro między opisem a przyciskiem.
                Teraz jest pierwszą linijką bloku CTA i przykleja się do przycisku
                (12 px), a nie do tekstu wyżej.
                Kwota i jej zapis bez zmian, z `heroPriceLabel ?? price`. */}
            <div className="mt-6 md:mt-7">
              <p className="font-barlow font-semibold text-[15px] text-navy dark:text-white">
                {priceLabel}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3 justify-center md:justify-start">
                <a
                  href="#kontakt"
                  data-cta="wycena_hero"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue text-white px-6 py-3.5 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]"
                >
                  Zapytaj o ofertę
                  <span className="text-white/80" aria-hidden="true">→</span>
                </a>
                {/* min-h-11 (44 px): telefon jest drugą ścieżką kontaktu i ma
                    mieć własny cel dotykowy, tak samo jak na stronie głównej. */}
                <a
                  href="tel:+48514900688"
                  data-cta="tel_service_hero"
                  className="inline-flex items-center gap-2 min-h-11 font-barlow font-semibold text-[15px] text-navy dark:text-white hover:text-blue dark:hover:text-blue-light transition-colors"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  514 900 688
                </a>
              </div>
              <p className="mt-3.5 text-[13px] text-steel dark:text-dark-text-muted">
                Wstępną wycenę otrzymasz w 24h. Faktura VAT.
              </p>
            </div>
          </AnimatedSection>

        </div>
        {/* Sekcja „Dla kogo?" była tu wyłączona z renderu od brief-23 zad. 2,
            a jej dane (`forWhom`) usunięte 10.08.2026 razem z migracją na cztery
            usługi. Rolę tej sekcji przejął komponent ServiceApplications
            („Co fotografuję" / „Dla jakich wydarzeń"), renderowany na podstronie
            usługi zaraz pod paskiem logotypów. Nie przywracać starego bloku. */}
      </div>
    </section>
  );
}
