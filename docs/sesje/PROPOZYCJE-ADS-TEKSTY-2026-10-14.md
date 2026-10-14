# Propozycje poprawek — tekst strony głównej i Google Ads, 14.10.2026

Źródło: `AUDYT-ADS-2026-10-13.md` §13. Ramy: **jedna reklama, wszystko na stronę główną** (decyzja Marcina 14.10.2026).
Status (14.10.2026): **P5 i P6 wykonane w panelu Ads, P1–P4 wdrożone w kodzie (lint, tsc, build PASS), czekają na push.** Bez „przedszkolna/szkolna”.
Kontrola: `sprawdz_tekst.py` na wszystkich nowych tekstach: **0 błędów, 0 do sprawdzenia** (14.10.2026).

## Po co

Google ocenia stronę docelową „poniżej średniej” na wszystkich 7 ocenionych słowach (Wynik Jakości 1–5/10), a kampania traci przez to
51% wyświetleń. W sierpniu było tak samo na podstronach usług. Wspólna przyczyna: **słów, za które płacimy, nie ma w tekście strony.**

| Fraza (koszt 29.09–12.10) | Teraz na stronie głównej | Po zmianach |
|---|---|---|
| zdjęcia biznesowe (WJ 3, 6,78 zł) | 0 | 1 (P2) |
| fotografia biznesowa (WJ 5) | 0 | 1 (P4) |
| fotografia nieruchomości (WJ 5) / fotograf nieruchomości (5,09 zł) | 0 | 1 (P3) |
| fotografia eventowa / fotograf eventowy (9,97 zł) | 0 | 1 (P1) |
| sesja biznesowa (WJ 1, 22,68 zł) | 1 | 1 (bez zmian, jest w P2) |
| fotografia wnętrz (WJ 3, 13,79 zł) | 1 | 1 (bez zmian, jest w P3) |

Zasada doboru: **jedno naturalne wystąpienie frazy w miejscu, gdzie strona i tak opisuje tę usługę.** Bez upychania, bez list słów
kluczowych. H1 i title strony głównej zostają bez zmian (SEO-05, czekają na dane z GSC).

---

## A. Tekst strony (4 zmiany)

### P1 · Karta „Wydarzenia” — `src/data/services.tsx:374` (`subtitle`)

Wyświetla się: karta na stronie głównej, kafel na `/uslugi`, karta „Powiązana usługa” pod wpisami blogowymi.
W hero `/uslugi/eventy-reportaze` jest ukryty (`heroHideSubtitle: true`), więc tam nic się nie zmienia.

| | Tekst |
|---|---|
| Teraz | Reportaż firmowy z konferencji, targów i gal. Zdjęcia, film i ujęcia z drona z jednego dnia, a w opcji dodatkowej część kadrów na social media jeszcze w trakcie wydarzenia. |
| **Propozycja** | **Fotografia eventowa i** reportaż firmowy z konferencji, targów i gal. Zdjęcia, film i ujęcia z drona z jednego dnia, a w opcji dodatkowej część kadrów na social media jeszcze w trakcie wydarzenia. |

Dlaczego: „fotografia eventowa” to fraza z reklamy i z GSC („fotografia eventowa poznań” 37 wyświetleń w 3 mies. do 12.09).
„Reportaż firmowy” zostaje, bo też jest słowem kluczowym. Długość 172 → 194 znaki (patrz „Ryzyko” niżej).

### P2 · Karta „Ludzie” — `src/data/services.tsx:824` (`subtitle`)

Wyświetla się: karta na stronie głównej, kafel na `/uslugi`, karty pod wpisami, **lead pod H1 na `/uslugi/wizerunek-portrety`**.

| | Tekst |
|---|---|
| Teraz | Sesja biznesowa dla jednej osoby albo dla całego zespołu. Zdjęcie na LinkedIn, headshoty i film wizerunkowy. |
| **Propozycja** | Sesja biznesowa dla jednej osoby albo dla całego zespołu. **Zdjęcia biznesowe** na LinkedIn, headshoty i film wizerunkowy. |

Dlaczego: „zdjęcia biznesowe” ma 0 wystąpień, WJ 3 i przewidywany CTR „poniżej średniej”. „Na LinkedIn” zostaje.
Długość 108 → 118 znaków.

### P3 · Karta „Obiekty” — `src/data/services.tsx:1461` (`subtitle`)

Wyświetla się: karta na stronie głównej, kafel na `/uslugi`, karty pod wpisami, **lead pod H1 na `/uslugi/nieruchomosci-przemysl`**.

| | Tekst |
|---|---|
| Teraz | Hale, zakłady, biurowce i inwestycje. Zdjęcia z drona, fotografia wnętrz i wideo obiektu w jednym dniu zdjęciowym. |
| **Propozycja** | Hale, zakłady, biurowce i inwestycje. **Fotografia nieruchomości** z drona, fotografia wnętrz i wideo obiektu w jednym dniu zdjęciowym. |

Dlaczego: „fotografia nieruchomości” i „fotograf nieruchomości” mają 0 wystąpień; „fotografia wnętrz” (20% kosztu kampanii) zostaje.
Dwa razy „fotografia” obok siebie czyta się jak nazwy dwóch usług, nie jak powtórzenie. Długość 114 → 131 znaków.

Wariant łagodniejszy, jeśli dwa „fotografia” Ci przeszkadzają: „**Zdjęcia nieruchomości** z drona, fotografia wnętrz…”.
Słabszy dla Google (inna fraza niż ta, za którą płacisz), ale bez powtórzenia.

### P4 · „O mnie” — `src/components/About.tsx:62`

| | Tekst |
|---|---|
| Teraz | Cześć, jestem Marcin. **Od 2018 roku** buduję wizerunek firm poprzez fotografię i wideo. |
| **Propozycja** | Cześć, jestem Marcin. **Od 2018 roku** buduję wizerunek firm przez **fotografię biznesową** i wideo. |

Dlaczego: „fotografia biznesowa” (WJ 5) ma 0 wystąpień. Przy okazji „poprzez” → „przez”: krócej i tak, jak się mówi przez telefon.
Pogrubienie „Od 2018 roku” zostaje.

### Ryzyko i kontrola przed wdrożeniem

- **Wysokość kart na telefonie.** Karta „Wydarzenia” była już najdłuższa i urośnie o 22 znaki (ok. jedną linię przy 375 px).
  W 2026-08 skracano opis nieruchomości właśnie dlatego, że karta była o 21 px wyższa od pozostałych (`services.tsx`, komentarz przy `subtitle`).
  Po wdrożeniu: zmierzyć wysokość czterech kart przy 375 i 1440 px. Jeśli różnica przeszkadza, skrócić P1 do
  „Fotografia eventowa i reportaż firmowy z konferencji, targów i gal. Zdjęcia, film i dron z jednego dnia, a w opcji dodatkowej…”.
- **Nie zmienia się:** H1, title, description, JSON-LD, URL-e, kolejność kart, CTA.
- SEO: te same frazy pomagają też w wynikach bezpłatnych. Dane GSC strony głównej i obu podstron dostaną 14.10 jako nową zmienną.

### Jak sprawdzić skutek

Kolumna „Jakość strony docelowej” w tabeli słów kluczowych, 4 tygodnie po wdrożeniu (ok. 11.11.2026).
**Kryterium:** z „poniżej średniej” na „przeciętna” lub lepiej na co najmniej 3 z 7 słów; utracony udział w wyświetleniach przez ranking
poniżej 45% (dziś 51%).

---

## B. Google Ads (panel, 15 minut)

### P5 · Wykluczenia z raportu wyszukiwanych haseł (29.09–12.10)

Do wklejenia: Kampania → Słowa kluczowe → Wykluczające słowa kluczowe → dodaj na poziomie kampanii.
Każde sprawdzone pod kątem tego, czy nie zablokuje zapytania kupującego.

```
"photonesto"
studniówkę
studniowke
studniówki
"fotograf na 18"
"fotografa na 18"
trójmiasto
"co to"
```

(cudzysłów = dopasowanie do wyrażenia; bez cudzysłowu = przybliżone)

| Wykluczenie | Dowód | Dlaczego bezpieczne |
|---|---|---|
| "photonesto" | 24 wyświetlenia, 9% wszystkich | nazwa innej firmy |
| studniówkę / studniowke / studniówki | 1 kliknięcie (2,82 zł) + 3 wyświetlenia | lista ma „studniówka”, ale wykluczenie nie łapie polskich odmian |
| "fotograf na 18", "fotografa na 18" | 5 wyświetleń | celowo **nie** samo „na 18”: zablokowałoby „sesja zespołu na 18 osób” |
| trójmiasto | 1 wyświetlenie | poza zasięgiem kampanii |
| "co to" | 1 wyświetlenie | pytanie słownikowe, nie zakupowe |

**Do Twojej decyzji (nie ma ich na liście wyżej):** `przedszkolna`, `szkolna` (2 wyświetlenia). Bezpieczne, chyba że szkoła może być Twoim klientem.

**Świadomie nie wykluczam:** „sesja zdjęciowa mieszkania cena” (może być pośrednik nieruchomości), „zdjecia biznesowe kobieta”,
„marcin szabunia fotograf biznesowy”, „ile kosztuje…”, pojedyncze nazwy studiów z 1–2 wyświetleniami.

### P6 · Opis reklamy nr 1 (RSA, ta sama jedna reklama)

| | Tekst | Znaki |
|---|---|---|
| Teraz | Portrety, eventy i nieruchomości dla firm. Zdjęcia, film i dron w Poznaniu i całej Polsce. | 90 |
| **Propozycja** | Portrety, eventy i nieruchomości dla firm. Zdjęcia, film i dron w Poznaniu i okolicy. | 85 |

Dlaczego: reklama wyświetla się tylko w promieniu 25 km od Poznania, więc „cała Polska” obiecuje coś osobie, do której reklama nie dociera.
Uwaga: edycja tekstu RSA resetuje jej statystyki skuteczności. Jeśli wolisz nie ruszać reklamy przed 30-dniowym odczytem, to jest P4 i może poczekać.

---

## Kolejność, jeśli akceptujesz

1. **P5** (wykluczenia): od razu, w panelu. Odwracalne, nie dotyka reklamy.
2. **P1–P4** (tekst strony): wdrażam w kodzie, lint, build, pomiar wysokości kart, diff do Twojej akceptacji, commit i push po Twoim „tak”.
3. **P6** (opis reklamy): razem z P1–P4 albo po odczycie 20.10.

Wpis do `marketing/google-ads/optimization-log.md` po wdrożeniu, z datą i stanem sprzed zmiany (WJ, utrata przez ranking 51%).
