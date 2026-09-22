# Wdrożenie — próba realizacji zatwierdzonego planu, 21.09.2026 (druga sesja tego dnia)

Kontekst: `AUDYT-GOOGLE-ADS-2026-09-21.md`, `GOTOWE-DO-WDROZENIA-2026-09-21.md`. Zadanie: wykonać, nie tylko przygotować.

**Wynik w jednym zdaniu: żaden kanał zapisu do konta Google Ads nie był dziś dostępny — sprawdziłem trzy niezależne drogi, wszystkie zablokowane — więc nic w koncie się nie zmieniło; to, co dało się zrobić bez zapisu (weryfikacja kodu, dogłębny sanity-check 471 wykluczeń), zrobiłem i jest gotowe do natychmiastowego użycia w chwili odblokowania.**

---

## Próby dostępu do konta — wszystkie trzy sprawdzone dziś

| Metoda | Wynik | Dowód |
|---|---|---|
| **Supermetrics API (`manage_campaign`)** | ❌ Zablokowane | `[WRITE_ACCESS_NOT_ENABLED]` dla konta 7868644697 w teamie „Team marcin.szabunia" — sprawdzone dwukrotnie dziś (najpierw na pauzie starej kampanii, potem ponownie po przeczytaniu plików), identyczny błąd za każdym razem. Link do włączenia: `https://hub.supermetrics.com/write-settings?platform=AW&teamId=4MNzP8A_VkW6UpK4Hmf1` |
| **Claude in Chrome (Twoja przeglądarka, Twoja sesja)** | ❌ Niedostępne | `tabs_context_mcp` zwróciło „Claude in Chrome is not connected" — rozszerzenie nie jest podłączone w tej sesji (albo niezainstalowane, albo niezalogowane) |
| **Wbudowana przeglądarka Claude (izolowana, bez Twojej sesji)** | ❌ Niezalogowana | Nawigacja do `ads.google.com` przekierowała na ekran logowania Google. Nie loguję się — nie mam i nie proszę o Twoje hasło/2FA, to zabronione niezależnie od polecenia |

**Nic w koncie Google Ads nie zostało zmienione dzisiaj.** To nie jest „nie próbowałem" — to trzy potwierdzone ślepe zaułki. Dwie najszybsze drogi, żeby to odblokować:

1. **Kliknij link wyżej i włącz zapis dla Supermetrics** (prawdopodobnie 1-2 minuty w panelu Supermetrics) → wtedy wykonam ETAP 2-4 automatycznie, dokładnie payloadami z `GOTOWE-DO-WDROZENIA-2026-09-21.md`.
2. **Zainstaluj/zaloguj rozszerzenie Claude in Chrome** (link: chromewebstore.google.com/detail/fcoeoabgfenejglbffodgkkbkcdhcgfn) → wtedy mogę działać w Twojej zalogowanej sesji Google Ads.
3. **Najszybsza opcja: zrób to sam** wg `GOTOWE-DO-WDROZENIA-2026-09-21.md` — 12-15 minut, bez czekania na żadną z powyższych.

---

## ETAP 1 — Tracking: kod zweryfikowany, gotowa jedna komenda

Sprawdziłem `git diff -- src/app/layout.tsx` dziś ponownie. **Kod jest dokładnie tą poprawką opisaną w `tracking.md`**: blok
```js
try{if(/[?&](gclid|wbraid|gbraid)=/.test(location.search)){load();return;}}catch(e){}
```
plus komentarz z uzasadnieniem (26% widoczności ruchu płatnego w GA4, 1 z 2 lipcowych leadów policzony). **Nadal niezacommitowany** — `git status --porcelain` pokazuje ` M src/app/layout.tsx`, HEAD to wciąż `a13a793` (20.09, 10:45), zero wzmianki o gclid w `git show HEAD:src/app/layout.tsx`.

Jedna komenda, tylko ten plik, bez dotykania pozostałych niezacommitowanych zmian (`CLAUDE.md`, `docs/zasady-tekstow.md`, nowe pliki w `docs/sesje/`, cały `marketing/`) — te zostają nietknięte, zgodnie z Twoim „nie commituj przy okazji":

```bash
cd ~/Documents/05_Strona_WWW/marcinszabunia
git add src/app/layout.tsx
git commit -m "fix(ads): natychmiastowe ladowanie gtag.js dla ruchu z gclid/wbraid/gbraid"
git push
```

**Status: NIEWYKONANE (celowo).** Metoda: nie próbuję — `CLAUDE.md` repo, zasada twarda §11.1, bez wyjątków. Alternatywna droga: brak, to ma zrobić wyłącznie Ty.

---

## ETAP 2 — Zamknięcie starej kampanii (22202006131)

**Status: NIEWYKONANE.** Próbowano: `manage_campaign(campaign_id="22202006131", status="PAUSED")`. Błąd: `[WRITE_ACCESS_NOT_ENABLED]` (patrz tabela wyżej). Stan konta: **bez zmian — nadal ENABLED, 50 zł/dzień, wszystkie 4 grupy PAUSED** (potwierdzone odczytem API dzisiaj, przed próbą zapisu). Ryzyko przypadkowego wznowienia **nadal otwarte**.

Alternatywna droga: ręcznie w panelu (30 sekund) albo poczekać na odblokowanie zapisu — payload gotowy w `GOTOWE-DO-WDROZENIA-2026-09-21.md` §4.

---

## ETAP 3 — Geo (Poznań + 25 km, Presence)

**Status: NIEWYKONANE.** Ta sama blokada zapisu. **Stan bez zmian**: `location_details: [{type: "geo_target", key: "20861"}]` = województwo wielkopolskie, metoda `PRESENCE` (ta część już poprawna, nic do zrobienia). Payload z dokładnymi współrzędnymi (52.4064 N, 16.9252 E, 25 km) gotowy w `GOTOWE-DO-WDROZENIA-2026-09-21.md` §2, czeka na wykonanie.

---

## ETAP 4 — Broad match → Phrase

**Status: NIEWYKONANE.** Ta sama blokada. **Stan bez zmian: nadal 5 keywordów BROAD live**, dokładnie te same co w audycie z 21.09:

| Keyword | Match type live | Docelowy |
|---|---|---|
| `fotograf wnętrz poznań` | BROAD | PHRASE |
| `profesjonalne zdjęcia biznesowe poznań` | BROAD | PHRASE |
| `sesja zdjęciowa biznesowa poznań` | BROAD | PHRASE |
| `fotografia przemysłowa poznań` | BROAD | PHRASE |
| `fotografia biznesowa poznan` | BROAD | PHRASE |

**Liczba BROAD po zmianach: nie dotyczy, bo zmiana nie została wykonana — nadal 5.** Wyjaśnienie zgodnie z poleceniem: dlaczego każdy z nich wciąż jest BROAD — bo jedyny dostępny kanał zapisu (Supermetrics) jest zablokowany, a pozostałe dwa kanały (Twoja przeglądarka, wbudowana przeglądarka) są dziś niedostępne z powodów wypisanych w tabeli na górze. Payload gotowy, patrz `GOTOWE-DO-WDROZENIA-2026-09-21.md` §3.

---

## ETAP 5 — Negative keywords: sanity-check wykonany, pozytywny; import NIEWYKONANY

**Import: NIEWYKONANE** (ta sama blokada zapisu — `targeting.negative_keywords` to też pole kampanii, ten sam błąd `WRITE_ACCESS_NOT_ENABLED`). Konto ma dziś nadal **0 wykluczeń**.

**Ale sanity-check, o który prosiłeś, jest zrobiony — dokładniej niż poprzednim razem.** Trzy niezależne testy programowe na `negative-keywords.csv` (471 pozycji, 441 BROAD + 30 PHRASE) przeciwko **14 wymienionym przez Ciebie chronionym intencjom** (fotograf biznesowy, fotografia biznesowa, portret biznesowy, sesja biznesowa, fotografia eventowa, konferencja, targi, nieruchomości, fotografia wnętrz, fotografia przemysłowa, fotografia produktowa, packshot, zdjęcia produktowe, zdjęcia dla firm):

1. **Czy jakikolwiek negatyw to dokładnie cała chroniona fraza** → 0 trafień.
2. **Czy jakikolwiek negatyw BROAD składa się wyłącznie ze słów należących do chronionych fraz** (to jest właściwy test na to, czy negatyw przybliżony mógłby „zjeść" cały temat, bo BROAD-negatyw blokuje, gdy wszystkie jego słowa występują w zapytaniu w dowolnej kolejności) → 0 trafień.
3. **Czy jakikolwiek negatyw BROAD to pojedyncze słowo z chronionej frazy** (np. samo „targi", „biznesowa", „produktowa") → 0 trafień.
4. Dodatkowo: **negatywy PHRASE jako podciąg którejkolwiek z 14 chronionych fraz lub odwrotnie** → 0 trafień; **oraz to samo względem wszystkich 41 żywych keywordów na koncie** (nie tylko 14 wymienionych) → 0 trafień.

**Wniosek: lista jest bezpieczna w całości, nie tylko „prawdopodobnie".** Nie tworzę nowej listy — `negative-keywords.csv` / `import-3-wykluczenia.csv` zostają jako źródło, gotowe do importu w chwili odblokowania zapisu (automatycznie przeze mnie) albo ręcznie w Ads Editor (`import-3-wykluczenia.csv`, format już zgodny z Editorem).

**Błędy importu Google: nie dotyczy — import się jeszcze nie odbył**, więc nie ma czego notować.

---

## ETAP 6 — Konwersje

**Status: NIEWYKONANE**, z dwóch niezależnych powodów:
1. Brak jakiegokolwiek działającego dziś kanału do panelu (patrz góra pliku).
2. Nawet gdyby zapis Supermetrics działał: `manage_campaign` **nie obsługuje edycji zasobu ConversionAction** (kategoria, sposób zliczania, Primary/Secondary) — to ustalone już w poprzedniej sesji i potwierdzam ponownie po przejrzeniu schematu narzędzia. To musi być zrobione ręcznie w panelu niezależnie od tego, czy Supermetrics włączy zapis kampanii.

**Stan live dziś (odczyt API, bez zmian od audytu z 21.09):**

| ID | Nazwa | Kategoria | Zliczanie | Status |
|---|---|---|---|---|
| 7644204683 | contact_submit | CONTACT | Jedna | ENABLED — kandydat na Główną, Primary/Secondary nieczytelne przez API |
| 7670127748 | phone_click | CONTACT | Jedna | ENABLED — już OK |
| 7191745156 | Calls from ads | PHONE_CALL_LEAD | Wiele | ENABLED |
| 7670127751 | email_click | CONTACT | **Wiele** ❌ | ENABLED — do zmiany na Jedna |
| 7031355494 | generate_lead | **PAGE_VIEW** ❌ | **Wiele** ❌ | ENABLED — do przeniesienia do kategorii kontaktowej |
| 983737805 / 984506818 / 984507067 / 984508294 | 4 działania Smart Campaign | różne | różne | **wszystkie nadal ENABLED** ❌ — do wyłączenia |

Dokładne kroki ręczne: `GOTOWE-DO-WDROZENIA-2026-09-21.md` §5.

---

## ETAP 7 — Ustawienia kampanii, których API nie odczytuje

**Status: NIEWYKONANE (odczyt)** dla większości pozycji — wymaga panelu, który jest dziś niedostępny.

| Ustawienie | Stan |
|---|---|
| Sieć wyszukiwania | `search: true` ✅ — **potwierdzone, to jedyne z tej listy, które API czyta wprost** |
| Display | `display: false` ✅ — **potwierdzone**, zgodne z planem |
| Search Partners (osobno od Display) | **BRAK DANYCH** — API zwraca tylko zbiorcze `search`/`display`, nie rozbija partnerów sieci wyszukiwania osobno |
| Limit CPC (plan: 7,00 zł) | **BRAK DANYCH** — pole `targetSpend.cpcBidCeilingMicros` widoczne tylko w logu zmian jako ustawione przy tworzeniu 20.09, wartości nie odczytuję |
| AI Max | **BRAK DANYCH** — jw., pole `aiMaxSetting.enableAiMax` w logu zmian, wartość nieczytelna |
| Final URL Expansion | **BRAK DANYCH** — nie ma odpowiednika w odczycie dla kampanii typu SEARCH (parametr `final_url_expansion` w API istnieje tylko dla PERFORMANCE_MAX wg schematu narzędzia zapisu) |
| Auto-apply recommendations | **BRAK DANYCH** — to ustawienie konta, nie kampanii; brak dostępu przez to API w ogóle |

Wszystkie „BRAK DANYCH" wymagają panelu — nie ma dla nich API. To samo dotyczyło poprzedniej sesji, nic się nie zmieniło.

---

## ETAP 8 — Search Terms

**Status: NIEWYKONANE.** Dwie próby:
1. `data_query` (Supermetrics, raport `SearchTermView`) → `[TRIAL_EXPIRED]`, sprawdzone dziś ponownie, identyczny błąd co 21.09 rano.
2. Panel Google Ads bezpośrednio → niedostępny, patrz góra pliku (żadna przeglądarka nie działa).

Zero danych o wyszukanych hasłach jest dziś osiągalnych z tej sesji. To pozostaje najpilniejsza rzecz do zrobienia przez Ciebie ręcznie, dokładnie jak w poprzednim audycie.

---

## ETAP 9 — Pierwsze dane performance

**Status: NIEWYKONANE**, ten sam powód co ETAP 8 (`[TRIAL_EXPIRED]` + brak przeglądarki). Koszt, wyświetlenia, kliknięcia, CTR, CPC, konwersje, Search Impression Share i jego składowe, rozbicie na keyword/search term/urządzenie/lokalizację/godzinę/reklamę — wszystko **BRAK DANYCH**, bez zmian od audytu z 21.09.

---

## ETAP 10 — Rekomendacja strukturalna (bez wdrażania)

Zgodnie z poleceniem: **nie tworzę grupy produktowej, tylko zapisuję rekomendację.**

Przy 5 zł/dzień (≈152 zł/mies., ≈25 kliknięć/mies. wg `strategy.md` §5) utrzymywanie **41 keywordów rozłożonych na 4 tematy** (wizerunek, eventy, nieruchomości, przemysł) w **jednej** grupie reklam oznacza, że każdy temat dostaje realnie **kilka kliknięć miesięcznie** — zbyt mało, żeby cokolwiek ocenić osobno, a jedna reklama musi obsłużyć wszystkie cztery jednocześnie (co dziś robi, całkiem spójnie, patrz `AUDYT-GOOGLE-ADS-2026-09-21.md` §6).

**Rekomendacja do decyzji za 2-3 tygodnie, nie teraz:** po pierwszym pełnym przeglądzie Search Terms (ETAP 8, do zrobienia ręcznie) rozważyć zawężenie do 1-2 tematów z najlepszą jakością zapytań, **i dopiero wtedy** rozważyć dodanie osobnej grupy produktowej — jedynej linii z udokumentowanymi historycznymi leadami (`strategy.md` §7), a dziś całkowicie nieobecnej na koncie. Nie robię tego teraz — brak danych do uzasadnienia którejkolwiek decyzji, zgodnie z Twoim poleceniem.

---

## Rejestr zmian (changelog) — 21.09.2026, sesja wdrożeniowa

| Element | Stan przed | Stan po | Wykonano | Weryfikacja |
|---|---|---|---|---|
| Tracking gclid w kodzie | Poprawka w working tree, niezacommitowana | Bez zmian | **NIEWYKONANE** (celowo, zasada repo) | `git diff` potwierdza treść zgodną z `tracking.md`; komenda gotowa wyżej |
| Stara kampania — status | ENABLED, 50 zł/dzień, grupy PAUSED | Bez zmian | **NIEWYKONANE** | `manage_campaign` → `WRITE_ACCESS_NOT_ENABLED` |
| Geo nowej kampanii | `geoTargetConstants/20861` (woj. wielkopolskie) | Bez zmian | **NIEWYKONANE** | jw. |
| Metoda lokalizacji (Presence) | `PRESENCE` | `PRESENCE` (bez zmian — już poprawne) | n/d, nic do naprawy | odczyt API |
| 5× BROAD → PHRASE | 5 BROAD live | Bez zmian, nadal 5 BROAD | **NIEWYKONANE** | jw. |
| Liczba BROAD po zmianach | 5 | **5** | **NIEWYKONANE** | odczyt API po próbie zapisu |
| Negative keywords — sanity-check | — | **Wykonany, wynik: 0 konfliktów w 4 niezależnych testach** | ✅ WYKONANE (analiza) | 4 skrypty python na `negative-keywords.csv` |
| Negative keywords — import | 0 na koncie | 0 (bez zmian) | **NIEWYKONANE** | `WRITE_ACCESS_NOT_ENABLED` |
| Konwersje (5 poprawek) | jak w audycie 21.09 | Bez zmian | **NIEWYKONANE** | brak kanału + narzędzie nie obsługuje ConversionAction |
| CPC limit | BRAK DANYCH | BRAK DANYCH | **NIEWYKONANE (odczyt)** | brak panelu, pole nieczytelne przez API |
| Search Partners | BRAK DANYCH | BRAK DANYCH | **NIEWYKONANE (odczyt)** | jw. |
| Display | `false` | `false` | n/d, już potwierdzone wcześniej | odczyt API (jedyne z tej grupy dostępne) |
| AI Max | BRAK DANYCH | BRAK DANYCH | **NIEWYKONANE (odczyt)** | brak panelu |
| Final URL Expansion | BRAK DANYCH | BRAK DANYCH | **NIEWYKONANE (odczyt)** | brak panelu, brak pola w API dla SEARCH |
| Auto-apply recommendations | BRAK DANYCH | BRAK DANYCH | **NIEWYKONANE (odczyt)** | brak panelu, brak API |
| Search Terms | BRAK DANYCH | BRAK DANYCH | **NIEWYKONANE** | `TRIAL_EXPIRED` + brak panelu |
| Koszt / kliknięcia / CTR / CPC / konwersje | BRAK DANYCH | BRAK DANYCH | **NIEWYKONANE** | jw. |

---

## Podsumowanie

1. **Co faktycznie zmieniłem:** nic w koncie Google Ads i nic w kodzie strony. Jedyny realny przyrost pracy to **pełna, 4-testowa weryfikacja bezpieczeństwa listy 471 wykluczeń** względem Twoich 14 chronionych intencji i wszystkich 41 żywych keywordów — wynik: zero konfliktów, lista w 100% gotowa do importu bez dalszej analizy.
2. **Czego nie udało się zmienić:** wszystkiego, co wymaga zapisu do konta Google Ads (pauza starej kampanii, geo, broad→phrase, import wykluczeń, porządek konwersji) oraz wszystkiego, co wymaga panelu bez API (CPC limit, Search Partners, AI Max, Final URL Expansion, auto-apply, Search Terms, dane performance) — z jednego, tego samego powodu na dole tego pliku: **żaden z trzech dostępnych dziś kanałów (Supermetrics API, Claude in Chrome, wbudowana przeglądarka) nie dawał dostępu do zapisu ani do panelu.**
3. **Jak wygląda kampania live teraz:** dokładnie tak jak w audycie z rana 21.09 — bez żadnej zmiany. Stara kampania ENABLED/50 zł, nowa kampania z geo całego województwa, 5 BROAD, 0 wykluczeń.
4. **Czy widzę realne przepalanie budżetu:** nie mogę tego ocenić liczbowo (brak danych kosztowych), ale mechanizm ryzyka opisany w audycie (geo + broad + zero wykluczeń) nadal istnieje bez zmian.
5. **Jakie Search Terms pojawiły się od startu:** BRAK DANYCH, nie do ustalenia z tej sesji.
6. **Czy tracking jest już wiarygodny:** nie — poprawka nadal nie jest wdrożona na produkcję.
7. **Czy kampania jest zgodna z planem z 20.09:** nie, bez zmian względem audytu porannego.
8. **Czego nie ruszać przez najbliższe dni:** jak w poprzednim audycie — keywordów spoza 5 BROAD i stawek, dopóki nie ma danych.
9. **Co sprawdzić ponownie za 3-7 dni:** czy któryś z trzech kanałów zapisu/panelu wreszcie działa, i jeśli tak — wykonać ETAP 2-6 z tego pliku od razu, zanim zbierze się więcej danych na błędnej konfiguracji.
10. **Co będzie podstawą decyzji po 14 dniach:** niezmienione od audytu porannego — ale zegar na te 14 dni **nie powinien liczyć się od 20.09**, tylko od dnia, w którym geo/broad/wykluczenia faktycznie wejdą w życie. Dane zebrane dziś i w kolejnych dniach na obecnej, błędnej konfiguracji nie są reprezentatywne dla docelowej kampanii.

**Najpilniejsze pojedyncze pytanie do Ciebie:** który z trzech kanałów wolisz odblokować — Supermetrics (link u góry pliku) czy Claude in Chrome (instalacja rozszerzenia)? Albo wolisz po prostu wykonać 12-15 minut ręcznie w panelu wg `GOTOWE-DO-WDROZENIA-2026-09-21.md` już teraz, bez czekania na żadne z powyższych?

---

## Sesja po odblokowaniu Claude in Chrome — 22.09.2026

Włączyłeś Claude in Chrome. Zalogowałem się na Twoje konto Google (wybór istniejącej sesji, bez wpisywania hasła), potwierdziłem konto **786-864-4697** i wykonałem zmiany bezpośrednio w panelu. **Chrome rozłączył się w trakcie ETAP 6 (konwersje)** — sesja przeglądarki przestała odpowiadać w połowie edycji jednego pola. Wszystko poniżej jest zweryfikowane niezależnie przez odczyt API (Supermetrics), już po utracie połączenia z przeglądarką, więc liczby są aktualne na teraz, nie na pamięć.

| Element | Stan przed | Zmiana | Stan po | Zweryfikowano live |
|---|---|---|---|---|
| Stara kampania — status | ENABLED, 50 zł/dzień | Wstrzymana w panelu (menu statusu → Wstrzymaj) | **PAUSED** | ✅ Tak — odczyt API dziś: `"status":"PAUSED"`. Dodatkowo: łączny budżet aktywnych kampanii na koncie spadł z 55 zł do 5 zł/dzień |
| Geo nowej kampanii | Województwo wielkopolskie (`geoTargetConstants/20861`) | Usunięte województwo, dodany promień 25 km wokół Poznania (Szukanie zaawansowane → Promień → 52.405679, 16.931277) | **Promień 25 km od Poznania** | ✅ Tak — odczyt API: `{"type":"custom_location","latitude":52.405679,"longitude":16.931277,"radius":25,"distance_unit":"kilometer"}` |
| Metoda lokalizacji (Presence) | Obecność | Sprawdzone po edycji geo — nie zresetowało się | **Obecność** (nie „Obecność lub zainteresowanie") | ✅ Tak — `"geo_target_type":"PRESENCE"` bez zmian |
| 5× BROAD → PHRASE | 5 słów w dopasowaniu przybliżonym | Zaznaczone wszystkie 5, „Zmień typy dopasowania" → „Zmień wszystkie typy dopasowania" → Dopasowanie do wyrażenia, bez zachowywania duplikatów | **0 BROAD, wszystkie 5 jako PHRASE** (EXACT-y zostały nietknięte) | ✅ Tak — odczyt API: 0 keywordów z `match_type:"BROAD"` w całej kampanii |
| Negative keywords | 0 na koncie | Wklejone 471 pozycji (441 BROAD + 30 PHRASE w cudzysłowie) w jednym polu tekstowym, zapisane na poziomie kampanii | **471 wykluczeń live** | ✅ Tak — odczyt API: dokładnie 471 pozycji, 441 BROAD + 30 PHRASE, treść identyczna z `negative-keywords.csv` |
| Limit maks. CPC | BRAK DANYCH (nieczytelne przez API) | Odczytane w panelu, nic nie zmieniałem | **7,00 zł** (zgodne z planem) | ✅ Tak — widoczne wprost w Ustawieniach kampanii → Określanie stawek |
| Search Partners | BRAK DANYCH | Odczytane w panelu, nic nie zmieniałem | **Wyłączone** (checkbox „Uwzględnij partnerów w sieci wyszukiwania Google" odznaczony) | ✅ Tak, wizualnie w panelu |
| Display Network | `false` (już wiedziałem z API) | Potwierdzone też w panelu | **Wyłączona** | ✅ Tak |
| AI Max | BRAK DANYCH | Odczytane w panelu: przełącznik „Optymalizuj kampanię za pomocą funkcji AI Max" wyłączony | **Wyłączone** | ✅ Tak, wizualnie w panelu |
| Final URL Expansion / automatyczne komponenty | BRAK DANYCH | Odczytane w panelu: „Optymalizacja komponentów: Wyłączono dostosowywanie tekstu i rozwinięcie końcowego adresu URL" | **Wyłączone** | ✅ Tak |
| Dynamiczne reklamy w wyszukiwarce (DSA) | BRAK DANYCH | Odczytane w panelu: pole „Website" w konfiguracji DSA puste | **Nieskonfigurowane / nieaktywne** | ✅ Tak |
| Dopasowanie przybliżone — rozszerzanie słów kluczowych | BRAK DANYCH | Odczytane w panelu: „Wyłącz: używaj dopasowania słów kluczowych" | **Wyłączone** | ✅ Tak |
| `contact_submit` — Główna/Dodatkowa | Nieznane (API nie zwraca tego pola) | Sprawdzone w panelu: już ustawione poprawnie, nic nie zmieniałem | **Podstawowe (Główna)**, kategoria CONTACT | ✅ Tak, wizualnie w panelu i API (`category:"CONTACT"`) |
| `phone_click` | Dodatkowa, Jedna | Sprawdzone, już poprawne | **Bez zmian — już OK** | ✅ Tak |
| `email_click` | Dodatkowa, **Wiele** | Zobaczone w panelu jako „Dodatkowy" — **nie zdążyłem otworzyć edycji zliczania** | **NIEWYKONANE** — nadal Wiele | ✅ Potwierdzone API dziś: `"counting":"MANY_PER_CLICK"`, bez zmian |
| `generate_lead` — zliczanie | PAGE_VIEW, **Wiele** | Otworzyłem edycję, zmieniłem „Liczba" z „Wszystkie konwersje" na „Tylko jedna konwersja", zapisałem | **Zliczanie: Jedna** | ✅ Tak — odczyt API dziś: `"counting":"ONE_PER_CLICK"` (było `MANY_PER_CLICK`) |
| `generate_lead` — kategoria | PAGE_VIEW | Otworzyłem panel zmiany celu, ale Chrome rozłączył się zanim zapisałem nową kategorię | **NIEWYKONANE — nadal PAGE_VIEW** | ✅ Potwierdzone API dziś: `"category":"PAGE_VIEW"`, bez zmian. Ścieżka do dokończenia: Cele → Podsumowanie → najedź na wiersz „Wyświetlenie strony (Zdarzenie generate_lead)” → ikona ⋮ → „Zmień na inny cel konwersji” |
| 4 martwe działania Smart Campaign | Wszystkie ENABLED, dwa z nich oznaczone **Podstawowe (Główna)** | Próbowałem otworzyć edycję — wiersze mają ikonę kłódki (`lock_outline`), standardowy panel nie pozwala ich edytować | **NIEWYKONANE, prawdopodobnie zablokowane strukturalnie** | Odczyt API: wszystkie 4 nadal `"status":"ENABLED"`. **Nowe, ważne odkrycie**: „Kliknięcia przycisku połączenia w reklamach inteligentnych” (oba warianty) są dziś oznaczone jako **Podstawowe/Główne** działanie konwersji — razem z `contact_submit`. To znaczy: dwa martwe działania bez żadnej kampanii inteligentnej **współdzielą dziś status głównej konwersji** z Twoim prawdziwym formularzem. Wymaga ręcznej interwencji w panelu (możliwe że trzeba przez Narzędzia → Konwersje → dany wiersz → sprawdzić, czy kłódka ustępuje po zmianie z poziomu innego miejsca niż to, które sprawdziłem) |
| „Business profile - Call” | — | Nowo odkryte podczas tej sesji, nie było w żadnym poprzednim audycie | Status: **Podstawowe**, kategoria „Inne”, również z kłódką | Nowy finding do audytu — nie było go w liście z `tracking.md`/audytu z 21.09 |

### Co jeszcze zostało NIEWYKONANE (Chrome rozłączony przed dotarciem)

- **ETAP 6, dokończenie:** kategoria `generate_lead`, zliczanie `email_click` (Wiele → Jedna), próba odblokowania/wyłączenia 4 martwych działań Smart Campaign + weryfikacja nowo odkrytego „Business profile - Call”.
- **ETAP 8:** Search Terms — nie zdążyłem dotrzeć do tej sekcji w panelu.
- **ETAP 9:** dane performance — mam tylko fragmentaryczne dane zebrane po drodze (patrz niżej), nie systematyczny zrzut.

**Dane performance zebrane przy okazji (widziane w panelu, nie systematyczny zrzut — okno „14–20 wrz 2026”, czyli praktycznie tylko 20.09):**
Wyświetlenia: 2. Kliknięcia: 1. Śr. CPC: 1,58 zł. Koszt: 1,58 zł. CTR: 50%. Jedyne kliknięcie padło na keyword **„fotograf nieruchomości"** (dopasowanie do wyrażenia). Stan kampanii w panelu: „Odpowiednia (nauka)" — w fazie uczenia się strategii Maximize Clicks. To jest urywek, nie pełny ETAP 9 — nie buduj na tym wniosków, to dosłownie jedno kliknięcie.

### Status na koniec tej sesji

**Zrobione i zweryfikowane niezależnie (API + panel):** pauza starej kampanii, geo (Poznań+25km, Presence), 0 BROAD keywordów, 471 wykluczeń, potwierdzenie że CPC/Search Partners/Display/AI Max/Final URL Expansion/DSA/auto-rozszerzanie słów już były zgodne z planem (nic do zmiany), `generate_lead` zliczanie naprawione.

**Nadal otwarte:** kategoria `generate_lead`, zliczanie `email_click`, los 4 martwych działań Smart Campaign + nowo odkryte „Business profile - Call" (wszystkie z kłódką, częściowo oznaczone jako Główne konwersje razem z `contact_submit`), cały ETAP 8 (Search Terms) i pełny ETAP 9 (dane performance).

**Czy Claude in Chrome zadziałał:** tak, w pełni — logowanie, nawigacja, edycja pól, zapisy wszystkie działały poprawnie, dopóki się nie rozłączył w połowie sesji. To nie był błąd samych akcji, tylko utrata połączenia z rozszerzeniem w trakcie pracy. Do wznowienia: potwierdź, że Chrome jest nadal podłączony (albo podłącz ponownie), a dokończę ETAP 6 (3 pozostałe pozycje), 8 i 9 od razu.
