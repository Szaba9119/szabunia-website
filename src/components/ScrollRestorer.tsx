"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Twardy reset scrolla na górę przy zmianie podstrony.
 *
 * Powód: `scroll-smooth` na <html> sprawia, że domyślny reset scrolla
 * Next.js po nawigacji jest animowany, a animacja wejścia strony
 * (template.tsx) go przerywa — użytkownik ląduje na dole nowej podstrony.
 * behavior: "instant" omija CSS scroll-behavior, więc kotwice (#kontakt itd.)
 * dalej scrollują płynnie.
 */
export default function ScrollRestorer() {
  const pathname = usePathname();

  useEffect(() => {
    // Nawigacja z kotwicą (np. /#kontakt z podstrony) — zostaw przeglądarce.
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
