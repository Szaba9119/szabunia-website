"use client";

import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

export interface CaseStudyData {
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
}

export default function PortfolioCaseStudy({ data }: { data: CaseStudyData }) {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-2xl md:text-[36px] leading-tight tracking-tight text-navy dark:text-white mb-8 text-center">
              Case Study
            </h2>
          </Parallax>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Client info */}
          <AnimatedSection className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6">
            <p className="text-[11px] font-barlow font-semibold uppercase tracking-wider text-steel-light dark:text-dark-text-muted mb-2">
              Klient
            </p>
            <p className="font-barlow font-bold text-lg text-navy dark:text-white">
              {data.client}
            </p>
            <p className="text-steel dark:text-dark-text-muted text-[13px] mt-1">
              {data.industry}
            </p>
          </AnimatedSection>

          {/* Challenge */}
          <AnimatedSection
            delay={0.1}
            className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6"
          >
            <p className="text-[11px] font-barlow font-semibold uppercase tracking-wider text-steel-light dark:text-dark-text-muted mb-2">
              Wyzwanie
            </p>
            <p className="text-text-body dark:text-dark-text text-[14px] leading-relaxed">
              {data.challenge}
            </p>
          </AnimatedSection>
        </div>

        {/* Solution */}
        <AnimatedSection
          delay={0.2}
          className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 mb-8"
        >
          <p className="text-[11px] font-barlow font-semibold uppercase tracking-wider text-steel-light dark:text-dark-text-muted mb-2">
            Rozwiązanie
          </p>
          <p className="text-text-body dark:text-dark-text text-[14px] leading-relaxed">
            {data.solution}
          </p>
        </AnimatedSection>

        {/* Results */}
        <AnimatedSection delay={0.3}>
          <div className="bg-navy dark:bg-dark-card rounded-2xl border border-navy-light dark:border-dark-border p-8">
            <p className="text-[11px] font-barlow font-semibold uppercase tracking-wider text-steel-light mb-4 text-center">
              Efekty
            </p>
            <div className={`grid gap-6 ${
              data.results.length === 2 ? "grid-cols-2" :
              data.results.length === 3 ? "grid-cols-3" :
              "grid-cols-2 md:grid-cols-4"
            }`}>
              {data.results.map((r) => (
                <div key={r.label} className="text-center">
                  <p className="font-barlow font-black text-2xl md:text-3xl text-white leading-none mb-1">
                    {r.value}
                  </p>
                  <p className="text-steel-light text-[12px]">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonial */}
        {data.testimonial && (
          <AnimatedSection delay={0.4} className="mt-8">
            <blockquote className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 md:p-8">
              <svg className="w-8 h-8 text-blue/20 dark:text-blue-light/20 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>
              <p className="text-text-body dark:text-dark-text text-[15px] leading-relaxed italic mb-4">
                {data.testimonial.quote}
              </p>
              <footer className="flex items-center gap-3">
                <div>
                  <p className="font-barlow font-bold text-sm text-navy dark:text-white">
                    {data.testimonial.author}
                  </p>
                  <p className="text-steel dark:text-dark-text-muted text-[12px]">
                    {data.testimonial.role}
                  </p>
                </div>
              </footer>
            </blockquote>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
