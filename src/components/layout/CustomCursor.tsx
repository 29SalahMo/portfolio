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

    // Use gsap.quickTo for instant 144 FPS high-refresh rate tracking without GC overhead
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.22, ease: "power2.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.22, ease: "power2.out" });

    const move = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onDown = () => gsap.to(ring, { scale: 0.75, duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: "back.out(2)" });

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });

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
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 will-change-transform lg:block"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/50 will-change-transform lg:block"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      />
    </>
  );
}
