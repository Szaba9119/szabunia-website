# Plan poprawek — po audycie 2026-07-20

Źródło: `AUDYT-2026-07-20.md`. Plan do **późniejszego wykonania** (dziś nic nie ruszam w kontach).
Legenda właściciela: **[M]** decyzja/akcja Marcina · **[C-panel]** Claude w panelu na żywo za zgodą Marcina · **[C-code]** zadanie dla Claude Code w repo (brief + stop-conditions).
Kolejność = priorytet wpływu na leady.

---

## P0 — Google Ads (szybkie, w panelu)

### P0.1 — Limit CPC: decyzja + wykonanie  `[M decyzja → C-panel]`
**Kontekst:** limit 5 zł zdławił zasięg (wyświetlenia −22%, budżet ~48%), a realny CPC i tak ~6 zł. Kliknięcia płasko.
**Do wyboru (rekom. A lub D, NIE B):**
- **A. Podnieś limit do 7 zł** — Ustawienia kampanii → Określanie stawek → Maksymalizuj kliknięcia → limit maks. CPC = 7,00 zł. Odwracalne. Kontrola za 2 tyg.: czy wyświetlenia/kliknięcia rosną.
- **D. Zostaw 5 zł + dorzuć tanie, trafne frazy** — patrz P0.3.
- C. Zostaw 5 zł bez zmian (świadomy limit kosztu). B. Zdejmij limit (odradzam — ryzyko inflacji do 10 zł jak w czerwcu).
**Kryterium sukcesu:** po 14 dniach więcej kliknięć niż 28/okno przy koszcie ≤ budżet.
**Stop:** zmiana stawki = akcja w koncie → wykonuję dopiero po wyborze Marcina.

### P0.2 — Podpiąć cel „Prośba o wycenę" do kampanii  `[C-panel]` (rekomendowane)
**Kontekst:** cel pokazuje „0 z 1" (odpięty) — kampania nie liczy leadów z kalkulatora (jedyne historycznie odpalane źródło leada). Regres względem 8.07.
**Kroki:** Ustawienia kampanii → Cele konwersji → dodać „Prośby o wycenę" do zestawu celów kampanii.
**Kryterium:** notka „0 z 1" znika; konwersje kalkulatora liczą się kampanii.
**Uwaga:** NIE zmieniać strategii na „Maksymalizuj konwersje" (rekomendacja Google wisi — skasuje limit CPC; potrzeba ~30 konwersji, mamy 0).

### P0.3 — (jeśli opcja D) Rozszerzyć tanie, trafne frazy  `[C-panel]`
**Kandydaci do weryfikacji wolumenu przed dodaniem** (phrase/exact, dopasowane do podstron):
- Produktowe (case Forte/Artech): „packshot mebli", „zdjęcia produktowe do sklepu", „fotografia produktowa do katalogu", „zdjęcia na białym tle".
- Eventowe: „fotograf na konferencję poznań", „obsługa foto eventu firmowego", „reportaż z targów poznań".
- Zespołowe/wizerunek: „zdjęcia zespołu do firmy", „headshoty na linkedin poznań", „sesja wizerunkowa dla firm poznań".
**Kryterium:** grupy produktowa/eventowa/zespołowa dostają wolumen; zero nowych śmieci (utrzymać listę wykluczeń).

---

## P1 — SEO: budowa linków zewnętrznych (główny hamulec, 0 backlinków)

Indeksacja rozwiązana (46/50) — teraz brakuje **autorytetu**. Marcin odrzucił cold-outreach mailem po linki → skupiamy się na katalogach i naturalnych cytowaniach.

### P1.1 — Wpisać firmę do darmowych katalogów NAP  `[M + C-panel asysta]`
**Kontekst:** konkurenci są w katalogach, Marcina nie ma (Panorama Firm, Cylex, Aleo, Yellow Pages). To pierwsze cytowania NAP i pierwsze linki.
**Shortlist (darmowe):** Panorama Firm, Cylex Polska, Aleo (uwaga: ciągnie adres z KRS/REGON — firma obszarowa bez adresu), Yellow Pages (import z GBP), Katalog Fotograficzny, Znany Fotograf.
**Dane NAP 1:1 (spójność krytyczna):** nazwa „Marcin Szabunia Fotograf Biznesowy" · tel. 514 900 688 · [email protected] · szabunia.pl · Instagram szabunia.biz · obszar Poznań i okolice (BEZ adresu ulicznego).
**Podział pracy (ograniczenia):** zakładania kont i wpisywania danych logowania **nie robię** — to po stronie Marcina. Mogę asystować na żywo przy wypełnianiu pól formularza (za zgodą, klik-po-kliku) tam, gdzie nie trzeba zakładać konta/podawać haseł.
**Kryterium:** min. 3 katalogi z aktywnym wpisem + linkiem do szabunia.pl w ciągu 2 tyg.

### P1.2 — (niski priorytet) Dokończyć indeksację ostatnich stron  `[C-panel]`
Indeksacja ~pełna (46/50). Jeśli zostały pojedyncze wpisy bloga poza indeksem — zgłosić przez „Sprawdź URL → Poproś o zindeksowanie" (limit ~8/dzień). Efekt marginalny — robić tylko przy okazji.

---

## P2 — Wizytówka Google (świeżość wyhamowała)

### P2.1 — Wznowić rytm wpisów GBP  `[M materiał → C-panel]`
**Kontekst:** ostatni wpis ~6.07, brak nowych od 2 tyg. Box17/IDcom wcześniej odrzucone — potrzebny inny materiał.
**Propozycja:** 1 wpis usługowy (np. „Sesje wizerunkowe/LinkedIn — wolne terminy w Poznaniu" z CTA do /uslugi/wizerunek-portrety) lub nowy case, gdy będzie gotowy. Cel: 1 wpis / 2 tyg.
**Stop:** treść wpisu do akceptacji Marcina przed publikacją.

### P2.2 — Poprosić o opinie klientów dostarczonych bez prośby  `[M]`
**Kontekst:** opinie stoją na 10/5,0 od ~1.07. To NIE cold-outreach — to realni klienci (link `g.page/r/CcGxT8A_KfJREBM/review`).
**Kandydaci z CRM (dostarczeni bez prośby o opinię):** Wódzki (PROFESSIONAL, opłacony 7.06), Jadczak (ESSENTIAL, 18.05) — zweryfikować w CRM aktualną listę „Dostarczony bez opinii".
**Kryterium:** opinie > 10.

### P2.3 — Ujednolicić godziny GBP ↔ strona  `[M decyzja → C-panel + C-code]`
**Kontekst:** GBP Pn–Sb (zamk. 19:00) vs strona/JSON-LD Pn–Pt 9–18 — niespójność NAP.
**Kroki:** Marcin podaje realne godziny → poprawić w GBP (panel) **oraz** w JSON-LD `openingHoursSpecification` w `src/app/layout.tsx`.
**Stop:** edycja JSON-LD w `layout.tsx` = stop-condition z CLAUDE.md §11 — osobny brief dla Claude Code po decyzji Marcina.

---

## Czego NIE robimy (świadomie)
- Nie zmieniamy strategii Ads na „Maksymalizuj konwersje" (kasuje limit CPC; 0 konwersji).
- Nie wysyłamy cold-maili po linki (decyzja Marcina z 6.07).
- Nie ruszamy budżetu (25 zł/dz.), harmonogramu ani frazy „fotograf" (świadome koszty widoczności).
- Nie usuwamy starej domeny marcinszabunia.pl przed ~grudniem 2026.

## Sugerowana kolejność wykonania
1. P0.2 (podpiąć cel — 5 min, zero ryzyka) → 2. P0.1 (decyzja limitu) → 3. P2.2 (opinie — darmowe, szybkie) → 4. P1.1 (katalogi) → 5. P2.1 (wpis GBP) → 6. P2.3 (godziny) → 7. P0.3/P1.2 (opcjonalne).

*Plan wygenerowany 2026-07-20 przez Claude (orchestrator). Wykonanie po decyzjach Marcina; zmiany w kontach/kodzie wyłącznie za zgodą.*
