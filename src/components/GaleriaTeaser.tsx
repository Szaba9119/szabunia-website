import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import { listGalleryImages } from "@/lib/galleryImages";
import { galleryVideos } from "@/data/galeria";

type Tile = {
  key: string;
  label: string;
  desc: string;
  img: string;
  video?: boolean;
};

export default function GaleriaTeaser() {
  const portrety = listGalleryImages("portrety");
  const eventy = listGalleryImages("eventy");
  const produktowe = listGalleryImages("produktowe");
  const firstVideo = galleryVideos[0];

  const tiles: Tile[] = (
    [
      { key: "portrety", label: "Portrety", desc: "Zdjęcia portretowe", img: portrety[0] ?? "" },
      { key: "eventy", label: "Eventy", desc: "Zdjęcia eventowe", img: eventy[0] ?? "" },
      { key: "produktowe", label: "Produktowe", desc: "Zdjęcia produktowe", img: produktowe[0] ?? "" },
      {
        key: "wideo",
        label: "Wideo",
        desc: "Realizacje wideo",
        img: firstVideo ? `https://i.ytimg.com/vi/${firstVideo.youtubeId}/hqdefault.jpg` : "",
        video: true,
      },
    ] as Tile[]
  ).filter((t) => t.img);

  return (
    <section id="galeria" className="py-12 md:py-16 px-4">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tiles.map((t) => (
              <Link
                key={t.key}
                href={`/galeria?kat=${t.key}`}
                aria-label={`Galeria: ${t.desc}`}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-border dark:bg-dark-card"
              >
                {t.video ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.img}
                    alt={t.desc}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={t.img}
                    alt={t.desc}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}

                {/* Spójny efekt: gradient + etykieta; na hover ciemniejszy i z opisem */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300" />

                {t.video && (
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white group-hover:bg-blue group-hover:border-blue transition-colors">
                    <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <span className="block text-white font-barlow font-bold text-sm sm:text-base leading-tight">
                    {t.label}
                  </span>
                  <span className="block text-white/0 group-hover:text-white/85 text-[11px] sm:text-xs translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    {t.desc} →
                  </span>
                </div>
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
