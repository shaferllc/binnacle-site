// The homepage's live Command Deck demo: sample apps, a ticking waterfall and a working ⌘K line.
// Everything runs in the browser on made-up data; nothing reads the visitor's machine.
(() => {
  const root = document.getElementById("demo");
  if (!root) return;
  const $ = (s) => root.querySelector(s);

  const START = [
    { name: "Google Chrome", procs: 31, cpu: 38, mem: 3.1, helpers: "Renderer ×24, GPU, Network, Storage" },
    { name: "node", procs: 3, cpu: 21, mem: 0.6, helpers: "acme-web dev server, vite, esbuild" },
    { name: "Docker Desktop", procs: 9, cpu: 9, mem: 4.2, helpers: "com.docker.backend, qemu, vpnkit" },
    { name: "Xcode", procs: 4, cpu: 7, mem: 2.4, helpers: "SourceKitService, XCBBuildService" },
    { name: "Slack", procs: 6, cpu: 3, mem: 1.2, helpers: "Slack Helper (Renderer) ×4, GPU" },
    { name: "Spotify", procs: 5, cpu: 2, mem: 0.5, helpers: "Spotify Helper ×4" },
    { name: "Finder", procs: 1, cpu: 1, mem: 0.2, helpers: "none" },
  ];
  const SERVERS = [
    { port: 3000, app: "node", pid: 48113, dir: "~/Code/acme-web", idle: "2d", mem: "412 MB" },
    { port: 5173, app: "node", pid: 51220, dir: "~/Code/dashboard", idle: "3m", mem: "188 MB" },
    { port: 8000, app: "php", pid: 7302, dir: "~/Sites/blog", idle: "5h", mem: "69 MB" },
  ];
  let apps, servers, sort, pending;
  const reset = () => {
    apps = START.map((a) => ({ ...a }));
    servers = SERVERS.map((s) => ({ ...s }));
    sort = "cpu";
    pending = null;
  };
  reset();

  const rows = $(".dm-rows"), out = $(".dm-out"), input = $("#dm-input"), leds = $(".dm-leds");
  const flapCPU = $(".dm-cpu"), flapMEM = $(".dm-mem"), clock = $(".dm-clock");
  for (let i = 0; i < 10; i++) leds.appendChild(document.createElement("i"));

  const find = (q) => {
    q = q.toLowerCase();
    return apps.find((a) => a.name.toLowerCase().startsWith(q)) || apps.find((a) => a.name.toLowerCase().includes(q));
  };
  const say = (lines) => { out.innerHTML = lines; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  function render() {
    const list = [...apps].sort((a, b) => b[sort] - a[sort]);
    const max = Math.max(1, ...list.map((a) => a[sort]));
    rows.innerHTML = list.map((a) =>
      '<button type="button" class="dm-row" data-app="' + esc(a.name) + '">' +
      '<span class="n">' + esc(a.name) + ' <small>×' + a.procs + '</small></span>' +
      '<span class="bar"><i style="width:' + Math.round((a[sort] / max) * 100) + '%"></i></span>' +
      '<span class="v' + (sort === "cpu" ? " on" : "") + '">' + a.cpu.toFixed(1) + '%</span>' +
      '<span class="v' + (sort === "mem" ? " on" : "") + '">' + a.mem.toFixed(1) + ' GB</span></button>').join("");
    const cpu = Math.min(99, apps.reduce((s, a) => s + a.cpu, 0) / 1.6);
    const mem = apps.reduce((s, a) => s + a.mem, 0) + 8.4;
    flapCPU.textContent = String(Math.round(cpu)).padStart(3, "0");
    flapMEM.textContent = mem.toFixed(1);
    [...leds.children].forEach((el, i) => {
      const v = Math.max(4, Math.min(100, cpu * (i < 8 ? 1.2 - i * 0.09 : 0.25) + Math.random() * 12));
      el.style.height = v + "%";
      el.className = v > 75 ? "hot" : "";
    });
    clock.textContent = new Date().toTimeString().slice(0, 8);
  }

  function tick() {
    for (const a of apps) {
      a.cpu = Math.max(0.1, a.cpu + (Math.random() - 0.5) * Math.max(1, a.cpu * 0.25));
      a.mem = Math.max(0.1, a.mem + (Math.random() - 0.45) * 0.03);
    }
    render();
  }

  const HELP =
    '<span class="a">commands</span>\n' +
    '  why &lt;app&gt;        what it is, its helpers, CPU and memory\n' +
    '  port &lt;n&gt;         who is listening on a port\n' +
    '  ports            every dev server and its port\n' +
    '  kill port &lt;n&gt;    stop whatever holds the port (asks first)\n' +
    '  quit &lt;app&gt;       quit an app (asks first)\n' +
    '  top &lt;n&gt;          the busiest apps\n' +
    '  sort cpu|mem     reorder the waterfall\n' +
    '  reset            put the sample data back';

  function run(raw) {
    const cmd = raw.trim().replace(/\s+/g, " ");
    if (!cmd) return;
    const lc = cmd.toLowerCase();
    if (pending) {
      const p = pending; pending = null;
      if (lc === "y" || lc === "yes") return p();
      return say("cancelled. nothing was quit.");
    }
    let m;
    if (lc === "help" || lc === "?") return say(HELP);
    if (lc === "reset") { reset(); render(); return say("sample data restored."); }
    if ((m = lc.match(/^sort (cpu|mem)/))) { sort = m[1]; render(); return say("sorted by " + (sort === "cpu" ? "CPU" : "memory") + "."); }
    if ((m = lc.match(/^top ?(\d+)?$/))) {
      const n = Math.min(+(m[1] || 3), apps.length);
      return say([...apps].sort((a, b) => b.cpu - a.cpu).slice(0, n).map((a) => esc(a.name) + ' <span class="a">' + a.cpu.toFixed(0) + "%</span>").join(" · "));
    }
    if (lc === "ports") {
      if (!servers.length) return say("no dev servers running.");
      return say(servers.map((s) => '<span class="a">:' + s.port + "</span>  " + s.app + " (" + s.dir + ") · idle " + s.idle + " · " + s.mem).join("\n"));
    }
    if ((m = lc.match(/^(kill )?port :?(\d+)$/))) {
      const s = servers.find((x) => x.port === +m[2]);
      if (!s) return say("nothing is listening on :" + m[2] + ".");
      if (!m[1]) return say(s.app + " (" + s.dir + ") · pid " + s.pid + " · idle " + s.idle + " · " + s.mem + '\n<span class="dim">type</span> kill port ' + s.port + ' <span class="dim">to stop it</span>');
      pending = () => {
        servers = servers.filter((x) => x !== s);
        const node = find(s.app);
        if (node) { node.cpu = Math.max(0.2, node.cpu * 0.3); node.mem = Math.max(0.1, node.mem - 0.4); node.procs = Math.max(1, node.procs - 1); }
        render();
        say("stopped " + s.app + " (pid " + s.pid + "). :" + s.port + " is free.");
      };
      return say('<span class="r">stop ' + s.app + " (pid " + s.pid + ") on :" + s.port + "?</span> type y to confirm, anything else to cancel.");
    }
    if ((m = cmd.match(/^why (.+)$/i))) {
      const a = find(m[1]);
      if (!a) return say("no app matching “" + esc(m[1]) + "”. try: " + apps.slice(0, 3).map((x) => x.name.split(" ")[0].toLowerCase()).join(", "));
      return say(esc(a.name) + " · " + a.procs + ' processes · <span class="a">' + a.cpu.toFixed(0) + "% CPU</span> · " + a.mem.toFixed(1) + " GB\n  folded in: " + esc(a.helpers));
    }
    if ((m = cmd.match(/^(force )?quit (.+)$/i))) {
      const a = find(m[2]);
      if (!a) return say("no app matching “" + esc(m[2]) + "”.");
      pending = () => { apps = apps.filter((x) => x !== a); render(); say("quit " + esc(a.name) + ". freed " + a.mem.toFixed(1) + " GB."); };
      return say('<span class="r">quit ' + esc(a.name) + " and its " + a.procs + " processes?</span> type y to confirm, anything else to cancel.");
    }
    say("unknown command “" + esc(cmd) + "”. type help.");
  }

  $(".dm-form").addEventListener("submit", (e) => {
    e.preventDefault();
    run(input.value);
    input.value = "";
  });
  root.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-cmd]");
    const row = e.target.closest("[data-app]");
    if (chip) { pending = null; run(chip.dataset.cmd); input.focus({ preventScroll: true }); }
    else if (row) { pending = null; run("why " + row.dataset.app); }
  });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); input.focus(); }
  });

  render();
  say(HELP);
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  setInterval(still ? render : tick, still ? 5000 : 1500);
})();

// Screenshot tour: tabs swap one image.
(() => {
  const tour = document.getElementById("tour");
  if (!tour) return;
  const img = tour.querySelector(".tour-img img"), cap = tour.querySelector(".tour-cap");
  tour.addEventListener("click", (e) => {
    const b = e.target.closest("[data-shot]");
    if (!b) return;
    tour.querySelectorAll("[data-shot]").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    img.src = "/img/app/" + b.dataset.shot + ".webp";
    img.alt = "Binnacle's " + b.textContent + " page";
    cap.textContent = b.dataset.cap;
  });
})();
