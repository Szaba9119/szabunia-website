import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import AnimatedSection from "@/components/AnimatedSection";
import BlogCard from "@/components/BlogCard";
import CTA from "@/components/CTA";
import ErrorBoundary from "@/components/ErrorBoundary";
import { blogPosts, byNewest } from "@/data/blog";
import Breadcrumbs, { breadcrumbJsonLd, type Crumb } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Blog o fotografii i wideo dla firm | Szabunia",
  description:
    "Jak przygotować sesję, ile kosztuje event, jakie formaty wideo działają. Odpowiedzi od fotografa marek H&M, Warner Music i Santander.",
  // `types` powtórzone świadomie: `alternates` na podstronie ZASTĘPUJE cały obiekt
  // rodzica z layout.tsx, nie scala go, więc bez tego autodiscovery RSS znikało
  // dokładnie z tej strony, na której czytelnik szuka kanału (audyt PELNY2608-57).
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Blog Marcina Szabuni" }],
    },
  },
  openGraph: {
    title: "Blog o fotografii i wideo dla firm | Szabunia",
    description:
      "Jak przygotować sesję, ile kosztuje event, jakie formaty wideo działają. Odpowiedzi od fotografa marek H&M, Warner Music i Santander.",
    url: "https://szabunia.pl/blog",
    images: [
      {
        url: "/images/og/strony/blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog o fotografii i wideo dla firm, Marcin Szabunia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog o fotografii i wideo dla firm | Szabunia",
    description:
      "Jak przygotować sesję, ile kosztuje event, jakie formaty wideo działają. Odpowiedzi od fotografa marek H&M, Warner Music i Santander.",
    images: ["/images/og/strony/blog.jpg"],
  },
};

export default function BlogPage() {
  const crumbs: Crumb[] = [{ name: "Strona główna", href: "/" }, { name: "Blog" }];

  // `ItemList` wzorem /uslugi i /portfolio: bez niego Google nie dostawał z /blog
  // zamkniętej listy wpisów, mimo że oba pozostałe huby zbudowane tym samym
  // wzorcem ją mają (audyt PELNY2608-39). Kolejność ta sama co w widocznej siatce.
  const posts = [...blogPosts].sort(byNewest);

  const structuredData = [
    breadcrumbJsonLd(crumbs),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Blog o fotografii i wideo dla firm",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: post.title,
        url: `https://szabunia.pl/blog/${post.slug}`,
      })),
    },
  ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <AnimatedSection>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Blog o fotografii i wideo dla firm
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-lg mx-auto">
              Praktyczne porady, kulisy realizacji i trendy w fotografii biznesowej.
            </p>
          </AnimatedSection>

          {/* h2 domyka hierarchię: bez niego strona skakała z h1 na h3 z kart wpisów
              (BlogCard ma h3, bo na podstronach usług siedzi pod nagłówkiem „Z bloga").
              Audyt 2026-07-30. */}
          <h2 className="font-barlow font-extrabold text-xl md:text-2xl tracking-tight text-navy dark:text-white mb-6">
            Najnowsze wpisy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              // Opóźnienie liczone w rzędzie, nie w całej liście: przy 26 wpisach
              // `0.08 * i` dawało 26. karcie 2 s pustego miejsca (audyt PELNY2608-29).
              // `h-full` na wrapperze wyrównuje wysokości kart w rzędzie (PELNY2608-43).
              <AnimatedSection key={post.slug} delay={0.08 * (i % 3)} className="h-full">
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
