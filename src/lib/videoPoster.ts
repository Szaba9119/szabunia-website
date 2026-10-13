// Plakaty filmów YouTube serwowane z własnego serwera (audyt 13.10.2026, SZA2610-06 i -10).
//
// Wcześniej przeglądarka pobierała je prosto z `i.ytimg.com`, czyli przy samym wejściu na
// stronę, przed jakąkolwiek zgodą, wysyłała IP odwiedzającego do Google. Na case Woohoo
// plakat z obcego hosta był też elementem LCP i to jego pobieranie (2,5 s pod dławieniem
// mobilnym) trzymało LCP na 3,2 s.
//
// ⛔ NOWY FILM = NOWY PLIK. Dodając `youtubeId`/`videoId` w `src/data/`, zapisz plakat jako
// `public/images/video-posters/<id>.webp`. Bez pliku kafel filmu będzie pusty. Pobranie:
//   curl -o public/images/video-posters/<id>.webp https://i.ytimg.com/vi_webp/<id>/maxresdefault.webp
// (gdy YouTube nie ma wersji maxres, weź `https://i.ytimg.com/vi/<id>/hqdefault.jpg` i przekonwertuj do WebP).
export function videoPosterSrc(youtubeId: string): string {
  return `/images/video-posters/${youtubeId}.webp`;
}

// Odtwarzacz z domeny bez cookies YouTube do chwili odtworzenia. Domena jest w CSP `frame-src`.
export function videoEmbedSrc(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&vq=hd1080`;
}
