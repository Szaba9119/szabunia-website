import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portfolioCategories, getCategoryBySlug, isPortfolioDraft } from "@/data/portfolio";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import PortfolioHero from "@/components/PortfolioHero";
import PortfolioGallery from "@/components/PortfolioGallery";
import PortfolioProcess from "@/components/PortfolioProcess";
import PortfolioFAQ from "@/components/PortfolioFAQ";
import PortfolioCaseStudy from "@/components/PortfolioCaseStudy";
import PortfolioVideoShowcase from "@/components/PortfolioVideoShowcase";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import ErrorBoundary from "@/components/ErrorBoundary";
import { breadcrumbJsonLd, type Crumb } from "@/components/Breadcrumbs";

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
  // Karta OG generowana skryptem scripts/generate-og-portfolio.py. Wcześniej stało tu
  // `category.thumbnail`, czyli zdjęcie z galerii, przy zadeklarowanych 1200x630.
  // Realne wymiary były inne, a dwa case studies miały pliki pionowe (1365x2048
  // i 1333x2000), więc karta na LinkedIn była przycinana przez środek (audyt 2026-07-30).
  const ogImage = `/images/og/portfolio/${category.slug}.png`;

  return {
    title: category.seo.title,
    description: category.seo.description,
    alternates: { canonical: `/portfolio/${category.slug}` },
    ...(isPortfolioDraft(slug) ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: category.seo.title,
      description: category.seo.description,
      url: `https://szabunia.pl/portfolio/${category.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: category.label }],
    },
    twitter: {
      card: "summary_large_image",
      title: category.seo.title,
      description: category.seo.description,
      images: [ogImage],
    },
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const crumbs: Crumb[] = [
    { name: "Strona główna", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: category.label },
  ];
  const breadcrumb = breadcrumbJsonLd(crumbs);

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
          // uploadDate wymagane przez Google (raport GSC „Brakujące pole uploadDate", 2026-07-07)
          uploadDate: category.video.uploadDate,
          duration: category.video.duration,
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

  // Przycisk do kontaktu w połowie strony (LEJ2608-01, audyt lejka 2026-08-02).
  // Case studies miały dotąd wyłącznie formularz na samym dole, żadnego przycisku
  // wcześniej i żadnego `data-cta`, więc ruch z wpisów w wizytówce Google — a on
  // ląduje właśnie tutaj — nie miał czego kliknąć i nie dało się go zmierzyć.
  // Ten sam wzorzec i ta sama etykieta co `wycena_uslugi` na /uslugi/[slug].
  const midCta = (
    <div className="px-4 pt-4 pb-12 text-center">
      <a
        href="#kontakt"
        data-cta="wycena_case"
        className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] btn-glow hover:scale-[1.02] transition-transform"
      >
        Zapytaj o ofertę
        <span className="text-white/80">→</span>
      </a>
    </div>
  );

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main">
        {category.video ? (
          <>
            <ErrorBoundary>
              <PortfolioVideoShowcase category={category} crumbs={crumbs} />
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
            {midCta}
          </>
        ) : (
          <>
            <ErrorBoundary>
              <PortfolioHero category={category} crumbs={crumbs} />
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
            {midCta}
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
      {/* Przyklejony pasek mobilny renderuje się na wszystkich stronach lejka
          poza /kontakt (tam formularz jest treścią strony). Case studies były
          jedynym wyjątkiem bez uzasadnienia — LEJ2608-01. */}
      <MobileFAB />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
