#!/usr/bin/env python3
"""
Generator obrazków OG (1200x630) dla stron statycznych: strona główna, huby
i strony informacyjne.

Powód (audyt PELNY2907-10): osiem stron deklarowało w metadanych `og:image`
1200x630, wskazując na `public/images/marcin-hero.jpg`, który jest pionowym
portretem 1024x1536. LinkedIn i Facebook renderują kartę 1.91:1, więc portret
był przycinany przez środek, a zadeklarowane wymiary były po prostu nieprawdziwe.
Podstrony usług i wpisy blogowe miały to zrobione poprawnie od dawna.

Layout: lewa kolumna to brandowa karta (gradient navy, niebieski pasek, tytuł
strony, stopka), prawa to kadr portretu. Spójny z generate-og-uslugi.py,
ale ze zdjęciem, bo to są strony najczęściej udostępniane.

Użycie:  python3 scripts/generate-og-strony.py
Wymaga:  Pillow + font bold z polskimi znakami.
"""

import os
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTO = os.path.join(ROOT, "public", "images", "marcin-hero.jpg")
OUT_DIR = os.path.join(ROOT, "public", "images", "og", "strony")

NAVY = (15, 23, 42)
NAVY_LIGHT = (30, 41, 59)
BLUE = (37, 99, 235)
BLUE_LIGHT = (59, 130, 246)
STEEL_LIGHT = (148, 163, 184)
WHITE = (255, 255, 255)

W, H = 1200, 630
PHOTO_W = 430  # szerokość prawej kolumny ze zdjęciem

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

# klucz pliku -> (etykieta badge, tytuł na karcie)
PAGES = {
    "home": ("FOTOGRAF BIZNESOWY", "Fotografia i wideo\ndla firm"),
    "uslugi": ("USŁUGI", "Pełna oferta\ndla firm"),
    "portfolio": ("PORTFOLIO", "Wybrane\nrealizacje"),
    "galeria": ("GALERIA", "Kadry\nz realizacji"),
    "blog": ("BLOG", "O fotografii\nbiznesowej"),
    "poradnik": ("PORADNIK", "Przygotowanie\ndo sesji"),
    "kontakt": ("KONTAKT", "Porozmawiajmy\no Twoim projekcie"),
    "polityka-prywatnosci": ("INFORMACJE", "Polityka\nprywatności"),
}


def pick_font(candidates: list[str], size: int) -> ImageFont.FreeTypeFont:
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    print("Nie znaleziono fontu — uzupełnij FONT_CANDIDATES.", file=sys.stderr)
    sys.exit(1)


def photo_panel() -> Image.Image:
    """Kadr portretu dopasowany do prawej kolumny, z miękkim przejściem w navy."""
    src = Image.open(PHOTO).convert("RGB")
    scale = max(PHOTO_W / src.width, H / src.height)
    new = src.resize((round(src.width * scale), round(src.height * scale)), Image.LANCZOS)
    # kadrujemy do góry, żeby nie ucinać twarzy
    left = (new.width - PHOTO_W) // 2
    top = min(max(0, round(new.height * 0.04)), max(0, new.height - H))
    panel = new.crop((left, top, left + PHOTO_W, top + H))

    # gradient po lewej krawędzi zdjęcia, żeby wtopić je w kartę
    fade = Image.new("L", (PHOTO_W, H), 255)
    fd = ImageDraw.Draw(fade)
    fade_w = 150
    for x in range(fade_w):
        fd.line([(x, 0), (x, H)], fill=int(255 * (x / fade_w)))
    bg = Image.new("RGB", (PHOTO_W, H), NAVY)
    return Image.composite(panel, bg, fade)


def render(badge: str, title: str, fonts: dict) -> Image.Image:
    img = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(img)

    for y in range(H):
        t = y / H
        r = int(NAVY[0] + (NAVY_LIGHT[0] - NAVY[0]) * t * 0.6)
        g = int(NAVY[1] + (NAVY_LIGHT[1] - NAVY[1]) * t * 0.6)
        b = int(NAVY[2] + (NAVY_LIGHT[2] - NAVY[2]) * t * 0.6)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    img.paste(photo_panel(), (W - PHOTO_W, 0))
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, 14, H], fill=BLUE)

    pad_x, pad_y = 22, 12
    lw = draw.textlength(badge, font=fonts["meta"])
    bx, by = 80, 108
    draw.rounded_rectangle([bx, by, bx + lw + 2 * pad_x, by + 28 + 2 * pad_y], radius=10, fill=BLUE)
    draw.text((bx + pad_x, by + pad_y - 4), badge, font=fonts["meta"], fill=WHITE)

    draw.multiline_text((80, 218), title, font=fonts["title"], fill=WHITE, spacing=14)

    draw.text((80, 528), "Marcin Szabunia", font=fonts["brand"], fill=BLUE_LIGHT)
    bw = draw.textlength("Marcin Szabunia", font=fonts["brand"])
    draw.text((80 + bw + 22, 533), "·  Poznań  ·  szabunia.pl", font=fonts["meta"], fill=STEEL_LIGHT)
    return img


def main() -> None:
    if not os.path.exists(PHOTO):
        print(f"Brak zdjęcia źródłowego: {PHOTO}", file=sys.stderr)
        sys.exit(1)
    os.makedirs(OUT_DIR, exist_ok=True)
    fonts = {
        "title": pick_font(FONT_CANDIDATES_BOLD, 62),
        "brand": pick_font(FONT_CANDIDATES_BOLD, 28),
        "meta": pick_font(FONT_CANDIDATES_REGULAR, 24),
    }
    for key, (badge, title) in PAGES.items():
        out = os.path.join(OUT_DIR, f"{key}.jpg")
        render(badge, title, fonts).save(out, "JPEG", quality=88, optimize=True, progressive=True)
        print(f"OK  {key}.jpg  ({os.path.getsize(out) // 1024} KB)")
    print(f"\nWygenerowano {len(PAGES)} obrazków 1200x630 w public/images/og/strony/")


if __name__ == "__main__":
    main()
