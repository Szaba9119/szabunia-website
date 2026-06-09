#!/usr/bin/env python3
"""
Generator obrazków OG (1200x630) dla wpisów bloga.

Czyta src/data/blog.ts (regex: slug / title / category), renderuje brandowe
obrazki PNG do public/images/og/blog/{slug}.png.

Użycie:  python3 scripts/generate-og-blog.py
Wymaga:  Pillow (pip install Pillow) + font bold z polskimi znakami
         (ścieżki niżej w FONT_CANDIDATES — dopasuj do swojego systemu).

Kolory zgodne z design tokens (src/app/globals.css):
  navy #0F172A · blue #2563EB · blue-light #3B82F6 · steel-light #94A3B8
"""

import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG_TS = os.path.join(ROOT, "src", "data", "blog.ts")
OUT_DIR = os.path.join(ROOT, "public", "images", "og", "blog")

NAVY = (15, 23, 42)
NAVY_LIGHT = (30, 41, 59)
BLUE = (37, 99, 235)
BLUE_LIGHT = (59, 130, 246)
STEEL_LIGHT = (148, 163, 184)
WHITE = (255, 255, 255)

CATEGORY_LABELS = {"poradnik": "PORADNIK", "realizacja": "REALIZACJA", "branża": "BRANŻA"}

# Fonty bold/regular z polskimi znakami — pierwszy istniejący wygrywa.
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


def parse_posts(ts_source: str) -> list[dict]:
    posts = []
    # Każdy wpis zaczyna się od slug: "..." — title i category są w tym samym obiekcie.
    for m in re.finditer(
        r'slug:\s*"([^"]+)"[\s\S]*?title:\s*"((?:[^"\\]|\\.)*)"[\s\S]*?category:\s*"([^"]+)"',
        ts_source,
    ):
        slug, title, category = m.group(1), m.group(2), m.group(3)
        title = title.replace('\\"', '"').replace("\\u2014", "—")
        posts.append({"slug": slug, "title": title, "category": category})
    return posts


def wrap(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_w: int) -> list[str]:
    words, lines, cur = text.split(), [], ""
    for w in words:
        test = f"{cur} {w}".strip()
        if draw.textlength(test, font=font) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def render(post: dict, font_title: ImageFont.FreeTypeFont, font_meta: ImageFont.FreeTypeFont,
           font_brand: ImageFont.FreeTypeFont) -> Image.Image:
    img = Image.new("RGB", (1200, 630), NAVY)
    draw = ImageDraw.Draw(img)

    # Delikatny gradient — ciemniejszy dół
    for y in range(630):
        t = y / 630
        r = int(NAVY[0] + (NAVY_LIGHT[0] - NAVY[0]) * t * 0.6)
        g = int(NAVY[1] + (NAVY_LIGHT[1] - NAVY[1]) * t * 0.6)
        b = int(NAVY[2] + (NAVY_LIGHT[2] - NAVY[2]) * t * 0.6)
        draw.line([(0, y), (1200, y)], fill=(r, g, b))

    # Niebieski pasek akcentowy po lewej
    draw.rectangle([0, 0, 14, 630], fill=BLUE)

    # Kategoria (badge)
    label = CATEGORY_LABELS.get(post["category"], post["category"].upper())
    pad_x, pad_y = 22, 12
    lw = draw.textlength(label, font=font_meta)
    bx, by = 80, 80
    draw.rounded_rectangle([bx, by, bx + lw + 2 * pad_x, by + 28 + 2 * pad_y], radius=10, fill=BLUE)
    draw.text((bx + pad_x, by + pad_y - 2), label, font=font_meta, fill=WHITE)

    # Tytuł (max 4 linie)
    lines = wrap(draw, post["title"], font_title, 1010)
    if len(lines) > 4:
        lines = lines[:4]
        lines[-1] = lines[-1].rstrip(".,—-") + "…"
    y = 180
    for line in lines:
        draw.text((80, y), line, font=font_title, fill=WHITE)
        y += 76

    # Stopka: brand + domena
    draw.text((80, 540), "Marcin Szabunia", font=font_brand, fill=BLUE_LIGHT)
    bw = draw.textlength("Marcin Szabunia", font=font_brand)
    draw.text((80 + bw + 24, 544), "·  Fotografia i wideo B2B  ·  szabunia.pl",
              font=font_meta, fill=STEEL_LIGHT)
    return img


def main() -> None:
    with open(BLOG_TS, encoding="utf-8") as f:
        posts = parse_posts(f.read())
    if not posts:
        print("Nie sparsowano żadnych wpisów z blog.ts", file=sys.stderr)
        sys.exit(1)

    os.makedirs(OUT_DIR, exist_ok=True)
    font_title = pick_font(FONT_CANDIDATES_BOLD, 62)
    font_brand = pick_font(FONT_CANDIDATES_BOLD, 30)
    font_meta = pick_font(FONT_CANDIDATES_REGULAR, 26)

    for post in posts:
        out = os.path.join(OUT_DIR, f"{post['slug']}.png")
        render(post, font_title, font_meta, font_brand).save(out, "PNG", optimize=True)
        print(f"OK  {post['slug']}.png")
    print(f"\nWygenerowano {len(posts)} obrazków w public/images/og/blog/")


if __name__ == "__main__":
    main()
