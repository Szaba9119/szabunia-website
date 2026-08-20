/**
 * Opis alternatywny PER PLIK, kluczowany nazwą pliku bez rozszerzenia.
 *
 * Powstało 04.08.2026 (ZDJ2608-04 + ZDJ2608-12). Wcześniej działały dwa różne
 * mechanizmy i oba opisywały pozycję zamiast kadru:
 *  - `/galeria` rotowała listę wariantów przez `i % length`, więc przy 5 wariantach
 *    na 15 kadrów osioł na trawniku dostawał „Fotografia konferencyjna, kadr 7",
 *    a kadr dwuosobowy opis w liczbie pojedynczej;
 *  - pasek „Przykłady z galerii" na podstronach usług sklejał alt jako
 *    `${altBase} ${i + 1}`, czyli „Portret biznesowy, Marcin Szabunia, Poznań 1".
 *
 * Klucz to nazwa pliku, nie indeks, więc zmiana kolejności w galerii albo w liście
 * CURATED nie przestawia opisów. Ten sam plik ma ten sam opis w obu mechanizmach.
 *
 * Opisy dla `eventy`, `portrety` oraz dla kadrów spoza galerii (hero i kafelki usług,
 * realizacje, okładki blogowe) powstały po OBEJRZENIU kadru 04.08.2026, nie z nazwy pliku
 * ani z nagłówka kategorii. Kadry, których nie da się opisać zgodnie z podpisem
 * kategorii (osioł przy jodze, DJ, koncert), są opisane uczciwie: decyzja Marcina
 * z 04.08.2026 mówi wprost, że eventy to także integracje i imprezy firmowe.
 *
 * WYJĄTEK, świadomy: bloki `wnetrza` i `dron` zostały PRZENIESIONE tutaj z
 * `galeria/page.tsx` BEZ ZMIANY TREŚCI, bo ich redakcja nie należy do żadnego ID tej tury.
 * Przy oglądaniu kadrów wyszło, że TRZY z nich rozjeżdżają się z obrazem i czekają na
 * decyzję (opisane w `docs/sesje/POPRAWKI-WDROZONE-2026-08-04.md`, sekcja C, punkt 8):
 * `wnetrze-11` opisany jako biurowiec (to kompleks budynków), `wnetrze-12` jako budynek
 * komercyjny (to budynek mieszkalny), `dron-04` jako biurowiec (ma balkony na każdej
 * kondygnacji). Nazwy plików nadane w ZDJ2608-01 mówią prawdę, opisy jeszcze nie.
 *
 * ⚠ AKTUALIZACJA 20.08.2026, ten akapit czyta się dziś mylnie. Dwa z trzech plików już
 * nie istnieją: ówczesne `wnetrze-11` i `wnetrze-12` wypadły przy sprzątaniu V4
 * (20.08.2026, sprawdzone przez wylistowanie `public/images/galeria/wnetrza/`), a numer
 * `wnetrze-11` nosi dziś ZUPEŁNIE INNY kadr, hala z bramkami wejściowymi. Otwarty
 * zostaje wyłącznie trzeci przypadek, po przenumerowaniu `dron-08-biurowiec-poznan`:
 * nazwa mówi „biurowiec", a budynek ma balkony na każdej kondygnacji.
 *
 * Przy tej samej okazji skasowane zostało SZEŚĆ osieroconych wpisów, czyli opisów
 * dla plików, których już nie ma: `event-07-joga-na-trawie-osiol`,
 * `wnetrze-06-budka-akustyczna-panele`, `wnetrze-10-biurowiec-z-drona`,
 * `wnetrze-11-kompleks-budynkow-z-drona`, `wnetrze-12-budynek-mieszkalny-z-drona`,
 * `dron-12-wiezowiec-biurowy-poznan`. Niczego nie psuły, bo `galleryAlt` szuka klucza
 * od nazwy ISTNIEJĄCEGO pliku, ale sugerowały pokrycie, którego nie ma.
 *
 * Zasady tekstu wg `docs/zasady-tekstow.md`: bez długich myślników, bez fraz
 * z czarnej listy, bez doklejania miasta przecinkiem, liczba mnoga tam, gdzie
 * na kadrze jest więcej niż jedna osoba.
 *
 * Kategorie bez wpisów (dziś: `produktowe`) korzystają dalej ze swojego mechanizmu
 * i czekają na własną rundę.
 */
export const GALLERY_ALTS: Record<string, string> = {
  /* ── eventy (15 z 15 obejrzanych) ── */
  "event-25-zespol-na-scenie":
    "Zespół muzyczny na scenie z ekranem LED, oprawa artystyczna imprezy firmowej",
  "event-03-zdjecie-grupowe-tor":
    "Zdjęcie grupowe uczestników integracji na torze wyścigowym, przed dwoma autami sportowymi",
  "event-08-integracja-przybicie-piatki":
    "Dwaj uczestnicy integracji firmowej przybijają piątkę przy torze",
  "event-20-gala-wreczenie-wyroznien":
    "Wręczenie wyróżnień na gali firmowej, troje nagrodzonych z dyplomami",
  "event-02-networking-foyer":
    "Rozmowa dwóch uczestników konferencji w foyer, w tle kuluary",
  "event-14-przeciaganie-liny-integracja":
    "Przeciąganie liny na pikniku firmowym, uczestnicy w plenerze",
  "event-21-dj-za-konsoleta":
    "DJ przy konsolecie na imprezie firmowej, lampy sceniczne w tle",
  "event-15-parkiet-taneczny":
    "Parkiet taneczny na balu firmowym, goście w strojach wieczorowych",
  "event-18-za-kierownica-auta":
    "Uczestnik integracji za kierownicą sportowego auta na torze",
  "event-22-dj-scena-plenerowa":
    "DJ na scenie plenerowej, w tle strefa gastronomiczna imprezy miejskiej",
  "event-24-saksofonista-bankiet":
    "Saksofonista gra na przyjęciu firmowym, w tle tańcząca para",
  "event-16-goscie-przy-stole":
    "Trzej goście przy stole na bankiecie firmowym, wieczorna część wydarzenia",
  "event-09-wystep-na-scenie-hali":
    "Występ solowy na scenie hali widowiskowej, reflektory i dym sceniczny",
  "event-05-dj-slupy-ognia":
    "DJ przed publicznością, słupy ognia z rampy podczas imprezy",

  /* ── portrety (14 z 14 obejrzanych) ── */
  "portret-25-operator-z-kamera":
    "Operator z kamerą na gimbalu, zdjęcie wizerunkowe na czarnym tle",
  "portret-19-kobieta-z-laptopem":
    "Portret biznesowy kobiety z laptopem, szare tło studyjne",
  "portret-10-mezczyzna-czarne-tlo":
    "Portret mężczyzny z brodą na czarnym tle, sesja wizerunkowa w studiu",
  "portret-28-kobieta-na-hokerze":
    "Kobieta z laptopem na hokerze, portret całej sylwetki w studiu",
  "portret-18-mezczyzna-zielony-garnitur":
    "Mężczyzna w zielonym garniturze na krześle, portret wizerunkowy w studiu",
  "portret-30-dwie-osoby-duet":
    "Portret dwóch osób z jednej firmy, mężczyzna z laptopem i kobieta w czerwonym komplecie",
  "portret-26-kobieta-czarna-marynarka":
    "Portret kobiety w czarnej marynarce, jasne tło studyjne",
  "portret-04-kobieta-morski-kombinezon":
    "Portret kobiety w morskim kombinezonie na białym tle",
  "portret-15-mezczyzna-czarny-tshirt":
    "Portret mężczyzny w czarnym T-shircie, ręce skrzyżowane, jasne tło",
  "portret-12-kobieta-bezowa-marynarka":
    "Portret biznesowy kobiety w beżowej marynarce, szare tło studyjne",
  "portret-23-mezczyzna-w-fotelu":
    "Mężczyzna w garniturze w fotelu, portret wizerunkowy w studiu",
  "portret-29-kobieta-w-plenerze":
    "Portret kobiety w granatowej marynarce, zieleń w tle, sesja w plenerze",
  "portret-16-kobieta-przy-oknie":
    "Kobieta z segregatorem przy oknie w biurze, portret w świetle dziennym",
  "portret-24-mezczyzna-z-telefonem":
    "Mężczyzna rozmawia przez telefon na ławce, portret w plenerze miejskim",

  /* ── wnętrza (12 z 12) ── opisy z 04.08.2026, przeniesione tutaj z galeria/page.tsx
     bez zmiany treści, żeby pasek na podstronie obiektowej miał te same opisy co galeria.
     Kolejność ustawiona przez Marcina 04.08.2026: rząd 1 hale, rząd 2 obiekt z zewnątrz
     i strefy wspólne, rząd 3 lokale gastronomiczne, rząd 4 obiekty z powietrza. */
  "wnetrze-03-hala-magazynowa-regaly":
    "Wnętrze hali magazynowej, regały i ciąg komunikacyjny, Poznań",
  "wnetrze-07-hala-strefa-kompletacji":
    "Hala logistyczna, stanowiska pracy i strefa kompletacji",
  "wnetrze-10-hala-bramki-wejsciowe":
    "Hala magazynowa od środka, bramki i otwarta powierzchnia składowania",
  "wnetrze-01-elewacja-szklana-fasada":
    "Elewacja budynku biurowego o zmierzchu, fotografia architektury",
  "wnetrze-16-silownia-w-biurze":
    "Siłownia w biurze, strefa dla pracowników w budynku biurowym",
  "wnetrze-21-restauracja-ceglana-sciana":
    "Wnętrze lokalu gastronomicznego, sala restauracyjna, Poznań",
  "wnetrze-11-restauracja-bar-i-kuchnia":
    "Wnętrze restauracji, bar i sala, fotografia lokalu",
  "wnetrze-14-bistro-z-antresoli":
    "Sala lokalu użytkowego w świetle dziennym, fotografia wnętrza",

  /* ── dron (9 z 9) ── opisy z 04.08.2026, przeniesione tutaj z galeria/page.tsx
     bez zmiany treści. Kategoria `obiekty` wskazuje te same pliki, więc korzysta
     z tych samych opisów bez kopiowania. */
  "dron-01-centrum-poznania-biurowce":
    "Zdjęcia z drona, biurowce w centrum Poznania z lotu ptaka",
  "dron-04-nowoczesny-budynek-poznan":
    "Fotografia z drona dla firm, nowoczesny budynek komercyjny, Poznań",
  "dron-08-biurowiec-poznan":
    "Biurowiec z lotu ptaka, bryła i otoczenie inwestycji, Poznań",
  "dron-05-panorama-poznania-zachod-slonca":
    "Panorama Poznania z drona o zachodzie słońca",
  "dron-03-apartamenty-nad-rzeka-poznan":
    "Zdjęcia z drona nieruchomości, apartamenty nad rzeką, Poznań",
  "dron-09-osiedle-mieszkaniowe-poznan":
    "Zdjęcia z drona osiedla mieszkaniowego, Poznań",
  "dron-07-inwestycja-tereny-zielone-poznan":
    "Zdjęcia z drona inwestycji i terenów zielonych, Poznań i okolice",
  "dron-06-nowoczesne-osiedle-poznan":
    "Nowoczesne osiedle z lotu ptaka, fotografia dla dewelopera",

  /* ── ZDJ2608-11: kadry poza galerią, obejrzane 04.08.2026 ──
     Hero i kafelki usług, kafelki i hero realizacji, okładki blogowe. Wcześniej ich
     `alt` powstawał z szablonu: `${service.title}, Poznań`, `${s.title}, przykładowa
     realizacja`, `Zdjęcie z realizacji: ${item.label}`, `category.label`, `post.title`.
     Szablon opisywał kontekst, nie obraz, i doklejał miasto przecinkiem, czego
     `docs/zasady-tekstow.md` zakazuje. */

  /* usługi i realizacje */
  "sesje-zespolowe-cover":
    "Dwie osoby w studiu na jasnoszarym tle, mężczyzna w białej koszuli i kobieta w czerwonej sukience",
  "produkt-43-amarula":
    "Butelka likieru na książce i drink ze słomką, aranżacja produktowa na tle w kolorze rdzy",
  "woohoo-ecommerce-4x3":
    "Plansza tytułowa filmu z napisem E-commerce All in na ujęciu Starego Rynku z powietrza",
  "woohoo-autopay":
    "Kadr tytułowy filmu z napisem E-commerce All in nad Starym Rynkiem w Poznaniu",
  "artech-film-cover":
    "Kadr z filmu z hali produkcyjnej, nóż tokarski skrawa obracający się element",
  "_F2A8937":
    "Dwie ażurowe kule z druku 3D na białym tle, większa w gradiencie różu i błękitu",
  /* ── sesja zespołowa IDcom Group (10.08.2026) ──
     Pięć poniższych opisów NIE jest nowych: to 1:1 alty z galerii case study
     `idcom-headshoty-zespolu` w `portfolio.ts`. Do 10.08.2026 tych kluczy tu nie
     było, więc pasek „Przykłady z sesji zespołowej" na `/uslugi/wizerunek-portrety`
     schodził na fallback kategorii i pięć z sześciu kadrów miało IDENTYCZNY opis
     („Headshot z sesji zespołowej dla IDcom Group, Marcin Szabunia”). Czytnik ekranu
     czytał to samo zdanie pięć razy, a dobre opisy leżały obok, w `portfolio.ts`.

     Opisy niosą kolor tła, bo to jest sedno tej realizacji (jedna sesja, trzy tła)
     i bez tego pasek nie tłumaczy sam siebie. */
  "_F2A9424-Edit-2":
    "Portret członkini zespołu na białym tle, sesja wizerunkowa zespołu IDcom Group",
  "_F2A9229-Edit-2":
    "Portret biznesowy na czarnym tle z niebieskim światłem, sesja zespołowa IDcom Group",
  "_F0I9883-Edit-2":
    "Portret członkini zespołu na kremowym tle, zdjęcia zespołu na stronę firmową",
  "_F2A9433-Edit-2":
    "Headshot członka zespołu na białym tle, spójne portrety pracowników firmy IT",
  "_F2A9264-Edit-2":
    "Headshot na czarnym tle z niebieskim akcentem światła, portrety zespołu software house'u",
  // ⚠ SZÓSTY KADR ZOSTAJE BEZ ZMIAN, świadomie. `_F2A9376-Edit-2` jest miniaturą
  // i hero case study, a nie pozycją jego galerii, więc w `portfolio.ts` NIE MA
  // dla niego alta, który dałoby się tu przepiąć. Brief zakazywał wymyślania
  // nowych opisów, więc został ten z 04.08.2026, powstały po obejrzeniu kadru.
  // Opisuje obraz poprawnie, ale jako jedyny w pasku nie mówi „sesja zespołowa"
  // ani „IDcom Group", i mówi „beżowe tło" tam, gdzie reszta mówi „kremowe".
  // Do decyzji Marcina, nie do samodzielnej poprawki.
  "_F2A9376-Edit-2":
    "Roześmiana kobieta w czarnej marynarce ze skrzyżowanymi rękami na beżowym tle",
  "box17-budka-konferencyjna-katowa":
    "Przeszklona budka konferencyjna z sześcioma osobami w środku, ujęcie pod kątem na szarym tle",
  "yes-butcher-43":
    "Szef kuchni z kartą instrukcji smażenia steka, przed nim certyfikat i stek w pudełku",
  "yes-butcher-tile":
    "Karta z instrukcją smażenia steka, certyfikat i stek w firmowym pudełku na drewnianym stole",
  "portfolio-2":
    "Dwaj mężczyźni w garniturach rozmawiają, w tle goście wydarzenia w oświetlonej sali",
  "portfolio-3":
    "Szklanka lemoniady z plastrami ogórka i słomką na pomarańczowym tle, obok liście monstery",
  "portfolio-4":
    "Kobieta w błękitnej koszuli z czerwoną podkładką i długopisem przy przeszklonym oknie",

  /* okładki blogowe (26 z 26 obejrzanych) */
  "bledy-zdjecia-zespolu-2":
    "Kilkadziesiąt osób w niebieskich koszulkach na torze wyścigowym, przed nimi dwa auta sportowe",
  "co-to-jest-packshot":
    "Packshot ciemnozielonego T-shirtu z żółtym nadrukiem na jednolitym jasnoszarym tle",
  "co-zalozyc-na-sesje-biznesowa-2":
    "Studyjny portret dwojga osób na szarym tle, mężczyzna w białej koszuli i kobieta w czerwonej sukience",
  "foto-wideo-dron-z-jednego-wejscia":
    "Ujęcie z góry na przeszklony biurowiec i ruchliwe skrzyżowanie z tramwajami w centrum Poznania",
  "fotografia-eventowa-vs-reportaz-2":
    "Kobieta i dwaj mężczyźni odbierają oprawione dyplomy na scenie gali, w tle świetlny ekran",
  "fotografia-produktowa-ecommerce-3":
    "Szklanka mrożonego drinka z ogórkiem i słomką na pomarańczowym tle, po bokach liście monstery",
  "fotografia-przemyslowa-fabryka-3":
    "Wnętrze jasnej hali produkcyjnej ze stanowiskami montażowymi i bramkami wejściowymi",
  "headshoty-linkedin-konwersja-2":
    "Studyjny portret młodego mężczyzny z wąsem w czarnym T-shircie na jasnym tle",
  "headshoty-zespolu-w-jeden-dzien":
    "Zestawienie trzech portretów biznesowych na granatowym tle, każdy na innym tle zdjęciowym",
  "ile-kosztuje-film-promocyjny":
    "Zbliżenie na obróbkę metalowego elementu na tokarce, wokół rozsypane wióry",
  "ile-kosztuje-film-z-drona":
    "Panorama miasta z drona o zachodzie słońca, kamienice, kościół i wieżowce na horyzoncie",
  "ile-kosztuje-sesja-wizerunkowa-dla-firmy-2":
    "Studyjny portret mężczyzny w turkusowej marynarce na ciemnoszarym tle",
  "jak-przygotowac-sie-do-sesji-biznesowej-2":
    "Kadrowane zbliżenie uśmiechniętej kobiety patrzącej w górę, ciemnoszare tło studyjne",
  "jak-wybrac-fotografa-na-event":
    "Goście na parkiecie podczas imprezy, na pierwszym planie tańcząca kobieta w brokatowej sukience",
  "live-editing-na-evencie":
    "Uczestnicy w niebieskich koszulkach przybijają piątkę prowadzącemu na torze wyścigowym",
  "obsluga-foto-wideo-eventu-firmowego":
    "Goście w garniturach śmieją się przy stole podczas wieczornej gali, w tle fioletowe światła",
  "pakiet-foto-wideo-czy-osobno":
    "Dwaj mężczyźni w garniturach rozmawiają podczas networkingu, w tle goście i światła sali",
  "sesja-wizerunkowa-poznan-2":
    "Portret mężczyzny w koszuli i szelkach rozmawiającego przez telefon przed przeszkloną elewacją",
  "slownik-pojec-wideo":
    "Grafika z napisem E-COMMERCE i naklejką All in na kadrze z drona nad Starym Rynkiem",
  "spojne-portrety-zespolu":
    "Siatka sześciu portretów zespołu na granatowym tle, w trzech wariantach tła zdjęciowego",
  "wideo-marketing-dla-firm-formaty-2":
    "DJ tyłem do kadru z uniesioną ręką, przed nim publiczność i strzelające kolumny ognia",
  "zdjecia-ai-vs-profesjonalna-sesja-2":
    "Studyjny portret brodatego mężczyzny w marynarce siedzącego w fotelu na szarym tle",
  "zdjecia-film-z-drona-dla-firm":
    "Ujęcie z góry na nowy budynek mieszkalny z czerwonej cegły w wieczornym słońcu",
  "zdjecia-na-strone-firmowa-2":
    "Portret kobiety w błękitnej koszuli spoglądającej przez ramię, rozmyte jasne tło",
  "zdjecia-z-drona-dla-deweloperow":
    "Osiedle z czerwonej cegły z lotu ptaka o zachodzie słońca, wokół ulica i zieleń",
  "zdjecie-do-cv-w-domu-2":
    "Studyjny portret młodej kobiety w beżowej marynarce na szarym tle, kadr do ramion",
};

/** Nazwa pliku bez katalogu i bez rozszerzenia, np. `/images/galeria/eventy/event-NN-opis-kadru.jpg` → `event-NN-opis-kadru`. */
export function imageKey(src: string): string {
  const file = src.split("/").pop() ?? src;
  return file.replace(/\.[a-z0-9]+$/i, "");
}

/** Opis alternatywny dla ścieżki obrazu. Bez wpisu w mapie zwraca `fallback`. */
export function galleryAlt(src: string, fallback: string): string {
  return GALLERY_ALTS[imageKey(src)] ?? fallback;
}
