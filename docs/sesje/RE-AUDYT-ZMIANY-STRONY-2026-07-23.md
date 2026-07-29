# Re-audyt po zmianach na stronie — 2026-07-23

Powód: Marcin usunął ze strony **kalkulator wyceny** i **rozbudowany cennik**. Re-audyt trzech kanałów pod kątem skutków (GSC, Ads, GA4). Dane na żywo przez Chrome + weryfikacja repo/live.

---

## 0. Co się zmieniło (zweryfikowane)

- **`/kalkulator` → 301 → `/kontakt`** (sprawdzone na żywo; poprawny redirect, nie 404). W repo brak `src/app/kalkulator/`.
- **Kalkulator i cennik zniknęły z home** — w `src/app/page.tsx` brak Pricing/Calculator; usunięte `Pricing.tsx` i `PricingCalculator.tsx`; został tylko `PortfolioPricing.tsx`.
- **Lejek prowadzi teraz w całości do `/kontakt`** — formularz z rozwijaną usługą, „wstępna wycena w 24h", model **„cena na zapytanie"** bez publicznych cen.

---

## 1. Google Ads — skutki

- **Sitelink „Kalkulator wyceny": JUŻ USUNIĘTY.** Aktywne sitelinki: **6/6** „Odpowiednia" (Sesje zespołowe, Portfolio, Sesje biznesowe, Fotografia produktowa, Fotografia eventowa, Kontakt) — **żaden nie prowadzi do /kalkulator**. Mylący sitelink zniknął (usunięty przez Marcina albo Google). Bez akcji.
- **Cel konwersji „Prośby o wycenę" (calculator_done) — teraz MARTWY.** To dokładnie ten cel, który podpiąłem 20.07 do kampanii — po usunięciu kalkulatora `calculator_done` już nigdy nie odpali. **Rekomendacja: odpiąć go z kampanii** (odwrócenie zmiany z 20.07) albo zostawić (nieszkodliwy, ale bezużyteczny).
- **Jedyna żywa konwersja Ads = `contact_submit` (cel „Kontakt")** — sygnał bardzo cienki (patrz GA4: 1/28 dni).
- Rekomendacja Google **„Maksymalizuj liczbę konwersji"** — tym bardziej NIE stosować: po usunięciu kalkulatora sygnał konwersji jest jeszcze słabszy.
- Limit CPC 7 zł (ustawiony 20/23.07) — zostaje, kontrola za ~2 tyg. bez zmian.

## 2. Search Console — skutki

- Indeksacja: **46/50 zindeksowanych** — bez zmian, ale „Ostatnia aktualizacja: 10.07" = dane **sprzed** zmian (Google jeszcze nie przeczołgał). Brak nowych błędów.
- `/kalkulator` to czysty **301 na /kontakt** → przy recrawlu trafi do „Strona z przekierowaniem" (nieszkodliwe), indeks spadnie o ~1 (do ~45). **Zero 404.**
- Usunięcie cennika z home = zmiana treści na już zindeksowanej stronie — neutralne dla indeksacji. **Bez akcji.**

## 3. GA4 — skutki (najważniejsze)

Okno 28 dni (25.06–22.07, jeszcze z kalkulatorem) — zdarzenia:

| Zdarzenie | Liczba | Użytkownicy | Status po zmianie |
|---|---|---|---|
| calculator_service_selected | 16 | 8 | **→ 0** |
| calculator_done | 7 | 5 | **→ 0** |
| calculator_to_form | 2 | 2 | **→ 0** |
| contact_form_started | 5 | 5 | zostaje |
| form_start | 11 | — | zostaje |
| **contact_submit** | **1** | 1 | **jedyna żywa konwersja** |
| form_submit | 1 | 1 | zostaje |
| phone_click | 7 | 4 | zostaje |
| email_click | 2 | 2 | zostaje |

**Wniosek:** kalkulator był **najbardziej używaną ścieżką lead-intent** na stronie (~25 interakcji, 5 osób go dokończyło w 28 dni) — i największym pojedynczym źródłem mierzonych zdarzeń kluczowych. Formularz kontaktowy, na który teraz spływa cały lejek, ma historycznie **niską finalizację (contact_submit = 1/28 dni)**. Usunięcie kalkulatora zabiera najbardziej aktywny element mid-funnel i przenosi wszystko na ścieżkę o niskiej konwersji.

Zastrzeżenie: `contact_submit` w GA4 jest niedomierzony (zależny od zgody na baner), a realne zapytania trafiają na `marcin@szabunia.pl` (Marcin potwierdzał, że dochodzą) — więc liczba realnych leadów z formularza może być wyższa niż 1. Kierunek jednak jest jasny: mierzalny sygnał konwersji właśnie zmalał.

---

## 4. Rekomendacje

1. **Ads — odpiąć martwy cel „Prośby o wycenę"** z kampanii (albo zostawić — nieszkodliwy). Upewnić się, że kampania celuje w `contact_submit` (cel Kontakt). NIE przechodzić na Max Conversions.
2. **Okno obserwacji 3–4 tyg. (do ~połowy sierpnia):** śledzić `contact_submit`, `contact_form_started`, `phone_click`, `email_click` — czy formularz + telefon przejmą wolumen po kalkulatorze. To jest test hipotezy „mniej, ale lepszej jakości leadów".
3. **Rozważyć lekki hook „wstępna wycena/kalkulacja"** na /kontakt lub w kartach usług, żeby odzyskać część mid-funnel capture, którą dawał kalkulator (decyzja treściowa Marcina — nie wdrażać bez zgody).
4. **SEO — bez akcji.** Redirect czysty; przy kolejnym audycie sprawdzić, czy indeks spadł do ~45 (kalkulator w „przekierowaniach") — to normalne, nie błąd.
5. **Kontekst strategiczny (bez relitygacji decyzji):** to model „ceny na zapytanie", który wcześniejsza niezależna analiza (`ANALIZA-CENNIK-UKLAD-2026-07-06.md`) odradzała przy młodej marce + zimnym ruchu reklamowym + bardzo niskim wolumenie. Decyzja należy do Marcina — ważne tylko, by traktować to jako **eksperyment z oknem obserwacji** (pkt 2), a nie cichą, nieodwracalną zmianę. Jeśli w 3–4 tyg. leady z formularza nie wzrosną, wariant pośredni (zakres cenowy zamiast pełnego ukrycia) zostaje na stole.

---

*Nota: pliki „AUDYT-2026-07-23" i „PLAN-POPRAWEK-2026-07-23" przemianowane 2026-07-23 (wcześniej „…-07-20" — nazwa zakotwiczona na dacie checkpointu Ads „~20.07"; audyt realnie wykonany 2026-07-23).*

*Re-audyt 2026-07-23 przez Claude (orchestrator). Dane na żywo, odczyt bez zmian w kontach.*
