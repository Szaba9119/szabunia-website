# Briefy — ZDJĘCIA, 2026-08-04

Stan wyjściowy: produkcja `https://szabunia.pl`, commit `88564ac`, `origin/main` = HEAD.
Ten plik = kompletna lista tego, co ZOSTAŁO z audytu `AUDYT-ZDJECIA-2026-08-04.md`.
Findingi bez briefu (ZDJ2608-11, -12, -13, -14, -16, -20, -21, -24, -26) czekają na osobną
rundę albo na decyzję z §12 raportu.

**Raport przeszedł weryfikację cytat po cytacie.** Sześć błędów, które przy niej wyszły,
jest opisanych w §10.6 raportu i **poprawionych w tych briefach**. Dwa z nich zmieniały
zalecenie, nie tylko liczbę: ZDJ2608-07 i ZDJ2608-22.

## Co już wdrożone (NIE dublować)

| Fala | Zakres | Commit |
|---|---|---|
| Kolejność produktowej | Amarula druga, budki nad modą, 24 kadry w 8 rzędach | `ee5970d`, `158b955`, `a67caa3` |
| Konwencja nazw | `produkt-NN-opis.jpg` w folderze produktowym | `158b955` |
| Dron | biurowiec w zieleni na kafelku i w hero, wieżowiec na koniec | `35a66cc`, `d4bfbec` |
| Eventy | scena z laserami zdjęta, jeden film Woohoo w galerii | `d4bfbec` |
| Wnętrza | 12 kadrów, czwarty rząd z powietrza | `9fc7ff4`, `da52117` |
| Galerie case studies | portfolio rozbudowane z jednego zdjęcia do 6-9 | 04.08 |

**DoD wg `CLAUDE.md §6`, rozszerzone:**

1. `npm run lint` → 0 błędów, 0 ostrzeżeń
2. `npx tsc --noEmit` (w sandboxie `next build` pada z Bus error, binarki macOS)
3. `npm run build` lokalnie u Marcina → sukces
4. dev bez błędów w konsoli na `/`, `/portfolio`, `/uslugi/fotografia-produktowa`, `/galeria`, `/blog`
5. dark mode toggle działa na każdej odwiedzonej stronie
6. smoke-test **ścieżek**: przełączenie zakładki w `/galeria`, otwarcie lightboxa, powrót,
   klik w kafelek portfolio z home
7. **specyficzne dla tych briefów:** przy każdej zmianie nazwy pliku obrazu w raporcie
   ma być tabela stary adres → nowy adres

Git wyłącznie Marcin. Żadnych nowych paczek. Nie ruszać treści ani cen.

---

## BRIEF ZDJ2608-17 · Miniatura draftu „Sesja wizerunkowa" — usunięcie miny przed publikacją

**Status:** do wykonania
**Kontekst:** `portfolio.ts:390` ma `thumbnail: "/images/portfolio-1.jpg"`. Ten plik jest
bajtowo identyczny z `portfolio/sesja-wizerunkowa/01.jpg` i pokazuje kilkudziesięcioosobową
grupę przy Lamborghini i Ferrari na torze. Galeria tego case study została 04.08 wyczyszczona
do sześciu portretów, z komentarzem, że zdjęcie grupowe „na sesji wizerunkowej było obce".
Miniatura została. Slug jest w `DRAFT_SLUGS:626`, więc dziś nic nie renderuje, ale zdjęcie
draftu jest opisane w kodzie jako operacja na jedną linię.
**Warianty:**
- **A (rekomendacja):** `thumbnail: "/images/galeria/portrety/portret-05.jpg"` — ten sam kadr
  otwiera galerię tego case study, więc miniatura i pierwsze zdjęcie mówią to samo.
  Ryzyko: `portret-05` jest już hero usługi „Wizerunek i portrety" i kafelkiem tej usługi,
  więc pojawi się trzeci raz.
- **B:** `thumbnail: "/images/galeria/portrety/portret-12.jpg"` — inny kadr z tej samej
  selekcji, nieużywany jako hero. Ryzyko: nie pokrywa się z pierwszym zdjęciem galerii.
**Pliki:** `src/data/portfolio.ts` (jedna linia)
**AC:** `git grep "portfolio-1.jpg"` daje zero trafień w `src/`; po tymczasowym usunięciu
`sesja-wizerunkowa` z `DRAFT_SLUGS` kafelek na `/portfolio` pokazuje portret; draft z powrotem
**Stop:** nie zdejmować sluga z draftu, to osobna decyzja
**ZGODA:** TAK — podmiana miniatury jest autoryzowana tym briefem

---

## BRIEF ZDJ2608-08 + ZDJ2608-09 · Dwa alty niezgodne z kadrem

**Status:** do wykonania
**Kontekst:** oba potwierdzone obejrzeniem plików.
- `portfolio.ts:502` mówi „Packshot produktowy **na białym tle**", a plik
  `portfolio/packshoty-produktowe/01.jpg` (1600×1600) to szklanka drinka z limonką
  na **jaskrawożółtym tle** z liśćmi monstery.
- `portfolio.ts:557` mówi „Sesja korporacyjna, **headshoty zespołu** w biurze",
  a plik `portfolio/sesja-korporacyjna/01.jpg` to **jedna** kobieta w błękitnej koszuli
  z czerwonym notatnikiem, przy oknie.
**Warianty:** jeden. Opis ma zgadzać się z kadrem.
- 502 → „Zdjęcie produktowe drinka na żółtym tle, aranżacja reklamowa na social media"
- 557 → „Portret korporacyjny kobiety przy oknie w biurze, zdjęcie na stronę firmy, Poznań"
**Pliki:** `src/data/portfolio.ts` (dwie linie)
**AC:** oba `alt` opisują to, co widać; zero długich myślników; zero fraz z czarnej listy
z `docs/zasady-tekstow.md`
**Stop:** nie ruszać pozostałych altów w tym pliku, 27 sprawdzonych jest poprawnych
**ZGODA:** TAK

---

## BRIEF ZDJ2608-06 · Etykieta zakładki galerii

**Status:** do wykonania
**Kontekst:** `galeria/page.tsx:103` ustawia `label: "Wnętrza i hale"`. Cztery z dwunastu
kadrów w tej zakładce to zewnętrza, co potwierdzają alty w tym samym pliku: „Elewacja budynku
biurowego o zmierzchu", „Wieżowiec biurowy w Poznaniu z powietrza", „Biurowiec z lotu ptaka",
„Nowoczesny budynek komercyjny z drona". Nazwa usługi brzmi „Wnętrza, obiekty i architektura",
więc etykieta galerii jest węższa niż oferta.
**Warianty:**
- **A (rekomendacja):** `label: "Wnętrza, hale i obiekty"` — zgodne z nazwą usługi,
  obejmuje cztery kadry z zewnątrz. Ryzyko: dłuższa etykieta w przyklejonym pasku kategorii
  na 390 px, sprawdzić zawijanie.
- B: zostawić etykietę, przenieść cztery kadry do zakładki dronowej. Ryzyko: cofa decyzję
  Marcina z `da52117` („czwarty rząd to obiekty z powietrza"), czyli relitygacja. Odpada.
**Pliki:** `src/app/galeria/page.tsx` (jedna linia)
**AC:** pasek kategorii na 390 px nie łamie się na dwie linie i nie przewija poziomo
inaczej niż dotąd; `?kat=wnetrza` dalej działa (klucz bez zmian)
**Stop:** nie zmieniać `key`, bo to adres w URL
**ZGODA:** TAK

---

## BRIEF ZDJ2608-07 · `sizes` w pasku galerii zgodne z siatką

**Status:** do wykonania
**Kontekst:** `ServiceGalleryLightbox.tsx:74` ma zaszyte `sizes="(max-width: 640px) 33vw, 16vw"`
dla wszystkich kategorii. `ServiceGalleryStrip.tsx:215-219` podaje dwie siatki:
`grid-cols-3 sm:grid-cols-6` oraz `grid-cols-2 sm:grid-cols-4` dla `produktowe`. Do tego
**cały pasek siedzi w `max-w-5xl mx-auto`** (`ServiceGalleryStrip.tsx:243`), więc powyżej
~1056 px szerokości okna kafelki przestają rosnąć, a `sizes` liczone w `vw` rośnie dalej.
Błąd idzie w obie strony: przy 390 i 900 px kategoria produktowa dostaje warianty **za małe**,
a przy 1728 px **siedem pozostałych kategorii** dostaje warianty ~70% za duże
(realny kafelek ~162 px, `sizes` mówi 276 px).
**Uwaga:** pierwsza wersja tego briefu proponowała `"(max-width: 640px) 50vw, 25vw"`.
To jest **błędne** i pogarsza sytuację na dużych ekranach, bo nie ma sufitu. Poprawka
wyszła przy weryfikacji raportu.
**Warianty:**
- **A (rekomendacja):** dodać opcjonalny prop `sizes` do `ServiceGalleryLightbox`
  i przekazywać go z paska, **z ostatnim członem w pikselach**:
  `produktowe` → `"(max-width: 640px) 50vw, (max-width: 1056px) 25vw, 250px"`,
  reszta → `"(max-width: 640px) 33vw, (max-width: 1056px) 16vw, 165px"`.
  Ryzyko: zero, zmiana addytywna; stałe trzeba przeliczyć, jeśli kiedyś zmieni się
  `max-w-5xl` albo `gap`.
- B: policzyć `sizes` z `gridClass` wewnątrz lightboxa. Ryzyko: parsowanie klas Tailwinda
  w runtime, kruche.
**Pliki:** `src/components/ServiceGalleryLightbox.tsx`, `src/components/ServiceGalleryStrip.tsx`
**AC:** na `/uslugi/fotografia-produktowa` i na `/uslugi/wizerunek-portrety`, przy 390 px,
900 px i 1728 px, DPR 2, dla każdego kafla zachodzi
`0,85 × szerokość CSS × DPR <= naturalWidth <= 1,4 × szerokość CSS × DPR`
(dolna granica to ostrość, górna to zmarnowany transfer)
**Stop:** nie zmieniać `gridClass` ani `aspectClass` — to układ ustawiony przez Marcina
**ZGODA:** TAK dla wariantu A w brzmieniu powyżej

---

## BRIEF ZDJ2608-19 · `sizes` hero na stronie głównej

**Status:** ZACZĄĆ OD POMIARU
**Kontekst:** `Hero.tsx:71` deklaruje `sizes="(max-width: 768px) 100vw, 40vw"`. Pomiar
na produkcji 04.08 przy viewporcie 1728 px: element ma **442 px** szerokości CSS, czyli
**25,6vw**, nie 40vw. Obraz ma `priority` i `fetchPriority="high"`, więc to kandydat na LCP
i pobranie o ~56% szersze niż potrzeba kosztuje najbardziej właśnie tutaj.
Powiązana hipoteza H1 (pomiar pokazał `naturalWidth = 315` przy `w=1920`) **musi zostać
rozstrzygnięta przed zmianą** — jeśli okaże się prawdziwa, problemem jest coś innego
i zwężenie `sizes` go pogłębi.
**Warianty:**
- **A:** po potwierdzeniu H1 jako fałszywej: `sizes="(max-width: 768px) 100vw, 26vw"`.
- B: zostawić i najpierw zmierzyć LCP w PSI.
**Pliki:** `src/components/Hero.tsx`
**AC:** LCP na `/` w PSI mobile i desktop nie gorszy niż przed zmianą (pomiar przed i po,
ta sama seria, data zapisana); szerokość obrazu w DOM przy 1728 px nie mniejsza niż 884 px
**Stop:** jeśli PSI nie jest dostępne, brief zostaje zamknięty jako niewykonalny, nie zgadujemy
**ZGODA:** NIE — czeka na pomiar

---

## BRIEF ZDJ2608-18 · Dwa nieużywane pliki i placeholder

**Status:** do wykonania
**Kontekst:** po odjęciu referencji dynamicznych (galerie listowane z dysku przez
`listGalleryImages`, OG składane z szablonu `/images/og/<sekcja>/<slug>`) zostają dokładnie
dwa pliki bez żadnej referencji w `src/`:
- `public/images/portfolio/artech/2.jpg` — **925 KB, 2048×2048**, najcięższy plik
  w folderze Artech; galeria Artechu wymienia dziewięć innych plików
- `public/images/portfolio/sesja-wizerunkowa/01.jpg` — **527 KB**, bajtowo identyczny
  z `public/images/portfolio-1.jpg`, który jest miniaturą draftu (patrz ZDJ2608-17)
Plus `public/images/portfolio/box17/_WRZUC-TU-ZDJECIA.txt` — śledzony w gicie, przestał
być aktualny w chwili wgrania dziesięciu zdjęć commitem `9fc7ff4`.
**Warianty:**
- **A (rekomendacja):** przenieść całą trójkę do `_to_delete/` w katalogu repo, bez `git rm`.
  Marcin decyduje o usunięciu. Ryzyko: zero, pliki nie są referencjonowane.
- B: zostawić `artech/2.jpg` jako zapas do galerii Artechu (obejrzane: szara płyta
  z tworzywa, kadr spójny z resztą). Wtedy usunąć tylko dwa pozostałe.
**Pliki:** operacja na `public/`, zero zmian w `src/`
**AC:** `npm run build` przechodzi; `git status` pokazuje trzy usunięcia i nic więcej;
raport wymienia trzy ścieżki
**Stop:** nie usuwać niczego z `public/` bezpowrotnie, tylko przenosić
**ZGODA:** TAK dla wariantu A, z zastrzeżeniem punktu B do decyzji Marcina

---

## BRIEF ZDJ2608-22 · Nieaktualny komentarz o kadrowaniu

**Status:** do wykonania, **zakres zawężony po weryfikacji**
**Kontekst:** `services.tsx:724-726`: `SERVICE_TILE_POS["sesje-zespolowe"] = "center 20%"`
z uzasadnieniem „**Pionowy** portret pary w kadrze 16:9 (mobile) ciął głowy przy center
(audyt mobile 2026-07-07)". Plik `portfolio/sesje-zespolowe-cover.jpg` jest **poziomy,
1120×840**. Weryfikacja pokazała, że plik **nie był podmieniany**: ma jedną wersję od
`cb2bd52` (25.06.2026), a komentarz powstał później (06.07). Czyli mechanizm jest opisany
poprawnie (kadr 4:3 przycinany do 16:9 na mobile, `Services.tsx:60`) i kotwica prawdopodobnie
jest potrzebna. Myli się jedno słowo, ale każe następnej osobie szukać pliku, którego nie ma.
**Warianty:**
- **A (rekomendacja):** poprawić samo słowo („Kadr 4:3 w kafelku 16:9 na mobile ciął głowy
  przy center"), kadrowania nie ruszać. Ryzyko: zero.
- B: dodatkowo sprawdzić na 390 px, czy `center 20%` dalej jest optymalne. Ryzyko: zmiana
  wyglądu kafelka to decyzja Marcina, nie agenta.
**Pliki:** `src/data/services.tsx` (jeden komentarz)
**AC:** komentarz opisuje faktyczną orientację pliku; `objectPosition` bez zmian
**Stop:** nie zmieniać `center 20%` bez zgody
**ZGODA:** TAK dla wariantu A

---

## BRIEF ZDJ2608-01 · Dokończenie konwencji nazw w czterech folderach

**Status:** czeka na decyzję §12.1 raportu
**Kontekst:** `next.config.ts:48-53` ustawia `Cache-Control: public, max-age=31536000, immutable`
dla `/images/*`, z komentarzem „Pliki podmieniane są zawsze pod nową nazwą". `git log
--diff-filter=M -- public/images/**` pokazuje, że 04.08.2026 pliki `produkt-01.jpg` …
`produkt-24.jpg` zmodyfikowano pod tą samą nazwą w `b3ed677`, potem ponownie w `a67caa3`,
potem `produkt-02` i `-03` w `ee5970d`; tego samego dnia podmieniono też
`blog/foto-wideo-dron-z-jednego-wejscia.jpg` w `4ea0501`. Skutek opisano w
`src/lib/galleryImages.ts:20-31`: „w miejscu koszulki wyświetlała się Amarula ze starego
cache'u". Konwencja opisowa objęła jeden folder. **Zostają 51 plików w czterech folderach:**
`galeria/eventy` (15), `galeria/portrety` (14), `galeria/wnetrza` (12), `portfolio/box17` (10).
**Warianty:** patrz §12.1 raportu (A: dokończyć konwencję · B: zmienić nagłówek cache ·
C: nie robić nic).
**Pliki:** `public/images/galeria/{eventy,portrety,wnetrza}/*`,
`public/images/portfolio/box17/*`, `src/data/portfolio.ts` (ścieżki box17),
`src/components/ServiceGalleryStrip.tsx` (`CURATED.portrety`, `CURATED.eventy`),
`src/app/galeria/page.tsx` (kolejność `altVariants` dla `wnetrza`)
**AC:**
1. zero plików `NN.jpg` bez opisu w `public/images/galeria/**` i `public/images/portfolio/box17/**`
2. `git grep` na starych nazwach → zero trafień w `src/`
3. `altVariants` dla `wnetrza` dalej pasują do kadrów po zmianie nazw (12 z 12, sprawdzone ręcznie)
4. raport zawiera tabelę **stary adres → nowy adres** dla wszystkich 51 plików
5. kolejność wyświetlania identyczna jak przed zmianą (numery `NN` bez zmian, dokleja się tylko opis)
**Stop:** jeśli którykolwiek stary adres jest linkowany z zewnątrz (Profil Firmy, social,
kampania Ads) — zatrzymać się i zapytać. Sprawdzić przed startem.
**ZGODA:** NIE — czeka na wybór wariantu

---

## BRIEF ZDJ2608-04 · Alt opisujący kadr w kategoriach `eventy` i `portrety`

**Status:** do wykonania **po** ZDJ2608-01
**Kontekst:** `GalleryView.tsx:34` liczy `altVariants[i % altVariants.length]`.
`galeria/page.tsx` daje kategorii `eventy` **5 wariantów na 15 kadrów**, a `portrety`
**5 na 14**. Wariant trafia na kadr numerem, nie treścią. Skutek policzony wprost:
`event-07` (osioł na trawniku) dostaje „Fotografia konferencyjna, relacja z wydarzenia
biznesowego, kadr 7"; `event-09` (DJ) dostaje „Zdjęcie z gali firmowej";
`portret-06` (dwie osoby) dostaje opis w liczbie pojedynczej. Ten sam plik rozwiązał to
poprawnie dla `wnetrza` (12 na 12) i `dron` (9 na 9), z komentarzem tłumaczącym dlaczego.
**Warianty:**
- **A (rekomendacja):** napisać po jednym wariancie na kadr, w kolejności plików, dokładnie
  jak dla `wnetrza`. Ryzyko: lista jest wtedy związana z kolejnością plików — dlatego idzie
  **po** ZDJ2608-01, kiedy nazwa niesie opis i rozjazd od razu widać.
- B: zostawić rotację, dopisać tylko brakujące warianty do 8-10 sztuk. Ryzyko: dalej opisuje
  losowy kadr, tylko rzadziej.
**Pliki:** `src/app/galeria/page.tsx` (dwie listy `altVariants`)
**AC:**
1. `eventy` ma 15 wariantów, `portrety` 14, w kolejności plików
2. **każdy wariant sprawdzony wobec obejrzanego kadru**, nie wobec nazwy pliku
3. żaden wariant nie zawiera długiego myślnika ani frazy z czarnej listy `docs/zasady-tekstow.md`
4. żaden wariant nie opisuje kadru dwuosobowego w liczbie pojedynczej
**Stop:** jeśli kadr nie da się opisać zgodnie z podpisem kategorii (osioł, DJ), to sygnał
do decyzji §12.3, nie do naciągania opisu
**ZGODA:** TAK dla wariantu A, po ZDJ2608-01

---

## BRIEF ZDJ2608-03 · Pierwszy kafelek portfolio ma być fotografią

**Status:** czeka na wybór wariantu
**Kontekst:** `Portfolio.tsx:13-18` ustawia `FEATURED_SLUGS` na `woohoo-autopay`,
`artech-fotografia-produktowa`, `idcom-headshoty-zespolu`, `yes-butcher-przewodnik-michelin`.
Dwa pierwsze kafelki biorą `tileImage`: `woohoo-ecommerce-4x3.jpg` (obejrzane: plansza
tytułowa „E-COMMERCE All in" na rozmytej panoramie ratusza) i `artech-film-cover.jpg`
(obejrzane: klatka z filmu, makro tokarki). Sekcja portfolio na stronie fotografa zaczyna się
od dwóch obiektów, które nie są fotografiami. Ta sama para otwiera `/portfolio`.
**Warianty:**
- **A:** przestawić `FEATURED_SLUGS` na `idcom, yes-butcher, woohoo, artech`. Koszt: jedna
  linia. Ryzyko: niskie. `git blame Portfolio.tsx:13-18` daje `bf90d368` z **11.06.2026**,
  czyli to nie jest decyzja z ostatniego tygodnia.
- **B (rekomendacja):** zostawić kolejność, podmienić `tileImage` obu realizacji na fotografie:
  Woohoo → kadr z tego samego eventu, Artech → `_F2A8937.jpg` (już jest `thumbnail`).
  Ryzyko: znika rozpoznawalny napis „E-COMMERCE All in", który niesie nazwę wydarzenia.
- C: zostawić jeden z dwóch jako grafikę, drugi zamienić.
**Pliki:** `src/components/Portfolio.tsx` albo `src/data/portfolio.ts:106,237`
**AC:** pierwszy kafelek sekcji portfolio na `/` i pierwszy na `/portfolio` to fotografia;
proporcja kafelka bez zmian; brak pustych marginesów i rozmytego wypełnienia
**Stop:** wariant B jest **miękką relitygacją**. `services.tsx:704-707` mówi wprost:
„Wróciła 04.08.2026 po krótkiej podmianie na piątkę z eventu: Marcin uznał, że na kafelku
lepiej działa Autopay". To był kafelek usługi, nie realizacji, ale ta sama ocena i ten sam
dzień. **Nie wykonywać wariantu B bez wyraźnego TAK od Marcina.** Wariant A tego problemu
nie ma, bo nie rusza żadnego obrazu.
**ZGODA:** NIE — czeka na wybór wariantu; przy równych argumentach wybrać A

---

## BRIEF ZDJ2608-23 · Ósma usługa nie ma pliku OG, `og:image` prowadzi do 404

**Status:** do wykonania (część kodowa), część graficzna po stronie Marcina
**Kontekst:** `uslugi/[slug]/page.tsx:42` składa adres obrazu OG z sluga:
`` const ogImage = `/images/og/uslugi/${service.slug}.${slug === "zdjecia-wideo-z-drona" ? "jpg" : "png"}`; ``
`SERVICE_DISPLAY_ORDER` (`services.tsx:637-646`) ma **osiem** slugów, `DRAFT_SERVICE_SLUGS`
jest pusty, a w `public/images/og/uslugi/` leży **siedem** plików. Brakuje
`wnetrza-obiekty-architektura.png`. Usługa została włączona 04.08 i od tego dnia jej
`og:image` wskazuje na nieistniejący plik. To ta sama klasa błędu, którą repo opisało przy
Box17: „kafel na `/portfolio` był pusty, a `og:image` zwracał 404 (audyt `PELNY2907-01`)".
**Warianty:**
- **A (rekomendacja, dwa kroki):** natychmiast fallback w kodzie na istniejący
  `/images/og/strony/uslugi.jpg`, gdy plik per usługa nie istnieje; równolegle Marcin robi
  właściwy plik. Ryzyko: sprawdzenie istnienia pliku w czasie budowania wymaga `fs`,
  a `generateMetadata` biegnie na serwerze, więc jest wykonalne; prostszy wariant to jawna
  mapa slug → obraz zamiast składania stringiem.
- B: zrobić od razu właściwy plik OG i nie ruszać kodu. Ryzyko: zero po stronie kodu,
  ale do czasu powstania pliku 404 trwa.
- C: nie robić nic. Ryzyko: link do jednej z ośmiu usług nie renderuje karty w social media.
**Pliki:** `src/app/uslugi/[slug]/page.tsx` (wariant A) albo tylko `public/images/og/uslugi/`
(wariant B)
**AC:** dla każdego z ośmiu slugów w `SERVICE_DISPLAY_ORDER` adres z `og:image` zwraca 200;
weryfikacja komendą po stronie produkcji, nie założeniem
**Stop:** zmiana sposobu składania `metadata` to obszar objęty `CLAUDE.md §10.3` —
jeśli poprawka wychodzi poza podmianę jednej ścieżki, zatrzymać się i zapytać
**ZGODA:** TAK dla wariantu B; wariant A wymaga zgody, bo dotyka `generateMetadata`

---

## BRIEF ZDJ2608-25 · `sizes` w `About` nie uwzględnia `scale-[1.15]`

**Status:** do wykonania
**Kontekst:** `About.tsx:23` deklaruje `sizes="(max-width: 1024px) 0px, 520px"`. Kolumna
w `max-w-6xl` z `gap-16` to `(1152 − 64) / 2 = 544 px`, a obraz siedzi w `scale-[1.15]`
(`About.tsx:17`), więc renderuje się na ~626 px. Sam zabieg z `0px` poniżej 1024 px jest
poprawny, bo sekcja jest `hidden lg:block`; błędna jest tylko liczba.
Źródło `marcin-o-mnie.jpg` ma 1385 px, więc zapas na DPR 2 jest, ale przeglądarka dostaje
polecenie pobrania węższego wariantu, niż potrzebuje.
**Warianty:**
- **A (rekomendacja):** `sizes="(max-width: 1024px) 0px, 630px"`. Ryzyko: zero.
- B: usunąć `scale-[1.15]` i kadrować w pliku. Ryzyko: zmienia wygląd sekcji, czyli decyzja
  Marcina, nie agenta.
**Pliki:** `src/components/About.tsx` (jedna linia)
**AC:** przy 1440 px i DPR 2 `naturalWidth` obrazu w sekcji „O mnie" nie mniejsze niż
1250 px; na 390 px obraz dalej się nie pobiera (sekcja ukryta)
**Stop:** nie ruszać `scale-[1.15]` ani `aspect-[3/4]`
**ZGODA:** TAK dla wariantu A

---

## Wymagają zgody Marcina zanim agent dotknie

| Co | Paragraf |
|---|---|
| `next.config.ts` — nagłówek `Cache-Control` dla `/images/*` | `CLAUDE.md §10.2` |
| Zdjęcie `box17-budki-akustyczne` z `DRAFT_SLUGS` (publikacja realizacji) | decyzja biznesowa, §12.2 raportu |
| Zmiana nazw 51 plików (zmienia adresy publiczne) | §12.1 raportu |
| Wymiana kadrów w `CURATED.eventy` | §12.3 raportu |
| Hero „Sesje zespołowe" | §12.4 raportu |
| Zmiana `objectPosition` na kafelkach | wpływa na wygląd, nie na kod |
| Fallback dla `og:image` w `generateMetadata` (ZDJ2608-23, wariant A) | `CLAUDE.md §10.3` |

## Poza kodem (Marcin ręcznie, agentowi nie zlecać)

- **Osiem obrazów OG dla usług** — dziś sześć to karty tekstowe bez fotografii, a jednego
  (`wnetrza-obiekty-architektura.png`) **nie ma w ogóle**, przez co `og:image` ósmej usługi
  prowadzi do 404 (ZDJ2608-23). Do zrobienia w Canvie albo z istniejących kadrów. §12.5 raportu.
- **Rozstrzygnięcie H3** — czy `yes-butcher-02.jpg` jest faktycznie z drona (EXIF albo pamięć).
- **PSI / Lighthouse** — pomiar LCP przed jakąkolwiek zmianą w `Hero.tsx`. Piąty audyt z rzędu
  bez tego pomiaru.
- **Decyzja o parach bliźniaczych okładek blogowych** (ZDJ2608-14) — to wybór redakcyjny.
- **Nowe kadry**, jeśli wynikiem §12.3 będzie zawężenie kategorii eventowej: dziś w folderze
  są trzy kadry jednoznacznie konferencyjno-galowe.

## Czego NIE robić (zamknięte decyzje)

1. **Nie przestawiać kolejności w galeriach produktowej, dronowej ani eventowej.**
   Ustawiona ręcznie przez Marcina 03 i 04.08, commity w §8 raportu.
2. **Nie przywracać drugiego filmu Woohoo do galerii** (`d4bfbec`, komentarz `galeria.ts:6-16`).
3. **Nie przywracać sceny z laserami do eventów** (`d4bfbec`).
4. **Nie kopiować plików między folderami** żeby „naprawić" duplikaty wnętrz — to świadoma
   decyzja z `da52117`, opisana w `galeria/page.tsx:110-114`.
5. **Nie proponować cennika ani tabeli cen** w żadnej formie (03.08).
6. **Nie zmieniać kolejności kart usług** — portrety zostają na swojej pozycji do września.
7. **Nie redagować cytatów klientów** (`docs/zasady-tekstow.md`).
8. **Nie zmieniać składu `CURATED.produktowe`** (8 kadrów) — ustawiony `158b955` 04.08,
   z imiennym komentarzem przy każdym kadrze. Dotyczy to również `produkt-14-hob-koszulki`
   i `produkt-16-pedzelek` z findingu 13: krytyka proporcji nie jest zgodą na wymianę kadru.
9. **Nie dodawać `portret-07` z powrotem do `CURATED.portrety`** — wypadł 04.08, bo to ta sama
   twarz co `_F2A9376-Edit-2` z sesji IDcom.
10. **Nie usuwać plików z `public/` bezpowrotnie** — tylko przenosić do `_to_delete/`.
11. **Nie zgłaszać braku linii obiektowej jako luki** — usługa „Wnętrza, obiekty i architektura"
    jest opublikowana od 04.08, `DRAFT_SERVICE_SLUGS` jest pusty.

---
---

# RUNDA 2: usługi i portfolio (dopisane 04.08.2026 po uwadze Marcina)

Raport: `AUDYT-ZDJECIA-RUNDA-2-USLUGI-PORTFOLIO-2026-08-04.md`.
Trzy decyzje Marcina z tego dnia są już uwzględnione: Box17 zostaje ukryty, eventy to także
integracje i imprezy firmowe, usługi i portfolio mają pierwszeństwo przed higieną techniczną.

## BRIEF ZDJ2608-02b · Komentarz przy Box17 ma przestać obiecywać publikację

**Status:** do wykonania. **Decyzja podjęta: Box17 zostaje w draftcie.**
**Kontekst:** komentarz w `portfolio.ts:621-624` mówi: „brak miniatury (`public/images/portfolio/box17/`
ma tylko placeholder .txt) … Po wgraniu `box17.jpg` wystarczy usunąć tę linię". Oba zdania są
dziś nieprawdziwe: w folderze leży 10 plików JPG od commita `9fc7ff4` (04.08). Marcin
zdecydował 04.08, że realizacja mimo to zostaje ukryta. Jeśli komentarz zostanie taki, jaki
jest, następny audyt zgłosi to samo jeszcze raz, bo warunek w nim zapisany jest spełniony.
**Warianty:**
- **A (rekomendacja):** przepisać komentarz na stan faktyczny: zdjęcia są, decyzja o ukryciu
  jest świadoma i z 04.08.2026, plus jedno zdanie o tym, co naprawdę musiałoby się wydarzyć
  (zgoda klienta, publikacja u klienta, cokolwiek to jest). Bez tego zdania sytuacja powtórzy się.
- B: zostawić. Ryzyko: kolejna runda audytu znowu podniesie ten sam finding.
**Pliki:** `src/data/portfolio.ts` (komentarz przy `DRAFT_SLUGS`)
**AC:** komentarz nie zawiera zdania, które jest sprzeczne z zawartością `public/images/portfolio/box17/`;
zawiera datę decyzji i warunek wyjścia
**Stop:** nie usuwać sluga z `DRAFT_SLUGS` — decyzja jest odwrotna
**ZGODA:** TAK dla wariantu A. Treść warunku wyjścia musi podać Marcin, agent zostawia
`TODO: powód` zamiast go wymyślać

---

## BRIEF ZDJ2608-05b · Podpis kategorii eventowej ma objąć to, co naprawdę fotografujesz

**Status:** do wykonania. **Decyzja podjęta: wariant B, poszerzamy obietnicę.**
**Kontekst:** `ServiceGalleryStrip.tsx:16` mówi „Wybrane kadry z konferencji, targów i gal
firmowych." Obejrzane 15 z 15 kadrów w folderze `eventy`: 3 to konferencje i gale,
4 to integracje i pikniki, 6 to koncerty, kluby i DJ-e, 2 pozostałe. Marcin 04.08:
„eventy dla mnie to firmówki imprezy itp." Zestaw kadrów jest więc poprawny, niepoprawny
jest podpis.
**Warianty:**
- **A (rekomendacja):** „Wybrane kadry z konferencji, gal, integracji i imprez firmowych."
  Ryzyko: żadne. Zgodne z `docs/zasady-tekstow.md` (bez triady przymiotników, bez długiego
  myślnika, bez frazy z czarnej listy).
- B: to samo plus jedno zdanie o zakresie w opisie usługi. Ryzyko: dotyka treści usługi,
  czyli obszaru audytu TRESC, nie tego.
**Pliki:** `src/components/ServiceGalleryStrip.tsx` (jedna linia w `META.eventy.sub`)
**AC:** podpis obejmuje wszystkie cztery typy wydarzeń widoczne w folderze; nic poza tym
zdaniem nie zmienione
**Stop:** nie ruszać składu `CURATED.eventy` — decyzja Marcina jest taka, żeby kadry zostały
**ZGODA:** TAK dla wariantu A

Powiązane: po tej zmianie **ZDJ2608-04 (alty dla eventów) można wreszcie napisać uczciwie.**
Piętnaście opisów ma nazwać to, co jest na kadrze: integrację integracją, koncert koncertem.
Do tej pory rotujące warianty próbowały nazwać wszystko konferencją, bo taki był podpis.

---

## BRIEF ZDJ2608-27 · Hero nie może wracać w pasku galerii tej samej podstrony

**Status:** do wykonania
**Kontekst:** na trzech podstronach ten sam kadr pojawia się trzy razy w obrębie jednego
przewinięcia: kafelek, hero i pasek „Przykłady z galerii".
`event-05` na `/uslugi/eventy-reportaze`, `portret-05` na `/uslugi/wizerunek-portrety`,
`wnetrze-03` na `/uslugi/wnetrza-obiekty-architektura` (ta ostatnia nie ma listy `CURATED`,
więc pasek bierze `wnetrze-01..06` z dysku, a hero jest jednym z nich).
Pasek ma sześć miejsc, jedno idzie na powtórkę. W folderach jest zapas: portretów 14,
eventów 15, wnętrz 12.
**Warianty:**
- **A (rekomendacja):** `ServiceGalleryStrip` przyjmuje opcjonalny `exclude?: string`
  i odfiltrowuje go przed `.slice()`, a `uslugi/[slug]/page.tsx` przekazuje
  `service.heroImage`. Limit zostaje ten sam, więc dobiera się kolejny kadr z listy.
  Ryzyko: dla kategorii z listą `CURATED` krótszą niż limit + 1 pasek zrobi się o jeden
  krótszy — sprawdzić `zespolowe` (dokładnie 6 plików) i `wideo-produktowe`.
- B: ręcznie wyjąć trzy kadry z trzech list. Ryzyko: rozjedzie się przy następnej zmianie hero.
**Pliki:** `src/components/ServiceGalleryStrip.tsx`, `src/app/uslugi/[slug]/page.tsx`
**AC:** na każdej z ośmiu podstron usług żaden plik nie występuje więcej niż raz poniżej hero;
każdy pasek ma dokładnie tyle kadrów co przed zmianą (6, produktowa 8)
**Stop:** jeśli po odfiltrowaniu któraś kategoria ma mniej kadrów niż limit, zatrzymać się
i zgłosić — dobieranie kadru z innej kategorii to decyzja Marcina
**ZGODA:** TAK dla wariantu A

---

## BRIEF ZDJ2608-32 · Pierwsza realizacja w portfolio ma być fotografią

**Status:** czeka na decyzję §5.3 raportu rundy 2
**Kontekst:** `woohoo-autopay` stoi pierwszy w `FEATURED_SLUGS` (`Portfolio.tsx:13-18`)
i pierwszy na `/portfolio`. Ma `gallery: []` (`portfolio.ts:117`). Wszystkie pięć jego
obrazów to grafiki i zrzuty z filmu: kafelek i hero to plansza „E-COMMERCE All in",
trzy okładki reelsów to klatki z wypalonymi napisami. To poprawne dla realizacji wideo,
ale to pierwsze, co widzi ktoś, kto przyszedł po zdjęcia.
**Warianty:** patrz §5.3 raportu (A: przesunąć na trzecie miejsce · B: dołożyć 4-6 kadrów
foto z tego eventu · C: zostawić).
**Pliki:** `src/components/Portfolio.tsx` (wariant A) albo `src/data/portfolio.ts` (wariant B)
**AC:** pierwszy kafelek sekcji portfolio na `/` i pierwszy na `/portfolio` prowadzi
do realizacji, która ma co najmniej jedno zdjęcie w `gallery`
**Stop:** wariant B wymaga plików, których nie ma w repo
**ZGODA:** NIE — czeka na wybór wariantu

---

## BRIEF ZDJ2608-31 · Przygotowanie czterech realizacji do publikacji

**Status:** czeka na decyzję §5.2 raportu rundy 2. **Prace przygotowawcze można zrobić
niezależnie od decyzji** i są autoryzowane.
**Kontekst:** `fotografia-eventowa` (9 kadrów), `packshoty-produktowe` (10),
`sesja-korporacyjna` (8), `sesja-wizerunkowa` (7) mają uzupełnione galerie od 04.08,
placeholder „Więcej zdjęć wkrótce" (`PortfolioGallery.tsx:98`, próg `images.length < 3`)
już się nie pokazuje, a slugi dalej są w `DRAFT_SLUGS`.
**Co musi być zrobione ZANIM zdejmiemy drafty:**
1. `ZDJ2608-17` — miniatura `sesja-wizerunkowa` (dziś zdjęcie grupowe przy autach sportowych)
2. `ZDJ2608-08` — alt „na białym tle" przy zdjęciu na żółtym (`packshoty-produktowe`)
3. `ZDJ2608-09` — alt „headshoty zespołu" przy jednej osobie (`sesja-korporacyjna`)
4. sprawdzić `og/portfolio/sesja-wizerunkowa.png` — obejrzane: karta OG używa **tego samego
   zdjęcia z autami sportowymi**, więc po zmianie miniatury OG też trzeba wymienić
5. sprawdzić `ZDJ2608-26` — po publikacji siatka `/portfolio` ma 8 pozycji, więc sierota
   w ostatnim rzędzie znika sama; potwierdzić na 1440 px
**Pliki:** `src/data/portfolio.ts`, `public/images/og/portfolio/sesja-wizerunkowa.png`
**AC:** po zdjęciu czterech slugów z `DRAFT_SLUGS`: `/portfolio` pokazuje 8 kafli, sitemap
ma 8 tras portfolio, żadna z ośmiu nie ma `robots: index:false`, każda ma `og:image`
zwracający 200
**Stop:** samego zdjęcia slugów z `DRAFT_SLUGS` agent NIE robi bez wyraźnego TAK
**ZGODA:** TAK dla punktów 1-5 (przygotowanie). NIE dla publikacji

---

## BRIEF ZDJ2608-33 · JSON-LD na `/portfolio` ma wymieniać to, co widać

**Status:** czeka na zgodę (stop-condition)
**Kontekst:** `portfolio/page.tsx:54` buduje `itemListElement` z `portfolioCategories`,
czyli z wszystkich dziewięciu realizacji, w tym pięciu z `robots: { index: false }`
(`portfolio/[slug]/page.tsx:40`) i wykluczonych z sitemapy (`sitemap.ts:14-15`). Widoczna
siatka renderuje `portfolioItems`, czyli cztery. `ItemList` ma opisywać zawartość strony.
**Warianty:**
- **A (rekomendacja):** `portfolioItems` zamiast `portfolioCategories` w JSON-LD. Jedna linia.
  Ryzyko: liczba pozycji w danych strukturalnych spadnie z 9 na 4 (i wróci do 8 po publikacji
  z ZDJ2608-31).
- B: zostawić do czasu decyzji o publikacji czterech draftów — wtedy rozjazd zmniejszy się
  sam z 5 do 1 pozycji (Box17). Ryzyko: rozjazd zostaje, tylko mniejszy.
**Pliki:** `src/app/portfolio/page.tsx`
**AC:** liczba pozycji w `ItemList` równa liczbie kafli widocznych na stronie; walidator
danych strukturalnych Google bez błędów
**Stop:** **JSON-LD to `CLAUDE.md §10.3`** — bez zgody Marcina agent nie dotyka
**ZGODA:** NIE — czeka na decyzję

---

## BRIEF ZDJ2608-34 · IDcom: hero nie musi być też ostatnim kadrem galerii

**Status:** do wykonania
**Kontekst:** `_F2A9376-Edit-2.jpg` jest jednocześnie `thumbnail` (kafelek na home
i `/portfolio`), hero podstrony i szóstym kadrem galerii (`portfolio.ts:293,300`).
W galerii sześcioelementowej jedno miejsce z sześciu idzie na powtórkę. Folder `idcom/`
ma dokładnie sześć plików, więc nie ma z czego dobrać.
**Warianty:**
- **A (rekomendacja):** usunąć szósty wpis, galeria ma pięć kadrów, każdy inny.
  Ryzyko: pięć kadrów w siatce trzykolumnowej zostawia sierotę w drugim rzędzie
  (ten sam problem co ZDJ2608-26, tylko mniejszy).
- B: poprosić Marcina o siódmy kadr z tej sesji i zostawić sześć różnych.
  Ryzyko: wymaga pliku spoza repo. **Rekomendacja długoterminowa.**
- C: zostawić. Ryzyko: powtórka w sześciokadrowej galerii jest widoczna gołym okiem.
**Pliki:** `src/data/portfolio.ts`
**AC:** żaden plik nie występuje w tej realizacji więcej niż dwa razy (kafelek + hero)
**Stop:** nie podmieniać `thumbnail` — to najlepszy kadr z tej sesji i pełni rolę wizytówki
**ZGODA:** TAK dla wariantu A; wariant B po dostarczeniu pliku

---

## Dopisane do „Czego NIE robić (zamknięte decyzje)"

12. **Nie proponować publikacji Box17.** Decyzja Marcina z 04.08.2026: realizacja zostaje
    ukryta mimo kompletu zdjęć. Zgłoszenie tego jeszcze raz jest relitygacją.
13. **Nie zawężać kategorii eventowej do konferencji i gal.** Decyzja Marcina z 04.08.2026:
    eventy to także integracje i imprezy firmowe. Kadry z koncertem, DJ-em i osłem zostają,
    zmienia się podpis.
14. **Nie ruszać kolejności `FEATURED_SLUGS` ani `tileImage` Woohoo bez decyzji z §5.3.**
    Kafelek Autopay wrócił świadomie 04.08.
