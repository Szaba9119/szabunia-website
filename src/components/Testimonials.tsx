"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

const testimonials = [
  {
    quote:
      "Jak zwykle profesjonalizm w każdym calu. Z Marcinem współpracuję od wielu lat. Serdecznie polecam.",
    author: "Maksymilian Chodziak",
    meta: "Opinia Google",
    initials: "MC",
  },
  {
    quote:
      "Zdjęcia były robione na stronę internetową dla firmy. Profesjonalne podejście i ładne zdjęcia.",
    author: "Małgorzata Wagner",
    meta: "Opinia Google",
    initials: "MW",
  },
  {
    quote:
      "Marcin to bardzo pozytywny i utalentowany fotograf, miałam przyjemność współpracować z nim wiele razy. Liczę na więcej wspólnych sesji!",
    author: "Natalia Tomczak",
    meta: "Opinia Google",
    initials: "NT",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, currentIndex]
  );

  const next = useCallback(() => {
    goTo((currentIndex + 1) % testimonials.length);
  }, [currentIndex, goTo]);

  const prev = useCallback(() => {
    goTo((currentIndex - 1 + testimonials.length) % testimonials.length);
  }, [currentIndex, goTo]);

  const nextRef = useRef(next);
  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => nextRef.current(), 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const t = testimonials[currentIndex];

  return (
    <section className="py-12 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Co mówią klienci
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            Opinie klientów, z którymi miałem przyjemność współpracować.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div
            className="relative max-w-3xl mx-auto"
            role="region"
            aria-roledescription="karuzela"
            aria-label="Opinie klientów"
            aria-atomic="true"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main testimonial card */}
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-8 md:p-12 min-h-[280px] flex flex-col justify-center relative overflow-hidden">
              {/* Quote decoration */}
              <svg
                className="absolute top-6 right-6 w-16 h-16 text-blue/[0.06] dark:text-blue-light/[0.06]"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
              </svg>

              <div className="sr-only" aria-live="polite" aria-atomic="true">
                Opinia {currentIndex + 1} z {testimonials.length}
              </div>
              <div
                key={currentIndex}
                aria-live="polite"
                style={{
                  animation: "fadeIn 0.4s ease-out",
                }}
              >
                <div className="text-blue dark:text-blue-light text-sm mb-4" role="img" aria-label="Ocena: 5 na 5 gwiazdek">
                  ★★★★★
                </div>
                <blockquote className="text-navy dark:text-white text-lg md:text-xl leading-relaxed mb-8 font-inter italic relative z-10">
                  &bdquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-blue/10 dark:bg-blue-light/10 flex items-center justify-center text-xs font-bold text-blue dark:text-blue-light flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-barlow font-bold text-[14px] text-navy dark:text-white">
                      {t.author}
                    </div>
                    <div className="text-[12px] text-steel dark:text-dark-text-muted">
                      {t.meta}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Reviews link */}
            <div className="mt-6 text-center">
              <a
                href="https://www.google.com/search?q=Marcin+Szabunia+fotograf+Pozna%C5%84+opinie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] text-steel dark:text-dark-text-muted hover:text-blue dark:hover:text-blue-light transition-colors font-barlow font-semibold"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Przeczytaj więcej opinii lub dodaj swoją
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPaused((p) => !p)}
                  className="w-10 h-10 rounded-xl border border-border dark:border-dark-border flex items-center justify-center text-steel dark:text-dark-text-muted hover:text-blue dark:hover:text-blue-light hover:border-blue dark:hover:border-blue-light transition-all"
                  aria-label={isPaused ? "Wznów automatyczne przewijanie" : "Zatrzymaj automatyczne przewijanie"}
                >
                  {isPaused ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                  )}
                </button>
                <button
                  onClick={prev}
                  disabled={isAnimating}
                  className="w-10 h-10 rounded-xl border border-border dark:border-dark-border flex items-center justify-center text-steel dark:text-dark-text-muted hover:text-blue dark:hover:text-blue-light hover:border-blue dark:hover:border-blue-light transition-all disabled:opacity-50"
                  aria-label="Poprzednia opinia"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={next}
                  disabled={isAnimating}
                  className="w-10 h-10 rounded-xl border border-border dark:border-dark-border flex items-center justify-center text-steel dark:text-dark-text-muted hover:text-blue dark:hover:text-blue-light hover:border-blue dark:hover:border-blue-light transition-all disabled:opacity-50"
                  aria-label="Następna opinia"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Pagination dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-400 ${
                      i === currentIndex
                        ? "bg-blue dark:bg-blue-light w-6"
                        : "bg-border dark:bg-dark-border w-2 hover:bg-steel-light dark:hover:bg-dark-text-muted"
                    }`}
                    aria-label={`Przejdź do opinii ${i + 1}`}
                    aria-current={i === currentIndex ? "step" : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
