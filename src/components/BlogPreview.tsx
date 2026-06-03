import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import BlogCard from "./BlogCard";
import { blogPosts } from "@/data/blog";

export default function BlogPreview() {
  const latest = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-12 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Z bloga
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            Praktyczne porady, kulisy realizacji i trendy w fotografii biznesowej.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((post, i) => (
            <AnimatedSection key={post.slug} delay={0.1 * i}>
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue dark:text-blue-light font-barlow font-semibold text-sm hover:gap-3 transition-all"
          >
            Zobacz wszystkie artykuły
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
