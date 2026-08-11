import Link from "next/link";
import type { ReactNode } from "react";

// Poboczny odsyłacz: przejście do sąsiedniej usługi, do case study albo do
// galerii, stojące OBOK mocniejszego elementu (przycisku paska albo głównego
// CTA kontaktowego). Świadomie NIE jest przyciskiem — na każdej podstronie
// usługi stoją już trzy elementy o wadze przycisku i czwarty rozmyłby hierarchię.
//
// Powód wydzielenia (audyt UI 11.08.2026, finding C5): ten sam ciąg klas żył
// w trzech plikach niezależnie (`uslugi/[slug]/page.tsx`, `ServiceGalleryStrip.tsx`,
// `portfolio/[slug]/page.tsx`), a czwarta kopia w `GalleryView.tsx` zdążyła się
// rozjechać: 14 px zamiast 13, podkreślenie zamiast ruchomej strzałki i brak
// samej strzałki. Komentarz w tamtym pliku mówił „te same klasy", choć nie były
// te same, bo nie było czego zaimportować.
//
// ⛔ NIE ROBIĆ Z TEGO PRZYCISKU i nie dokładać wariantu z tłem. Jeśli kiedyś
// któryś z tych odsyłaczy ma dostać wagę przycisku, to jest decyzja o hierarchii
// konwersji na danej podstronie, a nie o tym komponencie.
//
// Do linków WEWNĄTRZ zdania (np. „Zobacz pełne realizacje wideo: X i Y")
// ten komponent się nie nadaje — strzałka rozbija zdanie w środku wiersza.
// Tam zostaje zwykły `<Link>` z podkreśleniem na hover.
//
// ⚠ UKŁAD INLINE, NIE `inline-flex`. To nie jest drobiazg, tylko poprawka
// zmierzonej regresji z 11.08.2026. Wszystkie cztery kopie miały wcześniej
// `inline-flex items-center gap-1.5` plus `hover:gap-2.5`, i to działało
// dopóki etykieta mieściła się w jednej linii. Wystarczyło, że przestała:
// przy 360 px szerokości okna (Galaxy S8 i pochodne) najdłuższe etykiety
// nie mieszczą się w jednej linii, a wtedy widać, co `inline-flex` robi
// z łamanym tekstem. Strzałka jest osobnym elementem siatki, więc odjeżdża
// na prawą krawędź i zawisa w połowie wysokości dwuwierszowego bloku,
// a ostatni znak etykiety spada sam do drugiej linii.
//
// Teraz strzałka jest częścią tekstu, poprzedzona twardą spacją, więc trzyma
// się ostatniego słowa i łamie razem z nim. Ruch na hover robi `margin-left`
// zamiast rosnącego gapa, bo gapa już nie ma. Efekt wizualny ten sam.
//
// Zawijanie przy 360 px zostaje możliwe także przy 13 px: najdłuższy dziś
// odsyłacz („Poznaj usługę fotografii nieruchomości i obiektów", 330 px na
// `/portfolio/yes-butcher-przewodnik-michelin") ma do dyspozycji 328 px.
// Dlatego `text-center` jest w klasach bazowych, a nie tylko na wypadek.
// Wszystkie cztery miejsca użycia i tak centrują ten odsyłacz.
interface Props {
  href: string;
  children: ReactNode;
  /** Etykieta pomiaru GA4 (`cta_click` w ContactClickTracker). Przekazywana
      bez zmian z miejsca użycia — komponent nie nadaje jej sam, żeby nie
      tworzyć zdarzeń, których nikt nie zamawiał. */
  cta?: string;
  className?: string;
}

// ⛔ JEDEN WARIANT WIZUALNY, BEZ PROPA `size` (decyzja Marcina, 11.08.2026).
//
// Pierwsza wersja miała `sm` (13 px) i `md` (14 px), bo brief C4 prosił o 14 px
// w bloku „Przykładowe realizacje". Ten rozmiar był jednak uzasadniony wyłącznie
// zrównaniem z resztą odsyłaczy, a reszta zeszła w tym samym pakiecie na 13 px,
// więc argument sam się unieważnił. Dodatkowo 14 px wywoływało zawijanie
// najdłuższej etykiety przy 360 px, którego przy 13 px nie ma i które trzeba
// było obchodzić. Zostaje 13 px wszędzie.
//
// Cel dotykowy załatwia PADDING, nie rozmiar pisma: `py-3` daje 45 px wysokości
// przy jednej linii, czyli powyżej progu 44 px z WCAG 2.5.8, i robi to symetrycznie,
// więc tekst zostaje wyśrodkowany w pionie także wtedy, gdy etykieta się złamie.
// `min-h` wymuszałoby wysokość, ale przy jednej linii dosuwałoby tekst do góry.
//
// ⚠ Padding zmienia wysokość PUDEŁKA, nie odstęp OPTYCZNY. W każdym miejscu użycia
// margines nad odsyłaczem jest o 12 px mniejszy, dokładnie o górny padding, żeby
// widoczna odległość od elementu wyżej została taka jak przed tą zmianą. Jeśli
// kiedyś zmienisz `py-3`, popraw też te marginesy, inaczej rytm się rozjedzie.
export default function SecondaryLink({ href, children, cta, className = "" }: Props) {
  return (
    <Link
      href={href}
      data-cta={cta}
      className={`group inline-block text-center py-3 text-[13px] leading-relaxed font-barlow font-semibold text-blue dark:text-blue-light ${className}`}
    >
      {children}
      {/* ⚠ DWA WARUNKI, KTÓRE MUSZĄ BYĆ SPEŁNIONE RAZEM. Oba sprawdzone
          w przeglądarce przy 360 px, na najdłuższej etykiecie w serwisie.

          1. Spacja przed strzałką jest TWARDA (U+00A0), nie zwykła. Zwykła daje
             przeglądarce miejsce na złamanie wiersza i strzałka zostaje sama.
             Twarda tego zabrania (klasa GL w UAX #14).

          2. Ten `<span>` jest zwykłym elementem inline, NIE `inline-block`.
             `inline-block` jest pudełkiem atomowym, a przed pudełkiem atomowym
             przeglądarka wolno łamie wiersz niezależnie od tego, jaka spacja
             stoi w środku. Pierwsze podejście do tej poprawki miało `inline-block`
             i strzałka mimo twardej spacji i tak zjechała sama do drugiej linii.

          Dlatego ruch na hover robi `margin-left`, a nie `translate-x`:
          transformacje nie działają na elementach inline, marginesy poziome
          działają. Efekt ten sam co w poprzednim `hover:gap-2.5`. */}
      <span
        aria-hidden="true"
        className="transition-[margin-left] duration-200 group-hover:ml-1"
      >
        {"\u00A0→"}
      </span>
    </Link>
  );
}
