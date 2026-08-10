import Image from "next/image";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

// Hero przebudowane 10.08.2026 (druga tura, po obejrzeniu deployu przez Marcina).
// Diagnoza, która wywołała zmianę: hasło na pełną szerokość dominowało nad resztą,
// a lewy blok tekstu czytał się jak podpis pod zdjęciem. Układ był poprawny,
// ale „template'owy".
//
// CO SIĘ ZMIENIŁO wobec pierwszej tury:
//   1. Hasło wraca do LEWEJ KOLUMNY i stoi w czterech liniach, po jednym słowie.
//      Nie jest już plakatem nad wszystkim, tylko blokiem, który razem ze
//      zdjęciem tworzy JEDNĄ kompozycję.
//   2. Zdjęcie jest wyższe i wyrównane do góry z kickerem, a nie wyśrodkowane
//      względem tekstu.
//   3. Chipy zaufania z czterech do dwóch. Telefon zszedł do linku tekstowego
//      obok CTA, „Faktura VAT" wypadła: to standard w B2B, nie argument.
//   4. Pod CTA doszła jedna linia, żeby przycisk nie był samotnym prostokątem.
//   5. Dolny padding mocno ścięty, żeby pasek logotypów stał się odpowiedzią
//      na hero, a nie osobną wyspą po dużej pustce.
//
// Kolejność na telefonie BEZ ZMIAN (prośba Marcina, 2026-07-23): nagłówek →
// hasło → opis → ZDJĘCIE → reszta. Osiągnięta przez md:order, bez duplikowania.
export default function Hero() {
  // Ucieczka zdjęcia poza kontener, do prawej krawędzi ekranu.
  //
  // ⚠ OGRANICZONA DO 5rem przez `min()`. Bez tego limitu kolumna rosła razem
  // z ekranem: przy 2560 px miała 1280 px szerokości przy ograniczonej wysokości,
  // a pionowy plik źródłowy (877x1168) był przycięty do samej twarzy, z uciętą
  // brodą (zgłoszone przez Marcina po deployu 10.08.2026, potwierdzone na 2560 px).
  // Z limitem kadr wygląda tak samo od 1280 px w górę.
  //
  // Wartość liczy się z `100vw`, które ZAWIERA pasek przewijania, więc zdjęcie
  // przestrzeliwuje o jego szerokość (ok. 7 px). To celowe: sekcja ma
  // `overflow-hidden`, więc nadmiar jest przycięty, a niedomiar zostawiłby szparę.
  const bleedRight = "md:mr-[calc(-1*min(5rem,max(1rem,(100vw-72rem)/2)))]";

  return (
    <section className="relative pt-28 pb-10 md:pt-32 md:pb-14 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Poświaty jako radial-gradient zamiast filter:blur — blur 100px na
            dużych elementach zabijał wydajność GPU na mobile (PageSpeed). */}
        <Parallax
          distance={PARALLAX.strong}
          direction="up"
          className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(37,99,235,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(37,99,235,0.16)_0%,transparent_70%)]"
        />
        <Parallax
          distance={PARALLAX.base}
          direction="down"
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(37,99,235,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_70%)]"
        />
      </div>

      <div className="px-4">
        <div className="max-w-6xl mx-auto md:grid md:grid-cols-[1.02fr_0.98fr] md:gap-x-10 lg:gap-x-14 md:items-start">
          {/* LEWA KOLUMNA */}
          <div className="hero-intro text-center md:text-left">
            {/* H1 niesie frazę, hasło zostaje w H2 (decyzja z 2026-07-30).
                Treść bez zmian od 10.08: „Fotograf biznesowy w Poznaniu.
                Zdjęcia i film." */}
            <h1 className="font-barlow font-semibold text-[11px] md:text-xs tracking-[0.06em] md:tracking-[0.16em] uppercase text-steel dark:text-dark-text-muted mb-4 md:mb-6">
              Fotograf biznesowy w Poznaniu.{" "}
              <span className="whitespace-nowrap">Zdjęcia i film.</span>
            </h1>

            {/* Cztery słowa w czterech liniach = cztery obszary oferty.
                Jedno słowo na linię daje hasłu rytm i pozwala zejść z rozmiaru
                czcionki niżej niż przy jednej długiej linii, przy mocniejszym
                wrażeniu. Bez akcentu kolorystycznego: wyróżnienie jednego słowa
                sugerowałoby hierarchię między usługami, której nie ma. */}
            <h2 className="font-barlow font-black text-[clamp(38px,11vw,58px)] md:text-[clamp(40px,5.4vw,76px)] leading-[0.95] tracking-[-1.5px] md:tracking-[-2.5px] text-navy dark:text-white mb-6 md:mb-7">
              LUDZIE.
              <br />
              WYDARZENIA.
              <br />
              OBIEKTY.
              <br />
              PRODUKTY.
            </h2>

            {/* Lead skrócony 10.08.2026 (druga tura). Nazwy klientów zeszły
                stąd do paska logotypów zaraz pod hero, żeby social proof był
                odpowiedzią na hero, a nie dopiskiem w akapicie. */}
            <p className="font-inter text-[15px] md:text-base text-steel dark:text-dark-text-muted leading-relaxed max-w-md mx-auto md:mx-0">
              Zdjęcia i film dla firm: ludzie, wydarzenia, obiekty i&nbsp;produkty.
              Od&nbsp;jednej osoby, od&nbsp;pierwszej rozmowy do&nbsp;gotowego
              materiału.
            </p>

            {/* ZDJĘCIE na telefonie wchodzi TUTAJ, między lead a resztę
                (kolejność z 2026-07-23). Na desktopie kolumna prawa. */}
            <div className={`mt-8 md:hidden ${bleedRight}`}>
              <HeroPhoto />
            </div>

            {/* Dwa chipy zamiast czterech (10.08.2026). „Faktura VAT" wypadła:
                w B2B to standard, nie argument. Telefon zszedł niżej, do linku
                tekstowego obok CTA, żeby nie konkurował z przyciskiem. */}
            <ul className="mt-8 flex flex-wrap gap-2 justify-center md:justify-start" aria-label="Warunki współpracy">
              <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border dark:border-dark-border text-[12px] text-steel dark:text-dark-text-muted">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Wstępna wycena w 24h
              </li>
              <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border dark:border-dark-border text-[12px] text-steel dark:text-dark-text-muted">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5-2.5 3.75-5.5 3.75-9S14.5 5.5 12 3m0 18c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3M3.6 9h16.8M3.6 15h16.8" />
                </svg>
                Realizacje w całej Polsce
              </li>
            </ul>

            {/* CTA plus jedna linia pod spodem, żeby przycisk nie stał sam.
                Telefon jako link tekstowy obok, nie jako kolejny chip. */}
            <div className="mt-7">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 justify-center md:justify-start">
                <a
                  href="#kontakt"
                  data-cta="wycena_home_hero"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue text-white px-8 py-4 rounded-xl font-barlow font-bold text-base btn-glow transition-transform hover:scale-[1.02]"
                >
                  Zapytaj o ofertę
                  <span className="text-white/80">→</span>
                </a>
                <a
                  href="tel:+48514900688"
                  data-cta="tel_hero"
                  className="font-barlow font-semibold text-[15px] text-navy dark:text-white hover:text-blue dark:hover:text-blue-light transition-colors"
                >
                  514 900 688
                </a>
              </div>
              <p className="mt-3 text-[13px] text-steel dark:text-dark-text-muted">
                Opisz, czego potrzebujesz. Odpowiem w 24h.
              </p>
            </div>
          </div>

          {/* PRAWA KOLUMNA: zdjęcie wyrównane do góry z kickerem (desktop). */}
          <div className={`hidden md:block ${bleedRight}`}>
            <HeroPhoto />
          </div>
        </div>
      </div>
    </section>
  );
}

// Wydzielone, bo ten sam kadr renderuje się dwa razy: w lewej kolumnie na
// telefonie (kolejność treści) i w prawej na desktopie. Jedno źródło zamiast
// dwóch kopii, które zawsze się rozjeżdżają.
//
// ⚠ `priority` i `fetchPriority="high"` zostają: to element LCP. Bez animacji
// wejściowej, bo opóźniała pomiar LCP (PageSpeed „render delay").
function HeroPhoto() {
  return (
    <Parallax distance={PARALLAX.subtle} direction="up">
      <div className="w-full aspect-square md:aspect-[4/5] md:max-h-[660px] md:ml-auto rounded-3xl md:rounded-r-none overflow-hidden bg-border dark:bg-dark-card relative">
        <Image
          src="/images/marcin-hero-light-4.jpg"
          alt="Marcin Szabunia, fotograf biznesowy i twórca wideo, Poznań"
          fill
          className="object-cover object-top"
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={72}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0YxRjVGOSIvPjwvc3ZnPg=="
        />
      </div>
    </Parallax>
  );
}
