export type PrivateTier = {
  name: string;
  /** Display price, e.g. "1 200 zł" or "Wycena indywidualna". */
  price: string;
  /** Numeric value in PLN (brutto) for potential structured data. Omitted for individual quotes. */
  priceValue?: number;
  tagline?: string;
  features: string[];
  recommended?: boolean;
};

export type PrivateCategory = {
  id: string;
  title: string;
  description: string;
  tiers: PrivateTier[];
};

export type PrivateModifier = { label: string; value: string };
export type PrivateCondition = { title: string; body: string };

export const privateTrust = [
  {
    title: "Autorski retusz każdego kadru",
    body: "Naturalna skóra, czyste światło, profesjonalny wygląd. Bez sztucznych filtrów i masowej obróbki.",
  },
  {
    title: "Doświadczenie z markami klasy enterprise",
    body: "Pracowałem m.in. z H&M, Santander Bank Polska i Warner Music Poland. Tę samą jakość dostajesz w sesji prywatnej.",
  },
  {
    title: "Terminowość",
    body: "Galeria do wyboru w 48h, finały w 14 dni. Express 24h dostępny za dopłatą.",
  },
];

export const privateCategories: PrivateCategory[] = [
  {
    id: "portrety",
    title: "Sesje portretowe",
    description:
      "Portret na własny wizerunek, do CV, na social media lub po prostu dla siebie — z czasem dopasowanym do efektu, jaki chcesz osiągnąć.",
    tiers: [
      {
        name: "MINI",
        price: "1 200 zł",
        priceValue: 1200,
        tagline: "Szybka, mocna sesja — kilka świetnych ujęć.",
        features: [
          "1 osoba, 1 stylizacja, do 1h sesji",
          "5 zdjęć w autorskim retuszu (wybór ze 100+ ujęć)",
          "Studio lub plener w Poznaniu w cenie",
          "Poseboard (ściąga z pozowania) przed sesją",
          "Dodatkowe zdjęcie: 150 zł",
        ],
      },
      {
        name: "STANDARD",
        price: "1 600 zł",
        priceValue: 1600,
        recommended: true,
        tagline: "Rozbudowana sesja na różne ujęcia, kadry i nastroje.",
        features: [
          "1 osoba, 2–3 stylizacje, do 2h sesji",
          "12 zdjęć w autorskim retuszu high-end (wybór ze 150+ ujęć)",
          "Konsultacja przed sesją (stylizacja, inspiracje, lokalizacja)",
          "Studio lub plener w Poznaniu w cenie",
          "Dodatkowe zdjęcie: 120 zł",
        ],
      },
      {
        name: "PREMIUM",
        price: "2 200 zł",
        priceValue: 2200,
        tagline: "Pełna sesja wizerunkowa pod budowanie własnej marki.",
        features: [
          "1 osoba, 3–4 stylizacje, do 3h sesji",
          "18 zdjęć w autorskim retuszu high-end",
          "Pełna konsultacja wizerunkowa + moodboard przed sesją",
          "Studio lub plener w Poznaniu w cenie",
          "Dodatkowe zdjęcie: 100 zł",
        ],
      },
    ],
  },
  {
    id: "eventy-prywatne",
    title: "Reportaż z eventu prywatnego",
    description:
      "Urodziny dorosłe, jubileusze, kameralne przyjęcia i prywatne premiery — naturalny reportaż bez ustawiania.",
    tiers: [
      {
        name: "EVENT BASIC",
        price: "1 800 zł",
        priceValue: 1800,
        features: [
          "Do 3h obecności",
          "40 zdjęć w pełnej obróbce (selekcja autorska)",
          "Galeria w 14 dni",
          "Dojazd na terenie Poznania w cenie",
        ],
      },
      {
        name: "EVENT STANDARD",
        price: "2 400 zł",
        priceValue: 2400,
        recommended: true,
        features: [
          "Do 5h obecności",
          "70 zdjęć w pełnej obróbce",
          "Express Social Media (3 zdjęcia w 24h) w cenie",
          "Galeria w 14 dni",
        ],
      },
      {
        name: "EVENT PREMIUM",
        price: "Wycena indywidualna",
        tagline: "Eventy całodzienne, kilka lokalizacji, rola foto + wideo.",
        features: [
          "Pełen dzień, kilka lokalizacji",
          "Foto + wideo w jednym pakiecie",
          "Kalkulacja pod konkretny zakres",
        ],
      },
    ],
  },
  {
    id: "produktowe",
    title: "Sesje produktowe dla twórców i marek osobistych",
    description:
      "Dla osób prowadzących małe marki (handmade, e-commerce, twórcy indywidualni), które potrzebują profesjonalnych zdjęć produktów na własną sprzedaż.",
    tiers: [
      {
        name: "PACKSHOT",
        price: "1 200 zł",
        priceValue: 1200,
        features: [
          "Do 10 produktów, 1 tło (białe / neutralne)",
          "2 ujęcia/produkt w pełnej obróbce",
          "Tło, oświetlenie i sprzęt w cenie",
        ],
      },
      {
        name: "PRODUKT LIFESTYLE",
        price: "1 800 zł",
        priceValue: 1800,
        features: [
          "Do 6 produktów w aranżacjach lifestyle",
          "3 ujęcia/produkt (1 packshot + 2 lifestyle)",
          "Konsultacja stylizacji przed sesją",
        ],
      },
      {
        name: "ROZSZERZONA",
        price: "Wycena indywidualna",
        tagline: "Większe katalogi i sceny z modelką.",
        features: [
          "10+ produktów",
          "Sceny z modelką, dłuższe sesje",
          "Zakres ustalany indywidualnie",
        ],
      },
    ],
  },
  {
    id: "wideo",
    title: "Wideo prywatne",
    description:
      "Krótkie filmy okolicznościowe, brand video marki osobistej i materiał na social media — od briefu do gotowego pliku.",
    tiers: [
      {
        name: "WIDEO MINI",
        price: "1 600 zł",
        priceValue: 1600,
        features: [
          "1 dzień nagraniowy do 3h",
          "Film 30–60 s (1 wariant: 9:16 lub 16:9)",
          "Muzyka royalty-free w cenie",
          "Realizacja: 21 dni",
        ],
      },
      {
        name: "WIDEO STANDARD",
        price: "2 400 zł",
        priceValue: 2400,
        features: [
          "1 dzień nagraniowy do 5h",
          "Film 60–90 s + 2 wersje platformowe (9:16 + 1:1 lub 16:9)",
          "Konsultacja koncepcji przed sesją",
          "Realizacja: 21 dni",
        ],
      },
      {
        name: "ROZSZERZONE",
        price: "Wycena indywidualna",
        tagline: "Produkcje wielodniowe i z wywiadem.",
        features: [
          "Filmy wielodniowe",
          "Lokacje spoza Poznania",
          "Wywiad i rozbudowany montaż",
        ],
      },
    ],
  },
];

export const privateModifiers: PrivateModifier[] = [
  { label: "Express 24h (galeria + finały w 24h od sesji)", value: "+50% wartości pakietu" },
  { label: "Pliki RAW (komplet surowy)", value: "+30% wartości pakietu" },
  { label: "HMUA przez Marcina (gdy nie organizujesz sam/a)", value: "+350 zł" },
  { label: "Dojazd poza Poznań (w obie strony, od granicy miasta)", value: "+2,50 zł/km" },
  { label: "Sesja w dwóch lokalizacjach", value: "+200 zł" },
  { label: "Druk fotoksiążki premium (30×30 cm)", value: "wycena indyw. od ~400 zł" },
  { label: "Druk wielkoformatowy (canvas)", value: "wycena indyw." },
];

export const privateConditions: PrivateCondition[] = [
  {
    title: "Płatność",
    body: "Zaliczka 30% przy rezerwacji terminu, pozostała część po sesji — przed wydaniem finałów. Rozliczenie przez platformę Useme, otrzymujesz fakturę VAT.",
  },
  {
    title: "Terminy realizacji",
    body: "Galeria do wyboru: do 48h po sesji. Finalne zdjęcia: do 14 dni od wyboru kadrów. Wideo: do 21 dni od nagrania. Tryb ekspres: +50%.",
  },
  {
    title: "Wybór zdjęć",
    body: "Po sesji dostajesz galerię online (ze znakiem wodnym) do samodzielnego wyboru ujęć. Finały dostarczam bez znaku wodnego, w pełnej jakości (do druku) i w wersji web.",
  },
  {
    title: "Pliki RAW",
    body: "Standardowo nie udostępniam surowych plików — retusz to istotna część efektu finalnego. Pełne udostępnienie RAW: +30% (decyzja przed sesją).",
  },
  {
    title: "Poprawki",
    body: "W cenie 1 tura poprawek retuszu (foto) / 2 tury montażowe (wideo). Każda kolejna godzina pracy: 200 zł.",
  },
  {
    title: "Prawa do wizerunku",
    body: "Zachowuję prawo do wykorzystania wybranych zdjęć w portfolio (strona, social media), chyba że ustalimy inaczej przed sesją.",
  },
  {
    title: "Zmiana terminu",
    body: "Zmiana min. 48h przed sesją: bezpłatna. Odwołanie później niż 48h przed terminem: zaliczka nie podlega zwrotowi.",
  },
  {
    title: "Archiwizacja",
    body: "Gotowe materiały przechowuję przez 1 rok. Pliki surowe usuwam z bieżących dysków po 14 dniach od akceptacji finałów.",
  },
];
