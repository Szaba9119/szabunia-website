import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "404 — Strona nie znaleziona | Marcin Szabunia",
  description: "Strona, której szukasz, nie istnieje lub została przeniesiona. Wróć na stronę główną fotografa biznesowego z Poznania.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main id="main" className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="font-barlow font-black text-[120px] leading-none text-blue/20 dark:text-blue-light/20 mb-2">
            404
          </div>
          <h1 className="font-barlow font-extrabold text-2xl text-navy dark:text-white mb-3">
            Strona nie znaleziona
          </h1>
          <p className="text-steel dark:text-dark-text-muted text-[15px] mb-8">
            Przepraszam, ale ta strona nie istnieje. Możliwe, że link jest
            nieaktualny lub adres został wpisany nieprawidłowo.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]"
          >
            ← Wróć na stronę główną
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { href: "/uslugi", label: "Usługi" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/kalkulator", label: "Kalkulator wyceny" },
              { href: "/blog", label: "Blog" },
              { href: "/kontakt", label: "Kontakt" },
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
