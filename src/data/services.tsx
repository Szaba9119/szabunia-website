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
  /** Ukrywa `subtitle` w hero podstrony usługi. Dodane 10.08.2026 dla eventów
      (ósma tura): tamten lead powtarzał to, co i tak stoi niżej w sekcjach
      „Dla jakich wydarzeń" i „Zakres", więc hero miało dwa akapity mówiące
      to samo.

      ⚠ Flaga dotyczy WYŁĄCZNIE hero. Pola `subtitle` NIE WOLNO usunąć z danych,
      bo renderują je jeszcze dwa miejsca: kafelek na hubie `/uslugi`
      (`uslugi/page.tsx`) i karta „Powiązana usługa" pod wpisem blogowym
      (`blog/[slug]/page.tsx`). Skasowanie treści zostawiłoby tam puste miejsce.

      Domyślnie (brak wartości) lead renderuje się jak dotąd, więc trzy pozostałe
      usługi zostają nietknięte. */
  heroHideSubtitle?: boolean;
  icon: ReactNode;
  /** Zdjęcie hero podstrony usługi, z istniejących bibliotek /images (brief-22 zad. 8). */
  heroImage: string;
  /** object-position dla heroImage, dobrane per kadr. Domyślnie "center". */
  heroImagePos?: string;
  /** Klasa proporcji kontenera hero, ustawiana WYŁĄCZNIE wtedy, gdy kadr ma być
      pokazany w całości (np. `"aspect-[3/2]"` dla pliku 1920×1280).
      Domyślnie (brak wartości) hero zachowuje się jak dotąd: kwadrat na telefonie,
      pełna wysokość kolumny tekstowej na desktopie, a `object-fit: cover` przycina
      kadr do tego kształtu. Podana wartość musi odpowiadać proporcjom PLIKU,
      inaczej przycięcie wróci. Patrz `ServiceHero.tsx`. */
  heroImageAspect?: string;
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
  // ⛔ `priceFaqIntro` i `priceFaqSuffix` USUNIĘTE 14.08.2026 (depricing).
  //
  // Oba pola istniały wyłącznie po to, żeby okleić kwotę zdaniem: intro było
  // łącznikiem PRZED kwotą („Reportaże zaczynają się"), suffix dalszym ciągiem
  // PO niej („, a sesja zespołowa od 1 400 zł netto za dwie osoby"). Po zdjęciu
  // kwoty intro zostawiało zdanie urwane w pół, a suffix był ostatnim miejscem
  // w `services.tsx`, gdzie kwota siedziała na twardo.
  //
  // Odpowiedź cenową niesie teraz `pricingBlurb` (czynniki wyceny) plus wspólne
  // zamknięcie z obietnicą 24h. Nie przywracać bez przywrócenia kwot.
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
  /** Realizacje pokazywane pod przyciskiem „Zapytaj o ofertę" w połowie podstrony.

      Historia: pole nazywało się `portfolioSlug` (pojedyncze), było ustawione
      na trzech usługach i NIE BYŁO ODCZYTYWANE NIGDZIE. Martwe dane od momentu
      dodania. Audyt 11.08.2026 (F1) je znalazł, decyzja Marcina: podpiąć
      istniejące pole zamiast budować drugie, i zmienić na liczbę mnogą.

      Mnogie, bo trzy z czterech usług mają po dwie opublikowane realizacje.
      Przy pojedynczym cztery case studies zostawałyby z jednym wejściem
      z kafla na `/portfolio`.

      ⛔ NIE WPISYWAĆ tu slugów z `DRAFT_SLUGS` (`portfolio.ts`). Render i tak
      je odfiltrowuje przez `isPortfolioDraft`, ale wpis byłby mylący.

      ⚠ `wizerunek-portrety` celowo wskazuje TYLKO `sesja-korporacyjna`.
      Pozostałe dwie realizacje wizerunkowe są już linkowane wyżej na tej samej
      podstronie, z pasków galerii (idcom i sesja-wizerunkowa). Dopisanie ich tu
      postawiłoby ten sam link dwa razy. */
  portfolioSlugs?: string[];
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
    /** Drugi, poboczny odsyłacz pod przyciskiem paska. Dodane 10.08.2026 dla
        linkowania wizerunek → wydarzenia firmowe.

        Powód osobnego pola zamiast podmiany `href`: na `/uslugi/wizerunek-portrety`
        pasek `zespolowe` ma już własny cel (case study IDcom) i przestawienie go
        skasowałoby istniejące przejście. Kierunek na sąsiednią usługę dochodzi
        OBOK, nie zamiast, i renderuje się jako link tekstowy, nie drugi przycisk,
        żeby nie konkurował z głównym CTA na tej samej podstronie. */
    secondaryLink?: { label: string; href: string };
  };
  /** YouTube ID przykładowego filmu pokazywanego na podstronie usługi. */
  videoId?: string;
  videoTitle?: string;
  /** Opcjonalny podpis pod sekcją wideo (domyślnie tekst o foto + wideo). */
  videoNote?: string;
  /** Nagłówek końcowej sekcji kontaktowej (`CTA.tsx`), wiersz po wierszu.
      Brak wartości = domyślne „Zacznijmy budować / Twój wizerunek".

      Dodane 10.08.2026 po audycie zewnętrznym, §17. Jedyny punkt tamtego audytu,
      który opisywał realny stan strony: formularz na podstronie eventowej
      otwierał się nagłówkiem o wizerunku, czyli o innej usłudze niż ta,
      którą klient przed chwilą czytał.

      Celowo wypełnione TYLKO dla eventów. Pozostałe trzy usługi zostają na
      domyślnym tekście do swojej kolejki, tak samo jak przy `applications`
      i `scope`. */
  ctaHeading?: string[];
  /** Kod usługi wstawiany z góry do pola „Rodzaj usługi" w formularzu (`CTA.tsx`).

      Dodane 10.08.2026 po drugim audycie zewnętrznym, §17. Klient na podstronie
      usługi już wybrał usługę tym, że na nią wszedł, a mimo to formularz otwierał
      się pustym „Wybierz usługę...". Efekt widać w mailach: pole schodziło jako
      „(brak)", bo nikt nie klika listy, żeby powtórzyć to, co przed chwilą czytał.

      ⚠ Wartość MUSI być jednym z kodów z listy w `CTA.tsx` i z `SERVICE_LABELS`
      w `src/app/api/contact/route.ts`, inaczej wysyłka kończy się błędem 400.
      Kody są stare i celowo nie mają nic wspólnego ze slugiem: zmiana
      identyfikatorów rozjechałaby historię leadów w CRM. */
  formServiceCode?: "event" | "wizerunek" | "obiekty" | "produkt";
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
    // ⛔ „w Poznaniu" ZDJĘTE Z H1 10.08.2026 (decyzja Marcina). NIE PRZYWRACAĆ.
    //
    // Cofa to ustalenie z rana tego samego dnia („podstrona bierze lokalną odmianę
    // konkretnej usługi"). Powód zmiany: H1 jest głównym komunikatem strony,
    // a blok autorski dwa ekrany niżej mówi „pracuję w całej Polsce i Europie".
    // Nagłówek zawężał ofertę do miasta, którego reszta strony nie zawęża.
    //
    // Koszt SEO policzony przed decyzją, na danych z GSC (klaster lokalny
    // w docs/sesje/SEO-TITLE-DESCRIPTION-2026-07-30.md): „fotografia eventowa
    // poznań" 6 wyświetleń na pozycji 32, „zdjęcia eventowe poznań" 1 na pozycji 38,
    // cały klaster lokalny 514 wyświetleń i ZERO kliknięć. Siedem wyświetleń
    // z czwartej strony wyników, nieklikanych.
    //
    // ⚠ MIASTO ZOSTAJE W `seo.title` NIŻEJ, ŚWIADOMIE. To rozdzielenie zastosowań,
    // nie niekonsekwencja: `title` trafia wprost do wyniku wyszukiwania i tam
    // lokalność pracuje, H1 jest obietnicą zakresu i tam zawężała. Zgodne
    // z docs/zasady-tekstow.md („W `title` zostaje, tam jego miejsce jest właściwe").
    //
    // ⚠ ZNANY ROZJAZD DO OSOBNEJ DECYZJI: docs/zasady-tekstow.md §„Miasto
    // w nagłówkach" używa zdania „Obsługa eventów firmowych w Poznaniu" jako
    // przykładu nagłówka DOPUSZCZALNEGO. Ten przykład jest teraz sprzeczny
    // ze stanem strony. Reguły celowo NIE przepisano (polecenie Marcina).
    h1: "Fotografia i wideo wydarzeń firmowych",
    galleryCategory: "eventy",
    extraGallery: {
      // Portrety zamiast kadrów z sesji IDcom (Marcin, 04.08.2026). Sekcja renderuje
      // się POD przykładową realizacją wideo, patrz kolejność w uslugi/[slug]/page.tsx.
      category: "portrety",
      // ⚠ PRZEJŚCIE NA USŁUGĘ ZESZŁO Z PRZYCISKA NA `secondaryLink` 11.08.2026
      // (audyt UI, finding C1, decyzja Marcina).
      //
      // Było: `ctaLabel: "Zobacz wizerunek firmy"` + `href: "/uslugi/wizerunek-portrety"`,
      // czyli GŁÓWNY przycisk paska prowadził na inną usługę. Mierzone na produkcji
      // przy 1440 px: obrysowany przycisk 239 x 47 px na y = 3780, o tej samej wadze
      // co „Zobacz całą galerię" i co CTA kontaktowe po „Zakresie realizacji".
      // Najmocniejszym wyjściem ze środkowej części podstrony eventowej było więc
      // wyjście z lejka, a nie zejście do galerii ani do formularza.
      //
      // Osobno: ta sama relacja z drugiej strony, na `/uslugi/wizerunek-portrety`,
      // była zwykłym linkiem tekstowym 13 px. Jedna para usług, dwie wagi.
      // Teraz obie strony mają ten sam wzorzec: przycisk do galerii, odsyłacz do usługi.
      //
      // Aby cofnąć: przenieś `label`/`href` z `secondaryLink` z powrotem na
      // `ctaLabel`/`href` i skasuj `ctaLabel` z tej linii.
      //
      // ⚠ `ctaLabel` MUSI tu zostać jawny, mimo że domyślna wartość dla kategorii
      // `portrety` to „Zobacz całą galerię". Pierwszy pasek tej podstrony ma już
      // dokładnie tę etykietę (prowadzi do `/galeria?kat=eventy`), więc default dałby
      // na jednej podstronie DWA przyciski o identycznym tekście i dwóch różnych
      // celach. Czytnik ekranu podaje wtedy na liście linków dwie takie same pozycje.
      // Ten sam mechanizm rozstrzygnięto już raz na `/uslugi/wizerunek-portrety`
      // (wariant A, 11.08.2026): rozróżniamy etykietę, nie cel.
      ctaLabel: "Zobacz galerię portretów",
      sub: "Planujesz event firmowy? To zwykle jedyny dzień w roku, kiedy cała firma jest w jednym miejscu. Przy okazji wydarzenia mogę zrobić sesję portretową dla całego zespołu: przywożę mobilne studio, a jedna osoba to około 5 do 15 minut, między prelekcjami albo w luźniejszym oknie agendy.",
      // Lustro `secondaryLink` z `/uslugi/wizerunek-portrety`: tam wizerunek prowadzi
      // do wydarzeń, tu wydarzenia prowadzą do wizerunku. Etykieta bez zmian, ta sama,
      // którą Marcin zatwierdził jako `ctaLabel` 04.08.2026.
      secondaryLink: {
        label: "Zobacz wizerunek firmy",
        href: "/uslugi/wizerunek-portrety",
      },
    },
    videoId: "m42ywMWjthw",
    videoTitle: "Film z eventu firmowego dla Woohoo",
    videoNote: "Tak wygląda film z eventu: dynamiczne podsumowanie wydarzenia, gotowe do social mediów.",
    title: "Dokumentacja wydarzeń firmowych",
    shortTitle: "Wydarzenia firmowe",
    subtitle:
      // LIVE EDITING = OPCJA DODATKOWO PŁATNA (decyzja Marcina 10.08.2026).
      // Kafelek mówił „część kadrów na social media jeszcze w trakcie wydarzenia"
      // bez żadnego zastrzeżenia, czyli obiecywał to w standardzie.
      // Ta sama zasada obowiązuje w `scope`, `process`, `faqs` i w `portfolio.ts`.
      "Konferencje, targi, gale i integracje. Zdjęcia, film i dron z jednego dnia, a w opcji dodatkowej część kadrów na social media jeszcze w trakcie wydarzenia.",
    heroLabel: "Dokumentacja wydarzeń",
    // Lead ukryty w hero 10.08.2026 (ósma tura). Treść ZOSTAJE w danych, bo
    // renderuje ją kafelek na `/uslugi` i karta pod wpisem blogowym.
    heroHideSubtitle: true,
    // Lead przepisany 10.08.2026 (pakiet 4, wersja wybrana przez Marcina).
    // Poprzedni opisywał SPOSÓB pracy („fotografuję dyskretnie, reportażowo").
    // Nowy sprzedaje WARTOŚĆ MATERIAŁU PO wydarzeniu, bo to jest argument
    // biznesowy, a nie estetyczny.
    //
    // PRZEPISANY 10.08.2026 (ósma tura), treść podana przez Marcina co do słowa.
    // To jedyny akapit opisowy w hero: lead zniknął, korzyści zniknęły.
    //
    // ⛔ NAZWY KLIENTÓW (H&M, Santander Bank Polska, Warner Music Poland, John Deere)
    // NIE WRACAJĄ DO TEGO AKAPITU. Decyzja Marcina z 10.08.2026, finding UXUI2608-07,
    // wariant A. Zamknięte, nie otwierać ponownie.
    //
    // Kontekst, żeby nikt nie „naprawiał" tego jako braku dowodu społecznego:
    // ósma tura wycięła to zdanie na warunkową zgodę Marcina („zachowaj tylko
    // wtedy, jeśli wizualnie nadal będzie to wyglądało lekko"), czyli warunek
    // postawił Marcin, a ocenił go agent. Audyt rundy 2 sprawdził tę ocenę na
    // renderze i ją potwierdził: `LogoBar` z DOKŁADNIE tymi czterema markami
    // renderuje się bezpośrednio pod hero tej podstrony. Powtórzenie ich zdaniem
    // wyżej nie dokłada dowodu, tylko wydłuża akapit, który świadomie skracaliśmy.
    description:
      "Konferencja, gala albo integracja trwa kilka godzin, ale materiał z niej może pracować przez kolejne miesiące. Fotografuję i filmuję wydarzenia firmowe tak, żeby powstał materiał do publikacji, komunikacji marki i promocji kolejnych wydarzeń.",
    applications: {
      heading: "Dla jakich wydarzeń",
      items: [
        "Konferencje i kongresy",
        "Gale i jubileusze",
        "Targi i stoiska",
        "Szkolenia i warsztaty",
        "Premiery produktów",
        "Spotkania firmowe i integracje",
        // Dodane 10.08.2026 (decyzja Marcina). „Spotkania firmowe i integracje"
        // czytało się jak impreza w siedzibie, a realizacje wyjazdowe są realną
        // częścią portfolio (integracja na torze, wyjazd firmowy w galerii eventowej).
        "Wyjazdy integracyjne",
        "Wydarzenia branżowe i networkingowe",
      ],
      usesHeading: "Gdzie materiał pracuje dalej",
      // Lista celowo krótka i bez rozwinięć (Marcin, 10.08.2026: „nie
      // rozbudowujmy jej w kolejny blok SEO"). Reguła obowiązuje dalej:
      // przy kolejnym pomyśle na rozbudowę tej listy najpierw zapytaj.
      uses: [
        "Relacja na LinkedIn i Instagram",
        "Podsumowanie roku i materiały wewnętrzne",
        "Promocja kolejnej edycji",
        // Dodane 10.08.2026 (decyzja Marcina), JEDNA pozycja, świadomie nie pięć.
        // Zdjęcia z wydarzeń firmowych trafiają do ogłoszeń o pracę i na strony
        // kariery częściej niż do materiałów prasowych, a to argument, że materiał
        // nie kończy życia w galerii po evencie.
        "Rekrutacja i employer branding",
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
          title: "Zdjęcia w trakcie wydarzenia (opcja dodatkowa)",
          // Dopisany kanał publikacji (Marcin, 10.08.2026). Poprzednia wersja
          // mówiła „przesyłam do publikacji", czyli nie nazywała miejsca, w którym
          // ta publikacja ma się wydarzyć. Social media są tu konkretem: to jedyny
          // kanał, w którym zdjęcie z eventu ma sens tego samego dnia.
          desc: "Wybrane kadry obrabiam na miejscu i przesyłam w trakcie wydarzenia, więc relację na LinkedInie i Instagramie publikujesz, zanim goście wrócą do domu. Zamawiana osobno, poza podstawowym zakresem.",
        },
        {
          title: "Wideo",
          desc: "Film podsumowujący, pionowe reelsy, wywiady z uczestnikami i prelegentami, przebitki do dalszego montażu.",
        },
        {
          // ⛔ ŻADNYCH TECHNIKALIÓW W TYM BLOKU. Model drona, certyfikat A1/A3
          // i OC zostają WYŁĄCZNIE w FAQ (Marcin, 10.08.2026). Tego samego dnia
          // wypadło stąd również „Latam dronem DJI": marka sprzętu to technikalia,
          // a blok zakresu ma mówić, co klient dostaje. Nie przywracać.
          //
          // ⛔ „parking" USUNIĘTY 10.08.2026 na polecenie Marcina. Był jedyną
          // pozycją w tym wyliczeniu, której nikt nie zamawia: reszta nazywa
          // rzeczy, które z góry wyglądają dobrze, a parking to logistyka.
          // Nie przywracać.
          //
          // Drugie zdanie wiąże ten blok z blokiem „Wideo" stojącym bezpośrednio
          // wyżej: ujęcie z powietrza to typowe otwarcie filmu podsumowującego,
          // więc obie pozycje przestają być osobnymi wyspami.
          title: "Ujęcia z powietrza",
          desc: "Skala wydarzenia plenerowego, teren i ustawienie sceny. Ujęcia z powietrza mogą być również częścią filmu podsumowującego.",
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
    // ZDJĘCIE HERO: grupa przed dwoma autami sportowymi na torze.
    //
    // ⛔ TEN SAM PLIK CO NA KAFELKU strony głównej. To NIE jest pomyłka
    // i NIE jest regres. Decyzja Marcina z 10.08.2026, podjęta po dwukrotnym
    // przedstawieniu mu kosztu: „na obydwu ma być to z samochodami, i jak
    // wejdziesz w usługę i na głównej".
    //
    // ⚠ REGUŁA „hero i kafelek muszą być różne" ZOSTAŁA TYM ŚWIADOMIE UCHYLONA
    // dla tej jednej usługi. Wcześniej obowiązywała i wynikała z findingu
    // UXUI2608-04: klik z kafelka prowadzi wtedy do powiększenia miniatury,
    // którą klient przed chwilą kliknął, więc przejście nie wnosi nowego obrazu.
    // Koszt jest realny, ale Marcin go zna i wybrał ten kadr na obu powierzchniach.
    //
    // NIE „naprawiać" tego przy kolejnym audycie i nie zgłaszać jako duplikatu
    // bez zapytania. Dla pozostałych trzech usług reguła obowiązuje dalej.
    //
    // ⚠ HERO NIE MOŻE BYĆ Z LISTY `SERVICE_GALLERY.eventy` w `ServiceGalleryStrip.tsx`,
    // bo tamten pas renderuje się NIŻEJ NA TEJ SAMEJ STRONIE. Formalnie chroni przed
    // tym prop `exclude={service.heroImage}`, ale nie polegaj na nim przy wyborze:
    // wycięcie kadru z paska zmniejsza pasek do pięciu pozycji.
    //
    // ⚠ KADR POKAZUJEMY W CAŁOŚCI, BEZ PRZYCIĘCIA (decyzja Marcina, 10.08.2026:
    // „to pierwsze zdjęcie grupowe niech nie będzie przycięte, najwyżej będzie
    // się różnić od reszty, ale chcę żeby było całe").
    //
    // ⚠ KADR ZMIENIONY I `heroImageAspect` USUNIĘTY 11.08.2026 (audyt końcowy UI,
    // finding F1, decyzja Marcina). Ta podstrona wraca do wspólnego mechanizmu
    // wysokości hero, którego używają trzy pozostałe usługi.
    //
    // HISTORIA, żeby nikt nie cofnął tego przez przypadek. Do 10.08 stało tu
    // `event-02-zdjecie-grupowe-tor` (zdjęcie grupowe na torze, 1920×1280).
    // Kwadratowy kontener obcinał mu boki, w tym lewe auto i skrajne osoby, więc
    // dołożono `heroImageAspect: "aspect-[3/2]"`, żeby kontener dostał proporcje
    // pliku i `cover` nie miał czego przyciąć. Rozwiązywało to problem kadru
    // i tworzyło problem układu.
    //
    // Zmierzone 11.08 na renderze 1440 px: zdjęcie miało 345 px wysokości wobec
    // 598, 647 i 748 px na trzech pozostałych podstronach, a pod nim zostawało
    // 128 px pustego tła w prawej kolumnie, obok ceny, przycisku i mikrokopii
    // (przy 1000 px szerokości: 140 px). Hero eventów było jedynym pierwszym
    // ekranem w serwisie, który łamał wzorzec.
    //
    // Dlaczego podmiana pliku, a nie samo zdjęcie `heroImageAspect`: WSZYSTKIE
    // 15 kadrów w `public/images/galeria/eventy/` ma 1920×1280, czyli dokładnie
    // 3:2. Nie ma w repo eventowego kadru o proporcji bliższej kwadratowi, więc
    // wspólny kontener zawsze coś przytnie. Policzone: kontener bez tej flagi
    // ma tu 517×520 px, czyli z pliku zostaje 66% szerokości, po 17% z każdej
    // strony. Zdjęcie grupowe tego nie znosi, bo ludzie stoją do samych krawędzi.
    //
    // `event-12` znosi, i to jest jedyny powód wyboru: pojedyncza sylwetka
    // dokładnie w centrum, wypełnia kadr na całej wysokości, a przy krawędziach
    // są tylko karoseria i tło. Do tego firmowa koszulka i identyfikator mówią
    // „wydarzenie firmowe" bez podpisu, a kadr nie wygląda na koncertowy.
    //
    // ⚠ `heroImagePos` CELOWO NIE MA. Sprawdzone na renderze po zmianie przy
    // 1440, 390 i 360 px: przy centralnej sylwetce domyślne `center` trzyma
    // twarz i tors w kadrze na każdej z tych szerokości. Nie dodawać „na wszelki
    // wypadek", bo każda wartość inna niż `center` przesuwa kadr na WSZYSTKICH
    // breakpointach naraz.
    //
    // ⚠ `event-12` NIE JEST w wyselekcjonowanej szóstce paska eventowego
    // (`CURATED.eventy` w `ServiceGalleryStrip.tsx`) i tak ma zostać. Gdyby tam
    // trafił, filtr `exclude` skróciłby pasek z sześciu kadrów na pięć, a wtedy
    // wyłącza się on całkowicie i hero wróciłoby w pasku drugi raz.
    heroImage: "/images/galeria/eventy/event-12-za-kierownica-auta.jpg",
    price: "wycena w 24h",
    process: [
      { num: 1, title: "Rozmowa", desc: "Agenda, kluczowe momenty, VIP-y" },
      { num: 2, title: "Realizacja", desc: "Dyskretna fotografia reportażowa" },
      { num: 3, title: "Live edit", desc: "Opcja dodatkowa: zdjęcia na social media w trakcie eventu" },
      { num: 4, title: "Dostawa", desc: "Pełna galeria w 14 dni" },
    ],
    // Przepisane 10.08.2026. Poprzednia wersja mówiła „rozliczenie dniówką
    // wychodzi korzystniej niż sumowanie godzin", czyli odsłaniała mechanikę
    // cenową zamiast obiecywać korzyść (korekta Marcina).
    pricingBlurb:
      "Na wycenę wpływa liczba godzin obecności, to, czy dochodzi wideo i ujęcia z powietrza, oraz czy chcesz zdjęcia gotowe do publikacji jeszcze w trakcie wydarzenia. Przy dłuższych realizacjach przygotowuję korzystniejszą wycenę całościową.",
    priceFaqQuestion: "Ile kosztuje fotograf na event firmowy?",
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
      // Pytanie o licencję dodane 10.08.2026 (audyt zewnętrzny §12). Treść oparta
      // na istniejącej odpowiedzi z `faq.ts` („Czy mogę użyć zdjęć na LinkedIn /
      // stronie / w reklamie?") i na liście zbijającej ryzyko w `CTA.tsx`
      // („Licencja komercyjna bez limitu czasu"). Nowych warunków NIE wprowadza:
      // rozpisuje te same uprawnienia na kanały, które ta usługa realnie obsługuje,
      // czyli na pozycje z `applications.uses` wyżej na tej samej stronie.
      //
      // ⚠ Świadomie NIE dotyka zgód na wizerunek uczestników. To osobny temat
      // (obowiązek po stronie organizatora, nie fotografa) i strona nie ma dziś
      // na ten temat żadnego zapisu. Dopisanie go byłoby nową deklaracją prawną,
      // a nie przeniesieniem istniejącej. Do decyzji Marcina.
      { q: "Czy dostaję prawa do wykorzystania zdjęć?", a: "Tak. Licencja obejmuje użytek komercyjny bez limitu czasu: strona www, social media, materiały drukowane, reklama online, materiały prasowe i raporty, komunikacja wewnętrzna oraz promocja kolejnych edycji wydarzenia. Nie dopłacasz za kolejne kanały ani za kolejny rok." },
      { q: "Czy mogę dostać zdjęcia jeszcze w trakcie wydarzenia?", a: "Tak, w opcji dodatkowej. Wybrane kadry obrabiam na miejscu i przesyłam do publikacji, więc relacja wychodzi wtedy, kiedy ludzie jeszcze siedzą na sali, a nie trzy dni później. To osobna pozycja w wycenie, poza podstawowym zakresem, więc zgłoś ją przy ustalaniu szczegółów." },
      // Kadry pionowe (audyt zewnętrzny §12), PRZEPISANE 10.08.2026 na opcję
      // po weryfikacji u Marcina: fotografuje w obu orientacjach, o wyborze decyduje
      // kadr i miejsce publikacji, ale dedykowane wersje 4:5 i 9:16 wymagają
      // zgłoszenia PRZED realizacją. Poprzednia wersja obiecywała je jako standard
      // w każdym zleceniu, czego nie potwierdza ani oferta, ani dostawy na dysku
      // (folder `Social` ostatniej realizacji eventowej: 51 plików, wszystkie 3:2).
      // Strona obiecywała dotąd pionowy
      // format wyłącznie przy WIDEO („pionowe reelsy" w `scope`), a przy zdjęciach
      // nie mówiła o nim nigdzie, mimo że relacja z eventu na LinkedInie
      // i Instagramie idzie właśnie w pionie.
      //
      // Proporcje nie są tu wymyślone: 4:5 i 9:16 to formaty dostawy z konwencji
      // nazw katalogów (`Post` 1638×2048, `Story` 1152×2048) opisanej
      // w `01_Biznes/_System/05_Produkcja/system_plikow_v1.md`, aneks A.
      { q: "Dostanę kadry pionowe do relacji w social mediach?", a: "Fotografuję zarówno poziomo, jak i pionowo. O orientacji decyduje sam kadr: to, co ma pokazywać, i miejsce, w którym zostanie opublikowany. Jeśli potrzebujesz dedykowanych wersji 4:5 pod post i 9:16 pod relację, zaznacz to przed realizacją. Wtedy prowadzę kadrowanie na miejscu z myślą o obu formatach i przygotowuję je w postprodukcji." },
      { q: "Kto robi zdjęcia i film, gdy wydarzenie jest duże?", a: "Przy standardowym wydarzeniu robię wszystko sam. Przy dużym, gdzie dwie rzeczy dzieją się naraz, biorę drugiego operatora. Retusz i montaż robię osobiście, więc materiał wychodzi w jednym standardzie. Dla Ciebie to nadal jedna osoba kontaktowa, jedne ustalenia i jedna faktura." },
      { q: "Zrobisz przy okazji zdjęcia całego zespołu?", a: "Tak. Przywożę mobilne studio: 5 m², gniazdko, 30 minut na rozstawienie. Potem fotografuję kolejne osoby po 5 do 15 minut, między prelekcjami albo w luźniejszym oknie agendy. Bez osobnego terminu i bez osobnego dojazdu." },
      { q: "Obsłużysz cykl wydarzeń?", a: "Tak. Jeśli realizacje wracają co roku, ustalamy liczbę wydarzeń z góry: rezerwuję terminy i trzymam dzisiejsze ceny na całość." },
      { q: "Fotografujesz wieczorne gale przy słabym świetle?", a: "Tak. Jasne obiektywy f/1.4 i f/2.8 pozwalają pracować bez nachalnego flesza, z zachowaniem klimatu sali. Gdy trzeba, dokładam dyskretne doświetlenie." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Dwa aparaty Canon R6 z zapisem na dwie karty, więc materiał z wydarzenia jest zabezpieczony od pierwszego kadru. Do tego jasne obiektywy Sigma, Sigma 70-200 mm f/2.8 do ujęć z dystansu, mobilne oświetlenie Godox i dron DJI Mini 5 Pro z certyfikatem A1/A3 i OC." },
    ],
    // `fotografia-eventowa` dołożone 11.08.2026: miało JEDEN link przychodzący
    // w całym serwisie (kafel na `/portfolio`), mimo że to case study tej usługi.
    portfolioSlugs: ["woohoo-autopay", "fotografia-eventowa"],
    // Struktura zdaniowa taka sama jak w domyślnym nagłówku („czasownik w 1. os.
    // l. mn. + dopełnienie w drugim wierszu"), więc kompozycja bloku się nie zmienia.
    // Nie obiecuje dostępności terminu: to zdanie stoi nad formularzem, a terminu
    // nie potwierdzam przed rozmową.
    ctaHeading: ["Zaplanujmy obsługę", "Twojego wydarzenia"],
    formServiceCode: "event",
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
    // ⚠ `gallerySecondaryLink` ZDJĘTY 11.08.2026 (C2, decyzja Marcina).
    //
    // Prowadził do `/portfolio/sesja-wizerunkowa` spod paska portretów i został
    // dodany rano tego samego dnia, gdy ta realizacja miała w całym serwisie
    // JEDEN link przychodzący, kafel na `/portfolio`. Problem, który rozwiązywał,
    // zamyka teraz `portfolioSlugs` niżej: sesja wizerunkowa stoi w bloku
    // „Przykładowe realizacje" razem z dwiema pozostałymi, więc odsyłacz pod
    // paskiem byłby drugim wejściem do tej samej realizacji na jednej podstronie.
    //
    // Razem z nim odpada ustalenie z 11.08 o rozróżnianiu etykiet („wariant A"):
    // dotyczyło konfliktu między tym odsyłaczem a przyciskiem „Zobacz case study"
    // na pasku zespołowym. Konfliktu nie ma, bo nie ma już drugiego elementu.
    // Przycisk paska zespołowego zostaje nietknięty.
    //
    // Samo pole `gallerySecondaryLink` USUNIĘTE Z `ServiceData` tego samego dnia,
    // razem z przekazaniem propa w `uslugi/[slug]/page.tsx`. Ta usługa była jego
    // jedynym użytkownikiem w historii, więc po C2 zostałby mechanizm bez żadnego
    // zastosowania, czyli dokładnie sytuacja z findingu F1 („wartości siedziały
    // w danych i nic ich nie renderowało"), tylko odwrócona: kod bez danych.
    // Poboczne odsyłacze pod DRUGIM paskiem działają dalej i są w użyciu na dwóch
    // podstronach, przez `extraGallery.secondaryLink`. Jeśli kiedyś główny pasek
    // ma znowu dostać odsyłacz, pole wraca w jednym commicie: typ, prop, wartość.
    extraGallery: {
      // Po scaleniu z usługą „sesje zespołowe" (10.08.2026) pasek nie prowadzi
      // już na osobną podstronę, bo tej podstrony nie ma. Href celowo pominięty:
      // `ServiceGalleryStrip` kieruje kategorię `zespolowe` na case study
      // `/portfolio/idcom-headshoty-zespolu`, nie na filtrowaną galerię.
      category: "zespolowe",
      // Etykieta poprawiona 10.08.2026 (decyzja Marcina). Poprzednia, „Zobacz sesje
      // zespołowe", myliła podwójnie: obiecywała galerię, a przycisk prowadzi do case
      // study jednego klienta (IDcom), i sugerowała osobną usługę, którą sesje
      // zespołowe przestały być po scaleniu z wizerunkiem tego samego dnia
      // (`/uslugi/sesje-zespolowe` to dziś 308 na `/uslugi/wizerunek-portrety`).
      //
      // ⛔ NADPISANIE ZOSTAJE JAWNE, mimo że `ServiceGalleryStrip` ma własną wartość
      // domyślną dla kategorii `zespolowe`. Domyślna brzmi „Zobacz całą realizację",
      // a Marcin chce dokładnie „Zobacz case study". Nie usuwać tej linii w przekonaniu,
      // że default zrobi to samo — zrobi co innego.
      ctaLabel: "Zobacz case study",
      // ⛔ NIE PRZYWRACAĆ TU PODPISU O MOBILNYM STUDIU. Zdjęty 10.08.2026
      // (audyt aktualnej wersji, punkt 1, zgoda Marcina).
      //
      // Nadpisywał domyślny podpis kategorii z `ServiceGalleryStrip.tsx` i przez to
      // kasował JEDYNE zdanie na stronie, które tłumaczyło, dlaczego w tym pasku
      // widać trzy różne tła. Powstawała sprzeczność na jednym ekranie: „Zakres
      // realizacji" i FAQ obiecywały spójność, a zdjęcia obok pokazywały białe,
      // kremowe i czarne tło bez słowa wyjaśnienia.
      //
      // Domyślny podpis mówi dokładnie to, co trzeba (trzy tła, ten sam standard
      // światła i retuszu, realizacja dla IDcom Group), więc pole zostaje puste:
      // jedno źródło prawdy zamiast dwóch kopii tego samego zdania.
      //
      // Logistyka mobilnego studia nie ginie, stoi w „Zakresie realizacji"
      // (karta „Mobilne studio w Twoim biurze") i w FAQ („Sesja u nas w biurze
      // czy w studiu?"). Tutaj była trzecim powtórzeniem.
      //
      // Kierunek wizerunek → wydarzenia firmowe (10.08.2026, polecenie Marcina).
      // Stoi przy pasku sesji zespołowych, bo to jedyne miejsce na tej podstronie,
      // gdzie oba wątki się realnie spotykają: zespół w komplecie zdarza się
      // najczęściej przy okazji wydarzenia firmowego. Ta sama zależność jest już
      // opisana z drugiej strony, w `extraGallery.sub` na `/uslugi/eventy-reportaze`.
      secondaryLink: {
        // Etykieta poprawiona przez Marcina 10.08.2026. Wcześniej „Zobacz obsługę
        // wydarzeń firmowych": funkcjonalnie poprawne, ale „obsługa" nazywa usługę
        // z perspektywy oferty, a nie tego, po co użytkownik klika.
        //
        // ⛔ NIE ZMIENIAĆ NA „Zobacz reportaż z wydarzenia". Ten link prowadzi
        // na stronę USŁUGI, a taka etykieta obiecuje konkretne kadry, czyli
        // case study `/portfolio/fotografia-eventowa`.
        label: "Zobacz fotografię i wideo wydarzeń",
        href: "/uslugi/eventy-reportaze",
      },
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
    // ⛔ „TO SAMO TŁO" ZDJĘTE Z LEADU 10.08.2026. To trzecie i ostatnie miejsce
    // na tej stronie z tą obietnicą: karta „Sesja całego zespołu" i FAQ o spójności
    // straciły ją wcześniej tego samego dnia, a lead został wtedy pominięty.
    // Powód jest ten sam: realizacja IDcom to jedna sesja na TRZECH tłach, a pas
    // galerii dwie sekcje niżej mówi to wprost („trzy tła: białe, czarne
    // z niebieskim światłem i kremowe"). Lead obiecywał odwrotnie, na tym samym
    // ekranie przewinięcia. Brzmienie zrównane z kartą zakresu, żeby całe trzy
    // miejsca mówiły jednym głosem. Nie przywracać.
    //
    // ⛔ „SCALIO" I „1ST PLACE" USUNIĘTE 10.08.2026 na wyraźne polecenie Marcina
    // („niech nie wspominamy nigdzie na stronie, nie ma czym się chwalić na razie").
    // Obie nazwy nie miały pokrycia nigdzie poza tym jednym zdaniem, w odróżnieniu
    // od IDcom (case study + galeria) i Poznańskich Nieruchomości (opinia
    // Burzyńskiej pod tą samą usługą). Ta sama reguła stoi przy usłudze produktowej
    // niżej w tym pliku: klienta bez źródła się nie nazywa.
    //
    // NIE dopisywać tu nowych nazw bez potwierdzenia u Marcina. Sama wzmianka
    // w komentarzu albo w pliku wewnętrznym NIE jest źródłem.
    description:
      "Na zakładce „Zespół” widać wszystko: kto ma zdjęcie z sesji, kto przycięty kadr z wesela, a kto szare kółko z inicjałami. Fotografuję ludzi w firmie tak, żeby cały zespół wyglądał jak jedna firma: ten sam standard światła i retuszu. Przyjeżdżam z mobilnym studiem do biura, więc nikt nie traci pół dnia na dojazd. Sesje zespołowe robiłem między innymi dla IDcom Group i Poznańskich Nieruchomości.",
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
          // ⚠ „To samo tło" ZDJĘTE 10.08.2026 (audyt aktualnej wersji, punkt 1,
          // zgoda Marcina). Obietnica była za mocna wobec tego, co pokazuje pasek
          // galerii dwie sekcje niżej: realizacja dla IDcom to jedna sesja na
          // TRZECH tłach (białym, kremowym, czarnym z niebieskim światłem), bo
          // klient potrzebował różnych klimatów do różnych kontekstów.
          // Sformułowanie „ten sam standard światła i retuszu" jest wzięte
          // z domyślnego podpisu kategorii `zespolowe` w `ServiceGalleryStrip.tsx`
          // i opisuje to, co realnie dowozisz przy każdej liczbie teł.
          desc: "Do 40 osób w jeden dzień, 5 do 15 minut na osobę. Ten sam standard światła i retuszu dla wszystkich, dwa wyretuszowane zdjęcia na osobę.",
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
    // ZDJĘCIE Z KAFELKA, 10.08.2026 (decyzja Marcina: „to co jest na kafelku
    // ma być w hero"). Hero i kafelek tej usługi pokazują ten sam plik.
    // Poprzednio: `portret-05-mezczyzna-zielony-garnitur`.
    heroImage: "/images/galeria/portrety/portret-02-kobieta-z-laptopem.jpg",
    // ⚠ WARTOŚĆ ZWERYFIKOWANA POD TEN PLIK, nie przepisana ze starego.
    // Hero jest KWADRATOWE, a plik ma 1536×1920 (0,80:1), więc widać 80%
    // wysokości kadru i obcina się 20%. Sprawdzone wycinkiem 1536×1536:
    // twarz w całości, laptop i dłonie w kadrze, nad głową zostaje oddech.
    heroImagePos: "center 20%",
    // Próg wejściowy obniżony 04.08.2026 decyzją Marcina: PORTRET START 700 zł netto
    // (1 osoba, sesja do 30 min, w cenie studio zewnętrzne w Poznaniu ALBO dojazd
    // z mobilnym studiem do klienta). Kanon: cennik_2026_07_v3.md §1.
    // DEPRICING 14.08.2026: kwota zdjęta razem z pozostałymi trzema usługami.
    // `minPrice` w JSON-LD zniknął przy tej samej zmianie, więc to pole nie zasila
    // już danych strukturalnych.
    price: "wycena w 24h",
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
      // ⚠ „to samo tło" ZDJĘTE 10.08.2026, ta sama zmiana co w karcie „Sesja
      // całego zespołu" wyżej (audyt aktualnej wersji, punkt 1, zgoda Marcina).
      // Trójka „światła, kadrowania i retuszu" nie jest nowa: tak samo opisuje
      // to `caseStudy.solution` realizacji IDcom w `portfolio.ts`.
      { q: "Czy zdjęcia całego zespołu będą wyglądać spójnie?", a: "Tak, i to jest właściwie cały sens tej usługi. Ten sam standard światła, kadrowania i retuszu dla każdej osoby. Na stronie widać wtedy firmę, a nie zbiór przypadkowych zdjęć." },
      // Zdanie o studiu przepisane przez Marcina 10.08.2026. Poprzednia wersja
      // („w cenie startowej masz studio…") dawała się czytać tak, jakby studio
      // było dostępne WYŁĄCZNIE w progu startowym.
      { q: "Sesja u nas w biurze czy w studiu?", a: "Jak wolisz. Przy jednej osobie możesz wybrać studio w Poznaniu albo mój dojazd z mobilnym studiem. Przy większym zespole biuro wychodzi zwykle taniej i szybciej, bo nikt nie musi nigdzie jechać." },
      // Głos strony, nie nowy tekst: oba zdania są wzorcami z docs/zasady-tekstow.md.
      { q: "Nie umiem pozować i źle wypadam na zdjęciach.", a: "Słyszę to bardzo często i za każdym razem efekt pozytywnie zaskakuje. Nie musisz być modelem, wystarczy być sobą. Reszta to moja robota." },
      // Licencja sprawdzona 10.08.2026 wobec src/data/faq.ts:60 — ta sama
      // obietnica stoi już na produkcji, więc to nie jest nowe zobowiązanie.
      { q: "Kiedy dostanę zdjęcia i czy mogę ich używać bez ograniczeń?", a: "Wyretuszowane zdjęcia w 14 dni, ekspres do 48h za dopłatą. Licencja obejmuje użytek komercyjny bez ograniczeń czasowych: strona, social media, druk, reklama." },
      // Pytanie o wideo dodane 11.08.2026 (decyzja Marcina, audyt FAQ czterech usług).
      //
      // Powód: ta podstrona obiecuje wideo w H1, w podtytule, w karcie zakresu
      // i w kroku procesu („film w 21 dni"), a FAQ milczało. Pytanie stojące wyżej
      // („Kiedy dostanę zdjęcia...") odpowiada WYŁĄCZNIE o zdjęciach, więc termin
      // filmu nie padał nigdzie w FAQ, mimo że stoi dwa ekrany wyżej w procesie.
      // Podstrona przejmuje też 308 z dawnego `/uslugi/wideo-marketing`.
      //
      // Wszystkie fakty przeniesione z istniejących powierzchni, zero nowych:
      // wyliczenie formatów i „w tym samym dniu co zdjęcia" to cytat z karty
      // zakresu na tej samej podstronie, terminy 14 i 21 dni to krok procesu,
      // trzy tury poprawek to `faq.ts` (offHomeFaqs) i punkt w formularzu.
      //
      // ⛔ ŚWIADOMIE BEZ „w ciągu 7 dni od zgłoszenia" przy poprawkach. Marcin
      // wyciął ten fragment z mojej propozycji (11.08.2026). Nie dopisywać.
      //
      // ⛔ NIE DOKŁADAĆ TU PRZYKŁADOWEGO FILMU. Ta podstrona nie ma `videoId`
      // celowo: w `galleryVideos` nie ma materiału wizerunkowego, a podstawianie
      // filmu z innej kategorii zostało odrzucone. To brak w portfolio,
      // nie brak w kodzie.
      { q: "Zrobisz film przy okazji sesji zdjęciowej?", a: "Tak. Krótki film o firmie, wypowiedzi do kamery i pionowe formaty na LinkedIn nagrywam w tym samym dniu co zdjęcia, bez osobnego terminu. Zdjęcia dostajesz w 14 dni, film w 21 dni. W cenie filmu są trzy tury poprawek montażowych." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Canon R6 z zapisem na dwie karty, Sigma 70-200 mm f/2.8 jako podstawowy obiektyw portretowy, bo dłuższa ogniskowa nie zniekształca rysów twarzy, i studyjne oświetlenie Godox. Do biura przywożę cały zestaw ze sobą." },
    ],
    // WSZYSTKIE TRZY REALIZACJE WIZERUNKOWE W JEDNYM BLOKU (C2, decyzja Marcina,
    // 11.08.2026). Cofa zapis z tego samego dnia („celowo bez `idcom-headshoty-zespolu`
    // i `sesja-wizerunkowa`, obie są już linkowane wyżej z pasków galerii").
    //
    // Powód cofnięcia, z audytu UI: te trzy realizacje jednej usługi miały trzy różne
    // wagi wizualne na jednej podstronie. Sesja wizerunkowa była odsyłaczem tekstowym
    // pod paskiem portretów, IDcom przyciskiem obrysowanym pod paskiem zespołowym,
    // a sesja korporacyjna jedyną pozycją w bloku „Przykładowe realizacje". Użytkownik
    // nie miał skąd wiedzieć, że blok pod CTA nie jest kompletny.
    //
    // KOLEJNOŚĆ USTAWIONA RĘCZNIE i wynika wprost z niej, nie z sortowania: `caseLinks`
    // w `uslugi/[slug]/page.tsx` zachowuje kolejność tej tablicy. Od najbliższego
    // znaczeniowo do najdalszego: sesja korporacyjna i wizerunkowa to rdzeń usługi,
    // IDcom jest jej wariantem zespołowym.
    //
    // ⚠ IDcom ma po tej zmianie DWA wejścia na tej podstronie: ten blok i przycisk
    // „Zobacz case study" pod paskiem zespołowym. Zostawione świadomie. Przycisk stoi
    // pod sześcioma kadrami z TEJ sesji, więc jest odsyłaczem kontekstowym („widzisz
    // te zdjęcia, zobacz całość"), a nie drugą kopią spisu realizacji. Zdjęcie go
    // zostawiłoby pasek bez żadnego wyjścia, a blok jest wtedy ~2 000 px niżej.
    portfolioSlugs: ["sesja-korporacyjna", "sesja-wizerunkowa", "idcom-headshoty-zespolu"],
    formServiceCode: "wizerunek",
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
    // ZDJĘCIE Z KAFELKA, 10.08.2026 (decyzja Marcina: „mają być jedne zdjęcia,
    // na obydwu Belweder"). Hero i kafelek pokazują ten sam plik.
    // Poprzednio: `produkt-02-amarula`.
    // ⚠ BRAK `heroImagePos` JEST CELOWY. Plik ma 1080×1620 (0,67:1), hero jest
    // kwadratowe, więc widać 67% wysokości. Sprawdzone wycinkiem 1080×1080 przy
    // domyślnym wyśrodkowaniu: toast z czytelnym logo na kieliszkach, danie
    // i butelka mieszczą się w kadrze. Nie dorabiać tu wartości „dla pewności".
    heroImage: "/images/galeria/produktowe/produkt-01-toast-belvedere.jpg",
    price: "wycena w 24h",
    process: [
      { num: 1, title: "Rozmowa", desc: "Cel, platforma sprzedaży, wytyczne marki" },
      { num: 2, title: "Sesja", desc: "Fotografowanie w studiu z kontrolą światła" },
      { num: 3, title: "Retusz", desc: "Wycięcie z tła, korekta kolorów, białe tło" },
      { num: 4, title: "Dostawa", desc: "Pliki gotowe do użycia w 14 dni" },
    ],
    pricingBlurb:
      "Wycena zależy od liczby produktów, rodzaju ujęć (packshot na białym tle albo zdjęcia kreatywne z aranżacją) oraz pola eksploatacji: inaczej wyceniam zdjęcia na social media, inaczej do druku i outdooru. Większe zamówienia rozliczam progresywnie.",
    priceFaqQuestion: "Ile kosztuje packshot i sesja produktowa?",
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
    // Artech mimo filmu z hali produkcyjnej należy tu, nie do przemysłu:
    // wszystkie dziewięć kadrów w jego galerii to packshoty na białym tle.
    // Sam film (`ivvZQ5lQ7FE`) stoi dalej jako przykład wideo na podstronie
    // nieruchomości i przemysłu. Dwa materiały tego samego klienta, dwa
    // zastosowania, świadomie zaakceptowane przez Marcina 11.08.2026.
    portfolioSlugs: ["artech-fotografia-produktowa", "packshoty-produktowe"],
    // Nagłówek formularza dla tej usługi (decyzja Marcina 10.08.2026, wariant A).
    // Wcześniej podstrona produktowa otwierała formularz domyślnym „Zacznijmy
    // budować Twój wizerunek", czyli komunikatem o innej usłudze. Krótka forma
    // zamiast „Zaplanujmy zdjęcia": tu nie ma logistyki do ustalania, a zadanie
    // zdjęcia produktowego jest jedno.
    ctaHeading: ["Pokażmy", "Twój produkt"],
    formServiceCode: "produkt",
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
    // DEPRICING 14.08.2026. Historia, bo tłumaczy, czego tu już nie ma:
    // do 10.08 pole mówiło „pakiety od 900 zł netto", a słowo „pakiety" niosło sens,
    // nie ozdobę — sygnalizowało, że kwota kupuje OBIEKT PODSTAWOWY (do 8 ujęć
    // z powietrza), a blok wnętrz jest osobną pozycją. Tę informację przejmuje dziś
    // `pricingBlurb` i blok „Jak powstaje wycena", więc nie ginie razem z kwotą.
    price: "wycena w 24h",
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
      // ⚠ KWOTA ZDJĘTA 14.08.2026 (depricing). To była ostatnia żywa kotwica
      // cenowa w treści FAQ usług: hero mówiłby „wycena w 24h", a trzy ekrany
      // niżej stałoby „od 900 zł netto". Odpowiedź zachowuje zakres, bo o niego
      // pytanie realnie pyta.
      { q: "Potrzebuję tylko ujęć z powietrza, bez wnętrz. Ile to kosztuje?", a: "Tak, same ujęcia z powietrza zamawia się bez bloku wnętrz i wychodzi taniej niż pełna sesja obiektu. W podstawowym zakresie fotografuję bryłę obiektu, plac manewrowy i otoczenie. Kadry z poziomu ziemi, wnętrza i film można dołączyć do realizacji zależnie od potrzeb. Wycenę odsyłam w 24h." },
      { q: "Mamy dwa takie same budynki. Płacę dwa razy?", a: "Nie. Drugi obiekt tego samego typu, fotografowany tego samego dnia, jest wyraźnie tańszy, bo profil korekcji perspektywy jest gotowy z pierwszego i postprodukcja idzie szybciej. Warunek to ten sam dzień zdjęciowy. Osobny wyjazd to pełna stawka plus dojazd." },
      { q: "Czy dron poleci nad naszą halą?", a: "W standardowych lokalizacjach tak, bez dopłat. Mam certyfikat operatora A1/A3 i ubezpieczenie OC. W strefach kontrolowanych, na przykład przy lotnisku albo jednostce wojskowej, koordynację biorę na siebie i sprawdzam ją przed potwierdzeniem daty. Zgoda bywa terminowa, więc warto zgłosić się z wyprzedzeniem." },
      { q: "Kiedy najlepiej fotografować obiekt?", a: "Tuż przed odbiorem albo zaraz po nim. Elewacja jest wtedy czysta, plac jeszcze niezastawiony, a w środku nie ma rzeczy najemcy. Przy budowie, którą chcesz dokumentować w czasie, umawiamy stały punkt i stałą porę." },
      { q: "Fotografujesz też wnętrza biur i lokali?", a: "Tak, jako blok wnętrz do 10 ujęć w jednym obiekcie. Pracuję ze światłem zastanym, żeby wnętrze wyglądało jak w rzeczywistości. Blok można dołożyć do sesji obiektu albo zamówić osobno." },
      { q: "Co jeśli pogoda nie dopisze?", a: "Silny wiatr lub opady uniemożliwiają bezpieczny lot. W takiej sytuacji wracam raz w ramach ustalonej kwoty, kolejne podejście to 300 zł plus dojazd." },
      { q: "Na jakim sprzęcie pracujesz?", a: "Dron DJI Mini 5 Pro, 50 Mpix, poniżej 249 g, czyli kategoria otwarta, do tego certyfikat operatora A1/A3 i ubezpieczenie OC. Z poziomu ziemi Canon R6 na statywie, obiektywy szerokie do wnętrz i elewacji." },
    ],
    // Nagłówek formularza dla tej usługi (decyzja Marcina 10.08.2026, wariant B).
    // „Zaplanujmy" zamiast „Pokażmy", bo ta usługa ma realną logistykę do
    // ustalenia: dostęp do obiektu, zgoda na drona, dzień zdjęciowy. Ta sama
    // konstrukcja co przy eventach, więc nagłówki tworzą rodzinę, a nie cztery
    // niezależne hasła.
    ctaHeading: ["Zaplanujmy zdjęcia", "Twojego obiektu"],
    formServiceCode: "obiekty",
    // Jedyna usługa, która nie miała żadnej realizacji w tym polu (audyt F1).
    // Yes Butcher pokrywa ją najlepiej: 7 z 9 kadrów to wnętrza lokalu,
    // do tego budynek z drona. Realizacja jest wielousługowa (wyniki mówią
    // „4 rodzaje zdjęć: dron, wnętrza, portrety, produkt"), więc przypisanie
    // jest decyzją Marcina z 11.08.2026, nie wnioskiem z samego sluga.
    //
    // ARTECH DOPISANY 11.08.2026 (audyt kompletności usługa ↔ case study, wariant A,
    // decyzja Marcina). Powód, sprawdzony w renderze tej podstrony: stoi na niej film
    // `ivvZQ5lQ7FE`, czyli „Artech Group: film z hali produkcyjnej", i pada nazwa Artech
    // w treści, ale blok realizacji prowadził wyłącznie do steakhouse'u. Usługa nazywa
    // się „nieruchomości i PRZEMYSŁ", a jedynym dowodem przemysłowym był film bez
    // przejścia do swojego case study.
    //
    // ⚠ `serviceLink` Artechu ZOSTAJE na `/uslugi/fotografia-produktowa` i to nie jest
    // niekonsekwencja. `portfolioSlugs` jest tablicą, więc jedna realizacja może stać
    // w blokach kilku usług, natomiast `serviceLink` wskazuje JEDNĄ usługę wiodącą,
    // a dla Artechu wiodące są packshoty, nie hala. Kierunek case study → usługa
    // pozostaje jednoznaczny.
    //
    // Kolejność: Yes Butcher pierwszy, bo to realizacja z gwiazdką Michelin i najsilniejszy
    // dowód w portfolio. Artech drugi, jako uzupełnienie o wątek przemysłowy.
    portfolioSlugs: ["yes-butcher-przewodnik-michelin", "artech-fotografia-produktowa"],
    seo: {
      // PRZEPISANY 11.08.2026 (audyt F5, wariant Marcina). Poprzedni brzmiał
      // „Fotografia nieruchomości i przemysłu" i jako JEDYNY z czterech tytułów
      // usług gubił wideo, mimo że ta podstrona ma sekcję „Przykładowa
      // realizacja wideo" z filmem z hali Artechu, a H1 mówi „Fotografia i wideo".
      //
      // Fraza przesunięta na początek, bo to ona niesie pozycje. Dwukropek
      // zamiast drugiego „i": wariant „Fotografia i wideo nieruchomości
      // i przemysłu" ma 63 znaki i podwójny spójnik, odrzucony przez Marcina.
      // „foto" jest słownikiem strony („foto + wideo", „foto-wideo eventu").
      title: "Nieruchomości i przemysł: foto i wideo, Poznań | Szabunia",
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

// Pytanie cenowe budowane z danych usługi, nie hardkodowane per usługa —
// zmiana `pricingBlurb` aktualizuje FAQ wszędzie naraz (brief-22 zad. 4).
//
// ⚠ PRZEBUDOWANE 14.08.2026 (depricing). Wcześniej szablon brzmiał
// `{priceFaqIntro} {price}{priceFaqSuffix}. {pricingBlurb} {zamknięcie}`,
// czyli kwota była gramatycznym środkiem pierwszego zdania. Po zdjęciu kwoty
// z `price` sama podmiana wartości dałaby „Reportaże zaczynają się wycena
// w 24h." w widocznym FAQ ORAZ w JSON-LD typu FAQPage, czyli w danych, które
// czyta Google. Dlatego generator przestał czytać `price`, a nie tylko dostał
// inną kwotę.
//
// Odpowiedź niesie teraz to, co realnie odpowiada na pytanie „ile to kosztuje"
// bez podawania liczby: od czego cena zależy (`pricingBlurb`) i kiedy klient
// ją dostanie (`PRICE_FAQ_CLOSING`).
export function getPriceFaq(service: ServiceData): FAQItem {
  return {
    q: service.priceFaqQuestion,
    a: `${service.pricingBlurb} ${PRICE_FAQ_CLOSING}`,
  };
}

// ⛔ MAPA `SERVICE_TILE_IMAGES` USUNIĘTA 10.08.2026.
//
// Reguła Marcina, podana wprost: „mają być jedne zdjęcia". Każda usługa ma
// JEDEN plik, pokazywany i w hero podstrony, i na kafelku (strona główna
// oraz `/uslugi`). Kafelek nie ma własnej listy: bierze `heroImage` tej samej
// usługi (patrz `serviceItems` niżej).
//
// Dlaczego przez wyprowadzenie, a nie przez wpisanie tych samych ścieżek dwa razy:
// przez cały 10.08.2026 dwie niezależne listy rozjeżdżały się w tę i z powrotem.
// Przy jednym źródle rozjazd jest niemożliwy.
//
// ⚠ To ODWRACA regułę „hero i kafelek muszą być różne" (finding UXUI2608-04).
// Tamta reguła NIE OBOWIĄZUJE. Identyczne zdjęcie na kafelku i w hero to stan
// docelowy, nie duplikat. Nie zgłaszać go jako błędu.
//
// ⚠ KADROWANIE JEST OSOBNE i musi takie zostać: hero to KWADRAT, a kafelek
// jest POZIOMY (16:9 na mobile, 3:2 na desktopie). Ten sam plik potrzebuje
// więc dwóch różnych `object-position`, stąd `heroImagePos` przy usłudze
// i `SERVICE_TILE_POS` niżej. Nie scalać tych dwóch map.

// Punkt kadrowania miniatury (object-position). Kafelek jest POZIOMY (3:2 na
// sm+, 16:9 na mobile), a dwa nowe pliki są PIONOWE, więc bez tych wartości
// kadr ucinałby to, co w zdjęciu najważniejsze.
const SERVICE_TILE_POS: Record<string, string> = {
  // ⚠ TE WARTOŚCI SĄ STROJONE POD KONKRETNE PLIKI z `SERVICE_TILE_IMAGES`.
  // Podmiana zdjęcia na kafelku BEZ sprawdzenia kadru zepsuje kompozycję:
  // kafelek jest poziomy (zmierzone 356×200 px na mobile, 562×375 na desktopie),
  // a pliki portretowe i produktowe są pionowe 1536×1920, więc widać tylko
  // 45% wysokości kadru na mobile. Sprawdzać wycinkiem, nie na oko.

  // `portret-02-kobieta-z-laptopem`: twarz i laptop w górnej części pionowego kadru.
  "wizerunek-portrety": "center 25%",
  // `produkt-01-toast-belvedere`: kieliszki i butelka w środkowo-dolnej części;
  // góra to ciemne tło lokalu.
  "fotografia-produktowa": "center 45%",
  // ⚠ OPIS POPRAWIONY 11.08.2026 (F1). Mówił „auta i grupa w dolnych dwóch
  // trzecich, góra to niebo" i opisywał `event-02-zdjecie-grupowe-tor`, czyli
  // plik, którego tu już nie ma. WARTOŚĆ ZOSTAJE BEZ ZMIAN, bo sprawdzona na
  // renderze po podmianie kadru: przy `event-12-za-kierownica-auta` te 62%
  // ścinają dach auta i niebo, a zostawiają twarz, identyfikator i firmową
  // koszulkę w całości.
  //
  // Istotne wyłącznie na mobile, gdzie kafelek jest 16:9 (zmierzone 326×183 px
  // przy 360 px okna). Na sm+ kafelek ma 562×375 px, czyli dokładnie 3:2, tyle
  // co plik, więc `object-position` nie ma tam żadnego wpływu.
  "eventy-reportaze": "center 62%",
};

export const serviceItems = serviceCategories.map((s) => ({
  slug: s.slug,
  title: s.title,
  icon: s.icon,
  desc: s.subtitle,
  /* ⛔ `price` i `priceLabel` USUNIĘTE Z `serviceItems` 14.08.2026, razem ze zdjęciem
     etykiety „wycena w 24h" z kafelka na stronie głównej.

     Oba istniały wyłącznie dla tego jednego kafelka. `serviceItems` czyta tylko
     `Services.tsx`, a on po tej zmianie sięga po `slug`, `title`, `icon`, `desc`,
     `image` i `imagePos`. Zostawienie ich tutaj dałoby dokładnie ten sam martwy
     dług, który audyt 11.08.2026 znalazł przy `portfolioSlug`.

     ⚠ To NIE dotyczy `price` ani `heroPriceLabel` w `ServiceData` — tamte żyją
     i zasilają `/uslugi` (który importuje `serviceCategories`, nie `serviceItems`)
     oraz hero podstrony usługi przez `ServiceHero.tsx`. */
  /** Kafelek pokazuje DOKŁADNIE ten sam plik co hero podstrony (reguła Marcina
      z 10.08.2026: „mają być jedne zdjęcia"). Jedno źródło, więc obie powierzchnie
      nie mogą się rozjechać. Kadrowanie zostaje osobne, bo kontenery mają inne
      proporcje: `heroImagePos` dla kwadratu, `SERVICE_TILE_POS` dla poziomego kafelka. */
  image: s.heroImage,
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
