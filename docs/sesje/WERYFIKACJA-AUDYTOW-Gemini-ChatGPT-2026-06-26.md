# Weryfikacja audytów Gemini i ChatGPT + skonsolidowany plan poprawek

**Data:** 26.06.2026 · **Metoda:** każde twierdzenie z obu audytów sprawdzone na żywo (HTTP) **oraz w kodzie źródłowym** (Next.js 16, `main` @ `44e9c6c`). Werdykty: **PRAWDA / FAŁSZ / CZĘŚCIOWO** + dowód (plik:linia lub fakt live).

---

## TL;DR

- **Audyt Gemini (45/100) jest w przeważającej części błędny.** Jego główne, dominujące ocenę twierdzenie — że niemal wszystkie podstrony (`/uslugi`, `/galeria`, `/portfolio`, `/kalkulator`, `/blog`, `/poradnik`, `/polityka-prywatnosci`) są „całkowicie niedostępne / 404" — jest **nieprawdziwe**. Wszystkie zwracają HTTP 200 z pełną treścią, mają pliki tras w kodzie i są w `sitemap.xml`. „Brak spacji" w nagłówkach (`REALIZUJĘCELE`, `sesjijak`, `budowaćTwój`) to **artefakt pobierania bez JavaScriptu** — nagłówki mają znaczniki `<br/>`. „Zdublowane H3" w sekcji procesu to standardowy wzorzec responsywny (`display:none`, bezpieczny dla czytników). Realna wartość: jeden półsłuszny drobiazg (nota VAT/Useme).
- **Audyt ChatGPT (78/100) jest mieszany.** Trafia w klimat, ale kilka twierdzeń oznaczonych jako „Zweryfikowane" jest fałszywych: „500 000+ vs 250 000+ zdjęć" (jest **250 000+ wszędzie**), „brak banera cookies" (jest, z przyciskiem **Odrzuć**), błąd gramatyczny „Czym mogę Ci pomóc…" (faktyczny tekst jest poprawny). Słuszne są drobne punkty: spójność etykiet CTA, zasięg sticky‑CTA na mobile, powtarzalność jednej opinii, brak tekstowego linku „Kontakt" w menu.
- **Wniosek metodyczny:** oba audyty pobierały stronę bez wykonania JavaScriptu (lub z niepełnym pobieraniem), co wygenerowało serię fałszywych alarmów. Treść client‑side (kalkulator, baner cookies, walidacja, wynik) i wieloliniowe nagłówki są dla takiego narzędzia niewidoczne. To samo dotyczyło mojego pierwszego przejścia — dlatego rozstrzygający był **kod źródłowy**. Stąd rozjazd ocen: 45 i 78 (oparte na zjawach) vs 87 (zweryfikowane w kodzie).
- **Realne błędy, których oba audyty NIE znalazły** (a są istotne): produkcja starsza niż kod (live „1‑10 osób" / 6 realizacji vs kod „4‑10" / 9), ryzyko dostarczalności maili (nadawca sandbox Resend), „samowystawiony" `AggregateRating`. Te są w moim raporcie `AUDYT-2026-06-26.md`.

---

## A. Audyt Gemini — weryfikacja twierdzenie po twierdzeniu

| # | Twierdzenie Gemini | Ważność wg Gemini | Werdykt | Dowód |
|---|---|---|---|---|
| G1 | `/uslugi`, `/galeria`, `/portfolio`, `/kalkulator`, `/blog`, `/poradnik` „całkowicie niedostępne / błąd serwera" | P1 | **FAŁSZ** | Wszystkie pobrane na żywo 26.06 → HTTP 200, pełna treść (meta, canonical, sekcje). Pliki tras istnieją: `app/uslugi/page.tsx` + `[slug]`, `app/galeria/page.tsx`, `app/portfolio/page.tsx` + `[slug]`, `app/blog/page.tsx` + `[slug]`, `app/poradnik/page.tsx`, `app/kalkulator/page.tsx`. Wszystkie są w `app/sitemap.ts`. |
| G2 | `/polityka-prywatnosci` niedostępna → naruszenie art. 13 RODO | P1 | **FAŁSZ** | Strona dostępna (HTTP 200), pełna polityka (administrator, cele, odbiorcy Resend/Vercel/Useme/Google, prawa, cookies), data aktualizacji „czerwiec 2026". Plik `app/polityka-prywatnosci/page.tsx`. |
| G3 | Checkbox zgody w formularzu linkuje do niedziałającej polityki | P1 | **FAŁSZ** | Link `/polityka-prywatnosci` działa; w kodzie `components/CTA.tsx` link otwiera istniejącą stronę. |
| G4 | H1 „REALIZUJĘCELE TWOJEJMARKI" — brak spacji | P1 | **FAŁSZ** | `components/Hero.tsx` 27–33: nagłówek wieloliniowy z `<br />` między „REALIZUJĘ", „CELE TWOJEJ", „MARKI." Renderuje się poprawnie w 3 liniach. Brak spacji widać tylko po pobraniu bez CSS/JS (sklejone `<br>`). |
| G5 | H2 „Przygotuj się do sesjijak zawodowiec" — brak spacji | P2 | **FAŁSZ** | `components/PoradnikTeaser.tsx` 20–22: „Przygotuj się do sesji" `<br/>` „jak zawodowiec". Wieloliniowy nagłówek, spacja/łamanie OK. |
| G6 | H2 „Zacznijmy budowaćTwój wizerunek" — brak spacji | P2 | **FAŁSZ** | `components/CTA.tsx` 143–145: „Zacznijmy budować" `<br />` „Twój wizerunek". Łamanie wiersza, nie błąd. |
| G7 | Zdublowane nagłówki H3 w sekcji „Jak wygląda współpraca" → „rażący błąd", naruszenie WCAG | P2 | **CZĘŚCIOWO (benignie)** | `components/Process.tsx`: są DWA bloki — `hidden md:block` (desktop) i `md:hidden` (mobile), oba `steps.map`. To standardowy wzorzec responsywny; `display:none` **usuwa nieaktywny wariant z drzewa dostępności**, więc czytnik NIE czyta kroków dwa razy. Nie jest to błąd renderowania ani naruszenie WCAG. Opcjonalnie można uprościć do jednego źródła (P4). |
| G8 | Brak walidacji formularza / komunikatów błędów | P2 | **FAŁSZ** | `components/CTA.tsx`: `validateField` z komunikatami („Podaj imię…", „Podaj poprawny adres e-mail"), `aria-invalid`, `aria-describedby`, `role="alert"`, blokada wysyłki bez zgody, honeypot. |
| G9 | Brak doprecyzowania VAT/Useme przy cenniku | P3 | **CZĘŚCIOWO** | Cennik mówi „netto (+23% VAT)"; faktura/Useme opisane w FAQ i polityce. Można dodać krótką notę przy cenniku — drobne ulepszenie. |
| G10 | Sekcja sprzętu zbyt techniczna dla B2B | P4 | **OPINIA (do rozważenia)** | Subiektywne; sekcja faktycznie szczegółowa. Można dołożyć akcent na bezpieczeństwo (2× karta — backup). Niski priorytet. |
| G11 | Ocena 45/100, „paraliż lejka", model `CR_total = CR_direct` | — | **FAŁSZ (wniosek)** | Oparte na nieprawdziwej niedostępności. Kalkulator, poradnik, portfolio, galeria działają → lejek nie jest „sparaliżowany". |

**Podsumowanie Gemini:** 9 z 11 twierdzeń fałszywych lub mocno zawyżonych. Audyt nie nadaje się jako podstawa decyzji — powstał z pobrania bez JS.

---

## B. Audyt ChatGPT — weryfikacja twierdzenie po twierdzeniu

| # | Twierdzenie ChatGPT | Ważność | Werdykt | Dowód |
|---|---|---|---|---|
| C1 | „500 000+ wykonanych zdjęć" na głównej vs „250 000+" na podstronach | P2 | **FAŁSZ** | W kodzie wszędzie **250 000+**: `components/TrustStats.tsx:7` (`end: 250000`) i `components/About.tsx:74`. Nigdzie nie ma „500 000". Commit „Statystyki: jednolity zestaw 250k/1000+/100+/8lat". |
| C2 | Brak banera cookies / nie da się odrzucić GA4 | P2 | **FAŁSZ** | `components/CookieConsent.tsx`: baner z przyciskami **„Akceptuję"** i **„Odrzuć"**, pojawia się po 1,5 s (client‑side — niewidoczny dla pobrania bez JS). Analityka/reklama domyślnie `denied` (Consent Mode v2 w `layout.tsx`). |
| C3 | Kalkulator nie pokazuje wyniku / może nie działać | P1 | **FAŁSZ** | `components/PricingCalculator.tsx`: pełna logika `calculatePrice` dla 7 usług, tryb netto/brutto, wynik + most „policz → formularz" (`calc-to-form`). Działa po stronie klienta. |
| C4 | Brak komunikatów walidacji formularza (e-mail) | P2 | **FAŁSZ** | Jak G8 — walidacja z komunikatami i aria w `CTA.tsx` oraz `PoradnikForm.tsx`. |
| C5 | Brak tytułów/metaopisów w kodzie (niezweryfikowane) | P2 | **FAŁSZ** | Każda strona ma unikalny `title`/`description`/`canonical` (np. `app/uslugi/[slug]/page.tsx` `generateMetadata`, `data/services.tsx` pole `seo`). Komplet OG/Twitter. |
| C6 | „Czym mogę Ci pomóc Twojej firmie" — błąd gramatyczny | P4 | **FAŁSZ** | `components/Services.tsx:17`: faktyczny tekst „**Czym mogę pomóc Twojej firmie**" — poprawny. ChatGPT zacytował błędnie. |
| C7 | Duplikacja linku „Przeczytaj więcej opinii" w sliderze | P4 | **CZĘŚCIOWO (benignie)** | `components/Testimonials.tsx`: fraza 2× — raz w bloku desktop (`hidden md:block`), raz w sliderze mobile (`md:hidden`). CSS‑wykluczające, użytkownik widzi jeden. Można zdeduplikować (P4). |
| C8 | Niespójne nazwy CTA („Zapytaj o wycenę" vs „Wyślij brief") | P4 | **PRAWDA (drobne)** | Etykiety się różnią: „Zapytaj o wycenę" (Hero, Nav, ServiceHero, galeria), „Zapytaj o termin" (PortfolioHero), „Wyślij brief" (`uslugi/[slug]`), „Wycena" (MobileFAB). Warto ujednolicić główny CTA. |
| C9 | Brak linku „Kontakt" w nawigacji desktop | P3 | **PRAWDA (dyskusyjne)** | `Navigation.tsx` `navLinks` nie ma pozycji „Kontakt"; rolę pełni przycisk „Zapytaj o wycenę" → `/kontakt` (jest też w stopce). Można dodać „Kontakt" dla skanujących wzrokiem — opcjonalne. |
| C10 | Sticky CTA na mobile — brak | P3 | **CZĘŚCIOWO** | `MobileFAB` istnieje (Wycena/mail/tel), ale tylko na: stronie głównej, podstronach usług, `/galeria`. Brak na `/blog`, `/portfolio`, `/kalkulator`, `/poradnik`. Pokrywa się z moim ustaleniem — rozszerzyć zasięg. |
| C11 | Powtarzalność tej samej opinii (M. Formalik) | P3 | **CZĘŚCIOWO (z definicji)** | `data/services.tsx`: opinia Mai (Woohoo) przypisana do 4 usług (eventy, pakiety, wideo, dron). Na stronie głównej 3 różne opinie. Można zdywersyfikować referencje per usługa. |
| C12 | Duże obrazy hero → możliwy wysoki LCP | P2 | **FAŁSZ (jako problem)** | `Hero.tsx`: `priority` + `sizes="(max-width:768px) 100vw, 40vw"` + `quality={72}`; `next.config.ts` AVIF/WebP. Dobre praktyki LCP. Realnych liczb nie zmierzono (patrz niżej). |
| C13 | Dostępność: focus/kontrast do sprawdzenia | P3 | **PRAWDA (niezweryfikowane)** | Zgodne z moim audytem — kontrast i `:focus-visible` na renderze niezmierzone. Warto sprawdzić. |
| C14 | „Pakiety Foto + Wideo" vs „+ Dron" — niespójne nazwy | P3 | **CZĘŚCIOWO (drobne)** | W kodzie tytuł usługi to konsekwentnie „Pakiety Foto + Wideo + Dron" (`data/services.tsx`); skróty pojawiają się w mowie potocznej/krótkich odwołaniach. Drobiazg. |
| C15 | Ocena 78/100 | — | **Zaniżona** | Kilka „minusów" to fałszywe alarmy (C1, C2, C3, C5, C6). Po ich usunięciu obraz jest znacznie lepszy. |

**Podsumowanie ChatGPT:** ~6 twierdzeń fałszywych (w tym oznaczone „Zweryfikowane"), ~6 częściowo/drobnie słusznych, ~2 trafione (niezweryfikowane). Lepszy niż Gemini, ale wymaga odsiania fałszywych pozytywów.

---

## C. Co z tego jest NAPRAWDĘ do poprawy

Po odsianiu fałszywych alarmów, z obu audytów zostają drobne, słuszne punkty. Łączę je z realnymi (i istotniejszymi) ustaleniami z mojego audytu kodu w jeden plan.

### P1 / P2 — istotne (priorytet) — głównie z mojego audytu, NIE z Gemini/ChatGPT
1. **Wdrożyć aktualny `main` na produkcję.** Live jest starsze niż kod: `/uslugi/sesje-zespolowe` „1‑10 osób" (kod: „4‑10" + przypis „od 4 osób"), `/portfolio` 6 realizacji (kod: 9, w tym IDcom, Box17, Yes Butcher). *(moje)*
2. **Zabezpieczyć dostarczalność maili.** Domyślny nadawca w kodzie to sandbox Resend `onboarding@resend.dev` (`app/api/contact/route.ts`, `app/api/lead/route.ts`). Ustawić w produkcji `CONTACT_FROM_EMAIL` na zweryfikowaną domenę szabunia.pl i potwierdzić weryfikację domeny w Resend; wysłać test zapytania i zapisu na poradnik. *(moje)*
3. **Domknąć portfolio.** Niekompletny case study `sesja-wizerunkowa` (1 zdjęcie + „+Więcej zdjęć wkrótce") — uzupełnić lub ukryć; po wdrożeniu kodu wyeksponować IDcom/Box17/Yes Butcher. *(moje)*
4. **Rozszerzyć sticky‑CTA na mobile** na `/blog` + wpisy, `/portfolio`, `/kalkulator`, `/poradnik`. *(moje + ChatGPT C10)*

### P3 — ulepszenia
5. Zdecydować o „samowystawionym" `AggregateRating` (oprzeć gwiazdki o profil Google) i zweryfikować w Rich Results Test. *(moje)*
6. Jedno źródło cennika (strona główna `Pricing.tsx` powinna czytać z `data/services.tsx`). *(moje)*
7. Trwały link „Ustawienia cookies" (łatwe wycofanie zgody — RODO). *(moje)*
8. Doprecyzować zgodę marketingową przy poradniku; dopisać podstawę transferu danych do USA w polityce. *(moje)*
9. **Ujednolicić główny CTA** do jednej etykiety (np. „Zapytaj o wycenę") tam, gdzie dziś jest „Wyślij brief". *(ChatGPT C8)*
10. **Rozważyć link „Kontakt" w menu** desktop (dla osób skanujących nawigację). *(ChatGPT C9)*
11. **Zdywersyfikować opinie per usługa** (nie powielać tej samej referencji na 4 podstronach). *(ChatGPT C11)*
12. Podać źródło statystyki „14x" we wpisie LinkedIn. *(moje)*

### P4 — kosmetyka
13. Ujednolicić staż: „sześć lat" (opis eventów) vs „8+ lat / od 2018". *(moje)*
14. `twitter:title` per‑strona; usunąć zbędne, identyczne `meta-keywords`; ujednolicić linki okruszków do `/uslugi`, `/portfolio`. *(moje)*
15. Zdeduplikować link „Przeczytaj więcej opinii" (desktop/mobile) do jednego źródła. *(ChatGPT C7)*
16. Krótka nota VAT/Useme przy cenniku; minimum 4 osób w polu kalkulatora zespołów. *(Gemini G9 + moje)*
17. Opcjonalnie: w sekcji sprzętu dołożyć akcent „backup/bezpieczeństwo danych". *(Gemini G10)*

### Do zmierzenia (nie błędy — brak narzędzi w audycie)
- **Core Web Vitals** (LCP/CLS/INP, mobile/desktop): sprawdzić w Vercel Speed Insights (już zainstalowany) i PageSpeed Insights.
- **Dostępność na renderze:** kontrast 4.5:1, widoczny `:focus-visible`, test klawiaturą i czytnikiem.

---

## D. Czego NIE potwierdzili Gemini/ChatGPT, a jest ważne

Oba audyty pominęły najistotniejsze realne ryzyka, bo nie weryfikowały kodu ani gita:
- Rozjazd produkcja↔kod (ceny zespołów, lista portfolio).
- Ryzyko niedostarczania maili z formularzy (sandbox Resend).
- „Samowystawiony" `AggregateRating` (Google go zignoruje / ryzyko).

Pełny, priorytetowy plan i tabela ustaleń: **`AUDYT-2026-06-26.md`**.

---

## Metoda i dowody

- **Live (26.06.2026):** pobrane i potwierdzone jako HTTP 200 z treścią: `/`, `/uslugi` + 7 podstron usług, `/galeria`, `/portfolio` + case studies, `/blog` + wpis, `/poradnik`, `/kontakt`, `/kalkulator`, `/polityka-prywatnosci`, `/robots.txt`, `/sitemap.xml`.
- **Kod:** repozytorium `marcinszabunia` (Next.js 16, gałąź `main`, HEAD `44e9c6c`, drzewo czyste). Kluczowe pliki: `Hero.tsx`, `CTA.tsx`, `PoradnikForm.tsx`, `PricingCalculator.tsx`, `CookieConsent.tsx`, `Process.tsx`, `Testimonials.tsx`, `Navigation.tsx`, `TrustStats.tsx`, `About.tsx`, `data/services.tsx`, `data/portfolio.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/api/contact/route.ts`, `app/api/lead/route.ts`, `next.config.ts`.
