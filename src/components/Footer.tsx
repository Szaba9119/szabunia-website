"use client";

export default function Footer() {
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="px-4 pb-8">
      <div className="max-w-6xl mx-auto bg-white border border-border dark:bg-dark-card dark:border-dark-border rounded-[20px] px-8 py-10 md:px-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-barlow font-extrabold text-sm tracking-wide text-navy dark:text-white mb-2">
              MARCIN SZABUNIA
            </div>
            <p className="text-xs text-text-body dark:text-dark-text-muted">
              Fotograf biznesowy & twórca wideo
            </p>
            <p className="text-xs text-text-body dark:text-dark-text-muted">Poznań, Polska</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-0.5 text-xs text-steel dark:text-steel-light">
            {[
              { label: "O mnie", href: "/#o-mnie" },
              { label: "Usługi", href: "/#uslugi" },
              { label: "Portfolio", href: "/#portfolio" },
              { label: "Galeria", href: "/galeria" },
              { label: "Cennik", href: "/#cennik" },
              { label: "Kontakt", href: "/kontakt" },
              { label: "Blog", href: "/blog" },
              { label: "Kalkulator wyceny", href: "/kalkulator" },
              { label: "Poradnik", href: "/poradnik" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="py-1 hover:text-navy dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-0.5 text-xs text-steel dark:text-steel-light">
            <a
              href="tel:+48514900688"
              className="py-1 hover:text-navy dark:hover:text-white transition-colors"
            >
              +48 514 900 688
            </a>
            <a
              href="mailto:marcin@szabunia.pl"
              className="py-1 hover:text-navy dark:hover:text-white transition-colors"
            >
              marcin@szabunia.pl
            </a>
            <a
              href="https://instagram.com/szabunia.biz"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 hover:text-navy dark:hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://share.google/2OMRlIblNmEKlthIl"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 hover:text-navy dark:hover:text-white transition-colors"
            >
              Wizytówka Google
            </a>
          </div>

          {/* Scroll to top */}
          <div className="flex items-start justify-end col-span-2 md:col-span-1">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl border border-border dark:border-dark-border flex items-center justify-center text-steel dark:text-steel-light hover:text-navy dark:hover:text-white hover:border-blue dark:hover:border-white/30 transition-all"
              aria-label="Przewiń do góry"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="border-t border-border dark:border-dark-border mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-steel dark:text-dark-text-muted">
          <span>
            © {new Date().getFullYear()} Marcin Szabunia. Wszelkie prawa
            zastrzeżone.
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
              className="py-1 hover:text-navy dark:hover:text-white transition-colors"
            >
              Ustawienia cookies
            </button>
            <a
              href="/polityka-prywatnosci"
              className="py-1 hover:text-navy dark:hover:text-white transition-colors"
            >
              Polityka prywatności
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
