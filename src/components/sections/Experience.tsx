"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { motion } from "framer-motion";

export function Experience() {
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.1 });

  return (
    <section id="experience" ref={ref} className="section-pad py-14 md:py-20 xl:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Workplace Experience"
          title="Hands-on IT Engineering & Operations"
          description="Direct operational exposure across multi-branch IT support, incident recovery, data reporting, and AI productivity."
        />

        {/* Featured Current Role Card */}
        <div className="mt-14" data-reveal>
          <div className="glass neon-border relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 border border-cyan-400/35 bg-gradient-to-br from-cyan-950/40 via-black/80 to-violet-950/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                  </span>
                  Current Position &bull; Oct 1, 2026 – Present
                </div>
                <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl md:text-4xl tracking-tight">
                  IT Technical Support Engineer
                </h3>
                <p className="mt-1.5 text-base font-medium text-cyan-200 sm:text-lg">
                  SEVEN HANDS FOR ENGINEERING SERVICES & CONSTRUCTION
                </p>
              </div>

              <div className="flex flex-col items-start sm:items-end text-xs text-white/60">
                <span className="rounded-lg bg-white/5 px-3 py-1.5 border border-white/10">
                  📍 2 Corporate Branches
                </span>
                <span className="mt-2 text-white/50">Engineering & Admin Operations</span>
              </div>
            </div>

            {/* 4 Core Responsibility Grid Cards */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Card 1 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 font-bold text-sm">
                  01
                </div>
                <h4 className="mt-4 text-base font-bold text-white">
                  Multi-Branch IT Operations
                </h4>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-white/70">
                  <li className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">&bull;</span>
                    Technical support and troubleshooting across two company branches.
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">&bull;</span>
                    Hardware deployment, monitor setups, peripheral & cabling configuration.
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">&bull;</span>
                    Support for engineering and administrative staff to ensure business continuity.
                  </li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-violet-400/40 hover:bg-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300 font-bold text-sm">
                  02
                </div>
                <h4 className="mt-4 text-base font-bold text-white">
                  Cybersecurity & Incident Support
                </h4>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-white/70">
                  <li className="flex items-start gap-1.5">
                    <span className="text-violet-400 font-bold">&bull;</span>
                    Identification and rapid troubleshooting of malware-related issues.
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-violet-400 font-bold">&bull;</span>
                    Contribution to threat isolation and technical data recovery.
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-violet-400 font-bold">&bull;</span>
                    Security awareness, risk prioritization, and structured troubleshooting.
                  </li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-sm">
                  03
                </div>
                <h4 className="mt-4 text-base font-bold text-white">
                  Data Analysis & Reporting
                </h4>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-white/70">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">&bull;</span>
                    Data organization, analysis, and statistical interpretation.
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">&bull;</span>
                    Preparation of internal reports and engineering survey summaries.
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">&bull;</span>
                    Transforming raw metrics into evidence to support business decisions.
                  </li>
                </ul>
              </div>

              {/* Card 4 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-blue-400/40 hover:bg-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300 font-bold text-sm">
                  04
                </div>
                <h4 className="mt-4 text-base font-bold text-white">
                  AI-Enhanced Productivity
                </h4>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-white/70">
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-400 font-bold">&bull;</span>
                    Applying AI tools to accelerate research and information processing.
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-400 font-bold">&bull;</span>
                    Structured prompt engineering and iterative output verification.
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-400 font-bold">&bull;</span>
                    Identifying automation opportunities with independent judgment.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Role: HCC */}
        <div className="mt-6" data-reveal>
          <GlassCard className="p-6 sm:p-7 border border-white/15">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                  Previous Role &bull; 5 Months
                </span>
                <h4 className="mt-2 text-xl font-bold text-white">
                  IT Help Desk Engineer
                </h4>
                <p className="text-sm font-medium text-cyan-300">HCC</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-white/70">
                <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">SLA Helpdesk</span>
                <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">Office 365</span>
                <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">Active Directory Basics</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Delivered first-line technical support for workstation users, resolving software, hardware, and network tickets within strict SLA metrics. Configured Office 365 accounts, prepared workstation deployments, installed software suites (Adobe, Microsoft Office), and escalated complex incidents to network specialists.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
