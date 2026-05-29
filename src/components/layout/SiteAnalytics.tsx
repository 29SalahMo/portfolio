"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function SiteAnalytics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
