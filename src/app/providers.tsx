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
    // Lenis with built-in autoRaf — runs animation frames ONLY during active scroll momentum.
    // When idle, Lenis sleeps completely, allowing the main thread to remain 100% idle (eliminates TBT).
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false, // 100% native smooth momentum on mobile/tablets
      autoResize: true,
    });

    // Notify ScrollTrigger when scroll moves
    lenis.on("scroll", ScrollTrigger.update);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });

    ScrollTrigger.config({ ignoreMobileResize: true });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      lenis.destroy();
    };
  }, []);
}

export function Providers({ children }: { children: React.ReactNode }) {
  useLenisScroll();
  return <>{children}</>;
}

