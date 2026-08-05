# Zasady pisania tekstów — szabunia.pl

Ustalone przez Marcina w brief-22 (2026-07-23). Obowiązują dla wszystkich tekstów
widocznych dla użytkownika dodawanych lub przepisywanych od tej pory: dane
usług (`services.tsx`), FAQ (`faq.ts`), case studies (`portfolio.ts`), copy
w komponentach, metadane opisowe (title/description). Nie dotyczy wstecznie
treści `blog.ts` — te czekają na osobną rundę redakcyjną.

## Test nadrzędny

Czy Marcin powiedziałby to zdanie klientowi przez telefon? Jeśli brzmi jak
broszura — do kosza.

## Kanon tonu

- Bezpośredni i konkretny. Krótkie zdania. Fakty.
- „Rozwiązuję / dostarczam" — nigdy „postaram się / mam nadzieję".
- Liczba pojedyncza: solo creator, nie „nasz zespół".
- Zamiast haseł reklamowych: liczba, nazwa klienta, konkret z realizacji.
  Przykłady z istniejącej strony: 250 000+ zdjęć, 100+ firm, H&M, Forte na
  okładce Big Furniture Group Magazine, wyróżnienie Portret 2022.
- Zero emocjonalnej wylewności, zero familiarności na siłę.

## Czarna lista fraz

„kompleksowe rozwiązania", „dopasowane do Twoich potrzeb/oczekiwań",
„na najwyższym poziomie", „wyjątkowy/unikalny", „dbałość o każdy detal",
„szeroka gama", „bogate doświadczenie", „gwarancja satysfakcji",
„podchodzę indywidualnie" (bez konkretu obok).

**Dopisane 30.07.2026:** „profesjonalny / profesjonalna / profesjonalne" jako jedyne
określenie. Żaden fotograf nie napisze „nieprofesjonalna fotografia", więc to słowo nic
nie komunikuje, a zjada 14 znaków z limitu 155 w opisie meta. Przy audycie otwierało
osiem opisów. Zostaje tylko tam, gdzie coś rozróżnia (np. „profesjonalne zdjęcie do CV"
kontra zdjęcie zrobione telefonem).

## Czarna lista konstrukcji

- Triady przymiotników („naturalne, autentyczne i profesjonalne").
- Powtarzana składnia „X, które Y" w kolejnych zdaniach.
- Akapity-lustrzanki o identycznej budowie.
- Wykrzykniki, emoji.
- **Długie myślniki (—): twardy zakaz w tekstach widocznych dla użytkownika.**
  Zamiast nich: kropka (dwa zdania), przecinek, dwukropek albo nawias.

Zdanie po przepisaniu ma brzmieć jak powiedziane na głos, nie jak
przeredagowany myślnik.

## Nazwy usług: nie wymyślaj własnego słownika (dodane 30.07.2026)

**Zanim nazwiesz usługę, sprawdź, czy ktokolwiek tak jej szuka.** Nazwa wymyślona
wewnętrznie brzmi dla Ciebie oczywiście, a dla klienta jest zagadką.

Precedens: fraza **„foto, wideo i dron z jednego wejścia"** żyła w 25 miejscach w repo,
w tym w H1, w tytułach i w adresie wpisu blogowego. Sprawdzenie w danych: słowo „wejście"
**nie występuje w żadnym zapytaniu** w GSC (3 miesiące i 7 dni) ani w wyszukiwanych hasłach
z Google Ads. Zero popytu. Marcin sam nie umiał powiedzieć, czy znaczy „z jednego eventu",
czy „od jednej osoby".

Zastąpione przez **„zdjęcia, film i dron od jednej osoby"**, bo `film` i `filmowanie`
występują w siedmiu realnych zapytaniach, a `kamerzysta` i `operator` w zerze.

**Reguła:** przy nazwie usługi najpierw sprawdź GSC i wyszukiwane hasła z Ads. Jeśli słowa
tam nie ma, użyj tego, którego ludzie faktycznie wpisują, nawet gdy brzmi prościej.
Nie nazywaj też zawodu, gdy klient szuka rezultatu.

## Miasto w nagłówkach (dodane 30.07.2026)

**Nie doklejaj miasta przecinkiem.** „Portrety biznesowe i headshoty, Poznań" nie przechodzi
testu nadrzędnego: nikt tak nie powie klientowi przez telefon. Brzmi jak słowo kluczowe
wklejone w zdanie.

Lokalność jest już zbudowana bez tego: `addressLocality` i `GeoCoordinates` w layoucie,
`areaServed` na każdej podstronie usługi, „Poznań" od 1 do 3 razy w treści każdej z nich
oraz `title`, który jako jedyny trafia wprost do wyniku wyszukiwania. Powtórzenie miasta
w H1 nie kumuluje się.

Miasto w nagłówku **tylko wtedy, gdy wychodzi naturalnie w zdaniu**, jak „Obsługa eventów
firmowych w Poznaniu". W `title` zostaje, tam jego miejsce jest właściwe.

**Ta reguła nie obejmuje nagłówków reklam Google Ads** (dopisane 02.08.2026). Nagłówek RSA
ma 30 znaków i konkuruje o dopasowanie do wpisanej frazy, a nie o brzmienie zdania na
stronie. „Fotografia produktowa Poznań" i „Zdjęcia firmowe Poznań" są tam poprawne
i potrzebne: Google jawnie liczy obecność słowa kluczowego w nagłówku jako składową
Wyniku Jakości. Dowód z tego samego dnia: usunięcie trzech nagłówków ze słowem
„produktowa" zbiło Skuteczność reklamy z „Dobra" na „Średnia", a ich przywrócenie
podniosło ją na „Świetna". Reszta zasad (czarna lista, brak Title Case, brak długich
myślników, zapis liczb) obowiązuje w reklamach tak samo jak na stronie.

## Czego nie wolno redagować (dodane 30.07.2026)

**Cytatów klientów.** Opinie w `Testimonials.tsx` i w `portfolio.ts` zawierają frazy
z czarnej listy („na najwyższym poziomie", „profesjonalne podejście"). To wypowiedzi
innych ludzi. Poprawianie ich pod zasady redakcyjne jest fałszowaniem cudzej opinii,
niezależnie od tego, jak brzmią.

**Treści `blog.ts` wstecznie** (zapis pierwotny, nadal obowiązuje). Wyjątek: gdy usuwamy
z serwisu żargon, który tam też siedzi, jak przy „jednym wejściu" 30.07.2026. Wtedy
przepisujemy zdania, nie podmieniamy słów, i nie ruszamy sluga, jeśli adres jest
zaindeksowany.

## Wzorce dobrego głosu (z istniejącej strony)

- „Nie musisz być modelem, wystarczy być sobą. Reszta to moja robota."
- „Słyszę to bardzo często i za każdym razem efekt pozytywnie zaskakuje."
- „Jeden twórca, spójny materiał i krótka droga od briefu do dostawy."
- „Zdjęcia, film i dron od jednej osoby." (30.07.2026, zastąpiło „z jednego wejścia")

## Cennik: zamknięta decyzja (03.08.2026)

⛔ **Na stronie nie ma i nie będzie tabeli cen, pakietów z kwotami ani sekcji „Cennik".**
Klient ma napisać po wycenę. Decyzja Marcina z 03.08.2026, podjęta świadomie po
przedstawieniu trzech wariantów. **Nie proponować cennika jako ulepszenia SEO.**

**Kotwice „od X zł" zostają** i są jedynym miejscem, gdzie na stronie pada kwota:
700 zł netto portrety (od 04.08.2026, wcześniej 1 100), 120 zł za osobę sesje zespołowe,
600 zł produktowa i eventy. **Jedna kwota „od" na usługę** — bez drabinek, dopłat za kolejne
ujęcia i tabel progresywnych (decyzja Marcina z 04.08.2026).
Kotwica nie jest cennikiem. Filtruje zapytania bez budżetu i niesie pozycje
na zapytaniach cenowych, których jest w GSC cały klaster.

**Słowo „cennik" zostaje w nagłówkach i w pytaniach FAQ**, bo to ono jest wpisywane
w wyszukiwarkę. Zmienia się obietnica, nie słownictwo: zamiast „tu masz ceny" jest
„napisz po wycenę". Potwierdzenie z rynku: najwyżej rankująca strona konkurencji
na tym klastrze nie podaje ani jednej kwoty i cały tekst buduje wokół pytania
„za co płacisz".

⚠️ **Pułapka, w którą wpadłem 03.08:** napisałem w FAQ „ceny są na tej stronie,
w sekcji Cennik", nie sprawdziwszy, czy taka sekcja się renderuje. Nie renderowała się
nigdzie, bo `PortfolioPricing` zwracał `null` przy braku danych cenowych, usuniętych
przy audycie 06.07. **Zanim odeślesz czytelnika do sekcji na stronie, otwórz tę stronę
i sprawdź, że sekcja tam jest.**

## Słowa, które brzmią urzędowo (dodane 03.08.2026)

**„na piśmie"** przy wycenie. Miało znaczyć „konkretna kwota, nie rzucona przez telefon",
a brzmi jak pismo procesowe. Zamiast tego: **„mailem"**, a gdy trzeba oddać konkretność,
**„wycena z rozpisanymi pozycjami"**.

Reguła ogólna: jeśli słowo pasowałoby do urzędowego pisma, nie przechodzi testu
nadrzędnego. Marcin nie powie klientowi przez telefon „prześlę wycenę na piśmie".
