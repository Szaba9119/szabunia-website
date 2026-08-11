import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories, getServiceBySlug, getPriceFaq, SERVICE_TESTIMONIALS } from "@/data/services";
import { getCategoryBySlug, isPortfolioDraft } from "@/data/portfolio";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import ServiceHero from "@/components/ServiceHero";
import ServiceGalleryStrip from "@/components/ServiceGalleryStrip";
import ServiceApplications from "@/components/ServiceApplications";
import ServiceScope from "@/components/ServiceScope";
import ServiceAuthor from "@/components/ServiceAuthor";
import LogoBar from "@/components/LogoBar";
import YouTubeFacade from "@/components/YouTubeFacade";
import PortfolioProcess from "@/components/PortfolioProcess";
import PortfolioFAQ from "@/components/PortfolioFAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import BlogCard from "@/components/BlogCard";
import PoradnikBlogCTA from "@/components/PoradnikBlogCTA";
import ErrorBoundary from "@/components/ErrorBoundary";
import { getPostsForService } from "@/data/blog";
import { breadcrumbJsonLd, type Crumb } from "@/components/Breadcrumbs";

// Poradnik (lead magnet) dotyczy wyłącznie stylizacji/pozowania do pojedynczego
// portretu — pokazujemy go tylko na stronie portretów i na stronie głównej
// (potwierdzone przez Marcina 2026-07-02, wcześniejsze rozszerzenie na zespoły/
// eventy/wideo było błędne — treść poradnika tego nie obejmuje).
const SHOW_PORADNIK = new Set<string>([
  "wizerunek-portrety",
]);

export function generateStaticParams() {
  return serviceCategories.map((s) => ({ slug: s.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  // OG drona to zdjęcie (JPEG, ~180 KB); pozostałe usługi mają brandowe PNG
  // ze skryptu generate-og-uslugi.py. Poprzedni PNG-foto ważył 1,5 MB (audyt 2026-07-06).
  const ogImage = `/images/og/uslugi/${service.slug}.${slug === "zdjecia-wideo-z-drona" ? "jpg" : "png"}`;
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/uslugi/${service.slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `https://szabunia.pl/uslugi/${service.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${service.title}, Marcin Szabunia`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seo.title,
      description: service.seo.description,
      images: [ogImage],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedPosts = getPostsForService(service.slug, 3);
  const testimonial = SERVICE_TESTIMONIALS[service.slug];
  // Pytanie cenowe zawsze pierwsze w FAQ (brief-22 zad. 4) — ta sama tablica
  // zasila widoczną sekcję i JSON-LD, żeby nie rozjechały się jak wcześniej.
  const faqs = [getPriceFaq(service), ...service.faqs];

  // Realizacje tej usługi, pokazywane pod przyciskiem w połowie podstrony.
  // Podpięcie martwego pola `portfolioSlug` (audyt 11.08.2026, F1): wartości
  // siedziały w danych trzech usług i nic ich nie renderowało. Nazwa bierze się
  // z `portfolioCategories`, więc nie ma drugiej kopii tytułu realizacji.
  // `isPortfolioDraft` odsiewa nieopublikowane, żeby wpis w danych nie mógł
  // wystawić na produkcję case study ukrytego w `DRAFT_SLUGS`.
  const caseLinks = (service.portfolioSlugs ?? [])
    .filter((s) => !isPortfolioDraft(s))
    .map((s) => getCategoryBySlug(s))
    .filter((c) => !!c);

  // Cena startowa usługi (np. "od 1 000 zł") → liczba do JSON-LD Offer.
  const priceMatch = service.price.match(/\d[\d\s]*\d|\d/);
  const startingPrice = priceMatch ? priceMatch[0].replace(/\s/g, "") : undefined;

  // Okruszek bierze `shortTitle`, nie `title` (wariant C decyzji Marcina,
  // 10.08.2026, finding UXUI2608-03). `title` jest dziś pełną nazwą marketingową
  // na kafelki — w okruszku dawał „Strona główna / Usługi / Fotografia i wideo
  // nieruchomości i przemysłu", czyli 45 znaków tam, gdzie ma być nawigacja.
  // Ta sama tablica zasila widoczny `<Breadcrumbs>` i `BreadcrumbList` w JSON-LD,
  // więc zmiana trzyma oba w zgodzie automatycznie.
  const crumbs: Crumb[] = [
    { name: "Strona główna", href: "/" },
    { name: "Usługi", href: "/uslugi" },
    { name: service.shortTitle ?? service.title },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      // Krótka, naturalna nazwa usługi — nie pełna fraza z kafelka i nie H1
      // (wariant C, 10.08.2026). `Service.name` jest nazwą encji, nie nagłówkiem.
      name: service.shortTitle ?? service.title,
      description: service.seo.description,
      provider: { "@id": "https://szabunia.pl/#business" },
      areaServed: ["Poznań", "Polska", "Europa"],
      ...(startingPrice && {
        offers: {
          "@type": "Offer",
          // `price` deklaruje cenę dokładną, a strona podaje wyłącznie kotwice
          // "od X zł" (model "cena na zapytanie"). PriceSpecification z minPrice
          // opisuje to zgodnie z prawdą i nie generuje w Google ceny, której nie ma
          // (audyt PELNY2907-10).
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "PLN",
            minPrice: startingPrice,
            valueAddedTaxIncluded: false,
          },
          availability: "https://schema.org/InStock",
          url: `https://szabunia.pl/uslugi/${service.slug}`,
        },
      }),
    },
    breadcrumbJsonLd(crumbs),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const videoSection = service.videoId ? (
    <ErrorBoundary>
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-barlow font-extrabold text-2xl md:text-[32px] leading-tight tracking-tight text-navy dark:text-white mb-2 text-center">
            Przykładowa realizacja wideo
          </h2>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-8">
            {service.videoNote ?? "Tak wygląda materiał wideo z sesji, na której powstały też zdjęcia."}
          </p>
          <YouTubeFacade id={service.videoId} title={service.videoTitle ?? service.title} className="" />
        </div>
      </section>
    </ErrorBoundary>
  ) : null;

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main">
        <ErrorBoundary>
          <ServiceHero service={service} crumbs={crumbs} />
        </ErrorBoundary>
        {/* Logotypy zaraz pod hero (analiza lejka 2026-08-02). Wcześniej pasek
            wchodził dopiero za galerią i sekcją wideo, czyli na 1 979 px na
            /uslugi/eventy-reportaze. Teraz dowód marki jest w drugim ekranie
            na każdej podstronie, tak jak na desktopowej stronie głównej. */}
        <ErrorBoundary>
          <LogoBar />
        </ErrorBoundary>
        {/* KOLEJNOŚĆ SEKCJI ustalona 10.08.2026 (pakiet 4, decyzja Marcina po
            przedstawieniu argumentu), doprecyzowana tego samego dnia o pozycję
            drugiego paska galerii:
              hero → logotypy → ZASTOSOWANIA → galeria główna → film → ZAKRES
              → galeria dodatkowa → kto to zrobi → jak pracujemy → opinia → FAQ
              → blog → CTA

            Dwie zmiany wobec układu sprzed tej daty:
            1. Doszły dwie sekcje tekstowe: `applications` i `scope`. Obie są
               OPCJONALNE, więc usługi bez tych danych renderują się jak dotąd.
            2. „Zakres realizacji" stoi PO portfolio, nie przed. Powód: to strona
               fotografa. Pytanie „czy on umie" rozstrzygają zdjęcia, a nie akapit
               o zdjęciach, więc między leadem a pierwszym kadrem nie może stać
               kilka bloków tekstu. Ten sam mechanizm zamknął analizę lejka
               z 02.08.2026, która przesunęła pasek logotypów pod hero, bo dowód
               siedział na 1 979 px. „Dla jakich wydarzeń" zostaje wysoko, bo to
               kwalifikacja (dwie krótkie listy), a nie opis usługi. */}
        {service.applications && (
          <ErrorBoundary>
            <ServiceApplications data={service.applications} />
          </ErrorBoundary>
        )}
        {/* Kolejność bloku przykładów (Marcin, 04.08.2026): GŁÓWNY PASEK → FILM
            → DRUGI PASEK, czyli film rozdziela dwie siatki miniatur, zamiast
            stać obok drugiej.
            Wyjątek `videoFirst` (film otwierał blok) USUNIĘTY 10.08.2026: istniał
            wyłącznie dla podstrony „wideo marketing", bo tam film był produktem,
            a nie ilustracją. Ta usługa nie istnieje od migracji na cztery filary
            i żadna z czterech obecnych nie ustawiała tej flagi. */}
        {service.galleryCategory && (
          <ErrorBoundary>
            <ServiceGalleryStrip
              category={service.galleryCategory}
              exclude={service.heroImage}
              secondaryLink={service.gallerySecondaryLink}
            />
          </ErrorBoundary>
        )}
        {videoSection}
        {service.scope && (
          <ErrorBoundary>
            <ServiceScope data={service.scope} />
          </ErrorBoundary>
        )}
        {/* PUNKT WYJŚCIA PO „ZAKRESIE REALIZACJI", 10.08.2026 (audyt aktualnej
            wersji, punkt 4, zgoda Marcina).

            Powód, zmierzony na renderze 1280 px: CTA stały na 9% (hero) i dopiero
            na 59% (po opinii). Między nimi pół strony bez żadnego wyjścia, i to
            akurat ten odcinek, na którym klient ogląda galerie, zakres realizacji
            i kartę autorską, czyli przekonuje się. Na telefonie luki nie było,
            bo łapie ją `MobileFAB` od 200 px scrolla, ale FAB jest `md:hidden`,
            więc desktop zostawał bez niczego. Ten blok siada na ~34%.

            ⚠ WARIANT OBRYSOWANY, nie gradientowy, i to jest celowe. Ta sama klasa
            co przyciski pod paskami galerii („Zobacz całą galerię”), o których
            `ServiceGalleryStrip.tsx` mówi wprost, że mają nie konkurować z głównym
            CTA kontaktowym. Solidny przycisk byłby tu TRZECIM identycznym
            z rzędu i przesuwałby wagę z hero.

            Etykieta świadomie ta sama co w pozostałych punktach: spójność wygrywa
            z wariantowaniem, a `data-cta` i tak rozdziela je w pomiarze. */}
        <div className="px-4 pb-12 flex justify-center">
          <a
            href="#kontakt"
            data-cta="wycena_uslugi_zakres"
            className="inline-flex items-center gap-2 border border-border dark:border-dark-border text-navy dark:text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] hover:border-blue hover:text-blue dark:hover:border-blue-light dark:hover:text-blue-light transition-colors"
          >
            Zapytaj o ofertę
            <span aria-hidden="true">→</span>
          </a>
        </div>
        {/* DRUGI PASEK GALERII PRZESUNIĘTY ZA „ZAKRES REALIZACJI" 10.08.2026
            (decyzja Marcina). Wcześniej stał zaraz po filmie, czyli układ szedł
            galeria główna → film → galeria portretów → zakres.
            Problem był narracyjny, nie wizualny: drugi pasek to INNA kategoria
            (portrety zespołu przy okazji eventu), czyli dosprzedaż, a wchodziła
            w środek wątku o samym wydarzeniu, zanim strona zdążyła powiedzieć,
            co w ogóle obejmuje usługa.
            Teraz: dowód usługi podstawowej → co dokładnie obejmuje → dopiero
            potem „przy okazji możemy zrobić też portrety zespołu".
            Aby cofnąć: przenieś ten blok z powrotem nad `service.scope`. */}
        {service.extraGallery && (
          <ErrorBoundary>
            <ServiceGalleryStrip
              category={service.extraGallery.category}
              ctaLabel={service.extraGallery.ctaLabel}
              href={service.extraGallery.href}
              sub={service.extraGallery.sub}
              exclude={service.heroImage}
              secondaryLink={service.extraGallery.secondaryLink}
            />
          </ErrorBoundary>
        )}
        {/* Blok autorski: pierwszy raz na podstronach usług pada „Cześć, jestem
            Marcin" (analiza lejka 2026-08-02). About.tsx renderuje się wyłącznie
            na stronie głównej, więc wchodzący z reklamy nie wiedział, z kim ma
            do czynienia. Karta wchłonęła liczby z <TrustStats />, żeby nie
            wydłużać strony o cały nowy ekran. Dane nadal z jednego źródła
            (TRUST_STATS w TrustStats.tsx). Sam komponent TrustStats nie jest już
            nigdzie renderowany, ale plik zostaje: usunięcie to osobna decyzja. */}
        <ErrorBoundary>
          <ServiceAuthor />
        </ErrorBoundary>
        <ErrorBoundary>
          <PortfolioProcess steps={service.process} heading={service.h2Process} />
        </ErrorBoundary>
        {testimonial && (
          <ErrorBoundary>
            <section className="py-12 md:py-16 px-4">
              <figure className="max-w-3xl mx-auto bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-8 md:p-10 text-center">
                <div className="text-blue dark:text-blue-light text-sm mb-4" role="img" aria-label="Ocena: 5 na 5 gwiazdek">
                  ★★★★★
                </div>
                <blockquote className="text-navy dark:text-white text-lg md:text-xl leading-relaxed font-inter italic mb-6">
                  &bdquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <div className="font-barlow font-bold text-[14px] text-navy dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-[12px] text-steel dark:text-dark-text-muted">
                    {testimonial.role}
                  </div>
                </figcaption>
              </figure>
            </section>
          </ErrorBoundary>
        )}
        <div className="px-4 pt-4 pb-12 text-center">
          <a
            href="#kontakt"
            data-cta="wycena_uslugi"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue text-white px-6 py-3 rounded-xl font-barlow font-bold text-[14px] btn-glow hover:scale-[1.02] transition-transform"
          >
            Zapytaj o ofertę
            <span className="text-white/80">→</span>
          </a>
          {/* Realizacje tej usługi (11.08.2026). Doklejone do istniejącego bloku
              CTA, bez nowej sekcji, lustro `serviceLink` na case studies:
              tam realizacja prowadzi do usługi, tu usługa prowadzi do realizacji.

              Każda realizacja to OSOBNY link z własną nazwą, nie wspólne
              „Zobacz przykładową realizację" (decyzja Marcina, wariant B):
              przy dwóch realizacjach użytkownik ma wiedzieć, co otwiera.
              Nazwy z `label` w `portfolio.ts`, czyli te same, które stoją
              na kaflach `/portfolio`. */}
          {caseLinks.length > 0 && (
            <div className="mt-5 flex flex-col items-center gap-2">
              <span className="text-[12px] text-steel dark:text-dark-text-muted">
                {caseLinks.length > 1 ? "Przykładowe realizacje" : "Przykładowa realizacja"}
              </span>
              {caseLinks.map((c) => (
                <Link
                  key={c.slug}
                  href={`/portfolio/${c.slug}`}
                  data-cta="case_z_uslugi"
                  className="inline-flex items-center gap-1.5 text-[13px] font-barlow font-semibold text-blue dark:text-blue-light hover:gap-2.5 transition-all"
                >
                  {c.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <ErrorBoundary>
          <PortfolioFAQ faqs={faqs} heading={service.h2Faq} />
        </ErrorBoundary>
        {relatedPosts.length > 0 && (
          <ErrorBoundary>
            <section className="py-12 md:py-16 px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-barlow font-extrabold text-2xl md:text-[32px] leading-tight tracking-tight text-navy dark:text-white mb-2 text-center">
                  Z bloga
                </h2>
                <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-8">
                  Praktyczne porady powiązane z tą usługą.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {relatedPosts.map((p) => (
                    <BlogCard key={p.slug} post={p} />
                  ))}
                </div>
              </div>
            </section>
          </ErrorBoundary>
        )}
        {/* Poradnik między „Z bloga" a formularzem (brief-23 zad. 3;
            wcześniej: przed FAQ). */}
        {SHOW_PORADNIK.has(service.slug) && (
          <ErrorBoundary>
            <section className="pb-12 md:pb-16 px-4">
              <div className="max-w-3xl mx-auto">
                <PoradnikBlogCTA />
              </div>
            </section>
          </ErrorBoundary>
        )}
        <ErrorBoundary>
          <CTA heading={service.ctaHeading} defaultService={service.formServiceCode} />
        </ErrorBoundary>
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
