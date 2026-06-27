import fs from "fs";
import path from "path";

export type GalleryCategoryKey = "portrety" | "eventy" | "produktowe" | "wideo" | "dron";

/**
 * Listuje zdjęcia z public/images/galeria/<folder> w kolejności alfabetycznej nazw plików.
 * Pliki są nazwane wg docelowej kolejności (portret-01, portret-02, …), więc sort = kolejność wyświetlania.
 * Tylko serwer (fs) — nie importować w komponentach klienckich.
 */
export function listGalleryImages(folder: string): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "images", "galeria", folder);
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => `/images/galeria/${folder}/${f}`);
  } catch {
    return [];
  }
}

export interface SizedImage {
  src: string;
  width: number;
  height: number;
}

/** Odczyt wymiarów obrazu z nagłówka pliku — bez zależności (JPEG/PNG). */
function readImageSize(buf: Buffer): { width: number; height: number } | null {
  // JPEG
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let o = 2;
    while (o + 9 < buf.length) {
      if (buf[o] !== 0xff) {
        o++;
        continue;
      }
      const marker = buf[o + 1];
      if (
        (marker >= 0xc0 && marker <= 0xc3) ||
        (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) ||
        (marker >= 0xcd && marker <= 0xcf)
      ) {
        return { height: buf.readUInt16BE(o + 5), width: buf.readUInt16BE(o + 7) };
      }
      o += 2 + buf.readUInt16BE(o + 2);
    }
    return null;
  }
  // PNG
  if (buf.length > 24 && buf.toString("ascii", 12, 16) === "IHDR") {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  return null;
}

/**
 * Jak listGalleryImages, ale z wymiarami (do next/image — optymalizacja AVIF/WebP, brak CLS).
 * Tylko serwer (fs) — nie importować w komponentach klienckich.
 */
export function listGalleryImagesSized(folder: string): SizedImage[] {
  try {
    const dir = path.join(process.cwd(), "public", "images", "galeria", folder);
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => {
        const size = readImageSize(fs.readFileSync(path.join(dir, f)));
        return {
          src: `/images/galeria/${folder}/${f}`,
          width: size?.width ?? 1200,
          height: size?.height ?? 1500,
        };
      });
  } catch {
    return [];
  }
}
