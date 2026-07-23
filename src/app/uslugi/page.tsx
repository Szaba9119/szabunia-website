import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories } from "@/data/services";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedSection from "@/components/AnimatedSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Usługi foto i wideo dla firm | Marcin Szabunia Poznań",
  description:
    "Pełna oferta dla firm: portrety biznesowe, sesje zespołowe, fotografia eventowa i produktowa, pakiety foto + wideo oraz wideo marketing. Poznań i cała Polska.",
  alternates: { canonical: "/uslugi" },
  openGraph: {
    title: "Usługi — fotografia biznesowa i wideo marketing | Marcin Szabunia",
    description:
      "Pełna oferta usług fotograficznych i wideo dla firm B2B. Poznań, cała Polska i Europa.",
    url: "https://szabunia.pl/uslugi",
    images: [
      {
        url: "/images/marcin-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Usługi fotografii biznesowej i wideo — Marcin Szabunia, Poznań",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Usługi — fotografia biznesowa i wideo marketing | Marcin Szabunia",
    description:
      "Pełna oferta usług fotograficznych i wideo dla firm B2B. Poznań, cała Polska i Europa.",
    images: ["/images/marcin-hero.jpg"],
  },
};

export default function UslugiPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://szabunia.pl" },
        { "@type": "ListItem", position: 2, name: "Usługi", item: "https://szabunia.pl/uslugi" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Usługi fotograficzne i wideo — Marcin Szabunia",
      itemListElement: serviceCategories.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        url: `https://szabunia.pl/uslugi/${s.slug}`,
      })),
    },
  ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-[11px] uppercase tracking-widest text-steel dark:text-dark-text-muted mb-3 font-barlow font-semibold text-center">
              Oferta
            </p>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Usługi fotograficzne i wideo dla biznesu
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
              Od portretów biznesowych po produkcję wideo — jeden twórca, spójny
              materiał, krótka droga od briefu do dostawy. Bazuję w Poznaniu,
              pracuję w całej Polsce i Europie.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceCategories.map((s, i) => (
              <AnimatedSection key={s.slug} delay={i * 0.06}>
                <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border hover:border-blue dark:hover:border-blue transition-all hover:-translate-y-0.5 group h-full">
                  <Link href={`/uslugi/${s.slug}`} className="flex flex-col p-6 h-full">
                    <div
                      className="w-10 h-10 rounded-xl bg-blue-pale dark:bg-blue/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      aria-hidden="true"
                    >
                      {s.icon}
                    </div>
                    <h2 className="font-barlow font-bold text-base text-navy dark:text-white mb-1.5">
                      {s.title}
                    </h2>
                    <p className="text-steel dark:text-dark-text-muted text-[13px] leading-relaxed mb-4 flex-grow">
                      {s.subtitle}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-border dark:border-dark-border">
                      <span className="text-blue dark:text-blue-light text-[12px] font-barlow font-semibold">
                        {s.price}
                      </span>
                      <span className="text-blue dark:text-blue-light text-[12px] font-barlow font-semibold group-hover:translate-x-0.5 transition-transform">
                        Zobacz szczegóły →
                      </span>
                    </div>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
        <div className="mt-12">
          <ErrorBoundary>
            <CTA />
          </ErrorBoundary>
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
