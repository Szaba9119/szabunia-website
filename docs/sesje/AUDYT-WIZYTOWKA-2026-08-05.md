# Audyt WIZYTÓWKA GOOGLE — 5 sierpnia 2026

**Zakres:** Profil Firmy w Google „Marcin Szabunia Fotograf Biznesowy" — tożsamość i NAP,
opis, usługi, produkty, zdjęcia, opinie, wpisy, skuteczność, widoczność lokalna, pomiar.
**Okno czasowe:** stan profilu na 05.08.2026; dane o skuteczności: marzec–sierpień 2026 (okno panelu).
**Metoda:** widok właściciela w Chrome na koncie Marcina (panel „Twoja firma w Google", edytor
profilu, edytor usług, edytor produktów, panel opinii z filtrem „Bez odpowiedzi", Skuteczność)
+ widok publiczny w Mapach i knowledge panel + cztery testy local pack + **produkcja szabunia.pl
odpytana na żywo** + repo: drzewo **czyste**, HEAD `f5dd9f4` = `origin/main` (numery linii w cytatach
pochodzą z odczytu tego drzewa 05.08.2026).
**Wykluczone:** widok mobilny, 6 z 7 opisów produktów, Q&A, GA4, Rezerwacje, panel Google Ads.
Pełna lista z powodami w §9.
**Plan źródłowy:** `PLAN-AUDYT-WIZYTOWKA-2026-08-05.md`
**Prompt uruchomieniowy:** `PROMPT-AUDYT-WIZYTOWKA-2026-08-05.md`
**Weryfikacja:** raport przeszedł kontrolę przez niezależnego subagenta-recenzenta; jego zarzuty
naniesione, a te, które sam okazał się mieć błędne, opisane w §10.

> Dokument diagnostyczny. Żadne zmiany w profilu, w panelach ani w repo nie zostały wykonane.

---

## 0. TL;DR

Profil jest **kompletny i spójny cenowo, a spójność sięga aż na produkcję**. Wszystkie 11 usług
ma kwoty zgodne z kanonem w `services.tsx` i `llms.txt`, godziny zgadzają się z JSON-LD co do
minuty, nie ma śladu zakazanych zwrotów ani po pomyłkowej „Fotografii buduarowej" z 04.08.
Zmiana modelu sesji zespołowych z 05.08 jest już i na wizytówce, i na żywej stronie. Praca
z ostatnich dwóch dni obroniła się w całości.

Problem leży w tym, na co profil jest w ogóle pokazywany. W oknie marzec–sierpień zebrał
**1 225 wyświetleń i 20 interakcji (1,6%)**, a wśród haseł, które go wyświetliły, **330 z 383
pokazanych w panelu to samo słowo „fotograf"** (Google ukrywa hasła poniżej 15 wystąpień, więc
realny udział mieści się w przedziale ok. 78–86%). Reszta czołówki: „fotograf poznań" (53),
a dalej zapytania o godziny otwarcia punktu fotograficznego i o punkt w galerii M1. Test na żywo
potwierdza, czyja to fraza: w local packu na „fotograf Poznań" stoją Foto-Błysk (814 opinii),
Super Foto (1,6 tys.) i Zakład Fotograficzny Żółtowska (421) — zakłady ze stacjonarnym odbiorem
zamówień. Na czterech testowanych frazach **profilu nie ma w packu ani razu**.

| Obszar | Stan | Czy mierzone 04.08.2026 |
|---|---|---|
| Ceny i opisy usług (11) | ✅ zgodne z repo i z produkcją | tak — poprawione, dziś obronione |
| Godziny, telefon, tożsamość encji | ✅ zgodne z JSON-LD | nie |
| Produkty (7) | ❌ puste pole ceny, trzy miniatury nie pracują na B2B | nie — nie były przedmiotem tamtej sesji |
| Zdjęcia | ❌ ostatnie 81 dni temu | nie |
| Opinie | ⚠️ 10 przy 1000+ sesjach, jedna bez odpowiedzi | nie |
| Pomiar | ❌ brak UTM w linku do witryny | nie |
| Widoczność na frazy B2B | ❌ zero obecności w packu (4 z 4 fraz) | nie |

**Wniosek nadrzędny:** kolejna edycja treści niczego nie ruszy, dopóki profil jest wyświetlany
głównie na słowo „fotograf" — czyli w kolejce do zakładu fotograficznego. Dźwignią są opinie
i świeżość zdjęć, nie tekst.

**Jedna decyzja do podjęcia teraz:** czy ruszamy kampanię po opinie z listy klientów 2025–2026
i z ilu nazwisk. Reszta tego raportu to robota na godzinę; ta jedna rzecz zmienia wynik.

---

## 1. Ocena obszarów

**Świadomie bez oceny liczbowej w skali 0–100.** Trzy z sześciu obszarów wiszą na hipotezie H1
(czy sekcja „Usługi" w ogóle renderuje się klientowi) i na dowodach z jednej pozycji na siedem.
Liczba zbiorcza sugerowałaby precyzję, której te dane nie mają — a §11 metodyki wprost ostrzega
przed oceną wyprowadzoną z kaskady jednej przesłanki. Ocena liczbowa wejdzie do re-audytu 05.11,
gdy H1 będzie rozstrzygnięta.

| Obszar | Stan | Na czym stoi ocena |
|---|---|---|
| Kompletność danych | mocny | wszystkie pola profilu wypełnione, brak tylko opcjonalnych (rezerwacje, ceny produktów) |
| Spójność z witryną | mocny | 8 kwot, godziny, terminy, liczby, marki, wyróżnienia — zgodne z repo i z produkcją |
| Treść ofertowa | słaby | usługi wzorowe, produkty odstają; waga zależy od H1 |
| Dowód społeczny | słaby | 10 opinii przy 1000+ sesjach, brak systemu zbierania |
| Świeżość | słaby | zdjęcia 81 dni, wpisy 30 dni |
| Pomiar | najsłabszy | brak UTM — kanału nie da się rozliczyć w GA4 |

---

## 2. Sprawdzone i OK (zweryfikowane)

Odczyty z 05.08.2026 z panelu właściciela albo z widoku publicznego, porównane z kodem
na czystym drzewie `f5dd9f4` i — tam, gdzie to miało znaczenie — z żywą produkcją.

- ✅ **Kwoty 11 usług zgodne z kanonem.** Wydarzenia 600 = `llms.txt:17`; Fotografia korporacyjna
  1 400 = `services.tsx:212`; Produkcja filmów z wydarzeń 2 100 = `llms.txt:19`; portrety 700 =
  `services.tsx:328`; wideo 400 = `services.tsx:408`; produkt 600 = `services.tsx:459`; dron 700 =
  `services.tsx:526`; nieruchomości 900 = `services.tsx:615`.
- ✅ **Zmiana z 05.08 jest wszędzie, łącznie z produkcją.** Opis „Fotografii korporacyjnej"
  na wizytówce: „Sesje wizerunkowe zespołów od 1 400 zł netto za dwie osoby, każda kolejna 120 zł".
  Żywa strona `szabunia.pl/uslugi/sesje-zespolowe` odpytana 05.08: „Sesje zespołowe zaczynają się
  od 1 400 zł netto za dwie osoby, a każda kolejna osoba to 120 zł". Drzewo czyste,
  HEAD = `origin/main`, commit `5a5b63a` z 05.08. **Nie ma rozjazdu wizytówka ↔ produkcja.**
- ✅ **Zakazane zwroty nie wróciły.** „Za pierwsze zdjęcie" i „za jedno ujęcie" — zero wystąpień
  w 11 opisach usług i w opisie firmy (opisy produktów: sprawdzone 2 z 7, patrz §9).
- ✅ **Brak śladu po „Fotografii buduarowej"** w żadnej z trzech kategorii.
- ✅ **Godziny 1:1 z JSON-LD:** nd zamknięte, pon–pt 08:00–20:00, sob 10:00–16:00 =
  `layout.tsx:173-193`. Wymóg z komentarza w kodzie („zmiana tutaj = zmiana w wizytówce w tym
  samym ruchu") dotrzymany.
- ✅ **Telefon** 514 900 688 = `telephone: "+48514900688"` (`layout.tsx:150`).
- ✅ **Tożsamość encji.** Profil ma kgmid `/g/11rcwdrdcl` (z adresu Map), JSON-LD wskazuje ten sam
  identyfikator w `sameAs` (`layout.tsx:203`). Finding PELNY2907-10 domknięty.
- ✅ **Link do wystawiania opinii wskazuje ten profil.** `g.page/r/CcGxT8A_KfJREBM/review`
  z `Testimonials.tsx:133` zdekodowany obliczeniowo: pole 1 fixed64 = CID `0x51f2293fc04fb1c1`,
  identyczny z CID w adresie Map. Nie jest to link-sierota po starej wizytówce. Weryfikacja
  odtworzona niezależnie przez recenzenta.
- ✅ **Nie znaleziono duplikatu profilu.** Wyszukanie „Marcin Szabunia" w Mapach 05.08 zwraca
  jedną encję. Duplikat był jedynym prawdopodobnym wyjaśnieniem adresów w agregatorach (H3).
- ✅ **Liczby dowodu społecznego spójne:** „250 000+ zdjęć, 1000+ sesji, 100+ obsłużonych marek"
  = `TrustStats.tsx:10-13` i `About.tsx:75-78`. Staż „od 2018" = `About.tsx:48`, `llms.txt:8`
  i data otwarcia w profilu (1 marca 2018).
- ✅ **Marki spójne:** H&M, Santander, John Deere, Warner Music, IQOS, Amica, Centrum Posnania
  = `LogoBar.tsx` + `llms.txt:10`.
- ✅ **Wyróżnienia spójne:** Portret 2022 (`layout.tsx:319`), okładka Big Furniture Group Magazine
  kwiecień 2026 (`Publications.tsx:32-61`).
- ✅ **Terminy spójne:** wycena 24 h, zdjęcia 14 dni, wideo 21 dni.
- ✅ **Model bez adresu** („Brak lokalizacji, tylko dostawy i usługi w domu klienta") zgodny
  ze stanem faktycznym: nie ma studia stacjonarnego, jest mobilne.
- ✅ **Kategorie:** Fotograf (główna) + Usługi fotograficzne + Wideofilmowanie. Pozycje usług
  powtarzają się między kategoriami, bo to te same rekordy — ustalenie z 04.08 potwierdzone
  w edytorze, nie ma czego usuwać.
- ✅ **Dziewięć z dziesięciu opinii ma odpowiedź właściciela** — filtr „Bez odpowiedzi" w panelu
  zwraca dokładnie jedną pozycję.

---

## 3. Ustalenia — P0

Brak. Nic w profilu nie powoduje dziś utraty leada ani nie blokuje oceny pozostałych obszarów.

---

## 4. Ustalenia — P1

**WIZ2608-01. [BIZNES/SEO] Profil jest wyświetlany głównie na słowo „fotograf", czyli na intencji
zakładu fotograficznego** (§2.7, §2.8 planu) — panel Skuteczność, okno mar–sie 2026, odczyt
05.08.2026 + cztery testy local pack z tego samego dnia. · P1 · L · 🧑 · Z (panel z datą + live)

Dane, bez interpretacji:

- Zestawienie wyszukiwań: „fotograf" 330, „fotograf poznań" 53, następnie trzy hasła podane przez
  Google jako „< 15": zapytanie o godziny otwarcia punktu fotograficznego przy ul. Poznańskiej,
  „fotograf m1 poznań" (M1 to galeria handlowa w Poznaniu), „fotograf poznan". Panel podaje
  łącznie 383. Ponieważ trzy hasła z ogona mają ukryte liczby, udział frazy „fotograf" wynosi
  **od ok. 78% do 86%** — nie jest to jedna precyzyjna wartość.
- Wyświetlenia profilu: 1 225. Platformy: Mapy mobile 493, Szukajka mobile 330, Mapy desktop 211,
  Szukajka desktop 191 — **łącznie 67% ruchu z telefonu**.
- Interakcje: 20 (III 5, IV 5, V 7, VI 1, VII 2, VIII 0). Współczynnik interakcji: 1,6%.
- Local pack 05.08.2026 (Poznań, przeglądarka zalogowana):

| Fraza | Pozycje w packu | Opinie | Kategoria | Szabunia |
|---|---|---|---|---|
| fotograf Poznań | Foto-Błysk / Super Foto / Zakład Fot. Żółtowska | 814 / 1 600 / 421 | Fotograf, Fotograf, Zakład fotograficzny | nieobecny |
| fotograf eventowy Poznań | MaSz Studio / Igor Wojtkowiak / Joanna Adamczak | 309 / 49 / 72 | Fotograf ×3 | nieobecny |
| fotograf biznesowy Poznań | RZ-STUDIO / zdjeciebiznesowe.pl / K. Wołyniak | 335 / 129 / 74 | Studio fotografii, Fotograf, Fotograf | nieobecny |
| fotograf produktowy Poznań | fp360.pl / Liryka Studio / Focus Photo | 25 / 31 / **6** | Studio fotografii ×3 | nieobecny |

Mechanizm — **hipoteza robocza, nie ustalenie**: przy kategorii „Fotograf" i braku adresu profil
dopasowuje się do najszerszej frazy z kategorii, a ta fraza w Poznaniu należy do zakładów
fotograficznych (trzy pozycje z packu na „fotograf Poznań" mają odbiór zamówień w sklepie).
Nie mam pomiaru, który by to rozstrzygnął — algorytmu Google nie audytuję.

Skutek biznesowy, ostrożnie: profil zbiera zasięg, którego **nie da się dziś powiązać z leadami**,
bo pomiar nie istnieje (WIZ2608-03). Twierdzenie „ten ruch nie kupuje" jest prawdopodobne
i zgodne z treścią zapytań, ale nieudowodnione — patrz H5.

Dlaczego P1, a nie P0: nic nie krwawi, żaden lead nie ginie. Dlaczego nie P2: to ustalenie
determinuje sens wszystkich pozostałych działań na tej powierzchni.

Poprawka: nie tekst. Dwie dźwignie w kolejności — liczba opinii (WIZ2608-02) i świeżość zdjęć
(WIZ2608-06). Kategoria i nazwa: §12, jako decyzje z ryzykiem.

**WIZ2608-02. [BIZNES] Dziesięć opinii przy 1000+ zrealizowanych sesjach** (§2.4, §2.7 planu) —
panel opinii i cztery testy local pack, 05.08.2026. · P1 · M · 🧑 · Z (live)

Stan: 10 opinii, średnia 5,0, najnowsza sprzed około miesiąca. Konkurenci w packach mają
od 6 do 1 600 opinii.

Uwaga metodyczna, która osłabia ten finding i zostaje w nim celowo: **trzeci wynik w packu
produktowym ma 6 opinii, czyli mniej niż Marcin.** Liczba opinii nie jest więc warunkiem
wystarczającym — te trzy profile mają adres fizyczny i kategorię „Studio fotografii".
Opinie są dźwignią realną, ale nie jedyną i nie zawsze decydującą.

Skutek biznesowy: 5,0 z dziesięciu opinii czyta się jako „mały", nie jako „wyborny". Klient
B2B porównujący trzy profile widzi wolumen, nie tylko średnią.

Poprawka: kampania po opinie na liście klientów z ostatnich 12–18 miesięcy, link
`g.page/r/CcGxT8A_KfJREBM/review` (zweryfikowany), prośba dołączana do maila z galerią.
Cel i kryterium sukcesu: **25 opinii na 05.11.2026** (jeden termin dla całego raportu).

---

## 5. Ustalenia — P2 / P3 / P4

**WIZ2608-03. [POMIAR] Link do witryny w profilu bez UTM — kanału nie da się rozliczyć**
(§2.8 planu) — odczyt atrybutu `href` linku „Witryna" 05.08.2026: host `szabunia.pl`, ścieżka `/`,
zero parametrów zapytania. · P2 · S · 🧑 · Z (live)

Ten sam brak w jedynym sprawdzonym URL-u docelowym produktu („Obsługa eventów firmowych" →
`szabunia.pl/uslugi/eventy-reportaze`, bez parametrów). Pozostałych sześciu nie odczytano (§9).

Mechanizm: kliknięcie z wizytówki wpada w GA4 jako `google / organic` albo `direct` i miesza się
z ruchem z wyników wyszukiwania. Nie da się odpowiedzieć na pytanie „ile leadów przyszło
z wizytówki", a to jedyne pytanie uzasadniające dalszą pracę nad tym kanałem. Panel Google
pokazuje wyłącznie kliknięcia po swojej stronie — to metryka audytowanego systemu, nie pomiar
biznesowy.

Dlaczego P2, a nie P1: kanał wygenerował 20 interakcji w pół roku. Brak pomiaru boli poznawczo,
nie finansowo.

Poprawka: link witryny → `https://szabunia.pl/?utm_source=google&utm_medium=organic&utm_campaign=gbp`
(Google dopuszcza parametry w polu witryny), ten sam schemat z `utm_content` w URL-ach produktów.
Po tygodniu sprawdzić w GA4, czy źródło się wydziela.

**WIZ2608-04. [TREŚĆ] Produkt bez ceny w polu ceny — kwota siedzi wyłącznie w opisie**
(§2.5 planu) — edytor produktu „Obsługa eventów firmowych", 05.08.2026: pole „Cena produktu (PLN)"
puste, opis zaczyna się od „Od 600 zł netto…". · P2 · S · 🧑 · **Z (1 z 7 pozycji)** +
sygnał pośredni: w publicznym widoku drugiego produktu („Wideo marketing") też nie ma chipa
cenowego. Sześć pozostałych: N — do odczytu w panelu.

Sekcja „Produkty" jest jedyną powierzchnią ofertową, która **renderuje się w knowledge panelu** —
usług tam nie ma (H1). Klient widzi siedem kafelków z nazwą i słowem „Oferta", bez ani jednej
kwoty; cena pojawia się dopiero po kliknięciu i przeczytaniu opisu.

Poprawka: wpisać kwotę „od" w polu ceny każdego produktu, zgodnie z kanonem z `services.tsx`.
Opisów nie ruszać.

**WIZ2608-05. [UX/TREŚĆ] Trzy z siedmiu miniatur produktów nie pracują na komunikat B2B**
(§2.5 planu) — edytor produktów i widok publiczny, 05.08.2026, plus porównanie z plikami
źródłowymi w repo. · P2 · M · 🧑 · Z (opis kadru) + O (ocena dopasowania)

**Skorygowane po weryfikacji plików źródłowych** (pierwotna wersja mówiła o pięciu
kafelkach, patrz §10.9):

| Produkt | Co jest na miniaturze | Werdykt |
|---|---|---|
| Wideo marketing | portret kobiety w czerwonym garniturze z wklejonym napisem „Co ogranicza Twój sklep?" | ❌ kreacja reklamowa z tekstem w kadrze |
| Obsługa eventów firmowych | scena koncertowa z zespołem w czerwonym świetle | ❌ czyta się jako event muzyczny, nie firmowy |
| Fotografia produktowa | rozmyty kadr z kieliszkami na tle nieba | ❌ brak produktu jako bohatera kadru |
| Wizerunek i portrety | mężczyzna z gimbalem, `portret-01-operator-z-kamera.jpg` | ⚠️ to portret z Twojej galerii, więc formalnie pasuje; komunikuje branżę kreatywną, nie zarząd. Sąd, nie ustalenie |
| Sesje zespołowe | para w kadrze, `sesje-zespolowe-cover.jpg` | ✅ ta sama okładka co na stronie, a sesja startuje od dwóch osób |
| Zdjęcia i wideo z drona | budynek z powietrza | ✅ |
| Pakiety Foto + Wideo + Dron | kadr z wydarzenia | ➖ nieoceniony, kafelek poza ekranem (§9) |

Kafelki produktów są pierwszym obrazem oferty w knowledge panelu, a przy trzech z nich
klient nie widzi tego, co kupuje.

Poprawka: podmienić trzy kafelki, czwarty do Twojej oceny. Gotowe pliki i uzasadnienie
w `PACZKA-WIZYTOWKA-2026-08-05.md` §5.

**WIZ2608-06. [BIZNES] Zdjęcia nie były dodawane od 81 dni** (§2.3 planu) — komunikat panelu
„Ostatnio dodane zdjęcia: 81 dni temu" (05.08.2026 → ok. 16.05.2026). · P2 · M · 🧑 · Z (panel)

Dodatkowe odczyty, bez wniosku przyczynowego: w widoku publicznym Map galeria ma zakładki
„Wszystko / Zdjęcie fotograficzne / **Miłość** / Od właściciela", a na pierwszym ekranie stoją
portrety studyjne — przy pozycjonowaniu z 30.07, które postawiło eventy przed portretami.
Statystyki zdjęć: dwa kadry mają 6,01 tys. i 1,79 tys. wyświetleń, cztery kolejne 128–194.
**Nie sprawdziłem, które to zdjęcia** (§9), więc nie twierdzę, że najlepiej oglądane są „nie te" —
twierdzę tylko, że rozkład jest bardzo nierówny i warto go wykorzystać przy doborze nowych.

Skąd bierze się zakładka „Miłość", nie wiem — to etykieta nadana przez Google, nie przez Marcina,
i nie znam reguły, według której powstaje. Jeśli chodzi o nią samą, wgranie nowych zdjęć jej
nie usunie; może ją co najwyżej przesunąć w kolejności.

Poprawka: 15–20 nowych kadrów w jednej wrzutce — eventy, hale i produkcja, sesje zespołowe
w biurze klienta, packshoty. Potem rotacja raz w miesiącu. Efekt mierzalny: licznik
„ostatnio dodane" wraca do zera i nie przekracza 30 dni.

**WIZ2608-07. [BIZNES] Jedna opinia bez odpowiedzi od sześciu tygodni** (§2.4 planu) — filtr
„Bez odpowiedzi" w panelu opinii, 05.08.2026: Michał Jadczak, Lokalny przewodnik, 13 opinii,
ocena 5, sześć tygodni temu (ok. 24.06.2026), bez treści. · P2 · S · 🧑 · Z (panel)

To jedyna opinia bez odpowiedzi z dziesięciu. Trzy odpowiedzi, które przeczytałem, są konkretne
i wymieniają realizację z nazwy — pozostałych sześciu nie czytałem (§9), więc oceny całości nie
wystawiam.

Poprawka: krótka odpowiedź — opinia jest bez treści, więc bez udawania, że wiadomo, za co.
Rytm docelowy: odpowiedź w 48 h od pojawienia się opinii.

**WIZ2608-08. [SEO] Trzy luki w mapowaniu usług na kategorie** (§2.2 planu) — edytor usług,
05.08.2026. · P3 · S · 🧑 · Z (panel), **skutek warunkowy wobec H1**

- W kategorii **Fotograf** nie ma żadnej usługi dronowej. Dron istnieje tylko jako „Filmowanie
  z powietrza" w Wideofilmowaniu, a na stronie linia brzmi „Zdjęcia **i wideo** z drona"
  (`llms.txt:23`).
- „Wideo wizerunkowe / film o firmie" wisi pod kategorią **Fotograf**, choć trzy pozostałe
  pozycje wideo stoją w Wideofilmowaniu.
- Pakiety hybrydowe (2 100 zł, sztandarowa linia cennika v3) są schowane pod nazwą z taksonomii
  Google „Produkcja filmów z wydarzeń". Nikt tak nie szuka pakietu foto + wideo.

Jeśli H1 okaże się prawdziwa i sekcja usług nie renderuje się klientom, wartość tej poprawki
spada do zera i schodzi z listy.

Poprawka: dodać usługę dronową w kategorii Fotograf (jeśli taksonomia ma pozycję lotniczą;
jeśli nie — usługa własna), przenieść wideo wizerunkowe, a opis „Produkcji filmów z wydarzeń"
zacząć od słów „Pakiet foto + wideo".

**WIZ2608-09. [TREŚĆ] Opis firmy otwiera się metryką, nie ofertą** (§2.2 planu) — odczyt opisu,
05.08.2026. · P3 · S · 🧑 · **O (opinia)**

Opis zaczyna się: „Fotograf biznesowy i twórca wideo w Poznaniu, na rynku od 2018 roku.
250 000+ zdjęć, 1000+ sesji, 100+ obsłużonych marek, w tym H&M, Santander, John Deere."
Specjalizacja („obsługa eventów firmowych, sesje zespołowe, portrety na LinkedIn, wideo
wizerunkowe") jest dopiero w czwartym zdaniu. Nie zmierzyłem, w którym miejscu Google przycina
opis w widoku skróconym — dlatego to sąd o kolejności, nie ustalenie.

Poprawka: zamienić miejscami zdanie pierwsze i czwarte. Treści nie ubywa, liczby zostają.

**WIZ2608-10. [TREŚĆ] Nazwa profilu i nazwa encji w JSON-LD to dwa różne brzmienia** (§2.1 planu) —
odczyt 05.08.2026. · P3 · S · 🧑 · Z (panel + kod)

Wizytówka: „Marcin Szabunia Fotograf Biznesowy". JSON-LD (`layout.tsx:149`): „Marcin Szabunia,
fotograf eventowy i biznesowy". Obie nazwy opisują tę samą firmę i żadna nie jest błędem, ale
`sameAs` i `@id` mają spinać encję w jeden węzeł Knowledge Graph, a nazwa jest jednym z sygnałów
tego spięcia. Do tego wersja z wizytówki gubi człon eventowy, mimo repozycjonowania z 30.07.

Poprawka: nie ruszać bez decyzji §12.1 — zmiana nazwy w wizytówce ma ryzyko moderacyjne,
a zmiana `name` w JSON-LD to stop-condition CLAUDE.md §10.3.
**[DECYZJA MARCINA — stop-condition CLAUDE.md §10.3]**

**WIZ2608-11. [BIZNES] Ostatni wpis 6 lipca 2026, a trzy poprzednie wrzucone tego samego dnia**
(§2.5 planu) — widok publiczny Map, sekcja „Dostarczył właściciel": Artech Group, Woohoo /
E-commerce All In, Yes Butcher, wszystkie 6 lip 2026. · P3 · S · 🧑 · Z (live)

Wpisy są dobre: konkretne, z nazwą klienta i policzalnym zakresem („20 packshotów", „film
podsumowujący i 3 pionowe reelsy"). Problemem jest rytm, nie treść — trzydzieści dni ciszy
i publikacja seriami zamiast regularnie.

Poprawka: jeden wpis co 10–14 dni, z materiału, który i tak powstaje przy realizacjach.

---

## 6. Hipotezy do sprawdzenia (H)

**H1. Sekcja „Usługi" może się w ogóle nie renderować klientowi.** W widoku publicznym Map
(zakładki: Przegląd / Opinie / Informacje) i w knowledge panelu nie pojawia się żadna lista usług —
pojawia się za to sekcja „Produkty" (7 kafelków). Jeśli tak samo jest na telefonie, praca z 04.08
nad 11 opisami usług trafiła w powierzchnię, której klient nie ogląda, a niedopracowane produkty
są tym, co widzi. Od tej hipotezy zależy waga WIZ2608-04, -05 i -08.
**Krok weryfikujący:** Marcin otwiera profil w Mapach **na telefonie** i sprawdza, czy jest
zakładka „Usługi" z listą i cenami. Pięć minut. Desktop nie odpowie na to pytanie.

**H2. Spadek interakcji od czerwca jest najprawdopodobniej szumem.** Rozkład: III 5, IV 5, V 7,
VI 1, VII 2, VIII 0 (miesiąc trwa). Przy n = 20 w pół roku różnica między 7 a 1 to jedna wizyta
w tygodniu. Kusi, żeby powiązać to z tym, że zdjęcia przestały wchodzić w połowie maja — i to
jest dokładnie ten rodzaj wniosku, którego z tych danych wyciągać nie wolno.
**Krok weryfikujący:** nie interpretować przed re-audytem; porównać średnią miesięczną
z okna sie–paź ze średnią z mar–maj.

**H3. Adresy w agregatorach: Garbary 51 (maptons) i Skoczowska 4 (polomap).** Profil w Google
nie ma adresu, a duplikatu wizytówki nie znaleziono (§2), więc te dane nie pochodzą z Map.
Najprawdopodobniej to stare wpisy albo scraping.
**Krok weryfikujący:** otworzyć oba wpisy i sprawdzić, czy w ogóle dotyczą Marcina. Zerowa
pilność — te katalogi nie mają ruchu, a ryzyko duplikatu zostało wykluczone.

**H4. Czat SMS jest włączony i nie wiadomo, czy obsługiwany.** W profilu stoi „Numer do pisania
SMS-ów: sms:+48514900688".
**Krok weryfikujący:** zakładka „Kliknięcia prowadzące do czatu" w Skuteczności — sprawdzić,
czy w ogóle były kliknięcia; jeśli tak, a nie było odpowiedzi, wyłączyć albo zacząć odpowiadać.

**H5. „Ten ruch nie kupuje" — teza prawdopodobna, nieudowodniona.** Treść zapytań („do której ma
otwarty…", „fotograf m1 poznań") i skład local packu na „fotograf Poznań" (zakłady z odbiorem
w sklepie) mocno na to wskazują, ale bez pomiaru nie da się tego zamknąć.
**Krok weryfikujący:** po wdrożeniu UTM (WIZ2608-03) zestawić leady ze skrzynki z sesjami
`utm_campaign=gbp` przez jeden pełny miesiąc.

---

## 7. Obserwacje bez akcji

- **67% wyświetleń z telefonu** (823 z 1 225). Argument, żeby każdą decyzję wizualną — miniatury,
  okładkę, kolejność zdjęć — oceniać na telefonie, nie na monitorze.
- **„Kompletność profilu: Pełne informacje"** — to ocena Google o samym sobie, nie wynik audytu.
  Odnotowuję jako dane, nie jako zielony checkpoint.
- **Zmiana w moderacji.** 05.08 w edytorze usług wisiał baner „Twoja zmiana oczekuje na sprawdzenie.
  Jej opublikowanie może potrwać do 1 dnia". To normalny tryb pracy Google, nie defekt — ale jest
  powodem, żeby nie oceniać dziś ostatecznie tego, co widzi klient. Sprawdzić 06.08.
  Uwaga osobna: **nie ustaliłem, kto i kiedy wprowadził zmianę ceny na 1 400 zł** — 04.08 stało
  tam 120 zł, dziś stoi 1 400. Audyt niczego nie zmieniał; zmiana pochodzi spoza tej sesji.
- **Rozkład ocen:** średnia 5,0 przy 10 opiniach oznacza dziesięć piątek. Histogram w panelu
  potwierdza słupek tylko przy „5".
- **Atrybuty profilu:** wizyty online, wymagane umówienie wizyty, przyjazne dla osób LGBTQ+,
  wyłączony atrybut o zatrudnianiu uchodźców, „nie prezentuje się jako firma należąca do kobiety".
  Nic tu nie wymaga ruchu.
- **Obszar działania: 20 miejscowości aglomeracji poznańskiej** (limit Google), przy opisie
  mówiącym „Poznań, cała Polska, Europa na życzenie". Obszar nie wpływa na ranking, tylko na to,
  co klient przeczyta — decyzja §12.4.
- **Facebook z ~1,4 tys. obserwujących** wychodzi w SERP na nazwisko, a nie jest podpięty ani
  w profilach społecznościowych wizytówki (jest tylko Instagram), ani w `sameAs`. Temat otwarty
  od czerwca (CLAUDE.md §9).
- **Dwa najczęściej oglądane zdjęcia** (6,01 tys. i 1,79 tys. wyświetleń) warto zidentyfikować,
  zanim dołoży się nowe — Google już powiedział, co ludzie oglądają.

---

## 8. Świadomie NIE ruszamy

- **Kategoria główna „Fotograf"** — zmiana na „Studio fotografii" podniosłaby dopasowanie do fraz
  produktowych (trzy z trzech profili w tamtym packu mają tę kategorię), ale byłaby niezgodna
  ze stanem faktycznym: nie ma studia stacjonarnego. Decyzja §12.2.
- **Nazwa profilu** — konkurenci w packach jadą na keyword stuffingu („Igor Wojtkowiak Fotograf -
  Sesje i Filmy Biznesowe w Poznaniu", „Zdjęcia biznesowe, zdjęcia wizerunkowe, sesje zdjęciowe |
  fotografia - Joanna Adamczak"). To działa i jest niezgodne z wytycznymi Google, a sankcją bywa
  zawieszenie profilu. Decyzja §12.1.
- **Treść dziewięciu odpowiedzi na opinie** — trzy przeczytane są dobre, reszty nie oceniam.
- **Ceny** — zgodne z kanonem i z produkcją, stop-condition CLAUDE.md §10.7.
- **Repo** — z tego audytu nie wynika ani jedno zadanie dla Claude Code. Wszystkie dziewięć
  pozycji planu działania to robota w panelu Google, po stronie Marcina.

---

## 9. Czego NIE sprawdzono (i co jest potrzebne)

| Obszar (punkt planu) | Powód | Czego potrzeba |
|---|---|---|
| Widok mobilny Map i Szukajki (§2.2, §2.3) | z sesji nie mam telefonu, a desktop kłamie o mobile | Marcin, 5 minut (H1) |
| Opisy, ceny i URL-e 6 z 7 produktów (§2.5) | edytor produktu przestał się ładować po pierwszym wejściu | powtórka w panelu; wzorzec potwierdzony na 1 pozycji + sygnał pośredni na 2. |
| Q&A (§2.4) | sekcja nie renderuje się w widoku desktop | sprawdzić na telefonie; prawdopodobnie zero pytań |
| Liczba zdjęć w profilu (§2.3) | panel pokazuje kafelki leniwie, dokładne policzenie wymaga przewinięcia całej galerii | przeliczyć w panelu „Zdjęcia" |
| Które kadry są okładką i logo, i czy to najmocniejsze B2B (§2.3) | logo to monogram MS, okładki nie oceniłem na telefonie | ocena na telefonie razem z H1 |
| Zgodność cytatów opinii w `Testimonials.tsx` z treścią w Google (§2.4) | przeczytałem 3 z 10 opinii | przegląd 10 opinii i porównanie z komponentem |
| Oferta / promocja w profilu (§2.5) | nie wchodziłem w „Edytuj ofertę" poza listą produktów | odczyt w panelu |
| Telefon w profilu vs numer w kampaniach Ads (§2.8) | panel Ads poza zakresem tego audytu | przegląd w Google Ads — to potencjalnie większe źródło rozjazdu atrybucji niż brak UTM |
| Udział ruchu z wizytówki w GA4 (§2.8) | bez UTM nie da się wydzielić — to jest WIZ2608-03 | wdrożyć UTM, poczekać tydzień |
| E-mail w profilu (§2.1) | Profil Firmy w Google nie ma pola e-mail; kontakt idzie przez telefon, SMS i witrynę | nic — pozycja planu była błędna |
| Fraza „dron Poznań" z planu §2.7 | wypadła przy zbiorze danych; zamiast „zdjęcia biznesowe Poznań" przetestowałem „fotograf biznesowy Poznań" | dorzucić do re-audytu, żeby seria była porównywalna |
| Rezerwacje (Reserve with Google) | nieskonfigurowane, poza modelem sprzedaży B2B | decyzja, czy w ogóle |
| Historia edycji i moderacji profilu | panel nie udostępnia logu zmian | sprawdzić 06.08, czy baner zniknął |

---

## 10. Pozorne problemy skorygowane w trakcie audytu

1. **„Wizytówka została na starej kotwicy 120 zł za sesję zespołową".** Najbardziej prawdopodobny
   finding wchodząc w audyt. Sprawdzone w edytorze: stoi 1 400 zł z opisem „każda kolejna 120 zł".
   **Wniosek metodyczny:** dokument z wczoraj nie jest stanem faktycznym na dziś.
2. **„Linia obiektowa jest wyłączona na stronie, a sprzedawana na wizytówce".** Sprawdzone w kodzie:
   `DRAFT_SERVICE_SLUGS` (`services.tsx:703`) jest **pusty od 04.08.2026**, z komentarzem, że linia
   wróciła na prośbę Marcina. **Wniosek:** kod rozstrzyga, notatka sprzed pięciu dni nie.
3. **„Produkcja pokazuje stare ceny, bo drzewo jest niezacommitowane".** Zarzut podniesiony przez
   recenzenta na podstawie dokumentu z 04.08 — i **nieprawdziwy na dziś**. Drzewo jest czyste,
   HEAD `f5dd9f4` = `origin/main`, a żywa strona `szabunia.pl/uslugi/sesje-zespolowe` odpytana
   05.08 podaje 1 400 zł i 120 zł za kolejną osobę. **Wniosek:** dowód z produkcji bije dowód
   z dokumentu, nawet gdy dokument ma pięć dni.
4. **„Brak sekcji Usługi w Mapach to błąd konfiguracji".** Zeszło do H1 — nie mam dowodu z widoku
   mobilnego.
5. **„Profil ma 20 interakcji, więc jest martwy".** 20 to interakcje (telefon, witryna, trasa),
   a nie zasięg — zasięg to 1 225 wyświetleń. Dwie różne metryki panelu, bardzo łatwe do zlania
   w jedno zdanie.
6. **„86% wyświetleń pochodzi z frazy fotograf".** Pierwotne brzmienie mieszało dwie metryki
   (wyświetlenia vs wyszukiwania) i traktowało 383 jako pełny mianownik, choć Google ukrywa hasła
   poniżej 15 wystąpień. Skorygowane na „330 z 383 pokazanych wyszukiwań, udział ok. 78–86%".
7. **Ocena liczbowa 72/100.** Tabela obszarów sumowała się do 69, a trzy z sześciu wierszy zależały
   od nierozstrzygniętej hipotezy H1. Ocena usunięta z tej edycji zamiast poprawiona — wróci
   w re-audycie, gdy H1 będzie zamknięta. **Wniosek:** liczba zbiorcza w audycie, w którym połowa
   wag zależy od jednej niesprawdzonej przesłanki, jest gorsza niż jej brak.
8. **Zlanie planu ze zbiorem danych.** Plan deklaruje, że powstał przed danymi, a mimo to zawiera
   liczbę „81 dni" — bo pierwszy rzut oka na panel właściciela padł przed napisaniem planu.
   Odnotowuję to jako własne odstępstwo od §1 metodyki, nie zacieram.
9. **„Pięć z siedmiu miniatur nie pasuje do usługi".** Skorygowane 05.08 przy przygotowaniu
   poprawek, po otwarciu plików źródłowych w repo. Kafelek „Sesje zespołowe" używa
   `sesje-zespolowe-cover.jpg`, czyli okładki, którą Marcin sam wybrał dla tej usługi
   na stronie, a sesja zespołowa startuje od dwóch osób, więc dwoje ludzi w kadrze jest
   poprawne. Kafelek „Wizerunek i portrety" używa `portret-01-operator-z-kamera.jpg`
   z galerii portretów, czyli formalnie pasuje. Finding zszedł z pięciu pozycji na trzy plus
   jedna do oceny. **Wniosek metodyczny:** ocena kadru z miniatury 180 px to za mało; zanim
   napiszę „nie pasuje", muszę otworzyć plik źródłowy i sprawdzić, skąd pochodzi.

---

## 11. Plan działania

Wszystko poniżej dzieje się **w panelu Google, po stronie Marcina**. Do repo nie idzie ani jedno
zadanie; jedyny punkt dotykający kodu (nazwa w JSON-LD) jest zablokowany decyzją §12.1.

### Kolejność wdrożenia (nie ważność)

1. **(P2, S)** Podmień link witryny w profilu na wersję z UTM → „Edytuj profil" → Kontakt →
   Witryna → efekt: w GA4 pojawia się źródło `gbp`, kanał staje się rozliczalny.
2. **(P2, S)** Odpowiedz na opinię Michała Jadczaka → panel opinii → „Bez odpowiedzi" →
   efekt: 10/10 opinii z odpowiedzią.
3. **(P3, S)** Przestaw kolejność zdań w opisie firmy: specjalizacja przed metryką.
4. **(H1, 5 min)** Otwórz profil na telefonie i sprawdź, czy jest zakładka „Usługi" —
   od tego zależy sens punktów 5 i 6.
5. **(P2, S)** Uzupełnij pole „Cena" w produktach kwotami z `services.tsx` (jeśli H1 nie wywróci
   priorytetu).
6. **(P2, M)** Podmień 5 miniatur produktów na kadry z właściwej usługi.
7. **(P2, M)** Wrzuć 15–20 zdjęć: eventy, hale i produkcja, sesje zespołowe u klienta, packshoty.
8. **(P1, L)** Uruchom kampanię po opinie z listy klientów 2025–2026, link
   `g.page/r/CcGxT8A_KfJREBM/review`, prośba wysyłana razem z galerią.
9. **(P3, S)** Dodaj usługę dronową w kategorii Fotograf, przenieś wideo wizerunkowe
   do Wideofilmowania, przepisz pierwsze zdanie opisu „Produkcji filmów z wydarzeń".
10. **(P3, S)** Wróć do rytmu wpisów: jeden co 10–14 dni.

### Szybkie wygrane (<1 h łącznie)

Punkty 1, 2, 3 i 4. Cztery rzeczy, wszystkie w panelu, żadna nie wymaga materiału zdjęciowego.

### Większe projekty

Punkt 8 (kampania po opinie — jedyna pozycja z tej listy, która realnie rusza widoczność),
7 (materiał zdjęciowy), 6 (miniatury).

### Data kontrolna

**Re-audyt: 5 listopada 2026.** Krócej nie ma sensu przy 20 interakcjach na pół roku.
Sprawdzić dokładnie tymi samymi metrykami, w oknach tej samej długości:

- liczba opinii i średnia (dziś: 10 / 5,0; cel: 25)
- **średnia miesięczna** wyświetleń i interakcji w oknie sie–paź vs mar–maj
  (mar–maj: 5,7 interakcji/mies.; całe mar–sie: 1 225 wyświetleń, 20 interakcji)
- rozkład wyszukiwanych haseł i udział frazy „fotograf" (dziś: 330 z 383 pokazanych, ok. 78–86%)
- obecność w local packu na **pięć** fraz: fotograf Poznań, fotograf eventowy Poznań, fotograf
  biznesowy Poznań, fotograf produktowy Poznań, dron Poznań (dziś: 0 z 4 sprawdzonych)
- „ostatnio dodane zdjęcia" w dniach (dziś: 81)
- data ostatniego wpisu (dziś: 6 lipca 2026)
- sesje z `utm_campaign=gbp` w GA4 (dziś: pomiar nie istnieje)
- status H1 (czy usługi renderują się na mobile)

---

## 12. Decyzje potrzebne od Marcina

**12.1. Nazwa profilu.** Dziś „Marcin Szabunia Fotograf Biznesowy", w JSON-LD „Marcin Szabunia,
fotograf eventowy i biznesowy". Repozycjonowanie z 30.07 postawiło eventy przed portretami.

- **A. Zostawić obie nazwy jak są.** Zero ryzyka, zgodne z wytycznymi Google. Odwracalne.
- **B. Dodać człon eventowy w wizytówce.** Zysk: dopasowanie do frazy, na której chcesz być.
  Ryzyko: nazwa w profilu musi być nazwą używaną w świecie realnym; po zgłoszeniu przez konkurencję
  Google cofa nazwę, przy powtórkach zawiesza profil. Odwracalne przez moderację.
- **C. Ujednolicić w drugą stronę — zmienić `name` w JSON-LD.** Stop-condition CLAUDE.md §10.3,
  wymaga Twojej zgody; korzyść wyłącznie porządkowa.
- **D. Nie robić nic z nazwą i budować widoczność opiniami.** Wolniejsze, bez ryzyka.

Rekomendacja: **A + D** (nie B — profil z 10 opiniami nie ma zapasu, żeby przeżyć zawieszenie).
Kryterium sukcesu: pozycja w packu na „fotograf eventowy Poznań" po osiągnięciu 25 opinii,
sprawdzana 05.11.2026.

**12.2. Kategoria główna.** Dziś „Fotograf". Wszystkie trzy profile w packu produktowym mają
„Studio fotografii".

- **A. Zostawić „Fotograf".** Zgodne ze stanem faktycznym (brak studia stacjonarnego).
- **B. Zmienić na „Studio fotografii".** Zysk: lepsze dopasowanie do fraz produktowych.
  Ryzyko: kategoria sugeruje miejsce, którego nie ma; przy modelu bez adresu to zgrzyt.
  Odwracalne.
- **C. Zostawić główną, dołożyć „Studio fotografii" jako czwartą dodatkową.** Kompromis,
  ale rozmywa profil na trzy intencje.
- **D. Nie robić nic** — patrz A; różnica między A i D jest tylko taka, że A to świadome
  potwierdzenie stanu.

Rekomendacja: **A**. Bariera na frazach produktowych jest strukturalna (adres i kategoria
lokalowa), nie do przeskoczenia samą etykietą.

**12.3. Kampania po opinie.** Jedyna decyzja z realnym wpływem na wynik.

- **A. Wszyscy klienci firmowi z ostatnich 18 miesięcy**, prośba dołączana do maila z galerią,
  bez ponaglania. Zysk: największa pula. Ryzyko: część kontaktów jest zimna, odsetek odpowiedzi
  spadnie. Odwracalne (nie wysyłasz drugi raz).
- **B. Tylko klienci z 2026 roku.** Zysk: świeże relacje, wyższa konwersja na opinię.
  Ryzyko: pula może nie wystarczyć do 25 opinii.
- **C. Prośba tylko przy nowych realizacjach, od dziś.** Zysk: zero pracy jednorazowej, buduje
  nawyk. Ryzyko: przy obecnym tempie 25 opinii to kwestia roku, nie kwartału.
- **D. Nie robić nic.** Konsekwencja: profil zostaje przy dziesięciu opiniach, a wszystkie
  pozostałe punkty tego raportu zmieniają co najwyżej wygląd profilu, nie jego widoczność.

Rekomendacja: **A**, z treścią prośby przygotowaną raz i wklejaną. Kryterium sukcesu:
25 opinii na 05.11.2026.

**12.4. Obszar działania.** Dziś 20 miejscowości aglomeracji poznańskiej (limit Google), przy
opisie „cała Polska, Europa na życzenie".

- **A. Zostawić.** Obszar nie wpływa na ranking; lista jest spójna z tym, gdzie dojeżdżasz bez
  doliczania kilometrów.
- **B. Wymienić kilka podpoznańskich wsi na Warszawę i Wrocław.** Zysk: komunikat, że jeździsz
  po Polsce. Koszt: znikają miejscowości, w których realnie pracujesz.
- **C. Nie robić nic** — tożsame z A.

Rekomendacja: **A**.

**12.5. Czat SMS.** Włączony, nie wiadomo czy obsługiwany (H4).

- **A. Zostawić i odpowiadać w 24 h.** Zysk: jeszcze jedna ścieżka kontaktu, tania.
- **B. Wyłączyć.** Zysk: zero ryzyka, że Google pokaże klientowi długi czas reakcji.
- **C. Nie robić nic** do czasu sprawdzenia H4 — rekomendowane, bo być może nikt nigdy nie kliknął.

**12.6. Facebook (~1,4 tys. obserwujących).** Dodać do profili społecznościowych w wizytówce
i do `sameAs` w JSON-LD (stop-condition CLAUDE.md §10.3), czy podtrzymać decyzję „tylko Instagram"
z 09.06? Temat wraca w trzecim audycie z rzędu — warto go domknąć w jedną albo w drugą stronę.

---

## Rejestr findingów

| ID | Finding | P | Owner | Pewność | Status |
|---|---|---|---|---|---|
| WIZ2608-01 | Profil wyświetlany głównie na słowo „fotograf" (78–86% haseł), zero obecności w packu na 4 frazach | P1 | 🧑 | Z (panel + live) | otwarty |
| WIZ2608-02 | 10 opinii przy 1000+ sesjach | P1 | 🧑 | Z (live) | otwarty |
| WIZ2608-03 | Brak UTM w linku do witryny (i w 1 sprawdzonym URL-u produktu) | P2 | 🧑 | Z (live) | otwarty |
| WIZ2608-04 | Puste pole ceny w produkcie — potwierdzone na 1 z 7 | P2 | 🧑 | Z (1/7) + N (6/7) | otwarty |
| WIZ2608-05 | 3 z 7 miniatur produktów nie pracuje na komunikat B2B (skorygowane z 5, §10.9) | P2 | 🧑 | Z (odczyt) + O (ocena) | otwarty |
| WIZ2608-06 | Zdjęcia sprzed 81 dni | P2 | 🧑 | Z (panel) | otwarty |
| WIZ2608-07 | Jedna opinia bez odpowiedzi od 6 tygodni | P2 | 🧑 | Z (panel) | otwarty |
| WIZ2608-08 | Luki w mapowaniu usług na kategorie (dron, wideo, pakiety) | P3 | 🧑 | Z, skutek warunkowy wobec H1 | otwarty |
| WIZ2608-09 | Opis firmy otwiera się metryką, nie ofertą | P3 | 🧑 | O | otwarty |
| WIZ2608-10 | Nazwa profilu ≠ `name` w JSON-LD | P3 | 🧑 | Z (panel + kod) | czeka na decyzję §12.1 |
| WIZ2608-11 | Ostatni wpis 6 lipca, publikacja seriami | P3 | 🧑 | Z (live) | otwarty |

Hipotezy: **H1** (renderowanie usług na mobile — od niej zależy waga -04, -05, -08),
**H2** (spadek interakcji jako szum), **H3** (adresy w agregatorach), **H4** (czat SMS bez obsługi),
**H5** (czy ten ruch w ogóle kupuje).

---

*Audyt wykonał: Claude (Cowork), 05.08.2026. Dane: panel właściciela Profilu Firmy w Google
i widok publiczny (Mapy, knowledge panel), odczyty z 05.08.2026; Skuteczność za marzec–sierpień
2026; cztery testy local pack z 05.08.2026, Poznań; produkcja szabunia.pl odpytana 05.08.2026;
repozytorium `marcinszabunia`, drzewo czyste, HEAD `f5dd9f4` = `origin/main`. Raport przeszedł
weryfikację przez niezależnego recenzenta; korekty naniesione, sporne zarzuty rozstrzygnięte
w §10. Audyt nie wprowadza zmian w profilu ani w kodzie.*
