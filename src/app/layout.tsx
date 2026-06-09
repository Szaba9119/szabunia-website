import type { Metadata } from "next";
import { Barlow, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import CookieConsent from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/next";

const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marcin Szabunia — Fotograf biznesowy & twórca wideo | Poznań",
  description:
    "Profesjonalna fotografia biznesowa i wideo marketing dla firm. Portrety biznesowe, eventy, fotografia produktowa. Poznań i cała Polska.",
  keywords: [
    "fotograf biznesowy poznań",
    "fotografia korporacyjna",
    "portrety biznesowe",
    "wideo marketing",
    "fotografia eventowa",
    "fotografia produktowa",
    "headshoty poznań",
    "fotograf firmowy",
    "sesja wizerunkowa",
  ],
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
      "Fotografia i wideo, które budują zaufanie, przyciągają klientów i wzmacniają Twój autorytet na rynku.",
    url: "https://szabunia.pl",
    siteName: "Marcin Szabunia",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/images/marcin-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Marcin Szabunia — Fotograf biznesowy Poznań",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcin Szabunia — Fotograf biznesowy & twórca wideo",
    description:
      "Fotografia i wideo, które budują zaufanie, przyciągają klientów i wzmacniają Twój autorytet na rynku.",
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
      className={`scroll-smooth ${barlow.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F172A" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t!=='light'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark'}})();`,
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
              priceRange: "1 000 zł - 4 500 zł",
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
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "3",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Maksymilian Chodziak" },
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  reviewBody:
                    "Jak zwykle profesjonalizm w każdym calu. Z Marcinem współpracuję od wielu lat. Serdecznie polecam.",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Natalia Tomczak" },
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  reviewBody:
                    "Marcin to bardzo pozytywny i utalentowany fotograf, miałam przyjemność współpracować z nim wiele razy. Liczę na więcej wspólnych sesji!",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Małgorzata Wagner" },
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  reviewBody:
                    "Zdjęcia były robione na stronę internetową dla firmy. Profesjonalne podejście i ładne zdjęcia.",
                },
              ],
              sameAs: [
                "https://instagram.com/szabunia.biz",
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
                        "Sesje zdjęciowe dla zespołów, działów, zarządów — na miejscu w biurze lub w studio",
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
              sameAs: ["https://instagram.com/szabunia.biz"],
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
                "Strona fotografa biznesowego i twórcy wideo B2B z Poznania. Cennik, portfolio, kalkulator wyceny.",
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
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
