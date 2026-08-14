import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
import PricingExplainer from "@/components/PricingExplainer";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileFAB from "@/components/MobileFAB";
import BlogCard from "@/components/BlogCard";
import PoradnikBlogCTA from "@/components/PoradnikBlogCTA";
import SecondaryLink from "@/components/SecondaryLink";
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
  // Każda usługa ma brandowy PNG ze skryptu generate-og-uslugi.py. Wyjątek dla
  // `zdjecia-wideo-z-drona` (JPEG) usunięty 11.08.2026: ten slug przestał być usługą
  // przy przejściu na cztery filary i jest dziś wyłącznie źródłem 301, więc warunek
  // nigdy się nie spełniał.
  // ⚠ Ścieżka jest budowana z sluga, bez sprawdzenia, czy plik istnieje. Nowa usługa
  // bez wygenerowanego PNG przechodzi build, lint i tsc, a kartę linku psuje dopiero
  // na produkcji — tak `nieruchomosci-przemysl` miało og:image na 404 od 10.08.2026
  // (audyt CTR-SERP 11.08, F1). Po dodaniu usługi odpal skrypt.
  const ogImage = `/images/og/uslugi/${service.slug}.png`;
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

  // ⛔ `priceMatch` / `startingPrice` USUNIĘTE 14.08.2026 (depricing).
  // Wyciągały regexem pierwszą liczbę z `service.price` i zasilały `minPrice`
  // w JSON-LD Offer. Po zdjęciu kwot `price` nie zawiera już żadnej liczby,
  // a zostawienie Offer bez ceny deklarowałoby Google ofertę, której strona
  // nie składa. Cały blok `offers` zszedł razem z nimi.

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
            {/* GŁÓWNY PASEK NIE MA `secondaryLink` i to jest stan docelowy, nie luka.
                Pole `gallerySecondaryLink` w `ServiceData` istniało wyłącznie po to,
                żeby zasilić ten prop z danych usługi, a jego jedyny użytkownik
                (odsyłacz do `/portfolio/sesja-wizerunkowa` na wizerunku) zniknął
                razem z C2: ta realizacja stoi dziś w bloku „Przykładowe realizacje".
                Pole usunięte 11.08.2026, żeby nie zostawiać mechanizmu bez zastosowania.
                Poboczne odsyłacze pod DRUGIM paskiem działają dalej, przez
                `extraGallery.secondaryLink` niżej w tym pliku. */}
            <ServiceGalleryStrip
              category={service.galleryCategory}
              exclude={service.heroImage}
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

            ⚠ WARIANT OBRYSOWANY, nie gradientowy, i to nadal jest celowe. Solidny
            przycisk byłby tu TRZECIM gradientem na podstronie i przesuwałby wagę
            z hero, które i tak broni się słabiej, niż się wydaje: hero CTA ma pole
            9 518 px², a przyciski pasków galerii 9 730 i 11 566 px², czyli element
            pierwszego poziomu jest fizycznie MNIEJSZY od dwóch nawigacyjnych.

            ⚠ OBRYS NIEBIESKI ZAMIAST SZAREGO, 11.08.2026 (C3, wariant 1, decyzja
            Marcina po audycie hierarchii CTA). Wcześniej ten przycisk miał dosłownie
            tę samą klasę co „Zobacz całą galerię" pod paskami galerii: ten sam obrys
            `border-border`, ta sama wysokość 47 px, ten sam font 14/700. Jedyny punkt
            konwersji na odcinku 20-64% strony wyglądał więc identycznie jak nawigacja
            do galerii, a oba elementy mieszczą się w jednym oknie: zmierzone odstępy
            to 474 px (nieruchomości), 513 px (wizerunek), 593 px (eventy)
            i 631 px (produktowa), przy oknie 900 px.

            Drugi powód jest czysto techniczny: `border-border` na tle strony ma
            kontrast 1,18 : 1 w motywie jasnym i 1,31 : 1 w ciemnym, czyli ramka
            praktycznie nie istnieje i wariant obrysowany czytał się jako sam
            pogrubiony napis. `border-blue` daje 4,95 : 1.

            Powstaje trzeci szczebel, którego wcześniej nie było:
              gradient          = konwersja główna (hero, przed FAQ, formularz)
              obrys NIEBIESKI   = konwersja poboczna (ten przycisk)
              obrys SZARY       = nawigacja (paski galerii)
            Hover bierze `blue-pale` / `blue/15`, czyli dokładnie tę parę, której
            używa już `MobileFAB.tsx` na ikonach e-mail i telefonu. Zero nowych tokenów.

            ⛔ NIE ROZSZERZAĆ tego wariantu na przyciski pasków galerii. Ich szary
            obrys jest teraz nośnikiem znaczenia „to nawigacja, nie konwersja".

            Etykieta świadomie ta sama co w pozostałych punktach: spójność wygrywa
            z wariantowaniem, a `data-cta` i tak rozdziela je w pomiarze.

            ⚠ `hidden md:flex` DOŁOŻONE 11.08.2026 (audyt UI, finding C6). Blok
            powstał z powodu czysto desktopowego, opisanego dwa akapity wyżej:
            na telefonie tę lukę łapie `MobileFAB` od 200 px scrolla, a FAB jest
            `md:hidden`. Renderował się jednak na wszystkich szerokościach, więc
            przy 390 px użytkownik miał w jednym kadrze obrysowany przycisk
            „Zapytaj o ofertę" i przyklejoną do dołu gradientową pigułkę „Oferta":
            ta sama akcja, dwie etykiety, dwie wagi. Na desktopie bez zmian. */}
        <div className="px-4 pb-12 hidden md:flex justify-center">
          <a
            href="#kontakt"
            data-cta="wycena_uslugi_zakres"
            className="inline-flex items-center gap-2 border border-blue dark:border-blue-light text-blue dark:text-blue-light px-6 py-3 rounded-xl font-barlow font-bold text-[14px] hover:bg-blue-pale dark:hover:bg-blue/15 transition-colors"
          >
            Sprawdź termin i cenę
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
            Sprawdź termin i cenę
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
          {/* ZDJĘTY `gap-2`, 11.08.2026 (audyt UI, finding C4). Zmierzone
              na produkcji przy 390 px przed zmianą: każdy odsyłacz miał 20 px
              wysokości, a sąsiadujące dzieliło 7 px. Cel dotykowy poniżej progu
              24 x 24 px z WCAG 2.5.8, przy dwóch pozycjach jedna pod drugą.
              Wysokość celu daje teraz pionowy padding `SecondaryLink` (45 px),
              i to on odsuwa też pozycje od siebie, dlatego `gap-2` na kontenerze
              musiało zejść: inaczej blok rósłby o kolejne 8 px na pozycję.

              ⛔ NIE ROBIĆ Z TYCH ODSYŁACZY PRZYCISKÓW ANI KART. Sześćdziesiąt
              pikseli wyżej stoi jedyne gradientowe CTA tej części strony i to
              ono ma wygrywać. Decyzja Marcina z 11.08.2026: CTA są przyciskami,
              nawigacja kontekstowa jest linkiem.

              `mt-5` ZOSTAJE bez kompensacji, w odróżnieniu od pozostałych miejsc
              użycia `SecondaryLink`. Ten margines prowadzi do PODPISU, a nie
              do odsyłacza, więc padding linku go nie dotyczy. */}
          {caseLinks.length > 0 && (
            <div className="mt-5 flex flex-col items-center">
              <span className="text-[12px] text-steel dark:text-dark-text-muted">
                {caseLinks.length > 1 ? "Przykładowe realizacje" : "Przykładowa realizacja"}
              </span>
              {caseLinks.map((c) => (
                <SecondaryLink key={c.slug} href={`/portfolio/${c.slug}`} cta="case_z_uslugi">
                  {c.label}
                </SecondaryLink>
              ))}
            </div>
          )}
        </div>
        {/* Blok „Jak powstaje wycena" (14.08.2026, depricing). Stoi TUŻ PRZED FAQ,
            bo pierwszym pytaniem FAQ jest pytanie cenowe: klient dostaje najpierw
            mechanizm i termin odpowiedzi, a zaraz potem czynniki właściwe dla tej
            usługi. `showFactors={false}`, żeby ogólna piątka czynników nie stanęła
            kilka ekranów nad bardziej szczegółowym `pricingBlurb` w FAQ. */}
        <ErrorBoundary>
          <PricingExplainer className="px-4 pt-2 pb-4 max-w-3xl mx-auto" showFactors={false} />
        </ErrorBoundary>
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
