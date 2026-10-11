/**
 * Cloudflare Worker entry point.
 *
 * The Keel app is built once at module init (top-level await runs per isolate)
 * and its compiled Hono instance is the Worker's fetch handler.
 */

import { createApp } from "./bootstrap/app.js";

const app = await createApp();

export default app;
