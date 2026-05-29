"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <article
      className={cn(
        "project-card glass neon-border group relative h-auto min-h-[420px] w-full max-w-full shrink-0 overflow-hidden rounded-3xl p-6 sm:min-h-[520px] sm:p-8 lg:h-[min(78vh,640px)] lg:w-[min(88vw,520px)]",
        "transition-transform duration-500 will-change-transform",
      )}
      data-index={index}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
          project.accent,
        )}
      />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
              {project.category} | {project.year}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70 md:text-base">
          {project.description}
        </p>

        <ul className="mt-4 space-y-2 text-sm text-white/60">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-violet-300">*</span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
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
            <MagneticButton href="#contact" variant="ghost">
              Request Demo
            </MagneticButton>
          )}
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(34,211,238,0.12), transparent 40%)",
        }}
      />
    </article>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

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
        const rotY = (mx - 50) / 12;
        const rotX = -(my - 50) / 12;
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
      const getScroll = () => track.scrollWidth - window.innerWidth + 120;
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

    return () => {
      tiltHandlers.forEach((off) => off());
      mm.revert();
    };
  }, [filtered]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-black/40"
    >
      <div className="section-pad pt-24 pb-8 sm:pt-28 sm:pb-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Projects"
            title="Premium project showcase"
            description="Scroll horizontally through selected work - AI, SaaS, web, mobile, and creative experiments."
          />

          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("All")}
              className={cn(
                "rounded-full px-4 py-2 text-xs transition-colors",
                filter === "All"
                  ? "bg-cyan-400/20 text-cyan-100"
                  : "bg-white/5 text-white/60 hover:text-white",
              )}
            >
              All
            </button>
            {projectCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs transition-colors",
                  filter === cat
                    ? "bg-cyan-400/20 text-cyan-100"
                    : "bg-white/5 text-white/60 hover:text-white",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="section-pad flex flex-col gap-6 pb-12 lg:h-[min(85vh,720px)] lg:flex-row lg:items-center lg:gap-0 lg:pb-0">
        <div
          ref={trackRef}
          className="flex w-full flex-col gap-6 lg:w-max lg:flex-row lg:gap-8 lg:px-6"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
