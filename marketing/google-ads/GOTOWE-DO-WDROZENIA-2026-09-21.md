# Gotowe do wdrożenia — kolejność zatwierdzona przez Marcina 21.09.2026

Kontekst: `AUDYT-GOOGLE-ADS-2026-09-21.md`. Marcin zaakceptował plan: dziś tracking → geo → broad na phrase → pauza starej kampanii → porządek konwersji; wykluczenia po ręcznym Search Terms, ale **przegląd 471 pozycji pod kątem konfliktu z żywymi keywordami zrobiony już teraz** (wynik: zero konfliktów, patrz §5).

**Próba wykonania 21.09.2026:** zapis do konta zablokowany —
`[WRITE_ACCESS_NOT_ENABLED]` dla konta 7868644697 w teamie „Team marcin.szabunia".
Link do włączenia: **https://hub.supermetrics.com/write-settings?platform=AW&teamId=4MNzP8A_VkW6UpK4Hmf1**
Ten błąd jest niezależny od `[TRIAL_EXPIRED]` (raportowanie) — włączenie zapisu nie odblokuje danych, ale odblokuje wykonanie poniższych zmian przeze mnie.

Wszystko niżej jest **dokładnie przygotowane do wykonania**, żeby nie trzeba było niczego ponownie analizować — albo ja wykonam to natychmiast po włączeniu zapisu, albo Marcin robi to sam w panelu wg poniższych kroków (szybsze, jeśli chce działać dziś bez czekania na Supermetrics).

---

## 1. Tracking — commit + push (Marcin, nie ja)

```bash
cd ~/Documents/05_Strona_WWW/marcinszabunia
git add src/app/layout.tsx
git commit -m "fix(ads): natychmiastowe ladowanie gtag.js dla ruchu z gclid/wbraid/gbraid"
git push
```

Powód, że nie robię tego sam: `CLAUDE.md` tego repo, zasada twarda §11.1 „Nie commituj, nie pushuj, nie mergeuj" — bez wyjątków, niezależnie od polecenia w danej rozmowie. To standing rule, którą ustawiłeś świadomie dla tego repo; trzymam się jej.

Warto przy okazji zdecydować, czy commitować/pushować też `CLAUDE.md` i `docs/zasady-tekstow.md` (mają niezacommitowane zmiany niezwiązane z tym audytem) oraz cały katalog `marketing/` (dokumentacja Ads, dziś niezacommitowana — jeśli ktoś zrobi `git clean` albo wymieni maszynę, ten audyt i cała praca z 20.09 znikają). To osobna decyzja, nie blokuje pkt. 1.

---

## 2. Geo: Poznań + 25 km, Presence

**Stan obecny:** `location_details: [{type: "geo_target", key: "20861"}]` = województwo wielkopolskie.
**Docelowo:** promień 25 km wokół centrum Poznania (52.4064°N, 16.9252°E), metoda Presence (już ustawiona poprawnie, `geo_target_type: PRESENCE` zostaje bez zmian).

Payload do `manage_campaign` (AW, konto 7868644697, `campaign_id: "24270154304"`):

```json
{
  "targeting": {
    "languages": ["pl"],
    "location_details": [
      {
        "type": "custom_location",
        "key": "",
        "latitude": 52.4064,
        "longitude": 16.9252,
        "radius": 25,
        "distance_unit": "kilometer"
      }
    ]
  }
}
```

**Ręcznie w panelu (jeśli Marcin robi to sam):** Kampania → Lokalizacje → usuń „Wielkopolskie" → Dodaj → „Poznań" → ikona promienia/pineski → 25 km → zapisz. Upewnić się, że „Opcje lokalizacji" nadal pokazuje „Obecność" (Presence), nie domyślne „Obecność lub zainteresowanie" — ta wartość już jest poprawna, ale warto sprawdzić, że edycja lokalizacji jej nie zresetowała.

---

## 3. 5 słów BROAD → PHRASE (temat zostaje, dopasowanie się zawęża)

Ad group `199868566066` („Grupa reklam 1"), konto 7868644697:

```json
{
  "ad_groups": [
    {
      "id": "199868566066",
      "remove_keywords": [
        {"text": "fotograf wnętrz poznań", "match_type": "BROAD"},
        {"text": "profesjonalne zdjęcia biznesowe poznań", "match_type": "BROAD"},
        {"text": "sesja zdjęciowa biznesowa poznań", "match_type": "BROAD"},
        {"text": "fotografia przemysłowa poznań", "match_type": "BROAD"},
        {"text": "fotografia biznesowa poznan", "match_type": "BROAD"}
      ],
      "add_keywords": [
        {"text": "fotograf wnętrz poznań", "match_type": "PHRASE"},
        {"text": "profesjonalne zdjęcia biznesowe poznań", "match_type": "PHRASE"},
        {"text": "sesja zdjęciowa biznesowa poznań", "match_type": "PHRASE"},
        {"text": "fotografia przemysłowa poznań", "match_type": "PHRASE"},
        {"text": "fotografia biznesowa poznan", "match_type": "PHRASE"}
      ]
    }
  ]
}
```

Uwaga: `fotograf wnętrz poznań` i `fotografia przemysłowa poznań` już istnieją jako EXACT w tej grupie — po zmianie będą PHRASE + EXACT (świadomie, szerszy niż tylko exact, ale bez ryzyka rozszerzania przez Google poza sam temat).

**Ręcznie w panelu:** Słowa kluczowe → filtr „Typ dopasowania: Przybliżone" → dla każdego z 5: zmień typ na „Do wyrażenia" (edycja typu dopasowania w miejscu, bez usuwania i dodawania od nowa — szybsze niż wyżej).

---

## 4. Pauza starej kampanii „Pierwsza pro kampania"

```json
{"campaign_id": "22202006131", "status": "PAUSED"}
```

**Ręcznie:** Kampanie → „Pierwsza pro kampania" → przełącznik statusu → Wstrzymana. Zero ryzyka: wszystkie 4 grupy reklam już są PAUSED, więc to nie zmienia niczego w emisji, tylko zamyka furtkę przypadkowego wznowienia.

---

## 5. Porządek konwersji — TYLKO ręcznie w panelu

Narzędzie zapisu, którym dysponuję (`manage_campaign`), **nie obsługuje edycji działań konwersji** (kategoria, sposób zliczania, Główna/Dodatkowa) — to inny typ zasobu niż kampanie/grupy/reklamy. Nawet po włączeniu zapisu do konta **te kroki i tak trzeba zrobić ręcznie**:

1. Narzędzia → Konwersje → **`contact_submit`** → ustawić jako **Główną**.
2. **`phone_click`** i **`Calls from ads`** (rozszerzenie połączeń) → **Dodatkowe**.
3. **`generate_lead`** (ID 7031355494): kategoria z „Wyświetlenie strony" → coś kontaktowego (np. „Zapytanie"), zliczanie z „Wiele" na **„Jedna"**, zostaje **Dodatkowa**.
4. **`email_click`** (ID 7670127751): zliczanie z „Wiele" na **„Jedna"**.
5. Wyłączyć cztery martwe działania Smart Campaign: **983737805, 984506818, 984507067, 984508294**.

---

## 6. Wykluczenia — 471 pozycji, sprawdzone pod kątem konfliktu, gotowe

**Wykonana weryfikacja (21.09.2026):** sprawdziłem `negative-keywords.csv` (471 pozycji, 441 BROAD + 30 PHRASE, 20 kategorii) pod kątem literalnego pokrywania się z którymkolwiek z 41 **żywych** keywordów na koncie (nie tylko z planowanych 21) oraz pod kątem słów-kluczy tematycznych z grup, których nie było w oryginalnym planie: `event`, `konferencj`, `targi`, `nieruchomo`, `przemys`, `biuro`, `zarząd`, `zespół`, `dron`, `reportaż`, `wnętrz`.

**Wynik: zero trafień, zero konfliktów.** Wszystkie 20 kategorii (uroczystości B2C, dzielnice Poznania, glamour, praca/nauka, poradniki, darmowe/stock, sprzęt, marki konkurencji, inne usługi fotograficzne, tanio/amatorsko, packshot DIY, dokumenty, zwierzęta, oprogramowanie, AI/generatory, obcojęzyczne, CV/rekrutacja) są bezpieczne do importu w całości — żadna nie blokuje tematu eventowego, nieruchomości ani przemysłowego, który jest dziś live, a którego nie było w oryginalnym pliku wykluczeń.

Import: `targeting.negative_keywords` na poziomie kampanii (dziś pusty, więc to czysty zapis, nie nadpisanie czegokolwiek) — pełna zawartość `negative-keywords.csv`, kolumny `negative_keyword;match_type`. Plik gotowy do wczytania programowo albo do importu w Google Ads Editor jako `import-3-wykluczenia.csv` (identyczna treść, format Editora).

**Ręcznie:** Google Ads Editor → Kampania „Search | Poznań | Fotografia B2B | 5 zł" → Wyklucz słowa kluczowe → Importuj → `import-3-wykluczenia.csv`.

---

## Kolejność wykonania (jeśli Marcin robi to sam, dziś, w panelu)

1. Commit + push (§1) — 2 minuty, zero zależności.
2. Pauza starej kampanii (§4) — 10 sekund, zero ryzyka.
3. Geo (§2) — 1 minuta.
4. 5× broad → phrase (§3) — 2 minuty.
5. Import wykluczeń (§6) — 1 minuta w Ads Editor, plik już gotowy.
6. Konwersje (§5) — 5 minut, jedyna część wymagająca kilku kliknięć w różnych miejscach panelu.

Razem: **ok. 12-15 minut ręcznej pracy w panelu**, bez czekania na nic.

Jeśli zamiast tego włączysz zapis Supermetrics (link na górze pliku), daj znać — wykonam §2-4 automatycznie z dokładnie tymi payloadami, ale §5 (konwersje) i tak zostanie ręczne niezależnie od tego.
