"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  start?: string;
};

export function useGsapReveal<T extends HTMLElement>(
  options: RevealOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    y = 48,
    opacity = 0,
    duration = 1,
    stagger = 0.08,
    start = "top 82%",
  } = options;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start,
            toggleActions: "play none none none",
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [y, opacity, duration, stagger, start]);

  return ref;
}
