import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceCategories, getServiceBySlug, SERVICE_TESTIMONIALS } from "@/data/services";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import ServiceHero from "@/components/ServiceHero";
import ServiceGalleryStrip from "@/components/ServiceGalleryStrip";
import LogoBar from "@/components/LogoBar";
import TrustStats from "@/components/TrustStats";
import YouTubeFacade from "@/components/YouTubeFacade";
import PortfolioProcess from "@/components/PortfolioProcess";
import PortfolioPricing from "@/components/PortfolioPricing";
import PortfolioFAQ from "@/components/PortfolioFAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import BlogCard from "@/components/BlogCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import { getPostsForService } from "@/data/blog";

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
          url: `/images/og/uslugi/${service.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${service.title} — Marcin Szabunia`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seo.title,
      description: service.seo.description,
      images: [`/images/og/uslugi/${service.slug}.png`],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedPosts = getPostsForService(service.slug, 3);
  const testimonial = SERVICE_TESTIMONIALS[service.slug];

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
        {service.galleryCategory && (
          <ErrorBoundary>
            <ServiceGalleryStrip category={service.galleryCategory} />
          </ErrorBoundary>
        )}
        {service.videoId && (
          <ErrorBoundary>
            <section className="py-12 md:py-16 px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-barlow font-extrabold text-2xl md:text-[32px] leading-tight tracking-tight text-navy dark:text-white mb-2 text-center">
                  Przykładowa realizacja wideo
                </h2>
                <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-8">
                  {service.videoNote ?? "Tak wygląda materiał wideo z jednego wejścia foto + wideo."}
                </p>
                <YouTubeFacade id={service.videoId} title={service.videoTitle ?? service.title} className="" />
              </div>
            </section>
          </ErrorBoundary>
        )}
        <ErrorBoundary>
          <LogoBar />
        </ErrorBoundary>
        <ErrorBoundary>
          <TrustStats />
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
          <section className="py-12 md:py-16 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {testimonial && (
                <figure className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-8 md:p-10 text-center">
                  <div className="text-blue dark:text-blue-light text-sm mb-4" role="img" aria-label="Ocena: 5 na 5 gwiazdek">
                    ★★★★★
                  </div>
                  <blockquote className="text-navy dark:text-white text-lg md:text-xl leading-relaxed font-inter italic mb-6">
                    &bdquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption>
                    <div className="font-barlow font-bold text-[14px] text-navy dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-[12px] text-steel dark:text-dark-text-muted">
                      {testimonial.role}
                    </div>
                  </figcaption>
                </figure>
              )}
              <div className="text-center bg-blue-pale dark:bg-blue/10 rounded-2xl border border-blue/15 dark:border-blue/20 p-8 md:p-10">
                <h2 className="font-barlow font-extrabold text-2xl md:text-[28px] leading-tight tracking-tight text-navy dark:text-white mb-2">
                  Masz projekt? Wyceńmy go.
                </h2>
                <p className="text-steel dark:text-dark-text-muted text-[14px] mb-6 max-w-md mx-auto">
                  Napisz krótki brief, odezwę się w 24h z konkretną wyceną.
                </p>
                <a
                  href="#kontakt"
                  data-cta="wycena_srodek"
                  className="inline-block bg-gradient-to-br from-blue to-blue-light text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[14px] btn-glow hover:scale-[1.02] transition-transform"
                >
                  Wyślij brief
                </a>
              </div>
            </div>
          </section>
        </ErrorBoundary>
        <ErrorBoundary>
          <PortfolioFAQ faqs={service.faqs} />
        </ErrorBoundary>
        {relatedPosts.length > 0 && (
          <ErrorBoundary>
            <section className="py-12 md:py-16 px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-barlow font-extrabold text-2xl md:text-[32px] leading-tight tracking-tight text-navy dark:text-white mb-2 text-center">
                  Z bloga
                </h2>
                <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-8">
                  Praktyczne porady powiązane z tą usługą.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {relatedPosts.map((p) => (
                    <BlogCard key={p.slug} post={p} />
                  ))}
                </div>
              </div>
            </section>
          </ErrorBoundary>
        )}
        <ErrorBoundary>
          <CTA />
        </ErrorBoundary>
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
