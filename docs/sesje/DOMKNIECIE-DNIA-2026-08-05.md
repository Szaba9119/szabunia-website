# Domknięcie dnia — 5 sierpnia 2026

Nadbudowa nad `docs/sesje/PLAN-POPRAWEK-2026-08-05.md` (powstał dziś 14:05). **Nie zastępuje go**
i nie powtarza jego treści. Odpowiada na trzy pytania, których w nim nie ma:
co z tego planu **jest już zrobione**, czego **w planie brakuje**, i co trzeba zrobić,
żeby dzisiejszy dzień był **zamknięty, a nie porzucony**.

Zestawione z czterech audytów z 05.08.2026 + stanu repo i dysku odczytanego 05.08 o 14:05–16:10.

---

## 0. Jedno zdanie o stanie

Robota dnia jest wykonana w kodzie i **niewidoczna nigdzie poza dyskiem**: 28 plików
zmodyfikowanych, 3 nowe, **zero commitów po `f5dd9f4`**, produkcja nadal na `f5dd9f4`,
DoD (`lint` / `tsc` / `build`) nieuruchomiony, statusy w planie wszystkie `☐`,
CHANGELOG bez ani jednego wpisu z 04 i 05.08.

---

## 1. Weryfikacja: co z etapów 1–2 planu jest już w kodzie

Sprawdzone przez `git diff` na drzewie roboczym, nie z pamięci. `git status`: 28 × `M`,
16 × `??` (raporty + `error.tsx` + `global-error.tsx` + OG ósmej usługi).

### Zrobione i potwierdzone dowodem w diffie

| Pozycja planu | Dowód |
|---|---|
| `PELNY2608-01` quality | `ServiceAuthor.tsx`: `quality={78}` → `quality={80}` |
| `PELNY2608-10` świeżość | `sitemap.ts`: `new Date("2026-07-29")` → `new Date("2026-08-05")` |
| `PELNY2608-13` lejek | nowe `data-cta`: `uslugi_karta_${s.slug}` (`Services.tsx`, `uslugi/page.tsx`), `case_${item.slug}` (`portfolio/page.tsx`), `poradnik_wejscie` (`PoradnikTeaser`, `PoradnikBlogCTA`), `gallery_open` w `PortfolioGallery` |
| `PELNY2608-16` localStorage | `ThemeProvider.tsx`, `CookieConsent.tsx` w diffie |
| `PELNY2608-33` honeypot | `CTA.tsx`: `contact_submit` tylko przy `body?.sent !== false`; brak pola `sent` traktowany jak wysłane, więc historia GA4 nie gubi konwersji |
| `PELNY2608-34` (część) | `CTA.tsx`: nowe pole `page: window.location.pathname` |
| `PELNY2608-35` iOS | `lib/utm.ts`, `api/contact/route.ts`, `api/lead/route.ts` |
| `PELNY2608-23` llms.txt | `public/llms.txt:43`: „10-15 min/os." → „5-15 min/os." |
| `PELNY2608-07` OG | nowy plik `public/images/og/uslugi/wnetrza-obiekty-architektura.png` |
| `PELNY2608-30` błędy | nowe `src/app/error.tsx` i `src/app/global-error.tsx` |
| `PELNY2608-61` komentarze | `services.tsx`: kwoty 120/1 100 oznaczone jako HISTORYCZNE, komentarz o cross-linku sprostowany, komentarz o dronie sprostowany **bez rozstrzygania D4** |
| QUICK (pozostałe) | pliki w diffie: `PoradnikForm`, `MobileFAB`, `CookieConsent`, `blog/page`, `portfolio/page`, `poradnik/page`, `not-found`, `blog/[slug]`, `Navigation` |
| Etap 2 (pozostałe) | `feed.xml/route.ts`, `BlogCard.tsx`, `CountUp.tsx`, `blog/page.tsx` |

Osobno warto zauważyć, co **świadomie nie weszło**: `PELNY2608-05` (`generate_lead`) nie został
dołożony do `CTA.tsx`. Blokada z briefu („ZGODA: NIE, czeka na wynik kroku 1") została uszanowana.
To jest zrobione dobrze i nie ruszać tego, dopóki nie wiadomo, co Ads importuje.

### Niezrobione, choć plan je wymienia w etapie 1–2

| Pozycja | Stan | Co z tym |
|---|---|---|
| `PELNY2608-60` komentarz nad `Cache-Control` | `next.config.ts` **nietknięty** | 2 minuty, bez decyzji, dorzucić przed commitem |
| `PELNY2608-34` część mailowa | `src/lib/mail.ts` **nietknięty** | strona wysyłki poszła do GA4 (`page` w `CTA.tsx`), ale **nie do maila z leadem**. Decyzja: czy GA4 wystarcza, czy mail też ma to nieść |

### Zrobione, choć miało mieć stop

`PELNY2608-23` (`llms.txt`, „5-15 min/os.") zostało wdrożone. Audyt stawiał przy tej pozycji
warunek: *„QUICK, ale ze stopem — dotyka treści handlowej; jeśli Marcin nie potwierdził »5-15«,
tę jedną pozycję zostawić"*. **Pytanie do Ciebie:** potwierdzałeś kiedyś „5-15 min na osobę"?
Jeśli tak, sprawa zamknięta i to jest domknięcie rozjazdu z dwunastoma innymi miejscami.
Jeśli nie — jedna linia do cofnięcia, i wtedy rozjazd zostaje otwarty w drugą stronę
(dwanaście miejsc mówi 5-15, `llms.txt` mówiłby 10-15).

---

## 2. Czego w planie nie ma

Nie zarzuty do planu — pozycje, które przy jego pisaniu wypadły, a mają skutek.

**2.1 Arytmetyka nagłówka się nie zgadza.** Plan podaje „66 (0×P0, 5×P1, 24×P2, 19×P3, 11×P4)".
Suma rozbicia to **59**, nie 66. Liczba 19 jest przepisana z TL;DR audytu, a tabela §5.2
ma **26 wierszy** (`-30` … `-55`) i rejestr też 26. **Siedem pozycji P3 nie ma miejsca
w rozbiciu** i nie da się powiedzieć, czy trafiły do etapu 2, czy wypadły.

**2.2 Cztery findingi bez etapu i bez briefu.** Plan wymienia `-46`, `-54`, `-55`, `-66` jako
świadomie odłożone. Nie wymienia nigdzie:

| ID | Waga | Co to jest |
|---|---|---|
| `PELNY2608-22` | **P2** | FAQ cenowe sesji zespołowych powtarza tę samą kwotę dwa razy pod rząd, **także w `FAQPage` JSON-LD**; potwierdzone dosłownie na produkcji. Hipoteza H13: to samo może być na sześciu pozostałych podstronach |
| `PELNY2608-18` | P2 (M) | hero → `#kontakt`, navbar → `/kontakt` przy identycznej etykiecie; dwie ścieżki, dwie nazwy zdarzeń dla jednego zamiaru |
| `PELNY2608-19` | P2 | hero case study: dwa przyciski do tego samego celu, żaden bez `data-cta` — mierzony jest środek strony, nie pierwszy ekran |
| `PELNY2608-09` | P2 (M) | linia obiektowa: **0 linków kontekstowych i 0 wpisów w `blogServiceMap`** przy 11 dla sesji zespołowych. Diff dziś to potwierdził: „linia obiektowa nie ma żadnego linku wychodzącego" |

`-22` to jedyna z tych czterech, która idzie do Google w danych strukturalnych. Warta etapu 2.

**2.3 Google Ads: plan bierze 7 z 14 pozycji.** Brakuje w szczególności dwóch, które są tanie
i odblokowują rachunek:

- **kroki 1–2 briefu `ADS2608-11`** (dodać kolumny „Wynik jakości", „Oczekiwany CTR", „Trafność
  reklamy", „Jakość strony docelowej", odczytać dla pięciu ograniczonych słów). Brief ma
  **ZGODA: TAK**, to czysty odczyt. Bez tego nie wiadomo, czy `"portret biznesowy"` (65,50 zł,
  CTR 12,22%, drugi wydatek konta) jest ograniczany przez stronę docelową czy przez coś innego
- **raport wyszukiwanych haseł z kwotami**. W panelu `/aw/searchterms` daje 404, przez menu leci
  500. Dopóki się nie otworzy, cztery klastry haseł-śmieci (`ADS2608-14`) nie mają kwot,
  a **hipoteza H8 zostaje hipotezą** — a to ona mówi, że zapytania „sesja biznesowa poznań cena"
  i „fotografia produktowa cennik" trafiają na stronę, z której cennik zdjęto w lipcu

Poza tym plan nie ma `ADS2608-09` (Eventy: 9 wyświetleń, 0 kliknięć, decyzja z 02.08 nadal
nie zapadła), `-16` (wideo i dron bez grupy — do zapisania jako **świadoma** decyzja, żeby
nie wracało co audyt), `-15`, `-10`, ani decyzji §12.4 / §12.5 / §12.7.

**2.4 Wizytówka: brakuje siedmiu URL-i produktowych z UTM.** Audyt sam ostrzega, że `WIZ2608-03`
jest w rejestrze „wdrożone", choć wdrożono **tylko link główny**, a siedem URL-i produktowych
z `utm_content` (gotowe w `PACZKA-WIZYTOWKA §1`) nie weszło i nie ma ich w tabeli §C.
Plan powtarza ten sam błąd — pozycja nie występuje w etapie 4.2. Bez niej ruch z produktów
w GBP nadal będzie nierozliczalny, czyli **H5 („czy ten ruch kupuje") zostaje otwarte
mimo poprawki**.

Do tego plan nie zbiera 7 decyzji wizytówkowych — jedna z nich (ceny w polu produktu)
blokuje 5 minut gotowej roboty.

**2.5 CHANGELOG nie zna ostatnich dwóch dni.** `grep "2026-08-0[45]"` w `01_Fundament/CHANGELOG.md`
daje **zero trafień**, przy własnej konwencji projektu („Nowe pliki dodawane do projektu zawsze
odnotowuję w tym CHANGELOG-u"). Niezalogowane zostało: 5 commitów (`e2a0cd3` … `f5dd9f4`),
3 zmiany w GBP w moderacji, 4 szkice cennika, 4 audyty, próg 700 i taryfa zespołowa 1 400 + 120.

To nie przeoczenie jednego dnia. Ostatni wpis w CHANGELOG-u jest z sesji majowej, a od 31.07
powstało kilkanaście plików. **Mechanizm: praca idzie szybciej niż log, więc log przestaje być
źródłem prawdy i zaczyna być archeologią.** Gotowy blok do wklejenia jest w sekcji 5.

---

## 3. Rozjazdy, które trzeba znać, zanim cokolwiek zostanie zatwierdzone

**3.1 Cennik, R-1 — najpoważniejszy z całego dnia.** `_szkic_decyzje_dla_Marcina_2026-08.md:10-11`
deklaruje miks odniesienia „18 zleceń, **30 520 zł netto** przy cenach v3
(`_szkic_metoda_wyceny_2026-08.md §7.1`)". **W §7.1 tej liczby nie ma.** Tabela `:579` podaje
netto faktyczne **37 675 zł**, nowy cennik 40 500 zł, różnica **+2 825 zł (+7,5%)** — i sumy
kolumn się zgadzają.

Skutek: D-01 mówi, że S2 daje **+9 316 zł** wobec „nie robić nic", a test wsteczny na tych
samych 18 zleceniach mówi **+2 825 zł**. Na tej samej liczbie 30 520 zł stoi też wycena D-07
(1 526 zł). Tabela D-01 jest wewnętrznie spójna, ale **jej podstawy nie da się odtworzyć
ze wskazanego źródła**.

D-01 to decyzja o rozpiętości 20 031 zł netto rocznie i blokuje trzynaście pozostałych.
**Nie podejmuj jej, dopóki ta jedna liczba nie zostanie odtworzona albo poprawiona.**
To jest dokładnie ten wzorzec, który już raz kosztował ten projekt: liczba spójna, sensowna
i przekonująca, ze wskazanym źródłem, którego nie sprawdzono.

Poza R-1 szkic ma jeszcze jedenaście rozjazdów wewnętrznych — najważniejsze: S1 raz 90 zł/h
raz 93 zł/h (dwie bazy godzinowe, 98,1 h wobec 95 h); dno cennika opisane trzema liczbami
(600 / 700 / 1 000 / 1 400); test wsteczny liczy pozycje, których w cenniku nie ma („3 × portret 300",
„retusz kadru 100", „logistyka 900") i zakłada, że D-13 rozstrzygnie się na „tak";
„ceny drona zostają bez zmian", a wideo z drona rośnie z 1 200 na 1 600.

**3.2 Pętla: audyt strony czeka na cennik, cennik czeka na siebie.** `PELNY` D4 (dron w cenie
czy +200 zł), D5 (packshot 55 zł/szt.) i H11 (próg dwóch osób) wymagają `cennik_2026_07_v3.md`
— audyt go nie miał i pyta w D11, czy podpiąć folder `_System`. A `00_INDEKS:263` trzyma
w backlogu „zatwierdzić albo odrzucić v3", z warunkiem „trzy wypełnione wiersze w logu
realizacji", którego nadal nie ma (zmierzonych realizacji: zero).

**Rozstrzygnięcie, które zdejmuje blokadę:** v3 jest źródłem prawdy **dziś** — mówią to same
szkice („Obowiązuje `cennik_2026_07_v3.md`"). D4 i D5 rozstrzyga się z v3, niezależnie od tego,
czy v3 zostanie kiedyś zastąpiony. Czekanie na D-01 nie jest potrzebne i tylko utrzymuje
sprzeczność na produkcji.

**3.3 Trzy audyty postawiły ten sam warunek wstępny, każdy w innych słowach.**
`ADS2608-01` (P0: nie da się potwierdzić żadnego zapytania spoza panelu Google),
`PELNY2608-05` + `-06` (P1: główny formularz nie emituje `generate_lead`, telefon bez ground truth),
`WIZ` H5 (czy ten ruch w ogóle kupuje). **Wszystkie trzy rozstrzyga jedna rzecz:** dostęp do
skrzynki `marcin@szabunia.pl` + test end-to-end formularza. **Piętnaście minut, które odblokowuje
trzy audyty naraz** — i jednocześnie najwyższy priorytet w każdym z nich osobno.

**3.4 Czego nie ma w żadnym z czterech audytów ani w planie.** Szkic cennika mówi wprost:
*„Postprodukcja nie jest dziś wąskim gardłem firmy. Wąskim gardłem jest popyt"* — lipiec 2026
to ok. 38% wykorzystania pojemności pracy głębokiej. I dalej: *„Najlepszy cennik świata nie
naprawia oferty, po której nie idzie follow-up"* — w 193 z 269 wątków ostatnie słowo należy
do Ciebie, ze 160 takich 43 to oferty lub wyceny, a **27 z nich ma ponad 180 dni**.

Dziś powstało ok. 91 findingów o kodzie, panelu i cenniku, i **ani jedno zadanie o tych
27 ofertach**. Nie proponuję dopisywać tego do etapów. Proponuję zauważyć proporcję.

---

## 4. Ścieżka domknięcia dnia

Trzy bloki. Pierwszy jest jedyny, który naprawdę zamyka dzień — bez niego cała robota
zostaje na dysku.

### Blok A — wypuścić to, co już zrobione (ok. 20 min, sam, bez decyzji)

1. `PELNY2608-60`: komentarz nad `Cache-Control` w `next.config.ts` (2 min, ostatnia
   niezrobiona pozycja etapu 1–2 bez decyzji)
2. `npm run lint` → 0/0, `npx tsc --noEmit` → czysto, `npm run build` → sukces
   (u Ciebie lokalnie; w moim środowisku binarki `node_modules` są macOS-owe i nie odpalą się)
3. Smoke-test **ścieżek**, nie stron: `/` → karta usługi → `/kontakt` → wysłanie formularza;
   `/blog` → wpis → `BackToTopButton` (dziś blokowany banerem cookies); dark mode
   na `/blog/<slug>` i `/poradnik`
4. Commit i push — **wyłącznie Ty**. Sugerowany podział: jeden commit na pomiar
   (`data-cta`, `gallery_open`, honeypot, `page`, `wbraid`/`gbraid`), jeden na dostępność
   i kontrast, jeden na higienę (`error.tsx`, RSS, `ItemList`, breadcrumb), jeden na treść
   (`llms.txt`, komentarze w `services.tsx`)
5. Po deployu odświeżyć statusy `☐` → `☑` w `PLAN-POPRAWEK-2026-08-05.md`. Bez tego kolejna
   sesja przeczyta plan literalnie i zrobi to drugi raz
6. Wkleić blok z sekcji 5 do `CHANGELOG.md`

**Warunek stopu:** jeśli `build` nie przechodzi — nie commituj, wróć z komunikatem błędu.

### Blok B — piętnaście minut, które odblokowuje trzy audyty (sam, panel)

1. Ustal, gdzie trafiają maile z formularza i kto ma dostęp do `marcin@szabunia.pl`
   (`ADS2608-01`, §12.6 — „pytanie numer jeden tego audytu")
2. Test end-to-end: wyślij formularz z `szabunia.pl/kontakt` z dopiskiem „test 05.08" →
   GA4 DebugView (czy leci i pod jaką nazwą) → Ads → Cele (czy stan zmienia się na
   „Rejestruje konwersje" w 24 h) → **obie skrzynki**
3. Ads → Cele → Podsumowanie → Konwersje: **co jest zaimportowane**. To warunek startu dla
   `PELNY2608-05`; jeśli zaimportowane jest `contact_submit`, dołożenie `generate_lead`
   podwoi liczenie zamiast naprawić pomiar
4. Sitelinki „Portfolio" i „Kontakt" na `/portfolio` i `/kontakt` — nietknięte od 4 marca,
   5 minut, najtańsza poprawka w całym audycie Ads. Przed edycją zapisz obecny URL

Jeśli mail nie dotarł do żadnej skrzynki — problem jest po stronie dostarczalności Resend,
nie Ads, i to osobny, poważniejszy finding.

### Blok C — cztery zdania do rozstrzygnięcia (przy stole, ok. 15 min)

Każde jest dziś na produkcji w dwóch wersjach. Wariant A przy każdym to rekomendacja audytu.

| # | Rozjazd | Wersja kanoniczna | Koszt niepodjęcia |
|---|---|---|---|
| **D1** | `blog.ts:373` obiecuje bezterminowe darmowe przekładanie lotu | `services.tsx:543` — jeden powrót w cenie, kolejne podejście 300 zł + dojazd | 600–900 zł na zleceniu |
| **D2** | `blog.ts:179` „od 4 osób" vs `:469` „od 2 osób" | kanon: od 2 osób (`services.tsx:212`, `faq.ts:16`, `llms.txt:18`) | 1 520 zł na leadzie, który odpada bez pytania |
| **D3** | `faq.ts:44` obiecuje bezwarunkowo darmową zmianę terminu | `Warunki.tsx:102` — jednorazowo, kolejna 20% wartości. `faq.ts` zasila `FAQPage` JSON-LD strony głównej, więc niepełna wersja idzie do Google | 2 360 zł przy zespole 10-osobowym |
| **D5** | `blog.ts:1009` druga kotwica „od 55 zł za sztukę" przy minimum 600 zł | decyzja z 04.08: jedna kwota „od" na usługę, bez drabinek | klient czyta 600 zł jako podwyżkę o 45% |

**D4** (dron w cenie pakietu czy +200 zł) rozstrzyga się z `cennik_2026_07_v3.md` — patrz 3.2,
nie wymaga czekania na D-01. Dziś `llms.txt:19` mówi „w cenie każdego pakietu",
a `services.tsx` komentuje „+200 zł". `llms.txt` czytają asystenci AI i cytują wprost.

---

## 5. Blok do wklejenia w CHANGELOG.md

```
## 2026-08-05 — Cztery audyty i wdrożenie poprawek P1–P2 (strona, Ads, wizytówka, cennik)

**Kontekst:** jeden dzień, cztery audyty tego samego dnia + wdrożenie pozycji
niewymagających decyzji. Plan zbiorczy: `05_Strona_WWW/marcinszabunia/docs/sesje/PLAN-POPRAWEK-2026-08-05.md`.

### Audyty
- `AUDYT-PELNY-2026-08-05.md` — strona, moduły A–E, 66 findingów (0×P0, 5×P1, 24×P2), ocena 84/100
- `AUDYT-GOOGLE-ADS-2026-08-05.md` — konto 786-864-4697, 14 pozycji czynnych, ocena 51/100
- `AUDYT-WIZYTOWKA-2026-08-05.md` — Profil Firmy w Google, 11 findingów, 3 wdrożone tego dnia
- cztery szkice „cennik od zera" w `02_Cenniki/_szkic_*` — 14 decyzji, status: SZKIC, nie wchodzi w życie

### Kod (commity)
- `e2a0cd3`, `82715a3`, `7425bec` — próg PORTRET START 700 zł, jedna kwota „od", domknięcie kotwicy
- `5a5b63a` — sesja zespołowa 1 400 zł za dwie osoby + 120 zł za każdą kolejną
- `f5dd9f4` — rozstawienie mobilnego studia 30 minut zamiast 20

### Wizytówka Google (w moderacji od 05.08)
- link witryny z UTM (`utm_source=google&utm_medium=organic&utm_campaign=gbp`)
- opis firmy w nowej kolejności zdań, 639 znaków
- odpowiedź na opinię z 24.06

### Decyzje
- ceny szkicowe NIE wchodzą w życie; obowiązuje `cennik_2026_07_v3.md`, `kanon.json` nietknięty
- `generate_lead` nie dołożony do `CTA.tsx` do czasu sprawdzenia, co Ads importuje jako konwersję
- D1–D12 (strona) i D-01…D-14 (cennik) otwarte
```

---

## 6. Co zostaje na inny dzień i dlaczego

- **`blog.ts` warunek po warunku, nie kwota po kwocie** (174 KB, 26 wpisów). Wniosek nadrzędny
  audytu: *„domykanie treści nie ma sensu, dopóki `src/data/blog.ts` nie zostanie przejrzany
  w całości pod kątem warunków handlowych"*. Dziś trzy rozjazdy warunków wyszły z bloga
  i to nie jest przypadek — poprawka z 04.08 objęła `services.tsx` i minęła bloga
- **Kampania po opinie w GBP** — 10 opinii przy 1 000+ sesjach; audyt nazywa to jedyną pozycją,
  która realnie rusza widoczność. Cel: 25 opinii na 05.11.2026. Blokuje decyzja o zakresie puli
  i brak jednej liczby: ile nazwisk jest w puli klientów 2025–2026
- **Cennik, D-01 i pochodne** — do czasu rozstrzygnięcia R-1 (sekcja 3.1) i trzech zmierzonych
  wierszy w `Log_realizacji_2026.xlsx`. Wyjątek: trzy pozycje v3, które są dziś pod kosztem
  własnej pracy niezależnie od wyboru stawki (dogrywka po sesji 37 zł/h na koncie, wynajem studia
  do 2 h minus 43 zł na sztuce, dron samodzielny 97 zł/h) — to naprawa arytmetyki, nie podwyżka,
  i nie musi czekać na styczeń
- **PageSpeed Insights** — 3 minuty, szósty audyt z rzędu bez tej liczby. Ocena „wydajność"
  w audycie strony to wprost `N`. Zrób przy najbliższym deployu, bo inaczej siódmy audyt
  też jej nie będzie miał

---

## Daty kontrolne

| Kiedy | Co | Źródło |
|---|---|---|
| 06.08 rano | czy baner moderacyjny zniknął z trzech zmian w GBP | `AUDYT-WIZYTOWKA §9` |
| do 15.08 | test end-to-end przechodzi i widać go w Ads jako `contact_submit` | `AUDYT-GOOGLE-ADS §12.1` |
| 19.08 | re-audyt strony, 12 metryk z jednej serii pomiarowej | `AUDYT-PELNY §11.4` |
| 02.09 | re-audyt Ads, okno 05.08–01.09 | `AUDYT-GOOGLE-ADS §11` |
| 05.11 | re-audyt wizytówki, 8 metryk, 5 fraz local pack | `AUDYT-WIZYTOWKA` |

---

*Zestawił: Claude (Cowork), 05.08.2026, 16:10. Stan repo i dysku odczytany, nie wspominany.
Każda liczba w tym pliku ma źródło w raporcie z tego dnia albo w `git diff` drzewa roboczego.
Liczby bez potwierdzonego źródła są jawnie nazwane w sekcji 3.1.*
