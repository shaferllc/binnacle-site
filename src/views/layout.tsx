// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC, PropsWithChildren } from "hono/jsx";

// The site looks like the app: Binnacle's Command Deck — near-black glass, teal readouts,
// amber warnings, monospace instrument labels, faint scanlines.
const STYLES = `
  :root {
    --ground: #070b0a; --ground-2: #0c1311; --panel: #0f1816; --line: #1c2a27; --line-2: #26413a;
    --ink: #e6f2ee; --ink-2: #a9bdb6; --ink-3: #6c817a;
    --teal: #2fe0b5; --teal-dim: #1b8f74; --amber: #f5b13d; --red: #ff5d5d;
    --mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
    --sans: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
  body { margin: 0; background: var(--ground); color: var(--ink); font-family: var(--sans); line-height: 1.6; -webkit-font-smoothing: antialiased; }
  body::before { content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 50;
    background: repeating-linear-gradient(0deg, rgba(255,255,255,.018) 0 1px, transparent 1px 3px); }
  body::after { content: ""; position: fixed; inset: 0; pointer-events: none; z-index: -1;
    background: radial-gradient(70% 50% at 50% 0%, rgba(47,224,181,.10), transparent 70%); }
  a { color: inherit; text-decoration: none; }
  ::selection { background: rgba(47,224,181,.3); }
  .wrap { max-width: 72rem; margin: 0 auto; padding: 0 1.5rem; }
  .mono { font-family: var(--mono); }
  .glow { text-shadow: 0 0 18px rgba(47,224,181,.45); }

  header.bar { position: sticky; top: 0; z-index: 30; background: rgba(7,11,10,.82); backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); }
  .bar .row { display: flex; align-items: center; justify-content: space-between; height: 3.8rem; }
  .brand { font-family: var(--mono); font-weight: 700; letter-spacing: .04em; color: var(--teal); }
  .brand span { color: var(--ink-3); font-weight: 400; }
  .bar nav { display: flex; gap: 1.6rem; align-items: center; font-family: var(--mono); font-size: .78rem; letter-spacing: .06em; text-transform: uppercase; color: var(--ink-2); }
  .bar nav a:hover { color: var(--teal); }

  .btn { display: inline-flex; align-items: center; gap: .5rem; font-family: var(--mono); font-size: .85rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; padding: .85rem 1.3rem; border-radius: 8px; border: 1px solid var(--line-2); transition: transform .12s, box-shadow .15s, background .15s; }
  .btn:hover { transform: translateY(-1px); }
  .btn-teal { background: var(--teal); color: #03130e; border-color: var(--teal); box-shadow: 0 0 28px rgba(47,224,181,.35); }
  .btn-teal:hover { box-shadow: 0 0 40px rgba(47,224,181,.55); }
  .btn-line { color: var(--ink); background: var(--panel); }
  .btn-line:hover { border-color: var(--teal-dim); }
  .btn-sm { padding: .45rem .8rem; font-size: .72rem; }

  .kicker { font-family: var(--mono); font-size: .74rem; letter-spacing: .2em; text-transform: uppercase; color: var(--amber); }
  .hero { padding: 5rem 0 3.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
  .hero h1 { font-size: clamp(2.6rem, 5.6vw, 4.4rem); line-height: 1.02; letter-spacing: -0.035em; margin: 1rem 0 1.2rem; font-weight: 800; }
  .hero h1 em { font-style: normal; color: var(--teal); }
  .hero .lead { font-size: 1.15rem; color: var(--ink-2); max-width: 32rem; margin: 0 0 1.8rem; }
  .cta { display: flex; gap: .8rem; flex-wrap: wrap; }
  .req { margin-top: 1.1rem; font-family: var(--mono); font-size: .74rem; color: var(--ink-3); letter-spacing: .03em; }
  .shot { border: 1px solid var(--line-2); border-radius: 14px; overflow: hidden; background: var(--panel);
    box-shadow: 0 30px 80px -30px rgba(0,0,0,.9), 0 0 0 1px rgba(47,224,181,.06), 0 0 60px -20px rgba(47,224,181,.25); }
  .shot img { display: block; width: 100%; height: auto; }
  .cap { font-family: var(--mono); font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); text-align: center; margin-top: .8rem; }

  section { padding: 4.5rem 0; border-top: 1px solid var(--line); }
  h2 { font-size: clamp(1.8rem, 3.4vw, 2.6rem); letter-spacing: -0.025em; margin: .5rem 0 1rem; font-weight: 800; }
  .sub { color: var(--ink-2); max-width: 40rem; margin: 0 0 2.4rem; font-size: 1.05rem; }

  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  .cell { border: 1px solid var(--line); background: var(--ground-2); border-radius: 12px; padding: 1.4rem; }
  .cell .lbl { font-family: var(--mono); font-size: .7rem; letter-spacing: .14em; text-transform: uppercase; color: var(--teal); }
  .cell h3 { margin: .5rem 0 .4rem; font-size: 1.1rem; letter-spacing: -0.01em; }
  .cell p { margin: 0; color: var(--ink-2); font-size: .95rem; }

  .term { border: 1px solid var(--line-2); border-radius: 12px; background: #040706; font-family: var(--mono); font-size: .9rem; overflow: hidden; }
  .term .t { padding: .6rem 1rem; border-bottom: 1px solid var(--line); font-size: .7rem; letter-spacing: .14em; text-transform: uppercase; color: var(--ink-3); display: flex; justify-content: space-between; }
  .term pre { margin: 0; padding: 1.2rem 1.3rem; overflow-x: auto; line-height: 1.75; color: var(--ink-2); }
  .term .p { color: var(--teal); } .term .a { color: var(--amber); } .term .k { color: var(--ink); }

  .split { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: center; }
  .list { list-style: none; padding: 0; margin: 0; }
  .list li { padding: .55rem 0 .55rem 1.6rem; position: relative; color: var(--ink-2); border-bottom: 1px dashed var(--line); }
  .list li::before { content: "▸"; position: absolute; left: 0; color: var(--teal); }
  .list b { color: var(--ink); font-weight: 600; }

  .cmp { display: grid; grid-template-columns: 1.4fr 1fr 1fr; border: 1px solid var(--line-2); border-radius: 12px; overflow: hidden; font-size: .92rem; }
  .cmp > div { padding: .8rem 1rem; border-bottom: 1px solid var(--line); }
  .cmp .h { font-family: var(--mono); font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); background: var(--ground-2); }
  .cmp .h.us { color: var(--teal); }
  .cmp .y { color: var(--teal); } .cmp .n { color: var(--ink-3); }

  .price { max-width: 30rem; margin: 0 auto; text-align: center; border: 1px solid var(--teal-dim); border-radius: 16px; padding: 2.4rem 2rem; background: linear-gradient(180deg, rgba(47,224,181,.07), transparent 60%), var(--ground-2); box-shadow: 0 0 60px -25px rgba(47,224,181,.5); }
  .price .amt { font-family: var(--mono); font-size: 4rem; font-weight: 800; color: var(--teal); line-height: 1; }
  .price .amt small { font-size: 1rem; color: var(--ink-3); font-weight: 400; }
  .price ul { text-align: left; margin: 1.6rem 0; }
  .price .cta { justify-content: center; }

  .faq details { border-bottom: 1px solid var(--line); padding: 1rem 0; }
  .faq summary { cursor: pointer; font-weight: 600; list-style: none; }
  .faq summary::before { content: "+ "; color: var(--teal); font-family: var(--mono); }
  .faq details[open] summary::before { content: "− "; }
  .faq p { color: var(--ink-2); margin: .6rem 0 0; }

  .prose { max-width: 44rem; padding: 3.5rem 0; color: var(--ink-2); }
  .prose h1 { color: var(--ink); letter-spacing: -0.03em; }
  .prose h2 { font-size: 1.3rem; margin-top: 2rem; color: var(--ink); }

  footer { border-top: 1px solid var(--line); padding: 2.2rem 0; font-family: var(--mono); font-size: .76rem; color: var(--ink-3); }
  footer .row { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
  footer nav { display: flex; gap: 1.4rem; }
  footer a:hover { color: var(--teal); }

  @media (max-width: 54rem) {
    .hero, .split { grid-template-columns: 1fr; }
    .grid { grid-template-columns: 1fr; }
    .cmp { font-size: .82rem; }
    .bar nav .hidesm { display: none; }
  }
`;

const FAVICON =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='#070b0a'/>" +
  "<circle cx='16' cy='16' r='9' fill='none' stroke='#2fe0b5' stroke-width='2'/><path d='M16 8v8l5 3' stroke='#f5b13d' stroke-width='2.2' fill='none' stroke-linecap='round'/></svg>";

export const Nav: FC = () => (
  <header class="bar">
    <div class="wrap row">
      <a class="brand glow" href="/">BINNACLE<span>//DECK</span></a>
      <nav>
        <a class="hidesm" href="/#features">Features</a>
        <a class="hidesm" href="/#developers">Developers</a>
        <a href="/#pricing">Pricing</a>
        <a class="btn btn-teal btn-sm" href="/download">Download</a>
      </nav>
    </div>
  </header>
);

export const Footer: FC<{ version: string }> = ({ version }) => (
  <footer>
    <div class="wrap row">
      <span>Binnacle v{version} · made by Tom Shafer</span>
      <nav>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/buy">Buy</a>
      </nav>
    </div>
  </footer>
);

export const Layout: FC<PropsWithChildren<{ title: string; description: string; url?: string; image?: string }>> = (
  { title, description, url, image, children },
) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {url ? <link rel="canonical" href={url} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content="#070b0a" />
      <link rel="icon" href={`data:image/svg+xml,${encodeURIComponent(FAVICON)}`} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    </head>
    <body>{children}</body>
  </html>
);
