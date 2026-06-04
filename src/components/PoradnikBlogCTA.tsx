import Image from "next/image";
import Link from "next/link";

export default function PoradnikBlogCTA() {
  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-blue-pale/60 dark:bg-blue/10 p-5 md:p-6 flex flex-col sm:flex-row items-center gap-5">
      <Link href="/poradnik" aria-label="Pobierz darmowy poradnik" className="flex-shrink-0">
        <div className="relative w-[88px] aspect-[210/297] rounded-lg overflow-hidden bg-white shadow-lg ring-1 ring-border dark:ring-dark-border">
          <Image
            src="/images/poradnik-cover.png"
            alt="Poradnik — przygotowanie do sesji biznesowej"
            fill
            className="object-cover"
            sizes="88px"
          />
        </div>
      </Link>
      <div className="flex-1 text-center sm:text-left">
        <p className="text-[11px] font-barlow font-semibold uppercase tracking-wider text-blue dark:text-blue-light mb-1">
          Darmowy poradnik
        </p>
        <h3 className="font-barlow font-bold text-lg text-navy dark:text-white mb-1.5">
          Przygotuj się do sesji jak zawodowiec
        </h3>
        <p className="text-[13px] text-steel dark:text-dark-text-muted mb-4 leading-relaxed">
          Checklisty, planer stylizacji, ściąga kolorów i mini-brief — pobierz cały
          pakiet PDF za darmo.
        </p>
        <Link
          href="/poradnik"
          className="inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue-light text-white px-5 py-2.5 rounded-xl font-barlow font-bold text-sm btn-glow hover:scale-[1.01] transition-transform"
        >
          Pobierz poradnik
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
