import Image from 'next/image';
import Link from 'next/link';
import TrustLine from '@/components/TrustLine';

const heroPhotos = [
  {
    src: '/images/galeria/portrety/portret-26-kobieta-czarna-marynarka.jpg',
    alt: 'Roześmiana kobieta w czarnej marynarce, portret biznesowy na jasnym tle',
    className: 'object-cover object-top',
  },
  {
    src: '/images/galeria/eventy/event-23-scena-gali-orkiestra.jpg',
    alt: 'Scena gali muzycznej z orkiestrą, publicznością i kolorową oprawą świetlną',
    // Środek ekranu scenicznego (postać + napis), nie sam napis: przy 76-82%
    // postać była ucięta na lewej krawędzi i kadr wyglądał na przesunięty.
    className: 'object-cover object-[47%_50%]',
  },
  {
    src: '/images/galeria/dron/dron-08-biurowiec-poznan.jpg',
    alt: 'Wielokondygnacyjny budynek w Poznaniu otoczony zielenią, zdjęcie z drona',
    className: 'object-cover object-center',
  },
  {
    src: '/images/galeria/produktowe/produkt-43-amarula.jpg',
    alt: 'Butelka Amarula i koktajl w ciepłej brązowo-kremowej scenografii',
    className: 'object-cover object-[50%_40%]',
  },
];

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
            <div className='mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 justify-center md:justify-start'>
              <Link href='/kontakt' data-cta='wycena_home_hero'
                className='inline-flex items-center gap-2 bg-blue text-white px-5 py-4 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]'>
                Zapytaj o ofertę <span aria-hidden='true'>→</span>
              </Link>
              <a href='tel:+48514900688' data-cta='tel_hero'
                className='inline-flex items-center gap-2 min-h-11 font-barlow font-semibold text-[15px] text-navy dark:text-white hover:text-blue dark:hover:text-blue-light transition-colors'>
                514 900 688
              </a>
            </div>
            <p className='mt-4 text-[13px] text-steel dark:text-dark-text-muted'>Wstępną wycenę otrzymasz w ciągu 24 godzin.</p>
          </div>
          <div className='mt-8 md:mt-0 md:col-start-2 md:row-start-1 md:row-span-3 md:mr-[calc(-1*min(5rem,max(1rem,(100vw-72rem)/2)))]'>
            <figure aria-label='Wybrane realizacje: ludzie, wydarzenia, obiekty i produkty'
              className='grid grid-cols-2 grid-rows-2 gap-1.5 md:gap-2 w-full aspect-square md:aspect-[4/5] md:max-h-[640px] md:ml-auto rounded-2xl overflow-hidden'>
              {heroPhotos.map((photo, index) => (
                <div key={photo.src} className='relative min-h-0 min-w-0 overflow-hidden bg-border dark:bg-dark-card'>
                  <Image src={photo.src} alt={photo.alt}
                    fill className={photo.className}
                    loading='eager' fetchPriority={index === 0 ? 'high' : 'auto'}
                    sizes='(max-width: 767px) calc((100vw - 38px) / 2), (max-width: 1279px) 23vw, 280px'
                    quality={80} />
                </div>
              ))}
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
