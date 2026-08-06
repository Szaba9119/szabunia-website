# Plan audytu spójności strony — 6 sierpnia 2026

Audyt bieżącego stanu repo strony szabunia.pl po turze poprawek z 5 sierpnia 2026. Dokument planistyczny — nie zawiera jeszcze wyników i nie wprowadza zmian w kodzie.

## 1. Kontekst i założenia

- Punkt odniesienia: `main` na HEAD `d4da040`, produkcja była ostatnio potwierdzona jako zgodna z `main` w dokumentacji z 5 sierpnia.
- Poprzedni pełny audyt: `docs/sesje/AUDYT-PELNY-2026-08-05.md`; ten audyt jest kontrolą po wdrożeniu `c51b875` i nie powtarza bez potrzeby zamkniętych punktów.
- Źródło prawdy dla kodu i treści: aktualny repozytorium `src/` i `public/`; świadome decyzje biznesowe z `AGENTS.md`, `CLAUDE.md` oraz poprzednich audytów pozostają nadrzędne.
- Okno czasowe: stan repo na 6 sierpnia 2026. Bez dostępu do paneli Ads, GA4, GSC, GBP, PSI i Lighthouse nie wyciągam wniosków o realnym ruchu, konwersjach ani CWV.
- Audyt diagnostyczny: w tej fazie nie zmieniam kodu, cen, metadanych, JSON-LD, konfiguracji Next ani plików środowiskowych.

## 2. Zakres

### 2.1 Kod i higiena repo

- [ ] Sprawdzić lint i TypeScript.
- [ ] Sprawdzić otwarte punkty z ostatniego audytu względem aktualnego kodu.
- [ ] Sprawdzić formularze, tracking, stan błędów i obsługę storage.
- [ ] Sprawdzić importy, martwy kod, `TODO`, `console`, `any` i artefakty repo.

### 2.2 UX/UI i dostępność

- [ ] Sprawdzić spójność głównej ścieżki CTA i etykiet.
- [ ] Sprawdzić hierarchię nagłówków, semantykę, kotwice, focus i tap-targety w kodzie.
- [ ] Sprawdzić dark mode, reduced motion, formularze i elementy błędów.
- [ ] Oznaczyć opinie estetyczne oddzielnie od ustaleń technicznych.

### 2.3 SEO techniczne

- [ ] Sprawdzić sitemapę, robots, canonicale, redirecty i feed względem kodu.
- [ ] Sprawdzić kompletność danych strukturalnych, OG i linkowania wewnętrznego.
- [ ] Sprawdzić drafty i treść renderowaną w SSR.

### 2.4 Treść i spójność biznesowa

- [ ] Sprawdzić liczby i warunki w kanonicznych danych usług, FAQ, blogu i `llms.txt`.
- [ ] Nie rozstrzygać samodzielnie niejasności cenowych, cytatów ani zakresu oferty.
- [ ] Sprawdzić, czy poprzednie poprawki nie zostawiły sprzecznych komentarzy lub etykiet.

## 3. Dane do zebrania

| # | Źródło | Zakres |
|---|---|---|
| 1 | Repo i git | HEAD, status, diff, pliki `src/` i `public/` |
| 2 | `AGENTS.md`, `CLAUDE.md`, `DESIGN.md` | zasady projektu i tokeny |
| 3 | `docs/sesje/AUDYT-PELNY-2026-08-05.md` | otwarte i zamknięte findings |
| 4 | `npm run lint`, `npx tsc --noEmit`, opcjonalnie build | stan jakości kodu |
| 5 | render SSR / lokalny smoke test, jeśli środowisko pozwoli | ścieżki i spójność runtime |

## 4. Kolejność wykonania

1. Najpierw stan repo i testy, bo błędy techniczne mogą fałszować ocenę UX i SEO.
2. Następnie kod ścieżek formularza, CTA, layoutu i danych, bo one wpływają na większość powierzchni strony.
3. Na końcu porównanie z poprzednim audytem i raport z osobnymi priorytetami oraz decyzjami.

## 5. Produkt końcowy

Plik: `AUDYT-SPÓJNOŚĆ-2026-08-06.md`, według `docs/METODYKA-AUDYTU.md §6`.

Stop-conditions: bez nowych zależności, bez zmian w `next.config.ts`, `layout.tsx` metadata/JSON-LD, `.env*`, `.gitignore`, cenach i warunkach biznesowych bez decyzji Marcina; bez commitów i pushu.

## 6. Kryteria ukończenia

1. Każdy sprawdzony checkpoint ma wynik albo jawnie wskazany brak danych.
2. Każdy finding ma dowód, priorytet, pewność i ownera.
3. Osobno wymienione są hipotezy, ograniczenia audytu i pozorne problemy.
4. Raport zawiera kolejność działań, datę re-audytu i rejestr ID findingów.
