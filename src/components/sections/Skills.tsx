"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { skillCategories, skills, type SkillCategory } from "@/data/skills";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SkillCategory | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px" },
    );

    observer.observe(el);

    const timer = setTimeout(() => setIsVisible(true), 600);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
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
            ref={containerRef}
            className="glass neon-border relative h-[420px] overflow-hidden rounded-3xl"
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
              mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            }}
            data-reveal
          >
            {isVisible ? (
              <Canvas camera={{ position: [0, 0, 5.5], fov: 52 }} dpr={[1, 1.5]}>
                <Suspense fallback={null}>
                  <SkillsGalaxy mouseRef={mouseRef} activeCategory={activeCategory} />
                </Suspense>
              </Canvas>
            ) : null}
          </div>

          <div className="space-y-4">
            {skillCategories.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              const isActive = activeCategory === cat;
              return (
                <div
                  key={cat}
                  onMouseEnter={() => setActiveCategory(cat)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <GlassCard
                    data-reveal
                    className={`transition-all duration-300 ${
                      isActive ? "border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_25px_rgba(34,211,238,0.2)]" : ""
                    }`}
                  >
                    <h3 className={`text-sm font-medium transition-colors ${isActive ? "text-cyan-100" : "text-cyan-200"}`}>
                      {cat}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {catSkills.map((s) => (
                        <span
                          key={s.name}
                          className={`rounded-full px-3 py-1 text-xs transition-all ${
                            isActive
                              ? "bg-cyan-400/25 text-white shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                              : "bg-white/5 text-white/75"
                          }`}
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

