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

// Sekcje poniżej folda ładowane osobnymi chunkami (SSR zostaje — HTML w pełni
// renderowany; dzielony jest tylko JS hydratacji, co odchudza krytyczny bundle
// na mobile i skraca LCP).
const Equipment = dynamic(() => import("@/components/Equipment"));
const Portfolio = dynamic(() => import("@/components/Portfolio"));
const GaleriaTeaser = dynamic(() => import("@/components/GaleriaTeaser"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const Process = dynamic(() => import("@/components/Process"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Publications = dynamic(() => import("@/components/Publications"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const BlogPreview = dynamic(() => import("@/components/BlogPreview"));
const PoradnikTeaser = dynamic(() => import("@/components/PoradnikTeaser"));
const CTA = dynamic(() => import("@/components/CTA"));

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ile kosztuje sesja?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sesje portretowe zaczynają się od 1 000 zł netto. Konkretną wycenę przygotuję po krótkim briefie. Wycena zależy od liczby osób, lokalizacji i zakresu postprodukcji.",
      },
    },
    {
      "@type": "Question",
      name: "Jak szybko otrzymam gotowe materiały?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standardowy czas oddania zdjęć to 14 dni roboczych, a materiałów wideo do 21 dni. Oferuję również usługę ekspresową (24-48h) za dodatkową opłatą.",
      },
    },
    {
      "@type": "Question",
      name: "Jak wygląda sesja zdjęciowa krok po kroku?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zaczynamy od krótkiego briefu, w którym ustalamy cel, styl i logistykę. Przed sesją przygotowuję poseboard z przykładowymi kadrami. W dniu sesji prowadzę Cię przez pozowanie i dobór ujęć. Po sesji wybierasz zdjęcia z galerii online, a ja zajmuję się retuszem. Gotowe materiały dostajesz w ciągu 14 dni.",
      },
    },
    {
      "@type": "Question",
      name: "Czy mogę zobaczyć zdjęcia przed retuszem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tak. Po sesji udostępniam album ze wszystkimi wykonanymi ujęciami (jako galeria online). Z tego albumu wybierasz zdjęcia, które mają trafić do retuszu i postprodukcji. Dzięki temu masz pełną kontrolę nad tym, które ujęcia trafią do finalnej edycji.",
      },
    },
    {
      "@type": "Question",
      name: "Czy dojeżdżasz poza Poznań?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tak, realizuję zlecenia na terenie całej Polski oraz Europy. Dojazd w Poznaniu: 0 zł. Poza Poznaniem: 2,50 zł netto za kilometr, liczony od granicy miasta w obie strony według Google Maps. Przy dłuższych wyjazdach (powyżej jednego dnia pracy) doliczany jest również nocleg.",
      },
    },
    {
      "@type": "Question",
      name: "Czy przekazujesz surowe pliki RAW?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standardowo nie przekazuję surowych plików RAW. Otrzymujesz starannie wyselekcjonowane i poddane autorskiej postprodukcji materiały. Przekazanie plików RAW jest możliwe tylko przy specjalnych ustaleniach licencyjnych.",
      },
    },
    {
      "@type": "Question",
      name: "Czy mogę użyć zdjęć na LinkedIn / stronie / w reklamie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tak. Wszystkie licencje obejmują użytek komercyjny: strona www, social media, materiały drukowane, reklama online. Bez limitów czasowych.",
      },
    },
    {
      "@type": "Question",
      name: "Ile osób mogę sfotografować w jeden dzień?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Przy portretach biznesowych fotografuję do 40 osób dziennie (przy setupie studyjnym na miejscu). Każda osoba potrzebuje ok. 10-15 minut.",
      },
    },
    {
      "@type": "Question",
      name: "Co jeśli nie jestem fotogeniczny/a?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Słyszę to bardzo często i za każdym razem efekt pozytywnie zaskakuje. Prowadzę Cię przez całą sesję: pomagam z pozowaniem, ustawiam światło pod Twoją twarz, dbam o naturalny wyraz. W studiu zawsze ustawiam lustro przed modelem, żebyś mógł na bieżąco widzieć siebie i poprawiać drobne detale. Nie musisz być modelem, wystarczy być sobą. Reszta to moja robota.",
      },
    },
    {
      "@type": "Question",
      name: "Czy wystawiam fakturę VAT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tak, jestem czynnym płatnikiem VAT. Płatność realizowana przez platformę Useme (faktura VAT). Termin płatności: 7 dni.",
      },
    },
    {
      "@type": "Question",
      name: "Ile tur poprawek otrzymuję w cenie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zdjęcia: 2 tury poprawek w cenie. Wideo: 3 tury poprawek montażowych w cenie. Każda dodatkowa godzina pracy nad zmianami: 200 zł netto. W praktyce pierwsza tura prawie zawsze wystarcza, bo zależy mi, żeby finalny materiał w 100% odpowiadał Twoim oczekiwaniom.",
      },
    },
    {
      "@type": "Question",
      name: "Jakiego sprzętu używasz do zdjęć i wideo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pracuję na dwóch aparatach Canon R6. Obiektywy: Sigma 20mm f/1.4, Sigma 35mm f/1.4, Sigma 50mm f/1.4, Sigma 70-200mm f/2.8, Tamron 24-70mm f/2.8, Tokina 16-28mm. Oświetlenie studyjne Godox wraz z różnymi modyfikatorami. Dron DJI Mini 5 Pro. Rejestracja dźwięku: Zoom Recorder, Rode Wireless PRO oraz Rode VideoMicro II.",
      },
    },
    {
      "@type": "Question",
      name: "Czy pracujesz z AI w zdjęciach i wideo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tak. Jeżeli projekt tego wymaga, wspieram się narzędziami AI: generowanie grafik, fotomanipulacje, edycje zdjęć, kreatywna postprodukcja wideo. AI traktuję jako rozszerzenie warsztatu, nie zastępstwo dla autorskiego podejścia. Zawsze informuję klienta, w którym miejscu procesu AI zostało użyte.",
      },
    },
  ],
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
        <ErrorBoundary><GaleriaTeaser /></ErrorBoundary>
        <ErrorBoundary><Pricing /></ErrorBoundary>
        <ErrorBoundary><Testimonials /></ErrorBoundary>
        <ErrorBoundary><Publications /></ErrorBoundary>
        <ErrorBoundary><Process /></ErrorBoundary>
        {/* Sprzęt nisko: buduje zaufanie techniczne, ale nie może przerywać
            ścieżki Usługi → Portfolio → Cennik (klient B2B kupuje efekt). */}
        <ErrorBoundary><Equipment /></ErrorBoundary>
        <ErrorBoundary><BlogPreview /></ErrorBoundary>
        <ErrorBoundary><PoradnikTeaser /></ErrorBoundary>
        <ErrorBoundary><FAQ /></ErrorBoundary>
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
