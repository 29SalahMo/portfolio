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
import { cn } from "@/lib/cn";

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
    <section id="skills" ref={ref} className="section-pad relative py-14 md:py-20 xl:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Tech Stack & Tools"
          title="Verified Technical Stack"
          description="A transparent breakdown of operating systems, hardware, cybersecurity, reporting, AI productivity, and full-stack software development."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div
            ref={containerRef}
            className="glass neon-border relative h-[480px] overflow-hidden rounded-3xl"
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
                    className={`transition-all duration-300 p-5 ${
                      isActive ? "border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_25px_rgba(34,211,238,0.2)]" : ""
                    }`}
                  >
                    <h3 className={`text-sm font-bold transition-colors ${isActive ? "text-cyan-100" : "text-cyan-200"}`}>
                      {cat}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {catSkills.map((s) => (
                        <span
                          key={s.name}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-all",
                            isActive
                              ? "bg-cyan-400/25 text-white shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                              : "bg-white/5 text-white/80 border border-white/10",
                          )}
                        >
                          <span>{s.name}</span>
                          <span
                            className={cn(
                              "text-[9px] px-1.5 py-0.2 rounded font-mono",
                              s.verifiedIn === "Workplace"
                                ? "bg-emerald-500/30 text-emerald-200"
                                : s.verifiedIn === "Academic"
                                ? "bg-purple-500/30 text-purple-200"
                                : s.verifiedIn === "Certification"
                                ? "bg-amber-500/30 text-amber-200"
                                : "bg-cyan-500/30 text-cyan-200",
                            )}
                          >
                            {s.verifiedIn}
                          </span>
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


