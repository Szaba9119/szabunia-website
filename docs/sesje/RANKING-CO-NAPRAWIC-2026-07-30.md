# Co naprawić, żeby strona była wyżej w Google

**30.07.2026 | Audyt pod pozycje, nie pod klikalność**

Metadane (title i description) zostały wdrożone dziś osobno. Ten dokument dotyczy czegoś
innego: **dlaczego strona stoi tam, gdzie stoi, i co realnie tę pozycję ruszy.**

Sprawdzone bezpośrednio w kodzie, nie z pamięci ani z plików opisowych.

---

## 0. Rzecz, którą trzeba przyjąć na wejściu

**Warstwa on-page jest już prawie wyczerpana.** Sprawdziłem: `robots.txt` poprawny,
sitemap generowany z danych, kanoniczne adresy na każdej stronie, JSON-LD `Service` +
`Offer` + `FAQPage` + okruszki, karty OG 1200×630 na każdej stronie, `@id` w JSON-LD,
`use client` zdjęte z 14 komponentów, obrazki w AVIF/WebP z rocznym cache, linkowanie
wewnętrzne od 4 do 10 miejsc na każdą stronę usługi plus 4 do 9 linków z bloga.
To jest zrobione lepiej niż na większości stron fotografów w Poznaniu.

**Wąskim gardłem nie jest kod.** Są dwie rzeczy:

1. **Domena ma siedem tygodni.** Pierwsze wyświetlenie w GSC to 10.06.2026.
2. **Zero backlinków** (`docs/sesje/LINKI-I-KATALOGI-2026-07-29.md`, `PELNY2907` §5).

Przy takim stanie pozycje 20-45 na lokalnych frazach handlowych są normalne, a strona
główna na 11,83 przy `fotograf biznesowy poznań` to wynik **dobry**, nie zły.

Dlatego lista niżej jest uporządkowana wg tego, ile realnie rusza pozycję, a nie wg tego,
co najłatwiej poprawić. Trzy pierwsze punkty to 90% efektu.

---

## 1. Dźwignia numer jeden: mapa przekierowań ze starej domeny

**To decyzja, która czeka na Ciebie od 29.07** (`LINKI-I-KATALOGI-2026-07-29.md` §3).
Mam teraz dane, których ten dokument nie miał, i wzmacniają one wariant A.

### Stan

`next.config.ts` przekierowuje **wszystkie** adresy ze starej domeny na stronę główną:

| Stary adres | Dziś prowadzi na |
|---|---|
| `/portrety-biznesowe` | `/` |
| `/fotografia-eventowa` | `/` |
| `/zdjecia-produktowe` | `/` |
| `/video` | `/` |
| `/o-mnie` | `/` |
| wszystko inne | `/` |

Google traktuje przekierowanie na stronę niepowiązaną tematycznie jak miękki błąd 404
i **nie przenosi sygnałów rankingowych**. Osiem lat historii pod `marcinszabunia.pl`
nie trafia nigdzie.

### Nowy dowód z GSC, którego nie było 29.07

Rozkład pozycji układa się dokładnie tak, jak gdyby cały autorytet zbierał się na jednym
adresie:

| Strona | Pozycja | Wyświetlenia |
|---|---|---|
| **`/` (wszystko tu spływa)** | **11,83** | 89 |
| `/uslugi/fotografia-produktowa` | 23,82 | 84 |
| `/uslugi/zdjecia-wideo-z-drona` | 22,17 | 30 |
| `/uslugi/wizerunek-portrety` | **45,62** | 16 |
| `/uslugi/eventy-reportaze` | **33,00** | 7 |

Strona główna jest o **11 do 34 pozycji wyżej** niż każda podstrona usługi, mimo że
podstrony mają dedykowaną treść, własne JSON-LD i po 4-10 linków wewnętrznych.
To jest sygnatura problemu z rozkładem autorytetu, nie z jakością podstron.

`/uslugi/fotografia-produktowa` i `/uslugi/zdjecia-wideo-z-drona` radzą sobie najlepiej
z podstron i to są **dokładnie te dwie, które nie mają odpowiednika w starej mapie
przekierowań** kierującego ruch gdzie indziej.

### Rekomendacja

**Wariant A z §3 tamtego dokumentu: mapowanie tematyczne.** Jedna edycja `next.config.ts`,
15 minut, w pełni odwracalne jednym commitem. Punkt odniesienia do pomiaru macie teraz
w tabeli wyżej.

To jest **stop-condition numer 2** z repo `CLAUDE.md` (zmiana `next.config.ts`), więc
nie ruszam tego bez Twojego wyraźnego „tak". Powiedz słowo i robię.

---

## 2. Dźwignia numer dwa: nagłówki H1 nie zawierają żadnych fraz

To jedyna poważna dziura on-page, jaką znalazłem. H1 jest jednym z najmocniejszych
sygnałów na stronie i dziś nie pracuje na żadnej podstronie.

### Strona główna

`src/components/Hero.tsx:34` — H1 brzmi:

```
REALIZUJĘ
CELE TWOJEJ
MARKI.
```

**Zero słów, których ktokolwiek szuka.** Nie ma „fotograf", nie ma „Poznań", nie ma
„eventy". Strona główna walczy o `fotograf biznesowy poznań` (59 wyświetleń, pozycja 11,08)
nagłówkiem, który nie zawiera ani jednego z tych trzech słów.

Akapit pod H1 to `Fotografia i wideo, które budują zaufanie, przyciągają klientów
i wzmacniają autorytet na rynku.` Dodatkowo jest to konstrukcja „X, które Y" z czarnej
listy w `docs/zasady-tekstow.md`, plus triada czasownikowa.

### Strony usług

`src/components/ServiceHero.tsx:37` renderuje jako H1 pole `service.title`, czyli:

| Strona | H1 dziś | Czego szukają ludzie |
|---|---|---|
| `wizerunek-portrety` | Wizerunek & Portrety | fotograf biznesowy poznań, sesja wizerunkowa poznań |
| `eventy-reportaze` | Eventy & Reportaże | fotograf eventowy poznań, fotograf na event firmowy |
| `sesje-zespolowe` | Sesje zespołowe | headshoty zespołu, zdjęcia pracowników |
| `fotografia-produktowa` | Fotografia produktowa | **packshot poznań** (100 wyśw.), packshoty poznań |
| `zdjecia-wideo-z-drona` | Zdjęcia i wideo z drona | zdjęcia z drona poznań |

**Żaden H1 na stronie nie zawiera słowa „Poznań".** Przy zapytaniach lokalnych to jest
strata, którą da się odrobić w jednej sesji. `packshot` w ogóle nie występuje w H1,
a to najmocniejsze zapytanie w całym GSC.

### Jak to zrobić bez ruszania struktury

`service.title` jest używany w nawigacji, kartach na stronie głównej, okruszkach i w polu
`name` w JSON-LD. Nie wolno go po prostu podmienić. Właściwe rozwiązanie to **dodać
osobne pole `h1` w `ServiceData`**, opcjonalne, z fallbackiem na `title`, i użyć go tylko
w `ServiceHero.tsx`. Dwa pliki, zero zmian w układzie stron, zgodne z ograniczeniem
„zmieniamy tylko liczby, strukturę zostawiamy do września".

Propozycje H1 (zgodne z `zasady-tekstow.md`):

| Strona | Propozycja H1 |
|---|---|
| `/` | Fotograf eventowy i biznesowy w Poznaniu |
| `wizerunek-portrety` | Portrety biznesowe i headshoty, Poznań |
| `eventy-reportaze` | Obsługa eventów firmowych w Poznaniu |
| `sesje-zespolowe` | Headshoty zespołu w Twoim biurze |
| `pakiety-foto-wideo` | Foto, wideo i dron z jednego wejścia |
| `fotografia-produktowa` | Packshot i fotografia produktowa, Poznań |
| `wideo-marketing` | Wideo dla firm i filmy korporacyjne |
| `zdjecia-wideo-z-drona` | Zdjęcia i wideo z drona dla firm |

Zmiana H1 na stronie głównej dotyka `Hero.tsx`, czyli tekstu, który widzi każdy odwiedzający.
**To jest decyzja wizerunkowa, nie techniczna.** „REALIZUJĘ CELE TWOJEJ MARKI" jest mocniejsze
emocjonalnie i słabsze w SEO. Kompromis: H1 z frazą, a hasło zostaje jako element graficzny
nad nim albo jako H2. Nie robię tego bez Twojej zgody.

---

## 3. Dlaczego sześć wpisów ma zero wyświetleń

Sprawdziłem daty publikacji. Odpowiedź jest prosta i nie ma nic wspólnego z treścią:

| Data | Ile wpisów |
|---|---|
| 2026-06-27 | 1 |
| **2026-06-28** | **9 wpisów jednego dnia** |

Z tych dziesięciu **cztery mają wyświetlenia** (`ile-kosztuje-film-z-drona` 29,
`foto-wideo-dron-z-jednego-wejscia` 3, `spojne-portrety-zespolu` 3,
`zdjecia-z-drona-dla-deweloperow` 2, `jak-wybrac-fotografa-na-event` 2),
a **sześć nie ma żadnych.**

To klasyczny efekt wrzucenia dużej partii treści jednego dnia na domenę, która ma sześć
tygodni. Google indeksuje część i wraca do reszty później. **Wpisy mają miesiąc.
To nie jest awaria, to jest młodość.**

### Co zrobić

1. **Sprawdzić w GSC → Indeksowanie stron**, czy te sześć adresów jest w indeksie,
   czy w koszyku „Wykryta, obecnie niezaindeksowana". To rozstrzyga wszystko.
2. Jeśli są niezaindeksowane: **Sprawdzenie adresu URL → Poproś o zaindeksowanie**,
   po jednym. Limit około 10 dziennie, więc zmieścisz wszystkie.
3. Na przyszłość: **nie publikować dziewięciu wpisów jednego dnia.** Jeden na tydzień
   przez dwa miesiące daje ten sam wolumen i lepszą indeksację. `seo_strategy_szabuniapl.md`
   §4 zakłada zresztą 1 wpis na miesiąc, więc ta partia była odstępstwem od własnego planu.

Nic tu nie trzeba naprawiać w kodzie.

---

## 4. Strona główna na pozycji 11,83

Zsunęła się z 10,01, czyli przez granicę pierwszej strony wyników, i jej CTR spadł
z 2,66% na 1,12%. Dawała 15 z 23 kliknięć w całym okresie.

Co na to realnie wpływa, w kolejności siły:

| Ruch | Efekt | Skąd wiem |
|---|---|---|
| Mapa przekierowań, wariant A (§1) | **duży** | 8 lat historii domeny dziś nie trafia nigdzie |
| H1 z frazą (§2) | średni | dziś H1 nie ma żadnego słowa kluczowego |
| Opinie Google, 10 → 30 (§7) | średni przy zapytaniach lokalnych | RZ-Studio ma 248 |
| Backlinki z własnych powierzchni | średni, ale wolny | §2 tamtego dokumentu, 6 pozycji do odklikania |
| Metadane wdrożone dziś | **zero na pozycję** | to zmiana klikalności, nie rankingu |

Uczciwie: **pojedynczy ruch nie przeniesie Cię z 11,8 na 5.** Ale strona główna jest już
najbliżej pierwszej dziesiątki ze wszystkiego, co masz, więc każdy z tych ruchów daje
tu najwyższy zwrot na wysiłek.

---

## 5. `/uslugi/wizerunek-portrety`, spadek z 17,74 na 45,62

Najostrzejszy pojedynczy spadek w danych. To flagowa strona linii, która ma 27 leadów
w CRM, czyli najwięcej ze wszystkich.

**Hipoteza:** Google przełączył stronę docelową dla `fotograf biznesowy poznań` z tej
podstrony na stronę główną. Za nią mówi to, że w tym samym tygodniu fraza poprawiła się
z pozycji 20 na 11,08, a strona główna stoi na 11,83. Liczby się zgadzają.

**To inferencja, nie fakt.** Eksport GSC nie łączy zapytań ze stronami.

### Jak rozstrzygnąć w dziesięć minut

GSC → Wyniki wyszukiwania → zakładka **Strony** → kliknij
`https://szabunia.pl/uslugi/wizerunek-portrety` → przejdź na zakładkę **Zapytania**.

- Jeśli `fotograf biznesowy poznań` zniknął z jej listy, a jest na liście strony głównej:
  hipoteza potwierdzona, **nie ma awarii**, jest przetasowanie. Wtedy naprawą jest H1
  i treść, żeby odzyskać tę frazę dla podstrony.
- Jeśli fraza tam nadal jest, a pozycja spadła: to coś innego i wracamy do tego z danymi.

Nie proponuję żadnej zmiany w kodzie, dopóki nie wiadomo, który to przypadek.

---

## 6. Co jest w porządku, żeby nie szukać problemów tam, gdzie ich nie ma

Sprawdzone i nie wymaga niczego:

- `robots.txt` poprawny, blokuje tylko `/api/` i plik PDF lead magneta
- Sitemap generowany z danych, z ręcznie kontrolowaną datą `SITE_UPDATED`
- Kanoniczne adresy na wszystkich stronach
- JSON-LD: `ProfessionalService`, `Person`, `WebSite`, `Service` + `Offer` z `minPrice`,
  `FAQPage`, okruszki. `@id` dodane wczoraj
- Karty OG 1200×630 dla każdej strony statycznej, wygenerowane skryptem
- Objętość treści na stronach usług: od 2 630 do 5 564 znaków. Wystarczająca
- Linkowanie wewnętrzne: 4-10 miejsc na każdą stronę usługi, plus 4-9 linków z bloga
- Cztery strony portfolio z duplikatami metadanych są w `noindex`, więc nie kanibalizują
- `/kalkulator` przekierowuje 301 na `/kontakt`

Dwie drobne rzeczy warte odnotowania, ale nie warte pracy dziś:

- **`http://szabunia.pl/` figuruje w GSC jako osobna strona** (17 wyświetleń, pozycja 2,47).
  Sprawdź, czy przekierowanie http → https to 301, a nie 302
- **Wyniki produktowe:** Google czyta `minPrice` z JSON-LD stron usług i pokazuje je jako
  wynik produktowy (28 wyświetleń). Działa zgodnie z zamysłem, ale skutek uboczny jest taki,
  że kotwica „od X zł" może wyrenderować się w Google jako cena, mimo modelu „cena na zapytanie"

---

## 7. Opinie Google, jedyne kryterium z mierzalną dziurą

10 opinii przy około 100 obsłużonych firmach. RZ-Studio ma 248, Karatysz 28, Wołyniak 24
(`pozycja_w_topce_2026-07.md` §3a).

Opinie działają na dwie rzeczy naraz: pozycję w Mapach przy `fotograf biznesowy poznań`
i na to, co klient widzi w pierwszej sekundzie. To nie jest SEO tekstowe, ale przy
zapytaniach lokalnych bywa mocniejsze niż wszystko z tej listy.

Ruch z `CO_DALEJ_lista_dzialan.md`: **prośba o opinię w mailu z finałami**, nie po
zakończeniu projektu. Plus jednorazowa akcja do 14 klientów dostarczonych w 2026.
Cel 30 do końca roku jest realny przy dwóch zleceniach miesięcznie.

---

## 8. Czego nie naprawiać

**Nie dokładać treści na strony usług.** Od 2 630 do 5 564 znaków to wystarczająco.
Korelacja z pozycją i tak jej nie potwierdza: strona dronowa ma najwięcej treści (5 564)
i stoi na 22,17, a produktowa ma 3 160 i stoi na 23,82.

**Nie optymalizować strony dronowej pod obecne zapytania.** 90 ze 113 wyświetleń to
Skawina, Łańcut i Bochnia, czyli 400-500 km od Poznania.

**Nie pchać fotografii produktowej wyżej**, choć to 39% ruchu. Nie ma jej w mapie drogowej
(`seo_vs_strategia_2026-07-30.md` §2), a poprawia się sama: 28,26 → 23,82 w ciągu tygodnia.

**Nie oczekiwać, że dzisiejsze metadane podniosą pozycje.** Zmieniają to, co widzi człowiek
w wyniku, nie to, gdzie ten wynik stoi.

**Nie kupować pakietów katalogów.** `LINKI-I-KATALOGI-2026-07-29.md` §0 rozstrzyga to
jednoznacznie: polskie katalogi ogólne są w większości `nofollow`, bez ruchu, albo jedno
i drugie. Ich wartość to spójność NAP, nie moc linku.

---

## 9. Kolejność i czego się spodziewać

| # | Ruch | Kto | Czas | Czeka na |
|---|---|---|---|---|
| 1 | **Mapa przekierowań, wariant A** | ja | 15 min | **Twoje „tak"** (stop-condition 2) |
| 2 | GSC: zapytania dla `/uslugi/wizerunek-portrety` | Ty | 10 min | nic |
| 3 | GSC: indeksacja 6 wpisów z 28.06 + prośba o indeksację | Ty | 20 min | nic |
| 4 | **H1 na stronach usług** (nowe pole `h1`) | ja | 30 min | **Twoje „tak"** |
| 5 | H1 na stronie głównej | ja | 15 min | **decyzja wizerunkowa**, nie techniczna |
| 6 | Sześć własnych powierzchni z linkiem (FB, IG, Useme, YouTube, Vimeo, Behance) | Ty | ok. 2 h razem | nic |
| 7 | Opinie Google: prośba w mailu z finałami | Ty | nawyk | nic |
| 8 | Sprawdzić 301 na http → https | ja | 10 min | nic |

**Realistyczne oczekiwania.** Domena ma siedem tygodni. Punkty 1, 4 i 6 zaczną być widoczne
w GSC po **6-10 tygodniach**, nie po tygodniu. Punkty 2, 3 i 5 dają efekt szybciej,
bo dotyczą indeksacji i dopasowania do zapytania, nie autorytetu.

Jednocześnie warto pamiętać, co już się dzieje samo: w ostatnim tygodniu ruch był
**66% powyżej średniej** z całego okresu, a pozycje w obu klastrach priorytetowych
poprawiły się bez żadnej interwencji (`fotograf biznesowy poznań` 20 → 11,08,
`packshot poznań` 24,66 → 17,80). Domena nabiera siły. Część roboty polega na tym,
żeby jej nie przeszkadzać.
