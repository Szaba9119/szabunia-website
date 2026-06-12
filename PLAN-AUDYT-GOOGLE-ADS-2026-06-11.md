# Plan pełnego audytu Google Ads — 11 czerwca 2026

Plan wykonania audytu konta Google Ads dla **szabunia.pl** (fotograf/twórca wideo B2B, Poznań).
Dokument planistyczny — nie zawiera jeszcze danych z konta. Wykonanie: sesja z Claude (Chrome) lub ręcznie wg checklist.

---

## 1. Kontekst i założenia

- **Stan konta:** kampania zrestrukturyzowana **10.06.2026** — 4 grupy reklam per usługa na szabunia.pl. Import konwersji z GA4 **czeka na wykonanie** (otwarta kwestia z poprzedniej sesji).
- **Okres analizy:** **ostatnie 90 dni** (13.03–11.06.2026). Uwaga interpretacyjna: większość okresu to **stara struktura**, tylko ~1 dzień to nowa. Dane segmentować na "przed/po 10.06" — wniosków o nowej strukturze nie wyciągać z danych sprzed restrukturyzacji.
- **Źródło danych:** brak Supermetrics. Dwie ścieżki:
  - **A (preferowana):** sesja z Claude w Chrome — Marcin zalogowany do `ads.google.com`, Claude odczytuje ekrany i raporty.
  - **B (zapasowa):** Marcin eksportuje CSV z paneli wymienionych w §3 i wkleja/wrzuca pliki do sesji.
- **Punkt odniesienia treści:** oferta i ceny na **stronie live** (źródło prawdy — nie pliki cennika), kanon designu w `DESIGN.md`, znane problemy w `AUDYT-2026-06-09.md`.

---

## 2. Zakres audytu (5 obszarów)

### 2.1 Struktura konta i kampanii
- [ ] Lista kampanii: typ, status, budżet dzienny, strategia ustalania stawek
- [ ] Zgodność 4 grup reklam z 4 usługami na stronie (nazwy, podział tematyczny, brak nakładania)
- [ ] Ustawienia kampanii: lokalizacje (Poznań / Wielkopolska / PL?), języki, sieci (czy Display/partnerzy wyszukiwania wyłączeni?), harmonogram reklam
- [ ] Strategia stawek vs stan konwersji — jeśli smart bidding bez działających konwersji → flaga P0
- [ ] Wydatki 90 dni: rozkład per kampania/grupa, dni bez wyświetleń, utracony udział w wyszukiwaniach (budżet vs ranking)

### 2.2 Słowa kluczowe i wyszukiwania
- [ ] Pełna lista słów kluczowych: typy dopasowania, QS (Quality Score) z komponentami (CTR przew., trafność reklamy, jakość strony docelowej)
- [ ] Raport **wyszukiwanych haseł (search terms)** za 90 dni: top koszty, hasła bez konwersji, hasła nietrafne (B2C, "za darmo", inne miasta, tematy spoza oferty)
- [ ] Lista wykluczeń: czy istnieje, czy pokrywa znane śmieciowe hasła; propozycja nowych wykluczeń (na poziomie kampanii/konta)
- [ ] Kanibalizacja: czy te same hasła trafiają do różnych grup (cross-matching)
- [ ] Luki: usługi/intencje ze strony bez pokrycia słowami kluczowymi (np. EVENT PREMIUM, Monthly Content)

### 2.3 Reklamy i Ad Strength
- [ ] Wszystkie RSA: liczba nagłówków/tekstów, Ad Strength, przypięcia (pinning)
- [ ] Zgodność treści reklam z ofertą i cenami na stronie (ceny 2026: ESSENTIAL 1 000 zł, EVENT PREMIUM 4 500 zł, Monthly Content 4 900 zł/m-c — **nie cytować w reklamach kwot niezgodnych ze stroną**)
- [ ] Komponenty (assets/rozszerzenia): sitelinki, objaśnienia, wywołania, lokalizacja (powiązanie z wizytówką Google), obrazy — co jest, czego brakuje
- [ ] Spójność brandu: domena `szabunia.pl` we wszystkich wyświetlanych URL, brak reliktów `marcinszabunia.pl`
- [ ] CTR per grupa vs średnia konta; reklamy "najgorsze" do podmiany

### 2.4 Konwersje i śledzenie
- [ ] Lista działań powodujących konwersję: źródło (GA4 / tag Google Ads), status ("rejestruje konwersje" vs "nieaktywne"), liczniki, okna konwersji
- [ ] **Import konwersji GA4 — wykonać/zweryfikować** (otwarta pozycja z 10.06): które zdarzenia (wysłanie formularza /api/contact, lead magnet /api/lead?), które oznaczone jako główne (primary)
- [ ] Test końcówka-do-końcówki: wysłanie formularza na stronie → zdarzenie w GA4 → konwersja w Ads (DebugView/diagnostyka tagu)
- [ ] Atrybucja: model, okna; consent mode — status zgód (wymóg UE)
- [ ] Auto-tagging (GCLID) włączony; brak podwójnego liczenia (GA4 + tag Ads na to samo zdarzenie)

**Ground truth z Gmaila (niezależnie od tagów):** leady przychodzą mailem, więc realną liczbę konwersji liczymy z dwóch źródeł:

- **Stary formularz (Adobe Portfolio / marcinszabunia.pl):** nadawca `noreply-behance@behance.com`, temat `Adobe Portfolio Contact Form Submission From '...' Page` — temat zdradza stronę źródłową (Kontakt / Portrety / Produkty / Strona główna).
- **Nowy formularz (szabunia.pl / Resend):** nadawca wg `CONTACT_FROM_EMAIL` (obecnie `kontakt@szabunia.pl`).

*Wstępny zrzut (wykonany 11.06, okno 90 dni):* **stary formularz = 10 leadów** (ostatni 26.05: m.in. Ilonn Hotel — event, SECA — packshoty, 2 sesje portretowe domknięte), **nowy formularz = 0 leadów** (1 mail = test lead magnetu z 10.06). Wniosek do zweryfikowania w audycie: **leady wciąż płyną przez starą domenę**, którą Ads nie targetuje po restrukturyzacji — porównać z danymi klików/konwersji w koncie i pilnie domknąć P0 ze starego audytu (przekierowanie marcinszabunia.pl → szabunia.pl + działający pomiar na nowej stronie).

### 2.5 Landing pages
- [ ] Mapowanie: każda grupa reklam → finalny URL; czy prowadzi na podstronę usługi (`/uslugi/...`), nie na stronę główną
- [ ] Zgodność komunikatu (message match): nagłówek reklamy vs H1/oferta strony docelowej
- [ ] Techniczne: poprawne 200, www/non-www zgodnie z kanonikiem, czas ładowania mobile, widoczność CTA i formularza
- [ ] Jakość strony docelowej z QS (z §2.2) jako sygnał zwrotny

---

## 3. Dane do zebrania (panele / eksporty)

| # | Panel w Google Ads | Zakres |
|---|--------------------|--------|
| 1 | Kampanie — przegląd + kolumny: budżet, strategia, utracony udział | 90 dni |
| 2 | Grupy reklam + słowa kluczowe (z QS i komponentami) | 90 dni |
| 3 | Statystyki wyszukiwanych haseł | 90 dni |
| 4 | Wykluczające słowa kluczowe (kampanie + listy) | stan bieżący |
| 5 | Reklamy + komponenty (Ad Strength, stan) | stan bieżący + CTR 90 dni |
| 6 | Cele → Konwersje (lista działań + diagnostyka) | stan bieżący |
| 7 | Połączone konta (GA4, wizytówka Google) | stan bieżący |
| 8 | Historia zmian | od 01.03.2026 (kontekst restrukturyzacji) |
| 9 | Gmail: leady z formularzy (Behance/Adobe + Resend) — **zebrane 11.06** | 90 dni |

---

## 4. Kolejność wykonania

1. **Konwersje (§2.4) — najpierw.** Bez działającego pomiaru reszta wniosków o skuteczności jest ślepa; import GA4 to znana zaległość.
2. Struktura i ustawienia (§2.1).
3. Search terms + wykluczenia (§2.2) — zwykle najszybsze oszczędności.
4. Reklamy i komponenty (§2.3).
5. Landing pages (§2.5).
6. Synteza: priorytetyzacja P0/P1/P2 + plan poprawek (analogicznie do `PLAN-POPRAWEK-2026-06-09.md`).

Szacunkowo: 1 sesja robocza z Chrome (§2.4+§2.1), druga na §2.2–2.5 i raport.

---

## 5. Produkt końcowy

`AUDYT-GOOGLE-ADS-2026-06-XX.md` w repo, struktura jak `AUDYT-2026-06-09.md`:
podsumowanie wykonawcze z tabelą priorytetów P0–P2 → stan faktyczny per obszar → rekomendacje → decyzje dla Marcina (stop-conditions).

**Stop-conditions (zawsze):** żadnych zmian w koncie Ads bez zgody Marcina; rozjazdy cen/treści tylko raportować, nie poprawiać; zmiany budżetów/stawek = wyłącznie rekomendacja.

---

## 6. Kryteria ukończenia audytu

1. Wszystkie checklisty §2 odhaczone albo oznaczone "brak danych" z powodem.
2. Status importu konwersji GA4 jednoznacznie ustalony (działa / nie działa / wykonany w trakcie audytu).
3. Lista wykluczeń-kandydatów z search terms (z kosztem 90 dni każdego hasła).
4. Tabela priorytetów P0–P2 z szacunkiem wpływu.
5. Raport zapisany w repo; brak jakichkolwiek zmian w koncie bez akceptacji.

---

*Plan przygotowany 11.06.2026. Zmiany zakresu — decyzja Marcina.*
