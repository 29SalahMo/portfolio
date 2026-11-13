"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Returns true on coarse-pointer (touch) devices — phones & tablets.
 * On these we use native scroll; Lenis only runs on fine-pointer (mouse) devices.
 */
function isTouchOnly() {
  if (typeof window === "undefined") return false;
  // matchMedia coarse = touch screen as primary pointer
  return window.matchMedia("(pointer: coarse)").matches;
}

function useLenisScroll() {
  useEffect(() => {
    // ── Mobile / tablet: skip Lenis, use native momentum scroll ──────────────
    if (isTouchOnly()) {
      ScrollTrigger.config({ ignoreMobileResize: true });
      // A single refresh is enough to position all triggers correctly
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    // ── Desktop / laptop: Lenis smooth-wheel scroll ───────────────────────────
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    // IMPORTANT: gsap.ticker passes time in SECONDS.
    // Lenis.raf() expects MILLISECONDS — multiply by 1000.
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger in sync with Lenis virtual scroll position
    lenis.on("scroll", ScrollTrigger.update);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize, { passive: true });

    ScrollTrigger.config({ ignoreMobileResize: true });
    // Delay first refresh so the DOM is fully laid out
    requestAnimationFrame(() => ScrollTrigger.refresh());

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

