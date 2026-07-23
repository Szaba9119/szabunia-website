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
        {/* Karuzela logotypów: na desktopie zaraz po hero (jak dotąd), na mobile
            dopiero POD sekcją „O mnie" (decyzja Marcina, 2026-07-07 — „tylko na
            mobile"). Dwa wystąpienia z hidden/md:hidden zamiast flex-order, żeby
            nie zależeć od struktury wrapperów ErrorBoundary. */}
        <div className="hidden md:block">
          <ErrorBoundary><LogoBar /></ErrorBoundary>
        </div>
        <ErrorBoundary><About /></ErrorBoundary>
        <div className="md:hidden">
          <ErrorBoundary><LogoBar /></ErrorBoundary>
        </div>
        <ErrorBoundary><Services /></ErrorBoundary>
        <ErrorBoundary><Portfolio /></ErrorBoundary>
        {/* Dowód społeczny i autorytet PRZED ceną: opinie + publikacje budują
            wartość i chęć, zanim klient zobaczy cennik (mniejszy opór cenowy). */}
        <ErrorBoundary><Testimonials /></ErrorBoundary>
        <ErrorBoundary><Publications /></ErrorBoundary>
        <ErrorBoundary><Process /></ErrorBoundary>
        {/* FAQ i formularz zaraz po procesie: obsługa obiekcji → kontakt, bez
            przerywania ścieżki treściami nurture (blog/poradnik idą na koniec).
            Warunki współpracy wchłonięte do FAQ jako pytania (decyzja Marcina,
            2026-07-06 noc) — źródło: src/data/faq.ts; osobna sekcja tylko na /galeria.
            Kotwice „od X zł" pełnią rolę cennika poglądowego w kartach usług
            (Services.tsx) wyżej na stronie (brief-22, kasacja sekcji Wycena). */}
        <ErrorBoundary><FAQ /></ErrorBoundary>
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
