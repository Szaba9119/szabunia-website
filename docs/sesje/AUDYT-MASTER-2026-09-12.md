# Audyt MASTER — stan przed modyfikacjami, 12.09.2026

**Audyt nie zmienia kodu aplikacji.** Raport i poniższy rejestr powstały przed implementacją. Stan: czyste `main`, HEAD `c9176bf42d1529292ba77f3e1a13651cd7b1c445`. Plan: PLAN-AUDYT-MASTER-2026-09-12.md. Szczegółowe dowody i numery linii: MASTER-TECH-BASELINE, MASTER-SEO-BASELINE, MASTER-BRAND-BASELINE. Priorytety P0/P1 z briefu oznaczają kolejność pracy, nie stwierdzenie krytycznej awarii produkcji.

Wstępny wynik: istniejąca architektura jest do zachowania. Lint 0/0, TypeScript i produkcyjny build PASS (57 generowanych stron). Publiczne URL/metadata/canonical są w większości poprawne. Bez pomiaru CrUX/GSC nie deklarujemy poprawy pozycji ani wydajności. Publiczna strona ma zgodną podstawową treść z repo, ale SHA wdrożenia nie został zweryfikowany w panelu.

## Różnice wobec wcześniejszych założeń

Cztery filary, trzy zakresy wyceny, live editing, drugi operator, mobilne studio, publikacje i linki case→usługa już istnieją. Nie trzeba ich wymyślać. Publiczny cennik usunięto 14.08; AGENTS opisuje starszy stan. Filtry galerii już mają canonical /galeria. Polityka używa aktualnego menu. /kalkulator to redirect, /cennik i /o-mnie nie są odrębnymi stronami; O mnie to kotwica. Internal links do dawnych usług już naprawiono. Wykryto stare ceny w llms, niespójny język jednego wykonawcy, niekontrolowane błędy walidacji API i braki metadanych case.

## Rejestr wszystkich punktów briefu

Statusy opisują stan początkowy. Szczegółowy wynik wdrożenia zostanie zapisany osobno. GOTOWE przy zasadzie oznacza zgodność sposobu pracy, nie deklarację ukończenia całego projektu. Pozycje zewnętrzne mają status decyzji, bo wymagają danych właściciela lub kont, a nie implementacji w repo.

| ID | ZADANIE | OBECNY STAN | STATUS | LOKALIZACJA | RYZYKO | PLAN |
|---|---|---|---|---|---|---|
| 001 | LOKALIZACJA PROJEKTU | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 002 | GŁÓWNY CEL | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 003 | STRATEGICZNY KIERUNEK MARKI | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 004 | GŁÓWNA ARCHITEKTURA OFERTY | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 005 | ROBOCZY BRAND PROPOSITION | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 006 | WEWNĘTRZNE ZASADY MARKI | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 007 | NAJWAŻNIEJSZA ZASADA PRACY | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 008 | AUTONOMIA | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 009 | ETAP 0 - PEŁNA INSPEKCJA REPOZYTORIUM | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 010 | GIT | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 011 | URUCHOM PROJEKT | npm, Next 16.2.10; dev działa; lint/tsc/build PASS | GOTOWE | package.json; next.config.ts | Ostrzeżenie root lockfile | Ustawić właściwy root bez nowej zależności |
| 012 | ROUTE AUDIT | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 013 | DESKTOP + MOBILE BASELINE | 13 tras w 1440/390, home także 1024/768/430: bez overflow; menu działa | CZĘŚCIOWO GOTOWE | components; browser baseline | Brak realnego CrUX | Po zmianach pełny smoke i dark mode |
| 014 | GLOBAL SEARCH W REPO | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 015 | RAPORT PRZED MODYFIKACJAMI | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 016 | KONTEKST SEO Z GOOGLE SEARCH CONSOLE | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 017 | NIE RÓB SEO REVOLUTION | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 018 | HOMEPAGE JEST WAŻNYM SEO ASSETEM | Zapisano title/description/H1/H2/linki/copy | GOTOWE | MASTER-HOMEPAGE-BEFORE-2026-09-12.json | Home jest aktywem SEO | Zachować title, description, H1 i odsyłacze usług |
| 019 | GŁÓWNA INTENCJA HOMEPAGE | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 020 | PRIORYTET SEO: POZYCJE 10-20 | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 021 | CTR | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 022 | FOTOGRAFIA BIZNESOWA - KEYWORD OWNERSHIP | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 023 | SESJE ZESPOŁOWE | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 024 | CENA SESJI WIZERUNKOWEJ | 700 zł usunięto z artykułu wcześniej; lead zaczyna od zależności | WYMAGA DECYZJI WŁAŚCICIELA | src/data/blog.ts | Brak aktualnej kwoty | Poprawić krótką odpowiedź; kwota OWNER INPUT REQUIRED |
| 025 | PRODUKTY / PACKSHOT | Packshot w treści, brak w H1/title | CZĘŚCIOWO GOTOWE | src/data/services.tsx | Bez migracji URL | Dopisać packshot naturalnie, zachować wideo |
| 026 | TRANSAKCYJNOŚĆ PACKSHOTÓW | Istniejący system sprawdzony w module tematycznym | WYMAGA DECYZJI WŁAŚCICIELA | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 027 | FOTOGRAFIA PRZEMYSŁOWA | Blog ma wyniki historyczne; błędna karta usługi produktowej | CZĘŚCIOWO GOTOWE | src/data/blog.ts | Kanibalizacja nowego URL | Powiązać z obiektami; nowy landing kandydatem po GSC |
| 028 | PRECYZYJNE LANDINGI SEO VS CZTERY FILARY | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 029 | NIE PRZESADZAJ Z KONSOLIDACJĄ | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 030 | INTERNAL LINKS DO STARYCH URL-I | 0 aktywnych wewnętrznych linków do dawnych 7 URL | GOTOWE | MASTER-SEO-BASELINE-2026-09-12.md | Nie usuwać redirectów | Zachować 308; historyczne 301 to nazwa w dokumentacji |
| 031 | CANONICAL + TRACKING PARAMS | Czyste canonical na stronach i galerii | GOTOWE | src/app/* | Brak wykazanego defektu | Test tracking query przed/po |
| 032 | HTTP / HTTPS / WWW | HTTP non-www jeden skok; HTTP www dwa skoki; HTTPS www jeden | CZĘŚCIOWO GOTOWE | Publiczny odczyt HTTP 12.09.2026 | Konfiguracja platformy poza repo | Backlog Vercel: jeden redirect HTTP www |
| 033 | DESKTOP VS MOBILE - ANOMALIA GSC | Brak świeżego eksportu query/device | CZĘŚCIOWO GOTOWE | Brief użytkownika | Nie interpretować query mix jako problem layoutu | GSC FOLLOW-UP |
| 034 | P0 TECHNICZNE - GALERIA | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 035 | P0 - DUPLIKOWANY DOM | Hero, LogoBar, Process, Testimonials mają warianty responsive | CZĘŚCIOWO GOTOWE | src/components; src/app/page.tsx | To nie naruszenie WCAG samo w sobie | Jeden DOM + responsive CSS, klony aria-hidden |
| 036 | P0 - LEGACY ROUTES | Kalkulator usunięty i redirect; /cennik nie jest stroną; edytor bez guard | CZĘŚCIOWO GOTOWE | src/app/galeria/edytor/page.tsx | Edytor API zablokowane na prod | Guard production/noindex edytora |
| 037 | POLITYKA PRYWATNOŚCI | Aktualne Navigation i Footer na polityce | GOTOWE | src/app/polityka-prywatnosci/page.tsx | Nie przepisywać prawa | Zachować treść; zgody sprawdzić osobno |
| 038 | USEME | Useme w FAQ/warunkach/llms; brak w głównym hero | WYMAGA DECYZJI WŁAŚCICIELA | src/data/faq.ts; components/Warunki.tsx | Aktualność rozliczeń niepotwierdzona | OWNER INPUT REQUIRED |
| 039 | MODEL LICENCJI | Bez limitu czasu vs wycena pól i podmiotów trzecich | WYMAGA WERYFIKACJI PRAWNEJ | MASTER-BRAND-BASELINE-2026-09-12.md | Decyzja prawna/biznesowa | Mapa niespójności; bez zmiany modelu |
| 040 | PUBLICZNE WARUNKI W GALERII | RAW/kary/licencje renderowane w galerii | CZĘŚCIOWO GOTOWE | src/app/galeria/page.tsx; components/Warunki.tsx | Warunki nie mogą zniknąć bez kontekstu | Przenieść istniejący blok do kontaktu bez przepisywania |
| 041 | ZMIANA CORE PROMISE | Wiele claimów jednoosobowej realizacji; duże projekty mają operatora | CZĘŚCIOWO GOTOWE | TrustLine; ServiceAuthor; services; blog | Nie zmieniać historycznych faktów/cytatów | Jeden partner i odpowiedzialność Marcina |
| 042 | HOMEPAGE FLOW | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 043 | CTA SYSTEM | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 044 | GLOBALNY FORMULARZ | Wspólny CTA; nagłówek o wizerunku dla każdej branży | CZĘŚCIOWO GOTOWE | src/components/CTA.tsx | Bez nowych SLA | Opowiedz mi o projekcie |
| 045 | DYNAMICZNY FORMULARZ | Formularz ma usługę i termin, brak krótkiego pola zakresu | CZĘŚCIOWO GOTOWE | src/components/CTA.tsx; api/contact | Nie zwiększać wymaganych pól | Jedno opcjonalne pytanie zależne od filaru |
| 046 | TRZY WARIANTY WYCENY JUŻ ISTNIEJĄ | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 047 | "CO BIORĘ NA SIEBIE" | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 048 | RELIABILITY JUŻ ISTNIEJE | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 049 | CASE STUDIES | Centralny CaseStudy już istnieje, brak jawnych metadanych | CZĘŚCIOWO GOTOWE | src/data/portfolio.ts | Nie wymyślać liczb/dat | Rozszerzyć opcjonalne pola; zasilić realnymi danymi |
| 050 | PRODUCTION FACTS | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 051 | WHERE IT WENT | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 052 | TRUSTED BY VS PUBLISHED | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 053 | KONTEXTOWY PROOF | Istniejący system sprawdzony w module tematycznym | WYMAGA DECYZJI WŁAŚCICIELA | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 054 | TEAM VISUAL STANDARD | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 055 | PRODUCT VISUAL STANDARD | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 056 | EVENT LIVE | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 057 | CONTENT DAY | Istniejący system sprawdzony w module tematycznym | WYMAGA DECYZJI WŁAŚCICIELA | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 058 | CYKLICZNA WSPÓŁPRACA | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 059 | DLA AGENCJI | Istniejący system sprawdzony w module tematycznym | WYMAGA DECYZJI WŁAŚCICIELA | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 060 | PORTFOLIO | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 061 | PHOTO EDITING | Brak kuracji całego zbioru A/B/C/D | CZĘŚCIOWO GOTOWE | public/images | Nazwy plików nie są oceną obrazu | Ocenić wybrane kadry wizualnie; bez kasowania |
| 062 | DESIGN DIRECTION | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 063 | DISTINCTIVE ASSETS | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 064 | BRAND VOCABULARY | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 065 | COPY | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 066 | BLOG - KEYWORD MAP | 26 wpisów zmapowanych do usług; mapa keyword w raporcie | CZĘŚCIOWO GOTOWE | MASTER-SEO-BASELINE-2026-09-12.md | Kanibalizacja wymaga GSC | Dodać kontekstowe case tam, gdzie pasują |
| 067 | BLOG - "JEDNA OSOBA" | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 068 | INTERNAL LINKING | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 069 | CASE STUDY DATABASE | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 070 | PROOF DATABASE | Klienci/opinie/liczby rozproszone w komponentach | CZĘŚCIOWO GOTOWE | LogoBar; Testimonials; About | Cytatów nie skracać merytorycznie | Centralne dane proof bez zmiany wartości |
| 071 | `250 000 zdjęć` | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 072 | STRUCTURED DATA | ProfessionalService, Person, WebSite i Service już są | CZĘŚCIOWO GOTOWE | layout.tsx; blog/[slug]/page.tsx | Nie zmieniać rating/cen | Spiąć blog author/publisher istniejącymi @id |
| 073 | IMAGES | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 074 | VIDEO | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 075 | TYPOGRAPHY | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 076 | MOTION | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 077 | ACCESSIBILITY | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 078 | PERFORMANCE | Brak pomiaru CrUX; wydajność oceniana z kodu | CZĘŚCIOWO GOTOWE | next/image; next/font; YouTubeFacade | Nie deklarować punktów Lighthouse | DO SPRAWDZENIA NA PRODUKCJI |
| 079 | ANALYTICS | Zdarzenia CTA/form/tel/email są; direct gtag gate do sprawdzenia | CZĘŚCIOWO GOTOWE | ContactClickTracker; gtag; CookieConsent | Nie duplikować konwersji Ads | Gating consent i page-context dla usług/case |
| 080 | ATTRIBUTION | UTM zapisywane niezależnie od zgody | CZĘŚCIOWO GOTOWE | src/lib/utm.ts | Zgodność oczekiwania z odmową | Zapis/odczyt tylko po accepted; czyszczenie po odmowie |
| 081 | LOCAL SEO - GOOGLE REVIEWS | Istniejący system sprawdzony w module tematycznym | WYMAGA DECYZJI WŁAŚCICIELA | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 082 | GOOGLE BUSINESS PROFILE | Istniejący system sprawdzony w module tematycznym | WYMAGA DECYZJI WŁAŚCICIELA | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 083 | BACKLINK AUTHORITY | Istniejący system sprawdzony w module tematycznym | WYMAGA DECYZJI WŁAŚCICIELA | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 084 | CASE STUDIES JAKO LINKABLE ASSETS | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 085 | EXTERNAL BRAND CLEANUP | Istniejący system sprawdzony w module tematycznym | WYMAGA DECYZJI WŁAŚCICIELA | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 086 | MASTER DESCRIPTION | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 087 | RZECZY, KTÓRYCH NIE MOŻESZ WYMYŚLIĆ | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 088 | NIE UŻYWAJ SZTUCZNEGO "MY" | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 089 | NIE OVERENGINEERUJ | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 090 | COMPONENT ARCHITECTURE | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 091 | KOLEJNOŚĆ WDRAŻANIA | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 092 | P0 - FINALNA LISTA PRIORYTETÓW | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 093 | P1 - NAJWIĘKSZY WPŁYW | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 094 | P2 | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 095 | P3 | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 096 | TESTY PO KAŻDYM ETAPIE | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 097 | RAPORTUJ POSTĘP | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 098 | FINALNA KONTROLA HOMEPAGE | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 099 | FINALNA KONTROLA SERVICE PAGE | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 100 | FINALNA KONTROLA CASE STUDY | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 101 | FINALNA KONTROLA SKALOWALNOŚCI | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 102 | FINALNY RAPORT SEO | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 103 | FINALNY RAPORT PROJEKTU | Istniejący system sprawdzony w module tematycznym | CZĘŚCIOWO GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować zgodne elementy; wdrożyć uzasadnione uzupełnienia |
| 104 | DEFINICJA SUKCESU | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 105 | OSTATECZNA ZASADA | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |
| 106 | START | Istniejący system sprawdzony w module tematycznym | GOTOWE | MASTER-SEO / BRAND / TECH-BASELINE | Brak nowych faktów bez źródła | Zachować i zweryfikować po zmianach |

## Baseline UI i techniczny

Home, 900 px wysokości viewportu: 1440 → scrollHeight 9721; 1024 → 9533; 768 → 9653; 430 → 12319; 390 → 12669. Brak poziomego overflow na wszystkich pięciu szerokościach. 12 dalszych tras (hub/usługi/portfolio/case/blog/kontakt/galeria/polityka/poradnik) sprawdzono na 1440 i 390: po jednym H1 i main, poprawne canonical, brak overflow. Menu mobile otwiera się i skupia fokus na pierwszym linku; Escape zamyka. Cookie decline działa. Obrazy hero były początkowo w trakcie wczytywania, po załadowaniu są widoczne; ukryty obraz About nie jest uszkodzonym widocznym assetem. Ostrzeżenia przeglądarki: LCP obraz hubu i pozycja rodzica fill w portfolio wymagają weryfikacji po ustabilizowaniu CSS. Brak błędów React/hydration w zebranej konsoli.

## Zakres wykonawczy po diagnozie

P0: walidacja JSON, kontrola awarii limitera i dostarczania poradnika; consent/UTM; guard edytora; zachowanie query galerii; jeden DOM hero/logo/proces/opinie; llms zgodne z modelem wyceny; warunki przeniesione do kontekstu kontaktu. P1: zachować home SEO; brand/CTA, filary i kontekst proof, case model, packshot title/H1, blog przemysłowy i cena, kontekstowe linki case, jedno pytanie formularza. P2/P3: wspólne dane proof, entities, metadane i daty, reduced motion, kontrola dostępności i obrazów, backlog zewnętrzny. Nowe landingi przechodzą test dowodów; nie publikować automatycznie. Bez zmiany cen/licencji/nowych produktów.

## Czego nie potwierdzono

Świeże GSC/device/query i GBP, GA4/Ads cele, rzeczywista dostarczalność i CRM, dane polisy/certyfikatów, aktualność liczb, warunki prawne, CrUX. Nie wysyłano wiadomości ani formularzy do osób trzecich. Nie publikowano strony. Dalsza weryfikacja ma korzystać z izolowanych atrap dla wysyłki.
