"use client";

import { useMemo, useState } from "react";
import {
  skills,
  skillCategories,
  skillCategoryMeta,
  type Skill,
  type SkillCategory,
} from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { cn } from "@/lib/cn";

type VerifiedFilter = "All" | "Workplace" | "Academic" | "Projects" | "Certification";

export function Skills() {
  const ref = useGsapReveal<HTMLElement>();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "All">("All");
  const [selectedSource, setSelectedSource] = useState<VerifiedFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null);

  // Filter skills based on category, source, and search
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;
      const matchesSource =
        selectedSource === "All" || skill.verifiedIn === selectedSource;
      const matchesSearch =
        !searchQuery.trim() ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSource && matchesSearch;
    });
  }, [selectedCategory, selectedSource, searchQuery]);

  const copySkillName = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(name);
    setCopiedSkill(name);
    setTimeout(() => setCopiedSkill(null), 2000);
  };

  const verificationBadgeStyles: Record<Skill["verifiedIn"], string> = {
    Workplace: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
    Academic: "bg-purple-500/15 text-purple-300 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]",
    Projects: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.2)]",
    Certification: "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
  };

  return (
    <section id="skills" ref={ref} className="section-pad relative py-14 md:py-20 xl:py-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-full max-w-5xl -translate-x-1/2 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Tech Stack & Tools"
          title="Verified Technical Capabilities Matrix"
          description="Explore hands-on infrastructure engineering, IT technical support, cybersecurity, prompt systems, and full-stack software development with interactive filtering."
        />

        {/* Metrics Strip */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" data-reveal>
          <div className="glass rounded-2xl border border-cyan-400/20 bg-cyan-950/20 p-4 text-center">
            <p className="text-2xl font-black text-cyan-300 sm:text-3xl">6</p>
            <p className="mt-1 text-xs font-medium text-white/70">Core Domains</p>
          </div>
          <div className="glass rounded-2xl border border-emerald-400/20 bg-emerald-950/20 p-4 text-center">
            <p className="text-2xl font-black text-emerald-300 sm:text-3xl">32</p>
            <p className="mt-1 text-xs font-medium text-white/70">Verified Technologies</p>
          </div>
          <div className="glass rounded-2xl border border-violet-400/20 bg-violet-950/20 p-4 text-center">
            <p className="text-2xl font-black text-violet-300 sm:text-3xl">2</p>
            <p className="mt-1 text-xs font-medium text-white/70">Corporate Branches</p>
          </div>
          <div className="glass rounded-2xl border border-pink-400/20 bg-pink-950/20 p-4 text-center">
            <p className="text-2xl font-black text-pink-300 sm:text-3xl">100%</p>
            <p className="mt-1 text-xs font-medium text-white/70">Production Validated</p>
          </div>
        </div>

        {/* Interactive Cyberpunk Control Console */}
        <div className="glass neon-border mt-8 rounded-3xl p-5 sm:p-7 border border-white/10" data-reveal>
          {/* Search Bar & Stats */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/40">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills by keyword (e.g. Windows, Next.js, Malware, Docker, SLA)..."
                className="w-full rounded-2xl border border-white/15 bg-black/60 py-3 pl-11 pr-10 text-sm text-white placeholder-white/40 outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60 hover:text-white"
                >
                  ✕
                </button>
              ) : null}
            </div>

            {/* Source Origin Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(["All", "Workplace", "Projects", "Academic", "Certification"] as VerifiedFilter[]).map(
                (src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSelectedSource(src)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      selectedSource === src
                        ? "bg-cyan-400/25 text-cyan-200 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5",
                    )}
                  >
                    {src === "Workplace" ? "🏢 Workplace" : src === "Projects" ? "⚡ Projects" : src === "Academic" ? "🎓 Academic" : src === "Certification" ? "📜 Certs" : "All Sources"}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                selectedCategory === "All"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10",
              )}
            >
              <span>🌐</span>
              <span>All Categories</span>
              <span className="rounded-full bg-black/40 px-1.5 py-0.2 text-[10px]">
                {skills.length}
              </span>
            </button>

            {skillCategories.map((cat) => {
              const meta = skillCategoryMeta[cat];
              const isSelected = selectedCategory === cat;
              const count = skills.filter((s) => s.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
                    isSelected
                      ? "bg-cyan-400/20 text-cyan-100 border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10",
                  )}
                >
                  <span>{meta.icon}</span>
                  <span>{meta.label}</span>
                  <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[10px] text-white/60">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-6 flex items-center justify-between text-xs text-white/50 px-2" data-reveal>
          <p>
            Showing <span className="font-semibold text-cyan-300">{filteredSkills.length}</span> technologies
            {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
            {selectedSource !== "All" ? ` (${selectedSource})` : ""}
          </p>
          <p className="hidden sm:block">Click any skill to view operational context & details</p>
        </div>

        {/* Holographic Bento Matrix Grid */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" data-reveal>
          {filteredSkills.map((skill) => {
            const meta = skillCategoryMeta[skill.category];
            const isCopied = copiedSkill === skill.name;

            return (
              <div
                key={skill.name}
                onClick={() => setActiveSkill(skill)}
                className="glass group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] cursor-pointer"
              >
                {/* Glow ambient background on hover */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl transition-all group-hover:bg-cyan-400/25" />

                <div>
                  {/* Top Bar: Icon & Origin Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-lg">{meta.icon}</span>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase",
                        verificationBadgeStyles[skill.verifiedIn],
                      )}
                    >
                      {skill.verifiedIn}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="mt-3.5 text-base font-bold text-white transition-colors group-hover:text-cyan-200">
                    {skill.name}
                  </h3>

                  {/* Operational Context Summary */}
                  <p className="mt-2 text-xs leading-relaxed text-white/65 line-clamp-2">
                    {skill.description}
                  </p>
                </div>

                {/* Footer: Competency Level & Segments */}
                <div className="mt-4 border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-white/40">Proficiency</span>
                    <span className="font-semibold text-cyan-300">{skill.level}</span>
                  </div>

                  {/* Glowing 5-Segment Bar */}
                  <div className="mt-2 flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((step) => {
                      const isFilled = step <= skill.proficiency;
                      return (
                        <div
                          key={step}
                          className={cn(
                            "h-1.5 flex-1 rounded-full transition-all duration-300",
                            isFilled
                              ? "bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                              : "bg-white/10",
                          )}
                        />
                      );
                    })}
                  </div>

                  {/* Quick Copy Tooltip */}
                  <div className="mt-3 flex items-center justify-between text-[10px] text-white/40 group-hover:text-white/70">
                    <span className="truncate">{skill.category}</span>
                    <button
                      type="button"
                      onClick={(e) => copySkillName(skill.name, e)}
                      className="rounded px-1.5 py-0.5 hover:bg-white/10 hover:text-cyan-300 transition-colors"
                      title="Copy skill name"
                    >
                      {isCopied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Fallback */}
        {filteredSkills.length === 0 ? (
          <div className="glass mt-6 rounded-3xl border border-white/10 p-12 text-center" data-reveal>
            <p className="text-3xl">🔍</p>
            <h4 className="mt-3 text-lg font-bold text-white">No matching skills found</h4>
            <p className="mt-1 text-sm text-white/60">
              Try searching with another keyword or reset your category and source filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedSource("All");
              }}
              className="mt-4 rounded-full bg-cyan-400/20 px-5 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-400/30"
            >
              Reset All Filters
            </button>
          </div>
        ) : null}

        {/* Interactive Skill Detail Modal */}
        {activeSkill ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveSkill(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            <div
              className="glass neon-border relative z-10 w-full max-w-lg rounded-3xl border border-cyan-400/30 bg-black/95 p-6 sm:p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveSkill(null)}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
              >
                ✕
              </button>

              <div className="flex items-center gap-2">
                <span className="text-2xl">{skillCategoryMeta[activeSkill.category].icon}</span>
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase",
                    verificationBadgeStyles[activeSkill.verifiedIn],
                  )}
                >
                  {activeSkill.verifiedIn} Verified
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-black text-white">{activeSkill.name}</h3>

              <p className="mt-1 text-xs font-medium text-cyan-300">
                {activeSkill.category} &bull; {activeSkill.level} Level
              </p>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <h4 className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
                  Operational Experience & Architecture
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {activeSkill.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="text-[11px] text-white/40">Competency Rating</p>
                  <p className="text-sm font-bold text-cyan-300">{activeSkill.proficiency} / 5</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => copySkillName(activeSkill.name, e)}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    {copiedSkill === activeSkill.name ? "✓ Copied!" : "Copy Skill"}
                  </button>
                  <a
                    href="#projects"
                    onClick={() => setActiveSkill(null)}
                    className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-xs font-semibold text-black shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:brightness-110"
                  >
                    View Projects &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

