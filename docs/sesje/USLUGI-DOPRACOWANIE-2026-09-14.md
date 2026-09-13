# Pozostałe usługi — audyt i dopracowanie, 14.09.2026

Punkt odniesienia: `WIZERUNEK-DOPRACOWANIE-2026-09-14.md`. Wizerunek traktowany jako standard jakości, nie szablon treści.

## Audyt per podstrona

| | Wydarzenia | Nieruchomości i przemysł | Produkty |
|---|---|---|---|
| Intencja | Organizator (HR, marketing) szuka fotografa i wideo na konkretne wydarzenie | Właściciel lub zarządca obiektu potrzebuje materiału do sprzedaży, najmu albo prezentacji zakładu | Sklep lub marka potrzebuje zdjęć produktów do kart, marketplace'ów i kampanii |
| Frazy | fotograf eventowy, fotografia eventowa Poznań, zdjęcia z konferencji | fotografia nieruchomości, zdjęcia z drona, fotografia przemysłowa, hale | packshot Poznań, fotografia produktowa, zdjęcia do sklepu |
| Argumenty | Klienci H&M, Santander, Warner Music; 30 zdjęć na godzinę; zdjęcia w trakcie (opcja); drugi operator | Trzy poziomy w jednym dniu; zgody na lot po stronie fotografa; film z hali Artech | Retusz w cenie; wymogi Allegro i Amazona; powtarzalny setup |
| Obiekcje | Awaria, słabe światło, termin, dojazd, licencja | Pogoda, dron nad halą, czynna produkcja, dwa budynki | Kurier, różnica packshot / aranżacja, kolejne partie |
| Title (zastany) | Bez słowa „eventowa” | Wariant Marcina z 11.08 | Najmocniejszy organicznie (packshot) |
| Formularz | Kod `event`, pytanie o długość wydarzenia | Kod `obiekty`, pytanie o lokalizację i liczbę obiektów | Kod `produkt`, pytanie o liczbę produktów i wariantów |
| Układ | Zgodny z systemem | Zgodny z systemem | Zgodny z systemem, świadomie większy pasek galerii |

## Co zmienione

**Wydarzenia**
- Title: „Fotografia eventowa i wideo z wydarzeń, Poznań | Szabunia”. H1 mówi „Fotograf eventowy”, tytuł nie miał tego słowa.
- Proces: krok 3 był opcją dodatkową („Zdjęcia na bieżąco”). Teraz „Selekcja i obróbka” (etap zawsze obecny), opcja w nawiasie. Dostawa dostała termin filmu.
- FAQ: „Ile zdjęć dostanę i kiedy?” (termin 14/21 dni nie padał w FAQ). Pytanie o sprzęt przepisane na „Co, jeśli w trakcie wydarzenia zawiedzie sprzęt?”, te same fakty.
- Odpowiedź cenowa: dojazd poza Poznań. Na podstronach usług ta informacja nie padała nigdzie (czynniki w bloku wyceny są tam wyłączone).
- Blog: wybór fotografa, plan obsługi eventu, zdjęcia w trakcie wydarzenia. Automat pokazywał dwa wpisy o tym samym temacie.

**Nieruchomości i przemysł**
- FAQ: pytanie o sprzęt (czwarte powtórzenie drona, A1/A3 i OC na tej stronie) zastąpione przez „Jak wygląda sesja na czynnej hali produkcyjnej?” z treści wpisu o fabryce.
- Blog: przemysł, nieruchomości z drona, dron dla firm. Automat pokazywał trzy wpisy o dronie i pomijał jedyny o przemyśle.
- Title bez zmian (wariant Marcina z 11.08, spójny z filarem).

**Produkty**
- Pasek galerii: zero packshotów na białym tle pod H1 „Packshoty…” (jeden pędzel na 7. miejscu), a kadr hero powtarzał się w pierwszym kafelku. Wyszedł duplikat hero, wszedł packshot `produkt-33`, packshoty na początek.
- Alty: 7 z 8 kadrów miało ten sam opis „Fotografia produktowa, packshot” (także sukienka i auto). Dopisane opisy z obejrzanych kadrów. Działają też w `/galeria`.
- FAQ: różnica packshot / aranżacja / reklama (wcześniej tylko produktowa vs reklamowa). Pytanie o sprzęt zastąpione „Czy kolejne produkty dołożę później w tej samej stylistyce?”.
- Blog: dwa własne wpisy zamiast trzech z jednym przypadkowym; siatka dopasowana do dwóch kart.
- Title i H1 bez zmian.

**System**
- `blogSlugs` na wszystkich czterech usługach.
- Żadna usługa nie ma już pytania o model aparatu.
- Poprawione przeterminowane komentarze w `services.tsx` i `faq.ts`.

## Kontrola

- `tsc`: PASS. `lint`: PASS 0/0. `build`: PASS, 57 stron. `git diff --check`: PASS.
- HTTP 200: `/`, `/uslugi`, cztery usługi, `/portfolio`, `/portfolio/fotografia-eventowa`, `/blog`, `/kontakt`, `/galeria`.
- JSON-LD FAQPage zgodne z widocznym FAQ: wydarzenia 10, nieruchomości 9, produkty 8, wizerunek 9.
- 375 px: brak poziomego przepełnienia na czterech usługach. Proces na telefonie: układ wierszowy, kółko 40 px, trzy łączniki, pozioma linia ukryta. Pasek produktowy 2 kolumny, blog produktowy 1 kolumna.
- 1024 px: pasek produktowy i blog z dwiema kartami obejrzane na zrzucie.

## Do decyzji Marcina

1. **„Każdy kolejny przyjazd to 300 zł plus dojazd”** w FAQ nieruchomości (i we wpisie o fabryce). Jedyna kwota na powierzchni usług po depricingu z 14.08. Nie ruszana, bo to cena.
2. **Brak kadrów z konferencji, prelegentów i targów** (znana luka z 10.08). Lista „Dla jakich wydarzeń” obiecuje osiem typów, portfolio pokazuje cztery.
3. **Produkty: dwa wpisy blogowe.** Trzeci sensowny temat (np. wideo produktowe albo przygotowanie produktów do wysyłki) wymaga nowego tekstu.
4. **Case study `fotografia-eventowa`** ma własny proces z krokiem „Live edit: opcja dodatkowa”, ten sam problem co poprawiony proces usługi. Poza zakresem tego etapu.
5. **Pomiar GSC:** nowe title wydarzeń i wizerunku od dnia deployu.
6. **Kolejność paska produktowego** zmieniona względem ręcznej listy; cofnięcie opisane w komentarzu.

## Commit porządkowy (po akceptacji Marcina, 14.09.2026)

- Proces case study `fotografia-eventowa` zrównany z procesem usługi wydarzeń (punkt 4 wyżej zamknięty).
- „300 zł plus dojazd” usunięte w trzech miejscach tego samego zapisu: FAQ nieruchomości (widoczne i FAQPage), `public/llms.txt`, wpis `fotografia-przemyslowa-fabryka`. Zamiast kwoty: kolejny przyjazd wyceniany osobno, zależnie od zakresu i dojazdu (punkt 1 zamknięty).
- Kolejność paska produktowego zaakceptowana, zostaje (punkt 6 zamknięty).

## Backlog (bez zmian w kodzie)

- Eventy: dołożyć mocne kadry konferencja / scena / prelegent / targi.
- Po deployu: obserwacja GSC dla nowych title wydarzeń i wizerunku, dalsze poprawki na danych.
