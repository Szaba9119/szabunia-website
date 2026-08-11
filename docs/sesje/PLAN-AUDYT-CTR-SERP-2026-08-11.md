# Plan audytu CTR w SERP — 11 sierpnia 2026

Cel: zwiększyć organiczny CTR szabunia.pl bez zmiany URL-i, zaczynając od adresów z dużą liczbą wyświetleń i niskim CTR. Zakres obejmuje wyłącznie elementy wpływające na prezentację wyniku w Google oraz techniczne warunki ich prawidłowego renderowania.

Dokument planistyczny — nie zawiera jeszcze danych ani rekomendowanych zmian. Wykonanie po potwierdzeniu zakresu: GPT przygotowuje analizę i copy; Cloud weryfikuje kod i wdraża wyłącznie zaakceptowane decyzje merytoryczne.

## 1. Kontekst i założenia

- **Stan wyjściowy:** poprzedni cykl `docs/sesje/SEO-TITLE-DESCRIPTION-2026-07-30.md` oraz `docs/sesje/RANKING-CO-NAPRAWIC-2026-07-30.md` wprowadził repozycjonowanie metadanych i H1. Nie oceniamy go ponownie bez danych przed/po z tego samego źródła.
- **Okno czasowe:** preferowane są dwa porównywalne, zakończone okna 28-dniowe, z rozdzieleniem daty wdrożenia poprzednich zmian. Interpretacja: CTR zależy od pozycji, miksu zapytań, urządzeń i brandu; wzrost CTR bez kontroli tych zmiennych nie dowodzi skuteczności copy.
- **Źródło danych — ścieżka A:** Google Search Console: Wyniki wyszukiwania → Strony, z wymiarami zapytanie / urządzenie / kraj; eksport danych dla adresów o wysokich wyświetleniach i niskim CTR.
- **Źródło danych — ścieżka B:** eksport GSC przekazany jako CSV/XLSX. Dane z samego kodu nie pozwalają ustalić priorytetów URL-i.
- **Punkt odniesienia:** produkcja `https://szabunia.pl`, kod na `main` (HEAD `54c6631`) oraz status indeksacji i canonicali zweryfikowane na żywo.
- **Ground truth poza GSC:** zapytania ofertowe z kanału organicznego (jeżeli są rozróżnialne) oraz sprawdzenie widocznego snippetu w Google dla najważniejszych zapytań. To weryfikuje, czy Google wykorzystuje przygotowane metadane.
- **Role i granice:** GPT podejmuje decyzje o strategii, intencji i treści; Cloud sprawdza implementację, indeksowalność, render oraz zgodność danych strukturalnych. Cloud może samodzielnie usunąć techniczny błąd potwierdzony w kodzie, ale nie zmienia obietnicy, grupy odbiorców ani copy bez decyzji GPT.
- **Nienaruszalne:** URL-e, architektura informacji, ceny i dane biznesowe; zmiany `metadata` w `layout.tsx` lub JSON-LD wymagają decyzji Marcina zgodnie z `CLAUDE.md` §10.3.

## 2. Zakres

### 2.1 Priorytetyzacja na danych GSC

- [ ] Ustalić datę ostatniego deployu zmian title/description/H1 i wykluczyć nieporównywalne dni.
- [ ] Wyeksportować strony oraz zapytania z obu okien: kliknięcia, wyświetlenia, CTR, średnia pozycja.
- [ ] Oddzielić ruch brandowy od niebrandowego, Polska od pozostałych krajów i desktop od mobile.
- [ ] Zbudować shortlistę URL-i według potencjału: wysokie wyświetlenia, pozycja dająca realną ekspozycję, CTR poniżej mediany porównywalnych wyników oraz zgodna intencja zapytania.
- [ ] Oznaczyć adresy o niskim CTR wynikającym głównie z pozycji jako „nie zmieniać copy bez poprawy rankingu”.

### 2.2 SERP i copy (decyzje GPT)

- [ ] Dla każdego URL-a z shortlisty sprawdzić: dominujące zapytania, intencję, obecny title, description, H1 i widoczny snippet.
- [ ] Przygotować po jednym wariancie docelowym title, description i H1, bez obietnic niepotwierdzonych na stronie.
- [ ] Ocenić różnicowanie względem stron konkurujących w tym samym SERP: konkret usługi, lokalność tylko gdy pomaga intencji, dowód/zakres i jasna korzyść.
- [ ] Sprawdzić konflikt keyword cannibalisation między stronami usług, portfolio i wpisami blogowymi.
- [ ] Zdefiniować hipotezę CTR i kryterium sukcesu per wdrożona zmiana; nie planować równoczesnego testu wielu wariantów jednego URL-a przy małym wolumenie.

### 2.3 Techniczna prezentacja w Google (Cloud)

- [ ] Zweryfikować faktycznie renderowane title, meta description, canonical, robots i `metadataBase` dla shortlisty.
- [ ] Zweryfikować dokładnie jedno H1 na URL oraz zgodność H1 z tytułem i intencją zapytań.
- [ ] Sprawdzić `generateMetadata` na trasach dynamicznych oraz unikalność title/description w całej indeksowalnej puli URL-i.
- [ ] Zweryfikować sitemapę, indeksowalność, redirecty i status kodu odpowiedzi; URL-e pozostają bez zmian.
- [ ] Sprawdzić JSON-LD: poprawność składni, zgodność z widoczną treścią, `BreadcrumbList`, `Service`, `FAQPage` i pozostałe typy występujące na danym URL-u; bez tworzenia nowych twierdzeń biznesowych.
- [ ] Przetestować priorytetowe adresy w Rich Results Test oraz ręcznie porównać snippet Google z wdrożonymi metadanymi.

### 2.4 Wdrożenie i kontrola

- [ ] GPT zamyka listę zaakceptowanych treści przed rozpoczęciem edycji kodu.
- [ ] Cloud wdraża wyłącznie zaakceptowaną tabelę URL → title / description / H1 oraz niezależne, potwierdzone błędy techniczne.
- [ ] Cloud uruchamia lint i `tsc --noEmit`, następnie smoke testuje zmienione ścieżki oraz sprawdza wyjściowy HTML/metadata.
- [ ] Zweryfikować produkcję po deployu: status 200, canonical, title, description, H1 i JSON-LD dla każdego zmienionego URL-a.
- [ ] Po 28 dniach od pełnego zaindeksowania wykonać re-audyt tym samym segmentem GSC: URL + zapytanie + urządzenie + kraj.

## 3. Dane do zebrania

| # | Źródło | Zakres | Produkt |
| --- | --- | --- | --- |
| 1 | GSC — Wyniki wyszukiwania | dwa porównywalne okna 28 dni | eksport stron i zapytań z kliknięciami, wyświetleniami, CTR, pozycją |
| 2 | Git / Vercel | od 30 lipca 2026 | daty commitów i deployów wpływających na metadata/H1 |
| 3 | Produkcja + Google SERP | shortlist URL-i i główne zapytania | widoczne snippety, indeksowalność, canonical, status 200 |
| 4 | Rich Results Test | każdy priorytetowy URL | wynik walidacji danych strukturalnych |
| 5 | Repozytorium | każda zmieniana trasa | źródło metadata, H1 i JSON-LD z numerami linii |

## 4. Kolejność wykonania

1. **GSC i data wdrożenia** — bez nich nie da się uczciwie określić, które URL-e mają potencjał CTR ani ocenić wcześniejszych zmian.
2. **Analiza intencji i snippetów** — GPT dopasowuje propozycję do realnego zapytania, zamiast globalnie skracać lub przepisywać metadane.
3. **Audyt kodu oraz danych strukturalnych** — Cloud wyklucza techniczne przyczyny, przez które Google ignoruje przygotowane elementy.
4. **Decyzja o tabeli zmian** — jedna zatwierdzona treść na URL, z hipotezą i metryką kontrolną.
5. **Wdrożenie oraz walidacja** — oddzielnie od audytu, z kontrolą po deployu i re-audytem po okresie obserwacji.

Szacunek: 1 sesja analityczna po otrzymaniu danych GSC, 1 sesja wdrożeniowa, następnie re-audyt po 28 dniach od indeksacji.

## 5. Produkt końcowy

1. `AUDYT-CTR-SERP-2026-08-11.md` — ranking URL-i, dowody, decyzje i rejestr findingów.
2. `BRIEFY-CTR-SERP-2026-08-11.md` — tabela zatwierdzonych treści oraz AC dla Cloud.
3. `POPRAWKI-WDROZONE-CTR-SERP-<data>.md` — zakres techniczny, walidacja i status deployu.
4. `RE-AUDYT-CTR-SERP-<data>.md` — pomiar tej samej serii GSC po oknie obserwacji.

**Stop-conditions:** brak zmian URL-i, `next.config.ts`, `.env*`, plików konfiguracji, globalnego metadata/JSON-LD, danych biznesowych, cen lub treści poza zaakceptowaną tabelą. Bez commitów i pushy. Każdy wyjątek zatrzymuje wdrożenie i trafia do sekcji decyzji.

## 6. Kryteria ukończenia

1. Shortlista jest oparta na eksporcie GSC, nie na przypuszczeniach lub samej pozycji.
2. Każdy priorytetowy URL ma udokumentowane zapytania, obecny snippet, propozycję, hipotezę CTR i ownera decyzji.
3. Każda propozycja spełnia zgodność z faktyczną treścią strony; bez nowych liczb, opinii ani obietnic.
4. Każdy finding techniczny ma dowód w kodzie lub narzędziu Google oraz oddzielony status od decyzji treściowej.
5. Wdrożenie przechodzi lint, `tsc --noEmit` i kontrolę metadanych na produkcji.
6. Re-audyt porównuje ten sam segment danych i rozdziela zmianę CTR od zmiany pozycji/impresji.
