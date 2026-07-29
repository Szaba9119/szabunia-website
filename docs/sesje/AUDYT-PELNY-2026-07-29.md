# Audyt PEŁNY szabunia.pl — 29 lipca 2026

**Zakres:** moduły A (kod, bezpieczeństwo), B (UX/UI, konwersja), C (SEO on-page + dane strukturalne),
D (kanały płatne i pomiar: GSC, GA4, Google Ads, Vercel, wizytówka Google), E (treść, spójność
biznesowa, prawo, rynek). Wykonanie planu `PLAN-AUDYT-PELNY-2026-07-27.md`, rozszerzonego o moduł D.

**Okno:** 2026-07-23 → 2026-07-29 (od poprzedniego audytu). Dane paneli w oknach natywnych
dla każdego panelu — podane przy każdej liczbie.

**Metoda konkretnie:**
- Kod: świeży klon `github.com/Szaba9119/szabunia-website` na `645e49c`, drzewo czyste, `npm ci`,
  `npm run lint` (EXIT 0), `npx tsc --noEmit` (EXIT 0). Bez `next build` (poza zakresem sesji).
- Live: produkcja `szabunia.pl` w Chrome z JS — pomiary `scrollHeight`, kontrast liczony
  z `getComputedStyle` na renderze, tap-targety z `getBoundingClientRect`, konsola, dark mode;
  osobno `curl` na 46 URL-i z sitemapy (nagłówki HTTP, kody statusu, HTML SSR).
- Panele: GSC (`sc-domain:szabunia.pl`), GA4 (`p540982486`), Google Ads (786-864-4697),
  Vercel (`szabunia-website`), wizytówka Google — **wyłącznie odczyt, zero zmian**.
- Rynek: 7 witryn konkurencji pobranych bezpośrednio 2026-07-29.

**Wykluczone / niezmierzone:** Core Web Vitals (patrz §9), kreacje i sitelinki Google Ads
(patrz §9), `next build`, wysyłka testowa formularzy.

**Klauzula: audyt nie wprowadza zmian.** Poprawki wdrożone po raporcie są opisane osobno
w `POPRAWKI-2026-07-29.md` i mają własne ID.

---

## 0. TL;DR

**Wniosek nadrzędny (warunkowy):** *Techniczna strona depricingu została zrobiona bez zarzutu —
ale warstwa treści i pomiaru za nią nie nadążyła.* Kod jest w bardzo dobrej formie (lint 0/0,
tsc czysty, zero martwych komponentów, komplet nagłówków bezpieczeństwa z HSTS preload,
`next/image` z `sizes` w 16/16 przypadków). Realne straty są w trzech miejscach, których nie
widać z kodu: **15 obietnic nieistniejącego kalkulatora w treści**, **pusty kafel Box17
na głównym hubie portfolio** i **pomiar, w którym 7 z 12 „konwersji" z ostatnich 28 dni
pochodzi z funkcji, której nie ma.**

**Liczby, które trzeba zobaczyć razem:**

| Metryka | 23.07 | 29.07 | Zmiana |
|---|---|---|---|
| GSC indeksacja | 46 / 4 | 46 / 5 | ➖ stabilnie |
| GSC skuteczność 90 dni | 20 klik. / 1,55 tys. wyśw. / poz. 23,8 | **23 klik. / 2,24 tys. wyśw. / poz. 22,8** | ✅ wyświetlenia +45% |
| GSC linki zewnętrzne | 0 | **0** | ➖ bez zmian — hamulec nr 1 |
| GA4 użytkownicy / 28 dni | 52 | **39** | ➖ obie liczby zawierają wizyty własne Marcina |
| GA4 `contact_submit` / 28 dni | 1 | **2** | ➖ szum, nie trend |
| Ads (14 dni) | — | 39 klik. / 241,63 zł / 2 konw. / 120,82 zł za konwersję | — |
| Opinie w wizytówce | 10 | **10** | ❌ wzrost stanął |

**Decyzje podjęte 2026-07-29 (po pierwszej wersji raportu):** Box17 **wraca do draftów**
do czasu zdjęć (D1 wariant B, wdrożone); `calculator_done` **odznaczone** jako kluczowe
zdarzenie w GA4 (wykonane); webhook CRM — decyzja odłożona; zdjęcia w wizytówce Google —
odłożone. Ruch z Instagrama okazał się wizytami własnymi Marcina, patrz `PELNY2907-05`.

---

## 1. Ocena obszarów

| Obszar | Ocena | Uzasadnienie jednym zdaniem |
|---|---|---|
| Kod i architektura | 92/100 | lint i typy czyste, zero martwego kodu, zero `any`, alias `@/` bez wyjątku |
| Bezpieczeństwo | 88/100 | komplet nagłówków + HSTS preload, honeypot i Turnstile weryfikowane serwerowo; minus za brak dowodu zgody RODO |
| SEO techniczne | 90/100 | 46/46 unikalnych title i description, sitemap 1:1 z trasami, redirecty działają; minus za martwy `og:image` i parytet FAQ |
| UX / dostępność | 85/100 | kontrast w jasnym motywie czysty, 18/18 obrazów z alt, dark mode działa; minus za tap-targety i jeden kontrast w ciemnym |
| Treść i spójność | 72/100 | ceny wewnętrznie spójne, ale 15 odesłań do nieistniejącego kalkulatora i dwie powierzchnie sprzed depricingu |
| Pomiar i kanały płatne | 65/100 | GA4 + Ads + GSC spięte, ale kluczowe zdarzenie mierzy nieistniejącą funkcję, a CRM nie zapisuje nic |
| Prawo | 70/100 | polityka kompletna szkieletowo, ale nie wymienia dwóch realnych procesorów i nie ma dowodu zgody |

---

## 2. Sprawdzone i OK (nie ruszać, to działa)

**Kod i infrastruktura**
- `npm run lint` → 0 błędów, 0 ostrzeżeń. `npx tsc --noEmit` → czysto. DoD `CLAUDE.md §6` pkt 1–2 spełnione.
- **Parytet produkcja = `main` = `645e49c`** — potwierdzone w Vercel (`dpl_J1J2Eidb…`, target production,
  `githubCommitSha 645e49c…`). Zero rozjazdu, drzewo lokalne czyste w `src/`.
- **Vercel Runtime Logs, 7 dni: same 200 i 304, zero błędów** (`group_by=statusCode`: 200×137, 304×17).
- Zero martwych komponentów — policzone referencje dla wszystkich 46 plików w `src/components/`, każdy ma ≥1 użycie.
- Zero `console.log`, zero `TODO/FIXME`, zero `any` w `src/`. 7 wyłączeń ESLint, każde z komentarzem.
- Alias `@/` bez jednego wyjątku (`grep 'from "\.\./'` w `src/` → 0 trafień).
- `ErrorBoundary` na stronie głównej: **12/12 sekcji** (`src/app/page.tsx:47-76`).
- Honeypot jest realnym ukrytym polem i **serwer go sprawdza** (`contact/route.ts:58-60`) — bot dostaje `{ok:true}` bez wysyłki, więc nie wie, że został odrzucony.
- **Turnstile weryfikowany po stronie serwera** (`src/lib/turnstile.ts:20-30`), wołany przed przetworzeniem danych w obu routach; fail-open świadomy, udokumentowany, z logiem `[ALERT]`. **Klucze `TURNSTILE_SECRET_KEY` i `NEXT_PUBLIC_TURNSTILE_SITE_KEY` są ustawione w Vercel (dodane 2 lipca)** — hipoteza „CAPTCHA wyłączona" z modułu A **zamknięta**.
- Rate-limit działa i jest rozdzielony per formularz (8/h kontakt, 5/h poradnik); `UPSTASH_REDIS_REST_URL` i `_TOKEN` **są ustawione w Vercel** — hipoteza „formularze bez limitu" **zamknięta**.
- Escapowanie HTML w mailach stosowane przy **każdym** polu użytkownika, łącznie z UTM.
- Nagłówki bezpieczeństwa potwierdzone **na żywo** (`curl -I https://szabunia.pl`, 2026-07-29): `strict-transport-security: max-age=63072000; includeSubDomains; preload`, `x-content-type-options: nosniff`, `x-frame-options: SAMEORIGIN`, `referrer-policy: strict-origin-when-cross-origin`, `permissions-policy`, `cross-origin-opener-policy: same-origin`, pełny CSP bez `unsafe-eval` na produkcji.
- `next/image` wszędzie, **16/16 przypadków `fill` ma `sizes`**, `priority` na elementach LCP, lightboxy też na `next/image`. Dwa surowe `<img>` uzasadnione (miniatury z `i.ytimg.com`), oba z `loading="lazy"` i stałym `aspect-ratio`.
- Fonty wyłącznie przez `next/font`, zero `<link>` do Google Fonts, `font-src 'self'` w CSP domyka temat.
- `prefers-reduced-motion` obsłużone na wszystkich warstwach ruchu (CSS, Parallax z `matchMedia`, `MotionConfig reducedMotion="user"`).

**SEO**
- `robots.txt` czysty: `Allow: /` + `Disallow: /api/`. **`Disallow: /_next/` nie wrócił** — historyczny P1 pozostaje zamknięty.
- `sitemap.xml`: **46 `<loc>` = 46 realnych tras**, zero draftów, host spójny non-www, **zero wystąpień `kalkulator`**.
- **46/46 unikalnych `<title>`, 46/46 unikalnych `description`, zero duplikatów**, `twitter:card=summary_large_image` na wszystkich. Brak `meta keywords`.
- Canonical na 46/46 = własny URL trasy. `/galeria?kat=portrety` → canonical `/galeria` (dedupe parametru działa).
- Redirecty potwierdzone live: `http→https` 308, `www→non-www` 308, **`marcinszabunia.pl → szabunia.pl` 308**, `/kalkulator → /kontakt` 308, `/sesje-prywatne → /kontakt` 308.
- 4 drafty portfolio: `noindex, follow`, zero linków wewnętrznych, poza sitemapą. Obsługa wzorcowa.
- 404 zwraca realny 404 (nie soft-404), `noindex, nofollow`, linki prowadzą do żywych tras.
- **Zero linków wewnętrznych do nieistniejących tras** w grafie 46 stron.
- Link SEO home → hub nadal jest: `Footer.tsx:32` (`/uslugi`) i `:35` (`/portfolio`) — nie usuwać.
- OG per-podstrona: **26/26 plików bloga i 7/7 usług, każdy dokładnie 1200×630**.
- `CountUp` renderuje wartości finalne w SSR (`<span>100+</span>`) — historyczny finding „0+ dla crawlera" naprawiony.
- `aggregateRating` / `review[]` nadal usunięte z JSON-LD (decyzja z 6.07 utrzymana).
- `VideoObject` na case studies: **3/3 kompletne** z `uploadDate` i `duration` — naprawa z 8.07 trzyma się.

**Treść**
- **Kotwice cenowe = baseline z 23.07 bez zmian:** 7 usług, `od 1 000 / 1 800 / 600 / 150 zł-os. / 300 / 500 / 900 zł`.
- Liczby dowodu społecznego spójne: `250 000+`, `1 000+`, `100+`, `8+` w `TrustStats.tsx` = `About.tsx`. **Zero „200+"** — decyzja D1 trzyma się.
- Narracja stażu spójna: „Od 2018 roku" + „8+ lat" + `llms.txt` „Działa od: 2018".
- Lista klientów identyczna w 4 miejscach (9 marek) — decyzja D6 trzyma się.
- Warunki spójne w 4–5 kopiach: 2 tury poprawek foto / 3 wideo, Express 48h +50%, dojazd 2,50 zł/km od granicy miasta.
- **Deklaracja czynnego płatnika VAT usunięta wszędzie** (`grep "czynn.*płatnik"` → 0 trafień) — commit `ac7cf9b` domknięty.
- Znak wodny i pełna rozdzielczość po opłacie (`645e49c`) spójne między `Warunki.tsx:54` a `faq.ts:68`.
- Opinie: przy każdej autor + stanowisko + firma. Etykieta głównego CTA „Zapytaj o ofertę" identyczna na 10 powierzchniach.
- Baner cookies: „Odrzuć" wizualnie **równorzędne** z „Akceptuję" (ta sama waga, obramowanie, hover) — brak dark patternu. Trwały link „Ustawienia cookies" w stopce na każdej stronie.
- Consent Mode v2 domyślnie `denied` **przed** załadowaniem gtag.js.

**UX / dostępność (pomiar na renderze 2026-07-29)**
- **Kontrast w motywie jasnym: zero realnych naruszeń** (po odsianiu fałszywych pozytywów, §10).
- `lang="pl"`, 1× H1 na stronie, hierarchia h1→h2→h3 bez przeskoków.
- **18/18 obrazów na home ma `alt`**, zero pustych, zero uszkodzonych na home.
- **Zero martwych kotwic** — wszystkie 5 (`#main`, `#o-mnie`, `#uslugi`, `#portfolio`, `#kontakt`) mają cel.
- Brak poziomego przewijania na 1920 px i na 606 px (marquee LogoBar poprawnie przycięty).
- **Dark mode działa** — przełącznik ustawia `.dark` na `<html>`, tło `#0B0F1A`, `localStorage('theme')` zapisany. Zweryfikowane klikiem, nie z kodu.
- **Konsola bez błędów** na `/` i `/kontakt`.
- **Długość strony @606 px: 13 431 px** (23.07: 13 184 px) — **+1,9%**, czyli w praktyce bez zmian po commitach z 23–24.07. Ta sama seria pomiarowa co poprzednio.

**Kanały (nowe w tym audycie)**
- **Godziny w wizytówce Google = JSON-LD.** Wizytówka: pn–pt 09:00–18:00, sob–niedz zamknięte. `layout.tsx:134-157`: `Mo-Fr 09:00-18:00`. **Historyczny rozjazd godzin (otwarty od 23.07) — ZAMKNIĘTY, zgodność potwierdzona.**
- Wizytówka zweryfikowana, „Pełne informacje", telefon 514 900 688 zgodny ze stroną, ocena 5,0.
- GA4 spięte z Search Console (raporty „Zapytania" i „Ruch z bezpłatnych wyników" aktywne).
- Kampania Ads: strategia **„Maksymalizuj liczbę kliknięć"** — czyli martwy cel „Prośby o wycenę" **nie** zaburza licytacji. To był realny scenariusz P0 i on nie zachodzi.

---

## 3. Ustalenia P1

### `PELNY2907-01` · [UX][SEO] Kafel Box17 na `/portfolio` jest pusty — miniatura nie istnieje, a strona jest zaindeksowana
`src/data/portfolio.ts:178` → `thumbnail: "/images/portfolio/box17/box17.jpg"`. Katalog
`public/images/portfolio/box17/` zawiera **wyłącznie** `_WRZUC-TU-ZDJECIA.txt`.
Live 2026-07-29: `HEAD https://szabunia.pl/images/portfolio/box17/box17.jpg` → **404**;
w DOM `/portfolio` obraz z `alt="Box17: packshoty budek akustycznych + film"` ma
`naturalWidth = 0` (pomiar `getBoundingClientRect`/`naturalWidth` w Chrome, potwierdzone).
`og:image` case study wskazuje na ten sam nieistniejący plik.
· **P1 · S · 🧑 · Z (live + kod)**

Hub `/portfolio` ma `priority: 0.9` i jest celem sitelinka w Ads. Drugi kafel w siatce jest
wizualnie dziurą. Każdy link do tego case study udostępniony na LinkedIn, Messengerze czy
Slacku pokaże brak podglądu. Marcin sam to przewidział — plik `_WRZUC-TU-ZDJECIA.txt` mówi
wprost: *„MINIATURA (wymagana, bez niej kafel na /portfolio będzie pusty)"*.

**Poprawka:** wgrać `public/images/portfolio/box17/box17.jpg`, poziomo ~4:3, min. 1600×1200.
Wariant tymczasowy w §12, decyzja D1.

### `PELNY2907-02` · [TREŚĆ] 14 miejsc w blogu (+1 w `llms.txt`) obiecuje kalkulator wyceny, którego nie ma od 23.07
`src/data/blog.ts`, linie **370, 415, 456, 510, 667, 738, 800, 1038, 1042, 1090, 1154, 1158,
1437, 1441** (kalkulator) + **370, 705** (cennik). Dosłownie z `blog.ts:370`:
> „Zamiast zgadywać, policz. W `<a href="/kontakt">kalkulatorze wyceny</a>` zaznaczasz zakres
> i od razu widzisz orientacyjny koszt. Pełne pakiety i ceny znajdziesz też w
> `<a href="/kontakt">cenniku</a>`."

Potwierdzone live na `https://szabunia.pl/blog/ile-kosztuje-film-z-drona`.
· **P1 · M · 🤖 · Z (live + kod)**

Linki technicznie działają (prowadzą na `/kontakt`, zero 404) — psuje się **obietnica**.
Etykieta mówi „policz sam, zobaczysz kwotę", a celem jest formularz z polem „Wiadomość".
Dotyczy 11 z 26 wpisów, w tym **wszystkich trzech „ile kosztuje…"** — czyli dokładnie tych,
które według GSC zbierają najwięcej wyświetleń („ile kosztuje sesja wizerunkowa" — 52 wyświetlenia
w 90 dniach). To rozczarowanie w ostatnim kroku przed konwersją.

**Poprawka:** przepisać na język modelu „na zapytanie". Wdrożone — patrz `POPRAWKI-2026-07-29.md`.

### `PELNY2907-03` · [POMIAR] `calculator_done` jest nadal kluczowym zdarzeniem GA4 — 7 z 12 „konwersji" z ostatnich 28 dni pochodzi z usuniętej funkcji
GA4 → Administracja → Zdarzenia → Kluczowe zdarzenia (odczyt 2026-07-29): oznaczone jako
kluczowe są `calculator_done`, `close_convert_lead`, `contact_submit`, `email_click`,
`generate_lead`, `phone_click`, `purchase`, `qualify_lead`. Raport zdarzeń (1–28.07.2026):
`calculator_done` = **7** (5 użytkowników), `contact_submit` = 2, `phone_click` = 2,
`email_click` = 1 → suma **12**, dokładnie tyle, ile pokazuje karta „Najważniejsze wydarzenia".
Kalkulator usunięty 23.07 (`next.config.ts:118`, brak `src/app/kalkulator/`).
· **P1 · S · 🧑 (panel GA4) · Z (panel + kod)**

Każdy raport i każde porównanie okresów w GA4 będzie od sierpnia pokazywać „spadek konwersji
o 58%", którego nikt nie spowodował — to arytmetyka wygaszonej funkcji, nie zmiana zachowania
klientów. Przy 2 realnych zgłoszeniach na 28 dni taki szum całkowicie zasłania sygnał.
Dodatkowo `generate_lead` (poradnik) ma w tym oknie **zero danych strumienia** — lead magnet
nie skonwertował ani razu.

**Poprawka:** odznaczyć `calculator_done` jako kluczowe zdarzenie (nie usuwać — historia zostaje);
odznaczyć nieużywane `purchase`, `qualify_lead`, `close_convert_lead`. Zostawić `contact_submit`,
`generate_lead`, `phone_click`, `email_click`. To panel, nie kod → owner Marcin, kroki w §11.

### `PELNY2907-04` · [POMIAR] Webhook CRM nie działa na produkcji — brakuje obu zmiennych środowiskowych
Vercel → `szabunia-website` → Environment Variables (odczyt 2026-07-29): ustawione są
`UPSTASH_REDIS_REST_URL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`,
`UPSTASH_REDIS_REST_TOKEN`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `RESEND_API_KEY`.
**Nie ma `CRM_WEBHOOK_URL` ani `CRM_WEBHOOK_SECRET`.** Kod (`api/contact/route.ts:32`)
robi wtedy no-op — cicho, bez błędu.
· **P1 · S · 🧑 · Z (panel + kod)**

Arkusz `CRM_Szabunia_2026` (zbudowany 12.06) nie dostał automatycznie **ani jednego** leada
ze strony. Wszystkie zapytania są wyłącznie w mailu, a zakładka „Leady" pokazuje stan
z migracji. To nie jest bug w kodzie — wdrożenie webhooka czekało po stronie Marcina
(`INSTRUKCJA_WDROZENIA.md`) i po prostu nigdy się nie odbyło.

**Poprawka:** albo dokończyć wdrożenie (Apps Script → deploy jako aplikacja internetowa →
wkleić URL i sekret do Vercel), albo świadomie uznać CRM za ręczny i usunąć `pushToCrm`
z kodu, żeby nie sugerował działającej automatyzacji. Decyzja D2 w §12.

### `PELNY2907-05` · [POMIAR] ~~Ruch spadł o jedną trzecią, a główny motor z czerwca zniknął~~ → **SKORYGOWANE: GA4 liczy własne wizyty Marcina**
GA4, ostatnie 28 dni (1–28.07.2026) vs poprzedni okres: aktywni użytkownicy **39 (−33,9%)**,
nowi **36 (−40,0%)**. Struktura źródeł, ostatnie 7 dni: Paid Search 6 sesji, Referral 4,
Organic Search 3, Direct 2, **Organic Social 1**, AI Assistant 1, Cross-network 1.
Dla porównania audyt z 23.07 raportował Instagram jako motor nr 1 z **49 sesjami / 24 nowymi
użytkownikami w 28 dni**.
· **P1 · M · 🧑 · Z (panel)**

Wyświetlenia w Google rosną (2,24 tys., +45%), a ruch spada — bo najmocniejszy kanał
(Instagram) przestał dowozić. To nie jest problem strony ani SEO: to przerwa w publikowaniu.
Przy 39 użytkownikach na miesiąc żadna zmiana na stronie nie ma szans dać statystycznie
czytelnego wyniku, co osobno **unieważnia okno obserwacji eksperymentu z depricingiem**
w takiej formie, w jakiej je zaplanowano (patrz §7).

**KOREKTA 2026-07-29, od Marcina:** *„ruch z instagrama to było moje konto jak wchodziłem
żeby sprawdzić"*. To unieważnia interpretację powyżej. Czerwcowe 49 sesji z Instagrama nie było
ruchem klientów, tylko wizytami właściciela wchodzącego na stronę z telefonu. Wnioski:
1. **„Spadek o 34%" nie jest spadkiem** — to zniknięcie własnego ruchu, nie utrata odbiorców.
   Realny ruch zewnętrzny był przez cały czas na poziomie kilkunastu użytkowników miesięcznie.
2. **Instagram nigdy nie był motorem** — poprzedni audyt (23.07) zbudował na tym całą narrację
   kanałową. Ta narracja upada.
3. **Wszystkie historyczne liczby GA4 są zawyżone** o nieznaną wielkość i nie da się dziś
   powiedzieć o ile. Baza porównawcza dla re-audytu musi startować od momentu odfiltrowania
   ruchu własnego, nie od czerwca.

**Poprawka (nowy finding `PELNY2907-46`):** ustawić w GA4 **filtr ruchu wewnętrznego**
(Administracja → Zbieranie i modyfikowanie danych → Definiuj ruch wewnętrzny → reguła na
własne IP, potem Filtry danych → „Internal Traffic" na *Aktywny*). Bez tego każdy kolejny
odczyt konwersji i kanałów jest skażony w nieznanym stopniu. To jedyna zmiana, która przywraca
wiarygodność pomiaru — ważniejsza niż jakikolwiek finding SEO na tej liście.

### `PELNY2907-06` · [SEO][TREŚĆ] `llms.txt` publikuje pełny cennik pakietowy, którego strona świadomie nie pokazuje
`public/llms.txt:17` dosłownie: „Portret Standard 1 000 zł, Portret Professional 1 300 zł,
Portret Premium 1 800 zł"; `:22`: „Event Standard 1 800 zł, Event Professional 3 200 zł,
Event Premium 4 500 zł; dodatkowa godzina 400 zł"; dalej progresja packshotów (90/70/55 zł),
stawki eventowe (600/400, 4h 1 600, 8h 2 800), live editing 20 zł/zdjęcie, dron +200 zł,
Monthly Content 4 900 zł/m-c. Kanon `src/data/services.tsx` zna **wyłącznie 7 kotwic „od X zł"**.
Potwierdzone live 2026-07-29.
· **P1 · S · 🧑 [DECYZJA MARCINA — stop-condition `CLAUDE.md §10.7`] · Z (live + kod)**

Same kwoty są **poprawne** — to nie jest stary cennik. Problem jest inny: `llms.txt` to plik
dla ChatGPT, Perplexity i Claude'a. Klient, który zapyta asystenta „ile kosztuje sesja u Szabuni",
dostanie rozpisany cennik pakietowy — czyli dokładnie to, co strona po 23.07 świadomie chowa.
Depricing został wdrożony w połowie: w lejku tak, w kanale AI nie. Osobno `llms.txt:54`
kieruje do „Kontakt i **kalkulator wyceny**".

Warianty w §12, decyzja D3.

---

## 4. Ustalenia P2

### `PELNY2907-07` · [PRAWO] Zgoda RODO istnieje tylko w przeglądarce — nie ma jak wykazać, że została udzielona
`src/components/CTA.tsx:60` waliduje checkbox, ale `:73-82` **nie wysyła** pola `consent`
w body żądania; to samo `PoradnikForm.tsx:44` i `:52-57`. `grep -n "consent" src/app/api/*/route.ts`
→ **zero trafień w obu routach**.
· **P2 · S · 🤖 · Z (kod)**

Checkbox blokuje wysyłkę wyłącznie po stronie klienta — żądanie złożone poza formularzem
przechodzi bez zgody. Przy zapytaniu z UODO albo przy sporze o zgodę marketingową
(`PoradnikForm.tsx:159` obiecuje „okazjonalne wskazówki") nie ma czym jej wykazać:
ani znacznika czasu, ani treści klauzuli.

**Poprawka wdrożona** — patrz `POPRAWKI-2026-07-29.md`.

### `PELNY2907-08` · [PRAWO] Polityka prywatności nie wymienia dwóch realnie działających procesorów
`src/app/polityka-prywatnosci/page.tsx:99-106` wymienia dosłownie tylko Resend, Vercel i Useme.
Tymczasem kod używa dodatkowo:
- **Cloudflare Turnstile** — `src/lib/turnstile.ts:1`, wołane z obu routów **z przekazaniem IP użytkownika**; skrypt ładuje się w przeglądarce przed jakąkolwiek zgodą;
- **Google (Sheets / Apps Script)** jako odbiorca danych leada — `api/contact/route.ts:27-31` (dziś nieaktywny, ale opisany w kodzie i planowany, patrz `PELNY2907-04`);
- **Google Analytics i Google Ads** — opisane w §cookies, ale nieujęte w akapicie o transferze do USA.

Akapit o podstawie transferu (`:104-107`, SCC / EU-US DPF) obejmuje wyłącznie Resend i Vercel.
Zakres §2 (`:67`) opisuje tylko formularz kontaktowy — kanał `/poradnik` nie jest wymieniony.
Data: „Ostatnia aktualizacja: czerwiec 2026" (`:186-188`).
· **P2 · S · 🧑 · Z (kod)**

**Poprawka:** dopisać Cloudflare, Inc. (ochrona antybotowa, przetwarza IP) i Google, objąć je
tym samym zdaniem o SCC/DPF, dodać kanał poradnika w §2 i §3, podbić datę. Treść prawna →
owner Marcin, gotowy szkic w `POPRAWKI-2026-07-29.md` jako propozycja do akceptacji.

### `PELNY2907-09` · [SEO] `FAQPage` deklaruje 16 pytań, w HTML crawlera jest 6
`src/app/page.tsx:28-39` generuje JSON-LD z całej tablicy `homeFaqs` (16 pozycji,
`src/data/faq.ts:13-78`), a `src/components/FAQ.tsx:12,17` renderuje `faqs.slice(0, 6)`.
Live w surowym HTML `/`: `id="faq-question-0"` … `-5` (6 sztuk) i przycisk
„Pokaż wszystkie pytania (16)"; sparsowany `FAQPage.mainEntity` ma **16**.
Po kliknięciu przycisku w DOM pojawia się 16 — ale Googlebot nie klika.
· **P2 · S · 🤖 · Z (live + kod)**

Wytyczne Google wymagają, żeby oznaczona treść była obecna na stronie. Treść pod akordeonem
jest w porządku, ale tutaj 10 pytań w ogóle nie istnieje w DOM przed interakcją. Ryzyko jest
umiarkowane (rich resulty FAQ Google wyłączył dla stron komercyjnych w 2023, więc zysku
z tego markupu i tak dziś nie ma), ale formalna niezgodność zostaje.

**Poprawka wdrożona:** renderować wszystkie 16 i chować nadmiar CSS-em.

### `PELNY2907-10` · [SEO] Główny `og:image` to portret 1024×1536 zadeklarowany jako 1200×630 — na 12 z 46 stron
`public/images/marcin-hero.jpg` = **1024×1536** (odczyt nagłówka JPEG), a `src/app/layout.tsx:48-55`
i analogicznie `uslugi/page.tsx`, `portfolio/page.tsx`, `blog/page.tsx`, `kontakt/page.tsx`,
`galeria/page.tsx`, `poradnik/page.tsx`, `polityka-prywatnosci/page.tsx` deklarują
`width: 1200, height: 630`. Dodatkowo `portfolio/[slug]/page.tsx:38` podaje te same wymiary
dla obrazów 2000×2000, 1365×2048 i 1333×2000.
· **P2 · M · 🧑 [stop-condition `CLAUDE.md §10.3` — `metadata` w `layout.tsx`] · Z (live + kod)**

LinkedIn i Facebook renderują kartę 1.91:1 — pionowy portret zostanie przycięty przez środek.
To dotyczy strony głównej i `/portfolio`, czyli linków udostępnianych najczęściej. Podstrony
usług i bloga mają to zrobione **poprawnie** (7/7 i 26/26 plików dokładnie 1200×630), więc
w tej jednej rzeczy podstrony biją stronę główną.

**Poprawka:** wygenerować `public/images/og/home.jpg` 1200×630 (skrypt `scripts/generate-og-uslugi.py`
już to robi dla usług) i podmienić ścieżkę w 8 plikach metadanych. Wymaga zgody — decyzja D4.

### `PELNY2907-11` · [SEO] `Offer.price` na 7 podstronach usług podaje cenę startową jako cenę dokładną
`src/app/uslugi/[slug]/page.tsx:80-103` — `service.price.match(/\d[\d\s]*\d|\d/)` zamienia
`"od 150 zł/os."` na `price: "150"`. Live `/uslugi/sesje-zespolowe`:
`"offers":{"@type":"Offer","priceCurrency":"PLN","price":"150"}`.
Widoczna treść mówi „od 150 zł/os." przy minimum 4 osób (realnie od 600 zł).
· **P2 · S · 🧑 [stop-condition §10.3 — JSON-LD] · Z (live + kod)**

**Poprawka:** `priceSpecification` z `minPrice` zamiast `price` (semantycznie poprawne „od")
albo usunięcie `offers` — to drugie jest spójniejsze z modelem „cena na zapytanie". Decyzja D5.

### `PELNY2907-12` · [TREŚĆ] „Brief" — słowo z czarnej listy — wita klienta na jedynej stronie docelowej lejka
`src/app/kontakt/page.tsx:48` → `title: "Przygotuj krótki brief"`; `:103` → „Napisz brief,
a odezwę się w ciągu 24 godzin z wstępną wyceną i terminem". Dalej: `:18` i `:33` (OG i Twitter),
`:153`, `Process.tsx:10` (nazwa kroku), `About.tsx:58`, `uslugi/page.tsx:78`, `layout.tsx:289`
(JSON-LD WebSite), `faq.ts:16` i `:24`, oraz `src/data/services.tsx:413`
(`PRICE_FAQ_CLOSING`, powielone do FAQ **wszystkich 7 usług**).
· **P2 · S · 🧑 · Z (kod)**

Reguła jest znana i zastosowana punktowo — w `Services.tsx:111` stoi komentarz
*„Głos strony, bez żargonu «brief»"*. Czyli w jednym miejscu wyczyszczono, w dziesięciu zostawiono.
`PRICE_FAQ_CLOSING` to jedna zmiana zamykająca 7 usług naraz.

**Poprawka wdrożona częściowo** (powierzchnie poza `layout.tsx`) — patrz `POPRAWKI-2026-07-29.md`.

### `PELNY2907-13` · [TREŚĆ] Obietnica „24h" ma cztery różne wersje, a najsłabsza pada w najgorszym momencie
| powierzchnia | plik:linia | co obiecuje |
|---|---|---|
| chip hero | `Hero.tsx:81`, `ServiceHero.tsx:99` | „Odpowiedź w 24h" |
| linijka pod usługami | `Services.tsx:115-117` | „wrócę z **gotową ofertą** w ciągu 24h" |
| lewa kolumna formularza | `CTA.tsx:147` | „**spersonalizowaną ofertą** dopasowaną do Twojego budżetu" |
| **ekran sukcesu** | `CTA.tsx:308-310` | „Odpowiem najszybciej jak to możliwe (**zazwyczaj** w ciągu 24h)" |
| karta `/kontakt` | `kontakt/page.tsx:41` | „**jeden dzień roboczy**, z **wstępną** wyceną" |
| FAQ 7 usług | `services.tsx:413` | „**Konkretną** wycenę dostajesz w 24h" |
· **P2 · S · 🧑 · Z (kod)**

Trzy osie rozjazdu: wstępna vs konkretna/gotowa wycena; 24h vs jeden dzień roboczy (piątek 17:00
to różnica trzech dni); twardo vs „zazwyczaj". Najgorsze umiejscowienie: osłabienie pada
dokładnie w chwili, w której klient właśnie zaufał obietnicy i wysłał formularz.

**Poprawka:** wybrać jedną formułę. To decyzja o treści obietnicy handlowej → D6 w §12.

### `PELNY2907-14` · [TECH] Lead z formularza ginie w całości, gdy Resend zwróci błąd
`src/app/api/contact/route.ts:163-167` (`if (!res.ok) { … return 502 }`) i `:170-174`
(`pushToCrm` wołane dopiero w gałęzi sukcesu).
· **P2 · S · 🤖 · Z (kod)**

Jedyna żywa ścieżka leada ma jeden punkt awarii: chwilowa awaria albo limit Resend kasuje
zgłoszenie z obu kanałów naraz, mimo że webhook CRM jest niezależną usługą i mógłby je uratować.
Klient widzi błąd i zwykle nie próbuje drugi raz.

**Poprawka wdrożona:** `pushToCrm` przed sprawdzeniem `res.ok`.

### `PELNY2907-15` · [TECH] `/api/lead` zwraca 502, gdy nie uda się wysłać poradnika — i nie powiadamia Marcina
`src/app/api/lead/route.ts:131-143` (`to: [email]`, `return 502` gdy `!guideRes.ok`) i `:154-162`
(powiadomienie do Marcina dopiero **po** sukcesie pierwszego maila). `PoradnikForm.tsx:59-67`
pobiera PDF tylko przy `res.ok`.
· **P2 · S · 🤖 · Z (kod)**

Jeśli mail do subskrybenta odbije się z jakiegokolwiek powodu, użytkownik widzi „Coś poszło
nie tak", PDF się nie pobiera, **a Marcin nie dowiaduje się nawet, że ktoś próbował**.
W GA4 `generate_lead` ma w ostatnich 28 dniach zero danych strumienia — nie da się z tego
wywnioskować, czy nikt nie próbował, czy próby padały po cichu.

**Poprawka wdrożona:** najpierw powiadomienie do Marcina i CRM, potem mail z poradnikiem;
porażka samego maila do subskrybenta nie wywraca całej odpowiedzi.

### `PELNY2907-16` · [TECH] `DESIGN.md` — deklarowane źródło prawdy o wizualu — odsyła 11 razy do nieistniejących plików
`grep -c 'Pricing\.tsx' DESIGN.md` → **12** (m.in. `:26`, `:119`, `:122`, `:127`, `:150`, `:168`,
`:187`, `:209`, `:230`, `:310`), ale jedna z tych linii (`DESIGN.md:156`) dotyczy
`PortfolioPricing.tsx`, który **istnieje** — fałszywe trafienie wzorca; a jedyne trafienie
`Showreel` (`:168`) pokrywa się z jedną z pozostałych. **Unikalnych martwych odsyłaczy: 11.** `DESIGN.md:106` deklaruje „Heading: Barlow — wagi 600,700,800,900", nieaktualne od 23.07.
· **P2 · M · 🤖 · Z (kod)**

Nagłówek pliku (`:3-5`) brzmi: *„Każda sesja AI/agenta edytująca widoczną warstwę strony ma go
przeczytać przed zmianą"*. Agent, który go posłucha, dostanie 11 martwych odsyłaczy z numerami
linii i błędną informację o foncie nagłówkowym. To nie jest bierny dryf dokumentacji, tylko
instrukcja prowadząca w ślepy zaułek przy **każdym kolejnym briefie**.

**Poprawka:** przekreślić nieaktualne wiersze (nie kasować historii, `METODYKA §4`), zaktualizować
§2.1 na „Heading: Inter (token `--font-barlow` = celowy alias, decyzja 2026-07-23)". Wymaga zgody — D7.

### `PELNY2907-17` · [TECH] `CLAUDE.md` rozjechany z kodem w ośmiu miejscach
- `§1:13` „Obecna domena wpisana w kodzie: `marcinszabunia.pl` (do zmiany)" — nieprawda i sprzeczne z `§9:155` w tym samym pliku (`grep -rn "marcinszabunia\.pl" src/ public/` → **0 trafień**).
- `§2:21` „Next.js 16.1.6" — zainstalowane **16.2.10**.
- `§2` nie wymienia 4 z 8 zależności produkcyjnych: `@upstash/ratelimit`, `@upstash/redis`, `@vercel/analytics`, `@vercel/speed-insights`.
- `§2:27` i `§4:87` „Barlow + Inter" — Barlow usunięty (`layout.tsx:10-15`).
- `§3:49` struktura wymienia `kalkulator/`, nie wymienia `galeria/`, `kontakt/`, `poradnik/`, `api/`, `feed.xml/`.
- `§3:51` „34 komponenty" — realnie **46**.
- `§6:127` DoD każe testować `/kalkulator`, która jest 301.
- `§8:144` wymienia 4 zmienne środowiskowe; kod czyta **10**.
· **P2 · M · 🧑 · Z (kod)**

`CLAUDE.md` jest pierwszym plikiem, który czyta każdy agent. Osiem nieprawd naraz to koszt
płacony przy każdym kolejnym zadaniu. Zmiana wymaga zgody Marcina (stopka `CLAUDE.md:245`) — D8.

### `PELNY2907-18` · [SEO] Thin content na 5 wpisach i na dwóch stronach lejka
Policzone z `blog.ts` (treść po usunięciu tagów) i z live `<main>`: `wideo-marketing-dla-firm-formaty`
**271 słów**, `fotografia-produktowa-ecommerce` 278, `fotografia-przemyslowa-fabryka` 284,
`bledy-zdjecia-zespolu` 298, `headshoty-linkedin-konwersja` 300; mediana 26 wpisów ≈ 372.
Live `<main>`: `/poradnik` **149 słów**, `/portfolio` **168**, `/uslugi` **320** (przy `priority: 0.9`).
Podstrony usług są w porządku (723–842 słowa).
· **P2 · L · 🧑 · Z (live + kod)**

Średnia pozycja 22,8 przy 2,24 tys. wyświetleń oznacza, że strony wchodzą do indeksu, ale
rankują na 3. stronie wyników. Przy frazach typu „packshot" czy „ile kosztuje sesja wizerunkowa"
konkurencja publikuje 1000–2000 słów. To nie jest hamulec nr 1 (backlinki = 0 nadal są),
ale jest to hamulec, na który Marcin ma pełny wpływ bez proszenia kogokolwiek o link.

**Priorytet rozbudowy:** `fotografia-produktowa-ecommerce` (fraza „fotografia produktowa poznań"
ma 75 + 60 wyświetleń w 90 dniach), potem `/poradnik`.

### `PELNY2907-19` · [SEO] Google nadal pokazuje w wynikach `szabunia.pl › kalkulator`
SERP na żywo 2026-07-29 (zapytanie „Marcin Szabunia fotograf biznesowy Poznań"): w wynikach
organicznych widnieje pozycja **„Kalkulator wyceny sesji foto i wideo — szabunia.pl › kalkulator"**
ze snippetem „Odpowiadam w ciągu 24h ze spersonalizowaną ofertą…".
· **P2 · S · ➖ (samo minie) · Z (live)**

URL jest poprawnym 308 na `/kontakt`, więc użytkownik trafi na formularz — ale zobaczy najpierw
zapowiedź kalkulatora. Wpis wypadnie z indeksu przy kolejnym przecrawlowaniu; **nie warto
zgłaszać usunięcia w GSC**, bo 301/308 załatwia to sam, a ręczne usunięcie potrafi zabrać
przy okazji stronę docelową. Odnotowane jako obserwacja z terminem kontrolnym (§13).

### `PELNY2907-20` · [POMIAR] Dwie równoległe taksonomie zdarzeń formularza w GA4
Raport zdarzeń GA4 (1–28.07): `form_start` **12** i `form_submit` **1** obok
`contact_form_started` **6** i `contact_submit` **2**. `grep` w `src/` pokazuje, że kod emituje
**wyłącznie** `contact_form_started` i `contact_submit` (`CTA.tsx:87`, `:109`) — `form_start`
i `form_submit` pochodzą z **pomiaru zaawansowanego GA4** (automatyczne zdarzenia formularzy).
· **P2 · S · 🧑 · Z (panel + kod)**

Dwie miary tej samej rzeczy z rozbieżnymi wynikami (12 vs 6 rozpoczęć, 1 vs 2 wysyłki). Przy
tak małym wolumenie to gwarantowane nieporozumienie przy każdym kolejnym czytaniu raportu.
Automatyczny `form_submit` w ogóle nie jest wiarygodny dla tego formularza, bo wysyłka idzie
przez `fetch` z `preventDefault`.

**Poprawka:** w GA4 → Administracja → Strumienie danych → Pomiar zaawansowany wyłączyć
„Interakcje z formularzem", zostawić własne zdarzenia jako jedyne źródło prawdy. Owner Marcin.

### `PELNY2907-21` · [TECH] Pole `service` przyjmuje dowolny ciąg do 100 znaków
`src/app/api/contact/route.ts:98-108` — `SERVICE_LABELS[service] ?? service`, fallback
przepuszcza wszystko; `:78` (`service: 100`) to jedyne ograniczenie.
· **P2 · S · 🤖 · Z (kod)**

Ryzyka XSS nie ma (`escapeHtml` działa i jest stosowany), ale mail od bota może nieść
100 znaków dowolnej treści w polu, które w skrzynce wygląda na kategorię wybraną z listy.
**Poprawka wdrożona:** walidacja względem kluczy `SERVICE_LABELS`.

---

## 5. Ustalenia P3 / P4

### `PELNY2907-22` · [UX] Kontrast 3,32:1 na linku do polityki prywatności w trybie ciemnym
Pomiar na renderze 2026-07-29, `/` w trybie ciemnym: tekst `rgb(37,99,235)` (`--color-blue`)
na tle `rgb(20,27,45)` (`--color-dark-card`), rozmiar 11 px, wymagane 4,5:1, **zmierzone 3,32:1**.
Element: link „polityką prywatności" w klauzuli RODO pod formularzem.
· **P3 · S · 🤖 · Z (pomiar live)**

Jedyne realne naruszenie kontrastu na całej stronie głównej w obu motywach. Reguła projektu
mówi: `steel-light` tylko na ciemnym tle — tu problem jest odwrotny, `blue` jest za ciemny
na ciemnym. **Poprawka wdrożona:** `dark:text-blue-light`.

### `PELNY2907-23` · [UX] 12 elementów klikalnych poniżej 24×24 px
Pomiar `getBoundingClientRect` @606 px, 2026-07-29: 69 elementów interaktywnych, z czego
**38 poniżej 44 px** (zalecenie WCAG 2.5.5, poziom AAA) i **12 poniżej 24 px**
(WCAG 2.2 SC 2.5.8, poziom AA): linki nawigacji (20 px wysokości), „Pokaż wszystkie pytania",
„Zobacz wszystkie artykuły", „Przeczytaj więcej opinii", „Zobacz wydanie", checkbox zgody
(16×16), link „polityką prywatności" (14 px), „Polityka prywatności" w stopce (16 px).
Baseline z 23.07 mówił o 18 linkach <32 px — **pomiar dzisiejszy przy progu 24 px daje 12**,
więc commit `e0cc377` („większe tap-targety w stopce") realnie pomógł, ale nie domknął tematu.
· **P3 · M · 🤖 · Z (pomiar live)**

Uwaga metodyczna: część z nich to elementy w ciągu tekstu, dla których SC 2.5.8 przewiduje
wyjątek „inline". Realnie do poprawy są: checkbox zgody, przyciski „Pokaż wszystkie" /
„Zobacz wszystkie" oraz linki stopki — czyli 5–6 pozycji, nie 12.

### `PELNY2907-24` · [TECH] `PoradnikForm` bez `ErrorBoundary`, w odróżnieniu od `CTA`
`src/app/poradnik/page.tsx:114` (`<PoradnikForm />` goły) vs `kontakt/page.tsx:170-172`
(`<ErrorBoundary><CTA /></ErrorBoundary>`). Bez `ErrorBoundary` także `blog/[slug]/page.tsx`
i `not-found.tsx`.
· **P3 · S · 🤖 · Z (kod)** — **poprawka wdrożona.**

### `PELNY2907-25` · [TECH] Martwy kod po kalkulatorze w limiterze
`src/lib/ratelimit.ts:36-42` (`quoteRatelimit`, prefix `szabunia-quote`) i `:72-79`
(`isQuoteRateLimited`) nie mają konsumenta; `grep "/api/quote"` w `src/` → 0.
· **P3 · S · 🤖 · Z (kod)** — **poprawka wdrożona.**

### `PELNY2907-26` · [TECH] Fail-open rate-limitu loguje się bez markera `[ALERT]`
`src/lib/ratelimit.ts:54`, `:64`, `:74` (`console.error("Rate-limit pominięty: …")`) vs
`src/lib/turnstile.ts:15-17` (`"[ALERT] Turnstile WYŁĄCZONY: …"`). Wzorzec „nie do przeoczenia
w Vercel Logs" wypracowany dla Turnstile nie został przeniesiony.
· **P4 · S · 🤖 · Z (kod)** — **poprawka wdrożona.**

### `PELNY2907-27` · [TECH] 14 komponentów niesie `"use client"` bez powodu
`About.tsx`, `BlogContent.tsx`, `Hero.tsx`, `LogoBar.tsx`, `PoradnikTeaser.tsx`, `Portfolio.tsx`,
`PortfolioCaseStudy.tsx`, `PortfolioHero.tsx`, `PortfolioPricing.tsx`, `PortfolioProcess.tsx`,
`Process.tsx`, `Publications.tsx`, `ServiceHero.tsx`, `Services.tsx` — żaden nie używa stanu,
efektu, handlera ani `window`. Ich importy to `next/image`, `next/link`, `AnimatedSection`,
`Parallax` (te dwa są już własnymi komponentami klienckimi).
· **P3 · M · 🤖 · Z (kod)**

Dyrektywa w rodzicu wciąga do bundla klienckiego cały JSX i wszystkie statyczne dane sekcji.
**Nie wdrażam** — to refactor >3 plików spoza briefu (`CLAUDE.md §10.5`), wymaga `next build`
po każdym pliku. Brief gotowy w §11.

### `PELNY2907-28` · [TECH] `pushToCrm` awaitowany przed odpowiedzią HTTP
`api/contact/route.ts:171` przed `return` w `:176`, przy `AbortSignal.timeout(5000)`.
Wolny Apps Script może trzymać przycisk w stanie „Wysyłanie…" nawet 5 sekund po tym,
jak mail już poszedł. · **P3 · S · 🤖 · Z (kod)**
Dziś nieszkodliwe (webhook nieustawiony, `PELNY2907-04`), stanie się realne w dniu wdrożenia CRM.

### `PELNY2907-29` · [SEO] `sitemap.xml`: `lastModified` tylko na 26 z 46 URL-i
`src/app/sitemap.ts:23-28` ustawia je wyłącznie dla `blogPages`. 20 URL-i bez sygnału świeżości,
w tym huby i strony usług, które zmieniały się intensywnie w lipcu.
· **P3 · S · 🤖 · Z (live + kod)** — **poprawka wdrożona.**

### `PELNY2907-30` · [SEO] `BreadcrumbList` na 6 trasach bez widocznych okruszków
`uslugi/page.tsx:44`, `portfolio/page.tsx:48`, `blog/page.tsx:43`, `galeria/page.tsx:138`,
`poradnik/page.tsx:51`, `kontakt/page.tsx:78` — w `<main>` tych stron ciąg „Strona główna"
występuje 0 razy. Ta sama klasa problemu co `PELNY2907-09`. · **P3 · S · 🤖 · Z (live + kod)**

### `PELNY2907-31` · [SEO] Brak `@id` łączących encje; `BlogPosting` bez `dateModified`
`layout.tsx:122-297` emituje `ProfessionalService`, `Person` i `WebSite` na wszystkich 46 stronach
jako **niepowiązane węzły**, bez `@id` i bez wzajemnych referencji. `blog/[slug]/page.tsx:69-88`
nie ma `dateModified`. · **P3 · M · 🧑 [stop-condition §10.3] · Z (live + kod)**
Nadanie `@id` (`#business`, `#person`, `#website`) i spięcie ich przez `publisher`/`founder`
to najtańszy dostępny zabieg pod Knowledge Graph przy zerowych backlinkach.

### `PELNY2907-32` · [SEO] `sameAs` prowadzi przez shortlink do SERP-a z parametrami UTM
`layout.tsx:165`, `:265`, `kontakt/page.tsx:72` → `https://share.google/2OMRlIblNmEKlthIl`,
który live przekierowuje 302 na `google.com/search?kgmid=…&utm_source=epsd1,ltae,sh/…`.
`sameAs` powinno wskazywać stabilny URL profilu. · **P3 · S · 🧑 · Z (live)**

### `PELNY2907-33` · [SEO] Lead magnet PDF jest publicznie dostępny i indeksowalny
`HEAD https://szabunia.pl/poradnik-przygotowanie-do-sesji.pdf` → **200**, brak `X-Robots-Tag`,
`robots.txt` blokuje wyłącznie `/api/`. Plik nie jest linkowany przed wysłaniem formularza,
więc dziś Google go nie zna — ale jedno udostępnienie linku z maila wystarczy, żeby bramka
leadowa przestała zbierać adresy. · **P3 · S · 🤖 · Z (live + kod)** — **poprawka wdrożona
w `robots.txt`** (tańsze niż `headers()` w `next.config.ts`, który jest stop-condition).

### `PELNY2907-34` · [SEO] Box17 i Yes Butcher mają po 1–2 linki wewnętrzne
Graf linków zbudowany z live HTML wszystkich 46 stron: `box17-budki-akustyczne` → **1**,
`yes-butcher-przewodnik-michelin` → **2**, przy 46 dla stron ze stopki.
Yes Butcher z gwiazdką Michelin to najmocniejszy dowód społeczny w całym portfolio.
· **P3 · S · 🤖 · Z (live)**
**Powiązane z D1** — dodanie `yes-butcher` do `FEATURED_SLUGS` w `Portfolio.tsx:13-18` ma sens
niezależnie od decyzji o Box17.

### `PELNY2907-35` · [TREŚĆ] Czas rozstawienia mobilnego studia: 20 minut w ośmiu miejscach, 30 w jednym
Kanon „20 min": `services.tsx:197`, `:214`, `:223`, `portfolio.ts:400`, `:519`, `blog.ts:322`,
`:467`, `:490`. Odstający: `blog.ts:788` — „Rozstawienie zajmuje około 30 minut".
· **P3 · S · 🧑 · Z (kod)** — **poprawka wdrożona** (wyrównanie do kanonu, nie zmiana oferty).

### `PELNY2907-36` · [TREŚĆ] Statystyki LinkedIn sprzeczne w jednym akapicie
`blog.ts:90`: „Według danych LinkedIn, profile z profesjonalnym zdjęciem generują
**14 razy więcej wyświetleń**"; dwie linie niżej `:92`: „**21x** więcej wyświetleń profilu".
Powtórzone w `:75` (FAQ → trafia do JSON-LD `FAQPage`), `:81` i `:122` (meta description).
Zestaw 21x/36x/9x krąży w materiałach LinkedIn; **liczby 14x nie udało się przypisać do źródła**
(sprawdzone 2026-07-29 — wtórne cytowania podają wyłącznie 21/36/9).
· **P3 · S · 🧑 · Z (kod) + O (ocena źródła)**

Fotograf sprzedający wiarygodność wizerunku podaje w jednym akapicie dwie sprzeczne liczby.
**Nie poprawiam samodzielnie** — to twierdzenie liczbowe, `CLAUDE.md §11.8`. Decyzja D9.

### `PELNY2907-37` · [TREŚĆ] Drobne niespójności zapisu
- Długi myślnik w cytacie opinii: `Testimonials.tsx:26` („przełamuje lody — nawet jeśli") vs `services.tsx:491` (przecinek) — **ten sam cytat w dwóch wersjach**. **Poprawka wdrożona.**
- „Kompleksowe usługi foto i wideo dla firm" (`Services.tsx:21`) — jedyna fraza z czarnej listy `zasady-tekstow.md` na całej stronie głównej. **Poprawka wdrożona.**
- `3m²` bez spacji (`services.tsx:83`, `portfolio.ts:400`, `:532`) vs `3 m²` (`services.tsx:223`, `blog.ts:1283`) — ten sam plik używa obu.
- „Ekspres" (`services.tsx:84`, `faq.ts:20`) vs „Express" (`Warunki.tsx:65`).
- „Wolne terminy: 1–3 tyg." (`Hero.tsx:87`, półpauza) vs „zwykle w 1-3 tyg." (`CTA.tsx:153`, dywiz) — dwa znaki i dwa sformułowania tej samej informacji, oba na stronie głównej.
· **P4 · S · 🤖 · Z (kod)**

### `PELNY2907-38` · [TECH] `.env.local.example` nie jest w repozytorium
`git ls-files | grep -i env` → pusto; `git check-ignore -v .env.local.example` → `.gitignore:39:.env*`.
`CLAUDE.md §8:143` obiecuje ten plik, a świeży klon go nie ma — każde nowe środowisko startuje
bez listy 10 wymaganych zmiennych. · **P3 · S · 🧑 [stop-condition §7 — `.gitignore`] · Z (git)**

### `PELNY2907-39` · [TECH] `README.md` to nietknięty boilerplate `create-next-app`
Mówi o foncie **Geist** (którego nie ma) i o `app/page.tsx` (jest `src/app/page.tsx`).
Pierwszy plik, który widzi człowiek otwierający **publiczne** repo na GitHubie.
· **P4 · S · 🧑 · Z (kod)**

### `PELNY2907-40` · [TECH] `theme-color` przybity do jasnego `#F9FAFB`
`layout.tsx:91` i `manifest.json:10` — pasek przeglądarki zostaje biały przy ciemnej stronie.
· **P4 · S · 🧑 [stop-condition §10.3] · Z (kod)**

---

## 6. Hipotezy do sprawdzenia (H)

**H1. GSC pokazuje 0 linków wewnętrznych, co przy 46 zindeksowanych stronach jest anomalią.**
Raport „Linki" (2026-07-29): „Linki zewnętrzne — Łącznie 0" ORAZ „Linki wewnętrzne — Łącznie 0",
przy grafie 46 stron, gdzie sama stopka daje 8 linków sitewide. Zewnętrzne 0 jest wiarygodne
i znane; wewnętrzne 0 — nie. Możliwe przyczyny: opóźnienie przetwarzania po migracji domeny,
albo raport liczy tylko strony ze świeżym crawlem.
**Krok weryfikujący:** sprawdzić ten sam raport za 2–3 tygodnie; jeśli nadal 0 przy rosnącej
indeksacji, zgłosić w Google Search Central. Nie zmieniać niczego w kodzie na tej podstawie.

**H2. `CONTACT_FROM_EMAIL` może wskazywać na sandbox `onboarding@resend.dev`.**
Zmienna **jest ustawiona** w Vercel (dodana 3 czerwca), ale wartość jest zamaskowana i nie
sprawdzałem jej — nie zaglądam w wartości sekretów. Jeśli to sandbox, `PELNY2907-15` awansuje
do P1, bo Resend przepuszcza wtedy maile wyłącznie na adres właściciela konta, a poradnik
idzie na adres subskrybenta.
**Krok weryfikujący:** Resend → Domains → czy `szabunia.pl` ma status Verified (30 sekund).

**H3. Wpisy z 28.06 (10 sztuk jednego dnia, 347–460 słów, identyczna struktura FAQ) mogą być
traktowane jako publikacja masowa.**
**Krok weryfikujący:** GSC → Skuteczność → Strony, filtr na te 10 URL-i, porównanie średniej
pozycji z wpisami starszymi. Różnica >5 pozycji na niekorzyść = hipoteza się potwierdza.

**H4. Pionowy `og:image` może już psuć CTR z Instagrama.** Instagram był kanałem nr 1,
a linki w Stories i bio korzystają z OG.
**Krok weryfikujący:** LinkedIn Post Inspector i Facebook Sharing Debugger na `https://szabunia.pl/`,
zrzut podglądu z datą. Domyka `PELNY2907-10`.

**H5. Spadek ruchu (−34%) może być w całości efektem przerwy na Instagramie, a nie zmian na stronie.**
Depricing wszedł 23.07, spadek obejmuje całe 28 dni lipca — czyli zaczął się **przed** zmianą.
**Krok weryfikujący:** GA4 → Pozyskiwanie ruchu, porównanie 1–22.07 vs 23–28.07 z podziałem
na kanały. Jeśli Organic Social spadł już w pierwszej połowie lipca, depricing jest oczyszczony
z zarzutu i okno obserwacji trzeba przedłużyć, nie zamykać.

---

## 7. Obserwacje bez akcji

- **Eksperyment z depricingiem nie da się rozstrzygnąć w zaplanowanym oknie.** Przy 39 użytkownikach
  na 28 dni i 2 zgłoszeniach różnica między „działa" a „nie działa" jest poniżej progu szumu.
  Nie relitygujemy decyzji — sygnalizujemy, że termin „połowa sierpnia" trzeba przesunąć albo
  zamienić kryterium na jakościowe (treść zapytań), nie ilościowe.
- **Rynek potwierdza kierunek:** 6 z 7 sprawdzonych konkurentów z Poznania **nie pokazuje cen
  na stronie głównej** (jedyny wyjątek: fotografheadshot.com, 600 zł za wąsko zdefiniowany headshot).
  „Cena na zapytanie" jest na tym rynku normą, nie odchyleniem.
- **404 w GSC to plik `/_next/static/media/…woff2`** ze starego builda, ostatnio zeskanowany 18.07.
  Nieszkodliwe, konsekwencja odblokowania `/_next/` w `robots.txt` (co samo w sobie było poprawne).
- **Google Ads: „ODPOWIEDNIA (OGRANICZONA)"** — reklamy wyświetlają się, ale stawki nie są w pełni
  zoptymalizowane. Przy budżecie 25 zł/dzień i realnym wydatku ~17 zł/dzień kampania nie wyczerpuje
  budżetu, więc to ograniczenie jakościowe, nie budżetowe.
- **Kreacja reklamy obiecuje „zarezerwuj termin"** („Sprawdź portfolio i zarezerwuj termin"),
  a na stronie nie ma rezerwacji — jest formularz. To ta sama klasa rozjazdu co kalkulator w blogu,
  ale w kanale, którego nie audytowałem w całości (§9).
- **Wizytówka Google: ostatnie zdjęcia 75 dni temu**, 29 interakcji klientów, opinie stoją na 10
  od 6 lipca. Regularność jest tu tańszym dźwignikiem niż cokolwiek w kodzie.
- **Konto na Facebooku żyje: 1 374 obserwujących** („Marcin Szabunia · Digital creator").
  Decyzja „social = tylko Instagram" pozostaje w mocy — ale przy **0 backlinkach** to jest jedyna
  własna powierzchnia, z której można postawić link bez proszenia kogokolwiek. Do rozważenia
  osobno, nie jako zmiana na stronie.
- **Oferteo ma już wizytówkę** („Marcin Szabunia Fotograf Biznesowy — nowy w Oferteo"),
  Maptons linkuje z adresem „Garbary 51" (znany, niepotwierdzony adres).
- **`framer-motion` obsługuje dziś jeden komponent** (`PortfolioGallery.tsx:5`) — migracja na CSS
  została przeprowadzona konsekwentnie i to dobra robota. Została jedna wysepka.
- **31 plików w `public/` waży 500 KB–925 KB**, katalog 45,8 MB. **Żaden nie przekracza progu
  alarmowego 1 MB** z metodyki, a użytkownik pobiera warianty AVIF/WebP przez `next/image`.
  Koszt jest po stronie repo i deployu, nie użytkownika.

---

## 8. Świadomie NIE ruszamy

- Decyzja o modelu „cena na zapytanie" — eksperyment Marcina, nie podlega relitygacji w audycie.
- `--font-barlow` jako alias Intera — celowa decyzja z 23.07.
- Dwa wystąpienia `<LogoBar/>` (`hidden md:block` / `md:hidden`) — celowy zabieg responsywny.
- `Warunki.tsx` — używany na `/galeria`, nie jest martwym kodem.
- `aggregateRating` / `review[]` — usunięte świadomie 6.07, nie przywracamy.
- Brak LinkedIn i Facebooka w `sameAs` — decyzja D z 9.06.
- Stara domena `marcinszabunia.pl` — utrzymywać do ~grudnia 2026 (minimum), bezpieczniej do czerwca 2027.
- Cold outreach mailem po linki — Marcin odrzucił tę taktykę 6.07.
- `next.config.ts`, `metadata` w `layout.tsx`, JSON-LD, `.env*`, `.gitignore` — stop-conditions,
  wszystko z tych obszarów trafiło do §12 jako decyzje, nie do wdrożenia.

---

## 9. Czego NIE sprawdzono i czego trzeba

| Obszar | Powód | Czego potrzeba |
|---|---|---|
| **Core Web Vitals (LCP / CLS / INP)** | Publiczne API PageSpeed Insights zwróciło „Quota exceeded"; Lighthouse uruchomiony lokalnie w kontenerze padał na interstitial certyfikatu proxy sandboxa; pomiar w oknie Chrome Marcina był bezwartościowy, bo karta miała `visibilityState: hidden`, co wstrzymuje `largest-contentful-paint`. **Zgodnie z metodyką §4 nie zgaduję.** Ostatni realny pomiar: PSI 2026-07-07, mobile: Performance 90 / A11y 100 / BP 100 / SEO 100, LCP 3,6 s, CLS 0 | uruchomienie `pagespeed.web.dev` na `https://szabunia.pl/` (mobile i desktop) i wklejenie wyniku — 2 minuty |
| **Kreacje i sitelinki Google Ads** | Deep-linki panelu Ads (`/aw/assets`, `/aw/adsandextensions`) zwracają dziś 404, a UI ładował się >25 s. Ostatnia weryfikacja: 23.07 — 6/6 sitelinków, żaden nie prowadzi do `/kalkulator` | przejrzenie Ads → Reklamy i komponenty → sitelinki i nagłówki, pod kątem „zarezerwuj termin" i cen |
| ~~**`npm run build`**~~ | **ZAMKNIĘTE:** build uruchomiony w weryfikacji, **przechodzi** (58 stron, 46 URL-i w sitemapie, zero błędów prerenderingu) | — |
| **Rozmiary bundli per trasa** | Wymaga `next build` | j.w. |
| **Wartość `CONTACT_FROM_EMAIL`** | Nie zaglądam w wartości sekretów | Resend → Domains, status `szabunia.pl` |
| **Test end-to-end formularzy** | Audyt niczego nie wysyła (metodyka §0.9) | ręczne zgłoszenie testowe przez Marcina + potwierdzenie maila |
| **Rich Results Test / Schema Validator** | Wymaga sesji w narzędziu Google, nie zdążyłem w tej sesji | `search.google.com/test/rich-results` na `/`, `/uslugi/sesje-zespolowe`, `/blog/co-to-jest-packshot`, `/portfolio/woohoo-autopay` |
| **Podgląd społecznościowy (FB / LinkedIn)** | Wymaga zalogowanych debuggerów | domyka `PELNY2907-10` i H4 |
| **Treść PDF-a z poradnikiem** | Nie otwierałem — nie wiem, czy zawiera ceny albo odesłania do kalkulatora. Przy 15 takich odesłaniach w blogu to realne ryzyko | Marcin otwiera plik i sprawdza |
| **Focus trap w menu mobilnym** | `Navigation.tsx` ma Escape (`:63`) i `aria-expanded`, ale **nie używa** `useFocusTrap`, mimo że hook istnieje i działa w trzech lightboxach. Nie testowałem klawiaturą na żywo | przejście Tab-em przy otwartym menu na telefonie |
| **`cennik_2026_07_v2.md`** | Poza repo (`01_Biznes/_System/`) — wszystkie oceny zgodności cen są względem `services.tsx`, nie względem cennika biznesowego | porównanie tabeli z §5 modułu E z plikiem cennikowym |

---

## 10. Pozorne problemy skorygowane w trakcie audytu

Sekcja obowiązkowa — własne fałszywe pozytywy, żeby było wiadomo, ile z tego przetrwało weryfikację.

1. **„9 naruszeń kontrastu na stronie głównej"** → realnie **0 w trybie jasnym, 1 w ciemnym**.
   Pierwszy skrypt szukał tła przez `backgroundColor` i wchodził wyżej w drzewie, gdy trafiał
   na `transparent` — a przyciski CTA mają `bg-gradient-to-br` (tło w `background-image`, nie
   w `background-color`). Efekt: „biały tekst na białym tle, kontrast 1,0" dla przycisku,
   który realnie jest biały na niebieskim gradiencie. Cztery kolejne „naruszenia" to podpisy
   na kaflach portfolio, gdzie tło to `bg-navy/85` zapisane przez przeglądarkę w formacie
   `oklab(…)`, którego mój regex `rgba?\(` nie łapał.
   **Wniosek metodyczny: liczenie kontrastu skryptem wymaga obsługi gradientów i `oklab`,
   inaczej generuje same fałszywe alarmy na nowoczesnym CSS.**

2. **„Dark mode nie działa"** → działa. Pierwszy klik wykonałem z JavaScriptu i odczytałem klasę
   `<html>` **synchronicznie**, przed re-renderem Reacta — wyszło „brak `.dark`". Drugi, realny
   klik przełączył motyw z powrotem na jasny, co wyglądało jak potwierdzenie. Dopiero trzeci
   przebieg z odczekaniem 2 s pokazał `.dark`, tło `rgb(11,15,26)` i `localStorage('theme')='dark'`.
   **Wniosek: stanu Reacta nie odczytuje się w tym samym ticku, w którym się go zmienia.**

3. **„87 nieużywanych obrazów w `public/`"** → **0**. Galerie są listowane z dysku w runtime
   (`src/lib/galleryImages.ts:11-22`), a obrazy OG budowane z interpolacji sluga
   (`blog/[slug]/page.tsx:48`). Weryfikacja odwrotna (26 slugów bloga ↔ 26 plików `og/blog/*.png`)
   dała zero rozbieżności w obie strony.

4. **„Monthly Content 4 900 zł wycieka na wszystkie 46 stron"** → to numer telefonu **514 900 688**
   w stopce. Skan po samym ciągu `4 900` bez kontekstu.

5. **„Ujemne odstępy między sekcjami na mobile (−1174 px, −1881 px)"** → artefakt zagnieżdżonych
   `<section>` i pomiaru przez `getBoundingClientRect` w trakcie animacji `whileInView`.
   Mierzone przez `offsetTop`: **wszystkie odstępy = 0**. Ten sam fałszywy alarm co 7 lipca.

6. **„31 plików >500 KB to problem wydajnościowy"** → próg alarmowy metodyki to 1 MB, największy
   plik ma 925 KB, a użytkownik i tak dostaje AVIF/WebP. Zdegradowane do higieny repo.

7. **„Brak `frame-ancestors` w CSP = clickjacking działa"** → nie działa. CSP bez `frame-ancestors`
   nie unieważnia `X-Frame-Options`, a ten jest ustawiony (`next.config.ts:59`, potwierdzone
   nagłówkiem live). Higiena, nie luka.

8. **„`PageTransition.tsx` ma zbędne `use client`"** → nie ma żadnego. Błąd wzorca grepa.
   Podobnie „4 komponenty używają framer-motion" → to trafienia w **komentarzach** opisujących
   migrację; realny import jest jeden.

---

## 11. Plan działania (kolejnością wdrożenia)

### Quick wins < 1h — wdrożone w tej sesji
Szczegóły i diff: `POPRAWKI-2026-07-29.md`. Objęte: `PELNY2907-02`, `-07`, `-09`, `-12` (częściowo),
`-14`, `-15`, `-21`, `-22`, `-24`, `-25`, `-26`, `-29`, `-33`, `-35`, `-37` (2 z 5).
Weryfikacja: `npm run lint` 0/0, `npx tsc --noEmit` czysto. **Bez commita — git obsługuje Marcin.**

### Do zrobienia przez Marcina, kolejność wg wpływu
1. **Wgrać miniaturę Box17** (`PELNY2907-01`) — 10 minut, odblokowuje główny hub portfolio. **Albo** decyzja D1.
2. **GA4: odznaczyć `calculator_done`** jako kluczowe zdarzenie (`PELNY2907-03`) — 2 minuty,
   bez tego każdy raport od sierpnia kłamie. Administracja → Zdarzenia → gwiazdka przy nazwie.
3. **GA4: wyłączyć „Interakcje z formularzem"** w pomiarze zaawansowanym (`PELNY2907-20`) — 2 minuty.
4. **Sprawdzić Resend → Domains** (H2) — 30 sekund, zamyka albo eskaluje `PELNY2907-15`.
5. **Uruchomić PSI** na `pagespeed.web.dev` (§9) — 2 minuty, zamyka jedyną lukę pomiarową audytu.
6. **Ustawić filtr ruchu wewnętrznego w GA4** (`PELNY2907-46`) — bez tego kolejne odczyty konwersji nic nie znaczą.
7. **Dokończyć albo zamknąć webhook CRM** (`PELNY2907-04`) — decyzja D2.
8. ~~Dodać zdjęcia do wizytówki Google~~ — **odłożone decyzją Marcina 2026-07-29** („na razie bez zdjęć"). Zostaje prośba o 2–3 opinie.

### Briefy dla Claude Code (do osobnej sesji, wymagają `npm run build`)
- **BRIEF-A: zdjęcie `"use client"` z 14 komponentów** (`PELNY2907-27`) — plik po pliku,
  `npx tsc --noEmit` + `npm run build` po każdym. Zacząć od `Process.tsx`, `PortfolioProcess.tsx`,
  `PortfolioPricing.tsx`, `PortfolioCaseStudy.tsx` (czyste dane, zero obrazów).
  AC: bundle trasy `/` mniejszy niż przed zmianą, zero regresji wizualnych.
- **BRIEF-B: rozbudowa 5 najkrótszych wpisów do ≥800 słów** (`PELNY2907-18`), priorytet
  `fotografia-produktowa-ecommerce`. AC: każdy wpis ≥800 słów, zero nowych twierdzeń liczbowych
  bez źródła, zgodność z `zasady-tekstow.md`.
- **BRIEF-C: tap-targety** (`PELNY2907-23`) — checkbox zgody, przyciski „Pokaż wszystkie" /
  „Zobacz wszystkie", linki stopki do ≥24 px. AC: pomiar `getBoundingClientRect` @606 px,
  ≤6 elementów poniżej 24 px i wszystkie w ciągu tekstu.
- **BRIEF-D: `@id` w JSON-LD + `dateModified` w `BlogPosting`** (`PELNY2907-31`) — po zgodzie
  (stop-condition §10.3).

---

## 12. Decyzje dla Marcina (pytania zamknięte)

**D1 · Box17 — pusty kafel na `/portfolio` (`PELNY2907-01`)**
- **A.** Wgrywasz `box17.jpg` (poziomo ~4:3, min. 1600×1200) do `public/images/portfolio/box17/`. Koszt: 10 min. Ryzyko: brak. Odwracalne: tak. **← rekomendacja**
- **B.** Przenoszę `box17-budki-akustyczne` do `DRAFT_SLUGS` — case study znika z huba i z sitemapy do czasu zdjęć. Koszt: 5 min. Ryzyko: tracisz zaindeksowaną stronę (wróci po ponownym crawlu). Odwracalne: tak.
- **C.** Nie robimy nic — dziura w siatce zostaje.
**Kryterium sukcesu:** do 5.08 kafel Box17 renderuje obraz; `HEAD` na plik zwraca 200.

**D2 · Webhook CRM (`PELNY2907-04`)**
- **A.** Dokańczamy wdrożenie: deploy Apps Script → URL i sekret do Vercel. Koszt: ~30 min Twoje. Zysk: leady lądują w arkuszu automatycznie. **← rekomendacja**
- **B.** Uznajemy CRM za ręczny i **usuwam `pushToCrm` z kodu**, żeby nie sugerował działającej automatyzacji. Koszt: 15 min moje. Ryzyko: przy 2 leadach na miesiąc ręcznie to nie jest problem.
- **C.** Zostawiamy jak jest — kod woła webhook, którego nie ma. Najgorsza opcja: wygląda na działające, nie działa.
**Kryterium sukcesu:** pierwsze zgłoszenie po zmianie pojawia się w arkuszu (A) albo `grep pushToCrm src/` = 0 (B).

**D3 · Ceny w `llms.txt` (`PELNY2907-06`)**
- **A.** Zostawiamy pełny cennik, poprawiam tylko dwie etykiety (`kalkulator wyceny` → `Kontakt`). Asystenci AI dalej kwalifikują po budżecie, strona dalej wymusza rozmowę. Koszt: 10 min. **← rekomendacja**
- **B.** Zastępujemy sekcję kotwicami „od X zł" + zdaniem o wycenie w 24h. Pełna spójność z frontem, ale klient pytający ChatGPT nie dostaje konkretu i część odpadnie wcześniej.
- **C.** Nic — kanał AI zostaje niespójny z lejkiem na czas eksperymentu, co skaża jego wynik.
**Kryterium sukcesu:** po zmianie zero kwot pakietowych poza `services.tsx` (B) albo zero wzmianek o kalkulatorze w `llms.txt` (A).

**D4 · Obraz OG dla strony głównej (`PELNY2907-10`)** — wymaga edycji `metadata` w `layout.tsx` (§10.3)
- **A.** Generuję `og/home.jpg` 1200×630 i podmieniam ścieżkę w 8 plikach. Koszt: 30 min. Ryzyko: zerowe, sam obrazek. **← rekomendacja**
- **B.** Zostawiamy portret — każdy link na LinkedIn przycięty przez środek.
**Kryterium sukcesu:** LinkedIn Post Inspector pokazuje pełną kartę poziomą.

**D5 · `Offer.price` w danych strukturalnych (`PELNY2907-11`)** — stop-condition §10.3
- **A.** `priceSpecification` z `minPrice` zamiast `price` — semantycznie poprawne „od". **← rekomendacja**
- **B.** Usuwamy `offers` całkowicie — spójne z „ceną na zapytanie", zero ryzyka niezgodności.
- **C.** Zostawiamy `price: "150"` przy realnym minimum ~600 zł.

**D6 · Jedna formuła obietnicy „24h" (`PELNY2907-13`)**
- **A.** „Wstępna wycena w 24h" wszędzie — najbezpieczniejsza, zgodna z tym, co realnie robisz. **← rekomendacja**
- **B.** „Konkretna wycena w 24h" wszędzie — mocniejsza, ale musisz ją dowozić także w piątek po 17.
- **C.** Zostawiamy cztery wersje.
**Kryterium sukcesu:** `grep` po frazie daje jedno brzmienie na wszystkich 11 powierzchniach.

**D7 · `DESIGN.md` (`PELNY2907-16`)** — czy mam poprawić 13 martwych odsyłaczy i wpis o foncie? **Tak / Nie**

**D8 · `CLAUDE.md` (`PELNY2907-17`)** — czy mam zaktualizować 8 rozjazdów (wersje, struktura, zmienne, §9)? **Tak / Nie**

**D9 · Statystyka LinkedIn 14x vs 21x (`PELNY2907-36`)**
- **A.** Zostawiamy jeden zestaw (21x/36x/9x) z linkiem do źródła i datą odczytu. **← rekomendacja**
- **B.** Usuwamy liczby, opisujemy jakościowo.
- **C.** Zostawiamy sprzeczność.

**D10 · Facebook jako źródło linku** — masz żywy profil z 1 374 obserwującymi, a witryna ma
**0 backlinków**. Czy dopisujemy link do `szabunia.pl` w profilu FB (i ewentualnie FB do `sameAs`)?
To jedyna powierzchnia, na której możesz postawić link bez proszenia kogokolwiek.
**Tak, oba / Tak, tylko link w profilu / Nie, zostajemy przy samym Instagramie**

---

## 13. Data kontrolna re-audytu

**26 sierpnia 2026** (4 tygodnie). Mierzyć TYMI SAMYMI metrykami:

| Metryka | Wartość dziś | Źródło | Próg sukcesu |
|---|---|---|---|
| GSC: zindeksowane / niezindeksowane | 46 / 5 | GSC → Indeksowanie → Strony | ≥46 / ≤5 |
| GSC: kliknięcia / wyświetlenia / pozycja (90 dni) | 23 / 2,24 tys. / 22,8 | GSC → Skuteczność | wyświetlenia ≥2,5 tys., pozycja ≤22 |
| GSC: linki zewnętrzne | 0 | GSC → Linki | ≥1 |
| GA4: użytkownicy / 28 dni | 39 (z ruchem własnym) | GA4 → Strona główna | najpierw filtr ruchu wewnętrznego, potem nowa baza |
| GA4: `contact_submit` / 28 dni | 2 | GA4 → Zdarzenia | ≥3 |
| GA4: kluczowe zdarzenia zawierające `calculator_done` | tak | GA4 → Administracja → Zdarzenia | nie |
| Ads: koszt konwersji | 120,82 zł | Ads → Kampanie | ≤120 zł |
| Wizytówka: opinie | 10 | wizytówka | ≥12 |
| `scrollHeight` @606 px | 13 431 px | Chrome, `document.documentElement.scrollHeight` | ≤14 000 px |
| Tap-targety <24 px @606 px | 12 | Chrome, `getBoundingClientRect` | ≤6 |
| Kontrast: naruszenia w trybie ciemnym | 1 → 0 po poprawce | pomiar na renderze | 0 |
| Box17 w draftach (dopóki brak zdjęć) | w draftach | `isPortfolioDraft` | bez zmian albo 200 na miniaturze |
| Wystąpienia „kalkulator" w `blog.ts` | 14 → 0 po poprawce | grep | 0 |

---

## 14. Rejestr findingów

| ID | Tytuł | Prio | Pewność | Owner | Status |
|---|---|---|---|---|---|
| PELNY2907-01 | Pusty kafel Box17 na `/portfolio` | P1 | Z (live+kod) | 🧑 | **zamknięty 29.07 — D1/B, case study w draftach do czasu zdjęć** |
| PELNY2907-02 | 14 odesłań w blogu + 1 w llms.txt do kalkulatora | P1 | Z (live+kod) | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-03 | `calculator_done` nadal kluczowym zdarzeniem GA4 | P1 | Z (panel+kod) | 🧑 | **zamknięty 29.07 — odznaczone w GA4** |
| PELNY2907-04 | Webhook CRM bez zmiennych na produkcji | P1 | Z (panel+kod) | 🧑 | otwarty → D2 |
| PELNY2907-05 | ~~Ruch −34%, Instagram wygaszony~~ | ➖ | — | — | **wycofany** — to były wizyty własne Marcina |
| PELNY2907-46 | Brak filtra ruchu wewnętrznego w GA4 → dane skażone wizytami właściciela | **P1** | Z (potwierdzone przez Marcina) | 🧑 | otwarty |
| PELNY2907-06 | Pełny cennik w `llms.txt` | P1 | Z (live+kod) | 🧑 | otwarty → D3 |
| PELNY2907-07 | Zgoda RODO bez dowodu | P2 | Z (kod) | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-08 | Polityka bez Cloudflare i Google | P2 | Z (kod) | 🧑 | otwarty (szkic gotowy) |
| PELNY2907-09 | `FAQPage` 16 vs 6 w HTML | P2 | Z (live+kod) | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-10 | `og:image` 1024×1536 jako 1200×630 | P2 | Z (live+kod) | 🧑 | otwarty → D4 |
| PELNY2907-11 | `Offer.price` = cena startowa | P2 | Z (live+kod) | 🧑 | otwarty → D5 |
| PELNY2907-12 | „Brief" na 11 powierzchniach | P2 | Z (kod) | 🧑 | **częściowo wdrożony** |
| PELNY2907-13 | Cztery wersje obietnicy 24h | P2 | Z (kod) | 🧑 | otwarty → D6 |
| PELNY2907-14 | Lead ginie przy błędzie Resend | P2 | Z (kod) | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-15 | `/api/lead` 502 bez powiadomienia | P2 | Z (kod) + H2 | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-16 | `DESIGN.md` 11 martwych odsyłaczy | P2 | Z (kod) | 🤖 | otwarty → D7 |
| PELNY2907-17 | `CLAUDE.md` 8 rozjazdów | P2 | Z (kod) | 🧑 | otwarty → D8 |
| PELNY2907-18 | Thin content: 5 wpisów + `/poradnik` | P2 | Z (live+kod) | 🧑 | otwarty (BRIEF-B) |
| PELNY2907-19 | `/kalkulator` nadal w SERP | P2 | Z (live) | ➖ | obserwacja |
| PELNY2907-20 | Dwie taksonomie zdarzeń formularza | P2 | Z (panel+kod) | 🧑 | otwarty |
| PELNY2907-21 | `service` bez walidacji | P2 | Z (kod) | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-22 | Kontrast 3,32:1 w trybie ciemnym | P3 | Z (pomiar) | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-23 | 12 tap-targetów <24 px | P3 | Z (pomiar) | 🤖 | otwarty (BRIEF-C) |
| PELNY2907-24 | `PoradnikForm` bez `ErrorBoundary` | P3 | Z (kod) | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-25 | Martwy `isQuoteRateLimited` | P3 | Z (kod) | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-26 | Rate-limit bez markera `[ALERT]` | P4 | Z (kod) | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-27 | 14× zbędne `"use client"` | P3 | Z (kod) | 🤖 | otwarty (BRIEF-A) |
| PELNY2907-28 | `pushToCrm` awaitowany przed odpowiedzią | P3 | Z (kod) | 🤖 | otwarty (zależny od D2) |
| PELNY2907-29 | `lastModified` na 26 z 46 URL-i | P3 | Z (live+kod) | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-30 | `BreadcrumbList` bez okruszków | P3 | Z (live+kod) | 🤖 | otwarty |
| PELNY2907-31 | Brak `@id`, brak `dateModified` | P3 | Z (live+kod) | 🧑 | otwarty (BRIEF-D) |
| PELNY2907-32 | `sameAs` przez shortlink z UTM | P3 | Z (live) | 🧑 | otwarty |
| PELNY2907-33 | PDF poradnika indeksowalny | P3 | Z (live+kod) | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-34 | Box17 i Yes Butcher: 1–2 linki wewnętrzne | P3 | Z (live) | 🤖 | otwarty |
| PELNY2907-35 | Rozstawienie studia: 30 vs 20 minut | P3 | Z (kod) | 🤖 | **wdrożony, niezdeployowany** |
| PELNY2907-36 | LinkedIn 14x vs 21x | P3 | Z (kod) + O | 🧑 | otwarty → D9 |
| PELNY2907-37 | Niespójności zapisu (5 pozycji) | P4 | Z (kod) | 🤖 | **2 z 5 wdrożone** |
| PELNY2907-38 | `.env.local.example` poza repo | P3 | Z (git) | 🧑 | otwarty |
| PELNY2907-39 | `README.md` to boilerplate | P4 | Z (kod) | 🧑 | otwarty |
| PELNY2907-40 | `theme-color` bez wariantu ciemnego | P4 | Z (kod) | 🧑 | otwarty |

**Domknięcie punktów otwartych z 23.07:**

| Punkt z 23.07 | Status dziś |
|---|---|
| Tap-targety <32 px (18 sztuk) | **poprawa** — przy progu 24 px zostało 12, realnie do naprawy 5–6 |
| Weryfikacja Turnstile | **zamknięty** — klucze ustawione w Vercel, weryfikacja serwerowa działa |
| Niespójność godzin wizytówka ↔ JSON-LD | **zamknięty** — wizytówka pn–pt 09:00–18:00 = JSON-LD |
| 0 backlinków | **bez zmian** — nadal 0, hamulec nr 1 |
| Świeżość wizytówki | **regres** — ostatnie zdjęcia 75 dni temu, opinie stoją na 10 od 6.07 |
| Indeksacja 46/50 | **stabilnie** — 46/51, jedyny nowy „błąd" to plik `.woff2` ze starego builda |

---

*Audyt wykonał Claude (orchestrator), 2026-07-29. Dane: kod na `645e49c`, produkcja szabunia.pl
(46 URL-i, pomiary 2026-07-29), panele GSC / GA4 / Google Ads / Vercel / wizytówka Google (odczyt
2026-07-29), 7 witryn konkurencji. Raport nie wprowadza zmian; poprawki opisane osobno.*


---

## 15. Aneks — weryfikacja adwersarialna (2026-07-29, po wdrożeniu poprawek)

Zgodnie z metodyką raport przeszedł kontrolę osobnym agentem z instrukcją „znajdź błędy, nie potwierdzaj".
Poniżej to, co znalazł. Liczby w treści raportu zostały **skorygowane w miejscu**.

### 15.1 Błędy w tym raporcie (skorygowane wyżej)

| Co | Było | Jest |
|---|---|---|
| `PELNY2907-02` | „15 miejsc w blogu" | 14 w `blog.ts` + 1 w `llms.txt` |
| `PELNY2907-16` | „13 martwych odsyłaczy" | 11 unikalnych; `PortfolioPricing.tsx` istnieje, wzorzec `Pricing\.tsx` go łapał fałszywie |
| `PELNY2907-17` | „kod czyta 9 zmiennych" | 10 |
| `PELNY2907-37` | `Hero.tsx:85`, `services.tsx:492` | `Hero.tsx:87`, `services.tsx:491` |
| `PELNY2907-40` | `manifest.json:9` | `manifest.json:10` (linia 9 to `background_color`) |
| §2 | „15/15 `fill` ma `sizes`" | 16/16 |
| §9 | „`npm run build` nieuruchomiony" | uruchomiony, przechodzi |

### 15.2 Regresje wprowadzone pierwszą turą poprawek — wszystkie naprawione w drugiej turze

1. **`lastModified` nie objęło strony głównej** (45 z 46 URL-i, nie 46). Naprawione.
2. **„roboczych" zostało w `blog.ts:814` i `:853`** — dwa opisy terminu dostawy przy dronie. Naprawione.
3. **Zgoda RODO wdrożona tylko w `/api/contact`** — `/api/lead` (zgoda **marketingowa**, czyli ta o wyższym ryzyku) został pominięty. Naprawione: `PoradnikForm` wysyła `consent`, route waliduje i zapisuje dowód.
4. **Dowód zgody był w całości sterowany przez klienta** — treść klauzuli i znacznik czasu przepisywane z żądania. Jako dowód wobec UODO warte tyle, co oświadczenie strony przeciwnej. Naprawione: `CONSENT_TEXT` jest teraz stałą **serwerową** z wersją (`v2026-07-29`), a `consentTs` to `new Date().toISOString()` na serwerze.
5. **`await pushToCrm` przed wysyłką maila dokładał do 5 s opóźnienia** do maila i do odpowiedzi. Naprawione: `void pushToCrm(...).catch(...)`, bez blokowania.
6. **`/api/lead` zwracał sukces mimo odbicia maila**, a ekran sukcesu twierdził „Kopię linku wysłałem też na X". Naprawione: route zwraca `guideSent`, a `PoradnikForm` pokazuje inne zdanie, gdy mail nie wyszedł.
7. **Osierocone nagłówki po kalkulatorze:** `blog.ts:370` „Jak oszacować budżet w 2 minuty" nad tekstem mówiącym o 24h, `blog.ts:1038` „Jak to policzyć dla siebie" nad „ja Ci odeślę", meta description „i oszacuj koszt", a w jednym przepisanym akapicie wróciło **„napisz brief"**. Wszystko naprawione.
8. **Trzy długie myślniki** w zdaniach przepisywanych w tej sesji (`blog.ts:116`, `:668`, `:1039`) — zakaz z `zasady-tekstow.md`. Naprawione.
9. **„Brief" jako widoczny tytuł kroku procesu** na 5 podstronach (`services.tsx` ×3, `portfolio.ts` ×2) — pominięte w pierwszej turze. Naprawione.
10. Wcięcia JSX i HTML w trzech miejscach. Naprawione.

### 15.3 Nowe ustalenia z weryfikacji

**`PELNY2907-41` · [SEO][BIZNES] `priceRange: "od 300 zł"` w JSON-LD stał się nieprawdziwy po cenniku v3** — `src/app/layout.tsx:145`. Przed zmianą 300 zł = kotwica wideo; po v3 wideo to „od 400 zł", a najniższa kotwica w serwisie to 120 zł/os. Nieprawdziwa cena leci w `ProfessionalService` na wszystkich 46 stronach. · **P2 · S · 🧑 [stop-condition §10.3] · Z (kod)**
Do decyzji: **A.** `"od 120 zł"` (formalnie zgodne z najniższą kotwiką, ale myli — to stawka za osobę przy 31+ osobach); **B.** `"od 400 zł"` (najniższa realna cena wejścia w pojedynczą usługę); **C.** usunąć `priceRange` (spójne z „ceną na zapytanie"). Rekomendacja: **C**.

**`PELNY2907-42` · [BIZNES] Kotwica „od 120 zł/os." przy sesjach zespołowych to najgłębszy próg progresji, nie cena wejścia** — `services.tsx:211` vs siatka `llms.txt:18` (4-10 osób po 180 zł) i minimum 4 osoby. Realne minimum: 4 × 180 = **720 zł**. Kotwica wynika wprost z briefu cennika v3 (§1), więc jej nie zmieniałem — ale konsekwencja jest taka, że `Offer.price` w JSON-LD podaje teraz **120** przy realnym minimum ~720 zł, czyli `PELNY2907-11` stał się poważniejszy. · **P2 · S · 🧑 [DECYZJA — §10.7] · Z (kod)**
Do decyzji: **A.** kotwica „od 180 zł/os." (uczciwa cena wejścia); **B.** zostaje 120 z dopiskiem „przy zespołach od 31 osób"; **C.** zostaje bez zmian. Rekomendacja: **B**.

**`PELNY2907-43` · [TECH] `escapeHtml`, `isEmail` i `pushToCrm` istnieją w dwóch identycznych kopiach** — `api/contact/route.ts:15-38` i `api/lead/route.ts:17-41`. To nie kosmetyka: dokładnie ten mechanizm sprawił, że poprawka zgody RODO trafiła tylko do jednego routu i przeszła niezauważona (§15.2 pkt 3). · **P3 · S · 🤖 · Z (kod)**
Poprawka: wydzielić do `src/lib/mail.ts` i `src/lib/crm.ts`. Refactor >3 plików → osobny brief.

**`PELNY2907-44` · [TECH] Obie bariery antybotowe są fail-open, a routy nie sprawdzają `Origin`** — Turnstile (`turnstile.ts:15-17`) i rate-limit (`ratelimit.ts:45`, `:55`) świadomie przepuszczają ruch przy braku konfiguracji. Scenariusz łączny (brak zmiennych Upstash **i** awaria Cloudflare) zostawia jako jedyną barierę honeypot, przy `RESEND_API_KEY` po drugiej stronie. · **P3 · S · 🤖 · Z (kod)**
Poprawka: sprawdzenie nagłówka `Origin` względem `szabunia.pl` w obu routach — kilka linii, zero nowych zależności.

**`PELNY2907-45` · [SEO] `lastModified` wpisów bloga to data publikacji, nie modyfikacji** — `sitemap.ts:30-34` (`new Date(p.date)`). 11 z 26 wpisów zostało przepisanych 29.07 (ceny, CTA), a sitemapa nadal podaje ich pierwotne daty. Po dodaniu `SITE_UPDATED` na pozostałych trasach powstaje odwrotność zamierzonego sygnału: strony niezmienione mówią „29.07", zmienione — „czerwiec". · **P3 · S · 🤖 · Z (kod)**
Poprawka: pole `updated` w `BlogPost` i `lastModified: new Date(p.updated ?? p.date)`.

### 15.4 Co weryfikacja potwierdziła

`grep -rni "kalkulator" src/ public/` → **0**. Lista `SERVICE_LABELS` pokrywa się 1:1 z `<option value>` w formularzu (8 kodów), więc nowa walidacja nie odrzuci poprawnego zgłoszenia. `FAQ.tsx` renderuje 16 pozycji w SSR z unikalnymi kluczami i `id`, `openIndex` indeksuje pełną tablicę. `/api/lead` bez podwójnej deklaracji `utmHtml`. `ratelimit.ts` bez osieroconych referencji. `sitemap.ts` bez duplikatów. Ceny wewnętrznie spójne dla portretów, pakietów hybrydowych, eventów, drona i Monthly Content. `npm run build` przechodzi.

*Aneks: weryfikacja adwersarialna 2026-07-29. Wszystkie regresje z §15.2 naprawione i ponownie sprawdzone (`lint` 0/0, `tsc` czysto, `build` PASS).*
