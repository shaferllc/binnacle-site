/**
 * Cloudflare Worker entry point.
 *
 * The Keel app is built once at module init (top-level await runs per isolate)
 * and its compiled Hono instance handles each request; the response then gets
 * the first-touch source cookie (see source.ts).
 */

import { createApp } from "./bootstrap/app.js";
import { logHit, rememberSource } from "./source.js";

const app = await createApp();

export default {
  async fetch(request: Request, env: unknown, ctx: ExecutionContext): Promise<Response> {
    logHit(request);
    return rememberSource(request, await app.fetch(request, env, ctx));
  },
};
