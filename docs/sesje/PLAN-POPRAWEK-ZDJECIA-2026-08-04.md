# Plan poprawek: warstwa wizualna szabunia.pl

**Podstawa:** `AUDYT-ZDJECIA-2026-08-04.md` (runda 1, galerie i warstwa techniczna)
+ `AUDYT-ZDJECIA-RUNDA-2-USLUGI-PORTFOLIO-2026-08-04.md` (runda 2, ścieżka zakupowa).
**Briefy wykonawcze:** `BRIEFY-ZDJECIA-2026-08-04.md`.
**Stan wyjściowy:** commit `88564ac`, `origin/main` = HEAD, produkcja = `main`.
**Zakres:** 36 findingów z obu rund, zdeduplikowanych i ułożonych kolejnością wdrożenia.

Ten plik zastępuje czytanie dwóch raportów przy pracy. Raporty zostają jako dowód i kontekst,
ten plik jest listą do odhaczania. Każda pozycja ma ID, które przechodzi do commita
i do re-audytu.

---

## 0. Co zostało już zdecydowane (nie wracamy)

| Decyzja | Data | Co z niej wynika dla poprawek |
|---|---|---|
| **Box17 zostaje ukryty** mimo kompletu 10 zdjęć | 04.08 | ZDJ2608-02 odrzucony. Zostaje tylko poprawka komentarza (ZDJ2608-02b), żeby następny audyt nie podniósł tego trzeci raz |
| **Eventy to także integracje i imprezy firmowe** | 04.08 | ZDJ2608-05 rozstrzygnięty wariantem B: zmieniamy podpis, nie zestaw kadrów. Odblokowuje uczciwe napisanie altów (ZDJ2608-04) |
| **Usługi i portfolio przed higieną techniczną** | 04.08 | Kolejność fal poniżej. Nazwy plików i cache schodzą z pierwszego miejsca na czwarte |
| Kolejność w galerii produktowej, dronowej i eventowej | 03-04.08 | Nie ruszamy. Lista w §6 |
| Brak cennika w jakiejkolwiek formie | 03.08 | Nie dotyczy tego planu, ale obowiązuje |

---

## 1. FALA 0: pięć decyzji, które odblokowują resztę

Cztery z sześciu najcenniejszych pozycji czekają na jedno zdanie od Ciebie. Bez tego
fala 2 i fala 4 stoją.

| # | Pytanie | Warianty | Rekomendacja | Odblokowuje |
|---|---|---|---|---|
| **D1** | Publikujemy cztery realizacje, którym uzupełniłeś galerie 4 sierpnia? | A wszystkie cztery · B dwie najmocniejsze · C zostają w draftcie | **A** | ZDJ2608-31, -26, częściowo -03 |
| **D2** | Woohoo zostaje pierwszy w portfolio, mimo `gallery: []`? | A przesuwamy na trzecie miejsce · B dokładasz 4-6 kadrów foto · C zostaje | **A teraz, B docelowo** | ZDJ2608-32, -03 |
| **D3** | Co ma stać w hero „Wideo marketingu" zamiast kadru z integracji? | A nowy kadr z planu zdjęciowego od Ciebie · B `marcin-o-mnie.jpg` · C zostaje | **A** | ZDJ2608-29, -15 |
| **D4** | Kończymy konwencję nazw plików w czterech folderach, czy zmieniamy nagłówek cache? | A zmiana nazw 51 plików · B `must-revalidate` zamiast `immutable` · C nic | **A, z B jako ubezpieczeniem na czas migracji** | ZDJ2608-01, -04, -16 |
| **D5** | Robimy brakujące karty OG? | osobno: 6 kart usług · 1 brakująca karta (dziś 404) · własne zdjęcia dla `/galeria` i `/portfolio` | **wszystkie trzy, w jednym podejściu** | ZDJ2608-10, -23, -35, -36 |

**D4 dotyka `next.config.ts`, D-nic-innego nie dotyka stop-conditions poza JSON-LD w ZDJ2608-33.**

---

## 2. FALA 1: gotowe do wykonania od ręki, bez decyzji

Łącznie około **2,5 godziny** pracy agenta. Żadna pozycja nie zmienia wyglądu strony
w sposób wymagający Twojej akceptacji, poza jedną etykietą.

| ID | Co | Pliki | Wysiłek | AC |
|---|---|---|---|---|
| **02b** | Komentarz przy Box17 przestaje obiecywać publikację po wgraniu `box17.jpg` (plik jest wgrany od `9fc7ff4`) | `portfolio.ts` | 5 min | komentarz nie jest sprzeczny z zawartością folderu, ma datę decyzji i warunek wyjścia |
| **05b** | Podpis paska eventowego obejmuje integracje i imprezy firmowe | `ServiceGalleryStrip.tsx:16` | 5 min | podpis pokrywa 15 z 15 kadrów w folderze |
| **06** | Etykieta zakładki: „Wnętrza, hale i obiekty" (dziś 4 z 12 kadrów to zewnętrza) | `galeria/page.tsx:103` | 10 min | pasek kategorii na 390 px nie łamie się; `?kat=wnetrza` działa |
| **08** | `alt` „na białym tle" przy zdjęciu na żółtym | `portfolio.ts:502` | 5 min | opis zgadza się z kadrem |
| **09** | `alt` „headshoty zespołu" przy jednej osobie | `portfolio.ts:557` | 5 min | opis zgadza się z kadrem |
| **17** | Miniatura draftu `sesja-wizerunkowa` (dziś zdjęcie grupowe przy autach sportowych) | `portfolio.ts:390` | 10 min | `git grep portfolio-1.jpg` = 0 trafień w `src/` |
| **22** | Komentarz o kadrowaniu mówi „pionowy portret", plik jest poziomy 1120×840 | `services.tsx:724-726` | 5 min | komentarz opisuje faktyczną orientację; `objectPosition` bez zmian |
| **25** | `sizes` w `About` nie uwzględnia `scale-[1.15]`: 520 px zamiast 630 px | `About.tsx:23` | 5 min | przy 1440 px i DPR 2 `naturalWidth` ≥ 1250 px |
| **27** | Hero wraca jako kadr w pasku tej samej podstrony (3 podstrony) | `ServiceGalleryStrip.tsx`, `uslugi/[slug]/page.tsx` | 30 min | żaden plik nie występuje dwa razy poniżej hero; paski mają tyle samo kadrów co dziś |
| **07** | `sizes` w paskach galerii niezgodne z siatką i z kontenerem `max-w-5xl` | `ServiceGalleryLightbox.tsx`, `ServiceGalleryStrip.tsx` | 30 min | dla każdego kafla przy 390/900/1728 px: `0,85 ≤ naturalWidth / (CSS × DPR) ≤ 1,4` |
| **34** | IDcom: hero jest też szóstym kadrem galerii sześciokadrowej | `portfolio.ts:300` | 10 min | żaden plik nie występuje w realizacji więcej niż dwa razy |
| **18** | Dwie sieroty (`artech/2.jpg` 925 KB, `sesja-wizerunkowa/01.jpg` 527 KB) i placeholder `.txt` w gicie | `public/`, bez zmian w `src/` | 15 min | `npm run build` przechodzi, w raporcie trzy ścieżki, pliki w `_to_delete/` |
| **12** | Pasek usług numeruje `alt` („… 1", „… 2"), wzorzec zamknięty wcześniej na `/galeria` | `ServiceGalleryLightbox.tsx:72,144` | 20 min | `alt` opisuje kadr, nie pozycję |
| **24** | Miniatury filmów: surowy `<img>`, `hqdefault` 480×360 w kwadracie, brak wymiarów, `alt` z tytułu | `YouTubeFacade.tsx:49`, `ServiceVideoGrid.tsx:70` | 30 min | `next/image` z wymiarami, źródło `maxresdefault` z fallbackiem, zero CLS |

**Jedyna pozycja widoczna dla klienta na poziomie treści to 06 (etykieta zakładki).**
Reszta to albo opis alternatywny, albo warstwa techniczna, albo poprawka komentarza.

---

## 3. FALA 2: po decyzji D1 i D2, czyli portfolio

To jest fala o największym stosunku efektu do kosztu w całym audycie.

**Przygotowanie (autoryzowane, można zrobić przed decyzją):**

| ID | Co | Uwaga |
|---|---|---|
| 17 | miniatura `sesja-wizerunkowa` | z fali 1 |
| 08, 09 | dwa alty | z fali 1 |
| — | wymiana `og/portfolio/sesja-wizerunkowa.png` | dziś ta karta OG używa **tego samego zdjęcia z autami sportowymi** co miniatura, więc po zmianie miniatury trzeba wymienić też OG |

**Wykonanie (po TAK):**

| ID | Co | Efekt |
|---|---|---|
| **31** | Usunięcie czterech slugów z `DRAFT_SLUGS` | `/portfolio` idzie z 4 na 8 pozycji, 34 kadry wychodzą na światło, cztery trasy wchodzą do sitemapy |
| **26** | Sierota w siatce `grid-cols-2 lg:grid-cols-3` | znika sama przy ośmiu kaflach |
| **32** | Woohoo z pierwszego miejsca | pierwszy kafelek portfolio staje się fotografią |
| **03** | Pierwsze dwa kafelki portfolio nie są zdjęciami | rozwiązane w części przez 32; kafelek Artechu (klatka z filmu) zostaje do osobnej decyzji |

**AC dla całej fali:** po publikacji `/portfolio` pokazuje 8 kafli, sitemap ma 8 tras
portfolio, żadna z ośmiu nie ma `robots: index:false`, każda ma `og:image` zwracający 200,
pierwszy kafelek na `/` i na `/portfolio` prowadzi do realizacji z niepustą galerią.

**Osobno, wymaga zgody (stop-condition `CLAUDE.md §10.3`):**

| ID | Co | Uwaga |
|---|---|---|
| **33** | JSON-LD `ItemList` na `/portfolio` wymienia 9 realizacji, widać 4 | po D1 rozjazd spada z 5 do 1 pozycji, ale nie znika; poprawka to jedna linia |

---

## 4. FALA 3: opisy alternatywne, czyli największa zaległość

Po 05b (podpis eventów) można wreszcie napisać alty, które mówią prawdę.

| ID | Co | Skala | Wysiłek |
|---|---|---|---|
| **04** | `eventy` ma 5 wariantów `alt` na 15 kadrów, `portrety` 5 na 14. Wariant trafia na kadr numerem, nie treścią: osioł opisany jako „fotografia konferencyjna", kadr dwuosobowy w liczbie pojedynczej | 29 opisów do napisania | pół dnia |
| **11** | `alt` hero i kafli generowany z tytułu albo nazwy usługi, nie z zawartości kadru: 8 hero usług, 8 kafli usług, 4 kafle portfolio, 9 hero case study, 26 okładek blogowych | 55 miejsc | dzień |
| **28** | Te same 6 portretów na 3 podstronach usług, te same 6 eventów na 2, IDcom na 2, dron na 2. Cała oferta pokazuje 46 unikalnych kadrów przy 74 w samej galerii | podział istniejących list `CURATED` na dwie połówki | pół dnia |

**Zasada dla całej fali, wynikająca z `docs/zasady-tekstow.md`:** opis ma nazwać to, co widać
na kadrze. Bez długich myślników, bez fraz z czarnej listy, bez doklejania miasta przecinkiem.
Kadr dwuosobowy nie jest „portretem" w liczbie pojedynczej.

**Warunek kolejności:** listy `altVariants` są wiązane z kolejnością plików w folderze,
więc pisanie ich przed falą 4 znaczy, że po zmianie nazw trzeba je przejrzeć jeszcze raz.
Jeśli D4 = wariant A, **fala 4 idzie przed 04**.

---

## 5. FALA 4: nazwy plików i cache, po decyzji D4

| ID | Co | Dowód |
|---|---|---|
| **01** | `Cache-Control: immutable` na rok przy plikach podmienianych pod tą samą nazwą. 04.08 `produkt-01..24.jpg` zmodyfikowane w `b3ed677`, ponownie w `a67caa3`, `produkt-02/03` jeszcze raz w `ee5970d`; `blog/foto-wideo-dron...` w `4ea0501` | `next.config.ts:48-53` + `git log --diff-filter=M` |
| **16** | `portrety` otwiera się operatorem z kamerą w T-shircie, kadrem, którego selekcja `CURATED` już raz odrzuciła | przenumerować przy okazji zmiany nazw |

**Zakres:** 51 plików w czterech folderach: `galeria/eventy` (15), `galeria/portrety` (14),
`galeria/wnetrza` (12), `portfolio/box17` (10).

**AC:** zero plików `NN.jpg` bez opisu w tych folderach; `git grep` na starych nazwach = 0
trafień w `src/`; `altVariants` dla `wnetrza` dalej pasują do kadrów (12 z 12, sprawdzone
ręcznie); **raport zawiera tabelę stary adres → nowy adres dla wszystkich 51 plików**;
kolejność wyświetlania identyczna (numery `NN` bez zmian, dokleja się tylko opis).

**Stop:** jeśli którykolwiek stary adres jest linkowany z zewnątrz (Profil Firmy, social,
kampania Ads), zatrzymać się i zapytać. Sprawdzić przed startem.

---

## 6. FALA 5: karty OG, po decyzji D5

Stan dzisiaj, po obejrzeniu **50 z 50** kart:

| Grupa | Ile | Ze zdjęciem | Bez zdjęcia |
|---|---|---|---|
| `og/portfolio/` | 9 | 8 | 1 (box17) |
| `og/strony/` | 8 | 8, ale **wszystkie ten sam portret autora** | 0 |
| `og/uslugi/` | 7 | 1 | **6** |
| `og/blog/` | 26 | 0 | **26** |

| ID | Co | Owner |
|---|---|---|
| **23** | Ósma usługa („Wnętrza, obiekty i architektura", włączona 04.08) **nie ma pliku OG**, `og:image` prowadzi do 404. Kod składa adres ze sluga: `uslugi/[slug]/page.tsx:42` | 🧑 plik + 🤖 opcjonalny fallback |
| **10** | Sześć kart usług to granatowe prostokąty z napisem, bez ani jednej fotografii | 🧑 |
| **35** | Osiem kart stron sekcyjnych to ten sam portret. Karta `/galeria` nosi tytuł „Kadry z realizacji" i pokazuje autora; karta `/portfolio` nosi tytuł „Wybrane realizacje" i pokazuje autora | 🧑 |
| **36** | Karta OG wpisu blogowego nadal niesie „foto, wideo i dron **z jednego wejścia**", frazę wycofaną 30.07 w 25 miejscach | 🧑 |

**Wzorzec, który działa, jest w tym samym repo:** osiem z dziewięciu kart `og/portfolio/*`
ma zdjęcie z realizacji po prawej stronie, w tym samym granatowym layoucie. Nie trzeba
projektować niczego nowego, trzeba zastosować to, co już jest, do trzech pozostałych folderów.

**Kolejność w obrębie fali:** najpierw 23 (bo to 404, nie estetyka), potem 35 dla
`/galeria` i `/portfolio`, potem 10, na końcu 36.

---

## 7. FALA 6: wydajność i higiena, na koniec

| ID | Co | Warunek |
|---|---|---|
| **19** | `sizes` hero deklaruje 40vw, element renderuje 25,6vw przy 1728 px | **najpierw H1 i H2**: zmierzyć, czy hero faktycznie jest podawany w 315 px i jaki jest LCP w PSI. Bez pomiaru nie ruszać |
| **21** | 14 plików z bokiem > 2000 px: `artech` 7 × 2048², `idcom` 4 × 1365×2048, `produkt-07` 1541 KB, para `portfolio-4` / `sesja-korporacyjna/01` 1600×2400 | przygotowanie plików pod www, bez zmian w kodzie |
| **13** | Kadr 1:1 w kafelku 16:9 (okładka wpisu produktowego, 44% wysokości ucięte) i 9:16 w kafelku kwadratowym (`produkt-14`) | **uwaga:** skład `CURATED.produktowe` jest decyzją Marcina z `158b955`. Wymiana kadru wymaga zgody, przekadrowanie pliku nie |
| **20** | Dziewięć grup duplikatów bajtowych, w tym `wnetrze-06` = `box17-07` i trzy kadry dronowe leżące na dysku dwa razy | świadoma decyzja z `da52117`; do sprzątnięcia tylko przy okazji fali 4 |
| **30** | Kafelek „Pakietów" (auta sportowe) i hero (koncert) pokazują dwa różne wydarzenia, a `h1` obiecuje trzy usługi | wymaga decyzji, jaki kadr ma reprezentować pakiet |
| **14** | Trzy pary bliźniaczych okładek blogowych: dwie siatki headshotów, dwa te same osiedla z powietrza, dwie kobiety na tym samym szarym tle | wybór redakcyjny, 🧑 |

---

## 8. Czego NIE robimy (pamięć antyregresyjna)

1. **Nie proponować publikacji Box17.** Decyzja z 04.08: zostaje ukryty mimo kompletu zdjęć.
2. **Nie zawężać kategorii eventowej do konferencji i gal.** Kadry z koncertem, DJ-em
   i osłem zostają, zmienia się podpis.
3. **Nie przestawiać kolejności w galerii produktowej, dronowej ani eventowej**
   (`ee5970d`, `158b955`, `a67caa3`, `35a66cc`, `d4bfbec`).
4. **Nie zmieniać składu `CURATED.produktowe`** (8 kadrów, imienne komentarze, `158b955`).
5. **Nie przywracać drugiego filmu Woohoo do galerii** ani sceny z laserami do eventów.
6. **Nie kopiować plików między folderami**, żeby „naprawić" duplikaty wnętrz.
7. **Nie dodawać `portret-07` do `CURATED.portrety`** (ta sama twarz co w sesji IDcom).
8. **Nie zmieniać kolejności kart usług** — portrety zostają do września.
9. **Nie proponować cennika** w żadnej formie.
10. **Nie usuwać plików z `public/` bezpowrotnie** — tylko `_to_delete/`.
11. **Nie zgłaszać braku linii obiektowej jako luki** — usługa jest opublikowana od 04.08.
12. **Nie redagować cytatów klientów.**

---

## 9. Stop-conditions dla całego planu

Zatrzymać się i zapytać, gdy poprawka wymaga:

- zmiany `next.config.ts`, w tym nagłówka `Cache-Control` (fala 4, wariant B decyzji D4)
- zmiany `metadata` w `layout.tsx` albo JSON-LD (ZDJ2608-33)
- usunięcia sluga z `DRAFT_SLUGS` (fala 2, po D1)
- zmiany nazwy pliku, który jest linkowany z zewnątrz
- wymiany kadru w liście ustawionej ręcznie przez Marcina
- nowego zdjęcia, którego nie ma w repo
- czegokolwiek „przy okazji", czego ten plan nie obejmuje

**Git wyłącznie Marcin. Zero nowych paczek. Diff osobnym plikiem w `docs/sesje/`.**

---

## 10. Definition of Done dla każdej fali

1. `npm run lint` → 0 błędów, 0 ostrzeżeń
2. `npx tsc --noEmit` (w sandboxie `next build` pada z Bus error, binarki macOS)
3. `npm run build` lokalnie u Marcina → sukces
4. dev bez błędów w konsoli na `/`, `/uslugi`, `/uslugi/fotografia-produktowa`, `/portfolio`,
   `/galeria`, `/blog`
5. dark mode działa na każdej odwiedzonej stronie
6. smoke-test ścieżek: przełączenie zakładki w `/galeria`, otwarcie lightboxa, powrót,
   klik w kafelek portfolio z home, klik w kafelek usługi z `/uslugi`
7. **przy każdej zmianie nazwy pliku: tabela stary adres → nowy adres w raporcie**
8. **przy każdej zmianie `alt`: cytat z pliku, nie z pamięci**

---

## 11. Punkt odniesienia do re-audytu

Data kontrolna: **2026-08-18**. Mierzyć tą samą metodą co 04.08, z jednej serii.

| Metryka | Stan 04.08.2026 | Cel |
|---|---|---|
| Opublikowane realizacje na `/portfolio` | **4 z 9** w danych | 8 po D1 |
| Realizacje z pustą galerią wśród opublikowanych | **1** (woohoo) | 0 albo przesunięta niżej |
| Pierwszy kafelek portfolio jest fotografią | **nie** | tak |
| Podstrony usług, gdzie ten sam kadr występuje 3× | **3 z 8** | 0 |
| Unikalnych kadrów na wszystkich 8 podstronach usług | **46** | ≥ 60 |
| Zdjęcia galeryjne widoczne tylko w `/galeria` | **37 z 74** | ≤ 25 |
| Pliki `NN.jpg` bez opisu w nazwie | **51** w 4 folderach | 0 po D4 |
| Alty szablonowe (z tytułu albo nazwy usługi) | **55** | ≤ 10 |
| Alty rotujące po zbyt krótkiej liście | **29** | 0 |
| Karty OG bez ani jednej fotografii | **33 z 50** | ≤ 26 (blog zostaje na końcu) |
| Usługi bez pliku OG (`og:image` → 404) | **1 z 8** | 0 |
| Surowe `<img>` w repo | **2** | 0 |
| Sieroty w `public/images` | **2** | 0 |
| Grupy duplikatów bajtowych | **9** | ≤ 6 |
| Pliki z bokiem > 2000 px | **14** | ≤ 4 |
| Wymiar kart OG 1200×630 | **50 z 50** ✅ | bez zmian |
| Referencje wiszące | **0** ✅ | bez zmian |

---

## 12. Otwarte hipotezy, których ten plan nie rozstrzyga

| ID | Hipoteza | Krok weryfikujący | Blokuje |
|---|---|---|---|
| **H1** | Hero na produkcji podany w 315 px przy żądaniu `w=1920` (jeden pomiar, nie powtórzony) | otworzyć `szabunia.pl/_next/image?url=%2Fimages%2Fmarcin-hero-light-4.jpg&w=1920&q=72` i odczytać wymiar | ZDJ2608-19 |
| **H2** | Nie wiadomo, czy obrazy są wąskim gardłem LCP. Piąty audyt z rzędu bez tego pomiaru | PSI na `/` i na jednej podstronie usługi, mobile i desktop, z datą | ZDJ2608-19, -21 |
| **H3** | `yes-butcher-02.jpg` opisany jako „z drona", perspektywa czyta się nisko | EXIF albo jedno zdanie od Marcina | ZDJ2608-10 (ten kadr jest OG usługi dronowej) |
| **H4** | Kadrowanie na 390 px liczone z proporcji, nie zobaczone | przejście `/`, `/uslugi/sesje-zespolowe`, `/galeria?kat=produktowe` na 390 px | ZDJ2608-13, -22 |

---

## 13. Pełny rejestr, jedna tabela

| ID | Finding | P | Fala | Owner | Status |
|---|---|---|---|---|---|
| 01 | Nazwy numeryczne w 4 folderach przy cache `immutable` | P1 | 4 | 🤖 | czeka na D4 |
| 02 | Box17 gotowy, ale w `DRAFT_SLUGS` | — | — | 🧑 | **odrzucony 04.08** |
| 02b | Komentarz przy Box17 obiecuje publikację, która nie nastąpi | P3 | 1 | 🤖 | gotowe |
| 03 | Portfolio na home otwierają grafika i klatka z filmu | P1 | 2 | 🧑 | czeka na D2 |
| 04 | Alt rotuje po 5 wariantach na 15 i 14 kadrów | P1 | 3 | 🤖 | po 05b i po fali 4 |
| 05 | Kategoria eventowa obiecuje konferencje, pokazuje szerzej | P1 | — | 🧑 | **rozstrzygnięty: wariant B** |
| 05b | Podpis paska eventowego do poszerzenia | P1 | 1 | 🤖 | gotowe |
| 06 | „Wnętrza i hale" zawiera 4 zewnętrza | P2 | 1 | 🤖 | gotowe |
| 07 | `sizes` w paskach niezgodne z siatką i kontenerem | P2 | 1 | 🤖 | gotowe |
| 08 | Alt „na białym tle" przy żółtym tle | P2 | 1 | 🤖 | gotowe |
| 09 | Alt „headshoty zespołu" przy jednej osobie | P2 | 1 | 🤖 | gotowe |
| 10 | 6 z 7 istniejących OG usług bez fotografii | P2 | 5 | 🧑 | czeka na D5 |
| 11 | Alt hero i kafli z szablonu, 55 miejsc | P2 | 3 | 🤖 | otwarty |
| 12 | Numerowany alt w pasku usług | P2 | 1 | 🤖 | gotowe |
| 13 | Kadr 1:1 w 16:9 i 9:16 w kwadracie | P2 | 6 | 🤖 | częściowo blokowany decyzją o `CURATED` |
| 14 | Trzy pary bliźniaczych okładek blogowych | P2 | 6 | 🧑 | otwarty |
| 15 | Hero wideo marketingu i sesji zespołowych | P2 | 0/2 | 🧑 | czeka na D3 |
| 16 | Portrety otwiera operator z kamerą | P2 | 4 | 🧑 | przy okazji zmiany nazw |
| 17 | Miniatura draftu `sesja-wizerunkowa` | P2 | 1 | 🤖 | gotowe |
| 18 | Dwie sieroty i placeholder `.txt` | P3 | 1 | 🤖 | gotowe |
| 19 | `sizes` hero 40vw kontra 25,6vw renderu | P3 | 6 | 🤖 | czeka na H1, H2 |
| 20 | Dziewięć grup duplikatów bajtowych | P3 | 6 | 🤖 | otwarty |
| 21 | Czternaście plików z bokiem > 2000 px | P3 | 6 | 🤖 | otwarty |
| 22 | Nieprecyzyjne słowo w komentarzu o kadrowaniu | P4 | 1 | 🤖 | gotowe |
| 23 | Ósma usługa bez pliku OG, `og:image` 404 | P1 | 5 | 🧑 + 🤖 | czeka na D5 |
| 24 | Miniatury filmów: surowy `<img>`, 4:3, bez wymiarów | P2 | 1 | 🤖 | gotowe |
| 25 | `sizes` w `About` bez `scale-[1.15]` | P3 | 1 | 🤖 | gotowe |
| 26 | Sierota w siatce `/portfolio` | P3 | 2 | 🤖 | rozwiąże się po D1 |
| 27 | Ten sam kadr 3× w jednym przewinięciu, 3 podstrony | P2 | 1 | 🤖 | gotowe |
| 28 | Te same 6 portretów na 3 podstronach usług | P2 | 3 | 🧑 | otwarty |
| 29 | „Wideo marketing" ma jedno zdjęcie na całej podstronie | P1 | 0/2 | 🧑 | czeka na D3 |
| 30 | Kafelek i hero „Pakietów" to dwa różne wydarzenia | P3 | 6 | 🧑 | otwarty |
| 31 | Cztery realizacje z uzupełnionymi galeriami w draftcie | P1 | 2 | 🧑 | czeka na D1 |
| 32 | `woohoo-autopay` bez fotografii, pierwszy w portfolio | P1 | 2 | 🧑 | czeka na D2 |
| 33 | JSON-LD `ItemList` wymienia 9, widać 4 | P2 | 2 | 🤖 | stop-condition |
| 34 | IDcom: hero 3× przy sześciu kadrach | P2 | 1 | 🤖 | gotowe |
| 35 | Osiem kart OG stron to ten sam portret autora | P2 | 5 | 🧑 | czeka na D5 |
| 36 | Karta OG z wycofanym żargonem „z jednego wejścia" | P3 | 5 | 🧑 | czeka na D5 |

**Podsumowanie:** 14 pozycji gotowych do wykonania od ręki, 8 czekających na pięć decyzji,
9 do osobnej rundy, 4 hipotezy do pomiaru, 2 zamknięte decyzjami z 04.08.

---

*Plan złożony z dwóch rund audytu wykonanych 2026-08-04 na commicie `88564ac`.
Dowody i uzasadnienia w raportach źródłowych, briefy wykonawcze w `BRIEFY-ZDJECIA-2026-08-04.md`.
Ten plik nie wprowadza zmian.*
