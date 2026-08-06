# Poprawki po audycie spójności strony

Data: 2026-08-06
Repozytorium: `05_Strona_WWW/marcinszabunia`
Status: zmiany są w drzewie roboczym, niezacommitowane i niewdrożone na produkcję

## Zakres wdrożonych poprawek

- Ujednolicono komunikat o sesjach zespołowych z cennikiem v3. Strona i wpisy mówią o realizacji od 2 osób.
- Ujednolicono komunikat o przełożeniu lotu z powodu pogody. Pierwszy powrót jest w ustalonej kwocie, kolejne podejście kosztuje 300 zł plus dojazd.
- Rozszerzono FAQ strony głównej o jednorazową bezpłatną zmianę terminu, opłatę 20% za kolejną zmianę oraz 100% za odwołanie w dniu realizacji albo niestawienie się.
- Usunięto powtórzenie ceny sesji zespołowej w automatycznie generowanym FAQ podstrony usługi. Kwota nadal jest podawana w jednym, dedykowanym zdaniu cenowym.
- Uzupełniono katalog usług w JSON-LD o fotografię wnętrz, obiektów i architektury oraz uzupełniono `knowsAbout` o drona i linię obiektową.
- Ujednolicono encję firmy w JSON-LD. Podstrony usług, portfolio i kontakt wskazują teraz na `https://szabunia.pl/#business` zamiast tworzyć kolejne anonimowe encje `ProfessionalService`.
- Dodano unikalne `data-cta` do czterech przycisków w case studies. Nie zmieniono widocznych etykiet ani ścieżki formularza.

## Źródła korekt

- `01_Biznes/_System/02_Cenniki/cennik_2026_07_v3.md`, sekcja sesji zespołowych i warunki drona.
- `src/components/Warunki.tsx`, warunki zmiany terminu i odwołania.
- Raport `docs/sesje/AUDYT-SPÓJNOŚĆ-2026-08-06.md`.

## Weryfikacja

- `npm run lint` - OK
- `npx tsc --noEmit` - OK
- `npm run build` - OK
- `node 01_Biznes/_System/02_Cenniki/sprawdz_spojnosc.mjs` - 0 błędów, 0 ostrzeżeń, 0 brakujących powierzchni
- Smoke test lokalnego serwera - 200 dla `/`, `/kontakt`, `/uslugi/sesje-zespolowe`, `/portfolio/woohoo-autopay`, wpisu blogowego i `/sitemap.xml`

Build nadal zgłasza znane ostrzeżenie Next.js o dwóch lockfile’ach. Nie zmieniałem konfiguracji, ponieważ wymagałoby to osobnej decyzji i nie blokuje buildu.

## Poza zakresem

- Nie zmieniono nazewnictwa zdarzeń `contact_submit` i `generate_lead`, bo wymaga to najpierw odczytu Ads/GA4.
- Nie zmieniono linkowania wewnętrznego linii obiektowej ani różnicy między `#kontakt` i `/kontakt`, bo to decyzje redakcyjno-lejkowe.
- Nie wykonano commita, pushu ani deployu.
