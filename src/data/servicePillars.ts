// Potrzeby klienta i krótkie pytanie do briefu. Konkrety zaczerpnięte z services.tsx.
export const servicePillars = [
  { number: '01', label: 'Ludzie', slug: 'wizerunek-portrety', formCode: 'wizerunek', question: 'Ile osób planujesz sfotografować?', placeholder: 'np. 12 osób',
    responsibility: 'Ty podajesz listę osób. Miejsce i organizację sesji biorę na siebie.',
    details: 'Mogę przyjechać z mobilnym studiem do biura i rozstawić je w 30 minut, zanim przyjdzie pierwsza osoba. Jeśli firma chce innego klimatu, rezerwuję studio zewnętrzne dobrane do jej charakteru. Każdego prowadzę przez pozowanie, więc nikt nie musi umieć stać przed obiektywem. Wszyscy dostają to samo światło i ten sam retusz, a osoby nieobecne w dniu sesji fotografuję później, na krótszej osobnej sesji.' },
  { number: '02', label: 'Wydarzenia', slug: 'eventy-reportaze', formCode: 'event', question: 'Jak długo potrwa wydarzenie?', placeholder: 'np. konferencja od 9 do 17',
    responsibility: 'Ty prowadzisz wydarzenie. Ja pilnuję, żeby został z niego materiał.',
    details: 'Przed eventem omawiamy razem agendę: kluczowe momenty, prelegentów i osoby, których nie może zabraknąć na zdjęciach. Każde zdjęcie zapisuje się od razu na dwóch kartach, więc awaria jednej nie kasuje materiału. Przy dużym wydarzeniu, gdzie dwie rzeczy dzieją się naraz, biorę drugiego operatora, a Ty nadal masz jedną osobę do kontaktu.' },
  { number: '03', label: 'Obiekty', slug: 'nieruchomosci-przemysl', formCode: 'obiekty', question: 'Gdzie są obiekty i ile ich jest?', placeholder: 'np. dwie hale w Poznaniu',
    responsibility: 'Ty wskazujesz obiekt. Zgody na lot i plan dnia są po mojej stronie.',
    details: 'Strefę lotu sprawdzam przed potwierdzeniem daty, a w strefach kontrolowanych, np. w pobliżu lotniska, sam załatwiam zgodę na lot. W jeden wyjazd robię ujęcia z powietrza, z poziomu ziemi i wnętrza. Jeśli wiatr albo deszcz uniemożliwi lot, wracam raz w ramach ustalonej kwoty.' },
  { number: '04', label: 'Produkty', slug: 'fotografia-produktowa', formCode: 'produkt', question: 'Ile produktów i wariantów chcesz pokazać?', placeholder: 'np. 20 produktów, po 3 ujęcia',
    responsibility: 'Ty wysyłasz produkty. Ja oddaję pliki gotowe do sklepu.',
    details: 'Produkty do 20×20 cm możesz przysłać kurierem, do większych przyjeżdżam ze studiem mobilnym. Retusz jest w cenie: wycięcie z tła, białe tło zgodne z wymogami Allegro i Amazona oraz korekta kolorów. Zapisuję ustawienie światła i tła, więc kolejną partię dokładam w tej samej stylistyce, nawet pół roku później.' },
] as const;

export function getPillar(slug: string) {
  return servicePillars.find((pillar) => pillar.slug === slug);
}
