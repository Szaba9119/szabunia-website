# Vercel Deploy Checklist — szabunia.pl

> Dokument do jednorazowego użycia przed pierwszym deployem.
> Po zakończeniu deployu możesz go usunąć lub zarchiwizować.
> Przygotowany: 2026-04-06

---

## 1. Repo → Vercel (panel vercel.com)

- [ ] Zaloguj się na vercel.com (konto powiązane z repozytorium)
- [ ] **Import Project** → wskaż to repozytorium (GitHub/GitLab/Bitbucket)
- [ ] Framework: **Next.js** (Vercel wykryje automatycznie)
- [ ] Root directory: `.` (korzeń repo — bez zmian)
- [ ] Build command: `npm run build` (domyślny — zostaw)
- [ ] Output directory: `.next` (domyślny — zostaw)
- [ ] Node.js version: **18.x lub 20.x** (sprawdź w Settings → General po imporcie)

---

## 2. Zmienne środowiskowe (Settings → Environment Variables)

Ustaw **przed** pierwszym deployem produkcyjnym.

| Zmienna | Wartość | Scope | Wymagana |
|---|---|---|---|
| `RESEND_API_KEY` | (klucz z panelu Resend) | Production, Preview, Development | **TAK** — formularze /api/contact i /api/lead |
| `NEXT_PUBLIC_ANALYTICS_URL` | URL skryptu Plausible lub Umami (np. `https://plausible.io/js/script.js`) | Production only | NIE — opcjonalna, pomija się jeśli pusta |

> **Uwaga CSP:** Jeśli ustawisz `NEXT_PUBLIC_ANALYTICS_URL`, skrypt analityczny zostanie
> zablokowany przez Content-Security-Policy w `next.config.ts` (brak domeny analitycznej
> w `script-src`). Przed włączeniem analytics wymagana jest zmiana w `next.config.ts` —
> oddzielny brief dla Claude Code.

---

## 3. Domena — OVH + Vercel

### W panelu Vercel (Settings → Domains):
- [ ] Dodaj domenę: `szabunia.pl`
- [ ] Dodaj domenę: `www.szabunia.pl` → ustaw redirect → `szabunia.pl`

### W panelu OVH (DNS zone dla `szabunia.pl`):
- [ ] Dodaj rekord **A**: `@` → IP podane przez Vercel (lub użyj Vercel nameservers)
- [ ] Dodaj rekord **CNAME**: `www` → `cname.vercel-dns.com`
- [ ] Alternatywnie: przenieś nameservery domeny na Vercel NS (prostsze, Vercel zarządza całą strefą DNS)
- [ ] Odczekaj propagację DNS (do 48h, zazwyczaj kilka minut)
- [ ] Vercel automatycznie wystawi certyfikat SSL (Let's Encrypt) po weryfikacji domeny

### Redirect starej domeny `marcinszabunia.pl` → `szabunia.pl`:
- [ ] Opcja A (prosta): W Vercel dodaj `marcinszabunia.pl` jako dodatkową domenę i ustaw redirect → `szabunia.pl` (wymaga że domena jest dostępna w panelu OVH)
- [ ] Opcja B: Skonfiguruj redirect na poziomie DNS/hostingu OVH dla `marcinszabunia.pl`

---

## 4. Problemy do naprawienia przed deployem

> Te rzeczy wymagają decyzji Marcina i oddzielnych briefów dla Claude Code.

### PILNE — blokuje SEO po deployu:

- [ ] **`public/robots.txt` — zła domena w Sitemap**
  ```
  # Obecne (BŁĄD):
  Sitemap: https://marcinszabunia.pl/sitemap.xml

  # Powinno być:
  Sitemap: https://szabunia.pl/sitemap.xml
  ```
  → Krótki fix: zmień jedną linię w `public/robots.txt` (nie wymaga nowej paczki ani zmian w next.config.ts)

### DO POTWIERDZENIA — dane biznesowe:

- [ ] **LinkedIn URL** — w JSON-LD (`layout.tsx` linia ~145) wciąż: `https://www.linkedin.com/in/marcinszabunia`
  Czy to aktualny profil pod marką `szabunia.biz`? Jeśli nie — podaj nowy URL.

- [ ] **Facebook URL** — w JSON-LD wciąż: `https://www.facebook.com/marcinszabunia.fotograf`
  Czy to aktualny profil? Jeśli nie — podaj nowy URL lub usuń z `sameAs`.

### DO ROZWAŻENIA — nie blokuje deployu:

- [ ] **`NEXT_PUBLIC_ANALYTICS_URL`** nie ma w `.env.local.example` — warto dopisać komentarz/placeholder żeby Marcin wiedział, że taka opcja istnieje. (Ew. brief dla Claude Code)
- [ ] **`manifest.json` ikony** — tylko `favicon.ico` (48×48). Dla pełnego PWA potrzebne `icon-192.png` i `icon-512.png`. Nie blokuje deployu, ale przeglądarki będą zgłaszać brak ikon PWA.

---

## 5. Po deployu — smoke test

- [ ] `https://szabunia.pl` → 200, strona się ładuje
- [ ] `https://www.szabunia.pl` → redirect → `https://szabunia.pl`
- [ ] `https://szabunia.pl/sitemap.xml` → lista URLi z domeną `szabunia.pl`
- [ ] `https://szabunia.pl/robots.txt` → `Sitemap: https://szabunia.pl/sitemap.xml`
- [ ] Formularz kontaktowy — wyślij testową wiadomość, sprawdź skrzynkę CONTACT_TO_EMAIL / panel Resend
- [ ] Dark mode toggle działa
- [ ] `https://szabunia.pl/blog`, `/portfolio/sesja-wizerunkowa`, `/uslugi/wizerunek-portrety` → 200

---

## 6. Po deployu — Google Search Console

- [ ] Dodaj właściwość `https://szabunia.pl` w Google Search Console
- [ ] Zweryfikuj przez plik HTML lub rekord DNS (Vercel umożliwia weryfikację DNS)
- [ ] Wyślij sitemap: `https://szabunia.pl/sitemap.xml`

---

*Wygenerowano automatycznie przez Claude Code — Brief #7*
