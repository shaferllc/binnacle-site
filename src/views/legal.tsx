// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import type { AppInfo } from "../config.js";
import { Footer, Layout, Nav } from "./layout.js";

export const PrivacyPage: FC<{ app: AppInfo }> = ({ app }) => (
  <Layout title="Privacy — Binnacle" description="What Binnacle sends, and what it doesn't.">
    <Nav />
    <main class="wrap prose">
      <h1>Privacy</h1>
      <p>Binnacle has no telemetry or analytics. What it measures about your Mac stays on your Mac.</p>
      <h2>On your Mac</h2>
      <p>Readings and 30 days of per-app history are kept in one local file. Nothing in it is uploaded.</p>
      <h2>When Binnacle goes online</h2>
      <p><b>License activation and a weekly check:</b> your license key, your Mac's name and a one-way hash of its hardware ID (not the ID itself) go to shafer.llc to confirm the license and list the Mac on your account.</p>
      <p><b>Update checks:</b> Binnacle fetches {app.url}/appcast.xml to see whether a newer version exists.</p>
      <h2>Buying</h2>
      <p>You buy through a shafer.llc account: you sign in with a link sent to your email, no password. Payment is handled by Stripe, which receives your card details under its own privacy policy; we never see them. We keep your email, your order and your license key so we can support your license.</p>
      <h2>This website</h2>
      <p>No third-party scripts or trackers. One first-party cookie, <code>src</code>, remembers which link brought you here (for example a post on Bluesky) for 90 days, so we can count visits and downloads by where they came from. Those counts don't include your IP address. Our host keeps standard request logs.</p>
      <h2>Contact</h2>
      <p>Questions: <a href="https://shafer.llc/support?product=binnacle">shafer.llc/support</a>, or reply to your receipt.</p>
    </main>
    <Footer version={app.version} />
  </Layout>
);

export const TermsPage: FC<{ app: AppInfo }> = ({ app }) => (
  <Layout title="Terms — Binnacle" description="The license that comes with Binnacle.">
    <Nav />
    <main class="wrap prose">
      <h1>Terms</h1>
      <p>A Binnacle license is for one person. You may use it on the Macs you own or use, activating one at a time, and move it by deactivating it in Settings › License.</p>
      <p>The trial is free for {app.trialDays} days with every feature. Afterwards the menu bar readouts remain free; the rest needs a license.</p>
      <p>Binnacle is provided as-is, without warranty. Quitting apps, stopping processes and changing fan speeds are done at your request; use them with care.</p>
      <p>Updates for the current major version are free.</p>
    </main>
    <Footer version={app.version} />
  </Layout>
);
