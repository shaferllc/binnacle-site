// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import type { AppInfo } from "../config.js";
import { Footer, Layout, Nav } from "./layout.js";

/** Full-size PNGs live in public/img/press/ (copied from marketing/screenshots/ in the app repo). */
const SHOTS: [string, string, string][] = [
  ["binnacle-1.png", "Overview", "flap-digit CPU and memory readouts, per-core LEDs, load, memory pressure, the network/disk/GPU/temperature/battery/sound/free-space row, and the per-app CPU waterfall"],
  ["binnacle-2.png", "CPU", "a 6-minute CPU chart split into apps and macOS, load, cores, CPU temperature, left and right fan speeds, fan controls (Automatic/Fixed), and apps by CPU"],
  ["binnacle-3.png", "Memory", "a breakdown into app, wired, compressed, cached and free memory, pressure, swap, and apps by memory"],
  ["binnacle-4.png", "Disk", "read/write activity, free space including purgeable space, startup disk usage, and apps by disk activity"],
  ["binnacle-5.png", "Network", "download and upload traffic, plus every interface"],
  ["binnacle-6.png", "GPU", "utilization, average, peak, GPU memory, and apps by GPU"],
  ["binnacle-7.png", "Battery", "charge, power draw, adapter, health, cycle count, temperature, and apps by energy"],
  ["binnacle-8.png", "Sound", "output device and volume, apps playing now, apps using the microphone, and all inputs and outputs"],
  // binnacle-9.png (Projects) is held back until it's re-shot with demo projects.
];

/** Also in public/img/press/ (from marketing/press/ in the app repo). */
const ICONS: [string, string][] = [
  ["binnacle-icon.svg", "vector, scales to any size"],
  ["binnacle-icon-1024.png", "1024×1024 PNG with transparent corners"],
  ["binnacle-icon-512.png", "512×512 PNG with transparent corners"],
];

export const PressPage: FC<{ app: AppInfo }> = ({ app }) => (
  <Layout
    title="Press kit — Binnacle"
    description="Binnacle press kit: the pitch, fact sheet, features, pricing, screenshots and press contact."
    url={`${app.url}/press`}
    image={`${app.url}/img/card.png`}
  >
    <Nav />
    <main class="wrap prose">
      <h1>Binnacle press kit</h1>
      <p><b>For interviews, review licenses or assets, email <a href="mailto:press@shafer.llc">press@shafer.llc</a>.</b></p>

      <h2>The pitch</h2>
      <p>
        Binnacle is a native Mac activity monitor for the menu bar that answers one question: <i>which app is behind that number?</i> Activity
        Monitor shows hundreds of processes, many of them called "Helper". Binnacle folds every helper into the app it belongs to, then shows
        per-app CPU, memory, disk, network, GPU and energy, both in the menu bar and in the Command Deck, a full-window console. When it finds
        the culprit, you can deal with it in the same place: quit the app, free a port, or set the fans. Developers get a Projects page that
        lists running dev servers by project folder with their ports, and a ⌘K command line where <code>port 3000</code> tells you what's
        holding the port and <code>kill port 3000</code> frees it. It keeps 30 days of per-app history, warns you when an app misbehaves, and
        idles at about 0.5% of one CPU core with its window closed (measured on an M1 Max). Binnacle sends no telemetry. Its only network
        calls are license activation and update checks. It's a {app.trialDays}-day free trial, then {app.price} once.
      </p>

      <h2>Fact sheet</h2>
      <table>
        <tbody>
          <tr><th>Product</th><td>{app.name}</td></tr>
          <tr><th>What it is</th><td>Menu bar activity monitor and full-window system console for the Mac</td></tr>
          <tr><th>Developer</th><td>Tom Shafer, Shafer LLC (<a href="https://shafer.llc">shafer.llc</a>)</td></tr>
          <tr><th>Current version</th><td>{app.version} (October 2026)</td></tr>
          <tr><th>Requirements</th><td>macOS 14 Sonoma or later, Apple silicon</td></tr>
          <tr><th>Price</th><td>{app.trialDays}-day free trial with everything unlocked, then {app.price} once. The menu bar readouts stay free after the trial</td></tr>
          <tr><th>Where to get it</th><td>Direct download (DMG) from <a href={app.url}>binnacle.shafer.llc</a>. Not on the Mac App Store</td></tr>
          <tr><th>Updates</th><td>Built in, through Sparkle</td></tr>
          <tr><th>Security</th><td>Signed with Developer ID</td></tr>
          <tr><th>Built with</th><td>Swift and SwiftUI/AppKit. Reads the kernel directly (libproc, IOKit, SMC)</td></tr>
          <tr><th>Privacy</th><td>No telemetry. The only network calls are license activation and update checks. History is stored locally in one small SQLite file</td></tr>
          <tr><th>Footprint</th><td>About 0.45–0.55% of one core with the window closed, about 0.16% in Eco mode, and 5–8% with the animated Command Deck open (measured on an M1 Max with three displays)</td></tr>
          <tr><th>Languages</th><td>10 interface languages. The Command Deck is in English</td></tr>
        </tbody>
      </table>

      <h2>Features</h2>
      <h3>Answers per app, not per process</h3>
      <ul>
        <li>Helper processes are folded into their app, so you get "Google Chrome, 18 processes" instead of 18 rows to decode</li>
        <li>Per-app CPU, memory, disk read/write, network, GPU and energy</li>
      </ul>
      <h3>In the menu bar</h3>
      <ul>
        <li>One menu bar item per readout: CPU, memory, network, disk, GPU, temperature, battery. Each can show a value, a graph or both</li>
        <li>Each item opens a dropdown on its own metric. Click an app to jump to it in the main window</li>
        <li>Plain AppKit status items, redrawn only when what they show changes</li>
      </ul>
      <h3>The Command Deck</h3>
      <ul>
        <li>A full-window console with flap-digit readouts, per-core LEDs, a telemetry row and a waterfall of CPU use per app over the last 200 seconds</li>
        <li>Pages: Overview, CPU, Memory, Disk, Network, GPU, Battery, Sound, Projects, History and Processes. Switch with ⌘1–⌘0</li>
        <li>Light and dark modes</li>
      </ul>
      <h3>⌘K command line</h3>
      <ul>
        <li>
          <code>{"why <app>"}</code>, <code>{"quit <app>"}</code>, <code>{"force quit <app>"}</code>, <code>{"port <n>"}</code>,{" "}
          <code>{"kill port <n>"}</code>, <code>{"top <n>"}</code>, <code>sort cpu|mem|disk|net|energy</code>, <code>{"go <page>"}</code>,{" "}
          <code>speed eco|balanced|live</code>, <code>share</code>, <code>help</code>
        </li>
        <li>Every quit asks for confirmation first</li>
      </ul>
      <h3>For developers</h3>
      <ul>
        <li><b>Projects page:</b> running dev servers grouped by project folder, each with its ports, memory, CPU, idle time and a Stop button. Ports are read through libproc, without shelling out to <code>lsof</code></li>
        <li>
          <b>binnacle-mcp:</b> an optional MCP server so AI assistants such as Claude, Codex and Cursor can ask what's running. It has six tools:{" "}
          <code>system_status</code>, <code>top_apps</code>, <code>app_details</code>, <code>who_uses_port</code>, <code>dev_servers</code> and{" "}
          <code>request_quit</code>. It's off by default and read-only. <code>request_quit</code> can't quit anything by itself: it asks you inside Binnacle
        </li>
      </ul>
      <h3>Heat, fans and battery</h3>
      <ul>
        <li>CPU temperature and fan speeds on the CPU page</li>
        <li>Fan control on Apple silicon: Automatic or a fixed speed per fan, kept within each fan's minimum and maximum. Fans go back to automatic when Binnacle quits, crashes or disconnects</li>
        <li>Battery page: power draw, health, cycle count, temperature and apps by energy use</li>
        <li>Battery levels for Bluetooth devices, including AirPods (left, right and case), keyboards and mice</li>
      </ul>
      <h3>History and alerts</h3>
      <ul>
        <li>30 days of per-app history, with 12-hour, 24-hour, 7-day and 30-day views</li>
        <li>Totals for disk written and network traffic today and over the last 7 and 30 days</li>
        <li>Alerts for sustained CPU use (for example, an app averaging 70% CPU for 10 minutes), memory that keeps growing, and heavy disk or network use</li>
      </ul>
      <h3>Sound</h3>
      <ul>
        <li>Switch the output device, set the volume or mute</li>
        <li>See which apps are playing audio and which are using the microphone</li>
      </ul>
      <h3>Extras</h3>
      <ul>
        <li>"My Mac, right now" share card (1200×630, light or dark), copied to the clipboard</li>
        <li>Update speed presets: Eco, Balanced and Live</li>
        <li>Units: °C or °F, bytes or bits, app CPU per core or per Mac</li>
        <li>An optional root helper gives full process data and fan control. It only reads process information, and its only write is fan speed</li>
      </ul>

      <h2>Pricing</h2>
      <ul>
        <li><b>Free trial:</b> {app.trialDays} days with everything unlocked. No account needed to start.</li>
        <li><b>License:</b> {app.price}, paid once. Buying signs you in at shafer.llc and hands the key straight back to the app.</li>
        <li><b>After the trial, without a license:</b> the menu bar readouts keep working for free. The Command Deck, ⌘K commands, alerts, 30-day history and the MCP server need a license.</li>
        <li><b>Press:</b> free review licenses on request at <a href="mailto:press@shafer.llc">press@shafer.llc</a>.</li>
      </ul>

      <h2>About the developer</h2>
      <p>
        I'm Tom Shafer, an independent Mac developer. I build and sell apps through my company, Shafer LLC. Binnacle is built for the moment
        your fans spin up or your Mac slows down and you want a name, not a list: it tells you which app is responsible, gives you the fix,
        and stays out of the way. I treated its own footprint as a feature. Before release, idle CPU use dropped from about 1.6% of one core
        to about 0.5% (M1 Max), because a monitor that wastes resources is a bad monitor.
      </p>

      <h2>Screenshots</h2>
      <p>All screenshots are 2314×1808 PNGs of the Command Deck in dark mode. Every one also shows the ⌘K command line along the bottom.</p>
      <table>
        <thead><tr><th>File</th><th>Shows</th></tr></thead>
        <tbody>
          {SHOTS.map(([file, page, shows]) => (
            <tr>
              <td><a href={`/img/press/${file}`} download={file}><code>{file}</code></a></td>
              <td><b>{page}:</b> {shows}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>App icon</h2>
      <ul>
        {ICONS.map(([file, what]) => (
          <li><a href={`/img/press/${file}`} download={file}><code>{file}</code></a>: {what}</li>
        ))}
      </ul>

      <h2>Contact</h2>
      <ul>
        <li><b>Press, interviews and review licenses:</b> <a href="mailto:press@shafer.llc">press@shafer.llc</a></li>
        <li><b>Website and download:</b> <a href={app.url}>binnacle.shafer.llc</a></li>
        <li><b>Developer:</b> Shafer LLC, <a href="https://shafer.llc">shafer.llc</a></li>
      </ul>
    </main>
    <Footer version={app.version} />
  </Layout>
);
