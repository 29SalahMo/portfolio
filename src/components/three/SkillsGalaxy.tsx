"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
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
}: {
  position: THREE.Vector3;
  label: string;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y =
      position.y + Math.sin(state.clock.elapsedTime + position.x) * 0.08;
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>
      <Text
        position={[0, 0.28, 0]}
        fontSize={0.11}
        color="#e8ecff"
        anchorX="center"
        maxWidth={1.2}
      >
        {label}
      </Text>
    </group>
  );
}

export function SkillsGalaxy({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return skills.slice(0, 14).map((skill, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const radius = 2.2 + (i % 3) * 0.35;
      const y = (i % 5) * 0.35 - 0.8;
      return {
        skill,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius,
        ),
        color: categoryColors[skill.category],
      };
    });
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y =
      state.clock.elapsedTime * 0.12 + scrollProgress * Math.PI * 2;
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#22d3ee" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color="#6d28d9" />
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#6d28d9"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      <group ref={group}>
        {nodes.map(({ skill, position, color }) => (
          <SkillNode
            key={skill.name}
            position={position}
            label={skill.name}
            color={color}
          />
        ))}
      </group>
    </>
  );
}
