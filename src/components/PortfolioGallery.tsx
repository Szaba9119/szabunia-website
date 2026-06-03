"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import type { GalleryImage } from "@/data/portfolio";

interface Props {
  images: GalleryImage[];
  title: string;
}

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMjUzYSIvPjwvc3ZnPg==";

export default function PortfolioGallery({ images, title }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <section id="galeria" className="py-12 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <Parallax distance={PARALLAX.accent} direction="up">
            <h2 className="font-barlow font-extrabold text-3xl md:text-[40px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Galeria
            </h2>
          </Parallax>
          <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-12 max-w-md mx-auto">
            Wybrane realizacje z kategorii: {title.toLowerCase()}.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <AnimatedSection key={img.src} delay={0.08 * i}>
              <button
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-border dark:bg-dark-card w-full cursor-pointer"
                aria-label={`Otwórz zdjęcie: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
              </button>
            </AnimatedSection>
          ))}

          {/* Placeholder tile when few images */}
          {images.length < 3 && (
            <AnimatedSection delay={0.08 * images.length}>
              <div className="aspect-[4/3] rounded-2xl bg-navy/5 dark:bg-dark-card border border-dashed border-border dark:border-dark-border flex flex-col items-center justify-center text-center px-4">
                <span className="text-steel-light dark:text-dark-text-muted text-2xl mb-2">+</span>
                <span className="text-steel dark:text-dark-text-muted text-[13px] font-barlow font-semibold">
                  Więcej zdjęć wkrótce
                </span>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={`Podgląd zdjęcia: ${images[lightboxIndex!]?.alt ?? ""}`}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-10"
              aria-label="Zamknij"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-10"
                aria-label="Poprzednie zdjęcie"
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[85vh] aspect-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                width={1400}
                height={1000}
                className="object-contain max-h-[85vh] w-auto h-auto rounded-lg"
                quality={90}
                priority
              />
              <p className="text-white/60 text-[13px] text-center mt-3">
                {images[lightboxIndex].alt} ({lightboxIndex + 1} / {images.length})
              </p>
            </motion.div>

            {/* Next */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-10"
                aria-label="Następne zdjęcie"
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
