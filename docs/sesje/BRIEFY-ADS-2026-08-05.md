# Briefy — Google Ads, 5 sierpnia 2026

Stan wyjściowy: konto 786-864-4697, kampania „Pierwsza pro kampania", budżet 25 zł/dz.,
limit maks. stawki CPC 7,00 zł, okno odniesienia 06.07–04.08.2026 (504,84 zł / 81 klik. / 3 konw.).
Źródło: `AUDYT-GOOGLE-ADS-2026-08-05.md` (wersja po kontroli własnej pracy).
Ten plik = kompletna lista tego, co zostało do zrobienia po audycie.

**Zasada nadrzędna:** to są zmiany w panelu Google Ads, nie w kodzie. Żadna nie została
wykonana. Każda wymaga zgody Marcina, bo dotyka konfiguracji konta, budżetu albo celów.

**DoD dla każdego briefu w panelu:**
1. Przed zmianą: zapisz stan wyjściowy („przed") do `docs/sesje/`.
2. Zmiana wykonana jedną akcją, nie serią „przy okazji".
3. Po zmianie: jedna linijka — data, godzina, co, dlaczego, czego się spodziewasz.
4. Data kontrolna w kalendarzu: re-audyt 02.09.2026.

**Czego w tym pliku NIE ma, a było w pierwszej wersji:**
`ADS2608-02` scalony z `ADS2608-06` (jeden wiersz tabeli nie może dawać dwóch briefów).
`ADS2608-04` wycofany do hipotezy H6 — zamiast briefu naprawczego jest brief pomiarowy.

---

## BRIEF ADS2608-03 · Test end-to-end formularza — jedyna rzecz, która zamienia „3 konwersje" w wiedzę

**Status:** do wykonania · **rób jako pierwszy** · domyka jednocześnie ADS2608-01 i hipotezę H2

**Kontekst z liczbami:** w oknie 06.07–04.08 panel raportuje trzy konwersje: jedno
`contact_submit`, jedno `phone_click`, jedno `email_click`. Realnych wysłań formularza: jedno.
W skrzynce `marcin.szabunia@gmail.com` za 05.07–05.08 nie ma **żadnego** zapytania ofertowego.
W tej samej skrzynce jest alert bezpieczeństwa dla konta `marcin@szabunia.pl` z 06.07,
więc druga skrzynka istnieje i nie została sprawdzona.

**Kroki (piętnaście minut):**
1. Wyślij formularz na `szabunia.pl/kontakt` z realnymi danymi i dopiskiem „test 05.08".
2. GA4 → DebugView: czy zdarzenie się pojawia i pod jaką nazwą.
3. Ads → Cele: czy stan działania zmienia się na „Rejestruje konwersje" (do 24 h).
4. **Obie skrzynki:** czy mail dotarł. Jeśli nie dotarł do żadnej — problem jest po stronie
   dostarczalności (Resend), nie po stronie Ads, i to jest osobny, poważniejszy finding.
5. Zapisz wynik w `docs/sesje/` jako domknięcie H2.

**AC (mierzalne):** wiadomo, do której skrzynki trafiają zgłoszenia, i wiadomo, czy łańcuch
formularz → GA4 → Ads przechodzi. Jedno zdanie w dokumencie zamiast hipotezy.

**Stop:** żadnego — to czysta diagnostyka.

**ZGODA:** TAK — test własnego formularza jest autoryzowany tym briefem.

---

## BRIEF ADS2608-05 · Poprawić dwa sitelinki — pięć minut na obietnicę, której landing nie spełnia

**Status:** do wykonania · najtańsza poprawka w całym audycie

**Kontekst z liczbami:** raport powiązań komponentów, okno 06.07–04.08. Cztery z sześciu
komponentów mają datę ostatniej aktualizacji **8 lip 2026**, dwa wskazane 2 sierpnia jako
prowadzące na stronę główną mają **4 mar 2026, 00:50** — czyli po diagnozie nikt ich nie ruszył.

| Sitelink | Ostatnia aktualizacja | CTR wiersza |
|---|---|---|
| Portfolio („Realizacje z sesji biznesowych") | **4 mar 2026, 00:50** | 9,60% |
| Kontakt („Napisz lub zadzwoń / Bezpłatna wycena sesji zdjęciowej") | **4 mar 2026, 00:50** | 5,08% |

**Uwaga o liczbach, którą trzeba przeczytać przed dyskusją o priorytecie:** nie podaję kosztu
tych dwóch komponentów. Metryki w wierszu tej tabeli opisują reklamę wyświetloną z danym
komponentem, nie kliknięcia w sam komponent — wiersze sumują się do 494,70 zł i 81 kliknięć,
czyli do całej kampanii. Pierwsza wersja audytu wyliczyła z tego „154,78 zł, czyli 30,7%
wydatku" i **ta liczba została wycofana**. Uzasadnieniem briefu jest data 4 marca, nie kwota.

**Zmiana:** jedno pole w każdym komponencie.
- Portfolio → `https://szabunia.pl/portfolio`
- Kontakt → `https://szabunia.pl/kontakt`

**Gdzie:** Komponenty → Link do podstrony → edycja → „Końcowy URL".
Przed edycją **odczytaj i zapisz obecny URL** — audyt go nie potwierdził, twierdzenie
„prowadzi na stronę główną" pochodzi z dokumentu z 02.08.

**AC:**
- obecny URL obu komponentów zapisany w `docs/sesje/` przed zmianą
- kolumna „Ostatnia aktualizacja" dla obu = data zmiany, nie 4 mar 2026
- kliknięcie w podglądzie reklamy prowadzi na `/portfolio` i `/kontakt`, HTTP 200

**Stop:** jeśli komponent po edycji dostanie status „Odrzucony" — cofnąć treść i zgłosić.

**ZGODA:** NIE — zmiana w koncie, czeka na §12.3 audytu (rekomendacja: tak).

---

## BRIEF ADS2608-06 · Porządek w celach na poziomie konta — z trzech martwych pozycji na zero

**Status:** do wykonania po decyzji §12.1 audytu

**Kontekst z liczbami:** konto ma **26 działań konwersji, z czego 14 ma stan „Usunięta"**.
Trzy pozycje mają „Uwzględnione w celach na poziomie konta: Tak" i nie powinny:

| Działanie | Źródło | Stan śledzenia | Optymalizacja |
|---|---|---|---|
| Strona z danymi kontaktowymi (Default Google Ads Profile) | **Universal Analytics** | Usunięta | Podstawowe |
| Kliknięcia przycisku połączenia w reklamach inteligentnych | Połączenie z reklamy | Brak konwersji w ost. czasie | Podstawowe |
| `szabunia.pl (web) generate_lead` | GA4 | **Usunięta** | Podstawowe |

Pierwszy to finding z audytu 11.06, punkt 6 — osiem tygodni bez zmian. Trzeci to import
wysłania formularza, który audyt z 11.06 zalecał jako naprawę P0: został zrobiony i zdążył umrzeć.

**Zawężenie skutku, żeby nie robić z tego P0:** ta kampania używa celów **na poziomie kampanii**
(„Zależne od kampanii: Kontakty i Połączenia telefoniczne"), więc martwe pozycje w celach konta
nie psują jej dziś optymalizacji. Psują każdą nową kampanię, która odziedziczy cele konta,
i każdą kolejną analizę — bo `generate_lead` i `contact_submit` są oba „Podstawowe"
i z panelu nie wynika, który jest kanonicznym leadem.

**Warianty:**
- **A (rekomendowany).** Wypisać całą trójkę z celów konta, zostawić w tabeli jako historię.
  Odwracalne, zero utraty danych.
- **B.** Zostawić „Kliknięcia przycisku połączenia" — jeśli telefon ma być mierzonym kanałem.
  Ryzyko jawne: to działanie od miesięcy nie rejestruje niczego, więc dokłada szum, nie sygnał.

**Gdzie:** Cele → działanie → Edytuj ustawienia → „Uwzględnij w celach na poziomie konta".

**AC:** liczba działań podstawowych w celach konta ≤ 2, żadne ze stanem „Usunięta";
przy re-audycie 02.09 metryka „działania w celach konta ze stanem Usunięta" = **0**.

**Stop:** **nie kasować żadnego działania.** Wypisanie z celów ≠ usunięcie. Kasowanie zabiera historię.

**ZGODA:** NIE — wynika z decyzji §12.1.

---

## BRIEF ADS2608-H6 · Rozstrzygnąć, czy limit maks. stawki CPC w ogóle wiąże — pomiar, nie naprawa

**Status:** ZACZĄĆ OD POMIARU · to nie jest brief naprawczy, tylko rozstrzygający hipotezę

**Kontekst z liczbami:** jedna seria pomiarowa z panelu, 05.08.2026:

| Okres | Limit maks. CPC | Śr. CPC realny | Klik./dz. | Koszt/dz. | Konw. |
|---|---|---|---|---|---|
| 06.07–19.07 | 5,00 zł (od 6.07, 23:54) | **6,01 zł** | 2,0 | 12,01 zł | 0 |
| 20.07–04.08 | 7,00 zł | **6,35 zł** | 3,3 | 21,04 zł | 3 |

Wygląda to na dowód, że limit nie wiąże. **Nie jest dowodem** — i dlatego ten brief nie
zmienia żadnej wartości:
- limit ustawiono 6 lipca o 23:54, więc pierwsza doba podokna działała jeszcze bez limitu;
  przy 6–8 kliknięciach tego dnia po 9,70–8,52 zł (czerwcowy ostatni tydzień miał CPC 10,12 zł)
  sama ta doba tłumaczy większość różnicy;
- grupa „Sesje zespołowe" ma w oknie 1 kliknięcie za **6,99 zł przy limicie 7,00 zł** — to
  wygląda dokładnie jak limit wiążący;
- `[sesja biznesowa poznań]` z CPC 7,22 zł to średnia z 30 dni obejmujących oba reżimy.

**Kroki (piętnaście minut, sam odczyt):**
1. Kampanie → Ustawienia → kolumna „Aktywne dost. stawek" — czy jest cokolwiek.
2. Kampania → Urządzenia — wartości % dostosowań dla telefonów, tabletów, komputerów.
3. Kampania → Harmonogram reklam — czy przedziały mają mnożniki.
4. Kampania → Lokalizacje — czy region ma dostosowanie.
5. **Zakres dat 06.07–07.07, segment dzienny** — ile kliknięć i jaki CPC padł 6 lipca,
   a jaki 7 lipca. To jest krok rozstrzygający.

**AC:** wiadomo, czy istnieją dostosowania stawek i jakiej są wielkości, oraz ile kosztowały
kliknięcia z 6 lipca. Po tym H6 zamienia się w ustalenie albo znika.

**Stop:** **nie zmieniać żadnej wartości dostosowania ani limitu.** To odczyt.

**ZGODA:** TAK — odczyt bez zmian jest autoryzowany tym briefem.

---

## BRIEF ADS2608-11 · Ustalić, dlaczego `"portret biznesowy"` jest ograniczane — najpierw pomiar składowych

**Status:** ZACZĄĆ OD POMIARU

**Kontekst z liczbami:** `"portret biznesowy"` (dopasowanie do wyrażenia, grupa Portrety
i wizerunek): 90 wyświetleń, 11 kliknięć, **CTR 12,22%**, 65,50 zł, 0 konwersji.
Stan: **„Odpowiednia (ograniczona) — Rzadko wyświetlane (niski wynik jakości)"**.
To drugi co do wielkości wydatek w koncie.

Pozostałe z tym samym statusem: `"zdjęcia do cv"` (wstrzymane), `"headshot"` ×2 (Portrety
wstrzymane, Zespołowe), `"zdjęcia firmowe"` (Zespołowe).

CTR 12,22% mówi, że reklama jest trafna, a Google i tak ogranicza wyświetlenia.
**Która składowa wyniku jakości zawodzi — nie wiadomo.** Pierwsza wersja briefu wskazywała
stronę docelową i nazywała plik w repo; to była diagnoza bez pomiaru i została wycofana.

**Kroki:**
1. Słowa kluczowe → Kolumny → dodać „Wynik jakości", „Oczekiwany CTR", „Trafność reklamy",
   „Jakość strony docelowej". Odczytać trzy składowe dla pięciu słów z tym statusem.
2. Dopiero z tych trzech liczb wynika, czy to problem reklamy, dopasowania czy landingu.
3. Jeśli okaże się, że zawodzi „Jakość strony docelowej" — **wtedy** powstaje osobny brief
   dla repo, wymagający zgody na zmianę treści (stop-condition CLAUDE.md).

**AC:** trzy składowe wyniku jakości odczytane i zapisane dla pięciu słów; wskazana ta,
która zawodzi, z liczbą, nie z domysłem.

**Stop:** **nie zmieniać treści strony ani reklamy** na tym etapie.

**ZGODA:** TAK dla kroku 1 i 2 (odczyt i dodanie kolumn do widoku). NIE dla kroku 3.

---

## Wymagają zgody Marcina, zanim ktokolwiek dotknie

| Brief / decyzja | Czego dotyczy | Dlaczego zgoda |
|---|---|---|
| §12.1 | które zdarzenie jest kanonicznym leadem | decyzja biznesowa o definicji leada |
| ADS2608-05 | zmiana URL dwóch sitelinków | zmiana konfiguracji konta |
| ADS2608-06 | porządek w celach na poziomie konta | zmiana konfiguracji konta |
| ADS2608-11 krok 3 | treść podstrony usługi | stop-condition: treść i ceny |
| §12.2 | wartość limitu maks. CPC | decyzja budżetowa |
| §12.4 | los grupy Eventy | decyzja o ofercie i budżecie |
| §12.7 | czy wideo i dron wchodzą do Ads | decyzja o zakresie kanału |

## Poza panelem — Marcin ręcznie, agentowi nie zlecać

- **dostęp do skrzynki `marcin@szabunia.pl`** i sprawdzenie, czy trafiają tam maile
  z formularza (H2) — to pytanie numer jeden całego audytu
- Planer słów kluczowych: wolumen fraz eventowych i zespołowych (ADS2608-09, H5)
- decyzja o subskrypcji Supermetrics albo trwałym przejściu na odczyt z panelu
- usunięcie wersji roboczej „Kampania 9" (ADS2608-12)
- przywrócenie albo porzucenie filtru „fotograf biznesowy" w widoku słów (ADS2608-08)

## Czego NIE robić (zamknięte decyzje)

- **Nie włączać rozszerzenia na sieć reklamową**, mimo rekomendacji Google „+0,8%".
  Przy 25 zł dziennie i braku danych konwersji to najszybszy sposób na wydanie budżetu
  na przypadkowy ruch.
- **Nie przechodzić na „Maksymalizuj liczbę konwersji"** — wymaga kilkudziesięciu konwersji
  miesięcznie, konto ma trzy. Decyzja z 02.08 obowiązuje.
- **Nie podnosić budżetu** — kampania wykorzystuje 67,3% obecnego.
- **Nie włączać automatycznego stosowania rekomendacji.**
- **Nie kasować działań konwersji** — wypisywać z celów, nie usuwać.
- **Nie ruszać treści czterech RSA** — najlepsza ma CTR 8,36%, a kampania jest w fazie nauki
  po zmianach z 3–4 sierpnia; kolejna zmiana przedłuża naukę.
- **Nie ruszać frazy `"fotografia biznesowa"`** ani harmonogramu reklam.
- **Nie wykluczać frazy `fotograf`** ponownie bez policzenia kosztu — decyzja z 11.06
  („zostaje dla widoczności") nie została odwołana.
- **Nie dokładać grup dla wideo i drona** bez decyzji §12.7 — przy 25 zł dziennie
  rozdrobnienie kosztuje więcej, niż daje.

---

*Briefy sporządzone 2026-08-05 przez Claude na podstawie `AUDYT-GOOGLE-ADS-2026-08-05.md`.
Żadna zmiana nie została wykonana. Wykonanie: osobna sesja, po decyzjach z §12 audytu.*
