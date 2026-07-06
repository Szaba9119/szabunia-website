# Analiza: sens posiadania cennika i układ strony głównej

*Niezależna analiza wykonana 2026-07-06 (agent researchowy, na zlecenie w ramach sesji orchestracyjnej). Pytanie wyjściowe: czy usunąć cennik/pakiety ze strony, żeby "ludzie pisali", skoro część konkurencji nie pokazuje cen i mimo to łapie leady.*

---

## A) Co jest teraz w kodzie (stan faktyczny)

**Strona główna (`src/app/page.tsx`)** — kolejność sekcji: Hero → LogoBar → About → Services → Portfolio → Testimonials → Publications → Process → **Pricing** → BlogPreview → PoradnikTeaser → FAQ → CTA (formularz kontaktowy).

Kolejność nie jest przypadkowa — w kodzie jest jawny komentarz wyjaśniający intencję: *"Dowód społeczny i autorytet PRZED ceną: opinie + publikacje budują wartość i chęć, zanim klient zobaczy cennik (mniejszy opór cenowy)"* oraz *"Proces tuż nad cennikiem: prosty przebieg (4 kroki) zmniejsza szok ceną"*. To znaczy: architektura strony już świadomie projektuje docenienie wartości przed ujawnieniem liczby.

**Sekcja Pricing (`src/components/Pricing.tsx`)** — rozbudowany moduł: 3 karty portretów (1000/1300/1800 zł), 3 karty pakietów hybrydowych (1800/3200/4500 zł), 5 zwijanych sekcji (eventy, dron, wideo, zespoły, produktowa) z konkretnymi stawkami, plus kalkulator na końcu. Każda karta ma przycisk „Zapytaj o ten pakiet", który przez zdarzenie wstrzykuje do formularza kontaktowego gotową wiadomość z nazwą pakietu — cennik jest już dziś zaprojektowany jako generator leadów, nie tylko informacja.

**`/kalkulator`** — osobna podstrona, komponent `PricingCalculator` (3-krokowy: usługa → opcje → wynik + CTA do formularza lub przechwycenia e-maila). Emituje zdarzenia GA4 (`calculator_service_selected`, `calculator_done`, `calculator_to_form`) — `calculator_to_form` odpowiada za `generate_lead`, czyli jedyną dziś potwierdzoną konwersję w Google Ads.

**Każda podstrona `/uslugi/[slug]`** ma pełną tabelę cen z tego samego źródła danych (`services.tsx`) — brak rozjazdów liczbowych.

**FAQ** ma pytanie "Ile kosztuje sesja?" z odpowiedzią "od 1 000 zł netto" — czyli nawet po usunięciu sekcji Pricing minimalna cena i tak jest ujawniona, chyba że ktoś usunie też to.

## B) Konkurencja — czy pokazuje ceny (16 z 17 wskazanych witryn sprawdzone bezpośrednio)

| Firma | Nisza / miasto | Ceny na stronie? | Forma |
|---|---|---|---|
| fotografheadshot.com | headshot, Poznań | **TAK** | Cena wprost w FAQ: „600 zł, w cenie 1 zdjęcie" |
| zdjeciabiznesowe.com (FORMAT) | biznesowa, Warszawa | **TAK** | „od X zł" przy każdej usłudze (od 180 do od 2500 zł) |
| kepinscy.com | ślubna+biznesowa, Poznań | NIE | Tylko „Oferta" bez liczb |
| goyka.pl | biznesowa, Poznań | Częściowo | Osobna podstrona „Cennik" w stopce, nieeksponowana |
| snapshot.pl | biznesowa/produktowa, Bydgoszcz | NIE | „Poproś o wycenę" |
| chromaticstudio.pl | biznesowa, Poznań | NIE | Zero liczb |
| studio29poznan.com | biznesowa, Poznań | Częściowo | „Cennik" w menu, nie na stronie startowej |
| igorwojtkowiak.com | biznesowa, Poznań | NIE | Zero liczb |
| zdjeciebiznesowe.pl | biznesowa/CV, Poznań | NIE | Opisuje proces, zero zł |
| granator.com | wideo, Poznań | NIE | Bardzo transparentny proces, zero kwot |
| nottypicalmedia.pl | wideo, Poznań | NIE | Zero liczb |
| sova-studio.pl | wideo, Poznań | NIE | Zero liczb |
| ostro-video.pl | wideo, Poznań | NIE | Zero liczb |
| woodpeckermp.pl | wideo/reklama TV, Warszawa | Częściowo, inna liga | Przedziały budżetowe per case (50K–1MLN zł) — segment reklamy TV, nieporównywalny |
| fyd-studio.pl | wideo, Poznań | NIE | Zero liczb |
| tkmstudio.pl | wideo/ślubna, Poznań | NIE | Zero liczb |

**Wniosek:** żaden bezpośredni konkurent w Poznaniu nie pokazuje cennika w takiej formie i szczegółowości jak Marcin. Ale to nie dowód, że tak trzeba robić — to sygnał wolnej przestrzeni do wyróżnienia się transparentnością. Nawet ci dwaj, którzy pokazują ceny, robią to płycej niż obecny cennik Marcina.

## C) Co mówi literatura o transparentności cenowej

1. **Nielsen Norman Group** — cena to najbardziej poszukiwana informacja na stronie B2B; jej brak powoduje opuszczenie strony na rzecz konkurenta, który ją pokazuje (efekt halo: „są wymijający, będą trudni we współpracy"). Dla złożonych usług B2B rekomendacja to pokazywanie przykładowych scenariuszy cenowych — dokładnie to robią karty pakietów Pricing.tsx.
   https://www.nngroup.com/articles/show-price/

2. **Marketing and Business Education for Photographers** — nisza specyficzna dla fotografii: klient nie potrzebuje rozbicia kosztów na czynniki, tylko zaufania i punktu odniesienia budżetowego („minimum investment"). Wspiera model kart pakietowych, nie ukrycie ceny.
   https://www.marketingandbusinessforphotographers.com/news/is-price-transparency-the-right-marketing-strategy-for-photographers

3. **Kiedy ukrywanie ceny faktycznie działa**: usługa głęboko bespoke + silna, rozpoznawalna marka + ruch z poleceń (nie zimny ruch z wyszukiwarki/reklamy). Żaden z tych trzech warunków nie występuje u Marcina dziś.

4. **Metodologia przy niskim wolumenie** (CXL, GetUplift): klasyczny test A/B nie osiągnie istotności statystycznej przez wiele miesięcy przy pojedynczych konwersjach. Rekomendowana alternatywa: triangulacja jakościowa (nagrania sesji, ankiety, rozmowy) + porównanie dłuższych okien czasowych zamiast czekania na "wynik testu".
   https://cxl.com/blog/ab-testing-alternatives/, https://getuplift.co/how-to-optimize-a-low-traffic-site-without-ab-testing-step-by-step/

## D) Diagnoza sytuacji Marcina

Trzy fakty nakładają się i wszystkie wskazują w tym samym kierunku: młoda domena bez autorytetu, ruch głównie zimny/porównujący (Ads + wyszukiwarka, nie polecenia), bardzo niski wolumen (2 konwersje od startu pomiaru). To razem czyni usunięcie cennika jednym z bardziej ryzykownych możliwych ruchów: nie ma marki, która by to zamortyzowała, nie ma wolumenu, który szybko pokazałby błąd, i jest zimny ruch, który najbardziej cierpi na brak ceny.

---

## Rekomendacje

### 1. Cennik: ZOSTAWIĆ, w obecnej architekturze

Młoda, nierozpoznawalna marka + zimny, porównujący ruch + brak wolumenu do zmarnowania na eksperyment = najgorszy zestaw warunków do ukrywania ceny. Konkurencja w Poznaniu w większości cen nie pokazuje, ale to sygnał wolnej przestrzeni do wyróżnienia się, nie dowód słuszności taktyki — ci konkurenci mają lata obecności i ruch z poleceń, których Marcin jeszcze nie ma. Kopiowanie taktyki bez kopiowania warunków, w których działa, to częsty błąd.

Realny problem, niezależny od pytania "pokazywać czy nie": cennik jest bardzo długi i drobiazgowy (6 kart + 5 akordeonów + kalkulator = 15-20 liczb na jednej sekcji). To argument za skróceniem prezentacji, nie za usunięciem treści.

### 2. Kalkulator (`/kalkulator`): ZOSTAĆ, ale nie rozbudowywać na podstawie jednej konwersji

Zostaje, bo to jedyne dziś zmierzone źródło `generate_lead`, i koncepcyjnie robi dokładnie to, co zaleca NN/g (przykładowe scenariusze zamiast kontaktu w ciemno). Ale 1 konwersja to dowód, że działa w ogóle, minimalnie — nie że działa dobrze. Nie budować całej strategii wokół utrzymania status quo tylko dlatego, że to jedyna dostępna liczba (pułapka potwierdzenia). Zostawić, nie inwestować w rozbudowę, zamiast tego dodać tanie źródła danych jakościowych (nagrania sesji, krótka ankieta po każdym kontakcie).

### 3. Uwagi do struktury strony głównej (niezależnie od decyzji o cenniku)

- Kolejność sekcji jest architektonicznie poprawna (dowód społeczny → proces → cena → CTA) — nie zmieniać.
- Długość cennika to prawdziwy problem: rozważyć zostawienie na home tylko kart pakietowych + jeden link „Zobacz pełny cennik" do rozwiniętej wersji (kotwica do zwiniętych domyślnie akordeonów albo osobna podstrona `/cennik`). Skraca stronę bez usuwania liczb.
- Kalkulator wygląda jak trzecie miejsce z tym samym cennikiem (karta w Pricing.tsx, główna treść `/kalkulator`, tabela na każdej podstronie usługi) — dane są spójne (jedno źródło), ale komunikacyjnie warto oznaczyć kalkulator jako narzędzie dla „nietypowych/złożonych zapytań", nie duplikat cennika.
- FAQ i tak ujawnia cenę minimalną — całkowite ukrycie ceny wymagałoby skoordynowanej zmiany w kilku miejscach (Pricing.tsx, FAQ.tsx, services.tsx, PricingCalculator.tsx), czyli koszt wdrożenia wariantu "usuń cennik" jest wyższy, niż się wydaje.
- Hero ma już CTA „Zapytaj o wycenę" bez ceny w pierwszym ekranie — dobrze, nie zmieniać.

### 4. Jeśli mimo wszystko Marcin zdecyduje się usunąć cennik

- Największe ryzyko: zimny ruch odbije się bez kontaktu, bo nie ma punktu odniesienia budżetowego, a portfolio pokazuje marki typu H&M/Santander, co bez kotwicy liczbowej może sugerować "to musi być drogie".
- Bezpieczniejszy wariant pośredni: zastąpić szczegółowe pakiety jednym zakresem cenowym („sesje portretowe od 1000 do 1800 zł") zamiast pełnego ukrycia — zachowuje punkt odniesienia budżetowy, skraca stronę.
- Traktować jako świadomy eksperyment z oknem obserwacji 8-12 tygodni i metrykami jakościowymi (maile bezpośrednie poza formularzem, scroll depth do CTA, pytanie do każdego nowego kontaktu "co skłoniło Cię do napisania") — sam `generate_lead` w GA4 nic nie powie przy tym wolumenie w tak krótkim czasie.
- Nie zmieniać jednocześnie niczego innego, żeby dało się przypisać efekt tej jednej zmiennej.

---

## Podsumowanie

Cennik zostaje w obecnej architekturze (dowód społeczny → proces → cena → CTA) — młoda marka + zimny ruch + niski wolumen to dokładnie warunki, w których CRO/UX (NN/g, CXL) jednoznacznie rekomendują pokazywanie cen. Jedyna realna poprawa to skrócenie prezentacji (mniej kart domyślnie widocznych, reszta za "zobacz pełny cennik"), nie usunięcie treści. Kalkulator zostaje, ale bez dalszej rozbudowy w oparciu o jedną konwersję. Jeśli mimo to padnie decyzja o usunięciu — bezpieczniejszy jest zakres cenowy zamiast pełnego wycofania, plus świadomy eksperyment z metrykami jakościowymi zamiast liczenia na szybki wynik z GA4.

**Pliki przeczytane (bez modyfikacji):** `page.tsx`, `Pricing.tsx`, `PricingCalculator.tsx`, `kalkulator/page.tsx`, `services.tsx`, `Hero.tsx`, `About.tsx`, `Services.tsx`, `CTA.tsx`, `FAQ.tsx`, `Testimonials.tsx`, `Process.tsx`, `Navigation.tsx`.

**Źródła:**
- [NN/g — Pricing information gives B2B sites a competitive advantage](https://www.nngroup.com/articles/show-price/)
- [Marketing and Business Education for Photographers — Is Price Transparency the right marketing strategy for photographers?](https://www.marketingandbusinessforphotographers.com/news/is-price-transparency-the-right-marketing-strategy-for-photographers)
- [CXL — A/B Testing Alternatives for Low-Traffic Websites](https://cxl.com/blog/ab-testing-alternatives/)
- [GetUplift — How to Optimize a Low Traffic Site Without AB Testing](https://getuplift.co/how-to-optimize-a-low-traffic-site-without-ab-testing-step-by-step/)
