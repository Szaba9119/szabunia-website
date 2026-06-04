import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTopButton from "@/components/BackToTopButton";
import Footer from "@/components/Footer";
import BlogContent from "@/components/BlogContent";
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
      images: [{ url: post.thumbnail, width: 1200, height: 630, alt: post.title }],
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
      image: `https://szabunia.pl${post.thumbnail}`,
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
  ];

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
              <time dateTime={post.date} className="text-[12px] text-steel-light dark:text-dark-text-muted/60">
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

          {/* Lead magnet CTA — tylko przy wpisach o przygotowaniu / stylizacji */}
          {["jak-przygotowac-sie-do-sesji-biznesowej", "co-zalozyc-na-sesje-biznesowa"].includes(post.slug) && (
            <AnimatedSection className="mt-10">
              <PoradnikBlogCTA />
            </AnimatedSection>
          )}

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
      <BackToTopButton />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
