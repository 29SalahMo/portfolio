"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { problemSolvingPrinciples, featuredAIProjects } from "@/data/aiShowcase";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function AIShowcase() {
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.1 });

  return (
    <section id="ai-showcase" ref={ref} className="section-pad py-20 md:py-36 bg-black/30">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Methodology & Algorithms"
          title="AI, Algorithms & Decision-Making"
          description="How I approach complex technical and business problems — combining algorithmic thinking, evidence-based reasoning, and responsible AI workflows."
        />

        {/* 4 Problem Solving Principles */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {problemSolvingPrinciples.map((p) => (
            <GlassCard key={p.step} className="p-6 relative overflow-hidden group">
              <span className="text-4xl font-black text-cyan-400/20 group-hover:text-cyan-400/40 transition-colors">
                {p.step}
              </span>
              <h3 className="mt-2 text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                {p.description}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Featured Verified Projects Showcase */}
        <div className="mt-16" data-reveal>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Verified AI & Algorithmic Projects
            </h3>
            <span className="text-xs text-cyan-300 font-mono">
              Live & Open-Source Code
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredAIProjects.map((proj) => (
              <GlassCard
                key={proj.id}
                glow
                className="flex flex-col justify-between p-6 sm:p-7 border border-white/15"
              >
                <div>
                  <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-3 py-1 text-[11px] font-semibold text-violet-300 uppercase tracking-wider">
                    {proj.badge}
                  </span>
                  <h4 className="mt-3 text-xl font-bold text-white">
                    {proj.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-white/75">
                    {proj.description}
                  </p>

                  <div className="mt-4 rounded-xl bg-white/5 p-3.5 border border-white/10">
                    <p className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider">
                      Technical Approach & Validation
                    </p>
                    <p className="mt-1 text-xs text-white/70 leading-relaxed">
                      {proj.methodology}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-black/50 px-2.5 py-0.5 text-[10px] text-white/80"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {proj.liveUrl ? (
                      <MagneticButton href={proj.liveUrl} external>
                        Try Live Demo
                      </MagneticButton>
                    ) : null}
                    {proj.githubUrl ? (
                      <MagneticButton href={proj.githubUrl} variant="ghost" external>
                        View Code
                      </MagneticButton>
                    ) : null}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
