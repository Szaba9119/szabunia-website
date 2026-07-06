# Audyt strony szabunia.pl — 2026-07-06 (wieczór)

Zakres: kod repo (stan `f651151`, po wdrożeniu etapów 0–2 z `PLAN_WDROZENIA_2026-07.md`) + weryfikacja live.
Metoda: 3 równoległe przeglądy (techniczny / SEO+treść / UX+konwersja) + weryfikacja na produkcji.
Wykluczone (pokryte gdzie indziej, nie powtarzam): indeksacja GSC i backlinki (`PLAN-SEO-LEADY-2026-07-06.md`), wizytówka Google, decyzja o cenniku (`ANALIZA-CENNIK-UKLAD-2026-07-06.md`), stara domena, poprawki z `POPRAWKI-WDROZONE-2026-06-26.md`.

**Stan wyjściowy: bardzo dobry.** Zero `any`/`console.log`/TODO w src/, honeypot+Turnstile+rate-limit na wszystkich formularzach, kompletny sitemap, canonicale i OG na każdej stronie, 1×h1/stronę, matematyka kalkulatora zgodna z cennikiem, blog zgodny z kanonem cen. Deploy `f651151` zweryfikowany live (Hero z linkiem do cennika, formularz przed blogiem). Poniżej wyłącznie to, co zostało do poprawy.

---

## P1 — realny wpływ, zrobić najpierw

**1. [SEO] robots.txt blokuje `/_next/`** — `public/robots.txt`, potwierdzone live.
`Disallow: /_next/` odcina Googlebota od `/_next/image` (przez ten endpoint serwowane są WSZYSTKIE obrazy w treści) i od statycznych CSS/JS. Dla fotografa = praktyczne wykluczenie zdjęć z Google Images + gorszy render strony przez Googlebota.
Poprawka: usunąć linię `Disallow: /_next/` (zostawić `Disallow: /api/`).

**2. [TECH] Brak limitów długości pól w API** — `src/app/api/contact/route.ts:70-74`, `quote/route.ts:90-92`, `lead/route.ts:86`.
`name/message/configSummary/priceLabel/utm_*` bez max-length — wielomegabajtowy payload przechodzi do Resend/CRM; `/api/quote` dodatkowo wyśle dowolny tekst atakującego na dowolny adres (spam-relay hamowany tylko przez Turnstile + 5/h).
Poprawka: twarde limity (name 200, email 320, message 5000, configSummary 2000, utm 200) + walidacja `service` względem znanych slugów w quote.

**3. [TREŚĆ] Stare ceny i nazwy pakietów w draftach portfolio** — `src/data/portfolio.ts:366-632` (4 ukryte case studies, noindex ale dostępne z linku).
Stare nazwy ESSENTIAL/PRO BRANDING, „1–10 osób — 150 zł" bez zasady od 4 os. i progresji, brak pakietu 4h 1600 zł, brak min. zamówienia produktowego.
Poprawka: usunąć sekcje cen z draftów albo czytać ceny z `services.tsx` (jedno źródło).

**4. [TREŚĆ] llms.txt rozjechany z ofertą** — `public/llms.txt:18-19`.
Mobilne studio w biurze: podane „300–800 zł" (to ceny studia ZEWNĘTRZNEGO; poprawnie: 450 zł). Brak: „od 4 osób", zasady progresji progów, min. zamówienia 500 zł/6 zdjęć. Progi „30+"/„50+" → powinno być „od 31"/„od 51". (Portrety 1000/1300/1800, EVENT PREMIUM 4500, Monthly 4900 — są poprawne.)
Poprawka: wyrównać do `Pricing.tsx`/`services.tsx`.

**5. [UX] Telefon schowany, choć to główny kanał** — dane GA4: phone_click 5 vs form_start 2 (14 dni).
Desktop: w navbarze tylko ikona 32px bez numeru (`Navigation.tsx:124-133`). Mobile: menu hamburgera bez pozycji tel:, FAB z telefonem dopiero po 600px scrolla.
Poprawka (3 ruchy): numer tekstem obok ikony na `lg:`; pozycja „Zadzwoń: 514 900 688" w mobilnym menu; na `/kontakt` telefon zrównany stylistycznie z e-mailem (dziś e-mail = primary gradient). Do tego mikrokopia „pon–pt 9–17, oddzwaniam".

**6. [POMIAR] `phone_click`/`email_click` bez lokalizacji** — `ContactClickTracker.tsx:26`.
Nie wiadomo, skąd dzwonią (navbar/FAB/stopka/kontakt) — a to jedyny kanał z realnym wolumenem.
Poprawka: dołączyć param `location` (z `data-cta` lub najbliższej sekcji).

## P2 — warto zrobić w drugiej kolejności

**7. [SEO][DECYZJA MARCINA — JSON-LD, stop-condition §10.3] Self-serving reviews w markupie** — `src/app/layout.tsx:156-219`.
`aggregateRating` (5.0/10) + 8 pełnych opinii Google w JSON-LD własnej firmy. Wytyczne Google (review snippets): opinie w markupie nie mogą pochodzić od samej firmy — gwiazdek w SERP i tak nie będzie, jest małe ale realne ryzyko flagi. Drobiazgi przy okazji: `reviewCount: "10"` przy 8 obiektach; cytat Mai Formalik ma 3 różne wersje (layout vs Testimonials vs services).
Rekomendacja: usunąć `aggregateRating`+`review[]` z JSON-LD, opinie zostawić w widocznej treści. **Wymaga Twojej zgody.**

**8. [SEO] FAQPage JSON-LD ≠ widoczne FAQ na home** — `page.tsx:25-134` vs `FAQ.tsx` — 6 odpowiedzi w markupie skróconych (brak m.in. „+50%" przy ekspresie). Poprawka: generować JSON-LD z tej samej tablicy co UI (wzorzec z `/uslugi/[slug]` — tam jest 1:1).

**9. [TECH] Lightbox `/galeria` omija next/image** — `GalleryView.tsx:288` surowy `<img>` (oryginały do 830 KB); `PortfolioGallery.tsx:161` robi to poprawnie. Ujednolicić.

**10. [TECH] OG drona 1.47 MB** — `public/images/og/uslugi/zdjecia-wideo-z-drona.png` (pozostałe OG 26–49 KB). Przegenerować `scripts/generate-og-uslugi.py`.

**11. [TECH] Źródła portfolio 2 MB+** — 17 plików >1 MB (yes-butcher ×7 po ~2 MB, artech, idcom). Serwowane przez next/image (użytkownik dostaje zoptymalizowane), ale: wolniejsza pierwsza transformacja + zjadanie limitu transformacji planu Hobby. Przeskalować źródła do ~2000 px dłuższego boku.

**12. [UX] Kalkulator** — `PricingCalculator.tsx:246-479`: inputy clampują tylko min (wpisanie 999 ujęć przechodzi) → dołożyć `Math.min(max,…)`; labele bez `htmlFor`/`id` (czytniki ekranu czytają „edit text"); `QuoteEmailCapture.tsx:107-126`: pole e-mail bez `aria-label`, błąd bez `id`+`aria-describedby`.

**13. [TECH] Turnstile fail-open przy braku klucza** — `src/lib/turnstile.ts:11-14`: literówka w env na Vercelu = zero CAPTCHA bez alarmu. Zostawić fail-open na błędy sieci, ale przy braku klucza w produkcji logować głośno (albo fail-closed — do decyzji).

**14. [BIZNES][DECYZJA MARCINA — stop-condition §10.7] Dodatkowa godzina: 350 zł (pakiety foto+wideo+dron) vs 400 zł (sam reportaż foto)** — `services.tsx:133` vs `Pricing.tsx`/`services.tsx` (eventy). Godzina bogatszego pakietu jest tańsza niż samego foto — potwierdź, czy to zamierzone; home nie pokazuje „dodatkowa godzina 350 zł" przy kartach EVENT (podstrona tak).

## P3 — kosmetyka / higiena (jeden brief zbiorczy)

- `CTA.tsx:78`: honeypot wysyłany na sztywno `""` bez ukrytego pola (PoradnikForm/Quote mają) — dodać pole.
- `PortfolioGallery.tsx`: framer-motion bez `MotionConfig reducedMotion="user"` (kalkulator ma).
- `not-found.tsx:34-48`: „Kontakt" → `/#kontakt` zamiast `/kontakt`; brak linków do `/uslugi` i `/portfolio`.
- Title >60 zn. na hubach: portfolio (70), poradnik (70), polityka (68), galeria (67), blog (64), uslugi (63).
- Meta `/kalkulator` obiecuje „Precyzyjna wycena… bez ukrytych kosztów" vs UI „szacunkowa" — złagodzić.
- Martwe komponenty: `Equipment.tsx`, `GaleriaTeaser.tsx` (0 importów) — usunąć.
- CSP: `https://*.youtube.com` w script-src zbędne (facade używa tylko iframe/frame-src); opcjonalnie przejście na youtube-nocookie.
- `NEXT_PUBLIC_ANALYTICS_URL` (layout.tsx:356) — jeśli ktoś ustawi, CSP zablokuje skrypt; usunąć martwy blok lub dodać komentarz.
- `public/.DS_Store` (×4), `public/Logo_MS.jpg` (0 referencji) — usunąć; `.DS_Store` do `.gitignore` (za zgodą — §11.4… .gitignore wymaga zgody).
- Stale docs: `DEPLOY_NOW.md`, `VERCEL_CHECKLIST.md` (env bez TURNSTILE/UPSTASH/CRM, sitemap na starej domenie) — zarchiwizować do docs/ lub zaktualizować.
- Fallbacki FROM niespójne między route'ami (kosmetyka stringów).
- Język: „z mobilnym studio" → „studiem" (`FAQ.tsx:43`, `services.tsx:308`); setup „20 min" (services ×3) vs „30 minut" (`blog.ts:322,788`).
- Pomiar: brak `faq_open` (mapa obiekcji za darmo) i `portfolio_click` (które case study ciągnie) — 2 najcenniejsze braki po `location`.

## Sprawdzone i OK (bez uwag)

Redirecty host-based ze starej domeny; cache headers; sitemap.ts (12 route'ów, drafty wykluczone); `.env.local.example` kompletny; manifest+ikony; honeypot/rate-limity/escapowanie w API; brak logowania sekretów; canonicale, OG (url+images), twitter cards na dynamicznych; BreadcrumbList wszędzie; Service+Offer na usługach; priceRange spójny; 1×h1/stronę, hierarchia nagłówków; alt-y opisowe; wszystkie kwoty w blogu = kanon; kalkulator = cennik (progi, min. 500 zł, od 4 os.); wszystkie CTA `#kontakt`/`#cennik` mają cel na swojej stronie; formularze: pełne stany błędów/sukcesu, autocomplete/inputmode/aria; focus-visible, skip-link, reduced-motion (CSS+Parallax+CountUp+kalkulator), focus trap, kontrast steel-light zgodny z zasadą; dark mode spójny; poprawki z 2026-06-26 potwierdzone w kodzie; zero śladów starych cen (850/4000/rabat).

## Proponowana kolejność wdrożenia (briefy)

1. **Brief AUD-1 (quick wins, ~1 h):** robots.txt (#1) + limity API (#2) + llms.txt (#4) + drafty portfolio (#3).
2. **Brief AUD-2 (telefon + pomiar):** #5 + #6 (+ ew. faq_open/portfolio_click z P3).
3. **Brief AUD-3 (media):** OG drona (#10) + lightbox galerii (#9) + przeskalowanie źródeł (#11).
4. **Brief AUD-4 (po Twoich decyzjach):** JSON-LD reviews (#7) + FAQPage sync (#8) + godzina 350/400 (#14).
5. **Brief AUD-5 (kosmetyka):** cały P3 jednym podejściem.

Decyzje potrzebne od Ciebie przed AUD-4: (a) usunąć aggregateRating/review z JSON-LD? (b) dodatkowa godzina pakietów hybrydowych — 350 zł zostaje czy wyrównać do 400 zł? (c) Turnstile przy braku klucza: głośny log czy fail-closed?
