"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";

interface Props {
  /** Próg w px, po którym przycisk się pojawia. */
  threshold?: number;
}

// Przycisk „do góry" bez framer-motion — pojawia się/znika przez toggle klasy
// .is-visible (przejście opacity/transform w globals.css). Zawsze w DOM, ale
// przy ukryciu nieklikalny i poza tabulacją.
export default function BackToTopButton({ threshold = 600 }: Props) {
  const scrollY = useScrollPosition();
  const visible = scrollY > threshold;

  const handleClick = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Przewiń do góry"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`back-to-top ${visible ? "is-visible" : ""} fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center bg-navy/90 dark:bg-dark-card text-white border border-white/10 dark:border-dark-border shadow-lg shadow-navy/20 dark:shadow-black/30 backdrop-blur-sm hover:bg-navy dark:hover:bg-dark-card-hover hover:scale-105 transition-[transform,background-color,opacity] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
