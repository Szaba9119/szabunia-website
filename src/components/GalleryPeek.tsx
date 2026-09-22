import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { galleryAlt } from "@/data/galleryAlts";

// WEJŚCIE DO GALERII NAD PORTFOLIO (22.09.2026 wieczorem, decyzja Marcina: „galerię daj
// wyżej niż portfolio i popraw kadrowanie zdjęć").
//
// Wcześniej był to pasek czterech miniatur 4:3 POD kartami realizacji, w jednym rzędzie
// także na telefonie. Przy 375 px kafel miał ok. 85 px szerokości, więc z pionowego
// portretu zostawał pasek marynarki, a z kadru eventowego plama świateł. Teraz osobna
// sekcja: na telefonie siatka 2x2 z kwadratami (ok. 165 px), od `md` cztery kafle 4:5.
//
// Każdy kafel prowadzi do SWOJEJ zakładki `/galeria?kat=...`, nie do usługi. To odróżnia
// ten blok od kolażu w hero, który prowadzi pod adresy usług.
//
// Kolejność = kolejność usług (`servicePillars.ts`, eventy pierwsze). Pliki nie powtarzają
// się z hero, z kafelkami usług ani z kartami portfolio na tej samej stronie.
// `position` jest strojone pod OBA kontenery (kwadrat na telefonie, 4:5 od `md`).
// Podmiana pliku bez sprawdzenia kadru w obu proporcjach zepsuje kompozycję.
const TILES = [
  {
    kat: "eventy",
    label: "Eventy",
    // 3:2 poziomy. Kwadrat zostawia 67% szerokości, 4:5 tylko 53%: 55% trzyma
    // w kadrze wręczającego i nagrodzoną, bez pustej ściany po prawej.
    src: "/images/galeria/eventy/event-20-gala-wreczenie-wyroznien.jpg",
    position: "55% 50%",
  },
  {
    kat: "portrety",
    label: "Portrety",
    // 4:5 pionowy: w 4:5 wchodzi cały, w kwadracie zostaje 80% wysokości, twarz w górnej
    // trzeciej, więc 30% w pionie nie ucina głowy.
    src: "/images/galeria/portrety/portret-18-mezczyzna-zielony-garnitur.jpg",
    position: "50% 30%",
  },
  {
    kat: "wnetrza",
    label: "Wnętrza, hale i obiekty",
    // Hala z osią symetrii na środku kadru.
    src: "/images/galeria/wnetrza/wnetrze-07-hala-strefa-kompletacji.jpg",
    position: "50% 50%",
  },
  {
    kat: "produktowe",
    label: "Produktowe",
    // 4:5 pionowy: 30% w pionie zostawia w kwadracie korek butelki i grejpfruta.
    src: "/images/galeria/produktowe/produkt-01-caprice.jpg",
    position: "50% 30%",
  },
];

export default function GalleryPeek() {
  return (
    <section id="galeria-podglad" className="py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-blue dark:text-blue-light text-xs uppercase tracking-widest mb-3">Galeria</p>
          <h2 className="font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-4">Kadry z realizacji</h2>
          <p className="text-steel dark:text-dark-text-muted text-[15px] mb-8">Wybierz kategorię i zobacz więcej zdjęć z pracy dla firm.</p>
        </AnimatedSection>
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {TILES.map((t) => (
              <Link
                key={t.kat}
                href={`/galeria?kat=${t.kat}`}
                data-cta={`galeria_home_${t.kat}`}
                className="group relative block aspect-square md:aspect-[4/5] overflow-hidden rounded-xl md:rounded-2xl bg-border dark:bg-dark-card focus-visible:outline-offset-[-4px]"
              >
                <Image
                  src={t.src}
                  alt={galleryAlt(t.src, `Galeria: ${t.label}`)}
                  fill
                  // Telefon: dwie kolumny w `px-4` z odstępem 8 px. Od `md` cztery kolumny
                  // w `max-w-6xl`: (1152 - 3 * 16) / 4 = 276.
                  sizes="(max-width: 767px) calc((100vw - 40px) / 2), (max-width: 1183px) 25vw, 276px"
                  style={{ objectPosition: t.position }}
                  className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                />
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4 flex items-end justify-between gap-2 font-barlow font-bold text-[13px] md:text-[15px] leading-tight text-white">
                  <span>{t.label}</span>
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </AnimatedSection>
        <div className="mt-6 text-center">
          <Link
            href="/galeria"
            data-cta="galeria_home"
            className="inline-flex items-center gap-2 py-2 text-blue dark:text-blue-light font-barlow font-semibold text-sm hover:gap-3 transition-all"
          >
            Zobacz pełną galerię
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
