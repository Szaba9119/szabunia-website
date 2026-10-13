# Briefy — SZABUNIA 13.10.2026

Stan wyjściowy: produkcja szabunia.pl = `main` = `11a3f5c`. Źródło: `AUDYT-SZABUNIA-2026-10-13.md`.
**ZGODA:** polecenie Marcina 13.10.2026 „rozpisz sobie plan poprawek i wykonaj poprawki rekomendowane”. Obejmuje
rekomendowane warianty z §11–§12 raportu, w tym zmiany, które normalnie są stop-conditions: `package.json`
(aktualizacja Next), `next.config.ts` (CSP pod `youtube-nocookie.com`), `metadata` (og:locale, og:site_name),
`CLAUDE.md` i `AGENTS.md`. Nie obejmuje commitów, pushy ani deployów (CLAUDE.md §7, §11.1).

DoD: `npm run lint` 0/0 · `npx tsc --noEmit` · `npm run build` · `npm audit` bez krytycznych ·
`next start` lokalnie: `/`, `/portfolio`, `/uslugi`, `/blog`, `/kontakt`, case Woohoo bez błędów konsoli, tryb ciemny ·
`sprawdz_tekst.py` 0 błędów · Lighthouse case Woohoo lokalnie (render i pobranie plakatu).

## Kolejność

| # | ID | Co | Pliki | Wykonawca |
|---|---|---|---|---|
| 1 | SZA2610-01 | `next` i `eslint-config-next` → 16.4.0; `npm audit fix` bez `--force` dla zależności przechodnich | `package.json`, `package-lock.json` | 🤖 |
| 2 | SZA2610-06, -10 | Plakaty 10 filmów jako pliki lokalne przez `next/image` (koniec ładowania z `i.ytimg.com` przy wejściu, krótszy LCP Woohoo); odtwarzacz z `youtube-nocookie.com`; CSP: `frame-src` nocookie, `img-src` bez `i.ytimg.com` | `public/images/video-posters/`, `YouTubeFacade.tsx`, `ServiceVideoGrid.tsx`, `next.config.ts` | 🤖 |
| 3 | SZA2610-06 | Polityka prywatności: akapit o YouTube, data aktualizacji | `polityka-prywatnosci/page.tsx` | 🤖, treść do przeczytania przez Marcina |
| 4 | SZA2610-07 | `AGENTS.md` = `CLAUDE.md` (z nazwą wykonawcy Codex); w `CLAUDE.md` §9 dwa zdania o `llms.txt` i lista ostatnich audytów | `CLAUDE.md`, `AGENTS.md` | 🤖 |
| 5 | SZA2610-08 | Komentarze z inline skryptów do komentarzy JSX (bez zmiany działania skryptów) | `layout.tsx` | 🤖 |
| 6 | 14.09 / SEO | `og:locale` i `og:site_name` na wszystkich podstronach | 10 plików `page.tsx` albo wspólny helper | 🤖 |
| 7 | TECH-03, SEO-04 | Martwy kod (`useMediaQuery`, `replacedHomeFaqs2209`, `blogCategories`, `getPillar`, gałąź 503 w `api/contact` i `api/lead`), `lastmod` 24.09 | `hooks/`, `data/`, `api/*/route.ts`, `sitemap.ts` | 🤖 |

## Poza kodem (Marcin, w panelach; agent nie ma dostępu)

| ID | Co | Gdzie |
|---|---|---|
| SZA2610-03 | Repo na prywatne | GitHub → `Szaba9119/szabunia-website` → Settings → General → Danger Zone → Change visibility. Uwaga: GitHub kasuje wtedy gwiazdki i obserwujących repo |
| SZA2610-02 | Upstash: przywrócić bazę albo utworzyć nową, podmienić `UPSTASH_REDIS_REST_URL/TOKEN` w Vercel (Production i Preview), redeploy | console.upstash.com, Vercel → Settings → Environment Variables |
| H1 | Czy przyszło zgłoszenie z 13.10 ok. 11:08 | skrzynka `marcin@szabunia.pl`, Resend → Logs |
| SZA2610-04 (C) | Konwersja „Calls from ads” jako działanie główne | Ads → Cele → Konwersje |
| H3 | Czy „Wyświetlenie strony (generate_lead)” jest działaniem głównym; jeśli tak, przestawić na dodatkowe | jw. |
| SZA2610-05 | Grupy reklam per usługa z adresami podstron; sitelinki na podstrony | Ads (decyzja tak/nie z §12 pkt 5) |

## Czego NIE robić (zamknięte decyzje)

Box17 zostaje w drafcie. Bez kwot na stronie i w `llms.txt`. Title i H1 money pages bez zmian do danych GSC (SEO-05).
Bramkowanie zdarzeń zgodą zostaje (decyzja A z §12 pkt 4). JSON-LD case studies (SEO-02) bez zmian, nie było rekomendacji.
Pola formularza na telefonie (SZA2610-09) bez zmian, to opinia.
