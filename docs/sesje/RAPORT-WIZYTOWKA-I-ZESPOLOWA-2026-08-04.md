# Wizytówka Google + kotwica cenowa — 04.08.2026

Dwie zasady przyjęte w tej turze:

1. **Wszędzie, gdzie klient widzi cenę, stoi jedna kwota „od" na usługę.** Bez drabinek,
   tabel progresywnych, cen pojedynczych pozycji i dopłat.
2. **Kotwica portretowa brzmi tak, jak ją podyktowałeś:**
   *„Ceny portretów dla jednej osoby zaczynają się od 700 zł netto, a dla zespołów
   od 120 zł netto za osobę."* Zwroty **„za pierwsze zdjęcie"** i **„za jedno ujęcie"**
   są usunięte ze wszystkich powierzchni. W `services.tsx` został komentarz z zakazem,
   żeby nie wróciły przy następnej edycji.

Cennik wewnętrzny zostaje pełny — zmiana dotyczy powierzchni, które czyta klient
albo asystent AI.

---

## 1. Próg 700 zł: co w nim jest

Do tej pory strona i wizytówka mówiły, że w 700 zł jest **studio zewnętrzne w Poznaniu**.
Twoja korekta: **w tej kwocie jest też dojazd z mobilnym studiem do klienta.** Poprawione w:

- `cennik_2026_07_v3.md` §1, PORTRET START — punkt o studiu przepisany na „studio zewnętrzne
  w Poznaniu **albo** dojazd z mobilnym studiem do Twojego biura, wybierasz"; punkt
  „przychodzisz na gotowe" opisuje teraz oba warianty
- `services.tsx` (FAQ „Gdzie znajdę cennik"), `blog.ts`, `llms.txt`
- wizytówka Google: „Zdjęcia profilowe i portretowe" oraz „Fotografia portretowa"

⚠ **Rentowność wariantu mobilnego nie jest policzona.** Model z 04.08 (132 zł/h w ofercie,
~109 zł/h po prowizji) zakładał wynajem studia 130 zł/h. Przy mobilnym studiu ten koszt
znika, ale dochodzi rozstawienie i złożenie sprzętu u klienta plus dojazd zależny od adresu.
Zaznaczyłem to w cenniku jako otwartą pozycję do policzenia na pierwszej realizacji —
nie podstawiałem żadnych liczb.

---

## 2. Wizytówka Google — 11 usług, każda z jedną kwotą

| Usługa | Cena | Co zniknęło z opisu |
|---|---|---|
| Zdjęcia profilowe i portretowe | Od 700 zł | „każde kolejne 200 zł, pakiety od 1 100 zł", „za pierwsze zdjęcie", ekspres +50% |
| Fotografia portretowa | Od 700 zł | to samo |
| Fotografia korporacyjna | Od 120 zł | tabela 180 / 150 / 120 i próg „od 31 osób", stawka za km |
| Fotografia nieruchomości | Od 900 zł | 1 300 zł za komplet, 600 zł za blok wnętrz |
| Produkt | Od 600 zł | „minimalne zamówienie 600 zł" jako druga kwota, ekspres +50% |
| Wydarzenia i przyjęcia | Od 600 zł | ekspres +50% |
| Wideo wizerunkowe / film o firmie | Od 400 zł | opis nie miał kwot, bez zmian |
| Filmowanie z powietrza | Od 700 zł | 1 200 zł, 1 700 zł, stawka za km |
| Produkcja filmów promocyjnych | Od 400 zł | „400 zł za pierwszą godzinę", 1 200 zł za Reels |
| Produkcja filmów z wydarzeń | Od 2 100 zł | nazwa pakietu jako kotwica |
| Wideo marketing | Od 400 zł | „400 zł za pierwszą godzinę", 1 200 zł za gotowy film |

Kategorie „Usługi fotograficzne" i „Wideofilmowanie" to kategorie dodatkowe, nie duplikaty:
pozycje w nich to te same rekordy, więc jedna edycja zmienia obie. Nie ma czego usuwać.
Google pokazuje baner „Twoja zmiana oczekuje na sprawdzenie" — moderacja do 1 dnia.

### Błąd, który popełniłem i cofnąłem

Dodając usługi kliknąłem chip **„Fotografia buduarowa"**, biorąc go za „budowlaną".
Usługa weszła na profil bez ceny i opisu; zauważyłem po adresie `job_type_id:boudoir_photography`
i usunąłem ją w tej samej minucie. Profil sprawdzony po usunięciu. Segment buduarowy jest
u Ciebie trwale wycofany, więc odnotowuję to wprost. W taksonomii Google nie ma „Fotografii
budowlanej", dlatego hale i obiekty weszły do opisu „Fotografii nieruchomości".

---

## 3. Zmiany w repo (niezacommitowane)

| Plik | Zmiana |
|---|---|
| `src/data/services.tsx` | nowe brzmienie kotwicy (`priceFaqIntro` + `priceFaqSuffix`), mobilne studio w FAQ cenowym, komentarz z zakazem „za pierwsze zdjęcie" |
| `src/data/faq.ts` | kotwica na stronie głównej + poseboard „w pakietach" |
| `src/data/blog.ts` | 2 odpowiedzi FAQ i excerpt przepisane; wpis o zdjęciu do CV: 1 100 → 700; `seo.description` wpisu cenowego: 1 100 → 700 |
| `src/data/portfolio.ts` | poseboard „w pakietach" |
| `public/llms.txt` | 8 linii usługowych na jedną kwotę „od"; linia portretowa i FAQ z nowym brzmieniem i mobilnym studiem |

Kontrola: `tsc --noEmit` czysty, `sprawdz_spojnosc.mjs` — 0 błędów na 17 powierzchniach.

### Co zniknęło z `llms.txt`

To plik, z którego ChatGPT i Perplexity cytują Twoje ceny klientom. Podawał im pełne
drabinki: 180/150/120 za osobę, packshot 90/70/55, pakiety dronowe 900 / 1 200 / 1 300 / 1 700,
obiektowe 900/1300/1900, montaż 300/450/1 200/1 800. Teraz każda usługa ma jedną kwotę „od"
i słowny opis zakresu. **Sekcja „Warunki współpracy" nietknięta** — to warunki handlowe,
nie cennik, i kontroler spójności sprawdza ich obecność.

### Poseboard

PORTRET START (700 zł) w cenniku v3 §1 ma wprost: *„Bez poseboardu i bez konsultacji
stylizacyjnej"*. Trzy miejsca na stronie obiecywały poseboard bezwarunkowo. Kontroler kwot
tego nie łapie, bo liczby się zgadzają.

---

## 4. Do Twojej decyzji — pole `content` w `blog.ts` (nie ruszam)

Cztery akapity nadal mówią 1 100 zł jako punkt wyjścia. Gotowe zamienniki:

**`blog.ts:199`** (`headshoty-linkedin-konwersja`) — dwa błędy naraz: kwota i poseboard.

- jest: `Sesja portretowa</a> kosztuje od 1 100 zł netto. (…) Każda sesja obejmuje poseboard z referencjami przed spotkaniem, bez dopłaty.`
- proponuję: `Ceny portretów dla jednej osoby zaczynają się od 700 zł netto. (…) Pakiety obejmują poseboard z referencjami przed spotkaniem, bez dopłaty.`

**`blog.ts:315`** (`zdjecie-do-cv-w-domu`) — najdroższy z czterech: to wpis pod dokładnie
tego czytelnika, dla którego powstał próg 700 zł.

- jest: `Sesja headshot zaczyna się od 1 100 zł,`
- proponuję: `Sesja headshot zaczyna się od 700 zł netto,`

**`blog.ts:501`** (`ile-kosztuje-sesja-wizerunkowa-dla-firmy`)

- jest: `Pakiety portretowe zaczynają się od <strong>1 100 zł</strong> netto.`
- proponuję: `Ceny portretów dla jednej osoby zaczynają się od <strong>700 zł</strong> netto, a dla zespołów od 120 zł netto za osobę.`

**`blog.ts:522`** (ten sam wpis)

- jest: `portret biznesowy</a> zaczyna się od 1 100 zł netto.`
- proponuję: `portret biznesowy</a> zaczyna się od 700 zł netto.`

⚠ Wpis `ile-kosztuje-sesja-wizerunkowa-dla-firmy` ma **rozjazd wewnętrzny**: FAQ, excerpt
i meta mówią 700, treść artykułu 1 100. Domknie się dopiero po Twojej edycji treści.

---

## 5. Zostawione świadomie

**Kroki procesu „Poseboard".** `services.tsx:328` i `portfolio.ts:415` mają go jako krok
nr 2 w grafice procesu. Przy 700 zł tego kroku nie ma. To zmiana w schemacie, nie w zdaniu.

**„Od 120 zł" przy zespołach.** Zostaje — to kotwica sekcji 6 cennika i Twoje sformułowanie.
Ale przy progresji nikt nie płaci średnio 120 zł za osobę: przy zespole czteroosobowym
to 180 zł/os., czyli 720 zł minimum.

**`szablony_mailowe_v5.md:716`** — stanowisko negocjacyjne wciąż zakłada, że najniżej
schodzisz do 1 100.

**Segment CV.** Nadal bez odpowiedzi: czy PORTRET START komunikujemy jako „zdjęcie do CV",
czy jako „jeden portret na LinkedIn". Opisy na wizytówce napisałem w drugim wariancie.
