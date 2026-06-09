"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Parallax from "./Parallax";
import { DURATION, EASE, PARALLAX } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Parallax
          distance={PARALLAX.strong}
          direction="up"
          className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue/[0.04] dark:bg-blue/[0.08] blur-[100px]"
        />
        <Parallax
          distance={PARALLAX.base}
          direction="down"
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue/[0.03] dark:bg-blue/[0.06] blur-[80px]"
        />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE }}
        >
          <h1 className="font-barlow font-black text-[clamp(40px,7vw,80px)] leading-[0.95] tracking-[-2px] text-navy dark:text-white mb-5">
            REALIZUJĘ
            <br />
            <span className="text-blue dark:text-blue-light">CELE</span> TWOJEJ
            <br />
            MARKI.
          </h1>
          <p className="font-inter text-[15px] md:text-base text-steel dark:text-dark-text-muted leading-relaxed max-w-md mb-7">
            Fotografia i wideo, które budują zaufanie, przyciągają klientów
            i&nbsp;wzmacniają Twój autorytet na rynku.
          </p>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]"
          >
            Wyślij brief — odezwę się w 24h
            <span className="text-white/80">→</span>
          </a>

          <div className="flex items-center gap-3 mt-5">
            <div className="flex -space-x-2" aria-hidden="true">
              {["MC", "NT", "MW"].map((initials) => (
                <div
                  key={initials}
                  className="w-7 h-7 rounded-full bg-border dark:bg-dark-border border-2 border-gray-bg dark:border-dark-bg flex items-center justify-center text-[9px] font-semibold text-steel dark:text-dark-text-muted"
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-xs text-steel dark:text-dark-text-muted">
              Zaufało mi{" "}
              <span className="font-semibold text-steel dark:text-dark-text">100+ firm</span>{" "}
              z&nbsp;całej Polski
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.slow, delay: 0.15, ease: EASE }}
          className="relative"
        >
          <Parallax distance={PARALLAX.subtle} direction="up">
            <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden bg-border dark:bg-dark-card relative">
              <Image
                src="/images/marcin-hero.jpg"
                alt="Marcin Szabunia — fotograf biznesowy i twórca wideo, Poznań"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg=="
              />
            </div>
          </Parallax>
        </motion.div>
      </div>
    </section>
  );
}
