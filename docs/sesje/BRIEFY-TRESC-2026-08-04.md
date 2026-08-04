# BRIEFY — TREŚĆ, SPÓJNOŚĆ I JĘZYK · szabunia.pl · 2026-08-04

Źródło: `docs/sesje/AUDYT-TRESC-2026-08-04.md`. Objęte: **P0 i P1 — 10 findingów**, z czego
dziewięć ma tu własny brief. Ósmy (`TRESC2608-06`, tytuły w SERP sprzed 30.07) **nie ma briefu
świadomie**: nie jest zadaniem do wykonania, tylko warunkiem brzegowym dla całej kolejki SEO —
wchodzi jako decyzja D2 i jako pozycja w „Poza kodem". Do tego trzy P2 (`TRESC2608-09`, `-23`, `-52`),
tańsze do zrobienia razem z P1 niż osobno.

**Punkt odniesienia:** HEAD `88564ac`, `main` == `origin/main`, produkcja == `main`
(potwierdzone na żywo 04.08).

**Zasady wspólne dla wszystkich briefów:**

- DoD wg `CLAUDE.md §6`: `npm run lint` zielony, `npm run build` przechodzi, dev server bez błędów
  w konsoli na `/`, `/portfolio`, `/uslugi`, `/blog`, `/kontakt`, dark mode działa na każdej
  odwiedzonej stronie. Dodatkowo `npx tsc --noEmit`.
- **Smoke-test ścieżek, nie stron.** Po każdym briefie dotykającym formularza: wypełnić
  i wysłać formularz w trybie deweloperskim, sprawdzić, że mail dochodzi i że pole `service`
  ma poprawną wartość.
- `next build` pada w sandboksie (Bus error) — **build lokalnie u Marcina.**
- **Git obsługuje Marcin.** Nie commituj, nie pushuj.
- Nie ruszaj niczego spoza briefu. Jeśli coś wygląda na „przy okazji" — do raportu, nie do kodu.
- **Każdy brief dotykający JSON-LD wchodzi w stop-condition `CLAUDE.md §10.3`** („zmiana `metadata`
  w `layout.tsx` **lub JSON-LD**). Dotyczy to trzech briefów poniżej: `-04` (`faq.ts` zasila
  `FAQPage`), `-09/-23` (`PriceSpecification` w `uslugi/[slug]/page.tsx`) i każdej próby ruszenia
  `hasOfferCatalog`. Wszystkie trzy mają linię **ZGODA** i nie startują bez odpowiedzi Marcina.
- **Zakres `blog.ts` w tych briefach:** wolno ruszać **wyłącznie warstwę metadanych** (`title`,
  `description`, `readTime`), bo decyzja „bez redakcji wstecznej" dotyczy **prozy wpisów**.
  Ani jedno zdanie w polu `content` nie jest w tych briefach do zmiany. Jeśli brief każe zmienić
  `content` — to błąd briefu, zatrzymać się.

---

## BRIEF `TRESC2608-01` · Licencja w Warunkach współpracy — usunięcie sprzeczności prawnej

**Zysk:** zero sprzeczności w dokumencie, na który klient B2B powoła się przy sporze o prawa
do materiału, za który zapłacił.

**Status: ZABLOKOWANY do czasu decyzji D1 Marcina.** Nie wykonywać przed odpowiedzią.

**Kontekst z liczbami.** Cztery powierzchnie mówią o licencji, trzy zgodnie, jedna inaczej:

- `src/components/Warunki.tsx:91` — „Licencja niewyłączna, bez limitu czasowego, **na własny użytek**"
- `src/data/faq.ts:60` — „Wszystkie licencje obejmują **użytek komercyjny**"
- `src/data/services.tsx:327` — „Licencja obejmuje **użytek komercyjny** bez ograniczeń czasowych"
- `public/llms.txt:30` — „na **użytek własny klienta** (www, social media, druk, reklama online)"

„Na własny użytek" bez doprecyzowania to w polskim prawie autorskim dozwolony użytek osobisty,
wykluczający działalność gospodarczą. Serwis sprzedaje wyłącznie materiał marketingowy dla firm.

**Warianty (do rozstrzygnięcia przez Marcina, patrz §12 raportu, D1):**

- **A (rekomendowany):** `Warunki.tsx:91` przechodzi na użytek komercyjny.
- **B:** trzy pozostałe powierzchnie przechodzą na „własny użytek klienta" z wyliczeniem pól.
- **C:** nie robić nic.

**Pliki (wariant A):** `src/components/Warunki.tsx` (1 linia).

**Proponowane zdanie (wariant A):**
> „Pliki surowe (RAW) nie wchodzą w cenę, pełny zestaw to +30% wartości zlecenia i decyzja przed
> sesją. Licencja niewyłączna, bez limitu czasowego, na użytek komercyjny Twojej firmy: strona,
> social media, druk i reklama online. Przeniesienie praw majątkowych albo przekazanie materiału
> podmiotom trzecim: +50%."

**AC mierzalne:**

1. `grep -rn "na własny użytek" src/` → **0 trafień** (wariant A).
2. Cztery powierzchnie licencyjne — `Warunki.tsx:91`, `faq.ts:60`, `services.tsx:327`,
   `llms.txt:30` — opisują **ten sam zakres pól eksploatacji**. Raport z wykonania zawiera cztery
   cytaty obok siebie, do porównania gołym okiem. (Uwaga: sam `grep` na „użytek komercyjny" **nie
   jest** kryterium — daje dziś 4 trafienia, ale dwa z nich siedzą w `blog.ts` i nie należą
   do tych czterech powierzchni.)
3. Odczyt na żywo `/galeria` i `/` z włączonym JS: sekcja Warunki i FAQ podają **ten sam** zakres
   licencji; porównanie dwóch cytatów w raporcie z wykonania.
4. Zdanie zamienne nie zawiera długiego myślnika, Title Case ani frazy z czarnej listy.
5. `npx tsc --noEmit` i `npm run lint` zielone.

**Stop:** jeśli Marcin wybierze wariant B, brief wraca do przepisania — zmiana dotknie
`faq.ts` (a więc JSON-LD `FAQPage`), `services.tsx` i `llms.txt`, czyli **trzech plików i danych
strukturalnych**. To osobny brief, nie rozszerzenie tego.

**ZGODA:** wymagana przed startem (stop-condition `CLAUDE.md §10.7` — rozbieżność w danych
biznesowych).

---

## BRIEF `TRESC2608-03` · Domknięcie ósmej usługi na ośmiu listach pisanych ręcznie

**Zysk:** linia obiektowa (kotwica 900 zł, najwyższa po pakietach) przestaje być niemierzalna
i przestaje znikać z formularza, z `llms.txt` i z danych strukturalnych.

**Status:** gotowy do wykonania. **Nie wymaga decyzji** poza jednym punktem oznaczonym niżej.

**Kontekst z liczbami.** Usługa `wnetrza-obiekty-architektura` włączona 04.08.2026
(`services.tsx:652-660`, `DRAFT_SERVICE_SLUGS` pusty), publiczna na produkcji, 625 słów treści
(najbogatsza z ośmiu), kotwica „od 900 zł netto". Powierzchnie generowane z danych ją mają
(kafelki, `/uslugi`, sitemapa, trasa, metadane). **Osiem list pisanych ręcznie jej nie ma.**

**Pliki i zakres:**

| Plik | Co zrobić |
|---|---|
| `public/llms.txt:7` | dopisać „fotografia hal, obiektów i wnętrz" do listy specjalizacji |
| `public/llms.txt` (sekcja usług) | dodać ósmą pozycję po `:23`, wzorem pozostałych siedmiu |
| `src/components/CTA.tsx` (~`:451`) | dodać `<option value="obiekty">` przed „Inne zapytanie" |
| `src/app/api/contact/route.ts` (~`:92`) | dodać `obiekty: "Fotografia hal, obiektów i wnętrz",` do `SERVICE_LABELS` |
| `src/data/services.tsx:783` | dodać wpis do mapy opinii dla `wnetrza-obiekty-architektura` |
| `src/data/blog.ts:1740` | dodać wpis do `blogServiceMap` **albo** świadomie zostawić pusty i odnotować |
| `src/app/uslugi/page.tsx:16` | rozszerzyć `description` huba o linię obiektową |
| `src/app/layout.tsx` (`hasOfferCatalog`) | **NIE RUSZAĆ w tym briefie** — stop-condition `§10.3`, osobny brief `TRESC2608-11` |

**Propozycja tekstu do `llms.txt`:**
> `- [Fotografia hal, obiektów i wnętrz](https://szabunia.pl/uslugi/wnetrza-obiekty-architektura):`
> `pakiety obiektowe 900/1300/1900 zł (do 8 ujęć z powietrza / do 14 z poziomem ziemi / do 24`
> `z blokiem wnętrz), retusz architektoniczny, pliki do druku i pod www, drugi obiekt tego samego`
> `typu w tym samym dniu taniej o 300 zł`

**Punkt do decyzji wewnątrz briefu:** mapa opinii. Nie ma cytatu od klienta z linii obiektowej.
**Wariant A (rekomendowany):** wskazać istniejący cytat Yes Butcher (ta realizacja obejmowała
wnętrza i trafiła do przewodnika Michelin — `services.tsx:551` już się na nią powołuje).
**Wariant B:** zostawić bez cytatu i odnotować jako świadomą lukę do czasu pierwszej realizacji.
Jeśli brak odpowiedzi — wariant B, bo nie wolno przypisywać cudzej opinii do usługi, której nie
dotyczyła.

**AC mierzalne:**

1. `grep -c "uslugi/" public/llms.txt` rośnie o 1; `grep -c "wnetrza-obiekty-architektura" public/llms.txt` → **≥1**.
2. Odczyt `<select>` na żywo (`document.querySelectorAll('select option').length`) → **10**
   (placeholder + 8 usług + „Inne zapytanie"). **Stan przed zmianą, zmierzony 04.08: 9**
   (placeholder + 7 usług + „Inne").
3. Wysłanie formularza z opcją obiektową kończy się **HTTP 200**, nie `400 „Nieznany rodzaj usługi"`;
   mail zawiera czytelną nazwę usługi, nie surowy kod.
4. `description` trasy `/uslugi` po zmianie ma **≤155 znaków** (mierzone skryptem, nie na oko)
   i wymienia linię obiektową.
5. Podstrona `/uslugi/wnetrza-obiekty-architektura` na żywo renderuje cytat opinii **albo**
   raport zawiera jawne zdanie, że wybrano wariant B.
6. Blok „Z bloga" na tej podstronie pokazuje wpisy tematycznie powiązane **albo** raport wyjaśnia,
   że w `blog.ts` nie ma wpisu o halach i wnętrzach i to jest świadoma luka.
7. `npm run lint` i `npm run build` zielone; smoke-test ścieżki „wejście na podstronę obiektową →
   formularz → wysyłka" przechodzi.

**Stop:** jeśli dodanie opcji do formularza wymaga zmiany walidacji po stronie serwera szerszej
niż jedna linia w `SERVICE_LABELS` — zatrzymać i opisać.

**ZGODA:** nie jest wymagana do startu (żadna z tych zmian nie dotyka `layout.tsx`, JSON-LD,
`next.config.ts` ani danych cenowych). Wymagana **tylko** dla punktu o mapie opinii — wariant A/B.

---

## BRIEF `TRESC2608-50` + `TRESC2608-51` + `TRESC2608-09` · Granica dron kontra linia obiektowa

**Zysk:** podstrona dronowa przestaje przechwytywać zapytania o dokumentację hal i budynków
i wyceniać je 600 do 1 200 zł poniżej kanonu. Najwyższy stosunek zysku do nakładu w całym audycie.

**Status:** gotowy do wykonania. **Gotowy diff leży w repo od 03.08 i nadal nie jest zastosowany.**

**Kontekst z liczbami.** Cennik `cennik_2026_07_v3.md:227` rozstrzyga granicę wprost:
*„Fotografujesz budynek, nie teren? Idź do sekcji 8. (…) Nie wyceniaj obiektów [z sekcji dronowej]."*
Mimo to podstrona dronowa (`price: "od 700 zł netto"`, `services.tsx:496`) sprzedaje zakres sekcji 8:

| Linia | Co tam jest | Odpowiednik w cenniku |
|---|---|---|
| `services.tsx:470` | `subtitle`: „budynki i obiekty firmowe, hale i magazyny, tereny, eventy i architektura" | sekcja 8 |
| `services.tsx:472` | „bryła, dach, otoczenie i drogi dojazdowe" | `:357` `OBIEKT PODSTAWOWY`, 900 zł, **dosłownie ten sam zakres** |
| `services.tsx:474` | `forWhom`: „Deweloperzy i firmy budowlane" | sekcja 8 |
| `services.tsx:476` | `forWhom`: „Firmy przemysłowe i logistyczne (hale, magazyny, tereny, place)" | sekcja 8 |
| `services.tsx:517` | `seo.description`: „Ujęcia 4K budynków, hal i magazynów" | sekcja 8 |

Różnica na zleceniu: **600 zł** (do `OBIEKT KOMPLETNY` 1 300 zł) albo **1 200 zł**
(do `OBIEKT PEŁNY` 1 900 zł). Komentarz w kodzie (`services.tsx:463-464`) potwierdza, że spięcie
obu linii zaprojektowano jednokierunkowo: „to podstrona obiektowa linkuje tutaj". Link idzie
z droższej do tańszej i treść nie odsyła z powrotem.

**Pliki i zakres:**

| Plik | Co zrobić |
|---|---|
| `src/data/services.tsx:470, 474, 476` | zastosować `docs/sesje/poprawki-dron-2026-08-03-NIEZASTOSOWANY.diff` |
| `src/data/services.tsx:517` | przepisać `seo.description` bez „budynków, hal i magazynów" (przy okazji domyka `TRESC2608-22`, 157 zn. → 142 zn.) |
| `src/data/services.tsx` (FAQ dronowe) | dopisać jedno pytanie kierujące do linii obiektowej |
| `src/data/services.tsx:584` | przepisać odpowiedź „czym to się różni od drona", która przy 900 zł jest nieprawdziwa (`TRESC2608-09`) |
| `src/data/services.tsx:571` | `heroPriceLabel` linii obiektowej: pokazać, że wnętrza zaczynają się wyżej niż 900 zł (`TRESC2608-51`) |

**Propozycje zdań:**

- Nowe pytanie w FAQ dronowym: *„Potrzebuję zdjęć budynku albo hali, nie samego terenu?"* →
  „To osobna usługa: fotografia hal, obiektów i wnętrz. Tam dochodzi poziom ziemi, retusz
  architektoniczny i pliki w dwóch wersjach, do druku i na stronę WWW."
- `:584` → „Sesja dronowa to ujęcia z powietrza. Sesja obiektu daje ten sam kadr z retuszem
  architektonicznym, czyli korektą perspektywy i prostowaniem linii, plus pliki w wersji do druku
  i pod www. Od pakietu kompletnego dochodzi poziom ziemi."
- `:571` → `heroPriceLabel: "pakiety od 900 zł, z wnętrzami od 1 500 zł"`
- `:517` → „Ujęcia 4K terenów, placów, inwestycji i eventów. Certyfikat A1/A3 i OC operatora.
  Dron łączę z sesją naziemną. Poznań i cała Polska." (przeliczyć skryptem, cel ≤155 zn.)

**AC mierzalne:**

1. `git diff --stat` po zastosowaniu diffa pokazuje **dokładnie jeden zmieniony plik**
   (`src/data/services.tsx`) i **6 zmienionych linii** — tyle ma diff z 03.08.
2. `grep -n "hale i magazyny\|Deweloperzy i firmy budowlane\|Firmy przemysłowe i logistyczne" src/data/services.tsx`
   → **0 trafień** w bloku usługi `zdjecia-wideo-z-drona` (linie ~455-520).
3. FAQ podstrony dronowej zawiera **dokładnie jedno** pytanie odsyłające do
   `/uslugi/wnetrza-obiekty-architektura`, z działającym linkiem (odczyt na żywo).
4. Odpowiedź `:584` **nie zawiera** zdania twierdzącego, że sesja dronowa jest tańsza, dopóki obie
   kotwice na progu podstawowym wynoszą 900 zł. Porównanie dwóch cytatów w raporcie z wykonania.
5. `seo.description` obu usług: **≤155 znaków**, mierzone skryptem, wartości podane w raporcie.
6. Na żywo `/uslugi/zdjecia-wideo-z-drona` i `/uslugi/wnetrza-obiekty-architektura`: żadne zdanie
   na jednej z nich nie opisuje zakresu, który cennik przypisuje drugiej. Wypisać w raporcie
   po jednym zdaniu granicznym z każdej.
7. `npm run lint` i `npm run build` zielone.

**Stop:** **nie zmieniać kotwic cenowych** (700 zł, 900 zł). Kolizja 900 zł pochodzi z cennika,
nie z serwisu, i jest przedmiotem decyzji D6, nie tego briefu. Zadaniem briefu jest **pokazać
różnicę, którą kanon zna**, a nie ją tworzyć.

**ZGODA:** nie jest wymagana do zastosowania diffa z 03.08 (był przygotowany do wdrożenia).
**Wymagana** do zmiany `heroPriceLabel` (`:571`), bo to komunikat cenowy — stop-condition
`CLAUDE.md §10.7`, powiązany z decyzją D6.

---

## BRIEF `TRESC2608-02` · Usunięcie formy „Wy" z usługi obiektowej i z FAQ eventowego

**Zysk:** ósma usługa przestaje brzmieć jak firma z zespołem na stronie, której cała propozycja
wartości brzmi „jedna osoba".

**Status:** gotowy do wykonania.

**Kontekst z liczbami.** W `services.tsx` jest 51 linii z formą 2. os. liczby pojedynczej
i **7 wystąpień liczby mnogiej**, z czego 6 w usłudze obiektowej. Naruszenie idzie w dwie strony:
do klienta (`dostajecie`, `wstawicie`, `potrzebujecie`, `chcecie`) i **do Marcina** — dwa pytania
FAQ w liczbie mnogiej (`Fotografujecie…?`, `Czy fotografujecie…?`), przy czym odpowiedź na drugie
wraca do liczby pojedynczej („Pracuję ze światłem zastanym"), a sąsiednie pytanie brzmi
„Na jakim sprzęcie **pracujesz**?". Wszystko potwierdzone na żywo 04.08 jako widoczne `<h3>`.

**Pliki i linie:** `src/data/services.tsx` — `:551`, `:584`, `:588`, `:589`, `:590`, `:168`.

**Świadomie NIE ruszamy w tym briefie:** `:586` („Mamy dwa takie same budynki. Płacę dwa razy?")
i `:587` („Czy dron poleci nad **naszą** halą?"). To 1. osoba liczby mnogiej **klienta mówiącego
o swojej firmie**, normalna w B2B i występująca w całym serwisie. Jedyne, co tam odstaje, to
zmiana liczby w obrębie jednego pytania („Mamy" → „Płacę") — drobiazg poniżej progu tego briefu.

**Propozycje zdań:**

| Linia | Jest | Proponuję |
|---|---|---|
| `:551` | „Pliki dostajecie w dwóch wersjach, do druku i pod www." | „Pliki dostajesz w dwóch wersjach, do druku i na stronę WWW." |
| `:584` | „…dokumentacją, którą wstawicie do oferty… Jeśli potrzebujecie samego ujęcia…" | „…dokumentacją, którą wstawisz do oferty… Jeśli potrzebujesz samego ujęcia…" |
| `:588` | „Przy budowie, którą chcecie dokumentować w czasie…" | „Przy budowie, którą chcesz dokumentować w czasie…" |
| `:589` | „Fotografujecie hale magazynowe i lokale użytkowe pod wynajem?" | „Fotografujesz hale magazynowe i lokale użytkowe pod wynajem?" |
| `:590` | „Czy fotografujecie też wnętrza biur i lokali?" | „Czy fotografujesz też wnętrza biur i lokali?" |
| `:168` | „Dla Was to nadal jedna osoba kontaktowa, jeden brief i jedna faktura." | „Dla Ciebie to nadal jedna osoba kontaktowa, jedne ustalenia i jedna faktura." |

Zmiana `:168` domyka przy okazji jedno z pięciu wystąpień „brief" (`TRESC2608-08`).
Zmiana `:551` domyka przy okazji jedno z „pod www" (`TRESC2608-35`).

**AC mierzalne:**

1. `grep -nE "dostajecie|wstawicie|potrzebujecie|chcecie|Fotografujecie|fotografujecie|Dla Was" src/data/services.tsx` → **0 trafień**.
2. Odczyt na żywo `/uslugi/wnetrza-obiekty-architektura`: żaden `<h3>` w sekcji FAQ nie jest
   w liczbie mnogiej; wszystkie 8 pytań w 2. os. liczby pojedynczej.
3. Odpowiedzi w tej usłudze nie mieszają form w obrębie jednej pary pytanie-odpowiedź (przejrzeć
   wszystkie 8 par i wypisać w raporcie).
4. Zdania zamienne nie wprowadzają długich myślników ani fraz z czarnej listy.
5. JSON-LD `FAQPage` na tej trasie zawiera te same pytania co widoczna treść (odczyt na żywo).
6. `npm run lint`, `npm run build`, `npx tsc --noEmit` zielone.

**Stop:** nie ruszać innych usług niż `wnetrza-obiekty-architektura` i linii `:168`
w `eventy-reportaze`. Reszta form adresatywnych jest poprawna.

**ZGODA:** nie jest wymagana. Zmiana dotyczy formy gramatycznej, nie faktu handlowego. Uwaga:
zmiana pytań FAQ przechodzi do JSON-LD `FAQPage` — to zamierzone, ale odnotować w raporcie.

---

## BRIEF `TRESC2608-04` · Wyrównanie warunków zmiany terminu i poprawek w FAQ

**Zysk:** klient przestaje mieć na stronie głównej i w danych strukturalnych warunki
korzystniejsze niż w sekcji, którą podpisuje.

**Status:** gotowy do wykonania. **Uwaga:** dotyka `faq.ts`, który zasila JSON-LD `FAQPage` na
stronie głównej — zmiana treści jest zamierzona i świadoma, ale trzeba to odnotować w raporcie.

**Kontekst z liczbami.** `faq.ts:44` mówi „Zmiana terminu minimum 48h przed sesją **jest
bezpłatna**" i pomija dwie kary, które są w `Warunki.tsx:102` i w `llms.txt:33`: 20% za drugą
i każdą kolejną zmianę oraz **100% za odwołanie w dniu realizacji**. To samo zdanie dokłada
uprawnienie, którego nie ma nigdzie indziej: „po pełnej akceptacji dzieła masz do 7 dni na
dodatkowe poprawki". Dwadzieścia osiem linii niżej (`faq.ts:72`) „7 dni" znaczy termin realizacji
poprawek przez Marcina, nie okno zgłaszania przez klienta.

**Pliki:** `src/data/faq.ts` (1 pole `a`).

**Proponowane zdanie:**
> „Zmiana terminu na minimum 48h przed sesją jest bezpłatna raz; każda kolejna to 20% wartości
> zlecenia, odwołanie poniżej 48h to 50%, a odwołanie w dniu realizacji 100%. Gotowe pliki
> archiwizuję przez rok. Poprawki zgłoszone po odbiorze realizuję w ciągu 7 dni i nie liczę
> terminu podstawowego od nowa."

**AC mierzalne:**

1. Trzy warunki finansowe (bezpłatna raz / 20% / 50% / 100%) występują w `faq.ts`, `Warunki.tsx`
   i `llms.txt` **w tym samym brzmieniu co do liczb** — porównanie trzech cytatów w raporcie.
2. `grep -n "masz do 7 dni na dodatkowe poprawki" src/` → **0 trafień**.
3. „7 dni" w `faq.ts` występuje wyłącznie w dwóch znaczeniach udokumentowanych w `Warunki.tsx`:
   termin płatności i termin realizacji poprawek. Wypisać oba wystąpienia w raporcie.
4. Odczyt na żywo `/`: FAQ i sekcja Warunki (jeśli obie się renderują na tej samej trasie)
   podają te same kary. Jeśli Warunki renderują się tylko na `/galeria` — odczytać obie strony.
5. JSON-LD `FAQPage` na `/` zawiera zaktualizowaną odpowiedź (odczyt `application/ld+json`).
6. Zdanie ≤ 320 znaków, bez długich myślników.

**Stop:** jeśli zmiana zdania wymagałaby dopisania warunku, którego nie ma **ani** w
`Warunki.tsx`, **ani** w `llms.txt` — zatrzymać. Nie wymyślać warunków handlowych
(`CLAUDE.md §11.8`).

**ZGODA:** **wymagana przed startem.** Podwójnie: `faq.ts` zasila JSON-LD `FAQPage`
(stop-condition `CLAUDE.md §10.3`), a zmiana dotyczy warunków handlowych (`§10.7`).

---

## BRIEF `TRESC2608-05` · Jeden czas trwania sesji wizerunkowej

**Zysk:** klient przestaje dostawać dwie odpowiedzi na to samo pytanie i przestaje móc policzyć
2 200 zł za godzinę.

**Status:** gotowy do wykonania.

**Kontekst z liczbami.** To samo pytanie („Ile trwa sesja wizerunkowa?") w dwóch plikach danych:
`services.tsx:324` → „Sama sesja może trwać **od 30 minut**"; `portfolio.ts:417` → „W zależności
od pakietu, **od 90 minut do 3 godzin**". Cennik (`llms.txt:20`): PORTRET STANDARD 1 100 zł =
**90 min**, PRO = 2 h, PRO MAX = do 3 h. Obie wersje wchodzą do JSON-LD `FAQPage` na dwóch
trasach. Klaster cenowy to 24% zapotrzebowania organicznego (GSC 04.08: 178 wyświetleń na trzech
frazach o koszcie sesji wizerunkowej, 0 kliknięć).

**Pliki:** `src/data/services.tsx:324`, opcjonalnie `src/data/portfolio.ts:417` (jeśli wybrane
brzmienie ma być identyczne w obu).

**Proponowane zdanie (`services.tsx:324`):**
> „Najkrótszy pakiet to 90 minut, dłuższe dają 2 do 3 godzin na więcej ujęć i zmiany stylizacji.
> Przychodzisz na gotowe, bo studio rezerwuję na 30 minut przed Twoją godziną i wcześniej
> rozkładam światło, więc nie czekasz na moje przygotowania."

**AC mierzalne:**

1. `grep -rn "od 30 minut" src/` → **0 trafień** w kontekście czasu trwania sesji.
2. Obie odpowiedzi na pytanie „Ile trwa sesja wizerunkowa?" podają **90 minut jako minimum**
   — dwa cytaty w raporcie.
3. Podany zakres zgadza się z siatką pakietów w `llms.txt:20` (90 min / 2 h / do 3 h).
4. Liczba „30 minut" zostaje wyłącznie w znaczeniu „rezerwacja studia przed godziną klienta",
   nigdzie jako długość sesji.
5. `npm run lint` i `npm run build` zielone.

**Stop:** to jest zmiana **faktu handlowego** (`CLAUDE.md §10.7`). Jeśli Marcin faktycznie
realizuje sesje 30-minutowe poza pakietami — zatrzymać i zapytać, bo wtedy problemem jest cennik,
nie zdanie.

**ZGODA:** **wymagana przed startem** (`§10.7` + `§10.3`: odpowiedź trafia do JSON-LD `FAQPage`
na dwóch trasach).

---

## BRIEF `TRESC2608-07` · Profil Firmy w Google (poza kodem, robota Marcina)

**Zysk:** trzy linie usługowe przestają być niewidoczne w kanale, który przy zerowych backlinkach
jest najtańszym źródłem lokalnej widoczności; jedna kotwica przestaje sugerować cenę pięciokrotnie
niższą od realnego minimum.

**Status:** gotowy. **Wykonuje Marcin.** Agentowi nie zlecać — audyt nie ma i nie powinien mieć
prawa zapisu w Profilu.

**Kontekst z liczbami (odczyt 04.08.2026).** Profil „Marcin Szabunia Fotograf Biznesowy",
ocena 5,0, 10 opinii, kompletność „Pełne informacje", 20 interakcji klientów. Godziny i telefon
zgodne z kanonem. Sześć usług plus dwa duplikaty w kategorii dodatkowej.

**Do zrobienia:**

1. **Dodać „Zdjęcia i wideo z drona", od 700 zł.** Ma własną podstronę i kotwicę.
2. **Dodać „Fotografia hal, obiektów i wnętrz", od 900 zł.** Ta sama usługa co
   `wnetrza-obiekty-architektura`.
3. **Nie dodawać pakietów** (2 100 zł) — to konfiguracja, nie usługa katalogowa, a kotwica w tej
   wysokości w Profilu odstrasza. Rekomendacja, nie polecenie.
4. **Uzupełnić „Fotografia korporacyjna" o jednostkę.** Dziś „Od 120 zł" bez „/os." przy realnym
   minimum 4 × 180 = 720 zł. Jeśli pole ceny nie przyjmuje jednostki — wpisać 720 zł jako
   „od" i wyjaśnić jednostkę w opisie.
5. **Usunąć „do CV" z opisu „Zdjęcia profilowe i portretowe".** Segment wykluczony w Google Ads
   od 20.05; raport z 30.07 kazał wątku nie rozbudowywać. Profil ściąga darmowy ruch dokładnie
   stamtąd, skąd przestano go kupować.
   Propozycja: „Portrety biznesowe i headshoty na LinkedIn, stronę firmy i materiały handlowe.
   Studio w Poznaniu albo mobilne studio w Twoim biurze."
6. **Rozważyć usunięcie duplikatów** („Fotografia korporacyjna" i „Fotografia portretowa"
   powtórzone w kategorii dodatkowej „Usługi fotograficzne").

**AC mierzalne:**

1. Profil pokazuje **7 usług** (6 obecnych + 2 nowe − rozstrzygnięcie duplikatów), każda z ceną.
2. Przejście po siedmiu pozycjach Profilu i odczyt pełnych opisów: **słowo „CV" nie występuje
   w żadnym**. Raport z wykonania zawiera siedem opisów przepisanych w całości (nie skrótów) —
   dopiero to zamyka też hipotezę `H-4` z raportu.
3. Kotwica sesji zespołowych ma widoczną jednostkę albo kwotę pakietu minimalnego.
4. Ceny wszystkich pozycji zgadzają się co do złotówki z polem `price` w `src/data/services.tsx`
   — zestawienie 7 par w raporcie.
5. Nazwa firmy, telefon i godziny bez zmian (są zgodne z kanonem, nie ruszać).

**Stop:** nie zmieniać nazwy firmy w Profilu bez osobnej decyzji — dziś brzmi „Marcin Szabunia
Fotograf Biznesowy" i różni się od czterech innych deskryptorów w serwisie i w Ads
(`TRESC2608-37`). To osobny temat i osobna decyzja.

**ZGODA:** cały brief JEST decyzją Marcina (D4) i jego robotą. Agentowi nie zlecać.

---

## BRIEF `TRESC2608-08` · Domknięcie „brief" w `services.tsx` (ogon `PELNY2907-12`)

**Zysk:** zamknięcie findingu, który od 29.07 wisi ze statusem „częściowo wdrożony".

**Status:** gotowy do wykonania.

**Kontekst.** Pięć powierzchni w `services.tsx`, w tym **widoczny nagłówek `<h3>` kroku procesu**
na podstronie dronowej. `Services.tsx:117` niesie komentarz „Głos strony, bez żargonu «brief»" —
reguła jest w repo zapisana i łamana pięć plików obok.

**Pliki i linie:**

| Linia | Jest | Proponuję |
|---|---|---|
| `services.tsx:498` | `title: "Brief i zgody"` | `title: "Ustalenia i zgody"` (jak `:574`) |
| `services.tsx:271` | „Po krótkim briefie podaję jedną, konkretną wycenę…" | „Po krótkiej rozmowie podaję jedną, konkretną wycenę…" |
| `services.tsx:273` | „Wycena po krótkim briefie." | „Wycenę odsyłam po krótkiej rozmowie." |
| `services.tsx:274` | „…dokładam je do wyceny na etapie briefu." | „…dokładam je do wyceny przy ustalaniu zakresu." |
| `services.tsx:168` | „…jeden brief i jedna faktura." | domknięte w briefie `TRESC2608-02` |

**AC mierzalne:**

1. **`grep -in "brief" src/data/services.tsx`** (case-insensitive — bez `-i` grep nie widzi
   `title: "Brief i zgody"` w `:498`, czyli najważniejszej powierzchni) po odjęciu komentarzy
   odsyłających do numerów briefów projektowych i do ścieżek w `01_Biznes/` → **0 trafień**.
   Dziś ten sam grep daje 5 trafień: `:168`, `:271`, `:273`, `:274`, `:498`.
2. Odczyt na żywo `/uslugi/zdjecia-wideo-z-drona`: żaden `<h3>` w pasku procesu nie zawiera słowa
   „brief".
3. Kroki procesu na wszystkich 8 podstronach usług mają nazwy polskie, bez żargonu — wypisać
   32 nazwy kroków w raporcie.
4. `npm run lint` i `npm run build` zielone.

**Stop:** dziewięć powierzchni „mini-brief" w lejku poradnika **nie wchodzi do tego briefu** —
czekają na decyzję D5 Marcina (wymiana słowa kontra poprawka pisowni).

**ZGODA:** nie jest wymagana. Zmiana nazw kroków procesu nie dotyka JSON-LD ani faktów handlowych.

---

## BRIEF `TRESC2608-23` · `minPrice` 120 zł w JSON-LD przy realnym minimum 1 120 zł

**Zysk:** Google przestaje dostawać 120 zł jako minimalną cenę usługi, której najmniejsze
możliwe zamówienie kosztuje blisko dziesięć razy tyle.

**Status:** gotowy do wykonania. **Część tekstowa `TRESC2608-09` przeszła do briefu
„Granica dron kontra linia obiektowa"** — tutaj zostaje wyłącznie warstwa maszynowa.

**Kontekst z liczbami.** `uslugi/[slug]/page.tsx:81-82` wyciąga regexem pierwszą liczbę z pola
`price` i wstawia ją jako `minPrice` w `PriceSpecification`. Dla `"od 120 zł netto/os."`
(`services.tsx:201`) daje to `minPrice: "120"` i gubi kwalifikator „za osobę".

Realne minimum, policzone z `cennik_2026_07_v3.md`: sekcja startuje od czterech osób (`:282`),
stawka w przedziale 4-10 osób to 180 zł (`:288`), więc **4 × 180 = 720 zł** samej stawki osobowej,
plus miejsce: mobilne studio 450 zł (`:308`) albo zewnętrzne od 400 zł (`:302`).
**Realne minimum all-in: 1 120 do 1 170 zł netto.** Dane strukturalne deklarują dziś próg
**dziewięciokrotnie niższy**. Dla pozostałych siedmiu usług ten sam kod działa poprawnie
(600, 2 100, 1 100, 400, 600, 700, 900) — to jedyna kotwica z jednostką.

Kotwica tekstowa jest przy tym **kanoniczna i uczciwie objaśniona** (`services.tsx:212` i
`llms.txt:18` tłumaczą mechanikę progów zgodnie z cennikiem `:290-292`). Problem powstaje wyłącznie
przy odczycie maszynowym.

**Pliki:** `src/data/services.tsx` (interfejs `ServiceData` + jedna usługa),
`src/app/uslugi/[slug]/page.tsx`.

**Propozycja:** nowe opcjonalne pole `jsonLdMinPrice?: number` w `ServiceData`; dla
`sesje-zespolowe` wartość podana przez Marcina (720 zł za samą stawkę osobową albo 1 120 zł
all-in — to jego decyzja, nie moja). Regex zostaje jako fallback dla pozostałych siedmiu.

**AC mierzalne:**

1. Odczyt JSON-LD na żywo `/uslugi/sesje-zespolowe`: `minPrice` **≠ 120**, wartość równa liczbie
   podanej przez Marcina.
2. Pozostałe 7 usług: `minPrice` bez zmian. Zestawienie ośmiu wartości przed i po w raporcie.
3. Widoczna kotwica na stronie **bez zmian**: nadal „od 120 zł netto/os." z sufiksem o progu
   31 osób. Ten brief nie dotyka warstwy widocznej.
4. `npx tsc --noEmit` zielone (pole opcjonalne, nie łamie typów pozostałych siedmiu usług).

**Stop:** **nie zmieniać kotwicy widocznej.** Jest zgodna z cennikiem co do złotówki.

**ZGODA:** **wymagana przed startem.** `PriceSpecification` to JSON-LD (stop-condition
`CLAUDE.md §10.3`), a wartość `jsonLdMinPrice` jest liczbą handlową (`§10.7`). Bez kwoty
od Marcina brief nie startuje.

---

## LISTA DO RUNDY REDAKCYJNEJ BLOGA (diagnoza, nie brief)

`blog.ts` wszedł do audytu **diagnostycznie**. To nie jest brief do wykonania — to lista wpisów
posortowana wg ruchu z GSC (odczyt 04.08, okno 3 miesiące, dane do ~1.08). Runda redakcyjna bloga
jest osobnym projektem i wymaga osobnej decyzji o zakresie.

**Ograniczenie, które trzeba znać:** interfejs GSC pokazał mi **10 stron z 43**. Dla pozostałych
wpisów nie mam liczb i sortuję je objętością, nie ruchem. To jest jawna dziura w tej liście.

### Warstwa A — wpisy z potwierdzonym ruchem, priorytet redakcyjny

| # | Wpis | GSC 3 mies. | Słów | Co jest do zrobienia |
|---|---|---|---|---|
| 1 | `ile-kosztuje-sesja-wizerunkowa-dla-firmy` | **309 wyśw. / 0 klik.** | 399 | Największa zerowa pozycja w serwisie. Klaster cenowy = 178 wyśw. na trzech frazach z top-10. Raport z 30.07 zamknął ją jako „problem rankingowy, nie tekstowy" (poz. 25,66) — **sprawdzić, czy pozycja się poprawiła**; jeśli tak, klasyfikacja się zmienia |
| 2 | `jak-przygotowac-sie-do-sesji-biznesowej` | **198 / 0** | 357 | Klaster „przygotowanie/stylizacja", 157 wyśw. w poprzednim oknie. `readTime` 6 min przy 357 słowach |
| 3 | `slownik-pojec-wideo` | 165 / 0 (dane 30.07) | 634 | `TRESC2608-16`: z tytułu zniknęła fraza pytająca. Jedyna strona, gdzie raport z 30.07 orzekł, że problemem JEST tekst |
| 4 | `zdjecie-do-cv-w-domu` | **121 / 1** | 362 | Segment wykluczony w Ads od 20.05. `readTime` 8 min przy 362 słowach (45 sł./min, rekord serwisu). Decyzja: rozwijać czy wygaszać |
| 5 | `fotografia-przemyslowa-fabryka` | 22 / 1 | **1 046** | Najdłuższy wpis, jeden z dwóch outlierów. Mówi o halach produkcyjnych, ale nie używa słów „wnętrza"/„obiekty"/„architektura" — **naturalny kandydat na wsparcie nowej linii obiektowej** |
| 6 | `zdjecia-ai-vs-profesjonalna-sesja` | 18 / 1 | 341 | |

### Warstwa B — kanibalizacja, do rozstrzygnięcia razem, nie osobno

| Klaster | Wpisy | Problem |
|---|---|---|
| packshot | `co-to-jest-packshot` (602 sł.), `fotografia-produktowa-ecommerce` (1 040) | `TRESC2608-12`: trzy indeksowane trasy na klaster 39% zapotrzebowania, 0 kliknięć |
| headshoty zespołu | `headshoty-zespolu-w-jeden-dzien` (436), `spojne-portrety-zespolu` (349) | `TRESC2608-13`: kanibalizacja **powstała po 30.07** |
| cena filmu | `ile-kosztuje-film-z-drona` (444), `ile-kosztuje-film-promocyjny` (377) | podobieństwo H1 = **0,67**, najwyższe w serwisie |
| pakiety | `pakiet-foto-wideo-czy-osobno` (415), `foto-wideo-dron-z-jednego-wejscia` (458), `obsluga-foto-wideo-eventu-firmowego` (424) | trzy wpisy o tym samym wyborze |

### Warstwa C — higiena, do zrobienia hurtem przy okazji rundy

| Co | Skala | ID |
|---|---|---|
| `readTime` zawyżone | **22 wpisy z 26**, mediana 84 słowa/min przy realnych ~200 | `TRESC2608-49` |
| Cudzysłowy: otwierający „ (U+201E) domykany prostym `"` | **48 par w całym pliku, 0 znaków ” (U+201D)** | dawne `H-6`, zweryfikowane pomiarem |
| „Social Media" wielką literą | **9 wystąpień**, wyłącznie w `blog.ts` | §2.5 raportu |
| „Poseboard" obok „moodboardu" w jednym zdaniu (`:171`) | 4 wystąpienia w `blog.ts` | `TRESC2608-20` |
| Kwoty raz z „netto", raz bez, w obrębie jednego wpisu (`:507` vs `:528`) | co najmniej 2 wpisy | §5 raportu |
| Opisy >155 zn. | 3 wpisy (`:920`, `:1586`, `:1639`) | `TRESC2608-38` |
| „kompleksową obsługę" w `title` i `description` (`:1193`, `:1243`) | 1 wpis | czarna lista |

### Warstwa D — wpisy bez danych o ruchu, posortowane objętością rosnąco

Najkrótsze mają 327-365 słów przy medianie 426 i **18 z 26 mieści się w paśmie 327-458** — to nie
jest rozrzut, to jeden szablon: 5-8 sekcji H2 po 40-60 słów.

`fotografia-eventowa-vs-reportaz` (327) · `jak-wybrac-fotografa-na-event` (346) ·
`zdjecia-na-strone-firmowa` (361) · `sesja-wizerunkowa-poznan` (365) ·
`co-zalozyc-na-sesje-biznesowa` (401) · `live-editing-na-evencie` (428) ·
`zdjecia-z-drona-dla-deweloperow` (441) · `zdjecia-film-z-drona-dla-firm` (603) ·
`bledy-zdjecia-zespolu` (878) · `headshoty-linkedin-konwersja` (940) ·
`wideo-marketing-dla-firm-formaty` (972)

**Zanim ta runda ruszy, potrzebny jest pełny eksport GSC z rozbiciem na 43 strony.** Bez niego
Warstwa D jest sortowana kryterium, które nie ma nic wspólnego z tym, co przynosi ruch.

---

# Wymagają zgody Marcina

| # | Sprawa | Gdzie |
|---|---|---|
| 1 | **D1 — brzmienie licencji.** Wariant A/B/C. Blokuje brief `TRESC2608-01` | §12 raportu |
| 2 | **D2 — zamrożenie rundy tytułów do 1.09** albo przepisywanie mimo nieprzeczytanej kolejki | §12 raportu |
| 3 | **D3 — nazwa „Wizerunek & Portrety"** → „Portrety biznesowe" | §12 raportu |
| 4 | **D4 — zakres uzupełnień w Profilu Firmy** (dron + obiekty tak, pakiety nie) | §12 raportu |
| 5 | **D5 — „mini-brief"**: wymiana słowa czy poprawka pisowni | §12 raportu |
| 6 | Mapa opinii dla usługi obiektowej: cytat Yes Butcher czy świadoma luka | brief `TRESC2608-03` |
| 7 | Realne minimum sesji zespołowej do `jsonLdMinPrice` | brief `TRESC2608-09/23` |
| 8 | Czy sesje 30-minutowe faktycznie istnieją poza pakietami | brief `TRESC2608-05` |
| 9 | Zmiana `metadata` w `layout.tsx` / JSON-LD `hasOfferCatalog` (`TRESC2608-11`) — stop-condition `§10.3` | osobny brief, nienapisany |
| 10 | **D6 — kotwica linii obiektowej 900 zł** kontra „od 400 zł" w nagłówku sekcji 8 cennika | §12 raportu |
| 11 | **D7 — dwie luki, w których kanon jest uboższy od serwisu**: model rozliczenia i nocleg. Jedyne pozycje, gdzie do poprawy jest cennik, nie strona | §12 raportu |
| 12 | Kwota do `jsonLdMinPrice` dla sesji zespołowych: 720 zł czy 1 120 zł all-in | brief `TRESC2608-23` |

---

# Poza kodem — agentowi nie zlecać

- **Profil Firmy w Google** (`TRESC2608-07`): dodanie usług, poprawa opisu, uzupełnienie jednostki
  przy cenie. Wykonuje Marcin, ~30 minut.
- **Google Ads:** pełny odczyt komponentów RSA był 04.08 zablokowany komunikatem „Turn off ad
  blockers". Potrzebne jedno przejście przy wyłączonym blokerze albo eksport CSV raportu
  komponentów — dopiero wtedy da się ocenić pozostałe 12 nagłówków i 3 opisy każdej reklamy
  (`H-5`). Sam odczyt, żadnych zmian w kampaniach.
- **Powtórzenie odczytu SERP 1.09** (`TRESC2608-06`, tabela w §11 raportu). To warunek brzegowy
  dla całej kolejki SEO.
- **Eksport GSC z rozbiciem zapytania × strony** — potrzebny do rozstrzygnięcia `H-3` (popyt na
  „hale" kontra „architektura") przed poprawką `TRESC2608-15`.
- **PDF poradnika** — nadal nieprzeczytany, drugi audyt z rzędu. Ktoś musi go otworzyć i sprawdzić,
  czy nie zawiera cen ani odesłań do nieistniejących sekcji.
- **`http://szabunia.pl/` jako osobna strona w GSC** (3 klik., 17 wyśw.) — warstwa techniczna,
  przekazane osi technicznej z dowodem, nie do tego briefu.

---

# Czego NIE robić — zamknięte decyzje (pamięć antyregresyjna)

1. ⛔ **Nie proponować cennika, tabeli cen ani sekcji „Cennik"** — decyzja Marcina z 03.08,
   podjęta świadomie po przedstawieniu trzech wariantów. **Też nie jako ulepszenie SEO.**
2. ⛔ **Kotwice „od X zł" zostają** i są jedynym miejscem na stronie, gdzie pada kwota.
3. ⛔ **Słowo „cennik" zostaje** w nagłówkach i w pytaniach FAQ — to ono jest wpisywane
   w wyszukiwarkę. Zmienia się obietnica, nie słownictwo.
4. ⛔ **Nie redagować cytatów klientów** (`Testimonials.tsx`, pola opinii w `portfolio.ts`).
   Zawierają frazy z czarnej listy i tak zostają. Wolno wyłącznie ujednolicić zapis tej samej
   wypowiedzi między plikami.
5. ⛔ **`blog.ts` bez redakcji wstecznej — dotyczy PROZY wpisów (pole `content`).** Wyjątek:
   usuwanie żargonu wykreślonego z serwisu. **Warstwa metadanych bloga** (`title`, `description`,
   `readTime`) **nie jest objęta tym zakazem** — to nie jest redakcja treści, tylko higiena
   metadanych, i tak traktują ją `TRESC2608-13`, `-16`, `-38` i `-49` oraz quick win #10.
   Gdyby Marcin uznał inaczej, te cztery pozycje wypadają z kolejki.
6. ⛔ **Nie przywracać `priceRange` ani `aggregateRating`/`review[]` w JSON-LD.**
7. ⛔ **Nie dodawać LinkedIn ani Facebooka do `sameAs`** bez osobnej decyzji.
8. ⛔ **Nie odwracać depricingu z 23.07** ani nie odbudowywać kalkulatora.
9. ⛔ **Miasto w nagłówkach RSA w Google Ads jest poprawne i potrzebne** — dowód z 02.08
   (usunięcie trzech nagłówków ze słowem „produktowa" zbiło Skuteczność reklamy z „Dobra" na
   „Średnia"). Nie „poprawiać" tego pod zasadę o mieście.
10. ⛔ **Nie dodawać `meta keywords`.** Nie istnieje w repo i to jest poprawne.
11. ⛔ **Nie przepisywać tytułów stron poniżej pozycji 15** — to problem rankingowy, nie tekstowy
    (ustalenie z 30.07).
12. ⛔ **Nie optymalizować `/uslugi/zdjecia-wideo-z-drona` pod obecne zapytania** — 90 ze 113
    wyświetleń pochodziło spoza obszaru działania (Skawina, Łańcut, Bochnia).
13. ⛔ **Nie rozbudowywać wątku „zdjęcie do CV"** — kandydaci do pracy, `cv` wykluczone
    w Ads od 20.05.
14. ⛔ **`hidden md:block` + `md:hidden` to nie duplikat.** Zdublowany pasek procesu na podstronie
    obiektowej jest wariantem responsywnym — sprawdzone pomiarem 04.08 (`0 × 0 px`).
15. ⛔ **Długie myślniki w komentarzach kodu nie są naruszeniem.** 161 ze 169 trafień grepa
    w `src/` to komentarze; z ośmiu pozostałych trzy to placeholdery w mailu do Marcina. Zakaz dotyczy wyłącznie tekstu widocznego dla użytkownika.
16. ⛔ **Dywiz w nazwach sprzętu i marek** („Sigma 70-200 mm", „b-roll", „E-commerce")
    **nie jest błędem.**
17. ⛔ **Hasło „REALIZUJĘ CELE TWOJEJ MARKI" zostaje** jako `h2` — decyzja z 30.07,
    udokumentowana w `Hero.tsx:34-40`.
18. ⛔ **Nazw usług w Profilu Firmy nie da się przepisać** — „Produkt", „Wydarzenia i przyjęcia",
    „Fotografia korporacyjna" to predefiniowane pozycje Google. Oceniać wyłącznie opisy i ceny.

---

*Briefy powstały z audytu, który niczego nie zmienił. Żaden z powyższych tekstów nie został
wprowadzony do kodu, do paneli ani do Profilu Firmy.*
