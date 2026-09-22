# Teksty reklam (RSA) i rozszerzenia

Data: 2026-09-20, po red-team review. Limity zweryfikowane w dokumentacji Google 20.09.2026:
**15 nagłówków po 30 znaków, 4 opisy po 90 znaków, ścieżki po 15 znaków, maks. 3 RSA na grupę.**
Liczby znaków niżej policzone skryptem.

Wszystkie reklamy prowadzą na `https://szabunia.pl/`.

## Przypięcia (dodane po red teamie, S-01)

**Pozycja 1 przypięta do nagłówka z frazą kluczową grupy.** Powód: przy ~8 kliknięciach
na reklamę miesięcznie nigdy nie zobaczysz, że Google wyświetliło kombinację bez nazwy usługi
i bez miasta. Przypięcie jednej pozycji to gwarancja, że fraza jest w reklamie zawsze.
Pozycje 2 i 3 zostają wolne, żeby Google miało co testować.

Utrata punktów w Skuteczności reklamy jest tu bez znaczenia: **Skuteczność reklamy
nie jest czynnikiem rankingowym**, tylko wskazówką redakcyjną.

## Zasady redakcyjne

Z `docs/zasady-tekstow.md`: bez długich myślników, bez triad przymiotnikowych,
bez wykrzykników, bez Title Case. Miasto w nagłówku RSA jest dozwolone i potrzebne
(reguła z 02.08.2026: Google liczy obecność słowa kluczowego w nagłówku jako składową
Wyniku Jakości).

## Czego świadomie nie użyłem

**Nazw marek klientów (H&M, Santander, Warner Music).** Stare reklamy miały nagłówek
„Fotograf marek H&M i Warner". Polityka Google dotycząca znaków towarowych ogranicza
używanie cudzych znaków w treści reklamy, a ryzyko odrzucenia przy budżecie 152 zł
miesięcznie jest nieproporcjonalne. Dodatkowo notatka w pamięci projektu mówi,
że prawa do części tych materiałów są nierozstrzygnięte.

**Kwot.** Stare reklamy obiecywały „Sesja wizerunkowa od 1 100 zł". To podwójnie nieaktualne:
próg portretowy zszedł do 700 zł netto 04.08.2026, a commit `d52c01f` z 14.08.2026 zdjął
wszystkie kwoty z widocznej strony. Wyjątek: „Dojazd w Poznaniu 0 zł" w objaśnieniach,
bo warunki handlowe zostały na stronie świadomie (`faq.ts:42`).

**„Od 2018 roku".** Research konkurencji: Strumiłło 20+ lat, Służenko 20+, RZ-Studio 20+,
zdjeciebiznesowe 15+, Kępiński od 2010, Wołyniak 10+, Adamczak 8+. **W tej stawce rok 2018
to najkrótszy staż, więc eksponowanie go jest dobrowolnym przegraniem porównania.**
Zamiast daty startu mówimy o wolumenie: „Ponad 100 obsłużonych firm", „Ponad 1000 sesji
i eventów". Obie liczby mają pokrycie w `src/data/proof.ts`.


## RSA 1 — „Wizerunek i fotografia biznesowa | Poznań”

**Nagłówki (15, limit 30 znaków), pozycja 1 przypięta:**

 1. `Fotograf biznesowy Poznań` — 25  ← przypięty do pozycji 1
 2. `Fotografia biznesowa Poznań` — 27
 3. `Sesja biznesowa w Poznaniu` — 26
 4. `Zdjęcia biznesowe Poznań` — 24
 5. `Sesja wizerunkowa Poznań` — 24
 6. `Zdjęcia firmowe dla zespołu` — 27
 7. `Portrety biznesowe dla firm` — 27
 8. `Headshot na LinkedIn` — 20
 9. `Zdjęcia dla firm w Poznaniu` — 27
10. `Ponad 100 obsłużonych firm` — 26
11. `Zdjęcia i film dla firm` — 23
12. `Wycena w ciągu 24 godzin` — 24
13. `Studio albo Twoje biuro` — 23
14. `Cały zespół w jednej sesji` — 26
15. `Ponad 1000 sesji i eventów` — 26

**Opisy (4, limit 90 znaków):**

1. `Portrety biznesowe i zdjęcia zespołów dla firm w Poznaniu. Studio albo sesja u Ciebie.` — 86
2. `Prowadzę przez pozowanie, nie musisz nic umieć. Gotowe pliki do marketingu i na LinkedIn.` — 89
3. `Ponad 100 obsłużonych firm i ponad 1000 sesji. Wstępną wycenę dostaniesz w 24 godziny.` — 86
4. `Zdjęcia i film od jednej osoby. Zakres ustalamy przed ceną, bez niespodzianek na fakturze.` — 90

## RSA 2 — „Wizerunek i fotografia biznesowa | Poznań” (wariant alternatywny)

Zmiana po red teamie (S-03): nagłówek „Realizacje w Polsce i Europie” wymieniony na
„Dojazd w Poznaniu w cenie”. Powód: sprzedawanie zasięgu ogólnopolskiego odbiorcy
zdefiniowanemu jako fizycznie obecny w Poznaniu było niespójne, a treść dublowała objaśnienie.
Nowy nagłówek ma pokrycie w `src/data/faq.ts:42`.

**Nagłówki (15, limit 30 znaków), pozycja 1 przypięta:**

 1. `Zdjęcia dla firm Poznań` — 23  ← przypięty do pozycji 1
 2. `Fotograf dla firm w Poznaniu` — 28
 3. `Sesja wizerunkowa dla firmy` — 27
 4. `Fotograf firmowy Poznań` — 23
 5. `Portret biznesowy Poznań` — 24
 6. `Zdjęcia zespołu i zarządu` — 25
 7. `Headshoty dla całej firmy` — 25
 8. `Zdjęcia na LinkedIn i stronę` — 28
 9. `Fotograf biznesowy w Poznaniu` — 29
10. `Foto i wideo dla firm` — 21
11. `Zdjęcia firmowe Poznań` — 22
12. `Dojazd w Poznaniu w cenie` — 25
13. `Napisz, odpowiem w 24 h` — 23
14. `Sesja w Twoim biurze` — 20
15. `Zobacz portfolio realizacji` — 27

**Opisy (4, limit 90 znaków):**

1. `Fotografia biznesowa dla firm w Poznaniu: wizerunek zespołu, portrety, zdjęcia przy pracy.` — 90
2. `Jeden fotograf prowadzi całą realizację, od pierwszej rozmowy do gotowych materiałów.` — 85
3. `Spójne zdjęcia całego zespołu w jednej sesji. Gotowe na stronę i do social media.` — 81
4. `Ponad 100 firm, ponad 1000 sesji. Napisz po wstępną wycenę, odpowiadam w 24 godziny.` — 84

## RSA 3 — „Fotografia produktowa | Poznań”

Zmiana po red teamie (S-02): sześć nagłówków niosło jeden komunikat. Trzy wymienione
na różnicujące: „Białe tło albo aranżacja”, „Zdjęcia gotowe w 14 dni” (`services.tsx:547`),
„Wycena za sztukę przy serii”.

**Nagłówki (15, limit 30 znaków), pozycja 1 przypięta:**

 1. `Fotografia produktowa Poznań` — 28  ← przypięty do pozycji 1
 2. `Zdjęcia produktowe Poznań` — 25
 3. `Packshoty na białym tle` — 23
 4. `Fotograf produktowy Poznań` — 26
 5. `Białe tło albo aranżacja` — 24
 6. `Packshot do sklepu online` — 25
 7. `Produkty w aranżacji` — 20
 8. `Zdjęcia na kartę produktu` — 25
 9. `Zdjęcia gotowe w 14 dni` — 23
10. `Ponad 100 obsłużonych firm` — 26
11. `Wycena w ciągu 24 godzin` — 24
12. `Zdjęcia i wideo produktowe` — 26
13. `Gotowe pliki do e-commerce` — 26
14. `Wycena za sztukę przy serii` — 27
15. `Zobacz portfolio produktów` — 26

**Opisy (4, limit 90 znaków):**

1. `Packshoty na białym tle i produkty w aranżacji. Pliki gotowe do sklepu i na marketplace.` — 88
2. `Zdjęcia produktowe dla firm w Poznaniu. Wycena od zakresu, bez niespodzianek na fakturze.` — 89
3. `Ponad 100 obsłużonych firm i ponad 1000 sesji. Wstępną wycenę dostaniesz w 24 godziny.` — 86
4. `Zdjęcia i wideo produktowe od jednej osoby, od ustalenia zakresu do gotowych plików.` — 84

## Objaśnienia (callouts, limit 25 znaków)

- `Wycena w 24 godziny` — 19
- `100+ obsłużonych firm` — 21
- `Foto, wideo i dron` — 18
- `Studio albo Twoje biuro` — 23
- `Dojazd w Poznaniu 0 zł` — 22
- `Cena po ustaleniu zakresu` — 25

## Linki do podstron (sitelinki)

Dodane po red teamie (W-02). **Wszystkie prowadzą do kotwic na stronie głównej**, więc
warunek „jeden landing” zostaje zachowany. Brief dopuszcza to wprost: „Jeżeli anchor URL
w obrębie homepage jest zgodny z aktualnymi zasadami Google Ads i rzeczywiście poprawia UX,
możesz go rozważyć”.

Dlaczego to ma znaczenie akurat tutaj: na frazach rdzenia **nie ma żadnych reklam tekstowych**
(SERP 20.09.2026). Jesteś jedynym reklamodawcą, więc sitelinki dają cały górny blok zamiast
jednej linijki, a wyższy Ad Rank przy braku konkurencji obniża realny CPC. Identyfikatory
sekcji zweryfikowane w kodzie: `#portfolio`, `#uslugi`, `#kontakt`, `#o-mnie`.

- **Portfolio realizacji** (20) | Zdjęcia i filmy dla firm (24) | Zobacz wybrane projekty (23) | `https://szabunia.pl/#portfolio`
- **Zakres usług** (12) | Wydarzenia, wizerunek, produkty (31) | Cztery obszary współpracy (25) | `https://szabunia.pl/#uslugi`
- **Zapytaj o wycenę** (16) | Wstępna wycena w 24 godziny (27) | Krótki formularz kontaktowy (27) | `https://szabunia.pl/#kontakt`
- **O mnie** (6) | Fotograf B2B z Poznania (23) | Ponad 100 obsłużonych firm (26) | `https://szabunia.pl/#o-mnie`

## Rozszerzenia: co dodać, a czego nie

| Rozszerzenie | Decyzja | Powód |
|---|---|---|
| Objaśnienia | **TAK**, 6 | Darmowa powierzchnia, same sprawdzalne fakty ze strony |
| Sitelinki (kotwice) | **TAK**, 4 | Patrz wyżej. Zmiana po red teamie |
| **Połączenie + konwersja telefoniczna** | **TAK, priorytet** | Patrz niżej |
| Informacje o firmie, logo | **TAK** | Wiarygodność, zero ryzyka |
| Lokalizacja | **TAK, warunkowo** | Wymaga wizytówki Google, która jest osobnym otwartym tematem |
| Objaśnienia strukturalne | **NIE na starcie** | Wyliczanka filarów rozmywa komunikat grupy |
| Obrazy | **NIE na starcie** | Przy 25 kliknięciach/mies. nie da się ocenić wpływu, a podnoszą CTR na zapytaniach ogólnych |
| Ceny, promocje | **NIE** | Strona nie publikuje kwot od 14.08.2026 |

### Dlaczego rozszerzenie połączeń jest tu ważniejsze niż zwykle

Łańcuch pomiaru webowego jest zerwany **strukturalnie, nie przez błąd konfiguracji**:
`src/lib/utm.ts` zapisuje `gclid` wyłącznie po zgodzie na cookies, a `consent.ts` domyślnie
zwraca `false`. Lead od osoby, która nie kliknęła „Akceptuję", przychodzi bez źródła
i wygląda jak organiczny. **Tego nie naprawi się w panelu Ads.**

Konwersja z rozszerzenia połączeń (numer przekierowania Google, połączenie dłuższe niż X sekund)
liczy się **po stronie Google**, poza Consent Mode, poza GA4 i poza kodem strony.
Przy 78% ruchu mobilnego i działającym `tel:+48514900688` w hero to jedyny pomiar,
który zadziała niezależnie od zgody.

## Co tu jest hipotezą

**Nie wiem, który z tych tekstów zadziała najlepiej.** Dwa RSA w grupie wizerunkowej
istnieją po to, żeby Google je porównało.

⚠️ **Zastrzeżenie z red teamu, które przyjmuję:** przy ~8 kliknięciach na reklamę miesięcznie
porównanie dwóch RSA nie osiągnie istotności ani w kwartał, ani w pół roku. Zostawiam dwa
warianty, bo brief prosił o wariant alternatywny, ale **pierwszy odczyt robić przez ocenę
zasobów (Najlepsze / Dobre / Słabe), nie przez CTR reklamy.** Jeśli zależy Ci na szybszym
odczycie, wstrzymaj RSA 2 i zostaw jedną reklamę na grupę.
