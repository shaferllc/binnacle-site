import type { MiddlewareHandler } from "hono";

/** Adds an X-Powered-By header and keeps HTML fresh across deploys. */
export const poweredBy: MiddlewareHandler = async (c, next) => {
  await next();
  // ASCII only — header values with non-ASCII bytes throw in browser fetch.
  c.header("X-Powered-By", "Keel");
  // The page is cheap to regenerate; make browsers revalidate so a new deploy
  // is seen immediately instead of a stale cached copy.
  if ((c.res.headers.get("content-type") ?? "").includes("text/html")) {
    c.header("Cache-Control", "public, max-age=0, must-revalidate");
  }
};
