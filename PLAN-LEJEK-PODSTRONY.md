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
