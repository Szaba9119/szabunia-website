# Prompt uruchomieniowy: audyt treści, spójności i języka

Format wg `docs/METODYKA-AUDYTU.md` §12.2. Skill `audyt-szabunia` odpala się na słowo
„audyt", więc prompt nie powtarza metodyki. Daje cztery rzeczy, których agent nie zgadnie:
zakres, dane, głębokość, tryb.

---

## Prompt do skopiowania

```
Audyt szabunia.pl: TREŚĆ, SPÓJNOŚĆ I JĘZYK. TRYB AUTONOMICZNY, odchodzę od komputera, nie pytaj o nic.

REPO: /Users/marcinszabunia/Documents/05_Strona_WWW/marcinszabunia

PYTANIE PRZEWODNIE: które teksty na stronie, w metadanych, w reklamach i w Profilu Firmy
odstają od zasad z docs/zasady-tekstow.md, od słów, których ludzie faktycznie szukają,
i od siebie nawzajem, oraz w jakiej kolejności je poprawiać.

ZAKRES: moduł E w całości + z modułu C wyłącznie warstwa tekstowa (title, description,
H1-H3, alt, OG, llms.txt). Techniczne SEO pomijamy, było 29.07 i 03.08.

INWENTARZ PRZED OCENĄ, raport podaje pokrycie X z Y plików:
- src/data/services.tsx, faq.ts, portfolio.ts, galeria.ts
- src/data/blog.ts, wszystkie wpisy, diagnostycznie
- copy w komponentach: Hero, Services, Process, CTA, About, Warunki, FAQ, PoradnikForm,
  PoradnikTeaser, Footer, Navigation, MobileFAB, TrustStats, Publications, not-found
- metadane: layout.tsx, generateMetadata na trasach dynamicznych, page.tsx każdej trasy
- public/llms.txt, polityka prywatności, mikrokopia formularzy, komunikaty błędów, teksty alt
- poza repo: reklamy RSA w Google Ads (nagłówki, opisy, sitelinki, objaśnienia)
  oraz Profil Firmy w Google (opis firmy, opisy usług)

PIĘĆ OSI OCENY, każdy finding przypisany do jednej:
1. ZGODNOŚĆ Z ZASADAMI: docs/zasady-tekstow.md, czarna lista fraz i konstrukcji,
   test nadrzędny, długie myślniki, Title Case, miasto doklejone przecinkiem.
2. POLSZCZYZNA: ortografia, interpunkcja, odmiana, szyk, zgodność form, konsekwencja
   2. osoby, zapis liczb i kwot, cudzysłowy, literówki. Cytuj całe zdanie z plik:linia.
3. SPÓJNOŚĆ MIĘDZY PLIKAMI: liczby dowodu społecznego, narracja stażu, kotwice cenowe,
   godziny, NAP, lista klientów, nazwy usług, ten sam cytat opinii w różnych plikach,
   obietnica w meta kontra to, co użytkownik faktycznie widzi na stronie.
4. SEO TEKSTOWE: unikalność i długość title (60) i description (155) mierzona w znakach,
   słowa realnie wpisywane wg GSC i wyszukiwanych haseł z Ads, thin content, kanibalizacja.
5. SEM: message match nagłówek RSA kontra H1 landing page, zgodność obietnicy reklamy
   z treścią strony. W RSA miasto w nagłówku jest poprawne i potrzebne, reszta zasad
   z docs/zasady-tekstow.md obowiązuje w reklamach tak samo.

DANE:
- repo lokalne i git: HEAD, czy drzewo czyste, czy produkcja równa się main
- live szabunia.pl przez Chrome, JS włączony, okno widoczne
- panele: [mam zalogowane Ads / GSC / GA4, tylko odczyt] albo [nie mam, oznacz N]
- punkt odniesienia, przeczytaj przed pracą: AUDYT-LEJEK-I-JEZYK-2026-08-02.md,
  PRZEGLAD-REDAKCYJNY-2026-08-02.md, SEO-TITLE-DESCRIPTION-2026-07-30.md,
  część treściowa AUDYT-PELNY-2026-07-29.md. Nie zgłaszaj ponownie tego, co tam zamknięte,
  chyba że wróciło. Jeśli wróciło, oznacz jako regres z datą zamknięcia.
- sprawdź, czy zawartość docs/sesje/poprawki-dron-2026-08-03-NIEZASTOSOWANY.diff jest
  w kodzie. Jeśli nie, to otwarty punkt, nie nowy finding.

GRANICE, decyzje zamknięte wcześniej, nie relitygować:
- Cytatów klientów w Testimonials.tsx i portfolio.ts nie oceniamy pod zasady redakcyjne.
  To cudze wypowiedzi, poprawianie ich jest fałszowaniem opinii.
- Nie proponuj cennika, tabeli cen ani sekcji „Cennik". Decyzja z 03.08.2026.
  Kotwice „od X zł" zostają i są jedynym miejscem z kwotą.
- Fotografia wnętrz, obiektów i architektury jest świadomie wyłączona od 31.07.
  Nie zgłaszaj jej braku jako luki w ofercie.
- blog.ts wchodzi jako diagnoza, nie jako redakcja. Produkt to lista wpisów do rundy
  redakcyjnej, posortowana wg ruchu z GSC, a nie przepisane akapity.
- Zero zmian w plikach, zero commitów, zero zmian w panelach i w Profilu Firmy.
  Audyt kończy się na briefach.

GŁĘBOKOŚĆ:
- Każdy finding z dowodem: plik:linia albo zrzut z panelu z datą. Cytat kopiowany z pliku,
  nigdy z pamięci.
- Dla osi 2 i 3 chcę wyczerpanie, nie próbkę. Jeśli plik był za duży na jedno przejście,
  napisz wprost, jaki procent przejrzałeś i czego nie.
- Finding zawiera jedno gotowe zdanie zamienne, ale nie wprowadzasz go do kodu.
- Nie oceniaj surowego HTML bez JS i CSS. Treść client-side wygląda wtedy jak brak.
- Nie ufaj metrykom audytowanego systemu. Przy GSC sprawdź datę danych raportu.

KOLEJNOŚĆ, zapisuj plik po każdej fazie:
1. PLAN-AUDYT-TRESC-2026-08-04.md, zakres jako checklisty z numeracją §2.x
2. zbiór danych, każda oś osobnym subagentem, instrukcja „zwróć findingi w formacie §5,
   nie streszczaj"
3. AUDYT-TRESC-2026-08-04.md wg §6, obowiązkowo sekcje 2 (sprawdzone i OK),
   9 (czego nie sprawdzono) i 10 (własne fałszywe pozytywy)
4. BRIEFY-TRESC-2026-08-04.md, findingi P0 i P1 przełożone na zadania z mierzalnymi AC
5. rejestr findingów z ID TRESC2608-nr na końcu raportu
6. ostatni subagent weryfikuje pracę: czy każdy finding ma dowód, czy nie ma fałszywych
   pozytywów z §11 metodyki, czy liczby się zgadzają

NA KONIEC: 5 zdań w czacie. Najważniejszy finding, ile P0/P1/P2, co czeka na moją decyzję.
Bez powtarzania raportu.
```

---

## Zanim odejdziesz od komputera

- [ ] Chrome otwarty, zalogowane Google Ads, GSC i GA4, karty nie zminimalizowane
      (`visibilityState: hidden` wstrzymuje render i daje fałszywe findingi)
- [ ] Profil Firmy w Google otwarty w osobnej karcie, jeśli ma być w zakresie
- [ ] drzewo git czyste albo świadomie brudne, agent to odnotuje jako punkt odniesienia
- [ ] w prompcie uzupełniona linijka o panelach, bez tego agent oznaczy wszystko jako `N`

## Wariant krótszy, tylko strona bez paneli

```
Audyt szabunia.pl: TREŚĆ, SPÓJNOŚĆ I JĘZYK, wyłącznie repo. TRYB AUTONOMICZNY, nie pytaj o nic.
Zakres: moduł E + warstwa tekstowa modułu C. Bez Ads, GSC i GBP, oznacz je jako N.
Osie: zgodność z docs/zasady-tekstow.md, polszczyzna, spójność między plikami, SEO tekstowe.
Granice: cytaty klientów nietykalne, cennika nie proponować (decyzja 03.08),
fotografia wnętrz świadomie wyłączona, blog.ts diagnostycznie.
Produkt: PLAN, AUDYT-TRESC-2026-08-04.md, BRIEFY, rejestr ID TRESC2608-nr. Na końcu 5 zdań w czacie.
```

## Po audycie, gdy zdecydujesz o wdrożeniu

```
Wdróż briefy TRESC2608-01, -03, -07 z BRIEFY-TRESC-2026-08-04.md.
Diff osobnym plikiem w docs/sesje/, bez commita. Po każdym pliku npx tsc --noEmit.
Cytatów klientów nie ruszasz. Zmiany w cenach i danych firmowych: stop i pytanie.
```
