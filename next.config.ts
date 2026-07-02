import type { NextConfig } from "next";

// 'unsafe-eval' jest wymagany tylko przez tooling dev (source maps / HMR Next.js).
// W produkcji zaden uzywany skrypt (gtag, Turnstile, framer-motion, Vercel Analytics)
// nie potrzebuje eval — usuniecie zaweza powierzchnie XSS.
const isDev = process.env.NODE_ENV === "development";

// 'unsafe-inline' w script-src zostaje SWIADOMIE: proba wydzielenia 2 inline
// skryptow (consent-mode init, dark-mode flash-prevention) do public/*.js +
// next/script strategy="beforeInteractive" zweryfikowana 2026-07-02 jako
// niedzialajaca w tej konfiguracji (Turbopack) — plik sie fetchuje (200 OK),
// ale nigdy nie wykonuje (dataLayer i dark mode przestaja dzialac). Cofniete.
// Alternatywa (nonce w middleware) wymagalaby headers() w layout = cala strona
// traci static rendering — gorszy kompromis niz zostawienie unsafe-inline.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://*.youtube.com https://www.googletagmanager.com https://challenges.cloudflare.com`,
  // Fonty sa self-hostowane przez next/font — domeny Google Fonts celowo usuniete z allowlisty.
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  // Zawezone z "https:": jedyne zewnetrzne obrazy to miniatury YouTube (YouTubeFacade)
  // + ewentualny pixel-fallback GA4.
  "img-src 'self' data: blob: https://i.ytimg.com https://*.google-analytics.com",
  "frame-src https://www.youtube.com https://challenges.cloudflare.com",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://challenges.cloudflare.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // Wartości quality używane w komponentach (Hero 72, About 80, Portfolio/galerie 85, lightbox 90).
    // Next.js 16 wymaga jawnej listy — bez niej wszystko spada do domyślnego [75] z warningiem.
    qualities: [72, 75, 80, 85, 90],
  },
  async headers() {
    return [
      {
        // Zdjęcia z public/ — długi cache przeglądarki. Pliki podmieniane są zawsze
        // pod nową nazwą (wersjonowanie nazwą pliku), więc immutable jest bezpieczne.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: csp,
          },
          // Cross-origin isolation (Spectre / window.opener). CORP: same-site
          // blokuje hotlinkowanie zasobow w przegladarkach, nie dotyka crawlerow.
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
        ],
      },
    ];
  },
  async redirects() {
    // Host-based 301 ze starej domeny marcinszabunia.pl (Adobe Portfolio) na szabunia.pl.
    // Mapa ścieżek wg Brief A (PLAN-POPRAWEK-2026-06-09). Aktywne dopiero, gdy DNS
    // starej domeny wskaże na Vercel i domena będzie dodana do projektu.
    const oldHost = [
      { type: "host" as const, value: "(www\\.)?marcinszabunia\\.pl" },
    ];
    // Ruch ze starej domeny kierujemy na stronę główną (lejek sprzedażowy),
    // a nie na podstrony usług. Wyjątek: /contact → /kontakt (intencja kontaktowa).
    const oldDomainMap: { source: string; destination: string }[] = [
      { source: "/strona-glowna", destination: "https://szabunia.pl/" },
      { source: "/portrety-biznesowe", destination: "https://szabunia.pl/" },
      { source: "/fotografia-eventowa", destination: "https://szabunia.pl/" },
      { source: "/zdjecia-produktowe", destination: "https://szabunia.pl/" },
      { source: "/video", destination: "https://szabunia.pl/" },
      { source: "/o-mnie", destination: "https://szabunia.pl/" },
      { source: "/contact", destination: "https://szabunia.pl/kontakt" },
    ];
    return [
      ...oldDomainMap.map((r) => ({ ...r, has: oldHost, permanent: true })),
      {
        // Catch-all reszty starej domeny (w tym /) na stronę główną
        source: "/:path*",
        has: oldHost,
        destination: "https://szabunia.pl/",
        permanent: true,
      },
      {
        // Stara strona sesji prywatnych usunięta — kierujemy na kalkulator (ceny brutto)
        source: "/sesje-prywatne",
        destination: "/kalkulator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
