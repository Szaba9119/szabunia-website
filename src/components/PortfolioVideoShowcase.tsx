import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import YouTubeFacade from "./YouTubeFacade";
import type { PortfolioCategory } from "@/data/portfolio";

const defaultScope = [
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
  const badge = category.badge ?? "Realizacja wideo";
  const scope = category.scope ?? defaultScope;
  if (!video) return null;

  return (
    <section className="relative pt-28 pb-12 md:pb-16 px-4 overflow-hidden">
      {/* Poświaty tła — spójne z hero strony głównej */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-[12%] left-[8%] w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(37,99,235,0.07)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(37,99,235,0.14)_0%,transparent_70%)]" />
        <div className="absolute bottom-[5%] right-[8%] w-[380px] h-[380px] bg-[radial-gradient(circle,rgba(37,99,235,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,transparent_70%)]" />
      </div>
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
            {badge}
          </p>
          <h1 className="font-barlow font-extrabold text-3xl md:text-[44px] leading-tight tracking-tight text-navy dark:text-white mb-4">
            {category.heroTitle}
          </h1>
          <p className="text-steel dark:text-dark-text-muted text-[15px] md:text-base max-w-2xl">
            {category.heroSubtitle}
          </p>
        </AnimatedSection>

        {/* Poziomy film — fasada (player ładuje się po kliknięciu) */}
        <AnimatedSection>
          <YouTubeFacade id={video.youtubeId} title={video.title} />
        </AnimatedSection>

        {/* Opis + karta zakresu + CTA */}
        <AnimatedSection>
          <div className="mt-10 grid md:grid-cols-[1.6fr_1fr] gap-6 md:gap-8 items-start">
            <div>
              <p className="text-text-body dark:text-dark-text-muted text-[15px] leading-relaxed">
                {category.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#kontakt"
                  className="bg-gradient-to-br from-blue to-blue-light text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] btn-glow transition-transform hover:scale-[1.02]"
                >
                  Zapytaj o podobną realizację
                </a>
                <a
                  href="#kontakt"
                  className="border border-border dark:border-dark-border text-navy dark:text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] hover:border-blue hover:text-blue dark:hover:border-blue-light dark:hover:text-blue-light transition-colors"
                >
                  Zapytaj o ofertę
                </a>
              </div>
            </div>
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6">
              <p className="text-[11px] font-barlow font-semibold uppercase tracking-wider text-steel dark:text-dark-text-muted mb-4">
                Zakres realizacji
              </p>
              <ul className="space-y-2.5">
                {scope.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-[13px] font-barlow font-semibold text-navy dark:text-white"
                  >
                    <svg
                      className="w-4 h-4 text-blue dark:text-blue-light flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Pionowe reelsy */}
        {reels.length > 0 && (
          <AnimatedSection className="mt-14">
            <h2 className="font-barlow font-bold text-xl md:text-2xl text-navy dark:text-white mb-1">
              Pionowe reelsy z wywiadami
            </h2>
            <p className="text-steel dark:text-dark-text-muted text-[14px] mb-6">
              Trzy pionowe formaty pod Social Media. Kliknij, żeby obejrzeć na Instagramie.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-8">
              {reels.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${r.title} (reels na Instagramie, otwiera się w nowej karcie)`}
                  className="group block"
                >
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-border dark:border-dark-border bg-navy">
                    <Image
                      src={r.cover}
                      alt={r.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 90vw, 300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />
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
                  </div>
                  <p className="mt-3 text-[13px] text-text-body dark:text-dark-text-muted leading-snug">
                    {r.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[12px] font-barlow font-semibold text-blue dark:text-blue-light mt-1.5 group-hover:gap-2 transition-all">
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
