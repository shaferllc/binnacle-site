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
      <p>Binnacle has no telemetry, analytics or accounts. What it measures about your Mac stays on your Mac.</p>
      <h2>On your Mac</h2>
      <p>Readings and 30 days of per-app history are kept in one local file. Nothing in it is uploaded.</p>
      <h2>When Binnacle goes online</h2>
      <p><b>License activation and a weekly check:</b> your license key, an activation id and your Mac's name go to Lemon Squeezy, our reseller, to confirm the license.</p>
      <p><b>Update checks:</b> Binnacle fetches {app.url}/appcast.xml to see whether a newer version exists.</p>
      <h2>Buying</h2>
      <p>Purchases are handled by Lemon Squeezy as merchant of record. They receive your payment details and email address under their own privacy policy; we receive your email and order details so we can support your license.</p>
      <h2>This website</h2>
      <p>No cookies or trackers. Our host keeps standard request logs.</p>
      <h2>Contact</h2>
      <p>Questions: reply to your purchase email.</p>
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
