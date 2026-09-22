import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import LogoBar from "@/components/LogoBar";
import About from "@/components/About";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import MobileFAB from "@/components/MobileFAB";
import ErrorBoundary from "@/components/ErrorBoundary";
import { homeFaqs } from "@/data/faq";

// Sekcje poniżej folda ładowane osobnymi chunkami (SSR zostaje — HTML w pełni
// renderowany; dzielony jest tylko JS hydratacji, co odchudza krytyczny bundle
// na mobile i skraca LCP).
const Portfolio = dynamic(() => import("@/components/Portfolio"));
const Process = dynamic(() => import("@/components/Process"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Publications = dynamic(() => import("@/components/Publications"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const BlogPreview = dynamic(() => import("@/components/BlogPreview"));
const PoradnikTeaser = dynamic(() => import("@/components/PoradnikTeaser"));
const CTA = dynamic(() => import("@/components/CTA"));

// FAQPage JSON-LD generowany z tej samej tablicy co widoczna sekcja FAQ
// (src/data/faq.ts) — wcześniej dwie ręczne kopie zdążyły się rozjechać
// (audyt 2026-07-06). Zmiany treści FAQ robić wyłącznie w src/data/faq.ts.
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main">
        <ErrorBoundary><Hero /></ErrorBoundary>
        <ErrorBoundary><LogoBar /></ErrorBoundary>
        <ErrorBoundary><Services /></ErrorBoundary>
        <ErrorBoundary><Portfolio /></ErrorBoundary>
        <ErrorBoundary><Publications /></ErrorBoundary>
        <ErrorBoundary><Testimonials /></ErrorBoundary>
        <ErrorBoundary><Process /></ErrorBoundary>
        <ErrorBoundary><About /></ErrorBoundary>
        <ErrorBoundary><FAQ /></ErrorBoundary>
        {/* Poradnik (lead magnet portretowy) zszedł pod FAQ 22.09.2026, decyzja Marcina:
            po przestawieniu usług na „eventy pierwsze" nie może stać przed pytaniami
            ogólnymi, bo przechylał środek strony głównej w stronę portretów.
            Pod nim blog, dopiero potem formularz: dwa wezwania nie stoją obok siebie. */}
        <ErrorBoundary><PoradnikTeaser /></ErrorBoundary>
        <ErrorBoundary><BlogPreview /></ErrorBoundary>
        <ErrorBoundary><CTA /></ErrorBoundary>
      </main>
      <Footer />
      <MobileFAB />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  );
}
