#!/usr/bin/env python3
"""
Generator obrazków OG (1200x630) dla case studies portfolio (/portfolio/{slug}).

Powód (audyt 2026-07-30): strony case studies deklarowały w metadanych og:image
1200x630, a wskazywały wprost na `category.thumbnail`, czyli na zdjęcie z galerii.
Realne wymiary: woohoo 1280x720, artech 2000x2000 (kwadrat), idcom 1365x2048 (pion),
yes-butcher 1333x2000 (pion). Dwa z czterech to portrety, a karta LinkedIn i Facebook
ma proporcje 1.91:1, więc były przycinane przez środek albo pomijane. Zadeklarowane
wymiary były przy tym po prostu nieprawdziwe.

To ten sam błąd, który PELNY2907-10 naprawił dla ośmiu stron statycznych
(generate-og-strony.py). Case studies wtedy pominięto, a to właśnie one idą
na LinkedIn do klientów korporacyjnych.

Layout spójny z generate-og-strony.py: lewa kolumna to brandowa karta z badge
„CASE STUDY” i nazwą realizacji, prawa to kadr ze zdjęcia tej realizacji,
przeskalowany i wykadrowany do kolumny, więc pion przestaje być problemem.

Użycie:  python3 scripts/generate-og-portfolio.py
Wymaga:  Pillow + font bold z polskimi znakami.
"""

import os
import re
import sys
import textwrap

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORTFOLIO_TS = os.path.join(ROOT, "src", "data", "portfolio.ts")
OUT_DIR = os.path.join(ROOT, "public", "images", "og", "portfolio")

NAVY = (15, 23, 42)
NAVY_LIGHT = (30, 41, 59)
BLUE = (37, 99, 235)
BLUE_LIGHT = (59, 130, 246)
STEEL_LIGHT = (148, 163, 184)
WHITE = (255, 255, 255)

W, H = 1200, 630
PHOTO_W = 430

FONT_CANDIDATES_BOLD = [
    "/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/lato/Lato-Black.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
]
FONT_CANDIDATES_REGULAR = [
    "/usr/share/fonts/truetype/google-fonts/Poppins-Regular.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/lato/Lato-Regular.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
]


def pick_font(candidates: list[str], size: int) -> ImageFont.FreeTypeFont:
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    print("Nie znaleziono fontu — uzupełnij FONT_CANDIDATES.", file=sys.stderr)
    sys.exit(1)


def parse_portfolio(src: str) -> list[dict]:
    """Slug, label i thumbnail każdego case study. Wpisy z DRAFT_SLUGS zostają:
    są dziś noindex, ale po odmrożeniu też potrzebują karty."""
    items = []
    for m in re.finditer(
        r'\n    slug: "([^"]+)"[\s\S]{0,3000}?label: "((?:[^"\\]|\\.)*)"'
        r'[\s\S]{0,3000}?thumbnail: "([^"]+)"',
        src,
    ):
        items.append({"slug": m.group(1), "label": m.group(2).replace('\\"', '"'),
                      "thumbnail": m.group(3)})
    return items


def photo_panel(rel_path: str) -> Image.Image:
    """Skaluje i kadruje zdjęcie realizacji do prawej kolumny, z wtopieniem
    lewej krawędzi w tło karty. Kadr od góry: na portretach twarze i najważniejszy
    kadr są zwykle w górnej części."""
    src_path = os.path.join(ROOT, "public", rel_path.lstrip("/"))
    if not os.path.exists(src_path):
        return Image.new("RGB", (PHOTO_W, H), NAVY)
    src = Image.open(src_path).convert("RGB")
    scale = max(PHOTO_W / src.width, H / src.height)
    new = src.resize((round(src.width * scale), round(src.height * scale)), Image.LANCZOS)
    left = (new.width - PHOTO_W) // 2
    top = min(max(0, round(new.height * 0.08)), max(0, new.height - H))
    panel = new.crop((left, top, left + PHOTO_W, top + H))

    fade = Image.new("L", (PHOTO_W, H), 255)
    fd = ImageDraw.Draw(fade)
    fade_w = 150
    for x in range(fade_w):
        fd.line([(x, 0), (x, H)], fill=int(255 * (x / fade_w)))
    bg = Image.new("RGB", (PHOTO_W, H), NAVY)
    return Image.composite(panel, bg, fade)


def render(item: dict, fonts: dict) -> Image.Image:
    img = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        r = int(NAVY[0] + (NAVY_LIGHT[0] - NAVY[0]) * t * 0.6)
        g = int(NAVY[1] + (NAVY_LIGHT[1] - NAVY[1]) * t * 0.6)
        b = int(NAVY[2] + (NAVY_LIGHT[2] - NAVY[2]) * t * 0.6)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    img.paste(photo_panel(item["thumbnail"]), (W - PHOTO_W, 0))
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, 14, H], fill=BLUE)

    badge = "CASE STUDY"
    pad_x, pad_y = 22, 12
    lw = draw.textlength(badge, font=fonts["meta"])
    bx, by = 80, 108
    draw.rounded_rectangle([bx, by, bx + lw + 2 * pad_x, by + 28 + 2 * pad_y],
                           radius=10, fill=BLUE)
    draw.text((bx + pad_x, by + pad_y - 4), badge, font=fonts["meta"], fill=WHITE)

    # Rozmiar dobierany do długości nazwy: przy krótkich label duża typografia,
    # przy długich mniejsza, żeby nic się nie ucięło. Karta Yes Butcher przy stałych
    # 62 px i trzech linijkach traciła słowo „Michelin”, czyli najmocniejszy dowód
    # w całym portfolio (audyt 2026-07-30).
    # Znaki dekoracyjne (★, ✓, emoji) nie mają glifów w fontach z FONT_CANDIDATES
    # i renderują się jako pusty prostokąt. Wycinamy je razem z osieroconą spacją.
    label = re.sub(r"\s*[\u2000-\u3300\U0001F000-\U0001FAFF]+", "", item["label"]).strip()
    if len(label) <= 30:
        font_t, wrap_w, y0 = fonts["title"], 17, 218
    elif len(label) <= 40:
        font_t, wrap_w, y0 = fonts["title_md"], 21, 214
    else:
        font_t, wrap_w, y0 = fonts["title_sm"], 25, 206
    title = "\n".join(textwrap.wrap(label, width=wrap_w)[:4])
    draw.multiline_text((80, y0), title, font=font_t, fill=WHITE, spacing=12)

    draw.text((80, 528), "Marcin Szabunia", font=fonts["brand"], fill=BLUE_LIGHT)
    bw = draw.textlength("Marcin Szabunia", font=fonts["brand"])
    draw.text((80 + bw + 22, 533), "·  Poznań  ·  szabunia.pl",
              font=fonts["meta"], fill=STEEL_LIGHT)
    return img


def main() -> None:
    with open(PORTFOLIO_TS, encoding="utf-8") as f:
        items = parse_portfolio(f.read())
    if not items:
        print("Nie sparsowano żadnych case studies z portfolio.ts", file=sys.stderr)
        sys.exit(1)

    os.makedirs(OUT_DIR, exist_ok=True)
    fonts = {
        "title": pick_font(FONT_CANDIDATES_BOLD, 62),
        "title_md": pick_font(FONT_CANDIDATES_BOLD, 52),
        "title_sm": pick_font(FONT_CANDIDATES_BOLD, 44),
        "brand": pick_font(FONT_CANDIDATES_BOLD, 28),
        "meta": pick_font(FONT_CANDIDATES_REGULAR, 24),
    }
    for it in items:
        out = os.path.join(OUT_DIR, f"{it['slug']}.png")
        render(it, fonts).save(out, "PNG", optimize=True)
        print(f"OK  {it['slug']}.png  ({it['label']})")
    print(f"\nWygenerowano {len(items)} obrazków w public/images/og/portfolio/")


if __name__ == "__main__":
    main()
