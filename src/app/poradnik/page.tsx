import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import AnimatedSection from "@/components/AnimatedSection";
import ErrorBoundary from "@/components/ErrorBoundary";
import PoradnikForm from "@/components/PoradnikForm";
import Breadcrumbs, { breadcrumbJsonLd, type Crumb } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Darmowy poradnik: sesja biznesowa | Szabunia",
  description:
    "Checklisty, planer stylizacji, ściąga kolorów i mini-brief. Wszystko, żeby wejść na plan spokojnie. Pobierz za darmo.",
  alternates: { canonical: "/poradnik" },
  openGraph: {
    title: "Darmowy poradnik: sesja biznesowa | Szabunia",
    description:
      "Checklisty, planer stylizacji, ściąga kolorów i mini-brief. Wszystko, żeby wejść na plan spokojnie. Pobierz za darmo.",
    url: "https://szabunia.pl/poradnik",
    images: [
      {
        url: "/images/og/strony/poradnik.jpg",
        width: 1200,
        height: 630,
        alt: "Poradnik przygotowania do sesji, Marcin Szabunia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darmowy poradnik: sesja biznesowa | Szabunia",
    description:
      "Checklisty, planer stylizacji, ściąga kolorów i mini-brief. Wszystko, żeby wejść na plan spokojnie. Pobierz za darmo.",
    images: ["/images/og/strony/poradnik.jpg"],
  },
};

const inside = [
  "Checklisty: 48 godzin przed i w dniu sesji",
  "Planer stylizacji na 2–3 zestawy",
  "Ściąga kolorów: co działa, czego unikać",
  "Jak wyglądać naturalnie przed obiektywem",
  "Mini-brief, który wyślesz mi w 2 minuty",
];

// Rozpiska sekcji PDF-a (8 stron treści na 4 stronach A4). Kolejność i nazwy
// odpowiadają zawartości `public/poradnik-przygotowanie-do-sesji.pdf`. Przy
// wymianie pliku zaktualizuj też ten opis, żeby strona nie obiecywała czegoś,
// czego w środku nie ma.
const sections: { title: string; desc: string }[] = [
  {
    title: "Jak wygląda sesja, cztery kroki",
    desc: "Od pierwszego kontaktu do gotowych zdjęć: rozmowa o celu i logistyce, sesja z prowadzeniem ujęcie po ujęciu, selekcja kadrów w galerii online, dostawa. Wiesz z góry, co się wydarzy i kiedy.",
  },
  {
    title: "Checklisty: 48 godzin przed i w dniu sesji",
    desc: "Dwie listy do odhaczania. Wcześniej: przymierzone stylizacje, wysłane inspiracje, sesja wpisana w luźniejszy dzień, sprawdzony dojazd. W dniu sesji: ubrania na wieszaku, zapasowa koszula, przetarte okulary, przyjazd 10 minut wcześniej.",
  },
  {
    title: "Planer stylizacji na 2–3 zestawy",
    desc: "Tabela do wypełnienia ręcznie: kanał i okazja, góra, dół, warstwa, buty, dodatki, notatka. Warstwy (marynarka, sweter, szalik) to najprostszy sposób, żeby z jednej sesji wyjść z kilkoma nastrojami zdjęć.",
  },
  {
    title: "Ściąga kolorów",
    desc: "Pewniaki: granat, grafit, szarość, butelkowa zieleń, burgund, biel pod warstwą. Ostrożnie: czysta czerń, jaskrawe neony, drobna kratka i wąskie paski (efekt mory), połysk i satyna, duże logo na całą klatkę.",
  },
  {
    title: "Formalność dobrana do branży",
    desc: "Osobne wskazówki dla kancelarii i finansów, techu i startupów, marketingu, produkcji i rzemiosła oraz medycyny i nauki. Zasada nadrzędna jest jedna: o jeden poziom wyżej niż na co dzień w pracy.",
  },
  {
    title: "Jak wyglądać naturalnie przed obiektywem",
    desc: "Drobiazgi, które robią różnicę: sylwetka lekko pod kątem, ramiona w dół, oddech przed ujęciem, rozluźniona szczęka, uśmiech na sekundę zamiast trzymanego na siłę. Nie musisz znać póz, od tego jestem ja.",
  },
  {
    title: "Po sesji, czego się spodziewać",
    desc: "Galeria online ze wszystkimi ujęciami i Twój wybór kadrów do retuszu. Terminy dostawy i tryb ekspresowy. Pliki w pełnej jakości plus wersja web oraz licencja komercyjna bez limitów czasowych.",
  },
  {
    title: "Mini-brief, który wyślesz mi w 2 minuty",
    desc: "Pięć punktów do skopiowania do maila: cel zdjęć, styl i nastrój z linkami, liczba osób, termin i miejsce, dodatkowe uwagi. Im więcej wiem, tym celniejsza wycena wraca do Ciebie.",
  },
];

const forWhom: string[] = [
  "Idziesz na pierwszą sesję wizerunkową i nie wiesz, czego się spodziewać.",
  "Jesteś w kadrze zarządzającej, doradzasz albo prowadzisz własną praktykę i potrzebujesz zdjęć na LinkedIn, stronę i do materiałów prasowych.",
  "Organizujesz sesję dla zespołu i chcesz wysłać ludziom jeden plik zamiast pisać instrukcje od zera.",
  "Nie lubisz się fotografować i wolisz wejść na plan z planem, a nie z nadzieją.",
];

export default function PoradnikPage() {
  const crumbs: Crumb[] = [{ name: "Strona główna", href: "/" }, { name: "Darmowy poradnik" }];

  const structuredData = [
    breadcrumbJsonLd(crumbs),
  ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <AnimatedSection>
            <p className="text-[12px] font-barlow font-semibold uppercase tracking-[0.16em] text-blue dark:text-blue-light text-center mb-3">
              Darmowy poradnik
            </p>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[44px] leading-tight tracking-tight text-navy dark:text-white mb-4 text-center">
              Pakiet przygotowania do sesji biznesowej
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-2xl mx-auto">
              Checklisty, planer stylizacji, ściąga kolorów i mini-brief: wszystko, żeby
              wyjść na zdjęciach pewnie i naturalnie, nawet jeśli zwykle nie lubisz się
              fotografować.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Cover preview */}
            <AnimatedSection>
              <div className="relative aspect-[210/297] max-w-[420px] mx-auto rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-border dark:ring-dark-border">
                <Image
                  src="/images/poradnik-cover.png"
                  alt="Podgląd pierwszej strony poradnika, Pakiet przygotowania do sesji biznesowej"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
              </div>
            </AnimatedSection>

            {/* What's inside + form */}
            <AnimatedSection delay={0.1}>
              <div>
                <h2 className="font-barlow font-bold text-xl md:text-2xl text-navy dark:text-white mb-5">
                  Co znajdziesz w środku
                </h2>
                <ul className="space-y-3 mb-8">
                  {inside.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-md bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-[14px] text-text-body dark:text-dark-text-muted leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <ErrorBoundary>
                  <PoradnikForm />
                </ErrorBoundary>

                <p className="text-[12px] text-steel dark:text-dark-text-muted/70 mt-4">
                  4 strony A4 · PDF · od Marcina Szabuni, fotografa biznesowego z Poznania.
                </p>

                <div className="mt-8 pt-6 border-t border-border dark:border-dark-border">
                  <p className="text-[14px] text-navy dark:text-white font-barlow font-semibold mb-3">
                    Wolisz od razu umówić sesję?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/uslugi/wizerunek-portrety" className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue text-white px-5 py-2.5 rounded-xl font-barlow font-bold text-[13px] btn-glow hover:scale-[1.02] transition-transform">
                      Zobacz ofertę portretów <span className="text-white/80">→</span>
                    </Link>
                    <Link href="/galeria" className="inline-flex items-center gap-2 border border-border dark:border-dark-border text-navy dark:text-white px-5 py-2.5 rounded-xl font-barlow font-semibold text-[13px] hover:border-blue dark:hover:border-blue transition-colors">
                      Zobacz portfolio
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="max-w-3xl mx-auto mt-20">
              <h2 className="font-barlow font-bold text-2xl md:text-[28px] text-navy dark:text-white mb-4">
                Co dokładnie dostajesz
              </h2>
              <p className="text-[15px] text-text-body dark:text-dark-text-muted leading-relaxed mb-8">
                Cztery strony A4 w PDF, bez wstępu o tym, jak ważny jest wizerunek. Same
                rzeczy do użycia: listy do odhaczenia, tabela do wypełnienia i gotowy
                szablon wiadomości. Przeczytasz to w kwadrans, a wrócisz do tego dzień
                przed sesją.
              </p>

              <ol className="space-y-6 mb-12">
                {sections.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-4">
                    <span className="mt-0.5 w-7 h-7 rounded-lg bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0 font-barlow font-bold text-[13px] text-blue dark:text-blue-light">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-barlow font-bold text-[16px] text-navy dark:text-white mb-1">
                        {s.title}
                      </h3>
                      <p className="text-[14.5px] text-text-body dark:text-dark-text-muted leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <h2 className="font-barlow font-bold text-2xl md:text-[28px] text-navy dark:text-white mb-4">
                Dla kogo to jest
              </h2>
              <p className="text-[15px] text-text-body dark:text-dark-text-muted leading-relaxed mb-5">
                Poradnik pisałem dla osób, które fotografują się z powodów zawodowych, nie
                dla przyjemności. Rozpoznasz się tu, jeśli:
              </p>
              <ul className="space-y-3 mb-12">
                {forWhom.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue dark:bg-blue-light flex-shrink-0" />
                    <span className="text-[14.5px] text-text-body dark:text-dark-text-muted leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <h2 className="font-barlow font-bold text-2xl md:text-[28px] text-navy dark:text-white mb-4">
                Czego w nim nie ma
              </h2>
              <p className="text-[15px] text-text-body dark:text-dark-text-muted leading-relaxed mb-5">
                Nie ma cennika ani tabeli pakietów. Każdą sesję wyceniam indywidualnie, bo
                cena zależy od liczby osób, miejsca i zakresu postprodukcji. Jeśli
                potrzebujesz kwoty, napisz w kilku zdaniach, czego potrzebujesz. Wstępną
                wycenę odsyłam w 24h.
              </p>
              <p className="text-[15px] text-text-body dark:text-dark-text-muted leading-relaxed">
                Nie ma też kursu fotografii. To materiał dla osoby po drugiej stronie
                obiektywu: co spakować, co założyć i jak się zachować, żeby zdjęcia
                wyglądały jak Ty w dobrym dniu. Resztą, czyli światłem, kadrem i
                prowadzeniem, zajmuję się ja. Więcej znajdziesz we wpisie{" "}
                <Link href="/blog/jak-przygotowac-sie-do-sesji-biznesowej" className="text-blue dark:text-blue-light font-semibold hover:underline underline-offset-2">
                  jak przygotować się do sesji biznesowej
                </Link>{" "}
                oraz w przewodniku po tym,{" "}
                <Link href="/blog/co-zalozyc-na-sesje-biznesowa" className="text-blue dark:text-blue-light font-semibold hover:underline underline-offset-2">
                  co założyć na sesję biznesową
                </Link>
                .
              </p>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
      <MobileFAB />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
