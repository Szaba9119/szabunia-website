"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration guard: mount flag must be set in effect, no way to initialise from localStorage here
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label={theme === "light" ? "Włącz tryb nocny" : "Włącz tryb dzienny"}
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-blue-pale dark:bg-navy-light"
    >
      {/* Sun */}
      <svg
        className={`absolute w-[18px] h-[18px] text-amber-500 transition-all duration-300 ${
          !mounted || theme === "light"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-90 scale-50"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>

      {/* Moon */}
      <svg
        className={`absolute w-[18px] h-[18px] text-blue-light transition-all duration-300 ${
          mounted && theme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-50"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
