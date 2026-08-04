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
  /** Kafelki o stałej proporcji zamiast siatki murowanej.
      Włączone tam, gdzie zdjęcia mają bardzo różne proporcje (produktowe: od 0,56
      do 1,50), przez co kolumny kończyły się na różnych wysokościach i rzędy
      przestawały być rzędami. Kolejność w tych kategoriach jest ułożona
      tematycznie po trzy, więc rząd musi wyglądać jak rząd. */
  uniformTiles?: boolean;
}

/**
 * Alt dla i-tego zdjęcia.
 *
 * ZDJ2608-04 (04.08.2026): gdy wariantów jest tyle co kadrów, opis jest już unikalny
 * i opisuje TEN kadr, więc dopisek „, kadr N" tylko zaśmieca i wraca wzorzec opisu
 * pozycji zamiast obrazu. Numer zostaje wyłącznie tam, gdzie lista jest krótsza od
 * galerii i rotuje (dziś tylko `produktowe`), bo bez niego powtórzyłby się ten sam tekst.
 */
function altFor(
  cat: { alt: string; altVariants?: string[]; images?: SizedImage[] } | undefined,
  i: number
): string {
  if (!cat) return `Fotografia ${i + 1}`;
  const variants = cat.altVariants;
  if (variants?.length) {
    const rotating = !cat.images || variants.length < cat.images.length;
    const base = variants[i % variants.length];
    return rotating ? `${base}, kadr ${i + 1}` : base;
  }
  return `${cat.alt}, kadr ${i + 1}`;
}

// Liczba kolumn galerii zależna od szerokości (SSR-safe, bez setState-in-effect):
// JEDNA na telefonie, trzy od 640 px. Prośba Marcina 04.08.2026: dwie kolumny na
// telefonie robiły ze zdjęć znaczki, a to galeria fotografa, nie lista produktów.
function useGalleryColumns(): number {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia("(min-width: 640px)");
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => (window.matchMedia("(min-width: 640px)").matches ? 3 : 1),
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
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
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
    // Na telefonie pasek przewija się w poziomie: dosuwamy klikniętą zakładkę,
    // żeby po zmianie kategorii było widać, która jest aktywna.
    tabsRef.current
      ?.querySelector<HTMLElement>(`[data-tab="${key}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    // Powrót na górę sekcji. Bez tego po przełączeniu kategorii w połowie galerii
    // lądujesz w środku nowego zestawu i nie wiadomo, gdzie jest początek
    // (Marcin 04.08.2026: „żeby dawało go do góry, by mógł dalej scrolować w dół").
    //
    // UWAGA: mierzymy korzeń sekcji, NIE przyklejony pasek. Element `sticky`
    // w stanie przyklejonym raportuje pozycję przyklejoną (96 px od góry), więc
    // liczony z niego cel wychodził równy bieżącemu scrollY i przewijanie nigdy
    // się nie odpalało (zgłoszone przez Marcina: „na komputerach nie przesuwa
    // do góry"). Korzeń sekcji nie jest przyklejony, więc podaje prawdę.
    const root = sectionRef.current;
    if (root) {
      const y = root.getBoundingClientRect().top + window.scrollY - 96;
      if (window.scrollY > y + 4) window.scrollTo({ top: y, behavior: "smooth" });
    }
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
    <div ref={sectionRef}>
      {/* Zakładki kategorii — przyklejone pod nawigacją, żeby dało się zmienić
          kategorię bez wracania na górę (prośba Marcina 04.08.2026).
          `top-24` mija pływający pasek nawigacji (`fixed top-0` + `pt-4`).
          `z-30` trzyma je pod nawigacją (z-50) i pod lightboxem (z-100).
          Na telefonie jeden rząd z przewijaniem w poziomie zamiast zawijania
          do trzech rzędów, które po przyklejeniu zjadałyby pół ekranu. */}
      <div className="sticky top-24 z-30 -mx-4 px-4 mb-8">
        <div
          ref={tabsRef}
          aria-label="Kategorie galerii"
          className="flex sm:flex-wrap sm:justify-center gap-2 overflow-x-auto sm:overflow-visible scrollbar-none snap-x snap-mandatory py-2 px-3 rounded-full bg-white/85 dark:bg-[rgba(11,15,26,0.9)] backdrop-blur-xl border border-border/70 dark:border-dark-border shadow-sm"
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              data-tab={t.key}
              onClick={() => selectTab(t.key)}
              aria-pressed={active === t.key}
              className={`shrink-0 snap-start px-4 py-2 rounded-full text-[13px] font-barlow font-semibold transition-colors ${
                active === t.key
                  ? "bg-blue text-white"
                  : "bg-blue-pale dark:bg-dark-card text-text-body dark:text-dark-text-muted hover:text-navy dark:hover:text-white border border-transparent dark:border-dark-border"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
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
            className={`mt-8 grid grid-cols-1 gap-5 ${
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
        activeCat?.uniformTiles ? (
        /* Zdjęcia — równe kafelki 4:5, rzędy po trzy. Proporcja 4:5 to ta, którą ma
           większość kadrów produktowych, więc trzynaście z dwudziestu czterech nie jest
           w ogóle przycinanych. Pełny kadr widać po kliknięciu, w podglądzie. */
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setLightbox(i);
              }}
              aria-label={`Powiększ zdjęcie ${i + 1}`}
              className="relative block w-full aspect-[4/5] rounded-xl overflow-hidden bg-border dark:bg-dark-card group"
            >
              <Image
                src={img.src}
                alt={altFor(activeCat, i)}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-opacity group-hover:opacity-90"
              />
            </button>
          ))}
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
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="w-full h-auto transition-opacity group-hover:opacity-90"
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
      )
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
            {/* next/image zamiast surowego <img> (audyt 2026-07-06): lightbox
                serwował nieskompresowane oryginały (do ~800 KB); wzorzec jak
                w PortfolioGallery. */}
            <Image
              src={images[lightbox].src}
              alt={altFor(activeCat, lightbox)}
              width={images[lightbox].width}
              height={images[lightbox].height}
              quality={90}
              priority
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
