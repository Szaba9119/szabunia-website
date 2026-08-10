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
  // Zawezone z "https:": jedyne zewnetrzne obrazy to miniatury YouTube (YouTubeFacade),
  // ewentualny pixel-fallback GA4, i zasoby widgetu Turnstile.
  "img-src 'self' data: blob: https://i.ytimg.com https://*.google-analytics.com https://challenges.cloudflare.com",
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
            value: "public, max-age=31536000, must-revalidate",
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
    // Mapowanie tematyczne, wariant A z docs/sesje/LINKI-I-KATALOGI-2026-07-29.md §3.
    // Decyzja Marcina 2026-07-30, cofa ustalenie z 09.06 („wszystko na stronę główną,
    // lejek sprzedażowy"). Powód: przekierowanie na stronę niepowiązaną tematycznie jest
    // dla Google miękkim błędem 404 i NIE przenosi sygnałów rankingowych, więc osiem lat
    // historii marcinszabunia.pl przepadało. Dowód z GSC (30.07.2026): strona główna stoi
    // na pozycji 11,83, a każda podstrona usługi na 22-46, mimo własnej treści, JSON-LD
    // i 4-10 linków wewnętrznych. Najlepiej radzą sobie dwie podstrony, które nie miały
    // odpowiednika w starej mapie.
    // Kryterium sukcesu: w 8 tygodni rośnie liczba zapytań, na których wyświetlają się
    // podstrony /uslugi/*. Punkt odniesienia w docs/sesje/RANKING-CO-NAPRAWIC-2026-07-30.md §1.
    // Odwracalne jednym commitem.
    const oldDomainMap: { source: string; destination: string }[] = [
      { source: "/strona-glowna", destination: "https://szabunia.pl/" },
      { source: "/portrety-biznesowe", destination: "https://szabunia.pl/uslugi/wizerunek-portrety" },
      { source: "/fotografia-eventowa", destination: "https://szabunia.pl/uslugi/eventy-reportaze" },
      { source: "/zdjecia-produktowe", destination: "https://szabunia.pl/uslugi/fotografia-produktowa" },
      // Cel przepięty 10.08.2026: `/uslugi/wideo-marketing` przestało istnieć przy
      // przejściu na cztery usługi. Bez tej zmiany powstałby łańcuch dwóch 301
      // (stara domena → wideo-marketing → wizerunek), który traci część sygnału.
      { source: "/video", destination: "https://szabunia.pl/uslugi/wizerunek-portrety" },
      { source: "/o-mnie", destination: "https://szabunia.pl/#o-mnie" },
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
        // Stara strona sesji prywatnych usunięta — kierujemy na kontakt
        source: "/sesje-prywatne",
        destination: "/kontakt",
        permanent: true,
      },
      {
        // Kalkulator wyceny usunięty (brief-20, depricing): lejek prowadzi
        // wyłącznie przez formularz kontaktowy.
        source: "/kalkulator",
        destination: "/kontakt",
        permanent: true,
      },
      // Przejście z ośmiu usług na cztery (decyzja Marcina 10.08.2026, na podstawie
      // „FUNDAMENTY FIRMY.md"). Cztery podstrony przestały istnieć, a piąta zmieniła
      // slug. Wszystkie cele są tematycznie pokrewne, więc 301 przenosi sygnały —
      // to ta sama zasada, która stoi za mapowaniem starej domeny wyżej.
      //
      // ⚠ Te adresy są zaindeksowane i mają historię. `sesje-zespolowe` miało
      // 11 linków wewnętrznych, `zdjecia-wideo-z-drona` 7. Nie usuwać tych reguł
      // „bo stare": przekierowanie musi żyć tak długo, jak długo Google pamięta
      // stary adres, czyli praktycznie bezterminowo.
      ...[
        { from: "sesje-zespolowe", to: "wizerunek-portrety" },
        { from: "wideo-marketing", to: "wizerunek-portrety" },
        { from: "pakiety-foto-wideo", to: "eventy-reportaze" },
        { from: "zdjecia-wideo-z-drona", to: "nieruchomosci-przemysl" },
        { from: "wnetrza-obiekty-architektura", to: "nieruchomosci-przemysl" },
      ].map((r) => ({
        source: `/uslugi/${r.from}`,
        destination: `/uslugi/${r.to}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
