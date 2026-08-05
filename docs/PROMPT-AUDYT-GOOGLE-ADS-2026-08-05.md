# Prompt uruchomieniowy — audyt Google Ads, 5 sierpnia 2026

Rozpisany przez Claude na prośbę Marcina („rozpisz sobie prompt i wykonaj audyt moich google ads").
Zapisany **przed** zebraniem danych, żeby dało się później sprawdzić, co z zakresu wypadło.
Struktura wg `docs/METODYKA-AUDYTU.md §12.2` (tryb autonomiczny).

---

## Prompt

```
Audyt Google Ads — konto 786-864-4697 (szabunia.pl). TRYB AUTONOMICZNY.

ZAKRES: moduł D wg docs/METODYKA-AUDYTU.md §3 — kanały płatne i pomiar.
Pełne trzy checklisty modułu: Pomiar (pierwszy, bo bez niego reszta jest ślepa),
Google Ads, oraz z sekcji GA4/GBP tylko to, co dotyczy atrybucji Ads.
Moduły A / B / C / E poza zakresem — pokryte audytami z 29.07 i 04.08.

OKNO: 06.07–04.08.2026 (30 pełnych dni). Styka się bez luki z poprzednim audytem
(AUDYT-GOOGLE-ADS-2026-07-06.md, okno 06.06–05.07). Porównanie: 06.06–05.07.2026.
Okno kontrolne 7-dniowe (29.07–04.08) do sprawdzenia najświeższego stanu.

PYTANIE PRZEWODNIE: czy trzy zmiany wykonane 06.07 (limit maks. CPC 5 zł,
+34 wykluczenia, potwierdzenie statusu konwersji) odwróciły inflację CPC i zero konwersji,
a jeśli tak — co jest teraz następnym wąskim gardłem tej kampanii.

ŁAŃCUCH AUDYTOWY (audyt jest ogniwem, nie snapshotem):
- AUDYT-GOOGLE-ADS-2026-06-11.md — 90 dni, P0 pomiar martwy, P0 tag Ads nie wysyła
- AUDYT-GOOGLE-ADS-2026-07-06.md — 30 dni, P0 inflacja CPC ×3,5, 0 konwersji za 496 zł;
  wykonane tego samego wieczora: limit CPC 5 zł, +34 wykluczenia
- ADS-EVENTY-DIAGNOZA-2026-08-02.md — diagnoza, czemu eventy nie dostają wyświetleń;
  otwarte: dwa sitelinki (Kontakt, Portfolio) prowadzą na stronę główną
Każdy otwarty punkt z tych trzech dokumentów domknąć statusem:
zamknięty / bez zmian / regres.

DANE:
- ścieżka A (odpadła): Supermetrics MCP — trial zespołu wygasł 03.06.2026,
  data_query zwraca błąd subskrypcji. Zero danych tą drogą, potwierdzone 5 zapytaniami.
- ścieżka B (użyta): panel Google Ads na żywo w Chrome, tylko odczyt.
- repo lokalne przez most do dysku — weryfikacja pomiaru po stronie kodu
  (gtag, eventy konwersji, Consent Mode).
- GROUND TRUTH SPOZA ADS: liczba realnych zapytań ze skrzynki (Gmail) w oknie audytu.
  Kryterium: wiadomości z formularza szabunia.pl (Resend) + telefony, jeśli Marcin je odnotował.
  Bez tego nie da się odróżnić „kampania nie działa" od „pomiar nie widzi".

AUTONOMIA:
- Nie zadawaj pytań. Wszystko, co wymagałoby zgody, ląduje w sekcji
  „Decyzje potrzebne od Marcina" jako warianty A/B/C z kosztem, ryzykiem,
  odwracalnością, opcją „nie robić nic", rekomendacją i kryterium sukcesu z terminem.
- ŻADNYCH zmian w koncie. Audyt jest diagnostyczny. Tylko odczyt, żadnych zapisów,
  żadnego klikania w przyciski zapisujące, żadnego edytowania filtrów, które zostaną po sesji.
- Nie ufaj metrykom audytowanego systemu: „wynik optymalizacji" pomijamy świadomie,
  rekomendacje Google traktujemy jako dane, nie jako ustalenia.
- Brak dowodu → sekcja „Hipotezy do sprawdzenia" z etykietą H i krokiem weryfikującym,
  nie do ustaleń.
- Jeśli dostęp nie działa — oznacz N z podaniem, czego brakuje, i leć dalej.

KOLEJNOŚĆ (zapis pliku po każdej fazie):
1. PLAN-AUDYT-GOOGLE-ADS-2026-08-05.md — zakres jako checklisty §2.x
2. zbiór danych — panel po panelu
3. AUDYT-GOOGLE-ADS-2026-08-05.md — raport wg §6 metodyki
4. BRIEFY-ADS-2026-08-05.md — findingi P0/P1 przełożone na zadania wykonawcze
5. rejestr findingów z ID w formacie ADS2608-NN na końcu raportu
6. weryfikacja własnej pracy subagentem: czy każdy finding ma dowód,
   czy nie ma fałszywych pozytywów z §11 metodyki, czy liczby się zgadzają,
   czy findingi są niezależne (a nie kaskadą z jednego błędu)

NA KONIEC: 5 zdań w czacie. Najważniejszy finding, ile P0/P1/P2,
co czeka na decyzję. Bez powtarzania raportu.
```

---

## Uwaga interpretacyjna do okna (to, czego te dane nie uniosą)

1. **30 dni przy budżecie 25 zł/dz. to maksymalnie ~750 zł i kilkadziesiąt kliknięć.**
   Przy takim wolumenie różnica 2 vs 4 konwersje nie jest statystycznie rozróżnialna od szumu.
   Każdy wniosek o „skuteczności grupy" na podstawie jednocyfrowych liczb konwersji
   jest hipotezą, nie ustaleniem.
2. **Okno zawiera lipcowy sezon urlopowy.** Spadek wolumenu zapytań B2B w lipcu jest
   normalny i nie jest dowodem na pogorszenie kampanii. Porównanie r/r niedostępne
   (stara struktura konta), więc sezonowości nie da się odjąć — trzeba ją nazwać, nie policzyć.
3. **Atrybucja jest niedomierzona z definicji.** Consent Mode wymaga kliknięcia „Akceptuję";
   część leadów nie zostanie przypisana do Ads niezależnie od poprawności tagów.
   Dlatego ground truth ze skrzynki jest w tym audycie ważniejszy niż kolumna „Konwersje".
4. **Zmiany z 06.07 nie miały pełnego okna.** Limit CPC działa od wieczora 06.07,
   czyli praktycznie całe okno, ale efekt wykluczeń widać dopiero po tym, jak Google
   przestanie testować nowe zapytania — pierwsze dni okna są mieszane.

---

*Prompt rozpisany 2026-08-05 przez Claude. Wykonanie w tej samej turze.*
