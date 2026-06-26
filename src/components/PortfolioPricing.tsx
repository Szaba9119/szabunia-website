"use client";

import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import type { PricingTier, PricingTable } from "@/data/portfolio";

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-blue dark:text-blue-light flex-shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

interface TiersProps {
  tiers: PricingTier[];
}

function PricingTiers({ tiers }: TiersProps) {
  return (
    <div className={`grid grid-cols-1 ${tiers.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-3"} gap-4`}>
      {tiers.map((tier, i) => (
        <AnimatedSection key={tier.name} delay={i * 0.1}>
          <div
            className={`bg-white dark:bg-dark-card rounded-2xl p-6 h-full flex flex-col relative ${
              tier.recommended
                ? "border-2 border-blue dark:border-blue-light shadow-lg shadow-blue/5"
                : "border border-border dark:border-dark-border"
            }`}
          >
            {tier.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue text-white px-3 py-0.5 rounded-full text-[10px] font-barlow font-bold uppercase tracking-wider">
                Rekomendowany
              </div>
            )}
            <h4 className="font-barlow font-bold text-lg text-navy dark:text-white mb-1">
              {tier.name}
            </h4>
            <div
              className={`font-barlow font-extrabold mb-6 text-blue dark:text-blue-light ${
                tier.recommended ? "text-4xl" : "text-3xl"
              }`}
            >
              {tier.price}
            </div>
            <ul
              className={`space-y-3 text-[13px] mb-6 flex-grow ${
                tier.recommended
                  ? "text-navy dark:text-white"
                  : "text-steel dark:text-dark-text-muted"
              }`}
            >
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckIcon /> {f}
                </li>
              ))}
            </ul>
            {tier.extra && (
              <p className="text-[11px] text-steel dark:text-dark-text-muted pt-4 border-t border-border dark:border-dark-border">
                {tier.extra}
              </p>
            )}
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}

interface TableProps {
  tables: PricingTable[];
}

function PricingTables({ tables }: TableProps) {
  return (
    <div className={`grid grid-cols-1 ${tables.length > 1 ? "lg:grid-cols-2" : ""} gap-4`}>
      {tables.map((table, i) => (
        <AnimatedSection key={table.title} delay={i * 0.1}>
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 border border-border dark:border-dark-border h-full">
            <h3 className="font-barlow font-bold text-lg text-navy dark:text-white mb-6 pb-3 border-b border-border dark:border-dark-border">
              {table.title}
            </h3>
            <div className="space-y-4 text-[13px] text-steel dark:text-dark-text-muted">
              {table.note && (
                <div className="bg-blue/5 dark:bg-blue-light/5 rounded-xl p-3 text-[12px] text-navy dark:text-white border border-blue/10 dark:border-blue-light/10">
                  {table.note}
                </div>
              )}
              {table.rows.map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span>{row.label}</span>
                  <span className="font-barlow font-bold text-lg text-blue dark:text-blue-light">
                    {row.value}
                  </span>
                </div>
              ))}
              {table.groups?.map((group) => (
                <div key={group.label} className="pt-3 border-t border-border dark:border-dark-border">
                  <p className="text-navy dark:text-white text-[13px] font-semibold mb-2">
                    {group.label}:
                  </p>
                  <div className="space-y-1.5 pl-3 border-l-2 border-blue/30 dark:border-blue-light/30">
                    {group.items.map((item) => (
                      <div key={item.label} className="flex justify-between items-baseline gap-3">
                        <span>{item.label}</span>
                        <span className="font-barlow font-semibold text-blue dark:text-blue-light whitespace-nowrap">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {table.footerRows?.map((row) => (
                <div key={row.label} className="bg-blue/5 dark:bg-blue-light/5 rounded-xl p-4 border border-blue/10 dark:border-blue-light/10">
                  <div className="flex justify-between items-start gap-3">
                    <span className="text-navy dark:text-white font-semibold">{row.label}</span>
                    <span className="font-barlow font-extrabold text-xl text-blue dark:text-blue-light whitespace-nowrap">
                      {row.value}
                    </span>
                  </div>
                  {row.note && (
                    <p className="text-[11px] text-steel dark:text-dark-text-muted mt-1">{row.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}

interface Props {
  pricingType: "tiers" | "table";
  tiers?: PricingTier[];
  tables?: PricingTable[];
  note?: string;
}

export default function PortfolioPricing({ pricingType, tiers, tables, note }: Props) {
  if (!tiers?.length && !tables?.length) return null;
  return (
    <section id="cennik" className="py-12 md:py-16 px-4 bg-gray-bg dark:bg-dark-bg">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[40px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Cennik
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            Wszystkie ceny są kwotami netto (+23% VAT), faktura VAT przez Useme.
          </p>
        </AnimatedSection>

        {pricingType === "tiers" && tiers && <PricingTiers tiers={tiers} />}
        {pricingType === "table" && tables && <PricingTables tables={tables} />}

        {note && (
          <AnimatedSection>
            <p className="text-center text-[13px] text-steel dark:text-dark-text-muted mt-8">
              {note}
            </p>
          </AnimatedSection>
        )}

        <AnimatedSection>
          <p className="text-center text-[12px] text-steel dark:text-dark-text-muted mt-6">
            Dojazd: Poznań i okolice 0 zł. Poza Poznaniem: 2,50 zł/km netto, liczone od granicy miasta w obie strony.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
