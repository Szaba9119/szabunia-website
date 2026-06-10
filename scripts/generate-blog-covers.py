#!/usr/bin/env python3
"""
Okładki bloga 16:9 (1600x900) z realnych zdjęć galerii/portfolio.

Mapowanie slug → zdjęcie źródłowe + punkt skupienia kadru (focus_y, 0=góra,
0.5=środek). Dla pionowych portretów focus przesunięty w górę, żeby twarz
zostawała w kadrze. Wynik: public/images/blog/{slug}.jpg

Użycie: python3 scripts/generate-blog-covers.py
"""

import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public", "images")
OUT = os.path.join(ROOT, "public", "images", "blog")

W, H = 1600, 900

# slug: (ścieżka względem public/images, focus_y)
COVERS = {
    "jak-przygotowac-sie-do-sesji-biznesowej": ("galeria/portrety/portret-02.jpg", 0.26),
    "headshoty-linkedin-konwersja": ("galeria/portrety/portret-09.jpg", 0.24),
    "fotografia-eventowa-vs-reportaz": ("galeria/eventy/event-04.jpg", 0.45),
    "fotografia-produktowa-ecommerce": ("galeria/produktowe/produkt-11.jpg", 0.42),
    "fotografia-przemyslowa-fabryka": ("galeria/produktowe/produkt-21.jpg", 0.50),
    "ile-kosztuje-sesja-wizerunkowa-dla-firmy": ("galeria/portrety/portret-05.jpg", 0.26),
    "co-zalozyc-na-sesje-biznesowa": ("galeria/portrety/portret-06.jpg", 0.24),
    "bledy-zdjecia-zespolu": ("galeria/eventy/event-02.jpg", 0.45),
    "sesja-wizerunkowa-poznan": ("galeria/portrety/portret-14.jpg", 0.32),
    "wideo-marketing-dla-firm-formaty": ("galeria/eventy/event-17.jpg", 0.45),
    "zdjecie-do-cv-w-domu": ("galeria/portrety/portret-10.jpg", 0.24),
    "zdjecia-ai-vs-profesjonalna-sesja": ("galeria/portrety/portret-03.jpg", 0.28),
    "zdjecia-na-strone-firmowa": ("galeria/portrety/portret-13.jpg", 0.30),
}


def crop_cover(src_path: str, focus_y: float) -> Image.Image:
    im = Image.open(src_path).convert("RGB")
    w, h = im.size
    target = W / H
    if w / h > target:  # za szerokie — tnij boki
        new_w = int(h * target)
        x = (w - new_w) // 2
        box = (x, 0, x + new_w, h)
    else:  # za wysokie — tnij górę/dół wokół focus_y
        new_h = int(w / target)
        cy = int(h * focus_y)
        y = max(0, min(h - new_h, cy - new_h // 2))
        box = (0, y, w, y + new_h)
    return im.crop(box).resize((W, H), Image.LANCZOS)


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    for slug, (rel, focus) in COVERS.items():
        src = os.path.join(SRC, rel)
        out = os.path.join(OUT, f"{slug}-2.jpg")
        crop_cover(src, focus).save(out, "JPEG", quality=82, optimize=True, progressive=True)
        print(f"OK  {slug}.jpg  <- {rel}")
    print(f"\n{len(COVERS)} okładek w public/images/blog/")


if __name__ == "__main__":
    main()
