import type { ReactNode } from "react";

// Przejście strony na czystym CSS (animacja .page-transition w globals.css).
// Wcześniej framer-motion zapisywał initial opacity:0 już w SSR, przez co cała
// strona (w tym element LCP) czekała z renderem na hydratację JS. Animacja CSS
// startuje natychmiast na pierwszej klatce — bez tego opóźnienia.
export default function PageTransition({ children }: { children: ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
