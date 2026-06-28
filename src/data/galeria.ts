export interface GalleryVideo {
  youtubeId: string;
  vertical: boolean;
  title: string;
}

export const galleryVideos: GalleryVideo[] = [
  { youtubeId: "m42ywMWjthw", vertical: false, title: "Film eventowy dla Woohoo" },
  { youtubeId: "hLO5iInREaI", vertical: false, title: "Film z produkcji dla Artech Group" },
  { youtubeId: "KLYMyMHf5aE", vertical: true, title: "Film zapowiadający event w Klubie 58" },
  { youtubeId: "xByfmDzNPMI", vertical: true, title: "Reels dla śniadaniowni Sunday" },
  { youtubeId: "fRoffxZ1tVM", vertical: true, title: "Reels dla Pizzerii Sicilia Marco Giuliano" },
  { youtubeId: "v5Klr4TeO5E", vertical: true, title: "1. urodziny Pizzerii Sicilia Marco Giuliano" },
  { youtubeId: "CmHUCptLu90", vertical: true, title: "Reklama kamerki samochodowej 70mai" },
];
