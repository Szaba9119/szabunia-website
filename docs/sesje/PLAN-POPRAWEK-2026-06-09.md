# Plan poprawek szabunia.pl — 9 czerwca 2026

Plan naprawczy do audytu `AUDYT-2026-06-09.md`. Pełny zakres **P0 → P2**, sekwencjonowany, z podziałem na to, co robisz **Ty (Marcin)** i co wykonuje **Claude Code** (gotowe briefy do wklejenia).

---

## Jak czytać ten plan

- **Owner:** 🧑 *Marcin* (DNS, konta, decyzje biznesowe) / 🤖 *Claude Code* (zmiany w repo).
- **Priorytet:** P0 krytyczny → P1 wysoki → P2 dopracowanie.
- **Wysiłek:** S (≤1h) / M (pół dnia) / L (1+ dzień).
- **Briefy** są w blokach kodu w formacie z `CLAUDE.md §10`. Każdy brief, który dotyka stop-condition (CSP, `next.config.ts`, metadane, `CLAUDE.md`, `.env`), **jawnie zawiera Twoją zgodę** — wklejając go, autoryzujesz tę zmianę.
- **Zasada twarda:** żaden brief nie dodaje nowych paczek npm. Gdzie kuszą — używamy wbudowanych mechanizmów Next (`next/script`, `next.config`).

---

## Kolejność i zależności (ścieżka krytyczna)

```
P0.3 (Resend/ENV)  ── najpierw, bo bez tego formularze mogą paść po deployu
P1.1 (www/non-www) ── ustaw host PRZED zgłoszeniem do GSC
   └─ P0.1 (301 starej domeny) ── ⏸ WSTRZYMANE (content szabunia.pl niegotowy)
        └─ P1.3 (GSC: Change of Address) ── ⏸ po odwieszeniu P0.1
P0.2 (GA4+GTM)     ── równolegle; wymaga ID z konta Google
P1.2 (treści)      ── po Twoich decyzjach z tabeli niżej
P2.*               ── po ustabilizowaniu P0/P1
```

---

## Decyzje — PODJĘTE (2026-06-09)

Marcin zatwierdził rekomendacje. To odblokowuje Brief E (konsolidacja treści).

| # | Rozjazd | Decyzja |
|---|---------|---------|
| D1 | Liczba firm | **100+** (spójne z JSON-LD i statystyką „O mnie") |
| D2 | Tury poprawek | **2 foto / 3 wideo** — poprawić FAQ na home (dziś 1/2) do 2/3 |
| D3 | Dron w pakietach Event | **W cenie** — zrównać /usługi (`services.tsx`) z home (`Pricing.tsx`) ⚠️ patrz nota |
| D4 | Express | **„24–48h: +50%"** — jeden zapis wszędzie |
| D5 | Lista klientów (kanon) | **9 marek:** H&M, Warner Music Poland, Santander Bank Polska, John Deere, IQOS, Amica, Grupa Forte S.A., Centrum Posnania, Woohoo — rozszerzyć LogoBar i JSON-LD |
| D6 | Social | **Tylko Instagram** (@szabunia.biz) — brak LinkedIn/Facebook; `sameAs` = IG |
| D7 | Host kanoniczny | **non-www** — ustawić `szabunia.pl` jako Primary w Vercel (zero zmian w kodzie) |

> ⚠️ **D3 to jedyna decyzja zmieniająca to, co fizycznie dostarczasz na zleceniu.** Przyjąłem „dron w cenie pakietów Event" za wersją z home (publiczny cennik). Jeśli dron NIE wchodzi w cenę — zawetuj, a wtedy odwrotnie: usuwamy go z home. Reszta D to czysto redakcyjne ujednolicenie.

> ⏸️ **P0.1 (301 starej domeny) i Change of Address (P1.3) — WSTRZYMANE.** Powód: `szabunia.pl` nie jest jeszcze gotowa contentowo (decyzja Marcina). Briefy zostają gotowe na potem; wracamy na Twój sygnał.

---

# P0 — Krytyczne

## P0.1 · Stara domena `marcinszabunia.pl` → 301 na `szabunia.pl`

**Owner:** 🧑 + 🤖 · **Wysiłek:** M · **Cel:** zlikwidować duplikat marki i odzyskać link equity.

> ⏸️ **STATUS: WSTRZYMANE** (decyzja Marcina, 2026-06-09) — `szabunia.pl` niegotowa contentowo. Briefów poniżej **nie** uruchamiamy, dopóki nie dasz sygnału. Zostają gotowe na potem.

Najczystsze rozwiązanie: przepiąć starą domenę na Vercel i obsłużyć 301 (z mapą ścieżek) w `next.config.ts` — wtedy redirecty są wersjonowane w repo, nie zależą od ograniczeń Adobe Portfolio.

**🧑 Kroki Marcina (najpierw):**
1. W panelu DNS domeny `marcinszabunia.pl` zmień rekordy tak, by wskazywały na Vercel (A/ALIAS wg instrukcji Vercel).
2. W projekcie Vercel dodaj domenę `marcinszabunia.pl` (+ `www.marcinszabunia.pl`).
3. Wyłącz/odepnij stary serwis Adobe Portfolio dla tej domeny (żeby nie konkurował).
4. Daj znać — wtedy uruchamiamy Brief A (redirecty).

**🤖 Brief A — redirecty starej domeny (po przepięciu DNS):**
```text
KONTEKST: marcinszabunia.pl została przepięta na Vercel (ten projekt). Chcemy 301 z całej
starej domeny na odpowiedniki na szabunia.pl, by usunąć duplikat treści.
ZADANIE: W next.config.ts dodaj host-based redirecty (permanent) z marcinszabunia.pl
(i www) na https://szabunia.pl wg mapy ścieżek.
ZAKRES: tylko sekcja redirects() w next.config.ts. Nie ruszać CSP ani innych nagłówków.
INPUT — mapa 301 (stara → nowa):
  /                     → https://szabunia.pl/
  /strona-glowna        → https://szabunia.pl/
  /portrety-biznesowe   → https://szabunia.pl/uslugi/wizerunek-portrety
  /fotografia-eventowa  → https://szabunia.pl/uslugi/eventy-reportaze
  /zdjecia-produktowe   → https://szabunia.pl/uslugi/fotografia-produktowa
  /video                → https://szabunia.pl/uslugi/wideo-marketing
  /o-mnie               → https://szabunia.pl/#o-mnie
  /contact              → https://szabunia.pl/kontakt
  (catch-all reszty)    → https://szabunia.pl/
  Użyj `has: [{ type: 'host', value: '(www\\.)?marcinszabunia\\.pl' }]`.
ZGODA: TAK — zmiana next.config.ts (redirects) jest autoryzowana tym briefem.
ACCEPTANCE: npm run build OK; po deployu każdy stary URL zwraca 301 na poprawny nowy;
  nagłówki bezpieczeństwa i CSP bez zmian.
STOP-CONDITIONS: jeśli redirect wymagałby dotknięcia CSP/headers — zatrzymaj i zgłoś.
FORMAT RAPORTU: standardowy (CLAUDE.md §10).
```
**🧑 Po wdrożeniu:** przejdź do P1.3 (GSC Change of Address).

---

## P0.2 · Pomiar konwersji — GA4 + Google Tag Manager (z consent mode)

**Owner:** 🧑 + 🤖 · **Wysiłek:** M · **Cel:** mierzyć leady i być gotowym pod Google Ads/Meta.

**🧑 Kroki Marcina:**
1. Załóż konto **Google Tag Manager** → kontener Web → skopiuj `GTM-XXXXXXX`.
2. Załóż usługę **GA4** → skopiuj `G-XXXXXXXXXX`. (GA4 wepniemy przez GTM.)
3. Przekaż oba ID do briefu poniżej.
4. (Konfigurację tagów GA4 i celów w GTM ustawiamy w panelu GTM — mogę przygotować osobną instrukcję krok-po-kroku.)

**🤖 Brief B — wpięcie GTM + dataLayer + consent (bez nowych paczek):**
```text
KONTEKST: Strona ma tylko Vercel Analytics. Wdrażamy GTM (GA4 przez GTM) z pomiarem
konwersji i zgodą cookie. Istnieje komponent CookieConsent i restrykcyjny CSP.
ZADANIE:
  1. Dodaj GTM przez next/script (NIE instaluj @next/third-parties ani innych paczek):
     - snippet GTM w <head> (strategy="afterInteractive") z ID = GTM-XXXXXXX,
     - <noscript> iframe GTM tuż po <body>.
  2. Zainicjuj Google consent mode v2 jako "denied" domyślnie (analytics_storage,
     ad_storage = denied) PRZED ładowaniem GTM. CookieConsent.tsx trzyma stan w
     localStorage pod kluczem "cookie-consent" ("accepted"/"declined") z handlerami
     accept()/decline() — na load, jeśli =="accepted" ustaw 'granted'; w accept()
     wywołaj gtag('consent','update',{granted}) i push 'consent_granted'.
     (Vercel Analytics jest bezcookie — może zostać bez gating.)
  3. Dodaj cienki helper do push zdarzeń na window.dataLayer i podłącz zdarzenia:
     - contact_submit  → sukces wysyłki formularza w CTA.tsx
     - generate_lead   → sukces zapisu w PoradnikForm.tsx
     - click_phone     → klik w tel:+48514900688 (Footer/CTA/kontakt)
     - click_email     → klik w mailto:marcin@szabunia.pl
     - calculator_done → ukończenie wyceny w PricingCalculator.tsx
  4. Zaktualizuj CSP w next.config.ts o domeny Google:
     - script-src:  + https://www.googletagmanager.com
     - connect-src: + https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com
     - img-src:     już 'https:' (OK), nie zmieniać
     - frame-src:   + https://www.googletagmanager.com
ZAKRES: layout.tsx (skrypty + consent init), CookieConsent.tsx (update zgody),
  CTA.tsx / PoradnikForm.tsx / Footer.tsx / kontakt/page.tsx / PricingCalculator.tsx
  (push zdarzeń), next.config.ts (CSP). Bez nowych zależności.
ZGODA: TAK — zmiana next.config.ts (CSP) ORAZ skryptów/metadanych w layout.tsx jest
  autoryzowana tym briefem.
INPUT: GTM-XXXXXXX = [wkleić], GA4 G-XXXXXXXXXX = [konfig. po stronie GTM].
ACCEPTANCE:
  - npm run lint i npm run build OK;
  - przed zgodą: brak requestów do google-analytics; po akceptacji: GTM ładuje się,
    dataLayer zawiera zdarzenia, brak błędów CSP w konsoli;
  - reduced-motion i dark mode bez regresji.
STOP-CONDITIONS: jeśli GTM wymaga 'unsafe-eval' lub dodatkowych domen spoza listy —
  zatrzymaj, wypisz dokładnie czego brakuje, czekaj.
FORMAT RAPORTU: standardowy.
```

---

## P0.3 · Resend zamiast Formspree — dokumentacja i ENV

**Owner:** 🧑 + 🤖 · **Wysiłek:** S · **Cel:** żeby formularze działały po deployu i dokumentacja mówiła prawdę.

**🧑 Kroki Marcina:**
1. W Vercel (Project → Settings → Environment Variables) ustaw: `RESEND_API_KEY` (z panelu Resend) oraz opcjonalnie `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
2. Potwierdź, że `onboarding@resend.dev` to docelowy nadawca, czy chcesz własną zweryfikowaną domenę w Resend (np. `kontakt@szabunia.pl`).

**🤖 Brief C — synchronizacja dokumentacji z kodem:**
```text
KONTEKST: Formularze (/api/contact, /api/lead) używają Resend (RESEND_API_KEY), ale
CLAUDE.md §2/§8 i .env.local.example wciąż opisują Formspree. To wprowadza w błąd
i grozi 500 po deployu bez klucza.
ZADANIE:
  1. .env.local.example: usuń NEXT_PUBLIC_FORMSPREE_ID; dodaj RESEND_API_KEY (wymagane),
     CONTACT_TO_EMAIL i CONTACT_FROM_EMAIL (opcjonalne) z komentarzami.
  2. CLAUDE.md §2 i §8: zamień opis „Formspree" na „Resend (REST API, bez dodatkowej
     paczki)"; wymień wymagane/opcjonalne zmienne.
  3. DEPLOY_NOW.md i VERCEL_CHECKLIST.md: usuń/zastąp wiersze o NEXT_PUBLIC_FORMSPREE_ID
     i testach „na Formspree dashboard" odpowiednikami dla Resend (RESEND_API_KEY,
     test = sprawdź skrzynkę CONTACT_TO_EMAIL / panel Resend).
  UWAGA: zweryfikowano — w src/ jest 0 trafień „formspree" (martwy zapis tylko w docs
  i .env.local.example), więc usunięcie jest bezpieczne.
ZAKRES: .env.local.example, CLAUDE.md, DEPLOY_NOW.md, VERCEL_CHECKLIST.md.
ZGODA: TAK — zmiana .env.local.example, CLAUDE.md i plików deploy jest autoryzowana
  tym briefem.
ACCEPTANCE: grep -ri "formspree" w repo (poza node_modules) = 0 trafień; docs spójne
  z kodem (Resend); npm run build OK.
STOP-CONDITIONS: brak — zakres potwierdzony audytem.
FORMAT RAPORTU: standardowy.
```

---

# P1 — Wysokie

## P1.1 · Ujednolicenie hosta www vs non-www

**Owner:** 🧑 (rekomendacja) / 🤖 (wariant alternatywny) · **Wysiłek:** S · **Cel:** jeden spójny sygnał kanoniczny.

Produkcja serwuje `www.szabunia.pl`, a `canonical`/`metadataBase`/sitemap są **non-www**. Najtaniej: ustawić **non-www jako domenę główną w Vercel** — wtedy kod (już non-www) pasuje i **nie ma zmian w repo**.

**🧑 Rekomendowana ścieżka (D7 = non-www):** Vercel → Project → Domains → ustaw `szabunia.pl` jako *Primary*, `www.szabunia.pl` → Redirect to primary. Gotowe, zero kodu.

**🤖 Brief D — TYLKO jeśli wybierzesz www (D7 = www):**
```text
KONTEKST: Decyzja: host kanoniczny = www.szabunia.pl. Trzeba przełączyć metadane z
non-www na www, by canonical zgadzał się z serwowanym hostem.
ZADANIE: zamień https://szabunia.pl → https://www.szabunia.pl w: layout.tsx
  (metadataBase, openGraph.url, JSON-LD url/image, data-domain), sitemap.ts (baseUrl),
  robots (wpis Sitemap), oraz openGraph.url/JSON-LD na podstronach.
ZAKRES: layout.tsx, sitemap.ts, public/robots.txt, *_/page.tsx z openGraph.url/JSON-LD.
ZGODA: TAK — zmiana metadanych/JSON-LD w layout.tsx jest autoryzowana tym briefem.
ACCEPTANCE: brak wystąpień "https://szabunia.pl" (non-www) w metadanych; build OK.
STOP-CONDITIONS: nie zmieniać treści biznesowych „przy okazji".
FORMAT RAPORTU: standardowy.
```

---

## P1.2 · Ujednolicenie sprzecznych treści

**Owner:** 🤖 (po decyzjach D1–D6) · **Wysiłek:** S–M · **Cel:** spójny, wiarygodny przekaz.

**🤖 Brief E — konsolidacja treści wg decyzji:**
```text
KONTEKST: Audyt wykrył sprzeczne dane w treści. Marcin podjął decyzje D1–D6 (poniżej).
ZADANIE: ujednolić treść zgodnie z decyzjami, nie zmieniając niczego poza wskazanymi
miejscami:
  D1 liczba firm = [100+ / 200+] → Hero.tsx:62 i CTA.tsx:276 do jednej wartości.
  D2 poprawki = [2/3 / 1/2] → ujednolić FAQ (page.tsx) z sekcją Warunki (Pricing.tsx)
     i llms.txt.
  D3 dron w pakietach Event = [w cenie / poza] → zsynchronizuj Pricing.tsx (home)
     z services.tsx (/uslugi/pakiety-foto-wideo).
  D4 Express = [24h / 24–48h] → jeden zapis w FAQ, Warunkach i llms.txt.
  D5 lista klientów = [...] → ujednolić About.tsx, LogoBar.tsx i JSON-LD (layout.tsx).
  D6 social = [URL-e / tylko IG] → ewentualnie dodać LinkedIn/Facebook do Footer/About
     i sameAs w JSON-LD.
ZAKRES: tylko pliki wymienione wyżej + public/llms.txt.
ZGODA: TAK — D5/D6 dotykają JSON-LD w layout.tsx; autoryzowane tym briefem.
INPUT: [wkleić decyzje D1–D6 z tabeli planu].
ACCEPTANCE: dana wartość jest identyczna we wszystkich miejscach (grep potwierdza);
  build + lint OK; aggregateRating i inne liczby SEO bez zmian, jeśli decyzja ich nie
  dotyczy.
STOP-CONDITIONS: jeśli któraś decyzja jest pusta/niejasna — nie zgaduj, zatrzymaj.
FORMAT RAPORTU: standardowy.
```

---

## P1.3 · Google Search Console + Bing + zgłoszenie zmiany adresu

**Owner:** 🧑 (głównie) · **Wysiłek:** S · **Zależność:** po P0.1 (działający 301) i P1.1.

> ⏸️ Weryfikację GSC/Bing możesz zrobić kiedy chcesz; **Change of Address — dopiero po odwieszeniu P0.1** (gdy stara domena będzie realnie przekierowywać na gotową szabunia.pl).

**🧑 Kroki Marcina:**
1. Zweryfikuj `szabunia.pl` w **Google Search Console** (najlepiej metodą DNS — bez kodu).
2. Zweryfikuj też **starą** domenę `marcinszabunia.pl` w GSC.
3. Gdy 301 działa: w GSC starej domeny użyj **Change of Address** → wskaż `szabunia.pl`.
4. Wgraj sitemap (`https://szabunia.pl/sitemap.xml`) w GSC; to samo w **Bing Webmaster Tools**.
5. Monitoruj indeksację 2–4 tygodnie.

*(Jeśli wolisz weryfikację metodą meta-tagu zamiast DNS — poproś o Brief F; doda `verification` do metadanych w layout.tsx. DNS jest jednak czystsze i bez kodu.)*

---

# P2 — Dopracowanie

## P2.1 · Realne statystyki w SSR (zamiast „0+")

**Owner:** 🤖 · **Wysiłek:** S · **Cel:** liczby (500 000+, 100+, 8+, 7+) widoczne dla Google/AI.

**🤖 Brief G:**
```text
KONTEKST: Sekcja „O mnie" (About.tsx) używa CountUp od zera — w SSR widnieje „0+".
ZADANIE: tak zmodyfikuj CountUp/About, by docelowa liczba była w HTML SSR (np. realny
tekst w elemencie, animacja tylko nakładką wizualną), z poszanowaniem prefers-reduced-
motion (wtedy od razu wartość końcowa).
ZAKRES: CountUp.tsx i/lub About.tsx. Bez zmian wartości liczb (zależne od D1).
ACCEPTANCE: „view-source" pokazuje realne liczby; animacja działa; reduced-motion = od
  razu wartość końcowa; build OK.
STOP-CONDITIONS: nie zmieniać samych liczb bez decyzji (patrz D1 dla „firm").
FORMAT RAPORTU: standardowy.
```

## P2.2 · Realne zdjęcia portfolio/blog + sierota `artech/`

**Owner:** 🧑 (materiały) + 🤖 · **Wysiłek:** M.

**🧑:** dostarcz zdjęcia do galerii portfolio (każda kategoria ma dziś 1 plik) i okładki blogowe (dziś placeholdery SVG). **🤖 Brief H:** podmienić/rozszerzyć galerie w `portfolio.ts`/`blog.ts` + komponentach, dodać `alt`, usunąć pusty folder `public/images/portfolio/artech/`. Acceptance: brak placeholderów na kluczowych kategoriach, build OK, Lighthouse images bez ostrzeżeń.

## P2.3 · Core Web Vitals

**Owner:** 🧑 (pomiar) + 🤖 (fix) · **Wysiłek:** S→M.
**🧑:** odpal PageSpeed Insights na `/`, `/uslugi`, `/blog`, `/kalkulator`. **🤖 Brief I (po pomiarze):** celowane poprawki LCP (hero `marcin-hero.jpg` serwowany `w=3840` — rozważ `priority` + `sizes`) i CLS (rezerwacja miejsca pod CountUp/obrazy). Acceptance: LCP < 2,5 s, CLS < 0,1 na mobile.

## P2.4 · Landing pages pod paid + profile social

**Owner:** 🧑 + 🤖 · **Wysiłek:** L.
Dedykowane LP pod wąskie frazy (np. „headshoty zespołu Poznań", „fotograf eventowy konferencje") z jednym CTA i pomiarem (zależne od P0.2). Social: zostaje **tylko Instagram** (D6) — bez LinkedIn/Facebook; `sameAs` = IG.

---

## Podsumowanie — podział odpowiedzialności

**🧑 Tylko Marcin (poza repo):**
- ⏸️ DNS starej domeny → Vercel; odpięcie Adobe Portfolio (P0.1) — WSTRZYMANE do gotowości contentu.
- Konta GTM + GA4, ID (P0.2); konfiguracja celów w GTM.
- Zmienne Resend w Vercel (P0.3).
- Domena główna w Vercel non-www (P1.1, rekomendacja).
- Weryfikacja GSC/Bing (P1.3) — teraz; ⏸ Change of Address po odwieszeniu P0.1.
- ✅ Decyzje D1–D7 podjęte; materiały zdjęciowe (P2.2); pomiar CWV (P2.3).

**🤖 Claude Code (briefy gotowe do wklejenia):**
- A: redirecty 301 starej domeny · B: GTM+consent+zdarzenia+CSP · C: Resend/dokumentacja
- D: (opc.) przełączenie na www · E: konsolidacja treści · F: (opc.) meta-weryfikacja
- G: statystyki w SSR · H: zdjęcia/galerie · I: CWV

**Sugerowana kolejność startu (zaktualizowana):** P0.3 (C) → P1.2 (E — decyzje gotowe) → P1.1 (Vercel non-www) → P0.2 (B — po ID z GTM/GA4) → P2.1/P2.2. ⏸ P0.1 + Change of Address — dopiero po gotowości contentu szabunia.pl.

---

*Plan utworzony 2026-06-09 jako uzupełnienie audytu. Dokument planistyczny — nie wprowadza zmian w kodzie. Zmiany w `CLAUDE.md` z briefu C wymagają Twojej świadomej zgody (zawartej w briefie).*
