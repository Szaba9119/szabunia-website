import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedSection from "@/components/AnimatedSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Kontakt — fotograf biznesowy Poznań | Marcin Szabunia",
  description:
    "Skontaktuj się w sprawie fotografii i wideo dla firm — portrety biznesowe, sesje zespołowe, eventy, fotografia produktowa, wideo marketing. Poznań, cała Polska i Europa. Odpowiadam w 24h.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt — fotograf biznesowy Poznań | Marcin Szabunia",
    description:
      "Napisz brief, odezwę się w 24h z wstępną wyceną i terminem. Fotografia i wideo dla firm — Poznań, cała Polska i Europa.",
    url: "https://szabunia.pl/kontakt",
    images: [
      {
        url: "/images/marcin-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Kontakt — Marcin Szabunia, fotograf biznesowy Poznań",
      },
    ],
  },
};

const contactCards = [
  {
    title: "Odezwę się w 24h",
    body: "Na każde zapytanie biznesowe odpowiadam w jeden dzień roboczy — z wstępną wyceną i propozycją terminu.",
  },
  {
    title: "Poznań, cała Polska i Europa",
    body: "Bazuję w Poznaniu, realizuję projekty w całym kraju i za granicą. Dojazd ustalamy w wycenie.",
  },
  {
    title: "Przygotuj krótki brief",
    body: "Napisz, czego potrzebujesz: cel zdjęć lub wideo, orientacyjny termin, lokalizację i zakres. Resztę dopniemy razem.",
  },
];

export default function KontaktPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Kontakt — Marcin Szabunia",
      url: "https://szabunia.pl/kontakt",
      description:
        "Kontakt w sprawie fotografii i wideo dla firm — portrety biznesowe, sesje zespołowe, eventy, fotografia produktowa, wideo marketing.",
      mainEntity: {
        "@type": "ProfessionalService",
        name: "Marcin Szabunia",
        url: "https://szabunia.pl",
        email: "marcin@szabunia.pl",
        telephone: "+48514900688",
        image: "https://szabunia.pl/images/marcin-hero.jpg",
        areaServed: ["Poznań", "Polska", "Europa"],
        sameAs: ["https://instagram.com/szabunia.biz"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://szabunia.pl" },
        { "@type": "ListItem", position: 2, name: "Kontakt", item: "https://szabunia.pl/kontakt" },
      ],
    },
  ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <AnimatedSection>
            <p className="text-[11px] uppercase tracking-widest text-steel-light dark:text-dark-text-muted mb-3 font-barlow font-semibold text-center">
              Kontakt
            </p>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Porozmawiajmy o Twoim projekcie
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-8 max-w-2xl mx-auto leading-relaxed">
              Fotografia i wideo dla firm — portrety biznesowe, sesje zespołowe,
              reportaże z eventów, fotografia produktowa i wideo marketing. Napisz
              brief, a odezwę się w ciągu 24 godzin z wstępną wyceną i terminem.
            </p>

            {/* Quick actions */}
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              <a
                href="mailto:marcin@szabunia.pl"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-5 py-2.5 rounded-full font-barlow font-semibold text-sm btn-glow"
              >
                Napisz e-mail
              </a>
              <a
                href="tel:+48514900688"
                className="inline-flex items-center gap-2 border border-border dark:border-dark-border text-navy dark:text-white px-5 py-2.5 rounded-full font-barlow font-semibold text-sm hover:border-blue dark:hover:border-blue-light transition-colors"
              >
                +48 514 900 688
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
                  <h2 className="font-barlow font-bold text-base text-navy dark:text-white mb-2">
                    {card.title}
                  </h2>
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
                <p className="text-[14px] text-steel dark:text-dark-text-muted leading-relaxed">
                  Przejrzyj pełną ofertę dla firm albo policz orientacyjny koszt
                  w kalkulatorze — a potem wróć z gotowym briefem.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/uslugi"
                  className="bg-gradient-to-br from-blue to-blue-light text-white px-5 py-2.5 rounded-full font-barlow font-semibold text-sm btn-glow"
                >
                  Oferta dla firm →
                </Link>
                <Link
                  href="/kalkulator"
                  className="border border-blue/40 dark:border-blue-light/40 text-navy dark:text-white px-5 py-2.5 rounded-full font-barlow font-semibold text-sm hover:bg-white/60 dark:hover:bg-dark-card-hover transition-colors"
                >
                  Kalkulator wyceny
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
