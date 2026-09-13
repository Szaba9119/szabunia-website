# Wizerunek / Portrety — audyt i dopracowanie, 14.09.2026

**Status:** DONE lokalnie. Bez commitu, pusha i deployu.

## Audyt: co już działało i zostało

Podstrona idzie tym samym szablonem co trzy pozostałe usługi (hero → logotypy → „Kogo fotografuję” → „Co biorę na siebie” → galeria → zakres → drugi pasek → „Kto to zrobi” → proces → opinia → CTA i realizacje → wycena → FAQ → blog → formularz). Nowej architektury nie budowano.

| Punkt briefu | Stan zastany | Decyzja |
|---|---|---|
| H1 | „Sesje biznesowe i headshoty zespołu” | Zostaje. Ma frazę, konstrukcję jak w pozostałych usługach i nie dokleja miasta |
| Kicker nad H1 | Ma go tylko strona wydarzeń (1 z 4) | Nie dodany. Dołożenie tu dałoby 2 z 4. Decyzja dla wszystkich czterech naraz |
| USP w hero | Szare hasło nad przyciskiem zdjęte 13.09 na prośbę Marcina, korzyści usunięte w ósmej turze | Nie przywracano. Liczby (5 m², 30 min, do 40 osób) stoją w „Zakresie” i FAQ |
| CTA | „Zapytaj o ofertę” we wszystkich punktach od 13.09 | Zostaje. Brief proponował „Sprawdź termin i cenę”, ale to etykieta wycofana dzień wcześniej; zmiana tylko tu rozbiłaby system |
| Pozowanie | „Co biorę na siebie” (3. sekcja) i karta zakresu już to mówią | Bez nowej sekcji. Poprawione pytanie w FAQ |
| Mobilne studio | 5 m², gniazdko, 30 min, do 40 osób, 5–15 min na osobę | Komplet, bez zmian |
| Wideo | Karta zakresu i pytanie FAQ, świadomie bez sekcji filmu (brak materiału wizerunkowego) | Bez zmian |
| Scenariusze klienta | Chipsy „Kogo fotografuję” + karty zakresu pokrywają jedną osobę, zarząd, zespół, ludzi przy pracy | Bez przebudowy na karty scenariuszy, bo pozostałe usługi mają „Zakres realizacji” w tym samym formacie |
| Formularz | Usługa ustawiona na `wizerunek`, pole „Ile osób planujesz sfotografować?” już istnieje | Bez nowego pola. Doszedł nagłówek usługowy |
| Linki blog → usługa | Ok. 25 kontekstowych linków z naturalnymi anchorami | Nic nie dopisano, sieć jest gęsta |
| Obrazy | Hero `priority` + `fetchPriority`, reszta lazy, `sizes` policzone, alty opisowe z mapy | Bez zmian |
| Canonical, okruszki, JSON-LD | Poprawne | Bez zmian |

## Co zmienione

1. **Proces: jedna lista w DOM** (`PortfolioProcess.tsx`, wspólny dla czterech usług i case study). Były dwie kopie (`hidden md:block` i `md:hidden`), czyli 8 nagłówków h3 zamiast 4. Teraz jedno `<ol>`, wygląd przełącza CSS. Sprawdzone: 4 usługi i `/portfolio/fotografia-eventowa` mają po jednej liście z 4 krokami; desktop 1280 px (pozioma oś, karty równe 135 px) i telefon 390 px (pionowa oś) wyglądają jak przed zmianą.
2. **Title:** „Fotografia i wideo wizerunkowe dla firm, Poznań” → „Sesja biznesowa i portrety dla firm, Poznań | Szabunia” (54 znaki). „Fotografia biznesowa” celowo poza tytułem, trzyma ją strona główna. Description bez zmian.
3. **FAQ:** „Na jakim sprzęcie pracujesz?” zastąpione przez „Jak przygotować się do sesji i co założyć?” (treść ze wpisu `co-zalozyc-na-sesje-biznesowa`). Pozowanie zapisane jako pytanie, z konkretem ze wpisu o przygotowaniu. Liczba pytań bez zmian (9).
4. **IDcom:** podpis paska „Przykłady z sesji zespołowej” rozszerzony o klienta, cel i sposób realizacji. Fakty wyłącznie z `portfolio.ts`. Bez nowego komponentu.
5. **Nagłówek formularza:** „Zaplanujmy sesję biznesową”. Wizerunek był jedyną usługą na ogólnym „Opowiedz mi o projekcie”.
6. **„Z bloga”:** wybór ręczny (`blogSlugs`): koszt sesji wizerunkowej, headshoty zespołu w jeden dzień, co założyć. Automat pokazywał wpis o filmie promocyjnym ze zdjęciem tokarki.
7. **„Jak powstaje wycena”** (wspólne dla usług i `/kontakt`): wstęp bez „Cennika w formie tabeli nie ma”. To zdanie stało dwa razy na każdej podstronie usługi; zostaje w odpowiedzi FAQ, gdzie niesie słowo „cennik”.

## Kontrola

- `npx tsc --noEmit`: PASS. `npm run lint`: PASS, 0/0. `npm run build`: PASS.
- `/`, `/portfolio`, `/uslugi`, `/blog`, `/kontakt`: HTTP 200. Konsola bez błędów. Tryb ciemny formularza sprawdzony.
- 390 px: brak poziomego przepełnienia, wysokość strony 13 427 → 13 491 px (+64 px od dłuższego podpisu IDcom).
- JSON-LD FAQPage zgodne z widocznym FAQ (9 pytań).

## Do decyzji Marcina

- **Pomiar GSC:** nowy title to druga zmienna po 09.09. Dane od 14.09 czytać osobno.
- **Kicker nad H1** na wszystkich czterech usługach albo na żadnej.
- **„Na jakim sprzęcie pracujesz?”** stoi nadal na trzech pozostałych usługach. Przy eventach (dwie karty) i dronie ma więcej sensu niż przy portretach, więc nie ruszano.
- **Brak zdjęć „ludzie przy pracy / przestrzeń firmy”.** Strona obiecuje to w chipsach i karcie zakresu, a galeria pokazuje wyłącznie portrety. Potrzebne realne kadry, nie da się tego zamknąć kodem.
- **Dwie z trzech realizacji wizerunkowych w `DRAFT_SLUGS`**, więc blok „Przykładowe realizacje” pokazuje tylko IDcom.

**Sugerowany commit message:** `feat(uslugi): wizerunek dopracowany, proces w jednym DOM, FAQ i blog pod portrety`
