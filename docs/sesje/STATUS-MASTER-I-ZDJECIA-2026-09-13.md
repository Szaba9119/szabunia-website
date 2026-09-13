# Status MASTER i diagnoza zdjęć — 13.09.2026

## Zdjęcia

W starej karcie podglądu po testach responsywności portret hero i cztery zdjęcia usług miały `complete=false`, `naturalWidth=0`. Zrzut potwierdził pusty portret. Serwer zwrócił HTTP 200 dla hero w JPEG i AVIF oraz miniatury usługi w AVIF; odpowiedzi trwały poniżej 0,11 s (pomiar lokalny, nie CWV).

Ustawienie jawnego rozmiaru testowego przywróciło pięć zdjęć bez zmiany kodu. Po usunięciu emulacji otwarto nową kartę tej samej strony. Hero i cztery zdjęcia usług załadowały się poprawnie. Po przewinięciu i zakończeniu pobierania nie pozostały obrazy oczekujące. Stara karta została zastąpiona świeżym podglądem. Wskazuje to na problem stanu przeglądarki po testach rozmiaru; nie ustalono wewnętrznej przyczyny tego zachowania. Nie wprowadzano obejścia w kodzie aplikacji ani nie wyłączano optymalizacji zdjęć.

## Co jest wykonane lokalnie

- Marka SZABUNIA, cztery filary, osobista odpowiedzialność Marcina.
- Nowy układ głównej, wspólne dane dowodowe i rozbudowany opis czterech realizacji.
- Formularze, walidacja, dynamiczne pytania, zgody i atrybucja oraz testy izolowane.
- Porządkowanie SEO, treści i linkowania przy zachowaniu adresów i głównych sygnałów homepage.
- Późniejsze korekty właściciela: Dron, Zapytaj o ofertę, wcześniejszy kontakt mobilny, zwarte portfolio, pełne opinie i przewijane menu.

## Co pozostaje otwarte

| Zakres | Stan |
| --- | --- |
| Pełna selekcja zdjęć A/B/C/D z §61 | Nie wykonano; oceniano wybrane kadry w układzie |
| Ekspozycja jakości materiałów z §60 | Realizacje są opisane, ale dobór najmocniejszych kadrów i łatwiejszy dostęp do filmu mogą wzmocnić efekt |
| Wdrożenie na Preview / produkcję | Nie wykonano |
| Rzeczywiste doręczenie formularzy, CRM i konfiguracja integracji | Niepotwierdzone; testy z atrapami nie zamykają tego punktu |
| Wydajność i skuteczność po publikacji | Brak końcowego pomiaru CWV/CrUX i danych konwersji |
| Licencje, rozliczenia, logistyka produktów, dokumenty dronowe | Lista decyzji właściciela, bez wymyślania zasad |
| Google Business Profile, opinie, linki, profile zewnętrzne | Przygotowana lista działań, nie wykonano zmian na kontach |
| Content Day / współpraca z agencjami / nowe landingi | Kandydaci do rozważenia, wymagają potwierdzonego zakresu i materiałów |

## Zalecany kolejny krok projektowy

Najpierw selekcja najmocniejszych istniejących zdjęć, z propozycjami i bez kasowania plików. Następnie łatwe obejrzenie istniejącego filmu w obrębie sekcji realizacji, z uruchomieniem po kliknięciu. Dodatkowy drobny element: krótkie wyjaśnienie przy formularzu „Co otrzymasz po zapytaniu”, oparte na istniejącej odpowiedzi w 24h i trzech zakresach wyceny. To rekomendacje, nie funkcje dodane w tym etapie. Nie tworzyć fikcyjnego showreela ani kolejnych sekcji z ogólnymi obietnicami.

W tej diagnozie zmieniono wyłącznie dokumentację. Poprzedni build i lint pozostają ostatnią kontrolą kodu; nie przedstawiamy ich jako nowych testów tego etapu.
