# Audyt Google Ads — okres 6.06–5.07.2026

Konto 786-864-4697 · kampania "Pierwsza pro kampania" (Search, 25 zł/dz., Maksymalizuj kliknięcia, 500 km od Poznania).
Źródło: 14 eksportów CSV z panelu (kampanie, słowa, wyszukiwania, seria czasowa, dni/godziny, urządzenia, demografia, zmiany M/M, wynik optymalizacji) + kontekst poprzedniego audytu (`AUDYT-GOOGLE-ADS-2026-06-11.md`).

## 0. Bilans okresu

| Metryka | Wartość |
|---|---|
| Koszt | 496,49 zł (66% możliwego budżetu 750 zł) |
| Kliknięcia | 102 · CTR 5,67% · śr. CPC 4,87 zł |
| Wyświetlenia | 1,8 tys. |
| **Konwersje** | **0,00** (kolumna konwersji w hasłach: same zera) |
| Wynik optymalizacji | 97% (metryka Google — nie utożsamiać z jakością) |

Restrukturyzacja z 10–11.06 dała zamierzony efekt strukturalny: grupy Fotografia produktowa (79,80 zł/12 klik.) i Eventy (65,50 zł/12 klik.) ożyły z zera, Portrety spadły z 276→78 klik. (koniec monopolu jednej grupy). **Sesje zespołowe: 0 wydatku — grupa martwa** (frazy "Mała liczba wyszukiwań").

## 1. NAJWAŻNIEJSZE: inflacja CPC ×3,5 (P0)

CPC tygodniowo z serii czasowej:

| Tydzień | Kliknięcia | Koszt | CPC |
|---|---|---|---|
| 6–12.06 | 40 | 114,42 zł | **2,86 zł** |
| 13–19.06 | 20 | 103,04 zł | 5,15 zł |
| 20–26.06 | 28 | 137,35 zł | 4,91 zł |
| 27.06–3.07 | 14 | 141,67 zł | **10,12 zł** |

Mechanizm: 61% wydatku okna (301,75 zł / 78 klik., CPC 3,87 zł) poszło na szerokie frazy, które w trakcie restrukturyzacji USUNIĘTO. Pozostały mix exact/phrase o małym wolumenie płaci CPC 8,11 zł (2,1× drożej), a strategia "Maksymalizuj kliknięcia" **bez limitu stawki** dobija do coraz droższych aukcji, żeby wydać budżet. Ostatni tydzień: 14 kliknięć za 142 zł.

**Rekomendacja:** ustawić **limit maks. CPC w strategii ustalania stawek: 5,00 zł** (Ustawienia kampanii → Określanie stawek → Maksymalizuj kliknięcia → limit maks. CPC). Odwracalne w każdej chwili. Trade-off: "sesja biznesowa poznań" (exact, CTR 21%, CPC 9,39 zł) straci część górnych pozycji — świadomie: lepiej 2× więcej kliknięć po 5 zł niż top na jednej frazie bez ani jednej konwersji.

## 2. Zero konwersji za 496 zł (P0 — diagnostyka, nie panika)

Żadne kliknięcie w oknie nie zakończyło się konwersją (contact_submit / generate_lead / calculator_done "Prośba o wycenę").

Zastrzeżenia pomiarowe: do 11.06 consent mode blokował ad_storage (brak atrybucji GCLID) — naprawione i zdeployowane 11.06; konwersje wymagają też kliknięcia "Akceptuję" na banerze. Część okna jest więc niedomierzona, ale GA4 również nie pokazuje fali leadów z Ads — problem jest realny, nie tylko pomiarowy.

**Do sprawdzenia w panelu (5 min):** Cele → Konwersje → czy "szabunia.pl (web) contact_submit" i "generate_lead" mają stan **"Rejestruje konwersje"** (a nie "Nieaktywne"/"Brak ostatnich konwersji" z czerwonym statusem tagu). Jeśli tag martwy → najpierw naprawić pomiar, dopiero potem oceniać kampanię.

## 3. Wycieki budżetu — wykluczenia do dopisania (P1)

Kliknięte śmieci w tym oknie: **21,93 zł** (4,4% budżetu) + zaśmiecony CTR:

- **Nazwiska/brandy konkurentów** (kliknięte: "kolecki poznan" 7,60 zł, "natalia kolodziej" 3,39 zł): dopisać jako wykluczenia dokładne: kolecki, kołodziej, wołyniak, żółtowska, łaszkiewicz, wojtaszek, pastryk, mizerski, marszalstudio, moiz studio, chromatic studio, fxart, headshotmaster, zdjeciebiznesowe, avenida
- **Informacyjne** ("co to jest packshot" 3,47 zł; "jak zrobic...", "prompt na zdjęcie biznesowe", "kurs online"): wykluczyć frazy: "co to jest", "jak zrobić", "jak zrobic", prompt, kurs — część miała być dodana 11.06, hasła nadal wpadają → zweryfikować formę dopasowania istniejących wykluczeń
- **B2C poza ofertą** ("sesje ciążowe poznań" 1,90 zł — kliknięte!; "sesja buduarowa", "sesja na tindera"): ciążowa/ciążowe, buduarowa, tinder — uzupełnienie listy ślubno-rodzinnej z 9.06
- **Inne miasta** ("fotografia biznesowa katowice/wrocław"): katowice, wrocław, warszawa, kraków, gdańsk, szczecin, łódź — promień 500 km łapie zapytania o fotografów TAM, nie stamtąd
- **Punktowe usługi** ("zakład fotograficzny poznań (piątkowo)" 16 wyśw.): zakład fotograficzny

## 4. Hiszpańskie zapytanie = ustawienia języków (P1, 2 min)

"fotos para portada de linkedin" — **5,57 zł za 1 kliknięcie**. Kampania celuje najpewniej we "Wszystkie języki". Zawęzić do **polski + angielski** ("business photoshoot" po angielsku zostaje sensowne dla expatów w Poznaniu).

## 5. Grupa Sesje zespołowe — martwa (P2, decyzja)

0 zł / 0 kliknięć w 30 dni. Opcje: (a) zostawić jako niszę-czujkę (nic nie kosztuje), (b) dołożyć frazy o realnym wolumenie typu "zdjęcia firmowe", "fotograf dla firmy" (ryzyko kanibalizacji z Portretami), (c) przenieść uwagę na grupę produktową — sygnał z haseł: "fotografia produktowa mebli" (2 wyśw.) idealnie gra z case study Forte. Rekomendacja: (a) + obserwacja; żadnych nowych fraz bez potrzeby.

## 6. Obserwacje bez akcji (na teraz)

- **Dni/godziny:** szczyt pon–śr 9–14; wieczory i weekendy ~zero (harmonogram niestandardowy Marcina działa jak zamierzono. Sob. 20–21.06 z ruchem to ślad cofniętych ustawień). Bez konwersji nie ma podstaw do korekt.
- **Urządzenia:** mobile 255 zł/62 klik. (CPC 4,12), desktop 241 zł/40 klik. (CPC 6,03) — mobile efektywniejszy kosztowo; po lipcowym mobile-perfect audycie strona gotowa na ten ruch. Korekty stawek dopiero przy danych konwersji.
- **Demografia:** 25–44 lata = 59% wyświetleń, spójne z targetem B2B. Bez akcji.
- **"fotograf (poznań)":** 227 wyświetleń słowa, 1 kliknięcie, 7,75 zł. Decyzja "zostaje dla widoczności" (11.06) kosztuje na razie głównie CTR, nie pieniądze — bez zmian, odnotowuję koszt decyzji.
- **Budżet 66% wykorzystany** — podnoszenie budżetu przy 0 konwersji nie ma uzasadnienia (zgodne z decyzją: 25 zł/dz. zostaje).

## 7. Plan działań (kolejność wykonania)

| # | Działanie | Gdzie | Kto |
|---|---|---|---|
| 1 | Limit maks. CPC 5 zł | Ustawienia kampanii → Określanie stawek | Claude za zgodą / Marcin |
| 2 | Status działań konwersji ("Rejestruje"?) | Cele → Konwersje | Claude (odczyt) |
| 3 | ~25 wykluczeń z §3 | Słowa kluczowe → Wykluczające | Claude za zgodą |
| 4 | Języki: polski + angielski | Ustawienia kampanii | Claude za zgodą |
| 5 | Kontrola za 2 tyg. (~20.07): CPC po limicie, los sitelinku "Kalkulator wyceny" (wczoraj dodany, w weryfikacji), rozjazd 3 vs 7 sitelinków | panel | wspólnie |

Świadomie NIE ruszamy: budżetu, harmonogramu, frazy "fotograf", strategii stawek na konwersyjną (wymaga ~30 konwersji — jesteśmy na 0).

---

## 8. WYKONANE tego samego wieczora (zgoda Marcina: "Wszystkie 3")

1. ✅ **Limit maks. CPC 5,00 zł** ustawiony w strategii ("Zapisano strategię") — wcześniej limitu NIE było (checkbox odznaczony)
2. ✅ **Status konwersji sprawdzony:** działania Aktywne, tag żyje; w oknie 1 Kontakt + 1 Prośba o wycenę (najpewniej testy z 11.06). Uwaga: cel "Prośba o wycenę" ma "Kampanie 0 z 1" — niepodpięty do kampanii
3. ✅ **+34 wykluczenia** dodane na poziomie kampanii (nazwiska konkurentów, informacyjne, ciążowe/buduarowe/tinder, 7 miast, "zakład fotograficzny")
4. ⏭️ Języki: bez zmian — kampania już celuje tylko na **polski**; hiszpańskie hasło przeszło, bo Google patrzy na język użytkownika, nie zapytania (nie do zablokowania ustawieniem)

**Kontrola ~20.07:** CPC po limicie (czy wróciło ≤5 zł i czy kliknięcia rosną), status sitelinku "Kalkulator wyceny", rozjazd 3 vs 7 sitelinków.

*Raport wygenerowany 2026-07-06 przez Claude (orchestrator). Zmiany w koncie wyłącznie za zgodą Marcina.*
