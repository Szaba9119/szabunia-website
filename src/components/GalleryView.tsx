"use client";

import { useState, useCallback, useEffect } from "react";
import type { GalleryVideo } from "@/data/galeria";

export interface GalleryCategory {
  key: string;
  label: string;
  images: string[];
  alt: string;
}

export default function GalleryView({
  categories,
  videos,
  initialActive,
}: {
  categories: GalleryCategory[];
  videos: GalleryVideo[];
  initialActive?: string;
}) {
  const tabs = [
    ...categories.map((c) => ({ key: c.key, label: c.label })),
    { key: "wideo", label: "Wideo" },
  ];
  const [active, setActive] = useState(initialActive ?? tabs[0]?.key ?? "wideo");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const activeCat = categories.find((c) => c.key === active);
  const images = activeCat?.images ?? [];

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  return (
    <div>
      {/* Zakładki kategorii */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setActive(t.key);
              setLightbox(null);
            }}
            aria-pressed={active === t.key}
            className={`px-4 py-2 rounded-full text-[13px] font-barlow font-semibold transition-colors ${
              active === t.key
                ? "bg-blue text-white"
                : "bg-blue-pale dark:bg-dark-card text-steel dark:text-dark-text-muted hover:text-navy dark:hover:text-white border border-transparent dark:border-dark-border"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Wideo */}
      {active === "wideo" ? (
        <div className="flex flex-wrap justify-center gap-4">
          {videos.map((v) => (
            <a
              key={v.youtubeId}
              href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${v.title} (otwiera na YouTube w nowej karcie)`}
              className={`group relative block rounded-2xl overflow-hidden border border-border dark:border-dark-border bg-navy ${
                v.vertical ? "aspect-[9/16] w-[220px]" : "aspect-video w-full sm:w-[460px]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                alt={v.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white group-hover:bg-blue group-hover:border-blue transition-colors">
                  <svg className="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        /* Zdjęcia — masonry */
        <div className="columns-2 sm:columns-3 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setLightbox(i)}
              aria-label={`Powiększ zdjęcie ${i + 1}`}
              className="block w-full mb-3 break-inside-avoid rounded-xl overflow-hidden bg-border dark:bg-dark-card group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${activeCat?.alt ?? "Fotografia"} ${i + 1}`}
                loading="lazy"
                className="w-full h-auto transition-opacity group-hover:opacity-90"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && activeCat && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd zdjęcia"
        >
          <button
            onClick={close}
            aria-label="Zamknij podgląd"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center transition-colors"
          >
            ✕
          </button>
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Poprzednie zdjęcie"
              className="absolute left-2 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition-colors"
            >
              ‹
            </button>
          )}
          <div className="max-h-[88vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightbox]}
              alt={`${activeCat.alt} ${lightbox + 1}`}
              className="max-h-[88vh] max-w-[92vw] w-auto h-auto object-contain rounded-lg"
            />
          </div>
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Następne zdjęcie"
              className="absolute right-2 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition-colors"
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}
