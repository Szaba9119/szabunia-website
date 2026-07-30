import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import AnimatedSection from "@/components/AnimatedSection";
import BlogCard from "@/components/BlogCard";
import CTA from "@/components/CTA";
import ErrorBoundary from "@/components/ErrorBoundary";
import { blogPosts } from "@/data/blog";
import Breadcrumbs, { breadcrumbJsonLd, type Crumb } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Blog o fotografii biznesowej i wideo | Marcin Szabunia",
  description:
    "Artykuły o fotografii biznesowej, sesjach wizerunkowych i wideo marketingu B2B. Porady od fotografa pracującego dla H&M, Warner Music i Santander.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Fotografia biznesowa i wideo marketing | Marcin Szabunia",
    description:
      "Artykuły o fotografii biznesowej, sesjach wizerunkowych i wideo marketingu B2B. Porady od fotografa pracującego dla H&M, Warner Music i Santander.",
    url: "https://szabunia.pl/blog",
    images: [
      {
        url: "/images/og/strony/blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog o fotografii biznesowej — Marcin Szabunia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Fotografia biznesowa i wideo marketing | Marcin Szabunia",
    description:
      "Artykuły o fotografii biznesowej, sesjach wizerunkowych i wideo marketingu B2B. Porady od fotografa pracującego dla H&M, Warner Music i Santander.",
    images: ["/images/og/strony/blog.jpg"],
  },
};

export default function BlogPage() {
  const crumbs: Crumb[] = [{ name: "Strona główna", href: "/" }, { name: "Blog" }];

  const structuredData = breadcrumbJsonLd(crumbs);

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <AnimatedSection>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Blog
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-lg mx-auto">
              Praktyczne porady, kulisy realizacji i trendy w fotografii biznesowej.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((post, i) => (
              <AnimatedSection key={post.slug} delay={0.08 * i}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>
        </div>

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
