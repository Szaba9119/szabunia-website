# PLAN AUDYTU: zdjęcia, dopasowanie i kolejność (2026-08-04)

**Temat:** warstwa wizualna szabunia.pl, nowy moduł F.
**Prompt uruchomieniowy:** `docs/PROMPT-AUDYT-ZDJECIA-2026-08-04.md`
**Tryb:** autonomiczny. Bramki zgody zamieniam na wpisy w sekcji decyzji.
**Punkt odniesienia:** HEAD `88564ac`, `origin/main` = `88564ac` (produkcja równa się main).
Drzewo robocze czyste poza nieśledzonymi plikami: `_to_delete/`, `docs/PROMPT-AUDYT-TRESC-2026-08-04.md`,
cztery pliki w `docs/sesje/` (dwa diffy z 03.08, jeden oznaczony NIEZASTOSOWANY, jeden skrypt deploya).

**Audyt niczego nie zmienia.** Żadnych edycji plików, nazw, kolejności, commitów ani deployu.

---

## 1. Kontekst i założenia

### 1.1 Uwaga interpretacyjna: czego te dane nie uniosą

Ten audyt czyta pliki i kod. Nie odpowie na pytanie, **które zdjęcie sprzedaje lepiej**,
bo do tego trzeba danych o zachowaniu (scroll depth, kliknięcia w kafelki, ścieżki do
formularza), a takich pomiarów per obraz nie ma. Wnioski o kolejności są argumentami
z rzemiosła i ze spójności obietnicy z kadrem, nie dowodem sprzedażowym. Każdy taki
wniosek dostaje etykietę `O`.

Drugie ograniczenie: kolejność w galeriach powstała ręcznie 03 i 04.08.2026, w kilkunastu
commitach, często na wyraźną prośbę Marcina zapisaną w komentarzach. Zgłoszenie „przestaw"
tam, gdzie komentarz mówi „prośba Marcina", to relitygacja. Takie miejsca idą do §8 raportu.

### 1.2 Ground truth spoza audytowanego systemu

- **Obejrzany kadr.** Wszystkie oceniane zdjęcia zostały wgrane i obejrzane, nie opisane
  z nazwy pliku ani z `alt`. Dowód w findingu ma formę „obejrzane, widać X".
- **Wymiary i waga z nagłówków plików** (Pillow), nie z deklaracji w kodzie.
- **`git log --diff-filter=M`** dla `public/images/**` jako niezależny zapis tego,
  które pliki podmieniano pod tą samą nazwą.
- **Pomiar renderu na produkcji** przez Chrome z włączonym JS, okno widoczne.

### 1.3 Co wiem przed startem (nie zgłaszać ponownie)

- `AUDYT-UX-2026-07-31.md`: 145/145 obrazów z `alt`, zero pustych. **Wagi plików zostały
  tam wprost zapisane jako luka** („zmierzone tylko dla jednego pliku") i ten audyt ją domyka.
- `AUDYT-PELNY-2026-07-29.md`: 18/18 obrazów z `alt` na home; Box17 w draftcie z powodu
  braku miniatury (`PELNY2907-01`).
- Żaden poprzedni audyt nie oceniał **treści kadru** ani **kolejności**. To jest nowe.

---

## 2. Zakres jako checklisty

### §2.1 Inwentarz i mapa użycia

- [ ] policzyć pliki graficzne w `public/images` samodzielnie (`find`), nie ufać liczbie z pamięci
- [ ] wymiary, waga, proporcja i md5 każdego pliku
- [ ] duplikaty bajtowe (ten sam kadr pod dwiema ścieżkami)
- [ ] wszystkie referencje `/images/...` w `src/`, z rozdzieleniem na statyczne i dynamiczne
- [ ] sieroty (plik bez referencji) po odjęciu referencji dynamicznych
- [ ] referencje wiszące (kod wskazuje plik, którego nie ma)
- [ ] pliki spoza konwencji nazewniczej i pliki nieobrazowe w folderach obrazów

### §2.2 Oś 1: dopasowanie kadru do treści

- [ ] hero każdej opublikowanej podstrony usługi kontra jej `h1`
- [ ] kafelek każdej usługi na home i `/uslugi`
- [ ] kafelek i hero każdego opublikowanego case study
- [ ] okładka każdego z 26 wpisów blogowych kontra tytuł wpisu
- [ ] podpis każdej kategorii w `/galeria` kontra to, co w niej faktycznie jest
- [ ] podpis każdego paska „Przykłady z galerii" kontra sześć wybranych kadrów
- [ ] obrazy OG kontra strona, którą reprezentują

### §2.3 Oś 2: kolejność i rytm

- [ ] pierwszy kadr każdej kategorii w `/galeria` (sort po nazwie pliku = kolejność)
- [ ] pierwszy kadr każdego paska `CURATED` na podstronach usług
- [ ] kolejność kafelków portfolio na home (`FEATURED_SLUGS`) i na `/portfolio`
- [ ] kadr zamykający każdą kategorię
- [ ] dwa podobne kadry obok siebie, skok tematyczny w środku pasa

### §2.4 Oś 3: pokrycie i powtórzenia

- [ ] usługa albo case study bez własnego materiału
- [ ] ten sam kadr w wielu rolach: świadome kotwiczenie kontra rozwodnienie
- [ ] kategoria z liczbą kadrów poniżej długości pasa
- [ ] jeden klient albo jedna twarz nadreprezentowana

### §2.5 Oś 4: spójność wizualna i kadrowanie

- [ ] proporcja pliku kontra proporcja kontenera (`aspect-*` + `object-cover`)
- [ ] kadry pionowe w siatkach poziomych i odwrotnie
- [ ] `objectPosition` tam, gdzie kadr traci sens po przycięciu
- [ ] obróbka i temperatura w obrębie jednego pasa

### §2.6 Oś 5: warstwa techniczna

- [ ] waga pliku, rozkład wag po folderach, najcięższe pozycje **(domyka lukę z 31.07)**
- [ ] wymiary źródła kontra realny rozmiar renderu razy DPR
- [ ] `sizes` kontra faktyczna siatka w każdym komponencie
- [ ] `priority` / `loading` / `quality`
- [ ] `next/image` kontra surowy `<img>`
- [ ] nagłówki cache dla `/images/*` w kontekście podmian plików pod tą samą nazwą

### §2.7 Oś 6: alt, nazwy plików i OG

- [ ] `alt` opisuje kadr czy powiela nagłówek
- [ ] `alt` wobec `docs/zasady-tekstow.md`
- [ ] nazwa pliku jako trwały adres, konwencja `kategoria-NN-opis`
- [ ] OG: wymiar 1200x630, obecność zdjęcia, zgodność ze stroną

---

## 3. Dane do zebrania

| Źródło | Po co | Dostęp |
|---|---|---|
| `public/images/**` | inwentarz, wymiary, waga, md5 | jest |
| obejrzane kadry (12 arkuszy stykowych + pojedyncze pliki) | oś 1, 2, 4 | jest |
| `src/data/*.{ts,tsx}`, 19 komponentów z `next/image` | mapa użycia, alt, sizes | jest |
| `git log --diff-filter=M -- public/images/**` | podmiany pod tą samą nazwą | jest |
| `next.config.ts` | formaty, jakości, cache | jest |
| produkcja przez Chrome | render, alt w DOM, rozmiary | częściowo, patrz niżej |
| PSI / Lighthouse | LCP, realny koszt obrazów | **brak, oznaczam N** |
| GA4 / GSC per obraz | która realizacja przyciąga | **brak, oznaczam N** |

---

## 4. Kolejność prac i uzasadnienie

1. **Inwentarz przed oceną.** Bez mapy użycia oś 2 i 3 są zgadywaniem: nie da się ocenić
   kolejności, nie wiedząc, które pliki w ogóle się renderują i w jakiej roli.
2. **Oglądanie kadrów przed czytaniem kodu opisującego kadry.** Odwrotna kolejność zakotwicza
   na tym, co kod twierdzi, że jest na zdjęciu. Tak powstał audyt Gemini z trafnością 1/11.
3. **Kod jako rozstrzygnięcie.** Po obejrzeniu wracam do kodu po dowód `plik:linia`.
4. **Live na końcu**, wyłącznie do tego, czego nie da się rozstrzygnąć z plików: realny
   rozmiar renderu, DPR, obecność `alt` w DOM.
5. **Weryfikacja własnej pracy** osobnym przejściem: każdy finding musi mieć dowód,
   żaden nie może relitygować decyzji z §8.

---

## 5. Produkt końcowy i stop-conditions

**Produkt:** ten plan → `AUDYT-ZDJECIA-2026-08-04.md` → `BRIEFY-ZDJECIA-2026-08-04.md`
+ rejestr findingów `ZDJ2608-nr`.

**Stop-conditions (nie przekraczam, opisuję w sekcji decyzji):**

- zmiana nazwy pliku zdjęcia (zmienia adres, przy `immutable` jest nieodwracalna w cache)
- zmiana kolejności w galeriach ustawionej ręcznie przez Marcina
- `next.config.ts`, w tym nagłówek `Cache-Control` dla `/images/*`
- zdjęcie sluga z `DRAFT_SLUGS` (publikacja case study to decyzja biznesowa)
- usunięcie jakiegokolwiek pliku z `public/`
- cokolwiek wymagającego nowego zdjęcia, którego nie ma w repo

---

## 6. Kryteria ukończenia

1. Każda checklista §2 odhaczona albo oznaczona „brak danych" z powodem.
2. Każdy finding osi 1 opiera się na obejrzanym kadrze, nie na nazwie pliku.
3. Wypełnione sekcje: sprawdzone i OK, hipotezy, czego nie sprawdzono, własne fałszywe pozytywy.
4. Pokrycie podane liczbą: ile z ilu plików obejrzano.
5. Plan działania posortowany kolejnością wdrożenia, z osobno wydzielonym tym,
   co wymaga nowego zdjęcia od Marcina.
