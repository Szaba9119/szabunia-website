# Plan audytu UX / UI — runda 2, 10 sierpnia 2026

Druga runda audytu modułu B (UX / UI / konwersja) tego samego dnia, po przebudowie hero.
Dokument planistyczny — nie zawiera jeszcze danych. Wykonanie: 10.08.2026, Claude Code.

---

## 0. Prompt uruchomieniowy (rozpisany wg `METODYKA-AUDYTU.md §12`)

Metodyka wymaga, żeby prompt dał cztery rzeczy, których agent nie zgadnie:
**zakres, dane, głębokość, tryb**. Rozpisanie polecenia „wykonaj audyt UI i UX mojej strony":

```
Audyt szabunia.pl — moduł B (UX / UI / konwersja) wg docs/METODYKA-AUDYTU.md §3,
runda 2 tego samego dnia.

PYTANIE PRZEWODNIE: czy przebudowa hero z 10.08 (dwa commity + niezacommitowana
ósma tura) poprawiła lejek, czy wprowadziła regres wobec AUDYT-UX-UI-2026-08-10.md.

ZAKRES: pełna checklista modułu B + z modułu A wyłącznie parytet produkcja vs main
(drzewo nie jest czyste, więc to nie jest formalność).

DANE:
- repo lokalne + git (HEAD, czystość drzewa, produkcja vs main)
- dev server z niezacommitowaną ósmą turą — bo to jest stan, który za chwilę pójdzie live
- produkcja szabunia.pl — bo to jest stan, który klient widzi teraz
- brak dostępu do GA4 / Ads / GSC w tej sesji → moduł D poza zakresem
- brak PSI/Lighthouse → CWV oznaczyć jako N, nie zgadywać

GŁĘBOKOŚĆ: pomiar, nie oględziny. Domknąć trzy hipotezy, których poprzedni audyt
nie umiał zmierzyć: H1 (375/390/606 px), H2 (dark mode na trasach), H4 (nowy hero
na 1024/1280/1440 px). Kontrast liczony z realnych wartości rgb z renderu.

TRYB: wykonawczy. Plan zapisany, potem raport. Zero zmian w kodzie — audyt jest
diagnostyczny. Git po stronie Marcina.
```

---

## 1. Kontekst i założenia

**Stan przedmiotu audytu.** 10.08.2026 wykonano już jeden audyt UX/UI
(`AUDYT-UX-UI-2026-08-10.md`, autor: Codex, kod na `862bbe5`). Cztery findingi wdrożono
(`POPRAWKI-WDROZONE-2026-08-10.md`) i zacommitowano jako `4316d3e`. **Po tym wdrożeniu
przyszły trzy kolejne zmiany hero**, których żaden audyt jeszcze nie widział:

| Zmiana | Stan | Co robi |
|---|---|---|
| `4c3cbc9` copy(hero) | zacommitowane | „100+ obsłużonych firm", realizacje w Europie |
| `2ee60ef` feat(hero) | zacommitowane, HEAD | przebudowa hero home i podstron usług |
| ósma tura | **niezacommitowane, 3 pliki + 1 nowy** | `TrustLine.tsx`, usunięcie `heroBenefits`, opis w górnym bloku, kotwica cenowa mniejsza, nowe zdjęcie eventów |

**Okno czasowe:** 10.08.2026, od commita `862bbe5` do drzewa roboczego.
**Uwaga interpretacyjna:** to okno liczy się w godzinach, nie w dniach. Audyt zmierzy
**stan interfejsu**, nie jego skutek. Żadnych wniosków o konwersji tu nie będzie —
na to potrzeba 28 dni danych i panelu, którego ta sesja nie ma. Data kontrolna
na skutek biznesowy stoi już w poprzednim audycie (07.09.2026) i tej daty nie ruszam.

**Punkt odniesienia:** `AUDYT-UX-UI-2026-08-10.md`. Metryki mierzone tą samą metodą
(pomiar DOM `getBoundingClientRect`, kontrast liczony z `getComputedStyle`), żeby dało się
porównać liczby, a nie wrażenia.

**Ground truth spoza audytowanego systemu:** produkcja `szabunia.pl` sprawdzona niezależnie
od dev servera. Rozjazd produkcja vs drzewo robocze jest tu spodziewany i sam w sobie
jest ustaleniem, nie błędem pomiaru.

**Założenie do weryfikacji w trakcie:** czy `main` == produkcja. Jeśli Vercel zdeployował
`2ee60ef`, produkcja ma już nowe hero bez ósmej tury.

---

## 2. Zakres

### 2.1 Punkt odniesienia i parytet (z modułu A, tylko ten punkt)
- [ ] HEAD commit, czystość drzewa, lista plików niezacommitowanych
- [ ] produkcja vs `main` — co widzi klient, a co jest w repo
- [ ] `npx tsc --noEmit` na drzewie roboczym (czy ósma tura się w ogóle kompiluje)
- [ ] `npm run lint` → 0/0
- [ ] martwy kod po usunięciu `heroBenefits` (typy, importy, użycia)

### 2.2 Struktura i hierarchia
- [ ] 1× H1 na trasę, hierarchia h1→h2→h3 bez przeskoków
- [ ] semantyka `<main>` / `<nav>` / `<section>`, `lang="pl"`
- [ ] każde `href="#x"` ma cel na swojej stronie
- [ ] okruszki widoczne == `BreadcrumbList` w JSON-LD (po wariancie C z `shortTitle`)
- [ ] `scrollHeight` per szerokość (390 / 606 / 1280), przeliczone na ekrany
- [ ] brak sierot po usuniętych `heroBenefits`: pustych odstępów, martwych marginesów

### 2.3 CTA i lejek
- [ ] jedno CTA w hero, spójna etykieta na wszystkich powierzchniach
- [ ] jedna ścieżka CTA — bez rozszczepienia `#kontakt` / `/kontakt`
- [ ] sticky CTA mobile na trasach lejka, bez martwego linku
- [ ] FAB nie nakłada się na formularz ani baner cookies
- [ ] telefon dostępny bez scrolla
- [ ] atrybuty `data-cta` nietknięte (`wycena_hero`, `tel_service_hero`) — ciągłość pomiaru
- [ ] dowód społeczny: `TrustLine` w dwóch miejscach — czy nie dubluje `LogoBar`
- [ ] 404 — linki do żywych tras

### 2.4 Dostępność (WCAG 2.1 AA)
- [ ] **kontrast zmierzony na renderze** w obu motywach, nie zgadywany
- [ ] regresja `UXUI2608-01` — czy `text-steel` przetrwał przebudowę hero
- [ ] regresja `UXUI2608-02` — czy `min-h-11` przetrwało na obu ścieżkach kontaktu
- [ ] `PELNY2608-66` — czy trzy poprawki ARIA są nadal w kodzie
- [ ] alt na wszystkich obrazach (policz X/X), w tym nowe zdjęcie eventów
- [ ] tap-targety ≥44 px — zmierzone, nie policzone z klas
- [ ] skip-link, `:focus-visible`, nawigacja klawiaturą
- [ ] `prefers-reduced-motion`

### 2.5 Mobile i dark mode (domknięcie H1 i H2)
- [ ] brak poziomego scrolla na 375 / 390 / 606 px — `scrollWidth` vs `innerWidth`
- [ ] hero: kolejność DOM i zawijanie CTA na 375 / 390 px
- [ ] dark mode na **każdej** odwiedzonej trasie, zmierzony a nie wywnioskowany z klas
- [ ] równe wysokości kart, brak kafla-sieroty
- [ ] konsola bez błędów na całej ścieżce

### 2.6 Nowy hero — ósma tura (domknięcie H4)
- [ ] `TrustLine` w hero home i w hero usług — czy ten sam element czyta się dwa razy
- [ ] hierarchia po przeniesieniu `description` do górnego bloku
- [ ] eventy z `heroHideSubtitle` — czy hero nie zgubił obietnicy
- [ ] kotwica cenowa 15 px semibold — czy nadal czytelna i czy kontrast trzyma
- [ ] podmienione zdjęcie eventów — czy alt się zgadza z kadrem (**założenie autora
      zmiany, opisane w kodzie jako niepotwierdzone**)
- [ ] hero na 1024 / 1280 / 1440 px — zawijanie, wysokość, pozycja zdjęcia

---

## 3. Dane do zebrania

| # | Źródło | Zakres | Ścieżka |
|---|---|---|---|
| 1 | git | HEAD, diff, status | `git --no-optional-locks` |
| 2 | dev server | 8 tras × 5 szerokości × 2 motywy | pomiar DOM |
| 3 | produkcja szabunia.pl | te same trasy, porównanie | render live |
| 4 | kod | każdy finding z renderu potwierdzony w `plik:linia` | Read / Grep |
| 5 | tsc + eslint | drzewo robocze | CLI |

Trasy: `/`, `/uslugi`, `/uslugi/eventy-reportaze`, `/uslugi/wizerunek-portrety`,
`/portfolio`, `/kontakt`, `/galeria`, `/blog` + 404.

---

## 4. Kolejność wykonania

1. **Parytet i kompilacja** — bo audytowanie kodu, który się nie kompiluje, jest bez sensu.
2. **Regresje z poprzedniego audytu** — bo najtańszy finding to ten, który już raz naprawiono.
3. **Nowy hero na desktopie** — bo tam powstał i tam był oglądany przez Marcina.
4. **Mobile 375 / 390 / 606 px** — bo to jest luka, której poprzedni audyt nie zamknął.
5. **Dark mode** — bo wymaga przełączenia stanu i psuje serię pomiarową, jeśli jest wcześniej.
6. **Reszta checklisty modułu B** — dopiero na końcu, na ustalonym już stanie.

---

## 5. Produkt końcowy

Plik: `AUDYT-UX-UI-R2-2026-08-10.md`, struktura wg `METODYKA-AUDYTU.md §6`,
format findingu wg §5. ID findingów kontynuują serię `UXUI2608-` (ostatni użyty: `-03b`),
żeby rejestr został jednym łańcuchem, a nie dwoma równoległymi.

**Stop-conditions (zawsze aktywne, `CLAUDE.md §10` + §11):** brak zmian w kodzie ·
brak `git commit` / `push` · `next.config.ts`, `metadata`, JSON-LD, `.env*`, `.gitignore`
nietykane · żadnych nowych paczek · rozbieżności w treściach biznesowych (ceny, telefon,
email) tylko zgłaszane, nie poprawiane.

---

## 6. Kryteria ukończenia

1. Wszystkie checklisty §2 odhaczone albo oznaczone „brak danych" z powodem.
2. Każdy finding ma dowód (`plik:linia` / zmierzona wartość), priorytet, pewność, ownera.
3. Hipotezy H1, H2, H4 z poprzedniego audytu domknięte statusem lub jawnie przeniesione dalej.
4. Sekcje „Sprawdzone i OK", „Czego nie sprawdzono", „Pozorne problemy skorygowane" wypełnione.
5. Rejestr findingów kontynuuje numerację `UXUI2608-`.
6. Zero zmian w plikach `src/`.

---

---

## 7. Co poszło inaczej niż w planie (dopisane po wykonaniu)

Plan zakładał, że przedmiotem pomiaru będzie **niezacommitowana** ósma tura. O 17:12,
w trakcie zbierania danych, Marcin zacommitował ją jako `df6b1a2` i Vercel zdeployował.
Punkt odniesienia z §1 przesunął się więc z „`2ee60ef` + brudne drzewo" na
„`df6b1a2`, drzewo czyste, produkcja == `main`".

Zakres tego nie unieważnił: ta sama para stanów jest w raporcie opisana jako
**przed deployem i po**, zamiast **produkcja vs drzewo robocze**. Jeden checkpoint z §2.1
(parytet) zamknął się sam, a jeden finding (`UXUI2608-04`) awansował z „w drzewie roboczym"
na „na produkcji".

Wniosek na przyszłość: przy audycie równoległym do pracy Marcina punkt odniesienia trzeba
sprawdzić **dwa razy**, na wejściu i na wyjściu. Bez drugiego sprawdzenia raport twierdziłby,
że praca leży poza gitem, godzinę po tym, jak trafiła na produkcję.

---

*Plan: Claude Code, 10.08.2026. Dokument planistyczny, bez danych. §7 dopisane po wykonaniu.*
