import Image from "next/image";
import { galleryAlt } from "@/data/galleryAlts";
import AnimatedSection from "./AnimatedSection";
import type { ServiceData } from "@/data/services";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

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
            {service.heroLabel && (
              <p className="inline-flex items-center gap-2 mb-3 md:mb-4 font-barlow font-semibold text-[11px] md:text-xs tracking-[0.16em] uppercase text-steel dark:text-dark-text-muted">
                <svg className="w-4 h-4 flex-shrink-0 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
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
            {/* Lead: wyraźny podtytuł H1, ale trzymany w ryzach szerokością
                (46ch), żeby nie rozlewał się na całą kolumnę (brief, punkt 4). */}
            <p className="mt-4 md:mt-5 text-steel dark:text-dark-text-muted text-[15px] md:text-base leading-relaxed md:max-w-[46ch]">
              {service.subtitle}
            </p>
          </AnimatedSection>

          {/* 2. Zdjęcie usługi (mobile: zaraz po krótkim opisie; desktop: prawa
              kolumna przez oba rzędy) — priority, LCP element strony. */}
          <AnimatedSection delay={0.15} className="md:col-start-2 md:row-start-1 md:row-span-2 md:h-full">
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
          </AnimatedSection>

          {/* 3. Długi opis + chipy + CTA (mobile: pod zdjęciem; desktop: lewa
              kolumna, dolny rząd) */}
          <AnimatedSection className="md:col-start-1 md:row-start-2 text-center md:text-left">
            <p className="text-text-body dark:text-dark-text text-[14px] leading-relaxed md:max-w-[52ch]">
              {service.description}
            </p>

            {/* KORZYŚCI (brief hero, punkt 6). Trzy pozycje w jednym rzędzie od
                `sm`, na telefonie jedna pod drugą. Ikona NAD tekstem, nie obok:
                w kolumnie szerokiej na ~550 px trzy pozycje obok siebie dają
                ~170 px na pozycję, a przy ikonie w linii na tekst zostaje ~145 px
                i każda korzyść łamie się na cztery linijki.
                Wizualnie lekkie: bez ramek, bez tła, bez kapsułek. Ta sama
                zasada, która obowiązuje w hero strony głównej. */}
            {service.heroBenefits && service.heroBenefits.length > 0 && (
              <ul className="mt-6 md:mt-7 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-4">
                {service.heroBenefits.map((b) => (
                  <li
                    key={b.text}
                    /* Na telefonie ikona OBOK tekstu i całość wyśrodkowana, bo
                       reszta kolumny na mobile też jest wyśrodkowana i lista
                       dosunięta do lewej wyglądała jak wypadnięta z osi.
                       Od `sm` ikona wskakuje NAD tekst i rząd idzie do lewej. */
                    className="flex sm:flex-col items-center sm:items-start justify-center sm:justify-start gap-2.5 sm:gap-2 text-center sm:text-left"
                  >
                    <span className="w-5 h-5 flex-shrink-0 text-blue dark:text-blue-light [&>svg]:w-5 [&>svg]:h-5">
                      {b.icon}
                    </span>
                    <span className="text-[12.5px] md:text-[13px] leading-snug text-steel dark:text-dark-text-muted">
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
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
                Podniesiona z „steel semibold sm" na granat i font-bold: ma być
                ostatnim przystankiem przed CTA, a nie przypisem pod opisem.
                Kwota i jej zapis bez zmian, z `heroPriceLabel ?? price`. */}
            <div className="mt-7 md:mt-8">
              <p className="font-barlow font-bold text-[17px] md:text-lg text-navy dark:text-white tracking-tight">
                {priceLabel}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 justify-center md:justify-start">
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
