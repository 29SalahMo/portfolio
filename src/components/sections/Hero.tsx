"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", {
        y: 50,
        opacity: 0,
        duration: 1.0,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      });

      const roles = rolesRef.current?.querySelectorAll("[data-role]");
      if (roles?.length) {
        gsap.to(roles, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.8,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="section-pad relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))]"
    >
      <HeroCanvas />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div
          data-hero
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.25)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Available for Full Stack & AI Engineering Roles (2026)
        </div>

        <div data-hero className="mb-6">
          <ProfileAvatar size="lg" />
        </div>

        <h1
          ref={titleRef}
          data-hero
          className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-br from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent">
            {profile.name}
          </span>
        </h1>

        <div
          ref={rolesRef}
          className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {profile.roles.map((role) => (
            <span
              key={role}
              data-role
              className="glass rounded-full px-3 py-1.5 text-xs text-white/80 opacity-0 sm:px-4 sm:py-2 sm:text-sm"
              style={{ transform: "translateY(12px)" }}
            >
              {role}
            </span>
          ))}
        </div>

        <p
          data-hero
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:mt-8 sm:text-lg md:text-xl"
        >
          {profile.tagline}
        </p>

        <div
          data-hero
          className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4"
        >
          <MagneticButton href="#projects">View Projects</MagneticButton>
          <MagneticButton
            href={profile.cv.en}
            external
            download="Salahaldin_CV_EN.pdf"
          >
            CV (English)
          </MagneticButton>
          <MagneticButton href={profile.cv.ar} external>
            CV (Arabic)
          </MagneticButton>
          <MagneticButton href={profile.github} external>
            GitHub
          </MagneticButton>
          <MagneticButton href={profile.linkedin} external>
            LinkedIn
          </MagneticButton>
          <MagneticButton href="#contact">
            Contact Me
          </MagneticButton>
        </div>

        <motion.div
          className="mt-14 flex flex-col items-center gap-2 text-white/40 sm:mt-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-cyan-300/80 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
