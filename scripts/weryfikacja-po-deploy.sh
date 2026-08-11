#!/usr/bin/env bash
# Weryfikacja produkcji po deployu. Odpalac DOPIERO gdy Vercel pokaze READY
# dla nowego commita. Kazda linia mowi, czego oczekujemy w nawiasie.
#
# Skrypt jest BIEZACY, nie historyczny. Przepisany 11.08.2026 (audyt CTR-SERP):
# byl przypiety do tury z 05.08 i oczekiwal 50 adresow w sitemapie oraz karty OG
# uslugi `wnetrza-obiekty-architektura`, ktora po przejsciu z osmiu uslug na cztery
# nie istnieje. Narzedzie regresyjne niezgodne ze stanem projektu jest gorsze niz
# jego brak, bo uczy ignorowania czerwonych linii.
# Wyniki tury z 05.08 zostaja w docs/sesje/POMIARY-2026-08-05.md. Tu ich nie ma.
#
# Przy kazdej zmianie oferty, liczby wpisow bloga albo realizacji trzeba podniesc
# oczekiwane liczby w krokach 3, 4 i 11.

S=https://szabunia.pl

# Cztery filary oferty (stan od 10.08.2026). Jedno zrodlo dla krokow 2 i 11.
USLUGI=(eventy-reportaze wizerunek-portrety fotografia-produktowa nieruchomosci-przemysl)

echo "== 1. Portret autora na podstronach uslug (oczekiwane: q80=200, q78=400, zadan q=78 = 0) =="
printf '  q=80 -> ' ; curl -s -o /dev/null -w "%{http_code}\n" "$S/_next/image?url=%2Fimages%2Fmarcin-hero-light-4.jpg&w=256&q=80"
printf '  q=78 -> ' ; curl -s -o /dev/null -w "%{http_code}\n" "$S/_next/image?url=%2Fimages%2Fmarcin-hero-light-4.jpg&w=256&q=78"
printf '  zadan q=78 na podstronie -> ' ; curl -s "$S/uslugi/wizerunek-portrety" | grep -o 'q=78' | wc -l | tr -d ' '

# Slug przepiety 11.08.2026: linia obiektowa to dzis `nieruchomosci-przemysl`.
# Plik `wnetrza-obiekty-architektura.png` skasowany razem z czterema innymi
# osieroconymi kartami. Sprawdzamy komplet, bo `nieruchomosci-przemysl.png`
# nie istnial od 10.08 i nikt tego nie zauwazyl (audyt CTR-SERP, F1).
echo "== 2. Karty OG czterech uslug (oczekiwane: 4x 200) =="
for og in "${USLUGI[@]}"; do
  printf '  %-24s -> ' "$og" ; curl -s -o /dev/null -w "%{http_code}\n" "$S/images/og/uslugi/$og.png"
done

echo "== 3. Sitemapa (oczekiwane: 46 adresow, box17 = 0, lastmod 2026-08-11 na 20 adresach) =="
printf '  adresow -> ' ; curl -s "$S/sitemap.xml" | grep -c "<loc>"
printf '  box17   -> ' ; curl -s "$S/sitemap.xml" | grep -c "box17"
echo "  lastmod:" ; curl -s "$S/sitemap.xml" | grep -o "<lastmod>[^<]*" | sort | uniq -c | sed 's/^/    /'

# ⚠ Petle ponizej chodza po `for u in $(...)`, nie po `... | while read`:
# w wariancie z potokiem wewnetrzny `curl` potrafi zjesc stdin petli.
# Adresy nie zawieraja spacji, wiec `for` jest tu bezpieczne.
echo "== 4. Sitemapa: kazdy adres zwraca 200 (oczekiwane: brak linii ponizej) =="
for u in $(curl -s "$S/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g'); do
  c=$(curl -s -o /dev/null -w '%{http_code}' "$u")
  [ "$c" != "200" ] && echo "  $c  $u"
done
echo "  (koniec)"

echo "== 5. ItemList na /portfolio (oczekiwane: 10 ListItem = 2 okruszki + 8 realizacji, box17 = 0) =="
printf '  ListItem -> ' ; curl -s "$S/portfolio" | grep -o '"@type":"ListItem"' | wc -l | tr -d ' '
printf '  box17    -> ' ; curl -s "$S/portfolio" | grep -o 'box17' | wc -l | tr -d ' '

echo "== 6. /blog: ItemList + autodiscovery RSS (oczekiwane: 1 i >=1) =="
printf '  ItemList -> ' ; curl -s "$S/blog" | grep -o '"@type":"ItemList"' | wc -l | tr -d ' '
printf '  rss+xml  -> ' ; curl -s "$S/blog" | grep -o 'application/rss+xml' | wc -l | tr -d ' '

echo "== 7. RSS lastBuildDate (oczekiwane: data najnowszego wpisu, dzis 29 Jul 2026) =="
printf '  ' ; curl -s "$S/feed.xml" | grep -o "<lastBuildDate>[^<]*</lastBuildDate>"

echo "== 8. llms.txt (oczekiwane: 5-15, zero wystapien 10-15) =="
printf '  5-15  -> ' ; curl -s "$S/llms.txt" | grep -c "5-15 min/os."
printf '  10-15 -> ' ; curl -s "$S/llms.txt" | grep -c "10-15 min/os."

# 21, nie 23: tura z 10.08 scalila sciezki CTA („fix(ux): jedna sciezka CTA",
# „refactor(ui): spojnosc CTA i odsylaczy"). Spadek jest zamierzony.
echo "== 9. data-cta, home + /uslugi + /portfolio (oczekiwane: 21) =="
printf '  ' ; { curl -s "$S/"; curl -s "$S/uslugi"; curl -s "$S/portfolio"; } | grep -o 'data-cta="[^"]*"' | sort -u | wc -l | tr -d ' '

echo "== 10. 404 (oczekiwane: noindex, follow) =="
curl -s "$S/nie-ma-takiej-strony" | grep -o '<meta name="robots"[^>]*>' | sed 's/^/  /'

# Dodane 11.08.2026 (audyt CTR-SERP, F6). Migracja z osmiu uslug na cztery zostawila
# 12 z 26 wpisow z martwym slugiem w `blogServiceMap`, przez co karta „Powiazana usluga"
# przestala sie renderowac. `getServiceBySlug` zwraca undefined i React nie rysuje nic,
# wiec lint, tsc i build przechodzily. Jedyny sposob na wykrycie to sprawdzenie HTML.
#
# ⚠ `grep -qF` z pelnym napisem, NIE `grep -q "Powi.zana us.uga"`. Skrypt startuje
# z LC_CTYPE=C, gdzie kropka dopasowuje jeden BAJT, a `ą` i `ł` w UTF-8 zajmuja po dwa.
# Wariant z kropka dziala w interaktywnej powloce i cicho nie dopasowuje nic tutaj,
# czyli pokazuje 26 brakow zamiast 12. Falszywy alarm z 11.08.2026, nie powtarzac.
echo "== 11. Karta 'Powiazana usluga' na wszystkich wpisach (oczekiwane: brak linii ponizej) =="
for u in $(curl -s "$S/sitemap.xml" | grep -o '<loc>[^<]*/blog/[^<]*</loc>' | sed 's/<[^>]*>//g'); do
  curl -s "$u" | grep -qF "Powiązana usługa" || echo "  BRAK KARTY  $u"
done
echo "  (koniec)"

echo "== 12. Odsylacze do bloga na podstronach uslug (oczekiwane: 4x >=1) =="
for s in "${USLUGI[@]}"; do
  printf '  %-24s -> ' "$s" ; curl -s "$S/uslugi/$s" | grep -o 'href="/blog/[a-z0-9-]*"' | sort -u | wc -l | tr -d ' '
done

echo "== 13. Stara domena i www (oczekiwane: 308, nie 302 i nie 200) =="
printf '  stara domena -> ' ; curl -sI "https://marcinszabunia.pl/portrety-biznesowe" | head -1
printf '  www          -> ' ; curl -sI "https://www.szabunia.pl/" | head -1

echo "== 14. Wycofane adresy uslug nadal przekierowuja (oczekiwane: 5x 308) =="
for old in sesje-zespolowe wideo-marketing pakiety-foto-wideo zdjecia-wideo-z-drona wnetrza-obiekty-architektura; do
  printf '  %-30s -> ' "$old" ; curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" "$S/uslugi/$old"
done

echo
echo "Gotowe. Wyniki wklej do biezacego raportu w docs/sesje/ razem z data odczytu."
