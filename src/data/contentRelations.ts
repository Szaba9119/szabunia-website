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
};
