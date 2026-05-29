"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { skillCategories, skills } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SkillsGalaxy = dynamic(
  () => import("@/components/three/SkillsGalaxy").then((m) => m.SkillsGalaxy),
  { ssr: false },
);

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const ref = useGsapReveal<HTMLElement>();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#skills",
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => setScrollProgress(self.progress),
    });
    return () => trigger.kill();
  }, []);

  return (
    <section id="skills" ref={ref} className="section-pad relative py-20 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="Futuristic skills galaxy"
          description="Technologies orbit in 3D space - explore categories and the stack that powers my work."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div
            className="glass neon-border relative h-[420px] overflow-hidden rounded-3xl"
            data-reveal
          >
            <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }} dpr={[1, 1.5]}>
              <Suspense fallback={null}>
                <SkillsGalaxy scrollProgress={scrollProgress} />
              </Suspense>
            </Canvas>
          </div>

          <div className="space-y-4">
            {skillCategories.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              return (
                <GlassCard key={cat} data-reveal>
                  <h3 className="text-sm font-medium text-cyan-200">{cat}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {catSkills.map((s) => (
                      <span
                        key={s.name}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/75"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
