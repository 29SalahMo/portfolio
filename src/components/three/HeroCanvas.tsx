"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene } from "./HeroScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HeroCanvas() {
  const reduced = usePrefersReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer Canvas mount until after main thread paint
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className="absolute inset-0 -z-10"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }}
      aria-hidden
    >
      {mounted ? (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, reduced ? 1 : 1.25]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
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

