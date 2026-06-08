import fs from "fs";
import path from "path";

export type GalleryCategoryKey = "portrety" | "eventy" | "produktowe" | "wideo";

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
