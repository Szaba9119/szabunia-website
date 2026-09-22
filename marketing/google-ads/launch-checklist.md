# Lista kontrolna uruchomienia

Stan: **2026-09-22. Kampania JEST uruchomiona** (ID 24270154304, ENABLED od 20.09).
Patrz `STAN-FAKTYCZNY-2026-09-22.md`. Poniższa lista powstała 20.09, gdy kampanii nie było,
więc część kroków jest już wykonana w panelu. Zostaje jako lista kontrolna do odhaczenia.

---

## 0. Dlaczego nie uruchomiłem jej sam

Konto Google Ads **786-864-4697** jest podpięte przez Supermetrics i mogłem je **czytać**
(kampanie, słowa kluczowe, działania konwersji, Keyword Planner). Przy próbie zapisu
konto odpowiedziało:

```
[WRITE_ACCESS_NOT_ENABLED] Write access is not enabled for Google Ads account
7868644697 in team "Team marcin.szabunia".
```

Dodatkowo raportowanie jest zablokowane osobno:

```
[TRIAL_EXPIRED] Your free trial on team Team marcin.szabunia has expired on 2026-06-03.
```

**Nie da się tego obejść z poziomu sesji.** Dlatego kampania jest dostarczona jako komplet
plików importu do Google Ads Editor. Efekt końcowy jest ten sam, wykonanie jest po stronie Marcina.

Skutek uboczny wygaśnięcia trialu: **danych historycznych nie dało się pobrać przez API.**
Wszystkie liczby historyczne w tej dokumentacji pochodzą z eksportów CSV, które leżą
w `05_Strona_WWW/ads/Karty_na_stronie_Przegląd_csv(2026-08-02_13_48_51)/`, czyli z panelu,
z okresu 2025-10-01..2026-08-02. **Po 02.08.2026 nie mam danych.**

---

## 1. ~~NAJPIERW: zabezpieczyć stary budżet~~ ✅ ZROBIONE 22.09.2026

**Marcin potwierdził 22.09.2026, że stara kampania jest wstrzymana. Ten punkt jest zamknięty.**

Zapis poniżej zostaje jako ślad tego, co było i dlaczego to zgłosiłem.

Kampania „Pierwsza pro kampania" (ID 22202006131) miała przy odczycie 20.09.2026 status
**ENABLED** i budżet **50 zł/dzień**. Nie wydawała nic tylko dlatego, że wszystkie cztery
grupy reklam były wstrzymane.

**Jedno kliknięcie w niewłaściwym miejscu uruchamia wydatek dziesięciokrotnie wyższy
niż ustalone 5 zł/dzień.**

Nie zmieniłem tego sam, bo to pieniądze Marcina (CLAUDE.md §4). Do wyboru:
- **(a)** wstrzymać całą starą kampanię (najbezpieczniejsze, odwracalne),
- **(b)** zbić jej budżet do 1 zł jako zabezpieczenie,
- **(c)** zostawić i pilnować.

**Wybrano (a).** Nowa kampania jest jej następcą, a dwie kampanie na te same frazy
i tak konkurowałyby ze sobą w aukcji.

## 2. Import kampanii (Google Ads Editor)

1. Pobrać konto w Google Ads Editor (Konto → Pobierz).
2. Zaimportować pliki **w tej kolejności**:

   | Krok | Plik | Co wnosi |
   |---|---|---|
   | 2.1 | `import-1-kampania-i-grupy.csv` | kampania + 2 grupy reklam ze stawkami |
   | 2.2 | `import-2-slowa-kluczowe.csv` | 21 słów kluczowych (13 exact, 8 phrase, zero broad) |
   | 2.3 | `import-3-wykluczenia.csv` | 471 wykluczeń na poziomie kampanii |
   | 2.4 | `import-4-reklamy-rsa.csv` | 3 reklamy RSA |
   | 2.5 | `import-5-objasnienia.csv` | 6 objaśnień |
   | 2.6 | `import-6-linki-do-podstron.csv` | 4 sitelinki (kotwice na stronie głównej) |

3. Kolumna `Headline 1 position` = 1 przypina pierwszy nagłówek (fraza kluczowa grupy).
   Jeśli Edytor jej nie rozpozna, przypiąć ręcznie po imporcie.
4. Ads Editor pokaże okno mapowania kolumn, bo nagłówki są po angielsku, a interfejs po polsku.
   Nazwy kolumn są standardowe i mapują się jeden do jednego.
5. **Przed publikacją sprawdzić w Edytorze:** budżet 5 zł, status kampanii **Wstrzymana**,
   strategia **Maksymalizacja liczby kliknięć z limitem CPC 7,00 zł**, sieć tylko wyszukiwarka
   Google, **partnerzy sieci wyszukiwania WYŁĄCZENI**, lokalizacja Poznań + 25 km.

## 3. Ustawienia, których nie ma w plikach importu

Do ustawienia ręcznie w panelu (Edytor ich nie przenosi albo przenosi zawodnie):

- [ ] **Automatyczne tagowanie (auto-tagging): POTWIERDZIĆ, ŻE JEST WŁĄCZONE.**
      Ustawienia konta → Śledzenie. **To jest warunek konieczny, nie opcja.** Naprawa
      w `layout.tsx` rozpoznaje ruch płatny po `gclid`, `wbraid` i `gbraid` w adresie.
      Bez auto-tagowania żadne kliknięcie z reklamy nie trafi w tę gałąź, biblioteka
      pomiarowa doładuje się po 5-6 sekundach i wracamy do stanu „GA4 widzi 26% kliknięć".
- [ ] **Sieci:** wyłączyć „Uwzględnij partnerów Google w sieci wyszukiwania".
      Wyłączyć „Uwzględnij sieć reklamową Google".
- [ ] **Lokalizacja, opcja kierowania:** ustawić na **„Obecność: osoby w lokalizacji
      docelowej lub regularnie w niej przebywające"**, nie na domyślne
      „Obecność lub zainteresowanie". To jest ta jedna opcja, która najczęściej po cichu
      rozlewa lokalną kampanię na całą Polskę.
- [ ] **Rozszerzenie połączeń: 514 900 688, kraj Polska, plus konwersja „połączenie
      z reklamy dłuższe niż 60 sekund". PRIORYTET.** Ta konwersja liczy się po stronie Google,
      **poza Consent Mode, poza GA4 i poza kodem strony**. Łańcuch webowy jest zerwany
      strukturalnie (`utm.ts` zapisuje `gclid` dopiero po zgodzie na cookies), więc przy 78%
      ruchu mobilnego to jedyny pomiar, który zadziała niezależnie od tego, czy ktoś kliknie
      „Akceptuję". Harmonogram rozszerzenia ustawić na godziny, w których Marcin odbiera:
      nieodebrany telefon jest gorszy niż brak telefonu.
- [ ] **Informacje o firmie i logo.**
- [ ] **Automatyczne stosowanie rekomendacji (auto-apply): WYŁĄCZYĆ WSZYSTKO.**
      Szczególnie „dodawanie nowych słów kluczowych", „rozszerzanie dopasowania na przybliżone"
      i „automatyczne podnoszenie budżetu". Historia tego konta pokazuje, dokąd prowadzi
      szerokie dopasowanie: 53,5% wydatku na jedno słowo, zero zapytań.
- [ ] **Automatycznie tworzone zasoby (automatically created assets): WYŁĄCZYĆ.**
      Google dopisałby nagłówki ze strony, a strona nie jest napisana pod 30 znaków.
- [ ] **Dynamiczne reklamy w wyszukiwarce i rozszerzanie adresu URL (final URL expansion): WYŁĄCZYĆ.**
      Obie pozwalają Google wysyłać ruch na dowolną podstronę, co łamie założenie jednego landingu.
- [ ] Sprawdzić, że **Wynik optymalizacji nie jest traktowany jako cel.** Nie stosować
      rekomendacji tylko dlatego, że go podnoszą.

## 4. Konwersje (przed włączeniem, nie po)

- [ ] **`contact_submit` (ID 7644204683) ustawić jako jedyną konwersję Główną.**
- [ ] `phone_click` (7670127748) i `email_click` (7670127751) → **Dodatkowe**.
- [ ] `email_click` → zmienić zliczanie z „Wiele" na **„Jedna"**.
- [ ] `generate_lead` (7031355494) → zmienić kategorię z **PAGE_VIEW** na kontaktową,
      zliczanie na „Jedna", zostawić jako **Dodatkową** (to pobranie poradnika, nie zapytanie).
- [ ] Wyłączyć cztery martwe działania z kampanii inteligentnych
      (983737805, 984506818, 984507067, 984508294) oraz „Local actions - Menu views" (7474178617).
- [ ] Potwierdzić, że powiązanie GA4 ↔ Google Ads jest aktywne i że **automatyczne
      tagowanie (auto-tagging) jest włączone**. Bez niego nie ma `gclid`, a bez `gclid`
      nie ma w tym koncie żadnej konwersji.

## 5. Test lejka od początku do końca

Do wykonania przez Marcina, bo kończy się realnym mailem:

1. Wejść na `https://szabunia.pl/?gclid=TEST_RECZNY_2026_09` na telefonie.
2. Kliknąć „Akceptuję" w banerze cookie.
3. Wysłać formularz z danymi testowymi.
4. Sprawdzić, czy w mailu w stopce jest linijka `Źródło: gclid: TEST_RECZNY_2026_09`.
5. Po 24-48 h sprawdzić, czy `contact_submit` policzył się w Google Ads.

**Co już jest sprawdzone (20.09.2026, dev server):** zgoda nadaje `ad_storage: granted`,
a `gclid` ląduje w `sessionStorage` jako `{"gclid":"...","landing_page":"/"}`.
Kroki 4 i 5 wymagają produkcji i realnej wysyłki, więc zostają Marcinowi.

## 6. Dopiero teraz: włączenie

- [ ] Włączyć kampanię.
- [ ] **Zapisać w `optimization-log.md` datę i godzinę startu.** Bez tego nie da się
      później powiedzieć, z jakiego okna pochodzą dane.

## 7. Pierwsze 14 dni

- [ ] **Dzień 1 i 2:** sprawdzić, czy reklamy nie zostały odrzucone i czy nie ma ograniczeń
      wynikających z zasad. Sprawdzić, czy wydatek trzyma się 5 zł.
- [ ] **Dzień 3:** pierwszy raport wyszukiwanych haseł. Klasyfikacja A/B/C/D wg §8.
- [ ] **Dzień 7 i 14:** kolejne przeglądy haseł. Sprawdzić lokalizacje użytkowników
      (czy naprawdę Poznań) i urządzenia.
- [ ] **Nie zmieniać stawek ani słów przez pierwsze 14 dni**, chyba że coś jawnie marnuje
      budżet. Przy 25 kliknięciach miesięcznie pojedyncze kliknięcie nie jest sygnałem.

## 8. Procedura czyszczenia wyszukiwanych haseł

Każde hasło z raportu przypisać do jednej z czterech kategorii:

| Kat. | Co to jest | Co z tym zrobić |
|---|---|---|
| **A** | Firma szuka fotografa do realizacji komercyjnej | Rozważyć dodanie jako exact |
| **B** | Może być komercyjne, nie wiadomo | Obserwować, nie ruszać |
| **C** | Niejasne | **Nie podejmować pochopnej decyzji.** Zostawić do następnego przeglądu |
| **D** | Nie pasuje do oferty | Dodać do wykluczeń **i dopisać wiersz do `negative-keywords.csv`** |

Sygnały kategorii D widziane już w historii tego konta: nazwa dzielnicy lub ulicy Poznania,
słowo „do dokumentów / paszportu / CV", nazwa konkurencyjnej firmy, zapytanie cyrylicą,
słowa z obszaru ślubu, ciąży, rodziny i dzieci.

**Dokumentacja ma odpowiadać stanowi konta.** Każde wykluczenie dodane w panelu ma trafić
do CSV tego samego dnia, inaczej te pliki umrą.

---

## 9. Rozjazd, który trzeba domknąć przed startem: wizytówka Google

Znalezione przy okazji tej pracy, źródło: `docs/sesje/WIZYTOWKA-ZGODNOSC-2026-09-14.md`.

**Profil Firmy w Google nadal pokazuje 11 usług z kwotami od 400 do 2 100 zł**, mimo że
commit `d52c01f` z 14.08.2026 zdjął wszystkie kwoty z widocznej strony. Profil opisuje
też ofertę sprzed przejścia na cztery filary.

**Dlaczego to dotyczy tej kampanii.** Reklama prowadzi na stronę bez kwot. Ten sam użytkownik
sprawdza firmę w Google i widzi kwoty ze starego cennika, w dodatku takie, których już nie ma
(próg portretowy zszedł do 700 zł netto 04.08.2026). To jest dokładnie ten rodzaj rozjazdu
reklama-strona-profil, który kosztuje zaufanie w momencie decyzji.

**Do zrobienia przed startem kampanii:** ujednolicić profil ze stroną albo świadomie
zdecydować, że zostaje jak jest. Decyzja należy do Marcina, bo dotyczy cen.

**Osobno, nie dla tej kampanii, ale ważniejsze niż ona:** wizytówka ma **10 opinii**,
a konkurenci z local packa mają od 49 do 336. W sześciu z dziewięciu sprawdzonych zapytań
Mapy stoją nad wynikami organicznymi. Skuteczność profilu kwiecień-wrzesień 2026:
1 158 wyświetleń, **17 interakcji** (wrzesień: 0).

Zbieranie opinii kosztuje 0 zł i w tej niszy ma większy zasięg niż 152 zł miesięcznie
w aukcji. **To nie jest argument przeciw kampanii, tylko przeciw traktowaniu jej
jako jedynego działania.**
