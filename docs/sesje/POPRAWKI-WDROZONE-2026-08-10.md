# Poprawki wdrożone — 10 sierpnia 2026

**Status:** zmiany w drzewie roboczym, **niezacommitowane, NIE wdrożone na produkcję**.
**Źródło:** `AUDYT-UX-UI-2026-08-10.md` (findingi UXUI2608-01, UXUI2608-02, PELNY2608-66).
**Diff:** 9 plików, +106 / −13 · lint: PASS (0/0) · tsc: PASS · build: PASS.
**Zatwierdzone przez Marcina 10.08.2026:** wszystkie sześć zmian a11y/UX bez cofania +
wariant C dla UXUI2608-03 (§H). Mikrocopy portfolio i copy hero zostają bez zmian.
**Punkt odniesienia:** audyt mierzył kod na `862bbe5`. W momencie wdrożenia `main` stał na
`d106c8d`, czyli **dwa commity dalej** — różnice opisane w §F.
**Weryfikacja:** dev server, pomiar DOM na `/` (1280 px) i `/blog` (375 px), 10.08.2026.

---

## A. Co zrobione

### Dostępność — czytelność dowodu społecznego (UXUI2608-01)

Nazwy klientów w pasku pod hero miały w jasnym motywie kontrast **2,45:1** przy wymaganych
3:1 (WCAG 1.4.3, tekst duży i pogrubiony). Zmieniona jedna klasa koloru.

- `src/components/LogoBar.tsx:50` — `text-steel-light` → `text-steel`.
- **Pomiar po zmianie:** `rgb(100, 116, 139)` na `rgb(249, 250, 251)` = **4,55:1**.
  To przechodzi nawet próg dla tekstu normalnego, nie tylko dużego.
- Ciemny motyw bez zmian (`dark:text-dark-text-muted`, 7,46:1 — był poprawny).
- **Aby odwrócić:** przywróć `text-steel-light` w tej jednej klasie.

### Konwersja — jedno pole dotyku na obu ścieżkach kontaktu (UXUI2608-02)

- `src/components/Hero.tsx:186` — dodane `min-h-11` do linku telefonicznego.
  **115×23 px** (pomiar z audytu, produkcja) → **115×44 px** (mój pomiar, dev). Wysokość rzędu
  bez zmian (CTA nadal 56 px), środki obu elementów w tej samej linii — zmierzone
  `telCenter 625` = `ctaCenter 625`, więc zero przesunięcia wizualnego na desktopie.
- `src/components/MobileFAB.tsx:84` — dodane `min-h-11` do CTA „Oferta".
  **40 px** (wartość policzona przez audyt z klas `py-2.5 text-sm`) → **104×44 px zmierzone
  przy 375 px**, czyli równo z sąsiednimi ikonami e-mail i telefon (44×44 px, też zmierzone).
  Wysokość wyspy po zmianie 58 px; przed zmianą też ją wyznaczały ikony 44 px, więc układ się
  nie przesuwa — tego stanu „przed" nie mierzyłem, wynika z geometrii flexa.
  Brak poziomego scrolla: `scrollWidth` 375 = `innerWidth` 375.
- To cel **ergonomiczny** (SC 2.5.5, poziom AAA), nie naprawa niezgodności z AA — tak samo
  jak opisał to audyt.
- **Aby odwrócić:** usuń `min-h-11` z obu klas.

### Dostępność — domknięcie PELNY2608-66 (trzy punkty ARIA)

**1. Baner cookies: wybrana jedna semantyka — niemodalny region.**
`src/components/CookieConsent.tsx`. Baner deklarował `role="dialog"` bez `aria-modal`, bez
pułapki fokusu i bez Escape, czyli obiecywał czytnikowi modal, którego nie ma. Faktycznie jest
niemodalny (`pointer-events-none` na wrapperze, brak nakładki, strona działa dalej), więc
semantyka poszła za rzeczywistością, nie odwrotnie: `role="region"` + `aria-label`.
Dodatkowo `tabIndex={-1}` i przeniesienie fokusu **tylko** przy świadomym otwarciu z linku
„Ustawienia cookies" w stopce — baner renderuje się na końcu `layout.tsx`, więc bez tego
kliknięcie linku z klawiatury nie dawało efektu do wyśledzenia. Przy automatycznym pojawieniu
się fokus **nie** jest zabierany (to byłoby naruszenie WCAG 3.2.1).
**Escape celowo nie zamyka banera:** musiałby wybrać za użytkownika „akceptuję" albo „odrzuć",
a to decyzja o zgodzie, nie zamknięcie okna.
**Aby odwrócić:** `role="region"` → `role="dialog"`, usuń `tabIndex` i efekt z `focusOnOpen`.

**2. Zwinięta odpowiedź FAQ nie jest już czytana.**
`src/components/FAQ.tsx:90` — `aria-hidden={!isOpen}`. Odpowiedź jest chowana wizualnie
(`grid-rows-[0fr]` + `opacity-0`), nie atrybutem `hidden`, żeby nie zabić animacji — dlatego
treść zostawała w drzewie dostępności. **Zweryfikowane klikaniem:** zamknięta `aria-hidden="true"`
→ otwarta `false` + `aria-expanded="true"` → ponownie zamknięta `true`. Bezpieczne, bo `faq.a`
jest czystym tekstem (zero elementów fokusowalnych pod `aria-hidden`).
**Aby odwrócić:** usuń jedną linię `aria-hidden={!isOpen}`.

**3. Karuzela opinii: jeden region live zamiast dwóch.**
`src/components/Testimonials.tsx` — usunięte `aria-live="polite"` z widocznej karty (zostaje
sam licznik `sr-only` „Opinia X z Y") oraz `aria-atomic="true"` z kontenera karuzeli.
`aria-atomic` na **przodku** regionu live kazał czytnikowi odczytywać całą karuzelę od nowa,
a dwa nakładające się regiony przy autoprzewijaniu czytały licznik i zaraz po nim cały,
kilkuzdaniowy cytat. **Pomiar po zmianie:** na stronie głównej 1 element z `aria-live`
(było 2), zero `aria-atomic` na kontenerze karuzeli.
**Aby odwrócić:** przywróć oba atrybuty — ale przeczytaj najpierw komentarze w kodzie.

---

## B. Już było w kodzie (wdroży się z deployem)

Nic. Wszystkie trzy findingi wymagały zmiany.

---

## C. Co zostaje po stronie Marcina

1. **Git.** Diff jest w drzewie roboczym, niezacommitowany, w jednej całości (bez dzielenia
   na commity tematyczne — git jest po Twojej stronie). Sugerowany commit:
   `fix(a11y,seo): kontrast paska klientow, 44px na sciezkach kontaktu, ARIA, shortTitle w okruszkach`
2. **Test klawiaturą i czytnikiem ekranu (H3 z audytu).** Trzy rzeczy, których nie da się
   sprawdzić pomiarem DOM: czy baner cookies po kliknięciu „Ustawienia cookies" w stopce
   faktycznie łapie fokus, czy karuzela czyta się teraz jednym komunikatem, czy zwinięte FAQ
   milczy. VoiceOver + Safari albo NVDA + Firefox.
3. **Ciemny motyw wizualnie (H2).** Kontrast liczony, nie oglądany — pasek klientów w dark
   mode nie był ruszany, ale warto zobaczyć oba motywy obok siebie.
4. **375 / 390 / 606 px na widocznym Chrome (H1).** Zmierzyłem 375 px na dev serverze; audyt
   nie miał wiarygodnego renderu tych szerokości i to pozostaje otwarte dla pełnego przeglądu.
5. **Okruszek na podstronie usługi — rzut okiem.** Zweryfikowany w zbudowanym HTML (§G), ale
   wart jednego spojrzenia na żywo przy 375 px: krótsza nazwa nie powinna już zawijać wiersza.

---

## D. Świadomie odłożone (do decyzji)

1. **Mikrocopy kafla portfolio** (§5 audytu, `Portfolio.tsx:115-131`): „Chcesz zobaczyć więcej?
   Napisz do mnie" prowadzi do `#kontakt`, nie do portfolio. To nie błąd funkcjonalny — decyzja
   „lejek bez bocznych wyjść" jest zamknięta. Audyt proponuje „Masz podobny projekt? Napisz do
   mnie" i rekomenduje „tak, ale jako osobny mikrotest". **ZAMKNIĘTE 10.08.2026: zostaje bez
   zmian.** Marcin: „nie otwierałbym teraz kolejnego frontu", copy nie jest błędem UX, jeśli
   celowo prowadzimy do kontaktu. Ewentualny test copy to osobna robota, nie ta.
2. **Kolejność w banerze cookies w DOM.** Baner stoi na końcu `layout.tsx`, więc czytelnik
   liniowy dociera do niego jako do ostatniego elementu strony. Przeniesienie go wyżej w DOM
   (pozycja wizualna by się nie zmieniła — jest `fixed`) domknęłoby temat do końca, ale to już
   zmiana poza zakresem findingu, w pliku objętym stop-condition. Do rozważenia osobno.

---

## E. Jak zweryfikować i wdrożyć

```bash
cd /Users/marcinszabunia/Documents/05_Strona_WWW/marcinszabunia && git --no-optional-locks diff --stat
```

```bash
cd /Users/marcinszabunia/Documents/05_Strona_WWW/marcinszabunia && npm run lint && npx tsc --noEmit && npm run build
```

Po deployu, wg daty kontrolnej z audytu (11.08.2026): kontrast paska klientów, prostokąty CTA,
375 / 390 / 606 px, ciemny motyw, kotwice, konsola.

---

## F. Rozjazd wobec stanu z audytu — do decyzji Marcina

Audyt mierzył kod na `862bbe5`. Commit `d106c8d` („pelne nazwy uslug na kafelkach") zmienił
`src/data/services.tsx` w sposób, który **łamie regułę z `CLAUDE.md §9` punkt 2**: „`title`
zostaje krótką nazwą dla nawigacji, kart, okruszków i `name` w JSON-LD; `h1` niesie frazę.
**Nie zlewać tych dwóch pól.**"

Stan po `d106c8d` — w trzech z czterech usług `title` jest teraz **identyczny** z `h1`:

| Usługa | `h1` | `title` | Zlane? |
|---|---|---|---|
| `eventy-reportaze` | Fotografia i wideo wydarzeń firmowych w Poznaniu | Dokumentacja wydarzeń firmowych | nie |
| `wizerunek-portrety` | Fotografia i wideo wizerunkowe dla firm | Fotografia i wideo wizerunkowe dla firm | **tak** |
| `fotografia-produktowa` | Fotografia i wideo produktowe | Fotografia i wideo produktowe | **tak** |
| `nieruchomosci-przemysl` | Fotografia i wideo nieruchomości i przemysłu | Fotografia i wideo nieruchomości i przemysłu | **tak** |

`title` nie jest używany tylko na kafelkach. Idzie w cztery inne miejsca:
`uslugi/[slug]/page.tsx:89` (ostatni okruszek), `:96` (`name` w JSON-LD `Service`),
`uslugi/page.tsx:59` (`name` w liście) i `:114` (nagłówek karty na hubie usług).
Skutek: okruszek brzmi dziś „Strona główna / Usługi / Fotografia i wideo nieruchomości
i przemysłu", a `name` w JSON-LD powtarza pełną frazę H1.

> **ROZSTRZYGNIĘTE 10.08.2026: wariant C.** Marcin: „nie aktualizowałbym `CLAUDE.md` tylko
> po to, żeby zalegalizować obecny stan". Wdrożenie i pomiary w **§G**. Poniższy opis wariantów
> zostaje jako zapis tego, z czego wybieraliśmy.

Commit `d106c8d` jest świadomy i podpisany decyzją („pelne nazwy uslug na kafelkach"), więc
niczego w nim nie odwracałem. Warianty do wyboru były trzy:

- **A.** Zostaje jak jest, a `CLAUDE.md §9` punkt 2 zostaje przepisany (bo dziś kłamie).
- **B.** Wraca krótki `title` na kafelki i okruszki, `h1` zostaje frazą — czyli powrót do reguły.
- **C.** Rozdzielenie trzeciego pola: krótka nazwa osobno dla okruszka i JSON-LD, pełna na kafelku.

Rekomendacja: **A albo C.** Kafelki z pełną nazwą usługi są zrozumiałe dla klienta, który nie
zna branżowego skrótu, ale okruszek długi na 45 znaków przestaje być nawigacją. Jeśli zmiana
miała dotyczyć kafelków, to niech dotyczy kafelków — a nie równocześnie okruszka i JSON-LD.

---

## G. UXUI2608-03 — wariant C wdrożony (decyzja Marcina 10.08.2026)

Rozdzielone trzy zastosowania nazwy usługi. Nowe pole `shortTitle?: string`
w `ServiceData` ([services.tsx](../../src/data/services.tsx)) — jedno pole, nie trzy, i tylko
tam, gdzie było potrzebne.

| Zastosowanie | Pole | Zmiana |
|---|---|---|
| H1 podstrony | `h1` | bez zmian |
| Kafelek (strona główna, hub, karta pod wpisem blogowym) | `title` | bez zmian, pełna nazwa zostaje |
| Okruszek (widoczny + `BreadcrumbList`) | **`shortTitle`** | nowe |
| `Service.name` w JSON-LD | **`shortTitle`** | nowe |
| `ItemList` na `/uslugi` | **`shortTitle`** | nowe |
| URL / slug | `slug` | bez zmian |

**Wartości `shortTitle`** — dokładnie te, które podał Marcin: `Wydarzenia firmowe`,
`Wizerunek firmy`, `Fotografia produktowa`, `Nieruchomości i przemysł`.

**Pliki:** `src/data/services.tsx` (pole + cztery wartości + opis kontraktu trzech pól
w komentarzach interfejsu), `src/app/uslugi/[slug]/page.tsx:86-101` (okruszek + `Service.name`),
`src/app/uslugi/page.tsx:59` (`ItemList`).

**Weryfikacja na zbudowanym HTML** (`.next/server/app/`), wszystkie cztery usługi:

| Usługa | Okruszek + JSON-LD `name` | H1 | Kafelek |
|---|---|---|---|
| eventy-reportaze | Wydarzenia firmowe | Fotografia i wideo wydarzeń firmowych w Poznaniu | Dokumentacja wydarzeń firmowych |
| wizerunek-portrety | Wizerunek firmy | Fotografia i wideo wizerunkowe dla firm | Fotografia i wideo wizerunkowe dla firm |
| fotografia-produktowa | Fotografia produktowa | Fotografia i wideo produktowe | Fotografia i wideo produktowe |
| nieruchomosci-przemysl | Nieruchomości i przemysł | Fotografia i wideo nieruchomości i przemysłu | Fotografia i wideo nieruchomości i przemysłu |

**Potwierdzenie z niezależnego miejsca:** `hasOfferCatalog` w JSON-LD organizacji
(`layout.tsx`, wpisane na sztywno, nietknięte) używa od dawna **dokładnie tych czterech
krótkich nazw**. Wariant C nie wprowadza więc nowego słownika — przywraca zgodność podstron
z nazwami, które strona już deklarowała na poziomie firmy. Przed zmianą `Service.name` na
podstronie i `Service.name` w katalogu oferty mówiły o tej samej usłudze dwie różne rzeczy.

`ItemList` na hubie potraktowałem jako dane strukturalne, czyli krótka nazwa — tak samo jak
`Service.name`. To moja interpretacja tabeli, nie jej litera: tabela wymienia `Service.name`,
a `ItemList` nie. Jeśli ma być odwrotnie (dane strukturalne mirrorują widoczne kafelki), to
jedna linia do zmiany.

**Aby odwrócić całość:** usuń cztery wartości `shortTitle` z `services.tsx`. Fallback
`shortTitle ?? title` sprawia, że kod wraca wtedy do stanu z `d106c8d` bez ruszania trzech
miejsc użycia.

### Co zostaje otwarte: `CLAUDE.md §9` punkt 2

Zapis w `CLAUDE.md` mówi dziś: „`title` zostaje krótką nazwą dla nawigacji, kart, okruszków
i `name` w JSON-LD". Po wariancie C to **nieprawda** — i to nieprawda groźna, bo następny agent
przeczyta ją jako polecenie i cofnie tę zmianę. Kontrakt trzech pól opisałem w komentarzach
w `services.tsx`, więc kod się broni sam, ale `CLAUDE.md` wymaga Twojej zgody, więc go
nie ruszałem. Gotowy tekst do wklejenia w miejsce punktu 2:

> 2. **Trzy pola, trzy zadania w `ServiceData`** (`services.tsx`): `title` to pełna nazwa
>    marketingowa na kafelki, `shortTitle` krótka nazwa nawigacyjna do okruszków i JSON-LD
>    (`Service.name`, `ItemList`), `h1` niesie frazę wyszukiwaną. **Nie zlewać tych trzech pól.**
>    Rozdzielone 10.08.2026, wariant C (finding UXUI2608-03). Nie doklejać miasta przecinkiem,
>    patrz `docs/zasady-tekstow.md`.

---

## H. Rejestr findingów

| ID | Finding | P | Owner | Status | Dokument |
|---|---|---|---|---|---|
| UXUI2608-01 | Kontrast paska klientów 2,45:1 w jasnym motywie | P2 | 🤖 | **wdrożony ✅, niezdeployowany** | ten raport |
| UXUI2608-02 | Hero phone i mobilne „Oferta" bez wspólnego pola 44 px | P3 | 🤖 | **wdrożony ✅, niezdeployowany** | ten raport |
| PELNY2608-66 | Drobne kwestie ARIA FAQ / cookies / karuzeli | P4 | 🤖 | **wdrożony ✅, niezdeployowany** — czeka na test AT (H3) | ten raport |
| UXUI2608-03 | `title` == `h1` w 3 z 4 usług po `d106c8d` | P3 | 🤖 | **wdrożony ✅, niezdeployowany** — wariant C, §G | ten raport |
| UXUI2608-03b | `CLAUDE.md §9` p. 2 opisuje stary kontrakt dwóch pól | P3 | 🧑 | otwarty — gotowy tekst w §G, czeka na zgodę | ten raport |
| — | Mikrocopy kafla portfolio | O | 🧑 | **zamknięty: zostaje bez zmian** (decyzja 10.08.2026) | ten raport |
| — | Copy hero „profesjonalny wizerunek" | O | 🧑 | **zamknięty: zostaje** — nie traktować „profesjonalny" jako słowa zakazanego w tym zdaniu | ten raport |

Statusów w `AUDYT-UX-UI-2026-08-10.md` nie ruszałem: to dokument diagnostyczny z datą i własną
klauzulą „nie wprowadza zmian". Aktualny rejestr żyje tutaj.

---

*Wdrożenie: Claude Code, 10.08.2026. Dowody: pomiary DOM na dev serverze (kontrast, prostokąty
CTA, przełączanie `aria-hidden` w FAQ, liczba regionów live), odczyt nazw i JSON-LD ze
zbudowanego HTML w `.next/server/app/`, lint + tsc + build lokalnie. Git po stronie Marcina.*
