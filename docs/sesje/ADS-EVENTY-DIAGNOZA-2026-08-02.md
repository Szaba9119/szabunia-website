# Google Ads: czemu eventy nie dostają wyświetleń

Data: 2026-08-02. Konto 786-864-4697. Okno: ostatnie 14 dni (19.07–1.08) i 30 dni.
Klauzula: **niczego w koncie nie zmieniłem.** To diagnoza plus warianty do Twojej decyzji.

---

## 1. Znalezione. To nie jest awaria, to ustawienie

Konto ma **jedną kampanię** („Pierwsza pro kampania"), cztery grupy reklam, jeden wspólny
budżet i jedną strategię stawek:

| Parametr | Wartość |
|---|---|
| Budżet | **25,00 zł dziennie** |
| Strategia ustalania stawek | **„Maksymalizuj liczbę kliknięć"** |
| Typ | Sieć wyszukiwania |
| Realny wydatek | 271,72 zł / 14 dni, czyli ~19 zł dziennie |

**„Maksymalizuj liczbę kliknięć" mówi Google jedno: wydaj budżet tam, gdzie kliknięcia są
najtańsze i najliczniejsze.** Nic więcej. Nie ma w tej strategii pojęcia „która usługa jest
dla mnie ważna" ani „która przynosi zapytania".

Zapytania portretowe („fotografia biznesowa", „sesja biznesowa", „zdjęcia do LinkedIn") mają
większy wolumen i tańszy klik niż zapytania eventowe. Więc algorytm robi dokładnie to, co mu
kazano: całość budżetu ląduje na portretach. **Grupy eventowa i zespołowa nie przegrywają
przez błąd. Przegrywają z definicji, przy każdym wyświetleniu, bo strategia je do tego
zmusza.**

Stan grup reklam, 14 dni:

| Grupa | Wyświetlenia | Kliknięcia | Koszt | Konwersje | Stan |
|---|---|---|---|---|---|
| Portrety i wizerunek | 369 | 35 | 220,90 zł | 2 | Odpowiednia |
| Fotografia produktowa | 164 | 8 | 50,82 zł | 1 | Odpowiednia |
| **Eventy i reportaże** | **8** | **0** | 0,00 zł | 0 | Odpowiednia |
| **Sesje zespołowe** | **0** | **0** | 0,00 zł | 0 | Odpowiednia |

Wszystkie cztery grupy mają status **„Odpowiednia"**, czyli są włączone i zatwierdzone.
Nic nie jest wstrzymane ani odrzucone. To wyklucza najprostsze wyjaśnienia.

## 2. Drugi, mniejszy problem: niski wynik jakości

Trzy słowa kluczowe mają status **„Odpowiednia (ograniczona) — Rzadko wyświetlane (niski
wynik jakości)"**:

- „portret biznesowy" (52 wyświetlenia mimo ograniczenia)
- „headshot" (14)
- „packshot" (56)

To Google mówiący wprost: te frazy pokazuję rzadko, bo ocena trafności jest niska. Dotyczy
grup, które i tak dostają ruch, więc na razie to problem drugorzędny, ale przy przebudowie
warto go zaadresować.

## 3. Czego NIE ustaliłem

Piszę wprost, bo to wpływa na wybór wariantu.

- **Nie przejrzałem wszystkich 57 słów kluczowych.** Tabela w panelu ładuje po dziesięć
  wierszy naraz i przy próbie przewinięcia całości interfejs przestawał odpowiadać.
  Wiem, że **wszystkie słowa z jakimikolwiek wyświetleniami należą do grup Portrety (6)
  i Produktowa (2)**, więc pozostałe ~49 nie zebrało w 14 dni ani jednego wyświetlenia.
  Nie wiem natomiast, ile z nich siedzi w grupie eventowej i czy mają status
  „Rzadko wyświetlane" czy „Mała liczba wyszukiwań". **To jest różnica między „przegrywają
  aukcje" a „nikt tego nie szuka".**
- **Nie sprawdziłem utraconego udziału w wyświetleniach** w rozbiciu na budżet i ranking.
  Kolumny trzeba dodać do widoku.
- **Wynik optymalizacji 92,8%** widoczny w panelu celowo pomijam. To ocena Google dla samego
  siebie, a metodyka audytu każe nie ufać metrykom audytowanego systemu.

## 4. Pytanie, które trzeba zadać przed przebudową

Czy frazy eventowe w ogóle mają wolumen w Poznaniu?

Sygnał ostrzegawczy: w GSC organicznie `/uslugi/eventy-reportaze` zebrało **43 wyświetlenia
przez trzy miesiące**, przy 507 dla fotografii produktowej i 147 dla portretów. Jeśli
w płatnym jest podobnie, to żadna struktura kampanii tego nie odwróci, bo problemem nie jest
podział budżetu, tylko brak wyszukiwań.

**Rekomendacja: zanim cokolwiek zmienimy w koncie, sprawdzić wolumen w Planerze słów
kluczowych** dla fraz typu „fotograf na event firmowy", „obsługa foto eventu", „fotograf
konferencja Poznań". Pół godziny, zero ryzyka, i rozstrzyga, czy warianty niżej mają sens.

## 5. Warianty

### Wariant A: osobna kampania dla eventów z własnym budżetem
Eventy (i ewentualnie sesje zespołowe) wychodzą do własnej kampanii z własnym budżetem,
np. 10 zł dziennie, portrety zostają na 15–25 zł.

- **Zysk:** eventy przestają konkurować z portretami o ten sam worek. Dostają gwarantowany
  wydatek albo pokazują, że popytu nie ma. Jedno i drugie jest informacją.
- **Koszt:** ten sam budżet podzielony, albo +10 zł dziennie, jeśli portrety mają nie stracić.
- **Ryzyko:** jeśli popytu nie ma, budżet się nie wyda. To nie strata pieniędzy, ale strata
  czasu na naukę algorytmu od zera w nowej kampanii.
- **Odwracalność:** pełna, pauza jednym kliknięciem.
- **Kryterium sukcesu:** po 3 tygodniach grupa eventowa ma ≥100 wyświetleń i ≥5 kliknięć.

### Wariant B: zmiana strategii na „Maksymalizuj liczbę konwersji"
Zamiast optymalizować pod kliknięcia, optymalizować pod zapytania.

- **Zysk:** wydatek idzie za tym, co faktycznie przynosi kontakt, nie za tanim klikiem.
- **Ryzyko: duże, i dlatego tego NIE rekomenduję na teraz.** Google potrzebuje do tej
  strategii kilkudziesięciu konwersji miesięcznie. Ty masz **3 w 14 dni**. Przy takim
  wolumenie algorytm nie ma się czego uczyć i potrafi przez tygodnie wydawać gorzej niż dziś.
- **Odwracalność:** pełna, ale kosztuje kolejny okres nauki przy powrocie.

### Wariant C: zostawić jak jest
- **Zysk:** zero pracy, kampania dowozi 3 konwersje na 14 dni po 90,57 zł.
- **Koszt:** świadoma zgoda, że Ads sprzedaje portrety, a eventy zostają dla wizytówki Google,
  poleceń i SEO.
- To jest uczciwa opcja, nie porażka. 78% budżetu na portrety jest sensowne, jeśli to
  portrety się z tego kanału sprzedają.

**Moja rekomendacja:** najpierw punkt 4 (wolumen w Planerze), potem wariant A, jeśli wolumen
jest. Wariant B odłożyć do momentu, aż konwersji będzie kilkanaście miesięcznie.

## 6. Zamknięty wątek: `/kalkulator` NIE jest już celem reklamowym

Prostuję to, co napisałem rano. Mówiłem, że adres `/kalkulator` „nadal jest aktywnym celem
reklamowym", bo widziałem go z 73 wyświetleniami w oknie 14 dni. **To był artefakt okna
pomiarowego.** Okno 19.07–1.08 obejmuje 23.07, czyli dzień, w którym sitelink „Kalkulator
wyceny" został usunięty.

Sprawdziłem ostatnie 7 dni (26.07–1.08), czyli okres w całości po usunięciu: **`/kalkulator`
nie występuje tam w ogóle.** Zostaje pięć adresów docelowych i wszystkie są prawidłowe.
Wątek zamknięty, nie ma czego naprawiać.

Przy okazji, dane z tych 7 dni pokazują ten sam obraz co całość: 19 kliknięć i 120,55 zł,
z czego **16 kliknięć i 101 zł na portrety**, 3 kliknięcia na produktową, zero na eventy
i zero na sesje zespołowe (mimo 44 i 72 wyświetleń z linków do podstron).

## 7. Przy okazji, do naprawy niezależnie od wariantu

Dwa linki do podstron w reklamach prowadzą na stronę główną zamiast tam, co obiecują.
Oba nietykane od 4.03.2026:

| Link | Obiecuje | Prowadzi na | Wyświetlenia / 30 dni |
|---|---|---|---|
| **Kontakt** | „Napisz lub zadzwoń. Bezpłatna wycena sesji zdjęciowej" | `szabunia.pl/` | 89 |
| **Portfolio** | „Realizacje z sesji biznesowych" | `szabunia.pl/` | 161 |

Poprawka to jedno pole w każdym: `https://szabunia.pl/kontakt` i `https://szabunia.pl/portfolio`.
Pozostałe cztery linki do podstron mają poprawne adresy.
