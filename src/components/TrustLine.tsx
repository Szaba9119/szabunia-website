// Wiersz dowodu społecznego: „100+ obsłużonych firm" i „Realizacje w Polsce
// i Europie", z ikonami, bez ramek.
//
// WYDZIELONE Z Hero.tsx 10.08.2026 (ósma tura), bo ten sam wiersz stoi teraz
// w dwóch miejscach: w hero strony głównej i w hero podstron usług. Marcin
// poprosił wprost, żeby podstrona używała TEGO SAMEGO elementu, a nie własnej
// kopii („nie twórz nowego komponentu wizualnego tylko dla podstrony").
// Kopia w drugim pliku rozjechałaby się przy pierwszej korekcie treści, tak jak
// rozjechały się kiedyś liczby w TrustStats i About.
//
// ⚠ IKONY TAK, KAPSUŁKI NIE. Wcześniejsza decyzja Marcina (10.08.2026, trzecia
// tura hero): obramowane pigułki z ikonami sprawiały, że strona zaczynała
// przypominać landing SaaS. Dlatego tu NIE MA `border`, tła ani `rounded-full`:
// jest ikona akcentowa i zwykły tekst. Dorobienie ramek przywróci ten problem.
//
// ⚠ Treść jest wspólna dla całego serwisu i ma jedno brzmienie (siódma tura:
// „100+ firm B2B z całej Polski" w CTA.tsx zostało sprowadzone do „100+
// obsłużonych firm"). Zmiana tekstu tutaj zmienia go wszędzie i o to chodzi.
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
    </ul>
  );
}
