"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
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

const quickPrompts = [
  "🚀 Full Stack Web App",
  "🤖 AI System / ML Integration",
  "📱 Mobile Application",
  "⚡ Technical Consultation",
];

export function Contact() {
  const ref = useGsapReveal<HTMLElement>();
  const sphereContainerRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const el = sphereContainerRef.current;
    if (!el) {
      setIsCanvasVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCanvasVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" },
    );

    observer.observe(el);

    const timer = setTimeout(() => setIsVisible(true), 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  function setIsVisible(val: boolean) {
    setIsCanvasVisible(val);
  }

  const whatsappQuickUrl = buildWhatsAppUrl(buildDefaultWhatsAppGreeting());
  const telUrl = `tel:${profile.phone.replace(/\s/g, "")}`;

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleChipClick = (prompt: string) => {
    const text = `Hi Salahaldin, I'd like to discuss a project involving: ${prompt}.`;
    setMessageText(text);
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = messageText.trim() || String(data.get("message") || "").trim();
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
      setMessageText("");
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
    const text = messageText
      ? `Hello Salahaldin, I'm ${name}.\n\n${messageText}\n\nReply-to: ${email}`
      : buildDefaultWhatsAppGreeting(name);
    window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" ref={ref} className="section-pad py-20 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something elite"
          description="Have a vision for an AI product, full-stack application, or system design? Let's connect directly."
        />

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12">
          {/* Left Column: Holographic Profile Card & 3D Interactive Hub */}
          <div
            ref={sphereContainerRef}
            className="glass neon-border relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between min-h-[480px] border border-cyan-400/25 bg-black/60 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            data-reveal
          >
            {/* Background 3D Sphere Canvas */}
            <div className="absolute inset-0 -z-10 opacity-75">
              {isCanvasVisible ? (
                <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.25]}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[2, 2, 2]} intensity={1.2} color="#22d3ee" />
                    <ContactSphere active={focused || status === "success"} />
                  </Suspense>
                </Canvas>
              ) : null}
            </div>

            {/* Profile Header Card */}
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  <Image
                    src="/profile.png"
                    alt={profile.name}
                    fill
                    className="object-cover object-center"
                    sizes="64px"
                    priority
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {profile.name}
                  </h3>
                  <p className="text-xs font-medium text-cyan-300">
                    Full Stack + AI Developer
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] text-emerald-300 font-medium">
                      Available for projects & hire
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-white/75 sm:text-sm">
                Combining Computer Science engineering with 3D web UX and NLP/AI systems to ship production-grade digital products.
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="relative z-10 mt-8 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={openWhatsAppWithForm}
                  className="glass flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-left transition-all hover:bg-emerald-500/20 hover:border-emerald-400"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-xs font-bold text-emerald-300">
                    WA
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white">WhatsApp</p>
                    <p className="truncate text-[11px] text-emerald-200">
                      {profile.phoneDisplay}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="glass flex items-center gap-3 rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-3.5 text-left transition-all hover:bg-cyan-500/20 hover:border-cyan-400"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-xs font-bold text-cyan-300">
                    @
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white">
                      {copied ? "Copied!" : "Copy Email"}
                    </p>
                    <p className="truncate text-[11px] text-cyan-200">
                      {profile.contactEmail}
                    </p>
                  </div>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/80 transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
                >
                  GitHub &rarr;
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/80 transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
                >
                  LinkedIn &rarr;
                </a>
                <a
                  href={telUrl}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/80 transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
                >
                  Call Direct
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form & Pre-fill Prompt Chips */}
          <GlassCard className="relative lg:col-span-7" glow data-reveal>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-cyan-300 font-medium">
                Quick Project Topics
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleChipClick(prompt)}
                    className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100 transition-all hover:bg-cyan-400/25 hover:border-cyan-400/50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-white/70" htmlFor="name">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    disabled={status === "sending"}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] disabled:opacity-60"
                    placeholder="Your name or company"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70" htmlFor="email">
                    Your Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={status === "sending"}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] disabled:opacity-60"
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-white/70" htmlFor="message">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  ref={messageInputRef}
                  required
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  disabled={status === "sending"}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="mt-1.5 w-full resize-none rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none transition-all focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] disabled:opacity-60"
                  placeholder="Tell me about your project scope, timeline, or idea..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 px-6 py-4 text-base font-bold text-black shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all hover:brightness-110 disabled:opacity-60"
              >
                {status === "sending" ? "Delivering message..." : "Send Message to Salahaldin"}
              </button>
              <p className="text-center text-xs text-white/50">
                Direct delivery to {profile.contactEmail}
              </p>
            </form>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl border border-green-400/40 bg-green-500/15 p-4 text-sm text-green-100 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                >
                  <p className="font-bold">Message sent successfully!</p>
                  <p className="mt-1 text-xs text-white/80">
                    Thanks for getting in touch. I will review your message and reply promptly.
                  </p>
                </motion.div>
              ) : null}
              {status === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl border border-red-400/40 bg-red-500/15 p-4 text-sm text-red-100"
                >
                  <p className="font-bold">Could not deliver message</p>
                  <p className="mt-1 text-xs text-white/80">{errorMsg}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={openWhatsAppWithForm}
                      className="rounded-full bg-green-500/25 px-3 py-1 text-xs text-green-200 font-semibold"
                    >
                      Open WhatsApp Direct
                    </button>
                    <a
                      href={buildMailtoUrl({
                        name: "Visitor",
                        email: "visitor@email.com",
                        message: messageText || "Hello Salahaldin",
                      })}
                      className="rounded-full bg-cyan-500/25 px-3 py-1 text-xs text-cyan-200 font-semibold"
                    >
                      Open Email App
                    </a>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
