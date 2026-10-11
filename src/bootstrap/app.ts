/**
 * Boot the Keel application for the Cloudflare Worker.
 *
 * Note `discoverConfig: false` — there is no filesystem on Workers, so config
 * is passed inline instead of being read from config/*.ts. Everything else is
 * the same Keel you run on Node.
 */

import { Application, Router } from "@shaferllc/keel/core";
import type { Hono } from "hono";
import { config } from "../config.js";
import { Kernel } from "../Http/Kernel.js";
import { AppServiceProvider } from "../Providers/AppServiceProvider.js";
import registerWebRoutes from "../routes/web.js";

export async function createApp(): Promise<Hono> {
  const app = new Application();

  await app.boot([AppServiceProvider], { discoverConfig: false, config });

  registerWebRoutes(app.make(Router));

  return new Kernel(app).build();
}
