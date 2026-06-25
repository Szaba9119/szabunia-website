"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  images: string[];
  altBase: string;
  /** object-position miniatur (np. "center 25%" dla portretów, by nie ucinać twarzy). */
  thumbPosition?: string;
  /** Proporcja miniatur (np. "aspect-[3/4]" dla portretów, "aspect-[4/3]" dla eventów). */
  aspectClass?: string;
}

// Siatka miniatur z podglądem (lightbox) otwieranym na miejscu — bez wychodzenia
// z lejka do /galeria. Bez framer-motion: czysty CSS + obsługa klawiatury i gestów.
export default function ServiceGalleryLightbox({
  images,
  altBase,
  thumbPosition = "center",
  aspectClass = "aspect-square",
}: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") move(-1);
      else if (e.key === "ArrowRight") move(1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, move]);

  const arrowBtn =
    "w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Powiększ zdjęcie ${i + 1}`}
            className={`group relative ${aspectClass} rounded-xl overflow-hidden bg-border dark:bg-dark-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue`}
          >
            <Image
              src={src}
              alt={`${altBase} ${i + 1}`}
              fill
              sizes="(max-width: 640px) 33vw, 16vw"
              style={{ objectPosition: thumbPosition }}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd zdjęcia"
          onClick={close}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Zamknij podgląd"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Strzałki boczne — tylko desktop (na telefonie zasłaniał je kciuk) */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); move(-1); }}
                aria-label="Poprzednie zdjęcie"
                className={`hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 ${arrowBtn}`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); move(1); }}
                aria-label="Następne zdjęcie"
                className={`hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 ${arrowBtn}`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative w-[92vw] max-w-[1100px] h-[78vh] md:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[open]}
              alt={`${altBase} ${open + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Pasek sterowania na dole — telefon: strzałki + licznik (kciuk ich nie zasłania) */}
          <div
            className="md:hidden absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button type="button" onClick={() => move(-1)} aria-label="Poprzednie zdjęcie" className={arrowBtn}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <span className="text-white/80 text-[13px] tabular-nums select-none min-w-[3rem] text-center">
              {open + 1} / {images.length}
            </span>
            {images.length > 1 && (
              <button type="button" onClick={() => move(1)} aria-label="Następne zdjęcie" className={arrowBtn}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Licznik na desktopie */}
          <p className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-[13px]">
            {open + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
