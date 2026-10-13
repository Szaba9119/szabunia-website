# Plan audytu SZABUNIA — 13 października 2026

Pełny re-audyt szabunia.pl (moduły A–E metodyki) po trzech tygodniach od audytu z 23–24.09.2026.
Dokument planistyczny. Wykonanie: Claude Code, 13.10.2026, jedna sesja, bez delegacji na subagentów.
Audyt diagnostyczny: nie zmienia kodu, paneli ani treści.

## 1. Kontekst i założenia

- **Stan przedmiotu audytu.** Ostatni commit `11a3f5c` z 24.09.2026. Od tego dnia w `src/` nie zmieniło się nic,
  więc różnice wobec 24.09 mogą pochodzić tylko z otoczenia: produkcja, usługi zewnętrzne (Upstash, Resend,
  Turnstile), zależności npm, panel Ads, dane GSC.
- **Punkt odniesienia:** `AUDYT-SZABUNIA-2026-09-23.md` (z sekcjami M i N z 24.09) oraz
  `AUDYT-CZESCIOWY-SEO-TECH-2026-09-23.md` (identyfikatory PERF-01…03, TECH-01…03, SEO-01…05, FORM-01).
  Te identyfikatory zachowuję. Nowe ustalenia dostają format `SZA2610-nn`.
- **Okno czasowe:** 24.09–13.10.2026. Logi Vercela (plan Hobby) obejmują tylko ostatnią godzinę; zgrupowane błędy
  maksymalnie 7 dni.
- **Ground truth spoza systemu:** skrzynka Gmail (wyszukanie powiadomień formularza). Ograniczenie: powiadomienia
  mogą trafiać na Workspace `marcin@szabunia.pl`, niewidoczny dla konektora.

## 2. Zakres

### 2.1 Moduł A — kod, bezpieczeństwo, wydajność
- [ ] lint, `tsc --noEmit`, `npm audit`, `npm outdated`
- [ ] parytet produkcja vs `main` (Vercel deployments)
- [ ] błędy runtime produkcji (Vercel, 7 dni)
- [ ] trasy API: walidacja, limity, origin, Turnstile, rate-limit
- [ ] nagłówki bezpieczeństwa live
- [ ] Lighthouse produkcji: 9 stron × mobile/desktop × 2 przebiegi, `devtools throttling` (ta sama metoda co 23.09)
- [ ] martwy kod (TECH-03), dryf dokumentacji (`CLAUDE.md`, `AGENTS.md`)
- [ ] widoczność repo GitHub i dane w nim

### 2.2 Moduł B — UX / konwersja
- [ ] formularz na telefonie (FORM-01) live
- [ ] długość strony głównej przy 375 px
- [ ] baner cookies: „Odrzuć” równorzędny, „Ustawienia cookies”
- [ ] dostępność: wynik Lighthouse a11y

### 2.3 Moduł C — SEO
- [ ] crawl 42 URL z sitemapy: status, title, description, canonical, H1, robots, og:locale, JSON-LD, alt
- [ ] redirecty (http, www, stara domena, stare slugi, `/o-mnie`)
- [ ] `robots.txt`, `llms.txt`, `sitemap.xml` (`lastmod`)
- [ ] status SEO-01…05

### 2.4 Moduł D — pomiar i Google Ads
- [ ] kampania: status, budżet, stawki, sieci, lokalizacja (Supermetrics, odczyt)
- [ ] reklamy i rozszerzenia: zgodność ze stroną, adresy docelowe
- [ ] działania konwersji
- [ ] zdarzenia GA4 w kodzie i ich bramkowanie zgodą
- [ ] wydajność kampanii (koszt, kliknięcia, konwersje) — zależy od dostępu

### 2.5 Moduł E — treść i spójność biznesowa
- [ ] `sprawdz_spojnosc.mjs` (kanon cen)
- [ ] `sprawdz_tekst.py` (zasady tekstów)
- [ ] liczby dowodu społecznego: strona vs reklama
- [ ] polityka prywatności vs faktycznie używane usługi

## 3. Dane do zebrania

| # | Źródło | Zakres | Ścieżka |
|---|---|---|---|
| 1 | repo + git | HEAD `11a3f5c` | lokalnie, `git --no-optional-locks` |
| 2 | Vercel | deploymenty, błędy 7 dni | MCP Vercel |
| 3 | produkcja | HTML 42 URL, nagłówki, redirecty | curl |
| 4 | Lighthouse 13.5.0 | 36 przebiegów | lokalny Chrome headless |
| 5 | Google Ads 786-864-4697 | struktura (odczyt) | Supermetrics |
| 6 | Gmail | powiadomienia formularza od 01.06 | konektor Gmail, odczyt |

## 4. Kolejność wykonania
1. Parytet produkcji i błędy runtime — **bo** bez tego nie wiadomo, co się audytuje.
2. Kod i API — **bo** formularz był P0 24.09.
3. Crawl SEO i Lighthouse w tle.
4. Ads i pomiar.
5. Treść i prawo.
6. Raport.

## 5. Produkt końcowy
`AUDYT-SZABUNIA-2026-10-13.md` wg `METODYKA-AUDYTU.md` §6.
**Stop-conditions:** `CLAUDE.md` §10 i §11; bez commitów, pushy, deployów, zmian w panelach i wysyłki formularzy.

## 6. Kryteria ukończenia
1. Checklisty odhaczone albo oznaczone „brak danych” z powodem.
2. Każde ustalenie z dowodem i pewnością.
3. Sekcja „czego nie sprawdzono” wypełniona.
4. Rejestr ustaleń z ID i statusami starych pozycji.
