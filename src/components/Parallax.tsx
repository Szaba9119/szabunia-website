"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PARALLAX, PARALLAX_MIN_WIDTH } from "@/lib/motion";

interface Props {
  children?: ReactNode;
  className?: string;
  /** Dystans driftu w px (rzeczywisty zakres = 2x). Domyślnie subtelny. */
  distance?: number;
  /** "up" — element dryfuje w górę przy scrollu w dół (klasyczny parallax). */
  direction?: "up" | "down";
}

// Wrapper nadający dziecku subtelny parallax w pionie, gdy przechodzi przez
// ekran. Wyciszony przy prefers-reduced-motion oraz poniżej PARALLAX_MIN_WIDTH.
export default function Parallax({
  children,
  className = "",
  distance = PARALLAX.subtle,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery(`(min-width: ${PARALLAX_MIN_WIDTH}px)`);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const d = direction === "up" ? distance : -distance;
  const y = useTransform(scrollYProgress, [0, 1], [d, -d]);

  const enabled = isDesktop && !prefersReducedMotion;
  // useScroll wymaga, by element-cel miał pozycję != static. Gdy className nie
  // ustawia pozycji, domyślamy relative (zero wpływu na layout).
  const hasPositionClass = /\b(absolute|fixed|sticky|relative)\b/.test(className);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...(enabled ? { y, willChange: "transform" } : null),
        ...(hasPositionClass ? null : { position: "relative" }),
      }}
    >
      {children}
    </motion.div>
  );
}
