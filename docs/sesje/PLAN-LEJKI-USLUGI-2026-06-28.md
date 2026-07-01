# Plan poprawek: lejki sprzedażowe na podstronach usług

Audyt z 28.06.2026. Dotyczy podstron `/uslugi/[slug]` (7 usług).

## Co już jest (szablon podstrony usługi)

Hero → galeria → (wideo, opcjonalnie) → loga klientów → statystyki → proces → cennik → opinia + CTA „Wyślij brief" → FAQ → powiązane wpisy z bloga → formularz kontaktowy.

Mocne: opinie ma każda z 7 usług, każda ma case study i statystyki, FAQ zasila też dane strukturalne (JSON-LD FAQPage aktualizują się automatycznie z `service.faqs`).

## Czego brakuje / błędy

1. Brak wzmianki o darmowym poradniku (lead magnet) na podstronach usług. Nigdzie.
2. Brak wzmianki o sprzęcie na podstronach usług.
3. Nierówna liczba FAQ (3–5) między usługami.
4. Nierówna liczba wpisów bloga (0–8) — część usług pokazuje mniej niż 3.
5. Wideo-marketing i Eventy nie mają sekcji wideo na podstronie. Usługa wideo bez przykładu wideo to słaby sygnał.
6. Case study `woohoo-autopay` powtórzony przy 4 usługach (pakiety, eventy, wideo, dron). Mało zróżnicowane.

### FAQ (cel: 5 na usługę)

| Usługa | FAQ teraz | Do dodania |
|---|---|---|
| Fotografia produktowa | 5 | — |
| Wizerunek & Portrety | 4 | +1 |
| Wideo marketing | 4 | +1 |
| Zdjęcia i wideo z drona | 4 | +1 |
| Reportaż & Eventy | 3 | +2 |
| Sesje zespołowe | 3 | +2 |
| Pakiety Foto+Wideo+Dron | 3 | +2 |

### Blog (cel: 3 na usługę, przez `blogServiceMap`)

| Usługa | wpisy teraz | brakuje |
|---|---|---|
| Wizerunek & Portrety | 8 | — |
| Fotografia produktowa | 3 | — |
| Wideo marketing | 2 | +1 |
| Reportaż & Eventy | 1 | +2 |
| Sesje zespołowe | 1 | +2 |
| Zdjęcia i wideo z drona | 1 | +2 |
| Pakiety Foto+Wideo+Dron | 0 | +3 |

## Plan poprawek (priorytety)

### P1 — domknięcie lejka

1. FAQ do 5 w każdej usłudze. W każdej jedno pytanie „Na jakim sprzęcie pracujesz?" w wersji dopasowanej do usługi (załatwia i liczbę 5, i wzmiankę o sprzęcie). Pozostałe pytania tematyczne pod daną usługę. Do dodania: Wizerunek +1, Wideo +1, Dron +1, Eventy +2, Sesje +2, Pakiety +2.
2. Poradnik (lead magnet) na podstronach. Kompaktowy blok/teaser z poradnikiem, w pierwszej kolejności **Portrety** i **Sesje zespołowe** (tam temat „jak przygotować się do sesji" pasuje najmocniej), docelowo na wszystkich. Wykorzystać istniejący komponent poradnika.
3. Blog 3 wpisy na usługę. Dwa tory:
   - **Szybko (bez pisania):** backfill w `getPostsForService` — gdy usługa ma mniej niż 3 podpięte wpisy, dopełniam tematycznie powiązanymi (ta sama kategoria, potem najnowsze). Gwarantuje 3 wszędzie od ręki.
   - **Docelowo (treść + SEO):** dopisać brakujące wpisy. Propozycje tematów:
     - Pakiety: „Foto, wideo i dron z jednego wejścia: mniej logistyki, spójny materiał"; „Jak zaplanować kompleksową obsługę eventu"; „Pakiet czy usługi osobno: co się bardziej opłaca firmie".
     - Dron: „Zdjęcia z drona dla deweloperów: jak sprzedać inwestycję z góry"; „Ile kosztuje film z drona i od czego zależy cena".
     - Eventy: „Jak wybrać fotografa na event firmowy: checklista"; „Live editing na evencie: zdjęcia w social mediach tego samego dnia".
     - Sesje zespołowe: „Headshoty całego zespołu w jeden dzień: jak to zorganizować"; „Spójne portrety zespołu: jeden standard światła i retuszu".
     - Wideo: „Ile kosztuje film promocyjny dla firmy i od czego zależy cena".

### P2 — wzmocnienie

4. Wideo na podstronie **Wideo-marketing** (priorytet) i **Eventy** — podpiąć istniejące filmy z `galleryVideos`.
5. Zróżnicować case study per usługa, jeśli są materiały (woohoo przy 4 usługach).

### P3 — spójność

6. Ujednolicić: 5 FAQ i 3 wpisy wszędzie, sprawdzić poprawność danych strukturalnych po zmianach.

## Rekomendowana kolejność wdrożenia

1. Backfill bloga (P1.3 szybki tor) — natychmiast 3 wpisy na każdej usłudze.
2. FAQ do 5 + pytanie o sprzęt (P1.1).
3. Poradnik na podstronach (P1.2).
4. Wideo na Wideo-marketing i Eventy (P2.4).
5. Nowe wpisy SEO (P1.3 docelowy tor) — większa, osobna robota.
