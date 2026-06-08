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
  process: ProcessStep[];
  pricingType: "tiers" | "table";
  tiers?: PricingTier[];
  tables?: PricingTable[];
  pricingNote?: string;
  faqs: FAQItem[];
  caseStudy?: CaseStudy;
  video?: { youtubeId: string; title: string };
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
    label: "E-commerce All-in",
    heroTitle: "E-commerce All-in",
    heroSubtitle:
      "Podsumowanie wideo wydarzenia E-commerce All In na Enea Stadion w Poznaniu: poziomy film i trzy pionowe reelsy z wywiadami.",
    description:
      "E-commerce All In to wydarzenie zorganizowane przez ICEA i Autopay na Enea Stadion w Poznaniu. Odpowiadałem za komplet materiału wideo: poziomy film podsumowujący całe wydarzenie z publikacją na YouTube oraz trzy pionowe reelsy z wywiadami, skrojone pod Social Media. Jeden twórca, spójny materiał: od planu zdjęciowego, przez realizację, po montaż i postprodukcję.",
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
    seo: {
      title: "E-commerce All-in (ICEA × Autopay) — realizacja wideo | Marcin Szabunia",
      description:
        "Case study realizacji wideo z wydarzenia E-commerce All-in (ICEA × Autopay) na Enea Stadion: poziomy film podsumowujący i trzy pionowe reelsy z wywiadami.",
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
          "Światło i kadry dopasowane do Twojego stylu",
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
          "GRATIS: Konsultacja wizerunkowa PDF + Poseboard",
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
        a: "Standardowy czas to 14 dni roboczych. Oferuję również usługę ekspresową (24-48h) za dodatkową opłatą (+50%).",
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
              { label: "Ekspresowa dostawa (24h)", value: "+50% ceny" },
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
              { label: "1-20 sztuk", value: "90 zł / szt." },
              { label: "21-50 sztuk", value: "70 zł / szt." },
              { label: "50+ sztuk", value: "55 zł / szt." },
            ],
          },
          {
            label: "Zdjęcia kreatywne / reklamowe",
            items: [
              { label: "Internet / Social Media", value: "od 200 zł / szt." },
              { label: "Druk / Outdoor", value: "od 600 zł / szt." },
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
              { label: "1-10 osób", value: "150 zł / os." },
              { label: "11-30 osób", value: "120 zł / os." },
              { label: "30+ osób", value: "100 zł / os." },
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
  slug: string;
  externalUrl?: string;
}

export const portfolioItems: PortfolioItem[] = portfolioCategories.map((c) => ({
  label: c.label,
  image: c.thumbnail,
  slug: c.slug,
  externalUrl: c.externalUrl,
}));
