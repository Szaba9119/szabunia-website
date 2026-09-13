// MASTER 12.09.2026: dowód skali na homepage; usługi mają własny kontekst.
// Jeden partner oznacza odpowiedzialność za całość, ze składem dobranym do planu.
export default function TrustLine({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`flex flex-wrap items-center justify-center md:justify-start gap-x-7 gap-y-3 text-[13px] text-steel dark:text-dark-text-muted ${className}`}
    >
      <li className="inline-flex items-center gap-2">
        {/* budynek = firmy */}
        <svg className="w-4 h-4 flex-shrink-0 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
        <span>
          <span className="font-semibold text-navy dark:text-dark-text">100+</span>{" "}
          obsłużonych firm
        </span>
      </li>
      <li className="inline-flex items-center gap-2">
        {/* globus = zasięg geograficzny */}
        <svg className="w-4 h-4 flex-shrink-0 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9s-2.015-9-4.5-9-4.5 4.03-4.5 9 2.015 9 4.5 9zM3.6 9h16.8M3.6 15h16.8" />
        </svg>
        Realizacje w Polsce i Europie
      </li>
      <li className="inline-flex items-center gap-2">
        {/* warstwy = kilka rodzajów materiału w jednym zleceniu */}
        <svg className="w-4 h-4 flex-shrink-0 text-blue dark:text-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
        </svg>
        Prowadzę całą realizację od rozmowy do gotowych materiałów
      </li>
    </ul>
  );
}
