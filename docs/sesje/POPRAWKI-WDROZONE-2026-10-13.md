# Poprawki wdrożone — 13.10.2026

**Status:** zmiany w drzewie roboczym, **niezacommitowane, NIE wdrożone na produkcję** (push do `main` = deploy, robi Marcin).
**Diff:** 27 plików zmienionych (+490/−447, w tym `package-lock.json`), 3 nowe ścieżki, 2 pliki usunięte.
lint: PASS · tsc: PASS · build: PASS · `npm audit --omit=dev`: 0 podatności.
Źródło: `AUDYT-SZABUNIA-2026-10-13.md`, plan: `BRIEFY-SZABUNIA-2026-10-13.md`.
Zgoda: polecenie Marcina z 13.10.2026 („wykonaj poprawki rekomendowane”).

## A. Co zrobione

### Bezpieczeństwo (SZA2610-01)
- `next` i `eslint-config-next` 16.2.10 → **16.4.0**, `npm audit fix` bez `--force` (postcss, sharp, nanoid, source-map-js,
  baseline-browser-mapping). Zależności produkcyjne: **0 podatności** (było: 1 krytyczna, 4 wysokie, 1 średnia).
  Zostaje 5 „high” wyłącznie w narzędziach lintu (`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `braces`);
  nie trafiają na stronę, a „naprawa” npm proponuje cofnięcie do `eslint-config-next@14`, więc zostawione.
  Pliki: `package.json`, `package-lock.json`. Odwrócenie: przywrócić oba pliki z `11a3f5c` i `npm ci`.

### Prywatność i wydajność filmów (SZA2610-06, SZA2610-10)
- **Plakaty 10 filmów z własnego serwera** zamiast `i.ytimg.com`: `public/images/video-posters/<id>.webp` (pobrane z YouTube 13.10,
  WebP 1280×720, 18–60 KB) przez optymalizator `next/image` (AVIF 6–11 KB przy 640 px). Przed kliknięciem „odtwórz” przeglądarka
  nie łączy się już z Google. Nowy moduł `src/lib/videoPoster.ts` z instrukcją: **nowy film = nowy plik plakatu**.
- **Odtwarzacz z `youtube-nocookie.com`** (`YouTubeFacade.tsx`, `ServiceVideoGrid.tsx`).
- `sizes` policzone z kadrowania: plakat 16:9 w kaflu kwadratowym (`ServiceVideoGrid`) i pionowym 9:16 (`GalleryView`)
  jest wyświetlany szerzej niż kafel, więc `sizes` to ~1,8× i ~3,2× szerokości kafla; poziome kafle galerii 560 px.
- **CSP** (`next.config.ts`): `frame-src` `www.youtube.com` → `www.youtube-nocookie.com`; z `img-src` usunięte `i.ytimg.com`.
  `dns-prefetch` w `layout.tsx` na `youtube-nocookie.com`. JSON-LD `VideoObject` bez zmian (adresy dla Google, nie ładowane przez przeglądarkę).
- **Polityka prywatności**: akapit o YouTube w sekcji 7, YouTube dopisany do odbiorców w sekcji 4, data aktualizacji 13.10.2026.
  ⚠ **Treść do przeczytania przez Marcina** przed wdrożeniem (opis faktów, bez wskazania podstawy prawnej).
- Usunięty fallback `onError` → `hqdefault.jpg` (pliki są lokalne; dawał zależność od CSP `i.ytimg.com`).
- Odwrócenie: przywrócić `YouTubeFacade.tsx`, `ServiceVideoGrid.tsx`, `GalleryView.tsx`, `next.config.ts` z `11a3f5c`.

### Dokumentacja (SZA2610-07)
- `CLAUDE.md`: Next.js 16.4.0; dwa zdania o kwotach w `llms.txt` przekreślone i sprostowane (od 12.09 `llms.txt` nie ma kwot);
  lista ostatnich audytów; w stopce polecenie odtwarzające `AGENTS.md`.
- `AGENTS.md`: odtworzony z `CLAUDE.md` (podmiana „Claude Code” → „Codex”). Różnice treściowe: 0 (sprawdzone `diff`).
  Przy okazji naprawione „Orchestrator sesji: Codex (web chat)” → „Claude (web chat)”, błąd starej automatycznej podmiany.

### Higiena (SZA2610-08, TECH-03, SEO-04, og:locale)
- `layout.tsx`: komentarze z wnętrza inline skryptu gtag przeniesione do komentarza JSX nad skryptem. Kod skryptu bez zmian.
  HTML stron: 0 długich myślników (było 4 na stronę), ok. 3 KB mniej na stronę.
- `og:locale` i `og:site_name` na wszystkich trasach: wspólne `OG_DEFAULTS` w `src/lib/og.ts`, rozwinięte w `openGraph` 10 stron
  i layoutu (Next nie łączy `openGraph` layoutu i strony). Wartości identyczne z dotychczasowymi z layoutu.
- Martwy kod: `src/hooks/useMediaQuery.ts`, `blogCategories` (`blog.ts`), `getPillar` (`servicePillars.ts`), nieosiągalna gałąź 503
  w `api/contact` i `api/lead` (od `c8a45b3` `isRateLimited` nie rzuca), nieużywany `public/images/portfolio/sesje-zespolowe-cover.jpg`
  i jego wpis w `galleryAlts.ts`. **Zostawione świadomie:** `replacedHomeFaqs2209` w `faq.ts` (archiwum treści z komentarzem
  „nic nie znika z serwisu”; usunięcie treści to decyzja Marcina).
- `sitemap.ts`: `SITE_UPDATED` 23.09 → 24.09 (zmiany z 24.09), polityka prywatności 11.08 → 13.10.

## B. Weryfikacja

| Test | Wynik |
|---|---|
| `npm run lint` | PASS, 0/0 |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS |
| `npm audit --omit=dev` | 0 podatności |
| `next start` lokalnie: CSP w nagłówku | `frame-src https://www.youtube-nocookie.com …`, `img-src` bez `i.ytimg.com` |
| HTML 7 stron: odwołania do `i.ytimg.com/vi` w zasobach | 0 (jedyne trafienie: adres w JSON-LD case Woohoo, nie pobierany) |
| `og:locale` / `og:site_name` | obecne na 7/7 sprawdzonych stronach (`pl_PL`, „Marcin Szabunia”) |
| Długie myślniki w HTML | 0 na 7/7 (było 4) |
| Plakaty przez `/_next/image` | 200, AVIF 6–11 KB @640 px |
| Case Woohoo: klik „odtwórz” | iframe `youtube-nocookie.com/embed/4INLtKcKcZk`, brak naruszeń CSP w konsoli |
| `/galeria?kat=wideo` @1440 (zrzut Chrome headless) | 7/7 plakatów widocznych, kafle pionowe ostre |
| Konsola `/`, `/portfolio`, `/uslugi`, `/blog`, `/kontakt`, case Woohoo | tylko 404 `/_vercel/insights` i `/_vercel/speed-insights` (istnieją wyłącznie na Vercelu, jak 23.09) |
| Tryb ciemny `/` | przełącza się (`html.dark`) |
| Lighthouse mobile lokalnie, case Woohoo | LCP 1,7 s, pobieranie plakatu **910 ms** (produkcja 13.10: 2 531 ms z `i.ytimg.com`); a11y 100, SEO 100 |
| Lighthouse mobile lokalnie, case Artech | LCP 1,6 s, pobieranie plakatu 806 ms (produkcja: 1 204 ms) |
| `sprawdz_tekst.py src` | 0 błędów, 9 „do sprawdzenia” (te same co przed zmianami) |
| `sprawdz_spojnosc.mjs` | 0 błędów |

Lokalne LCP są lepsze także przez brak sieci; porównywalne z produkcją jest pobieranie plakatu pod tym samym dławieniem.
Ostateczny pomiar: po deployu, tym samym poleceniem Lighthouse co w audycie.

**Niesprawdzone:** przegląd wizualny 390 px w widocznym oknie (panel przeglądarki był ukryty; zrzuty Chrome headless zrobione
tylko dla `/galeria` 1440 px), wysyłka formularza (zmiana w trasach API dotyczy tylko usuniętej martwej gałęzi; `tsc` i build przechodzą).

## C. Co zostaje po stronie Marcina

| ID | Zadanie |
|---|---|
| — | Przeczytać nowy akapit polityki prywatności (sekcja 7), potem commit i push |
| SZA2610-03 | Repo `Szaba9119/szabunia-website` na prywatne (GitHub → Settings → General → Danger Zone). Sesja nie ma zalogowanego `gh` |
| SZA2610-02 | Upstash: przywrócić bazę albo nową + zmienne w Vercel + redeploy. Kryterium: brak `[ALERT] … rate-limit` przy kolejnym zgłoszeniu |
| H1 | Sprawdzić zgłoszenie z 13.10 ok. 11:08 (skrzynka `marcin@szabunia.pl`, Resend → Logs) |
| SZA2610-04 C | Ads: „Calls from ads” jako działanie główne |
| H3 | Ads: „Wyświetlenie strony (generate_lead)” jako działanie dodatkowe, jeśli dziś jest główne |
| SZA2610-05 | Decyzja tak/nie o grupach reklam per usługa |
| — | Po deployu: re-pomiar Lighthouse case Woohoo i `/` na produkcji |

## D. Świadomie odłożone

- `replacedHomeFaqs2209`: archiwum treści, usunięcie to decyzja o treści.
- `script-src https://*.youtube.com` w CSP: odtwarzacz to iframe, więc wpis jest najpewniej zbędny, ale nie był w rekomendacji;
  do usunięcia w osobnej zmianie po teście.
- PERF-03 (`/poradnik`, Turnstile od wejścia), SEO-02 (JSON-LD case studies), SZA2610-09 (szerokość pól): poza rekomendacjami.

## E. Jak wdrożyć

```bash
cd ~/Documents/05_Strona_WWW/marcinszabunia
git add -A package.json package-lock.json next.config.ts AGENTS.md CLAUDE.md src public/images/video-posters public/images/portfolio docs/sesje/AUDYT-SZABUNIA-2026-10-13.md docs/sesje/PLAN-AUDYT-SZABUNIA-2026-10-13.md docs/sesje/BRIEFY-SZABUNIA-2026-10-13.md docs/sesje/POPRAWKI-WDROZONE-2026-10-13.md
git commit
git push
```

Sugerowany commit message:

```
fix(security,privacy,seo): Next 16.4.0, plakaty filmow lokalnie, youtube-nocookie, og:locale

- next + eslint-config-next 16.2.10 -> 16.4.0, npm audit fix (prod: 0 podatnosci)
- plakaty 10 filmow z public/images/video-posters zamiast i.ytimg.com (brak polaczen
  z Google przed kliknieciem, LCP case Woohoo), odtwarzacz z youtube-nocookie.com, CSP
- polityka prywatnosci: akapit o YouTube, aktualizacja 13.10.2026
- og:locale i og:site_name na wszystkich trasach (src/lib/og.ts)
- komentarze z inline skryptu gtag poza HTML, martwy kod (TECH-03), sitemap lastmod
- CLAUDE.md: llms.txt bez kwot, lista audytow; AGENTS.md odtworzony z CLAUDE.md
- audyt: docs/sesje/AUDYT-SZABUNIA-2026-10-13.md
```
