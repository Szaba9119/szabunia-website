# Plan audytu PEŁNY (moduły A, B, C, E) — 27 lipca 2026

Audyt strony szabunia.pl: kod i bezpieczeństwo (A), UX/UI i konwersja (B), SEO (C),
treść i spójność biznesowa (E). Moduł D (kanały płatne i pomiar) świadomie wyłączony — patrz §1.
Dokument planistyczny — nie zawiera jeszcze danych. Wykonanie: 2026-07-27, Claude (orchestrator),
**tryb autonomiczny** (Marcin poza komputerem; żadna bramka zgody nie wstrzymuje pracy).

---

## 1. Kontekst i założenia

### Stan przedmiotu audytu
- **Ostatnie audyty:** `AUDYT-2026-07-23.md` (kanały: Ads/GSC/GA4/GBP),
  `AUDYT-UX-UI-2026-07-23.md` (UX po depricingu), `RE-AUDYT-ZMIANY-STRONY-2026-07-23.md`
  (skutki usunięcia kalkulatora i cennika). Plan otwartych działań:
  `PLAN-POPRAWEK-2026-07-23.md`.
- **Co się zmieniło po tamtych audytach (git, 23–24.07):** 8 commitów, z czego
  **4 są nowsze niż audyt UX z 23.07 21:57** — czyli dotąd nieaudytowane:
  `e0cc377` (linijka o wycenie pod usługami + większe tap-targety w stopce),
  `9bd3826` (CTA „Zapytaj o ofertę" pod usługami), `f4d8dfc` (hero wyśrodkowany na mobile
  + CTA pod usługami do formularza), `c2bc003` (leading hero + „O mnie" na mobile).
  Wcześniej tego samego dnia: przejście nagłówków na Inter (`9fd7be0`), rewert kart usług
  i układ hero podstron (`5c3e583`), naprawy luki w hero podstron (`0c0865f`, `3576987`).
- **Otwarte z poprzedniego cyklu (do domknięcia statusem):** tap-targety <32 px na mobile (P2),
  weryfikacja Turnstile na formularzu (P2), niespójność godzin GBP ↔ JSON-LD (P2, decyzja Marcina),
  0 backlinków (P1, poza zakresem tego audytu — moduł D/off-page częściowo), świeżość GBP (P2).

### Okno czasowe
**2026-07-23 → 2026-07-27** (od poprzedniego audytu do dziś).

**Uwaga interpretacyjna — czego te dane NIE uniosą:**
1. Okno ma **4 dni**. Żadna metryka behawioralna (leady, konwersje, CTR, pozycje) nie zdąży
   się w nim ustabilizować. Wnioski z tego audytu są **strukturalne** (kod, treść, dostępność,
   konfiguracja), nie skutkowe.
2. Zmiany z 23–24.07 to część **eksperymentu „ceny na zapytanie"** z oknem obserwacji
   do ~połowy sierpnia (ustalonym w `RE-AUDYT-ZMIANY-STRONY-2026-07-23.md §4.2`).
   Ten audyt **nie rozstrzyga** eksperymentu i nie relitygaje decyzji o depricingu.
3. GSC pokazuje dane z opóźnieniem (historycznie raport indeksacji był nieaktualny o miesiąc) —
   każda liczba z GSC dostaje datę danych, nie datę odczytu.

### Źródło danych
- **Ścieżka A (preferowana):** repo lokalne na HEAD + live szabunia.pl w Chrome z JS,
  w widocznym oknie (`visibilityState: visible`).
- **Ścieżka B (zapasowa):** gdy live niedostępny — wyłącznie kod, finding schodzi z `Z (live + kod)`
  na `Z (kod)`.

### Punkt odniesienia
- **HEAD:** `c2bc003dcdd887afab3f0ad588f33c2a3d48aacb` („fix(mobile): luzniejszy leading hero…", 2026-07-24).
- **Czystość drzewa:** ❌ **drzewo NIE jest czyste** — 2 pliki usunięte (` D docs/sesje/AUDYT-2026-07-20.md`,
  ` D docs/sesje/PLAN-POPRAWEK-2026-07-20.md` — zmiana nazwy opisana w re-audycie) i 5 nieśledzonych
  (`docs/METODYKA-AUDYTU.md`, `docs/sesje/AUDYT-2026-07-23.md`, `AUDYT-UX-UI-2026-07-23.md`,
  `PLAN-POPRAWEK-2026-07-23.md`, `RE-AUDYT-ZMIANY-STRONY-2026-07-23.md`).
  **Wszystkie zmiany dotyczą wyłącznie `docs/` — zero zmian w `src/`.** Do potwierdzenia w module A.
- **Gałąź:** `main` == `origin/main` (bez ahead/behind). Druga gałąź `feat/depricing-lejek-oferta`
  zatrzymana na `8e57229` — do sprawdzenia, czy nie jest już martwa.
- **Parytet produkcja vs `main`** — do zweryfikowania na żywo (historycznie realny finding P2).
- **Źródło prawdy o cenach:** strona (`src/data/services.tsx`), nie pliki cennikowe w `docs/`.
- **Źródło prawdy o designie:** `src/app/globals.css` (`@theme inline`) + `DESIGN.md`.

### Ground truth spoza audytowanego systemu
- **Ceny:** kanon = `src/data/services.tsx` na HEAD. Każde wystąpienie kwoty w repo
  (`llms.txt`, blog, portfolio, JSON-LD, meta) porównywane 1:1 do tego pliku, nie do pamięci.
- **Zgodność z live:** treść cytowana z pliku, a następnie potwierdzana na renderze — przy konflikcie
  **rozstrzyga kod** (§0.2 metodyki).
- **Konkurencja (moduł E):** minimum 5 witryn sprawdzonych bezpośrednio, z URL i datą odczytu.
  Zero cytowania z pamięci.
- **CWV:** wyłącznie zmierzone (PSI / CrUX). Brak pomiaru = wpis `N`, nigdy „wysoki LCP".

### Dostępy — stan zadeklarowany w promptcie
Prompt uruchomieniowy przyszedł z nieuzupełnionymi polami `[panele]` i `[PSI]`.
W trybie autonomicznym **nie pytam** — przyjmuję:
- **Panele (Ads / GSC / GA4 / GBP):** status nieznany. Sprawdzam, czy sesja w Chrome jest
  zalogowana; **nie loguję się nigdzie**. Brak dostępu = `N` z nazwą brakującego panelu.
- **PSI / Lighthouse:** próba przez publiczne API PageSpeed Insights. Brak wyniku = **CWV oznaczone `N`**,
  bez zgadywania.

---

## 2. Zakres (4 moduły)

### 2.1 Moduł A — Kod, architektura, bezpieczeństwo

**Higiena repo**
- [ ] `npm run lint` → 0/0 · `npx tsc --noEmit` (bez `next build` — w sandboxie Bus error)
- [ ] parytet produkcja vs `main` — HEAD, czystość drzewa, czy `src/` nie ma niezacommitowanych zmian
- [ ] status gałęzi `feat/depricing-lejek-oferta` (martwa czy do domknięcia)
- [ ] martwe komponenty (0 importów) — szczególnie relikty po kalkulatorze i cenniku
- [ ] brak `console.log` / `TODO` w `src/`, brak `any` bez uzasadnienia
- [ ] pliki-śmieci (`.DS_Store`, nieużywane assety, `Strona z google ai.zip`)
- [ ] dryf dokumentacji: `CLAUDE.md` vs stan faktyczny (§9 mówi o kalkulatorze i cenniku,
      które usunięto; `.env.local.example` vs realnie używane zmienne)

**Struktura React/Next**
- [ ] komponenty serwerowe domyślnie, `"use client"` punktowo
- [ ] `ErrorBoundary` na sekcjach `page.tsx` (CLAUDE.md §11.10)
- [ ] alias `@/` w importach cross-folder

**Formularze i API** (jedyna żywa ścieżka leada — priorytet modułu)
- [ ] walidacja klient + serwer w `/api/contact` i `/api/lead`
- [ ] limity długości pól (norma: name 200, email 320, message 5000, utm 200)
- [ ] walidacja `service` względem znanych slugów
- [ ] honeypot jako realne ukryte pole
- [ ] Turnstile — czy fail-open przy braku/literówce klucza, czy jest log `[ALERT]`
      *(domknięcie punktu P2 z `AUDYT-UX-UI-2026-07-23.md`)*
- [ ] rate-limit, escapowanie HTML w mailach, brak logowania sekretów
- [ ] dostarczalność: `CONTACT_FROM_EMAIL` na zweryfikowanej domenie vs sandbox Resend
- [ ] stany loading / success / error; webhook CRM best-effort (nie blokuje odpowiedzi)

**Nagłówki i wydajność**
- [ ] CSP, HSTS+preload, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- [ ] `next/image` wszędzie (lightbox też), AVIF/WebP, `quality`, `minimumCacheTTL`
- [ ] responsywne `sizes`, `priority` na LCP, jawne `width/height`
- [ ] waga plików źródłowych (>1 MB = finding), źródła ≤ ~2000 px
- [ ] fonty przez `next/font`, `display: swap`, brak `<link>` do Google Fonts
      *(uwaga: `--font-barlow` jest celowym aliasem Intera od 23.07 — NIE zgłaszać jako błąd)*
- [ ] CWV LCP / CLS / INP — osobno mobile i desktop, **tylko jeśli zmierzone**

### 2.2 Moduł B — UX / UI / konwersja

**Struktura i hierarchia**
- [ ] 1× H1 na stronie, hierarchia h1→h2→h3 bez przeskoków, semantyka `<main>/<nav>/<section>`
- [ ] jednolity rytm sekcji (`py-12 md:py-16`), spacing w paddingu, nie w pustych blokach
- [ ] brak „sierot" po zmianach z 23–24.07 (pustych odstępów, martwych kotwic)
- [ ] każde `href="#x"` ma cel na swojej stronie; scrollspy zgodny z listą sekcji
- [ ] okruszki widoczne = `BreadcrumbList` w JSON-LD
- [ ] **długość strony**: `scrollHeight` @606 px mobile i desktop, **ta sama seria pomiarowa
      co 23.07** (baseline: 13 184 px @606 px; wcześniej 16 274 → 21 267). Rozbicie px per sekcja.

**CTA i lejek** (po zmianach z 24.07 — nowe CTA pod usługami)
- [ ] jedno CTA w hero, bez linków drugorzędnych
- [ ] **spójna etykieta głównego CTA na wszystkich powierzchniach** (Hero / Nav / FAB / podstrony /
      stopka / nowe CTA pod usługami) — czy „Zapytaj o ofertę" jest wszędzie tak samo
- [ ] jedna ścieżka CTA — brak rozszczepienia `#kontakt` vs `/kontakt`
- [ ] sticky CTA mobile na wszystkich stronach lejka, nigdy z martwym linkiem
- [ ] MobileFAB nie nakłada się na formularz ani baner cookies (regresja po zmianach hero?)
- [ ] `not-found.tsx` — linki prowadzą do żywych tras
- [ ] telefon dostępny bez scrolla
- [ ] dowód społeczny: marki, statystyki, opinie z nazwiskiem i stanowiskiem
- [ ] case studies kompletne (Klient / Wyzwanie / Efekty), najmocniejsze widoczne w indeksie

**Dostępność (WCAG 2.1 AA)**
- [ ] **kontrast 4.5:1 zmierzony na renderze** (`steel-light` tylko na ciemnym tle)
- [ ] skip-link, widoczny `:focus-visible`, pełna nawigacja klawiaturą
- [ ] focus trap + Escape w menu mobilnym + powrót fokusu do hamburgera
- [ ] `aria-invalid` / `aria-describedby` / `role="alert"` / `role="status"` / `aria-live` w formularzu
- [ ] `<label htmlFor>` powiązane z `id`
- [ ] alt na wszystkich obrazach (policz X/X; baseline 18/18 z 23.07)
- [ ] `prefers-reduced-motion` w CSS + Parallax + CountUp + `MotionConfig reducedMotion="user"`
- [ ] **tap-targety ≥44 px zmierzone** — domknięcie P2 z 23.07 (baseline: **18 linków <32 px**);
      commit `e0cc377` deklaruje „większe tap-targety w stopce" → sprawdzić, ile zostało
- [ ] `lang="pl"`

**Mobile i dark mode**
- [ ] brak poziomego scrolla, marquee przycięty
- [ ] hero po zmianach z 24.07: wyśrodkowanie, leading, brak przycięć na 390/606 px
- [ ] równe wysokości kart, brak kafla-sieroty w gridzie
- [ ] dark mode na **każdej** odwiedzonej stronie (hero, usługi, formularz, nowe CTA)
- [ ] brak „pustych przelotów" przy skoku kotwicą
- [ ] konsola bez błędów na całej ścieżce

### 2.3 Moduł C — SEO

**On-page**
- [ ] unikalne `title` (**≤60 znaków — mierzone**) i `description` na każdej podstronie
- [ ] `generateMetadata` na trasach dynamicznych
- [ ] `canonical` + `metadataBase`, spójność www / non-www
- [ ] `robots.txt` — co blokuje (historyczny finding: `Disallow: /_next/`)
- [ ] `sitemap.xml` — kompletność, `lastModified`, wykluczenie draftów, spójność hosta,
      **czy `/kalkulator` został z niej usunięty**
- [ ] `llms.txt` zgodny z kanonem oferty **po depricingu** (czy nie zostały w nim stare ceny/kalkulator)
- [ ] `noindex` na draftach + czy drafty dostępne z linku
- [ ] redirecty 301: stara domena `marcinszabunia.pl` → `szabunia.pl`, `/kalkulator` → `/kontakt`
- [ ] obrazy OG per-podstrona, `twitter:card` / `twitter:title` per-podstrona
- [ ] `meta keywords` — jeśli identyczne wszędzie, do usunięcia
- [ ] `manifest.json` i ikony PWA
- [ ] linkowanie wewnętrzne blog ↔ usługi ↔ kontakt (czy linki do `/kalkulator` wygasły)
- [ ] treść renderowana w SSR
- [ ] thin content, osierocone foldery, placeholdery

**Dane strukturalne (JSON-LD)**
- [ ] obecne typy i ich poprawność
- [ ] **`aggregateRating` / `review[]` na własnej stronie = ryzyko wg wytycznych Google**
- [ ] `FAQPage` 1:1 z widocznym FAQ (FAQ zmieniło się przy depricingu — sprawdzić parytet)
- [ ] `priceRange`, `geo`, `openingHours` spójne z GBP i rzeczywistością
      *(znany rozjazd godzin — status: otwarty, decyzja Marcina)*
- [ ] `Offer` / `OfferCatalog` — czy nie zostały ceny sprzed depricingu
- [ ] `sameAs` kompletne (LinkedIn/Facebook — otwarte z `CLAUDE.md §9`)

**Off-page / GSC** *(warunkowo — tylko jeśli panel zalogowany; inaczej `N`)*
- [ ] indeksacja + **data danych raportu**
- [ ] Skuteczność vs poprzednie okno
- [ ] backlinki (baseline: 0)
- [ ] SERP na żywo na 2–3 frazy z top zapytań

### 2.4 Moduł E — Treść i spójność biznesowa

- [ ] **ceny spójne** wszędzie: `src/data/services.tsx` ↔ `llms.txt` ↔ blog ↔ portfolio ↔ JSON-LD ↔ meta.
      Baseline z 23.07: **7/7 kart usług z „od X zł"** (1000/600/300/900/500/150/1800)
- [ ] brak śladów starych cen i kalkulatora w treści (teksty typu „policz w kalkulatorze")
- [ ] liczby dowodu społecznego spójne („100+" vs „200+ firm")
- [ ] warunki spójne (tury poprawek, express, co w cenie pakietu)
- [ ] narracja stażu spójna („sześć lat" vs „8+ lat")
- [ ] **twierdzenia liczbowe mają źródło**
- [ ] ten sam cytat opinii identyczny we wszystkich plikach
- [ ] lista klientów spójna: logo bar ↔ JSON-LD ↔ „O mnie"
- [ ] mikrokopia: po ludzku, 2. osoba, bez korpo-żargonu (brief / lead / konwersja)
      — **szczególnie nowa linijka o wycenie z `e0cc377`**
- [ ] meta-obietnica zgodna z UI („wstępna wycena w 24h" — czy wszędzie tak samo)
- [ ] gramatyka i spójność liczb w mikrokopii
- [ ] **prawne**: polityka prywatności kompletna z datą, podstawa transferu do USA (SCC/DPF)
      dla Resend i Vercel, baner z równorzędnym „Odrzuć", trwały link „Ustawienia cookies",
      zgoda przy formularzu

**Rynek i konkurencja** *(bo audyt dotyka modelu „ceny na zapytanie")*
- [ ] przegląd ≥5 konkurentów **sprawdzonych bezpośrednio** — tabela z URL i datą
- [ ] czy konkurenci pokazują ceny i w jakiej formie
- [ ] pozycjonowanie i język oferty vs nasze
- [ ] literatura / benchmarki — **osobna klasa dowodu**, z pełnymi URL
- [ ] **nie mieszać trzech klas dowodu**: kod / konkurencja / literatura

---

## 3. Dane do zebrania

| # | Panel / źródło | Zakres | Ścieżka |
|---|---|---|---|
| 1 | repo lokalne + git | HEAD `c2bc003` | bash: `lint`, `tsc --noEmit`, `grep`, `git diff` |
| 2 | live szabunia.pl | stan na 2026-07-27 | Chrome z JS, okno widoczne, desktop + @606 px + @390 px |
| 3 | `robots.txt`, `sitemap.xml`, `llms.txt` | live | fetch bezpośredni |
| 4 | PageSpeed Insights (CrUX + Lighthouse) | mobile + desktop | publiczne API; brak → CWV = `N` |
| 5 | Google Search Console | ostatnie 3 mies. | **tylko jeśli sesja zalogowana**; brak → `N` |
| 6 | SERP Google | 2–3 frazy z top zapytań GSC | wyszukiwanie live |
| 7 | witryny konkurentów | 5+ URL, data odczytu | fetch bezpośredni |

**Czego NIE zbieram:** Google Ads, GA4, GBP (moduł D — poza zakresem; ostatni odczyt 23.07).

---

## 4. Kolejność wykonania

1. **PLAN** (ten plik) — **bo** zakres musi powstać zanim zobaczę dane, inaczej dopasuje się
   do znalezisk (§11 metodyki, anty-wzorzec „zlanie planu z raportem").
2. **Moduł A (kod)** — **bo** kod jest rozstrzygający i daje bazę dowodową dla B, C i E.
3. **Moduł B (UX live)** — **bo** wymaga Chrome i pomiarów w widocznym oknie; jedyny moduł
   z wyłącznością na przeglądarkę (żeby subagenty nie biły się o karty).
4. **Moduł C (SEO)** — **bo** korzysta z ustaleń A (metadata w kodzie) i B (struktura nagłówków).
5. **Moduł E (treść i rynek)** — **bo** wymaga kanonu cen z A i tekstów potwierdzonych w B.
6. **RAPORT** → **BRIEFY** → **weryfikacja subagentem**.

Moduły 2–5 uruchamiane **równolegle, każdy osobnym subagentem** (§12.3 metodyki),
z instrukcją „zwróć findingi w formacie §5, nie streszczaj".
Szacunek nakładu: 1 sesja.

---

## 5. Produkt końcowy

- `AUDYT-PELNY-2026-07-27.md` — struktura wg `docs/METODYKA-AUDYTU.md §6`, findingi wg §5.
- `BRIEFY-PELNY-2026-07-27.md` — findingi P0/P1 jako zadania wykonawcze wg §7.
- Rejestr findingów z ID w formacie **`PELNY2607-nn`** na końcu raportu.

**Stop-conditions (zawsze aktywne, CLAUDE.md §10 + §11, git §7):**
nowa paczka npm · `next.config.ts` (CSP, headers, images, redirects) · `metadata` w `layout.tsx`
lub JSON-LD · `.env*` · `.gitignore` · refactor >3 plików spoza briefu · rozbieżność w danych
biznesowych (ceny, godziny, telefon, email) — **nie poprawiać samodzielnie** · cokolwiek „przy okazji".
**Git wyłącznie Marcin.** Audyt niczego nie zmienia — zero edycji w `src/`, w panelach i w treści.

---

## 6. Kryteria ukończenia

1. Wszystkie checklisty §2 odhaczone **albo** oznaczone „brak danych" z powodem.
2. Każdy finding ma dowód (`plik:linia` / pomiar / zrzut z datą), priorytet, pewność, ownera.
3. Zero findingów `Z` niepotwierdzonych w kodzie po stwierdzeniu z renderu.
4. Sekcje „Sprawdzone i OK", „Hipotezy (H)", „Czego NIE sprawdzono",
   „Pozorne problemy skorygowane" wypełnione albo jawnie puste.
5. Każdy otwarty punkt z 23.07 domknięty statusem: `zamknięty / bez zmian / regres`.
6. Pomiar `scrollHeight @606 px` wykonany **tą samą metodą** co 23.07, z podaniem serii.
7. CWV: albo zmierzone z podaniem narzędzia, albo `N` z nazwą brakującego dostępu.
8. Plan działania posortowany kolejnością wdrożenia, z ownerami i wysiłkiem.
9. Data kontrolna re-audytu z listą metryk.
10. Decyzje dla Marcina jako warianty A/B/C z rekomendacją, kosztem, odwracalnością
    i opcją „nie robić nic".
11. Rejestr findingów z ID i statusami.
12. Stopka z klauzulą „nie wprowadza zmian".

---

*Plan sporządzony 2026-07-27 przez Claude (orchestrator), tryb autonomiczny.
Dokument planistyczny — nie zawiera danych. Nie wprowadza zmian.*
