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
        {/* FAQ zaraz po procesie: obsługa obiekcji, zanim czytelnik dotrze do
            treści nurture (blog/poradnik) i formularza na samym dole
            (brief-23 zad. 3 — wcześniej formularz szedł zaraz po FAQ).
            Warunki współpracy wchłonięte do FAQ jako pytania (decyzja Marcina,
            2026-07-06 noc) — źródło: src/data/faq.ts; osobna sekcja tylko na /galeria.
            Kotwice „od X zł" pełnią rolę cennika poglądowego w kartach usług
            (Services.tsx) wyżej na stronie (brief-22, kasacja sekcji Wycena). */}
        {/* PORADNIK PRZENIESIONY NAD FAQ 10.08.2026 (decyzja Marcina, przegląd
            strony głównej). Wcześniej kolejność ogona brzmiała
            FAQ → blog → poradnik → formularz, czyli lead magnet stał BEZPOŚREDNIO
            przed formularzem kontaktowym.
            To były dwa formularze pod rząd, a darmowy jako pierwszy: kto był już
            gotowy napisać, dostawał po drodze łatwiejszą i tańszą decyzję.
            Zmierzone przed zmianą przy 1280 px: poradnik y=7803, formularz y=8412.

            Teraz: poradnik → FAQ → blog → formularz. Poradnik zbiera tych, którzy
            odpadli wcześniej, a ogon strony kończy się na obsłudze obiekcji
            i wezwaniu do kontaktu.

            ⚠ Częściowo dotyka ustalenia z brief-23 („FAQ zaraz po procesie, przed
            treścią nurture"). FAQ nadal stoi przed blogiem, więc sens tamtej
            decyzji się broni, ale poradnik wyprzedza teraz FAQ.
            Aby cofnąć: przenieś `PoradnikTeaser` z powrotem między `BlogPreview`
            a `CTA`. Treść poradnika nietknięta. */}
        <ErrorBoundary><PoradnikTeaser /></ErrorBoundary>
        <ErrorBoundary><FAQ /></ErrorBoundary>
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
