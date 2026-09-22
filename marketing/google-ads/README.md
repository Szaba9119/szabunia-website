# Google Ads — kampania Search, Poznań, fotografia B2B

Katalog dokumentacji kampanii Google Ads dla szabunia.pl.
Stan: **2026-09-22**. Kampania **jest uruchomiona** (ID 24270154304).
**Zacznij od `STAN-FAKTYCZNY-2026-09-22.md`** — koryguje starsze pliki w tym katalogu.

## Co tu leży

| Plik | Co zawiera |
|---|---|
| `strategy.md` | Decyzje, dane, na których stoją, i ekonomia przy 5 zł/dzień |
| `keywords.csv` | 21 słów kluczowych aktywnych + 11 odrzuconych z uzasadnieniem |
| `negative-keywords.csv` | 471 wykluczeń w 20 kategoriach |
| `ads.md` | Pełne teksty RSA z policzonymi znakami, callouts |
| `competitor-research.md` | Odczyt SERP i landingów konkurencji z 20.09.2026 |
| `tracking.md` | Stan pomiaru, co naprawiono w kodzie, co zostaje do zrobienia ręcznie |
| `launch-checklist.md` | Co zrobić krok po kroku, żeby kampania ruszyła |
| `optimization-log.md` | Dziennik zmian. Każda zmiana z datą, powodem i danymi sprzed |
| `redteam-review.md` | Niezależny red-team review i co z niego przyjąłem |
| `import-1..6-*.csv` | Pliki do zaimportowania w Google Ads Editor |

## Jak to uruchomić

Nie mam dostępu zapisu do konta Google Ads (szczegóły w `launch-checklist.md` §0),
więc kampania jest dostarczona jako **komplet plików importu**, nie jako gotowy byt w panelu.
Kolejność i pełna instrukcja: `launch-checklist.md`.

## Zasada nadrzędna

Budżet to 5 zł dziennie. Każda decyzja w tych plikach jest podporządkowana jednemu pytaniu:
**czy to wyszukanie może być komercyjne?** Nie zasięg, nie CTR, nie Wynik optymalizacji.
