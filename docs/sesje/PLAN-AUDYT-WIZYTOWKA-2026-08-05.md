# Plan audytu WIZYTÓWKA GOOGLE — 5 sierpnia 2026

Audytujemy Profil Firmy w Google marki szabunia.pl (Marcin Szabunia, fotograf eventowy
i biznesowy, Poznań) jako osobną powierzchnię sprzedażową, nie jako dodatek do strony.
Dokument planistyczny. Wykonanie: 05.08.2026, tryb autonomiczny.

> **Zastrzeżenie do §1 metodyki.** Plan powinien powstać przed dotknięciem danych. Tu tak nie było:
> pierwszy rzut oka na panel właściciela (który dał liczbę „81 dni" w §2.3) padł przed napisaniem
> tego dokumentu. Odnotowuję odstępstwo zamiast je zacierać — patrz §10.8 raportu.

## 1. Kontekst i założenia

**Stan przedmiotu audytu.** 04.08.2026 wizytówka została przepisana: 11 usług, każda
z jedną kwotą „od", usunięte drabinki cenowe i zwroty „za pierwsze zdjęcie" / „za jedno
ujęcie" (`RAPORT-WIZYTOWKA-I-ZESPOLOWA-2026-08-04.md`). W tej samej sesji przez pomyłkę
dodano i usunięto usługę „Fotografia buduarowa". **05.08.2026 Marcin zmienił model cen
sesji zespołowych** (1 400 zł za dwie osoby + 120 zł za każdą kolejną; progi 180/150/120
wycofane) — wizytówka była przepisywana przed tą zmianą, więc rozjazd jest prawdopodobny,
nie pewny.

**Okno czasowe.** Stan na 05.08.2026. Dane o skuteczności bierzemy w oknie, jakie panel
udostępnia domyślnie.
**Uwaga interpretacyjna:** tych danych nie da się użyć do oceny „czy wizytówka sprzedaje".
Profil zmienił treść 24 godziny temu i część zmian nadal przechodzi moderację; wszystko,
co zobaczymy w Skuteczności, opisuje stan sprzed przepisania. Wniosków przyczynowych
z tego okna nie wyciągamy.

**Źródło danych.**
- Ścieżka A (preferowana): widok właściciela w Chrome — panel „Twoja firma w Google"
  w wynikach wyszukiwania, edycja profilu, usługi, zdjęcia, opinie, Q&A, wpisy, Skuteczność.
- Ścieżka B (zapasowa, zawsze wykonywana dla porównania): widok publiczny w Mapach
  i knowledge panel.

**Punkt odniesienia.** Kanon oferty i cen to repo, nie dokumenty w `docs/`:
`src/data/services.tsx` (kotwice), `public/llms.txt` (siatka usług), `src/app/layout.tsx`
(JSON-LD: telefon, godziny, `sameAs`, geo). CLAUDE.md §9 rozstrzyga, które liczby są aktualne.

**Ground truth spoza audytowanego systemu.** Metryki Google (kompletność profilu,
liczba interakcji, podpowiedzi „dodaj to i to") są danymi audytowanego systemu i nie
służą jako ocena. Niezależne sygnały: obecność w local pack na frazy usługowe sprawdzona
na żywo, wpisy w agregatorach (maptons, polomap) jako ślad starego NAP, treść repo.

## 2. Zakres (8 modułów)

### 2.1 Tożsamość i NAP
- [ ] nazwa profilu — dokładne brzmienie vs `name` w JSON-LD i vs zasady Google (bez keyword stuffing)
- [ ] kategoria główna + kategorie dodatkowe, komplet i kolejność
- [ ] adres vs obszar działania (profil usługowy bez adresu) — co widzi klient
- [ ] telefon, e-mail, adres strony WWW
- [ ] godziny otwarcia vs `openingHoursSpecification` (pon–pt 08–20, sob 10–16, nd zamknięte)
- [ ] atrybuty profilu (płatności, dostępność, „obsługa online" itp.)
- [ ] ślady starego NAP w agregatorach (Garbary 51 vs Skoczowska 4) — źródło i skutek

### 2.2 Opis firmy i opisy usług
- [ ] opis firmy: długość, pierwsze 100 znaków (to widać przed „więcej"), fraza usługowa, claim „1000+ sesji"
- [ ] 11 usług: nazwa, cena „od", opis — 1:1 z tabelą z 04.08
- [ ] zgodność kwot z `services.tsx` i `llms.txt` po zmianie z 05.08 (sesja zespołowa)
- [ ] zakazane zwroty („za pierwsze zdjęcie", „za jedno ujęcie", drabinki, ekspres +50%)
- [ ] ślad po „Fotografii buduarowej"
- [ ] usługi, których w profilu nie ma, a są w ofercie (i odwrotnie)

### 2.3 Zdjęcia i wideo
- [ ] liczba zdjęć, data ostatniego dodania (panel podaje „81 dni temu" — zweryfikować)
- [ ] zdjęcie profilowe i okładka — czy to najmocniejsze kadry B2B
- [ ] kategorie zdjęć (wnętrze / zespół / praca) i przypisanie do usług
- [ ] zdjęcia dodane przez klientów vs przez właściciela
- [ ] czy portfolio na wizytówce pokrywa te same segmenty co strona (eventy, portrety, dron, produkt)

### 2.4 Opinie i Q&A
- [ ] liczba opinii, średnia, rozkład ocen, data najnowszej
- [ ] odsetek opinii z odpowiedzią właściciela, jakość odpowiedzi
- [ ] zgodność cytatów opinii na stronie (`Testimonials.tsx`) z treścią w Google
- [ ] link „poproś o opinię" (`g.page/r/CcGxT8A_KfJREBM/review`) — czy żyje
- [ ] Q&A: pytania, odpowiedzi, czy właściciel zadał pytania startowe

### 2.5 Wpisy, oferty, rezerwacje, wiadomości
- [ ] wpisy (posty): liczba, data ostatniego, czy w ogóle używane
- [ ] oferta / promocja
- [ ] rezerwacje i wiadomości (czat) — włączone czy nie, i czy to dobrze
- [ ] produkty

### 2.6 Spójność wizytówka ↔ strona ↔ JSON-LD
- [ ] telefon, e-mail, godziny, nazwa, obszar działania
- [ ] ceny i nazwy usług
- [ ] `sameAs` z kgmid `/g/11rcwdrdcl` — czy wskazuje na tę encję
- [ ] link ze strony do wizytówki i z wizytówki na stronę — kierunki i miejsca

### 2.7 Widoczność lokalna
- [ ] local pack na frazy usługowe („fotograf eventowy Poznań", „zdjęcia biznesowe Poznań",
      „fotograf produktowy Poznań", „dron Poznań") — czy profil w ogóle wchodzi
- [ ] kategorie i liczba opinii konkurentów, którzy wchodzą
- [ ] czy nazwa profilu i kategoria odpowiadają frazom, na których Marcinowi zależy

### 2.8 Pomiar
- [ ] UTM w linku do strony w profilu
- [ ] czy ruch z GBP da się rozdzielić od organic w GA4
- [ ] telefon w profilu vs numer używany w Ads (spójność atrybucji)
- [ ] Skuteczność: wyświetlenia, wyszukiwania, kliknięcia — jako dane, nie ocena

## 3. Dane do zebrania

| # | Panel / źródło | Zakres | Ścieżka |
|---|---|---|---|
| 1 | Panel właściciela w SERP | stan na dziś | Chrome, konto Marcina |
| 2 | Edycja profilu (bez zapisu) | wszystkie pola | Chrome |
| 3 | Usługi | 11 pozycji + ceny | Chrome |
| 4 | Zdjęcia, opinie, Q&A, wpisy | pełne listy | Chrome |
| 5 | Skuteczność | domyślne okno | Chrome |
| 6 | Widok publiczny (Mapy) | stan na dziś | Chrome, ten sam profil |
| 7 | Local pack, 4 frazy | stan na dziś | Chrome |
| 8 | Repo | HEAD | `services.tsx`, `llms.txt`, `layout.tsx`, `Testimonials.tsx` |

## 4. Kolejność wykonania

1. Widok właściciela — **bo** określa, co w ogóle da się sprawdzić i które pola istnieją.
2. Usługi i opis — **bo** tu jest najświeższa zmiana i najbardziej prawdopodobny rozjazd ceny.
3. Zdjęcia, opinie, Q&A, wpisy — **bo** to sygnały świeżości, mierzalne datami.
4. Widok publiczny i local pack — **bo** dopiero po znajomości profilu widać, czego klient nie dostaje.
5. Repo — **bo** rozstrzyga spory o kwoty i godziny (§0.2 metodyki: kod wygrywa).
6. Raport, potem weryfikacja subagentem.

Szacunek nakładu: jedna sesja.

## 5. Produkt końcowy

Plik `AUDYT-WIZYTOWKA-2026-08-05.md`, struktura wg `docs/METODYKA-AUDYTU.md` §6,
format findingu §5, ID `WIZ2608-nn`.

**Stop-conditions (zawsze aktywne):** żadnej edycji wizytówki (profil, usługi, zdjęcia,
opinie, wpisy, ustawienia) · żadnego klikania w elementy zapisujące lub wysyłające ·
żadnego logowania · żadnych zmian w repo, commitów i pushy (CLAUDE.md §7, §11.1) ·
rozbieżność w danych biznesowych (ceny, godziny, telefon, e-mail) — opisać, nie poprawiać
(CLAUDE.md §10.7) · decyzje o treści, cenach i kategoriach → sekcja decyzji.

## 6. Kryteria ukończenia

1. Wszystkie checklisty §2 odhaczone albo oznaczone „brak danych" z powodem.
2. Każdy finding ma dowód (odczyt panelu z datą / cytat / `plik:linia`), priorytet, pewność, ownera.
3. Sekcje „Sprawdzone i OK", „Hipotezy", „Czego nie sprawdzono", „Pozorne problemy" wypełnione.
4. Rozjazdy cenowe rozstrzygnięte przeciwko repo, nie przeciwko dokumentom w `docs/`.
5. Plan działania posortowany kolejnością wdrożenia, z rozdziałem: co robi Marcin ręcznie
   w panelu, a co idzie do repo.
6. Data kontrolna re-audytu z listą metryk.
7. Rejestr findingów z ID na końcu.
