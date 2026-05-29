"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { MobileNav } from "./MobileNav";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        "pt-[env(safe-area-inset-top)]",
        scrolled ? "pb-2" : "pb-3",
      )}
    >
      <nav
        className={cn(
          "section-pad mx-auto flex max-w-6xl items-center justify-between gap-3 transition-all",
          scrolled && "glass neon-border mx-4 rounded-full py-3 sm:mx-6",
        )}
      >
        <a href="#hero" className="text-sm font-semibold tracking-wide text-white">
          SM<span className="text-cyan-300">.</span>
        </a>
        <ul className="hidden items-center gap-4 text-sm text-white/70 lg:flex lg:gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="transition-colors hover:text-cyan-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/15 sm:inline-flex"
          >
            Hire me
          </a>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
