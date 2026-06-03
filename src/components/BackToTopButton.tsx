"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { EASE, DURATION } from "@/lib/motion";

interface Props {
  /** Próg w px, po którym przycisk się pojawia. */
  threshold?: number;
}

export default function BackToTopButton({ threshold = 600 }: Props) {
  const scrollY = useScrollPosition();
  const reduce = useReducedMotion();
  const visible = scrollY > threshold;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Przewiń do góry"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 12 }}
          transition={{ duration: DURATION.fast, ease: EASE }}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center bg-navy/90 dark:bg-dark-card text-white border border-white/10 dark:border-dark-border shadow-lg shadow-navy/20 dark:shadow-black/30 backdrop-blur-sm hover:bg-navy dark:hover:bg-dark-card-hover hover:scale-105 transition-[transform,background-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
