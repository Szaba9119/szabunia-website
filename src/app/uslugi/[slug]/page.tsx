import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceCategories, getServiceBySlug } from "@/data/services";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import ServiceHero from "@/components/ServiceHero";
import PortfolioProcess from "@/components/PortfolioProcess";
import PortfolioPricing from "@/components/PortfolioPricing";
import PortfolioFAQ from "@/components/PortfolioFAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

export function generateStaticParams() {
  return serviceCategories.map((s) => ({ slug: s.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/uslugi/${service.slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `https://szabunia.pl/uslugi/${service.slug}`,
      images: [
        {
          url: "/images/marcin-hero.jpg",
          width: 1200,
          height: 630,
          alt: `${service.title} — Marcin Szabunia`,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.seo.description,
      provider: {
        "@type": "ProfessionalService",
        name: "Marcin Szabunia",
        url: "https://szabunia.pl",
      },
      areaServed: { "@type": "Country", name: "PL" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://szabunia.pl" },
        { "@type": "ListItem", position: 2, name: "Usługi", item: "https://szabunia.pl/uslugi" },
        { "@type": "ListItem", position: 3, name: service.title },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main">
        <ErrorBoundary>
          <ServiceHero service={service} />
        </ErrorBoundary>
        <ErrorBoundary>
          <PortfolioProcess steps={service.process} />
        </ErrorBoundary>
        <ErrorBoundary>
          <PortfolioPricing
            pricingType={service.pricingType}
            tiers={service.tiers}
            tables={service.tables}
            note={service.pricingNote}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <PortfolioFAQ faqs={service.faqs} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CTA />
        </ErrorBoundary>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
