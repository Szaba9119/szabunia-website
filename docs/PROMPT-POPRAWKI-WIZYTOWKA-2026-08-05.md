# Prompt uruchomieniowy — wdrożenie poprawek na wizytówce Google

Napisany 05.08.2026 na prośbę Marcina, po audycie `AUDYT-WIZYTOWKA-2026-08-05.md`.
Autoryzacja z czatu 05.08.2026: **„wszystko sam, ale najpierw przygotuj"** — czyli asystent
wykonuje zmiany w panelu Google w przeglądarce Marcina, ale najpierw pokazuje komplet
przygotowanych treści.

---

```
Wdrożenie poprawek na Profilu Firmy w Google — szabunia.pl. TRYB: PRZYGOTUJ, POKAŻ, WYKONAJ.

PUNKT WYJŚCIA: docs/sesje/AUDYT-WIZYTOWKA-2026-08-05.md, findingi WIZ2608-01..11.
Repo: drzewo czyste, HEAD f5dd9f4 = origin/main. Z tego wdrożenia NIE wynika ani jedna
zmiana w kodzie — cała robota dzieje się w panelu Google.

AUTORYZACJA I JEJ GRANICE
Marcin autoryzował wykonywanie zmian w panelu. Autoryzacja obejmuje wyłącznie listę
z sekcji ZAKRES poniżej. Nie rozciąga się na nic innego w panelu, a w szczególności
NIE WOLNO: zmieniać nazwy profilu, kategorii głównej ani dodatkowych, obszaru działania,
godzin, telefonu; klikać „Reklamuj się", „Dokończ konfigurację reklam", „Rozpocznij"
przy Merchant Center, „Ustaw rezerwację"; usuwać zdjęć, opinii, usług ani produktów;
zamawiać czegokolwiek; akceptować regulaminów. Wszystko z §12 raportu (nazwa, kategoria,
obszar, czat SMS, Facebook, kampania po opinie) to decyzje biznesowe Marcina i zostaje
nietknięte.

FAZA 0 — PRZYGOTUJ (nic nie klikasz w panelu)
Zbuduj plik PACZKA-WIZYTOWKA-2026-08-05.md z gotowymi treściami:
1. Link witryny z UTM oraz 7 URL-i produktowych z UTM (utm_source=google, utm_medium=organic,
   utm_campaign=gbp, utm_content = slug usługi).
2. Kwoty „od" do pola „Cena produktu (PLN)" dla 7 produktów, wzięte z src/data/services.tsx,
   nie z pamięci i nie z opisów.
3. Opis firmy po przestawieniu: specjalizacja w pierwszym zdaniu, metryka dalej. Ten sam
   zestaw faktów, ani jednej nowej liczby. Limit 750 znaków, policz.
4. Odpowiedź na opinię Michała Jadczaka (5 gwiazdek, bez treści, sześć tygodni bez odpowiedzi).
   Krótka, bez udawania, że wiadomo za co.
5. Trzy wpisy do publikacji w rytmie co 10–14 dni, z materiału, który już istnieje w repo
   i w portfolio.
6. Pięć miniatur produktów: wskaż konkretne pliki z public/images/ pasujące do usług
   (Wideo marketing, Wizerunek i portrety, Sesje zespołowe, Obsługa eventów, Fotografia
   produktowa), przygotuj je w formacie pod GBP i zgraj na dysk Marcina do
   Documents/01_Biznes/_System/06_Wizytowka/miniatury/.
7. Propozycja usługi dronowej w kategorii Fotograf: nazwa z taksonomii Google, jeśli istnieje,
   plus opis i kwota.
Zasada: żaden tekst nie zawiera długiego myślnika, triady przymiotnikowej ani AI-tone
(docs/zasady-tekstow.md). Ceny wyłącznie z kanonu, jedna kwota „od" na usługę.

FAZA 1 — POKAŻ
Wyślij paczkę Marcinowi jednym plikiem. Nie czekaj na odpowiedź — autoryzacja już jest —
ale pokaż, zanim cokolwiek kliknięsz, żeby miał szansę przerwać.

FAZA 2 — WYKONAJ w panelu, w tej kolejności, jedna zmiana naraz
1. Link witryny z UTM (Edytuj profil → Kontakt → Witryna).
2. Opis firmy w nowej kolejności (Edytuj profil → Informacje → Opis).
3. Ceny w 7 produktach (Edytuj ofertę → produkt → pole Cena → Opublikuj).
4. Odpowiedź na opinię (Zobacz opinie → Bez odpowiedzi → Odpowiedz).
5. Miniatury produktów, jeśli upload z dysku Marcina zadziała.
6. Usługa dronowa w kategorii Fotograf.
7. Pierwszy wpis; dwa kolejne zostają w paczce z datami sugerowanymi.
Po KAŻDEJ zmianie: zrzut ekranu przed i po, sprawdzenie, czy pojawił się baner moderacji,
i wpis do dziennika zmian. Jeżeli jakaś zmiana nie przechodzi po dwóch próbach — zostaw ją,
zanotuj i idź dalej. Nie kombinuj obejściem.

ZASADY BEZPIECZEŃSTWA W PANELU
- Jedna zmiana naraz, nigdy dwa pola w jednym zapisie.
- Nie wklejaj do pól nic, czego nie ma w paczce z Fazy 0.
- Przy każdym oknie dialogowym czytaj nagłówek, zanim klikniesz cokolwiek: 04.08 jeden
  chip wpiął na profil „Fotografię buduarową". Ten błąd nie ma prawa się powtórzyć.
- Nie loguj się nigdzie, nie proś o hasła, nie ruszaj ustawień konta.
- Jeżeli panel poprosi o potwierdzenie czegoś spoza listy ZAKRES — anuluj i zapisz w raporcie.

FAZA 3 — RAPORT
Plik POPRAWKI-WIZYTOWKA-2026-08-05.md wg docs/METODYKA-AUDYTU.md §8:
A. Co zrobione, pogrupowane po celu biznesowym, każda pozycja z instrukcją odwrócenia.
B. Co czeka na moderację Google i kiedy sprawdzić.
C. Co zostaje po stronie Marcina (decyzje z §12 raportu, kampania po opinie, zdjęcia).
D. Świadomie odłożone i dlaczego.
E. Jak zweryfikować: dokładna ścieżka klikania dla każdej zmiany.
Zaktualizuj rejestr findingów w raporcie audytowym: status otwarty → wdrożony
albo wdrożony ale czeka na moderację. Statusów nie zmyślaj — tylko to, co potwierdziłeś
zrzutem.

KRYTERIA UKOŃCZENIA (mierzalne)
- Link witryny w profilu zawiera utm_campaign=gbp, sprawdzone odczytem atrybutu href
  w widoku publicznym, nie w edytorze.
- 7 produktów ma niepustą wartość w polu ceny; kwoty zgodne z services.tsx co do złotówki.
- Opis firmy: pierwsze zdanie zawiera słowo „eventów", długość ≤ 750 znaków.
- Filtr „Bez odpowiedzi" w panelu opinii zwraca zero pozycji.
- Żadna kategoria, nazwa, godzina ani numer telefonu nie zmieniły się — potwierdzone
  odczytem po całej sesji.
- Raport wdrożenia zawiera instrukcję odwrócenia każdej zmiany.

NA KONIEC: 5 zdań w czacie. Co weszło, co czeka na moderację, co zostało dla Marcina.
```

---

## Czego ten prompt świadomie nie obejmuje

- **Wgrania 15–20 nowych zdjęć do galerii profilu** (WIZ2608-06). Materiał trzeba wybrać
  okiem fotografa, a nie regułą; asystent przygotuje kandydatów, wybór zostaje przy Marcinie.
- **Kampanii po opinie** (WIZ2608-02), czyli jedynej rzeczy, która realnie rusza widoczność.
  To wysyłka do klientów, a maili asystent nie wysyła.
- **Weryfikacji H1** (czy usługi renderują się na telefonie). Asystent spróbuje emulacji
  mobilnej w kontenerze, ale rozstrzygający jest telefon Marcina.
- **Wszystkiego z §12 raportu.** Nazwa, kategoria, obszar, czat, Facebook to decyzje,
  nie zadania.
