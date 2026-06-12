/* ── Shared interfaces ── */

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ProcessStep {
  num: number;
  title: string;
  desc: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
  extra?: string;
}

export interface PricingTable {
  title: string;
  rows: { label: string; value: string }[];
  groups?: { label: string; items: { label: string; value: string }[] }[];
  note?: string;
}

export interface CaseStudy {
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
}

export interface PortfolioCategory {
  slug: string;
  externalUrl?: string;
  label: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  thumbnail: string;
  gallery: GalleryImage[];
  /** Podtytuł sekcji galerii (domyślnie: „Wybrane realizacje z kategorii: …") */
  gallerySubtitle?: string;
  /** Proporcje kafli galerii: poziome 4:3 (domyślne) lub pionowe 3:4 (portrety) */
  galleryAspect?: "landscape" | "portrait";
  /** Proporcje zdjęcia w hero — gdy inne niż kafle galerii (domyślnie: galleryAspect) */
  heroAspect?: "landscape" | "portrait";
  /** Zewnętrzny dowód realizacji (np. publikacja) — link pod CTA w hero */
  proofLink?: { label: string; url: string };
  /** Osobna miniatura dla kafli (home, /portfolio) — domyślnie thumbnail */
  tileImage?: string;
  /** Kotwiczenie kadru w kaflach: "top" dla pionowych portretów (głowa zostaje w kadrze) */
  tileImagePosition?: "top" | "center";
  process: ProcessStep[];
  pricingType: "tiers" | "table";
  tiers?: PricingTier[];
  tables?: PricingTable[];
  pricingNote?: string;
  faqs: FAQItem[];
  caseStudy?: CaseStudy;
  video?: { youtubeId: string; title: string };
  /** Nadtytuł nad H1 w widoku wideo (domyślnie: „Realizacja wideo") */
  badge?: string;
  /** Chipy zakresu w widoku wideo (domyślnie: zakres E-commerce All-in) */
  scope?: string[];
  reels?: { url: string; title: string; cover: string; desc: string }[];
  seo: {
    title: string;
    description: string;
  };
}

/* ── Data ── */

export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "woohoo-autopay",
    label: "E-commerce All-in — film z eventu i reelsy",
    heroTitle: "E-commerce All-in",
    heroSubtitle:
      "Podsumowanie wideo wydarzenia E-commerce All In na Enea Stadion w Poznaniu: poziomy film i trzy pionowe reelsy z wywiadami. Realizacja dla Woohoo, partnera wydarzenia.",
    description:
      "E-commerce All In to wydarzenie zorganizowane przez ICEA i Autopay na Enea Stadion w Poznaniu. Na zlecenie Woohoo, partnera wydarzenia, odpowiadałem za komplet materiału wideo: poziomy film podsumowujący z publikacją na YouTube oraz trzy pionowe reelsy z wywiadami na profil Woohoo. Na sali eventowej stanęło mobilne studio do filmowania wywiadów, a między rozmowami powstawała relacja z wydarzenia i ujęcia z drona, również w środku stadionu. Jeden twórca, spójny materiał: od planu zdjęciowego, przez realizację, po montaż i postprodukcję.",
    scope: [
      "Poziomy film (YouTube)",
      "3 pionowe reelsy",
      "Studio wywiadów na evencie",
      "Dron wewnątrz stadionu",
      "Montaż i postprodukcja",
    ],
    thumbnail: "/images/portfolio/woohoo-autopay.jpg",
    gallery: [],
    process: [],
    pricingType: "tiers",
    faqs: [],
    video: {
      youtubeId: "4INLtKcKcZk",
      title: "E-commerce All-in — podsumowanie wydarzenia (ICEA × Autopay)",
    },
    reels: [
      {
        url: "https://www.instagram.com/woohoo_pl/reel/DYULbqYIWT3/",
        title: "Co zniknie z e-commerce?",
        cover: "/images/portfolio/reel-3.jpg",
        desc: "Jak zmieni się e-commerce w 2–3 lata: nie tylko technologia, ale i oczekiwania klientów oraz to, co wpływa na decyzję zakupową. Prognozy ekspertów.",
      },
      {
        url: "https://www.instagram.com/woohoo_pl/reel/DYCsTRXIy0d/",
        title: "Co ogranicza Twój sklep?",
        cover: "/images/portfolio/reel-1.jpg",
        desc: "Praktycy znający e-commerce od środka: zanim zaczniesz skalować biznes, przyjrzyj się jego fundamentom.",
      },
      {
        url: "https://www.instagram.com/woohoo_pl/reel/DXOYU35CIcn/",
        title: "Co boli właścicieli e-commerce?",
        cover: "/images/portfolio/reel-2.jpg",
        desc: "Realne hamulce wzrostu wg liderów branży: rosnące koszty pozyskania klienta, trudniejsze skalowanie, spadająca konwersja, dużo danych i mało decyzji, operacje, które nie nadążają.",
      },
    ],
    caseStudy: {
      client: "Woohoo — partner wydarzenia E-commerce All In",
      industry: "Wydarzenie branżowe e-commerce (org. ICEA i Autopay), Enea Stadion w Poznaniu",
      challenge:
        "Jeden wieczór i trzy zadania naprzemiennie: relacja z wydarzenia, wywiady z ekspertami i ujęcia z drona, w tym loty wewnątrz stadionu. Do tego mobilne studio do filmowania na sali eventowej: rozstawione tak, żeby nie przeszkadzało gościom, a tło kadru wyglądało jak w studiu.",
      solution:
        "Zacząłem od ujęć z drona, później kręciłem relację z eventu, a w przerwach nagrywaliśmy wywiady w mobilnym studiu. Z jednego wieczoru powstał poziomy film podsumowujący na YouTube oraz trzy pionowe reelsy z wywiadami, spójne od planu po postprodukcję.",
      results: [
        { label: "film podsumowujący na YouTube", value: "1" },
        { label: "pionowe reelsy z wywiadami", value: "3" },
        { label: "formaty dystrybucji: YouTube i Instagram", value: "2" },
      ],
    },
    seo: {
      title: "E-commerce All-in (ICEA × Autopay) — realizacja wideo | Marcin Szabunia",
      description:
        "Case study realizacji wideo dla Woohoo z wydarzenia E-commerce All-in (ICEA × Autopay) na Enea Stadion: poziomy film podsumowujący i trzy pionowe reelsy z wywiadami.",
    },
  },
  {
    slug: "artech-fotografia-produktowa",
    label: "Artech — packshoty i film z produkcji",
    heroTitle: "Artech — packshoty i film z produkcji",
    heroSubtitle:
      "Fotografia produktowa półfabrykatów i detali z tworzyw sztucznych na stronę i do katalogu oraz film z hali produkcyjnej do prezentacji oferty klientom.",
    description:
      "Artech Group to poznańskie centrum obróbki tworzyw sztucznych: frezowanie, toczenie i cięcie CNC płyt, wałków i detali dla przemysłu. Dla Artech zrealizowałem dwa rodzaje materiału. Pierwszy to packshoty na białym tle, czyli półfabrykaty i detale z różnych tworzyw przygotowane pod stronę internetową, katalog i sklep internetowy. Drugi to film z hali produkcyjnej, który pokazuje park maszynowy i sposób pracy firmy. Wideo pracuje na stronie i w rozmowach handlowych: zamiast opisywać możliwości produkcyjne, Artech po prostu je pokazuje.",
    badge: "Realizacja foto + wideo",
    scope: [
      "Packshoty na białym tle",
      "Film z produkcji (YouTube)",
      "Zdjęcia pod stronę i katalog",
      "Montaż i postprodukcja",
    ],
    thumbnail: "/images/portfolio/artech/_F2A8937.jpg",
    gallery: [
      { src: "/images/portfolio/artech/_F2A8912.jpg", alt: "Packshot na białym tle, niebieski detal z tworzywa sztucznego o skręconym kształcie (Artech Group)" },
      { src: "/images/portfolio/artech/3.jpg", alt: "Packshot, zielona płyta z tworzywa sztucznego na białym tle, fotografia produktowa dla przemysłu" },
      { src: "/images/portfolio/artech/8.jpg", alt: "Packshot, czerwony wałek z tworzywa sztucznego na białym tle, zdjęcie katalogowe" },
      { src: "/images/portfolio/artech/_F2A8935.jpg", alt: "Packshot, niebieski pierścień z tworzywa o ażurowej strukturze, fotografia produktowa na białym tle" },
      { src: "/images/portfolio/artech/1.jpg", alt: "Packshot, przezroczysta płyta z tworzywa sztucznego na białym tle (Artech Group)" },
      { src: "/images/portfolio/artech/15.jpg", alt: "Packshot, niebieski wałek z tworzywa sztucznego na białym tle, zdjęcie do katalogu" },
      { src: "/images/portfolio/artech/_F2A8937.jpg", alt: "Packshot, dwie ażurowe kule z tworzywa sztucznego na białym tle, fotografia produktowa" },
      { src: "/images/portfolio/artech/33.jpg", alt: "Packshot, wałek z laminatu technicznego na białym tle, zdjęcie katalogowe dla przemysłu" },
      { src: "/images/portfolio/artech/17.jpg", alt: "Packshot, biała płyta i wałek z tworzywa sztucznego na białym tle (Artech Group)" },
    ],
    gallerySubtitle:
      "Packshoty zrealizowane dla Artech Group: półfabrykaty i detale z tworzyw sztucznych na białym tle, pod stronę, katalog i sklep.",
    process: [],
    pricingType: "tiers",
    faqs: [],
    video: {
      youtubeId: "ivvZQ5lQ7FE",
      title: "Artech — film z hali produkcyjnej (obróbka tworzyw sztucznych)",
    },
    caseStudy: {
      client: "Artech Group",
      industry: "Centrum obróbki tworzyw sztucznych CNC, Poznań",
      challenge:
        "Spójne packshoty półfabrykatów i detali z tworzyw pod stronę internetową, katalog i sklep internetowy oraz film, który pokaże park maszynowy i sposób pracy firmom z przemysłu.",
      solution:
        "Packshoty płyt, wałków i detali z różnych tworzyw na białym tle, w powtarzalnym setupie, oraz film z hali produkcyjnej do prezentacji oferty. Spójna stylistyka pozwala rozbudowywać katalog o kolejne produkty.",
      results: [
        { label: "packshotów produktów i półfabrykatów", value: "20" },
        { label: "film z produkcji na YouTube", value: "1" },
        { label: "zastosowania: strona WWW, katalog, sklep internetowy", value: "3" },
      ],
      testimonial: {
        quote:
          "Zdjęcia były robione na stronę internetową dla firmy. Profesjonalne podejście i ładne zdjęcia.",
        author: "Małgorzata Wagner",
        role: "CEO Artech Group — opinia Google",
      },
    },
    seo: {
      title: "Artech — packshoty i film z produkcji | Marcin Szabunia",
      description:
        "Case study dla Artech Group (Poznań): packshoty półfabrykatów i detali z tworzyw sztucznych na stronę WWW i do katalogu oraz film z hali produkcyjnej.",
    },
  },
  {
    slug: "idcom-headshoty-zespolu",
    label: "IDcom — headshoty zespołu",
    heroTitle: "IDcom — headshoty zespołu na trzech tłach",
    heroSubtitle:
      "Sesja wizerunkowa zespołu poznańskiego software house'u: portrety na stronę internetową i do materiałów firmowych.",
    description:
      "IDcom Group tworzy rozwiązania IT dla samorządów i biznesu. Zespół potrzebował portretów, które zadziałają w kilku miejscach naraz: na stronie internetowej i w materiałach firmowych. Zamiast jednej wersji zdjęć powstała jedna sesja na trzech tłach. Białe jest czyste i uniwersalne, czarne z niebieskim światłem bardziej technologiczne, a kremowe cieplejsze i swobodniejsze. Każda osoba ma komplet kadrów w spójnym standardzie światła i retuszu, więc firma dobiera klimat do kontekstu zamiast wracać do studia.",
    thumbnail: "/images/portfolio/idcom/_F2A9376-Edit-2.jpg",
    gallery: [
      { src: "/images/portfolio/idcom/_F2A9424-Edit-2.jpg", alt: "Portret członkini zespołu na białym tle, sesja wizerunkowa zespołu IDcom Group" },
      { src: "/images/portfolio/idcom/_F2A9229-Edit-2.jpg", alt: "Portret biznesowy na czarnym tle z niebieskim światłem, sesja zespołowa IDcom Group" },
      { src: "/images/portfolio/idcom/_F0I9883-Edit-2.jpg", alt: "Portret członkini zespołu na kremowym tle, zdjęcia zespołu na stronę firmową" },
      { src: "/images/portfolio/idcom/_F2A9433-Edit-2.jpg", alt: "Headshot członka zespołu na białym tle, spójne portrety pracowników firmy IT" },
      { src: "/images/portfolio/idcom/_F2A9264-Edit-2.jpg", alt: "Headshot na czarnym tle z niebieskim akcentem światła, portrety zespołu software house'u" },
      { src: "/images/portfolio/idcom/_F2A9376-Edit-2.jpg", alt: "Naturalny, uśmiechnięty portret na kremowym tle, sesja wizerunkowa zespołu IT" },
    ],
    gallerySubtitle:
      "Sześć kadrów z sesji dla IDcom Group: ten sam zespół na trzech tłach, białym, czarnym z niebieskim światłem i kremowym.",
    galleryAspect: "portrait",
    tileImagePosition: "top",
    process: [],
    pricingType: "tiers",
    faqs: [],
    caseStudy: {
      client: "IDcom Group",
      industry: "Software house, IT dla samorządów i biznesu (Poznań)",
      challenge:
        "Portrety zespołu, które muszą działać w kilku kontekstach naraz, na stronie internetowej i w materiałach firmowych, i utrzymać jeden standard dla wszystkich osób.",
      solution:
        "Jedna sesja, trzy tła: białe, czarne z niebieskim światłem i kremowe. Każda osoba otrzymała kadry w trzech klimatach, od uniwersalnego po cieplejszy, przy zachowaniu tego samego światła, kadrowania i retuszu.",
      results: [
        { label: "tła zdjęciowe w jednej sesji", value: "3" },
        { label: "zastosowania: strona WWW i materiały firmowe", value: "2" },
      ],
    },
    seo: {
      title: "IDcom — headshoty zespołu na 3 tłach | Marcin Szabunia",
      description:
        "Case study sesji wizerunkowej zespołu IDcom Group (Poznań): portrety na trzech tłach (białym, czarnym z niebieskim światłem i kremowym) na stronę WWW i materiały firmowe.",
    },
  },
  {
    slug: "yes-butcher-przewodnik-michelin",
    label: "Yes Butcher! — sesja Michelin",
    heroTitle: "Yes Butcher! — sesja do przewodnika Michelin",
    heroSubtitle:
      "Wnętrza, nagrodzony stek i portrety szefa kuchni dla steakhouse'u w poznańskich Starych Koszarach. Zdjęcia trafiły na profil restauracji w przewodniku Michelin.",
    description:
      "Yes Butcher! Shop & Bistro to steakhouse i sklep mięsny w Starych Koszarach, poznański oddział warszawskiej marki, obecny w przewodniku Michelin. Brief obejmował komplet materiału w jeden dzień zdjęciowy, w działającym lokalu: budynek z drona, wnętrza obu sal (od baru i otwartej kuchni po szafę do sezonowania mięsa), portrety szefa kuchni oraz bohatera karty, czyli stek ribeye nagrodzony w World Steak Challenge 2025, w firmowym pudełku z certyfikatem. Jedna sesja pokryła cztery rodzaje fotografii, a zdjęcia pracują na profilu Michelin i w reklamach restauracji.",
    thumbnail: "/images/portfolio/yes-butcher/yes-butcher-43.jpg",
    heroAspect: "portrait",
    tileImage: "/images/portfolio/yes-butcher/yes-butcher-tile.jpg",
    proofLink: {
      label: "Zobacz profil Yes Butcher! w przewodniku Michelin",
      url: "https://guide.michelin.com/en/wielkopolskie/poznan_2395985/restaurant/yes-butcher",
    },
    gallery: [
      { src: "/images/portfolio/yes-butcher/yes-butcher-34.jpg", alt: "Otwarta kuchnia i bar bistro Yes Butcher!, fotografia wnętrz restauracji, Poznań" },
      { src: "/images/portfolio/yes-butcher/yes-butcher-37.jpg", alt: "Sala główna bistro ze złotymi żyrandolami i ladą mięsną, zdjęcia wnętrz dla gastronomii" },
      { src: "/images/portfolio/yes-butcher/yes-butcher-14.jpg", alt: "Zielona sala restauracji Yes Butcher! z drewnianymi belkami, fotografia wnętrz dla przewodnika Michelin" },
      { src: "/images/portfolio/yes-butcher/yes-butcher-27.jpg", alt: "Bar i szafa do sezonowania mięsa w steakhousie Yes Butcher!, fotografia restauracji" },
      { src: "/images/portfolio/yes-butcher/yes-butcher-44.jpg", alt: "Stek ribeye nagrodzony w World Steak Challenge 2025 w firmowym pudełku Yes Butcher!, fotografia produktowa dla gastronomii" },
      { src: "/images/portfolio/yes-butcher/yes-butcher-15.jpg", alt: "Sala restauracji z ceglaną ścianą i łukowym oknem, fotografia wnętrz, Stare Koszary Poznań" },
      { src: "/images/portfolio/yes-butcher/yes-butcher-39.jpg", alt: "Wnętrze steakhouse'u z pikowanymi sofami i barem, sesja zdjęciowa dla restauracji" },
      { src: "/images/portfolio/yes-butcher/yes-butcher-31.jpg", alt: "Lada mięsna i gabloty butcher shopu Yes Butcher! z neonem na podłodze, fotografia wnętrz dla gastronomii" },
      { src: "/images/portfolio/yes-butcher/yes-butcher-02.jpg", alt: "Budynek Yes Butcher! w Starych Koszarach z drona, ceglana fasada i rzeźba byka przed wejściem, Poznań" },
    ],
    gallerySubtitle:
      "Kadry z sesji dla Yes Butcher! Od ujęcia z drona, przez wnętrza bistro i butcher shopu, po nagrodzony stek. Kliknij, żeby zobaczyć pełne kadry.",
    process: [],
    pricingType: "tiers",
    faqs: [],
    caseStudy: {
      client: "Yes Butcher! Shop & Bistro",
      industry: "Gastronomia: steakhouse i butcher shop, Poznań (Stare Koszary)",
      challenge:
        "Komplet zdjęć pod profil w przewodniku Michelin i materiały promocyjne: budynek, wnętrza, danie popisowe i ludzie. Wszystko w jeden dzień, w działającym lokalu.",
      solution:
        "Jedna sesja, cztery rodzaje fotografii: ujęcie budynku z drona, wnętrza obu sal w naturalnym klimacie lokalu, portrety szefa kuchni oraz zdjęcia produktowe steka ribeye nagrodzonego w World Steak Challenge 2025.",
      results: [
        { label: "rodzaje zdjęć: dron, wnętrza, portrety, produkt", value: "4" },
        { label: "dzień zdjęciowy w działającym lokalu", value: "1" },
        { label: "zdjęcia na profilu restauracji w przewodniku", value: "Michelin" },
      ],
    },
    seo: {
      title: "Yes Butcher — sesja do przewodnika Michelin | Marcin Szabunia",
      description:
        "Case study sesji dla Yes Butcher! Shop & Bistro (Poznań): zdjęcie z drona, wnętrza, portrety szefa kuchni i nagrodzony stek. Zdjęcia trafiły na profil restauracji w przewodniku Michelin.",
    },
  },
  {
    slug: "sesja-wizerunkowa",
    label: "Sesja wizerunkowa firmy",
    heroTitle: "Sesja wizerunkowa firmy",
    heroSubtitle:
      "Profesjonalne portrety biznesowe, headshoty i zdjęcia personal branding dla kadry zarządzającej i liderów.",
    description:
      "Wizerunek kadry zarządzającej to wizytówka całej firmy. Tworzę portrety biznesowe, które budują zaufanie — na stronę internetową, LinkedIn, materiały prasowe i raporty roczne. Sesje realizuję w mobilnym studiu (dojeżdżam do biura) lub w wynajętej przestrzeni. Każda sesja poprzedzona jest konsultacją wizerunkową, dzięki której dobieramy stylizację, oświetlenie i klimat dopasowany do branży.",
    thumbnail: "/images/portfolio-1.jpg",
    gallery: [
      { src: "/images/portfolio/sesja-wizerunkowa/01.jpg", alt: "Sesja wizerunkowa firmy — portret biznesowy CEO w studiu, Poznań" },
    ],
    process: [
      { num: 1, title: "Konsultacja", desc: "Omawiamy cel, styl i wizję wizerunku" },
      { num: 2, title: "Poseboard", desc: "Przygotowuję moodboard z referencjami" },
      { num: 3, title: "Sesja", desc: "Profesjonalna sesja w studiu lub biurze" },
      { num: 4, title: "Dostawa", desc: "Wyselekcjonowane zdjęcia w 14 dni" },
    ],
    pricingType: "tiers",
    tiers: [
      {
        name: "ESSENTIAL",
        price: "1 000 zł",
        features: [
          "1 osoba, do 2 stylizacji",
          "90 min sesji",
          "3 wyretuszowane zdjęcia (wybór ze 100+ ujęć)",
          "GRATIS: Poseboard przed sesją",
        ],
        extra: "Dodatkowe ujęcie: 120 zł",
      },
      {
        name: "PROFESSIONAL",
        price: "1 300 zł",
        features: [
          "1 osoba, 2-3 stylizacje",
          "2 godziny sesji",
          "8 wyretuszowanych zdjęć (wybór ze 150+ ujęć)",
          "GRATIS: Poseboard przed sesją",
        ],
        recommended: true,
        extra: "Dodatkowe ujęcie: 100 zł",
      },
      {
        name: "PRO BRANDING",
        price: "1 800 zł",
        features: [
          "1 osoba, 3-4 stylizacje",
          "Do 3 godzin sesji",
          "15 wyretuszowanych zdjęć (wybór z 200+ ujęć)",
          "Pełna kontrola nad stylem i klimatem",
          "GRATIS: Poseboard przed sesją",
        ],
        extra: "Dodatkowe ujęcie: 80 zł",
      },
    ],
    faqs: [
      {
        q: "Ile trwa sesja wizerunkowa?",
        a: "W zależności od pakietu — od 90 minut (Essential) do 3 godzin (Pro Branding). Czas obejmuje przygotowanie oświetlenia, sesję oraz ewentualne zmiany stylizacji.",
      },
      {
        q: "Czy mogę mieć sesję w swoim biurze?",
        a: "Tak. Przyjeżdżam z mobilnym studiem — potrzebuję ok. 3m² wolnej przestrzeni i dostępu do gniazdka. Rozstawienie sprzętu zajmuje ok. 20 minut.",
      },
      {
        q: "Ile osób mogę sfotografować w jeden dzień?",
        a: "Przy portretach biznesowych — do 40 osób dziennie (przy setupie studyjnym na miejscu). Każda osoba potrzebuje ok. 10-15 minut.",
      },
      {
        q: "Jak szybko otrzymam gotowe zdjęcia?",
        a: "Standardowy czas to 14 dni roboczych. Oferuję również usługę ekspresową (do 48h) za dodatkową opłatą (+50%).",
      },
    ],
    seo: {
      title: "Sesja wizerunkowa firmy — Marcin Szabunia | Poznań",
      description:
        "Profesjonalne portrety biznesowe i headshoty dla kadry zarządzającej. Sesje w studiu lub mobilnym studio w biurze. Poznań i cała Polska.",
    },
  },
  {
    slug: "fotografia-eventowa",
    label: "Fotografia eventowa",
    heroTitle: "Fotografia eventowa",
    heroSubtitle:
      "Reportaże z konferencji, targów, gal i bankietów. Profesjonalna dokumentacja wydarzeń biznesowych.",
    description:
      "Konferencje, targi, gale, spotkania firmowe — każde wydarzenie to historia, którą warto opowiedzieć. Fotografuję dyskretnie, w stylu reportażowym, wyłapując kluczowe momenty, emocje i interakcje. Oferuję opcję live editing — zdjęcia gotowe do publikacji na Social Media jeszcze w trakcie eventu.",
    thumbnail: "/images/portfolio-2.jpg",
    gallery: [
      { src: "/images/portfolio/fotografia-eventowa/01.jpg", alt: "Fotografia eventowa — relacja z konferencji biznesowej w Poznaniu" },
    ],
    process: [
      { num: 1, title: "Brief", desc: "Agenda eventu, kluczowe momenty, VIP-y" },
      { num: 2, title: "Realizacja", desc: "Dyskretna fotografia reportażowa" },
      { num: 3, title: "Live edit", desc: "Zdjęcia na Social Media w trakcie eventu" },
      { num: 4, title: "Dostawa", desc: "Pełna galeria w 14 dni roboczych" },
    ],
    pricingType: "table",
    tables: [
      {
        title: "Reportaż Tech & Eventy",
        rows: [
          { label: "Pierwsza godzina pracy", value: "600 zł" },
          { label: "Każda kolejna godzina", value: "400 zł" },
          { label: "Pakiet całodniowy (8h)", value: "2 800 zł" },
        ],
        groups: [
          {
            label: "Opcje dodatkowe",
            items: [
              { label: "Live editing (Social Media)", value: "20 zł / zdjęcie" },
              { label: "Ekspresowa dostawa (do 48h po evencie)", value: "+50% ceny" },
              { label: "Ujęcia z drona", value: "+500 zł" },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Czy mogę otrzymać zdjęcia jeszcze w trakcie eventu?",
        a: "Tak — oferuję usługę live editing. Wybrane zdjęcia edytuję na bieżąco i wysyłam do publikacji na Social Media w trakcie wydarzenia.",
      },
      {
        q: "Ile zdjęć otrzymam z eventu?",
        a: "To zależy od długości wydarzenia. Średnio 50-100 zdjęć na godzinę fotografowania. Wszystkie są starannie wyselekcjonowane i poddane postprodukcji.",
      },
      {
        q: "Czy realizujesz eventy poza Poznaniem?",
        a: "Tak, realizuję zlecenia na terenie całej Polski i Europy. Koszty dojazdu doliczane indywidualnie (2,50 zł/km lub bilety).",
      },
      {
        q: "Czy pakiet całodniowy się opłaca?",
        a: "Przy 8h pracy stawka standardowa wynosiłaby 3 400 zł. Pakiet całodniowy to 2 800 zł — oszczędzasz 600 zł.",
      },
    ],
    seo: {
      title: "Fotografia eventowa — Marcin Szabunia | Poznań",
      description:
        "Profesjonalna fotografia eventowa — konferencje, targi, gale, bankiety. Reportaż + live editing na Social Media. Poznań i cała Polska.",
    },
  },
  {
    slug: "packshoty-produktowe",
    label: "Packshoty produktowe",
    heroTitle: "Fotografia produktowa",
    heroSubtitle:
      "Packshoty na białym tle, zdjęcia kreatywne i aranżacje na e-commerce, katalogi i Social Media.",
    description:
      "Profesjonalne zdjęcia produktowe to fundament sprzedaży online. Tworzę packshoty na czystym białym tle (idealne na marketplace), zdjęcia kreatywne z aranżacją (Social Media, reklamy) oraz zdjęcia katalogowe. Pracuję w studiu z pełnym zapleczem oświetleniowym — drobne produkty, meble, elektronika, kosmetyki.",
    thumbnail: "/images/portfolio-3.jpg",
    gallery: [
      { src: "/images/portfolio/packshoty-produktowe/01.jpg", alt: "Packshot produktowy na białym tle — fotografia produktowa e-commerce, Poznań" },
    ],
    process: [
      { num: 1, title: "Brief", desc: "Cel, platforma sprzedaży, wytyczne marki" },
      { num: 2, title: "Sesja", desc: "Fotografowanie w studiu z kontrolą światła" },
      { num: 3, title: "Retusz", desc: "Clipping path, korekta kolorów, białe tło" },
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
        note: "Minimalne zamówienie: 500 zł lub 6 zdjęć",
      },
    ],
    faqs: [
      {
        q: "Czy mogę przysłać produkty kurierem?",
        a: "Tak — przyjmuję przesyłki kurierskie do studia. Po sesji odsyłam produkty na mój koszt (przy zamówieniach powyżej 1 000 zł).",
      },
      {
        q: "Jakie formaty plików otrzymam?",
        a: "Standardowo JPEG w pełnej rozdzielczości + wersja web (zoptymalizowana). Na życzenie: PNG z przezroczystym tłem, TIFF do druku.",
      },
      {
        q: "Czy robisz zdjęcia produktów w aranżacji?",
        a: "Tak — oprócz packshotów na białym tle tworzę zdjęcia kreatywne z rekwizytami i aranżacją dopasowaną do marki. Cena od 200 zł za ujęcie.",
      },
      {
        q: "Ile zdjęć dziennie jesteś w stanie zrealizować?",
        a: "Przy packshotach na białym tle — ok. 30-50 produktów dziennie (zależy od złożoności). Zdjęcia kreatywne to ok. 8-15 ujęć dziennie.",
      },
    ],
    seo: {
      title: "Fotografia produktowa & packshoty — Marcin Szabunia | Poznań",
      description:
        "Profesjonalne packshoty na białym tle i zdjęcia kreatywne produktów. E-commerce, katalogi, Social Media. Studio w Poznaniu.",
    },
  },
  {
    slug: "sesja-korporacyjna",
    label: "Sesja korporacyjna",
    heroTitle: "Sesja korporacyjna",
    heroSubtitle:
      "Headshoty dla całego zespołu, zdjęcia biura i przestrzeni firmowej. Mobilne studio w Twoim biurze.",
    description:
      "Profesjonalne headshoty zespołu to fundament employer branding. Przyjeżdżam z mobilnym studiem do Twojego biura — każda osoba potrzebuje zaledwie 10-15 minut. Dodatkowo fotografuję przestrzeń biurową, wspólną pracę zespołu i klimat firmy. Idealny materiał na stronę WWW, LinkedIn i materiały rekrutacyjne.",
    thumbnail: "/images/portfolio-4.jpg",
    gallery: [
      { src: "/images/portfolio/sesja-korporacyjna/01.jpg", alt: "Sesja korporacyjna — headshoty zespołu w biurze, Poznań" },
    ],
    process: [
      { num: 1, title: "Logistyka", desc: "Ustalamy harmonogram sesji w biurze" },
      { num: 2, title: "Setup", desc: "Rozstawiam mobilne studio (20 min)" },
      { num: 3, title: "Sesja", desc: "10-15 min na osobę, headshoty + opcja team" },
      { num: 4, title: "Dostawa", desc: "Wyretuszowane zdjęcia w 14 dni" },
    ],
    pricingType: "table",
    tables: [
      {
        title: "Zespoły i Biura",
        rows: [
          { label: "Rozstawienie mobilnego studia", value: "450 zł" },
          { label: "Dodatkowe ujęcie", value: "80 zł" },
        ],
        groups: [
          {
            label: "Stawka za osobę (1 retusz)",
            items: [
              { label: "1-10 osób", value: "150 zł" },
              { label: "11-30 osób", value: "120 zł" },
              { label: "30+ osób", value: "100 zł" },
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
      },
    ],
    faqs: [
      {
        q: "Ile osób mogę sfotografować w jeden dzień?",
        a: "Do 40 osób dziennie przy setupie mobilnego studia w biurze. Każda osoba potrzebuje ok. 10-15 minut na sesję.",
      },
      {
        q: "Ile miejsca potrzebujesz w biurze?",
        a: "Minimum 3m² wolnej przestrzeni i dostęp do gniazdka. Mogę ustawić się w sali konferencyjnej, holu lub nawet na korytarzu.",
      },
      {
        q: "Czy zdjęcia będą spójne dla całego zespołu?",
        a: "Tak — ustawiam identyczne oświetlenie i tło dla wszystkich osób. Dzięki temu headshoty są spójne na stronie WWW i w materiałach firmowych.",
      },
      {
        q: "Czy robisz też zdjęcia biura i wspólnej pracy?",
        a: "Tak — oprócz indywidualnych headshotów mogę sfotografować przestrzeń biurową, teamwork i klimat firmy. Idealny materiał na stronę karriery i Social Media.",
      },
    ],
    seo: {
      title: "Sesja korporacyjna & headshoty zespołu — Marcin Szabunia | Poznań",
      description:
        "Profesjonalne headshoty zespołu i zdjęcia korporacyjne. Mobilne studio w Twoim biurze. Poznań i cała Polska.",
    },
  },
];

/* ── Helpers ── */

export function getCategoryBySlug(slug: string): PortfolioCategory | undefined {
  return portfolioCategories.find((c) => c.slug === slug);
}

export interface PortfolioItem {
  label: string;
  image: string;
  imagePosition?: "top" | "center";
  slug: string;
  externalUrl?: string;
}

export const portfolioItems: PortfolioItem[] = portfolioCategories.map((c) => ({
  label: c.label,
  image: c.tileImage ?? c.thumbnail,
  imagePosition: c.tileImagePosition,
  slug: c.slug,
  externalUrl: c.externalUrl,
}));
