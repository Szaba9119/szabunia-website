# Plan audytu pełnego szabunia.pl — 5 sierpnia 2026

Audyt całej strony po trzech turach poprawek z 29.07, 04.08 i 05.08.
Dokument planistyczny — nie zawiera jeszcze danych. Wykonanie: 05.08.2026, sesja Cowork, tryb autonomiczny.
Prompt uruchomieniowy: `docs/sesje/PROMPT-AUDYT-PELNY-2026-08-05.md`.

---

## 1. Kontekst i założenia

### Stan przedmiotu audytu

Ostatni pełny audyt: `AUDYT-PELNY-2026-07-29.md` (moduły A-E + panele).
Od tamtej pory weszło **trzynaście commitów** i **pięć raportów cząstkowych**:

| Data | Dokument / commit | Czego dotyczył |
|---|---|---|
| 30.07 | `RANKING-CO-NAPRAWIC-2026-07-30.md`, `SEO-TITLE-DESCRIPTION-2026-07-30.md` | repozycjonowanie SEO, metadane, H1, mapowanie redirectów |
| 31.07 | `AUDYT-UX-2026-07-31.md` + `BRIEFY-UX-2026-07-31.md` | UX, długość strony, lejek |
| 02.08 | `AUDYT-LEJEK-I-JEZYK-2026-08-02.md`, `ADS-EVENTY-DIAGNOZA-2026-08-02.md` | lejek podstron, język, zdarzenia Ads |
| 04.08 | `AUDYT-TRESC-2026-08-04.md` (107 KB), `AUDYT-ZDJECIA-2026-08-04.md` | treść i zdjęcia, 36 ID wdrożonych commitem `c5ead22` |
| 04.08 | `POMIARY-2026-08-04.md`, `DECYZJE-DO-PODJECIA-2026-08-04.md` | punkt odniesienia „przed" + 12 decyzji dla Marcina |
| 05.08 | commity `7425bec`, `5a5b63a`, `f5dd9f4` | jedna kwota „od", taryfa zespołowa 1 400 + 120, rozstawienie 30 minut |

**To nie jest audyt na czystym polu.** Każdy finding musi najpierw przejść przez pytanie
„czy to nie jest pozycja zamknięta decyzją Marcina" (`CLAUDE.md §9` zawiera listę zamkniętych).

### Otwarte z poprzedniego cyklu (wchodzą do zakresu jako domknięcia)

`TRESC2608-04`, `-05`, `-11`, `-23`, `-52`, `-53` · `ZDJ2608-10`, `-16`, `-23`, `-27`, `-28`, `-33`, `-37`
oraz decyzje `DZ3` i `DZ5` z `DECYZJE-DO-PODJECIA-2026-08-04.md`.

### Okno czasowe

29.07.2026 – 05.08.2026. **Uwaga interpretacyjna:** to siedem dni, z czego trzy z aktywnym
wdrażaniem. Te dane **nie uniosą** żadnego wniosku o skutkach zmian: najstarsza zmiana ma
sześć dni, najnowsza sześć godzin. Nie da się z nich powiedzieć, czy repozycjonowanie SEO
działa, czy nowa taryfa zespołowa sprzedaje, ani czy CTR w Ads się zmienił. Audyt odpowiada
wyłącznie na pytanie **„czy stan jest poprawny"**, nie **„czy zadziałało"**.

### Punkt odniesienia

- **Kanon cen i decyzji:** `CLAUDE.md §9`, kanon kotwic to `src/data/services.tsx`.
- **Kanon metodyki:** `docs/METODYKA-AUDYTU.md`.
- **Stan kodu:** HEAD `f5dd9f4`, drzewo czyste, `main == origin/main`.
- **Stan produkcji:** deployment `dpl_GTb4YGhZ1btDkh4eDsLzjpWE19mN`, target `production`,
  state `READY`, `githubCommitSha` = `f5dd9f4`, utworzony 05.08.2026 09:27 UTC.
  **Produkcja == main. Rozjazdu nie ma.**

### Ground truth spoza audytowanego systemu

- **Parytet produkcji:** API Vercela (`list_deployments`), nie odczyt treści strony.
- **Kody odpowiedzi:** `fetch()` w kontekście otwartej strony w Chrome na maszynie Marcina.
  Warstwa pobierania po stronie agenta oddaje snapshoty sprzed deployów i **nie jest
  wiarygodnym źródłem** — potwierdzone w tej sesji dwoma fałszywymi hipotezami.
- **Leady:** skrzynka Marcina, nie tagi Ads. Kryterium: maile z tematem
  „Nowe zapytanie ze strony:" z bloku `mail.ts:51-58`.
- **Ruch:** Vercel Web Analytics (bez ciasteczek, poza bramką zgody) jako mianownik
  dla liczb z GA4 (za bramką zgody).

---

## 2. Zakres

### 2.1 Moduł A — kod, architektura, bezpieczeństwo, wydajność

- [ ] parytet produkcja vs `main`, HEAD, czystość drzewa
- [ ] martwe komponenty (0 importów), martwy kod env, `console.log` / `TODO` / `any`
- [ ] dryf `CLAUDE.md` i `.env.local.example` vs stan faktyczny kodu
- [ ] komponenty serwerowe domyślnie, `ErrorBoundary` na sekcjach, alias `@/`
- [ ] formularze i API: walidacja klient+serwer, limity długości pól, walidacja `service`,
      honeypot, Turnstile (oba kierunki awarii), rate-limit, escapowanie HTML, dostarczalność
- [ ] nagłówki: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- [ ] obrazy: `next/image` wszędzie, AVIF/WebP, `quality` zgodne z `images.qualities`, `sizes`,
      `priority` na LCP, `minimumCacheTTL`, `Cache-Control` na `/images/*`
- [ ] Core Web Vitals — **oznaczyć N, nie zgadywać**

### 2.2 Moduł B — UX / UI / konwersja / dostępność

- [ ] 1× H1 na trasę, hierarchia bez przeskoków, semantyka, rytm sekcji
- [ ] każde `href="#x"` ma cel na swojej stronie; scrollspy; okruszki == `BreadcrumbList`
- [ ] spójna etykieta głównego CTA na wszystkich powierzchniach; jedna ścieżka CTA
- [ ] sticky CTA mobile, FAB vs formularz i baner cookies, 404
- [ ] kontrast 4,5:1 policzony z tokenów, nie zgadywany
- [ ] focus trap + Escape + powrót fokusu (menu, cztery lightboxy), ARIA w formularzach
- [ ] `prefers-reduced-motion` w CSS i we wszystkich komponentach animowanych
- [ ] tap-targety ≥44 px (≥24×24 wg WCAG 2.2 SC 2.5.8)
- [ ] równe wysokości kart, kafel-sierota, dark mode na każdym komponencie
- [ ] długość strony: `scrollHeight` desktop zmierzony, mobile **N**

### 2.3 Moduł C — SEO

- [ ] `title` ≤60 i `description` ≤160 na **wszystkich** trasach — zmierzone, nie oszacowane
- [ ] `generateMetadata`, `canonical`, `metadataBase`, www vs non-www
- [ ] `robots.txt`, `sitemap.xml` (kompletność, `lastModified`, drafty, host), `llms.txt`, `/feed.xml`
- [ ] `noindex` na draftach + czy drafty są osierocone
- [ ] redirecty ze starej domeny — mapowanie tematyczne, kody odpowiedzi
- [ ] obrazy OG per podstrona — **kod odpowiedzi każdego pliku**
- [ ] JSON-LD: pełna lista typów per trasa, `FAQPage` 1:1, `hasOfferCatalog` vs osiem usług,
      `minPrice` vs kanon, `BreadcrumbList`, `sameAs`, spójność `@id` grafu
- [ ] linkowanie wewnętrzne blog ↔ usługi ↔ kontakt — policzone per usługa
- [ ] GSC — **N**, brak dostępu

### 2.4 Moduł D — pomiar i kanały płatne

- [ ] inwentarz narzędzi pomiarowych + czy CSP przepuszcza ich domeny
- [ ] mapa zdarzeń: każde `gtag`/`dataLayer` w kodzie, z plikiem i linią
- [ ] luki w lejku: kroki bez zdarzenia, z oceną wartości diagnostycznej
- [ ] Consent Mode v2, gating skryptów, mechanizm niedomierzenia
- [ ] UTM: czy przeżywa nawigację i odświeżenie, czy łapie `wbraid`/`gbraid`
- [ ] ścieżka lead → skrzynka: czy da się odróżnić lead z Ads od organicznego bez paneli
- [ ] NAP spójny: strona ↔ JSON-LD ↔ `llms.txt` ↔ wizytówka (ostatnie **N**)
- [ ] Google Ads, GA4, GBP — **N**, brak dostępu

### 2.5 Moduł E — treść i spójność biznesowa

- [ ] każda kwota w repo vs kanon `services.tsx` — tabela z plikiem i linią
- [ ] liczby operacyjne: 30 min rozstawienia, 30 zdjęć/h, 5-15 min/os., 14/21 dni, 7 dni na poprawki
- [ ] zakazane zwroty: „za pierwsze zdjęcie", „za jedno ujęcie", „z jednego wejścia"
- [ ] dowód społeczny spójny, cytaty opinii identyczne we wszystkich plikach
- [ ] twierdzenia liczbowe mają źródło
- [ ] warunki handlowe spójne (tury poprawek, ekspres, zmiana terminu, pogoda przy dronie)
- [ ] mikrokopia, meta-obietnica zgodna z UI
- [ ] prawne: polityka z datą, SCC/DPF, „Odrzuć" równorzędny, link „Ustawienia cookies",
      osobna zgoda marketingowa, odbiorcy danych
- [ ] ósma usługa (`wnetrza-obiekty-architektura`) obsłużona na **wszystkich** powierzchniach

---

## 3. Dane do zebrania

| # | Źródło | Zakres | Ścieżka |
|---|---|---|---|
| 1 | repo lokalne | HEAD `f5dd9f4` | most do dysku, staging plików do kontenera |
| 2 | git | branch, HEAD, `origin/main`, czystość | `device_bash`, bez komend zakładających lock |
| 3 | API Vercela | ostatnie 20 deploymentów | `list_deployments`, projekt `szabunia-website` |
| 4 | live szabunia.pl | HTML, kody odpowiedzi, sitemapa, nagłówki | Chrome na maszynie Marcina, `fetch()` w kontekście strony |
| 5 | Google Ads / GA4 / GSC / GBP | — | **niedostępne**, wszystko oznaczone `N` |
| 6 | PSI / Lighthouse | — | **niedostępne**, CWV oznaczone `N` |

---

## 4. Kolejność wykonania

1. **Kontekst i punkt odniesienia** — bo bez parytetu produkcja/`main` każdy finding live
   jest niejednoznaczny (to była realna strata czasu w turze 2 z 04.08).
2. **Moduły A, C, D, E równolegle, osobnymi subagentami** — bo pełny audyt pięciu modułów
   nie mieści się w jednym oknie kontekstu i raport wychodzi płytszy pod koniec.
3. **Moduł B osobno**, po zebraniu pomiarów z przeglądarki, bo potrzebuje liczb, nie założeń.
4. **Weryfikacja własna w przeglądarce** — każdy finding oznaczony `Z (live)` przez moduły
   przechodzi przez `fetch()` w kontekście strony. Kod rozstrzyga przy konflikcie.
5. **Raport**, potem **briefy**.

Szacunek nakładu: jedna sesja.

---

## 5. Produkt końcowy

Pliki: `AUDYT-PELNY-2026-08-05.md` (struktura wg `METODYKA-AUDYTU.md §6`, format findingu §5)
oraz `BRIEFY-PELNY-2026-08-05.md` (§7).

**Stop-conditions (zawsze aktywne, `CLAUDE.md §10` + `§11`):**
nowa paczka npm · `next.config.ts` (CSP, headers, images, redirects) · `metadata` w `layout.tsx`
lub JSON-LD · `.env*` · `.gitignore` · refactor >3 plików spoza briefu · rozbieżność w danych
biznesowych (ceny, godziny, telefon, email) — nie poprawiać samodzielnie · cokolwiek „przy okazji" ·
git wyłącznie Marcin · **żadnego klikania w zgody na banerach, żadnych wysyłek formularzy**.

---

## 6. Kryteria ukończenia

1. Wszystkie checklisty §2 odhaczone albo oznaczone „brak danych" z powodem.
2. Każdy finding ma dowód (`plik:linia` / kod odpowiedzi z datą), priorytet, pewność, ownera.
3. Zero findingów `Z`, których nie potwierdzono w kodzie po stwierdzeniu z renderu.
4. Sekcja „Sprawdzone i OK" wypełniona.
5. Sekcja „Hipotezy" wypełniona, nic bez dowodu nie stoi w ustaleniach.
6. Sekcja „Czego nie sprawdzono" z listą brakujących narzędzi i dostępów.
7. Sekcja „Pozorne problemy skorygowane w trakcie" wypełniona.
8. Plan działania posortowany kolejnością wdrożenia, z ownerami i wysiłkiem.
9. Data kontrolna re-audytu z listą metryk.
10. Decyzje dla Marcina jako warianty A/B/C z rekomendacją.
11. Rejestr findingów z ID `PELNY2608-NN`.
12. Stopka z klauzulą „nie wprowadza zmian".
