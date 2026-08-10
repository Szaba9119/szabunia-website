# Audyt UX / UI — runda 2, 10 sierpnia 2026

**Zakres:** moduł B (UX / UI / konwersja) w całości + z modułu A wyłącznie parytet produkcja vs `main`.
**Okno czasowe:** 10.08.2026, od commita `862bbe5` (punkt odniesienia poprzedniego audytu) do drzewa roboczego.
**Metoda:** pomiar DOM (`getBoundingClientRect`, `getComputedStyle`) na dev serverze oraz na
produkcji `szabunia.pl`, przy 375 / 390 / 1280 px, w obu motywach. Kontrast liczony ze zmierzonych
wartości `rgb`, nie z klas Tailwinda. `npx tsc --noEmit` i `npm run lint` uruchomione.

⚠ **Punkt odniesienia zmienił się W TRAKCIE audytu.** Zaczynałem na HEAD `2ee60ef` z niezacommitowaną
ósmą turą w drzewie roboczym. O 17:12 Marcin zacommitował ją jako **`df6b1a2`** i Vercel ją zdeployował.
Weryfikacja live po commicie: produkcja serwuje już nowe hero (brak `heroBenefits`, brak leadu eventów,
`TrustLine` obecny). **Stan końcowy: HEAD `df6b1a2`, drzewo czyste w `src/`, produkcja == `main`.**
Wcześniejsze pomiary „produkcja vs drzewo robocze" zachowuję jako pomiar **przed deployem i po**,
bo to ta sama para stanów, tylko inaczej nazwana.
**Wykluczone:** Core Web Vitals (brak PSI) · test wysyłki formularza (efekt zewnętrzny) ·
realny czytnik ekranu · dane GA4 / Ads / GSC (brak dostępu w tej sesji) · długość `/galeria`
(powód w §9).
**Plan źródłowy:** `PLAN-AUDYT-UX-UI-R2-2026-08-10.md`.
**Poprzednie ogniwo:** `AUDYT-UX-UI-2026-08-10.md` + `POPRAWKI-WDROZONE-2026-08-10.md`.

> Dokument diagnostyczny. Nie wprowadza zmian w kodzie, treści ani panelach. Git po stronie Marcina.

---

## 0. TL;DR

Cztery poprawki wdrożone rano trzymają się: kontrast paska klientów to nadal **4,55:1**
w jasnym i **7,46:1** w ciemnym motywie, a obie ścieżki kontaktu mają zmierzone **44 px**.
Ósma tura jest **mierzalnie dobra**: hero podstrony usługi schudło z **1183 px do 1063 px**
przy 390 px, a główny CTA wjechał **120 px wyżej**. Dark mode przeszedł bez jednego błędu
kontrastu na 300 sprawdzonych elementach w trzech trasach. Zero błędów konsoli, zero martwych
kotwic, zero obrazów bez `alt`, zero poziomego scrolla.

Został **jeden realny problem, i jest już na produkcji**: kafelek usługi eventowej na stronie
głównej i hero tej samej podstrony pokazują **TEN SAM kadr**. Powstał w ósmej turze,
zdeployowanej w trakcie tego audytu.

| Obszar | Stan | Zmiana vs `AUDYT-UX-UI-2026-08-10.md` |
|---|---|---|
| Kontrast jasny motyw | ✅ | **regres naprawiony**, 2,45 → 4,55:1 |
| Cele dotykowe ścieżek kontaktu | ✅ | **zamknięte**, 23 → 44 px zmierzone |
| ARIA (FAQ / cookies / karuzela) | ✅ | wdrożone, czeka na test czytnikiem |
| Dark mode | ✅ | **H2 domknięta pomiarem**, 0 błędów / 300 elementów |
| Mobile 375 / 390 px | ✅ | **H1 domknięta pomiarem**, 0 poziomego scrolla |
| Nowy hero na desktopie | ✅ | **H4 domknięta**, brak zawijania na 1280 px |
| Parytet produkcja vs `main` | ✅ | **zamknięty w trakcie audytu** commitem `df6b1a2` |
| Zdjęcia w lejku usług | ❌ | **nowy regres, już na produkcji** |

**Wniosek nadrzędny:** ósma tura jest udana i można ją zostawić w spokoju; jedyne, co po niej
zostało do zrobienia, to rozdzielenie dwóch powierzchni, które dostały to samo zdjęcie.
Kolejnego strojenia hero nie ma sensu zaczynać przed 07.09, bo dopiero wtedy będą dane
o tym, czy te 120 px cokolwiek zmieniły.

**Jedna decyzja na teraz:** wybrać inny kadr do hero `/uslugi/eventy-reportaze`, żeby nie
powtarzał zdjęcia z kafelka, który sam wskazałeś dziś rano.

---

## 1. Sprawdzone i OK (zweryfikowane pomiarem)

**Regresje z poprzedniego audytu: żadna nie wróciła.**

- **`UXUI2608-01` trzyma.** `LogoBar` w jasnym motywie: `rgb(100,116,139)` na `rgb(249,250,251)`
  = **4,55:1**. Ciemny: `rgb(148,163,184)` na `rgb(11,15,26)` = **7,46:1**. Dowód: pomiar live
  na `/`, `LogoBar.tsx:48-52`. Przebudowa hero tej klasy nie ruszyła.
- **`UXUI2608-02` zamknięte.** `tel_hero` **115×44 px**, `tel_service_hero` **115×44 px**,
  `wycena_sticky` („Oferta") **104×44 px**, ikony e-mail i telefon w wyspie **44×44 px**.
  Środki `wycena_home_hero` i `tel_hero` na tej samej linii (różnica <3 px), więc rząd się
  nie rozjechał. Zmierzone przy 390 px.
- **`PELNY2608-66`, część ARIA: w kodzie i działa.** `FAQ.tsx` przełącza `aria-hidden`,
  `CookieConsent.tsx` ma `role="region"` zamiast obiecywanego modala, karuzela ma jeden
  region live. Weryfikacja czytnikiem nadal otwarta (H-C).

**Struktura i semantyka** — sprawdzone trasy: `/`, `/uslugi`, `/uslugi/eventy-reportaze`,
`/portfolio`, `/galeria`, `/kontakt`, 404.

- Dokładnie **jeden widoczny H1** na każdej z siedmiu tras, `<main>`, `lang="pl"`.
- **Zero martwych kotwic.** Na stronie głównej 7 kotwic, wszystkie z celem. Na pozostałych
  trasach też zero.
- **Zero obrazów bez `alt`:** 17/17 na `/`, 18/18 na podstronie usługi, 8/8 na `/portfolio`,
  20/20 na `/galerii`.
- **Okruszek == `BreadcrumbList`.** Widoczny „Strona główna / Usługi / Wydarzenia firmowe",
  JSON-LD identycznie. `Service.name` = „Wydarzenia firmowe", zgodne z `hasOfferCatalog`
  w JSON-LD organizacji. **Wariant C z `shortTitle` działa** i nie rozjechał się przy przebudowie.
- Hierarchia h1 → h2 → h3 bez przeskoków na wszystkich sprawdzonych trasach.

**Dostępność**

- **Dark mode: 0 błędów kontrastu.** Sprawdzone leafowe węzły tekstowe: 122 na `/`,
  132 na `/uslugi/eventy-reportaze`, 46 na `/kontakt`. Każdy przeszedł próg AA właściwy
  dla swojego rozmiaru i grubości. **To domyka hipotezę H2 z poprzedniego audytu.**
- `focus-visible`: `outline: rgb(37,99,235) solid 2px`, `outline-offset: 2px`.
- Skip-link „Przejdź do treści" → `#main`, cel istnieje.
- `prefers-reduced-motion` obecne w arkuszach.
- Duplikat marquee w `LogoBar` ma `aria-hidden="true"`, więc czytnik nie czyta marek dwa razy.
- **Formularz `/kontakt`:** pięć widocznych pól, wszystkie **46 px**, każde z powiązanym
  `<label>`. Honeypot `_gotcha` z `display:none` i `tabindex="-1"`. `aria-invalid`,
  `aria-describedby` i `role="alert"` są **warunkowe i poprawne**: dopinają się dopiero przy
  błędzie pola (`CTA.tsx:384-385, 408-409, 521-522`), więc ich brak w stanie spoczynku
  jest zachowaniem docelowym, nie brakiem.

**Mobile i układ** (domknięcie H1)

- **Zero poziomego scrolla** przy 375 i 390 px na wszystkich sprawdzonych trasach:
  `scrollWidth` == `innerWidth` co do piksela.
- **Zero kafli-sierot** i zero nierównych wysokości w rzędach: `/portfolio` przy 1280 px daje
  8 kafli po 280 px w siatce 3-kolumnowej, `/uslugi` przy 1280 px cztery karty równej wysokości.
- Długość stron w normie metodyki (próg >15 ekranów desktop, >20 mobile): `/` = **14,8 ekranu**
  przy 390 px i **12,1** przy 1280 px, `/uslugi/eventy-reportaze` = **12,9** przy 390 px,
  `/portfolio` = 3,7, `/uslugi` = 4,6.
- **404:** jeden H1, linki do `/`, `/uslugi`, `/portfolio`, `/blog`, `/kontakt`, wszystkie żywe.

**Higiena kodu ósmej tury**

- `npx tsc --noEmit` → **PASS**. `npm run lint` → **PASS, 0/0**.
- **Brak martwego kodu po usunięciu `heroBenefits`:** zero referencji w `src/`, a `ReactNode`
  w `services.tsx:1` jest nadal potrzebny dla pola `icon` (`services.tsx:75`).
- `data-cta` nietknięte: `wycena_hero`, `tel_service_hero`, `wycena_home_hero`, `tel_hero`,
  `wycena_sticky`, `email_fab`, `tel_fab`. Ciągłość pomiaru konwersji zachowana.
- **Zero błędów konsoli** na dev i na produkcji.

**Ósma tura: co faktycznie poprawiła** (domknięcie H4)

Pomiar przy 390×844, `/uslugi/eventy-reportaze`, jedna seria:

| Metryka | Przed deployem (`2ee60ef`) | Po deployu (`df6b1a2`) | Zmiana |
|---|---|---|---|
| Wysokość hero | 1183 px | **1063 px** | **−120 px** |
| Górna krawędź CTA „Zapytaj o ofertę" | y = 1079 | **y = 959** | **−120 px** |
| `scrollHeight` strony | 11 090 px | 10 896 px | −194 px |
| Ekrany | 13,1 | 12,9 | −0,2 |

Stan „przed" zmierzony na produkcji przed 17:12, stan „po" na dev serwerze z tym samym kodem.
Kontrola po deployu, przy 375 px na produkcji: hero **1069 px**, CTA y = **965**, `TrustLine`
obecny, `heroBenefits` i lead eventów nieobecne. Zgadza się z pomiarem sprzed commita.

Kolejność DOM na telefonie jest dokładnie taka, jak deklaruje komentarz w `ServiceHero.tsx`:
kicker (y 180) → H1 (209) → opis (322) → zdjęcie (468) → dowód społeczny (850) → cena (925)
→ CTA (959). Hierarchia się zgadza.

Na desktopie 1280 px nowe hero **nie zawija** wiersza `TrustLine` (obie pozycje na y = 579),
CTA i telefon stoją w jednym rzędzie, a cały blok CTA mieści się nad zgięciem (dolna krawędź
683 px przy oknie 800 px).

**Strona główna: refactor bez regresu.** Wyprowadzenie wiersza do `TrustLine.tsx` nie zmieniło
nic wizualnie: hero **1062 px** i CTA na **y = 960** identycznie na produkcji i w drzewie roboczym.

---

## 2. Ustalenia — P0

Brak.

## 3. Ustalenia — P1

Brak.

## 4. Ustalenia — P2 / P3 / P4

### **UXUI2608-04 · [UX][TREŚĆ] Kafelek usługi i hero tej samej podstrony pokazują ten sam kadr** (§2.6 planu)

`src/data/services.tsx:288` (zmienione w `df6b1a2`) vs `src/data/services.tsx:899` (bez zmian).
**Potwierdzone na produkcji po deployu.** · **P3** · **S** · 🧑 · **Z (live + kod)**

Ósma tura podmieniła `heroImage` usługi eventowej na
`/images/galeria/eventy/event-02-zdjecie-grupowe-tor.jpg`. Ten sam plik stoi od dziś rana
w `SERVICE_TILE_IMAGES` jako okładka kafelka tej usługi, z komentarzem w kodzie
„Trzy okładki wymienione 10.08.2026 na prośbę Marcina po deployu".

Dowód z produkcji, pomiar po deployu `df6b1a2`:

| Powierzchnia | Plik | `alt` |
|---|---|---|
| Kafelek na `szabunia.pl/` (`uslugi_karta_eventy-reportaze`) | `event-02-zdjecie-grupowe-tor.jpg` | „Zdjęcie grupowe uczestników integracji na torze wyścigowym, przed dwoma autami sportowymi" |
| Hero `szabunia.pl/uslugi/eventy-reportaze` | ten sam | **identyczny** |

Przed deployem rozjazdu nie było: hero pokazywało `event-05-networking-foyer.jpg`, czyli inny kadr.
**To regres wprowadzony dzisiaj i widoczny dla klientów od ok. 17:15.**

Mechanizm: klient klika kafelek, bo zaciekawił go kadr, i na stronie docelowej dostaje
dokładnie to samo zdjęcie w powiększeniu. Przejście nie wnosi żadnej nowej informacji
wizualnej. Dla strony fotografa hero podstrony usługi jest najmocniejszym dowodem rzemiosła
w tej sekcji i powtarza wtedy miniaturę, którą klient przed chwilą kliknął.

Osobno, ale w tym samym miejscu: autor zmiany **sam oznaczył ją w kodzie jako założenie**
(`services.tsx:281`, „⚠ ZAŁOŻENIE DO POTWIERDZENIA... do repozytorium nic nie trafiło
i nie było załącznika"). Wybór był rozsądny, bo trafił w plik, który faktycznie wskazałeś
dla tej usługi. Skutkiem ubocznym jest jednak duplikat w lejku.

Poprawka: zostawić kafelek bez zmian (to Twój wybór z dzisiaj) i dobrać do hero **inny** kadr
z `public/images/galeria/eventy/`. Zmiana to jedna ścieżka w `services.tsx:288`.
**Wybór zdjęcia jest decyzją Marcina, nie agenta** — warianty w §11.

### ~~**UXUI2608-05 · [TECH] Produkcja nie zawiera ósmej tury; praca leży poza gitem**~~ (§2.1 planu)

> **ZAMKNIĘTY W TRAKCIE AUDYTU, nie moją zasługą.** · **P2** · **S** · 🧑 · **Z (live vs git)**

Gdy zaczynałem, `git status` pokazywał trzy pliki zmodyfikowane i `src/components/TrustLine.tsx`
jako **nieśledzony**, a importowały go dwa komponenty. Ryzyko było realne: `git checkout .`
albo `git stash` skasowałby 120 px poprawy zmierzonej w §1 i wywalił build na brakującym imporcie.

O **17:12** Marcin zacommitował całość jako `df6b1a2`
(„feat(hero): uproszczenie hero podstron usług, wspólny TrustLine, ujednolicony claim",
4 pliki, +119/−125), Vercel zdeployował, a weryfikacja live potwierdziła nowe hero na produkcji.
**Drzewo `src/` czyste, `TrustLine.tsx` śledzony, produkcja == `main`.**

Zostawiam ten wpis przekreślony zamiast go kasować, bo jest historią pomiaru: wcześniejsze
liczby w tym raporcie zbierałem przy innym stanie repo i czytelnik musi wiedzieć, kiedy się
przełączył.

### **UXUI2608-06 · [UX] Główny CTA podstrony usługi nadal pod zgięciem na telefonie** (§2.3 planu)

Pomiar przy 390×844. · **P3** · **M** · 🧑 · **Z (live)**

| Powierzchnia | Dolna krawędź CTA | Zgięcie | Ile poniżej |
|---|---|---|---|
| `/uslugi/eventy-reportaze`, przed deployem | 1130 px | 844 px | 286 px |
| `/uslugi/eventy-reportaze`, po deployu | **1010 px** | 844 px | **166 px** |
| `/` (bez zmian w obu stanach) | 1016 px | 844 px | 172 px |

Ósma tura skróciła ten dystans o 120 px i to jest ruch we właściwą stronę. Zostało 166 px,
czyli mniej więcej jeden gest kciukiem.

**Nie zgłaszam tego jako defektu do naprawienia** i celowo nie proponuję przesunięcia CTA nad
zdjęcie. Kolejność „zdjęcie na telefonie wchodzi między lead a resztę" jest zamkniętą decyzją
z 23.07.2026, opisaną w `Hero.tsx`, a wyspa `MobileFAB` z przyciskiem „Oferta" pojawia się
po 600 px przewinięcia i pokrywa dokładnie ten scenariusz. Zgłaszam liczbę, żeby przy kolejnej
turze hero było wiadomo, gdzie stoimy, i żeby dało się to porównać po 07.09.

### **UXUI2608-07 · [TREŚĆ] Cztery nazwy klientów wypadły z hero eventów przy warunkowej zgodzie** (§2.6 planu)

`src/data/services.tsx`, pole `description`. · **P4** · **S** · 🧑 · **Z (kod + live)**

Produkcja: „...Pracowałem przy wydarzeniach dla H&M, Santander Bank Polska, Warner Music Poland
i John Deere." Produkcja po deployu `df6b1a2`: tego zdania **już nie ma**.

Autor zmiany opisał to jawnie (`services.tsx`, komentarz nad `description`): Twoja zgoda była
**warunkowa** („zachowaj tylko wtedy, jeśli wizualnie nadal będzie to wyglądało lekko"),
a uzasadnieniem wycięcia jest `LogoBar` renderujący te same marki bezpośrednio pod hero.
Sprawdziłem to na renderze: `LogoBar` faktycznie stoi na tej podstronie i faktycznie zawiera
H&M, Santander, Warner Music i John Deere. Uzasadnienie się broni.

Zgłaszam wyłącznie dlatego, że **warunek postawiłeś Ty, a ocenił go agent**. To pół zdania
do potwierdzenia albo cofnięcia, nie problem.

### **PELNY2608-18 · [UX/POMIAR] Rozszczepiona ścieżka głównego CTA — bez zmian** (§2.3 planu)

To **nie jest nowy finding**. `PELNY2608-18` (05.08) i `SPOJ2608-09` (06.08), oba P2, oba
nadal otwarte. · **P2** · **M** · 🤖 · **Z (live + kod)**

Stan potwierdzony pomiarem dzisiaj: przy tej samej etykiecie „Zapytaj o ofertę"
`wycena_navbar` prowadzi do `/kontakt` (przeładowanie), a `wycena_home_hero` do `#kontakt`
(scroll). Trzecia nazwa zdarzenia, `wycena_sticky`, opisuje ten sam zamiar w wyspie mobilnej.
Trzy nazwy dla jednej intencji, więc lejek nadal nie sumuje się do jednej liczby.

Nie rozwijam, bo temat ma już opis i wycenę w dwóch wcześniejszych raportach. Odnotowuję
status: **bez zmian po dzisiejszych trzech commitach.**

---

## 5. Hipotezy do sprawdzenia (H)

| ID | Hipoteza | Krok weryfikujący | Owner |
|---|---|---|---|
| **H-A** | Wysokość banera cookies jest mierzona raz przy montażu i potem tylko na `resize` (`CookieConsent.tsx:52-61`), bez `ResizeObserver`. Późna zmiana wysokości (swap fontu, przelanie tekstu) mogłaby zostawić `MobileFAB` na starym podniesieniu. Przy świeżym załadowaniu **nie udało mi się tego wywołać** ani na dev, ani na produkcji. | Realny telefon, throttling sieci do „Slow 3G", pierwsze wejście bez zapisanej zgody. Odczytać inline `bottom` wyspy w pierwszej sekundzie i porównać z `offsetHeight` banera. | 🧑 |
| **H-B** | Długość `/galerii` spadła poniżej progu 15 ekranów. Zmierzyłem 9403 px (11,8 ekranu) przy 1280 px, ale **0 z 20 obrazów było załadowanych**, więc to pomiar strony niedomalowanej, nie jej stanu docelowego. Poprzedni pomiar (15 141 px) stoi. | Widoczne okno Chrome, przewinięcie do końca, odczyt `scrollHeight` dopiero gdy `img.complete` dla wszystkich. | 🧑 |
| **H-C** | Trzy poprawki ARIA z rana faktycznie działają u użytkownika czytnika. Kod i DOM się zgadzają, ale to nie to samo. Przeniesiona z H3 poprzedniego audytu, **nadal otwarta**. | VoiceOver + Safari albo NVDA + Firefox: baner cookies z linku w stopce, karuzela opinii, zwinięte FAQ. | 🧑 |
| **H-D** | Core Web Vitals po przebudowie hero. Hero to element LCP, a ósma tura zmieniła zdjęcie i układ. Nie mam PSI. | PSI mobile i desktop dla `/` i `/uslugi/eventy-reportaze`, **po** deployu ósmej tury. | 🧑 / 🌐 |

---

## 6. Obserwacje bez akcji

- **H1 strony głównej renderuje się jako 12 px wersaliki** (`text-steel`, kontrast 4,55:1),
  a wizualnym nagłówkiem jest H2 „LUDZIE. WYDARZENIA. OBIEKTY. PRODUKTY." przy 76 px.
  **To jest zamierzone** i wynika z repozycjonowania SEO z 30.07 (`CLAUDE.md §9`, punkt 3).
  Zapisuję to tutaj, żeby kolejny audyt nie zgłosił tego jako „ukryty H1": semantyka jest
  poprawna, kontrast przechodzi AA dla tekstu normalnego, a decyzja jest udokumentowana.
- **`/portfolio` przy 1280 px:** 8 kafli w siatce 3-kolumnowej daje ostatni rząd 2 z 3.
  To nie jest „kafel-sierota" (pojedynczy kafel w rzędzie), jak opisywał `PELNY2608-66`,
  tylko rząd niepełny o jedno miejsce. Wysokości równe co do piksela. **Nie proponuję
  publikacji Box17** — to zamknięta decyzja z `CLAUDE.md §9`.
- **Kotwica cenowa na podstronie usługi** po zejściu na 15 px semibold ma kontrast **17,08:1**
  i stoi 34 px nad przyciskiem. Zmiana zrobiła to, co obiecuje komentarz w kodzie: przestała
  być osobnym piętrem.
- Hamburger 36×34 px i rząd linków na 404 (20 px wysokości) **nie są findingiem**: odległości
  między środkami sąsiadów to 50–58 px, czyli powyżej 24 px wymaganych przez wyjątek odstępu
  w WCAG 2.2 SC 2.5.8 (AA). Tak samo ocenił to audyt z 31.07 i nie zmieniam tej oceny.

---

## 7. Świadomie NIE ruszamy

- Brak publicznego cennika i kalkulatora.
- Mikrocopy kafla portfolio („Chcesz zobaczyć więcej?") — zamknięte 10.08.2026.
- Copy hero „profesjonalny wizerunek" — zamknięte 10.08.2026.
- Kolejność „zdjęcie między leadem a resztą" na telefonie — decyzja z 23.07.2026.
- Box17 zostaje draftem.
- `font-barlow` pozostaje aliasem Intera.
- Brak linku do Instagrama w `About.tsx`.

---

## 8. Czego NIE sprawdzono (i czego potrzeba)

| Obszar | Powód | Czego potrzeba |
|---|---|---|
| Core Web Vitals | PSI/Lighthouse niedostępne w tej sesji. **Nie zgaduję.** | PSI mobile i desktop, po deployu |
| Długość `/galerii` | Leniwe obrazy nie ładują się w karcie w tle (0/20 `complete`). Pomiar byłby zaniżony. | Widoczne okno Chrome, przewinięcie do końca |
| Formularz end-to-end | Wysyłka tworzy efekt zewnętrzny, poza zakresem audytu diagnostycznego | Testowy lead + GA4 DebugView |
| Czytnik ekranu i pełna nawigacja klawiaturą | Brak realnego AT; pomiar DOM tego nie zastąpi | VoiceOver + Safari albo NVDA + Firefox |
| Panele (GA4, Ads, GSC) | Brak dostępu w tej sesji | Zalogowane panele, tryb odczytu |
| `606 px` | Zmierzyłem 375, 390 i 1280 px. 606 px pominięte świadomie: mieści się między zmierzonymi progami, a żaden breakpoint tam nie leży | — |
| Podstrony `wizerunek-portrety`, `fotografia-produktowa`, `nieruchomosci-przemysl` | Ósma tura ustawia `heroHideSubtitle` **tylko** dla eventów, więc trzy pozostałe renderują się jak dotąd. Sprawdzona jedna, zmieniona | Rzut okiem po deployu |

---

## 9. Pozorne problemy skorygowane w trakcie audytu

Osiem rzeczy wyglądało na finding i nim nie było. Wszystkie wycofane przed wpisaniem do ustaleń.

1. **Wyblakłe hero na zrzucie ekranu.** Nagłówek, kicker i okruszki wyglądały na wyszarzone
   do granicy czytelności. `getComputedStyle` dał `opacity: 1` w całym łańcuchu przodków.
   Przyczyna: `document.visibilityState === "hidden"` w karcie audytowej. Artefakt narzędzia.
2. **Brak `MobileFAB` po przewinięciu 3000 px.** Pasek nie istniał w DOM. Po wysunięciu karty
   na wierzch pojawił się natychmiast. React nie wykonuje re-renderu w karcie w tle,
   a `visible = scrollY > 600` zależy od re-renderu.
3. **`MobileFAB` nachodzący 44 px na baner cookies.** Zmierzyłem realne nakładanie prostokątów
   (wyspa y 626–684, karta banera y 640–828, wyspa pod spodem przez `z-40` vs `z-50`).
   **Wycofane po weryfikacji:** stan powstał, bo zmieniłem viewport narzędziem, co nie wysłało
   zdarzenia `resize` do strony, więc wyspa trzymała podniesienie policzone przy 1280 px.
   Przy świeżym załadowaniu **dev i produkcja dają `bottom: 236px`, lukę 32 px i zero nakładki**.
   Zostaje po tym wyłącznie hipoteza **H-A**, i to sformułowana ostrożniej.
4. **Podwójne pobranie obrazu LCP.** Dev pobierał `w=384`, `w=828` i `w=1920` tego samego pliku,
   przy `fetchpriority="high"` na obu wariantach hero. Na produkcji **oba `<img>` wskazują ten
   sam URL `w=1920`**, więc przeglądarka pobiera go raz. Artefakt dev servera.
5. **„Przygotuj się do sesjijak zawodowiec".** Brak spacji w dwóch nagłówkach na stronie głównej.
   To `<br />` sklejone przez `textContent`. Dokładnie ten sam fałszywy alarm, który metodyka
   opisuje jako historyczny (§11, „audyt bez CSS").
6. **Nierówne wysokości kart na `/uslugi`.** Przy 390 px siatka ma jedną kolumnę, więc karty
   nie stoją obok siebie i różnica wysokości nie jest widoczna dla nikogo. Przy 1280 px
   zmierzone równe.
7. **Elementy wychodzące poza viewport przy 390 px.** Dwanaście węzłów z `right` do 2386 px.
   Wszystkie to zawartość marquee w kontenerze `overflow: hidden`. `scrollWidth` == `innerWidth`.
   Ten sam wniosek co w §8 porannego audytu.
8. **Brak `aria-describedby` na wymaganych polach formularza.** Atrybut dopina się dopiero
   przy błędzie walidacji (`CTA.tsx:384-385`), więc jego brak w stanie spoczynku jest poprawny.
   Kod rozstrzygnął.

**Wniosek metodyczny.** Pięć z ośmiu (1, 2, 3, 4, 7) wzięło się z warunków pomiaru, nie ze
strony. Dwa mechanizmy warte dopisania do metodyki obok istniejącego ostrzeżenia
o `visibilityState`:

- **Karta w tle wstrzymuje re-render Reacta.** Nie tylko animacje: komponent zależny od stanu
  (`MobileFAB`, `visible = scrollY > 600`) po prostu nie istnieje w DOM. Zanim uznasz element
  za brakujący, wysuń kartę na wierzch.
- **Zmiana viewportu narzędziem nie wysyła zdarzenia `resize`.** Każdy komponent, który mierzy
  cokolwiek na `resize`, zostaje z wartością sprzed zmiany szerokości. Po zmianie viewportu
  przeładuj stronę, zamiast mierzyć dalej.

Trzecia rzecz, poza listą fałszywych pozytywów, ale z tej samej rodziny: **punkt odniesienia
sprawdzaj dwa razy, na wejściu i na wyjściu.** Ten raport przez trzy czwarte długości twierdził,
że ósma tura leży poza gitem. Gdybym nie sprawdził `git status` na końcu, wyszedłby dokument
opisujący jako otwarte ryzyko coś, co Marcin zamknął godzinę wcześniej.

---

## 10. Plan działania

### Kolejność wdrożenia

1. **(P3, S, 🧑)** Wskazać inny kadr do hero `/uslugi/eventy-reportaze` → znika duplikat
   kafelek/hero w jednym kliknięciu. **Jedyna rzecz, która krwawi na produkcji od dzisiaj.**
2. **(P4, S, 🧑)** Potwierdzić albo cofnąć wycięcie czterech nazw klientów z hero eventów.
   Twój warunek, ocena agenta.
3. **(H-D, 🧑)** PSI mobile i desktop dla `/` i `/uslugi/eventy-reportaze`. Hero to element LCP,
   a właśnie zmieniło zdjęcie i układ. Teraz jest właściwy moment, bo deploy już jest.
4. **(H-C, 🧑)** Test czytnikiem ekranu trzech porannych poprawek ARIA.
5. **(P2, M, 🤖)** `PELNY2608-18`: jedna ścieżka CTA. Otwarty od 05.08, wraca w trzech kolejnych
   audytach. Wymaga briefu, nie jest robotą „przy okazji".

### Szybkie wygrane (<1 h)

- Krok 1: jedna ścieżka w `services.tsx:288`.
- Krok 2: jedno zdanie w polu `description`.

### Data kontrolna

**Przy najbliższej sesji** — po podmianie kadru sprawdzić jedną rzeczą: czy `alt` kafelka
na `/` różni się od `alt` obrazu hero na `/uslugi/eventy-reportaze`. Jedno porównanie, zero
narzędzi.

**Zestaw kontrolny dla następnego audytu UX** (te same metryki, jedna seria): wysokość hero
i pozycja CTA przy 390 px na `/uslugi/eventy-reportaze` (dziś 1063 px i y = 959), kontrast
`LogoBar` w obu motywach (4,55 i 7,46:1), `scrollWidth` == `innerWidth` przy 375 i 390 px,
liczba błędów kontrastu w dark mode (dziś 0 na 300 elementach), konsola bez błędów.

**07.09.2026** — termin z porannego audytu, **nie przesuwam go**: porównać 28 dni `phone_click`,
rozpoczęć formularza i potwierdzonych wysyłek z poprzednim oknem tej samej długości.

---

## 11. Decyzje potrzebne od Marcina

**1. Które zdjęcie ma stać w hero `/uslugi/eventy-reportaze`?**

- **A. Inny kadr eventowy w hero, kafelek bez zmian.** Znika duplikat, Twój dzisiejszy wybór
  okładki zostaje. Koszt: wskazanie pliku. Odwracalne (jedna ścieżka).
- **B. Kadr grupowy zostaje w hero, zmienia się okładka kafelka.** Ten sam efekt, ale cofa
  decyzję, którą podjąłeś dziś rano. Odwracalne.
- **C. Nie robić nic.** Kafelek i hero pokazują ten sam kadr. Klient po kliknięciu nie dostaje
  nowej informacji wizualnej, a linia eventowa prezentuje się jednym zdjęciem z integracji
  na torze, mimo że sprzedaje głównie konferencje i gale.

**Rekomendacja: A.** Nie B, bo okładka kafelka jest Twoją świadomą decyzją z dzisiaj i ma
uzasadnienie w kodzie („pokazuje SKALĘ wydarzenia"). Hero ma więcej miejsca, więc łatwiej tam
o kadr pokazujący konferencję albo galę, czyli to, po co przychodzi klient korporacyjny.
**Kryterium sukcesu:** po deployu kafelek i hero to dwa różne pliki, sprawdzone porównaniem
`alt` na obu powierzchniach.

**2. Cztery nazwy klientów w opisie hero eventów: zostają wycięte czy wracają?**

Twoja zgoda była warunkowa. Agent ocenił, że `LogoBar` pod hero pokrywa ten dowód, i wyciął.
Sprawdziłem: `LogoBar` faktycznie tam jest i faktycznie zawiera te cztery marki.
**Rekomendacja: zostawić wycięte.** Powtórzenie tych samych czterech nazw w odległości
jednego ekranu nie dokłada dowodu, a wydłuża akapit, który właśnie skracaliśmy.

**3. Czy `PELNY2608-18` (jedna ścieżka CTA) wchodzi do briefu w tym tygodniu?**

Otwarty od 05.08, podniesiony w trzech kolejnych audytach, wyceniony na M.
**Rekomendacja: tak.** Blokada, którą tu widziałem („nie mieszać z ósmą turą"), zniknęła
razem z commitem `df6b1a2`. Obszar hero jest domknięty, więc to dobry moment na temat,
który wraca w każdym raporcie i nigdy nie doczekał się briefu.

---

## 12. Rejestr findingów

Numeracja kontynuuje serię `UXUI2608-` z porannego audytu (ostatni użyty: `-03b`).

| ID | Finding | P | Owner | Status | Dokument |
|---|---|---|---|---|---|
| UXUI2608-01 | Kontrast paska klientów 2,45:1 | P2 | 🤖 | **zweryfikowany ✅** 4,55:1 / 7,46:1 | ten raport |
| UXUI2608-02 | Ścieżki kontaktu bez wspólnego pola 44 px | P3 | 🤖 | **zweryfikowany ✅** 44 px zmierzone | ten raport |
| UXUI2608-03 | `title` == `h1` w 3 z 4 usług | P3 | 🤖 | **zweryfikowany ✅** okruszek == JSON-LD | ten raport |
| UXUI2608-03b | `CLAUDE.md §9` p. 2 opisuje stary kontrakt dwóch pól | P3 | 🧑 | otwarty, tekst gotowy w `POPRAWKI-WDROZONE-2026-08-10.md §G` | tamten raport |
| PELNY2608-66 | ARIA: FAQ / cookies / karuzela | P4 | 🤖 | wdrożony ✅, **czeka na test AT (H-C)** | ten raport |
| **UXUI2608-04** | **Kafelek i hero usługi eventowej to ten sam kadr** | **P3** | 🧑 | **otwarty, nowy — NA PRODUKCJI od `df6b1a2`** | ten raport |
| ~~UXUI2608-05~~ | ~~Ósma tura poza gitem; `TrustLine.tsx` nieśledzony~~ | P2 | 🧑 | **zamknięty 10.08 o 17:12** commitem `df6b1a2` | ten raport |
| **UXUI2608-06** | **CTA podstrony usługi 166 px pod zgięciem na 390 px** | **P3** | 🧑 | **otwarty, nowy** (poprawa −120 px odnotowana, świadomie bez rekomendacji) | ten raport |
| **UXUI2608-07** | **Nazwy klientów wycięte z hero eventów przy warunkowej zgodzie** | **P4** | 🧑 | **otwarty, nowy** | ten raport |
| PELNY2608-18 | Rozszczepiona ścieżka CTA `#kontakt` vs `/kontakt` | P2 | 🤖 | **bez zmian**, otwarty od 05.08 | `AUDYT-PELNY-2026-08-05.md` |
| SPOJ2608-09 | To samo, zgłoszone niezależnie 06.08 | P2 | 🤖 | **bez zmian** | `AUDYT-SPÓJNOŚĆ-2026-08-06.md` |

Bilans rundy 2: **3 findingi otwarte** (1× P3 na produkcji, 1× P3 bez rekomendacji, 1× P4),
**1 zamknięty w trakcie**, **3 zweryfikowane jako naprawione**, **2 przeniesione bez zmian**,
**8 fałszywych pozytywów wycofanych przed wpisaniem** (§9).

---

*Audyt: Claude Code, 10.08.2026, ok. 17:00–17:30. Dane: pomiar DOM na dev serverze i na
produkcji `szabunia.pl` przy 375 / 390 / 1280 px w obu motywach, `tsc --noEmit` i `eslint`
uruchomione lokalnie. Punkt odniesienia przesunął się w trakcie z `2ee60ef` (drzewo brudne)
na `df6b1a2` (drzewo czyste, produkcja == `main`); wszystkie pomiary są opisane tym, którego
stanu dotyczą. Dokument nie wprowadza zmian w kodzie, treści ani panelach. Git po stronie Marcina.*
