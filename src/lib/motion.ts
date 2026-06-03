// Centralne tokeny systemu ruchu — jedno źródło prawdy dla parallaxu i wjazdów.
// Zmiana wartości tutaj retunuje całą stronę. Lustrzane odbicie w DESIGN.md §6.

// Spring-like easing używany w całym serwisie (wjazdy + parallax).
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Czasy wjazdów (sekundy).
export const DURATION = {
  fast: 0.3, // przejścia stron
  base: 0.5, // wjazdy sekcji (AnimatedSection)
  slow: 0.7, // wjazd Hero
} as const;

// Dystanse parallaxu w px (peak-to-peak = 2x). Subtelne z założenia —
// głębia, którą się czuje, ale nie zauważa.
export const PARALLAX = {
  accent: 24, // nagłówki / numery sekcji (najlżejszy ruch)
  subtle: 40, // media nad foldem, drift całych kart
  base: 64, // główne zdjęcia / media w ramkach
  strong: 88, // duże, rozmyte warstwy tła
} as const;

// Poniżej tej szerokości parallax jest wyciszony (wjazdy grają dalej).
// Na mobile parallax „kręci w głowie" i bywa zacięty — stąd mute.
export const PARALLAX_MIN_WIDTH = 768;
