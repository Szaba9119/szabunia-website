#!/usr/bin/env python3
"""
Generuje komplet ikon strony z logo (monogram MS).

Wejście:  logo-ms.png w root projektu (czarny znak na białym/przezroczystym tle)
Wyjście:  src/app/favicon.ico (16/32/48/256)
          src/app/apple-icon.png (180x180)
          public/icon-192.png, public/icon-512.png (PWA)

Styl: biały monogram na granatowym tle #0F172A (token --color-navy).

Użycie: python3 scripts/generate-favicons.py
"""

import os
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_LOGO = os.path.join(ROOT, "public", "Logo_MS.jpg")
NAVY = (15, 23, 42, 255)

# Ile % boku ikony zajmuje znak (reszta to margines tła)
MARK_SCALE = 0.78


def load_mark() -> Image.Image:
    """Czarny znak -> biała maska z przezroczystością, przycięta do treści."""
    im = Image.open(SRC_LOGO).convert("RGBA")
    # alfa = ciemność piksela (czarny znak -> pełna alfa; białe tło -> 0)
    gray = im.convert("L")
    alpha = gray.point(lambda p: 255 - p)
    # jeśli plik miał własną alfę — uwzględnij
    if "A" in im.getbands():
        src_a = im.getchannel("A")
        alpha = Image.composite(alpha, Image.new("L", im.size, 0), src_a.point(lambda p: 255 if p > 8 else 0))
    white = Image.new("RGBA", im.size, (255, 255, 255, 0))
    white.putalpha(alpha)
    bbox = white.getbbox()
    return white.crop(bbox)


def icon(mark: Image.Image, size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), NAVY)
    target = int(size * MARK_SCALE)
    m = mark.copy()
    m.thumbnail((target, target), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas


def main() -> None:
    if not os.path.exists(SRC_LOGO):
        print(f"Brak {SRC_LOGO} — wrzuć logo-ms.png do root projektu.", file=sys.stderr)
        sys.exit(1)

    mark = load_mark()

    ico = icon(mark, 256)
    ico.save(os.path.join(ROOT, "src", "app", "favicon.ico"),
             sizes=[(16, 16), (32, 32), (48, 48), (256, 256)])
    icon(mark, 180).convert("RGB").save(os.path.join(ROOT, "src", "app", "apple-icon.png"))
    icon(mark, 192).save(os.path.join(ROOT, "public", "icon-192.png"))
    icon(mark, 512).save(os.path.join(ROOT, "public", "icon-512.png"))
    print("OK: favicon.ico, apple-icon.png, icon-192.png, icon-512.png")


if __name__ == "__main__":
    main()
