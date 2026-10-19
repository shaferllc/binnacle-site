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
