# Plan wdrożeń: widoczność w wyszukiwarce + zapytania/leady — 6 lipca 2026

**P5 — Pytanie "czy usunąć cennik i pakiety ze strony":** pełna, niezależna analiza (kod + 16 konkurentów sprawdzonych bezpośrednio + literatura CRO/UX) w `docs/sesje/ANALIZA-CENNIK-UKLAD-2026-07-06.md`. Rekomendacja: **zostawić cennik i kalkulator**, skrócić samą prezentację (mniej kart domyślnie widocznych) zamiast usuwać treść — młoda marka + zimny ruch + niski wolumen to najgorszy zestaw warunków do ukrywania ceny. Decyzja ostateczna należy do Marcina, nic nie wdrożone.

Plan naprawczy po sesji diagnostycznej 2026-07-06 (GSC, GA4, Google Ads, Gmail, kod). Kontekst i pełne dane: `[[project-site-status]]` w pamięci sesji orchestratora. Zakres **P0 → P3**, z podziałem na to, co robi **Ty (Marcin)** i co wykonuje **Claude Code** (gotowe briefy do wklejenia).

---

## Jak czytać ten plan

- **Owner:** 🧑 *Marcin* (dashboardy zewnętrzne, decyzje biznesowe, treść) / 🤖 *Claude Code* (zmiany w repo) / 🌐 *orchestrator* (GSC/GBP — już wykonane lub w toku przez czat).
- **Priorytet:** P0 krytyczny (możliwa utrata realnych leadów) → P1 wysoki (indeksacja) → P2 budowanie linków → P3 dopasowanie treści.
- **Wysiłek:** S (≤1h) / M (pół dnia) / L (1+ dzień).
- **Briefy** są w blokach kodu w formacie z `CLAUDE.md §10`. Każdy brief, który dotyka stop-condition (metadane, treść biznesowa), **jawnie zawiera Twoją zgodę** — wklejając go, autoryzujesz tę zmianę.

---

## Co wymaga Twojej decyzji, a co nie (stan na 2026-07-06, wieczór)

### Wymaga Twojego "tak" — bez tego nie ruszam dalej

1. **P3.1 — wybór wariantu title/meta** dla `/uslugi/fotografia-produktowa` (A/B/C w sekcji P3.1, albo własna wersja). To zmiana treści widocznej publicznie w Google — stop-condition, nie zgaduję za Ciebie.
2. **P2.3 — publikacja 2 nowych wpisów GBP** (IDcom, Box17). Treść gotowa (sekcja P2.3), ale to nowa publiczna treść na Twojej wizytówce — czekam na "publikuj".
3. **P2.2 — rejestracja w katalogach firm** (yellowpages.pl, panoramafirm.pl, oferteo.pl). Wymaga założenia konta — nie mogę tego zrobić za Ciebie z żadnego powodu, nawet gdybyś się zgodził (zakładanie kont jest poza tym, co mogę robić). Dane do wklejenia gotowe w P2.2.
4. **P1.2 — wizualna weryfikacja** nowych linków na home (już wdrożone w kodzie) — nie decyzja, ale potrzebuję Twoich oczu, bo nie mam jak tego zobaczyć sam w tej sesji.

### Zamknięte / odrzucone — nie wracam do tego

- **P0** (możliwy bug w formularzu) — zamknięte, potwierdziłeś że działa.
- **P2.1** (mail do Big Furniture Group) i **P2.4** (mail do kulturaisztuka.pl) — wstrzymane, nie chcesz outreachu mailowego.

### Nie wymaga Twojej zgody — robię/będę robić sam, bez pytania za każdym razem

- **P1.1 — zgłoszenia indeksacji GSC.** Czysto techniczne, nie zmienia żadnej treści publicznej. Od 2026-07-06 działa jako zadanie cykliczne (`szabunia-gsc-indexing`, codziennie 9:07) — nie muszę już być poproszony, samo kontynuuje kolejne tury aż lista się skończy.
- **P1.3 — kontrola efektu w GSC** (~13.07.2026) i **P3.3 — monitoring pozycji/CTR** (co 2-4 tygodnie) — to obserwacja, nie zmiana.
- Dalsze SEO-diagnozy, sprawdzanie stanu indeksacji, GSC/GA4 — mogę robić z własnej inicjatywy i referować wyniki, bez pytania o zgodę na samo sprawdzenie.

---

## Kolejność i zależności

```
P0 ── ZAMKNIĘTE (potwierdzone: brak buga w formularzu)
P1.2 (link home→/uslugi,/portfolio)  ── ZROBIONE, czeka na wizualną weryfikację Marcina
P1.1 (zgłoszenia indeksacji reszty bloga) ── ZAUTOMATYZOWANE (zadanie cykliczne, codziennie 9:07), limit dzienny GSC ~8/dzień
   └─ P1.3 (kontrola efektu w GSC)   ── za ~5-7 dni od zgłoszeń
P2.2 (katalogi firm) ── jedyna żywa pozycja w P2, P2.1/P2.4 wstrzymane (bez outreachu mailowego)
P3.1 (title/meta packshoty) ── czeka na wybór wariantu przez Marcina
```

---

# P0 — ZAMKNIĘTE: formularz NIE gubi zapytań

**Status: ROZWIĄZANE 2026-07-06.** Wątek wynikał z tego, że sprawdzałem złą skrzynkę (`marcin.szabunia@gmail.com` zamiast biznesowej `marcin@szabunia.pl`). Marcin potwierdził wprost: "na marcin@szabunia normalnie otrzymuje zapytania" — skrzynka działa poprawnie, żadnego buga w `/api/contact` ani Resend nie ma. Nie trzeba sprawdzać `CONTACT_TO_EMAIL` w Vercel ani logów Resend — temat zamknięty, nie wracać do niego bez nowego konkretnego sygnału.

---

# P1 — Indeksacja i linkowanie wewnętrzne

**Dlaczego to P1:** 30 z 50 stron (cały blog, `/uslugi`, `/portfolio`, `/kalkulator`, case studies) w statusie „Wykryto — obecnie niezindeksowana”. Strona nie może rankować, jeśli Google jej nie zaindeksował.

## P1.1 · Dokończyć zgłoszenia do indeksowania

**Owner:** 🌐 orchestrator (w toku) · **Wysiłek:** S dziennie, rozłożone na dni

**Status na koniec dnia 2026-07-06:** zgłoszone i potwierdzone ("Przesłano prośbę o zindeksowanie"): `/uslugi`, `/portfolio`, `/kalkulator`, 3 case studies (Artech, Woohoo, Yes Butcher), `/blog/ile-kosztuje-sesja-wizerunkowa-dla-firmy`, `/blog/jak-przygotowac-sie-do-sesji-biznesowej`, `/blog/co-zalozyc-na-sesje-biznesowa` (ta ostatnia po ponownej próbie — limit chwilowo się zresetował) — **9 zgłoszeń w sumie**. Kolejna próba (`/blog/headshoty-linkedin-konwersja`) trafiła od razu na **"Przekroczono limit — spróbuj ponownie jutro"** (przypadkowe podwójne kliknięcie "poproś jeszcze raz" na tym samym URL prawdopodobnie zużyło resztę odnowionego limitu — uwaga na przyszłość: zamknąć toast potwierdzenia zanim kliknie się w pole wyszukiwania, inaczej klik trafia w "POPROŚ JESZCZE RAZ" zamiast w pole).

**Automatyzacja od 2026-07-06:** za zgodą Marcina ("lecisz to, do momentu az nie skonczysz P1.1") utworzone zadanie cykliczne `szabunia-gsc-indexing`, codziennie 9:07, samo zgłasza kolejną turę URL-i (do wyczerpania dziennego limitu GSC), aktualizuje tę sekcję i wyłącza się samo po zgłoszeniu całej listy. Nie wymaga już mojego pytania "dawaj dalej" — postęp będzie widoczny tutaj po każdym uruchomieniu.

Kolejność priorytetowa (pozostałe URL-e, zaszyta w zadaniu cyklicznym):

1. `/blog/headshoty-linkedin-konwersja` (nie zgłoszona — limit przerwał próbę)
2. `/blog/fotografia-eventowa-vs-reportaz`
3. `/blog/co-to-jest-packshot` (podbite w priorytecie — patrz P3.3, słaba pozycja na "packshot poznań")
4. `/blog/sesja-wizerunkowa-poznan` (podbite — komercyjny intent, B2B lokalnie)
5. pozostałe ~19 wpisów bloga + `/poradnik` + `/polityka-prywatnosci` (kolejność dowolna, ~8-9 dziennie)

## P1.2 · Link wewnętrzny z home do `/uslugi` i `/portfolio`

**Owner:** 🤖 · **Wysiłek:** S · **Status: WDROŻONE 2026-07-06**

Nawigacja na stronie głównej linkuje „Usługi”/„Portfolio” do kotwic (`#uslugi`, `#portfolio`) na tej samej stronie, nie do samodzielnych stron `/uslugi` i `/portfolio`. To zgadza się z tym, co pokazał GSC: dla `/uslugi` Google nie znalazł żadnej strony odsyłającej. Bez linku z najmocniejszej strony serwisu, te huby są trudniejsze do odkrycia.

**Wdrożone bezpośrednio w tej sesji** (nie wymagało osobnej wklejki do Claude Code — miałem bezpośredni dostęp do repo): `src/components/Services.tsx` i `src/components/Portfolio.tsx`, dokładnie wg briefu poniżej. `npm run lint` i `npx tsc --noEmit` czyste. Wizualny smoke-test w Chrome nie był możliwy w tej sesji ([[sandbox-no-next-build]]) — sprawdź wizualnie przy najbliższym `npm run dev` lub po deployu (dwa nowe linki pod siatką usług i pod siatką portfolio na stronie głównej).

**🤖 Brief A — dodaj bezpośrednie linki do stron-hubów:**
```text
KONTEKST: Strona główna (page.tsx) ma sekcje „Czym mogę pomóc Twojej firmie" (teaser 7
usług, kotwica #uslugi) i „Wybrane realizacje" (teaser 4 case studies, kotwica
#portfolio) — ale nigdzie na stronie głównej nie ma linku do samodzielnych stron
/uslugi (pełna lista usług) i /portfolio (pełne portfolio). GSC potwierdza: /uslugi ma
zero wykrytych stron odsyłających.
ZADANIE: Dodaj w obu sekcjach wyraźny link/przycisk do pełnej strony:
  - pod siatką 7 usług: link „Zobacz wszystkie usługi →" do /uslugi
  - pod siatką 4 case studies (obok istniejącego „Chcesz zobaczyć więcej? Napisz do
    mnie" które linkuje do #kontakt): dodatkowy link „Zobacz pełne portfolio →" do
    /portfolio
  Zachowaj istniejący styl wizualny sekcji (Tailwind, kolory z globals.css). Nie usuwaj
  istniejącego linku do #kontakt.
ZAKRES: prawdopodobnie src/app/page.tsx i/lub komponenty sekcji usług/portfolio
  (sprawdź strukturę w src/components/ — np. Services.tsx, Portfolio.tsx).
ZGODA: TAK — dodanie linków nawigacyjnych na home jest autoryzowane tym briefem.
  Nie zmieniaj treści, cen ani innych danych biznesowych „przy okazji".
ACCEPTANCE: npm run lint i npm run build OK; oba nowe linki widoczne i klikalne w
  dev na "/"; linki to prawdziwe <a href> (Next <Link>), nie JS-owe onClick bez href,
  żeby Google mógł je wykryć; dark mode bez regresji.
STOP-CONDITIONS: jeśli struktura komponentów wymaga większego refaktoru niż dodanie
  jednego elementu — zatrzymaj i zgłoś.
FORMAT RAPORTU: standardowy (CLAUDE.md §10).
```

## P1.3 · Kontrola efektu w GSC

**Owner:** 🌐 orchestrator · **Wysiłek:** S · **Kiedy:** ~5-7 dni po zgłoszeniach (czyli ok. 13.07.2026)

Sprawdzić w GSC → Indeksowanie → Strony, ile z 6 zgłoszonych URL-i przeszło do „Zindeksowano”. Jeśli tak — kontynuować turę zgłoszeń dla bloga (P1.1).

**Szybka kontrola 2026-07-06 wieczór (za wcześnie na efekt, dla porządku):** wciąż 16 zindeksowanych / 34 nie (30 „Wykryto – niezindeksowana", 3 redirect, 1 zeskanowana-nie zindeksowana) — identycznie jak rano. Zgodne z oczekiwaniem, indeksacja potrzebuje kilku dni. Właściwa kontrola zostaje na ~13.07.2026.

---

# P2 — Budowanie linków (kontynuacja tego, co już w toku)

## P2.1 · Mail do Big Furniture Group Magazine — WSTRZYMANE

**Status:** Marcin nie chce wysyłać maili outreachowych po linki (potwierdzone 2026-07-06 przy okazji P2.4). Draft nadal czeka w Szkicach Gmaila, ale nie traktować jako priorytet ani przypominać o nim.

## P2.2 · Rejestracja w katalogach firm

**Owner:** 🧑 Marcin · **Wysiłek:** S każdy katalog

Sprawdziłem wszystkie trzy — wymaga konta, więc to zadanie dla Ciebie, ale przygotowałem co trzeba, żeby zajęło Ci to jak najmniej czasu.

**Kolejność od najłatwiejszej:**

1. **yellowpages.pl** (https://www.yellowpages.pl/business/add/) — NAJSZYBSZE: pozwala zaimportować dane wprost z Google Business Profile (masz już w pełni uzupełnioną wizytówkę), więc formularz wypełni się sam.
2. **panoramafirm.pl** (https://panoramafirm.pl/dodaj-firme.html) — darmowy wpis, formularz + opis + logo/zdjęcia. Kontakt BOK w razie problemów: kontakt@wenet.pl / 22 457 30 95.
3. **oferteo.pl** — UWAGA, inny model niż myślałem: konto darmowe, ale kontakt do zainteresowanego klienta kosztuje punkty (płatność za lead, nie stały wpis jak w dwóch powyższych). Zdecyduj czy ten model Ci pasuje, zanim się rejestrujesz — to nie jest "postaw i zapomnij" jak pozostałe dwa.

**Gotowa treść do wklejenia (z `layout.tsx`, już zatwierdzona, nic nie wymyślone):**
- Nazwa: Marcin Szabunia — Fotograf biznesowy
- Opis krótki: „Profesjonalna fotografia biznesowa i wideo marketing dla firm. Portrety biznesowe, eventy, fotografia produktowa. Poznań i cała Polska."
- Kategoria: fotografia biznesowa / produktowa, wideo marketing
- Telefon: +48 514 900 688 · Email: marcin@szabunia.pl · Miasto: Poznań
- Zakres cen: 55 zł – 4 500 zł
- Strona: https://szabunia.pl

## P2.3 · Kontynuacja wpisów GBP (Posts) — IDcom/Box17 ODRZUCONE 2026-07-06

**Owner:** 🌐 orchestrator · **Status: NIE PUBLIKOWAĆ** (Marcin: "nie publikuj tych wpisów idcom i box 17")

3 wpisy opublikowane 2026-07-06 (Yes Butcher, Woohoo, Artech) zostają. Treść poniżej (IDcom, Box17) zostaje jako archiwum, ale **nie będzie publikowana** — nie proponować tego ponownie bez nowego sygnału od Marcina.

**IDcom (headshoty zespołu):**
> Zespół IDcom Group (software house z Poznania) potrzebował portretów, które zadziałają wszędzie: na stronie firmowej i w materiałach wewnętrznych. W jednej sesji powstał komplet headshotów na trzech tłach — białym, czarnym z niebieskim światłem i kremowym — więc firma dobiera klimat do kontekstu zamiast wracać do studia.
> Przycisk: „Więcej informacji" → /portfolio/idcom-headshoty-zespolu

**Box17 (budki akustyczne):**
> Dla Box17 (producenta budek akustycznych z Tarnowa Podgórnego) zrealizowałem w jeden dzień zdjęciowy komplet materiałów dla całej rodziny produktów — od dużej Box XL po modele jednoosobowe. Zdjęcia na cykloramie, w showroomie i dwa filmy produktowe — gotowe pod stronę, sklep i social media.
> Przycisk: „Więcej informacji" → /portfolio/box17-budki-akustyczne

Daj znać "publikuj" (obie naraz albo jedną) i zrobię to w GBP.

## P2.4 · Dopisanie linku przy istniejących wzmiankach — WSTRZYMANE (nie chce wysyłać maili)

**Status: odrzucone 2026-07-06.** Przygotowałem draft do kulturaisztuka.pl (kontakt redakcji: mariusz@kulturaisztuka.pl, prośba o link do istniejącego podpisu "FOTO: Marcin Szabunia") — Marcin odpowiedział wprost, że nie chce wysyłać takich maili. Draft zostaje w Szkicach bez dalszej akcji. **Nie proponować więcej draftów outreachowych po linki/credit** — patrz `[[feedback-no-cold-outreach-emails]]`. Budowanie linków dalej przez katalogi firm (P2.2) i GBP (P2.3), nie przez mail.

---

# P3 — Dopasowanie treści do realnego popytu

**Dlaczego P3, nie wyżej:** nie ma sensu poprawiać CTR/treści stron, których Google jeszcze nie widzi — najpierw P1.

## P3.1 · Poprawić title/meta dla „packshot poznań”

**Owner:** 🧑 (akceptacja treści) + 🤖 (wdrożenie) · **Wysiłek:** S

**Korekta po sprawdzeniu na żywo (2026-07-06):** to NIE jest wyłącznie problem tytułu/opisu. Realna średnia pozycja dla tych fraz to: „packshot poznań" 34,8, „packshoty poznań" 36,4, „fotografia produktowa poznan" 47,5 (strona: `/uslugi/fotografia-produktowa`, potwierdzone w GSC → Skuteczność → filtr zapytania → zakładka Strony). To pozycje na 4-5 stronie wyników — przy takiej pozycji CTR bliski 0% jest normalny niezależnie od jakości tytułu; sam lepszy title/description nie wygeneruje realnych kliknięć, dopóki pozycja się nie poprawi (a to wraca do P1/P2 — autorytet strony i linki, nie treść tej jednej podstrony).

Mimo to warto poprawić tytuł/opis — to tani, bezkosztowy krok, i obecny title w ogóle nie zawiera słowa „packshot" w liczbie pojedynczej (tylko „packshoty", l.mnoga), a opis nie wspomina Poznania. Obecnie: title „Fotografia produktowa & packshoty — Marcin Szabunia | Poznań", description „Packshoty na białym tle, zdjęcia kreatywne i fotografia reklamowa produktów. E-commerce, katalogi, Social Media, kampanie. Studio w Poznaniu."

Trzy warianty do wyboru (wszystkie oparte na faktach już obecnych na stronie — cennik, retusz w cenie — nic nie wymyślone):

**Wariant A** (najbliżej obecnego, minimalna zmiana):
- title: `Packshot i fotografia produktowa — Poznań | Marcin Szabunia`
- description: `Packshoty na białym tle i zdjęcia produktowe w studiu w Poznaniu. E-commerce, katalogi, Social Media. Retusz w cenie zdjęcia.`

**Wariant B** (cena jako wyróżnik):
- title: `Packshoty produktowe Poznań — od 55 zł/zdjęcie | Marcin Szabunia`
- description: `Profesjonalne packshoty na białym tle w studiu w Poznaniu. Retusz w cenie, gotowe pod Allegro/Amazon. Wycena tego samego dnia.`

**Wariant C** (szerszy zakres usługi):
- title: `Packshot i fotografia produktowa Poznań — Marcin Szabunia`
- description: `Packshot na białym tle, zdjęcia kreatywne i reklamowe produktów. Studio w Poznaniu — e-commerce, katalogi, Social Media. Retusz w cenie.`

To zmiana metadanych (stop-condition z `CLAUDE.md §10`) — czekam na wybór wariantu (albo własną wersję) zanim wdrożę w `src/data/services.tsx` (obiekt `seo` dla slug `fotografia-produktowa`).

## P3.2 · Upewnić się, że treść pod frazy B2B jest widoczna

**Owner:** 🌐 orchestrator · **Wysiłek:** S (już częściowo pokryte)

Dobra wiadomość: blog już ma wpisy pod dokładnie te frazy („ile kosztuje sesja wizerunkowa dla firmy”, „jak przygotować się do sesji biznesowej”) — nie trzeba pisać nowej treści, trzeba tylko, żeby Google je zaindeksował (patrz P1.1) i żeby były dobrze polinkowane wewnętrznie (patrz P1.2 jako pierwszy krok w tym kierunku).

## P3.3 · Monitoring pozycji i CTR

**Owner:** 🌐 orchestrator · **Wysiłek:** S · **Rytm:** co 2-4 tygodnie

Sprawdzać GSC → Skuteczność: czy średnia pozycja się poprawia, czy nowe frazy się pojawiają, czy CTR na już widocznych frazach rośnie po poprawkach z P3.1.

---

## Podsumowanie — podział odpowiedzialności

**🧑 Tylko Marcin (poza repo/poza czatem):**
- ~~Sprawdzenie skrzynki marcin@szabunia.pl~~ — P0 zamknięte, potwierdzone że zapytania docierają normalnie.
- Rejestracja w katalogach firm (P2.2) — jedyna pozostała akcja mailowo/kontowa dla Ciebie w P2 (P2.1 i P2.4 wstrzymane, nie chcesz outreachu mailowego).
- Akceptacja treści nowego title/meta description przed P3.1.

**🤖 Kod (wdrożone w tej sesji):**
- A: link wewnętrzny home → `/uslugi` i `/portfolio` (P1.2) — ✅ zrobione, czeka na Twoją wizualną weryfikację.

**🌐 Orchestrator (ja, w tym czacie — samodzielnie, bez pytania za każdym razem):**
- Tura zgłoszeń indeksacji dla reszty bloga (P1.1) — zautomatyzowane, zadanie cykliczne codziennie 9:07, samo się kończy po zgłoszeniu całej listy.
- Kontrola efektu w GSC (P1.3) — ok. 13.07.2026.
- Monitoring pozycji/CTR (P3.3).
- Kolejne wpisy GBP (P2.3) — treść gotowa, ale publikacja wymaga Twojego "tak" (patrz wyżej).

**Sugerowana kolejność startu:** P1.1 leci sama w tle → P2.2 katalogi firm (kiedy masz czas) → P1.3 kontrola (za tydzień) → P3.1 (po Twoim wyborze wariantu title/description). P0 zamknięte, P1.2 zrobione (czeka na wizualną weryfikację), P2.1/P2.4 wstrzymane.

---

# P4 — Dodatkowy przegląd 2026-07-06 (wieczór) — "co jeszcze, żeby zyskać klientów/wyświetlenia/kliknięcia"

Odpowiedź na wprost zadane pytanie. Nowe znaleziska, których nie było w P0-P3 wyżej — sprawdzone na żywo (kod + wyszukiwarka), nie zgadywane.

## P4.1 · Luka treściowa: "film korporacyjny" (→ wyświetlenia)

Sprawdziłem na żywo dwie frazy w Google. Wynik różni się mocno:

- **"headshoty zdjęcia dla firm poznań"** — szabunia.pl JUŻ pojawia się w wynikach (obok fotografheadshot.com, GOYKA, Kępińscy, Snapshot Studio, FORMAT). Długi ogon dla fotografii portretowej częściowo już działa.
- **"film korporacyjny firmowy poznań produkcja wideo"** — szabunia.pl **nie pojawia się wcale**, mimo że oferujesz wideo. Cała pierwsza strona to wyspecjalizowane studia wideo: Pantoda Studio, Granator, notTypicalmedia, Sova Studio, OSTRO Video, Woodpecker MP, FYD Studio, TKM Studio.

Obecne treści segmentują wideo jako "wideo marketing dla firm" / "eventy i reportaże" — nie ma nic celującego wprost we frazę "film korporacyjny".

**Pogłębione 2026-07-06 (na wyraźną prośbę "skup się na filmach"):** sprawdziłem dokładnie istniejącą stronę usługi `/uslugi/wideo-marketing` (`services.tsx`) i powiązany wpis blogowy `wideo-marketing-dla-firm-formaty`. Dobra wiadomość: **treść merytorycznie już istnieje, tylko fraza nigdzie nie pada dosłownie:**
- Na stronie usługi jest już osadzony prawdziwy przykład: wideo Artech Group z opisem „Film firmowy z produkcji dla Artech Group" / notatką „Przykład filmu firmowego: pokazuje park maszynowy i sposób pracy, zamiast go opisywać" — „film firmowy" to praktycznie synonim „filmu korporacyjnego".
- We wpisie blogowym „Wideo marketing dla firm: jakie formaty" sekcja **„1. Film wizerunkowy"** dokładnie opisuje koncept filmu korporacyjnego (wizytówka firmy 60-120s na stronę, w prezentacjach sprzedażowych) — tylko pod inną nazwą.

**Wniosek: nie trzeba nowej treści.** Wystarczy dopisać frazę "film korporacyjny" tam, gdzie prawda już jest opisana innymi słowami — zero nowych twierdzeń, tylko synonim.

**Status: WDROŻONE 2026-07-06 (za Twoim "tak").** `npm run lint` i `npx tsc --noEmit` czyste. Wdrożone: subtitle + seo.title + seo.description w `services.tsx` (wideo-marketing), H2 sekcji 1 w `blog.ts` (wideo-marketing-dla-firm-formaty). Opcjonalną zmianę seo.title/description tego wpisu blogowego zostawiłem bez zmian — to była wyraźnie oznaczona jako osobna decyzja, samo "tak" jej nie obejmowało; daj znać, jeśli też chcesz to zmienić. Reszta zgłoszona do indeksacji przez zadanie cykliczne (P1.1) w swoim czasie — obie strony (`/uslugi/wideo-marketing` i wpis blogowy) są już na liście URL-i strony, więc nowej akcji nie trzeba.

**Brief C — dokładny diff, który wdrożyłem (tylko dopiski, nic nie usunięte, nic nie zmyślone):**
```text
1) src/data/services.tsx, slug "wideo-marketing":
   subtitle:
     BYŁO: "Reelsy, filmy promocyjne, relacje z eventów. Formaty pionowe i poziome
            dopasowane do platformy."
     BĘDZIE: "Filmy korporacyjne i promocyjne, reelsy, relacje z eventów. Formaty
              pionowe i poziome dopasowane do platformy."
   seo.title:
     BYŁO: "Wideo marketing & produkcja wideo — Marcin Szabunia | Poznań"
     BĘDZIE: "Wideo marketing i filmy korporacyjne — Marcin Szabunia | Poznań"
   seo.description:
     BYŁO: "Reelsy, filmy promocyjne i reklamowe, relacje z eventów. Profesjonalna
            produkcja wideo od nagrania po montaż. Poznań i cała Polska."
     BĘDZIE: "Filmy korporacyjne, reelsy, filmy promocyjne i reklamowe, relacje
              z eventów. Profesjonalna produkcja wideo od nagrania po montaż.
              Poznań i cała Polska."

2) src/data/blog.ts, slug "wideo-marketing-dla-firm-formaty":
   H2 sekcji 1:
     BYŁO: "1. Film wizerunkowy"
     BĘDZIE: "1. Film wizerunkowy (film korporacyjny)"
   (opcjonalnie, ten wpis i tak jeszcze nie zaindeksowany więc zero ryzyka
   utraty pozycji): seo.title dopisać "film korporacyjny" analogicznie —
   do Twojej decyzji, czy też to zmienić.

ZAKRES: 2 pliki, ~5 linii zmian, same dopiski do już prawdziwych treści.
ZGODA: czekam na "tak" — to zmiana metadanych/treści publicznej (stop-condition
  CLAUDE.md), a nie coś co wdrażam bez potwierdzenia, mimo prośby o skupienie
  się na tym temacie.
```

## P4.2 · Więcej realnych opinii w danych strukturalnych (→ kliknięcia) — ZROBIONE 2026-07-06

**Status: WDROŻONE.** Marcin wkleił pełną listę 10 opinii z wizytówki Google. Dopisane do `review[]` w `layout.tsx` (verbatim, bez zmian treści poza jedną spacją po kropce w cytacie Wagner): **Julia Winiarska, Maksymilian Chodziak, Natalia Tomczak, Małgorzata Wagner, Marta Rolska** — obok już istniejących Aleksandra Burzyńska, Zuzanna Fortuniak, Maja Formalik. Razem 8 z 10 cytowanych w schema. Pominięte: Michał Jadczak (opinia bez tekstu, same gwiazdki) i „a.4gel" (nazwa użytkownika, nie prawdziwe imię i nazwisko — do wglądu, jeśli jednak chcesz go dodać, daj znać). `aggregateRating` (5.0 / 10) bez zmian — liczba opinii się zgadza. `npm run lint` i `npx tsc --noEmit` czyste.

## P4.3 · Testimoniale w case studies — częściowo już się udało

Sprawdziłem `src/data/portfolio.ts` na żywo: **Woohoo (Maja Formalik) i Artech (Małgorzata Wagner, Prezes) już mają prawdziwe cytaty** — odpowiedzi na maile z czerwca przyszły i zostały wdrożone. **Box17, IDcom i Yes Butcher jeszcze nie mają.** Box17/IDcom to najnowsze case studies (jeszcze przed publikacją wpisów GBP), Yes Butcher miał otwartą kwestię zgody na wizerunek szefa kuchni.

Jeśli masz (albo możesz zdobyć) cytat od Box17 lub IDcom, albo wiesz że zgoda Yes Butcher się wyjaśniła — daj znać, dopiszę.

**Zrobione 2026-07-06 wieczór:** znalazłem w Gmailu realne kontakty z obu realizacji i przygotowałem (NIE wysłałem — czekają w Szkicach) prośby o krótką opinię:
- **Box17:** Grzegorz Nawrocki, Marketing Manager (grzegorz.nawrocki@box17.com) — kontakt pewny, aktywna korespondencja o samej sesji.
- **IDcom:** Karol Sobolewski (karol.sobolewski@idcom.pl) — kontakt z 2024 r., pośredni (przekazany przez agencję atnite.pl) — możliwe, że nieaktualny lub to nie właściwa osoba dziś; draft to sygnalizuje wprost i prosi o przekierowanie, jeśli trzeba.

Obie treści bazują wyłącznie na realnych danych z case studies (`src/data/portfolio.ts`), bez wymyślania. Zerknij, popraw jeśli chcesz, i wyślij sam z Gmaila (zgodnie z zasadą, że maile wysyłasz Ty).

## P4.4 · Poproś ostatnich klientów o udostępnienie (→ wyświetlenia, za darmo)

Inne niż odrzucony outreach do redakcji/portali (`[[feedback-no-cold-outreach-emails]]`) — to prośba do własnych, zadowolonych klientów (Artech, Woohoo, Yes Butcher, IDcom, Box17), żeby podzielili się case study/postem na swoim LinkedInie z oznaczeniem Ciebie. Organiczny zasięg u ich odbiorców (często inni decydenci B2B), zero kosztu. Twoja decyzja czy i do kogo pisać.

**Szablon do wysłania samodzielnie (LinkedIn DM albo mail), do personalizacji per klient:**

Wersja ogólna:
> Cześć [Imię], przygotowałem case study z naszej współpracy ([nazwa projektu]) na mojej stronie: [link]. Jeśli macie ochotę, byłbym wdzięczny za udostępnienie na firmowym LinkedInie z oznaczeniem mnie — to spora pomoc w dotarciu do innych firm szukających czegoś podobnego. Oczywiście żaden przymus :)

Wersja dla klientów z już daną opinią (Woohoo, Artech) — nawiązanie do tego, co już dali:
> Cześć [Imię], dzięki jeszcze raz za opinię, którą zostawiliście — dodałem ją do case study na stronie: [link]. Jeśli macie ochotę udostępnić go na firmowym LinkedInie (z oznaczeniem mnie), byłbym wdzięczny — dobra okazja, żeby też Wasza marka pokazała się przy tego typu projekcie.

## P4.5 · Google Ads — budżet ograniczony + próg 30 konwersji (→ klienci, płatne) — sprawdzone na żywo

Stan na 2026-07-06 wieczór (zakładka Działania powodujące konwersje): **"Kontakty" = 1 wynik, "Prośba o wycenę" = 1 wynik** (wartość 1,00) — razem 2 konwersje zmierzone od importu. To zgadza się z tym, co napisałeś ("chyba miałem rzeczywiście 1, poza testami"). **Próg ~30 konwersji jest bardzo daleko** — na razie nie ma sensu zmieniać strategii licytacji, to wciąż wczesny etap. Budżet nadal "Ograniczona z powodu budżetu" (25 zł/dzień) — to Twoja decyzja, czy podnosić.

## P4.6 · Szybkość strony (Core Web Vitals) — ZAMKNIĘTE

Marcin sprawdził sam: page speed jest ok. Nie trzeba dalej drążyć.

---

*Plan utworzony 2026-07-06 po sesji diagnostycznej (GSC, GA4, Google Ads, Gmail, przegląd kodu). Zaktualizowany tego samego dnia: korekta i zamknięcie P0 (zła skrzynka Gmail, potem potwierdzenie Marcina że nie ma buga), Brief A wdrożony (P1.2), 2 kolejne zgłoszenia indeksacji + limit dzienny (P1.1), korekta i warianty P3.1, P2.1/P2.4 wstrzymane (Marcin nie chce outreachu mailowego), zadanie cykliczne dla P1.1, P4 dodany po pytaniu "co jeszcze mogę zrobić" (luka "film korporacyjny", schema opinii, testimoniale Woohoo/Artech już wdrożone).*
