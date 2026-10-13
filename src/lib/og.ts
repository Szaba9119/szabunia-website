// Wspólne pola Open Graph dla wszystkich tras (audyt SEO 14.09.2026, potwierdzone 13.10.2026).
//
// Next.js nie łączy obiektów `openGraph` z layoutu i strony: jeśli strona ma własny
// `openGraph`, zastępuje on cały obiekt z `layout.tsx`. Dlatego `og:locale` i `og:site_name`
// były tylko na stronie głównej (1/42 URL). Każdy `openGraph` zaczyna się od `...OG_DEFAULTS`.
export const OG_DEFAULTS = {
  siteName: "Marcin Szabunia",
  locale: "pl_PL",
} as const;
