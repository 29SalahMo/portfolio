"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { skills, type SkillCategory } from "@/data/skills";

const categoryColors: Record<SkillCategory, string> = {
  "AI & Machine Learning": "#22d3ee",
  "Full Stack Development": "#3b82f6",
  "UI/UX": "#a78bfa",
  "Motion Design": "#fb7185",
  "Backend Systems": "#34d399",
  "Cloud & DevOps": "#fbbf24",
};

function SkillNode({
  position,
  label,
  color,
  isCategoryActive,
}: {
  position: THREE.Vector3;
  label: string;
  color: string;
  isCategoryActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const isActive = isCategoryActive || hovered;

  useFrame((state) => {
    if (!meshRef.current) return;
    // Floating animation
    meshRef.current.position.y =
      position.y + Math.sin(state.clock.elapsedTime * 1.5 + position.x) * 0.08;
  });

  return (
    <group position={position}>
      {/* Interactive Glowing Sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        scale={isActive ? 1.45 : 1}
      >
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 1.2 : 0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Always Camera-Facing Billboard Text with Zero Reflection / Maximum Readability */}
      <Billboard position={[0, 0.32, 0]} follow lockX={false} lockY={false} lockZ={false}>
        {/* Dark contrast backdrop plane */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[label.length * 0.09 + 0.15, 0.24]} />
          <meshBasicMaterial
            color="#050711"
            opacity={isActive ? 0.95 : 0.8}
            transparent
          />
        </mesh>

        <Text
          fontSize={isActive ? 0.16 : 0.14}
          color={isActive ? "#ffffff" : "#f1f5f9"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.012}
          outlineColor="#000000"
          outlineOpacity={1}
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
}

export function SkillsGalaxy({
  activeCategory,
}: {
  activeCategory?: SkillCategory | null;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return skills.slice(0, 16).map((skill, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const radius = 2.3 + (i % 3) * 0.35;
      const y = (i % 5) * 0.38 - 0.9;
      return {
        skill,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius,
        ),
        color: categoryColors[skill.category] || "#22d3ee",
      };
    });
  }, []);

  return (
    <>
      {/* Enable Interactive Orbit / Drag / Auto-Rotate */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.0}
        rotateSpeed={0.8}
        dampingFactor={0.05}
      />

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -3, 2]} intensity={1} color="#6d28d9" />

      {/* Core Glowing Galaxy Center Orb */}
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial
          color="#6d28d9"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      <group ref={groupRef}>
        {nodes.map(({ skill, position, color }) => (
          <SkillNode
            key={skill.name}
            position={position}
            label={skill.name}
            color={color}
            isCategoryActive={activeCategory === skill.category}
          />
        ))}
      </group>
    </>
  );
}
