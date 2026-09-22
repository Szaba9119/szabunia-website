# Audyt Google Ads — szabunia.pl, pierwsza doba nowej kampanii

Data audytu: **2026-09-21**. Konto **786-864-4697** (Supermetrics, dostęp tylko do odczytu).
Audyt nie zmienił nic w koncie ani w kodzie. Klauzula metodyki `audyt-szabunia`: każdy finding niżej ma dowód (live JSON z API, plik z datą, `git log`), nikt nie jest cytowany z pamięci.

**TL;DR — jedno zdanie:** kampania, która realnie działa na koncie od 20.09.2026 12:01, **nie jest kampanią opisaną w `strategy.md` / `ads.md` / `launch-checklist.md`** — to inny, szybciej zbudowany zestaw (1 grupa reklam zamiast 2, 41 słów zamiast 21, 5 fraz w dopasowaniu przybliżonym mimo jawnego zakazu, **zero wykluczeń zamiast 471**, i geotargetowanie całego województwa wielkopolskiego zamiast Poznania + 25 km) — a poprawka pomiaru konwersji w kodzie strony **nie jest wgrana na produkcję**, bo nigdy nie trafiła do commita.

---

## 1. Odtworzona historia prac

Pliki w `marketing/google-ads/` (wszystkie z 20.09.2026, 10:36–10:51, autor: agent Claude Code pracujący nad tym repo):

| Plik | Co zawiera | Status wobec konta |
|---|---|---|
| `README.md`, `strategy.md`, `redteam-review.md` | Decyzje strategiczne, dane historyczne, uzasadnienia | Opisuje **plan**, nie stan konta |
| `launch-checklist.md` | Lista kroków do ręcznego wykonania przez Marcina + jawne ostrzeżenie: „Kampania NIE uruchomiona", brak dostępu zapisu | **Nieaktualne**: kampania jest ENABLED od 20.09 12:01 |
| `keywords.csv` | 21 aktywnych + 11 odrzuconych słów, z uzasadnieniem per słowo | **Nie odpowiada temu, co jest live** (patrz §4) |
| `negative-keywords.csv`, `import-3-wykluczenia.csv` | 471 wykluczeń w 20 kategoriach | **Nie zaimportowane — konto ma 0 wykluczeń** (patrz §5) |
| `ads.md` | 3 warianty RSA, sitelinki, objaśnienia, uzasadnienie rozszerzenia połączeń | Sitelinki i objaśnienia **częściowo pokrywają się** z live, RSA **nie pokrywa się** (patrz §6) |
| `tracking.md` | Stan pomiaru 20.09, poprawka w `layout.tsx`, test łańcucha gclid | Poprawka w kodzie istnieje, ale **nie jest zdeployowana** (patrz §8, finding krytyczny) |
| `optimization-log.md` | Dziennik zmian z 20.09, „wynik po czasie: do uzupełnienia" | Nieuzupełniony od 20.09 |
| `import-1..6-*.csv` | Pliki do Google Ads Editor: 2 grupy reklam, lokalizacja „Poznan, Greater Poland, Poland" + promień 25 km, metoda „People in your targeted locations" | **Nie zostały użyte do budowy live kampanii** — live ma inną strukturę (patrz niżej) |

**Co ustaliłem, porównując pliki z kontem (live, odczyt API 21.09.2026):**

Historia zmian konta (`history`, odczyt API) pokazuje, że kampania **24270154304** została utworzona **2026-09-20 12:01:38** przez `marcin.szabunia@gmail.com`, a siedem minut później (**12:08:41**) ta sama osoba zaktualizowała treść reklamy (nagłówki, opisy, `finalUrlSuffix`, `trackingUrlTemplate`). To jest szybkie, ręczne złożenie kampanii w panelu — nie wygląda na pełny import 6 plików CSV z `launch-checklist.md` §2 (który dałby 2 grupy reklam, 21 słów, 471 wykluczeń, 3 RSA — żadne z tych liczb się nie zgadza z tym, co jest live).

**Wniosek:** dokumentacja z 20.09 to prawdziwy, dobrze uzasadniony plan. Ale to, co poszło do konta tego samego dnia, jest **inną, uproszczoną wersją zbudowaną ręcznie**, nie tym planem. Nie zakładam dlaczego (mogła być presja czasu, mógł nie działać import CSV, mogła być świadoma decyzja uproszczenia) — to pytanie do Marcina, nie coś, co da się ustalić z samego konta.

---

## 2. Aktualna konfiguracja kampanii (odczyt API, 21.09.2026)

### Kampania **„Search | Poznań | Fotografia B2B | 5 zł"** (ID 24270154304)

| Ustawienie | Wartość live | Zgodne z planem? |
|---|---|---|
| Status | **ENABLED** | — (plan zakładał start dopiero po checkliście) |
| Budżet | **5 zł/dzień** | ✅ zgodne |
| Data startu | 2026-09-20 | — |
| Strategia stawek | **TARGET_SPEND** (= Maksymalizacja liczby kliknięć) | ✅ zgodne z decyzją po red-teamie |
| Limit CPC | nie odczytuję konkretnej kwoty przez to API (pole `targetSpend.cpcBidCeilingMicros` istnieje w logu zmian, wartości nie widzę) | **BRAK DANYCH** — sprawdź ręcznie w panelu, plan zakładał 7,00 zł |
| Sieć wyszukiwania | `search: true` | ✅ |
| Sieć reklamowa (Display) | `display: false` | ✅ |
| Partnerzy sieci wyszukiwania (osobne ustawienie od Display) | **BRAK DANYCH** — to API nie rozbija „Search Partners" od Display w odczycie strukturalnym, mimo że pole `networkSettings.targetPartnerSearchNetwork` widać w logu zmian jako ustawione przy tworzeniu | Sprawdź ręcznie: Ustawienia → Sieci |
| Geo target type (Presence / Presence or Interest) | **`PRESENCE`** | ✅ zgodne z wymogiem „Obecność", nie „zainteresowanie" |
| Lokalizacja (rzeczywisty zasięg) | **`geoTargetConstants/20861`** | ❌ **NIEZGODNE — patrz §3, finding krytyczny** |
| Harmonogram godzinowy | brak (`ad_schedule` nieobecny w danych kampanii) | ✅ zgodne z decyzją „bez harmonogramu na starcie" |
| Modyfikatory urządzeń | nie widzę żadnych w odczycie | zgodne z decyzją „bez modyfikatorów" |
| AI Max / Final URL Expansion | pole `aiMaxSetting.enableAiMax` widoczne w logu zmian jako ustawione przy tworzeniu, **wartości nie widzę przez to API** | **BRAK DANYCH** — sprawdź ręcznie, plan wymagał wyłączenia obu |
| Automatyczne rekomendacje / auto-apply | brak dostępu przez to API do tego ustawienia konta | **BRAK DANYCH** — sprawdź ręcznie w Ustawieniach konta |
| Automatycznie tworzone zasoby | jak wyżej | **BRAK DANYCH** |
| Cele konwersji przypisane do kampanii | nie widzę osobnego pola „conversion goals" w tym odczycie | **BRAK DANYCH** |
| Grupy reklam | **1** („Grupa reklam 1" — domyślna nazwa Google, nigdy nie zmieniona) | ❌ plan zakładał 2 nazwane grupy |
| Rozszerzenia | sitelinki (4), objaśnienia (7), połączenie (1) — patrz §6 | częściowo zgodne |

**Final URL reklamy:** `https://szabunia.pl` — ✅ zgodne z briefem („tylko strona główna"), żadna reklama nie prowadzi na podstronę usług ani poza szabunia.pl.

### Kampania „Pierwsza pro kampania" (ID 22202006131) — stara kampania, wciąż na koncie

| Ustawienie | Wartość |
|---|---|
| Status | **ENABLED** (nie wstrzymana) |
| Budżet | **50 zł/dzień** — dziesięciokrotnie wyższy niż nowa kampania |
| Grupy reklam | wszystkie 4 **PAUSED** → kampania **nie wydaje dziś nic** |
| Geo | ten sam `geoTargetConstants/20861` |
| Harmonogram | pon–pt 8:00–20:00 |

**To jest dokładnie ten sam „odbezpieczony budżet", który `launch-checklist.md` §1 kazał zamknąć przed startem nowej kampanii — decyzja nadal nie podjęta.** Ryzyko jest dziś uśpione (grupy PAUSED), nie aktywne, ale jedna przypadkowa reaktywacja dowolnej grupy reklam włącza wydatek 50 zł/dzień. Patrz §11 i §12.

---

## 3. Lokalizacja — finding krytyczny, w pełni potwierdzony

**Sprawdziłem dokładnie to, o co prosisz: metodę i rzeczywisty zasięg.**

**Metoda (Presence vs Interest): ✅ poprawna.** `geo_target_type: "PRESENCE"` na nowej kampanii — to jest odpowiednik „osoby w lokalizacji docelowej lub regularnie w niej przebywające", nie domyślne „obecność lub zainteresowanie". Ten konkretny błąd, którego się obawiasz, **nie występuje**.

**Zasięg geograficzny: ❌ błędny, i to poważnie.**

Live kampania celuje w **`geoTargetConstants/20861`**. Zweryfikowałem to niezależnie przez `targeting_search` (katalog lokalizacji Google Ads):

```
key: 20861 → "Greater Poland Voivodeship,Poland"  (type: region)
```

To jest **całe województwo wielkopolskie** — nie „Poznań + 25 km", jak wprost specyfikuje `strategy.md` §8 i jak dosłownie zapisano w dostarczonym pliku importu `import-1-kampania-i-grupy.csv`:
`Location: "Poznan, Greater Poland, Poland" | Radius: 25 | Radius Units: km | Location Targeting Method: "People in your targeted locations"`.

Dla porównania sprawdziłem też, czym **nie** jest 20861:
- Poznań (miasto): `key 1011615`
- Poznań (gmina/municipality): `key 9257719`

Żadne z nich się nie zgadza. **20861 to ten sam klucz geolokalizacji, którego od 05.02.2025 używa stara kampania** — ta sama, o której `strategy.md` §1 pisze wprost „poprzednia kampania celowała w całe województwo". Pośredni dowód z historii starej kampanii: jej lista wykluczeń zawiera dziesiątki nazw miast spoza Wielkopolski dodanych jako negatywy (`warszawa`, `kraków`, `gdańsk`, `wrocław`, `łódź`, `katowice`, `szczecin`, `lublin`, `częstochowa`) — czyli kampania faktycznie dostawała ruch z całej Polski i trzeba było się przed nim bronić wykluczeniami. Jeden z callouts starej kampanii mówi wprost „Poznań i cała Polska".

**Skutek dla budżetu 5 zł/dzień:** cały fundament ekonomiczny z `strategy.md` §4–5 (popyt rzędu 10 wyszukań/mies. na frazę **w skali Polski**, licz. 25 kliknięć/mies. przy CPC 6 zł) został policzony dla frazy z „poznań" w tekście, ale **serwowany jest w całym województwie**, nie w Poznaniu z okolicą. To nie jest kwestia stylu — to jest inny produkt niż zaplanowany. Frazy bez „poznań" w tekście (np. gdyby broad match je rozszerzył, patrz §4) mogłyby się wyświetlać osobom w Kaliszu, Koninie, Pile czy Lesznie, 100+ km od Poznania.

**Rekomendacja (nie wykonuję sam — patrz §11, to jest zmiana geotargetowania, techniczna i oczywista, ale w tym zestawieniu robię ją tylko za Twoją zgodą, bo dotyka realnego zasięgu reklamy):** zamienić lokalizację na Poznań (miasto lub gmina) + promień 25 km, metoda Presence, dokładnie jak w `import-1-kampania-i-grupy.csv`.

---

## 4. Keywords — każde aktywne słowo z konta (odczyt API, 21.09.2026)

Live: **1 grupa reklam, 41 słów kluczowych.** Dane wyświetleń/kliknięć/CTR/CPC/kosztu **BRAK DANYCH** (§7 — API raportowania zablokowane). Poniżej sam skład i ocena intencji/typu dopasowania, bo to jedyne, co mogę ocenić bez liczb.

**5 słów w dopasowaniu PRZYBLIŻONYM (BROAD) — niezgodnie z jawnym zakazem w `strategy.md` §2 („to jest empiryczne uzasadnienie zakazu broad match w tej kampanii"):**

| Słowo | Dopasowanie | Ryzyko |
|---|---|---|
| `fotograf wnętrz poznań` | BROAD | Google może rozszerzyć na „projektowanie wnętrz", „aranżacja wnętrz" — dokładnie ten wzorzec, który spalił 53,5% historycznego budżetu na `fotograf poznań` broad |
| `profesjonalne zdjęcia biznesowe poznań` | BROAD | szeroki wektor, możliwe rozszerzenie na CV/rekrutację |
| `sesja zdjęciowa biznesowa poznań` | BROAD | „sesja zdjęciowa" bez kwalifikatora to częsty wektor B2C (rodzinna, ciążowa) |
| `fotografia przemysłowa poznań` | BROAD | węższe ryzyko, ale wciąż broad |
| `fotografia biznesowa poznan` (bez „ń") | BROAD | wariant ortograficzny w broad — podwaja ekspozycję na rozszerzanie |

**36 słów w PHRASE lub EXACT** — w tym cały zestaw tematyczny obejmujący **wszystkie cztery filary oferty** (wizerunek, eventy, nieruchomości/przemysł), czego nie ma w dokumentacji planu (`keywords.csv` miał tylko wizerunek + produkt). Przykłady: `fotografia eventowa poznań`, `fotograf na konferencję poznań`, `reportaż eventowy poznań`, `fotograf nieruchomości poznań`, `fotografia przemysłowa poznań`, `fotograf na targi poznań`.

**Czego nie ma wcale:** żadnego słowa o fotografii **produktowej** (`fotografia produktowa`, `packshot`, `zdjęcia produktowe`) — czyli **jedynej linii z udokumentowanymi leadami** wg `strategy.md` §7 (2 realne zapytania z lipca 2026). Cała druga grupa reklam z planu i jej 7 słów nigdy nie powstały.

**Ocena intencji (bez danych o wolumenie, tylko na podstawie tekstu frazy):**
- **Wysoki potencjał B2B, exact/phrase, zgodne z celem:** `fotograf biznesowy poznań`, `fotografia biznesowa poznań`, `sesja biznesowa poznań`, `portret biznesowy`, `fotograf dla firm poznań`, `zdjęcia firmowe poznań` — dobre, zostawić.
- **Dobre rozszerzenie na eventy/nieruchomości (nowa treść wobec planu, ale sensowna wobec oferty strony):** `fotografia eventowa poznań`, `fotograf na konferencję poznań`, `fotograf na targi poznań`, `fotograf nieruchomości poznań`, `fotografia przemysłowa poznań` — brzmią komercyjnie, nie ma powodu ich ruszać po 1 dobie.
- **Do obserwacji, nie do ruszania teraz:** 5 fraz BROAD wyżej — nie usuwam ich sam (to nie jest „oczywisty błąd" typu literówka, to decyzja o ryzyku), ale to pierwsze miejsce, gdzie sprawdzić Search Terms, gdy dane będą dostępne.

Nie usuwam żadnego słowa po 1 dobie — zgodnie z Twoim poleceniem i z regułą audytu.

---

## 5. Search Terms — BRAK DANYCH

**Nie mogę wykonać tej sekcji.** Zapytanie do raportu `SearchTermView` (i każdego innego raportu wydajności: `Campaign`, `KeywordView`) zwróciło:

```
[TRIAL_EXPIRED] Your free trial on team Team marcin.szabunia has expired on 2026-06-03
```

To jest to samo ograniczenie, które `launch-checklist.md` §0 opisał 20.09.2026 — **nic się nie zmieniło, sprawdziłem dziś niezależnie.** Odczyt struktury konta (kampanie, słowa, konwersje) działa, bo to inny typ zapytania (`campaign_and_resource_get`); odczyt metryk i raportów (`data_query`) jest zablokowany całkowicie, dla każdego raportu, który testowałem.

**Konsekwencja:** nie mogę ocenić, czy Google rozszerza dopasowanie phrase/exact na niechciane intencje — dokładnie to pytanie, które podkreślasz jako najważniejsze w §5 briefu. **To jest teraz priorytet numer jeden do zrobienia przez Ciebie ręcznie w panelu** (Kampanie → Wyszukiwane hasła), bo przy 5 wolnych frazach BROAD w grupie to jedyny sposób sprawdzenia, czy budżet już ucieka na złe zapytania.

Nie tworzę żadnej listy wykluczeń „na wyczucie" bez tego raportu — zgodnie z regułą audytu ads (`audit-guardrails.md`): brak danych o dopasowanych hasłach = zero wymyślonych kandydatów na negatywy.

---

## 6. Reklamy (RSA)

**Live: 1 reklama RSA, w jedynej istniejącej grupie, status ENABLED, `review.status: APPROVED`.**

Treść **nie jest żadnym z 3 wariantów opisanych w `ads.md`** — to nowy, samodzielny tekst (edytowany ręcznie 20.09 o 12:08, siedem minut po utworzeniu kampanii):

**15 nagłówków** (przykłady): „Fotograf dla firm Poznań", „Fotografia biznesowa Poznań", „Fotografia eventowa Poznań", „Fotograf nieruchomości Poznań", „Fotografia przemysłowa", „Portrety biznesowe", „Eventy, konferencje i targi", „Nieruchomości i przemysł", „Zdjęcia zespołów i zarządu", „Zdjęcia, film i dron", „Ponad 100 obsłużonych firm", „Wycena w ciągu 24 godzin", „Realizacje dla firm", „Materiały do marketingu", „Zobacz portfolio realizacji".

**4 opisy**, spójne z pozycjonowaniem strony (bez cen — zgodnie ze stanem strony od 14.08.2026, poprawnie), z frazą „Ponad 100 obsłużonych firm" (pokrycie w `src/data/proof.ts`, tak jak wymagał `ads.md`).

**Ocena zgodności reklamy z keywordami i stroną:**
- ✅ Nagłówki komunikują jasno wszystkie żądane elementy: fotograf dla firm, Poznań, biznesowa, eventy, nieruchomości/przemysł. **Brakuje jedynie „produkt"** — logiczne, bo grupa produktowa nie istnieje na koncie (§4).
- ✅ Final URL = strona główna, zgodne z briefem.
- **Przypięcie pozycji 1 do frazy kluczowej** (wymóg z `ads.md` po red-teamie, S-01): **BRAK DANYCH** — to API nie zwraca informacji o przypięciach (`pinned field`) w odczycie reklamy. Sprawdź ręcznie w edytorze reklamy: czy nagłówek 1 ma ikonę pinezki.
- **Asset Performance (Best/Good/Low):** **BRAK DANYCH** przez to samo ograniczenie raportowania co w §5. Przy ~1 dobie i tak byłoby to przedwczesne do oceny — `ads.md` sam to zastrzega.

**Nie znajduję ewidentnych błędów, literówek ani duplikatów w treści reklamy** — jest spójna i dobrze napisana, tylko inna niż planowana. Nie poprawiam nic w tej sekcji.

---

## 7. Dane pierwszej doby — BRAK DANYCH (przyczyna: ograniczenie API, nie brak leadów)

Nie mam dostępu do: wyświetleń, kliknięć, CTR, kosztu, średniego CPC, konwersji, wskaźnika konwersji, kosztu/konwersję, Search Impression Share i jego składowych (budżet/ranking/top/absolute top), ani żadnego rozbicia (grupa reklam, słowo, wyszukane hasło, reklama, urządzenie, lokalizacja, godzina).

**Przyczyna:** `[TRIAL_EXPIRED]` na koncie Supermetrics, potwierdzone niezależnie dziś (§5). To nie jest brak leadów — to brak narzędzia do odczytu.

**Co mogę Ci realnie powiedzieć bez tych liczb:**
- Kampania jest ENABLED od 2026-09-20 12:01, czyli **działa od ok. 33 godzin** w momencie audytu (21.09, popołudnie) — konsekwentne z Twoim „ok. jeden dzień".
- Reklama ma status `APPROVED` — **nie jest odrzucona ani ograniczona przez zasady**, więc emisja techniczna nie jest zablokowana.
- Budżet ustawiony poprawnie na 5 zł/dzień, żadnych sygnałów przekroczenia budżetu nie da się dziś ocenić bez danych kosztowych.

**Zgodnie z Twoim poleceniem, nie oceniam kampanii na podstawie braku leadów po jednej dobie — a i tak bym nie mógł, bo nie widzę nawet czy jakiekolwiek kliknięcia wystąpiły.**

**Jak to odblokować:** albo przywrócić/wykupić subskrypcję Supermetrics (link w błędzie: supermetrics.com/pricing), albo pobierać te dane ręcznie z panelu Google Ads — druga opcja jest natychmiastowa i darmowa.

---

## 8. Tracking konwersji — finding krytyczny #2, w pełni potwierdzony

### 8.1 Stan działań konwersji na koncie (bez zmian od 20.09.2026)

Odczytałem listę konwersji dziś ponownie — **identyczna z tą opisaną w `tracking.md`**, żaden z zaplanowanych 5 kroków ręcznych nie został wykonany:

| ID | Nazwa | Kategoria | Zliczanie | Problem |
|---|---|---|---|---|
| 7031355494 | generate_lead (pobranie poradnika) | **PAGE_VIEW** ❌ | **Wiele** ❌ | Powinno być kontaktowa / Jedna |
| 7670127751 | email_click | CONTACT | **Wiele** ❌ | Powinno być Jedna |
| 983737805 / 984506818 / 984507067 / 984508294 | 4 działania ze Smart Campaign, której nie ma | wszystkie **ENABLED** ❌ | — | Powinny być wyłączone |
| 7644204683 | contact_submit | CONTACT | Jedna ✅ | Kandydat na Główną — **Primary/Secondary: BRAK DANYCH**, to pole nie wraca przez API |
| 7670127748 | phone_click | CONTACT | Jedna ✅ | OK |
| 7191745156 | Calls from ads (rozszerzenie połączeń) | PHONE_CALL_LEAD | Wiele | To jest ta konwersja spoza Consent Mode — działa niezależnie od zgody na cookies |

### 8.2 Finding krytyczny: poprawka pomiaru w kodzie **nie jest wdrożona na produkcję**

`tracking.md` opisuje naprawę w `src/app/layout.tsx` — natychmiastowe ładowanie `gtag.js` dla ruchu z `gclid`/`wbraid`/`gbraid`, zamiast czekania do 6 sekund. Sprawdziłem to dziś bezpośrednio w repo:

```bash
$ git status --porcelain
 M src/app/layout.tsx          ← zmodyfikowany, NIE zacommitowany
 M CLAUDE.md
 M docs/zasady-tekstow.md
?? marketing/                  ← cała dokumentacja Ads, też niezacommitowana

$ git show HEAD:src/app/layout.tsx | grep gclid
(pusty wynik)

$ git log -1
a13a793 fix(hero): ... 2026-09-20 10:45:11 +0200
```

**Poprawka istnieje tylko w working tree, na tym jednym komputerze. Nie ma jej w żadnym commicie, więc nie ma jej w tym, co Vercel wdrożył na `szabunia.pl`.** Zgodnie z `CLAUDE.md` repozytorium strony („Push do main = automatyczny deploy produkcyjny", „Nie rób `git commit` ani `git push` samodzielnie" — to zastrzeżone dla Ciebie), agent nie mógł sam tego wysłać. Ale to oznacza, że **od 20.09 do teraz kampania jeździ z tą samą dziurą pomiarową, którą poprawka miała naprawić**: GA4 rejestrowało historycznie ~26% kliknięć płatnych (`POMIAR-ADS-VS-GA4-2026-08-02.md`), a to wciąż aktualny stan produkcji.

**To jest najpilniejsza pojedyncza rzecz do zrobienia w tym audycie** — ważniejsza niż jakikolwiek keyword: bez tego commita i push, każda dana o konwersjach z tej kampanii (i tak już ograniczona przez Consent Mode) jest zaniżona o mniej więcej trzy czwarte, niezależnie od tego, co zrobisz z resztą ustawień.

**Nie commituję i nie pushuję sam** — to zastrzeżone dla Ciebie w `CLAUDE.md` tego repo. Konkretna komenda do wykonania:
```bash
git add src/app/layout.tsx
git commit -m "fix(ads): natychmiastowe ladowanie gtag.js dla ruchu z gclid/wbraid/gbraid"
git push
```

### 8.3 Rozszerzenie połączeń — dobra wiadomość

`launch-checklist.md` §3 oznaczył rozszerzenie połączeń jako PRIORYTET, bo działa **poza Consent Mode i poza kodem strony**. Sprawdziłem: **jest live**, numer `514 900 688`, kraj PL, w rozszerzeniach nowej kampanii. To jedyny w pełni działający, niezależny od zgody na cookies kanał pomiaru dla tej kampanii już dziś.

### 8.4 GA4 / GTM — BRAK DANYCH

Nie mam w tej sesji dostępu do konektora Google Analytics / Tag Managera (nieautoryzowany). Nie mogę zweryfikować bezpośrednio w GA4, czy `contact_submit` faktycznie odpala się z produkcji tak jak opisuje `tracking.md` — opieram się wyłącznie na testach z 20.09 opisanych w tym pliku (dev server, nie produkcja) i na statycznej analizie kodu.

---

## 9. Zachowanie użytkowników — BRAK DANYCH

Bez dostępu do GA4 w tej sesji nie mogę sprawdzić engaged sessions, czasu zaangażowania, scrolla, przejść do portfolio/usług, ani porównać zachowania ruchu z Ads do reszty ruchu. To pytanie wymaga albo autoryzacji konektora GA4 w tej sesji, albo ręcznego sprawdzenia przez Ciebie w GA4 (segment: Sesja płatna wyszukiwarki, źródło Google, ostatnie 48 h).

---

## 10. Porównanie ze starą kampanią

| | Stara („Pierwsza pro kampania") | Nowa (live dziś) |
|---|---|---|
| Budżet | 50 zł/dzień | 5 zł/dzień |
| Geo | Woj. wielkopolskie (20861) | **To samo woj. wielkopolskie (20861)** — nie naprawione |
| Dopasowania | Historia: 85,3% wydatku na broad | 5 z 41 słów wciąż broad |
| Wykluczenia | Setki (804 / 522 / 531 / 561 na poziomie grup + własne na poziomie kampanii) | **Zero** |
| Grupy reklam | 4, tematycznie rozdzielone | 1, wszystko razem |
| Status | ENABLED, ale wstrzymana na poziomie grup (nie wydaje) | ENABLED i aktywna |

**Nie porównuję wydajności (CPC, CTR, jakość ruchu)** — nie mam danych z żadnej z dwóch kampanii z tego okresu (§5, §7). Jedyne uczciwe porównanie, jakie mogę dziś zrobić, jest strukturalne, powyżej.

**Obserwacja, która wymaga podkreślenia:** nowa kampania miała naprawić dokładnie dwa problemy, o których piszesz w briefie — wysoki CTR bez zapytań (przez broad match) i gigantyczną listę wykluczeń. Live stan **odziedziczył ryzyko broad matcha** (mniejsze niż stare 85%, ale niezerowe) **i poszedł w drugą skrajność z wykluczeniami — z „gigantycznej listy" do zera**, zamiast do przygotowanych, przemyślanych 471 pozycji.

---

## 11. Co poprawiłem teraz i co świadomie zostawiłem

**Nic nie zmieniłem w koncie Google Ads.** Powody:
1. Dostęp do konta jest **tylko do odczytu** (Supermetrics: `WRITE_ACCESS_NOT_ENABLED`, potwierdzone w `launch-checklist.md` §0; nie próbowałem wykonać żadnego zapisu w tej sesji, żeby nie ryzykować nieautoryzowanej zmiany, gdyby dostęp się jednak zmienił).
2. Wszystkie znalezione problemy (geotargetowanie, brak wykluczeń, stary budżet 50 zł, brak grupy produktowej) dotykają albo **realnego zasięgu i kosztu reklamy**, albo są **zbyt duże, żeby nazwać je „oczywistym błędem technicznym"** w rozumieniu Twojego pkt. 11 — to są decyzje o kampanii, nie literówki. Zgodnie z `CLAUDE.md` katalogu głównego („pieniądze Marcina, jego czas — nigdy nie zmieniaj bez zgody") i z zasadami audytu, zostawiam je do Twojej decyzji.
3. **Nie zmieniłem kodu strony.** Poprawka w `layout.tsx` już tam jest (zrobił ją poprzedni agent) — mój wkład to wykrycie, że nigdy nie trafiła do commita, nie sama poprawka.

**Nic nie zmieniłem w plikach dokumentacji z 20.09** (`strategy.md`, `launch-checklist.md`, `ads.md` itd.) — zostają jako świadectwo planu. Ten plik jest osobnym, nowym raportem, nie nadpisuje ich.

---

## 12. Najważniejsze pytanie: czy budżet jest przepalany?

**Nie mogę odpowiedzieć liczbami** — nie mam dostępu do kosztu, kliknięć ani wyszukanych haseł (§5, §7). Nie zgaduję.

**Mogę natomiast wskazać dwa w pełni potwierdzone, konkretne błędy konfiguracji, które są gotowym mechanizmem przepalania budżetu, niezależnie od tego, co pokażą liczby:**

1. **Geotargetowanie całego województwa wielkopolskiego zamiast Poznania + 25 km** (§3, dowód: `targeting_search` API, klucz `geoTargetConstants/20861` = „Greater Poland Voivodeship"). Przy 5 zł/dzień i tak wąskim popycie każdy wyświetlony poza realnym zasięgiem dojazdu = zmarnowana szansa na aukcję, w której mogłeś wygrać taniej, bliżej domu.
2. **Zero wykluczeń na koncie, w tym na 5 słowach w dopasowaniu przybliżonym** (§4, §5, dowód: brak pola `negative_keywords` w odczycie API kampanii i grupy reklam, kontrast z setkami wykluczeń na starej kampanii). Broad match bez siatki wykluczeń jest dokładnie mechanizmem, który spalił 53,5% historycznego budżetu konta na jedno słowo z zerem zapytań (`strategy.md` §2).

Oba dają się naprawić bez ruszania budżetu ani strategii stawek — to import lokalizacji i import listy wykluczeń, oba już przygotowane i leżące w `import-1-kampania-i-grupy.csv` i `import-3-wykluczenia.csv`.

**Trzeci, osobny problem (nie przepala budżetu Ads, ale przepala sens pomiaru):** poprawka `gclid` w kodzie strony nie jest wdrożona (§8.2). Nawet gdyby kampania generowała leady, dziś w większości nie zobaczyłbyś ich w Ads.

---

## 13. Plan obserwacji na następne 7 dni

Konkretne progi, do sprawdzenia ręcznie w panelu (bo API raportowania jest zablokowane):

| Wskaźnik | Kiedy reagować |
|---|---|
| Koszt dzienny | Jeśli przez 3 dni z rzędu przekracza 6 zł (ponad limit CPC + zapas), sprawdź czy limit CPC 7 zł faktycznie obowiązuje w panelu |
| Wyszukane hasła | Pierwszy przegląd **jak najszybciej, ręcznie w panelu** (Kampanie → Wyszukiwane hasła), nie czekać do dnia 3 z `launch-checklist.md` — bo mamy 5 wolnych fraz broad, których stara dokumentacja nie zakładała |
| Wykluczenie search terma | Kategoria D wg `launch-checklist.md` §8 (dzielnica/ulica Poznania, dokumenty/CV/paszport, marka konkurencji, cyrylica, ślub/ciąża/rodzina) |
| Lokalizacja kliknięć | Gdy dane się pojawią: czy klikający są w Poznaniu/25 km, czy w Kaliszu/Koninie/Pile — to bezpośredni test finding z §3 |
| CTR reklamy | Nie oceniać pojedynczej kombinacji nagłówków przy <20 wyświetleniach na kombinację |
| Zapytania mailowe/telefoniczne | Licz ręcznie, pytaj „skąd Pan/Pani trafił(a)" — to jedyny w pełni wiarygodny miernik, dopóki pomiar Ads/GA4 jest dziurawy |

**Nie zmieniać stawek ani nie usuwać słów kluczowych przez pierwsze 14 dni**, zgodnie z Twoim poleceniem — wyjątek: jeśli przegląd wyszukanych haseł (do zrobienia przez Ciebie ręcznie, patrz wyżej) pokaże ewidentnie nietrafione zapytanie na jednym z 5 słów broad.

## 14. Plan kontroli po 14 dniach

Do poważniejszej optymalizacji wystarczające będą: **co najmniej 2 pełne przeglądy wyszukanych haseł** (dzień 3-7 i dzień 14), **koszt skumulowany rzędu 60-70 zł** (14 dni × ~5 zł), i **odpowiedź na pytanie, czy poprawka `gclid` została wdrożona** — bez niej 14-dniowe dane o konwersjach z Ads będą tak samo niewiarygodne jak dziś. Jeśli do tego czasu dostęp do Supermetrics/raportowania nie wróci, re-audyt będzie musiał opierać się na ręcznych eksportach z panelu (tak jak ten z 02.08.2026), nie na API.

---

## Rejestr ustaleń (do wykorzystania przez kolejnego agenta)

| ID | Ustalenie | Pewność | Priorytet |
|---|---|---|---|
| ADS2609-01 | Geo live = woj. wielkopolskie (20861), plan = Poznań+25km | Z (API + targeting_search) | P0 |
| ADS2609-02 | Zero negative keywords na live kampanii, plan = 471 | Z (odczyt API, brak pola) | P0 |
| ADS2609-03 | Poprawka gclid w `layout.tsx` niezacommitowana, brak na produkcji | Z (git status/show) | P0 |
| ADS2609-04 | Stara kampania 50 zł/dzień nadal ENABLED, ryzyko nie zamknięte | Z (API) | P1 |
| ADS2609-05 | Grupa produktowa (jedyna z udokumentowanymi leadami) nigdy nie powstała | Z (API) | P1 |
| ADS2609-06 | 5 słów w dopasowaniu BROAD na koncie mimo jawnego zakazu w planie | Z (API) | P1 |
| ADS2609-07 | 4 martwe działania konwersji ze Smart Campaign nadal ENABLED | Z (API) | P2 |
| ADS2609-08 | generate_lead nadal PAGE_VIEW / Wiele zamiast kontaktowa / Jedna | Z (API) | P2 |
| ADS2609-09 | Raportowanie Supermetrics zablokowane (TRIAL_EXPIRED) — blokuje sekcje 5, 7, 9, 10 | Z (data_query error) | P1 (blokada narzędziowa) |
| ADS2609-10 | Limit CPC, AI Max, Final URL Expansion, auto-apply, Primary/Secondary konwersji — nieczytelne przez to API | N | do sprawdzenia ręcznie |

*Audyt nie zmienił konfiguracji konta ani kodu strony. Metoda: odczyt API Supermetrics (Google Ads), odczyt plików projektu, `git status`/`git show` w repo strony. Źródła dla każdego ustalenia podane w tekście.*
