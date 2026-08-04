# AUDYT TREŚCI, SPÓJNOŚCI I JĘZYKA — szabunia.pl

**Data:** 2026-08-04 · **Tryb:** autonomiczny · **Plan:** `docs/sesje/PLAN-AUDYT-TRESC-2026-08-04.md`

**Zakres:** moduł E w całości + z modułu C wyłącznie warstwa tekstowa (`title`, `description`,
H1-H3, `alt`, OG, `llms.txt`). **Wykluczone:** techniczne SEO (robots, sitemap, canonical,
indeksacja, szybkość) — audytowane 29.07 i 03.08.

**Okno i punkt odniesienia:**

| Co | Wartość |
|---|---|
| HEAD | `88564ac83f141c32e882ce2322b2683dc6262b43`, 2026-08-04 15:11:08 +0200 |
| Gałąź | `main` == `origin/main`, drzewo czyste w plikach śledzonych |
| Produkcja = `main`? | **TAK, potwierdzone** — `/uslugi` na żywo renderuje ósmą usługę włączoną dziś (`services.tsx:652-660`), której nie ma w żadnym wcześniejszym stanie repo |
| Ads | odczytane 04.08, okno **5 lip – 3 sie 2026** |
| GSC | odczytane 04.08, okno **3 miesiące, ~2.06 → ~1.08.2026**, „ostatnia aktualizacja: 4 godziny temu" |
| Profil Firmy | odczytany 04.08 |

**Metoda konkretnie:** kopia robocza repo na przypiętym HEAD; pięć osi zebranych osobnymi
subagentami z instrukcją „findingi w formacie §5, nie streszczaj"; długości `title`/`description`
i liczby słów mierzone skryptami (parser literałów JS), nie na oko; live przez Chrome z włączonym
JS i widocznym oknem; panele Ads, GSC i Profil Firmy tylko do odczytu; ostatni subagent
zweryfikował dowody, fałszywe pozytywy i zgodność liczb.

**Klauzula:** audyt niczego nie zmienił. Zero edycji w `src/`, `public/`, w panelach i w Profilu
Firmy. Zero commitów. Wszystkie zdania zamienne są propozycjami, nie zostały wprowadzone.

---

## 0. TL;DR

**Wniosek nadrzędny, warunkowy: przepisywanie tekstów nie ma dziś sensu jako projekt SEO,
dopóki Google nie przeczyta tekstów przepisanych 30.07.** Sprawdzenie na żywo 04.08: w wynikach
wyszukiwania dla `/uslugi`, `/blog` i `/galeria` **nadal stoją tytuły sprzed 30.07**, z długimi
myślnikami i starym sufiksem `| Marcin Szabunia`, mimo że w kodzie od pięciu dni jest inna wersja
(`TRESC2608-06`). Każdy pomiar skutku tamtej rundy jest w tej chwili niemożliwy. To nie znaczy,
że nie ma co robić — znaczy, że kolejka zadań powinna zaczynać się od rzeczy, które **nie
wymagają reindeksacji, żeby zadziałać**: sprzeczności handlowych, ósmej usługi i Profilu Firmy.

**Najważniejszy pojedynczy finding:** sekcja Warunki współpracy mówi, że licencja jest
**„na własny użytek"**, a FAQ na tej samej stronie głównej i FAQ podstrony portretów mówią, że
**„obejmuje użytek komercyjny"** (`TRESC2608-01`). To jedyna rzecz w tym audycie, w której klient
B2B czytający uważnie może zrezygnować albo wrócić po fakcie z pretensją.

**Drugi w kolejności:** ósma usługa (linia obiektowa, kotwica 900 zł) została włączona dzisiaj
i żyje na produkcji, ale **nie istnieje na ośmiu listach pisanych ręcznie** — w tym w opcjach
formularza kontaktowego i w białej liście `/api/contact`. Zapytanie o halę wpada jako „Inne
zapytanie", więc najdroższa marżowo linia jest od pierwszego dnia niemierzalna (`TRESC2608-03`).

**Trzeci w kolejności, wykryty dopiero w drugim przejściu:** podstrona dronowa sprzedaje pod
kotwicą 700 zł zakres, który cennik przypisuje linii obiektowej (900-1 900 zł) i wprost zakazuje
wyceniać z sekcji dronowej. To dokładnie treść `poprawki-dron-2026-08-03-NIEZASTOSOWANY.diff`,
która do dziś nie weszła (`TRESC2608-50`). Ten diff przestaje być formalnością: ma teraz wycenę
600-1 200 zł na zleceniu.

**Dobra wiadomość, i nie jest drobna:** po porównaniu całego serwisu z `cennik_2026_07_v3.md`
**siedem z ośmiu kotwic zgadza się co do złotówki, a pełna siatka 47 kwot i procentów
w `public/llms.txt` nie ma ani jednej rozbieżności.** Po trzech turach zmian cen w lipcu to nie
jest oczywisty wynik. Ceny w tym serwisie są pilnowane; problem jest w tym, **co je otacza**.

**Liczby:** **1 × P0 · 9 × P1 · 20 × P2 · 16 × P3 · 11 × P4** = 57 findingów.
Do tego **5 hipotez (H)** plus jedna rozstrzygnięta w trakcie, **4 obserwacje bez akcji**
i **11 skorygowanych fałszywych pozytywów**.

**Jedna decyzja na teraz:** brzmienie licencji. To stop-condition `CLAUDE.md §10.7` (rozbieżność
w danych biznesowych) — nie wolno mi jej rozstrzygnąć samodzielnie i nie da się jej obejść
redakcyjnie, bo dwie wersje znaczą co innego prawnie. Warianty w §12.

---

## 1. Ocena

| Obszar | Ocena | Uzasadnienie |
|---|---|---|
| Zgodność z `zasady-tekstow.md` | **82/100** | czarna lista prawie czysta, zero długich myślników na ekranie, zero miasta doklejonego przecinkiem w nagłówkach; minusy: forma „Wy", „brief", akapity-lustrzanki |
| Poprawność polszczyzny | **86/100** | 16 poprawek z 02.08 trzyma; zostały pojedyncze błędy fleksyjne i interpunkcyjne, głównie w tekstach dopisanych po 02.08 |
| Spójność między plikami | **71/100** | kanon liczb, terminów i NAP trzyma się wzorowo; rozjeżdżają się warstwy pisane ręcznie i wszystko, co dotknęło ósmej usługi |
| SEO tekstowe (metadane) | **90/100** | 52/52 unikalne `title` i `description`, 0 tytułów >60 zn., 4 opisy przekraczają 155 zn. o 1-2 znaki |
| SEO tekstowe (architektura tematów) | **58/100** | trzy klastry kanibalizacji, w tym jeden **powstały po 30.07** |
| SEM (message match) | **88/100** | nagłówki RSA trafiają w H1 landing page na wszystkich czterech aktywnych reklamach |
| Profil Firmy | **54/100** | ceny zgodne z kanonem, ale brakuje trzech linii usługowych, jedna kotwica bez jednostki, jedna usługa celuje w wykluczony segment |

**Łącznie: 76/100.** Rok temu ten sam serwis nie miałby połowy tych rzeczy do wytknięcia, bo
połowa z nich w ogóle by nie istniała. Największy ubytek punktów nie jest w języku, tylko
w tym, że **każda nowa rzecz dokładana do serwisu wymaga ręcznego dopisania w ośmiu miejscach
i za każdym razem trafia do sześciu z ośmiu.**

---

## 2. Sprawdzone i OK

To sekcja obowiązkowa i dłuższa niż lista problemów, bo tak wygląda stan faktyczny.

### 2.1 Zgodność z zasadami (§2.2 planu)

- **Miasto doklejone przecinkiem w nagłówkach — zero naruszeń.** Sprawdzone wszystkie 52
  wystąpienia `", Poznań"` w `src/`: 7 w polach `title` (dozwolone i pożądane), 45 w atrybutach
  `alt` (nie są nagłówkami). W żadnym `h1`, `h2Process`, `h2Faq`, `heroTitle` ani `subtitle`.
  Wzorcowe: `h1: "Obsługa eventów firmowych w Poznaniu"` — miasto wychodzi naturalnie w zdaniu.
- **Długie myślniki w treści widocznej na ekranie — zero.** `grep -c "—"` daje **169** trafień
  w `src/`; klasyfikator rozpoznający komentarze blokowe, liniowe i `{/* */}` pokazał, że
  **161 to komentarze w kodzie** i 3 to placeholdery `"—"` w mailu administracyjnym do Marcina
  (`api/contact/route.ts:137-139`). Zostaje 5, wszystkie w polach `name` w JSON-LD i w `<title>` RSS.
  Osobno 1 trafienie w komentarzu w `public/robots.txt`.
- **„na piśmie" — zero wystąpień.** Zakaz z 03.08 utrzymany. Przeszukane 20 wzorców urzędowych
  (`niniejszy`, `przedmiotowy`, `dokonuję`, `w terminie do`, `celem`, `winien`…): jedno trafienie
  poza polityką prywatności.
- **Triady przymiotników — zero.** 17 trafień wzorca „X, Y i Z" sprawdzone po kolei: wszystkie to
  wyliczenia rzeczownikowe konkretów („momenty, emocje i interakcje", „frezowanie, toczenie
  i cięcie"), nie triady przymiotników z przykładu w zasadach.
- **Pierwsza osoba liczby mnogiej („nasz zespół", „oferujemy") — zero** poza cytatami klientów.
- **Emoji w prozie — zero.** `→ ← ↗ ✕` to glify afordancji w przyciskach, `★★★★★` to wizualizacja
  oceny. Jedyny ozdobnik to `★` w `portfolio.ts:329` (finding P3).
- **„kalkulator" — zero trafień** w `src/` i `public/`. Zamknięte 29.07, bez regresu.
- **„z jednego wejścia" — zero w treści.** Żyje wyłącznie w slugu zaindeksowanego wpisu, zgodnie
  z decyzją z 30.07.
- **„netto netto" — zero na żywo.** Obie osłony działają (`getPriceFaq:689`, `ServiceHero:18`).
  Dwa trafienia grepa to komentarze opisujące naprawiony błąd.
- **„14 razy więcej wyświetleń" — zero.** Kasacja z 29.07 trzyma, kanon 21x/36x/9x nietknięty.

### 2.2 Polszczyzna (§2.3 planu)

Pliki przeczytane linia po linii i **bez uwag**: `galeria.ts` (24/24), `Hero.tsx` (139/139),
`Warunki.tsx` (cała treść sześciu kart), `not-found.tsx` (55/55), `TrustStats.tsx`,
`Breadcrumbs.tsx`, `MobileFAB.tsx`, `Navigation.tsx`, `GalleryView.tsx`, `PortfolioProcess.tsx`,
`PortfolioFAQ.tsx`, `PortfolioHero.tsx`, `PortfolioCaseStudy.tsx`, `ServiceHero.tsx`,
`ServiceAuthor.tsx`, `ServiceGalleryStrip.tsx`, `FAQ.tsx`, `LogoBar.tsx`, `ThemeToggle.tsx`,
`BackToTopButton.tsx`, `BlogCard.tsx`, `BlogPreview.tsx`, `TurnstileWidget.tsx`,
`ErrorBoundary.tsx`, `ServiceGalleryLightbox.tsx`, `uslugi/page.tsx`, `portfolio/page.tsx`,
`blog/page.tsx`, `galeria/page.tsx`, `blog/[slug]/page.tsx`, `uslugi/[slug]/page.tsx`,
`portfolio/[slug]/page.tsx`, `layout.tsx`, `feed.xml/route.ts`.

- **Cudzysłowy typograficzne poprawne.** `&bdquo;` + `&rdquo;` w `Testimonials.tsx:112,186`,
  `uslugi/[slug]/page.tsx:206`, `polityka-prywatnosci/page.tsx:79` to **poprawna polska para**
  (U+201E + U+201D), sprawdzone po kodach znaków, nie na oko.
- **Wszystkie `alt`** — 8 statycznych w komponentach, 5 kategorii × 4-12 wariantów w `galeria/page.tsx`,
  63 ręcznie pisane w `portfolio.ts`, 9 w `ServiceGalleryStrip.tsx` — poprawne fleksyjnie
  i interpunkcyjnie. `portfolio.ts` ma **63/63 unikalne, opisowe alty, zero duplikatów** — to
  najlepsza warstwa tekstowa w całym repo.
- **16 poprawek językowych z 02.08 — wszystkie trzymają.** Zero regresów w: „na: na",
  „karriery", „employer branding", „Czy wystawiam", „Ile osób mogę", „Warunki Współpracy",
  „Email" (w `src/`) oraz „Social Media" w `src/data` i w komponentach — **ale nie w `blog.ts`,
  gdzie zostało 9 wystąpień wielką literą; patrz §2.6**.

### 2.3 Spójność (§2.4 planu) — tabela faktów kanonicznych

| Fakt | Miejsc | Werdykt |
|---|---|---|
| 250 000+ zdjęć | 2 | ✅ zgodne; renderowane przez `toLocaleString("pl-PL")`; „500 000+" nie istnieje |
| 1 000+ sesji | 2 | ✅ |
| 100+ firm | 4 | ✅ ta sama liczba, różne dopiski; bez „zadowolonych" (02.08 trzyma) |
| 8+ lat / „od 2018" / „ponad osiem lat" | 6 | ✅ wszystkie dają ten sam rok startu przy dacie 2026 |
| Telefon 514 900 688 | 19 wystąpień, 5 formatów | ✅ zero literówek, zero drugiego numeru; **zgodny z Profilem Firmy (04.08)** |
| E-mail `marcin@szabunia.pl` | 18 w 7 plikach `src/` + `llms.txt` | ✅ |
| Godziny pon–pt 08:00–20:00, sob 10:00–16:00 | `layout.tsx:173-192` | ✅ **zgodne z Profilem Firmy na żywo** („Otwarte · Zamknięcie: 20:00", 04.08) |
| Geo i `areaServed` | 3 bloki JSON-LD + 8 podstron | ✅ identyczne |
| 9 logotypów | 4 miejsca | ✅ te same marki, ta sama kolejność |
| Kotwice cenowe 7 z 8 usług | `services.tsx` ↔ `llms.txt` ↔ `blog.ts` | ✅ zgodne co do złotówki |
| Dostawa 14 / 21 dni | 14 / 12 miejsc | ✅ |
| 2 tury foto / 3 tury wideo / 7 dni na poprawki | 4 | ✅ |
| Dojazd 0 zł / 2,50 zł netto/km | 16 | ✅ co do kwoty i sposobu liczenia |
| RAW +30%, decyzja przed sesją | 3 | ✅ co do joty |
| Rozstawienie 20 minut | 8 | ✅ korekta z 29.07 trzyma („30 minut" nie wróciło) |
| 3 m² ze spacją | 11 | ✅ korekta z 29.07 trzyma |
| Do 40 osób dziennie | 7 | ✅ |
| „od 4 osób" | 4 | ✅ |
| Obietnica „Wstępna wycena w 24h" | 30 wystąpień ciągu „24h" w 13 plikach + warianty słowne | ✅ jedna obietnica, zero konkurencyjnych terminów |
| „Wolne terminy: 1–3 tyg." | 2, oba z półpauzą | ✅ |
| Cytat Fortuniaka | 2 kopie | ✅ **identyczne znak po znaku** (diff programowy) |
| Cytat Wagnera | 2 kopie | ✅ **identyczne znak po znaku** |
| Cytat Formalika | 2 z 3 kopii | ✅ `Testimonials.tsx:12` ≡ `portfolio.ts:151` identyczne; trzecia kopia (`services.tsx:752`) skrócona **i przestawiona** — finding P2 |
| Cytat Burzyńskiej | 2 kopie | ❌ `Testimonials.tsx:19` vs `services.tsx:764` — skrót **plus zlepek dwóch zdań**, finding P2 |
| Okruszki ↔ JSON-LD `Service.name` | 8 tras | ✅ zgodne z definicji, obie warstwy czytają `service.title` |
| Sitemapa ↔ lista usług | 8 wpisów | ✅ mapowana z `serviceCategories`, ósma usługa obecna |
| Kafelek `/` ↔ kafelek `/uslugi` | 8 × 2 | ✅ oba z jednego źródła |

### 2.4 SEO tekstowe (§2.5 planu)

| Sprawdzenie | Wynik |
|---|---|
| Unikalność `title` | **52 / 52**, porównanie automatyczne po pełnym stringu |
| Unikalność `description` | **52 / 52** |
| Długość `title`, próg 60 | **0 przekroczeń.** Max 55 zn., mediana 47. **Problem „11 tytułów ≥58 zn." z 30.07 zamknięty, bez regresu** |
| Sufiks `\| Szabunia` w kodzie | **52/52 tras**, w tym 46 indeksowanych (6 ma `noindex`); zero `\| Marcin Szabunia` |
| Długi myślnik w metadanych | **0 na 52 tytuły i 52 opisy** |
| `alt=""` | 0 wystąpień |
| Obrazy bez `alt` | 0 |
| Alt generyczne („zdjęcie", „foto") | 0 |
| Keyword stuffing w pojedynczym alcie | 0 |
| Martwe odesłania w `llms.txt` | **0 z 24 linków** |
| `h1` we wszystkich 8 usługach | 8/8 obecne, fallback nigdy nie działa |
| Jeden `<h1>` na trasę, bez przeskoków poziomów | potwierdzone, 13 miejsc z `<h1` |
| `og:title` / `og:description` na trasach dynamicznych | 43/43 biorą dosłownie `seo.title` / `seo.description` |
| `keywords` | nie istnieje w repo — **poprawnie, nie dodawać** |
| „Profesjonalny" otwierający opisy meta | **0** (przy audycie 30.07 otwierało osiem) |

### 2.5 Serwis kontra cennik biznesowy v3 (§2.4.3 planu) — domknięte po pierwszym przejściu

W trakcie audytu okazało się, że `cennik_2026_07_v3.md` **jest dostępny** w `01_Biznes/_System/02_Cenniki/`.
Pierwsze przejście oceniało ceny wyłącznie względem `services.tsx`, czyli względem kopii, a nie
źródła. Poprawione: cały serwis został porównany z kanonem biznesowym.

| Sprawdzenie | Wynik |
|---|---|
| **Kotwice „od X zł"** | **7 z 8 zgodnych z cennikiem co do złotówki.** Ósma (900 zł, linia obiektowa) odpowiada pakietowi wejściowemu `OBIEKT PODSTAWOWY` (cennik `:357`), a nie nagłówkowi sekcji („od 400 zł", `:347`) — patrz `TRESC2608-51` |
| **Pełna siatka cen w `llms.txt`** | **47 kwot i procentów, ZERO rozbieżności co do złotówki.** Po trzech turach zmian cen w lipcu to nie jest oczywisty wynik |
| Wszystkie kwoty w `blog.ts` | 23 pozycje w 8 wpisach, **zero rozbieżności** |
| Mapowanie usług na sekcje cennika | **1:1 w obie strony**, osiem do ośmiu. Żadnej usługi bez pozycji, żadnej pozycji bez usługi |
| Monthly Content (wycofany 30.07) | **zero wystąpień** w całym repo |
| Ekspres +50%, RAW +30%, prawa +50%, poprawki 2/3, nadgodziny 400/350, dojazd 2,50 zł/km, terminy 14/21 | wszystkie zgodne z cennikiem |
| Kotwica „od 120 zł/os." | **kanoniczna** (cennik `:290`), a `priceFaqSuffix` i `llms.txt` poprawnie tłumaczą mechanikę progów |

**Realne minimum sesji zespołowej, policzone z cennika:** 4 osoby × 180 zł = 720 zł stawki
osobowej **plus miejsce** (mobilne studio 450 zł albo zewnętrzne od 400 zł) = **1 120–1 170 zł netto**.
Żeby ktokolwiek został policzony po 120 zł, zespół musi mieć ≥31 osób, czyli zamówienie
za **4 920 zł**. Kotwica jest zgodna z kanonem; ryzyko polega na tym, że najniższa liczba
w cenniku opisuje najrzadszy przypadek — i cennik ma ten sam problem, więc **to nie jest wada serwisu**.

### 2.6 Potwierdzenie stanu otwartych punktów z poprzednich raportów (§2.7 planu)

Pomiar na HEAD `88564ac`, 04.08. Żaden z tych punktów nie jest nowym findingiem — to kontrola,
czy sprawy zapisane wcześniej jako otwarte nadal takie są.

| Punkt | Źródło | Stan 04.08 |
|---|---|---|
| `poprawki-dron-2026-08-03-NIEZASTOSOWANY.diff` | prompt audytu | **nadal NIE w kodzie**: `services.tsx:470` ma stary `subtitle` („budynki i obiekty firmowe, hale i magazyny, tereny, eventy i architektura"), `:474` i `:476` stare `forWhom`. Otwarty punkt, nie finding |
| „Social Media" wielką literą | LEJEK 02.08 §4.1 | **9 wystąpień, wyłącznie w `blog.ts`** (`:236`, `:258`, `:365`, `:577`, `:606`, `:616`, `:675`, `:686`, `:699`). W `src/data/*` poza blogiem i w komponentach: 0 |
| „Reels" vs „reelsy" | LEJEK 02.08 §4.2 | „Reels" 16, „reels" 21, „reelsy" 23 — nadal trzy warianty |
| „· Opinia Google" vs „· opinia Google" | LEJEK 02.08 §4.2 | 3 wielką literą (`Testimonials.tsx`) vs 6 małą (`services.tsx`, `portfolio.ts`) — podział przebiega dokładnie po pliku |
| „E-commerce All-in" vs „All In" | LEJEK 02.08 §4.2 | 10 vs 7 — oba warianty nadal żyją, w tym na jednej stronie |
| „Case Study" vs „case study" | LEJEK 02.08 §4.2 | 1 vs 11 — jedno miejsce odstaje (`PortfolioCaseStudy.tsx:21`) |
| „Ekspres" / „ekspres" / „express" | PEŁNY 29.07 `-37` | 3 / 14 / 3 — „express" wyłącznie w `llms.txt` (`:17`, `:28`, `:40`) |
| „poseboard" vs „moodboard" | LEJEK 02.08 §4.2 | **rozstrzygnięte i przekwalifikowane** — patrz `TRESC2608-20`. To nie rozjazd zapisu, tylko wymyślone słowo |
| `challenge` kontra `description` w case studies | PRZEGLĄD 02.08 §F | **nie sprawdzone w tym audycie** — patrz §9.2 |

### 2.7 SEM — message match (§2.6 planu)

Cztery aktywne RSA, wszystkie odczytane 04.08 (okno 5 lip – 3 sie). **Message match zgodny
na wszystkich czterech**, miasto w nagłówkach obecne i poprawne zgodnie z wyjątkiem z 02.08:

| RSA, nagłówki 1-3 | H1 landing page | Werdykt |
|---|---|---|
| „Portrety biznesowe Poznań \| Sesja biznesowa w Poznaniu \| Fotograf marek H&M i Warner" | „Portrety biznesowe i headshoty" | ✅ zgodne |
| „Packshot Poznań, od 600 zł \| Packshoty na białym tle \| Packshot dla e-commerce" | „Packshot i fotografia produktowa" | ✅ zgodne, kotwica w nagłówku spójna z `services.tsx:429` |
| „Fotograf na event firmowy \| Obsługa eventów firmowych \| Fotograf eventowy Poznań" | „Obsługa eventów firmowych w Poznaniu" | ✅ zgodne |
| „Headshoty zespołu w biurze \| Zdjęcia zespołu w jeden dzień \| Sesja zdjęciowa zespołu" | „Headshoty zespołu w biurze albo w studiu" | ✅ zgodne |

Opisy RSA nie zawierają fraz z czarnej listy, długich myślników ani Title Case. Liczby w opisie
sesji zespołowych („10 do 15 minut na osobę, rozstawienie 20 minut, zdjęcia w 14 dni") są
**zgodne z kanonem co do joty** — to najlepiej zsynchronizowana warstwa w całym projekcie.

**Zamknięty otwarty punkt z 30.07:** raport SEO §7 pkt 1 pisał, że „jedyna pozycja, w której
zwlekanie kosztuje realne pieniądze", to potwierdzenie, że konwersje w Ads się mierzą.
**Mierzą się.** Okno 5 lip – 3 sie: 1 039 wyświetleń, 77 kliknięć, CTR 7,41%, 479,38 zł,
**3,00 konwersji, 159,79 zł za konwersję.** Punkt do zamknięcia w rejestrze.

---

## 3. Ustalenia P0

### `TRESC2608-01` · [PRAWO][BIZNES] Warunki mówią „na własny użytek", FAQ mówi „użytek komercyjny" — trzy miejsca przeciw jednemu (§2.4.9 planu)
`src/components/Warunki.tsx:91` vs `src/data/faq.ts:60`, `src/data/services.tsx:327`, `public/llms.txt:30`
· **P0 · S · 🧑 [DECYZJA MARCINA — stop-condition `CLAUDE.md §10.7`] · Z (kod + live)**

Cytat A, `Warunki.tsx:91`:
> „Pliki surowe (RAW) nie wchodzą w cenę, pełny zestaw to +30% wartości zlecenia i decyzja przed
> sesją. **Licencja niewyłączna, bez limitu czasowego, na własny użytek**; przeniesienie praw
> majątkowych +50%."

Cytat B, `faq.ts:60`:
> „Tak. **Wszystkie licencje obejmują użytek komercyjny**: strona www, social media, materiały
> drukowane, reklama online. Bez limitów czasowych."

Cytat C, `services.tsx:327`:
> „Tak. **Licencja obejmuje użytek komercyjny bez ograniczeń czasowych**: strona, social media,
> druk, reklama."

Cytat D, `llms.txt:30` (wersja pogodzona):
> „Licencja niewyłączna, bez limitu czasowego, **na użytek własny klienta (www, social media,
> druk, reklama online)**."

**Mechanizm i skutek.** „Na własny użytek" w polskim obrocie prawnoautorskim to termin
o ustalonym znaczeniu — dozwolony użytek osobisty, wyłączający wykorzystanie w działalności
gospodarczej. Serwis sprzedaje wyłącznie materiał marketingowy dla firm, więc licencja „na własny
użytek" wyklucza dokładnie to, po co klient przychodzi. `llms.txt` doprecyzowuje sens
(„użytek własny **klienta** (www, social media, druk, reklama online)"), ale ten dopisek nie
istnieje w `Warunki.tsx` — a to `Warunki.tsx` renderuje się jako sekcja **Warunki współpracy**,
czyli dokument, który klient B2B czyta przed podpisem i na który się powoła przy sporze.
Trzy powierzchnie mówią „komercyjny", jedna mówi „własny", i tą jedną jest ta najbardziej
wiążąca. Obie wersje są na produkcji jednocześnie, na jednej stronie głównej.

**Dlaczego to nie jest zadanie redakcyjne.** Nie da się tego rozstrzygnąć doborem słów: to dwie
różne oferty. Wchodzi w stop-condition `CLAUDE.md §10.7` („rozbieżność w danych biznesowych —
nie poprawiać samodzielnie"). Warianty w §12, decyzja D1.

**Zamiennik (jeśli zapadnie decyzja „komercyjny", co jest zgodne z trzema pozostałymi
powierzchniami):** „Licencja niewyłączna, bez limitu czasowego, na użytek komercyjny Twojej firmy:
strona, social media, druk i reklama online. Przeniesienie praw majątkowych albo przekazanie
materiału podmiotom trzecim: +50%."

---

## 4. Ustalenia P1

### `TRESC2608-02` · [TREŚĆ] Nowa usługa obiektowa mówi do klienta „Wy", a jej pytania FAQ pytają Marcina per „Wy" (§2.2.8, §2.3.5 planu)
`src/data/services.tsx:551, 584, 588, 589, 590` + `:168` · **P1 · S · 🤖 · Z (kod + live)**

Cytat, `:551`:
> „(…) Każde zdjęcie przechodzi retusz architektoniczny: korekta perspektywy, prostowanie linii,
> czyszczenie kadru. **Pliki dostajecie w dwóch wersjach, do druku i pod www.**"

Cytat, `:589` (pytanie FAQ, potwierdzone jako `<h3>` na żywo 04.08):
> „**Fotografujecie hale magazynowe i lokale użytkowe pod wynajem?**"

Cytat, `:590`:
> „**Czy fotografujecie też wnętrza biur i lokali?**"

Cytat, `:168` (usługa eventowa, potwierdzone na żywo):
> „(…) **Dla Was to nadal jedna osoba kontaktowa, jeden brief i jedna faktura.**"

**Mechanizm i skutek.** Ostrzeżenie z raportu z 02.08 („przy włączeniu wymaga osobnej korekty:
teksty są tam pisane w formie «Wy»") potwierdziło się i jest gorsze, niż zapowiadano. Naruszenie
idzie w dwie strony. Do klienta: `dostajecie` (`:551`, `:589`), `wstawicie` i `potrzebujecie` (`:584`), `chcecie` (`:588`)
— przy 51 liniach z formą „ty" w tym samym pliku. **Pełna lista wystąpień 2. os. liczby mnogiej
w pliku: `:168`, `:551`, `:584`, `:588`, `:589`, `:590` — sześć linii, siedem form.** **Do Marcina: dwa pytania FAQ w liczbie mnogiej**,
czyli sugerujące firmę z zespołem, co jest odwrotnością kanonu „liczba pojedyncza, solo creator".
Na żywo widać to w jednym rzucie oka: `<h3>` „Fotografujecie hale magazynowe…" stoi dwa pytania
nad `<h3>` „Na jakim sprzęcie **pracujesz**?", a doklejane automatycznie FAQ cenowe mówi „czego
**potrzebujesz**". Pozostałe siedem usług ma 100% pytań w formie „ty" (zweryfikowane:
`fotografujesz`, `pracujesz`, `możesz`, `dostarczasz`, `realizujesz`, `montujesz`).
Usługa jest jednym z dwóch kafelków `wide: true`, więc stoi w najbardziej eksponowanym miejscu siatki.

**Zamiennik:** `:589` → „Fotografujesz hale magazynowe i lokale użytkowe pod wynajem?" ·
`:551` → „Pliki dostajesz w dwóch wersjach, do druku i na stronę WWW." ·
`:168` → „Dla Ciebie to nadal jedna osoba kontaktowa, jedne ustalenia i jedna faktura."

---

### `TRESC2608-03` · [POMIAR][BIZNES] Ósma usługa nie istnieje na ośmiu spisach pisanych ręcznie (§2.4.7, §2.4.11 planu)
`src/data/services.tsx:543` (usługa) vs 8 powierzchni · **P1 · M · 🌐 · Z (kod + live)**

Usługa jest publiczna: `services.tsx:543` `title: "Wnętrza, obiekty i architektura"`,
`DRAFT_SERVICE_SLUGS` pusty (`:652-660`), potwierdzone na żywo 04.08 na `/uslugi`.

Nie ma jej w:

| # | Miejsce | Dowód |
|---|---|---|
| 1 | opcje formularza kontaktowego | `CTA.tsx:451` ostatnia usługa to `Zdjęcia i wideo z drona`, potem `:454` `Inne zapytanie` — **potwierdzone na żywo 04.08: `<select>` ma 9 opcji (placeholder + 7 usług + „Inne zapytanie"), żadnej obiektowej** |
| 2 | biała lista `/api/contact` | `api/contact/route.ts:92` `dron: "Zdjęcia i wideo z drona",` → `:98` `return NextResponse.json({ error: "Nieznany rodzaj usługi" }, { status: 400 });` |
| 3 | `llms.txt`, sekcja specjalizacji | `llms.txt:7` kończy się na `fotografia produktowa` |
| 4 | `llms.txt`, sekcja usług i cennika | `llms.txt:23` to ostatnia z **siedmiu** pozycji |
| 5 | JSON-LD `hasOfferCatalog` | `layout.tsx:269` `name: "Zdjęcia i wideo z drona",` to siódma i ostatnia |
| 6 | mapa opinii | `services.tsx:783` `"zdjecia-wideo-z-drona": T.maja,` i klamra `};` — **potwierdzone na żywo: podstrona obiektowa jako jedyna nie renderuje cytatu ani gwiazdek** (0 znaków ★ przy 5 na `/uslugi/eventy-reportaze`) |
| 7 | mapa blog ↔ usługa | `blog.ts:1740` ostatni wpis mapy |
| 8 | opis huba `/uslugi` | `uslugi/page.tsx:16` — obiecuje pięć linii, żadna to obiekty |

**Mechanizm i skutek.** Wszystkie osiem to listy pisane ręcznie, nie pochodne `serviceCategories`.
Włączenie usługi objęło wyłącznie powierzchnie generowane z danych (kafelki, `/uslugi`, sitemapa,
trasa, metadane). Skutki policzalne: **(1)** zapytanie o halę wpada do formularza jako „Inne
zapytanie", więc parametr `service` w `contact_submit` nigdy nie wskaże linii z najwyższą kotwicą
(900 zł) — od pierwszego dnia jest ona niemierzalna; **(2)** blok „Z bloga" na tej podstronie
pokazuje trzy wpisy o dronie, pakietach i eventach pod nagłówkiem zapowiadającym porady „powiązane
z tą usługą" — potwierdzone na żywo; **(3)** modele językowe odpytane z `llms.txt` o fotografię hal
w Poznaniu odpowiedzą, że tego nie robisz.

**Zamiennik (`llms.txt`, wzorem pozostałych siedmiu):**
„`- [Fotografia hal, obiektów i wnętrz](https://szabunia.pl/uslugi/wnetrza-obiekty-architektura):
pakiety obiektowe 900/1300/1900 zł (do 8 ujęć z powietrza / do 14 z poziomem ziemi / do 24 z blokiem
wnętrz), retusz architektoniczny, pliki do druku i pod www, drugi obiekt tego samego typu w tym
samym dniu taniej o 300 zł`"

**Rekomendacja konstrukcyjna (do briefu, nie do audytu):** trzy z tych ośmiu list (opcje
formularza, `SERVICE_LABELS` w API, `hasOfferCatalog`) da się wygenerować z `serviceCategories`.
Wtedy dziewiąta usługa nie powtórzy tego scenariusza.

---

### `TRESC2608-04` · [BIZNES] FAQ na stronie głównej podaje warunki korzystniejsze dla klienta niż sekcja Warunki współpracy (§2.4.9, §2.4.10 planu)
`src/data/faq.ts:44` vs `src/components/Warunki.tsx:102` i `public/llms.txt:33` · **P1 · S · 🧑 · Z (kod)**

Cytat, `faq.ts:44`:
> „**Zmiana terminu minimum 48h przed sesją jest bezpłatna.** Odwołanie później niż 48h przed
> sesją: 50% wartości zlecenia. Gotowe pliki archiwizuję przez 1 rok, a **po pełnej akceptacji
> dzieła masz do 7 dni na dodatkowe poprawki**."

Cytat, `Warunki.tsx:102`:
> „Zmiana terminu min. 48h przed sesją: **bezpłatna jednorazowo, każda kolejna 20% wartości
> zlecenia.** Odwołanie <48h: 50% wartości. **Odwołanie w dniu realizacji albo niestawienie się
> osób fotografowanych: 100% wartości.** Archiwizacja gotowych plików: 1 rok."

**Mechanizm i skutek.** Dwie rozbieżności w jednym zdaniu FAQ. **Pierwsza:** „jest bezpłatna"
bezwarunkowo, przy „bezpłatna jednorazowo, każda kolejna 20%" w warunkach; FAQ pomija też karę
100% za odwołanie w dniu zdjęciowym, czyli najdroższy przypadek. **Druga:** „po pełnej akceptacji
dzieła masz do 7 dni na dodatkowe poprawki" to uprawnienie, którego **nie ma nigdzie indziej** —
ani w `Warunki.tsx:69`, ani w `llms.txt:29`, ani dwadzieścia osiem linii niżej w tym samym pliku
(`faq.ts:72`), gdzie „7 dni" znaczy termin, w którym Marcin realizuje poprawki, a nie okno,
w którym klient może je zgłaszać po odbiorze. Wersja korzystniejsza dla klienta stoi na stronie
głównej **i w danych strukturalnych `FAQPage`** (`page.tsx:31` czyta tę samą tablicę), wersja
pełna dopiero na `/galeria`.

**Zamiennik:** „Zmiana terminu na minimum 48h przed sesją jest bezpłatna raz; każda kolejna to 20%
wartości zlecenia, odwołanie poniżej 48h to 50%, a odwołanie w dniu realizacji 100%. Poprawki
zgłoszone po odbiorze realizuję w ciągu 7 dni i nie liczę terminu podstawowego od nowa."

---

### `TRESC2608-05` · [BIZNES] Sesja wizerunkowa trwa „od 30 minut" albo „od 90 minut", zależnie od podstrony (§2.4.9 planu)
`src/data/services.tsx:324` vs `src/data/portfolio.ts:417` vs `public/llms.txt:20` · **P1 · S · 🧑 · Z (kod)**

Cytat A, `services.tsx:324` (pytanie: „Ile trwa sesja wizerunkowa?"):
> „**Sama sesja może trwać od 30 minut.** Najważniejsze, że przychodzisz na gotowe: studio
> rezerwuję na 30 minut przed Twoją godziną (…)"

Cytat B, `portfolio.ts:417` (pytanie identyczne co do znaku, `:416`):
> „**W zależności od pakietu, od 90 minut do 3 godzin.** Czas obejmuje przygotowanie oświetlenia,
> sesję oraz ewentualne zmiany stylizacji."

Cytat C, `llms.txt:20`:
> „PORTRET STANDARD 1 100 zł (1 osoba, **90 min**, 5 wyretuszowanych zdjęć) (…)"

**Mechanizm i skutek.** To samo pytanie, ta sama usługa, dwie odpowiedzi w dwóch plikach danych —
a najtańszy pakiet w cenniku ma 90 minut, nie 30. Klient, który przeczyta „od 30 minut", policzy,
że 1 100 zł to stawka za pół godziny (2 200 zł/h), i albo odpadnie na cenie, albo przyjdzie
z oczekiwaniem sesji, której w ofercie nie ma. Obie wersje wchodzą do JSON-LD `FAQPage` na dwóch
różnych trasach, więc sprzeczność widzi też Google. Klaster cenowy jest w GSC drugim co do
wielkości (odczyt 04.08, okno 3 miesiące): `ile kosztuje sesja wizerunkowa` 67 wyśw., `sesja
wizerunkowa koszt` 58, `sesja wizerunkowa ile kosztuje` 53 — **178 wyświetleń na trzech frazach
z pierwszej dziesiątki, 0 kliknięć**, przy 2 730 wyświetleniach w całym oknie. Udziału całego
klastra nie liczę, bo nie mam pełnej listy 163 zapytań (patrz §9.2). Ta sprzeczność stoi
dokładnie tam, gdzie ludzie pytają o cenę.

**Zamiennik:** „Najkrótszy pakiet to 90 minut, dłuższe dają 2 do 3 godzin na więcej ujęć i zmiany
stylizacji. Przychodzisz na gotowe, bo światło rozkładam pół godziny przed Twoją godziną."

---

### `TRESC2608-06` · [SEO] Google pokazuje tytuły sprzed 30.07 na co najmniej trzech trasach — z długimi myślnikami i starym sufiksem (§2.5.1, §2.6.8 planu)
SERP `google.pl`, odczyt 04.08.2026, kontra kod na HEAD `88564ac` · **P1 · — · 🌐 · Z (live + kod)**

| Trasa | Tytuł w SERP 04.08.2026 | Tytuł w kodzie |
|---|---|---|
| `/uslugi` | „Usługi **—** fotografia biznesowa i wideo \| **Marcin Szabunia**" | „Usługi foto i wideo dla firm, Poznań \| Szabunia" |
| `/blog` | „Blog o fotografii biznesowej i wideo \| **Marcin Szabunia**" | „Blog o fotografii i wideo dla firm \| Szabunia" |
| `/galeria` | „Galeria zdjęć i wideo \| Marcin Szabunia **—** fotograf Poznań" | „Galeria kadrów z realizacji \| Szabunia" |
| `/` | „Fotograf eventowy i biznesowy Poznań \| Szabunia" | ✅ zgodne |
| `/kontakt` | „Kontakt i wycena, fotograf Poznań" | ✅ zgodne |

Dodatkowo opis `/uslugi/wizerunek-portrety` w SERP kończy się zdaniem
**„Wizerunek & Portrety, Poznań."** — czyli wewnętrzną nazwą usługi z miastem doklejonym
przecinkiem, dokładnie tym, co `zasady-tekstow.md` zakazuje od 30.07. W kodzie tego zdania nie ma.

**Mechanizm i skutek.** Trzy tytuły w indeksie są sprzed rundy z 30.07, w tym dwa z długim
myślnikiem i trzy ze starym sufiksem. Konsekwencje są dwie i obie ważne. **Pierwsza:** nie da się
dziś zmierzyć, czy przepisanie tytułów zadziałało — porównanie CTR przed i po jest bezprzedmiotowe,
dopóki „po" nie jest w indeksie. Wszystkie wnioski typu „nowy tytuł nie pomógł" są w tej chwili
nieuprawnione. **Druga:** kolejna runda przepisywania tytułów dołoży zmian do kolejki, której
Google jeszcze nie przerobił, i pogłębi rozjazd zamiast go skrócić.

Osobno widać, że Google **przepisuje opisy** co najmniej dla `/` i `/kontakt`: zamiast meta
description bierze zdania z treści („Cześć, jestem Marcin. Od 2018 roku buduję wizerunek firm…",
„Porozmawiajmy o Twoim projekcie…"). To normalne zachowanie i nie jest defektem, ale oznacza,
że dopracowywanie `description` na tych dwóch trasach ma mniejszą dźwignię, niż zakładał
raport z 30.07.

**Zamiennik:** brak — to nie jest finding tekstowy, tylko warunek brzegowy dla całej kolejki
zadań. Krok weryfikujący: powtórzyć ten sam odczyt SERP za dwa tygodnie i porównać tę tabelę.

---

### `TRESC2608-07` · [BIZNES] Profil Firmy w Google: trzy linie usługowe nieobecne, kotwica bez jednostki, jedna usługa celuje w wykluczony segment (§2.6.7 planu)
Profil Firmy „Marcin Szabunia Fotograf Biznesowy", odczyt 04.08.2026 · **P1 · M · 🌐 · Z (panel)**

Stan na 04.08 (kategoria podstawowa: Fotograf; kategoria dodatkowa: Usługi fotograficzne):

| Usługa w Profilu | Cena | Odpowiednik na stronie |
|---|---|---|
| Zdjęcia profilowe i portretowe | Od 1 100 zł | `wizerunek-portrety` ✅ |
| Fotografia korporacyjna | **Od 120 zł** | `sesje-zespolowe` — kotwica jest **za osobę**, w Profilu bez jednostki |
| Fotografia portretowa | Od 1 100 zł | duplikat pozycji pierwszej |
| Produkt | Od 600 zł | `fotografia-produktowa` ✅ |
| Wydarzenia i przyjęcia | Od 600 zł | `eventy-reportaze` ✅ |
| Wideo wizerunkowe / film o firmie | Od 400 zł | `wideo-marketing` ✅ |
| — | — | **`zdjecia-wideo-z-drona` (700 zł): brak** |
| — | — | **`wnetrza-obiekty-architektura` (900 zł): brak** |
| — | — | **`pakiety-foto-wideo` (2 100 zł): brak** |

Opis usługi „Zdjęcia profilowe i portretowe" (widoczny fragment):
> „Sesje portretowe i zdjęcia profilowe **do CV**, LinkedIn oraz mediów społecznościow…"

**Mechanizm i skutek.** Trzy rzeczy naraz. **(1)** Kotwica 120 zł stoi w Profilu jako „Od 120 zł"
bez „/os." — to ten sam błąd, co w JSON-LD `Offer` (finding P2 niżej), ale w miejscu, które
klient czyta częściej niż stronę: realne minimum przy 4 osobach po 180 zł to 720 zł.
**(2)** Trzy linie usługowe nie istnieją w Profilu, w tym najświeższa (900 zł) i najdroższa
(2 100 zł). **(3)** Opis pierwszej usługi aktywnie reklamuje zdjęcia „do CV", czyli segment,
który został **wykluczony w Google Ads od 20.05** i którego raport z 30.07 kazał nie rozbudowywać
(„kandydaci do pracy"). Profil ściąga darmowy ruch dokładnie z tego segmentu, za który przestano
płacić. Pozostałe kwoty są zgodne z kanonem `services.tsx` co do złotówki — to działa dobrze.

**Zamiennik (opis pierwszej usługi):** „Portrety biznesowe i headshoty na LinkedIn, stronę firmy
i materiały handlowe. Studio w Poznaniu albo mobilne studio w Twoim biurze."

**Uwaga metodyczna:** nazw usług w Profilu **nie oceniam** pod zasady redakcyjne — „Produkt",
„Wydarzenia i przyjęcia", „Fotografia korporacyjna" to predefiniowane nazwy Google, których nie
da się przepisać. Oceniam wyłącznie opisy, ceny i kompletność.

---

### `TRESC2608-08` · [TREŚĆ] „brief" żywy na pięciu powierzchniach w `services.tsx`, w tym jako widoczny nagłówek H3 (§2.2.9 planu)
`src/data/services.tsx:168, 271, 273, 274, 498` · **P1 · S · 🤖 · Z (kod + live) / N (status regresu)**

Cytat, `:498` (widoczny `<h3>` kroku procesu na podstronie dronowej):
> `{ num: 1, title: "Brief i zgody", desc: "Ustalamy ujęcia, lokalizację i ewentualne strefy lotów" }`

Cytat, `:271`:
> „Tak. Liczbę godzin, zakres wideo, drona czy wywiady z uczestnikami dopasowuję do skali
> wydarzenia. **Po krótkim briefie** podaję jedną, konkretną wycenę w kilku wariantach."

Cytat, `:274`:
> „Dogrywamy dodatkowe godziny przed eventem, dokładam je do wyceny **na etapie briefu**."

**Mechanizm i skutek.** `Services.tsx:117` niesie komentarz *„Głos strony, bez żargonu «brief»"* —
reguła jest w repo zapisana i łamana pięć plików obok. Do tego dochodzi dziewięć powierzchni
„mini-brief" w lejku poradnika (`PoradnikTeaser.tsx:23`, `PoradnikBlogCTA.tsx:26`,
`poradnik/page.tsx:16,21,36,46,83,117`, `api/lead/route.ts:93` — ostatnia w mailu wysyłanym do
każdego, kto pobierze poradnik).

**Status — świadomie nie nazywam tego regresem.** `PELNY2907-12` figuruje w rejestrze z 29.07
jako **„częściowo wdrożony"**, a §15.2 pkt 9 mówi, że naprawiono „5 podstron (`services.tsx` ×3,
`portfolio.ts` ×2)" bez wyliczenia, których. `services.tsx:498` jest tytułem kroku procesu, więc
albo nie było go w tamtej piątce, albo wrócił — z samego tekstu raportu nie da się rozstrzygnąć.
Pewność: **Z (kod)** dla istnienia, **N** dla statusu. Klasyfikuję jako **niedomknięty ogon
`PELNY2907-12`**, nie jako nowy finding.

**Zamiennik:** `:498` → `title: "Ustalenia"` i `:499` → `title: "Zgody"` (jak `:574` i `:575`
w usłudze obiektowej), albo jednym krokiem `title: "Ustalenia i zgody"` ·
`:271` → „Po krótkiej rozmowie podaję jedną, konkretną wycenę w kilku wariantach."

---

### `TRESC2608-50` · [BIZNES] Podstrona dronowa sprzedaje zakres sekcji 8 pod kotwicą 700 zł, wbrew jawnemu zakazowi w cenniku (§2.4.3 planu)
`src/data/services.tsx:470, 472, 474, 476, 496, 517` vs `cennik_2026_07_v3.md:227, :357` · **P1 · S · 🤖 · Z (kod + cennik)**

Cytat serwis, `services.tsx:472`:
> „Realizuję zdjęcia i wideo z drona: **budynki i obiekty firmowe, hale i magazyny**, tereny i place,
> inwestycje budowlane, architekturę oraz ujęcia eventowe. Przy dużych obiektach robię komplet
> ujęć: **bryła, dach, otoczenie** i drogi dojazdowe."

Cytat cennik, `:357`:
> „**OBIEKT PODSTAWOWY** | Do 8 ujęć z powietrza: **bryła, dach, otoczenie**, kontekst lokalizacji | **900 zł**"

Cytat cennik, `:227` (reguła kierowania, wprost):
> „**Fotografujesz budynek, nie teren? Idź do sekcji 8.** (…) Dokumentacja obiektu, gdzie dochodzą
> kadry z poziomu ziemi, wnętrza albo retusz architektoniczny, ma własne pakiety w **sekcji 8**."

**Mechanizm i skutek.** „Bryła, dach, otoczenie" na podstronie dronowej to **dosłowny zakres
pakietu `OBIEKT PODSTAWOWY`**, opisany pod kotwicą `price: "od 700 zł netto"` (`:496`), która
w cenniku oznacza przebitki 4K (`:209`). To samo dotyczy `subtitle` (`:470`), dwóch pozycji
`forWhom` (`:474` „Deweloperzy i firmy budowlane", `:476` „Firmy przemysłowe i logistyczne
(hale, magazyny, tereny, place)") i `seo.description` (`:517`). Klient szukający dokumentacji hali
trafia na podstronę dronową, widzi 700 zł i zostaje wyceniony z niewłaściwej sekcji: różnica na
zleceniu to **600 zł** (do `OBIEKT KOMPLETNY` 1 300 zł) albo **1 200 zł** (do `OBIEKT PEŁNY` 1 900 zł).

**To jest dokładnie treść `poprawki-dron-2026-08-03-NIEZASTOSOWANY.diff`.** Do tej pory ten diff
był otwartym punktem bez wyceny. Teraz ma wycenę: dopóki nie wejdzie, podstrona dronowa przechwytuje
zapytania z najrentowniejszej linii w firmie i wycenia je 600-1 200 zł poniżej kanonu. Komentarz
w kodzie (`services.tsx:463-464`) potwierdza, że spięcie obu linii zaprojektowano jednokierunkowo:
„to podstrona obiektowa linkuje tutaj". Link idzie z droższej do tańszej, a treść nie odsyła z powrotem.

**Zamiennik:** zastosować diff z 03.08 (`subtitle` → „Ujęcia z powietrza: tereny, place, eventy
i krajobraz. Foto i wideo w 4K.", `forWhom` bez deweloperów i przemysłu) i dopisać w FAQ dronowym
jedno zdanie kierujące: „Potrzebujesz dokumentacji budynku albo hali, nie samego terenu? To osobna
usługa: fotografia hal, obiektów i wnętrz."

---

### `TRESC2608-51` · [BIZNES] Hero linii obiektowej obiecuje „z zewnątrz i od środka" przy kotwicy, która nie kupuje ani jednego kadru naziemnego (§2.4.3, §2.4.10 planu)
`src/data/services.tsx:549, 571` vs `cennik_2026_07_v3.md:357, :359, :370` · **P1 · S · 🧑 · Z (kod + cennik)**

Cytat serwis, `:549` (renderowane w `ServiceHero.tsx:48`):
> „Hale, lokale użytkowe i wnętrza obiektów. **Z zewnątrz i od środka, w jednym dniu zdjęciowym.**"

Cytat serwis, `:571` (renderowane w `ServiceHero.tsx:85`, w tym samym bloku):
> `heroPriceLabel: "pakiety od 900 zł"`

Cytat cennik, `:357`, `:370`:
> „OBIEKT PODSTAWOWY | Do 8 ujęć **z powietrza**: bryła, dach, otoczenie, kontekst lokalizacji | **900 zł**"
> „Blok wnętrz | Do 10 ujęć w jednym obiekcie | **600 zł**"

**Mechanizm i skutek.** Pakiet za 900 zł jest **wyłącznie lotniczy**. Najtańsze „z zewnątrz
i od środka" to `OBIEKT PODSTAWOWY` + blok wnętrz = **1 500 zł**, a komplet z elewacją i wjazdem
z poziomu ziemi to `OBIEKT PEŁNY` = **1 900 zł**. Podtytuł i kotwica stoją obok siebie w hero,
więc klient czyta „wnętrza od 900 zł" i rozjazd wychodzi dopiero przy wycenie: **600 do 1 000 zł
ponad zakotwiczone oczekiwanie**. To ta sama klasa błędu, przed którą ostrzegał brief linii
obiektowej przy wariancie 400 zł: klient „przyjdzie po sesję obiektu za 400 zł i pierwsza rozmowa
zacznie się od tłumaczenia, dlaczego to nie tak". Kotwica została podniesiona do 900, ale podtytuł
nie został do niej dopasowany.

**Zamiennik (`:571`):** `heroPriceLabel: "pakiety od 900 zł, z wnętrzami od 1 500 zł"` —
albo `subtitle` bez obietnicy wnętrz w tym samym oddechu co kotwica.

---

## 5. Ustalenia P2-P4

### P2

**`TRESC2608-09` · [BIZNES] Kolizja kotwicy 900 zł: pakiet obiektowy podstawowy i sesja dronowa to ten sam deliverable za tę samą kwotę** — `services.tsx:570, 585` vs `llms.txt:23` · P2 · M · 🌐 · Z (kod)
Cytat: `services.tsx:585` „Pakiet podstawowy to **do 8 ujęć z powietrza**." przy `:570` `price: "od 900 zł netto"`. Cytat: `llms.txt:23` „**Zdjęcia z drona (do 8 wyretuszowanych ujęć, 50 Mpix) 900 zł**".
**Zweryfikowane w cenniku v3 (drugie przejście):** kolizja jest realna, ale **powstała w kanonie, nie w serwisie**. Cennik ma dwa produkty po 900 zł za tę samą policzalną dostawę — `:208` „Zdjęcia z drona, do 8 wyretuszowanych ujęć z powietrza (50 Mpix) | 900 zł" i `:357` „OBIEKT PODSTAWOWY | Do 8 ujęć z powietrza | 900 zł". Różnią się **wyłącznie** retuszem architektonicznym i plikami w dwóch wersjach (`:361`), a nie liczbą ujęć, medium ani liczbą wylotów. Cennik rozstrzyga granicę regułą kierowania (`:227`), nie ceną.
**Wina serwisu jest inna, niż zakładało pierwsze przejście:** strona **nie pokazuje tej wąskiej różnicy** na progu 900 zł, a `services.tsx:584` twierdzi coś, co przy 900 zł jest nieprawdą („Sesja obiektu łączy powietrze z poziomem ziemi (…) tańsza będzie sesja dronowa") i co przeczy zdaniu dwie linie niżej (`:585`: „Pakiet podstawowy to do 8 ujęć z powietrza"). Odpowiedź z `:584` jest prawdziwa dopiero od `OBIEKT KOMPLETNY` (1 300 zł). Klient porównujący dwie podstrony widzi identyczny produkt w dwóch cenach i wybierze tańszą, bo strona nie daje mu powodu, żeby dopłacić. Druga różnica z kanonu — dodatkowe ujęcie 150 zł (`:379`) wobec 80 zł przy dronie (`:224`) — nie występuje w serwisie ani razu.
Zamiennik: „Sesja dronowa to ujęcia z powietrza. Sesja obiektu daje ten sam kadr z retuszem architektonicznym, czyli korektą perspektywy i prostowaniem linii, plus pliki w wersji do druku i pod www. Od pakietu kompletnego dochodzi poziom ziemi."

**`TRESC2608-10` · [TREŚĆ] Dwa cytaty opinii rozjechane między plikami, w tym jeden z przeredagowanym zdaniem klientki** — `services.tsx:752, 764` vs `Testimonials.tsx:12, 19` · P2 · S · 🧑 · Z (kod)
Nie oceniam treści cytatów (granica zamknięta). Zgłaszam wyłącznie rozjazd zapisu: wersja w `services.tsx` **nie jest przycięciem** — dwa zdania zostały zlepione w jedno, którego w oryginale nie ma („zadbał **o to, aby**" → „zadbał, aby"). Cytat podpisany imieniem, nazwiskiem, firmą i słowami „opinia Google" musi dać się porównać z Google 1:1.
Zamiennik: jedna stała importowana w trzech miejscach; skracanie zostawić `line-clamp`, tak jak już działa w `Testimonials.tsx:111`.

**`TRESC2608-11` · [SEO] JSON-LD `hasOfferCatalog` opisuje ofertę, której nie ma** — `layout.tsx:233, 242, 253, 262` · P2 · M · 🤖 · Z (kod) [stop-condition §10.3]
`name: "Pakiety Foto + Wideo + Dron"` (Title Case, jedyny taki wśród siedmiu) kontra `services.tsx:239` „Pakiety eventowe: foto + wideo + dron". `name: "Fotografia biznesowa i portretowa"` — fraza **nie występuje w serwisie ani razu**. Opis `:253` deklaruje „filmy **rekrutacyjne**", `:262` „fotografia **przemysłowa**" — obu podstrony usług nie sprzedają. Siedem pozycji przy ośmiu usługach.
Zamiennik konstrukcyjny: `serviceCategories.map((s) => ({ name: s.title, description: s.subtitle }))`.

**`TRESC2608-12` · [SEO] Kanibalizacja klastra packshot: trzy indeksowane trasy, 0 kliknięć** — `services.tsx:451`, `blog.ts` (`co-to-jest-packshot`, `fotografia-produktowa-ecommerce`) · P2 · L · 🧑 · Z (kod) + Z (GSC 04.08)
GSC, 3 miesiące do ~1.08: `packshot poznań` 126 wyśw. / **0 klik.**, `fotografia produktowa poznań` 106 / 0, `packshot` 94 / 0, `fotografia produktowa poznan` 75 / 0, `packshoty poznań` 70 / 0. Strona `/uslugi/fotografia-produktowa`: **541 wyświetleń, 2 kliknięcia.** Trzy własne strony z „fotografia produktowa" albo „packshot" w H1 rozkładają jeden klaster.
Zamiennik (kierunek): `/uslugi/fotografia-produktowa` zostaje stroną transakcyjną na „packshot poznań"; `/blog/co-to-jest-packshot` zostaje stroną czysto definicyjną (H1 „Co to jest packshot? Słownik pojęć fotografii, które warto znać" już nią jest — nie wymaga zmiany, wymaga tylko, żeby nie dokładać do niego fraz transakcyjnych); `/blog/fotografia-produktowa-ecommerce` przechodzi na intencję „zdjęcia produktowe a sprzedaż w sklepie internetowym".

**`TRESC2608-13` · [SEO] Kanibalizacja „headshoty zespołu" powstała po 30.07** — `services.tsx:180, 222`, `blog.ts:1585`, `portfolio.ts:595` · P2 · M · 🧑 · Z (kod) + N (efekt)
30.07 usługa nazywała się „Sesje zespołowe & headshoty" i była jedyną stroną z tą frazą w tytule. Po przepisaniu `title: "Headshoty zespołu w biurze i w studiu"` niemal pokrywa się z `title: "Headshoty całego zespołu w jeden dzień"` (blog) i `title: "Przykłady headshotów zespołu: studio i biuro"` (draft portfolio). To jedyna kanibalizacja w tym audycie, którą **wytworzyła poprzednia runda redakcyjna**.
Zamiennik (wpis blogowy): „Sesja zdjęciowa dla całego zespołu: jak ją zorganizować | Szabunia".

**`TRESC2608-14` · [SEO] „Wizerunek & Portrety" — nazwa wymyślona wewnętrznie, przeciekła na pięć powierzchni i do SERP-a** — `services.tsx:292` (+ `:209`, `llms.txt:20`) · P2 · M · 🧑 · Z (kod + live)
`service.title` renderuje się na karcie `/`, karcie `/uslugi`, jako `name` w `ItemList` JSON-LD, jako ostatni okruszek i jako `alt` zdjęcia hero („**Wizerunek & Portrety, Poznań**"). W GSC (04.08, 163 zapytania) nie ma ani jednego z ampersandem. `h1` tej usługi jest poprawny („Portrety biznesowe i headshoty") — poprawka z 30.07 objęła H1 i `seo.title`, a `title` została. **To ten sam mechanizm, którym „z jednego wejścia" dorobiło się 25 wystąpień** (`zasady-tekstow.md:54`). Dodatkowo „&" nie jest polskim spójnikiem, a „Portrety" wielką literą w środku nazwy to angielski title case.
Zamiennik: `title: "Portrety biznesowe"` (spójne z `h1` i z etykietą w formularzu).

**`TRESC2608-15` · [SEO] Cztery nazwy jednej usługi obiektowej: „hale" tylko w tytule, „architektura" tylko w H1** — `services.tsx:523, 524, 543, 594` · P2 · S · 🧑 · Z (kod + live)
`h1: "Fotografia wnętrz, obiektów i architektury"` · `title: "Fotografia hal, obiektów i wnętrz, Poznań | Szabunia"` · `title` karty: „Wnętrza, obiekty i architektura" · `h2Faq: "Fotografia obiektów: najczęstsze pytania"`. Słowo „hale" jest wyłącznie w tytule SERP-owym, słowo „architektura" wyłącznie w H1. Najmocniejszy sygnał na stronie i tekst w wyniku wyszukiwania celują w dwa różne zapytania, a strona jest **jedyną w swoim klastrze**, więc nie ma czym tego nadrobić.
Zamiennik: `h1: "Fotografia hal, obiektów i wnętrz"`.

**`TRESC2608-16` · [SEO] `slownik-pojec-wideo`: z tytułu zniknęła fraza pytająca, na jedynej stronie, gdzie wąskim gardłem był tekst** — `blog.ts:991` · P2 · S · 🧑 · Z (kod) + N (efekt)
`title: "B-roll, setka, recap: słownik wideo | Szabunia"` przy H1 nietkniętym: „Co to jest b-roll? Słownik pojęć wideo, które warto znać". Raport z 30.07 §2 wskazał tę stronę jako jedyną, gdzie „problemem faktycznie jest tytuł i opis, a nie pozycja" (poz. 8,50, 165 wyśw., 0 klik.). Zapytania to pytania: `b roll co to`, `co to jest b-roll`, `co to b-roll`. Nowy tytuł formy pytającej nie zawiera.
Zamiennik: `title: "Co to jest b-roll? Słownik pojęć wideo | Szabunia"` (49 zn.).

**`TRESC2608-17` · [SEO] H1 na `/kontakt` nie potwierdza żadnego słowa z tytułu** — `kontakt/page.tsx:12` vs `:99` · P2 · S · 🧑 · Z (kod + live) + N (efekt)
`title: "Kontakt i wycena, fotograf Poznań | Szabunia"` kontra H1 „Porozmawiajmy o Twoim projekcie" — zero wspólnych rdzeni. GSC 04.08: `/kontakt` 111 wyświetleń, 1 kliknięcie. Użytkownik klika wynik obiecujący wycenę, a pierwsze zdanie strony jej nie potwierdza.
Zamiennik: „Napisz, czego potrzebujesz. Wstępną wycenę odsyłam w 24h".

**`TRESC2608-18` · [TREŚĆ] Akapity-lustrzanki: sześć opisów otwiera identyczna konstrukcja „X to fundament/wizytówka Y"** — `services.tsx:187, 296, 415`, `portfolio.ts:389, 499, 554` · P2 · M · 🧑 · Z (kod)
„Spójne headshoty zespołu **to fundament** employer brandingu." · „Zdjęcia produktowe **to fundament** sprzedaży online." · „Portret biznesowy **to Twoja wizytówka** na LinkedIn (…)" · „Wizerunek kadry zarządzającej **to wizytówka** całej firmy." Powtarza się nie tylko pierwsze zdanie, ale i drugie („Tworzę…" / „Przyjeżdżam…"). Żadne nie niesie faktu, liczby ani nazwy klienta.
Zamiennik (`:415`): „Na marketplace klient kupuje to, co widzi na zdjęciu. Robię packshoty na białym tle, zgodne z wymogami Allegro i Amazona, z retuszem w cenie."

**`TRESC2608-19` · [TREŚĆ] Język prezentacji na kafelku z plakietką „Bestseller"** — `services.tsx:243, 249` · P2 · S · 🧑 · Z (kod)
„Pakiet **hybrydowy** to jeden dzień zdjęciowy i **dwa formaty na wyjściu**. (…) **Rezultat:** spójny wizualnie **content** na wszystkie kanały" + „Firmy z regularnymi potrzebami **contentowymi**". Cztery żargonizmy w trzech zdaniach, na jedynym kafelku, na którym strona sprzedaje najmocniej.
Zamiennik: „Jeden dzień zdjęciowy, na wyjściu zdjęcia i film. Nagrywam i fotografuję sam, więc nie koordynujesz dwóch ekip ani dwóch terminów."

**`TRESC2608-20` · [TREŚĆ] „Poseboard" — słowo spoza języka i spoza wyszukiwarki, dziesięć wystąpień, a w jednym zdaniu obok „moodboardu"** — `services.tsx:296, 315, 320`, `faq.ts:24`, `portfolio.ts:389, 407`, `blog.ts:171, 199, 1012, 1029` · P2 · S · 🧑 · Z (kod)
Pomiar: `grep -rni "poseboard" src/` → **10 linii** (8 wielkością liter zgodnych z „poseboard", 2 z „Poseboard"), `grep -rn "moodboard" src/` → **1**.
Cytat, `blog.ts:171` — oba słowa w jednym zdaniu:
> „**2. Poseboard.** Przygotowuję **moodboard** z referencjami, żebyśmy oboje wiedzieli, do czego dążymy."
Standardowy termin to „moodboard" i serwis go zna — używa go dokładnie raz, obok wymyślonego „poseboardu" jako nazwy kroku. Reszta serwisu (6 miejsc poza blogiem, w tym widoczny `<h3>` kroku procesu na dwóch podstronach usług) używa wyłącznie „poseboard", słowa, którego nie ma ani w polszczyźnie, ani w zapytaniach. To dwa problemy naraz: nazwa własna zamiast terminu i niekonsekwencja w obrębie jednego zdania.
Zamiennik: `title: "Moodboard"`, desc: „Wysyłam przykładowe kadry i pozy, żebyś wiedział, czego się spodziewać." · `blog.ts:171` wchodzi do rundy redakcyjnej bloga, nie do tej poprawki.

**`TRESC2608-21` · [SEO] `/galeria`: opis obiecuje kategorię, której nie ma, i przemilcza tę, która jest** — `galeria/page.tsx:25, 102-104, 173, 192` · P2 · S · 🌐 · Z (kod)
Opis meta zapowiada „**sesje zespołowe**" jako kategorię do przeglądania — w tablicy `defs` nie ma klucza `zespolowe`. Jednocześnie kategoria `wnetrza` („Wnętrza i hale", 12 opisów alternatywnych, dodana 04.08) nie występuje ani w opisie, ani w leadzie, ani w JSON-LD. To ten sam wzorzec, co pułapka z 03.08 (odesłanie do sekcji, która się nie renderuje).
Zamiennik: „Kadry z eventów firmowych, portrety, wnętrza i hale, packshoty oraz ujęcia z drona. Przegląd po kategoriach. Poznań i cała Polska."

**`TRESC2608-22` · [SEO] Meta drona obiecuje „dron w cenie pakietów hybrydowych", czego na tej podstronie nie ma** — `services.tsx:517` · P2 · S · 🌐 · Z (kod)
Fraza „w cenie" nie występuje na podstronie dronowej ani razu, a `llms.txt:17` i `:23` mówią „+200 zł". Obietnica jest prawdziwa wyłącznie dla pakietów EVENT, których ta podstrona nie opisuje. Opis ma przy okazji 157 znaków przy progu 155.
Zamiennik: „Ujęcia 4K budynków, hal i magazynów, terenów i inwestycji. Certyfikat A1/A3 i OC operatora. Dron łączę z sesją naziemną. Poznań i cała Polska." (**142 zn., przeliczone skryptem**)

**`TRESC2608-23` · [SEO] JSON-LD `Offer` dla sesji zespołowych deklaruje 120 zł jako cenę usługi** — `uslugi/[slug]/page.tsx:81-82, 112` + `services.tsx:201` · P2 · S · 🤖 · Z (kod)
`const priceMatch = service.price.match(/\d[\d\s]*\d|\d/);` zjada wszystko po liczbie, więc do `PriceSpecification` trafia `120` jako minimalna cena usługi, przy widocznym „od 120 zł netto/os." i progu 31 osób. Realne minimum to 4 × 180 = 720 zł. Dla siedmiu pozostałych usług ten sam kod działa poprawnie — to jedyna kotwica z jednostką. **Ten sam błąd powtarza się w Profilu Firmy** (`TRESC2608-07`), więc to jedna przyczyna w dwóch systemach.
Zamiennik: pole `jsonLdMinPrice` w `ServiceData`, dla `sesje-zespolowe` kwota pakietu minimalnego.

**`TRESC2608-24` · [BIZNES] „W 48h dostajesz galerię online" nie istnieje w żadnych warunkach** — `Process.tsx:30` vs `Warunki.tsx:69`, `faq.ts:48`, `llms.txt:28` · P2 · S · 🌐 · Z (kod)
`Process.tsx` renderuje się na stronie głównej i na `/galeria`, więc zobowiązanie pada dwa razy na ścieżce decyzyjnej. Warunki, FAQ i `llms.txt` o terminie galerii milczą. Dodatkowo dwie linie niżej ta sama liczba znaczy co innego: „Ekspres do 48h dostępny" (dopłata +50%).
Zamiennik: albo wpisać ten termin do warunków, albo „Galerię online z wszystkimi ujęciami dostajesz do zaznaczenia kadrów do retuszu."

**`TRESC2608-25` · [TREŚĆ] Nazwa usługi w pięciu wariantach: kafelek, H1, `title`, formularz, `llms.txt`** — `services.tsx:229, 239, 278`, `CTA.tsx:448`, `api/contact/route.ts:91`, `llms.txt:19` · P2 · M · 🌐 · Z (kod + live)
Kafelek: „Pakiety eventowe: foto + wideo + dron" · H1: „Zdjęcia, film i dron na event firmowy" · `title`: „Pakiety eventowe: foto, wideo i dron" · formularz i mail z leadem: „**Pakiet foto + wideo**" (dron wypadł z nazwy) · `llms.txt`: „Pakiety foto + wideo". Drugi przypadek: `CTA.tsx:442` „**Reportaż z eventu**" — nazwa, której nie sprzedajesz nigdzie na stronie, a po której segmentujesz leady.
Zamiennik konstrukcyjny: `<option>` generowane z `serviceCategories.map((s) => ({ value: s.slug, label: s.title }))` i ta sama mapa w `SERVICE_LABELS`.

**`TRESC2608-52` · [BIZNES] Blurb cenowy portretów obiecuje studio w cenie pakietu, a cennik v3 to zmienił** — `services.tsx:320` vs `cennik_2026_07_v3.md:80, :302-304, :585` · P2 · S · 🧑 · Z (kod + cennik)
Cytat serwis: „(…) **Każda sesja obejmuje** darmowy poseboard z referencjami przed spotkaniem **oraz studio dopasowane do Twojego projektu**."
Cytat cennik `:585` (nota „co nowego w v3"): „**Studio wychodzi z ceny pakietu portretowego.** Wynajem kosztuje 375-600 zł i płaciłeś go sam. (…) Teraz: mobilne w cenie, zewnętrzne jako opcja." Cennik `:302-304`: studio zewnętrzne 400 / 800 / 1 300 zł.
„Studio dopasowane do Twojego projektu" na liście „każda sesja obejmuje" czyta się jako studio zewnętrzne w cenie 1 100 zł. Per v3 w cenie jest wyłącznie mobilne. Blurb wchodzi też do FAQ cenowego i do JSON-LD `FAQPage` (`getPriceFaq`, `services.tsx:683-693`), więc obietnica idzie do Google. Ryzyko na zlecenie: **375-600 zł kosztu**, który klient uważa za wliczony.
Zamiennik: „Każda sesja obejmuje moodboard z referencjami przed spotkaniem oraz mobilne studio u Ciebie albo plener. Studio zewnętrzne w Poznaniu rezerwuję na życzenie, jako osobną pozycję."

**`TRESC2608-53` · [BIZNES] Podstrona dronowa obiecuje bezterminowe darmowe przekładanie terminu przy złej pogodzie** — `services.tsx:509` vs `cennik_2026_07_v3.md:388` · P2 · S · 🤖 · Z (kod + cennik)
Cytat serwis: „Silny wiatr lub opady uniemożliwiają bezpieczny lot. W takiej sytuacji **bezpłatnie przekładamy termin na najbliższy możliwy**." (bez limitu)
Cytat cennik: „Jeśli pogoda albo brak zgody uniemożliwi wylot, **wracam raz w ramach ustalonej kwoty. Kolejne podejście: 300 zł plus dojazd.**"
Dwa inne miejsca serwisu mają wersję poprawną (`llms.txt:36` i `services.tsx:587` na podstronie obiektowej), więc rozjazd jest lokalny i tym trudniejszy do wyłapania. Przy trzeciej nieudanej próbie klient ma na stronie zdanie, którym uzasadni odmowę dopłaty.
Zamiennik: „Silny wiatr lub opady uniemożliwiają bezpieczny lot. W takiej sytuacji wracam raz w ramach ustalonej kwoty; kolejne podejście to 300 zł plus dojazd."

**`TRESC2608-54` · [BIZNES] Serwis pozwala zamówić blok wnętrz osobno, cennik zna go tylko jako moduł dokładany do sesji** — `services.tsx:590` vs `cennik_2026_07_v3.md:363-365, :370` · P2 · S · 🧑 · Z (kod + cennik)
Cytat serwis: „(…) **Blok wnętrz można dołożyć do sesji obiektu albo zamówić osobno.**"
Cytat cennik `:363-365`: „### Moduły osobno — *Do dołożenia do sesji, na którą i tak przyjeżdżam, albo do zlecenia z innej sekcji.*"
„Moduły osobno" znaczy w cenniku „wyceniane osobno od pakietu", nie „sprzedawane jako samodzielne zlecenie". Zdanie z serwisu otwiera drogę do bloku wnętrz za 600 zł jako pojedynczego wyjazdu: przy narzucie stałym 3,0 h na zlecenie i normatywie 0,20 h na kadr wnętrzarski to **5 godzin pracy za 600 zł, czyli 120 zł/h**, poniżej progu firmy (150-170 zł/h). Podważa też uzasadnienie własnej kotwicy 900 zł, które stoi na tym, że moduły nie są samodzielnym zleceniem.
Zamiennik: „(…) Blok wnętrz dokładam do sesji obiektu albo do innej realizacji w tym samym dniu."

### P3

**`TRESC2608-55` · [BIZNES] Model rozliczenia opisany w trzech miejscach serwisu nie ma odpowiednika w cenniku** — `llms.txt:27`, `Warunki.tsx:58`, `faq.ts:68` vs `cennik_2026_07_v3.md:411` · P3 · S · 🧑 · Z (kod + cennik)
Cytat serwis: „**Po pierwszym retuszu** wysyłam proformę razem z podglądem materiału ze znakiem wodnym; 7 dni na akceptację, **brak odpowiedzi oznacza akceptację**."
Cytat cennik: „**Po akceptacji wyceny otrzymujesz proformę**, a po jej opłaceniu system automatycznie generuje i wysyła fakturę VAT. Termin płatności: 7 dni."
To nie jest rozbieżność kwotowa, tylko **rozbieżność momentu wystawienia proformy i zapisu o milczącej akceptacji**, którego kanon nie zna. Komentarz w kodzie (`Warunki.tsx:13`) datuje decyzję na 31.07, więc jest świadoma — dotarła do trzech plików serwisu i nie dotarła do cennika. **Kierunek rozjazdu jest odwrotny niż w pozostałych findingach tej osi: to kanon jest do uzupełnienia, nie serwis.**

**`TRESC2608-56` · [BIZNES] Serwis zapowiada dopłatę za nocleg, której cennik nie ma w żadnej pozycji** — `faq.ts:28`, `blog.ts:392` vs `cennik_2026_07_v3.md:42` · P3 · S · 🧑 · Z (kod + cennik)
Cytat serwis: „(…) **Przy dłuższych wyjazdach (powyżej jednego dnia pracy) doliczany jest również nocleg.**"
Cytat cennik: „Dojazd na terenie Poznania: 0 zł. Poza miastem: 2,50 zł/km." — i nic więcej o logistyce wielodniowej w całym pliku.
Strona anonsuje obciążenie, dla którego nie ma ani kwoty, ani sposobu liczenia w kanonie. Każda realizacja wielodniowa będzie liczona od zera i za każdym razem inaczej. Kierunek jak wyżej: serwis jest bogatszy od kanonu.

**`TRESC2608-57` · [SEO] `llms.txt` publikuje partię „do 15 zdjęć" bez ceny zdjęcia ponad partię** — `llms.txt:17` vs `cennik_2026_07_v3.md:189-190` · P4 · S · 🤖 · Z (kod + cennik)
Cytat serwis: „dostawa tego samego dnia **400 zł (partia do 15 zdjęć)**"
Cytat cennik `:190`: „każde kolejne zdjęcie w partii ponad 15 | **40 zł**"
Kwota 40 zł nie występuje w serwisie ani razu. Model językowy cytujący `llms.txt` poda klientowi 400 zł bez informacji, że partia jest limitowana cenowo. To pominięcie po stronie `llms.txt`, nie brak decyzji.

**`TRESC2608-26` · [TREŚĆ] „stanowią" — słowo z pisma urzędowego w odpowiedzi FAQ o RAW-ach, plus tautologia w tym samym zdaniu** — `faq.ts:52` · P3 · S · 🤖 · Z (kod)
„Otrzymujesz starannie wyselekcjonowane i poddane autorskiej postprodukcji materiały, które **stanowią** gotowy, spójny produkt." Trzy imiesłowy przed rzeczownikiem, konstrukcja z pisma. W sąsiednim zdaniu tego samego pola: „**udostępnienie** kompletu plików RAW **jest dostępne** jako opcja dodatkowa" — ten sam rdzeń dwa razy w jednym orzeczeniu, w zdaniu o dopłacie +30%.
Zamiennik: „Dostajesz wybrane i obrobione zdjęcia, gotowe do użycia. Jeśli potrzebujesz pełnej kontroli nad postprodukcją, komplet plików RAW udostępniam jako opcję dodatkową: +30% wartości zlecenia, z decyzją przed sesją."

**`TRESC2608-27` · [TREŚĆ] Nieodmieniona nazwa „Grupa Forte S.A." po przyimku „dla"** — `Publications.tsx:61` · P3 · S · 🤖 · Z (kod)
„Zdjęcia, które wykonałem **dla Grupa Forte S.A.** na targach meblowych w Poznaniu, trafiły do kwietniowego wydania Big Furniture Group Magazine (…)". „Dla" wymaga dopełniacza; „grupa" to zwykły rzeczownik pospolity. Mianownik po przyimku to twardy błąd fleksyjny, w akapicie budującym prestiż. **Zawężone wyłącznie do tego miejsca** — w `About.tsx:62`, `layout.tsx:291` i `llms.txt:10` nazwa stoi w wyliczeniu marek, gdzie mianownik jest broniony konwencją cytowania.
Zamiennik: „(…) wykonałem **dla Grupy Forte S.A.** na targach meblowych (…)".

**`TRESC2608-28` · [TREŚĆ] Pytanie FAQ obejmuje oba rodzaje, odpowiedź tylko męski** — `faq.ts:35-36` · P3 · S · 🤖 · Z (kod)
Pytanie: „Co jeśli nie jestem **fotogeniczny/a**?" Odpowiedź: „(…) ustawiam lustro przed modelem, żebyś **mógł** na bieżąco widzieć siebie (…)". Kobieta, która kliknęła to pytanie właśnie dlatego, że było adresowane do niej, dostaje odpowiedź nie do siebie.
Zamiennik: „(…) ustawiam lustro przed osobą fotografowaną, żeby na bieżąco widzieć siebie i poprawiać drobne detale."

**`TRESC2608-29` · [TREŚĆ] „Co jeśli" bez przecinka — cztery pytania FAQ, jedna przyczyna** — `faq.ts:35, 43`, `services.tsx:274, 509` · P3 · S · 🤖 · Z (kod)
„jeśli" otwiera zdanie podrzędne i wymaga przecinka przed sobą. Te pytania trafiają też do JSON-LD `FAQPage`.
Zamiennik: „Co, jeśli pogoda nie dopisze?"

**`TRESC2608-30` · [TREŚĆ] „Odpowiadam w 24 godziny wstępną wyceną i wolnym terminem" — szyk i brak przyimka, w `description` trasy `/kontakt`** — `kontakt/page.tsx:14` (identycznie `:19`, `:34`) · P3 · S · 🤖 · Z (kod)
Okolicznik czasu wciśnięty między orzeczenie a dopełnienie, a narzędnik bez przyimka daje „odpowiadam wolnym terminem". Kanoniczna wersja w `CTA.tsx:158` jest zbudowana poprawnie: „Odpowiadam w ciągu 24h, ze wstępną wyceną i propozycją terminu."
Zamiennik: wersja z `CTA.tsx:158`, plus rozbicie zlepka z `kontakt/page.tsx:156-157` („(…) co Cię interesuje**.** Wstępną wycenę przygotuję w 24h.").

**`TRESC2608-31` · [TREŚĆ] Trzy osoby gramatyczne w jednym pliku `llms.txt`** — `llms.txt:3, 8, 41, 42` · P3 · S · 🤖 · Z (kod)
„**Bazuję** w Poznaniu" (1. os.) · „**Działa od**: 2018" (3. os.) · „Czy **dojeżdżasz** poza Poznań?" (2. os.) · „Ile osób **można** sfotografować?" (bezosobowo, przy `faq.ts:63` „Ile osób **możesz**"). Model językowy cytujący ten plik odtworzy niespójny głos marki.
Zamiennik: `- Działam od: 2018` oraz „Ile osób możesz sfotografować w jeden dzień?"

**`TRESC2608-32` · [TREŚĆ] „Email" w `llms.txt` — niedomknięty ogon korekty z 02.08** — `llms.txt:47` · P3 · S · 🤖 · Z (kod)
W `src/` konsekwentnie „E-mail" (8 miejsc). To jedyne pozostałe wystąpienie w projekcie; korekta nie objęła `public/`.
Zamiennik: `- E-mail: marcin@szabunia.pl`

**`TRESC2608-33` · [TREŚĆ] „48 h" i „48h" w jednym pliku, dziesięć razy** — `llms.txt:17-20` vs `:28, :33, :40` · P3 · S · 🤖 · Z (kod)
Sekcja cennika zapisuje godziny ze spacją („4 h", „8 h", „48 h"), sekcja warunków i FAQ bez („48h", „24h"). Kanon w serwisie to zapis bez spacji.

**`TRESC2608-34` · [TREŚĆ] Zakresy liczbowe w trzech notacjach: „10-15", „10–15", „10 do 15"** — `services.tsx:167, 205, 215, 223`, `faq.ts:64`, `portfolio.ts:425, 571`, `llms.txt:42` · P3 · M · 🤖 · Z (kod)
Ten sam fakt kanoniczny zapisany dywizem (9 miejsc), półpauzą (`blog.ts:510`) i słownie (`services.tsx:167`, `:223` — w tym w `description` SEO). Inne zakresy w serwisie mają poprawną półpauzę („1–3 tyg.", „2–3 zestawy"). Zgodnie z anty-wzorcem: niekonsekwencja, nie błąd ortograficzny. Wyłączone: oznaczenia sprzętu („Sigma 70-200 mm").

**`TRESC2608-35` · [TREŚĆ] „stronę WWW" i „pod www" w jednym pliku** — `services.tsx:551, 577, 595` vs `:187, :510`; `faq.ts:60` · P3 · S · 🤖 · Z (kod)
Skrótowiec raz wersalikami, raz minuskułą, w tym samym pliku i między plikami (`portfolio.ts` konsekwentnie „WWW"). Poprawny zapis skrótowca to wersaliki.

**`TRESC2608-36` · [TREŚĆ] „&" jako polski spójnik w stopce widocznej na każdej podstronie** — `Footer.tsx:21` · P3 · S · 🤖 · Z (kod)
„Fotograf biznesowy **&** twórca wideo". Ta sama fraza w `layout.tsx:287` (`jobTitle`) i w mailu z `api/lead/route.ts:102` brzmi poprawnie: „Fotograf biznesowy **i** twórca wideo". Nazwy własne („Yes Butcher! Shop & Bistro") są poprawne i ich nie ruszam.

**`TRESC2608-37` · [SEO] Deskryptor zawodowy w pięciu wariantach, w tym w dwóch systemach zewnętrznych** — `manifest.json:2`, `layout.tsx:146, 287`, `Footer.tsx:21`, Profil Firmy, Ads · P3 · S · 🌐 · Z (kod + panel)
„Marcin Szabunia **— Fotograf biznesowy**" (`manifest.json`) · „Marcin Szabunia, **fotograf eventowy i biznesowy**" (JSON-LD) · „**Fotograf biznesowy i twórca wideo**" (`jobTitle`) · „**Marcin Szabunia Fotograf Biznesowy**" (Profil Firmy, odczyt 04.08) · „**Marcin Szabunia Fotograf**" (nazwa firmy wyświetlana w RSA, odczyt SERP 04.08). Decyzja z 30.07 postawiła event na pierwszym miejscu; **cztery z pięciu deskryptorów go nie mają**. `manifest.json` dokłada „Profesjonalna fotografia biznesowa" jako jedyne określenie, czyli frazę z czarnej listy.

**`TRESC2608-38` · [SEO] Cztery opisy przekraczają 155 znaków o 1-2 znaki** — `services.tsx:517`, `blog.ts:920, 1586, 1639` · P3 · S · 🤖 · Z (kod)
157, 157, 157 i 156 zn. Jedyne cztery przekroczenia w serwisie; domyka temat z 30.07 (wtedy było pięć opisów >160 zn.).

**`TRESC2608-39` · [SEO] Trzy opisy marnują 38-45 znaków, w tym dwa na stronach z listy problemów CTR** — `services.tsx:398` (110 zn.), `kontakt/page.tsx:13` (115), `poradnik/page.tsx:15` (117) · P3 · S · 🧑 · Z (kod) + N (efekt)
Przy medianie 137 i limicie 155. `/uslugi/wideo-marketing` i `/kontakt` to dwie z czterech stron, które raport z 30.07 nazwał realnym problemem CTR. Odwrotny problem niż `TRESC2608-38` i większy.
Zamiennik (`:398`): „Filmy o firmie, reelsy, wywiady i relacje z eventów. Nagranie i montaż u jednego twórcy, bez koordynowania dwóch ekip. Poznań i cała Polska." (139 zn.)

### P4

**`TRESC2608-40` · [TREŚĆ] „Profesjonalny" jako jedyne określenie — trzy pola w `portfolio.ts`** — `portfolio.ts:387, 408, 443` · P4 · S · 🤖 · Z (kod)
„**Profesjonalna** sesja w studiu lub biurze" jako opis kroku o nazwie „Sesja" jest szczególnie puste. Wszystkie trzy w kategoriach `DRAFT_SLUGS`, ale `generateStaticParams` (`portfolio/[slug]/page.tsx:18-22`) filtruje wyłącznie `externalUrl`, więc trasy renderują się i są osiągalne pod bezpośrednim adresem (mają tylko `noindex`).

**`TRESC2608-41` · [TREŚĆ] Wykrzykniki w komunikatach potwierdzenia** — `CTA.tsx:316`, `PoradnikForm.tsx:93` · P4 · S · 🤖 · Z (kod)
„Wiadomość wysłana**!**" · „Gotowe, pobieranie ruszyło**!**". Jedyne dwa w serwisie poza cytatami i nazwą własną „Yes Butcher!". `CTA.tsx:316` pada zaraz przed rzeczowym „Dziękuję za kontakt. Wstępną wycenę odeślę w ciągu 24h."

**`TRESC2608-42` · [TREŚĆ] Gwiazdka ★ doklejona do etykiety realizacji, trafia do JSON-LD** — `portfolio.ts:329` · P4 · S · 🤖 · Z (kod)
`label: "Yes Butcher!: sesja do przewodnika Michelin ★"` renderuje się jako podpis kafelka na `/` i `/portfolio` **oraz jako `name` pozycji `ItemList`** (`portfolio/page.tsx:57`). Gwiazdka przy Michelinie sugeruje gwiazdkę Michelin, której lokal nie ma (jest w przewodniku).

**`TRESC2608-43` · [TREŚĆ] Angielskie etykiety kroków procesu w polskim pasku** — `services.tsx:380`, `portfolio.ts:518` · P4 · S · 🤖 · Z (kod)
„**Concept** / Nagranie / Montaż / Dostawa" · „Retusz — **Clipping path**, korekta kolorów". W `services.tsx:433` ten sam krok został już przepisany na „Wycięcie z tła", więc `portfolio.ts` po prostu został z tyłu.

**`TRESC2608-44` · [SEO] `og:site_name`, `og:locale` i `og:type` istnieją tylko na stronie głównej** — `layout.tsx:44-47` vs 50 tras z własnym blokiem `openGraph` · P4 · S · 🤖 · **Z (live)**
**Hipoteza potwierdzona pomiarem 04.08:** na `/uslugi/wnetrza-obiekty-architektura` odczyt z wyrenderowanej strony daje `og:site_name` = **BRAK**, `og:locale` = **BRAK**, `og:type` = **BRAK**. Next.js scala `metadata` płytko, więc dziecko definiujące własny `openGraph` zastępuje cały obiekt rodzica. Karty udostępnień na LinkedIn i Facebooku dla wszystkich podstron tracą nazwę serwisu i język.
Zasięg policzony: własny blok `openGraph` ma 10 plików tras (7 statycznych + 3 dynamiczne
rozwijające się do 43 tras) = **50 tras**; `/` i `404` dziedziczą z `layout.tsx`.
Zamiennik: stała `const OG_BASE = { siteName: "Marcin Szabunia", locale: "pl_PL", type: "website" as const }` i `...OG_BASE` w każdym bloku.

**`TRESC2608-45` · [SEO] Trasa 404 nie ma własnego `openGraph`** — `not-found.tsx:6-10` · P4 · S · 🤖 · Z (kod) + H (render)
Jedyna z 52 tras bez bloku. Przy płytkim scalaniu odziedziczy `openGraph` z `layout.tsx`, więc wklejony martwy link pokaże kartę sugerującą, że działa. Strona jest `noindex`, więc liczy się tylko udostępnianie.

**`TRESC2608-46` · [TREŚĆ] Komunikaty błędów raz z kropką, raz bez — 2 na 12** — `api/contact/route.ts:26-171`, `api/lead/route.ts:27-158` · P4 · S · 🤖 · Z (kod)
Te stringi trafiają wprost na ekran (`CTA.tsx:101`), jeden pod drugim przy kolejnych próbach. `CTA.tsx:54` łamie zasadę w obrębie jednego stringa: „Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na marcin@szabunia.pl" — pierwsze zdanie z kropką, drugie bez.

**`TRESC2608-47` · [TREŚĆ] „bezcookiesowe" — hybryda polskiego przedrostka i angielskiej liczby mnogiej w dokumencie prawnym** — `polityka-prywatnosci/page.tsx:216-219` · P4 · S · 🤖 · Z (kod)
Osobno: baner mówi „pliki **cookie**" (`CookieConsent.tsx:63`), polityka „pliki **cookies**" (5 miejsc), stopka „Ustawienia **cookies**". PWN zaleca „pliki cookie".

**`TRESC2608-48` · [TREŚĆ] „mini-brief" — cząstka „mini-" z łącznikiem, dziewięć powierzchni, w tym mail do każdego leada** — `PoradnikTeaser.tsx:23`, `PoradnikBlogCTA.tsx:26`, `poradnik/page.tsx:16, 21, 36, 46, 83, 117`, `api/lead/route.ts:93` · P4 · S · 🧑 · Z (kod)
Poprawny zapis to „minibrief", ale to nadal zostawia w treści słowo „brief" zdejmowane od 29.07 — dlatego 🧑, decyzja należy do Marcina.
Zamiennik: „Checklisty, planer stylizacji, ściąga kolorów i gotowa lista pytań w jednym pliku PDF."

**`TRESC2608-49` · [SEO] `readTime` deklaruje 5-8 minut przy treści na 2-3 minuty — 22 wpisy na 26** — `blog.ts`, render `BlogCard.tsx:37` · P4 · M · 🧑 · Z (pomiar)
Mediana **84 słowa na minutę** przy realnej prędkości czytania po polsku ~200 słów/min. Skrajny przypadek: `zdjecie-do-cv-w-domu` — 362 słowa, deklarowane 8 minut (45 słów/min). Wg proponowanej formuły `ceil(words/200)` **zgadzają się dziś 4 wpisy z 26, zawyżonych jest 22**. Etykieta maskuje diagnostycznie fakt, że **17 z 26 wpisów mieści się w paśmie 327-458 słów**. Blog bez redakcji wstecznej — zgłaszam jako pomiar.
Zamiennik: `readTime = ceil(words / 200)` — dla obecnych treści 2-6 min zamiast 5-8.

---

## 6. Hipotezy do sprawdzenia (H)

| ID | Hipoteza | Krok weryfikujący |
|---|---|---|
| `H-1` | Kolejka reindeksacji obejmuje więcej niż trzy trasy z `TRESC2608-06` — sprawdziłem tylko te, które trafiły do jednego SERP-a | odczytać SERP dla `site:szabunia.pl` z 50 wynikami i porównać wszystkie tytuły z tabelą metadanych |
| `H-2` | Alty na `/galeria` powtarzają się realnie, nie tylko mechanizmem: `GalleryView.tsx:31-36` rotuje warianty przez `i % length`, a `portrety` ma 5 wariantów, `produktowe` 4 | policzyć pliki w `public/images/galeria/<folder>` — w kopii audytowej tego katalogu nie ma |
| `H-3` | Fraza „fotografia hal" ma realny popyt, a „fotografia architektury" nie — nowa usługa celuje H1 w to drugie | filtr GSC po `hal\|magazyn\|architekt\|wnętrz` na oknie 3 miesięcy; dziś w top-10 zapytań żadnego z nich nie ma |
| `H-4` | Opisy usług w Profilu Firmy zawierają dalsze rozjazdy — widziałem tylko pierwsze ~90 znaków każdego | otworzyć każdą pozycję w Profilu; **przy próbie odczytu 04.08 panel zawiesił się na formularzu edycji, wycofałem się bez zapisu** |
| `H-5` | Pełne listy 15 nagłówków i 4 opisów każdej RSA zawierają frazy z czarnej listy — widziałem 3 nagłówki i 1 opis na reklamę | odczyt „Wyświetl szczegóły komponentu"; **04.08 zablokowane komunikatem „Turn off ad blockers"** |
| ~~`H-6`~~ | ~~Cudzysłowy w prozie `blog.ts`~~ **Zweryfikowane w trakcie, przestaje być hipotezą:** `blog.ts` zawiera **48 znaków „ (U+201E) i zero znaków ” (U+201D)** — każdy cudzysłów otwierający jest domykany prostym `"`. Pewność `Z (pomiar)`. **Poza zakresem redakcji wstecznej bloga**, wchodzi do listy rundy redakcyjnej w briefach |

---

## 7. Obserwacje bez akcji

1. **`http://szabunia.pl/` figuruje w GSC jako osobna strona** — 3 kliknięcia i 17 wyświetleń
   w oknie 3 miesięcy (odczyt 04.08). To warstwa techniczna (przekierowanie http → https),
   wykluczona z tego audytu. **Przekazuję z dowodem osi technicznej**, nie zgłaszam jako findingu.
2. **`/uslugi/fotografia-produktowa` rośnie:** 541 wyświetleń i 2 kliknięcia w oknie 3 miesięcy do
   ~1.08, przy 444 wyświetleniach i 0 kliknięć w oknie do 27.07. Pierwsze kliknięcia na tej trasie.
3. **`/blog/ile-kosztuje-sesja-wizerunkowa-dla-firmy`: 309 wyświetleń, 0 kliknięć** —
   największa pojedyncza zerowa pozycja w serwisie. Nie zgłaszam jako findingu, bo raport z 30.07
   zamknął tę stronę jako „problem rankingowy, nie tekstowy" (poz. 25,66); przy 309 wyświetleniach
   warto sprawdzić, czy pozycja się poprawiła — jeśli tak, klasyfikacja się zmienia.
4. **Profil na Facebooku ma ponad 1,4 tys. obserwujących** i publikuje treści w zupełnie innym
   głosie niż serwis (widoczne w SERP 04.08). Linkowanie FB to otwarty temat z 09.06, nie błąd —
   ale gdyby kiedyś wszedł do `sameAs`, warstwa tekstowa tamtego profilu wymaga osobnego przejścia.

---

## 8. Świadomie NIE ruszamy

- **Cytaty klientów** w `Testimonials.tsx` i pola opinii w `portfolio.ts` — zawierają frazy
  z czarnej listy i tak zostają. Jedyne, co zgłosiłem, to rozjazd zapisu tej samej wypowiedzi
  między plikami (`TRESC2608-10`), nigdy jej treść.
- **Cennik, tabela cen, sekcja „Cennik"** — nie proponuję i nie sugeruję jako ulepszenia SEO.
  Kotwice „od X zł" zostają jedynym miejscem z kwotą.
- **Słowo „cennik" w nagłówkach i pytaniach FAQ** — zostaje, jest wpisywane w wyszukiwarkę.
- **Redakcja wsteczna `blog.ts`** — plik wszedł diagnostycznie. Produktem jest lista wpisów
  do rundy redakcyjnej w `BRIEFY-TRESC-2026-08-04.md`, nie przepisane akapity.
- **Depricing z 23.07, brak `aggregateRating`, brak `priceRange`, brak LinkedIn i Facebooka
  w `sameAs`, ceny w `llms.txt`, dwa `<LogoBar/>`, alias `--font-barlow`** — decyzje zamknięte.
- **Hasło „REALIZUJĘ CELE TWOJEJ MARKI"** w `Hero.tsx:44` — oblewa test nadrzędny, ale komentarz
  w `Hero.tsx:34-40` dokumentuje decyzję Marcina z 30.07: „H1 to fraza, hasło zostaje jako element
  graficzny w H2". Świadomie nie zgłaszam.
- **Rejestr urzędowy w polityce prywatności** („niniejszy", „powyższy") — to dokument prawny,
  zakres `zasady-tekstow.md` go nie obejmuje.
- **Nazwy usług w Profilu Firmy** („Produkt", „Wydarzenia i przyjęcia") — predefiniowane przez
  Google, nie da się ich przepisać.

---

## 9. Czego NIE sprawdzono i czego potrzeba

### 9.1 Pokrycie — X z Y

| Zbiór | Pokryte | Uwaga |
|---|---|---|
| `src/data/services.tsx` | **784 / 784 linie = 100%** | przeczytane w całości przez trzy niezależne osie |
| `src/data/portfolio.ts` | **645 / 645 = 100%** | pola `testimonial.quote` pominięte zgodnie z granicą |
| `src/data/faq.ts` | **78 / 78 = 100%** | |
| `src/data/galeria.ts` | **24 / 24 = 100%** | |
| `public/llms.txt` | **70 / 70 = 100%** | |
| `src/app/**` | **18 / 18 plików = 100%** | |
| `src/components/**` | **48 / 48 = 100%** kopii widocznej | metoda mieszana, patrz niżej |
| `api/contact` + `api/lead` | **333 / 333 = 100%** | łącznie z treścią maili |
| `src/lib/galleryImages.ts` | **130 / 130 = 100%** | nie zawiera tekstu dla użytkownika |
| Trasy z metadanymi | **52 / 52 = 100%** | mierzone skryptem |
| Wpisy bloga | **26 / 26** dla `title`/`description`/H1/objętości; **0 / 26** dla prozy | proza wyłączona z zakresu |
| Alty | **25 miejsc w `src/` + 63 w `portfolio.ts` + 35 wariantów + 9 wpisów `META`** = wszystkie | |
| Pary do kanibalizacji | **1 326 przeliczonych**, 14 powyżej progu | |
| RSA w Ads | **4 z 4 aktywnych**, ale **3 z 15 nagłówków i 1 z 4 opisów każdej** | patrz 9.2 |
| Usługi w Profilu Firmy | **6 z 6 + 2 duplikaty**, opisy **do ~90 znaków** | patrz 9.2 |

**Uczciwie o metodzie w komponentach:** 21 plików przeczytanych linia po linii w pełnym brzmieniu
(`Hero`, `Process`, `About`, `CTA` 566 linii w trzech przejściach, `Publications`, `Footer`,
`Warunki`, `PoradnikForm`, `CookieConsent` i in.). Pozostałe 27 przeszły przez skrypt usuwający
komentarze i wypisujący **każdą linię z polskim znakiem diakrytycznym**, plus osobny przebieg na
stringi czysto ASCII. To pokrywa praktycznie całą kopię, ale z jedną dziurą, którą deklaruję:
string złożony wyłącznie ze znaków ASCII i spoza listy awaryjnej (np. hipotetyczne „Menu", „Start")
mógł się prześlizgnąć. **Szacuję pokrycie kopii w tych 27 plikach na ~98%, nie 100%.**

### 9.2 Czego nie udało się zdobyć

1. **Pełne teksty RSA — `N`.** Widok „Wyświetl szczegóły komponentu" w Google Ads został
   zablokowany komunikatem **„Turn off ad blockers. Google Ads can't work when you're using an ad
   blocker."** Nie wyłączam rozszerzeń w przeglądarce Marcina. Mam pierwsze trzy nagłówki i pierwszy
   opis każdej z czterech reklam (to, co realnie się wyświetla), nie mam pozostałych 12 nagłówków
   i 3 opisów na reklamę. **Potrzebne:** jedno przejście przy wyłączonym blokerze albo eksport CSV
   raportu komponentów.
2. **Pełne opisy usług w Profilu Firmy — `N` częściowe.** Widziałem pierwsze ~90 znaków każdego
   z sześciu opisów. Przy próbie otwarcia pierwszego panel zawiesił się na formularzu edycji;
   **wycofałem się przez nawigację, bez zapisu i bez zmian**. Nie mam też opisu firmy (about).
   **Potrzebne:** ręczne przejście po sześciu pozycjach.
3. **Świeży eksport GSC z rozbiciem na zapytania × strony — `N`.** Odczytałem top-10 zapytań
   (z 163) i top-10 stron (z 43) przez interfejs. Nie mam pełnej listy ani przekrojów, więc
   `H-3` (popyt na „hale" kontra „architektura") zostaje hipotezą.
4. **Liczba plików w katalogach galerii — `N`.** `public/images/` nie było w kopii roboczej,
   więc hipoteza `H-2` o powtarzających się altach na `/galeria` opisuje mechanizm, nie skalę.
5. **Proza 26 wpisów bloga — świadomie poza zakresem.** Przejrzana diagnostycznie w ~60%
   (wszystkie kwoty, terminy, linki do `/uslugi/*`, odesłania „znajdziesz/poniżej", mapa
   `blogServiceMap`, daty). Nie czytałem wpisów w całości.
6. **Treść PDF-a poradnika** (`public/poradnik-przygotowanie-do-sesji.pdf`) — plik binarny, poza
   zakresem. To ten sam otwarty punkt, co 29.07: nadal nie wiadomo, czy zawiera ceny albo
   odesłania do nieistniejących sekcji.
7. ~~**`cennik_2026_07_v2.md` poza repo**~~ — **luka zamknięta w trakcie audytu.** Aktualny
   `cennik_2026_07_v3.md` okazał się dostępny w `01_Biznes/_System/02_Cenniki/`; cały serwis
   został z nim porównany (§2.5, findingi `TRESC2608-50`…`-57`). **Nie sprawdzone zostało:**
   kierunek kanon → cennik (skrypt Marcina `sprawdz_kanon_vs_cennik.mjs` nie ruszył, bo w katalogu
   brakuje `kanon.json`, którego wymaga w linii 19) oraz pięć z ośmiu powierzchni wymienionych
   w procedurze cennika (`szablony_mailowe_v5.md`, `MASTER_Umowa`, `kalkulator_zlecenia.md`,
   `JEDNO_ZRODLO_PRAWDY.md`, `sprawdz_spojnosc.mjs`).
8. **GA4** — nie otwierałem. Zakres tego audytu jest tekstowy; pomiar wchodzi tylko tam, gdzie
   tekst go psuje (`TRESC2608-03`).

---

## 10. Pozorne problemy skorygowane w trakcie

Sekcja obowiązkowa. Wszystkie poniższe wyglądały na findingi i **nie weszły do ustaleń**.

1. **161 długich myślników w `src/`.** `grep -c "—"` daje 169 w `src/` (plus 1 w `public/robots.txt`). Klasyfikator śledzący stan
   komentarza blokowego (`/* */`, `{/* */}`) i liniowego, z pominięciem `//` wewnątrz stringów,
   pokazał, że 161 to komentarze projektowe („Radial-gradient zamiast filter:blur — wydajność
   na mobile"). **Nie zgłaszam żadnego.** To był największy pojedynczy fałszywy pozytyw tego audytu
   i dokładnie ten, na którym poległy audyty Gemini i ChatGPT.
2. **`"—"` w `api/contact/route.ts:137-139`.** Wygląda w grepie identycznie jak naruszenie. To
   fallback w HTML-u maila **do Marcina**, gdy klient nie podał telefonu. Nie jest copy dla klienta.
3. **Zdublowany pasek procesu na podstronie obiektowej.** Odczyt na żywo pokazał cztery kroki
   dwa razy. Sprawdzenie łańcucha klas: druga kopia ma `md:hidden` i `getBoundingClientRect()`
   zwraca `0 × 0`. **To wariant responsywny, nie duplikat treści** — dokładnie anty-wzorzec
   z §11 metodyki.
4. **„warto opowiedzieć" w `portfolio.ts:445` jako regres.** Dwie osie zgłosiły to jako powrót
   sprawy zamkniętej 02.08. Sprawdzenie źródła: `PRZEGLAD-REDAKCYJNY-2026-08-02.md:81` wskazuje
   lokalizację **„eventy"**, czyli `services.tsx` — i tam frazy faktycznie nie ma. W `portfolio.ts`
   to **drugie wystąpienie, którego tamten przegląd nie wyliczył**. Klasyfikacja: niedomknięty
   ogon, **nie regres**. Nie zgłaszam jako findingu.
5. **„Yes Butcher!" jako naruszenie zakazu wykrzykników — 12 wystąpień.** To część nazwy własnej
   restauracji (potwierdzone linkiem do przewodnika Michelin i domeną `yesbutcher.pl`
   w `portfolio.ts:340,343`).
6. **`★★★★★` w `Testimonials.tsx` i na podstronach usług.** Wizualizacja oceny 5/5, element
   interfejsu, nie ozdobnik w prozie. Zgłaszam wyłącznie pojedynczy `★` doklejony do etykiety
   tekstowej (`TRESC2608-42`).
7. **`&bdquo;` + `&rdquo;` jako mieszanka cudzysłowów.** Sprawdzone po kodach znaków: to
   **poprawna polska para** (U+201E + U+201D). Odrzucone.
8. **`w steakhousie` kontra `steakhouse'u`.** Wyglądało na niekonsekwencję apostrofu. Obie formy
   są poprawne: dopełniacz „steakhouse'u" (apostrof przed końcówką, bo końcowe „e" jest nieme)
   i miejscownik „steakhousie" (końcówka -ie wypiera nieme „e").
9. **„my" włączające w `services.tsx:337` („kogo i do czego fotografujemy").** Złapane przez
   filtr liczby mnogiej. To „my" obejmujące Marcina i klienta, ten sam rejestr co „Ustalamy
   harmonogram", „Zaczynamy od krótkiej rozmowy" — serwis używa go konsekwentnie i to nie jest
   „nasz zespół". Nie jest naruszeniem kanonu solo creatora.
10. **17 „triad" typu „momenty, emocje i interakcje".** Wzorzec składniowy zgadza się z przykładem
    z zasad, ale reguła mówi o **triadach przymiotników**. Wszystkie 17 to wyliczenia
    rzeczownikowe konkretów.
11. **`<img>` bez `alt` w `GalleryView.tsx:357` i „wnętrza/obiekty" w `llms.txt`.** Pierwsze to
    komentarz `{/* next/image zamiast surowego <img> … */}` (faktyczny element ma `alt`
    w linii 362). Drugie to trafienia na `obiektywy` i `zewnętrznego` — **co potwierdza
    `TRESC2608-03`, a nie mu przeczy.**

### 10.1 Błędy własne wyłapane przez adwersarialną weryfikację i poprawione przed oddaniem

Ostatni krok audytu to subagent, którego zadaniem było **obalić** ten raport, a nie go potwierdzić.
Zweryfikował 49 findingów co do cytatu i numeru linii, przeliczył tabelę metadanych własnym
skryptem i sprawdził wszystkie anty-wzorce z §11 metodyki. **35 findingów przeszło bez zastrzeżeń,
zero fałszywych pozytywów z §11, zero relitygowanych decyzji handlowych.** Znalazł natomiast
błędy w moim własnym raporcie, które poprawiłem przed oddaniem — wypisuję je, bo to ta sama
klasa błędów, na której ten projekt już raz poległ:

| Co było źle | Jak było | Jak jest |
|---|---|---|
| **Sfabrykowany wynik grepa** w `TRESC2608-20` | „moodboard → 0, poseboard → 6" | moodboard → **1** (`blog.ts:171`, w jednym zdaniu z „Poseboard"), poseboard → **10 linii**. Teza findingu przepisana, bo stary dowód ją obalał |
| **Zmyślona długość znaków** w `TRESC2608-22` | zamiennik opisany jako 147 zn. | faktycznie miał **161 zn.**, czyli łamał próg, którego finding pilnuje. Zamiennik skrócony do **142 zn.**, przeliczone skryptem |
| **Błędna atrybucja cytatu klienta** w `TRESC2608-10` | „Cytat Formalika w dwóch brzmieniach" | zlepek dotyczy **Burzyńskiej**; kopia Formalika jest skrócona i przestawiona, ale bez zlepku. Rejestr i §2.3 poprawione, dopisany wiersz dla Burzyńskiej |
| **Błędny rozkład priorytetów** | P1 = 8, P4 = 9 | **P1 = 7, P4 = 10.** Suma 49 zgadzała się tylko dlatego, że dwa błędy się znosiły |
| **Fałszywa deklaracja w §2.2** | „zero regresów w «Social Media»" | w `blog.ts` jest **9 wystąpień** wielką literą. Deklaracja poprawiona, dodana §2.5 z pomiarem ośmiu otwartych punktów |
| Siedem złych numerów linii i liczników | `portfolio.ts:550`, `route.ts:97`, „8 opcji `<select>`", „51 tras", „64 alty", „131 linii", „170 myślników", „×8 mini-brief", „25 z 26 `readTime`" | wszystkie przeliczone i poprawione |
| Twierdzenie bez mianownika | „klaster cenowy to 24% zapotrzebowania" | zastąpione liczbą, którą faktycznie zmierzyłem: 178 wyświetleń na trzech frazach przy 2 730 w oknie |
| Hipoteza, która była już faktem | `H-6` cudzysłowy w `blog.ts` | zmierzone: **48 × U+201E, 0 × U+201D**. Przeklasyfikowane z `H` na `Z (pomiar)` |

**Dziewiąty błąd, wyłapany osobno i najkosztowniejszy.** Pierwsze przejście uznało cennik biznesowy
za niedostępny i oceniało wszystkie ceny względem `services.tsx`, czyli względem kopii zamiast
źródła. Aktualny cennik **był dostępny przez cały czas** w katalogu `01_Biznes/_System/02_Cenniki/`,
a Marcin ma w preferencjach zapisane wprost, żeby kwoty i nazwy pakietów sprawdzać właśnie tam.
Skutek: `TRESC2608-09` (kolizja 900 zł) stał na tezie „serwis podaje dwie ceny za to samo",
a po sprawdzeniu w kanonie okazało się, że **kolizja pochodzi z cennika**, a wina serwisu jest inna:
nie pokazuje wąskiej różnicy, którą kanon zna. Finding został przepisany, nie skasowany.
Przy okazji doszło osiem findingów, których pierwsze przejście nie mogło zobaczyć
(`TRESC2608-50` do `-57`), w tym dwa P1 i jeden wart 600-1 200 zł na pojedynczym zleceniu.

**Wniosek dla następnego audytu:** osiem z dziewięciu błędów to ta sama przyczyna — **twierdzenie
liczbowe przepisane z pamięci zamiast z wyniku komendy.** Reguła „nie cytuj z pamięci" obejmuje
także wyniki grepa i długości stringów, nie tylko zdania z plików.

---

## 11. Plan działania, posortowany kolejnością wdrożenia

### Quick wins poniżej godziny — zrobić przed wszystkim

| # | Zadanie | ID | Plik |
|---|---|---|---|
| 1 | Dopisać ósmą usługę do `llms.txt` (specjalizacja + pozycja cennikowa) | `TRESC2608-03` | `public/llms.txt` |
| 2 | Dodać opcję obiektową do formularza i do `SERVICE_LABELS` w API | `TRESC2608-03` | `CTA.tsx`, `api/contact/route.ts` |
| 3 | Dopisać usługę obiektową do mapy opinii | `TRESC2608-03` | `services.tsx:783` |
| 4 | Zamienić formy „Wy" na „ty" w usłudze obiektowej i w `:168` | `TRESC2608-02` | `services.tsx` (7 linii) |
| 5 | Ujednolicić czas sesji wizerunkowej do 90 minut | `TRESC2608-05` | `services.tsx:324` |
| 6 | Uzupełnić warunki zmiany terminu w FAQ i usunąć „7 dni na dodatkowe poprawki" | `TRESC2608-04` | `faq.ts:44` |
| 7 | „Email" → „E-mail", „48 h" → „48h" | `TRESC2608-32/33` | `public/llms.txt` |
| 8 | „dla Grupa Forte S.A." → „dla Grupy Forte S.A." | `TRESC2608-27` | `Publications.tsx:61` |
| 9 | „&" → „i" w stopce | `TRESC2608-36` | `Footer.tsx:21` |
| 10 | Skrócić cztery opisy do ≤155 zn. | `TRESC2608-38` | `services.tsx:517`, `blog.ts` ×3 |
| 11 | **Zastosować `poprawki-dron-2026-08-03-NIEZASTOSOWANY.diff`** (leży gotowy od 03.08) | `TRESC2608-50` | `services.tsx:470, 474, 476` |
| 12 | Dopisać limit „wracam raz" do FAQ dronowego | `TRESC2608-53` | `services.tsx:509` |
| 13 | „studio dopasowane do Twojego projektu" na „mobilne studio u Ciebie albo plener" | `TRESC2608-52` | `services.tsx:320` |

### Kolejność właściwa

1. **Decyzja o licencji** (`TRESC2608-01`). Blokuje wszystko inne w warstwie warunków — nie ma
   sensu redagować `Warunki.tsx`, zanim wiadomo, co ma tam być napisane.
2. **Granica dron kontra obiekty** (`TRESC2608-50`, `-51`, `-09`). Gotowy diff leży w repo od 03.08,
   a od 04.08 ma po drugiej stronie żywą podstronę, której odbiera zapytania. Najwyższy stosunek
   zysku do nakładu w całym audycie: jedno `git apply` plus dwa zdania.
3. **Domknięcie ósmej usługi** (`TRESC2608-03`) + quick wins 1-6. To jedyne rzeczy, które
   działają natychmiast, bez czekania na Google.
4. **Profil Firmy** (`TRESC2608-07`). Trzy pozycje do dodania, jeden opis do przepisania, jedna
   cena do uzupełnienia o jednostkę. Poza kodem, robota Marcina, około 30 minut.
5. **Reszta rozjazdów spójności** (`TRESC2608-09`, `-10`, `-11`, `-21`, `-22`, `-23`, `-24`, `-25`).
6. **Warstwa redakcyjna** (`TRESC2608-18`, `-19`, `-20`, `-26`…`-36`).
7. **Architektura tematów** (`TRESC2608-12`, `-13`, `-14`, `-15`, `-16`, `-17`) — **dopiero po
   potwierdzeniu, że Google przeczytał zmiany z 30.07** (`TRESC2608-06`). Wcześniej to dokładanie
   do kolejki, której nie widać.
8. **Runda redakcyjna bloga** — osobny projekt, lista w briefach.

### Data kontrolna re-audytu: **1 września 2026**

Metryki mierzone tą samą metodą i z jednej serii:

| Metryka | Wartość dziś (04.08.2026) | Jak mierzyć |
|---|---|---|
| Tytuły w SERP zgodne z kodem | **2 z 5 sprawdzonych** | ten sam odczyt SERP, ta sama tabela `TRESC2608-06` |
| Usługi w `llms.txt` | 7 z 8 | `grep -c "uslugi/" public/llms.txt` |
| Opcje formularza | 9 (placeholder + 7 usług + „Inne") przy 8 usługach | odczyt `<select>` na żywo |
| Podstrony usług z cytatem opinii | 7 z 8 | odczyt „opinia Google" na żywo |
| Formy „Wy" w `services.tsx` | 7 form w 6 liniach |
| Diff dronowy z 03.08 zastosowany | **nie** |
| Kotwice zgodne z cennikiem v3 | 7 z 8 |
| Rozbieżności `llms.txt` kontra cennik | **0 na 47 kwot** | `grep -c "ecie\b\|Dla Was"` z weryfikacją kontekstu |
| Unikalność `title` / `description` | 52/52, 52/52 | ten sam skrypt |
| Opisy >155 zn. | 4 | ten sam skrypt |
| GSC: kliknięcia / wyświetlenia / CTR / pozycja, 3 mies. | 24 / 2 730 / 0,9% / 23,2 | GSC, okno 3 miesiące, **z datą danych** |
| GSC: `/uslugi/fotografia-produktowa` | 541 wyśw. / 2 klik. | j.w. |
| Ads: konwersje / koszt konwersji, 30 dni | 3,00 / 159,79 zł | Ads, okno 30 dni |
| Profil Firmy: usługi / opinie | 6 (+2 duplikaty) / 10 | odczyt Profilu |

---

## 12. Decyzje dla Marcina

### D1 · Brzmienie licencji w Warunkach współpracy (`TRESC2608-01`) — stop-condition `CLAUDE.md §10.7`

**Pytanie zamknięte: czy klient kupuje licencję na użytek komercyjny, czy na własny użytek?**

| Wariant | Co robimy | Koszt | Ryzyko | Odwracalność |
|---|---|---|---|---|
| **A (rekomendowany)** | `Warunki.tsx:91` przepisane na „użytek komercyjny Twojej firmy: strona, social media, druk i reklama online" — zgodnie z trzema pozostałymi powierzchniami | 1 linia | żadne: to potwierdzenie tego, co i tak obiecujesz w FAQ i w `llms.txt` | pełna |
| **B** | Trzy pozostałe powierzchnie przepisane na „własny użytek klienta", z wyliczeniem pól eksploatacji jak w `llms.txt:30` | 3 linie | **wysokie**: klient B2B czytający FAQ może odczytać zawężenie oferty | pełna, ale po zmianie w JSON-LD `FAQPage` |
| **C** | Nie robić nic | 0 | sprzeczność zostaje na produkcji; przy sporze wygrywa interpretacja korzystniejsza dla klienta, czyli i tak wariant A, tylko po kłótni | — |

**Rekomendacja: A.** Trzy z czterech powierzchni już to mówią, `llms.txt` to doprecyzowuje,
a cały model biznesowy jest B2B. **Kryterium sukcesu:** po zmianie `grep -rn "własny użytek" src/`
daje zero, a `grep -rn "użytek komercyjny" src/ public/` daje cztery spójne wystąpienia.
**Termin: przed najbliższą wysyłką oferty.**

### D2 · Czy przepisywać tytuły teraz, czy poczekać na reindeksację (`TRESC2608-06`)

| Wariant | Co robimy | Ryzyko |
|---|---|---|
| **A (rekomendowany)** | Zamrażamy zmiany w `title`/`description` do 1.09. Robimy wyłącznie rzeczy niezależne od indeksu: ósma usługa, spójność, Profil Firmy, warunki | tracimy ~4 tygodnie na ewentualnych poprawkach CTR |
| **B** | Przepisujemy `slownik-pojec-wideo` i `/kontakt` mimo wszystko (dwie trasy z najmocniejszym uzasadnieniem) | dokładamy do kolejki; nie da się rozdzielić efektu obu rund |
| **C** | Pełna runda tytułów teraz | jak B, ale na 52 trasach: efekt rundy z 30.07 przepada jako pomiar bezpowrotnie |

**Rekomendacja: A.** **Kryterium sukcesu:** 1.09 powtórzyć odczyt SERP z `TRESC2608-06`; jeśli
5 z 5 tytułów zgadza się z kodem, rundę tytułów można odblokować i mierzyć.

### D3 · Nazwa usługi „Wizerunek & Portrety" (`TRESC2608-14`)

| Wariant | Co robimy | Zasięg zmiany |
|---|---|---|
| **A (rekomendowany)** | `title: "Portrety biznesowe"` — zrównanie z `h1` i z etykietą w formularzu | karta `/`, karta `/uslugi`, okruszek, `ItemList` JSON-LD, `alt` hero, `llms.txt`, zdanie w `services.tsx:209` |
| **B** | Zostawić, poprawić tylko „&" na „i" i małą literę: „Wizerunek i portrety" | 2 znaki, ale nazwa nadal wewnętrzna |
| **C** | Nie robić nic | precedens „z jednego wejścia" powtarza się; przy każdej kolejnej powierzchni koszt naprawy rośnie |

**Rekomendacja: A.** **Kryterium sukcesu:** `grep -rn "Wizerunek &" src/ public/` → 0. **Termin: 1.09.**

### D4 · Czy dodawać do Profilu Firmy trzy brakujące linie (`TRESC2608-07`)

**Pytanie zamknięte: czy dron, obiekty i pakiety mają być w Profilu Firmy?**
Rekomendacja: **tak dla drona i obiektów** (obie mają własne podstrony i kotwice), **nie dla
pakietów** (to konfiguracja, nie usługa katalogowa, i kotwica 2 100 zł w Profilu odstraszy).
Osobno: **usunąć „do CV" z opisu pierwszej usługi** — segment wykluczony w Ads od 20.05.
**Kryterium sukcesu:** Profil pokazuje 7 usług bez duplikatów, kotwica sesji zespołowych ma
jednostkę „/os.", opis pierwszej usługi nie zawiera „CV". **Termin: 1.09.**

### D5 · „mini-brief" w lejku poradnika (`TRESC2608-48`)

Zapis „mini-brief" jest niepoprawny (powinno być „minibrief"), ale poprawna pisownia zostawia
w treści słowo zdejmowane od 29.07. **Wariant A (rekomendowany):** wymienić na „gotowa lista pytań"
na wszystkich dziewięciu powierzchniach, łącznie z mailem do leada. **Wariant B:** poprawić
na „minibrief". **Wariant C:** zostawić. Rekomendacja A, bo domyka `PELNY2907-12` przy okazji.

### D6 · Kotwica linii obiektowej: 900 zł na stronie kontra „od 400 zł" w nagłówku sekcji 8 cennika (`TRESC2608-51`)

`services.tsx:570` mówi „od 900 zł netto", cennik `:347` ma nagłówek sekcji „od 400 zł", a `:357`
pakiet wejściowy 900 zł. Brief linii obiektowej zostawił ten wybór Marcinowi i rekomendował 900,
podając trzecie wyjście: **zostawić 400 w cenniku i dopisać tam jedno zdanie, że nagłówek opisuje
moduł, a nie pakiet**. Serwis wziął 900; zdania w cenniku nie ma. Argument za 900 stoi: 400 zł to
„Blok naziemny obiektu" z tabeli modułów, które cennik opisuje jako „do dołożenia do sesji, na którą
i tak przyjeżdżam", czyli nie są samodzielnym zleceniem.

**Pytanie zamknięte: czy 900 zł zostaje jako kotwica publiczna?**

- **Wariant A (rekomendowany):** tak, a w cenniku dopisujemy jedno zdanie przy nagłówku sekcji 8.
- **Wariant B:** kotwica schodzi do 400 zł. Odradzam, brief przewidział skutek: „pierwsza rozmowa
  zacznie się od tłumaczenia, dlaczego to nie tak".
- **Wariant C:** nie robić nic. Kanon i serwis podają dwie różne liczby, a przy kolejnej turze cen
  ktoś to zsynchronizuje w złą stronę.

**Kryterium sukcesu:** nagłówek sekcji 8 cennika i `heroPriceLabel` na stronie podają tę samą liczbę
albo cennik jawnie wyjaśnia różnicę. **Termin: przed pierwszą wyceną obiektową.**

### D7 · Dwie luki, w których kanon jest uboższy od serwisu (`TRESC2608-55`, `-56`)

To jedyne dwa findingi tego audytu, w których **do poprawy jest cennik, nie strona**: model
rozliczenia „po pierwszym retuszu plus milcząca akceptacja" (decyzja z 31.07, w trzech plikach
serwisu, brak w cenniku) oraz dopłata za nocleg przy wyjazdach wielodniowych (zapowiadana
w `faq.ts:28` i w blogu, brak stawki w kanonie). **Pytanie zamknięte: uzupełniamy cennik czy
zdejmujemy zapisy ze strony?** Rekomendacja: uzupełnić cennik, bo obie rzeczy są prawdziwe
i klient i tak o nie zapyta. **Termin: przy najbliższej turze cennika.**

---

## Rejestr findingów

| ID | Skrót | Oś | P | Pewność | Owner | Status |
|---|---|---|---|---|---|---|
| TRESC2608-01 | Licencja: „własny" vs „komercyjny" | 3 | **P0** | Z (kod+live) | 🧑 | otwarty → **D1** |
| TRESC2608-02 | Forma „Wy" w usłudze obiektowej | 1+2 | P1 | Z (kod+live) | 🤖 | otwarty |
| TRESC2608-03 | Ósma usługa na 0 z 8 spisów ręcznych | 3 | P1 | Z (kod+live) | 🌐 | otwarty |
| TRESC2608-04 | FAQ korzystniejsze niż Warunki | 3 | P1 | Z (kod) | 🧑 | otwarty |
| TRESC2608-05 | Sesja „od 30 min" vs „od 90 min" | 3 | P1 | Z (kod) | 🧑 | otwarty |
| TRESC2608-06 | SERP pokazuje tytuły sprzed 30.07 | 4 | P1 | Z (live+kod) | 🌐 | otwarty → **D2** |
| TRESC2608-07 | Profil Firmy: braki, jednostka, CV | 5 | P1 | Z (panel) | 🌐 | otwarty → **D4** |
| TRESC2608-08 | „brief" na 5 powierzchniach | 1 | P1 | Z (kod) / N (regres) | 🤖 | ogon `PELNY2907-12` |
| TRESC2608-09 | Kolizja 900 zł dron ↔ obiekt | 3 | P2 | Z (kod) | 🌐 | otwarty |
| TRESC2608-10 | Cytaty Formalik i Burzyńska rozjechane między plikami | 3 | P2 | Z (kod) | 🧑 | otwarty |
| TRESC2608-11 | `hasOfferCatalog` opisuje nieistniejącą ofertę | 3 | P2 | Z (kod) | 🤖 | otwarty [§10.3] |
| TRESC2608-12 | Kanibalizacja packshot | 4 | P2 | Z (kod+GSC) | 🧑 | otwarty |
| TRESC2608-13 | Kanibalizacja headshoty, powstała po 30.07 | 4 | P2 | Z (kod) / N (efekt) | 🧑 | otwarty |
| TRESC2608-14 | „Wizerunek & Portrety" | 4 | P2 | Z (kod+live) | 🧑 | otwarty → **D3** |
| TRESC2608-15 | Cztery nazwy usługi obiektowej | 4 | P2 | Z (kod+live) | 🧑 | otwarty |
| TRESC2608-16 | `slownik-pojec-wideo` bez frazy pytającej | 4 | P2 | Z (kod) / N (efekt) | 🧑 | otwarty |
| TRESC2608-17 | H1 `/kontakt` bez wspólnych rdzeni | 4 | P2 | Z (kod+live) | 🧑 | otwarty |
| TRESC2608-18 | Akapity-lustrzanki „X to fundament Y" | 1 | P2 | Z (kod) | 🧑 | otwarty |
| TRESC2608-19 | Żargon na kafelku „Bestseller" | 1 | P2 | Z (kod) | 🧑 | otwarty |
| TRESC2608-20 | „Poseboard" | 1 | P2 | Z (kod) | 🧑 | otwarty |
| TRESC2608-21 | `/galeria`: kategoria obiecana i przemilczana | 3 | P2 | Z (kod) | 🌐 | otwarty |
| TRESC2608-22 | Meta drona: „dron w cenie" | 3 | P2 | Z (kod) | 🌐 | otwarty |
| TRESC2608-23 | `Offer` 120 zł bez „/os." | 3 | P2 | Z (kod) | 🤖 | otwarty |
| TRESC2608-24 | „W 48h galeria online" poza warunkami | 3 | P2 | Z (kod) | 🌐 | otwarty |
| TRESC2608-25 | Nazwa pakietów w pięciu wariantach | 3 | P2 | Z (kod+live) | 🌐 | otwarty |
| TRESC2608-26 | „stanowią" + tautologia RAW | 2 | P3 | Z (kod) | 🤖 | otwarty |
| TRESC2608-27 | „dla Grupa Forte S.A." | 2 | P3 | Z (kod) | 🤖 | otwarty |
| TRESC2608-28 | „fotogeniczny/a" → „żebyś mógł" | 2 | P3 | Z (kod) | 🤖 | otwarty |
| TRESC2608-29 | „Co jeśli" bez przecinka ×4 | 2 | P3 | Z (kod) | 🤖 | otwarty |
| TRESC2608-30 | Szyk w `description` `/kontakt` | 2 | P3 | Z (kod) | 🤖 | otwarty |
| TRESC2608-31 | Trzy osoby gramatyczne w `llms.txt` | 2 | P3 | Z (kod) | 🤖 | otwarty |
| TRESC2608-32 | „Email" w `llms.txt` | 2 | P3 | Z (kod) | 🤖 | ogon korekty 02.08 |
| TRESC2608-33 | „48 h" vs „48h" | 2 | P3 | Z (kod) | 🤖 | otwarty |
| TRESC2608-34 | Trzy notacje zakresów | 2 | P3 | Z (kod) | 🤖 | otwarty |
| TRESC2608-35 | „WWW" vs „www" | 2 | P3 | Z (kod) | 🤖 | otwarty |
| TRESC2608-36 | „&" w stopce | 2 | P3 | Z (kod) | 🤖 | otwarty |
| TRESC2608-37 | Pięć deskryptorów zawodowych | 3 | P3 | Z (kod+panel) | 🌐 | otwarty |
| TRESC2608-38 | Cztery opisy >155 zn. | 4 | P3 | Z (pomiar) | 🤖 | otwarty |
| TRESC2608-39 | Trzy opisy marnują 38-45 zn. | 4 | P3 | Z (pomiar) / N (efekt) | 🧑 | otwarty |
| TRESC2608-40 | „Profesjonalna sesja" ×3 | 1 | P4 | Z (kod) | 🤖 | otwarty |
| TRESC2608-41 | Wykrzykniki w potwierdzeniach | 1 | P4 | Z (kod) | 🤖 | otwarty |
| TRESC2608-42 | ★ w etykiecie i w JSON-LD | 1 | P4 | Z (kod) | 🤖 | otwarty |
| TRESC2608-43 | „Concept", „Clipping path" | 1 | P4 | Z (kod) | 🤖 | otwarty |
| TRESC2608-44 | Brak `og:site_name` na 50 trasach | 4 | P4 | **Z (live)** | 🤖 | otwarty |
| TRESC2608-45 | 404 bez `openGraph` | 4 | P4 | Z (kod) + H | 🤖 | otwarty |
| TRESC2608-46 | Kropki w komunikatach błędów | 2 | P4 | Z (kod) | 🤖 | otwarty |
| TRESC2608-47 | „bezcookiesowe", „cookie" vs „cookies" | 2 | P4 | Z (kod) | 🤖 | otwarty |
| TRESC2608-48 | „mini-brief" ×9, w tym mail | 2 | P4 | Z (kod) | 🧑 | otwarty → **D5** |
| TRESC2608-49 | `readTime` 22 z 26 zawyżone | 4 | P4 | Z (pomiar) | 🧑 | otwarty (diagnoza) |
| TRESC2608-50 | Dron sprzedaje zakres sekcji 8 za 700 zł | 3 | **P1** | Z (kod+cennik) | 🤖 | otwarty, = diff z 03.08 |
| TRESC2608-51 | Hero obiektowy: wnętrza obiecane przy 900 zł | 3 | **P1** | Z (kod+cennik) | 🧑 | otwarty |
| TRESC2608-52 | Blurb portretów: studio w cenie | 3 | P2 | Z (kod+cennik) | 🧑 | otwarty |
| TRESC2608-53 | Dron: bezterminowe darmowe przekładanie | 3 | P2 | Z (kod+cennik) | 🤖 | otwarty |
| TRESC2608-54 | Blok wnętrz „zamówić osobno" | 3 | P2 | Z (kod+cennik) | 🧑 | otwarty |
| TRESC2608-55 | Model rozliczenia poza kanonem | 3 | P3 | Z (kod+cennik) | 🧑 | otwarty, **kanon do uzupełnienia** |
| TRESC2608-56 | Nocleg bez stawki w cenniku | 3 | P3 | Z (kod+cennik) | 🧑 | otwarty, **kanon do uzupełnienia** |
| TRESC2608-57 | `llms.txt` gubi 40 zł ponad partię | 4 | P4 | Z (kod+cennik) | 🤖 | otwarty |

**Rozkład:** P0 = 1 · P1 = 9 · P2 = 20 · P3 = 16 · P4 = 11 · **razem 57.**
Hipotezy otwarte `H-1`…`H-5` = 5 (`H-6` rozstrzygnięta w trakcie). Obserwacje bez akcji = 4.
Skorygowane fałszywe pozytywy = 11.

---

*Audyt niczego nie zmienił: zero edycji w `src/`, `public/`, w Google Ads, w GSC i w Profilu Firmy;
zero commitów; zero wysyłek. Wszystkie zdania zamienne są propozycjami. Kolejny krok:
`docs/sesje/BRIEFY-TRESC-2026-08-04.md`.*
