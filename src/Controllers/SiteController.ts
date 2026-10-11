import type { Ctx } from "@shaferllc/keel/core";
import { config, view } from "@shaferllc/keel/core";
import type { AppInfo } from "../config.js";
import { HomePage } from "../views/home.js";
import { PrivacyPage, TermsPage } from "../views/legal.js";
import { appcastXML, LATEST } from "../data/releases.js";

const app = () => config<AppInfo>("app");

/** Binnacle's site: marketing, checkout hand-off, downloads and the Sparkle feed. */
export class SiteController {
  home(c: Ctx) {
    return view(HomePage, { app: app(), checkout: checkoutURL(c) !== null });
  }

  /** The app's Buy buttons land here; Lemon Squeezy emails the license key after payment. */
  buy(c: Ctx) {
    const url = checkoutURL(c);
    return c.redirect(url ?? "/#pricing", 302);
  }

  /** Stable link to the newest DMG (the file itself is a static asset under /download/). */
  download(c: Ctx) {
    return c.redirect(`/download/${LATEST.file}`, 302);
  }

  /** Binnacle's built-in Sparkle updater polls this (SUFeedURL). */
  appcast(c: Ctx) {
    c.header("Content-Type", "application/xml; charset=utf-8");
    c.header("Cache-Control", "public, max-age=300");
    return c.body(appcastXML(new URL(c.req.url).origin));
  }

  privacy(c: Ctx) {
    return view(PrivacyPage, { app: app() });
  }

  terms(c: Ctx) {
    return view(TermsPage, { app: app() });
  }

  health(c: Ctx) {
    return c.json({ ok: true, app: "binnacle-site", version: app().version });
  }
}

/** LEMONSQUEEZY_CHECKOUT_URL (a dashboard var on dply / wrangler) — the product's checkout link. */
function checkoutURL(c: Ctx): string | null {
  const env = (c.env ?? {}) as Record<string, string | undefined>;
  const url = env.LEMONSQUEEZY_CHECKOUT_URL ?? (typeof process !== "undefined" ? process.env?.LEMONSQUEEZY_CHECKOUT_URL : undefined);
  return url && url.startsWith("https://") ? url : null;
}
