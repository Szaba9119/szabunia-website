#!/usr/bin/env python3
"""
Generator obrazków OG (1200x630) dla podstron usług (/uslugi/{slug}).

Czyta src/data/services.tsx (regex: slug / title), renderuje brandowe
obrazki PNG do public/images/og/uslugi/{slug}.png.

Użycie:  python3 scripts/generate-og-uslugi.py
Wymaga:  Pillow + font bold z polskimi znakami (patrz generate-og-blog.py).
"""

import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVICES_TSX = os.path.join(ROOT, "src", "data", "services.tsx")
OUT_DIR = os.path.join(ROOT, "public", "images", "og", "uslugi")

NAVY = (15, 23, 42)
NAVY_LIGHT = (30, 41, 59)
BLUE = (37, 99, 235)
BLUE_LIGHT = (59, 130, 246)
STEEL_LIGHT = (148, 163, 184)
WHITE = (255, 255, 255)

FONT_CANDIDATES_BOLD = [
    "/usr/share/fonts/truetype/lato/Lato-Black.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
]
FONT_CANDIDATES_REGULAR = [
    "/usr/share/fonts/truetype/lato/Lato-Regular.ttf",
    "/Library/Fonts/Arial.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
]


def pick_font(candidates: list[str], size: int) -> ImageFont.FreeTypeFont:
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    print("Nie znaleziono fontu — uzupełnij FONT_CANDIDATES.", file=sys.stderr)
    sys.exit(1)


def parse_services(src: str) -> list[dict]:
    """Wyciąga (slug, title) dla każdej usługi.

    Poprzednia wersja szukała `title` w oknie 200 znaków od `slug` i przez to
    CICHO POMIJAŁA usługi z dłuższym blokiem komentarzy między tymi polami.
    Tak przepadła ósma usługa (`wnetrza-obiekty-architektura`, ok. 1 100 znaków
    komentarza), której karta OG zwracała 404 od dnia publikacji — a skrypt
    kończył się komunikatem „Wygenerowano 7 obrazków" i wyglądał na udany
    (audyt PELNY2608-07, przyczyna ustalona 05.08.2026).

    Teraz: dzielimy plik po `slug: "..."`, a w każdym kawałku bierzemy pierwszy
    `title` z wcięciem czterech spacji (`seo.title` ma sześć, więc nie wpada).
    """
    services = []
    parts = re.split(r'\n    slug: "([^"]+)",', src)
    # parts = [przed pierwszym slugiem, slug1, treść1, slug2, treść2, ...]
    for slug, chunk in zip(parts[1::2], parts[2::2]):
        m = re.search(r'^    title: "((?:[^"\\]|\\.)*)"', chunk, re.MULTILINE)
        if not m:
            print(f"OSTRZEŻENIE: brak `title` dla sluga {slug} — pomijam.", file=sys.stderr)
            continue
        services.append({"slug": slug, "title": m.group(1).replace('\\"', '"')})

    # Kontrola pokrycia: liczba sparsowanych usług musi zgadzać się z liczbą slugów
    # w pliku. Bez tego kolejny cichy brak znowu wyszedłby dopiero z audytu.
    declared = len(re.findall(r'\n    slug: "[^"]+",', src))
    if len(services) != declared:
        print(
            f"BŁĄD: sparsowano {len(services)} usług przy {declared} slugach w services.tsx.",
            file=sys.stderr,
        )
        sys.exit(1)
    return services


def render(service: dict, font_title: ImageFont.FreeTypeFont, font_meta: ImageFont.FreeTypeFont,
           font_brand: ImageFont.FreeTypeFont) -> Image.Image:
    img = Image.new("RGB", (1200, 630), NAVY)
    draw = ImageDraw.Draw(img)

    for y in range(630):
        t = y / 630
        r = int(NAVY[0] + (NAVY_LIGHT[0] - NAVY[0]) * t * 0.6)
        g = int(NAVY[1] + (NAVY_LIGHT[1] - NAVY[1]) * t * 0.6)
        b = int(NAVY[2] + (NAVY_LIGHT[2] - NAVY[2]) * t * 0.6)
        draw.line([(0, y), (1200, y)], fill=(r, g, b))

    draw.rectangle([0, 0, 14, 630], fill=BLUE)

    # Badge "USŁUGA"
    label = "USŁUGA"
    pad_x, pad_y = 22, 12
    lw = draw.textlength(label, font=font_meta)
    bx, by = 80, 110
    draw.rounded_rectangle([bx, by, bx + lw + 2 * pad_x, by + 28 + 2 * pad_y], radius=10, fill=BLUE)
    draw.text((bx + pad_x, by + pad_y - 2), label, font=font_meta, fill=WHITE)

    # Tytuł usługi. Zawijanie po słowach do dwóch linii: „Wnętrza, obiekty
    # i architektura" przy 78 px nie mieściło się w 1040 px i ostatnia litera
    # wychodziła poza kadr (05.08.2026). Krótkie tytuły renderują się bez zmian,
    # bo pętla kończy się na jednej linii.
    max_width = 1200 - 2 * 80
    words = service["title"].split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=font_title) <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)

    line_height = 92
    y0 = 230 if len(lines) == 1 else 230 - (len(lines) - 1) * line_height // 2
    for i, line in enumerate(lines):
        draw.text((80, y0 + i * line_height), line, font=font_title, fill=WHITE)

    # Stopka
    draw.text((80, 540), "Marcin Szabunia", font=font_brand, fill=BLUE_LIGHT)
    bw = draw.textlength("Marcin Szabunia", font=font_brand)
    draw.text((80 + bw + 24, 544), "·  Fotografia i wideo B2B  ·  szabunia.pl",
              font=font_meta, fill=STEEL_LIGHT)
    return img


def main() -> None:
    with open(SERVICES_TSX, encoding="utf-8") as f:
        services = parse_services(f.read())
    if not services:
        print("Nie sparsowano żadnych usług z services.tsx", file=sys.stderr)
        sys.exit(1)

    os.makedirs(OUT_DIR, exist_ok=True)
    font_title = pick_font(FONT_CANDIDATES_BOLD, 78)
    font_brand = pick_font(FONT_CANDIDATES_BOLD, 30)
    font_meta = pick_font(FONT_CANDIDATES_REGULAR, 26)

    for s in services:
        out = os.path.join(OUT_DIR, f"{s['slug']}.png")
        render(s, font_title, font_meta, font_brand).save(out, "PNG", optimize=True)
        print(f"OK  {s['slug']}.png")
    print(f"\nWygenerowano {len(services)} obrazków w public/images/og/uslugi/")


if __name__ == "__main__":
    main()
