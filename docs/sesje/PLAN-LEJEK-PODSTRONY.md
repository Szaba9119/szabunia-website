# Plan: lejek sprzedażowy — podstrony usług + galeria

Cel: zamienić podstrony `/uslugi/[slug]` oraz stronę `/galeria` z „informacyjnych"
w lejek, który prowadzi odwiedzającego do jednego celu — kontaktu / zapytania o wycenę.
Bez zmian w cenach i treściach merytorycznych usług; zmieniamy układ, CTA i dowód.

---

## Część A — podstrony usług (`/uslugi/[slug]`)

Obecna kolejność: Hero (2 przyciski) → pasek galerii (link na zewnątrz) → proces →
cennik → FAQ → „Z bloga" (link na zewnątrz) → formularz.

### Proponowana nowa kolejność i zmiany

1. **Hero — mocniejsze CTA**
   - Główny przycisk: **„Zapytaj o wycenę"** (→ `#kontakt`).
   - Drugi przycisk: „Zobacz cennik" (→ `#cennik`).
   - Pod przyciskami pasek zaufania: *Odpowiadam w 24h · Faktura VAT · 2 tury poprawek w cenie*.

2. **Dowód: zdjęcia na miejscu (zamiast wycieku)**
   - Pasek galerii zostaje wizualnie, ale **przestaje linkować do `/galeria`**.
   - Zdjęcia otwierają się w podglądzie na miejscu (lightbox) albo są statyczną siatką.
   - Cel: pokazać jakość, nie wyprowadzać z lejka.

3. **Logotypy klientów** (komponent LogoBar) — szybki dowód zaufania.

4. **Jak to działa** (proces) — bez zmian.

5. **Cennik** — bez zmian w kwotach; **pod cennikiem powtórzone CTA**
   („Zapytaj o wycenę") + link do kalkulatora wyceny.

6. **Opinia klienta dopasowana do usługi** (nowy element, mocny dowód):
   - Eventy / Pakiety → opinia Woohoo (Maja Formalik).
   - Produktowa → opinia Artech (Małgorzata Wagner).
   - Wizerunek / Sesje zespołowe → opinia związana z IDcom / portretami.

7. **FAQ** — bez zmian (obala obiekcje tuż przed kontaktem).

8. **Formularz kontaktowy** — finał lejka.

9. **„Z bloga"** — przenieść **pod formularz** (poza główny lejek) lub usunąć z podstron.

10. **Sticky CTA na mobile** — przyklejony przycisk „Wyceń / Napisz" widoczny przy scrollu.

---

## Część B — strona `/galeria` jako lejek

Obecnie: H1 + intro + przeglądarka kategorii (lightbox) + formularz na dole.

1. **Hero galerii** — dodać zdanie z wartością + CTA „Wyceń swój projekt" (→ `#kontakt`).
2. **Przy każdej kategorii** (portrety / eventy / produktowe / wideo): krótki opis
   + przycisk **„Zobacz usługę: [nazwa]"** → odpowiednia `/uslugi/[slug]`.
   To kieruje z galerii w lejek konkretnej usługi.
3. **Opinia + logotypy** jako dowód nad formularzem.
4. **Formularz** — zostaje (już jest).

---

## Elementy zaufania / zbijanie ryzyka (powtarzane na obu typach stron)

- „Odpowiadam w 24h"
- „Faktura VAT (Useme)"
- „2 tury poprawek w cenie"
- „Licencja komercyjna bez limitu czasowego"

---

## Czego NIE ruszam

- Kwoty w cenniku i treści merytoryczne usług.
- Struktura SEO / dane strukturalne (zostają, ew. tylko uzupełniam).

---

## Decyzje do potwierdzenia przed wdrożeniem

1. **Opinie per usługa** — użyć istniejących (Woohoo, Artech, IDcom/Maja)?
2. **Zdjęcia „do poprawy"** — które kadry są Twoje najlepsze w każdej sekcji?
   Podasz nazwy plików, czy mam dobrać propozycje, a Ty zatwierdzisz?
3. **„Z bloga" na podstronach** — przenieść na dół czy całkiem usunąć?
4. **Sticky CTA na mobile** — wchodzi?
5. **Kolejność wdrożenia** — wszystko naraz czy etapami (najpierw zatkanie
   wycieków + CTA + opinia, potem reszta)?

---

## STATUS WDROŻENIA

### Zrobione
- **Podstrony usług:** główne CTA „Zapytaj o wycenę" + pasek zaufania w hero,
  opinia dopasowana do usługi, powtórzone CTA po cenniku, blog przeniesiony pod
  formularz, logotypy klientów, sticky mobilny przycisk (tel / mail / wyceń).
- **Galeria jako lejek:** CTA „Wyceń swój projekt" w hero, kafelki usług
  (kierują na podstrony), logotypy, opinie, formularz, sticky przycisk.
- **Miniatury usług + kadrowanie:** dobrane najlepsze ujęcia, poprawione
  object-position (wizerunek wyżej, zespołowy na środku — twarze widoczne).
- **Zbijanie ryzyka przy formularzu:** Faktura VAT · 2 tury poprawek ·
  licencja bez limitu · bez zobowiązań.
- OG-images podstron — istnieją (udostępnianie w social OK).

### Pozostało (kolejne etapy)
1. ~~Kuracja zdjęć w paskach galerii na podstronach~~ ✅ — wybrane najlepsze 6
   per kategoria (portrety / eventy / produktowe) w `ServiceGalleryStrip`.
2. ~~Analityka konwersji~~ ✅ — `cta_click` (data-cta) na CTA „wycena" w hero,
   środku strony, galerii i sticky; tel/mail i wysyłka formularza już mierzone.
3. **(opcjonalnie) Lightbox na podstronie** — podgląd zdjęć na miejscu zamiast
   przejścia do `/galeria`.
4. **Pomiar po wdrożeniu i iteracja** — sprawdzić zachowanie (GA4) i dopiąć
   słabe punkty lejka.
