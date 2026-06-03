# CLAUDE.md — Project Instructions for Claude Code

Ten plik jest źródłem prawdy o projekcie dla agentów AI (Claude Code i pokrewne).
Właściciel projektu: **Marcin Szabunia**. Orchestrator sesji: **Claude (web chat)**.
Claude Code jest wykonawcą — nie decydentem.

---

## 1. Co to za projekt

Strona biznesowa fotografa i twórcy wideo **Marcin Szabunia**, B2B.
Docelowa domena produkcyjna: **szabunia.pl** (migracja w toku — patrz §9).
Obecna domena wpisana w kodzie: `marcinszabunia.pl` (do zmiany — §9).

Język treści: **polski**. Docelowo druga wersja językowa DE (nie wcześniej niż po pełnym odpaleniu PL).

---

## 2. Stack (stan faktyczny z `package.json`)

- **Next.js 16.1.6** (App Router)
- **React 19.2.3 / React DOM 19.2.3**
- **TypeScript 5**, tryb `strict: true`
- **Tailwind CSS v4** (`@tailwindcss/postcss`, `@import "tailwindcss"`, `@theme inline` w `globals.css` — nie `tailwind.config.js`)
- **framer-motion 12.34.2**
- **ESLint 9** + `eslint-config-next`
- Fonts przez `next/font/google` (Barlow + Inter)
- Forms: **Formspree** (`NEXT_PUBLIC_FORMSPREE_ID=xpwdjgqz`)
- Hosting docelowy: **Vercel** (jeszcze nie podpięty live na szabunia.pl)

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
│   ├── blog/
│   ├── portfolio/
│   ├── uslugi/
│   ├── kalkulator/
│   └── polityka-prywatnosci/
├── components/                 # 34 komponenty React
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
- **Nagłówki:** Barlow (600/700/800/900) — `font-barlow`
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
3. Dev server odpala się bez błędów w konsoli przeglądarki na `/`, `/portfolio`, `/uslugi`, `/blog`, `/kalkulator`.
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
- Obecnie używane:
  - `NEXT_PUBLIC_FORMSPREE_ID` — ID formularza Formspree
  - `NEXT_PUBLIC_ANALYTICS_URL` — opcjonalne (Plausible/Umami), jeszcze nieustawione
- **Nigdy nie loguj wartości env do konsoli, nie wstawiaj ich do kodu na stałe, nie commituj `.env*`.**

---

## 9. Stan migracji — znane rozjazdy (WAŻNE)

**Migracja domeny i marki: ZAKOŃCZONA** (sesja orchestracyjna, kwiecień 2026).

Marka `szabunia.pl` / `marcin@szabunia.pl` / `@szabunia.biz` wdrożona we wszystkich plikach:
- `src/app/layout.tsx` — metadataBase, openGraph.url, JSON-LD url/email/image/sameAs, analytics data-domain
- `src/app/kalkulator/page.tsx`, `uslugi/[slug]/page.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`, `portfolio/[slug]/page.tsx` — openGraph.url + JSON-LD
- `src/app/sitemap.ts` — baseUrl
- `src/app/polityka-prywatnosci/page.tsx` — email w treści + głos l. poj.
- `src/components/Footer.tsx`, `CTA.tsx`, `About.tsx` — email + Instagram href/display

**Otwarte (brak nowych wartości w source-of-truth):**
- LinkedIn: `https://www.linkedin.com/in/marcinszabunia` — potwierdzić lub podać nowy URL
- Facebook: `https://www.facebook.com/marcinszabunia.fotograf` — j.w.

**Cennik 2026: ZAKTUALIZOWANY** (sesja orchestracyjna, kwiecień 2026).
- ESSENTIAL: 1 000 zł (było 850 zł) — 11 miejsc zaktualizowanych
- Monthly Content: 4 900 zł/m-c (było 4 000 zł) — 3 miejsca zaktualizowane
- EVENT PREMIUM 4 500 zł — dodany w Pricing.tsx, PricingCalculator.tsx, services.tsx (features: TODO do potwierdzenia z Marcinem)
- Rabat 10-15% usunięty z FAQ, zastąpiony językiem zakresu

**Znany rozjazd historyczny:** folder/zip `Strona z google ai` w repo to relikt eksperymentu z Gemini. Jest w `tsconfig.exclude`. Nie dotykać, nie importować z niego.

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

*Ostatnia aktualizacja: start sesji orchestracyjnej. Zmiany w tym pliku wymagają zgody Marcina.*
