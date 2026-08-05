# Audyt pełny szabunia.pl — 5 sierpnia 2026

**Zakres:** moduły A (kod, bezpieczeństwo, wydajność), B (UX/UI, konwersja, dostępność), C (SEO), D (pomiar), E (treść i spójność biznesowa) wg `docs/METODYKA-AUDYTU.md §3`.
**Okno czasowe:** 29.07.2026 – 05.08.2026 (od `AUDYT-PELNY-2026-07-29.md`).
**Metoda:** kod na HEAD `f5dd9f4`, drzewo czyste, `main == origin/main`; produkcja potwierdzona przez API Vercela (deployment `dpl_GTb4YGhZ1btDkh4eDsLzjpWE19mN`, target `production`, state `READY`, `githubCommitSha` = `f5dd9f4`, 05.08.2026 09:27 UTC); live przez Chrome na maszynie Marcina, kody odpowiedzi przez `fetch()` w kontekście otwartej strony, odczyty 05.08.2026 09:30–09:50 UTC. Pięć modułów zebranych osobnymi subagentami, wszystkie findingi oznaczone `Z (live)` przepuszczone ponownie przez przeglądarkę przez orchestratora.
**Wykluczone:** Google Ads, GA4, GSC, Profil Firmy w Google (brak dostępu do paneli), Core Web Vitals (brak PSI i Lighthouse), waga plików w `public/images/**` (folder nie był stagowany), treść PDF-a poradnika.
**Plan źródłowy:** `PLAN-AUDYT-PELNY-2026-08-05.md` · **Prompt:** `PROMPT-AUDYT-PELNY-2026-08-05.md`

> Dokument diagnostyczny. Żadne zmiany nie zostały wykonane. Ani jeden plik w repo nie został zmodyfikowany, nic nie zostało zacommitowane, żaden panel nie został dotknięty, żaden formularz nie został wysłany, żadna zgoda na banerze nie została kliknięta.

---

## 0. TL;DR

Trzy tury poprawek z 29.07, 04.08 i 05.08 **doszły na produkcję w całości** i domknęły większość otwartych pozycji: `minPrice` sesji zespołowych zszedł ze 120 na 1 400, `Cache-Control` na `/images/*` to `must-revalidate`, stare adresy obrazów zwracają 404 a nowe 200, sitemapa ma 50 adresów bez draftu Box17, „30 minut" rozstawienia i „ok. 30 zdjęć na godzinę" weszły wszędzie bez ani jednej pozostałości po starych liczbach. Wszystkie 52 `title` mieszczą się w 55 znakach, wszystkie 52 `description` w 155, zero duplikatów.

Znalezione: **0 findingów P0, 5 P1, 24 P2, 19 P3, 11 P4** oraz 15 hipotez bez dowodu. Trzy z pięciu P1 to **pieniądze oddawane na zleceniu**, wszystkie trzy siedzą w `src/data/blog.ts` i `src/data/faq.ts` — czyli w plikach, których tura z 05.08 dotknęła punktowo, a nie w całości. Jeden P1 to **HTTP 400 na portrecie autora na wszystkich ośmiu podstronach usług**, spowodowany jedną cyfrą: `quality={78}` przy liście `qualities: [72, 75, 80, 85, 90]` w `next.config.ts`.

| Obszar | Stan | Zmiana vs audyt 29.07 |
|---|---|---|
| Parytet produkcja vs `main` | ✅ identyczne, `f5dd9f4` | ➖ bez zmian (było OK) |
| Kod i bezpieczeństwo | ✅ mocne: limity pól, honeypot, rate-limit, escapowanie, zero `any` | ✅ poprawa (limity pól domknięte) |
| SEO on-page | ✅ 52/52 metadanych w normie, sitemapa czysta | ✅ poprawa |
| Dane strukturalne | ⚠️ ósmej usługi nie ma w `hasOfferCatalog`, trzy anonimowe encje `ProfessionalService` | ⚠️ regres po publikacji ósmej usługi |
| Pomiar konwersji | ❌ dwa lejki, dwie nazwy zdarzeń, żadnego punktu odniesienia dla telefonu | ➖ bez zmian |
| Treść i ceny | ⚠️ osiem kotwic zgodnych, ale trzy rozjazdy warunków w blogu i FAQ | ⚠️ nowe rozjazdy po turze 05.08 |
| Dostępność | ✅ komplet focus trapów, ARIA, altów, `prefers-reduced-motion` | ✅ poprawa |
| Prawne / RODO | ✅ polityka kompletna, DPF/SCC nazwane, „Odrzuć" równorzędny | ➖ bez zmian |

**Wniosek nadrzędny:** *domykanie treści nie ma sensu, dopóki `src/data/blog.ts` nie zostanie przejrzany w całości pod kątem warunków handlowych, a nie tylko kwot.* Trzy tury poprawek konsekwentnie synchronizowały **liczby** (i zrobiły to wzorowo: 100% kotwic i 100% liczb operacyjnych zgodnych), ale **zdania o warunkach** — kto płaci za drugie podejście przy złej pogodzie, od ilu osób jest sesja zespołowa, ile razy można bezpłatnie przełożyć termin — zostały w wersji sprzed cennika v3. To nie jest kwestia stylu: to zdania, którymi klient uzasadni odmowę dopłaty.

**Jedna decyzja do podjęcia teraz:** czy przejrzeć `blog.ts` warunek po warunku w jednej turze (rekomendacja), czy domykać rozjazdy pojedynczo, gdy się pojawią w kolejnych audytach. Za pierwszym przemawia to, że ten sam plik podniósł rozjazdy w każdym z trzech ostatnich audytów.

---

## 1. Ocena ogólna

### 84 / 100

Strona jest w bardzo dobrym stanie technicznym i słabszym pomiarowym. Fundamenty, na których zwykle wykłada się serwis freelancera, są tu zrobione dobrze i zweryfikowane: pełny SSR, unikalne metadane na 52 trasach, kompletne dane strukturalne, formularze z limitami długości pól, honeypotem, rate-limitem i escapowaniem, dostępność z czterema działającymi pułapkami fokusu i kompletem ARIA, polityka prywatności z nazwaną podstawą transferu do USA. Punkty tracone są w trzech miejscach: **architektura pomiaru** (dwa lejki liczone w dwóch metrykach, brak punktu odniesienia dla dominującego kanału), **warunki handlowe w treści bloga** (trzy rozjazdy z realnym kosztem w złotówkach) i **niedomknięcie ósmej usługi** (opublikowana 04.08, ale bez karty OG, bez wpisu w katalogu ofert, bez ani jednego linku wewnętrznego z treści).

Ocena nie jest obniżana za rzeczy niezmierzone (CWV, dane z paneli) — te są oznaczone `N` i wymienione w §9.

| Obszar | Ocena | Komentarz |
|---|---|---|
| Konwersja / lejek | 80 | Ścieżka jest jedna i drożna, sticky CTA na dziewięciu trasach, zero martwych kotwic. Minusy: etykieta CTA rozjeżdża się w czterech z szesnastu miejsc, hero case study ma dwa przyciski do tego samego celu, a `/kontakt` ma nad formularzem wyróżniony przycisk wyprowadzający z lejka |
| SEO | 88 | 52 unikalne metadane w normie, sitemapa czysta, redirecty tematyczne działają, `robots.txt` bez `Disallow: /_next/`. Minusy: `hasOfferCatalog` 7 z 8, `lastModified` sprzed zmian cen, linia obiektowa bez linkowania |
| Wydajność | **N** | Nie zmierzona. PSI i Lighthouse niedostępne. Znane z kodu: hero ma `priority` i `fetchPriority="high"`, ale plik źródłowy ma 877 px, więc na retinie jest skalowany w górę (`ZDJ2608-37`, nadal otwarte) |
| UX | 85 | Rytm sekcji jednolity w 21 z 24 sekcji, strona główna 11,4 ekranu przy progu 15, równe wysokości kart w 5 z 6 siatek. Minusy: animacja wejścia kart na `/blog` do 2 sekund, kafel-sierota na `/portfolio` po przejściu z 4 na 8 realizacji |
| Dostępność (WCAG 2.1 AA) | 88 | Cztery lightboxy z pułapką fokusu, Escape i powrotem fokusu; komplet `aria-invalid`/`aria-describedby`/`role="alert"`; wszystkie obrazy z altem; `prefers-reduced-motion` w sześciu miejscach. Minusy: jeden link znikający przy najechaniu (kontrast 1,05:1), `aria-label` FAB niezgodny z widoczną etykietą, dwa teksty z obniżoną alfą poniżej progu |
| Treść / copy | 78 | Wszystkie osiem kotwic i wszystkie liczby operacyjne zgodne z kanonem, zero zakazanych zwrotów, zero długich myślników w treści. Minusy: trzy rozjazdy warunków handlowych, dwie zmienione wersje tego samego cytatu klienta, druga kotwica cenowa w blogu |
| Prawne / RODO | 92 | Polityka kompletna z datą, DPF i SCC nazwane dla wszystkich pięciu podmiotów, „Odrzuć" równorzędny wizualnie i wymiarowo, trwały link „Ustawienia cookies", osobna zgoda marketingowa blokująca wysyłkę, dowód zgody utrwalany po stronie serwera. Minus: arkusz CRM nie jest wymieniony wśród odbiorców (dziś bez skutku, bo webhook to no-op) |

---

## 2. Sprawdzone i OK

Lista czystych checkpointów. Dokumentuje pokrycie i chroni przed ponownym badaniem tego samego.

### Parytet i higiena repo (§2.1)

- ✅ **Produkcja == `main` == `f5dd9f4`.** Potwierdzone API Vercela, nie zgadywaniem. Historycznie realny finding P2 — tym razem czysto.
- ✅ **Tura 04.08 jest na produkcji.** `/images/galeria/eventy/event-05-networking-foyer.jpg` → 200, stary `/images/galeria/eventy/event-05.jpg` → 404.
- ✅ **`Cache-Control` na `/images/*` = `public, max-age=31536000, must-revalidate`** (odczyt nagłówka live). `DZ4` wariant B wdrożony.
- ✅ Zero `console.log` / `console.warn` / `console.debug` w `src/`. Wszystkie 14 wywołań to `console.error` w ścieżkach błędu, cztery z markerem `[ALERT]`.
- ✅ Zero `any` w `src/`. Zero plików-śmieci (`.DS_Store`, `*.orig`, `*.bak`) w repo.
- ✅ Zero importów przez `../` — alias `@/` trzymany konsekwentnie.
- ✅ 26 komponentów klienckich i 4 hooki, każdy z uzasadnieniem (stan, efekt, handler, granica błędu). Zero komponentów klienckich bez powodu.
- ✅ `ErrorBoundary` na sekcjach: `/` 12 wrapperów, `/uslugi/[slug]` 12, `/galeria` 10, `/portfolio/[slug]` 9. Jeden wyjątek zgłoszony jako P3.
- ✅ Jeden `TODO` w `src/` (`portfolio.ts:639`, warunek publikacji Box17) — pozycja świadomie otwarta decyzją Marcina.

### Formularze i bezpieczeństwo (§2.1)

- ✅ **Limity długości pól co do znaku:** `contact/route.ts:65` `LIMITS = { name: 200, email: 320, phone: 50, service: 100, message: 5000 }`, UTM cięte do 200. Norma z metodyki spełniona, scenariusz spam-relaya zamknięty.
- ✅ **Walidacja `service` wobec twardej listy:** `contact/route.ts:100`, 9 kodów w `SERVICE_LABELS`, 10 opcji w `<select>` (placeholder + 9), zero rozjazdu. Ósma usługa `obiekty` dodana 04.08 jest w obu.
- ✅ **Honeypot jako realne ukryte pole** w obu formularzach (`CTA.tsx:343-352`, `PoradnikForm.tsx:125-134`), sprawdzany na serwerze przed jakąkolwiek pracą.
- ✅ **Kolejność barier:** origin → rate-limit → parse → honeypot → Turnstile → walidacja → zgoda → Resend. Odcięcie obcego originu przed rate-limitem.
- ✅ Rate-limit 8/h na `/api/contact` i 5/h na `/api/lead`, osobne prefiksy, fail-open z logiem `[ALERT]`.
- ✅ Escapowanie HTML w mailach (`mail.ts:23-29`), wszystkie wstawki użytkownika do węzłów tekstowych, jedyny atrybut z interpolacją to stała.
- ✅ Zero logowania sekretów w 14 `console.error` — komunikaty podają nazwy zmiennych, nigdy wartości.
- ✅ Webhook CRM best-effort: `void pushToCrm(...).catch(...)` przed wysyłką maila, z `AbortSignal.timeout(5000)`.
- ✅ Komplet stanów loading / success / error w obu formularzach, `PoradnikForm` rozróżnia `guideSent` i nie obiecuje maila, który się odbił.
- ✅ Nagłówki obecne: CSP (11 dyrektyw), HSTS `max-age=63072000; includeSubDomains; preload`, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, COOP same-origin, CORP same-site.

### Obrazy i fonty (§2.1)

- ✅ 25 użyć `next/image`, **zero** surowych `<img>` w `src/`. Lightboxy też idą przez `next/image`.
- ✅ Wszystkie z `fill` mają `sizes`, wszystkie bez `fill` mają `width`/`height`, wszystkie mają `alt`.
- ✅ `formats: ["image/avif","image/webp"]`, `minimumCacheTTL: 31536000`.
- ✅ `priority` na elementach LCP w czterech miejscach; hero świadomie bez animacji `opacity`, żeby nie opóźniać pomiaru.
- ✅ Fonty wyłącznie przez `next/font/google`, `display: "swap"`, zero `<link>` do Google Fonts, `font-src 'self'`.

### SEO (§2.3)

- ✅ **`robots.txt` nie blokuje `/_next/`.** Odczyt live = plik z repo co do znaku. Historyczny P1 zamknięty i nie wrócił.
- ✅ **52 unikalne `title` (maks. 55 znaków) i 52 unikalne `description` (maks. 155).** Zero duplikatów. Pełna tabela w module C.
- ✅ **Sitemapa: 50 adresów, host `szabunia.pl`, 8 tras `/portfolio/*`, 26 wpisów, Box17 wykluczony.** Zweryfikowane przez pobranie i sparsowanie `/sitemap.xml` w przeglądarce.
- ✅ `generateMetadata` na wszystkich trzech trasach dynamicznych. `metadataBase` + `canonical` bezwzględne, non-www, bez parametrów.
- ✅ Zero `meta keywords`.
- ✅ `/portfolio/box17-budki-akustyczne` → `noindex, follow`, wykluczony z sitemapy i z siatki, zero linków w `src/`.
- ✅ **Przekierowania ze starej domeny mapują tematycznie i działają live:** `marcinszabunia.pl/portrety-biznesowe` → `/uslugi/wizerunek-portrety`, `/fotografia-eventowa` → `/uslugi/eventy-reportaze`, catch-all na stronę główną. Zmiana z 30.07 jest na produkcji.
- ✅ `/kalkulator` i `/sesje-prywatne` przekierowują (potwierdzone `fetch` z `redirect:'manual'` → `opaqueredirect`).
- ✅ **Obrazy OG: 29 z 30 sprawdzonych zwraca plik.** 8/8 `og/strony/`, 7/8 `og/uslugi/`, 9/9 `og/portfolio/`, 12/26 `og/blog/`. Jedyny brak zgłoszony jako `PELNY2608-07`.
- ✅ `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` per podstrona, nie generycznie.
- ✅ `manifest.json` poprawny i serwowany, ikony PWA 200.
- ✅ **`FAQPage` 1:1 z widocznym FAQ na wszystkich powierzchniach.** `FAQ.tsx:12-16` renderuje wszystkie 17 pozycji i chowa nadmiar klasą, nie `slice`. Podstrony usług budują jedną tablicę zasilającą i JSON-LD, i widok. Rozjazd jest strukturalnie niemożliwy.
- ✅ `BreadcrumbList` zgodny z widocznymi okruszkami — jedna funkcja i jeden komponent czytają tę samą tablicę.
- ✅ **`Offer` / `minPrice` — `TRESC2608-23` ZAMKNIĘTY.** Przeliczone dla ośmiu usług: 600, 1400, 2100, 700, 400, 600, 700, 900. Potwierdzone live: `minPrice` na `/uslugi/sesje-zespolowe` = `1400`. `minPrice: 120` już nie występuje.
- ✅ `geo` i `openingHoursSpecification` obecne i spójne. `priceRange` usunięty świadomie. `aggregateRating` i `review[]` nieobecne (potwierdzone w żywym HTML).
- ✅ `sameAs` identyczne w trzech miejscach w JSON-LD.
- ✅ Treść renderowana w SSR. `next/dynamic` bez `ssr: false`, sekcje poniżej folda są w HTML.
- ✅ **Liczby dowodu społecznego renderują się w SSR poprawnie** — żywy HTML zawiera `<span>250 000<!-- -->+</span>` i `<span>8<!-- -->+</span>`, nie „0+". Patrz §10.
- ✅ Zero thin contentu, zero placeholderów, zero osieroconych tras.

### Dostępność i UX (§2.2)

- ✅ Jedno `<h1>` na każdej z 11 tras, `<main id="main">` wszędzie, `<nav aria-label>` w dwóch miejscach.
- ✅ **Zero martwych kotwic.** 12 wystąpień `href="#kontakt"` — każda z tych tras renderuje `<CTA id="kontakt">`. `/blog/[slug]` i `/poradnik` konsekwentnie używają `/kontakt`, nie kotwicy. `MobileFAB` sprawdza istnienie celu przed przechwyceniem kliknięcia. Potwierdzone też pomiarem live na stronie głównej (5 kotwic, 0 martwych).
- ✅ Nawigacja na podstronach prefiksuje kotwice (`linkPrefix`), scrollspy zgodny z kolejnością DOM i wyłączony poza stroną główną.
- ✅ **Cztery lightboxy z kompletem: `useFocusTrap`, Escape, strzałki, blokada scrolla body, `role="dialog" aria-modal="true"`, powrót fokusu.**
- ✅ Menu mobilne: Escape, pułapka Tab, powrót fokusu do hamburgera, auto-fokus pierwszego elementu, `aria-expanded` + `aria-controls`, zamykanie kliknięciem poza.
- ✅ **Komplet ARIA w formularzach:** `<label htmlFor>` powiązane z `id` dla wszystkich pięciu pól w `CTA.tsx` i dla `lead-email`, `aria-invalid` + `aria-describedby`, `role="alert"` na każdym błędzie, `role="status" aria-live="polite"` na ekranie sukcesu.
- ✅ Alt na wszystkich obrazach — zmierzone live na stronie głównej: 20/20, zero pustych.
- ✅ `prefers-reduced-motion` obsłużone w sześciu miejscach: CSS globalnie i dla `.reveal`, `Parallax`, `CountUp`, `MotionConfig reducedMotion="user"`, autoprzewijanie opinii, `scroll-behavior`.
- ✅ `lang="pl"`, skip-link do `#main` z działającym celem, `:focus-visible` globalnie z dedykowanym stanem dla `.btn-glow` i pól formularza.
- ✅ **Brak poziomego scrolla** (zmierzone live), marquee logotypów przycięty z maską i `motion-safe:`.
- ✅ **Dark mode kompletny** — zero `border-border` bez pary `dark:`, trzy `bg-white` bez `dark:` to celowa biała okładka PDF-a, inline script bez flasha.
- ✅ Wszystkie 30 gradientów przycisków to dziś płaskie `from-blue to-blue`. Historyczne `to-blue-light` (kontrast 3,68:1 z białym tekstem) już nie występuje.
- ✅ **Długość strony głównej: `scrollHeight` 10 323 px przy 1920×902 = 11,4 ekranu**, przy progu alarmowym 15. Bez alarmu.
- ✅ Sticky CTA mobile na dziewięciu trasach lejka, nigdy z martwym linkiem; FAB chowa się przy formularzu i przy stopce i unosi się nad banerem cookies (nasłuch `cookie-banner-change`).
- ✅ `not-found.tsx` linkuje do czterech żywych tras.

### Pomiar (§2.4)

- ✅ **Consent Mode v2 kompletny co do sygnałów** — wszystkie cztery (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`), potwierdzone w żywym HTML.
- ✅ **Kolejność wykonania poprawna i nietrywialna:** `consent default` → `traffic_type` → `config` → dopiero asynchroniczny loader. `window.gtag` istnieje od pierwszej milisekundy, więc żadne zdarzenie nie ginie przed doładowaniem skryptu.
- ✅ Zgoda z poprzedniej wizyty podnosi się synchronicznie, przed `config`.
- ✅ Baner realnie steruje zgodą w obie strony, „Odrzuć" ma tę samą wagę wizualną i wymiary, „Ustawienia cookies" w stopce pozwala wrócić do decyzji.
- ✅ Filtr ruchu wewnętrznego przez `localStorage` + `gtag('set', {traffic_type:'internal'})` przed `config` — poprawne rozwiązanie realnego problemu (filtry GA4 po IP nie łapią sieci komórkowej).
- ✅ Parametr `location` przy `phone_click`/`email_click` obecny i **zawsze niepusty** (kaskada trzystopniowa), sprawdzone dla wszystkich 11 linków kontaktowych.
- ✅ Jeden delegat w fazie capture zamiast `onClick` w każdym komponencie — łapie też kliknięcia, którym React robi `preventDefault`.
- ✅ **UTM przeżywa nawigację client-side i odświeżenie** — cała ścieżka URL → `sessionStorage` → formularz → mail sprawdzona plik po pliku. Wejście na podstronę bez parametrów nie kasuje wcześniej złapanego źródła.
- ✅ Zero duplikatów pomiaru: jeden `config`, jedno GA4 ID, brak GTM obok gtag.js, brak reliktów UA, brak drugiego skryptu analitycznego.
- ✅ `faq_open` **już istnieje** (`FAQ.tsx:55`) — metodyka wymienia go jako brakujący, checkpoint do wykreślenia.
- ✅ Dowód zgody RODO po stronie serwera, z treścią klauzuli i znacznikiem czasu, z odrzuceniem żądania bez zgody.

### Treść i prawo (§2.5)

- ✅ **Wszystkie osiem kotwic cenowych zgodne z kanonem** po decyzjach 04-05.08. Zweryfikowane live: 600 / 1 400 / 400 / 600 / 700 / 700 / 900 / 2 100. Zero pozostałości po 1 100, zero po progach 180/150/120 za osobę.
- ✅ **Zakazane zwroty: zero wystąpień.** „za pierwsze zdjęcie", „za jedno ujęcie", „z jednego wejścia" nie występują nigdzie w `src/` ani `public/`.
- ✅ **„30 minut" rozstawienia wdrożone kompletnie** — dwanaście miejsc, ani jednego „20 minut", „30-45" czy „1 h". Potwierdzone live na `/uslugi/sesje-zespolowe`.
- ✅ **„ok. 30 zdjęć na godzinę" wdrożone kompletnie** — dwa miejsca, ani jednego „20".
- ✅ Liczby operacyjne zgodne: 14 dni na zdjęcia, 21 na wideo, 7 dni na poprawki, 2 tury foto / 3 wideo, ekspres do 48h +50%, RAW +30%, przeniesienie praw +50%, archiwizacja 1 rok, dojazd 2,50 zł/km i 0 zł w Poznaniu, 5 m² na mobilne studio, do 40 osób dziennie.
- ✅ Dowód społeczny spójny: 250 000+ / 1000+ / 100+ / 8+ w trzech miejscach, lista dziewięciu marek identyczna w czterech plikach, staż „od 2018" i „8+ lat" bez rozjazdu. Zero śladu po zmyślonym „500 000+".
- ✅ **Zero długich myślników w treści widocznej dla klienta** (`blog.ts`, `faq.ts`, `portfolio.ts`, `galleryAlts.ts`, `services.tsx`, komponenty). Reguła z `docs/zasady-tekstow.md` przestrzegana wzorowo.
- ✅ Mikrokopia w drugiej osobie, bez korpo-żargonu. Słowa „brief", „lead", „konwersja" nie występują w treści klienckiej. Wycofany zwrot „na piśmie" też nie.
- ✅ Obietnica „odpowiadam w 24h" spójna w jedenastu miejscach; nigdzie nie obiecuje się „precyzyjnej" wyceny, wszędzie „wstępna".
- ✅ Cytat Zuzanny Fortuniak identyczny w dwóch plikach, znak w znak.
- ✅ **Prawne, komplet:** polityka z datą 29.07.2026, DPF i SCC nazwane dla Resend, Vercel, Cloudflare, Upstash i Google; „Odrzuć" równorzędny (`min-w-[112px]`, `py-3`, oba wypełnione); trwały link „Ustawienia cookies" na każdej stronie z działającym re-otwarciem; osobna zgoda marketingowa blokująca wysyłkę poradnika.
- ✅ **Ósma usługa żyje na produkcji** (HTTP 200, H1 „Fotografia wnętrz, obiektów i architektury", kotwica 900 zł) i jest obsłużona w: kafelku na stronie głównej, siatce `/uslugi`, `llms.txt`, `<select>` na `/kontakt`, `generateStaticParams`, sitemapie i zakładce galerii.

---

## 3. Ustalenia — P0

**Brak.** Żaden finding nie spełnia definicji P0 z `METODYKA-AUDYTU.md §4` (utrata leadów, martwy pomiar blokujący ocenę reszty). Najbliżej stoi `PELNY2608-05`, który **staje się P0 warunkowo** — jeśli w Google Ads jako konwersja zaimportowane jest `generate_lead`. Bez dostępu do panelu nie da się tego rozstrzygnąć, więc zgodnie z zasadą twardą nr 1 stoi jako P1 z jawną warunkowością.

---

## 4. Ustalenia — P1

**PELNY2608-01. [TECH] `quality={78}` nie istnieje na liście `images.qualities` — portret autora zwraca HTTP 400 na ośmiu podstronach usług** (§2.1 planu) — `src/components/ServiceAuthor.tsx:37` vs `next.config.ts:41`. · P1 · S · 🤖 · **Z (live + kod)**
`next.config.ts:41` deklaruje `qualities: [72, 75, 80, 85, 90]`, a `ServiceAuthor.tsx:37` żąda `quality={78}`. Next.js 16 odrzuca żądanie o niezadeklarowanej jakości. Zweryfikowane przeze mnie w przeglądarce na produkcji, 05.08.2026: `/_next/image?...&w=256&q=78` → **400**, to samo `q=75` → **200**, `q=80` → **200**. `<ServiceAuthor />` renderuje się bezwarunkowo na każdej podstronie usługi (`uslugi/[slug]/page.tsx:194`), czyli na ośmiu landing page'ach, na które idzie ruch z Google Ads. Zamiast twarzy Marcina w bloku „Kto to zrobi" zostaje szary kwadrat z `blurDataURL`, dokładnie w miejscu, które ma budować zaufanie przed formularzem. Ani lint, ani build tego nie łapią — to błąd runtime'owy optymalizatora.
**Poprawka:** `quality={78}` → `quality={80}` w `ServiceAuthor.tsx:37`. Jedna cyfra, zero zmian w `next.config.ts`, więc **nie dotyka stop-condition §10.2**. Wariant z dopisaniem 78 do `qualities` daje ten sam efekt wizualny przy większym koszcie proceduralnym — odrzucony.

---

**PELNY2608-02. [BIZNES] Blog obiecuje bezterminowe darmowe przekładanie lotu, kanon mówi 300 zł za drugie podejście** (§2.5 planu) — `src/data/blog.ts:373`, dosłowny cytat: „Jeśli pogoda nie pozwala bezpiecznie latać (silny wiatr, opady), bezpłatnie przekładamy sam lot na najbliższy możliwy termin, bez ruszania reszty harmonogramu." · P1 · S · 🧑 (stop-condition `CLAUDE.md §10.7`) · **Z (kod + live)**
To ten sam rozjazd `TRESC2608-53`, który 04.08 domknięto w `services.tsx:543` („wracam raz w ramach ustalonej kwoty; kolejne podejście to 300 zł plus dojazd") i który zgodnie stoi w `services.tsx:638` oraz `llms.txt:37`. Poprawka nie objęła bloga. Wpis `/blog/fotografia-przemyslowa-fabryka` żyje na produkcji. Mechanizm: klient przemysłowy planuje dokumentację postępu budowy w kilku terminach, po drugim odwołanym locie powołuje się na „bezpłatnie przekładamy". Skutek: **300 zł netto plus dojazd na każde kolejne podejście**, przy dokumentacji w paru terminach realnie **600–900 zł na jednym zleceniu**.
**Poprawka:** przepisać drugie zdanie na brzmienie z `services.tsx:543`. Nie podmieniać samych słów — przepisać zdanie (reguła z `docs/zasady-tekstow.md` o `blog.ts`). Brzmienie do akceptacji Marcina.

---

**PELNY2608-03. [BIZNES] Dwa sprzeczne progi wejścia do sesji zespołowej w tym samym pliku, obydwa na produkcji** (§2.5 planu) — `src/data/blog.ts:179` („Sesje zespołowe realizuję od 4 osób.") kontra `src/data/blog.ts:469` („Sesje zespołowe realizuję od 2 osób."). · P1 · S · 🧑 · **Z (kod)**
Kanon po 05.08 to dwie osoby: `services.tsx:212`, `:224`, `faq.ts:16`, `llms.txt:18` („Sesje od 2 osób, bez minimum zlecenia"). `blog.ts:469` został zaktualizowany, `blog.ts:179` nie. Wpis `/blog/headshoty-linkedin-konwersja` jest jednym z mocniejszych wejść na klaster LinkedIn/headshot, więc trzyosobowy zespół czyta „od 4 osób" i odpada z lejka bez pytania. Wartość takiego leada: **1 520 zł netto** (1 400 + 120).
Dodatkowo `blog.ts:469` przeczy sam sobie w drugim zdaniu: „Mniejszym grupom polecam pakiety z Wizerunku i Portretów, bo przy dwóch czy trzech osobach indywidualna sesja portretowa daje więcej niż setup zespołowy" — to resztka po progu czteroosobowym, odsyłająca dwie osoby gdzie indziej w akapicie, którego kotwicą jest cena **za dwie osoby**.
**Poprawka:** `blog.ts:179` na „od 2 osób"; przepisać drugie zdanie `blog.ts:469`, bo dziś zniechęca do produktu, którego cena bazowa dotyczy dokładnie tej grupy.

---

**PELNY2608-04. [BIZNES/PRAWO] Główny lejek obiecuje bezwarunkowo bezpłatną zmianę terminu; warunki z limitem renderują się wyłącznie na `/galeria`** (§2.5 planu) — `src/data/faq.ts:44`, dosłowny cytat: „Zmiana terminu minimum 48h przed sesją jest bezpłatna. Odwołanie później niż 48h przed sesją: 50% wartości zlecenia." · P1 · S · 🧑 · **Z (kod)**
Kanon w `Warunki.tsx:102`: „Zmiana terminu min. 48h przed sesją: **bezpłatna jednorazowo, każda kolejna 20% wartości zlecenia**. Odwołanie <48h: 50% wartości. **Odwołanie w dniu realizacji albo niestawienie się osób fotografowanych: 100% wartości**." To samo w `llms.txt:34`. Kluczowy fakt: `grep -rln "<Warunki"` daje **jeden plik** — `src/app/galeria/page.tsx`. Komponent nie renderuje się ani na stronie głównej, ani na `/kontakt`, ani na żadnej podstronie usługi. W całym lejku klient widzi wyłącznie wersję bez limitu, bez progu 20% i bez kary 100%. Dodatkowo `faq.ts` zasila `FAQPage` w JSON-LD strony głównej, więc niepełna wersja idzie też do Google.
Koszt: przy sesji zespołowej dla 10 osób (1 400 + 8×120 = **2 360 zł netto**) druga przełożona data to **472 zł** nieodzyskane, a puste okno w kalendarzu przy niestawieniu się zespołu to **2 360 zł**.
**Poprawka, dwa warianty do wyboru przez Marcina:** (A) dopisać „jednorazowo, każda kolejna 20% wartości zlecenia" i klauzulę o dniu realizacji do `faq.ts:44`; (B) wpiąć komponent `Warunki` na stronę główną i na `/kontakt`. Wariant A jest tańszy i szybszy, wariant B rozwiązuje problem systemowo (pełne warunki w lejku, nie tylko przy galerii).

---

**PELNY2608-05. [POMIAR] Główny formularz kontaktowy nie emituje `generate_lead` — emituje je pobranie darmowego PDF-a** (§2.4 planu) — `src/components/CTA.tsx:98` (`gtagEvent("contact_submit", …)`) vs `src/components/PoradnikForm.tsx:69` (`gtagEvent("generate_lead", { source: "poradnik" })`). · **P1 (P0, jeśli w Ads zaimportowano `generate_lead`)** · S · 🤖 + 🌐 · **Z (kod)** + **N (panel Ads/GA4)**
Dwie klasy leadów o skrajnie różnej wartości mają dwie różne nazwy zdarzeń, a standardowa nazwa GA4 przypadła tej mniej wartościowej. `generate_lead` to zdarzenie, które GA4 podpowiada jako kluczowe pierwsze, i to samo, które Google Ads podpowiada do importu. Jeśli w Ads zaimportowano `generate_lead`, kampania optymalizuje się na pobrania darmowego PDF-a i **nie widzi ani jednego zapytania ofertowego** — przy smart biddingu system dowozi ruch szukający darmowego pliku. Wariant odwrotny (zaimportowano `contact_submit`) też jest wadliwy: dwa lejki liczą się w dwóch rozłącznych metrykach i żaden raport nie pokazuje sumy leadów.
**Poprawka:** nie zmieniać nazwy `contact_submit` (historia w GA4 przepadnie), tylko **dołożyć drugie wywołanie** `gtagEvent("generate_lead", { source: "formularz_kontaktowy", service: … })` obok `CTA.tsx:98`, a w GA4 oznaczyć jako kluczowe wyłącznie `generate_lead`. Jedno zdarzenie zbiera oba lejki, `source` je rozdziela.
**Warunek startu:** najpierw sprawdzić w Ads → Cele → Podsumowanie → Konwersje, co jest dziś zaimportowane i czy kolumna „Kampanie" nie pokazuje „0 z 1". Bez tego kroku zmiana może pogorszyć stan.

---

## 5. Ustalenia — P2 / P3 / P4

Format tabelaryczny (`METODYKA-AUDYTU.md §5`, wariant 2 — findingów jest ponad 15). Kolumna „Uwaga" rozdziela **co jest na żywo** od **co jest w kodzie**.

### 5.1 P2 — do naprawy w tym cyklu

| ID | Obszar | Uwaga (fakt, nie ocena) | Dowód | E | Owner | Pewność |
|---|---|---|---|---|---|---|
| **PELNY2608-06** | [POMIAR] | Telefon to dominujący kanał konwersji („GA4 pokazuje, że klienci częściej dzwonią niż zaczynają formularz", cytat z kodu) i jest mierzony **wyłącznie** zdarzeniem `phone_click`. Nie ma numeru z przekierowaniem, nie ma rejestru rozmów. `phone_click` liczy kliknięcie, nie rozmowę. Ground truth spoza Google istnieje **tylko dla formularza** (blok „Źródło" z `gclid` w mailu) | `kontakt/page.tsx:109-110`, `mail.ts:51-58` | M | 🧑 | Z (kod) |
| **PELNY2608-07** | [SEO] | `og:image` ósmej usługi zwraca **404** na produkcji (zweryfikowane przeze mnie: `og/uslugi/wnetrza-obiekty-architektura.png` → 404, `og/uslugi/eventy-reportaze.png` → 200). Szablon buduje ścieżkę ze sluga bez sprawdzenia, czy plik istnieje. Nadal otwarte `ZDJ2608-23` | `uslugi/[slug]/page.tsx:42` + live | S | 🧑 (plik) | Z (live + kod) |
| **PELNY2608-08** | [SEO] **[DECYZJA MARCINA — §10.3]** | `hasOfferCatalog` ma **7 pozycji `Offer`** przy ośmiu usługach (zweryfikowane w żywym HTML: 7 wystąpień `"@type":"Offer"`). Brakuje „Fotografia hal, obiektów i wnętrz". Ten sam brak w `knowsAbout` encji `Person`. `llms.txt` wymienia ją poprawnie, rozjazd jest wyłącznie w JSON-LD. Nadal otwarte `TRESC2608-11` | `layout.tsx:207-275`, `:311-318` + live | S | 🧑 | Z (live + kod) |
| **PELNY2608-09** | [SEO] | Linia obiektowa ma **0 linków kontekstowych** w całym serwisie (przy 11 dla `sesje-zespolowe`, 11 dla `wizerunek-portrety`, 9 dla `eventy-reportaze`) i **0 wpisów** w `blogServiceMap`. Dostaje tylko dwa linki szablonowe: kafel na home i kafel na `/uslugi`. Sekcja „Z bloga" pokazuje na niej wpisy dobrane fallbackiem po kategorii, czyli o portretach i eventach | `blog.ts:1701-1728`, policzone w `src/` | M | 🧑+🤖 | Z (kod) |
| **PELNY2608-10** | [SEO] | `SITE_UPDATED = new Date("2026-07-29")` stempluje tą datą stronę główną, `/uslugi`, wszystkie osiem podstron usług, `/kontakt`, `/portfolio`, `/galeria`, `/blog`, `/poradnik`. Ceny zmieniano 04 i 05.08. Zweryfikowane live: `lastmod` tras statycznych = `2026-07-29`. Podstrona obiektowa dostaje datę **sprzed dnia swojej publikacji** | `sitemap.ts:12` + live | S | 🤖 | Z (live + kod) |
| **PELNY2608-11** | [POMIAR] | `gtag('config')` wykonuje się raz, przy twardym załadowaniu. `template.tsx` renderuje się przy każdej nawigacji App Routera, ale **nie woła gtag**. Zero miejsc aktualizujących `page_location` po `pushState`. Jeśli Enhanced Measurement nie ma włączonych zmian strony na zdarzeniach historii, wszystkie `cta_click`, `phone_click`, `faq_open` i `contact_submit` z podstron dostają `page_location` **strony wejściowej** | `layout.tsx:121`, `template.tsx` | S | 🌐 → 🤖 | Z (kod) + N (panel) |
| **PELNY2608-12** | [POMIAR] **[DECYZJA MARCINA — §10.2]** | `connect-src`, `img-src` i `frame-src` nie zawierają `stats.g.doubleclick.net`, `googleads.g.doubleclick.net` ani `www.google.com`. Po kliknięciu „Akceptuję" gtag.js z Sygnałami Google odpytuje te hosty i przeglądarka je blokuje. Pomiar podstawowy (hit → GA4 → import konwersji) **nie jest tym dotknięty** — stąd P2, nie P1 | `next.config.ts:23-25` | S | 🧑 | Z (kod) + N (czy GA4 je wywołuje) |
| **PELNY2608-13** | [POMIAR] | Cztery kroki lejka bez żadnego zdarzenia: kafle usług na home i na `/uslugi` (`<Link className="block">` bez `data-cta`), kafle realizacji na hubie `/portfolio` (na home mają `data-cta`), otwarcie lightboxa galerii, wejście na lead magnet. Delegat łapie **wyłącznie** linki z `data-cta`. Kafel usługi to jedyne miejsce, gdzie klient deklaruje, czego chce, **zanim** dojdzie do formularza | `Services.tsx:52-55`, `uslugi/page.tsx:91`, `portfolio/page.tsx:121`, `PortfolioGallery.tsx:77-78` | S | 🤖 | Z (kod) |
| **PELNY2608-14** | [POMIAR] | Nie da się dziś powiedzieć, ile ruchu gubi baner zgody — a dane leżą w drugim narzędziu na tej samej stronie. `consent default` = `denied` dla wszystkich czterech sygnałów; kto zignoruje baner albo kliknie „Odrzuć", zostaje na `denied` na stałe. Przy wolumenie tej strony modelowanie behawioralne Google **nigdy się nie włączy** (progi rzędu tysięcy zdarzeń dziennie). `<Analytics />` (Vercel) nie jest bramkowany zgodą i liczy każdą odsłonę | `layout.tsx:108`, `:357` | S | 🌐 | Z (kod) |
| **PELNY2608-15** | [SEO] **[DECYZJA MARCINA — §10.3]** | Trzy anonimowe encje `ProfessionalService` bez `@id` obok encji głównej z `"@id": "…/#business"`: `provider` na ośmiu podstronach usług, `provider` na dziewięciu case studies, `mainEntity` na `/kontakt` — ta ostatnia dodatkowo z **inną nazwą firmy** („Marcin Szabunia" vs „Marcin Szabunia, fotograf eventowy i biznesowy") i bez adresu i godzin. Parser widzi dwie firmy o tej samej nazwie zamiast jednej, akurat na stronie, na której Google weryfikuje NAP | `uslugi/[slug]/page.tsx:96-100`, `portfolio/[slug]/page.tsx:97-101`, `kontakt/page.tsx:65-71` vs `layout.tsx:143` | S | 🧑 | Z (kod) |
| **PELNY2608-16** | [TECH] | `localStorage` bez `try/catch` w trzech miejscach, w tym w `ThemeProvider`, który opakowuje `{children}` całej aplikacji. W przeglądarce z zablokowanym zapisem danych witryny dostęp rzuca `SecurityError`, a poniżej nie ma żadnej granicy błędu. Ten sam plik `layout.tsx` owija dwa inne dostępy w `try/catch`, a `utm.ts:33` robi to dla `sessionStorage` — czyli to przeoczenie, nie decyzja | `ThemeProvider.tsx:30`, `:45`, `CookieConsent.tsx:11`, `:40`, `:46`, `layout.tsx:133` | S | 🤖 | Z (kod) |
| **PELNY2608-17** | [UX] | `aria-label="Przejdź do formularza kontaktowego"` przy widocznym tekście „Oferta" — dostępna nazwa nie zawiera widocznej etykiety. WCAG 2.1 SC 2.5.3 „Label in Name", poziom **A**. Użytkownik sterowania głosem mówi „kliknij Oferta" i nic się nie dzieje, a to jedyny stały przycisk konwersji na telefonie | `MobileFAB.tsx:80` vs `:86` | S | 🤖 | Z (kod) |
| **PELNY2608-18** | [UX] | Rozszczepiona ścieżka głównego CTA przy **identycznej etykiecie**: hero → `#kontakt` (scroll), navbar → `/kontakt` (przeładowanie). Ten sam rozjazd na każdej podstronie usług i case study. Dla pomiaru: `wycena_home_hero` i `wycena_navbar` opisują ten sam zamiar i kończą w dwóch ścieżkach, więc lejek nie sumuje się do jednej liczby. Wzorzec poprawny już istnieje w repo (`MobileFAB.tsx:58-64` sprawdza obecność celu przed przechwyceniem) | `Hero.tsx:127` vs `Navigation.tsx:138` | M | 🤖 | Z (kod + live) |
| **PELNY2608-19** | [UX] | Hero case study ma **dwa przyciski do tego samego celu** („Zapytaj o ofertę" + „Zapytaj o termin", oba `#kontakt`; na wideo „Zapytaj o podobną realizację" + „Zapytaj o ofertę"). Żaden z tych czterech nie ma `data-cta`, podczas gdy CTA ze środka strony ma `wycena_case`. Mierzycie środek strony, nie mierzycie pierwszego ekranu | `PortfolioHero.tsx:81-91`, `PortfolioVideoShowcase.tsx:68-79` | S | 🤖 | Z (kod) |
| **PELNY2608-20** | [UX] | `hover:text-white` bez prefiksu `dark:` na linku „polityką prywatności" w formularzu lead magnetu. W jasnym motywie daje biały tekst na `#F9FAFB` — **kontrast 1,05:1**, link znika dokładnie w chwili, gdy użytkownik na niego celuje. Bliźniaczy kod w `CTA.tsx:508` jest poprawny (`hover:text-navy dark:hover:text-white`). Dotyka też warstwy RODO: zgoda ma być świadoma, a dowód „gdzie to przeczytam" widoczny | `PoradnikForm.tsx:174` | S | 🤖 | Z (kod, ratio policzone) |
| **PELNY2608-21** | [UX] | Wrapper banera cookies jest przezroczysty, ale ma pełną szerokość ekranu i `z-50` bez `pointer-events-none` — przechwytuje kliknięcia w całym dolnym pasie, także poza kartą. Na desktopie 1920 px zostaje po ~576 px niewidzialnego pasa z każdej strony. Konkretna ofiara: `BackToTopButton` (`z-40`, `bottom-6 right-6`) jest nieklikalny na `/blog/[slug]`, dopóki baner nie zniknie | `CookieConsent.tsx:58`, `BackToTopButton.tsx:31` | S | 🤖 | Z (kod) |
| **PELNY2608-22** | [TREŚĆ] | FAQ cenowe sesji zespołowych powtarza tę samą informację dwa razy pod rząd, także w `FAQPage` JSON-LD: „…od 1 400 zł netto za dwie osoby, a każda kolejna osoba to 120 zł, przy dwóch wyretuszowanych zdjęciach na osobę. **Sesja zespołowa kosztuje 1 400 zł netto za dwie osoby, a każda kolejna osoba to 120 zł.** W cenie są dwa wyretuszowane zdjęcia na osobę…". Potwierdzone dosłownie na produkcji. Łagodniejsza wersja na `/uslugi/wizerunek-portrety` (to samo zdanie w pierwszym i ostatnim pytaniu) | `services.tsx:221` + `:224` sklejane przez `getPriceFaq()` (`:743`) | S | 🤖 | Z (live + kod) |
| **PELNY2608-23** | [TREŚĆ] | `llms.txt` podaje **10-15 min/os.**, cała reszta serwisu **5-15 min** (dwanaście miejsc: `services.tsx` ×6, `faq.ts`, `portfolio.ts` ×4, blog). To jedyny dokument, z którego asystenci AI cytują ofertę wprost. Przy 40 osobach dolna granica przesuwa się z 3,3 h na 6,7 h. Pochodna: `blog.ts:1526` i `:1546` mówią „4-6 osób na godzinę", co wynika z 10-15, nie z 5-15 | `public/llms.txt:43` | S | 🧑 | Z (live + kod) |
| **PELNY2608-24** | [TREŚĆ] | Druga kotwica cenowa fotografii produktowej: „…od 55 zł za sztukę przy większych seriach", w zdaniu, które nie mówi ani ile sztuk to „większe serie", ani że obowiązuje minimum 600 zł. Ta sama strona podaje niżej 600 zł. Klient kotwiczy się na 55 zł i czyta wycenę 600 zł jako podwyżkę. Decyzja z 04.08 brzmiała: jedna kwota „od" na usługę, bez drabinek | `blog.ts:1009` | S | 🧑 | Z (live + kod) |
| **PELNY2608-25** | [TREŚĆ] | Ten sam cytat klienta w dwóch cicho skróconych wersjach: pełna w `Testimonials.tsx:12` i `portfolio.ts:151`, skrócona w `services.tsx:809` bez żadnego oznaczenia skrótu. Na podstronie usługi wygląda jak pełny cytat, którym nie jest | `Testimonials.tsx:12`, `portfolio.ts:151` vs `services.tsx:809` | S | 🧑 | Z (kod) |
| **PELNY2608-26** | [TREŚĆ] | Drugi cytat został **przeredagowany, nie tylko skrócony**: zdanie sklejone przecinkiem przez wycięte zdanie środkowe, „zadbał o to, aby" zmienione na „zadbał, aby". Opinia jest publiczna w Google, więc dwie wersje da się porównać w minutę. `docs/zasady-tekstow.md` nazywa to wprost fałszowaniem cudzej wypowiedzi | `services.tsx:821` vs `Testimonials.tsx:19` | S | 🧑 | Z (kod) |
| **PELNY2608-27** | [BIZNES] | „Dron w cenie każdego pakietu" w `llms.txt:19`, podczas gdy komentarz w kodzie mówi dosłownie „fraza »w cenie« nie pada tu ani razu, a llms.txt mówi »+200 zł«", a podstrona pakietów stawia drona wśród elementów dopasowywanych do skali wydarzenia. `llms.txt` czytają asystenci AI i cytują wprost | `llms.txt:19` vs `services.tsx:553-554`, `:283` | S | 🧑 | Z (kod), rozstrzygnięcie N (potrzebny `cennik_2026_07_v3.md`) |
| **PELNY2608-28** | [SEO] | `ItemList` na `/portfolio` czyta **niefiltrowaną** tablicę (9 pozycji, w tym Box17 z `noindex`), podczas gdy widoczne kafle idą z listy po filtrze (8, w innej kolejności). Dane strukturalne opisują listę, której na stronie nie ma, i dają Googlebotowi ścieżkę odkrycia do strony świadomie ukrywanej | `portfolio/page.tsx:55` vs `portfolio.ts:673-674` | S | 🤖 | Z (kod + live) |
| **PELNY2608-29** | [UX] | `delay={0.08 * i}` liczone od indeksu w całej liście, nie w rzędzie. Przy 26 wpisach 26. karta ma `transition-delay: 2s` — użytkownik patrzy na puste białe miejsce 1,2–2,0 s. Wygląda jak zacinający się lazy-loading | `blog/page.tsx:70` + `AnimatedSection.tsx:50` + `globals.css:195-205` | S | 🤖 | Z (kod) |

### 5.2 P3 — higiena i ulepszenia

| ID | Obszar | Uwaga | Dowód | E | Owner | Pewność |
|---|---|---|---|---|---|---|
| **PELNY2608-30** | [TECH] | Brak `error.tsx` i `global-error.tsx` w App Routerze. Wyjątek w komponencie serwerowym daje niebrandowany ekran „Application error" — biała strona bez nawigacji, bez telefonu, bez CTA | `src/app/` (brak plików) | S | 🤖 | Z (kod) |
| **PELNY2608-31** | [TECH] | `blog/[slug]/page.tsx` nie ma **ani jednego** `ErrorBoundary` w 288 liniach, wbrew `CLAUDE.md §5` i `§11.10`. Wszystkie inne trasy trzymają wzorzec. Renderuje `BlogContent` z `dangerouslySetInnerHTML` i dziesięć `AnimatedSection` | `blog/[slug]/page.tsx` | S | 🤖 | Z (kod) |
| **PELNY2608-32** | [TECH] | Asymetryczny tryb awarii Turnstile: brak `NEXT_PUBLIC_TURNSTILE_SITE_KEY` przy obecnym sekrecie odrzuca **100% zgłoszeń** bez żadnego alarmu (widget nie renderuje się, formularz wysyła pusty token, serwer odrzuca). Odwrotny kierunek ma log `[ALERT]`. Zmienne `NEXT_PUBLIC_*` są wstrzykiwane przy buildzie, więc wystarczy literówka bez redeploya. Dziś klucz jest ustawiony (SSR renderuje „Ładowanie zabezpieczenia antybotowego…") | `turnstile.ts:10-20`, `TurnstileWidget.tsx:102`, `CTA.tsx:11` | S | 🤖 | Z (kod) · **P3 (P0, jeśli warunek zajdzie)** |
| **PELNY2608-33** | [POMIAR] | `contact_submit` liczy konwersję także wtedy, gdy serwer wyrzucił zgłoszenie do kosza — trasa przy wypełnionym honeypocie zwraca 200 i nie wysyła maila, a klient sprawdza tylko `res.ok`. Licznik w GA4 przestaje być uzgadnialny ze skrzynką. Wzorzec rozwiązania już istnieje w repo (`guideSent` w `/api/lead`) | `api/contact/route.ts:45-47` vs `CTA.tsx:96-98` | S | 🤖 | Z (kod) |
| **PELNY2608-34** | [POMIAR] | Mail z leadem nie zawiera ani strony wysyłki, ani strony wejścia. Formularz renderuje się na ośmiu typach stron, więc pytanie „która podstrona dowozi leady" nie ma odpowiedzi poza GA4 — a odpowiedź z GA4 jest zagrożona `PELNY2608-11`. Dwa niezależne pomiary zawodzą z tego samego powodu, czyli nie są niezależne | `api/contact/route.ts:136-147`, `mail.ts:51-58` | S | 🤖 | Z (kod) |
| **PELNY2608-35** | [POMIAR] | `UTM_KEYS` nie zna `wbraid` ani `gbraid`. Google Ads wysyła je **zamiast** `gclid` w kontekstach z ograniczeniami prywatności (ruch z aplikacji, część ścieżek iOS). Taki lead przychodzi bez bloku „Źródło" i w skrzynce wygląda dokładnie jak organiczny. Obciążenie jednostronne: zaniża Ads, zawyża organic | `lib/utm.ts:5-12`, `api/contact/route.ts:77`, `api/lead/route.ts:73` | S | 🤖 | Z (kod) |
| **PELNY2608-36** | [POMIAR] | `contact_submit` nie niesie `value` ani `currency`. Ads traktuje zapytanie o portret za 700 zł i o pakiet PRO MAX identycznie. Przy dzisiejszym wolumenie value-based bidding i tak nie ma sensu, ale historii nie dorobi się wstecz | `CTA.tsx:98` | S | 🤖 | Z (kod) |
| **PELNY2608-37** | [POMIAR/NAP] | Godziny otwarcia istnieją **wyłącznie** w JSON-LD (pon–pt 08:00–20:00, sob 10:00–16:00). Grep po godzinach w `src/components`, `src/app` i `llms.txt` daje trafienia tylko w tym jednym bloku. Klient nie wie, do której można dzwonić, a telefon jest głównym kanałem. Google oczekuje, że markup odzwierciedla treść widoczną | `layout.tsx:173-192` | S | 🧑 | Z (kod) |
| **PELNY2608-38** | [POMIAR] | Leniwy loader gtag.js (pierwsza interakcja albo `requestIdleCallback` z 6 s) systematycznie wycina z pomiaru najkrótsze wizyty. Kierunek błędu jednostronny: **wskaźnik zaangażowania i średni czas są zawyżone, odsłony zaniżone**. Uzasadnienie wydajnościowe jest w komentarzu i jest sensowne — nie proponuję cofać, proponuję **zapisać obciążenie** | `layout.tsx:125-128` | S | 🧑 | Z (kod) |
| **PELNY2608-39** | [SEO] | `/blog` ma tylko `BreadcrumbList`, bez `ItemList`. `/uslugi` i `/portfolio` zbudowane tym samym wzorcem mają obie. Google nie dostaje z `/blog` zamkniętej listy 26 artykułów | `blog/page.tsx:44` | S | 🤖 | Z (kod + live) |
| **PELNY2608-40** | [SEO] | `/poradnik` nie ma **żadnego** JSON-LD, jako jedyna z ośmiu tras statycznych. Jest w sitemapie z `priority: 0.7`, ma widoczne okruszki i 7 linków wewnętrznych | `poradnik/page.tsx` | S | 🤖 | Z (kod + live) |
| **PELNY2608-41** | [UX] | Kontrast poniżej 4,5:1 w trybie ciemnym w dwóch miejscach z obniżoną alfą: `dark:text-dark-text-muted/60` → **3,39:1**, `/70` → **4,21:1**, oba przy 12 px. Reszta serwisu trzyma ten sam token bez alfy i wychodzi 7,46:1 | `blog/[slug]/page.tsx:139`, `poradnik/page.tsx:162` | S | 🤖 | Z (kod, ratio policzone) |
| **PELNY2608-42** | [UX] | Na `/kontakt` najmocniejszy przycisk nad formularzem („Oferta dla firm →", pełny gradient, `btn-glow`) prowadzi **poza stronę konwersji**, na `/uslugi`. Na telefonie to ostatnia rzecz przed formularzem. `/kontakt` to cel przekierowania `/kalkulator` i jedyna strona lejka bez `MobileFAB` | `kontakt/page.tsx:161-166` | S | 🧑 | Z (kod + live) |
| **PELNY2608-43** | [UX] | Karty bloga mają nierówne wysokości w rzędzie: rozciąga się `AnimatedSection` (wrapper), a `BlogCard` ma wysokość treści. Tytuły od 1 do 3 linii bez clampa → rozjazd ~40 px. Reszta serwisu robi to poprawnie; ta sama karta jako bezpośrednie dziecko gridu na `/uslugi/[slug]` ma równą wysokość | `BlogCard.tsx:17-19`, `blog/page.tsx:70-72`, `BlogPreview.tsx:43-45` | S | 🤖 | Z (kod) |
| **PELNY2608-44** | [UX] | Linki nawigacji desktop mają cel ~16 px wysokości (`text-[13px]`, zero paddingu pionowego, `gap-3`) — poniżej progu 24×24 px z WCAG 2.2 SC 2.5.8. Wyjątek „Spacing" nie ratuje przy 12 px odstępu. W tym samym pliku wordmark dostał `min-h-[24px]` dokładnie z tego powodu; poprawka ominęła same linki | `Navigation.tsx:110` | S | 🤖 | Z (kod, wysokość policzona) |
| **PELNY2608-45** | [UX] | Liczniki „mrugają": SSR renderuje wartość końcową, obserwator odpala się przy 30% widoczności (czyli gdy liczba **jest już na ekranie**), stan skacze na 0 i animuje w górę. Widać „250 000+ → 0+ → 250 000+". Dotyczy strony głównej i wszystkich ośmiu podstron usług | `CountUp.tsx:66`, `:13`, `:24` | S | 🤖 | Z (kod) |
| **PELNY2608-46** | [UX] | Cała treść poza hero ma `opacity: 0` do momentu hydratacji (81 wystąpień `AnimatedSection`). Przy zablokowanym JS albo nieudanym pobraniu chunku użytkownik widzi hero i pustą stronę, w tym pusty formularz. Zero `<noscript>` w repo. Googlebot renderuje JS, więc SEO nie cierpi | `globals.css:195`, `AnimatedSection.tsx:28,35,49` | M | 🤖 | Z (kod) |
| **PELNY2608-47** | [TREŚĆ] | Meta-obietnica `/galeria` rozjeżdża się w obie strony: `description` obiecuje „sesje zespołowe" (tej kategorii tam nie ma), a widoczne zdanie wprowadzające i opis `ImageGallery` pomijają zakładkę „Wnętrza, hale i obiekty", która istnieje. Snippet w Google obiecuje coś, czego nie ma, strona nie zapowiada tego, co ma | `galeria/page.tsx:26`, `:151`, `:170` | S | 🤖 | Z (live + kod) |
| **PELNY2608-48** | [TREŚĆ] | `/kontakt` wymienia w akapicie i w `description` JSON-LD **pięć usług z ośmiu** — bez drona i bez linii obiektowej. Lista rozwijana w formularzu tuż niżej ma komplet. Akapit i formularz mówią co innego na tej samej stronie, na którą trafia ruch płatny | `kontakt/page.tsx:103-107`, `:63-64` | S | 🤖 | Z (live + kod) |
| **PELNY2608-49** | [TREŚĆ] | „Zdjęcia, film i ujęcia z drona **robię sam**" renderuje się na każdej podstronie usługi, w tym na eventowej i pakietowej, gdzie FAQ mówi „przy dużym evencie biorę drugiego operatora". Kwalifikacja w FAQ jest uczciwa; zdanie wyżej brzmi absolutnie | `ServiceAuthor.tsx:56` vs `services.tsx:175`, `:284` | S | 🧑 | Z (kod) |
| **PELNY2608-50** | [TREŚĆ] | Trzy mnożniki LinkedIn („21x więcej wyświetleń profilu", „36x wiadomości", „9x zaproszeń") bez wskazania źródła. Akapity obok hedgują („traktuj jako rząd wielkości"), ale źródło nie pada, a te liczby krążą po sieci bez dającej się wskazać publikacji LinkedIna. Wpis jest kandydatem do featured snippet | `blog.ts:143-145` | S | 🧑 | Z (kod) |
| **PELNY2608-51** | [TREŚĆ] | „W 48h dostajesz galerię online" to jedyne miejsce w serwisie, gdzie 48h znaczy termin dostarczenia galerii — wszędzie indziej to próg ekspresu (+50%) albo próg odwołania. Termin nie występuje ani w `Warunki.tsx`, ani w `llms.txt`, ani w FAQ. `Process` renderuje się na stronie głównej i na `/galeria` | `Process.tsx:36` | S | 🧑 | Z (kod) |
| **PELNY2608-52** | [TREŚĆ] | Przycisk „Zobacz portfolio" na `/poradnik` prowadzi do `/galeria`. To dwie osobne trasy o różnej funkcji, a klient po lead magnecie to najcieplejszy ruch, jaki ta strona ma | `poradnik/page.tsx:174` | S | 🤖 | Z (kod) |
| **PELNY2608-53** | [PRAWO] | Polityka prywatności nie wymienia arkusza CRM (Google Apps Script / Sheets) wśród odbiorców danych z formularzy. Dziś bez skutku, bo zmienne webhooka nie są ustawione na produkcji i `pushToCrm` to no-op. **Problem jest uśpiony:** w dniu, w którym ktoś doda dwie zmienne w Vercelu, treść wiadomości klienta zacznie trafiać do Google Sheets bez słowa w polityce | `crm.ts:15-25` vs `polityka-prywatnosci/page.tsx:126-135` | S | 🧑 | Z (kod) · **P3 (P1, gdy zmienne zostaną ustawione)** |
| **PELNY2608-54** | [TECH] | `/galeria` jest renderowana dynamicznie na każde żądanie przez odczyt `searchParams`, więc nie leży na CDN-ie jako gotowy HTML. Parametr `kat` jest poprawnie ograniczony białą listą, więc od strony bezpieczeństwa czysto. TTFB niezmierzone | `galeria/page.tsx:51-56`, `galleryImages.ts:108-129` | M | 🤖 | Z (kod), TTFB: N |
| **PELNY2608-55** | [TECH] | Cztery niezależne implementacje tego samego lightboxa; dwie wersje przywracania scrolla są rozjechane (zapamiętane `prevOverflow` vs wpisanie `""` na sztywno). `PortfolioGallery` jest jedynym konsumentem `framer-motion` w całym repo | `GalleryView.tsx:145-158`, `ServiceGalleryLightbox.tsx:52-65`, `PortfolioGallery.tsx:46-58`, `ServiceVideoGrid.tsx:47-58` | M | 🤖 | Z (kod) |

### 5.3 P4 — kosmetyka i ślady w kodzie

| ID | Obszar | Uwaga | Dowód | Owner | Pewność |
|---|---|---|---|---|---|
| **PELNY2608-56** | [TECH] | `CLAUDE.md` rozjeżdża się ze stanem repo w czterech miejscach: (1) `:12` twierdzi, że grep na starą domenę daje zero trafień — daje **dwa** (`origin.ts:17-18`, przy okazji martwe, bo `next.config.ts` przekierowuje ten host); (2) `:58` mówi „46 komponentów", jest **48**; (3) stopka `:320` mówi „ostatnia aktualizacja 2026-07-30", a §9 zawiera decyzje z 04 i 05.08; (4) `:239-241` twierdzi „kolejność kart usług NADAL ma portrety pierwsze" — portrety są **piąte** (zweryfikowane live na `/uslugi`) | `CLAUDE.md:12`, `:58`, `:239-241`, `:320` | 🧑 | Z (kod + live) |
| **PELNY2608-57** | [SEO] | Kanał RSS nieodkrywalny: `blog/page.tsx:17` ustawia `alternates: { canonical }`, co w Next.js **zastępuje** cały obiekt `alternates` rodzica, nie scala. Autodiscovery znika z `/blog`. Trasa działa (200), ale nikt jej nie znajdzie | `layout.tsx:36-38` vs `blog/page.tsx:17` | 🤖 | Z (kod + live) |
| **PELNY2608-58** | [SEO] | RSS sortuje i datuje po `date`, a lista `/blog` po `updated`. `lastBuildDate` = 28.06.2026 przy treści zmienianej 29.07 i później — agregatory uznają kanał za nieaktywny. Dwa różne „najnowsze" w tym samym serwisie | `feed.xml/route.ts:21-23`, `:32`, `:39-41` | 🤖 | Z (kod) |
| **PELNY2608-59** | [SEO] | Strona 404 ma `follow: false` przy czterech linkach ratunkowych. `noindex` poprawny, `nofollow` odcina jedyne wyjście z martwego adresu — niepotrzebnie przy trwających przekierowaniach ze starej domeny | `not-found.tsx:9` | 🤖 | Z (kod) |
| **PELNY2608-60** | [TECH] | Komentarz nad `Cache-Control` nadal uzasadnia `immutable`, którego w wartości już nie ma (`must-revalidate` od 04.08). Zmiana weszła, komentarz został przy poprzednim założeniu — tym samym, którego złamanie było powodem całej tury zmiany nazw plików | `next.config.ts:46-53` | 🤖 | Z (kod) |
| **PELNY2608-61** | [TECH] | Cztery komentarze w `services.tsx` i `ServiceHero.tsx` opisują nieistniejący stan (kwoty 120/1 100 zł, „llms.txt mówi +200 zł", nieistniejący cross-link z podstrony obiektowej, przykład etykiety bez „netto"). Będą wprowadzać w błąd kolejne tury | `services.tsx:44-46`, `:493-494`, `:554`, `ServiceHero.tsx:15` | 🤖 | Z (kod) |
| **PELNY2608-62** | [TECH] | `TrustStats` to martwy komponent: importowana jest wyłącznie stała `TRUST_STATS`, sam eksport domyślny nie renderuje się nigdzie (jedyne `<TrustStats />` siedzi w komentarzu). Kod sam to odnotowuje. Jedyny taki przypadek w 48 komponentach | `TrustStats.tsx:16` | 🧑 | Z (kod) |
| **PELNY2608-63** | [TECH] | Martwy blok `NEXT_PUBLIC_ANALYTICS_URL` z komentarzem zapraszającym do ustawienia zmiennej, której skrypt i tak zablokuje CSP. Plus relikt `data-domain` po Plausible | `layout.tsx:339-346`, `next.config.ts:17` | 🤖 | Z (kod) |
| **PELNY2608-64** | [TECH] | `isAllowedOrigin` odrzuca formularze na każdym preview deploymencie Vercela (`NODE_ENV` też ma tam wartość `production`, a host `*.vercel.app` nie jest na liście). Skutek wyłącznie procesowy: formularza nie da się przetestować end-to-end przed produkcją | `lib/origin.ts:14-19`, `:32` | 🤖 | Z (kod) |
| **PELNY2608-65** | [TECH] | CSP bez dyrektywy `frame-ancestors` (osłonę daje starszy `X-Frame-Options`, więc realnej luki nie ma). `Permissions-Policy` z trzema dyrektywami, bez `payment=()`, `usb=()`, `browsing-topics=()`. `name` trafia do tematu maila bez usunięcia znaków nowej linii | `next.config.ts:15-30`, `:62-64`, `api/contact/route.ts:57` | 🧑 | Z (kod) |
| **PELNY2608-66** | [UX] | Drobiazgi dostępności i spójności: `aria-label` na `<div>` bez roli (ignorowany), baner cookies deklaruje `role="dialog"` bez `aria-modal`, fokusu i Escape, dwa nakładające się obszary `aria-live` w karuzeli opinii, zwinięte FAQ zostaje w drzewie dostępności (`opacity:0` nie usuwa jak `display:none`), `.page-transition` nie istnieje w CSS, `Warunki` otwierają sekcję `h3` zamiast `h2`, chip telefonu na podstronach usług ~21 px, strzałka „→" na przyciskach 3,89:1 (dekoracja, brakuje `aria-hidden`), miniatura wpisu z `alt` z tytułu zamiast opisu kadru, „Opinia Google" raz wielką raz małą literą, kafel-sierota na `/portfolio` (8 pozycji w siatce 3-kolumnowej), `MobileFAB` i `BackToTopButton` renderują się na każdy piksel scrolla mimo istnienia `useScrolledPast` | `GalleryView.tsx:184`, `CookieConsent.tsx:56-58`, `Testimonials.tsx:156,172-177`, `FAQ.tsx:86-99`, `PageTransition.tsx:3`, `Warunki.tsx:23`, `ServiceHero.tsx:112`, `Hero.tsx:132` i 6 innych, `blog/[slug]/page.tsx:159`, `portfolio/page.tsx:84`, `MobileFAB.tsx:14`, `BackToTopButton.tsx:14` | 🤖 | Z (kod) |

---

## 6. Hipotezy do sprawdzenia (H)

Rzeczy, które wyglądają na problem, ale nie mają dowodu. **Nie są findingami.** Każda z krokiem weryfikującym i narzędziem.

| # | Hipoteza | Krok weryfikujący | Kto |
|---|---|---|---|
| **H1** | Przekierowania ze starej domeny mogą być **302, nie 301/308**. `next.config.ts:110` ustawia `permanent: true` (→308), ale warstwa pobierania raportowała 302 przy czterech testach. Jeśli 302 jest prawdziwe, osiem lat historii `marcinszabunia.pl` nadal nie przenosi się na `szabunia.pl` | `curl -sI https://marcinszabunia.pl/portrety-biznesowe` — pierwsza linia odpowiedzi i nagłówek `Location`. Alternatywnie GSC → Sprawdzenie URL → „Testuj URL na żywo" | 🧑 / 🌐 |
| **H2** | `www.szabunia.pl` może serwować **200 zamiast przekierowania**. Ryzyko ograniczone, bo `metadataBase` wymusza kanoniczne non-www na każdej stronie | `curl -sI https://www.szabunia.pl/` — czy 308 z `Location`, czy 200 | 🧑 |
| **H3** | Mapa starych adresów mogła powstać z założeń, nie z eksportu realnych URL-i. W indeksie widać `/home`, którego nie ma w mapie (łapie catch-all), a mapa ma `/strona-glowna`, którego nie widać nigdzie | Eksport listy adresów ze starej usługi w GSC (`marcinszabunia.pl`, Strony → Niezindeksowane + Skuteczność → Strony, okno 16 miesięcy) albo lista stron z panelu Adobe Portfolio | 🌐 / 🧑 |
| **H4** | Indeks Google dla strony głównej może być sprzed repozycjonowania z 30.07 (wyszukiwarka zwraca stary tytuł). Sześć dni to normalne opóźnienie, ale sitemapa mówi Google, że nic się nie zmieniło od 29.07 (`PELNY2608-10`) | GSC → Sprawdzenie URL dla `https://szabunia.pl/` → data ostatniego indeksowania i „Wersja zindeksowana"; porównać z datą deployu 05.08 09:27 UTC | 🌐 |
| **H5** | CSP może blokować ruch GA4 do Google Ads (remarketing, Sygnały Google) — patrz `PELNY2608-12`. **Nie zweryfikowałem, bo wymagałoby to kliknięcia „Akceptuję" na banerze zgody, czyli działania w imieniu Marcina** | Chrome → `szabunia.pl` → „Akceptuję" → DevTools → Console → szukać `Refused to connect to 'https://stats.g.doubleclick.net/…'`. Obecność komunikatu potwierdza, brak przy włączonych Sygnałach obala | 🧑 |
| **H6** | Sygnały Google mogą być wyłączone, przez co `PELNY2608-12` jest bezprzedmiotowy | GA4 → Administracja → Zbieranie danych → Zbieranie danych o sygnałach Google — status | 🌐 |
| **H7** | Enhanced Measurement może już dostarczać `form_start` i `form_submit` automatycznie. Formularz jest prawdziwym `<form onSubmit>`, a `preventDefault()` nie tłumi obserwacji | GA4 → Administracja → Strumienie danych → Pomiar zaawansowany → przełącznik „Interakcje z formularzami". Alternatywnie: Administracja → Zdarzenia, szukać obu nazw z 28 dni | 🌐 |
| **H8** | Zgoda udzielona po pierwszym `page_view` może gubić przypisanie źródła całej sesji (`consent update` nie powtarza `page_view`) | GA4 → DebugView; wejść na `szabunia.pl/?utm_source=test&gclid=TEST&debug_mode=1`, zaakceptować baner, wysłać formularz testowy, sprawdzić `session_source` w `contact_submit` | 🌐 |
| **H9** | Token `--font-inter` w `@theme inline` odwołuje się do samego siebie (`--font-inter: var(--font-inter), "Inter", sans-serif`) i przy pewnym wyjściu Tailwinda v4 mógłby wpaść w cykl, spychając body na fallback. Nagłówki (`font-barlow`) są bezpieczne niezależnie od rozstrzygnięcia | DevTools → `<body>` → Computed → `font-family`. Wartość z prefiksem `__Inter_` = self-hosting działa; samo `Inter` bez hasha = nie działa | 🧑 |
| **H10** | `getClientIp` bierze pierwszy wpis z `x-forwarded-for` zamiast `x-real-ip`. Jeśli platforma dokleja swój adres zamiast nadpisywać, klucz limitu jest sterowany przez klienta | 20 żądań POST na `/api/contact` z rotowanym `X-Forwarded-For` i celowo złym `email`. Jeśli 429 nie pada ani razu — potwierdzone | 🧑 |
| **H11** | Sprzedaż dwóch osób może być dziś dwoma produktami w tej samej cenie: PORTRET START 700 × 2 = 1 400 = sesja zespołowa za dwie osoby. Zdanie „im większy zespół, tym niżej schodzi kwota za osobę" staje się prawdziwe dopiero od trzeciej osoby | Przeliczyć oba warianty na `cennik_2026_07_v3.md §1` i `§6` i zdecydować, czy próg zespołowy ma zaczynać się od trzech osób, czy zdanie ma dostać zastrzeżenie | 🧑 |
| **H12** | Sesja zespołowa dwuosobowa może nie zamykać się rentownie: 1 400 zł minus prowizja Useme 13,35% = 1 212,90 zł; przy bloku stałym ~7,5 h daje ok. **162 zł/h**, poniżej 211 zł/h, którym uzasadniono pozycję tej usługi w kolejności | Przeliczyć blok stały dla n=2 na realnym harmonogramie i sprawdzić, czy nota o 211 zł/h nadal opisuje tę usługę po zmianie z 05.08 | 🧑 |
| **H13** | `getPriceFaq` może produkować powtórzenia także na pozostałych sześciu podstronach usług (potwierdzone na dwóch) | Złożyć ręcznie `priceFaqIntro + price + priceFaqSuffix + pricingBlurb` dla wszystkich ośmiu i porównać zdanie po zdaniu | 🤖 |
| **H14** | Numer telefonu może wypadać poniżej folda na telefonie (hero mobile: nagłówek → opis → zdjęcie `aspect-square` na pełną szerokość → chipy → CTA; szacunek dla 390×844 stawia chipy na ~713 px) | Chrome device toolbar 390×844 i 375×667: `document.querySelector('[data-cta="tel_hero"]').getBoundingClientRect().top` vs `window.innerHeight` | 🧑 |
| **H15** | `scrollHeight` mobile nieznany. Desktop zmierzony (11,4 ekranu przy progu 15). Dla mobile próg to 20 ekranów, a poprzednia seria pomiarowa szła 21 267 → 16 274 → 13 184 px przy 606 px | Chrome przy 390 px i 606 px: `document.documentElement.scrollHeight` + rozbicie per sekcja. **Uwaga: pomiar w widocznym oknie**, nie w zminimalizowanym | 🧑 |

---

## 7. Obserwacje bez akcji

- **Chip „Wolne terminy: 1–3 tyg."** (`Hero.tsx:96`, `CTA.tsx:163`) stoi praktycznie wszędzie i jest wpisany na sztywno. Jest dobry sprzedażowo i nie proponuję go usuwać — ale nikt go nie pilnuje. W tygodniu, w którym kalendarz jest pełny na sześć tygodni, strona nadal obiecuje trzy. Sugestia: przegląd tego chipa w rutynie miesięcznej, obok podnoszenia `SITE_UPDATED`.
- **Sekcja „Gdzie trafiły moje zdjęcia"** zapowiada pięć kanałów („reklamy drukowane, outdoor, katalogi, międzynarodowa prasa branżowa, przewodnik Michelin"), a pokazuje dwie karty. Nagłówek brzmi „Gdzie trafiły moje zdjęcia", więc czytelnik ma prawo oczekiwać kompletu. Do rozważenia trzecia karta (Artech ma dane w `portfolio.ts:270`) albo skrócenie zdania. `O` — sąd o oczekiwaniach, nie ustalenie.
- **„Chcesz zobaczyć więcej?"** na stronie głównej (`Portfolio.tsx:122-131`) wygląda jak piąty kafel portfolio, a prowadzi do formularza. Decyzja „lejek bez bocznych wyjść" jest udokumentowana i jej nie kwestionuję — kwestionuję napis, który obiecuje co innego niż robi. `O`.
- **`Footer` jest komponentem klienckim** z powodu dwóch handlerów `onClick` na 131 liniach. Mieści się w `CLAUDE.md:108`, więc formalnie nie jest naruszeniem. Wydzielenie dwóch mikro-komponentów ma sens tylko, jeśli pomiar bundle'a po `npm run build` pokaże, że to warte roboty. `O` + N.
- **Cztery nazwy w `hasOfferCatalog` nie zgadzają się z `title` w `services.tsx`** („Fotografia biznesowa i portretowa" vs „Wizerunek & Portrety"). To osobna decyzja nazewnicza, nie błąd — JSON-LD może celowo używać nazw opisowych zamiast marketingowych.
- **`theme-color` idzie za preferencją systemu, a motyw strony za `localStorage`.** U użytkownika z ciemnym systemem, który nie kliknął przełącznika, pasek adresu jest ciemny, a strona jasna. Efekt kosmetyczny, widoczny na Androidzie i w Safari na iOS.

---

## 8. Świadomie NIE ruszamy

Lista chroni przed „przy okazji". Wszystkie pozycje potwierdzone jako **zamknięte decyzje**, nie przeoczenia.

- **Box17 w `DRAFT_SLUGS`** — decyzja Marcina z 04.08 mimo kompletu zdjęć. Warunek publikacji ma podać Marcin; do tego czasu nie proponować publikacji. (Nadal otwarte: sam warunek, w kodzie stoi `TODO (Marcin)`.)
- **Brak publicznego cennika i kalkulatora** — depricing z 23.07, `/kalkulator` → 301 → `/kontakt` (zweryfikowane live). Nie odbudowywać.
- **Brak linku do Instagrama w `About.tsx`** — decyzja Marcina z 04.08 („ze strony głównej usuń przejście na Instagram"). Nie przywracać.
- **`sameAs` bez LinkedIn i Facebooka** — decyzja D z 09.06. Profil FB istnieje i ma ~1,4 tys. obserwujących, ale to otwarty temat linkowania, nie błąd.
- **`aggregateRating` i `review[]` usunięte** z JSON-LD — zgodnie z wytycznymi Google o opiniach na własnej stronie. Potwierdzone w żywym HTML: nie występują.
- **`priceRange` usunięty** — zgodne z modelem „cena na zapytanie".
- **H1 strony głównej jako fraza, hasło „REALIZUJĘ CELE TWOJEJ MARKI" na `h2`** — świadoma zmiana z 30.07. Hierarchia pozostaje poprawna.
- **Slug `/blog/foto-wideo-dron-z-jednego-wejscia`** zostaje mimo wycofania żargonu — jest zaindeksowany.
- **`font-barlow` jako alias Intera** — decyzja z 23.07, naturalny ogonek „Ę".
- **Kolejność kart usług** — zmieniona 04.08 i świadoma. **Uwaga:** `CLAUDE.md §9` nadal opisuje stan sprzed tej zmiany, patrz `PELNY2608-56`.
- **Leniwy loader gtag.js** — świadomy trade-off wydajnościowy, opisany w komentarzu. Nie cofać, tylko zapisać obciążenie danych (`PELNY2608-38`).
- **Brak `MobileFAB` na `/kontakt`** — świadome, udokumentowane w kodzie.
- **`Cache-Control` z `max-age=31536000`** — nie skracać. Zmiana `immutable` → `must-revalidate` z 04.08 była świadomym ubezpieczeniem, nie pełnym rozwiązaniem.

---

## 9. Czego NIE sprawdzono (i co jest potrzebne)

| Obszar | Powód | Czego potrzeba |
|---|---|---|
| **Core Web Vitals (LCP, CLS, INP), osobno mobile i desktop** | Brak PSI i Lighthouse w tym środowisku. Zgodnie z metodyką §4 **nie zgaduję** — to szósty audyt z rzędu bez tej liczby | `pagespeed.web.dev` dla `/`, `/uslugi/eventy-reportaze`, `/galeria`, mobile i desktop. Wkleić LCP, CLS, TBT i element LCP do `POMIARY-2026-08-05.md`. **3 minuty** |
| `npm run lint` (0/0), `npx tsc --noEmit`, `npm run build` | Kopia repo w kontenerze bez `node_modules`; `next build` w sandboksie pada z Bus error (binarki macOS) | Uruchomienie u Marcina, wynik do rejestru findingów |
| Waga plików źródłowych, wymiary obrazów, norma OG 26–49 kB, źródła ≤ ~2000 px | Folder `public/images/` nie był stagowany do kontenera | `find public/images -size +1M -exec ls -lh {} \;` oraz `sips -g pixelWidth` u Marcina |
| 14 z 26 obrazów OG bloga | Sprawdzone 12 z 26, wszystkie 200. Ryzyko niskie (to wpisy sprzed czerwca) | `ls public/images/og/blog/ \| wc -l` — powinno być 26 |
| Nagłówki HTTP przekierowań (kody statusu), `x-vercel-cache`, `age` | Odczyt przez `fetch` z `redirect:'manual'` daje `opaqueredirect` bez kodu; `curl` poza zakresem | `curl -sI` dla `marcinszabunia.pl/portrety-biznesowe`, `www.szabunia.pl/`, `szabunia.pl/kalkulator` (H1, H2) |
| **Google Ads: cały moduł** (koszt, CTR, CPC, wykluczenia z kwotami za 90 dni, Quality Score, sitelinki, landing pages, zgodność reklam z cennikiem po zmianach 04-05.08) | Brak dostępu do panelu | Osobna sesja z otwartym panelem. Priorytet: **Cele → Podsumowanie → Konwersje** (co jest zaimportowane, czy „Kampanie 0 z 1") — to warunek startu `PELNY2608-05` |
| **GA4:** lista zdarzeń z 28 dni, Pomiar zaawansowany (zmiany strony na zdarzeniach historii, interakcje z formularzami), filtr ruchu wewnętrznego, źródła sesji, strony wejścia | Brak dostępu | Administracja → Zdarzenia (28 dni) · Strumienie danych → Pomiar zaawansowany · Definiowanie ruchu wewnętrznego + Filtry danych (czy „Aktywny", nie „Testowanie") |
| **Rozmiar niedomierzenia przez zgodę** | Wymaga dwóch paneli naraz | Ten sam zakres dat (sugestia: 01–31.07.2026): Vercel → Analytics → Page Views **oraz** GA4 → Strony i ekrany → Wyświetlenia. Iloraz = górne oszacowanie |
| **GSC:** indeksacja z powodami, skuteczność, top zapytania, zgłoszenie sitemapy, zgłoszenie zmiany adresu, weryfikacja obu usług | Brak dostępu | Panel GSC. **Sprawdzić datę danych raportu przed użyciem** — historycznie był nieaktualny o miesiąc i unieważnił cały plan działań |
| **Profil Firmy w Google:** nazwa, telefon, adres witryny, godziny, kategoria, obszar działania | Brak dostępu | GBP. Skonfrontować godziny z `layout.tsx:173-192` (pon–pt 08:00–20:00, sob 10:00–16:00) i z harmonogramem reklam w Ads |
| Weryfikacja JSON-LD w Rich Results Test | Narzędzie zewnętrzne, nie odpalone | `search.google.com/test/rich-results` dla `/`, `/kontakt` (czy widzi **dwie** encje `ProfessionalService` — `PELNY2608-15`), `/uslugi/eventy-reportaze`, `/portfolio` |
| `scrollHeight` mobile, rozbicie px per sekcja, realne wysokości celów dotykowych | Pomiary z kodu i z klas Tailwind, nie z renderu. Okno pomiarowe było `visibilityState: hidden` | Chrome device toolbar w **widocznym oknie**, snippety z H14 i H15 |
| Zachowanie czytnika ekranu przy zwiniętym FAQ, nawigacja klawiaturą end-to-end, dark mode wizualnie na 11 trasach | Wymaga interakcji i AT; kod ma poprawne wzorce | NVDA + Firefox / VoiceOver + Safari; przejście Tabem przez `/`, `/uslugi/eventy-reportaze`, `/galeria` z otwarciem lightboxa |
| Konsola przeglądarki na całej ścieżce, w tym blokady CSP po udzieleniu zgody | **Wymagałoby kliknięcia „Akceptuję" na banerze, czyli działania w imieniu Marcina.** Audyt zatrzymuje się przed działaniem | Marcin osobiście, patrz H5 |
| Treść PDF-a poradnika vs ośmiopunktowa rozpiska na `/poradnik` | Plik nie był stagowany | Otworzyć `public/poradnik-przygotowanie-do-sesji.pdf` i porównać z `poradnik/page.tsx:53-86` (deklaruje „Cztery strony A4") |
| `cennik_2026_07_v3.md` | Poza stagowanym zakresem (tylko `05_Strona_WWW/`) | Rozstrzyga trzy pozycje: dron w pakietach (`PELNY2608-27`), stawka 55 zł/szt. (`PELNY2608-24`), próg wejścia do sesji zespołowej (H11) |

---

## 10. Pozorne problemy skorygowane w trakcie audytu

Ta sekcja jest obowiązkowa i buduje wiarygodność raportu. Cztery findingi zgłoszone przez subagentów **nie przeżyły weryfikacji**.

**1. „`/kalkulator` bez parametru oddaje stronę sprzed depricingu, z cennikiem sprzed wersji v3" (moduł A, zgłoszone jako hipoteza P1).**
Subagent widział pod tym adresem stronę z H1 „Kalkulator wyceny", menu z pozycjami „Cennik" i „Kalkulator" oraz sześcioma kwotami, z których pięć nie zgadza się z cennikiem v3. **Werdykt: FAŁSZ jako problem.** Sprawdzenie `fetch('/kalkulator', {redirect:'manual'})` w kontekście otwartej strony na produkcji zwraca `type: "opaqueredirect"` — przekierowanie działa. To był snapshot z warstwy pobierania po stronie agenta, nie stan produkcji. **Wniosek metodyczny: warstwa pobierania agenta nie jest wiarygodnym źródłem dla odczytów live w tym projekcie.** Ten sam mechanizm dał w tej sesji jeszcze trzy fałszywe obserwacje (blog z 13 wpisami, `/uslugi/sesje-zespolowe` z tabelą „150 zł/os." sprzed depricingu, ósma usługa raz 404 raz 200). Do zapisania w metodyce.

**2. „Liczby dowodu społecznego renderują się w SSR jako »0+«" (moduł C, zgłoszone jako `SEO2608-07`, P3).**
Subagent przeczytał `CountUp.tsx:13` (`useState(0)`) i wywnioskował, że HTML z serwera zawiera „0+ wykonanych zdjęć". **Werdykt: FAŁSZ.** Linia 66 brzmi `{(started ? count : end).toLocaleString("pl-PL")}` — przy `started === false`, czyli dokładnie w SSR, renderuje `end`. Potwierdzone odczytem żywego HTML: `<span>250 000<!-- -->+</span>` i `<span>8<!-- -->+</span>`. Crawlery bez renderowania JS widzą prawidłowe liczby. **Wniosek metodyczny: jedna linia stanu nie wystarcza — trzeba przeczytać miejsce, w którym stan jest renderowany.** Moduł A złapał to poprawnie w swojej sekcji „sprawdzone i OK", co pokazuje wartość rozdzielenia modułów między niezależnych agentów.
*Uwaga:* konsekwencja tego samego kodu **po stronie klienta** jest realna i została zapisana jako `PELNY2608-45` (mrugnięcie zerem po wejściu w widok). Fałszywy był tylko wniosek o SSR.

**3. „Przekierowania ze starej domeny to 302, nie 308" (moduł C, H1).**
Zostawione jako hipoteza, nie ustalenie — słusznie. Etykieta „302 Found" pochodziła z tej samej warstwy pobierania, która oddawała stare snapshoty, więc nie jest dowodem na kod odpowiedzi produkcji. `next.config.ts:110` ustawia `permanent: true`, co w Next.js daje 308. **Do rozstrzygnięcia jednym `curl -sI`** — pozostaje w §6 jako H1.

**4. „Brak snippetów pomiarowych w HTML produkcyjnym" (moduł D, zgłoszone i samodzielnie wycofane).**
Subagent modułu D wykrył to sam i **nie wpuścił do raportu**, wykonując test kontrolny na JSON-LD, o którym wiedział, że jest w kodzie. Werdykt potwierdzony niezależnie: żywy HTML zawiera `G-MD8FJ0CZG3`, `googletagmanager.com/gtag/js`, blok `consent default` i osiem bloków `application/ld+json`. To jest wzorcowe zastosowanie zasady twardej nr 3 z metodyki i warto to odnotować jako dobrą praktykę, nie tylko jako uniknięty błąd.

---

## 11. Plan działania

### 11.1 Kolejność wdrożenia (nie ważność)

1. **(P1, 2 min)** Zmień `quality={78}` na `quality={80}` w `ServiceAuthor.tsx:37` → portret autora wraca na ośmiu podstronach usług. Najwyższy stosunek efektu do nakładu w całym audycie.
2. **(P1, decyzja + 15 min)** Przejrzyj trzy rozjazdy warunków handlowych i zdecyduj o brzmieniu: `blog.ts:373` (pogoda przy dronie), `blog.ts:179` i `:469` (próg dwóch osób), `faq.ts:44` (zmiana terminu) → `PELNY2608-02`, `-03`, `-04`.
3. **(P1, panel)** Sprawdź w Google Ads, co jest zaimportowane jako konwersja. **To warunek startu dla `PELNY2608-05`** — bez tego dołożenie `generate_lead` może pogorszyć stan.
4. **(P2, 3 min)** Podnieś `SITE_UPDATED` na `2026-08-05` → Google dostaje sygnał, że ceny się zmieniły. Zrób to **przed** kolejnym deployem, nie po.
5. **(P2, plik)** Wygeneruj `og/uslugi/wnetrza-obiekty-architektura.png` (1200×630) tym samym skryptem co pozostałe siedem.
6. **(P2, decyzja)** JSON-LD: ósmy `Offer` w `hasOfferCatalog` + trzy `provider`/`mainEntity` na referencję `@id`. Jeden brief, dwie zmiany, obie za zgodą (`§10.3`).
7. **(P2, 20 min)** Cztery `data-cta` + jedno `gtagEvent` → domknięcie luk w lejku (`PELNY2608-13`).
8. **(P2, 1 h)** Paczka UX: `aria-label` FAB, `hover:text-navy` w `PoradnikForm`, `pointer-events-none` na banerze, `delay` w rzędzie zamiast w liście.
9. **(P2, M)** Ujednolicenie ścieżki CTA jednym komponentem `CtaLink` (`PELNY2608-18`) + jedno CTA w hero case study (`-19`).
10. **(P3+)** Reszta wg tabel §5.2 i §5.3.

### 11.2 Szybkie wygrane (<1 h łącznie)

| ID | Zmiana | Czas |
|---|---|---|
| PELNY2608-01 | `quality={78}` → `{80}` | 2 min |
| PELNY2608-10 | `SITE_UPDATED` → `2026-08-05` | 2 min |
| PELNY2608-23 | `llms.txt:43` „10-15" → „5-15 min/os." | 2 min |
| PELNY2608-20 | `hover:text-white` → `hover:text-navy dark:hover:text-white` | 2 min |
| PELNY2608-28 | `portfolioCategories.map` → `portfolioItems.map` | 2 min |
| PELNY2608-52 | `href="/galeria"` → `/portfolio` przy „Zobacz portfolio" | 2 min |
| PELNY2608-59 | 404: `follow: false` → `true` | 2 min |
| PELNY2608-35 | dopisać `wbraid`, `gbraid` w trzech plikach | 5 min |
| PELNY2608-17 | `aria-label` FAB zgodny z widoczną etykietą | 5 min |
| PELNY2608-21 | `pointer-events-none` + `auto` na banerze | 5 min |
| PELNY2608-29 | `delay={0.08 * (i % 3)}` | 5 min |
| PELNY2608-40 | `breadcrumbJsonLd` na `/poradnik` | 5 min |
| PELNY2608-41 | usunąć `/60` i `/70` z dwóch klas | 5 min |
| PELNY2608-44 | `py-2` na linkach nawigacji | 5 min |

### 11.3 Większe projekty

- **Przegląd `blog.ts` warunek po warunku** (nie kwotę po kwocie). Plik ma 174 KB i 26 wpisów; trzy ostatnie audyty znalazły w nim rozjazdy, bo każda tura synchronizowała liczby, a nie zdania. `M`.
- **Domknięcie linii obiektowej** (`PELNY2608-09`): domapowanie wpisów, 2-3 linki kontekstowe, docelowo jeden wpis pod klaster hal. `M` + decyzja o treści.
- **Architektura pomiaru** (`PELNY2608-05`, `-06`, `-11`, `-33`, `-34`): jedno zdarzenie konwersji dla obu lejków, `page_view` przy nawigacji client-side albo potwierdzone ustawienie w GA4, ścieżka w mailu, ground truth dla telefonu. `M`–`L`.

### 11.4 Data kontrolna

**Re-audyt: 19.08.2026** (dwa tygodnie). Mierzyć **tymi samymi metrykami**, z jednej serii pomiarowej:

| Metryka | Stan 05.08 | Cel |
|---|---|---|
| `/_next/image?…&q=78` | **400** | 200 albo brak takiego żądania |
| `og/uslugi/wnetrza-obiekty-architektura.png` | **404** | 200 |
| liczba `"@type":"Offer"` w żywym HTML strony głównej | **7** | 8 |
| `lastmod` tras statycznych w `/sitemap.xml` | `2026-07-29` | `2026-08-05` lub nowsza |
| liczba adresów w sitemapie | 50 | 50 (bez regresu) |
| `minPrice` na `/uslugi/sesje-zespolowe` | `1400` | `1400` (bez regresu) |
| wystąpienia „od 4 osób" w `blog.ts` | **1** | 0 |
| wystąpienia „bezpłatnie przekładamy" w `blog.ts` | **1** | 0 |
| „10-15 min/os." w `llms.txt` | **1** | 0 |
| liczba elementów z `data-cta` w `src/` | 14 unikalnych | 18+ |
| `scrollHeight` strony głównej @1920 | 10 323 px (11,4 ekranu) | ≤ bez regresu |
| LCP mobile i desktop | **N** | zmierzone i wpisane |

---

## 12. Decyzje potrzebne od Marcina

Pytania zamknięte albo warianty. Odpowiedź „A", „B" albo „zostaw" przy numerze wystarczy.

**D1. Warunki przy złej pogodzie w blogu (`PELNY2608-02`).**
- **A (rekomendacja):** przepisać zdanie w `blog.ts:373` na brzmienie z `services.tsx:543` („wracam raz w ramach ustalonej kwoty; kolejne podejście to 300 zł plus dojazd"). Odwracalne jednym commitem.
- B: zostawić i przyjąć, że blog obiecuje więcej niż cennik.
- C: nie robić nic — przy dokumentacji w kilku terminach oddajesz 600–900 zł na zleceniu.
Kryterium sukcesu: zero wystąpień „bezpłatnie przekładamy" w `blog.ts` przy re-audycie 19.08.

**D2. Próg wejścia do sesji zespołowej w blogu (`PELNY2608-03`).**
- **A (rekomendacja):** `blog.ts:179` na „od 2 osób" i przepisanie drugiego zdania `blog.ts:469`, które dziś odsyła dwie osoby do innej usługi.
- B: sam `:179`, zdanie w `:469` zostaje.
- C: nie robić nic — trzyosobowy zespół czyta „od 4 osób" i odpada bez pytania (1 520 zł na leada).
**Powiązane:** H11 pyta, czy próg nie powinien realnie zaczynać się od trzech osób, skoro 2 × 700 = 1 400. Jeśli odpowiedź brzmi „tak", D2 zmienia się w decyzję cennikową, nie redakcyjną.

**D3. Warunki zmiany terminu w lejku (`PELNY2608-04`).**
- **A (rekomendacja):** dopisać „jednorazowo, każda kolejna 20%" i klauzulę o dniu realizacji do `faq.ts:44`. Tanie, natychmiastowe, wchodzi też do `FAQPage` w Google.
- B: wpiąć komponent `Warunki` na stronę główną i `/kontakt`. Rozwiązuje systemowo, ale wydłuża obie strony i wymaga decyzji, gdzie dokładnie.
- C: nie robić nic — dziś klient w całym lejku widzi wersję bez limitu i bez kary za niestawienie się (2 360 zł przy zespole 10-osobowym).

**D4. Dron w pakietach eventowych (`PELNY2608-27`).**
`llms.txt:19` mówi „Dron w cenie każdego pakietu", komentarz w kodzie mówi „llms.txt mówi +200 zł", podstrona nie mówi ani jednego, ani drugiego. **Pytanie: dron jest w cenie pakietu czy to +200 zł?** Rozstrzygnięcie wymaga `cennik_2026_07_v3.md`, którego nie miałem. Bez odpowiedzi każdy lead z kanału AI przychodzi z oczekiwaniem 200 zł gratis.

**D5. Stawka jednostkowa packshotu (`PELNY2608-24`).**
- **A (rekomendacja):** usunąć „od 55 zł za sztukę" z `blog.ts:1009`, zgodnie z decyzją z 04.08 o jednej kwocie „od" na usługę.
- B: zostawić, ale dopisać próg („od ilu sztuk") i minimum zamówienia 600 zł.
- C: nie robić nic — klient kotwiczy się na 55 zł i czyta 600 zł jako podwyżkę o 45%.

**D6. JSON-LD: ósma usługa i spójność grafu (`PELNY2608-08`, `-15`) — stop-condition `§10.3`.**
- **A (rekomendacja):** oba naraz w jednym briefie: dopisać ósmy `Offer` + dwie pozycje do `knowsAbout`, i podmienić trzy anonimowe `ProfessionalService` na referencję `{"@id": "https://szabunia.pl/#business"}`. Zero zmian w treści widocznej, odwracalne.
- B: sam ósmy `Offer` (widoczność oferty), graf zostaje na później.
- C: nie robić nic — linia z najwyższą kotwicą jest dla Knowledge Graph i asystentów AI niewidzialna.

**D7. CSP a remarketing z GA4 (`PELNY2608-12`) — stop-condition `§10.2`.**
- **Najpierw zweryfikuj (H5), potem decyduj.** Jeśli konsola po akceptacji zgody pokazuje blokady na `doubleclick.net`:
- **A (rekomendacja po potwierdzeniu):** dopisać `https://stats.g.doubleclick.net` do `connect-src` i `img-src` oraz `https://www.google.com https://www.google.pl` do `img-src`. Cztery hosty, odwracalne jednym commitem.
- B: zostawić i świadomie zrezygnować z remarketingu z GA4.
- C: nie robić nic i nie wiedzieć, że tak jest — najgorszy wariant, bo budżet kampanii remarketingowej i tak leci.

**D8. Cytaty klientów (`PELNY2608-25`, `-26`).**
Jeden cytat jest cicho skrócony, drugi **przeredagowany** (zdanie sklejone przecinkiem, zmienione słowa). Opinie są publiczne w Google.
- **A (rekomendacja):** przywrócić oryginalne brzmienie w `services.tsx`, skracać wyłącznie na granicy zdań i oznaczać skrót wielokropkiem w nawiasie.
- B: cytować pełną treść na obu powierzchniach.
- C: nie robić nic — ryzyko reputacyjne, `docs/zasady-tekstow.md` nazywa to fałszowaniem cudzej opinii.

**D9. Ground truth dla telefonu (`PELNY2608-06`).**
- **A (rekomendacja, koszt 0):** doklejać `?subject=` z etykietą miejsca do wszystkich `mailto:` **plus** jedno pytanie w skrypcie rozmowy („skąd Pan/Pani do mnie trafił?") zapisywane do CRM. Daje serię, której żaden panel nie da.
- B: numer z przekierowaniem (koszt miesięczny, pełny pomiar rozmów).
- C: nie robić nic — każdy rachunek zwrotu z Ads opiera się na liczbach samego Google.

**D10. `CLAUDE.md` (`PELNY2608-56`) — zmiana wymaga Twojej zgody.**
Cztery rozjazdy: nieprawdziwa komenda dowodowa, liczba komponentów, data w stopce, opis kolejności usług sprzed 04.08. **Zgoda na aktualizację?** Bez niej kolejna sesja może „naprawić" kolejność kart, która jest już zrobiona.

**D11. Trzy pozycje wymagające `cennik_2026_07_v3.md`.**
Nie miałem tego pliku (stagowany był tylko `05_Strona_WWW/`). Rozstrzyga: D4 (dron w pakiecie), D5 (55 zł/szt.) i H11 (próg dwóch osób). **Czy podpiąć folder `01_Biznes/_System/` do następnej sesji?**

**D12. Pozycje przeniesione z `DECYZJE-DO-PODJECIA-2026-08-04.md`, nadal otwarte.**
`ZDJ2608-37` (plik hero 877 px, obraz LCP miękki na retinie) · `ZDJ2608-28` (podział list `CURATED`) · `ZDJ2608-16` (kolejność portretów) · trzy opisy niezgodne z kadrem · `DZ3` (hero „Wideo marketingu") · `DZ5` (karty OG) · H3 (czy `yes-butcher-02.jpg` jest z drona) · warunek publikacji Box17. **Żadna nie została w tym audycie ponownie zdiagnozowana — wszystkie czekają na Twoją odpowiedź, nie na kolejną analizę.**

---

## Rejestr findingów

| ID | Finding | P | E | Owner | Status | Dokument |
|---|---|---|---|---|---|---|
| PELNY2608-01 | `quality={78}` → HTTP 400, portret autora na 8 podstronach | P1 | S | 🤖 | otwarty | BRIEFY-PELNY-2026-08-05.md |
| PELNY2608-02 | Blog: bezterminowe darmowe przekładanie lotu | P1 | S | 🧑 | otwarty (D1) | BRIEFY |
| PELNY2608-03 | Blog: „od 4 osób" vs kanon 2 osoby | P1 | S | 🧑 | otwarty (D2) | BRIEFY |
| PELNY2608-04 | FAQ: zmiana terminu bez limitu; `Warunki` tylko na `/galeria` | P1 | S | 🧑 | otwarty (D3) | BRIEFY |
| PELNY2608-05 | `generate_lead` na darmowym PDF, nie na zapytaniu | P1 | S | 🤖+🌐 | otwarty | BRIEFY |
| PELNY2608-06 | Telefon bez ground truth spoza Google | P2 | M | 🧑 | otwarty (D9) | — |
| PELNY2608-07 | `og:image` ósmej usługi → 404 | P2 | S | 🧑 | otwarty (=ZDJ2608-23) | BRIEFY |
| PELNY2608-08 | `hasOfferCatalog` 7 z 8 | P2 | S | 🧑 | otwarty (=TRESC2608-11, D6) | BRIEFY |
| PELNY2608-09 | Linia obiektowa: 0 linków, 0 wpisów | P2 | M | 🧑+🤖 | otwarty | BRIEFY |
| PELNY2608-10 | `SITE_UPDATED` sprzed zmian cen | P2 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-11 | Brak `page_view` przy nawigacji client-side | P2 | S | 🌐→🤖 | otwarty | BRIEFY |
| PELNY2608-12 | CSP bez domen Ads/DoubleClick | P2 | S | 🧑 | otwarty (D7, H5) | — |
| PELNY2608-13 | Cztery kroki lejka bez zdarzenia | P2 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-14 | Nieznany rozmiar niedomierzenia przez zgodę | P2 | S | 🌐 | otwarty | — |
| PELNY2608-15 | Trzy anonimowe encje `ProfessionalService` | P2 | S | 🧑 | otwarty (D6) | BRIEFY |
| PELNY2608-16 | `localStorage` bez `try/catch` w `ThemeProvider` | P2 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-17 | `aria-label` FAB ≠ widoczna etykieta (SC 2.5.3 A) | P2 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-18 | Rozszczepiona ścieżka CTA `#kontakt` vs `/kontakt` | P2 | M | 🤖 | otwarty | BRIEFY |
| PELNY2608-19 | Dwa CTA w hero case study, bez `data-cta` | P2 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-20 | Link do polityki znika przy hover (1,05:1) | P2 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-21 | Baner cookies przechwytuje kliknięcia w dolnym pasie | P2 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-22 | FAQ zespołowe powtarza tę samą kwotę dwa razy | P2 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-23 | `llms.txt` 10-15 min vs 5-15 | P2 | S | 🧑 | otwarty | BRIEFY |
| PELNY2608-24 | Druga kotwica: 55 zł/szt. w blogu | P2 | S | 🧑 | otwarty (D5) | BRIEFY |
| PELNY2608-25 | Cytat klienta w dwóch wersjach | P2 | S | 🧑 | otwarty (D8) | — |
| PELNY2608-26 | Cytat klienta przeredagowany | P2 | S | 🧑 | otwarty (D8) | — |
| PELNY2608-27 | „Dron w cenie każdego pakietu" vs „+200 zł" | P2 | S | 🧑 | otwarty (D4) | — |
| PELNY2608-28 | `ItemList` `/portfolio` z draftem i złą kolejnością | P2 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-29 | Animacja kart `/blog` do 2 s | P2 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-30 | Brak `error.tsx` / `global-error.tsx` | P3 | S | 🤖 | otwarty | — |
| PELNY2608-31 | `blog/[slug]` bez `ErrorBoundary` | P3 | S | 🤖 | otwarty | — |
| PELNY2608-32 | Turnstile: asymetryczny tryb awarii bez alarmu | P3 | S | 🤖 | otwarty | — |
| PELNY2608-33 | `contact_submit` liczy też honeypot | P3 | S | 🤖 | otwarty | — |
| PELNY2608-34 | Mail bez strony wysyłki i strony wejścia | P3 | S | 🤖 | otwarty | — |
| PELNY2608-35 | Brak `wbraid` / `gbraid` w UTM | P3 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-36 | `contact_submit` bez `value` / `currency` | P3 | S | 🤖 | otwarty | — |
| PELNY2608-37 | Godziny otwarcia tylko w JSON-LD | P3 | S | 🧑 | otwarty | — |
| PELNY2608-38 | Leniwy loader zawyża zaangażowanie | P3 | S | 🧑 | obserwacja do zapisania | — |
| PELNY2608-39 | `/blog` bez `ItemList` | P3 | S | 🤖 | otwarty | — |
| PELNY2608-40 | `/poradnik` bez JSON-LD | P3 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-41 | Dwa kontrasty poniżej AA w dark mode | P3 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-42 | `/kontakt`: najmocniejszy przycisk wyprowadza z lejka | P3 | S | 🧑 | otwarty | — |
| PELNY2608-43 | Nierówne wysokości kart bloga | P3 | S | 🤖 | otwarty | — |
| PELNY2608-44 | Linki nawigacji ~16 px (SC 2.5.8) | P3 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-45 | Liczniki mrugają zerem po wejściu w widok | P3 | S | 🤖 | otwarty | — |
| PELNY2608-46 | Treść niewidoczna bez JS, brak `<noscript>` | P3 | M | 🤖 | otwarty | — |
| PELNY2608-47 | Meta-obietnica `/galeria` w obie strony | P3 | S | 🤖 | otwarty | — |
| PELNY2608-48 | `/kontakt` wymienia 5 usług z 8 | P3 | S | 🤖 | otwarty | — |
| PELNY2608-49 | „Robię sam" vs „biorę drugiego operatora" | P3 | S | 🧑 | otwarty | — |
| PELNY2608-50 | Trzy mnożniki LinkedIn bez źródła | P3 | S | 🧑 | otwarty | — |
| PELNY2608-51 | „Galeria w 48h" bez pokrycia w warunkach | P3 | S | 🧑 | otwarty | — |
| PELNY2608-52 | „Zobacz portfolio" → `/galeria` | P3 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-53 | Polityka bez arkusza CRM wśród odbiorców | P3 | S | 🧑 | otwarty (uśpiony) | — |
| PELNY2608-54 | `/galeria` renderowana dynamicznie | P3 | M | 🤖 | otwarty | — |
| PELNY2608-55 | Cztery implementacje lightboxa | P3 | M | 🤖 | otwarty | — |
| PELNY2608-56 | `CLAUDE.md` rozjeżdża się w czterech miejscach | P4 | S | 🧑 | otwarty (D10) | — |
| PELNY2608-57 | RSS nieodkrywalny (`alternates` nadpisane) | P4 | S | 🤖 | otwarty | — |
| PELNY2608-58 | RSS datuje po `date`, feed wygląda na porzucony | P4 | S | 🤖 | otwarty | — |
| PELNY2608-59 | 404 z `follow: false` | P4 | S | 🤖 | otwarty | BRIEFY |
| PELNY2608-60 | Komentarz uzasadnia `immutable`, którego już nie ma | P4 | S | 🤖 | otwarty | — |
| PELNY2608-61 | Cztery komentarze opisujące nieistniejący stan | P4 | S | 🤖 | otwarty | — |
| PELNY2608-62 | `TrustStats` martwy komponent | P4 | S | 🧑 | otwarty | — |
| PELNY2608-63 | Martwy blok `NEXT_PUBLIC_ANALYTICS_URL` | P4 | S | 🤖 | otwarty | — |
| PELNY2608-64 | `isAllowedOrigin` blokuje preview Vercela | P4 | S | 🤖 | otwarty | — |
| PELNY2608-65 | CSP bez `frame-ancestors`, wąskie `Permissions-Policy`, `\n` w temacie maila | P4 | S | 🧑 | otwarty | — |
| PELNY2608-66 | Paczka drobiazgów UX i dostępności (12 pozycji) | P4 | S | 🤖 | otwarty | — |

**Domknięcia z poprzedniego cyklu:**

| ID z poprzedniego audytu | Status 05.08 |
|---|---|
| `TRESC2608-23` (`minPrice: 120` w JSON-LD sesji zespołowych) | ✅ **zamknięty** — `minPrice` = 1400, potwierdzone live |
| `ZDJ2608-01` + `DZ4` (nazwy plików + `Cache-Control`) | ✅ **zamknięty** — nowe adresy 200, stare 404, `must-revalidate` w nagłówku |
| `ZDJ2608-31`, `-32` (publikacja 4 realizacji, kolejność) | ✅ **zamknięty** — 8 tras `/portfolio/*` w sitemapie, Box17 wykluczony |
| `TRESC2608-05` (30 vs 90 minut sesji wizerunkowej) | ✅ **zamknięty** — liczby operacyjne spójne w całym repo |
| `TRESC2608-11` (ósma usługa w `hasOfferCatalog`) | ❌ **bez zmian** — nadal 7 z 8, przeniesiony jako `PELNY2608-08` |
| `ZDJ2608-23` (karta OG ósmej usługi) | ❌ **bez zmian** — nadal 404, przeniesiony jako `PELNY2608-07` |
| `TRESC2608-53` (pogoda przy dronie) | ⚠️ **częściowo** — domknięty w `services.tsx` i `llms.txt`, **regres w blogu**, przeniesiony jako `PELNY2608-02` |
| `TRESC2608-04`, `-52`, `ZDJ2608-10`, `-16`, `-28`, `-33`, `-37`, `DZ3`, `DZ5` | ➖ **bez zmian** — czekają na decyzje z `DECYZJE-DO-PODJECIA-2026-08-04.md` |

---

*Audyt wykonał: orchestrator Cowork (Claude), 05.08.2026. Dane: repo na HEAD `f5dd9f4` (drzewo czyste, `main == origin/main`), API Vercela (deployment `dpl_GTb4YGhZ1btDkh4eDsLzjpWE19mN`, `READY`, `f5dd9f4`, 09:27 UTC), live `szabunia.pl` przez Chrome na maszynie Marcina (odczyty 09:30–09:50 UTC, kody odpowiedzi przez `fetch()` w kontekście strony). Pięć modułów zebranych osobnymi subagentami, findingi `Z (live)` zweryfikowane ponownie przez orchestratora. Bez dostępu do Google Ads, GA4, GSC, GBP, PSI i Lighthouse. **Nie wprowadza zmian.***
