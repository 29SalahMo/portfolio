"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      setProgress((p) => Math.min(100, p + 8 + frame * 0.5));
      if (frame > 12) {
        window.clearInterval(id);
        setProgress(100);
        window.setTimeout(() => setDone(true), 400);
      }
    }, 80);
    return () => window.clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-cyan-300/80">
            Initializing experience
          </p>
          <h1 className="mb-8 bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-3xl font-semibold text-transparent md:text-5xl">
            Salahaldin Mohamed
          </h1>
          <div className="h-1 w-64 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 font-mono text-sm text-white/50">{progress}%</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
