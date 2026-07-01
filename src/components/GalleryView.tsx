"use client";

import { useState, useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import YouTubeFacade from "./YouTubeFacade";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { GalleryVideo } from "@/data/galeria";

export interface SizedImage {
  src: string;
  width: number;
  height: number;
}

export interface GalleryCategory {
  key: string;
  label: string;
  images: SizedImage[];
  alt: string;
  /** Rotujące opisowe alt teksty; i-te zdjęcie dostaje wariant i % length. */
  altVariants?: string[];
}

/** Alt dla i-tego zdjęcia: wariant z listy (rotacyjnie) z numerem kadru dla unikalności. */
function altFor(cat: { alt: string; altVariants?: string[] } | undefined, i: number): string {
  if (!cat) return `Fotografia ${i + 1}`;
  const base = cat.altVariants?.length ? cat.altVariants[i % cat.altVariants.length] : cat.alt;
  return `${base}, kadr ${i + 1}`;
}

// Liczba kolumn galerii zależna od szerokości (SSR-safe, bez setState-in-effect): 2 na mobile, 3 od 640px.
function useGalleryColumns(): number {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia("(min-width: 640px)");
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => (window.matchMedia("(min-width: 640px)").matches ? 3 : 2),
    () => 3
  );
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
  const cols = useGalleryColumns();

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const touchX = useRef<number | null>(null);

  const activeCat = categories.find((c) => c.key === active);
  const images = activeCat?.images ?? [];
  const imageCount = images.length;

  // Rozkład rzędami (round-robin): zdjęcie i trafia do kolumny i % cols,
  // dzięki czemu górny rząd to 1,2,3, kolejny 4,5,6 — kolejność czyta się od lewej do prawej.
  const masonryColumns = Array.from({ length: cols }, (_, ci) =>
    images.map((img, i) => ({ img, i })).filter((item) => item.i % cols === ci)
  );

  const close = useCallback(() => {
    setLightbox(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + imageCount) % imageCount)),
    [imageCount]
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % imageCount)),
    [imageCount]
  );

  const selectTab = (key: string) => {
    setActive(key);
    setLightbox(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/galeria?kat=${key}`);
    }
  };

  // Klawiatura + blokada scrolla, gdy otwarty lightbox
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

  // Fokus na oknie podglądu po otwarciu + pułapka fokusu Tab (dostępność)
  useFocusTrap(dialogRef, lightbox !== null);

  // Wstępne wczytanie sąsiednich zdjęć — płynniejsza nawigacja.
  // Zależność od `active` (a nie tablicy `images`) wystarcza: zmiana kategorii odświeża zestaw.
  useEffect(() => {
    if (lightbox === null || imageCount < 2) return;
    [(lightbox + 1) % imageCount, (lightbox - 1 + imageCount) % imageCount].forEach((idx) => {
      const src = images[idx]?.src;
      if (!src) return;
      const im = new window.Image();
      im.src = src;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `images` pochodzi z `active`; identyczność tablicy nie ma znaczenia
  }, [lightbox, imageCount, active]);

  return (
    <div>
      {/* Zakładki kategorii */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => selectTab(t.key)}
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

      {/* Wideo — odtwarzanie na miejscu (fasada), bez wyrzucania na YouTube */}
      {active === "wideo" ? (
        <div>
          <div
            className={`grid grid-cols-1 gap-5 ${
              videos.filter((v) => !v.vertical).length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"
            }`}
          >
            {videos
              .filter((v) => !v.vertical)
              .map((v) => (
                <div key={v.youtubeId}>
                  <YouTubeFacade id={v.youtubeId} title={v.title} className="mt-0" />
                  <p className="mt-2.5 text-[13px] font-barlow font-semibold text-navy dark:text-white">
                    {v.title}
                  </p>
                </div>
              ))}
          </div>

          <div
            className={`mt-8 grid grid-cols-2 gap-5 ${
              videos.filter((v) => v.vertical).length >= 5 ? "md:grid-cols-5" : "md:grid-cols-4"
            }`}
          >
            {videos
              .filter((v) => v.vertical)
              .map((v) => (
                <div key={v.youtubeId}>
                  <YouTubeFacade id={v.youtubeId} title={v.title} vertical className="mt-0" />
                  <p className="mt-2.5 text-[13px] font-barlow font-semibold text-navy dark:text-white">
                    {v.title}
                  </p>
                </div>
              ))}
          </div>

          <p className="mt-10 text-center text-[14px] text-steel dark:text-dark-text-muted">
            Zobacz pełne realizacje wideo:{" "}
            <Link
              href="/portfolio/woohoo-autopay"
              className="text-blue dark:text-blue-light font-barlow font-semibold hover:underline"
            >
              E-commerce All-in
            </Link>{" "}
            i{" "}
            <Link
              href="/portfolio/artech-fotografia-produktowa"
              className="text-blue dark:text-blue-light font-barlow font-semibold hover:underline"
            >
              Artech
            </Link>
            .
          </p>
        </div>
      ) : (
        /* Zdjęcia — masonry z kolejnością rzędami */
        <div className="flex gap-3 items-start">
          {masonryColumns.map((col, ci) => (
            <div key={ci} className="flex-1 min-w-0 flex flex-col gap-3">
              {col.map(({ img, i }) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setLightbox(i);
                  }}
                  aria-label={`Powiększ zdjęcie ${i + 1}`}
                  className="block w-full rounded-xl overflow-hidden bg-border dark:bg-dark-card group"
                >
                  <Image
                    src={img.src}
                    alt={altFor(activeCat, i)}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="w-full h-auto transition-opacity group-hover:opacity-90"
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && activeCat && (
        <div
          ref={dialogRef}
          tabIndex={-1}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-8 outline-none"
          onClick={close}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) {
              if (dx < 0) next();
              else prev();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd zdjęcia"
        >
          {imageCount > 1 && (
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white/85 text-sm font-barlow font-semibold tabular-nums select-none">
              {lightbox + 1} / {imageCount}
            </span>
          )}
          <button
            type="button"
            onClick={close}
            aria-label="Zamknij podgląd"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center transition-colors"
          >
            ✕
          </button>
          {imageCount > 1 && (
            <button
              type="button"
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
              src={images[lightbox].src}
              alt={altFor(activeCat, lightbox)}
              className="max-h-[88vh] max-w-[92vw] w-auto h-auto object-contain rounded-lg"
            />
          </div>
          {imageCount > 1 && (
            <button
              type="button"
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
