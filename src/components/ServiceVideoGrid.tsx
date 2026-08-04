"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { gtagEvent } from "@/lib/gtag";

export interface StripVideo {
  youtubeId: string;
  title: string;
  vertical: boolean;
}

/**
 * Siatka miniatur wideo w pasku „Przykłady z galerii”, z odtwarzaniem NA MIEJSCU.
 *
 * Powód powstania (Marcin, 04.08.2026): kafelki miały przycisk play, ale były
 * zwykłymi linkami — kliknięcie wyrzucało z podstrony usługi do galerii albo na
 * inną usługę, zamiast odtworzyć film. Przycisk play obiecywał coś, czego nie robił.
 *
 * Zachowanie jak w ServiceGalleryLightbox dla zdjęć: podgląd otwiera się w miejscu,
 * bez wychodzenia z lejka. Player YouTube ładuje się dopiero po kliknięciu
 * (fasada), więc wejście na stronę zostaje szybkie, a cookies YouTube nie
 * ładują się bez akcji użytkownika.
 */
export default function ServiceVideoGrid({
  videos,
  gridClass,
}: {
  videos: StripVideo[];
  gridClass: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  // ZDJ2608-24 (04.08.2026): miniatura idzie z `maxresdefault` (1280x720, 16:9), a nie
  // z `hqdefault` (480x360, czyli 4:3 z czarnymi pasami dla materiału 16:9). Sprawdzone
  // kodem odpowiedzi 04.08.2026: wszystkie 9 osadzonych filmów zwraca 200 na maxres.
  // Fallback jest realny, nie zadeklarowany: gdy YouTube kiedyś nie wygeneruje maxres,
  // `onError` przełącza TEN film na hqdefault i stan zostaje do końca sesji.
  const [hqOnly, setHqOnly] = useState<Record<string, boolean>>({});

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  useFocusTrap(dialogRef, open !== null);

  const active = open === null ? null : videos[open];

  return (
    <>
      <div className={gridClass}>
        {videos.map((v, i) => (
          <button
            key={v.youtubeId}
            type="button"
            onClick={() => {
              gtagEvent("video_play", { video_id: v.youtubeId, video_title: v.title });
              setOpen(i);
            }}
            aria-label={`Odtwórz film: ${v.title}`}
            className="group relative aspect-square rounded-xl overflow-hidden bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            <Image
              src={`https://i.ytimg.com/vi/${v.youtubeId}/${hqOnly[v.youtubeId] ? "hqdefault" : "maxresdefault"}.jpg`}
              alt={`Kadr otwierający z filmu: ${v.title}`}
              width={1280}
              height={720}
              /* Miniatury YouTube nie przechodzą przez optymalizator Next (to już jest
                 skompresowany JPEG z CDN-u), więc `unoptimized` zamiast dopisywania
                 i.ytimg.com do images.remotePatterns w next.config.ts. Domena jest
                 dopuszczona w CSP `img-src`. */
              unoptimized
              onError={() => setHqOnly((s) => (s[v.youtubeId] ? s : { ...s, [v.youtubeId]: true }))}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white group-hover:bg-blue group-hover:border-blue transition-colors">
                <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          ref={dialogRef}
          tabIndex={-1}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 outline-none"
          role="dialog"
          aria-modal="true"
          aria-label={`Film: ${active.title}`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Zamknij film"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className={`relative w-full overflow-hidden rounded-2xl bg-navy shadow-xl ${
              active.vertical
                ? "max-w-[min(92vw,calc(78vh*9/16))] aspect-[9/16]"
                : "max-w-[1100px] aspect-video"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&vq=hd1080`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80 text-[13px] px-4 text-center max-w-[90vw]">
            {active.title}
          </p>
        </div>
      )}
    </>
  );
}
