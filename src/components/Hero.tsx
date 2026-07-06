"use client";

import Image from "next/image";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

// Hero mobile przeprojektowane (decyzja Marcina po mockupie, 2026-07-06 noc):
// kolejność na telefonie = nagłówek → CTA → ZDJĘCIE (4:3, nad foldem) → chipy
// zaufania. Wcześniej zdjęcie 3:4 wpadało pod fold, a linia zaufania łamała się
// w przypadkowych miejscach. Desktop: układ jak dotychczas (tekst | zdjęcie),
// osiągnięty przez md:grid-rows — bez duplikowania bloków.
export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Poświaty jako radial-gradient zamiast filter:blur — blur 100px na
            dużych elementach zabijał wydajność GPU na mobile (PageSpeed). */}
        <Parallax
          distance={PARALLAX.strong}
          direction="up"
          className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(37,99,235,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(37,99,235,0.16)_0%,transparent_70%)]"
        />
        <Parallax
          distance={PARALLAX.base}
          direction="down"
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(37,99,235,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_70%)]"
        />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] md:grid-rows-[auto_auto] gap-6 md:gap-x-12 md:gap-y-0 items-center">
        {/* A. Nagłówek + CTA (mobile: pierwszy; desktop: lewa kolumna, górny rząd) */}
        {/* md:self-end + md:self-start (blok C): rzędy dostają po równo nadmiar
            wysokości zdjęcia — dokleiwamy A do dołu rzędu 1 i C do góry rzędu 2,
            żeby na desktopie CTA i chipy stykały się jak jeden blok. */}
        <div className="hero-intro md:col-start-1 md:row-start-1 md:self-end">
          <h1 className="font-barlow font-black text-[clamp(32px,9vw,80px)] md:text-[clamp(40px,7vw,80px)] leading-[0.95] tracking-[-1px] md:tracking-[-2px] text-navy dark:text-white mb-4 md:mb-5">
            REALIZUJĘ
            <br />
            <span className="text-blue dark:text-blue-light">CELE</span> TWOJEJ
            <br />
            MARKI.
          </h1>
          <p className="font-inter text-[15px] md:text-base text-steel dark:text-dark-text-muted leading-relaxed max-w-md mb-6 md:mb-7">
            Fotografia i wideo, które budują zaufanie, przyciągają klientów
            i&nbsp;wzmacniają autorytet na rynku.
          </p>
          {/* Jedno CTA — decyzja Marcina (2026-07-06 noc): bez drugorzędnych
              linków w hero, klient przechodzi przez lejek scrollując stronę.
              Nie dodawać tu ponownie linków do cennika/portfolio. */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#kontakt"
              data-cta="wycena_home_hero"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]"
            >
              Zapytaj o wycenę
              <span className="text-white/80">→</span>
            </a>
          </div>
        </div>

        {/* B. Zdjęcie (mobile: zaraz po CTA, kadr 4:3 z twarzą u góry — mieści się
            nad foldem; desktop: prawa kolumna przez oba rzędy, pion 3:4 jak dotąd).
            Bez animacji wejściowej: element LCP (PageSpeed "render delay"). */}
        <div className="relative md:col-start-2 md:row-start-1 md:row-span-2">
          <Parallax distance={PARALLAX.subtle} direction="up">
            <div className="w-full aspect-square md:aspect-[3/4] rounded-3xl overflow-hidden bg-border dark:bg-dark-card relative">
              <Image
                src="/images/marcin-hero-light-4.jpg"
                alt="Marcin Szabunia, fotograf biznesowy i twórca wideo, Poznań"
                fill
                className="object-cover object-top"
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={72}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0YxRjVGOSIvPjwvc3ZnPg=="
              />
            </div>
          </Parallax>
        </div>

        {/* C. Chipy zaufania + dowód (mobile: pod zdjęciem; desktop: lewa kolumna,
            dolny rząd — wizualnie jak dotychczasowa linia pod przyciskami).
            Chipy zawijają się czysto — poprzedni zlepek z kropkami łamał się
            w środku „Faktura VAT". Telefon jako klikalny, wyróżniony chip. */}
        <div className="hero-intro md:col-start-1 md:row-start-2 md:self-start md:pt-5">
          <ul className="flex flex-wrap gap-2" aria-label="Najważniejsze warunki współpracy">
            <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border dark:border-dark-border text-[12px] text-steel dark:text-dark-text-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Odpowiedź w 24h
            </li>
            <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border dark:border-dark-border text-[12px] text-steel dark:text-dark-text-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Wolne terminy: 1–3 tyg.
            </li>
            <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border dark:border-dark-border text-[12px] text-steel dark:text-dark-text-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Faktura VAT
            </li>
            <li>
              <a
                href="tel:+48514900688"
                data-cta="tel_hero"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue/40 dark:border-blue-light/40 text-[12px] font-barlow font-semibold text-blue dark:text-blue-light hover:bg-blue hover:text-white dark:hover:bg-blue-light dark:hover:text-navy transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                514 900 688
              </a>
            </li>
          </ul>
          <p className="mt-3 text-xs text-steel dark:text-dark-text-muted">
            Zaufało mi{" "}
            <span className="font-semibold text-steel dark:text-dark-text">100+ firm</span>{" "}
            z&nbsp;całej Polski
          </p>
        </div>
      </div>
    </section>
  );
}
