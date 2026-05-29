"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import {
  buildDefaultWhatsAppGreeting,
  buildWhatsAppUrl,
  sendViaWhatsAppAndEmail,
} from "@/lib/contact";

const ContactSphere = dynamic(
  () => import("@/components/three/ContactSphere").then((m) => m.ContactSphere),
  { ssr: false },
);

export function Contact() {
  const ref = useGsapReveal<HTMLElement>();
  const [focused, setFocused] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const whatsappQuickUrl = buildWhatsAppUrl(buildDefaultWhatsAppGreeting());
  const emailQuickUrl = `mailto:${profile.contactEmail}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent("Hi Salahaldin,\n\nI saw your portfolio and would like to connect.\n\n")}`;
  const telUrl = `tel:${profile.phone.replace(/\s/g, "")}`;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    sendViaWhatsAppAndEmail({ name, email, message });

    setSent(true);
    setSending(false);
    form.reset();
    window.setTimeout(() => setSent(false), 6000);
  };

  return (
    <section id="contact" ref={ref} className="section-pad py-20 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something elite"
          description="Fill the form and tap Send  WhatsApp and your email app open with your message ready."
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
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-lg">
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
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-lg">
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

              <button
                type="submit"
                disabled={sending}
                className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 px-6 py-4 text-base font-semibold text-black shadow-[0_0_30px_rgba(34,211,238,0.35)] transition-all hover:brightness-110 disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
              <p className="text-center text-xs text-white/45">
                Opens WhatsApp ({profile.phoneDisplay}) and your email app to{" "}
                {profile.contactEmail}
              </p>
            </form>

            <AnimatePresence>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 space-y-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100"
                >
                  <p className="font-medium">Ready to send</p>
                  <p className="text-white/70">
                    1. In WhatsApp, tap <strong>Send</strong> to deliver your
                    message to {profile.phoneDisplay}.
                  </p>
                  <p className="text-white/70">
                    2. In your email app, tap <strong>Send</strong> to email
                    Salahaldin.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={whatsappQuickUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-200"
                    >
                      Open WhatsApp again
                    </a>
                    <a
                      href={emailQuickUrl}
                      className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-200"
                    >
                      Open email again
                    </a>
                  </div>
                </motion.div>
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
                href={telUrl}
                className="glass rounded-full px-4 py-2 text-xs text-white/75 hover:text-cyan-200"
              >
                Call
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
