# Briefy — audyt pełny, 05.08.2026

Stan wyjściowy: produkcja `https://szabunia.pl`, commit `f5dd9f4`, drzewo czyste, `main == origin/main`,
deployment `dpl_GTb4YGhZ1btDkh4eDsLzjpWE19mN` (`READY`, 05.08.2026 09:27 UTC).
Raport źródłowy: `AUDYT-PELNY-2026-08-05.md`. Ten plik = kompletna lista tego, co ZOSTAŁO do zrobienia w kodzie.

## Co już wdrożone (NIE dublować)

| Fala | Zakres | Commit |
|---|---|---|
| Tura zdjęcia + treść 04.08 | 36 ID: nazwy plików, opisy alternatywne, publikacja 4 realizacji, `must-revalidate` | `c5ead22` |
| Próg portretowy 04.08 | PORTRET START 700 zł, kotwica 1 100 → 700 | `e2a0cd3`, `82715a3` |
| Jedna kwota „od" 05.08 | brzmienie kotwicy, domknięcie progu 700 | `7425bec` |
| Taryfa zespołowa 05.08 | 1 400 zł za dwie osoby + 120 zł za kolejną, 30 zdjęć/h | `5a5b63a` |
| Rozstawienie 30 minut 05.08 | 12 powierzchni klienckich | `f5dd9f4` |

**Zweryfikowane jako obecne na produkcji:** `minPrice` = 1400, `Cache-Control: must-revalidate`,
nowe adresy obrazów 200 / stare 404, sitemapa 50 adresów bez Box17, „30 minut" bez ani jednego „20 minut".

## Definition of Done (wg `CLAUDE.md §6`, rozszerzone)

1. `npm run lint` → 0 błędów, 0 ostrzeżeń
2. `npx tsc --noEmit` → czysto
3. `npm run build` **lokalnie u Marcina** → sukces (w sandboksie pada z Bus error, binarki macOS)
4. dev bez błędów w konsoli na `/`, `/uslugi`, `/uslugi/wizerunek-portrety`, `/portfolio`, `/blog`, `/kontakt`
5. **dark mode działa na każdej odwiedzonej stronie**
6. smoke-test **ścieżek**, nie stron: scroll → klik → pozycja, kotwice, motyw

**Git wyłącznie Marcin. Żadnych nowych paczek. Nie ruszać treści ani cen poza tym, co jawnie w briefie.**

---

## BRIEF PELNY2608-01 · Portret autora na ośmiu podstronach usług — jedna cyfra

**Status:** do wykonania. **Najwyższy stosunek efektu do nakładu w całym audycie.**
**ZGODA:** TAK — autoryzowane tym briefem, nie dotyka `next.config.ts`.

**Kontekst z liczbami:** `next.config.ts:41` deklaruje `qualities: [72, 75, 80, 85, 90]`.
`ServiceAuthor.tsx:37` żąda `quality={78}`. Next.js 16 odrzuca żądanie o niezadeklarowanej jakości.
Zweryfikowane na produkcji 05.08.2026 przez `fetch()` w kontekście strony:
`/_next/image?url=%2Fimages%2Fmarcin-hero-light-4.jpg&w=256&q=78` → **HTTP 400**,
to samo `q=75` → **200**, `q=80` → **200**.
`<ServiceAuthor />` renderuje się bezwarunkowo na każdej podstronie usługi (`uslugi/[slug]/page.tsx:194`),
czyli na **ośmiu landing page'ach, na które idzie ruch z Google Ads**. Zamiast twarzy Marcina
w bloku „Kto to zrobi" zostaje szary kwadrat z `blurDataURL` (jednolity `#F1F5F9`).
Ani lint, ani build tego nie łapią — to błąd runtime'owy optymalizatora.

**Warianty:**
- **A (rekomendacja):** `quality={78}` → `quality={80}` w `ServiceAuthor.tsx:37`. Jedna cyfra.
  Ryzyko: zerowe. Nie dotyka stop-condition `§10.2`. Waga pliku rośnie o kilka procent.
- B: dopisać `78` do `qualities` w `next.config.ts:41`. Ten sam efekt wizualny, ale **dotyka
  stop-condition `§10.2`** i wymaga osobnej zgody. Odrzucone jako droższe proceduralnie.

**Pliki:** `src/components/ServiceAuthor.tsx` (jedna linia).

**AC (mierzalne):**
1. `curl -sI "https://szabunia.pl/_next/image?url=%2Fimages%2Fmarcin-hero-light-4.jpg&w=256&q=80"` → 200 (jest już dziś).
2. Po deployu w DevTools → Network → filtr `_next/image` na `/uslugi/wizerunek-portrety`: **zero odpowiedzi 400**.
3. Portret widoczny w sekcji „Kto to zrobi" na wszystkich ośmiu podstronach usług, jasny i ciemny motyw.

**Stop:** jeśli po zmianie na `q=80` obraz nadal nie ładuje się na którejkolwiek podstronie —
zatrzymaj się i zgłoś, bo to znaczy, że przyczyna jest inna niż zdiagnozowana.

---

## BRIEF PELNY2608-10 · `SITE_UPDATED` sprzed zmian cen

**Status:** do wykonania **przed najbliższym deployem**, nie po.
**ZGODA:** TAK — `sitemap.ts` nie jest stop-condition.

**Kontekst:** `sitemap.ts:12` `const SITE_UPDATED = new Date("2026-07-29");` stempluje tą datą
stronę główną, `/uslugi`, wszystkie osiem podstron usług, `/kontakt`, `/portfolio`, `/galeria`,
`/blog`, `/poradnik` i `/polityka-prywatnosci`. Zweryfikowane live przez pobranie i sparsowanie
`/sitemap.xml`: `lastmod` tras statycznych = `2026-07-29`. Tymczasem 04 i 05.08 przepisano ceny
(portrety 700, sesje zespołowe 1 400 + 120) i opublikowano ósmą usługę. `/uslugi/wnetrza-obiekty-architektura`
dostaje `lastModified` **sprzed dnia swojej publikacji**. Komentarz w kodzie mówi wprost:
„Podnosić RĘCZNIE przy realnej zmianie treści" — mechanizm działa zgodnie z projektem,
krok ręczny wypadł z tury.

**Pliki:** `src/app/sitemap.ts:12`.

**AC:** po deployu `/sitemap.xml` → `lastmod` tras statycznych = `2026-08-05` (albo data deployu).
Liczba adresów bez zmian: **50**. Box17 nadal wykluczony.

**Dodatkowo (poza kodem):** dopisać podnoszenie `SITE_UPDATED` do listy DoD tury wdrożeniowej,
żeby nie wypadało ponownie. To trzeci audyt, w którym data jest starsza od zmian.

---

## BRIEF PELNY2608-07 · Karta OG ósmej usługi (404 od dnia publikacji)

**Status:** **ZACZĄĆ OD PLIKU** — to zadanie Marcina, nie agenta. Nadal otwarte `ZDJ2608-23`.
**ZGODA:** NIE dla części kodowej (fallback) — czeka na decyzję. Dla samego pliku: TAK.

**Kontekst:** `uslugi/[slug]/page.tsx:42` buduje adres ze sluga bez sprawdzenia, czy plik istnieje.
Zweryfikowane przeze mnie na produkcji 05.08: `og/uslugi/wnetrza-obiekty-architektura.png` → **404**,
`og/uslugi/eventy-reportaze.png` → **200**. Siedem z ośmiu kart działa. Trasa jest w sitemapie
od 04.08, więc każde udostępnienie linku na LinkedIn, w Slacku czy w mailu daje kartę bez obrazka —
i dotyczy to jedynej linii z kotwicą 900 zł. **Facebook i LinkedIn cache'ują karty OG na tygodnie**,
więc im później, tym dłużej trwa naprawa.

**Warianty:**
- **A (rekomendacja):** Marcin generuje `public/images/og/uslugi/wnetrza-obiekty-architektura.png`
  (1200×630) tym samym skryptem `scripts/generate-og-uslugi.py`, którym powstało pozostałe siedem.
- B: dodatkowo fallback w `generateMetadata` na `/images/og/strony/uslugi.jpg`, gdy plik per-usługa
  nie istnieje. Zabezpiecza kolejną nową usługę przed powtórzeniem scenariusza. **Wymaga zgody**,
  bo to zmiana w `generateMetadata`.

**AC:** `curl -sI https://szabunia.pl/images/og/uslugi/wnetrza-obiekty-architektura.png` → 200,
rozmiar w normie 26–49 kB. Podgląd karty w LinkedIn Post Inspector pokazuje obraz.

---

## BRIEF PELNY2608-13 · Cztery kroki lejka bez zdarzenia

**Status:** do wykonania. **ZGODA:** TAK — dodanie atrybutów `data-cta` i jednego `gtagEvent`.

**Kontekst:** delegat w `ContactClickTracker.tsx:48-51` łapie **wyłącznie** linki z atrybutem `data-cta`.
Cztery kroki lejka go nie mają:

| Miejsce | Plik:linia | Proponowany `data-cta` |
|---|---|---|
| Kafel usługi na stronie głównej | `Services.tsx:53` | `` `uslugi_karta_${s.slug}` `` |
| Kafel usługi na hubie `/uslugi` | `uslugi/page.tsx:91` | `` `uslugi_karta_${s.slug}` `` |
| Kafel realizacji na hubie `/portfolio` | `portfolio/page.tsx:121` | `` `case_${item.slug}` `` (ta sama konwencja co na home, żeby dało się sumować) |
| Wejście na lead magnet | `PoradnikTeaser.tsx:40`, `PoradnikBlogCTA.tsx:7` | `poradnik_wejscie` |

Piąte miejsce wymaga jawnego zdarzenia, bo delegat go nie złapie (`<button>`, nie `<a href>`):
otwarcie lightboxa w `PortfolioGallery.tsx:78` → `gtagEvent("gallery_open", { position: i + 1 })`.

**Wartość diagnostyczna, od najwyższej:** kafel usługi to **jedyne miejsce, gdzie klient deklaruje,
czego chce, zanim dojdzie do formularza**. Bez tego nie da się powiedzieć, czy porzucenie następuje
na wyborze usługi, czy na formularzu, ani które usługi nikogo nie interesują. Komentarz w
`uslugi/page.tsx:117-120` sam to przyznaje: „strona nie miała ani jednego elementu z `data-cta`,
a to najlepiej rankująca strona w całym serwisie" — CTA dołożono, kafle pominięto.

**AC:** po deployu w GA4 DebugView klik w kafel usługi generuje `cta_click` z `cta=uslugi_karta_<slug>`.
Liczba unikalnych wartości `data-cta` w `src/` rośnie z 14 do 18+.

**Stop:** nie zmieniaj nazw istniejących `data-cta` — historia w GA4 przepadnie.

---

## BRIEF PELNY2608-05 · Jedno zdarzenie konwersji dla obu lejków

**Status:** **ZACZĄĆ OD PANELU.** Nie dotykaj kodu, zanim Marcin nie sprawdzi Ads.
**ZGODA:** NIE — czeka na wynik kroku 1.

**Kontekst:** `CTA.tsx:98` emituje `contact_submit` (zapytanie handlowe),
`PoradnikForm.tsx:69` emituje `generate_lead` (pobranie darmowego PDF-a).
`generate_lead` to zalecane zdarzenie GA4 i pierwsza pozycja, którą GA4 podpowiada do oznaczenia
jako kluczowe, a Ads do importu. Jeśli w Ads zaimportowano `generate_lead`, **kampania optymalizuje
się na pobrania darmowego pliku i nie widzi ani jednego zapytania ofertowego**.

**Krok 1 (Marcin, 5 minut, PRZED kodem):**
Google Ads → Cele → Podsumowanie → Konwersje. Dla każdej akcji odczytać: nazwę, źródło
(GA4 / tag Ads), zdarzenie źródłowe, **kolumnę „Kampanie"** (wartość „0 z 1" = cel nie działa),
okno konwersji, przełącznik „Uwzględniaj w opcji Konwersje". Zapisać do
`docs/sesje/POMIARY-2026-08-05.md` z datą odczytu.

**Krok 2 (kod, po kroku 1):**
Dołożyć **drugie** wywołanie obok `CTA.tsx:98`:
`gtagEvent("generate_lead", { source: "formularz_kontaktowy", service: formData.service || "(brak)" })`.
**Nie zmieniać** nazwy `contact_submit` — historia w GA4 przepadnie.
W GA4 oznaczyć jako kluczowe **wyłącznie** `generate_lead`; `source` rozdziela oba lejki.

**AC:** w GA4 DebugView wysłanie formularza kontaktowego generuje **oba** zdarzenia,
`generate_lead` z `source="formularz_kontaktowy"`. W Ads jedna akcja konwersji zbiera oba lejki.

**Stop:** jeśli w Ads jako konwersja zaimportowane jest dziś `contact_submit`, zatrzymaj się —
dołożenie `generate_lead` bez zmiany po stronie Ads podwoi liczenie. Wtedy najpierw decyzja,
która nazwa zostaje kluczowa.

---

## BRIEF PELNY2608-16 · `localStorage` bez `try/catch` w `ThemeProvider`

**Status:** do wykonania. **ZGODA:** TAK.

**Kontekst:** `ThemeProvider.tsx:30` woła `localStorage.getItem("theme")` bez zabezpieczenia.
W przeglądarce z zablokowanym zapisem danych witryny (Chrome „Blokuj wszystkie pliki cookie",
polityka firmowa, część rozszerzeń prywatnościowych) dostęp do `window.localStorage` rzuca
`SecurityError`. Błąd leci z efektu komponentu, który w `layout.tsx:352` obejmuje `{children}`,
więc **poniżej nie ma żadnej granicy, która by go złapała** — użytkownik z tego segmentu nie zobaczy
strony w ogóle, więc nie wyśle formularza. Ten sam plik `layout.tsx` w liniach 109 i 117 owija
dostęp do `localStorage` w `try/catch`, a `utm.ts:33` robi to dla `sessionStorage` — czyli
to przeoczenie, nie decyzja.

**Pliki i linie:** `ThemeProvider.tsx:30` i `:45`, `CookieConsent.tsx:11`, `:40`, `:46`,
inline w `layout.tsx:133`.

**Wzorzec do skopiowania:** `src/lib/utm.ts:33-37`.
**Fallback:** motyw jasny, baner ukryty (czyli stan bezpieczny, nie stan błędu).

**AC:** w Chrome z ustawieniem „Blokuj wszystkie pliki cookie" strona `/` renderuje się w całości,
formularz jest widoczny i wysyłalny, konsola nie zawiera nieprzechwyconego `SecurityError`.

---

## BRIEF PELNY2608-QUICK · Paczka szybkich wygranych

**Status:** do wykonania jednym commitem. **ZGODA:** TAK dla wszystkich pozycji poniżej.
Żadna nie dotyka `next.config.ts`, `metadata` w `layout.tsx`, JSON-LD ani cen.

| ID | Plik:linia | Zmiana |
|---|---|---|
| `PELNY2608-20` | `PoradnikForm.tsx:174` | `hover:text-white` → `hover:text-navy dark:hover:text-white` (wzorzec z `CTA.tsx:508`). Dziś link do polityki ma przy najechaniu kontrast **1,05:1** i znika |
| `PELNY2608-17` | `MobileFAB.tsx:80` | `aria-label` musi **zaczynać się** od widocznego tekstu. Widoczny tekst to „Oferta" → `aria-label="Oferta, zapytaj o wycenę"`. WCAG 2.1 SC 2.5.3, poziom A |
| `PELNY2608-21` | `CookieConsent.tsx:58` i `:60` | `pointer-events-none` na wrapperze, `pointer-events-auto` na karcie. Dziś przezroczysty pas o pełnej szerokości przechwytuje kliknięcia i blokuje `BackToTopButton` na `/blog/[slug]` |
| `PELNY2608-29` | `blog/page.tsx:70` | `delay={0.08 * i}` → `delay={0.08 * (i % 3)}`. Przy 26 wpisach 26. karta ma dziś `transition-delay: 2s` |
| `PELNY2608-28` | `portfolio/page.tsx:55` | `portfolioCategories.map` → `portfolioItems.map`. Jedna linia, zamyka filtr draftów i kolejność naraz |
| `PELNY2608-52` | `poradnik/page.tsx:174` | `href="/galeria"` → `href="/portfolio"` przy etykiecie „Zobacz portfolio" |
| `PELNY2608-59` | `not-found.tsx:9` | `robots: { index: false, follow: false }` → `follow: true`. 404 ma cztery linki ratunkowe |
| `PELNY2608-40` | `poradnik/page.tsx` | dopisać `breadcrumbJsonLd(crumbs)` wzorem `blog/page.tsx:44`. Jedyna trasa statyczna bez żadnego JSON-LD |
| `PELNY2608-41` | `blog/[slug]/page.tsx:139`, `poradnik/page.tsx:162` | usunąć `/60` i `/70` z `dark:text-dark-text-muted`. Dziś **3,39:1** i **4,21:1** przy progu 4,5:1 |
| `PELNY2608-44` | `Navigation.tsx:110` | dopisać `py-2` do klasy `cls`. Cel rośnie z ~16 px na 32 px (WCAG 2.2 SC 2.5.8). Wysokość paska bez zmian, bo przycisk CTA obok ma już `py-2` |
| `PELNY2608-35` | `lib/utm.ts:5-12`, `api/contact/route.ts:77`, `api/lead/route.ts:73` | dopisać `"wbraid"` i `"gbraid"`. Google Ads wysyła je **zamiast** `gclid` przy ograniczeniach prywatności (iOS, ruch z aplikacji) — dziś taki lead przychodzi bez bloku „Źródło" i wygląda jak organiczny |
| `PELNY2608-23` | `public/llms.txt:43` | „10-15 min/os." → „5-15 min/os.". Kanon to `services.tsx`, dwanaście miejsc mówi 5-15 |

**AC dla całej paczki:**
1. `npm run lint` 0/0, `npx tsc --noEmit` czysto, `npm run build` sukces.
2. **Desktop bez jakiejkolwiek zmiany wizualnej** poza wysokością celu linków nawigacji (pasek ma zostać tej samej wysokości).
3. Link do polityki w formularzu poradnika widoczny przy najechaniu w obu motywach.
4. `BackToTopButton` klikalny na `/blog/<dowolny-slug>` przy widocznym banerze cookies.
5. `/portfolio` w JSON-LD: `ItemList` ma **8** pozycji, bez `box17`, w kolejności widocznej siatki.
6. `/poradnik` zwraca blok `application/ld+json` z `BreadcrumbList`.
7. Dark mode sprawdzony na `/blog/<slug>` i `/poradnik`.

**Stop:** `PELNY2608-23` dotyka `llms.txt`, czyli treści handlowej. Jeśli Marcin nie potwierdził
„5-15", zostaw tę jedną pozycję i zgłoś. Reszta paczki jest niezależna.

---

## Wymagają zgody Marcina, zanim agent dotknie

| ID | Czego dotyczy | Paragraf |
|---|---|---|
| `PELNY2608-08` | ósmy `Offer` w `hasOfferCatalog` + dwie pozycje w `knowsAbout` | `CLAUDE.md §10.3` (JSON-LD w `layout.tsx`) |
| `PELNY2608-15` | trzy anonimowe `ProfessionalService` → referencja `@id` | `§10.3` |
| `PELNY2608-12` | domeny DoubleClick/Google w `connect-src` i `img-src` | `§10.2` (`next.config.ts`) |
| `PELNY2608-65` | `frame-ancestors` w CSP, szersze `Permissions-Policy` | `§10.2` |
| `PELNY2608-02`, `-03`, `-04`, `-24`, `-27` | rozjazdy w danych biznesowych (warunki, ceny, progi) | `§10.7` — **nie poprawiać samodzielnie** |
| `PELNY2608-25`, `-26` | brzmienie cytatów klientów | `zasady-tekstow.md` — cytatów się nie redaguje |
| `PELNY2608-56` | aktualizacja `CLAUDE.md` | zmiany w tym pliku wymagają zgody |
| `PELNY2608-32` | dopisanie loga `[ALERT]` w `turnstile.ts` | dotyka ścieżki bezpieczeństwa formularza |
| `PELNY2608-62` | usunięcie `TrustStats.tsx` | skasowanie pliku |
| `.env.local.example` (przykład z sandboksem Resend) | `§10.4` |

## Poza kodem — agentowi nie zlecać

- **PageSpeed Insights, mobile i desktop, PRZED kolejnym deployem.** Szósty audyt z rzędu bez tej liczby. `pagespeed.web.dev/analysis?url=https%3A%2F%2Fszabunia.pl%2F`, wkleić LCP, CLS, TBT i element LCP do `POMIARY-2026-08-05.md`.
- **Google Ads → Cele → Podsumowanie → Konwersje** (warunek startu `PELNY2608-05`).
- **GA4 → Administracja → Strumienie danych → Pomiar zaawansowany:** status „Zmiany strony na podstawie zdarzeń historii przeglądarki" (rozstrzyga `PELNY2608-11`) i „Interakcje z formularzami" (rozstrzyga H7).
- **GA4 → Zdarzenia, 28 dni:** pełna lista z liczbami, do skonfrontowania z tabelą zdarzeń z modułu D.
- **Vercel Analytics vs GA4, ten sam zakres dat:** iloraz odsłon = górne oszacowanie niedomierzenia przez zgodę (`PELNY2608-14`).
- **Konsola po akceptacji banera cookies:** czy leci `Refused to connect to 'https://stats.g.doubleclick.net'` (H5, rozstrzyga `PELNY2608-12`). **Agent tego nie zrobi — kliknięcie zgody to działanie w Twoim imieniu.**
- **`curl -sI`** dla `marcinszabunia.pl/portrety-biznesowe` i `www.szabunia.pl/` (H1, H2).
- **Wygenerowanie karty OG ósmej usługi** (`PELNY2608-07`).
- **Rich Results Test** dla `/` i `/kontakt` (czy widzi dwie encje `ProfessionalService`).
- **Odpowiedzi na D1–D12** z raportu, w szczególności na pozycje przeniesione z 04.08, które czekają już drugi audyt.

## Czego NIE robić (zamknięte decyzje)

Pamięć antyregresyjna. Każda z tych pozycji była kiedyś proponowana i została odrzucona albo zamknięta.

- **Nie proponować publikacji Box17.** Warunek publikacji podaje Marcin. Komplet zdjęć w repo nie jest argumentem — był nim już 04.08.
- **Nie odbudowywać cennika ani kalkulatora.** Depricing 23.07, `/kalkulator` → 301 → `/kontakt`.
- **Nie przywracać linku do Instagrama w `About.tsx`.** Decyzja z 04.08.
- **Nie dodawać LinkedIn ani Facebooka do `sameAs`.** Decyzja D z 09.06.
- **Nie przywracać `aggregateRating` ani `review[]`** do JSON-LD.
- **Nie przywracać `priceRange`.**
- **Nie cofać H1 strony głównej na hasło.** „REALIZUJĘ CELE TWOJEJ MARKI" jest na `h2` świadomie od 30.07.
- **Nie zmieniać sluga `/blog/foto-wideo-dron-z-jednego-wejscia`.** Jest zaindeksowany.
- **Nie wprowadzać `tailwind.config.js`.** Tailwind v4 działa przez `@theme inline`.
- **Nie zmieniać `font-barlow` na inną nazwę.** To celowy alias Intera od 23.07.
- **Nie pisać „za pierwsze zdjęcie" ani „za jedno ujęcie".** Odrzucone wprost przez Marcina 04.08.
- **Nie wracać do „20 minut" rozstawienia** ani do „20 zdjęć na godzinę". Decyzje z 05.08.
- **Nie skracać `max-age` w `Cache-Control` dla `/images/*`.** Zmiana na `must-revalidate` była świadomym ubezpieczeniem.
- **Nie cofać leniwego loadera gtag.js.** To świadomy trade-off wydajnościowy; skutek dla danych ma być **zapisany**, nie naprawiony kodem.
- **Nie zgłaszać `hidden md:block` + `md:hidden` jako duplikatu ani naruszenia WCAG.** `display:none` usuwa wariant z drzewa dostępności.
- **Nie zgłaszać „liczniki renderują się jako 0+ w SSR".** Sprawdzone 05.08 w żywym HTML: renderują się jako `250 000+`. Fałszywy pozytyw, patrz `AUDYT-PELNY-2026-08-05.md §10`.
- **Nie zgłaszać „`/kalkulator` serwuje stary cennik".** Sprawdzone 05.08: przekierowanie działa. To był artefakt warstwy pobierania agenta, patrz `§10`.
- **Nie ufać odczytom live wykonanym warstwą pobierania agenta (WebFetch).** W tej sesji oddawała snapshoty sprzed trzech deployów i wygenerowała cztery fałszywe obserwacje. Kody odpowiedzi czytać `fetch()`-em w kontekście otwartej strony albo `curl`-em.
