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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const whatsappQuickUrl = buildWhatsAppUrl(buildDefaultWhatsAppGreeting());
  const telUrl = `tel:${profile.phone.replace(/\s/g, "")}`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const website = String(data.get("website") || "").trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(
          json.error ??
            "Could not send email. Try WhatsApp or email links below.",
        );
        return;
      }

      setStatus("success");
      form.reset();
      window.setTimeout(() => setStatus("idle"), 8000);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again or use WhatsApp.");
    }
  };

  const openWhatsAppWithForm = () => {
    const form = document.getElementById("contact-form") as HTMLFormElement | null;
    if (!form) {
      window.open(whatsappQuickUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const data = new FormData(form);
    const name = String(data.get("name") || "there").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const text = message
      ? `Hello Salahaldin, I'm ${name}.\n\n${message}\n\nReply-to: ${email}`
      : buildDefaultWhatsAppGreeting(name);
    window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" ref={ref} className="section-pad py-20 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something elite"
          description="Send a message directly to my inbox, or reach me on WhatsApp and email."
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
                <ContactSphere active={focused || status === "success"} />
              </Suspense>
            </Canvas>
          </div>

          <GlassCard className="relative" glow data-reveal>
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={openWhatsAppWithForm}
                className="glass flex w-full items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-left transition-colors hover:bg-green-500/15"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-lg">
                  WA
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">WhatsApp</p>
                  <p className="truncate text-xs text-white/55">
                    {profile.phoneDisplay}
                  </p>
                </div>
              </button>
              <a
                href={`mailto:${profile.contactEmail}`}
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

            <form id="contact-form" className="space-y-4" onSubmit={onSubmit}>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="pointer-events-none absolute h-0 w-0 opacity-0"
                aria-hidden
              />

              <div>
                <label className="text-xs text-white/50" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  disabled={status === "sending"}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white outline-none focus:border-cyan-400/50 disabled:opacity-60"
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
                  disabled={status === "sending"}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white outline-none focus:border-cyan-400/50 disabled:opacity-60"
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
                  disabled={status === "sending"}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white outline-none focus:border-cyan-400/50 disabled:opacity-60"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 px-6 py-4 text-base font-semibold text-black shadow-[0_0_30px_rgba(34,211,238,0.35)] transition-all hover:brightness-110 disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              <p className="text-center text-xs text-white/45">
                Delivers to {profile.contactEmail}
              </p>
            </form>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl border border-green-400/30 bg-green-400/10 p-4 text-sm text-green-100"
                >
                  <p className="font-medium">Message sent successfully</p>
                  <p className="mt-1 text-white/70">
                    Thanks! I will reply to your email soon.
                  </p>
                </motion.div>
              ) : null}
              {status === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100"
                >
                  <p className="font-medium">Could not send</p>
                  <p className="mt-1 text-white/70">{errorMsg}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={openWhatsAppWithForm}
                      className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-200"
                    >
                      Try WhatsApp
                    </button>
                    <a
                      href={buildMailtoUrl({
                        name: "Visitor",
                        email: "visitor@email.com",
                        message: "Hello from your portfolio",
                      })}
                      className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-200"
                    >
                      Try email app
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
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
