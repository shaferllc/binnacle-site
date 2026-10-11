import type { ConfigData } from "@shaferllc/keel/core";

export interface AppInfo {
  name: string;
  tagline: string;
  description: string;
  version: string;
  url: string;
  price: string;
  trialDays: number;
  requires: string;
}

/** Inline config (no filesystem on the edge). Reachable as config('app.*'). */
export const config: ConfigData = {
  app: {
    name: "Binnacle",
    tagline: "Which app is making your Mac hot?",
    description:
      "A fast, native Mac activity monitor for your menu bar. It shows which app is behind every number, and lets you fix it: quit it, free the port, cool the fans.",
    version: "0.1.0",
    url: "https://binnacle.dply.app",
    price: "$9",
    trialDays: 14,
    requires: "macOS 14 Sonoma or later · Apple silicon",
  },
};
