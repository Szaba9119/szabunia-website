# CLAUDE.md — Project Instructions for Claude Code

Ten plik jest źródłem prawdy o projekcie dla agentów AI (Claude Code i pokrewne).
Właściciel projektu: **Marcin Szabunia**. Orchestrator sesji: **Claude (web chat)**.
Claude Code jest wykonawcą — nie decydentem.

---

## 1. Co to za projekt

Strona biznesowa fotografa i twórcy wideo **Marcin Szabunia**, B2B.
Domena produkcyjna: **szabunia.pl**. Migracja zakończona — `grep -rn "marcinszabunia\.pl" src/ public/`
daje **zero trafień**; stara domena żyje wyłącznie jako host-based 301 w `next.config.ts`.
Model biznesowy od 23.07.2026: **cena na zapytanie** (bez publicznego cennika i kalkulatora).

Język treści: **polski**. Docelowo druga wersja językowa DE (nie wcześniej niż po pełnym odpaleniu PL).

---

## 2. Stack (stan faktyczny z `package.json`)

- **Next.js 16.2.10** (App Router, Turbopack)
- **React 19.2.3 / React DOM 19.2.3**
- **TypeScript 5**, tryb `strict: true`
- **Tailwind CSS v4** (`@tailwindcss/postcss`, `@import "tailwindcss"`, `@theme inline` w `globals.css` — nie `tailwind.config.js`)
- **framer-motion 12.34.2** — obsługuje dziś JEDEN komponent (`PortfolioGallery.tsx`); reszta animacji to czysty CSS + IntersectionObserver
- **@upstash/ratelimit + @upstash/redis** — rate-limit tras `/api/*`
- **@vercel/analytics + @vercel/speed-insights**
- **ESLint 9** + `eslint-config-next`
- Fonts przez `next/font/google` — **wyłącznie Inter**. Token `--font-barlow` to celowy alias Intera (decyzja 2026-07-23, naturalny ogonek „Ę"). Barlow usunięty
- Forms: **Resend** (REST API w `/api/contact` i `/api/lead`; zmienna `RESEND_API_KEY`, opc. `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`)
- Hosting: **Vercel**, produkcja żyje na szabunia.pl. Push do `main` = automatyczny deploy produkcyjny (nie odpalać `vercel --prod` ręcznie)

**Zakaz instalowania nowych dependency bez pisemnej zgody Marcina.** Jeśli zadanie wymaga nowej paczki — zapytaj najpierw, uzasadnij, czekaj na "ok".

---

## 3. Struktura katalogów

```
src/
├── app/
│   ├── layout.tsx              # root layout, metadata, JSON-LD org
│   ├── page.tsx                # home page (wszystkie sekcje)
│   ├── template.tsx            # page transitions
│   ├── globals.css             # design tokens (@theme inline)
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── api/                    # contact, lead (jedyne trasy serwerowe)
│   ├── blog/
│   ├── feed.xml/               # RSS
│   ├── galeria/
│   ├── kontakt/                # strona docelowa lejka
│   ├── poradnik/               # lead magnet
│   ├── portfolio/
│   ├── uslugi/
│   └── polityka-prywatnosci/
├── components/                 # 46 komponentów React
├── data/                       # statyczne dane dla komponentów
├── hooks/
└── lib/
```

Path alias: **`@/*` → `./src/*`** (z `tsconfig.json`).
**Używaj zawsze aliasu `@/`** zamiast ścieżek względnych w importach cross-folder.

---

## 4. Design tokens — źródło prawdy: `src/app/globals.css`

**NIE zgaduj kolorów ani fontów. Zawsze odczytuj je z `globals.css` (`@theme inline`) lub używaj klas Tailwind, które się na nie mapują.**

### Kolory (jasny motyw)
- `--color-navy` `#0F172A` — główny tekst, tła ciemne
- `--color-navy-light` `#1E293B`
- `--color-gray-bg` `#F9FAFB` — tło body
- `--color-blue` `#2563EB` — akcent, CTA, focus ring
- `--color-blue-light` `#3B82F6`
- `--color-blue-pale` `#EFF6FF`
- `--color-steel` `#64748B` — tekst drugorzędny
- `--color-steel-light` `#94A3B8`
- `--color-border` `#E2E8F0`
- `--color-text-body` `#334155`

### Kolory (dark mode — class-based, `.dark` na `<html>`)
- `--color-dark-bg` `#0B0F1A`
- `--color-dark-card` `#141B2D`
- `--color-dark-card-hover` `#1A2340`
- `--color-dark-border` `#1E293B`
- `--color-dark-text` `#E2E8F0`
- `--color-dark-text-muted` `#94A3B8`

### Typografia
- **Nagłówki:** Inter (600/700/800/900) — klasa `font-barlow` (nazwa historyczna, token wskazuje na Intera od 2026-07-23)
- **Body:** Inter (400/600) — `font-inter`
- Fonty ładowane przez `next/font/google` z `display: swap` — **nie dodawać `<link>` do Google Fonts w `<head>`**.

### Dark mode
- Strategia: **class-based** (`.dark` na `<html>`) z `@custom-variant dark`.
- Toggling: `components/ThemeProvider.tsx` + `ThemeToggle.tsx`, persystencja w `localStorage('theme')`.
- Inline script w `layout.tsx` zapobiega flashowi — **nie usuwać**.

---

## 5. Konwencje kodu

- **TypeScript strict** — żadnych `any` bez komentarza uzasadnienia.
- **Komponenty serwerowe** są domyślne. `"use client"` tylko tam, gdzie naprawdę trzeba (stany, efekty, event handlery, framer-motion interaktywne).
- **Każda główna sekcja na `page.tsx` opakowana w `<ErrorBoundary>`** — zachowaj ten wzorzec.
- **Accessibility baseline, którego się trzymamy:**
  - `skip-to-content` link (już w `layout.tsx`)
  - focus-visible z niebieskim outline (w `globals.css`)
  - `prefers-reduced-motion` — animacje mają być wyłączone
  - semantyczny HTML (nagłówki h1→h2→h3, `<main>`, `<nav>`, `<section>`)
- **SEO / metadata:** zmiany w `metadata` w `layout.tsx` i w JSON-LD wymagają zgody Marcina. Nie podmieniaj liczb (rating, reviewCount, priceRange) bez uzgodnienia.
- **Container width:** `max-w-6xl mx-auto` (strona główna), `max-w-5xl mx-auto` (podstrony usług/portfolio) — patrz `DESIGN.md §3.1`.
- **Obrazy:** `next/image`, formaty AVIF/WebP (ustawione w `next.config.ts`), `minimumCacheTTL: 31536000`. Nowe zewnętrzne domeny obrazków → dodać do `images.remotePatterns` po akceptacji.
- **CSP w `next.config.ts` jest restrykcyjny.** Dodawanie nowych zewnętrznych skryptów/domen wymaga edycji nagłówka `Content-Security-Policy` — nie rób tego po cichu, zgłoś w raporcie.

---

## 6. Skrypty

```bash
npm run dev     # dev server — http://localhost:3000
npm run build   # production build — MUSI przechodzić przed zgłoszeniem gotowości
npm run lint    # eslint — MUSI być zielone przed zgłoszeniem gotowości
npm start       # production server (lokalnie)
```

**Definition of Done dla każdego zadania:**
1. `npm run lint` → 0 errors, 0 warnings (warnings dopuszczalne tylko jeśli były wcześniej i nie dotyczą Twoich zmian).
2. `npm run build` → sukces.
3. Dev server odpala się bez błędów w konsoli przeglądarki na `/`, `/portfolio`, `/uslugi`, `/blog`, `/kontakt`.
4. Dark mode toggle działa na wszystkich odwiedzonych stronach.

---

## 7. Git workflow

- **Nie rób `git commit` ani `git push` samodzielnie.** Git obsługuje Marcin.
- Możesz wypisać sugerowany commit message w raporcie.
- Jeśli tworzysz nowe pliki — wymień je jawnie w raporcie (ścieżka + jedna linia opisu).
- Nie modyfikuj `.gitignore` bez zgody.

---

## 8. Środowisko i sekrety

- Przykład w `.env.local.example`. Marcin trzyma `.env.local` lokalnie.
- Kod czyta **10** zmiennych (`grep -rho "process\.env\.[A-Z_0-9]*" src/ | sort -u`):
  - `RESEND_API_KEY` — klucz API Resend (WYMAGANE — bez tego `/api/contact` i `/api/lead` zwracają 500)
  - `CONTACT_TO_EMAIL` — adres powiadomień (domyślnie marcin.szabunia@gmail.com)
  - `CONTACT_FROM_EMAIL` — nadawca. **Domyślny `onboarding@resend.dev` to sandbox Resend** — przepuszcza maile tylko na adres właściciela konta, więc na produkcji musi wskazywać zweryfikowaną domenę
  - `TURNSTILE_SECRET_KEY` + `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — CAPTCHA formularzy (fail-open z logiem `[ALERT]`)
  - `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` — rate-limit (fail-open z logiem `[ALERT]`)
  - `CRM_WEBHOOK_URL` + `CRM_WEBHOOK_SECRET` — webhook do arkusza CRM. **NIE są ustawione na produkcji** (stan 2026-07-29), więc `pushToCrm` jest tam no-opem
  - `NEXT_PUBLIC_ANALYTICS_URL` — opcjonalne (Plausible/Umami), nieustawione. Uwaga: CSP w `next.config.ts` nie dopuszcza dziś tej domeny, więc skrypt zostałby zablokowany
- **Ustawione w Vercel (Production i Preview):** 7 pierwszych z listy wyżej. Brakuje obu zmiennych CRM.
- **Nigdy nie loguj wartości env do konsoli, nie wstawiaj ich do kodu na stałe, nie commituj `.env*`.**

---

## 9. Stan migracji — znane rozjazdy (WAŻNE)

**Migracja domeny i marki: ZAKOŃCZONA** (sesja orchestracyjna, kwiecień 2026).

Marka `szabunia.pl` / `marcin@szabunia.pl` / `@szabunia.biz` wdrożona we wszystkich plikach:
- `src/app/layout.tsx` — metadataBase, openGraph.url, JSON-LD url/email/image/sameAs, analytics data-domain
- `uslugi/[slug]/page.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`, `portfolio/[slug]/page.tsx` — openGraph.url + JSON-LD
- `src/app/sitemap.ts` — baseUrl
- `src/app/polityka-prywatnosci/page.tsx` — email w treści + głos l. poj.
- `src/components/Footer.tsx`, `CTA.tsx` — email + Instagram href/display
- `src/components/About.tsx` — sam email. **Link do Instagrama usunięty 04.08.2026
  decyzją Marcina** („ze strony głównej usuń przejście na Instagram"). `About` renderuje
  się wyłącznie na stronie głównej. Nie przywracać.

**Social: TYLKO Instagram** (`@szabunia.biz`) — decyzja D z 2026-06-09. `sameAs` w JSON-LD
zawiera Instagram + wizytówkę Google, bez LinkedIn i Facebooka. Nie dodawać ich bez decyzji
(uwaga: profil FB istnieje i ma ~1,4 tys. obserwujących — to otwarty temat linkowania, nie błąd).

**Depricing 23.07.2026:** `Pricing.tsx`, `PricingCalculator.tsx` i cała trasa `/kalkulator`
**USUNIĘTE**. `/kalkulator` → 301 → `/kontakt`. Strona nie publikuje tabel cenowych — zostały
wyłącznie kotwice „od X zł" w kartach usług (`src/data/services.tsx`). Nie odbudowywać
sekcji cennika bez wyraźnej decyzji Marcina.

**Cennik v3 (2026-07-29, próg portretowy zmieniony 04.08.2026):** kotwice = **portrety 700**
(PORTRET START: 1 osoba, sesja do 30 min, w cenie studio zewnętrzne w Poznaniu ALBO dojazd
z mobilnym studiem do klienta; pakiety od 1 100), pakiety hybrydowe 2 100, eventy 600,
**sesje zespołowe 1 400 zł za dwie osoby + 120 zł za każdą kolejną** (dwa wyretuszowane
zdjęcia na osobę; progi 180/150/120 zł za osobę WYCOFANE 05.08.2026 — rozkładały blok stały
7 h dopiero od ósmej osoby), wideo 400,
produktowa 600, dron 700, obiekty 900. Nazwy pakietów: **PORTRET/EVENT START** (tylko portrety)
**/ STANDARD / PRO / PRO MAX**.

⛔ **Linia eventowa oddaje ok. 30 gotowych zdjęć na godzinę obecności** (korekta Marcina
z 05.08.2026, wcześniej 20). Minimalne liczby w pakietach hybrydowych zostają: 60+ / 120+ / 160+.

⛔ **Kotwica portretowa brzmi dosłownie:** „Ceny portretów dla jednej osoby zaczynają się
od 700 zł netto, a sesja zespołowa od 1 400 zł netto za dwie osoby". Zwroty **„za pierwsze zdjęcie"**
i **„za jedno ujęcie"** zostały przez Marcina odrzucone wprost (04.08.2026) — nie dopisywać.
Na powierzchniach klienckich stoi **jedna kwota „od" na usługę**, bez drabinek i tabel.

⛔ **Rozstawienie mobilnego studia to 30 minut** (decyzja Marcina z 05.08.2026). Wcześniej
strona i szablony mówiły 20 minut, FAQ 30–45, a normatyw 1 h — trzy różne liczby na tę samą
czynność. Nie wracać do „20 minut" w blog.ts, portfolio.ts i services.tsx.

Terminy w **dniach kalendarzowych** (zdjęcia 14, wideo 21), poprawki w 7 dni od zgłoszenia.
Pełna siatka cen żyje w `public/llms.txt` i we wpisach `src/data/blog.ts` — **kanon kotwic
to `src/data/services.tsx`**.

**Box17:** case study `box17-budki-akustyczne` jest w `DRAFT_SLUGS` (`src/data/portfolio.ts`)
**świadomie, decyzją Marcina z 04.08.2026**, mimo kompletu zdjęć. W `public/images/portfolio/box17/`
leży 10 plików JPG od commita `9fc7ff4`, razem z miniaturą, a dane case study są kompletne.
Poprzedni zapis („brakuje miniatury, po wgraniu wystarczy usunąć jedną linię") był nieprawdziwy
od 04.08 i podnosił ten sam finding w każdym kolejnym audycie (ZDJ2608-02b). Warunek publikacji
ma podać Marcin; do tego czasu **nie proponować publikacji Box17**.

**Znany rozjazd historyczny:** folder/zip `Strona z google ai` był reliktem eksperymentu z Gemini —
**już go w repo nie ma** (wpis w `tsconfig.exclude` jest wyłącznie historyczny).

**Repozycjonowanie SEO 30.07.2026 (zgoda Marcina, na danych z GSC i Ads).** Cztery zmiany,
których NIE cofać bez przeczytania `docs/sesje/RANKING-CO-NAPRAWIC-2026-07-30.md`
i `01_Biznes/_System/07_Strategia/seo_vs_strategia_2026-07-30.md`:

1. **Przekierowania ze starej domeny: mapowanie tematyczne** (`next.config.ts`). Cofa
   ustalenie z 09.06 („wszystko na stronę główną, lejek sprzedażowy"). Powód: przekierowanie
   na stronę niepowiązaną tematycznie jest dla Google miękkim 404 i nie przenosi sygnałów,
   więc osiem lat historii `marcinszabunia.pl` przepadało. Kryterium sukcesu i punkt
   odniesienia w komentarzu w kodzie. Odwracalne jednym commitem.
2. **Pole `h1?` w `ServiceData`** (`services.tsx`, użyte w `ServiceHero.tsx`). `title`
   zostaje krótką nazwą dla nawigacji, kart, okruszków i `name` w JSON-LD; `h1` niesie frazę.
   Nie zlewać tych dwóch pól. Nie doklejać miasta przecinkiem, patrz `docs/zasady-tekstow.md`.
3. **H1 strony głównej to fraza, hasło „REALIZUJĘ CELE TWOJEJ MARKI" zjechało na `h2`**
   (`Hero.tsx`). Hasło nie zniknęło, zmieniło poziom nagłówka. Hierarchia h1 → h2 → h3
   pozostaje poprawna, bo wszystkie sekcje strony głównej i tak używają `h2`.
4. **Pozycjonowanie w metadanych i JSON-LD: eventy przed portretami.** Wynika z
   `01_Biznes/_System/07_Strategia/korekta_pozycjonowania_2026-07.md` (10 z 11 realizacji
   referencyjnych to eventy). Kolejność kart usług w `services.tsx` NADAL ma portrety
   pierwsze — to świadome, odwrócenie hierarchii jest robotą na wrzesień
   (`CO_DALEJ_lista_dzialan.md`: „strukturę zostawiamy do września").

Usunięty żargon: **„z jednego wejścia" → „od jednej osoby"** w 25 miejscach (`src/` i `blog.ts`).
Słowo „wejście" miało zero wystąpień we wszystkich zapytaniach z GSC i Ads. Slug
`/blog/foto-wideo-dron-z-jednego-wejscia` **został bez zmian**, bo jest zaindeksowany.

**Audyty:** metodyka w `docs/METODYKA-AUDYTU.md`, raporty w `docs/sesje/`. Ostatni pełny:
`AUDYT-PELNY-2026-07-29.md` (moduły A-E + panele) razem z `POPRAWKI-2026-07-29.md`.
Metadane i nagłówki: `SEO-TITLE-DESCRIPTION-2026-07-30.md` i `RANKING-CO-NAPRAWIC-2026-07-30.md`.

---

## 10. Workflow z orchestratorem (Claude w web chacie)

Claude Code pracuje w trybie **brief → wykonanie → raport**. Marcin wkleja briefy napisane przez orchestratora. Każdy brief zawiera:
**kontekst, zadanie, zakres, input, acceptance criteria, format raportu, stop-conditions.**

### Kiedy się zatrzymać i zapytać Marcina (stop-conditions — zawsze aktywne):
1. Brief wymaga zainstalowania nowej paczki npm.
2. Trzeba zmienić `next.config.ts` (nagłówki, CSP, images, redirects).
3. Trzeba zmienić `metadata` w `layout.tsx` lub JSON-LD.
4. Trzeba dotknąć `.env.local.example` / zmiennych środowiskowych.
5. Trzeba zrobić refactor, który dotyka >3 plików naraz i nie był w briefie.
6. Lint albo build nie przechodzi i naprawienie wymaga decyzji merytorycznej (nie technicznej).
7. Wykryto rozbieżność w treściach biznesowych (ceny, godziny, adresy, telefon, email) — nie poprawiać samodzielnie.
8. Cokolwiek, czego brief explicite nie obejmuje, a wydaje się "przy okazji".

Gdy trafisz w stop-condition: **zatrzymaj pracę, opisz problem w raporcie, zaproponuj 2–3 opcje, czekaj**.

### Format raportu (trzymaj się go dokładnie)

```
## Raport — [tytuł zadania]

**Status:** DONE / BLOCKED / PARTIAL

**Co zrobione:**
- [bullet, 1 linia każdy]

**Pliki zmienione / utworzone:**
- path/to/file.tsx — [jedna linia: co się stało]

**Lint / Build:**
- lint: PASS / FAIL (liczba + krótko jakie)
- build: PASS / FAIL

**Problemy i decyzje (stop-conditions):**
- [albo "brak", albo lista z opcjami do wyboru]

**Sugerowany commit message:**
`[typ]: [krótki opis]`

**Co dalej (opcjonalnie):**
- [maks. 3 bullety — sugestie następnych kroków]
```

---

## 11. Zasady twarde — nie łamać

1. **Nie commituj, nie pushuj, nie mergeuj.**
2. **Nie instaluj nowych dependency** bez zgody.
3. **Nie zmieniaj `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `.env*`** bez explicite takiego polecenia w briefie.
4. **Nie edytuj plików w katalogu `Strona z google ai`** ani zipa `Strona z google ai.zip`.
5. **Nie wprowadzaj `tailwind.config.js`** — Tailwind v4 działa przez `@theme inline` w `globals.css`.
6. **Nie dodawaj globalnych CSS resetów** poza `globals.css`.
7. **Nie używaj `any`** bez komentarza wyjaśniającego dlaczego.
8. **Nie wymyślaj contentu** (cen, statystyk, opinii, liczb klientów). Jeśli brief nie daje tekstu — zostaw placeholder `TODO: copy` i zgłoś w raporcie.
9. **Nie "ulepszaj przy okazji"** rzeczy, których brief nie obejmuje.
10. **Nie usuwaj `ErrorBoundary` wrappera** w `page.tsx`.

---

## 12. Kontakt do orchestratora

Wszystkie pytania, niejasności, wątpliwości → wypisz w sekcji **"Problemy i decyzje"** raportu. Marcin przekaże je do orchestratora i wróci z decyzją. Nie próbuj kontaktować się z Marcinem bezpośrednio ponad raport.

---

*Ostatnia aktualizacja: 2026-07-30 (repozycjonowanie SEO: metadane, H1, mapowanie przekierowań
ze starej domeny, koniec żargonu „z jednego wejścia" — za zgodą Marcina).
Zmiany w tym pliku wymagają zgody Marcina.*
