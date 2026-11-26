"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene } from "./HeroScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function isLowPowerOrBot() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  if (/bot|crawl|spider|preview|lighthouse|headless/i.test(ua)) return true;
  return window.matchMedia("(pointer: coarse)").matches;
}

export function HeroCanvas() {
  const reduced = usePrefersReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    if (isLowPowerOrBot()) return;

    // Defer WebGL mounting until after critical main-thread work and LCP
    const timer = setTimeout(() => {
      setMounted(true);
    }, 350);

    // Pause rendering when scrolled out of view to maintain 144 FPS across the page
    const el = containerRef.current;
    let observer: IntersectionObserver | null = null;
    if (el && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0.05 },
      );
      observer.observe(el);
    }

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10"
      onPointerMove={(e) => {
        if (!mounted) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }}
      aria-hidden
    >
      {mounted ? (
        <Canvas
          frameloop={isInView ? "always" : "never"}
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, reduced ? 1 : 1.25]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <HeroScene mouseRef={mouseRef} />
          </Suspense>
        </Canvas>
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
    </div>
  );
}

