"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene } from "./HeroScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HeroCanvas() {
  const reduced = usePrefersReducedMotion();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <div
      className="absolute inset-0 -z-10"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        setMouse({ x, y });
      }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, reduced ? 1 : 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <HeroScene mouse={mouse} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
    </div>
  );
}
