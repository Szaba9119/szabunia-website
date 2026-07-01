import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portfolioCategories, getCategoryBySlug, isPortfolioDraft } from "@/data/portfolio";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import PortfolioHero from "@/components/PortfolioHero";
import PortfolioGallery from "@/components/PortfolioGallery";
import PortfolioProcess from "@/components/PortfolioProcess";
import PortfolioPricing from "@/components/PortfolioPricing";
import PortfolioFAQ from "@/components/PortfolioFAQ";
import PortfolioCaseStudy from "@/components/PortfolioCaseStudy";
import PortfolioVideoShowcase from "@/components/PortfolioVideoShowcase";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

export function generateStaticParams() {
  return portfolioCategories
    .filter((cat) => !cat.externalUrl)
    .map((c) => ({ slug: c.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.seo.title,
    description: category.seo.description,
    alternates: { canonical: `/portfolio/${category.slug}` },
    ...(isPortfolioDraft(slug) ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: category.seo.title,
      description: category.seo.description,
      url: `https://szabunia.pl/portfolio/${category.slug}`,
      images: [{ url: category.thumbnail, width: 1200, height: 630, alt: category.label }],
    },
    twitter: {
      card: "summary_large_image",
      title: category.seo.title,
      description: category.seo.description,
      images: [category.thumbnail],
    },
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://szabunia.pl" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://szabunia.pl/portfolio" },
      { "@type": "ListItem", position: 3, name: category.label },
    ],
  };

  const structuredData = category.video
    ? [
        {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: category.heroTitle || category.label,
          description: category.seo.description,
          thumbnailUrl: [
            `https://i.ytimg.com/vi/${category.video.youtubeId}/maxresdefault.jpg`,
          ],
          embedUrl: `https://www.youtube.com/embed/${category.video.youtubeId}`,
          contentUrl: `https://www.youtube.com/watch?v=${category.video.youtubeId}`,
          publisher: {
            "@type": "Person",
            name: "Marcin Szabunia",
            url: "https://szabunia.pl",
          },
        },
        breadcrumb,
      ]
    : [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: category.label,
          description: category.seo.description,
          provider: {
            "@type": "ProfessionalService",
            name: "Marcin Szabunia",
            url: "https://szabunia.pl",
          },
          areaServed: ["Poznań", "Polska", "Europa"],
          image: `https://szabunia.pl${category.thumbnail}`,
        },
        breadcrumb,
        ...(category.faqs.length > 0
          ? [
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: category.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ]
          : []),
      ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main">
        {category.video ? (
          <>
            <ErrorBoundary>
              <PortfolioVideoShowcase category={category} />
            </ErrorBoundary>
            {category.gallery.length > 0 && (
              <ErrorBoundary>
                <PortfolioGallery
                  images={category.gallery}
                  title={category.label}
                  subtitle={category.gallerySubtitle}
                  aspect={category.galleryAspect}
                />
              </ErrorBoundary>
            )}
            {category.caseStudy && (
              <ErrorBoundary>
                <PortfolioCaseStudy data={category.caseStudy} />
              </ErrorBoundary>
            )}
          </>
        ) : (
          <>
            <ErrorBoundary>
              <PortfolioHero category={category} />
            </ErrorBoundary>
            <ErrorBoundary>
              <PortfolioGallery
                images={category.gallery}
                title={category.label}
                subtitle={category.gallerySubtitle}
                aspect={category.galleryAspect}
              />
            </ErrorBoundary>
            {category.caseStudy && (
              <ErrorBoundary>
                <PortfolioCaseStudy data={category.caseStudy} />
              </ErrorBoundary>
            )}
            <ErrorBoundary>
              <PortfolioProcess steps={category.process} />
            </ErrorBoundary>
            <ErrorBoundary>
              <PortfolioPricing
                pricingType={category.pricingType}
                tiers={category.tiers}
                tables={category.tables}
                note={category.pricingNote}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <PortfolioFAQ faqs={category.faqs} />
            </ErrorBoundary>
          </>
        )}
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
