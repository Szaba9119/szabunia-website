# Audyt Google Ads — 11 czerwca 2026

Konto: **786-864-4697** (marcin.szabunia@gmail.com). Okres analizy: **13.03–11.06.2026 (90 dni)**.
Wykonanie: sesja Chrome na żywo w panelu Google Ads + weryfikacja landing pages + ground truth leadów z Gmaila.
Plan audytu: `PLAN-AUDYT-GOOGLE-ADS-2026-06-11.md`. Audyt jest diagnostyczny — **żadne zmiany w koncie nie zostały wykonane**.

---

## 1. Podsumowanie wykonawcze

Konto przez 90 dni wydało **1 453,50 zł** (1 029 kliknięć, CPC 1,41 zł, CTR 6,65%) i wygenerowało **0 zmierzonych leadów z nowej strony**. 4 konwersje widoczne w statystykach pochodzą z celów starej usługi GA4 (Adobe) i są to najpewniej wczytania strony, nie leady. Restrukturyzacja z 10.06 (4 grupy per usługa) jest założona poprawnie, ale **3 z 4 grup są martwe**, a pomiar konwersji nadal wisi na starej, nieaktywnej infrastrukturze.

| # | Priorytet | Problem | Wpływ |
|---|-----------|---------|-------|
| 1 | **P0** | **Pomiar konwersji de facto nie działa.** Główna konwersja konta `SUBMIT_LEAD_FORM` pochodzi z usługi GA4 **Adobe marcinszabunia.pl** (stara strona, już przekierowana — zdarzenie nigdy więcej nie wystąpi). Z nowej usługi szabunia.pl zaimportowano tylko `calculator_done`. **Brak importu wysłania formularza i lead magnetu z szabunia.pl.** | Kampania optymalizuje się do celów, które fizycznie nie mogą wystąpić; brak danych do oceny ROI |
| 2 | **P0** | **Tag Google (AW-10851743628, "Untitled tag") przestał wysyłać dane** — niewykryty od 48h+ (alert "PILNE" w Menedżerze danych). Prawdopodobnie był tylko na starej stronie Adobe. | Konwersje tagowane przez Ads i remarketing nie działają |
| 3 | **P1** | **Wydatki niemal stanęły ~połowa maja**: ostatnie 30 dni = 77 wyśw., 7 kliknięć, 22,60 zł (vs 15 476 wyśw. / 1 453 zł w 90 dni), mimo statusu "Ograniczona z powodu budżetu". W grupie Portrety 2 z 3 reklam wstrzymane (Ad Strength "Oczekująca"). | Kampania praktycznie nie działa — przyczyna do wyjaśnienia |
| 4 | **P1** | **3 z 4 grup reklam są martwe** (90 dni): Fotografia produktowa 10 wyśw. / 3,47 zł, Eventy i reportaże 2 wyśw., Sesje zespołowe 0 wyśw. Portrety i wizerunek pochłonęły **99,8% kosztu**. Słowa w nowych grupach to wąskie frazy, w większości "Mała liczba wyszukiwań" / "Nieodpowiednia". | Restrukturyzacja istnieje na papierze, nie w wydatkach |
| 5 | **P1** | **92% budżetu 90 dni (1 343,26 zł / 969 kliknięć) trafiło na starą domenę marcinszabunia.pl** jako stronę docelową. Łagodzi to fakt, że domena obecnie przekierowuje na szabunia.pl (sprawdzone 11.06 — działa, P0 ze starego audytu strony domknięte), ale przez większość okresu ruch lądował na starej stronie Adobe. | Budżet budował starą markę; konwersje niemierzalne |
| 6 | **P2** | **Bałagan w działaniach konwersji: 22 pozycje**, w tym relikty UA ("Usunięta", a wciąż "Uwzględnione w celach konta: Tak"), cele kampanii inteligentnych (Mapy, połączenia), duble "Kontakt (marcinszabunia.pl/contact)" ×2, zdarzenie `generate_lead` zmapowane jako… "Wyświetlenie strony". | Szum w raportach, ryzyko błędnej optymalizacji |
| 7 | **P2** | **Luki w wykluczeniach** — lista wykluczeń jest obszerna i dobra (dzielnice, dokumenty/paszport, konkurenci — większość odcięta), ale wciąż przeciekają: `fotograf` (generyczne, 87,57 zł!), dzielnicowe bez wykluczenia (wilda, winogrady, wichrowe wzgórze, orle gniazdo, słowiańska, plac wolności), nazwiska konkurentów (kolecki 7,60 zł, natalia kolodziej, marta grabowska, fototwins), `studio fotograficzne wynajem`, `sesja zdjęciowa dla par`. | Kilkadziesiąt zł / 90 dni + brudny ruch |

**Wniosek nadrzędny:** zanim kampania dostanie złotówkę więcej, musi działać pomiar (poz. 1–2). Przy 1 029 kliknięciach Gmail pokazuje ~10 leadów w 90 dniach — wszystkie przez formularz **starej** strony, bez atrybucji do Ads. Nie wiadomo, czy Ads przyniósł cokolwiek.

---

## 2. Konwersje i śledzenie (§2.4 planu)

**Działania powodujące konwersję: 22, wszystkie z 0 konwersji w oknie 90 dni** (4 konwersje na poziomie konta przypisane do reklamy z okresu sprzed wstrzymania — patrz §4).

Stan kluczowych pozycji:

| Działanie | Źródło | Optymalizacja | W celach konta | Problem |
|---|---|---|---|---|
| SUBMIT_LEAD_FORM | GA4 — **Adobe marcinszabunia.pl** | Podstawowe (główne) | **Tak** | Usługa martwa po przekierowaniu domeny |
| szabunia.pl (web) calculator_done | GA4 — szabunia.pl | Podstawowe | Tak | OK — jedyny żywy cel |
| Strona z danymi kontaktowymi | **UA** (Universal Analytics!) | Podstawowe | **Tak** | Usunięta, a wciąż w celach konta |
| Kontakt (marcinszabunia.pl/contact) ×2 | GA4 Adobe | Dodatkowe | Nie | Dubel, martwe |
| tel_click, mailto_click, form_submit, ads_conversion_… | GA4 Adobe | Dodatkowe | Nie | Martwe |
| Calls from ads / Smart Campaign, Mapy, Local actions ×6, Business profile ×2 | Reliki kampanii inteligentnej | Podstawowe | Nie/Tak | Szum |
| Wyświetlenie strony (zdarzenie GA `generate_lead`) | GA4 | Podstawowe | Nie | `generate_lead` zmapowany jako page view |

**Połączone usługi:** GA4 ×2 — **szabunia.pl (540982486, połączona 10.06.2026)** ✓ i Adobe marcinszabunia.pl (352520287, z 27.07.2023 — do odłączenia). Google Business Profile ✓. **Auto-tagging: włączony** ✓.

**Tag Google AW-10851743628 ("Untitled tag")**: diagnostyka "Pilne — tag przestał wysyłać dane, niewykryty w ciągu 48h". Na szabunia.pl działa GA4 (G-…), ale tag Ads najpewniej nigdy nie został tam wdrożony (był na stronie Adobe).

**Ground truth z Gmaila (90 dni):** ~10 leadów przez formularz Adobe (`noreply-behance@behance.com`), ostatni 26.05; nowy formularz (Resend) — 0 leadów, 1 test lead magnetu 10.06. Żaden lead nie ma atrybucji do Ads.

---

## 3. Struktura konta i kampanii (§2.1)

- **1 kampania**: "Pierwsza pro kampania" (Search, start 5.02.2025), budżet **25 zł/dz.**, strategia **Maksymalizuj liczbę kliknięć**, status "Ograniczona z powodu budżetu", wynik optymalizacji 99,5%.
- Ustawienia: sieć — tylko wyszukiwarka Google ✓; język polski ✓; lokalizacja **Poznan** ✓; **harmonogram niestandardowy** (na wykresie regularne dni zerowe — do potwierdzenia, czy wyłączone weekendy są zamierzone); urządzenia: wszystkie; rotacja: optymalizuj.
- Cele konwersji kampanii: "Kontakty, Połączenia telefoniczne + 1" — czyli **w dużej mierze martwe cele z §2**.
- 90 dni: 15 476 wyśw. / 1 029 kliknięć / 1 453,50 zł. **Ostatnie 30 dni: 77 wyśw. / 7 kliknięć / 22,60 zł** — kampania od ok. połowy maja realnie nie emituje. Hipotezy: wstrzymanie 2 z 3 reklam w Portrety (jedyna aktywna czeka/przeszła weryfikację), spadek pokrycia po wykluczeniach, lub zewnętrzna blokada (płatności/weryfikacja reklamodawcy — w koncie wisi alert bezpieczeństwa). **Do wyjaśnienia w pierwszej kolejności po naprawie pomiaru.**

Grupy reklam (90 dni):

| Grupa | Wyśw. | Koszt | Komentarz |
|---|---|---|---|
| Portrety i wizerunek | 15 464 | 1 450,03 zł | 99,8% kosztu; zawiera też wszystkie stare słowa produktowe/eventowe (wstrzymane) |
| Fotografia produktowa | 10 | 3,47 zł | 8 fraz, status OK, brak ruchu |
| Eventy i reportaże | 2 | 0,00 zł | 8 fraz, część "Mała liczba wyszukiwań" |
| Sesje zespołowe | 0 | 0,00 zł | 6 fraz, prawie wszystkie "Nieodpowiednia / Mała liczba wyszukiwań" |

---

## 4. Słowa kluczowe i wyszukiwane hasła (§2.2)

**82 słowa kluczowe** (włączone+wstrzymane). Problemy strukturalne:

1. **Niemal wszystkie słowa siedzą w Portrety i wizerunek** — w tym wstrzymane frazy produktowe i eventowe (relikty sprzed restrukturyzacji). Nowe grupy mają po 6–8 wąskich fraz.
2. **Wydatek niesie broad match na generykach**: `poznań fotograf` (155,81 zł), `fotografia biznesowa` (57,46 zł), `sesja zdjęciowa poznań` (62,65 zł) — frazy o intencji mieszanej B2C/B2B, 0 konwersji.
3. **Niski Quality Score** na kilku frazach ("Rzadko wyświetlane — niski wynik jakości"): `"fotograf poznań"`, `sesja biznesowa`, `zakład fotograficzny poznań`, `zdjęcia biznesowe`, `fotograf Poznań`.
4. Frazy nowych grup w większości **"Mała liczba wyszukiwań"** — za wąskie, by kiedykolwiek wystartować (np. `[sesje zespołowe]`, `"headshoty dla firm"`, `"fotograf na galę"`).
5. W oknie 90 dni **aktywne+wstrzymane słowa odpowiadają tylko za 364 zł z 1 453 zł** — większość kosztu poniosły słowa już usunięte (stara struktura). 4 konwersje konta przypadły na usunięte słowa / starą reklamę.

**Wyszukiwane hasła: 683** (widoczne 498 kliknięć / 687,49 zł; reszta ukryta jako rzadkie). Wzorce marnotrawstwa i stan wykluczeń:

- ✅ Już wykluczone (dobra robota): dzielnice (jeżyce, rataje, piątkowo, dębiec, grunwald…), `zdjęcia do dokumentów/paszportu`, `fotograf near me`, część konkurentów (paweł wojtaszek, fotopietura, foto kopernik), `studio fotograficzne poznań`, `sesja kobieca`, cyrylica.
- ❌ **Kandydaci do wykluczenia (z kosztem 90 dni):** `fotograf` jako samodzielne hasło generyczne (87,57 zł — największy pojedynczy koszt konta!), `fotograf wilda`/`wilda poznań` (8,85 zł), `fotograf wichrowe wzgórze` (7,35 zł), `kolecki poznan` (7,60 zł), `fotograf ul libelta` (6,13 zł), `fotograf orle gniazdo` (5,46 zł), `fotograf winogrady` (2,66+3,27 zł), `fotograf słowiańska` (2,29 zł), `plac wolności fotograf` (3,30 zł), `studio fotograficzne wynajem` (×3 ≈ 7,4 zł), `sesja zdjęciowa dla par` (1,99 zł), nazwiska: `natalia kolodziej`, `marta grabowska`, `fototwins`, `katarzyna wołyniak`, `karolina majsner`; informacyjne `co to jest packshot` (3,47 zł — jest na to artykuł na blogu, nie reklama).
- Hasła dzielnicowe wskazują, że broad match `poznań fotograf` łapie **lokalny ruch B2C (zdjęcia "pod domem")** — to strukturalny problem dopasowania przybliżonego przy tym budżecie.

---

## 5. Reklamy i Ad Strength (§2.3)

6 RSA (wszystkie wyświetlany URL `www.szabunia.pl` ✓, brak reliktów starej domeny w treściach ✓):

| Grupa | Reklama | Stan | Ad Strength | 90 dni |
|---|---|---|---|---|
| Portrety | "Sesje Biznesowe Poznań…" | Aktywna | **Świetna** | 318 klik., 482,93 zł, **4 konw.** |
| Portrety | "Sesja biznesowa… Zdjęcia Eventowe" | Wstrzymana | Oczekująca | 446 klik., 610,90 zł (relikt) |
| Portrety | "Zdjęcia Produktowe Poznań…" | Wstrzymana | Oczekująca | 264 klik., 356,21 zł (relikt — treść produktowa w grupie portretowej) |
| Fotografia produktowa | "Fotograf Produktowy Poznań…" | Aktywna | Dobra | 1 klik. |
| Eventy i reportaże | "Fotograf Eventowy Poznań…" | Aktywna | **Średnia** | 0 klik. |
| Sesje zespołowe | "Fotograf Firmowy Poznań…" | Aktywna | **Średnia** | 0 klik. |

Zgodność deklaracji z cennikiem na stronie (sprawdzone na live):
- "Packshoty od 55 zł za sztukę" ✓ (50+ szt. = 55 zł/szt.; mniejsze partie 70–90 zł — "od" jest poprawne).
- "Pakiety foto i wideo z ujęciami z drona w cenie" (reklama Eventy) — **częściowo**: dron w cenie tylko w pakietach hybrydowych Foto+Wideo; w cenniku godzinowym Eventy & Reportaże dron to **+500 zł**. Klauzula do doprecyzowania lub kierowanie tej obietnicy na stronę pakietów hybrydowych.
- Komponenty (sitelinki, objaśnienia, wywołania): **nie zweryfikowano w tej sesji** — do uzupełnienia (panel Komponenty).

---

## 6. Landing pages (§2.5)

Strony docelowe 90 dni:

| URL | Kliknięcia | Koszt | Uwagi |
|---|---|---|---|
| https://marcinszabunia.pl (+ /contact, autowybrane) | **993** | **1 376,15 zł** | Stara domena — 92% budżetu okresu |
| https://szabunia.pl/uslugi/wizerunek-portrety | 11 | 37,88 zł | Nowa struktura (od 10.06) ✓ |
| /kontakt, /uslugi/fotografia-produktowa, /kalkulator, /uslugi/eventy-reportaze, /uslugi/sesje-zespolowe, /portfolio | 2 | 7,27 zł | Mapowanie grupa→podstrona usługi poprawne ✓ |

Weryfikacja techniczna (11.06): `szabunia.pl/uslugi/wizerunek-portrety` — 200, pełny cennik (ESSENTIAL 1 000 zł ✓), formularz, CTA, FAQ — **message match z reklamą "Świetna" jest dobry**. `marcinszabunia.pl` — **przekierowuje na szabunia.pl** ✓ (P0 ze `AUDYT-2026-06-09.md` domknięte; kliknięcia w stare URL-e nie przepadają).

Drobiazg porządkowy: w widoku "Wyszukiwane hasła" wisiał zapisany filtr "Grupa reklam 1" (nieistniejąca grupa), przez co raport wyglądał na pusty — usunąłem filtr z widoku na czas audytu.

---

## 7. Rekomendacje — kolejność wdrożenia

1. **(P0) Napraw pomiar:** w GA4 szabunia.pl oznacz jako kluczowe zdarzenia wysłanie formularza i pobranie lead magnetu → zaimportuj je do Ads jako **główne** działania konwersji (obok `calculator_done`). Zdegraduj/usuń `SUBMIT_LEAD_FORM` (Adobe) i relikt UA z celów konta.
2. **(P0) Test end-to-end:** wyślij testowy formularz na szabunia.pl → potwierdź zdarzenie w GA4 (DebugView) → potwierdź status "Rejestruje konwersje" w Ads.
3. **(P1) Wyjaśnij zapaść emisji od połowy maja** (płatności/weryfikacja/reklamy wstrzymane) — dopiero potem decyzje budżetowe.
4. **(P1) Wykluczenia:** dodaj listę z §4 (na poziomie kampanii). Rozważ wykluczenie samodzielnego hasła `fotograf` jako dokładnego wykluczenia frazowego.
5. **(P1) Reanimacja 3 grup:** poszerz frazy (np. `zdjęcia produktowe poznań` przybliżone z dobrym wykluczaniem, `fotograf konferencyjny`, `zdjęcia pracowników firma`), przenieś wstrzymane frazy produktowe/eventowe z Portrety do właściwych grup albo usuń. Rozważ podział budżetu lub osobną kampanię, bo Portrety zawsze zje wspólny budżet.
6. **(P2) Porządki:** usuń/zarchiwizuj martwe działania konwersji (docelowo 3–4 żywe), odłącz usługę GA4 Adobe, popraw mapowanie `generate_lead`, podnieś Ad Strength w Eventy/Sesje (Średnia → Dobra: więcej nagłówków, frazy kluczowe w nagłówkach), doprecyzuj "dron w cenie", uzupełnij komponenty (sitelinki do /kalkulator, /portfolio, /poradnik).
7. **(P2) Po naprawie pomiaru i ~30 konwersjach:** zmiana strategii z Maksymalizuj kliknięcia na Maksymalizuj konwersje.

---

## 8. Decyzje dla Marcina (stop-conditions)

1. Czy harmonogram niestandardowy (przerwy emisji, prawdopodobnie weekendy) jest zamierzony?
2. Budżet 25 zł/dz. przy "Ograniczona budżetem" — zostawić, podnieść, czy najpierw wyczyścić targetowanie? (rekomendacja: najpierw pomiar i wykluczenia, potem decyzja).
3. Wykluczenie generycznego `fotograf` ogranicza zasięg broad match — akceptujesz świadomie mniejszy wolumen za czystszy ruch?
4. Czy "ujęcia z drona w cenie" w reklamie Eventy zostawiamy (kierując na pakiety hybrydowe), czy usuwamy z treści?
5. Odłączenie starej usługi GA4 Adobe (352520287) od Ads — potwierdź, że nic z niej już nie potrzebujesz.

---

*Audyt wykonany 11.06.2026 przez Claude (sesja Chrome + Gmail ground truth). Dane: panel Google Ads, zakres 13.03–11.06.2026.*
