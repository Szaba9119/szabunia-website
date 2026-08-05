"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Granica błędu dla segmentu: wyjątek w komponencie serwerowym dawał dotąd
// niebrandowany ekran „Application error" — białą stronę bez nawigacji, bez
// telefonu i bez CTA (audyt PELNY2608-30). Telefon zostaje na widoku, bo to
// dominujący kanał kontaktu i jedyne wyjście, gdy strona nie chce się złożyć.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ALERT] Błąd segmentu:", error.digest ?? error.message);
  }, [error]);

  return (
    <>
      <Navigation />
      <main id="main" className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="font-barlow font-black text-[96px] leading-none text-blue/20 dark:text-blue-light/20 mb-2">
            Ups
          </div>
          <h1 className="font-barlow font-extrabold text-2xl text-navy dark:text-white mb-3">
            Coś się zacięło po mojej stronie
          </h1>
          <p className="text-steel dark:text-dark-text-muted text-[15px] mb-8">
            Ta strona nie chciała się wczytać. Spróbuj jeszcze raz, a jeśli to nie
            pomoże, napisz albo zadzwoń: odpowiadam w 24h.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]"
            >
              Spróbuj ponownie
            </button>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 border border-border dark:border-dark-border text-navy dark:text-white px-7 py-3.5 rounded-xl font-barlow font-semibold text-[15px] hover:border-blue dark:hover:border-blue transition-colors"
            >
              Kontakt
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { href: "/", label: "Strona główna" },
              { href: "/uslugi", label: "Usługi" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/blog", label: "Blog" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-barlow font-semibold text-steel dark:text-dark-text-muted hover:text-blue dark:hover:text-blue-light transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
