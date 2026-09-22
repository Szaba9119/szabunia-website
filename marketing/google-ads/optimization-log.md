# Dziennik optymalizacji

Zasada: **jedna istotna zmiana naraz**, żeby dało się przypisać skutek do przyczyny.
Każdy wpis: data, zmiana, powód, dane sprzed zmiany, oczekiwany rezultat, wynik po czasie.

---

## 2026-09-20 — przygotowanie kampanii (przed startem)

**Zmiana:** zbudowano kampanię „Search | Poznań | Fotografia B2B | 5 zł”
(1 kampania, 2 grupy reklam, 27 słów kluczowych, 435 wykluczeń, 3 RSA, 6 objaśnień).
**To jest stan sprzed red-team review.** Liczby zmienione tego samego dnia na 21 słów
i 471 wykluczeń, patrz wpis niżej. Zapis zostaje w pierwotnej postaci, bo dziennik ma
pokazywać, co było, a nie to, co wyszło na końcu.
Dostarczona jako pliki importu, **nie uruchomiona**.

**Powód:** budżet 5 zł/dzień wymaga struktury, w której każde wyszukanie ma wysoką szansę
bycia komercyjnym. Poprzednia struktura tego nie miała.

**Dane sprzed zmiany (2025-10-01..2026-08-02):** 2 284 kliknięcia, 4 531 zł, CTR 5,63%,
CPC phrase+exact 6,07 zł. Dopasowanie przybliżone wzięło 85,3% wydatku.
Samo `fotograf poznań` (broad) wzięło 53,5% wydatku przy zerze zapytań.

**Oczekiwany rezultat:** około 25 kliknięć miesięcznie przy CPC ~6 zł, z czego
zdecydowana większość na zapytaniach z jawną intencją komercyjną i lokalną.
**Nie oczekuję wzrostu liczby kliknięć. Oczekuję spadku liczby kliknięć i wzrostu ich jakości.**

**Wynik po czasie:** _do uzupełnienia po 30 dniach._

---

## 2026-09-20 — `src/app/layout.tsx`, natychmiastowe ładowanie gtag.js dla ruchu płatnego

**Zmiana:** wejścia z `gclid`, `wbraid` lub `gbraid` ładują `gtag.js` od razu, zamiast
czekać na bezczynność albo interakcję. Leniwe ładowanie zostaje dla pozostałego ruchu.

**Powód:** wszystkie konwersje w koncie pochodzą z importu z GA4, a GA4 rejestrował
~26% kliknięć z reklam. Z dwóch realnych leadów z lipca 2026 Ads policzył jeden.

**Dane sprzed zmiany:** Ads ~68 kliknięć wobec 18 sesji Paid Search w GA4 (02.08.2026).

**Oczekiwany rezultat:** wyższy odsetek kliknięć płatnych widocznych w GA4.
**Zastrzeżenie: lokalnie nie da się tego zmierzyć** (na bezczynnej maszynie ścieżka leniwa
też jest szybka). Efekt ujawni się na realnym ruchu mobilnym.

**Jak to zweryfikować:** po 30 dniach porównać liczbę kliknięć w Ads z liczbą sesji
Paid Search w GA4 w tym samym oknie. Punkt odniesienia: 26%.

**Wynik po czasie:** _do uzupełnienia._

---

## 2026-09-20 — poprawki po red-team review (przed startem)

**Zmiana:** niezależny agent w roli „Google Ads red team reviewer" dostał kampanię
bez moich założeń, z poleceniem znalezienia błędów. Raport w `redteam-review.md`.
Przyjąłem 11 uwag, odrzuciłem 2, jedną przekazałem Marcinowi do decyzji.

**Co się zmieniło:**

| Obszar | Przed | Po | Powód |
|---|---|---|---|
| Strategia stawek | Ręczne CPC 7 zł / 5 zł | Maximize Clicks, limit CPC 7 zł | Kampania jest ograniczona wolumenem, nie budżetem. Stawki ręczne przegrywają wyświetlenia, których nie ma czym nadrobić |
| Stawki grup | Produkty 5 zł, portrety 7 zł | jedna stawka | Zaniżanie stawki jedynej linii z leadami było sprzeczne. W Ads nie ma budżetu na poziomie grupy |
| Geotargeting | miasto Poznań | Poznań + 25 km | Granica miasta wycinała parki biznesowe aglomeracji |
| Słowa kluczowe | 27 | 21 | Usunięto bliskie warianty i phrase'y z miastem redundantne wobec phrase bez miasta |
| PHRASE „sesja wizerunkowa" | aktywne | usunięte | Najszerszy wektor B2C w zestawie, 4 kliknięcia w całej historii |
| EXACT „fotograf produktowy poznań" | aktywne | usunięte | Wolumen 0 ORAZ najgorsza aukcja (4 reklamodawców ogólnopolskich) |
| Wykluczenia | 435 | 471 | Dodano wektor B2C glamour, odmiany fleksyjne, DIY pod „packshot", marketplace'y |
| Gminy aglomeracji w wykluczeniach | Luboń, Swarzędz, Suchy Las, Skórzewo | usunięte | To nie są dzielnice Poznania, tylko osobny rynek B2B |
| Sitelinki | brak | 4 kotwice na stronie głównej | Uzasadnienie „bo jeden landing" było nieprawdziwe. Kotwice zachowują jeden landing |
| Przypięcia w RSA | brak | pozycja 1 = fraza kluczowa | Przy 8 kliknięciach na reklamę nie zobaczysz złej kombinacji |
| Nagłówki AG2 | 6 mówiło to samo | 3 wymienione | Różnicowanie zamiast powtórzeń |
| Uzasadnienie braku UTM | błędne | poprawione | UTM-y nie nadpisują gclid. Zagrożeniem jest brak auto-tagowania |

**Czego nie zmieniłem i dlaczego:**
- **Landing na podstrony usług (W-01):** brief Marcina mówi wprost „Tylko strona główna.
  Nie rozdzielamy ruchu pomiędzy podstrony usług". To warunek zadania, nie przeoczenie.
- **Wykluczenie „cennik" i „ile kosztuje" (pyt. 9):** argument red teamu jest dobry
  (strona nie ma cen, więc odbicie jest niemal pewne), ale kontrargument też
  („cennik sesji biznesowej" bywa zapytaniem kupującego), a sprawa dotyka decyzji cenowej
  Marcina z 03.08 i 14.08. **Do jego decyzji.**

**Oczekiwany rezultat:** mniej marnowanych kliknięć na wektorze B2C, wyższa obecność
w aukcjach, w których nie ma konkurencji, i pomiar, który nie zależy wyłącznie od zgody na cookies.

**Wynik po czasie:** _do uzupełnienia._
