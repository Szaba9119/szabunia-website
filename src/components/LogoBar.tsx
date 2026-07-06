"use client";

import AnimatedSection from "./AnimatedSection";

const clients = [
  "H&M",
  "Warner Music",
  "Santander",
  "John Deere",
  "IQOS",
  "Amica",
  "Forte",
  "Centrum Posnania",
  "Woohoo",
];

export default function LogoBar() {
  return (
    <AnimatedSection>
      {/* Mobile py-8: ~90 px treści nie potrzebuje 2×48 px pustki (rytm odstępów,
          2026-07-07). Desktop bez zmian. */}
      <section className="py-8 md:py-16">
        <p className="text-center text-base md:text-lg font-barlow font-semibold uppercase tracking-[1.5px] text-steel dark:text-dark-text-muted mb-6">
          Współpracowałem m.in. z
        </p>
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div
            className="flex gap-12 md:gap-20 items-center w-max motion-safe:animate-[marquee_30s_linear_infinite]"
          >
            {[...clients, ...clients].map((client, i) => (
              <span
                key={i}
                className="font-barlow font-extrabold text-2xl md:text-3xl tracking-tight text-steel dark:text-dark-text-muted whitespace-nowrap flex-shrink-0"
                aria-hidden={i >= clients.length}
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
