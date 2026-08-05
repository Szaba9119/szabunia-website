# Poprawki wdrożone na wizytówce Google — 5 sierpnia 2026

**Status:** trzy zmiany zapisane w panelu, **wszystkie w moderacji Google** („zwykle do 10 minut").
Żadnej zmiany w repo. Żadnej zmiany w kategoriach, nazwie, godzinach, telefonie ani obszarze.
**Podstawa:** `AUDYT-WIZYTOWKA-2026-08-05.md`, prompt `PROMPT-POPRAWKI-WIZYTOWKA-2026-08-05.md`,
treści z `PACZKA-WIZYTOWKA-2026-08-05.md`. Autoryzacja Marcina z czatu 05.08.2026.

---

## A. Co zrobione

### Pomiar

**1. Link witryny z UTM** (WIZ2608-03) · Edytuj profil → Kontakt → Witryna

- było: `https://szabunia.pl/`
- jest: `https://szabunia.pl/?utm_source=google&utm_medium=organic&utm_campaign=gbp`
- **Odwrócenie:** to samo pole, wpisać `https://szabunia.pl/` i zapisać.
- Zrzut potwierdzający: panel pokazał sekcje AKTUALNIE i OCZEKUJE z nowym adresem.

### Treść

**2. Opis firmy w nowej kolejności** (WIZ2608-09) · Edytuj profil → Informacje → Opis

Te same fakty, ta sama długość (639 z 750 znaków), zmieniona kolejność: pierwsze zdanie
mówi teraz, co robisz, a nie od kiedy. Weryfikacja przed zapisem: sprawdziłem programowo,
że tekst ma dokładnie 639 znaków, zaczyna się od właściwego zdania, kończy właściwym
i nie zawiera długiego myślnika. Dopiero potem kliknąłem Zapisz.

- **Odwrócenie:** wkleić z powrotem poprzednią wersję:

```
Fotograf biznesowy i twórca wideo w Poznaniu, na rynku od 2018 roku. 250 000+ zdjęć, 1000+ sesji, 100+ obsłużonych marek, w tym H&M, Santander, John Deere. Po studiach z zarządzania rozumiem nie tylko kadr, ale i biznesowy cel zdjęć. Specjalizacja: obsługa eventów firmowych, sesje zespołowe, portrety na LinkedIn, wideo wizerunkowe. Wyróżniony w konkursie Portret 2022, autor okładki brytyjskiego Big Furniture Group Magazine, kwiecień 2026 (sesja dla Grupy Forte). Współpracowałem też z Warner Music Poland, IQOS, Amica i Centrum Posnania. Wycena w 24h, zdjęcia w 14 dni, wideo w 21 dni. Obsługa: Poznań, cała Polska, Europa na życzenie.
```

### Dowód społeczny

**3. Odpowiedź na opinię Michała Jadczaka** (WIZ2608-07) · Zobacz opinie → Bez odpowiedzi

Opinia: 5 gwiazdek, bez treści, Lokalny przewodnik, sprzed sześciu tygodni, jedyna
bez odpowiedzi na dziesięć.

```
Dziękuję za pięć gwiazdek. Jeśli mieliśmy okazję razem pracować, chętnie dowiem się, co się sprawdziło. Gdyby coś wymagało poprawki, proszę o wiadomość. Marcin
```

- **Odwrócenie:** przycisk „Usuń" pod odpowiedzią (albo „Edytuj", jeśli chcesz inną treść).

---

## B. Co czeka na moderację Google

Wszystkie trzy zmiany. Panel przy każdej pokazał baner „Twoja zmiana oczekuje na sprawdzenie.
Zwykle zajmuje to do 10 minut". Sprawdź wieczorem 05.08 albo rano 06.08: w edytorze profilu
znika sekcja OCZEKUJE, a w widoku publicznym wchodzi nowa treść.

Osobno: **przed tą sesją w profilu wisiała jeszcze jedna zmiana w moderacji**, widoczna
przy usługach. Nie wiem, kto i kiedy ją wprowadził; nie pochodzi z tej sesji.

---

## C. Co zostaje po Twojej stronie

| Co | Dlaczego nie zrobiłem | Ile Ci to zajmie |
|---|---|---|
| **Ceny w 7 produktach** (WIZ2608-04) | Pole ceny w Google nie ma miejsca na słowo „netto", a Twoje kwoty są netto. To komunikat cenowy do klienta, więc nie ruszam bez Twojego „ok". Warianty w `PACZKA` §2 | 5 minut po decyzji, kwoty mam gotowe |
| **3 miniatury produktów** (WIZ2608-05) | Pole wyboru pliku siedzi w ramce, do której automatyzacja przeglądarki nie sięga. Pliki czekają na Twoim dysku: `01_Biznes/_System/08_Zalaczniki/wizytowka_miniatury/` | 3 × 30 sekund |
| **Wpis o sesji dla IDcom** (WIZ2608-11) | Tekst wpisałem, ale zdjęcia nie dało się dołączyć z tego samego powodu. **Anulowałem publikację zamiast wypuszczać wpis fotografa bez zdjęcia.** Tekst gotowy w `PACZKA` §6 | 2 minuty ze zdjęciem z sesji IDcom |
| **Usługa dronowa w kategorii Fotograf** (WIZ2608-08) | Wybór pozycji z listy Google to dokładnie to miejsce, gdzie 04.08 wpiąłem „Fotografię buduarową". Zrobię przy następnym wejściu, chip po chipie, ze zrzutem przed potwierdzeniem | albo Ty, albo ja następnym razem |
| **H1: czy usługi widać na telefonie** | Desktop nie odpowie na to pytanie | 5 minut, Mapy na telefonie |
| **Kampania po opinie** (WIZ2608-02) | Maili nie wysyłam | decyzja + wysyłka |
| **Decyzje z §12 raportu** | To decyzje, nie zadania | |

---

## D. Świadomie nie ruszone

- Nazwa profilu, kategoria główna i dodatkowe, obszar działania, godziny, telefon, czat SMS.
- Zdjęcia w galerii profilu (wybór materiału należy do Ciebie).
- Cokolwiek związanego z reklamami, Merchant Center i rezerwacjami. Panel podsuwa te przyciski
  przy każdym wejściu; żadnego nie kliknąłem.
- Repo. Z tego wdrożenia nie wynika ani jedna zmiana w kodzie.

---

## E. Jak zweryfikować

1. **UTM:** otwórz profil w wyszukiwarce, kliknij „Strona" i sprawdź pasek adresu. Ma być
   `?utm_source=google&utm_medium=organic&utm_campaign=gbp`. Za tydzień w GA4:
   Pozyskiwanie → Sesje wg źródła/medium → szukaj kampanii `gbp`.
2. **Opis:** Edytuj profil → Informacje → Opis. Pierwsze zdanie ma się kończyć słowem
   „wizerunkowe", a nie „roku".
3. **Opinia:** Zobacz opinie → zakładka „Bez odpowiedzi" ma być pusta.

---

## Rejestr findingów, status po tej sesji

| ID | Finding | Status |
|---|---|---|
| WIZ2608-03 | Brak UTM w linku do witryny | **wdrożony, czeka na moderację** |
| WIZ2608-07 | Opinia bez odpowiedzi od 6 tygodni | **wdrożony, czeka na moderację** |
| WIZ2608-09 | Opis otwiera się metryką, nie ofertą | **wdrożony, czeka na moderację** |
| WIZ2608-04 | Puste pole ceny w produktach | czeka na decyzję Marcina (netto/brutto) |
| WIZ2608-05 | Miniatury produktów | pliki gotowe, upload po stronie Marcina |
| WIZ2608-08 | Usługa dronowa w kategorii Fotograf | do zrobienia przy następnym wejściu |
| WIZ2608-11 | Wpisy | tekst gotowy, publikacja po dodaniu zdjęcia |
| WIZ2608-01, -02, -06, -10 | widoczność, opinie, zdjęcia, nazwa | otwarte, poza zakresem tej sesji |

---

*Wykonał: Claude (Cowork), 05.08.2026, w przeglądarce Marcina, na jego autoryzację z czatu.
Trzy zmiany zapisane, każda z osobna, każda ze zrzutem przed i po. Żadnego kliknięcia
poza listą uzgodnioną w prompcie.*
