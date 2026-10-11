import type { Router } from "@shaferllc/keel/core";
import { SiteController } from "../Controllers/SiteController.js";

export default function routes(router: Router): void {
  router.get("/", [SiteController, "home"]);
  router.get("/buy", [SiteController, "buy"]);
  router.get("/download", [SiteController, "download"]);
  router.get("/appcast.xml", [SiteController, "appcast"]);
  router.get("/privacy", [SiteController, "privacy"]);
  router.get("/terms", [SiteController, "terms"]);
  router.get("/health", [SiteController, "health"]);
}
