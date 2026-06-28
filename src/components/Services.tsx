"use client";

import Link from "next/link";
import Image from "next/image";
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
              Czym mogę pomóc Twojej firmie
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            Kompleksowe usługi foto i wideo dla firm.
          </p>
        </AnimatedSection>

        {/* Usługi — grid 3×2 */}
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {serviceItems.map((s) => (
              <div
                key={s.title}
                className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border hover:border-blue dark:hover:border-blue transition-all hover:-translate-y-0.5 group overflow-hidden"
              >
                <Link href={`/uslugi/${s.slug}`} className="block">
                  {s.image && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-border dark:bg-dark-border">
                      <Image
                        src={s.image}
                        alt={`${s.title} — przykładowa realizacja`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        style={{ objectPosition: s.imagePos }}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {s.slug === "wideo-marketing" && (
                        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/50 flex items-center justify-center text-white shadow-lg">
                            <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true">
                        {s.icon}
                      </div>
                      <h3 className="font-barlow font-bold text-base text-navy dark:text-white">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-steel dark:text-dark-text-muted text-[13px] leading-relaxed mb-3">
                      {s.desc}
                    </p>
                    <p className="text-blue dark:text-blue-light text-[12px] font-barlow font-semibold">
                      {s.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
