import Link from "next/link";

// Widoczne okruszki + JSON-LD z jednej tablicy (audyt PELNY2907-10).
//
// Powód: dziewięć stron deklarowało `BreadcrumbList` w JSON-LD, a widoczną
// ścieżkę nawigacyjną miał wyłącznie wpis blogowy. Google oczekuje, że dane
// strukturalne opisują to, co użytkownik faktycznie widzi na stronie, więc
// osiem stron wysyłało markup bez pokrycia. Jedna tablica zasilająca oba
// wyjścia zamyka tę klasę rozjazdu na stałe.

export type Crumb = {
  name: string;
  /** Brak `href` = bieżąca strona (ostatni element, bez linku i bez `item` w JSON-LD). */
  href?: string;
};

const SITE = "https://szabunia.pl";

/** JSON-LD BreadcrumbList z tej samej tablicy, którą renderuje komponent. */
export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${SITE}${c.href}` } : {}),
    })),
  };
}

export default function Breadcrumbs({
  items,
  className = "",
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Ścieżka nawigacyjna"
      className={`text-[12px] text-steel dark:text-dark-text-muted ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((c, i) => (
          <li key={c.name} className="flex items-center gap-x-1.5">
            {i > 0 && (
              <span aria-hidden="true" className="text-steel-light dark:text-dark-text-muted">
                /
              </span>
            )}
            {c.href ? (
              <Link
                href={c.href}
                className="hover:text-navy dark:hover:text-white transition-colors"
              >
                {c.name}
              </Link>
            ) : (
              <span className="text-navy dark:text-white" aria-current="page">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
