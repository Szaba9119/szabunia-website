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
  // Film Box17 (`vjpUby-NZsY`) WYCOFANY 10.08.2026, decyzją Marcina, tego samego dnia,
  // którego został dodany. Wchodził tu po to, żeby zasilić pasek wideo produktowego
  // (`ServiceGalleryStrip.CURATED_VIDEOS["wideo-produktowe"]`), a że wypadł i stamtąd,
  // zostawienie go tutaj oznaczałoby film widoczny w zakładce wideo na `/galeria`
  // bez żadnego innego miejsca w serwisie.
  //
  // Nadal istnieje w `portfolio.ts` wewnątrz case study `box17-budki-akustyczne`,
  // ale to case jest w `DRAFT_SLUGS` i pozostaje nieopublikowane, więc nikt go nie zobaczy.
  // ⚠ POPRAWIONE 20.08.2026. Zapis mówił „trzy ZDJĘCIA Box17 zostają w galerii produktowej
  // (`produkt-07/08/09`)". Dwa z tych kadrów wyjechały tego dnia do `_to_delete/`
  // (`produkt-07-box17-budka-pojedyncza` i `produkt-08-box17-budka-dwuosobowa`),
  // a jedyny pozostały nazywa się po przenumerowaniu `produkt-12-box17-budka-duza`.
  // Uwaga przy czytaniu: same numery 07 i 08 nadal w folderze SĄ, noszą je dziś zupełnie
  // inne zdjęcia. To dokładnie ten powód, dla którego nazwa pliku musi zawierać opis.
  // Sprawdzone przez wylistowanie
  // `public/images/galeria/produktowe/`. Stan faktyczny: JEDEN kadr Box17 w galerii
  // produktowej, dziesięć kolejnych w `public/images/portfolio/box17/` (case nieopublikowany).
];
