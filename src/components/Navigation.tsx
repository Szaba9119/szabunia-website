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
          <ThemeToggle />
          <Link
            href="/kontakt"
            className="bg-gradient-to-br from-blue to-blue-light text-white px-5 py-2 rounded-full font-barlow font-semibold text-xs btn-glow"
          >
            Kontakt
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
          role="menu"
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
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const cls = `text-sm font-barlow font-semibold ${
                isActive(link)
                  ? "text-blue dark:text-blue-light"
                  : "text-navy dark:text-white"
              }`;
              return link.page === null ? (
                <a
                  key={link.label}
                  href={`${linkPrefix}${link.href}`}
                  role="menuitem"
                  onClick={() => closeMobileMenu()}
                  className={cls}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  role="menuitem"
                  onClick={() => closeMobileMenu()}
                  className={cls}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/kontakt"
              role="menuitem"
              onClick={() => closeMobileMenu()}
              className="bg-gradient-to-br from-blue to-blue-light text-white px-5 py-3 rounded-xl font-barlow font-semibold text-sm text-center btn-glow"
            >
              Kontakt
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
