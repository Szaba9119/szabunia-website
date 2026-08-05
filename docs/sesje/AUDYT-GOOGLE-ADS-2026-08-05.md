# Audyt Google Ads — 5 sierpnia 2026

**Zakres:** konto 786-864-4697, kampania „Pierwsza pro kampania". Moduł D metodyki: pomiar
i kanał płatny. Moduły A / B / C / E poza zakresem (pokryte audytami z 29.07 i 04.08).
**Okno czasowe:** 06.07–04.08.2026 (30 pełnych dni). Porównanie: 06.06–05.07.2026.
Podokna wg daty zmiany w koncie: 06.07–19.07 i 20.07–04.08.
**Metoda:** sesja Chrome na żywo w panelu Google Ads, 05.08.2026, 09:35–11:10 UTC, wyłącznie
odczyt; jedna seria pomiarowa, strefa GMT+02:00. Ground truth: skrzynka
`marcin.szabunia@gmail.com`, okno 05.07–05.08. Wersja po weryfikacji własnej pracy
(patrz §10 — pięć ustaleń wycofano lub obniżono przed publikacją).
**Wykluczone:** GA4 (osobny panel), GBP, treść strony docelowej, Supermetrics
(trial zespołu wygasł 03.06.2026 — pięć zapytań, ten sam błąd subskrypcji).
**Plan źródłowy:** `PLAN-AUDYT-GOOGLE-ADS-2026-08-05.md` · **Prompt:** `PROMPT-AUDYT-GOOGLE-ADS-2026-08-05.md`

> Dokument diagnostyczny. **W koncie nie wprowadzono żadnej zmiany.** Jeden wyjątek dotyczy
> stanu widoku, nie konfiguracji: usunąłem zostawiony filtr tabeli w zakładce Słowa kluczowe
> („Tekst słowa kluczowego zawiera fotograf biznesowy"), bo pokazywał 3 z 62 słów i uniemożliwiał
> odczyt. Filtr nie wpływa na emisję ani na wydatek. Odnotowane jako `ADS2608-08`.

---

## 0. TL;DR

W oknie 06.07–04.08 kampania wydała **504,84 zł** (67,3% z możliwych 750 zł) na **81 kliknięć**
(−21) i **1 118 wyświetleń** (−682, czyli −37,9%). Średni CPC wzrósł z 4,87 zł do **6,23 zł**
(+1,37 zł, +28,0%). CTR poprawił się z 5,67% do **7,25%**. Panel pokazuje **3 konwersje**
i koszt konwersji 168,28 zł.

Te trzy „konwersje" to jedno wysłanie formularza, jedno kliknięcie w numer telefonu i jedno
kliknięcie w adres e-mail. Kliknięcie w link to intencja kontaktu, nie kontakt. W skrzynce
`marcin.szabunia@gmail.com` w całym oknie nie ma ani jednego zapytania ofertowego — ale
istnieje druga skrzynka (`marcin@szabunia.pl`), do której nie mam dostępu i do której
najprawdopodobniej trafiają powiadomienia z formularza. **Dlatego audyt nie rozstrzyga,
czy kampania przyniosła zapytanie. Rozstrzyga, że nie da się tego sprawdzić z panelu.**

| Obszar | Stan 05.08 | Zmiana vs audyt 06.07 |
|---|---|---|
| Wydatek / budżet | 504,84 zł / 67,3% | ➖ praktycznie bez zmian (+8,35 zł) |
| Kliknięcia | 81 | ⚠️ −21 (−20,6%) |
| Wyświetlenia | 1 118 | ⚠️ −682 (−37,9%) |
| Śr. CPC | 6,23 zł | ⚠️ +1,37 zł (+28,0%) — trzeci miesiąc wzrostu |
| CTR | 7,25% | ✅ +1,58 p.p. |
| Konwersje | 3,00 | ✅ z 1,00 |
| Skład konwersji | 1 formularz + 2 kliknięcia w link | ❌ nowa obserwacja, wcześniej niebadana |
| Ground truth (skrzynka) | 0 zapytań w tej, którą widzę | ⚠️ druga skrzynka niesprawdzona |
| Sitelinki Portfolio + Kontakt | nietknięte od 4.03.2026 | ❌ bez zmian po diagnozie z 02.08 |
| Limit maks. CPC | 7,00 zł (od 20.07) | ⚠️ podniesiony z 5,00 zł bez zapisu |
| Higiena ustawień (sieci, AI Max, DSA, języki, IP) | czysto | ✅ bez zarzutu |

**Wniosek nadrzędny:** przy 81 kliknięciach i 3 zdarzeniach miesięcznie **żadna optymalizacja
kampanii nie jest mierzalna** — więc pierwszy ruch nie polega na zmianie stawek ani struktury,
tylko na zbudowaniu jednej niezależnej ścieżki potwierdzania leadów (skrzynka + test
end-to-end). Dopóki nie wiadomo, czy jedno `contact_submit` z tego okna odpowiada realnemu
mailowi, każda liczba w kolumnie „Konwersje" jest deklaracją Google o samym sobie.

**Jedna decyzja do podjęcia teraz:** gdzie trafiają maile z formularza i kto ma do tej
skrzynki dostęp (§12.6). Bez tego pozostałe pięć decyzji jest przedwczesnych.

---

## 1. Ocena kanału płatnego

### 51 / 100

Arytmetyka jest jawna: siedem obszarów po 10 punktów, prosta średnia, 36/70 = 51,4.
Obszary „pomiar" i „higiena celów" zostały **połączone w jeden**, bo punktowane były
z tej samej tabeli i tej samej usterki — trzymanie ich osobno sztucznie zaniżało ocenę
(anty-wzorzec: kaskada z jednego błędu).

| Obszar | Ocena | Komentarz |
|---|---|---|
| Higiena ustawień kampanii | 9/10 | patrz §2 — nic tu nie jest zepsute |
| Struktura grup vs oferta | 5/10 | 2 z 4 grup martwe; wideo i dron nie mają żadnej grupy |
| Słowa kluczowe i dopasowania | 6/10 | 62 słowa, sensowne frazowe i ścisłe, 5 z niskim wynikiem jakości |
| Kontrola kosztu kliknięcia | 4/10 | CPC +28% m/m, mechanizm nierozstrzygnięty (H6) |
| Komponenty | 5/10 | CTR dobry, dwa linki nietknięte od marca |
| Pomiar i higiena celów | 4/10 | działa jedna ścieżka, wokół niej 14 usuniętych działań |
| Proces i dokumentacja zmian | 3/10 | zmiany bez zapisu, zostawione filtry, decyzje z 02.08 nadal otwarte |

Uzasadnienie: konfiguracja kampanii jest higienicznie dobra i to podnosi ocenę. Ciągnie ją
w dół nie tyle „zepsuty pomiar" (bo podstawowa ścieżka `contact_submit` istnieje i raz
zadziałała), ile **brak niezależnego potwierdzenia** i proces, w którym zmiany zapadają
w panelu, a nie w dokumentach.

---

## 2. Sprawdzone i OK (zweryfikowane)

- ✅ **Sieci: tylko „Sieć wyszukiwania Google"** — sieć reklamowa i partnerzy wyłączeni.
- ✅ **AI Max wyłączony.**
- ✅ **Optymalizacja komponentów:** „Wyłączono dostosowywanie tekstu i rozwinięcie końcowego adresu URL".
- ✅ **DSA nieskonfigurowane** — pole „Website" puste (patrz §10.1, to był mój fałszywy pozytyw).
- ✅ **Język: polski** (jeden).
- ✅ **Wykluczenie własnego IP:** 85.221.156.139.
- ✅ **Rotacja reklam:** „Optymalizuj — wybieraj najskuteczniejsze reklamy".
- ✅ **Automatyczne stosowanie rekomendacji: wyłączone** (patrz §10.2).
- ✅ **Budżet nietknięty przez całe okno** — kategoria „Budżet" w historii zmian wyszarzona.
- ✅ **Wszystkie cztery grupy mają stan „Odpowiednia"**, kampania „Aktywna".
- ✅ **Reguły wartości konwersji: brak.**
- ✅ **Cel „Kontakt" podpięty do kampanii: 1 z 1**, „Połączenie telefoniczne": 1 z 1.
- ✅ **`contact_submit` jest działaniem podstawowym w grupie celów, której kampania faktycznie używa** — i w oknie zarejestrował 1,00 konwersji. Ścieżka pomiaru formularza istnieje i przynajmniej raz zadziałała.
- ✅ **CTR wzrósł z 5,67% do 7,25%.** Sam wzrost jest faktem. Przyczyna — nie (patrz §10.4).

---

## 3. Ustalenia — P0

**1. [POMIAR] Nie da się potwierdzić żadnego zapytania z kampanii poza panelem Google** — Cele → działania konwersji, okno 06.07–04.08; Gmail, okno 05.07–05.08. · P0 · M · 🧑 · Z (panel) + N (ground truth niepełny)

Skład kolumny „Konwersje: 3,00":

| Działanie | Grupa celu | Optymalizacja | Model zliczania | Konwersje |
|---|---|---|---|---|
| `szabunia.pl (web) contact_submit` | Kontakty | **Podstawowe** | Jedna | 1,00 |
| `szabunia.pl (web) phone_click` | Kontakty | Dodatkowy | Jedna | 1,00 |
| `Kontakt (Zdarzenie GA email_click)` | Kontakty | Dodatkowy | **Każda** | 1,00 |

Kampania używa celów **na poziomie kampanii** („Zależne od kampanii: Kontakty i Połączenia
telefoniczne"), więc do kolumny „Konwersje" wpada cała grupa „Kontakty" — także dwa działania
dodatkowe. Kliknięcie w numer telefonu i kliknięcie w adres e-mail to intencja kontaktu,
nie kontakt. Realnych wysłań formularza w oknie: **jedno**.

Ground truth ze skrzynki `marcin.szabunia@gmail.com` (06.07–04.08, zapytania po: szabunia.pl,
formularz, wycena, zapytanie, resend, lead magnet, poradnik): **zero zapytań ofertowych**.
Jedyny wątek biznesowy w skrzynce (SCALIO) pochodzi z czerwca.

**Ograniczenie, które trzeba przeczytać razem z powyższym:** w tej samej skrzynce jest alert
bezpieczeństwa dla konta `marcin@szabunia.pl` z 06.07 — czyli istnieje druga skrzynka,
do której najprawdopodobniej trafiają powiadomienia z formularza i do której nie mam dostępu.
**Nie twierdzę, że formularz nie dowozi maili.** Twierdzę, że w skrzynce, którą mogłem
sprawdzić, potwierdzenia nie ma, i że bez drugiej skrzynki cały łańcuch pomiarowy kończy się
na słowie Google.

Skutek biznesowy: przy 504,84 zł na okno i jednym wysłaniu formularza różnica między
„kanał działa słabo" a „kanał nie działa" jest różnicą między dalszym wydawaniem
a wstrzymaniem. Panel jej nie rozstrzyga.

Poprawka: test end-to-end plus dostęp do drugiej skrzynki. Brief `ADS2608-03`.

---

## 4. Ustalenia — P1

**2. [POMIAR] Konto ma 26 działań konwersji, z czego 14 ma stan „Usunięta", a trzy martwe pozycje wciąż siedzą w celach na poziomie konta** — Cele → wszystkie działania, filtr „Stan: Wszystkie", 05.08.2026. · P1 · S · 🌐 · Z (panel)

| Działanie | Źródło | Stan śledzenia | Optymalizacja | W celach konta |
|---|---|---|---|---|
| Strona z danymi kontaktowymi (Default Google Ads Profile) | **Universal Analytics** | Usunięta | Podstawowe | **Tak** |
| Kliknięcia przycisku połączenia w reklamach inteligentnych | Połączenie z reklamy | Brak konwersji w ost. czasie | Podstawowe | **Tak** |
| `szabunia.pl (web) generate_lead` | GA4 | **Usunięta** | Podstawowe | **Tak** |

Pierwszy wiersz to **dokładnie ten sam finding, co punkt 6 z audytu 11.06** („relikty UA:
Usunięta, a wciąż uwzględnione w celach konta: Tak"). Osiem tygodni później: bez zmian.
Trzeci to import wysłania formularza, który audyt z 11.06 zalecał jako naprawę P0 —
został zrobiony i zdążył umrzeć.

**Zawężenie skutku (korekta wobec pierwszej wersji tego raportu):** ta kampania używa celów
na poziomie kampanii, więc martwe działania w celach **konta** nie psują jej dziś optymalizacji.
Psują dwie inne rzeczy: każdą nową kampanię, która odziedziczy cele konta, oraz każdą kolejną
analizę, bo `generate_lead` i `contact_submit` są oba oznaczone jako „Podstawowe" i z panelu
nie wynika, który jest kanonicznym leadem.

Poprawka: wypisać trójkę z celów konta (nie kasować — kasowanie zabiera historię)
i rozstrzygnąć, które zdarzenie jest kanonicznym leadem. Brief `ADS2608-06`, decyzja §12.1.

---

**3. [UX] Sitelinki „Portfolio" i „Kontakt" nie były ruszane od 4.03.2026 — czyli diagnoza z 02.08 nie doczekała się poprawki** — raport powiązań komponentów, kolumna „Ostatnia aktualizacja", 05.08.2026. · P1 · S · 🌐 · Z (data) + N (adres URL i koszt)

| Sitelink | Ostatnia aktualizacja | CTR wiersza |
|---|---|---|
| Sesje zespołowe | 8 lip 2026, 13:19 | 8,98% |
| **Portfolio** („Realizacje z sesji biznesowych") | **4 mar 2026, 00:50** | 9,60% |
| Fotografia produktowa | 8 lip 2026, 13:19 | 6,62% |
| Sesje biznesowe | 8 lip 2026, 13:19 | 13,74% |
| **Kontakt** („Napisz lub zadzwoń / Bezpłatna wycena sesji zdjęciowej") | **4 mar 2026, 00:50** | 5,08% |
| Fotografia eventowa | 8 lip 2026, 13:19 | 5,56% |

Cztery komponenty mają datę lipcową, dwa wskazane 2 sierpnia jako prowadzące na stronę główną
mają datę sprzed pięciu miesięcy. Data 4 marca jest wcześniejsza od diagnozy, więc nikt ich
po diagnozie nie ruszył. „Portfolio" ma jednocześnie **najwyższy CTR w zestawie po Sesjach
biznesowych** — obietnica działa, a landing jej nie spełnia.

**Czego ten finding NIE twierdzi (korekta wobec pierwszej wersji):**
- Nie podaję kosztu tych dwóch komponentów. Wiersze tej tabeli sumują się do 494,70 zł
  i 81 kliknięć, podczas gdy stopka „Łącznie: linki do podstron" mówi 202,82 zł i 34 kliknięcia,
  a suma wszystkich typów komponentów daje 849,86 zł, czyli 168% kosztu kampanii.
  Metryki w wierszu opisują **reklamę wyświetloną z tym komponentem**, nie kliknięcia
  w sam komponent. Pierwsza wersja raportu wyliczyła z tego „154,78 zł, czyli 30,7% wydatku" —
  **to było błędne i zostało wycofane** (§10.3).
- Nie odczytałem samego adresu URL — nie otwierałem edytora komponentu. Twierdzenie
  „prowadzi na stronę główną" pochodzi z `ADS-EVENTY-DIAGNOZA-2026-08-02.md` §7.
- Data „8 lip 2026" przy czterech komponentach jest **sprzeczna** z historią zmian, w której
  kategoria „Komponent" za to samo okno jest wyszarzona (czyli: brak zmian komponentów).
  Jednego z tych dwóch odczytów nie umiem pogodzić. Dla samego findingu to bez znaczenia —
  4 marca jest przed 2 sierpnia niezależnie od interpretacji kolumny.

Poprawka: jedno pole w każdym komponencie. Brief `ADS2608-05`.

---

## 5. Ustalenia — P2 / P3 / P4

**4. [BIZNES] Limit maks. CPC podniesiony 20.07 z 5,00 na 7,00 zł, bez zapisu w żadnym dokumencie** — historia zmian, filtr „Określanie stawek". · P2 · S · 🧑 · Z (panel)

Dosłowny wpis: *20 lip 2026, 12:51:50 · marcin.szabunia@gmail.com · Klient webowy (zmiana
ręczna) · **„Zwiększono wartość Limit stawki z 5,00 zł do 7,00 zł"***. Druga i jedyna zmiana
stawek w oknie to wpis z 6 lip 2026, 23:54:38, opisany w panelu tylko jako „Zmieniono
Kampania" (że chodzi o ustawienie limitu 5,00 zł, wiem z audytu 06.07, nie z panelu).

Podokna, jedna seria pomiarowa:

| Okres | Dni | Wyśw./dz. | Klik./dz. | Koszt/dz. | Śr. CPC | CTR | Konwersje |
|---|---|---|---|---|---|---|---|
| 06.07–19.07 | 14 | 30,9 | 2,0 | 12,01 zł | 6,01 zł | 6,48% | 0 |
| 20.07–04.08 | 16 | 42,9 | 3,3 | 21,04 zł | 6,35 zł | 7,73% | 3 |

Po podniesieniu limitu jest +65,6% kliknięć dziennie i pierwsze konwersje, przy CPC wyższym
o 5,7%. **Nie twierdzę, że to skutek podniesienia limitu** — w tym samym oknie zaszło ponad
50 innych zmian, w tym dodania słów kluczowych 3–4 sierpnia i dwa **usunięte** wykluczenia
3 sierpnia. Korelacja jest, kontroli nad resztą nie ma (H7).

Finding dotyczy **procesu, nie decyzji**: zmiana zapadła dokładnie w dniu, na który audyt
z 06.07 wyznaczył punkt kontrolny, i nie została nigdzie zapisana. Przez to dzisiejszy audyt
musiał najpierw odkryć, że porównuje dwa różne ustawienia.

Poprawka: każda zmiana w panelu ląduje jedną linijką w `docs/sesje/` — data, co, dlaczego,
czego się spodziewasz.

---

**5. [BIZNES] Lokalizacja zawężona do województwa wielkopolskiego, też bez zapisu** — Ustawienia kampanii, 05.08.2026 vs `AUDYT-GOOGLE-ADS-2026-07-06.md`. · P2 · S · 🧑 · Z (dwa odczyty)

Dziś kampania celuje w „Województwo wielkopolskie, Polska (region)". Audyt z 06.07 opisywał
„500 km od Poznania", audyt z 11.06 — „Poznan". W historii zmian za okno 06.07–04.08 kategoria
„Lokalizacja" jest wyszarzona, więc **zmiana nastąpiła przed 6 lipca** i obejmuje całe okno.

Zawężenie jest sensowne merytorycznie (promień 500 km łapał zapytania o fotografów
w Katowicach). Problem jest ten sam co w punkcie 4: nie ma zapisu, kiedy i dlaczego.
Ma to praktyczny skutek — spadek wyświetleń o 37,9% ma teraz dwa równie prawdopodobne
wyjaśnienia i żadnego rozstrzygnięcia (H3).

---

**6. [BIZNES] Filtr widoku zostawiony w zakładce Słowa kluczowe pokazywał 3 z 62 słów** — 05.08.2026. · P2 · S · 🧑 · Z (panel)

Zastosowane filtry: „Stan słowa kluczowego: Włączone, Wstrzymane" **oraz „Tekst słowa
kluczowego zawiera fotograf biznesowy"**. Licznik: „1–3 z 3". Po zdjęciu drugiego filtra:
„1–62 z 62". Ten sam wzorzec, co zapisany filtr „Grupa reklam 1" znaleziony 11.06.
Filtr zdjąłem na czas audytu — jeśli był celowy, wraca jednym kliknięciem (§12.5).

---

**7. [BIZNES] Cztery klastry haseł-śmieci w wyszukiwaniach — bez kwot, więc bez rachunku wycieku** — kafel „Wyszukiwania", Przegląd, 05.08.2026. · P2 · S · 🌐 · **N** (brak raportu z kosztami)

Lista jest posortowana po wyświetleniach i **nie zawiera kwot**, bo raport wyszukiwanych haseł
z kosztami nie otworzył się w tej sesji (§9). Metodyka wymaga kwoty przy każdym kandydacie
do wykluczenia — jej nie mam, więc to nie jest gotowa lista do wdrożenia, tylko materiał
na jedno wejście do panelu.

- **Informacyjne:** „packshot co to", „packshoty co to", „co to packshot",
  „fotografia produktowa szkolenie", „fotografia produktowa zlecenia",
  „zestaw do fotografii produktowej".
- **B2C, zdjęcia do CV:** „zdjęcia do cv", „zdjecia do cv", „zdjęcia do cv poznań",
  „profesjonalne zdjęcia do cv", „profesjonalne zdjecia do cv", „zdjecie biznesowe do cv",
  „cv photo". Siedem wariantów — i jednocześnie `"zdjęcia do cv"` jest **wstrzymanym**
  słowem kluczowym o najwyższym CPC w całym koncie (8,74 zł). Czyli ten ruch wchodzi dziś
  innymi dopasowaniami, mimo że słowo wyłączono.
- **Konkurenci i marki obce:** „fotograf biznesowy & headshot leszno jakub lipnicki",
  „krzysztof zaleski fotograf", „mana studio", „gopackshot", „headshot pro",
  „packshot fotografia produktowa studyjna i reklamowa poznań".
- **Angielskie:** „business photo session", „linkedin photo", „professional photo for linkedin",
  „photo linkedin", „linkedin profile photo".

---

**8. [BIZNES] Grupa „Eventy i reportaże": 9 wyświetleń, 0 kliknięć, 0,00 zł — decyzja z 02.08 nadal nie zapadła** — Grupy reklam, 06.07–04.08. · P2 · M · 🧑 · Z (panel)

Kafel „Największe zmiany": `Eventy i reportaże −65,50 zł (−100,00%)`. Diagnoza z 02.08
postawiła trzy warianty i jeden warunek wstępny: **sprawdzić wolumen fraz eventowych
w Planerze słów kluczowych**. Warunek niespełniony, decyzja niepodjęta, stan się pogłębił.
Warianty bez zmian, wracają do §12.4.

---

**9. [BIZNES] Wideo i dron nie mają w koncie żadnej grupy reklam** — Grupy reklam (4) vs oferta na stronie. · P2 · M · 🧑 · Z (panel) + O (ocena zgodności z ofertą)

Konto ma cztery grupy: Portrety, Produktowa, Eventy, Sesje zespołowe. Oferta obejmuje także
wideo wizerunkowe i sesje dronowe — obie występują w treści reklamy („Usługi: … Wideo
wizerunkowe"), żadna nie ma własnej grupy, słów ani sitelinku. To nie jest defekt: przy
25 zł dziennie dokładanie grup pogłębia rozdrobnienie. To jest **nierozstrzygnięta decyzja
o zakresie kanału** i powinna być zapisana jako świadoma, a nie wychodzić przy audycie.

---

**10. [POMIAR] Trzy grupy celów mają „Kampanie 0 z 1"** — Cele → Podsumowanie, 05.08.2026. · P3 · S · 🌐 · Z (panel)

„Uzyskaj wskazówki" 0 z 1, „Zaangażowanie (interakcja)" 0 z 1, „Wyświetlenie strony" 0 z 1.
Wszystkie trzy mają stan „Aktywne" i żadna nie jest podpięta do jedynej kampanii. To relikty
kampanii inteligentnej i lokalnej. Nie kosztują nic, ale to one, a nie „Prośby o wycenę",
są dziś realnymi „0 z 1" — punkt z audytu 06.07 dotyczył innego celu i **nie da się go
uznać za domknięty na tej podstawie** (korekta, patrz §10.5).

---

**11. [POMIAR] „Wyświetlenie strony (Zdarzenie Google Analytics `generate_lead`)" — stan Nieaktywny, błędne mapowanie z 11.06 nadal w koncie** · P3 · S · 🌐 · Z (panel)

Zgłoszone 11.06 jako punkt 6. Osiem tygodni później działanie nadal siedzi w kategorii
„Wyświetlenia strony" ze stanem Nieaktywny. Nie kosztuje nic, zaśmieca każdą kolejną analizę.

---

**12. [BIZNES] Pięć słów ze statusem „Rzadko wyświetlane (niski wynik jakości)"** · P2 · M · 🌐 · Z (statusy) + **H** (przyczyna)

`"portret biznesowy"` (aktywne, **65,50 zł, 11 kliknięć, CTR 12,22%** — drugi wydatek konta),
`"zdjęcia do cv"` (wstrzymane), `"headshot"` ×2, `"zdjęcia firmowe"`.
Plus `"sesja firmowa dla zespołu"` — „Mała liczba wyszukiwań".

CTR 12,22% mówi, że reklama jest trafna, a Google i tak ogranicza wyświetlenia. **Która
składowa wyniku jakości zawodzi — nie wiem**, bo kolumn „Trafność reklamy" i „Jakość strony
docelowej" nie odczytałem (§9). Pierwsza wersja raportu wskazywała stronę docelową; to była
diagnoza bez pomiaru i została wycofana (§10.6).

---

**13. [BIZNES] Wersja robocza „Kampania 9" (Inteligentna, 4.03.2026) wisi w koncie** · P4 · S · 🧑 · Z (panel)

Typ: Inteligentna. Grupy reklam: brak. Słowa: brak. Nie emituje i po wznowieniu nie ruszy
bez konfiguracji, więc ryzyko jest niskie. Porządek: usunąć.

---

## 6. Hipotezy do sprawdzenia (H)

**H1 — CPC przekracza limit, bo działają dostosowania stawek.**
Krok: Kampanie → Ustawienia → kolumna „Aktywne dost. stawek"; potem podstrony „Urządzenia",
„Harmonogram reklam", „Lokalizacje" — odczytać wartości %. Jeśli wszystkie zerowe, hipoteza upada.
Narzędzie: panel, 10 minut.

**H2 — jedna zmierzona konwersja `contact_submit` nie ma odpowiednika w mailu, bo powiadomienia idą na `marcin@szabunia.pl`.**
Alternatywa, której nie da się dziś wykluczyć: formularz zapisuje zdarzenie, ale mail nie
dochodzi (dostarczalność Resend).
Krok: otworzyć `marcin@szabunia.pl` za 06.07–04.08 i porównać z logiem wysyłek Resend.
**Dopóki to nie jest zrobione, nie wolno twierdzić, że kampania nie przynosi zapytań.**

**H3 — spadek wyświetleń o 37,9% wynika z zawężenia lokalizacji, nie z sezonu.**
Krok: historia zmian z filtrem „Lokalizacja" dla okna 01.06–06.07. Alternatywa: lipiec w B2B.

**H4 — jedno działanie ma „Nieprawidłowe połączenie".** Kafel podaje liczbę 1, tabela
26 działań nie pokazuje takiego stanu przy żadnym wierszu — czyli chodzi raczej o powiązanie
usługi niż o działanie. Krok: Cele → Diagnostyka.

**H5 — sitelink „Sesje zespołowe" pokazuje popyt, którego grupa reklam nie łapie.**
Sitelink „Sesje zespołowe" (dodany 8.07) ma w wierszu 256 wyświetleń i 8,98% CTR — najwięcej
ze wszystkich komponentów — podczas gdy grupa reklam „Sesje zespołowe" ma **1 kliknięcie**
w tym samym oknie. Krok: raport wyszukiwanych haseł segmentowany po typie kliknięcia
plus Planer dla „zdjęcia zespołu", „sesja dla firmy", „headshoty dla zespołu".
**To najciekawszy trop biznesowy z całego audytu.**

**H6 — limit maks. stawki CPC nie jest twardym sufitem zrealizowanego CPC.**
Przesłanka za: w podoknie 06.07–19.07 limit wynosił 5,00 zł, a średni CPC 6,01 zł.
**Przesłanki przeciw, które muszę podać w tym samym miejscu:**
(a) limit ustawiono 6 lipca o 23:54, więc pierwszy dzień podokna działał jeszcze bez limitu —
gdyby tego dnia padło 6–8 kliknięć po 9,70–8,52 zł (w czerwcu ostatni tydzień miał CPC 10,12 zł
wg audytu 06.07), sama ta doba tłumaczy większość różnicy;
(b) grupa „Sesje zespołowe" ma w oknie 1 kliknięcie za **6,99 zł przy limicie 7,00 zł** —
kliknięcie wycenione o grosz pod sufitem wygląda dokładnie jak limit wiążący;
(c) `[sesja biznesowa poznań]` z CPC 7,22 zł to średnia z 30 dni obejmujących oba reżimy limitu.
Krok rozstrzygający: dzienne CPC dla 6 i 7 lipca osobno + segment „typ kliknięcia".
Narzędzie: panel, 15 minut.
**Pierwsza wersja raportu podawała to jako ustalenie P1 z pewnością Z. Wycofane do hipotezy** (§10.7).

**H7 — wzrost wolumenu po 20.07 to skutek podniesienia limitu.**
W tym samym oknie zaszło ponad 50 zmian, w tym dodania słów kluczowych 3–4 sierpnia i dwa
usunięte wykluczenia 3 sierpnia. Krok: rozbicie dzienne wokół 20.07 z odcięciem końcówki okna.

**H8 — zapytania cenowe trafiają na stronę bez cennika.**
W wyszukiwaniach są „sesja biznesowa poznań cena" i „fotografia produktowa cennik".
Cennik i kalkulator zniknęły ze strony w lipcu 2026, `/kalkulator` przekierowuje na `/kontakt`.
Jeśli to hasła o realnym wolumenie, kampania kupuje intencję cenową i wysyła ją na stronę,
która ceny nie pokazuje. Krok: raport wyszukiwanych haseł z kwotami + odczyt landingu.
**To najbardziej biznesowy sygnał w całym zbiorze danych.**

---

## 7. Obserwacje bez akcji

- **Udział grup w koszcie:** Portrety 386,15 zł (76,5%), Produktowa 111,70 zł (22,1%),
  Zespołowe 6,99 zł (1,4%), Eventy 0 zł. Produktowa +39,97% m/m.
- **Ostrożnie z „Produktowa dowozi taniej":** jej jedyna konwersja przypada na słowo
  `"packshot"` z **125 wyświetleń, 2 kliknięć i CTR 1,60%** — najsłabszym sygnałem trafności
  w całym koncie. Konwersja z dwóch kliknięć to 50% współczynnika i liczba, której przy tym
  wolumenie nie wolno użyć jako argumentu.
- **Bilans słów kluczowych:** słowa włączone i wstrzymane to 455,24 zł z 504,84 zł. Różnicę
  49,60 zł / 8 kliknięć niemal w całości tłumaczy **usunięte** słowo `"fotografia produktowa"`
  (36,28 zł / 7 klik.). Zostaje 13,32 zł i 1 kliknięcie bez przypisania.
- **Urządzenia:** koszt telefony 39,4% / komputery 60,6%; kliknięcia 38,3% / 61,7%; tablety zero.
- **Wykorzystanie budżetu 67,3%.**
- **Reklama w grupie Portrety** („Klienci: H&M, Santander · Ceny netto + VAT · Fotograf
  w Poznaniu · Oferta w 24h") ma CTR 8,36% przy 742 wyświetleniach — najlepiej pracujący
  element konta. Zgodności tych obietnic z cennikiem live **nie sprawdzałem** (§9).
- **Marka własna:** ustawienie „Wyszukiwania z nazwą marki: wyświetlanie reklam we wszystkich
  trafnych wyszukiwaniach" jest włączone, a w wyszukiwaniach jest „marcin szabunia fotograf
  biznesowy". Ile kosztuje własna marka — bez raportu z kwotami nie wiadomo.
- **Kampania jest w fazie nauki** („Strategia ustalania stawek w trakcie nauki po ostatniej
  zmianie w grupach reklam lub słowach kluczowych"), wywołanej zmianami z 3–4 sierpnia.
  Ostatnie dwa dni okna są tym skażone.
- **Saldo konta 64,94 zł, następna płatność automatyczna 1 września 2026.**

---

## 8. Świadomie NIE ruszamy

- **Budżetu 25 zł/dz.** — dopóki nie ma niezależnego potwierdzenia leadów.
- **Rekomendacji „rozszerzenie na sieć reklamową (+0,8%)"** — przy 25 zł dziennie i braku
  danych konwersji to najszybszy sposób na wydanie budżetu na przypadkowy ruch.
- **Strategii stawek** — „Maksymalizuj konwersje" wymaga kilkudziesięciu konwersji miesięcznie,
  konto ma trzy. Decyzja z 02.08 obowiązuje.
- **Frazy `"fotografia biznesowa"`** — najdroższe słowo konta (83,37 zł), CTR 7,83%, jedna konwersja.
- **Treści czterech RSA** — zmiana resetuje uczenie, a kampania i tak jest w fazie nauki.
- **Wykluczenia `fotograf`** — decyzja z 11.06 („zostaje dla widoczności") nie została odwołana.

---

## 9. Czego NIE sprawdzono (i co jest potrzebne)

| Obszar | Powód | Czego potrzeba |
|---|---|---|
| **Raport wyszukiwanych haseł z kwotami** | `/aw/searchterms` i `/aw/keywords/search` zwracają 404 w nowym interfejsie; dojście przez menu skończyło się błędem 500 | wejście z poziomu tabeli słów kluczowych. **Bez tego lista z §5.7 nie ma kwot, a H8 pozostaje hipotezą** |
| Lista wykluczających słów kluczowych | ta sama przyczyna | zakładka „Wykluczające słowa kluczowe" — czy 34 wykluczenia z 06.07 są na miejscu i co dokładnie skasowano 3 sierpnia |
| **Pełna historia zmian w oknie** | odczytałem tylko filtr „Określanie stawek" i szare chipy; panel podaje ponad 50 pozycji | przejrzeć kategorie „Konwersja", „Język", „Stan", „Inne" — w tym wpis z 3 sie 09:42:13 opisany jako „Zmian nie można cofnąć" |
| **Dostosowania stawek** (urządzenia / harmonogram / lokalizacja) | nie otwarte | kluczowe dla H1 i H6 |
| **Dzienne CPC dla 6 i 7 lipca** | nie odczytane | rozstrzyga H6 |
| Utracony udział w wyświetleniach (budżet vs ranking) | kolumny nie dodane do widoku | dwie kolumny w tabeli kampanii |
| Quality Score z komponentami | widoczne tylko statusy tekstowe | kolumny „Wynik jakości", „Trafność reklamy", „Jakość strony docelowej" |
| Landing pages z kosztem per URL | nie otwarte | zakładka „Strony docelowe" |
| Ad Strength dla czterech RSA | nie otwarte | zakładka „Reklamy" |
| **Zgodność treści reklam z cennikiem live** | checkpoint §2.5 planu, nie wykonany | porównać „Ceny netto + VAT", „Oferta w 24h", „Klienci: H&M, Santander" z treścią strony |
| Status zatwierdzenia komponentów | kolumna nieodczytana | tabela komponentów, kolumna „Stan" |
| Faktyczny URL sitelinków Portfolio i Kontakt | nie otwierałem edytora (audyt nie zmienia) | edytor komponentu albo kliknięcie w podglądzie reklamy |
| Rozkład dzień/godzina i harmonogram reklam | kafel istnieje, **nie odczytałem go**; pierwsza wersja raportu twierdziła coś przeciwnego (§10.8) | kafel „Dzień i godzina" plus zakładka „Harmonogram reklam" |
| **Ground truth: skrzynka `marcin@szabunia.pl`** | brak dostępu | dostęp do drugiej skrzynki, patrz H2 |
| GA4 (sesje, źródła, DebugView) | poza modułem D w tej rundzie | osobna sesja |
| Wszystkie dane przez Supermetrics | trial zespołu wygasł 03.06.2026 | subskrypcja albo trwałe przejście na odczyt z panelu |

---

## 10. Pozorne problemy skorygowane w trakcie audytu

Własne fałszywe pozytywy. Pierwsze trzy złapałem w trakcie zbierania danych, pozostałe pięć —
w kontroli własnej pracy przed publikacją. Ta sekcja jest dłuższa niż zwykle i to jest dobra
wiadomość, nie zła.

1. **„DSA są włączone i generują przypadkowy ruch."** Zwinięty wiersz ustawień pokazywał opis
   funkcji („Kieruj automatycznie na sieć wyszukiwania…"), co czyta się jak jej stan.
   Po rozwinięciu: pole „Website" puste. **Nie czytaj zwiniętego wiersza jako wartości.**

2. **„Automatyczne stosowanie rekomendacji jest włączone."** Kafel mówi, że rekomendacje
   *zostały zastosowane* w ciągu 90 dni i proponuje włączenie automatu. Automat jest wyłączony.

3. **„Zakładka Ustawienia kampanii jest pusta, coś jest zepsute."** Artefakt interfejsu —
   te same ustawienia odczytane przez koło zębate pokazały komplet.

4. **„Wykluczenia z 06.07 zadziałały — CTR wzrósł z 5,67% do 7,25%."** Wzrost CTR jest faktem,
   przyczyna nie. Zakładki wykluczeń nie otworzyłem, więc nie wiem nawet, czy te 34 pozycje
   istnieją — a historia zmian pokazuje, że 3 sierpnia **skasowano dwa wykluczenia**.
   Do tego w tym samym oknie zawężono lokalizację i trwał lipiec. Przyczyna przeniesiona
   do hipotez, w §2 został sam fakt.

5. **„Punkt »Kampanie 0 z 1« z audytu 06.07 jest domknięty."** Dotyczył celu „Prośby o wycenę",
   a ja sprawdziłem cel „Kontakt". Realne „0 z 1" mają dziś trzy inne grupy celów (§5.10).
   Domknięcie wycofane.

6. **„Niski wynik jakości `"portret biznesowy"` to wina strony docelowej."** Składowych wyniku
   jakości nie odczytałem — więc wskazywanie, która z nich zawodzi, było diagnozą bez pomiaru.
   Brief został z tego oczyszczony, w tym z nazwy pliku, którego adresu nie potwierdziłem.

7. **„Limit maks. CPC nie ogranicza — dowód: 6,01 zł przy limicie 5,00 zł." (finding P1, wycofany)**
   Trzy dziury: podokno zaczyna się 6 lipca, a limit ustawiono tego dnia o 23:54, więc jedna
   doba działała bez limitu i sama może tłumaczyć większość różnicy; przypisanie kliknięć słowa
   `"zdjęcia do cv"` do okresu z limitem 5 zł nie miało pokrycia w danych; a w tych samych
   danych leżała obserwacja przeciwna, której nie użyłem — kliknięcie za **6,99 zł przy limicie
   7,00 zł**. Do tego finding był logicznie sprzeczny z moją własną rekomendacją „zostawić 7 zł,
   bo przy 5 zł kampania nie wydawała budżetu". Przeniesione do **H6**.

8. **„Harmonogram reklam działa zgodnie z zamiarem, weekendy wyłączone."** Nie odczytałem
   kafla dzień/godzina ani zakładki harmonogramu. Twierdzenie usunięte z §8, checkpoint
   przeniesiony do §9.

9. **„Sitelinki Portfolio i Kontakt kosztowały 154,78 zł, czyli 30,7% wydatku okna."**
   Metryki w wierszu tabeli komponentów opisują reklamę wyświetloną z danym komponentem,
   nie kliknięcia w sam komponent — wiersze sumują się do 494,70 zł i 81 kliknięć, czyli
   do całej kampanii, a suma wszystkich typów komponentów daje 849,86 zł, czyli 168% kosztu.
   Liczba wycofana z findingu, z TL;DR, z planu działania, z tabeli re-audytu i z briefu.
   **Finding sam w sobie się broni — na dacie 4 marca, nie na kwocie.**

10. **„Ocena 58/100."** Nie wynikała z własnej tabeli obszarów (34/70 = 48,6) i punktowała
    dwa razy tę samą usterkę w dwóch „niezależnych" obszarach. Przeliczona jawnie na 51/100
    po połączeniu obszarów.

11. **„Konwersje: pierwszy niezerowy wynik od marca."** Nieprawda w świetle własnej tabeli:
    poprzednie okno ma dziś w panelu 1,00 konwersji.

**Wniosek metodyczny z tej rundy:** cztery z jedenastu korekt wzięły się z tego, że przyjąłem
metrykę Google za opis rzeczywistości (kafel „Rejestruje konwersje", kolumna kosztu komponentu,
kolumna „ostatnia aktualizacja"). Metodyka ostrzega przed tym przy „wyniku optymalizacji"
i tam ostrzeżenie zadziałało; przy mniej oczywistych kolumnach — nie.

---

## 11. Plan działania

### Kolejność wdrożenia (to nie jest kolejność ważności)

1. **(P0) Ustal, gdzie trafiają maile z formularza** — decyzja §12.6, potem test end-to-end
   (brief `ADS2608-03`). To domyka H2 i jest warunkiem sensu wszystkiego niżej. 🧑 · S
2. **(P1) Popraw dwa sitelinki** — `https://szabunia.pl/portfolio` i `https://szabunia.pl/kontakt`.
   Pięć minut, jedno pole w każdym. 🌐 za zgodą · S
3. **(P1) Rozstrzygnij, które zdarzenie jest kanonicznym leadem** (§12.1) i wypisz trójkę
   martwych działań z celów konta. 🌐 za zgodą · S
4. **(P2) Odczytaj dostosowania stawek i dzienne CPC dla 6–7 lipca** — rozstrzyga H1 i H6,
   czyli przesądza, czy pole „limit maks. CPC" jest w ogóle dźwignią. 🌐 · S
5. **(P2) Wejdź w raport wyszukiwanych haseł z kwotami** — domyka §5.7, H8 i pytanie
   o koszt marki własnej naraz. 🌐 · S
6. **(P2) Sprawdź wolumen fraz eventowych i zespołowych w Planerze** — domyka §5.8 i H5. 🧑 · M
7. **(P3) Porządek w 26 działaniach konwersji** i w trzech grupach celów „0 z 1". 🌐 za zgodą · M
8. **(P4) Usuń wersję roboczą „Kampania 9".** 🧑 · S

### Szybkie wygrane (poniżej godziny)

- dwa sitelinki (punkt 2) — pięć minut
- odczyt dostosowań stawek i dziennego CPC (punkt 4) — piętnaście minut
- test end-to-end formularza (punkt 1) — piętnaście minut
- usunięcie wersji roboczej (punkt 8) — minuta

### Większe projekty

- porządek w działaniach konwersji (punkt 7) — pół dnia, wymaga decyzji
- los grup Eventy i Sesje zespołowe (punkt 6) — pół dnia z Planerem

### Data kontrolna

**Re-audyt: 2 września 2026**, okno 05.08–01.09. Uwaga do bazy porównawczej: okno tego audytu
kończy się dwa dni po zmianach w słowach kluczowych i w trakcie fazy nauki strategii, więc
ostatnie dwa dni są skażone. Przy re-audycie porównywać całe okna, nie końcówki.

| Metryka | Wartość dziś (06.07–04.08) | Czego oczekujemy 02.09 |
|---|---|---|
| Śr. CPC | 6,23 zł | ≤ 6,23 zł — trend ma się zatrzymać |
| Kliknięcia | 81 | ≥ 81 |
| CTR | 7,25% | ≥ 7,25% |
| Wykorzystanie budżetu | 67,3% | 75–100% |
| Konwersje **z rozbiciem na działania** | 1 formularz + 2 kliknięcia w link | ≥ 2 formularze |
| Zapytania potwierdzone w skrzynce | **niepoliczalne** (brak dostępu) | policzone w obu skrzynkach |
| Działania w celach konta ze stanem „Usunięta" | 2 | 0 |
| Data ost. aktualizacji sitelinków Portfolio i Kontakt | 4 mar 2026 | data po 05.08.2026 |
| Grupy celów „Kampanie 0 z 1" | 3 | 0 |

---

## 12. Decyzje potrzebne od Marcina

**12.1 Które zdarzenie jest kanonicznym leadem konta?**
- **A (rekomendowane).** `contact_submit` — żywe, podstawowe, w grupie celów, której kampania
  używa. `generate_lead` wypisujemy z celów konta. Odwracalne. Ryzyko: jeśli pobranie poradnika
  też jest leadem, ta ścieżka przestaje być głównym celem.
- **B.** Naprawiamy `generate_lead` w GA4 i przywracamy jako główne. Ryzyko: to zdarzenie już
  raz umarło, naprawa wymaga sesji w GA4 i nie ma pewności, że w ogóle leci ze strony.
- **C.** Oba podstawowe. Ryzyko: jedno wysłanie formularza policzy się dwa razy.
- **D. Nie robić nic** — dwa działania podstawowe o tej samej roli zostają, a przy każdej
  kolejnej analizie trzeba zgadywać, które jest prawdą.

Rekomendacja: **A**. Kryterium sukcesu: **do 15.08 test end-to-end przechodzi i widać go
w panelu jako `contact_submit`.**

**12.2 Ile ma wynosić limit maksymalnej stawki CPC?**
- **A (rekomendowane).** Zostawić 7,00 zł do czasu rozstrzygnięcia H6. Odwracalne.
- **B.** Wrócić do 5,00 zł — okno 06.07–19.07 pokazuje wtedy 12 zł wydatku z 25 zł dziennie
  i zero konwersji, ale przypisanie tego samemu limitowi jest hipotezą (H7).
- **C.** Zdjąć limit — wraca reżim czerwcowy.
- **D. Nie robić nic** — czyli A, tylko bez zapisania decyzji.

Rekomendacja: **A, ale najpierw H6.** Jeśli okaże się, że limit i tak nie wiąże, cała decyzja
jest pozorna i prawdziwą dźwignią jest budżet. Kryterium: **do 02.09 śr. CPC ≤ 6,23 zł
przy zachowanych ≥81 kliknięciach.**

**12.3 Poprawiamy sitelinki „Portfolio" i „Kontakt"?**
Tak / nie. Koszt: pięć minut. Ryzyko: 1–2 dni ponownej weryfikacji komponentów.
Rekomendacja: **tak**, natychmiast — to najtańsza poprawka w całym audycie, a „Portfolio"
ma jeden z najwyższych CTR w zestawie, czyli obietnica działa najlepiej ze wszystkich.

**12.4 Eventy i reportaże — decyzja z 02.08 nadal czeka.**
Warianty bez zmian: **A** osobna kampania z własnym budżetem · **B** zmiana strategii
(nadal odradzana) · **C** zostawić i przyjąć, że Ads sprzedaje portrety.
Warunek wstępny niezmieniony: **najpierw wolumen w Planerze**. Rekomendacja: sprawdzić razem
z frazami zespołowymi z H5, potem decyzja.

**12.5 Czy filtr „fotograf biznesowy" w widoku słów kluczowych był celowy?**
Tak / nie. Zdjąłem go na czas audytu.

**12.6 Kto ma dostęp do skrzynki `marcin@szabunia.pl` i czy tam trafiają maile z formularza?**
**To jest pytanie numer jeden tego audytu.** Bez odpowiedzi nie da się zamknąć H2, a bez H2
nie da się powiedzieć, czy kampania przynosi zapytania. Jedyne pytanie, którego nie da się
obejść żadnym pomiarem w panelu.

**12.7 Czy wideo i dron mają w ogóle być w Ads?**
Dziś nie mają grupy, słów ani sitelinku, a są w ofercie i w treści reklamy. To nie defekt,
to nierozstrzygnięta decyzja o zakresie kanału. Rekomendacja: **nie dokładać grup przy 25 zł
dziennie** i zapisać to jako świadomą decyzję, żeby nie wracało przy każdym audycie.

---

## Rejestr findingów

| ID | Finding | P | Owner | Pewność | Status | Dokument |
|---|---|---|---|---|---|---|
| ADS2608-01 | Brak niezależnego potwierdzenia zapytań; 3 konwersje = 1 formularz + 2 kliknięcia w link | P0 | 🧑 | Z (panel) + N (ground truth) | otwarty | BRIEFY-ADS-2026-08-05.md |
| ADS2608-02 | ~~`generate_lead` martwe i w celach konta~~ — **scalone z ADS2608-06**, liczone raz | — | — | — | scalony | — |
| ADS2608-03 | Test end-to-end formularza (brief diagnostyczny do ADS2608-01) | P0 | 🧑 | — | otwarty | BRIEFY-ADS-2026-08-05.md |
| ADS2608-04 | ~~Limit maks. CPC nie ogranicza realnego CPC~~ — **wycofany do hipotezy H6** | — | — | H | wycofany 05.08 | §6 H6 |
| ADS2608-05 | Sitelinki Portfolio i Kontakt nietknięte od 4.03.2026 | P1 | 🌐 | Z (data) + N (URL, koszt) | otwarty | BRIEFY-ADS-2026-08-05.md |
| ADS2608-06 | 26 działań konwersji, 14 usuniętych, 3 martwe w celach konta | P1 | 🌐 | Z (panel) | bez zmian od 11.06 | BRIEFY-ADS-2026-08-05.md |
| ADS2608-07 | Limit CPC podniesiony 20.07 z 5 na 7 zł bez zapisu | P2 | 🧑 | Z (historia zmian) | otwarty | — |
| ADS2608-08 | Filtr widoku pokazywał 3 z 62 słów kluczowych | P2 | 🧑 | Z (panel) | zdjęty na czas audytu | — |
| ADS2608-09 | Eventy i reportaże: 9 wyśw., 0 zł; decyzja z 02.08 otwarta | P2 | 🧑 | Z (panel) | bez zmian od 02.08 | — |
| ADS2608-10 | „Wyświetlenie strony (`generate_lead`)" — Nieaktywny | P3 | 🌐 | Z (panel) | bez zmian od 11.06 | — |
| ADS2608-11 | Pięć słów z niskim wynikiem jakości, w tym drugie co do wydatku | P2 | 🌐 | Z (statusy) + H (przyczyna) | otwarty | BRIEFY-ADS-2026-08-05.md |
| ADS2608-12 | Wersja robocza „Kampania 9" (Inteligentna) z 4.03.2026 | P4 | 🧑 | Z (panel) | otwarty | — |
| ADS2608-13 | Lokalizacja zawężona do woj. wielkopolskiego bez zapisu | P2 | 🧑 | Z (dwa odczyty) | otwarty | — |
| ADS2608-14 | Cztery klastry haseł-śmieci, bez kwot | P2 | 🌐 | **N** | otwarty | — |
| ADS2608-15 | Trzy grupy celów „Kampanie 0 z 1" | P3 | 🌐 | Z (panel) | otwarty | — |
| ADS2608-16 | Wideo i dron bez grupy reklam | P2 | 🧑 | Z (panel) + O | do decyzji §12.7 | — |

### Domknięcie punktów z poprzednich audytów Ads

| Punkt | Źródło | Status dziś |
|---|---|---|
| Limit maks. CPC 5,00 zł ustawiony | AUDYT 06.07 §8.1 | ⚠️ **zmieniony na 7,00 zł 20.07** (ADS2608-07); czy w ogóle wiąże — H6 |
| +34 wykluczenia dodane | AUDYT 06.07 §8.3 | ➖ **niezweryfikowane** — zakładka nieotwarta; w oknie skasowano 2 wykluczenia (§9) |
| Status działań konwersji sprawdzony | AUDYT 06.07 §8.2 | ⚠️ ścieżka `contact_submit` żyje, otoczenie zaśmiecone (ADS2608-06) |
| Cel „Prośba o wycenę" — „Kampanie 0 z 1" | AUDYT 06.07 §8.2 | ➖ **nie domknięty** — sprawdziłem inny cel; realne 0 z 1 mają trzy inne grupy (ADS2608-15) |
| Relikty UA w celach konta | AUDYT 11.06 poz. 6 | ❌ **bez zmian** (ADS2608-06) |
| `generate_lead` zmapowany jako „Wyświetlenie strony" | AUDYT 11.06 poz. 6 | ❌ **bez zmian** (ADS2608-10) |
| Import wysłania formularza jako główna konwersja | AUDYT 11.06 rek. 1 | ⚠️ **wykonany i martwy** (ADS2608-06) |
| Dwa sitelinki prowadzą na stronę główną | DIAGNOZA 02.08 §7 | ❌ **bez zmian** (ADS2608-05) |
| Wolumen fraz eventowych w Planerze | DIAGNOZA 02.08 §4 | ❌ **niesprawdzony** (ADS2608-09) |
| Warianty A/B/C dla eventów | DIAGNOZA 02.08 §5 | ➖ **decyzja nadal nie zapadła** (§12.4) |
| `/kalkulator` jako cel reklamowy | DIAGNOZA 02.08 §6 | ✅ **zamknięty** — `calculator_done` poza celami konta, stan „Usunięta" |
| Niski wynik jakości „portret biznesowy", „headshot", „packshot" | DIAGNOZA 02.08 §2 | ➖ „portret biznesowy" i „headshot" nadal ograniczone; „packshot" już nie |

---

*Audyt wykonał: Claude (Cowork), 2026-08-05, tryb autonomiczny, z kontrolą własnej pracy
przez niezależnego subagenta przed publikacją (11 korekt, §10). Dane: panel Google Ads konta
786-864-4697, okno 06.07–04.08.2026, odczyt 05.08.2026 09:35–11:10 UTC; skrzynka
`marcin.szabunia@gmail.com`, okno 05.07–05.08.2026. Supermetrics niedostępny (trial wygasł
03.06.2026). **Audyt nie wprowadza zmian w koncie** — jedyna interwencja to zdjęcie filtru
widoku w zakładce Słowa kluczowe, opisane w nagłówku i jako ADS2608-08.*
