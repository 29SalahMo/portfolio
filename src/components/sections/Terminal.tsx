"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGsapReveal } from "@/hooks/useGsapReveal";

const lines = [
  { id: "boot", text: "> boot portfolio --mode=cinematic" },
  { id: "loading", text: "> loading modules: react, three, gsap, lenis ... OK" },
  { id: "auth", text: "> auth: open_to_work = true" },
  { id: "deploy", text: "> deploy target: recruiters | startups | clients" },
  { id: "status", text: "> status: ready_to_build" },
] as const;

export function Terminal() {
  const sectionRef = useGsapReveal<HTMLElement>();
  const [visible, setVisible] = useState<typeof lines[number]["id"][]>([]);

  useEffect(() => {
    let index = 0;
    let cancelled = false;

    const id = window.setInterval(() => {
      if (cancelled || index >= lines.length) {
        window.clearInterval(id);
        return;
      }
      const line = lines[index];
      index += 1;
      setVisible((prev) =>
        prev.includes(line.id) ? prev : [...prev, line.id],
      );
    }, 700);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-pad pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <GlassCard className="font-mono text-sm" glow>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-cyan-300/80">
            AI Terminal
          </p>
          <div className="space-y-2 text-green-300/90">
            {lines
              .filter((line) => visible.includes(line.id))
              .map((line) => (
                <p key={line.id} data-reveal>
                  {line.text}
                  <span className="animate-pulse">_</span>
                </p>
              ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
