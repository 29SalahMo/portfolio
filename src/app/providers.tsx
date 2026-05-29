"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    const onResize = () => {
      ScrollTrigger.refresh();
    };

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    window.addEventListener("resize", onResize, { passive: true });

    // Important: set ScrollTrigger to use the native scroller while Lenis
    // handles smoothing. This avoids brittle scrollerProxy setups early on.
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

