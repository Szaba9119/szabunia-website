# szabunia.pl

Strona wizytówka i kanał pozyskiwania leadów dla **Marcina Szabuni**, fotografa
biznesowego i twórcy wideo B2B z Poznania. Next.js 16 (App Router), hostowana
na Vercel, deploy automatyczny z gałęzi `main`.

Ten plik opisuje repo. Zasady pracy agentów AI, stop-conditions i Definition of
Done są w [`CLAUDE.md`](./CLAUDE.md) i to on jest źródłem prawdy przy sporze.

## Start

```bash
npm ci
npm run dev   # http://localhost:3000
```

Skrypty:

| Komenda | Co robi |
|---|---|
| `npm run dev` | Serwer deweloperski (Turbopack) |
| `npm run build` | Build produkcyjny. Musi przechodzić przed każdym pushem |
| `npm start` | Serwer produkcyjny lokalnie |
| `npm run lint` | ESLint. Musi być zielony przed każdym pushem |
| `npx tsc --noEmit` | Kontrola typów, nie objęta `npm run lint` |

## Stack

- **Next.js 16.2.10**, App Router, React 19
- **TypeScript** w trybie `strict`
- **Tailwind CSS v4** przez `@theme inline` w `src/app/globals.css`.
  Nie ma `tailwind.config.js` i nie należy go dodawać
- **framer-motion** dla animacji wejścia sekcji
- Poza tym: `@upstash/ratelimit` + `@upstash/redis` (limitowanie formularzy),
  `@vercel/analytics`, `@vercel/speed-insights`

Nowych zależności nie dodajemy bez decyzji właściciela (`CLAUDE.md` §11).

## Struktura

```
src/
├── app/          # trasy App Routera, metadata, JSON-LD, API
│   ├── api/      # /api/contact, /api/lead
│   └── ...       # blog, portfolio, uslugi, galeria, poradnik, kontakt
├── components/   # 47 komponentów React
├── data/         # treść jako dane: services.tsx, blog.ts, portfolio.ts
├── hooks/
└── lib/          # mail, crm, origin, turnstile, ratelimit
public/
├── images/og/    # karty Open Graph generowane skryptami
└── llms.txt      # zwięzły opis oferty dla modeli językowych
scripts/          # generatory obrazków (Python + Pillow), uruchamiane ręcznie
docs/             # metodyka audytu, zasady tekstów, raporty sesji
```

Alias importów: `@/*` → `./src/*`. Używamy go zamiast ścieżek względnych
między katalogami.

Treść mieszka w `src/data/`, nie w komponentach. Zmiana ceny czy opisu usługi
to edycja `services.tsx`, nie JSX-a.

## Zmienne środowiskowe

Produkcja ustawiana w panelu Vercel. Lokalnie: `.env.local` w katalogu repo.

Uwaga na pułapkę: `.gitignore` ignoruje wzorzec `.env*`, więc **`.env.local.example`
nie jest w repozytorium**, choć istnieje na maszynie właściciela i wymienia go
`CLAUDE.md` §8. Po świeżym `git clone` nie ma z czego kopiować i poniższa tabela
jest jedyną listą. Rozwiązanie, gdyby przeszkadzało: wyjątek `!.env.local.example`
w `.gitignore` (zmiana `.gitignore` wymaga decyzji właściciela, `CLAUDE.md` §7).

| Zmienna | Wymagana | Do czego |
|---|---|---|
| `RESEND_API_KEY` | tak | Wysyłka maili. Bez niej `/api/contact` i `/api/lead` zwracają 500 |
| `CONTACT_TO_EMAIL` | nie | Odbiorca powiadomień o leadach |
| `CONTACT_FROM_EMAIL` | nie | Nadawca. Domyślny `onboarding@resend.dev` to sandbox i nie dowiezie maila do subskrybenta |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | nie | Cloudflare Turnstile, strona klienta |
| `TURNSTILE_SECRET_KEY` | nie | Turnstile, weryfikacja serwerowa |
| `UPSTASH_REDIS_REST_URL` | nie | Limitowanie liczby zgłoszeń |
| `UPSTASH_REDIS_REST_TOKEN` | nie | j.w. |
| `CRM_WEBHOOK_URL` | nie | Zapis leada do arkusza CRM |
| `CRM_WEBHOOK_SECRET` | nie | j.w. |
| `NEXT_PUBLIC_ANALYTICS_URL` | nie | Opcjonalna analityka niezależna od GA4 |

Turnstile i rate-limit są **fail-open**: brak kluczy nie blokuje formularza,
tylko wyłącza daną barierę. To świadoma decyzja, żeby awaria usługi trzeciej nie
kosztowała leadów. Konsekwencje opisane w `src/lib/origin.ts`.

Nigdy nie logujemy wartości zmiennych i nie commitujemy `.env*`.

## Pomiar

GA4 (`G-MD8FJ0CZG3`) z Consent Mode v2: domyślnie wszystko `denied`, zgoda
nadawana po akceptacji w banerze cookie. Skrypt jest celowo zwykłym `<script>`
w `<head>`, nie `next/script`. Powód i wynik nieudanej próby refaktoru opisane
w komentarzu w `src/app/layout.tsx`.

Własny ruch odcinamy flagą: wejście na `https://szabunia.pl/?internal=1` zapisuje
znacznik w `localStorage` i od tej chwili przeglądarka wysyła `traffic_type:
internal`. Wyłączenie: `?internal=0`. Działa niezależnie od IP i sieci, w
odróżnieniu od filtra po adresie IP w panelu GA4.

## Obrazki Open Graph

Karty OG są generowane, nie rysowane ręcznie:

```bash
python3 scripts/generate-og-strony.py   # strony statyczne i huby
python3 scripts/generate-og-uslugi.py   # podstrony usług
python3 scripts/generate-og-blog.py     # wpisy blogowe
```

Wymagają Pillow i fontu z polskimi znakami. Wynik trafia do
`public/images/og/` i jest commitowany razem ze zmianą treści.

## Deploy

Push do `main` uruchamia build na Vercel. Przed pushem: `npm run lint`,
`npx tsc --noEmit`, `npm run build`, klik po `/`, `/uslugi`, `/portfolio`,
`/blog`, `/galeria`, `/kontakt` z przełączeniem trybu ciemnego.

Agenci AI nie commitują i nie pushują. Git obsługuje właściciel repo.
