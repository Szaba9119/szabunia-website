"use client";

/**
 * Typografia treści wpisów. Świadomie BEZ pluginu @tailwindcss/typography
 * (klasy `prose-*` nie działały, bo plugin nigdy nie był zainstalowany) —
 * stylujemy tagi przez warianty arbitralne Tailwinda, które działają od ręki.
 */
export default function BlogContent({ html }: { html: string }) {
  return (
    <div
      className="max-w-none
        [&_p]:text-[16.5px] [&_p]:leading-[1.8] [&_p]:my-5 [&_p]:text-text-body dark:[&_p]:text-dark-text
        [&_h2]:font-barlow [&_h2]:font-bold [&_h2]:text-[26px] [&_h2]:leading-snug [&_h2]:tracking-tight [&_h2]:text-navy dark:[&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4
        [&_h3]:font-barlow [&_h3]:font-bold [&_h3]:text-[20px] [&_h3]:leading-snug [&_h3]:text-navy dark:[&_h3]:text-white [&_h3]:mt-9 [&_h3]:mb-3
        [&_h2+p]:mt-0 [&_h3+p]:mt-0
        [&_a]:text-blue dark:[&_a]:text-blue-light [&_a]:font-semibold [&_a:hover]:underline [&_a]:underline-offset-2
        [&_strong]:font-semibold [&_strong]:text-navy dark:[&_strong]:text-white
        [&_ul]:my-5 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:space-y-2
        [&_li]:text-[16.5px] [&_li]:leading-[1.7] [&_li]:text-text-body dark:[&_li]:text-dark-text [&_li]:pl-1
        [&_li::marker]:text-blue dark:[&_li::marker]:text-blue-light
        [&_.lead]:text-[19px] [&_.lead]:text-steel dark:[&_.lead]:text-dark-text-muted [&_.lead]:leading-[1.7] [&_.lead]:mb-10"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
