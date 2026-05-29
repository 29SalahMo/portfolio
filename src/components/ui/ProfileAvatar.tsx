import Image from "next/image";
import { cn } from "@/lib/cn";

type ProfileAvatarProps = {
  size?: "md" | "lg";
  className?: string;
  priority?: boolean;
};

const sizes = {
  md: "h-24 w-24 sm:h-28 sm:w-28",
  lg: "h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44",
};

export function ProfileAvatar({
  size = "lg",
  className,
  priority = true,
}: ProfileAvatarProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 rounded-full p-[3px]",
        "bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-400",
        "shadow-[0_0_40px_rgba(34,211,238,0.35)]",
        sizes[size],
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-900 ring-2 ring-black/80">
        <Image
          src="/profile.png"
          alt=""
          fill
          priority={priority}
          unoptimized
          className="object-cover object-[center_15%]"
          sizes="(max-width: 768px) 128px, 176px"
        />
      </div>
    </div>
  );
}
