import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import type { PortfolioCategory } from "@/data/portfolio";

const scope = [
  "Poziomy film (YouTube)",
  "3 pionowe reelsy",
  "Wywiady",
  "Montaż i postprodukcja",
];

export default function PortfolioVideoShowcase({
  category,
}: {
  category: PortfolioCategory;
}) {
  const video = category.video;
  const reels = category.reels ?? [];
  if (!video) return null;

  return (
    <section className="pt-28 pb-12 md:pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <AnimatedSection>
          <nav className="text-[12px] text-steel dark:text-dark-text-muted mb-6">
            <Link href="/" className="hover:text-navy dark:hover:text-white transition-colors">
              Strona główna
            </Link>
            <span className="mx-1.5">/</span>
            <Link href="/portfolio" className="hover:text-navy dark:hover:text-white transition-colors">
              Portfolio
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-navy dark:text-white">{category.label}</span>
          </nav>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection>
          <p className="text-[12px] font-barlow font-semibold uppercase tracking-[0.16em] text-blue dark:text-blue-light mb-3">
            Realizacja wideo
          </p>
          <h1 className="font-barlow font-extrabold text-3xl md:text-[44px] leading-tight tracking-tight text-navy dark:text-white mb-4">
            {category.heroTitle}
          </h1>
          <p className="text-steel dark:text-dark-text-muted text-[15px] md:text-base max-w-2xl">
            {category.heroSubtitle}
          </p>
        </AnimatedSection>

        {/* Poziomy film */}
        <AnimatedSection>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-navy ring-1 ring-border dark:ring-dark-border shadow-xl mt-8">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </AnimatedSection>

        {/* Opis + zakres */}
        <AnimatedSection>
          <div className="mt-8 max-w-3xl">
            <p className="text-text-body dark:text-dark-text-muted text-[15px] leading-relaxed">
              {category.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {scope.map((s) => (
                <span
                  key={s}
                  className="text-[12px] font-barlow font-semibold text-blue dark:text-blue-light bg-blue-pale dark:bg-blue/10 border border-blue/15 dark:border-blue-light/20 rounded-full px-3 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Pionowe reelsy */}
        {reels.length > 0 && (
          <AnimatedSection className="mt-14">
            <h2 className="font-barlow font-bold text-xl md:text-2xl text-navy dark:text-white mb-1">
              Pionowe reelsy — wywiady
            </h2>
            <p className="text-steel dark:text-dark-text-muted text-[14px] mb-6">
              Trzy pionowe formaty pod Social Media. Kliknij, żeby obejrzeć na Instagramie.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {reels.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${r.title} — reels na Instagramie (otwiera się w nowej karcie)`}
                  className="group relative block aspect-[9/16] rounded-2xl overflow-hidden border border-border dark:border-dark-border bg-navy"
                >
                  <Image
                    src={r.cover}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 90vw, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                  <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/45 backdrop-blur-sm flex items-center justify-center text-white">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white group-hover:bg-blue group-hover:border-blue transition-colors">
                      <svg className="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>
                  <span className="absolute bottom-3 left-4 right-4 inline-flex items-center gap-1.5 text-[12px] font-barlow font-semibold text-white">
                    Zobacz na Instagramie →
                  </span>
                </a>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
