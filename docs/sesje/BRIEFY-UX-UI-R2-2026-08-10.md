# Briefy — UX / UI runda 2, 10 sierpnia 2026

**Stan wyjściowy:** produkcja `https://szabunia.pl`, commit **`df6b1a2`**, drzewo `src/` czyste,
produkcja == `main`. Zweryfikowane 10.08.2026 po deployu.
**Źródło:** `AUDYT-UX-UI-R2-2026-08-10.md` (findingi `UXUI2608-04`, `-06`, `-07`, `PELNY2608-18`).

**Ten plik to kompletna lista tego, co zostało.** Trzy briefy do wykonania, jeden temat
świadomie bez briefu, trzy sekcje zamykające na końcu.

> Żaden z tych briefów nie jest jeszcze autoryzowany. Każdy ma pole **ZGODA** i każde
> stoi dziś na „NIE". Nic nie ruszam bez Twojej decyzji.

---

## Co już wdrożone (NIE dublować)

| Fala | Zakres | Commit |
|---|---|---|
| Poranna a11y | kontrast `LogoBar` 4,55:1, 44 px na ścieżkach kontaktu, ARIA w FAQ / cookies / karuzeli, `shortTitle` w okruszkach | `4316d3e` |
| Copy hero | „100+ obsłużonych firm", zasięg europejski | `4c3cbc9` |
| Przebudowa hero | hero home i podstron usług | `2ee60ef` |
| Ósma tura | wspólny `TrustLine`, lead eventów ukryty, opis w górnym bloku, mniejsza kotwica cenowa, nowe zdjęcie eventów | `df6b1a2` |

Wszystkie cztery zweryfikowane pomiarem w audycie rundy 2. **Nie proponować ich ponownie.**

## Definition of Done (wg `CLAUDE.md §6`, rozszerzone o tsc i smoke ścieżek)

1. `npm run lint` → 0 błędów, 0 ostrzeżeń
2. `npx tsc --noEmit` → czysto
3. `npm run build` → sukces (**lokalnie u Marcina**; w sandboxie pada z Bus error)
4. Dev bez błędów w konsoli na `/`, `/uslugi`, `/uslugi/eventy-reportaze`, `/portfolio`, `/kontakt`
5. Dark mode działa na każdej odwiedzonej stronie
6. Smoke-test **ścieżek**, nie stron: scroll → klik → pozycja, kotwice, przełącznik motywu

Git wyłącznie Marcin. Żadnych nowych paczek. Nie ruszać cen ani treści poza tym, co brief nazywa wprost.

---

## BRIEF UXUI2608-04 · Rozdzielenie kadru kafelka i hero eventów — koniec duplikatu w jednym kliknięciu

**Status:** do wykonania, **czeka na wskazanie pliku przez Marcina**
**Priorytet:** P3 · **Wysiłek:** S (≤15 min) · **Owner:** 🧑 wybór kadru → 🤖 wykonanie

### Kontekst z liczbami

Kafelek usługi eventowej na `szabunia.pl/` i hero `szabunia.pl/uslugi/eventy-reportaze`
serwują **ten sam plik** `event-02-zdjecie-grupowe-tor.jpg`, z identycznym `alt`
(„Zdjęcie grupowe uczestników integracji na torze wyścigowym, przed dwoma autami sportowymi").
Zmierzone na produkcji po deployu `df6b1a2`. Przed 17:12 były to dwa różne kadry.

Twoje uzasadnienie okładki kafelka zapisane jest w kodzie (`services.tsx:896-898`):
„Ten kadr pokazuje SKALĘ wydarzenia, czego zdjęcie z rozmowy dwóch osób nie robi".
**Ten warunek zostaje w mocy i nowy kadr też ma pokazywać skalę.**

### Ograniczenie, o którym trzeba wiedzieć przed wyborem

Sześć zdjęć jest już na tej samej podstronie, w pasie „Przykłady z galerii: eventy"
(`ServiceGalleryStrip.tsx:81-90`). Wzięcie któregokolwiek z nich do hero zrobi **drugi
duplikat, tym razem w obrębie jednej strony**:

`event-04-gala`, `event-05-networking`, `event-15-goscie-przy-stole`,
`event-14-saksofonista`, `event-09-dj-konsoleta`, `event-17-dj-slupy-ognia`.

Zostaje osiem wolnych kadrów. Odsiewam integracje na torze (to samo wydarzenie co kafelek),
jogę z osłem i imprezę miejską, bo linia sprzedaje konferencje, gale i integracje firmowe:

| Plik | Co na nim jest (`galleryAlts.ts`) | Gdzie już jest | Uwaga |
|---|---|---|---|
| **`event-01-zespol-na-scenie`** | Zespół muzyczny na scenie z ekranem LED, oprawa artystyczna imprezy firmowej | tylko case study w `portfolio.ts:464` (inna strona) | skala, ekran LED, wprost „impreza firmowa" |
| **`event-16-wystep-na-scenie-hali`** | Występ solowy na scenie hali widowiskowej, reflektory i dym sceniczny | **nigdzie** | największa skala, ale czyta się jak koncert, nie jak event firmowy |
| `event-10-parkiet-taneczny` | Parkiet taneczny na balu firmowym, goście w strojach wieczorowych | nigdzie | bal, wieczorowa część, mniej „konferencyjny" |
| `event-06-przeciaganie-liny` | Przeciąganie liny na pikniku firmowym | nigdzie | znowu integracja, czyli to samo co kafelek |

### Warianty

- **A. `event-01-zespol-na-scenie` do hero, kafelek bez zmian.** Jedna linia w `services.tsx:288`.
  Zysk: skala zachowana, kadr wprost firmowy, zero konfliktu z pasem galerii na tej stronie.
  Ryzyko: to zdjęcie stoi w case study `portfolio.ts:464`, więc klient, który przejdzie
  ścieżką usługa → portfolio, zobaczy je drugi raz. **To dwie różne strony i dwa różne
  konteksty, więc ryzyko jest mniejsze niż dziś, ale nie zerowe.** Odwracalne.
- **B. `event-16-wystep-na-scenie-hali` do hero.** Jedna linia. Zysk: jedyny kadr nieużywany
  nigdzie w serwisie, więc zero powtórzeń w ogóle. Ryzyko: reflektory i dym czytają się
  jak koncert, a nie jak wydarzenie firmowe. Odwracalne.
- **C. `event-04-gala-wreczenie-wyroznien` do hero, a w pasie galerii zastąpić je przez
  `event-16`.** Dwie linie, dwa pliki. Zysk: **najmocniejszy komunikat B2B** ze wszystkich
  wariantów, bo gala z wręczaniem wyróżnień to dokładnie to, po co przychodzi klient
  korporacyjny, i pokazuje ludzi, nie scenografię. Ryzyko: dotyka pasa galerii, czyli
  elementu spoza findingu. Odwracalne, ale to dwa miejsca do cofnięcia.
- **D. Nie robić nic.** Kafelek i hero zostają tym samym zdjęciem. Klik z kafelka nie wnosi
  nowej informacji wizualnej, a cała linia eventowa reprezentowana jest jednym kadrem
  z integracji na torze, mimo że sprzedaje głównie konferencje i gale.

**Rekomendacja: A**, jeśli chcesz to zamknąć jedną linią dziś. **C**, jeśli hero eventów ma
być najmocniejszym argumentem na tej stronie i akceptujesz ruch w pasie galerii.
Nie B: kadr bez konfliktu, ale sprzedaje niewłaściwą kategorię wydarzenia.

**Trade-off nazwany wprost:** wariant A rozwiązuje duplikat w lejku strona główna → usługa,
ale zostawia jedno powtórzenie na dalszej ścieżce usługa → portfolio. Wariant C nie zostawia
żadnego, kosztem dotknięcia drugiego pliku.

### Pliki

- `src/data/services.tsx:288` — wartość `heroImage` (warianty A / B / C)
- `src/components/ServiceGalleryStrip.tsx:82` — tylko wariant C, podmiana jednej pozycji listy
- **`heroImagePos` nie wraca.** Zostało usunięte w `df6b1a2` razem ze starym zdjęciem;
  dodawać je tylko wtedy, gdy nowy kadr wymaga innego kadrowania niż domyślne.

### AC (mierzalne)

1. `alt` obrazu hero na `/uslugi/eventy-reportaze` **różni się** od `alt` kafelka
   `uslugi_karta_eventy-reportaze` na `/`. Sprawdzane porównaniem dwóch łańcuchów, nie okiem.
2. Nowy plik hero **nie występuje** na liście `SERVICE_GALLERY.eventy`.
3. Wysokość hero przy 390 px pozostaje w przedziale 1050–1080 px (dziś 1063), czyli podmiana
   kadru nie zmienia układu.
4. Alt pochodzi z `galleryAlts.ts`, nie z szablonu awaryjnego.

**Stop:** jeśli wybrany plik nie ma wpisu w `galleryAlts.ts` — przerwać i zgłosić.
Nie pisać `alt` z głowy, to treść.

**ZGODA:** ❌ **NIE.** Czeka na wskazanie wariantu i pliku. Wybór zdjęcia to Twoja decyzja,
nie agenta, i dokładnie na tym wywrócił się poprzedni agent (założenie z `services.tsx:281`).

---

## BRIEF UXUI2608-07 · Nazwy klientów w opisie hero eventów — potwierdzić albo cofnąć

**Status:** **ZACZĄĆ OD DECYZJI**, nie od kodu
**Priorytet:** P4 · **Wysiłek:** S (≤5 min) · **Owner:** 🧑

### Kontekst

Do wczoraj opis hero eventów kończył się zdaniem: „Pracowałem przy wydarzeniach dla H&M,
Santander Bank Polska, Warner Music Poland i John Deere." W `df6b1a2` to zdanie zniknęło.

Twoja zgoda była **warunkowa**: „zachowaj tylko wtedy, jeśli wizualnie nadal będzie to
wyglądało lekko". Warunek postawiłeś Ty, a ocenił go agent i zdecydował, że nie zachowuje.

Sprawdziłem jego uzasadnienie na renderze: `LogoBar` faktycznie stoi bezpośrednio pod hero
tej podstrony i faktycznie zawiera te same cztery marki (H&M, Santander, Warner Music,
John Deere). **Uzasadnienie się broni.**

### Warianty

- **A. Zostaje wycięte.** Zysk: akapit hero krótszy o jedno zdanie, a dowód nie ginie,
  bo te same marki stoją ekran niżej w `LogoBar`. Bez kosztu. Odwracalne.
- **B. Zdanie wraca.** Zysk: nazwy klientów padają w tekście czytanym, nie tylko w pasie
  logotypów, który część użytkowników pomija jako dekorację. Koszt: hero wraca do trzech
  zdań, czyli cofa się część tego, co ósma tura właśnie skróciła. Odwracalne.
- **C. Nie decydować.** Zostaje stan faktyczny (wycięte), ale bez Twojego potwierdzenia,
  więc przy kolejnym audycie wróci jako ten sam otwarty punkt.

**Rekomendacja: A.** Powtórzenie tych samych czterech nazw w odległości jednego ekranu nie
dokłada dowodu, a wydłuża akapit, który świadomie skracaliśmy. To jest jedyny brief w tym
pliku, w którym rekomenduję **niecofanie** zmiany agenta.

**Kryterium sukcesu:** decyzja zapisana w tym pliku, żeby nie wracała w trzecim audycie z rzędu.

### Pliki

- `src/data/services.tsx`, pole `description` usługi `eventy-reportaze` — **tylko wariant B**

**Stop:** to jest treść. Jeśli wybierzesz B, podaj brzmienie zdania. Agent go nie odtwarza
z pamięci ani z gita „na oko".

**ZGODA:** ❌ **NIE.** Czeka na A albo B.

---

## BRIEF PELNY2608-18 · Jedna ścieżka głównego CTA — koniec rozszczepienia `#kontakt` / `/kontakt`

**Status:** do wykonania, **najstarszy otwarty punkt UX w projekcie**
**Priorytet:** P2 · **Wysiłek:** M (pół dnia z testami) · **Owner:** 🤖

### Kontekst z liczbami

Otwarty od **05.08**, podniesiony niezależnie trzy razy: `PELNY2608-18`, `SPOJ2608-09`
i ponownie w audycie rundy 2. Nigdy nie doczekał się briefu, bo za każdym razem był
„do zrobienia przy okazji", a nie jest.

Stan zmierzony 10.08 na produkcji: przy **identycznej etykiecie „Zapytaj o ofertę"**
navbar prowadzi do `/kontakt` (przeładowanie strony), a hero do `#kontakt` (scroll do sekcji
na tej samej stronie). W `src/` jest **12 wystąpień** `href="#kontakt"` i cztery pliki
używające `/kontakt`.

### Ważne rozróżnienie, którego wcześniejsze zapisy nie robiły

Poprzednie audyty opisywały to jako „trzy nazwy zdarzeń dla jednego zamiaru, lejek nie sumuje
się do jednej liczby". **To zlewa dwa różne problemy i tylko jeden z nich jest defektem.**

- **Defekt:** ten sam przycisk, ta sama etykieta, dwa różne zachowania. Klient klika
  „Zapytaj o ofertę" w navbarze i traci pozycję na stronie, a klikając identyczny przycisk
  w hero, płynnie zjeżdża do formularza.
- **Nie defekt:** różne `data-cta` (`wycena_navbar`, `wycena_home_hero`, `wycena_sticky`).
  Te nazwy kodują **powierzchnię**, z której przyszedł klik, i to jest informacja
  diagnostyczna, którą chcesz mieć. Sumowanie ich do jednego lejka to robota po stronie
  GA4 (grupa zdarzeń), nie po stronie kodu.

**Dlatego ten brief NIE zmienia żadnego `data-cta`.** Komentarz w `ServiceHero.tsx` mówi
wprost: „po tych atrybutach chodzi pomiar konwersji, podmiana nazwy zrywa ciągłość danych".
Zrywanie ciągłości na miesiąc przed pierwszym porównaniem 28-dniowym byłoby stratą, nie zyskiem.

### Warianty

- **A. Przenieść na navbar wzorzec, który już działa w `MobileFAB`.** `MobileFAB.tsx:58-64`
  trzyma `href="/kontakt"` jako prawdziwy adres i przechwytuje klik tylko wtedy, gdy
  `document.getElementById("kontakt")` istnieje na bieżącej stronie. Zysk: jedno zachowanie
  wszędzie, `href` zostaje prawdziwym adresem (działa bez JS, działa środkowy przycisk myszy
  i „otwórz w nowej karcie"), a na `/blog` i `/poradnik`, gdzie sekcji kontaktu nie ma,
  link po prostu prowadzi na stronę. **Wzorzec jest w repo, przetestowany, niczego nie wymyślamy.**
  Ryzyko: `Navigation.tsx` jest komponentem klienckim, więc technicznie prosto, ale dotyka
  dwóch miejsc (navbar desktop i menu mobilne) i trzeba pamiętać o zamknięciu menu przed scrollem.
- **B. Wszystko na `/kontakt`, kotwice znikają.** Zysk: najprostszy model, jedna strona docelowa,
  jeden pomiar. Ryzyko: **kasuje przewagę strony głównej**, na której formularz jest częścią
  lejka i klient dociera do niego bez przeładowania. Cofa decyzję „lejek bez bocznych wyjść".
  Dotyka 12 miejsc. Odwracalne, ale kosztownie.
- **C. Wszystko na `#kontakt`.** Odpada: `/blog/[slug]`, `/poradnik` i `error.tsx` nie renderują
  sekcji kontaktu, więc powstałyby martwe kotwice. To dokładnie ten błąd, przed którym
  `MobileFAB` się zabezpiecza.
- **D. Nie robić nic.** Rozjazd zostaje czwarty audyt z rzędu. Koszt jest mały i rozłożony,
  ale realny: dwa identyczne przyciski robią dwie różne rzeczy.

**Rekomendacja: A.** Nie B, bo B rozwiązuje spójność kosztem lejka strony głównej, czyli
płaci za porządek rzeczą, na której zarabiasz.

### Pliki

- `src/components/Navigation.tsx:169-175` — CTA navbara desktop
- `src/components/Navigation.tsx:279-286` — CTA w menu mobilnym (pamiętać o `closeMobileMenu()`
  **przed** scrollem, inaczej menu zasłoni cel)
- `src/components/MobileFAB.tsx:58-64` — **źródło wzorca, nie ruszać**
- Bez zmian: wszystkie `data-cta`, wszystkie 12 kotwic `#kontakt`, `blog/[slug]`, `poradnik`, `error.tsx`

### AC (mierzalne)

1. Klik „Zapytaj o ofertę" w navbarze na `/` **nie przeładowuje strony** i kończy się
   sekcją `#kontakt` w widoku. Sprawdzane pomiarem `scrollY` przed i po oraz brakiem
   nowego wpisu nawigacyjnego.
2. Ten sam klik na `/blog/<dowolny-wpis>` **prowadzi na `/kontakt`**, bo tam nie ma sekcji.
3. W menu mobilnym menu zamyka się przed scrollem: po kliknięciu `#kontakt` jest widoczne,
   a panel menu nie.
4. `data-cta` przed i po zmianie identyczne. Diff nie zawiera ani jednej zmiany w tych atrybutach.
5. Prawy klik → „otwórz w nowej karcie" na CTA navbara nadal otwiera `/kontakt`.
6. Zero błędów konsoli na `/`, `/uslugi/eventy-reportaze`, `/blog`, `/poradnik`.

**Stop:** jeśli wyjdzie, że trzeba dotknąć więcej niż tych dwóch miejsc w `Navigation.tsx` —
przerwać i zgłosić. To sygnał, że wariant A nie wystarcza i wracamy do decyzji.

**ZGODA:** ❌ **NIE.** Czeka na decyzję, czy wchodzi w tym tygodniu.

---

## Świadomie BEZ briefu

### `UXUI2608-06` — CTA podstrony usługi 166 px pod zgięciem na 390 px

Zmierzone, odnotowane, **nie przekładam na zadanie** i to jest celowe.

Ósma tura poprawiła ten dystans z 286 px na 166 px, czyli o 120 px, i to jest ruch we właściwą
stronę. Żeby domknąć resztę, trzeba by przesunąć CTA nad zdjęcie, a kolejność „zdjęcie na
telefonie wchodzi między lead a resztę" to **zamknięta decyzja z 23.07.2026**. Do tego wyspa
`MobileFAB` z przyciskiem „Oferta" pojawia się po 600 px przewinięcia i pokrywa ten scenariusz.

Liczba jest w raporcie po to, żeby przy kolejnym strojeniu hero było wiadomo, gdzie stoimy,
i żeby dało się ją porównać po 07.09. **Nie jest to zaproszenie do przebudowy hero po raz dziewiąty.**

---

## Wymagają zgody Marcina, zanim agent dotknie

| Co | Dlaczego | Paragraf |
|---|---|---|
| Wybór kadru hero eventów | treść i wizerunek, nie kod | `CLAUDE.md §11.8` |
| Brzmienie zdania o klientach (wariant B) | treść, zakaz wymyślania | `CLAUDE.md §11.8` |
| Cokolwiek w `next.config.ts`, `metadata`, JSON-LD, `.env*` | stop-condition | `CLAUDE.md §10.2-10.4` |
| Refactor dotykający >3 plików spoza briefu | stop-condition | `CLAUDE.md §10.5` |
| `git commit`, `git push` | git obsługuje Marcin | `CLAUDE.md §7`, `§11.1` |

---

## Poza kodem — agentowi nie zlecać

1. **PSI mobile i desktop** dla `/` i `/uslugi/eventy-reportaze` (hipoteza H-D). Hero to element
   LCP, a właśnie zmieniło zdjęcie i układ. Teraz jest właściwy moment, bo deploy już jest.
   Agent nie ma PSI i nie będzie zgadywał.
2. **Test czytnikiem ekranu** trzech porannych poprawek ARIA (H-C): baner cookies z linku
   w stopce, karuzela opinii, zwinięte FAQ. VoiceOver + Safari albo NVDA + Firefox.
   Pomiar DOM tego nie zastąpi.
3. **Długość `/galerii`** (H-B) — w widocznym oknie Chrome, po doczekaniu załadowania
   wszystkich 20 obrazów. W karcie w tle leniwe obrazy nie ładują się w ogóle i pomiar wyjdzie zaniżony.
4. **Grupa zdarzeń w GA4** sumująca `wycena_*` do jednego lejka. To panel, nie repo.

---

## Czego NIE robić (zamknięte decyzje)

Pamięć antyregresyjna. Każda z tych rzeczy była już rozstrzygnięta i **nie wraca**.

- ❌ **Nie zmieniać mikrocopy kafla portfolio** („Chcesz zobaczyć więcej? Napisz do mnie").
  Zamknięte 10.08.2026: „nie otwierałbym teraz kolejnego frontu".
- ❌ **Nie wycinać „profesjonalny" z leadu hero.** Świadomy claim marki, wyjątek opisany
  w `docs/zasady-tekstow.md`. Zamknięte 10.08.2026.
- ❌ **Nie przesuwać zdjęcia hero na telefonie** ponad lead. Decyzja z 23.07.2026.
- ❌ **Nie proponować publikacji Box17.** Draft świadomie, warunek publikacji podaje Marcin
  (`CLAUDE.md §9`).
- ❌ **Nie dorabiać ramek, teł ani zaokrągleń** do `TrustLine`. Kapsułki zdjęto w trzeciej
  turze 10.08, bo robiły z hero landing SaaS. Powód zapisany w `TrustLine.tsx`.
- ❌ **Nie zlewać `title`, `shortTitle` i `h1`** w `ServiceData`. Wariant C z 10.08,
  trzy pola, trzy zadania.
- ❌ **Nie zmieniać żadnego `data-cta`.** Ciągłość pomiaru konwersji, pierwsze porównanie
  28-dniowe dopiero 07.09.
- ❌ **Nie odbudowywać cennika ani kalkulatora.** Depricing 23.07.2026.
- ❌ **Nie zgłaszać hamburgera 36×34 px ani linków 404 (20 px) jako naruszenia WCAG.**
  Odstępy między środkami 50–58 px, wyjątek odstępu w SC 2.5.8 spełniony. Oceniane tak samo
  31.07 i 10.08.
- ❌ **Nie zgłaszać braku spacji w „Przygotuj się do sesjijak zawodowiec".** To `<br />`,
  fałszywy alarm z `textContent`. Wraca w każdym audycie robionym bez CSS.
- ❌ **Nie zgłaszać `hidden md:block` + `md:hidden` jako duplikatu dla czytnika ekranu.**

---

## Kolejność, gdybyś robił wszystko

1. **Decyzja** o wariancie w `UXUI2608-04` (jedyna rzecz, która krwawi na produkcji od dzisiaj)
2. **Decyzja** A/B w `UXUI2608-07` (pięć minut, zamyka temat na stałe)
3. Wykonanie obu przez agenta, jeden commit
4. **PSI** po tym commicie, nie przed — żeby mierzyć stan docelowy
5. `PELNY2608-18` jako osobna sesja z własnym commitem

Punkty 1 i 2 to razem **poniżej pół godziny** Twojego czasu i zamykają wszystko, co runda 2
znalazła jako otwarte poza jednym starym tematem.

---

## Rejestr findingów — stan aktualny

Statusów w `AUDYT-UX-UI-R2-2026-08-10.md` nie ruszam: to dokument diagnostyczny z datą
i własną klauzulą. **Żywy rejestr jest tutaj.**

| ID | Finding | P | Owner | Status | Brief |
|---|---|---|---|---|---|
| UXUI2608-01 | Kontrast paska klientów 2,45:1 | P2 | 🤖 | **zweryfikowany ✅** 4,55 / 7,46:1 | — |
| UXUI2608-02 | Ścieżki kontaktu bez wspólnego pola 44 px | P3 | 🤖 | **zweryfikowany ✅** | — |
| UXUI2608-03 | `title` == `h1` w 3 z 4 usług | P3 | 🤖 | **zweryfikowany ✅** okruszek == JSON-LD | — |
| UXUI2608-03b | `CLAUDE.md §9` p. 2 opisuje stary kontrakt dwóch pól | P3 | 🧑 | **otwarty** — gotowy tekst w `POPRAWKI-WDROZONE-2026-08-10.md §G` | poza tym plikiem |
| PELNY2608-66 | ARIA: FAQ / cookies / karuzela | P4 | 🤖 | wdrożony ✅, **czeka na test AT** | „Poza kodem", p. 2 |
| UXUI2608-04 | Kafelek i hero eventów to ten sam kadr | P3 | 🧑 → 🤖 | **w briefie**, czeka na wybór wariantu | ten plik |
| ~~UXUI2608-05~~ | ~~Ósma tura poza gitem~~ | P2 | 🧑 | **zamknięty** commitem `df6b1a2` | — |
| UXUI2608-06 | CTA podstrony usługi 166 px pod zgięciem | P3 | 🧑 | **świadomie bez briefu**, liczba do porównania 07.09 | ten plik, §„Bez briefu" |
| UXUI2608-07 | Nazwy klientów wycięte przy warunkowej zgodzie | P4 | 🧑 | **w briefie**, czeka na A/B | ten plik |
| PELNY2608-18 | Rozszczepiona ścieżka CTA | P2 | 🤖 | **w briefie** po raz pierwszy od 05.08 | ten plik |
| SPOJ2608-09 | To samo, zgłoszone niezależnie 06.08 | P2 | 🤖 | **scalony z PELNY2608-18** | ten plik |

**Uwaga:** `SPOJ2608-09` i `PELNY2608-18` opisują ten sam defekt zgłoszony dwa razy przez dwa
różne audyty. Traktuję je odtąd jako jeden punkt, żeby nie liczyć go podwójnie w statystykach
otwartych findingów. Historię obu zostawiam w ich raportach źródłowych.

---

*Briefy: Claude Code, 10.08.2026. Stan wyjściowy `df6b1a2`, produkcja == `main`.
Odwołania do linii zweryfikowane na tym commicie. Żaden brief nie jest autoryzowany.
Nie wprowadzam zmian w kodzie ani w treści. Git po stronie Marcina.*
