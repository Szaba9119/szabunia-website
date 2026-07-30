# Linki i katalogi — plan startowy

**Data:** 2026-07-29 · **Powód:** `PELNY2907` §5, „0 backlinków" jako główne wąskie gardło SEO
**Zakres:** wyłącznie działania, które Marcin może wykonać sam. Bez cold outreachu mailem
(taktyka odrzucona 2026-07-06).
**Klauzula:** ten dokument niczego nie zmienia. To lista do odklikania plus dwie decyzje.

---

## 0. TL;DR

Wniosek nadrzędny: **masowe dodawanie się do katalogów firm nie zbuduje pozycji.**
Polskie katalogi ogólne w 2026 są w większości albo `nofollow`, albo bez ruchu, albo jedno
i drugie. Ich realna wartość to **spójność NAP** (nazwa, adres, telefon) dla lokalnego SEO,
a nie moc linku. Kto obiecuje inaczej, sprzedaje pakiet katalogów.

Trzy rzeczy dają tu więcej niż dwadzieścia katalogów razem wziętych:

1. **Odzyskanie sygnałów ze starej domeny.** Dziś wszystkie stare adresy przekierowują na
   stronę główną, więc Google traktuje je jak soft-404 i nie przenosi ich historii. To linki,
   na które już zapracowałeś. Wymaga decyzji, bo cofa ustalenie z 9.06 (§3 poniżej).
2. **Własne powierzchnie, na których możesz postawić link bez pytania kogokolwiek:**
   Facebook (1 374 obserwujących), Useme, Behance, Vimeo, YouTube.
3. **Klienci, z którymi już pracowałeś.** To nie jest cold outreach. Prośba do H&M, Woohoo
   czy Amiki o podpis „zdjęcia: Marcin Szabunia" z linkiem przy materiałach, które i tak
   publikują, to rozmowa z osobą, która Cię zna. Odrzuciłeś pisanie do obcych, nie do swoich.

**Jedna decyzja na teraz:** mapa przekierowań ze starej domeny, wariant A / B / C w §3.

---

## 1. Co zweryfikowałem, a czego nie

Dostęp do rozszerzenia Chrome padł w trakcie tej sesji, więc **nie sprawdziłem na żywo**:
- czy stare adresy `marcinszabunia.pl` nadal pojawiają się w polskich wynikach Google
  (wyszukiwarka, do której mam dostęp, indeksuje rynek amerykański, więc jej wynik nie
  rozstrzyga polskiego SERP-a),
- stanu wizytówki na Oferteo i wpisu w Maptons z adresem „Garbary 51".

To są dwie rzeczy do sprawdzenia z Twojej przeglądarki, po dwie minuty każda. Opis w §5.

**Zweryfikowane twardo (`curl`, nagłówki HTTP, 2026-07-29):**

| Adres | Status | Cel |
|---|---|---|
| `marcinszabunia.pl/` | **308** | `szabunia.pl/` |
| `marcinszabunia.pl/home` | **308** | `szabunia.pl/` |
| `marcinszabunia.pl/portrety-biznesowe` | **308** | `szabunia.pl/` |
| `www.marcinszabunia.pl/` | **308** | `szabunia.pl/` |

308 to przekierowanie trwałe, więc od strony technicznej jest poprawnie. Problem jest
w celu, nie w kodzie odpowiedzi. Szczegóły w §3.

---

## 2. Własne powierzchnie — zrób najpierw

Kolejność jest kolejnością wdrożenia. Wszystko darmowe, nic nie wymaga niczyjej zgody.

| # | Gdzie | Co zrobić | Czas | Uwaga |
|---|---|---|---|---|
| 1 | **Facebook** (`/marcinszabuniafotograf`, 1 374 obserwujących) | Ustaw `szabunia.pl` w polu „Strona internetowa". Sprawdź, czy w opisie nie wisi stara domena | 5 min | Link jest `nofollow`, ale to **jedyna powierzchnia z realną publicznością**, którą już masz. Wartość jest w ruchu i sygnale marki, nie w mocy linku. Uwaga: to dotyka decyzji „social = tylko Instagram" (§4) |
| 2 | **Instagram** `@szabunia.biz` | To samo w bio. Sprawdź też stare konto `@marcinszabunia_fotograf`: jeśli nadal istnieje, przekieruj z niego opisem na nowe | 5 min | Stare konto wyszło mi w wynikach, więc prawdopodobnie żyje |
| 3 | **Useme** | Masz konto i rozliczasz tam zlecenia. Sprawdź, czy profil freelancera jest **publiczny** i czy da się w nim wskazać `szabunia.pl`. Uzupełnij portfolio | 20 min | Useme indeksuje profile freelancerów. Warto sprawdzić w pierwszej kolejności, bo konto już masz |
| 4 | **YouTube** | Kanał z realizacjami wideo, `szabunia.pl` w opisie kanału i w opisie każdego filmu | 20 min | Masz materiały wideo (Woohoo Autopay), a YouTube to druga wyszukiwarka świata |
| 5 | **Vimeo** | To samo, jeśli trzymasz tam finały dla klientów | 15 min | Vimeo ma lepszy odbiór w B2B niż YouTube |
| 6 | **Behance** | Portfolio z 3-4 realizacjami, link do `szabunia.pl` w profilu | 45 min | Adobe, wysoka domena, profile dobrze się indeksują. Najlepszy stosunek wartości do czasu z tej piątki |

---

## 3. DECYZJA · Mapa przekierowań ze starej domeny

**To jest stop-condition (`CLAUDE.md` §10.2, `next.config.ts`) i jednocześnie cofnięcie
ustalenia z 9.06.** Nie ruszam tego bez Twojego słowa.

### Stan faktyczny

`next.config.ts:89-99` zawiera komentarz: *„Ruch ze starej domeny kierujemy na stronę główną
(lejek sprzedażowy), a nie na podstrony usług."* Mapa wygląda tak:

| Stary adres | Dziś prowadzi na |
|---|---|
| `/strona-glowna` | `/` |
| `/portrety-biznesowe` | `/` |
| `/fotografia-eventowa` | `/` |
| `/zdjecia-produktowe` | `/` |
| `/video` | `/` |
| `/o-mnie` | `/` |
| `/contact` | `/kontakt` |
| wszystko inne | `/` |

### Na czym polega koszt

Google traktuje przekierowanie na stronę **niepowiązaną tematycznie** jak miękki błąd 404
i **nie przenosi sygnałów rankingowych** starego adresu. Przekierowanie `/portrety-biznesowe`
na stronę główną jest z punktu widzenia algorytmu równoważne usunięciu tej strony.
Przekierowanie na `/uslugi/wizerunek-portrety` jest przeniesieniem.

Przy zerze backlinków historia starej domeny jest jedynym kapitałem, jaki w ogóle masz.

Decyzja z 9.06 była podjęta z perspektywy **użytkownika** (nie gubić go w lejku) i z tej
perspektywy jest sensowna. Tylko że ze starych adresów wchodzi dziś prawdopodobnie garstka
ludzi, a sygnały indeksowe są warte więcej niż ich ścieżka.

### Warianty

**A. Mapowanie tematyczne** (rekomendacja)

| Stary adres | Nowy cel |
|---|---|
| `/strona-glowna` | `/` |
| `/portrety-biznesowe` | `/uslugi/wizerunek-portrety` |
| `/fotografia-eventowa` | `/uslugi/eventy-reportaze` |
| `/zdjecia-produktowe` | `/uslugi/fotografia-produktowa` |
| `/video` | `/uslugi/wideo-marketing` |
| `/o-mnie` | `/#o-mnie` |
| `/contact` | `/kontakt` (bez zmian) |
| wszystko inne | `/` (bez zmian) |

- Koszt: jedna edycja `next.config.ts`, 15 minut, deploy.
- Ryzyko: użytkownik ze starego linku ląduje na podstronie usługi zamiast na stronie głównej.
  Podstrony usług mają własne CTA, więc lejek się nie urywa.
- Odwracalność: pełna, jeden commit wstecz.
- Kryterium sukcesu: w GSC (`szabunia.pl`) w ciągu **8 tygodni** rośnie liczba zapytań,
  na których wyświetlają się podstrony `/uslugi/*`. Punkt odniesienia weź dziś.

**B. Zostawiamy jak jest**

- Koszt: zero.
- Ryzyko: historia starej domeny wygasa bezpowrotnie. Domenę utrzymujesz minimum do grudnia
  2026, więc okno się zamknie samo.
- Uzasadnienie: jeśli uważasz, że ruch ze starych linków jest realny i wart pilnowania lejka.

**C. Wariant pośredni: tylko trzy usługi**

Zmapować `/portrety-biznesowe`, `/fotografia-eventowa`, `/zdjecia-produktowe`, resztę zostawić.
Mniejsza zmiana, większość wartości. Sensowne, jeśli A wydaje Ci się zbyt szerokie.

**D. Nie robić nic i skasować domenę**

Odradzam wprost. Stara domena wciąż zbiera wejścia z wizytówek, podpisów i starych materiałów.

---

## 4. DECYZJA · Facebook w `sameAs` (`PELNY2907`, D10)

Decyzja „social = tylko Instagram" z 9.06 pozostaje formalnie w mocy. Zwracam uwagę tylko
na to, że przy 0 backlinkach strona z 1 374 obserwującymi jest jedyną powierzchnią,
z której możesz postawić link natychmiast i bez niczyjej zgody.

- **A.** Dodać Facebooka do `sameAs` w JSON-LD i do stopki. Spójna tożsamość w oczach Google.
- **B.** Postawić link **na Facebooku w stronę serwisu**, ale nie dodawać Facebooka do `sameAs`.
  Zysk bez zmiany decyzji o komunikacji. **Rekomendacja**, jeśli nie chcesz relitygować 9.06.
- **C.** Nie ruszać niczego.

Wariant B nie wymaga żadnej zmiany w kodzie.

---

## 5. Do sprawdzenia z Twojej przeglądarki (2 × 2 minuty)

1. **Google, zapytanie `Marcin Szabunia fotograf`.** Interesuje mnie, czy w wynikach
   nadal są adresy `marcinszabunia.pl` i na której pozycji względem `szabunia.pl`.
   Jeśli tak, wariant A z §3 robi się pilny.
2. **Maptons.** W audycie wyszło, że wpis podaje adres „Garbary 51", którego nie potwierdziliśmy.
   Zły adres w katalogu psuje spójność NAP i potrafi mieszać w lokalnych wynikach.
   Sprawdź, czy wpis istnieje i czy da się go poprawić albo usunąć.
3. **Oferteo.** Masz tam wizytówkę ze statusem „nowy w Oferteo". Sprawdź, czy jest w niej
   `szabunia.pl`, czy nie została stara domena.

---

## 6. Katalogi firm — stan na 2026-07-29

### Zweryfikowane, działają

| Katalog | Gdzie dodać | Koszt | Ocena | Uwagi |
|---|---|---|---|---|
| **Panorama Firm** | `panoramafirm.pl/dodaj-firme.html` | dodanie darmowe | **3/5** | Największa polska wyszukiwarka firm, realny ruch. Strona potwierdza darmowe dodanie danych kontaktowych. Zakres darmowego wpisu i status linku nie wynikają z samej strony, sprawdzisz przy wypełnianiu |
| **Fixly** (grupa OLX) | `fixly.pl/rejestracja/wykonawca` | rejestracja darmowa, część kategorii płatna | **3/5** | Kategoria „Fotograf" ma 875 wykonawców w Poznaniu, więc konkurencja duża. Wartość bardziej w zleceniach niż w linku. Profil publiczny istnieje („strona biznesowa dostępna dla klientów spoza Fixly"), ale nie potwierdziłem, czy pozwala wskazać własną domenę |

### Niesprawdzone, warte pięciu minut przy okazji

`pkt.pl`, `aleo.com`, `gowork.pl`, `firmy.net`. Nie zdążyłem zweryfikować ich stanu na dziś
i **nie umieszczam ich w rekomendacjach na podstawie pamięci**. Jeśli któryś wypełnisz,
zapisz gdzie, żeby dało się to potem odtworzyć.

### Nie warto

Katalogi typu `firmyogloszenia.pl`, `bazapro.pl`, `katalog.pl`, `firmy.org.pl`,
`panoramabiznesu.com.pl`, `katalogfirmy.net`. Wszystkie wyszły w tym samym wyszukiwaniu,
wszystkie mają ten sam profil: darmowe dodanie, zero ruchu, katalog istniejący po to,
by istnieć. Link stamtąd nie pomoże, a przy większej liczbie takich wpisów zaczyna
wyglądać na schemat linkowania. **Nie dodawaj się do nich.**

---

## 7. Czego ten dokument nie obejmuje

- **Analizy profilu linków konkurencji.** Wymaga narzędzia (Ahrefs, Semrush), którego nie mam.
- **Weryfikacji, czy stare adresy są nadal w indeksie Google.** Wymaga polskiego SERP-a
  albo GSC dla starej domeny, jeśli taka właściwość istnieje.
- **Katalogów płatnych.** Nie oceniałem, bo bez danych o ruchu nie da się tego zrobić uczciwie.
- **Publikacji gościnnych i patronatów.** To osobny temat i wymaga Twojego czasu, nie mojego.

---

## 8. Kolejność wdrożenia

| Kiedy | Co | Kto |
|---|---|---|
| Dziś | Decyzja: wariant z §3 (przekierowania) i §4 (Facebook) | 🧑 |
| Dziś | Facebook i Instagram: `szabunia.pl` w polu strony internetowej | 🧑 · 10 min |
| Dziś | Trzy sprawdzenia z §5 | 🧑 · 6 min |
| Po decyzji | Mapa przekierowań w `next.config.ts` | 🤖 · 15 min |
| W tym tygodniu | Useme: profil publiczny + portfolio | 🧑 · 20 min |
| W tym tygodniu | Behance: 3-4 realizacje | 🧑 · 45 min |
| Kiedykolwiek | Panorama Firm, Fixly | 🧑 · 30 min |
| Osobna rozmowa | Podpisy z linkiem u klientów, z którymi już pracowałeś | 🧑 |

**Data kontrolna:** 2026-09-23 (8 tygodni). Metryki do porównania, wszystkie z GSC:
liczba domen odsyłających, liczba zapytań z wyświetleniami dla `/uslugi/*`,
pozycja średnia dla zapytania markowego.
