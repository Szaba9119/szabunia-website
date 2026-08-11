import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedSection from "@/components/AnimatedSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import Breadcrumbs, { breadcrumbJsonLd, type Crumb } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kontakt i wycena, fotograf Poznań | Szabunia",
  description:
    "Napisz, czego potrzebujesz. Odpowiadam w 24 godziny wstępną wyceną i wolnym terminem. Poznań, cała Polska i Europa.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt i wycena, fotograf Poznań | Szabunia",
    description:
      "Napisz, czego potrzebujesz. Odpowiadam w 24 godziny wstępną wyceną i wolnym terminem. Poznań, cała Polska i Europa.",
    url: "https://szabunia.pl/kontakt",
    images: [
      {
        url: "/images/og/strony/kontakt.jpg",
        width: 1200,
        height: 630,
        alt: "Kontakt, Marcin Szabunia, fotograf biznesowy Poznań",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt i wycena, fotograf Poznań | Szabunia",
    description:
      "Napisz, czego potrzebujesz. Odpowiadam w 24 godziny wstępną wyceną i wolnym terminem. Poznań, cała Polska i Europa.",
    images: ["/images/og/strony/kontakt.jpg"],
  },
};

const contactCards = [
  {
    title: "Wstępna wycena w 24h",
    body: "Na każde zapytanie biznesowe odpowiadam w ciągu 24h, ze wstępną wyceną i propozycją terminu.",
  },
  {
    title: "Poznań, cała Polska i Europa",
    body: "Bazuję w Poznaniu, realizuję projekty w całym kraju i za granicą. Dojazd ustalamy w wycenie.",
  },
  {
    title: "Opisz, czego potrzebujesz",
    body: "Napisz, czego potrzebujesz: cel zdjęć lub wideo, orientacyjny termin, lokalizację i zakres. Resztę dopniemy razem.",
  },
];

export default function KontaktPage() {
  const crumbs: Crumb[] = [{ name: "Strona główna", href: "/" }, { name: "Kontakt" }];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Kontakt — Marcin Szabunia",
      url: "https://szabunia.pl/kontakt",
      description:
        // Przepisane 10.08.2026: lista pięciu starych usług zeszła do czterech
      // filarów, tych samych co w liście rozwijanej formularza pod spodem.
      "Kontakt w sprawie fotografii i wideo dla firm: wydarzenia firmowe, wizerunek firmy, nieruchomości i przemysł oraz fotografia produktowa.",
      mainEntity: { "@id": "https://szabunia.pl/#business" },
    },
    breadcrumbJsonLd(crumbs),
  ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={crumbs} className="mb-6" />
          {/* Header */}
          <AnimatedSection>
            <p className="text-[11px] uppercase tracking-widest text-steel dark:text-dark-text-muted mb-3 font-barlow font-semibold text-center">
              Kontakt
            </p>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Porozmawiajmy o Twoim projekcie
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-8 max-w-2xl mx-auto leading-relaxed">
              {/* Przepisane 10.08.2026. Poprzednia wersja wymieniała PIĘĆ starych
                  usług („portrety biznesowe, sesje zespołowe, reportaże z eventów,
                  fotografia produktowa i wideo marketing") dokładnie NAD polem
                  wyboru usługi, które ma cztery filary. Klient czytał pięć nazw
                  i wybierał z czterech innych. Ta lista musi zostać zgodna
                  z listą rozwijaną w CTA.tsx — zmiana jednej wymaga drugiej. */}
              Fotografia i wideo dla firm: wydarzenia firmowe, wizerunek firmy,
              nieruchomości i przemysł oraz fotografia produktowa. Napisz
              w kilku zdaniach, czego potrzebujesz, a odezwę się w ciągu 24 godzin
              ze wstępną wyceną i terminem.
            </p>

            {/* Quick actions — telefon jako primary: GA4 pokazuje, że klienci
                częściej dzwonią (phone_click) niż zaczynają formularz. */}
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              <a
                href="tel:+48514900688"
                data-cta="tel_kontakt_hero"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue text-white px-5 py-2.5 rounded-full font-barlow font-semibold text-sm btn-glow"
              >
                Zadzwoń: +48 514 900 688
              </a>
              {/* ⚠ OBRYS NIEBIESKI, NIE SZARY (11.08.2026, domknięcie findingu A3,
                  decyzja Marcina). Ten przycisk jest AKCJĄ KONTAKTOWĄ, drugą po
                  telefonie, a nie nawigacją.

                  Powód zmiany jest w tym, co stało się chwilę wcześniej w tym
                  samym pliku: „Oferta dla firm →" zeszła z gradientu na szary
                  obrys, bo prowadzi do przeglądania oferty. Gdyby e-mail został
                  szary, oba elementy wyglądałyby identycznie (42 px, ta sama
                  ramka, ten sam kolor tekstu), a robią różne rzeczy.

                  Po tej zmianie hierarchia z C3 obowiązuje na `/kontakt` w całości:
                    gradient        = konwersja główna (telefon, wysyłka formularza)
                    obrys NIEBIESKI = konwersja poboczna (e-mail)
                    obrys SZARY     = nawigacja („Oferta dla firm")

                  Hover bierze `blue-pale` / `blue/15`, czyli tę samą parę co CTA
                  po „Zakresie realizacji" na podstronach usług i co ikony
                  w `MobileFAB.tsx`. Tekst, `href`, `data-cta`, kształt
                  (`rounded-full`), padding i wysokość 42 px bez zmian. */}
              <a
                href="mailto:marcin@szabunia.pl"
                data-cta="email_kontakt_hero"
                className="inline-flex items-center gap-2 border border-blue dark:border-blue-light text-blue dark:text-blue-light px-5 py-2.5 rounded-full font-barlow font-semibold text-sm hover:bg-blue-pale dark:hover:bg-blue/15 transition-colors"
              >
                Napisz e-mail
              </a>
            </div>
          </AnimatedSection>

          {/* Info cards */}
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {contactCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6"
                >
                  {/* ⚠ `<p>`, NIE `<h2>` (11.08.2026, finding A6, decyzja Marcina).
                      Te trzy karty to odznaki informacyjne, a nie nagłówki sekcji:
                      renderują się w 16 px, w kartach obok siebie, i nie otwierają
                      żadnej treści. Jako `<h2>` dawały na `/kontakt` pięć nagłówków
                      drugiego poziomu, z czego trzy nie opisywały sekcji, więc
                      nawigacja po nagłówkach w czytniku ekranu prowadziła donikąd.

                      ⚠ ZMIANA JEST WYŁĄCZNIE SEMANTYCZNA. Klasy zostają co do
                      znaku, więc font, rozmiar, waga, kolor i `mb-2` bez zmian.
                      Sprawdzone, że nic nie stylowało tego przez selektor
                      elementu: `globals.css` nie ma żadnej reguły na `h2`,
                      a jedyne selektory typu (`[&_h2]:*`) siedzą
                      w `BlogContent.tsx` i dotyczą treści wpisów blogowych. */}
                  <p className="font-barlow font-bold text-base text-navy dark:text-white mb-2">
                    {card.title}
                  </p>
                  <p className="text-steel dark:text-dark-text-muted text-[13px] leading-relaxed">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Link do oferty */}
          <AnimatedSection delay={0.1}>
            <div className="bg-blue-pale dark:bg-dark-card rounded-2xl border border-blue/30 dark:border-blue-light/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-barlow font-extrabold text-lg text-navy dark:text-white mb-1">
                  Nie wiesz, czego potrzebujesz?
                </h2>
                <p className="text-[14px] text-text-body dark:text-dark-text-muted leading-relaxed">
                  Przejrzyj pełną ofertę dla firm i napisz, co Cię interesuje,
                  wstępną wycenę przygotuję w 24h.
                </p>
              </div>
              {/* ⚠ WARIANT NAWIGACYJNY, NIE GRADIENT (audyt UI 11.08.2026,
                  finding A3, decyzja Marcina). Ten przycisk był gradientowy,
                  czyli miał wagę CTA pierwszego poziomu, a prowadzi do
                  przeglądania oferty i stoi PRZED formularzem (sekcja kontaktowa
                  zaczyna się ~250 px niżej). Gradient wyprowadzał więc z lejka
                  z tą samą siłą, z jaką „Zadzwoń" do niego wprowadza.

                  Hierarchia ustalona w C3 i obowiązująca na podstronach usług:
                  gradient = konwersja, niebieski obrys = konwersja poboczna,
                  szary obrys = nawigacja. To jest nawigacja.

                  Kształt (`rounded-full`), rozmiar, padding, tekst i cel BEZ
                  ZMIAN — zmienia się wyłącznie warstwa kolorystyczna. Gradient
                  na tej stronie zostaje przy „Zadzwoń" i przy wysyłce formularza. */}
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/uslugi"
                  className="border border-border dark:border-dark-border text-navy dark:text-white px-5 py-2.5 rounded-full font-barlow font-semibold text-sm hover:border-blue hover:text-blue dark:hover:border-blue-light dark:hover:text-blue-light transition-colors"
                >
                  Oferta dla firm →
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="mt-12">
          <ErrorBoundary>
            <CTA />
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
