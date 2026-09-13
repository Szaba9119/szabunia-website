import Image from 'next/image';
import Link from 'next/link';
import TrustLine from '@/components/TrustLine';

// Zachowane SEO H1 i cztery filary. Jeden obraz w DOM; kolejność mobilna:
// nagłówki → opis → kontakt → zdjęcie → dowód. Desktop: zdjęcie w prawej kolumnie.
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
            <p className='mt-4 text-[13px] text-steel dark:text-dark-text-muted'>Wstępną wycenę otrzymasz w 24h.</p>
          </div>
          <div className='mt-8 md:mt-0 md:col-start-2 md:row-start-1 md:row-span-3 md:mr-[calc(-1*min(5rem,max(1rem,(100vw-72rem)/2)))]'>
            <div className='w-full aspect-square md:aspect-[4/5] md:max-h-[640px] md:ml-auto rounded-3xl md:rounded-r-none overflow-hidden bg-border dark:bg-dark-card relative'>
              <Image src='/images/marcin-hero-light-4.jpg'
                alt='Marcin Szabunia, fotograf biznesowy i twórca wideo, Poznań'
                fill className='object-cover object-top' priority fetchPriority='high'
                sizes='(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) 45vw, 560px' quality={72} />
            </div>
          </div>
          <div className='md:col-start-1 md:row-start-3'>
            <TrustLine className='mt-7' />
          </div>
        </div>
      </div>
    </section>
  );
}
