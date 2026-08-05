# Prompt uruchomieniowy — audyt Profilu Firmy w Google (wizytówka)

Napisany 05.08.2026 przez asystenta na prośbę Marcina („napisz sobie prompt i wykonaj go").
Format wg `docs/METODYKA-AUDYTU.md` §12.2. Wykonanie: ta sama tura, tryb autonomiczny.

---

```
Audyt Profilu Firmy w Google (wizytówka) dla marki szabunia.pl — TRYB AUTONOMICZNY.
Nie pytaj o nic, nie czekaj na zgody.

ZAKRES: moduł D (§3, część „GA4 i GBP") rozszerzony o local SEO, plus moduł E
(treść i spójność biznesowa) ograniczony do powierzchni wizytówki. Moduły A i B
poza zakresem — wizytówka nie ma kodu ani interfejsu, który byśmy kontrolowali.

OKNO: od poprzedniej sesji wizytówkowej (04.08.2026,
docs/sesje/RAPORT-WIZYTOWKA-I-ZESPOLOWA-2026-08-04.md) do dziś. Wcześniejszy punkt
odniesienia: AUDYT-PELNY-2026-07-29.md (finding PELNY2907-10 — kanoniczny adres
wizytówki w sameAs) i LINKI-I-KATALOGI-2026-07-29.md (NAP w katalogach).

PYTANIE PRZEWODNIE: czy wizytówka jest dziś samodzielnym kanałem pozyskania B2B
(czyli: znajdowana na frazy usługowe, kompletna, spójna z ceną i ofertą ze strony,
z żywym dowodem społecznym), czy tylko wizytówką-wizytówką, którą widzi ten,
kto już zna nazwisko?

DANE:
- widok właściciela w Chrome (Marcin zalogowany na koncie zarządzającym profilem):
  panel „Twoja firma w Google" w SERP, edycja profilu, usługi, zdjęcia, opinie,
  Q&A, wpisy, Skuteczność
- widok publiczny: Mapy Google i knowledge panel bez kontekstu właściciela
  — porównanie, bo właściciel widzi inne rzeczy niż klient
- repo lokalne: src/app/layout.tsx (JSON-LD), src/data/services.tsx (kanon kotwic
  cenowych), public/llms.txt, src/components/Testimonials.tsx (link do opinii)
- local pack: wyniki na frazy usługowe z Poznania + kategorie konkurentów
- GA4 / GSC / Ads: tylko jeśli zalogowane i dostępne odczytem; inaczej N

AUTONOMIA:
- Zero zmian po stronie wizytówki. Nie edytuj profilu, nie odpowiadaj na opinie,
  nie publikuj wpisów, nie dodawaj zdjęć, nie klikaj „Reklamuj się", nie zapisuj
  żadnego formularza. Klikanie ograniczone do otwierania widoków i zamykania ich.
- Nie loguj się nigdzie i nie proś o hasła. Jeśli sekcja wymaga logowania, którego
  nie ma — oznacz N i podaj, czego brakuje.
- Wszystko, co wymagałoby zgody Marcina (treść opisu, ceny, kategorie, decyzja
  o Facebooku, o adresie w profilu), idzie do sekcji „Decyzje potrzebne od Marcina"
  jako warianty A/B/C z rekomendacją i kryterium sukcesu.
- Bez dowodu = sekcja „Hipotezy do sprawdzenia", nie ustalenia. Dowód dla wizytówki
  to zrzut/odczyt panelu z datą albo cytat skopiowany z widoku, nie z pamięci.
- Metryki samego Google (kompletność profilu, „wynik", podpowiedzi „dodaj to i to")
  traktuj jako dane, nie jako diagnozę — §11 metodyki, anty-wzorzec „ufanie metrykom
  audytowanego systemu".

SZCZEGÓLNIE SPRAWDŹ (wynika z historii projektu):
1. Spójność ceny: 04.08 przepisaliśmy 11 usług na jedną kwotę „od", 05.08 Marcin
   wycofał progi 180/150/120 i wprowadził sesję zespołową 1 400 zł za dwie osoby
   + 120 zł za kolejną. Wizytówka mogła zostać na starej kotwicy.
2. Zakazane zwroty „za pierwsze zdjęcie" i „za jedno ujęcie" — czy nie wróciły.
3. Godziny: CLAUDE.md wymaga identyczności JSON-LD ↔ wizytówka (pon–pt 08–20,
   sob 10–16, nd zamknięte).
4. Ślad po „Fotografii buduarowej" — usługa wpięta i cofnięta 04.08; czy Google
   nie trzyma jej w cache, sugestiach lub kategorii.
5. NAP w agregatorach: w SERP widać wpisy z dwoma różnymi adresami (Garbary 51,
   Skoczowska 4). Sprawdź, co dziś stoi w profilu i skąd te adresy.
6. Świeżość: data ostatniego zdjęcia i ostatniego wpisu.
7. Czy link do strony w profilu ma UTM — bez tego ruch z wizytówki wpada
   w GA4 jako organic/direct i kanał jest nierozliczalny.

KOLEJNOŚĆ (zapisuj plik po każdej fazie):
1. PLAN-AUDYT-WIZYTOWKA-2026-08-05.md — zakres jako checklisty §2.x
2. zbiór danych — widok właściciela, widok publiczny, repo, local pack
3. AUDYT-WIZYTOWKA-2026-08-05.md — raport wg §6 metodyki, ID findingów WIZ2608-nn
4. weryfikacja własnej pracy osobnym subagentem: czy każdy finding ma dowód,
   czy findingi są niezależne, czy nie ma anty-wzorców z §11
5. rejestr findingów z ID na końcu raportu

NA KONIEC: 5 zdań w czacie. Najważniejszy finding, ile P0/P1/P2, co czeka na decyzję.
```

---

## Dlaczego ten prompt tak wygląda

- **Tryb autonomiczny mimo obecności Marcina** — bo prośba brzmiała „napisz sobie prompt
  i wykonaj go", czyli plan i wykonanie w jednej turze. Bramki zgody zamieniają się
  w zapisy w sekcji decyzji.
- **Widok właściciela i publiczny osobno** — to dwa różne stany faktyczne. Właściciel
  widzi podpowiedzi i pola, których klient nie zobaczy; klient widzi kolejność
  i przycięcia, których nie widzi właściciel.
- **Zakaz klikania w cokolwiek zapisującego** — wizytówka jest systemem produkcyjnym
  z moderacją. Przypadkowa edycja (jak chip „Fotografia buduarowa" 04.08) kosztuje dobę
  moderacji i zostawia ślad w profilu.
- **Punkt 1 listy „szczególnie sprawdź"** wynika z tego, że kotwica cenowa zmieniła się
  dzień po tym, jak wizytówka została przepisana. To najbardziej prawdopodobne miejsce
  rozjazdu, a rozjazd ceny widzi klient przed kontaktem.
