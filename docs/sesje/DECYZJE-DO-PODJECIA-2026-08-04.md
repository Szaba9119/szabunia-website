# Decyzje do podjęcia — stan na 2026-08-04

Dwanaście pozycji. Przy każdej: pytanie, warianty, rekomendacja, **co się psuje, jeśli nie
zdecydujesz**. Kolejność od najpilniejszej. Odpowiedź „A", „B" albo „zostaw" przy numerze
wystarczy, żeby ruszyć dalej.

---

## PILNE, bo koszt rośnie z każdym dniem

### 1. Zacommitować turę 1

**Pytanie:** commit i deploy 86 zmienionych plików z 04.08, czy najpierw przegląd?

- **A (rekomendacja): commit teraz, pięć commitów wg faz, deploy po `npm run build`.**
  Gotowe komunikaty są w raporcie z 04.08, sekcja „Sugerowany commit message".
- B: przegląd diffa najpierw. Uwaga: `git diff` **nie pokazuje** 51 nowych nazw obrazów ani
  `src/data/galleryAlts.ts` z 89 opisami. Do przeglądu potrzebny `git status --porcelain`.

**Koszt niepodjęcia:** te zmiany istnieją **w jednym miejscu na świecie** — w niezacommitowanym
drzewie roboczym na Twoim dysku. Nie ma ich w gicie, nie ma ich w żadnej kopii. Przypadkowe
`git checkout .`, `git stash drop` albo awaria dysku kasuje całą turę bezpowrotnie.
To jedyna pozycja na tej liście, przy której zwłoka może kosztować **całość pracy**.

### 2. PSI przed deployem, 3 minuty Twojego czasu

**Pytanie:** zrobić przebieg PageSpeed Insights **zanim** wdrożysz turę 1?

- **A (rekomendacja): tak, teraz.** `pagespeed.web.dev`, `https://szabunia.pl/`, mobile
  i desktop, wklej LCP, CLS, TBT i element LCP do `docs/sesje/POMIARY-2026-08-04.md` §3.
- B: pominąć.

**Koszt niepodjęcia:** punkt odniesienia „przed" znika w chwili deployu i **nie da się go
odtworzyć**. Piąty audyt z rzędu wchodzi bez tej liczby. Agent nie mógł jej pobrać: limit
PSI wyczerpany, a proxy kontenera blokuje przeglądarkę.

### 3. Karta OG `og/portfolio/sesja-wizerunkowa.png`

**Pytanie:** wymienić kadr na karcie OG, czy wypuścić rozjazd na produkcję?

- **A (rekomendacja): wymienić przed deployem**, na ten sam kadr co nowa miniatura
  (`portret-12`, kobieta w granatowej marynarce w plenerze).
- B: wypuścić i poprawić później.

**Koszt niepodjęcia:** karta pokazuje **zdjęcie grupowe przy autach sportowych**, czyli kadr,
który 04.08 wyleciał z tej realizacji jako obcy. Po deployu trasa `/portfolio/sesja-wizerunkowa`
wchodzi do sitemapy i idzie do indeksu. Każde udostępnienie linku pokazuje kadr, którego
na tej stronie nie ma. Facebook i LinkedIn **cache'ują karty OG na tygodnie**, więc poprawka
po fakcie nie działa od razu.

---

## FAKTY HANDLOWE, tylko Ty możesz je rozstrzygnąć

### 4. Symetria progu JSON-LD

**Pytanie:** `FAQPage` na podstronach usług jest budowany z `service.faqs`, więc w turze 1
weszły do danych strukturalnych `TRESC2608-53`, `-09` i `-08`, a `faq.ts` wstrzymano
(`TRESC2608-04`) właśnie dlatego, że zasila `FAQPage`. Który próg obowiązuje?

- **A (rekomendacja): przyjąć zmiany i odblokować `TRESC2608-04`.** Wszystkie cztery zmieniają
  treść, którą i tak widzi klient; blokowanie `faq.ts` przy jednoczesnym puszczeniu
  `services.tsx` jest niekonsekwencją, nie ostrożnością.
- B: cofnąć `TRESC2608-53` (jedyna z tej czwórki, która zmienia **liczbę handlową**
  w danych strukturalnych: 300 zł za kolejne podejście przy złej pogodzie).

**Koszt niepodjęcia:** dziś strona obiecuje **bezterminowe darmowe przekładanie terminu**
przy złej pogodzie, a cennik v3 mówi „wracam raz w ramach ustalonej kwoty". Przy trzeciej
nieudanej próbie klient ma na stronie zdanie, którym uzasadni odmowę dopłaty.

### 5. `description` usługi dronowej

**Pytanie:** opis usługi dronowej dalej sprzedaje zakres sekcji 8 cennika („budynki i obiekty
firmowe, hale i magazyny", „bryła, dach, otoczenie i drogi dojazdowe"). Gotowy diff z 03.08
tego pola nie ruszał, więc **AC 2 briefu `TRESC2608-50` jest niespełnione**.

- **A (rekomendacja): usunąć te dwa fragmenty.** Zamiennik gotowy w raporcie z 04.08, sekcja D.
- B: zostawić.

**Koszt niepodjęcia:** podstrona z kotwicą **700 zł** dalej opisuje robotę, którą cennik wycenia
na **900 do 1 900 zł**. Różnica na zleceniu: 600 do 1 200 zł. To był najwyższy stosunek zysku
do nakładu w całym audycie treści i jest domknięty w 3/4.

### 6. Pięć zablokowanych pozycji treści

| ID | Czego dotyczy | Czego potrzeba od Ciebie |
|---|---|---|
| `TRESC2608-05` | „od 30 minut" kontra „od 90 minut" jako czas sesji wizerunkowej | czy sesje 30-minutowe istnieją poza pakietami |
| `TRESC2608-23` | `minPrice: 120` w JSON-LD sesji zespołowych przy realnym minimum ~1 120 zł | kwota: 720 zł czy 1 120 zł |
| `TRESC2608-52` | blurb portretów obiecuje „studio dopasowane do Twojego projektu" | czy studio zewnętrzne jest w cenie (per cennik v3: **nie**, tylko mobilne) |
| `TRESC2608-04` | warunki zmiany terminu w FAQ pomijają dwie kary | zgoda, zamiennik gotowy |
| `TRESC2608-11` | ósmej usługi nie ma w `hasOfferCatalog` | zgoda na dotknięcie JSON-LD w `layout.tsx` |

**Koszt niepodjęcia:** `-52` to **375-600 zł kosztu na zlecenie**, który klient uważa za wliczony,
i idzie do Google przez `FAQPage`. `-23` daje Google cenę usługi dziewięciokrotnie niższą
od realnego minimum. Reszta to rozjazdy, które wracają w każdym kolejnym audycie.

---

## DECYZJE KADROWE I REDAKCYJNE

### 7. `ZDJ2608-28`: podział list `CURATED`

**Pytanie:** rozbić `CURATED.portrety` i `CURATED.eventy` na dwie rozłączne szóstki?

- **A (rekomendacja): tak.** Propozycja podziału gotowa w raporcie z 04.08, sekcja C punkt 4.
  W folderach jest zapas: 14 portretów i 15 eventów na 6 pokazywanych.
- B: zostawić.

**Koszt niepodjęcia:** te same 6 portretów stoi na 3 podstronach usług, te same 6 eventów na 2.
Cała oferta pokazuje 46 unikalnych kadrów przy 74 w samej galerii. **Blokuje też `ZDJ2608-27`:**
na `/uslugi/eventy-reportaze` i `/uslugi/wizerunek-portrety` hero dalej wraca jako kadr w pasku,
bo po odfiltrowaniu zostałoby 5 kadrów z wymaganych 6.

### 8. `ZDJ2608-37` (nowy): plik hero jest za wąski

**Pytanie:** `marcin-hero-light-4.jpg` ma **877 px** szerokości. Obraz LCP strony głównej jest
przez to miękki na każdym ekranie retinowym (potrzeba 1382 px na desktopie przy DPR 2).

- **A (rekomendacja): wyeksportować hero ponownie, 1600-1800 px na dłuższym boku.**
  Zmiana pliku, zero zmian w kodzie.
- B: zostawić, uznać za akceptowalne.

**Koszt niepodjęcia:** najważniejszy obraz na stronie, z `priority` i `fetchPriority="high"`,
jest skalowany w górę u każdego, kto ma retinę, czyli u większości ruchu mobilnego.
**Uwaga: to unieważnia `ZDJ2608-19` w obecnym brzmieniu** — zwężanie `sizes` nie oszczędzi
ani jednego bajtu, bo szerszego wariantu po prostu nie ma. Szczegóły w `POMIARY-2026-08-04.md` §2.

### 9. Trzy opisy niezgodne z kadrem

**Pytanie:** poprawić trzy opisy alternatywne przeniesione w turze 1 bez zmiany treści?

| Plik | Opis mówi | Kadr pokazuje |
|---|---|---|
| `wnetrze-12` | „budynek **komercyjny**" | budynek **mieszkalny** z czerwonej cegły, balkony |
| `wnetrze-11` | „**Biurowiec** z lotu ptaka" | kompleks budynków, apartamentowiec albo hotel |
| `dron-04` | „**Biurowiec** z lotu ptaka" | budynek z balkonami na każdej kondygnacji, mieszkalny |

- **A (rekomendacja): poprawić, trzy linijki.** Zamienniki gotowe w raporcie z 04.08, sekcja C punkt 8.
- B: zostawić.

**Koszt niepodjęcia:** `dron-04` jest **hero i kafelkiem usługi dronowej**, więc najczęściej
oglądanym kadrem tej linii. Opis mówi „biurowiec" przy budynku mieszkalnym, czyli myli
deweloperów mieszkaniowych z najemcami biurowymi. Nazwy plików nadane 04.08 mówią prawdę,
opisy jeszcze nie.

### 10. `ZDJ2608-16`: kolejność portretów

**Pytanie:** galerię portretów otwiera **operator z kamerą na gimbalu w oversizowym T-shircie**,
kadr, którego selekcja `CURATED` już raz nie wzięła.

- **A (rekomendacja): przestawić, otwarcie na `portret-05` (zielony garnitur).**
  Sugerowana kolejność w raporcie z 04.08, sekcja C punkt 5.
- B: zostawić do następnej rundy.

**Koszt niepodjęcia:** pierwszy kadr galerii portretów biznesowych nie jest portretem biznesowym.
**Uwaga:** przenumerowanie zmienia adresy, czyli to kolejna runda `ZDJ2608-01` z tabelą nazw.

### 11. `ZDJ2608-33`: jedna linia w JSON-LD `/portfolio`

**Pytanie:** `portfolioCategories` → `portfolioItems` w `itemListElement`?

- **A (rekomendacja): tak.** Po turze 1 rozjazd spada z 5 pozycji do 1, ale nie znika.
- B: zostawić do rundy JSON-LD.

**Koszt niepodjęcia:** `ItemList` deklaruje Google 9 realizacji, widać 8. Drobiazg, ale
domykany jedną linią i wraca w każdym audycie.

### 12. DZ3 i DZ5: dwie decyzje, sześć ID

- **DZ3** — co ma stać w hero „Wideo marketingu" zamiast kadru z integracji.
  Odblokowuje `ZDJ2608-15` i `-29`. Rekomendacja: nowy kadr z planu zdjęciowego.
- **DZ5** — karty OG: 6 kart usług bez fotografii, 1 brakująca (**404 od 04.08**),
  8 kart stron z tym samym portretem autora. Odblokowuje `ZDJ2608-10`, `-23`, `-35`, `-36`.
  Rekomendacja: zacząć od `-23`, bo to jedyne realne 404, wzorzec działa już w `og/portfolio/*`.

**Koszt niepodjęcia:** `/uslugi/wnetrza-obiekty-architektura` **nie renderuje karty** przy
udostępnieniu na LinkedIn i Facebooku, od dnia publikacji usługi. To najbogatsza treścią
z ośmiu usług i najwyższa kotwica po pakietach.

---

## Do potwierdzenia jednym zdaniem, bez wariantów

- **H3:** czy `yes-butcher-02.jpg` jest faktycznie zrobiony dronem? EXIF pliku jest wyczyszczony,
  z pliku się nie da. Blokuje `ZDJ2608-10` (ten kadr jest kartą OG usługi dronowej).
- **Box17:** jaki jest realny warunek publikacji? W kodzie stoi `TODO (Marcin)`. Bez tego
  zapisu każdy kolejny audyt podniesie tę samą pozycję.
- **51 starych adresów obrazów:** czy któryś jest linkowany z Profilu Firmy, Google Ads albo
  social mediów? W repo sprawdzone i naprawione. Tabela: `docs/sesje/TABELA-NAZW-51-2026-08-04.md`.
  **Po deployu stare adresy zwrócą 404.**
- **`_to_delete/ZDJ2608-18-2026-08-04/`** — 6 plików do przejrzenia i skasowania, w tym dwa
  archiwa robocze (58 MB). Most urządzeń nie pozwala agentowi kasować.
