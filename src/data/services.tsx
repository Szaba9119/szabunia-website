import type { ReactNode } from "react";
import type { ProcessStep, PricingTier, PricingTable, FAQItem } from "./portfolio";

export { type ProcessStep, type PricingTier, type PricingTable, type FAQItem };

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  forWhom: string[];
  icon: ReactNode;
  price: string;
  process: ProcessStep[];
  pricingType: "tiers" | "table";
  tiers?: PricingTier[];
  tables?: PricingTable[];
  pricingNote?: string;
  faqs: FAQItem[];
  portfolioSlug?: string;
  galleryCategory?: "portrety" | "eventy" | "produktowe" | "wideo";
  /** YouTube ID przykładowego filmu pokazywanego na podstronie usługi. */
  videoId?: string;
  videoTitle?: string;
  seo: {
    title: string;
    description: string;
  };
}

const serviceCategoriesRaw: ServiceData[] = [
  {
    slug: "wizerunek-portrety",
    galleryCategory: "portrety",
    title: "Wizerunek & Portrety",
    subtitle:
      "Profesjonalne portrety biznesowe, headshoty i zdjęcia personal branding, które budują zaufanie.",
    description:
      "Portret biznesowy to Twoja wizytówka w cyfrowym świecie. Tworzę zdjęcia, które oddają charakter i kompetencje, na stronę internetową, LinkedIn, materiały prasowe i raporty roczne. Każdą sesję poprzedza konsultacja wizerunkowa, dzięki której dobieramy styl, oświetlenie i klimat dopasowany do Twojej branży.",
    forWhom: [
      "CEO i kadra zarządzająca",
      "Eksperci i konsultanci",
      "Prawnicy, lekarze, architekci",
      "Osoby budujące markę osobistą",
      "Startupy i firmy technologiczne",
    ],
    icon: (
      <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    price: "od 1 000 zł",
    process: [
      { num: 1, title: "Konsultacja", desc: "Omawiamy cel, styl i wizję wizerunku" },
      { num: 2, title: "Poseboard", desc: "Przygotowuję moodboard z referencjami" },
      { num: 3, title: "Sesja", desc: "Prowadzę Cię przez pozowanie, w studiu lub Twoim biurze. Nie musisz nic umieć." },
      { num: 4, title: "Dostawa", desc: "Wybrane, wyretuszowane zdjęcia w 14 dni roboczych." },
    ],
    pricingType: "tiers",
    tiers: [
      {
        name: "ESSENTIAL",
        price: "1 000 zł",
        features: ["1 osoba, do 2 stylizacji", "90 min sesji", "3 wyretuszowane zdjęcia (wybór ze 100+ ujęć)", "Studio w cenie pakietu, indywidualnie dopasowane do Twojego projektu", "GRATIS: Poseboard przed sesją"],
        extra: "Dodatkowe ujęcie: 120 zł",
      },
      {
        name: "PROFESSIONAL",
        price: "1 300 zł",
        features: ["1 osoba, 2-3 stylizacje", "2 godziny sesji", "8 wyretuszowanych zdjęć (wybór ze 150+ ujęć)", "Studio w cenie pakietu, indywidualnie dopasowane do Twojego projektu", "GRATIS: Poseboard przed sesją"],
        recommended: true,
        extra: "Dodatkowe ujęcie: 100 zł",
      },
      {
        name: "PRO BRANDING",
        price: "1 800 zł",
        features: ["1 osoba, 3-4 stylizacje", "Do 3 godzin sesji", "15 wyretuszowanych zdjęć (wybór z 200+ ujęć)", "Pełna kontrola nad stylem i klimatem", "Studio w cenie pakietu, indywidualnie dopasowane do Twojego projektu", "GRATIS: Poseboard przed sesją"],
        extra: "Dodatkowe ujęcie: 80 zł",
      },
    ],
    faqs: [
      { q: "Ile trwa sesja wizerunkowa?", a: "W zależności od pakietu, od 90 minut (Essential) do 3 godzin (Pro Branding). Czas obejmuje przygotowanie oświetlenia, sesję oraz ewentualne zmiany stylizacji." },
      { q: "Czy mogę mieć sesję w swoim biurze?", a: "Tak. Przyjeżdżam z mobilnym studiem, potrzebuję ok. 3m² wolnej przestrzeni i dostępu do gniazdka." },
      { q: "Jak szybko otrzymam gotowe zdjęcia?", a: "Standardowy czas to 14 dni roboczych. Ekspres do 48h za dodatkową opłatą (+50%)." },
      { q: "Czy mogę użyć zdjęć na LinkedIn i stronie?", a: "Tak. Licencja obejmuje użytek komercyjny bez ograniczeń czasowych: strona, social media, druk, reklama." },
    ],
    portfolioSlug: "idcom-headshoty-zespolu",
    seo: {
      title: "Wizerunek & Portrety biznesowe — Marcin Szabunia | Poznań",
      description: "Profesjonalne portrety biznesowe, headshoty i personal branding. Sesje w studiu lub mobilnym studio w biurze. Poznań i cała Polska.",
    },
  },
  {
    slug: "pakiety-foto-wideo",
    portfolioSlug: "woohoo-autopay",
    galleryCategory: "eventy",
    videoId: "4INLtKcKcZk",
    videoTitle: "E-commerce All-in, film z eventu dla Woohoo",
    title: "Pakiety Foto + Wideo + Dron",
    subtitle:
      "Foto, wideo i ujęcia z drona z jednego wejścia. Jeden twórca, spójny materiał, mniej logistyki. Bestseller wśród klientów korporacyjnych.",
    description:
      "Pakiet hybrydowy to najefektywniejsze rozwiązanie, jedno wejście, dwa formaty. Podczas jednego wydarzenia lub sesji tworzę zarówno profesjonalne zdjęcia jak i materiał wideo. Rezultat: spójny wizualnie content na wszystkie kanały, bez koordynowania dwóch ekip.",
    forWhom: [
      "Firmy organizujące eventy (konferencje, gale)",
      "Marki potrzebujące contentu na Social Media",
      "Firmy eventowe i agencje PR",
      "Organizatorzy szkoleń i warsztatów",
      "Firmy z regularnymi potrzebami contentowymi",
    ],
    icon: (
      <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
    price: "od 1 800 zł",
    process: [
      { num: 1, title: "Brief", desc: "Cel, kanały, formaty wideo i foto" },
      { num: 2, title: "Realizacja", desc: "Sesja foto + nagranie wideo w jednym dniu" },
      { num: 3, title: "Postprodukcja", desc: "Retusz zdjęć + montaż wideo" },
      { num: 4, title: "Dostawa", desc: "Zdjęcia w 14 dni, wideo w 21 dni" },
    ],
    pricingType: "tiers",
    tiers: [
      {
        name: "EVENT ESSENTIALS",
        price: "1 800 zł",
        features: ["3 godziny obecności", "50+ zdjęć po selekcji i pełnej obróbce", "Wideo w formacie Reels (30s)", "Pełny montaż i postprodukcja wideo", "Ujęcia z drona w cenie pakietu"],
        extra: "Dodatkowa godzina: 350 zł",
      },
      {
        name: "EVENT PRO",
        price: "3 200 zł",
        features: ["6 godzin obecności", "150+ zdjęć po selekcji i pełnej obróbce", "Główne wideo podsumowujące (60s)", "Krótki teaser do Social Media (15s)", "Pełny montaż i postprodukcja wideo", "Ujęcia z drona w cenie pakietu"],
        recommended: true,
        extra: "Dodatkowa godzina: 350 zł",
      },
      {
        name: "EVENT PREMIUM",
        price: "4 500 zł",
        features: [
          "Do 8 godzin na miejscu",
          "Kompletny reportaż, min. 200 zdjęć",
          "Główny film z wydarzenia (do 90s)",
          "Dynamiczny teaser Social Media (15s)",
          "2–3 mini-wywiady z uczestnikami",
          "Autorska selekcja + profesjonalna obróbka zdjęć",
          "Pełen montaż wideo i post-produkcja wywiadów",
          "Ujęcia z drona w cenie pakietu",
        ],
        extra: "Dodatkowa godzina: 350 zł",
      },
    ],
    faqs: [
      { q: "Czy naprawdę jedna osoba ogarnie foto i wideo?", a: "Tak, pracuję w modelu one-man-band. Dzięki temu materiał jest spójny wizualnie, a Ty masz jedną osobę kontaktową zamiast dwóch ekip." },
      { q: "Czy mogę zamówić pakiet na cykl wydarzeń?", a: "Tak, przy serii eventów koryguję zakres do realnych potrzeb projektu. Monthly Content: 4 900 zł/m-c (1 dzień zdjęciowy + montaż 4 reelsów, min. 3 miesiące umowy)." },
      { q: "Co jeśli potrzebuję więcej godzin niż w pakiecie?", a: "Każda dodatkowa godzina powyżej pakietu: 350 zł. Dogrywamy szczegóły przed eventem." },
    ],
    seo: {
      title: "Pakiety Foto + Wideo + Dron — Marcin Szabunia | Poznań",
      description: "Pakiety hybrydowe foto + wideo. Jeden twórca, spójny materiał, mniej logistyki. Eventy, konferencje, content marketing. Poznań.",
    },
  },
  {
    slug: "eventy-reportaze",
    galleryCategory: "eventy",
    title: "Eventy & Reportaże",
    subtitle:
      "Profesjonalna dokumentacja konferencji, targów, gal i wydarzeń firmowych. Opcja live editing.",
    description:
      "Każde wydarzenie to historia, którą warto opowiedzieć. Fotografuję dyskretnie, w stylu reportażowym, wyłapując kluczowe momenty, emocje i interakcje. Oferuję opcję live editing, zdjęcia gotowe do publikacji na Social Media jeszcze w trakcie eventu. Fotografię eventową robię od początku działalności. Przez sześć lat dokumentowałem wydarzenia w Poznaniu, nierzadko kilka różnych miejsc jednego wieczoru. Sprawne tempo i logistyka dużych eventów to dla mnie naturalny grunt.",
    forWhom: [
      "Organizatorzy konferencji i targów",
      "Firmy organizujące wydarzenia firmowe",
      "Agencje eventowe",
      "Hotele i centra konferencyjne",
      "Firmy technologiczne (launch produktu, demo day)",
    ],
    icon: (
      <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    price: "od 600 zł",
    process: [
      { num: 1, title: "Brief", desc: "Agenda, kluczowe momenty, VIP-y" },
      { num: 2, title: "Realizacja", desc: "Dyskretna fotografia reportażowa" },
      { num: 3, title: "Live edit", desc: "Zdjęcia na Social Media w trakcie eventu" },
      { num: 4, title: "Dostawa", desc: "Pełna galeria w 14 dni roboczych" },
    ],
    pricingType: "table",
    tables: [
      {
        title: "Reportaż & Eventy",
        rows: [],
        groups: [
          {
            label: "Stawki i pakiety",
            items: [
              { label: "Pierwsza godzina pracy", value: "600 zł" },
              { label: "Każda kolejna godzina", value: "400 zł" },
              { label: "Pakiet 4h (event)", value: "1 600 zł" },
              { label: "Pakiet całodniowy (8h)", value: "2 800 zł" },
            ],
          },
          {
            label: "Opcje dodatkowe",
            items: [
              { label: "Live editing (Social Media)", value: "20 zł / zdjęcie" },
              { label: "Ekspresowa dostawa (do 48h po evencie)", value: "+50% ceny" },
              { label: "Ujęcia z drona", value: "+200 zł" },
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Czy mogę otrzymać zdjęcia w trakcie eventu?", a: "Tak, usługa live editing. Wybrane zdjęcia edytuję na bieżąco i wysyłam do publikacji na Social Media." },
      { q: "Ile zdjęć otrzymam?", a: "Średnio 15-30 gotowych zdjęć na każdą godzinę fotografowania, wyselekcjonowanych i poddanych postprodukcji. Dokładna liczba zależy od skali eventu i dodatkowych zadań w trakcie (wideo, dron, obróbka zdjęć na żywo, wydruk zdjęć na evencie). To autorska selekcja najlepszych momentów, a nie wszystkie wykonane kadry." },
      { q: "Czy pakiet całodniowy się opłaca?", a: "Przy 8h standardowo byłoby 3 400 zł. Pakiet to 2 800 zł, oszczędzasz 600 zł." },
    ],
    portfolioSlug: "woohoo-autopay",
    seo: {
      title: "Fotografia eventowa & reportaże — Marcin Szabunia | Poznań",
      description: "Profesjonalna fotografia eventowa, konferencje, targi, gale. Reportaż + live editing na Social Media. Poznań i cała Polska.",
    },
  },
  {
    slug: "sesje-zespolowe",
    galleryCategory: "portrety",
    title: "Sesje zespołowe",
    subtitle:
      "Headshoty dla całego zespołu w jeden dzień. Mobilne studio w Twoim biurze, bez logistyki.",
    description:
      "Spójne headshoty zespołu to fundament employer branding. Przyjeżdżam z mobilnym studiem do Twojego biura, rozstawienie zajmuje 20 minut, a każda osoba potrzebuje zaledwie 10-15 minut na sesję. Rezultat: profesjonalne, spójne zdjęcia wszystkich pracowników, gotowe na stronę WWW i LinkedIn.",
    forWhom: [
      "Zespoły korporacyjne i działy HR",
      "Kancelarie prawne i firmy doradcze",
      "Startupy szukające profesjonalnego wizerunku",
      "Firmy z rozproszonymi oddziałami",
      "Organizacje rebrandingujące się",
    ],
    icon: (
      <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    price: "od 150 zł/os.",
    process: [
      { num: 1, title: "Logistyka", desc: "Ustalamy harmonogram i liczbę osób" },
      { num: 2, title: "Setup", desc: "Rozstawiam mobilne studio w biurze (20 min)" },
      { num: 3, title: "Sesja", desc: "10-15 min na osobę, headshot + opcja team" },
      { num: 4, title: "Dostawa", desc: "Wyretuszowane zdjęcia w 14 dni" },
    ],
    pricingType: "table",
    tables: [
      {
        title: "Zespoły i Biura",
        rows: [],
        groups: [
          {
            label: "Stawka za osobę (1 retusz)",
            items: [
              { label: "4-10 osób", value: "150 zł" },
              { label: "11-30 osób", value: "120 zł" },
              { label: "30+ osób", value: "100 zł" },
            ],
          },
          {
            label: "Dopłaty",
            items: [
              { label: "Dodatkowe ujęcie / os.", value: "80 zł" },
            ],
          },
          {
            label: "Wynajem studia zewnętrznego",
            items: [
              { label: "Do 2h", value: "300 zł" },
              { label: "Do 4h", value: "400 zł" },
              { label: "Bez limitu", value: "800 zł" },
            ],
          },
        ],
        footerRows: [
          {
            label: "lub rozstawienie mobilnego studia w Twoim biurze",
            value: "450 zł",
            note: "Mobilne studio u Ciebie w biurze, rozstawienie ok. 20 min, wystarczy ~3 m².",
          },
        ],
        note: "Sesje zespołowe realizuję od 4 osób. Dla 1 do 3 osób polecam pakiety indywidualne (Wizerunek & Portrety).",
      },
    ],
    faqs: [
      { q: "Ile osób mogę sfotografować w jeden dzień?", a: "Do 40 osób dziennie przy mobilnym studio. Każda osoba potrzebuje ok. 10-15 minut." },
      { q: "Ile miejsca potrzebujesz w biurze?", a: "Minimum 3m² wolnej przestrzeni i gniazdko. Sala konferencyjna, hol lub korytarz, wszystko się sprawdzi." },
      { q: "Czy zdjęcia będą spójne dla całego zespołu?", a: "Tak, identyczne oświetlenie i tło. Spójne headshoty na stronie i w materiałach firmowych." },
    ],
    portfolioSlug: "idcom-headshoty-zespolu",
    seo: {
      title: "Sesje zespołowe & headshoty firmowe — Marcin Szabunia | Poznań",
      description: "Profesjonalne headshoty zespołu w Twoim biurze. Mobilne studio, spójne zdjęcia, 10-15 min na osobę. Poznań i cała Polska.",
    },
  },
  {
    slug: "wideo-marketing",
    portfolioSlug: "woohoo-autopay",
    galleryCategory: "wideo",
    title: "Wideo marketing",
    subtitle:
      "Reelsy, filmy promocyjne, relacje z eventów. Formaty pionowe i poziome dopasowane do platformy.",
    description:
      "Wideo to najskuteczniejsza forma komunikacji w Social Media. Tworzę krótkie formy (Reels, TikTok, YouTube Shorts), filmy promocyjne i reklamowe, relacje z eventów i materiały szkoleniowe. Wideo reklamowe przygotowuję pod konkretne miejsce emisji, od spotów do Social Media po materiały do kampanii online. Od nagrania po montaż, dostajesz gotowy materiał do publikacji.",
    forWhom: [
      "Firmy budujące obecność w Social Media",
      "Marki e-commerce (wideo produktowe)",
      "Organizatorzy eventów (recap video)",
      "Trenerzy i edukatorzy (kursy, webinary)",
      "Startupy (pitch video, demo)",
    ],
    icon: (
      <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-2.625 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
      </svg>
    ),
    price: "od 300 zł",
    process: [
      { num: 1, title: "Concept", desc: "Cel, format, platforma docelowa" },
      { num: 2, title: "Nagranie", desc: "Profesjonalne ujęcia, światło, dźwięk" },
      { num: 3, title: "Montaż", desc: "Cięcie, kolor, napisy, muzyka" },
      { num: 4, title: "Dostawa", desc: "Gotowe materiały w 21 dni" },
    ],
    pricingType: "table",
    tables: [
      {
        title: "Wideo Marketing",
        rows: [],
        groups: [
          {
            label: "Praca operatora",
            items: [
              { label: "Pierwsza godzina", value: "400 zł" },
              { label: "Każda kolejna godzina", value: "200 zł" },
            ],
          },
          {
            label: "Pakiety montażowe",
            items: [
              { label: "XS Teaser (<15s)", value: "300 zł" },
              { label: "S Reels (<30s)", value: "600 zł" },
              { label: "M Event recap (<60s)", value: "900 zł" },
              { label: "L Promo (1-2min)", value: "1 400 zł" },
              { label: "XL Dokument (~3min)", value: "1 800 zł" },
            ],
          },
        ],
      },
    ],
    pricingNote: "Monthly Content: 4 900 zł / m-c (1 dzień zdjęciowy + montaż 4 reelsów, min. 3 miesiące umowy)",
    faqs: [
      { q: "Czy montujesz też materiał z telefonu?", a: "Tak, jeśli masz surowe nagrania z telefonu, mogę je zmontować profesjonalnie (cięcie, kolor, napisy, muzyka)." },
      { q: "W jakich formatach dostarczasz wideo?", a: "MP4 w rozdzielczości do 4K. Formaty: 9:16 (Reels/TikTok), 16:9 (YouTube/strona), 1:1 (feed). Dowolna kombinacja." },
      { q: "Czy mogę zamówić sam montaż bez nagrywania?", a: "Tak, wystarczy przesłać surowe pliki. Wycena według cennika pakietów montażowych." },
      { q: "Czy realizujesz wideo reklamowe i spoty?", a: "Tak, krótkie filmy reklamowe pod kampanie w Social Media i online (15-60 s). Scenariusz, nagranie i montaż dopasowuję do miejsca emisji i celu kampanii. Wycena według pakietów montażowych plus praca operatora." },
    ],
    seo: {
      title: "Wideo marketing & produkcja wideo — Marcin Szabunia | Poznań",
      description: "Reelsy, filmy promocyjne i reklamowe, relacje z eventów. Profesjonalna produkcja wideo od nagrania po montaż. Poznań i cała Polska.",
    },
  },
  {
    slug: "fotografia-produktowa",
    galleryCategory: "produktowe",
    title: "Fotografia produktowa",
    subtitle:
      "Packshoty na białym tle z retuszem w cenie, zdjęcia kreatywne i aranżacje pod e-commerce, katalogi i Social Media.",
    description:
      "Profesjonalne zdjęcia produktowe to fundament sprzedaży online. Tworzę packshoty na czystym białym tle (marketplace), zdjęcia kreatywne z aranżacją (Social Media, reklamy) oraz zdjęcia katalogowe. Realizuję też fotografię reklamową, kreatywne ujęcia z aranżacją i rekwizytami, przygotowane pod konkretną kampanię: od internetu i Social Media po druk i outdoor. Pracuję w studiu z pełnym zapleczem oświetleniowym. Każde zdjęcie dostajesz z retuszem w cenie: produkt precyzyjnie wycięty z tła, czyste białe tło zgodne z wymogami Allegro i Amazon, a na życzenie przezroczyste tło (PNG).",
    forWhom: [
      "Sklepy internetowe i marketplace'y",
      "Marki kosmetyczne i modowe",
      "Producenci żywności i napojów",
      "Firmy technologiczne (elektronika, gadżety)",
      "Agencje reklamowe i domy mediowe",
    ],
    icon: (
      <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    price: "od 55 zł/szt.",
    process: [
      { num: 1, title: "Brief", desc: "Cel, platforma sprzedaży, wytyczne marki" },
      { num: 2, title: "Sesja", desc: "Fotografowanie w studiu z kontrolą światła" },
      { num: 3, title: "Retusz", desc: "Wycięcie z tła, korekta kolorów, białe tło" },
      { num: 4, title: "Dostawa", desc: "Pliki gotowe do użycia w 14 dni" },
    ],
    pricingType: "table",
    tables: [
      {
        title: "Fotografia produktowa",
        rows: [],
        groups: [
          {
            label: "Packshot (białe tło)",
            items: [
              { label: "1-20 sztuk", value: "90 zł" },
              { label: "21-50 sztuk", value: "70 zł" },
              { label: "50+ sztuk", value: "55 zł" },
            ],
          },
          {
            label: "Zdjęcia kreatywne / reklamowe",
            items: [
              { label: "Internet / Social Media", value: "od 200 zł" },
              { label: "Druk / Outdoor", value: "od 600 zł" },
            ],
          },
        ],
        note: "Retusz i wycięcie produktu z tła w cenie każdego zdjęcia. Minimalne zamówienie: 500 zł lub 6 zdjęć",
      },
    ],
    faqs: [
      { q: "Czy mogę przysłać produkty kurierem?", a: "Tak, przyjmuję przesyłki do studia. Po sesji odsyłam na mój koszt (przy zamówieniach powyżej 1 000 zł)." },
      { q: "Jakie formaty plików otrzymam?", a: "JPEG w pełnej rozdzielczości + wersja web. Na życzenie: PNG z przezroczystym tłem, TIFF do druku." },
      { q: "Ile produktów dziennie jesteś w stanie zrealizować?", a: "Packshoty na białym tle: 30-50 produktów/dzień. Zdjęcia kreatywne: 8-15 ujęć/dzień." },
      { q: "Czym różni się fotografia produktowa od fotografii reklamowej?", a: "Fotografia produktowa pokazuje produkt wprost, packshot na białym tle do sklepu czy katalogu. Fotografia reklamowa buduje wokół produktu historię: aranżacja, rekwizyty, światło pod konkretną kampanię. Zdjęcia reklamowe wyceniam według pola eksploatacji, inaczej na Social Media, inaczej do druku i na outdoor." },
      { q: "Czy retusz jest wliczony w cenę zdjęcia?", a: "Tak. Każdy packshot dostajesz wyretuszowany: czyste białe tło, produkt precyzyjnie wycięty z tła, korekta kolorów i usunięcie drobnych skaz. Nie dopłacasz za obróbkę osobno, w przeciwieństwie do wielu studiów, gdzie retusz to dodatkowy koszt." },
    ],
    portfolioSlug: "artech-fotografia-produktowa",
    seo: {
      title: "Fotografia produktowa & packshoty — Marcin Szabunia | Poznań",
      description: "Packshoty na białym tle, zdjęcia kreatywne i fotografia reklamowa produktów. E-commerce, katalogi, Social Media, kampanie. Studio w Poznaniu.",
    },
  },
  {
    slug: "zdjecia-wideo-z-drona",
    title: "Zdjęcia i wideo z drona",
    subtitle:
      "Ujęcia z powietrza: budynki i obiekty firmowe, tereny, eventy i architektura. Foto i wideo w 4K.",
    description:
      "Perspektywa z lotu ptaka pokazuje skalę i kontekst, których nie odda zdjęcie z poziomu ziemi. Realizuję zdjęcia i wideo z drona: budynki i obiekty firmowe, tereny i place, inwestycje budowlane, architektura oraz ujęcia eventowe. Latam dronem DJI, mam certyfikat operatora A1/A3 i ubezpieczenie OC, więc strona formalna jest po mojej stronie. Materiał z drona mogę też połączyć z sesją naziemną, dzięki czemu z jednego wejścia powstaje spójny komplet foto i wideo.",
    forWhom: [
      "Deweloperzy i firmy budowlane (postęp prac, inwestycje)",
      "Hotele, ośrodki i obiekty turystyczne",
      "Firmy przemysłowe i logistyczne (tereny, hale, place)",
      "Organizatorzy eventów (skala wydarzenia)",
      "Agencje nieruchomości i marketingu",
    ],
    icon: (
      <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
        <path strokeLinecap="round" d="M7.8 7.8l1.7 1.7M16.2 7.8l-1.7 1.7M7.8 16.2l1.7-1.7M16.2 16.2l-1.7-1.7" />
      </svg>
    ),
    price: "od 600 zł",
    process: [
      { num: 1, title: "Brief i zgody", desc: "Ustalamy ujęcia, lokalizację i ewentualne strefy lotów" },
      { num: 2, title: "Lot", desc: "Zdjęcia i wideo 4K z powietrza" },
      { num: 3, title: "Postprodukcja", desc: "Obróbka zdjęć lub montaż wideo" },
      { num: 4, title: "Dostawa", desc: "Zdjęcia w 14 dni, wideo do 21 dni" },
    ],
    pricingType: "tiers",
    tiers: [
      {
        name: "ZDJĘCIA Z DRONA",
        price: "600 zł",
        features: [
          "1h lotu w cenie",
          "Do 10 wyretuszowanych zdjęć z powietrza",
          "Pełna, autorska obróbka",
          "Pliki: pełna jakość + wersja web",
        ],
      },
      {
        name: "WIDEO Z DRONA 4K",
        price: "900 zł",
        features: [
          "1h lotu w cenie",
          "Zmontowany materiał do 60 s",
          "Jakość do 4K",
          "Formaty pod WWW lub social media",
        ],
        recommended: true,
      },
      {
        name: "FOTO + WIDEO",
        price: "1 200 zł",
        features: [
          "1h lotu w cenie",
          "Do 10 zdjęć + wideo do 60 s",
          "Komplet z jednego lotu",
          "Pełna obróbka i montaż",
        ],
      },
    ],
    pricingNote:
      "Dodatki: kolejna godzina lotu 300 zł · dodatkowe zdjęcie 80 zł · jako dodatek do innej sesji 200 zł (do 3 ujęć). Dron DJI, certyfikat operatora A1/A3 i ubezpieczenie OC; w standardowych lokalizacjach loty bez dopłat, w strefach kontrolowanych zgody PAŻP wyceniane indywidualnie.",
    faqs: [
      { q: "Czy loty dronem są legalne i ubezpieczone?", a: "Tak. Mam certyfikat A1/A3 oraz ubezpieczenie OC operatora drona. W strefach kontrolowanych uzyskuję wymagane zgody przed lotem." },
      { q: "Co jeśli pogoda nie dopisze?", a: "Silny wiatr lub opady uniemożliwiają bezpieczny lot. W takiej sytuacji bezpłatnie przekładamy termin na najbliższy możliwy." },
      { q: "W jakiej jakości dostarczasz materiał?", a: "Wideo do 4K, zdjęcia w pełnej rozdzielczości. Formaty dobieram pod stronę WWW i social media (poziome i pionowe)." },
      { q: "Czy mogę połączyć drona z sesją naziemną?", a: "Tak. Dron działa jako dodatek do eventu, sesji produktowej lub wizerunkowej za 200 zł (do 3 zdjęć lub ujęć wideo z powietrza). Z jednego wejścia powstaje spójny komplet." },
    ],
    portfolioSlug: "woohoo-autopay",
    seo: {
      title: "Zdjęcia i wideo z drona — Marcin Szabunia | Poznań",
      description: "Zdjęcia i wideo z drona (4K): budynki i obiekty firmowe, tereny, inwestycje, eventy i architektura. Certyfikat A1/A3 i OC operatora. Poznań i cała Polska.",
    },
  },
];

// Kolejność wyświetlania usług (kafelki na stronie głównej, lista /uslugi,
// kalkulator wyceny). Zmiana tutaj zmienia kolejność wszędzie naraz.
const SERVICE_DISPLAY_ORDER: string[] = [
  "eventy-reportaze",
  "wizerunek-portrety",
  "pakiety-foto-wideo",
  "fotografia-produktowa",
  "sesje-zespolowe",
  "wideo-marketing",
  "zdjecia-wideo-z-drona",
];

export const serviceCategories: ServiceData[] = [...serviceCategoriesRaw].sort(
  (a, b) => SERVICE_DISPLAY_ORDER.indexOf(a.slug) - SERVICE_DISPLAY_ORDER.indexOf(b.slug)
);

/* ── Helpers ── */

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return serviceCategories.find((s) => s.slug === slug);
}

// Reprezentacyjne zdjęcie pokazywane na kafelku usługi (sekcja „Czym mogę Ci
// pomóc"). Łatwo podmienić ścieżkę, jeśli chcesz inne ujęcie.
const SERVICE_TILE_IMAGES: Record<string, string> = {
  "eventy-reportaze": "/images/galeria/eventy/event-05.jpg",
  "wizerunek-portrety": "/images/galeria/portrety/portret-05.jpg",
  "pakiety-foto-wideo": "/images/galeria/eventy/event-17.jpg",
  "fotografia-produktowa": "/images/galeria/produktowe/produkt-13.jpg",
  "sesje-zespolowe": "/images/portfolio/sesje-zespolowe-cover.jpg",
  // Wersja 4:3 z rozmytym wypełnieniem — pełny napis „E-COMMERCE All in"
  // widoczny, bez ucinania i bez pustych marginesów (oryginał 16:9).
  "wideo-marketing": "/images/portfolio/woohoo-ecommerce-4x3.jpg",
  "zdjecia-wideo-z-drona": "/images/portfolio/yes-butcher/yes-butcher-02.jpg",
};

// Punkt kadrowania miniatury (object-position). Wizerunek kadrujemy nieco wyżej
// (sylwetka w górnej części), zespołowy portret nieco niżej (więcej kontekstu,
// obie twarze wciąż widoczne). Reszta domyślnie wyśrodkowana.
const SERVICE_TILE_POS: Record<string, string> = {
  "wizerunek-portrety": "center 29%",
};

export const serviceItems = serviceCategories.map((s) => ({
  slug: s.slug,
  title: s.title,
  icon: s.icon,
  desc: s.subtitle,
  price: s.price,
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
  "pakiety-foto-wideo": T.maja,
  "wideo-marketing": T.maja,
  "fotografia-produktowa": T.wagner,
  "wizerunek-portrety": T.burzynska,
  "sesje-zespolowe": T.fortuniak,
  "zdjecia-wideo-z-drona": T.maja,
};
