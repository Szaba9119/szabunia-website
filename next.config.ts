import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.youtube.com https://www.googletagmanager.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; frame-src https://www.youtube.com https://challenges.cloudflare.com; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://challenges.cloudflare.com; media-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';",
          },
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
