// Dowody pochodzą z publicznych realizacji w portfolio.ts. Bez wpisów draft.
export const serviceCaseMap: Record<string, string> = {
  'wizerunek-portrety': 'idcom-headshoty-zespolu',
  'eventy-reportaze': 'woohoo-autopay',
  'nieruchomosci-przemysl': 'yes-butcher-przewodnik-michelin',
  'fotografia-produktowa': 'artech-fotografia-produktowa',
};
export const publicCaseSlugs = Object.values(serviceCaseMap);
export const postCaseOverrides: Record<string, string> = {
  'fotografia-przemyslowa-fabryka': 'artech-fotografia-produktowa',
  // SEO2609-10 (14.09.2026): wpisy o filmie mapują się na wizerunek, więc
  // dostawały case z headshotami IDcom. Woohoo to jedyna publiczna realizacja wideo.
  'ile-kosztuje-film-promocyjny': 'woohoo-autopay',
  'wideo-marketing-dla-firm-formaty': 'woohoo-autopay',
};
