# Audyt CTR w SERP, część techniczna (§2.3) — 11 sierpnia 2026

Wykonawca: Cloud. Zakres: wyłącznie §2.3 z `PLAN-AUDYT-CTR-SERP-2026-08-11.md`, czyli techniczne warunki prezentacji wyniku w Google. Sekcje §2.1 i §2.2 (priorytetyzacja na danych GSC, decyzje o copy) nie były wykonywane: pierwsza jest zablokowana brakiem danych, druga należy do GPT.

Nazwa pliku celowo różni się od `AUDYT-CTR-SERP-2026-08-11.md` zarezerwowanego w planie na produkt złożony, żeby nie nadpisać części GPT.

Punkt odniesienia: `main`, HEAD `54c6631`, produkcja `https://szabunia.pl` sprawdzona na żywo 11.08.2026. Nie wprowadzono żadnych zmian w kodzie. Bez commitów i pushy.

---

## 1. Wniosek nadrzędny: planu nie da się wykonać w obecnym kształcie

Nie chodzi o brak danych, tylko o dwa założenia planu, które przestały być prawdziwe w ciągu ostatnich 30 godzin. Poniżej dowody, nie przypuszczenia.

### B1. Zbiór URL-i zmienił się 10.08.2026, czyli wczoraj

Plan zapisuje URL-e jako nienaruszalne (§1 „Nienaruszalne", §2.3 „URL-e pozostają bez zmian"). W praktyce oferta przeszła z ośmiu podstron usług na cztery, a pięć adresów zostało wycofanych i przekierowanych.

Dowód w kodzie: `next.config.ts:134-152`, commit `e56916d` z 10.08.2026 („migracja oferty z 8 do 4 filarów").
Dowód na produkcji, sprawdzone 11.08:

| Wycofany adres | Odpowiedź | Cel |
| --- | --- | --- |
| `/uslugi/sesje-zespolowe` | 308 | `/uslugi/wizerunek-portrety` |
| `/uslugi/wideo-marketing` | 308 | `/uslugi/wizerunek-portrety` |
| `/uslugi/pakiety-foto-wideo` | 308 | `/uslugi/eventy-reportaze` |
| `/uslugi/zdjecia-wideo-z-drona` | 308 | `/uslugi/nieruchomosci-przemysl` |
| `/uslugi/wnetrza-obiekty-architektura` | 308 | `/uslugi/nieruchomosci-przemysl` |

Skutek dla audytu: eksport GSC z okna „przed" opisuje osiem adresów, z których pięć już nie istnieje. Nie da się porównać CTR strony, której nie ma, ze stroną, która przejęła jej frazy. To nie jest szum w danych, tylko największa zmienna w całym pomiarze.

### B2. Data ostatniej zmiany title/description/H1 to 11.08.2026, czyli dziś

Plan przyjmuje jako stan wyjściowy cykl z 30.07 i planuje dwa zamknięte okna 28-dniowe rozdzielone datą tamtego wdrożenia. Tamte metadane zostały już nadpisane, i to dwukrotnie.

- 10.08, commit `2ee60ef`, `df6b1a2`, `8af6ed5`: przebudowa hero i H1 na stronie głównej i podstronach usług.
- 10.08, `layout.tsx:35` i `:44`: nowy title i description strony głównej (komentarz w kodzie datuje zmianę wprost).
- 11.08, commit `13068c8`: zmiana `seo.title` usługi obiektowej z „Fotografia nieruchomości i przemysłu, Poznań | Szabunia" na „Nieruchomości i przemysł: foto i wideo, Poznań | Szabunia".

Skutek: cykl z 30.07 przeżył jedenaście dni i nigdy nie da się go zmierzyć osobno. Okno „po" dla obecnego copy jeszcze się nie zaczęło. Najwcześniejszy termin sensownego pomiaru to **10-11 września 2026**, i to przy założeniu, że do tego czasu nikt nie ruszy tytułów. 28 dni od dziś wypada 8 września, ale eksport GSC kończy się 2-3 dni przed dniem pobrania, więc pełne okno widać dopiero dwa, trzy dni później. Termin ujednolicony z `DECYZJA-CTR-SERP-2026-08-11.md` §1, gdzie policzono to poprawnie; moja pierwotna data „około 8 września" pomijała opóźnienie danych.

### B3. Ścieżka A do danych nie istnieje po mojej stronie

Supermetrics ma wygasły trial od 03.06.2026, a GSC nigdy nie była do niego podłączona. Nie mam dostępu do Search Console. Zostaje wyłącznie ścieżka B: ręczny eksport od Marcina. Warto pamiętać, że eksporty „ostatnie 7 dni" kończą się 2-3 dni przed dniem pobrania, więc efektu wczorajszej migracji nie widać w nich jeszcze w ogóle.

### B4. Pytanie o CTR zostało już raz rozstrzygnięte danymi

Eksport z 30.07 (okno 10.06-27.07): 2 299 wyświetleń, 23 kliknięcia, CTR 1,08%, **średnia pozycja 22,26**. Przy pozycji 22 CTR na poziomie 1% jest wartością normalną, nie usterką. Wtedy tylko dwa adresy miały realną lukę: `/blog/slownik-pojec-wideo` (165 wyświetleń, pozycja 8,5, zero kliknięć) i `/kontakt` (101 wyświetleń, pozycja 5,07, jedno kliknięcie). Reszta puli nie ma problemu z tekstem w SERP-ie, tylko z rankingiem.

Otwieranie tematu CTR bez nowych danych, które by ten wniosek podważyły, oznacza ryzyko powtórzenia pracy, która raz już została odłożona jako kosmetyka.

### Rekomendacja

Odłożyć audyt CTR. W jego miejsce, po 10 września, zrobić pomiar wchłonięcia migracji: czy pięć wycofanych adresów oddało wyświetlenia czterem, które zostały, czy raczej część historii przepadła. To jest pytanie, na które dane odpowiedzą, i to jest zmiana, która faktycznie może ruszyć pozycję. Copy w SERP-ie ma sens dopiero po niej.

Jeżeli Marcin mimo to chce pełnego audytu CTR teraz, potrzebny jest eksport GSC z wymiarami URL + zapytanie + urządzenie + kraj, z jawnym oznaczeniem, że okno „po" jest niepełne, a wynik nie rozstrzyga o skuteczności copy.

---

## 2. Findingi techniczne

Każdy ma dowód w kodzie albo na produkcji. Żaden nie został naprawiony.

| ID | Waga | Rzecz | Dowód |
| --- | --- | --- | --- |
| F1 | wysoka | `og:image` podstrony obiektowej wskazuje na 404 | produkcja + `public/images/og/uslugi/` |
| F2 | średnia | martwa gałąź w budowaniu ścieżki OG, przyczyna F1 | `src/app/uslugi/[slug]/page.tsx:46` |
| F3 | średnia | `lastmod` w sitemapie starszy niż realna zmiana treści | `src/app/sitemap.ts:12` |
| F4 | niska | pięć osieroconych plików OG po wycofanych usługach | `public/images/og/uslugi/` |
| F5 | niska | trzy opisy dłuższe niż 160 znaków, do ucięcia w SERP | produkcja |
| F6 | **wysoka** | 12 z 26 wpisów bloga straciło kartę „Powiązana usługa" i odsyłacz do usługi | `src/data/blog.ts:1701-1727` + produkcja |

### F1. Karta linku podstrony obiektowej jest zepsuta

`/uslugi/nieruchomosci-przemysl` deklaruje `og:image` pod adresem `https://szabunia.pl/images/og/uslugi/nieruchomosci-przemysl.png`. Ten plik nie istnieje, produkcja zwraca **404**. Katalog `public/images/og/uslugi/` ma obrazy dla trzech pozostałych usług i dla pięciu wycofanych, ale nie dla tej jednej, którą utworzono 10.08.

Zasięg: podgląd linku na LinkedInie, w Slacku, Messengerze i przy wysyłce mailem. Nie dotyczy wyniku w Google, więc formalnie leży obok tematu CTR, ale to jedyna twarda usterka prezentacyjna, jaką znalazłem, i dotyczy podstrony utworzonej wczoraj.

Naprawa: wygenerować brakujący plik skryptem `scripts/generate-og-uslugi.py`, tym samym, który zrobił pozostałe.

### F2. Martwa gałąź, która przepuściła F1

```
const ogImage = `/images/og/uslugi/${service.slug}.${slug === "zdjecia-wideo-z-drona" ? "jpg" : "png"}`;
```

`zdjecia-wideo-z-drona` nie jest już usługą, tylko źródłem przekierowania, więc warunek nigdy się nie spełni. Ważniejsze jest to, co kod zakłada milcząco: że każda usługa ma plik `.png`. Nie ma sprawdzenia istnienia pliku ani wartości domyślnej, więc dodanie nowej usługi bez obrazu przechodzi build, lint i `tsc` bez jednego ostrzeżenia. Dokładnie to się stało 10.08.

### F3. Sitemapa mówi Google, że nic się nie zmieniło od 5 sierpnia

`SITE_UPDATED` stoi na `2026-08-05`. Dwadzieścia adresów w sitemapie, w tym wszystkie cztery podstrony usług i strona główna, raportuje `lastmod` z tą datą. Tymczasem 10.08 przebudowano całą architekturę oferty, a 11.08 zmieniono tytuł. Komentarz w pliku mówi wprost, że tę stałą podnosi się ręcznie przy realnej zmianie treści, i tego nie zrobiono.

Ze wszystkich znalezionych rzeczy to jedyna, która realnie spowalnia to, o co chodzi w planie: odświeżenie snippetów w wynikach wyszukiwania. Google dostaje sygnał, że nie ma po co wracać.

Naprawa: podnieść stałą na `2026-08-11`. Jedna linia, `src/app/sitemap.ts:12`.

### F4. Osierocone obrazy OG

W `public/images/og/uslugi/` leżą `sesje-zespolowe.png`, `wideo-marketing.png`, `pakiety-foto-wideo.png`, `wnetrza-obiekty-architektura.png` i `zdjecia-wideo-z-drona.jpg` (ten ostatni waży 182 KB). Nic ich nie renderuje. Porządek, nie usterka, ale razem z F2 tworzą mylące wrażenie, że komplet obrazów istnieje.

### F5. Trzy opisy przekraczają 160 znaków

| Adres | Znaków |
| --- | --- |
| `/blog/spojne-portrety-zespolu` | 165 |
| `/blog/fotografia-produktowa-ecommerce` | 163 |
| `/portfolio/idcom-headshoty-zespolu` | 162 |

Zostaną ucięte w połowie ostatniego zdania. To decyzja treściowa, więc zgodnie z podziałem ról z planu należy do GPT, nie do mnie.

### F6. Prawie połowa bloga odpięła się od oferty. Znalezione przy okazji, nienaprawione

To jest najpoważniejsza rzecz w całym audycie i wyszła dopiero przy sprzątaniu po F4.

`blogServiceMap` w `src/data/blog.ts:1701-1727` przypisuje każdy wpis do usługi. Migracja 10.08 nie ruszyła tej mapy, więc **12 z 26 wpisów wskazuje dziś na cztery slugi, które przestały istnieć**:

| Martwy slug | Wpisy |
| --- | --- |
| `sesje-zespolowe` | `bledy-zdjecia-zespolu`, `headshoty-zespolu-w-jeden-dzien`, `spojne-portrety-zespolu` |
| `wideo-marketing` | `wideo-marketing-dla-firm-formaty`, `slownik-pojec-wideo`, `ile-kosztuje-film-promocyjny` |
| `zdjecia-wideo-z-drona` | `zdjecia-film-z-drona-dla-firm`, `zdjecia-z-drona-dla-deweloperow`, `ile-kosztuje-film-z-drona` |
| `pakiety-foto-wideo` | `foto-wideo-dron-z-jednego-wejscia`, `obsluga-foto-wideo-eventu-firmowego`, `pakiet-foto-wideo-czy-osobno` |

Mechanizm awarii: `src/app/blog/[slug]/page.tsx:117-118` robi `getServiceBySlug(serviceSlug)`, dostaje `undefined`, a warunek `{relatedService && (...)}` w linii 231 po prostu nic nie renderuje. Bez błędu, bez ostrzeżenia. Lint, `tsc` i build przechodzą.

Sprawdzone na produkcji, 15 wpisów: karta „Powiązana usługa" jest na wszystkich trzech wpisach z żywym slugiem i **nie ma jej na żadnym z dwunastu** z martwym. Zniknęła kafelkowa karta z nazwą usługi, ceną „od" i przyciskiem „Zobacz ofertę", czyli jedyne wyjście z wpisu blogowego do oferty.

Druga strona tej samej usterki: **`nieruchomosci-przemysl` nie ma ani jednego przypisanego wpisu.** Blok „Z bloga" na tej podstronie renderuje się tylko dzięki fallbackowi na kategorię, więc zamiast trzech tekstów o dronie i hali pokazuje wypełniacz.

Dlaczego to ważniejsze niż CTR: wąskim gardłem tej strony jest pozycja, a nie snippet, i linkowanie wewnętrzne jest jedną z niewielu dźwigni pozycji, na którą mamy wpływ z poziomu kodu. Cztery usługi straciły łącznie dwanaście linków przychodzących z własnego bloga, i to akurat w tygodniu, w którym Google przechodzi przez przebudowaną strukturę.

**Naprawione 11.08.2026 po akceptacji Marcina.** Zapis wdrożenia w §5. Poniżej zostaje oryginalne uzasadnienie, dlaczego nie zrobiłem tego z własnej ręki.

Przepisanie mapy to decyzja redakcyjna: trzeba rozstrzygnąć, czy trzy teksty o dronie idą do `nieruchomosci-przemysl` (dokąd prowadzi 301 starego sluga), czy część z nich do `eventy-reportaze`, bo dron bywa dodatkiem eventowym. Komentarz nad mapą pokazuje, że poprzednie takie przepięcie było wprost decyzją Marcina (`TRESC2608-03`), nie poprawką techniczną. To stop-condition §10 pkt 8 z `CLAUDE.md`.

Propozycja do akceptacji, jedna linia na wpis, zero zmian w treści wpisów:

| Wpis | Z | Na |
| --- | --- | --- |
| `bledy-zdjecia-zespolu` | `sesje-zespolowe` | `wizerunek-portrety` |
| `headshoty-zespolu-w-jeden-dzien` | `sesje-zespolowe` | `wizerunek-portrety` |
| `spojne-portrety-zespolu` | `sesje-zespolowe` | `wizerunek-portrety` |
| `wideo-marketing-dla-firm-formaty` | `wideo-marketing` | `wizerunek-portrety` |
| `slownik-pojec-wideo` | `wideo-marketing` | `wizerunek-portrety` |
| `ile-kosztuje-film-promocyjny` | `wideo-marketing` | `wizerunek-portrety` |
| `zdjecia-film-z-drona-dla-firm` | `zdjecia-wideo-z-drona` | `nieruchomosci-przemysl` |
| `zdjecia-z-drona-dla-deweloperow` | `zdjecia-wideo-z-drona` | `nieruchomosci-przemysl` |
| `ile-kosztuje-film-z-drona` | `zdjecia-wideo-z-drona` | `nieruchomosci-przemysl` |
| `foto-wideo-dron-z-jednego-wejscia` | `pakiety-foto-wideo` | `eventy-reportaze` |
| `obsluga-foto-wideo-eventu-firmowego` | `pakiety-foto-wideo` | `eventy-reportaze` |
| `pakiet-foto-wideo-czy-osobno` | `pakiety-foto-wideo` | `eventy-reportaze` |

Każdy cel jest tym samym adresem, na który już dziś prowadzi 301 starego sluga, więc mapa wraca do zgodności z `next.config.ts`. Po zmianie rozkład wyszedłby na `wizerunek-portrety` 14, `eventy-reportaze` 6, `fotografia-produktowa` 3, `nieruchomosci-przemysl` 3. Przewaga wizerunku jest duża, ale to odbicie tego, co faktycznie jest napisane, a nie decyzja o hierarchii.

---

## 3. Co zostało sprawdzone i jest w porządku

Sprawdzone na wszystkich 46 adresach z sitemapy, na żywo, nie w kodzie.

- **Kody odpowiedzi:** 46 z 46 zwraca 200. Zero martwych adresów w sitemapie.
- **Unikalność:** zero zduplikowanych `title`, zero zduplikowanych `description` w całej puli.
- **Długość tytułów:** żaden nie przekracza 60 znaków, najdłuższy ma 60 (`/uslugi/nieruchomosci-przemysl`). Ryzyka ucięcia nie ma.
- **H1:** dokładnie jeden na każdym z 46 adresów. Zgodny tematycznie z tytułem na wszystkich sprawdzonych ręcznie.
- **Canonical:** obecny, bezwzględny, wskazujący na siebie. `metadataBase` ustawione na `https://szabunia.pl` (`layout.tsx:46`).
- **`generateMetadata` na trasach dynamicznych:** działa na wszystkich trzech (`uslugi/[slug]`, `blog/[slug]`, `portfolio/[slug]`), każda strona dostaje własny tytuł i opis.
- **JSON-LD:** parsuje się bez błędu składni na wszystkich 46 adresach. Struktura spójna: `ProfessionalService` + `Person` + `WebSite` globalnie, do tego `BreadcrumbList` wszędzie poza stroną główną, `Service` i `FAQPage` na usługach, `BlogPosting` na wpisach, `ItemList` na listingach, `VideoObject` na dwóch case studies.
- **Katalog ofert w JSON-LD:** wymienia dokładnie cztery żyjące adresy usług, bez pozostałości po ośmiu.
- **Linkowanie wewnętrzne:** przeskanowałem wszystkie 46 stron pod kątem odsyłaczy do pięciu wycofanych adresów usług. Zero trafień. Migracja została doprowadzona do końca, nie ma łańcuchów przekierowań z własnych linków.
- **Przekierowania:** siedem reguł działa, w tym `/kalkulator` i `/sesje-prywatne`. Zwracają 308, nie 301, bo tak Next.js realizuje `permanent: true`. Google traktuje 308 równoważnie z 301 i przenosi sygnały tak samo, więc komentarze w `next.config.ts` mówiące o „301" są skrótem myślowym, nie błędem.
- **`robots.txt`:** poprawny, blokuje `/api/` i bramkowany PDF poradnika, wskazuje sitemapę.
- **`llms.txt`:** wymienia aktualne cztery usługi z cenami zgodnymi z cennikiem v3. Nie został pominięty przy migracji.

## 4. Czego nie dało się sprawdzić

- **Porównanie widocznego snippetu Google z zadeklarowanymi metadanymi.** Wymaga zapytań do wyszukiwarki, która blokuje automat. Do zrobienia ręcznie przez Marcina albo z poziomu GSC.
- **Rich Results Test.** To samo ograniczenie. JSON-LD jest składniowo poprawny i zgodny z widoczną treścią, ale walidacji po stronie Google nie podstawiłem.
- **Status indeksacji pięciu wycofanych adresów.** Widać go tylko w GSC.

## 5. Co zostało wdrożone

Marcin zaakceptował naprawę F1-F4 (11.08.2026). Wykonane, bez commita i bez pusha.

| Plik | Co się stało |
| --- | --- |
| `public/images/og/uslugi/nieruchomosci-przemysl.png` | **nowy**, wygenerowany skryptem `generate-og-uslugi.py`. Zamyka F1 |
| `public/images/og/uslugi/{eventy-reportaze,wizerunek-portrety,fotografia-produktowa}.png` | przegenerowane, patrz uwaga niżej |
| `public/images/og/uslugi/` | **skasowane** `pakiety-foto-wideo.png`, `sesje-zespolowe.png`, `wideo-marketing.png`, `wnetrza-obiekty-architektura.png`, `zdjecia-wideo-z-drona.jpg`. Zamyka F4 |
| `src/app/uslugi/[slug]/page.tsx:44-52` | martwa gałąź `.jpg` usunięta, dopisane ostrzeżenie, że ścieżka nie sprawdza istnienia pliku. Zamyka F2 |
| `src/app/sitemap.ts:9-19` | `SITE_UPDATED` z `2026-08-05` na `2026-08-11`. Zamyka F3 |
| `scripts/weryfikacja-po-deploy.sh:13-19` | krok 2 sprawdzał kartę OG wycofanej usługi, teraz sprawdza wszystkie cztery żywe |

**Uwaga do zgłoszenia, nie ukrywam jej w liczbach:** skrypt renderuje komplet usług, więc razem z brakującą kartą przegenerował trzy istniejące. Nie jest to efekt uboczny do cofnięcia, tylko druga część tej samej usterki. Wszystkie cztery `title` zmieniły się 10.08, a karty zostały z czerwcowymi nazwami, więc od wczoraj podgląd linku pokazywał „Obsługa eventów firmowych", „Wizerunek & Portrety" i „Fotografia produktowa" zamiast obecnych nazw. Teraz karty zgadzają się ze stroną. Obie nowe karty obejrzałem, tekst mieści się w kadrze w dwóch liniach.

Kontrola: `npm run lint` czysty, `npx tsc --noEmit` bez błędów, `npm run build` przechodzi (46 tras, cztery usługi prerenderowane). Na serwerze lokalnym `og:image` linii obiektowej zwraca 200 i 37 KB, sitemapa podaje `2026-08-11` dla dwudziestu adresów, pięć skasowanych plików zwraca 404, konsola przeglądarki bez błędów.

**Nie ruszone:** `next.config.ts`, `layout.tsx`, JSON-LD, ceny, treści, URL-e. Zero commitów, zero pushy.

### Tura druga: F6 i skrypt weryfikacyjny

Marcin zaakceptował dokładnie 12 zaproponowanych przepięć oraz przepisanie skryptu. F5 zostaje nietknięte do września.

| Plik | Co się stało |
| --- | --- |
| `src/data/blog.ts:1701-1740` | 12 wartości w `blogServiceMap` przepiętych na cztery żywe slugi. Zero zmian w treści wpisów. Komentarz nad mapą wyjaśnia, dlaczego martwy slug nie wywala buildu, i unieważnia nieaktualny zapis `TRESC2608-03` o ósmej usłudze |
| `scripts/weryfikacja-po-deploy.sh` | przepisany z tury 05.08 na stan bieżący, 10 kroków → 14 |

Rozkład po zmianie, policzony z pliku: `wizerunek-portrety` 14, `eventy-reportaze` 6, `fotografia-produktowa` 3, `nieruchomosci-przemysl` 3. Martwych slugów zero z 26.

Skrypt: liczba adresów z 50 na 46, oczekiwany `lastmod` na 2026-08-11, karta OG jednej wycofanej usługi zamieniona na komplet czterech żywych, `data-cta` z 23 na 21 (spadek jest zamierzony, tura z 10.08 scaliła ścieżki CTA). Dołożone cztery kroki, których wcześniej nie było: status 200 każdego adresu z sitemapy, karta „Powiązana usługa" na każdym wpisie, odsyłacze do bloga na czterech usługach, oraz kontrola, że pięć wycofanych adresów usług nadal przekierowuje.

**Zgłaszam własny błąd w tym skrypcie, bo o mało nie wypaczył wyniku.** Pierwsza wersja kroku 11 używała `grep -q "Powi.zana us.uga"` i pokazała 26 braków zamiast 12. Ten sam wzorzec działał, gdy uruchamiałem go ręcznie. Przyczyna: skrypt startuje z `LC_CTYPE=C`, gdzie kropka dopasowuje jeden bajt, a `ą` i `ł` w UTF-8 zajmują po dwa. Poprawione na `grep -qF` z pełnym napisem, ostrzeżenie zostało w komentarzu. Findingi były poprawne od początku, fałszywy był mój test.

Kontrola po zmianach: `npm run lint` czysty, `npx tsc --noEmit` bez błędów, `npm run build` przechodzi. Na lokalnym buildzie produkcyjnym **wszystkie 26 wpisów renderuje kartę** i każdy cel zgadza się z zatwierdzoną tabelą. Podstrona obiektowa pokazuje trzy teksty o dronie zamiast wypełniacza z kategorii. Konsola bez błędów.

Uboczna, spodziewana konsekwencja: `eventy-reportaze` ma teraz sześć przypisanych wpisów, a blok „Z bloga" pokazuje trzy, więc `getPostsForService` bierze trzy najnowsze i wypycha `fotografia-eventowa-vs-reportaz`, `jak-wybrac-fotografa-na-event` oraz `live-editing-na-evencie`. To normalne zachowanie funkcji przy limicie 3, nie usterka.

Skrypt uruchomiony na produkcji przed deployem, więc krok 2 pokazuje 404 karty obiektowej, krok 3 datę 2026-08-05, a krok 11 dwanaście braków. **Tak ma być: produkcja nie ma jeszcze tych zmian.** Po deployu te trzy kroki mają zejść na zielone.

Sugerowany commit message:

`fix(seo): karta OG linii obiektowej, blogServiceMap po migracji 8->4, lastmod sitemapy`

## 6. Rejestr decyzji

| # | Rzecz | Właściciel | Status |
| --- | --- | --- | --- |
| 1 | F1-F4 | Cloud | **zrobione 11.08** |
| 2 | F6, 12 przepięć w `blogServiceMap` | Marcin zatwierdził, Cloud wykonał | **zrobione 11.08** |
| 3 | `weryfikacja-po-deploy.sh` przepisany na stan bieżący | Marcin zatwierdził, Cloud wykonał | **zrobione 11.08** |
| 4 | Deploy i ponowne uruchomienie skryptu na produkcji | Marcin | **czeka** |
| 5 | Zgłoszenie sitemapy w GSC po deployu | Marcin | czeka |
| 6 | Skrócenie trzech opisów (F5) | GPT | **zamrożone do września, decyzja Marcina 11.08** |
| 7 | Eksport GSC z wymiarami URL + zapytanie + urządzenie + kraj | Marcin | 10-11 września |

## 7. Freeze

Decyzja Marcina z 11.08.2026: **dzisiejszy stan jest punktem zerowym pomiaru.** Zamrożone do września: `title`, `description`, H1, URL-e, struktura usług, JSON-LD. Wyjątek wyłącznie dla twardego błędu technicznego.

Termin kontroli: **10-11 września 2026**, zgodnie z `DECYZJA-CTR-SERP-2026-08-11.md` §1. Pierwsze pytanie do danych nie brzmi „który opis skrócić", tylko: czy migracja 8→4 przeniosła widoczność ze starych adresów na nowe podstrony i czy odzyskaliśmy utracone linkowanie wewnętrzne. Optymalizacja snippetów wraca do gry dopiero wtedy, gdy dane pokażą jednocześnie wysokie wyświetlenia, sensowną pozycję i faktycznie niski CTR.

F6 jest tu istotny nie tylko jako naprawa. Utrata dwunastu linków wewnętrznych nastąpiła dokładnie w momencie migracji, czyli na początku okna, które chcieliśmy mierzyć. Gdyby została do września, jej skutek wszedłby w pomiar jako rzekomy problem z CTR.
