import Image from "next/image";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

// Hero przebudowane pod nową ofertę czterech usług (decyzja Marcina, 2026-08-10).
// Zmiany wobec wersji z 23.07:
//   1. Hasło idzie na PEŁNĄ SZEROKOŚĆ nad obie kolumny, zamiast siedzieć
//      w lewej kolumnie i łamać się na trzy linie. Cztery słowa hasła to
//      cztery filary oferty, więc mają się czytać jak jedna linia plakatu.
//   2. Zdjęcie dochodzi do prawej krawędzi ekranu (kolumna gridu liczona od
//      viewportu, nie od kontenera), bez zaokrąglenia z prawej strony.
// Kolejność na telefonie BEZ ZMIAN (prośba Marcina, 2026-07-23): nagłówek →
// hasło → opis → ZDJĘCIE → chipy zaufania → „Zaufało mi 100+ firm" → CTA.
// Osiągnięta przez md:grid-rows, bez duplikowania bloków.
export default function Hero() {
  // Ucieczka zdjęcia poza kontener, do prawej krawędzi ekranu. Cały rząd 2
  // siedzi w standardowym `px-4 > max-w-6xl`, dzięki czemu tekst trafia co do
  // piksela pod hasło. Samo zdjęcie wychodzi ujemnym marginesem o szerokość
  // marginesu kontenera plus px-4.
  //
  // Wartość jest liczona z `100vw`, które ZAWIERA pasek przewijania, więc na
  // desktopie z widocznym paskiem zdjęcie przestrzeliwuje o jego szerokość
  // (ok. 7 px). To celowe: sekcja ma `overflow-hidden`, więc nadmiar jest
  // przycięty i niewidoczny, a niedomiar zostawiłby brzydką szparę przy
  // krawędzi. Pierwsza wersja liczyła z vw wcięcie TEKSTU i wtedy ten sam
  // błąd był widoczny jako 7 px rozjazdu między opisem a hasłem.
  const bleedRight = "md:mr-[calc(-1*max(1rem,(100vw-72rem)/2))]";

  return (
    <section className="relative pt-28 pb-12 md:pt-32 md:pb-24 overflow-hidden">
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

      {/* Rząd 1: kicker + hasło na pełną szerokość kontenera. */}
      <div className="px-4">
        <div className="max-w-6xl mx-auto hero-intro text-center md:text-left">
          {/* H1 to fraza, hasło zostaje jako element graficzny w H2 (decyzja
              Marcina 2026-07-30, podtrzymana przy przebudowie 2026-08-10).

              Treść zmieniona 10.08.2026. Poprzednio: „Fotograf eventowy
              i biznesowy w Poznaniu". Słowo „eventowy" nazywało JEDEN filar
              z czterech i zawężało ofertę dokładnie tam, gdzie hasło niżej
              ją rozszerza. Organicznie nie zarabiało (eventy: zero w GSC),
              a w zapytaniach z Ads nie wystąpiło ani razu na 12 954 wyświetlenia.

              Zostają słowa, które mają pomiar w tych samych danych:
              „fotograf" (576 kliknięć), „biznesowy" (78), „poznań" (358).
              ODRZUCONE świadomie: „dla firm" i „wideo" — obie frazy mają
              w tym zbiorze zero kliknięć i zero wyświetleń, więc wymiana
              „biznesowy" na „dla firm" oddawałaby 78 kliknięć za nic.

              Drugie zdanie („Zdjęcia i film.") powtarza się w akapicie niżej.
              Redundancja przyjęta świadomie przez Marcina: H1 pracuje na
              wyszukiwarkę, lead na sprzedaż. */}
          <h1 className="font-barlow font-semibold text-[11px] md:text-sm tracking-[0.06em] md:tracking-[0.14em] uppercase text-steel dark:text-dark-text-muted mb-3 md:mb-4">
            Fotograf biznesowy w Poznaniu.{" "}
            {/* Drugie zdanie łamie się w całości. Bez tego na 320 px linia
                kończyła się na „ZDJĘCIA", a „I FILM." zostawało samo. */}
            <span className="whitespace-nowrap">Zdjęcia i film.</span>
          </h1>
          {/* Cztery słowa = cztery filary oferty (Fundamenty firmy, §12).
              Bez akcentu kolorystycznego na żadnym z nich: wyróżnienie jednego
              sugerowałoby hierarchię między usługami, której nie ma. */}
          <h2 className="font-barlow font-black text-[clamp(30px,8.5vw,42px)] md:text-[clamp(32px,4.05vw,52px)] leading-[1.05] md:leading-[1] tracking-[-1px] md:tracking-[-1.5px] text-navy dark:text-white">
            LUDZIE. WYDARZENIA. OBIEKTY. PRODUKTY.
          </h2>
        </div>
      </div>

      {/* Rząd 2: ten sam kontener co hasło, więc lewa kolumna jest z nim
          wyrównana. Do krawędzi ekranu wychodzi wyłącznie zdjęcie. */}
      <div className="px-4 mt-6 md:mt-12">
      <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 md:grid-rows-[auto_auto] md:gap-x-12 md:items-center">
        {/* A. Opis (mobile: pierwszy; desktop: lewa kolumna, górny rząd).
            md:self-end + md:self-start (blok C): rzędy dostają po równo nadmiar
            wysokości zdjęcia — dokleiwamy A do dołu rzędu 1 i C do góry rzędu 2,
            żeby na desktopie opis i chipy stykały się jak jeden blok. */}
        <div className="hero-intro md:col-start-1 md:row-start-1 md:self-end text-center md:text-left">
          <p className="font-inter text-[15px] md:text-base text-steel dark:text-dark-text-muted leading-relaxed max-w-md mx-auto md:mx-0">
            Zdjęcia i film dla firm: wizerunek zespołu, wydarzenia firmowe,
            obiekty i&nbsp;produkty. Wszystko od&nbsp;jednej osoby.
            Współpracowałem z&nbsp;H&amp;M, Santanderem i&nbsp;Warner Music.
          </p>
        </div>

        {/* B. Zdjęcie (mobile: pod opisem, w marginesach strony; desktop: prawa
            kolumna przez oba rzędy, dochodzi do prawej krawędzi ekranu).
            Bez animacji wejściowej: element LCP (PageSpeed "render delay").
            Na telefonie kadr kwadratowy. Na desktopie NIE proporcja, tylko
            wysokość z clampem: kolumna ma tu 50vw, więc aspect-square dawało
            na monitorze 1600 px zdjęcie wysokie na 800 px i spychało chipy
            oraz CTA pod fold. */}
        <div className={`mt-8 md:mt-0 md:col-start-2 md:row-start-1 md:row-span-2 ${bleedRight}`}>
          <Parallax distance={PARALLAX.subtle} direction="up">
            <div className="w-full aspect-square md:aspect-auto md:h-[clamp(400px,34vw,520px)] rounded-3xl md:rounded-r-none overflow-hidden bg-border dark:bg-dark-card relative">
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
        </div>

        {/* C. Chipy zaufania + dowód + CTA (mobile: pod zdjęciem; desktop: lewa
            kolumna, dolny rząd). Chipy zawijają się czysto — poprzedni zlepek
            z kropkami łamał się w środku „Faktura VAT". Telefon jako klikalny,
            wyróżniony chip. */}
        <div className="hero-intro mt-8 md:mt-0 md:col-start-1 md:row-start-2 md:self-start md:pt-6 text-center md:text-left">
          <ul className="flex flex-wrap gap-2 justify-center md:justify-start" aria-label="Najważniejsze warunki współpracy">
            <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border dark:border-dark-border text-[12px] text-steel dark:text-dark-text-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Wstępna wycena w 24h
            </li>
            <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border dark:border-dark-border text-[12px] text-steel dark:text-dark-text-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Wolne terminy: 1–3 tyg.
            </li>
            <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border dark:border-dark-border text-[12px] text-steel dark:text-dark-text-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Faktura VAT
            </li>
            <li>
              <a
                href="tel:+48514900688"
                data-cta="tel_hero"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue/40 dark:border-blue-light/40 text-[12px] font-barlow font-semibold text-blue dark:text-blue-light hover:bg-blue hover:text-white dark:hover:bg-blue-light dark:hover:text-navy transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                514 900 688
              </a>
            </li>
          </ul>
          <p className="mt-3 text-xs text-steel dark:text-dark-text-muted">
            Zaufało mi{" "}
            <span className="font-semibold text-steel dark:text-dark-text">100+ firm</span>{" "}
            z&nbsp;całej Polski
          </p>
          {/* Jedno CTA w hero, bez drugorzędnych linków do cennika czy
              portfolio (decyzja 2026-07-06, w mocy). */}
          <div className="mt-5 flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <a
              href="#kontakt"
              data-cta="wycena_home_hero"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]"
            >
              Zapytaj o ofertę
              <span className="text-white/80">→</span>
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
