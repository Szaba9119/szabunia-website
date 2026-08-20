import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import SecondaryLink from "./SecondaryLink";
import ServiceGalleryLightbox from "./ServiceGalleryLightbox";
import ServiceVideoGrid from "./ServiceVideoGrid";
import { listGalleryImages, type GalleryCategoryKey } from "@/lib/galleryImages";
import { GALLERY_ALTS, imageKey } from "@/data/galleryAlts";
import { galleryVideos } from "@/data/galeria";

const META: Record<GalleryCategoryKey, { label: string; sub: string; alt: string }> = {
  portrety: {
    label: "Przykłady z galerii: portrety",
    sub: "Wybrane portrety biznesowe i headshoty z moich realizacji.",
    alt: "Portret biznesowy, Marcin Szabunia, Poznań",
  },
  eventy: {
    label: "Przykłady z galerii: eventy",
    // ZDJ2608-05b (04.08.2026, decyzja Marcina): eventy to także integracje i imprezy
    // firmowe. Obejrzane 15 z 15 kadrów w folderze: 3 konferencje i gale, 4 integracje
    // i pikniki, 6 koncertów i klubów, 2 pozostałe. Zestaw kadrów zostaje, podpis się
    // poszerza, żeby obietnica pokrywała to, co widać.
    sub: "Wybrane kadry z konferencji, gal, integracji i imprez firmowych.",
    alt: "Fotografia eventowa, Marcin Szabunia, Poznań",
  },
  produktowe: {
    label: "Przykłady z galerii: produktowe",
    sub: "Wybrane packshoty i zdjęcia produktów z realizacji e-commerce.",
    alt: "Fotografia produktowa, packshot, Marcin Szabunia",
  },
  // Wpis wymagany przez typ (META jest Record<GalleryCategoryKey, …>), ale dziś nieużywany:
  // żadna usługa nie ma `galleryCategory: "gastronomia"`, bo podstrona usługi gastronomicznej
  // nie istnieje. Wejdzie do gry dopiero razem z decyzją o otwarciu tej usługi.
  gastronomia: {
    label: "Przykłady z galerii: gastronomia",
    sub: "Dania, bary i wnętrza lokali z realizacji dla gastronomii.",
    alt: "Fotografia kulinarna i gastronomiczna, Marcin Szabunia, Poznań",
  },
  wideo: {
    label: "Przykłady z galerii: wideo",
    sub: "Wybrane realizacje wideo i reelsy.",
    alt: "Realizacja wideo, Marcin Szabunia",
  },
  "wideo-produktowe": {
    label: "Przykłady z galerii: wideo produktowe",
    sub: "Pionowe reelsy i krótkie reklamy produktu, kręcone dla marek i lokali.",
    alt: "Wideo produktowe i reels, Marcin Szabunia",
  },
  dron: {
    label: "Przykłady z galerii: zdjęcia z drona",
    sub: "Wybrane kadry z powietrza: biurowce, osiedla i inwestycje w Poznaniu.",
    alt: "Zdjęcia z drona, Poznań, Marcin Szabunia",
  },
  obiekty: {
    label: "Przykłady z galerii: obiekty i architektura",
    sub: "Budynki, osiedla i inwestycje w Poznaniu, fotografowane z powietrza.",
    alt: "Fotografia obiektu i architektury, Marcin Szabunia, Poznań",
  },
  wnetrza: {
    label: "Przykłady z galerii: wnętrza i hale",
    sub: "Hale, lokale użytkowe i wnętrza obiektów, fotografowane ze światłem zastanym.",
    alt: "Fotografia wnętrza obiektu, hala i lokal użytkowy, Marcin Szabunia, Poznań",
  },
  zespolowe: {
    label: "Przykłady z sesji zespołowej",
    sub: "Ten sam standard światła i retuszu, trzy tła: białe, czarne z niebieskim światłem i kremowe. Realizacja dla IDcom Group.",
    alt: "Headshot z sesji zespołowej dla IDcom Group, Marcin Szabunia",
  },
};

// Wyselekcjonowane najlepsze 6 kadrów per kategoria (zamiast pierwszych z
// brzegu). Dobrane pod B2B: różnorodność i jakość. Reszta kategorii → fallback.
const CURATED: Partial<Record<GalleryCategoryKey, string[]>> = {
  // `portret-26-kobieta-czarna-marynarka` (do 20.08.2026 `portret-07`) wypadł 04.08.2026: to ta sama
  // osoba w tej samej marynarce co `_F2A9376-Edit-2` z sesji IDcom, więc na podstronie
  // sesji zespołowych ta sama twarz wychodziła dwa razy, raz w każdym pasku (Marcin).
  // Nazwy plików dostały opis 04.08.2026 (ZDJ2608-01), numery NN bez zmian, więc
  // kolejność i skład tej listy są takie same jak przed zmianą nazw.
  portrety: [
    "portret-29-kobieta-w-plenerze",
    "portret-10-mezczyzna-czarne-tlo",
    "portret-12-kobieta-bezowa-marynarka",
    "portret-23-mezczyzna-w-fotelu",
    "portret-18-mezczyzna-zielony-garnitur",
    "portret-04-kobieta-morski-kombinezon",
  ].map(
    (n) => `/images/galeria/portrety/${n}.jpg`
  ),
  // Nazwy plików dostały opis 04.08.2026 (ZDJ2608-01), numery NN bez zmian, więc skład
  // i kolejność tej listy są identyczne jak przed zmianą nazw.
  eventy: [
    // SKŁAD I KOLEJNOŚĆ PRZEBUDOWANE 10.08.2026 (decyzja Marcina po audycie kadrów).
    //
    // Powód: wszystkie 15 kadrów w folderze obejrzano jeden po drugim i zestawiono
    // z listą `applications.items` na `/uslugi/eventy-reportaze` („Konferencje
    // i kongresy, Gale i jubileusze, Targi i stoiska..."). Poprzednia szóstka miała
    // JEDEN kadr jednoznacznie firmowy (networking w foyer), a otwierała się
    // koncertem: raper w dresie na scenie areny. Dwa z sześciu kafelków to byli
    // DJ-e, w tym jeden na festiwalu z pirotechniką.
    //
    // WYSZŁY: `event-21-dj-za-konsoleta` i `event-05-dj-slupy-ognia` (klub i festiwal).
    // WESZŁY: `event-20-gala-wreczenie-wyroznien` (gala, wręczenie wyróżnień,
    //   branding klienta w kadrze) i `event-08-integracja-przybicie-piatki`
    //   (integracja firmowa, koszulki z identyfikatorami, ten sam event co hero).
    //
    // KOLEJNOŚĆ jest teraz od najbardziej firmowego kadru do rozrywkowego, bo
    // pierwszy kafelek to jedyny, który klient widzi na pewno. Jeden kadr sceniczny
    // (`event-09-wystep-na-scenie-hali`) zostaje świadomie na końcu: oprawa artystyczna gali to realna
    // część tej pracy i udawanie, że jej nie ma, byłoby nieuczciwe wobec zakresu.
    //
    // ⚠ `event-20-gala-wreczenie-wyroznien` NIE BYŁO OSIEROCONE, wbrew temu, co mówił poprzedni komentarz
    // w tym miejscu. Wypadło stąd rano 10.08 (UXUI2608-04), bo zostało wtedy hero
    // tej podstrony, a hero i pas renderują się na jednym ekranie. Po południu
    // commit `401329f` zmienił hero na `event-03-zdjecie-grupowe-tor`, więc powód
    // wykluczenia zniknął, ale kadr nie wrócił. Przez cały ten czas był i jest
    // renderowany w galerii case study `fotografia-eventowa` (`portfolio.ts`),
    // więc chodziło o nieobecność na TEJ stronie, nie w całym serwisie.
    //
    // ⚠ ZNANA LUKA, której ta zmiana NIE naprawia: w `public/images` nie ma ani
    // jednego kadru z prelegentem, salą konferencyjną ani stoiskiem targowym
    // (sprawdzone przeszukaniem całego katalogu 10.08.2026). Lista „Dla jakich
    // wydarzeń" obiecuje osiem typów, portfolio pokrywa cztery. Marcin potwierdził,
    // że takiego materiału nie ma. To brak materiału, nie doboru: przetasowanie
    // tej listy go nie zamknie.
    "event-02-networking-foyer",
    "event-20-gala-wreczenie-wyroznien",
    "event-08-integracja-przybicie-piatki",
    "event-16-goscie-przy-stole",
    "event-24-saksofonista-bankiet",
    "event-09-wystep-na-scenie-hali",
  ].map(
    (n) => `/images/galeria/eventy/${n}.jpg`
  ),
  produktowe: [
    "produkt-13-toast-belvedere", // toast kieliszkami wódki
    "produkt-08-volvo-las", // auto w środku lasu
    "produkt-35-danie-talerz", // danie z fasolką na białym talerzu
    "produkt-10-bransoletka-dlon", // bransoletka na dłoni
    "produkt-17-sukienka-zolta", // kobieta w żółtej sukience
    "produkt-06-hob-koszulki", // koszulka na ciemnym tle
    "produkt-19-pedzelek", // patyczek do makijażu
    "produkt-01-caprice", // grejfrutowy koktajl / alkohol
  ].map((n) => `/images/galeria/produktowe/${n}.jpg`),
  // 6 różnych obiektów (bez powtórki tego samego budynku, np. Bałtyk z dwóch stron).
  dron: [
    "dron-01-centrum-poznania-biurowce",
    "dron-04-nowoczesny-budynek-poznan",
    "dron-06-nowoczesne-osiedle-poznan",
    "dron-03-apartamenty-nad-rzeka-poznan",
    "dron-09-osiedle-mieszkaniowe-poznan",
    "dron-05-panorama-poznania-zachod-slonca",
  ].map((n) => `/images/galeria/dron/${n}.jpg`),
  // Te same pliki co w galerii dronowej: siedem z dziewięciu kadrów w folderze `dron`
  // to budynki i inwestycje, nie tereny. Wskazujemy je stąd zamiast kopiować pliki:
  // jeden plik na dysku, dwa konteksty użycia. Poza listą świadomie zostają dwa kadry,
  // które terenem są: panorama miasta (`dron-05`) i jarmark z nadiru (`dron-02`).
  //
  // ⚠ AKTUALIZACJA 20.08.2026. Było „osiem z dziewięciu" i było prawdą przy innym
  // składzie folderu. Tego dnia kuracja Marcina zabrała z dronów trzy kadry, które
  // w numeracji bezpośrednio sprzed kuracji nazywały się `dron-03-slonce-wpada-dokladnie`
  // (nowoczesny kompleks biurowy), `dron-08-kamienica-helmem-ciemna` i
  // `dron-12-wiezowiec-biurowy-poznan`. Pierwsza pozycja tej listy wskazywała
  // na ostatni z nich, więc wstawiony został `dron-04-nowoczesny-budynek-poznan`,
  // najbliższy charakterem obiekt komercyjny z tego, co zostało.
  //
  // ⚠ SKUTEK DO ODNOTOWANIA, nie do naprawienia tutaj: po tej kuracji galeria dronowa
  // pokazuje głównie zabudowę mieszkaniową i osiedla. Czystym biurowcem jest już tylko
  // `dron-01-centrum-poznania-biurowce`, a `dron-08-biurowiec-poznan` ma balkony na
  // każdej kondygnacji, czyli nazwa mówi „biurowiec", a kadr pokazuje budynek mieszkalny
  // (ten sam rozjazd opisany jest w nagłówku `galleryAlts.ts`). Jeżeli podstrona
  // nieruchomościowa ma sprzedawać obiekty komercyjne, brakuje materiału, nie doboru.
  obiekty: [
    "dron-04-nowoczesny-budynek-poznan",
    "dron-08-biurowiec-poznan",
    "dron-07-inwestycja-tereny-zielone-poznan",
    "dron-01-centrum-poznania-biurowce",
    "dron-03-apartamenty-nad-rzeka-poznan",
    "dron-06-nowoczesne-osiedle-poznan",
  ].map((n) => `/images/galeria/dron/${n}.jpg`),
  // Kolejność ustawiona jawnie 10.08.2026 (decyzja Marcina: „przemysł pierwszy").
  // Wcześniej pasek brał pliki alfabetycznie z folderu i wychodziło poprawnie
  // TYLKO dlatego, że hale mają numery 01-03. Przy pierwszym przenumerowaniu
  // folderu klient szukający fotografa hali zobaczyłby najpierw osiedla.
  //
  // Zasada: dwa pierwsze kadry to hala, dopiero potem obiekty komercyjne,
  // gastronomia i biuro. NIE udajemy proporcji 50/50, bo portfolio jest realnie
  // mocniejsze po stronie nieruchomości. Chodzi o pierwszy sygnał: „tak,
  // fotografuję również takie obiekty".
  //
  // Siedem pozycji, nie sześć: `wnetrze-10-hala-bramki-wejsciowe` jest zdjęciem hero tej podstrony,
  // więc filtr `exclude` je wytnie i zostanie równo sześć na pasek.
  wnetrza: [
    "wnetrze-03-hala-magazynowa-regaly",
    "wnetrze-07-hala-strefa-kompletacji",
    "wnetrze-10-hala-bramki-wejsciowe",
    "wnetrze-01-elewacja-szklana-fasada",
    "wnetrze-21-restauracja-ceglana-sciana",
    "wnetrze-14-bistro-z-antresoli",
    "wnetrze-16-silownia-w-biurze",
  ].map((n) => `/images/galeria/wnetrza/${n}.jpg`),
  // Sesja dla IDcom: po kolei trzy tła (białe, czarne z niebieskim, kremowe), jedna osoba na kadr.
  zespolowe: [
    "/images/portfolio/idcom/_F2A9424-Edit-2.jpg", // 1. białe tło
    "/images/portfolio/idcom/_F0I9883-Edit-2.jpg", // 2. kremowe tło
    "/images/portfolio/idcom/_F2A9229-Edit-2.jpg", // 3. czarne tło, niebieskie światło
    "/images/portfolio/idcom/_F2A9433-Edit-2.jpg", // 4. białe tło
    "/images/portfolio/idcom/_F2A9376-Edit-2.jpg", // 5. kremowe tło
    "/images/portfolio/idcom/_F2A9264-Edit-2.jpg", // 6. czarne tło, niebieskie światło
  ],
};

// Kategorie oparte na filmach, nie na plikach z dysku.
const VIDEO_CATEGORIES: GalleryCategoryKey[] = ["wideo", "wideo-produktowe"];

// Kolejność filmów w pasku produktowym ustawiona przez Marcina 04.08.2026:
// najpierw pizzeria, potem śniadaniownia, na końcu reklama kamerki.
// Bez tej listy pasek brał pierwsze cztery pozycje z galleryVideos, czyli
// film z eventu i film z hali produkcyjnej.
const CURATED_VIDEOS: Partial<Record<GalleryCategoryKey, string[]>> = {
  // Podstrona „Wideo dla firm”. Wcześniej pasek brał pierwsze cztery pozycje
  // z galleryVideos, przez co na stronie o filmach korporacyjnych stała
  // zapowiedź imprezy w Klubie 58. Zestaw ułożony pod to, co ta podstrona
  // sprzedaje: event firmowy, film o zakładzie, reklama produktu, krótka forma.
  wideo: [
    "m42ywMWjthw", // Film eventowy dla Woohoo
    "hLO5iInREaI", // Film z produkcji dla Artech Group
    "CmHUCptLu90", // Reklama kamerki samochodowej 70mai
    "xByfmDzNPMI", // Reels dla śniadaniowni Sunday
  ],
  // Kolejność 10.08.2026 (decyzja Marcina): najpierw produkt techniczny, potem
  // drugi produkt, dopiero na końcu gastronomia. Klient szukający fotografa
  // produktowego ma zobaczyć produkt, a nie dwa reelsy z jedzeniem.
  // Film Box17 USUNIĘTY 10.08.2026 (decyzja Marcina). Zostają trzy pozycje.
  "wideo-produktowe": [
    "CmHUCptLu90", // Reklama kamerki samochodowej 70mai
    "fRoffxZ1tVM", // Reels dla Pizzerii Sicilia Marco Giuliano
    "xByfmDzNPMI", // Reels dla śniadaniowni Sunday
  ],
};

// Kategorie bez własnej zakładki na /galeria muszą prowadzić tam, gdzie
// te materiały faktycznie są, inaczej przycisk trafia na pustą galerię.
const GALLERY_TAB: Partial<Record<GalleryCategoryKey, string>> = {
  obiekty: "dron",
  "wideo-produktowe": "wideo",
};

export default function ServiceGalleryStrip({
  category,
  ctaLabel: ctaLabelProp,
  href: hrefProp,
  sub: subProp,
  exclude,
  secondaryLink,
}: {
  category: GalleryCategoryKey;
  ctaLabel?: string;
  href?: string;
  /** ZDJ2608-27: ścieżka kadru do pominięcia w pasku (zwykle `service.heroImage`). */
  exclude?: string;
  /** Nadpisuje domyślny podtytuł paska. Używane, gdy pasek stoi na obcej
      podstronie i musi tłumaczyć, po co tam jest (np. sesja zespołowa
      na podstronie eventowej). */
  sub?: string;
  /** Poboczny odsyłacz pod przyciskiem paska — przejście na sąsiednią usługę.
      Renderowany jako link tekstowy, żeby nie tworzyć drugiego przycisku
      obok głównego CTA (10.08.2026). */
  secondaryLink?: { label: string; href: string };
}) {
  const meta = META[category];
  // `obiekty` nie ma własnego folderu w public/images/galeria, bo korzysta z plików
  // kategorii `dron` (patrz CURATED). Link „zobacz więcej" musi prowadzić tam, gdzie
  // te zdjęcia faktycznie są, inaczej trafia na pustą filtrowaną galerię.
  const href =
    hrefProp ??
    (category === "zespolowe"
      ? "/portfolio/idcom-headshoty-zespolu"
      : `/galeria?kat=${GALLERY_TAB[category] ?? category}`);

  // Kategoria `zespolowe` prowadzi do case study, nie do filtrowanej galerii,
  // więc przycisk nie może obiecywać galerii. `obiekty` prowadzi do zakładki
  // „Zdjęcia z drona" (patrz `href` wyżej), więc też nie może mówić „cała galeria" —
  // klient kliknąłby po wnętrza, a trafiłby na ujęcia lotnicze.
  const ctaLabel =
    ctaLabelProp ??
    (category === "zespolowe"
      ? "Zobacz całą realizację"
      : category === "obiekty"
      ? "Zobacz obiekty z powietrza"
      : "Zobacz całą galerię");

  if (VIDEO_CATEGORIES.includes(category)) {
    const ids = CURATED_VIDEOS[category];
    const vids = ids
      ? ids.map((id) => galleryVideos.find((v) => v.youtubeId === id)).filter((v) => !!v)
      : galleryVideos.slice(0, 4);
    if (vids.length === 0) return null;
    return (
      <Shell label={meta.label} sub={subProp ?? meta.sub} href={href} ctaLabel={ctaLabel} prominentSub={!!subProp} secondaryLink={secondaryLink}>
        <ServiceVideoGrid
          videos={vids.map((v) => ({ youtubeId: v.youtubeId, title: v.title, vertical: v.vertical }))}
          gridClass={
            vids.length === 3
              ? "grid grid-cols-1 sm:grid-cols-3 gap-2.5"
              : "grid grid-cols-2 sm:grid-cols-4 gap-2.5"
          }
        />
      </Shell>
    );
  }

  // ⚠ PASEK PRODUKTOWY JEST ŚWIADOMIE WIĘKSZY OD POZOSTAŁYCH (zapisane 11.08.2026,
  // audyt końcowy UI, finding F2, decyzja Marcina: układ zostaje, brakowało uzasadnienia).
  //
  // Osiem kafli w czterech kolumnach zamiast sześciu w sześciu (patrz `gridClass`
  // niżej i `aspectClass` przy `ServiceGalleryLightbox`). Zmierzone przy 1440 px:
  // kafel produktowy ma ~248 px, pozostałe ~162 px, a cała sekcja 799 px wysokości
  // wobec 414-470 px na trzech innych podstronach.
  //
  // Powód jest w tym, co pokazuje zdjęcie. Packshot to pojedynczy przedmiot na
  // jednolitym tle i ocenia się go po detalu: ostrości krawędzi, czystości wycięcia
  // i odwzorowaniu koloru. Przy 162 px nie widać żadnej z tych rzeczy, a to one są
  // produktem tej usługi. Kadr eventowy albo wnętrze czyta się przy 162 px bez
  // problemu, bo niesie scenę, nie detal. Dwie kolumny mniej kupują 53% więcej
  // szerokości kafla.
  //
  // Skutkiem ubocznym jest to, że ta jedna podstrona ma wyraźnie wyższy blok
  // przykładów. To jest przyjęte, nie przeoczone. Nie ujednolicać do 6/6 bez
  // decyzji Marcina.
  const limit = category === "produktowe" ? 8 : 6;
  const pool = CURATED[category] ?? listGalleryImages(category);
  // ZDJ2608-27 (04.08.2026): hero podstrony nie może wracać w pasku tej samej podstrony.
  // Bez tego na trzech podstronach ten sam kadr stał trzy razy w jednym przewinięciu:
  // kafelek, hero i pasek. Filtr wchodzi TYLKO wtedy, gdy po odjęciu hero zostaje
  // dość kadrów na pełny pasek. Listy CURATED mają dokładnie tyle pozycji, ile pasek
  // pokazuje, więc dla `eventy` i `portrety` filtr skróciłby pasek z 6 na 5, a dobranie
  // siódmego kadru to zmiana ręcznie ułożonej listy Marcina, czyli osobna decyzja.
  const filtered = exclude ? pool.filter((src) => src !== exclude) : pool;
  const images = (filtered.length >= limit ? filtered : pool).slice(0, limit);
  if (images.length === 0) return null;

  return (
    <Shell label={meta.label} sub={subProp ?? meta.sub} href={href} ctaLabel={ctaLabel} prominentSub={!!subProp} secondaryLink={secondaryLink}>
      <ServiceGalleryLightbox
        images={images}
        altBase={meta.alt}
        /* ZDJ2608-12 (04.08.2026): opis bierze się z pliku, nie z pozycji w pasku.
           Ten sam kadr ma ten sam opis w `/galeria` i tutaj, bo obie powierzchnie
           czytają `GALLERY_ALTS`. Kategoria bez wpisów (dziś `produktowe`) dostaje
           `altBase`, czyli opis kategorii, ale już bez doklejanego numeru. */
        alts={images.map((src) => GALLERY_ALTS[imageKey(src)])}
        aspectClass={
          category === "portrety" || category === "zespolowe"
            ? "aspect-[3/4]"
            : category === "eventy" || category === "dron" || category === "obiekty" || category === "wnetrza"
            ? "aspect-[4/3]"
            : "aspect-square"
        }
        thumbPosition={category === "portrety" || category === "zespolowe" ? "center 20%" : "center"}
        /* Siatka 2/4 kolumny dla produktowej, 3/6 dla reszty. Uzasadnienie stoi
           przy `limit` wyżej: packshot ocenia się po detalu, więc kafel musi być
           większy. Te dwie liczby chodzą w parze z `limit` (8 kafli w 4 kolumnach
           daje pełne dwa rzędy, 6 w 6 daje jeden). Zmiana jednej bez drugiej
           zostawia niepełny rząd. */
        gridClass={
          category === "produktowe"
            ? "grid grid-cols-2 sm:grid-cols-4 gap-2.5"
            : "grid grid-cols-3 sm:grid-cols-6 gap-2.5"
        }
        /* ZDJ2608-07 (04.08.2026): `sizes` policzone z siatki I z kontenera, potem
           ZMIERZONE w przeglądarce na 390, 900 i 1728 px przy DPR 2 (localhost, dev).
           Pasek siedzi w `max-w-5xl mx-auto` (Shell niżej), czyli 1056 px minus padding.
           Zmierzone szerokości kafla: produktowa 174 / 210 / 249 px, reszta 113 / 136 / 162 px.
           Ostatni człon MUSI być w pikselach, bo powyżej ~1056 px kafelki przestają rosnąć.

           Wartości są o kilka procent NIŻSZE od zmierzonych i to jest celowe. Next generuje
           kandydatów tylko z siatki 128 / 256 / 384 / 640 px, więc deklaracja większa o jeden
           piksel przeskakuje na kolejnego kandydata i każe pobrać obraz 1,5 do 1,8 razy
           szerszy, niż potrzeba. Przy tych liczbach każdy kafel mieści się w paśmie
           0,85 <= pobrane / (CSS x DPR) <= 1,4 na wszystkich trzech szerokościach. */
        sizes={
          category === "produktowe"
            ? "(max-width: 640px) 45vw, (max-width: 1056px) 21vw, 250px"
            : "(max-width: 640px) 32vw, (max-width: 1056px) 14vw, 165px"
        }
      />
    </Shell>
  );
}

function Shell({
  label,
  sub,
  href,
  ctaLabel = "Zobacz całą galerię",
  prominentSub = false,
  secondaryLink,
  children,
}: {
  label: string;
  sub: string;
  href: string;
  ctaLabel?: string;
  /** Podtytuł pochodzi z podstrony, nie z META — renderuj go jak zdanie, nie jak podpis. */
  prominentSub?: boolean;
  secondaryLink?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          {/* WYŚRODKOWANE 10.08.2026 (decyzja Marcina). Ten blok jako jedyny na
              podstronie usługi dziedziczył domyślne wyrównanie do lewej, a że pasek
              renderuje się DWA RAZY i między nimi stoi wyśrodkowana „Przykładowa
              realizacja wideo", użytkownik schodząc w dół dostawał lewa → środek → lewa.
              To nigdy nie było decyzją projektową: w tym pliku są zapisane ustalenia
              o rozmiarze podtytułu (04.08) i pozycji przycisku (03.08), o wyrównaniu
              nie ma ani słowa. Jeden system dla wszystkich sekcji treści. */}
          <div className="mb-6 text-center">
            <h2 className="font-barlow font-extrabold text-2xl md:text-3xl tracking-tight text-navy dark:text-white">
              {label}
            </h2>
            {/* Podtytuł nadpisany z podstrony niesie argument sprzedażowy, a nie opis
                kategorii, więc dostaje wagę zdania, nie szarej linijki pod nagłówkiem
                (Marcin 04.08.2026: „chciałbym, żeby to zdanie bardziej wybrzmiało"). */}
            {prominentSub ? (
              // Ten sam rozmiar i kolor co podpis pod „Przykładowa realizacja wideo"
              // (15 px, steel), żeby na jednej podstronie nie było dwóch różnych
              // formatowań tego samego rodzaju zdania. Wyróżnia go tylko oddech:
              // szersza interlinia i węższa kolumna (Marcin, 04.08.2026).
              // `mx-auto` dołożone razem z wyśrodkowaniem bloku: `max-w-2xl` ogranicza
              // szerokość, więc bez tego sam tekst byłby wyśrodkowany, a kolumna nadal
              // dosunięta do lewej krawędzi kontenera.
              <p className="text-steel dark:text-dark-text-muted text-[15px] leading-relaxed mt-2 max-w-2xl mx-auto">
                {sub}
              </p>
            ) : (
              <p className="text-steel dark:text-dark-text-muted text-[14px] mt-1">{sub}</p>
            )}
          </div>
        </AnimatedSection>
        <AnimatedSection>{children}</AnimatedSection>
        {/* Przycisk pod przykładami, a nie w nagłówku (decyzja Marcina, 03.08.2026):
            po obejrzeniu kadrów, a nie przed. Wariant obrysowany, ten sam co
            „Zapytaj o ofertę" w PortfolioVideoShowcase, żeby nie konkurował
            z głównym CTA kontaktowym na tej samej podstronie. */}
        <AnimatedSection>
          <div className="mt-8 flex justify-center">
            <Link
              href={href}
              className="inline-flex items-center gap-2 border border-border dark:border-dark-border text-navy dark:text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] hover:border-blue hover:text-blue dark:hover:border-blue-light dark:hover:text-blue-light transition-colors"
            >
              {ctaLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          {/* Przejście na sąsiednią usługę albo do case study. Link tekstowy,
              nie drugi przycisk: obok stoi już obrysowany przycisk paska, a niżej
              na tej samej podstronie główne CTA kontaktowe. Trzeci przycisk
              rozmyłby hierarchię, a to jest odsyłacz, nie wezwanie do działania.

              `SecondaryLink` zamiast lokalnych klas, 11.08.2026 (audyt UI,
              finding C5). Ten sam wzorzec żył w czterech plikach w trzech
              odstępach (12, 16 i 20 px) i w dwóch rozmiarach.

              `mt-1`, NIE `mt-4`, i to nie jest literówka. Odsyłacz ma 12 px
              własnego górnego paddingu (cel dotykowy 45 px, WCAG 2.5.8), więc
              4 px marginesu daje 16 px odstępu OPTYCZNEGO od przycisku, czyli
              dokładnie tyle, ile widać było wcześniej. Zmiana `py` w komponencie
              wymaga poprawienia tej liczby. */}
          {secondaryLink && (
            <div className="mt-1 flex justify-center">
              <SecondaryLink href={secondaryLink.href}>{secondaryLink.label}</SecondaryLink>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
