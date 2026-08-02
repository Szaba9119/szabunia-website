# Przegląd redakcyjny: czy teksty są napisane właściwie

Data: 2026-08-02, po korekcie językowej z tego samego dnia. Zakres: 22 strony bez bloga.
Rubryka: `docs/zasady-tekstow.md` (Twój kanon redakcyjny).
Metoda: dwa niezależne przebiegi na wyrenderowanym tekście, każdy finding zweryfikowany
przeze mnie w źródle (`plik:linia`). Nic nie zostało zmienione poza kartą „Kto to zrobi",
którą zatwierdziłeś w rozmowie.

Wynik mechaniczny, na dobry początek: **zero długich myślników** w tekstach widocznych
(Twoja twarda reguła jest trzymana), **zero podwójnych spacji**, **zero miast doklejonych
przecinkiem w nagłówkach**. Wykrzykniki i frazy z czarnej listy występują wyłącznie
w cytatach klientów, czyli tam, gdzie mają prawo być.

---

## A. Łamie Twój własny spisany kanon

To nie jest mój gust. To są zdania sprzeczne z regułami, które sam zapisałeś
w `docs/zasady-tekstow.md`.

### A1. „dopasowaną do Twojego budżetu" — czarna lista, na ośmiu stronach
`src/components/CTA.tsx:158-159`

> Jest: „Odpowiadam w ciągu 24h ze wstępną wyceną **dopasowaną do Twojego budżetu**."

Kanon ma na czarnej liście „dopasowane do Twoich potrzeb/oczekiwań". To ten sam wzorzec.
Do tego obiecujesz dopasowanie do budżetu, którego jeszcze nie znasz. Zdanie renderuje się
w bloku kontaktowym na **każdej** stronie z formularzem.

> Proponuję: „Odpowiadam w ciągu 24h, ze wstępną wyceną i propozycją terminu."

Ta wersja już istnieje na stronie: `src/app/kontakt/page.tsx:42`.

### A2. „100+ zadowolonych firm B2B" — ocena doklejona do twardej liczby
`src/components/CTA.tsx:292`

„Zadowolonych" jest nieweryfikowalne i osłabia liczbę, która sama w sobie jest dowodem.
Kanon: zamiast haseł liczba, nazwa klienta, konkret.

> Proponuję: „100+ firm B2B z całej Polski"

Wzór z Hero: „Zaufało mi 100+ firm z całej Polski" (`Hero.tsx:117-121`).

### A3. „wejście" przeżyło w FAQ o sprzęcie
`src/data/services.tsx:231` · /uslugi/pakiety-foto-wideo

> Jest: „Jeden zestaw obsługuje całe **wejście** foto, wideo i dron."

To jest dokładnie to słowo, które 30.07 wykreśliliśmy z całego serwisu po sprawdzeniu
w GSC i w wyszukiwanych hasłach z Ads (zero wystąpień, Ty sam nie umiałeś powiedzieć, czy
znaczy „z jednego eventu", czy „od jednej osoby"). Żyje dalej w widocznym FAQ.

> Proponuję: „Jeden zestaw obsługuje zdjęcia, film i dron."

### A4. „one-man-band" w odpowiedzi na polskie pytanie
`src/data/services.tsx:228`

> Jest: „Tak, pracuję w modelu **one-man-band**."

Kanon: nie wymyślaj własnego słownika, używaj słów, których używa klient.

> Proponuję: „Tak, zdjęcia, film i dron robię sam."

Renderuje się na tej samej stronie, ekran wyżej, w karcie „Kto to zrobi".

### A5. „Brief" wrócił w case study
`src/data/portfolio.ts:324` · /portfolio/yes-butcher-przewodnik-michelin

> Jest: „**Brief** obejmował komplet materiału w jeden dzień zdjęciowy…"

Słowo odrzucone przy okazji głosu mikrokopii; `About.tsx:56` mówi już „krótka droga
od **pierwszej rozmowy** do dostawy".

> Proponuję: „Klient potrzebował kompletu materiału w jeden dzień zdjęciowy…"

### A6. Hasła bez faktu, tam gdzie fakt leży obok
`src/data/services.tsx:100`, `:247`, `:300`

| Jest | Gdzie | Proponuję |
|---|---|---|
| „Każde wydarzenie to historia, którą warto opowiedzieć." | eventy | usunąć; akapit otwiera się istniejącym „Fotografię eventową robię od początku działalności." |
| „Portret biznesowy to Twoja wizytówka **w cyfrowym świecie**." | portrety | „Portret biznesowy to Twoja wizytówka na LinkedIn i na stronie firmy." |
| „Wideo to **najskuteczniejsza** forma komunikacji w social mediach." | wideo | usunąć; następne zdanie jest już konkretne |

### A7. „klimat dopasowany do Twojej branży" — czarna lista, drugi raz
`src/data/services.tsx:247`

> Proponuję: „Zaczynamy od krótkiej rozmowy, w której ustalamy cel, styl i logistykę,
> a przed sesją dostajesz poseboard z referencjami."

Ta wersja istnieje w `faq.ts:24`.

### A8. „4 proste kroki" — ocena własnej usługi
`src/components/Process.tsx:62` → „4 kroki od pierwszego kontaktu do gotowych materiałów."

### A9. Bezosobowe i „Wy" tam, gdzie reszta mówi „ja / Ty"
- `services.tsx:175` „Brakujące osoby **dograć można**…" → „Brakujące osoby **dogrywam**…"
- `services.tsx:229` „**deklarujecie** liczbę wydarzeń" → „możemy ustalić liczbę wydarzeń z góry"

---

## B. Brzmi niezręcznie albo mówi co innego, niż miało

### B1. Zdanie mówiące odwrotnie, niż zamierzone
`src/data/faq.ts:16`

> Jest: „Zawsze wyceniam indywidualnie, żeby **nie przepłacać** za to, czego nie potrzebujesz."

Domyślnym podmiotem „nie przepłacać" jesteś Ty, nie klient. Zdanie dosłownie mówi, że to
Ty nie przepłacasz.

> Proponuję: „Wyceniam indywidualnie, więc **nie płacisz** za to, czego nie potrzebujesz."

### B2. „strona formalna jest po mojej stronie"
`src/data/services.tsx:399` i `:437` · dwa razy na jednej podstronie

Podwojone „strona" w jednym zdaniu.

> Proponuję: „…a formalności biorę na siebie."

Ta wersja istnieje w blurbie cenowej tej samej usługi (`services.tsx:429`).

### B3. „naturalny grunt"
`src/data/services.tsx:100` — kontaminacja „naturalnego środowiska" i „podatnego gruntu".
Proponuję usunąć całe zdanie: poprzednie („kilka różnych miejsc jednego wieczoru") już to
pokazuje, zamiast deklarować.

### B4. „Jedna sesja pokryła cztery rodzaje fotografii"
`src/data/portfolio.ts:324` — kalka z „covered".
> Proponuję: „Z jednej sesji powstały cztery rodzaje zdjęć…"
Wzór obok: „Jedna sesja, cztery rodzaje fotografii" (`portfolio.ts:359`).

### B5. Broszura w FAQ
`src/data/faq.ts:52`

> Jest: „Otrzymujesz starannie wyselekcjonowane i poddane autorskiej postprodukcji materiały,
> które stanowią gotowy, spójny produkt."
> Proponuję: „Dostajesz materiał po selekcji i mojej postprodukcji, gotowy do publikacji."

### B6. „X, które Y" dwa razy z rzędu
`src/data/faq.ts:48` → „Z tego albumu sam zaznaczasz kadry do retuszu, więc masz pełną
kontrolę nad finalną edycją." (wzór: `Process.tsx:30`)

### B7. Przecinek rozbijający zatwierdzoną frazę
`src/components/Services.tsx:19` „Zdjęcia, film i dron dla firm**,** od jednej osoby."
→ bez przecinka, jak w Hero i w kanonie.

### B8. „na plan z planem"
`src/app/poradnik/page.tsx:92` — niezamierzona rymowanka.
→ „…wolisz wejść na **sesję** z planem, a nie z nadzieją."

---

## C. To samo powiedziane dwa razy

1. **Cena sesji zespołowych w jednym FAQ dwa razy.** `services.tsx:170` + `:173` niosą
   ten sam fakt („120 zł od 31 osób, mniejsze grupy drożej"), a szablon skleja je w jedną
   odpowiedź. Do usunięcia jedno z dwóch.
2. **„Pakiet całodniowy się opłaca" dwa razy** w FAQ eventów: `services.tsx:123` (blurb
   cenowy) i `:130` (osobne pytanie).
3. **„od jednej osoby" i „Jeden twórca" obok siebie** w karcie Pakietów
   (`services.tsx:197`).
4. **„zdjęcia kreatywne z aranżacją" dwa razy w jednym akapicie**
   (`services.tsx:347`).
5. **„internetową / internetowy" w jednym zdaniu**, dwa razy w Artechu
   (`portfolio.ts:218`, `:254`). Trzy wiersze niżej jest już czysta wersja: „pod stronę,
   katalog i sklep" (`:240`).
6. **„Poseboard" w tytule kroku, „moodboard" w opisie tego samego kroku**
   (`services.tsx:266`, `portfolio.ts:386`). Reszta serwisu mówi konsekwentnie „poseboard".

---

## D. Rozjazd treści z rzeczywistością

### D1. Lead na `/portfolio` zapowiada kategorie, których w siatce nie ma
`src/app/portfolio/page.tsx:78`

> Jest: „Wybrane realizacje dla firm: sesje wizerunkowe, reportaże z eventów, **sesje
> korporacyjne** i fotografia produktowa."

Dwie z wymienionych kategorii („sesje wizerunkowe", „sesje korporacyjne") są dziś szkicami
z `noindex`, więc kafli pod tym zdaniem nie ma. Czytelnik dostaje obietnicę czterech
kategorii i widzi cztery zupełnie inne realizacje.

> Proponuję: „Wybrane realizacje dla firm: event firmowy, headshoty zespołu, packshoty
> i film z produkcji oraz sesja do przewodnika Michelin."

To jedyna pozycja w tym raporcie, która jest rozjazdem faktu, nie stylu.

### D2. Opis meta całego serwisu wciąż mówi „od briefu"
`src/app/layout.tsx:43` i `:61`

> „Jeden twórca, spójny materiał, krótka droga **od briefu** do dostawy."

`About.tsx:56` mówi już „od pierwszej rozmowy do dostawy". To jest opis, który widać
w Google i przy udostępnianiu w social mediach.

**Uwaga: `metadata` w `layout.tsx` jest stop-condition z `CLAUDE.md §10`.** Nie ruszam
tego bez Twojej wyraźnej zgody, nawet jeśli poprawka jest oczywista.

---

## E. Dobre, nie ruszać

Wypisuję, żeby przy kolejnej rundzie nikt tego nie „poprawił":

- „Nie musisz być modelem, wystarczy być sobą. Reszta to moja robota."
- „Prowadzę Cię przez pozowanie, w studiu lub Twoim biurze. Nie musisz nic umieć."
- „Zdjęcia, które robię dla klientów, przechodzą przez cudzą redakcję."
- „Cztery strony A4 w PDF, bez wstępu o tym, jak ważny jest wizerunek."
- „Nie musisz znać póz, od tego jestem ja."
- „To autorska selekcja najlepszych momentów, a nie wszystkie wykonane kadry."
- „Minimum 3 m² wolnej przestrzeni i gniazdko. Sala konferencyjna, hol lub korytarz,
  wszystko się sprawdzi."
- „Wideo pracuje na stronie i w rozmowach handlowych: zamiast opisywać możliwości
  produkcyjne, Artech po prostu je pokazuje."
- „Bez zobowiązań. Odpowiadam osobiście."
- „W praktyce pierwsza tura prawie zawsze wystarcza."
- „Jeden twórca, spójny materiał i krótka droga od pierwszej rozmowy do dostawy."
- „Zdjęcia, film i ujęcia z drona robię sam. Dostajesz jeden termin, jedną fakturę
  i spójny materiał." (karta „Kto to zrobi", po Twojej dzisiejszej akceptacji)

---

## F. Wzorzec do zapamiętania na przyszłość

W case studies pole `challenge` i pole `description` opisują tę samą rzecz dwa razy,
i **za każdym razem wersja w `description` jest lepsza** (Artech, Yes Butcher, IDcom,
E-commerce All-in). Przy kolejnych realizacjach warto pisać `challenge` jako skrócenie
`description`, a nie od zera.

Drugi wzorzec: przy każdym nowym zdaniu opłaca się najpierw sprawdzić, czy ta myśl nie jest
już gdzieś na stronie napisana lepiej. Sześć z powyższych propozycji to nie moje wymysły,
tylko sformułowania, które już u Ciebie działają w innym miejscu.

---

## G. Czego nie oceniałem

- **Cytatów klientów** (Formalik, Wagner, Burzyńska, Fortuniak, opinie Google przy case
  studies). Nietykalne, mimo że zawierają „na najwyższym poziomie", „profesjonalne
  podejście" i wykrzykniki.
- **Cen, terminów, liczb i warunków.** Żadna z powyższych propozycji nie zmienia faktu.
- **Nazw usług i etykiet formularza** — to słownik ustalony na danych z GSC i Ads.
- **26 wpisów bloga.** Kanon wyłącza `blog.ts` z wstecznej redakcji. Zajawki renderujące się
  na podstronach mają kalki („must-have ujęcia", „potrafi zrobić albo zepsuć portret",
  „Odpowiednie przygotowanie to połowa sukcesu") i czekają na osobną rundę.
- **Pięciu szkiców portfolio z `noindex`** (box17, sesja-wizerunkowa, fotografia-eventowa,
  packshoty-produktowe, sesja-korporacyjna). Siedzi tam sporo broszury, ale to strony
  nieopublikowane. Przed ich włączeniem trzeba je przeczytać.
- **`title` i `description` SEO** poza jednym wyjątkiem z D2.
- **Tekstów `alt`, `aria-label`, komunikatów walidacji, klauzuli RODO.**
- **Usługi `wnetrza-obiekty-architektura`** (draft, 404). Jest pisana w formie „Wy",
  niespójnie z resztą serwisu. Do korekty przed włączeniem.

---

## Liczby

26 pozycji mocnych, 21 słabszych, 11 kategorii złamań kanonu, 1 rozjazd faktu (D1).
Największa dźwignia: **A1 i A2 siedzą w jednym pliku (`CTA.tsx`) i renderują się na
wszystkich stronach z formularzem — dwie zmiany czyszczą osiem stron naraz.**
