"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/hooks/useMagnetic";

type MagneticButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  download?: string | boolean;
};

export function MagneticButton({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  external,
  type = "button",
  download,
}: MagneticButtonProps) {
  const { ref, onMove, onLeave } = useMagnetic(0.28);

  const styles = cn(
    "relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors",
    variant === "primary" &&
      "bg-gradient-to-r from-cyan-400/90 via-blue-500/90 to-violet-600/90 text-black shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110",
    variant === "ghost" &&
      "glass text-white/90 hover:text-white hover:bg-white/10",
    className,
  );

  if (href) {
    return (
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={styles}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        download={download}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={styles}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  );
}
