"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Opóźnienie wjazdu w sekundach (jak wcześniej w framer-motion). */
  delay?: number;
}

// Wjazd sekcji przy wejściu w widok — czysty CSS + IntersectionObserver.
// Klasę .is-visible dodajemy bezpośrednio na elemencie (bez useState), żeby
// uniknąć dodatkowego re-renderu. Zastępuje framer-motion (whileInView).
export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Brak IntersectionObserver (bardzo stare środowiska) → pokaż od razu.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
