# Audyt: lejek na podstronach + korekta językowa

Data: 2026-08-02. Zakres: 22 strony bez bloga (strona główna, `/uslugi` i 7 podstron usług,
`/portfolio` i 9 case studies, `/kontakt`, `/poradnik`, `/galeria`, polityka prywatności).
Punkt odniesienia: commit `a77ce4a`, produkcja = `main`, drzewo czyste przed pracą.
Metoda: pełny build lokalny, ekstrakcja tekstu widocznego z 48 wyrenderowanych stron,
korekta w dwóch niezależnych przebiegach, weryfikacja każdego findingu w kodzie
(`plik:linia`), kontrola po ponownym buildzie.
Wykluczone: 26 wpisów bloga (Twoja decyzja), cytaty klientów, atrybuty `alt`/`aria`,
`title`/`description` SEO, treść PDF-a poradnika.

**Ten dokument sam z siebie niczego nie zmienia.** Poprawki, które wykonałem, są opisane
w §2 i leżą w osobnym diffie.

---

## 0. TL;DR

Lejek na podstronach jest zgodny z regułami z metodyki **z jednym wyjątkiem: case studies.**
Dziewięć stron `/portfolio/*` nie ma ani przycisku CTA, ani przyklejonego przycisku na
telefonie, ani żadnego `data-cta` do pomiaru. Jedyna droga do kontaktu to formularz na samym
dole. To są strony, do których linkują Twoje wpisy w wizytówce Google, więc ruch z GBP ląduje
dziś na najsłabszym ogniwie lejka.

Językowo: znalazłem i **poprawiłem 16 twardych błędów**, w tym trzy, które widać gołym okiem
(„na: na stronę internetową", „stronę karriery", „fundament employer branding"). Do Twojej
decyzji zostaje 12 niekonsekwencji, z których najważniejsza to zapis i odmiana „Social Media".

**Jedna decyzja na teraz:** czy dokładam przycisk „Zapytaj o ofertę" i przyklejony przycisk
mobilny na dziewięciu case studies.

---

## 1. Sprawdzone i OK

Te punkty z checklisty „CTA i lejek" oraz „Struktura i hierarchia" przeszły na wszystkich
22 stronach:

- **Dokładnie jeden `<h1>` na każdej z 48 stron serwisu.** Policzone, bez wyjątków.
- **Hierarchia nagłówków bez przeskoków** (żadnego h1→h3). Zero naruszeń.
- **Zero martwych kotwic.** Każdy `href="#x"` ma swój `id` na tej samej stronie.
- **Jedna ścieżka CTA.** Wszystkie główne przyciski prowadzą do `#kontakt`, nigdzie nie ma
  mieszania z `/kontakt`. Ten błąd potrafi wrócić przy każdej zmianie, tu go nie ma.
- **Spójna etykieta.** „Zapytaj o ofertę" w nawigacji, w hero podstron i w CTA w połowie
  strony. Bez wariantów typu „Napisz do mnie" czy „Wyceń projekt".
- **Jedno CTA w hero podstron usług**, bez linków drugorzędnych, zgodnie z Twoją decyzją
  z 6.07.
- **404 linkuje do żywych tras**: `/uslugi`, `/portfolio`, `/blog`, `/kontakt`, plus powrót
  na stronę główną. Sprawdzone w kodzie.
- **Formularz kontaktowy na każdej stronie lejka**, łącznie z case studies i hubami.
- **Telefon dostępny bez scrolla** na podstronach usług (klikalny chip w hero) i w nawigacji.

---

## 2. Poprawione od razu (16 zmian, zgodnie z Twoim „popraw twarde błędy")

Wszystkie zweryfikowane w kodzie i po ponownym buildzie w wyrenderowanym HTML.
Lint, `tsc --noEmit` i `build` przechodzą.

### 2.1 Literówki i błędy widoczne gołym okiem

| # | Gdzie | Było | Jest |
|---|---|---|---|
| 1 | `portfolio.ts:379` · /portfolio/sesja-wizerunkowa | „Tworzę portrety biznesowe **na: na** stronę internetową" | „Tworzę portrety biznesowe **na** stronę internetową" |
| 2 | `portfolio.ts:540` · /portfolio/sesja-korporacyjna | „Idealny materiał na stronę **karriery**" | „…na stronę **kariery**" |

Pierwsza to ślad po nieukończonej edycji zdania, druga to pisownia niemiecka.

### 2.2 Nieodmienione zapożyczenia

| # | Gdzie | Było | Jest |
|---|---|---|---|
| 3 | `services.tsx:148` · /uslugi/sesje-zespolowe | „fundament employer **branding**" | „fundament employer **brandingu**" |
| 4 | `portfolio.ts:512` · /portfolio/sesja-korporacyjna | to samo zdanie | to samo poprawione |
| 5 | `portfolio.ts:377` · /portfolio/sesja-wizerunkowa | „zdjęcia **personal branding** dla kadry" | „zdjęcia **do personal brandingu** dla kadry" |

Przy nr 5 forma poprawna już istniała w serwisie: „zdjęcia do personal brandingu"
(`services.tsx:245`, kafel na stronie głównej). Rozjeżdżały się dwa opisy tej samej usługi.

### 2.3 Zły przypadek po przyimku

| # | Gdzie | Było | Jest |
|---|---|---|---|
| 6 | `services.tsx:399` · /uslugi/zdjecia-wideo-z-drona | „…inwestycje budowlane, **architektura** oraz ujęcia eventowe" | „…**architekturę** oraz ujęcia eventowe" |
| 7 | `services.tsx:300` · /uslugi/wideo-marketing | „komunikacji **w Social Media**" | „komunikacji **w social mediach**" |
| 8 | `services.tsx:300` · /uslugi/wideo-marketing | „od spotów **do Social Media** po materiały" | „od spotów **do social mediów** po materiały" |
| 9 | `services.tsx:330` · /uslugi/wideo-marketing | „pod kampanie **w Social Media** i online" | „pod kampanie **w social mediach** i online" |
| 10 | `services.tsx:347` · /uslugi/fotografia-produktowa | „od internetu **i Social Media** po druk" | „od internetu **i social mediów** po druk" |

Przy nr 6 cała lista jest dopowiedzeniem do „Realizuję zdjęcia i wideo z drona:", więc wymaga
biernika. Wszystkie pozostałe człony mają formy tożsame w mianowniku i bierniku, jedynie
„architektura" zdradzała błąd.

Przy nr 7–10 poprawka wymusiła małą literę. To dotyczy tylko tych czterech miejsc; pozostałe
18 wystąpień „Social Media" zostawiłem bez zmian, bo tam forma jest gramatycznie poprawna
(biernik po „na"). Zapis wielką literą jako całość jest do Twojej decyzji, §4.1.

### 2.4 Pytania FAQ w złej osobie

| # | Gdzie | Było | Jest |
|---|---|---|---|
| 11 | `faq.ts:31` · strona główna, /galeria | „Czy **wystawiam** fakturę VAT?" | „Czy **wystawiasz** fakturę VAT?" |
| 12–15 | `faq.ts:63`, `portfolio.ts:403` i `:527`, `services.tsx:176` | „Ile osób **mogę** sfotografować w jeden dzień?" | „Ile osób **możesz** sfotografować w jeden dzień?" |

To nie jest kosmetyka. Odpowiedzi są w pierwszej osobie autora („Rozliczenie prowadzę przez
platformę Useme", „fotografuję do 40 osób dziennie"), a pytania stawiały klienta w roli
wystawcy faktury i fotografa. Sąsiednie pytania w tej samej liście są poprawne w drugiej
osobie („Czy dojeżdżasz poza Poznań?", „Ile miejsca potrzebujesz w biurze?").

**Uwaga:** `faq.ts` zasila jednocześnie widoczne FAQ i dane strukturalne `FAQPage`, więc
te dwa pytania zmieniają się także w tym, co czyta Google. Zmiana jest na plus, ale warto
wiedzieć, że dotyka danych strukturalnych.

### 2.5 Pozostałe

| # | Gdzie | Było | Jest |
|---|---|---|---|
| 16a | `Warunki.tsx:24` · /galeria | „Warunki **Współpracy**" | „Warunki **współpracy**" |
| 16b | `CTA.tsx:197` · każda strona z formularzem | etykieta „**Email**" | „**E-mail**" |

Przy 16a: w polskim nagłówku wielką literą piszemy tylko pierwszy wyraz. Przy 16b: w tym
samym komponencie, 180 linii niżej, było już poprawne „E-mail" przy polu formularza. Dwa
zapisy renderowały się na jednym ekranie.

---

## 3. Ustalenia dotyczące lejka

### LEJ2608-01 · [UX] Dziewięć case studies bez CTA i bez przyklejonego przycisku
`src/app/portfolio/[slug]/page.tsx` · P1 · S · 🤖 · Z (kod + render)

Strony `/portfolio/*` renderują `<CTA />` (formularz na samym dole), ale **nie mają ani
jednego przycisku prowadzącego do kontaktu wcześniej** i **nie importują `MobileFAB`**.
Sprawdzone: `MobileFAB` renderuje się na `/`, `/uslugi`, `/uslugi/[slug]`, `/portfolio`,
`/galeria`, `/poradnik`, `/blog` i `/blog/[slug]`. Nie ma go tylko na `/portfolio/[slug]`,
`/kontakt` i polityce prywatności. Na `/kontakt` jest to uzasadnione (formularz jest treścią
strony), na case studies nie.

Skutek: czytelnik case study, który po dwóch akapitach chce zapytać o wycenę, nie ma czego
kliknąć aż do końca strony. Na podstronach usług ma dwa takie punkty. Do case studies linkują
Twoje wpisy w wizytówce Google (Yes Butcher, Woohoo, Artech, opublikowane 6.07), czyli ruch
z GBP trafia dokładnie tutaj.

Dodatkowo: **żaden element na tych stronach nie ma `data-cta`**, więc nie da się zmierzyć,
czy ktokolwiek z nich przechodzi dalej.

Poprawka: dodać `<MobileFAB />` do `app/portfolio/[slug]/page.tsx` (jedna linia plus import)
oraz przycisk „Zapytaj o ofertę" z `data-cta="wycena_case"` po sekcji efektów, dokładnie tak
jak `wycena_uslugi` na podstronach usług.

### LEJ2608-02 · [UX/POMIAR] Hub `/uslugi` bez mierzalnego CTA
`src/app/uslugi/page.tsx` · P2 · S · 🤖 · Z (kod + render)

Hub renderuje kafle usług i formularz na dole, ale nie ma przycisku CTA ani żadnego
`data-cta`. To akurat strona z **najlepszą pozycją w Google w całym serwisie** (7,3 wg GSC,
pomiar z dzisiaj). Kafle prowadzą dalej w lejek, więc nie jest to ślepy zaułek, ale zerowy
pomiar na najlepiej rankującej stronie to strata danych.

### LEJ2608-03 · [UX] Niespójny link „dowodowy" na podstronach usług
`src/data/services.tsx` · P3 · S · 🧑 · Z (render)

Sześć z siedmiu podstron usług linkuje do galerii z filtrem kategorii
(`/galeria?kat=eventy`, `?kat=portrety`, `?kat=produktowe`, `?kat=wideo`, `?kat=dron`).
Jedna, `/uslugi/sesje-zespolowe`, zamiast tego linkuje do `/portfolio/idcom-headshoty-zespolu`
i **nie ma linku do galerii w ogóle**. Nie wiem, czy to decyzja (brak kategorii „zespołowe"
w galerii), czy przeoczenie. Jeśli decyzja, warto ją zapisać, bo wygląda jak niespójność.

---

## 4. Do Twojej decyzji: niekonsekwencje językowe

Żadnej z nich nie ruszałem. Wszystkie są gramatycznie obronne, ale w obrębie serwisu
występują w dwóch wariantach naraz.

### 4.1 „Social Media" kontra „social media" — najważniejsza z tej listy

Po poprawkach z §2.3 mamy dziś: 4 miejsca „social mediach/mediów" (małą literą, odmienione),
18 miejsc „Social Media" (wielką literą, nieodmienione, gramatycznie poprawnych po „na")
i kilka „social media" małą literą. Na stronie głównej dwa kafle usług stoją obok siebie
i jeden ma „Social Media", drugi „social media" (`services.tsx:98` i `:345`).

To nie jest nazwa własna, więc ortograficznie należy się mała litera. Zmiana dotyczy
ok. 22 miejsc w `services.tsx`, `portfolio.ts`, `faq.ts` i jednym komponencie. Prosta,
mechaniczna, ale to zmiana w treści, więc czekam na Twoje „tak".

### 4.2 Pozostałe pary do ujednolicenia

| Co | Wariant A | Wariant B | Moja rekomendacja |
|---|---|---|---|
| Formaty pionowe | „Reels" (nieodmienne, `galeria.ts:11-12`) | „reelsy" (`portfolio.ts`, `services.tsx:298`) | „Reels" tylko w wyliczeniach platform, w zdaniu „reels, reelsa, reelsy" |
| Zakresy liczbowe | półpauza „1–3 tyg.", „2–3 zestawy" | dywiz „10-15 minut", „30-50 produktów", „15-60 s" | półpauza wszędzie poza nazwami sprzętu (Sigma 70-200 mm zostaje) |
| Krok 2 sesji portretowej | tytuł „Poseboard" | opis pod nim „Przygotowuję **moodboard**" | jedno słowo w tytule i w opisie |
| Podpis pod opinią | „· Opinia Google" (`Testimonials.tsx`) | „· opinia Google" (`portfolio.ts:153, 266`) | małą literą |
| Czas w poradniku | „48 h przed sesją" | „48 godzin przed sesją", dwa ekrany niżej | jeden zapis |
| Nazwa wydarzenia | „E-commerce All-in" (nagłówek) | „E-commerce All In" (opis, ta sama strona) | do ustalenia, jak brzmi oficjalnie |
| Nagłówek sekcji | „Case Study" (`PortfolioCaseStudy.tsx:21`) | „case study" w linkach | „Case study" |
| Forma adresatywna | „Ty" na /uslugi/pakiety-foto-wideo | „deklarujecie liczbę wydarzeń" na tej samej stronie | konsekwentnie „Ty" |
| Nazwy usług | „Wizerunek & Portrety", „Obsługa eventów firmowych" | opcje w formularzu: „Portrety biznesowe / Headshoty", „Reportaż z eventu" | wyrównać etykiety formularza do nazw usług |
| Uprawnienia drona | „dron DJI z uprawnieniami A1/A3 i OC" | „certyfikat operatora A1/A3 i ubezpieczenie OC" | druga forma; uprawnienia ma operator, nie dron |

---

## 5. Wątpliwe, celowo nietknięte

Zgłaszam, bo widziałem, ale nie mam pewności, że to błąd:

1. **„Co jeśli…" bez przecinka** (`services.tsx:230`, `:434`, `faq.ts:35`, `:43`). Dwa
   niezależne przebiegi korekty oceniły to inaczej: jeden jako błąd interpunkcyjny, drugi
   jako utarty zwrot. Skoro występuje konsekwentnie cztery razy, wygląda na decyzję.
2. **„maleje progresywnie"** (`services.tsx:170`, `:369`). Dosłownie „progresywnie" znaczy
   „narastająco", ale w żargonie handlowym „rabat progresywny" znaczy dokładnie to, co masz
   na myśli. Odbiorca B2B zrozumie.
3. **„z wymogami Allegro i Amazon"** (`services.tsx:347`). Poprawnie byłoby „Amazona", ale
   nazw marek nie ruszam bez Twojej zgody.
4. **„dla Grupa Forte S.A."** (`Publications.tsx:61`). Poprawnie „dla Grupy Forte S.A.",
   ale to pełna nazwa z formą prawną, którą część firm świadomie zostawia w mianowniku.
5. **„na Enea Stadion"** (`portfolio.ts:95, 97`). Poprawnie „na Enea Stadionie", ale to
   marketingowa nazwa obiektu.
6. **„film, który pokaże park maszynowy i sposób pracy firmom z przemysłu"**
   (`portfolio.ts:254`). Gramatycznie się broni („pokaże komu? firmom"), ale szyk sprawia,
   że przy pierwszym czytaniu brzmi jak błąd. Propozycja: „…film, który pokaże firmom
   z przemysłu park maszynowy i sposób pracy firmy". To zmiana redakcyjna, nie korekta.
7. **„dobieramy styl, oświetlenie i klimat dopasowany do Twojej branży"**
   (`services.tsx:247`). Imiesłów uzgadnia się tylko z ostatnim członem; przy szeregu
   powinno być „dopasowane". Formalnie obecna wersja jest obronna.
8. **„materiał, który się ze sobą klei"** (`ServiceAuthor.tsx`, mój wczorajszy tekst).
   „Ze sobą" zakłada wiele elementów, a „materiał" jest w liczbie pojedynczej. Zostawiam
   Tobie, bo to Twój głos: albo „materiały, które się ze sobą kleją", albo zostaje jak jest.

---

## 6. Pozorne problemy, które sam sobie skorygowałem

Wypisuję, żeby nie wróciły jako „findingi" przy kolejnym audycie:

- **Pięć case studies wygląda na nieukryte drafty.** `box17-budki-akustyczne`,
  `sesja-wizerunkowa`, `fotografia-eventowa`, `packshoty-produktowe`, `sesja-korporacyjna`
  są w `DRAFT_SLUGS`, nie ma ich na hubie ani w sitemapie, ale **strony statyczne dla nich
  się budują**. Wyglądało to na dziurę. Sprawdziłem: `generateMetadata` w
  `app/portfolio/[slug]/page.tsx:40` ustawia im `robots: { index: false, follow: true }`.
  Obietnica z komentarza jest dotrzymana, to nie jest defekt.
- **Brak `MobileFAB` na `/kontakt`** — to nie błąd, formularz jest treścią tej strony.
- **`hidden md:block` przy karuzeli logotypów** — dwa wystąpienia komponentu to celowa
  decyzja z 7.07, nie duplikat.

---

## 7. Czego nie sprawdziłem

- **26 wpisów bloga** (ok. 150 tys. znaków). Wyłączone Twoją decyzją. Zaznaczam jednak, że
  korekta wychwyciła kilka rzeczy w zajawkach blogowych renderowanych na podstronach usług
  („must-have ujęcia", „Stylizacja potrafi zrobić albo zepsuć portret") — to kalki z
  angielskiego, do tej samej rundy redakcyjnej.
- **Tytuły i opisy SEO** (`seo.title`, `seo.description`). Nie ma ich w treści strony, a
  widać je w Google. Warto przejrzeć osobno.
- **`alt`, `aria-label`, komunikaty walidacji formularza, treść e-maili z `/api/*`.**
  Przejrzane pobieżnie, bez rażących błędów, ale nie były przedmiotem systematycznej korekty.
- **Treść PDF-a poradnika** (`public/poradnik-przygotowanie-do-sesji.pdf`).
- **Usługa `wnetrza-obiekty-architektura`** — jest w draftach, trasa zwraca 404. Przy
  włączeniu wymaga osobnej korekty: teksty są tam pisane w formie „Wy" („Pliki dostajecie",
  „wstawicie do oferty"), niespójnie z resztą serwisu.
- **Kontrast, klawiatura, czytniki ekranu** — to moduł dostępności, nie był w zakresie.

---

## 8. Plan działania

**Do wdrożenia teraz (gotowe, czeka na Twój push):**
1. 16 poprawek językowych z §2 — diff `docs/sesje/korekta-jezykowa-2026-08-02.diff`.

**Szybkie, poniżej godziny:**
2. LEJ2608-01: `MobileFAB` + przycisk CTA z `data-cta="wycena_case"` na dziewięciu case
   studies. Największy zysk z tej listy.
3. LEJ2608-02: `data-cta` na hubie `/uslugi`.

**Do decyzji przed wdrożeniem:**
4. §4.1 „Social Media" małą literą w całym serwisie (ok. 22 miejsca).
5. §4.2 pozostałe dziesięć par do ujednolicenia.
6. LEJ2608-03: czy `sesje-zespolowe` ma dostać link do galerii.

**Data kontrolna:** po wdrożeniu punktu 2 sprawdzić w GA4 po 3–4 tygodniach, czy
`wycena_case` w ogóle się odpala. Jeśli zero przy realnym ruchu z wizytówki Google, problem
jest wyżej, w samych wpisach GBP, a nie w przycisku.

---

## Rejestr findingów

| ID | Obszar | Priorytet | Status |
|---|---|---|---|
| JEZ2608-01…16 | treść | P2 | wdrożone, czeka na push |
| LEJ2608-01 | UX/pomiar | P1 | otwarty |
| LEJ2608-02 | UX/pomiar | P2 | otwarty |
| LEJ2608-03 | UX | P3 | otwarty, do decyzji |
| JEZ2608-N1 | treść, niekonsekwencje §4 | P3 | do decyzji |
