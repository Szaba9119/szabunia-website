"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const scrollY = useScrollPosition();
  const [docHeight, setDocHeight] = useState(1);

  useEffect(() => {
    const update = () => {
      setDocHeight(document.documentElement.scrollHeight - window.innerHeight);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}
