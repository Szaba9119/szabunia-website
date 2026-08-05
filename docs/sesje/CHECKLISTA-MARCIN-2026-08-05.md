# Checklista Marcina — po sesji 05.08.2026

Co zostało po Twojej stronie, w kolejności wykonania. Plan i uzasadnienia:
`PLAN-POPRAWEK-2026-08-05.md`. Dowody: `AUDYT-PELNY`, `AUDYT-GOOGLE-ADS`, `AUDYT-WIZYTOWKA`
z 05.08.2026.

**Zasada kolejności:** najpierw to, co odblokowuje resztę. Krok 4 (skrzynka) jest warunkiem
sensu całego kanału płatnego. Krok 12 (stawka godzinowa) blokuje trzynaście decyzji cennikowych.

> **Stan na 05.08.2026, 17:50.** Kroki 1, 2 i 7 **wykonane**: deploy poszedł
> (`f5dd9f4..742beb7`), wszystkie dziesięć sprawdzeń produkcji zielone, hipotezy H1 i H2
> obalone. Zostaje **krok 3** (siedem kliknięć) z bloku A oraz całe bloki B, C, D i E.
> Rejestr odczytów: `POMIARY-2026-08-05.md`.

Łącznie do zrobienia: **ok. 55 minut klikania + 6 odpowiedzi jednoliterowych.**
Reszta to decyzje, nie robota.

---

## BLOK A — deploy i weryfikacja (dziś, ok. 25 minut)

### 1. Deploy ⏱ 5 min

Stan przed: `main` = `f5dd9f4` = `origin/main` = produkcja. 28 plików zmienionych, 3 nowe.
Kontrole przeszły: `lint` 0/0, `tsc --noEmit` czysto, `build` sukces,
`sprawdz_spojnosc.mjs` **0 błędów / 0 kwot spoza kanonu / 0 brakujących powierzchni**.

Push do `main` = automatyczny deploy produkcyjny na Vercelu. **Nie odpalaj `vercel --prod`.**

- [x] przejrzeć diff
- [x] commit kodu → **`c51b875`**, 32 pliki
- [x] commit dokumentacji → **`742beb7`**, 18 plików
- [x] push → **`f5dd9f4..742beb7 main -> main`**, deploy produkcyjny odpalony

### 2. Weryfikacja po deployu ⏱ 5 min — ✅ **WSZYSTKIE DZIESIĘĆ ZIELONE**

Odczyt 05.08.2026 ok. 17:50, `scripts/weryfikacja-po-deploy.sh`. Pełny rejestr:
`POMIARY-2026-08-05.md §1`.

- [x] `q=80` na portrecie autora → **200**, zero żądań `q=78` na podstronie
- [x] karta OG linii obiektowej → **200** (było 404 od dnia publikacji)
- [x] sitemapa → **50 adresów, 24 pozycje z `lastmod` 2026-08-05, zero `box17`**
- [x] `ItemList` na `/portfolio` → **8 realizacji, zero `box17`**
- [x] `/blog` → `ItemList` obecny, `application/rss+xml` w `<head>`
- [x] `lastBuildDate` w RSS → **Wed, 29 Jul 2026** (było 28.06)
- [x] `llms.txt` → **5-15 min/os.**, zero wystąpień „10-15"
- [x] `data-cta` → **23 unikalne** (przed turą 14)
- [x] 404 → **`noindex, follow`**

### 2b. Bonus: H1 i H2 rozstrzygnięte przy okazji ⏱ 0 min — ✅ **OBIE OBALONE**

- [x] **H1:** `marcinszabunia.pl/portrety-biznesowe` → **`HTTP/2 308`**, nie 302.
      Osiem lat historii starej domeny **przenosi się poprawnie**. Alarm był fałszywy
- [x] **H2:** `www.szabunia.pl/` → **`HTTP/2 308`**. Zero ryzyka duplikatu treści

Obie etykiety „302" pochodziły z warstwy pobierania agenta, nie z produkcji.
To piąty fałszywy odczyt z tego samego źródła w tej sesji. **Do wykreślenia z `§6` audytu.**

### 3. Kliknięcia, których skrypt nie sprawdzi ⏱ 10 min

- [ ] `/uslugi/wizerunek-portrety`: **portret Marcina w bloku „Kto to zrobi"** jest widoczny,
      nie szary kwadrat. Sprawdzić w jasnym i ciemnym motywie
- [ ] `/blog/<dowolny-wpis>`: przy widocznym banerze cookies **przewinąć w dół i kliknąć
      strzałkę „do góry"** w prawym dolnym rogu. Ma zadziałać. *(Tego jednego nie domierzyłem:
      panel przeglądarki był ukryty i strona się nie przewijała)*
- [ ] `/poradnik`: przycisk **„Zobacz portfolio" prowadzi na `/portfolio`**, nie na `/galeria`
- [ ] `/poradnik`, ciemny motyw: **link „polityką prywatności" nie znika przy najechaniu**
- [ ] `/blog`: karty w rzędzie mają **równą wysokość**, ostatnia karta nie czeka 2 sekundy
- [ ] strona główna: licznik „250 000+" **nie mruga zerem** po wejściu w widok
- [ ] pasek nawigacji ma **tę samą wysokość** co przed zmianą (linki dostały `py-2`)

---

## BLOK B — pomiary, bez których dwa findingi zostają hipotezami (ok. 15 minut)

### 4. ⚠️ Gdzie trafiają maile z formularza ⏱ 5 min · **PYTANIE NUMER JEDEN**

To jedyne pytanie, którego nie da się obejść żadnym pomiarem w panelu. Audyt Ads znalazł
w skrzynce `marcin.szabunia@gmail.com` **zero zapytań ofertowych** w oknie 06.07–04.08, przy
504,84 zł wydatku. Ale istnieje druga skrzynka, `marcin@szabunia.pl`, do której audytor
nie miał dostępu.

- [ ] sprawdzić `marcin@szabunia.pl` za okres 06.07–04.08: **ile zapytań z formularza**
- [ ] zapisać liczbę do `POMIARY-2026-08-05.md`

**Dopóki tej liczby nie ma, każda liczba w kolumnie „Konwersje" w Ads jest deklaracją
Google o samym sobie.** Trzy „konwersje" z panelu to jedno wysłanie formularza plus dwa
kliknięcia w link.

### 5. Test end-to-end formularza ⏱ 10 min

- [ ] wejść na `szabunia.pl/?utm_source=test&utm_medium=test&gclid=TEST123`
- [ ] przeklikać się na dowolną podstronę usługi (sprawdza, czy UTM przeżywa nawigację)
- [ ] wysłać formularz z treścią „test 05.08"
- [ ] sprawdzić: mail doszedł? jest w nim blok **„Źródło"** z `gclid: TEST123`?
      jest **„Strona wysyłki"**? *(to nowe pole, dodane dziś)*
- [ ] następnego dnia: czy Ads pokazuje `contact_submit`

### 6. PageSpeed Insights ⏱ 3 min · **szósty audyt z rzędu bez tej liczby**

- [ ] `pagespeed.web.dev` dla `szabunia.pl/`, mobile i desktop
- [ ] to samo dla `/uslugi/eventy-reportaze` i `/galeria`
- [ ] wkleić **LCP, CLS, TBT i element LCP** do `POMIARY-2026-08-05.md`

### 7. Dwa `curl`-e rozstrzygające hipotezy ⏱ 1 min

- [x] **ZROBIONE 05.08 przy weryfikacji po deployu.** Obie hipotezy obalone, obie 308.
      Patrz krok 2b i `POMIARY-2026-08-05.md §2`

### 8. Konsola po kliknięciu „Akceptuję" ⏱ 2 min · **odblokowuje decyzję D7**

Tego nie zrobi żaden agent: kliknięcie zgody to działanie w Twoim imieniu.

- [ ] `szabunia.pl` → „Akceptuję" → DevTools → Console
- [ ] szukać `Refused to connect to 'https://stats.g.doubleclick.net'`
- [ ] **jest** → CSP blokuje remarketing, wchodzi decyzja D7.
      **Nie ma** → temat zamknięty, `PELNY2608-12` do wykreślenia

---

## BLOK C — panele (ok. 30 minut)

### 9. Google Ads ⏱ 20 min

- [ ] **Cele → Podsumowanie → Konwersje:** co jest zaimportowane, i czy któraś pozycja ma
      w kolumnie „Kampanie" wartość **„0 z 1"**. Spisać nazwy.
      *To warunek startu dla `PELNY2608-05` — bez tego dołożenie `generate_lead` w kodzie
      może podwoić liczenie zamiast naprawić pomiar*
- [ ] **Sitelinki „Portfolio" i „Kontakt"** → wpisać `https://szabunia.pl/portfolio`
      i `https://szabunia.pl/kontakt`. Jedno pole w każdym, pięć minut.
      *Nietknięte od 4 marca, a „Portfolio" ma jeden z najwyższych CTR w zestawie:
      obietnica działa, landing jej nie spełnia*
- [ ] **Cele na poziomie konta** → wypisać trzy martwe działania (relikt UA, kliknięcia
      z reklam inteligentnych, `generate_lead` ze stanem „Usunięta"). **Wypisać, nie kasować** —
      kasowanie zabiera historię
- [ ] **Historia zmian → Określanie stawek**, 6–7 lipca: dostosowania stawek i dzienne CPC.
      Rozstrzyga, czy limit maks. CPC w ogóle wiąże (H6), czyli czy prawdziwą dźwignią
      nie jest budżet
- [ ] usunąć wersję roboczą **„Kampania 9"** (Inteligentna, z 4.03.2026)

### 10. Wizytówka Google ⏱ 10 min

Trzy zmiany z dzisiaj (UTM w linku, nowy opis, odpowiedź na opinię Jadczaka) są w moderacji.

- [ ] **sprawdzić, czy moderacja przeszła** — w edytorze profilu ma zniknąć sekcja OCZEKUJE
- [ ] **H1, 5 minut, TYLKO na telefonie:** otworzyć profil w Mapach i sprawdzić, czy jest
      zakładka **„Usługi"**. *Od tej odpowiedzi zależy, czy ceny i miniatury produktów
      mają w ogóle sens — desktop na to pytanie nie odpowie*
- [ ] ceny w 7 produktach — kwoty gotowe w `PACZKA-WIZYTOWKA §2`, **czeka na Twoją decyzję
      netto/brutto** (pole Google nie ma miejsca na słowo „netto")
- [ ] 3 miniatury z `01_Biznes/_System/08_Zalaczniki/wizytowka_miniatury/`
- [ ] wpis o sesji dla IDcom — tekst gotowy w `PACZKA §6`, brakuje zdjęcia z sesji

### 11. GA4 ⏱ 5 min

- [ ] **Administracja → Strumienie danych → Pomiar zaawansowany:** status przełącznika
      „Zmiany strony na podstawie zdarzeń historii przeglądarki".
      *Rozstrzyga `PELNY2608-11`: czy zdarzenia z podstron mają dobre `page_location`,
      czy wszystkie dostają adres strony wejściowej*
- [ ] ten sam ekran: „Interakcje z formularzami" (rozstrzyga H7)
- [ ] **Administracja → Zdarzenia, 28 dni:** pełna lista z liczbami
- [ ] **Vercel Analytics vs GA4, ten sam zakres dat** (sugestia: 01–31.07): iloraz odsłon
      = górne oszacowanie, ile ruchu gubi baner zgody

---

## BLOK D — decyzje (odpowiedź jednoliterowa, zero klikania)

Pełne warianty A/B/C przy każdej: `AUDYT-PELNY §12`. Kod na te zmiany jest gotowy do napisania,
czeka **wyłącznie na brzmienie**.

### Najdroższe trzy, wszystkie o warunkach handlowych

| # | Rzecz | Gdzie | Koszt zaniechania | Rekomendacja |
|---|---|---|---|---|
| **D3** | FAQ obiecuje bezwarunkowo darmową zmianę terminu; pełne warunki renderują się **tylko na `/galeria`** | `faq.ts:44` vs `Warunki.tsx:102` | **2 360 zł** przy zespole 10-osobowym, który się nie stawi | A: dopisać „jednorazowo, każda kolejna 20%" i klauzulę o dniu realizacji |
| **D2** | Blog mówi „sesje zespołowe od 4 osób", kanon mówi od 2 | `blog.ts:179` | **1 520 zł** na leadzie, który odpada bez pytania | A: „od 2 osób" + przepisać zdanie w `:469`, które dziś odsyła dwie osoby gdzie indziej |
| **D1** | Blog obiecuje bezterminowe darmowe przekładanie lotu; cennik mówi 300 zł za drugie podejście | `blog.ts:373` | **600–900 zł** na dokumentacji w kilku terminach | A: brzmienie z `services.tsx:543` |

- [ ] **D1** — A / B / zostaw
- [ ] **D2** — A / B / zostaw
- [ ] **D3** — A (dopisać do FAQ) / B (wpiąć `Warunki` na home i `/kontakt`) / zostaw

### Pozostałe

- [ ] **D4. Dron w pakietach eventowych: w cenie czy +200 zł?**
      `llms.txt:19` mówi „w cenie każdego pakietu", komentarz w kodzie mówił „+200 zł",
      podstrona nie mówi ani jednego, ani drugiego. **Każdy lead z kanału AI przychodzi
      dziś z oczekiwaniem 200 zł gratis.** Rozstrzyga `cennik_2026_07_v3.md`
- [ ] **D5. „od 55 zł za sztukę" w blogu przy minimum 600 zł** (`blog.ts:1009`).
      Rekomendacja A: usunąć, zgodnie z decyzją z 04.08 o jednej kwocie „od" na usługę
- [ ] **D6. JSON-LD:** ósmy `Offer` w `hasOfferCatalog` (dziś 7 z 8) + trzy anonimowe encje
      `ProfessionalService` na referencję `@id`. Stop-condition `§10.3`, potrzebna zgoda.
      Bez tego linia z najwyższą kotwicą jest niewidzialna dla Knowledge Graph
- [ ] **D7. CSP a remarketing** — **najpierw krok 8**, potem decyzja
- [ ] **D8. Cytaty klientów:** jeden cicho skrócony, drugi **przeredagowany** (zdanie sklejone
      przecinkiem, zmienione słowa). Opinie są publiczne w Google, więc dwie wersje da się
      porównać w minutę. Rekomendacja A: przywrócić oryginalne brzmienie
- [ ] **D10. Zgoda na aktualizację `CLAUDE.md`** — rozjeżdża się w czterech miejscach,
      m.in. twierdzi, że kolejność kart usług ma portrety pierwsze (są piąte).
      Bez zgody kolejna sesja „naprawi" to, co jest już zrobione
- [ ] **D12. Osiem pozycji z 04.08, które czekają drugi audyt z rzędu:**
      `ZDJ2608-37` (plik hero 877 px), `ZDJ2608-28`, `ZDJ2608-16`, `DZ3`, `DZ5`,
      trzy opisy niezgodne z kadrem, **warunek publikacji Box17**
- [ ] **Ads §12.1.** Które zdarzenie jest kanonicznym leadem: `contact_submit` (rekomendacja)
      czy `generate_lead`
- [ ] **Ads §12.2.** Limit maks. CPC: zostawić 7,00 zł (rekomendacja) czy wrócić do 5,00
- [ ] **Ads §12.7.** Czy wideo i dron mają w ogóle być w Ads. Rekomendacja: **nie dokładać
      grup przy 25 zł dziennie** i zapisać to jako świadomą decyzję, żeby przestało wracać
- [ ] **Wizytówka §12.3.** Kampania po opinie: 10 opinii przy 1000+ sesjach.
      **To jedyna pozycja z całego audytu wizytówki, która realnie rusza widoczność.**
      Rekomendacja A: wszyscy klienci firmowi z 18 miesięcy, prośba dołączana do maila z galerią

---

## BLOK E — system biznesowy (osobny dzień)

### 12. D-01: docelowa stawka godzinowa · **blokuje trzynaście pozostałych decyzji**

Rozpiętość między skrajnymi scenariuszami: **20 031 zł netto rocznie**.
Rekomendacja: **S2, 171 zł/h w ofercie** (148 zł/h na koncie po prowizji Useme).

| Wariant | Stawka oferty | Miks roczny | Wobec cen v3 |
|---|---|---|---|
| S1, pokrycie kosztu | 93 zł/h | 21 665 zł | **−8 855 zł** |
| **S2, mediana po korekcie o prowizję** ⭐ | 171 zł/h | 39 836 zł | **+9 316 zł** |
| S3, trzeci kwartyl rynku | 179 zł/h | 41 696 zł | +11 176 zł |
| nie robić nic | zmienna | 30 520 zł | 0 |

- [ ] **D-01** — S1 / S2 / S3 / zostaw v3
- [ ] pozostałe trzynaście: `_szkic_decyzje_dla_Marcina_2026-08.md`

**Uwaga na stan tych szkiców:** stoją na **modelu, nie na pomiarze**.
Zmierzonych realizacji w `Log_realizacji_2026.xlsx`: **zero**. Nic z bloku E nie wchodzi
w życie samo, obowiązuje `cennik_2026_07_v3.md`.

---

## Daty kontrolne

| Co | Kiedy | Czym mierzyć |
|---|---|---|
| Re-audyt strony | **19.08.2026** | tabela metryk w `PLAN-POPRAWEK-2026-08-05.md` |
| Re-audyt Google Ads | **02.09.2026** | okno 05.08–01.09, porównywać **całe okna**, nie końcówki |
| Re-audyt wizytówki | **05.11.2026** | krócej nie ma sensu przy 20 interakcjach na pół roku |

---

## Rzecz, o której warto pamiętać przy kolejnej turze

`SITE_UPDATED` w `sitemap.ts` podnosi się **ręcznie**. To trzeci audyt z rzędu, w którym
data w sitemapie była starsza od zmian treści. Dopisz to do listy rzeczy robionych przed
deployem, obok `lint` i `build`.

---

*Zestawił: Claude (Cowork), 05.08.2026, na podstawie czterech audytów z tego samego dnia
i własnego wykonania etapów 1–2.*
