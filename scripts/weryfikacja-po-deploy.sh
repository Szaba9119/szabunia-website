#!/usr/bin/env bash
# Weryfikacja produkcji po deployu tury z 05.08.2026.
# Odpalać DOPIERO gdy Vercel pokaże READY dla nowego commita.
# Każda linia mówi, czego oczekujemy w nawiasie.

S=https://szabunia.pl

echo "== 1. Portret autora na podstronach uslug (oczekiwane: q80=200) =="
printf '  q=80 -> ' ; curl -s -o /dev/null -w "%{http_code}\n" "$S/_next/image?url=%2Fimages%2Fmarcin-hero-light-4.jpg&w=256&q=80"
printf '  q=78 -> ' ; curl -s -o /dev/null -w "%{http_code}\n" "$S/_next/image?url=%2Fimages%2Fmarcin-hero-light-4.jpg&w=256&q=78"
printf '  zadan q=78 na podstronie (oczekiwane: 0) -> ' ; curl -s "$S/uslugi/wizerunek-portrety" | grep -o 'q=78' | wc -l | tr -d ' '

echo "== 2. Karta OG linii obiektowej (oczekiwane: 200) =="
printf '  ' ; curl -s -o /dev/null -w "%{http_code}\n" "$S/images/og/uslugi/wnetrza-obiekty-architektura.png"

echo "== 3. Sitemapa (oczekiwane: 50 adresow, lastmod 2026-08-05, box17 = 0) =="
printf '  adresow -> ' ; curl -s "$S/sitemap.xml" | grep -c "<loc>"
printf '  box17   -> ' ; curl -s "$S/sitemap.xml" | grep -c "box17"
echo "  lastmod:" ; curl -s "$S/sitemap.xml" | grep -o "<lastmod>[^<]*" | sort | uniq -c | sed 's/^/    /'

echo "== 4. ItemList na /portfolio (oczekiwane: 10 ListItem = 2 okruszki + 8 realizacji, box17 = 0) =="
printf '  ListItem -> ' ; curl -s "$S/portfolio" | grep -o '"@type":"ListItem"' | wc -l | tr -d ' '
printf '  box17    -> ' ; curl -s "$S/portfolio" | grep -o 'box17' | wc -l | tr -d ' '

echo "== 5. /blog: ItemList + autodiscovery RSS (oczekiwane: 1 i >=1) =="
printf '  ItemList -> ' ; curl -s "$S/blog" | grep -o '"@type":"ItemList"' | wc -l | tr -d ' '
printf '  rss+xml  -> ' ; curl -s "$S/blog" | grep -o 'application/rss+xml' | wc -l | tr -d ' '

echo "== 6. RSS lastBuildDate (oczekiwane: 29 Jul 2026, nie 28 Jun) =="
printf '  ' ; curl -s "$S/feed.xml" | grep -o "<lastBuildDate>[^<]*</lastBuildDate>"

echo "== 7. llms.txt (oczekiwane: 5-15, zero wystapien 10-15) =="
printf '  5-15  -> ' ; curl -s "$S/llms.txt" | grep -c "5-15 min/os."
printf '  10-15 -> ' ; curl -s "$S/llms.txt" | grep -c "10-15 min/os."

echo "== 8. data-cta, home + /uslugi + /portfolio (oczekiwane: 23, przed tura: 14) =="
printf '  ' ; { curl -s "$S/"; curl -s "$S/uslugi"; curl -s "$S/portfolio"; } | grep -o 'data-cta="[^"]*"' | sort -u | wc -l | tr -d ' '

echo "== 9. 404 (oczekiwane: noindex, follow) =="
curl -s "$S/nie-ma-takiej-strony" | grep -o '<meta name="robots"[^>]*>' | sed 's/^/  /'

echo "== 10. HIPOTEZY H1 i H2 (oczekiwane: 308, nie 302 / przekierowanie, nie 200) =="
printf '  stara domena -> ' ; curl -sI "https://marcinszabunia.pl/portrety-biznesowe" | head -1
printf '  www          -> ' ; curl -sI "https://www.szabunia.pl/" | head -1

echo
echo "Gotowe. Wyniki 10 wklej do docs/sesje/POMIARY-2026-08-05.md razem z data odczytu."
