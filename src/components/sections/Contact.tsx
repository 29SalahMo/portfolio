"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import {
  buildDefaultWhatsAppGreeting,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from "@/lib/contact";

const ContactSphere = dynamic(
  () => import("@/components/three/ContactSphere").then((m) => m.ContactSphere),
  { ssr: false },
);

export function Contact() {
  const ref = useGsapReveal<HTMLElement>();
  const [focused, setFocused] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendVia, setSendVia] = useState<"email" | "whatsapp">("whatsapp");

  const whatsappQuickUrl = buildWhatsAppUrl(buildDefaultWhatsAppGreeting());
  const emailQuickUrl = `mailto:${profile.contactEmail}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent("Hi Salahaldin,\n\nI saw your portfolio and would like to connect.\n\n")}`;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const fullMessage = `Hello Salahaldin, I'm ${name}.\n\n${message}\n\nReply-to email: ${email}`;

    if (sendVia === "whatsapp") {
      window.open(buildWhatsAppUrl(fullMessage), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = buildMailtoUrl({ name, email, message });
    }

    setSent(true);
    form.reset();
    window.setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" ref={ref} className="section-pad py-20 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something elite"
          description="Message me on WhatsApp or email - one tap to open a pre-filled conversation."
        />

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          <div
            className="glass neon-border relative min-h-[280px] overflow-hidden rounded-3xl sm:min-h-[360px]"
            data-reveal
          >
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.25]}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <pointLight position={[2, 2, 2]} intensity={1} color="#22d3ee" />
                <ContactSphere active={focused || sent} />
              </Suspense>
            </Canvas>
          </div>

          <GlassCard className="relative" glow data-reveal>
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <a
                href={whatsappQuickUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 transition-colors hover:bg-green-500/15"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-lg">
                  WA
                </span>
                <div className="min-w-0 text-left">
                  <p className="text-sm font-medium text-white">WhatsApp</p>
                  <p className="truncate text-xs text-white/55">
                    {profile.phoneDisplay}
                  </p>
                </div>
              </a>
              <a
                href={emailQuickUrl}
                className="glass flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 transition-colors hover:bg-cyan-500/15"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-lg">
                  @
                </span>
                <div className="min-w-0 text-left">
                  <p className="text-sm font-medium text-white">Email</p>
                  <p className="truncate text-xs text-white/55">
                    {profile.contactEmail}
                  </p>
                </div>
              </a>
            </div>

            <div className="mb-4 flex gap-2">
              <button
                type="button"
                onClick={() => setSendVia("whatsapp")}
                className={`flex-1 rounded-full px-3 py-2 text-xs transition-colors ${
                  sendVia === "whatsapp"
                    ? "bg-green-500/25 text-green-100"
                    : "bg-white/5 text-white/60"
                }`}
              >
                Send via WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setSendVia("email")}
                className={`flex-1 rounded-full px-3 py-2 text-xs transition-colors ${
                  sendVia === "email"
                    ? "bg-cyan-400/25 text-cyan-100"
                    : "bg-white/5 text-white/60"
                }`}
              >
                Send via Email
              </button>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="text-xs text-white/50" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white outline-none focus:border-cyan-400/50"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="text-xs text-white/50" htmlFor="email">
                  Your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white outline-none focus:border-cyan-400/50"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="text-xs text-white/50" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white outline-none focus:border-cyan-400/50"
                  placeholder="Tell me about your project..."
                />
              </div>
              <MagneticButton type="submit">
                {sendVia === "whatsapp" ? "Open WhatsApp" : "Open Email App"}
              </MagneticButton>
            </form>

            <AnimatePresence>
              {sent ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-sm text-cyan-200"
                >
                  {sendVia === "whatsapp"
                    ? "WhatsApp opened with your message - tap Send there to deliver."
                    : "Email app opened - review and send your message."}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full px-4 py-2 text-xs text-white/75 hover:text-cyan-200"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full px-4 py-2 text-xs text-white/75 hover:text-cyan-200"
              >
                LinkedIn
              </a>
              <a
                href={whatsappQuickUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full px-4 py-2 text-xs text-white/75 hover:text-green-200"
              >
                WhatsApp
              </a>
              <a
                href={emailQuickUrl}
                className="glass rounded-full px-4 py-2 text-xs text-white/75 hover:text-cyan-200"
              >
                Email
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
