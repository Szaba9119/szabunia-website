# Poprawki wdrożone w kodzie — 26.06.2026

**Status:** zmiany w drzewie roboczym (niezacommitowane). Weryfikacja: `tsc --noEmit` ✅ 0 błędów · ESLint ✅ 0 błędów. **Nie wdrażałem na produkcję** (deploy = Twoja decyzja).
18 plików, +88 / −25.

---

## A. Co zostało zrobione (kod)

### Konwersja
1. **Sticky‑CTA na mobile na wszystkich stronach lejka.** `MobileFAB` dodany do `/uslugi`, `/portfolio`, `/kalkulator`, `/blog`, wpisów bloga i `/poradnik` (wcześniej tylko home, podstrony usług, galeria). Pasek jest teraz **bezpieczny wszędzie**: na stronach z formularzem przewija do `#kontakt`, a na stronach bez niego (blog, poradnik) prowadzi na `/kontakt` — nigdy martwy link. Pliki: `MobileFAB.tsx` + 6 stron.
2. **Spójna etykieta CTA.** „Wyślij brief" na podstronach usług → **„Zapytaj o wycenę"** (zgodne z głównym CTA). Plik: `app/uslugi/[slug]/page.tsx`.

### RODO / zgody
3. **Link „Ustawienia cookies" w stopce** ponownie otwiera baner — pozwala zmienić/wycofać zgodę równie łatwo, jak ją wyrazić. Pliki: `Footer.tsx`, `CookieConsent.tsx` (nasłuch zdarzenia `open-cookie-settings`).
4. **Doprecyzowana zgoda przy poradniku** — obejmuje teraz wprost „okazjonalne wskazówki" (spójne z mikrokopią „pojedyncze wskazówki") + informację o możliwości wycofania. Plik: `PoradnikForm.tsx`.
5. **Podstawa transferu danych do USA** (Resend, Vercel) dopisana w polityce: SCC / EU‑US Data Privacy Framework. Sekcja 7 wspomina o „Ustawieniach cookies". Plik: `polityka-prywatnosci/page.tsx`.

### Cennik / treści
6. **Nota „faktura VAT przez Useme"** przy cenniku (strona główna + podstrony usług). Pliki: `Pricing.tsx`, `PortfolioPricing.tsx`.
7. **Staż ujednolicony:** „przez sześć lat" → „przez ponad osiem lat" (zgodne z „8+ lat / od 2018"). Plik: `data/services.tsx`.

### Portfolio
8. **Ukryte 4 niekompletne realizacje** (`sesja-wizerunkowa`, `fotografia-eventowa`, `packshoty-produktowe`, `sesja-korporacyjna` — każda miała tylko 1 zdjęcie + placeholder „Więcej zdjęć wkrótce"). Wypadają z indeksu `/portfolio`, z `sitemap.xml` i z indeksacji (`noindex`). Strony szczegółowe nadal działają (brak 404). Na `/portfolio` zostaje **5 mocnych brandowanych** case studies (Woohoo, Box17, Artech, IDcom, Yes Butcher). Pliki: `data/portfolio.ts` (zbiór `DRAFT_SLUGS` + `isPortfolioDraft`), `sitemap.ts`, `portfolio/[slug]/page.tsx`.
   - **Aby przywrócić realizację:** usuń jej slug z `DRAFT_SLUGS` w `data/portfolio.ts` (po dodaniu zdjęć do galerii).

### Już było w kodzie (wdroży się z deployem — nie wymaga zmian)
- **Minimum 4 osoby w kalkulatorze** zespołów (`min={4}` + przypis „od 4 osób") — już zaimplementowane.
- **Cennik zespołów „4‑10 osób"** + przypis — już poprawione w kodzie (na produkcji wciąż stare „1‑10").

---

## B. Co zostaje po Twojej stronie (nie da się zrobić w kodzie)

1. **WDROŻENIE (najważniejsze).** Zrób review `git diff`, zacommituj i wypchnij / zdeployuj na Vercel. To jednocześnie usunie rozjazd produkcja↔kod (ceny zespołów, lista portfolio) i opublikuje powyższe poprawki. *(Nie commitowałem ani nie deployowałem — czeka na Ciebie.)*
2. **Resend — dostarczalność maili.** W zmiennych środowiskowych Vercel ustaw `CONTACT_FROM_EMAIL` na adres w **zweryfikowanej domenie** szabunia.pl (np. `kontakt@szabunia.pl`) i potwierdź weryfikację domeny w panelu Resend. Potem wyślij testowe zapytanie i zapis na poradnik — sprawdź, czy maile docierają (też do skrzynki klienta). Domyślny `onboarding@resend.dev` to sandbox i może nie dostarczać.
3. **Zdjęcia do 4 ukrytych case studies** — gdy będą gotowe, dodaj je do galerii w `data/portfolio.ts` i usuń slug z `DRAFT_SLUGS`.
4. **CWV** — sprawdź realne Core Web Vitals w Vercel Speed Insights (już zainstalowany) i PageSpeed Insights. Uruchom też `npm run build` lokalnie (na Macu) przed deployem — pełny build używa natywnego SWC, którego nie odpalę w piaskownicy.

---

## C. Świadomie odłożone (do Twojej decyzji)

- **`AggregateRating` (gwiazdki 5.0).** Nie ruszałem — to Twoja decyzja marketingowa. Rekomendacja: oprzeć gwiazdki o profil Google zamiast markupu własnej strony (Google zwykle ignoruje „samowystawione" oceny). Zweryfikuj w Rich Results Test.
- **Źródło statystyki „14x"** we wpisie LinkedIn — wymaga podania realnego źródła; zostawiam Tobie.
- **„Kontakt" w menu desktop** — pominąłem celowo (redundantne z przyciskiem „Zapytaj o wycenę", uniknięcie zatłoczenia nawigacji).
- **`twitter:title` per‑strona / usunięcie `meta-keywords` / linki okruszków `/#uslugi`→`/uslugi`** — kosmetyka P4, mogę zrobić, jeśli chcesz.
- **Dywersyfikacja opinii per usługa** — wymaga nowych, realnych opinii (np. z Twoich 100+ recenzji Google).

---

## D. Jak zweryfikować i wdrożyć

```bash
cd marcinszabunia
git diff                 # przejrzyj zmiany
npm run build            # pełna weryfikacja (na Macu)
git add -A && git commit -m "Audyt: lejek mobile, RODO, cennik, portfolio drafts"
git push                 # → deploy na Vercel
```
