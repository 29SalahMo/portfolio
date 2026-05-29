"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
      >
        <span className="sr-only">Menu</span>
        <svg
          width="20"
          height="20"
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

      <div
        className={cn(
          "fixed inset-x-0 top-[calc(4.5rem+env(safe-area-inset-top))] z-40 mx-4 overflow-hidden rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          open
            ? "pointer-events-auto max-h-[70vh] opacity-100"
            : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 p-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-cyan-200"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="border-t border-white/10 pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-cyan-400/20 px-4 py-3 text-center text-sm font-medium text-cyan-100"
            >
              Hire me
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
