# Audyt UX/UI na żywo (Chrome) — 2026-07-06 (wieczór)

Badana wersja: produkcja szabunia.pl, deploy `ee5fa57` (po AUD-1..5 i poprawkach meta).
Metoda: sterowanie realnym Chrome (zrzuty sekcja po sekcji @1440 px, testy interakcji przez DOM/JS, pomiary długości), konsola JS monitorowana.
Ograniczenie sesji: w połowie audytu okno Chrome zostało zminimalizowane (visibilityState: hidden) — Chrome wstrzymuje wtedy render, scroll i animacje. Wnioski „wizualne mobile/dark" wymagają 5-minutowej dogrywki przy widocznym oknie (lista na końcu). Wcześniejsze podejrzenia „martwych anchorów" okazały się artefaktem ukrytej karty — **nawigacja kotwicowa działa poprawnie** (zweryfikowane pomiarem scrollY przy widocznym oknie: klik „Zobacz pakiety i ceny" → scrollY 7367, sekcja #cennik 100 px pod navbariem).

## Co działa dobrze (zweryfikowane)

Hero z nowym linkiem do cennika i klikalnym numerem; zdjęcie hero i wszystkie zdjęcia sekcji **bez artefaktów po dzisiejszej kompresji** (sprawdzone na retinie @1440); scroll-spy podświetla sekcje; „Zapytaj o ten pakiet" **prefilluje formularz** (wiadomość + rodzaj usługi) i dowozi do #kontakt; walidacja formularza wzorowa (3 czytelne komunikaty + `aria-invalid`, przycisk nie jest martwy); cookie banner z równorzędnym „Odrzuć"; stopka kompletna; **konsola bez błędów** na całej stronie głównej.

## Znaleziska

**[P2-A] Karty EVENT (cennik) — nierówne wysokości.** PORTRETY mają `flex flex-col h-full` → przyciski idealnie w jednej linii. Karty EVENT nie mają — po dzisiejszym dopisaniu „Dodatkowa godzina: 400 zł" stopki i przyciski są na trzech różnych wysokościach (STANDARD najkrótsza, PREMIUM najdłuższa). Fix: `flex flex-col h-full` + `flex-grow` na liście, stopka `mt-auto` — jak w kartach portretowych. Plik: `src/components/Pricing.tsx` (3 karty EVENT).

**[P2-B] Siódmy kafelek usług — „sierota".** Grid usług to 3 kolumny × 7 pozycji: „Pakiety Foto + Wideo + Dron" (bestseller!) stoi samotnie w ostatnim rzędzie obok 2/3 pustej przestrzeni. To samo w kalkulatorze (krok 1, grid 2-kolumnowy — 7. kafel sam). Fix (propozycja): na home dać Pakietom kartę na całą szerokość rzędu (`md:col-span-3`, układ poziomy: zdjęcie z lewej, treść z prawej, badge „Bestseller") — sierota znika, a bestseller dostaje ekspozycję, na którą zasługuje. W kalkulatorze: `sm:col-span-2` dla 7. pozycji.

**[P2-C] Opinie — optycznie puste karty.** Cytat Mai (Woohoo) jest ~3× dłuższy od pozostałych; przy równych wysokościach kart opinie 2 i 3 mają dużą pustkę na dole. Fix: skrócić cytat Mai NA HOME (line-clamp do ~8 linii + „…"; pełna wersja i tak jest w case study), albo układ masonry. Uwaga: treści opinii nie zmieniamy — tylko przycięcie ekspozycji.

**[P3] LCP hero przy zimnym wejściu.** Przy pierwszym załadowaniu zdjęcie hero pojawia się z zauważalnym opóźnieniem (szary placeholder). Warto zweryfikować w PageSpeed Insights, czy `sizes="(max-width: 768px) 100vw, 40vw"` daje przeglądarce rozsądny wariant (fallback `src` wskazuje w=3840). Nie ruszać bez pomiaru — `priority`/`fetchPriority` już są.

**[P3] „Puste przeloty" przy skoku kotwicą.** Sekcje animują się dopiero przy wejściu w viewport (`AnimatedSection`); przy skoku np. Hero→Cennik użytkownik przelatuje przez jeszcze-niewyanimowane obszary. Na szybkim sprzęcie niezauważalne, na słabszym daje „białe migawki". Opcja: skrócić dystans/czas animacji wejścia albo wyłączać animacje podczas programowego scrolla. Niski priorytet.

## Długość strony — odpowiedź na pytanie „czy nie za długa?"

Pomiary (scrollHeight):

| Szerokość | Długość | Ekranów |
|---|---|---|
| 1728 px (Twój desktop) | 14 069 px | ~15 |
| 606 px (wąskie okno) | 21 267 px | ~27 |
| 390 px (telefon) | do potwierdzenia | szac. ~28–30 |

Najwięksi „zjadacze" (desktop → 606 px): **Cennik 2 772 → 4 679 px**, **Usługi 1 756 → 4 456 px** (7 kafli z dużymi zdjęciami w 1 kolumnie), Proces+Warunki 1 058 → 1 549 px, Blog 762 → 1 843 px.

**Werdykt:** na desktopie 15 ekranów to górna granica normy dla one-page'a z nawigacją kotwicową — akceptowalne, bo treść jest gęsta od dowodów (portfolio, opinie, cennik). Na telefonie ~28 ekranów to **za dużo** — nikt nie doscrolluje do formularza „siłą rozpędu"; ratuje nas tylko FAB i menu. Rekomendowane skróty **bez usuwania treści** (kolejność wg zysku):

1. **Cennik mobile:** 6 zawsze rozwiniętych kart pakietów → na mobile pakiety również jako zwijane kategorie (desktop bez zmian) + **osadzony kalkulator zastąpić kafelkiem-teaserem** linkującym do /kalkulator (na obu szerokościach; kalkulator ma swoją stronę, a most do formularza tam też działa). Zysk: ~2,5–3 ekrany mobile, ~1,5 desktop.
2. **Usługi mobile:** kompaktowe kafle — zdjęcie 16:9 zamiast 4:3 albo grid 2-kolumnowy już od ~420 px, ewentualnie zdjęcia tylko dla 3 pierwszych usług. Zysk: ~2–3 ekrany mobile.
3. **Blog mobile:** 1 najnowszy wpis + link „Zobacz wszystkie" (desktop: 3 karty zostają). Zysk: ~1,5 ekranu mobile.
4. **Warunki współpracy mobile:** 6 kart → akordeon „Warunki współpracy (rozwiń)". Zysk: ~1 ekran mobile.

Po tych czterech ruchach mobile spada do ~19–21 ekranów przy zachowaniu 100% treści na desktopie i dostępności całości na mobile.

## Do dokończenia przy widocznym oknie Chrome (~5 min)

1. Zrzuty mobile 390 px: hero, menu hamburgera (pozycja „Zadzwoń"), FAB po scrollu, czytelność cennika.
2. Dark mode: hero, cennik, formularz (toggle w nav).
3. Kalkulator kroki 2→3 wizualnie (animacje kroków nie odpalają się w ukrytej karcie; DOM-owo krok 1 i prefill działają).
4. Lightbox /galeria (strzałki, Esc) + jakość zdjęć Yes Butcher w case study po kompresji.

## Proponowany brief wdrożeniowy (UXUI-1)

Po akceptacji: (a) wyrównanie kart EVENT (P2-A), (b) pakiety full-width na home + col-span w kalkulatorze (P2-B), (c) clamp cytatu Mai (P2-C), (d) skróty mobile #1–4 z sekcji o długości. Wszystko czysto frontowe, bez zmiany treści i cen; lint+tsc+build jak zwykle.
