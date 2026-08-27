"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { MobileNav } from "./MobileNav";

const links = [
  { href: "#hero", id: "hero", label: "Home" },
  { href: "#about", id: "about", label: "About" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#journey", id: "journey", label: "Journey" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section based on scroll offset
      const sectionIds = links.map((l) => l.id);
      const scrollPos = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        "pt-[calc(0.75rem+env(safe-area-inset-top))]",
        scrolled ? "pb-2" : "pb-3",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 transition-all duration-500 px-4 sm:px-6",
          scrolled && "glass neon-border max-w-4xl rounded-full py-2.5 px-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl border border-cyan-400/20",
        )}
      >
        <a
          href="#hero"
          className="text-base font-bold tracking-wider text-white transition-transform hover:scale-105"
        >
          SM<span className="text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]">.</span>
        </a>

        {/* Desktop Links with Active Glow Pill */}
        <ul className="hidden items-center gap-1.5 text-xs font-medium text-white/70 lg:flex lg:gap-2">
          {links.map((l) => {
            const isActive = activeSection === l.id;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 transition-all duration-300",
                    isActive
                      ? "bg-cyan-400/20 text-cyan-100 font-semibold shadow-[0_0_15px_rgba(34,211,238,0.25)] border border-cyan-400/40"
                      : "hover:text-cyan-200 hover:bg-white/5 text-white/75",
                  )}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-xs font-semibold text-black shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all hover:brightness-110 sm:inline-flex"
          >
            Hire me
          </a>
          <MobileNav activeSection={activeSection} />
        </div>
      </nav>
    </header>
  );
}

