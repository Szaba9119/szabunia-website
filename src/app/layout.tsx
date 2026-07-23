import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import CookieConsent from "@/components/CookieConsent";
import ContactClickTracker from "@/components/ContactClickTracker";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Barlow usunięty (decyzja Marcina, 2026-07-23): ogonek w Ę/ę wyglądał w nim
// nienaturalnie (widoczne zwłaszcza w hero "REALIZUJĘ"). Nagłówki przechodzą
// na Inter Black — jedna rodzina na całej stronie, spójne polskie diakrytyki.
// Utility `font-barlow` w komponentach ZOSTAJE (nazwa historyczna) — token
// --font-barlow w globals.css wskazuje teraz na var(--font-inter).
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-inter",
  // "swap", nie "optional" (brief-23 zad. 1): przy multi-subset foncie każdy
  // unicode-range (latin vs latin-ext) ładuje się osobnym plikiem. Z "optional"
  // przeglądarka na realnym łączu potrafi zdążyć z podstawowym latin w oknie
  // ~100ms, a spóźnić się z latin-ext (polskie znaki) — i już NIGDY nie
  // podmienia fallbacku na Inter dla tych znaków w danej wizycie. Efekt:
  // trwała mieszanka dwóch fontów w jednym słowie (np. w nagłówkach FAQ).
  // "swap" kosztuje krótki, samokorygujący się błysk zamiast trwałego błędu.
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marcin Szabunia — Fotograf biznesowy & twórca wideo | Poznań",
  description:
    "Profesjonalna fotografia biznesowa i wideo marketing dla firm. Portrety biznesowe, eventy, fotografia produktowa. Poznań i cała Polska.",
  metadataBase: new URL("https://szabunia.pl"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Blog — Marcin Szabunia" }],
    },
  },
  openGraph: {
    title: "Marcin Szabunia — Fotograf biznesowy & twórca wideo",
    description:
      "Fotografia i wideo, które budują zaufanie, przyciągają klientów i wzmacniają autorytet na rynku.",
    url: "https://szabunia.pl",
    siteName: "Marcin Szabunia",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/images/marcin-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Marcin Szabunia, fotograf biznesowy Poznań",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcin Szabunia — Fotograf biznesowy & twórca wideo",
    description:
      "Fotografia i wideo, które budują zaufanie, przyciągają klientów i wzmacniają autorytet na rynku.",
    images: ["/images/marcin-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`scroll-smooth ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F9FAFB" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        {/* GA4 (gtag.js) z Consent Mode v2 — domyślnie wszystko denied;
            zgoda nadawana po "Akceptuję" w banerze cookie (CookieConsent.tsx).
            Celowo zwykły <script> w <head>, nie next/script ani @next/third-parties:
            consent default MUSI wykonać się przed załadowaniem gtag.js, a nowych
            paczek nie dodajemy (CLAUDE.md §11). PRÓBA wydzielenia do public/*.js +
            next/script strategy="beforeInteractive" (2026-07-02) zweryfikowana jako
            NIEDZIAŁAJĄCA w tej konfiguracji (Turbopack): plik się fetchuje (200 OK),
            ale nigdy nie wykonuje — dataLayer i dark mode przestają działać. Wycofane.
            'unsafe-inline' w script-src pozostaje świadomie z tego powodu. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
try{if(localStorage.getItem('cookie-consent')==='accepted'){gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});}}catch(e){}
gtag('js',new Date());gtag('config','G-MD8FJ0CZG3');
/* gtag.js (~175 KiB) doładowywany dopiero gdy watek glowny jest wolny lub przy
   pierwszej interakcji — uwalnia main thread i skraca render delay LCP na mobile.
   Consent default + config wyzej wykonuja sie od razu i kolejkuja sie w dataLayer. */
(function(){var loaded=false;function load(){if(loaded)return;loaded=true;var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-MD8FJ0CZG3';document.head.appendChild(s);}
var evs=['scroll','pointerdown','keydown','touchstart','mousemove'];function onev(){evs.forEach(function(e){window.removeEventListener(e,onev);});load();}
evs.forEach(function(e){window.addEventListener(e,onev,{once:true,passive:true});});
if('requestIdleCallback' in window){requestIdleCallback(load,{timeout:6000});}else{setTimeout(load,5000);}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark'}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Marcin Szabunia — Fotograf biznesowy",
              description:
                "Profesjonalna fotografia biznesowa i wideo marketing dla firm. Portrety biznesowe, eventy, fotografia produktowa.",
              url: "https://szabunia.pl",
              telephone: "+48514900688",
              email: "marcin@szabunia.pl",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Poznań",
                addressCountry: "PL",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 52.4064,
                longitude: 16.9252,
              },
              image: "https://szabunia.pl/images/marcin-hero.jpg",
              priceRange: "od 300 zł",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
              // aggregateRating + review[] usunięte świadomie (audyt 2026-07-06,
              // decyzja Marcina): wytyczne Google zabraniają markupu opinii
              // dodawanego przez samą firmę (self-serving reviews) — gwiazdek
              // w SERP i tak by nie było, a markup tworzył ryzyko flagi.
              // Opinie pozostają w widocznej treści strony (Testimonials.tsx).
              sameAs: [
                "https://instagram.com/szabunia.biz",
                "https://share.google/2OMRlIblNmEKlthIl",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Usługi fotograficzne i wideo",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Fotografia biznesowa i portretowa",
                      description:
                        "Portrety biznesowe, headshoty, sesje wizerunkowe dla firm i specjalistów",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Sesje zespołowe",
                      description:
                        "Sesje zdjęciowe dla zespołów, działów, zarządów, na miejscu w biurze lub w studio",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Fotografia produktowa",
                      description:
                        "Zdjęcia produktowe na białym tle, packshoty, fotografia przemysłowa",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Fotografia eventowa",
                      description:
                        "Profesjonalny fotoreportaż z konferencji, gal, eventów firmowych",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Wideo marketing",
                      description:
                        "Filmy rekrutacyjne, wizerunkowe, reklamowe dla firm",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Pakiety Foto + Wideo + Dron",
                      description:
                        "Zdjęcia, wideo i ujęcia z drona z jednego wejścia: spójny materiał bez koordynowania dwóch ekip",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Zdjęcia i wideo z drona",
                      description:
                        "Ujęcia z powietrza: budynki i obiekty firmowe, tereny, eventy i architektura, foto i wideo w 4K",
                    },
                  },
                ],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Marcin Szabunia",
              jobTitle: "Fotograf biznesowy i twórca wideo",
              url: "https://szabunia.pl",
              image: "https://szabunia.pl/images/marcin-hero.jpg",
              description:
                "Profesjonalny fotograf biznesowy i twórca wideo B2B z Poznania. Specjalizacja: portrety biznesowe, fotografia eventowa, wideo marketing, fotografia produktowa. Klienci: H&M, Warner Music Poland, Santander Bank Polska, John Deere, IQOS, Amica, Grupa Forte S.A., Centrum Posnania, Woohoo.",
              email: "marcin@szabunia.pl",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Poznań",
                addressRegion: "Wielkopolska",
                addressCountry: "PL",
              },
              worksFor: {
                "@type": "ProfessionalService",
                name: "Marcin Szabunia — Fotografia biznesowa",
                url: "https://szabunia.pl",
              },
              sameAs: [
                "https://instagram.com/szabunia.biz",
                "https://share.google/2OMRlIblNmEKlthIl",
              ],
              knowsAbout: [
                "Fotografia biznesowa",
                "Portrety wizerunkowe",
                "Fotografia eventowa",
                "Wideo marketing",
                "Fotografia produktowa",
                "Fotografia korporacyjna",
              ],
              award: "Wyróżnienie w konkursie Portret 2022",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Marcin Szabunia — Fotografia biznesowa i wideo",
              url: "https://szabunia.pl",
              inLanguage: "pl-PL",
              description:
                "Strona fotografa biznesowego i twórcy wideo B2B z Poznania. Portfolio, wycena po briefie, oferta w 24h.",
              publisher: {
                "@type": "Person",
                name: "Marcin Szabunia",
                url: "https://szabunia.pl",
              },
            }),
          }}
        />
        {/* Analytics: Plausible or Umami — set NEXT_PUBLIC_ANALYTICS_URL in .env */}
        {process.env.NEXT_PUBLIC_ANALYTICS_URL && (
          <script
            defer
            data-domain="szabunia.pl"
            src={process.env.NEXT_PUBLIC_ANALYTICS_URL}
          />
        )}
      </head>
      <body className="font-inter antialiased bg-gray-bg dark:bg-dark-bg text-navy dark:text-dark-text">
        <a href="#main" className="skip-to-content">
          Przejdź do treści
        </a>
        <ThemeProvider>
          {children}
          <CookieConsent />
          <ContactClickTracker />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
