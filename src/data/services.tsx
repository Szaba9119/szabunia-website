import type { ReactNode } from "react";
import type { ProcessStep, FAQItem } from "./portfolio";

export { type ProcessStep, type FAQItem };

export interface ServiceData {
  slug: string;
  title: string;
  /** Nagłówek H1 na podstronie usługi, gdy ma brzmieć inaczej niż `title`.
      `title` jest nazwą krótką i trafia do nawigacji, kart na stronie głównej,
      okruszków i pola `name` w JSON-LD, więc nie da się go rozbudować bez psucia
      tych miejsc. H1 to najmocniejszy sygnał na stronie i ma zawierać frazę,
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
  forWhom: string[];
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

      Powód rozszerzenia: na siatce usług stały obok siebie „od 120 zł netto/os."
      (sesje zespołowe) i „od 1 100 zł netto" (portrety). Dziesięciokrotna różnica
      przy dwóch usługach, które z kafelka wyglądają tak samo, czytała się jak błąd.
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
  /** Kafelek na pełną szerokość rzędu w siatce na stronie głównej.
      Siatka ma trzy kolumny, więc liczba WĄSKICH kafelków musi dzielić się przez trzy,
      inaczej w ostatnim rzędzie zostaje „sierota" (zgłoszone przez Marcina 30.07.2026).
      Przy ośmiu usługach: sześć wąskich (dwa pełne rzędy) + dwa szerokie na dole.
      Szerokie są dwie najlepsze marżowo linie: obiekty (ok. 190 zł/h) i pakiety hybrydowe.
      Plakietka „Bestseller" zostaje WYŁĄCZNIE przy pakietach, bo tylko dla nich jest prawdziwa. */
  wide?: boolean;
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
  /** Film przed paskami galerii zamiast między nimi. Włączone tylko tam, gdzie
      film jest produktem, a nie ilustracją (wideo marketing). Reszta podstron ma
      układ: główny pasek, film, drugi pasek. */
  videoFirst?: boolean;
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
    h2Process: "Jak wygląda obsługa eventu",
    h2Faq: "Obsługa eventów: najczęstsze pytania",
    h1: "Obsługa eventów firmowych w Poznaniu",
    galleryCategory: "eventy",
    extraGallery: {
      // Portrety zamiast kadrów z sesji IDcom (Marcin, 04.08.2026). Sekcja renderuje
      // się POD przykładową realizacją wideo, patrz kolejność w uslugi/[slug]/page.tsx.
      category: "portrety",
      ctaLabel: "Zobacz sesje zespołowe",
      href: "/uslugi/sesje-zespolowe",
      sub: "Planujesz event firmowy? To zwykle jedyny dzień w roku, kiedy cała firma jest w jednym miejscu. Przy okazji wydarzenia mogę zrobić sesję portretową dla całego zespołu: przywożę mobilne studio, a jedna osoba to około 5 do 15 minut, między prelekcjami albo w luźniejszym oknie agendy.",
    },
    videoId: "m42ywMWjthw",
    videoTitle: "Film z eventu firmowego dla Woohoo",
    videoNote: "Tak wygląda film z eventu: dynamiczne podsumowanie wydarzenia, gotowe do social mediów.",
    title: "Obsługa eventów firmowych",
    subtitle:
      "Dokumentacja konferencji, targów, gal i wydarzeń firmowych. Zdjęcia na social media jeszcze w trakcie eventu.",
    description:
      "Fotografuję dyskretnie, w stylu reportażowym, wyłapując kluczowe momenty, emocje i interakcje. Oferuję opcję live editing, zdjęcia gotowe do publikacji na social media jeszcze w trakcie eventu. Fotografię eventową robię od początku działalności. Przez ponad osiem lat dokumentowałem wydarzenia w Poznaniu, nierzadko kilka różnych miejsc jednego wieczoru. Sprawne tempo i logistyka dużych eventów to dla mnie naturalny grunt.",
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
    heroImage: "/images/galeria/eventy/event-05-networking-foyer.jpg",
    heroImagePos: "center 20%",
    price: "od 600 zł netto",
    process: [
      { num: 1, title: "Rozmowa", desc: "Agenda, kluczowe momenty, VIP-y" },
      { num: 2, title: "Realizacja", desc: "Dyskretna fotografia reportażowa" },
      { num: 3, title: "Live edit", desc: "Zdjęcia na social media w trakcie eventu" },
      { num: 4, title: "Dostawa", desc: "Pełna galeria w 14 dni" },
    ],
    pricingBlurb:
      "Wycenę reportażu ustalam na podstawie liczby godzin obecności na evencie oraz opcji dodatkowych: live editing na social media w trakcie wydarzenia i ujęcia z drona.",
    priceFaqQuestion: "Ile kosztuje fotograf na event firmowy?",
    priceFaqIntro: "Reportaże zaczynają się",
    faqs: [
      { q: "Czy fotografujesz też wieczorne gale przy słabym świetle?", a: "Tak. Jasne obiektywy f/1.4 i f/2.8 pozwalają fotografować bez nachalnego flesza, z zachowaniem klimatu sali. Gdy trzeba, dokładam dyskretne doświetlenie. Reportaż z gali, konferencji czy bankietu wygląda naturalnie." },
      { q: "Czy mogę otrzymać zdjęcia w trakcie eventu?", a: "Tak, usługa live editing. Wybrane zdjęcia edytuję na bieżąco i wysyłam do publikacji na social media." },
      { q: "Ile zdjęć otrzymam?", a: "Około 30 gotowych zdjęć na każdą godzinę obecności, wyselekcjonowanych i poddanych postprodukcji. Przy pakietach foto + wideo jest ich mniej, bo część czasu idzie na nagrywanie. Dokładna liczba zależy też od skali eventu i dodatkowych zadań w trakcie (dron, obróbka zdjęć na żywo, wydruk na evencie). To autorska selekcja najlepszych momentów, a nie wszystkie wykonane kadry." },
      { q: "Czy pakiet całodniowy się opłaca?", a: "Tak, rozliczenie dniówką przy dłuższych realizacjach wychodzi korzystniej niż sumowanie kolejnych godzin. To jedna z opcji, którą dobieram przy większych eventach." },
      { q: "Czy przy okazji eventu zrobisz zdjęcia całego zespołu?", a: "Tak. Na wydarzenie mogę przywieźć mobilne studio: potrzebuję około 5 m² wolnej przestrzeni i gniazdka, rozstawienie zajmuje 30 minut, a potem fotografuję kolejne osoby po 5 do 15 minut, między prelekcjami albo w kuluarach. Event to zwykle jedyny dzień w roku, kiedy cała firma jest w jednym miejscu, więc headshoty przy tej okazji nie wymagają osobnego terminu ani osobnego dojazdu." },
      { q: "Kto robi zdjęcia i film, gdy event jest duży?", a: "Przy standardowym wydarzeniu robię wszystko sam. Przy dużym evencie, gdzie dwie rzeczy dzieją się naraz, biorę drugiego operatora do zdjęć albo do wideo. Postprodukcja zostaje u mnie: retusz zdjęć i montaż filmu robię osobiście, więc materiał wychodzi w jednym standardzie. Dla Ciebie to nadal jedna osoba kontaktowa, jedne ustalenia i jedna faktura." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Dwa aparaty Canon R6 z zapisem na dwie karty (materiał z eventu jest bezpieczny), jasne obiektywy Sigma Art i Sigma 70-200 mm f/2.8 do ujęć z dystansu, mobilny system lamp Godox oraz dron DJI z uprawnieniami A1/A3 i OC. Przy live editingu obrabiam zdjęcia na bieżąco na miejscu." },
    ],
    portfolioSlug: "woohoo-autopay",
    seo: {
      title: "Obsługa eventów firmowych, Poznań | Szabunia",
      description: "Konferencje, targi, gale i integracje. Zdjęcia, film i dron od jednej osoby. Fotografowałem eventy dla H&M i Santandera.",
    },
  },  {
    slug: "sesje-zespolowe",
    h2Process: "Jak wygląda sesja zespołowa",
    h2Faq: "Headshoty zespołu: najczęstsze pytania",
    h1: "Headshoty zespołu w biurze albo w studiu",
    galleryCategory: "zespolowe",
    extraGallery: { category: "portrety", ctaLabel: "Zobacz więcej portretów" },
    title: "Sesje zespołowe",
    subtitle:
      "Headshoty dla całego zespołu w jeden dzień. Mobilne studio w Twoim biurze albo studio zewnętrzne.",
    description:
      "Spójne headshoty zespołu to fundament employer brandingu. Przyjeżdżam z mobilnym studiem do Twojego biura albo rezerwuję studio, rozstawienie zajmuje 30 minut, a każda osoba potrzebuje 5-15 minut na sesję. Efekt: spójne zdjęcia wszystkich pracowników, gotowe na stronę WWW i LinkedIn.",
    forWhom: [
      "Zespoły korporacyjne i działy HR",
      "Kancelarie prawne i firmy doradcze",
      "Startupy budujące wizerunek marki",
      "Firmy z rozproszonymi oddziałami",
      "Organizacje rebrandingujące się",
    ],
    icon: (
      <svg className="w-5 h-5 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    heroImage: "/images/portfolio/sesje-zespolowe-cover.jpg",
    // Taryfa przepisana 05.08.2026 decyzją Marcina: 1 400 zł za dwie osoby + 120 zł za każdą
    // kolejną, dwa wyretuszowane zdjęcia na osobę. Progi 180/150/120 zł za osobę ZNIKAJĄ
    // z powierzchni klienckich — rozkładały blok stały 7,5 h dopiero od ósmej osoby, przez co
    // sesja czteroosobowa dawała 76 zł/h. Kanon: cennik_2026_07_v3.md §6.
    price: "od 1 400 zł netto",
    heroPriceLabel: "od 1 400 zł netto",
    process: [
      { num: 1, title: "Logistyka", desc: "Ustalamy harmonogram i liczbę osób" },
      { num: 2, title: "Setup", desc: "Rozstawiam mobilne studio w biurze (30 min)" },
      { num: 3, title: "Sesja", desc: "5-15 min na osobę, headshot + opcja team" },
      { num: 4, title: "Dostawa", desc: "Wyretuszowane zdjęcia w 14 dni" },
    ],
    pricingBlurb:
      "Sesja zespołowa kosztuje 1 400 zł netto za dwie osoby, a każda kolejna osoba to 120 zł. W cenie są dwa wyretuszowane zdjęcia na osobę, dojazd i rozstawienie mobilnego studia w Twoim biurze. Im większy zespół, tym niżej schodzi kwota za osobę.",
    priceFaqQuestion: "Ile kosztuje sesja zdjęciowa zespołu?",
    priceFaqIntro: "Sesje zespołowe zaczynają się",
    priceFaqSuffix: " za dwie osoby, a każda kolejna osoba to 120 zł, przy dwóch wyretuszowanych zdjęciach na osobę",
    faqs: [
      { q: "Co z osobami, których nie ma w dniu sesji?", a: "Brakujące osoby dogrywam w osobnym, krótszym terminie, w tym samym standardzie światła i retuszu, żeby portrety całego zespołu były spójne. To częsta sytuacja przy większych zespołach i pracy zdalnej." },
      { q: "Ile osób możesz sfotografować w jeden dzień?", a: "Do 40 osób dziennie przy mobilnym studiu. Każda osoba potrzebuje ok. 5-15 minut." },
      { q: "Ile miejsca potrzebujesz w biurze?", a: "Minimum 5 m² wolnej przestrzeni i gniazdko. Sala konferencyjna, hol lub korytarz, wszystko się sprawdzi." },
      { q: "Czy zdjęcia będą spójne dla całego zespołu?", a: "Tak, identyczne oświetlenie i tło. Spójne headshoty na stronie i w materiałach firmowych." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Mobilne studio, które rozkładam u Ciebie w biurze: aparat Canon R6, obiektyw portretowy Sigma 70-200 mm f/2.8 i komplet oświetlenia Godox. Rozstawienie zajmuje ok. 30 minut i wystarczy około 5 m². Każda osoba dostaje kadry w tym samym standardzie światła i retuszu." },
    ],
    portfolioSlug: "idcom-headshoty-zespolu",
    seo: {
      title: "Headshoty zespołu w biurze i w studiu | Szabunia",
      description: "Spójne portrety całego zespołu w jeden dzień. Mobilne studio w Twoim biurze albo studio zewnętrzne, 5 do 15 minut na osobę. Poznań i cała Polska.",
    },
  },  {
    slug: "pakiety-foto-wideo",
    h2Process: "Jak wygląda dzień zdjęciowy",
    h2Faq: "Zdjęcia i film razem: najczęstsze pytania",
    h1: "Zdjęcia, film i dron na event firmowy",
    portfolioSlug: "woohoo-autopay",
    galleryCategory: "eventy",
    extraGallery: {
      category: "dron",
      ctaLabel: "Zobacz ujęcia z drona",
      href: "/uslugi/zdjecia-wideo-z-drona",
    },
    videoId: "4INLtKcKcZk",
    videoTitle: "E-commerce All-in, film z eventu dla Woohoo",
    title: "Pakiety eventowe: foto + wideo + dron",
    subtitle:
      "Zdjęcia, film i ujęcia z drona od jednej osoby: spójny materiał i mniej logistyki. Bestseller wśród klientów korporacyjnych.",
    description:
      "Pakiet hybrydowy to jeden dzień zdjęciowy i dwa formaty na wyjściu. Podczas jednego wydarzenia lub sesji powstają i zdjęcia, i materiał wideo. Rezultat: spójny wizualnie content na wszystkie kanały, bez koordynowania dwóch ekip.",
    forWhom: [
      "Firmy organizujące eventy (konferencje, gale)",
      "Marki potrzebujące contentu na social media",
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
    heroImage: "/images/galeria/eventy/event-01-zespol-na-scenie.jpg",
    price: "od 2 100 zł netto",
    wide: true,
    process: [
      { num: 1, title: "Rozmowa", desc: "Cel, kanały, formaty wideo i foto" },
      { num: 2, title: "Realizacja", desc: "Sesja foto + nagranie wideo w jednym dniu" },
      { num: 3, title: "Postprodukcja", desc: "Retusz zdjęć + montaż wideo" },
      { num: 4, title: "Dostawa", desc: "Zdjęcia w 14 dni, wideo w 21 dni" },
    ],
    pricingBlurb:
      "Wycena pakietu zależy od liczby godzin obecności na wydarzeniu, zakresu wideo (teaser, główny film, wywiady z uczestnikami) i tego, czy potrzebujesz ujęć z drona. Im dłuższa realizacja, tym więcej materiału zdjęciowego i wideo z tego samego dnia.",
    priceFaqQuestion: "Ile kosztuje pakiet foto + wideo?",
    priceFaqIntro: "Pakiety zaczynają się",
    faqs: [
      { q: "Czy mogę dobrać zakres pakietu do mojego eventu?", a: "Tak. Liczbę godzin, zakres wideo, drona czy wywiady z uczestnikami dopasowuję do skali wydarzenia. Po krótkiej rozmowie podaję jedną, konkretną wycenę w kilku wariantach." },
      { q: "Czy naprawdę jedna osoba ogarnie foto i wideo?", a: "Przy standardowym wydarzeniu tak: zdjęcia, film i dron robię sam. Przy dużym evencie, gdzie dwie rzeczy dzieją się w tym samym momencie, dokładam drugiego operatora do zdjęć albo do wideo. Postprodukcja zostaje u mnie, retusz i montaż robię osobiście, więc finalny materiał ma jeden standard. Ty i tak masz jedną osobę kontaktową zamiast dwóch ekip." },
      { q: "Czy mogę zamówić pakiet na cykl wydarzeń?", a: "Tak. Przy serii wydarzeń koryguję zakres do realnych potrzeb projektu. Jeśli realizacje wracają co roku, możemy ustalić liczbę wydarzeń z góry: rezerwuję terminy i trzymam dzisiejsze ceny na całość. Wycenę odsyłam po krótkiej rozmowie." },
      { q: "Co jeśli potrzebuję więcej godzin niż w pakiecie?", a: "Dogrywamy dodatkowe godziny przed eventem, dokładam je do wyceny przy ustalaniu zakresu." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Dwa aparaty Canon R6 (foto i wideo równolegle, z zapisem na dwie karty), obiektywy Sigma, Tamron i Tokina od 16 do 200 mm, oświetlenie Godox, dźwięk Rode i Zoom oraz dron DJI Mini 5 Pro z certyfikatem A1/A3 i OC. Jeden zestaw obsługuje zdjęcia, film i dron." },
    ],
    seo: {
      title: "Pakiety eventowe: foto, wideo i dron | Szabunia",
      description: "Jeden twórca zamiast dwóch ekip, jedna faktura, jeden termin. Zdjęcia, film i ujęcia z drona z tego samego dnia. Eventy firmowe, Poznań.",
    },
  },  {
    slug: "wizerunek-portrety",
    h2Process: "Jak wygląda sesja portretowa",
    h2Faq: "Portrety biznesowe: najczęstsze pytania",
    h1: "Portrety biznesowe i headshoty",
    galleryCategory: "portrety",
    extraGallery: {
      category: "zespolowe",
      ctaLabel: "Zobacz sesje zespołowe",
      href: "/uslugi/sesje-zespolowe",
    },
    title: "Wizerunek & Portrety",
    subtitle:
      "Portrety biznesowe, headshoty na LinkedIn i zdjęcia do personal brandingu. Prowadzę przez pozowanie, nie musisz nic umieć.",
    description:
      "Portret biznesowy to Twoja wizytówka na LinkedIn i na stronie firmy. Tworzę zdjęcia, które oddają charakter i kompetencje, na stronę internetową, LinkedIn, materiały prasowe i raporty roczne. Zaczynamy od krótkiej rozmowy, w której ustalamy cel, styl i logistykę, a w pakietach przed sesją dostajesz poseboard z referencjami.",
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
      { num: 1, title: "Konsultacja", desc: "Omawiamy cel, styl i wizję wizerunku" },
      { num: 2, title: "Poseboard", desc: "W pakietach przygotowuję poseboard z referencjami" },
      { num: 3, title: "Sesja", desc: "Prowadzę Cię przez pozowanie, w studiu lub Twoim biurze. Nie musisz nic umieć." },
      { num: 4, title: "Dostawa", desc: "Wybrane, wyretuszowane zdjęcia w 14 dni." },
    ],
    pricingBlurb:
      // „Każda sesja" → „Pakiety": od 04.08.2026 istnieje próg 700 zł BEZ poseboardu
      // i bez konsultacji stylizacyjnej, więc poprzednie zdanie przestało być prawdziwe.
      // Fragment o studiu zostaje nietknięty: to osobna pozycja TRESC2608-52, owner Marcin.
      "Wycenę portretu ustalam na podstawie liczby stylizacji, długości sesji i liczby wyretuszowanych zdjęć do wyboru. Pakiety obejmują darmowy poseboard z referencjami przed spotkaniem oraz studio dopasowane do Twojego projektu.",
    priceFaqQuestion: "Ile kosztuje sesja wizerunkowa dla firmy?",
    priceFaqIntro: "Ceny portretów dla jednej osoby zaczynają się",
    // Brzmienie z 04.08.2026, podyktowane przez Marcina: „ceny portretów dla jednej osoby
    // startują od 700 zł netto, a dla zespołów od 120". NIE dopisuj „za pierwsze zdjęcie"
    // ani „za jedno ujęcie" — obie formy zostały wprost odrzucone. Kwoty pakietów świadomie
    // tu nie wchodzą: prośba Marcina, żeby nie kotwiczyć klienta stosem liczb w pierwszym
    // zdaniu. Rozwinięcie jest niżej, w osobnym pytaniu FAQ.
    priceFaqSuffix: ", a sesja zespołowa od 1 400 zł netto za dwie osoby",
    faqs: [
      // TRESC2608-05 zamknięty 04.08.2026 BEZ zmiany tego zdania. Audyt zgłaszał je jako
      // sprzeczne z cennikiem („od 30 minut" przy najkrótszym pakiecie 90-minutowym), a decyzja
      // Marcina z 04.08 wprowadziła próg 700 zł za sesję do 30 minut, czyli zdanie stało się
      // prawdziwe. Dopisana została sama kwota, żeby czas i cena stały obok siebie.
      { q: "Ile trwa sesja wizerunkowa?", a: "Sama sesja może trwać od 30 minut i tyle wystarczy na jedno dobre zdjęcie. Przychodzisz na gotowe: studio rezerwuję na 30 minut przed Twoją godziną i wcześniej rozkładam oraz dopasowuję światło, więc nie czekasz na moje przygotowania. Dłuższe pakiety dają więcej czasu na ujęcia i zmiany stylizacji." },
      { q: "Czy mogę mieć sesję w swoim biurze?", a: "Tak. Przyjeżdżam z mobilnym studiem, potrzebuję ok. 5 m² wolnej przestrzeni i dostępu do gniazdka." },
      { q: "Jak szybko otrzymam gotowe zdjęcia?", a: "Standardowy czas to 14 dni. Ekspres do 48h za dodatkową opłatą (+50%)." },
      { q: "Czy mogę użyć zdjęć na LinkedIn i stronie?", a: "Tak. Licencja obejmuje użytek komercyjny bez ograniczeń czasowych: strona, social media, druk, reklama." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Aparaty Canon R6 z zapisem na dwie karty (backup), Sigma 70-200 mm f/2.8 Sport jako podstawowy obiektyw portretowy (dłuższa ogniskowa nie zniekształca rysów twarzy i ładnie oddziela osobę od tła) oraz studyjne oświetlenie Godox. Na sesję w Twoim biurze przywożę mobilne studio. Cały zestaw daje powtarzalny, spójny standard między osobami i między sesjami." },
      // Dodane 02.08.2026. Powód policzalny, nie estetyczny: w GSC klaster cenowy tej
      // usługi ma 402 wyświetlenia w 90 dni, ale rozkłada się nierówno. Warianty ze
      // słowem „kosztuje" stoją na pozycji 17,2 i 17,9, a warianty ze słowem „cena",
      // „ceny" i „cennik" na 32,0, 37,4 i 38,8. Słowo „cennik" nie występowało na tej
      // stronie ani razu, „cena" i „ceny" też nie. To pytanie wprowadza je w treść.
      // Zgodne z regułą z docs/zasady-tekstow.md: „użyj tego, którego ludzie faktycznie
      // wpisują". Kwoty pakietów świadomie nie wchodzą do odpowiedzi: na stronie stoi
      // wyłącznie kotwica „od 700 zł" i „od 120 zł za osobę" (decyzja Marcina z 04.08).
      { q: "Gdzie znajdę cennik sesji wizerunkowej?", a: "Ceny portretów dla jednej osoby zaczynają się od 700 zł netto, a sesja zespołowa od 1 400 zł netto za dwie osoby. W kwocie startowej masz sesję w studiu w Poznaniu albo dojazd z mobilnym studiem do Twojego biura, razem z retuszem. Wyżej wchodzą pakiety, w których dostajesz więcej czasu, więcej stylizacji i większy wybór kadrów do retuszu. Cennika w formie tabeli nie ma, bo przy tej samej liczbie ujęć cena wygląda inaczej dla jednej osoby i inaczej dla dziesięcioosobowego zespołu. Napisz w dwóch zdaniach, kogo i do czego fotografujemy, a wycenę odeślę mailem w 24 godziny." },
    ],
    portfolioSlug: "idcom-headshoty-zespolu",
    seo: {
      title: "Portrety biznesowe i headshoty, Poznań | Szabunia",
      description: "Portrety biznesowe, headshoty na LinkedIn i personal branding. Sesja w studiu albo mobilne studio w Twoim biurze. Poznań i cała Polska.",
    },
  },  {
    slug: "wideo-marketing",
    h2Process: "Jak wygląda produkcja filmu",
    h2Faq: "Wideo dla firm: najczęstsze pytania",
    h1: "Wideo dla firm i filmy korporacyjne",
    portfolioSlug: "woohoo-autopay",
    galleryCategory: "wideo",
    // Bez drugiego paska. Pasek „Przykłady z galerii: produktowe" zniknął 04.08.2026
    // na prośbę Marcina. Podstrona ma pokazywać wideo, a nie zdjęcia produktów.
    videoId: "4INLtKcKcZk",
    videoFirst: true,
    videoTitle: "E-commerce All-in dla Woohoo: film z wydarzenia ICEA i Autopay",
    videoNote: "Komplet materiału wideo z jednego dnia: film podsumowujący, trzy pionowe reelsy z wywiadami i ujęcia z drona wewnątrz stadionu.",
    title: "Wideo marketing",
    subtitle:
      "Filmy korporacyjne i promocyjne, reelsy, relacje z eventów. Formaty pionowe i poziome dopasowane do platformy.",
    description:
      "Tworzę krótkie formy (Reels, TikTok, YouTube Shorts), filmy promocyjne i reklamowe, relacje z eventów i materiały szkoleniowe. Wideo reklamowe przygotowuję pod konkretne miejsce emisji, od spotów do social mediów po materiały do kampanii online. Od nagrania po montaż, dostajesz gotowy materiał do publikacji.",
    forWhom: [
      "Firmy budujące obecność w social media",
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
    // Piątka na evencie: ludzie zamiast sprzętu i zamiast planszy z tytułem filmu
    // (Marcin, 04.08.2026: „to gdzie dają sobie piątkę jest po wejściu na usługę,
    // przy tekście"). Poprzednio kadr z reelsa.
    heroImage: "/images/galeria/eventy/event-03-integracja-przybicie-piatki.jpg",
    price: "od 400 zł netto",
    process: [
      { num: 1, title: "Concept", desc: "Cel, format, platforma docelowa" },
      { num: 2, title: "Nagranie", desc: "Ujęcia, światło i dźwięk" },
      { num: 3, title: "Montaż", desc: "Cięcie, kolor, napisy, muzyka" },
      { num: 4, title: "Dostawa", desc: "Gotowe materiały w 21 dni" },
    ],
    pricingBlurb:
      "Wycena zależy od czasu nagrania oraz długości i złożoności finalnego materiału: od krótkiego teasera po kilkuminutowy film. Przy regularnych potrzebach wideo można ustalić wolumen na cały rok, z rezerwacją terminów i ceną zamrożoną na ten okres.",
    priceFaqQuestion: "Ile kosztuje film promocyjny dla firmy?",
    priceFaqIntro: "Produkcja wideo zaczyna się",
    faqs: [
      { q: "Czy montujesz też materiał z telefonu?", a: "Tak, jeśli masz surowe nagrania z telefonu, mogę je zmontować (cięcie, kolor, napisy, muzyka)." },
      { q: "W jakich formatach dostarczasz wideo?", a: "MP4 w rozdzielczości do 4K. Formaty: 9:16 (Reels/TikTok), 16:9 (YouTube/strona), 1:1 (feed). Dowolna kombinacja." },
      { q: "Czy mogę zamówić sam montaż bez nagrywania?", a: "Tak, wystarczy przesłać surowe pliki. Wycena zależy od długości i złożoności finalnego materiału." },
      { q: "Czy realizujesz wideo reklamowe i spoty?", a: "Tak, krótkie filmy reklamowe pod kampanie w social mediach i online (15-60 s). Scenariusz, nagranie i montaż dopasowuję do miejsca emisji i celu kampanii." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Dwa aparaty Canon R6 do nagrań, obiektywy od 16 do 200 mm, oświetlenie ciągłe LED Godox, dźwięk Rode Wireless PRO, VideoMicro II i rejestrator Zoom oraz dron DJI do ujęć z powietrza. Sprzęt pozwala nagrać i zmontować materiał od reelsa po dłuższy film." },
    ],
    seo: {
      title: "Wideo dla firm i filmy korporacyjne | Szabunia",
      description: "Filmy o firmie, reelsy, wywiady i relacje z eventów. Nagranie i montaż u jednego twórcy. Poznań i cała Polska.",
    },
  },  {
    slug: "fotografia-produktowa",
    h2Process: "Jak wygląda sesja packshotowa",
    h2Faq: "Packshoty: najczęstsze pytania",
    h1: "Packshot i fotografia produktowa",
    galleryCategory: "produktowe",
    extraGallery: {
      category: "wideo-produktowe",
      ctaLabel: "Zobacz realizacje wideo",
      href: "/uslugi/wideo-marketing",
    },
    title: "Fotografia produktowa",
    subtitle:
      "Packshoty na białym tle z retuszem w cenie, zdjęcia kreatywne i aranżacje pod e-commerce, katalogi i social media.",
    description:
      "Zdjęcia produktowe to fundament sprzedaży online. Tworzę packshoty na czystym białym tle (marketplace), zdjęcia kreatywne z aranżacją (social media, reklamy) oraz zdjęcia katalogowe. Realizuję też fotografię reklamową pod konkretną kampanię: od internetu i social mediów po druk i outdoor. Pracuję w studiu z pełnym zapleczem oświetleniowym. Każde zdjęcie dostajesz z retuszem w cenie: produkt precyzyjnie wycięty z tła, czyste białe tło zgodne z wymogami Allegro i Amazon, a na życzenie przezroczyste tło (PNG).",
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
    faqs: [
      { q: "Czy mogę przysłać produkty kurierem?", a: "Tak, przyjmuję przesyłki do studia. Koszt przesyłki zwrotnej ustalamy przy wycenie, zależnie od gabarytu i liczby pozycji." },
      { q: "Jakie formaty plików otrzymam?", a: "JPEG w pełnej rozdzielczości + wersja web. Na życzenie: PNG z przezroczystym tłem, TIFF do druku." },
      { q: "Ile produktów dziennie jesteś w stanie zrealizować?", a: "Packshoty na białym tle: 30-50 produktów/dzień. Zdjęcia kreatywne: 8-15 ujęć/dzień." },
      { q: "Czym różni się fotografia produktowa od fotografii reklamowej?", a: "Fotografia produktowa pokazuje produkt wprost, packshot na białym tle do sklepu czy katalogu. Fotografia reklamowa buduje wokół produktu historię: aranżacja, rekwizyty, światło pod konkretną kampanię. Zdjęcia reklamowe wyceniam według pola eksploatacji, inaczej na social media, inaczej do druku i na outdoor." },
      { q: "Czy retusz jest wliczony w cenę zdjęcia?", a: "Tak. Każdy packshot dostajesz wyretuszowany: czyste białe tło, produkt precyzyjnie wycięty z tła, korekta kolorów i usunięcie drobnych skaz. Nie dopłacasz za obróbkę osobno, w przeciwieństwie do wielu studiów, gdzie retusz to dodatkowy koszt." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Aparat Canon R6, obiektywy do detalu i packshotu, stół bezcieniowy i studyjne oświetlenie ciągłe LED Godox. Powtarzalny setup pozwala dokładać kolejne produkty do katalogu w tej samej stylistyce." },
    ],
    portfolioSlug: "artech-fotografia-produktowa",
    seo: {
      title: "Packshot i fotografia produktowa, Poznań | Szabunia",
      description: "Packshoty na białym tle i zdjęcia produktowe w studiu w Poznaniu. E-commerce, katalogi, social media. Retusz w cenie zdjęcia.",
    },
  },  {
    slug: "zdjecia-wideo-z-drona",
    h2Process: "Jak wygląda realizacja z dronem",
    h2Faq: "Zdjęcia z drona: najczęstsze pytania",
    h1: "Zdjęcia i wideo z drona dla firm",
    galleryCategory: "dron",
    // Bez drugiego paska. Pasek „wnętrza i hale" stał tu od 04.08.2026 i zniknął
    // tego samego dnia na prośbę Marcina: „na zdjęciach z drona nie wyglądają dobrze
    // te wnętrza i hale, można to usunąć stamtąd". Kadry z wnętrz obok ujęć
    // z powietrza czytały się jak z innej strony. Spięcie z linią obiektową zostaje
    // w drugą stronę: to podstrona obiektowa linkuje tutaj przyciskiem pod kadrami.
    videoId: "4INLtKcKcZk",
    videoTitle: "Film z eventu dla Woohoo z ujęciami z drona",
    videoNote: "Film z eventu dla Woohoo. Ujęcia z drona łączą się tu z materiałem z poziomu ziemi w jeden spójny film.",
    title: "Zdjęcia i wideo z drona",
    subtitle:
      "Ujęcia z powietrza: tereny, place, eventy i krajobraz. Foto i wideo w 4K.",
    description:
      "Perspektywa z lotu ptaka pokazuje skalę i kontekst, których nie odda zdjęcie z poziomu ziemi. Realizuję zdjęcia i wideo z drona: budynki i obiekty firmowe, hale i magazyny, tereny i place, inwestycje budowlane, architekturę oraz ujęcia eventowe. Przy dużych obiektach robię komplet ujęć: bryła, dach, otoczenie i drogi dojazdowe. Dostarczam gotowe zdjęcia, zmontowane wideo 4K albo same przebitki do montażu własnego. Latam dronem DJI, mam certyfikat operatora A1/A3 i ubezpieczenie OC, więc strona formalna jest po mojej stronie. Materiał z drona mogę też połączyć z sesją naziemną, dzięki czemu z jednego dnia powstaje spójny komplet zdjęć i wideo.",
    forWhom: [
      "Organizatorzy wydarzeń plenerowych (skala, ujęcia otwierające, kadr z góry)",
      "Hotele, ośrodki i obiekty turystyczne",
      "Firmy potrzebujące ujęcia terenu albo placu (bez dokumentacji obiektu)",
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
    // Cennik dronowy v3 (2026-07-29): samodzielna linia usług od 700 zł (przebitki 4K).
    // Sprzedajemy deliverable, nie czas lotu — bez „1h lotu w cenie".
    // Jeden biurowiec w zieleni zamiast panoramy całego miasta (Marcin, 04.08.2026).
    // Panorama pokazywała miasto, a nie obiekt klienta, więc nie mówiła nic o tym,
    // co ta usługa robi dla firmy. Ten sam kadr jest na kafelku w Usługach.
    heroImage: "/images/galeria/dron/dron-04-biurowiec-poznan.jpg",
    price: "od 700 zł netto",
    process: [
      { num: 1, title: "Ustalenia i zgody", desc: "Ustalamy ujęcia, lokalizację i ewentualne strefy lotów" },
      { num: 2, title: "Lot", desc: "Zdjęcia i wideo 4K z powietrza" },
      { num: 3, title: "Postprodukcja", desc: "Obróbka zdjęć lub montaż wideo" },
      { num: 4, title: "Dostawa", desc: "Zdjęcia w 14 dni, wideo do 21 dni" },
    ],
    pricingBlurb:
      "Wycena zależy od tego, czy potrzebujesz samych zdjęć, materiału wideo, czy kompletu z jednej sesji, a także od liczby lokalizacji do przelotu. Latam dronem DJI Mini 5 Pro, mam certyfikat operatora A1/A3 i ubezpieczenie OC, a formalności i koordynację lotów biorę na siebie.",
    priceFaqQuestion: "Ile kosztuje film z drona?",
    priceFaqIntro: "Zdjęcia i wideo z drona zaczynają się",
    faqs: [
      { q: "Czy loty dronem są legalne i ubezpieczone?", a: "Tak. Mam certyfikat A1/A3 oraz ubezpieczenie OC operatora drona. W strefach kontrolowanych uzyskuję wymagane zgody przed lotem." },
      // TRESC2608-53 (04.08.2026): serwis obiecywał bezterminowe darmowe przekładanie,
      // cennik v3 (:388) mówi „wracam raz w ramach ustalonej kwoty, kolejne podejście
      // 300 zł plus dojazd". Dwa inne miejsca serwisu (llms.txt:36 i FAQ obiektowe)
      // miały wersję zgodną z kanonem, więc rozjazd był lokalny.
      { q: "Co jeśli pogoda nie dopisze?", a: "Silny wiatr lub opady uniemożliwiają bezpieczny lot. W takiej sytuacji wracam raz w ramach ustalonej kwoty; kolejne podejście to 300 zł plus dojazd." },
      { q: "W jakiej jakości dostarczasz materiał?", a: "Wideo do 4K, zdjęcia w pełnej rozdzielczości. Formaty dobieram pod stronę WWW i social media (poziome i pionowe)." },
      { q: "Czy mogę połączyć drona z sesją naziemną?", a: "Tak. Dron działa jako dodatek do eventu, sesji produktowej lub wizerunkowej: kilka dodatkowych zdjęć lub ujęć wideo z powietrza przy okazji innej sesji. Z jednej sesji powstaje spójny komplet." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Dron DJI Mini 5 Pro do zdjęć i wideo w 4K. Mam certyfikat operatora A1/A3 i ubezpieczenie OC, więc strona formalna jest po mojej stronie. Materiał z drona łączę z naziemnym zestawem Canon, gdy potrzebny jest komplet foto i wideo." },
    ],
    portfolioSlug: "woohoo-autopay",
    seo: {
      title: "Zdjęcia i wideo z drona dla firm | Szabunia",
      // TRESC2608-22 + TRESC2608-38 (04.08.2026), jedna linia domyka oba. Poprzedni opis
      // miał 157 znaków przy progu 155 i obiecywał „dron w cenie pakietów hybrydowych",
      // czego na tej podstronie nie ma: fraza „w cenie" nie pada tu ani razu, a llms.txt
      // mówi „+200 zł". Sprzedawał też zakres sekcji 8 cennika (budynki, hale, magazyny),
      // czyli linii obiektowej, przy kotwicy o 200 do 1 200 zł niższej.
      description: "Ujęcia 4K terenów, placów, inwestycji i eventów. Certyfikat A1/A3 i OC operatora. Dron łączę z sesją naziemną. Poznań i cała Polska.",
    },
  },
  {
    slug: "wnetrza-obiekty-architektura",
    h2Process: "Jak wygląda sesja obiektu",
    h2Faq: "Fotografia obiektów: najczęstsze pytania",
    h1: "Fotografia wnętrz, obiektów i architektury",
    // Zamienione 04.08.2026, gdy do public/images/galeria/wnetrza trafiło 12 kadrów
    // (magazyn H&M/Sellpy, lokal Yes Butcher, lokal Domu). Wcześniej odwrotnie:
    // główny pasek pokazywał bryły z powietrza, bo wnętrz w serwisie nie było wcale,
    // a podstrona o wnętrzach pokazywała sześć budynków z lotu ptaka.
    galleryCategory: "wnetrza",
    // Bez drugiego paska. Pasek „obiekty i architektura" (te same pliki co galeria
    // dronowa) stał tu do 04.08.2026 i zniknął na prośbę Marcina: „nie potrzeba
    // przykładów z galerii Obiekty i architektura". Podstrona ma teraz jeden pasek
    // z wnętrzami i film z hali Artechu, i tyle. Ujęcia z powietrza pokazuje
    // czwarty rząd galerii wnętrz oraz osobna usługa dronowa.
    // Artech Group: jedyny materiał w portfolio nakręcony WEWNĄTRZ zakładu
    // produkcyjnego, a nie z powietrza. Do czasu wrzucenia zdjęć wnętrz jest to
    // na tej podstronie jedyny dowód, że wnętrza obiektów faktycznie fotografuję
    // i filmuję. Ten sam film stoi w case study `artech-fotografia-produktowa`.
    videoId: "ivvZQ5lQ7FE",
    videoTitle: "Artech Group: film z hali produkcyjnej",
    videoNote:
      "Hala Artech Group od środka: park maszynowy, obróbka CNC i to, jak zakład naprawdę pracuje. Zakład da się pokazać tak samo zdjęciami, jak i filmem, w tym samym dniu zdjęciowym.",
    title: "Wnętrza, obiekty i architektura",
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
    subtitle:
      "Hale, lokale użytkowe i wnętrza obiektów. Zaczynam od ujęć z powietrza, kadry z poziomu ziemi i wnętrza dokładam w tym samym dniu zdjęciowym.",
    description:
      "Halę widać dopiero od środka: ile naprawdę jest miejsca między regałami, jak szeroki jest ciąg komunikacyjny, czy w lokalu da się posadzić trzydzieści osób. Tego nie pokaże żadne ujęcie z powietrza. Fotografuję obiekty od środka i z zewnątrz w jednym dniu zdjęciowym: wnętrze hali, lokalu albo biura, elewację i wjazd z poziomu ziemi, a gdy trzeba pokazać bryłę i otoczenie, dokładam ujęcia z powietrza. Wnętrza, które fotografowałem dla steakhouse\'u Yes Butcher! w Starych Koszarach, trafiły na profil restauracji w przewodniku Michelin. Każde zdjęcie przechodzi retusz architektoniczny: korekta perspektywy, prostowanie linii, czyszczenie kadru. Pliki dostajesz w dwóch wersjach, do druku i na stronę WWW.",
    forWhom: [
      "Generalni wykonawcy hal i obiektów przemysłowych",
      "Deweloperzy mieszkaniowi i komercyjni",
      "Zarządcy i agencje nieruchomości komercyjnych",
      "Producenci z własnymi zakładami",
      "Hotele, gastronomia i przestrzenie eventowe",
    ],
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
    wide: true,
    process: [
      { num: 1, title: "Ustalenia", desc: "Co ma być widać: bryła, elewacja, wnętrza, kontekst lokalizacji" },
      { num: 2, title: "Zgody", desc: "Strefę lotu sprawdzam i koordynuję przed potwierdzeniem daty" },
      { num: 3, title: "Dzień zdjęciowy", desc: "Ujęcia z powietrza i z poziomu ziemi, statyw i światło zastane" },
      { num: 4, title: "Dostawa", desc: "Retusz architektoniczny, pliki do druku i pod www" },
    ],
    pricingBlurb:
      "Wycena zależy od liczby ujęć i od tego, czy dochodzą kadry z poziomu ziemi oraz blok wnętrz. Drugi obiekt tego samego typu w tym samym dniu jest tańszy, bo profil korekcji perspektywy jest już gotowy. Przy obiektach w strefach kontrolowanych koordynację lotu biorę na siebie.",
    priceFaqQuestion: "Ile kosztuje sesja obiektu?",
    priceFaqIntro: "Pakiety obiektowe zaczynają się",
    faqs: [
      // TRESC2608-09 (04.08.2026). Tekst zatwierdzony przez Marcina tego dnia i on
      // rozstrzyga fakt handlowy, nie brief: różnica NIE polega na tym, że dron to
      // „tylko powietrze", a obiekt dokłada ziemię i retusz. Sesja dronowa od 700 zł
      // to materiał przebitkowy, sesja obiektu od 900 zł to zdjęcia konkretnego
      // budynku z powietrza, a ziemia, wnętrza i wideo są dokładką powyżej tej kwoty.
      // Zdanie zamienne z briefu było błędne i świadomie NIE zostało użyte.
      { q: "Czym to się różni od zdjęć z drona?", a: "Sesja dronowa od 700 zł to materiał przebitkowy: ujęcia z powietrza, którymi uzupełniasz film, stronę albo ofertę. Sesja obiektu od 900 zł zaczyna się od zdjęć konkretnego budynku lub hali z powietrza i rośnie o to, czego z góry nie widać: kadry z poziomu ziemi, wnętrza, produkcję, film o firmie. Jeśli potrzebujesz samej panoramy terenu, tańsza będzie sesja dronowa." },
      { q: "Ile ujęć dostanę?", a: "Pakiet podstawowy to do 8 ujęć z powietrza. Kompletny to do 14: osiem z powietrza i sześć z poziomu ziemi. Pełny to do 24 ujęć, z blokiem wnętrz. Każde dodatkowe ujęcie ponad pakiet wyceniam osobno." },
      { q: "Mamy dwa takie same budynki. Płacę dwa razy?", a: "Nie. Drugi obiekt tego samego typu, fotografowany tego samego dnia, jest wyraźnie tańszy, bo profil korekcji perspektywy jest gotowy z pierwszego i postprodukcja idzie szybciej. Warunek to ten sam dzień zdjęciowy. Osobny wyjazd to pełna stawka plus dojazd." },
      { q: "Czy dron poleci nad naszą halą?", a: "W standardowych lokalizacjach tak, bez dopłat. W strefach kontrolowanych, na przykład w sąsiedztwie lotniska albo jednostki wojskowej, koordynację biorę na siebie i sprawdzam ją przed potwierdzeniem daty. Zgoda bywa terminowa, więc warto zgłosić się z wyprzedzeniem. Jeśli pogoda albo brak zgody uniemożliwi wylot, wracam raz w ramach ustalonej kwoty." },
      { q: "Kiedy najlepiej fotografować obiekt?", a: "Tuż przed odbiorem albo zaraz po nim. Elewacja jest wtedy czysta, plac jeszcze niezastawiony, a w środku nie ma jeszcze rzeczy najemcy. Przy budowie, którą chcesz dokumentować w czasie, umawiamy stały punkt i stałą porę, żeby ujęcia złożyły się w jedną sekwencję zamiast w zbiór przypadkowych zdjęć." },
      { q: "Fotografujesz hale magazynowe i lokale użytkowe pod wynajem?", a: "Tak. Przy powierzchni pod wynajem sensowny komplet to bryła i plac manewrowy z powietrza, elewacja i wjazd z poziomu ziemi oraz wnętrze hali albo lokalu. Wszystko z jednego dnia zdjęciowego, bo materiał i tak trafia potem do jednej oferty. Pliki dostajesz w dwóch wersjach: do druku i pod ogłoszenie." },
      { q: "Czy fotografujesz też wnętrza biur i lokali?", a: "Tak, jako blok wnętrz do 10 ujęć w jednym obiekcie. Pracuję ze światłem zastanym, żeby wnętrze wyglądało jak w rzeczywistości, a nie jak wizualizacja. Blok wnętrz można dołożyć do sesji obiektu albo zamówić osobno." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Dron DJI Mini 5 Pro z calową matrycą 50 Mpix, certyfikat operatora A1/A3 i ubezpieczenie OC. Z poziomu ziemi Canon R6 na statywie, obiektywy szerokie do wnętrz i elewacji." },
    ],
    seo: {
      title: "Fotografia hal, obiektów i wnętrz, Poznań | Szabunia",
      description: "Zdjęcia hal, budynków i wnętrz z powietrza i z poziomu ziemi. Retusz architektoniczny, pliki do druku i pod www. Poznań i cała Polska.",
    },
  },
];

// Kolejność wyświetlania usług (kafelki na stronie głównej, lista /uslugi,
// sekcja Wycena, sitemap). Zmiana tutaj zmienia kolejność wszędzie naraz.
// TA STAŁA RZĄDZI, nie kolejność bloków w serviceCategoriesRaw wyżej.
//
// Kolejność strategiczna, ustawiona 30.07.2026 (decyzja Marcina, na danych z GSC,
// CRM i cennika v3). Wcześniej: portrety, eventy, wideo, dron, produktowa,
// zespołowe, pakiety.
//   1. eventy      — wejście do lejka i faktyczna tożsamość firmy: 10 z 11 realizacji
//                    referencyjnych to eventy (korekta_pozycjonowania_2026-07.md §1)
//   2. zespołowe   — zarobek: 211 zł/h na konto po prowizji Useme, najlepsza pozycja
//                    w cenniku, sprzedawana tej samej osobie z HR co event
//                    („event jest wejściem, sesja zespołowa jest zarobkiem")
//   3. portrety    — najwięcej leadów w CRM (27) i 24% zapytań w GSC, więc nie schodzą
//                    głęboko, ale to rozszerzenie, nie fundament
//   4. wideo
//   5. produktowa  — 39% ruchu organicznego, ale poza tabelą rentowności mapy drogowej,
//                    więc utrzymywana, nie promowana
//   6. dron        — element pakietów hybrydowych, nie osobna linia
//   7. pakiety     — jedyna przewaga w Poznaniu i naturalny upsell na event; ostatni
//                    WYŁĄCZNIE z powodu geometrii siatki, patrz nota niżej
//
// UWAGA NA GEOMETRIĘ SIATKI. `pakiety-foto-wideo` renderuje się jako kafelek na całą
// szerokość (`md:col-span-3` w Services.tsx) z plakietką „Bestseller". Przy siedmiu
// usługach w siatce 3-kolumnowej musi stać OSTATNI, inaczej po dwóch wąskich kafelkach
// zostaje dziura w rzędzie (zgłoszone przez Marcina 30.07.2026, po pierwszej próbie,
// gdzie pakiety stały na trzecim miejscu). Sześć wąskich = dwa pełne rzędy, siódmy
// szeroki domyka sekcję.
//
// Pakiety nie tracą przez to na widoczności: szeroki kafelek z plakietką jest mocniejszy
// niż trzecia pozycja w wąskim. Rozważane i odrzucone: przeniesienie szerokiego kafelka
// na drona (Marcin, 30.07). Plakietka „Bestseller" jest prawdziwa dla pakietów
// hybrydowych (cennik v3 §2), a nie dla drona, i wypromowałoby to wizualnie usługę
// z ostatniego miejsca listy.
// Kolejność ustawiona przez Marcina 04.08.2026. Wcześniej portrety stały na trzecim
// miejscu, przed wideo i produktową. GEOMETRIA BEZ ZMIAN: dwie usługi z `wide: true`
// (obiekty i pakiety) nadal zamykają listę na miejscach 7 i 8, więc sześć wąskich
// kafelków daje dwa pełne rzędy, a dwa szerokie domykają trzeci.
const SERVICE_DISPLAY_ORDER: string[] = [
  "eventy-reportaze",
  "sesje-zespolowe",
  "wideo-marketing",
  "fotografia-produktowa",
  "wizerunek-portrety",
  "zdjecia-wideo-z-drona",
  "wnetrza-obiekty-architektura",
  "pakiety-foto-wideo",
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

export function isServiceDraft(slug: string): boolean {
  return DRAFT_SERVICE_SLUGS.has(slug);
}

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
const SERVICE_TILE_IMAGES: Record<string, string> = {
  "eventy-reportaze": "/images/galeria/eventy/event-05-networking-foyer.jpg",
  "wizerunek-portrety": "/images/galeria/portrety/portret-05-mezczyzna-zielony-garnitur.jpg",
  "pakiety-foto-wideo": "/images/galeria/eventy/event-02-zdjecie-grupowe-tor.jpg",
  "fotografia-produktowa": "/images/galeria/produktowe/produkt-02-amarula.jpg",
  "sesje-zespolowe": "/images/portfolio/sesje-zespolowe-cover.jpg",
  // Wersja 4:3 z rozmytym wypełnieniem — pełny napis „E-COMMERCE All in"
  // widoczny, bez ucinania i bez pustych marginesów (oryginał 16:9).
  // Wróciła 04.08.2026 po krótkiej podmianie na piątkę z eventu: Marcin uznał,
  // że na kafelku lepiej działa Autopay, a piątka ma stać w hero podstrony.
  "wideo-marketing": "/images/portfolio/woohoo-ecommerce-4x3.jpg",
  "zdjecia-wideo-z-drona": "/images/galeria/dron/dron-04-biurowiec-poznan.jpg",
  // Kafelek linii obiektowej na stronie głównej i na /uslugi. Wcześniej inwestycja
  // z drona, czyli zielone pole z lotu ptaka: nie mówiła nic o halach ani o wnętrzach
  // i powielała kafelek dronowy obok. Teraz ta sama jasna hala, co okładka podstrony,
  // żeby cała linia miała jeden obraz (Marcin, 04.08.2026).
  "wnetrza-obiekty-architektura": "/images/galeria/wnetrza/wnetrze-03-hala-bramki-wejsciowe.jpg",
};

// Punkt kadrowania miniatury (object-position). Wizerunek kadrujemy nieco wyżej
// (sylwetka w górnej części), zespołowy portret nieco niżej (więcej kontekstu,
// obie twarze wciąż widoczne). Reszta domyślnie wyśrodkowana.
const SERVICE_TILE_POS: Record<string, string> = {
  "wizerunek-portrety": "center 29%",
  // Kadr niżej: esencja zdjęcia (auta + grupa) jest w dolnych 2/3, góra to niebo.
  "pakiety-foto-wideo": "center 70%",
  // ZDJ2608-22 (04.08.2026): plik `portfolio/sesje-zespolowe-cover.jpg` jest POZIOMY
  // (1120x840, jedna wersja od cb2bd52), więc poprzednie „pionowy portret pary" myliło.
  // Mechanizm bez zmian: kadr 4:3 w kafelku 16:9 (mobile, Services.tsx) ciął głowy
  // przy center — kotwiczymy wyżej (audyt mobile 2026-07-07).
  "sesje-zespolowe": "center 20%",
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
  wide: s.wide === true,
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
  // TRESC2608-03 (04.08.2026), WARIANT B: `wnetrza-obiekty-architektura` świadomie
  // BEZ opinii. Nie ma cytatu od klienta z linii obiektowej, a podpięcie tu opinii
  // Yes Butcher (wariant A briefu) przypisywałoby cudzą wypowiedź do usługi, której
  // nie dotyczyła. Wpis dojdzie po pierwszej realizacji obiektowej z referencją.
};
