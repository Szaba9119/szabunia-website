// Potrzeby klienta i krótkie pytanie do briefu. Konkrety zaczerpnięte z services.tsx.
export const servicePillars = [
  { number: '01', label: 'Ludzie', slug: 'wizerunek-portrety', formCode: 'wizerunek', question: 'Ile osób planujesz sfotografować?', placeholder: 'np. 12 osób',
    responsibility: 'Ty podajesz listę osób i salę. Resztę organizuję ja.',
    details: 'Przywożę studio do biura i rozstawiam je w 30 minut, zanim przyjdzie pierwsza osoba. Każdego prowadzę przez pozowanie, więc nikt nie musi umieć stać przed obiektywem. Wszyscy dostają to samo światło i ten sam retusz, a osoby nieobecne w dniu sesji dogrywam w krótszym terminie.' },
  { number: '02', label: 'Wydarzenia', slug: 'eventy-reportaze', formCode: 'event', question: 'Jak długo potrwa wydarzenie?', placeholder: 'np. konferencja od 9 do 17',
    responsibility: 'Ty prowadzisz wydarzenie. Ja pilnuję, żeby został z niego materiał.',
    details: 'Przed eventem przechodzimy razem agendę: kluczowe momenty, prelegentów i osoby, których nie może zabraknąć na zdjęciach. Pracuję na dwóch aparatach z zapisem na dwie karty. Przy dużym wydarzeniu, gdzie dwie rzeczy dzieją się naraz, biorę drugiego operatora, a Ty nadal masz jedną osobę do kontaktu.' },
  { number: '03', label: 'Obiekty', slug: 'nieruchomosci-przemysl', formCode: 'obiekty', question: 'Gdzie są obiekty i ile ich jest?', placeholder: 'np. dwie hale w Poznaniu',
    responsibility: 'Ty wskazujesz obiekt. Zgody na lot i plan dnia są po mojej stronie.',
    details: 'Strefę lotu sprawdzam przed potwierdzeniem daty, a w strefach kontrolowanych sam koordynuję zgodę. W jeden wyjazd robię ujęcia z powietrza, z poziomu ziemi i wnętrza. Jeśli wiatr albo deszcz uniemożliwi lot, wracam raz w ramach ustalonej kwoty.' },
  { number: '04', label: 'Produkty', slug: 'fotografia-produktowa', formCode: 'produkt', question: 'Ile produktów i wariantów chcesz pokazać?', placeholder: 'np. 20 produktów, po 3 ujęcia',
    responsibility: 'Ty wysyłasz produkty. Ja oddaję pliki gotowe do sklepu.',
    details: 'Produkty do 20×20 cm możesz przysłać kurierem, do większych przyjeżdżam ze studiem mobilnym. Retusz jest w cenie: wycięcie z tła, białe tło zgodne z wymogami Allegro i Amazon oraz korekta kolorów. Setup jest powtarzalny, więc kolejną partię dokładam w tej samej stylistyce, nawet pół roku później.' },
] as const;

export function getPillar(slug: string) {
  return servicePillars.find((pillar) => pillar.slug === slug);
}
