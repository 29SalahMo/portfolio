"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.35 * speed;
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function CoreOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <MeshDistortMaterial
        color="#22d3ee"
        emissive="#6d28d9"
        emissiveIntensity={0.4}
        distort={0.35}
        speed={2}
        roughness={0.15}
        metalness={0.9}
      />
    </mesh>
  );
}

export function HeroScene({ mouse }: { mouse: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.x * 0.35,
      0.05,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -mouse.y * 0.2,
      0.05,
    );
  });

  return (
    <>
      <fog attach="fog" args={["#05060a", 8, 22]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-4, -2, 2]} intensity={0.9} color="#6d28d9" />
      <spotLight
        position={[0, 6, 2]}
        angle={0.35}
        penumbra={1}
        intensity={1.5}
        color="#3b82f6"
      />

      <Stars radius={80} depth={40} count={2500} factor={3} fade speed={0.6} />

      <group ref={group}>
        <CoreOrb />
        <FloatingShape position={[-3, 1.2, -1]} color="#22d3ee" scale={0.55} />
        <FloatingShape position={[3.2, -0.8, -0.5]} color="#6d28d9" scale={0.7} speed={0.8} />
        <FloatingShape position={[0.5, 2.2, -2]} color="#fb7185" scale={0.45} speed={1.2} />
        <FloatingShape position={[-2.5, -2, 0.5]} color="#3b82f6" scale={0.5} />
      </group>
    </>
  );
}
