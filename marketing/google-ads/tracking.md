# Pomiar konwersji

Data: 2026-09-20. Konto Ads **786-864-4697**, usługa GA4 **szabunia.pl (540982486)**,
identyfikator pomiaru **G-MD8FJ0CZG3**.

---

## 1. Stan zastany

**FAKT (`grep -rn "AW-" src/ public/`): w kodzie strony nie ma żadnego tagu konwersji
Google Ads.** Wszystkie konwersje w koncie pochodzą z **importu z GA4**. To jedyna droga,
więc każde jej przerwanie oznacza konwersję, której Ads nie zobaczy.

Działania konwersji na koncie (odczyt przez API, 20.09.2026):

| ID | Nazwa | Typ | Kategoria | Zliczanie |
|---|---|---|---|---|
| 7644204683 | szabunia.pl (web) contact_submit | GA4 | CONTACT | Jedna |
| 7670127748 | szabunia.pl (web) phone_click | GA4 | CONTACT | Jedna |
| 7670127751 | Kontakt (email_click) | GA4 | CONTACT | **Wiele** |
| 7031355494 | Wyświetlenie strony (generate_lead) | GA4 | **PAGE_VIEW** | **Wiele** |
| 7191745156 | Calls from ads | AD_CALL | PHONE_CALL_LEAD | Wiele |
| 983737805 / 984506818 / 984507067 / 984508294 | cztery działania z kampanii inteligentnych | Smart Campaign | CONTACT / GET_DIRECTIONS / PHONE_CALL_LEAD | różne |
| 7474178617 | Local actions - Menu views | GOOGLE_HOSTED | PAGE_VIEW | Wiele |

### Co tu jest nie tak

1. **`generate_lead` ma kategorię PAGE_VIEW i zliczanie „Wiele".** To zdarzenie pobrania
   poradnika (`PoradnikForm.tsx:70`), czyli lead magnet, a nie odsłona. Zła kategoria
   i „Wiele" zamiast „Jedna" zawyżają obraz i podsuwają Smart Biddingowi mikrozdarzenie.
2. **`email_click` liczy „Wiele" razy na kliknięcie.** Jedna osoba klikająca trzy razy
   w adres to trzy konwersje. Powinno być „Jedna", tak jak przy `phone_click`.
3. **Cztery działania z kampanii inteligentnych są włączone**, mimo że takiej kampanii
   nie ma. Martwe wpisy, ale dopóki są ENABLED, mogą wejść do kolumny „Konwersje".
4. **Podziału Główne / Dodatkowe nie zweryfikowałem.** Tego pola nie zwraca API,
   do którego mam dostęp. **Nie zgaduję. To jest krok ręczny w `launch-checklist.md` §4.**

## 2. Dziura pomiarowa i jej rozmiar

**FAKT** (`05_Strona_WWW/ads/POMIAR-ADS-VS-GA4-2026-08-02.md`, pomiar z 02.08.2026):

- Google Ads: ~68 kliknięć. GA4: 18 sesji Paid Search. **GA4 rejestruje ~26% ruchu płatnego.**
- Z dwóch realnych zapytań z reklamy w lipcu 2026 (oba z `gclid` w stopce maila)
  **Ads policzył jedno.** Lead Macieja Gorączniaka z 14.07 jest w skrzynce i nie ma go w panelu.

Przyczyny, obie wpisane w kod świadomie:
1. **Consent Mode v2 z domyślnym `denied`.** Poprawne prawnie. Ale przy 71 sesjach na 28 dni
   modelowanie behawioralne Google nigdy się nie włączy (próg to rząd tysiąca zdarzeń dziennie),
   więc kto nie kliknie „Akceptuję", jest dla GA4 nieobecny, a nie oszacowany.
2. **`gtag.js` ładowany leniwie**, przy bezczynności lub pierwszej interakcji, z sufitem 6 s.
   Kto wejdzie z reklamy, popatrzy i wyjdzie bez przewinięcia, nie generował nic.

Te dwie przyczyny **mnożą się**, nie dodają: sesja trafia do GA4 tylko gdy zajdą obie rzeczy naraz.

## 3. Co naprawiłem w kodzie

**Plik: `src/app/layout.tsx`.** Ruch płatny ładuje `gtag.js` natychmiast, zamiast czekać
na bezczynność lub interakcję:

```js
try{if(/[?&](gclid|wbraid|gbraid)=/.test(location.search)){load();return;}}catch(e){}
```

Dlaczego tak, a nie szerzej: leniwe ładowanie **zostaje dla całego pozostałego ruchu**,
bo to ono chroni LCP na telefonach. Ruch płatny to pojedyncze wejścia dziennie, więc
jego wpływ na średni LCP jest pomijalny, a wpływ na pomiar decydujący.
`wbraid` i `gbraid` są w warunku, bo Google wysyła je **zamiast** `gclid` w kontekstach
z ograniczeniami prywatności.

### Jak to sprawdziłem (20.09.2026, dev server, wbudowana przeglądarka)

| Test | Wynik |
|---|---|
| `/?gclid=TEST_CLICK_123&x=1` | `gtag.js` startuje w 85 ms, przed DOMContentLoaded (128 ms) |
| `/?wbraid=ABC999` | startuje w 68 ms, przed DOMContentLoaded (71 ms) |
| Klasyfikacja URL przez wyrażenie regularne | `?gclid=X` tak, `?wbraid=X` tak, `?gbraid=X` tak, `?a=1&gclid=X` tak, `?notgclid=X` **nie**, `?utm_source=google` **nie**, pusty **nie** |
| `npm run lint` | czysto |
| `npm run build` | sukces |

⚠️ **Czego ten test NIE dowodzi.** Na bezczynnej maszynie lokalnej ścieżka leniwa też
odpala się szybko (kontrola bez `gclid`: 106 ms), więc **lokalnie różnicy nie widać**.
Zysk z tej zmiany ujawnia się dopiero na realnym telefonie z zajętym wątkiem głównym,
gdzie `requestIdleCallback` potrafi czekać do sufitu 6 s. Zmiana zamienia „najlepszy
wysiłek do 6 s" na „na pewno od razu", i tyle należy o niej powiedzieć.

## 4. Test łańcucha gclid (20.09.2026)

Przeszedłem ścieżkę: wejście z `?gclid=LEJEK_TEST_456` → baner cookie → „Akceptuję”.

| Sprawdzane | Wynik |
|---|---|
| `localStorage['cookie-consent']` | `accepted` |
| Zgoda wysłana do gtag | `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` = wszystkie `granted` |
| `sessionStorage['utm_data']` | `{"gclid":"LEJEK_TEST_456","landing_page":"/"}` |

**`ad_storage: granted` jest tu najważniejsze: bez niego Ads nie powiąże leada z kliknięciem.**
`gclid` jest przechwycony i zostanie doklejony do zgłoszenia (`CTA.tsx` → `/api/contact` → mail i CRM).

**Czego nie testowałem: samej wysyłki formularza.** Wysłanie oznacza realnego maila
przez Resend na skrzynkę Marcina, czyli zdarzenie na zewnątrz. Nie robię tego bez zgody.
Krok ten jest w `launch-checklist.md` §5 do wykonania przez Marcina.

## 5. Co zostaje do zrobienia ręcznie w panelu

Tych rzeczy nie da się zrobić z poziomu sesji. Kolejność i szczegóły: `launch-checklist.md`.

1. Ustawić **`contact_submit` jako jedyną konwersję Główną**, resztę jako Dodatkowe.
2. Poprawić `email_click` na zliczanie „Jedna".
3. Przenieść `generate_lead` z kategorii PAGE_VIEW do kategorii kontaktowej, zliczanie „Jedna",
   i **zostawić jako Dodatkową** (to pobranie poradnika, nie zapytanie ofertowe).
4. Wyłączyć cztery martwe działania z kampanii inteligentnych.
5. **Import konwersji offline po `gclid`.** To najtańsza naprawa całej dziury: liczy każde
   realne zapytanie niezależnie od zgody i od tego, czy `gtag.js` zdążył się załadować.
   Strona dowozi `gclid` do maila i do CRM, co potwierdzono dwoma przypadkami z lipca
   i ponownie testem z 20.09. Mechanizm opisany w `POMIAR-ADS-VS-GA4-2026-08-02.md` §4.1.
