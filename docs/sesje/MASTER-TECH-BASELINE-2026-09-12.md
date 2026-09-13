# MASTER — baseline techniczny, 12.09.2026

**Status:** diagnostyka zakończona; zero zmian kodu, zero wysyłek formularzy. Raport modułu A i części D/B do scalenia przez koordynatora.
**Stan:** HEAD `c9176bf42d1529292ba77f3e1a13651cd7b1c445`; przy rozpoczęciu inspekcji drzewo czyste. Odczyt kodu, AGENTS.md, docs/METODYKA-AUDYTU.md, wcześniejszych audytów 05.08, 10.08 i 11.08.2026.
**Metoda:** inspekcja + izolowane wykonanie oryginalnego kodu tras contact/lead po transpilacji TypeScript. Wszystkie zależności zewnętrzne zastąpiono atrapami; żadnego prawdziwego tokenu, wiadomości, żądania HTTP ani zapisu do CRM. Nie otwierano plików środowiska. Build/dev pozostawione koordynatorowi.
**Walidacja koordynatora:** lint, tsc i build PASS. Przegląd 13 stron na 1440 i 390 px: brak overflow/błędów; dwa ostrzeżenia obrazów wymagają osobnej weryfikacji poniżej.

## Sprawdzone i gotowe

- Cztery sygnały Consent Mode v2 domyślnie denied przed config; zapis accepted przywracany przed config. Jedno ID GA4, kolejka zdarzeń dostępna od początku: `src/app/layout.tsx:140–161`. Loader celowo odroczony; nie utożsamiać tego z brakiem GA4.
- Odrzuć/Akceptuję oraz ponowne otwarcie ustawień cookies działają w kodzie; zmiana ustawia wszystkie cztery sygnały. Niemodalny baner ma poprawną rolę region i świadomy fokus po otwarciu ze stopki: `src/components/CookieConsent.tsx:30–49`, `:73–82`, `:98`.
- Globalny delegat śledzi phone_click, email_click z location i cta_click: `src/components/ContactClickTracker.tsx:24–54`. FAQ wysyła faq_open (`FAQ.tsx:60`), portfolio posiada data-cta (`Portfolio.tsx:103`, `:112`), odtworzenie video ma zdarzenie (`YouTubeFacade.tsx:46`).
- UTM obejmuje również gclid/wbraid/gbraid; backend obcina każde pole do 200 znaków: `src/lib/utm.ts:5–18`, `src/app/api/contact/route.ts:87–92`, `src/app/api/lead/route.ts:75–80`. Historyczne PELNY2608-35 zamknięte w kodzie.
- Formularze posiadają realny honeypot, serwerową zgodę boolean, tekst i timestamp zgody ustalane przez serwer, limity pól serwera i HTML escaping. Contact nie liczy honeypota jako konwersji (`api/contact/route.ts:48–49`, `CTA.tsx:147–153`): PELNY2608-33 zamknięte w kodzie dla contact.
- Rate-limit to oddzielne 8/h i 5/h/IP. Brak konfiguracji jest logowany. Turnstile ma timeout 5 s, klient resetuje token po błędzie i daje alternatywę mailową po zablokowaniu ładowania: `ratelimit.ts:20–34`, `turnstile.ts:23–33`, `TurnstileWidget.tsx:68–71`, `CTA.tsx:784–803`.
- API edytora jest zablokowane w production dla GET, POST i DELETE: `src/app/api/gallery-editor/route.ts:38`, `:55`, `:108`. Nazwy plików i foldery walidowane, kolejność musi być permutacją obecnych plików (`:15–27`, `:79–86`). Nie ma potwierdzonej publicznej możliwości modyfikacji galerii.
- Podstawowe nagłówki są skonfigurowane: CSP, HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP/CORP (`next.config.ts:15–45`, `:73–94`). unsafe-eval wyłącznie dev; unsafe-inline jest świadomym kompromisem, nie nowym findingiem.
- Inter z next/font, latin i latin-ext, display swap (`layout.tsx:15–26`); formaty AVIF/WebP, lista quality i cache w konfiguracji (`next.config.ts:49–57`). Hero ma priority/high/quality72 (`Hero.tsx:277–285`). Film nie ładuje playera przed kliknięciem (`YouTubeFacade.tsx:33–47`). Nie ma dowodu wysokiego LCP z samego rozmiaru pliku.
- ErrorBoundary sekcji homepage zachowane (`src/app/page.tsx:47–93`); lang pl, skip-link, CSS focus/reduced-motion; galerie mają trap, Escape i oddanie fokusu (`GalleryView.tsx:88–90`, `:136–153`).
- Responsywne podwójne HeroPhoto/LogoBar nie są błędem WCAG: warianty są wykluczane przez display:none. LogoBar nie zawiera powielanego id. PoradnikTeaser jest linkiem, nie drugim formularzem, więc shared consent-error nie koliduje z contact na homepage.

## Ustalenia z dowodem

**MASTERTECH2609-01. [TECH] Walidacja dopuszcza nienależyty kształt JSON i właściwości prototypu usługi. · P2 · S · repo · Z (kod + izolowane wykonanie)**
`src/app/api/contact/route.ts:37–48` oraz `src/app/api/lead/route.ts:38–46` przypisują wynik JSON do Record bez sprawdzenia runtime. JSON `null` powoduje uncaught TypeError przy `_gotcha`, zamiast kontrolowanego 400. Dodatkowo contact sprawdza usługę operatorem `in` (`:120`): `service="toString"` przechodzi whitelistę, zwraca funkcję jako label (`:123`) i wywraca escapeHtml (`:166`) przed try obsługującym wysyłkę. Izolowany test potwierdził oba mechanizmy bez wysyłki. Nie jest to wyciek danych ani dowód aktywnego nadużycia.
**Poprawka:** po parse sprawdzić nie-null obiekt niebędący tablicą, walidować typy pól; whitelistę sprawdzać przez `Object.hasOwn(SERVICE_LABELS, service)`. Wspólny test tabelaryczny null/array/primitive/nieznana usługa/toString → 400, zero wywołań maila.

**MASTERTECH2609-02. [TECH] Odrzucenie powiadomienia o pobraniu poradnika nie jest wykrywane. · P2 (P1 przy faktycznej utracie leadów) · S · repo · Z (kod + izolowane wykonanie)**
`src/app/api/lead/route.ts:115–125` wywołuje sendEmail, ale ignoruje Response.ok. Fetch nie rzuca dla HTTP 429/5xx; catch `:126` tego nie wykrywa. Test notification=429, guide=200 zwrócił `{ok:true,guideSent:true}`. Powiadomienie może zginąć bez alertu; CRM jest opcjonalny. Nie potwierdzono wystąpienia na produkcji.
**Poprawka:** zachować Response i sprawdzić status, logować bez danych osobowych marker alertu z nazwą kanału i kodem HTTP. Zwracać klientowi wyłącznie potwierdzony status wysyłki poradnika; niezależność powiadomienia i poradnika zachować. Dla trwałego zabezpieczenia leada osobno ustalić potwierdzony zapis CRM.

**MASTERTECH2609-03. [TECH] Awaria skonfigurowanego Redisa przerywa obie trasy przed kontrolowaną obsługą błędu. · P2 (P1 podczas awarii) · S · repo · Z (kod + izolowane wykonanie)**
`src/lib/ratelimit.ts:49`, `:59` nie przechwytują wyjątków .limit; trasy awaitują je przed jakimkolwiek catch (`api/contact/route.ts:30`, `api/lead/route.ts:31`). Test z odrzuconym Promise potwierdził wyjątek i zero prób wysyłki. Fail-open opisany w kodzie dotyczy tylko brakującej konfiguracji, nie awarii działającego wcześniej Redisa.
**Poprawka:** kontrolowany catch z markerem [ALERT] bez sekretów. Utrzymać spójną z intencją projektu politykę awarii: fail-open dla niedostępności z aktywnym Turnstile/honeypotem albo jawne 503. Uzasadnione preferowane pierwsze; nie mylić błędu infrastruktury z przekroczeniem limitu 429.

**MASTERTECH2609-04. [POMIAR] Honeypot poradnika jest raportowany jako prawdziwy lead i wysłany mail. · P2 · S · repo · Z (kod + izolowane API)**
`src/app/api/lead/route.ts:46–47` zwraca `{ok:true}` i nic nie wysyła. `src/components/PoradnikForm.tsx:65–70` traktuje dowolne 2xx jako sukces, `guideSent` domyślnie true i zawsze emituje generate_lead. Stan sukcesu obiecuje wysłany mail (`:96–98`). Jest to ta sama klasa rozbieżności, już zamknięta w contact. Test potwierdził API 200 przy zero wysyłek.
**Poprawka:** jednoznaczny status zaakceptowania leada i wysłania poradnika; dla honeypota accepted:false i guideSent:false, front emituje konwersję tylko po accepted:true. Zachować neutralną odpowiedź dla bota i publiczny download zgodnie z istniejącą intencją.

**MASTERTECH2609-05. [TECH] Publiczna powłoka lokalnego edytora nie ma blokady produkcyjnej. · P3 · S · repo · Z (kod), N (produkcja)**
`src/app/galeria/edytor/page.tsx:1–4` zawsze renderuje GalleryEditor, bez guard i własnego noindex. Dziedziczy metadata root; po montowaniu odpytuje blokowane API, potem pokazuje komunikat błędu (`GalleryEditor.tsx:25–34`). To ekspozycja nieprzydatnej strony narzędziowej, NIE publiczny dostęp do zapisu.
**Poprawka:** `notFound()` po stronie serwera w production; opcjonalne lokalne metadata noindex. Na produkcji 404, lokalnie edytor nadal działa. Nie zmieniać zasad DELETE/archiwizacji.

**MASTERTECH2609-06. [UX] Część przewijania JS ignoruje ustawienie ograniczonego ruchu. · P3 · S · repo · Z (kod)**
`GalleryView.tsx:114`, `:129`, `Navigation.tsx:132`, `MobileFAB.tsx:78` przekazują jawne behavior:'smooth'. CSS `scroll-behavior:auto!important` (`globals.css:42–50`) nie zastępuje jawnej opcji API. BackToTop i Footer już wybierają auto po matchMedia.
**Poprawka:** zastosować identyczny warunek prefers-reduced-motion w wymienionych handlerach. Nie wyłączać standardowego płynnego scrolla pozostałym użytkownikom. Re-audyt z emulacją reduce: natychmiastowy skok dla CTA i kategorii.

**MASTERTECH2609-07. [UX] Nazwy przycisków zdjęć pomijają treść opisowego alt. · P2 · S · repo · Z (kod)**
`GalleryView.tsx:285` nadaje wszystkim kaflom nazwę „Powiększ zdjęcie N”, która zastępuje nazwę wynikającą z obrazu potomnego mającego `altFor` (`:296`). Nawet po uzupełnieniu altów użytkownik poruszający się między przyciskami nie dostaje treści kadru w nazwie kontrolki.
**Poprawka:** nazwa przycisku np. `Powiększ: ${altFor(activeCat, i)}` z numerem opcjonalnie. Nie tworzyć nowych opisów zdjęć bez obejrzenia plików; to zadanie modułu materiałowego.

## Hipotezy i decyzje do sprawdzenia

- **H-GALLERY:** `GalleryView.tsx:74–76` używa initialActive wyłącznie do inicjalizacji useState. Brak synchronizacji po nawigacji klientowej/back/forward zmieniającej query. `:132` replaceState ponadto zastępuje cały query, usuwając inne parametry. Zweryfikować wejście z usługi, przełączenie kategorii, cofnięcie i kolejne wejście do innego kat bez hard reload. Dopiero reprodukcja pozwala przypisać priorytet. Docelowo URL jako źródło aktywnej kategorii, zachowanie obcych query.
- **H-CRM:** `void pushToCrm` w obu API nie przedłuża jawnie życia funkcji Vercel; `crm.ts:19–24` nie kontroluje HTTP statusu. Potrzebny test opóźnionego webhooka na Preview oraz faktycznego zapisu, zanim potraktujemy CRM jako pewne zabezpieczenie. Nie znamy bieżącej konfiguracji produkcji.
- **N-CONSENT-UTM:** pipeline UTM pozostaje niezależny od wyboru cookies: `ContactClickTracker.tsx:17` zapisuje od razu przez `utm.ts:40`, decline jedynie aktualizuje gtag (`CookieConsent.tsx:79–82`), `getUtmParams` nie kontroluje wyboru i payload wysyła identyfikatory do maila/CRM. Stan techniczny Z; ocena prawna i pożądany zakres zgody wymagają odrębnego rozstrzygnięcia. Nie twierdzimy bez podstawy, że sam Consent Mode bramkuje tę ścieżkę. Możliwy kierunek: zgoda jako wspólne źródło prawdy i czyszczenie zapisanej atrybucji przy odmowie; ryzyko utraty pomiaru trzeba jawnie przyjąć.
- **PELNY2608-05 nadal rozdzielone:** contact_submit vs generate_lead poradnika (`CTA.tsx:151`, `PoradnikForm.tsx:69`). Bez panelu Ads/GA4 nie wiadomo, jaki cel jest podpięty do kampanii. Nie dodawać ślepo drugiej konwersji, bo można zduplikować wyniki i zoptymalizować Ads pod darmowy PDF.
- **PELNY2608-11:** zmiana strony GA4 na nawigacji SPA zależy od Enhanced Measurement/history w panelu. Kod nie daje podstaw do twierdzenia, że aktualne zdarzenia są na pewno przypisane źle.
- **N-CWV:** w tym module nie mierzono LCP/CLS/INP; wartości nieznane. W GalleryView preload sąsiadów (`:163–166`) pobiera oryginalny URL, mimo zoptymalizowanego zdjęcia głównego. Koszt trzeba zmierzyć przed priorytetem optymalizacji.
- **N-OBRAZY:** koordynator zaobserwował ostrzeżenia LCP na hubie usług i position static przy kaflach portfolio. Sprawdzić aktualny render i wielkość wpływu, nie wyprowadzać P1 z samego warningu.
- **P3 reszta PELNY2608-16:** ThemeProvider i CookieConsent mają już try/catch, ale inline prepaint theme (`layout.tsx:166`) nadal go nie ma. Może dać błąd konsoli przy zablokowanym storage; nie ma podstaw do wcześniejszego twierdzenia o utracie całej strony, bo provider jest zabezpieczony.

## Granice i fałszywe pozytywy

Nie sprawdzono paneli GA4/Ads/Resend/CRM, sekretów lub statusu DNS nadawcy, prawdziwej dostarczalności, rzeczywistej konfiguracji origin na Preview ani produkcyjnych ataków. Nie wysłano formularza. Nie zmieniono nagłówków, polityki prywatności, metadanych, ofert, cen, zdjęć ani treści. Surowy HTML nie był używany do diagnoz UI. Nie zgłaszamy responsywnego duplikatu DOM, opóźnionego gtag ani nielicencjonowanej interpretacji prawnej jako awarii.

## Kolejność poprawek i re-audyt

1. Schematy payloadów i własne klucze usługi; obsługa odrzuceń Redisa.
2. Rozdzielenie statusów powiadomienia/poradnika i wyłączenie honeypota z konwersji.
3. Guard strony edytora, nazwy przycisków zdjęć, reduced motion.
4. Reprodukcja query/history galerii oraz decyzja o atrybucji po odmowie zgody.

Weryfikacja po zmianach tego samego dnia: izolowane przypadki null/toString/Redis rejection/notify429/honeypot, frontend statusów, menu i galeria z reduced motion, produkcyjny build edytora → 404. Koordynator może przypisać inne P do zbiorczej tabeli na podstawie dowodów live. **W tym module: 0 potwierdzonych P0, 0 bezwarunkowych P1, 5 P2, 2 P3.**

| ID | Priorytet | Status |
|---|---|---|
| MASTERTECH2609-01 | P2 | otwarty |
| MASTERTECH2609-02 | P2, P1 warunkowo | otwarty |
| MASTERTECH2609-03 | P2, P1 warunkowo | otwarty |
| MASTERTECH2609-04 | P2 | otwarty |
| MASTERTECH2609-05 | P3 | otwarty |
| MASTERTECH2609-06 | P3 | otwarty |
| MASTERTECH2609-07 | P2 | otwarty |

*Autor: subagent techniczny, 12.09.2026. Dokument diagnostyczny; jedyny utworzony plik to ten raport.*
