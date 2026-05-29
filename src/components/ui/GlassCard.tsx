import { cn } from "@/lib/cn";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
};

export function GlassCard({ children, className, glow }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass neon-border rounded-2xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.08)]",
        glow && "shadow-[0_0_60px_rgba(109,40,217,0.18)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
