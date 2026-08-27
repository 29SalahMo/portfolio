"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

type ProjectType = (typeof projects)[number];

function ProjectCard({
  project,
  index,
  onOpenModal,
}: {
  project: ProjectType;
  index: number;
  onOpenModal: (project: ProjectType) => void;
}) {
  return (
    <article
      className={cn(
        "project-card glass neon-border group relative h-auto min-h-[400px] w-full max-w-full shrink-0 overflow-hidden rounded-3xl p-6 sm:min-h-[460px] sm:p-7 lg:h-[min(70vh,540px)] lg:w-[min(460px,42vw)] xl:w-[500px] xl:h-[580px] cursor-pointer",
        "transition-transform duration-500 will-change-transform hover:border-cyan-400/50",
      )}
      data-index={index}
      onClick={() => onOpenModal(project)}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-75",
          project.accent,
        )}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cyan-300">
              {project.category} | {project.year}
            </span>
            <span className="text-xs text-white/40 group-hover:text-cyan-300 transition-colors">
              Click for details &rarr;
            </span>
          </div>

          <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl md:text-3xl transition-colors group-hover:text-cyan-100">
            {project.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/70">
            {project.description}
          </p>

          <ul className="mt-4 space-y-1.5 text-xs text-white/65">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-center gap-2">
                <span className="text-cyan-400">&bull;</span>
                <span className="truncate">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-[11px] text-white/75"
              >
                {t}
              </span>
            ))}
            {project.stack.length > 4 ? (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/50">
                +{project.stack.length - 4}
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
            {project.github ? (
              <MagneticButton href={project.github} variant="ghost" external>
                GitHub
              </MagneticButton>
            ) : null}
            {project.live ? (
              <MagneticButton href={project.live} external>
                Live Demo
              </MagneticButton>
            ) : (
              <button
                type="button"
                onClick={() => onOpenModal(project)}
                className="rounded-full bg-cyan-400/20 px-4 py-2 text-xs font-semibold text-cyan-100 hover:bg-cyan-400/30"
              >
                View Details
              </button>
            )}
          </div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(34,211,238,0.14), transparent 40%)",
        }}
      />
    </article>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = track.querySelectorAll(".project-card");
    const mm = gsap.matchMedia();
    const tiltHandlers: Array<() => void> = [];

    cards.forEach((card) => {
      const el = card as HTMLElement;
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * 100;
        const my = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--mx", `${mx}%`);
        el.style.setProperty("--my", `${my}%`);
        const rotY = (mx - 50) / 14;
        const rotX = -(my - 50) / 14;
        gsap.to(el, {
          rotateY: rotY,
          rotateX: rotX,
          transformPerspective: 900,
          duration: 0.4,
          ease: "power2.out",
        });
      };
      const onLeave = () => {
        gsap.to(el, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "elastic.out(1,0.5)",
        });
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      tiltHandlers.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    mm.add("(min-width: 1024px)", () => {
      const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth + 100);
      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    // Refresh ScrollTrigger when filter changes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      tiltHandlers.forEach((off) => off());
      mm.revert();
    };
  }, [filtered]);

  const scrollTrack = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = direction === "left" ? -450 : 450;
    trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-black/40 py-12 lg:py-0"
    >
      <div className="section-pad pt-16 pb-6 sm:pt-24 sm:pb-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Projects"
            title="Premium project showcase"
            description="Explore selected work across AI, SaaS, web, mobile, and creative tech. Click any project for full details."
          />

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilter("All")}
                className={cn(
                  "rounded-full px-4 py-2 text-xs transition-all",
                  filter === "All"
                    ? "bg-cyan-400/20 text-cyan-100 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.25)] font-medium"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10",
                )}
              >
                All ({projects.length})
              </button>
              {projectCategories.map((cat) => {
                const count = projects.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "rounded-full px-4 py-2 text-xs transition-all",
                      filter === cat
                        ? "bg-cyan-400/20 text-cyan-100 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.25)] font-medium"
                        : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10",
                    )}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Quick Scroll Navigation Controls for Laptops */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTrack("left")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/15 hover:text-cyan-300"
                aria-label="Previous projects"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={() => scrollTrack("right")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/15 hover:text-cyan-300"
                aria-label="Next projects"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="section-pad flex flex-col gap-6 pb-12 lg:h-[min(78vh,660px)] lg:flex-row lg:items-center lg:gap-0 lg:pb-0">
        <div
          ref={trackRef}
          className="flex w-full flex-col gap-6 overflow-x-auto lg:overflow-x-visible lg:w-max lg:flex-row lg:gap-7 lg:px-6 scrollbar-none"
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpenModal={(p) => setActiveProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Project Detail Modal */}
      <AnimatePresence>
        {activeProject ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setActiveProject(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass neon-border relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-8 border border-cyan-400/30 bg-black/95 text-white shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
              >
                &times;
              </button>

              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-300">
                {activeProject.category} | {activeProject.year}
              </span>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl text-white">
                {activeProject.title}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                {activeProject.description}
              </p>

              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-widest text-cyan-300">
                  Key Highlights & Architecture
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {activeProject.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">&gt;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-widest text-cyan-300">
                  Tech Stack
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeProject.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                {activeProject.github ? (
                  <MagneticButton href={activeProject.github} variant="ghost" external>
                    View Source Code
                  </MagneticButton>
                ) : null}
                {activeProject.live ? (
                  <MagneticButton href={activeProject.live} external>
                    Launch Live Demo
                  </MagneticButton>
                ) : (
                  <MagneticButton href="#contact">
                    Request Private Demo
                  </MagneticButton>
                )}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
