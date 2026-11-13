"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Detect coarse-pointer (touch) devices — Lenis smooth-scroll is off for them */
function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

function useLenisScroll() {
  useEffect(() => {
    // On mobile/touch devices skip Lenis — native scroll is smoother and
    // avoids the momentum/glitch issues caused by double-handling touch events.
    if (isTouchDevice()) {
      ScrollTrigger.config({ ignoreMobileResize: true });
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    const onResize = () => {
      ScrollTrigger.refresh();
    };

    // gsap.ticker already passes milliseconds — do NOT multiply by 1000
    const tick = (time: number) => {
      lenis.raf(time);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    window.addEventListener("resize", onResize, { passive: true });

    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.killAll(false);
    };
  }, []);
}

export function Providers({ children }: { children: React.ReactNode }) {
  useLenisScroll();
  return children;
}

