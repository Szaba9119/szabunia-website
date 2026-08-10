import type { ReactNode } from "react";
import type { ProcessStep, FAQItem } from "./portfolio";

export { type ProcessStep, type FAQItem };

export interface ServiceData {
  slug: string;
  /** Nazwa usługi na powierzchniach MARKETINGOWYCH: kafelek na stronie głównej,
      kafelek na hubie `/uslugi`, karta „Powiązana usługa" pod wpisem blogowym
      oraz alty zdjęć. Może być pełna i opisowa („Fotografia i wideo produktowe"):
      klient patrzący na kafelek ma zrozumieć, co dostaje, bez znajomości
      branżowego skrótu (decyzja Marcina, commit `d106c8d`).

      ⚠ NIE używać tego pola w okruszkach ani w JSON-LD — tam idzie `shortTitle`.
      Okruszek długi na 45 znaków przestaje być nawigacją. */
  title: string;
  /** Krótka nazwa NAWIGACYJNA i STRUKTURALNA. Trzy miejsca, wszystkie:
      okruszek na podstronie usługi (widoczny i w `BreadcrumbList`),
      `name` w JSON-LD `Service` oraz `name` w `ItemList` na `/uslugi`.

      Rozdzielone od `title` 10.08.2026, wariant C decyzji Marcina (finding
      UXUI2608-03). Powód: po commicie `d106c8d` `title` stał się pełną frazą
      i w trzech z czterech usług zrównał się z `h1`, więc jedno pole obsługiwało
      naraz kafelek, okruszek i dane strukturalne — trzy różne zadania.

      Brak wartości = fallback na `title`. */
  shortTitle?: string;
  /** Nagłówek H1 na podstronie usługi, gdy ma brzmieć inaczej niż `title`.
      Trzy pola, trzy zadania, NIE zlewać: `title` to nazwa marketingowa
      (kafelek), `shortTitle` nawigacyjna (okruszek, JSON-LD), `h1` niesie frazę
      wyszukiwaną. H1 to najmocniejszy sygnał na stronie i ma zawierać frazę,
      której ludzie realnie szukają (audyt 2026-07-30: `packshot` z 100 wyświetleniami
      w GSC nie występował w żadnym H1). Brak wartości = fallback na `title`.

      NIE doklejać miasta przecinkiem („Portrety biznesowe, Poznań"). Sprawdzone
      2026-07-30: lokalność jest już zbudowana przez `addressLocality` i `GeoCoordinates`
      w layoucie, `areaServed` na każdej podstronie, „Poznań" 1-3 razy w treści oraz
      `title`, który i tak pokazuje się w wyniku. H1 z miastem po przecinku nie dokłada
      rankingu, a łamie test nadrzędny z docs/zasady-tekstow.md („czy Marcin powiedziałby
      to klientowi przez telefon"). Miasto w H1 tylko wtedy, gdy wychodzi naturalnie
      w zdaniu, jak „Obsługa eventów firmowych w Poznaniu". */
  h1?: string;
  /** Nagłówki H2 sekcji „jak wygląda współpraca” i FAQ. Domyślne teksty w komponentach
      są szablonowe („Jak wygląda współpraca”, „Najczęstsze pytania”) i nie niosą żadnej
      frazy, a te same komponenty obsługują też strony portfolio, więc nie da się ich
      podmienić globalnie. Brak wartości = domyślny tekst komponentu (audyt 2026-07-30). */
  h2Process?: string;
  h2Faq?: string;
  subtitle: string;
  description: string;
  /** Mały kicker nad H1 w hero podstrony usługi, wersalikami (np. „DOKUMENTACJA
      WYDARZEŃ"), z ikoną obok. Odpowiednik kickera ze strony głównej
      („FOTOGRAF BIZNESOWY W POZNANIU. ZDJĘCIA I FILM."), który stoi tam nad
      hasłem i nadaje sekcji ten sam rytm: etykieta → nagłówek → lead.

      Dodane 10.08.2026 (brief hero eventów). Pole OPCJONALNE i celowo puste dla
      trzech pozostałych usług: kicker pojawia się tylko tam, gdzie Marcin podał
      treść. Nie generować go automatycznie z `title` ani `shortTitle` — wersalik
      z długiej nazwy marketingowej („FOTOGRAFIA I WIDEO NIERUCHOMOŚCI
      I PRZEMYSŁU") przestaje być etykietą, a staje się drugim nagłówkiem. */
  heroLabel?: string;
  /** Trzy krótkie korzyści pod leadem w hero, każda z ikoną. Też opcjonalne
      i też tylko dla eventów (10.08.2026). Świadomie TRZY: rząd na desktopie
      dzieli się wtedy równo, a przy czterech pozycjach tekst schodzi do rozmiaru,
      w którym przestaje być czytany.

      To NIE jest miejsce na powtórzenie zakresu usługi (`scope`) ani listy
      zastosowań (`applications`). Korzyść mówi, co klient z tego ma; tamte
      sekcje mówią, co dostaje. Duplikat zrobi z hero spis treści strony. */
  heroBenefits?: { icon: ReactNode; text: string }[];
  icon: ReactNode;
  /** Zdjęcie hero podstrony usługi, z istniejących bibliotek /images (brief-22 zad. 8). */
  heroImage: string;
  /** object-position dla heroImage, dobrane per kadr. Domyślnie "center". */
  heroImagePos?: string;
  price: string;
  /** Etykieta ceny do nagłówka hero ORAZ do kafelka w Usługach i na stronie głównej.
      NIE zmienia `price`, którego używa FAQ (priceFaqIntro + price) i JSON-LD Offer.
      Domyślnie (gdy brak) oba miejsca pokazują `price`. Prośba Marcina 2026-07-23,
      rozszerzone na kafelki 04.08.2026.

      Powód rozszerzenia (kwoty HISTORYCZNE, stan na 04.08.2026): na siatce usług
      stały obok siebie „od 120 zł netto/os." (sesje zespołowe) i „od 1 100 zł netto"
      (portrety). Dziesięciokrotna różnica przy dwóch usługach, które z kafelka
      wyglądają tak samo, czytała się jak błąd. Dziś kanon to 1 400 i 700 zł
      (patrz `heroPriceLabel` niżej) — kwot z tego akapitu nie cytować.
      Etykieta pozwala dopisać JEDNOSTKĘ, nie zmieniając kwoty: „za osobę" kontra
      „pakiety". Kwot nie ruszamy, są w kanonie (`01_Biznes/_System/02_Cenniki`). */
  heroPriceLabel?: string;
  process: ProcessStep[];
  /** 2-3 zdania: co wpływa na wycenę tej usługi. Bez kwot (źródło pytania cenowego w FAQ, brief-22 zad. 4). */
  pricingBlurb: string;
  /** Pytanie cenowe w FAQ, np. "Ile kosztuje sesja portretowa?" (brief-22 zad. 4). */
  priceFaqQuestion: string;
  /** Łącznik zdaniowy przed kwotą, np. "Sesje portretowe zaczynają się". */
  priceFaqIntro: string;
  /** Opcjonalny dalszy ciąg PIERWSZEGO zdania odpowiedzi, doklejany zaraz po "{price} netto" i przed kropką. */
  priceFaqSuffix?: string;
  /** Sekcja „Dla jakich wydarzeń / obiektów / produktów" plus „gdzie ten materiał
      potem trafia". Dodane 10.08.2026 razem z nową narracją podstron usług
      (pakiet 4): H1 → lead → ZASTOSOWANIA → zakres → jak pracujemy → portfolio
      → FAQ → CTA.

      Zastąpiło usunięte 10.08.2026 pole `forWhom`, które wymieniało TYPY FIRM
      („Organizatorzy konferencji i targów"). Decyzja Marcina: klient rozpoznaje
      swoje wydarzenie szybciej niż swoją kategorię, a druga lista odpowiada na
      pytanie „po co mi właściwie te zdjęcia".

      Pole opcjonalne: sekcja renderuje się tylko tam, gdzie dane istnieją.
      Dzięki temu trzy pozostałe usługi zostają nietknięte do swojej kolejki. */
  applications?: {
    heading: string;
    items: string[];
    usesHeading: string;
    uses: string[];
  };
  /** Sekcja „Zakres realizacji". Bloki „nazwa + jedno zdanie konkretu”.
      Opcjonalne na tej samej zasadzie co `applications`. */
  scope?: {
    heading?: string;
    items: { title: string; desc: string }[];
  };
  faqs: FAQItem[];
  portfolioSlug?: string;
  galleryCategory?:
    | "portrety"
    | "eventy"
    | "produktowe"
    | "wideo"
    | "dron"
    | "zespolowe"
    | "obiekty"
    | "wnetrza"
    | "wideo-produktowe";
  /** Drugi pasek „Przykłady z galerii" pod głównym. Dodane 03.08.2026 dla sesji
      zespołowych: strona pokazywała wyłącznie sześć kadrów z jednej realizacji
      (IDcom), więc ktoś, kto chciał zobaczyć więcej twarzy i teł, nie miał dokąd
      kliknąć. Kategoria wskazuje istniejące pliki, nie kopiuje ich na dysk. */
  extraGallery?: {
    category: NonNullable<ServiceData["galleryCategory"]>;
    ctaLabel?: string;
    /** Nadpisuje domyślny cel przycisku. Używane, gdy pasek ma prowadzić
        na sąsiednią usługę, a nie do filtrowanej galerii. */
    href?: string;
    /** Nadpisuje podtytuł paska. Potrzebne, gdy pasek stoi na obcej podstronie
        i sam z siebie nie tłumaczy, po co tam jest (Marcin, 04.08.2026:
        „przykłady sesji zespołowej dałbym w innym miejscu"). */
    sub?: string;
  };
  /** YouTube ID przykładowego filmu pokazywanego na podstronie usługi. */
  videoId?: string;
  videoTitle?: string;
  /** Opcjonalny podpis pod sekcją wideo (domyślnie tekst o foto + wideo). */
  videoNote?: string;
  seo: {
    title: string;
    description: string;
  };
}

// Kolejność kart = kolejność strategiczna, nie alfabetyczna ani historyczna
// (decyzja Marcina 30.07.2026, na danych z GSC, CRM i cennika v3):
//   1. eventy          — wejście do lejka i faktyczna tożsamość firmy: 10 z 11 realizacji
//                        referencyjnych to eventy (korekta_pozycjonowania_2026-07.md)
//   2. sesje zespołowe — zarobek: 211 zł/h na konto po prowizji Useme, najlepsza pozycja
//                        w cenniku, i sprzedaje się tej samej osobie z HR co event
//   3. pakiety         — jedyna przewaga w Poznaniu (foto + wideo + dron u jednej osoby),
//                        naturalny upsell na eventy
//   4. portrety        — najwięcej leadów w CRM (27) i 24% zapytań w GSC, więc nie schodzi
//                        głęboko, ale to rozszerzenie, nie fundament
//   5-7. wideo, produktowa, dron — produktowa ma 39% ruchu organicznego, ale nie ma jej
//                        w tabeli rentowności mapy drogowej, więc nie jest promowana
// Wcześniej: portrety, pakiety, eventy, zespołowe, wideo, produktowa, dron.
const serviceCategoriesRaw: ServiceData[] = [
  {
    slug: "eventy-reportaze",
    h2Process: "Jak wygląda obsługa wydarzenia",
    h2Faq: "Wydarzenia firmowe: najczęstsze pytania",
    // Miasto w H1 wchodzi tu naturalnie w zdanie, więc nie łamie reguły
    // z docs/zasady-tekstow.md (zakaz dotyczy doklejania przecinkiem).
    // Strona główna przejmuje frazę ogólną „fotograf biznesowy Poznań",
    // podstrona bierze lokalną odmianę konkretnej usługi (Marcin, 10.08.2026).
    h1: "Fotografia i wideo wydarzeń firmowych w Poznaniu",
    galleryCategory: "eventy",
    extraGallery: {
      // Portrety zamiast kadrów z sesji IDcom (Marcin, 04.08.2026). Sekcja renderuje
      // się POD przykładową realizacją wideo, patrz kolejność w uslugi/[slug]/page.tsx.
      category: "portrety",
      ctaLabel: "Zobacz wizerunek firmy",
      href: "/uslugi/wizerunek-portrety",
      sub: "Planujesz event firmowy? To zwykle jedyny dzień w roku, kiedy cała firma jest w jednym miejscu. Przy okazji wydarzenia mogę zrobić sesję portretową dla całego zespołu: przywożę mobilne studio, a jedna osoba to około 5 do 15 minut, między prelekcjami albo w luźniejszym oknie agendy.",
    },
    videoId: "m42ywMWjthw",
    videoTitle: "Film z eventu firmowego dla Woohoo",
    videoNote: "Tak wygląda film z eventu: dynamiczne podsumowanie wydarzenia, gotowe do social mediów.",
    title: "Dokumentacja wydarzeń firmowych",
    shortTitle: "Wydarzenia firmowe",
    subtitle:
      "Konferencje, targi, gale i integracje. Zdjęcia, film i dron z jednego dnia, część kadrów na social media jeszcze w trakcie wydarzenia.",
    heroLabel: "Dokumentacja wydarzeń",
    // Trzy korzyści, nie trzy elementy zakresu. Treść podana przez Marcina
    // 10.08.2026 co do słowa, nie skracać „na oko": każda z nich odpowiada na
    // inne pytanie klienta (ile ekip, kiedy dostanę, co z relacją na żywo).
    heroBenefits: [
      {
        // aparat
        icon: (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
          </svg>
        ),
        text: "Zdjęcia i wideo z jednego dnia",
      },
      {
        // błyskawica = tempo dostawy
        icon: (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        ),
        text: "Materiały gotowe do szybkiej publikacji",
      },
      {
        // sygnał nadawania = relacja na żywo
        icon: (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 010-5.304m5.304 0a3.75 3.75 0 010 5.304m-7.425 2.121a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        ),
        text: "Relacja na social media podczas wydarzenia",
      },
    ],
    // Lead przepisany 10.08.2026 (pakiet 4, wersja wybrana przez Marcina).
    // Poprzedni opisywał SPOSÓB pracy („fotografuję dyskretnie, reportażowo").
    // Nowy sprzedaje WARTOŚĆ MATERIAŁU PO wydarzeniu, bo to jest argument
    // biznesowy, a nie estetyczny.
    //
    // SKRÓCONY 10.08.2026 (brief hero, punkt 5: „ogranicz wrażenie ściany
    // tekstu"). Z trzech zdań zostały dwa. Wypadło zdanie środkowe, o tym, że
    // materiał idzie do bieżącej relacji, podsumowania roku i promocji następnej
    // edycji. Nie zginęło: te trzy zastosowania stoją niżej na tej samej stronie
    // jako lista „Gdzie materiał pracuje dalej" (`applications.uses`), więc
    // w hero było ich powtórzeniem. Cztery nazwy klientów ZOSTAJĄ w komplecie:
    // to jedyny twardy dowód w tej sekcji i pokrywa dużą markę, korporację,
    // media i przemysł.
    description:
      "Konferencja, gala albo integracja trwa kilka godzin, ale materiał z niej pracuje przez kolejne miesiące. Pracowałem przy wydarzeniach dla H&M, Santander Bank Polska, Warner Music Poland i John Deere.",
    applications: {
      heading: "Dla jakich wydarzeń",
      items: [
        "Konferencje i kongresy",
        "Gale i jubileusze",
        "Targi i stoiska",
        "Szkolenia i warsztaty",
        "Premiery produktów",
        "Spotkania firmowe i integracje",
        "Wydarzenia branżowe i networkingowe",
      ],
      usesHeading: "Gdzie materiał pracuje dalej",
      // Lista celowo krótka i bez rozwinięć (Marcin, 10.08.2026: „nie
      // rozbudowujmy jej w kolejny blok SEO").
      uses: [
        "Relacja na LinkedIn i Instagram",
        "Podsumowanie roku i materiały wewnętrzne",
        "Promocja kolejnej edycji",
        "Materiały prasowe i raporty",
        "Strona wydarzenia",
      ],
    },
    scope: {
      items: [
        {
          title: "Reportaż zdjęciowy",
          desc: "Wystąpienia, prelegenci, uczestnicy, rozmowy w kuluarach, branding i przestrzeń wydarzenia. Około 30 gotowych zdjęć na każdą godzinę obecności, po selekcji i obróbce.",
        },
        {
          title: "Zdjęcia w trakcie wydarzenia",
          // Dopisany kanał publikacji (Marcin, 10.08.2026). Poprzednia wersja
          // mówiła „przesyłam do publikacji", czyli nie nazywała miejsca, w którym
          // ta publikacja ma się wydarzyć. Social media są tu konkretem: to jedyny
          // kanał, w którym zdjęcie z eventu ma sens tego samego dnia.
          desc: "Wybrane kadry obrabiam na miejscu i przesyłam w trakcie wydarzenia, więc relację na LinkedInie i Instagramie publikujesz, zanim goście wrócą do domu.",
        },
        {
          title: "Wideo",
          desc: "Film podsumowujący, pionowe reelsy, wywiady z uczestnikami i prelegentami, przebitki do dalszego montażu.",
        },
        {
          // Certyfikat A1/A3 i OC świadomie TYLKO w FAQ (Marcin, 10.08.2026):
          // sekcja zakresu nie ma być obciążona technikaliami dwa razy.
          title: "Ujęcia z powietrza",
          desc: "Skala wydarzenia plenerowego, teren, parking, ustawienie sceny. Latam dronem DJI.",
        },
        {
          title: "Portrety zespołu przy okazji",
          desc: "Event to zwykle jedyny dzień w roku, kiedy cała firma jest w jednym miejscu. Przywożę mobilne studio, potrzebuję 5 m² i gniazdka, rozstawienie zajmuje 30 minut, a jedna osoba to 5 do 15 minut między punktami agendy.",
        },
      ],
    },
    icon: (
      <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    heroImage: "/images/galeria/eventy/event-05-networking-foyer.jpg",
    heroImagePos: "center 20%",
    price: "od 600 zł netto",
    process: [
      { num: 1, title: "Rozmowa", desc: "Agenda, kluczowe momenty, VIP-y" },
      { num: 2, title: "Realizacja", desc: "Dyskretna fotografia reportażowa" },
      { num: 3, title: "Live edit", desc: "Zdjęcia na social media w trakcie eventu" },
      { num: 4, title: "Dostawa", desc: "Pełna galeria w 14 dni" },
    ],
    // Przepisane 10.08.2026. Poprzednia wersja mówiła „rozliczenie dniówką
    // wychodzi korzystniej niż sumowanie godzin", czyli odsłaniała mechanikę
    // cenową zamiast obiecywać korzyść (korekta Marcina).
    pricingBlurb:
      "Na wycenę wpływa liczba godzin obecności, to, czy dochodzi wideo i ujęcia z powietrza, oraz czy chcesz zdjęcia gotowe do publikacji jeszcze w trakcie wydarzenia. Przy dłuższych realizacjach przygotowuję korzystniejszą wycenę całościową.",
    priceFaqQuestion: "Ile kosztuje fotograf na event firmowy?",
    priceFaqIntro: "Reportaże zaczynają się",
    // Kolejność ustawiona przez Marcina 10.08.2026: od obaw BIZNESOWYCH do
    // szczegółów technicznych. Pytanie cenowe wchodzi automatycznie jako
    // pierwsze (getPriceFaq w uslugi/[slug]/page.tsx), więc tu zaczyna się
    // od drugiego w kolejności.
    //
    // USUNIĘTE 10.08.2026, świadomie:
    //  - „Czy pakiet całodniowy się opłaca?" — odpowiedź weszła jednym zdaniem
    //    do pricingBlurb („korzystniejsza wycena całościowa").
    //  - „Czy mogę dobrać zakres do mojego wydarzenia?" — mówiło to samo,
    //    co pytanie cenowe, tylko innymi słowami.
    faqs: [
      { q: "Ile zdjęć dostanę?", a: "Około 30 gotowych zdjęć na każdą godzinę obecności, po selekcji i obróbce. Przy realizacji z wideo jest ich mniej, bo część czasu idzie na nagrywanie. Dokładna liczba zależy też od skali wydarzenia i dodatkowych zadań w trakcie. To autorski wybór najlepszych momentów, a nie wszystkie wykonane kadry." },
      { q: "Czy mogę dostać zdjęcia jeszcze w trakcie wydarzenia?", a: "Tak. Wybrane kadry obrabiam na miejscu i przesyłam do publikacji. Relacja wychodzi wtedy, kiedy ludzie jeszcze siedzą na sali, a nie trzy dni później." },
      { q: "Kto robi zdjęcia i film, gdy wydarzenie jest duże?", a: "Przy standardowym wydarzeniu robię wszystko sam. Przy dużym, gdzie dwie rzeczy dzieją się naraz, biorę drugiego operatora. Retusz i montaż robię osobiście, więc materiał wychodzi w jednym standardzie. Dla Ciebie to nadal jedna osoba kontaktowa, jedne ustalenia i jedna faktura." },
      { q: "Zrobisz przy okazji zdjęcia całego zespołu?", a: "Tak. Przywożę mobilne studio: 5 m², gniazdko, 30 minut na rozstawienie. Potem fotografuję kolejne osoby po 5 do 15 minut, między prelekcjami albo w luźniejszym oknie agendy. Bez osobnego terminu i bez osobnego dojazdu." },
      { q: "Obsłużysz cykl wydarzeń?", a: "Tak. Jeśli realizacje wracają co roku, ustalamy liczbę wydarzeń z góry: rezerwuję terminy i trzymam dzisiejsze ceny na całość." },
      { q: "Fotografujesz wieczorne gale przy słabym świetle?", a: "Tak. Jasne obiektywy f/1.4 i f/2.8 pozwalają pracować bez nachalnego flesza, z zachowaniem klimatu sali. Gdy trzeba, dokładam dyskretne doświetlenie." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Dwa aparaty Canon R6 z zapisem na dwie karty, więc materiał z wydarzenia jest zabezpieczony od pierwszego kadru. Do tego jasne obiektywy Sigma, Sigma 70-200 mm f/2.8 do ujęć z dystansu, mobilne oświetlenie Godox i dron DJI Mini 5 Pro z certyfikatem A1/A3 i OC." },
    ],
    portfolioSlug: "woohoo-autopay",
    seo: {
      title: "Fotografia i wideo wydarzeń firmowych, Poznań | Szabunia",
      description: "Konferencje, targi, gale i integracje. Zdjęcia, film i dron od jednej osoby. Obsługiwałem eventy dla H&M, Santandera i Warner Music.",
    },
  },  {
    slug: "wizerunek-portrety",
    h2Process: "Jak wygląda sesja wizerunkowa",
    h2Faq: "Wizerunek firmy: najczęstsze pytania",
    h1: "Fotografia i wideo wizerunkowe dla firm",
    galleryCategory: "portrety",
    extraGallery: {
      // Po scaleniu z usługą „sesje zespołowe" (10.08.2026) pasek prowadzi
      // do filtrowanej galerii, a nie na osobną podstronę, bo tej podstrony
      // już nie ma. Href celowo pominięty: domyślny cel to /galeria?kat=zespolowe.
      category: "zespolowe",
      ctaLabel: "Zobacz sesje zespołowe",
      sub: "Headshoty całego zespołu robię w jeden dzień: przywożę mobilne studio do Twojego biura, rozstawienie zajmuje 30 minut, a jedna osoba potrzebuje 5 do 15 minut.",
    },
    title: "Fotografia i wideo wizerunkowe dla firm",
    shortTitle: "Wizerunek firmy",
    subtitle:
      "Portrety biznesowe, headshoty całego zespołu i film wizerunkowy. Prowadzę przez pozowanie, nie musisz nic umieć.",
    // Lead przepisany 10.08.2026 (pakiet 4, zatwierdzony przez Marcina bez
    // łagodzenia). Poprzedni mówił, czym JEST portret biznesowy. Nowy nazywa
    // problem, który osoba odpowiedzialna za stronę firmy realnie widzi
    // u siebie, i dopiero potem daje rozwiązanie. Konstrukcja problem →
    // rozwiązanie, nie definicja → oferta.
    //
    // Ta strona odpowiada na INNE pytanie niż Wydarzenia. Tam: „co zostaje po
    // wydarzeniu". Tu: spójność zespołu i logistyka, bo to one blokują decyzję.
    description:
      "Na zakładce „Zespół” widać wszystko: kto ma zdjęcie z sesji, kto przycięty kadr z wesela, a kto szare kółko z inicjałami. Fotografuję ludzi w firmie tak, żeby cały zespół wyglądał jak jedna firma: to samo światło, to samo tło, ten sam standard retuszu. Przyjeżdżam z mobilnym studiem do biura, więc nikt nie traci pół dnia na dojazd. Sesje zespołowe robiłem między innymi dla IDcom Group, Poznańskich Nieruchomości, Scalio i 1st Place.",
    applications: {
      heading: "Kogo fotografuję",
      items: [
        "Zarząd i kadra kierownicza",
        "Cały zespół",
        "Pojedynczy pracownicy",
        "Eksperci i osoby występujące publicznie",
        "Nowe osoby dogrywane po sesji",
        "Ludzie przy pracy",
        "Przestrzeń biura",
      ],
      usesHeading: "Gdzie te zdjęcia pracują",
      uses: [
        "Strona firmowa i zakładka „Zespół”",
        "LinkedIn i profile pracowników",
        "Oferty pracy i employer branding",
        "Prezentacje i materiały sprzedażowe",
        "Publikacje i wystąpienia",
      ],
    },
    scope: {
      items: [
        {
          title: "Portrety biznesowe",
          // ⚠ „DO 30 minut", nie „od". Cennik v3 (:92) daje w progu 700 zł
          // sesję DO 30 minut, czyli to maksimum w tej cenie, nie minimum.
          // W pierwszej wersji tego tekstu napisałem „od 30 minut", co odwracało
          // obietnicę. Nie zmieniać z powrotem bez sprawdzenia w cenniku.
          desc: "Jedna osoba, sesja do 30 minut. W cenie studio w Poznaniu albo dojazd z mobilnym studiem do Twojego biura. Prowadzę przez pozowanie, nie musisz nic umieć.",
        },
        {
          // „Dwa wyretuszowane zdjęcia na osobę" potwierdzone w cennik v3 (:322).
          // Uwaga: to warunek SESJI ZESPOŁOWEJ. PORTRET START (jedna osoba)
          // ma jedno zdjęcie (:97), więc nie mieszać tych liczb.
          title: "Sesja całego zespołu",
          desc: "Do 40 osób w jeden dzień, 5 do 15 minut na osobę. To samo tło i światło dla wszystkich, dwa wyretuszowane zdjęcia na osobę.",
        },
        {
          title: "Mobilne studio w Twoim biurze",
          desc: "Potrzebuję 5 m² i gniazdka, rozstawienie zajmuje 30 minut. Sala konferencyjna, hol albo korytarz w zupełności wystarczą.",
        },
        {
          title: "Ludzie przy pracy i przestrzeń firmy",
          desc: "Kadry pokazujące, jak firma naprawdę działa, do zakładki o nas i do ogłoszeń rekrutacyjnych.",
        },
        {
          // Wideo zostaje POZYCJĄ OFERTY, ale strona świadomie NIE MA sekcji
          // portfolio wideo (decyzja Marcina 10.08.2026, wariant 2). W repo nie
          // ma filmu wizerunkowego: są dwa eventowe, jeden przemysłowy i jeden
          // produktowy. Podpięcie któregokolwiek pod nagłówek „film wizerunkowy"
          // byłoby nieadekwatnym przykładem, a na stronie sprzedającej
          // wiarygodność to gorsze niż brak przykładu.
          // Sekcja powstanie po pierwszej realizacji wizerunkowej z materiałem.
          title: "Wideo wizerunkowe",
          desc: "Krótki film o firmie, wypowiedzi do kamery, pionowe formaty na LinkedIn. Nagrywam w tym samym dniu co zdjęcia.",
        },
        {
          title: "Dogrywki dla nowych osób",
          desc: "Kto był na urlopie albo doszedł później, dostaje krótszy termin w tym samym standardzie. Zespół nie rozjeżdża się po pół roku.",
        },
      ],
    },
    icon: (
      <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    heroImage: "/images/galeria/portrety/portret-05-mezczyzna-zielony-garnitur.jpg",
    heroImagePos: "center 20%",
    // Próg wejściowy obniżony 04.08.2026 decyzją Marcina: PORTRET START 700 zł netto
    // (1 osoba, sesja do 30 min, w cenie studio zewnętrzne w Poznaniu ALBO dojazd
    // z mobilnym studiem do klienta). Kanon: cennik_2026_07_v3.md §1.
    // UWAGA: to pole zasila też `minPrice` w JSON-LD (uslugi/[slug]/page.tsx wyciąga regexem
    // pierwszą liczbę), więc dane strukturalne schodzą z 1100 na 700. Zamierzone i prawdziwe.
    price: "od 700 zł netto",
    heroPriceLabel: "od 700 zł netto",
    process: [
      // Proces przepisany 10.08.2026 pod scaloną usługę. Poprzedni opisywał
      // wyłącznie sesję JEDNEJ osoby (konsultacja, poseboard), a od scalenia
      // ta strona sprzedaje przede wszystkim sesję całego zespołu, gdzie
      // decyduje logistyka: ile osób, kiedy, jak długo bez pracy.
      { num: 1, title: "Ustalenia", desc: "Liczba osób, harmonogram, miejsce i to, gdzie zdjęcia mają trafić" },
      { num: 2, title: "Rozstawienie", desc: "Przyjeżdżam wcześniej, studio stoi gotowe, zanim wejdzie pierwsza osoba" },
      { num: 3, title: "Sesja", desc: "5 do 15 minut na osobę, między spotkaniami, bez wyrywania zespołu z pracy" },
      { num: 4, title: "Dostawa", desc: "Wyretuszowane zdjęcia w 14 dni, film w 21 dni" },
    ],
    // Przepisane 10.08.2026 (pakiet 4). Wchłonęło treść osobnego pytania
    // „Gdzie znajdę cennik sesji wizerunkowej?", które przez to znika z listy.
    //
    // ⚠ TO NIE JEST cofnięcie decyzji z 02.08.2026. Tamto pytanie powstało
    // z policzalnego powodu: klaster cenowy tej usługi ma 402 wyświetlenia
    // w 90 dni, a warianty ze słowami „cena", „ceny" i „cennik" stały na
    // pozycjach 32,0-38,8, bo tych słów nie było na stronie ani razu.
    // Słowa nie znikają, tylko przenoszą się tutaj: „Ceny" niesie priceFaqIntro,
    // „Cennika" i „cena" są w zdaniu niżej, „kosztuje" w priceFaqQuestion.
    // Przy edycji NIE usuwać zdania o braku tabeli, bo razem z nim wypadną
    // dwie z czterech fraz.
    pricingBlurb:
      "Na wycenę wpływa liczba osób, długość sesji, liczba stylizacji i liczba zdjęć wybranych do retuszu. Cennika w formie tabeli nie ma, bo przy tej samej liczbie ujęć cena wygląda inaczej dla jednej osoby i inaczej dla dziesięcioosobowego zespołu.",
    priceFaqQuestion: "Ile kosztuje sesja wizerunkowa dla firmy?",
    priceFaqIntro: "Ceny portretów dla jednej osoby zaczynają się",
    // Brzmienie z 04.08.2026, podyktowane przez Marcina: „ceny portretów dla jednej osoby
    // startują od 700 zł netto, a dla zespołów od 120". NIE dopisuj „za pierwsze zdjęcie"
    // ani „za jedno ujęcie" — obie formy zostały wprost odrzucone. Kwoty pakietów świadomie
    // tu nie wchodzą: prośba Marcina, żeby nie kotwiczyć klienta stosem liczb w pierwszym
    // zdaniu. Rozwinięcie jest niżej, w osobnym pytaniu FAQ.
    priceFaqSuffix: ", a sesja zespołowa od 1 400 zł netto za dwie osoby",
    // Kolejność 10.08.2026 (pakiet 4, zatwierdzona przez Marcina): od obaw
    // logistycznych i o spójność, przez obiekcję „nie umiem pozować", po
    // warunki i technikalia. Pytanie cenowe wchodzi automatycznie jako pierwsze.
    //
    // USUNIĘTE przy przepisywaniu, świadomie:
    //  - „Gdzie znajdę cennik sesji wizerunkowej?" — wchłonięte przez pricingBlurb,
    //    razem ze wszystkimi czterema frazami cenowymi (patrz nota wyżej).
    //  - „Ile trwa sesja wizerunkowa?" — czas jest dziś w „Zakresie realizacji"
    //    („sesja do 30 minut"), a stara odpowiedź mówiła „od 30 minut", czyli
    //    odwrotnie niż cennik v3 (:92).
    //  - „W jakich formatach dostarczasz wideo?" i „Czy mogę zamówić sam montaż?"
    //    — przeniesione tu w pakiecie 1 z usługi „wideo marketing". Ta strona nie
    //    ma sekcji portfolio wideo, więc dwa pytania techniczne o wideo stały
    //    w niej bez kontekstu. Wrócą razem z sekcją wideo.
    faqs: [
      { q: "Ile osób sfotografujesz w jeden dzień?", a: "Do 40 przy mobilnym studiu. Jedna osoba potrzebuje 5 do 15 minut, więc sesja wchodzi między spotkania i nie blokuje nikomu dnia." },
      { q: "Co z osobami, których nie ma w dniu sesji?", a: "Dogrywam je w osobnym, krótszym terminie, w tym samym świetle i tym samym retuszu. To częsta sytuacja przy pracy zdalnej i większych zespołach." },
      { q: "Czy zdjęcia całego zespołu będą wyglądać spójnie?", a: "Tak, i to jest właściwie cały sens tej usługi. Identyczne oświetlenie, to samo tło, ten sam standard obróbki. Na stronie widać wtedy firmę, a nie zbiór przypadkowych zdjęć." },
      // Zdanie o studiu przepisane przez Marcina 10.08.2026. Poprzednia wersja
      // („w cenie startowej masz studio…") dawała się czytać tak, jakby studio
      // było dostępne WYŁĄCZNIE w progu startowym.
      { q: "Sesja u nas w biurze czy w studiu?", a: "Jak wolisz. Przy jednej osobie możesz wybrać studio w Poznaniu albo mój dojazd z mobilnym studiem. Przy większym zespole biuro wychodzi zwykle taniej i szybciej, bo nikt nie musi nigdzie jechać." },
      // Głos strony, nie nowy tekst: oba zdania są wzorcami z docs/zasady-tekstow.md.
      { q: "Nie umiem pozować i źle wypadam na zdjęciach.", a: "Słyszę to bardzo często i za każdym razem efekt pozytywnie zaskakuje. Nie musisz być modelem, wystarczy być sobą. Reszta to moja robota." },
      // Licencja sprawdzona 10.08.2026 wobec src/data/faq.ts:60 — ta sama
      // obietnica stoi już na produkcji, więc to nie jest nowe zobowiązanie.
      { q: "Kiedy dostanę zdjęcia i czy mogę ich używać bez ograniczeń?", a: "Wyretuszowane zdjęcia w 14 dni, ekspres do 48h za dopłatą. Licencja obejmuje użytek komercyjny bez ograniczeń czasowych: strona, social media, druk, reklama." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Canon R6 z zapisem na dwie karty, Sigma 70-200 mm f/2.8 jako podstawowy obiektyw portretowy, bo dłuższa ogniskowa nie zniekształca rysów twarzy, i studyjne oświetlenie Godox. Do biura przywożę cały zestaw ze sobą." },
    ],
    portfolioSlug: "idcom-headshoty-zespolu",
    seo: {
      title: "Fotografia i wideo wizerunkowe dla firm, Poznań | Szabunia",
      description: "Portrety biznesowe, headshoty zespołu i film wizerunkowy. Sesja w studiu albo mobilne studio w Twoim biurze. Poznań i cała Polska.",
    },
  },  {
    slug: "fotografia-produktowa",
    h2Process: "Jak wygląda sesja packshotowa",
    // Zmienione 10.08.2026: „packshoty" ZOSTAJE, bo odpowiada za istotną część
    // ruchu organicznego na tej usłudze, ale wchodzi w nową nazwę usługi zamiast
    // stać obok niej (decyzja Marcina).
    h2Faq: "Packshoty i fotografia produktowa: najczęstsze pytania",
    h1: "Fotografia i wideo produktowe",
    galleryCategory: "produktowe",
    extraGallery: {
      // Href zdjęty 10.08.2026: prowadził na usuniętą podstronę „wideo marketing".
      // Wideo produktowe jest dziś zakresem tej usługi, więc pasek prowadzi
      // do filtrowanej galerii (/galeria?kat=wideo-produktowe).
      category: "wideo-produktowe",
      ctaLabel: "Zobacz realizacje wideo",
    },
    title: "Fotografia i wideo produktowe",
    shortTitle: "Fotografia produktowa",
    subtitle:
      "Packshoty na białym tle z retuszem w cenie, zdjęcia kreatywne i wideo produktowe pod e-commerce, katalogi i social media.",
    // Lead przepisany 10.08.2026 (pakiet 4, wersja zatwierdzona przez Marcina).
    // Retusz w cenie wyszedł z siódmej pozycji FAQ do leadu, bo to jedyny
    // element tej strony, który jest twardą przewagą, a nie opisem usługi.
    //
    // ⚠ BEZ porównania do konkurencji („w przeciwieństwie do wielu studiów…").
    // Decyzja Marcina: mówimy, CO klient dostaje, zamiast twierdzić coś o cudzych
    // cennikach, których nie znamy. Ta sama zasada obowiązuje w FAQ o retuszu.
    //
    // ⚠ Volvo NIE jest nazwane, mimo trzech kadrów w galerii (`produkt-22/23/24`).
    // Sprawdzone 10.08.2026: nazwa nie występuje w logotypach, portfolio ani
    // w opisach alternatywnych, więc nie ma źródła na relację klienta.
    description:
      "W sklepie internetowym zdjęcie jest jedynym, czego klient może dotknąć. Fotografuję produkty na białym tle do kart produktowych i marketplace\'ów oraz kreatywnie, z aranżacją, do reklam i social mediów. Retusz jest w cenie każdego zdjęcia: produkt wycięty z tła, czyste białe tło zgodne z wymogami Allegro i Amazon oraz korekta kolorów. Nie doliczam osobnej pozycji za obróbkę. Fotografowałem produkty dla Artech Group, marek odzieżowych, producentów części i lokali gastronomicznych.",
    applications: {
      heading: "Co fotografuję",
      items: [
        "Packshoty na białym tle",
        "Produkty w aranżacji",
        "Zdjęcia reklamowe",
        "Moda i odzież",
        "Kosmetyki i biżuteria",
        "Jedzenie i napoje",
        "Części i produkty techniczne",
        "Wideo produktowe",
      ],
      usesHeading: "Gdzie te zdjęcia pracują",
      uses: [
        "Karty produktów w sklepie",
        "Allegro, Amazon i inne marketplace\'y",
        "Katalogi i materiały sprzedażowe",
        "Reklamy i kampanie",
        "Social media",
        "Strona marki",
      ],
    },
    scope: {
      items: [
        {
          title: "Packshoty na białym tle",
          desc: "Powtarzalny setup i ta sama stylistyka między partiami. 30 do 50 produktów dziennie. Czyste białe tło zgodne z wymogami Allegro i Amazon, na życzenie przezroczyste PNG.",
        },
        {
          title: "Retusz w cenie każdego zdjęcia",
          desc: "Wycięcie produktu z tła, korekta kolorów, usunięcie drobnych skaz. Bez osobnej pozycji na fakturze.",
        },
        {
          title: "Produkty w aranżacji",
          desc: "Scenografia, rekwizyty, stylizacja i światło pod charakter marki. 8 do 15 ujęć dziennie, bo każde wymaga osobnego ustawienia.",
        },
        {
          // Pole eksploatacji zamiast kwot: cennik v3 §7 wprost zakazuje
          // podawania stawek jednostkowych na powierzchniach klienckich.
          title: "Zdjęcia reklamowe",
          desc: "Koncepcja, moodboard i aranżacja pod konkretną kampanię. Wyceniam według pola eksploatacji: inaczej na social media, inaczej do druku i na outdoor.",
        },
        {
          title: "Jedzenie i napoje",
          desc: "Dania, produkty spożywcze i menu. Ten sam warsztat co przy produktach, tylko z krótszym oknem na kadr.",
        },
        {
          title: "Wideo produktowe",
          desc: "Krótkie filmy pokazujące produkt, jego użycie i detale. Formaty pionowe i poziome, zależnie od kanału.",
        },
        {
          title: "Logistyka",
          desc: "Produkty do 20×20 cm przyślij kurierem. Przy większych przyjeżdżam ze studiem mobilnym albo rezerwuję studio zewnętrzne.",
        },
      ],
    },
    icon: (
      <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    heroImage: "/images/galeria/produktowe/produkt-02-amarula.jpg",
    price: "od 600 zł netto",
    process: [
      { num: 1, title: "Rozmowa", desc: "Cel, platforma sprzedaży, wytyczne marki" },
      { num: 2, title: "Sesja", desc: "Fotografowanie w studiu z kontrolą światła" },
      { num: 3, title: "Retusz", desc: "Wycięcie z tła, korekta kolorów, białe tło" },
      { num: 4, title: "Dostawa", desc: "Pliki gotowe do użycia w 14 dni" },
    ],
    pricingBlurb:
      "Wycena zależy od liczby produktów, rodzaju ujęć (packshot na białym tle albo zdjęcia kreatywne z aranżacją) oraz pola eksploatacji: inaczej wyceniam zdjęcia na social media, inaczej do druku i outdooru. Większe zamówienia rozliczam progresywnie.",
    priceFaqQuestion: "Ile kosztuje packshot i sesja produktowa?",
    priceFaqIntro: "Sesje produktowe zaczynają się",
    priceFaqSuffix: " i tyle wynosi też minimalna wartość zamówienia",
    // Kolejność 10.08.2026 (pakiet 4): cena, potem retusz jako druga najmocniejsza
    // rzecz na tej stronie, dalej skala zlecenia, logistyka i technikalia.
    //
    // USUNIĘTE: „Ile produktów dziennie" w starej formie zostało scalone z tym
    // samym konkretem w „Zakresie realizacji", a odpowiedź o retuszu straciła
    // porównanie do konkurencji („w przeciwieństwie do wielu studiów, gdzie
    // retusz to dodatkowy koszt"). Decyzja Marcina: mówimy, co klient dostaje,
    // nie co robią inni. Nie przywracać.
    faqs: [
      { q: "Czy retusz jest wliczony w cenę zdjęcia?", a: "Tak. Każdy packshot dostajesz wyretuszowany: czyste białe tło, produkt precyzyjnie wycięty z tła, korekta kolorów i usunięcie drobnych skaz. Obróbka nie jest osobną pozycją na fakturze." },
      { q: "Ile produktów zrobisz w jeden dzień?", a: "Packshoty na białym tle: 30 do 50 produktów. Zdjęcia w aranżacji: 8 do 15 ujęć, bo każde wymaga osobnego ustawienia." },
      { q: "Czy mogę przysłać produkty kurierem?", a: "Tak, produkty do 20×20 cm przyjmuję do studia. Przy większych przyjeżdżam ze studiem mobilnym albo rezerwujemy studio zewnętrzne. Koszt przesyłki zwrotnej ustalamy przy wycenie." },
      { q: "Czym różni się fotografia produktowa od reklamowej?", a: "Produktowa pokazuje produkt wprost: packshot do sklepu albo katalogu. Reklamowa buduje wokół niego historię, z aranżacją i rekwizytami, pod konkretną kampanię. Reklamowe wyceniam według pola eksploatacji, bo inna jest wartość zdjęcia na Instagramie, a inna na billboardzie." },
      { q: "Jakie pliki dostanę?", a: "JPEG w pełnej rozdzielczości plus wersja pod stronę. Na życzenie PNG z przezroczystym tłem i TIFF do druku." },
      { q: "Czy realizujesz wideo produktowe?", a: "Tak, krótkie filmy pokazujące produkt, jego użycie i detale, a także spoty pod kampanie w social mediach. Przykłady są w pasku wideo wyżej." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Canon R6, obiektywy do detalu i packshotu, stół bezcieniowy i studyjne oświetlenie ciągłe LED Godox. Ten sam zestaw nagrywa wideo produktowe. Powtarzalny setup pozwala dokładać kolejne produkty do katalogu w tej samej stylistyce, nawet pół roku później." },
    ],
    portfolioSlug: "artech-fotografia-produktowa",
    seo: {
      title: "Fotografia i wideo produktowe, Poznań | Szabunia",
      description: "Packshoty na białym tle i zdjęcia produktowe w studiu w Poznaniu. E-commerce, katalogi, social media. Retusz w cenie zdjęcia.",
    },
  },  {
    // Slug zmieniony 10.08.2026 z `wnetrza-obiekty-architektura`. Stary adres
    // nie obejmował ani przemysłu, ani drona, a oba są dziś rdzeniem tej usługi.
    // Przekierowanie 301 ze starego adresu (i z usuniętego `zdjecia-wideo-z-drona`)
    // stoi w next.config.ts.
    slug: "nieruchomosci-przemysl",
    h2Process: "Jak wygląda sesja obiektu",
    h2Faq: "Nieruchomości i przemysł: najczęstsze pytania",
    h1: "Fotografia i wideo nieruchomości i przemysłu",
    // Zamienione 04.08.2026, gdy do public/images/galeria/wnetrza trafiło 12 kadrów
    // (magazyn H&M/Sellpy, lokal Yes Butcher, lokal Domu). Wcześniej odwrotnie:
    // główny pasek pokazywał bryły z powietrza, bo wnętrz w serwisie nie było wcale,
    // a podstrona o wnętrzach pokazywała sześć budynków z lotu ptaka.
    galleryCategory: "wnetrza",
    // DRUGI PASEK: przywrócony i ZATWIERDZONY przez Marcina 10.08.2026.
    // Kontekst historyczny: 04.08.2026 pasek został stąd zdjęty („nie potrzeba
    // przykładów z galerii Obiekty i architektura"), a z podstrony dronowej
    // zdjęto pasek z wnętrzami. Obie decyzje miały sens, gdy dron był OSOBNĄ
    // usługą i każda strona pokazywała swoje.
    // Od 10.08 dron nie ma własnej podstrony i wchodzi tutaj. Decyzja Marcina:
    // „galeria ujęć z powietrza powinna zostać na tej stronie, nie jako promocja
    // osobnej usługi dronowej, tylko jako element oferty nieruchomości i przemysłu".
    extraGallery: {
      category: "dron",
      ctaLabel: "Zobacz ujęcia z drona",
      sub: "Bryłę, plac manewrowy i otoczenie obiektu pokazuję z powietrza. Latam dronem DJI Mini 5 Pro, mam certyfikat operatora A1/A3 i ubezpieczenie OC, a koordynację lotu w strefach kontrolowanych biorę na siebie.",
    },
    // Artech Group: jedyny materiał w portfolio nakręcony WEWNĄTRZ zakładu
    // produkcyjnego, a nie z powietrza. Do czasu wrzucenia zdjęć wnętrz jest to
    // na tej podstronie jedyny dowód, że wnętrza obiektów faktycznie fotografuję
    // i filmuję. Ten sam film stoi w case study `artech-fotografia-produktowa`.
    videoId: "ivvZQ5lQ7FE",
    videoTitle: "Artech Group: film z hali produkcyjnej",
    videoNote:
      "Hala Artech Group od środka: park maszynowy, obróbka CNC i to, jak zakład naprawdę pracuje. Zakład da się pokazać tak samo zdjęciami, jak i filmem, w tym samym dniu zdjęciowym.",
    title: "Fotografia i wideo nieruchomości i przemysłu",
    shortTitle: "Nieruchomości i przemysł",
    // Podtytuł przepisany 04.08.2026 razem z opisem. Poprzedni („Dwie perspektywy
    // z jednego planu: z powietrza i z poziomu ziemi") stawiał drona na pierwszym
    // miejscu, a podstrona pokazuje dziś wnętrza i film z hali. Ten sam tekst leci
    // na kafelek na stronie głównej i na /uslugi.
    // TRESC2608-51 (04.08.2026), TEKST WŁASNY DO AKCEPTACJI. Poprzedni podtytuł
    // („Z zewnątrz i od środka, w jednym dniu zdjęciowym") stał w hero obok kotwicy
    // „pakiety od 900 zł netto", a za 900 zł nie ma ani jednego kadru naziemnego:
    // OBIEKT PODSTAWOWY to do 8 ujęć z powietrza, blok wnętrz to osobne 600 zł.
    // Nowy podtytuł stawia powietrze jako punkt wyjścia, a ziemię i wnętrza jako
    // dokładkę. `heroPriceLabel` NIE ruszony: to komunikat cenowy i osobna decyzja.
    // Przepisany 10.08.2026 (pakiet 4). Poprzedni („Hale, lokale użytkowe
    // i wnętrza obiektów. Zaczynam od ujęć z powietrza, kadry z poziomu ziemi
    // i wnętrza dokładam w tym samym dniu zdjęciowym") powstał 04.08, gdy dron
    // był OSOBNĄ usługą, i tłumaczył kolejność moich czynności, która dla
    // klienta nic nie znaczy. Był też najdłuższy z czterech podtytułów, przez
    // co kafelek na mobile był o 21 px wyższy od pozostałych.
    // Nowy wymienia oba segmenty z nazwy usługi i mówi o rezultacie.
    subtitle:
      "Hale, zakłady, biurowce i inwestycje. Z powietrza, z poziomu ziemi i od środka, w jednym dniu zdjęciowym.",
    // Lead przepisany 10.08.2026 (pakiet 4, wersja zatwierdzona przez Marcina).
    // Poprzedni otwierał zdaniem o hali, czyli sprzedawał TYLKO przemysł, mimo
    // że usługa nazywa się „Nieruchomości i przemysł". Nowy otwiera problemem
    // wspólnym dla obu segmentów: obiekt jest oceniany zdalnie, z ogłoszenia
    // albo z prezentacji, zanim ktokolwiek go zobaczy. Insight o hali od środka
    // zostaje, ale jako trzeci poziom widzenia, nie jako całość.
    //
    // Dwa dowody, po jednym na segment: Artech Group daje przemysł, Yes Butcher
    // z Michelinem daje wnętrza komercyjne i jakość. H&M/Sellpy świadomie NIE
    // dopisany: lead ma nie być listą klientów (decyzja Marcina).
    description:
      "Inwestycja, hala albo lokal sprzedaje się zdjęciami, zanim ktokolwiek pojedzie je obejrzeć. Fotografuję obiekty z trzech poziomów w jednym dniu zdjęciowym: z powietrza widać skalę i otoczenie, z poziomu ziemi bryłę i wjazd, a od środka to, czego z góry nie widać nigdy. Ile naprawdę jest miejsca między regałami, jak szeroki jest ciąg komunikacyjny, czy w lokalu da się posadzić trzydzieści osób. Pracuję dla deweloperów, agencji nieruchomości, zarządców biurowców, hoteli, architektów i zakładów produkcyjnych. Dla Artech Group fotografowałem zakład produkcyjny, a wnętrza steakhouse\'u Yes Butcher! w Starych Koszarach trafiły na profil restauracji w przewodniku Michelin.",
    applications: {
      heading: "Co fotografuję",
      // Hale i zakłady NA POCZĄTKU listy, tą samą zasadą co kolejność galerii:
      // klient przemysłowy ma zobaczyć swój obiekt w pierwszej linii, a nie
      // po czterech pozycjach o mieszkaniówce.
      items: [
        "Hale i magazyny",
        "Zakłady produkcyjne",
        "Biurowce i powierzchnie komercyjne",
        "Inwestycje mieszkaniowe",
        "Lokale gastronomiczne i hotele",
        "Place, tereny i infrastruktura",
        "Postęp budowy",
      ],
      usesHeading: "Gdzie ten materiał pracuje",
      uses: [
        "Oferty najmu i sprzedaży",
        "Strona inwestycji i materiały dla inwestorów",
        "Prezentacje, katalogi i przetargi",
        "Dokumentacja postępu budowy",
        "Strona firmy produkcyjnej",
        "Portale ogłoszeniowe",
      ],
    },
    scope: {
      items: [
        {
          // ⚠ BEZ KWOTY. Kwota 900 zł stoi już w kotwicy, w pytaniu cenowym
          // i w pytaniu „tylko dron". Czwarte powtórzenie nic nie dodaje,
          // a sekcja zakresu ma mówić, CO klient dostaje, nie ile to kosztuje
          // (decyzja Marcina, 10.08.2026).
          //
          // ⚠ BEZ „calowej matrycy". Sprawdzone 10.08.2026: rozmiar matrycy nie
          // występuje w ŻADNYM dokumencie kanonicznym. Kanon potwierdza 50 Mpix
          // (wycena SCALIO 2026-07-28 i WERANDA 2026-08-03) oraz sub-249 g,
          // kategorię otwartą i certyfikat A1/A3 (faq_klienta.md:43 i :201).
          // Nie dopisywać rozmiaru matrycy bez źródła.
          title: "Ujęcia z powietrza",
          desc: "Bryła, plac manewrowy, otoczenie i układ terenu. Dron DJI Mini 5 Pro, 50 Mpix.",
        },
        {
          title: "Kadry z poziomu ziemi",
          desc: "Elewacja, wjazd, detal konstrukcji. Praca ze statywu i ze światłem zastanym, żeby budynek wyglądał jak w rzeczywistości, a nie jak wizualizacja.",
        },
        {
          title: "Wnętrza",
          desc: "Blok do 10 ujęć w jednym obiekcie: hala od środka, magazyn, lokal, biuro. Do dołożenia do sesji obiektu albo do zamówienia osobno.",
        },
        {
          title: "Wideo obiektu",
          desc: "Film o zakładzie, przelot nad inwestycją, materiał łączący ujęcia z powietrza z naziemnymi. Do prezentacji, na stronę i do oferty najmu.",
        },
        {
          title: "Dokumentacja postępu budowy",
          desc: "Stały punkt, stała pora, powtarzalny kadr. Ujęcia składają się w sekwencję, a nie w zbiór przypadkowych zdjęć.",
        },
        {
          title: "Retusz architektoniczny",
          desc: "Korekta perspektywy, prostowanie linii, czyszczenie kadru. Pliki dostajesz w dwóch wersjach: do druku i pod stronę.",
        },
      ],
    },
    icon: (
      <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    // Okładka: jasna hala magazynowa z bramkami (wybór Marcina, 04.08.2026).
    // Wcześniej biurowiec z drona, czyli ta sama historia co pasek obiektowy niżej.
    // UWAGA: ten sam plik stoi trzeci w galerii wnętrz (układ ustawiony przez
    // Marcina 04.08.2026: rząd 1 hale, rząd 2 obiekt i strefy wspólne, rząd 3 lokale).
    // Przy przenumerowaniu folderu sprawdź tę ścieżkę, bo się rozjedzie po cichu.
    heroImage: "/images/galeria/wnetrza/wnetrze-03-hala-bramki-wejsciowe.jpg",
    price: "od 900 zł netto",
    heroPriceLabel: "pakiety od 900 zł netto",
    process: [
      { num: 1, title: "Ustalenia", desc: "Co ma być widać: bryła, elewacja, wnętrza, kontekst lokalizacji" },
      { num: 2, title: "Zgody", desc: "Strefę lotu sprawdzam i koordynuję przed potwierdzeniem daty" },
      // Krok 3 przepisany 10.08.2026: „powietrze, ziemia i wnętrza w jednym
      // wyjeździe" niesie realną korzyść (jeden dojazd, jedno przerwanie pracy
      // zakładu), a poprzednia wersja wymieniała sam sprzęt.
      { num: 3, title: "Dzień zdjęciowy", desc: "Powietrze, ziemia i wnętrza w jednym wyjeździe" },
      { num: 4, title: "Dostawa", desc: "Retusz architektoniczny, pliki do druku i pod www w 14 dni, film w 21" },
    ],
    // Zdanie o tańszym wariancie dronowym USUNIĘTE 10.08.2026 decyzją Marcina.
    // Historia: przy scalaniu usług dopisałem tu „ujęcia z powietrza od 700 zł",
    // bo taka była kotwica usuniętej usługi dronowej i bez tego słowo „od 900"
    // byłoby nieprawdziwe. Marcin rozstrzygnął to inaczej i lepiej: zamiast
    // tłumaczyć tańszy wariant, PODNIÓSŁ ujęcia z powietrza do 900 zł netto.
    // Jedna kwota na usługę, zero drabinek — zgodnie z decyzją z 04.08.2026.
    pricingBlurb:
      "Wycena zależy od liczby ujęć i od tego, czy dochodzą kadry z poziomu ziemi oraz blok wnętrz. Drugi obiekt tego samego typu w tym samym dniu jest tańszy, bo profil korekcji perspektywy jest już gotowy. Przy obiektach w strefach kontrolowanych koordynację lotu biorę na siebie.",
    priceFaqQuestion: "Ile kosztuje sesja obiektu?",
    priceFaqIntro: "Pakiety obiektowe zaczynają się",
    // Kolejność 10.08.2026 (pakiet 4, zatwierdzona przez Marcina): od zakresu
    // dostawy, przez wariant „tylko dron" i koszt drugiego obiektu, po zgody,
    // termin, wnętrza, pogodę i sprzęt. Pytanie cenowe wchodzi automatycznie
    // jako pierwsze.
    //
    // USUNIĘTE przy przepisywaniu, świadomie:
    //  - „Czy loty dronem są legalne i ubezpieczone?" — wchłonięte przez pytanie
    //    „Czy dron poleci nad naszą halą?", gdzie certyfikat i OC padają w tym
    //    samym zdaniu co odpowiedź na realną obawę klienta.
    //  - „W jakiej jakości dostarczasz materiał z powietrza?" — treść o surowych
    //    przebitkach do własnego montażu przeniesiona do wariantów wyceny.
    //  - „Fotografujesz hale magazynowe i lokale użytkowe pod wynajem?" —
    //    pokrywa się z listą „Co fotografuję" i z pytaniem o wnętrza.
    faqs: [
      { q: "Ile ujęć dostanę?", a: "Pakiet podstawowy to do 8 ujęć z powietrza. Kompletny do 14: osiem z powietrza i sześć z poziomu ziemi. Pełny do 24, z blokiem wnętrz. Każde dodatkowe ujęcie ponad pakiet wyceniam osobno." },
      // Odpowiedź uproszczona przez Marcina 10.08.2026. Poprzednia zaczynała się
      // od porównania („tak samo jak sesja obiektu"), zamiast wprost odpowiedzieć
      // na zadane pytanie.
      { q: "Potrzebuję tylko ujęć z powietrza, bez wnętrz. Ile to kosztuje?", a: "Tak, same ujęcia z powietrza zaczynają się od 900 zł netto. W podstawowym zakresie fotografuję bryłę obiektu, plac manewrowy i otoczenie. Kadry z poziomu ziemi, wnętrza i film można dołączyć do realizacji zależnie od potrzeb." },
      { q: "Mamy dwa takie same budynki. Płacę dwa razy?", a: "Nie. Drugi obiekt tego samego typu, fotografowany tego samego dnia, jest wyraźnie tańszy, bo profil korekcji perspektywy jest gotowy z pierwszego i postprodukcja idzie szybciej. Warunek to ten sam dzień zdjęciowy. Osobny wyjazd to pełna stawka plus dojazd." },
      { q: "Czy dron poleci nad naszą halą?", a: "W standardowych lokalizacjach tak, bez dopłat. Mam certyfikat operatora A1/A3 i ubezpieczenie OC. W strefach kontrolowanych, na przykład przy lotnisku albo jednostce wojskowej, koordynację biorę na siebie i sprawdzam ją przed potwierdzeniem daty. Zgoda bywa terminowa, więc warto zgłosić się z wyprzedzeniem." },
      { q: "Kiedy najlepiej fotografować obiekt?", a: "Tuż przed odbiorem albo zaraz po nim. Elewacja jest wtedy czysta, plac jeszcze niezastawiony, a w środku nie ma rzeczy najemcy. Przy budowie, którą chcesz dokumentować w czasie, umawiamy stały punkt i stałą porę." },
      { q: "Fotografujesz też wnętrza biur i lokali?", a: "Tak, jako blok wnętrz do 10 ujęć w jednym obiekcie. Pracuję ze światłem zastanym, żeby wnętrze wyglądało jak w rzeczywistości. Blok można dołożyć do sesji obiektu albo zamówić osobno." },
      { q: "Co jeśli pogoda nie dopisze?", a: "Silny wiatr lub opady uniemożliwiają bezpieczny lot. W takiej sytuacji wracam raz w ramach ustalonej kwoty, kolejne podejście to 300 zł plus dojazd." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Dron DJI Mini 5 Pro, 50 Mpix, poniżej 249 g, czyli kategoria otwarta, do tego certyfikat operatora A1/A3 i ubezpieczenie OC. Z poziomu ziemi Canon R6 na statywie, obiektywy szerokie do wnętrz i elewacji." },
    ],
    seo: {
      title: "Fotografia nieruchomości i przemysłu, Poznań | Szabunia",
      description: "Zdjęcia i wideo hal, budynków i wnętrz, z powietrza i z poziomu ziemi. Retusz architektoniczny, pliki do druku i pod www. Poznań i cała Polska.",
    },
  },
];

// Kolejność wyświetlania usług (kafelki na stronie głównej, lista /uslugi,
// sekcja Wycena, sitemap). Zmiana tutaj zmienia kolejność wszędzie naraz.
// TA STAŁA RZĄDZI, nie kolejność bloków w serviceCategoriesRaw wyżej.
//
// Przebudowa na CZTERY USŁUGI, 10.08.2026 (decyzja Marcina, na podstawie
// „FUNDAMENTY FIRMY.md" i „OFERTA USŁUG.md"). Osiem linii zwinięte do czterech:
//   eventy + pakiety hybrydowe            → wydarzenia firmowe
//   portrety + sesje zespołowe + wideo    → wizerunek firmy
//   obiekty + dron                        → nieruchomości i przemysł
//   produktowa + wideo produktowe         → fotografia produktowa
//
// Kolejność ustawiona przez Marcina 10.08.2026: wydarzenia, wizerunek,
// nieruchomości, produkty. Wydarzenia pierwsze, bo są wejściem do lejka
// (10 z 11 realizacji referencyjnych to eventy, korekta_pozycjonowania_2026-07.md §1),
// wizerunek drugi, bo sprzedaje się tej samej osobie z HR co event.
//
// GEOMETRIA SIATKI: cztery równe kafelki w układzie 2×2 (Services.tsx).
// Flaga `wide` i plakietka „Bestseller" NIE SĄ już używane — pierwsza dlatego,
// że przy czterech kafelkach nie ma sieroty do załatania, druga dlatego, że
// dotyczyła wyłącznie usuniętej usługi „pakiety foto + wideo".
const SERVICE_DISPLAY_ORDER: string[] = [
  "eventy-reportaze",
  "wizerunek-portrety",
  "nieruchomosci-przemysl",
  "fotografia-produktowa",
];

// Usługi gotowe w danych, ale świadomie niepublikowane. Ten sam wzorzec, co
// DRAFT_SLUGS w portfolio.ts. Wpis tutaj powoduje, że usługa znika z kafelków
// na stronie głównej i na /uslugi, z generateStaticParams (trasa zwraca 404)
// i z sitemapy. Dane zostają nietknięte — powrót to usunięcie jednej linii.
const DRAFT_SERVICE_SLUGS = new Set<string>([
  // Pusty od 04.08.2026. Linia obiektowa („Wnętrza, obiekty i architektura")
  // była tu od 31.07.2026, wyłączona decyzją Marcina przed pierwszym deployem.
  // Włączona z powrotem na jego prośbę 04.08.2026. Warunek z pierwotnej notatki
  // sprawdzony przed włączeniem: przy ośmiu usługach dwa dolne kafelki mają
  // wide: true (obiekty i pakiety), więc w ostatnim rzędzie nie ma sieroty.
  // Kotwica 900 zł, pakiety 900/1300/1900, uzasadnienie ceny w
  // 01_Biznes/_System/02_Cenniki/brief_linia_obiektowa_2026-07-31.md.
]);


export const serviceCategories: ServiceData[] = [...serviceCategoriesRaw]
  .filter((s) => !DRAFT_SERVICE_SLUGS.has(s.slug))
  .sort((a, b) => SERVICE_DISPLAY_ORDER.indexOf(a.slug) - SERVICE_DISPLAY_ORDER.indexOf(b.slug));

/* ── Helpers ── */

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return serviceCategories.find((s) => s.slug === slug);
}

// Wspólne zamknięcie dla FAQ cenowego (obietnica 24h powtarzana świadomie
// w całym lejku — brief-22 §2). Jedna zmiana tutaj aktualizuje wszystkie 7 usług.
const PRICE_FAQ_CLOSING = "Napisz w kilku zdaniach, czego potrzebujesz. Wstępną wycenę odsyłam w 24h.";

// Pytanie cenowe budowane z danych usługi (price + pricingBlurb), nie
// hardkodowane per usługa — zmiana ceny lub pricingBlurb aktualizuje FAQ
// wszędzie naraz (brief-22 zad. 4).
export function getPriceFaq(service: ServiceData): FAQItem {
  // Drugie miejsce z tym samym błędem co hero (analiza lejka 2026-08-02):
  // pola `price` niosą już słowo „netto" od czasu wyrównania kotwic cenowych,
  // a szablon doklejał je jeszcze raz. Efekt na produkcji: „Reportaże zaczynają
  // się od 600 zł netto netto." w widocznym FAQ ORAZ w JSON-LD typu FAQPage,
  // czyli w danych, które czyta Google. Doklejamy tylko, gdy słowa brakuje.
  const cena = service.price.includes("netto") ? service.price : `${service.price} netto`;
  return {
    q: service.priceFaqQuestion,
    a: `${service.priceFaqIntro} ${cena}${service.priceFaqSuffix ?? ""}. ${service.pricingBlurb} ${PRICE_FAQ_CLOSING}`,
  };
}

// Reprezentacyjne zdjęcie pokazywane na kafelku usługi (sekcja „Czym mogę Ci
// pomóc"). Łatwo podmienić ścieżkę, jeśli chcesz inne ujęcie.
// Trzy okładki wymienione 10.08.2026 na prośbę Marcina po deployu.
const SERVICE_TILE_IMAGES: Record<string, string> = {
  // Ujęcie z góry: dwa auta sportowe i kilkudziesięcioosobowa grupa na torze.
  // Wcześniej networking w foyer. Ten kadr pokazuje SKALĘ wydarzenia, czego
  // zdjęcie z rozmowy dwóch osób nie robi.
  "eventy-reportaze": "/images/galeria/eventy/event-02-zdjecie-grupowe-tor.jpg",
  "wizerunek-portrety": "/images/galeria/portrety/portret-02-kobieta-z-laptopem.jpg",
  "fotografia-produktowa": "/images/galeria/produktowe/produkt-01-toast-belvedere.jpg",
  // Kafelek linii obiektowej na stronie głównej i na /uslugi. Ta sama jasna hala,
  // co okładka podstrony, żeby cała linia miała jeden obraz (Marcin, 04.08.2026).
  // Klucz zmieniony 10.08.2026 razem ze slugiem usługi.
  "nieruchomosci-przemysl": "/images/galeria/wnetrza/wnetrze-03-hala-bramki-wejsciowe.jpg",
};

// Punkt kadrowania miniatury (object-position). Kafelek jest POZIOMY (3:2 na
// sm+, 16:9 na mobile), a dwa nowe pliki są PIONOWE, więc bez tych wartości
// kadr ucinałby to, co w zdjęciu najważniejsze.
const SERVICE_TILE_POS: Record<string, string> = {
  // Twarz i laptop w górnej części pionowego kadru.
  "wizerunek-portrety": "center 25%",
  // Kieliszki i butelka w środkowo-dolnej części; góra to ciemne tło lokalu.
  "fotografia-produktowa": "center 45%",
  // Auta i grupa w dolnych dwóch trzecich, góra to niebo. Istotne wyłącznie
  // na mobile, gdzie kafelek jest 16:9 — na sm+ proporcja pliku i kafelka
  // są zbliżone, więc przycięcie jest minimalne.
  "eventy-reportaze": "center 62%",
};

export const serviceItems = serviceCategories.map((s) => ({
  slug: s.slug,
  title: s.title,
  icon: s.icon,
  desc: s.subtitle,
  price: s.price,
  /** Etykieta na kafelku: `heroPriceLabel`, gdy usługa go ma, inaczej `price`.
      Dzięki temu kafelek może powiedzieć „za osobę" albo „pakiety", a kwota
      i tak pochodzi z jednego miejsca. */
  priceLabel: s.heroPriceLabel ?? s.price,
  image: SERVICE_TILE_IMAGES[s.slug],
  imagePos: SERVICE_TILE_POS[s.slug] ?? "center",
}));

// Opinia dopasowana do usługi (dowód społeczny na podstronie). Korzystamy z
// istniejących opinii Google. Maja/Woohoo → eventy, pakiety, wideo;
// Wagner/Artech → produktowa; Burzyńska → wizerunek; Fortuniak → zespołowe.
export interface ServiceTestimonial {
  quote: string;
  author: string;
  role: string;
}

const T = {
  maja: {
    quote:
      "Mieliśmy przyjemność współpracować z Marcinem przy realizacji materiałów foto i wideo z eventu biznesowego oraz przygotowaniu treści na potrzeby social media. Marcin wyróżnia się nie tylko wysokimi kompetencjami technicznymi, ale również doskonałym wyczuciem biznesowym i marketingowym. Ogromnie doceniamy sprawną komunikację, elastyczność oraz ekspresowe tempo realizacji. To współpraca, do której z przyjemnością będziemy wracać.",
    author: "Maja Formalik",
    role: "Growth & Partnerships Manager, Woohoo · opinia Google",
  },
  wagner: {
    quote:
      "Zdjęcia były robione na stronę internetową dla firmy. Profesjonalne podejście i ładne zdjęcia.",
    author: "Małgorzata Wagner",
    role: "Prezes Artech Group · opinia Google",
  },
  burzynska: {
    quote:
      "Z pełnym przekonaniem polecamy współpracę z Marcinem! Realizował dla naszego biura sesję biznesową i od samego początku współpraca przebiegała na najwyższym poziomie. Zdjęcia wyszły bardzo estetyczne, naturalne i w pełni spełniły nasze oczekiwania, a Marcin zadbał, aby każdy czuł się komfortowo przed obiektywem.",
    author: "Aleksandra Burzyńska",
    role: "Poznańskie Nieruchomości · opinia Google",
  },
  fortuniak: {
    quote:
      "Miałam przyjemność współpracować z Marcinem już kilkukrotnie i sesje studyjne są pełne profesjonalizmu i zaangażowania. Marcin daje z siebie 100% i bardzo szybko przełamuje lody, nawet jeśli ktoś staje przed obiektywem po raz pierwszy. Polecam z pełnym przekonaniem!",
    author: "Zuzanna Fortuniak",
    role: "Menedżerka ds. marketingu, Weranda · opinia Google",
  },
} satisfies Record<string, ServiceTestimonial>;

export const SERVICE_TESTIMONIALS: Record<string, ServiceTestimonial> = {
  "eventy-reportaze": T.maja,
  "fotografia-produktowa": T.wagner,
  // Po scaleniu portretów z sesjami zespołowymi (10.08.2026) na wizerunku stoi
  // opinia Burzyńskiej: dotyczy sesji biznesowej dla całego biura, więc pokrywa
  // oba zakresy scalonej usługi. Cytat Fortuniak (sesje studyjne) zostaje w danych
  // jako `T.fortuniak`, bez przypisania — wróci, gdy będzie gdzie go postawić.
  "wizerunek-portrety": T.burzynska,
  // TRESC2608-03 (04.08.2026), WARIANT B: linia obiektowa świadomie BEZ opinii.
  // Nie ma cytatu od klienta z tej linii, a podpięcie tu opinii Yes Butcher
  // przypisywałoby cudzą wypowiedź do usługi, której nie dotyczyła. Wpis dojdzie
  // po pierwszej realizacji obiektowej z referencją.
};
