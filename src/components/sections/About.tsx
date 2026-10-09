"use client";

import { profile, passions } from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function About() {
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="section-pad py-14 md:py-20 xl:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About Me"
          title="Bridging IT Infrastructure, AI & Full-Stack Development"
          description="I combine practical IT support execution with analytical data reasoning, machine learning research, and full-stack software development."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2" glow data-reveal>
            <h3 className="text-lg font-medium text-white">Professional Profile</h3>
            <p className="mt-3 leading-relaxed text-white/75">
              I am <strong className="text-white">{profile.fullName}</strong>, currently serving as an <strong className="text-cyan-300">IT Technical Support Engineer</strong> at <strong className="text-cyan-200">{profile.currentCompany}</strong> (Oct 1, 2026 – Present). 
            </p>
            <p className="mt-3 leading-relaxed text-white/70">
              Holding a {profile.graduation}, my current role spans multi-branch IT technical operations, hardware deployment, malware incident response handling, statistical reporting, engineering surveys, and AI-assisted workflow acceleration.
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
