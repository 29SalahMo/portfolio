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
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 1.1,
      });

      const roles = rolesRef.current?.querySelectorAll("[data-role]");
      if (roles?.length) {
        gsap.to(roles, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 1.6,
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
        <p
          data-hero
          className="mb-6 text-xs uppercase tracking-[0.35em] text-cyan-300/80 sm:tracking-[0.45em]"
        >
          Portfolio / 2026
        </p>

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
          <MagneticButton href="#contact" variant="ghost">
            Contact Me
          </MagneticButton>
          <MagneticButton href={profile.github} variant="ghost" external>
            GitHub
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
