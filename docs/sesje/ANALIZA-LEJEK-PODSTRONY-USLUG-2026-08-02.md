# Analiza: lejek na podstronach usług (wejście z pominięciem strony głównej)

Data: 2026-08-02. Pytanie Marcina: „kto wchodzi przez `/uslugi/[slug]`, nie widzi wstępu
z hero strony głównej, tylko od razu cenę od 600 zł. Czy nie przekleić tam hero z home?"

Metoda: kod z repo (klon `Szaba9119/szabunia-website`, HEAD `2b87ef0`), pomiary DOM na
żywej produkcji przez Chrome (viewport 1920×958), GSC, GA4 i Google Ads na żywo.

---

## 1. Wniosek w trzech zdaniach

1. **Diagnoza jest trafna co do faktu, ale nietrafna co do kanału.** Z Google organicznie
   w podstrony usług weszły **2 osoby w 3 miesiące**. Z Google Ads w ostatnich 30 dniach
   weszło tam **49 osób i 301 zł** budżetu, czyli dwie trzecie wszystkiego, co wydajesz.
   To problem ruchu płatnego, nie SEO.
2. **Brakującym elementem nie jest hero, tylko człowiek.** Dowód (logotypy, liczby, opinia)
   na podstronach jest, zaczyna się w drugim ekranie na desktopie. Nie ma za to **ani jednego
   zdania o tym, kto to robi**: słowa „jestem Marcin" nie ma nigdzie na `/uslugi/*`.
   Sprawdzone na żywo.
3. **Przeklejenie hero ze strony głównej odradzam** (powody w §5), ale cel, o który Ci chodzi,
   da się osiągnąć taniej i bez ryzyka dla SEO. Propozycje w §6.

Przy okazji: na **sześciu z siedmiu** opublikowanych podstron cena wyświetla się jako
**„od 600 zł netto netto"**. Na produkcji od 23.07.2026. Szczegóły w §4.1.

---

## 2. Co dokładnie widzi wchodzący

Kolejność w `ServiceHero.tsx` (DOM = kolejność na telefonie):

```
breadcrumb → H1 → CENA → krótki opis → zdjęcie → długi opis → chipy → CTA
```

Pomiar `/uslugi/eventy-reportaze`, desktop 1920×958:

| element | pozycja Y |
|---|---|
| H1 | 214 px |
| **cena „od 600 zł netto netto"** | **332 px** |
| CTA „Zapytaj o ofertę" | 641 px |
| pasek galerii | 910 px |
| logotypy „Współpracowałem m.in. z" | 1 979 px |
| liczby (250 000+ zdjęć, 1 000+ sesji…) | 2 262 px |
| opinia klienta | ~2 700 px |

Cała strona: 6 142 px (6,4 ekranu). Na `/uslugi/wizerunek-portrety` (bez sekcji wideo)
logotypy wchodzą wcześniej, na 1 339 px, liczby na 1 622 px, opinia na 2 303 px.

Na telefonie jest gorzej niż na desktopie, bo zdjęcie jest kwadratowe i zajmuje całą
szerokość: pierwszy ekran to breadcrumb, H1, cena, krótki opis i góra zdjęcia. Długi opis,
chipy i CTA są już pod foldem.

**Czego na podstronie nie ma w ogóle:** komponent `About.tsx` („Cześć, jestem Marcin. Od 2018
roku…", studia z zarządzania, wyróżnienie Portret 2022, zdjęcie Marcina) renderuje się
wyłącznie na stronie głównej. Na `/uslugi/*` nie ma żadnego odpowiednika.

**Ważny kontekst do decyzji:** kolejność „tytuł → cena → opis" nie jest przypadkiem.
Komentarz w `ServiceHero.tsx` mówi wprost: *„Kolejność (prośba Marcina, 2026-07-23)"*, a sama
kotwica cenowa jako mały element typograficzny to `brief-22 §3` z depricingu. Czyli to Twoja
własna decyzja sprzed dziesięciu dni. Nie znaczy, że zła, ale zmiana jest cofnięciem
świadomego ustalenia, nie naprawą błędu.

---

## 3. Kto tam faktycznie wchodzi. Liczby

### 3.1 Google Ads, ostatnie 30 dni (do 2.08.2026)

| strona docelowa | kliknięcia | wyświetlenia | CTR | śr. CPC | koszt |
|---|---|---|---|---|---|
| `/uslugi/wizerunek-portrety` | **39** | 564 | 6,91% | 6,17 zł | **240,63 zł** |
| `/` (strona główna) | 22 | 620 | 3,55% | 6,65 zł | 146,31 zł |
| `/uslugi/fotografia-produktowa` | **10** | 327 | 3,06% | 6,06 zł | **60,62 zł** |
| `/kalkulator` | 2 | 191 | 1,05% | 4,92 zł | 9,83 zł |
| `/uslugi/eventy-reportaze` | 0 | 103 | 0% | – | 0 zł |
| `/uslugi/sesje-zespolowe` | 0 | 219 | 0% | – | 0 zł |
| **razem** | **73** | 1 033 | 7,07% | 6,27 zł | **457,39 zł** |

**49 z 73 płatnych kliknięć (67%) i 301,25 zł z 457,39 zł (66%) ląduje na podstronach usług,
nie na stronie głównej.** To jest realna publiczność tego problemu i to jest ruch, za który
płacisz około 6 zł za osobę.

### 3.2 Google Search Console, okno 3 miesięcy (stan 2.08.2026)

| strona | kliknięcia | wyświetlenia | CTR | śr. pozycja |
|---|---|---|---|---|
| `/` | 15 | 608 | 2,5% | 10,3 |
| `/uslugi/fotografia-produktowa` | 2 | 507 | 0,4% | 27,9 |
| `/uslugi` (hub) | 1 | 26 | 3,8% | 7,3 |
| `/uslugi/wizerunek-portrety` | 0 | 147 | 0% | 23,8 |
| `/uslugi/zdjecia-wideo-z-drona` | 0 | 128 | 0% | 22,3 |
| `/uslugi/pakiety-foto-wideo` | 0 | 59 | 0% | **6,9** |
| `/uslugi/sesje-zespolowe` | 0 | 51 | 0% | **7,7** |
| `/uslugi/eventy-reportaze` | 0 | 43 | 0% | 16,8 |
| `/uslugi/wideo-marketing` | 0 | 34 | 0% | **7,5** |

Podstrony usług razem: **2 kliknięcia na 969 wyświetleń**. Czyli scenariusz „ktoś wchodzi
z SEO prosto na usługę" wydarzył się w ciągu trzech miesięcy dwa razy.

Ciekawsze jest co innego: `pakiety-foto-wideo`, `sesje-zespolowe` i `wideo-marketing`
**siedzą na pierwszej stronie Google** (pozycja 6,9 / 7,7 / 7,5) i mają zero kliknięć przy
34–59 wyświetleniach. Przy takim wolumenie zero mieści się jeszcze w szumie statystycznym,
ale kierunek jest jasny: tam wąskim gardłem jest **tytuł i opis w wynikach wyszukiwania**,
a nie układ strony. Układ nie ma szansy zadziałać, skoro nikt nie klika.

### 3.3 GA4, 28 dni (5.07–1.08.2026)

35 aktywnych użytkowników, 189 wyświetleń stron. Strona główna: 98 wyświetleń, 28
użytkowników (80% wszystkich), 57 s zaangażowania, 2 kluczowe zdarzenia.
`/uslugi/wizerunek-portrety`: 26 wyświetleń, 11 użytkowników, **1 min 05 s** zaangażowania,
**0 kluczowych zdarzeń**. `/uslugi/eventy-reportaze`: 10 / 5 / 50 s / 0.
`/uslugi/fotografia-produktowa`: 5 / 4 / 14 s / 1.

Dwie rzeczy warte odnotowania:

- **80% wszystkich użytkowników i tak widzi stronę główną.** Najwyżej ~7 osób na 35 w cztery
  tygodnie w ogóle jej nie dotknęło, wliczając w to wejścia na bloga i `/kontakt`. Skala
  problemu „człowiek nie zna kontekstu" jest mała, ale ci ludzie są najdrożsi.
- **Rozjazd pomiarowy: Ads raportuje 39 kliknięć na `/uslugi/wizerunek-portrety`, GA4
  widzi 11 użytkowników.** Nie twierdzę, że 28 osób zniknęło. Najbardziej prawdopodobne
  wyjaśnienia to blokery reklam, odrzucona zgoda na cookies i odbicia przed zadziałaniem
  taga. Ale to warto sprawdzić osobno, bo jeżeli to jednak wina banera zgody, to każda
  ocena skuteczności tych stron jest liczona na jednej trzeciej danych.

---

## 4. Trzy rzeczy do naprawienia niezależnie od decyzji o hero

### 4.1 „netto netto" na sześciu z siedmiu podstron (BŁĄD, do naprawy od razu)

`ServiceHero.tsx` renderuje `{service.heroPriceLabel ?? service.price} netto`, a w
`services.tsx` pola `price` **już zawierają słowo „netto"** („od 600 zł netto”). Efekt na
żywo, sprawdzony w przeglądarce 2.08.2026:

- `/uslugi/eventy-reportaze` → „od 600 zł netto netto”
- `/uslugi/fotografia-produktowa` → „od 600 zł netto netto”
- to samo na `sesje-zespolowe`, `pakiety-foto-wideo`, `wideo-marketing`, `zdjecia-wideo-z-drona`
- poprawnie tylko `/uslugi/wizerunek-portrety` („pakiety od 1 100 zł netto”), bo ma
  `heroPriceLabel` bez słowa „netto”

Wygląda na skutek uboczny zmiany kolejności w hero z 23.07.2026. To jest **druga linijka
tekstu na stronie, za którą płacisz 6,06 zł za klik**.

Poprawka jest jednolinijkowa (doklejaj „netto” tylko gdy go nie ma). Zrobiona i zweryfikowana
w klonie repo: `npm run lint` czysty, `npx tsc --noEmit` czysty, `npm run build` przechodzi,
wyrenderowany HTML wszystkich siedmiu podstron sprawdzony. Diff czeka, nie commituję.

### 4.2 Reklamy nadal kierują na `/kalkulator`

191 wyświetleń, 2 kliknięcia, 9,83 zł w 30 dni na adres, który od 23.07 jest przekierowaniem
301 na `/kontakt`. Kwota mała, ale to płacenie za przeskok. Do znalezienia w kampanii:
reklama albo rozszerzenie z tym adresem docelowym.

### 4.3 Dwie podstrony z ruchem płatnym zerowym mimo wyświetleń

`/uslugi/sesje-zespolowe`: 219 płatnych wyświetleń, 0 kliknięć. `/uslugi/eventy-reportaze`:
103 wyświetlenia, 0 kliknięć. Przy CTR konta 7,07% to odstaje. To problem treści reklamy albo
dopasowania słów kluczowych, nie strony docelowej, bo do strony nikt nie dociera.

---

## 5. Dlaczego nie przeklejać hero ze strony głównej

Cztery konkretne koszty, w kolejności wagi:

1. **Zerwanie zgodności komunikatu na ruchu płatnym.** Ktoś klika reklamę na „portrety
   biznesowe Poznań" i płacisz za to 6,17 zł. Pierwszy ekran musi potwierdzić „tak, to jest
   dokładnie to". Wstawienie przed to generycznego „REALIZUJĘ CELE TWOJEJ MARKI" cofa
   potwierdzenie o jeden ekran. Na ruchu z reklam to standardowo kosztuje konwersje, nie
   dodaje ich.
2. **Konflikt z pracą nad SEO z 30.07.** Hero strony głównej ma własne H1 („Fotograf eventowy
   i biznesowy w Poznaniu”) i H2 z hasłem. Podstrona ma swoje H1 z frazą (pole `h1?` w
   `ServiceData`, wprowadzone specjalnie 30.07). Dwa bloki nagłówkowe na jednej stronie to
   albo dwa H1, albo zdegradowanie frazy podstrony. Jedno i drugie psuje to, co dopiero
   ustawiliśmy.
3. **Duplikat treści na siedmiu podstronach.** Ten sam akapit i te same chipy powielone
   siedem razy. Google tego nie karze, ale też nic z tego nie ma, a Ty tracisz miejsce nad
   foldem na treść, która nie dotyczy tej usługi.
4. **LCP.** Oba hero mają zdjęcie z `priority` i `fetchPriority="high"`. Dwa takie obrazy na
   jednej stronie konkurują o pasmo. PageSpeed mobile jest dziś na 90 z LCP 3,6 s
   (zaakceptowane 07.07). To by zjechało. Plus około 800 px długości na stronie, która ma
   już 6,4 ekranu na desktopie i więcej na telefonie.

Krótko: Twoja intuicja („człowiek nie wie, z kim ma do czynienia, a już widzi cenę") jest
dobra. Lekarstwo w postaci drugiego hero leczy nie ten objaw.

---

## 6. Co proponuję zamiast. Trzy warianty do wyboru

### Wariant A: minimalny, zero ryzyka SEO

1. Naprawa „netto netto" (§4.1, gotowe, czeka na Twoje „tak").
2. **Kotwica cenowa schodzi pod krótki opis** albo do rzędu chipów zaufania. Zostaje na
   pierwszym ekranie, ale po zdaniu, które mówi co dostajesz, nie przed nim. Nie usuwam jej:
   przy 6 zł za klik filtrowanie budżetów 300 zł na wstępie oszczędza pieniądze.
3. **Logotypy klientów zaraz pod hero**, przed paskiem galerii. Dziś wchodzą na 1 979 px na
   `eventy-reportaze`. Po zmianie brand proof jest w drugim ekranie na każdej podstronie,
   tak jak na desktopowej stronie głównej. Zero nowej treści, zero ryzyka.

Koszt: pół dnia. Ryzyko: żadne. Odwracalne jednym commitem.

### Wariant B: A + blok „kto to zrobi" (**rekomendowany**)

Do wariantu A dochodzi **wąski blok autorski wstawiony po hero**: zdjęcie Marcina w małym
kadrze, dwa albo trzy zdania (od 2018, Poznań, jeden twórca, konkret związany z tą usługą)
i cztery liczby, które już masz w `TrustStats`. Bez nagłówka H1, bez powtarzania hasła,
bez powielania akapitów z `About.tsx`.

To jest dokładnie to, czego brakuje: „Cześć, nazywam się Marcin", tylko w wersji na jeden
ekran zamiast na cały hero. Treść do napisania i zatwierdzenia przez Ciebie, nie wymyślam
faktów.

Koszt: dzień. Ryzyko: małe, jeden nowy komponent, brak zmian w nagłówkach i metadanych.

### Wariant C: Twój pomysł jeden do jednego

Hero strony głównej nad obecnym hero podstrony. Wykonalne w godzinę. Odradzam z powodów
z §5. Jeśli mimo to chcesz to zobaczyć, proponuję zrobić to jako **test na jednej stronie**:
`/uslugi/wizerunek-portrety` (39 płatnych kliknięć w 30 dni, największa próbka), okno
obserwacji 3–4 tygodnie, miara: `contact_submit` i `phone_click` z tej strony w GA4.
Nie na siedmiu podstronach naraz.

---

## 7. Czego nie wiem i co warto domierzyć

- **Nie zmierzyłem układu na realnej szerokości telefonu.** Rozszerzenie Chrome nie zmieniło
  rozmiaru okna w tej sesji, a emulacja DevTools jest przez nie niedostępna. Kolejność
  elementów wynika jednoznacznie z DOM (H1 → cena → opis → zdjęcie), ale dokładnych pikseli
  na 390 px nie podaję jako pomiaru.
- **Rozjazd Ads 39 vs GA4 11** (§3.3). Do sprawdzenia osobno, bo wpływa na każdą ocenę
  skuteczności podstron.
- **Nie wiem, ile z tych 49 płatnych kliknięć to były realne zapytania.** GA4 pokazuje 0
  kluczowych zdarzeń na `/uslugi/wizerunek-portrety` przy 26 wyświetleniach, ale przy tak
  małych liczbach i przy rozjeździe pomiarowym nie wyciągałbym z tego mocnego wniosku.
- **Wolumen jest za mały na wnioskowanie statystyczne.** 35 użytkowników w cztery tygodnie
  znaczy, że każdą zmianę trzeba traktować jak decyzję na podstawie osądu, a nie jak wynik
  testu. Nie da się tu zrobić A/B, który cokolwiek udowodni.
