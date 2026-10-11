import type { Ctx } from "@shaferllc/keel/core";
import { config, view } from "@shaferllc/keel/core";
import type { AppInfo } from "../config.js";
import { HomePage } from "../views/home.js";
import { PrivacyPage, TermsPage } from "../views/legal.js";
import { appcastXML, LATEST } from "../data/releases.js";

const app = () => config<AppInfo>("app");
const BUY_URL = "https://shafer.llc/account/buy/binnacle";

/** Binnacle's site: marketing, checkout hand-off, downloads and the Sparkle feed. */
export class SiteController {
  home(c: Ctx) {
    return view(HomePage, { app: app() });
  }

  /** Sign in at shafer.llc, then Stripe Checkout; the key lands on the account page after payment. */
  buy(c: Ctx) {
    return c.redirect(BUY_URL, 302);
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
