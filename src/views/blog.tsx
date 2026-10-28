// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";

export type BlogPost = { url: string; title: string; summary: string; date_published: string; _minutes?: number };

// ponytail: per-isolate memory, so each new isolate pays one fetch; move to the Cache API if that shows up in timings.
let cache: { at: number; posts: BlogPost[] } | undefined;
const FRESH = 10 * 60_000;

/** Posts on the shafer.llc blog that mention this app, kept 10 minutes so the page doesn't wait on the blog.
 *  Empty, never an error, when the blog is slow or down (and tried again a minute later). */
export async function blogPosts(): Promise<BlogPost[]> {
  if (cache && Date.now() - cache.at < FRESH) return cache.posts;
  try {
    const res = await fetch("https://shafer.llc/blog/feed.json?about=binnacle", { signal: AbortSignal.timeout(1500) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = ((await res.json()) as { items?: BlogPost[] }).items ?? [];
    cache = { at: Date.now(), posts };
    return posts;
  } catch {
    cache = { at: Date.now() - FRESH + 60_000, posts: cache?.posts ?? [] };
    return cache.posts;
  }
}

const STYLES = `
  #blog .posts { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); margin-top: 1.6rem; }
  #blog .post { display: block; border-top: 1px solid var(--line); padding-top: 1rem; }
  #blog .post h3 { margin: .35rem 0 .5rem; font-size: 1.15rem; line-height: 1.3; color: var(--ink); }
  #blog .post:hover h3 { color: var(--teal); }
  #blog .post p { margin: 0; color: var(--ink-2); font-size: .95rem; }
  #blog .meta { font-family: var(--mono); font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); }
  #blog .all { display: inline-block; margin-top: 1.4rem; font-family: var(--mono); font-size: .8rem; letter-spacing: .06em; text-transform: uppercase; color: var(--teal); }
`;

/** "From the blog": the newest posts that mention the app, linking to shafer.llc. */
export const FromTheBlog: FC<{ posts: BlogPost[] }> = ({ posts }) =>
  posts.length ? (
    <section id="blog">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div class="wrap">
        <div class="kicker">From the blog</div>
        <h2>Notes from building it</h2>
        <div class="posts">
          {posts.map((post) => (
            <a class="post" href={post.url}>
              <span class="meta">
                {new Date(post.date_published).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                {post._minutes ? ` · ${post._minutes} min read` : ""}
              </span>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
            </a>
          ))}
        </div>
        <a class="all" href="https://shafer.llc/blog">All posts →</a>
      </div>
    </section>
  ) : null;
