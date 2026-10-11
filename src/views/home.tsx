// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import type { AppInfo } from "../config.js";
import { Footer, Layout, Nav } from "./layout.js";

const FEATURES = [
  { lbl: "Per-app", title: "Apps, not process soup", body: "Helper processes fold into the app they belong to, so “Chrome” is one line with its real CPU, memory, disk, network, GPU and energy." },
  { lbl: "Menu bar", title: "One readout per item", body: "CPU, memory, network, disk, GPU, temperature and battery, each its own menu bar item with a dropdown of the apps behind it." },
  { lbl: "Command Deck", title: "A full instrument panel", body: "Overview, CPU, Memory, Disk, Network, GPU, Battery, Sound, Projects and History pages. ⌘1–⌘0 to jump between them." },
  { lbl: "History", title: "30 days, per app", body: "12h, 24h, 7d and 30d views, plus disk written and network totals for today and the last week or month. One small local file." },
  { lbl: "Alerts", title: "Know before the fans do", body: "A nudge when one app keeps the CPU busy, keeps growing its memory, or hammers the disk or network." },
  { lbl: "Light", title: "Doesn't become the problem", body: "Samples every 5 seconds with no window open, drawn as plain menu bar bitmaps. Around half a percent of one core at idle." },
];

const SHOTS = [
  { id: "cpu", label: "CPU", cap: "Load, temperatures, both fans (with manual control) and the apps behind the CPU" },
  { id: "memory", label: "Memory", cap: "Pressure, compressed and swap, and which apps hold the memory" },
  { id: "disk", label: "Disk", cap: "Read and write rates, free space and the apps doing the I/O" },
  { id: "gpu", label: "GPU", cap: "GPU use per app, without root" },
  { id: "battery", label: "Battery", cap: "Power draw, health, cycles and per-app energy" },
  { id: "history", label: "History", cap: "30 days per app: CPU, memory, GPU, network and disk" },
];

const FIRST = SHOTS[0]!;

export const HomePage: FC<{ app: AppInfo }> = ({ app }) => (
  <Layout title={`${app.name} — ${app.tagline}`} description={app.description} url={app.url} image={`${app.url}/img/card.png`}>
    <Nav />
    <main class="wrap">
      <div class="hero">
        <div>
          <div class="kicker">Mac activity monitor · menu bar</div>
          <h1>Which app is making your Mac <em class="glow">hot</em>?</h1>
          <p class="lead">
            Binnacle lives in your menu bar and answers it in one glance: the app behind every number, folded together with its
            helpers. Then fix it right there. Quit it, free the port, cool the fans.
          </p>
          <div class="cta">
            <a class="btn btn-teal" href="/download">Download free trial</a>
            <a class="btn btn-line" href="/buy">Buy · {app.price}</a>
          </div>
          <div class="req">{app.trialDays}-day free trial · {app.price} once, no subscription · {app.requires}</div>
        </div>
        <div>
          <div class="shot"><img src="/img/app/overview.webp" width="1600" height="1250" alt="Binnacle's Command Deck: CPU, memory, per-core meters and a per-app CPU waterfall" /></div>
          <div class="cap">The Command Deck, on a real Mac</div>
        </div>
      </div>
    </main>

    <section id="demo">
      <div class="wrap">
        <div class="kicker">Try it here</div>
        <h2>Drive the Command Deck</h2>
        <p class="sub">A working copy of Binnacle's ⌘K line, running on sample data in your browser. Type a command, tap a suggestion, or click an app.</p>
        <div class="dm">
          <div class="dm-strip"><span class="brand">BINNACLE<span>//DECK</span></span><span class="dm-tag">DEMO · SAMPLE DATA</span><span class="dm-clock">--:--:--</span></div>
          <div class="dm-body">
            <div class="dm-gauges">
              <div><div class="dm-lbl">CPU %</div><div class="dm-flap dm-cpu">000</div></div>
              <div><div class="dm-lbl">MEM GB</div><div class="dm-flap dm-mem amber">00.0</div></div>
              <div class="dm-leds" aria-hidden="true"></div>
              <div class="dm-lbl">10 cores · 8P + 2E</div>
            </div>
            <div class="dm-rows" aria-live="off"></div>
          </div>
          <pre class="dm-out" aria-live="polite"></pre>
          <form class="dm-form">
            <label for="dm-input">›</label>
            <input id="dm-input" autocomplete="off" spellcheck={false} placeholder="type a command, e.g. port 3000" />
            <kbd>⌘K</kbd>
          </form>
          <div class="dm-chips">
            {["why chrome", "port 3000", "kill port 3000", "ports", "top 3", "sort mem", "quit slack", "reset"].map((c) => (
              <button type="button" data-cmd={c}>{c}</button>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="tour">
      <div class="wrap">
        <div class="kicker">The real app</div>
        <h2>Every page, one keystroke away</h2>
        <p class="sub">Unretouched screenshots from Binnacle on an M1 Max. ⌘1 through ⌘0 jumps between them.</p>
        <div class="tour-tabs" role="tablist">
          {SHOTS.map((s, i) => (
            <button type="button" role="tab" aria-selected={i === 0 ? "true" : "false"} data-shot={s.id} data-cap={s.cap}>{s.label}</button>
          ))}
        </div>
        <div class="shot tour-img"><img src={`/img/app/${FIRST.id}.webp`} width="1600" height="1250" loading="lazy" alt={`Binnacle's ${FIRST.label} page`} /></div>
        <div class="cap tour-cap">{FIRST.cap}</div>
      </div>
    </section>

    <section id="features">
      <div class="wrap">
        <div class="kicker">What it does</div>
        <h2>Answers, not process lists</h2>
        <p class="sub">Activity Monitor shows you hundreds of processes. Binnacle tells you which app is doing it, and lets you deal with it in one step.</p>
        <div class="grid">
          {FEATURES.map((f) => (
            <div class="cell">
              <div class="lbl">{f.lbl}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="developers">
      <div class="wrap split">
        <div>
          <div class="kicker">For developers</div>
          <h2>What's on port 3000?</h2>
          <p class="sub">The Projects page groups dev servers by project folder, with their ports, memory and idle time, and a Stop button. Or just ask the ⌘K line.</p>
          <ul class="list">
            <li><b>Ports without lsof:</b> read straight from the kernel, per process.</li>
            <li><b>Forgotten servers:</b> idle time shows the one you left running yesterday.</li>
            <li><b>Ask your assistant:</b> an optional MCP server lets Claude, Codex or Cursor ask what's running. It's read-only, and quitting an app still asks you first.</li>
          </ul>
        </div>
        <div class="term">
          <div class="t"><span>Command Deck · ⌘K</span><span>type help</span></div>
          <pre>
<span class="p">›</span> <span class="k">why chrome</span>{"\n"}
  Chrome · 14 processes · <span class="a">38% CPU</span> · 3.1 GB{"\n"}
<span class="p">›</span> <span class="k">port 3000</span>{"\n"}
  node (~/Projects/shop) · idle 2d · 412 MB{"\n"}
<span class="p">›</span> <span class="k">kill port 3000</span>{"\n"}
  stopped node (pid 48113){"\n"}
<span class="p">›</span> <span class="k">top 3</span>{"\n"}
  Xcode 22% · Docker 14% · Slack 6%
          </pre>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="kicker">Versus the built-in tool</div>
        <h2>What Activity Monitor doesn't do</h2>
        <div class="cmp">
          <div class="h"> </div><div class="h us">Binnacle</div><div class="h">Activity Monitor</div>
          <div>Apps with helpers folded in</div><div class="y">Yes</div><div class="n">Processes</div>
          <div>Live readouts in the menu bar</div><div class="y">One per metric</div><div class="n">No</div>
          <div>Per-app history</div><div class="y">30 days</div><div class="n">No</div>
          <div>Alerts when an app misbehaves</div><div class="y">Yes</div><div class="n">No</div>
          <div>What's on a port, and stop it</div><div class="y">One command</div><div class="n">No</div>
          <div>Temperatures and fan control</div><div class="y">Yes</div><div class="n">No</div>
          <div>Price</div><div class="y">{app.price} once</div><div class="n">Free, built in</div>
        </div>
      </div>
    </section>

    <section id="pricing">
      <div class="wrap">
        <div class="price">
          <div class="kicker">One price</div>
          <div class="amt">{app.price}<small> once</small></div>
          <ul class="list">
            <li>Every feature free for {app.trialDays} days, no account, no card</li>
            <li>After the trial the menu bar readouts stay free forever</li>
            <li>A license unlocks the Command Deck, ⌘K, alerts, history and the MCP server</li>
            <li>Free updates; your key lives on your shafer.llc account and comes straight back to the app after checkout</li>
          </ul>
          <div class="cta">
            <a class="btn btn-teal" href="/download">Download free trial</a>
            <a class="btn btn-line" href="/buy">Buy · {app.price}</a>
          </div>
          <div class="req">{app.requires}</div>
        </div>
      </div>
    </section>

    <section class="faq">
      <div class="wrap">
        <h2>Questions</h2>
        <details><summary>What happens when the trial ends?</summary>
          <p>The menu bar items and their dropdowns keep working, free. The Command Deck, ⌘K commands, alerts, history and the MCP server ask for a license.</p></details>
        <details><summary>Does Binnacle send my data anywhere?</summary>
          <p>No telemetry. It only goes online to check your license with shafer.llc and to check for updates. History stays in one file on your Mac.</p></details>
        <details><summary>Why does it ask to install a helper?</summary>
          <p>It's optional. The helper reads processes macOS hides from normal apps and sets fan speeds. It can't do anything else.</p></details>
        <details><summary>Can I use my license on another Mac?</summary>
          <p>Yes. On the new Mac, click Register in Settings › License and sign in; your key comes back without paying again. Your shafer.llc account lists every Mac using it, and you can remove one there.</p></details>
        <details><summary>Intel Macs?</summary>
          <p>Not at the moment. Binnacle is built for Apple silicon and macOS 14 or later.</p></details>
      </div>
    </section>
    <Footer version={app.version} />
    <script src="/demo.js" defer></script>
  </Layout>
);
