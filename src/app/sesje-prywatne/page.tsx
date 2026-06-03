import type { Metadata } from "next";
import Link from "next/link";
import {
  privateCategories,
  privateConditions,
  privateModifiers,
  privateTrust,
} from "@/data/sesje-prywatne";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedSection from "@/components/AnimatedSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Sesje prywatne — fotografia i wideo Poznań | Marcin Szabunia",
  description:
    "Sesje portretowe, reportaż z eventów, zdjęcia produktowe i wideo dla osób prywatnych w Poznaniu. Ceny brutto z VAT, autorski retusz, galeria do wyboru w 48h.",
  alternates: { canonical: "/sesje-prywatne" },
  openGraph: {
    title: "Sesje prywatne — fotografia i wideo Poznań | Marcin Szabunia",
    description:
      "Portrety, reportaż z eventów, produkty i wideo dla osób prywatnych. Poznań, ceny brutto z VAT, autorski retusz.",
    url: "https://szabunia.pl/sesje-prywatne",
    images: [
      {
        url: "/images/marcin-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Sesje prywatne — fotografia i wideo, Marcin Szabunia Poznań",
      },
    ],
  },
};

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-blue dark:text-blue-light flex-shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function SesjePrywatnePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Sesje prywatne — fotografia i wideo",
      description:
        "Sesje portretowe, eventowe, produktowe i wideo dla klientów prywatnych w Poznaniu.",
      provider: {
        "@type": "ProfessionalService",
        name: "Marcin Szabunia",
        url: "https://szabunia.pl",
      },
      areaServed: { "@type": "City", name: "Poznań" },
      image: "https://szabunia.pl/images/marcin-hero.jpg",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://szabunia.pl" },
        { "@type": "ListItem", position: 2, name: "Sesje prywatne", item: "https://szabunia.pl/sesje-prywatne" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Sesje prywatne — kategorie",
      itemListElement: privateCategories.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.title,
      })),
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
              Dla osób prywatnych
            </p>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Sesje prywatne — fotografia i wideo w Poznaniu
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-6 max-w-2xl mx-auto leading-relaxed">
              Portrety, zdjęcia produktowe dla twórców i wideo dla osób
              prywatnych. Indywidualne podejście, autorski retusz, jeden twórca od
              briefu do gotowego materiału. Bazuję w Poznaniu.
            </p>
            <div className="flex justify-center mb-14">
              <p className="inline-flex flex-wrap justify-center gap-x-2 gap-y-1 text-center text-[12px] text-steel dark:text-dark-text-muted bg-blue-pale dark:bg-blue/10 border border-blue/20 dark:border-blue-light/20 rounded-full px-4 py-2">
                <span>Wszystkie ceny są kwotami <strong className="text-navy dark:text-white font-semibold">brutto (zawierają VAT 23%)</strong>.</span>
                <span>Dojazd na terenie Poznania: 0 zł.</span>
              </p>
            </div>
          </AnimatedSection>

          {/* Dlaczego ja? */}
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {privateTrust.map((t) => (
                <div
                  key={t.title}
                  className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6"
                >
                  <h2 className="font-barlow font-bold text-base text-navy dark:text-white mb-2">
                    {t.title}
                  </h2>
                  <p className="text-steel dark:text-dark-text-muted text-[13px] leading-relaxed">
                    {t.body}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Kategorie + pakiety */}
          <div className="space-y-16">
            {privateCategories.map((category) => (
              <section key={category.id} aria-labelledby={`cat-${category.id}`}>
                <AnimatedSection>
                  <h2
                    id={`cat-${category.id}`}
                    className="font-barlow font-extrabold text-2xl md:text-3xl text-navy dark:text-white mb-2 text-center"
                  >
                    {category.title}
                  </h2>
                  <p className="text-steel dark:text-dark-text-muted text-[14px] text-center mb-8 max-w-2xl mx-auto leading-relaxed">
                    {category.description}
                  </p>
                </AnimatedSection>
                <div
                  className={`grid gap-4 ${
                    category.tiers.length === 2
                      ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                      : "grid-cols-1 md:grid-cols-3"
                  }`}
                >
                  {category.tiers.map((tier, i) => (
                    <AnimatedSection key={tier.name} delay={i * 0.08}>
                      <div
                        className={`rounded-2xl p-6 h-full flex flex-col relative ${
                          tier.recommended
                            ? "bg-white dark:bg-dark-card border-2 border-blue dark:border-blue-light shadow-lg shadow-blue/5"
                            : "bg-white dark:bg-dark-card border border-border dark:border-dark-border"
                        }`}
                      >
                        {tier.recommended && (
                          <div
                            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue text-white px-3 py-0.5 rounded-full text-[10px] font-barlow font-bold uppercase tracking-wider whitespace-nowrap"
                            role="note"
                          >
                            Rekomendowany
                          </div>
                        )}
                        <h3 className="font-barlow font-bold text-lg text-navy dark:text-white mb-1">
                          {tier.name}
                        </h3>
                        <div className="font-barlow font-extrabold text-3xl text-blue dark:text-blue-light mb-1">
                          {tier.price}
                        </div>
                        {tier.tagline && (
                          <p className="text-[12px] italic text-steel-light dark:text-dark-text-muted mb-5">
                            {tier.tagline}
                          </p>
                        )}
                        <ul
                          className={`space-y-3 text-[13px] mb-2 flex-grow ${
                            tier.recommended
                              ? "text-navy dark:text-white"
                              : "text-steel dark:text-dark-text-muted"
                          } ${tier.tagline ? "" : "mt-4"}`}
                        >
                          {tier.features.map((f) => (
                            <li key={f} className="flex items-start gap-2">
                              <CheckIcon />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Modyfikatory */}
          <AnimatedSection>
            <div className="mt-16 bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 md:p-8">
              <h2 className="font-barlow font-bold text-xl text-blue dark:text-blue-light mb-1">
                Dodatki i opcje
              </h2>
              <p className="text-steel dark:text-dark-text-muted text-[13px] mb-5">
                Dorzucasz do dowolnego pakietu — ustalamy przed sesją.
              </p>
              <ul className="divide-y divide-border dark:divide-dark-border">
                {privateModifiers.map((m) => (
                  <li
                    key={m.label}
                    className="flex items-center justify-between gap-4 py-3 text-[13px]"
                  >
                    <span className="text-steel dark:text-dark-text-muted">{m.label}</span>
                    <span className="font-barlow font-bold text-navy dark:text-white text-right whitespace-nowrap">
                      {m.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Warunki współpracy */}
          <AnimatedSection>
            <h2 className="font-barlow font-extrabold text-2xl md:text-3xl text-navy dark:text-white mt-16 mb-8 text-center">
              Warunki współpracy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {privateConditions.map((c) => (
                <div
                  key={c.title}
                  className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-5"
                >
                  <h3 className="font-barlow font-bold text-[15px] text-navy dark:text-white mb-1.5">
                    {c.title}
                  </h3>
                  <p className="text-steel dark:text-dark-text-muted text-[13px] leading-relaxed">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Link do oferty B2B */}
          <AnimatedSection delay={0.1}>
            <div className="mt-4 bg-blue-pale dark:bg-dark-card rounded-2xl border border-blue/30 dark:border-blue-light/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-barlow font-extrabold text-lg text-navy dark:text-white mb-1">
                  Reprezentujesz firmę?
                </h2>
                <p className="text-[14px] text-steel dark:text-dark-text-muted leading-relaxed">
                  Portrety biznesowe, sesje zespołowe, fotografia eventowa i
                  produktowa oraz wideo marketing — ceny netto z fakturą VAT.
                </p>
              </div>
              <Link
                href="/uslugi"
                className="shrink-0 bg-gradient-to-br from-blue to-blue-light text-white px-5 py-2.5 rounded-full font-barlow font-semibold text-sm btn-glow"
              >
                Oferta dla firm →
              </Link>
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
