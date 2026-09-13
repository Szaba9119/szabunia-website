# Plan audytu MASTER — 12 września 2026

Zakres i kolejność wynikają z pełnego briefu właściciela (106 punktów). Audyt poprzedza zmiany aplikacji. Po diagnozie realizacja autonomiczna P0 → P1 → P2/P3 → QA zgodnie z briefem. Bez commit/push, nowych zależności i zmian faktów biznesowych.

## 1. Kontekst
Punkt odniesienia: czyste main, HEAD c9176bf42d1529292ba77f3e1a13651cd7b1c445. Dane GSC w briefie są historyczne, nie są świeżym eksportem i nie dowodzą wpływu zmian. Produkcja została odczytana publicznie; zgodność SHA wdrożenia z HEAD nie została potwierdzona przez panel Vercel. Najnowszy kod ma zmiany z sierpnia, których AGENTS.md nie opisuje.

## 2. Zakres
### 2.1 Kod i pomiar
- [x] Framework, routy, API, formularze, integracje bez ujawniania sekretów.
- [x] Lint, TypeScript, build, uruchomienie dev.
- [x] Consent, atrybucja, galeria, wydajność w kodzie.
### 2.2 SEO
- [x] Metadata, canonical, przekierowania, sitemap/robots, JSON-LD, stare linki i ceny.
- [x] Ownership zapytań, blog/usługi/case studies, kandydaci nowych URL.
### 2.3 Marka i treść
- [x] Cztery filary, jeden partner, CTA, case/proof i źródła claimów.
- [x] Osobna mapa decyzji cenowych, prawnych i brakujących faktów.
### 2.4 Interfejs
- [x] Home 1440/1024/768/430/390; 12 innych tras na 1440/390.
- [x] Początkowy widok menu mobile i banera cookies, konsola, semantyka, overflow.
- [ ] Powtórzenie ścieżek zmienionych, dark mode, focus i galerii po implementacji.

## 3. Dane i produkt końcowy
Źródła: repo + generowany HTML + przeglądarka z CSS/JS + publiczne odpowiedzi HTTP. Raporty MASTER-*-BASELINE, tabela wszystkich punktów AUDYT-MASTER, snapshot SEO przed/po, raport wdrożenia i backlog. Kryterium: każda pozycja gotowa, nieaktualna albo jawnie zależna od decyzji/danych zewnętrznych. Nie deklarować wyników CWV/CrUX bez pomiaru.
