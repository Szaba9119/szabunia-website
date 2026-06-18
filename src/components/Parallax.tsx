"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { PARALLAX, PARALLAX_MIN_WIDTH } from "@/lib/motion";

interface Props {
  children?: ReactNode;
  className?: string;
  /** Dystans driftu w px (rzeczywisty zakres = 2x). Domyślnie subtelny. */
  distance?: number;
  /** "up" — element dryfuje w górę przy scrollu w dół (klasyczny parallax). */
  direction?: "up" | "down";
}

// Subtelny parallax pionowy bez framer-motion: pasywny listener scrolla +
// requestAnimationFrame, aktywny tylko gdy element jest w widoku. Wyciszony
// poniżej PARALLAX_MIN_WIDTH oraz przy prefers-reduced-motion (jak wcześniej).
export default function Parallax({
  children,
  className = "",
  distance = PARALLAX.subtle,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const d = direction === "up" ? distance : -distance;
    const mqDesktop = window.matchMedia(`(min-width: ${PARALLAX_MIN_WIDTH}px)`);
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Postęp 0..1, gdy element przechodzi przez ekran (start end → end start).
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const y = d - clamped * 2 * d; // od d (wejście) do -d (wyjście)
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });

    const enable = () => {
      if (mqDesktop.matches && !mqReduce.matches) {
        el.style.willChange = "transform";
        io.observe(el);
      } else {
        io.disconnect();
        window.removeEventListener("scroll", onScroll);
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        el.style.transform = "";
        el.style.willChange = "";
      }
    };

    enable();
    mqDesktop.addEventListener("change", enable);
    mqReduce.addEventListener("change", enable);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      mqDesktop.removeEventListener("change", enable);
      mqReduce.removeEventListener("change", enable);
    };
  }, [distance, direction]);

  // useScroll wymagał pozycji != static; zachowujemy ten sam zabezpieczacz, aby
  // transform nie wpływał na layout sąsiadów (relative = zero wpływu).
  const hasPositionClass = /\b(absolute|fixed|sticky|relative)\b/.test(className);

  return (
    <div
      ref={ref}
      className={className}
      style={hasPositionClass ? undefined : { position: "relative" }}
    >
      {children}
    </div>
  );
}
