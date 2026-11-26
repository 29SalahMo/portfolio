"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Suppress THREE.Clock deprecation warning from internal @react-three/fiber until Fiber updates to THREE.Timer
if (typeof window !== "undefined") {
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }
    origWarn.apply(console, args);
  };
}

function useLenisScroll() {
  useEffect(() => {
    // Highly responsive Lenis configuration tuned for 60Hz, 120Hz & 144Hz+ displays
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false, // Native smooth touch momentum on mobile/tablets
      autoResize: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // GSAP central ticker drives Lenis at exact monitor refresh rate (up to 144Hz / 240Hz)
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });

    ScrollTrigger.config({ ignoreMobileResize: true });

    // Refresh ScrollTrigger after initial mount & font paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

export function Providers({ children }: { children: React.ReactNode }) {
  useLenisScroll();
  return <>{children}</>;
}

