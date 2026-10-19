/**
 * First touch: where a visitor came from (utm_source / ref, and utm_campaign), kept 90 days in a
 * `src` cookie on .shafer.llc. shafer.llc's checkout reads the same cookie and copies it into the
 * Stripe sale, so Wheelhouse can count customers by the post, directory or ad that brought them.
 * Same format as shafer.llc's RememberSource: "source|campaign", lowercase [a-z0-9._-], 40 chars each.
 */
const clean = (v: string | null) => (v ?? "").toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 40);

export function rememberSource(request: Request, response: Response): Response {
  const url = new URL(request.url);
  const source = clean(url.searchParams.get("utm_source") ?? url.searchParams.get("ref"));
  const already = /(?:^|;\s*)src=/.test(request.headers.get("cookie") ?? "");
  if (!source || already) return response;

  const value = [source, clean(url.searchParams.get("utm_campaign"))].join("|");
  // Only on shafer.llc hosts: elsewhere (workers.dev previews) the domain attribute would be refused.
  const domain = url.hostname.endsWith("shafer.llc") ? "; Domain=.shafer.llc" : "";
  const out = new Response(response.body, response);
  out.headers.append("Set-Cookie", `src=${encodeURIComponent(value)}; Max-Age=${90 * 86400}; Path=/; SameSite=Lax; Secure; HttpOnly${domain}`);
  return out;
}

// Link unfurlers fetch the tracked URL the moment a post goes out; Mastodon does it once per instance.
const BOT = /bot|crawl|spider|preview|facebookexternalhit|slack|curl|wget|python|headless|mastodon|http\.rb|cardyb|bluesky|go-http-client|node-fetch|axios/i;

/**
 * One JSON line per visit to / or /press and per /download, for Workers Logs (observability is on in
 * wrangler.jsonc): filter `event`, group by `source`, `ref_host`, `bot`. No IP or user agent is kept.
 * /download has no query string, so its source comes from the `src` cookie set on the landing visit.
 */
export function logHit(request: Request): void {
  const url = new URL(request.url);
  const event = url.pathname === "/download" ? "download" : url.pathname === "/" || url.pathname === "/press" ? "visit" : "";
  if (request.method !== "GET" || !event) return;

  const cookie = /(?:^|;\s*)src=([^;]*)/.exec(request.headers.get("cookie") ?? "")?.[1];
  let [cSource, cCampaign]: (string | undefined)[] = [];
  try { [cSource, cCampaign] = cookie ? decodeURIComponent(cookie).split("|") : []; } catch {}
  let ref_host = "";
  try { ref_host = new URL(request.headers.get("referer") ?? "").hostname; } catch {}

  // An object, not a string, so Workers Logs indexes each field.
  console.log({
    event,
    path: url.pathname,
    source: clean(url.searchParams.get("utm_source") ?? url.searchParams.get("ref")) || clean(cSource ?? null) || "direct",
    campaign: clean(url.searchParams.get("utm_campaign")) || clean(cCampaign ?? null),
    ref_host: ref_host === url.hostname ? "" : ref_host,
    bot: BOT.test(request.headers.get("user-agent") ?? ""),
  });
}
