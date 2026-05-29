"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.12 });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35 });
    };

    const onDown = () => gsap.to(ring, { scale: 0.75, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.35, ease: "elastic.out(1,0.4)" });

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 lg:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/50 lg:block"
      />
    </>
  );
}
