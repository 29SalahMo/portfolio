"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export function ContactSphere({ active }: { active?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    const scale = active ? 1.08 : 1;
    ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.08);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.1, 64, 64]} />
      <MeshDistortMaterial
        color="#3b82f6"
        emissive="#22d3ee"
        emissiveIntensity={active ? 0.65 : 0.35}
        distort={active ? 0.45 : 0.28}
        speed={active ? 3 : 1.8}
        roughness={0.1}
        metalness={0.85}
      />
    </mesh>
  );
}
