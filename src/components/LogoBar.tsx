import AnimatedSection from "@/components/AnimatedSection";
import { clients } from "@/data/proof";

// Kolejność marek zachowuje decyzję właściciela z 10.08.2026.
// Jeden zestaw w DOM, bez automatycznego przewijania wymagającego zatrzymania.
export default function LogoBar() {
  return (
    <AnimatedSection>
      <section className="pt-8 pb-6 px-4" aria-label="Wybrani klienci">
        <p className="text-center text-[11px] md:text-xs font-barlow font-semibold uppercase tracking-[0.16em] text-steel dark:text-dark-text-muted mb-6">Współpracowałem m.in. z</p>
        <ul className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-x-7 md:gap-x-10 gap-y-5">
          {clients.map(client => <li key={client} className="font-barlow font-bold text-base md:text-xl tracking-tight text-steel dark:text-dark-text-muted">{client}</li>)}
        </ul>
      </section>
    </AnimatedSection>
  );
}
