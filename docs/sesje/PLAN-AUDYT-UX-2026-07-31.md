# Plan audytu UX / dostępność / spójność treści — 31 lipca 2026

Audyt modułu **B** (UX / UI / konwersja) i **E** (treść, spójność biznesowa) na żywej stronie
`szabunia.pl`, z pomiarem na renderze, nie z kodu.
Dokument planistyczny — powstał przed zebraniem danych. Wykonanie: 31.07.2026, sesja Cowork.

---

## 1. Kontekst i założenia

**Stan przedmiotu audytu.** Ostatni pełny audyt: `AUDYT-PELNY-2026-07-29.md`. Po nim weszły dwie fale
zmian: metadane i H1 (`SEO-TITLE-DESCRIPTION-2026-07-30.md`, `RANKING-CO-NAPRAWIC-2026-07-30.md`)
oraz mapowanie przekierowań ze starej domeny. Moduł UX nie był badany na renderze od `AUDYT-UX-UI-2026-07-23.md`.

**Punkt odniesienia.**

| | |
|---|---|
| Produkcja | `szabunia.pl`, sprawdzana 31.07.2026 |
| HEAD repo | `e560f36` (`fix(uklad): rowne wysokosci kart publikacji i wyrownane CTA`), gałąź `main` |
| Drzewo robocze | **brudne: 6 zmodyfikowanych plików** (linia obiektowa, niezacommitowana) |

⚠ **Produkcja NIE zawiera sześciu zmodyfikowanych plików.** Wszystkie ustalenia dotyczą stanu
z commita `e560f36`. Findingi, które te zmiany zamykają, są w raporcie oznaczone osobno.

**Uwaga interpretacyjna do danych.** Pomiar layoutu jest wykonany na renderze przez lokalne proxy
(patrz §3), a nie na maszynie użytkownika. Te dane **nie uniosą wniosków o Core Web Vitals**
ani o wadze strony na zimno: cache, sieć i sprzęt są inne. CWV zostaje jako `N`.

**Ground truth spoza audytowanego systemu.** Ceny i warunki weryfikowane przeciwko
`01_Biznes/_System/02_Cenniki/cennik_2026_07_v3.md` (obowiązuje od 28.07.2026), nie przeciwko
treści innej podstrony. Zgodnie z metodyką §3 moduł E pliki cennikowe w `docs/` bywają przestarzałe,
więc źródłem prawdy jest cennik biznesowy, a kanonem kotwic `src/data/services.tsx`.

---

## 2. Zakres

### 2.1 Struktura i hierarchia
- [ ] dokładnie 1× H1 na każdej podstronie, hierarchia h1→h2→h3 bez przeskoków
- [ ] semantyka `<main>` / `<nav>` / `<footer>`, `lang="pl"`
- [ ] każde `href="#x"` ma cel na swojej stronie
- [ ] długość strony: `scrollHeight` na 390 / 606 / 1440 px, przeliczona na ekrany
      (próg alarmowy: >15 ekranów desktop, >20 mobile)
- [ ] rozbicie px per sekcja na stronie głównej

### 2.2 CTA i lejek
- [ ] spójna etykieta głównego CTA na wszystkich powierzchniach
- [ ] sticky CTA mobile na stronach lejka, FAB, telefon dostępny bez scrolla
- [ ] brak kafla-sieroty w siatce usług
- [ ] strona 404: czy linki prowadzą do żywych tras

### 2.3 Dostępność (WCAG 2.1 AA)
- [ ] **kontrast 4.5:1 zmierzony na renderze**, z uwzględnieniem gradientów
- [ ] skip-link i jego cel, widoczny `:focus-visible`
- [ ] `<label htmlFor>` powiązane z `id`, `aria-invalid`, `aria-describedby`, `role="status"`
- [ ] alt na wszystkich obrazach (policzone X/X)
- [ ] `prefers-reduced-motion`
- [ ] **tap-targety ≥44 px zmierzone** na 390 px
- [ ] tryb ciemny: osobny pomiar kontrastu

### 2.4 Mobile i render
- [ ] brak poziomego przewijania na 390 / 606 / 1440
- [ ] obrazy: liczba, alt, wagi, obrazy nieładujące się
- [ ] elementy `fixed` / `sticky` i ich nakładanie się

### 2.5 Metadane i dane strukturalne (weryfikacja, nie re-audyt SEO)
- [ ] długość `title` (≤60) i `description` na każdej podstronie
- [ ] typy JSON-LD, brak `aggregateRating`, brak `meta keywords`
- [ ] `FAQPage` 1:1 z widocznym FAQ

### 2.6 Treść i spójność biznesowa (moduł E)
- [ ] każda kwota na żywo skonfrontowana z cennikiem v3
- [ ] warunki: poprawki, terminy, licencja, odwołania, dojazd, RAW
- [ ] liczby dowodu społecznego i narracja stażu
- [ ] nazwy pakietów, ślady po wycofanych produktach

---

## 3. Dane do zebrania

| # | Źródło | Metoda | Uwaga |
|---|---|---|---|
| 1 | 18 tras live | render Chromium przez lokalne reverse proxy do `szabunia.pl` | JS i CSS włączone |
| 2 | te same trasy | pomiar w przeglądarce Marcina (rozszerzenie Chrome) | weryfikacja krzyżowa |
| 3 | zrzuty pełnostronicowe | 390 i 1440 px, `prefers-reduced-motion: reduce` | inaczej sekcje zostają niewyanimowane |
| 4 | zrzut tekstu wyrenderowanego | 15 podstron | wejście do modułu E |
| 5 | `cennik_2026_07_v3.md` | odczyt | źródło prawdy o cenach |

**Dlaczego proxy.** Chromium w kontenerze nie ma wyjścia do sieci (`ERR_CONNECTION_RESET`),
`curl` ma. Okno przeglądarki Marcina nie daje się zmniejszyć poniżej 1600 px, a ramkowanie strony
blokuje `X-Frame-Options`, więc pomiaru mobilnego nie da się zrobić w jego oknie.
Rozwiązanie: lokalne proxy przekazujące żądania do produkcji, Chromium rozmawia z `127.0.0.1`.
**Wiarygodność proxy zweryfikowana**: ten sam pomiar strony głównej przy 1600 px przez proxy
i w przeglądarce Marcina różni się o 0,9% wysokości i o dokładnie te elementy, które wnosi
baner cookies (patrz raport §10).

---

## 4. Kolejność wykonania

1. Punkt odniesienia i stan drzewa — **bo** rozjazd produkcja vs `main` unieważnia część findingów.
2. Pomiar layoutu i dostępności na trzech szerokościach — **bo** to jest baza dla wszystkiego dalej.
3. Weryfikacja krzyżowa w przeglądarce Marcina — **bo** kod i live rozstrzygają spory z renderem.
4. Kontrast osobno, z detektorem świadomym gradientów — **bo** pierwsza wersja dała 16 fałszywych trafień.
5. Moduł E osobnym subagentem na zrzucie tekstu — **bo** nie mieści się w jednym oknie kontekstu.
6. Raport, potem rejestr findingów.

Szacunek nakładu: jedna sesja.

---

## 5. Produkt końcowy

Plik `AUDYT-UX-2026-07-31.md`, struktura wg `docs/METODYKA-AUDYTU.md §6`, findingi wg §5,
ID w formacie `UX2607-nn`.

**Stop-conditions (zawsze aktywne, `CLAUDE.md` §10 i §11):** żadnych commitów i pushy,
żadnej nowej paczki npm, `next.config.ts` / `layout.tsx` / JSON-LD / `.env*` nietykane,
rozbieżność w danych biznesowych (ceny, godziny, telefon, email) **nie jest poprawiana samodzielnie**,
audyt nie wprowadza zmian w kodzie ani w treści.

---

## 6. Kryteria ukończenia

1. Wszystkie checklisty §2 odhaczone albo oznaczone „brak danych" z powodem.
2. Każdy finding ma dowód, priorytet, pewność i ownera.
3. Sekcja „Sprawdzone i OK" wypełniona.
4. Sekcja „Czego nie sprawdzono" wypełniona z listą brakujących narzędzi.
5. Sekcja „Pozorne problemy skorygowane w trakcie" wypełniona.
6. Rejestr findingów z ID na końcu raportu.
