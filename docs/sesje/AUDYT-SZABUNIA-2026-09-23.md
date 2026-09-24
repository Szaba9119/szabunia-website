# Audyt szabunia.pl i wdrożenie poprawek, 23.09.2026

Sesja „Szabunia.pl audyt i wdrożenie”. Kolejność: VERIFY → AUDIT → PRIORITIZE → IMPLEMENT → TEST → REVIEW → COMMIT-READY.

**Stan wyjściowy (zweryfikowany):** lokalny `main` = `origin/main` = produkcja Vercel = `5709bb9` (deployment READY, 08:37 CEST). Push do `main` wdraża produkcję automatycznie, więc **nie było pusha ani deployu**. Pięć nieśledzonych raportów w `docs/sesje/` potwierdzonych i nietkniętych.

**Równoległa sesja.** W tym samym czasie na tym samym katalogu pracowała sesja „Audyt i orkiestracja szabunia.pl”. Uznała moje zmiany w `CTA.tsx`, `TurnstileWidget.tsx` i `kontakt/page.tsx` za samowolę swojego audytora i cofnęła je do HEAD, zapisując patch `formularz-mobile-ucinanie-2026-09-23-NIEZASTOSOWANY.diff`. To była praca tej sesji, wykonana w ramach briefu z wdrożeniem. Patch nałożyłem ponownie (`git apply`, identyczna treść) i tym razem przetestowałem. Tamta sesja potwierdziła, że jest zatrzymana i nie rusza `src/`. Jej raport `AUDYT-CZESCIOWY-SEO-TECH-2026-09-23.md` wykorzystałem: PERF-01, PERF-02, TECH-02 i SEO-04 są wdrożone niżej, reszta trafiła do sekcji J i L.

---

## A. Executive summary

1. **P1, naprawione: formularz kontaktowy był ucięty na telefonach.** Po załadowaniu Cloudflare Turnstile (sztywne 300 px) kolumna siatki w `CTA.tsx` rozpychała się do 350 px przy 278 px miejsca, a `overflow-hidden` karty obcinał prawą krawędź pól, widgetu i przycisku „Wyślij zapytanie”. Dotyczyło strony głównej, czterech usług, `/kontakt` i `/portfolio` przy 360–430 px, czyli większości telefonów. Produkcja: przy 390 px formularz sięgał do x=382, karta kończyła się na x=358.
2. **P1, naprawione: wolny pierwszy ekran na telefonie.** `/galeria` LCP 5,3–6,0 s, case Artech 5,0 s, case IDcom 4,8 s, `/kontakt` 4,2 s (Lighthouse mobile, devtools throttling, dwa przebiegi). Element LCP siedział w `.reveal` (`opacity: 0` do hydratacji) albo był plakatem YouTube z `loading="lazy"`. Strona główna i usługi, gdzie ten wzorzec naprawiono wcześniej, mają 1,7–1,8 s.
3. **P2, naprawione: Wstecz w podglądzie zdjęć wyprowadzał ze strony** na podstronach usług i w case studies (na `/galeria` działało od 22.09). Na telefonie to wyjście z lejka.
4. **P2, naprawione: `/kontakt` powtarzał „24 godziny” sześć razy na 760 słów.** Trzy karty pod formularzem mówiły to samo, co tekst tuż nad nimi.
5. **P2, naprawione: akapit „O mnie” na stronie głównej powtarzał listę marek** z paska logotypów (wszystkie pięć nazw). Wyróżnienie Portret 2022 zostało.
6. **P2, naprawione: `/portfolio` na desktopie miał układ 3 + 1** (czwarty kafel sam, dwa puste pola). Teraz 2×2.
7. **Dobra wiadomość: indeksacja, dostępność i CLS są w porządku.** 42/42 URL z sitemapy: 200, canonical na siebie, jeden H1, brak duplikatów title/description. Lighthouse dostępność 100 i CLS 0 na 12/12 przebiegach (6 stron × mobile/desktop).
8. **Galeria działa zgodnie z decyzją z 22.09:** domyślnie Eventy, `?kat=` w historii, Wstecz/Dalej, link bezpośredni i odświeżenie działają, canonical `?kat=` → `/galeria`.
9. **Do decyzji Marcina (sekcja L):** okładka Woohoo (panorama ratusza jako dowód eventu), krok „Selekcja” w procesie na stronie głównej (opis portretowy przy stronie „eventy pierwsze”), odporność na brak JS (`layout.tsx`), dwa długie myślniki w JSON-LD, `szabunia.pl/o-mnie` = 404.
10. **Bez danych GSC nie ruszałem title/H1 ani strategii SEO.** Supermetrics nieaktywny od 03.06, GSC niepodłączone do sesji.

## B. Co już jest dobre (nie psuć)

- **Hero strony głównej**: w 3–5 s wiadomo, co i dla kogo. Kolaż czterech usług, CTA nad zgięciem na każdej szerokości, linia zaufania pod CTA.
- **Kolejność „eventy pierwsze”** konsekwentna: karty usług, kolaż, galeria, portfolio, FAQ.
- **Pasek logotypów pod hero** na każdej stronie i dopasowany do usługi (`service.proof`).
- **Podstrony usług po przebudowie 22.09**: jedna sekcja procesu, blok autora bez powtórzeń, cross-sell portretów na evencie. Nie ruszałem.
- **Blok Synteza (75-lecie) na nieruchomościach**: ten sam komponent i to samo miejsce co blok „Publikacja: Forte × BFG” na eventach, więc nie wygląda na doklejony. Jedyna uwaga: „Synteza” stoi jako logo tuż nad nim (opinia, P3).
- **Galeria mobile**: siatka 3 kolumny, lightbox z gestami, Wstecz, fokus po zamknięciu. Działa jak Instagram, czyli tak, jak zakładał brief.
- **Linkowanie wewnętrzne**: każdy wpis blogowy linkuje do usługi i (poza trzema dronowymi) do case study; każde case study do swojej usługi; każda usługa do swojego case study.
- **Technika**: `next/image` z AVIF/WebP, Turnstile ładowany dopiero przy formularzu (d4e75ce), CSP restrykcyjna, redirecty 308 starej domeny i starych slugów bez łańcuchów, `/galeria/edytor` = 404 i API edytora = 403 na produkcji.
- **Pływający przycisk na telefonie** (`MobileFAB`): „Zapytaj o ofertę” widoczne po 200 px przewinięcia na każdej stronie.

## C. Problemy P0/P1/P2/P3

| Priorytet | Typ | URL | Problem | Wpływ | Decyzja |
|---|---|---|---|---|---|
| P1 | BUG | `/`, 4× `/uslugi/*`, `/kontakt`, `/portfolio` @ 360–430 px | Formularz ucięty po prawej po załadowaniu Turnstile (kolumna `auto` rośnie do min-content 350 px) | Miejsce konwersji wygląda na zepsute | **Wdrożone** (`CTA.tsx`, `TurnstileWidget.tsx`) |
| P1 | BUG | `/kontakt` @ mobile | Podwójny padding (`main px-4` + sekcja `px-4`), karta 311 zamiast 343 px | Węższy formularz niż gdzie indziej | **Wdrożone** (`-mx-4`) |
| P1 | PERFORMANCE | `/galeria`, `/kontakt`, case studies (zmierzone); `/poradnik`, `/portfolio`, `/blog` (ten sam wzorzec, zmiana zapobiegawcza) | Element LCP w `.reveal` (opacity 0 do hydratacji) | LCP 4,2–6,0 s na telefonie | **Wdrożone** (`hero-intro`) |
| P2 | PERFORMANCE | `/portfolio/woohoo-autopay`, `/portfolio/artech-…` | Plakat YouTube = LCP, `loading="lazy"`, JPEG | LCP 5,0–5,5 s | **Wdrożone** (`priority`, WebP) |
| P2 | UX | 4× `/uslugi/*`, case studies | Wstecz w podglądzie zdjęcia wychodzi ze strony | Wyjście z lejka na telefonie | **Wdrożone** |
| P2 | CONTENT | `/kontakt` | Trzy karty pod formularzem powtarzają tekst nad nim; „24 godziny” 6× | Szum, dłuższa strona | **Wdrożone** (karty usunięte, jedno zdanie skrócone) |
| P2 | CONTENT | `/` | „O mnie”: lista pięciu marek = to samo co pasek logotypów | Powtórzenie | **Wdrożone** (zdanie zdjęte, wyróżnienie zostaje) |
| P2 | VISUAL | `/portfolio` @ ≥1024 px | 4 kafle w 3 kolumnach: rząd 3 + 1 | Wygląda na niedokończone | **Wdrożone** (2×2) |
| P2 | PERFORMANCE | 4× `/uslugi/*` @ desktop | Miniatura „Przykładowa realizacja” 382 px, `sizes` 300 px | Nieostra miniatura | **Wdrożone** |
| P2 | VISUAL | `/`, `/portfolio`, `/uslugi/eventy-reportaze` | Okładka case Woohoo to panorama ratusza z drona; realizacja eventowa bez obrazu eventu | Najważniejsza usługa ma najsłabszą okładkę | **Decyzja Marcina** (L1) |
| P2 | CONTENT | `/` | Proces, krok 3 „Selekcja: galeria online, zaznaczasz ujęcia do retuszu” opisuje sesję portretową, a strona prowadzi eventami | Klient eventowy dostaje niepasujący opis | **Decyzja Marcina** (L2) |
| P2 | A11Y/TECH | wszystkie strony z `.reveal` | Bez JS albo przy błędzie hydratacji sekcje pod zgięciem są niewidoczne (TECH-01) | Pusta strona przy awarii JS | **Decyzja Marcina** (L3, zmiana w `layout.tsx`) |
| P3 | SEO | `szabunia.pl/o-mnie` | 404; przekierowanie `/o-mnie` → `/#o-mnie` istnieje tylko dla starej domeny | Ktoś wpisujący adres z przyzwyczajenia trafia na 404 | **Decyzja** (L4, `next.config.ts`) |
| P3 | SEO/CONTENT | `/kontakt`, `/portfolio` | Długi myślnik w `name` JSON-LD („Kontakt — Marcin Szabunia”, „Portfolio — realizacje…”) | Łamie `zasady-tekstow.md` w.61-63 | **Decyzja** (L5, JSON-LD) |
| P3 | SEO | `sitemap.xml` | `lastmod` 14.09 mimo zmian 22–23.09 | Słabszy sygnał świeżości | **Wdrożone** |
| P3 | PERFORMANCE | plakaty YouTube (usługi, case studies, galeria) | JPEG maxres 60–150 KB | Waga strony | **Wdrożone** (WebP, 18–60 KB) |
| P3 | UX | 3× `/uslugi/*` @ 390 px | CTA hero na 1 000–1 056 px (pod zgięciem), bo hero ma lead + długi akapit + kwadratowe zdjęcie | Dłuższa droga do CTA | **Zostawione** (FAB widoczny od 200 px) |
| P3 | VISUAL | `/` @ mobile | „Masz podobny projekt? Zapytaj o ofertę →”: strzałka spadała sama do drugiej linii | Kosmetyka | **Wdrożone** (`whitespace-nowrap`) |
| P3 | OPINION | `/` | Ta sama osoba (IDcom) w kolażu hero i na kafelku portfolio | Powtórzenie twarzy | Zostawione |
| P3 | OPINION | `/uslugi/fotografia-produktowa` | Drugi kafel galerii (pędzelek) to cienki przedmiot na dużym białym polu, na telefonie czyta się jak pusty kafel | Słabszy wrażeniowo packshot | Zostawione (kuracja z 22.09) |

## D. Visual audit (desktop + mobile)

Zrzuty całych stron: `/`, `/uslugi`, 4 usługi, `/portfolio`, `/galeria`, `/kontakt` w 1440, 1280, 1024, 768, 430 i 390 px (54 pełne strony produkcji), plus po zmianach 1440 i 390 lokalnie. Poziome przewijanie: brak na wszystkich 54. CLS w pełnym przewinięciu: 0–0,075 (najwyżej 390 px, wszędzie poniżej progu 0,1).

**Desktop.** Hierarchia czytelna: hasło, kolaż, pasek marek, karty usług. Rytm sekcji równy, kontenery zgodne z `DESIGN.md` (6xl na głównej, 5xl na podstronach). Jedyny wyraźny błąd układu to `/portfolio` 3 + 1 (naprawione).

**Mobile.** Hero strony głównej i eventów mieści CTA w pierwszym ekranie (702–734 px). Pozostałe trzy usługi mają CTA hero na 1 000–1 056 px; kompensuje to FAB. Formularz był ucięty na ≤430 px (naprawione). `/kontakt` po zmianach: 4 946 → 4 485 px.

**Typografia.** Bez przypadkowych łamań H1 (`text-balance`). Długości linii w akapitach 45–60 znaków.

## E. CRO / UX

| Strona | Klient i problem | Dowody | Tarcie przed wysłaniem |
|---|---|---|---|
| `/` | HR/marketing szukający wykonawcy na event, potem na zdjęcia zespołu | 9 marek, 4 case studies, 3 opinie Google, 2 publikacje, liczby | formularz ucięty na telefonie (naprawione) |
| `/uslugi/eventy-reportaze` | event manager z datą w kalendarzu | Woohoo, Forte/BFG, opinia Woohoo, ~30 zdjęć/h, 14/21 dni | okładka Woohoo nie pokazuje eventu (L1) |
| `/uslugi/wizerunek-portrety` | HR, sesja zespołu | IDcom, 6 portretów, mobilne studio 30 min | CTA hero pod zgięciem na telefonie |
| `/uslugi/nieruchomosci-przemysl` | deweloper, zakład | Synteza, Artech, Yes Butcher, dron + wnętrza | CTA hero pod zgięciem |
| `/uslugi/fotografia-produktowa` | e-commerce | Artech, packshoty, wideo produktowe | CTA hero pod zgięciem |
| `/kontakt` | zdecydowany klient | telefon pierwszy (GA4), formularz zaraz pod | powtórzenia 24 h (naprawione) |

CTA jest w hero, po usługach, po portfolio, w FAB i w formularzu na dole. Nie dodawałem nowych CTA, popupów ani kalkulatora. Poradnik został.

## F. Portfolio / zdjęcia

- **Cztery case studies wystarczają do pokrycia czterech usług** (Woohoo = eventy, IDcom = wizerunek, Yes Butcher = obiekty/gastronomia, Artech = produkty i przemysł). Nie tworzyłem nowych. Box17 w drafcie zgodnie z decyzją z 04.08.
- **Najsłabszy cover: Woohoo** (panorama ratusza). Case nie ma zdjęć, same klatki filmu; w repo są klatki z wywiadów (`reel-1.jpg`, `reel-2.jpg`), ale z napisami. Propozycja w L1.
- **Galeria eventów** otwiera się zdjęciem grupowym na torze i sceną gali, czyli najmocniejszymi kadrami. Zdjęcia Forte/MTP/BeThink usunięte 23.09 rano, nie wracały.
- **Produktowa**: pierwsze dwa kafle to packshoty na białym tle (reprezentacja packshotów jest), alty unikalne (0 duplikatów na wszystkich 42 stronach, sprawdzone w HTML produkcji).
- Źródła galerii mają 1 500–2 000 px na dłuższym boku, lightbox 90 % jakości.

## G. SEO

- 42/42 URL: 200, canonical na siebie, `index, follow`, jeden H1, title 31–63 znaki, description 114–157 znaków.
- JSON-LD składniowo poprawny (ProfessionalService, Service, FAQPage, BreadcrumbList, BlogPosting, VideoObject, ImageGallery).
- Redirecty: `www`, `http`, stara domena z mapą tematyczną, 5 starych slugów usług, `/kalkulator`, `/sesje-prywatne`: wszystkie 308 w jednym kroku.
- `robots.txt`: `/api/` i PDF poradnika zablokowane, sitemap wskazana.
- **Title i H1 bez zmian.** Brief wymaga danych query → page z GSC; tej sesji nie są dostępne. Title wizerunku („Fotograf biznesowy Poznań…”) zostaje zgodnie z decyzją z 14.09 i danymi GSC opisanymi w pamięci projektu.
- `lastmod` w sitemapie podniesiony do 23.09 (zmiany treści 22–23.09).

## H. Technika / performance / accessibility

**Lighthouse produkcja (przed), mobile z realnym dławieniem / desktop:**

| Strona | Mobile perf | LCP mobile | Desktop perf | A11y | SEO |
|---|---|---|---|---|---|
| `/` | 98 | 1,8 s | – | 100 | 100 |
| `/uslugi/eventy-reportaze` | 98 | 1,8 s | 100 | 100 | 100 |
| `/uslugi/fotografia-produktowa` | 99 | 1,7 s | 100 | 100 | 100 |
| `/galeria` | 79 | **5,3 s** | 100 | 100 | 100 |
| `/kontakt` | 84 | **4,2 s** | 96 | 100 | 100 |
| `/portfolio/artech-…` | 80 | **5,0 s** | 97 | 100 | 100 |

Porównanie przed/po: sekcja K.

- Konsola: w zwykłej przeglądarce 0 błędów. Headless Chrome zgłasza przerwane żądania `w=32` (podmiana placeholdera) — identyczne przed i po, bez wpływu.
- Formularz: etykiety, `aria-invalid`, walidacja e-mail, honeypot, Turnstile fail-closed z alternatywą mailto.
- Cele dotykowe: jedyny element < 24 px to link „polityką prywatności” w treści zgody (wyjątek WCAG 2.5.8 dla linków w tekście).

## I. Co wdrożono

Pięć pakietów, każdy sprawdzony osobno.

**Pakiet 1: formularz na telefonie**
| Plik | Zmiana | Powód | Efekt |
|---|---|---|---|
| `src/components/CTA.tsx` | `grid-cols-1 md:grid-cols-2` | kolumna `auto` rosła do min-content widgetu | kolumna nie wychodzi poza kartę |
| `src/components/TurnstileWidget.tsx` | `size: compact`, gdy kontener < 300 px | widget ma sztywne 300 px | 360/390/430 px: widget 150×140, desktop: normalny |
| `src/app/kontakt/page.tsx` | `-mx-4` wokół `CTA` | podwójny padding | karta 343 px przy 375 px |

Test z kluczem testowym Cloudflare: formularz mieści się w karcie przy 360, 375, 390, 430 i 1280 px na `/`, `/kontakt` i `/uslugi/eventy-reportaze`; przycisk odblokowuje się po weryfikacji.

**Pakiet 2: wydajność pierwszego ekranu (PERF-01, PERF-02)**
| Plik | Zmiana |
|---|---|
| `src/app/{kontakt,galeria,poradnik,portfolio,blog}/page.tsx` | pierwszy blok `AnimatedSection` → `div.hero-intro` (wzorzec z hero strony głównej i usług) |
| `src/components/PortfolioHero.tsx` | okruszki, tekst i zdjęcie hero case study → `hero-intro` |
| `src/components/PortfolioVideoShowcase.tsx` | okruszki, nagłówek i film → `hero-intro`, plakat z `priority` |
| `src/components/YouTubeFacade.tsx` | prop `priority`, plakat WebP (`vi_webp`), zapas: JPEG `hqdefault` |
| `src/components/ServiceVideoGrid.tsx` | plakaty WebP, ten sam zapas |

Wszystkie 10 filmów ze strony ma wersję `maxresdefault.webp` (sprawdzone, 18–60 KB zamiast 60–150 KB). Host `i.ytimg.com` był już w CSP.

**Pakiet 3: podgląd zdjęć (TECH-02)**
| Plik | Zmiana |
|---|---|
| `src/components/ServiceGalleryLightbox.tsx` | `pushState` przy otwarciu, `history.back()` przy zamknięciu, `popstate` zamyka, blokada podwójnego zamknięcia |
| `src/components/PortfolioGallery.tsx` | to samo |

Test (390 px): otwarcie → Wstecz zamyka podgląd i zostaje na stronie; ✕ i Escape zamykają bez zmiany adresu; następny Wstecz wraca na poprzednią stronę. Usługa i case IDcom.

**Pakiet 4: treść i układ**
| Plik | Zmiana |
|---|---|
| `src/components/About.tsx` | zdjęte zdanie z listą pięciu marek (są w pasku logotypów); zostaje „Otrzymałem wyróżnienie w ogólnopolskim konkursie Portret 2022.” |
| `src/app/kontakt/page.tsx` | usunięte trzy karty informacyjne i stała `contactCards`; „Nie wiesz, czego potrzebujesz?” bez powtórzonego zdania o 24 h |
| `src/app/portfolio/page.tsx` | siatka 2×2 na każdej szerokości, `sizes` dopasowane |
| `src/components/Portfolio.tsx` | `whitespace-nowrap` na „Zapytaj o ofertę →” |
| `src/app/uslugi/[slug]/page.tsx` | `sizes` miniatury realizacji 300 → 384 px |

| `src/components/Testimonials.tsx` | `aria-label` karuzeli opinii bez długiego myślnika („Opinie klientów. Przewiń, aby przeczytać kolejne”) |

`sprawdz_tekst.py` na zmienionych plikach: 0 nowych błędów. Na całym `src/` zostało 5 wcześniejszych: 4 w `name` JSON-LD (L5) i 1 w `title` lokalnego edytora galerii (strona 404 na produkcji).

**Pakiet 5: SEO i QA**
| Plik | Zmiana |
|---|---|
| `src/app/sitemap.ts` | `SITE_UPDATED` 14.09 → 23.09 |

## J. Co świadomie pozostawiono

- **Title, H1, description, JSON-LD, URL-e, architektura 4 usług** — bez danych GSC i bez zgody (CLAUDE.md §10, pkt 3).
- **CTA hero pod zgięciem na 3 usługach (telefon)** — skrócenie wymagałoby cięcia opisu albo zmiany kadru; FAB pokrywa potrzebę. Do ponownej oceny po danych o `data-cta`.
- **framer-motion** (tylko `PortfolioGallery`) — usunięcie to zmiana `package.json`, wymaga zgody.
- **Martwy kod (TECH-03)**, **og:locale / og:site_name**, **cache CDN `/galeria`**, **gtag 182 KB** — z raportów 14.09 i 23.09, bez wpływu na klienta; osobna paczka porządkowa.
- **Box17 w drafcie** — decyzja z 04.08.
- **Kotwice cenowe** — strona bez kwot od 14.08, bez zmian.
- **Dwa wpisy blogowe o tej samej intencji (SEO-01)** — decyzja po GSC per URL.

## K. Testy

| Test | Wynik |
|---|---|
| `npm run lint` | PASS, 0 błędów, 0 ostrzeżeń |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS |
| Formularz 360/375/390/430/1280 px z Turnstile (klucz testowy) | PASS |
| Lightbox: Wstecz, ✕, Escape (usługa + case study) | PASS |
| Galeria: domyślnie Eventy, `?kat=`, Wstecz/Dalej, link bezpośredni | PASS |
| Poziome przewijanie, 10 zrzutów po zmianach | brak |
| Konsola po zmianach (`/`, `/kontakt`, `/portfolio`, `/galeria`, case Artech) | 0 błędów |
| Tryb ciemny `/kontakt` 375 px | PASS |
| Linki wewnętrzne produkcji (42 strony) | 0 do 3xx/404 |
| Lighthouse przed/po | poniżej |

**Lighthouse przed/po (mobile, devtools throttling).** „Przed” = produkcja, „po” = lokalny `next build && next start`. Zgodnie z zasadą z pamięci projektu porównywalne jest tylko **opóźnienie renderu elementu LCP** (mierzy mechanizm, nie sieć). Wynik i LCP lokalnie są lepsze także przez brak sieci, więc nie czytać ich jako prognozy produkcji.

| Strona | Element LCP | Render delay przed | Render delay po | LCP przed (prod) | LCP po (lokalnie) |
|---|---|---|---|---|---|
| `/galeria` | akapit pod H1 | 5 955 ms | **1 662 ms** | 6,0 s | 1,7 s |
| `/kontakt` | akapit pod H1 | 4 121 ms | **1 526 ms** | 4,2 s | 1,5 s |
| case IDcom | opis realizacji | 4 698 ms | **1 606 ms** | 4,8 s | 1,6 s |
| case Artech | plakat filmu | 916 ms (+ opóźnienie startu pobierania 1 521 ms) | **31 ms** (+ 586 ms) | 5,0 s | 1,8 s |
| `/poradnik` | podgląd PDF (obraz) | 1 133 ms | 868 ms | 4,4 s | 4,5 s |

`/poradnik` się nie poprawił: tam LCP to obraz, a wąskim gardłem jest jego pobieranie i Turnstile ładowany od wejścia (formularz stoi u góry). Zostawione (PERF-03, P3). Prawdziwy efekt na produkcji zmierzyć po deployu tym samym poleceniem.

**Ścieżki klienta** (lokalnie, `next start`, 390 i 1440 px): Event (`/` → eventy → Woohoo → z powrotem do usługi), Portrety (wizerunek → IDcom → wizerunek), Produkt (produktowa → Artech → produktowa), Nieruchomości (nieruchomości → galeria kategorii). Na każdym kroku: strona 200, link do następnego kroku istnieje i zwraca 200, formularz jest na stronie, 3–5 wezwań „Zapytaj o…”, brak poziomego przewijania. Błędy konsoli lokalnie: wyłącznie brak `/_vercel/insights` i `/_vercel/speed-insights` (istnieją tylko na Vercelu). Formularza nie wysyłałem (bez zgody na testowy lead w skrzynce).

## L. Rekomendacje wymagające decyzji Marcina

> **Stan 24.09.2026:** L1–L5 rozstrzygnięte przez Marcina i wdrożone, szczegóły w sekcji M. Otwarte zostają L6 (repo publiczne) i L7 (eksport GSC).

1. **Okładka case Woohoo.** Dziś panorama ratusza z drona na stronie głównej, `/portfolio` i podstronie eventów. Propozycja: kadr z wywiadu na evencie (górna część `reel-1.jpg`, bez napisu) albo klatka z filmu z salą. Ryzyko: klatka wideo 720 px szerokości jest miękka na desktopie.
2. **Proces na stronie głównej, krok 3 „Selekcja”.** Opisuje wybór ujęć do retuszu, czyli sesję portretową. Przy evencie dostajesz ok. 30 gotowych zdjęć na godzinę bez selekcji po stronie klienta. Wariant: ogólny krok „Obróbka” albo zdanie o dwóch ścieżkach. Treść poda Marcin.
3. **Odporność na brak JS (TECH-01).** Klasa `js` na `<html>` w istniejącym skrypcie w `layout.tsx` i `.js .reveal { opacity: 0 }` w `globals.css`. Mała zmiana, ale w `layout.tsx`.
4. **`szabunia.pl/o-mnie` → `/#o-mnie`.** Jedna reguła w `next.config.ts` (dziś działa tylko dla starej domeny).
5. **JSON-LD:** długie myślniki w `name`: „Kontakt — Marcin Szabunia” (`kontakt/page.tsx:64`), „Usługi fotograficzne i wideo — Marcin Szabunia” (`uslugi/page.tsx:63`), „Galeria — Marcin Szabunia” (`galeria/page.tsx:220`), „Portfolio — realizacje Marcina Szabuni” (`portfolio/page.tsx:60`). Plus SEO-02/SEO-03 z raportu równoległej sesji. Proponuję przecinek zamiast myślnika, jedną zmianą.
6. **Repo `Szaba9119/szabunia-website` jest nadal publiczne** (sprawdzone 23.09). Ten raport nie zawiera kwot ani danych klientów.
7. **Eksport GSC query → page** (28 dni, po 23.09) przed jakąkolwiek zmianą title/H1 money pages.

---

## M. Final visual polish (24.09.2026)

Stan wyjściowy sprawdzony: `git status` bez zmian od raportu (18 plików, HEAD `5709bb9`), równoległa sesja bezczynna.

### Sekcja L: wdrożone decyzje

| # | Zmiana | Plik | Weryfikacja |
|---|---|---|---|
| L1 | Okładka Woohoo: klatka z filmu (uczestnik z identyfikatorem w kuluarach, tłum w tle) zamiast panoramy ratusza. Dotyczy strony głównej, `/portfolio` i „Przykładowej realizacji” na eventach | `public/images/portfolio/woohoo-networking-4x3.jpg` (nowy, 960×720), `portfolio.ts` (`tileImage`), `galleryAlts.ts` | kafel widoczny w 3 miejscach, alt z opisem kadru |
| L2 | Proces na stronie głównej, krok 3: „Obróbka: Wybieram najlepsze ujęcia, obrabiam materiał i przygotowuję go do publikacji.” | `Process.tsx` | render sprawdzony |
| L3 | `.reveal` ukrywa treść tylko pod `html.js`; klasę dopisuje istniejący skrypt motywu w `<head>`. Bezpiecznik: bez `js-ready` (dopisuje go `AnimatedSection`) po 4 s `js` znika. Reguła `prefers-reduced-motion` dostosowana do nowej specyficzności | `layout.tsx`, `globals.css`, `AnimatedSection.tsx` | patrz QA |
| L4 | `/o-mnie` → 308 → `/#o-mnie` | `next.config.ts` | patrz QA |
| L5 | Długi myślnik → przecinek w `name` JSON-LD: `/kontakt`, `/uslugi`, `/galeria`, `/portfolio`. Struktura i typy schema bez zmian | 4 pliki `page.tsx` | `sprawdz_tekst.py`: 0 błędów |

**L1, przejrzany materiał Woohoo:** plansza tytułowa 1280×720 (napis przez cały kadr), obecny cover ratusza 1000×749 (wycinek planszy, rozciągnięty, miękki), trzy klatki reelsów 720×1280 (napisy w dolnej połowie, 720 px szerokości), automatyczne klatki obu filmów z YouTube (`maxres1–3`, 1280×720). `maxres1` i `maxres3` mają belki z nazwiskiem i firmą. Wybrana `maxres2` z filmu `4INLtKcKcZk`: ostra twarz, bez napisów, identyfikator konferencyjny i tłum w tle, rozmyty pierwszy plan daje głębię. Kadr 4:3 960×720. Na `/portfolio` (kafel ~568 px) przy ekranie retina jest lekko miękki, ale ostrzejszy od poprzedniego. Nie generowałem niczego AI.
**Świadomy kompromis:** na `/uslugi/eventy-reportaze` ta sama osoba jest na plakacie filmu „Przykładowa realizacja wideo” (domyślna miniatura YouTube filmu `m42ywMWjthw`) i ~1,5 ekranu niżej na kafelku Woohoo. **Czego brakuje:** zdjęcia (nie klatki) z E-commerce All In albo innej miniatury filmu `m42ywMWjthw` ustawionej w YouTube Studio. Każde z nich usuwa powtórzenie bez zmian w kodzie (plik pod nową nazwą albo inna miniatura na YouTube).

### Przegląd wizualny

Obejrzane podczas przewijania (klatki co ~0,9 ekranu, nie pełne zrzuty): strona główna, 4 usługi, `/portfolio`, 4 case studies, `/galeria`, `/kontakt` przy 1440 i 390 px, a kluczowe strony także przy 1024, 768 i 430 px. Poziome przewijanie: brak w 60 kombinacjach (12 stron × 5 szerokości).

**Co jeszcze zmieniłem (P2):**

| Problem | Dowód | Zmiana | Plik |
|---|---|---|---|
| Długie akapity **wyśrodkowane** na telefonie | opis w hero: nieruchomości 9 linii, produktowa 9, wizerunek 10, case studies 11–12 | opis do lewej na telefonie; H1 i krótki lead zostają wyśrodkowane | `ServiceHero.tsx`, `PortfolioHero.tsx`, `PortfolioVideoShowcase.tsx` |
| Opinia klienta na usługach: 11–15 linii wyśrodkowanej kursywy na telefonie | pomiar 390 px | do lewej i `p-6` na telefonie, od `md` bez zmian | `uslugi/[slug]/page.tsx` |
| Formularz przy 768 px: e-mail i telefon obok siebie po 123 px, etykieta telefonu na 2 linie | pomiar 640–1280 px | jedna kolumna w zakresie 768–1023 px (pola 257 px); od 1024 px obok siebie (187 px) | `CTA.tsx` |
| Podpis galerii IDcom na wizerunku: 7 wyśrodkowanych linii, kontekst powtórzony z case study | pomiar 390 px | skrócony do faktów widocznych na zdjęciach | `services.tsx` |
| Podtytuł bloga obiecywał „kulisy realizacji i trendy” | 0 wpisów w kategorii „realizacja”, 0 o trendach (17 poradników, 9 „branża”) | „Poradniki dla firm: jak przygotować sesję, ile kosztuje realizacja i jak wybrać fotografa na event.” | `BlogPreview.tsx`, `blog/page.tsx` |
| Podtytuł opinii opisywał sekcję zamiast dowodu | wszystkie trzy opinie to opinie z wizytówki Google | „Opinie z wizytówki Google.” | `Testimonials.tsx` |
| Długi myślnik w tytule lokalnego edytora galerii | `sprawdz_tekst.py` | przecinek (strona i tak 404 na produkcji) | `galeria/edytor/page.tsx` |

**Czego celowo nie zmieniłem (P3 / OPINION) i dlaczego:**

- **Wszystkie nagłówki sekcji strony głównej mają 48 px** (10 sekcji), więc FAQ, blog i proces ważą tyle co usługi i realizacje. Zmniejszenie sekcji pomocniczych do ~36–40 px dałoby wyraźniejszą hierarchię, ale to decyzja o systemie typografii w 5 komponentach współdzielonych z `/galeria`. Rekomendacja, nie wdrożenie.
- **Dużo sekcji w schemacie „H2 + szary podtytuł + rząd kart w ramkach”** (usługi: Zakres realizacji, Jak powstaje wycena, FAQ; case studies: Klient/Wyzwanie/Rozwiązanie). To jest miejsce, w którym strona najbardziej przypomina szablon. Uproszczenie (mniej obrysów, tekst bez kart) to przeprojektowanie układu podstron przebudowanych 22.09 z Marcinem, nie polish.
- **„Wybrane realizacje” na stronie głównej przy 1440 px to 4 kafle po ~231 px**, mniejsze niż karty usług, choć case studies są najmocniejszym dowodem. Układ „cztery równe kafle” to decyzja z 13.09 (`2ba9f0b`).
- **Hero eventów na desktopie ma zdjęcie 3:2** (mniejsze niż kwadrat na pozostałych usługach), żeby nie ciąć zdjęcia grupowego. Świadome od 11.08.
- **CTA hero pod zgięciem na trzech usługach na telefonie** — bez zmian, patrz sekcja J.
- **Wiersz metadanych case study na telefonie** (Obszar / Materiał / Zastosowanie / Lokalizacja) łamie się nierówno przy wyśrodkowanym H1. Kosmetyka.

**Ocena ogólna.** Po tej rundzie strona nie ma już usterek, które klient B2B zauważyłby jako „coś jest nie tak”. Fotografia prowadzi na stronie głównej, w galerii i w case studies. To, co zostało „średnie”, jest strukturalne (hierarchia nagłówków, liczba kart z obrysem na podstronach usług) i wymaga decyzji projektowej, a nie kolejnych poprawek punktowych. Dalsze zmiany w tej sesji byłyby kwestią gustu, więc się zatrzymuję.

### QA końcowe (24.09.2026)

| Test | Wynik |
|---|---|
| `npm run lint` | PASS (exit 0) |
| `npx tsc --noEmit` | PASS (exit 0) |
| `npm run build` | PASS (exit 0) |
| `sprawdz_tekst.py src` | 0 błędów; 3 „do sprawdzenia” świadomie zostawione (2× nieopublikowane galerie `DRAFT_SLUGS`, 1× opis klienta w karcie „Klient”, nie nagłówek) |
| Poziome przewijanie | brak, 60 kombinacji |
| Bez JavaScriptu (4 strony × 390/1440) | 0 ukrytych sekcji `.reveal`, telefon widoczny |
| JS włączony | animacje jak wcześniej, `html.js js-ready` |
| Skrypty strony zablokowane | po 1,5 s 33/33 sekcji ukrytych, po 5 s 0/33 (bezpiecznik działa) |
| CLS | przełączenie `opacity`/`transform` nie przesuwa układu; CLS w przewijaniu bez zmian |
| `/o-mnie` | 308 → `/#o-mnie` jednym krokiem; stara domena: 308 → `https://szabunia.pl/#o-mnie` (własna reguła, bez łańcucha); `/o-mnie/` → `/o-mnie` → `/#o-mnie` (standardowe ucinanie ukośnika Next.js, tak jak na całej stronie). `www` przekierowuje Vercel na poziomie domeny, więc `www.szabunia.pl/o-mnie` będzie miało dwa kroki, jak każdy adres z `www` |
| Formularz | 390/768/1024/1280 px bez wystawania; 768 px pola 257 px |
| Podgląd zdjęć (usługa + case) | Wstecz, ✕, Escape zamykają; kolejny Wstecz wraca na poprzednią stronę |
| Galeria | domyślnie Eventy, `?kat=` w historii, Wstecz/Dalej, odświeżenie |
| Ścieżki klienta (Event, Portrety, Produkt, Nieruchomości; 390 i 1440 px) | 16/16 kroków: strona 200, link dalej 200, formularz obecny |
| Konsola | lokalnie tylko brak `/_vercel/insights` i `/_vercel/speed-insights` (istnieją wyłącznie na Vercelu) |

## N. Dodatki 24.09.2026 (polecenie Marcina: „poszukaj lepszych zdjęć”, „dodaj Scalio”)

- **Woohoo z oryginału 4K zamiast klatki z YouTube.** W `ARCHIVE_01/.../Woohoo/2026.03.19 Woohoo/` nie ma zdjęć, są eksporty filmów (`2026.03.19 Woohoo v3.mov`, 3840×2160, H.264, 131 s). Klatki wyciągnięte przez AVFoundation (skrypt Swift w scratchpadzie, bez nowych zależności), sprawdzone w 100% (napis na smyczy czytelny).
  - Okładka: prelegent z mikrofonem (86,5 s), 4:3, 1600×1200, `woohoo-prelekcja-4x3.jpg`. Usuwa też powtórzenie twarzy z plakatem filmu na podstronie eventów (kompromis z sekcji M).
  - Galeria case study (wcześniej pusta): sześć kadrów 1920×1080 w `public/images/portfolio/woohoo/`, podpis „Kadry z filmu z wydarzenia…”, opisy alternatywne per kadr. Bez napisów i belek z nazwiskami.
  - Plik z 23.09 (`woohoo-networking-4x3.jpg`, klatka z YouTube) usunięty przed commitem, nie był nigdzie wdrożony.
- **Scalio na pasku logotypów** usługi „Nieruchomości i przemysł” (`services.tsx`, `proof.brands`). Odwraca zakaz z 10.08.2026 zapisany przy leadzie wizerunku; notatka w kodzie zaktualizowana. **Zdjęć Scalio nie publikujemy** (decyzja Marcina 24.09).
- **Jeden wzorzec przycisków „zobacz więcej” na stronie głównej** (prośba Marcina): „Zobacz pełną galerię”, „Zobacz profil i opinie w Google ↗” i „Zobacz wszystkie artykuły” dostały ramkę jak „Masz podobny projekt? Zapytaj o ofertę” (pełna szerokość kontenera, `rounded-2xl`, obrys, `p-5`, 16 px, 600). Na wszystkich czterech doszedł niebieski obrys po najechaniu. Teksty, adresy i `data-cta` bez zmian. Sprawdzone: 1152 px na desktopie, 358 px na telefonie, identyczne wymiary.
- **P0, AWARIA FORMULARZY (wykryta 24.09.2026 przy kontroli po wdrożeniu, potwierdzona przez Marcina):** `/api/contact` i `/api/lead` odpowiadały 503 „Formularz jest chwilowo niedostępny” na każde zgłoszenie. Log Vercela: `[ALERT] contact: rate-limit unavailable` (m.in. próby Marcina 14:47–14:49). Zmienne Upstash są ustawione, ale baza nie odpowiada; `limit()` rzucał wyjątek, a trasy robiły z niego 503. Od kiedy — nieznane: Vercel trzyma logi krótko, a mój test API z 23.09 sprawdzał tylko obcą domenę. Poprawka `c8a45b3` (`src/lib/ratelimit.ts`): przy błędzie lub braku odpowiedzi Upstash w 1,5 s limit jest pomijany z logiem `[ALERT]`, zgodnie z `CLAUDE.md` §8. Po wdrożeniu produkcja: bez tokenu 400 (Turnstile), nie 503. **Do zrobienia przez Marcina:** panel Upstash (baza uśpiona/usunięta? token?), bo do czasu naprawy limit prób nie działa. Pełny test z wysyłką maila wymaga człowieka (Turnstile).
- **Nazwa usługi eventowej zgodna z tym, czego szukają ludzie** (pytanie Marcina 24.09). GSC 3 mies. do 12.09: zero zapytań ze słowem „dokumentacja”; są „fotografia eventowa poznań” 37 wyświetleń, „reportaż z wydarzeń firmowych” 31, „nagrywanie/filmowanie eventów i wydarzeń” ok. 80, „zdjęcia eventowe” 11. Ads kupuje „fotograf na event”, „fotograf na konferencję”, „obsługa wideo eventów”. Karta usługi: „Dokumentacja wydarzeń firmowych” → „Fotografia i wideo z wydarzeń firmowych” (schemat pozostałych trzech kart); napis nad H1: „Dokumentacja wydarzeń” → „Zdjęcia i wideo z eventów firmowych”. Title, H1, URL i JSON-LD bez zmian. **Do zrobienia w panelu Ads:** sitelink o tekście „Dokumentacja wydarzeń firmowych”.
- Przejrzane i odłożone: `WORK_SSD/2026.09.06 Scalio/05_FINAL` (21 kadrów). Pominięte zgodnie z zakazem: Forte, MTP (w tym Polocard), BeThink.

## Sugerowany commit

```
fix(mobile,perf,a11y): formularz na telefonie, LCP podstron, tresc bez JS, polish typografii

- formularz: grid-cols-1, Turnstile compact < 300 px, /kontakt bez podwojnego
  paddingu, e-mail i telefon w jednej kolumnie przy 768-1023 px
- LCP: hero-intro zamiast AnimatedSection nad zgieciem (/galeria, /kontakt,
  /poradnik, /portfolio, /blog, case studies), plakat YouTube priority + WebP
- bez JS tresc widoczna: .reveal tylko pod html.js, bezpiecznik 4 s
- lightbox uslug i case studies: Wstecz zamyka podglad
- /o-mnie -> /#o-mnie (308)
- tresc: bez powtorzen na /kontakt i w O mnie, krok "Obrobka" w procesie,
  podtytuly bloga i opinii zgodne z trescia, dlugie akapity do lewej na telefonie
- JSON-LD: przecinek zamiast dlugiego myslnika w 4 polach name
- /portfolio 2x2, sizes miniatury realizacji, sitemap lastmod 23.09
- Woohoo: okladka i galeria z oryginalu filmu 4K, Scalio na pasku uslugi przemyslowej
- raport: docs/sesje/AUDYT-SZABUNIA-2026-09-23.md
```
