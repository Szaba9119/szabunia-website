# AUDYT: zdjęcia, dopasowanie i kolejność — szabunia.pl, 2026-08-04

**Zakres:** moduł F (warstwa wizualna) w całości; z modułu B tylko obrazy, z modułu C tylko
`alt`, nazwa pliku jako adres i OG. Sześć osi wg planu.
**Okno:** stan repo na commicie `88564ac` (2026-08-04 15:11), `origin/main` = `88564ac`,
**produkcja równa się main**. Render mierzony na produkcji tego samego dnia.
**Metoda konkretnie:** 207 plików rastrowych zinwentaryzowanych z nagłówków (wymiary, waga,
md5). **170 z 207 kadrów obejrzanych** w 12 arkuszach stykowych; nieobejrzane to 37 kart OG
(26 blogowych, 6 portfolio, 5 stron), sprawdzone tylko wymiarowo. Referencje wyciągnięte
regexem ze wszystkich `.ts`/`.tsx` w `src/`, rozdzielone na statyczne i dynamiczne.
Podmiany plików pod tą samą nazwą z `git log --diff-filter=M`. Render: Chrome, JS włączony,
okno widoczne, viewport 1728 px, DPR 2.
**Wykluczone:** PSI/Lighthouse (brak dostępu), dane GA4/GSC per obraz (nie istnieją),
treść tekstowa poza `alt` (osobny audyt TRESC z tego samego dnia).
**Plan:** `docs/sesje/PLAN-AUDYT-ZDJECIA-2026-08-04.md` · **Prompt:** `docs/PROMPT-AUDYT-ZDJECIA-2026-08-04.md`

> **Audyt niczego nie zmienia.** Żadnego pliku nie ruszono, nie przemianowano, nie usunięto.
> Zero commitów. Kończy się na briefach.

---

## 0. TL;DR

**Wniosek nadrzędny, warunkowy: przestawianie kadrów w galeriach nie ma sensu, dopóki
nazwa pliku pozostaje adresem, a adres jest cache'owany jako `immutable` na rok.**
04.08.2026 pliki `produkt-01..24.jpg` zostały podmienione pod tymi samymi nazwami
**w trzech commitach jednego dnia** (`b3ed677`, `a67caa3`, `ee5970d`), a nagłówek
`Cache-Control: public, max-age=31536000, immutable` (`next.config.ts:48-53`) mówi
przeglądarce, żeby przez rok nie pytała o nowszą wersję. Konwencja opisowych nazw powstała
tego samego dnia (`158b955`) i uratowała folder produktowy, ale **cztery pozostałe foldery
(`eventy`, `portrety`, `wnetrza`, `box17`) dalej mają nazwy numeryczne**, więc każda kolejna
zmiana kolejności odtwarza ten sam błąd.

**Druga rzecz do zrobienia dziś: Box17.** Komplet 10 zdjęć plus film plus miniatura wjechał
do repo 04.08 (`9fc7ff4`), a case study dalej siedzi w `DRAFT_SLUGS` (`portfolio.ts:625`)
z komentarzem, który twierdzi, że w folderze jest „tylko placeholder .txt". To nieprawda
od dziś rano. Ósma realizacja jest gotowa i niewidoczna.

**Liczby:** 0 × P0 · **6 × P1** · 15 × P2 · 5 × P3 · 4 hipotezy · **11 własnych błędów
skorygowanych w trakcie** (5 fałszywych pozytywów przy zbieraniu danych, 6 pomyłek złapanych
przy weryfikacji gotowego raportu, w tym jedna licząca).

**Trzecia rzecz, znaleziona przy weryfikacji:** podstrona „Fotografia wnętrz, obiektów
i architektury”, włączona 04.08, **nie ma pliku OG** i wystawia `og:image` prowadzący
do 404 (ZDJ2608-23). Dokładnie ten sam błąd, który repo już raz opisało przy Box17.

**Jedna decyzja na teraz:** czy zdejmujemy `box17-budki-akustyczne` z draftu (ZDJ2608-02).
Wszystko inne może poczekać do jutra.

---

## 1. Ocena warstwy wizualnej: 72/100

| Obszar | Ocena | Krótko |
|---|---|---|
| Jakość samych kadrów | 92 | Materiał jest mocny. To nie jest problem tej strony |
| Dopasowanie kadru do obietnicy | 68 | Podpisy kategorii obiecują więcej niż pokazują kadry |
| Kolejność i rytm | 74 | Poprawiana ręcznie i widać to; zostały trzy otwarcia do wymiany |
| Pokrycie i powtórzenia | 70 | Osiem realizacji, jedna niewidoczna; ta sama para twarzy w trzech rolach |
| Warstwa techniczna | 65 | Zero wiszących referencji, ale `sizes` rozjeżdża się z siatką, a cache jest miną |
| `alt`, nazwy plików, OG | 58 | Najsłabszy obszar: rotujące i szablonowe alty, OG usług bez zdjęć |

Ocena dotyczy wyłącznie warstwy wizualnej i nie jest porównywalna z 87/100 z audytu
pełnego z 29.07, który mierzył co innego.

---

## 2. Sprawdzone i OK (pokrycie udokumentowane)

| Co | Wynik | Dowód |
|---|---|---|
| Referencje wiszące | ✅ **0 z 116** referencji plikowych w `src/` wskazuje na nieistniejący plik | skrypt porównujący regex z `find` |
| Wymiar OG | ✅ **50 z 50** plików OG = dokładnie 1200×630 | odczyt nagłówków |
| `alt` na home | ✅ **20 z 20** obrazów w DOM ma niepusty `alt` | pomiar renderu 04.08, viewport 1728 |
| Alty opisowe `dron` | ✅ **9 z 9** wariantów zgadza się z kadrem, łącznie z wieżowcem przesuniętym na koniec 04.08 | `galeria/page.tsx:130-146` + obejrzane kadry |
| Alty opisowe `wnetrza` | ✅ **12 z 12** wariantów zgadza się z kadrem | `galeria/page.tsx:102-129` + obejrzane kadry |
| Alty w `portfolio.ts` dla Artech | ✅ **9 z 9** opisują właściwy detal (kolor, kształt, materiał) | `portfolio.ts:239-247` + obejrzane kadry |
| Alty w `portfolio.ts` dla Box17 | ✅ **9 z 9** | `portfolio.ts:180-188` + obejrzane kadry |
| Alty w `portfolio.ts` dla Yes Butcher | ✅ **9 z 9** | `portfolio.ts:348-356` + obejrzane kadry |
| Optymalizacja `About` | ✅ `sizes="(max-width: 1024px) 0px, 520px"` przy `hidden lg:block` to poprawny zabieg, nie błąd | `About.tsx:14,23` |
| `Publications` | ✅ `width`/`height` = wymiary źródła, proporcja bez zniekształceń | `Publications.tsx:43-46` + inwentarz |
| `next/image` w galeriach i kafelkach | ✅ wszystkie obrazy z `public/` idą przez `next/image` (16 komponentów + 2 strony) | `grep -rln "next/image" src/` |
| Formaty i jakości | ✅ AVIF + WebP, `qualities` wypisane jawnie (Next 16 tego wymaga) | `next.config.ts:37,41` |
| Spójność kategorii dronowej | ✅ **9 z 9** kadrów to faktycznie ujęcia z powietrza i faktycznie budynki, osiedla lub inwestycje | obejrzane kadry |
| Spójność Artech i Yes Butcher | ✅ jednolita obróbka i światło w obrębie obu galerii | obejrzane 11 + 11 kadrów |
| Referencje dynamiczne | ✅ galerie listowane z dysku i OG składane z szablonu działają; poza jednym wyjątkiem z findingu 6 każdy złożony adres ma plik | skrypt + `ls` |

---

## 3. Ustalenia P0

**Brak.** Żaden finding nie zabija leadów ani pomiaru. Nie podnoszę niczego do P0 na siłę.

---

## 4. Ustalenia P1

> Numer findingu = numer w rejestrze na końcu (`ZDJ2608-nr`). Dlatego P1
> kończy się na numerze 23: ten finding dołączył dopiero przy weryfikacji własnej pracy.

**1. [TECH] Nazwa pliku jest adresem, a adres jest `immutable` na rok — w czterech folderach
z sześciu dalej numeryczna** (§2.1, §2.7 planu) · `next.config.ts:48-53`,
`src/lib/galleryImages.ts:20-31`, `git log --diff-filter=M -- public/images/**` ·
**P1 · M · 🤖 · Z (kod + historia gita)**

`Cache-Control: public, max-age=31536000, immutable` mówi przeglądarce: przez rok nie pytaj,
czy pod tym adresem jest coś nowego. Komentarz obok uzasadnia to zdaniem „Pliki podmieniane
są zawsze pod nową nazwą (wersjonowanie nazwą pliku)". **Historia gita mówi coś innego.**
04.08.2026 komplet `produkt-01.jpg` … `produkt-24.jpg` został zmodyfikowany pod tymi samymi
nazwami w `b3ed677`, potem ponownie w `a67caa3`, potem `produkt-02` i `produkt-03` jeszcze raz
w `ee5970d`. Tego samego dnia podmieniono też `blog/foto-wideo-dron-z-jednego-wejscia.jpg`
(`4ea0501`). Skutek jest opisany w kodzie: „w miejscu koszulki wyświetlała się Amarula
ze starego cache'u". Konwencja opisowa (`158b955`) rozwiązała to **dla jednego folderu**.
`eventy` (15 plików), `portrety` (14), `wnetrza` (12) i `portfolio/box17` (10) mają dalej
`event-04.jpg`, `portret-11.jpg`, `wnetrze-07.jpg`, `box17-03.jpg`. Każde przestawienie
w tych folderach to ten sam błąd jeszcze raz, tylko że u klienta, który już był na stronie.

Poprawka: dokończyć konwencję w czterech folderach jedną operacją, ze świadomością, że
zmiana nazwy = nowy adres i stary znika. Alternatywa tańsza i odwracalna: zmienić nagłówek
`immutable` na `must-revalidate` dla `/images/*` — **to stop-condition, patrz §12.1**.

---

**2. [BIZNES] Gotowe case study Box17 jest niewidoczne, a warunek jego odblokowania został
spełniony dziś rano** (§2.4 planu) · `src/data/portfolio.ts:620-626` kontra
`git ls-files public/images/portfolio/box17/` · **P1 · S · 🧑 + 🤖 · Z (kod + git)**

Komentarz przy `DRAFT_SLUGS` brzmi: „Box17: brak miniatury (`public/images/portfolio/box17/`
ma tylko placeholder .txt) … Po wgraniu `box17.jpg` wystarczy usunąć tę linię, reszta danych
case study jest gotowa." W folderze leży dziś **10 plików JPG**, w tym `box17.jpg` (302 KB,
2000×1333), wszystkie dodane commitem `9fc7ff4` z 04.08.2026 i wypchnięte na `origin/main`.
Dziewięć zdjęć ma napisane, sprawdzone alty, jest film produktowy, jest `gallerySubtitle`,
jest OG. `DRAFT_SLUGS` ma **pięć** wpisów (Box17, `sesja-wizerunkowa`, `fotografia-eventowa`,
`packshoty-produktowe`, `sesja-korporacyjna`), więc `/portfolio` pokazuje dziś **cztery**
realizacje z dziewięciu, jakie są w danych. Box17 jest z tej piątki jedyną, której warunek
odblokowania został spełniony, i jedyną realizacją produktową dla producenta mebli biurowych
w całym portfolio.

Poprawka: usunąć linię 625. **Publikacja case study to decyzja Marcina, patrz §12.2.**
Przy okazji: `og/portfolio/box17-budki-akustyczne.png` to karta tekstowa bez zdjęcia,
zrobiona wtedy, gdy zdjęć nie było. Teraz są.

---

**3. [UX] Sekcja portfolio na stronie głównej otwiera się dwoma kadrami, które nie są
zdjęciami** (§2.2, §2.3 planu) · `Portfolio.tsx:13-18`, `portfolio.ts:106`, `portfolio.ts:237` ·
**P1 · S · 🧑 · Z (kod + obejrzane pliki)**

`FEATURED_SLUGS` ustawia kolejność: `woohoo-autopay`, `artech-fotografia-produktowa`,
`idcom-headshoty-zespolu`, `yes-butcher-przewodnik-michelin`. Pierwsze dwa kafelki biorą
`tileImage`:
- `woohoo-ecommerce-4x3.jpg` — obejrzane: **grafika tytułowa** z napisem „E-COMMERCE All in"
  na rozmytej panoramie poznańskiego ratusza, czyli plansza z filmu, nie fotografia.
- `artech-film-cover.jpg` — obejrzane: **klatka z filmu**, makro tokarki obrabiającej detal.

Na stronie fotografa sekcja „portfolio" zaczyna się od planszy z napisem i stopklatki, a dwa
faktyczne zdjęcia (portret IDcom, kadr Yes Butcher) stoją na trzecim i czwartym miejscu.
Ta sama para otwiera `/portfolio`, gdzie kolejność też idzie z deklaracji.

Poprawka: zamienić miejscami tak, żeby pierwszy kafelek był fotografią. Najtańszy wariant
bez ruszania listy: podmienić `tileImage` Woohoo na kadr z eventu, a Artechu na packshot
(`_F2A8937.jpg` już jest `thumbnail` tej realizacji). Wariant drugi: przestawić `FEATURED_SLUGS`
na `idcom, yes-butcher, woohoo, artech`.

---

**4. [SEO] Alt w dwóch największych kategoriach `/galeria` rotuje po pięciu wariantach,
więc opisuje inne zdjęcie niż to, które widać** (§2.7 planu) · `GalleryView.tsx:32-35`,
`galeria/page.tsx:61-86` · **P1 · M · 🤖 · Z (kod + obejrzane kadry)**

`altFor` liczy `altVariants[i % altVariants.length]`. Kategoria `eventy` ma **5 wariantów
na 15 kadrów**, `portrety` **5 na 14**. Wariant trafia więc na kadr numerem, nie treścią.
Wyliczone wprost z kodu i porównane z obejrzanymi plikami:

| Poz. | Plik | Co widać (obejrzane) | Wygenerowany `alt` |
|---|---|---|---|
| 7 | `event-07.jpg` | **osioł na trawniku**, w tle ludzie na matach do jogi | „Fotografia konferencyjna, relacja z wydarzenia biznesowego, kadr 7" |
| 2 | `event-02.jpg` | zdjęcie grupowe przy Lamborghini i Ferrari na torze | „Fotografia konferencyjna, relacja z wydarzenia biznesowego, kadr 2" |
| 8 | `event-09.jpg` | DJ przy konsolecie, ciemna scena | „Zdjęcie z gali firmowej, fotograf Marcin Szabunia, kadr 8" |
| 10 | `event-12.jpg` | mężczyzna w aucie, ręka na kierownicy | „Relacja zdjęciowa z targów i wydarzeń firmowych, kadr 10" |
| 12 | `event-14.jpg` | saksofonista | „Fotografia konferencyjna, relacja z wydarzenia biznesowego, kadr 12" |
| 1 | `portret-01.jpg` | operator z kamerą na gimbalu, oversize'owy T-shirt | „Portret biznesowy w studio, fotograf Marcin Szabunia, Poznań, kadr 1" |
| 6 | `portret-06.jpg` | **dwie osoby**, mężczyzna z laptopem i kobieta w czerwonej sukience | „Portret biznesowy w studio…, kadr 6" (liczba pojedyncza) |

Ten sam plik `galeria/page.tsx` rozwiązał to dobrze dla `wnetrza` (12 wariantów na 12 plików)
i `dron` (9 na 9), z komentarzem tłumaczącym dlaczego. Dwie największe kategorie zostały
na starym mechanizmie.

Poprawka: dopisać po jednym wariancie na kadr dla `eventy` i `portrety`, dokładnie tak jak
zrobiono dla `wnetrza` i `dron`. Uwaga: ta lista jest wtedy związana z kolejnością plików,
więc bez ZDJ2608-01 zamienia jeden problem na drugi.

---

**5. [TREŚĆ] Kategoria eventowa obiecuje konferencje, targi i gale, a większość kadrów to
koncerty, DJ-e i pikniki** (§2.2 planu) · `ServiceGalleryStrip.tsx:16`,
`galeria/page.tsx:78-85` · **P1 · M · 🧑 · Z (obejrzane 15 z 15 kadrów)**

Podpis paska na podstronach usług brzmi: „Wybrane kadry z konferencji, targów i gal firmowych."
Zakładka na `/galeria` nie ma własnego podpisu, ale trzy z pięciu jej `altVariants` mówią
„Fotografia konferencyjna", „Zdjęcie z gali firmowej" i „Relacja zdjęciowa z targów".
Obejrzane 15 kadrów w folderze `eventy`:

- **konferencja, targi albo gala firmowa: 3** (`event-04` wręczenie wyróżnień, `event-05`
  networking w garniturach, `event-15` kolacja biznesowa)
- **integracja i piknik: 4** (`event-02` tor i auta, `event-03` tor, `event-06` przeciąganie
  liny, `event-07` osioł i joga)
- **koncert, klub, DJ: 6** (`event-01`, `event-09`, `event-10`, `event-13`, `event-16`, `event-17`)
- **pozostałe: 2** (`event-12` człowiek w aucie, `event-14` saksofonista na gali)

Pasek `CURATED.eventy` (`ServiceGalleryStrip.tsx:66-68`) wybiera `04, 05, 15, 14, 09, 17`,
czyli trzy trafione, jeden graniczny i **dwa DJ-skie kadry na sześciu** widocznych na
podstronie sprzedającej obsługę eventów firmowych. Kupujący z HR, który wchodzi po „obsługę
konferencji", widzi w połowie pasa scenę klubową.

Poprawka: albo zmienić podpis na taki, który obejmuje integracje i imprezy firmowe, albo
zamienić `event-09` i `event-17` na `event-13` (scena plenerowa przy Hali Stulecia)
i `event-10` (parkiet na gali). **Rozstrzygnięcie należy do Marcina, patrz §12.3** — to
pytanie o pozycjonowanie, nie o zdjęcia.

---

**23. [SEO] Ósma usługa nie ma pliku OG, więc `og:image` zwraca 404** (§2.7 planu) ·
`uslugi/[slug]/page.tsx:42` kontra `ls public/images/og/uslugi/` · **P1 · S · 🧑 · Z (kod + ls)**

`const ogImage = \`/images/og/uslugi/${service.slug}.${slug === "zdjecia-wideo-z-drona" ? "jpg" : "png"}\`;`
składa adres z sluga. `SERVICE_DISPLAY_ORDER` (`services.tsx:637-646`) ma **osiem** slugów,
`DRAFT_SERVICE_SLUGS` jest pusty, a w folderze `og/uslugi/` leży **siedem** plików. Brakuje
`wnetrza-obiekty-architektura.png`. Podstrona „Fotografia wnętrz, obiektów i architektury",
włączona 04.08, wystawia więc `og:image` wskazujący na nieistniejący plik.

To ta sama klasa błędu, którą repo opisało przy Box17: „kafel na `/portfolio` był pusty,
a `og:image` zwracał 404 (audyt `PELNY2907-01`)". Skutek jest cięższy niż w findingu 10:
tam ktoś widzi ciemny prostokąt z napisem, tu nie widzi nic, a niektóre platformy przy
martwym `og:image` przestają renderować kartę linku w ogóle.

Poprawka: zrobić brakujący plik. Do czasu jego powstania najtańsze zabezpieczenie to fallback
na `/images/og/strony/uslugi.jpg`, który istnieje.

---

## 5. Ustalenia P2-P4

**6. [TREŚĆ] Zakładka „Wnętrza i hale" ma cztery kadry z dwunastu, które nie są wnętrzami** ·
`galeria/page.tsx:102-129` · **P2 · S · 🧑 · Z (obejrzane + własne alty w kodzie)**
Dowód nie wymaga mojej oceny, bo dają go alty w tym samym pliku: „Elewacja budynku biurowego
o zmierzchu" (`wnetrze-04`), „Wieżowiec biurowy w Poznaniu z powietrza" (`wnetrze-10`),
„Biurowiec z lotu ptaka" (`wnetrze-11`), „Nowoczesny budynek komercyjny z drona" (`wnetrze-12`).
Etykieta zakładki obiecuje wnętrza i hale, jedna trzecia zawartości to zewnętrza.
Poprawka: „Wnętrza, hale i obiekty" na etykiecie, jedno słowo.

**7. [TECH] `sizes` w paskach galerii nie zgadza się ani z siatką, ani z kontenerem** ·
`ServiceGalleryLightbox.tsx:74` kontra `ServiceGalleryStrip.tsx:215-219` ·
**P2 · S · 🤖 · Z (kod)**
Lightbox ma zaszyte na sztywno `sizes="(max-width: 640px) 33vw, 16vw"` dla wszystkich
kategorii, a siatki są dwie: `grid-cols-3 sm:grid-cols-6` oraz `grid-cols-2 sm:grid-cols-4`
dla `produktowe`. Do tego **cały pasek siedzi w `max-w-5xl mx-auto`** (`ServiceGalleryStrip.tsx:243`),
czyli powyżej ~1056 px szerokości okna kafelki przestają rosnąć. `sizes` podane w `vw` nie
uwzględnia ani jednego z tych dwóch faktów. Wychodzi z tego błąd w obie strony:

| Okno | Kategoria | Realna szerokość kafelka | `sizes` mówi | Skutek |
|---|---|---|---|---|
| 390 px | produktowe (2 kol.) | ~180 px | 33vw = 129 px | **za mało**, miniatura miękka |
| 900 px | produktowe (4 kol.) | ~209 px | 16vw = 144 px | **za mało** |
| 1728 px | produktowe (4 kol.) | ~248 px | 16vw = 276 px | nieznacznie za dużo |
| 1728 px | pozostałe (6 kol.) | ~162 px | 16vw = 276 px | **~70% za dużo**, siedem kategorii |

Poprawka: przekazać `sizes` z paska razem z `gridClass` i **zakończyć je stałą w pikselach**,
bo kontener ma sufit: `"(max-width: 640px) 50vw, (max-width: 1056px) 25vw, 250px"` dla
produktowej i `"(max-width: 640px) 33vw, (max-width: 1056px) 16vw, 165px"` dla reszty.
Sama zamiana `16vw` na `25vw` bez stałej **pogorszy** sytuację na dużych ekranach.

**8. [SEO] `alt` mówi „na białym tle", zdjęcie jest na żółtym** · `portfolio.ts:502` ·
**P2 · S · 🤖 · Z (kod + obejrzany plik)**
`{ src: "/images/portfolio/packshoty-produktowe/01.jpg", alt: "Packshot produktowy na białym
tle, fotografia produktowa e-commerce, Poznań" }`. Obejrzane: szklanka drinka z limonką
i słomką na **jaskrawożółtym tle**, z liśćmi monstery. To zdjęcie kreatywne, nie packshot
na białym. Ten sam plik (md5 identyczny) żyje jako `/images/portfolio-3.jpg`
i `/images/blog/fotografia-produktowa-ecommerce-3.jpg`.

**9. [SEO] `alt` mówi „headshoty zespołu w biurze", zdjęcie to jedna osoba przy oknie** ·
`portfolio.ts:557` · **P2 · S · 🤖 · Z (kod + obejrzany plik)**
Obejrzane `portfolio/sesja-korporacyjna/01.jpg`: pojedyncza kobieta w błękitnej koszuli
z czerwonym notatnikiem, przy oknie. Ani zespołu, ani headshotu.

**10. [SEO] Sześć z siedmiu obrazów OG dla usług to karty tekstowe bez ani jednego zdjęcia** ·
`public/images/og/uslugi/*` · **P2 · M · 🧑 + 🤖 · Z (obejrzane 7 z 7)**
`eventy-reportaze.png`, `fotografia-produktowa.png`, `pakiety-foto-wideo.png`,
`sesje-zespolowe.png`, `wideo-marketing.png`, `wizerunek-portrety.png` to granatowe
prostokąty z nazwą usługi i stopką. Każdy waży 25-28 KB, bo nie ma na nich fotografii.
Ktoś wkleja link do usługi fotografa na LinkedIna albo do Slacka i dostaje ciemny prostokąt
z napisem. Jedyny OG usługi ze zdjęciem, `zdjecia-wideo-z-drona.jpg`, pokazuje **ceglaną
fasadę restauracji Yes Butcher z niskiej wysokości**, czyli kadr, po którym trudno poznać,
że to usługa dronowa; w folderze `dron` leży dziewięć ujęć, które mówią to od razu.
Ta sama uwaga dotyczy `og/portfolio/box17-budki-akustyczne.png`.
Ósmej usługi nie ma na tej liście, bo jej plik OG w ogóle nie istnieje, patrz finding 23.
To samo w drugą stronę: `og/strony/home.jpg` i `galeria.jpg` mają portret i wyglądają dobrze.

**11. [SEO] Alt hero i kafli generowany z nazwy usługi, nie z zawartości kadru** ·
`ServiceHero.tsx:58`, `Services.tsx:65`, `Portfolio.tsx:32`, `PortfolioHero.tsx:127`,
`BlogCard.tsx:23` · **P2 · M · 🤖 · Z (kod + pomiar DOM)**
Pięć różnych szablonów, wszystkie opisujące kontekst, nie obraz:
`` `${service.title}, Poznań` ``, `` `${s.title}, przykładowa realizacja` ``,
`` `Zdjęcie z realizacji: ${item.label}` ``, `category.label`, `post.title`.
Pomiar na produkcji potwierdza: „Wideo marketing, przykładowa realizacja" stoi pod zdjęciem
ludzi przybijających piątkę na torze wyścigowym w deszczu. Dotyczy 8 hero usług, 8 kafli usług,
**4 kafli portfolio** (tyle jest opublikowanych), 9 hero case study, w tym 5 na trasach
z `noindex`, i **26 okładek blogowych** (`alt` = tytuł artykułu).
Uwaga poboczna: `` `${service.title}, Poznań` `` dokleja miasto przecinkiem, czyli konstrukcję,
którą `docs/zasady-tekstow.md` zakazuje w nagłówkach.

**12. [SEO] Pasek galerii na usługach numeruje alt, czyli wraca wzorzec zamknięty na `/galeria`** ·
`ServiceGalleryLightbox.tsx:72,144` · **P2 · S · 🤖 · Z (kod)**
`` alt={`${altBase} ${i + 1}`} `` daje „Portret biznesowy, Marcin Szabunia, Poznań 1",
„… 2", „… 3". Komentarz w `galeria/page.tsx:57-58` opisuje dokładnie ten wzorzec jako to,
od czego odchodzono („kolejne warianty z listy zamiast jednego szablonu z numerem").
Dwa mechanizmy galerii w jednym repo, dwie różne jakości opisu.

**13. [UX] Kadr kwadratowy w kafelku 16:9 i kadr 9:16 w kafelku kwadratowym** ·
inwentarz + `BlogCard.tsx:21`, `ServiceGalleryStrip.tsx:207-213` · **P2 · S · 🤖 · Z (pomiar)**
`blog/fotografia-produktowa-ecommerce-3.jpg` ma **1600×1600**, a `BlogCard` renderuje
`aspect-[16/9]` z `object-cover`: ginie ok. 44% wysokości kadru, czyli góra i dół szklanki.
Symetrycznie `produkt-14-hob-koszulki.jpg` ma **1080×1920** (9:16) i stoi w pasku
produktowym, który dla tej kategorii ma `aspect-square`: znowu ok. 44% w pionie.
`produkt-16-pedzelek.jpg` to pojedynczy cienki pędzelek na bieli, w kwadracie zostaje
prawie pusty kafelek. Wszystkie trzy są w widocznych miejscach.

**14. [TREŚĆ] Trzy pary bliźniaczych okładek blogowych** · obejrzane 26 z 26 ·
**P2 · M · 🧑 · O (opinia redakcyjna, kadry są poprawne osobno)**
- `headshoty-zespolu-w-jeden-dzien.jpg` (siatka 3 portretów na granacie) i
  `spojne-portrety-zespolu.jpg` (siatka 6 portretów na granacie) — na liście bloga czytają
  się jak ten sam wpis dwa razy.
- `zdjecia-film-z-drona-dla-firm.jpg` i `zdjecia-z-drona-dla-deweloperow.jpg` — **to samo
  ceglane osiedle**, raz z niższego, raz z wyższego pułapu.
- `jak-przygotowac-sie-do-sesji-biznesowej-2.jpg` i `zdjecie-do-cv-w-domu-2.jpg` — kobieta
  na tym samym szarym tle, ta sama tonacja.

**15. [TREŚĆ] Dwa hero usług nie pokazują tego, co usługa sprzedaje** ·
`services.tsx:377`, `services.tsx:200` · **P2 · S · 🧑 · Z (kod + obejrzane pliki)**
- „Wideo dla firm i filmy korporacyjne" (`h1`, `services.tsx:348`) ma w hero
  `galeria/eventy/event-03.jpg`, obejrzane: **plenerowa integracja na torze**, ludzie
  w koszulkach przybijający piątkę. Zdjęcie, i to z eventu, na podstronie o filmach
  korporacyjnych. Ta podstrona ma `videoFirst`, więc film jest wyżej niż paski — ale hero
  widać pierwsze.
- „Headshoty zespołu w biurze albo w studiu" (`services.tsx:180`) ma w hero
  `portfolio/sesje-zespolowe-cover.jpg`, obejrzane: **dwie osoby**, mężczyzna w białej
  koszuli i kobieta w czerwonej sukience na ramiączkach, kadr czytający się jak para,
  nie jak zespół w standardzie firmowym. Ten sam kadr (inne pliki, inne wycinki) stoi też
  jako okładka wpisu „Co założyć na sesję biznesową" i jako `portret-06` w galerii.
  Obok, w `portfolio/idcom/`, leży sześć headshotów w trzech tłach z prawdziwej sesji zespołowej.

**16. [UX] Kategoria „Portrety" otwiera się operatorem z kamerą** ·
`lib/galleryImages.ts` (sort po nazwie = kolejność) + obejrzany `portret-01.jpg` ·
**P2 · S · 🧑 · Z (obejrzane)**
Pierwszy kadr zakładki „Portrety" na `/galeria` to mężczyzna w oversize'owym T-shircie
trzymający kamerę na gimbalu, na czarnym tle. Kadr jest dobry, ale otwiera kategorię
opisaną jako „portrety biznesowe i headshoty" i jest jedynym w niej ujęciem sprzętowym.
Trzynaście pozostałych to portrety biznesowe. Pasek `CURATED.portrety` na podstronach usług
tego kadru **nie zawiera** — czyli selekcja już go raz odrzuciła, tylko galeria o tym nie wie.
Poprawka: przenumerować w ramach ZDJ2608-01, kiedy i tak zmieniają się nazwy.

**17. [BIZNES] Mina w draftcie: miniatura „Sesji wizerunkowej" to zdjęcie grupowe przy autach
sportowych** · `portfolio.ts:390` · **P2 · S · 🧑 · Z (kod + md5 + obejrzane)**
`thumbnail: "/images/portfolio-1.jpg"`. Ten plik jest bajtowo identyczny z
`portfolio/sesja-wizerunkowa/01.jpg` i pokazuje **kilkudziesięcioosobową grupę w koszulkach
firmowych przy Lamborghini i Ferrari na torze**. Galeria tego case study została 04.08
wyczyszczona do sześciu portretów, a komentarz w kodzie mówi wprost, że zdjęcie grupowe
„na sesji wizerunkowej było obce" i zostało przeniesione. **Miniatura została.**
Dziś nic się nie dzieje, bo slug jest w `DRAFT_SLUGS:626`. W momencie zdjęcia draftu
personal branding dostaje kafelek z torem wyścigowym.
Poprawka: `thumbnail: "/images/galeria/portrety/portret-05.jpg"` (ten sam kadr otwiera galerię).

**18. [TECH] Dwie sieroty i placeholder w gicie** · inwentarz kontra referencje ·
**P3 · S · 🤖 · Z (skrypt)**
Po odjęciu referencji dynamicznych (galerie listowane z dysku, OG składane z szablonu)
zostają dokładnie dwa nieużywane pliki: `portfolio/artech/2.jpg` (**925 KB, 2048×2048**,
najcięższy plik w folderze Artech, obejrzane: szara płyta z tworzywa) oraz
`portfolio/sesja-wizerunkowa/01.jpg` (**527 KB**, kopia `portfolio-1.jpg`). Dodatkowo
`portfolio/box17/_WRZUC-TU-ZDJECIA.txt` jest śledzony w gicie i przestał być aktualny
w chwili wgrania zdjęć.

**19. [TECH] `sizes` hero na home deklaruje 40vw, element renderuje 25,6vw** ·
`Hero.tsx:71` + pomiar renderu · **P3 · S · 🤖 · Z (live + kod)**
Przy viewporcie 1728 px element hero ma **442 px** szerokości CSS, a `sizes` deklaruje
40vw = 691 px. Przeglądarka pobiera wariant o ~56% szerszy, niż potrzeba. Kierunek błędu
jest bezpieczny (za duży, nie za mały), ale to zmarnowany transfer na obrazie z `priority`
i `fetchPriority="high"`, czyli tym, który blokuje LCP.

**20. [TECH] Trzy kadry dronowe leżą na dysku dwa razy** · md5 · **P3 · S · 🤖 · Z (pomiar)**
`wnetrze-10/11/12` są bajtowo identyczne z `dron-10/04/03`. Repo ma na to własną regułę,
zapisaną przy kategorii `obiekty`: „Wskazujemy je stąd zamiast kopiować pliki: jeden plik
na dysku, dwa konteksty użycia". Tutaj zrobiono odwrotnie, świadomie, bo `listGalleryImages`
czyta katalog. Koszt: 1,7 MB i trzeci komplet nazw do pilnowania. Ten sam mechanizm powoduje,
że po przełączeniu zakładki z „Dron" na „Wnętrza i hale" ostatni rząd pokazuje te same
trzy budynki. Grup duplikatów bajtowych jest w sumie **dziewięć**. Poza dronową trójką najważniejsza jest
ta: **`galeria/wnetrza/wnetrze-06.jpg` = `portfolio/box17/box17-07.jpg`** (661 KB), z dwoma
różnymi altami. Po publikacji Box17 (§12.2) ten sam kadr stanie w galerii wnętrz i w case
study, opisany raz jako „Wnętrze kabiny akustycznej w biurze", raz jako „Wnętrze budki
akustycznej: wykończenie ścian i wykładzina podłogowa". Pozostałe grupy to `portfolio-1..4`
kontra foldery draftowych case studies (cztery grupy, jedna z nich trzyelementowa)
oraz `woohoo-autopay.jpg` kontra `blog/slownik-pojec-wideo.jpg`.

**21. [TECH] Czternaście plików ma bok powyżej 2000 px, w tym siedem packshotów Artech
w 2048×2048** · inwentarz · **P3 · S · 🤖 · Z (pomiar)**
Rozkład: `portfolio/artech` 7 plików 2048×2048 (`2.jpg` 925 KB, `33.jpg` 802 KB, `17.jpg` 778 KB,
`_F2A8912.jpg` 644 KB), `portfolio/idcom` 4 pliki 1365×2048 (660-853 KB),
`produkt-07-box17-budka-pojedyncza.jpg` 1365×2048 (**1541 KB**, najcięższy plik w repo)
oraz para `portfolio-4.jpg` i `sesja-korporacyjna/01.jpg` 1600×2400 (ten sam plik dwa razy).
Galeria case study renderuje je przez `sizes="(max-width: 768px) 50vw, 33vw"`, więc źródło
jest 2-3 razy większe, niż kiedykolwiek trzeba. `next/image` to przeliczy, ale pierwszy
przelicz kosztuje i zajmuje cache optymalizatora.

**22. [TECH] Komentarz o kadrowaniu myli się co do orientacji kadru** · `services.tsx:724-726` ·
**P4 · S · 🤖 · Z (kod + git + pomiar)**
`SERVICE_TILE_POS["sesje-zespolowe"] = "center 20%"` z uzasadnieniem „**Pionowy** portret pary
w kadrze 16:9 (mobile) ciął głowy przy center". Plik `sesje-zespolowe-cover.jpg` jest
**poziomy, 1120×840**, i był taki od pierwszego commita (`cb2bd52`, 25.06.2026); komentarz
powstał później (06.07). Podmiany pliku nie było, więc sam mechanizm jest opisany dobrze
(kadr 4:3 przycinany do 16:9 na mobile, `Services.tsx:60`) i kotwica może być potrzebna.
Myli się jedno słowo, ale to słowo każe następnej osobie szukać pliku, którego nie ma.

**24. [TECH] Miniatury filmów omijają cały aparat obrazowy strony** ·
`YouTubeFacade.tsx:49-57`, `ServiceVideoGrid.tsx:70-75` · **P2 · M · 🤖 · Z (kod)**
To jedyne dwa miejsca z surowym `<img>` zamiast `next/image` (oba z `eslint-disable`).
Ciągną `hqdefault.jpg` z `i.ytimg.com`, czyli **480×360 w proporcji 4:3 z czarnymi pasami**
dla materiału 16:9, wstawiane w kontener `aspect-square`. Nie mają `width`/`height`, więc
nie rezerwują miejsca (ryzyko CLS), a `alt` bierze się z tytułu filmu, czyli dokładnie ten
wzorzec, który finding 11 krytykuje gdzie indziej. Filmy stoją na czterech podstronach usług,
w `/galeria` i w case studies, więc to nie jest margines warstwy wizualnej.
Poprzedni audyt odnotował zewnętrzną zależność od `i.ytimg.com` w ścieżce renderu; ten audyt
dokłada do tego proporcję, brak wymiarów i jakość źródła.

**25. [TECH] `sizes` w `About` nie uwzględnia `scale-[1.15]`** · `About.tsx:17,23` ·
**P3 · S · 🤖 · Z (kod + arytmetyka)**
Kolumna to `(1152 − 64) / 2 = 544 px`, a obraz siedzi w `scale-[1.15]`, więc renderuje się
na ~626 px. `sizes` deklaruje 520 px. Przy DPR 2 potrzeba ~1250 px, a źródło
`marcin-o-mnie.jpg` ma 1385 px, więc zapas jest, ale przeglądarka i tak dostanie polecenie
pobrania węższego wariantu. Sam zabieg z `0px` poniżej 1024 px jest poprawny (§2),
błędna jest tylko liczba po przecinku.

**26. [UX] Cztery kafelki w siatce trzykolumnowej zostawiają sierotę** ·
`portfolio/page.tsx:83` + `portfolioItems` · **P3 · S · 🤖 · Z (kod)**
`grid-cols-2 lg:grid-cols-3` przy czterech opublikowanych realizacjach daje na desktopie
rząd trzech i jeden samotny kafelek. Po zdjęciu Box17 z draftu będzie 3 + 2. Repo już raz
ten problem rozwiązywało świadomie po stronie usług: `services.tsx:654-657` tłumaczy,
że przy ośmiu usługach dwa dolne kafelki mają `wide: true`, „więc w ostatnim rzędzie
nie ma sieroty". Portfolio takiego mechanizmu nie ma.

---

## 6. Hipotezy do sprawdzenia (H)

**H1. Hero na produkcji mógł zostać podany w 315 px przy żądaniu `w=1920`.**
Jeden pomiar w Chrome (viewport 1728, DPR 2) pokazał `currentSrc` z parametrem `w=1920&q=72`
i jednocześnie `naturalWidth = 315` przy elemencie o szerokości 442 px CSS. Źródło na dysku
ma 877×1168, więc taki wynik nie ma oczywistego wyjaśnienia i **równie dobrze może być
artefaktem pomiaru w trakcie dekodowania AVIF**. Powtórzyć nie udało się: renderer zawiesił
się przy dwóch kolejnych próbach. **Krok weryfikujący:** otworzyć bezpośrednio
`https://szabunia.pl/_next/image?url=%2Fimages%2Fmarcin-hero-light-4.jpg&w=1920&q=72`
i odczytać wymiar obrazu; jeśli wyjdzie 877 px, hipoteza upada.

**H2. Nie wiadomo, czy obrazy są dziś wąskim gardłem LCP.**
`marcin-hero-light-4.jpg` ma `priority` i `fetchPriority="high"`, więc jest kandydatem na LCP
strony głównej, a jego źródło ma tylko 877 px szerokości przy elemencie wymagającym do
884 px przy DPR 2. **Krok weryfikujący:** PageSpeed Insights na `/` i na jednej podstronie
usługi, mobile i desktop, z zapisaniem daty. Piąty audyt z rzędu, w którym tego nie zrobiono.

**H3. `yes-butcher-02.jpg` może nie być zdjęciem z drona.** `portfolio.ts:356` opisuje je
jako „Budynek Yes Butcher! w Starych Koszarach **z drona**". Obejrzany kadr jest wyraźnie
podniesiony, ale nisko; perspektywa czyta się bardziej jak ujęcie z podnośnika albo z okna
naprzeciwko. **Krok weryfikujący:** EXIF pliku źródłowego u Marcina albo jedno zdanie od niego.
Ma znaczenie, bo ten sam kadr jest OG usługi dronowej (ZDJ2608-10).

**H4. Kadrowanie na telefonie nie zostało zmierzone.** Wszystkie wnioski o `object-cover`
i `objectPosition` są policzone z proporcji pliku i klasy kontenera, nie zobaczone na 390 px.
**Krok weryfikujący:** przejście `/`, `/uslugi/sesje-zespolowe`, `/galeria?kat=produktowe`
na 390 px z zrzutami.

---

## 7. Obserwacje bez akcji

- Folder `eventy` ma luki w numeracji: `event-08` i `event-11` zniknęły **15.06.2026**
  (`59c04b4`), a `event-18` dopiero 04.08 (`d4bfbec`, scena z laserami) i akurat ta nie
  zostawiła luki, bo była na końcu ciągu. `portrety` nie mają luk.
- Trzy pliki `reel-1/2/3.jpg` to zrzuty z filmu z wypalonymi napisami po polsku
  („Co ogranicza Twój sklep?"). W roli okładek reelsów to poprawne, ale warto wiedzieć,
  że w portfolio są cztery różne obiekty graficzne z tekstem: trzy reelsy plus dwie plansze Woohoo.
- Największy folder wagowo to `produktowe` (8,8 MB / 24 pliki), potem `wnetrza` (7,2 MB / 12)
  i `yes-butcher` (7,0 MB / 11). Całość `public/images` to ok. 62 MB.
- `produkt-07-box17-budka-pojedyncza.jpg` waży **1 541 KB**, czyli **2,25 raza** więcej niż
  drugi w kolejności (`produkt-20-bransoletka-jeans.jpg`, 684 KB). Przy 1365×2048 to plik
  zapisany bez kompresji pod www.
- Kategoria produktowa łączy cztery światy: packshoty na bieli, dania restauracyjne,
  moda na modelce i samochody. Podpis mówi o „packshotach i zdjęciach produktów z realizacji
  e-commerce", co nie obejmuje ani dań, ani aut. To jest ten sam typ rozjazdu co ZDJ2608-05,
  tylko słabszy, bo wszystko tu jest fotografią przedmiotu.

---

## 8. Świadomie nie ruszamy (decyzje zamknięte)

Sprawdzone w `git log` i w komentarzach, **nie zgłaszam jako błędów**:

| Co | Kiedy i gdzie |
|---|---|
| Amarula na drugim miejscu w produktowych | `ee5970d`, 04.08 |
| Budki Box 17 nad modą, 24 kadry w ośmiu rzędach | `158b955`, `a67caa3`, 04.08 |
| Biurowiec w zieleni zamiast panoramy na kafelku i w hero dronowym | `35a66cc`, 04.08 |
| Wieżowiec przesunięty na koniec pasa dronowego | `d4bfbec`, 04.08 |
| Scena z laserami zdjęta z eventów | `d4bfbec`, 04.08 |
| Jeden film Woohoo w galerii zamiast dwóch | `d4bfbec` + komentarz w `galeria.ts:6-16` |
| Film rozdziela paski galerii, na wideo marketingu otwiera | `f715551`, `a67caa3` |
| `portret-07` wypadł z `CURATED.portrety` (ta sama twarz co w IDcom) | komentarz `ServiceGalleryStrip.tsx:58-61` |
| Panorama świadomie poza kategorią `obiekty` | komentarz `ServiceGalleryStrip.tsx:86-93` |
| Okładka wideo z powrotem na Autopay | `a67caa3` + komentarz `services.tsx:705-707` |
| Kolejność kart usług (eventy pierwsze) | decyzja 30.07, przebudowa hierarchii na wrzesień |
| Skład `CURATED.produktowe` (8 kadrów, z imiennymi komentarzami przy każdym) | `158b955`, 04.08 |
| Brak cennika w jakiejkolwiek formie | decyzja 03.08 |

---

## 9. Czego NIE sprawdzono i czego do tego potrzeba

| Obszar | Dlaczego nie | Czego potrzeba |
|---|---|---|
| **LCP i realny koszt obrazów** | brak PSI/Lighthouse w tej sesji | PSI na `/` i `/uslugi/<slug>`, mobile + desktop, z datą |
| **Treść 37 kart OG** (26 blog, 6 portfolio, 5 stron) | pominięte przy oglądaniu; **wymiary sprawdzone dla wszystkich 50 i wszystkie są poprawne**, nieznana jest tylko zawartość 37 z nich | jedno przejście po `og/blog/*` i `og/portfolio/*` |
| **Render na telefonie** | mierzono tylko 1728 px | przejście na 390 px, patrz H4 |
| **Ciemny motyw** | nie sprawdzono, jak kadry z jasną bielą (packshoty Artech, `produkt-16`) siadają na `#0B0F1A` | przełączenie motywu na `/portfolio/artech-fotografia-produktowa` |
| **Które zdjęcie sprzedaje** | nie ma danych per obraz i nie da się ich zdobyć bez instrumentacji | zdarzenie kliknięcia w kafelek portfolio w GA4 |
| **Zdjęcia w Profilu Firmy w Google** | poza repo; audyt z 29.07 odnotował „ostatnie zdjęcia 75 dni temu", decyzja Marcina „na razie bez zdjęć" | osobna runda, jeśli decyzja się zmieni |
| **EXIF i metadane w plikach** | nie czytano; nie wiadomo, czy pliki niosą dane GPS albo nazwiska | `exiftool` na `public/images/**` |

---

## 10. Pozorne problemy skorygowane w trakcie

**10.1. „Linia obiektowa jest wyłączona, więc `wnetrza` to zdjęcia nieużywane."**
Tak brzmiała granica, którą **sam wpisałem do promptu uruchomieniowego**, przepisując ją
z pamięci projektu i z `CLAUDE.md`. Nieprawda: `DRAFT_SERVICE_SLUGS` (`services.tsx:652-660`)
jest **pusty**, a komentarz w nim mówi „Włączona z powrotem na jego prośbę 04.08.2026".
Usługa „Wnętrza, obiekty i architektura" jest opublikowana, ma hero, kafelek i pasek galerii.
Przyczyna błędu: przyjąłem stan z dokumentu zamiast z kodu. Prompt na przyszłość wymaga
poprawki tej linijki.

**10.2. „Miniatura sesji wizerunkowej pokazuje tor wyścigowy" jako aktywny błąd na produkcji.**
Prawda co do pliku, fałsz co do skutku: slug jest w `DRAFT_SLUGS:626`, więc kafelek się
nie renderuje. Zeszło z P1 na P2 i zmieniło charakter z błędu na minę (ZDJ2608-17).

**10.3. „Siedemnaście z dwudziestu obrazów na home się nie ładuje."**
Pierwszy pomiar renderu pokazał `naturalWidth = 0` i pusty `currentSrc` dla 17 obrazów.
To `loading="lazy"` plus pomiar wykonany zaraz po przewinięciu, czyli **dokładnie ten sam
fałszywy pozytyw, który audyt UX z 31.07 opisał w swoim §10.2**. Wycofane.

**10.4. „`wnetrze-10/11/12` to niezamierzone duplikaty."**
Komentarz w `galeria/page.tsx:110-114` opisuje to jako decyzję i wprost pisze „te trzy kadry
leżą na dysku dwa razy". Zeszło do P3 jako koszt świadomej decyzji, nie jako błąd (ZDJ2608-20).

**10.5. „Dania z restauracji nie należą do kategorii produktowej."**
Zdjęcia potraw to normalna fotografia produktowa dla gastronomii i Marcin ma na to klienta
(Yes Butcher w przewodniku Michelin). Problemem jest podpis mówiący o e-commerce, nie kadry.
Przeniesione do §7 jako obserwacja.

---

**10.6. Sześć pomyłek złapanych przy weryfikacji gotowego raportu.**
Ostatnim krokiem audytu było sprawdzenie własnej pracy przez niezależne przejście po każdym
cytacie i każdej liczbie. Znalazło sześć błędów, wszystkie poprawione powyżej. Wypisuję je,
bo połowa to ten sam mechanizm: **przeczytałem fragment pliku i wyciągnąłem wniosek o całości.**

1. **„Siedem opublikowanych realizacji."** Przeczytałem `DRAFT_SLUGS` do linii 626 i zobaczyłem
   dwa wpisy. Wpisów jest **pięć**, opublikowanych realizacji **cztery**. Ta liczba szła dalej
   do findingu 11 i do metryk re-audytu.
2. **„Zero surowego `<img>`."** Grep szedł po `next/image`, nie po `<img`. Są dwa
   (`YouTubeFacade.tsx:49`, `ServiceVideoGrid.tsx:70`) i pociągnęły za sobą cały nowy finding 24.
3. **„Siedem plików ponad 2000 px, wszystkie w jednym folderze."** Skrypt sprawdzał tylko
   szerokość. Przy sprawdzeniu obu boków wychodzi **czternaście** plików w czterech folderach
   plus korzeń.
4. **Kotwica kadrowania „ustawiona pod inny plik"** (finding 22). `git log` na
   `sesje-zespolowe-cover.jpg` pokazuje **jedną** wersję od 25.06 i zawsze 1120×840.
   Podmiany nie było, myli się jedno słowo w komentarzu. Finding zszedł z „nieaktualny"
   na „nieprecyzyjny".
5. **Luki `event-08` i `event-11` przypisane do `d4bfbec`** (04.08). Powstały 15.06
   w `59c04b4`; `d4bfbec` usunął `event-18`, czyli koniec ciągu, bez luki.
6. **Rekomendacja `sizes` w findingu 7 pogarszała sytuację na dużych ekranach**, bo nie
   uwzględniała kontenera `max-w-5xl`. Poprawiona na wartość zakończoną stałą w pikselach.
   Przy okazji okazało się, że siedem kategorii, które zaliczyłem jako „zgodne", też jest
   rozjechanych, tylko w drugą stronę.

Wniosek na przyszłość, wart dopisania do metodyki: **przy każdej liczbie w raporcie sprawdź,
czy policzyłeś ją na pełnym zbiorze, czy na fragmencie, który akurat miałeś otwarty.**
Trzy z sześciu powyższych błędów to dokładnie ten mechanizm.

---

## 11. Plan działania (kolejnością wdrożenia)

### Quick wins, każdy poniżej godziny

| # | ID | Co | Owner |
|---|---|---|---|
| 1 | ZDJ2608-02 | Usunąć `box17-budki-akustyczne` z `DRAFT_SLUGS` po decyzji Marcina | 🧑 → 🤖 |
| 2 | ZDJ2608-17 | Podmienić `thumbnail` draftu `sesja-wizerunkowa` na `portret-05.jpg` | 🤖 |
| 3 | ZDJ2608-08, -09 | Poprawić dwa `alt` niezgodne z kadrem | 🤖 |
| 4 | ZDJ2608-06 | Etykieta zakładki: „Wnętrza, hale i obiekty" | 🤖 |
| 5 | ZDJ2608-07 | Przekazać `sizes` razem z `gridClass` do lightboxa | 🤖 |
| 6 | ZDJ2608-18 | Przenieść dwie sieroty i placeholder `.txt` do `_to_delete/` | 🤖 |
| 7 | ZDJ2608-19 | `sizes` hero na `(max-width: 768px) 100vw, 26vw` | 🤖 |
| 8 | ZDJ2608-22 | Poprawić nieprecyzyjne słowo w komentarzu o kadrowaniu | 🤖 |
| 9 | ZDJ2608-23 | Fallback OG dla ósmej usługi na `/images/og/strony/uslugi.jpg`, zanim powstanie właściwy plik | 🤖 |
| 10 | ZDJ2608-25 | `sizes` w `About` z 520 px na 630 px | 🤖 |

### Dalej, w tej kolejności

11. **ZDJ2608-23** — właściwy obraz OG dla „Wnętrz, obiektów i architektury" (produkcja
    graficzna, nie kod).
12. **ZDJ2608-03** — pierwszy kafelek portfolio ma być fotografią (decyzja: podmiana `tileImage`
    albo przestawienie `FEATURED_SLUGS`).
13. **ZDJ2608-01** — dokończyć konwencję nazw w `eventy`, `portrety`, `wnetrza`, `box17`.
    **Musi iść przed 14**, bo alty wiązane z kolejnością plików bez tego są kruche.
14. **ZDJ2608-04** — po jednym `alt` na kadr dla `eventy` (15) i `portrety` (14).
15. **ZDJ2608-12** — ujednolicić mechanizm altów w pasku usług z tym z `/galeria`.
16. **ZDJ2608-24** — miniatury filmów: `next/image`, `maxresdefault`, wymiary, opisowy `alt`.
17. **ZDJ2608-11** — alty hero i kafli opisujące kadr, nie kontekst (55 miejsc).
18. **ZDJ2608-13, -21** — kadry o skrajnych proporcjach i przygotowanie plików pod www.
19. **ZDJ2608-26** — siatka `/portfolio` bez sieroty w ostatnim rzędzie.
20. **ZDJ2608-10** — OG usług ze zdjęciem zamiast kart tekstowych (6 obrazów do zrobienia).
21. **ZDJ2608-05, -15, -16, -14** — dobór kadrów; wymaga decyzji Marcina, nie kodu.

### Data kontrolna re-audytu: 2026-08-18

Mierzyć tą samą metodą co dziś:
- liczba plików w folderach bez konwencji opisowej (dziś: **51** w czterech folderach)
- liczba altów szablonowych, czyli generowanych z tytułu lub nazwy usługi (dziś: **55**)
  i rotujących po zbyt krótkiej liście (dziś: **29**)
- liczba OG usług bez fotografii (dziś: **6 z 7 istniejących**) i brakujących plików OG
  (dziś: **1 z 8 usług**)
- liczba opublikowanych case studies (dziś: **4 z 9** w danych; jedna gotowa do publikacji)
- liczba sierot (dziś: **2**) i grup duplikatów bajtowych (dziś: **9 grup**, w tym jedna trójka)
- liczba surowych `<img>` (dziś: **2**)
- pierwszy kafelek portfolio: fotografia tak/nie (dziś: **nie**)

---

## 12. Decyzje potrzebne od Marcina

**12.1. Cache obrazów: `immutable` kontra podmiany pod tą samą nazwą** (stop-condition
`CLAUDE.md §10.2` — `next.config.ts`)

| Wariant | Koszt | Ryzyko | Odwracalność |
|---|---|---|---|
| **A. Dokończyć konwencję nazw w 4 folderach** (rekomendacja) | ~1 h pracy agenta | stare adresy znikają, ale one i tak nie są linkowane z zewnątrz | pełna, jeden commit |
| B. Zmienić `immutable` na `max-age=86400, must-revalidate` | 5 min | co dzień jedno zapytanie warunkowe na obraz, minimalny koszt transferu | pełna |
| C. Nie robić nic | 0 | przy następnym przestawieniu ktoś znowu zobaczy nie to zdjęcie, przez rok | — |

Rekomendacja: **A**, bo usuwa przyczynę, a nie objaw. B jako ubezpieczenie na czas migracji.
Kryterium sukcesu: po 18.08 zero plików `NN.jpg` bez opisu w `public/images/galeria/**`.

**12.2. Czy publikujemy Box17?**
Warunek z Twojej własnej notatki („po wgraniu `box17.jpg`") jest spełniony od dziś rano.
Case study ma 9 zdjęć z gotowymi altami, film produktowy i miniaturę. Odpowiedź TAK oznacza
usunięcie jednej linii i osobno zrobienie OG ze zdjęciem zamiast obecnej karty tekstowej.
Odpowiedź NIE oznacza dopisanie w komentarzu, co jeszcze musi się wydarzyć, żeby to
przestało być wieczne „prawie gotowe".

**12.3. Czym są dla nas „eventy"?**
Kategoria obiecuje konferencje, targi i gale, a 10 z 15 kadrów to integracje, koncerty i kluby.
Dwie drogi, obie spójne:

| Wariant | Co robimy | Konsekwencja |
|---|---|---|
| **A. Zawężamy obraz do B2B** | `event-09` i `event-17` wychodzą z paska na podstronach usług, zostają w galerii | pasek mówi to samo co podpis; galeria dalej pokazuje pełen zakres |
| **B. Poszerzamy obietnicę** | podpis: „konferencje, gale, integracje i imprezy firmowe" | uczciwe wobec materiału, ale rozmywa pozycjonowanie B2B z 30.07 |
| C. Nie robić nic | — | kupujący z HR widzi klub na podstronie o konferencjach |

Rekomendacja: **A**, bo `korekta_pozycjonowania_2026-07.md` postawiła na eventy firmowe jako
tożsamość, a nie na imprezy w ogóle. Kryterium sukcesu: sprawdzić po miesiącu, czy zapytania
w GSC na klastrze eventowym dalej idą w stronę „konferencja/gala", czy w stronę „impreza".

**12.4. Czy „Sesje zespołowe" mają zostać przy zdjęciu pary?**
W `portfolio/idcom/` leżą headshoty z prawdziwej sesji zespołowej w trzech tłach. Hero
podstrony pokazuje dwie osoby wyglądające jak para. Zamiana to jedna linia
(`services.tsx:200`). Pytanie zamknięte: zostawiamy parę czy wchodzi kadr z IDcom?

**12.5. Czy robimy siedem OG usług ze zdjęciem?**
To jedyna pozycja z tego audytu, która wymaga produkcji graficznej, nie kodu.
Sześć kart jest dziś czysto tekstowych. Pytanie zamknięte: robisz je sam w Canvie,
czy agent ma złożyć je z istniejących kadrów plus napis?

---

## Rejestr findingów

| ID | Finding | P | Owner | Status | Dokument |
|---|---|---|---|---|---|
| ZDJ2608-01 | Nazwy numeryczne w 4 folderach przy cache `immutable` | P1 | 🤖 | otwarty | BRIEFY-ZDJECIA-2026-08-04.md |
| ZDJ2608-02 | Box17 gotowy, ale w `DRAFT_SLUGS` | P1 | 🧑 | czeka na decyzję §12.2 | — |
| ZDJ2608-03 | Portfolio na home otwierają grafika i klatka z filmu | P1 | 🧑 | otwarty | BRIEFY |
| ZDJ2608-04 | Alt rotuje po 5 wariantach na 15 i 14 kadrów | P1 | 🤖 | otwarty | BRIEFY |
| ZDJ2608-05 | Kategoria eventowa obiecuje konferencje, pokazuje kluby | P1 | 🧑 | czeka na decyzję §12.3 | — |
| ZDJ2608-06 | „Wnętrza i hale" zawiera 4 zewnętrza | P2 | 🤖 | otwarty | BRIEFY |
| ZDJ2608-07 | `sizes` w paskach galerii niezgodne z siatką i kontenerem | P2 | 🤖 | otwarty | BRIEFY |
| ZDJ2608-08 | Alt „na białym tle" przy żółtym tle | P2 | 🤖 | otwarty | BRIEFY |
| ZDJ2608-09 | Alt „headshoty zespołu" przy jednej osobie | P2 | 🤖 | otwarty | BRIEFY |
| ZDJ2608-10 | 6 z 7 istniejących OG usług bez fotografii | P2 | 🧑 | czeka na decyzję §12.5 | — |
| ZDJ2608-11 | Alt hero i kafli z szablonu (55 miejsc) | P2 | 🤖 | otwarty | — |
| ZDJ2608-12 | Numerowany alt w pasku usług | P2 | 🤖 | otwarty | — |
| ZDJ2608-13 | Kadr 1:1 w kafelku 16:9 i 9:16 w kwadracie | P2 | 🤖 | otwarty | — |
| ZDJ2608-14 | Trzy pary bliźniaczych okładek blogowych | P2 | 🧑 | otwarty | — |
| ZDJ2608-15 | Hero wideo marketingu i sesji zespołowych | P2 | 🧑 | czeka na decyzję §12.4 | — |
| ZDJ2608-16 | Portrety otwiera operator z kamerą | P2 | 🧑 | otwarty | — |
| ZDJ2608-17 | Miniatura draftu `sesja-wizerunkowa` | P2 | 🤖 | otwarty | BRIEFY |
| ZDJ2608-18 | Dwie sieroty i placeholder `.txt` | P3 | 🤖 | otwarty | BRIEFY |
| ZDJ2608-19 | `sizes` hero 40vw kontra 25,6vw renderu | P3 | 🤖 | otwarty | BRIEFY |
| ZDJ2608-20 | Trzy kadry dronowe zdublowane na dysku | P3 | 🤖 | otwarty | — |
| ZDJ2608-21 | Czternaście plików z bokiem > 2000 px | P3 | 🤖 | otwarty | — |
| ZDJ2608-22 | Nieprecyzyjne słowo w komentarzu o kadrowaniu | P4 | 🤖 | otwarty | BRIEFY |
| ZDJ2608-23 | Ósma usługa bez pliku OG, `og:image` 404 | P1 | 🧑 + 🤖 | otwarty | BRIEFY |
| ZDJ2608-24 | Miniatury filmów: surowy `<img>`, 4:3, bez wymiarów | P2 | 🤖 | otwarty | — |
| ZDJ2608-25 | `sizes` w `About` bez `scale-[1.15]` | P3 | 🤖 | otwarty | BRIEFY |
| ZDJ2608-26 | Sierota w siatce `/portfolio` | P3 | 🤖 | otwarty | — |
| H1 | Hero podany w 315 px? | — | 🌐 | hipoteza | — |
| H2 | LCP niemierzone | — | 🌐 | hipoteza | — |
| H3 | `yes-butcher-02` z drona? | — | 🧑 | hipoteza | — |
| H4 | Kadrowanie na 390 px | — | 🌐 | hipoteza | — |

---

*Audyt wykonał: Claude (Cowork), 2026-08-04. Dane: repo na commicie `88564ac`, 207 plików
rastrowych, 170 kadrów obejrzanych, pomiar renderu produkcji z 04.08.2026, viewport 1728 px,
DPR 2. Raport przeszedł niezależną weryfikację cytat po cytacie i liczba po liczbie;
sześć znalezionych błędów opisano w §10.6. Nie wprowadza zmian.*
