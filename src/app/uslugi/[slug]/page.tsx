import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceCategories, getServiceBySlug, getPriceFaq, SERVICE_TESTIMONIALS } from "@/data/services";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import ServiceHero from "@/components/ServiceHero";
import ServiceGalleryStrip from "@/components/ServiceGalleryStrip";
import LogoBar from "@/components/LogoBar";
import TrustStats from "@/components/TrustStats";
import YouTubeFacade from "@/components/YouTubeFacade";
import PortfolioProcess from "@/components/PortfolioProcess";
import PortfolioFAQ from "@/components/PortfolioFAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import BlogCard from "@/components/BlogCard";
import PoradnikBlogCTA from "@/components/PoradnikBlogCTA";
import ErrorBoundary from "@/components/ErrorBoundary";
import { getPostsForService } from "@/data/blog";

// Poradnik (lead magnet) dotyczy wyłącznie stylizacji/pozowania do pojedynczego
// portretu — pokazujemy go tylko na stronie portretów i na stronie głównej
// (potwierdzone przez Marcina 2026-07-02, wcześniejsze rozszerzenie na zespoły/
// eventy/wideo było błędne — treść poradnika tego nie obejmuje).
const SHOW_PORADNIK = new Set<string>([
  "wizerunek-portrety",
]);

export function generateStaticParams() {
  return serviceCategories.map((s) => ({ slug: s.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  // OG drona to zdjęcie (JPEG, ~180 KB); pozostałe usługi mają brandowe PNG
  // ze skryptu generate-og-uslugi.py. Poprzedni PNG-foto ważył 1,5 MB (audyt 2026-07-06).
  const ogImage = `/images/og/uslugi/${service.slug}.${slug === "zdjecia-wideo-z-drona" ? "jpg" : "png"}`;
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
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${service.title}, Marcin Szabunia`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seo.title,
      description: service.seo.description,
      images: [ogImage],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedPosts = getPostsForService(service.slug, 3);
  const testimonial = SERVICE_TESTIMONIALS[service.slug];
  // Pytanie cenowe zawsze pierwsze w FAQ (brief-22 zad. 4) — ta sama tablica
  // zasila widoczną sekcję i JSON-LD, żeby nie rozjechały się jak wcześniej.
  const faqs = [getPriceFaq(service), ...service.faqs];

  // Cena startowa usługi (np. "od 1 000 zł") → liczba do JSON-LD Offer.
  const priceMatch = service.price.match(/\d[\d\s]*\d|\d/);
  const startingPrice = priceMatch ? priceMatch[0].replace(/\s/g, "") : undefined;

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
      areaServed: ["Poznań", "Polska", "Europa"],
      ...(startingPrice && {
        offers: {
          "@type": "Offer",
          priceCurrency: "PLN",
          price: startingPrice,
          availability: "https://schema.org/InStock",
          url: `https://szabunia.pl/uslugi/${service.slug}`,
        },
      }),
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
      mainEntity: faqs.map((f) => ({
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
        {testimonial && (
          <ErrorBoundary>
            <section className="py-12 md:py-16 px-4">
              <figure className="max-w-3xl mx-auto bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-8 md:p-10 text-center">
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
            </section>
          </ErrorBoundary>
        )}
        <div className="px-4 pt-4 pb-12 text-center">
          <a
            href="#kontakt"
            data-cta="wycena_uslugi"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] btn-glow hover:scale-[1.02] transition-transform"
          >
            Zapytaj o ofertę
            <span className="text-white/80">→</span>
          </a>
        </div>
        {SHOW_PORADNIK.has(service.slug) && (
          <ErrorBoundary>
            <section className="pb-12 md:pb-16 px-4">
              <div className="max-w-3xl mx-auto">
                <PoradnikBlogCTA />
              </div>
            </section>
          </ErrorBoundary>
        )}
        <ErrorBoundary>
          <PortfolioFAQ faqs={faqs} />
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
