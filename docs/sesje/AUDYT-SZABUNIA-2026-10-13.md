# Audyt SZABUNIA — 13 października 2026 (re-audyt pełny, moduły A–E)

**Zakres:** kod i bezpieczeństwo, wydajność, UX formularza, SEO techniczne, pomiar i Google Ads, treść i prawo.
**Okno czasowe:** 24.09–13.10.2026 (od ostatniego commita do dziś).
**Metoda:** repo na HEAD `11a3f5c` (drzewo czyste poza 7 nieśledzonymi raportami w `docs/sesje/`); produkcja potwierdzona
w Vercel jako ten sam commit (`dpl_Ai5rUJgp5mdzLwXjq33vA2cNrVw8`, READY, 24.09.2026). Crawl 42 URL z sitemapy (curl, HTML z SSR),
Lighthouse 13.5.0 na produkcji (Chrome headless, `--throttling-method=devtools`, 9 stron × mobile/desktop × 2 przebiegi,
ta sama metoda co 23.09), odczyt konta Google Ads przez Supermetrics, błędy runtime Vercela (7 dni), `npm audit`,
skrypty `sprawdz_spojnosc.mjs` i `sprawdz_tekst.py`, wyszukiwanie w Gmailu (tylko odczyt).
**Wykluczone:** pełny przegląd wizualny 12 stron × 5 szerokości (kod `src/` nie zmienił się od przeglądu z 24.09, sekcja M
poprzedniego raportu; patrz §9), GSC, GA4, GBP (brak dostępu).
**Plan źródłowy:** `PLAN-AUDYT-SZABUNIA-2026-10-13.md`
**Punkt odniesienia:** `AUDYT-SZABUNIA-2026-09-23.md` (z sekcjami M, N z 24.09) i `AUDYT-CZESCIOWY-SEO-TECH-2026-09-23.md`.

> Dokument diagnostyczny. Żadne zmiany w kodzie, panelach ani treści nie zostały wykonane w ramach audytu.
> Poprawki wykonane później tego samego dnia na polecenie Marcina: `POPRAWKI-WDROZONE-2026-10-13.md` (statusy w rejestrze na końcu).

---

## 0. TL;DR

Od 24.09 w kodzie strony nie zmieniło się nic, a produkcja to dokładnie ten sam commit. Strona jest w dobrej kondycji
technicznej: 42/42 URL zwraca 200 z poprawnym canonical i jednym H1, Lighthouse dostępność, SEO i best practices 100
na 34/34 przebiegach, CLS 0. **Poprawki wydajności z 23.09 zadziałały na produkcji:** `/galeria`, `/kontakt` i case studies
zeszły z 4,2–6,0 s do 1,6–2,0 s LCP na telefonie (§1.2). Zmieniło się otoczenie i to ono niesie dziś najważniejsze ustalenia: **ochrona formularza przed
spamem (rate-limit Upstash) nie działa od co najmniej 19 dni** i nikt tego nie naprawił po stronie panelu,
**Next.js ma od tego czasu krytyczne poprawki bezpieczeństwa**, których strona nie ma, a **repo z dokumentacją
biznesową i danymi kontaktowymi klientów nadal jest publiczne**. Kampania Ads działa (5 zł/dzień), ale wszystkie
42 słowa kluczowe i 4 sitelinki prowadzą na stronę główną, a konwersje widzi tylko od osób, które kliknęły „Akceptuję”.

| Obszar | Stan 13.10 | Zmiana vs 23–24.09 |
|---|---|---|
| Parytet produkcja = `main` | ✅ `11a3f5c` | ➖ |
| Lint / tsc | ✅ 0 / 0 | ➖ |
| Zależności | ❌ `next` 16.2.10: 1 krytyczna, 4 wysokie (npm audit) | ⚠️ nowe advisories |
| Formularz: rate-limit | ❌ Upstash nie odpowiada, fail-open | ➖ (kod naprawiony 24.09, panel nie) |
| Formularz na telefonie (FORM-01) | ✅ mieści się w karcie przy 375 px | ✅ zweryfikowany live |
| Wydajność (Lighthouse mobile) | ✅ 7/9 stron LCP 1,6–2,0 s; Woohoo 3,2 s, `/poradnik` 4,4 s | ✅ `/galeria`, `/kontakt`, case studies z 4,2–6,0 s do 1,6–2,0 s |
| SEO techniczne | ✅ 42/42, 0 duplikatów | ➖ |
| Ads | ⚠️ działa; wszystkie słowa → strona główna | ➖ (nowe: stan sprawdzony) |
| Repo publiczne (L6) | ❌ nadal publiczne | ➖ |

**Wniosek nadrzędny:** zanim cokolwiek zmieni się w treści i wyglądzie, trzeba zamknąć trzy sprawy poza kodem
(Upstash, aktualizacja Next.js, widoczność repo). Każda zajmuje poniżej godziny, a dwie z trzech robi się w panelu.
**Jedna decyzja do podjęcia teraz:** repo `Szaba9119/szabunia-website` prywatne czy publiczne (§12, pytanie 1).

---

## 1. Pomiary

### 1.1 Crawl 42 URL z sitemapy (13.10.2026, curl, HTML SSR)

- 42/42: HTTP 200, canonical na siebie, `index, follow`, dokładnie jeden `<h1>`, JSON-LD parsuje się 4/4 (polityka 3/3).
- Title 31–63 znaki, description 114–157 znaków, **0 duplikatów** title i description.
- 0 obrazów bez `alt` (wszystkie `<img>` w HTML).
- JSON-LD: `ProfessionalService`, `Person`, `WebSite` na każdej stronie; `BreadcrumbList` 40, `FAQPage` 31, `BlogPosting` 26,
  `VideoObject` 2, `ContactPage` 1, `ImageGallery` 1. **Brak `aggregateRating` i `review`.**
- `og:locale` i `og:site_name`: tylko strona główna (1/42), bez zmian od 14.09.
- Title > 60 znaków: `/uslugi/wizerunek-portrety` (63, świadomie, decyzja z 14.09) i
  `/blog/jak-przygotowac-sie-do-sesji-biznesowej` (63).

### 1.2 Lighthouse produkcji

13.10.2026, Lighthouse 13.5.0, Chrome headless, `--throttling-method=devtools`, mobile domyślny / desktop `--preset=desktop`,
2 przebiegi na kombinację (34 z 36 udanych; nie powiodły się `home` desktop #1 i `woohoo` desktop #2).
Porównywalny z 23.09 jest przede wszystkim **render delay elementu LCP** (mierzy mechanizm, nie sieć).

| Strona | Perf mobile | LCP mobile | Render delay mobile | LCP 23.09 (prod) | Desktop perf / LCP | A11y / SEO / BP |
|---|---|---|---|---|---|---|
| `/` | 93, 98 | 2,5 / 1,7 s | 2 381 / 1 652 ms | 1,8 s | 100 / 0,3 s | 100 / 100 / 100 |
| `/uslugi/eventy-reportaze` | 99, 99 | 1,9 / 1,8 s | 1 834 / 1 641 ms | 1,8 s | 100 / 0,2–0,5 s | 100 / 100 / 100 |
| `/uslugi/fotografia-produktowa` | 99, 99 | 1,7 / 1,7 s | 1 566 / 1 586 ms | 1,7 s | 100 / 0,2–0,4 s | 100 / 100 / 100 |
| `/galeria` | 92, 98 | 2,0 / 1,8 s | 1 944 / 1 687 ms | **5,3–6,0 s** (RD 5 955) | 100 / 0,4–0,5 s | 100 / 100 / 100 |
| `/kontakt` | 99, 99 | 1,6 / 1,6 s | 1 462 / 1 461 ms | **4,2 s** (RD 4 121) | 100 / 0,2 s | 100 / 100 / 100 |
| case Artech | 99, 99 | 1,9 / 1,9 s | 14 / 21 ms | **5,0 s** | 100 / 0,2–0,3 s | 100 / 100 / 100 |
| case IDcom | 99, 99 | 1,6 / 1,6 s | 1 531 / 1 557 ms | **4,8 s** (RD 4 698) | 100 / 0,2–0,3 s | 100 / 100 / 100 |
| case Woohoo | 92, 92 | **3,2 / 3,2 s** | 5 / 8 ms | 5,45 s | 100 / 0,2 s | 100 / 100 / 100 |
| `/poradnik` | 83, 83 | **4,4 / 4,4 s** | 1 164 / 1 017 ms | 4,4 s | 99–100 / 0,4–0,9 s | 100 / 100 / 100 |

CLS 0,000 we wszystkich 34 przebiegach (najwyżej 0,006 na `/poradnik` desktop).

**Co zadziałało (pętla zwrotna z 23.09):** wzorzec `hero-intro` (PERF-01) potwierdzony na produkcji. Render delay elementu
LCP spadł na `/galeria` z 5 955 do 1 687–1 944 ms, na `/kontakt` z 4 121 do 1 461 ms, na case IDcom z 4 698 do
1 531–1 557 ms. LCP tych stron jest dziś w przedziale 1,6–2,0 s, tak jak strona główna i usługi.
**Co nie zadziałało do końca:** case Woohoo (SZA2610-10) i `/poradnik` (PERF-03, bez zmian).

---

## 2. Sprawdzone i OK

- **Parytet:** produkcja = `main` = HEAD = `11a3f5c` (Vercel, deployment READY 24.09.2026). Drzewo robocze bez zmian w kodzie.
- **Lint 0/0, `tsc --noEmit` 0 błędów** (13.10.2026).
- **Nagłówki live:** CSP, HSTS `max-age=63072000; includeSubDomains; preload`, `X-Frame-Options: SAMEORIGIN`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP, CORP.
- **Trasy API:** sprawdzenie originu (`origin.ts`), honeypot, limity długości pól, lista kodów usług, zgoda RODO walidowana
  na serwerze, escapowanie HTML w mailu. Live: `POST /api/contact` bez tokenu → 400 (Turnstile fail-closed), nie 503.
  `/api/gallery-editor` → 403, `/galeria/edytor` → 404.
- **Redirecty live:** `/o-mnie` → 308 → `/#o-mnie`; `/kalkulator` → 308 → `/kontakt`; stara domena i stare slugi usług
  w jednym kroku; nieistniejący adres → 404.
- **Formularz na telefonie (FORM-01) zweryfikowany live** przy 375 px: pola kończą się na x=309, karta na x=359,
  brak poziomego przewijania strony.
- **Baner cookies:** „Odrzuć” i „Akceptuję” obok siebie, ten sam rozmiar; jest „Ustawienia cookies”.
- **Brak JS (TECH-01):** `.reveal` ukrywa treść tylko pod `html.js` (`globals.css:195-204`); live `<html class="… js js-ready">`.
- **Długość strony głównej przy 375 px:** 12 968 px = 16,0 ekranu (próg alarmowy metodyki: 20).
- **Spójność cen:** `sprawdz_spojnosc.mjs` — 0 błędów, 0 kwot spoza kanonu, 0 brakujących powierzchni.
- **Zasady tekstów:** `sprawdz_tekst.py src` — 0 błędów, 9 „do sprawdzenia” (miasto po przecinku w altach galerii,
  dwa „profesjonalne” w `portfolio.ts`), te same co 24.09.
- **`llms.txt`:** identyczny z repo, bez kwot, telefon i e-mail zgodne z JSON-LD.
- **Reklama Ads vs strona:** „ponad 100 obsłużonych firm” i „ponad 1000 sesji i eventów” zgadzają się z `src/data/proof.ts:40-41`;
  „Wycena w ciągu 24 godzin”, „Dojazd w Poznaniu 0 zł”, numer `514 900 688` zgodne ze stroną.
- **Sitelink „Dokumentacja wydarzeń firmowych”** z zadania 24.09 już nie istnieje; obecne cztery sitelinki mają aktualne teksty.

---

## 3. Ustalenia — P0

Brak.

## 4. Ustalenia — P1

Brak potwierdzonych. Dwa ustalenia P2 niżej mają warunkowe P1 (SZA2610-01, SZA2610-05).

## 5. Ustalenia — P2 / P3 / P4

**SZA2610-01. [TECH] Next.js 16.2.10 z krytycznymi i wysokimi podatnościami** — `package.json`, `npm audit` 13.10.2026.
· P2 (P1, jeśli dotyczy optymalizatora obrazów na Vercelu) · S · 🧑 decyzja + 🤖 wykonanie · Z (npm audit) / H (wpływ na Vercel)
`npm audit --omit=dev`: 1 krytyczna (`next`), 4 wysokie przechodnie (`postcss`, `sharp`, `nanoid`, `source-map-js`), 1 średnia.
Dla `next` 17 advisories, poprawione w 16.2.11–16.3.8; dostępne jest 16.4.0 (ta sama gałąź główna).
Mechanizm i realne ryzyko: strona **nie używa** Server Actions, middleware/proxy, `next/og` ani `rewrites`
(sprawdzone grepem `src/`), więc większość advisories jej nie dotyczy. Otwarte zostają te dla Image Optimization
(w tym „RCE … when AVIF files are used”, a `next.config.ts:56` włącza AVIF). Na Vercelu `/_next/image` obsługuje
infrastruktura Vercela, nie wbudowany optymalizator Next, więc ekspozycja jest prawdopodobnie mała, ale tego nie
weryfikowałem.
Poprawka: `next` i `eslint-config-next` → 16.4.0, potem lint, tsc, build, smoke test. To zmiana wersji istniejącej
paczki, nie nowa paczka, ale dotyka `package.json`, więc czeka na zgodę (CLAUDE.md §2).

**SZA2610-02. [TECH] Rate-limit formularzy nie działa od co najmniej 24.09** — Vercel runtime errors, 13.10.2026.
· P2 · S · 🧑 · Z (panel Vercel, 7 dni)
Grupa błędów `[ALERT] contact: rate-limit niedostępny, żądanie przepuszczone (fail-open): timeout 1500 ms`,
pierwsze wystąpienie 24.09 13:40 UTC, ostatnie **13.10 09:08 UTC**. Kod działa zgodnie z poprawką `c8a45b3`
(`src/lib/ratelimit.ts:54-75`): przy braku odpowiedzi Upstash formularz przechodzi. Skutki:
(1) limit 8 prób/h/IP na kontakt i 5/h na poradnik jest wyłączony, zostają origin, honeypot i Turnstile;
(2) **każde zgłoszenie czeka 1,5 s** na timeout, zanim pójdzie dalej (`Promise.race`, w.62-67).
Zadanie z 24.09 („panel Upstash: baza uśpiona/usunięta? token?”) jest otwarte.
Warianty w §12, pytanie 3.

**SZA2610-03. [PRAWO] Repo publiczne z danymi osobowymi osób trzecich** — GitHub API 13.10.2026 (`"visibility": "public"`).
· P2 · S · 🧑 · Z (live + git)
To pozycja L6 z 23.09, nadal otwarta. Repo zawiera 533 śledzone pliki, w tym 130 w `docs/`. Konkretnie:
imię, nazwisko i e-mail osoby kontaktowej Box17 oraz IDcom (`docs/sesje/PLAN-SEO-LEADY-2026-07-06.md:321-322`)
i e-mail redakcji (w.191). Do tego pełne analizy Ads, strategia SEO i decyzje cenowe w `CLAUDE.md` §9.
Mechanizm: dane osobowe klientów są publicznie dostępne bez podstawy prawnej; strategia jest do wglądu konkurencji.
Poprawka: zmiana widoczności na prywatną (Settings → General → Danger Zone). Vercel wdraża z prywatnego repo
także na planie Hobby. Samo przejście na prywatne nie usuwa kopii, które ktoś mógł już pobrać.

**SZA2610-04. [POMIAR] Zdarzenia konwersji wysyłane wyłącznie po „Akceptuję”** — `src/lib/gtag.ts:15-17`.
· P2 · M · 🧑 decyzja · Z (kod)
`gtagEvent` kończy się na `if (!hasAnalyticsConsent()) return;`. `contact_submit`, `phone_click` i `email_click`
od osoby, która kliknęła „Odrzuć” albo zignorowała baner, **nie trafiają do GA4 w żadnej postaci**, także jako
ping bez cookies trybu Consent Mode. Te trzy zdarzenia są importowane do Ads jako konwersje
(działania `7644204683`, `7670127748`, `7670127751`, odczyt 13.10). Do tego `utm.ts` zapisuje `gclid` dopiero po zgodzie
(ustalenie z 20.09, `pomiar-ads-gclid-luka`).
Skutek dziś: kampania ma strategię „Maksymalizacja kliknięć” (`TARGET_SPEND`, limit CPC 7 zł), więc konwersje nie
sterują stawkami, tylko raportem. Raport Ads systematycznie zaniża skuteczność i nie da się na nim oceniać kampanii.
Skutek przy przejściu na smart bidding: algorytm uczyłby się na ułamku leadów.
To świadoma decyzja z 12.09 (`RAPORT-WDROZENIA-MASTER-2026-09-12.md:70`), więc nie defekt, tylko koszt pomiarowy,
o którym trzeba wiedzieć. Warianty w §12, pytanie 4.

~~**SZA2610-05. [ADS] Wszystkie słowa i sitelinki prowadzą na stronę główną**~~ **WYCOFANE tego samego dnia:** landing tylko na stronę główną i sitelinki-kotwice to decyzje z briefu Marcina (W-01, W-02 w `marketing/google-ads/redteam-review.md`), których przy pisaniu nie sprawdziłem. Korekta: `AUDYT-ADS-2026-10-13.md` §5. Treść poniżej zostaje jako historia.

 — Google Ads 786-864-4697, odczyt 13.10.2026.
· P2 (P1 przy zwiększeniu budżetu) · S · 🧑 (panel) · Z (panel)
Kampania „Search | Poznań | Fotografia B2B | 5 zł” (ENABLED od 20.09, 5 zł/dzień, tylko wyszukiwarka, 25 km od Poznania,
472 wykluczenia) ma **jedną grupę reklam z jedną reklamą RSA**, adres docelowy `https://szabunia.pl`.
Z 42 słów: 15 dotyczy nieruchomości, wnętrz i przemysłu („fotograf nieruchomości poznań”, „fotografia przemysłowa”…),
12 eventów („fotograf na konferencję”, „reportaż eventowy poznań”…), 15 wizerunku i ogólnych.
Wszystkie lądują na stronie, której H1 brzmi „Fotograf biznesowy w Poznaniu. Zdjęcia i film.”, a podstrony
`/uslugi/nieruchomosci-przemysl` i `/uslugi/eventy-reportaze` istnieją i mają dopasowane H1 i case studies.
Sitelinki to kotwice strony głównej (`/#uslugi`, `/#kontakt`, `/#o-mnie`, `/#portfolio`), czyli ta sama strona
w czterech wariantach. Mechanizm: niższe dopasowanie strony docelowej obniża Quality Score i podnosi CPC;
klient z frazą „fotograf przemysłowy” musi sam znaleźć właściwą usługę.
Bez danych wydajnościowych (§9) nie da się podać, ile to kosztuje. Poprawka: osobne grupy (eventy / obiekty / wizerunek)
z adresami podstron usług, sitelinki na podstrony zamiast kotwic. Zgodne z `marketing/google-ads/strategy.md`
(2 grupy, 3 reklamy), od którego kampania odstąpiła 20.09.

**SZA2610-06. [PRAWO] YouTube nieopisany w polityce prywatności, miniatury ładują się bez zgody** — `src/components/YouTubeFacade.tsx:55-69`,
`ServiceVideoGrid.tsx:81-91`, `polityka-prywatnosci/page.tsx` (0 wystąpień „YouTube”). · P3 · S · 🤖 + 🧑 · Z (kod + HTML live)
Miniatury filmów idą prosto z `i.ytimg.com` (`unoptimized`, live na `/uslugi/eventy-reportaze`), więc przeglądarka
wysyła IP do Google przy samym wejściu na stronę. Po kliknięciu odtwarzacz ładuje się z `www.youtube.com/embed`
(z cookies), nie z `youtube-nocookie.com`. Polityka opisuje Google Analytics i Ads, nie YouTube.
Poprawka: akapit o YouTube w polityce (treść: Marcin) i odtwarzacz z `youtube-nocookie.com`
(wymaga zmiany CSP w `next.config.ts`, stop-condition §10.2). Miniatury można serwować z własnego serwera.

**SZA2610-07. [DOKUMENTACJA] Instrukcje dla agentów rozjechane ze stanem faktycznym** — `CLAUDE.md`, `AGENTS.md`.
· P3 · S · 🧑 (zmiany w tych plikach wymagają zgody) · Z (kod + live)
1. `CLAUDE.md` §9: „Kwoty cennika żyją wyłącznie w `public/llms.txt`”. Nieprawda od 12.09: `llms.txt` ma przy każdej
   usłudze „wycena indywidualna po ustaleniu zakresu” (live i repo identyczne). Ten sam błąd w drugim akapicie
   („Siatka cen na powierzchni publicznej jest dziś tylko w `public/llms.txt`”).
2. `CLAUDE.md` §9: „Ostatni pełny: `AUDYT-PELNY-2026-07-29.md`”. Od tego czasu były pełne audyty 05.08, 12.09 i 23.09.
3. `AGENTS.md` (instrukcja Codexa) różni się od `CLAUDE.md` w czterech miejscach: `/kalkulator` „301”, brak akapitu
   o depricingu z 14.08, **„kolejność kart NADAL ma portrety pierwsze”** zamiast decyzji „eventy pierwsze” z 22.09,
   brak decyzji o title strony głównej. Codex pracujący na tym pliku może cofnąć decyzje Marcina.
Poprawka: zsynchronizować `AGENTS.md` z `CLAUDE.md` (najprościej generować jeden z drugiego) i poprawić dwa zdania w §9.

**SZA2610-08. [TECH] Wewnętrzne notatki w HTML każdej strony** — `src/app/layout.tsx:143-185`.
· P4 · S · 🤖 · Z (HTML live)
Komentarze `/* … */` wewnątrz inline skryptów (gtag, ruch wewnętrzny) trafiają do HTML: ok. 1,5 KB, dwukrotnie
(skrypt + payload RSC), na każdej z 42 stron. Zawierają m.in. opis przełącznika `?internal=1` i dane
„czerwcowe 49 sesji z Instagrama”. Ryzyko małe (przy publicznym repo i tak jawne), koszt bajtowy ~1% HTML.
Poprawka: przenieść komentarze poza literał skryptu (do komentarza JSX nad nim).

**SZA2610-09. [UX] Pola formularza na telefonie mają 243 px przy ekranie 375 px** — live 13.10, `CTA.tsx`.
· P4 · S · 🤖 · Z (live) / O (ocena)
Dwie zagnieżdżone karty z `p-6` (zewnętrzna `rounded-[20px]` 343 px, wewnętrzna `rounded-2xl p-6` 293 px) zostawiają
na pola 65% szerokości ekranu. Formularz działa i mieści się w karcie. Ocena, że to za ciasno, jest opinią;
zysk z poszerzenia do ~295 px (`p-4` w karcie wewnętrznej na mobile) to wygoda wpisywania, nie naprawa błędu.

**SZA2610-10. [PERF] Case Woohoo: LCP mobile 3,2 s** — Lighthouse 13.10, 2/2 przebiegi. · P3 · S · 🤖 (+ 🧑 przy wariancie B) · Z (pomiar)
Poprawa z 5,45 s (23.09), ale nadal powyżej progu 2,5 s; to jedyna strona z wymienionych w PERF-01/02, która go nie
schodzi. Element LCP to plakat filmu z `i.ytimg.com` (`maxresdefault.webp`, 59 KB). Render delay 5–8 ms, czyli
`priority` działa; całe opóźnienie to pobranie: opóźnienie startu 564 ms i **pobieranie 2 531 ms** z obcego hosta
(osobne połączenie TLS, równolegle z `gtag.js` 185 KB i fontami). Case Artech z tym samym komponentem ma 1,9 s
(pobieranie 1 204 ms), więc różnicę robi sam plik i kolejność pobrań.
Poprawka: A. plakat jako plik lokalny w `public/images/portfolio/woohoo/` przez `next/image` (bez zmian w konfiguracji;
masz już klatki z oryginału 4K); B. `i.ytimg.com` w `images.remotePatterns` (zmiana `next.config.ts`, stop-condition).
Rekomendacja A, przy okazji zamyka część SZA2610-06 dla tej strony.

### Status ustaleń z 23–24.09

| ID | Ustalenie | P | Status 13.10 | Dowód |
|---|---|---|---|---|
| FORM-01 | Formularz ucięty na telefonie | P1 | **zweryfikowany ✅** | live 375 px, §2 |
| PERF-01 | LCP w `.reveal` na podstronach | P1 | **zweryfikowany ✅** (`/galeria`, `/kontakt`, IDcom: LCP 1,6–2,0 s) | Lighthouse 13.10, §1.2 |
| PERF-02 | Plakat YouTube jako LCP | P2 | Artech ✅ 1,9 s; **Woohoo częściowo** 5,45 → 3,2 s → SZA2610-10 | Lighthouse 13.10, §1.2 |
| PERF-03 | `/poradnik`: Turnstile od wejścia | P3 | **bez zmian ➖**: LCP mobile 4,4 s, strona 1,4 MB, z czego Turnstile ~770 KB | Lighthouse 13.10 |
| TECH-01 | Treść niewidoczna bez JS | P2 | **zweryfikowany ✅** (kod + klasa `js` live) | §2 |
| TECH-02 | Wstecz w lightboxie | P2 | wdrożony, live nieprzetestowany | §9 |
| TECH-03 | Martwy kod | P3 | **bez zmian ➖**: `useMediaQuery`, `replacedHomeFaqs2209`, `blogCategories`, `getPillar`; do tego nieosiągalna gałąź 503 w `api/contact/route.ts:37-43` (`checkLimit` nie rzuca od `c8a45b3`) | grep 13.10 |
| SEO-01 | Dwa wpisy o tej samej intencji | P2 | bez zmian ➖ (czeka na GSC) | — |
| SEO-02 | Case bez wideo: `Service` z nazwą klienta | P3 | **bez zmian ➖** (IDcom: `Service` „IDcom: headshoty zespołu”) | HTML live |
| SEO-03 | JSON-LD galerii | P3 | myślnik zamknięty (L5), reszta nieweryfikowana | — |
| SEO-04 | `lastmod` w sitemapie | P3 | częściowo: 15 URL na 23.09, ale zmiany z 24.09 (home, Woohoo, eventy) mają 23.09 | sitemap live |
| SEO-05 | „Fotograf biznesowy Poznań” w H1 home i title wizerunku | P3 | czeka na pomiar ~20.10 | — |
| L6 | Repo publiczne | — | **bez zmian ➖** → SZA2610-03 | GitHub API |
| L7 | Eksport GSC przed zmianą title/H1 | — | bez zmian ➖ | — |
| N/P0 | Formularze 503 przy awarii Upstash | P0 | **kod zweryfikowany ✅, przyczyna w panelu otwarta ❌** → SZA2610-02 | Vercel |
| N | Sitelink „Dokumentacja wydarzeń firmowych” | — | **zamknięty ✅** | Ads 13.10 |
| 14.09 | `og:locale` / `og:site_name` | P3 | bez zmian ➖ (1/42) | crawl |
| 14.09 | `/galeria` bez cache CDN | P3 | bez zmian ➖ (`no-store`, `MISS`) | nagłówki live |
| 14.09 | `http://www` i `http://` starej domeny: 2 przekierowania | P4 | bez zmian ➖ | curl |
| 14.09 | PDF poradnika dostępny bez formularza | P3 | bez zmian ➖ (200, tylko `Disallow` w robots) | curl |

---

## 6. Hipotezy do sprawdzenia (H)

- **H1. Gdzie trafiają powiadomienia formularza.** W Gmailu `marcin.szabunia@gmail.com` nie ma ani jednego maila
  „Nowe zapytanie ze strony” / „Nowe zgłoszenie z formularza” od 01.06.2026 (także w koszu). Kod domyślnie wysyła na
  ten adres (`CLAUDE.md` §8), więc na produkcji `CONTACT_TO_EMAIL` wskazuje najpewniej Workspace `marcin@szabunia.pl`,
  niewidoczny dla konektora. Do tego 13.10 o 09:08 UTC (11:08 w Polsce) ktoś wysłał formularz kontaktowy
  (wpis rate-limit z tej godziny). **Krok:** Marcin sprawdza, czy ma w skrzynce zgłoszenie z 13.10 ok. 11:08.
  Jeśli nie ma, to albo bot zatrzymany przez Turnstile, albo zgubiony lead; rozstrzyga panel Resend (Logs).
- **H2. Optymalizator obrazów na Vercelu a advisories Next.js** (SZA2610-01). Krok: sprawdzić w advisory
  GHSA-2xp9-vwfh-vxw4, czy Vercel-hosted jest wyłączony z zakresu; w praktyce szybciej zaktualizować.
- **H3. Działanie konwersji „Wyświetlenie strony (generate_lead)”** w Ads ma kategorię PAGE_VIEW, a `generate_lead`
  wysyła wyłącznie formularz poradnika (`PoradnikForm.tsx:70`). Jeśli jest ustawione jako główne, Ads liczy pobranie PDF
  jak lead. Krok: Ads → Cele → Konwersje, kolumna „Działanie główne/dodatkowe”.

## 7. Obserwacje bez akcji

- W ostatnich 7 dniach do `/api/contact` trafiło jedno żądanie, które przeszło sprawdzenie originu (jedyny wpis w grupie
  błędów rate-limit), a do `/api/lead` żadne. To dolna granica ruchu formularzy, nie liczba leadów.
- H1 strony głównej („Fotograf biznesowy w Poznaniu. Zdjęcia i film.”) ma na ekranie 11 px i szary kolor, a wizualnym
  nagłówkiem jest `h2` „Wydarzenia. Ludzie. Obiekty. Produkty.”. Świadome od 30.07 (`CLAUDE.md` §9 pkt 3), bez zmian.
- `void pushToCrm(...)` w trasach API to wywołanie bez czekania; na Vercelu funkcja może zostać zamrożona po odpowiedzi.
  Dziś bez skutku, bo zmienne CRM nie są ustawione. Pozycja jest już w backlogu z 12.09 („CRM: trwałość zapisu”).

## 8. Świadomie NIE ruszamy

- Box17 w drafcie (decyzja 04.08). Title i H1 money pages (czekają na GSC, SEO-05). Kolejność „eventy pierwsze”.
- Brak kwot na stronie (decyzja 14.08). Kotwice nie wracają do `llms.txt` (12.09).
- Bramkowanie zdarzeń zgodą (SZA2610-04) do decyzji Marcina, nie do „naprawy”.
- Marki w pasku logotypów, w tym IQOS: temat prawny opisany w pamięci projektu 19.08
  (wyroby tytoniowe, ustawa z 09.11.1995). Na stronie IQOS występuje tekstowo (`proof.ts:7`, `About.tsx:111`, JSON-LD,
  `llms.txt`). Nie jest to nowe ustalenie tego audytu, ale pozostaje nierozstrzygnięte.

## 9. Czego NIE sprawdzono

| Obszar | Powód | Czego potrzeba |
|---|---|---|
| Wydajność kampanii Ads (koszt, kliknięcia, konwersje od 20.09) | Supermetrics: `TRIAL_EXPIRED` od 03.06.2026 | eksport CSV z panelu Ads albo płatny Supermetrics |
| GSC (zapytania, indeksacja, SEO-01, SEO-05) | brak połączenia z sesją | eksport GSC 28 dni (Skuteczność → Zapytania i Strony) |
| GA4 (zdarzenia, źródła) | brak dostępu | odczyt panelu albo eksport |
| GBP i NAP w katalogach | brak dostępu | odczyt wizytówki |
| Zmienne środowiskowe Vercela | MCP: 403 na liście zmiennych | Marcin: Vercel → Settings → Environment Variables (czy `CONTACT_TO_EMAIL`, `UPSTASH_*` są aktualne) |
| Logi wysyłki formularza | Vercel Hobby trzyma logi 1 h | panel Resend → Logs |
| Pełny przegląd wizualny (12 stron × 5 szerokości) | kod bez zmian od przeglądu 24.09; panel przeglądarki w tej sesji był ukryty (`visibilityState: hidden`), więc zrzuty i przewijanie dawały niewiarygodny obraz (anty-wzorzec z metodyki §11) | powtórzyć przy widocznym oknie po najbliższej zmianie UI |
| TECH-02 (Wstecz w lightboxie) live | jw. | jw. |
| Tryb ciemny | jw. | jw. |
| Wysyłka formularza end-to-end | brak zgody na testowy lead | test przez Marcina albo zgoda na jedno zgłoszenie testowe |
| Rich Results Test | nie uruchamiano | search.google.com/test/rich-results dla 3 typów stron |

## 10. Pozorne problemy skorygowane w trakcie audytu

- **„Siedem nieużywanych komponentów”** (`CountUp`, `Parallax`, `ServiceGalleryLightbox`, `ServiceVideoGrid`, `ThemeToggle`,
  `TrustStats`, `TurnstileWidget`). Pierwszy grep szukał tylko importów `@/components/X`; wszystkie siedem są importowane
  ścieżką względną `./X`. Fałszywy pozytyw, nie trafił do ustaleń.
- **„Długie myślniki na każdej stronie”** (4 na stronę w HTML). To komentarze w inline skryptach, nie treść widoczna
  dla użytkownika (stąd SZA2610-08 jako higiena, nie naruszenie `zasady-tekstow.md`).
- **Pierwszy pomiar długości strony (23 788 px)** był zrobiony w ukrytym panelu z `innerWidth = 0`. Odrzucony;
  ważny jest pomiar przy emulacji 375 px (12 968 px).

## 11. Plan działania

### Kolejność wdrożenia (zależności, nie ważność)

1. **(P2, 🧑, S)** Repo na prywatne (SZA2610-03) → GitHub Settings → zero ryzyka dla wdrożeń.
2. **(P2, 🧑, S)** Panel Upstash: przywrócić bazę albo utworzyć nową i podmienić `UPSTASH_REDIS_REST_URL/TOKEN` w Vercel
   (SZA2610-02) → kryterium: w ciągu 24 h po zmianie brak nowych wpisów `[ALERT] … rate-limit` przy zgłoszeniu.
   Przy okazji: sprawdzić H1 (zgłoszenie z 13.10) w Resend.
3. **(P2, 🤖 po zgodzie, S)** `next` + `eslint-config-next` → 16.4.0 (SZA2610-01) → `npm audit` bez krytycznych,
   lint, tsc, build, smoke 5 stron. Osobny commit.
4. **(P2, 🧑, S)** Ads: grupy reklam per usługa z adresami podstron, sitelinki na podstrony (SZA2610-05).
   Najpierw eksport danych od 20.09, żeby mieć punkt odniesienia.
5. **(P3, 🧑 + 🤖, S)** `AGENTS.md` = `CLAUDE.md`, dwa zdania w §9 (SZA2610-07).
6. **(P3, 🧑 treść + 🤖, S)** YouTube: polityka + `youtube-nocookie.com` (SZA2610-06, zmiana CSP).
7. **(P3, 🤖, S)** Plakat Woohoo jako plik lokalny (SZA2610-10).
8. **(P4, 🤖, S)** Paczka porządkowa: TECH-03 + gałąź 503 w `api/contact`, komentarze z inline skryptów (SZA2610-08),
   `og:locale`/`og:site_name`, `lastmod` 24.09.
9. **Decyzja (SZA2610-04)** przed jakąkolwiek zmianą strategii stawek w Ads.

### Szybkie wygrane (< 1 h)
Kroki 1, 2, 3, 5, 7 i 8.

### Data kontrolna
Re-audyt **ok. 27.10.2026** (po pomiarze SEO-05 ~20.10): `npm audit` bez krytycznych; brak alertów rate-limit
w 7 dniach; repo prywatne; Lighthouse tych samych 9 stron tą samą metodą (render delay LCP mobile); wydajność Ads
od 20.09 z eksportu (koszt, kliknięcia, `contact_submit`, połączenia z rozszerzenia); GSC 28 dni po 23.09 dla strony
głównej i `/uslugi/wizerunek-portrety`.

## 12. Decyzje potrzebne od Marcina

1. **Repo `Szaba9119/szabunia-website`:** A. prywatne (rekomendacja: 1 kliknięcie, wdrożenia działają bez zmian);
   B. zostaje publiczne, ale `docs/` i `marketing/` wychodzą z repo do katalogu poza gitem (dane zostają w historii,
   więc to nie usuwa danych klientów); C. nic. Rekomendacja **A**.
2. **Aktualizacja Next.js do 16.4.0** (SZA2610-01): zgoda tak/nie. To zmiana wersji istniejącej paczki w `package.json`.
3. **Rate-limit (SZA2610-02):**
   A. naprawić Upstash (baza, token) i zostawić kod bez zmian; odwracalne, darmowy plan wystarcza.
   B. zrezygnować z Upstash: usunąć zmienne i `ratelimit.ts`, zostają origin, honeypot, Turnstile; znika też 1,5 s
   opóźnienia; odwracalne commitem.
   C. nic: limit dalej wyłączony, każde zgłoszenie czeka 1,5 s.
   Rekomendacja **A**, bo ochrona już jest napisana i przetestowana; B jest rozsądne, jeśli Upstash ma zniknąć z listy kont.
4. **Konwersje tylko po zgodzie (SZA2610-04):**
   A. zostaje jak jest; raport Ads traktować jako dolną granicę, leady liczyć ze skrzynki (pole „Strona wysyłki” i UTM w mailu);
   B. zdarzenia konwersji wysyłane także bez zgody jako pingi bez cookies (Consent Mode „advanced”); wymaga oceny prawnej
   i aktualizacji polityki;
   C. konwersja z rozszerzenia połączeń jako główna w Ads (liczy się po stronie Google, poza banerem).
   Rekomendacja **A + C** do czasu, aż kampania będzie miała ~30 konwersji i padnie pytanie o smart bidding.
5. **Ads (SZA2610-05):** czy rozbić kampanię na grupy per usługa z podstronami jako adresami docelowymi. Tak/nie.

---

## Rejestr ustaleń

| ID | Ustalenie | P | Owner | Status | Dokument |
|---|---|---|---|---|---|
| SZA2610-01 | Next.js 16.2.10 z krytycznymi podatnościami | P2 (P1 warunk.) | 🧑/🤖 | wdrożony lokalnie, niezdeployowany (POPRAWKI-WDROZONE-2026-10-13) | ten raport |
| SZA2610-02 | Rate-limit nie działa od ≥24.09 (Upstash) | P2 | 🧑 | otwarty | ten raport |
| SZA2610-03 | Repo publiczne z danymi klientów (= L6) | P2 | 🧑 | otwarty | ten raport |
| SZA2610-04 | Konwersje tylko po zgodzie | P2 | 🧑 | wariant A (bez zmian w kodzie); C w panelu Ads: otwarty | ten raport |
| SZA2610-05 | Ads: wszystko na stronę główną | — | 🧑 | **wycofany** 13.10: sprzeczny z briefem Marcina (landing tylko strona główna); korekta w `AUDYT-ADS-2026-10-13.md` §5 | ten raport |
| SZA2610-06 | YouTube poza polityką, miniatury bez zgody | P3 | 🤖/🧑 | wdrożony lokalnie, niezdeployowany (POPRAWKI-WDROZONE-2026-10-13); treść polityki do akceptacji | ten raport |
| SZA2610-07 | Dryf `CLAUDE.md` / `AGENTS.md` | P3 | 🧑 | wdrożony lokalnie, niezdeployowany (POPRAWKI-WDROZONE-2026-10-13) | ten raport |
| SZA2610-08 | Notatki w inline skryptach | P4 | 🤖 | wdrożony lokalnie, niezdeployowany (POPRAWKI-WDROZONE-2026-10-13) | ten raport |
| SZA2610-09 | Pola formularza 243 px na telefonie | P4 | 🤖 | otwarty (opinia) | ten raport |
| SZA2610-10 | Case Woohoo: LCP mobile 3,2 s | P3 | 🤖 | wdrożony lokalnie, niezdeployowany (POPRAWKI-WDROZONE-2026-10-13); lokalnie pobieranie plakatu 2 531 → 910 ms | ten raport |
| PERF-01 | LCP w `.reveal` | P1 | 🤖 | zweryfikowany ✅ | AUDYT-CZESCIOWY-SEO-TECH-2026-09-23 |
| PERF-02 | Plakat YouTube jako LCP | P2 | 🤖 | częściowo (Woohoo → SZA2610-10) | AUDYT-CZESCIOWY-SEO-TECH-2026-09-23 |
| PERF-03 | `/poradnik` LCP 4,4 s | P3 | 🤖 | otwarty ➖ | AUDYT-CZESCIOWY-SEO-TECH-2026-09-23 |
| FORM-01 | Formularz ucięty na telefonie | P1 | 🤖 | zweryfikowany ✅ | AUDYT-SZABUNIA-2026-09-23 |
| TECH-01 | Treść bez JS | P2 | 🤖 | zweryfikowany ✅ | AUDYT-SZABUNIA-2026-09-23 |
| TECH-03 | Martwy kod | P3 | 🤖 | wdrożony lokalnie, niezdeployowany (POPRAWKI-WDROZONE-2026-10-13) (bez `replacedHomeFaqs2209`) | AUDYT-CZESCIOWY-SEO-TECH-2026-09-23 |
| SEO-02 | JSON-LD case bez wideo | P3 | 🧑 | otwarty ➖ | AUDYT-CZESCIOWY-SEO-TECH-2026-09-23 |
| SEO-04 | `lastmod` | P3 | 🤖 | wdrożony lokalnie, niezdeployowany (POPRAWKI-WDROZONE-2026-10-13) | AUDYT-CZESCIOWY-SEO-TECH-2026-09-23 |
| SEO (14.09) | `og:locale` / `og:site_name` 1/42 | P3 | 🤖 | wdrożony lokalnie, niezdeployowany (POPRAWKI-WDROZONE-2026-10-13) | AUDYT-SEO-2026-09-14 |

---
*Audyt wykonał: Claude Code (Opus 5.5), 13.10.2026. Dane: repo `11a3f5c`, produkcja szabunia.pl 13.10.2026,
Vercel (deploymenty, błędy 7 dni), Google Ads (struktura, odczyt 13.10), Lighthouse 13.5.0, Gmail (odczyt).
Nie wprowadza zmian.*
