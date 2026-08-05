# Prompt uruchomieniowy audytu — 05.08.2026

Rozpisany przez orchestratora na własne potrzeby, zgodnie z `docs/METODYKA-AUDYTU.md §12`.
Prompt daje cztery rzeczy, których agent nie zgadnie: **zakres, dane, głębokość, tryb**.
Metodyki nie powtarza — jest w skillu `audyt-szabunia`.

---

```
Audyt szabunia.pl — TRYB AUTONOMICZNY. Nie pytaj o nic, wykonaj w tej samej turze.

ZAKRES: moduły A, B, C, D, E wg docs/METODYKA-AUDYTU.md §3 (pełny przekrój).

OKNO: od AUDYT-PELNY-2026-07-29.md do dziś. W środku tego okna leżą trzy tury
poprawek (29.07, 04.08, 05.08) i pięć raportów cząstkowych: UX 31.07, lejek i język
02.08, treść 04.08, zdjęcia 04.08 i 04.08 runda 2. To NIE jest audyt na czystym polu.
Traktuj go jako ogniwo łańcucha: każdy finding sprawdzaj najpierw pod kątem
„czy to nie jest pozycja już zamknięta decyzją Marcina".

PYTANIE PRZEWODNIE: co po trzech turach poprawek nadal blokuje leada albo kosztuje
pieniądze na zleceniu, i czy zmiany z 04-05.08 faktycznie doszły na produkcję?

DANE:
- repo lokalne przez most do dysku Marcina + git (HEAD, czystość drzewa)
- parytet produkcja vs main przez API Vercela (nie przez zgadywanie)
- live szabunia.pl przez Chrome na maszynie Marcina, z JS (kody odpowiedzi przez
  fetch w kontekście strony, nie przez curl)
- panele: BRAK dostępu do Google Ads, GA4, GSC i GBP. Wszystko, co ich wymaga,
  oznacz N z dokładną ścieżką kliknięć, nie zgaduj
- PSI i Lighthouse: BRAK. CWV wychodzi jako N, żadnych liczb LCP

AUTONOMIA:
- Nie zadawaj pytań. Co wymaga zgody, wpisz do „Decyzje potrzebne od Marcina"
  jako warianty A/B/C z rekomendacją i kryterium sukcesu.
- Nie zmieniaj kodu, nie commituj, nie ruszaj paneli, nie klikaj zgód na banerach
  cookies (to działanie w imieniu Marcina, nie odczyt).
- Dostęp nie działa → N z podaniem, czego brakuje, i lecisz dalej.
- Bez dowodu → „Hipotezy do sprawdzenia", nie ustalenia.

KOLEJNOŚĆ (zapisuj plik po każdej fazie):
1. PLAN-AUDYT-PELNY-2026-08-05.md — zakres jako checklisty §2.x
2. zbiór danych — każdy moduł osobnym subagentem, format §5, bez streszczania
3. weryfikacja własna: przepuść findingi z modułów przez realną przeglądarkę
   i przez kod. Kod rozstrzyga. Fałszywe pozytywy idą do §10 raportu, nie do kosza.
4. AUDYT-PELNY-2026-08-05.md — pełny raport wg §6
5. BRIEFY-PELNY-2026-08-05.md — P0/P1 przełożone na zadania wykonawcze
6. rejestr findingów z ID PELNY2608-NN na końcu raportu

NA KONIEC: 5 zdań w czacie. Najważniejszy finding, ile P0/P1/P2, co czeka
na decyzję. Bez powtarzania raportu.
```

---

## Dlaczego taki, a nie inny

**Pięć modułów, nie dwa.** Poprzednie trzy audyty (UX 31.07, treść 04.08, zdjęcia 04.08)
były wąskie i domykały konkretne obszary. Po trzech turach poprawek trzeba raz przejść
całość, bo poprawki w jednym module psują rzeczy w innym (przykład z tego audytu:
zmiana taryfy zespołowej 05.08 zamknęła `minPrice: 120` w JSON-LD, ale zostawiła
sprzeczny próg „od 4 osób" w blogu).

**Parytet produkcji przez API Vercela, nie przez odczyt strony.** Tura 2 z 04.08
straciła całą FAZĘ 1 na ustalanie, czy deploy poszedł. Zapytanie do API daje
odpowiedź w jednym wywołaniu, z hashem commita.

**Kody odpowiedzi z przeglądarki, nie z warstwy pobierania.** Moduł C zderzył się
w tej sesji z warstwą cache'ującą, która oddawała snapshoty sprzed trzech deployów.
To samo złapało moduł A i wygenerowało hipotezę o rzekomo żywym `/kalkulator`
z cennikiem sprzed depricingu. Jeden `fetch` w kontekście otwartej strony rozstrzygnął
oba w dwie minuty. **Zapisane jako reguła do następnego audytu.**

**Zakaz klikania w baner cookies.** Weryfikacja hipotezy D o blokadach CSP wymagałaby
udzielenia zgody marketingowej w imieniu Marcina. To działanie, nie odczyt — audyt
się na tym zatrzymuje i oddaje hipotezę z krokiem weryfikującym.
