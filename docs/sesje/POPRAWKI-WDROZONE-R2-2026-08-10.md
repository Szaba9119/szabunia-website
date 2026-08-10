# Poprawki wdrożone — runda 2, 10 sierpnia 2026

**Status:** ✅ **zacommitowane i wdrożone na produkcję** jako `b35b0ae`, 10.08.2026.
Weryfikacja po deployu na `szabunia.pl`: hero eventów, brak duplikatów zdjęć, ścieżka CTA
na pięciu trasach w obu breakpointach. Szczegóły w §H na końcu.

~~Status pierwotny: zmiany w drzewie roboczym, niezacommitowane, NIE wdrożone.~~
Ten zapis był prawdziwy w chwili pisania i nieprawdziwy dwadzieścia minut później.
Zostawiam go przekreślonego, bo raport wdrożenia bez daty ważności jest dokładnie tym
mechanizmem, który w tym projekcie już raz kosztował (`UXUI2608-03b`).
**Źródło:** `BRIEFY-UX-UI-R2-2026-08-10.md`, autoryzacja Marcina 10.08.2026: **C, A, A**.
**Diff:** 3 pliki, +102 / −17 · **lint: PASS (0/0)** · **tsc: PASS** · build: do uruchomienia u Marcina.
**Punkt wyjścia:** `df6b1a2`, drzewo `src/` czyste, produkcja == `main`.
**Weryfikacja:** pomiar DOM na dev serverze, 390 i 1280 px, oba motywy, 10.08.2026.

---

## A. Co zrobione

### Lejek usług: kafelek i hero przestały pokazywać to samo zdjęcie (UXUI2608-04, wariant C)

Klient klikał kafelek eventów na stronie głównej i trafiał na hero z **tym samym kadrem**.
Wariant C rozdziela trzy powierzchnie: kafelek, hero i pas galerii.

- `src/data/services.tsx` — `heroImage` usługi eventowej: `event-02-zdjecie-grupowe-tor.jpg`
  → **`event-04-gala-wreczenie-wyroznien.jpg`**
- `src/components/ServiceGalleryStrip.tsx` — z listy `eventy` wyszło `event-04`
  (bo przejęło rolę hero **na tej samej stronie**), weszło **`event-16-wystep-na-scenie-hali`**,
  jedyny kadr eventowy nieużywany dotąd nigdzie w serwisie.

**Pomiar po zmianie** na `/uslugi/eventy-reportaze`, 390 px: **7 zdjęć eventowych w DOM,
każde dokładnie raz, zero duplikatów.** Kafelek na `/` to nadal `event-02` z własnym `alt`,
więc oba kryteria z briefu (różny plik, różny `alt`) są spełnione.

**Aby odwrócić:** przywróć obie wartości. To dwie linie w dwóch plikach.

### Kadrowanie hero: sprawdzone wycinkiem, nie na oko (Twoja uwaga nr 4)

Miałeś rację, że to jest pułapka, i o mało w nią nie wpadłem. Kontener hero jest **kwadratowy**
(zmierzone: 517×517 przy 1280 px, 358×358 przy 390 px), a plik ma 1920×1280, czyli 3:2.
Przy `object-fit: cover` widoczne jest tylko **środkowe 67% szerokości klatki**, obcinane
po **16,7% z każdej strony**.

Zamiast zgadywać, wyciąłem z pliku dokładnie to okno (1280×1280) dla dwóch ustawień i obejrzałem:

| Ustawienie | Okno z klatki 1920 px | Co widać |
|---|---|---|
| **domyślne, wyśrodkowane** | x = 320…1600 | wszystkie trzy osoby nagrodzone z twarzami w całości, uścisk dłoni, czytelne logo na torbie |
| przesunięte w prawo (68%) | x = 435…1715 | więcej miejsca z prawej, ale urwany mężczyzna w okularach i połowa torby |

**Wniosek: `heroImagePos` NIE jest potrzebne**, domyślne wyśrodkowanie jest lepsze.
Zapisałem to w komentarzu w kodzie razem z liczbami, żeby nikt nie dodał tego pola „dla pewności".

**Korekta mojej wcześniejszej oceny:** w trakcie sprawdzania napisałem, że kadr przetnie
mężczyznę z prawej w połowie twarzy. To było oszacowanie z pozycji na podglądzie, nie pomiar.
Wycinek pokazał, że jego twarz mieści się w całości. Zmiana nie była potrzebna.

### Treść: nazwy klientów nie wracają do hero eventów (UXUI2608-07, wariant A)

Kod był już w docelowym stanie, więc **treści nie ruszałem**. Zmieniłem natomiast komentarz
nad polem `description`, bo opisywał nieaktualny stan: mówił, że wycięcie zdania było oceną
agenta pod Twoim warunkiem. Teraz jest to Twoja potwierdzona decyzja i tak jest zapisane,
razem z powodem (`LogoBar` z tymi samymi czterema markami renderuje się ekran niżej).

To jedyna zmiana w tym punkcie i jest to zmiana **wyłącznie w komentarzu**. Zrobiłem ją,
bo nieaktualny komentarz to dokładnie ten mechanizm, który w tym projekcie już raz zawiódł
(`UXUI2608-03b`, `CLAUDE.md §9` opisujący nieistniejący kontrakt pól).

**Aby odwrócić:** to komentarz, usunięcie niczego nie zmienia w renderze.

### Konwersja: jedna ścieżka głównego CTA (PELNY2608-18, wariant A)

Najstarszy otwarty punkt UX w projekcie, otwarty od 05.08, zgłoszony niezależnie trzy razy.

`src/components/Navigation.tsx` — nowa funkcja `goToContact`, **przeniesiona żywcem
z `MobileFAB.tsx:58-64`**, podpięta pod oba przyciski „Zapytaj o ofertę" (pasek desktop
i menu mobilne). Zasada: `href="/kontakt"` zostaje prawdziwym adresem, a klik przechwytujemy
tylko wtedy, gdy sekcja `#kontakt` istnieje na bieżącej stronie.

**Weryfikacja obu gałęzi, deterministyczna** (podsłuch wywołania `scrollIntoView`,
bo animacja scrolla nie rusza w karcie, której system nie pokazuje):

| Strona | Sekcja `#kontakt` | `scrollIntoView` | Nawigacja | Wynik |
|---|---|---|---|---|
| `/` | jest | wywołane na `#kontakt`, `{behavior:"smooth"}` | brak, `history.length` bez zmian | ✅ scroll |
| `/uslugi/eventy-reportaze`, menu mobilne | jest | wywołane | brak | ✅ scroll, menu zamknięte przed scrollem, fokus wrócił na hamburgera |
| `/poradnik` | **nie ma** | **nie wywołane** | `/poradnik` → `/kontakt` | ✅ zwykłe przejście |

`href` i `data-cta` po kliknięciu nietknięte w każdym przypadku.

**Aby odwrócić:** usuń `goToContact` i oba `onClick`, przywróć w menu mobilnym
`onClick={() => closeMobileMenu()}`.

---

## B. Korekta briefu: `/blog` ma sekcję kontaktu

W briefie napisałem, że na `/blog` i `/poradnik` nie ma sekcji `#kontakt`, więc CTA tam
przechodzi na `/kontakt`. **To było prawdziwe tylko w połowie.** Sprawdzone w kodzie:

- Sekcję `<CTA>` renderuje **osiem** tras: `/`, `/uslugi`, `/uslugi/[slug]`, `/portfolio`,
  `/portfolio/[slug]`, `/galeria`, `/blog`, `/kontakt`.
- Nie renderują jej **trzy**: `/blog/[slug]`, `/poradnik`, `/polityka-prywatnosci` (plus strona błędu).

Czyli **indeks bloga scrolluje, a pojedynczy wpis przechodzi na `/kontakt`**. Na zachowanie
poprawki to nie wpływa, bo warunek sprawdza obecność sekcji w locie, a nie listę tras.
Odnotowuję, bo brief zawierał nieprawdziwe zdanie i nie chcę, żeby ktoś na nim polegał.

---

## C. Czego NIE zrobiłem

1. **Nie commitowałem i nie deployowałem.** `CLAUDE.md §7` i `§11.1`: git obsługuje Marcin.
   Twoja kolejność zakładała commit i deploy w punktach 4 i 5 — to Twoje kroki, nie moje.
2. **Nie ruszyłem żadnego `data-cta`.** Sprawdzone na diffie: jedyna zmieniona linia
   zawierająca ten ciąg to komentarz ostrzegawczy. Zero dodanych, zero usuniętych atrybutów.
3. **Nie ruszałem `UXUI2608-06`** (CTA pod zgięciem). Zgodnie z Twoją decyzją: hero po raz
   dziewiąty nie idzie do przebudowy.
4. **Nie uruchomiłem `npm run build`** — w tym środowisku pada z Bus error. Lint i tsc przeszły.

---

## D. Co zostaje po Twojej stronie

1. **`npm run build`** lokalnie.
2. **Commit.** Sugerowana wiadomość:
   `fix(ux): jedna sciezka CTA, rozdzielenie kadru hero i kafelka eventow`
3. **Deploy** (push do `main` = automatyczny deploy).
4. **PSI mobile i desktop** dla `/` i `/uslugi/eventy-reportaze` — dopiero po deployu.
   Hero zmieniło zdjęcie, a jest elementem LCP. Nowy plik waży **404 KB** wobec 567 KB
   poprzedniego, więc kierunek jest dobry, ale to trzeba zmierzyć, nie założyć.
5. **Rzut okiem na hero eventów na żywo** — kadrowanie sprawdziłem wycinkiem z pliku,
   ale Ty ocenisz je jako fotograf lepiej niż ja z liczb.
6. **Test czytnikiem ekranu** (H-C z audytu) — nadal otwarty, niezależny od tej tury.

---

## E. Jak zweryfikować

```bash
cd /Users/marcinszabunia/Documents/05_Strona_WWW/marcinszabunia && git --no-optional-locks diff --stat
```

```bash
cd /Users/marcinszabunia/Documents/05_Strona_WWW/marcinszabunia && npm run lint && npx tsc --noEmit && npm run build
```

Po deployu, dwa sprawdzenia na żywo:

- klik „Zapytaj o ofertę" w pasku na `/` przewija do formularza **bez przeładowania**,
  a ten sam przycisk na `/poradnik` przechodzi na `/kontakt`
- `alt` kafelka eventów na `/` różni się od `alt` obrazu hero na `/uslugi/eventy-reportaze`

---

## F. Pomiary kontrolne po zmianie

| Metryka | Przed | Po | Uwaga |
|---|---|---|---|
| Wysokość hero `/uslugi/eventy-reportaze` @390 px | 1063 px | **1063 px** | układ nietknięty, zgodnie z AC |
| Duplikaty zdjęć eventowych na podstronie | 0 | **0** | 7 plików, każdy raz |
| Kafelek vs hero: plik | **ten sam** | **różne** | `event-02` vs `event-04` |
| Poziomy scroll @390 px | brak | **brak** | `scrollWidth` == `innerWidth` |
| Błędy kontrastu, motyw ciemny | 0 / 132 | **0 / 131** | liczba elementów zmieniła się z treścią pasa galerii |
| Błędy konsoli | 0 | **0** | |
| `data-cta` zmienione | — | **0** | |
| lint / tsc | PASS | **PASS** | |

---

## G. Rejestr findingów — stan aktualny

| ID | Finding | P | Status |
|---|---|---|---|
| UXUI2608-04 | Kafelek i hero eventów to ten sam kadr | P3 | **wdrożony ✅, niezdeployowany** (wariant C) |
| UXUI2608-07 | Nazwy klientów wycięte przy warunkowej zgodzie | P4 | **zamknięty ✅** — wariant A, decyzja zapisana w kodzie |
| PELNY2608-18 | Rozszczepiona ścieżka CTA | P2 | **wdrożony ✅, niezdeployowany** (wariant A) |
| SPOJ2608-09 | To samo, zgłoszone niezależnie | P2 | **wdrożony ✅** razem z PELNY2608-18 |
| UXUI2608-06 | CTA podstrony usługi pod zgięciem | P3 | **świadomie bez akcji**, decyzja Marcina 10.08 |
| UXUI2608-03b | `CLAUDE.md §9` p. 2 opisuje stary kontrakt pól | P3 | **otwarty** — wymaga Twojej zgody, tekst w `POPRAWKI-WDROZONE-2026-08-10.md §G` |
| PELNY2608-66 | ARIA: FAQ / cookies / karuzela | P4 | wdrożony ✅, **czeka na test czytnikiem** |

Po tej turze **rundy 2 nie zostaje ani jeden otwarty finding wymagający kodu.**
Otwarte są dwie rzeczy poza kodem (test AT, PSI) i jeden zapis w `CLAUDE.md` czekający
na Twoją zgodę od rana.

---

---

## H. Runda 3 — domknięcie `/uslugi/eventy-reportaze` (10.08.2026, po deployu `b35b0ae`)

Dziesięć decyzji Marcina, wykonane w jednej turze. Diff: 7 plików, +114 / −67 ·
lint PASS · tsc PASS · **build PASS (55/55 stron)**.

| # | Zmiana | Plik |
|---|---|---|
| 1 | Oba paski galerii wyśrodkowane; było jedyne miejsce z wyrównaniem do lewej, przez co układ szedł lewa → środek → lewa | `ServiceGalleryStrip.tsx` |
| 2 | Film Box17 usunięty z paska wideo produktowego i z zakładki wideo `/galerii` | `ServiceGalleryStrip.tsx`, `galeria.ts` |
| 3 | „Usługi" w nawigacji i okruszku → `/uslugi` | **bez zmian, już tak było** |
| 4 | Hero eventów → kadr grupowy na torze | `services.tsx` |
| 5 | Kafelek eventów na stronie głównej → gala | `services.tsx` |
| 6 | **Live editing = opcja dodatkowo płatna**, ujednolicone | 7 miejsc, patrz niżej |
| 7 | „Wyjazdy integracyjne" w „Dla jakich wydarzeń" | `services.tsx` |
| 8 | „Rekrutacja i employer branding" w „Gdzie materiał pracuje dalej" | `services.tsx` |
| 9 | Galeria portretów przesunięta za „Zakres realizacji" | `uslugi/[slug]/page.tsx` |
| 10 | Bez nowych sekcji | nadal 10 sekcji |

**Kolejność „Wybranych realizacji"** zmieniona osobno, tą samą turą: E-commerce All-in →
IDcom → Yes Butcher → Artech. ⚠ To **cofa `ZDJ2608-32`** z 04.08: woohoo zszedł wtedy
z pierwszego miejsca, bo wszystkie pięć jego obrazów to grafiki i klatki z filmu, a `gallery`
jest puste. Marcin zna ten koszt. Właściwym docelowym rozwiązaniem jest dołożenie do tego
case study prawdziwych kadrów foto, nie przestawianie kolejności w tę i z powrotem.

**Live editing, siedem poprawionych miejsc:** kafelek usługi, tytuł i opis pozycji
w „Zakresie realizacji", krok „Live edit" w procesie (`services.tsx` i `portfolio.ts`),
FAQ w obu tych plikach, lista „Co dostajesz po evencie" w `blog.ts`.

**Trzy miejsca celowo nietknięte, bo były poprawne od początku:** `llms.txt`
(„Opcjonalnie"), słowniczek blogowy („Opcja dodatkowa, wyceniana za zdjęcie"), artykuł
o live editingu („wyceniam ją jako opcję"). Listy typu „na wycenę wpływa" też zostają:
bycie czynnikiem cenowym samo w sobie znaczy, że to dodatek.

**Zmierzone po zmianie** na `/uslugi/eventy-reportaze`: 7 zdjęć eventowych i 6 portretowych,
**każde dokładnie raz**; hero (`event-02`) różne od kafelka na stronie głównej (`event-04`);
wszystkie sekcje treści wyrównane do środka. Sekcja kontaktowa zostaje do lewej, bo to blok
formularza w dwóch kolumnach, a nie sekcja treści.

**Własny błąd w trakcie:** wstawiłem komentarz `{/* */}` w pozycję wyrażenia w ternary,
co wywaliło parsowanie JSX. Wyłapał `tsc`, naprawione w tej samej turze. Odnotowuję,
bo przez chwilę build był czerwony.

---

*Wdrożenie: Claude Code, 10.08.2026. Dowody: pomiar DOM na dev serverze (390 i 1280 px,
oba motywy), podsłuch `scrollIntoView` dla obu gałęzi CTA, wycinek 1280×1280 z pliku hero
dla oceny kadrowania, lint, tsc i build lokalnie, weryfikacja produkcji po deployu.
Commity `b35b0ae` i kolejny z rundy 3 wykonane za wyraźną zgodą Marcina.*
