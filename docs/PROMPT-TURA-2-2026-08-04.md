# PROMPT — tura 2: weryfikacja produkcyjna, pomiary odblokowujące, domknięcie ogonów

Wdrożenie poprawek szabunia.pl, tura druga. TRYB AUTONOMICZNY, nie pytaj o nic.
REPO: /Users/marcinszabunia/Documents/05_Strona_WWW/marcinszabunia

CO ROBISZ: sprawdzasz na produkcji, co naprawdę weszło z tury 1, robisz trzy pomiary, które
od pięciu audytów blokują falę 6, domykasz ogony niewymagające decyzji i składasz Marcinowi
JEDNĄ kartkę decyzyjną. Zakres jest zamknięty listą ID w sekcji FAZY.

ID spoza tej listy nie wykonujesz, nawet jeśli poprawka jest oczywista i zajmuje minutę.
„Przy okazji" to stop-condition CLAUDE.md §10.8. Rzeczy znalezione po drodze zapisujesz
w raporcie, nie w kodzie.

PREFIKS ID JEST OBOWIĄZKOWY. ZDJ2608-19 i TRESC2608-19 to dwie różne poprawki. Zakładaj
kolizję przy KAŻDYM numerze z zakresu 01-57. Skrót bez prefiksu wolno Ci napisać tylko
wewnątrz tabeli, której nagłówek jednoznacznie mówi, o którą serię chodzi. W raporcie,
w commit message i w komentarzu w kodzie zawsze pełne ID.

---

## STAN WYJŚCIOWY, potwierdź przed pierwszą zmianą

Tura 1 (04.08.2026) zostawiła **86 plików zmienionych, +390/−212, NIEZACOMMITOWANYCH**.
Git obsługuje Marcin, więc stan na start jest jedną z trzech możliwości. **Rozpoznaj którą,
zanim cokolwiek dotkniesz:**

| Co widzisz | Co to znaczy | Co robisz |
|---|---|---|
| `git log -1` pokazuje commit z ID `ZDJ2608-*` / `TRESC2608-*`, drzewo czyste | tura 1 zacommitowana | sprawdź, czy jest na produkcji (FAZA 1), potem pełny zakres |
| HEAD dalej `5642640`, drzewo brudne na 86 plików | **tura 1 NIE zacommitowana** | **NIE RUSZASZ KODU.** Wykonujesz wyłącznie FAZĘ 2 (pomiary, zero zmian w repo) i FAZĘ 5 (kartka decyzyjna). Resztę zapisujesz jako niewykonaną z powodem |
| drzewo czyste, HEAD `5642640`, zmian z tury 1 nie ma | zmiany zostały odrzucone | **STOP.** Nie odtwarzasz ich z pamięci. Piszesz to w pierwszej linijce raportu i kończysz |

Sprawdź: `git --no-optional-locks log -3 --oneline`, `git --no-optional-locks status --porcelain`,
`git --no-optional-locks branch -vv`.

**Produkcja == main?** Sprawdź, czy `szabunia.pl` faktycznie ma zmiany z tury 1: najtańszy test
to `curl -sI https://szabunia.pl/images/galeria/eventy/event-05-networking-foyer.jpg` — jeśli
zwraca 200, deploy poszedł; jeśli 404, produkcja jest sprzed zmiany nazw. **Ten jeden odczyt
rozstrzyga, czy FAZA 1 ma sens.** Bez deployu FAZA 1 jest bezprzedmiotowa, odnotuj i pomiń.

Nieśledzone pliki w `docs/sesje/` i katalog `_to_delete/` to stan normalny, nie sprzątasz ich.

---

## PRZECZYTAJ PRZED PRACĄ, w tej kolejności

1. `docs/sesje/POPRAWKI-WDROZONE-2026-08-04.md` — **całość**. To raport z tury 1. Szczególnie
   sekcja **C** (co zostało po stronie Marcina), **D** (świadomie odłożone) i oba rejestry ID
2. `docs/sesje/PLAN-POPRAWEK-ZDJECIA-2026-08-04.md` §7 (fala 6), §12 (hipotezy H1-H4), §13 (rejestr)
3. `docs/sesje/BRIEFY-ZDJECIA-2026-08-04.md` — brief `ZDJ2608-19` i `ZDJ2608-23`
4. `CLAUDE.md` §5, §6, §10, §11
5. `docs/zasady-tekstow.md` — obowiązuje dla KAŻDEGO napisanego zdania, w tym dla każdego alt
6. `docs/METODYKA-AUDYTU.md` §7 i §8

Jeśli któregokolwiek z tych plików nie ma pod podaną ścieżką, nie szukasz zamiennika i nie
odtwarzasz treści z pamięci. ID, których jedynym źródłem był brakujący plik, dostają status
„poza zakresem: brak źródła", a fakt braku wpisujesz na początek raportu.

**HIERARCHIA ŹRÓDEŁ PRZY KONFLIKCIE:** decyzja Marcina z tej tury > kod > raport z 04.08 > brief
> audyt. Raport z 04.08 jest późniejszy od briefów i wygrywa z nimi przy różnicach.

---

## PUŁAPKI NARZĘDZIOWE Z TURY 1 — przeczytaj, kosztowały realny czas

1. **Git przez most urządzeń: zawsze `--no-optional-locks`.** Zwykłe `git status` i `git diff`
   zakładają `.git/index.lock`, a most nie ma uprawnień, żeby go skasować.
2. **`rm` nie działa przez most** („Operation not permitted"). Do usuwania: `mv` do
   `_to_delete/<ID>-<data>/` i wypisanie plików w raporcie.
3. **`device_stage_files` potrafi oddać STARĄ wersję pliku.** W turze 1 zwrócił poprawny rozmiar
   w metadanych, a skopiowana treść była sprzed edycji, przez co jeden pomiar wyszedł fałszywie
   negatywny. **Po każdym skopiowaniu pliku do kontenera sprawdź `wc -c` albo grep na frazie,
   którą właśnie wpisałeś.** Przy większych transferach: `tar` pod NOWĄ nazwą, nie nadpisanie.
4. **`naturalWidth` przy `srcset` z deskryptorami `w` jest korygowane gęstością** i NIE jest
   realną szerokością pobranego pliku. Mierz parametr `?w=` z `img.currentSrc`. W turze 1 ta
   pomyłka dała odczyt „0/8 w normie" tam, gdzie realnie było 8/8.
5. **`next/image` z adresem zewnętrznym** wymaga `images.remotePatterns` w `next.config.ts`
   ALBO propa `unoptimized`. `next.config.ts` jest stop-condition, więc drugie.
6. **Next generuje kandydatów `srcset` tylko z siatki 128 / 256 / 384 / 640 px.** Deklaracja
   w `sizes` większa o jeden piksel przeskakuje na kolejnego kandydata i każe pobrać obraz
   1,5 do 1,8 razy szerszy. `sizes` trzeba stroić pod tę siatkę, nie pod okrągłe liczby.
7. **Pomiar „po" zmianie robisz na localhost** (`npm run dev`), bo tura nie trafia na produkcję.
   **Wyjątek w tej turze: FAZA 1 mierzy PRODUKCJĘ**, bo sprawdza deploy. Przy każdym pomiarze
   podaj adres: localhost czy produkcja. Okno przeglądarki widoczne, `visibilityState` hidden
   wstrzymuje render i daje fałszywe wyniki.
8. **`npm run build` pada w sandboksie na binarkach macOS.** Zapisujesz to jawnie zamiast
   udawać, że przeszło. Bramki, które masz: `npm run lint` i `npx tsc --noEmit`.
9. **`git diff` nie pokazuje plików nieśledzonych.** W turze 1 poza diffem znalazło się 51 nowych
   nazw obrazów i cały `src/data/galleryAlts.ts` z 89 opisami. Do przeglądu zawsze dokładaj
   `git --no-optional-locks status --porcelain`.

---

## DECYZJE PODJĘTE, nie relitygujesz i nie pytasz o nie ponownie

- **DZ1 = A** (04.08): cztery realizacje opublikowane, `/portfolio` ma 8 pozycji.
- **DZ2 = A** (04.08): `woohoo-autopay` zszedł z pierwszego miejsca na home i na `/portfolio`.
- **DZ4 = A + B** (04.08): 51 plików przemianowanych, `immutable` → `must-revalidate`.
- **DT1 = A** (04.08): licencja w `Warunki.tsx` na użytek komercyjny.
- **DT5 = A** (04.08): „mini-brief" zastąpiony „gotową listą pytań" na 9 powierzchniach.
- **Box17 zostaje ukryty** mimo kompletu 10 zdjęć. Zapis w `CLAUDE.md` poprawiony 04.08,
  bo nadal obiecywał publikację. **Nie proponujesz publikacji Box17.**
- **`ZDJ2608-17` poszedł wariantem B** (`portret-12`), nie A. Nie wracasz do `portret-05`.
- **`TRESC2608-09` ma tekst zatwierdzony przez Marcina**, nie zdanie z briefu. Nie podmieniasz.
- **`galleryAlts.ts` jest jedynym źródłem opisów alternatywnych.** Nie dublujesz list altów
  w komponentach ani w `galeria/page.tsx`.

---

## FAZY

### FAZA 1: weryfikacja produkcyjna tury 1 (tylko jeśli deploy poszedł)

Zero zmian w kodzie. Same odczyty, każdy z adresem produkcyjnym i wynikiem.

| # | Co sprawdzasz | Kryterium |
|---|---|---|
| 1 | 51 nowych adresów obrazów | każdy z `docs/sesje/TABELA-NAZW-51-2026-08-04.md` zwraca **200**; **każdy stary adres zwraca 404** (to jest dowód, że konwencja zadziałała, a nie że doszły kopie) |
| 2 | nagłówek cache | `curl -sI` na dowolnym `/images/*` zawiera `must-revalidate`, **nie** `immutable` |
| 3 | sitemapa | `https://szabunia.pl/sitemap.xml` ma **8** tras `/portfolio/*` |
| 4 | `robots` ośmiu realizacji | żadna nie ma `noindex` |
| 5 | `og:image` ośmiu realizacji | każdy zwraca **200** |
| 6 | `og:image` ośmiu usług | **7 zwraca 200, ósma 404** — to `ZDJ2608-23`, potwierdź, nie naprawiaj |
| 7 | pierwszy kafelek portfolio | na `/` i na `/portfolio` prowadzi do `idcom-headshoty-zespolu` |
| 8 | alty na `/galeria` | 15 eventowych i 14 portretowych opisów, **żaden nie kończy się na „, kadr N"** |
| 9 | alty okładek blogowych | `alt` ≠ tytuł wpisu; próbka 5, z cytatem |
| 10 | formularz `/kontakt` | `<select>` ma **10** opcji (placeholder + 8 usług + „Inne zapytanie") |

**Stop:** jeśli którykolwiek stary adres obrazu nadal zwraca 200, **zatrzymujesz się i zgłaszasz**.
Znaczy to, że deploy nie usunął starych plików, a wtedy cache może dalej serwować stare kadry.

### FAZA 2: pomiary, które odblokowują falę 6

To jest **najważniejsza faza tej tury**. Piąty audyt z rzędu wchodzi bez tych liczb.

| ID | Co | Jak |
|---|---|---|
| **H1 + H2 → ZDJ2608-19** | czy hero na `/` jest wąskim gardłem LCP | PSI (PageSpeed Insights API, klucz nie jest wymagany dla pojedynczych zapytań) na `https://szabunia.pl/` i na `https://szabunia.pl/uslugi/eventy-reportaze`, **mobile i desktop, po jednym przebiegu, z datą i godziną**. Zapisz: LCP, element LCP, CLS, TBF. Osobno: otwórz `https://szabunia.pl/_next/image?url=%2Fimages%2Fmarcin-hero-light-4.jpg&w=1920&q=72` i odczytaj realny wymiar |
| **H3** | czy `yes-butcher-02.jpg` jest faktycznie z drona | EXIF pliku na dysku (`exiftool` albo `PIL.ExifTags`). Model aparatu rozstrzyga. Blokuje `ZDJ2608-10` |
| **H4** | kadrowanie na 390 px | przejście `/`, `/uslugi/sesje-zespolowe`, `/galeria?kat=produktowe` przy 390 px, zrzut po jednym na trasę, ocena czy `objectPosition` tnie głowy |

**ZDJ2608-19 wykonujesz TYLKO wtedy, gdy H1 okaże się fałszywa** (czyli obraz jest podawany
w pełnej szerokości) **i** PSI pokaże hero jako element LCP. Wtedy `sizes` na
`(max-width: 768px) 100vw, 26vw` i **powtórny pomiar PSI po zmianie**, ta sama seria.
Jeśli H1 okaże się prawdziwa (`naturalWidth` ≈ 315 px przy `w=1920`), **nie ruszasz `sizes`**:
problemem jest coś innego i zwężenie go pogłębi. Brief mówi o tym wprost.

**Stop:** jeśli PSI jest niedostępne, brief `ZDJ2608-19` zostaje zamknięty jako niewykonalny.
**Nie zgadujesz.**

### FAZA 3: ósma karta OG (ZDJ2608-23), warunkowo

To jedyny **P1** w całej fali OG: `og:image` ósmej usługi prowadzi do 404 od 04.08.

1. Sprawdź, czy w `scripts/` leży generator kart OG usług (komentarz w
   `uslugi/[slug]/page.tsx` wspomina `generate-og-uslugi.py`).
2. **Jeśli generator istnieje i da się go uruchomić:** wygeneruj
   `public/images/og/uslugi/wnetrza-obiekty-architektura.png` **tym samym skryptem i w tym samym
   layoucie** co pozostałe siedem. Kadr: `wnetrze-03-hala-bramki-wejsciowe.jpg` (ta sama jasna
   hala, co hero i kafelek tej usługi, więc cała linia ma jeden obraz). Wymiar **1200×630**,
   sprawdzony, nie założony.
3. **Jeśli generatora nie ma:** nie robisz karty ręcznie i nie kombinujesz z kodowym fallbackiem
   (dotyka `generateMetadata`, stop-condition `CLAUDE.md §10.3`). Zapisujesz jako pozycję dla
   Marcina i kończysz ten punkt.

**Nie robisz** sześciu pozostałych kart usług ani ośmiu kart stron: to `ZDJ2608-10` i `-35`,
czekają na DZ5 i są robotą Marcina.

### FAZA 4: higiena bez decyzji

| ID | Co | Granica |
|---|---|---|
| **ZDJ2608-20** | 9 grup duplikatów bajtowych | **inwentarz i propozycja, ZERO kasowania.** Policz md5 wszystkich plików w `public/images`, wypisz grupy, przy każdej napisz, która kopia jest referencjonowana i skąd. Znany przypadek: `wnetrze-06-budka-akustyczna-panele.jpg` = `box17-07-wnetrze-kabiny-akustycznej.jpg`, 677 827 B. **Nie kopiujesz i nie przenosisz plików między folderami** |
| **TRESC2608-49** | `readTime` zawyżone w 22 wpisach z 26 | wolno: to warstwa metadanych bloga, nie proza. Formuła `ceil(words / 200)`, liczona z pola `content` po odjęciu znaczników HTML. Podaj tabelę „slug \| słów \| było \| jest" dla wszystkich 26 |

**Nie ruszasz** cudzysłowów ani frazy „Social Media" w `blog.ts`: to pole `content`, czyli proza,
objęta zakazem redakcji wstecznej. Zgłaszasz je jako pozycję do rundy redakcyjnej.

### FAZA 5: kartka decyzyjna dla Marcina

Jeden plik, `docs/sesje/DECYZJE-DO-PODJECIA-<data>.md`, **maksymalnie dwie strony A4**.
Każda pozycja w formacie: **pytanie w jednym zdaniu · warianty · rekomendacja z uzasadnieniem
w jednej linijce · co odblokowuje**. Bez rozwlekania, to ma być do odhaczenia przy kawie.

Pozycje obowiązkowe, wszystkie już rozpoznane, żadnej nie wymyślasz od nowa:

1. **Karta OG `og/portfolio/sesja-wizerunkowa.png`** pokazuje kadr wycofany z tej realizacji,
   a trasa jest już w sitemapie. Najpilniejsza.
2. **Symetria progu JSON-LD.** `FAQPage` na podstronach usług jest budowany z `service.faqs`,
   więc w turze 1 weszły tam `TRESC2608-53`, `-09` i `-08`, a `faq.ts` wstrzymano
   (`TRESC2608-04`). Do cofnięcia jest `-53` albo do odblokowania `-04`. Jedno z dwóch.
3. **`description` usługi dronowej** dalej sprzedaje zakres sekcji 8 cennika. AC 2 briefu
   `TRESC2608-50` niespełnione, gotowy zamiennik w raporcie z 04.08.
4. **Trzy opisy niezgodne z kadrem**: `wnetrze-11`, `wnetrze-12`, `dron-04`. Zamienniki gotowe.
5. **`ZDJ2608-28`**, podział list `CURATED` — odblokowuje `ZDJ2608-27` dla eventów i portretów.
6. **`ZDJ2608-16`**, kolejność portretów. Uwaga: przenumerowanie to kolejna runda `ZDJ2608-01`.
7. **`ZDJ2608-33`**, jedna linia w JSON-LD `/portfolio`.
8. **Cztery teksty własne z tury 1** do akceptacji albo poprawki.
9. **`TRESC2608-04`, `-05`, `-23`, `-52`, `-11`** — pięć faktów handlowych i kwot.
10. **DZ3** (hero wideo marketingu) i **DZ5** (karty OG) — dwie decyzje, sześć ID.

Przy każdej pozycji podaj **koszt niepodjęcia decyzji**: co konkretnie zostaje zepsute albo
zablokowane. Bez tego kartka jest listą życzeń, a nie narzędziem.

---

## AUTORYZACJE, czyli stop-conditions zdjęte tą decyzją

1. Odczyty produkcyjne (`curl`, PSI, przeglądarka) na `szabunia.pl` — bez limitu.
2. Generowanie brakującej karty OG **istniejącym skryptem** (FAZA 3, punkt 2).
3. `readTime` w `blog.ts` (FAZA 4) — warstwa metadanych, nie proza.
4. `Hero.tsx` `sizes` — **wyłącznie** po rozstrzygnięciu H1 i H2, w brzmieniu z briefu.

Poza tymi czterema **WSZYSTKIE** stop-conditions z `CLAUDE.md` §10 i z planu §9 obowiązują
bez zmian. W szczególności: `next.config.ts`, `metadata` w `layout.tsx`, cały JSON-LD,
rozbieżności w cenach i godzinach, nowe paczki npm, refactor dotykający ponad trzech plików
poza tą listą, treść cennika.

---

## CZEGO NIE ROBISZ, pamięć antyregresyjna

Wszystkie punkty z `docs/sesje/BRIEFY-ZDJECIA-2026-08-04.md` („Czego NIE robić", 14 pozycji)
i z `docs/sesje/BRIEFY-TRESC-2026-08-04.md` (18 pozycji) obowiązują. Do tego z tury 1:

1. Nie wracasz do `naturalWidth` jako metryki szerokości obrazu.
2. Nie zmieniasz `max-age` w `next.config.ts`. `must-revalidate` to świadome ubezpieczenie,
   a nie pełne rozwiązanie, i tak jest opisane w raporcie.
3. Nie przepinasz `fotografia-przemyslowa-fabryka` w `blogServiceMap`: zabrałoby to wpis
   fotografii produktowej. Świadoma luka, udokumentowana w kodzie.
4. Nie dobierasz kadrów do `CURATED.eventy` ani `CURATED.portrety`, żeby „naprawić"
   `ZDJ2608-27`. To czeka na `ZDJ2608-28`.
5. Nie poprawiasz po cichu opisów `wnetrze-11`, `wnetrze-12`, `dron-04`. Są w kartce decyzyjnej.
6. Nie dodajesz pytania do FAQ dronowego odsyłającego do linii obiektowej: punkt z briefu
   `TRESC2608-50`, świadomie poza zakresem tury 1, dalej wymaga decyzji.
7. Nie przywracasz `portret-07` do `CURATED.portrety`, drugiego filmu Woohoo do galerii ani
   sceny z laserami do eventów.
8. Nie proponujesz cennika, tabeli cen ani sekcji „Cennik", też jako ulepszenia SEO.
9. Nie redagujesz cytatów klientów ani pola `content` w `blog.ts`.
10. Nie commitujesz, nie pushujesz, nie mergeujesz. Git obsługuje Marcin.

---

## PISANIE TEKSTU

Obowiązuje dla każdego zdania widocznego dla użytkownika, w tym dla altów i opisów meta.
Test nadrzędny: czy Marcin powiedziałby to zdanie klientowi przez telefon. Zero długich
myślników w tekście widocznym (w komentarzach w kodzie są dozwolone, tam ich nie ruszasz).
Czarna lista fraz w całości z `docs/zasady-tekstow.md`. Zero triad przymiotników, zero
wykrzykników i emoji. Liczba pojedyncza, jeden twórca, nigdy „nasz zespół" i nigdy „Wy"
do klienta. Miasta nie doklejasz przecinkiem. Zanim odeślesz czytelnika do sekcji na stronie,
otwórz tę stronę i sprawdź, że sekcja tam jest.

---

## SUBAGENCI

Wyłącznie do czytania, oglądania kadrów i przygotowania list. **ZAPIS DO PLIKÓW WYKONUJE
JEDEN AGENT.** Dwa subagenty edytujące równolegle ten sam plik skończą nadpisaniem swojej pracy.

---

## DEFINITION OF DONE

1. `npm run lint`: 0 błędów, 0 ostrzeżeń.
2. `npx tsc --noEmit` czysty. Po każdym dotkniętym pliku, nie raz na końcu.
3. `npm run build`: jeśli działasz na Macu Marcina — sukces. W sandboksie pada z Bus error,
   wtedy zapisujesz to jawnie.
4. Każdy pomiar podany z adresem (localhost czy produkcja), datą i wartością. Zero „wygląda OK".
5. Przy każdej zmianie alt: cytat z pliku, nie z pamięci.
6. Przy każdym pomiarze PSI: numer przebiegu i godzina, żeby dało się porównać z następnym.

---

## PRODUKT, zapisywany na bieżąco, nie na końcu

1. `docs/sesje/poprawki-<data>.diff`, jeden plik dla całej tury (`git diff > plik`), bez commita.
2. `docs/sesje/WERYFIKACJA-PRODUKCJI-<data>.md`: tabela 10 kontroli z FAZY 1, każda z wynikiem
   i komendą, którą ją sprawdzono.
3. `docs/sesje/POMIARY-<data>.md`: H1, H2, H3, H4 z liczbami i datą. To jest plik, do którego
   będzie wracał każdy następny audyt, więc ma być czytelny bez kontekstu tej rozmowy.
4. `docs/sesje/DECYZJE-DO-PODJECIA-<data>.md`: kartka z FAZY 5.
5. `docs/sesje/POPRAWKI-WDROZONE-<data>.md` wg `METODYKA §8`, ze statusem „zmiany w drzewie
   roboczym, niezacommitowane" i sekcjami A-E.
6. Rejestr ID ze statusem dla wszystkich ID dotkniętych w tej turze **plus** aktualizacja
   statusów z tury 1, jeśli deploy je zmienił z „wdrożony ale niezdeployowany" na „wdrożony".
7. Sugerowany commit message, jeden na fazę, z pełnymi ID.

---

## GDY ZABRAKNIE KONTEKSTU

Kończysz na granicy fazy, zapisujesz diff i raport z tym, co zrobione, i piszesz jawnie, gdzie
skończyłeś i co zostało. Nie zaczynasz fazy, której nie skończysz. Raport niekompletny z jawną
granicą jest wart więcej niż połowa fazy bez zapisu.

**Kolejność ważności, gdyby trzeba było ciąć:** FAZA 2 (pomiary) > FAZA 5 (kartka) >
FAZA 1 (weryfikacja) > FAZA 3 (karta OG) > FAZA 4 (higiena). Pomiary są najcenniejsze, bo
odblokowują pięć ID i nie da się ich zrobić później „z pamięci".

---

## WERYFIKACJA NA KONIEC, osobnym subagentem, przed podsumowaniem w czacie

- czy każde ID z rejestru ma status i czy żadne nie zniknęło po cichu,
- czy w diffie nie ma zmian spoza listy ID (to najczęstszy błąd tej fazy),
- czy każdy pomiar ma podany adres i datę, i czy żaden nie jest założeniem,
- czy żadna zmiana nie relitygowała decyzji z listy CZEGO NIE ROBISZ,
- czy `next.config.ts`, `layout.tsx` i JSON-LD są nietknięte,
- czy kartka decyzyjna mieści się na dwóch stronach i czy każda pozycja ma koszt niepodjęcia.

---

## NA KONIEC

5 zdań w czacie. Co zweryfikowane na produkcji, jakie liczby wyszły z pomiarów, co wdrożone,
co czeka na moją decyzję, czy build przeszedł. Bez powtarzania raportu.
