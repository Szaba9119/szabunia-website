import Image from 'next/image';
import Link from 'next/link';
import TrustLine from '@/components/TrustLine';
import { getServiceBySlug } from '@/data/services';

// Kafel = link do podstrony usługi (14.09.2026, prośba Marcina: „żeby te zdjęcia
// były klikalne, przy najechaniu żeby się pokazywała nazwa usługi"). Nazwa idzie
// z `shortTitle` w services.tsx, więc zmiana nazwy usługi nie rozjedzie kolażu.
//
// `ratio` = szerokość / wysokość pliku. Potrzebne do `sizes`: object-cover
// wypełnia kafel WYSOKOŚCIĄ, więc kadr poziomy renderuje się szerzej niż kafel.
// Poprzednie wspólne `280px` kazało pobrać wariant 640 px dla kadru gali, który
// na ekranie 2x potrzebuje ~950 px, stąd miękki, rozmyty obraz.
//
// Kadr eventowy zostaje `event-23-scena-gali-orkiestra` (decyzja Marcina 14.09.2026,
// po porównaniu z wręczeniem wyróżnień i networkingiem w foyer).
const heroPhotos = [
  {
    slug: 'wizerunek-portrety',
    src: '/images/galeria/portrety/portret-26-kobieta-czarna-marynarka.jpg',
    alt: 'Roześmiana kobieta w czarnej marynarce, portret biznesowy na jasnym tle',
    ratio: 1280 / 1920,
    className: 'object-top',
  },
  {
    slug: 'eventy-reportaze',
    src: '/images/galeria/eventy/event-23-scena-gali-orkiestra.jpg',
    alt: 'Scena gali muzycznej z orkiestrą, publicznością i kolorową oprawą świetlną',
    ratio: 1920 / 1280,
    // Środek ekranu scenicznego (postać + napis), nie sam napis: przy 76-82%
    // postać była ucięta na lewej krawędzi i kadr wyglądał na przesunięty.
    className: 'object-[47%_50%]',
  },
  {
    slug: 'nieruchomosci-przemysl',
    src: '/images/galeria/dron/dron-08-biurowiec-poznan.jpg',
    alt: 'Wielokondygnacyjny budynek w Poznaniu otoczony zielenią, zdjęcie z drona',
    ratio: 1920 / 1440,
    className: 'object-center',
  },
  {
    slug: 'fotografia-produktowa',
    src: '/images/galeria/produktowe/produkt-43-amarula.jpg',
    alt: 'Butelka Amarula i koktajl w ciepłej brązowo-kremowej scenografii',
    ratio: 1536 / 1920,
    className: 'object-[50%_40%]',
  },
];

// Telefon: kafel kwadratowy (wysokość = szerokość). Od md: kafel ~4:5, liczone
// z zapasem jako 1.25. Kadr pionowy nigdy nie potrzebuje więcej niż szerokość kafla.
function tileSizes(ratio: number) {
  const mobile = Math.max(1, ratio);
  const desktop = Math.max(1, ratio * 1.25);
  return `(max-width: 767px) calc((100vw - 38px) / 2 * ${mobile.toFixed(2)}), (max-width: 1279px) calc(23vw * ${desktop.toFixed(2)}), ${Math.ceil(280 * desktop)}px`;
}

// Kolejność mobilna: nagłówki → opis → kontakt → kolaż → dowód.
// Na desktopie ten sam kolaż zajmuje prawą kolumnę hero.
export default function Hero() {
  return (
    <section className='relative pt-28 pb-4 md:pt-32 overflow-hidden'>
      <div className='px-4'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] md:gap-x-12 lg:gap-x-20 md:items-start'>
          <div className='hero-intro text-center md:text-left md:col-start-1 md:row-start-1'>
            <h1 className='font-barlow font-semibold text-[11px] md:text-xs tracking-[0.06em] md:tracking-[0.16em] uppercase text-steel dark:text-dark-text-muted mb-4 md:mb-6'>
              Fotograf biznesowy w Poznaniu.{' '}
              <span className='whitespace-nowrap'>Zdjęcia i film.</span>
            </h1>
            <h2 className='font-barlow font-black text-[clamp(38px,11vw,58px)] md:text-[clamp(36px,5vw,76px)] leading-[0.95] tracking-[-1.5px] md:tracking-[-2.5px] text-navy dark:text-white mb-6 md:mb-7'>
              LUDZIE.<br />WYDARZENIA.<br />OBIEKTY.<br />PRODUKTY.
            </h2>
            <p className='font-barlow font-semibold text-base text-navy dark:text-white mb-3'>Foto · Wideo · Dron</p>
            <p className='font-inter text-[15px] md:text-base text-steel dark:text-dark-text-muted leading-relaxed max-w-md mx-auto md:mx-0'>
              Tworzę materiały, które firmy wykorzystują w&nbsp;marketingu,
              komunikacji, sprzedaży i&nbsp;employer brandingu.
              Od&nbsp;pojedynczych zdjęć po&nbsp;większe realizacje foto i&nbsp;wideo.
            </p>
          </div>
          <div className='md:col-start-1 md:row-start-2 text-center md:text-left'>
            {/* TELEFON ZDJETY Z HERO 20.09.2026 (decyzja Marcina). Numer zostaje
                w gornym pasku (`Navigation.tsx`), w sekcji kontaktowej, w stopce
                i w wyspie mobilnej — z hero znika, zeby przy „Zapytaj o oferte"
                stala jedna droga, nie dwie.
                ⚠ Zdarzenie `tel_hero` przestaje wystepowac. Klikniecia w telefon
                licza sie dalej pod pozostalymi nazwami, ale szereg czasowy
                `tel_hero` urywa sie na tej dacie. */}
            <div className='mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 justify-center md:justify-start'>
              {/* Kotwica, nie `next/link`: `Hero` renderuje sie wylacznie na stronie
                  glownej, gdzie sekcja `#kontakt` stoi trzy sekcje nizej. Przeladowanie
                  na `/kontakt` po to, zeby pokazac ten sam formularz, bylo zbedne, a przy
                  okazji ten sam napis w pasku nawigacji zachowywal sie inaczej niz tutaj.
                  Ujednolicenie 20.09.2026, decyzja Marcina. `data-cta` BEZ ZMIAN — po tych
                  nazwach chodzi pomiar konwersji i sumowanie ich to grupa zdarzen w GA4.
                  ⚠ Efekt uboczny do odnotowania w pomiarze: `/kontakt` traci odslony
                  wchodzace ze strony glownej, bo uzytkownik juz tam nie trafia. */}
              <a href='#kontakt' data-cta='wycena_home_hero'
                className='inline-flex items-center gap-2 bg-blue text-white px-5 py-4 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]'>
                Zapytaj o ofertę
              </a>
            </div>
            <p className='mt-4 text-[13px] text-steel dark:text-dark-text-muted'>Wstępną wycenę otrzymasz w ciągu 24 godzin.</p>
          </div>
          <div className='mt-8 md:mt-0 md:col-start-2 md:row-start-1 md:row-span-3 md:mr-[calc(-1*min(5rem,max(1rem,(100vw-72rem)/2)))]'>
            <figure aria-label='Wybrane realizacje: ludzie, wydarzenia, obiekty i produkty'
              className='grid grid-cols-2 grid-rows-2 gap-1.5 md:gap-2 w-full aspect-square md:aspect-[4/5] md:max-h-[640px] md:ml-auto rounded-2xl overflow-hidden'>
              {heroPhotos.map((photo, index) => {
                const label = getServiceBySlug(photo.slug)?.shortTitle ?? '';
                return (
                  <Link key={photo.src} href={`/uslugi/${photo.slug}`} data-cta={`hero_kolaz_${photo.slug}`}
                    className='group relative block min-h-0 min-w-0 overflow-hidden bg-border dark:bg-dark-card focus-visible:outline-offset-[-4px]'>
                    <Image src={photo.src} alt={photo.alt}
                      fill className={`object-cover ${photo.className} transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105`}
                      loading='eager' fetchPriority={index === 0 ? 'high' : 'auto'}
                      sizes={tileSizes(photo.ratio)}
                      quality={80} />
                    {/* Na ekranach bez hovera (telefon, tablet) nazwa jest widoczna stale,
                        inaczej nie byłoby wiadomo, że kafel prowadzi do usługi. */}
                    <span aria-hidden='true'
                      className='pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100' />
                    <span
                      className='pointer-events-none absolute inset-x-0 bottom-0 p-2.5 md:p-4 flex items-end justify-between gap-2 font-barlow font-bold text-[12px] md:text-[15px] leading-tight text-white transition-all duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0'>
                      <span>{label}</span>
                      <span aria-hidden='true' className='hidden md:inline'>→</span>
                    </span>
                  </Link>
                );
              })}
            </figure>
          </div>
          <div className='md:col-start-1 md:row-start-3'>
            <TrustLine className='mt-7' />
          </div>
        </div>
      </div>
    </section>
  );
}
