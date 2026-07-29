# Audyt UX/UI — 2026-07-23 (po usunięciu kalkulatora i cennika)

Zakres: odstępy, rytm sekcji, spójność, mobile, martwe kotwice. Na żywo przez Chrome (desktop 1534px + mobile @606px) + pomiary JS + weryfikacja kodu. **Nic nie zmieniałem — same znaleziska i propozycje** (zmiany w kodzie to stop-conditions z `CLAUDE.md §11`).

---

## Werdykt: bardzo czysto ✅

Usunięcie kalkulatora i cennika wykonane **wzorowo** — zero „sierot" (pustych odstępów, martwych kotwic, urwanego layoutu). Home jest strukturalnie spójny, a mobile wręcz **skrócił się o ~19%**.

## Co sprawdzone — wszystko OK

- **Rytm sekcji (desktop):** wszystkie sekcje `py-12 md:py-16`, gapy między nimi = 0 (spacing żyje w paddingu, nie w pustych blokach). Brak pustej przestrzeni po usuniętych sekcjach.
- **Kod:** brak martwej kotwicy `#kalkulator`; scrollspy czysty (`o-mnie / uslugi / portfolio / kontakt`); `page.tsx` nie importuje Pricing/Calculator; lejek CTA („wycena_*") spójnie prowadzi do `/kontakt`.
- **Brak poziomego scrolla** (desktop i mobile); marquee logotypów poprawnie przycięty (`overflow-x: hidden`).
- **Długość mobile @606px: 13 184 px vs 16 274 px z lipca = −19%.** Usunięcie kalkulatora/cennika odchudziło stronę na telefonie (dobrze — to był cel lipcowych audytów).
- **Spójność:** **7/7 kart usług ma „od X zł"** (1000/600/300/900/500/150/1800) — kotwice cenowe pełnią rolę cennika poglądowego, kompletnie i spójnie. **18/18 obrazów z alt**, **1× H1**, zero pustych linków.
- **Sekcja kontakt = mocny endpoint lejka:** nagłówek + „spersonalizowana oferta w 24h" + 4 znaczniki zaufania (FV, poprawki, licencja, terminy) + dane kontaktowe + formularz z czytelnymi etykietami. **MobileFAB poprawnie znika nad formularzem** (brak nakładania/redundancji).

---

## Do poprawy — drobne, opcjonalne

### P2 — Małe tap-targety na mobile
**18 linków ma wysokość <32px** (głównie stopka i menu). WCAG 2.5.5 (Target Size) sugeruje ≥44px. Na telefonie tekstowe linki stopki/nawigacji są ciasne do trafienia.
**Propozycja:** dodać pionowy padding (`py-2` / `min-h-[44px]`) linkom w `Footer.tsx` i mobilnym menu `Navigation.tsx`. Tanie, poprawia „tap-ability".
**Uwaga:** dotyka 2 komponentów → brief dla Claude Code, nie wdrażam sam.

### P2 — Antybot na formularzu (funkcjonalny)
Na `/kontakt` widać stan „Ładowanie zabezpieczenia antybotowego..." (Turnstile). W krytycznym punkcie konwersji warto potwierdzić, że widget ładuje się szybko i **nie blokuje/nie opóźnia** przycisku „Wyślij zapytanie".
**Propozycja:** sprawdzić czas ładowania Turnstile na wolnym łączu; jeśli powolny — rozważyć „fail-open" (memory notuje, że fail-open + [ALERT] log już był ustawiony — potwierdzić, że działa po zmianach).

### P3 — Sekcja Usług = najdłuższy blok mobile (3669 px, 7 kart)
Świadomie zostawiamy **zdjęcia zawsze widoczne** (twarda zasada z 2026-07-06 — nie chować). To tylko obserwacja. Gdybyś kiedyś chciał skrócić: subtelnie (krótsze opisy / mniejszy padding kart), **nigdy kosztem zdjęć**.

### P3 — Wzmocnienie sygnału ceny (treść, opcjonalne)
Po usunięciu cennika „od X zł" na kartach to jedyny sygnał ceny — jest kompletny (7/7), więc OK. Gdybyś chciał domknąć narrację „ceny na zapytanie", można dodać jedną linijkę pod siatką usług, np. *„Dokładna wycena po krótkim briefie — odpowiadam w 24h"*. Spójne z modelem, zero ryzyka. Decyzja treściowa Twoja.

---

## Czego NIE ruszać (potwierdzone zasady)
- Zdjęcia w sekcji usług zawsze widoczne (nie chować w żadnym wariancie).
- Hero: jedno CTA, bez drugorzędnych linków.
- Lejek bez bocznych wyjść (nav/stopka to jedyna nawigacja poza scrollem).

## Priorytet wykonania (jeśli robimy)
1. P2 tap-targety (tanie, realny zysk mobile) → 2. P2 sprawdzenie Turnstile → 3. P3 linijka „wycena po briefie" (jeśli chcesz) → sekcję Usług zostawiamy.

*Audyt UX/UI 2026-07-23 przez Claude (orchestrator). Odczyt na żywo + pomiary, bez zmian w kodzie.*
