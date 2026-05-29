"use client";

import { timeline } from "@/data/timeline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { cn } from "@/lib/cn";

export function Journey() {
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.12 });

  return (
    <section id="journey" ref={ref} className="section-pad py-20 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Journey"
          title="Experience timeline"
          description="Milestones across AI, full-stack systems, mobile apps, and security-focused engineering."
        />

        <div className="relative mt-16">
          <div
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/80 via-violet-500/50 to-transparent md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <ol className="space-y-10">
            {timeline.map((item, i) => (
              <li
                key={`${item.year}-${item.title}`}
                data-reveal
                className={cn(
                  "relative grid gap-4 md:grid-cols-2 md:gap-12",
                  i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2",
                )}
              >
                <div className="md:text-right">
                  <span className="inline-block rounded-full bg-cyan-400/15 px-3 py-1 text-xs text-cyan-200">
                    {item.year}
                  </span>
                </div>

                <div className="glass neon-border relative rounded-2xl p-6 md:max-w-lg">
                  <span className="absolute -left-[1.35rem] top-6 hidden h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)] md:left-1/2 md:-translate-x-1/2 md:block" />
                  <p className="text-xs uppercase tracking-wider text-violet-300/90">
                    {item.org}
                  </p>
                  <h3 className="mt-1 text-lg font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
