# PLAN AUDYTU — TREŚĆ, SPÓJNOŚĆ I JĘZYK · szabunia.pl · 2026-08-04

**Tryb:** autonomiczny (Marcin poza komputerem, bez pytań; każda bramka zgody → zapis w sekcji decyzji).
**Klauzula:** audyt niczego nie zmienia. Zero edycji w `src/`, `public/`, panelach i Profilu Firmy.
Produktem są trzy pliki w `docs/sesje/` i briefy. Wdrożenie jest osobną robotą.

---

## 1. Kontekst i założenia

### 1.1 Punkt odniesienia

| Co | Wartość | Skąd |
|---|---|---|
| HEAD | `88564ac83f141c32e882ce2322b2683dc6262b43` | `git log -1`, 2026-08-04 15:11:08 +0200 |
| Komunikat HEAD | `fix(blog): widoczna data korekty zamiast publikacji, sortowanie po niej, bez dat na kafelkach listy` | j.w. |
| Gałąź | `main`, śledzi `origin/main`, bez rozjazdu | `git branch -vv` |
| Drzewo robocze | czyste w plikach śledzonych; 5 plików nieśledzonych (`_to_delete/`, prompt audytu, 3 diffy w `docs/sesje/`) | `git status --porcelain` |
| Druga gałąź | `feat/depricing-lejek-oferta` @ `8e57229` — nie dotykamy | `git branch -vv` |
| Produkcja = `main`? | **do potwierdzenia na live** (§2.6). `main` == `origin/main`, więc deploy Vercela powinien odpowiadać HEAD; weryfikacja przez porównanie zdania z kodu ze zdaniem na stronie | — |

### 1.2 Uwaga interpretacyjna do okna czasowego

Repo zmieniało się **dziś**: `services.tsx` ma mtime 04.08 13:07, `portfolio.ts` 12:58, `galeria.ts` 12:40,
`blog.ts` 13:09. Ostatni commit jest z 15:11. Oznacza to, że część treści jest młodsza niż wszystkie
cztery raporty odniesienia i **nie była nigdy czytana przez żaden audyt**. To najgorętszy obszar
ryzyka, nie ten, który raporty już przeorały.

Drugie: **produkcja mogła jeszcze nie zobaczyć HEAD-a.** Jeśli live pokazuje stan sprzed dzisiejszych
commitów, wszystkie findingi „na stronie tego nie widać" są fałszywe. Rozstrzyga porównanie
konkretnego zdania, nie wrażenie.

### 1.3 Ground truth spoza audytowanego systemu

- **`docs/zasady-tekstow.md`** (mtime 03.08) — jedyne źródło zasad redakcyjnych. Nie moje wyczucie stylu.
- **GSC i wyszukiwane hasła z Ads** — jedyne źródło tego, czego ludzie szukają. Bez nich oś 4 i 5
  schodzą na `N`. Ostatni znany eksport GSC kończy się **27.07** (raport 30.07 §0.5 sam zaznaczał,
  że trzeba go powtórzyć ok. 2–3.08). Każda liczba GSC użyta w tym audycie dostaje datę danych.
- **Live szabunia.pl z włączonym JS** — kod rozstrzyga spory, ale obietnica w meta kontra to, co
  użytkownik widzi, jest mierzalna tylko na wyrenderowanej stronie.
- **Profil Firmy w Google i RSA w Ads** — teksty poza repo, bez nich osie 3 i 5 są niepełne.

### 1.4 Rozjazd w samym prompcie audytu, wykryty przed pracą

Prompt mówi: *„Fotografia wnętrz, obiektów i architektury jest świadomie wyłączona od 31.07.
Nie zgłaszaj jej braku jako luki w ofercie."*

Kod mówi co innego. `src/data/services.tsx:652-660`:

```
const DRAFT_SERVICE_SLUGS = new Set<string>([
  // Pusty od 04.08.2026. Linia obiektowa („Wnętrza, obiekty i architektura")
  // była tu od 31.07.2026, wyłączona decyzją Marcina przed pierwszym deployem.
  // Włączona z powrotem na jego prośbę 04.08.2026.
]);
```

**Usługa jest dziś włączona i publiczna.** Granica z promptu dotyczyła stanu z 31.07 i wygasła.
Wobec tego linia obiektowa **wchodzi do audytu na równych prawach z pozostałymi siedmioma**,
a jej teksty są najświeższe w całym repo i nieprzejrzane przez żaden wcześniejszy raport.
Zapisuję to jako świadome rozszerzenie zakresu, nie jako złamanie granicy.

### 1.5 Granice, których nie przekraczam (z promptu, potwierdzone w `zasady-tekstow.md`)

- ⛔ Cytatów klientów (`Testimonials.tsx`, `portfolio.ts`) **nie oceniam** pod zasady redakcyjne.
- ⛔ **Nie proponuję cennika, tabeli cen ani sekcji „Cennik".** Kotwice „od X zł" zostają.
- ⛔ `blog.ts` **tylko diagnostycznie** — produktem jest lista wpisów do rundy redakcyjnej, nie redakcja.
- ⛔ Zero zmian w plikach, commitów, zmian w panelach i w Profilu Firmy.

---

## 2. Zakres jako checklisty

### §2.1 Inwentarz przed oceną (bramka: bez tego nie zaczynam oceny)

- [ ] §2.1.1 `src/data/` — 5 plików: `services.tsx` (784 l.), `faq.ts` (78), `portfolio.ts` (645), `galeria.ts` (24), `blog.ts` (1777)
- [ ] §2.1.2 `src/components/` — 48 plików `.tsx`; wskazać, które niosą copy, a które są czystą mechaniką
- [ ] §2.1.3 `src/app/` — 18 plików `.ts`/`.tsx`, w tym 9 z `metadata`/`generateMetadata`
- [ ] §2.1.4 `public/` — `llms.txt`, `robots.txt`, `manifest.json`
- [ ] §2.1.5 Policzyć **X z Y** dla każdej osi osobno i wpisać do raportu §9

### §2.2 Oś 1 — ZGODNOŚĆ Z ZASADAMI (`docs/zasady-tekstow.md`)

- [ ] §2.2.1 Test nadrzędny: czy Marcin powiedziałby to przez telefon
- [ ] §2.2.2 Czarna lista fraz, w tym „profesjonalny" jako jedyne określenie (dopisek 30.07)
- [ ] §2.2.3 Czarna lista konstrukcji: triady, „X, które Y" seriami, akapity-lustrzanki, wykrzykniki, emoji
- [ ] §2.2.4 **Długie myślniki (—)** w tekstach **widocznych dla użytkownika**. Komentarze w kodzie i stringi techniczne **nie liczą się** — 170 surowych trafień grepa to w większości kod
- [ ] §2.2.5 Title Case tam, gdzie powinno być zdaniowe
- [ ] §2.2.6 Miasto doklejone przecinkiem w nagłówkach (poza RSA, gdzie jest poprawne)
- [ ] §2.2.7 Słowa urzędowe („na piśmie" i pokrewne, dopisek 03.08)
- [ ] §2.2.8 Liczba pojedyncza, solo creator: **forma „Wy" jest naruszeniem kanonu tonu**
- [ ] §2.2.9 Nazwy usług: czy ktokolwiek tak szuka (styk z osią 4)

### §2.3 Oś 2 — POLSZCZYZNA (wymagane wyczerpanie, nie próbka)

- [ ] §2.3.1 Ortografia i literówki
- [ ] §2.3.2 Interpunkcja: przecinki przed „który/że/gdy", „Co jeśli", zdania złożone
- [ ] §2.3.3 Odmiana i przypadki, zwłaszcza zapożyczenia (employer branding, social media, packshot)
- [ ] §2.3.4 Szyk i zgodność form w zdaniu
- [ ] §2.3.5 Konsekwencja 2. osoby (Ty vs Wy vs bezosobowo) w obrębie jednego pliku i między plikami
- [ ] §2.3.6 Zapis liczb i kwot: spacja tysięczna, „zł netto", półpauza vs dywiz w zakresach, jednostki
- [ ] §2.3.7 Cudzysłowy: „polskie" vs "proste" vs typograficzne
- [ ] §2.3.8 Wielkie i małe litery w nazwach własnych i terminach (Social Media, Case Study, Reels)
- [ ] §2.3.9 **Każdy finding cytuje całe zdanie z `plik:linia`**, kopiowane z pliku

### §2.4 Oś 3 — SPÓJNOŚĆ MIĘDZY PLIKAMI (wymagane wyczerpanie)

- [ ] §2.4.1 Liczby dowodu społecznego (250 000+ / 1 000+ / 100+ / 8+)
- [ ] §2.4.2 Narracja stażu (2018, „8+ lat", „ponad osiem lat")
- [ ] §2.4.3 Kotwice cenowe: `services.tsx` kontra `llms.txt`, `blog.ts`, `faq.ts`, JSON-LD `Offer`
- [ ] §2.4.4 Godziny otwarcia: JSON-LD kontra Profil Firmy kontra harmonogram Ads
- [ ] §2.4.5 NAP: telefon, e-mail, miasto, geo
- [ ] §2.4.6 Lista klientów i logotypów (9 marek) we wszystkich miejscach
- [ ] §2.4.7 Nazwy usług: karta, `title`, `h1`, okruszki, JSON-LD `name`, etykiety formularza, nawigacja
- [ ] §2.4.8 Ten sam cytat opinii w różnych plikach — **sprawdzam tylko identyczność zapisu, nie redaguję treści**
- [ ] §2.4.9 Terminy i warunki: 14/21 dni, 2/3 tury poprawek, 7 dni, ekspres, dojazd, RAW, 20 minut, 3 m²
- [ ] §2.4.10 **Obietnica w meta kontra to, co użytkownik faktycznie widzi na stronie** (pułapka z 03.08: odesłanie do nieistniejącej sekcji)
- [ ] §2.4.11 Spójność wewnątrz nowej linii obiektowej z resztą serwisu (§1.4)

### §2.5 Oś 4 — SEO TEKSTOWE (tylko warstwa tekstowa modułu C)

- [ ] §2.5.1 Unikalność `title` i `description` — zero duplikatów na wszystkich trasach
- [ ] §2.5.2 Długość `title` mierzona **w znakach**, próg 60
- [ ] §2.5.3 Długość `description` mierzona **w znakach**, próg 155
- [ ] §2.5.4 H1 na każdej trasie: jeden, niepusty, zgodny z obietnicą `title`
- [ ] §2.5.5 Hierarchia H1→H2→H3 pod kątem treści (nie techniki)
- [ ] §2.5.6 `alt` obrazów: obecność, sensowność, brak keyword stuffingu
- [ ] §2.5.7 OG: `openGraph.title`, `description`, `url` — spójne z meta
- [ ] §2.5.8 `public/llms.txt` — zgodność z serwisem, martwe odesłania
- [ ] §2.5.9 Słowa realnie wpisywane wg GSC i Ads kontra słownik na stronie
- [ ] §2.5.10 Thin content — lista, nie redakcja
- [ ] §2.5.11 Kanibalizacja: dwie trasy walczące o tę samą frazę
- [ ] §2.5.12 **Technicznego SEO nie ruszam** (robots, sitemap, canonical, indeksacja) — było 29.07 i 03.08

### §2.6 Oś 5 — SEM i dane spoza repo

- [ ] §2.6.1 Live `szabunia.pl` z włączonym JS, okno widoczne — 8 usług + home + kontakt + poradnik
- [ ] §2.6.2 Potwierdzenie, czy produkcja pokazuje HEAD (`88564ac`)
- [ ] §2.6.3 Google Ads: nagłówki, opisy, sitelinki, objaśnienia RSA
- [ ] §2.6.4 Message match: nagłówek RSA kontra H1 landing page
- [ ] §2.6.5 Zgodność obietnicy reklamy z treścią strony docelowej
- [ ] §2.6.6 Zasady z `zasady-tekstow.md` w reklamach (miasto w nagłówku RSA **jest poprawne**)
- [ ] §2.6.7 Profil Firmy w Google: opis firmy, opisy usług, spójność z serwisem
- [ ] §2.6.8 GSC: zapytania i strony, **z datą danych raportu**
- [ ] §2.6.9 Gdy panel niedostępny → `N` z podaniem, czego brakuje. Nie loguję się nigdzie

### §2.7 Ciągłość łańcucha audytów

- [ ] §2.7.1 Nie zgłaszam ponownie tego, co zamknięte w czterech raportach odniesienia
- [ ] §2.7.2 Co wróciło → **regres z datą pierwotnego zamknięcia**
- [ ] §2.7.3 `poprawki-dron-2026-08-03-NIEZASTOSOWANY.diff` — **sprawdzone przed planem: NIE jest w kodzie.**
      `services.tsx:470` ma nadal stary `subtitle`, `:474` i `:476` stare `forWhom`. To **otwarty punkt, nie nowy finding**

---

## 3. Dane do zebrania

| Źródło | Metoda | Ryzyko |
|---|---|---|
| Repo @ `88564ac` | kopia robocza w sandboxie, `grep`/`Read` | brak |
| Live szabunia.pl | Chrome z JS, okno widoczne | render client-side; **nie oceniam surowego HTML** |
| Google Ads | odczyt panelu | brak dostępu → `N` |
| GSC | odczyt panelu + **data danych** | dane bywały nieaktualne o miesiąc |
| Profil Firmy | odczyt | brak dostępu → `N` |
| 4 raporty odniesienia | przeczytane przed pracą, rejestr zamknięć gotowy | — |

---

## 4. Kolejność z uzasadnieniem

1. **Inwentarz** (§2.1) — bez X z Y każdy wniosek o pokryciu jest zmyślony.
2. **Pięć osi równolegle, każda osobnym subagentem** — pełny materiał nie mieści się w jednym oknie
   kontekstu; bez podziału ostatnie osie wychodzą płytsze. Instrukcja dla każdego: *zwróć findingi
   w formacie §5 metodyki, nie streszczaj*.
3. **Live i panele** równolegle z repo, bo oś 5 bez nich nie istnieje.
4. **Konsolidacja i deduplikacja** — sprawdzenie niezależności findingów. Trzy objawy jednej
   przyczyny to jeden finding, nie trzy (lekcja z audytu Gemini: 45/100 zamiast 87).
5. **Raport** → **briefy** → **weryfikacja subagentem**.

---

## 5. Produkt końcowy i stop-conditions

**Pliki:**
1. `docs/sesje/PLAN-AUDYT-TRESC-2026-08-04.md` (ten plik)
2. `docs/sesje/AUDYT-TRESC-2026-08-04.md` — wg §6 metodyki, obowiązkowo sekcje 2, 9, 10
3. `docs/sesje/BRIEFY-TRESC-2026-08-04.md` — P0 i P1 z mierzalnymi AC

**ID findingów:** `TRESC2608-<nr>`.

**Stop-conditions, które w trybie autonomicznym zamieniam w zapis, a nie w pytanie:**
rozbieżność w danych biznesowych (ceny, godziny, telefon, e-mail) · zmiana `metadata` w `layout.tsx`
lub JSON-LD · cokolwiek „przy okazji" · każda zmiana w panelach i w Profilu Firmy.
Wszystkie lądują w sekcji 12 raportu jako warianty A/B/C z rekomendacją.

---

## 6. Kryteria ukończenia

- [ ] Każdy finding ma dowód: `plik:linia` z cytatem kopiowanym z pliku albo zrzut z panelu z datą
- [ ] Osie 2 i 3 pokryte wyczerpująco; gdzie nie, podany **procent przejrzanego i czego brakuje**
- [ ] Każdy finding ma jedno gotowe zdanie zamienne, **nie wprowadzone do kodu**
- [ ] Sekcje 2, 9, 10 raportu wypełnione treścią, nie formalnie
- [ ] Rejestr `TRESC2608-*` zamyka raport
- [ ] Ostatni subagent zweryfikował: dowody, fałszywe pozytywy z §11 metodyki, zgodność liczb
- [ ] Zero zmian w `src/`, `public/`, panelach i Profilu Firmy

---

*Plan zapisany przed zbiorem danych. Numeracja §2.x jest kontraktem — raport cytuje ją w nagłówkach.*
