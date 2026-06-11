export interface GalleryVideo {
  youtubeId: string;
  vertical: boolean;
  title: string;
}

export const galleryVideos: GalleryVideo[] = [
  { youtubeId: "m42ywMWjthw", vertical: false, title: "Film eventowy dla Woohoo" },
  { youtubeId: "hLO5iInREaI", vertical: false, title: "Film z produkcji dla Artech Group" },
  { youtubeId: "xByfmDzNPMI", vertical: true, title: "Reels (realizacja pionowa)" },
  { youtubeId: "fRoffxZ1tVM", vertical: true, title: "Reels dla Pizzerii Sicilia" },
];
