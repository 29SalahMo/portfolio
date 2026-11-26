"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    let maxScroll = 1;

    const measure = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const updateProgress = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    measure();
    updateProgress();
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[2px] w-full bg-white/5"
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

