# Nagłówki i opisy w Google + realne dane GSC — 2026-07-30

Co szabunia.pl pokazuje w wynikach wyszukiwania, na jakie frazy, i gdzie to naprawdę stoi.

**Źródła:** kod repo (`src/app/**`, `src/data/*`) + dwa eksporty Google Search Console:
`~/Downloads/szabunia-2/` (3 miesiące, realnie 2026-06-10 → 2026-07-27, 48 dni z danymi)
i `~/Downloads/szabunia-3/` (7 dni, 2026-07-21 → 2026-07-27)
+ słowa kluczowe z `05_Strona_WWW/ads/HANDOFF-google-ads-marcin.md` (2026-06-09).

---

## 0. Liczby na wejściu

| Metryka | Wartość |
|---|---|
| Wyświetlenia (3 miesiące) | 2 299 |
| Kliknięcia | 23 |
| CTR | 1,08% |
| Średnia pozycja | **22,26** |
| Polska | 23 klik / 2 137 wyśw. (96% wyświetleń) |
| Komputer / mobile | 1 743 / 551 wyświetleń |
| Pierwszy dzień z danymi | **2026-06-10** |

Dwie rzeczy, które trzeba przyjąć przed czytaniem reszty:

**Dane mają 7 tygodni, nie 3 miesiące.** Do 09.06 zero wyświetleń, potem start.
Property jest młode po migracji domeny. Każda pozycja w tym zestawie jest tymczasowa
i nie ustabilizowana.

**Średnia pozycja 22,26 oznacza trzecią stronę wyników.** To jest cały mechanizm zera
kliknięć. Na pozycji 25 typowy CTR to 0,1-0,3%. Przy 2 300 wyświetleniach daje to
2-7 kliknięć oczekiwanych, masz 23. Czyli klikalność jest **lepsza** niż średnia dla
tych pozycji, nie gorsza.

### Korekta tego, co napisałem wcześniej

W pierwszej wersji tego dokumentu postawiłem na pierwszym miejscu ucinanie „Poznań"
w tytule strony głównej i powiązałem to z wydatkiem 1 279 zł na `fotograf poznań` w Ads.
**Realne dane tego nie potwierdzają jako priorytetu.** Strona główna ma 564 wyświetlenia
na pozycji 10,01 i CTR 2,66%, czyli mniej więcej tyle, ile się na pozycji 10 należy.
A `fotograf poznań` organicznie stoi na **pozycji 106** przy 6 wyświetleniach. Tam nie ma
problemu z tytułem, tam nie ma rankingu w ogóle.

Ucinanie tytułów jest realne (sekcja 4) i warto je posprzątać, ale to kosmetyka. Wąskim
gardłem jest pozycja, nie tekst w SERP-ie. Przepisanie tytułu strony, która stoi na
28 pozycji, nie da nic.

---

## 0.5. Okno 7-dniowe (21-27.07) vs średnia 48 dni

### Uwaga metodyczna: ten eksport nie pokazuje efektu ostatnich poprawek

Eksport „ostatnich 7 dni" kończy się **2026-07-27**, dokładnie tak samo jak eksport
3-miesięczny. GSC finalizuje dane z 2-3 dniowym opóźnieniem, a preset „ostatnie 7 dni"
odcina najświeższe dni. **Nie ma tu ani jednego dnia po 27.07**, więc czegokolwiek
zmienionego 28-30.07 w tych plikach nie widać. Żeby zobaczyć efekt zmian z końca lipca,
eksport trzeba powtórzyć około 2-3.08.

### Ruch rośnie, kliknięcia spadają

| | 48 dni (10.06-27.07) | 7 dni (21-27.07) |
|---|---|---|
| Wyświetlenia / dzień | 47,9 | **79,6** (+66%) |
| Kliknięcia / dzień | 0,48 | **0,14** (−70%) |
| CTR | 1,00% | 0,18% |
| Średnia pozycja | 22,26 | 20,73 |

### Przyczyna spadku kliknięć jest jedna: strona główna zeszła z pierwszej strony

Strona główna: pozycja **10,01 → 11,83**, CTR **2,66% → 1,12%**. To przejście przez granicę
pierwszej dziesiątki. Strona główna dawała 15 z 23 kliknięć w całym okresie, więc jej zejście
na drugą stronę wyników wystarcza, żeby wytłumaczyć cały spadek. Wyświetlenia strony głównej
przy tym wzrosły (11,75 → 12,71 na dzień), czyli to nie utrata widoczności, tylko utrata
pozycji klikalnej.

### Pozycje w obu klastrach priorytetowych poprawiają się same

| Zapytanie | poz. 48 dni | poz. 7 dni | Zmiana |
|---|---|---|---|
| fotograf biznesowy poznań | 20,00 | **11,08** | +8,9 |
| packshot poznań | 24,66 | **17,80** | +6,9 |
| packshoty poznań | 32,15 | 20,33 | +11,8 |
| fotografia produktowa poznan | 40,14 | 26,64 | +13,5 |
| fotografia produktowa poznań | 37,56 | 28,88 | +8,7 |
| zdjęcia katalogowe poznań | 19,35 | **6,00** | +13,4 |
| sesja wizerunkowa koszt | 24,36 | 15,81 | +8,6 |
| ile kosztuje sesja wizerunkowa | 17,37 | 14,65 | +2,7 |
| sesja biznesowa jak się przygotować | 35,28 | 23,30 | +12,0 |
| profesjonalne zdjęcie do cv | 50,20 | 36,40 | +13,8 |
| fotograf poznań | 106,00 | 101,00 | bez znaczenia |

Na poziomie stron: `/blog/ile-kosztuje-sesja-wizerunkowa-dla-firmy` 25,66 → 21,91 przy
wzroście wyświetleń o 145%, `/uslugi/fotografia-produktowa` 28,26 → 23,82 przy +30%,
`/blog/jak-przygotowac-sie-do-sesji-biznesowej` 34,20 → 26,68 przy +129%.

**Wniosek: priorytety 1 i 2 z sekcji 7 idą w dobrą stronę bez interwencji.** Domena nabiera
siły po migracji. To argument za cierpliwością, nie za przebudową.

### Nowy problem: strona portretowa zapadła się o 28 pozycji

| Strona | poz. 48 dni | poz. 7 dni | Zmiana |
|---|---|---|---|
| `/uslugi/wizerunek-portrety` | 17,74 | **45,62** | **−27,9** |
| `/uslugi/eventy-reportaze` | 13,42 | **33,00** | **−19,6** |
| `/blog` | 18,80 | 33,33 | −14,5 |
| `/blog/co-zalozyc-na-sesje-biznesowa` | 30,54 | 44,00 | −13,5 |
| `/blog/fotografia-eventowa-vs-reportaz` | 29,93 | 37,40 | −7,5 |

`/uslugi/wizerunek-portrety` to flagowa strona najważniejszej linii usług. Jednocześnie
`fotograf biznesowy poznań` poprawił się do pozycji 11,08, a strona główna stoi na 11,83.
**Prawdopodobne wyjaśnienie: Google przełączył stronę docelową dla tej frazy z podstrony
usługi na stronę główną.** Liczby się zgadzają, ale to inferencja, nie fakt: eksport nie
łączy zapytań ze stronami. Do potwierdzenia w GSC przez filtr po stronie
`/uslugi/wizerunek-portrety` i sprawdzenie, jakie zapytania jej zostały.

Jeśli tak jest, skutek jest realny: klient szukający portretu biznesowego widzi stronę
główną, która mówi o wszystkim po trochu, a nie stronę usługi z konkretem (headshoty,
mobilne studio w biurze, kotwica od 1 100 zł).

Spadki wyświetleń na stronach usługowych w tym samym oknie: `/kontakt` −86%,
`/uslugi/pakiety-foto-wideo` −88%, `/uslugi/wideo-marketing` −79%, `/uslugi/sesje-zespolowe` −60%.

### Problem CTR na słowniku wideo potwierdzony świeżymi danymi

`/blog/slownik-pojec-wideo`: pozycja **8,40** (bez zmian), 50 wyświetleń w 7 dni,
**zero kliknięć**. Przez 48 dni: 165 wyświetleń, zero kliknięć. To nie jest przypadek
ani mała próbka. Tytuł i opis tej strony nie zarabiają na swojej pozycji.

---

## 0.6. Google Ads, te same 7 dni (23-29.07)

Kampania została w międzyczasie przebudowana: trzy grupy reklam, dopasowanie do wyrażenia
i ścisłe. To inna struktura niż jedna grupa z Broad opisana w handoffie z 09.06.

| Metryka | 7 dni |
|---|---|
| Wyświetlenia | 270 |
| Kliknięcia | 21 |
| CTR | **7,78%** |
| Koszt | **132,84 zł** |
| Średni CPC | 6,33 zł |
| **Konwersje** | **0,00** |
| Kierowanie | Wielkopolskie, 270/270 wyświetleń |

CTR 7,78% jest dobry. Przebudowa na dopasowanie do wyrażenia zadziałała na trafność.

### Podział budżetu vs realne zapotrzebowanie

| Grupa reklam | Koszt | % budżetu | Klik. | CTR | Odpowiadający klaster w GSC |
|---|---|---|---|---|---|
| Portrety i wizerunek | 112,17 zł | **84%** | 18 | **10,65%** | 376 wyśw. (24%), pozycje rosną |
| Fotografia produktowa | 20,67 zł | 16% | 3 | **3,23%** | **607 wyśw. (39%)**, pozycje rosną |
| Eventy i reportaże | **0,00 zł** | **0%** | 0 | 0% | **31 wyśw. w 3 mies., poz. 13 → 33** |

Trzy rzeczy z tej tabeli:

**1. Linia eventowa nie istnieje w żadnym kanale.** Organicznie 7 wyświetleń w 7 dni
i pozycja spadła z 13,42 na 33,00. W płatnych zero złotych, zero kliknięć, a wszystkie
sześć słów eventowych (`fotograf eventowy`, `fotograf eventowy poznań`, `fotograf na event`,
`fotograf na konferencję`, `fotograf na targi`, `reportaż z konferencji`) ma 0 zł i 0 kliknięć.
W zapytaniach `fotograf eventowy` dostał 3 wyświetlenia. A to najgrubsza usługa w portfelu
(Biofarm: impreza 150-200 osób, woohoo: event na stadionie Lecha).

Część tego to sezon: eventy firmowe kupuje się we wrześniu-grudniu, nie w ostatnim tygodniu
lipca. Ale organiczny spadek z pozycji 13 na 33 sezonem się nie tłumaczy.

**2. Grupa produktowa ma problem z reklamą, nie z zasięgiem.** CTR 3,23% przy 10,65%
w portretach, na tym samym koncie i tym samym kierowaniu. Zapytania produktowe zbierają
około 35 wyświetleń (packshot 5, packshot co to 5, fotografia produktowa 5, packshoty 4,
pack shot 3, fotografia produktowa poznan 3, packshot studio 2, packshotowych 2, packshotów 2)
przy zerze kliknięć. Wyświetlenia są, kliknięć nie ma. To treść reklamy, nie stawka.

Jednocześnie GSC mówi, że packshot i fotografia produktowa to **39% całego zapotrzebowania**
organicznego, największy klaster na stronie. Dostaje 16% budżetu.

**3. Podział 84/16 na korzyść portretów można obronić dwojako i warto to rozstrzygnąć
świadomie.** Czytanie pierwsze: to marnotrawstwo, bo płatne dublują klaster, który
organicznie rośnie. Czytanie drugie: to poprawne, bo `/uslugi/wizerunek-portrety` właśnie
zapadło się z pozycji 18 na 46, więc płatne łatają dziurę. Problem w tym, że ten podział
nie jest niczyją decyzją, tylko wypadkową tego, które słowa się akurat wyświetlają.

### Przeciek: płatne kliknięcie na frazę wykluczoną w maju

`zdjecie biznesowe do cv` — **1 kliknięcie, 6,37 zł**. `cv` jest na liście wykluczeń
z 20.05 w kategorii nieobsługiwanej (handoff, sekcja 8). Zapytanie zawiera `cv` i nie
zostało zablokowane. Do sprawdzenia, czy ~359 wykluczeń przetrwało przebudowę kampanii
i na jakim poziomie są przypisane.

### Nowe zapytania śmieciowe, których nie ma na liście wykluczeń

Konkurenci: `iwaszko fotografia`, `krzysztof zaleski fotograf`, `mana studio`,
`olga hoffman`, `headshot pro`, `packshothouse`, `packshot studio`,
`fotograf biznesowy & headshot leszno jakub lipnicki`.
Nie-klienci: `fotografia produktowa zlecenia` (ktoś szuka pracy jako fotograf),
`zestaw do fotografii produktowej` (ktoś kupuje sprzęt), `packshot co to` (5 wyświetleń,
zapytanie informacyjne), `fotografia biżuterii`.
Wszystkie mają dziś 0 zł, ale każde z nich w końcu kliknie.

### Ryzyko numer jeden: 21 kliknięć, zero konwersji

Wszystkie zapytania mają `Konwersje = 0,00`. To dokładnie ta sama sytuacja, która w maju
uruchomiła zapaść o 38%: algorytm po ~30 dniach bez sygnału konwersji sam obniża wydatek.
Wtedy przyczyną było Adobe Portfolio, które nie pozwalało wpiąć tagu. Teraz strona jest
na Next.js i Vercelu, czyli technicznej przeszkody nie ma, ale konwersje w Ads pozostają
otwartą pozycją, a `CRM_WEBHOOK_URL` i `CRM_WEBHOOK_SECRET` nadal nie są ustawione
na produkcji (CLAUDE.md §8).

21 kliknięć w 7 dni to mało, żeby oczekiwać konwersji. Ale trzeba potwierdzić, że tag
w ogóle mierzy, zanim zabraknie 30 dni.

### Harmonogram: reklamy chodzą 27% tygodnia

Wyświetlenia po godzinach: zero przed 08:00 i zero od 17:00. Sobota i niedziela: zero
wyświetleń i zero kosztu. Czyli okno emisji to 08:00-16:59 od poniedziałku do piątku,
**45 godzin z 168**. Szczyt o 12:00 (47 wyświetleń).

Dla B2B jest to do obrony i prawdopodobnie było celowe. Warto tylko wiedzieć, że osoba
szukająca fotografa dla swojej firmy robi to często wieczorem, a budżet dzienny nie jest
w tym oknie wysycony równo (27.07: 47,03 zł, 28.07: 13,90 zł).

### Demografia: 66% kobiet, i widać to w zapytaniach

Kobiety 110 wyświetleń (66,27%), mężczyźni 56 (33,73%). Wiek 25-44 to 70%.
W zapytaniach: `zdjecie biznesowe kobiece` (4), `sesja biznesowa kobieca` (1),
`sesje biznesowe kobiece` (1), `sesja biznesowa makijazystki` (1).

To nie jest błąd kierowania, to sygnał o rynku: część zapotrzebowania na „sesję biznesową"
to kobiety prowadzące własną działalność, budujące markę osobistą. Nie jest to B2C
okolicznościowe, którego nie robisz, ale nie jest to też korporacyjne HR. Do decyzji,
czy to segment do nazwania na stronie, czy do pominięcia.

### Urządzenia

Komputery: 173 wyświetlenia, 14 kliknięć, 92,12 zł. Telefony: 97 wyświetleń, 7 kliknięć,
40,72 zł. Proporcja zgodna z organiczną (430 / 126 wyświetleń w GSC).

---

## 1. Na jakie frazy co się pojawia (realne dane)

Ważne: eksport GSC daje osobno listę zapytań i osobno listę stron, bez połączenia.
Przypisanie zapytań do stron poniżej wynika ze zgodności tematu i liczb i jest pewne
dla dużych klastrów, ale żeby zobaczyć twarde pary „zapytanie + strona", trzeba w GSC
wejść w konkretną stronę i przełączyć na zakładkę Zapytania.

### Klaster 1: packshot i fotografia produktowa — 607 wyśw. (39% całości), 0 kliknięć

**Strona, która się pojawia:** `/uslugi/fotografia-produktowa` (444 wyśw., poz. **28,26**),
wspierana przez `/blog/co-to-jest-packshot` (160 wyśw., poz. 34,51)
i `/blog/fotografia-produktowa-ecommerce` (111 wyśw., poz. 23,66).

**Tytuł, który widzi użytkownik:** `Packshot i fotografia produktowa — Poznań | Marcin Szabunia`

| Zapytanie | Wyśw. | Pozycja |
|---|---|---|
| packshot poznań | 100 | 24,66 |
| packshot | 94 | 33,13 |
| fotografia produktowa poznań | 79 | 37,56 |
| fotografia produktowa poznan | 63 | 40,14 |
| packshoty poznań | 59 | 32,15 |
| zdjęcie produktu | 26 | 20,88 |
| zdjęcia katalogowe poznań | 20 | 19,35 |
| zdjęcia produktowe poznań | 16 | 40,44 |
| zdjęcie obrotowe produktu | 13 | 27,92 |
| fotografia produktowa torun | 12 | 45,92 |
| + 40 dalszych (packshot definicja/meaning/betekenis, fashion packshot, aplikacja packshot…) | 125 | |

To najmocniejszy klaster na stronie i **nie jest to klaster, na którym stoi biznes**.
Google widzi szabunia.pl jako stronę o packshotach. `packshot poznań` na pozycji 24,66
oznacza: jest zapotrzebowanie, jest strona, brakuje pozycji.

Uwaga na ogon: `packshot definition`, `packshot meaning`, `wat is een packshot`,
`was ist ein packshot`, `packshots betekenis` — to ruch zagraniczny na definicję słowa,
bez wartości handlowej. Stąd 34 wyświetlenia z USA i 16 z Holandii w `Kraje.csv`.

### Klaster 2: ile kosztuje sesja wizerunkowa — 376 wyśw. (24%), 0 kliknięć

**Strona, która się pojawia:** `/blog/ile-kosztuje-sesja-wizerunkowa-dla-firmy`
(241 wyśw., poz. **25,66**), plus `/uslugi/wizerunek-portrety` (117 wyśw., poz. 17,74)
i `/blog/sesja-wizerunkowa-poznan` (61 wyśw., poz. 23,51).

**Tytuł, który widzi użytkownik:** `Ile kosztuje sesja wizerunkowa dla firmy | Marcin Szabunia`

| Zapytanie | Wyśw. | Pozycja |
|---|---|---|
| ile kosztuje sesja wizerunkowa | 54 | 17,37 |
| sesja wizerunkowa koszt | 45 | 24,36 |
| sesja wizerunkowa ile kosztuje | 40 | 18,57 |
| sesja wizerunkowa ceny | 39 | 31,51 |
| fotografia wizerunkowa poznań | 34 | 29,79 |
| sesja wizerunkowa cena | 32 | 36,47 |
| wizerunek profesjonalisty | 25 | 37,16 |
| sesja wizerunkowa cennik | 22 | 38,14 |
| sesja wizerunkowa linkedin | 20 | 44,40 |
| sesja wizerunkowa poznań | 15 | 26,40 |
| fotografia wizerunkowa cennik | 7 | 22,57 |

**To jest klaster z pieniędzmi.** Ktoś, kto wpisuje „ile kosztuje sesja wizerunkowa",
jest w fazie zakupowej. 376 wyświetleń, zero kliknięć, wszystko na pozycjach 17-44.
Jedna strona bloga obsługuje całe zapotrzebowanie.

### Klaster 3: przygotowanie i stylizacja na sesję — 157 wyśw. (10%), 0 kliknięć

**Strony:** `/blog/jak-przygotowac-sie-do-sesji-biznesowej` (150 wyśw., poz. 34,20)
i `/blog/co-zalozyc-na-sesje-biznesowa` (56 wyśw., poz. 30,54).

Zapytania: `sesja biznesowa jak się przygotować` (48+39, dwa warianty zapisu),
`sesja wizerunkowa jak sie przygotowac` (41), `sesja biznesowa stylizacje` (30),
`sesja biznesowa ubior` (13), `sesja biznesowa outfit` (9). Wszystko na pozycjach 30-50.

Intencja przedzakupowa: ktoś już ma sesję zaplanowaną albo się do niej zbiera. To naturalny
odbiorca `/poradnik`, który dziś ma **1 wyświetlenie**.

### Klaster 4: dron — 110 wyśw. (7%), 0 kliknięć, zła geografia

**Strona:** `/uslugi/zdjecia-wideo-z-drona` (113 wyśw., poz. 22,13).

| Zapytanie | Wyśw. | Pozycja |
|---|---|---|
| zdjęcia z drona skawina | 22 | 22,91 |
| foto z drona skawina | 20 | 14,90 |
| zdjęcia z drona łańcut | 20 | 24,00 |
| zdjęcia z drona bochnia | 13 | 29,23 |
| wideo z drona bochnia | 6 | 28,17 |
| ujęcia z drona skawina | 5 | 26,00 |
| foto z drona bochnia | 4 | 31,25 |
| **zdjęcia z drona poznań** | **3** | **39,33** |

Skawina, Łańcut i Bochnia to Małopolska i Podkarpacie, 400-500 km od Poznania.
**90 z 113 wyświetleń strony dronowej to ruch spoza obszaru działania**, a jedyne
poznańskie zapytanie stoi na pozycji 39. Ta strona rankuje na czymś, czego nie sprzedasz.

### Klaster 5: zdjęcie do CV — 83 wyśw. (5%), 1 kliknięcie

**Strona:** `/blog/zdjecie-do-cv-w-domu` (119 wyśw., poz. 23,33, 1 klik) — druga
najklikalniejsza strona w serwisie.

Zapytania: `jak zrobić zdjęcie do cv w domu` (25, poz. 10,56), `profesjonalne zdjęcie do cv`
(20), `zdjęcie do cv w domu` (12, poz. **4,33**), `rozmiar zdjęcia do cv` (2),
`wymiary zdjęcia do cv` (2), `jak wstawić zdjęcie do cv` (2).

**Sprzeczność wewnętrzna:** `cv` jest na liście wykluczeń w Google Ads (handoff, sekcja 8,
kategorie nieobsługiwane). Płacisz za to, żeby nie pokazywać się na „cv" w płatnych,
a organicznie to twoja druga najsilniejsza strona. Ten ruch to osoby szukające pracy,
nie firmy. Nie konwertuje i nigdy nie będzie.

### Klaster 6: b-roll i słownik wideo — 42 wyśw., 0 kliknięć, POZYCJA 8,5

**Strona:** `/blog/slownik-pojec-wideo` — **165 wyświetleń, pozycja 8,50, zero kliknięć.**

Zapytania: `b roll co to` (9, poz. 11,44), `co to jest b` (7, poz. 7,29),
`co to jest b-roll` (7, poz. 10,43), `b-roll co to` (5), `co to jest b roll` (5),
`b-rolle` (4, poz. 8,50), `co to b-roll` (4), `dodatkowe ujęcie filmowe potocznie` (1, poz. 1).

**To jedyne miejsce w całym zestawie, gdzie problemem faktycznie jest tytuł i opis,
a nie pozycja.** 165 wyświetleń na pozycji 8,5 powinno dać 3-6 kliknięć. Dało zero.
Tytuł `Co to jest b-roll? Słownik pojęć wideo | Marcin Szabunia` odpowiada na pytanie,
ale użytkownik dostaje odpowiedź w samym SERP-ie (fragment rozszerzony u konkurencji)
i nie ma powodu wchodzić.

### Klaster 7: lokalne komercyjne „fotograf … Poznań" — 514 wyśw., 0 kliknięć

| Zapytanie | Wyśw. | Pozycja |
|---|---|---|
| fotograf biznesowy poznań | 59 | 20,00 |
| zdjęcie biznesowe męskie poznań | 13 | 32,38 |
| zdjęcia biznesowe poznań | 9 | 41,56 |
| fotografia eventowa poznań | 6 | 32,17 |
| **fotograf poznań** | **6** | **106,00** |
| fotografia przemyslowa poznan | 4 | 17,00 |
| zdjęcie biznesowe poznań | 2 | 71,50 |
| fotografia biznesowa poznań | 2 | 86,00 |
| zdjęcia eventowe poznań | 1 | 38,00 |
| fotografia reklamowa poznań | 1 | 39,00 |
| filmy wizerunkowe poznań | 1 | 98,00 |
| fotograf luboń | 2 | 2,50 |

Najważniejsza fraza handlowa, `fotograf biznesowy poznań`, ma 59 wyświetleń na pozycji 20.
`fotograf poznań` — pozycja 106, czyli poza jakąkolwiek widocznością. Za tę drugą płacisz
w Ads 1 279 zł na 90 dni.

### Klaster 8: eventy — praktycznie nie istnieje

`/uslugi/eventy-reportaze`: **31 wyświetleń** w 3 miesiące, pozycja 13,42.
`/blog/jak-wybrac-fotografa-na-event`: 2 wyświetlenia. `/blog/live-editing-na-evencie`,
`/blog/obsluga-foto-wideo-eventu-firmowego`, `/blog/pakiet-foto-wideo-czy-osobno`,
`/blog/headshoty-zespolu-w-jeden-dzien`, `/blog/ile-kosztuje-film-promocyjny`:
**0 wyświetleń, nie ma ich w eksporcie w ogóle.**

To najpoważniejszy rozjazd między danymi a biznesem. Z 13 realnych leadów z handoffu Ads
najgrubsze pozycje to eventy firmowe (Biofarm: impreza 150-200 osób, woohoo: event na
stadionie Lecha). Organicznie linia eventowa ma 31 wyświetleń, czyli 1,3% widoczności strony.

---

## 2. Gdzie tytuł i opis są faktycznie problemem

Kryterium: strona jest w pierwszej dziesiątce, ma wyświetlenia i nie ma kliknięć.
Tylko wtedy przepisanie tekstu w SERP-ie coś zmieni.

| Strona | Poz. | Wyśw. | Klik. | CTR | Ocena |
|---|---|---|---|---|---|
| `/blog/slownik-pojec-wideo` | 8,50 | 165 | 0 | 0% | **Realny problem CTR.** Największa strata w zestawie |
| `/kontakt` | 5,07 | 101 | 1 | 0,99% | **Realny problem.** Na poz. 5 powinno być 5-8% |
| `/uslugi/pakiety-foto-wideo` | 6,92 | 59 | 0 | 0% | Problem, mała skala |
| `/uslugi/sesje-zespolowe` | 7,73 | 51 | 0 | 0% | Problem, mała skala |
| `/uslugi/wideo-marketing` | 7,55 | 33 | 0 | 0% | Problem, mała skala |
| `/galeria` | 6,56 | 16 | 0 | 0% | Za mało danych |
| `/` | 10,01 | 564 | 15 | 2,66% | **W normie** dla pozycji 10 |
| `/uslugi` | 7,48 | 21 | 1 | 4,76% | **W normie** |
| `/blog/fotografia-przemyslowa-fabryka` | 10,50 | 22 | 1 | 4,55% | **W normie** |
| `http://szabunia.pl/` | 2,47 | 17 | 3 | 17,65% | **W normie**, zapytania brandowe |

Wszystko poniżej pozycji 15 (czyli `/uslugi/fotografia-produktowa` z 444 wyświetleniami,
`/blog/ile-kosztuje-sesja-wizerunkowa-dla-firmy` z 241, `/blog/zdjecie-do-cv-w-domu` z 119)
to **problem rankingowy, nie tekstowy**. Tam przepisywanie tytułu jest stratą czasu.

---

## 3. Pełny inwentarz title + description

### 3.1 Strony statyczne

| Strona | Title (znaki) | Description (znaki) | GSC: wyśw. / poz. |
|---|---|---|---|
| `/` | Marcin Szabunia — Fotograf biznesowy & twórca wideo \| Poznań (60) | Profesjonalna fotografia biznesowa i wideo marketing dla firm. Portrety biznesowe, eventy, fotografia produktowa. Poznań i cała Polska. (135) | 564 / 10,01 |
| `/uslugi` | Usługi foto i wideo dla firm \| Marcin Szabunia Poznań (53) | Pełna oferta dla firm: portrety biznesowe, sesje zespołowe, fotografia eventowa i produktowa, pakiety foto + wideo oraz wideo marketing. Poznań i cała Polska. (158) | 21 / 7,48 |
| `/portfolio` | Portfolio — realizacje foto i wideo \| Marcin Szabunia (53) | Wybrane realizacje: sesje wizerunkowe, fotografia eventowa, sesje korporacyjne i packshoty produktowe dla firm B2B. Poznań, cała Polska i Europa. (145) | 6 / 2,50 |
| `/galeria` | Galeria zdjęć i wideo \| Marcin Szabunia — fotograf Poznań (57) | Wybrane kadry z realizacji: portrety biznesowe, fotografia eventowa, produktowa, wideo oraz zdjęcia z drona. Marcin Szabunia, Poznań i cała Polska. (147) | 16 / 6,56 |
| `/blog` | Blog o fotografii biznesowej i wideo \| Marcin Szabunia (54) | Artykuły o fotografii biznesowej, sesjach wizerunkowych i wideo marketingu B2B. Porady od fotografa pracującego dla H&M, Warner Music i Santander. (146) | 10 / 18,80 |
| `/kontakt` | Kontakt — fotograf biznesowy Poznań \| Marcin Szabunia (53) | Skontaktuj się w sprawie fotografii i wideo dla firm: portrety biznesowe, eventy, produktowa, wideo. Poznań, cała Polska. Odpowiadam w 24h. (139) | 101 / 5,07 |
| `/poradnik` | Darmowy poradnik: przygotowanie do sesji \| Marcin Szabunia (58) | Pobierz darmowy pakiet przygotowania do sesji biznesowej: checklisty, planer stylizacji, ściąga kolorów i mini-brief. Wyjdź na zdjęciach pewnie i naturalnie. (157) | 1 / 8,00 |
| `/polityka-prywatnosci` | Polityka prywatności \| Marcin Szabunia (38) | Polityka prywatności serwisu szabunia.pl. Informacje o przetwarzaniu danych osobowych, plikach cookies i prawach użytkownika zgodnie z RODO. (140) | 0 |
| `404` | 404 — Strona nie znaleziona \| Marcin Szabunia (45) | Strona, której szukasz, nie istnieje lub została przeniesiona. Wróć na stronę główną fotografa biznesowego z Poznania. (118) | `noindex` |

### 3.2 Usługi (`/uslugi/[slug]`)

| Strona | Title (znaki) | Description (znaki) | GSC: wyśw. / poz. |
|---|---|---|---|
| `fotografia-produktowa` | Packshot i fotografia produktowa — Poznań \| Marcin Szabunia (59) | Packshoty na białym tle i zdjęcia produktowe w studiu w Poznaniu. E-commerce, katalogi, Social Media. Retusz w cenie zdjęcia. (125) | **444 / 28,26** |
| `wizerunek-portrety` | Wizerunek & Portrety biznesowe — Marcin Szabunia \| Poznań (57) | Profesjonalne portrety biznesowe, headshoty i personal branding. Sesje w studiu lub w mobilnym studiu w biurze. Poznań i cała Polska. (133) | 117 / 17,74 |
| `zdjecia-wideo-z-drona` | Zdjęcia i wideo z drona — Marcin Szabunia \| Poznań (50) | Zdjęcia i wideo z drona (4K): budynki i obiekty firmowe, tereny, inwestycje, eventy i architektura. Certyfikat A1/A3 i OC operatora. Poznań i cała Polska. (154) | 113 / 22,13 |
| `pakiety-foto-wideo` | Pakiety Foto + Wideo + Dron — Marcin Szabunia \| Poznań (54) | Pakiety hybrydowe foto + wideo. Jeden twórca, spójny materiał, mniej logistyki. Eventy, konferencje, content marketing. Poznań. (127) | 59 / 6,92 |
| `sesje-zespolowe` | Sesje zespołowe & headshoty — Marcin Szabunia \| Poznań (54) | Profesjonalne headshoty zespołu w Twoim biurze. Mobilne studio, spójne zdjęcia, 10-15 min na osobę. Poznań i cała Polska. (121) | 51 / 7,73 |
| `wideo-marketing` | Wideo marketing i filmy korporacyjne \| Marcin Szabunia (54) | Filmy korporacyjne, reelsy, filmy promocyjne i reklamowe, relacje z eventów. Profesjonalna produkcja wideo od nagrania po montaż. Poznań i cała Polska. (151) | 33 / 7,55 |
| `eventy-reportaze` | Fotografia eventowa & reportaże — Marcin Szabunia \| Poznań (58) | Profesjonalna fotografia eventowa, konferencje, targi, gale. Reportaż + live editing na Social Media. Poznań i cała Polska. (123) | **31 / 13,42** |

### 3.3 Portfolio (`/portfolio/[slug]`)

| Strona | Title (znaki) | Description (znaki) | GSC |
|---|---|---|---|
| `yes-butcher-przewodnik-michelin` | Yes Butcher — sesja do przewodnika Michelin \| Marcin Szabunia (61) | (165) | 14 / 11,57 |
| `box17-budki-akustyczne` | Box17 — packshoty budek akustycznych \| Marcin Szabunia (54) | (155) | 10 / 5,30 — `noindex` od 29.07, wyświetlenia wygasną |
| `artech-fotografia-produktowa` | Artech — packshoty i film z produkcji \| Marcin Szabunia (55) | (150) | 3 / 7,67 |
| `woohoo-autopay` | E-commerce All-in — realizacja wideo \| Marcin Szabunia (54) | (165) | 2 / 6,50 |
| `idcom-headshoty-zespolu` | IDcom — headshoty zespołu na 3 tłach \| Marcin Szabunia (54) | (155) | 1 / 3,00 |

Case studies łapią frazy brandowe klienta: `box17` (3 wyśw., poz. 5,67), `box 17` (1),
`yes butcher michelin` (4, poz. 12,75). Działa dokładnie tak, jak powinno.

Poza Google (`noindex`, `DRAFT_SLUGS` w `src/data/portfolio.ts:569`): `box17-budki-akustyczne`,
`sesja-wizerunkowa`, `fotografia-eventowa`, `packshoty-produktowe`, `sesja-korporacyjna`.
Cztery ostatnie mają metadane prawie identyczne z odpowiednimi stronami `/uslugi/*`
(`portfolio/fotografia-eventowa` vs `uslugi/eventy-reportaze` różnią się jednym słowem:
„bankiety"). Dopóki są `noindex`, kanibalizacji nie ma. **Przy odmrażaniu którejkolwiek
trzeba najpierw przepisać title i description.**

### 3.4 Blog (26 wpisów), wzór `[temat] | Marcin Szabunia`

| Strona | Title (znaki) | Opis (zn.) | GSC: wyśw. / poz. |
|---|---|---|---|
| `ile-kosztuje-sesja-wizerunkowa-dla-firmy` | Ile kosztuje sesja wizerunkowa dla firmy \| Marcin Szabunia (58) | 134 | **241 / 25,66** |
| `slownik-pojec-wideo` | Co to jest b-roll? Słownik pojęć wideo \| Marcin Szabunia (56) | 141 | **165 / 8,50** |
| `co-to-jest-packshot` | Co to jest packshot? Słownik fotografii \| Marcin Szabunia (57) | 152 | 160 / 34,51 |
| `jak-przygotowac-sie-do-sesji-biznesowej` | Jak przygotować się do sesji biznesowej \| Marcin Szabunia (57) | 162 | 150 / 34,20 |
| `zdjecie-do-cv-w-domu` | Jak zrobić zdjęcie do CV w domu: poradnik \| Marcin Szabunia (59) | 139 | 119 / 23,33 |
| `fotografia-produktowa-ecommerce` | Fotografia produktowa dla e-commerce \| Marcin Szabunia (54) | 155 | 111 / 23,66 |
| `sesja-wizerunkowa-poznan` | Sesja wizerunkowa Poznań: gdzie ją zrobić \| Marcin Szabunia (59) | 148 | 61 / 23,51 |
| `co-zalozyc-na-sesje-biznesowa` | Co założyć na sesję biznesową: stylizacje \| Marcin Szabunia (59) | 158 | 56 / 30,54 |
| `ile-kosztuje-film-z-drona` | Ile kosztuje film z drona dla firmy \| Marcin Szabunia (53) | 137 | 29 / 33,31 |
| `fotografia-przemyslowa-fabryka` | Fotografia przemysłowa: zdjęcia fabryki \| Marcin Szabunia (57) | 139 | 22 / 10,50 |
| `headshoty-linkedin-konwersja` | Headshoty na LinkedIn a konwersja \| Marcin Szabunia (51) | 132 | 21 / 42,33 |
| `zdjecia-na-strone-firmowa` | Jakie zdjęcia na stronę firmową: lista \| Marcin Szabunia (56) | 156 | 19 / 12,05 |
| `fotografia-eventowa-vs-reportaz` | Fotografia eventowa vs reportaż: co wybrać \| Marcin Szabunia (60) | 126 | 14 / 29,93 |
| `zdjecia-ai-vs-profesjonalna-sesja` | Zdjęcia AI vs profesjonalna sesja \| Marcin Szabunia (51) | 160 | 10 / 8,40 |
| `wideo-marketing-dla-firm-formaty` | Wideo marketing dla firm: jakie formaty \| Marcin Szabunia (57) | 146 | 8 / 10,25 |
| `foto-wideo-dron-z-jednego-wejscia` | Foto, wideo i dron z jednego wejścia \| Marcin Szabunia (54) | 155 | 3 / 2,67 |
| `spojne-portrety-zespolu` | Spójne portrety zespołu: jeden standard \| Marcin Szabunia (57) | 157 | 3 / 9,00 |
| `bledy-zdjecia-zespolu` | 5 błędów przy zdjęciach zespołu \| Marcin Szabunia (49) | 135 | 3 / 40,33 |
| `jak-wybrac-fotografa-na-event` | Jak wybrać fotografa na event firmowy \| Marcin Szabunia (55) | 131 | 2 / 2,00 |
| `zdjecia-z-drona-dla-deweloperow` | Zdjęcia z drona dla deweloperów \| Marcin Szabunia (49) | 160 | 2 / 8,50 |
| `zdjecia-film-z-drona-dla-firm` | Zdjęcia i film z drona dla firm: koszt \| Marcin Szabunia (56) | 166 | 0 |
| `obsluga-foto-wideo-eventu-firmowego` | Obsługa foto-wideo eventu firmowego \| Marcin Szabunia (53) | 153 | 0 |
| `pakiet-foto-wideo-czy-osobno` | Pakiet foto, wideo i dron czy osobno \| Marcin Szabunia (54) | 142 | 0 |
| `live-editing-na-evencie` | Live editing na evencie: zdjęcia od ręki \| Marcin Szabunia (58) | 146 | 0 |
| `headshoty-zespolu-w-jeden-dzien` | Headshoty całego zespołu w jeden dzień \| Marcin Szabunia (56) | 157 | 0 |
| `ile-kosztuje-film-promocyjny` | Ile kosztuje film promocyjny dla firmy \| Marcin Szabunia (56) | 155 | 0 |

**Sześć wpisów ma zero wyświetleń** i wszystkie sześć to linia eventowo-wideo-dronowa.
Nie jest to problem tekstu, to brak indeksacji lub brak siły domeny na tych tematach.

---

## 4. Higiena tekstu w SERP-ie (kosmetyka, nie priorytet)

**11 tytułów w strefie ucięcia (≥58 znaków, Google ucina po 55-60):**
`/` (60), `/poradnik` (58), `uslugi/fotografia-produktowa` (59), `uslugi/eventy-reportaze` (58),
`portfolio/yes-butcher-przewodnik-michelin` (61), `blog/fotografia-eventowa-vs-reportaz` (60),
`blog/zdjecie-do-cv-w-domu` (59), `blog/sesja-wizerunkowa-poznan` (59),
`blog/co-zalozyc-na-sesje-biznesowa` (59), `blog/ile-kosztuje-sesja-wizerunkowa-dla-firmy` (58),
`blog/live-editing-na-evencie` (58).

**5 opisów >160 znaków (Google ucina po 155-160):**
`blog/zdjecia-film-z-drona-dla-firm` (166), `portfolio/woohoo-autopay` (165),
`portfolio/yes-butcher-przewodnik-michelin` (165),
`blog/jak-przygotowac-sie-do-sesji-biznesowej` (162), `blog/zdjecia-ai-vs-profesjonalna-sesja` (160).
Na granicy: `/uslugi` (158), `blog/co-zalozyc-na-sesje-biznesowa` (158).

**Sufiks `| Marcin Szabunia` w 26 tytułach bloga** zjada 17 znaków. Na wpisach informacyjnych
(„co to jest packshot", „ile kosztuje film z drona") nazwisko nie pomaga ani rankingowi,
ani klikalności. Skrócenie do `| Szabunia` odzyskuje 7 znaków i mieści wszystkie tytuły
pod 55 znaków.

**„Profesjonalny" otwiera 8 opisów.** Żaden fotograf nie napisze „nieprofesjonalna
fotografia", więc to słowo nic nie komunikuje, a zjada 14 znaków z 155.

**Rozjazd z `docs/zasady-tekstow.md`.** Ten plik mówi wprost, że obowiązuje dla
„metadanych opisowych (title/description)", i stawia twardy zakaz długich myślników (—).
Długi myślnik jest w 11 tytułach. Formalnie rozjazd, nie błąd rzeczowy: zasada weszła
23.07.2026 i obejmuje teksty „dodawane lub przepisywane od tej pory", a te tytuły są starsze.
Do rozstrzygnięcia: albo myślnik w tytule jest wyjątkiem jako separator techniczny,
albo przy najbliższej rundzie leci wszędzie na `|` lub przecinek.

---

## 5. Dwie obserwacje techniczne

**`Wygląd w wyszukiwarce: Opisy produktów, 28 wyświetleń.`** Google czyta znacznik
`Offer` + `PriceSpecification.minPrice` z `src/app/uslugi/[slug]/page.tsx:104` i kwalifikuje
strony usług jako wyniki produktowe. Działa zgodnie z zamysłem (audyt PELNY2907-10),
ale ma skutek uboczny wart świadomości: **kotwica „od X zł" może wyrenderować się
w SERP-ie jako cena**, mimo że strona po depricingu 23.07 nie publikuje cennika.

**`/kalkulator` ma 3 wyświetlenia na pozycji 8,67** mimo usunięcia trasy i przekierowania
301 na `/kontakt`. Normalne, wygaśnie samo po recrawlu.

**`http://szabunia.pl/` figuruje jako osobna strona** (17 wyśw., 3 klik, poz. 2,47).
Ruch brandowy trafiający na wersję http. Warto potwierdzić, że przekierowanie http → https
to 301, a nie 302.

---

## 6. Spadek wyświetleń po 23.07 — do decyzji, nie ruszam

| Data | Dzień | Wyśw. |
|---|---|---|
| 2026-07-20 | pon | 103 |
| 2026-07-21 | wt | 100 |
| 2026-07-22 | śr | **164** |
| 2026-07-23 | czw | 87 |
| 2026-07-24 | pt | 57 |
| 2026-07-25 | sob | 44 |
| 2026-07-26 | niedz | 48 |
| 2026-07-27 | pon | **57** |

Porównanie tydzień do tygodnia z wyeliminowaniem efektu weekendu: piątek 17.07 = 96,
piątek 24.07 = 57. Poniedziałek 20.07 = 103, poniedziałek 27.07 = 57. To spadek
o **około 45%**, który zaczyna się **24.07, dzień po depricingu z 23.07**
(usunięcie `Pricing.tsx`, `PricingCalculator.tsx` i trasy `/kalkulator`).

Jednocześnie największy klaster zakupowy to zapytania cenowe: `sesja wizerunkowa koszt`,
`ceny`, `cennik`, `ile kosztuje` — 376 wyświetleń, 24% całości. Usunięcie stron cenowych
mogło zabrać sygnał tematyczny dokładnie w tym klastrze.

**To jest hipoteza, nie ustalenie, i są co najmniej trzy inne wyjaśnienia:**
przełom lipca i sierpnia to szczyt urlopów w Polsce; ostatnie dni w GSC mogą być
niekompletne; property ma 7 tygodni i naturalnie skacze. Rozstrzygnie to dopiero
porównanie 4 tygodni po 23.07 z 4 tygodniami przed.

Nie zmieniam tu nic i nie proponuję odwracania decyzji. Depricing był Twoją decyzją
biznesową, a to obszar, w którym CLAUDE.md wprost mówi: pokazać liczby, nie przebudowywać.
Do sprawdzenia w GSC około 20.08: przefiltruj zapytania po `cen|koszt|ile kosztuje`
i porównaj dwa okresy.

**Obniżam wagę tej hipotezy po zestawieniu z oknem 7-dniowym (sekcja 0.5).** Cały tydzień
21-27.07 chodzi na 79,6 wyświetleniach dziennie przeciwko średniej 47,9 z całego okresu,
czyli **66% powyżej trendu**. Do tego pozycje w klastrze cenowym w tym samym tygodniu
poprawiły się (`sesja wizerunkowa koszt` 24,36 → 15,81, `ile kosztuje sesja wizerunkowa`
17,37 → 14,65). Gdyby depricing zabrał sygnał tematyczny, spodziewałbym się ruchu
w przeciwną stronę. Zejście 23-24.07 wygląda teraz raczej na powrót z lokalnego szczytu
(22.07 = 164 wyświetlenia) niż na skutek usunięcia stron cenowych. Sprawdzenie w sierpniu
nadal warto zrobić, ale nie traktowałbym tego jako pilnej sprawy.

---

## 7. Co robić, w kolejności

Kolejność zmieniona po danych 7-dniowych z GSC i Ads. Priorytet wynika z pieniędzy
i z ryzyka, nie z tego, co jest najłatwiejsze.

**1. Potwierdzić, że konwersje w Google Ads się mierzą. Ryzyko, nie optymalizacja.**
21 kliknięć, 132,84 zł, zero konwersji w 7 dni. W maju identyczna sytuacja zjadła 38%
ruchu, bo algorytm po 30 dniach bez sygnału sam obniżył wydatek. Techniczna przeszkoda
(Adobe Portfolio) zniknęła, więc to jest do zrobienia. To jedyna pozycja na tej liście,
w której zwlekanie kosztuje realne pieniądze.

**2. Ustalić, co się stało z `/uslugi/wizerunek-portrety`** (pozycja 17,74 → 45,62 w tygodniu).
W GSC filtr po tej stronie i sprawdzenie, jakie zapytania jej zostały. Jeśli hipoteza
z sekcji 0.5 jest prawdziwa i Google przełączył `fotograf biznesowy poznań` na stronę
główną, to nie jest awaria, tylko przetasowanie. Jeśli nie, to jest awaria na flagowej
stronie usług.

**3. Strona główna z powrotem na pierwszą stronę wyników** (pozycja 10,01 → 11,83,
CTR 2,66% → 1,12%). Dawała 15 z 23 kliknięć. Różnica między pozycją 10 a 12 to różnica
między pierwszą i drugą stroną i to ona odpowiada za cały spadek kliknięć.

**4. Reklama w grupie „Fotografia produktowa".** CTR 3,23% przy 10,65% w portretach,
na tym samym koncie. Zapytania produktowe zbierają ~35 wyświetleń tygodniowo przy zerze
kliknięć. Jednocześnie organicznie to 39% zapotrzebowania. Poprawa treści reklamy jest
tania i szybka, w przeciwieństwie do walki o pozycję organiczną.

**5. Wykluczenia w Ads: sprawdzić, czy przetrwały przebudowę kampanii.** Dowód, że nie
działają jak trzeba: `zdjecie biznesowe do cv`, 1 kliknięcie, 6,37 zł. Do dodania nowe
pozycje z sekcji 0.6 (konkurenci, `zlecenia`, `zestaw do`, `co to`).

**6. Linia eventowa, decyzja przed robotą.** Zero w obu kanałach: organicznie 7 wyświetleń
w 7 dni i pozycja 13 → 33, w płatnych 0 zł na sześciu słowach eventowych. Eventy to
najgrubsze zlecenia. Część zera to lipiec (eventy kupuje się we wrześniu-grudniu), więc
sensowny moment na uderzenie to sierpień, żeby wejść w sezon z gotową widocznością.
Pytanie do rozstrzygnięcia: czy przenieść część budżetu z portretów, czy dołożyć.

**7. `/uslugi/fotografia-produktowa` i `/blog/ile-kosztuje-sesja-wizerunkowa-dla-firmy`
organicznie.** Wcześniej numery 1 i 2. **Zdegradowane, bo poprawiają się same:**
28,26 → 23,82 i 25,66 → 21,91 w ciągu tygodnia, przy wzrostach wyświetleń o 30% i 145%.
Domena nabiera siły po migracji. Wrócić do tego, jeśli w sierpniu trend się zatrzyma.

**8. `/blog/slownik-pojec-wideo` i `/kontakt`, przepisanie tytułu i opisu.** Słownik:
pozycja 8,40, 50 wyświetleń w 7 dni, zero kliknięć, i tak samo przez 48 dni. Propozycje
w sekcji 8. Efekt policzalny, ale mały: to strona informacyjna, nie sprzedażowa.

**9. Higiena z sekcji 4.** 11 tytułów, 5 opisów, sufiks bloga. Godzina roboty,
efekt kosmetyczny.

**Czego nie robić:** nie optymalizować `/uslugi/zdjecia-wideo-z-drona` pod obecne
zapytania (Skawina, Łańcut, Bochnia to nie Twój rynek), nie rozbudowywać wątku
„zdjęcie do CV" (kandydaci do pracy, a `cv` masz wykluczone w Ads), i nie odwracać
depricingu na podstawie spadku z 24.07 (sekcja 6, hipoteza osłabiona).

---

## 8. Propozycje tekstów (do decyzji, nic nie wdrożone)

Zgodne z `docs/zasady-tekstow.md`: bez długich myślników, bez „profesjonalny",
bez triad przymiotnikowych.

**`/blog/slownik-pojec-wideo`** — jedyna zmiana z policzalnym efektem (165 wyśw., poz. 8,5)

- Title: `B-roll, setka, recap: słownik pojęć wideo | Szabunia` (51) —
  trzy hasła zamiast jednego pytania, obiecuje więcej niż fragment rozszerzony konkurencji
- Description: `Co to jest b-roll, setka, recap, teaser, color grading i gimbal. Pojęcia wideo marketingu wyjaśnione tak, żeby dogadać się z ekipą na planie.` (140)

**`/kontakt`** (101 wyśw., poz. 5,07, 1 klik)

- Title: `Kontakt i wycena, fotograf biznesowy Poznań | Szabunia` (53) — dodane „wycena",
  bo to powód, dla którego ktoś wchodzi na kontakt
- Description: `Napisz, czego potrzebujesz. Odpowiadam w 24 godziny wstępną wyceną i wolnym terminem. Poznań, cała Polska i Europa.` (117)

**`/uslugi/fotografia-produktowa`** (tytuł 59 znaków, do skrócenia niezależnie od rankingu)

- Title: `Packshot i fotografia produktowa, Poznań | Szabunia` (50)
- Description bez zmian (125 znaków, mieści się)

**`/`**

- Title: `Fotograf biznesowy Poznań, foto i wideo dla firm | Szabunia` (58)
- Description: `Portrety biznesowe, eventy firmowe, fotografia produktowa i wideo. Poznań i cała Polska. Ponad 100 firm, 250 000 zdjęć. Wycena w 24 godziny.` (140)

**Blog, zmiana systemowa:** sufiks `| Marcin Szabunia` → `| Szabunia` w 26 wpisach.

**Skróty opisów >160 znaków:** 5 wpisów z sekcji 4, każdy do 150 znaków przez wyrzucenie
ostatniego zdania (zwykle powtórzenie lokalizacji).

---

*Sporządzone 2026-07-30 na trzech eksportach: GSC 3 miesiące (`~/Downloads/szabunia-2/`,
dane 10.06-27.07), GSC 7 dni (`~/Downloads/szabunia-3/`, 21-27.07) i Google Ads 7 dni
(`~/Downloads/Karty_na_stronie_Przegląd_csv(2026-07-30_09_39_45)/`, 23-29.07).
Żaden plik w `src/` nie był zmieniany. Zmiana metadanych w `layout.tsx` wymaga zgody
Marcina (CLAUDE.md, stop-condition 3).*
