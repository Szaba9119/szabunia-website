"use client";

import AnimatedSection from "./AnimatedSection";

const clients = [
  "H&M",
  "Warner Music",
  "Santander",
  "John Deere",
  "Forte",
  "Woohoo",
];

export default function LogoBar() {
  return (
    <AnimatedSection>
      <section className="py-12 md:py-16">
        <p className="text-center text-xs font-barlow font-semibold uppercase tracking-[1.5px] text-steel-light dark:text-dark-text-muted mb-6">
          Zaufali mi między innymi
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
                className="font-barlow font-extrabold text-2xl md:text-3xl tracking-tight text-steel/70 dark:text-dark-text-muted/70 whitespace-nowrap flex-shrink-0"
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
