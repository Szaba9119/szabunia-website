# Red-team review i co z niego przyjąłem

Data: 2026-09-20. Niezależny agent dostał kampanię **bez moich uzasadnień**, z poleceniem
znalezienia błędów i z instrukcją, żeby nie przyjmować żadnego założenia jako prawdy.
Miał dostęp do plików kampanii i do kodu strony.

**Bilans: 11 uwag przyjętych, 2 odrzucone, 1 przekazana Marcinowi do decyzji.**

Red team wypisał też siedem własnych fałszywych pozytywów, które sam wycofał
(m.in. rzekomą blokadę słowa „portfolio", rzekome przekroczenia limitów znaków,
rzekomy dowód, że „portrety nie działają"). To podnosi wiarygodność reszty raportu.

---

## Przyjęte

| Nr | Uwaga | Co zrobiłem |
|---|---|---|
| K-01 | Naprawa w `layout.tsx` działa tylko wtedy, gdy w adresie jest `gclid`. Jeśli automatyczne tagowanie jest wyłączone, cała gałąź jest martwa | Podniesione do pozycji pierwszej w `launch-checklist.md` §4 jako warunek konieczny |
| K-02 | Brak jawnego wyłączenia automatów Google, w tym dynamicznych reklam i rozszerzania adresu URL | Dopisane do §3 listy kontrolnej |
| W-02 | Uzasadnienie „bez sitelinków, bo jeden landing" jest nieprawdziwe: sitelinki nie muszą prowadzić na stronę docelową | 4 sitelinki jako **kotwice na stronie głównej**, co zachowuje warunek jednego landingu |
| W-03 | Konwersja z rozszerzenia połączeń działa poza Consent Mode i GA4, czyli poza zerwanym łańcuchem | Oznaczone jako PRIORYTET w §3 |
| W-04 | Zaniżona stawka grupy produktowej to nie „nie przepłacam", tylko „nie biorę udziału" | Stawki wyrównane, przejście na Maximize Clicks |
| W-05 | Wektor B2C glamour zdiagnozowany w `keywords.csv`, a nieprzeniesiony na listę wykluczeń | Dodane 36 wykluczeń: glamour, makijaż, wizaż, kobieca, damska, stylizacja, aktorska, influencer |
| W-06 | Luboń, Swarzędz, Suchy Las i Skórzewo to nie dzielnice Poznania, tylko osobny rynek B2B | Usunięte z wykluczeń, geo poszerzone do 25 km |
| S-01 | Brak przypięć: przy 8 kliknięciach na reklamę nie zobaczysz złej kombinacji nagłówków | Pozycja 1 przypięta do nagłówka z frazą kluczową grupy |
| S-02 | Sześć nagłówków w grupie produktowej niosło jeden komunikat | Trzy wymienione na różnicujące |
| S-03 | „Realizacje w Polsce i Europie" sprzedaje zasięg krajowy odbiorcy zdefiniowanemu jako obecny w Poznaniu | Wymienione na „Dojazd w Poznaniu w cenie" (`faq.ts:42`) |
| S-05, S-06, S-07, S-08 | Jednowyrazowe wykluczenia kolidujące z linią produktową, brak odmian fleksyjnych, braki pod „packshot", literówki, „ostrów" blokujący Ostrów Tumski w Poznaniu | Wszystko poprawione, lista z 435 na 471 pozycji |
| Q4 | Maximize Clicks z limitem CPC zamiast stawek ręcznych, bo kampania jest ograniczona wolumenem, nie budżetem | Przyjęte, `strategy.md` §10 przepisany |
| Q8 | Moje uzasadnienie braku UTM-ów było błędne: UTM-y nie nadpisują `gclid` | Decyzja została, uzasadnienie przepisane na poprawne |

## Odrzucone

**W-01: kierować grupy na `/uslugi/wizerunek-portrety` i `/uslugi/fotografia-produktowa`
zamiast na stronę główną.**
Merytorycznie to dobry argument o dopasowaniu komunikatu i przy innym briefie bym go przyjął.
Ale brief Marcina mówi wprost: „Landing page: https://szabunia.pl/. **Tylko strona główna.
Nie rozdzielamy ruchu pomiędzy podstrony usług**". To jest warunek zadania, nie przeoczenie
do naprawienia. Red team go nie znał. **Zostawiam decyzję Marcinowi i odnotowuję, że to jest
najmocniejszy merytoryczny argument przeciw obecnemu ustawieniu.**

**Q1: jedna reklama RSA na grupę zamiast dwóch w grupie wizerunkowej.**
Argument jest słuszny liczbowo (dwie reklamy po ~7 kliknięć miesięcznie nigdy się nie porównają),
ale brief prosił wprost o „wariant alternatywny RSA". Zostawiam dwa warianty
i **zapisuję zastrzeżenie w `ads.md`**: pierwszy odczyt robić przez ocenę zasobów, nie przez CTR,
a jeśli zależy nam na szybszym odczycie, wstrzymać RSA 2.

## Do decyzji Marcina

**Czy wykluczyć „cennik" i „ile kosztuje".**
- **Za wykluczeniem:** strona nie ma cen od 14.08.2026, a `blog.ts:1604` mówi wprost
  „Cennika pozycja po pozycji nie publikuję". Kto szuka tabeli, odbije się natychmiast,
  a kliknięcie kosztuje ~6 zł z budżetu 152 zł.
- **Przeciw:** „cennik sesji biznesowej" bywa zapytaniem kupującego porównującego oferty,
  a objaśnienie „Cena po ustaleniu zakresu" dobrze ustawia oczekiwanie jeszcze przed kliknięciem.
- **Stan obecny:** oba słowa **zostają dozwolone**, tak jak „cena". Nie zmieniałem tego sam,
  bo to dotyka decyzji cenowej podjętej przez Marcina dwa razy (03.08 i 14.08).

## Najpoważniejsze ostrzeżenie z red teamu, które przyjmuję w całości

> Przy ~25 kliknięciach miesięcznie i pomiarze gubiącym trzy czwarte ruchu kampania może
> nie wygenerować ani leadów w liczbie, która coś zmieni, ani danych, które pozwolą ją poprawić.

Dlatego kryterium sukcesu musi być ustalone **przed startem i liczone ręcznie**, nie z panelu:
**liczba zapytań mailowych i telefonicznych w oknie 8 tygodni kampanii, porównana z 8 tygodniami
przed nią, z pytaniem „skąd Pan/Pani do mnie trafił(a)" zadawanym każdemu leadowi.**

Próg wyjścia: jeśli po 8 tygodniach i około 300 zł nie ma ani jednego zapytania dającego się
przypisać do reklamy, kampania idzie do wstrzymania.
