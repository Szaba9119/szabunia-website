"use client";

import { useState, useEffect, useRef, useCallback, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useScrolledPast } from "@/hooks/useScrollPosition";
import { useActiveSection } from "@/hooks/useActiveSection";

// Kolejność linków = kolejność sekcji na stronie głównej, żeby podświetlenie
// przy scrollu szło od lewej do prawej bez przeskoków.
// type "anchor" = kotwica na home; type "page" = osobna podstrona z sekcją-teaserem na home.
const navLinks = [
  { label: "O mnie", href: "#o-mnie", section: "o-mnie", page: null },
  { label: "Usługi", href: "#uslugi", section: "uslugi", page: null },
  { label: "Portfolio", href: "#portfolio", section: "portfolio", page: null },
  { label: "Galeria", href: "/galeria", section: "galeria", page: "/galeria" },
  { label: "Cennik", href: "#cennik", section: "cennik", page: null },
  { label: "Kalkulator", href: "/kalkulator", section: "kalkulator", page: "/kalkulator" },
  { label: "Blog", href: "/blog", section: "blog", page: "/blog" },
  { label: "Poradnik", href: "/poradnik", section: "poradnik", page: "/poradnik" },
];

// Scroll-spy w kolejności DOM na home; #kontakt domyka listę, żeby podświetlenie
// nie „zamarzało" na ostatniej sekcji.
const sectionIds = [...navLinks.map((l) => l.section), "kontakt"];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Boolean zamiast surowego scrollY: bez re-renderu nawigacji co piksel.
  const scrolled = useScrolledPast(40);

  // Prefix for links: on subpages, prepend "/" so #anchor becomes /#anchor
  const linkPrefix = isHome ? "" : "/";

  // Scroll-spy (IntersectionObserver) — aktywny tylko na stronie głównej, gdzie istnieją sekcje.
  const activeSection = useActiveSection(sectionIds, isHome);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setTimeout(() => hamburgerRef.current?.focus(), 0);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMobileMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen, closeMobileMenu]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobileOpen, closeMobileMenu]);

  // Auto-focus first item when mobile menu opens
  useEffect(() => {
    if (!mobileOpen) return;
    const menu = document.getElementById("mobile-menu");
    const firstItem = menu?.querySelector<HTMLElement>("a, button");
    if (firstItem) firstItem.focus();
  }, [mobileOpen]);

  const isActive = useCallback(
    (link: (typeof navLinks)[number]) =>
      activeSection === link.section ||
      (link.page !== null &&
        (link.page === "/blog" ? pathname.startsWith("/blog") : pathname === link.page)),
    [activeSection, pathname]
  );

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      aria-label="Nawigacja główna"
    >
      <div
        className={`glass max-w-4xl w-full rounded-full px-6 transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? "py-2.5 shadow-lg shadow-navy/5 dark:shadow-black/20 bg-white/90 dark:bg-dark-bg/90"
            : "py-3 shadow-md shadow-navy/[0.03] dark:shadow-black/10"
        }`}
      >
        <Link
          href="/"
          className="font-barlow font-extrabold text-sm tracking-wide text-navy dark:text-white"
        >
          MARCIN SZABUNIA
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => {
            const cls = `text-[13px] transition-colors font-inter ${
              isActive(link)
                ? "text-blue dark:text-blue-light font-semibold"
                : "text-steel hover:text-navy dark:text-dark-text-muted dark:hover:text-white"
            }`;
            return link.page === null ? (
              <a key={link.label} href={`${linkPrefix}${link.href}`} className={cls}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className={cls}>
                {link.label}
              </Link>
            );
          })}
          <a
            href="tel:+48514900688"
            aria-label="Zadzwoń: +48 514 900 688"
            title="+48 514 900 688"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border dark:border-dark-border text-steel hover:text-blue hover:border-blue dark:text-dark-text-muted dark:hover:text-blue-light transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </a>
          <ThemeToggle />
          <Link
            href="/kontakt"
            data-cta="wycena_navbar"
            className="bg-gradient-to-br from-blue to-blue-light text-white px-5 py-2 rounded-full font-barlow font-semibold text-xs btn-glow whitespace-nowrap"
          >
            Zapytaj o wycenę
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`w-5 h-0.5 bg-navy dark:bg-white transition-transform ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-navy dark:bg-white transition-opacity ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-navy dark:bg-white transition-transform ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full mt-2 left-4 right-4 rounded-2xl p-6 md:hidden shadow-xl shadow-navy/10 dark:shadow-black/30 bg-white/95 dark:bg-[rgba(11,15,26,0.96)] backdrop-blur-xl border border-white/25 dark:border-white/[0.08]"
          onKeyDown={(e: ReactKeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Tab") {
              const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
                'a, button, [tabindex]:not([tabindex="-1"])'
              );
              if (focusable.length === 0) return;
              const first = focusable[0];
              const last = focusable[focusable.length - 1];
              if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }
          }}
        >
          <div className="flex flex-col divide-y divide-border dark:divide-white/10">
            {navLinks.map((link) => {
              const active = isActive(link);
              const cls = `flex items-center justify-between py-3.5 text-[15px] font-barlow font-semibold transition-colors ${
                active
                  ? "text-blue dark:text-blue-light"
                  : "text-navy dark:text-white hover:text-blue dark:hover:text-blue-light"
              }`;
              const chevron = (
                <svg className="w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              );
              return link.page === null ? (
                <a
                  key={link.label}
                  href={`${linkPrefix}${link.href}`}
                  onClick={() => closeMobileMenu()}
                  className={cls}
                >
                  {link.label}
                  {chevron}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => closeMobileMenu()}
                  className={cls}
                >
                  {link.label}
                  {chevron}
                </Link>
              );
            })}
          </div>
          <Link
            href="/kontakt"
            data-cta="wycena_navbar"
            onClick={() => closeMobileMenu()}
            className="mt-5 block bg-gradient-to-br from-blue to-blue-light text-white px-5 py-3.5 rounded-xl font-barlow font-semibold text-[15px] text-center btn-glow"
          >
            Zapytaj o wycenę
          </Link>
        </div>
      )}
    </nav>
  );
}
