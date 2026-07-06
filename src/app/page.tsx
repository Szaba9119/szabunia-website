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
const Pricing = dynamic(() => import("@/components/Pricing"));
const Process = dynamic(() => import("@/components/Process"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Publications = dynamic(() => import("@/components/Publications"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Warunki = dynamic(() => import("@/components/Warunki"));
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
        <ErrorBoundary><About /></ErrorBoundary>
        <ErrorBoundary><Services /></ErrorBoundary>
        <ErrorBoundary><Portfolio /></ErrorBoundary>
        {/* Dowód społeczny i autorytet PRZED ceną: opinie + publikacje budują
            wartość i chęć, zanim klient zobaczy cennik (mniejszy opór cenowy). */}
        <ErrorBoundary><Testimonials /></ErrorBoundary>
        <ErrorBoundary><Publications /></ErrorBoundary>
        {/* Proces tuż nad cennikiem: prosty przebieg (4 kroki) zmniejsza „szok ceną". */}
        <ErrorBoundary><Process /></ErrorBoundary>
        <ErrorBoundary><Pricing /></ErrorBoundary>
        {/* FAQ i formularz zaraz po cenniku: obsługa obiekcji → kontakt, bez
            przerywania ścieżki treściami nurture (blog/poradnik idą na koniec).
            Warunki („drobny druk") między FAQ a formularzem — decyzja Marcina 2026-07-06. */}
        <ErrorBoundary><FAQ /></ErrorBoundary>
        <ErrorBoundary><Warunki /></ErrorBoundary>
        <ErrorBoundary><CTA /></ErrorBoundary>
        <ErrorBoundary><BlogPreview /></ErrorBoundary>
        <ErrorBoundary><PoradnikTeaser /></ErrorBoundary>
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
