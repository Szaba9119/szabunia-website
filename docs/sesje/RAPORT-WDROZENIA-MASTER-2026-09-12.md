# SZABUNIA.PL — raport wdrożenia MASTER

**Prace: 12–13.09.2026 · lokalna wersja gotowa do przeglądu · bez publikacji**

> Aktualizacja 13.09.2026: raport opisuje zamknięty etap lokalny, nie ukończenie wszystkich 106 punktów MASTER. Późniejsze decyzje użytkownika: „Foto · Wideo · Dron” i CTA „Zapytaj o ofertę”. Poprawki mobilne oraz menu opisują raporty UI-UX-DOPRACOWANIE i CTA-I-MENU. Aktualne braki i diagnoza podglądu zdjęć: [STATUS-MASTER-I-ZDJECIA-2026-09-13.md](STATUS-MASTER-I-ZDJECIA-2026-09-13.md).

Zrealizowano audyt, poprawki kodu i treści oraz lokalną weryfikację. Strona eksponuje markę SZABUNIA, cztery filary i osobistą odpowiedzialność Marcina. Zachowano działające adresy, główne sygnały SEO homepage oraz istniejące materiały. Decyzje wymagające aktualnych cen, zasad prawnych, danych kont lub nowych materiałów są opisane osobno; nie zostały zastąpione domysłami.

## A. Stan początkowy

- Repo: `marcinszabunia`; gałąź `main`; punkt odniesienia `c9176bf42d1529292ba77f3e1a13651cd7b1c445`; przy rozpoczęciu czyste drzewo.
- Next.js 16.2.10, React 19.2.3, TypeScript, Tailwind 4, npm. Brak nowych zależności i migracji stosu.
- Cztery usługi, 26 artykułów, osiem publicznych stron portfolio (cztery realizacje i cztery galerie), jeden draft Box17. Depricing już wykonany wcześniej na widocznej ofercie.
- Początkowo lint, sprawdzenie typów i build przechodziły. Przy buildzie pojawiała się uwaga o błędnie rozpoznanym katalogu głównym.
- Galeria już miała czysty canonical; siedem starych tras miało przekierowania; nie znaleziono aktywnych linków do tych starych usług. Nie były to awarie wymagające nowej migracji.
- Rzeczywiste problemy: niekontrolowane przypadki API, mylący status poradnika/bota, niespójne ceny w llms, utrata parametrów i stanu historii galerii, rozproszone dane dowodowe oraz język ograniczający skalę do jednej osoby.
- Szczegóły i tabela 106 punktów briefu: [audyt przed zmianami](AUDYT-MASTER-2026-09-12.md). Dokumenty `MASTER-*-BASELINE` opisują stan wyjściowy, a nie listę aktualnie otwartych błędów.

## B. P0 — bezpieczeństwo podstaw i zgodność

### Wykonane

- Galeria korzysta z parametru `kat` jako źródła stanu. Przełączanie zachowuje inne parametry, a cofanie/ponawianie przywraca kategorię. Ponowne kliknięcie aktywnej kategorii nie dokłada wpisu historii. Cofnięcie zamyka otwarty lightbox.
- Jeden obraz hero dla obu rozmiarów ekranu. Jeden zestaw kroków procesu i opinii. Jeden pasek klientów oraz dziewięć nazw bez klonów i automatycznego przewijania. Układ responsywny realizuje CSS.
- Publiczna strona lokalnego edytora w buildzie produkcyjnym zwraca 404/noindex. Jego API nadal zwraca 403; nie osłabiono ochrony zapisu.
- Warunki współpracy przeniesione z galerii do `/kontakt#warunki`; w galerii pozostał odsyłacz. Zachowano ich treść.
- Stare kotwice cenowe usunięte z `llms.txt`, zgodnie z istniejącą wyceną indywidualną.
- Kod prepaint motywu nie przerywa działania przy niedostępnym localStorage.

### Świadomie zachowane / do decyzji

- `/kalkulator` i sześć pozostałych legacy adresów nadal przekierowują trwale. Next zwraca **308**, mimo historycznych komentarzy używających określenia 301.
- Box17 zachowuje dotychczasowy model draft: **200 + noindex**, brak na liście publicznej i w sitemap. Nie został promowany ani odblokowany do indeksowania. Noindex nie oznacza prywatności.
- Treść polityki prywatności i zasady Useme/licencji nie zostały przepisane bez podstaw. Rozbieżności wymagają jednego rozstrzygnięcia właściciela; patrz dokument decyzji.
- Czyste canonicals i poprawne stare przekierowania były już gotowe. Nie dodawano drugiego konkurencyjnego mechanizmu.

## C. P1 — marka, oferta i droga do kontaktu

- Marka w nawigacji i stopce: **SZABUNIA**. Marcin pozostaje autorem, osobą kontaktową i odpowiedzialną za plan oraz jakość.
- Cztery filary w kolejności **01 Ludzie · 02 Wydarzenia · 03 Obiekty · 04 Produkty** na homepage i hubie usług. Foto, wideo i dron opisują możliwości realizacji.
- Hero zachowuje H1, H2 czterech filarów i bazowy opis SEO. Dodaje czytelną linię możliwości oraz obietnicę jednego partnera od briefu do materiału.
- Nowa kolejność homepage: hero → klienci → usługi → realizacje → publikacje → opinie → proces → Marcin → poradnik → FAQ → blog → kontakt.
- Główne CTA: **Sprawdź termin i cenę**. Mobilny pasek ma stałe 44-pikselowe pola ikon i etykietę bez zawijania. Linki poznawcze pozostają opisowe: poznaj usługę, zobacz realizację. Nazwy istniejących zdarzeń analitycznych zachowane.
- W formularzu jedno dodatkowe, opcjonalne pytanie zależne od filaru. Zmiana usługi usuwa poprzednią odpowiedź; serwer ogranicza pole do 200 znaków. „Inne” nie pokazuje zbędnego pytania. Podstrony zachowują właściwą usługę domyślną.
- Trzy zakresy wyceny i rekomendacja wariantu zostały wydobyte w opisie istniejącego procesu, bez tworzenia cennika/pakietów.
- Każda usługa ma „Co biorę na siebie” i kontekstowy dowód w hero: mobilne studio i standard zespołu; plan oraz obsada wydarzenia; koordynacja ujęć obiektu; powtarzalny setup produktów.
- Oferta wizerunkowa ma H1 **Sesje biznesowe i headshoty zespołu**. Ogólną intencję fotografa biznesowego w Poznaniu zachowuje homepage.

## D. P2 — realizacje, SEO i odporność formularzy

- Wspólny model case study obejmuje obszar, materiał, zastosowanie, lokalizację, opcjonalną datę, cel, zakres, fakty produkcyjne, materiały i miejsca wykorzystania. Nieobecne dane nie renderują pustych pól.
- Cztery publiczne realizacje otrzymały metadane na podstawie istniejącego opisu. Woohoo: jeden wieczór, film i trzy reelsy; IDcom: trzy tła; Yes Butcher: jeden dzień i cztery rodzaje zdjęć; Artech: 20 packshotów i film. Brak nowych deklaracji wyniku sprzedażowego lub liczby osób.
- Wybrane realizacje na home mają duży projekt otwierający i trzy mniejsze, z opisem obszaru/materiału. Zachowano kolejność ustaloną wcześniej przez właściciela. Hub odróżnia realizacje klientów od galerii tematycznych.
- Michelin jest miejscem publikacji zdjęć restauracji, nie klientem fotografa. Usunięto symbol gwiazdki z etykiety realizacji; nie przypisano restauracji gwiazdki Michelin.
- Produkt: **Packshoty i fotografia produktowa Poznań | Szabunia** w title; packshot w H1. Zachowano wideo, retusz i różnicę między zdjęciami katalogowymi a aranżowanymi.
- Artykuł cenowy odpowiada od razu: wycena indywidualna, jej czynniki i odpowiedź w 24h. Nie przywrócono 700 zł.
- Artykuł przemysłowy wspiera usługę obiektową; Artech zachowuje rolę dowodu procesu/produktów. Blog prowadzi do konkretnych realizacji w dopasowanych klastrach. Nie wymuszono linku do restauracji w poradnikach o dronie dla inwestycji.
- Dwa artykuły o łączeniu foto/wideo/drona opisują jeden kontakt i skład dobrany do zakresu. Zachowane slugi, wyraźna różnica intencji: organizacja współpracy vs dobór pakietu.
- Oba API kontrolują kształt JSON i typy pól. Własne klucze whitelisty blokują `toString`, `constructor`, `__proto__` i nieznane usługi. Awaria ogranicznika daje kontrolowane 503; rzeczywiste przekroczenie limitu nadal 429.
- Poradnik: serwer osobno raportuje przyjęcie leada i wysłanie poradnika. Bot nie jest liczony jako lead. Odrzucone powiadomienie jest logowane bez treści zgłoszenia; nieudana wysyłka PDF nie wyświetla obietnicy doręczonego maila.

## E. P3 — utrzymanie, dostępność i pomiar

- Klienci, opinie i statystyki w lekkim wspólnym źródle. Liczby zachowane; 250 000 wykonanych zdjęć jest dowodem uzupełniającym w sekcji Marcina, nie główną obietnicą.
- Osobne małe konfiguracje filarów i relacji treści nie wciągają całej bazy usług do komponentu klientowego formularza.
- Blog author/publisher odwołują się do istniejących encji `#person` i `#business`.
- Daty aktualizacji trzech zmienionych artykułów ustawione ręcznie. Sitemap odzwierciedla bieżące zmiany stron; data polityki prywatności pozostała wcześniejsza.
- Przyciski powiększenia wykorzystują opis kadru. Jeden opis produktu uzupełniono po obejrzeniu obrazu. Menu i lightbox zachowują klawiaturę, Escape i powrót fokusu.
- JavaScript respektuje reduced motion przy przewijaniu z menu, FAB i galerii. Opinie są przewijane ręcznie, bez autoplay. Pasek marek jest statyczny.
- Własne zdarzenia i zapis atrybucji wymagają zgody. Odmowa usuwa zapis UTM; zmiana decyzji w innej karcie aktualizuje stan. Nie odtwarza się kliknięć sprzed zgody.
- Dodane `service_view`, `case_study_view` wyłącznie dla czterech publicznych realizacji oraz `guide_download` (oznacza uruchomienie pobrania, nie potwierdzenie zapisania pliku na dysku). Dotychczasowe zdarzenia CTA, telefonu, e-maila, startu formularza i wysłania zachowane.
- Atrybucja po zgodzie obejmuje pierwszą ścieżkę oraz origin referrera, bez query referrera. Parametry `landing_page`/`referrer` z URL nie zastępują tych wartości. Odczyt ogranicza wartości do 200 znaków.
- Google Consent Mode i konfiguracja istniejących narzędzi nie są nowym audytem prawnym wszystkich skryptów. Zmiana dotyczy własnych zdarzeń i własnego zapisu UTM.

## F. Decyzje właściciela

Gotowa lista rozstrzygnięć, rekomendowane dalsze kroki i struktury przyszłych rozwiązań są w [MASTER-DECYZJE-I-DZIALANIA-2026-09-12.md](MASTER-DECYZJE-I-DZIALANIA-2026-09-12.md).

Priorytet: jedna zasada licencji → aktualność Useme/rozliczeń → ewentualne ceny i logistyka produktów → potwierdzenie dokumentów dronowych → dodatkowe fakty realizacji → Content Day / agencje / nowe landingi. Brak tych decyzji nie blokował pozostałych zmian.

## G. Działania zewnętrzne

Przygotowano backlog: prawdziwe opinie (historyczne ~10, cele 30 i 50+), kontrola GBP/NAP, realne możliwości linkowania od klientów i publikacji, Google/Oferteo/Flickr/LinkedIn/Instagram/stare bio/domena w kategoriach KEEP/UPDATE/REMOVE/CLAIM/MONITOR oraz dwa warianty opisu marki.

Nie wykonano zmian na kontach ani kontaktu z osobami trzecimi. Nowy landing przemysłowy pozostaje kandydatem, a nie opublikowaną kopią istniejącej treści.

## H. Status techniczny i QA

| Kontrola | Wynik |
|---|---|
| Lint | PASS, 0 błędów i ostrzeżeń |
| TypeScript | PASS |
| Produkcyjny build | PASS, 57 wygenerowanych stron technicznych i treściowych |
| Izolowane testy formularzy/zgody | **43 PASS**, bez zewnętrznej wysyłki i odczytu sekretów |
| Crawl publicznej sitemap | **46/46 HTTP 200**, po jednym H1 i main, poprawny canonical, brak noindex na publicznych trasach |
| Linki, kotwice i lokalne obrazy z crawla | 0 zerwanych linków, 0 brakujących kotwic, 0 brakujących plików |
| Legacy przekierowania | 7/7 oczekiwanych 308 |
| Edytor produkcyjny | strona 404; API 403 |
| Galeria z parametrami | 200; canonical bez parametrów |
| Homepage SEO | Title, description, canonical i H1 identyczne z baseline |
| Responsywność | Home: 1440/1024/768/430/390; 14 podstron po 1440/390; brak poziomego overflow |
| Formularz w przeglądarce | 4 właściwe pytania; „Inne” bez pytania; reset odpowiedzi; domyślna usługa; walidacja pustego zgłoszenia |
| Mobilny pasek kontaktu | Po końcowej poprawce: CTA 188×44 px, e-mail i telefon po 44×44 px, bez zawijania i overflow przy 390 px |
| Menu i lightbox | otwarcie, Escape, powrót fokusu; filtr galerii i cofnięcie z zachowaniem UTM |
| Motywy | jasny/ciemny działają w sprawdzonych widokach |
| Konsola przy przeglądzie 14 podstron | 0 zarejestrowanych błędów/ostrzeżeń w końcowym przeglądzie |
| Kontrola diffu | bez błędów whitespace; brak zmian zależności, cen umownych i plików instrukcji |

Surowe wyniki: [HTTP i SEO JSON](MASTER-QA-HTTP-2026-09-12.json). Kontrole renderu wykonywano w lokalnym buildzie produkcyjnym; początkowe uruchomienie dev miało problem z restartem procesu, dlatego końcową ocenę oparto na stabilnym `next start`.

### Ograniczenia pomiaru

- To nie jest deklaracja poprawy pozycji, CTR, LCP, INP czy CLS. Nie wykonano końcowego pomiaru Lighthouse/CrUX ani badania ruchu po publikacji.
- Mniej powielonego DOM nie oznacza automatycznie krótszej strony. Przy 390×900 wysokość wzrosła z 12 669 do 13 790 px, głównie przez opisy i metadane realizacji; przy 1440×900 z 9 721 do 9 946 px. To koszt większej ilości kontekstu, do obserwacji po wdrożeniu.
- Nie sprawdzono rzeczywistego doręczenia maila, zapisu CRM, paneli GA4/Ads/GSC ani ustawień domeny na Preview/produkcji. Konieczny krótki test po wdrożeniu na Preview z zatwierdzonym odbiorcą.
- Trzy moduły audytu przygotowały niezależne baseline. Ponowna niezależna kontrola po zmianach była niedostępna z powodu limitu konta agentów; końcowe testy i przegląd wykonał agent główny. Nie oznaczamy tego jako zaliczonej niezależnej recenzji.
- Nie przeprowadzono pełnej selekcji A/B/C/D wszystkich zdjęć. Obejrzano kluczowe kadry w kontekście layoutu; żadnego materiału nie usunięto. Woohoo pozostaje materiałem filmowym, a nie udawaną sesją foto.

## I. Zmienione pliki

Lista poniżej obejmuje kod, testy i dokumentację tej sesji. Zmiany pozostają w drzewie roboczym, bez commita, push ani wdrożenia.

- `docs/sesje/AUDYT-MASTER-2026-09-12.md`
- `docs/sesje/MASTER-BRAND-BASELINE-2026-09-12.md`
- `docs/sesje/MASTER-DECYZJE-I-DZIALANIA-2026-09-12.md`
- `docs/sesje/MASTER-HOMEPAGE-BEFORE-2026-09-12.json`
- `docs/sesje/MASTER-QA-HTTP-2026-09-12.json`
- `docs/sesje/MASTER-SEO-BASELINE-2026-09-12.md`
- `docs/sesje/MASTER-TECH-BASELINE-2026-09-12.md`
- `docs/sesje/PLAN-AUDYT-MASTER-2026-09-12.md`
- `docs/sesje/RAPORT-WDROZENIA-MASTER-2026-09-12.md`
- `next.config.ts`
- `public/llms.txt`
- `scripts/verify-forms.mjs`
- `src/app/api/contact/route.ts`
- `src/app/api/lead/route.ts`
- `src/app/blog/[slug]/page.tsx`
- `src/app/galeria/edytor/page.tsx`
- `src/app/galeria/page.tsx`
- `src/app/kontakt/page.tsx`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/portfolio/[slug]/page.tsx`
- `src/app/portfolio/page.tsx`
- `src/app/sitemap.ts`
- `src/app/uslugi/[slug]/page.tsx`
- `src/app/uslugi/page.tsx`
- `src/components/About.tsx`
- `src/components/CTA.tsx`
- `src/components/ContactClickTracker.tsx`
- `src/components/Footer.tsx`
- `src/components/GalleryView.tsx`
- `src/components/Hero.tsx`
- `src/components/LogoBar.tsx`
- `src/components/MobileFAB.tsx`
- `src/components/Navigation.tsx`
- `src/components/PoradnikForm.tsx`
- `src/components/Portfolio.tsx`
- `src/components/PortfolioCaseStudy.tsx`
- `src/components/PortfolioHero.tsx`
- `src/components/PortfolioVideoShowcase.tsx`
- `src/components/PricingExplainer.tsx`
- `src/components/Process.tsx`
- `src/components/ProjectMetadata.tsx`
- `src/components/ServiceAuthor.tsx`
- `src/components/ServiceHero.tsx`
- `src/components/Services.tsx`
- `src/components/Testimonials.tsx`
- `src/components/TrustLine.tsx`
- `src/data/blog.ts`
- `src/data/contentRelations.ts`
- `src/data/galleryAlts.ts`
- `src/data/portfolio.ts`
- `src/data/proof.ts`
- `src/data/servicePillars.ts`
- `src/data/services.tsx`
- `src/lib/consent.ts`
- `src/lib/gtag.ts`
- `src/lib/utm.ts`

## J. Pozostały backlog

| Priorytet | Zadanie | Warunek / właściciel |
|---|---|---|
| Przed publikacją | Ujednolicić merytorycznie zasady licencji i potwierdzić model rozliczenia | Właściciel + prawnik/księgowość |
| Przed publikacją | Rzeczywista wysyłka kontaktu i poradnika, zapis CRM na Preview | Dostęp do konfiguracji i zatwierdzony odbiorca |
| P1 po publikacji | Zweryfikować mapowanie konwersji Ads/GA4 i SPA, sprawdzić nowe zdarzenia po zgodzie | Panel analityki |
| P1 | Świeży GSC query→page i desktop/mobile, 28/90 dni w porównywalnych segmentach | Eksport GSC |
| P2 | Oddzielny landing przemysłowy / zespołowy tylko przy odrębnej treści i intencji | Materiały + dane GSC |
| P2 | Ceny startowe i wysyłka/zwrot produktów, jeśli mają wrócić publicznie | Aktualne dane właściciela |
| P2 | CRM: trwałość zapisu po odpowiedzi funkcji i kontrola HTTP webhooka | Test integracyjny Preview; dziś best effort |
| P2 | Pomiar CWV po publikacji, ewentualne dalsze odchudzenie mobilnego portfolio | Dane pomiarowe, nie sama wielkość pliku |
| P3 | HTTP www → HTTPS bez www w jednym skoku | Ustawienia domeny/hostingu |
| P3 | Recenzja niezależna, pełna selekcja zdjęć i aktualizacja danych realizacji | Dostępność recenzenta + potwierdzone materiały |

## Końcowa mapa SEO

| Query cluster | Search intent | Primary URL | Secondary / supporting article | Case study |
|---|---|---|---|---|
| fotograf biznesowy Poznań; fotografia biznesowa Poznań | Wybór lokalnego partnera B2B | / | /uslugi; headshoty-linkedin-konwersja | IDcom |
| sesja biznesowa; portret wizerunkowy; LinkedIn/CV | Zamówienie zdjęć osób | /uslugi/wizerunek-portrety | sesja-wizerunkowa-poznan; jak-przygotowac-sie-do-sesji-biznesowej | IDcom |
| sesje zespołowe; zdjęcia pracowników; headshoty | Organizacja zdjęć zespołu | /uslugi/wizerunek-portrety | headshoty-zespolu-w-jeden-dzien; spojne-portrety-zespolu | IDcom |
| ile kosztuje sesja wizerunkowa | Cena i zakres wyceny | /blog/ile-kosztuje-sesja-wizerunkowa-dla-firmy | /uslugi/wizerunek-portrety | IDcom |
| fotografia produktowa; packshot Poznań | Zamówienie materiałów produktu | /uslugi/fotografia-produktowa | fotografia-produktowa-ecommerce; co-to-jest-packshot | Artech |
| co to jest packshot | Wyjaśnienie pojęcia | /blog/co-to-jest-packshot | /uslugi/fotografia-produktowa | Artech |
| zdjęcia przemysłowe; fotografia przemysłowa | Dokumentacja zakładu i procesu | /uslugi/nieruchomosci-przemysl | fotografia-przemyslowa-fabryka | Artech |
| jak pokazać fabrykę | Przygotowanie realizacji | /blog/fotografia-przemyslowa-fabryka | /uslugi/nieruchomosci-przemysl | Artech |
| fotograf eventowy; konferencje; reportaż | Rezerwacja obsługi wydarzenia | /uslugi/eventy-reportaze | jak-wybrac-fotografa-na-event; live-editing-na-evencie | Woohoo + galeria eventowa |
| foto, wideo i dron razem | Sposób organizacji współpracy | /blog/foto-wideo-dron-z-jednego-wejscia | /uslugi/eventy-reportaze | Woohoo |
| pakiet czy osobno | Dobór zakresu | /blog/pakiet-foto-wideo-czy-osobno | /uslugi/eventy-reportaze | Woohoo |
| zdjęcia i film z drona obiektu | Oferta i przygotowanie | /uslugi/nieruchomosci-przemysl | trzy artykuły dronowe i galeria dron | Tylko adekwatny kontekst, bez wymuszonego case |

Mapa jest decyzją redakcyjną. Nie stanowi dowodu kanibalizacji ani przypisania URL przez Google.

### Zachowana mapa przekierowań

| Stary URL | Cel | Aktywne linki do starego URL | Zachować |
|---|---|---|---|
| /uslugi/sesje-zespolowe | /uslugi/wizerunek-portrety | 0 | tak |
| /uslugi/wideo-marketing | /uslugi/wizerunek-portrety | 0 | tak |
| /uslugi/pakiety-foto-wideo | /uslugi/eventy-reportaze | 0 | tak |
| /uslugi/zdjecia-wideo-z-drona | /uslugi/nieruchomosci-przemysl | 0 | tak |
| /uslugi/wnetrza-obiekty-architektura | /uslugi/nieruchomosci-przemysl | 0 | tak |
| /kalkulator | /kontakt | 0 | tak |
| /sesje-prywatne | /kontakt | 0 | tak |

Nowe landingi: analiza i warunki startu w dokumencie decyzji. Pełna wyjściowa mapa 26 artykułów w [baseline SEO](MASTER-SEO-BASELINE-2026-09-12.md); jedyna zmiana przypisania usługi to artykuł przemysłowy → `nieruchomosci-przemysl`. Żaden slug artykułu nie został zmieniony.
