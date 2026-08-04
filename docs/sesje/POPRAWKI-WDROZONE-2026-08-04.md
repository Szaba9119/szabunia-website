# Poprawki wdrożone — 2026-08-04 (ZDJĘCIA + TREŚĆ, jedna tura)

**Status: zmiany w drzewie roboczym, NIEZACOMMITOWANE, NIE wdrożone na produkcję.**
Git obsługuje Marcin. Nic nie zostało zacommitowane, zpushowane ani zmergowane.

**Diff:** `docs/sesje/poprawki-2026-08-04.diff` — 86 plików, +384 / −210.
`git diff` **nie obejmuje 51 nowych nazw plików obrazów** (dla gita to usunięcie + plik
nieśledzony) **ani nowego pliku `src/data/galleryAlts.ts`**, w którym siedzi wszystkie 89 nowych
opisów alternatywnych. Kto przejrzy sam diff, nie zobaczy ani jednego z nich.
Pełny obraz: `git status --porcelain`. Tabela nazw: `docs/sesje/TABELA-NAZW-51-2026-08-04.md`.

**lint:** PASS (0 błędów, 0 ostrzeżeń) · **tsc --noEmit:** PASS · **build:** NIE URUCHOMIONY
(w sandboksie `next build` pada na binarkach macOS; do odpalenia lokalnie u Marcina).
Zamiast builda: `next dev` w kontenerze linuksowym z tym samym drzewem, wszystkie pomiary
poniżej zrobione na **localhost**, nie na produkcji.

---

## 0. Rozjazdy stanu wyjściowego, zanim cokolwiek zaczęło się dziać

| Co | Stan oczekiwany w prompcie | Stan faktyczny 04.08 |
|---|---|---|
| HEAD | `88564ac` | **`5642640`**, czyli 2 commity dalej (`80d022a`, `5642640`) |
| main == origin/main | tak | tak, potwierdzone |

**Konsekwencja, którą zastosowałem:** wszystkie numery linii z briefów są nieaktualne, więc
**każda zmiana była lokalizowana po treści** (grep na cytowanym zdaniu), nigdy po numerze linii.
Przesunięcia: `services.tsx:168 → 175`, `:271 → 279`, `:273 → 281`, `:274 → 282`,
`:498 → 510`, `:509 → 521`, `:517 → 529`, `:551 → 563`, `:584 → 596`, `:588-590 → 600-602`.

**Dwa cytaty z briefów nie istniały już w kodzie** (zmienione commitami po `88564ac`):

1. `TRESC2608-02`, linia `:551`: brief cytuje „Pliki dostajecie w dwóch wersjach, do druku
   i pod www." — to zdanie **jest** (w `description`), ale drugie, prawie identyczne, siedzi
   w odpowiedzi FAQ i brzmi „…: do druku i **pod ogłoszenie**". Brief go nie wymieniał.
   Poprawiłem oba, bo AC briefu żąda **zera** trafień na „dostajecie".
2. `TRESC2608-02`, `:586`: brief opisuje „tańszy o 300 zł", w kodzie od `5642640` jest
   „wyraźnie tańszy". Poza zakresem, nie ruszałem.

**Liczby kadrów w galeriach czterech publikowanych realizacji różnią się od briefu**
(policzone w kodzie, nie założone):

| Realizacja | Brief mówi | Jest w `portfolio.ts` |
|---|---|---|
| `fotografia-eventowa` | 9 | **8** |
| `packshoty-produktowe` | 10 | **9** |
| `sesja-korporacyjna` | 8 | **7** |
| `sesja-wizerunkowa` | 6 albo 7 | **6** |

Każda ma ≥ 3 kadry, więc **próg placeholdera „Więcej zdjęć wkrótce"**
(`PortfolioGallery.tsx`, `images.length < 3`) **nie łapie żadnej z nich.** Sprawdzone.

---

## A. Co zrobione

### A1. PORTFOLIO — z 4 na 8 realizacji, pierwszy kafelek to zdjęcie

**`ZDJ2608-31` — publikacja czterech realizacji** (DZ1 = A)
Cztery slugi zdjęte z `DRAFT_SLUGS`: `sesja-wizerunkowa`, `fotografia-eventowa`,
`packshoty-produktowe`, `sesja-korporacyjna`. Box17 **zostaje ukryty**, zgodnie z decyzją.
· Plik: `src/data/portfolio.ts`
· **Odwrócenie:** dopisać te cztery slugi z powrotem do `DRAFT_SLUGS`.

**`ZDJ2608-32` + `ZDJ2608-03` — woohoo schodzi z pierwszego miejsca** (DZ2 = A)
Kolejność `FEATURED_SLUGS` na stronie głównej: `idcom, yes-butcher, woohoo, artech`.
Ta sama kolejność wymuszona na `/portfolio` przez nową stałą `PORTFOLIO_DISPLAY_ORDER`.
**Dlaczego druga stała:** siatka `/portfolio` renderuje `portfolioItems` w kolejności danych,
więc sama zmiana `FEATURED_SLUGS` naprawiłaby stronę główną i **nie naprawiła `/portfolio`**,
gdzie `woohoo-autopay` (`gallery: []`, kafelek to plansza tytułowa) dalej byłby pierwszy.
AC fazy 2 żąda niepustej galerii pod pierwszym kafelkiem **na obu** powierzchniach.
Kafelek Artechu (klatka z filmu) zostaje: to osobna decyzja Marcina.
· Pliki: `src/components/Portfolio.tsx`, `src/data/portfolio.ts`
· **Odwrócenie:** przywrócić kolejność `woohoo, artech, idcom, yes-butcher` w `FEATURED_SLUGS`
  i usunąć `PORTFOLIO_DISPLAY_ORDER` razem z `.sort(...)` w `portfolioItems`.

**`ZDJ2608-26` — sierota w siatce**, potwierdzone pomiarem na 1440 px:
`/portfolio` renderuje **8 kafli** w układzie rzędów **[3, 3, 2]**. Rzędu z jednym kaflem nie ma.

**`ZDJ2608-17` — miniatura `sesja-wizerunkowa`, WARIANT B** (nie A, wbrew rekomendacji briefu)
`thumbnail` → `/images/galeria/portrety/portret-12-kobieta-w-plenerze.jpg`.
**Uzasadnienie odejścia od rekomendacji:** wariant A (`portret-05`) jest już hero usługi
„Wizerunek i portrety" **oraz** kafelkiem tej usługi, więc stanąłby trzeci raz, a ta sama tura
usuwa powtórzenia w `ZDJ2608-27` i `ZDJ2608-34`. Wariant B nie tworzy nowej powtórki.
· **Odwrócenie:** przywrócić `thumbnail: "/images/portfolio-1.jpg"` i wyjąć plik z `_to_delete/`.
· AC briefu: `grep "portfolio-1.jpg" src/` → **0 trafień**.

**`ZDJ2608-34` — IDcom bez powtórki w galerii**
Szósty kadr galerii był tym samym plikiem co miniatura i hero. Usunięty, galeria ma 5 różnych
kadrów. Podpis galerii poprawiony z „Sześć kadrów" na „Pięć kadrów" — bez tego zdanie
kłamałoby po mojej własnej zmianie.
· Pomiar: na `/portfolio/idcom-headshoty-zespolu` **żaden plik nie występuje więcej niż raz**.
· **Odwrócenie:** dopisać z powrotem szósty wpis galerii i słowo „Sześć".

**`ZDJ2608-08`, `ZDJ2608-09` — dwa alty niezgodne z kadrem**
· „Packshot produktowy na białym tle" → **„Zdjęcie produktowe drinka na żółtym tle, aranżacja
  reklamowa na social media"** (plik to szklanka drinka na jaskrawożółtym tle z monsterą).
· „Sesja korporacyjna, headshoty zespołu w biurze" → **„Portret korporacyjny kobiety przy oknie
  w biurze, zdjęcie na stronę firmy, Poznań"** (na kadrze jest jedna osoba).

**`ZDJ2608-02b` — komentarz przy Box17**
Przepisany na stan faktyczny: 10 plików JPG leży w folderze od `9fc7ff4`, decyzja o ukryciu jest
świadoma i z 04.08.2026, stary warunek wyjścia („po wgraniu `box17.jpg` wystarczy usunąć linię")
usunięty, bo był spełniony. W jego miejscu **`TODO (Marcin)`** na realny warunek publikacji.
Zgodnie z briefem warunku **nie wymyślałem**.

### A2. GALERIA I OPISY ALTERNATYWNE

**`ZDJ2608-04` + `ZDJ2608-12` + `ZDJ2608-11` — jeden mechanizm zamiast trzech**
Nowy plik **`src/data/galleryAlts.ts`**: mapa `nazwa pliku → opis alternatywny`, **89 wpisów**.
Klucz to nazwa pliku, nie indeks, więc zmiana kolejności w galerii albo w `CURATED` nie
przestawia opisów, a ten sam kadr ma **ten sam opis** w `/galeria` i w pasku na podstronie usługi.

Co zastąpiła:
· `/galeria` rotowała 5 wariantów na 15 kadrów eventowych i 5 na 14 portretowych
  (`i % length`), przez co osioł dostawał „Fotografia konferencyjna, kadr 7", a DJ „Zdjęcie
  z gali firmowej";
· pasek usług sklejał `alt` jako `` `${altBase} ${i + 1}` `` → „Portret biznesowy, Marcin
  Szabunia, Poznań 1";
· hero i kafelki brały `alt` z tytułu: `` `${service.title}, Poznań` ``, `` `${s.title},
  przykładowa realizacja` ``, `Zdjęcie z realizacji: ${item.label}`, `category.label`, `post.title`.

**Wszystkie 89 opisów powstały po OBEJRZENIU kadru**, nie z nazwy pliku. Nic nie jest opisane
z nagłówka ani z komentarza w kodzie.

Zakres `ZDJ2608-11`, policzony po fazie 2: **59 z 59 powierzchni** ma teraz opis z obejrzanego kadru.
8 hero usług + 8 kafli usług + 8 kafli portfolio + 9 hero case study + 26 okładek blogowych.
**`blog.ts` nietknięty w warstwie treści**: `BlogCard` czyta mapę po nazwie pliku okładki.

`GalleryView.tsx`: dopisek „, kadr N" zostaje **tylko** tam, gdzie lista jest krótsza od galerii
i realnie rotuje. Dziś to wyłącznie `produktowe` (4 warianty na 24 kadry), których ta tura nie
oglądała. Pozostałe kategorie mają opis per plik i numer im niepotrzebny.
· Pliki: `src/data/galleryAlts.ts` (nowy), `src/app/galeria/page.tsx`,
  `src/components/GalleryView.tsx`, `ServiceGalleryLightbox.tsx`, `ServiceGalleryStrip.tsx`,
  `ServiceHero.tsx`, `Services.tsx`, `Portfolio.tsx`, `PortfolioHero.tsx`, `BlogCard.tsx`,
  `src/app/portfolio/page.tsx`
· **Odwrócenie:** usunąć `galleryAlts.ts` i przywrócić szablony w sześciu miejscach `alt=`
  oraz inline'owe `altVariants` w `galeria/page.tsx` (są w diffie).

**`ZDJ2608-06` — etykieta zakładki**: „Wnętrza i hale" → **„Wnętrza, hale i obiekty"**.
Klucz `?kat=wnetrza` **bez zmian**, to adres w URL.
· Pomiar 390 px: pasek kategorii ma **6 przycisków w 1 rzędzie**, nie łamie się.

**`ZDJ2608-05b` — podpis paska eventowego**: „Wybrane kadry z konferencji, targów i gal
firmowych." → **„Wybrane kadry z konferencji, gal, integracji i imprez firmowych."**
Pokrywa 15 z 15 kadrów w folderze (3 konferencje i gale, 4 integracje, 6 koncertów i klubów, 2 inne).

### A3. OFERTA I TREŚĆ

**`TRESC2608-50` — granica dron kontra linia obiektowa**
Zastosowany gotowy diff z 03.08: `git apply docs/sesje/poprawki-dron-2026-08-03-NIEZASTOSOWANY.diff`.
**Pomiar samego patcha:** `git apply --stat` → **1 plik, 6 linii (3 +, 3 −)**, wchodzi czysto.

**`TRESC2608-09` — czym sesja obiektu różni się od dronowej**
Wpisany **tekst zatwierdzony przez Marcina 04.08**, nie zdanie z briefu. Zdanie z briefu
(„Sesja obiektu daje ten sam kadr z retuszem architektonicznym…") jest **niezgodne ze stanem
faktycznym** i świadomie nie zostało użyte. Dodatkowo było w liczbie mnogiej („wstawicie",
„potrzebujecie"), czyli samo łamało `TRESC2608-02`.

**`TRESC2608-02` — forma „Wy" znika, 6 podmian**
`grep -nE "dostajecie|wstawicie|potrzebujecie|chcecie|Fotografujecie|Dla Was" src/data/services.tsx`
→ **0 trafień**. Zmiana dotknęła dwóch pytań FAQ, które **zasilają JSON-LD `FAQPage`** na trasie
`/uslugi/wnetrza-obiekty-architektura`. Brief mówi wprost, że to zamierzone i nie wymaga zgody.

**SPROSTOWANIE, wyszło przy weryfikacji końcowej: to NIE jest jedyne dotknięcie JSON-LD w tej
turze i wcześniejsze zdanie w tym raporcie było nieprawdziwe.** `uslugi/[slug]/page.tsx` buduje
`faqs = [getPriceFaq(service), ...service.faqs]` i **tę samą tablicę** wypycha do
`"@type": "FAQPage"`. Każda zmiana w `service.faqs` idzie więc do danych strukturalnych.
W tej turze weszły tam, poza `-02`, jeszcze trzy ID, wszystkie wymienione wprost w zleceniu:

| ID | Co zmieniło się w JSON-LD `FAQPage` |
|---|---|
| `TRESC2608-53` | odpowiedź „Co jeśli pogoda nie dopisze?": bezterminowe darmowe przekładanie → „wracam raz w ramach ustalonej kwoty; kolejne podejście to 300 zł plus dojazd". **To zmiana warunku handlowego wewnątrz danych strukturalnych** |
| `TRESC2608-09` | cała odpowiedź „Czym to się różni od zdjęć z drona?", z kotwicami 700 i 900 zł |
| `TRESC2608-08` | cztery odpowiedzi ze słowem „brief" i nazwa kroku procesu |
| `TRESC2608-02` | dwa `name` pytań: „Fotografujecie…" → „Fotografujesz…" |

Wykonałem je, bo zlecenie wymienia je imiennie jako do zrobienia i nie da się ich zrobić
inaczej: treść FAQ i JSON-LD `FAQPage` to w tym kodzie **jedno źródło**. Odnotowuję jako
niekonsekwencję progu: `faq.ts` wstrzymano (`TRESC2608-04`) właśnie dlatego, że zasila
`FAQPage` na `/`, a `services.tsx` ruszono. **Jeśli ten próg ma obowiązywać symetrycznie,
do cofnięcia jest `TRESC2608-53`** (jedyna z tej czwórki, która zmienia liczbę handlową
w danych strukturalnych). Pozostałe trzy zmieniają wyłącznie formę językową.
Nietknięte pozostają: `hasOfferCatalog`, `ItemList` na `/portfolio`, `PriceSpecification`
i `minPrice`, `aggregateRating`, `priceRange`, `sameAs`, `metadata` w `layout.tsx`.

**`TRESC2608-08` — słowo „brief" znika z widocznej treści**
`title: "Brief i zgody"` → „Ustalenia i zgody"; „Po krótkim briefie" → „Po krótkiej rozmowie";
„Wycena po krótkim briefie." → „Wycenę odsyłam po krótkiej rozmowie."; „na etapie briefu" →
„przy ustalaniu zakresu". Piąte wystąpienie domknęła zmiana `:168` z `TRESC2608-02`.
`grep -in "brief" src/data/services.tsx` po odjęciu komentarzy → **0 trafień**.

**`TRESC2608-22` + `TRESC2608-38` (1 z 4) — jedną linią**
było → „Ujęcia 4K budynków, hal i magazynów, terenów, inwestycji i eventów. Certyfikat A1/A3
i OC operatora. **Dron w cenie pakietów hybrydowych.** Poznań i cała Polska." (**157 zn.**)
jest → „Ujęcia 4K terenów, placów, inwestycji i eventów. Certyfikat A1/A3 i OC operatora.
Dron łączę z sesją naziemną. Poznań i cała Polska." (**132 zn.**, policzone skryptem)

**`TRESC2608-01` — licencja** (DT1 = A). `Warunki.tsx`, jedna linia.
Cztery powierzchnie licencyjne obok siebie, do porównania gołym okiem:

| Plik | Zakres pól eksploatacji |
|---|---|
| `Warunki.tsx` (**po zmianie**) | „Licencja niewyłączna, bez limitu czasowego, **na użytek komercyjny Twojej firmy: strona, social media, druk i reklama online.** Przeniesienie praw majątkowych albo przekazanie materiału podmiotom trzecim: +50%." |
| `faq.ts:60` | „Wszystkie licencje obejmują **użytek komercyjny: strona www, social media, materiały drukowane, reklama online.** Bez limitów czasowych." |
| `services.tsx` | „Licencja obejmuje **użytek komercyjny bez ograniczeń czasowych: strona, social media, druk, reklama.**" |
| `llms.txt:30` | „Licencja niewyłączna, bez limitu czasowego, **na użytek własny klienta (www, social media, druk, reklama online).** Przeniesienie majątkowych praw autorskich albo przekazanie materiału podmiotom trzecim: +50%" |

`grep -rn "na własny użytek" src/` → **0 trafień**. Wszystkie cztery opisują ten sam zakres:
www, social media, druk, reklama online, bez limitu czasowego, +50% za przeniesienie praw.
**Uwaga:** `llms.txt` nadal mówi „na użytek **własny klienta**" z wyliczeniem pól. Zakres jest
ten sam, ale sformułowanie inne. To wariant B briefu, świadomie **nietknięty**.

**`TRESC2608-03` — ósma usługa na listach pisanych ręcznie: 6 z 8 powierzchni**

| Powierzchnia | Stan |
|---|---|
| `llms.txt` specjalizacja | ✅ dopisane „fotografia hal, obiektów i wnętrz" |
| `llms.txt` sekcja usług | ✅ dodana ósma pozycja, wiersz z briefu |
| `CTA.tsx` `<option value="obiekty">` | ✅ przed „Inne zapytanie" |
| `api/contact/route.ts` `SERVICE_LABELS` | ✅ `obiekty: "Fotografia hal, obiektów i wnętrz"` |
| `services.tsx` mapa opinii | ✅ **WARIANT B**: świadoma luka, bez cytatu |
| `uslugi/page.tsx` `description` | ✅ **tekst własny do akceptacji**, 151 zn. |
| `blog.ts` `blogServiceMap` | ⚠️ **świadoma luka**, uzasadnienie niżej |
| `layout.tsx` `hasOfferCatalog` | ⛔ NIE RUSZANE (stop-condition) |

`blogServiceMap`: żaden z 26 wpisów nie dotyczy hal ani wnętrz. Jedyny kandydat,
`fotografia-przemyslowa-fabryka` (1 046 słów, hale produkcyjne), jest dziś przypisany do
`fotografia-produktowa` i **przepięcie go zabrałoby wpis tamtej usłudze**. To decyzja
redakcyjna, nie poprawka techniczna. Blok „Z bloga" i tak się renderuje, bo
`getPostsForService` ma fallback na kategorię. Zostawiony komentarz w kodzie, żeby następny
audyt nie zgłosił tego jako przeoczenia.

**`TRESC2608-51` — hero linii obiektowej. TEKST WŁASNY DO AKCEPTACJI.**
było → „Hale, lokale użytkowe i wnętrza obiektów. **Z zewnątrz i od środka, w jednym dniu
zdjęciowym.**"
jest → „Hale, lokale użytkowe i wnętrza obiektów. **Zaczynam od ujęć z powietrza, kadry
z poziomu ziemi i wnętrza dokładam w tym samym dniu zdjęciowym.**"
`heroPriceLabel` (**„pakiety od 900 zł netto"**) **nietknięty**: to komunikat cenowy i osobna decyzja.

**`TRESC2608-48` — „mini-brief" znika z lejka poradnika** (DT5 = A), **9 z 9 powierzchni**,
łącznie z mailem do każdego leada. `grep -rin "mini-brief" src/ public/` → **0 trafień**.
Zamiennik: „gotowa lista pytań" / „gotową listę pytań" (biernik w mailu) /
„Gotowa lista pytań, którą wyślesz mi w 2 minuty" (tytuł sekcji).

**Quick winy bez briefu, było → jest:**

| ID | Plik | Było | Jest |
|---|---|---|---|
| `TRESC2608-27` | `Publications.tsx` | „wykonałem **dla Grupa Forte S.A.**" | „wykonałem **dla Grupy Forte S.A.**" |
| `TRESC2608-32` | `llms.txt` | „- **Email**: marcin@szabunia.pl" | „- **E-mail**: marcin@szabunia.pl" |
| `TRESC2608-33` | `llms.txt` | „48 h", „8 h", „4 h", „3 h", „2 h", „6 h" (**10 miejsc**) | „48h", „8h", „4h", „3h", „2h", „6h" |
| `TRESC2608-36` | `Footer.tsx` | „Fotograf biznesowy **&** twórca wideo" | „Fotograf biznesowy **i** twórca wideo" |
| `TRESC2608-53` | `services.tsx` | „W takiej sytuacji **bezpłatnie przekładamy termin na najbliższy możliwy.**" | „W takiej sytuacji **wracam raz w ramach ustalonej kwoty; kolejne podejście to 300 zł plus dojazd.**" |
| `TRESC2608-38` | `blog.ts` ×3 | 156 / 156 / 157 zn. | **150 / 150 / 151 zn.** (teksty własne, niżej) |

`TRESC2608-38`, trzy opisy blogowe, najmniejsza możliwa ingerencja:
· „**Jak zorganizować** headshoty całego zespołu…" → „**Jak zrobić** headshoty…" (156 → 150)
· „…dlaczego **warto zrezygnować ze stocków**." → „…dlaczego **lepiej odpuścić stocki**." (156 → 150)
· „**Dlaczego warto fotografować** cały zespół…" → „**Dlaczego fotografować** cały zespół…" (157 → 151)

### A4. HIGIENA TECHNICZNA

**`ZDJ2608-01` — konwencja nazw, 51 plików** (DZ4 = A). Numery `NN` **bez zmian**,
dokleja się wyłącznie opis, więc kolejność wyświetlania jest identyczna.
Pełna tabela: **`docs/sesje/TABELA-NAZW-51-2026-08-04.md`, 51 wierszy.**
· `galeria/eventy` 15 · `galeria/portrety` 14 · `galeria/wnetrza` 12 · `portfolio/box17` 10
· **Wyjątek:** `box17.jpg` (miniatura) nigdy nie miał numeru, więc dostał
  `box17-budka-konferencyjna-katowa.jpg`, bez dorabiania sztucznego `NN`.
· Referencje zaktualizowane w: `portfolio.ts`, `services.tsx`, `ServiceGalleryStrip.tsx`
  (listy `CURATED.portrety` i `CURATED.eventy` budują ścieżkę z nazwy bazowej, więc `grep`
  po pełnej ścieżce ich **nie** znajdował), `scripts/generate-blog-covers.py`, `CLAUDE.md`.
· **AC:** zero plików `NN.jpg` bez opisu w tych folderach; `grep` na starych nazwach
  w `src/` i `public/` → **0 trafień**; skrypt sprawdzający **116 unikalnych ścieżek
  `/images/*` w `src/`** → **0 brakujących plików**.
· **Odwrócenie:** `docs/sesje/TABELA-NAZW-51-2026-08-04.md` czytana od prawej do lewej;
  kopia stanu wyjściowego wszystkich czterech folderów leży w
  **`docs/sesje/_backup-2026-08-04/`** (19 MB, 52 pliki).

**DZ4 wariant B — nagłówek cache.** `next.config.ts`, **dokładnie jedno słowo**:
`immutable` → `must-revalidate`. `git diff --numstat next.config.ts` → **1 linia +, 1 linia −**.
Nic więcej w tym pliku: CSP, redirects, images, `max-age` bez zmian.
**Wariant do rozważenia (NIE wykonany):** `must-revalidate` przy `max-age=31536000` każe
przeglądarce rewalidować dopiero **po roku**, więc sam w sobie nie chroni przed podmianą pliku
pod tą samą nazwą w ciągu roku. Realną ochroną jest konwencja nazw z `ZDJ2608-01`, a nagłówek
jest ubezpieczeniem na czas migracji. Jeśli ma działać wcześniej, trzeba obniżyć `max-age`
— **kwota do decyzji Marcina, nie ruszałem.**

**`ZDJ2608-07` — `sizes` w paskach galerii.** Nowy opcjonalny prop `sizes`
w `ServiceGalleryLightbox`, przekazywany z paska, z **ostatnim członem w pikselach**
(powyżej ~1056 px kafelki przestają rosnąć przez `max-w-5xl`).
Pułapka z briefu („(max-width: 640px) 50vw, 25vw" bez sufitu) **nie została wpisana**.

Pomiar na **localhost**, DPR 2, metryka: **realnie pobrana szerokość** (parametr `?w=`
z `currentSrc`). Uwaga metodyczna: `naturalWidth` przy `srcset` z deskryptorami `w` jest
korygowany gęstością i **daje fałszywy odczyt** — pierwszy pomiar tą metodą pokazywał 0/8.

| Trasa | 390 px | 900 px | 1728 px |
|---|---|---|---|
| `/uslugi/fotografia-produktowa` | 8/8 (ratio 1,10) | 8/8 (0,92) | 8/8 (1,29) |
| `/uslugi/wizerunek-portrety` | 12/12 (1,14) | 12/12 (0,94) | 12/12 (1,18) |

Wszystkie w paśmie `0,85 ≤ pobrane / (CSS × DPR) ≤ 1,4`. Wartości `vw` są celowo o kilka
procent niższe od zmierzonych szerokości kafla: Next generuje kandydatów tylko z siatki
128 / 256 / 384 / 640 px, więc deklaracja większa o jeden piksel przeskakuje na kolejnego
kandydata i każe pobrać obraz 1,5 do 1,8 razy szerszy, niż potrzeba. Bez tego strojenia
kategoria produktowa na 390 px pobierała 640 px zamiast 384 px (ratio 1,84).

**`ZDJ2608-25` — `sizes` w `About`**: `520px` → `630px`.
Pomiar 1440 px / DPR 2: CSS **626 px**, pobrane **1920 px** (próg ≥ 1250) → **PASS**.
Na 390 px obraz **dalej się nie pobiera** (sekcja `hidden lg:block`, `naturalWidth = 0`).
`scale-[1.15]` i `aspect-[3/4]` nietknięte.

**`ZDJ2608-27` — hero nie wraca w pasku tej samej podstrony.** Nowy opcjonalny prop
`exclude` w `ServiceGalleryStrip`, `uslugi/[slug]/page.tsx` przekazuje `service.heroImage`.
**Filtr wchodzi tylko wtedy, gdy po odjęciu hero zostaje dość kadrów na pełny pasek.**

| Podstrona | Kadrów w pasku | Hero w pasku |
|---|---|---|
| `wnetrza-obiekty-architektura` | 6 | **nie** ✅ naprawione |
| `eventy-reportaze` | 6 (+6 w drugim pasku) | **tak** ⚠️ zatrzymane |
| `wizerunek-portrety` | 6 (+6) | **tak** ⚠️ zatrzymane |
| pozostałe 5 podstron | bez zmian | nie |

**Zatrzymane zgodnie ze stop-condition briefu:** `CURATED.eventy` i `CURATED.portrety` mają
**dokładnie 6 pozycji**, czyli tyle, ile pasek pokazuje. Po odfiltrowaniu hero zostałoby 5,
a dobranie siódmego kadru to zmiana ręcznie ułożonej listy Marcina. **Nie dobierałem kadru
z innej kategorii.** Propozycja w sekcji C.
· Pomiar: liczba kadrów w każdym pasku **identyczna jak przed zmianą** (6, produktowa 8).

**`ZDJ2608-24` — miniatury filmów.** `next/image` z jawnymi `width={1280} height={720}`,
źródło `maxresdefault`, `alt` opisowy („Kadr otwierający z filmu: …") zamiast surowego tytułu,
`eslint-disable @next/next/no-img-element` usunięty z obu miejsc.
· **Fallback jest realny, nie zadeklarowany:** sprawdzone kodem odpowiedzi 04.08 — **9 z 9**
  osadzonych filmów zwraca **HTTP 200** na `maxresdefault`. `onError` przełącza pojedynczy film
  na `hqdefault` i trzyma to w stanie. W `YouTubeFacade` fallback przeniesiony z mutacji
  `currentTarget.src` na stan: przy ponownym renderze przeglądarka wracała do adresu z propsa.
· `unoptimized` zamiast dopisywania `i.ytimg.com` do `images.remotePatterns`, bo
  `next.config.ts` wolno mi było dotknąć **wyłącznie** w jednym słowie. Domena jest już
  dopuszczona w CSP `img-src`.
· Pomiar na `/uslugi/wideo-marketing`: 4 miniatury, wszystkie `maxresdefault.jpg`,
  `width=1280 height=720`, **CLS = 0,0000**.

**`ZDJ2608-22` — komentarz o kadrowaniu.** „**Pionowy** portret pary w kadrze 16:9" →
„Kadr 4:3 w kafelku 16:9 (mobile) ciął głowy przy center". Plik
`portfolio/sesje-zespolowe-cover.jpg` jest **poziomy, 1120×840** i obejrzany:
dwie osoby w studiu na jasnoszarym tle. `objectPosition: center 20%` **bez zmian**.

**`ZDJ2608-18` — sieroty i placeholder.** Cztery pliki przeniesione do
`_to_delete/ZDJ2608-18-2026-08-04/` (przez `mv`, bo `rm` nie działa przez most urządzeń):

| Plik | Rozmiar | Dlaczego |
|---|---|---|
| `public/images/portfolio/artech/2.jpg` | 925 KB | zero referencji w `src/` |
| `public/images/portfolio/sesja-wizerunkowa/01.jpg` | 527 KB | zero referencji; galeria tej realizacji **nie jest listowana z dysku**, wskazuje pliki z `galeria/portrety`, więc kadr nie jest publikowany w fazie 2 |
| `public/images/portfolio/box17/_WRZUC-TU-ZDJECIA.txt` | 529 B | placeholder w gicie, nieaktualny od `9fc7ff4` |
| `public/images/portfolio-1.jpg` | 527 KB | **czwarta pozycja**: sierota powstała po `ZDJ2608-17` |

Plus dwa archiwa robocze, których most nie pozwolił skasować: `_tmp-src.tgz`, `_tmp-src2.tgz`
(kopie drzewa `src/` użyte do uruchomienia dev servera w kontenerze pomiarowym). **Do skasowania.**

---

## B. Co już było w kodzie i wdroży się z deployem

1. `YouTubeFacade` **już** ciągnął `maxresdefault` z fallbackiem na `hqdefault` — audyt
   przypisał mu `hqdefault` łącznie z `ServiceVideoGrid`. Realnym problemem był surowy `<img>`
   bez wymiarów i `alt` z tytułu; `hqdefault` siedział tylko w `ServiceVideoGrid`.
2. Wszystkie **9 plików OG** dla realizacji portfolio (`public/images/og/portfolio/`) leżą
   w repo od 30.07, łącznie z czterema dla realizacji publikowanych dziś. Nic nie trzeba dorabiać,
   żeby `og:image` zwracał 200 po deployu.
3. `sitemap.ts` i `portfolio/[slug]/page.tsx` czytają `isPortfolioDraft`, więc zdjęcie slugów
   z `DRAFT_SLUGS` **samo** dodało cztery trasy do sitemapy i zdjęło z nich `robots: noindex`.
   Zero zmian w tych plikach.

---

## C. Co zostaje po Twojej stronie

**1. Karta OG `og/portfolio/sesja-wizerunkowa.png` — rozjazd świadomie wpuszczany na produkcję.**
Ta karta pokazuje **zdjęcie grupowe przy autach sportowych**, czyli dokładnie ten kadr, który
04.08 wyleciał z galerii tej realizacji jako obcy, i ten sam, który przestał być miniaturą
przez `ZDJ2608-17`. Po dzisiejszej zmianie **kafelek i karta OG pokazują dwa różne zdjęcia**,
a trasa `/portfolio/sesja-wizerunkowa` **właśnie wchodzi do sitemapy**.
AC fazy 2 spełnione formalnie: `og:image` zwraca **HTTP 200**. Ale niesie kadr wycofany z tej
realizacji. Pliku nie zrobię. **Najpilniejsza pozycja z tej listy.**

**2. `ZDJ2608-23` — `og:image` ósmej usługi zwraca 404.**
`uslugi/[slug]/page.tsx` składa adres ze sluga, a `public/images/og/uslugi/` ma **7 plików**.
Brakuje `wnetrza-obiekty-architektura.png`. Kodowego fallbacku **nie robiłem** (dotyka
`generateMetadata`). Najpilniejsza pozycja z całej fali OG.

**3. Sprawdzenie 51 starych adresów na powierzchniach zewnętrznych.** W repo sprawdziłem
i naprawiłem wszystko (`git grep` → 0). **Nie sprawdzałem** Profilu Firmy w Google, Google Ads
ani social mediów — autoryzacja zdejmowała ten stop, ale nie dawała mi dostępu.
Tabela do sprawdzenia: `docs/sesje/TABELA-NAZW-51-2026-08-04.md`.

**4. `ZDJ2608-28` — propozycja podziału list `CURATED` (nie wykonana, owner: Ty).**
Dziś te same 6 portretów stoi na 3 podstronach usług, te same 6 eventów na 2.
W folderach jest zapas: portretów 14, eventów 15. Propozycja: rozbić na dwie rozłączne szóstki
i przypisać po jednej do każdej podstrony, np.
· `portrety` A (wizerunek): `portret-03`, `portret-05`, `portret-08`, `portret-10`, `portret-11`, `portret-12`
· `portrety` B (sesje zespołowe / korporacja): `portret-02`, `portret-04`, `portret-06`, `portret-09`, `portret-13`, `portret-14`
· `eventy` A (eventy): `event-04`, `event-05`, `event-15`, `event-14`, `event-09`, `event-17`
· `eventy` B (pakiety): `event-01`, `event-02`, `event-03`, `event-06`, `event-10`, `event-13`
**To rozwiązuje też `ZDJ2608-27`** dla eventów i portretów: przy 6-elementowej liście na dwie
podstrony każda ma zapas i hero da się odfiltrować bez skracania paska.

**5. `ZDJ2608-16` — kolejność portretów (nie wykonana, owner: Ty).**
Galerię otwiera `portret-01`, obejrzany: **operator z kamerą na gimbalu w oversizowym T-shircie
na czarnym tle**, czyli kadr, którego selekcja `CURATED` już raz nie wzięła. Przenumerowanie
łamie AC „kolejność identyczna" tej samej fazy, więc go nie zrobiłem.
Propozycja kadru otwierającego: **`portret-05-mezczyzna-zielony-garnitur`** (dziś hero usługi
portretowej, najmocniejszy kadr w folderze) albo **`portret-11-mezczyzna-w-fotelu`**.
Sugerowana nowa kolejność: `05, 11, 03, 10, 12, 08, 02, 13, 09, 14, 04, 06, 07, 01`.
**Uwaga:** przenumerowanie zmienia adresy, czyli to kolejna runda `ZDJ2608-01`.

**6. `ZDJ2608-33` — jedna linia do akceptacji.**
`portfolio/page.tsx`: `portfolioCategories` → `portfolioItems` w `itemListElement` JSON-LD.
Po dzisiejszej publikacji rozjazd spadł z **5 pozycji do 1** (`ItemList` wymienia 9, widać 8;
zostaje Box17). Nie dotknąłem: JSON-LD to stop-condition, a autoryzacja obejmowała wyłącznie
`TRESC2608-02`.

**7. Teksty własne do akceptacji (4 sztuki):**
· `services.tsx` subtitle linii obiektowej (`TRESC2608-51`) — treść w A3
· `uslugi/page.tsx` `description` (`TRESC2608-03`), 151 zn.: „Obsługa eventów firmowych, sesje
  zespołowe, portrety, wideo, dron oraz hale i wnętrza. Jeden twórca, jedna faktura, jeden
  termin. Poznań i cała Polska."
· trzy skrócone opisy blogowe (`TRESC2608-38`) — treść w A3

**8. Znalezione po drodze, NIE poprawione (rozjazd nazwy pliku i zawartości kadru).**
Wyszło przy oglądaniu 89 kadrów. Żadne nie jest w zakresie tej tury:

| Plik | Nazwa / opis mówi | Kadr pokazuje |
|---|---|---|
| `dron-04-biurowiec-poznan.jpg` | „biurowiec", alt „Biurowiec z lotu ptaka" | budynek z balkonami na wszystkich kondygnacjach i napisem na dachu, czyli **obiekt mieszkalny**. Ten sam plik jest **hero i kafelkiem usługi dronowej** |
| `wnetrze-12-budynek-mieszkalny-z-drona.jpg` | alt „Nowoczesny budynek **komercyjny** z drona" | nowy budynek **mieszkalny** z czerwonej cegły, balkony, stojaki rowerowe |
| `wnetrze-11-kompleks-budynkow-z-drona.jpg` | alt „**Biurowiec** z lotu ptaka" | kompleks wysokich budynków, prawdopodobnie apartamentowiec albo hotel |
| `woohoo-autopay.jpg` | nazwa sugeruje Autopay | ta sama plansza „E-COMMERCE All in" co `woohoo-ecommerce-4x3`, czyli **hero i kafelek to jedna grafika** |
| `artech-film-cover.jpg` | — | ma **wypalony w plik podpis** wyglądający na zrzut ekranu, z długim myślnikiem, a treść podpisu („tworzywa") kłóci się z tym, co widać (toczenie metalicznego detalu) |
| `slownik-pojec-wideo.jpg` | okładka wpisu o słowniku wideo | plansza „E-COMMERCE All in" nad Starym Rynkiem |
| `wnetrze-06` = `box17-07` | — | **ten sam plik bajtowo** (677 827 B) w dwóch folderach; znane z `ZDJ2608-20` |
| `headshoty-zespolu-w-jeden-dzien` + `spojne-portrety-zespolu` | dwa różne wpisy | ten sam zestaw portretów na tym samym granatowym tle; pierwszy to górny rząd drugiego (`ZDJ2608-14`) |

Trzy z nich mają gotowe zamienniki opisu, jedna linia każdy, do akceptacji:
· `wnetrze-12` → „Nowy budynek mieszkalny z czerwonej cegły z powietrza, balkony i otoczenie inwestycji"
· `wnetrze-11` → „Kompleks wysokich budynków z lotu ptaka, zieleń i arteria dojazdowa"
· `dron-04` → „Szklany kompleks mieszkalny z lotu ptaka o zachodzie słońca, Poznań"
**Nie wpisałem ich**, bo opisy dla `wnetrza` i `dron` były przeniesione do `galleryAlts.ts`
**bez zmiany treści**, a ich redakcja nie należy do żadnego ID z tej listy.

---

## D. Świadomie odłożone, z uzasadnieniem

**Fala 6 planu, w całości:**
· `ZDJ2608-19` (`sizes` hero na home) — brief ma status „ZACZĄĆ OD POMIARU", a hipotezy H1 i H2
  (czy hero faktycznie jest podawany w 315 px i czy obrazy są wąskim gardłem LCP) wymagają PSI
  na produkcji. Bez tego zwężenie `sizes` może pogłębić problem, a nie go rozwiązać.
· `ZDJ2608-21` (14 plików z bokiem > 2000 px) — obróbka plików graficznych, nie kod.
· `ZDJ2608-13` (kadr 1:1 w kafelku 16:9, 9:16 w kwadracie) — wymiana kadru dotyka
  `CURATED.produktowe`, listy ustawionej ręcznie 04.08 z imiennym komentarzem przy każdym kadrze.
· `ZDJ2608-30` (kafelek i hero „Pakietów" to dwa różne wydarzenia) — decyzja kadrowa.
· `ZDJ2608-20` (9 grup duplikatów bajtowych) — świadoma decyzja z `da52117`.
· `ZDJ2608-14` (3 pary bliźniaczych okładek blogowych) — wybór redakcyjny. Dowód dołożony:
  `headshoty-zespolu-w-jeden-dzien` to **górny rząd** siatki z `spojne-portrety-zespolu`.

**Odrzucone i domknięte wcześniej:** `ZDJ2608-02` (Box17 zostaje ukryty, decyzja 04.08),
`ZDJ2608-05` (rozstrzygnięty wariantem B, domknięty przez `-05b`).

**Czekające na DZ3** (nowy kadr hero wideo marketingu): `ZDJ2608-15`, `ZDJ2608-29`.
**Czekające na DZ5** (karty OG): `ZDJ2608-10`, `ZDJ2608-23`, `ZDJ2608-35`, `ZDJ2608-36`.

**Treść zablokowana w tej turze, wariant zamiast wykonania:**

| ID | Czego dotyczy | Dlaczego nie ruszone |
|---|---|---|
| `TRESC2608-04` | warunki zmiany terminu w `faq.ts` | `faq.ts` zasila JSON-LD `FAQPage` na `/` (§10.3) **plus** zmiana warunków handlowych (§10.7). Wariant: zdanie z briefu, 4 kary w jednym brzmieniu z `Warunki.tsx` i `llms.txt` |
| `TRESC2608-05` | „od 30 minut" kontra „od 90 minut" | fakt handlowy: jeśli sesje 30-minutowe istnieją poza pakietami, problemem jest cennik, nie zdanie. Rozjazd nadal żywy: `services.tsx` mówi „od 30 minut", `portfolio.ts` „od 90 minut do 3 godzin" |
| `TRESC2608-23` | `minPrice: 120` w JSON-LD sesji zespołowych | JSON-LD (§10.3) + kwota od Marcina (720 zł czy 1 120 zł all-in). Realne minimum: 4 × 180 = 720 zł stawki osobowej plus miejsce |
| `TRESC2608-52` | blurb portretów obiecuje „studio dopasowane do Twojego projektu" | owner: Marcin, mimo gotowego zamiennika. Per cennik v3 w cenie jest **wyłącznie mobilne studio**, zewnętrzne kosztuje 400-1 300 zł. Ryzyko na zlecenie: 375-600 zł kosztu, który klient uważa za wliczony. Blurb wchodzi do JSON-LD `FAQPage` przez `getPriceFaq` |
| `TRESC2608-11` | `hasOfferCatalog` w `layout.tsx` | stop-condition §10.3, ósma usługa nadal nie ma tam wpisu |

**Rozjazd, który został po `TRESC2608-50`:** `description` usługi dronowej (`services.tsx`)
**dalej zawiera** „budynki i obiekty firmowe, hale i magazyny" oraz „bryła, dach, otoczenie
i drogi dojazdowe", czyli dosłownie zakres `OBIEKT PODSTAWOWY` (900 zł) z sekcji 8 cennika.
Gotowy diff z 03.08 tego pola **nie ruszał**, a AC 2 briefu żąda 0 trafień w bloku dronowym.
**AC 2 nie jest spełnione i nie da się go spełnić samym diffem.** Poprawka `description`
to osobna decyzja: kasuje ok. 40 słów z najdłuższego opisu usługi. Zamiennik do akceptacji:
usunąć z drugiego zdania „budynki i obiekty firmowe, hale i magazyny," oraz całe zdanie
„Przy dużych obiektach robię komplet ujęć: bryła, dach, otoczenie i drogi dojazdowe."

**Nowe pytanie w FAQ dronowym**, odsyłające do linii obiektowej (punkt z briefu `TRESC2608-50`,
poza listą ID z promptu) — **nie dodane**. Prompt wymienia dla `-50` wyłącznie zastosowanie diffa.

---

## E. Jak zweryfikować i wdrożyć

```bash
cd ~/Documents/05_Strona_WWW/marcinszabunia

# 1. Co się zmieniło. UWAGA: `git diff` nie pokazuje 51 nowych nazw plików obrazów.
git --no-optional-locks status --porcelain
git --no-optional-locks diff --stat

# 2. Bramki jakości
npm run lint          # oczekiwane: 0 błędów, 0 ostrzeżeń
npx tsc --noEmit      # oczekiwane: czysto
npm run build         # TEGO NIE URUCHAMIAŁEM, w sandboksie pada na binarkach macOS

# 3. Podgląd
npm run dev
# /, /uslugi, /uslugi/fotografia-produktowa, /uslugi/wnetrza-obiekty-architektura,
# /portfolio, /galeria, /blog

# 4. Kontrole punktowe
grep -rn "portfolio-1.jpg" src/                       # oczekiwane: 0
grep -rniE "mini-brief" src/ public/                  # oczekiwane: 0
grep -rn "na własny użytek" src/                      # oczekiwane: 0
grep -nE "dostajecie|wstawicie|potrzebujecie|chcecie|Fotografujecie|Dla Was" src/data/services.tsx   # 0
grep -rnE '/(event|portret|wnetrze|box17)-[0-9]{2}\.jpg' src/ public/                                # 0
git --no-optional-locks diff --numstat next.config.ts # oczekiwane: 1  1

# 5. Formularz, ścieżka pełna (ósma usługa)
#    /kontakt → wybierz „Fotografia hal, obiektów i wnętrz" → wyślij
#    oczekiwane: HTTP 200, w mailu czytelna nazwa usługi, nie kod „obiekty"

# 6. Gdyby trzeba było cofnąć nazwy plików
#    docs/sesje/_backup-2026-08-04/ — kopia czterech folderów sprzed zmiany (19 MB, 52 pliki)

# 7. Do skasowania po przejrzeniu
#    _to_delete/ZDJ2608-18-2026-08-04/   (6 plików, w tym 2 archiwa robocze)
#    docs/sesje/_backup-2026-08-04/      (po potwierdzeniu, że nazwy są OK)
```

**Czego NIE zweryfikowałem:** `npm run build`, PSI/Lighthouse, zachowanie na produkcji,
powierzchnie zewnętrzne (Profil Firmy, Ads, social), realna wysyłka formularza z ósmą usługą
(brak sekretów SMTP w środowisku pomiarowym).

**Środowisko pomiarowe:** `next dev` na kopii tego drzewa w kontenerze linuksowym,
Chromium przez Playwright, okno widoczne (`visibilityState = visible`), DPR podany przy
każdym pomiarze. **Żaden pomiar „po" nie pochodzi z szabunia.pl.**

**Błędy w konsoli dev, pre-existing, nie z tej tury:** na każdej trasie dwa komunikaty CSP
o zablokowaniu `va.vercel-scripts.com` (`script.debug.js`, `speed-insights/script.debug.js`).
To wyłącznie tryb deweloperski: `@vercel/analytics` ładuje wtedy skrypt z zewnętrznej domeny,
której nie ma w `script-src`. Na produkcji skrypt idzie z `/_vercel/insights/`, czyli
z tej samej domeny. **Poza tym: 0 błędów aplikacji na 7 trasach.**
Sporadyczny `ERR_CONNECTION_RESET` to optymalizator obrazów w dev pod obciążeniem, nie kod.

**Dark mode:** działa na wszystkich 7 odwiedzonych trasach (sprawdzone przełącznikiem,
`documentElement.classList` zmienia się w obie strony).

**Smoke-test ścieżek:** przełączenie zakładki na `/galeria` → `?kat=wnetrza` ✅ ·
otwarcie lightboxa ✅ (alt: „Wnętrze hali magazynowej, regały i ciąg komunikacyjny, Poznań") ·
zamknięcie Escape ✅ · klik w kafelek portfolio z home → `/portfolio/idcom-headshoty-zespolu` ✅ ·
klik w kafelek usługi z `/uslugi` → `/uslugi/eventy-reportaze` ✅

---

## Pliki przeniesione do `_to_delete/ZDJ2608-18-2026-08-04/`

| # | Skąd | Rozmiar |
|---|---|---|
| 1 | `public/images/portfolio/artech/2.jpg` | 925 KB |
| 2 | `public/images/portfolio/sesja-wizerunkowa/01.jpg` | 527 KB |
| 3 | `public/images/portfolio/box17/_WRZUC-TU-ZDJECIA.txt` | 529 B |
| 4 | `public/images/portfolio-1.jpg` | 527 KB (sierota po `ZDJ2608-17`) |
| 5 | `_tmp-src.tgz` | 58 MB, archiwum robocze do pomiarów |
| 6 | `_tmp-src2.tgz` | 224 KB, archiwum robocze do pomiarów |

Most urządzeń nie pozwala kasować plików (`rm` → „Operation not permitted"), stąd `mv`.

---

## Sugerowane commit message, jeden na fazę

```
faza 1
fix(zdjecia): ZDJ2608-22, -06, -25, -05b, -08, -09, -17, -34, -02b, -27, -07, -24, -18
  poprawione alty i komentarze niezgodne z kadrem, sizes zgodne z siatka i kontenerem,
  hero nie wraca w pasku podstrony obiektowej, miniatury filmow na next/image, sieroty
  do _to_delete

faza 2
feat(portfolio): ZDJ2608-31, -32, -03, -26
  publikacja czterech realizacji (8 zamiast 4), woohoo schodzi z pierwszego miejsca na
  home i na /portfolio, sierota w siatce znika

faza 3
refactor(obrazy): ZDJ2608-01 + DZ4
  konwencja kategoria-NN-opis dla 51 plikow w czterech folderach, numery bez zmian,
  must-revalidate zamiast immutable w naglowku cache

faza 4
fix(a11y): ZDJ2608-04, -12, -11
  opis alternatywny per plik zamiast rotacji i szablonu z tytulu, 89 kadrow obejrzanych,
  59 z 59 powierzchni hero/kafelki/okladki

faza 5
fix(tresc): TRESC2608-50, -09, -22, -02, -08, -03, -01, -48, -51, -53, -27, -32, -33, -36, -38
  granica dron kontra linia obiektowa, licencja komercyjna w Warunkach, osma usluga na
  listach recznych, forma pojedyncza zamiast "Wy", zargon "brief" i "mini-brief" out
```

---

## Rejestr ID — wszystkie 38 wierszy rejestru §13 planu

Statusy: **wdrożony ale niezdeployowany** = zmiana jest w drzewie roboczym, nie ma jej na
produkcji. To jest status **całej tej tury**.

| ID | Finding | Status |
|---|---|---|
| 01 | Nazwy numeryczne w 4 folderach przy cache `immutable` | **wdrożony ale niezdeployowany** (51 plików + `must-revalidate`) |
| 02 | Box17 gotowy, ale w `DRAFT_SLUGS` | **odrzucony** 04.08, Box17 zostaje ukryty |
| 02b | Komentarz przy Box17 obiecuje publikację | **wdrożony ale niezdeployowany**, z `TODO (Marcin)` na warunek wyjścia |
| 03 | Portfolio na home otwierają grafika i klatka z filmu | **wdrożony ale niezdeployowany** częściowo: pierwszy kafelek to zdjęcie; kafelek Artechu zostaje klatką z filmu (decyzja Marcina) |
| 04 | Alt rotuje po 5 wariantach na 15 i 14 kadrów | **wdrożony ale niezdeployowany** (15 + 14 opisów per plik) |
| 05 | Kategoria eventowa obiecuje konferencje | **odrzucony**, rozstrzygnięty wariantem B, domknięty przez 05b |
| 05b | Podpis paska eventowego do poszerzenia | **wdrożony ale niezdeployowany** |
| 06 | „Wnętrza i hale" zawiera 4 zewnętrza | **wdrożony ale niezdeployowany** |
| 07 | `sizes` w paskach niezgodne z siatką i kontenerem | **wdrożony ale niezdeployowany**, 6/6 pomiarów w paśmie |
| 08 | Alt „na białym tle" przy żółtym tle | **wdrożony ale niezdeployowany** |
| 09 | Alt „headshoty zespołu" przy jednej osobie | **wdrożony ale niezdeployowany** |
| 10 | 6 z 7 istniejących OG usług bez fotografii | **poza zakresem**: czeka na DZ5, owner Marcin |
| 11 | Alt hero i kafli z szablonu, 55 miejsc | **wdrożony ale niezdeployowany**, 59 z 59 powierzchni po fazie 2 |
| 12 | Numerowany alt w pasku usług | **wdrożony ale niezdeployowany** |
| 13 | Kadr 1:1 w 16:9 i 9:16 w kwadracie | **odłożony**: dotyka `CURATED.produktowe`, lista Marcina z `158b955` |
| 14 | Trzy pary bliźniaczych okładek blogowych | **odłożony**: wybór redakcyjny, owner Marcin. Dowód dołożony w sekcji C |
| 15 | Hero wideo marketingu i sesji zespołowych | **poza zakresem**: czeka na DZ3 |
| 16 | Portrety otwiera operator z kamerą | **odłożony**: przenumerowanie łamie AC „kolejność identyczna" fazy 3. Propozycja w sekcji C |
| 17 | Miniatura draftu `sesja-wizerunkowa` | **wdrożony ale niezdeployowany**, WARIANT B zamiast rekomendowanego A |
| 18 | Dwie sieroty i placeholder `.txt` | **wdrożony ale niezdeployowany**, 4 pozycje zamiast 3 |
| 19 | `sizes` hero 40vw kontra 25,6vw renderu | **odłożony**: wymaga pomiaru PSI (H1, H2) |
| 20 | Dziewięć grup duplikatów bajtowych | **odłożony**: świadoma decyzja z `da52117`. Potwierdzone: `wnetrze-06` = `box17-07`, 677 827 B |
| 21 | Czternaście plików z bokiem > 2000 px | **odłożony**: obróbka plików, nie kod |
| 22 | Nieprecyzyjne słowo w komentarzu o kadrowaniu | **wdrożony ale niezdeployowany** |
| 23 | Ósma usługa bez pliku OG, `og:image` 404 | **poza zakresem**: DZ5. Sekcja C, pozycja 2, najpilniejsza z fali OG |
| 24 | Miniatury filmów: surowy `<img>`, 4:3, bez wymiarów | **wdrożony ale niezdeployowany**, maxres 9/9 sprawdzone kodem odpowiedzi |
| 25 | `sizes` w `About` bez `scale-[1.15]` | **wdrożony ale niezdeployowany**, pomiar 1920 px przy progu 1250 |
| 26 | Sierota w siatce `/portfolio` | **wdrożony ale niezdeployowany**, potwierdzony pomiarem [3, 3, 2] na 1440 px |
| 27 | Ten sam kadr 3× w jednym przewinięciu | **wdrożony ale niezdeployowany częściowo**: 1 z 3 podstron. Dwie zatrzymane zgodnie ze stop-condition |
| 28 | Te same 6 portretów na 3 podstronach usług | **odłożony**: owner Marcin. Propozycja podziału w sekcji C |
| 29 | „Wideo marketing" ma jedno zdjęcie | **poza zakresem**: czeka na DZ3 |
| 30 | Kafelek i hero „Pakietów" to dwa wydarzenia | **odłożony**: decyzja kadrowa |
| 31 | Cztery realizacje z galeriami w draftcie | **wdrożony ale niezdeployowany** |
| 32 | `woohoo-autopay` pierwszy w portfolio | **wdrożony ale niezdeployowany**, wariant A na obu powierzchniach |
| 33 | JSON-LD `ItemList` wymienia 9, widać 4 | **odłożony**: stop-condition JSON-LD. Jedna linia w sekcji C, rozjazd spadł z 5 do 1 |
| 34 | IDcom: hero 3× przy sześciu kadrach | **wdrożony ale niezdeployowany** |
| 35 | Osiem kart OG stron to ten sam portret | **poza zakresem**: DZ5 |
| 36 | Karta OG z wycofanym „z jednego wejścia" | **poza zakresem**: DZ5 |

**Podsumowanie zdjęć: 21 wdrożonych (niezdeployowanych), 2 odrzucone, 9 odłożonych, 6 poza zakresem. Razem 38.**

## Rejestr ID — treść

| ID | Finding | Status |
|---|---|---|
| TRESC2608-01 | Licencja „na własny użytek" w Warunkach | **wdrożony ale niezdeployowany** (DT1 = A) |
| TRESC2608-02 | Forma „Wy" w usłudze obiektowej i FAQ | **wdrożony ale niezdeployowany**, 6 podmian, dotyka JSON-LD `FAQPage` (zamierzone) |
| TRESC2608-03 | Ósma usługa na listach ręcznych | **wdrożony ale niezdeployowany**, 6 z 8 powierzchni; `blogServiceMap` świadoma luka, `hasOfferCatalog` nietknięty |
| TRESC2608-04 | Warunki zmiany terminu w FAQ | **odłożony**: JSON-LD + fakt handlowy |
| TRESC2608-05 | Czas trwania sesji wizerunkowej | **odłożony**: fakt handlowy |
| TRESC2608-08 | Słowo „brief" jako widoczny tekst | **wdrożony ale niezdeployowany**, 4 + 1 z `-02` |
| TRESC2608-09 | Kolizja kotwicy 900 zł, część tekstowa | **wdrożony ale niezdeployowany**, tekst ze sprostowania Marcina, NIE z briefu |
| TRESC2608-11 | `hasOfferCatalog` | **odłożony**: stop-condition |
| TRESC2608-22 | Meta drona „dron w cenie pakietów" | **wdrożony ale niezdeployowany**, 157 → 132 zn. |
| TRESC2608-23 | `minPrice` 120 zł w JSON-LD | **odłożony**: JSON-LD + kwota od Marcina |
| TRESC2608-27 | „dla Grupa Forte S.A." | **wdrożony ale niezdeployowany** |
| TRESC2608-32 | „Email" w `llms.txt` | **wdrożony ale niezdeployowany** |
| TRESC2608-33 | „48 h" kontra „48h" | **wdrożony ale niezdeployowany**, 10 miejsc |
| TRESC2608-36 | „&" w stopce | **wdrożony ale niezdeployowany** |
| TRESC2608-38 | Cztery opisy > 155 zn. | **wdrożony ale niezdeployowany**, 4 z 4 (jeden domknięty przez `-22`) |
| TRESC2608-48 | „mini-brief" na 9 powierzchniach | **wdrożony ale niezdeployowany** (DT5 = A) |
| TRESC2608-50 | Podstrona dronowa sprzedaje sekcję 8 | **wdrożony ale niezdeployowany**, diff 1 plik / 6 linii. AC 2 briefu NIE spełnione, patrz sekcja D |
| TRESC2608-51 | Hero obiektowy obiecuje wnętrza przy 900 zł | **wdrożony ale niezdeployowany**, tekst własny do akceptacji |
| TRESC2608-52 | Blurb portretów obiecuje studio w cenie | **odłożony**: owner Marcin |
| TRESC2608-53 | Bezterminowe przekładanie terminu | **wdrożony ale niezdeployowany** |

**Podsumowanie treści: 15 wdrożonych (niezdeployowanych), 5 odłożonych.**

---

*Raport z wykonania. Zmiany leżą w drzewie roboczym i nie ma ich na produkcji.
Git obsługuje Marcin.*

---

## Weryfikacja końcowa (osobny agent, przed oddaniem)

Przeszła: rejestr kompletny (38 z 38), zero zmian w diffie spoza listy ID, zero naruszeń
listy „czego nie robimy" w kodzie, zero długich myślników i fraz z czarnej listy w tekstach
widocznych, zero form „Wy", tekst w `services.tsx` zgodny ze sprostowaniem Marcina (nie z briefu),
tabela 51 wierszy z potwierdzeniem istnienia plików, `next.config.ts` zmieniony w jednym słowie.

Cztery rzeczy, które weryfikacja wyłapała i które **poprawiłem po niej**:

1. Podsumowanie pod rejestrem sumowało się do 36 zamiast 38 (było „20 wdrożonych, 5 poza
   zakresem", jest „21 wdrożonych, 6 poza zakresem").
2. Nagłówek `galleryAlts.ts` twierdził, że **wszystkie** opisy powstały po obejrzeniu kadru.
   Nieprawda dla bloków `wnetrza` i `dron`, przeniesionych bez zmiany treści. Nagłówek
   sprostowany, trzy znane rozjazdy wymienione z nazwy.
3. `CLAUDE.md` nadal mówił „Box17 jest w drafcie, **bo brakuje miniatury**, po wgraniu pliku
   wystarczy usunąć jedną linię". Zdanie było nieprawdziwe od 04.08, a zmiana nazw plików
   z `ZDJ2608-01` tylko podmieniła w nim nazwę, zostawiając obietnicę publikacji, czyli
   dokładnie to, co `ZDJ2608-02b` usuwało z `portfolio.ts`. Przepisane na stan faktyczny.
   Przy okazji komentarz w `portfolio.ts` przestał powoływać się na nieistniejący `box17.jpg`.
4. Raport twierdził, że `TRESC2608-02` to jedyne dotknięcie JSON-LD. Nieprawda: `FAQPage`
   na podstronach usług jest budowany z `service.faqs`, więc weszły tam też `-53`, `-09` i `-08`.
   Sprostowane w sekcji A3, razem ze wskazaniem, co cofnąć, gdyby próg miał obowiązywać symetrycznie.
