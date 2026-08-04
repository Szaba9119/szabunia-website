export interface GalleryVideo {
  youtubeId: string;
  vertical: boolean;
  title: string;
}

export const galleryVideos: GalleryVideo[] = [
  // Dodane 04.08.2026. Film z Autopay/ICEA dla Woohoo jest dziś sztandarową
  // realizacją wideo (stoi na czterech podstronach usług), a w galerii nie było go
  // wcale. To jedyny materiał z ujęciami z drona wewnątrz obiektu.
  { youtubeId: "4INLtKcKcZk", vertical: false, title: "E-commerce All-in dla Woohoo: film z wydarzenia, z ujęciami z drona" },
  { youtubeId: "m42ywMWjthw", vertical: false, title: "Film eventowy dla Woohoo" },
  { youtubeId: "hLO5iInREaI", vertical: false, title: "Film z produkcji dla Artech Group" },
  { youtubeId: "KLYMyMHf5aE", vertical: true, title: "Film zapowiadający event w Klubie 58" },
  { youtubeId: "xByfmDzNPMI", vertical: true, title: "Reels dla śniadaniowni Sunday" },
  { youtubeId: "fRoffxZ1tVM", vertical: true, title: "Reels dla Pizzerii Sicilia Marco Giuliano" },
  { youtubeId: "v5Klr4TeO5E", vertical: true, title: "1. urodziny Pizzerii Sicilia Marco Giuliano" },
  { youtubeId: "CmHUCptLu90", vertical: true, title: "Reklama kamerki samochodowej 70mai" },
];
