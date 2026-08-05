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
  footerRows?: { label: string; value: string; note?: string }[];
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
  /** Linki klienta (wizytówka, social, strona) — wiersz pod proofLink w hero */
  clientLinks?: { label: string; url: string }[];
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
  /** uploadDate/duration: realne wartości z YouTube (wymagane w VideoObject — raport GSC 2026-07-07) */
  video?: { youtubeId: string; title: string; uploadDate: string; duration: string };
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
    label: "E-commerce All-in: film z eventu i reelsy",
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
    tileImage: "/images/portfolio/woohoo-ecommerce-4x3.jpg",
    gallery: [],
    process: [],
    pricingType: "tiers",
    faqs: [],
    video: {
      youtubeId: "4INLtKcKcZk",
      title: "E-commerce All-in: podsumowanie wydarzenia (ICEA × Autopay)",
      uploadDate: "2026-03-30",
      duration: "PT2M12S",
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
      client: "Woohoo, partner wydarzenia E-commerce All In",
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
      testimonial: {
        quote:
          "Mieliśmy przyjemność współpracować z Marcinem przy realizacji materiałów foto i wideo z eventu biznesowego oraz przygotowaniu treści na potrzeby social media. Współpraca od początku do końca przebiegała wzorowo. Marcin wyróżnia się nie tylko wysokimi kompetencjami technicznymi, ale również doskonałym wyczuciem biznesowym i marketingowym. Potrafi uchwycić najważniejsze momenty wydarzenia, a jednocześnie przygotować materiały, które świetnie sprawdzają się w komunikacji marki i działaniach promocyjnych. Ogromnie doceniamy sprawną komunikację, elastyczność oraz ekspresowe tempo realizacji. Na każdym etapie mogliśmy liczyć na profesjonalne wsparcie, zaangażowanie i proaktywne podejście. To współpraca, do której z przyjemnością będziemy wracać przy kolejnych projektach.",
        author: "Maja Formalik",
        role: "Growth & Partnerships Manager, Woohoo · opinia Google",
      },
    },
    seo: {
      title: "E-commerce All-in: realizacja wideo | Szabunia",
      description:
        "Realizacja wideo dla Woohoo z wydarzenia E-commerce All-in (ICEA i Autopay) na Enea Stadion: film podsumowujący i trzy reelsy z wywiadami.",
    },
  },
  {
    slug: "box17-budki-akustyczne",
    label: "Box17: packshoty budek akustycznych + film",
    heroTitle: "Box17: packshoty budek akustycznych i film produktowy",
    heroSubtitle:
      "Jednodniowa sesja produktowa rodziny budek akustycznych Box17: zdjęcia na cykloramie i w showroomie oraz dwa filmy produktowe, pod stronę, sklep i social media.",
    description:
      "Box17 (marka firmy Tim Petzold z Tarnowa Podgórnego) produkuje budki akustyczne i pody do biur. W jeden dzień zdjęciowy zrealizowałem komplet materiału dla pięciu modeli: dużej Box XL ustawionej na cykloramie oraz czterech budek w showroomie, Box 1 Flex, Box 1 Stand, Box 2 Work i Box 2 Flex. Powstały zdjęcia pustych budek, kadry z meblami i ludźmi oraz detale (światło, wentylacja, regulacje), a do tego dwa filmy produktowe do prezentacji oferty. Z całości klient wybrał 10 zdjęć, które przeszły pełny retusz. Spójna stylistyka pozwala rozbudowywać materiał o kolejne produkty, a wideo pracuje na stronie i w rozmowach handlowych.",
    badge: "Realizacja foto + wideo",
    scope: [
      "Packshoty budki na cykloramie (Box XL)",
      "Zdjęcia budek w showroomie",
      "Ujęcia detali: światło, wentylacja, regulacje",
      "Dwa filmy produktowe",
      "Montaż i postprodukcja",
    ],
    thumbnail: "/images/portfolio/box17/box17-budka-konferencyjna-katowa.jpg",
    gallery: [
      { src: "/images/portfolio/box17/box17-01-budka-konferencyjna-z-zespolem.jpg", alt: "Budka akustyczna Box XL na cykloramie, spotkanie zespołu w środku (Box17)" },
      { src: "/images/portfolio/box17/box17-02-pusta-sala-konferencyjna.jpg", alt: "Wnętrze budki akustycznej Box XL: stół, krzesła i ekran do wideokonferencji" },
      { src: "/images/portfolio/box17/box17-03-budka-do-pracy-z-laptopem.jpg", alt: "Budka akustyczna ustawiona w biurze, stanowisko do pracy w skupieniu (Box17)" },
      { src: "/images/portfolio/box17/box17-04-budka-telefoniczna-pusta.jpg", alt: "Jednoosobowa budka akustyczna Box 1, packshot na białym tle" },
      { src: "/images/portfolio/box17/box17-05-czarna-budka-w-biurze.jpg", alt: "Budka akustyczna w przestrzeni biurowej, rozmowa telefoniczna bez hałasu" },
      { src: "/images/portfolio/box17/box17-06-rozmowa-telefoniczna-w-budce.jpg", alt: "Budka akustyczna jednoosobowa w użyciu, zdjęcie produktowe z modelem" },
      { src: "/images/portfolio/box17/box17-07-wnetrze-kabiny-akustycznej.jpg", alt: "Wnętrze budki akustycznej: wykończenie ścian i wykładzina podłogowa" },
      { src: "/images/portfolio/box17/box17-08-detal-filcu-i-wentylacji.jpg", alt: "Detal sufitu budki akustycznej: oświetlenie liniowe i wentylacja" },
      { src: "/images/portfolio/box17/box17-09-skladany-blat-i-gniazda.jpg", alt: "Detal blatu i gniazd elektrycznych w budce akustycznej Box17" },
    ],
    gallerySubtitle:
      "Wybrane kadry z sesji dla Box17: budki akustyczne na cykloramie i w showroomie, ujęcia całości i detali.",
    process: [],
    pricingType: "tiers",
    faqs: [],
    video: {
      youtubeId: "vjpUby-NZsY",
      title: "Box17: film produktowy budki akustycznej (Box XL)",
      uploadDate: "2026-02-16",
      duration: "PT28S",
    },
    caseStudy: {
      client: "Box17 (Tim Petzold)",
      industry: "Producent budek akustycznych i podów do biur, Tarnowo Podgórne",
      challenge:
        "Spójne materiały produktowe całej rodziny budek akustycznych (od dużej Box XL po modele jednoosobowe) pod stronę internetową, sklep i social media, zrealizowane w jeden dzień mimo różnej dostępności budek (Box XL gotowa dopiero po południu).",
      solution:
        "Jednodniowa sesja pięciu modeli: Box XL na cykloramie oraz Box 1 Flex, Box 1 Stand, Box 2 Work i Box 2 Flex w showroomie. Zdjęcia pustych budek, kadry z meblami i ludźmi oraz detale (światło, wentylacja, regulacje), uzupełnione dwoma filmami produktowymi do prezentacji oferty.",
      results: [
        { label: "modeli budek w jednej sesji", value: "5" },
        { label: "wyselekcjonowanych i wyretuszowanych zdjęć", value: "10" },
        { label: "filmy produktowe", value: "2" },
        { label: "zastosowania: strona WWW, sklep, social media", value: "3" },
      ],
    },
    seo: {
      title: "Box17: packshoty budek akustycznych | Szabunia",
      description:
        "Case study dla Box17 (Tarnowo Podgórne): jednodniowa sesja pięciu budek akustycznych, packshoty na cykloramie, zdjęcia w showroomie i dwa filmy produktowe.",
    },
  },
  {
    slug: "artech-fotografia-produktowa",
    label: "Artech: packshoty i film z produkcji",
    heroTitle: "Artech: packshoty i film z produkcji",
    heroSubtitle:
      "Fotografia produktowa półfabrykatów i detali z tworzyw sztucznych na stronę i do katalogu oraz film z hali produkcyjnej do prezentacji oferty klientom.",
    description:
      "Artech Group to poznańskie centrum obróbki tworzyw sztucznych: frezowanie, toczenie i cięcie CNC płyt, wałków i detali dla przemysłu. Dla Artech zrealizowałem dwa rodzaje materiału. Pierwszy to packshoty na białym tle, czyli półfabrykaty i detale z różnych tworzyw przygotowane pod stronę, katalog i sklep. Drugi to film z hali produkcyjnej, który pokazuje park maszynowy i sposób pracy firmy. Wideo pracuje na stronie i w rozmowach handlowych: zamiast opisywać możliwości produkcyjne, Artech po prostu je pokazuje.",
    badge: "Realizacja foto + wideo",
    scope: [
      "Packshoty na białym tle",
      "Film z produkcji (YouTube)",
      "Zdjęcia pod stronę i katalog",
      "Montaż i postprodukcja",
    ],
    thumbnail: "/images/portfolio/artech/_F2A8937.jpg",
    tileImage: "/images/portfolio/artech/artech-film-cover.jpg",
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
      title: "Artech: film z hali produkcyjnej (obróbka tworzyw sztucznych)",
      uploadDate: "2025-03-21",
      duration: "PT33S",
    },
    caseStudy: {
      client: "Artech Group",
      industry: "Centrum obróbki tworzyw sztucznych CNC, Poznań",
      challenge:
        "Spójne packshoty półfabrykatów i detali z tworzyw pod stronę, katalog i sklep oraz film, który pokaże park maszynowy i sposób pracy firmom z przemysłu.",
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
        role: "Prezes Artech Group · opinia Google",
      },
    },
    seo: {
      title: "Artech: packshoty i film z produkcji | Szabunia",
      description:
        "Case study dla Artech Group (Poznań): packshoty półfabrykatów i detali z tworzyw sztucznych na stronę WWW i do katalogu oraz film z hali produkcyjnej.",
    },
  },
  {
    slug: "idcom-headshoty-zespolu",
    label: "IDcom: headshoty zespołu",
    heroTitle: "IDcom: headshoty zespołu na trzech tłach",
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
      // ZDJ2608-34 (04.08.2026): szósty kadr był powtórką `_F2A9376-Edit-2.jpg`, czyli tego
      // samego pliku, który jest miniaturą i hero tej realizacji. W galerii sześcioelementowej
      // jedno miejsce z sześciu szło na powtórkę, a folder `idcom/` ma dokładnie sześć plików,
      // więc nie ma z czego dobrać siódmego. Zostaje pięć różnych kadrów.
    ],
    gallerySubtitle:
      "Pięć kadrów z sesji dla IDcom Group: ten sam zespół na trzech tłach, białym, czarnym z niebieskim światłem i kremowym.",
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
      title: "IDcom: headshoty zespołu na 3 tłach | Szabunia",
      description:
        "Case study sesji wizerunkowej zespołu IDcom Group (Poznań): spójne portrety na trzech tłach (białym, czarnym i kremowym) na stronę WWW i materiały firmowe.",
    },
  },
  {
    slug: "yes-butcher-przewodnik-michelin",
    label: "Yes Butcher!: sesja do przewodnika Michelin ★",
    heroTitle: "Yes Butcher!: sesja do przewodnika Michelin",
    heroSubtitle:
      "Wnętrza, nagrodzony stek i portrety szefa kuchni dla steakhouse'u w poznańskich Starych Koszarach. Zdjęcia trafiły na profil restauracji w przewodniku Michelin.",
    description:
      "Yes Butcher! Shop & Bistro to steakhouse i sklep mięsny w Starych Koszarach, poznański oddział warszawskiej marki, obecny w przewodniku Michelin. Klient potrzebował kompletu materiału w jeden dzień zdjęciowy, w działającym lokalu: budynek z drona, wnętrza obu sal (od baru i otwartej kuchni po szafę do sezonowania mięsa), portrety szefa kuchni oraz bohatera karty, czyli stek ribeye nagrodzony w World Steak Challenge 2025, w firmowym pudełku z certyfikatem. Jedna sesja pokryła cztery rodzaje fotografii, a zdjęcia pracują na profilu Michelin i w reklamach restauracji.",
    thumbnail: "/images/portfolio/yes-butcher/yes-butcher-43.jpg",
    heroAspect: "portrait",
    tileImage: "/images/portfolio/yes-butcher/yes-butcher-tile.jpg",
    proofLink: {
      label: "Zobacz profil Yes Butcher! w przewodniku Michelin",
      url: "https://guide.michelin.com/en/wielkopolskie/poznan_2395985/restaurant/yes-butcher",
    },
    clientLinks: [
      { label: "Yes Butcher! Stare Koszary", url: "https://yesbutcher.pl/poznan-stare-koszary/" },
      { label: "@yes.butcher.poznan", url: "https://www.instagram.com/yes.butcher.poznan/" },
      { label: "Wizytówka Google", url: "https://share.google/FZ1wpt0vymfTgDuuO" },
    ],
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
      title: "Yes Butcher w przewodniku Michelin | Szabunia",
      description:
        "Sesja dla Yes Butcher Shop & Bistro w Poznaniu: dron, wnętrza, portrety szefa kuchni i nagrodzony stek. Zdjęcia trafiły do przewodnika Michelin.",
    },
  },
  {
    slug: "sesja-wizerunkowa",
    label: "Sesja wizerunkowa firmy",
    heroTitle: "Sesja wizerunkowa firmy",
    heroSubtitle:
      "Profesjonalne portrety biznesowe, headshoty i zdjęcia do personal brandingu dla kadry zarządzającej i liderów.",
    description:
      "Wizerunek kadry zarządzającej to wizytówka całej firmy. Tworzę portrety biznesowe na stronę internetową, LinkedIn, materiały prasowe i raporty roczne. Sesje realizuję w mobilnym studiu (dojeżdżam do biura) lub w wynajętej przestrzeni. Zaczynamy od krótkiej rozmowy, w której ustalamy cel, styl i logistykę, a w pakietach przed sesją dostajesz poseboard z referencjami.",
    // ZDJ2608-17 (04.08.2026), WARIANT B. Poprzednia miniatura (plik `portfolio-1`, dziś
    // w `_to_delete/`) to zdjęcie grupowe przy autach sportowych, czyli ten sam kadr, który 04.08 wyleciał
    // z galerii tej realizacji jako obcy. Wariant A briefu (portret-05) odpadł: portret-05
    // jest już hero usługi „Wizerunek i portrety" i kafelkiem tej usługi, więc stanąłby
    // trzeci raz, a ta sama tura usuwa powtórzenia (ZDJ2608-27, ZDJ2608-34).
    thumbnail: "/images/galeria/portrety/portret-12-kobieta-w-plenerze.jpg",
    gallery: [
      // Zdjęcie grupowe przy samochodach sportowych przeniesione 04.08.2026: na sesji
      // wizerunkowej było obce, a ten sam kadr żyje już w galerii eventowej (event-02)
      // i przez nią trafia na eventy, pakiety foto + wideo i portfolio eventowe.
      // Rozbudowane 04.08.2026. Strona miała jedno zdjęcie, co przy pozycji w menu
      // „Portfolio" działało na niekorzyść. Kadry wskazują istniejące pliki z galerii,
      // bez kopiowania na dysk, tak jak kategoria `obiekty` wskazuje pliki `dron`.
      { src: "/images/galeria/portrety/portret-05-mezczyzna-zielony-garnitur.jpg", alt: "Portret wizerunkowy mężczyzny w garniturze, sesja dla firmy, Poznań" },
      { src: "/images/galeria/portrety/portret-07-kobieta-czarna-marynarka.jpg", alt: "Portret biznesowy kobiety w marynarce, sesja wizerunkowa, Poznań" },
      { src: "/images/galeria/portrety/portret-03-mezczyzna-czarne-tlo.jpg", alt: "Portret wizerunkowy na czarnym tle, personal branding, Poznań" },
      { src: "/images/galeria/portrety/portret-08-kobieta-morski-kombinezon.jpg", alt: "Portret biznesowy kobiety na jasnym tle, sesja wizerunkowa dla firmy" },
      { src: "/images/galeria/portrety/portret-14-mezczyzna-z-telefonem.jpg", alt: "Portret wizerunkowy w naturalnym świetle, sesja dla firmy, Poznań" },
      { src: "/images/galeria/portrety/portret-10-kobieta-bezowa-marynarka.jpg", alt: "Portret biznesowy kobiety, zdjęcie na stronę firmy i LinkedIn" },
    ],
    process: [
      { num: 1, title: "Konsultacja", desc: "Omawiamy cel, styl i wizję wizerunku" },
      { num: 2, title: "Poseboard", desc: "W pakietach przygotowuję poseboard z referencjami" },
      { num: 3, title: "Sesja", desc: "Profesjonalna sesja w studiu lub biurze" },
      { num: 4, title: "Dostawa", desc: "Wyselekcjonowane zdjęcia w 14 dni" },
    ],
    // Cennik celowo usunięty z draftu (audyt 2026-07-06): trzymał przestarzałe
    // kopie cen. Kanon cen: src/data/services.tsx + Pricing.tsx.
    pricingType: "tiers",
    faqs: [
      {
        q: "Ile trwa sesja wizerunkowa?",
        a: "W zależności od pakietu: od 30 minut w progu startowym do 3 godzin w najszerszym pakiecie. Czas obejmuje przygotowanie oświetlenia, sesję oraz ewentualne zmiany stylizacji.",
      },
      {
        q: "Czy mogę mieć sesję w swoim biurze?",
        a: "Tak. Przyjeżdżam z mobilnym studiem, potrzebuję ok. 5 m² wolnej przestrzeni i dostępu do gniazdka. Rozstawienie sprzętu zajmuje ok. 30 minut.",
      },
      {
        q: "Ile osób możesz sfotografować w jeden dzień?",
        a: "Przy portretach biznesowych: do 40 osób dziennie (przy setupie studyjnym na miejscu). Każda osoba potrzebuje ok. 5-15 minut.",
      },
      {
        q: "Jak szybko otrzymam gotowe zdjęcia?",
        a: "Standardowy czas to 14 dni. Oferuję również usługę ekspresową (do 48h) za dodatkową opłatą (+50%).",
      },
    ],
    seo: {
      title: "Przykłady sesji wizerunkowych dla firm | Szabunia",
      description:
        "Kadry z sesji wizerunkowych kadry zarządzającej: studio i mobilne studio w biurze klienta. Przykłady realizacji, nie oferta.",
    },
  },
  {
    slug: "fotografia-eventowa",
    label: "Fotografia eventowa",
    heroTitle: "Fotografia eventowa",
    heroSubtitle:
      "Reportaże z konferencji, targów, gal i bankietów. Profesjonalna dokumentacja wydarzeń biznesowych.",
    description:
      "Konferencje, targi, gale, spotkania firmowe: każde wydarzenie to historia, którą warto opowiedzieć. Fotografuję dyskretnie, w stylu reportażowym, wyłapując kluczowe momenty, emocje i interakcje. Oferuję opcję live editing: zdjęcia gotowe do publikacji na social media jeszcze w trakcie eventu.",
    thumbnail: "/images/portfolio-2.jpg",
    gallery: [
      { src: "/images/portfolio/fotografia-eventowa/01.jpg", alt: "Fotografia eventowa, relacja z konferencji biznesowej w Poznaniu" },
      // Rozbudowane 04.08.2026. Strona miała jedno zdjęcie, co przy pozycji w menu
      // „Portfolio" działało na niekorzyść. Kadry wskazują istniejące pliki z galerii,
      // bez kopiowania na dysk, tak jak kategoria `obiekty` wskazuje pliki `dron`.
      { src: "/images/galeria/eventy/event-05-networking-foyer.jpg", alt: "Rozmowy uczestników konferencji firmowej, fotografia eventowa, Poznań" },
      { src: "/images/galeria/eventy/event-04-gala-wreczenie-wyroznien.jpg", alt: "Gala firmowa, wręczenie wyróżnień, reportaż z wydarzenia, Poznań" },
      { src: "/images/galeria/eventy/event-15-goscie-przy-stole.jpg", alt: "Networking na evencie biznesowym, fotografia reportażowa, Poznań" },
      { src: "/images/galeria/eventy/event-14-saksofonista-bankiet.jpg", alt: "Oprawa muzyczna gali firmowej, reportaż z wydarzenia" },
      { src: "/images/galeria/eventy/event-01-zespol-na-scenie.jpg", alt: "Scena podczas eventu firmowego, fotografia w trudnym świetle" },
      { src: "/images/galeria/eventy/event-02-zdjecie-grupowe-tor.jpg", alt: "Zdjęcie grupowe uczestników wydarzenia firmowego na torze" },
      { src: "/images/galeria/eventy/event-03-integracja-przybicie-piatki.jpg", alt: "Integracja firmowa w plenerze, reportaż z wydarzenia" },
    ],
    process: [
      { num: 1, title: "Rozmowa", desc: "Agenda eventu, kluczowe momenty, VIP-y" },
      { num: 2, title: "Realizacja", desc: "Dyskretna fotografia reportażowa" },
      { num: 3, title: "Live edit", desc: "Zdjęcia na social media w trakcie eventu" },
      { num: 4, title: "Dostawa", desc: "Pełna galeria w 14 dni" },
    ],
    // Cennik celowo usunięty z draftu (audyt 2026-07-06) — kanon: services.tsx.
    pricingType: "table",
    faqs: [
      {
        q: "Czy mogę otrzymać zdjęcia jeszcze w trakcie eventu?",
        a: "Tak, oferuję usługę live editing. Wybrane zdjęcia edytuję na bieżąco i wysyłam do publikacji na social media w trakcie wydarzenia.",
      },
      {
        q: "Ile zdjęć otrzymam z eventu?",
        a: "To zależy od długości wydarzenia. Około 30 gotowych zdjęć na każdą godzinę obecności, wyselekcjonowanych i poddanych postprodukcji (autorska selekcja najlepszych momentów). Przy pakietach foto + wideo jest ich mniej, bo część czasu idzie na nagrywanie.",
      },
      {
        q: "Czy realizujesz eventy poza Poznaniem?",
        a: "Tak, realizuję zlecenia na terenie całej Polski i Europy. W Poznaniu dojazd jest bezpłatny, poza miastem 2,50 zł netto za kilometr w obie strony, liczone od granic miasta. Przy wyjazdach zagranicznych koszty ustalamy indywidualnie.",
      },
      {
        q: "Czy pakiet całodniowy się opłaca?",
        a: "Przy całodniowej realizacji pakiet dzienny wychodzi korzystniej niż rozliczenie godzinowe.",
      },
    ],
    seo: {
      title: "Przykłady zdjęć z eventów firmowych | Szabunia",
      description:
        "Kadry z konferencji, targów, gal i bankietów. Przykłady reportaży z wydarzeń firmowych, w tym zdjęcia przekazywane w trakcie eventu.",
    },
  },
  {
    slug: "packshoty-produktowe",
    label: "Packshoty produktowe",
    heroTitle: "Fotografia produktowa",
    heroSubtitle:
      "Packshoty na białym tle, zdjęcia kreatywne i aranżacje na e-commerce, katalogi i social media.",
    description:
      "Zdjęcia produktowe to fundament sprzedaży online. Tworzę packshoty na czystym białym tle (idealne na marketplace), zdjęcia kreatywne z aranżacją (social media, reklamy) oraz zdjęcia katalogowe. Pracuję w studiu z pełnym zapleczem oświetleniowym: drobne produkty, meble, elektronika, kosmetyki.",
    thumbnail: "/images/portfolio-3.jpg",
    gallery: [
      // ZDJ2608-08 (04.08.2026): plik to szklanka drinka z limonką na jaskrawożółtym tle
      // z liśćmi monstery (1600x1600), nie packshot na bieli. Opis poprawiony na kadr.
      { src: "/images/portfolio/packshoty-produktowe/01.jpg", alt: "Zdjęcie produktowe drinka na żółtym tle, aranżacja reklamowa na social media" },
      // Rozbudowane 04.08.2026. Strona miała jedno zdjęcie, co przy pozycji w menu
      // „Portfolio" działało na niekorzyść. Kadry wskazują istniejące pliki z galerii,
      // bez kopiowania na dysk, tak jak kategoria `obiekty` wskazuje pliki `dron`.
      { src: "/images/galeria/produktowe/produkt-13-hob-koszulka.jpg", alt: "Packshot koszulki na białym tle, zdjęcie produktowe do sklepu internetowego" },
      { src: "/images/galeria/produktowe/produkt-15-hob-czapka.jpg", alt: "Packshot czapki na białym tle, fotografia produktowa e-commerce" },
      { src: "/images/galeria/produktowe/produkt-17-brembo.jpg", alt: "Packshot produktu na białym tle, zdjęcie katalogowe" },
      { src: "/images/galeria/produktowe/produkt-18-kule-3d.jpg", alt: "Packshot produktu technicznego na białym tle, zdjęcie do katalogu" },
      { src: "/images/galeria/produktowe/produkt-14-hob-koszulki.jpg", alt: "Zdjęcie produktowe koszulki na ciemnym tle, fotografia reklamowa" },
      { src: "/images/galeria/produktowe/produkt-03-caprice.jpg", alt: "Aranżacja produktowa napojów, zdjęcia kreatywne na social media" },
      { src: "/images/galeria/produktowe/produkt-02-amarula.jpg", alt: "Aranżacja produktowa z butelką, fotografia reklamowa produktu" },
      { src: "/images/galeria/produktowe/produkt-01-toast-belvedere.jpg", alt: "Zdjęcie produktowe alkoholu w scenerii, fotografia reklamowa" },
    ],
    process: [
      { num: 1, title: "Rozmowa", desc: "Cel, platforma sprzedaży, wytyczne marki" },
      { num: 2, title: "Sesja", desc: "Fotografowanie w studiu z kontrolą światła" },
      { num: 3, title: "Retusz", desc: "Clipping path, korekta kolorów, białe tło" },
      { num: 4, title: "Dostawa", desc: "Pliki gotowe do użycia w 14 dni" },
    ],
    // Cennik celowo usunięty z draftu (audyt 2026-07-06) — kanon: services.tsx.
    pricingType: "table",
    faqs: [
      {
        q: "Czy mogę przysłać produkty kurierem?",
        a: "Tak, przyjmuję przesyłki kurierskie do studia. Koszt przesyłki zwrotnej ustalamy przy wycenie, zależnie od gabarytu i liczby pozycji.",
      },
      {
        q: "Jakie formaty plików otrzymam?",
        a: "Standardowo JPEG w pełnej rozdzielczości + wersja web (zoptymalizowana). Na życzenie: PNG z przezroczystym tłem, TIFF do druku.",
      },
      {
        q: "Czy robisz zdjęcia produktów w aranżacji?",
        a: "Tak, oprócz packshotów na białym tle tworzę zdjęcia kreatywne z rekwizytami i aranżacją dopasowaną do marki. Zdjęcia kreatywne wyceniam indywidualnie w zależności od pola eksploatacji.",
      },
      {
        q: "Ile zdjęć dziennie jesteś w stanie zrealizować?",
        a: "Przy packshotach na białym tle: ok. 30-50 produktów dziennie (zależy od złożoności). Zdjęcia kreatywne to ok. 8-15 ujęć dziennie.",
      },
    ],
    seo: {
      title: "Przykłady packshotów i zdjęć produktów | Szabunia",
      description:
        "Kadry z sesji produktowych: packshoty na białym tle i zdjęcia kreatywne. Przykłady realizacji dla e-commerce i katalogów.",
    },
  },
  {
    slug: "sesja-korporacyjna",
    label: "Sesja korporacyjna",
    heroTitle: "Sesja korporacyjna",
    heroSubtitle:
      "Headshoty dla całego zespołu, zdjęcia biura i przestrzeni firmowej. Mobilne studio w Twoim biurze.",
    description:
      "Headshoty zespołu to fundament employer brandingu. Przyjeżdżam z mobilnym studiem do Twojego biura, każda osoba potrzebuje zaledwie 5-15 minut. Dodatkowo fotografuję przestrzeń biurową, wspólną pracę zespołu i klimat firmy. Idealny materiał na stronę WWW, LinkedIn i materiały rekrutacyjne.",
    thumbnail: "/images/portfolio-4.jpg",
    gallery: [
      // ZDJ2608-09 (04.08.2026): na kadrze jest JEDNA kobieta w błękitnej koszuli
      // z czerwonym notatnikiem przy oknie, nie „headshoty zespołu" w liczbie mnogiej.
      { src: "/images/portfolio/sesja-korporacyjna/01.jpg", alt: "Portret korporacyjny kobiety przy oknie w biurze, zdjęcie na stronę firmy, Poznań" },
      // Rozbudowane 04.08.2026. Strona miała jedno zdjęcie, co przy pozycji w menu
      // „Portfolio" działało na niekorzyść. Kadry wskazują istniejące pliki z galerii,
      // bez kopiowania na dysk, tak jak kategoria `obiekty` wskazuje pliki `dron`.
      { src: "/images/portfolio/idcom/_F2A9424-Edit-2.jpg", alt: "Headshot korporacyjny na białym tle, sesja dla zespołu IDcom Group" },
      { src: "/images/portfolio/idcom/_F0I9883-Edit-2.jpg", alt: "Headshot korporacyjny na kremowym tle, spójny standard dla zespołu" },
      { src: "/images/galeria/portrety/portret-02-kobieta-z-laptopem.jpg", alt: "Portret korporacyjny kobiety, zdjęcie na stronę firmy" },
      { src: "/images/galeria/portrety/portret-11-mezczyzna-w-fotelu.jpg", alt: "Portret korporacyjny mężczyzny w garniturze, zdjęcie dla firmy" },
      { src: "/images/galeria/portrety/portret-13-kobieta-przy-oknie.jpg", alt: "Portret korporacyjny w naturalnym świetle, zdjęcie na LinkedIn" },
      { src: "/images/galeria/portrety/portret-12-kobieta-w-plenerze.jpg", alt: "Portret korporacyjny w plenerze, zdjęcie na stronę firmową" },
    ],
    process: [
      { num: 1, title: "Logistyka", desc: "Ustalamy harmonogram sesji w biurze" },
      { num: 2, title: "Setup", desc: "Rozstawiam mobilne studio (30 min)" },
      { num: 3, title: "Sesja", desc: "5-15 min na osobę, headshoty + opcja team" },
      { num: 4, title: "Dostawa", desc: "Wyretuszowane zdjęcia w 14 dni" },
    ],
    // Cennik celowo usunięty z draftu (audyt 2026-07-06) — kanon: services.tsx.
    pricingType: "table",
    faqs: [
      {
        q: "Ile osób możesz sfotografować w jeden dzień?",
        a: "Do 40 osób dziennie przy setupie mobilnego studia w biurze. Każda osoba potrzebuje ok. 5-15 minut na sesję.",
      },
      {
        q: "Ile miejsca potrzebujesz w biurze?",
        a: "Minimum 5 m² wolnej przestrzeni i dostęp do gniazdka. Mogę ustawić się w sali konferencyjnej, holu lub nawet na korytarzu.",
      },
      {
        q: "Czy zdjęcia będą spójne dla całego zespołu?",
        a: "Tak, ustawiam identyczne oświetlenie i tło dla wszystkich osób. Dzięki temu headshoty są spójne na stronie WWW i w materiałach firmowych.",
      },
      {
        q: "Czy robisz też zdjęcia biura i wspólnej pracy?",
        a: "Tak, oprócz indywidualnych headshotów mogę sfotografować przestrzeń biurową, teamwork i klimat firmy. Idealny materiał na stronę kariery i social media.",
      },
    ],
    seo: {
      title: "Przykłady headshotów zespołu: studio i biuro | Szabunia",
      description:
        "Kadry z sesji zespołowych realizowanych w studiu i w biurach klientów. Przykłady spójnych portretów całego zespołu na jednym tle.",
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
  hasVideo?: boolean;
}

// Realizacje w przygotowaniu (na razie 1 zdjęcie + placeholder „Więcej zdjęć
// wkrótce"). Ukryte z indeksu /portfolio, z sitemap i z indeksacji do czasu
// uzupełnienia galerii. Aby pokazać realizację — usuń jej slug z tego zbioru.
const DRAFT_SLUGS = new Set<string>([
  // Box17: zdjęcia SĄ. W public/images/portfolio/box17/ leży 10 plików JPG od commita
  // 9fc7ff4 (04.08.2026), łącznie z miniaturą (dziś `box17-budka-konferencyjna-katowa.jpg`,
  // przemianowaną w ZDJ2608-01), a dane case study są kompletne.
  // Decyzja Marcina z 04.08.2026: realizacja mimo to zostaje ukryta. Poprzedni warunek
  // wyjścia („po wgraniu miniatury wystarczy usunąć tę linię") jest spełniony i dlatego
  // został usunięty — inaczej każdy kolejny audyt podnosi to samo (ZDJ2608-02b).
  // TODO (Marcin): wpisać realny warunek publikacji, np. zgoda klienta albo publikacja
  // u klienta. Bez niego ten wiersz nie ma kryterium wyjścia i sytuacja się powtórzy.
  "box17-budki-akustyczne",
  // ZDJ2608-31 (DZ1 = A, decyzja Marcina 04.08.2026): cztery realizacje zdjęte z draftu.
  // Galerie uzupełniono 04.08 (sesja-wizerunkowa 6 kadrów, fotografia-eventowa 8,
  // packshoty-produktowe 9, sesja-korporacyjna 7), więc próg placeholdera „Więcej zdjęć
  // wkrótce" (PortfolioGallery.tsx, images.length < 3) nie łapie żadnej z nich, a pliki OG
  // leżą w public/images/og/portfolio/ od 30.07. /portfolio idzie z 4 na 8 pozycji.
  // Aby cofnąć: dopisać te cztery slugi z powrotem do tego zbioru.
]);

export function isPortfolioDraft(slug: string): boolean {
  return DRAFT_SLUGS.has(slug);
}

// ZDJ2608-32 + ZDJ2608-03 (DZ2 = A, 04.08.2026): kolejność pierwszych czterech kafli
// na /portfolio, ta sama co FEATURED_SLUGS na stronie głównej. Bez tego /portfolio
// otwierałby dalej `woohoo-autopay` (gallery puste, kafelek to plansza tytułowa),
// czyli poprawka działałaby na home, a nie działała jedno kliknięcie dalej.
// Slugi spoza listy idą po niej, w kolejności z `portfolioCategories`.
// Kafelek Artechu zostaje klatką z filmu: to osobna decyzja Marcina (ZDJ2608-03).
// Aby cofnąć: usunąć tę stałą i `.sort(...)` niżej.
const PORTFOLIO_DISPLAY_ORDER: string[] = [
  "idcom-headshoty-zespolu",
  "yes-butcher-przewodnik-michelin",
  "woohoo-autopay",
  "artech-fotografia-produktowa",
];

const displayRank = (slug: string) => {
  const i = PORTFOLIO_DISPLAY_ORDER.indexOf(slug);
  return i === -1 ? PORTFOLIO_DISPLAY_ORDER.length : i;
};

export const portfolioItems: PortfolioItem[] = portfolioCategories
  .filter((c) => !DRAFT_SLUGS.has(c.slug))
  .slice()
  .sort((a, b) => displayRank(a.slug) - displayRank(b.slug))
  .map((c) => ({
    label: c.label,
    image: c.tileImage ?? c.thumbnail,
    imagePosition: c.tileImagePosition,
    slug: c.slug,
    externalUrl: c.externalUrl,
    hasVideo: !!c.video,
  }));
