# Sprawdzenie spójności tekstów — strona i blog, 04.08.2026

**Zakres:** `services.tsx`, `faq.ts`, `portfolio.ts`, `blog.ts`, `llms.txt`, komponenty
(`Warunki`, `Process`, `CTA`, `Hero`, `About`, `FAQ`) i strony `app/**/page.tsx`.
**Punkt odniesienia:** `cennik_2026_07_v3.md`.
**Metoda:** ekstrakcja wszystkich zdań z kwotą, procentem i terminem + celowane przeglądy
klas twierdzeń (metraż, długość sesji, minimum osób, terminy, poprawki, dojazd, poseboard).
**Stan:** wszystko poprawione, drzewo niezacommitowane. **Produkcja pokazuje jeszcze stare teksty.**

Każdy punkt ma dowód `plik:linia`. Nic nie cytowane z pamięci.

---

## Decyzje Marcina z 04.08.2026

1. **Mobilne studio: 5 m².** Cennik mówił ~3 m² w dwóch miejscach, strona 5 m² w siedmiu.
   Prawdziwa jest piątka → **poprawiony cennik**, strona zostaje bez zmian.
2. **Sesja od 30 minut.** Potwierdzone jako punkt wyjścia progu 700 zł.
3. **„Popraw tak jak uważasz"** — na tej podstawie wszedłem w pole `content` w `blog.ts`,
   objęte wcześniejszym zakazem z tury 1. Cztery akapity plus hasło w słowniku pojęć,
   wypisane niżej co do linii. Jeśli to za daleko, `git checkout -- src/data/blog.ts`
   cofa je razem z resztą zmian w tym pliku.

---

## Poprawione (9 pozycji)

### Kwota 1 100 zł w treści blogowej — pole `content`

| Miejsce | Było | Jest |
|---|---|---|
| `blog.ts:199` | „Sesja portretowa kosztuje od 1 100 zł netto. (…) **Każda sesja** obejmuje poseboard" | „Ceny portretów dla jednej osoby zaczynają się od 700 zł netto. (…) **Pakiety** obejmują poseboard" |
| `blog.ts:315` | „Sesja headshot zaczyna się od 1 100 zł" | „Sesja headshot zaczyna się od 700 zł netto" |
| `blog.ts:501` | „Pakiety portretowe zaczynają się od 1 100 zł netto. To punkt wyjścia dla jednej osoby" | „Ceny portretów dla jednej osoby zaczynają się od 700 zł netto. Wyżej wchodzą pakiety z dłuższą sesją…" |
| `blog.ts:522` | „portret biznesowy zaczyna się od 1 100 zł netto" | „portret biznesowy zaczyna się od 700 zł netto" |

Kwota **1 100 zł nie występuje już w żadnej treści publicznej** — zostały tylko dwa
komentarze historyczne w kodzie (`services.tsx:45`, `:323`).

### Poseboard — obietnice bezwarunkowe

Próg 700 zł poseboardu nie ma (cennik v3 §1: *„Bez poseboardu i bez konsultacji stylizacyjnej"*).
Wszystkie miejsca dostały kwalifikator „w pakietach":

- `blog.ts:1024` (słownik pojęć): „Dostajesz go **gratis przy każdej sesji portretowej**"
  → „Dostajesz go **bez dopłaty w pakietach portretowych**"
- `blog.ts:171` (krok procesu we wpisie): „Przygotowuję moodboard" → „**W pakietach** przygotowuję moodboard"
- `services.tsx:328` i `portfolio.ts:415` (krok nr 2 w grafice procesu): to samo
- wcześniej w tej sesji: `services.tsx:304, 336`, `portfolio.ts:392`, `faq.ts:24`

### Sprzeczne odpowiedzi na to samo pytanie

- `portfolio.ts:425`, case `sesja-wizerunkowa`, pytanie „Ile trwa sesja wizerunkowa?":
  było **„od 90 minut do 3 godzin"**, a `services.tsx:350` na to samo pytanie odpowiada
  **„od 30 minut"** → poprawione na „od 30 minut w progu startowym do 3 godzin
  w najszerszym pakiecie".

### Warunki handlowe

- `faq.ts:44` miało **odwrotny kierunek zobowiązania** niż kanon: „po pełnej akceptacji
  dzieła **masz do 7 dni** na dodatkowe poprawki" (limit dla klienta) kontra
  `cennik:448` i `Warunki.tsx:69`: „**poprawki realizuję** w ciągu 7 dni od zgłoszenia"
  (termin dla Ciebie). Wyrównane do kanonu — limitu dla klienta nie ma w żadnym dokumencie,
  a nieudokumentowanego terminu nie da się wyegzekwować w sporze.
- `portfolio.ts:487`, case `fotografia-eventowa`: było „Koszty dojazdu doliczane
  indywidualnie (2,50 zł/km lub bilety)", bez informacji, że **w Poznaniu dojazd jest 0 zł**
  — a to atut, który mówią trzy inne powierzchnie. Uzupełnione.

### Metraż mobilnego studia

- `cennik_2026_07_v3.md:82` i `:341`: **~3 m² → ~5 m²**, zgodnie z Twoją decyzją.
  Strona i blog mówiły 5 m² w siedmiu miejscach (`services.tsx:224,226,351`,
  `portfolio.ts:429,595`, `blog.ts:452,1525`) i zostają bez zmian.

Kontrola po wszystkich zmianach: `tsc --noEmit` czysty, `sprawdz_spojnosc.mjs` 0 błędów
na 17 powierzchniach.

---

## Sprawdzone i zgodne, bez zmian

- **Kwoty „od":** 600 (eventy), 120/os. (zespoły), 2 100 (hybrydy), 700 (portrety),
  400 (wideo), 600 (produktowa), 700 (dron), 900 (obiekty) — zgodne z sekcjami cennika v3
  w `services.tsx`, `llms.txt` i blogu.
- **Terminy:** 14 dni foto / 21 dni wideo / ekspres 48h +50% — `Warunki.tsx:69`, `faq.ts:20`,
  `portfolio.ts:437`, `llms.txt:29,41`, `services.tsx:352`.
- **Poprawki:** 2 tury foto / 3 wideo, ponad limit 200 zł/h — `Warunki.tsx:80` = `llms.txt:30`.
- **Odwołania:** 48h / 50% / 100%, kolejna zmiana terminu 20% — `Warunki.tsx:102`, `faq.ts:44`, `llms.txt:34`.
- **RAW +30%, przeniesienie praw +50%, archiwizacja 1 rok** — `Warunki.tsx:91,102` = `llms.txt:31,32,33`.
- **Galeria w 48h** — `Process.tsx:30` = `cennik:452`.
- **Ok. 20 gotowych zdjęć na godzinę obecności** — `services.tsx:172` = `portfolio.ts:483` = `cennik:208,603`.
- **Sesje zespołowe od 4 osób** — `blog.ts:469` = `llms.txt:18` = `cennik:315`.
- **Do 40 osób dziennie przy mobilnym studiu** — `blog.ts:452` = `llms.txt:43`.
- **Rozstawienie ok. 20 minut** — `services.tsx:212,226`, `portfolio.ts:429,582`,
  `blog.ts:446,1033` = `cennik:341`.
- **„ponad osiem lat"** (`services.tsx:143`) zgadza się z „od 2018".
- **„za pierwsze zdjęcie" / „za jedno ujęcie"** — brak w treści, został tylko komentarz-zakaz
  w `services.tsx:340`.

---

## Czego NIE sprawdziłem

- **Produkcji.** Sprawdzałem repo, czyli to, co wejdzie po deployu. Na `szabunia.pl`
  wciąż są teksty sprzed tej i dwóch poprzednich tur.
- **Tekstów w obrazkach i na kartach OG** — nie da się tego wygrepować.
- **Cytatów klientów** — objęte zakazem redagowania.
- **Zgodności z umową MASTER i szablonami mailowymi** poza tym, co łapie
  `sprawdz_spojnosc.mjs` (przeszedł bez zastrzeżeń).
- **Tekstów w panelu Google Ads** — poza repo. ⚠ Podgląd reklamy w wizytówce mówi
  „Portrety biznesowe Poznań" bez kwoty, więc nie koliduje, ale kampanii nie audytowałem.

---

## Nadal otwarte, poza treścią

**`szablony_mailowe_v5.md:716`** — stanowisko negocjacyjne wciąż zakłada, że najniżej
schodzisz do 1 100 zł. Po wprowadzeniu progu 700 to zdanie działa przeciwko Tobie w rozmowie.

**Rentowność wariantu z mobilnym studiem w progu 700 zł** — model liczony był dla studia
zewnętrznego (130 zł/h). Notatka w cenniku v3 §1, do policzenia na pierwszej realizacji.
