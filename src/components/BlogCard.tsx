import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/data/blog";

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg==";

const categoryLabels: Record<string, string> = {
  poradnik: "Poradnik",
  realizacja: "Realizacja",
  branża: "Branża",
};

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border overflow-hidden hover:border-blue dark:hover:border-blue transition-all hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/9] bg-border dark:bg-dark-card">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          placeholder="blur"
          blurDataURL={blurPlaceholder}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-barlow font-semibold uppercase tracking-wider text-blue dark:text-blue-light bg-blue-pale dark:bg-blue/15 px-2 py-0.5 rounded-full">
            {categoryLabels[post.category] ?? post.category}
          </span>
          <span className="text-[11px] text-steel dark:text-dark-text-muted">
            {post.readTime} min czytania
          </span>
        </div>
        <h3 className="font-barlow font-bold text-base text-navy dark:text-white mb-2 group-hover:text-blue dark:group-hover:text-blue-light transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-steel dark:text-dark-text-muted text-[13px] leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <time dateTime={post.date} className="block text-[12px] text-steel dark:text-dark-text-muted/60 mt-3">
          {new Date(post.date).toLocaleDateString("pl-PL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
    </Link>
  );
}
