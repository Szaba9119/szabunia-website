import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import CountUp from "./CountUp";
import { TRUST_STATS } from "./TrustStats";

// Blok autorski na podstronach usług (analiza lejka 2026-08-02).
// Powód powstania: 67% budżetu Google Ads ląduje na /uslugi/*, a te strony nie
// miały ani jednego zdania o tym, kto stoi za usługą. `About.tsx` renderuje się
// wyłącznie na stronie głównej, więc wchodzący z reklamy nie dostawał kontekstu.
//
// PRZEBUDOWA 22.09.2026 (decyzja Marcina: „jakościowo zbliżona do homepage",
// „«Kto to zrobi» nie podoba mi się jako nazwa"). Zmieniły się trzy rzeczy:
//
// 1. NAGŁÓWEK. Było „Kto to zrobi", jest „Marcin Szabunia", czyli tak samo jak
//    w sekcji „O mnie" na stronie głównej. Tamto brzmiało jak pozycja w formularzu
//    zamówienia, a sekcja ma przedstawiać człowieka, nie rolę w projekcie.
// 2. UKŁAD. Zeszła biała karta z obrysem, a portret urósł ze 112/160 px do kolumny
//    3:4. Na stronie głównej ta sekcja stoi otwarcie na tle strony i to ona jest
//    wzorcem jakości. Karta dodatkowo zderzała się z opinią i „Przykładowymi
//    realizacjami", które też są kartami.
// 3. ZDANIE POD USŁUGĘ. Wspólna baza zostaje wspólna (kim jestem, od kiedy, skąd),
//    dochodzi jedno zdanie o doświadczeniu istotnym dla TEJ usługi. Bez tego cztery
//    podstrony miały dokładnie ten sam blok, więc nie odpowiadały na pytanie
//    „dlaczego ta osoba do TEJ roboty".
//
// ⛔ ŻADEN FAKT NIE JEST NOWY. Zdania specyficzne są przeformułowaniem tego, co
// stoi już w `servicePillars.ts` i w `services.tsx` tej samej usługi. Nie dopisywać
// tu liczb ani twierdzeń, których nie ma w danych (zasada 8 z CLAUDE.md).
//
// Świadomie BEZ H1 i bez hasła ze strony głównej: H1 na podstronie niesie frazę
// (pole `h1` w ServiceData, decyzja SEO z 30.07.2026).
// Świadomie BEZ linku do „O mnie": lejek podstron nie ma bocznych wyjść
// (decyzja Marcina, 2026-07-06).

// ⚠ PRZEPISANE 22.09.2026, DRUGA TURA (Marcin: „sekcja autora nie może być
// streszczeniem procesu"). Pierwsza wersja tych zdań była dokładnie tym błędem:
//
//   wizerunek  — „prowadzę przez ustawienie i mimikę" powtarzało krok 3 procesu,
//                „to samo światło i ten sam retusz" powtarzało „Zakres realizacji"
//   eventy     — „żeby nikt mnie nie zauważył" powtarzało krok 2, „znam agendę"
//                krok 1, „drugi operator" znów krok 2
//   obiekty    — „zgody na lot przed potwierdzeniem daty" powtarzało krok 2 dosłownie,
//                „nie wyglądać jak wizualizacja" powtarzało „Zakres realizacji"
//   produktowa — „zapisuję ustawienie" powtarzało krok 3, „retusz i tło zgodne
//                z wymogami platform" krok 4
//
// PODZIAŁ RÓL, którego się teraz trzymamy:
//   „Jak wygląda współpraca" → co się wydarzy podczas realizacji (operacje)
//   „Marcin Szabunia"        → dlaczego akurat ta osoba (dorobek, specjalizacja)
//
// Zostały wyłącznie **opublikowane dorobki**, po jednym zdaniu, i tylko tam,
// gdzie taki dorobek istnieje i NIE stoi już gdzie indziej na tej samej podstronie.
//
// ⛔ TYLKO EVENTY MAJĄ ZDANIE SPECYFICZNE. Trzy pozostałe usługi nie mają go celowo.
//
// wizerunek — kandydatem było wyróżnienie w konkursie Portret 2022 i zostało
//   ODRZUCONE 22.09.2026 po sprawdzeniu źródła. Kanon biznesowy opisuje je wprost
//   jako „social proof ARTYSTYCZNY" (`01_Biznes/_System/04_Sprzedaz/klienci_registry.md`),
//   a ta podstrona sprzedaje headshoty i sesje zespołowe. Nagroda za portret
//   artystyczny nie dowodzi, że ktoś poprowadzi przez sesję czterdziestoosobowy
//   zespół. Fakt zostaje tam, gdzie pasuje: w `About.tsx` i w JSON-LD (`award`).
// obiekty — jedyny mocny dowód to Yes Butcher! i przewodnik Michelin, ale ta
//   realizacja jest już podlinkowana na dole tej samej podstrony, z nazwą niosącą
//   Michelin wprost („Yes Butcher!: sesja do przewodnika Michelin").
// produktowa — jedyny kandydat to case Artechu, również podlinkowany niżej.
//
// Każdy inny argument, jaki się nasuwał (powtarzalność serii, pliki gotowe do sklepu,
// spójność między partiami), jest operacyjny i stoi już w procesie albo w „Zakresie
// realizacji". Dorabianie zdania na siłę byłoby fałszywą personalizacją. Wspólny
// akapit i liczby wystarczą.
//
// ⛔ FAKT O FORTE NIE JEST NOWY. Stoi w `Publications.tsx`, z linkiem do wydania:
// „Kadry wykonane dla Grupy Forte S.A. na targach meblowych w Poznaniu, trafiły do
// kwietniowego wydania Big Furniture Group Magazine (…). Jedno z nich znalazło się
// na okładce". Ta sekcja nie renderuje się na podstronie usługi, więc to nie duplikat.
// Targi meblowe to wydarzenie, stąd ta usługa, a nie produktowa.
// Bio pisane pod usługę (22.09.2026). Odpowiada na „komu powierzam realizację",
// więc mówi o sposobie pracy, nie o zakresie i nie o klientach.
//
// ⛔ ŻADNYCH NAZW MAREK. Mają własną powierzchnię w pasku `LogoBar`. Forte stoi
// w highlighcie eventów, Synteza w highlighcie obiektów; dopisanie ich tutaj
// dałoby ten sam dowód dwa razy na jednej podstronie.
// ⛔ ŻADNEGO PROCESU. Zgody, pogoda, drugi operator i terminy należą do sekcji
// „Jak wygląda…". Nie dopisywać.
// ⛔ Portret 2022 nie wraca: kanon biznesowy opisuje go jako dowód artystyczny,
// a te podstrony sprzedają fotografię biznesową.
const SPECYFIKA: Record<string, string[]> = {
  "wizerunek-portrety": [
    "Cześć, jestem Marcin. Od 2018 roku fotografuję ludzi dla firm. Większość osób, które stają przed moim aparatem, nie pozuje na co dzień i właśnie dlatego prowadzę je krok po kroku, zamiast mówić „stań naturalnie”.",
    "Pomagam ustawić sylwetkę, spojrzenie i dłonie, a przy większych zespołach pilnuję spójności światła, kadru i retuszu. Portrety wykonane jednego dnia i osoby dofotografowane później nadal wyglądają jak część jednego materiału.",
  ],
  "eventy-reportaze": [
    "Cześć, jestem Marcin. Reportaż fotografuję od początku swojej pracy zawodowej. Pracowałem przy konferencjach, targach, galach, integracjach i koncertach, w salach konferencyjnych i w trudnym świetle sceny.",
    "Podczas wydarzenia jestem blisko tego, co się dzieje, ale nie chcę przeszkadzać uczestnikom. Fotografuję podczas oficjalnych punktów programu i poza nimi, żeby oprócz dokumentacji złapać emocje: ludzi, reakcje i detale, z których powstaje materiał opowiadający całe wydarzenie.",
  ],
  "nieruchomosci-przemysl": [
    "Cześć, jestem Marcin. Fotografując obiekt, patrzę nie tylko na sam budynek, ale na to, co firma chce nim pokazać: skalę, funkcję, technologię, wnętrza i otoczenie.",
    "Fotografowałem hale i zakłady produkcyjne, biura, lokale gastronomiczne, hotele i inne przestrzenie komercyjne. Tam, gdzie ma to sens, łączę fotografie z poziomu ziemi z ujęciami z drona, żeby pokazać obiekt w pełnym kontekście.",
  ],
  "fotografia-produktowa": [
    "Cześć, jestem Marcin. W fotografii produktowej najbardziej pilnuję powtarzalności. Kolejny produkt z tej samej serii powinien mieć to samo światło, kolor, perspektywę i sposób retuszu.",
    "Fotografuję packshoty, produkty do e-commerce, aranżacje, jedzenie i napoje. Pracowałem również przy seryjnej produkcji packshotowej, fotografując między innymi AGD, naczynia, szkło i produkty z odbijającymi lub transparentnymi powierzchniami.",
  ],
};

export default function ServiceAuthor({ service }: { service?: string }) {
  const specyfika = (service && SPECYFIKA[service]) || [];
  return (
    <section className="py-10 md:py-14 px-4" aria-labelledby="o-autorze">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] gap-8 lg:gap-14 items-center">
            {/* Portret w tej samej proporcji co na stronie głównej (3:4). Kadr
                `marcin-hero-light-4.jpg`, bo w tym formacie twarz czyta się od razu,
                a `marcin-o-mnie.jpg` jest sylwetką z aparatem. */}
            <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none aspect-[3/4] rounded-2xl overflow-hidden bg-border dark:bg-dark-card">
              <Image
                src="/images/marcin-hero-light-4.jpg"
                alt="Marcin Szabunia, fotograf biznesowy i twórca wideo, Poznań"
                fill
                className="object-cover"
                style={{ objectPosition: "center 12%" }}
                sizes="(max-width: 640px) 260px, (max-width: 1023px) 300px, 360px"
                // 80, nie 78: `images.qualities` w next.config.ts deklaruje
                // [72, 75, 80, 85, 90], a Next 16 odrzuca żądanie o jakości
                // spoza listy (HTTP 400 na ośmiu podstronach, audyt PELNY2608-01).
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0YxRjVGOSIvPjwvc3ZnPg=="
              />
            </div>

            <div>
              <h2
                id="o-autorze"
                className="font-barlow font-extrabold text-2xl md:text-[32px] leading-tight tracking-tight text-navy dark:text-white mb-5 text-center lg:text-left"
              >
                Marcin Szabunia
              </h2>
              <div className="space-y-4 text-steel dark:text-dark-text-muted text-[15px] leading-relaxed">
                {specyfika.map((akapit) => (
                  <p key={akapit.slice(0, 24)}>{akapit}</p>
                ))}
                {/* ⛔ BEZ WSPÓLNEGO AKAPITU. Do 22.09.2026 stało tu „Pod marką SZABUNIA
                    odpowiadam za kontakt, plan i jakość realizacji." oraz wcześniej
                    wyliczenie zdjęć, filmu i drona. Oba mówiły o zakresie, nie o tym,
                    komu klient powierza realizację, i brzmiały tak samo na czterech
                    różnych usługach. Całe bio idzie dziś z `SPECYFIKA`. */}
              </div>

              {/* Liczby z TRUST_STATS, jedno źródło danych dla home i podstron.
                  Ten sam zestaw na wszystkich czterech usługach i to jest świadome:
                  dane są zbiorcze dla całej działalności, więc rozbicie ich na
                  „sesji portretowych" i „eventów" osobno wymagałoby liczb, których
                  nikt nie policzył. Wolę cztery prawdziwe niż cztery dopasowane. */}
              <div className="mt-7 pt-6 border-t border-border dark:border-dark-border">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
                  {TRUST_STATS.map((s) => (
                    <div key={s.label} className="text-center lg:text-left">
                      <p className="font-barlow font-extrabold text-2xl md:text-[28px] leading-none tracking-tight text-blue dark:text-blue-light mb-1.5">
                        <CountUp
                          end={s.end}
                          suffix={s.suffix}
                          duration={s.end > 10000 ? 2500 : 1800}
                        />
                      </p>
                      <p className="text-[11px] md:text-[12px] text-steel dark:text-dark-text-muted leading-tight">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
