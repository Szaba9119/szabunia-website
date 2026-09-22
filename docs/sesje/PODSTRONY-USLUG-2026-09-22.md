# Audyt i przebudowa czterech podstron usługowych

Sesja 22.09.2026. Pomiary z przeglądarki, 390×844 jeśli nie zapisano inaczej.

## Wniosek

Cztery podstrony miały identyczną architekturę i jedną wspólną wadę: **trzy sekcje
opisywały ten sam proces**, a najwcześniejsza z nich stała przed jakimkolwiek zdjęciem.
Zmiana polega na scaleniu ich w jedną, przesunięciu jej za dowód i podniesieniu bloku
autorskiego do jakości sekcji „O mnie" ze strony głównej. Nie dodano ani jednej nowej
sekcji: bilans to minus jedna.

Obie hipotezy dotyczące strony głównej (miniatury zamiast numerów, usunięcie strzałek)
sprawdzone na zrzutach i **odrzucone**. Strona główna bez zmian.

## Stan przed zmianą, wszystkie cztery usługi

Kolejność sekcji była identyczna na każdej podstronie. Wysokości przy 390 px:

| # | Sekcja | Wizerunek | Eventy | Obiekty | Produkt |
|---|---|---|---|---|---|
| 1 | Hero | 1196 | 845 | 1155 | 1172 |
| 2 | LogoBar | 209 | 209 | 209 | 209 |
| 3 | Zastosowania („Kogo/Co fotografuję") | 665 | 749 | 749 | 749 |
| 4 | **Co biorę na siebie** | 435 | 389 | 367 | 389 |
| 5 | Galeria 1 | 993 | 645 | 721 | 1003 |
| 6 | Wideo | — | 435 | 457 | — |
| 7 | Zakres realizacji | 1223 | 1172 | 1201 | 1390 |
| 8 | Galeria 2 | 1175 | 1150 | 804 | 1403 |
| 9 | **Kto to zrobi** | 701 | 701 | 701 | 701 |
| 10 | **Jak wygląda…** (proces) | 700 | 720 | 720 | 642 |
| 11 | Opinia | 583 | 718 | — | 378 |
| 12 | CTA + realizacje | 292 | 294 | 411 | 294 |
| 13 | Jak powstaje wycena | 410 | 410 | 410 | 410 |
| 14 | FAQ | 954 | 1036 | 931 | 869 |
| 15 | Z bloga | 1336 | 1336 | 1358 | 947 |
| 16 | Poradnik | 441 | — | — | — |
| 17 | Kontakt | 1580 | 1580 | 1580 | 1580 |

## Ustalenie kluczowe: „Co biorę na siebie" powtarzała treść

Porównanie zdanie po zdaniu, 22.09.2026:

| Usługa | Fakty powtórzone gdzie indziej | Fakt unikalny |
|---|---|---|
| Wizerunek | mobilne studio, 30 minut, prowadzenie przez pozowanie, to samo światło i retusz, dogrywki dla nieobecnych → **wszystkie pięć** w „Zakresie realizacji", rozstawienie dodatkowo w kroku 2 procesu | brak |
| Eventy | agenda przed eventem → krok 1 procesu; zapis na dwie karty → krok 2 procesu | drugi operator przy dużym wydarzeniu |
| Obiekty | zgody na lot → krok 2 procesu; powietrze, ziemia i wnętrza w jednym wyjeździe → krok 3 procesu | powrót raz w cenie, gdy pogoda uniemożliwi lot |
| Produkt | retusz w cenie, białe tło Allegro/Amazona, zapisane ustawienie światła → „Zakres realizacji" i krok 3 procesu | dostarczenie produktów kurierem do 20×20 cm |

Sekcja stała dodatkowo na ~2 100 px, czyli **zanim klient zobaczył jakiekolwiek zdjęcie**.

## Co zostało zrobione

1. **„Co biorę na siebie" usunięta.** Cztery unikalne fakty przeniesione do kroków procesu
   tej samej usługi (`services.tsx`). Pola `responsibility` i `details` w `servicePillars.ts`
   zostają jako źródło tekstu do maili, bez czytelnika na stronie.
2. **Proces przebudowany na wzorzec ze strony głównej.** Zeszły białe karty pod każdym
   krokiem, gradientowa oś i pionowy łącznik. Zostaje numer w niebieskim kole, cienka linia,
   tytuł, opis. Jeden wzorzec na home i na podstronach.
3. **Fotografia produktowa dostała piąty krok** („Produkty u mnie"). Komponent obsługuje
   3–5 kroków; wariant pięciokrokowy rozkłada się w rząd dopiero od 1024 px, bo przy 768 px
   pięć kolumn dawało 125 px na krok.
4. **„Kto to zrobi" → „Marcin Szabunia".** Zeszła biała karta, portret urósł ze 112/160 px
   do kolumny 3:4, doszło jedno zdanie o doświadczeniu istotnym dla danej usługi.
   Liczby (`TRUST_STATS`) bez zmian, ten sam zestaw na czterech usługach.
5. **Kolejność odwrócona: proces przed autorem.** To kolejność ze strony głównej.
6. **Domknięcie po pierwszej galerii** (`wycena_uslugi_galeria`), tekstem, nie przyciskiem.

## Warianty kolejności, punkt 19 briefu

| Wariant | Werdykt |
|---|---|
| oferta → portfolio → **O mnie** → proces → CTA (stan przed) | odrzucony: po galerii użytkownik pyta „co się stanie, kiedy napiszę", nie „kim jest ten człowiek" |
| oferta → portfolio → **proces** → O mnie → CTA | **wybrany**: autor domyka wątek „komu to powierzam" tuż przed CTA, i to jest kolejność ze strony głównej |
| oferta → **proces** → portfolio → O mnie → CTA | odrzucony: u fotografa organizacja pracy interesuje dopiero tego, kto uwierzył w zdjęcia |

## Strona główna: obie hipotezy odrzucone

**Miniatury 56 px zamiast numerów 01–04.** Prototyp obejrzany przy 390 px. Przy 56 px kadr
eventowy i wnętrze są szarą plamą, packshot ciemną plamą, więc miniatura nie rozpoznaje
kategorii, a tylko ją dekoruje. Dokładnie te same cztery kategorie stoją 400 px wyżej
w kolażu hero, w rozmiarze czytelnym. Dodatkowo miniatura po lewej odtwarza wzorzec kart
portfolio niżej, czyli wraca rym usunięty poprzednią turą. Sekcja rosła o 39 px.

**Strzałki usunięte.** Bez nich sekcja jest w całości granatowo-szara i nic nie sygnalizuje,
że wiersze są klikalne; na dotyku nie ma hoveru, który mógłby to nadrobić. Sprawdzony
zamiennik (nazwa usługi w kolorze linku) działa, ale stawia cztery niebieskie nagłówki
obok niebieskiego przycisku CTA w jednym ekranie. Strzałka 13 px jest lżejsza. Zostaje.

## „Poznaj usługę": sprostowanie

Ten odsyłacz **nie występuje na żadnej podstronie usługi**. Sprawdzone w kodzie i w DOM
wszystkich czterech. Żyje w czterech miejscach i w każdym prowadzi z materiału do oferty,
czyli we właściwą stronę:

| Miejsce | Kierunek |
|---|---|
| `/galeria` (`GalleryView`) | kategoria galerii → usługa |
| `/uslugi` (hub) | kafel → podstrona usługi |
| `/blog/[slug]` | wpis → usługa |
| `/portfolio/[slug]` (`serviceLink`) | case study → usługa |

Na podstronach usług pod galeriami stoją za to odsyłacze do **innych** usług
(np. „Zobacz wizerunek firmy" na evencie), czyli cross-sell. Nic do poprawienia.

## Liczby po zmianie, 390 px

| Miara | Wizerunek przed | Wizerunek po |
|---|---|---|
| Początek pierwszej galerii | 2 504 px | **2 070 px** |
| Proces | 6 596 px | 5 634 px |
| Blok autorski | 5 895 px | 6 382 px |
| Wysokość dokumentu | 13 610 px | 13 665 px |

Strona nie skróciła się i to jest świadome: zeszła sekcja 435 px, ale blok autorski urósł
o 268 px (większy portret), proces o 49 px (wchłonięte fakty), doszło domknięcie 173 px.
Celem była architektura informacji, nie liczba pikseli.


---

# Druga tura kontroli, 22.09.2026 (po uwagach Marcina)

## Sekcja autora streszczała proces

Pierwsza wersja zdań specyficznych dla usługi była dokładnie tym błędem, przed którym
Marcin ostrzegł. Powtórzenia zdanie po zdaniu:

| Usługa | Co powtarzało |
|---|---|
| wizerunek | „prowadzę przez ustawienie i mimikę" = krok 3 procesu; „to samo światło i ten sam retusz" = „Zakres realizacji" |
| eventy | „żeby nikt mnie nie zauważył" = krok 2; „znam agendę" = krok 1; „drugi operator" = krok 2 |
| obiekty | „zgody na lot przed potwierdzeniem daty" = krok 2 dosłownie; „nie wyglądać jak wizualizacja" = „Zakres" |
| produktowa | „zapisuję ustawienie" = krok 3; „retusz i tło zgodne z wymogami platform" = krok 4 |

Wszystkie cztery przepisane na **opublikowane dorobki**, czyli argument biograficzny,
nie operacyjny. Dwie usługi zostały bez zdania specyficznego, bo żaden uczciwy argument
nie był jednocześnie prawdziwy, nieoperacyjny i niepowtórzony na tej samej podstronie.

## Trzy fakty scalone niepotrzebnie, cofnięte

Przy pierwszym scaleniu przeniosłem do procesu fakty, które już stały w „Zakresie
realizacji". Sprawdzenie było wadliwe: czytałem tylko pierwsze 850 znaków tamtej sekcji.

| Usługa | Fakt | Gdzie już był | Status |
|---|---|---|---|
| wizerunek | prowadzenie przez pozowanie | Zakres, „Portrety biznesowe" | cofnięte |
| produktowa | zapisane ustawienie światła | Zakres, „Packshoty na białym tle" | cofnięte |
| produktowa | białe tło Allegro/Amazona | Zakres, „Packshoty na białym tle" | cofnięte |
| produktowa | kurier do 20×20 cm | Zakres, pozycja **Logistyka** | cofnięty piąty krok, wraca do czterech |

**Wniosek, który zmienia wcześniejszą ocenę:** z sekcji „Co biorę na siebie" trzeba było
uratować **dwa** fakty, nie cztery. Drugi operator (eventy) i powrót przy złej pogodzie
(obiekty) faktycznie nie miały innego miejsca. Pozostałe dwa miały.

## Pomiar kolizji po poprawkach

Porównanie czterowyrazowych fraz między sekcjami „proces", „Marcin Szabunia",
„Zakres realizacji" i zastosowania, na renderze przy 390 px:

| Podstrona | Kolizje |
|---|---|
| wizerunek | 1, ale „zakres ↔ zastosowania" („ludzie przy pracy przestrzeń"), sprzed tej sesji |
| eventy | 0 |
| obiekty | 0 |
| produktowa | 0 |

Proces ↔ autor: **zero kolizji na wszystkich czterech**.

Powtórzenia między procesem a FAQ zostają świadomie: FAQ jest powierzchnią wyszukiwania,
a nie konkurencyjnym miejscem opowiadania („Co jeśli pogoda nie dopisze?" na obiektach,
drugi operator w FAQ eventów). Obie odpowiedzi istniały przed tą sesją.


---

# Trzecia tura: dwie korekty copy (22.09.2026)

## Portret 2022 zdjęty z podstrony wizerunkowej

Sprawdzone źródło: `01_Biznes/_System/04_Sprzedaz/klienci_registry.md:311` opisuje to
wyróżnienie wprost jako **„social proof ARTYSTYCZNY"**. Podstrona wizerunkowa sprzedaje
headshoty i sesje zespołowe, więc nagroda za portret artystyczny nie dowodzi kompetencji,
o którą pyta ten klient. Zgodnie z zasadą „brak zdania jest lepszy niż słaby dowód"
usunięte. Fakt zostaje tam, gdzie pasuje: `About.tsx`, `public/llms.txt` i `award`
w JSON-LD (`layout.tsx:377`) — tych nie ruszano.

**Zostaje jedno zdanie specyficzne, na eventach** (Forte / Big Furniture Group Magazine),
bo jego źródło jest potwierdzone linkiem do wydania w `Publications.tsx`.

## Wspólne zamknięcie przestało mówić o ofercie

Było: „Odpowiadam za plan i jakość zdjęć, filmu oraz ujęć z drona. Dostajesz jeden termin,
jedną fakturę i spójny materiał."

Dwa problemy. Wyliczenie „zdjęć, filmu oraz ujęć z drona" jest nieprawdziwe jako
uniwersalne: na produktowej i wizerunkowej dron nie ma związku z intencją klienta.
„Jeden termin, jedna faktura" to argument za realizacją hybrydową, czyli **zakres**,
a nie powód do zaufania.

Jest: „Pod marką SZABUNIA odpowiadam za kontakt, plan i jakość realizacji." — formuła
z `About.tsx`, mówi o roli i odpowiedzialności. Zgodna z zakazem z 10.08.2026 (wolno
komunikować Marcina jako główny kontakt i osobę odpowiedzialną, nie wolno sugerować,
że wykonuje każdą produkcję sam).

## Finalny stan sekcji „Marcin Szabunia"

| Usługa | Akapity |
|---|---|
| wizerunek | wspólny + odpowiedzialność |
| eventy | wspólny + **Forte / BFG** + odpowiedzialność |
| obiekty | wspólny + odpowiedzialność |
| produktowa | wspólny + odpowiedzialność |

Słowo „dron" nie występuje w tej sekcji na żadnej z czterech podstron.
