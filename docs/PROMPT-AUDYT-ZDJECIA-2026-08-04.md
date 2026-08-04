# Prompt uruchomieniowy: audyt zdjęć, dopasowania i kolejności

Format wg `docs/METODYKA-AUDYTU.md` §12.2. Skill `audyt-szabunia` odpala się na słowo
„audyt", więc prompt nie powtarza metodyki. Daje pięć rzeczy, których agent nie zgadnie:
zakres, dane, głębokość, granice i tryb.

Ten audyt różni się od wszystkich poprzednich jedną rzeczą. **Dowodem nie jest linia kodu,
tylko obejrzany kadr.** Nazwa pliku nie jest dowodem na to, co jest na zdjęciu:
`wnetrze-07.jpg` może być halą, `portret-11.jpg` może być zdjęciem grupowym,
`produkt-04-danie-muszla.jpg` może być zdjęciem wnętrza restauracji. Agent, który oceni
galerię po nazwach plików i po `alt`, wyprodukuje audyt tej samej jakości co Gemini
w czerwcu, czyli 1 trafienie na 11.

Drugie ryzyko specyficzne dla tego tematu: **kolejność zdjęć była w ostatnim tygodniu
ustawiana ręcznie przez Marcina, w kilkunastu commitach.** Zgłoszenie „przestaw produktowe"
bez sprawdzenia, dlaczego stoją tak, jak stoją, to relitygacja zamkniętej decyzji.
Sekcja GRANICE w prompcie jest po to, żeby tego uniknąć, i trzeba ją aktualizować
przed każdym kolejnym uruchomieniem.

---

## Prompt do skopiowania

```
Audyt szabunia.pl: ZDJĘCIA, DOPASOWANIE I KOLEJNOŚĆ. TRYB AUTONOMICZNY, nie pytaj o nic.

REPO: /Users/marcinszabunia/Documents/05_Strona_WWW/marcinszabunia

PYTANIE PRZEWODNIE: czy każde zdjęcie pokazuje to, co obiecuje otaczający je tekst,
czy stoi we właściwym miejscu w kolejności, i które kadry trzeba wymienić, przestawić
albo zdjąć, żeby pierwsze trzy zdjęcia na każdej podstronie sprzedawały tę usługę,
po którą klient tam przyszedł.

ZAKRES: nowy moduł F, warstwa wizualna. Z modułu B tylko to, co dotyczy obrazów
(hierarchia wizualna, kolejność, LCP, CLS), z modułu C tylko alt, nazwa pliku jako adres
i OG. Techniczne SEO poza obrazami pomijamy, było 29.07 i 03.08. Treść tekstowa poza
alt-ami pomijamy, jest osobny audyt TRESC z tego samego dnia.

ZASADA NADRZĘDNA TEGO AUDYTU: zanim ocenisz zdjęcie, OBEJRZYJ JE. Wgraj plik i opisz,
co na nim widać, zanim porównasz to z kontekstem. Ocena po nazwie pliku, po alt-cie
albo po komentarzu w kodzie nie jest dowodem i ląduje w hipotezach z etykietą H.
Format dowodu dla tej osi: „obejrzane, widać X" plus ścieżka pliku plus miejsce użycia.

INWENTARZ PRZED OCENĄ, raport podaje pokrycie X z Y plików:
- wszystkie pliki graficzne w public/images, policz je sam (find), nie ufaj liczbie z pamięci
- mapa użycia: dla każdego pliku gdzie jest wyświetlany, w jakiej kolejności, z jakim alt,
  w jakim kontenerze i proporcji. Źródła: src/data/services.tsx, portfolio.ts, blog.ts,
  galeria.ts, src/lib/galleryImages.ts (galerie listują się z dysku, sort po nazwie pliku,
  więc nazwa JEST kolejnością) oraz komponenty: Hero, About, Services, Portfolio,
  PortfolioHero, PortfolioGallery, PortfolioVideoShowcase, BlogCard, GalleryView,
  ServiceHero, ServiceGalleryLightbox, ServiceGalleryStrip, ServiceAuthor, Publications,
  PoradnikTeaser, PoradnikBlogCTA
- pliki osierocone: leżą w public, nie ma do nich referencji
- referencje wiszące: kod pokazuje na plik, którego nie ma
- pliki spoza konwencji: _F2A8912.jpg, 1.jpg, 15.jpg, 33.jpg, _WRZUC-TU-ZDJECIA.txt

SZEŚĆ OSI OCENY, każdy finding przypisany do jednej:
1. DOPASOWANIE DO TREŚCI: czy kadr pokazuje to, co obiecuje nagłówek, akapit obok,
   nazwa kategorii i alt. Osobno: hero podstron usług, kafelki usług, okładki wpisów
   blogowych, kafelki i galerie case studies, kategorie w /galeria, OG.
2. KOLEJNOŚĆ I RYTM: pierwszy kadr każdego pasa i każdej kategorii, trzy pierwsze
   widoczne bez przewijania, kadr zamykający, dwa podobne kadry obok siebie, skok
   tematyczny w środku pasa, gęstość i długość pasa.
3. POKRYCIE I POWTÓRZENIA: usługa albo wpis bez własnego zdjęcia, to samo zdjęcie
   w wielu miejscach (świadome kotwiczenie kontra rozwodnienie), kategoria z za małą
   liczbą kadrów, klient nadreprezentowany w jednym pasie.
4. SPÓJNOŚĆ WIZUALNA: obróbka, temperatura, kontrast i jasność w obrębie jednego pasa,
   proporcje kadru kontra kontener (kadrowanie ucinające głowy i produkty), zdjęcia
   pionowe w poziomej siatce, zachowanie w ciemnym motywie.
5. WARSTWA TECHNICZNA: waga pliku (poprzedni audyt zmierzył JEDEN plik, to otwarta luka),
   wymiary źródła kontra realny rozmiar renderu, format, priority i loading, sizes,
   kandydat na LCP na każdej trasie, CLS przy obrazach bez wymiarów, next/image kontra
   surowy img.
6. ALT, NAZWY I OG: alt opisuje kadr czy powiela nagłówek, alt wg docs/zasady-tekstow.md
   (bez długich myślników, bez czarnej listy), nazwa pliku jako trwały adres
   (konwencja kategoria-NN-opis wg komentarza w src/lib/galleryImages.ts), OG 1200x630
   i czy OG podstrony to ten sam obraz co hero.

DANE:
- repo lokalne i git: HEAD, czy drzewo czyste, czy produkcja równa się main
- pliki graficzne oglądane bezpośrednio, nie przez opis
- live szabunia.pl przez Chrome, JS włączony, okno widoczne, jeśli dostępne. Bez tego
  osie 2 i 5 mierzysz z kodu i oznaczasz N w tych miejscach, gdzie render rozstrzyga
- punkt odniesienia, przeczytaj przed pracą: AUDYT-UX-2026-07-31.md (145 obrazów z alt,
  wagi plików jako otwarta luka §9), AUDYT-PELNY-2026-07-29.md (18/18 alt na home),
  ANALIZA-LEJEK-PODSTRONY-USLUG-2026-08-02.md. Nie zgłaszaj ponownie tego, co tam
  zamknięte, chyba że wróciło. Jeśli wróciło, oznacz jako regres z datą zamknięcia
- git log ostatnich 20 commitów: kolejność w galeriach była ustawiana ręcznie przez
  Marcina 03 i 04.08. Zanim zgłosisz „zła kolejność", sprawdź, czy to nie jest jego decyzja
  sprzed dwóch dni

GRANICE, decyzje zamknięte wcześniej, nie relitygować:
- Kolejność produktowej: Amarula na drugim miejscu (ee5970d), budki Box 17 nad modą
  (158b955, b3ed677), 24 kadry w ośmiu rzędach (a67caa3). Decyzje Marcina 03 i 04.08.
- Dron: biurowiec w zieleni zamiast panoramy miasta na kafelku i w hero (35a66cc),
  wieżowiec na koniec pasa (d4bfbec). Decyzja Marcina 03 i 04.08.
- Eventy: scena z laserami zdjęta świadomie (d4bfbec). Jeden film Woohoo w galerii
  zamiast dwóch (d4bfbec, komentarz w galeria.ts). Nie proponować powrotu.
- Film rozdziela paski galerii na podstronach usług i otwiera na wideo marketingu
  (f715551, a67caa3). To układ po korekcie, nie przypadek.
- Konwencja nazw kategoria-NN-opis.jpg jest obowiązkowa i ma udokumentowany powód
  (cache po adresie, komentarz w src/lib/galleryImages.ts). Foldery jeszcze bez tej
  konwencji to finding, ale zmiana nazw ma koszt: stare adresy znikają.
- Fotografia wnętrz, obiektów i architektury jest świadomie wyłączona od 31.07.
  Zdjęcia w public/images/galeria/wnetrza mogą być więc nieużywane celowo. Sprawdź,
  czy na pewno nigdzie się nie renderują, i nie zgłaszaj tego jako braku w ofercie.
- Kolejność kart usług ma portrety pierwsze mimo repozycjonowania na eventy.
  Świadome, przebudowa hierarchii to robota na wrzesień.
- Cennika nie proponować w żadnej formie. Decyzja 03.08.
- Zero zmian w plikach, zero przenoszenia i zmiany nazw zdjęć, zero commitów.
  Audyt kończy się na briefach.

GŁĘBOKOŚĆ:
- Oś 1 wyczerpująco dla: wszystkich hero podstron usług, wszystkich kafelków usług,
  wszystkich okładek wpisów blogowych, wszystkich kafelków case studies, pierwszych
  sześciu kadrów każdej kategorii w /galeria. Reszta próbką, z podaniem, ile obejrzano.
- Osie 2, 3, 6 wyczerpująco. Oś 5 wyczerpująco dla wag i wymiarów, bo to jest pomiar
  z pliku, a nie ocena.
- Każdy finding: dowód (obejrzany kadr / plik:linia / pomiar), priorytet, pewność, owner.
- Finding zawiera konkretną poprawkę: który plik czym zastąpić albo na którą pozycję
  przestawić. Nie wprowadzasz jej do kodu.
- Nie oceniaj kadrowania z samych proporcji pliku. Kontener i klasa object-* decydują,
  co zostaje widoczne. Sprawdź klasę w komponencie.
- Jeśli plik jest za duży na obejrzenie w całości, napisz to wprost zamiast zgadywać.

KOLEJNOŚĆ, zapisuj plik po każdej fazie:
1. PLAN-AUDYT-ZDJECIA-2026-08-04.md, zakres jako checklisty z numeracją §2.x
2. inwentarz i mapa użycia jako pierwsza faza danych, bo bez niej osie 2 i 3 są zgadywaniem
3. zbiór danych, każda oś osobnym subagentem, instrukcja „zwróć findingi w formacie §5,
   nie streszczaj". Subagent osi 1 dostaje jawnie polecenie obejrzenia plików
4. AUDYT-ZDJECIA-2026-08-04.md wg §6, obowiązkowo sekcje 2 (sprawdzone i OK),
   9 (czego nie sprawdzono) i 10 (własne fałszywe pozytywy)
5. BRIEFY-ZDJECIA-2026-08-04.md, findingi P0 i P1 przełożone na zadania z mierzalnymi AC.
   Osobno wydziel to, co wymaga NOWEGO zdjęcia od Marcina, bo tego agent nie zrobi
6. rejestr findingów z ID ZDJ2608-nr na końcu raportu
7. ostatni subagent weryfikuje pracę: czy każdy finding ma dowód, czy oś 1 opiera się
   na obejrzanych kadrach a nie na nazwach, czy nie ma relitygacji decyzji z sekcji GRANICE

NA KONIEC: 5 zdań w czacie. Najważniejszy finding, ile P0/P1/P2, co czeka na moją decyzję.
Bez powtarzania raportu.
```

---

## Zanim odejdziesz od komputera

- [ ] drzewo git czyste albo świadomie brudne, agent odnotuje to jako punkt odniesienia
- [ ] Chrome otwarty na szabunia.pl, karta nie zminimalizowana
      (`visibilityState: hidden` wstrzymuje render i daje fałszywe findingi)
- [ ] jeśli w ostatnich dniach przestawiałeś zdjęcia ręcznie, dopisz to do sekcji GRANICE
      przed uruchomieniem. Inaczej audyt zgłosi Twoją decyzję jako błąd
- [ ] jeśli masz nowe kadry, których jeszcze nie ma w repo, powiedz o tym w prompcie.
      Agent inaczej zaproponuje wymianę zdjęcia na to, którego nie ma

## Wariant krótszy, tylko dopasowanie i kolejność, bez warstwy technicznej

```
Audyt szabunia.pl: ZDJĘCIA, wyłącznie dopasowanie do treści i kolejność. TRYB AUTONOMICZNY.
Osie 1, 2 i 3 z docs/PROMPT-AUDYT-ZDJECIA-2026-08-04.md. Warstwę techniczną i alt pomijasz,
oznacz jako świadomie poza zakresem.
Obejrzyj każdy oceniany kadr, nazwa pliku nie jest dowodem.
GRANICE bez zmian: kolejność produktowej, dronowej i eventowej to decyzje Marcina z 03 i 04.08,
linia obiektowa świadomie wyłączona, cennika nie proponować.
Produkt: PLAN, AUDYT-ZDJECIA-2026-08-04.md, rejestr ID ZDJ2608-nr. Na końcu 5 zdań w czacie.
```

## Po audycie, gdy zdecydujesz o wdrożeniu

```
Wdróż briefy ZDJ2608-01, -03, -07 z BRIEFY-ZDJECIA-2026-08-04.md.
Diff osobnym plikiem w docs/sesje/, bez commita. Po każdym pliku npx tsc --noEmit.
Zmiana nazwy pliku zdjęcia = zmiana adresu. Przy każdej takiej zmianie wypisz stary
i nowy adres w raporcie, żeby dało się sprawdzić, czy nic nie zostało z cache'u.
Nie usuwasz plików z public, przenosisz je do _to_delete i mówisz mi które.
```
