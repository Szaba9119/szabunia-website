import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import ErrorBoundary from "@/components/ErrorBoundary";
import AnimatedSection from "@/components/AnimatedSection";
import GalleryView, { type GalleryCategory } from "@/components/GalleryView";
import { galleryVideos } from "@/data/galeria";

export const metadata: Metadata = {
  title: "Galeria zdjęć i wideo | Marcin Szabunia, fotograf biznesowy Poznań",
  description:
    "Wybrane kadry z realizacji: portrety biznesowe, fotografia eventowa, produktowa oraz wideo. Marcin Szabunia, Poznań i cała Polska.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: "Galeria zdjęć i wideo | Marcin Szabunia",
    description:
      "Portrety biznesowe, fotografia eventowa, produktowa i wideo. Wybrane kadry z realizacji.",
    url: "https://szabunia.pl/galeria",
    images: [
      {
        url: "/images/marcin-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Marcin Szabunia — Fotograf biznesowy Poznań",
      },
    ],
  },
};

function listImages(folder: string): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "images", "galeria", folder);
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => `/images/galeria/${folder}/${f}`);
  } catch {
    return [];
  }
}

export default function GaleriaPage() {
  const defs = [
    { key: "portrety", label: "Portrety", folder: "portrety", alt: "Portret biznesowy, Marcin Szabunia, Poznań" },
    { key: "eventy", label: "Eventy", folder: "eventy", alt: "Fotografia eventowa, Marcin Szabunia, Poznań" },
    { key: "produktowe", label: "Produktowe", folder: "produktowe", alt: "Fotografia produktowa, packshot, Marcin Szabunia" },
  ];

  const categories: GalleryCategory[] = defs
    .map((d) => ({ key: d.key, label: d.label, images: listImages(d.folder), alt: d.alt }))
    .filter((c) => c.images.length > 0);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "Galeria — Marcin Szabunia",
      description:
        "Portrety biznesowe, fotografia eventowa, produktowa oraz wideo. Wybrane kadry z realizacji.",
      url: "https://szabunia.pl/galeria",
      author: { "@type": "Person", name: "Marcin Szabunia", url: "https://szabunia.pl" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://szabunia.pl" },
        { "@type": "ListItem", position: 2, name: "Galeria" },
      ],
    },
  ];

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h1 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-3 text-center">
              Galeria
            </h1>
            <p className="text-steel dark:text-dark-text-muted text-[15px] text-center mb-10 max-w-2xl mx-auto">
              Wybrane kadry z realizacji: portrety biznesowe, eventy, fotografia produktowa oraz wideo.
            </p>
          </AnimatedSection>

          <ErrorBoundary>
            <GalleryView categories={categories} videos={galleryVideos} />
          </ErrorBoundary>
        </div>

        <div className="mt-16">
          <ErrorBoundary>
            <CTA />
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
