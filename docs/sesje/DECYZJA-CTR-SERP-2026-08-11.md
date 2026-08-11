# Decyzja strategiczna — CTR w SERP po migracji usług — 11 sierpnia 2026

**Status:** obowiązuje od dziś. Zastępuje nieaktualne założenia pomiarowe z `PLAN-AUDYT-CTR-SERP-2026-08-11.md`, ale nie usuwa tego planu — zachowujemy historię decyzji.

## 1. Decyzja

**Wstrzymujemy audyt i optymalizację organicznego CTR do czasu zebrania pełnego okna po migracji usług.** Nie zmieniamy teraz title, meta description ani H1, chyba że wykryjemy błąd rzeczowy, prawny lub techniczny blokujący render.

Powód: 10–11 sierpnia zmieniły się jednocześnie architektura usług, przekierowania oraz część H1 i metadanych. Nie istnieje porównywalne okno „po”, a pięć wycofanych URL-i nie może być porównywane 1:1 z obecnymi adresami. Poprzedni wynik GSC (CTR 1,08% przy średniej pozycji 22,26) wskazuje, że główną barierą była pozycja, nie copy snippetu.

**Termin kontroli:** nie wcześniej niż 10–11 września 2026, aby objąć 28 pełnych dni od daty zamrożenia oraz opóźnienie danych GSC. Wcześniej mierzymy tylko techniczną absorpcję migracji, bez wyciągania wniosków o CTR.

## 2. Nowe pytanie pomiarowe

Zamiast pytania „czy nowe copy podniosło CTR?” sprawdzamy:

> Czy cztery obecne strony usług przejęły widoczność pięciu wycofanych adresów, czy migracja utraciła część wyświetleń, kliknięć lub zapytań?

### Porównywalna seria GSC

| Okres | Segment | Jak interpretować |
| --- | --- | --- |
| 13 lipca – 9 sierpnia 2026 | adres obecny **plus** jego wycofane źródła przekierowań | baseline klastra tematycznego przed migracją |
| 11 sierpnia – 7 września 2026 | wyłącznie obecny adres kanoniczny | widoczność po migracji |

Pary klastrów do porównania:

| Obecny URL | Wycofane źródła do zsumowania w baseline |
| --- | --- |
| `/uslugi/wizerunek-portrety` | `/uslugi/sesje-zespolowe`, `/uslugi/wideo-marketing` |
| `/uslugi/eventy-reportaze` | `/uslugi/pakiety-foto-wideo` |
| `/uslugi/nieruchomosci-przemysl` | `/uslugi/zdjecia-wideo-z-drona`, `/uslugi/wnetrza-obiekty-architektura` |
| `/uslugi/fotografia-produktowa` | własny adres — kontrola bez scalania |

W eksporcie GSC rozdzielamy brand/non-brand, Polska/inne kraje i urządzenie. Dla każdego klastra porównujemy przede wszystkim wyświetlenia, kliknięcia i utrzymanie najważniejszych zapytań; CTR interpretujemy dopiero w zestawieniu z pozycją oraz zmianą miksu zapytań.

## 3. Decyzje dla findingów Cloud

### CTRSERP2608-01 · F3 — nieaktualny `lastmod` w sitemapie

**Decyzja: wdrożyć teraz.** · P2 · 🤖 Cloud · Z (kod + produkcja)

Zmiana ofertowa oraz metadane są istotną zmianą strony, więc `lastmod` powinien je odzwierciedlać. To sygnał dla harmonogramu crawlowania, a nie gwarancja natychmiastowego odświeżenia.

**Zakres dla Cloud:**

- nie podnosić `SITE_UPDATED` globalnie do `2026-08-11`, ponieważ fałszowałoby to datę niezmienionych tras;
- w `src/app/sitemap.ts` wprowadzić odrębną datę dla stron zmienionych w migracji: `/`, `/uslugi` oraz czterech aktualnych podstron usług;
- pozostałe statyczne trasy zachować z ich faktyczną datą modyfikacji, chyba że Cloud potwierdzi istotną zmianę konkretnej trasy w git;
- po deployu potwierdzić wartości `lastmod` w `/sitemap.xml`.

### CTRSERP2608-02 · F1 + F2 — brakujący OG image i historyczny wyjątek JPG

**Decyzja: wdrożyć teraz jako higienę prezentacji linku.** · P3 · 🤖 Cloud · Z (produkcja + kod)

Nie jest to czynnik organicznego CTR Google, ale zepsuty preview aktualnej usługi jest realnym błędem. F2 zamykamy razem z F1, a nie jako osobny priorytet.

**Zakres dla Cloud:**

- wygenerować i dodać wyłącznie brakujący `public/images/og/uslugi/nieruchomosci-przemysl.png` obecnym skryptem; zachować 1200×630;
- usunąć z `src/app/uslugi/[slug]/page.tsx` warunek dla nieistniejącego sluga `zdjecia-wideo-z-drona`; cztery żyjące usługi używają PNG;
- nie dodawać „cichego” fallbacku, który ukryje brak assetu przy kolejnej migracji;
- AC: dla każdej z czterech żyjących usług `og:image` zwraca 200, a jego URL ma istniejący plik.

### CTRSERP2608-03 · F4 — osierocone assety OG

**Decyzja: nie ruszać w tym cyklu.** · P4 · 🤖 Cloud

Usunięcie nie zwiększa CTR ani indeksacji, a odzysk miejsca jest pomijalny. Po re-audycie migracji można wykonać osobny, jawnie zatwierdzony cleanup z listą konkretnych plików.

### CTRSERP2608-04 · F5 — opisy po 162–165 znaków

**Decyzja: brak wdrożenia; zmiana statusu na H (do obserwacji).** · 🌐 GPT

Próg 160 znaków nie jest regułą Google. Snippet zależy od zapytania i szerokości urządzenia, a Google może pobrać opis z treści zamiast meta description. Te trzy adresy ocenimy dopiero na faktycznie wyświetlanym snippecie dla ich najważniejszych zapytań; nie skracamy copy wyłącznie po liczbie znaków.

## 4. Zamrożone decyzje

- Nie zmieniamy teraz URL-i, przekierowań, title, description, H1 ani danych strukturalnych z powodów CTR.
- Nie traktujemy wyniku 30 lipca jako testu obecnego copy; jego wariant nie przetrwał do dojrzałego okna pomiarowego.
- Nie oceniamy migracji przez średnią pozycję całej puli: po scaleniu URL-i zmienił się miks zapytań.
- Nie usuwamy osieroconych obrazów OG przy okazji naprawy F1.

## 5. Weryfikacja po wdrożeniu technicznym

Cloud raportuje: zmienione pliki, wynik `npm run lint`, `npx tsc --noEmit`, URL-e `og:image` ze statusem 200 oraz wartości `lastmod` dla sześciu zmienionych URL-i. Po deployu Marcin zgłasza w GSC aktualną sitemapę i sprawdza inspekcję co najmniej jednego aktualnego URL-a usług oraz jednego wycofanego adresu.

## 6. Kryterium przejścia do kolejnej decyzji GPT

Po 10–11 września zestawiamy eksport GSC według §2. Dopiero gdy indeksacja i transfer zapytań są widoczne, GPT przygotowuje zmiany copy dla pojedynczych URL-i, które jednocześnie mają istotne wyświetlenia, pozycję dającą ekspozycję i słaby CTR w porównywalnym segmencie.
