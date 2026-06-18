"use client";

import Image from "next/image";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

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

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 items-center">
        <div className="hero-intro">
          <h1 className="font-barlow font-black text-[clamp(40px,7vw,80px)] leading-[0.95] tracking-[-2px] text-navy dark:text-white mb-5">
            REALIZUJĘ
            <br />
            <span className="text-blue dark:text-blue-light">CELE</span> TWOJEJ
            <br />
            MARKI.
          </h1>
          <p className="font-inter text-[15px] md:text-base text-steel dark:text-dark-text-muted leading-relaxed max-w-md mb-7">
            Fotografia i wideo, które budują zaufanie, przyciągają klientów
            i&nbsp;wzmacniają autorytet na rynku.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]"
            >
              Wyślij brief, odezwę się w 24h
              <span className="text-white/80">→</span>
            </a>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <p className="text-xs text-steel dark:text-dark-text-muted">
              Zaufało mi{" "}
              <span className="font-semibold text-steel dark:text-dark-text">100+ firm</span>{" "}
              z&nbsp;całej Polski
            </p>
          </div>
        </div>

        {/* Bez animacji wejściowej: to element LCP — animacja opóźniała
            wyrenderowanie zdjęcia o ~1,8 s (PageSpeed "render delay"). */}
        <div className="relative">
          <Parallax distance={PARALLAX.subtle} direction="up">
            <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden bg-border dark:bg-dark-card relative">
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
      </div>
    </section>
  );
}
