"use client";

import { profile, passions } from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function About() {
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="section-pad py-20 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Engineering with cinematic precision"
          description="I design and ship full-stack products that feel premium - from AI systems and secure APIs to immersive 3D interfaces."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2" glow data-reveal>
            <h3 className="text-lg font-medium text-white">Who I am</h3>
            <p className="mt-3 leading-relaxed text-white/65">
              {profile.fullName} - {profile.graduation}. Based in{" "}
              {profile.location}. I combine software engineering with motion
              design and AI to build experiences that feel alive and
              production-ready.
            </p>
          </GlassCard>

          <GlassCard data-reveal>
            <h3 className="text-lg font-medium text-white">Focus</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              {passions.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-cyan-300">&gt;</span>
                  {p}
                </li>
              ))}
            </ul>
          </GlassCard>

          {profile.stats.map((s) => (
            <GlassCard key={s.label} data-reveal>
              <p className="text-3xl font-semibold text-cyan-200">{s.value}</p>
              <p className="mt-1 text-sm text-white/55">{s.label}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
