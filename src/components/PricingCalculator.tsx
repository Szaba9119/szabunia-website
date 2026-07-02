"use client";

import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { serviceItems } from "@/data/services";
import { gtagEvent } from "@/lib/gtag";

type ServiceSlug =
  | "wizerunek-portrety"
  | "sesje-zespolowe"
  | "fotografia-produktowa"
  | "eventy-reportaze"
  | "wideo-marketing"
  | "pakiety-foto-wideo"
  | "zdjecia-wideo-z-drona";

type PriceMode = "netto" | "brutto";

interface CalcConfig {
  // wizerunek-portrety
  portraitPackage?: "essential" | "professional" | "pro-branding";
  extraPhotos?: number;
  // sesje-zespolowe
  teamSize?: number;
  teamExtraPhotosPerPerson?: number;
  studioSetup?: boolean;
  externalStudio?: "" | "2h" | "4h" | "unlimited";
  // fotografia-produktowa
  productCount?: number;
  productType?: "packshot" | "creative-web" | "creative-print";
  // eventy-reportaze
  eventHours?: number;
  liveEditCount?: number;
  eventDrone?: boolean;
  eventExpress?: boolean;
  // wideo-marketing
  operatorHours?: number;
  videoPackage?: "xs" | "s" | "m" | "l" | "xl";
  // pakiety-foto-wideo
  comboPackage?: "essentials" | "pro" | "premium";
  extraComboHours?: number;
  // zdjecia-wideo-z-drona
  dronePackage?: "foto" | "przebitki" | "wideo" | "foto-przebitki" | "foto-wideo";
  droneExtraHours?: number;
}

const defaultConfig: CalcConfig = {
  portraitPackage: "professional",
  extraPhotos: 0,
  teamSize: 10,
  teamExtraPhotosPerPerson: 0,
  studioSetup: true,
  externalStudio: "",
  productCount: 20,
  productType: "packshot",
  eventHours: 4,
  liveEditCount: 0,
  eventDrone: false,
  eventExpress: false,
  operatorHours: 2,
  videoPackage: "s",
  comboPackage: "essentials",
  extraComboHours: 0,
  dronePackage: "foto-wideo",
  droneExtraHours: 0,
};

function calculatePrice(slug: ServiceSlug, config: CalcConfig): number {
  switch (slug) {
    case "wizerunek-portrety": {
      const base = config.portraitPackage === "essential" ? 1000 : config.portraitPackage === "professional" ? 1300 : 1800;
      const extraRate = config.portraitPackage === "essential" ? 120 : config.portraitPackage === "professional" ? 100 : 80;
      return base + (config.extraPhotos ?? 0) * extraRate;
    }
    case "sesje-zespolowe": {
      const size = config.teamSize ?? 10;
      const perPerson = size <= 10 ? 150 : size <= 30 ? 120 : 100;
      let total = size * perPerson;
      // Dodatkowe ujęcia na osobę: 80 zł/szt. (poza 1 retuszem w stawce os.)
      total += (config.teamExtraPhotosPerPerson ?? 0) * 80 * size;
      if (config.studioSetup) total += 450;
      if (config.externalStudio === "2h") total += 300;
      else if (config.externalStudio === "4h") total += 400;
      else if (config.externalStudio === "unlimited") total += 800;
      return total;
    }
    case "fotografia-produktowa": {
      const count = config.productCount ?? 20;
      if (config.productType === "packshot") {
        const perItem = count <= 20 ? 90 : count <= 50 ? 70 : 55;
        return Math.max(500, count * perItem);
      }
      if (config.productType === "creative-web") return count * 200;
      return count * 600; // creative-print
    }
    case "eventy-reportaze": {
      const hours = config.eventHours ?? 4;
      // Stawka godzinowa z pakietami: 4h = 1600 (taniej niż 4×godz. = 1800),
      // pakiet całodniowy 8h = 2800.
      let total: number;
      if (hours <= 1) total = 600;
      else if (hours <= 3) total = 600 + (hours - 1) * 400;
      else total = 1600 + (hours - 4) * 400;
      if (hours >= 8) total = 2800;
      total += (config.liveEditCount ?? 0) * 20;
      if (config.eventDrone) total += 200;
      if (config.eventExpress) total *= 1.5;
      return Math.round(total);
    }
    case "wideo-marketing": {
      const opHours = config.operatorHours ?? 2;
      let total = opHours <= 1 ? 400 : 400 + (opHours - 1) * 200;
      const packages: Record<string, number> = { xs: 300, s: 600, m: 900, l: 1400, xl: 1800 };
      total += packages[config.videoPackage ?? "s"] ?? 0;
      return total;
    }
    case "pakiety-foto-wideo": {
      const base = config.comboPackage === "essentials" ? 1800 : config.comboPackage === "pro" ? 3200 : 4500;
      return base + (config.extraComboHours ?? 0) * 350;
    }
    case "zdjecia-wideo-z-drona": {
      const dronePrices: Record<string, number> = { foto: 600, przebitki: 500, wideo: 900, "foto-przebitki": 700, "foto-wideo": 1100 };
      const base = dronePrices[config.dronePackage ?? "foto-wideo"] ?? 600;
      return base + (config.droneExtraHours ?? 0) * 300;
    }
    default:
      return 0;
  }
}

/** Formatuje cenę w trybie netto/brutto */
function fmtPrice(netto: number, mode: PriceMode): string {
  const value = mode === "brutto" ? Math.round(netto * 1.23) : netto;
  return value.toLocaleString("pl-PL");
}

/** Przelicza "od X zł / ..." na netto/brutto, zachowując prefiks i sufiks (/ h, / os., / szt.). */
function formatCardPrice(priceStr: string, mode: PriceMode): string {
  const match = priceStr.match(/\d[\d\s]*/);
  if (!match) return priceStr;
  const netto = parseInt(match[0].replace(/\s/g, ""), 10);
  if (!netto) return priceStr;
  const value = mode === "brutto" ? Math.round(netto * 1.23) : netto;
  return priceStr.replace(match[0], value.toLocaleString("pl-PL"));
}

function PriceModeToggle({ mode, onChange }: { mode: PriceMode; onChange: (m: PriceMode) => void }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative inline-grid grid-cols-2 bg-white dark:bg-dark-card rounded-xl border border-border dark:border-dark-border p-1">
        <div
          className={`absolute top-1 bottom-1 rounded-lg bg-blue transition-all duration-300 ease-out ${
            mode === "netto" ? "left-1 w-[calc(50%-4px)]" : "left-[calc(50%+2px)] w-[calc(50%-4px)]"
          }`}
        />
        <button
          onClick={() => onChange("netto")}
          className={`relative z-10 px-4 py-2 rounded-lg text-[12px] font-barlow font-bold whitespace-nowrap text-center transition-colors duration-200 ${
            mode === "netto" ? "text-white" : "text-steel dark:text-dark-text-muted"
          }`}
        >
          Netto
        </button>
        <button
          onClick={() => onChange("brutto")}
          className={`relative z-10 px-4 py-2 rounded-lg text-[12px] font-barlow font-bold whitespace-nowrap text-center transition-colors duration-200 ${
            mode === "brutto" ? "text-white" : "text-steel dark:text-dark-text-muted"
          }`}
        >
          Brutto (z VAT)
        </button>
      </div>
    </div>
  );
}

function ServiceOptions({
  slug,
  config,
  onChange,
  mode,
}: {
  slug: ServiceSlug;
  config: CalcConfig;
  onChange: (c: CalcConfig) => void;
  mode: PriceMode;
}) {
  const labelClass = "block text-[13px] font-barlow font-semibold text-navy dark:text-white mb-1.5";
  const inputClass =
    "w-full bg-white dark:bg-dark-bg border border-border dark:border-dark-border rounded-xl px-4 py-2.5 text-sm text-navy dark:text-dark-text focus:border-blue dark:focus:border-blue-light";
  const selectClass = inputClass + " appearance-none";

  switch (slug) {
    case "wizerunek-portrety":
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Pakiet</label>
            <select
              className={selectClass}
              value={config.portraitPackage}
              onChange={(e) => onChange({ ...config, portraitPackage: e.target.value as CalcConfig["portraitPackage"] })}
            >
              <option value="essential">Portret Standard ({fmtPrice(1000, mode)} zł)</option>
              <option value="professional">Portret Professional ({fmtPrice(1300, mode)} zł)</option>
              <option value="pro-branding">Portret Premium ({fmtPrice(1800, mode)} zł)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Dodatkowe ujęcia</label>
            <input
              type="number"
              min={0}
              max={50}
              className={inputClass}
              value={config.extraPhotos ?? 0}
              onChange={(e) => onChange({ ...config, extraPhotos: Math.max(0, parseInt(e.target.value) || 0) })}
            />
          </div>
        </div>
      );

    case "sesje-zespolowe":
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Liczba osób</label>
            <input
              type="number"
              min={4}
              max={100}
              className={inputClass}
              value={config.teamSize ?? 10}
              onChange={(e) => onChange({ ...config, teamSize: Math.max(4, parseInt(e.target.value) || 4) })}
            />
            <p className="text-[12px] text-steel dark:text-dark-text-muted mt-1.5">
              Sesje zespołowe realizuję od 4 osób. Dla 1–3 osób → pakiety indywidualne (Wizerunek &amp; Portrety).
            </p>
          </div>
          <div>
            <label className={labelClass}>
              Dodatkowe zdjęcia na osobę ({fmtPrice(80, mode)} zł/szt.)
            </label>
            <input
              type="number"
              min={0}
              max={20}
              className={inputClass}
              value={config.teamExtraPhotosPerPerson ?? 0}
              onChange={(e) => onChange({ ...config, teamExtraPhotosPerPerson: Math.max(0, parseInt(e.target.value) || 0) })}
            />
            <p className="text-[12px] text-steel dark:text-dark-text-muted mt-1.5">
              W stawce za osobę jest 1 wyretuszowane zdjęcie. Każde kolejne: {fmtPrice(80, mode)} zł.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="studio-setup"
              checked={config.studioSetup ?? true}
              onChange={(e) => onChange({ ...config, studioSetup: e.target.checked })}
              className="w-4 h-4 rounded border-border text-blue"
            />
            <label htmlFor="studio-setup" className="text-[13px] text-navy dark:text-dark-text">
              Mobilne studio w biurze (+{fmtPrice(450, mode)} zł)
            </label>
          </div>
          <div>
            <label className={labelClass}>Studio zewnętrzne</label>
            <select
              className={selectClass}
              value={config.externalStudio ?? ""}
              onChange={(e) => onChange({ ...config, externalStudio: e.target.value as CalcConfig["externalStudio"] })}
            >
              <option value="">Nie potrzebuję</option>
              <option value="2h">Do 2h ({fmtPrice(300, mode)} zł)</option>
              <option value="4h">Do 4h ({fmtPrice(400, mode)} zł)</option>
              <option value="unlimited">Bez limitu ({fmtPrice(800, mode)} zł)</option>
            </select>
          </div>
        </div>
      );

    case "fotografia-produktowa":
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Typ zdjęć</label>
            <select
              className={selectClass}
              value={config.productType ?? "packshot"}
              onChange={(e) => onChange({ ...config, productType: e.target.value as CalcConfig["productType"] })}
            >
              <option value="packshot">Packshot (białe tło)</option>
              <option value="creative-web">Kreatywne, Internet / Social Media</option>
              <option value="creative-print">Kreatywne, Druk / Outdoor</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Liczba produktów / ujęć</label>
            <input
              type="number"
              min={1}
              max={200}
              className={inputClass}
              value={config.productCount ?? 20}
              onChange={(e) => onChange({ ...config, productCount: Math.max(1, parseInt(e.target.value) || 1) })}
            />
          </div>
        </div>
      );

    case "eventy-reportaze":
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Liczba godzin</label>
            <input
              type="number"
              min={1}
              max={12}
              className={inputClass}
              value={config.eventHours ?? 4}
              onChange={(e) => onChange({ ...config, eventHours: Math.max(1, parseInt(e.target.value) || 1) })}
            />
          </div>
          <div>
            <label className={labelClass}>Live editing, liczba zdjęć</label>
            <input
              type="number"
              min={0}
              max={100}
              className={inputClass}
              value={config.liveEditCount ?? 0}
              onChange={(e) => onChange({ ...config, liveEditCount: Math.max(0, parseInt(e.target.value) || 0) })}
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="event-drone"
              checked={config.eventDrone ?? false}
              onChange={(e) => onChange({ ...config, eventDrone: e.target.checked })}
              className="w-4 h-4 rounded border-border text-blue"
            />
            <label htmlFor="event-drone" className="text-[13px] text-navy dark:text-dark-text">
              Ujęcia z drona (+{fmtPrice(200, mode)} zł)
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="event-express"
              checked={config.eventExpress ?? false}
              onChange={(e) => onChange({ ...config, eventExpress: e.target.checked })}
              className="w-4 h-4 rounded border-border text-blue"
            />
            <label htmlFor="event-express" className="text-[13px] text-navy dark:text-dark-text">
              Ekspresowa dostawa do 48h po evencie (+50%)
            </label>
          </div>
        </div>
      );

    case "wideo-marketing":
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Godziny operatora</label>
            <input
              type="number"
              min={1}
              max={12}
              className={inputClass}
              value={config.operatorHours ?? 2}
              onChange={(e) => onChange({ ...config, operatorHours: Math.max(1, parseInt(e.target.value) || 1) })}
            />
          </div>
          <div>
            <label className={labelClass}>Pakiet montażowy</label>
            <select
              className={selectClass}
              value={config.videoPackage ?? "s"}
              onChange={(e) => onChange({ ...config, videoPackage: e.target.value as CalcConfig["videoPackage"] })}
            >
              <option value="xs">XS Teaser &lt;15s ({fmtPrice(300, mode)} zł)</option>
              <option value="s">S Reels &lt;30s ({fmtPrice(600, mode)} zł)</option>
              <option value="m">M Event recap &lt;60s ({fmtPrice(900, mode)} zł)</option>
              <option value="l">L Promo 1-2min ({fmtPrice(1400, mode)} zł)</option>
              <option value="xl">XL Dokument ~3min ({fmtPrice(1800, mode)} zł)</option>
            </select>
          </div>
        </div>
      );

    case "pakiety-foto-wideo":
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Pakiet</label>
            <select
              className={selectClass}
              value={config.comboPackage ?? "essentials"}
              onChange={(e) => onChange({ ...config, comboPackage: e.target.value as CalcConfig["comboPackage"] })}
            >
              <option value="essentials">Event Standard ({fmtPrice(1800, mode)} zł)</option>
              <option value="pro">Event Professional ({fmtPrice(3200, mode)} zł)</option>
              <option value="premium">Event Premium ({fmtPrice(4500, mode)} zł)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Dodatkowe godziny ({fmtPrice(350, mode)} zł/h)</label>
            <input
              type="number"
              min={0}
              max={8}
              className={inputClass}
              value={config.extraComboHours ?? 0}
              onChange={(e) => onChange({ ...config, extraComboHours: Math.max(0, parseInt(e.target.value) || 0) })}
            />
          </div>
        </div>
      );

    case "zdjecia-wideo-z-drona":
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Pakiet</label>
            <select
              className={selectClass}
              value={config.dronePackage ?? "foto-wideo"}
              onChange={(e) => onChange({ ...config, dronePackage: e.target.value as CalcConfig["dronePackage"] })}
            >
              <option value="foto">Zdjęcia z drona ({fmtPrice(600, mode)} zł)</option>
              <option value="przebitki">Przebitki 4K do montażu własnego ({fmtPrice(500, mode)} zł)</option>
              <option value="wideo">Wideo z drona 4K ({fmtPrice(900, mode)} zł)</option>
              <option value="foto-przebitki">Zdjęcia + przebitki 4K ({fmtPrice(700, mode)} zł)</option>
              <option value="foto-wideo">Foto + wideo z drona ({fmtPrice(1100, mode)} zł)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Dodatkowe godziny lotu ({fmtPrice(300, mode)} zł/h)</label>
            <input
              type="number"
              min={0}
              max={8}
              className={inputClass}
              value={config.droneExtraHours ?? 0}
              onChange={(e) => onChange({ ...config, droneExtraHours: Math.max(0, parseInt(e.target.value) || 0) })}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}

function ConfigSummary({ slug, config }: { slug: ServiceSlug; config: CalcConfig }) {
  const items: string[] = [];
  switch (slug) {
    case "wizerunek-portrety": {
      const names = { essential: "Portret Standard", professional: "Portret Professional", "pro-branding": "Portret Premium" };
      items.push(`Pakiet: ${names[config.portraitPackage ?? "professional"]}`);
      if ((config.extraPhotos ?? 0) > 0) items.push(`Dodatkowe ujęcia: ${config.extraPhotos}`);
      break;
    }
    case "sesje-zespolowe":
      items.push(`Osób: ${config.teamSize ?? 10}`);
      if ((config.teamExtraPhotosPerPerson ?? 0) > 0)
        items.push(`Dodatkowe zdjęcia na osobę: ${config.teamExtraPhotosPerPerson}`);
      if (config.studioSetup) items.push("Mobilne studio w biurze");
      if (config.externalStudio) {
        const labels = { "2h": "Studio do 2h", "4h": "Studio do 4h", unlimited: "Studio bez limitu" };
        items.push(labels[config.externalStudio] ?? "");
      }
      break;
    case "fotografia-produktowa": {
      const types = { packshot: "Packshot", "creative-web": "Kreatywne (web)", "creative-print": "Kreatywne (druk)" };
      items.push(`Typ: ${types[config.productType ?? "packshot"]}`);
      items.push(`Produktów: ${config.productCount ?? 20}`);
      break;
    }
    case "eventy-reportaze":
      items.push(`Godzin: ${config.eventHours ?? 4}`);
      if ((config.liveEditCount ?? 0) > 0) items.push(`Live editing: ${config.liveEditCount} zdjęć`);
      if (config.eventDrone) items.push("Ujęcia z drona");
      if (config.eventExpress) items.push("Ekspresowa dostawa do 48h po evencie");
      break;
    case "wideo-marketing": {
      items.push(`Operator: ${config.operatorHours ?? 2}h`);
      const pkgs = { xs: "XS Teaser", s: "S Reels", m: "M Event recap", l: "L Promo", xl: "XL Dokument" };
      items.push(`Montaż: ${pkgs[config.videoPackage ?? "s"]}`);
      break;
    }
    case "pakiety-foto-wideo": {
      items.push(`Pakiet: ${config.comboPackage === "premium" ? "Event Premium" : config.comboPackage === "pro" ? "Event Professional" : "Event Standard"}`);
      if ((config.extraComboHours ?? 0) > 0) items.push(`Dodatkowe godziny: ${config.extraComboHours}`);
      break;
    }
    case "zdjecia-wideo-z-drona": {
      const names = { foto: "Zdjęcia z drona", przebitki: "Przebitki 4K do montażu własnego", wideo: "Wideo z drona", "foto-przebitki": "Zdjęcia + przebitki 4K", "foto-wideo": "Foto + wideo z drona" };
      items.push(`Pakiet: ${names[config.dronePackage ?? "foto-wideo"]}`);
      if ((config.droneExtraHours ?? 0) > 0) items.push(`Dodatkowe godziny lotu: ${config.droneExtraHours}`);
      break;
    }
  }
  return (
    <ul className="space-y-1">
      {items.filter(Boolean).map((item) => (
        <li key={item} className="text-[13px] text-steel dark:text-dark-text-muted flex items-center gap-2">
          <span className="text-blue">&#10003;</span> {item}
        </li>
      ))}
    </ul>
  );
}

export default function PricingCalculator() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState<ServiceSlug | null>(null);
  const [config, setConfig] = useState<CalcConfig>(defaultConfig);
  const [mode, setMode] = useState<PriceMode>("netto");

  const priceNetto = selectedService ? calculatePrice(selectedService, config) : 0;
  const displayPrice = mode === "brutto" ? Math.round(priceNetto * 1.23) : priceNetto;
  const selectedItem = serviceItems.find((s) => s.slug === selectedService);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Toggle netto/brutto */}
      <PriceModeToggle mode={mode} onChange={setMode} />

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-10" role="group" aria-label={`Krok ${step} z 3`}>
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-barlow font-bold transition-colors ${
                step >= s
                  ? "bg-blue text-white"
                  : "bg-border dark:bg-dark-border text-steel dark:text-dark-text-muted"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-0.5 rounded transition-colors ${
                  step > s ? "bg-blue" : "bg-border dark:bg-dark-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-barlow font-bold text-xl text-navy dark:text-white mb-6 text-center">
              Wybierz usługę
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceItems.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => {
                    setSelectedService(s.slug as ServiceSlug);
                    setConfig(defaultConfig);
                    setStep(2);
                    gtagEvent("calculator_service_selected", { service: s.slug });
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all hover:-translate-y-0.5 ${
                    selectedService === s.slug
                      ? "border-blue bg-blue-pale dark:bg-blue/15 dark:border-blue"
                      : "border-border dark:border-dark-border bg-white dark:bg-dark-card hover:border-blue dark:hover:border-blue"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-pale dark:bg-blue/15 flex items-center justify-center flex-shrink-0">
                      {s.icon}
                    </div>
                    <div>
                      <p className="font-barlow font-bold text-sm text-navy dark:text-white">
                        {s.title}
                      </p>
                      <p className="text-blue dark:text-blue-light text-[11px] font-barlow font-semibold">
                        {formatCardPrice(s.price, mode)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && selectedService && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-barlow font-bold text-xl text-navy dark:text-white mb-1 text-center">
              Skonfiguruj opcje
            </h3>
            <p className="text-steel dark:text-dark-text-muted text-[13px] text-center mb-6">
              {selectedItem?.title}
            </p>

            <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6">
              <ServiceOptions slug={selectedService} config={config} onChange={setConfig} mode={mode} />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border border-border dark:border-dark-border text-sm font-barlow font-semibold text-steel dark:text-dark-text-muted hover:border-navy dark:hover:border-white transition-colors"
              >
                Wróć
              </button>
              <button
                onClick={() => {
                  setStep(3);
                  gtagEvent("calculator_done", { service: selectedService ?? "(brak)" });
                }}
                className="flex-1 bg-gradient-to-br from-blue to-blue-light text-white py-3 rounded-xl font-barlow font-bold text-sm btn-glow"
              >
                Zobacz wycenę
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && selectedService && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-pale dark:bg-blue/15 flex items-center justify-center mx-auto mb-4">
                {selectedItem?.icon}
              </div>
              <h3 className="font-barlow font-bold text-xl text-navy dark:text-white mb-1">
                {selectedItem?.title}
              </h3>
              <p className="text-steel dark:text-dark-text-muted text-[13px] mb-6">
                Szacunkowa wycena
              </p>

              <div className="font-barlow font-black text-5xl md:text-6xl text-navy dark:text-white mb-1">
                {displayPrice.toLocaleString("pl-PL")} zł
              </div>
              <p className="text-steel dark:text-dark-text-muted text-[12px] mb-4">
                {mode === "netto" ? "netto" : "brutto (z VAT)"} • ostateczna cena po indywidualnej wycenie
              </p>

              <div className="bg-gray-bg dark:bg-dark-bg rounded-xl p-4 mb-6 text-left" data-config-summary>
                <p className="text-[11px] uppercase tracking-widest text-steel font-barlow font-semibold mb-2">Twoja konfiguracja</p>
                <ConfigSummary slug={selectedService} config={config} />
              </div>

              <a
                href="#kontakt"
                onClick={(e) => {
                  const items: string[] = [];
                  const summaryEl = document.querySelector("[data-config-summary]");
                  if (summaryEl) {
                    summaryEl.querySelectorAll("li").forEach((li) => {
                      items.push(li.textContent?.replace("✓", "").trim() ?? "");
                    });
                  }
                  const summary = `Usługa: ${selectedItem?.title}\nKonfiguracja: ${items.filter(Boolean).join(", ")}\nSzacunkowa kwota: ${displayPrice.toLocaleString("pl-PL")} zł ${mode === "netto" ? "netto" : "brutto"}`;
                  gtagEvent("calculator_to_form", { service: selectedService ?? "(brak)" });
                  window.dispatchEvent(new CustomEvent("calc-to-form", { detail: { service: selectedService, message: summary } }));
                  const target = document.getElementById("kontakt");
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-block bg-gradient-to-br from-blue to-blue-light text-white px-8 py-3.5 rounded-xl font-barlow font-bold text-sm btn-glow hover:scale-[1.02] transition-transform"
              >
                Wyślij konfigurację w formularzu
              </a>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl border border-border dark:border-dark-border text-sm font-barlow font-semibold text-steel dark:text-dark-text-muted hover:border-navy dark:hover:border-white transition-colors"
              >
                Zmień opcje
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedService(null);
                }}
                className="flex-1 py-3 rounded-xl border border-border dark:border-dark-border text-sm font-barlow font-semibold text-steel dark:text-dark-text-muted hover:border-navy dark:hover:border-white transition-colors"
              >
                Inna usługa
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
