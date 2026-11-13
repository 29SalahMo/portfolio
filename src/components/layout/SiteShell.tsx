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
      {/*
        touch-action: pan-y ensures the browser always keeps vertical
        scrolling even if JS event handlers are attached. This eliminates
        the most common cause of iOS/Android scroll jank.
      */}
      <main className="relative overflow-x-clip" style={{ touchAction: "pan-y" }}>
        {children}
      </main>
    </>
  );
}
