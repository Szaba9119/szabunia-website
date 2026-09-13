'use client';

import { useId, useRef, useState } from 'react';
import { testimonials } from '@/data/proof';
import AnimatedSection from '@/components/AnimatedSection';

export default function Testimonials() {
  const quoteId = useId();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const listRef = useRef<HTMLUListElement>(null);
  const move = (direction: number) => {
    const list = listRef.current;
    if (!list) return;
    const card = list.firstElementChild?.getBoundingClientRect().width ?? list.clientWidth;
    list.scrollBy({ left: direction * (card + 24), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return (
    <section className='py-8 md:py-12 px-4' aria-labelledby='testimonials-heading'>
      <div className='max-w-6xl mx-auto'>
        <AnimatedSection>
          <h2 id='testimonials-heading' className='font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-4 text-center'>Co mówią klienci</h2>
          <p className='text-steel dark:text-dark-text-muted text-[15px] text-center mb-10'>Opinie o materiale, kontakcie i przebiegu współpracy.</p>
          <ul ref={listRef} tabIndex={0} aria-label='Opinie klientów — przewiń, aby przeczytać kolejne' className='flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 md:grid md:grid-cols-3 md:overflow-visible'>
            {testimonials.map((item, index) => (
              <li key={item.author} className='min-w-[90%] md:min-w-0 snap-start bg-white dark:bg-dark-card border border-border dark:border-dark-border rounded-2xl p-6 flex flex-col'>
                <p className='text-blue dark:text-blue-light mb-4' aria-label='Ocena: 5 na 5 gwiazdek'>★★★★★</p>
                <blockquote className='text-text-body dark:text-dark-text text-[15px] leading-relaxed italic flex-1 mb-6'>
                  <p id={`${quoteId}-${index}`} className={item.quote.length > 350 && !expanded[item.author] ? 'line-clamp-[9]' : undefined}>&bdquo;{item.quote}&rdquo;</p>
                </blockquote>
                {item.quote.length > 350 && (
                  <button type='button' aria-expanded={Boolean(expanded[item.author])} aria-controls={`${quoteId}-${index}`}
                    onClick={() => setExpanded((previous) => ({ ...previous, [item.author]: !previous[item.author] }))}
                    className='self-start min-h-11 mb-4 text-sm font-semibold text-blue dark:text-blue-light underline underline-offset-4'>
                    {expanded[item.author] ? 'Zwiń opinię' : 'Czytaj całą opinię'}
                  </button>
                )}
                <p className='font-barlow font-bold text-sm text-navy dark:text-white'>{item.author}</p>
                <p className='text-xs text-steel dark:text-dark-text-muted mt-1'>{item.meta}</p>
              </li>
            ))}
          </ul>
          <div className='flex justify-end gap-2 md:hidden mt-3'>
            <button type='button' onClick={() => move(-1)} aria-label='Poprzednia opinia' className='w-11 h-11 border border-border dark:border-dark-border rounded-xl text-navy dark:text-white'>←</button>
            <button type='button' onClick={() => move(1)} aria-label='Następna opinia' className='w-11 h-11 border border-border dark:border-dark-border rounded-xl text-navy dark:text-white'>→</button>
          </div>
          <div className='mt-6 text-center'>
            <a href='https://share.google/2OMRlIblNmEKlthIl' target='_blank' rel='noopener noreferrer' className='inline-flex items-center min-h-11 text-sm text-blue dark:text-blue-light underline'>Zobacz profil i opinie w Google</a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
