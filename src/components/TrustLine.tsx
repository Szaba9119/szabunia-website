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
//
// TRZECIA POZYCJA, „Foto, wideo i dron od jednej osoby", dodana 10.08.2026
// (runda CRO). Powód dodania: na stronie głównej słowo „dron" padało dotąd
// 2 razy, wyłącznie wewnątrz opisu jednej usługi, więc argument o pełnym
// zakresie nie istniał jako samodzielny komunikat.
//
// ⚠ HISTORIA TEGO SFORMUŁOWANIA, żeby nie kręcić nim czwarty raz.
// 10.08.2026 rano Marcin odrzucił „jeden twórca" jako nieprawdziwe („przy
// większych realizacjach pracuję z ekipą") i usunęliśmy je z `About.tsx`.
// Tego samego dnia wieczorem Marcin przywrócił ten kierunek jako świadomy USP
// i zaakceptował warianty „od jednej osoby" / „jeden twórca".
//
// Co rozstrzygnęło: claim NIE BYŁ nowy. „Od jednej osoby" stało już wtedy
// na powierzchniach klienckich, m.in. w `Services.tsx` („Zdjęcia i film dla firm
// w czterech obszarach, od jednej osoby") i w opisie usługi eventowej.
// Usunięcie go z jednego miejsca zrobiło niespójność, a nie porządek.
//
// ⚠ Granica, która nadal obowiązuje: to claim o ŹRÓDLE zlecenia (jeden dostawca,
// jedne ustalenia, jedna faktura), nie deklaracja obsady na planie. FAQ podstrony
// eventowej mówi wprost, że przy dużym wydarzeniu dochodzi drugi operator,
// i te dwa zdania mają prawo współistnieć. Nie dopisywać „wszystko robię sam".
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
        Foto, wideo i dron od jednej osoby
      </li>
    </ul>
  );
}
