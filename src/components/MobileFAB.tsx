"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";

export default function MobileFAB() {
  const scrollY = useScrollPosition();
  const visible = scrollY > 600;

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 md:hidden">
      <a
        href="#kontakt"
        aria-label="Wyślij brief — przejdź do formularza kontaktowego"
        className="flex items-center gap-2 pl-4 pr-5 py-3 bg-gradient-to-br from-blue to-blue-light text-white rounded-full btn-glow shadow-lg shadow-blue/30 font-barlow font-bold text-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
        Wyślij brief
      </a>
    </div>
  );
}
