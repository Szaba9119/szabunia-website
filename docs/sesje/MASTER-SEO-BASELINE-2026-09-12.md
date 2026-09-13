# MASTER SEO / treści — baseline 2026-09-12

Status: DONE (inspekcja kodu, bez wdrożeń). Zakres: SEO, routy, przekierowania, metadata, blog, portfolio, global search. Pewność: Z (kod), chyba że wskazano H/O/N. Nie wykonano pomiarów GSC ani zewnętrznego SERP; dane GSC poniżej pochodzą z master promptu właściciela i nie są nowym pomiarem. Weryfikacja przeglądarką i build są po stronie audytu głównego.

## Sprawdzone i OK; nieaktualne założenia

- Działają cztery usługi, nie osiem: wydarzenia, wizerunek, nieruchomości/przemysł, produkty (src/data/services.tsx:1509). Nie budować tego modelu od początku.
- Siedem legacy tras ma trwałe redirecty w next.config.ts:157–190. Next permanent:true oznacza 308, mimo historycznych komentarzy „301”. Zachować redirecty.
- Globalne wyszukanie literalnych starych adresów w src/ i public/ nie wykazało aktywnych odsyłaczy. Wszystkie znalezione /uslugi/sesje-zespolowe i /uslugi/wideo-marketing są komentarzami. blogServiceMap ma wyłącznie istniejące cele.
- Każda publiczna strona ma własny canonical bez tracking params (layout.tsx:44–46; strony indexów oraz generateMetadata dynamicznych tras). Galeria już ma canonical /galeria w src/app/galeria/page.tsx:76. kat wybiera kategorię i ma walidację (:213–214). Linki z kat są funkcjonalnym filtrem, nie legacy redirectem.
- Root ma ProfessionalService #business, Person #person, WebSite #website oraz wzajemne referencje (layout.tsx:174–383). Nie brakuje „wszystkich danych strukturalnych”.
- Usługi mają Service, FAQPage i breadcrumbs; wpisy BlogPosting, FAQPage i breadcrumbs; portfolio Service lub VideoObject oraz breadcrumbs. Blog ma spójne datePublished/dateModified.
- Portfolio ma 9 rekordów, z czego 8 publicznych i 1 świadomy draft Box17. Cztery rekordy są konkretnymi publicznymi case studies; cztery są galeriami kategorii. Nie publikować Box17.
- Publications już odróżnia klienta Forte od publikacji Big Furniture oraz klienta Yes Butcher od Michelin (Publications.tsx:61 i dane portfolio). Nie przedstawiać wydawców jako klientów.
- Na widocznych stronach usług wszystkie price mają „wycena w 24h”. Artykuł cenowy nie zawiera już 700 zł. AGENTS opisujący publiczne kotwice cenowe jest nieaktualny wobec depricing 14.08.
- Stara domena pozostała w allowliście origin src/lib/origin.ts:17–18 i w redirectach. Nie jest linkiem SEO ani dowodem nieukończonej migracji.
- Dwa responsywne LogoBar w src/app/page.tsx:52–58 są wzajemnie ukrywane CSS. Samo to nie jest findingiem duplicate DOM.

## Ustalenia

### SEO-01. Ceny ujawniane przez llms.txt po depricing — P2 · S · kod + owner · Z (kod)

Dowód: public/llms.txt:16–20,36 zawiera 600/700/1400/900 zł oraz minimalne zamówienie. src/data/services.tsx:517,845,1111,1347 zawiera „wycena w 24h”. Skutek: publiczne źródło dla asystentów odpowiada starymi kwotami mimo modelu zapytaniowego. Bezpieczna naprawa: usunąć kwoty ofertowe z publicznego llms.txt i odzwierciedlić aktualną formę wyceny; nie zmieniać stawek ani dopłat w warunkach bez decyzji. Nowe kwoty dla artykułu cenowego wymagają OWNER INPUT REQUIRED.

### SEO-02. Wewnętrzny edytor dziedziczy index i home canonical — P2 · S · kod · Z (kod)

Dowód: src/app/galeria/edytor/page.tsx:1–5 nie definiuje metadata; layout.tsx:97–106 deklaruje index:true i canonical / (:46). Edytor nie ma odrębnej intencji wyszukiwania. Naprawa: własny title, robots noindex i własny canonical lub świadome wyłączenie canonical; nie dodawać do sitemap. Sam noindex nie jest zabezpieczeniem endpointu — bezpieczeństwo należy ocenić osobno. Wpływ indeksacyjny live niezmierzony.

### SEO-03. Wpis przemysłowy kieruje kartę usługi do produktów — P2 · S · kod · Z (kod)

Dowód: src/data/blog.ts:1960–1963 opisuje nierozstrzygniętą dawną decyzję; mapa :1972 wiąże fotografia-przemyslowa-fabryka z fotografia-produktowa. Temat wpisu to zakład, proces, hala; treść już linkuje także nieruchomosci-przemysl. Karta usługi generuje się z mapy (blog/[slug]/page.tsx:129–132). Naprawa: przypisać nieruchomosci-przemysl, zachować kontekstowy Artech i link produktowy tam, gdzie akapit dotyczy packshotów. Nie potrzeba zmiany URL ani nowego landingu na tym etapie.

### SEO-04. Packshot nie występuje w H1 i title usługi — P2 · S · kod · Z (kod), wpływ rankingowy H

Dowód: src/data/services.tsx:1003 „Fotografia i wideo produktowe”, :1185 „Fotografia i wideo produktowe, Poznań | Szabunia”. Packshot jest już w zakresie :1056, w intro i case. Master prompt daje historyczne 270 wyświetleń packshot Poznań i 128 packshoty Poznań; nie jest to nowy pomiar. Bezpieczna optymalizacja tego samego URL: H1 „Fotografia produktowa i packshoty w Poznaniu”; title „Fotografia produktowa i packshoty Poznań | Szabunia”. Zachować wideo w lead i zakresie. Nie tworzyć równocześnie /packshot-poznan. To okazja SEO, nie awaria indeksacji.

### SEO-05. Obietnica „robię sam” nie skaluje się zgodnie z briefem — P2 · M · kod · Z (kod)

Dowód: ServiceAuthor.tsx:59 „Zdjęcia, film i ujęcia z drona robię sam”; Services.tsx:29; TrustLine.tsx:67; opis SEO eventów services.tsx:619. Własne FAQ events :588 dopuszcza drugiego operatora. Blog foto-wideo-dron-z-jednego-wejscia, blog.ts:1284–1340, definiuje fizycznie jedną osobę; pakiet-foto-wideo-czy-osobno :1431–1462 również. Brief użytkownika świadomie zmienia pozycjonowanie. Naprawa: partner/kontakt/wspólny proces i dobór obsady do zakresu; zachować osobisty głos Marcina. Nie zmieniać liczb osób portretowanych ani cytatów klientów. Opis jednorazowej realizacji Woohoo „Jeden twórca” może pozostać faktem historycznym. Zachować oba slugi blogowe.

### SEO-06. Brak konkretnej odpowiedzi cenowej w wartościowym artykule — P2 · S · owner · Z (kod), szansa SEO na danych właściciela

Dowód: blog.ts:568 lead „to zależy”, :571 zakres, :598–603 wycena na zapytanie. Artykuł nie zawiera starego 700 zł ani cennika. Właściciel podał 147+127 wyświetleń fraz cenowych, pozycje około 14–16. Bezpieczny etap bez nowej kwoty: przenieść krótką odpowiedź „wycena zależy od liczby osób, finalnych ujęć i zakresu; ofertę przygotowuję w 24h” do leadu; link do konkretnego IDcom. Rzeczywisty snippet kwotowy wymaga aktualnej kwoty od właściciela. Nie pobierać jej automatycznie z llms.txt ani starego AGENTS.

### SEO-07. Licencje wymagają jednej decyzji, nie automatycznej unifikacji — P2 · M · owner/legal · Z (kod)

Dowód: faq.ts:48 zapewnia komercyjne wykorzystanie bez limitów czasowych; blog.ts:589 stwierdza, że czas/media/zasięg wpływają na licencję i wycenę większych projektów; services.tsx:562 „Nie dopłacasz za kolejne kanały ani za kolejny rok”; services.tsx:1071,1131,1156 wycenia reklamowe według pola eksploatacji; llms.txt:27 ogranicza użytek własny klienta i dopłatę za podmioty trzecie. To różne poziomy szczegółowości, których zakres nie jest jasno rozdzielony. Nie orzekam nieważności prawnej. Potrzebne OWNER/LEGAL INPUT: zakres domyślny, reklama/outdoor, podmioty trzecie/agencje, ograniczenia czasowe, przeniesienie praw. Do tego czasu nie zmieniać warunków merytorycznie.

### SEO-08. Część bloga nie prowadzi do konkretnego case — P2 · M · kod · Z (kod)

Każdy z 26 wpisów ma działającą kartę money page, ale tylko część zawiera link do /portfolio/*. Poniżej komplet mapy. Galeria jest poprawnym odsyłaczem do obrazów, ale nie odpowiada sama na „jak rozwiązano problem”. Dodać po jednym naturalnym kontekstowym case do odpowiednich artykułów, np. IDcom przy organizacji headshotów, Woohoo przy obsłudze eventu, Artech przy packshotach i filmie przemysłowym. Nie wymuszać case na tekstach o dronie, jeśli materiał nie odpowiada obietnicy.

### SEO-09. Blog publisher nie używa istniejącej encji firmy — P3 · S · kod · Z (kod)

Dowód: blog/[slug]/page.tsx:99–108 tworzy nowe inline Person i Organization bez @id, root ma #person i #business. Nie stwierdzam konfliktu skutkującego karą. Bezpieczna higiena: author @id #person, publisher @id #business, zachować pozostałe właściwości. Nie tworzyć nowej równoległej SZABUNIA Organization o sprzecznych danych.

### SEO-10. Utrzymanie lastmod i dokumentacji — P3 · S · kod · Z (kod)

sitemap.ts:21 ma SITE_UPDATED 2026-08-11 mimo późniejszych zmian galerii opisanych w kodzie z 20.08. Nie podbijać daty na każdy build. Przy bieżącym wdrożeniu podnieść tylko daty rzeczywiście zmienionych dokumentów i updated wpisów. AGENTS ma datę 30.07 i nie opisuje aktualnego depricing, czterech usług ani API edytora; potrzebna synchronizacja na podstawie realnego finalnego kodu.

## Redirect map — stan przed zmianami

Źródła sprawdzone w src i tekstowych plikach public. Liczba aktywnych internal links do każdego starego URL: 0. Komentarze nie są odsyłaczami. Zachować wszystkie reguły.

| Old URL | Target | Internal links updated | Keep redirect |
|---|---|---|---|
| /sesje-prywatne | /kontakt | 0 do aktualizacji | tak |
| /kalkulator | /kontakt | 0 do aktualizacji | tak |
| /uslugi/sesje-zespolowe | /uslugi/wizerunek-portrety | 0 do aktualizacji | tak |
| /uslugi/wideo-marketing | /uslugi/wizerunek-portrety | 0 do aktualizacji | tak |
| /uslugi/pakiety-foto-wideo | /uslugi/eventy-reportaze | 0 do aktualizacji | tak |
| /uslugi/zdjecia-wideo-z-drona | /uslugi/nieruchomosci-przemysl | 0 do aktualizacji | tak |
| /uslugi/wnetrza-obiekty-architektura | /uslugi/nieruchomosci-przemysl | 0 do aktualizacji | tak |

Host (www.)marcinszabunia.pl: /strona-glowna → /; /portrety-biznesowe → /uslugi/wizerunek-portrety; /fotografia-eventowa → /uslugi/eventy-reportaze; /zdjecia-produktowe → /uslugi/fotografia-produktowa; /video → /uslugi/wizerunek-portrety; /o-mnie → /#o-mnie; /contact → /kontakt; reszta → /. Wszystkie cele absolutne https://szabunia.pl. HTTP i www nowej domeny nie mają reguły w repo: weryfikacja Vercel/live konieczna, nie zgłaszam awarii bez pomiaru.

## Query ownership — propozycja bez migracji URL

| Klaster | Intencja | Primary URL | Supporting content / case | Zmiana | Priorytet |
|---|---|---|---|---|---|
| fotograf biznesowy Poznań; fotografia biznesowa Poznań | wybór lokalnego partnera dla firmy | / | blog/headshoty-linkedin-konwersja; IDcom | zachować semantykę homepage | P1 |
| sesja biznesowa, portret biznesowy/wizerunkowy, LinkedIn/CV | zamówienie portretów | /uslugi/wizerunek-portrety | sesja-wizerunkowa-poznan; przygotowanie; IDcom | zawęzić komunikat do ludzi/zespołów, bez nowej trasy | P1 |
| sesje zespołowe, zdjęcia pracowników, headshoty zespołu | organizacja sesji HR/marketing | /uslugi/wizerunek-portrety | headshoty-zespolu-w-jeden-dzien; spojne-portrety-zespolu; IDcom | sekcja standardu zespołu, rozważenie nowego URL dopiero po GSC | P2 |
| ile kosztuje sesja wizerunkowa | informacja o cenie | /blog/ile-kosztuje-sesja-wizerunkowa-dla-firmy | usługa portretowa; IDcom | odpowiedź w lead, kwota blokowana | P1 |
| fotografia produktowa / packshot Poznań | zakup materiałów produktu | /uslugi/fotografia-produktowa | ecommerce, co-to-jest-packshot; Artech | title/H1 + dowód | P1 |
| co to jest packshot | definicja i zastosowanie | /blog/co-to-jest-packshot | money page + Artech | uzupełnić case | P2 |
| zdjęcia przemysłowe / fotografia przemysłowa | dokumentacja zakładu i procesu | /uslugi/nieruchomosci-przemysl (tymczasowo) | fotografia-przemyslowa-fabryka; Artech | poprawić ownership bloga i sekcję przemysłową | P1 |
| fotografia przemysłowa jak pokazać fabrykę | poradnik przygotowania | /blog/fotografia-przemyslowa-fabryka | usługa obiektowa; Artech | zachować artykuł i intencję | P1 |
| reportaż wydarzeń firmowych / fotograf eventowy | rezerwacja obsługi wydarzenia | /uslugi/eventy-reportaze | checklista fotografa, live editing; Woohoo | jeden partner + proces i dowód | P1 |
| foto + wideo + dron; pakiet czy osobno | wybór modelu realizacji | blog/foto-wideo-dron-z-jednego-wejscia oraz blog/pakiet-foto-wideo-czy-osobno mają odrębne pytania | /uslugi/eventy-reportaze; Woohoo | doprecyzować różnicę: logistyka vs dobór zakresu | P2 |
| zdjęcia/film z drona nieruchomości | oferta i zastosowanie | /uslugi/nieruchomosci-przemysl | trzy artykuły dronowe; Yes Butcher tylko przy zgodnym kontekście | nie przywracać starego URL automatycznie | P2 |

Kanibalizacja jest hipotezą, nie stwierdzonym defektem: wymaga GSC query→page w porównywalnym okresie. Własność zapytań powyżej jest decyzją redakcyjną do wykorzystania w wdrożeniu, a nie pomiarem Google.

## New landing candidates

| Kandydat | Search intent / GSC (dane właściciela) | Content + portfolio | Ryzyko | Rekomendacja |
|---|---|---|---|---|
| /uslugi/fotografia-przemyslowa | proces/fabryka; zdjęcia przemysłowe 57 impr / 13,46; blog 86 / 2 kliki / poz.12 | artykuł, materiał wideo Artech, istniejąca usługa | średnie z obiektami i blogiem | najmocniejszy kandydat; najpierw rozszerzyć istniejącą sekcję i sprawdzić nowy GSC; nie publikować pustej strony |
| /uslugi/sesje-zespolowe | zespół i organizacja; historyczna poz.7,94 bez wolumenu | IDcom + 3 artykuły + mobilny setup | wysokie z wizerunkiem | odłożyć przywrócenie, sprawdzić query/page po konsolidacji |
| /uslugi/packshot-poznan | transakcyjny packshot; 270 impr /23,19 i wariant 128 /29,23 | Artech, selected work, zakres/retusz/logistyka | wysokie z produktową | obecnie nie tworzyć; packshot owner istniejąca produktowa |
| /uslugi/zdjecia-z-drona | sam dron | 3 artykuły, galeria; brak dedykowanego case drone-only | średnie/wysokie | bez dodatkowych danych nie publikować |
| /uslugi/fotografia-nieruchomosci | obiekty jako nieruchomości | Yes Butcher, wnętrza i hale; brak osobnego GSC | wysokie | najpierw dopracować istniejący URL |
| /dla-agencji | partner wykonawczy | niepotwierdzone white-label/NDA/brak kontaktu z klientem | małe SEO, duże ryzyko claims | OWNER INPUT REQUIRED; backlog |
| Content Day | wiele materiałów w jednym dniu | Yes Butcher: 1 dzień/4 rodzaje; Woohoo różne formaty; Box17 draft nie może być publikowany | nakładanie na usługi | przygotować rozwiązanie w danych/backlog; nowa usługa wymaga decyzji |

## Portfolio — mapa danych

Źródło: src/data/portfolio.ts. Wszystkie publiczne pozycje mają serviceLink. Model jest już centralny; rozszerzenie o area/capabilities/use/location/date/production facts może być ewolucją, nie drugim źródłem danych. Brak result biznesowego liczbowego nie upoważnia do jego wymyślenia.

| Slug | Status | Klient | Zdjęcia w gallery | Wideo | Money page | Proof |
|---|---|---|---:|---|---|---|
| woohoo-autopay | case | Woohoo, partner wydarzenia E-commerce All In | 0 | 4INLtKcKcZk | /uslugi/eventy-reportaze | 1 film podsumowujący na YouTube; 3 pionowe reelsy z wywiadami; 2 formaty dystrybucji: YouTube i Instagram |
| box17-budki-akustyczne | DRAFT — owner | Box17 (Tim Petzold) | 9 | vjpUby-NZsY | — | 5 modeli budek w jednej sesji; 10 wyselekcjonowanych i wyretuszowanych zdjęć; 2 filmy produktowe; 3 zastosowania: strona WWW, sklep, social media |
| artech-fotografia-produktowa | case | Artech Group | 9 | ivvZQ5lQ7FE | /uslugi/fotografia-produktowa | 20 packshotów produktów i półfabrykatów; 1 film z produkcji na YouTube; 3 zastosowania: strona WWW, katalog, sklep internetowy |
| idcom-headshoty-zespolu | case | IDcom Group | 5 | — | /uslugi/wizerunek-portrety | 3 tła zdjęciowe w jednej sesji; 2 zastosowania: strona WWW i materiały firmowe |
| yes-butcher-przewodnik-michelin | case | Yes Butcher! Shop & Bistro | 9 | — | /uslugi/nieruchomosci-przemysl | https://guide.michelin.com/en/wielkopolskie/poznan_2395985/restaurant/yes-butcher |
| sesja-wizerunkowa | selected work | galeria kategorii | 6 | — | /uslugi/wizerunek-portrety | — |
| fotografia-eventowa | selected work | galeria kategorii | 7 | — | /uslugi/eventy-reportaze | — |
| packshoty-produktowe | selected work | galeria kategorii | 9 | — | /uslugi/fotografia-produktowa | — |
| sesja-korporacyjna | selected work | galeria kategorii | 7 | — | /uslugi/wizerunek-portrety | — |

## Blog — komplet 26 wpisów: area/persona/intent/keyword/money page/case/CTA

Money page z mapy oznacza istniejącą kartę pod wpisem. Case bieżący dotyczy bezpośrednich linków w treści; „brak” nie oznacza braku nawigacji lub galerii. Propozycje nie zostały wdrożone.

| Artykuł / primary keyword (tytuł) | Area / persona / intent | Money page (obecnie) | Case w treści | Proponowany case / CTA |
|---|---|---|---|---|
| jak-przygotowac-sie-do-sesji-biznesowej — Jak przygotować się do sesji biznesowej: 7 praktycznych wskazówek | LUDZIE / HR, marketing / poradnik / rozważanie zakupu | /uslugi/wizerunek-portrety | brak | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| headshoty-linkedin-konwersja — Dlaczego profesjonalne headshoty zwiększają konwersję na LinkedIn | LUDZIE / HR, marketing / poradnik / rozważanie zakupu | /uslugi/wizerunek-portrety | /portfolio/idcom-headshoty-zespolu | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| fotografia-eventowa-vs-reportaz — Fotografia eventowa vs reportaż: co wybrać dla Twojej konferencji | WYDARZENIA / event manager / poradnik / rozważanie zakupu | /uslugi/eventy-reportaze | brak | Woohoo; Opisz projekt / Sprawdź termin i cenę |
| zdjecie-do-cv-w-domu — Jak zrobić profesjonalne zdjęcie do CV w domu: kompletny poradnik | LUDZIE / HR, marketing / poradnik / rozważanie zakupu | /uslugi/wizerunek-portrety | brak | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| fotografia-przemyslowa-fabryka — Fotografia przemysłowa: jak pokazać fabrykę z najlepszej strony | PRODUKTY / e-commerce, marketing / poradnik / rozważanie zakupu | /uslugi/fotografia-produktowa | /portfolio/artech-fotografia-produktowa | Artech; właściwa money page OBIEKTY; Opisz projekt / Sprawdź termin i cenę |
| bledy-zdjecia-zespolu — 5 błędów, które firmy popełniają przy zdjęciach zespołu | LUDZIE / HR, marketing / poradnik / rozważanie zakupu | /uslugi/wizerunek-portrety | /portfolio/idcom-headshoty-zespolu | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| ile-kosztuje-sesja-wizerunkowa-dla-firmy — Ile kosztuje sesja wizerunkowa dla firmy: co realnie wpływa na cenę | LUDZIE / HR, marketing / koszt i zakup | /uslugi/wizerunek-portrety | brak | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| fotografia-produktowa-ecommerce — Fotografia produktowa dla e-commerce: jak zdjęcia wpływają na sprzedaż | PRODUKTY / e-commerce, marketing / poradnik / rozważanie zakupu | /uslugi/fotografia-produktowa | /portfolio/artech-fotografia-produktowa | Artech; Opisz projekt / Sprawdź termin i cenę |
| wideo-marketing-dla-firm-formaty — Wideo marketing dla firm: jakie formaty naprawdę się sprawdzają | LUDZIE / HR, marketing / poradnik / rozważanie zakupu | /uslugi/wizerunek-portrety | /portfolio/woohoo-autopay | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| sesja-wizerunkowa-poznan — Sesja wizerunkowa w Poznaniu: studio, biuro czy plener? | LUDZIE / HR, marketing / poradnik / rozważanie zakupu | /uslugi/wizerunek-portrety | /portfolio/idcom-headshoty-zespolu | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| zdjecia-ai-vs-profesjonalna-sesja — Zdjęcia AI vs profesjonalna sesja: czy generator headshotów wystarczy firmie? | LUDZIE / HR, marketing / poradnik / rozważanie zakupu | /uslugi/wizerunek-portrety | brak | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| co-zalozyc-na-sesje-biznesowa — Co założyć na sesję biznesową: kolory, fasony i błędy, których lepiej unikać | LUDZIE / HR, marketing / poradnik / rozważanie zakupu | /uslugi/wizerunek-portrety | brak | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| zdjecia-na-strone-firmowa — Jakie zdjęcia potrzebuje strona internetowa firmy: kompletna lista | LUDZIE / HR, marketing / poradnik / rozważanie zakupu | /uslugi/wizerunek-portrety | /portfolio/idcom-headshoty-zespolu | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| slownik-pojec-wideo — Co to jest b-roll? Słownik pojęć wideo, które warto znać | LUDZIE / HR, marketing / poradnik / rozważanie zakupu | /uslugi/wizerunek-portrety | /portfolio/woohoo-autopay, /portfolio/artech-fotografia-produktowa | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| co-to-jest-packshot — Co to jest packshot? Słownik pojęć fotografii, które warto znać | PRODUKTY / e-commerce, marketing / poradnik / rozważanie zakupu | /uslugi/fotografia-produktowa | brak | Artech; Opisz projekt / Sprawdź termin i cenę |
| zdjecia-film-z-drona-dla-firm — Zdjęcia i film z drona dla firm: zastosowania, legalność i koszt | OBIEKTY / deweloper, marketing / poradnik / rozważanie zakupu | /uslugi/nieruchomosci-przemysl | brak | Yes Butcher, wyłącznie w kontekście obiektu; Opisz projekt / Sprawdź termin i cenę |
| foto-wideo-dron-z-jednego-wejscia — Zdjęcia, film i dron od jednej osoby: dlaczego to mniej logistyki | WYDARZENIA / event manager / poradnik / rozważanie zakupu | /uslugi/eventy-reportaze | brak | Woohoo; Opisz projekt / Sprawdź termin i cenę |
| obsluga-foto-wideo-eventu-firmowego — Jak zaplanować kompleksową obsługę foto-wideo eventu firmowego | WYDARZENIA / event manager / poradnik / rozważanie zakupu | /uslugi/eventy-reportaze | brak | Woohoo; Opisz projekt / Sprawdź termin i cenę |
| pakiet-foto-wideo-czy-osobno — Pakiet foto + wideo + dron czy usługi osobno: co się bardziej opłaca firmie | WYDARZENIA / event manager / poradnik / rozważanie zakupu | /uslugi/eventy-reportaze | brak | Woohoo; Opisz projekt / Sprawdź termin i cenę |
| zdjecia-z-drona-dla-deweloperow — Zdjęcia z drona dla deweloperów i nieruchomości: jak pokazać inwestycję z lotu ptaka | OBIEKTY / deweloper, marketing / poradnik / rozważanie zakupu | /uslugi/nieruchomosci-przemysl | brak | Yes Butcher, wyłącznie w kontekście obiektu; Opisz projekt / Sprawdź termin i cenę |
| ile-kosztuje-film-z-drona — Ile kosztuje film z drona dla firmy i od czego zależy cena | OBIEKTY / deweloper, marketing / koszt i zakup | /uslugi/nieruchomosci-przemysl | brak | Yes Butcher, wyłącznie w kontekście obiektu; Opisz projekt / Sprawdź termin i cenę |
| jak-wybrac-fotografa-na-event — Jak wybrać fotografa na event firmowy: checklista przed konferencją lub galą | WYDARZENIA / event manager / poradnik / rozważanie zakupu | /uslugi/eventy-reportaze | brak | Woohoo; Opisz projekt / Sprawdź termin i cenę |
| live-editing-na-evencie — Live editing na evencie: zdjęcia w social mediach jeszcze tego samego dnia | WYDARZENIA / event manager / poradnik / rozważanie zakupu | /uslugi/eventy-reportaze | brak | Woohoo; Opisz projekt / Sprawdź termin i cenę |
| headshoty-zespolu-w-jeden-dzien — Headshoty całego zespołu w jeden dzień: jak to zorganizować bez chaosu | LUDZIE / HR, marketing / poradnik / rozważanie zakupu | /uslugi/wizerunek-portrety | brak | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| spojne-portrety-zespolu — Spójne portrety zespołu: dlaczego warto fotografować wszystkich w jednym standardzie | LUDZIE / HR, marketing / poradnik / rozważanie zakupu | /uslugi/wizerunek-portrety | /portfolio/idcom-headshoty-zespolu | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |
| ile-kosztuje-film-promocyjny — Ile kosztuje film promocyjny dla firmy i od czego zależy cena | LUDZIE / HR, marketing / koszt i zakup | /uslugi/wizerunek-portrety | brak | IDcom (portrety) / Woohoo (formaty wideo); Opisz projekt / Sprawdź termin i cenę |

## Global search — snapshot tekstowych plików src/ i public/

Wynik obejmuje kod, tekst, komentarze i nazwy plików. Liczby są liczbą pasujących linii, nie liczbą widocznych deklaracji. Dla fraz częstych pokazano pierwszych 8 referencji; szczegółowe istotne deklaracje opisano w findingach. Nie usuwać mechanicznie „jednej osoby” w kontekście osoby fotografowanej.

| Fraza | Linie | Pierwsze referencje |
|---|---:|---|
| Useme | 13 | src/app/polityka-prywatnosci/page.tsx:129; src/app/polityka-prywatnosci/page.tsx:130; src/components/Testimonials.tsx:7; src/components/Testimonials.tsx:62; src/components/ThemeProvider.tsx:3; src/components/ThemeProvider.tsx:65; src/components/Warunki.tsx:58; src/data/faq.ts:61 |
| RAW | 292 | src/app/api/contact/route.ts:26; src/app/api/contact/route.ts:41; src/app/api/contact/route.ts:45; src/app/api/contact/route.ts:66; src/app/api/contact/route.ts:140; src/app/api/gallery-editor/route.ts:72; src/app/api/gallery-editor/route.ts:121; src/app/api/lead/route.ts:27 |
| 700 zł | 6 | src/data/services.tsx:96; src/data/services.tsx:768; src/data/services.tsx:838; src/data/services.tsx:1374; public/llms.txt:18; public/llms.txt:36 |
| 700 | 10 | src/app/global-error.tsx:52; src/app/globals.css:64; src/app/layout.tsx:17; src/app/uslugi/[slug]/page.tsx:273; src/data/services.tsx:96; src/data/services.tsx:768; src/data/services.tsx:838; src/data/services.tsx:1374 |
| 250 000 | 5 | src/components/About.tsx:111; src/components/About.tsx:119; src/components/About.tsx:125; src/components/CountUp.tsx:20; src/components/CountUp.tsx:21 |
| 250000 | 2 | src/components/About.tsx:130; src/components/TrustStats.tsx:10 |
| 100+ | 10 | src/components/CTA.tsx:424; src/components/CTA.tsx:427; src/components/CTA.tsx:433; src/components/Hero.tsx:162; src/components/Hero.tsx:167; src/components/Hero.tsx:179; src/components/Hero.tsx:180; src/components/TrustLine.tsx:1 |
| 1000+ | 1 | src/components/About.tsx:110 |
| 8+ | 0 | — |
| jedna osoba | 18 | src/components/ServiceGalleryStrip.tsx:202; src/data/blog.ts:1284; src/data/blog.ts:1285; src/data/blog.ts:1292; src/data/blog.ts:1304; src/data/blog.ts:1306; src/data/blog.ts:1307; src/data/blog.ts:1338 |
| jednej osoby | 31 | src/app/layout.tsx:61; src/app/layout.tsx:90; src/app/layout.tsx:187; src/components/Hero.tsx:112; src/components/Hero.tsx:120; src/components/Services.tsx:21; src/components/Services.tsx:25; src/components/Services.tsx:29 |
| od jednej osoby | 16 | src/app/layout.tsx:61; src/app/layout.tsx:90; src/app/layout.tsx:187; src/components/Hero.tsx:112; src/components/Hero.tsx:120; src/components/Services.tsx:21; src/components/Services.tsx:25; src/components/Services.tsx:29 |
| robię sam | 2 | src/components/ServiceAuthor.tsx:59; src/components/TrustLine.tsx:39 |
| jeden twórca | 14 | src/app/layout.tsx:61; src/app/layout.tsx:90; src/app/uslugi/page.tsx:109; src/components/About.tsx:72; src/components/TrustLine.tsx:26; src/components/TrustLine.tsx:29; src/data/blog.ts:1288; src/data/blog.ts:1298 |
| twórca wideo | 6 | src/app/api/lead/route.ts:104; src/app/layout.tsx:321; src/app/layout.tsx:329; src/components/Footer.tsx:21; src/components/Hero.tsx:279; src/components/ServiceAuthor.tsx:32 |
| wizerunek | 118 | src/app/api/contact/route.ts:102; src/app/api/contact/route.ts:113; src/app/api/contact/route.ts:114; src/app/feed.xml/route.ts:50; src/app/galeria/page.tsx:38; src/app/galeria/page.tsx:40; src/app/galeria/page.tsx:51; src/app/kontakt/page.tsx:73 |
| Zacznijmy budować | 3 | src/components/CTA.tsx:39; src/components/CTA.tsx:46; src/data/services.tsx:216 |
| Zapytaj o ofertę | 25 | src/app/blog/[slug]/page.tsx:327; src/app/galeria/page.tsx:32; src/app/galeria/page.tsx:259; src/app/portfolio/[slug]/page.tsx:138; src/app/portfolio/page.tsx:113; src/app/uslugi/[slug]/page.tsx:302; src/app/uslugi/[slug]/page.tsx:310; src/app/uslugi/[slug]/page.tsx:384 |
| Sprawdź termin | 0 | — |
| Masz podobny projekt | 1 | src/components/Portfolio.tsx:154 |
| Michelin | 30 | src/app/galeria/page.tsx:144; src/app/portfolio/page.tsx:89; src/components/Portfolio.tsx:30; src/components/Publications.tsx:21; src/components/Publications.tsx:75; src/components/Publications.tsx:79; src/components/Publications.tsx:82; src/components/Publications.tsx:87 |
| Forte | 8 | src/app/layout.tsx:329; src/components/About.tsx:101; src/components/LogoBar.tsx:15; src/components/Publications.tsx:44; src/components/Publications.tsx:58; src/components/Publications.tsx:61; public/llms.txt:10; public/llms.txt:11 |
| Big Furniture | 6 | src/components/Publications.tsx:32; src/components/Publications.tsx:39; src/components/Publications.tsx:44; src/components/Publications.tsx:55; src/components/Publications.tsx:61; public/llms.txt:11 |
| Woohoo | 37 | src/app/layout.tsx:329; src/components/About.tsx:102; src/components/GalleryView.tsx:257; src/components/LogoBar.tsx:17; src/components/Portfolio.tsx:17; src/components/Portfolio.tsx:28; src/components/ServiceGalleryStrip.tsx:226; src/components/Testimonials.tsx:14 |
| Autopay | 18 | src/components/GalleryView.tsx:257; src/components/Portfolio.tsx:17; src/components/Portfolio.tsx:28; src/data/blog.ts:752; src/data/blog.ts:1073; src/data/blog.ts:1088; src/data/blog.ts:1103; src/data/galeria.ts:8 |
| Yes Butcher | 26 | src/app/galeria/page.tsx:144; src/components/Portfolio.tsx:15; src/components/Publications.tsx:75; src/components/Publications.tsx:82; src/components/Publications.tsx:87; src/components/Publications.tsx:98; src/data/portfolio.ts:364; src/data/portfolio.ts:365 |
| Artech | 54 | src/components/GalleryView.tsx:264; src/components/GalleryView.tsx:267; src/components/Portfolio.tsx:15; src/components/Portfolio.tsx:31; src/components/ServiceGalleryStrip.tsx:227; src/data/blog.ts:424; src/data/blog.ts:428; src/data/blog.ts:449 |
| Santander | 11 | src/app/blog/page.tsx:16; src/app/blog/page.tsx:29; src/app/blog/page.tsx:44; src/app/layout.tsx:43; src/app/layout.tsx:329; src/app/portfolio/page.tsx:24; src/components/About.tsx:85; src/components/LogoBar.tsx:10 |
| H&M | 13 | src/app/blog/page.tsx:16; src/app/blog/page.tsx:29; src/app/blog/page.tsx:44; src/app/layout.tsx:43; src/app/layout.tsx:329; src/app/portfolio/page.tsx:24; src/components/About.tsx:85; src/components/LogoBar.tsx:9 |
| John Deere | 6 | src/app/layout.tsx:329; src/app/portfolio/page.tsx:24; src/components/About.tsx:86; src/components/LogoBar.tsx:12; src/data/services.tsx:349; public/llms.txt:10 |
| Warner | 10 | src/app/blog/page.tsx:16; src/app/blog/page.tsx:29; src/app/blog/page.tsx:44; src/app/layout.tsx:329; src/app/portfolio/page.tsx:24; src/components/About.tsx:85; src/components/LogoBar.tsx:11; src/data/services.tsx:349 |
| Polska i Europa | 11 | src/app/kontakt/page.tsx:18; src/app/kontakt/page.tsx:23; src/app/kontakt/page.tsx:38; src/app/kontakt/page.tsx:49; src/app/layout.tsx:65; src/app/layout.tsx:94; src/app/layout.tsx:191; src/app/portfolio/page.tsx:29 |
| licencja | 22 | src/app/poradnik/page.tsx:80; src/components/CTA.tsx:257; src/components/Warunki.tsx:11; src/components/Warunki.tsx:91; src/data/blog.ts:216; src/data/blog.ts:438; src/data/blog.ts:522; src/data/blog.ts:585 |
| licencja komercyjna | 7 | src/app/poradnik/page.tsx:80; src/components/CTA.tsx:257; src/data/blog.ts:216; src/data/blog.ts:522; src/data/blog.ts:680; src/data/blog.ts:782; src/data/services.tsx:552 |
| bez limitu czasu | 3 | src/components/CTA.tsx:257; src/data/services.tsx:552; src/data/services.tsx:562 |
| pola eksploatacji | 5 | src/data/blog.ts:651; src/data/portfolio.ts:665; src/data/services.tsx:1071; src/data/services.tsx:1131; src/data/services.tsx:1156 |
| 2,50 | 16 | src/components/Warunki.tsx:114; src/data/blog.ts:221; src/data/blog.ts:439; src/data/blog.ts:529; src/data/blog.ts:695; src/data/blog.ts:785; src/data/blog.ts:1178; src/data/blog.ts:1271 |
| kilometr | 14 | src/components/PricingExplainer.tsx:46; src/data/blog.ts:221; src/data/blog.ts:439; src/data/blog.ts:695; src/data/blog.ts:785; src/data/blog.ts:1178; src/data/blog.ts:1467; src/data/blog.ts:1530 |
| odwołanie | 6 | src/components/About.tsx:98; src/components/Warunki.tsx:99; src/components/Warunki.tsx:102; src/data/faq.ts:15; src/data/faq.ts:79; public/llms.txt:30 |
| niestawienie | 3 | src/components/Warunki.tsx:102; src/data/faq.ts:79; public/llms.txt:30 |
| galeria?kat | 15 | src/app/galeria/page.tsx:30; src/components/GalleryView.tsx:132; src/components/ServiceGalleryStrip.tsx:279; src/data/blog.ts:126; src/data/blog.ts:222; src/data/blog.ts:266; src/data/blog.ts:850; src/data/blog.ts:910 |
| kalkulator | 0 | — |
| cennik | 38 | src/app/blog/[slug]/page.tsx:275; src/app/layout.tsx:209; src/app/page.tsx:62; src/app/page.tsx:71; src/app/poradnik/page.tsx:261; src/components/PricingExplainer.tsx:12; src/components/PricingExplainer.tsx:81; src/components/Process.tsx:56 |

## Poza zakresem / external follow-up

- GSC: obecne query→page, wzrost/spadek po konsolidacji, device split, canonical selected by Google, Coverage. Historia z promptu nie dowodzi obecnego stanu.
- Host: http/https/www oraz stara domena muszą być sprawdzone live i w Vercel; kod root canonical jest poprawny.
- Google Business Profile: aktualne kategorie, usługi, opis, zdjęcia, NAP, link i realna liczba opinii. Około 10 → cele 30, potem 50+ to plan właściciela, nie aktualny pomiar.
- Backlink opportunities: realne publikacje Big Furniture/Forte, Yes Butcher/Michelin, Woohoo/ICEA/Autopay, Artech, IDcom. Prośba o atrybucję tylko przy realnie opublikowanym materiale; nic nie wysłano.
- External cleanup: Google/Instagram KEEP+UPDATE; LinkedIn/Oferteo/Flickr/stare bio AUDIT→UPDATE/REMOVE zależnie od kontroli profilu; marcinszabunia.pl KEEP REDIRECT+MONITOR. Nie modyfikowano kont.

## Pliki utworzone

- docs/sesje/MASTER-SEO-BASELINE-2026-09-12.md — ten raport.

Brak zmian w kodzie aplikacji, konfiguracji, warunkach prawnych i cenach. Lint/build/smoke nie uruchamiane w tym niezależnym module read-only; wynik należy do raportu głównego.
