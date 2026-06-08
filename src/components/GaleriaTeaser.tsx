import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";

const previews = [
  { src: "/images/galeria/portrety/portret-01.jpg", alt: "Portret biznesowy, Poznań" },
  { src: "/images/galeria/eventy/event-01.jpg", alt: "Fotografia eventowa" },
  { src: "/images/galeria/produktowe/produkt-01.jpg", alt: "Fotografia produktowa, packshot" },
  { src: "/images/galeria/portrety/portret-05.jpg", alt: "Portret biznesowy, Poznań" },
  { src: "/images/galeria/eventy/event-06.jpg", alt: "Fotografia eventowa" },
];

export default function GaleriaTeaser() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Galeria
            </h2>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-10 max-w-md mx-auto">
              Przegląd kadrów: portrety, eventy, fotografia produktowa i wideo.
            </p>
          </Parallax>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {previews.map((p, i) => (
              <Link
                key={p.src}
                href="/galeria"
                aria-label="Przejdź do galerii"
                className={`group relative aspect-[4/5] rounded-xl overflow-hidden bg-border dark:bg-dark-card ${
                  i >= 3 ? "hidden sm:block" : ""
                }`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 33vw, 20vw"
                />
              </Link>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="text-center mt-8">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-6 py-3.5 rounded-xl font-barlow font-bold text-sm btn-glow hover:scale-[1.01] transition-transform"
          >
            Zobacz całą galerię
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
