"use client";

import Image from "next/image";
import { useState } from "react";
import { gtagEvent } from "@/lib/gtag";

/**
 * Lekka „fasada" osadzenia YouTube: do kliknięcia pokazuje tylko miniaturę + przycisk play.
 * Ciężki player YouTube (i jego cookies) ładuje się dopiero po kliknięciu — szybsze wejście na stronę i lepsza prywatność.
 */
export default function YouTubeFacade({
  id,
  title,
  vertical = false,
  className = "mt-8",
  priority = false,
}: {
  id: string;
  title: string;
  /** Format pionowy 9:16 (reelsy) zamiast domyślnego 16:9 */
  vertical?: boolean;
  /** Nadpisanie zewnętrznych klas (domyślnie mt-8) */
  className?: string;
  /** Plakat nad zgięciem (element LCP): bez `loading="lazy"`, z `fetchpriority="high"`. */
  priority?: boolean;
}) {
  const [play, setPlay] = useState(false);
  // ZDJ2608-24 (04.08.2026): fallback przeniesiony z mutacji `currentTarget.src` na stan,
  // bo przy ponownym renderze przeglądarka wracała do adresu z propsa i pętliła żądanie.
  const [hqOnly, setHqOnly] = useState(false);

  return (
    <div
      className={`relative ${vertical ? "aspect-[9/16]" : "aspect-video"} rounded-2xl overflow-hidden bg-navy ring-1 ring-border dark:ring-dark-border shadow-xl ${className}`}
    >
      {play ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&vq=hd1080`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            gtagEvent("video_play", { video_id: id, video_title: title });
            setPlay(true);
          }}
          aria-label={`Odtwórz film: ${title}`}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          <Image
            /* PERF-02 (audyt 23.09.2026): najpierw WebP z CDN-u YouTube (ten sam host
               `i.ytimg.com`, już dopuszczony w CSP), np. 23 KB zamiast 60 KB JPEG-a.
               Brak wersji maxres albo WebP → `onError` i JPEG `hqdefault`, jak dotąd. */
            src={
              hqOnly
                ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
                : `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`
            }
            alt={`Kadr otwierający z filmu: ${title}`}
            width={1280}
            height={720}
            /* Bez optymalizatora Next: to gotowy JPEG z CDN-u YouTube, a dopisanie domeny
               do images.remotePatterns w next.config.ts jest osobną decyzją. */
            unoptimized
            priority={priority}
            onError={() => setHqOnly(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white group-hover:bg-blue group-hover:border-blue transition-colors">
            <svg className="w-7 h-7 ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
