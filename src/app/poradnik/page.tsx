import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import AnimatedSection from "@/components/AnimatedSection";
import PoradnikForm from "@/components/PoradnikForm";

export const metadata: Metadata = {
  title: "Darmowy poradnik: przygotowanie do sesji biznesowej | Marcin Szabunia",
  description:
    "Pobierz darmowy pakiet przygotowania do sesji biznesowej: checklisty, planer stylizacji, ściąga kolorów i mini-brief. Wszystko, żeby wyjść na zdjęciach pewnie i naturalnie.",
  alternates: { canonical: "/poradnik" },
  openGraph: {
    title: "Darmowy poradnik: przygotowanie do sesji biznesowej",
    description:
      "Checklisty, planer stylizacji, ściąga kolorów i mini-brief — wszystko, żeby wejść na plan spokojnie i z głową. Pobierz za darmo.",
    url: "https://szabunia.pl/poradnik",
    images: [
      {
        url: "/images/marcin-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Marcin Szabunia — Fotograf biznesowy Poznań",
      },
    ],
  },
};

const inside = [
  "Checklisty: 48 h przed i w dniu sesji",
  "Planer stylizacji na 2–3 zestawy",
  "Ściąga kolorów: co działa, czego unikać",
  "Jak wyglądać naturalnie przed obiektywem",
  "Mini-brief, który wyślesz mi w 2 minuty",
];

export default function PoradnikPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://szabunia.pl" },
        { "@type": "ListItem", position: 2, name: "Darmowy poradnik" },
      ],
    },
  ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="text-[12px] font-barlow font-semibold uppercase tracking-[0.16em] text-blue dark:text-blue-light text-center mb-3">
              Darmowy poradnik
            </p>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[44px] leading-tight tracking-tight text-navy dark:text-white mb-4 text-center">
              Pakiet przygotowania do sesji biznesowej
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-2xl mx-auto">
              Checklisty, planer stylizacji, ściąga kolorów i mini-brief — wszystko, żeby
              wyjść na zdjęciach pewnie i naturalnie, nawet jeśli zwykle nie lubisz się
              fotografować.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Cover preview */}
            <AnimatedSection>
              <div className="relative aspect-[210/297] max-w-[420px] mx-auto rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-border dark:ring-dark-border">
                <Image
                  src="/images/poradnik-cover.png"
                  alt="Podgląd pierwszej strony poradnika — Pakiet przygotowania do sesji biznesowej"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
              </div>
            </AnimatedSection>

            {/* What's inside + form */}
            <AnimatedSection delay={0.1}>
              <div>
                <h2 className="font-barlow font-bold text-xl md:text-2xl text-navy dark:text-white mb-5">
                  Co znajdziesz w środku
                </h2>
                <ul className="space-y-3 mb-8">
                  {inside.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-md bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-[14px] text-text-body dark:text-dark-text-muted leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <PoradnikForm />

                <p className="text-[12px] text-steel dark:text-dark-text-muted/70 mt-4">
                  4 strony A4 · PDF · od Marcina Szabuni, fotografa biznesowego z Poznania.
                </p>

                <div className="mt-8 pt-6 border-t border-border dark:border-dark-border">
                  <p className="text-[14px] text-navy dark:text-white font-barlow font-semibold mb-3">
                    Wolisz od razu umówić sesję?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/uslugi/wizerunek-portrety" className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-5 py-2.5 rounded-xl font-barlow font-bold text-[13px] btn-glow hover:scale-[1.02] transition-transform">
                      Zobacz ofertę portretów <span className="text-white/80">→</span>
                    </Link>
                    <Link href="/galeria" className="inline-flex items-center gap-2 border border-border dark:border-dark-border text-navy dark:text-white px-5 py-2.5 rounded-xl font-barlow font-semibold text-[13px] hover:border-blue dark:hover:border-blue transition-colors">
                      Zobacz portfolio
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
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
