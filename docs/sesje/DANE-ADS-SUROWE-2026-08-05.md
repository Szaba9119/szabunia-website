# Dane surowe — audyt Google Ads 2026-08-05
Odczyty z panelu Google Ads, konto 786-864-4697, sesja Chrome 2026-08-05, 09:35-... UTC.

## Bramka dostępu
- Supermetrics MCP: 5 zapytan data_query -> blad "Your free trial on team Team marcin.szabunia
  has expired on 2026-06-03 (ID: 1747776)". Zero danych ta droga. Trace ID np. a27099290e67684d078130be41fb78a1.

## Kampania, okno 06.07-04.08.2026 (30 dni), strefa GMT+02:00
- Kliknięcia 81 (zmiana vs poprz. okres: -21)
- Śr. CPC 6,23 zł (+1,37 zł)
- Wyświetlenia 1 118 (-682)
- Koszt 504,84 zł (+8,35 zł)
- Współcz. interakcji (CTR) 7,25%
- Konwersje 3,00 · Współcz. konw. 3,70% · Koszt/konw. 168,28 zł
- Budżet 25,00 zł/dz. -> maks. 750 zł; wykorzystanie 504,84/750 = 67,3%
- Stan kampanii w tabeli: "Strategia ustalania stawek w trakcie nauki"
- Wynik optymalizacji 92,8% (metryka Google - pomijana w ustaleniach)

## Ustawienia kampanii (odczyt 2026-08-05)
- Nazwa: Pierwsza pro kampania · Stan: Aktywna · Sieci: Sieć wyszukiwania Google
- Strategia: Maksymalizuj liczbę kliknięć
- "Ustaw limit maksymalnej stawki za kliknięcie": ZAZNACZONE
- **Limit maksymalnej stawki CPC: 7,00 zł**
- Cele konwersji: "Zależne od kampanii: Kontakty i Połączenia telefoniczne - kontakty do potencjalnych klientów"
- Pozyskiwanie klientów: jednakowe stawki nowi/obecni · Reguły wartości: brak
- AI Max: WYŁĄCZONY (toggle off)
- Optymalizacja komponentów: "Wyłączono dostosowywanie tekstu i rozwinięcie końcowego adresu URL"
- Wyszukiwania z nazwą marki: "Wyświetlanie reklam we wszystkich trafnych wyszukiwaniach"
- Lokalizacje: **Województwo wielkopolskie, Polska (region)**
- Języki: polski
- Data rozpoczęcia: 5 lutego 2025 · Data zakończenia: nie ustawiono
- Dynamiczne reklamy w wyszukiwarce (DSA): pole "Website" PUSTE -> DSA nieskonfigurowane
- Rotacja reklam: Optymalizuj - wybieraj najskuteczniejsze reklamy
- Opcje adresu URL kampanii: brak · Pliki z adresami stron docelowych: brak
- Wykluczenia adresów IP: 85.221.156.139

## Historia zmian, okno 06.07-04.08, filtr "Określanie stawek" (2 z 2)
1. 6 lip 2026, 23:54:38 - marcin.szabunia@gmail.com, Klient webowy (zmiana ręczna), "Zmieniono Kampania"
2. **20 lip 2026, 12:51:50 - marcin.szabunia@gmail.com, Klient webowy (zmiana ręczna):
   "Zwiększono wartość Limit stawki z 5,00 zł do 7,00 zł"**

Chipy filtrów historii zmian (szare = brak zmian w oknie):
- Budżet: SZARY (brak zmian budżetu)
- Lokalizacja: SZARY (brak zmian lokalizacji w oknie -> zmiana na woj. wielkopolskie przed 06.07)
- Odbiorcy: SZARY · Komponent: SZARY · Plik danych: SZARY
- Aktywne: Określanie stawek, Język, Konwersja, Stan, Inne
- Podfiltry stawek: "Zwiększenie limitu" aktywny, "Zmniejszenie limitu" szary

## Historia zmian, wszystkie zmiany (widoczne pierwsze wiersze, >50 pozycji w oknie)
- 4 sie 2026, 11:03:02 - 1 dodane słowo kluczowe w dopasowaniu ścisłym (grupa Portrety i wizerunek)
- 3 sie 2026, 16:31:04 - 1 USUNIĘTE wykluczające słowo kluczowe w dopasowaniu do wyrażenia (kampania)
- 3 sie 2026, 15:26:07 - 3 dodane słowa kluczowe w dopasowaniu ścisłym (Portrety i wizerunek)
- 3 sie 2026, 15:17:58 - 2 dodane wykluczające w dopasowaniu przybliżonym (Fotografia produktowa)
- 3 sie 2026, 15:15:35 - 2 dodane wykluczające w dopasowaniu przybliżonym (kampania)
- 3 sie 2026, 15:10:40 - 1 USUNIĘTE wykluczające w dopasowaniu przybliżonym (kampania)
- 3 sie 2026, 09:42:13 - zmiana, której nie można cofnąć
SPRZECZNOŚĆ DO ODNOTOWANIA: chip "Komponent" w historii zmian za okno 06.07-04.08 jest SZARY
(brak zmian komponentów), a tabela komponentów podaje "Ostatnia aktualizacja: 8 lip 2026, 13:19"
dla czterech sitelinków, czyli wewnątrz okna. Jednego z tych odczytów nie da się pogodzić
z drugim. Dla findingu ADS2608-05 bez znaczenia: 4 marca jest przed 2 sierpnia tak czy inaczej.

## Rozbicie okna wg daty zmiany limitu (jedna seria pomiarowa, panel 2026-08-05)

| Okres | Dni | Limit CPC | Wyśw. | Klik. | CTR | Śr. CPC | Koszt | Konw. | Koszt/konw. |
|---|---|---|---|---|---|---|---|---|---|
| 06.06-05.07 (poprzedni audyt) | 30 | brak (do 06.07) | 1 800 | 102 | 5,67% | 4,87 zł | 496,49 zł | 1,00 | 496,49 zł |
| 06.07-19.07 | 14 | 5,00 zł | 432 | 28 | 6,48% | 6,01 zł | 168,18 zł | 0,00 | - |
| 20.07-04.08 | 16 | 7,00 zł | 686 | 53 | 7,73% | 6,35 zł | 336,66 zł | 3,00 | 112,22 zł |
| 06.07-04.08 (okno audytu) | 30 | 5 -> 7 | 1 118 | 81 | 7,25% | 6,23 zł | 504,84 zł | 3,00 | 168,28 zł |

Wydatek dzienny: 06.07-19.07 = 12,01 zł/dz. · 20.07-04.08 = 21,04 zł/dz. (budżet 25 zł).

ANOMALIA DO WYJAŚNIENIA: w okresie 06.07-19.07 limit maks. stawki CPC wynosił 5,00 zł,
a średni CPC wyniósł 6,01 zł. Średni CPC nie może przekroczyć limitu stawki, jeśli limit
jest wiążący -> hipoteza: dostosowania stawek (urządzenia / lokalizacja / harmonogram)
mnożą się na limicie. DO SPRAWDZENIA: kolumna "Aktywne dost. stawek".

## Grupy reklam, 06.07-04.08 (panel 05.08)
| Grupa | Stan | Wyśw. | Klik. | CTR | Śr. CPC | Koszt | Konw. | Koszt/konw. |
|---|---|---|---|---|---|---|---|---|
| Portrety i wizerunek | Odpowiednia | 742 | 62 | 8,36% | 6,23 zł | 386,15 zł | 2,00 | 193,08 zł |
| Fotografia produktowa | Odpowiednia | 361 | 18 | 4,99% | 6,21 zł | 111,70 zł | 1,00 | 111,70 zł |
| Sesje zespołowe | Odpowiednia | 6 | 1 | 16,67% | 6,99 zł | 6,99 zł | 0,00 | - |
| Eventy i reportaże | Odpowiednia | 9 | 0 | 0,00% | - | 0,00 zł | 0,00 | - |
Udział kosztu: Portrety 76,5% · Produktowa 22,1% · Zespołowe 1,4% · Eventy 0%.

Największe zmiany 30 dni vs poprzednie 30 dni (kafel Przegląd):
Eventy -65,50 zł (-100%) · Portrety +34,96 zł (+9,96%) · Produktowa +31,89 zł (+39,97%) · Zespołowe +6,99 zł

## Słowa kluczowe, 62 pozycje (włączone+wstrzymane), TOP wg kosztu
Łącznie w widoku: 1 003 wyśw. / 73 klik. / 455,24 zł / 3,00 konw.
(kampania: 1 118 / 81 / 504,84 zł -> 49,60 zł i 8 kliknięć poza słowami włączonymi/wstrzymanymi)

| Słowo | Typ | Grupa | Stan | Wyśw | Klik | CTR | Śr. CPC | Koszt | Konw |
|---|---|---|---|---|---|---|---|---|---|
| "fotografia biznesowa" | fraza | Portrety | Odpowiednia | 166 | 13 | 7,83% | 6,41 zł | 83,37 zł | 1,00 |
| "portret biznesowy" | fraza | Portrety | Ogr. - niski QS | 90 | 11 | 12,22% | 5,95 zł | 65,50 zł | 0 |
| [sesja biznesowa poznań] | ścisłe | Portrety | Odpowiednia | 43 | 9 | 20,93% | **7,22 zł** | 64,94 zł | 1,00 |
| "sesja biznesowa" | fraza | Portrety | Odpowiednia | 159 | 11 | 6,92% | 5,59 zł | 61,45 zł | 0 |
| "zdjęcia do linkedin" | fraza | Portrety | Odpowiednia | 67 | 6 | 8,96% | 5,70 zł | 34,21 zł | 0 |
| "zdjęcia produktowe" | fraza | Produktowa | Odpowiednia | 71 | 5 | 7,04% | 6,47 zł | 32,33 zł | 0 |
| "zdjęcia do cv" | fraza | Portrety | Wstrzymana, niski QS | 36 | 3 | 8,33% | **8,74 zł** | 26,22 zł | 0 |
| "sesja wizerunkowa" | fraza | Portrety | Odpowiednia | 56 | 4 | 7,14% | 5,29 zł | 21,18 zł | 0 |
| "zdjęcia produktowe poznań" | fraza | Produktowa | Odpowiednia | 13 | 3 | 23,08% | 6,05 zł | 18,16 zł | 0 |
| "packshot" | fraza | Produktowa | Odpowiednia | 125 | 2 | 1,60% | 5,80 zł | 11,61 zł | 1,00 |
| "zdjęcia zespołu" | fraza | Zespołowe | Odpowiednia | 2 | 1 | 50,00% | 6,99 zł | 6,99 zł | 0 |
| "headshot" | fraza | Portrety | Wstrzymana, niski QS | 30 | 1 | 3,33% | 6,76 zł | 6,76 zł | 0 |
(z kafla Przegląd: "fotografia produktowa" USUNIĘTE - 36,28 zł / 7 klik. / CTR 6,14%)

Statusy diagnostyczne "Rzadko wyświetlane (niski wynik jakości)": "portret biznesowy",
"zdjęcia do cv" (wstrzymane), "headshot" (Portrety, wstrzymane), "headshot" (Zespołowe),
"zdjęcia firmowe" (Zespołowe). "Mała liczba wyszukiwań": "sesja firmowa dla zespołu".

FILTR WIDOKU: zakładka Słowa kluczowe miała zostawiony filtr
"Tekst słowa kluczowego zawiera fotograf biznesowy" -> widok pokazywał 3 z 62 słów.
Filtr usunąłem na czas audytu (stan widoku, zero wpływu na emisję). Odnotowane w raporcie.

## Działania powodujące konwersję: 26 pozycji (panel Cele, filtr Stan: Wszystkie)
Kafel "Stan śledzenia konwersji": Nieprawidłowe połączenie 1 · Nie zweryfikowano 0 ·
Brak konwersji w ostatnim czasie 10 · **Rejestruje konwersje 1**

Konwersje w oknie (3,00 razem):
- szabunia.pl (web) phone_click - GA4 - **Aktywne** - Dodatkowy - okno 90 dni - w celach konta: NIE - 1,00
- szabunia.pl (web) contact_submit - GA4 - Brak konwersji w ostatnim czasie - **Podstawowe** - w celach konta: TAK - 1,00
- Kontakt (Zdarzenie GA email_click) - GA4 - Brak konwersji w ostatnim czasie - Dodatkowy - NIE - 1,00

Uwzględnione w celach na poziomie konta = TAK, a nie powinny:
- Strona z danymi kontaktowymi (Default Google Ads Profile) - **UA** - Usunięta - Podstawowe - TAK
- Kliknięcia przycisku połączenia w reklamach inteligentnych - Podstawowe - TAK
- **szabunia.pl (web) generate_lead - Witryna (GA4) - Usunięta - Podstawowe - Jedna - 90 dni - TAK - 0,00 / 0,00**

Inne istotne:
- szabunia.pl (web) calculator_done - Usunięta - Podstawowe - NIE (spójne z usunięciem kalkulatora)
- Wyświetlenie strony (Zdarzenie GA generate_lead) - **Nieaktywny** - Dodatkowy - NIE (błędne mapowanie z 11.06, dalej jest)
- SUBMIT_LEAD_FORM - Usunięta - Dodatkowy - NIE
- 4 relikty "Adobe marcinszabunia.pl - GA4 (web) ..." - Usunięte
- 8 reliktów kampanii inteligentnych / Business Profile / Local actions

Cele wg grup: Kontakty 3 (phone_click, contact_submit, email_click, połączenia 0) ·
Prośby o wycenę 0 · Cele grupy 3 puste.
Kampanie podpięte: Kontakt 1z1 · Połączenie telefoniczne 1z1 · Uzyskaj wskazówki 0z1 ·
Zaangażowanie 0z1 · Wyświetlenie strony 0z1

## Komponenty typu "Link do podstrony" (6 z 6), okno 06.07-04.08
| Sitelink | Ost. aktualizacja | Wyśw | Klik | CTR | Śr. CPC | Koszt |
|---|---|---|---|---|---|---|
| Sesje zespołowe | 8 lip 2026, 13:19 | 256 | 23 | 8,98% | 6,22 zł | 143,05 zł |
| Portfolio | **4 mar 2026, 00:50** | 198 | 19 | 9,60% | 6,29 zł | 119,46 zł |
| Fotografia produktowa | 8 lip 2026, 13:19 | 136 | 9 | 6,62% | 6,22 zł | 56,01 zł |
| Sesje biznesowe | 8 lip 2026, 13:19 | 131 | 18 | 13,74% | 5,72 zł | 102,99 zł |
| Kontakt | **4 mar 2026, 00:50** | 118 | 6 | 5,08% | 5,89 zł | 35,32 zł |
| Fotografia eventowa | 8 lip 2026, 13:19 | 108 | 6 | 5,56% | 6,31 zł | 37,87 zł |
Łącznie linki do podstron: 373 wyśw. / 34 klik. / 202,82 zł
UWAGA INTERPRETACYJNA: wiersze per komponent sumują się do 947 wyśw. / 81 klik. / 494,70 zł,
czyli do CAŁEJ kampanii (81 kliknięć), a suma wszystkich typów komponentów to 849,86 zł =
168% kosztu kampanii. Metryki w wierszu opisują REKLAMĘ WYŚWIETLONĄ Z TYM KOMPONENTEM,
nie kliknięcia w sam komponent. Nie wolno z nich liczyć kosztu pojedynczego sitelinku.
Łącznie obrazy 343,37 zł · logo 45,90 zł · objaśnienia 257,77 zł · rozszerzenia informacji 0 zł

## Urządzenia (kafel Przegląd, 30 dni)
Koszt: telefony 39,4% · tablety 0,0% · komputery 60,6%
Wyświetlenia: 42,4% / 0,1% / 57,5% · Kliknięcia: 38,3% / 0,0% / 61,7%

## Reklama najczęściej wyświetlana (Portrety i wizerunek)
"Klienci: H&M, Santander · Ceny netto + VAT · Fotograf w Poznaniu · Oferta w 24h"
"Usługi: Portrety biznesowe, Fotografia eventowa, Zdjęcia produktowe, Wideo wizerunkowe"
Sitelinki w podglądzie: Sesje zespołowe · Portfolio · Kontakt · Sesje biznesowe
Stan Aktywna / Odpowiednia · 742 wyśw. · 62 klik. · CTR 8,36% · reklam w wyszukiwarce: 4

## Wyszukiwania (kafel Przegląd - BEZ KWOT, tylko lista wg wyświetleń)
Top: sesja biznesowa · fotografia produktowa · packshoty · sesja biznesowa poznan ·
zdjęcie biznesowe · packshot · fotografia biznesowa poznań · fotografia produktowa poznan ·
packshot co to · sesja biznesowa poznań cena
Kandydaci do wykluczenia widoczni na liście (BEZ KWOT - nie da się policzyć wycieku):
- informacyjne: "packshot co to", "packshoty co to", "co to packshot",
  "fotografia produktowa szkolenie", "fotografia produktowa zlecenia",
  "zestaw do fotografii produktowej", "fotografia produktowa cennik"
- CV (B2C): "zdjęcia do cv", "zdjecia do cv", "zdjęcia do cv poznań",
  "profesjonalne zdjęcia do cv", "profesjonalne zdjecia do cv", "zdjecie biznesowe do cv", "cv photo"
- konkurenci/marki: "fotograf biznesowy & headshot leszno jakub lipnicki",
  "krzysztof zaleski fotograf", "mana studio", "gopackshot", "headshot pro",
  "packshot fotografia produktowa studyjna i reklamowa poznań"
- angielskie: "business photo session", "linkedin photo", "professional photo for linkedin",
  "photo linkedin", "linkedin profile photo"
- inne: "ai sesja biznesowa"
- marka własna: "marcin szabunia fotograf biznesowy"

## Płatności i konto
Saldo 5 sie 2026: 64,94 zł · następna płatność automatyczna 1 wrz 2026 · Mastercard ...7401
Wersja robocza: "Kampania 9", typ Inteligentna, utworzona 4.03.2026 08:03, bez grup i słów kluczowych.
Rekomendacja Google w koncie: "Użyj rozszerzenia na sieć reklamową (+0,8%)" - NIE stosować.
Automatyczne stosowanie rekomendacji: WYŁĄCZONE (panel proponuje włączenie).
Diagnostyka konta: "Strategia ustalania stawek jest w trakcie nauki po ostatniej zmianie
wprowadzonej w grupach reklam lub słowach kluczowych" (zmiany słów 3-4 sierpnia).

## Ground truth spoza Ads: skrzynka marcin.szabunia@gmail.com
Zapytanie: after:2026/07/05 before:2026/08/05 + warianty (szabunia.pl, formularz, wycena,
zapytanie, resend, lead magnet, poradnik). Wynik: **ZERO zapytań ofertowych w oknie audytu.**
Jedyny wątek biznesowy w skrzynce (SCALIO) pochodzi z czerwca. Wątek "Kuchnia Skoczowska"
z 16.07 to sprawa prywatna, nie lead.
OGRANICZENIE: powiadomienia z formularza mogą trafiać na marcin@szabunia.pl (osobne konto -
w skrzynce widnieje alert bezpieczeństwa dla marcin@szabunia.pl z 06.07). Do tej skrzynki
nie mam dostępu, więc ground truth jest NIEPEŁNY.
