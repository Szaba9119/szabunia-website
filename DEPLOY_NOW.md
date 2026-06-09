# DEPLOY szabunia.pl — instrukcja na teraz

**Data:** 20 maja 2026
**Stan:** Cały kod jest gotowy do produkcji. Otwarte tylko kroki operacyjne (commit/push/domena).

---

## Co jest już zrobione

- Cała strona w Next.js 16 + React 19 + Tailwind v4
- Wszystkie podstrony: home, `/uslugi/[slug]` (4 usługi), `/portfolio/[slug]`, `/blog/[slug]`, `/kalkulator`, `/polityka-prywatnosci`, 404
- 34 komponenty React (Hero, Services, Pricing, Portfolio, Process, Equipment, Publications, Testimonials, FAQ, BlogPreview, CTA, Footer, MobileFAB, CookieConsent, ScrollProgress, ThemeToggle, dark mode itd.)
- Metadata + OpenGraph + Twitter Cards na każdej podstronie
- JSON-LD: ProfessionalService + Person + WebSite + BlogPosting + BreadcrumbList (37+ instancji)
- `lang="pl"`, sitemap.xml dynamiczny, robots.txt z prawidłowym Sitemap URL
- Skip-link, focus-visible, dark-mode, animacje Framer Motion
- Cennik 2026 zaktualizowany (11+3 pozycje + EVENT PREMIUM)
- ESLint czysty (0 errors, 0 warnings)
- CSP + security headers w `next.config.ts`
- Manifest PWA, theme-color, analytics gate przez `NEXT_PUBLIC_ANALYTICS_URL`

## Co zostało do zrobienia (operacyjne, ~30 minut)

### KROK 1 — Commit i push do GitHub (5 min)

Otwórz Terminal i wykonaj:

```bash
cd ~/Documents/05_Strona_WWW/marcinszabunia

# Zdejmij stary lock (jeśli istnieje)
rm -f .git/index.lock

# Sprawdź remote (powinno być puste)
git remote -v

# Dodaj remote do GitHub (repo Szaba9119/szabunia-website)
git remote add origin https://github.com/Szaba9119/szabunia-website.git

# Stage wszystkich plików
git add -A

# Commit (jeden duży initial commit z całą pracą)
git commit -m "feat: pełna strona szabunia.pl — Next.js 16, 34 komponenty, blog, portfolio, kalkulator, JSON-LD, cennik 2026, dark mode"

# Push z force (zastępuje 'Initial commit' jaki jest aktualnie na GitHubie)
git push -u origin main --force
```

Jeśli git push prosi o login: użyj swojego GitHub username (`Szaba9119`) i **Personal Access Token** jako hasła (nie zwykłego hasła GitHub). Token generujesz tu: <https://github.com/settings/tokens>

### KROK 2 — Sprawdź auto-deploy na Vercel (5 min)

Vercel jest już podpięty do tego repo. Po pushe automatycznie zbuduje i zdeployuje.

1. Otwórz <https://vercel.com/marcins-projects-310ecda9/szabunia-website>
2. Powinien być nowy deployment ze statusem **Building** → **Ready**
3. Otwórz preview URL — sprawdź czy strona ładuje się poprawnie

Jeśli **build się wywali** — wróć tutaj, wkleję mi log i naprawimy.

### KROK 3 — Ustaw zmienną środowiskową (3 min)

W Vercel: **Settings → Environment Variables**

| Zmienna | Wartość | Scope |
|---|---|---|
| `RESEND_API_KEY` | (klucz z panelu Resend) | Production, Preview, Development |

Bez tego formularz kontaktowy nie zadziała.

Po dodaniu zmiennej: **Deployments → ... → Redeploy** żeby Vercel rebuildował z env var.

### KROK 4 — Podpięcie domeny szabunia.pl (15 min + propagacja DNS)

#### W Vercel (Settings → Domains):

1. Dodaj domenę: `szabunia.pl`
2. Dodaj domenę: `www.szabunia.pl` → ustaw **Redirect** → `szabunia.pl` (301)
3. Vercel pokaże instrukcje DNS — zapisz dane (IP dla A record + CNAME dla www)

#### W panelu OVH (DNS zone dla szabunia.pl):

Wejdź w `panel.ovh.com` → Domeny → szabunia.pl → DNS zone, dodaj:

- **A record:** `@` → IP podane przez Vercel (zwykle `76.76.21.21`)
- **CNAME record:** `www` → `cname.vercel-dns.com`
- Usuń ewentualne stare rekordy A/CNAME wskazujące na inny hosting

Propagacja DNS zajmuje od kilku minut do 48h (zazwyczaj <1h). Certyfikat SSL Let's Encrypt Vercel wystawi automatycznie po weryfikacji.

#### Redirect ze starej domeny marcinszabunia.pl → szabunia.pl

Po podpięciu szabunia.pl:

1. W Vercel **dodaj** `marcinszabunia.pl` jako kolejną domenę projektu
2. Ustaw **Redirect** (301) → `szabunia.pl`

Pamiętaj że marcinszabunia.pl prowadzi obecnie do Adobe Portfolio — żeby redirect zadziałał musisz w OVH (lub gdziekolwiek masz tę domenę) **zmienić nameservery / rekordy DNS żeby wskazywały na Vercel**, a nie na Adobe.

### KROK 5 — Smoke test po deployu (5 min)

Po propagacji DNS:

- [ ] <https://szabunia.pl> → 200, strona ładuje
- [ ] <https://www.szabunia.pl> → 301 redirect na szabunia.pl
- [ ] <https://szabunia.pl/uslugi/wizerunek-portrety> → 200
- [ ] <https://szabunia.pl/portfolio/sesja-wizerunkowa> → 200
- [ ] <https://szabunia.pl/blog> → 200
- [ ] <https://szabunia.pl/kalkulator> → 200
- [ ] <https://szabunia.pl/sitemap.xml> → XML z linkami
- [ ] <https://szabunia.pl/robots.txt> → `Sitemap: https://szabunia.pl/sitemap.xml`
- [ ] Formularz kontaktowy → wyślij test, sprawdź skrzynkę CONTACT_TO_EMAIL / panel Resend
- [ ] Dark mode toggle → działa
- [ ] Mobile: sticky CTA "Zadzwoń" na dole działa

### KROK 6 — Google Search Console (5 min, po DNS)

1. <https://search.google.com/search-console>
2. Dodaj właściwość `https://szabunia.pl`
3. Weryfikacja przez **rekord DNS TXT** (Vercel pozwala dodać go z panelu)
4. **Sitemaps → dodaj sitemap.xml**
5. Również: dla starej `marcinszabunia.pl` w GSC → **Settings → Change of Address** → nowa domena = szabunia.pl

---

## Po deployu — kolejne kroki rozwoju (osobne sesje, nie blokują deployu)

Z `plan_rozwoju_marcinszabunia.md` w Twoim folderze, FAZA 1 (miesiąc 1):

- Google Business Profile dla Poznania
- Showreel 60–90 s na home
- Lead Magnet PDF („5 błędów wizualnych zarządu 2026")
- LinkedIn URL — gdy odbudujesz profil pod marką szabunia.biz, dodać do JSON-LD i nawigacji
- Calendly w CTA „Sprawdź dostępność terminu"
- BFG Magazine backlink (mail do redakcji)
- Indywidualne `og:image` per podstrona usługowa
- EN wersja językowa (jak będą klienci z USA/UE pytać)

---

## W razie problemów

**Build wywala się na Vercel?** — Wklej mi log błędu, naprawiam.
**Formularz nie wysyła?** — Sprawdź czy `RESEND_API_KEY` jest ustawione w Vercel env.
**DNS nie propaguje się po 2h?** — `dig szabunia.pl` w terminalu pokaże co jest aktualnie.
**Vercel nie widzi nowych zmian po push?** — Sprawdź czy commit faktycznie poszedł do gałęzi `main` na GitHubie.

---

*Plik wygenerowany w sesji Cowork 20 maja 2026. Po deployu możesz go usunąć lub przenieść do archiwum.*
