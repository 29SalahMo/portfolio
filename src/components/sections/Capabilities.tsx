"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { capabilities, type Capability } from "@/data/capabilities";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { cn } from "@/lib/cn";

export function Capabilities() {
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.08 });
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);

  const categories = [
    "All",
    "Workplace Experience",
    "Engineering & AI",
    "Software Development",
  ];

  const filtered =
    activeCategory === "All"
      ? capabilities
      : capabilities.filter((c) => c.category === activeCategory);

  return (
    <section id="capabilities" ref={ref} className="section-pad py-20 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Core Competencies"
          title="Interactive Capabilities"
          description="A breakdown of verified engineering strengths — clearly separating hands-on workplace experience from academic research and software projects."
        />

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3" data-reveal>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300",
                activeCategory === cat
                  ? "bg-cyan-400/20 text-cyan-100 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((cap) => {
            const isWorkplace = cap.category === "Workplace Experience";
            const isAI = cap.category === "Engineering & AI";

            return (
              <motion.div
                key={cap.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                data-reveal
              >
                <GlassCard
                  glow
                  className="group relative flex h-full flex-col justify-between p-6 cursor-pointer transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)]"
                  onClick={() => setSelectedCapability(cap)}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                          isWorkplace
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : isAI
                            ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                            : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
                        )}
                      >
                        {cap.category}
                      </span>
                      <span className="text-xs text-white/40 group-hover:text-cyan-300 transition-colors">
                        &rarr;
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-white transition-colors group-hover:text-cyan-100">
                      {cap.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-white/70 line-clamp-3">
                      {cap.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-2">
                      Verified Tools
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tools.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] text-white/75"
                        >
                          {tool}
                        </span>
                      ))}
                      {cap.tools.length > 3 ? (
                        <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] text-white/50">
                          +{cap.tools.length - 3}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Modal detail dialog for selected capability */}
        <AnimatePresence>
          {selectedCapability ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={() => setSelectedCapability(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="glass neon-border relative z-10 w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-cyan-400/30 bg-black/95 text-white shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              >
                <button
                  type="button"
                  onClick={() => setSelectedCapability(null)}
                  className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                >
                  &times;
                </button>

                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  {selectedCapability.category}
                </span>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  {selectedCapability.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-white/80">
                  {selectedCapability.fullDescription}
                </p>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <h4 className="text-xs uppercase tracking-widest text-cyan-300 font-semibold mb-3">
                    Verified Tools & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCapability.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
