import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { publishedPosts } from "../../src/blog/posts";
import { SITE_URL } from "../../src/blog/site";

// ponytail: the edge bundle carries every post body (~90 KB gzip at 24 posts); split metas out if it nears the 1 MB Hobby limit.
export const config = { runtime: "edge" };

/** Satori has no layout engine, so the size follows the character count. */
const headlineSize = (n: number) => (n <= 30 ? 84 : n <= 48 ? 68 : n <= 64 ? 58 : 50);

/** Per-post OG card, served at /blog/<slug>/og.png via a rewrite. */
const og = (req: NextRequest) => {
  const slug = req.nextUrl.searchParams.get("slug");
  const meta = publishedPosts().find((p) => p.meta.slug === slug)?.meta;
  if (!meta) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#18181b",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${SITE_URL}/images/logo-120.png`} width={56} height={56} alt="" />
          <div style={{ marginLeft: 18, fontSize: 36, fontWeight: 700 }}>Better Chat</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#32D873",
              marginBottom: 24,
            }}
          >
            {meta.kicker}
          </div>
          <div style={{ display: "flex", fontSize: headlineSize(meta.headline.length), fontWeight: 700, lineHeight: 1.08 }}>
            {meta.headline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #3f3f46",
            paddingTop: 26,
            fontSize: 24,
            color: "#a1a1aa",
          }}
        >
          <div style={{ color: "#fafafa" }}>better-chat.vercel.app</div>
          <div>{`${meta.readingMin} min read`}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // next/og defaults to immutable for a year; headline edits must reach crawlers.
      headers: { "cache-control": "public, max-age=86400, s-maxage=31536000" },
    }
  );
};

export default og;
