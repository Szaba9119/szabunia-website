# AUDYT ZDJĘĆ, runda 2: usługi i portfolio kadr po kadrze — 2026-08-04

**Powód rundy:** Marcin, po przeczytaniu pierwszego raportu: „chyba nie wszystko sprawdziłeś,
usługi i portfolio jest bardzo ważne".
Miał rację. Runda 1 oceniała galerie i pojedyncze kadry, ale **nie przeszła strony po stronie
przez to, co widzi kupujący**: co stoi na kafelku, co w hero, co w paskach, w jakiej kolejności
i ile razy ten sam kadr wraca w obrębie jednego przewinięcia.

**Metoda:** pełna mapa renderu dla **8 podstron usług** i **9 realizacji** (4 żywe, 5 draftów),
zbudowana z `services.tsx`, `portfolio.ts`, `ServiceGalleryStrip.tsx` i `lib/galleryImages.ts`,
plus obejrzane **37 kart OG**, których runda 1 nie obejrzała (domknięcie luki z §9).
Punkt odniesienia bez zmian: `88564ac`, produkcja = `main`. **Audyt niczego nie zmienia.**

**Numeracja ciągła z rundą 1:** nowe findingi mają ID `ZDJ2608-27` … `ZDJ2608-35`.

---

## 0. TL;DR rundy 2

Trzy rzeczy, które runda 1 przeoczyła, a które siedzą dokładnie tam, gdzie zapadają decyzje
zakupowe:

1. **`/portfolio` pokazuje 4 realizacje z 9, a warunek odblokowania czterech ukrytych
   został spełniony 4 sierpnia.** Komentarz przy `DRAFT_SLUGS` mówi: ukryte „do czasu
   uzupełnienia galerii". Tego samego dnia wszystkie cztery galerie zostały uzupełnione
   (7-10 kadrów zamiast jednego), a slugi zostały w zbiorze. **34 wyselekcjonowane kadry
   są niewidoczne.**
2. **Pierwsza realizacja na stronie głównej i na `/portfolio` nie ma ani jednego zdjęcia.**
   `woohoo-autopay` ma `gallery: []`. Kafelek to plansza tytułowa, hero to ta sama plansza
   w innym kadrze, a trzy „reelsy" to zrzuty z filmu z wypalonymi napisami.
3. **Na trzech podstronach usług ten sam kadr pojawia się trzy razy w obrębie jednego
   przewinięcia** (kafelek → hero → pasek galerii). Przy okazji: te same sześć portretów
   stoi na trzech różnych podstronach usług.

Do tego domknięcie luki z §9: **33 z 50 kart OG nie zawiera ani jednej fotografii**,
a wszystkie osiem kart dla stron głównych sekcji to **ten sam portret Marcina** —
łącznie z kartą dla `/galeria` („Kadry z realizacji") i dla `/portfolio` („Wybrane realizacje").

**Liczby rundy 2:** 9 nowych findingów (2 × P1, 5 × P2, 2 × P3), 3 decyzje Marcina zamknięte.

---

## 1. Decyzje Marcina z 04.08 i co zamykają

| Decyzja | Co zamyka | Co z niej wynika |
|---|---|---|
| **Box17 zostaje ukryty w draftcie** | ZDJ2608-02 → **odrzucony**, nie wraca | Komentarz w kodzie musi przestać kłamać: dziś mówi „po wgraniu `box17.jpg` wystarczy usunąć tę linię", a plik jest wgrany od 04.08. Brief poniżej |
| **Eventy to imprezy firmowe, integracje itp.; specjalizacja może przyjdzie później** | ZDJ2608-05 → wariant **B**, poszerzamy obietnicę zamiast zawężać zestaw | Kadry z DJ-em, koncertem i osłem **zostają**. Zmienia się podpis paska i opisy alternatywne, żeby mówiły prawdę o zakresie |
| **Usługi i portfolio są priorytetem** | kolejność wdrożenia z §11 rundy 1 | Plan przestawiony: najpierw to, co widać na ścieżce zakupowej, potem higiena techniczna |

**Konsekwencja decyzji o eventach, warta zapisania:** dopóki „event" znaczy u Ciebie także
integrację i imprezę firmową, **nie ma problemu z zawartością folderu, jest problem
z podpisem**. Podpis „Wybrane kadry z konferencji, targów i gal firmowych" opisuje ofertę
węższą niż ta, którą naprawdę robisz, i węższą niż to, co pokazują zdjęcia. Zdanie w rodzaju
„Konferencje, gale, integracje i imprezy firmowe" kosztuje jedną linię i przestaje kłócić się
z dziesięcioma kadrami z piętnastu.

---

## 2. Usługi: mapa kadr po kadrze

Kolejność renderu na każdej podstronie: **kafelek** (widoczny wcześniej, na home i `/uslugi`)
→ **hero** → **pasek 1** → film → **pasek 2** → karta autorska.

| Usługa | Kadrów | Unikalnych | Kafelek ≠ hero | Powtórzenie w obrębie strony |
|---|---|---|---|---|
| eventy-reportaze | 15 | 13 | nie | **`event-05` 3×** |
| sesje-zespolowe | 15 | 14 | nie | cover 2× |
| pakiety-foto-wideo | 15 | 15 | **tak** | brak |
| wizerunek-portrety | 15 | 13 | nie | **`portret-05` 3×** |
| **wideo-marketing** | **3** | **3** | tak | brak |
| fotografia-produktowa | 11 | 10 | nie | amarula 2× |
| zdjecia-wideo-z-drona | 9 | 8 | nie | `dron-04` 2× |
| wnetrza-obiekty-architektura | 9 | 7 | nie | **`wnetrze-03` 3×** |

---

**27. [UX] Ten sam kadr trzy razy w obrębie jednego przewinięcia, na trzech podstronach usług**
(§2.4 planu) · `services.tsx:149,309,569` kontra `ServiceGalleryStrip.tsx:65,199` ·
**P2 · S · 🤖 · Z (kod + mapa renderu)**

Kafelek i hero pokazujące ten sam kadr to zabieg rozsądny: klikasz i lądujesz tam, gdzie się
spodziewasz. Problem zaczyna się przy trzecim wystąpieniu, już w pasku „Przykłady z galerii",
kilka ekranów niżej:

- `/uslugi/eventy-reportaze`: `event-05` jako kafelek, jako hero **i jako drugi kadr paska**
- `/uslugi/wizerunek-portrety`: `portret-05` jako kafelek, jako hero **i jako piąty kadr paska**
- `/uslugi/wnetrza-obiekty-architektura`: `wnetrze-03` jako kafelek, jako hero **i jako trzeci
  kadr paska** (ta kategoria nie ma listy `CURATED`, więc pasek bierze `wnetrze-01..06` z dysku,
  a hero jest jednym z nich)

Pasek ma sześć miejsc na pokazanie czegoś nowego i oddaje jedno na powtórkę tego, co widz
ma już dwa razy za sobą. W folderach jest z czego wybierać: portretów 14, eventów 15, wnętrz 12.

Poprawka: w `ServiceGalleryStrip` odfiltrować `service.heroImage` z listy kadrów i dobrać
o jeden więcej. Trzy linie, zero decyzji biznesowych.

---

**28. [UX] Te same sześć portretów stoi na trzech podstronach usług** (§2.4 planu) ·
`services.tsx` pole `extraGallery` + `ServiceGalleryStrip.tsx:61-64` ·
**P2 · M · 🧑 · Z (mapa renderu)**

Paski „Przykłady z galerii" są współdzielone między usługami i nikt nie pilnuje, żeby zestaw
się zmieniał:

| Zestaw | Ile razy | Gdzie |
|---|---|---|
| portrety (`portret-12, 03, 10, 11, 05, 08`) | **3×** | wizerunek-portrety (pasek 1), eventy-reportaze (pasek 2), sesje-zespolowe (pasek 2) |
| eventy (`event-04, 05, 15, 14, 09, 17`) | **2×** | eventy-reportaze (pasek 1), pakiety-foto-wideo (pasek 1) |
| zespołowe, sesja IDcom | **2×** | sesje-zespolowe (pasek 1), wizerunek-portrety (pasek 2) |
| dron | **2×** | zdjecia-wideo-z-drona (pasek 1), pakiety-foto-wideo (pasek 2) |

Klient B2B rzadko otwiera jedną podstronę. Otwiera trzy i porównuje. Przy tej konstrukcji
po trzech podstronach ma wrażenie, że widział już wszystko: **cała oferta pokazuje 46
unikalnych kadrów**, przy 74 zdjęciach w samej galerii i 207 plikach w repo.

Poprawka: `CURATED` może dostać drugi zestaw sześciu kadrów dla paska w roli „dosprzedaż".
Materiał jest, wystarczy podzielić istniejące listy na dwie połówki.

---

**29. [BIZNES] Podstrona „Wideo marketing" ma na całej długości jedno zdjęcie**
(§2.4 planu) · `services.tsx:350,377` + mapa renderu · **P1 · M · 🧑 · Z (mapa renderu)**

Cała warstwa fotograficzna tej podstrony to:
1. kafelek: `woohoo-ecommerce-4x3.jpg`, czyli **plansza tytułowa z napisem**, nie zdjęcie,
2. hero: `galeria/eventy/event-03.jpg`, obejrzane: **plenerowa integracja na torze**, ludzie
   w koszulkach przybijający piątkę w pochmurny dzień,
3. karta autorska: portret Marcina, ten sam co na siedmiu innych podstronach.

Pasek 1 to filmy, drugiego paska nie ma. Czyli usługa, która w cenniku ma najwyższe pozycje
i którą sprzedajesz jako przewagę („zdjęcia, film i dron od jednej osoby"), ma **najcieńszą
warstwę wizualną z wszystkich ośmiu** i jedyne prawdziwe zdjęcie na niej jest z eventu.

Do tego kadr z integracji nie mówi nic o wideo. Zamiast niego prosi się kadr z planu:
mobilne studio, statyw, oświetlenie, operator przy kamerze. Takie zdjęcie **jest w repo**:
`/images/marcin-o-mnie.jpg` (Marcin przy kamerze na statywie, w plenerze, z monitorem
podglądowym) oraz `/images/galeria/portrety/portret-01.jpg` (operator z kamerą na gimbalu),
choć oba są portretami, nie kadrem z realizacji.

Poprawka: hero z planu zdjęciowego zamiast kadru z integracji, plus drugi pasek. Który kadr
ma stanąć w hero, to **decyzja Marcina, §5.1**.

---

**30. [UX] Kafelek i hero „Pakietów" pokazują dwa różne wydarzenia i żadne z nich nie pokazuje
pakietu** · `services.tsx:229,257` + `SERVICE_TILE_IMAGES` · **P3 · S · 🧑 · Z (kod + obejrzane)**
Kafelek: `event-02`, obejrzane — zdjęcie grupowe kilkudziesięciu osób przy Lamborghini
i Ferrari na torze. Hero: `event-01`, obejrzane — zespół muzyczny na scenie w czerwonym
świetle. `h1` brzmi „Zdjęcia, film i dron na event firmowy". Klikasz w auta, wchodzisz na
koncert, a strona sprzedaje trzy usługi naraz. To jedyna z ośmiu usług, gdzie kafelek i hero
się rozjeżdżają, i jedyna, której obietnica jest złożona z trzech rzeczy, a obraz pokazuje
jedną.

---

## 3. Portfolio: mapa kadr po kadrze

| Realizacja | Status | Kadrów | Unikalnych | Kafelek | Uwaga |
|---|---|---|---|---|---|
| woohoo-autopay | ŻYWE | 5 | 5 | plansza tytułowa | **`gallery: []`, zero fotografii** |
| artech | ŻYWE | 11 | 10 | klatka z filmu | hero powtórzony w galerii |
| idcom | ŻYWE | 8 | 6 | portret | **hero 3×**, brak filmu |
| yes-butcher | ŻYWE | 11 | 11 | dłonie z pudełkiem | najlepiej zbudowana |
| box17 | DRAFT (decyzja) | 11 | 10 | packshot budki | zostaje ukryty |
| sesja-wizerunkowa | DRAFT | 8 | 7 | **auta sportowe** | galeria uzupełniona 04.08 |
| fotografia-eventowa | DRAFT | 10 | 9 | networking | galeria uzupełniona 04.08 |
| packshoty-produktowe | DRAFT | 11 | 10 | drink na żółtym | galeria uzupełniona 04.08 |
| sesja-korporacyjna | DRAFT | 9 | 8 | portret przy oknie | galeria uzupełniona 04.08 |

---

**31. [BIZNES] Cztery realizacje mają spełniony warunek publikacji od 4 sierpnia i dalej są
ukryte** (§2.4 planu) · `portfolio.ts:617-630` kontra `portfolio.ts:395,449,503,558` ·
**P1 · S · 🧑 · Z (kod + git)**

Komentarz nad `DRAFT_SLUGS` definiuje warunek jednoznacznie:

> „Realizacje w przygotowaniu (na razie 1 zdjęcie + placeholder »Więcej zdjęć wkrótce«).
> Ukryte z indeksu /portfolio, z sitemap i z indeksacji **do czasu uzupełnienia galerii**."

Cztery z pięciu draftów zostały uzupełnione 04.08. W każdym z nich stoi ten sam komentarz:
„Rozbudowane 04.08.2026. Strona miała jedno zdjęcie, co przy pozycji w menu »Portfolio«
działało na niekorzyść." Stan po tej zmianie:

| Realizacja | Kadrów w galerii | Placeholder „Więcej zdjęć wkrótce" |
|---|---|---|
| fotografia-eventowa | 9 | nie pokazuje się (próg to `images.length < 3`) |
| packshoty-produktowe | 10 | nie pokazuje się |
| sesja-korporacyjna | 8 | nie pokazuje się |
| sesja-wizerunkowa | 7 | nie pokazuje się |

Warunek jest spełniony w każdym z czterech przypadków, a slugi zostały w `DRAFT_SLUGS`.
Skutkiem jest to, co widać na `/portfolio`: **cztery realizacje zamiast ośmiu**, przy czym
akurat te ukryte pokrywają portrety, sesje korporacyjne, eventy i packshoty, czyli cztery
z siedmiu usług, które sprzedajesz. **34 wyselekcjonowane kadry są dziś niewidoczne.**

Box17 zostaje ukryty decyzją z dziś i nie wchodzi do tej czwórki.

Poprawka: usunąć cztery linie z `DRAFT_SLUGS`. **To decyzja Marcina, §5.2.** Przed publikacją
trzeba domknąć dwie rzeczy: miniaturę `sesja-wizerunkowa` (ZDJ2608-17, auta sportowe)
i alt w `packshoty-produktowe` oraz `sesja-korporacyjna` (ZDJ2608-08, -09).

---

**32. [BIZNES] Pierwsza realizacja na stronie głównej nie zawiera ani jednej fotografii**
(§2.2 planu) · `portfolio.ts:105-137`, `Portfolio.tsx:13-18` ·
**P1 · M · 🧑 · Z (kod + obejrzane pliki)**

`woohoo-autopay` stoi pierwszy w `FEATURED_SLUGS` i pierwszy na `/portfolio`. Jego cała
zawartość obrazowa to:

| Rola | Plik | Co widać (obejrzane) |
|---|---|---|
| kafelek | `woohoo-ecommerce-4x3.jpg` | plansza „E-COMMERCE All in" na rozmytej panoramie ratusza |
| hero | `woohoo-autopay.jpg` | ta sama plansza, kadr 16:9 |
| reels 1 | `reel-3.jpg` | zrzut z filmu, napis „Co zniknie z e-commerce?" |
| reels 2 | `reel-1.jpg` | zrzut z filmu, napis „Co ogranicza Twój sklep?" |
| reels 3 | `reel-2.jpg` | zrzut z filmu, napis „Co boli właścicieli e-commerce?" |

`gallery: []`. To jest poprawne dla realizacji **wideo**, bo produktem był film. Ale ta
realizacja stoi na pierwszym miejscu w portfolio **fotografa**, a w opisie sama mówi, że
na miejscu były ujęcia z drona i relacja z wydarzenia. Kadry z tego wieczoru istnieją
(opis: „między rozmowami powstawała relacja z wydarzenia i ujęcia z drona"), tylko nie ma
ich w repo.

Poprawka: albo dołożyć 4-6 kadrów z tego eventu do `gallery` (wymaga plików od Marcina),
albo przenieść tę realizację niżej w `FEATURED_SLUGS`. Wariant drugi jest darmowy
i natychmiastowy.

---

**33. [SEO] JSON-LD na `/portfolio` wymienia dziewięć realizacji, strona pokazuje cztery**
· `portfolio/page.tsx:54-59` kontra `:83-84` · **P2 · S · 🤖 · Z (kod)**
`itemListElement` mapuje po `portfolioCategories`, czyli po **wszystkich dziewięciu**, w tym
po pięciu, które mają `robots: { index: false }` (`portfolio/[slug]/page.tsx:40`) i są
wykluczone z sitemapy. Widoczna siatka mapuje po `portfolioItems`, czyli po czterech.
Google dostaje listę dziewięciu pozycji, z których pięć prowadzi na strony oznaczone jako
nieindeksowalne i nielinkowane z tej strony. `ItemList` ma opisywać to, co na stronie jest.
Poprawka: `portfolioItems` zamiast `portfolioCategories` w JSON-LD. Jedna linia.
**Uwaga: to `metadata`/JSON-LD, czyli stop-condition `CLAUDE.md §10.3.**

**34. [UX] IDcom: ten sam headshot trzy razy na stronie z sześcioma zdjęciami** ·
`portfolio.ts:293,300` · **P2 · S · 🤖 · Z (kod)**
`_F2A9376-Edit-2.jpg` jest jednocześnie `thumbnail` (czyli kafelkiem na home i `/portfolio`),
hero podstrony i **szóstym kadrem galerii**. W galerii sześcioelementowej jedno miejsce
z sześciu idzie na powtórkę hero. W folderze `idcom/` jest dokładnie sześć plików, więc
tu akurat nie ma z czego dobrać — ale można ten kadr z galerii wyjąć i zostawić pięć,
albo poprosić o siódmy plik z tej sesji.
Przy okazji: IDcom to jedyna żywa realizacja bez filmu i bez `caseStudy` z liczbami.

**35. [SEO] Wszystkie osiem kart OG dla stron sekcyjnych to ten sam portret Marcina** ·
`public/images/og/strony/*` (obejrzane 8 z 8) · **P2 · M · 🧑 · Z (obejrzane)**
`home`, `uslugi`, `portfolio`, `galeria`, `blog`, `kontakt`, `poradnik`,
`polityka-prywatnosci` — osiem kart, jeden i ten sam portret w czarnej marynarce na ciemnym
tle, zmienia się wyłącznie plakietka i nagłówek. Karta dla `/galeria` nosi tytuł „Kadry
z realizacji", a pokazuje autora. Karta dla `/portfolio` nosi tytuł „Wybrane realizacje"
i pokazuje autora. To dwie strony, których jedynym zadaniem jest pokazać pracę.
**Wzorzec, który działa, jest w tym samym repo:** siedem z dziewięciu kart
`og/portfolio/*` ma zdjęcie z realizacji po prawej stronie, w tym samym granatowym layoucie.
Wystarczy skopiować mechanikę.

**36. [TREŚĆ] Karta OG wpisu blogowego nadal niesie żargon wycofany 30.07** ·
`public/images/og/blog/foto-wideo-dron-z-jednego-wejscia.png` (obejrzane) ·
**P3 · S · 🧑 · Z (obejrzane + `CLAUDE.md §9`)**
Napis na karcie: „Foto, wideo i dron **z jednego wejścia**: jeden twórca, mniej logistyki".
Fraza została usunięta z serwisu 30.07 w 25 miejscach, bo słowo „wejście" ma zero wystąpień
w zapytaniach z GSC i z Ads. Slug adresu został świadomie (jest zaindeksowany), ale **obraz
udostępniany w social media dalej pokazuje wycofane hasło**. To jedyne miejsce, gdzie ta
fraza przetrwała.

---

## 4. Domknięcie luki z §9 rundy 1: 50 z 50 kart OG obejrzanych

| Grupa | Ile | Ze zdjęciem | Bez zdjęcia |
|---|---|---|---|
| `og/portfolio/` | 9 | **8** (artech, eventowa, idcom, packshoty, korporacyjna, wizerunkowa, woohoo, yes-butcher) | 1 (box17) |
| `og/strony/` | 8 | 8, ale **wszystkie ten sam portret autora** | 0 |
| `og/uslugi/` | 7 | 1 (dron, i to kadr z ziemi) | **6** |
| `og/blog/` | 26 | 0 | **26** |
| **Razem** | **50** | 17 | **33** |

Wymiar 1200×630: **50 z 50 poprawnych**, zero wyjątków. To zostaje w „sprawdzone i OK".

Wniosek, który zmienia priorytet findingu ZDJ2608-10 z rundy 1: **problemem nie jest brak
szablonu, tylko to, że dobry szablon zastosowano wyłącznie do portfolio.** Karty portfolio
robią dokładnie to, co powinny. Usługi i blog dostały wersję bez zdjęcia, a strony sekcyjne
wersję z jednym zdjęciem na osiem kart.

---

## 5. Decyzje potrzebne od Marcina

**5.1. Hero podstrony „Wideo marketing".** Dziś stoi tam zdjęcie z integracji na torze.
Trzy wyjścia:

| Wariant | Koszt | Ryzyko | Odwracalność |
|---|---|---|---|
| **A (rekomendacja)** wgrywasz jeden kadr z planu zdjęciowego: kamera, statyw, światło | 15 min Twojego czasu, jeśli taki kadr masz | żadne | pełna |
| B `marcin-o-mnie.jpg` w hero, czyli Ty przy kamerze | 0 | hero staje się portretem autora, a nie realizacją; ta sama twarz jest już w karcie autorskiej niżej | pełna |
| C zostaje jak jest | 0 | najdroższa usługa ma na wizytówce zdjęcie z pikniku | — |

**5.2. Czy publikujemy cztery realizacje, którym uzupełniłeś galerie 4 sierpnia?**
`fotografia-eventowa` (9 kadrów), `packshoty-produktowe` (10), `sesja-korporacyjna` (8),
`sesja-wizerunkowa` (7). Warunek z Twojego własnego komentarza jest spełniony,
placeholder „Więcej zdjęć wkrótce" już się nie pokazuje.

| Wariant | Efekt | Ryzyko |
|---|---|---|
| **A (rekomendacja)** publikujemy wszystkie cztery | `/portfolio` idzie z 4 na 8 pozycji, siatka przestaje mieć sierotę w ostatnim rzędzie, 34 kadry wychodzą na światło, cztery nowe strony wchodzą do sitemapy | przed publikacją trzeba poprawić miniaturę `sesja-wizerunkowa` (auta sportowe) i dwa alty |
| B publikujemy dwie najmocniejsze (`fotografia-eventowa`, `packshoty-produktowe`) | mniej pracy przed | siatka dalej niesymetryczna (6 kafli) |
| C zostają w draftcie | 0 pracy | robota z 4 sierpnia nie dotarła do klienta; komentarz w kodzie opisuje warunek, który jest spełniony, więc następna osoba znowu to zgłosi |

**5.3. `woohoo-autopay` na pierwszym miejscu portfolio.** Realizacja bez ani jednego zdjęcia
otwiera portfolio fotografa.

| Wariant | Efekt | Ryzyko |
|---|---|---|
| **A (rekomendacja)** przesuwasz ją na trzecie miejsce w `FEATURED_SLUGS`, pierwsze bierze IDcom albo Yes Butcher | portfolio otwiera się twarzą albo wnętrzem, czyli fotografią | żadne, film dalej jest widoczny |
| B dorzucasz 4-6 kadrów foto z tego eventu do `gallery` | realizacja przestaje być czysto wideo i broni pierwszego miejsca | wymaga plików od Ciebie |
| C zostaje | 0 | pierwsze wrażenie z portfolio fotografa to plansza z napisem |

**5.4. Karty OG.** Trzy pytania zamknięte, każde tak/nie:
1. Robimy sześć brakujących kart usług w szablonie z `og/portfolio` (zdjęcie po prawej)? **Tak/nie**
2. Robimy ósmą kartę dla „Wnętrz, obiektów i architektury", której dziś w ogóle nie ma
   i której `og:image` zwraca 404 (ZDJ2608-23)? **Tak/nie**
3. Dajemy `/galeria` i `/portfolio` własne zdjęcie zamiast portretu autora? **Tak/nie**

---

## 6. Co bym zrobił na Twoim miejscu, w tej kolejności

Pytałeś, co uważam. Krótko i po kolei, z uzasadnieniem, dlaczego akurat tak.

**1. Opublikuj cztery realizacje (§5.2 A).** To jest pojedyncza zmiana o największym stosunku
efektu do kosztu w całym audycie: usuwasz cztery linie i portfolio podwaja się z 4 na 8,
a 34 kadry, które sam wyselekcjonowałeś wczoraj, zaczynają pracować. Przy okazji znika
sierota w siatce (ZDJ2608-26) i część problemu „portfolio otwierają dwa nie-zdjęcia".
Warunek: najpierw miniatura `sesja-wizerunkowa` i dwa alty, czyli 20 minut roboty agenta.

**2. Zabierz `woohoo` z pierwszego miejsca (§5.3 A).** Zero kosztu, natychmiastowy efekt
na pierwszym ekranie strony głównej. Film nie znika, tylko przestaje być pierwszym, co widzi
fotograficzny klient.

**3. Odfiltruj hero z pasków galerii (ZDJ2608-27).** Trzy linie kodu, likwiduje potrójne
powtórzenie na trzech podstronach i od razu dokłada trzy nowe kadry do oferty.

**4. Popraw podpis eventów zgodnie z Twoją decyzją (ZDJ2608-05, wariant B).** Jedna linia,
a przestaje istnieć rozjazd między tym, co obiecujesz, a tym, co pokazujesz na dziesięciu
kadrach z piętnastu. To także rozwiązuje połowę problemu z altami (ZDJ2608-04): jak podpis
mówi o integracjach, to opisy alternatywne mogą wreszcie nazwać osła osłem.

**5. Dopiero teraz higiena techniczna:** nazwy plików i cache (ZDJ2608-01), OG usług
(ZDJ2608-10 i -23), reszta.

**Czego bym NIE robił teraz:** nie ruszałbym kolejności w galeriach, którą układałeś ręcznie
3 i 4 sierpnia, i nie zmieniałbym `next.config.ts`, dopóki nie zdecydujesz o nazwach plików.
Nie robiłbym też ósmej karty OG „na szybko" z byle kadru: skoro i tak siadasz do sześciu
brakujących, zrób ósmą razem z nimi.

**Jedna rzecz, której audyt nie rozstrzygnie i nie udaję, że rozstrzyga:** czy zdjęcie
z integracji na podstronie o wideo faktycznie kosztuje Cię zapytania. Nie ma danych per obraz.
Rekomendacja opiera się na tym, że obietnica i obraz mają mówić to samo, a nie na pomiarze.
Gdybyś chciał to kiedyś sprawdzić, wystarczy zdarzenie kliknięcia w kafelek usługi w GA4.

---

## Rejestr findingów rundy 2

| ID | Finding | P | Owner | Status |
|---|---|---|---|---|
| ZDJ2608-27 | Kafelek + hero + pasek: ten sam kadr 3× na 3 podstronach | P2 | 🤖 | otwarty |
| ZDJ2608-28 | Te same 6 portretów na 3 podstronach usług | P2 | 🧑 | otwarty |
| ZDJ2608-29 | „Wideo marketing" ma jedno zdjęcie na całej podstronie | P1 | 🧑 | czeka na decyzję §5.1 |
| ZDJ2608-30 | Kafelek i hero „Pakietów" pokazują dwa różne wydarzenia | P3 | 🧑 | otwarty |
| ZDJ2608-31 | Cztery realizacje z uzupełnionymi galeriami dalej w draftcie | P1 | 🧑 | czeka na decyzję §5.2 |
| ZDJ2608-32 | `woohoo-autopay` bez ani jednej fotografii, pierwszy w portfolio | P1 | 🧑 | czeka na decyzję §5.3 |
| ZDJ2608-33 | JSON-LD `ItemList` wymienia 9 realizacji, widać 4 | P2 | 🤖 | otwarty |
| ZDJ2608-34 | IDcom: hero 3× przy sześciu kadrach galerii | P2 | 🤖 | otwarty |
| ZDJ2608-35 | Osiem kart OG stron sekcyjnych to ten sam portret autora | P2 | 🧑 | czeka na decyzję §5.4 |
| ZDJ2608-36 | Karta OG z wycofanym żargonem „z jednego wejścia" | P3 | 🧑 | otwarty |
| ZDJ2608-02 | Box17 w draftcie | — | 🧑 | **ODRZUCONY decyzją Marcina 04.08** |
| ZDJ2608-05 | Kategoria eventowa | P1 | 🧑 | **ROZSTRZYGNIĘTY: wariant B, poszerzamy podpis** |

---

*Runda 2 wykonana: Claude (Cowork), 2026-08-04, po uwadze Marcina, że usługi i portfolio
wymagają osobnego przejścia. Dane: pełna mapa renderu 8 podstron usług i 9 realizacji z kodu
na commicie `88564ac`, 50 z 50 kart OG obejrzanych. Nie wprowadza zmian.*
