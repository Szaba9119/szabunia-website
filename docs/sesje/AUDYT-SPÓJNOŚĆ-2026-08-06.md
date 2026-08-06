# Audyt spójności strony — 6 sierpnia 2026

**Zakres:** aktualny kod i render lokalnego buildu, moduły A, B, C i E z metodyki audytu.
**Okno:** stan repo na 06.08.2026, po `c51b875` i `d4da040`.
**Metoda:** kod na HEAD `d4da040`, `npm run lint`, `npx tsc --noEmit`, `npm run build`, lokalny `next start` na porcie 3100, read-only smoke test tras i SSR, kontroler spójności cen `sprawdz_spojnosc.mjs`, porównanie z `AUDYT-PELNY-2026-08-05.md`, `AGENTS.md`, `CLAUDE.md`, `DESIGN.md` i cennikiem v3.
**Wykluczone:** produkcja live w tej sesji, Chrome z widocznym oknem, PSI/Lighthouse/CWV, Ads, GA4, GSC, GBP, test wysyłki formularza i decyzje dotyczące treści biznesowej.
**Plan:** `PLAN-AUDYT-SPÓJNOŚĆ-2026-08-06.md`.

> Dokument diagnostyczny. Nie zmieniałem kodu, cen, metadanych, JSON-LD ani konfiguracji. Utworzyłem tylko plan i ten raport.

## 0. TL;DR

Po ostatniej turze poprawki techniczne są w dobrym stanie: lint, TypeScript i build przechodzą, wszystkie kluczowe trasy lokalnego buildu zwracają 200, obraz OG ósmej usługi i portret autora są naprawione w aktualnym kodzie, a kontroler cen wskazuje 0 błędów. Nadal nie jest spójna warstwa decyzji handlowych: blog mówi jednocześnie „od 4” i „od 2 osób”, blog obiecuje darmowe przełożenie lotu bez ograniczeń, a FAQ głównego lejka nie pokazuje pełnych warunków odwołania. Osobno pozostają dwa techniczne punkty do decyzji: konwersja formularza kontaktowego ma inną nazwę zdarzenia niż lead magnet, a graf JSON-LD opisuje 7 z 8 usług.

| Obszar | Stan | Wniosek |
|---|---|---|
| Jakość kodu | ✅ | lint, tsc i build PASS |
| Runtime lokalny | ✅ | 10 kluczowych tras i asset OG = 200 |
| Ceny i kotwice | ✅ | kontroler kanonu: 0 błędów, 0 kwot do ręcznego sprawdzenia |
| Warunki handlowe | ⚠️ | 3 rozjazdy semantyczne wymagają decyzji Marcina |
| SEO techniczne | ⚠️ | 7/8 `Offer` w katalogu głównym; brak linkowania kontekstowego linii obiektowej |
| Pomiar | ⚠️ | dwa lejki używają różnych zdarzeń; reszta wymaga panelu GA4/Ads |
| Produkcja vs repo | N | nie sprawdzono live po ostatnim commicie |

**Wniosek nadrzędny:** nie ma sensu robić kolejnej rundy kosmetyki UI, dopóki nie zostaną rozstrzygnięte trzy zdania, które klient może odczytać jako warunki oferty, oraz nazwa głównego zdarzenia konwersji.

**Jedna decyzja na teraz:** zatwierdzić kanoniczne brzmienie warunków zespołowych, pogody i odwołania, a dopiero potem przepisać je jedną turą we wszystkich powierzchniach.

## 1. Ocena ogólna

### 87 / 100 dla aktualnego repozytorium

Ocena dotyczy kodu i lokalnego buildu, nie wyników produkcyjnych ani konwersji. Strona jest technicznie stabilna, ale spójność biznesowa nie jest domknięta.

| Obszar | Ocena | Komentarz |
|---|---:|---|
| Kod / bezpieczeństwo | 92 | lint, tsc, build, obsługa błędów i storage działają poprawnie w kodzie |
| UX / dostępność | 88 | poprzednia tura domknęła większość punktów; zostają rozszczepione ścieżki CTA i duplikat CTA w hero case study |
| SEO | 85 | sitemap, metadata, OG i huby są uporządkowane; katalog ofert ma 7/8 usług |
| Treść / spójność biznesowa | 76 | kontroler cen jest zielony, ale nie wykrywa sprzeczności semantycznych w warunkach |
| Pomiar | 78 | techniczny tracking istnieje, lecz główny formularz i lead magnet nie są jednym zdarzeniem konwersji |
| Wydajność | N | brak PSI/Lighthouse w tej sesji |

## 2. Sprawdzone i OK

- ✅ `npm run lint`: PASS, 0 błędów i 0 ostrzeżeń.
- ✅ `npx tsc --noEmit`: PASS.
- ✅ `npm run build`: PASS po udostępnieniu dostępu do Google Fonts. Jedyny warning dotyczy wykrycia nadrzędnego `/Users/marcinszabunia/package-lock.json` obok lockfile repo.
- ✅ Lokalne `next start`: `/`, `/portfolio`, `/uslugi`, `/blog`, `/kontakt`, `/poradnik`, `/sitemap.xml`, `/robots.txt`, `/feed.xml` i karta OG ósmej usługi zwracają HTTP 200.
- ✅ `/_next/image` dla portretu autora: `q=80` zwraca 200. `q=78` zwraca 400, ale `78` jest poza deklarowaną listą jakości i nie jest już używane przez `ServiceAuthor.tsx`.
- ✅ Sitemapa używa `SITE_UPDATED = 2026-08-05`, ma 50 adresów i nie publikuje draftu Box17.
- ✅ Kluczowe trasy lokalnego SSR mają po jednym `<h1>`.
- ✅ `robots.txt` nie blokuje `/_next/`, a `Disallow` obejmuje tylko API i PDF lead magnetu.
- ✅ Kontroler `sprawdz_spojnosc.mjs`: wszystkie sprawdzane powierzchnie, w tym `blog.ts`, `faq.ts`, `llms.txt`, `services.tsx`, `layout.tsx`, `kontakt` i `Warunki`, mają 0 błędów cenowych i 0 kwot do ręcznego sprawdzenia.
- ✅ Poprzednie poprawki techniczne potwierdzone w aktualnym kodzie: `try/catch` dla storage, `data-cta` na kaflach, `ItemList` portfolio bez Box17, `ItemList` bloga, link `/poradnik` → `/portfolio`, `follow: true` na 404, kontrast tekstów dark mode, `wbraid`/`gbraid`, `ErrorBoundary` na wpisie blogowym.
- ✅ Karta OG `wnetrza-obiekty-architektura.png` istnieje i lokalnie odpowiada 200.

## 3. Ustalenia — P0

**Brak bezwarunkowych P0.** `SPOJ2608-04` staje się P0 tylko wtedy, gdy Google Ads optymalizuje kampanię na `generate_lead` zamiast na zgłoszenie kontaktowe. Tego nie da się rozstrzygnąć bez panelu Ads.

## 4. Ustalenia — P1

**1. [BIZNES] Sprzeczny próg sesji zespołowej w blogu** — `src/data/blog.ts:179` mówi „Sesje zespołowe realizuję od 4 osób”, a `src/data/blog.ts:469` mówi „od 2 osób”. Cennik v3 potwierdza „Sesja od dwóch osób, bez minimum zlecenia” (`01_Biznes/_System/02_Cenniki/cennik_2026_07_v3.md:315-322`). · P1 · S · 🧑 Marcin · Z (kod + cennik)

Mechanizm: klient z grupą 2–3 osób może uznać, że usługa go nie obejmuje albo że musi wybrać inną ofertę. To nie jest błąd stylistyczny, tylko konflikt warunku wejścia.

Poprawka po decyzji: ujednolicić oba akapity z kanonem 2 osób i usunąć zdanie rekomendujące mniejszym grupom inną usługę albo zdecydować, że cennik nie opisuje realnego minimum.

**2. [BIZNES] Blog obiecuje bezterminowe darmowe przełożenie lotu** — `src/data/blog.ts:373` mówi „bezpłatnie przekładamy sam lot na najbliższy możliwy termin”. Cennik v3 mówi: powrót raz w ramach ustalonej kwoty, kolejne podejście 300 zł plus dojazd (`cennik_2026_07_v3.md:446`). · P1 · S · 🧑 Marcin · Z (kod + cennik)

Mechanizm: klient może przywołać blog jako obietnicę bez limitu, mimo że oferta ma limit i dodatkową opłatę.

Poprawka po decyzji: przepisać zdanie blogowe dokładnie według zatwierdzonego wariantu z cennika.

**3. [BIZNES/PRAWO] Główny FAQ pokazuje skrócone warunki odwołania** — `src/data/faq.ts:43-44` pokazuje bezpłatną zmianę terminu 48h przed sesją i 50% po terminie, ale nie podaje, że bezpłatna zmiana jest jednorazowa, kolejna kosztuje 20%, a odwołanie w dniu realizacji lub niestawienie się osób to 100%. Pełna wersja istnieje tylko w `src/components/Warunki.tsx:99-102`, renderowanym na `/galeria`. · P1 · S · 🧑 Marcin · Z (kod)

Mechanizm: użytkownik głównego lejka poznaje łagodniejszą wersję warunków niż użytkownik galerii. Dla decyzji o terminie to różnica materialna.

Poprawka po decyzji: albo rozszerzyć odpowiedź FAQ o pełny warunek, albo włączyć ten sam blok do strony głównej i `/kontakt`.

**4. [POMIAR] Formularz kontaktowy i lead magnet nie mają wspólnego zdarzenia konwersji** — `src/components/CTA.tsx:108` emituje `contact_submit`, a `src/components/PoradnikForm.tsx:69` emituje `generate_lead`. · P1, warunkowo P0 · S · 🤖 + 🌐 · Z (kod), N (Ads/GA4)

Mechanizm: bez odczytu konfiguracji konwersji nie wiadomo, czy Ads optymalizuje się na zapytania ofertowe, czy na pobrania PDF-a. Kod nie pozwala traktować tych dwóch działań jako jednej metryki bez dodatkowej decyzji.

Poprawka: najpierw odczytać w Ads, która akcja jest główna i czy ma „Kampanie 0 z 1”. Dopiero potem wybrać nazwę kanoniczną albo świadomie zostawić dwa osobne lejki.

## 5. Ustalenia — P2 / P3 / P4

### P2

**5. [SEO] Katalog ofert JSON-LD nie zawiera ósmej usługi** — `src/app/layout.tsx:207-274` ma 7 obiektów `Offer`, podczas gdy aktualna strona ma 8 usług. Lokalny SSR potwierdza 7 wystąpień `"@type":"Offer"`. Brakuje linii „Fotografia hal, obiektów i wnętrz”. · P2 · S · 🧑 Marcin · Z (kod + SSR)

To dotyka JSON-LD w `layout.tsx`, więc wymaga decyzji zgodnie z `CLAUDE.md §10.3`. Nie zmieniałem tego.

**6. [TREŚĆ] FAQ cenowe sesji zespołowych powtarza tę samą informację** — `src/data/services.tsx:222-226` składa w `getPriceFaq()` zdanie z kwotą, a następnie dokleja `pricingBlurb` zawierający tę samą kwotę. Lokalny render `/uslugi/sesje-zespolowe` i jego `FAQPage` pokazują oba zdania. · P2 · S · 🤖 · Z (kod + SSR)

Nie zmieniłem copy, bo dotyka powierzchni klienckiej i warunków cenowych. Technicznie można usunąć powtórzenie bez zmiany kwoty.

**7. [SEO] Linia obiektowa ma brak linkowania kontekstowego** — `src/data/blog.ts:1695-1700` świadomie nie przypisuje żadnego wpisu do `wnetrza-obiekty-architektura`, a mapowanie `:1701-1728` ma 0 pozycji dla tej usługi. Podstrona działa przez fallback kategorii, więc pokazuje wpisy o innych usługach. · P2 · M · 🧑 Marcin · Z (kod)

To jest decyzja redakcyjna, nie błąd techniczny. Nie przepinałem wpisu bez zgody, bo zabrałoby go innej usłudze.

**8. [UX] Hero case study ma dwa różne CTA do tej samej kotwicy** — `src/components/PortfolioHero.tsx:79-91` oraz `src/components/PortfolioVideoShowcase.tsx:66-79`. „Zapytaj o ofertę”, „Zapytaj o termin” i „Zapytaj o podobną realizację” prowadzą do tego samego `#kontakt`, a dwa przyciski nie mają własnego `data-cta`. · P2 · S · 🤖 · Z (kod)

To rozmywa hierarchię i utrudnia pomiar pierwszego ekranu. Rekomendacja: jeden primary CTA, drugi jako link tekstowy albo osobne, prawdziwie różne działanie.

**9. [UX/POMIAR] Główny CTA ma dwie ścieżki wejścia** — hero używa `#kontakt` (`src/components/Hero.tsx:127`), a navbar `/kontakt` (`src/components/Navigation.tsx:141`). Na podstronach analogicznie funkcjonują lokalne kotwice i osobna trasa. · P2 · M · 🤖 · Z (kod)

Warto ujednolicić tę ścieżkę dopiero po decyzji, czy głównym celem ma być szybki scroll na stronie, czy osobna strona kontaktu.

### P3 / P4

- **[TECH] Warning środowiska buildu:** Next.js wybiera `/Users/marcinszabunia/package-lock.json` jako workspace root i widzi drugi lockfile w repo. Nie psuje buildu, ale może zmieniać zachowanie Turbopacka między środowiskami. · P3 · 🧑 Marcin · Z (build)
- **[POMIAR] Brak jawnego `page_view` po nawigacji App Routera:** `layout.tsx:121` konfiguruje gtag raz, a `ContactClickTracker.tsx` nie aktualizuje widoku po `pushState`. To hipoteza do rozstrzygnięcia w GA4 Enhanced Measurement, nie pewny błąd.
- **[POMIAR] Brak pomiaru realnych rozmów:** `phone_click` rejestruje kliknięcie, nie połączenie. Nie oceniałem tego jako defektu bez danych o wolumenie i kosztach numeru.

## 6. Hipotezy do sprawdzenia

- **H1.** `generate_lead` może być już poprawnie przypisany tylko do lead magnetu w Ads. Weryfikacja: Ads → Cele → Podsumowanie → źródło zdarzenia i kolumna „Kampanie”.
- **H2.** Enhanced Measurement może automatycznie rejestrować zmianę strony przy nawigacji client-side. Weryfikacja: GA4 → strumień danych → „Zmiany strony na podstawie zdarzeń historii przeglądarki” oraz test DebugView.
- **H3.** Karta OG ósmej usługi może być już na produkcji, bo jest obecna w repo; w tej sesji potwierdziłem tylko lokalny 200. Weryfikacja: `curl -sI https://szabunia.pl/images/og/uslugi/wnetrza-obiekty-architektura.png`.
- **H4.** Warning z nadrzędnym lockfile może dotyczyć tylko lokalnego układu katalogów i nie występować w Vercel. Weryfikacja: log buildu produkcyjnego albo jawne ustawienie root poza tym audytem.

## 7. Obserwacje bez akcji

- ✅ Dron nie ma już rzeczywistego rozjazdu cenowego: `llms.txt` mówi o dronie w cenie pakietów hybrydowych, a cennik v3 to potwierdza (`cennik_2026_07_v3.md:147-171`). Kwota +200 zł dotyczy drona jako dodatku do osobnego reportażu, nie pakietu hybrydowego. To nie wymaga poprawki.
- `DESIGN.md` i część komentarzy historycznych zawierają stare odniesienia do usuniętego cennika. Nie wpływają na runtime. Nie edytowałem dokumentacji projektowej przy okazji audytu.
- `/kontakt` ma mocny przycisk „Oferta dla firm” prowadzący do `/uslugi`. To może być świadome wyjście awaryjne, ale osłabia jednokierunkowy lejek. Traktuję jako opinię UX, nie defekt.

## 8. Świadomie NIE ruszamy

- Nie odbudowujemy cennika ani kalkulatora.
- Nie publikujemy Box17.
- Nie zmieniamy `next.config.ts`, CSP, metadata ani JSON-LD bez decyzji.
- Nie redagujemy cytatów klientów.
- Nie dokładamy linków do LinkedIn/Facebooka ani nie przywracamy Instagrama w `About`.
- Nie poprawiamy treści biznesowych po cichu. Rozjazdy są opisane jako decyzje, nie jako automatyczne poprawki.

## 9. Czego NIE sprawdzono

| Obszar | Powód | Czego potrzeba |
|---|---|---|
| Produkcja live vs `main` | brak odczytu live w tej sesji | `curl`/Chrome na `https://szabunia.pl` po ostatnim deployu |
| CWV | brak PSI/Lighthouse | pomiar mobile i desktop, LCP/CLS/INP |
| Ads / GA4 / GSC / GBP | brak dostępu do paneli | odczyt paneli i dat danych |
| Dark mode wizualnie | brak Chrome z widocznym oknem | przeklikanie kluczowych tras w jasnym i ciemnym motywie |
| Formularz end-to-end | test mógłby wysłać realny lead | kontrolowany test po stronie Marcina lub mock API |
| Rich Results Test | brak zewnętrznego testu Google | test `/` i `/kontakt` po deployu |

## 10. Pozorne problemy skorygowane w trakcie audytu

- `PELNY2608-27` nie jest aktualnie rozjazdem: porównanie z cennikiem v3 rozróżnia pakiet hybrydowy z dronem w cenie od drona dodawanego do osobnego reportażu za 200 zł. Kontroler kanonu potwierdził 0 błędów.
- `PELNY2608-01` jest zamknięty w kodzie: `quality={80}` działa lokalnie, a `quality={78}` jest odrzucone zgodnie z deklaracją `next.config.ts`.
- `PELNY2608-07` jest zamknięty w repo: plik OG istnieje i lokalnie zwraca 200. Status produkcyjny pozostaje hipotezą H3 do czasu sprawdzenia live.
- `PELNY2608-23` jest zamknięty: aktualny `public/llms.txt` używa `5-15 min/os.`.

## 11. Plan działania

### Kolejność wdrożenia

1. **🧑 Rozstrzygnij warunki biznesowe:** próg zespołu, pogoda, odwołanie. Dopiero po tym ujednolicić `blog.ts` i `faq.ts`.
2. **🌐 Sprawdź Ads/GA4:** ustal główne zdarzenie konwersji i status zmian strony w Enhanced Measurement.
3. **🤖 Po decyzji poprawić JSON-LD:** dodać ósmą usługę i spiąć encje `ProfessionalService` w jednym grafie.
4. **🤖 Usunąć duplikat FAQ cenowego** i uporządkować CTA hero case study, jeśli wariant UX zostanie zaakceptowany.
5. **🌐 Re-audyt po deployu:** produkcja, OG, sitemap, JSON-LD, ścieżki CTA, dark mode i formularze.

### Szybkie wygrane vs większe decyzje

- **S:** usunięcie powtórzenia w FAQ cenowym; jeden primary CTA w hero case study.
- **M:** ujednolicenie warunków w blogu i FAQ po decyzji Marcina.
- **M/L:** jeden kanoniczny lejek pomiarowy i poprawa grafu JSON-LD.

### Data kontrolna

Re-audyt po najbliższym deployu. Sprawdzić dokładnie: statusy tras, OG ósmej usługi, 8 `Offer`, brak sprzecznych progów/warunków, `generate_lead`/`contact_submit` w DebugView, zmianę `page_view` po nawigacji, dark mode i CWV.

## 12. Decyzje potrzebne od Marcina

**D1. Próg sesji zespołowej.**

- **A (rekomendacja):** kanon 2 osoby, poprawić oba zdania w blogu.
- **B:** realne minimum 4 osoby, zmienić cennik v3, `llms.txt` i pozostałe powierzchnie.
- **C:** zostawić konflikt.

**D2. Pogoda przy dronie.**

- **A (rekomendacja):** blog opisuje jeden powrót w cenie, kolejne podejście 300 zł plus dojazd.
- **B:** utrzymać bezterminową obietnicę z bloga i zmienić kanon.
- **C:** nic nie zmieniać.

**D3. Odwołanie i przełożenie.**

- **A (rekomendacja):** pełny warunek w FAQ głównego lejka.
- **B:** wspólny blok `Warunki` na stronie głównej i `/kontakt`.
- **C:** zostawić krótszą wersję FAQ.

**D4. Konwersja.**

- **A (rekomendacja):** po odczycie Ads/GA4 wybrać jedno zdarzenie główne i zachować drugie jako pomocnicze.
- **B:** świadomie utrzymać dwa osobne lejki i osobne cele.
- **C:** nie zmieniać kodu ani panelu.

**D5. JSON-LD.**

- **A (rekomendacja):** dodać 8. `Offer` i spiąć trzy anonimowe encje z `#business`.
- **B:** dodać tylko 8. `Offer`.
- **C:** zostawić bez zmian.

## Rejestr findingów

| ID | Finding | P | Owner | Status |
|---|---|---:|---|---|
| SPOJ2608-01 | Blog: „od 4 osób” vs „od 2 osób” | P1 | 🧑 | otwarty, D1 |
| SPOJ2608-02 | Blog: bezterminowe darmowe przełożenie lotu | P1 | 🧑 | otwarty, D2 |
| SPOJ2608-03 | FAQ głównego lejka nie pokazuje pełnych warunków | P1 | 🧑 | otwarty, D3 |
| SPOJ2608-04 | Dwa zdarzenia dla dwóch lejków | P1/P0 warunkowo | 🧑 + 🌐 | otwarty, H1 |
| SPOJ2608-05 | JSON-LD: 7 `Offer` przy 8 usługach | P2 | 🧑 | otwarty, D5 |
| SPOJ2608-06 | Powtórzenie ceny w FAQ zespołowym | P2 | 🤖 | otwarty |
| SPOJ2608-07 | Linia obiektowa bez linkowania kontekstowego | P2 | 🧑 | otwarty, decyzja redakcyjna |
| SPOJ2608-08 | Dwa CTA w hero case study do tej samej kotwicy | P2 | 🤖 | otwarty |
| SPOJ2608-09 | CTA hero `#kontakt` vs navbar `/kontakt` | P2 | 🤖 | otwarty |

---
*Audyt wykonał: Codex, 06.08.2026. Repo: HEAD `d4da040`; drzewo zawiera istniejący, nieśledzony `AGENTS.md` oraz dwa pliki audytu utworzone w tej sesji. Build lokalny PASS. Produkcja, panele zewnętrzne i CWV nie zostały sprawdzone. Audyt nie wprowadza zmian.*
