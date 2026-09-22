# Strategia kampanii Search — Poznań, fotografia B2B

Data: 2026-09-20. Konto Google Ads **786-864-4697**. Budżet **5 zł/dzień**.
Landing: **wyłącznie** `https://szabunia.pl/`.

Oznaczenia: **FAKT** = zmierzone, źródło podane. **PROGNOZA** = wyliczenie z danych.
**HIPOTEZA** = wniosek bez pełnego dowodu.

---

## 1. Co zastałem na koncie

**FAKT.** Na koncie żyje kampania „Pierwsza pro kampania" (ID 22202006131):
status **ENABLED**, budżet **50 zł/dzień**, strategia Maximize Clicks, start 05.02.2025.
Wszystkie **cztery grupy reklam są wstrzymane**, więc kampania dziś nie wydaje nic.

✅ **ZAMKNIĘTE 22.09.2026: Marcin potwierdził, że stara kampania jest wstrzymana.**
Ryzyko opisane niżej nie jest już aktualne, zapis zostaje jako ślad decyzji.

~~⚠️ To jest odbezpieczony budżet. Włączenie dowolnej grupy reklam uruchamia wydatek
dziesięciokrotnie wyższy niż ustalone 5 zł/dzień.~~ Odczyt przez API z 20.09.2026 pokazywał
status ENABLED przy wstrzymanych grupach reklam, czyli stan, w którym kampania nic nie wydaje,
ale jedno włączenie grupy uruchamia 50 zł/dzień. Marcin wstrzymał całą kampanię.

## 2. Historia konta: gdzie poszły pieniądze

**FAKT.** Eksporty Google Ads za 2025-10-01..2026-08-02
(`05_Strona_WWW/ads/Karty_na_stronie_Przegląd_csv(2026-08-02_13_48_51)/`):

- 2 284 kliknięcia, 40 597 wyświetleń, **4 531 zł**, CTR 5,63%
- Cały ruch z województwa wielkopolskiego
- Urządzenia: **1 782 kliknięcia z telefonów**, 495 z komputerów, 7 z tabletów (78% mobile)

Rozbicie wydatku według typu dopasowania:

| Typ dopasowania | Wydatek | Udział | Kliknięcia | CPC |
|---|---|---|---|---|
| Przybliżone (broad) | 3 832,94 zł | **85,3%** | 2 145 | 1,79 zł |
| Do wyrażenia (phrase) | 559,90 zł | 12,5% | 96 | 5,83 zł |
| Ścisłe (exact) | 102,02 zł | 2,3% | 13 | 7,85 zł |

**Jedno słowo kluczowe, `fotograf poznań` w dopasowaniu przybliżonym, pochłonęło
2 403,03 zł, czyli 53,5% całego historycznego wydatku konta.** 1 530 kliknięć.
Zero zapytań w skrzynce za nie.

Co za te pieniądze kupiono, widać w wyszukiwanych hasłach: `fotograf poznań grunwald`,
`fotograf wilda`, `fotograf libelta`, `fotograf piątkowo`, `fotograf jeżyce`,
`fotograf rataje`, `zdjecia do paszportu poznan`, `zdjecia do dokumentow poznan`,
`zdjęcia do cv poznań`, `fotopietura`, `paweł wojtaszek`, `pnf studio`.
To ludzie szukający zakładu fotograficznego przy domu albo konkretnej konkurencyjnej marki.

**To jest empiryczne uzasadnienie zakazu broad match w tej kampanii.** Nie teoria, własne dane.

## 3. Jaka jest realna cena kliknięcia

**FAKT, dwa niezależne odczyty zgodne:**
- phrase + exact przez cały okres: 662 zł / 109 kliknięć = **6,07 zł**
- ostatnie 6 tygodni przed wstrzymaniem: 4,92 / 10,12 / 6,44 / 6,30 / 6,34 / 5,22 zł

**Do planowania przyjmuję CPC 6,00-6,50 zł.** Średnia 1,98 zł z całego okresu jest
myląca, bo ciągnie ją w dół tani śmieciowy ruch z broad matcha.

## 4. Ile w ogóle jest popytu

**FAKT.** Keyword Planner (Google Ads API, 20.09.2026, język polski, lokalizacja Polska),
średnia miesięcznych wyszukań:

| Fraza | Wyszukania/mies. |
|---|---|
| fotograf biznesowy poznań | 10 |
| fotografia biznesowa poznań | 10 |
| sesja biznesowa poznań | 10 |
| sesja wizerunkowa poznań | 10 |
| zdjęcia biznesowe poznań | 10 |
| fotografia produktowa poznań | 10 |
| fotografia korporacyjna poznań | 0 |
| fotograf produktowy poznań | 0 |
| fotograf dla firm / zdjęcia dla firm / fotograf firmowy / fotograf komercyjny poznań | poniżej progu raportowania |

**To jest sufit i trzeba go powiedzieć wprost: cały rdzeń to rząd 40-70 wyszukań miesięcznie
w całej Polsce, nie w Poznaniu.** Przy takim popycie kampania nigdy nie będzie duża.
Może być opłacalna, ale nie może być duża.

Trzy frazy z listy Marcina (`fotograf dla firm poznań`, `zdjęcia dla firm poznań`,
`fotograf firmowy poznań`) **nie mają wolumenu w Plannerze ani ani jednego trafienia
w 44 tygodniach historii konta**. Zostawiam je jako exact, bo słowo bez wyszukań nie
generuje kosztu, ale nie buduję na nich planu.

Odrzuciłem `fotograf komercyjny poznań` i `fotografia korporacyjna poznań`: zero wolumenu
**oraz** zero trafień w historii. To język wewnętrzny, nie język klienta.

## 5. Ekonomia przy 5 zł/dzień

Miesięczny sufit wydatku Google to 30,4 × budżet dzienny = **152 zł**.

| CPC | Kliknięć/mies. | CPL przy CVR 2% | CPL przy 5% | CPL przy 10% |
|---|---|---|---|---|
| 2,00 zł | 76 | 100 zł | 40 zł | 20 zł |
| 3,00 zł | 51 | 150 zł | 60 zł | 30 zł |
| 5,00 zł | 30 | 250 zł | 100 zł | 50 zł |
| **6,07 zł (zmierzone)** | **25** | **304 zł** | **121 zł** | **61 zł** |
| 8,00 zł | 19 | 400 zł | 160 zł | 80 zł |
| 10,00 zł | 15 | 500 zł | 200 zł | 100 zł |

**Realistyczny scenariusz bazowy: około 25 kliknięć miesięcznie, czyli mniej niż jedno dziennie.**

Próg opłacalności, z prowizją Useme 13,35% (na konto wpływa 86,65% kwoty):

| CVR | Zamknięcie leada | Zleceń/mies. | Koszt reklamy na zlecenie | Minimalna wartość zlecenia |
|---|---|---|---|---|
| 5% | 25% | 0,31 | 486 zł | **560 zł netto** |
| 5% | 50% | 0,63 | 243 zł | **280 zł netto** |
| 10% | 25% | 0,63 | 243 zł | **280 zł netto** |
| 10% | 50% | 1,25 | 121 zł | **140 zł netto** |

**Wniosek: kampania ma sens ekonomiczny.** Próg portretowy to 700 zł netto, a dwa realne
leady produktowe z lipca 2026 wyceniono na 450 zł i 1 260 zł netto (średnio 855 zł).
Nawet w najgorszym z czterech scenariuszy (560 zł) jedno zamknięte zlecenie pokrywa
miesiąc reklamy. **Ryzykiem nie jest opłacalność pojedynczego zlecenia, tylko to,
czy przy 25 kliknięciach miesięcznie w ogóle pojawi się zlecenie.**

## 6. Struktura i dlaczego taka

**1 kampania Search, 2 grupy reklam, 21 słów kluczowych.** Brief dopuszczał drugą grupę tylko przy wyraźnie
różnych intencjach. Są różne, i to na dwóch poziomach: inny język kupującego (headshot
zespołu wobec packshotu pod Allegro) i inna aukcja (patrz §7).

| Grupa | Słów | Dlaczego |
|---|---|---|
| Wizerunek i fotografia biznesowa \| Poznań | 14 | Rdzeń oferty i cel postawiony przez Marcina. Aukcja bez reklam tekstowych |
| Fotografia produktowa \| Poznań | 7 | Jedyna linia z **udokumentowanymi** leadami (2 zapytania z 46 kliknięć) |

**Zmiana po red-team review:** pierwotnie grupa produktowa miała niższą stawkę (5 zł wobec 7 zł).
Red team słusznie to podważył: w Google Ads **nie ma budżetu na poziomie grupy reklam**,
więc niższa stawka nie oznacza „nie przepłacam", tylko „nie biorę udziału w aukcji".
Zaniżanie stawki jedynej linii z udokumentowanymi leadami było wewnętrznie sprzeczne.
Po przejściu na Maximize Clicks z limitem CPC stawka grupy przestaje być dźwignią podziału:
**o alokacji decyduje aukcja, a nie moja arbitralna waga.** Tańsze kliknięcia są w pustej
aukcji wizerunkowej, więc budżet naturalnie popłynie tam, gdzie chce go Marcin,
bez sztucznego tłumienia produktów.

**Koszt tej decyzji, powiedziany wprost:** przy 25 kliknięciach miesięcznie podział na dwie
grupy daje około 12 kliknięć na grupę. To mało. Alternatywą była jedna grupa, ale wtedy
reklama musiałaby jednocześnie mówić o headshotach i o packshotach, czyli stać się dokładnie
tym generycznym komunikatem, którego brief zakazuje (§13). Wybrałem trafność kosztem tempa
zbierania danych.

## 7. Konflikt, którego nie rozstrzygnąłem i nie udaję, że rozstrzygnąłem

Dwa źródła mówią o fotografii produktowej rzeczy przeciwne.

**Za:** `POMIAR-ADS-VS-GA4-2026-08-02.md` §2B. W lipcu 2026 oba realne zapytania z reklamy
w skrzynce dotyczyły fotografii produktowej, przy ~18% budżetu. Portrety wzięły ~78% budżetu
i nie dały ani jednego zapytania. To dwa niezależne źródła (panel Ads i skrzynka) mówiące to samo.

**Przeciw:** odczyt SERP z 20.09.2026. Na `fotograf produktowy poznań` stoją **cztery
reklamy ogólnopolskie**, licytujące ceną jednostkową („Ceny już od 11 zł", „od 39 zł").
Przy 5 zł/dzień nie ma czym z nimi konkurować i nie chce się wygrywać ich ceną.

**Zastrzeżenie do obu: n=2.** Na dwóch leadach nie przewraca się kampanii. Dodatkowo
porównanie „portrety wobec produktowej" jest skażone, bo 78% budżetu portretów poszło
na broad `fotograf poznań`, a nie na właściwe frazy portretowe. **Ścisłe frazy portretowe
nigdy nie zostały uczciwie przetestowane.**

**Decyzja:** obie grupy startują, produktowa z niższą stawką. Rozstrzygnięcie po danych,
nie teraz. To jest „pierwsza kolejna decyzja" z raportu.

## 8. Geotargeting

**Poznań i promień 25 km**, metoda **Obecność** (osoby przebywające w lokalizacji),
nie „obecność lub zainteresowanie". Poprzednia kampania celowała w całe województwo (geo 20861).

**Zmiana po red-team review:** pierwotnie było samo miasto Poznań. Red team wykazał,
że granica administracyjna wycina Swarzędz, Luboń, Suchy Las, Tarnowo Podgórne, Komorniki
i Kórnik, czyli **parki biznesowe aglomeracji, a nie przedmieścia sypialniane**.
Przy wolumenie 10 wyszukań miesięcznie w skali kraju każde kilka procent zasięgu ma znaczenie.
Przy okazji usunąłem te gminy z listy wykluczeń, gdzie siedziały jako rzekome „dzielnice Poznania"
i odcinały rynek drugi raz.

**Typ „Obecność" zostaje bez dyskusji.** Domyślne „obecność lub zainteresowanie" wpuściłoby
ruch z całej Polski na frazy bez miasta, czyli dokładnie to, przed czym broni cała reszta projektu.

⚠️ **Znany koszt tego ustawienia, zapisany świadomie:** w B2B decydent bywa w centrali
w Warszawie i szuka „fotograf biznesowy poznań" dla poznańskiego oddziału. „Obecność" go wycina,
mimo że fraza sama niesie intencję lokalizacyjną. Dopóki nie widać tego w raportach,
nie ruszam, ale to jest cena, nie darmowy zysk.

## 9. Sieci, harmonogram, urządzenia

- **Tylko wyszukiwarka Google.** Bez Display, bez partnerów sieci wyszukiwania.
  Partnerów odrzucam, bo przy 152 zł miesięcznie nie ma budżetu na ruch, którego
  nie da się rozliczyć per-witryna.
- **Bez harmonogramu godzinowego.** Poprzednia kampania biegła pon-pt 8-20 i dane godzinowe
  z konta to wiernie odbijają (niedziela 51 wyświetleń, sobota 208). **To jest pętla:
  te dane nie dowodzą, że nikt nie szuka w weekend, tylko że reklama się wtedy nie wyświetlała.**
  Nie zawężam startu na podstawie danych, które sam sobie wygenerował harmonogram.
  Harmonogram wróci, gdy będą dane zebrane bez niego.
- **Bez modyfikatorów urządzeń.** 78% historycznych kliknięć to telefony. Strona przechodzi
  test na 375 px (sprawdzone 20.09.2026): fraza docelowa, CTA, telefon i obietnica
  „wycena w 24 godziny" mieszczą się nad zgięciem.

## 10. Strategia stawek

**Maksymalizacja liczby kliknięć z limitem maksymalnego CPC 7,00 zł.**
Zmiana po red-team review, pierwotnie było ręczne ustalanie stawek.

- **Maximize Conversions odpada bezdyskusyjnie:** łańcuch pomiarowy dowozi ~25% ruchu płatnego,
  a konwersji jest rzędu 3 na 30 dni, z czego część to kliknięcia w telefon. Strategie konwersyjne
  potrzebują 15-30 konwersji miesięcznie. Google będzie to rekomendował w panelu. Odrzucać.
- **Ręczne stawki odrzucone po red teamie.** Argument, który mnie przekonał: **ta kampania
  jest ograniczona wolumenem, nie budżetem.** Planner daje 10 wyszukań miesięcznie na frazę
  w skali całej Polski. Przy takim popycie realnym problemem nie jest przepłacenie, tylko
  nieobecność w aukcji. Stawki ręczne nie czytają sygnałów aukcyjnych (urządzenie, pora,
  historia użytkownika), więc systematycznie przegrywają wyświetlenia, których nie ma czym nadrobić.
- **Maximize Clicks nie wymaga danych konwersyjnych** (a tych nie ma i nie będzie),
  natomiast **limit maksymalnego CPC daje dokładnie to samo zabezpieczenie co stawka ręczna**.
  Najgorszy scenariusz to 152 zł ÷ 7 zł = 22 kliknięcia, czyli tyle samo co przy manualu.

**Dlaczego 7,00 zł:** zmierzone 6,07 zł (phrase + exact w historii konta) plus zapas.

⚠️ **HIPOTEZA warta sprawdzenia w pierwszym tygodniu:** na frazach rdzenia SERP nie pokazuje
żadnych reklam tekstowych. CPC w aukcji to cena kolejnego w kolejce, więc bez konkurencji
realna stawka może wynieść 2-3 zł, nie 6,07 zł. Historyczne 6,07 zł pochodzi z okresu,
w którym konto licytowało się na frazach konkurencyjnych. **Jeśli ta hipoteza się potwierdzi,
liczba kliknięć wzrośnie z 25 do 50-75 miesięcznie bez zmiany budżetu.** To najtańszy
i najszybszy test w całej kampanii.

## 11. Parametry URL: świadomie ich nie ma

Brief prosił o UTM-y. **Nie dodaję ich, ale uzasadnienie z pierwszej wersji tego dokumentu
było błędne i red team słusznie je obalił.**

**Co napisałem źle:** że ręczne UTM-y „nadpisują gclid" i uszkodziłyby atrybucję.
**Jak jest naprawdę:** automatyczne tagowanie dokleja `gclid` niezależnie od tego,
co jeszcze stoi w adresie, a gałąź w `layout.tsx` szuka `gclid` w `location.search`.
Obecność `utm_source` niczego by tam nie zepsuła. O pierwszeństwie gclid wobec UTM
w samym GA4 decyduje ustawienie właściwości, którego **nie zweryfikowałem**.

**Decyzja zostaje, na poprawnej podstawie:** UTM-y nie są potrzebne, bo `gclid` i tak niesie
kampanię, grupę, słowo kluczowe i urządzenie do raportów Ads, a `src/lib/utm.ts` zapisuje
`gclid`, `wbraid` i `gbraid` do leada. Brief mówił też „nie twórz systemu bardziej
skomplikowanego niż potrzeba".

⚠️ **Zależność jest odwrotna, niż napisałem, i to jest ważniejsze:** zagrożeniem dla pomiaru
nie są UTM-y, tylko **brak `gclid`**. Jeśli automatyczne tagowanie w koncie jest wyłączone,
żadne kliknięcie z reklamy nie trafi w gałąź natychmiastowego ładowania w `layout.tsx`,
biblioteka doładuje się po 5-6 sekundach, a przy 78% ruchu mobilnego użytkownik zdąży wyjść.
**Sprawdzenie automatycznego tagowania to warunek konieczny uruchomienia kampanii,
nie punkt na liście życzeń.** Trafiło do `launch-checklist.md` §4 jako pozycja pierwsza.

## 12. Marka: nie kupować

**Nie dodaję słów `szabunia`, `marcin szabunia`, `szabunia fotograf`.**
Na zapytania markowe szabunia.pl jest wynikiem numer jeden organicznie, a odczyt SERP
z 20.09.2026 nie pokazał żadnego konkurenta licytującego tę markę. Przy 152 zł miesięcznie
płacenie za kliknięcie, które i tak przyjdzie za darmo, jest wprost stratą.

**Warunek zmiany:** jeśli kiedykolwiek pojawi się konkurent na zapytaniach markowych,
wtedy i tylko wtedy wraca osobna, tania kampania brandowa.

## 13. Ruch informacyjny

Zapytania typu „jak pozować do zdjęcia biznesowego", „jaki aparat", „fotografia biznesowa
poradnik" są odcięte na dwa sposoby: brak broad matcha oraz kategorie `poradniki i tutoriale`
i `praca i nauka` w `negative-keywords.csv` (łącznie 55 wykluczeń).

**Świadomie NIE wykluczyłem słów `cena` i `cennik`.** Zapytanie `sesja biznesowa poznań cena`
dało w historii 6 kliknięć i jest zapytaniem zakupowym, nie informacyjnym. Zgodnie
z `docs/zasady-tekstow.md` §Cennik to właśnie to słowo klient wpisuje w wyszukiwarkę.
