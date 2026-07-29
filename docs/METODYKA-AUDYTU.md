# Metodyka audytu — szabunia.pl

Źródło prawdy o tym, **jak robi się audyt w tym projekcie**. Zbudowane na podstawie 20 dokumentów
z `docs/sesje/` (audyty własne + zweryfikowane audyty Gemini i ChatGPT z 2026-06-26).

Dokument opisuje: fazy pracy, moduły zakresu, skale ocen, format findingu, szablony PLANU,
RAPORTU i BRIEFU oraz twarde zasady chroniące przed halucynacją.

**Kiedy używać:** każdy audyt strony, UX, SEO, kampanii, treści lub spójności biznesowej.
**Kiedy NIE używać:** pojedyncze pytanie ("czy X działa?") — to nie audyt, tylko sprawdzenie.

---

## 0. Dziesięć zasad twardych

Wywiedzione z realnych porażek. Audyt Gemini z 2026-06 miał **~9% trafności** (1 użyteczny
finding na 11), ChatGPT **~30%** (4 słuszne punkty z 14 zweryfikowanych twierdzeń).
**Żaden P1/P2 z obu nie przetrwał weryfikacji** — wszystkie realne priorytety wyszły z audytu kodu.

1. **Brak dowodu = finding nie wchodzi do raportu.** Ląduje w sekcji „Hipotezy do sprawdzenia"
   (§6 raportu), z etykietą `H` i przypisanym krokiem weryfikującym.
   Dowód to: `plik.tsx:linia`, zmierzona wartość live, zrzut z panelu z datą, albo cytat z eksportu.
2. **Kod jest rozstrzygający.** Przy każdym konflikcie „render vs kod" wygrywa kod. W 100%
   historycznych sporów kod miał rację.
3. **Nigdy nie audytuj surowego HTML bez JS i CSS.** Treść client-side (kalkulator, baner cookies,
   walidacja, wyniki) wygląda wtedy jak „brak". `<br />` wygląda jak brak spacji. Brak JS dał
   4 fałszywe findingi Gemini (G1–G3, G8) i 3 ChatGPT (C2–C4); brak CSS — kolejne 3 (G4–G6).
4. **Wzorzec responsywny to nie duplikat.** `hidden md:block` + `md:hidden` daje dwa H3 w DOM —
   `display:none` usuwa wariant z drzewa dostępności. To NIE jest naruszenie WCAG.
5. **Nie cytuj z pamięci.** Każdy cytat z treści strony kopiuj z pliku. Zmyślone „500 000+ zdjęć"
   i „Czym mogę Ci pomóc Twojej firmie" to dosłowne przykłady fabrykacji z audytu ChatGPT.
6. **Best practice ≠ defekt.** „Duże hero → wysoki LCP" bez pomiaru LCP to nie finding.
   Jeśli nie zmierzyłeś — pisz „do zmierzenia", nie „problem".
7. **Opinia oznaczona jako opinia.** „Sekcja sprzętu zbyt techniczna" to sąd estetyczny,
   nie ustalenie. Wolno go zgłosić, ale z etykietą.
8. **Jedna nieweryfikowana przesłanka nie może zdominować oceny.** Gemini wystawił 45/100
   (realne 87) bo trzy findingi kaskadowały z jednego błędu. Sprawdź, czy findingi są niezależne.
9. **Audyt niczego nie zmienia.** To dokument diagnostyczny. Klauzula w nagłówku, zawsze.
10. **Jawnie wypisz, czego NIE sprawdziłeś** — i dlaczego (brak narzędzia, brak dostępu,
    pokryte innym dokumentem). Luka nienazwana wygląda jak „sprawdzone i OK".

---

## 1. Cykl audytowy — sześć faz

```
PLAN ──► ZBIÓR DANYCH ──► RAPORT ──► BRIEFY ──► WDROŻENIE ──► RE-AUDYT
 §2          §3            §5,§6      §7          §8            §9
                                                                  │
                        ◄─────────── pętla, data kontrolna ───────┘
```

Fazy są rozdzielone celowo. Najczęstszy błąd to zlanie PLANU z RAPORTEM — wtedy zakres jest
dopasowywany do tego, co akurat udało się znaleźć, i nie da się stwierdzić, co pominięto.

| Faza | Artefakt | Nazwa pliku |
|---|---|---|
| 1. Plan | zakres + checklisty + kryteria ukończenia | `PLAN-AUDYT-<TEMAT>-<RRRR-MM-DD>.md` |
| 2. Zbiór danych | eksporty, zrzuty, pomiary | (surowe, nie wersjonowane) |
| 3. Raport | findingi + priorytety + decyzje | `AUDYT-<TEMAT>-<RRRR-MM-DD>.md` |
| 4. Briefy | zadania wykonawcze | `BRIEFY-<TEMAT>-<RRRR-MM-DD>.md` |
| 5. Wdrożenie | co zrobione, co zostaje | `POPRAWKI-WDROZONE-<RRRR-MM-DD>.md` |
| 6. Re-audyt | weryfikacja tą samą metryką | `RE-AUDYT-<TEMAT>-<RRRR-MM-DD>.md` |

**Konwencja nazw jest kontraktem.** Data w nazwie zawsze, temat wielkimi literami. Pliki
w `docs/sesje/`. Metodyka (ten plik) w `docs/`.

---

## 2. Szablon PLANU audytu

Plan powstaje **przed** dotknięciem danych. Deklaruje to w drugiej linii.

```markdown
# Plan audytu <TEMAT> — <data słownie>

<1–2 linie: co audytujemy, jaki podmiot/obszar>
Dokument planistyczny — nie zawiera jeszcze danych. Wykonanie: <kiedy, przez kogo>.

## 1. Kontekst i założenia
- **Stan przedmiotu audytu** — co się ostatnio zmieniło i kiedy, co wisi otwarte
  z poprzedniego cyklu (link do pliku).
- **Okno czasowe** — dokładne daty + **uwaga interpretacyjna**: jakich wniosków te dane
  NIE uniosą (np. „89 z 90 dni to stara struktura kampanii").
- **Źródło danych** — ścieżka A (preferowana) / ścieżka B (zapasowa).
- **Punkt odniesienia** — co jest źródłem prawdy, do czego porównujemy.
- **Ground truth spoza audytowanego systemu** — niezależne źródło weryfikacji
  (np. leady liczone ze skrzynki, nie z tagów Ads). Podaj dokładne kryteria wyszukiwania.

## 2. Zakres (N modułów)
### 2.1 <Moduł>
- [ ] checkpoint
- [ ] checkpoint
### 2.2 <Moduł>
- [ ] ...

## 3. Dane do zebrania
| # | Panel / źródło | Zakres czasowy | Ścieżka |

## 4. Kolejność wykonania
1. <co> — **bo** <uzasadnienie kolejności>
2. ...
Szacunek nakładu: <ile sesji>

## 5. Produkt końcowy
Plik: `AUDYT-<TEMAT>-<data>.md`, struktura wg `docs/METODYKA-AUDYTU.md §6` (format findingu: §5).
**Stop-conditions (zawsze aktywne):** <lista zakazów — CLAUDE.md §10 + §11; git/.gitignore: §7>

## 6. Kryteria ukończenia
1. Wszystkie checklisty §2 odhaczone **albo** oznaczone „brak danych" z powodem.
2. Każdy finding ma dowód i etykietę pewności.
3. Sekcja „czego nie sprawdzono" wypełniona.
4. ...
```

**Numeracja §2.x jest kontraktem parowania.** Raport cytuje ją w nagłówkach:
`## 3. Konwersje i śledzenie (§2.4 planu)`. Dzięki temu widać, co z planu wypadło.

---

## 3. Moduły zakresu — menu do wyboru

Audyt wybiera moduły z tego menu i wkleja ich checklisty do §2 planu. Nie każdy audyt
używa wszystkich pięciu.

### Moduł A — Kod, architektura, bezpieczeństwo

**Higiena repo**
- [ ] `npm run lint` → 0/0 · `npx tsc --noEmit` (build lokalnie u Marcina — w sandboxie Bus error)
- [ ] parytet produkcja vs `main` — HEAD commit, czystość drzewa (**historycznie realny finding P2**)
- [ ] martwe komponenty (0 importów), martwy kod env
- [ ] brak `console.log` / `TODO` w `src/`, brak `any` bez uzasadnienia
- [ ] pliki-śmieci (`.DS_Store`, nieużywane assety)
- [ ] dryf dokumentacji: `CLAUDE.md` / `.env.local.example` vs stan faktyczny

**Struktura React/Next**
- [ ] komponenty serwerowe domyślnie, `"use client"` punktowo
- [ ] `ErrorBoundary` na sekcjach `page.tsx` (CLAUDE.md §11.10)
- [ ] alias `@/` w importach cross-folder

**Formularze i API**
- [ ] walidacja klient + serwer
- [ ] **limity długości pól** (brak = spam-relay; norma: name 200, email 320, message 5000, utm 200)
- [ ] walidacja `service` względem znanych slugów
- [ ] honeypot obecny jako realne ukryte pole
- [ ] Turnstile — czy fail-open przy braku klucza (literówka w env = zero CAPTCHA bez alarmu)
- [ ] rate-limit, escapowanie HTML w mailach, brak logowania sekretów
- [ ] dostarczalność: `CONTACT_FROM_EMAIL` na zweryfikowanej domenie vs sandbox Resend
- [ ] stany loading / success / error; webhook CRM best-effort

**Nagłówki i wydajność**
- [ ] CSP, HSTS+preload, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- [ ] `next/image` wszędzie (lightbox też), AVIF/WebP, `quality`, `minimumCacheTTL`
- [ ] responsywne `sizes`, `priority` na LCP, jawne `width/height`
- [ ] waga plików źródłowych (norma OG: 26–49 KB; >1 MB = finding), źródła ≤ ~2000 px
- [ ] fonty przez `next/font`, `display: swap`, brak `<link>` do Google Fonts
- [ ] Core Web Vitals LCP / CLS / INP — **osobno mobile i desktop, ZMIERZONE** (patrz §4, uwaga)

### Moduł B — UX / UI / konwersja

**Struktura i hierarchia**
- [ ] 1× H1 na stronie, hierarchia h1→h2→h3 bez przeskoków, semantyka `<main>/<nav>/<section>`
- [ ] jednolity rytm sekcji (`py-12 md:py-16`), spacing w paddingu nie w pustych blokach
- [ ] brak „sierot" po usuniętych sekcjach: pustych odstępów, martwych kotwic
- [ ] każde `href="#x"` ma cel na swojej stronie; scrollspy zgodny z listą sekcji
- [ ] okruszki widoczne = `BreadcrumbList` w JSON-LD (nie `/#uslugi` vs `/uslugi`)
- [ ] **długość strony**: `scrollHeight` per szerokość (390 / 606 / desktop), przeliczone na ekrany,
      rozbicie px per sekcja. Próg alarmowy: **>15 ekranów desktop, >20 mobile** (28 mobile = za dużo)

**CTA i lejek**
- [ ] jedno CTA w hero, bez linków drugorzędnych
- [ ] **spójna etykieta głównego CTA na wszystkich powierzchniach** (Hero / Nav / FAB / podstrony / stopka)
- [ ] jedna ścieżka CTA — nie rozszczepiać na `#kontakt` i `/kontakt`
- [ ] sticky CTA mobile na wszystkich stronach lejka, nigdy z martwym linkiem
- [ ] FAB nie nakłada się na formularz ani baner cookies
- [ ] „zapytaj o ten pakiet" prefilluje formularz + dowozi do kotwicy
      *(checkpoint warunkowy — kalkulator i `Pricing.tsx` usunięte w lipcu 2026; sprawdzać, jeśli wrócą)*
- [ ] strona 404 (`not-found.tsx`) — linki prowadzą do żywych tras (`/uslugi`, `/portfolio`, `/kontakt`)
- [ ] telefon dostępny bez scrolla (numer tekstem w nav `lg:`, pozycja w menu mobilnym)
- [ ] dowód społeczny: marki, statystyki, opinie z nazwiskiem i stanowiskiem
- [ ] case studies kompletne (Klient / Wyzwanie / Efekty), najmocniejsze widoczne w indeksie

**Dostępność (WCAG 2.1 AA)**
- [ ] **kontrast 4.5:1 zmierzony na renderze**, nie zgadywany. Zasada: `steel-light` tylko na ciemnym tle
- [ ] skip-link, widoczny `:focus-visible`, pełna nawigacja klawiaturą
- [ ] focus trap + Escape w menu mobilnym + powrót fokusu do hamburgera
- [ ] `aria-invalid` / `aria-describedby` / `role="alert"` / `role="status"` / `aria-live`
- [ ] `<label htmlFor>` powiązane z `id` (brak = czytnik mówi „edit text")
- [ ] alt na wszystkich obrazach (policz: X/X)
- [ ] `prefers-reduced-motion` w CSS + Parallax + CountUp + `MotionConfig reducedMotion="user"`
- [ ] **tap-targety ≥44 px** (WCAG 2.5.5) — zmierzone
- [ ] `lang="pl"`

**Mobile i dark mode**
- [ ] brak poziomego scrolla, marquee przycięty
- [ ] równe wysokości kart (`flex flex-col h-full` + `flex-grow` + `mt-auto`)
- [ ] brak kafla-sieroty w gridzie
- [ ] dark mode sprawdzony na **każdej** odwiedzonej stronie (hero, cennik, formularz)
- [ ] brak „pustych przelotów" przy skoku kotwicą (sekcje `whileInView` niewyanimowane)
- [ ] konsola bez błędów na całej ścieżce

### Moduł C — SEO

**On-page**
- [ ] unikalne `title` (**≤60 znaków — mierz**) i `description` na każdej podstronie
- [ ] `generateMetadata` na trasach dynamicznych
- [ ] `canonical` + `metadataBase`, spójność www / non-www
- [ ] `robots.txt` — co blokuje. **`Disallow: /_next/` odcina wszystkie obrazy** (realny finding P1)
- [ ] `sitemap.xml` — kompletność, `lastModified`, wykluczenie draftów, spójność hosta
- [ ] `llms.txt` zgodny z kanonem oferty; `/feed.xml`
- [ ] `noindex` na draftach + czy drafty dostępne z linku
- [ ] redirecty 301 (stara domena!), host-based redirecty
- [ ] obrazy OG per-podstrona, `twitter:card` i `twitter:title` per-podstrona (nie generyczne)
- [ ] `meta keywords` — ignorowane przez Google, identyczne na wszystkich stronach = do usunięcia
- [ ] `manifest.json` i ikony PWA
- [ ] linkowanie wewnętrzne blog ↔ usługi ↔ kontakt
- [ ] treść renderowana w SSR (CountUp jako „0+" dla crawlera)
- [ ] thin content, osierocone foldery, placeholdery

**Dane strukturalne (JSON-LD)**
- [ ] obecne typy: `ProfessionalService`, `Person`, `WebSite`, `FAQPage`, `ContactPage`,
      `BreadcrumbList`, `Service`, `Offer`, `OfferCatalog`, `BlogPosting`, `ImageGallery`, `ItemList`
- [ ] **`aggregateRating` / `review[]` na własnej stronie = ryzyko wg wytycznych Google** — usunąć
- [ ] `FAQPage` 1:1 z widocznym FAQ
- [ ] `priceRange`, `geo`, `openingHours` spójne z GBP i rzeczywistością
- [ ] `sameAs` kompletne
- [ ] weryfikacja w Rich Results Test

**Off-page / GSC**
- [ ] indeksacja: zindeksowane / niezindeksowane + powody (**sprawdź datę danych raportu GSC** —
      historycznie raport był nieaktualny o miesiąc i unieważnił cały plan działań)
- [ ] Skuteczność: kliknięcia, wyświetlenia, CTR, średnia pozycja — z porównaniem do poprzedniego okna
- [ ] top zapytania z podziałem wyświetlenia / kliknięcia
- [ ] backlinki i linki wewnętrzne
- [ ] weryfikacja domeny w GSC i Bing, sitemapa zgłoszona, zmiana adresu zgłoszona
- [ ] SERP na żywo — czy domena w ogóle się pojawia na frazę

### Moduł D — Kanały płatne i pomiar

**Pomiar (sprawdzać PIERWSZE — bez niego reszta jest ślepa)**
- [ ] obecne narzędzia: GA4, GTM, Ads conversion tag, Vercel Analytics/Speed Insights
- [ ] lista zdarzeń per krok lejka: `form_start`, `contact_form_started`, `contact_submit`,
      `form_submit`, `lead`, `phone_click`, `email_click`
- [ ] parametr `location` przy `phone_click` / `email_click`
- [ ] brakujące zdarzenia o najwyższej wartości diagnostycznej: `faq_open`, `portfolio_click`
- [ ] Consent Mode v2, gating skryptów pod zgodę, niedomierzenie przez baner
- [ ] **cele konwersji faktycznie podpięte do kampanii** (status „Kampanie 0 z 1" = martwy cel)
- [ ] duble, relikty UA, błędne mapowania, model atrybucji, okna konwersji
- [ ] test end-to-end: formularz → GA4 DebugView → Ads

**Google Ads**
- [ ] koszt, % wykorzystania budżetu, kliknięcia, wyświetlenia, CTR, śr. CPC, konwersje, koszt/konw.
- [ ] strategia stawek + obecność/brak limitu maks. CPC + skutek limitu
- [ ] utracony udział (budżet vs ranking), sieci (Display/partnerzy wyłączone?), lokalizacja, urządzenia
- [ ] wynik optymalizacji — **metryka Google, nie utożsamiać z jakością**
- [ ] grupy: koszt per grupa + udział % + zgodność z usługami na stronie
- [ ] słowa: liczba, typy dopasowania, Quality Score z komponentami, statusy diagnostyczne
- [ ] **wyszukiwane hasła: każdy kandydat do wykluczenia z KWOTĄ za 90 dni**, suma wycieku i jej % budżetu
- [ ] reklamy: liczba RSA, Ad Strength, pinning, CTR per grupa, **zgodność treści reklamy z cennikiem live**
- [ ] komponenty: sitelinki (liczba, status, CTR i koszt per sitelink), objaśnienia, wywołania
- [ ] landing pages: koszt per URL, message match (nagłówek reklamy vs H1), HTTP 200, redirecty
- [ ] progi decyzyjne: ~30 konwersji przed przejściem na smart bidding

**GA4 i GBP**
- [ ] aktywni / nowi użytkownicy, czas zaangażowania, źródła sesji, kanały pozyskania
- [ ] top strony wejścia, miasta
- [ ] GBP: liczba i średnia ocen, adres witryny, profile, świeżość wpisów, kategoria/opis/obszar
- [ ] **NAP spójny: strona ↔ GBP ↔ JSON-LD ↔ katalogi** (nazwa, telefon, email, godziny)

### Moduł E — Treść i spójność biznesowa

- [ ] **ceny spójne** we wszystkich miejscach, gdzie występują: `data/services.tsx`, `llms.txt`,
      blog, drafty portfolio, treść reklam. Jedno źródło prawdy = strona (pliki cennikowe
      w `docs/` bywają przestarzałe)
- [ ] *(warunkowo, jeśli wrócą)* `Pricing.tsx` / kalkulator: matematyka zgodna z cennikiem,
      clampowanie inputów, progi minimalne
- [ ] liczby dowodu społecznego spójne („100+" vs „200+ firm")
- [ ] warunki spójne (tury poprawek, express, co w cenie pakietu)
- [ ] narracja stażu spójna („sześć lat" vs „8+ lat")
- [ ] **twierdzenia liczbowe mają źródło** („14x więcej wyświetleń" bez źródła = finding)
- [ ] ten sam cytat opinii identyczny we wszystkich plikach
- [ ] lista klientów spójna: logo bar ↔ JSON-LD ↔ „O mnie"
- [ ] brak śladów starych cen po aktualizacji cennika
- [ ] mikrokopia: po ludzku, 2. osoba, bez korpo-żargonu (brief / lead / konwersja)
- [ ] meta-obietnica zgodna z UI („precyzyjna wycena" vs „szacunkowa")
- [ ] gramatyka i spójność liczb w mikrokopii
- [ ] **prawne**: polityka kompletna z datą, podstawa transferu do USA (SCC/DPF) dla Resend i Vercel,
      baner z równorzędnym „Odrzuć", trwały link „Ustawienia cookies", osobna zgoda marketingowa
      przy lead magnecie

**Rynek i konkurencja** *(gdy audyt dotyczy oferty, cennika lub pozycjonowania)*
- [ ] przegląd N konkurentów **sprawdzonych bezpośrednio** (nie z pamięci) — tabela z URL i datą
- [ ] czy konkurenci pokazują ceny, w jakiej formie („od X", widełki, pakiety, brak)
- [ ] pozycjonowanie i język oferty vs nasze
- [ ] literatura / benchmarki branżowe — **osobna klasa dowodu**, z pełnymi URL
- [ ] **nie mieszaj trzech klas dowodu**: stan faktyczny w kodzie / konkurencja / literatura.
      Osobne sekcje, dopiero potem diagnoza
- [ ] przy niskim wolumenie danych: uzasadnij dobór metody (klasyczny A/B nie osiągnie
      istotności → triangulacja jakościowa)

---

## 4. Skale — trzy niezależne osie + pewność

Nie mieszaj osi. Finding może być P1 / S / 🤖 / Z jednocześnie.

### Priorytet (ważność)

| Tag | Definicja |
|---|---|
| **P0** | krytyczny — utrata leadów, pomiar nie działa, blokuje ocenę reszty |
| **P1** | wysoki — realny wyciek budżetu, blokada indeksacji, błąd blokujący konwersję |
| **P2** | istotny — do naprawy w tym cyklu, ale nie krwawi |
| **P3** | ulepszenie / higiena |
| **P4** | kosmetyka |

Dopuszczalna warunkowość: `P2 (P1 jeśli env nieustawione)`. Zapisuj ją wprost.

### Pewność (obowiązkowa przy każdym findingu)

| Tag | Znaczenie |
|---|---|
| **Z** | zweryfikowane — z dopiskiem czym: `Z (kod)`, `Z (live)`, `Z (live + kod)`, `Z (live vs git)`, `Z (panel, data)` |
| **N** | niezweryfikowane — wymaga narzędzia lub dostępu. **Podaj jakiego** |
| **H** | hipoteza — z przypisanym krokiem weryfikującym. Nigdy bez niego |
| **O** | opinia / sąd estetyczny — jawnie oznaczona |

**Uwaga o CWV:** w pięciu kolejnych audytach Lighthouse/PSI **nigdy nie zostało faktycznie
uruchomione**. Jeśli nie zmierzyłeś — wpis brzmi „LCP mobile: **N**, wymaga PSI", nie „LCP wysoki".

### Wysiłek

`S` (≤1h) · `M` (pół dnia) · `L` (1+ dzień)

### Owner

`🧑 Marcin` — decyzje biznesowe, konta zewnętrzne, git, treść, ceny
`🌐 Orchestrator` — panele GSC/GBP/Ads/GA4 na żywo, za zgodą
`🤖 Claude Code` — repo, kod

### Znaczniki statusu w tekście

`✅` zrobione / potwierdzone OK · `❌` do naprawy · `➖` bez zmian · `⚠️` regres ·
`⏭️` pominięte świadomie z powodem · `~~przekreślenie~~` pozycja nieaktualna
(**nie usuwaj — przekreśl i zostaw jako historię**)

---

## 5. Format findingu

Każdy finding realizuje ten sam łańcuch: **problem → dowód → mechanizm → skutek biznesowy →
poprawka**. Wybierz jeden z trzech wariantów zapisu i trzymaj się go w całym dokumencie.

### Wariant 1 — blok numerowany (domyślny, najzwięźlejszy)

```markdown
**7. [SEO] robots.txt blokuje `/_next/`** — `public/robots.txt`, potwierdzone live. · P1 · S · 🤖 · Z (live + kod)
`Disallow: /_next/` odcina Googlebota od `/_next/image`, przez który serwowane są WSZYSTKIE
obrazy w treści. Dla fotografa = praktyczne wykluczenie zdjęć z Google Images.
Poprawka: usunąć linię `Disallow: /_next/`, zostawić `Disallow: /api/`.
```

Tagi domenowe w tytule: `[SEO]` `[TECH]` `[UX]` `[TREŚĆ]` `[POMIAR]` `[BIZNES]` `[PRAWO]`.
Finding dotykający stop-condition dostaje w nagłówku:
`[DECYZJA MARCINA — stop-condition CLAUDE.md §10.3]`.

### Wariant 2 — wiersz tabeli (gdy findingów >15)

`Podstrona / sekcja | Uwaga (FAKT, nie ocena) | Ważność | Rekomendacja | Pewność`

Kolumna „Uwaga" zawsze rozdziela **co jest na żywo** od **co jest w kodzie**.

### Wariant 3 — sekcja per problem (gdy problem jest złożony)

```markdown
## 3. <Nazwa problemu> (P0)
<tabela z dowodem / liczbami>
**Mechanizm:** dlaczego tak się dzieje.
**Rekomendacja:** dokładna ścieżka kliknięć lub zmiana w pliku.
**Trade-off:** jawnie nazwany koszt decyzji.
```

### Wariant „decyzja" — gdy finding dotyka stop-condition

Nie kończy się rekomendacją, tylko listą opcji. Każda z kosztem, ryzykiem i informacją
o odwracalności:

```markdown
- **A. <opcja>** — <zysk>, <koszt>. Odwracalne.
- **B. <opcja>** — <zysk>, <ryzyko>. Nieodwracalne bez X.
- **C. Nie robić nic** — <konsekwencja>.

Rekomendacja: **A** (nie B, bo <powód>).
Kryterium sukcesu: <metryka> po <termin>.
```

Opcja „nie robić nic" powinna być zawsze na liście.

---

## 6. Szablon RAPORTU audytu

```markdown
# Audyt <TEMAT> — <data>

**Zakres:** <co objęte>
**Okno czasowe:** <daty>
**Metoda:** <jak zbierane dane — konkretnie: „live w Chrome + kod na HEAD 44e9c6c, drzewo czyste">
**Wykluczone:** <co świadomie pominięte i gdzie jest pokryte>
**Plan źródłowy:** `PLAN-AUDYT-<TEMAT>-<data>.md`
> Dokument diagnostyczny. Żadne zmiany nie zostały wykonane.

## 0. TL;DR
Jeden akapit z twardymi liczbami. Potem tabela:

| Obszar | Stan | Zmiana vs poprzedni audyt |

**Wniosek nadrzędny:** <jedno zdanie, warunkowe i sekwencyjne — „X nie ma sensu, dopóki nie Y">
**Jedna decyzja do podjęcia teraz:** <...>

## 1. Ocena ogólna (opcjonalnie, przy pełnym audycie)
### <X> / 100
Uzasadnienie: <akapit>

| Obszar | Ocena | Komentarz |
| Konwersja / lejek | | |
| SEO | | |
| Wydajność | | |
| UX | | |
| Dostępność (WCAG 2.1 AA) | | |
| Treść / copy | | |
| Prawne / RODO | | |

## 2. Sprawdzone i OK (zweryfikowane)
Jawna lista czystych checkpointów — dokumentuje pokrycie i chroni przed ponownym badaniem.

## 3. Ustalenia — P0
## 4. Ustalenia — P1
## 5. Ustalenia — P2 / P3 / P4
(każda sekcja z odwołaniem do numeracji planu, np. `(§2.4 planu)`)

## 6. Hipotezy do sprawdzenia (H)
Rzeczy, które wyglądają na problem, ale nie mają dowodu. **Nie są findingami.**
Każda z przypisanym krokiem weryfikującym i narzędziem.

## 7. Obserwacje bez akcji
Rzeczy zauważone, świadomie nietykane, z powodem.

## 8. Świadomie NIE ruszamy
Lista z uzasadnieniem — chroni przed „przy okazji".

## 9. Czego NIE sprawdzono (i co jest potrzebne)
| Obszar | Powód | Czego potrzeba |

## 10. Pozorne problemy skorygowane w trakcie audytu
Własne fałszywe pozytywy + wniosek metodyczny. **Ta sekcja buduje wiarygodność raportu.**

## 11. Plan działania
### Kolejność wdrożenia (nie ważność!)
1. **(P0)** <czasownik rozkazujący>: <co> → <gdzie> → <oczekiwany efekt>
### Szybkie wygrane (<1h) vs większe projekty
### Data kontrolna
Re-audyt <data> — sprawdzić dokładnie: <lista metryk>

## 12. Decyzje potrzebne od Marcina (stop-conditions)
Pytania zamknięte lub wybór opcji. Numerowane.

---
*Audyt wykonał: <kto>, <data>. Dane: <źródła, zakres dat>. Nie wprowadza zmian.*
```

---

## 7. Szablon BRIEFU wykonawczego

Nagłówek dokumentu z briefami — raz, globalnie:

```markdown
# Briefy — <TEMAT> <data>
Stan wyjściowy: produkcja <URL>, commit `<hash>`.
Ten plik = kompletna lista tego, co ZOSTAŁO.

## Co już wdrożone (NIE dublować)
| Fala | Zakres | Commit |

DoD wg `CLAUDE.md §6`, rozszerzone o tsc i smoke ścieżek:
1. `npm run lint` → 0 błędów, 0 ostrzeżeń
2. `npx tsc --noEmit` (w sandboxie `next build` pada z Bus error — binarki macOS)
3. `npm run build` lokalnie u Marcina → sukces
4. dev bez błędów w konsoli na `/`, `/portfolio`, `/uslugi`, `/blog`
5. **dark mode toggle działa na każdej odwiedzonej stronie**
6. smoke-test **ścieżek**, nie stron — przeklikanie: scroll → klik → pozycja, kotwice, motyw
Git wyłącznie Marcin. Żadnych nowych paczek. Nie ruszać treści ani cen.
```

Pojedynczy brief:

```markdown
## BRIEF <ID> · <Nazwa> — <zysk w konkretnej jednostce>
**Status:** <do wykonania / ZACZĄĆ OD POMIARU / WYCOFANE <data> — powód>
**Kontekst:** <z liczbami: „sekcja = 3 725 px ≈ 5,3 ekranu">
**Warianty:** A / B / C — każdy z szacowanym zyskiem i **jawnym ryzykiem**
**Pliki:** <ścieżki + zakres zmian>
**AC:** mierzalne („desktop bez JAKIEJKOLWIEK zmiany wizualnej", „LCP mobile <2,5 s w PSI")
**Stop:** warunek przerwania specyficzny dla tego briefu
**ZGODA:** TAK — <zakres> jest autoryzowane tym briefem / NIE — czeka na decyzję
```

Trzy sekcje zamykające plik z briefami:

- **Wymagają zgody Marcina zanim agent dotknie** — ze wskazaniem paragrafu `CLAUDE.md §10`
- **Poza kodem (Marcin ręcznie — agentowi nie zlecać)** — rozdział odpowiedzialności
- **Czego NIE robić (zamknięte decyzje)** — pamięć antyregresyjna. Chroni przed ponownym
  proponowaniem rzeczy już odrzuconych

---

## 8. Szablon raportu WDROŻENIA

```markdown
# Poprawki wdrożone — <data>
**Status:** <jawnie: „zmiany w drzewie roboczym, niezacommitowane, NIE wdrożone na produkcję">
**Diff:** <X plików, +Y/−Z> · lint: PASS · tsc: PASS

## A. Co zrobione
Pogrupowane **po celu biznesowym** (Konwersja / RODO / Cennik / Portfolio), nie po plikach.
Każdy punkt z plikami i **instrukcją odwrócenia** („aby przywrócić: usuń slug z `DRAFT_SLUGS`").

## B. Już było w kodzie (wdroży się z deployem)
## C. Co zostaje po stronie Marcina
## D. Świadomie odłożone (do decyzji) — z uzasadnieniem
## E. Jak zweryfikować i wdrożyć — gotowe komendy
```

---

## 9. Re-audyt i rejestr findingów

**Re-audyt weryfikuje tą samą metryką, którą zmierzono przy findingu.** Przykład działającej
pętli: `scrollHeight @606px` mierzone w trzech kolejnych audytach — 21 267 → 16 274 → 13 184 px
(−23%, potem −19%). Uwaga: ten sam stan bywał mierzony dwa razy z drobnym rozjazdem
(21 413 / 16 485 w briefach). **Trzymaj jedną serię pomiarową i podaj, skąd pochodzi.**

Re-audyt zawiera zawsze:
- **§0. Co się zmieniło (zweryfikowane)** — punkt wyjścia
- pomiar przed/po tą samą metodą
- **okno obserwacji** przy zmianach traktowanych jako eksperyment („3–4 tyg., do ~połowy sierpnia")
  z listą metryk i sformułowaną hipotezą
- **„Kontekst strategiczny (bez relitygacji decyzji)"** — oddziel ocenę decyzji od jej egzekucji
- domknięcie punktów otwartych z poprzedniego audytu: `zamknięty / bez zmian / regres`
- **„Co zadziałało"** — pętla zwrotna potwierdzająca skutki poprzednich działań

### Rejestr findingów — jedyna rzecz, której brakowało poprzednim cyklom

Historyczna słabość: ID findingu nie przechodziło między dokumentami (`G1`/`C5` żyły tylko
w weryfikacji, `P2-A` tylko w audycie UX, `AUD-1..5` tylko w briefach). Nie dało się odpowiedzieć
na pytanie „czy finding #12 z czerwca jest już zamknięty?".

**Reguła:** ID nadawane raz, w raporcie, w formacie `<TEMAT><RRMM>-<nr>` (np. `SEO2607-03`).
To samo ID przechodzi do briefu, wdrożenia i re-audytu. Na końcu każdego raportu tabela:

| ID | Finding | P | Owner | Status | Dokument |
|---|---|---|---|---|---|
| SEO2607-03 | robots.txt blokuje /_next/ | P1 | 🤖 | wdrożony ✅ | BRIEFY-...md |

Statusy: `otwarty` → `w briefie` → `wdrożony` → `zweryfikowany` → (lub `wycofany` / `odrzucony`).
Status `wdrożony ale niezdeployowany` jest osobny i **musi być widoczny** — historycznie dało się
go wykryć tylko przez przeczytanie kolejnego audytu.

---

## 10. Definition of Done audytu

Audyt jest skończony, gdy:

1. Wszystkie checklisty §2 planu odhaczone **albo** oznaczone „brak danych" z powodem.
2. Każdy finding ma: dowód (`plik:linia` / pomiar / zrzut z datą), priorytet, pewność, ownera.
3. Zero findingów z pewnością `Z`, których nie potwierdzono w kodzie po stwierdzeniu z renderu.
4. Sekcja „Sprawdzone i OK" wypełniona — pokrycie udokumentowane.
5. Sekcja „Hipotezy do sprawdzenia" wypełniona albo jawnie pusta — nic bez dowodu nie stoi
   w sekcjach ustaleń.
6. Sekcja „Czego nie sprawdzono" wypełniona z listą brakujących narzędzi/dostępów.
7. Sekcja „Pozorne problemy skorygowane" wypełniona albo jawnie pusta.
8. Plan działania posortowany **kolejnością wdrożenia**, z ownerami i szacunkiem wysiłku.
9. Data kontrolna re-audytu ustalona, z listą metryk do sprawdzenia.
10. Decyzje dla Marcina wypisane jako pytania zamknięte lub warianty A/B/C z rekomendacją.
11. Rejestr findingów z ID i statusami na końcu dokumentu.
12. Stopka: kto, kiedy, z jakich danych, klauzula „nie wprowadza zmian".

---

## 11. Anty-wzorce — czego nie robić

| Anty-wzorzec | Co się stało historycznie |
|---|---|
| Audyt z surowego HTML bez JS | 6 fałszywych findingów: „brak kalkulatora", „brak banera cookies", „brak walidacji" |
| Audyt bez CSS | 3 fałszywe „literówki" P1/P2 — to były `<br />` |
| Cytowanie treści z pamięci | Zmyślone „500 000+ zdjęć" i sfabrykowany cytat nagłówka |
| Best practice zgłoszony jako defekt | „Wysoki LCP" bez ani jednego pomiaru |
| Duplikat DOM = naruszenie WCAG | `hidden md:block` mylone z błędem dostępności |
| Ocena liczbowa z kaskady jednego błędu | 45/100 przy realnym 87/100 |
| Opinia podana jako ustalenie | „Sekcja sprzętu zbyt techniczna" jako finding P4 |
| Zlanie planu z raportem | Zakres dopasowany do znalezisk, nie da się wykryć pominięć |
| Pomiar w zminimalizowanym oknie | `visibilityState: hidden` wstrzymuje render → fałszywe „martwe kotwice" |
| Ufanie metrykom audytowanego systemu | „Wynik optymalizacji 97%" i nieaktualny o miesiąc raport GSC |
| Usuwanie nieaktualnych pozycji | Tracisz historię. Przekreślaj `~~tak~~` i zostawiaj |

---

## 12. Prompty uruchomieniowe dla Cowork

Skill `audyt-szabunia` odpala się na słowo „audyt", więc prompt nie musi powtarzać metodyki.
Musi dać cztery rzeczy, których agent nie zgadnie: **zakres, dane, głębokość, tryb**.

Nie trzeba pisać: „przeczytaj CLAUDE.md", „nie commituj", „podaj dowody", „użyj P0–P4" —
to jest w skillu.

### 12.1 Tryb interaktywny (jesteś przy komputerze)

```
Audyt szabunia.pl — moduły A (kod) i C (SEO).
Najpierw PLAN, pokaż zakres i czekaj na moje ok.
```

### 12.2 Tryb autonomiczny — „odchodzę od komputera"

**Reguła nadrzędna trybu autonomicznego: agent nigdy nie czeka.** Każda bramka zgody
zamienia się w zapis w dokumencie. Wątpliwość nie zatrzymuje pracy — schodzi o poziom niżej
w pewności (`Z` → `N` → `H`) i idzie dalej.

Prompt do skopiowania i uzupełnienia w nawiasach:

```
Audyt szabunia.pl — TRYB AUTONOMICZNY. Odchodzę od komputera, nie pytaj o nic.

ZAKRES: moduły [A, B, C, E] wg docs/METODYKA-AUDYTU.md §3.
OKNO: od ostatniego audytu ([data]) do dziś.
PYTANIE PRZEWODNIE: [na co audyt ma odpowiedzieć — jedno zdanie].

DANE:
- repo lokalne + git (HEAD, czy drzewo czyste, czy produkcja = main)
- live szabunia.pl przez Chrome (JS włączony, okno widoczne)
- [panele: mam zalogowane Ads / GSC / GA4 — tylko odczyt / nie mam]
- PSI i Lighthouse: [mam / nie mam] — jeśli nie, oznacz CWV jako N, nie zgaduj

AUTONOMIA:
- Nie zadawaj mi pytań. Wszystko, co wymagałoby mojej zgody, wpisz do sekcji
  „Decyzje potrzebne od Marcina" jako warianty A/B/C z rekomendacją.
- Nie zmieniaj kodu, nie commituj, nie ruszaj paneli. Audyt jest diagnostyczny.
- Jeśli dostęp nie działa albo dane są niepełne — nie czekaj i nie kombinuj obejściem.
  Oznacz `N` z podaniem, czego brakuje, i leć dalej.
- Jeśli czegoś nie potwierdzisz dowodem — sekcja „Hipotezy do sprawdzenia", nie ustalenia.

KOLEJNOŚĆ (zapisuj plik po każdej fazie, żeby przerwanie nie zniszczyło pracy):
1. PLAN-AUDYT-[TEMAT]-[data].md — zakres jako checklisty
2. zbiór danych — moduł po module, każdy osobnym subagentem
3. AUDYT-[TEMAT]-[data].md — pełny raport wg §6
4. BRIEFY-[TEMAT]-[data].md — findingi P0/P1 przełożone na zadania wykonawcze
5. rejestr findingów z ID na końcu raportu

NA KONIEC: krótkie podsumowanie w czacie — 5 zdań, najważniejszy finding,
ile P0/P1/P2, co czeka na moją decyzję. Bez powtarzania raportu.
```

### 12.3 Dlaczego subagent per moduł

Pełny audyt czterech modułów nie mieści się w jednym oknie kontekstu — checklisty i cytaty
z kodu wypychają wcześniejsze ustalenia i raport wychodzi płytszy pod koniec. Każdy moduł
osobnym subagentem, z instrukcją „zwróć findingi w formacie §5, nie streszczaj".
Orchestrator scala i pisze raport.

To także jedyny sposób na sensowny audyt bez nadzoru — subagent, który się zapętli
lub zgubi, kosztuje jeden moduł, nie całą sesję.

### 12.4 Czego tryb autonomiczny NIE zrobi

Powiedz to sobie przed odejściem od komputera, żeby nie wrócić do rozczarowania:

- **nie zaloguje się nigdzie** — panele muszą być otwarte i zalogowane w Chrome zanim wyjdziesz
- **nie uruchomi `npm run build`** — w sandboxie pada z Bus error; zostaje lint + `tsc --noEmit`
- **nie zmierzy CWV bez PSI** — jeśli narzędzie niedostępne, CWV wychodzi jako `N`
- **nie podejmie decyzji biznesowej** — ceny, oferta, budżet, treść trafiają do sekcji decyzji
- **nie wdroży poprawek** — audyt kończy się na briefach; wdrożenie to osobna sesja z Twoją zgodą
- **nie wyśle nic w Twoim imieniu** — żadnych maili, formularzy, zmian w panelach

### 12.5 Re-audyt autonomiczny

```
Re-audyt szabunia.pl — TRYB AUTONOMICZNY, nie pytaj o nic.
Punkt odniesienia: AUDYT-[data].md. Mierz tymi samymi metrykami, jedna seria pomiarowa.
Domknij każdy otwarty punkt statusem: zamknięty / bez zmian / regres.
Sekcja „co zadziałało" obowiązkowa. Na końcu 5 zdań w czacie.
```

### 12.6 Weryfikacja cudzego audytu, autonomicznie

```
Zweryfikuj audyt w [plik / wklejka] — TRYB AUTONOMICZNY.
Twierdzenie po twierdzeniu, tabela, werdykt PRAWDA / FAŁSZ / CZĘŚCIOWO.
Dowód obowiązkowy w każdym wierszu, kod rozstrzyga przy konflikcie z renderem.
Na końcu: rekalibracja oceny + „czego ten audyt NIE znalazł, a jest ważne".
```

---

*Metodyka opracowana 2026-07-27 na podstawie 20 dokumentów z `docs/sesje/`.
Zmiany w tym pliku wymagają zgody Marcina.*
