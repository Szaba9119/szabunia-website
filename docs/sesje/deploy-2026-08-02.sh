#!/usr/bin/env bash
# Deploy 2026-08-02 — cztery diffy z dzisiejszej sesji.
# Bezpieczny do odpalenia i odejścia: nic nie pushuje, jeśli tsc albo build padnie.
# Diffy, które już siedzą w drzewie, są pomijane, nie nakładane drugi raz.

set -u
cd ~/Documents/05_Strona_WWW/marcinszabunia || { echo "!! Nie ma repo pod tą ścieżką"; exit 1; }

rm -f .git/index.lock
echo "== Gałąź: $(git rev-parse --abbrev-ref HEAD)"
echo

DIFFS=(
  "korekta-jezykowa-2026-08-02.diff"
  "redakcja-A-C-D-2026-08-02.diff"
  "godziny-otwarcia-2026-08-02.diff"
  "lejek-case-studies-2026-08-02.diff"
)

KONFLIKT=0
for name in "${DIFFS[@]}"; do
  f="docs/sesje/$name"
  if [ ! -f "$f" ]; then
    echo "  BRAK PLIKU   $name"; KONFLIKT=1; continue
  fi
  if git apply --reverse --check "$f" >/dev/null 2>&1; then
    echo "  już jest     $name"
  elif git apply --check "$f" >/dev/null 2>&1; then
    git apply "$f" && echo "  NAŁOŻONE     $name"
  else
    echo "  !! KONFLIKT  $name  (pomijam, sprawdź ręcznie)"; KONFLIKT=1
  fi
done

echo
if [ "$KONFLIKT" -eq 1 ]; then
  echo "!! Któryś diff się nie nałożył. NIE pushuję. Zajrzyj wyżej."
  exit 1
fi

echo "== Zmienione pliki:"
git status --short
echo
echo "== tsc --noEmit"
npx tsc --noEmit || { echo "!! TSC PADŁ — nie pushuję, drzewo zostaje jak jest"; exit 1; }

echo "== next build"
npm run build || { echo "!! BUILD PADŁ — nie pushuję, drzewo zostaje jak jest"; exit 1; }

echo
echo "== commit + push"
git add -A
git commit -m "godziny otwarcia w JSON-LD, CTA i pasek mobilny na case studies, korekta redakcyjna

- openingHoursSpecification: pon-pt 08:00-20:00, sob 10:00-16:00 (zgodnie z wizytowka Google)
- portfolio/[slug]: przycisk data-cta=wycena_case + MobileFAB na 9 case studies
- uslugi: mierzalne CTA data-cta=wycena_hub_uslugi na hubie
- korekta jezykowa i redakcyjna z audytu 2026-08-02

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01DNvPtfHDobPG2McduNMRjo" || echo "(nic do zacommitowania)"

git push && echo && echo "== GOTOWE. Vercel buduje produkcję." || echo "!! PUSH PADŁ"
