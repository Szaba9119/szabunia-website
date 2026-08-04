# Prompt uruchomieniowy: wdrożenie poprawek (zdjęcia i treść)

**Podstawa:** `docs/sesje/PLAN-POPRAWEK-ZDJECIA-2026-08-04.md`, `BRIEFY-ZDJECIA-2026-08-04.md`,
`BRIEFY-TRESC-2026-08-04.md`, oba raporty ZDJECIA i raport TRESC z 04.08.
**Format:** reguła nadrzędna trybu autonomicznego z `docs/METODYKA-AUDYTU.md` §12.2 („agent nigdy
nie czeka, każda bramka zgody zamienia się w zapis"), zastosowana do wdrożenia. Sam szablon §12.2
opisuje audyt diagnostyczny i tu nie obowiązuje. Produkt wg §8 (raport wdrożenia).
**Decyzje wpisane w prompt:** DZ1, DZ2, DZ4 z planu poprawek zdjęć, DT1, DT5, DT6 i zakres quick
winów z audytu treści. Wszystkie podjęte 04.08.2026.

Wdrożenie różni się od audytu jedną rzeczą i to ona kształtuje cały ten prompt:
**agent pisze do plików.** Audyt mógł zgłosić za dużo, bo zgłoszenie nic nie kosztowało.
Wdrożenie, które zrobi o jedną rzecz za dużo, zostawia w kodzie zmianę, o której nikt nie wie.
Dlatego zakres jest zamknięty listą ID, a każdy zakaz jest wypisany jawnie zamiast domyślnie
wynikać z metodyki.

Pięć ryzyk specyficznych dla tej tury:

1. **Kolizja numeracji.** `ZDJ2608-03` i `TRESC2608-03` to dwie zupełnie różne poprawki.
   Kolidują też `-01`, `-02`, `-04`, `-05`, `-08`, `-09`, `-11`, `-22`, `-27`, `-32`, `-33`, `-36`.
   Prefiks jest obowiązkowy w raporcie, w commit message i w każdym zdaniu poza tabelą.
2. **Zmiana nazw 51 plików zmienia adresy**, których nie da się sprawdzić z repo. Profil Firmy,
   Ads i Instagram są poza zasięgiem agenta. Brief każe się w tym miejscu zatrzymać i zapytać,
   a tryb autonomiczny zakazuje pytać. Rozwiązanie: agent sprawdza, co może, wykonuje zmianę
   i oddaje pełną tabelę starych adresów do sprawdzenia przez Marcina. To jest jawna autoryzacja,
   nie przeoczenie.
3. **84 opisy alternatywne wymagają obejrzenia kadru.** Agent, który napisze je z nazw plików,
   cofnie cały audyt do poziomu Gemini z czerwca (1 trafienie na 11). Zasada z audytu obowiązuje
   we wdrożeniu tak samo: nie obejrzałeś, nie opisujesz.
4. **Jedno zdanie zamienne z briefu jest faktycznie błędne.** Marcin sprostował 04.08 różnicę
   między sesją dronową a sesją obiektu. Prompt niesie tekst zatwierdzony, brief w tym jednym
   miejscu jest unieważniony. To jest też przypomnienie, że brief nie jest wyrocznią faktu
   handlowego.
5. **Pięć stop-conditions jest zdjętych punktowo.** Reszta `CLAUDE.md` §10 i §11 obowiązuje bez
   zmian. Zdjęcie jednej nie otwiera sąsiednich.

---

## Prompt do skopiowania

```
Wdrożenie poprawek szabunia.pl: ZDJĘCIA i TREŚĆ, jedna tura. TRYB AUTONOMICZNY, nie pytaj o nic.

REPO: /Users/marcinszabunia/Documents/05_Strona_WWW/marcinszabunia

CO ROBISZ: wykonujesz briefy z audytów z 04.08. Zakres jest zamknięty listą ID w sekcji FAZY.
ID spoza tej listy nie wykonujesz, nawet jeśli poprawka jest oczywista i zajmuje minutę.
"Przy okazji" to stop-condition CLAUDE.md §10.8. Rzeczy znalezione po drodze zapisujesz
w raporcie, nie w kodzie.

PREFIKS ID JEST OBOWIĄZKOWY. ZDJ2608-03 i TRESC2608-03 to dwie różne poprawki. Kolidują też
numery -01, -02, -04, -05, -08, -09, -11, -22, -27, -32, -33, -36. Zakładaj kolizję przy KAŻDYM
numerze z zakresu 01-36. Skrót bez prefiksu wolno Ci napisać tylko wewnątrz tabeli, której
nagłówek jednoznacznie mówi, o którą serię chodzi. W raporcie, w commit message i w komentarzu
w kodzie zawsze pełne ID.

STAN WYJŚCIOWY, potwierdź przed pierwszą zmianą:
- HEAD ma być 88564ac83f141c32e882ce2322b2683dc6262b43, main == origin/main, produkcja == main.
  Sprawdź: git log -1, git status --porcelain, git branch -vv.
- Jeśli HEAD jest inny, WSZYSTKIE numery linii z briefów są podejrzane. Wtedy każdą zmianę
  lokalizujesz po treści (grep na cytowanym zdaniu), nie po numerze linii, a rozjazd
  odnotowujesz w raporcie. Nie edytujesz linii "na numer" bez sprawdzenia, co w niej stoi.
- Jeśli pracujesz przez most urządzeń, każde git z flagą --no-optional-locks. Zwykłe git status
  zakłada .git/index.lock, którego most nie skasuje.
- Nieśledzone pliki w docs/sesje/ i katalog _to_delete/ to stan normalny, nie sprzątasz ich.
- Zrób kopię stanu wyjściowego czterech folderów objętych zmianą nazw (lista w FAZIE 3),
  zanim ruszysz pierwszy plik.

PRZECZYTAJ PRZED PRACĄ, w tej kolejności:
1. docs/sesje/PLAN-POPRAWEK-ZDJECIA-2026-08-04.md  całość, ze szczególnym uwzględnieniem §8
                                                   (czego nie robimy) i §9 (stop-conditions)
2. docs/sesje/BRIEFY-ZDJECIA-2026-08-04.md         AC i teksty docelowe dla ZDJ2608-*
3. docs/sesje/BRIEFY-TRESC-2026-08-04.md           AC i zdania zamienne dla TRESC2608-*
4. CLAUDE.md §5, §6, §10, §11                      konwencje kodu, DoD, stop-conditions
5. docs/zasady-tekstow.md                          obowiązuje dla KAŻDEGO napisanego zdania,
                                                   w tym dla każdego alt
6. docs/METODYKA-AUDYTU.md §7 i §8                 DoD wdrożenia i szablon raportu

ID BEZ BRIEFU: ZDJ2608-11, -12, -24, -26, -28 oraz wszystkie quick winy treści. Dla nich dowód,
cytat i punkt wyjścia są w raportach: AUDYT-ZDJECIA-2026-08-04.md,
AUDYT-ZDJECIA-RUNDA-2-USLUGI-PORTFOLIO-2026-08-04.md, AUDYT-TRESC-2026-08-04.md §5.
UWAGA: gotowe zdania zamienne dla treści stoją w §5 audytu (przy findingach, w linijkach
"Zamiennik:"), a NIE w §11. §11 to sama lista zadań, bez tekstów.
ZDJ2608-26 ma dodatkowo punkt 5 w briefie ZDJ2608-31.

Jeśli któregokolwiek z tych plików nie ma pod podaną ścieżką, nie szukasz zamiennika i nie
odtwarzasz treści z pamięci. ID, których jedynym źródłem był brakujący plik, dostają status
"poza zakresem: brak źródła", a fakt braku wpisujesz na początek raportu.

HIERARCHIA ŹRÓDEŁ PRZY KONFLIKCIE: sprostowanie Marcina z 04.08 (poniżej) > kod > brief > raport.
Brief jest późniejszy od raportu i wygrywa z nim przy różnicach w zdaniach zamiennych.
Jeśli brief cytuje zdanie, którego w pliku nie ma, nie zgadujesz: pomijasz ten punkt i zapisujesz
go w raporcie jako rozjazd dokumentacji. Wyjątek: gdy inny punkt z tej samej tury już przepisał
tę linię (patrz KOLEJNOŚĆ WEWNĄTRZ services.tsx w FAZIE 5), brak starego cytatu jest normalny.

SPROSTOWANIE FAKTU HANDLOWEGO, Marcin, 04.08. Wiąże ponad briefem i ponad raportem:
Różnica między sesją dronową a sesją obiektu NIE polega na tym, że dron to "tylko powietrze",
a obiekt dokłada ziemię i retusz architektoniczny. Stan faktyczny:
- Sesja dronowa od 700 zł: materiał przebitkowy z powietrza. Tym startujemy.
- Sesja obiektu od 900 zł: zdjęcia konkretnego obiektu z drona. Powyżej tej kwoty dokłada się
  kadry z poziomu ziemi, wnętrza, produkcję i wideo pokazujące halę albo firmę.
Konsekwencje: kotwica 900 zł NIE kupuje kadrów naziemnych ani wnętrz (dotyczy TRESC2608-51),
a zdanie zamienne dla services.tsx:584 z briefu jest błędne i NIE WOLNO go wpisać
(dotyczy TRESC2608-09, tekst zatwierdzony jest w FAZIE 5).

DECYZJE PODJĘTE 04.08, nie relitygujesz i nie pytasz o nie ponownie:
- DZ1 = A: publikujemy cztery realizacje z uzupełnionymi galeriami.
- DZ2 = A: woohoo-autopay schodzi z pierwszego miejsca w portfolio, na razie bez dokładania kadrów.
- DZ4 = A z B jako ubezpieczeniem: zmieniamy nazwy 51 plików ORAZ zmieniamy immutable
  na must-revalidate w nagłówku cache.
- DZ3 i DZ5 zostają po stronie Marcina, bo wymagają plików, których nie ma w repo.
  Dotyczy ZDJ2608-15, -29 (DZ3) oraz ZDJ2608-10, -23, -35, -36 (DZ5). Nie ruszasz ich.
- DT1 = A: licencja w Warunki.tsx idzie na użytek komercyjny (TRESC2608-01, jedyny P0).
- DT5 = A: "mini-brief" znika z lejka poradnika na rzecz gotowej listy pytań (TRESC2608-48).
- DT6 = A: kotwica 900 zł zostaje, a różnicę opisuje zdanie z TRESC2608-09.
- Quick winy treści bez briefu wchodzą do zakresu: TRESC2608-27, -32, -33, -36, -38, -53.

AUTORYZACJE, czyli stop-conditions zdjęte tą decyzją. Poza tymi pięcioma WSZYSTKIE
stop-conditions z CLAUDE.md §10 i z planu §9 obowiązują bez zmian:
1. Usunięcie czterech slugów z DRAFT_SLUGS w portfolio.ts (DZ1).
2. Kolejność FEATURED_SLUGS i pierwszy kafelek portfolio (DZ2).
3. next.config.ts: WYŁĄCZNIE słowo immutable na must-revalidate w nagłówku Cache-Control
   dla /images/* (DZ4). Nic więcej w tym pliku: nie CSP, nie redirects, nie images.
   max-age zostawiasz bez zmian. Jeśli uznasz, że sam must-revalidate nie wystarcza przy
   max-age 31536000, zapisujesz to jako wariant w raporcie i NIE zmieniasz max-age.
4. TRESC2608-02 zmienia pytania FAQ, które zasilają JSON-LD FAQPage. Brief mówi wprost,
   że to zamierzone i nie wymaga zgody. Wykonujesz i odnotowujesz w raporcie.
   To jedyny dozwolony dotyk JSON-LD w całej turze.
5. Zmiana nazw 51 plików bez uprzedniego sprawdzenia powierzchni zewnętrznych (ZDJ2608-01).
   Stop z briefu -01 i z planu §9 jest tą decyzją zawieszony: sprawdzasz tylko repo, a pełną
   tabelę 51 starych adresów oddajesz Marcinowi do sprawdzenia w Profilu Firmy, Ads i social.

Stop-conditions, które NADAL obowiązują i przy których zapisujesz wariant zamiast pytać:
metadata w layout.tsx, cały pozostały JSON-LD (w tym hasOfferCatalog i ItemList na /portfolio),
rozbieżności w cenach, godzinach, telefonie i mailu poza tym, co rozstrzyga sprostowanie powyżej,
nowe paczki npm, refactor dotykający ponad trzech plików poza briefem, treść cennika.

FAZA 1: fala 1 zdjęć, wykonalna od ręki, około 2,5 h. Trzynaście ID.
| ID           | Co                                                    | Pliki                                          |
| ZDJ2608-22   | komentarz o kadrowaniu mówi "pionowy", plik poziomy    | services.tsx:724-726                           |
| ZDJ2608-06   | etykieta zakładki "Wnętrza, hale i obiekty"            | galeria/page.tsx:103, klucz kat= BEZ ZMIAN     |
| ZDJ2608-25   | sizes bez uwzględnienia scale-[1.15], 520 na 630 px    | About.tsx:23                                   |
| ZDJ2608-05b  | podpis paska eventowego obejmuje integracje i imprezy  | ServiceGalleryStrip.tsx:16                     |
| ZDJ2608-08   | alt "na białym tle" przy zdjęciu na żółtym             | portfolio.ts:502                               |
| ZDJ2608-09   | alt "headshoty zespołu" przy jednej osobie             | portfolio.ts:557                               |
| ZDJ2608-17   | miniatura draftu sesja-wizerunkowa, WARIANT B          | portfolio.ts:390                               |
| ZDJ2608-34   | IDcom: hero jest też szóstym kadrem galerii            | portfolio.ts:293,300                           |
| ZDJ2608-02b  | komentarz przy Box17 obiecuje publikację, która nie    | portfolio.ts:621-624, warunek wyjścia jako     |
|              | nastąpi                                                | TODO, nie wymyślasz go                         |
| ZDJ2608-27   | hero wraca jako kadr w pasku tej samej podstrony       | ServiceGalleryStrip.tsx, uslugi/[slug]/page.tsx|
| ZDJ2608-07   | sizes w paskach niezgodne z siatką i max-w-5xl         | ServiceGalleryLightbox.tsx:74, Strip:215-219,  |
|              |                                                        | :243                                           |
| ZDJ2608-24   | miniatury filmów: surowy img, hqdefault, brak wymiarów | YouTubeFacade.tsx:49, ServiceVideoGrid.tsx:70  |
| ZDJ2608-18   | sieroty i placeholder .txt do _to_delete/              | artech/2.jpg, sesja-wizerunkowa/01.jpg,        |
|              |                                                        | box17/_WRZUC-TU-ZDJECIA.txt                    |

ZDJ2608-17: bierzesz WARIANT B (portret-12), nie A. Powód: portret-05 z wariantu A jest już hero
i kafelkiem usługi portretowej, więc stanąłby trzeci raz, a ta sama tura usuwa powtórzenia
w -27 i -34. Uzasadnienie wpisz do raportu, bo odchodzi od rekomendacji briefu.
Po tej zmianie public/images/portfolio-1.jpg staje się nową sierotą. To NIE jest "przy okazji":
przenosisz go do _to_delete/ razem z trzema plikami z -18 i wymieniasz jako czwartą pozycję.
ZDJ2608-18 wykonujesz PO ZDJ2608-17. Zanim przeniesiesz sesja-wizerunkowa/01.jpg, sprawdź,
czy galeria tej realizacji nie jest listowana z dysku i czy plik nie jest jednym z kadrów
publikowanych w FAZIE 2. Jeśli jest, zostawiasz go i zapisujesz w raporcie.
ZDJ2608-27: jeśli po odfiltrowaniu hero któraś kategoria ma mniej kadrów niż limit paska,
NIE dobierasz kadru z innej kategorii. Zatrzymujesz ten jeden punkt i zapisujesz w raporcie.
ZDJ2608-24: sprawdź kodem odpowiedzi, czy maxresdefault istnieje dla każdego osadzonego filmu.
Dla tych, gdzie zwraca 404, zostaje hqdefault. Fallback ma być realny, nie zadeklarowany.

FAZA 2: portfolio, po DZ1 i DZ2
| ZDJ2608-31 | publikacja czterech realizacji: fotografia-eventowa (9 kadrów), packshoty-produktowe (10),
|            | sesja-korporacyjna (8), sesja-wizerunkowa (6 albo 7, źródła się różnią: POLICZ NA DYSKU).
|            | Checklista wejściowa z briefu: -17, -08, -09 mają być zrobione.
| ZDJ2608-32 | woohoo-autopay z pierwszego miejsca, wariant A: kolejność idcom, yes-butcher, woohoo, artech.
|            | Wariantu B (dokładanie kadrów) NIE robisz, wymaga plików spoza repo.
| ZDJ2608-03 | pochodna -32. Kafelek Artechu (klatka z filmu) zostaje, to osobna decyzja Marcina.
| ZDJ2608-26 | sierota w siatce znika sama przy ośmiu kaflach. Potwierdzasz pomiarem na 1440 px.

Karta og/portfolio/sesja-wizerunkowa.png: po zmianie miniatury w -17 karta OG pokazuje inny kadr
niż kafelek (zdjęcie grupowe przy autach sportowych). Pliku nie zrobisz, ale to jest ROZJAZD
ŚWIADOMIE WPUSZCZANY NA PRODUKCJĘ na trasie, którą właśnie wprowadzasz do sitemapy.
Wpisujesz go do sekcji C raportu jako pozycję numer jeden i zaznaczasz przy AC fazy 2,
że og:image zwraca 200, ale niesie kadr wycofany z tej realizacji.

ZDJ2608-33 (JSON-LD ItemList na /portfolio) NIE WYKONUJESZ. Po publikacji ośmiu realizacji
rozjazd spada z pięciu pozycji do jednej. Zapisujesz wariant A (portfolioItems zamiast
portfolioCategories, portfolio/page.tsx:54) w sekcji C raportu jako jedną linię do akceptacji.

AC fazy 2: /portfolio pokazuje 8 kafli, sitemap ma 8 tras portfolio, żadna nie ma
robots index:false, każda ma og:image zwracający 200 (sprawdzone komendą, nie założeniem),
pierwszy kafelek na / i na /portfolio prowadzi do realizacji z niepustą galerią.
Próg placeholdera "Więcej zdjęć wkrótce" to images.length < 3 w PortfolioGallery.tsx:98,
sprawdź, czy żadna z czterech publikowanych realizacji pod niego nie wpada.

FAZA 3: nazwy plików i cache, po DZ4
| ZDJ2608-01 | konwencja kategoria-NN-opis dla 51 plików: galeria/eventy (15), galeria/portrety (14),
|            | galeria/wnetrza (12), portfolio/box17 (10). Numery NN BEZ ZMIAN, dokleja się tylko opis,
|            | więc kolejność wyświetlania zostaje identyczna.
| DZ4 war. B | next.config.ts: immutable na must-revalidate, jedna linia, nic więcej.

ZDJ2608-16 (portrety otwiera operator z kamerą) NIE WYKONUJESZ. Owner to Marcin, a przenumerowanie
łamie AC "kolejność identyczna" tej samej fazy. Przy okazji zmiany nazw wypisujesz w raporcie
propozycję nowej kolejności portrety-NN wraz z nazwą kadru otwierającego, do decyzji Marcina.

Zanim ruszysz nazwy, sprawdź w repo, czy stary adres nie jest linkowany: git grep po każdej
starej nazwie w src/, public/llms.txt, sitemap, treści wpisów w blog.ts. Powierzchni zewnętrznych
NIE sprawdzasz (autoryzacja 5), oddajesz tabelę.

Miejsca w kodzie, które ta fala pociąga za sobą i które muszą zostać zaktualizowane razem
z plikami: ścieżki box17 w portfolio.ts, listy CURATED.portrety i CURATED.eventy
w ServiceGalleryStrip.tsx, kolejność altVariants dla wnetrza w galeria/page.tsx, pola heroImage
w services.tsx (wskazują na pliki z przemianowanych folderów), referencja wstawiona w -17.
Ta lista może być niepełna: rozstrzyga git grep, nie ona.

AC fazy 3: zero plików NN.jpg bez opisu w tych czterech folderach, git grep na starych nazwach
daje 0 trafień w src/ i w public/, altVariants dla wnetrza pasują 12 z 12 do kadrów (sprawdzone
ręcznie, nie założone), tabela 51 pozycji w raporcie, kolejność wyświetlania identyczna.

FAZA 4: opisy alternatywne, po fazie 3
| ZDJ2608-04 | eventy: 15 opisów zamiast rotacji po 5 wariantach. portrety: 14 zamiast 5. Razem 29.
|            | Pliki: galeria/page.tsx, dwie listy altVariants. Mechanizm: GalleryView.tsx:34.
| ZDJ2608-12 | alty w pasku usług, dziś numerowane ("... 1", "... 2").
|            | ServiceGalleryLightbox.tsx:72,144. Tu, a nie w fazie 1, bo pasek bierze kadry
|            | z folderów przemianowanych w fazie 3.
| ZDJ2608-11 | alty generowane z tytułu albo nazwy usługi: 8 hero usług, 8 kafli usług, kafle
|            | portfolio (po fazie 2 jest ich 8, nie 4), 9 hero case study, 26 okładek blogowych.
|            | Policz zakres sam po fazie 2 i podaj w raporcie ile z ilu.
| ZDJ2608-28 | podział list CURATED, żeby te same 6 portretów nie stały na trzech podstronach.
|            | TEGO NIE WYKONUJESZ. Przygotowujesz propozycję podziału w raporcie, owner to Marcin.

ZASADA TWARDA TEJ FAZY: przed napisaniem opisu OBEJRZYJ KADR. Nazwa pliku nie jest dowodem
na to, co jest na zdjęciu, dokładnie tak samo jak w audycie. Jeśli pliku nie da się obejrzeć,
zostawiasz stary alt i wpisujesz go do listy nieobsłużonych w raporcie. Nie opisujesz z nazwy,
nie opisujesz z nagłówka, nie opisujesz z komentarza w kodzie.

Opis ma nazwać to, co widać: bez długich myślników, bez fraz z czarnej listy, bez doklejania
miasta przecinkiem, bez liczby pojedynczej przy kadrze dwuosobowym. Kadr, którego nie da się
opisać zgodnie z podpisem kategorii (osioł, DJ), to sygnał do decyzji Marcina, nie powód
do naciągania opisu: taki kadr opisujesz uczciwie i odnotowujesz.

FAZA 5: treść
| TRESC2608-50 | podstrona dronowa sprzedaje zakres sekcji 8 cennika pod kotwicą 700 zł,
|              | 600-1200 zł straty na zleceniu. Gotowy diff leży w repo od 03.08:
|              | git apply docs/sesje/poprawki-dron-2026-08-03-NIEZASTOSOWANY.diff
|              | AC: mierzysz SAM PATCH, nie drzewo. git apply --stat na tym pliku ma pokazać 1 plik
|              | i 6 linii. git diff --stat jest już brudny po fazie 1 i nie jest kryterium.
|              | Jeśli patch nie wchodzi czysto, aplikujesz ręcznie po treści.
| TRESC2608-09 | kolizja kotwicy 900 zł, część tekstowa, services.tsx:584.
|              | ZDANIE ZAMIENNE Z BRIEFU JEST BŁĘDNE I NIE WOLNO GO WPISAĆ (patrz SPROSTOWANIE).
|              | Wpisujesz dokładnie ten tekst, zatwierdzony przez Marcina 04.08:
|              | "Sesja dronowa od 700 zł to materiał przebitkowy: ujęcia z powietrza, którymi
|              |  uzupełniasz film, stronę albo ofertę. Sesja obiektu od 900 zł zaczyna się
|              |  od zdjęć konkretnego budynku lub hali z powietrza i rośnie o to, czego z góry
|              |  nie widać: kadry z poziomu ziemi, wnętrza, produkcję, film o firmie. Jeśli
|              |  potrzebujesz samej panoramy terenu, tańsza będzie sesja dronowa."
|              | Zwróć uwagę, że wersja z briefu była w formie "wstawicie, potrzebujecie", czyli sama
|              | łamała TRESC2608-02. Tekst powyżej jest już w liczbie pojedynczej.
| TRESC2608-22 | seo.description drona (services.tsx:517) obiecuje "dron w cenie pakietów
|              | hybrydowych", czego na tej podstronie nie ma. Zamiennik w briefie dronowym,
|              | długość PRZELICZ skryptem, cel <=155 znaków. TA SAMA LINIA domyka jedno z czterech
|              | przekroczeń z TRESC2608-38: nie edytujesz jej drugi raz, w raporcie odnotowujesz
|              | oba ID przy jednym "było -> jest".
| TRESC2608-02 | forma "Wy" w linii obiektowej i w dwóch pytaniach FAQ, 6 podmian.
|              | services.tsx:551, 584, 588, 589, 590, 168. Brief ma komplet zdań.
| TRESC2608-08 | słowo "brief" jako widoczny tekst. services.tsx:271, 273, 274, 498
|              | (:168 domyka się w -02, patrz kolejność niżej). Brief ma komplet zdań.
| TRESC2608-03 | ósma usługa nie istnieje na listach pisanych ręcznie. Osiem powierzchni,
|              | wykonujesz sześć: llms.txt:7 (specjalizacja), llms.txt sekcja usług po :23 (wiersz
|              | gotowy w briefie), CTA.tsx option value="obiekty", api/contact/route.ts
|              | SERVICE_LABELS, services.tsx:783 mapa opinii WARIANTEM B (świadoma luka, bez cytatu,
|              | bo nie wolno przypisywać cudzej opinii do usługi, której nie dotyczyła),
|              | blog.ts:1740 blogServiceMap. Siódma, description huba uslugi/page.tsx:16, nie ma
|              | gotowego tekstu: piszesz sam pod AC <=155 znaków i oznaczasz jako tekst własny
|              | do akceptacji. Ósma, layout.tsx hasOfferCatalog, NIE RUSZASZ.
| TRESC2608-01 | licencja, DT1 = A: Warunki.tsx:91 na użytek komercyjny. Jedna linia.
|              | AC z briefu: grep -rn "na własny użytek" src/ daje 0, a do raportu wklejasz cztery
|              | cytaty obok siebie (Warunki.tsx:91, faq.ts:60, services.tsx:327, llms.txt:30)
|              | i pokazujesz, że opisują ten sam zakres pól eksploatacji. Sam grep na "użytek
|              | komercyjny" NIE jest kryterium, bo dwa z czterech trafień siedzą w blog.ts.
|              | Wariantu B (zmiana trzech pozostałych powierzchni) NIE dotykasz.
| TRESC2608-48 | DT5 = A: "mini-brief" na "gotowa lista pytań" na DZIEWIĘCIU powierzchniach,
|              | łącznie z mailem do leada: PoradnikTeaser.tsx:23, PoradnikBlogCTA.tsx:26,
|              | poradnik/page.tsx:16, 21, 36, 46, 83, 117, api/lead/route.ts:93.
|              | Briefu nie ma, lista jest w AUDYT-TRESC §5. Domyka ogon PELNY2907-12.
| quick winy   | TRESC2608-27 (fleksja, Publications.tsx:61), -32 i -33 (niekonsekwencje zapisu
| bez briefu   | w llms.txt), -36 (Footer.tsx:21), -53 (bezterminowe przekładanie terminu wbrew
|              | cennikowi, services.tsx:509). Zamienniki w AUDYT-TRESC §5, przy findingach.
|              | -38: gotowego tekstu NIE MA. Trzy opisy blogowe (blog.ts:920, 1586, 1639) skracasz
|              | sam o 2-3 znaki, najmniejszą możliwą ingerencją, i oznaczasz jako tekst własny
|              | do akceptacji. Czwarty opis, services.tsx:517, domyka TRESC2608-22.
|              | Każdy quick win cytujesz w raporcie w formie było -> jest.
| TRESC2608-51 | hero linii obiektowej obiecuje kadry naziemne i wnętrza przy kotwicy 900 zł.
|              | Sprostowanie Marcina rozstrzyga fakt: 900 to zdjęcia z drona, reszta jest dokładką.
|              | Przepisujesz OBIETNICĘ (services.tsx:549) tak, żeby powietrze było punktem wyjścia,
|              | a ziemia i wnętrza dokładką. Tekst własny, do akceptacji, oznaczony w raporcie.
|              | heroPriceLabel (:571) NIE RUSZASZ, to komunikat cenowy i osobna decyzja.

KOLEJNOŚĆ WEWNĄTRZ services.tsx, bo dwa ID trafiają w te same linie:
- :584 najpierw TRESC2608-09 (cały nowy akapit z tekstem zatwierdzonym), potem TRESC2608-02
  sprawdza, czy w nowym zdaniu nie ma form mnogich. Brak starego cytatu po -09 nie jest
  rozjazdem dokumentacji.
- :168 wykonujesz RAZ, zdaniem z briefu TRESC2608-02. Ono domyka jedno z pięciu wystąpień
  słowa "brief", więc w TRESC2608-08 zostają cztery: :271, :273, :274, :498.

Zablokowane w tej turze, ZAPISUJESZ WARIANT ZAMIAST WYKONYWAĆ: TRESC2608-04 (warunki w FAQ),
-05 (czas trwania sesji wizerunkowej), -23 (minPrice w JSON-LD), -52 (blurb portretów obiecuje
studio w cenie pakietu, services.tsx:320, owner Marcin mimo gotowego zamiennika), -11
(hasOfferCatalog). Wszystkie wymagają faktu handlowego, kwoty albo dotykają JSON-LD.

POZA ZAKRESEM TEJ TURY, świadomie, ze statusem do wpisania w rejestr i uzasadnieniem w sekcji D:
- fala 6 planu w całości: ZDJ2608-19 (czeka na pomiar PSI), -21 (obróbka plików graficznych),
  -13 i -30 (decyzje kadrowe Marcina), -20 (duplikaty bajtowe), -14 (wybór redakcyjny).
- ZDJ2608-02: odrzucony 04.08, Box17 zostaje ukryty. ZDJ2608-05: rozstrzygnięty wariantem B,
  domknięty przez -05b.
- ZDJ2608-15 i -29: czekają na DZ3 (nowy kadr hero wideo marketingu).
- ZDJ2608-10, -23, -35, -36: czekają na DZ5 (karty OG). ZDJ2608-23 to og:image ósmej usługi
  zwracający 404, jedyny P1 w tej grupie: kodowego fallbacku NIE robisz, wpisujesz go
  do sekcji C jako pozycję najpilniejszą z całej fali OG.
- ZDJ2608-33 i -16: opisane wyżej, wariant do raportu.

CZEGO NIE ROBISZ, pamięć antyregresyjna. Każde z tych zdań ma za sobą decyzję z datą:
1. Nie proponujesz i nie przywracasz cennika, tabeli cen ani sekcji "Cennik", też jako
   ulepszenia SEO. Kotwice "od X zł" zostają jedynym miejscem z kwotą.
2. Nie redagujesz cytatów klientów w Testimonials.tsx ani w portfolio.ts. Wolno wyłącznie
   ujednolicić zapis tego samego cytatu, nigdy treść.
3. Nie redagujesz pola content w blog.ts. Warstwa title, description, readTime i alt okładki
   jest dozwolona, proza nie.
4. Nie przestawiasz kolejności w galerii produktowej, dronowej ani eventowej.
5. Nie zmieniasz składu CURATED.produktowe. Krytyka proporcji kadru nie jest zgodą na wymianę.
6. Nie dodajesz portret-07 z powrotem do CURATED.portrety.
7. Nie przywracasz drugiego filmu Woohoo do galerii ani sceny z laserami do eventów.
8. Nie kopiujesz plików między folderami, żeby "naprawić" duplikaty wnętrz.
9. Nie proponujesz publikacji Box17. Decyzja z 04.08: zostaje ukryty mimo kompletu 10 zdjęć.
10. Nie zawężasz kategorii eventowej do konferencji i gal. Koncert, DJ i osioł zostają.
11. Nie zmieniasz kolejności kart usług, portrety zostają na swojej pozycji do września.
12. Nie zgłaszasz braku linii obiektowej jako luki, usługa jest opublikowana od 04.08.
13. Nie usuwasz plików z public/ bezpowrotnie, przenosisz do _to_delete/ i wymieniasz je
    w raporcie. Przez most urządzeń rm nie zadziała, użyj mv.
14. Nie zmieniasz kluczy zakładek galerii (kat=), to adresy w URL.
15. Nie ruszasz scale-[1.15] ani aspect-[3/4] w About.tsx, ani objectPosition center 20%
    w kafelkach usług, ani gridClass i aspectClass w paskach.
16. Nie dodajesz meta keywords, nie przywracasz priceRange, aggregateRating ani review[],
    nie dodajesz LinkedIn ani Facebooka do sameAs.
17. Nie instalujesz żadnej paczki npm.
18. Nie commitujesz, nie pushujesz, nie mergeujesz. Git obsługuje Marcin.

PISANIE TEKSTU, obowiązuje dla altów, zdań zamiennych i opisów meta:
test nadrzędny to pytanie, czy Marcin powiedziałby to zdanie klientowi przez telefon.
Zero długich myślników w tekście widocznym dla użytkownika (w komentarzach w kodzie są dozwolone,
tam ich nie ruszasz). Czarna lista fraz w całości z docs/zasady-tekstow.md, w tym: kompleksowe
rozwiązania, dopasowane do Twoich potrzeb, na najwyższym poziomie, wyjątkowy, unikalny, dbałość
o każdy detal, szeroka gama, bogate doświadczenie, gwarancja satysfakcji, podchodzę indywidualnie
bez konkretu obok, "profesjonalny" jako jedyne określenie. Zero triad przymiotników, zero
akapitów-lustrzanek, zero wykrzykników i emoji. Liczba pojedyncza, jeden twórca, nigdy "nasz
zespół" i nigdy "Wy" do klienta. Miasta nie doklejasz przecinkiem (wyjątek dotyczy tylko reklam
Ads, których ta tura nie obejmuje). Zanim odeślesz czytelnika do sekcji na stronie, otwórz
tę stronę i sprawdź, że sekcja tam jest.

SUBAGENCI: wyłącznie do czytania i oglądania kadrów oraz do przygotowania list opisów.
ZAPIS DO PLIKÓW WYKONUJE JEDEN AGENT. Dwa subagenty edytujące równolegle portfolio.ts albo
services.tsx skończą nadpisaniem swojej pracy. Faza 4 jest tu najbardziej kusząca i najbardziej
ryzykowna: subagent ogląda i zwraca listę "plik -> co widać", zapis robisz sam.

POMIARY I PROGI, sprawdzane, nie zakładane. Każdy pomiar podajesz z adresem: localhost czy
produkcja. POMIAR "PO" ZMIANIE ROBISZ NA localhost (npm run dev), bo ta tura nie trafia
na produkcję. Pomiar "po" z szabunia.pl jest nieważny i daje fałszywe PASS.
- ZDJ2608-07: dla każdego kafla przy 390, 900 i 1728 px i DPR 2 ma zachodzić
  0,85 * szerokość CSS * DPR <= naturalWidth <= 1,4 * szerokość CSS * DPR. Mierz na
  /uslugi/fotografia-produktowa i /uslugi/wizerunek-portrety. Breakpoint 1056 px wynika
  z max-w-5xl. Sufity: 250px dla produktowej, 165px dla siedmiu pozostałych.
  Uwaga na pułapkę z briefu: "(max-width: 640px) 50vw, 25vw" bez sufitu jest BŁĘDNE.
- ZDJ2608-25: przy 1440 px i DPR 2 naturalWidth nie mniej niż 1250 px, przy 390 px obraz
  nadal się nie pobiera (sekcja hidden lg:block).
- ZDJ2608-06: pasek kategorii przy 390 px nie łamie się na dwie linie.
- ZDJ2608-34: żaden plik nie występuje w realizacji więcej niż dwa razy (kafelek i hero).
- ZDJ2608-27: każdy pasek ma tyle samo kadrów co przed zmianą, sześć, produktowa osiem.
- ZDJ2608-24: next/image z jawnymi wymiarami, źródło maxresdefault tam, gdzie istnieje,
  zero CLS.
- TRESC2608-22 i -38: długość opisu liczysz skryptem w znakach, próg 155.
- Okno przeglądarki widoczne. visibilityState hidden wstrzymuje render i daje fałszywe wyniki.

DEFINITION OF DONE:
1. npm run lint: 0 błędów, 0 ostrzeżeń.
2. npx tsc --noEmit czysty. Po każdym dotkniętym pliku, nie raz na końcu.
3. npm run build: sukces (jeśli działasz na Macu Marcina; w sandboxie pada z Bus error,
   wtedy zapisujesz to jawnie zamiast udawać, że przeszło).
4. dev bez błędów w konsoli na /, /uslugi, /uslugi/fotografia-produktowa,
   /uslugi/wnetrza-obiekty-architektura, /portfolio, /galeria, /blog.
5. dark mode działa na każdej odwiedzonej stronie.
6. Smoke-test ścieżek, nie stron: przełączenie zakładki w /galeria, otwarcie lightboxa, powrót,
   klik w kafelek portfolio z home, klik w kafelek usługi z /uslugi.
7. Przy każdej zmianie nazwy pliku: tabela stary adres -> nowy adres.
8. Przy każdej zmianie alt: cytat z pliku, nie z pamięci.

PRODUKT, zapisywany na bieżąco, nie na końcu:
1. docs/sesje/poprawki-2026-08-04.diff, jeden plik dla całej tury (git diff > plik), bez commita.
2. docs/sesje/POPRAWKI-WDROZONE-2026-08-04.md wg METODYKA §8:
   nagłówek ze statusem "zmiany w drzewie roboczym, niezacommitowane, NIE wdrożone na produkcję"
   i podsumowaniem diffa (X plików, +Y/-Z, lint PASS, tsc PASS),
   A. co zrobione, pogrupowane po celu biznesowym (Portfolio, Galeria, Oferta, Higiena),
      każdy punkt z plikami i INSTRUKCJĄ ODWRÓCENIA,
   B. co już było w kodzie i wdroży się z deployem,
   C. co zostaje po stronie Marcina: karta OG sesja-wizerunkowa (pozycja pierwsza),
      ZDJ2608-23 (og:image ósmej usługi, 404), DZ3 i DZ5, sprawdzenie 51 starych adresów
      na powierzchniach zewnętrznych, propozycja podziału CURATED z -28, propozycja kolejności
      portretów z -16, jedna linia ItemList z ZDJ2608-33, teksty własne do akceptacji,
   D. świadomie odłożone z uzasadnieniem (lista POZA ZAKRESEM plus TRESC2608-04, -05, -23,
      -52, -11),
   E. jak zweryfikować i wdrożyć, gotowe komendy.
3. Tabela 51 pozycji stary adres -> nowy adres, osobna sekcja.
4. Rejestr ID ze statusem dla WSZYSTKICH 38 wierszy rejestru §13 planu (01-36 plus 02b i 05b)
   oraz wszystkich dotkniętych TRESC2608-*. Statusy: wdrożony / wdrożony ale niezdeployowany /
   odłożony / odrzucony / poza zakresem. "Wdrożony ale niezdeployowany" ma być widoczny,
   to jest cała ta tura.
5. Lista plików przeniesionych do _to_delete/ (cztery pozycje, jeśli -17 poszło wariantem B).
6. Sugerowany commit message, jeden na fazę, z pełnymi ID.

GDY ZABRAKNIE KONTEKSTU: kończysz na granicy fazy, zapisujesz diff i raport z tym, co zrobione,
i piszesz jawnie, gdzie skończyłeś i co zostało. Nie zaczynasz fazy, której nie skończysz.
Raport niekompletny z jawną granicą jest wart więcej niż połowa fazy bez zapisu.

WERYFIKACJA NA KONIEC, osobnym subagentem, przed podsumowaniem w czacie:
- czy każde ID z rejestru ma status i czy żadne nie zniknęło po cichu,
- czy w diffie nie ma zmian spoza listy ID (to najczęstszy błąd tej fazy),
- czy każdy nowy alt opisuje obejrzany kadr, a nie nazwę pliku (próbka 10, z cytatem),
- czy żadna zmiana nie relitygowała decyzji z listy CZEGO NIE ROBISZ,
- czy w tekstach widocznych dla użytkownika nie pojawił się długi myślnik, fraza z czarnej listy
  ani forma "Wy",
- czy w services.tsx:584 stoi tekst ze SPROSTOWANIA, a nie zdanie z briefu,
- czy tabela stary adres -> nowy adres ma dokładnie 51 wierszy,
- czy next.config.ts ma zmienione dokładnie jedno słowo,
- czy JSON-LD został dotknięty wyłącznie przez TRESC2608-02.

NA KONIEC: 5 zdań w czacie. Co wdrożone, ile ID zamkniętych z ilu, co czeka na moją decyzję,
co muszę sprawdzić ręcznie, czy build przeszedł. Bez powtarzania raportu.
```

---

## Zanim odpalisz

- [ ] `git status` czysty albo świadomie brudny. Ta tura dotyka kilkudziesięciu plików,
      więc nierozpoznany bałagan w drzewie zmiesza się z wynikiem wdrożenia.
- [ ] Zrób punkt powrotu przed fazą 3. Pięćdziesiąt jeden zmian nazw plików to jedyna operacja
      w tej turze, której nie cofniesz jednym `git checkout`.
- [ ] `npm run dev` odpalony i Chrome z widocznym oknem, jeśli pomiary mają być realne.
      Pomiary po zmianie idą na localhost, nie na produkcję.
- [ ] Jeśli masz nowy kadr do hero wideo marketingu (DZ3) albo karty OG (DZ5), wrzuć je
      do repo PRZED startem i dopisz to do promptu. Inaczej te sześć ID wraca do Ciebie.
- [ ] Jeśli od 04.08 przestawiałeś cokolwiek ręcznie, dopisz to do listy CZEGO NIE ROBISZ.

## Wariant krótszy: tylko fala 1, bez decyzji

```
Wdrożenie poprawek szabunia.pl, TYLKO FAZA 1 z docs/PROMPT-WDROZENIE-2026-08-04.md.
TRYB AUTONOMICZNY. Trzynaście ID: ZDJ2608-22, -06, -25, -05b, -08, -09, -17 (wariant B), -34,
-02b, -27, -07, -24, -18. Żadnych decyzji, żadnych zmian nazw plików, zero JSON-LD,
zero next.config.ts. Diff osobnym plikiem w docs/sesje/, bez commita, po każdym pliku
npx tsc --noEmit. Raport wg METODYKA §8. Na końcu 5 zdań w czacie.
```

## Wariant krótszy: tylko treść

```
Wdrożenie poprawek treści szabunia.pl z BRIEFY-TRESC-2026-08-04.md. TRYB AUTONOMICZNY.
Zakres: TRESC2608-50 (gotowy diff w docs/sesje/), -09, -22, -02, -08, -03 bez layout.tsx,
-01 wariant A, -48, -51 (tylko obietnica, nie heroPriceLabel), oraz quick winy -27, -32, -33,
-36, -38, -53. Zamienniki w AUDYT-TRESC §5, nie w §11.
UWAGA: zdanie zamienne z briefu dla services.tsx:584 jest błędne. Obowiązuje sprostowanie
Marcina z 04.08 i tekst z docs/PROMPT-WDROZENIE-2026-08-04.md, FAZA 5, TRESC2608-09.
Zablokowane, zapisz wariant zamiast wykonać: -04, -05, -23, -52, -11.
Cytatów klientów nie ruszasz, prozy blog.ts nie ruszasz, cennika nie proponujesz.
Diff osobnym plikiem, bez commita. Raport wg METODYKA §8. Na końcu 5 zdań w czacie.
```

## Po wdrożeniu

```
Re-audyt szabunia.pl po wdrożeniu z 04.08. TRYB AUTONOMICZNY, nie pytaj o nic.
Punkt odniesienia: tabela metryk z PLAN-POPRAWEK-ZDJECIA-2026-08-04.md §11, data kontrolna 18.08.
Mierz tą samą metodą, z jednej serii. Domknij każde ID statusem: zamknięty / bez zmian / regres.
Sekcja "co zadziałało" obowiązkowa. Na końcu 5 zdań w czacie.
```

---

*Prompt złożony 04.08.2026 z trzech planów i trzech raportów audytowych z tego samego dnia,
po weryfikacji przeciwko źródłom. Sam niczego nie zmienia. Decyzje DZ1, DZ2, DZ4, DT1, DT5, DT6,
zakres quick winów oraz sprostowanie różnicy między sesją dronową a sesją obiektu pochodzą
od Marcina z 04.08 i są zapisane jako autoryzacje, nie jako pytania.*
