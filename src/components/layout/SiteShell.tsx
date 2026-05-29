"use client";

import { Nav } from "./Nav";
import { ScrollProgress } from "./ScrollProgress";
import { CustomCursor } from "./CustomCursor";
import { LoadingScreen } from "./LoadingScreen";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <main className="relative overflow-x-clip">{children}</main>
    </>
  );
}
