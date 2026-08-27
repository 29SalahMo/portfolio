"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const links = [
  { href: "#hero", id: "hero", label: "Home" },
  { href: "#about", id: "about", label: "About" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#journey", id: "journey", label: "Journey" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export function MobileNav({ activeSection = "hero" }: { activeSection?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <span className="sr-only">Menu</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {/* Backdrop overlay for closing */}
      {open ? (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        className={cn(
          "fixed inset-x-0 top-[calc(4.5rem+env(safe-area-inset-top))] z-40 mx-4 overflow-hidden rounded-2xl border border-cyan-400/20 bg-black/95 shadow-[0_15px_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-300 lg:hidden",
          open
            ? "pointer-events-auto max-h-[80vh] opacity-100 scale-100"
            : "pointer-events-none max-h-0 opacity-0 scale-95",
        )}
      >
        <ul className="flex flex-col gap-1.5 p-4">
          {links.map((l) => {
            const isActive = activeSection === l.id;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm transition-all",
                    isActive
                      ? "bg-cyan-400/20 text-cyan-100 font-semibold border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                      : "text-white/80 hover:bg-white/10 hover:text-cyan-200",
                  )}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
          <li className="border-t border-white/10 pt-2.5 mt-1">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 text-center text-sm font-semibold text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              Hire me
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

