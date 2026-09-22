# Stan faktyczny konta, weryfikacja 2026-09-22

Odczyt na żywo przez API Google Ads (Supermetrics, dostęp read-only), 22.09.2026.
**Ten plik koryguje dwa wcześniejsze dokumenty naraz.** Nic w koncie nie zmieniałem.

---

## 1. Co jest na koncie naprawdę

| Kampania | ID | Status | Budżet |
|---|---|---|---|
| Search \| Poznań \| Fotografia B2B \| 5 zł | 24270154304 | **ENABLED** od 2026-09-20 | 5 zł/dzień |
| Pierwsza pro kampania | 22202006131 | **PAUSED** | 50 zł/dzień |

Konfiguracja kampanii aktywnej, odczytana z API:

| Element | Stan na koncie | Zgodność ze `strategy.md` |
|---|---|---|
| Strategia | TARGET_SPEND (Maksymalizacja kliknięć) | ✅ zgodne |
| Geotargeting | `custom_location` 52.405679, 16.931277, **promień 25 km** | ✅ zgodne |
| Typ kierowania | PRESENCE | ✅ zgodne |
| Sieci | `search: true`, `display: false` | ✅ zgodne |
| Harmonogram | brak | ✅ zgodne |
| Język | pl | ✅ zgodne |
| **Wykluczenia na kampanii** | **472** | ✅ zgodne (moja lista ma 471) |
| Rozszerzenia | sitelinks, callouts, calls | ✅ zgodne, w tym rozszerzenie połączeń |
| **Dopasowanie przybliżone** | **0 słów** | ✅ zgodne, zakaz dotrzymany |
| Słowa kluczowe | **42** (21 phrase + 21 exact) | ⚠️ `keywords.csv` ma 21 |
| Grupy reklam | **1** („Grupa reklam 1") | ⚠️ `strategy.md` zakłada 2 |
| Reklamy | **1** | ⚠️ `ads.md` ma 3 RSA |

## 2. Korekta mojego wcześniejszego raportu

**Napisałem 20.09: „kampania nie została uruchomiona i nie mogłem jej uruchomić".**
To było prawdziwe w chwili pisania (zapis przez API zwracał `WRITE_ACCESS_NOT_ENABLED`),
ale **przestało być prawdziwe tego samego dnia o 12:01**, gdy kampania powstała w panelu.
Zapisy „NIE uruchomiona" w `launch-checklist.md` i `README.md` zostały poprawione.

## 3. Korekta `AUDYT-GOOGLE-ADS-2026-09-21.md`

Tamten audyt stawia w TL;DR cztery tezy o kampanii live. **Trzy z nich są dziś nieprawdziwe**,
sprawdzone odczytem z API 22.09:

| Teza audytu z 21.09 | Stan zmierzony 22.09 |
|---|---|
| „5 fraz w dopasowaniu przybliżonym mimo jawnego zakazu" | **Nieprawda. Zero słów w dopasowaniu przybliżonym** (21 phrase + 21 exact) |
| „zero wykluczeń zamiast 471" | **Nieprawda. 472 wykluczenia na poziomie kampanii** |
| „geotargetowanie całego województwa wielkopolskiego" | **Nieprawda. Promień 25 km wokół Poznania, tryb PRESENCE** |
| „1 grupa reklam zamiast 2, 41 słów zamiast 21" | **Prawda** (42 słowa, 1 grupa) |

Nie wiem, czy tamten audyt opisywał stan sprzed poprawek wykonanych 21.09, czy pomylił się
w odczycie. **Nie przepisuję cudzego dokumentu**, zostaje w repo w oryginale, a ta tabela
jest sprostowaniem opartym na dowodzie z API.

⚠️ **Wniosek metodyczny:** przed działaniem na podstawie któregokolwiek z tych plików
sprawdź konto na żywo. Trzy dokumenty w tym katalogu opisują trzy różne stany konta
z trzech różnych dni.

## 4. Co zostaje realnie do zrobienia

1. ✅ **Poprawka pomiaru w `src/app/layout.tsx` wdrożona na produkcję 22.09.2026.**
   Do 22.09 nie była: kod leżał niescommitowany, więc kampania wydawała budżet,
   a ruch płatny nadal ładował bibliotekę pomiarową leniwie.
2. ⚠️ **Struktura: 1 grupa i 42 słowa zamiast 2 grup i 21 słów.** Nie jest to błąd krytyczny
   (zero broad, wykluczenia są), ale mieszanie fraz wizerunkowych i produktowych w jednej
   grupie z jedną reklamą oznacza, że reklama nie może być dopasowana do obu intencji naraz.
   To jest dokładnie to, przed czym ostrzega `strategy.md` §6.
3. ⚠️ **Jedna reklama zamiast trzech.** Teksty z `ads.md` są gotowe do wklejenia.
4. Porządek w działaniach konwersji (`tracking.md` §5) nadal nieodhaczony.
