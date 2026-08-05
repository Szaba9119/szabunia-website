# Paczka do wklejenia — wizytówka Google, 5 sierpnia 2026

Faza 0 promptu `PROMPT-POPRAWKI-WIZYTOWKA-2026-08-05.md`. Wszystko gotowe do wklejenia
albo do wykonania przeze mnie w panelu. Kwoty pochodzą z `src/data/services.tsx`
(drzewo czyste, HEAD `f5dd9f4`), nie z pamięci i nie z opisów na wizytówce.

---

## 1. Link witryny z UTM (WIZ2608-03)

Pole: **Edytuj profil → Kontakt → Witryna**

```
https://szabunia.pl/?utm_source=google&utm_medium=organic&utm_campaign=gbp
```

Adresy docelowe produktów, ten sam schemat plus `utm_content`:

| Produkt | URL |
|---|---|
| Obsługa eventów firmowych | `https://szabunia.pl/uslugi/eventy-reportaze?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=eventy` |
| Sesje zespołowe | `https://szabunia.pl/uslugi/sesje-zespolowe?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=sesje-zespolowe` |
| Wizerunek i portrety | `https://szabunia.pl/uslugi/wizerunek-portrety?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=wizerunek` |
| Wideo marketing | `https://szabunia.pl/uslugi/wideo-marketing?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=wideo` |
| Fotografia produktowa | `https://szabunia.pl/uslugi/fotografia-produktowa?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=produkt` |
| Zdjęcia i wideo z drona | `https://szabunia.pl/uslugi/zdjecia-wideo-z-drona?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=dron` |
| Pakiety Foto + Wideo + Dron | `https://szabunia.pl/uslugi/pakiety-foto-wideo?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=pakiety` |

Po tygodniu w GA4: Pozyskiwanie → sesje wg źródła/medium, szukasz `google / organic`
z kampanią `gbp`.

---

## 2. Ceny do pola „Cena produktu (PLN)" (WIZ2608-04)

⚠ **Tu potrzebuję Twojego jednego słowa, bo to komunikat cenowy do klienta.**

Pole ceny w produkcie Google wyświetla samą kwotę, na przykład „600,00 zł", i **nie ma
w nim miejsca na słowo „netto"**. Dziś kwota siedzi w pierwszym zdaniu opisu („Od 600 zł
netto…"), czyli klient widzi ją dopiero po kliknięciu, ale za to z właściwym oznaczeniem.

| Produkt | Kwota do pola | Źródło |
|---|---|---|
| Obsługa eventów firmowych | 600 | `services.tsx:158` |
| Sesje zespołowe | 1400 | `services.tsx:212` |
| Wizerunek i portrety | 700 | `services.tsx:328` |
| Wideo marketing | 400 | `services.tsx:408` |
| Fotografia produktowa | 600 | `services.tsx:459` |
| Zdjęcia i wideo z drona | 700 | `services.tsx:526` |
| Pakiety Foto + Wideo + Dron | 2100 | `services.tsx:270` |

- **A. Wpisać kwoty.** Zysk: kwota widoczna od razu na kafelku, filtruje zapytania bez budżetu.
  Koszt: klient B2C może przeczytać ją jako brutto. Odwracalne (wyczyszczenie pola).
- **B. Zostawić pola puste.** Zysk: zero ryzyka pomyłki netto/brutto. Koszt: siedem kafelków
  bez ceny w jedynej sekcji ofertowej, która renderuje się w wynikach.
- **C. Nie robić nic** i wrócić do tematu po rozstrzygnięciu H1.

Rekomendacja: **A**. Kupujący B2B domyślnie czyta kwoty jako netto, a opis prostuje to
w pierwszym zdaniu. Ale to Twoje pieniądze i Twoja komunikacja, więc nie ruszam bez „ok".

---

## 3. Opis firmy w nowej kolejności (WIZ2608-09)

Pole: **Edytuj profil → Informacje → Opis**. Te same fakty, żadnej nowej liczby,
639 znaków (identycznie jak dziś), zero długich myślników.

```
Fotograf biznesowy i twórca wideo w Poznaniu. Specjalizacja: obsługa eventów firmowych, sesje zespołowe, portrety na LinkedIn, wideo wizerunkowe. Na rynku od 2018 roku: 250 000+ zdjęć, 1000+ sesji, 100+ obsłużonych marek, w tym H&M, Santander, John Deere. Po studiach z zarządzania rozumiem nie tylko kadr, ale i biznesowy cel zdjęć. Wyróżniony w konkursie Portret 2022, autor okładki brytyjskiego Big Furniture Group Magazine, kwiecień 2026 (sesja dla Grupy Forte). Współpracowałem też z Warner Music Poland, IQOS, Amica i Centrum Posnania. Wycena w 24h, zdjęcia w 14 dni, wideo w 21 dni. Obsługa: Poznań, cała Polska, Europa na życzenie.
```

Zmiana: pierwsze sto znaków mówi teraz, co robisz (eventy firmowe, sesje zespołowe,
LinkedIn, wideo), a nie od kiedy. Metryka schodzi do zdania trzeciego.

---

## 4. Odpowiedź na opinię Michała Jadczaka (WIZ2608-07)

Opinia: 5 gwiazdek, bez treści, Lokalny przewodnik, ok. 24.06.2026, jedyna bez odpowiedzi.

```
Dziękuję za pięć gwiazdek. Jeśli mieliśmy okazję razem pracować, chętnie dowiem się, co się sprawdziło. Gdyby coś wymagało poprawki, proszę o wiadomość. Marcin
```

Bez udawania, że wiadomo za co, bo opinia nie ma treści.

---

## 5. Miniatury produktów (WIZ2608-05, po korekcie)

**Najpierw korekta mojego własnego findingu.** W audycie napisałem, że pięć z siedmiu
miniatur nie pasuje do usługi. Po obejrzeniu plików źródłowych: **„Sesje zespołowe" to
fałszywy alarm** — kafelek używa `public/images/portfolio/sesje-zespolowe-cover.jpg`, czyli
tej samej okładki, którą sam wybrałeś dla tej usługi na stronie, a sesja zespołowa startuje
od dwóch osób, więc dwoje ludzi w kadrze jest poprawne. Podobnie „Wizerunek i portrety"
używa `portret-01-operator-z-kamera.jpg` z Twojej galerii portretów, więc to portret,
tylko komunikujący branżę kreatywną, nie zarząd. Zostają trzy kafelki do wymiany
plus jeden do Twojej oceny.

Pliki gotowe, przygotowane z Twoich zdjęć (bez kadrowania, tylko zmniejszenie do 1600 px):

| Produkt | Co jest dziś | Co proponuję | Plik |
|---|---|---|---|
| Obsługa eventów firmowych | scena koncertowa w czerwonym świetle | gala Santandera, wręczanie wyróżnień | `produkt-obsluga-eventow-firmowych.jpg` |
| Wideo marketing | kreacja z wklejonym napisem „Co ogranicza Twój sklep?" | kadr z filmu z hali Artech, obróbka CNC | `produkt-wideo-marketing.jpg` |
| Fotografia produktowa | rozmyty kadr z kieliszkami pod niebo | packshot Amarula | `produkt-fotografia-produktowa.jpg` |
| Wizerunek i portrety *(Twoja ocena)* | operator z gimbalem, T-shirt | portret z sesji IDcom, marynarka, beżowe tło | `produkt-wizerunek-i-portrety.jpg` |
| Fotografia produktowa *(wariant)* | | drink na pomarańczowym tle, z packshotów | `produkt-fotografia-produktowa-ALT.jpg` |
| Sesje zespołowe | okładka z Twojej strony | **zostaje** | |
| Zdjęcia i wideo z drona | budynek z powietrza | **zostaje** | |
| Pakiety Foto + Wideo + Dron | kadr z wydarzenia | nie oceniałem, kafelek był poza ekranem | |

Uwaga do kadru z Artechu: ma w rogu drobny podpis „Artech, film z hali produkcyjnej".
Jeśli wolisz kafelek bez żadnego tekstu, wskaż inny kadr z tego filmu.

---

## 6. Wpisy (WIZ2608-11)

Trzy gotowe, do publikacji co 10–14 dni. Fakty wyłącznie z case studies i danych usług
w repo, żadnej liczby wymyślonej.

**Wpis 1, do publikacji od razu**

```
Dla IDcom Group, poznańskiego software house'u tworzącego rozwiązania IT dla samorządów i biznesu, zrealizowałem sesję zespołową na trzech tłach: białym, czarnym z niebieskim światłem i kremowym. Każda osoba ma komplet kadrów w jednym standardzie światła i retuszu, więc firma dobiera klimat do miejsca, w którym zdjęcie ma stanąć, zamiast wracać do studia.
```

**Wpis 2, za 10–14 dni**

```
Mobilne studio rozstawiam w sali konferencyjnej albo na korytarzu. Potrzebuję około 5 m² i gniazdka, rozstawienie zajmuje 30 minut, a każda osoba jest w kadrze od 5 do 15 minut. W jeden dzień da się sfotografować do 40 osób, wszystkie w tym samym świetle i retuszu. Osoby nieobecne dogrywam w krótszym terminie, w tym samym standardzie.
```

**Wpis 3, kolejne 10–14 dni**

```
Ujęcia z powietrza do materiałów firmowych: budynek, hala, plac manewrowy, teren inwestycyjny. Latam dronem DJI Mini 5 Pro, mam certyfikat operatora A1/A3 i ubezpieczenie OC, a w strefach kontrolowanych uzyskuję zgody przed lotem. Zdjęcia z powietrza i przebitki 4K powstają w jednej sesji.
```

---

## 7. Usługa dronowa w kategorii „Fotograf" (WIZ2608-08)

Dziś dron istnieje wyłącznie jako „Filmowanie z powietrza" w kategorii Wideofilmowanie.
W kategorii Fotograf szukamy w liście Google pozycji typu „fotografia lotnicza"
albo „zdjęcia z drona". Jeśli taksonomia jej nie ma, wchodzi usługa własna:

- Nazwa: **Zdjęcia z drona**
- Cena: **700**
- Opis:

```
Zdjęcia z powietrza dla firm: budynki, hale, place manewrowe i tereny inwestycyjne. Od 700 zł netto. Dron DJI Mini 5 Pro, certyfikat operatora A1/A3, ubezpieczenie OC. W strefach kontrolowanych uzyskuję zgody przed lotem. Materiały w 14 dni. Faktura VAT.
```

Przy okazji: „Wideo wizerunkowe / film o firmie" wisi dziś w kategorii Fotograf, a trzy
pozostałe pozycje wideo w Wideofilmowaniu. Przeniesienie jest kosmetyczne i odwracalne.

---

## 8. Czego w tej paczce nie ma i dlaczego

- **15–20 nowych zdjęć do galerii profilu.** Wybór materiału to Twoja robota, nie moja.
  Mogę przygotować kandydatów z `public/images/galeria/`, jeśli powiesz, w jakich proporcjach
  (eventy, hale, zespoły, produkt).
- **Kampania po opinie.** Maili nie wysyłam. Mogę napisać treść prośby.
- **Cokolwiek z §12 raportu** (nazwa, kategoria, obszar, czat SMS, Facebook). To decyzje.
- **Weryfikacja H1.** Wymaga Twojego telefonu.
