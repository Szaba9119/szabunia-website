export interface GalleryVideo {
  youtubeId: string;
  vertical: boolean;
  title: string;
}

export const galleryVideos: GalleryVideo[] = [
  { youtubeId: "m42ywMWjthw", vertical: false, title: "Realizacja wideo" },
  { youtubeId: "hLO5iInREaI", vertical: false, title: "Realizacja wideo" },
  { youtubeId: "xByfmDzNPMI", vertical: true, title: "Reels (wideo pionowe)" },
  { youtubeId: "fRoffxZ1tVM", vertical: true, title: "Reels (wideo pionowe)" },
];
