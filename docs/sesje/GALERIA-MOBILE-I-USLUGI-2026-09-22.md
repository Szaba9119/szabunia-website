# Siatka galerii na telefonie i podwójne wywołanie usług

Sesja 22.09.2026. Kod lokalny: gałąź `main`, przed zmianą stan roboczy z 20.09.2026.
Pomiary z przeglądarki na serwerze deweloperskim, DPR 2, jeśli nie zapisano inaczej.

## Wniosek

Obie hipotezy Marcina potwierdzone, ale każda w węższym zakresie, niż brzmiała.

Siatka trzykolumnowa jest właściwa dla `/galeria` i tylko dla niej: to indeks 116 kadrów
w sześciu kategoriach, którego zadaniem jest pokazanie zakresu, a nie pojedynczego zdjęcia.
Dwie pozostałe powierzchnie galeryjne (pasek na podstronie usługi, galeria case study)
mają po 6–12 wybranych kadrów, już dziś stoją po dwie kolumny i zostają bez zmian.

Dwa bloki usług nie są tą samą informacją, ale na telefonie mają tę samą **formę**
i przez to czytają się jak dwa te same menu. Zmieniona została forma drugiego bloku,
nie jego istnienie ani treść.

## Ustalenia

| # | Problem | Stan przed | Zmiana | Dlaczego | Ryzyko | Priorytet |
|---|---|---|---|---|---|---|
| G1 | `/galeria` na telefonie po jednym zdjęciu na rząd | kafel 343×457 px; siatka produktowa 18 499 px, dokument 26 973 px (33 ekrany) | siatka 3-kolumnowa na całej szerokości telefonu, kafel kwadratowy, odstęp 4 px | do przycisku pod galerią trzeba było przewinąć 42 pełnoekranowe zdjęcia; kadry z końca listy nie były oglądane | kafel 93–130 px nie pokazuje detalu — rekompensuje to podgląd po dotknięciu, szerszy (345 px) niż dotychczasowy kafel | P1 |
| G2 | Przycisk Wstecz wychodził z galerii zamiast zamknąć podgląd | nasłuch `popstate` istniał, ale otwarcie podglądu nie dokładało wpisu do historii | `pushState` przy otwarciu, `history.back()` przy zamykaniu | na telefonie Wstecz jest podstawowym gestem wyjścia z podglądu | brak — sprawdzone dla Wstecz, „✕", tła, Escape i gestu | P1 |
| G3 | Zamknięcie podglądu cofało o dwa wpisy | przycisk „✕" nie zatrzymywał propagacji, więc `close()` wchodziło dwa razy (przyciski strzałek miały `stopPropagation` od początku) | `stopPropagation` + blokada `closingRef` | bez tego G2 wyrzucał ze strony; przed G2 błąd był niewidoczny, bo podwójne czyszczenie stanu nic nie psuło | brak | P0 (wprowadzony i zamknięty w tej sesji) |
| G4 | Fokus po zamknięciu nie wracał na kafel | zapamiętywany był węzeł DOM, a zamknięcie przez `popstate` odpala ponowne renderowanie routera i odpina ten węzeł | zapamiętywany indeks kafla + dwie próby w kolejnych klatkach | dostępność klawiaturowa | brak — sprawdzone realnym kliknięciem i Escape | P1 |
| G5 | Gest przesunięcia liczony tylko w poziomie | próg 50 px na osi X, więc przesunięcie po skosie przeskakiwało kadr | decyduje oś dominująca; w dół (>80 px) zamknięcie | przypadkowa zmiana kadru przy przewijaniu palcem | brak | P2 |
| G6 | `sizes` przeszacowane na telefonie | przy 430 px i DPR 2 kadr 3:2 potrzebował 390 px i pobierał wariant 640 px, czyli 2,8× więcej powierzchni obrazu, niż widać | osobny mnożnik kadrowania dla kafla kwadratowego, z zapasem 0,97 | po zmianie serwowany jest wariant 384 px | brak | P2 |
| U1 | Dwa bloki usług o tej samej formie | kolaż w hero: 4 zdjęcia z nazwami usług → 4 adresy `/uslugi/*`; sekcja `#uslugi`: 4 zdjęcia na pełną szerokość z nazwami → te same 4 adresy; między nimi 200 px | na telefonie karta usługi staje się pozioma: miniatura 132 px obok tytułu i opisu | hero zostaje przy fotografii, sekcja przy wyjaśnieniu; wzorzec wzięty z `Portfolio.tsx`, układ zaakceptowany 13.09.2026 | zdjęcie usługi jest mocniej przycięte niż dotąd | P1 |

## Weryfikacja wizualna 22.09.2026 (druga tura)

### Breakpoint 320–359 px: korekta wcześniejszej decyzji

Pierwsza wersja schodziła poniżej 360 px do dwóch kolumn. Uzasadnienie brzmiało
„przy trzech kafel schodzi do 93 px i zdjęcie przestaje być czytelne nawet jako
miniatura". **Zrzuty obu wariantów przy 320 px tej tezy nie potwierdzają.** Przy 93 px
rozpoznawalne są twarz, strój, poza, tło i rodzaj kadru; rząd czyta się jak arkusz
stykowy. Teza była napisana z rachunku, nie z obejrzenia.

Dwa kolumny miały za to wadę, której nie zauważyłem przy pierwszym podejściu:

| Szerokość | 2 kolumny poniżej 360 | 3 kolumny na całym zakresie |
|---|---|---|
| 320 px | 142 px, 4 kafle widoczne | 93 px, 9 kafli |
| 360 px | 107 px, 9 kafli | 107 px, 9 kafli |
| 390 px | 117 px, 9 kafli | 117 px, 9 kafli |
| 430 px | 130 px, 12 kafli | 130 px, 12 kafli |

Przejście 320 → 360 odwracało zależność: ekran rósł o 12%, a kafel malał o 25%.
Trzy kolumny na całym zakresie dają ciąg rosnący. Wdrożone: `grid-cols-3` bez progu.

### Strona główna przy 390 px: taksonomia pada PIĘĆ razy, nie trzy

Przebieg obejrzany w czterech zrzutach od hero do portfolio:

1. `h2` „LUDZIE. WYDARZENIA. OBIEKTY. PRODUKTY." — cztery obszary, największy stopień pisma na stronie
2. kolaż w hero — te same cztery obszary jako zdjęcia z podpisami, linkujące do `/uslugi/*`
3. podtytuł „**Cztery obszary**, w których pomagam firmom" — nazwane wprost po raz trzeci
4. cztery karty usług — te same cztery obszary, zdjęcia z tych samych folderów co kolaż
5. karty portfolio z nadtytułami „WYDARZENIA", „LUDZIE", „OBIEKTY · LUDZIE · PRODUKTY"

Zdjęcia w punktach 2 i 4 są RÓŻNE, ale pochodzą z tych samych kategorii
(`portrety/`, `eventy/`, `wnetrza/`+`dron/`, `produktowe/`), więc niosą ten sam komunikat
o zakresie usług, tylko na innym przykładzie.

### Poprawka z pierwszej tury przeniosła kolizję, nie usunęła jej

Karta pozioma rozwiązała podobieństwo do kolażu w hero, ale **upodobniła sekcję usług
do sekcji portfolio**, która używa tego samego wzorca (miniatura po lewej, tytuł i opis
po prawej). Na zrzucie przy scrollY 2150 ostatnia karta usługi i pierwsza karta
realizacji różnią się wyłącznie nadtytułem i kolorem linku.

To nie jest wada stylowania kart. W pierwszych 2 600 px stoją **trzy bloki kart
ze zdjęciami**, a kształtów kart jest mniej niż bloków. Dopóki wszystkie trzy niosą
zdjęcia, każdy układ będzie z którymś z pozostałych rymował.

## Trzecia tura: sekcja usług jako indeks tekstowy (zgoda Marcina 22.09.2026)

Reguła z 06.07.2026 („zdjęcia usług zawsze widoczne na mobile") **zniesiona wyraźną
zgodą Marcina**. Uzasadnienie: tamta decyzja zapadła, zanim hero dostało klikalny kolaż
z nazwami usług (14.09.2026), więc karty były wtedy jedynym miejscem, gdzie zdjęcia
czterech obszarów były na telefonie widoczne. Dziś stoją 400 px wyżej i są większe.

### Co zostało zrobione

Na telefonie sekcja `#uslugi` przestaje być blokiem kart, a staje się indeksem:
numer z `servicePillars`, nazwa usługi, strzałka przy prawej krawędzi, opis, cienka
linia. Bez tła, obrysu, zaokrągleń i ikon. **Od `sm` w górę siatka 2×2 ze zdjęciami
wraca bez zmian.**

Zachowane w całości: cztery `h3`, cztery linki `/uslugi/*`, cztery `data-cta`,
cztery opisy (tekst SEO), CTA `wycena_home_uslugi`.

### Desktop sprawdzony osobno, zostaje bez zmian

Przy 1440 px problem nie występuje w tym samym stopniu i mechanizm jest inny:

- podpisy kolażu w hero są ukryte do najechania kursorem (`[@media(hover:hover)]`),
  więc kolaż czyta się jako fotografia, a nie jako menu usług
- kolaż stoi w prawej kolumnie hero, obok tekstu, nie pod nim, więc nie tworzy
  sekwencji „wybierz usługę → wybierz usługę"
- karty portfolio stoją w czterech wąskich kolumnach, a usługi w dwóch szerokich,
  więc te dwa bloki nie rymują ze sobą

Jedyna zmiana widoczna na komputerze to usunięty podtytuł (−65 px).

### Podtytuł: usunięty, nie zastąpiony

`h2` „Czym mogę pomóc Twojej firmie" stoi teraz sam. Kandydaci odrzuceni:

| Kandydat | Dlaczego odpadł |
|---|---|
| „Zdjęcia i film robię w jednym dniu zdjęciowym" | w `services.tsx` potwierdzone wprost tylko dla dwóch z czterech usług, więc jako zdanie zbiorcze obiecuje za dużo |
| „W każdym z tych obszarów robię zdjęcia i film" | powtarza „Foto · Wideo · Dron" i „realizacje foto i wideo" z hero |
| „Prowadzę całą realizację sam, od rozmowy do plików" | powtarza trzeci punkt `TrustLine`, 400 px wyżej |
| „Zakres ustalam przed podaniem ceny" | powtarza zdanie pod siatką („Każdy projekt wyceniam indywidualnie…") |

`sprawdz_tekst.py` na `src/components/Services.tsx`: 0 błędów, 0 do sprawdzenia.

### Koszt, którego nie udało się uniknąć

Zdjęcia kart są na telefonie `display:none`, ale **Chrome i tak je pobiera**: obraz
`loading="lazy"` bez pudełka nie ma czego obserwować, więc ładuje się od razu.
Zmierzone przy 390 px: 55,7 KB na cztery pliki. To nie jest pogorszenie wobec stanu
sprzed sesji, bo wtedy pobierały się te same pliki i były pokazywane. Zejście niżej
wymagałoby komponentu klienckiego albo ręcznego `<picture>`; za 55 KB nie warto.
`sizes` wymusza najmniejszego dostępnego kandydata (384 px): dopóki w `sizes` stoi
jakikolwiek `vw`, Next odcina listę na `deviceSizes[0] × najmniejszy vw`.

### Liczby przed i po, telefon 375 px

| Miara | Przed sesją | Po |
|---|---|---|
| początek `#uslugi` | 1 302 px | 1 302 px |
| wysokość `#uslugi` | 1 937 px | **976 px** |
| początek `#portfolio` | 3 239 px | **2 278 px** |
| wysokość dokumentu | 12 699 px | 11 738 px |

## Czego świadomie nie zrobiono

**Nie usunięto żadnego z dwóch bloków usług.** Wariant B (usunięcie kolażu) zabiera
z pierwszego ekranu fotografię, czyli jedyny dowód, jaki ma fotograf. Wariant C
(usunięcie sekcji `#uslugi`) zabiera cztery opisy usług, cztery mierzone `data-cta`
i CTA do formularza. Wariant D (pasek tekstowy) zamienia zdjęcia na słowa.

~~**Nie zmieniono ani jednego zdania widocznego dla użytkownika.**~~ **Nieaktualne
po trzeciej turze:** podtytuł sekcji usług został usunięty za zgodą Marcina, patrz
sekcja wyżej. Poza nim nadal nie ruszono żadnego zdania.

**Nie ruszono trzech kolumn na komputerze** ani żadnego kafla od 640 px w górę.
Sprawdzone: przy 1024 px kafel galerii ma 317,7×397,1 px (4:5), karta usługi 475×316 px (3:2),
czyli dokładnie tyle co przed zmianą.

**Nie ruszono `PortfolioGallery.tsx` ani `ServiceGalleryStrip.tsx`.** Ich galerie liczą
6–12 kadrów i są dowodem dla konkretnej realizacji albo usługi, a nie indeksem.
Zostaje z tego jeden rozjazd do zamknięcia osobno: podgląd na `/galeria` obsługuje dziś
przycisk Wstecz, a tamte dwa nie.

## Liczby przed i po (telefon 375 px)

| Miara | Przed | Po |
|---|---|---|
| `/galeria?kat=produktowe`, wysokość samej siatki | 18 499 px | 1 615 px |
| `/galeria?kat=produktowe`, wysokość dokumentu | 26 973 px | 10 089 px |
| `/galeria?kat=portrety`, wysokość samej siatki | 7 973 px | 690 px |
| Strona główna, wysokość sekcji `#uslugi` | 1 937 px | 1 355 px |
| Strona główna, początek sekcji `#portfolio` | 3 239 px | 2 657 px |
| Strona główna, wysokość dokumentu | 12 699 px | 12 117 px |
| CLS na `/galeria` (telefon, z przewinięciem) | — | 0 |
