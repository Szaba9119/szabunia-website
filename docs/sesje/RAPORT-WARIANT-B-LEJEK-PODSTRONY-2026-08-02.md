# Raport — wariant B: lejek na podstronach usług + dwa znaleziska w Google Ads

Data: 2026-08-02. Podstawa: `docs/sesje/ANALIZA-LEJEK-PODSTRONY-USLUG-2026-08-02.md`
i Twój wybór wariantu B oraz „tak, oba" dla Adsów.

**Status:** DONE dla kodu (czeka na Twoje `git apply` i push). PARTIAL dla Adsów:
jedno znalezisko rozstrzygnięte i większe, niż zakładałem, drugiego nie domknąłem
i piszę wprost, czego nie ustaliłem.

---

## Część 1. Kod (wariant B)

### Co zrobione

- **Naprawa „netto netto"** na sześciu z siedmiu podstron. `ServiceHero.tsx` dokleja
  teraz „netto" tylko wtedy, gdy słowa jeszcze nie ma w `service.price`.
- **Kotwica cenowa przeniesiona pod długi opis**, tuż nad chipy zaufania. Byłem tu
  o krok dalej, niż mówił opis wariantu A („pod krótki opis"): przesunięcie o jedną
  pozycję nic by nie zmieniło, bo cena i tak zostawała w pierwszym ekranie na telefonie.
  Powrót to przeniesienie jednego akapitu z bloku 3 do bloku 1, komentarz w kodzie
  mówi dokładnie gdzie.
- **Logotypy klientów przeniesione zaraz pod hero**, przed pasek galerii.
- **Nowy komponent `ServiceAuthor.tsx`**: karta „Kto to zrobi" ze zdjęciem, dwoma
  akapitami i czterema liczbami. Wstawiona po sekcji wideo, przed „Jak wygląda…".
- **Liczby wchłonięte do karty autorskiej.** `TrustStats` przestał być renderowany,
  a jego dane wystawione jako `TRUST_STATS` i importowane przez kartę. Jedno źródło,
  zero duplikatu liczb. Bez tego strona urosłaby o cały ekran.

### Skąd wzięła się treść karty

Wszystko z istniejącej sekcji `About.tsx` na stronie głównej: od 2018 roku, baza
w Poznaniu, praca w całej Polsce i Europie, jeden twórca, studia z zarządzania.
**Zero nowych twierdzeń.** Zdjęcie to `marcin-hero-light-4.jpg` (headshot z hero strony
głównej), nie `marcin-o-mnie.jpg`: w kadrze 112–160 px sylwetka z aparatem daje twarz
wielkości znaczka. Jeśli chcesz inne zdjęcie albo inne zdania, to jedna zmiana w pliku.

Nagłówek karty to `h2` „Kto to zrobi", nie `h1`. `h1` podstrony nadal niesie frazę
(decyzja SEO z 30.07), hasła ze strony głównej nie ma, linku „więcej o mnie" też nie
(lejek podstron bez bocznych wyjść, decyzja z 06.07).

### Pomiary przed i po

`/uslugi/eventy-reportaze`, ten sam build lokalnie, te same viewporty.

**Telefon 390 × 844**

| element | przed | po |
|---|---|---|
| H1 | 162 px | 162 px |
| **cena** | **245 px (pierwszy ekran)** | **998 px (drugi ekran)** |
| zdjęcie usługi | 378 px | 350 px |
| logotypy klientów | 2 081 px | **1 266 px** |
| „Cześć, jestem Marcin" | nie istnieje | 2 439 px |
| liczby | 2 302 px | 2 725 px |
| długość strony | 8 069 px (9,6 ekranu) | 8 452 px (10,0 ekranu) |

**Desktop 1440 × 900**

| element | przed | po |
|---|---|---|
| **cena** | 312 px | 553 px |
| logotypy klientów | 1 979 px | **910 px** |
| „Cześć, jestem Marcin" | nie istnieje | 2 254 px |
| długość strony | 6 042 px (6,7 ekranu) | 6 259 px (7,0 ekranu) |

Czyli: na telefonie pierwszy ekran to teraz breadcrumb, H1, krótki opis i zdjęcie
realizacji. Bez ceny. Logotypy weszły o 815 px wyżej na telefonie i o 1 069 px wyżej
na desktopie. Strona urosła o 383 px na telefonie (+4,7%) i o 217 px na desktopie
(+3,6%). To cały koszt karty autorskiej po wchłonięciu liczb.

### Lint / Build

- `npm run lint`: PASS, zero błędów i ostrzeżeń
- `npx tsc --noEmit`: PASS
- `npm run build`: PASS
- Wyrenderowany HTML wszystkich siedmiu podstron sprawdzony: ceny bez podwójnego
  „netto", `sesje-zespolowe` poprawnie „od 120 zł netto/os."
- Przejazd wizualny w Chromium 390 px i 1440 px, zrzuty w załączeniu

### Pliki zmienione / utworzone

- `src/components/ServiceAuthor.tsx` — nowy, karta „Kto to zrobi" plus liczby
- `src/components/ServiceHero.tsx` — fix „netto netto", kotwica cenowa pod opis
- `src/components/TrustStats.tsx` — `STATS` wystawione jako `export const TRUST_STATS`
- `src/app/uslugi/[slug]/page.tsx` — logotypy pod hero, karta autorska zamiast `TrustStats`

Diff: `docs/sesje/wariant-B-lejek-podstrony-2026-08-02.diff` (216 linii, 4 pliki).
Nakładanie: `git apply docs/sesje/wariant-B-lejek-podstrony-2026-08-02.diff`.

### Problemy i decyzje

1. **`TrustStats.tsx` nie jest już nigdzie renderowany**, ale plik zostaje, bo eksportuje
   dane do karty. Można go w przyszłości uprościć do samego eksportu. Nie robiłem tego
   sam, bo to sprzątanie poza zakresem.
2. **Nie oceniłem LCP po zmianie.** Karta ładuje drugie zdjęcie Marcina, ale bez
   `priority` i poniżej folda, więc nie powinna ruszyć LCP. Warto zmierzyć w PSI
   po deployu i porównać z bazą 3,6 s.
3. **Tekst karty to draft.** Fakty są Twoje i już opublikowane, ale sformułowania moje.
   Przeczytaj dwa akapity, zanim to pójdzie na produkcję.

### Sugerowany commit message

`feat(uslugi): karta autorska na podstronach, logotypy pod hero, fix ceny netto netto`

---

## Część 2. Google Ads

### 2.1 Prostuję to, co napisałem rano

W analizie napisałem, że `/uslugi/sesje-zespolowe` (219 wyświetleń, 0 kliknięć)
i `/uslugi/eventy-reportaze` (103, 0) to problem treści reklamy. **To było błędne.**
Te wyświetlenia pochodzą z linków do podstron dołączanych do cudzych reklam, a nie
z reklam tych grup. Zerowy CTR pojedynczego linku do podstrony jest normalny.
Sprawdziłem to dopiero po wejściu w raport komponentów.

Prawda jest ostrzejsza od mojej pierwszej wersji.

### 2.2 Realny obraz: konto to praktycznie jedna usługa

Ostatnie 30 dni, jedna kampania („Pierwsza pro kampania"), cztery grupy reklam,
cztery reklamy:

| reklama / grupa | wyświetlenia | kliknięcia | CTR | koszt |
|---|---|---|---|---|
| Portrety i wizerunek | 697 | 57 | 8,18% | **355,91 zł** |
| Fotografia produktowa | 327 | 16 | 4,89% | 101,48 zł |
| **Eventy i reportaże** | **9** | **0** | 0% | 0 zł |
| **Sesje zespołowe** | **0** | **0** | – | 0 zł |
| razem | 1 033 | 73 | 7,07% | 457,39 zł |

**78% budżetu idzie na portrety. Grupa eventowa dostała dziewięć wyświetleń w miesiąc,
zespołowa zero.** To nie jest kwestia słabego tekstu reklamy, bo te reklamy się prawie
nie wyświetlają. Przy jednej kampanii, wspólnym budżecie i automatycznym ustalaniu
stawek algorytm skupia wydatek tam, gdzie widzi konwersje, czyli na portretach.

Dlaczego to warto ruszyć: wg `CLAUDE.md` dziesięć z jedenastu realizacji referencyjnych
to eventy, a repozycjonowanie z 30.07 postawiło eventy przed portretami w metadanych
i JSON-LD. Reklamy robią dokładnie odwrotnie. **To jest największa pojedyncza rzecz
do decyzji w tym koncie**, dużo większa niż wszystko, co dziś zmieniłem w kodzie.

Do sprawdzenia przed jakąkolwiek zmianą (nie ruszałem, to Twoje pieniądze i ustawienia):
liczba i typ dopasowania słów kluczowych w grupach eventowej i zespołowej, wynik jakości,
oraz czy przy tym budżecie te grupy nie powinny siedzieć w osobnej kampanii z własnym
budżetem. Inaczej zawsze przegrają wewnętrzną licytację z portretami.

### 2.3 Dwa linki do podstron prowadzą na stronę główną

Sprawdziłem pięć z sześciu linków do podstron, otwierając każdy w edytorze i czytając
pole „Końcowy URL". Dwa mają zły adres, oba nietykane od **4 marca 2026**, czyli sprzed
całej lipcowej przebudowy:

| link do podstrony | co obiecuje | dokąd prowadzi | wyświetlenia / 30 dni |
|---|---|---|---|
| **Kontakt** | „Napisz lub zadzwoń. Bezpłatna wycena sesji zdjęciowej" | `https://szabunia.pl/` | 89 |
| **Portfolio** | „Realizacje z sesji biznesowych" | `https://szabunia.pl/` | 161 |

Ten pierwszy boli najbardziej: człowiek klika „napisz lub zadzwoń", a ląduje na stronie
głównej i musi sam znaleźć formularz. Formularz na `/kontakt` to dziś jedyna żywa
konwersja na stronie. Poprawka to zmiana jednego pola w każdym z tych dwóch linków
na `https://szabunia.pl/kontakt` i `https://szabunia.pl/portfolio`.

Pozostałe sprawdzone są poprawne: „Sesje biznesowe" → `/uslugi/wizerunek-portrety`,
„Fotografia produktowa" → `/uslugi/fotografia-produktowa`, „Fotografia eventowa" →
`/uslugi/eventy-reportaze`. Szóstego („Sesje zespołowe") nie otwierałem, ale jego
219 wyświetleń zgadza się co do jednego z wierszem `/uslugi/sesje-zespolowe` w raporcie
stron docelowych, więc adres jest prawidłowy.

**Nic nie zmieniałem w koncie.** Otwierałem edytory tylko do odczytu, żadnego zapisu.

### 2.4 `/kalkulator`: nie domknąłem

Adres `https://szabunia.pl/kalkulator` **nadal jest aktywnym celem reklamowym**:
73 wyświetlenia w ostatnich 14 dniach, 191 i 2 kliknięcia (9,83 zł) w 30 dniach.
Prowadzi na przekierowanie 301 do `/kontakt`, więc nie jest to zepsuty link, tylko
niepotrzebny przeskok i sygnał, że gdzieś siedzi stary adres.

Czego **nie** ustaliłem: skąd dokładnie. Wykluczyłem linki do podstron (pięć sprawdzonych,
szósty potwierdzony arytmetycznie) i komponenty cenowe (takich w koncie nie ma).
Zostają dwie możliwości: końcowy URL którejś z czterech reklam albo **końcowy URL
na poziomie pojedynczego słowa kluczowego**, co jest moim głównym podejrzeniem, bo to
typowa pozostałość po erze kalkulatora.

Gdzie szukać: Kampanie → Listy odbiorców, słowa kluczowe i treść → słowa kluczowe
w wyszukiwarce, dodać kolumnę „Końcowy URL" i posortować. Alternatywnie otworzyć każdą
z czterech reklam i sprawdzić pole końcowego adresu. Mogę to dokończyć w kolejnej sesji,
jeśli chcesz. Kwota jest mała, ale to jedyny adres w koncie, który celuje w nieistniejącą
stronę.

---

## Co dalej

1. `git apply` diffa, `npm run build` u siebie, obejrzenie karty na telefonie, push.
2. Poprawić dwa linki do podstron („Kontakt" i „Portfolio") na właściwe adresy.
3. Zdecydować, co z grupami eventową i zespołową: osobna kampania z własnym budżetem
   czy świadome pozostawienie konta pod portrety.
