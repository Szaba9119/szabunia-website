# Briefy dla agenta (Claude Code) — pozostałe poprawki UX/UI

Stan na koniec sesji 2026-07-06 (produkcja: commit `f31839c`). Format briefów wg `CLAUDE.md §10`.
Ten plik = kompletna lista tego, co ZOSTAŁO do zrobienia. Wszystko poniżej jest opcjonalne
lub warunkowe — twardy backlog audytów jest WYCZERPANY.

## Kontekst — co już wdrożone (NIE dublować)

| Fala | Zakres | Commit |
|---|---|---|
| Etapy 0–2 | tracking pakietów, kolejność sekcji home, link do cennika w Hero | `f651151` |
| AUD-1..5 | robots /_next, limity API, llms.txt, drafty portfolio, telefon+`location`, `faq_open`, `case_*`, media (26→7 MB, OG dron JPG, lightbox next/image), JSON-LD bez review, 400 zł/h, FAQ z `src/data/faq.ts`, honeypot CTA, 404, title'e ≤60, MotionConfig, martwy kod out | `ee5fa57` |
| Meta-szlif | 7 title/description dociętych, packshot wariant A | `ee5fa57` |
| UXUI-1 | karty EVENT flex/mt-auto, pakiety full-width „Bestseller", clamp opinii, blog 1/3 mobile, usługi 16:9 mobile, kalkulator→teaser | `6523fd1` |
| UXUI-2 | pakiety mobile zwijane (widoczny Rekomendowany), Warunki akordeon mobile | `e28470f` |

Pomiary kontrolne na produkcji (szer. 606 px, viewport 701 px): 21 413 → **16 485 px** (−23%).
Sekcje po zmianach: uslugi 3725 · cennik 2379 · portfolio 1426 · kontakt 1407 · FAQ 1014 · współpraca 878 · opinie 805 · blog 793. Wszystkie 3 przełączniki mobile przetestowane na żywo (open/close OK).

## Zasady dla każdego briefu (DoD)

`npm run lint` 0/0 → `npx tsc --noEmit` czysto → build lokalnie u Marcina → po deployu smoke ścieżek (kotwice, motyw, mobile). Git wyłącznie Marcin. Żadnych nowych paczek. Nie ruszać treści/cen — tylko prezentacja.

---

## BRIEF UXUI-3 · Usługi mobile — ostatnia gruba rezerwa (~2,5 ekranu)

**Status: WYCOFANE 2026-07-06 — decyzja Marcina po obejrzeniu na żywo.** Wariant C był wdrożony i cofnięty tego samego wieczora („zgubiłeś zdjęcia"): zdjęcia usług mają być widoczne ZAWSZE, na każdej szerokości — to wizytówka fotografa. **Nie proponować ponownie chowania zdjęć usług (żaden wariant A/B/C).** Sekcja usług zostaje przy 16:9 na mobile (UXUI-1). Przy tej okazji poprawione kadrowanie kafla Pakietów: `objectPosition center 70%` (SERVICE_TILE_POS) + `md:aspect-[3/2]` zamiast paska self-stretch — natywna proporcja zdjęcia, zero przycinania na desktopie.

Kontekst: sekcja `#uslugi` to teraz największy blok na mobile — 3 725 px (~5,3 ekranu): 7 kafli, każdy z obrazem 16:9 + opis. Desktop jest OK (grid 3-kol. + Bestseller full-width) — zmiany TYLKO < md.

Warianty (jeden do wyboru):
- **A — kompakt bez zdjęć na mobile:** obrazy `hidden sm:block`; kafel = ikona + tytuł + cena (+1 linia opisu). Zysk ~2,5–3 ekr. Ryzyko: mobile traci „wizytówkę zdjęciową" (u fotografa to koszt realny).
- **B — grid 2-kolumnowy na mobile:** `grid-cols-2` od ~420 px, obrazy zostają (będą małe), opisy `hidden sm:block`. Zysk ~2 ekr. Ryzyko: ciasnota na 360 px.
- **C — 3 pierwsze kafle ze zdjęciami, 4 kolejne kompaktowe** (lista pod spodem). Zysk ~1,5 ekr. Kompromis.

Pliki: `src/components/Services.tsx` (wyłącznie klasy responsywne w map; `isPakiet` traktować osobno — jego full-width dotyczy md+). AC: desktop bez JAKIEJKOLWIEK zmiany wizualnej; lint/tsc; klik każdego kafla → poprawna podstrona. Stop: jeśli wariant wymaga zmiany danych w `services.tsx` — przerwać, to nie jest zmiana prezentacyjna.

## BRIEF PERF-1 · LCP hero — najpierw pomiar, potem ewentualny fix

**Status: ZACZĄĆ OD POMIARU. Bez pomiaru nie zmieniać niczego.**

1. Marcin (lub agent przez Chrome) uruchamia PageSpeed Insights dla `https://szabunia.pl` (mobile). Zanotować: LCP, element LCP, czy `marcin-hero-light-4.jpg` ma "lazily loaded"/"proper priority".
2. Jeśli LCP > 2,5 s i winne jest zdjęcie hero: sprawdzić w DevTools, który wariant z `srcset` pobiera się na 390/1440 (oczekiwane ~640–1080 przy `sizes="(max-width: 768px) 100vw, 40vw"`). Możliwe fixy (w kolejności): korekta `sizes` (obecne 40vw przy kontenerze ~40% z max-w-6xl bywa zawyżone na szerokich ekranach → rozważyć `(max-width: 768px) 100vw, (max-width: 1152px) 40vw, 460px`), `quality` 72→65, preload przez `priority` już jest.
3. AC: LCP mobile < 2,5 s w PSI po zmianie; zero zmiany wizualnej. Stop: jakiekolwiek zmiany w `next.config.ts` (images) wymagają zgody Marcina.

## BRIEF P3-ANIM · „Puste przeloty" przy skoku kotwicą (niski priorytet)

Kontekst: `AnimatedSection` (whileInView) animuje sekcje dopiero przy wejściu w viewport; skok Hero→#cennik na wolnym sprzęcie pokazuje niewyanimowane obszary. Propozycja: w `AnimatedSection` skrócić dystans/czas (np. y: 24→12, duration ↓) ALBO wyłączać animację, gdy nawigacja przyszła z kotwicy (flaga ustawiana w handlerze kliknięć `a[href^="#"]` + `sessionStorage`, czyszczona po scrollend). Wybrać prostsze. AC: brak regresji wizualnej przy zwykłym scrollu; lint/tsc. Priorytet: robić dopiero, gdy nic ważniejszego nie zostało.

## Wymagają ZGODY Marcina zanim agent dotknie (stop-conditions §11)

1. **CSP:** usunięcie `https://*.youtube.com` ze `script-src` (facade używa tylko `frame-src`); opcjonalnie youtube-nocookie. Plik: `next.config.ts` — ZAKAZ bez wyraźnego „tak".
2. **`.gitignore`:** dopisać `.DS_Store` (pliki usunięte 2026-07-06, Finder je odtworzy).
3. **`layout.tsx`:** martwy blok `NEXT_PUBLIC_ANALYTICS_URL` (CSP i tak zablokuje skrypt) — usunąć lub skomentować.

## Poza kodem (Marcin ręcznie — agentowi nie zlecać)

Sitelinki Ads → /kalkulator (4 grupy) · adnotacja GA4 z datą 2026-07-06 (fala zmian!) · wizualna akceptacja nowych layoutów (Bestseller full-width, teaser kalkulatora, przełączniki mobile) na własnym telefonie · przegląd mikro-lejka GA4 po 8–12 tyg. (nowe eventy: `cta_click{pakiet_ask, case_*, kalkulator_home_teaser, cennik_home_hero, tel_*}`, `faq_open`, `phone_click{location}`).

## Czego NIE robić (zamknięte decyzje z 2026-07-06)

Nie wracać do: usuwania cennika (zostaje), review/aggregateRating w JSON-LD (usunięte celowo), godziny 350 zł (ujednolicone na 400), whitelisty `service` w /api/quote (świadomie tylko limity długości), maili outreachowych po linki (Marcin odrzucił), skracania strony poniżej ~18–20 ekranów mobile kosztem dowodów (portfolio/opinie zostają).
