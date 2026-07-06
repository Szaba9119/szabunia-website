# Plan wdrożenia — poprawki po analizie cennika i strony głównej

Data: 2026-07-06 · Źródło: analiza „cennik / kalkulator / układ home" (sesja Cowork)
Decyzja bazowa: **cennik zostaje, kalkulator zostaje** — wdrażamy korekty układu, pomiaru i ekspozycji.

Zasady realizacji:

- Kolejność etapów = priorytet. Każdy etap to osobny brief dla Claude Code (osobny commit).
- Git wyłącznie po stronie Marcina.
- Weryfikacja w sandboxie: `npm run lint` + `npx tsc --noEmit`. `npm run build` lokalnie u Marcina (w sandboxie pada — znane ograniczenie).
- Po każdym etapie z UI: smoke-test ścieżek w Chrome (kotwice #cennik/#kontakt, scroll→klik→pozycja, dark mode, mobile).

---

## Przegląd

| Etap | Co | Pliki | Wysiłek | Decyzja Marcina? |
|---|---|---|---|---|
| 0 | Pomiar: event dla „Zapytaj o ten pakiet" + adnotacja GA4 | `Pricing.tsx` | XS | nie |
| 1 | Kolejność sekcji home: FAQ i formularz przed blogiem | `page.tsx` | XS | nie |
| 2 | Hero: drugorzędny link „Zobacz pakiety i ceny" → #cennik | `Hero.tsx` | XS | nie |
| 3 | Ekspozycja kalkulatora (Ads sitelinki; opcja: live-cena) | panel Ads / `PricingCalculator.tsx` | S | 3.2: tak |
| 4 | Odchudzenie home (FAQ „Pokaż więcej"; kalkulator→teaser) | `FAQ.tsx` / `Pricing.tsx` | S | tak — wstrzymane |
| B | Tor pozakodowy: indeksacja, wizytówka, case studies, Ads | — | ciągłe | — |

---

## Etap 0 — Pomiar (zrobić PRZED zmianami UI)

Cel: nie wdrażać zmian na ślepo; dziś kliknięcia najważniejszych przycisków cennika są niewidoczne w GA4.

**0.1 Event dla „Zapytaj o ten pakiet"** (`src/components/Pricing.tsx`)

- W `askAboutPackage()` dodać `gtagEvent("cta_click", { cta: "pakiet_ask", service: serviceSlug, package: packageLabel })` (import `gtagEvent` z `@/lib/gtag` — wzorzec jak w `PricingCalculator.tsx`).
- Uzasadnienie: `ContactClickTracker` łapie tylko `<a data-cta>`, a `AskButton` to `<button>` — 6 kluczowych CTA jest dziś nietrackowanych.
- AC: lint 0/0, tsc czysty, zero zmian wizualnych, event widoczny w GA4 DebugView po kliknięciu dowolnej karty.

**0.2 (Marcin, ręcznie)** Adnotacja w GA4 z datą startu wdrożeń + szybki test DebugView. Od tego dnia liczymy „przed/po".

Commit: `feat(analytics): track package ask clicks in pricing section`

---

## Etap 1 — Kolejność sekcji strony głównej

Cel: nie przerywać ścieżki cena → obiekcje → formularz treściami nurture.

- `src/app/page.tsx`: zmiana kolejności z `Pricing → BlogPreview → PoradnikTeaser → FAQ → CTA` na **`Pricing → FAQ → CTA → BlogPreview → PoradnikTeaser`**.
- Zachować wszystkie wrappery `<ErrorBoundary>`. Nie ruszać niczego przed Pricing (Testimonials/Publications/Process — kolejność celowa).
- AC: lint/tsc PASS; kotwice `#cennik` i `#kontakt` działają z nawigacji i z przycisków pakietów; MobileFAB znika, gdy formularz w widoku; dark mode OK; brak regresji na mobile.

Commit: `refactor(home): move FAQ and contact form above blog teasers`

---

## Etap 2 — Hero: skrót do cennika

Cel: 81% kupujących szuka ceny najpierw — dać im ścieżkę bez konkurowania z głównym CTA.

- `src/components/Hero.tsx`: obok „Zapytaj o wycenę" (w istniejącym `flex flex-wrap`) dodać link tekstowy:
  `<a href="#cennik" data-cta="cennik_home_hero">Zobacz pakiety i ceny ↓</a>`
- Styl: drugorzędny (kolor `steel`/`blue`, bez tła, bez glow) — hierarchia primary CTA nienaruszona. `data-cta` → tracking załatwia `ContactClickTracker` automatycznie.
- AC: lint/tsc PASS; brak wpływu na LCP (bez nowych obrazów/fontów); układ nie łamie się przy 360 px; event `cta_click` w DebugView.

Commit: `feat(home): secondary hero link to pricing section`

---

## Etap 3 — Ekspozycja kalkulatora

**3.1 (Marcin, panel Google Ads — bez kodu)** Sitelink „Kalkulator wyceny" (opis: „Policz koszt w 60 sekund") we wszystkich 4 grupach kampanii. Przy okazji: przegląd wykluczających słów pod kątem łowców ceny.

**3.2 (opcjonalnie, osobny brief — decyzja Marcina)** Live-cena w kroku 2 `PricingCalculator.tsx` (kwota aktualizuje się przy konfiguracji, krok 3 zostaje jako podsumowanie + e-mail capture). Robić dopiero po zamknięciu etapów 0–2 i tylko jeśli dane pokażą porzucenia między `calculator_service_selected` a `calculator_done`.

---

## Etap 4 — Odchudzenie home (WSTRZYMANE do wzrostu ruchu)

Nie wdrażać teraz — najpierw etapy 0–3 i minimum 8 tygodni danych.

- **4.1** FAQ na home: 13 pytań → 7 widocznych + przycisk „Pokaż więcej" (pozostałe nadal w DOM → JSON-LD w `page.tsx` bez zmian, bez stop-condition).
- **4.2** Osadzony kalkulator w sekcji Pricing → kafelek-teaser linkujący do `/kalkulator`. Rekomendacja: raczej NIE — most kalkulator→formularz na tej samej stronie ma wartość, a jedyna zmierzona konwersja przeszła tą ścieżką. Wraca na stół tylko, jeśli dane pokażą, że home-owy kalkulator nie jest używany.

---

## Tor B — poza kodem (równolegle; to tu jest wąskie gardło)

1. **Indeksacja**: Google Search Console — stan indeksacji podstron usług i bloga, ponowne zgłoszenie sitemap, poprawa linkowania wewnętrznego jeśli GSC pokaże sieroty.
2. **Wizytówka Google**: domknąć rozjazdy z audytu (Facebook URL, godziny otwarcia).
3. **Case studies**: pozyskać testimoniale do Box17, IDcom, Yes Butcher (woohoo i Artech już mają).
4. **Rytuał jakościowy**: każdego leada pytać „skąd Pan/Pani o mnie wie?" i „czy ceny na stronie pomogły?" — przy tym wolumenie to najcenniejsze dane, jakie istnieją.
5. **Ads**: co 2 tygodnie raport wyszukiwanych fraz; sitelinki z 3.1.

---

## Czego NIE robimy (świadomie)

- Nie usuwamy cennika ani cen z podstron/bloga/FAQ.
- Nie ruszamy JSON-LD, `metadata`, `next.config.ts` (stop-conditions).
- Nie zmieniamy kolejności Testimonials → Publications → Process → Pricing.
- Żadnych nowych zależności npm.

---

## Pomiar sukcesu (przegląd po 8–12 tygodniach od Etapu 2)

- Mikro-lejek GA4: `cta_click` (hero, pakiety) → `calculator_service_selected` → `calculator_done` → `calculator_to_form` / `generate_lead` → `contact_form_started` → `contact_submit`.
- Liczba + jakość zapytań (notatki z rytuału B.4), nie tylko surowe konwersje.
- Zastrzeżenie: rosnąca indeksacja młodej domeny sama podniesie liczby — porównywać współczynniki (np. submit/start formularza), nie wartości bezwzględne.
