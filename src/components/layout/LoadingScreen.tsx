"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function shouldSkipLoader(): boolean {
  if (typeof window === "undefined") return true;

  const ua = navigator.userAgent.toLowerCase();
  const isBot =
    /bot|crawl|spider|preview|vercel|facebookexternalhit|twitterbot|linkedinbot|whatsapp|slackbot|discordbot|telegrambot|googlebot|bingbot/i.test(
      ua,
    );

  if (isBot) return true;

  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }
  } catch {
    /* ignore */
  }

  return false;
}

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (shouldSkipLoader()) {
      setDone(true);
      return;
    }

    const timer = setTimeout(() => {
      setDone(true);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-cyan-300/80">
            Loading
          </p>
          <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


