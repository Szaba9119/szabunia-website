# Plan audytu Google Ads — 5 sierpnia 2026

Audyt konta Google Ads 786-864-4697 (szabunia.pl), moduł D metodyki: kanały płatne i pomiar.
Dokument planistyczny — nie zawiera jeszcze danych. Wykonanie: 05.08.2026, Claude, tryb autonomiczny.
Prompt uruchomieniowy: `PROMPT-AUDYT-GOOGLE-ADS-2026-08-05.md`.

## 1. Kontekst i założenia

**Stan przedmiotu audytu.** Konto ma jedną kampanię w sieci wyszukiwania („Pierwsza pro kampania",
start 5.02.2025), budżet 25 zł/dz., cztery grupy reklam. Łańcuch audytowy:

| Dokument | Okno | Co zostawił otwarte |
|---|---|---|
| `AUDYT-GOOGLE-ADS-2026-06-11.md` | 13.03–11.06 | P0 pomiar (relikty UA/Adobe w celach konta), P2 bałagan w 22 działaniach konwersji |
| `AUDYT-GOOGLE-ADS-2026-07-06.md` | 06.06–05.07 | limit maks. CPC 5 zł i +34 wykluczenia wykonane 06.07 wieczorem; **kontrola ~20.07 nigdy nie odbyła się jako dokument** |
| `ADS-EVENTY-DIAGNOZA-2026-08-02.md` | 19.07–01.08 | warianty A/B/C dla eventów bez decyzji; **dwa sitelinki (Kontakt, Portfolio) prowadzą na stronę główną** |

**Okno czasowe.** 06.07–04.08.2026 (30 pełnych dni), styka się bez luki z poprzednim audytem.
Porównanie: 06.06–05.07.2026. Podokna kontrolne wg daty zmiany w koncie, nie kalendarza.

**Uwaga interpretacyjna — czego te dane nie uniosą:**

1. Budżet 25 zł/dz. daje maksymalnie 750 zł i kilkadziesiąt kliknięć. Różnica 0 vs 3 konwersje
   nie jest statystycznie rozróżnialna od szumu. Każdy wniosek „grupa X jest skuteczniejsza"
   przy jednocyfrowych konwersjach jest hipotezą, nie ustaleniem.
2. Okno to lipiec — sezon urlopowy w B2B. Porównanie rok do roku niedostępne (inna struktura
   konta), więc sezonowość trzeba nazwać, nie policzyć.
3. Atrybucja jest niedomierzona z definicji: Consent Mode wymaga kliknięcia „Akceptuję".
   Dlatego ground truth ze skrzynki waży w tym audycie więcej niż kolumna „Konwersje".
4. Zmiany w koncie z 3–4 sierpnia (słowa kluczowe) wpadają w ostatnie dni okna — ich efektu
   nie da się jeszcze zmierzyć.

**Źródło danych.**
- ścieżka A — Supermetrics MCP: **odpadła**, trial zespołu wygasł 03.06.2026 (5 zapytań, ten sam błąd).
- ścieżka B — panel Google Ads na żywo w Chrome, wyłącznie odczyt.
- ground truth spoza Ads — skrzynka `marcin.szabunia@gmail.com`, okno 05.07–05.08,
  zapytania: szabunia.pl / formularz / wycena / zapytanie / resend / lead magnet / poradnik.

**Punkt odniesienia.** Liczby z `AUDYT-GOOGLE-ADS-2026-07-06.md` (496,49 zł / 102 klik. /
CPC 4,87 zł / CTR 5,67%) — mierzone tą samą metryką w tym samym panelu.

## 2. Zakres

### 2.1 Pomiar (pierwszy, bo bez niego reszta jest ślepa)
- [ ] pełna lista działań powodujących konwersję ze stanem śledzenia
- [ ] które działania są „Podstawowe", które „Dodatkowe"
- [ ] które są uwzględnione w celach na poziomie konta, a nie powinny (relikty UA / Adobe / kampanie inteligentne)
- [ ] cele konwersji faktycznie podpięte do kampanii („Kampanie 0 z 1" = martwy cel)
- [ ] skład konwersji w oknie: co konkretnie się zliczyło
- [ ] okna konwersji i modele zliczania
- [ ] ground truth: ile realnych zapytań wpłynęło w oknie

### 2.2 Ustawienia kampanii
- [ ] strategia stawek, obecność i wartość limitu maks. CPC, skutek limitu
- [ ] budżet i % wykorzystania
- [ ] sieci (Display i partnerzy wyłączeni?)
- [ ] lokalizacja, języki
- [ ] AI Max, dynamiczne reklamy w wyszukiwarce, automatyczne stosowanie rekomendacji
- [ ] wykluczenia IP, rotacja reklam

### 2.3 Historia zmian — domknięcie łańcucha
- [ ] wszystkie zmiany w oknie z podziałem na kategorie
- [ ] czy trzy działania z 06.07 przetrwały do dziś
- [ ] kto i kiedy je zmienił

### 2.4 Grupy, słowa kluczowe, wyszukiwane hasła
- [ ] koszt per grupa + udział % + zgodność z usługami na stronie
- [ ] słowa: liczba, typy dopasowania, statusy diagnostyczne, niski wynik jakości
- [ ] wyszukiwane hasła: kandydaci do wykluczenia **z kwotą**, suma wycieku i jej % budżetu
- [ ] czy wykluczenia z 06.07 działają

### 2.5 Reklamy i komponenty
- [ ] liczba RSA, Ad Strength, CTR per grupa
- [ ] sitelinki: liczba, status, CTR i koszt per sitelink
- [ ] **los dwóch sitelinków wskazanych 02.08 (Kontakt, Portfolio)**
- [ ] zgodność treści reklamy z cennikiem live

### 2.6 Urządzenia, harmonogram, utracony udział
- [ ] rozkład kosztu i kliknięć po urządzeniach
- [ ] harmonogram reklam vs realny rozkład dzień/godzina
- [ ] utracony udział w wyświetleniach: budżet vs ranking

## 3. Dane do zebrania

| # | Panel / źródło | Zakres czasowy | Ścieżka |
|---|---|---|---|
| 1 | Kampanie — podsumowanie | 06.07–04.08 i 06.06–05.07 | `/aw/campaigns` |
| 2 | Kampanie — podokna wg daty zmian | wg historii zmian | selektor dat |
| 3 | Ustawienia kampanii | stan na 05.08 | koło zębate przy kampanii |
| 4 | Historia zmian | 06.07–04.08 | `/aw/changehistory` |
| 5 | Grupy reklam | 06.07–04.08 | `/aw/adgroups` |
| 6 | Słowa kluczowe | 06.07–04.08 | `/aw/keywords` |
| 7 | Wyszukiwane hasła | 06.07–04.08 | zakładka wyszukiwanych haseł |
| 8 | Cele → działania konwersji | 06.07–04.08 + stan | `/aw/conversions` |
| 9 | Komponenty (sitelinki) | 06.07–04.08 | raport powiązań komponentów |
| 10 | Przegląd (urządzenia, dzień/godzina, stan śledzenia) | 06.07–04.08 | `/aw/overview` |
| 11 | Gmail | 05.07–05.08 | wyszukiwanie po frazach |

## 4. Kolejność wykonania

1. **Podsumowanie kampanii** — bo daje ramę liczbową i od razu pokazuje, czy coś się zmieniło.
2. **Ustawienia + historia zmian** — bo bez wiedzy, co zmieniono w trakcie okna, każda różnica
   w liczbach jest niepoprawnie przypisana sezonowi albo algorytmowi.
3. **Podokna wg dat zmian** — dopiero po kroku 2 wiadomo, gdzie postawić cięcie.
4. **Pomiar** — bo rozstrzyga, czy kolumna „Konwersje" cokolwiek znaczy.
5. **Ground truth ze skrzynki** — bo weryfikuje krok 4 niezależnie od Google.
6. Grupy → słowa → hasła → komponenty.

Szacunek nakładu: jedna sesja.

## 5. Produkt końcowy

Plik: `AUDYT-GOOGLE-ADS-2026-08-05.md`, struktura wg `docs/METODYKA-AUDYTU.md §6`,
format findingu §5, ID w formacie `ADS2608-NN`.
Następnie `BRIEFY-ADS-2026-08-05.md` dla P0/P1.

**Stop-conditions (zawsze aktywne):** żadnych zmian w koncie · żadnego klikania przycisków
zapisujących · żadnych wykluczeń, stawek, budżetów, reklam · żadnych pobrań plików ·
żadnych zmian w repo, żadnych commitów · decyzje o budżecie, cenach i ofercie wyłącznie Marcina.

## 6. Kryteria ukończenia

1. Wszystkie checklisty §2 odhaczone albo oznaczone „brak danych" z powodem.
2. Każdy finding ma dowód (zrzut/odczyt z panelu z datą), priorytet, pewność, ownera.
3. Każdy otwarty punkt z trzech poprzednich dokumentów Ads domknięty statusem
   zamknięty / bez zmian / regres.
4. Sekcja „czego nie sprawdzono" wypełniona z listą brakujących dostępów.
5. Sekcja „pozorne problemy skorygowane w trakcie" wypełniona albo jawnie pusta.
6. Rejestr findingów z ID na końcu raportu.

---
*Plan sporządzony 2026-08-05 przed zebraniem danych. Audyt nie wprowadza zmian w koncie.*
