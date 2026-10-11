import type { Application } from "@shaferllc/keel/core";

/**
 * Keel stashes the application container on the Hono context as `app`. This
 * augmentation mirrors the one in keel/core so our code (and Keel's, compiled
 * from source) type-checks against the same Hono instance.
 */
declare module "hono" {
  interface ContextVariableMap {
    app: Application;
  }
}
