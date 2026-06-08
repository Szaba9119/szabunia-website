"use client";

import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import { serviceItems } from "@/data/services";

export default function Services() {
  return (
    <section id="uslugi" className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Czym mogę Ci pomóc
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            Kompleksowe usługi foto i wideo dla firm, które traktują wizerunek
            poważnie.
          </p>
        </AnimatedSection>

        {/* Usługi — grid 3×2 */}
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {serviceItems.map((s) => (
              <div
                key={s.title}
                className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border hover:border-blue dark:hover:border-blue transition-all hover:-translate-y-0.5 group"
              >
                <Link href={`/uslugi/${s.slug}`} className="block p-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-pale dark:bg-blue/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">
                    {s.icon}
                  </div>
                  <h3 className="font-barlow font-bold text-base text-navy dark:text-white mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-steel dark:text-dark-text-muted text-[13px] leading-relaxed mb-3">
                    {s.desc}
                  </p>
                  <p className="text-blue dark:text-blue-light text-[12px] font-barlow font-semibold">
                    {s.price}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
