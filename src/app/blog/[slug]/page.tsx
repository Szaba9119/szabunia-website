import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug, getServiceSlugForPost, getRelatedPosts } from "@/data/blog";
import { getServiceBySlug } from "@/data/services";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTopButton from "@/components/BackToTopButton";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import BlogContent from "@/components/BlogContent";
import BlogCard from "@/components/BlogCard";
import AnimatedSection from "@/components/AnimatedSection";
import PoradnikBlogCTA from "@/components/PoradnikBlogCTA";

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg==";

const categoryLabels: Record<string, string> = {
  poradnik: "Poradnik",
  realizacja: "Realizacja",
  branża: "Branża",
};

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      url: `https://szabunia.pl/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: `/images/og/blog/${post.slug}.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: [`/images/og/blog/${post.slug}.png`],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.seo.description,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: "Marcin Szabunia",
        url: "https://szabunia.pl",
      },
      publisher: {
        "@type": "Organization",
        name: "Marcin Szabunia",
        url: "https://szabunia.pl",
      },
      image: `https://szabunia.pl/images/og/blog/${post.slug}.png`,
      mainEntityOfPage: `https://szabunia.pl/blog/${post.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://szabunia.pl" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://szabunia.pl/blog" },
        { "@type": "ListItem", position: 3, name: post.title },
      ],
    },
    // FAQPage tylko dla wpisów z sekcją Q&A (featured snippets / AEO)
    ...(post.faq && post.faq.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
  ];

  const serviceSlug = getServiceSlugForPost(post.slug);
  const relatedService = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;
  const relatedPosts = getRelatedPosts(post.slug, 3);

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16 px-4">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <AnimatedSection>
            <nav className="text-[12px] text-steel dark:text-dark-text-muted mb-6">
              <Link href="/" className="hover:text-navy dark:hover:text-white transition-colors">
                Strona główna
              </Link>
              <span className="mx-1.5">/</span>
              <Link href="/blog" className="hover:text-navy dark:hover:text-white transition-colors">
                Blog
              </Link>
              <span className="mx-1.5">/</span>
              <span className="text-navy dark:text-white">{post.title}</span>
            </nav>
          </AnimatedSection>

          {/* Header */}
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-barlow font-semibold uppercase tracking-wider text-blue dark:text-blue-light bg-blue-pale dark:bg-blue/15 px-2.5 py-0.5 rounded-full">
                {categoryLabels[post.category] ?? post.category}
              </span>
              <span className="text-[12px] text-steel dark:text-dark-text-muted">
                {post.readTime} min czytania
              </span>
              <time dateTime={post.date} className="text-[12px] text-steel dark:text-dark-text-muted/60">
                {new Date(post.date).toLocaleDateString("pl-PL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="font-barlow font-extrabold text-2xl md:text-4xl leading-tight tracking-tight text-navy dark:text-white mb-8">
              {post.title}
            </h1>
          </AnimatedSection>

          {/* Thumbnail */}
          <AnimatedSection>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 bg-border dark:bg-dark-card">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                placeholder="blur"
                blurDataURL={blurPlaceholder}
                priority
              />
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection>
            <BlogContent html={post.content} />
          </AnimatedSection>

          {/* FAQ wpisu — widoczna treść odpowiadająca znacznikom FAQPage JSON-LD */}
          {post.faq && post.faq.length > 0 && (
            <AnimatedSection className="mt-12">
              <h2 className="font-barlow font-bold text-xl text-navy dark:text-white mb-5">
                Najczęstsze pytania
              </h2>
              <div className="flex flex-col gap-3">
                {post.faq.map((f) => (
                  <div
                    key={f.q}
                    className="rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card p-5"
                  >
                    <h3 className="font-barlow font-bold text-[15px] text-navy dark:text-white mb-1.5">
                      {f.q}
                    </h3>
                    <p className="text-[13px] text-steel dark:text-dark-text-muted leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Lead magnet CTA — tylko przy wpisach o przygotowaniu / stylizacji */}
          {["jak-przygotowac-sie-do-sesji-biznesowej", "co-zalozyc-na-sesje-biznesowa"].includes(post.slug) && (
            <AnimatedSection className="mt-10">
              <PoradnikBlogCTA />
            </AnimatedSection>
          )}

          {/* Powiązana usługa */}
          {relatedService && (
            <AnimatedSection className="mt-10">
              <Link
                href={`/uslugi/${relatedService.slug}`}
                className="group block rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card p-5 md:p-6 hover:border-blue dark:hover:border-blue transition-all"
              >
                <p className="text-[11px] font-barlow font-semibold uppercase tracking-wider text-blue dark:text-blue-light mb-1">
                  Powiązana usługa
                </p>
                <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-1.5 group-hover:text-blue dark:group-hover:text-blue-light transition-colors">
                  {relatedService.title}
                </h2>
                <p className="text-[13px] text-steel dark:text-dark-text-muted leading-relaxed mb-3">
                  {relatedService.subtitle}
                </p>
                <span className="inline-flex items-center gap-2 text-blue dark:text-blue-light font-barlow font-semibold text-sm">
                  Zobacz ofertę · {relatedService.price}
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            </AnimatedSection>
          )}

          {/* Powiązane artykuły */}
          {relatedPosts.length > 0 && (
            <AnimatedSection className="mt-12 pt-8 border-t border-border dark:border-dark-border">
              <h2 className="font-barlow font-bold text-xl text-navy dark:text-white mb-5">
                Powiązane artykuły
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Kontakt CTA — prowadzi do końca lejka */}
          <AnimatedSection className="mt-12">
            <div className="rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card p-6 md:p-8 text-center">
              <h2 className="font-barlow font-extrabold text-xl md:text-2xl text-navy dark:text-white mb-2">
                Potrzebujesz zdjęć lub wideo dla firmy?
              </h2>
              <p className="text-steel dark:text-dark-text-muted text-[14px] mb-5 max-w-md mx-auto">
                Napisz, co chcesz pokazać. Wycenę dostaniesz w 24h.
              </p>
              <Link
                href="/kontakt"
                data-cta="wycena_blog_wpis"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] btn-glow hover:scale-[1.02] transition-transform"
              >
                Zapytaj o wycenę <span className="text-white/80">→</span>
              </Link>
            </div>
          </AnimatedSection>

          {/* Back link */}
          <AnimatedSection className="mt-12 pt-8 border-t border-border dark:border-dark-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue dark:text-blue-light font-barlow font-semibold text-sm hover:gap-3 transition-all"
            >
              <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              Wróć do bloga
            </Link>
          </AnimatedSection>
        </article>
      </main>
      <Footer />
      <MobileFAB />
      <BackToTopButton />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
