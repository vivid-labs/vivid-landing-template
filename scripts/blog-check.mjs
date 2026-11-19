#!/usr/bin/env node
// Blog review gate. Run before every merge: `pnpm blog:check` (add --links to also check external URLs).
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/blog/content";
const BANNED_CHARS = /\u2014/; // em dash
// Keep in sync with "Banned claims" in MARKETING.md.
const BANNED_CLAIMS =
  /never leaves your (browser|computer)|we never store|end-to-end encrypt|private by default|no data (is )?collected|free extension|100% free|free forever|anonymous|thousands of users|loved by|trusted by|supercharge|seamless|game-changer|revolutioni[sz]e|unleash|effortless|ultimate/i;
const STOP = new Set("a an and are at be by for from how i in is it my of on or the to vs what when why with you your google meet".split(" "));

const errors = [];
const fail = (slug, msg) => errors.push(`${slug}: ${msg}`);

const posts = readdirSync(DIR)
  .filter((f) => f.endsWith(".tsx"))
  .map((file) => {
    const src = readFileSync(join(DIR, file), "utf8");
    const literal = src.match(/export const meta: PostMeta = (\{[\s\S]*?\n\});/)?.[1];
    if (!literal) throw new Error(`${file}: no \`export const meta: PostMeta = {...};\``);
    // Our own literal of strings and arrays.
    const meta = new Function(`return ${literal}`)();
    return { file, src, meta };
  });

const bySlug = new Map(posts.map((p) => [p.meta.slug, p.meta]));
const words = (t) => new Set(t.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w && !STOP.has(w)));

posts.forEach(({ file, src, meta: m }) => {
  const s = m.slug ?? file;
  ["slug", "title", "headline", "description", "kicker", "publishDate", "readingMin"]
    .filter((k) => !m[k])
    .forEach((k) => fail(s, `missing ${k}`));
  if (`${m.slug}.tsx` !== file) fail(s, `file name must be ${m.slug}.tsx`);
  if (m.title?.length > 60) fail(s, `title is ${m.title.length} chars (max 60)`);
  if (m.description?.length < 140 || m.description?.length > 160)
    fail(s, `description is ${m.description?.length} chars (140 to 160)`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(m.publishDate)) fail(s, "publishDate must be YYYY-MM-DD");
  if (m.updated && m.updated < m.publishDate) fail(s, "updated is before publishDate");
  if (!m.keywords?.length) fail(s, "keywords empty");
  if (!(m.faq?.length >= 3 && m.faq.length <= 5)) fail(s, "faq needs 3 to 5 pairs");
  m.faq
    ?.filter((f) => !f.q || !f.a)
    .forEach(() => fail(s, "faq pair with empty q or a"));
  if (!src.includes("<Takeaway")) fail(s, "no <Takeaway>");
  if (BANNED_CHARS.test(src)) fail(s, "contains an em dash");
  const claim = src.match(BANNED_CLAIMS);
  if (claim) fail(s, `banned claim: "${claim[0]}"`);
  [...src.matchAll(/href="\/blog\/([^"/#]+)/g)].forEach(([, target]) => {
    const t = bySlug.get(target);
    if (!t) fail(s, `links to unknown post /blog/${target}`);
    else if (t.publishDate > m.publishDate) fail(s, `links to /blog/${target}, which publishes later (${t.publishDate})`);
  });
});

const dates = posts.map((p) => p.meta.publishDate);
dates
  .filter((d, i) => dates.indexOf(d) !== i)
  .forEach((d) => fail("registry", `duplicate publishDate ${d}`));

posts.forEach((a, i) =>
  posts.slice(i + 1).forEach((b) => {
    const wa = words(a.meta.title);
    const wb = words(b.meta.title);
    const shared = [...wa].filter((w) => wb.has(w)).length;
    if (shared / Math.min(wa.size, wb.size) >= 0.6)
      fail("titles", `"${a.meta.title}" and "${b.meta.title}" share ${shared} content words`);
  })
);

const registry = readFileSync("src/blog/posts.ts", "utf8");
posts
  .filter((p) => !registry.includes(`./content/${p.meta.slug}"`))
  .forEach((p) => fail(p.meta.slug, "not imported in src/blog/posts.ts"));

if (process.argv.includes("--links")) {
  const urls = [...new Set(posts.flatMap((p) => [...p.src.matchAll(/href="(https?:[^"]+)"/g)].map((x) => x[1])))];
  const headers = { "User-Agent": "blog-check (+https://better-chat.vercel.app)", Accept: "*/*" };
  // Sequential: news.ycombinator.com rejects parallel requests.
  const results = await urls.reduce(async (acc, url) => {
    const done = await acc;
    const status = await fetch(url, { headers, redirect: "follow", signal: AbortSignal.timeout(15000) })
      .then((r) => r.status)
      .catch((e) => e.message);
    return [...done, { url, status }];
  }, Promise.resolve([]));
  // Bot protection answers CI runners with 401/403/429; that's not a dead link.
  const BLOCKED = new Set([401, 403, 429]);
  results
    .filter((r) => BLOCKED.has(r.status))
    .forEach((r) => console.warn(`! links: ${r.status} ${r.url} (bot-blocked? check by hand)`));
  results
    .filter((r) => r.status !== 200 && !BLOCKED.has(r.status))
    .forEach((r) => fail("links", `${r.status} ${r.url}`));
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${posts.length} posts pass the blog gate`);
