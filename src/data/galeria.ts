export interface GalleryVideo {
  youtubeId: string;
  vertical: boolean;
  title: string;
}

export const galleryVideos: GalleryVideo[] = [
  // Dodane 04.08.2026. Film z Autopay/ICEA dla Woohoo jest dziś sztandarową
  // realizacją wideo (stoi na czterech podstronach usług), a w galerii nie było go
  // wcale. To jedyny materiał z ujęciami z drona wewnątrz obiektu.
  //
  // Tego samego dnia wypadł stąd drugi film dla Woohoo (`m42ywMWjthw`, marzec 2026).
  // To dwie RÓŻNE realizacje, sprawdzone po tytułach na YouTube, ale w siatce
  // galerii dwa filmy dla tego samego klienta czytały się jak jedno zdublowane
  // (zgłoszone przez Marcina). Film nie zniknął z serwisu: dalej stoi jako
  // przykładowa realizacja na podstronie obsługi eventów.
  { youtubeId: "4INLtKcKcZk", vertical: false, title: "E-commerce All-in dla Woohoo: film z wydarzenia, z ujęciami z drona" },
  { youtubeId: "hLO5iInREaI", vertical: false, title: "Film z produkcji dla Artech Group" },
  { youtubeId: "KLYMyMHf5aE", vertical: true, title: "Film zapowiadający event w Klubie 58" },
  { youtubeId: "xByfmDzNPMI", vertical: true, title: "Reels dla śniadaniowni Sunday" },
  { youtubeId: "fRoffxZ1tVM", vertical: true, title: "Reels dla Pizzerii Sicilia Marco Giuliano" },
  { youtubeId: "v5Klr4TeO5E", vertical: true, title: "1. urodziny Pizzerii Sicilia Marco Giuliano" },
  { youtubeId: "CmHUCptLu90", vertical: true, title: "Reklama kamerki samochodowej 70mai" },
  // Dodane 10.08.2026 (decyzja Marcina, pakiet 4). Film leżał dotąd wyłącznie
  // w case study `box17-budki-akustyczne`, które jest w DRAFT_SLUGS i zostaje
  // nieopublikowane. To NIE jest publikacja tamtego case study: trzy zdjęcia
  // Box17 stoją już w galerii produktowej (`produkt-07/08/09`), więc marka jest
  // na stronie od dawna. Film dokłada czwarty, niegastronomiczny i poziomy
  // przykład do paska wideo produktowego.
  { youtubeId: "vjpUby-NZsY", vertical: false, title: "Box17: film produktowy budki akustycznej" },
];
