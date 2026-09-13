# Audyt marki, oferty i case studies — 2026-09-12

**Status:** DONE — diagnoza modułu, bez zmian kodu, cen i warunków.
**Zakres:** master prompt §§3–8, 38–60, 64–71, 84–88, 98–101; repo lokalne, wskazane źródło Michelin.
**Metoda:** odczyt AGENTS.md, docs/METODYKA-AUDYTU.md, źródeł danych i renderujących je komponentów; `git status --short` pusty w chwili kontroli modułu. Stan produkcji i skuteczność konwersji nie są wnioskowane z kodu. Raport przygotowany przed zmianami wdrożeniowymi innych modułów; numery linii odnoszą się do baseline.
**Wykluczone:** testy przeglądarkowe i techniczne, panele Google, aktualność umów/polis/stawek i zewnętrznych profili. To audyt spójności treści, nie opinia prawna.

## Stan względem master prompt

| ID | Zadanie | Obecny stan / dowód | Status | Ryzyko i plan |
|---|---|---|---|---|
| BR2609-01 | Cztery filary, capabilities, zastosowania | H2 LUDZIE/WYDARZENIA/OBIEKTY/PRODUKTY już w `src/components/Hero.tsx:95`; użycie materiałów w marketingu/sprzedaży/EB `:144`; cztery usługi `src/data/services.tsx:1505` | GOTOWE | Nie zastępować listą narzędzi ani tworzyć 15 pozycji nawigacji. Kolejność kart zaczyna się wydarzeniami, co nie jest defektem. |
| BR2609-02 | Marka i osobista odpowiedzialność | Nawigacja `src/components/Navigation.tsx:210` nadal M​​ARCIN SZABUNIA; Marcin i powtarzalny standard opisane w `src/components/About.tsx:51`; punkt kontaktu i drugi operator `src/data/services.tsx:588` | CZĘŚCIOWO GOTOWE | P1, Z(kod), wykonawca. Wyeksponować SZABUNIA i rolę Marcina, zachowując H1 SEO i osobisty język. Nie dopisywać zespołu ani stanowisk osób. |
| BR2609-03 | Jeden partner zamiast jednej osoby | Publiczne `TrustLine.tsx:67`, `Services.tsx:29`, `services.tsx:619`; blog jawnie mówi o jednej osobie na planie `blog.ts:1285,1306` | DO ZROBIENIA | P1, Z(kod), wykonawca. Zmienić obietnicę organizacyjną na jeden kontakt/partnera. URL bloga zachować. Historycznego faktu samodzielnej realizacji Woohoo nie trzeba wycinać. |
| BR2609-04 | Cena na zapytanie | `services.tsx:841` dokumentuje depricing 14.08, `:845` = wycena w 24h; `PricingExplainer.tsx:25` pokazuje proces i trzy warianty | GOTOWE | Nie odbudowywać cennika z historycznych notatek AGENTS. Nowa kwota wymaga właściciela. |
| BR2609-05 | Pozostałości cen | `public/llms.txt:16–20,36` nadal publikuje 600/700/1400/900 i minimum 600 | DO ZROBIENIA | P0 master / P2 metodyka, Z(kod), wykonawca. Usunąć stare kotwice z publicznej reprezentacji oferty, zastąpić istniejącym modelem wyceny. Nie zmieniać żadnej kwoty na nową. |
| BR2609-06 | Trzy warianty wyceny | `PricingExplainer.tsx:28`: trzy warianty w ciągu 24h | GOTOWE | Nie przedstawiać jako nowej funkcji, nie wprowadzać Silver/Gold/Platinum. |
| BR2609-07 | Low friction / continuity / reliability | LUDZIE: `services.tsx:903–915`; PRODUKTY: `:1057,1168`; WYDARZENIA: `:566,588,604`; OBIEKTY: `:1380,1417,1421` | GOTOWE / ekspozycja CZĘŚCIOWA | Konkrety już istnieją; eksponować w strukturze, nie wymyślać parametrów. |
| BR2609-08 | Case database | `portfolio.ts:35,44` daje wspólne dane; home z `portfolioItems` (`Portfolio.tsx:35`), route metadata z danych (`portfolio/[slug]/page.tsx:44`) | CZĘŚCIOWO GOTOWE | P1, Z(kod), wykonawca. Rozszerzyć istniejący model, nie tworzyć równoległego CMS/bazy. |
| BR2609-09 | Pole production facts / use / deliverables | `CaseStudy` ma client/industry/challenge/solution/results/testimonial (`portfolio.ts:35`); results miesza liczby materiałów, setupy i publikacje | DO ZROBIENIA | P1, Z(kod), wykonawca. Dodać opcjonalne pola; przenieść istniejące fakty; brak wartości = brak bloku. |
| BR2609-10 | Publikacje oddzielone od klientów | Klienci `LogoBar.tsx:8,33`; osobna sekcja Publikacje `Publications.tsx:12,16`; Forte → BFG `:61`; Yes Butcher → Michelin `:113` | GOTOWE | Nie przedstawiać Michelin/BFG jako klientów. Autopay/ICEA są organizatorami, Woohoo klientem: `portfolio.ts:148`. |
| BR2609-11 | Michelin ★ | Etykieta `portfolio.ts:364` ma ★; opis mówi o obecności w przewodniku, nie otrzymanej gwieździe; komentarz `services.tsx:1462` mówi „gwiazdką” | DO ZROBIENIA | P2, Z(kod + źródło), wykonawca. Usunąć symbol sugerujący rangę bez potwierdzenia; zachować prawdziwy dowód publikacji. |
| BR2609-12 | Proof database | Statystyki centralne w komponencie `TrustStats.tsx:9`; 100+ powtórzone `TrustLine.tsx:49`; klienci lokalni w LogoBar; opinie w Testimonials, services i portfolio | CZĘŚCIOWO GOTOWE | P2, Z(kod), wykonawca. Wydzielić wspólne dane, zachować dokładne pełne cytaty i obecne skróty jako osobne warianty. |
| BR2609-13 | Statystyki i claims | 250000+/1000+/100+/8+ w `TrustStats.tsx:10–13` | WYMAGA DECYZJI WŁAŚCICIELA (aktualizacja) | Same wartości istnieją, brak dokumentu ich bieżącej ewidencji w tym module. Nie zmieniać automatycznie ani nie traktować obecności w kodzie jako audytu ich prawdziwości. 250000+ nie powinno wyprzedzać realizacji i publikacji. |
| BR2609-14 | CTA contextual | Service CTA dla eventów `services.tsx:614`, produktów `:1182`, obiektów `:1441`; portfolio nadal `<CTA />` `portfolio/[slug]/page.tsx:214` i domyślne „Twój wizerunek” `CTA.tsx:46` | CZĘŚCIOWO GOTOWE | P2, Z(kod), wykonawca. Dobrać CTA do case i rodzaju projektu, zachować działające ścieżki i tracking. |
| BR2609-15 | Useme | FAQ `faq.ts:61`, galeria przez `Warunki.tsx:58`, publiczne llms `:23,41`; nie jest hero USP | GOTOWE (kontekst), WYMAGA DECYZJI WŁAŚCICIELA (aktualność) | To rozliczenie. Nie usuwać informacji potrzebnej księgowości bez potwierdzenia modelu. |
| BR2609-16 | Licencja | Globalne „wszystkie” bez czasu `faq.ts:48`, CTA `:257`, event `services.tsx:562`; pola eksploatacji produktów `:1131`; czas/media/zasięg wpływają na licencję `blog.ts:586` | WYMAGA DECYZJI WŁAŚCICIELA + WERYFIKACJI PRAWNEJ | Z(kod) dla rozjazdu komunikatów, N dla właściwego modelu. Nie ujednolicać przez samodzielne poszerzenie/ograniczenie praw. |
| BR2609-17 | RAW, prawa, kary, archiwizacja | Galeria renderuje `Warunki` (`galeria/page.tsx:294`); RAW +30% i prawa/podmioty trzecie +50% (`Warunki.tsx:91`), kary i rok archiwizacji `:102`; llms `:29` dodatkowo RAW 14 dni | WYMAGA WERYFIKACJI PRAWNEJ / WŁAŚCICIELA | Warunki nie są martwym kodem. Ustalić jedno zatwierdzone źródło; nie przepisywać sankcji ani zakresu praw. |
| BR2609-18 | Selected work vs case studies | 8 publikowanych pozycji, z tego 4 faktyczne named cases i 4 galerie tematyczne; home promuje named cases (`Portfolio.tsx:28`) | CZĘŚCIOWO GOTOWE | Rozdzielenie w danych/kartach bez nowego route. Nie nazywać każdej galerii case study. |
| BR2609-19 | Content Day | Woohoo: wieczór + film/reels; Yes Butcher: jeden dzień + cztery rodzaje foto (`portfolio.ts:151,402–408`) | WYMAGA DECYZJI WŁAŚCICIELA | Dowody modelu są; brak podstaw do nowej cennikowej usługi albo SLA. Dodać do backlogu rozwiązanie, nie produkt. |
| BR2609-20 | Abonament / dla agencji | Dowody ciągłości już są, brak potrzeby nowego produktu | WYMAGA DECYZJI WŁAŚCICIELA | Brak abonamentu, NDA/white-label i obietnic niekontaktowania klienta końcowego. Nie dopisywać. |

## Istniejące case studies — fakty możliwe do przeniesienia bez wymyślania

| Case | Status | Klient i obszar | Fakty istniejące | Wykorzystanie i źródło |
|---|---|---|---|---|
| woohoo-autopay | publikowany | Woohoo, wydarzenia; ICEA/Autopay organizatorami | 1 film, 3 reelsy, mobilne studio wywiadów, dron, jeden wieczór | YouTube i Instagram; `portfolio.ts:101–175`. Nie nazywać Autopay klientem. |
| artech-fotografia-produktowa | publikowany | Artech Group, produkty + film produkcji | 20 packshotów, 1 film | WWW, katalog, sklep; `portfolio.ts:238–304`. Przypisanie primary service do produktowej jest uzasadnione zakresem, choć film wspiera przemysł. |
| idcom-headshoty-zespolu | publikowany | IDcom Group, ludzie | 3 tła; standard światła/kadrowania/retuszu | WWW i materiały firmowe; `portfolio.ts:308–360`. Brak potwierdzonej liczby fotografowanych osób; nie wyliczać jej z liczby zdjęć. |
| yes-butcher-przewodnik-michelin | publikowany | Yes Butcher! Shop & Bistro, obiekty + ludzie + produkty | 4 rodzaje foto, 1 dzień w działającym lokalu | Profil Michelin i reklamy restauracji; `portfolio.ts:363–420`. Michelin jest miejscem publikacji. |
| box17-budki-akustyczne | DRAFT, świadoma decyzja | Box17 | 5 modeli, 10 zdjęć, 2 filmy | `portfolio.ts:179–236,763–772`. Nie proponować publikacji — wyraźna decyzja AGENTS. |
| sesja-wizerunkowa / fotografia-eventowa / packshoty-produktowe / sesja-korporacyjna | galerie tematyczne | brak pojedynczego klienta/caseStudy | obrazy, FAQ i proces ogólny | `portfolio.ts:424,496,622,684`. Zachować URL; wyraźnie nazwać galeriami tematycznymi. |

**Zewnętrzna weryfikacja:** oficjalny [profil Yes Butcher! w MICHELIN Guide](https://guide.michelin.com/en/wielkopolskie/poznan_2395985/restaurant/yes-butcher), odczyt 2026-09-12, pokazuje pięć podpisów „Marcin Szabunia/Yes Butcher”. Potwierdza wykorzystanie fotografii. Odczyt nie daje podstaw do claimu o przyznanej gwieździe. Nie weryfikowano osobno umowy/licencji ani całej historii publikacji BFG.

## Najważniejsze findingi i bezpieczny zakres wykonawczy

1. **BR2609-05 — publiczne ceny po depricingu.** Problem jest niespójnością dostępnych treści, nie dowodem, że historyczna kwota jest nieprawidłowa biznesowo. Zastąpić kotwice w llms istniejącym „wycena w 24h”; ujednolicić nagłówek oferty. To nie wprowadza ceny. Nie usuwać jednocześnie praw/Useme w ramach tej poprawki.
2. **BR2609-03 — skala realizacji jest związana z liczbą osób.** Nowy master jawnie wybiera model jednego partnera. Zmienić globalny claim i artykuł o foto+wideo+dron, w tym title/excerpt/FAQ/meta, zachowując slug i intent oszczędności logistyki. Źródło skali: istniejący drugi operator (`services.tsx:588`). Nie obiecywać stałego montażysty ani zespołu.
3. **BR2609-08/09 — centralny case model już istnieje.** Rozszerzyć `CaseStudy` o opcjonalne area/capabilities/uses/location/date/productionFacts/deliverables/publications. Renderer warunkowy. Rozdzielić „Co powstało”, „Fakty z realizacji”, „Gdzie trafił materiał”; nie nazywać 20 zdjęć wzrostem sprzedaży. Dat publikacji wideo nie zamieniać w daty realizacji. Korzystać z jednego typu zamiast kopii `CaseStudyData` w `PortfolioCaseStudy.tsx:5`.
4. **BR2609-11 — gwiazda przy Michelin.** Zachować rozróżnienie publikacji i klienta; usunąć ★ i mylący komentarz „gwiazdka” jako niepotwierdzony element prezentacji. Nie zmieniać pozostałych faktów case.
5. **BR2609-12 — dane proof rozproszone.** Centralizacja liczb/klientów/opinii jest bezpieczna mechanicznie, pod warunkiem zachowania kolejności i literalnej treści. Skrót opinii nie może nadpisać oryginału; opinia przypisana do usługi obiektowej jest świadomie nieobecna (`services.tsx:1682`) — nie uzupełniać cudzą referencją.
6. **BR2609-14 — CTA case jest ogólne.** Przekazać znany typ usługi i kontekst projektu do istniejącego CTA. Nie tworzyć nowego formularza ani deklarować dostępności terminu w czasie rzeczywistym.

## Decyzje właściciela i prawne — nie blokują reszty

- **Licencja (BR2609-16):** A — potwierdzić standard bez limitu czasu i jawne wyjątki zakresu, B — potwierdzić indywidualny model per projekt i dopiero potem zmienić copy, C — zachować obecne teksty z rozjazdem. Rekomendacja: ustalić A/B na zatwierdzonym dokumencie umownym; obie zmiany komunikacyjne odwracalne, skutki nowych zobowiązań wymagają oceny prawnej.
- **RAW, prawa dla podmiotów trzecich, sankcje, milcząca akceptacja, archiwizacja (BR2609-17):** A — przejrzeć z właścicielem i prawnikiem jedno źródło warunków, B — zachować istniejące warunki do następnej aktualizacji, C — przenosić/skracać bez rozstrzygnięcia (niezalecane, może zmienić sens). Rekomendacja A; nie wystawiać nowej obietnicy retencji.
- **Ceny:** nie podano aktualnej ceny startowej. A — pozostawić cenę na zapytanie (rekomendowane w obecnym zakresie), B — właściciel podaje nową kotwicę i zezwala na publikację, C — publikować stare 700 zł (niezalecane wobec master i depricingu).
- **Useme:** A — potwierdzić aktualny model rozliczeń i zachować w FAQ/warunkach, B — wskazać nowy rzeczywisty model, C — bez zmian do rozstrzygnięcia. Rekomendacja A, bez zgadywania statusu prawnego firmy.
- **Liczby, certyfikaty, OC:** istniejące deklaracje zachować; aktualizacja wymaga bieżących danych. Dokumenty certyfikacji i polisy nie były w tym module kontrolowane.
- **Nowe produkty:** Content Day/dla-agencji/abonament tylko backlog, aż właściciel potwierdzi ofertę i warunki. Box17 pozostaje poza zakresem publikacji.

## Pozorne problemy skorygowane / nieaktualne założenia

- Nie trzeba budować czterech filarów od nowa — są w hero, ofercie i usługach.
- Publikacje już są oddzielone od paska klientów; Michelin nie jest w tablicy klientów.
- Brak RAW w FAQ strony głównej nie oznacza braku na stronie: Warunki renderuje `/galeria`.
- `offHomeFaqs` nie ma konsumującego komponentu; nie traktować tej tablicy jako treści widocznej na homepage.
- Warunki nie zniknęły całkiem. Nie przywracać ich na homepage bez potrzeby; problem lokalizacji warunków w galerii i ich docelowego miejsca rozstrzygnąć oddzielnie od sensu prawnego tekstu.
- Stare 700 w komentarzach kodu nie jest publiczną ofertą. W llms jest publiczną treścią. W artykule cenowym 700 nie występuje w sprawdzonym baseline.
- „Jedna osoba” w kontekście czasu portretu jednej osoby nie jest nieskalowalnym claimem; nie robić globalnego replace.
- Box17 ma obrazy i dane; jego status nie wynika z brakujących assetów.
- Trzy warianty, live editing, dogrywki, drugi operator i OC już są w treści; nie wdrażać jako nowości.

## Hipotezy i braki danych

- H: mocniejsze uporządkowanie case/CTA poprawi jakość zapytań. Weryfikacja: porównać zgodne z consent kliknięcia case→kontakt i treść leadów po publikacji; sam kod nie potwierdza wzrostu CRO.
- N: aktualność 100+/1000+/250000+/8+, polis, faktycznych cen i licencji — potrzebne źródła właściciela.
- N: aktualność deklarowanych terminów 24h/14/21 dni — obecne publiczne warunki, nie tworzyć nowych SLA.
- N: zewnętrzne bio/Google/Oferteo/Flickr/Instagram/LinkedIn i backlinki — osobny audyt profili z autoryzowanym dostępem. Nie wysyłano wiadomości klientom ani wydawcom.
- N: dobór zdjęć A/B/C/D — nie wykonano kuracji wizualnej, nie wyciągano wniosków z samych nazw plików.

## Rejestr i kolejność

| ID | Ważność metodyki | Owner | Stan | Następny krok |
|---|---|---|---|---|
| BR2609-05 | P2 (P0 w master) | wykonawca | otwarty | spójność llms z ofertą |
| BR2609-16/17 | P2 | właściciel + prawnik | decyzja | źródło licencji/warunków |
| BR2609-03 | P2 (P1 w master) | wykonawca | otwarty | skalowalny claim w publicznych miejscach |
| BR2609-11 | P2 | wykonawca | otwarty | usunąć niepotwierdzony symbol |
| BR2609-08/09/18 | P2 (P1 w master) | wykonawca | otwarty | opcjonalne metadane case i rozróżnienie galerii |
| BR2609-12/14 | P3 | wykonawca | otwarty | centralizacja i kontekst CTA |
| BR2609-13/15/19/20 | backlog | właściciel | decyzja | aktualność i nowe produkty |

Kontrola po wdrożeniu: wyszukanie tych samych fraz w publicznych źródłach; porównanie czterech named cases i galerii bez zmiany URL, liczb i cytatów; typecheck/lint/build i desktop/mobile w module nadrzędnym. Kontrola efektów po minimum 28 dniach od publikacji, bez obietnicy wzrostu SEO/CRO.

*Audyt wykonał moduł brand/cases, 2026-09-12. Utworzono wyłącznie niniejszy dokument; nie zmieniono kodu ani treści publicznych.*
