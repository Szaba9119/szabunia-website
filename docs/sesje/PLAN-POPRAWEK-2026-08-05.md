# Plan poprawek — zbiorczy, 5 sierpnia 2026

Jeden dokument spinający **cztery audyty z 05.08.2026**. Zastępuje przeskakiwanie między
raportami: każdy finding ma tu etap, właściciela i status. Raporty źródłowe zostają
źródłem dowodów, ten plik jest kolejnością robót.

| Audyt | Plik | Findingów | Właściciel wykonania |
|---|---|---|---|
| Strona, moduły A–E | `AUDYT-PELNY-2026-08-05.md` | 66 (0×P0, 5×P1, 24×P2, 19×P3, 11×P4) | agent + Marcin |
| Google Ads | `AUDYT-GOOGLE-ADS-2026-08-05.md` | 16 (1×P0, 2×P1) | Marcin, panel |
| Wizytówka Google | `AUDYT-WIZYTOWKA-2026-08-05.md` | 11 (2×P1) | Marcin, panel (3 wdrożone) |
| System biznesowy | `01_Biznes/_System/02_Cenniki/_szkic_decyzje_dla_Marcina_2026-08.md` | 14 decyzji | wyłącznie Marcin |

**Stan wyjściowy:** repo `f5dd9f4`, drzewo czyste poza nieśledzonymi raportami, `main == origin/main`,
produkcja == `main` (deployment `dpl_GTb4YGhZ1btDkh4eDsLzjpWE19mN`, `READY`, 05.08 09:27 UTC).

**Stan po sesji 05.08 wieczorem:** etapy 1 i 2 **wykonane w całości**, 28 plików zmienionych,
3 nowe, lint i `tsc` czyste, build przechodzi, wszystko zweryfikowane na lokalnym serwerze
produkcyjnym. **Nic nie zacommitowane** — git jest po stronie Marcina (`CLAUDE.md §7`).

**Sugerowany commit:**
`fix(audyt): tura poprawek z audytu pelnego 05.08, 22 ID (P1-P4)`

```
Pliki zmienione: public/llms.txt · scripts/generate-og-uslugi.py ·
src/app/api/contact/route.ts · src/app/api/lead/route.ts · src/app/blog/[slug]/page.tsx ·
src/app/blog/page.tsx · src/app/feed.xml/route.ts · src/app/not-found.tsx ·
src/app/poradnik/page.tsx · src/app/portfolio/page.tsx · src/app/sitemap.ts ·
src/app/uslugi/page.tsx · src/components/{BlogCard,CTA,CookieConsent,CountUp,MobileFAB,
Navigation,PoradnikBlogCTA,PoradnikForm,PoradnikTeaser,PortfolioGallery,ServiceAuthor,
ServiceHero,Services,ThemeProvider}.tsx · src/data/services.tsx · src/lib/utm.ts

Pliki nowe: src/app/error.tsx · src/app/global-error.tsx ·
public/images/og/uslugi/wnetrza-obiekty-architektura.png
```

---

## Zasada podziału na etapy

Etapy nie są posortowane po ważności, tylko po **tym, co blokuje co**. Etap 1 i 2 nie potrzebują
niczyjej decyzji i mogą wejść jednym deployem. Etap 3 czeka na zdania i kwoty od Marcina.
Etap 4 to panele, do których agent nie ma i nie powinien mieć dostępu. Etap 5 to pomiary,
bez których dwa findingi zostają hipotezami. Etap 6 to system biznesowy, który żyje własnym rytmem.

```
Etap 1  kod, autoryzowany briefami          → agent, dziś,     bez decyzji
Etap 2  kod, higiena poza briefami          → agent, dziś,     bez decyzji
Etap 3  kod, treść i konfiguracja           → BLOKADA: decyzje D1–D12
Etap 4  panele Ads / GA4 / GBP              → BLOKADA: dostęp Marcina
Etap 5  pomiary rozstrzygające hipotezy     → Marcin, 30 minut
Etap 6  system biznesowy, cennik od zera    → BLOKADA: decyzja D-01
```

---

## Etap 0 — co już weszło dziś (NIE dublować)

| Fala | Zakres | Dowód |
|---|---|---|
| Kod, cztery commity | próg portretowy 700, jedna kwota „od", taryfa zespołowa 1 400 + 120, rozstawienie 30 minut | `e2a0cd3`, `82715a3`, `7425bec`, `5a5b63a`, `f5dd9f4` |
| Wizytówka Google | link witryny z UTM, opis w nowej kolejności, odpowiedź na opinię Jadczaka | `POPRAWKI-WIZYTOWKA-2026-08-05.md`, wszystkie trzy w moderacji |
| System biznesowy | audyt „b" cennika, kalkulatora, szablonów i FAQ + cztery szkice „cennik od zera" | kopie `_bak_*_przed_audytem_2026-08-05b.md` |

Zweryfikowane na produkcji: `minPrice` = 1400, `Cache-Control: must-revalidate`, nowe adresy
obrazów 200 / stare 404, sitemapa 50 adresów bez Box17, „30 minut" bez ani jednej pozostałości.

---

## Etap 1 — kod, autoryzowany briefami (agent, dziś)

Wszystko poniżej ma w `BRIEFY-PELNY-2026-08-05.md` jawne **ZGODA: TAK**. Żadna pozycja nie dotyka
`next.config.ts`, `metadata` w `layout.tsx`, JSON-LD strony głównej ani kwot.

### 1.1 Jedna cyfra, osiem landing page'ów

| ID | Plik | Zmiana | Status |
|---|---|---|---|
| `PELNY2608-01` | `ServiceAuthor.tsx:37` | `quality={78}` → `{80}`; dziś `/_next/image?…&q=78` zwraca **400** i portret autora nie ładuje się na ośmiu podstronach usług | ✅ |

### 1.2 Sygnał świeżości dla Google

| ID | Plik | Zmiana | Status |
|---|---|---|---|
| `PELNY2608-10` | `sitemap.ts:12` | `SITE_UPDATED` `2026-07-29` → `2026-08-05`; ceny zmieniano 04 i 05.08, ósma usługa dostaje dziś datę sprzed swojej publikacji | ✅ |

### 1.3 Cztery kroki lejka bez pomiaru

| ID | Plik | Zmiana | Status |
|---|---|---|---|
| `PELNY2608-13` | `Services.tsx:53` | `data-cta={`uslugi_karta_${s.slug}`}` | ✅ |
| `PELNY2608-13` | `uslugi/page.tsx:91` | to samo, ta sama konwencja | ✅ |
| `PELNY2608-13` | `portfolio/page.tsx:121` | `data-cta={`case_${item.slug}`}` | ✅ |
| `PELNY2608-13` | `PoradnikTeaser.tsx`, `PoradnikBlogCTA.tsx` | `data-cta="poradnik_wejscie"` | ✅ |
| `PELNY2608-13` | `PortfolioGallery.tsx:78` | `gtagEvent("gallery_open", { position })` — `<button>`, delegat go nie złapie | ✅ |

### 1.4 Segment z zablokowanymi cookies nie widzi strony

| ID | Plik | Zmiana | Status |
|---|---|---|---|
| `PELNY2608-16` | `ThemeProvider.tsx:30`, `:45` | `localStorage` w `try/catch`, wzorzec z `lib/utm.ts:33`; dziś `SecurityError` leci z komponentu owijającego całą aplikację | ✅ |
| `PELNY2608-16` | `CookieConsent.tsx:11`, `:40`, `:46` | to samo, fallback = baner ukryty | ✅ |

### 1.5 Paczka szybkich wygranych (`PELNY2608-QUICK`)

| ID | Plik | Zmiana | Status |
|---|---|---|---|
| `PELNY2608-20` | `PoradnikForm.tsx:174` | `hover:text-white` → `hover:text-navy dark:hover:text-white`; kontrast 1,05:1, link do polityki znika przy najechaniu | ✅ |
| `PELNY2608-17` | `MobileFAB.tsx:80` | `aria-label` ma zaczynać się od widocznego tekstu „Oferta" (WCAG 2.1 SC 2.5.3, poziom A) | ✅ |
| `PELNY2608-21` | `CookieConsent.tsx:58,60` | `pointer-events-none` na wrapperze, `auto` na karcie; dziś blokuje `BackToTopButton` | ✅ |
| `PELNY2608-29` | `blog/page.tsx:70` | `delay={0.08 * i}` → `{0.08 * (i % 3)}`; 26. karta czeka dziś 2 s | ✅ |
| `PELNY2608-28` | `portfolio/page.tsx:55` | `portfolioCategories` → `portfolioItems` w `ItemList`; dziś JSON-LD zawiera draft Box17 | ✅ |
| `PELNY2608-52` | `poradnik/page.tsx:174` | „Zobacz portfolio" → `/portfolio`, nie `/galeria` | ✅ |
| `PELNY2608-59` | `not-found.tsx:9` | `follow: false` → `true`; 404 ma cztery linki ratunkowe | ✅ |
| `PELNY2608-40` | `poradnik/page.tsx` | ~~`breadcrumbJsonLd(crumbs)`~~ — **FAŁSZYWY POZYTYW.** Blok `BreadcrumbList` stoi w `poradnik/page.tsx:98-100` i renderuje się przez `<script type="application/ld+json">` w linii 261. Jest w HEAD `f5dd9f4`, potwierdzone `git show`. Nic nie zmieniałem | ⛔ n/d |
| `PELNY2608-41` | `blog/[slug]/page.tsx:139`, `poradnik/page.tsx:162` | usunąć `/60` i `/70`; kontrast 3,39:1 i 4,21:1 przy progu 4,5:1 | ✅ |
| `PELNY2608-44` | `Navigation.tsx:110` | `py-2`; cel dotykowy z ~16 px na 32 px (WCAG 2.2 SC 2.5.8) | ✅ |
| `PELNY2608-35` | `lib/utm.ts`, `api/contact/route.ts:77`, `api/lead/route.ts:73` | dopisać `wbraid` i `gbraid`; lead z iOS przychodzi dziś bez bloku „Źródło" | ✅ |
| `PELNY2608-23` | `public/llms.txt:43` | „10-15 min/os." → „5-15 min/os."; kanon to `services.tsx`, dwanaście miejsc | ✅ |

### 1.6 Poza kodem, ale w zasięgu agenta

| ID | Co | Status |
|---|---|---|
| `PELNY2608-07` | wygenerować `og/uslugi/wnetrza-obiekty-architektura.png` skryptem `generate-og-uslugi.py`; dziś karta OG jedynej linii z kotwicą 900 zł zwraca **404** | ✅ |

---

## Etap 2 — kod, higiena poza briefami (agent, dziś)

Pozycje P3/P4 z §5.2 i §5.3 audytu, które nie dotykają treści handlowej, konfiguracji ani JSON-LD
strony głównej. Poza briefami, więc **wymieniam je jawnie** zamiast robić „przy okazji".

| ID | Plik | Zmiana | Status |
|---|---|---|---|
| `PELNY2608-31` | `blog/[slug]/page.tsx` | `ErrorBoundary` na sekcjach; jedyna trasa bez ani jednego, wbrew `CLAUDE.md §5` | ✅ |
| `PELNY2608-30` | `src/app/error.tsx`, `global-error.tsx` | brandowany ekran błędu zamiast białej strony „Application error" | ✅ |
| `PELNY2608-39` | `blog/page.tsx` | `ItemList` obok `BreadcrumbList`, wzorem `/uslugi` i `/portfolio` | ✅ |
| `PELNY2608-57` | `blog/page.tsx:17` | `alternates` nadpisuje obiekt rodzica i kasuje autodiscovery RSS | ✅ |
| `PELNY2608-58` | `feed.xml/route.ts` | RSS datuje po `date`, lista po `updated`; `lastBuildDate` z 28.06 | ✅ |
| `PELNY2608-43` | `BlogCard.tsx`, `blog/page.tsx` | równe wysokości kart w rzędzie (rozjazd ~40 px) | ✅ |
| `PELNY2608-45` | `CountUp.tsx` | licznik mruga „250 000+ → 0+ → 250 000+" po wejściu w widok | ✅ |
| `PELNY2608-33` | `api/contact/route.ts`, `CTA.tsx` | `contact_submit` liczy dziś także zgłoszenia odrzucone honeypotem; wzorzec `guideSent` już jest w repo | ✅ |
| `PELNY2608-34` | `api/contact/route.ts`, `mail.ts` | dopisać stronę wysyłki do maila z leadem; dziś nie wiadomo, która podstrona dowozi | ✅ |
| `PELNY2608-61` | `services.tsx` ×3, `ServiceHero.tsx` | cztery komentarze opisywały nieistniejący stan (kwoty 120/1 100 zł, „llms.txt mówi +200 zł", nieistniejący cross-link z linii obiektowej). Zmiana wyłącznie w komentarzach, zero zmian w danych | ✅ |
| `PELNY2608-60` | `next.config.ts:46-53` | komentarz uzasadnia `immutable`, którego w wartości już nie ma. **NIE RUSZONE:** `next.config.ts` to stop-condition `CLAUDE.md §11.3`, a brief nie obejmuje tego pliku nawet dla komentarza | ⏸ czeka |
| **nowe** | `scripts/generate-og-uslugi.py` | **przyczyna `PELNY2608-07`**: `parse_services` szukało `title` w oknie 200 znaków od `slug` i cicho pomijało ósmą usługę (ok. 1 100 znaków komentarza między polami). Skrypt kończył się komunikatem „Wygenerowano 7 obrazków" i wyglądał na udany. Dodane parsowanie po obiektach, twarda kontrola pokrycia i zawijanie długich tytułów | ✅ |

**Świadomie zostawione w etapie 2:** `PELNY2608-46` (brak `<noscript>`), `-54` (`/galeria` dynamiczna),
`-55` (cztery lightboxy), `-66` (paczka drobiazgów) — każda to `M`, żadna nie ma dziś skutku
w złotówkach, wszystkie wracają w re-audycie 19.08.

---

## Etap 3 — kod zablokowany decyzją Marcina

Nie są trudne. Są **cudze**. Każda dotyka zdania, którym klient uzasadni odmowę dopłaty,
albo pliku objętego stop-condition z `CLAUDE.md §10`.

| Decyzja | ID | Czego dotyczy | Koszt niepodjęcia |
|---|---|---|---|
| **D1** | `PELNY2608-02` | `blog.ts:373` obiecuje bezterminowe darmowe przekładanie lotu; kanon mówi 300 zł za drugie podejście | **600–900 zł** na zleceniu z dokumentacją w kilku terminach |
| **D2** | `PELNY2608-03` | `blog.ts:179` mówi „od 4 osób", `:469` „od 2 osób", kanon to 2 | **1 520 zł** na leadzie, który odpada bez pytania |
| **D3** | `PELNY2608-04` | `faq.ts:44` obiecuje bezwarunkowo darmową zmianę terminu; pełne warunki renderują się wyłącznie na `/galeria` | **2 360 zł** przy zespole 10-osobowym, który się nie stawi |
| **D4** | `PELNY2608-27` | `llms.txt:19` „Dron w cenie każdego pakietu" vs komentarz „+200 zł" | każdy lead z kanału AI z oczekiwaniem 200 zł gratis |
| **D5** | `PELNY2608-24` | `blog.ts:1009` druga kotwica „od 55 zł za sztukę" przy minimum 600 zł | klient czyta 600 zł jako podwyżkę o 45% |
| **D6** | `PELNY2608-08`, `-15` | ósmy `Offer` w `hasOfferCatalog` + trzy anonimowe `ProfessionalService` na `@id` | linia z najwyższą kotwicą niewidzialna dla Knowledge Graph |
| **D7** | `PELNY2608-12` | domeny DoubleClick w CSP — **najpierw H5**, patrz etap 5 | budżet remarketingu leci w blokowane żądania |
| **D8** | `PELNY2608-25`, `-26` | cytat klienta skrócony, drugi przeredagowany; opinie są publiczne w Google | ryzyko reputacyjne |
| **D10** | `PELNY2608-56` | `CLAUDE.md` rozjeżdża się w czterech miejscach | kolejna sesja „naprawi" kolejność kart, która jest już zrobiona |
| **D12** | osiem pozycji z 04.08 | `ZDJ2608-37`, `-28`, `-16`, `DZ3`, `DZ5`, trzy opisy, warunek Box17 | drugi audyt z rzędu bez odpowiedzi |

Pełne warianty A/B/C przy każdej: `AUDYT-PELNY-2026-08-05.md §12`.

---

## Etap 4 — panele (Marcin, dostęp)

### 4.1 Google Ads — kolejność z `AUDYT-GOOGLE-ADS §11`

| # | Zadanie | ID | Czas |
|---|---|---|---|
| 1 | **Ustalić, gdzie trafiają maile z formularza** i kto ma dostęp do `marcin@szabunia.pl` | `ADS2608-01`, §12.6 | decyzja |
| 2 | Test end-to-end formularza z `gclid` | `ADS2608-03` | 15 min |
| 3 | Poprawić sitelinki „Portfolio" i „Kontakt" na `/portfolio` i `/kontakt` (nietknięte od 4.03) | `ADS2608-05` | 5 min |
| 4 | Wypisać trzy martwe działania z celów **konta**, rozstrzygnąć kanoniczny lead | `ADS2608-06`, §12.1 | 15 min |
| 5 | **Cele → Podsumowanie → Konwersje: co jest zaimportowane** | warunek startu `PELNY2608-05` | 5 min |
| 6 | Dostosowania stawek i dzienne CPC 6–7 lipca | H6 | 15 min |
| 7 | Usunąć wersję roboczą „Kampania 9" | `ADS2608-12` | 1 min |

Punkt 5 jest jednocześnie **warunkiem startu dla kodu**: dopóki nie wiadomo, co Ads importuje,
dołożenie `generate_lead` w `CTA.tsx` może podwoić liczenie zamiast naprawić pomiar.

### 4.2 Wizytówka Google — reszta z `AUDYT-WIZYTOWKA §11`

| # | Zadanie | ID | Czas |
|---|---|---|---|
| 1 | Otworzyć profil **na telefonie**: czy sekcja „Usługi" w ogóle się renderuje | H1 | 5 min |
| 2 | Ceny w 7 produktach (kwoty gotowe w `PACZKA-WIZYTOWKA §2`, decyzja netto/brutto) | `WIZ2608-04` | 5 min |
| 3 | Trzy miniatury z `01_Biznes/_System/08_Zalaczniki/wizytowka_miniatury/` | `WIZ2608-05` | 2 min |
| 4 | Wpis o sesji dla IDcom (tekst gotowy, brakuje zdjęcia) | `WIZ2608-11` | 2 min |
| 5 | 15–20 zdjęć: eventy, hale, sesje u klienta, packshoty (ostatnie sprzed 81 dni) | `WIZ2608-06` | M |
| 6 | **Kampania po opinie** — 10 opinii przy 1000+ sesjach, jedyna dźwignia widoczności | `WIZ2608-02`, §12.3 | L |

### 4.3 GA4

- Pomiar zaawansowany: „Zmiany strony na podstawie zdarzeń historii" (rozstrzyga `PELNY2608-11`)
  i „Interakcje z formularzami" (rozstrzyga H7).
- Lista zdarzeń z 28 dni, do skonfrontowania z modułem D.
- Vercel Analytics vs GA4, ten sam zakres dat: iloraz = górne oszacowanie niedomierzenia
  przez zgodę (`PELNY2608-14`).

---

## Etap 5 — pomiary, które zamieniają hipotezy w fakty (Marcin, ok. 30 minut)

| Pomiar | Co rozstrzyga | Komenda albo miejsce |
|---|---|---|
| PageSpeed Insights, mobile i desktop | **szósty audyt z rzędu bez tej liczby** | `pagespeed.web.dev` dla `/`, `/uslugi/eventy-reportaze`, `/galeria` |
| `curl -sI marcinszabunia.pl/portrety-biznesowe` | H1: 301/308 czy 302, czyli czy osiem lat historii domeny się przenosi | terminal |
| `curl -sI www.szabunia.pl/` | H2: przekierowanie czy 200 | terminal |
| Konsola po kliknięciu „Akceptuję" | H5 → **odblokowuje D7**; agent tego nie zrobi, to działanie w Twoim imieniu | DevTools → Console, szukać `Refused to connect` |
| Rich Results Test dla `/` i `/kontakt` | czy Google widzi **dwie** encje `ProfessionalService` | `search.google.com/test/rich-results` |
| `scrollHeight` mobile przy 390 px | H15, w **widocznym** oknie | device toolbar |

Wyniki wklejać do `POMIARY-2026-08-05.md` z datą odczytu.

---

## Etap 6 — system biznesowy (wyłącznie Marcin)

Czternaście decyzji z `_szkic_decyzje_dla_Marcina_2026-08.md`. **D-01 blokuje trzynaście
pozostałych**: dopóki nie ma docelowej stawki godzinowej, reszta jest nierozstrzygalna.

| # | Decyzja | Skutek roczny netto |
|---|---|---|
| **D-01** | stawka godzinowa docelowa (rekomendacja: S2, 171 zł/h oferta) | **20 031 zł** rozpiętości |
| D-02 | reportaż w górę czy w dół | 5 900 zł |
| D-05 | obróbka wspomagana narzędziami | 3 064 zł |
| D-11 | wycena obróbki partiami | 3 010 zł |
| D-12 | dno cennika, minimum zlecenia | 2 800 zł |

Pozostałe dziewięć w pliku źródłowym. **Nic z etapu 6 nie wchodzi w życie samo** —
obowiązuje `cennik_2026_07_v3.md`, szkice to szkice.

---

## Definition of Done dla etapów 1 i 2 — wynik z 05.08.2026

| # | Kryterium | Wynik |
|---|---|---|
| 1 | `npm run lint` | ✅ 0 błędów, 0 ostrzeżeń |
| 2 | `npx tsc --noEmit` | ✅ czysto |
| 3 | `npm run build` | ✅ sukces, 59 stron statycznych |
| 4 | `/_next/image?…&q=80` | ✅ 200 (`q=78` nadal 400, czyli diagnoza była trafna) |
| 5 | `og/uslugi/wnetrza-obiekty-architektura.png` | ✅ 200, 33,0 kB (norma 26–49 kB) |
| 6 | `lastmod` tras statycznych w `/sitemap.xml` | ✅ `2026-08-05`, 50 adresów, Box17 wykluczony |
| 7 | `ItemList` na `/portfolio` | ✅ 8 pozycji, zero wystąpień `box17` |
| 8 | `/blog`: `ItemList` + autodiscovery RSS | ✅ oba obecne |
| 9 | `lastBuildDate` w `/feed.xml` | ✅ 29 lip 2026 zamiast 28 cze |
| 10 | unikalnych `data-cta` (home + `/uslugi` + `/portfolio`) | ✅ **23**, przy celu 18+ i stanie wyjściowym 14 |
| 11 | wrapper banera cookies | ✅ `pointer-events: none`, karta `auto`, punkt w dolnym pasie trafia w `<main>` |
| 12 | konsola przeglądarki na `/blog/<slug>` | ✅ zero błędów |
| 13 | **Git wyłącznie Marcin** | ✅ nic nie zacommitowane, nic nie wypchnięte |

**Czego nie dało się domierzyć:** kliknięcie w `BackToTopButton` przy widocznym banerze.
Panel przeglądarki był ukryty, więc strona nie przewijała się (`scrollY` stanął na 38 px),
a przycisk poniżej progu przewinięcia ma `pointer-events: none` z własnego projektu.
Zweryfikowany został sam mechanizm blokady, nie kliknięcie. Do sprawdzenia ręcznie.

---

## Metryki kontrolne (re-audyt 19.08.2026)

| Metryka | Stan 05.08 rano | Po etapach 1–2 (lokalnie) | Cel na produkcji |
|---|---|---|---|
| `/_next/image?…&q=78` | **400** | brak takiego żądania (`q=80`) | brak |
| `og/uslugi/wnetrza-obiekty-architektura.png` | **404** | 200 | 200 |
| `lastmod` tras statycznych | `2026-07-29` | `2026-08-05` | `2026-08-05` |
| liczba `"@type":"Offer"` na home | 7 | 7 (blokada D6) | 8 po D6 |
| „od 4 osób" w `blog.ts` | 1 | 1 (blokada D2) | 0 po D2 |
| „bezpłatnie przekładamy" w `blog.ts` | 1 | 1 (blokada D1) | 0 po D1 |
| „10-15 min/os." w `llms.txt` | 1 | **0** | 0 |
| unikalnych `data-cta` | 14 | **23** | 23 |
| pozycji w `ItemList` na `/portfolio` | 9 z draftem | **8**, bez draftu | 8 |
| `lastBuildDate` w RSS | 28.06.2026 | **29.07.2026** | data najnowszej korekty |
| działania w celach konta Ads ze stanem „Usunięta" | 2 | bez zmian (panel) | 0 |
| data sitelinków Portfolio i Kontakt | 4 mar 2026 | bez zmian (panel) | po 05.08.2026 |
| LCP mobile i desktop | **N** | **N** | zmierzone |

---

*Zestawił: Claude (Cowork), 05.08.2026, z czterech audytów tego samego dnia.
Statusy w kolumnie „Status" aktualizowane w trakcie wykonania etapów 1 i 2.*
