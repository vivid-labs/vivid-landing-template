export const SITE_URL = "https://better-chat.vercel.app";
export const STORE_URL =
  "https://chromewebstore.google.com/detail/better-chat-chat-power-up/bfmgohplnhblcajmjhmcimjlikohiomh";

export type PostMeta = {
  slug: string;
  /** <= 60 chars, keyword-led; page title and og:title. */
  title: string;
  /** H1; may differ slightly from title. */
  headline: string;
  /** 140 to 160 chars: keyword + value. */
  description: string;
  kicker: string;
  /** Real release date (YYYY-MM-DD). Never backdate, never move once live. */
  publishDate: string;
  /** Last meaningful prose revision; never before publishDate. */
  updated?: string;
  readingMin: number;
  keywords: string[];
  faq: { q: string; a: string }[];
};

export const formatPostDate = (iso: string) =>
  new Date(`${iso}T08:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export const BLOG_AUTHOR = {
  name: "Othman Shareef",
  role: "Maker, Better Chat",
  sameAs: ["https://github.com/Othmanosx"],
} as const;

/** Store link tagged per CTA, so installs from the blog show up by source. */
export const storeLink = (cta: string, slug: string) =>
  `${STORE_URL}?utm_source=blog&utm_medium=${cta}&utm_campaign=${slug}`;

export const BLOG_DESCRIPTION =
  "Notes from the maker of Better Chat on Google Meet chat: keeping history, running better calls, and the small fixes that make meetings less annoying.";
