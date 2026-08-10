# Audyt UX / UI — 10 sierpnia 2026

**Zakres:** moduł B (UX / UI / konwersja) oraz kontrola dostępności interfejsu wg `PLAN-AUDYT-UX-UI-2026-08-10.md`.
**Okno czasowe:** 05–10.08.2026; render produkcji sprawdzony 10.08, 14:43 CEST.
**Metoda:** render live z włączonym JS/CSS na `https://szabunia.pl`, kod na `main` / commit `862bbe5`, test DOM ośmiu tras oraz porównanie z `AUDYT-UX-2026-07-31.md` i `AUDYT-PELNY-2026-08-05.md`.
**Punkt odniesienia:** w trakcie audytu `main` zmienił się z `ce4f342` na `862bbe5` (`feat(hero)`). Ostateczny render produkcji zawiera już nowy hero i pasek klientów. Po tym pomiarze pojawiły się kolejne, niezacommitowane zmiany w `Hero.tsx` i `data/services.tsx`; nie są częścią ustaleń z produkcji i pozostają hipotezą H4.
**Wykluczone:** dane GA4, Ads i leady; test wysyłki formularza; Core Web Vitals; realny test VoiceOver/NVDA; wiarygodny render 390/606 px (ograniczenie narzędzia opisane w §9).
**Plan źródłowy:** `PLAN-AUDYT-UX-UI-2026-08-10.md`.

> Dokument diagnostyczny. Nie wprowadza zmian w kodzie, treści ani panelach.

## 0. TL;DR

Główny lejek jest spójny: każda z 18 sprawdzonych kotwic ma cel, osiem tras ma dokładnie jeden widoczny H1, a 68 wyrenderowanych obrazów na tej próbie ma niepusty `alt`. Formularze są czytelne, oznaczone etykietami i mają pola o wysokości 46 px. Jedyny potwierdzony problem P2 został właśnie opublikowany: jasnoszare nazwy klientów na jasnym tle mają kontrast **2,45:1**, poniżej 3:1 wymaganego nawet dla dużego, pogrubionego tekstu. Przed dalszym polerowaniem hero należy przywrócić dla paska klientów kolor `steel`; potem warto wyrównać cele kontaktowe do 44 px.

| Obszar | Stan | Zmiana vs poprzednie audyty |
|---|---|---|
| Hierarchia i semantyka | ✅ | utrzymane na 8 trasach |
| Lejek / kotwice | ✅ | bez martwych CTA |
| Formularze | ✅ | etykiety i komunikaty błędów zachowane |
| Kontrast jasnego motywu | ❌ | regres w pasku klientów z 10.08 |
| Cele dotykowe | ⚠️ | główny CTA mobilny i telefon w hero nadal nierówne |
| Mobile i dark mode | N | wymaga osobnego, wiarygodnego renderu urządzeń |

**Wniosek nadrzędny:** nie warto dodawać kolejnych elementów UI, dopóki pasek klientów nie odzyska czytelności, a główne ścieżki kontaktu nie będą miały jednolitego pola dotyku.

**Jedna decyzja na teraz:** zatwierdzić zmianę `text-steel-light` → `text-steel` w jasnym pasku klientów; jest odwracalna, nie zmienia treści ani układu.

## 1. Sprawdzone i OK

- **Struktura:** `/`, `/uslugi`, `/uslugi/eventy-reportaze`, `/portfolio`, `/portfolio/woohoo-autopay`, `/kontakt`, `/galeria`, `/poradnik` i 404 mają po jednym widocznym H1, `<main>` oraz `lang="pl"`.
- **Kotwice CTA:** wszystkie sprawdzone `#main`, `#o-mnie`, `#uslugi`, `#portfolio` i `#kontakt` wskazują istniejące elementy na własnej stronie. Dotyczy to strony głównej, huba usług, podstrony usługi, case study i galerii.
- **Formularz:** pola kontaktowe mają powiązane etykiety, wymagane pola przekazują `aria-invalid` i `aria-describedby`, a widoczne pola mają 46 px wysokości. Zgoda jest zawarta w etykiecie checkboxa. Dowód: `CTA.tsx:365-529`, render `/kontakt`.
- **Obrazy w próbie:** 68/68 wyrenderowanych obrazów na ośmiu trasach ma niepusty `alt`; nie jest to spis wszystkich niezaładowanych, leniwych obrazów galerii.
- **Obsługa dialogów galerii:** lightbox ma `role="dialog"`, `aria-modal`, Escape oraz pułapkę fokusu. Dowód: `GalleryView.tsx:141-158,322-399`, `useFocusTrap.ts:14-54`.
- **Ruch:** globalne ograniczenie ruchu i komponenty animowane honorują `prefers-reduced-motion`. Dowód: `globals.css:42-52,235-242`, `PortfolioGallery.tsx:117-120`.
- **Konsola:** na końcu serii przejść brak błędów console error.

## 2. Ustalenia — P1

Brak.

## 3. Ustalenia — P2 / P3 / P4

**1. [UX][DOSTĘPNOŚĆ] Kontrast paska klientów w jasnym motywie wynosi 2,45:1** — produkcja `/`, render 10.08 14:43; `LogoBar.tsx:50`, `layout.tsx:396`. · **P2** · **S** · 🤖 · **Z (live + kod)**

Najnowsza wersja renderuje nazwy marek jako `rgb(148, 163, 184)` (`#94A3B8`) na tle `#F9FAFB`. Obliczony kontrast wynosi **2,45:1**; tekst jest wprawdzie duży (24 px, bold), ale wymaga co najmniej **3:1** wg WCAG 1.4.3. Pasek jest dowodem społecznym bezpośrednio pod hero, więc jego słaba czytelność obniża rozpoznawalność marek, zamiast tworzyć subtelny akcent. Ciemny motyw jest poprawny: `#94A3B8` na `#0B0F1A` ma 7,46:1.

Poprawka: w jasnym wariancie użyć `text-steel` (`#64748B`, **4,55:1** na `#F9FAFB`), zostawiając `dark:text-dark-text-muted`. To przywraca kontrast bez zmiany rytmu, animacji ani treści.

**2. [UX] Dwa główne cele kontaktowe nie mają wspólnego pola 44 px** — hero live: telefon `115×23 px`; `Hero.tsx:179-188`; mobilna wyspa: CTA „Oferta” ma 40 px z klas `py-2.5 text-sm`, gdy sąsiednie ikony mają `44×44 px` (`MobileFAB.tsx:66-96`). · **P3** · **S** · 🤖 · **Z (live + kod)**

Telefon w hero jest bezpośrednią alternatywą dla formularza, ale ma tylko wysokość tekstu. Z kolei najważniejsze mobilne „Oferta” jest o 4 px niższe od przycisków e-mail/telefon obok. Nie jest to stwierdzenie o niezgodności z WCAG 2.1 AA — 44 px to cel ergonomiczny / SC 2.5.5 na poziomie AAA — lecz o niespójności i mniejszym marginesie błędu przy dotyku.

Poprawka: nadać obu linkom `min-h-11` i wyrównać je `items-center`; w hero nie zwiększy to wysokości rzędu, bo sąsiedni CTA ma już 56 px. Po zmianie sprawdzić układ przy 375 i 390 px.

**3. [DOSTĘPNOŚĆ] Drobne punkty z `PELNY2608-66` pozostają otwarte** — `CookieConsent.tsx:69-112`, `FAQ.tsx:86-99`, `Testimonials.tsx:172-180`. · **P4** · **M** · 🤖 · **Z (kod)**

Nie tworzę duplikatu starego findingu. Baner cookies deklaruje `role="dialog"`, ale nie ma `aria-modal`, zarządzania fokusem ani Escape; zamknięta odpowiedź FAQ pozostaje w drzewie dostępności przez `opacity:0`; mobilna karuzela opinii ma dwa nakładające się regiony `aria-live`. Interfejs wizualny działa, lecz czytnik ekranu może otrzymywać nadmiarowe lub mylące informacje.

Poprawka: wybrać jedną semantykę banera (niemodalny `region` **albo** pełny dialog), dodać `aria-hidden={!isOpen}` do zamkniętej odpowiedzi FAQ i zostawić tylko jeden komunikat live w karuzeli. Po wdrożeniu zweryfikować VoiceOver lub NVDA.

## 4. Hipotezy do sprawdzenia (H)

| ID | Hipoteza | Krok weryfikujący | Owner |
|---|---|---|---|
| H1 | Nowy rząd CTA hero może zawinąć telefon lub zmienić kolejność pionową na 375/390 px. | Chrome device toolbar: 375×667, 390×844 i 606×900; zmierzyć `getBoundingClientRect()` CTA i telefonu. | 🧑 / 🌐 |
| H2 | Dark mode wygląda spójnie na wszystkich ośmiu trasach. | Ręcznie przełączyć motyw i obejrzeć hero, galerie, formularze, stopkę oraz sticky CTA; nie opierać wniosku wyłącznie na klasach CSS. | 🧑 |
| H3 | Obsługa klawiaturą i czytnikiem ekranu jest poprawna w praktyce. | VoiceOver + Safari albo NVDA + Firefox: menu mobilne, FAQ, lightbox, baner cookies i formularz z błędem. | 🧑 |
| H4 | Niezacommitowany wariant hero z czterema liniami i maksimum 76 px zachowuje hierarchię oraz mieści się bez zawijania na 1024/1280/1440 px. | Porównać z produkcją na trzech szerokościach, plus 375/390 px; sprawdzić wysokość hero, pozycję zdjęcia i telefon CTA przed commitem. | 🧑 |

## 5. Obserwacje bez akcji

- `Galeria` ma **15 141 px = 16,8 ekranu desktop** (próg planu: 15), ale jej podstawową funkcją jest oglądanie zdjęć, a CTA do kontaktu pojawia się przed zawartością galerii. Nie skracać strony bez pomiaru mobilnego i danych o przejściach do kontaktu.
- **O:** kafel na stronie głównej brzmi „Chcesz zobaczyć więcej? Napisz do mnie”, lecz prowadzi do `#kontakt` (`Portfolio.tsx:115-131`). To nie jest błąd funkcjonalny i zachowuje decyzję „lejek bez bocznych wyjść”; dla dosłowności można kiedyś zmienić copy na „Masz podobny projekt? Napisz do mnie”.
- Nowy hero poprawnie łączy dwa kanały kontaktu i nie przywraca odrzuconych wcześniej pigułek ani dodatkowych bocznych CTA. To właściwy kierunek dla oferty premium B2B.

## 6. Świadomie NIE ruszamy

- Brak publicznego cennika i kalkulatora.
- Brak linku do Instagrama w `About.tsx`.
- Box17 pozostaje draftem.
- Układ „lejek bez bocznych wyjść” na stronie głównej; propozycja w §5 zmienia wyłącznie copy, nie cel linku.
- `font-barlow` pozostaje aliasem Intera.

## 7. Czego NIE sprawdzono (i co jest potrzebne)

| Obszar | Powód | Czego potrzeba |
|---|---|---|
| Mobile 390 / 606 px, poziomy scroll i długość strony | Ustawienie viewportu w przeglądarce audytowej nie dawało wiarygodnego renderu tych szerokości. | Widoczny Chrome, szerokości 375×667, 390×844, 606×900; zrzuty i `scrollHeight`. |
| Dark mode wizualnie | Nie przełączałem zapisanej preferencji użytkownika w przeglądarce. | Ręczny test każdej odwiedzonej trasy. |
| Formularz end-to-end i analiza konwersji | Wysyłka tworzy zewnętrzny efekt, a panele nie są w zakresie. | Testowy lead + GA4 DebugView; potem porównanie `phone_click`, `contact_form_started`, `contact_submit` w 28 dniach. |
| CWV | PSI/Lighthouse nieuruchomione. | PSI mobile/desktop dla `/`, `/uslugi/eventy-reportaze`, `/galeria`. |

## 8. Pozorne problemy skorygowane w trakcie

- Szerokie elementy `marquee` i dekoracyjne gradienty mają większy `scrollWidth`, lecz ich kontenery są celowo przycięte (`overflow-hidden`); nie są dowodem poziomego scrolla użytkownika.
- Widoczne duplikaty etapów procesu występują w wariantach desktop/mobile ukrywanych klasami responsywnymi; nie zgłaszam ich jako duplikatu dla czytnika ekranu.

## 9. Plan działania

### Kolejność wdrożenia

1. **(P2, S, 🤖)** Zmień jasny kolor logo-paska na `text-steel` → kontrast 4,55:1 i czytelny social proof.
2. **(P3, S, 🤖)** Ujednolić do 44 px telefon w hero i mobilny CTA „Oferta” → większy margines błędu przy kontakcie.
3. **(P4, M, 🤖)** Domknąć `PELNY2608-66` w jednej turze dostępności → poprawna komunikacja z czytnikami ekranowymi.
4. **(O, S, 🧑)** Zdecydować, czy zmienić mikrocopy kafla portfolio; nie zmieniać trasy linku.

### Szybkie wygrane (<1 h)

- UXUI2608-01: jedna klasa koloru + pomiar kontrastu.
- UXUI2608-02: dwa `min-h-11` + test 375/390 px.
- Opcjonalna korekta copy z §5.

### Data kontrolna

**11.08.2026 po deployu:** kontrast paska, prostokąty CTA, 375/390/606 px, dark mode, kotwice i konsola. **07.09.2026:** porównać 28 dni `phone_click`, rozpoczęcia formularza i potwierdzone wysłania z poprzednim oknem o tej samej długości.

## 10. Decyzje potrzebne od Marcina

1. Czy zatwierdzasz przywrócenie ciemniejszego `text-steel` dla nazw klientów w jasnym motywie? **Rekomendacja: tak** — zysk dostępności, bez kosztu informacyjnego ani zmiany układu.
2. Czy po poprawkach funkcjonalnych chcesz wdrożyć tylko zmianę copy „Chcesz zobaczyć więcej?” → „Masz podobny projekt?”? **Rekomendacja: tak, ale jako osobny mikrotest** — zachowuje zamkniętą decyzję o lejku.

## 11. Rejestr findingów

| ID | Finding | P | Owner | Status | Dokument |
|---|---|---|---|---|---|
| UXUI2608-01 | Kontrast paska klientów 2,45:1 w jasnym motywie | P2 | 🤖 | otwarty | ten raport |
| UXUI2608-02 | Hero phone i mobilne „Oferta” bez wspólnego pola 44 px | P3 | 🤖 | otwarty | ten raport |
| PELNY2608-66 | Drobne kwestie ARIA FAQ / cookies / karuzeli | P4 | 🤖 | otwarty, potwierdzony | `AUDYT-PELNY-2026-08-05.md` |

---

*Audyt wykonał Codex, 10.08.2026. Dane: render produkcji, kod `862bbe5`, kontrola DOM ośmiu tras. Dokument nie wprowadza zmian.*
