# Plan audytu UX / UI — 10 sierpnia 2026

Re-audyt doświadczenia użytkownika, interfejsu i ścieżek konwersji serwisu `szabunia.pl`.
Dokument planistyczny — nie zawiera jeszcze wyników. Wykonanie: 10.08.2026, Codex.

## 1. Kontekst i założenia

- **Stan przedmiotu audytu:** punktem odniesienia są `AUDYT-UX-2026-07-31.md` oraz moduł UX/UI w `AUDYT-PELNY-2026-08-05.md`. Poprzedni re-audyt wykazał m.in. kompletne alty i hierarchię nagłówków; nie powielamy tych ustaleń bez sprawdzenia bieżącego kodu i renderu.
- **Stan repo:** `main`, HEAD `ce4f342`; drzewo robocze nie jest czyste (`src/components/Hero.tsx`, `src/components/LogoBar.tsx`, nowy `AGENTS.md`). Stan roboczy i stan publiczny zostaną rozdzielone w raporcie. Produkcja = `main` jest hipotezą do potwierdzenia na stronie live, nie założeniem.
- **Okno czasowe:** od 05.08.2026 do 10.08.2026. To okno nie pozwala przypisać zmian wskaźników biznesowych konkretnym poprawkom UX — brak danych o ruchu, leadach i wariantach.
- **Źródła danych:** render live `https://szabunia.pl` z włączonym JS/CSS, odczyt bieżącego kodu na HEAD, porównanie z poprzednimi raportami. W razie braku pomiaru nie zgłaszam praktyki jako defektu.
- **Ground truth poza systemem:** brak dostępu do GA4, Ads i skrzynki leadów. Skuteczność propozycji konwersyjnych wymaga później porównania liczby rozpoczęć i wysyłek formularza oraz kliknięć telefonu z 28 dni przed/po wdrożeniu.

## 2. Zakres

### 2.1 Przegląd struktury, hierarchii i spójności UI

- [x] Sprawdzić kluczowe trasy: `/`, `/uslugi`, jedną podstronę usługi, `/portfolio`, jedno case study, `/kontakt`, `/galeria`, `/poradnik`, 404.
- [x] Zweryfikować semantykę, jedną strukturę H1 i kolejność nagłówków na renderze oraz w kodzie.
- [x] Ocenić hierarchię informacji, rytm sekcji, karty, komunikaty i zrozumiałość głównej wartości oferty.
- [ ] Brak danych: porównać style oraz copy w stanie jasnym i ciemnym w renderze; dark mode nie został przełączony w profilu użytkownika.

### 2.2 Lejek i CTA

- [x] Przejść ścieżkę: hero / karta usługi / portfolio / kontakt oraz sprawdzić cele linków; formularz nie ma prefillu w badanych ścieżkach.
- [x] Sprawdzić spójność etykiet CTA, telefon bez scrolla oraz kodowe zachowanie MobileFAB względem formularza i stopki.
- [ ] Brak danych: zweryfikować stany formularza interaktywnie bez wysyłania danych.

### 2.3 Responsywność i dostępność

- [ ] Brak danych: zbadać render przy 390 i 606 px; widok 1440 oraz długości desktop sprawdzono, lecz narzędzie nie dało wiarygodnego viewportu mobilnego.
- [x] Sprawdzić kontrast i rozmiary interaktywnych celów na renderze; oddzielić zgodność WCAG od rekomendacji ergonomicznej 44 px.
- [ ] Częściowo: zweryfikowano w kodzie skip-link, focus, menu/lightbox, etykiety, komunikaty, `lang` i reduced motion; pełny test klawiaturą i AT wymaga ręcznego testu.

### 2.4 Re-audyt otwartych ustaleń

- [x] Zweryfikować aktualny status UX2607 i PELNY2608-66 oraz powiązanych obserwacji.
- [x] Nie proponować odwracania udokumentowanych decyzji: brak publicznego cennika i kalkulatora, brak Instagramu w `About`, Box17 jako draft, `font-barlow` jako alias Intera, pozycjonowanie H1 i kolejność usług.
- [x] Odróżnić regresje bieżące od niezmienionych, świadomie zaakceptowanych trade-offów.

## 3. Dane do zebrania

| # | Źródło | Zakres | Ścieżka |
|---|---|---|---|
| 1 | Live z JS/CSS | kluczowe trasy, jasny/ciemny motyw, 390/606/1440 px | `https://szabunia.pl` |
| 2 | Kod na HEAD | komponenty, style, trasy i zachowania interaktywne | `src/` |
| 3 | Poprzednie audyty | status i porównanie metryk | `docs/sesje/AUDYT-UX-2026-07-31.md`, `AUDYT-PELNY-2026-08-05.md` |
| 4 | Git | commit, gałąź, czystość oraz różnice UI | `git status`, `git diff` |

## 4. Kolejność wykonania

1. Potwierdzenie punktu odniesienia i zmian w drzewie — aby nie przypisać produkcji nieopublikowanych zmian.
2. Render głównych tras w szerokościach docelowych — aby dopiero potem interpretować kod jako przyczynę.
3. Sprawdzenie lejka oraz dostępności — ponieważ od nich zależy, czy zauważona wada blokuje kontakt.
4. Weryfikacja kodu i rejestru otwartych punktów — aby wykluczyć fałszywe pozytywy z renderu.
5. Raport, priorytety i briefy P0/P1 — z dowodem oraz kolejnością wdrożenia.

Szacunek nakładu: jedna sesja audytowa. Audyt nie zmienia kodu, paneli, treści ani ustawień kont.

## 5. Produkt końcowy

Pliki: `AUDYT-UX-UI-2026-08-10.md` i, jeśli znajdą się działania P0/P1, `BRIEFY-UX-UI-2026-08-10.md` w `docs/sesje/`. Raport zachowa format oraz rejestr findingów z `docs/METODYKA-AUDYTU.md §6`.

**Stop-conditions (zawsze aktywne):** bez zmian kodu, commitów, pushy, paneli, treści, cen, metadanych i JSON-LD; nie dotykać `next.config.ts`, `.env*`, `.gitignore` ani istniejących niezwiązanych zmian.

## 6. Kryteria ukończenia

1. Każdy punkt §2 będzie odhaczony albo oznaczony jako brak danych z powodem.
2. Każdy finding będzie zawierał dowód, priorytet, pewność, wysiłek i ownera.
3. Raport oddzieli fakty od hipotez i opinii.
4. Raport wymieni sprawdzone elementy, ograniczenia i pozorne problemy skorygowane w trakcie.
5. Plan wdrożenia będzie ułożony kolejnością wykonania, z metrykami re-audytu.
