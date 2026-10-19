import type { Ctx } from "@shaferllc/keel/core";
import { config, view } from "@shaferllc/keel/core";
import type { AppInfo } from "../config.js";
import { HomePage } from "../views/home.js";
import { PrivacyPage, TermsPage } from "../views/legal.js";
import { PressPage } from "../views/press.js";

const app = () => config<AppInfo>("app");
const BUY_URL = "https://shafer.llc/account/buy/binnacle";
/** Installers and the Sparkle feed live on R2, like Ledge (scripts/publish-downloads.sh in the app repo). */
const DL = "https://dl.shafer.llc/binnacle";

/** Binnacle's site: marketing, checkout hand-off, downloads and the Sparkle feed. */
export class SiteController {
  home(c: Ctx) {
    return view(HomePage, { app: app() });
  }

  /** Sign in at shafer.llc, then Stripe Checkout; the key lands on the account page after payment. */
  buy(c: Ctx) {
    return c.redirect(BUY_URL, 302);
  }

  /** The newest DMG. */
  download(c: Ctx) {
    return c.redirect(`${DL}/Binnacle.dmg`, 302);
  }

  /** Builds that read the feed from the site find it on R2. */
  appcast(c: Ctx) {
    return c.redirect(`${DL}/appcast.xml`, 301);
  }

  press(c: Ctx) {
    return view(PressPage, { app: app() });
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
