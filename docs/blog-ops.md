# Blog operations

Hand-off notes for whoever runs the blog next. Voice and claims rules live in `MARKETING.md`; the schedule lives in `docs/blog-roadmap.md`.

## How it works

- Posts are TSX modules in `src/blog/content/<slug>.tsx` exporting `meta` and a `Body` fragment with one top-level `<Takeaway>`. Register each in `src/blog/posts.ts`.
- A post is live once a deploy's build time (`BUILD_TIME`, set in `next.config.js`) passes `publishDate` at 08:00 UTC. `next dev` shows everything. Pages, `/blog/feed.xml`, `/sitemap.xml` and `/llms.txt` all use the same gate, so they agree until the next deploy.
- Post bodies are rendered to HTML at build time in `getStaticProps`, so unreleased posts never reach the client bundle.
- A duplicate `publishDate` throws at build time.
- OG cards: `/blog/<slug>/og.png`, rewritten to `pages/api/og.tsx` (edge, `image/png`).
- CTAs link to the Chrome Web Store with `utm_source=blog&utm_medium=inline|end&utm_campaign=<slug>`. The store dashboard breaks page views down by these three parameters ([Chrome docs](https://developer.chrome.com/blog/cws-analytics-revamp)); with the store's Google Analytics opt-in they're forwarded to GA too ([docs](https://developer.chrome.com/docs/webstore/google-analytics)). Only source, medium and campaign are supported.
- Review gate: `pnpm blog:check` (add `--links` for external URLs). Runs on PRs touching the blog via `.github/workflows/blog.yml`.

## Automation (`.github/workflows/blog.yml`)

| Job | When (UTC) | Needs |
|---|---|---|
| gate | every PR touching `src/blog/**` | nothing |
| release: deploy hook, wait for today's post in the feed (fails after 5 min), ping IndexNow for today's post and any sitemap lastmod in the last 2 days | 08:15 daily | secret `VERCEL_DEPLOY_HOOK_URL` |
| devto: add `cover_image` to imported drafts, publish the oldest draft | 13:00 daily | secret `DEVTO_API_KEY`, dev.to RSS import on |

Scheduled jobs only run from the default branch (`main`). Each job skips with a warning when its secret is missing.

IndexNow key: `919335287357a53ecbe3c535122ce683`, served at `/919335287357a53ecbe3c535122ce683.txt`.

## Accounts

- Google Search Console: `sc-domain:gm-pro.online` expired. Add a URL-prefix property for `https://better-chat.vercel.app` and submit `https://better-chat.vercel.app/sitemap.xml`.
- Bing Webmaster Tools: not set up. Import from Search Console, then submit the sitemap.
- dev.to: not set up. Settings > Extensions > RSS feed URL `https://better-chat.vercel.app/blog/feed.xml`, mark "canonical URL", then add the API key secret.
- Analytics: none on the site. Blog conversion is measured through the store's UTM report.

## Research pack (2026-10-25)

Primary sources opened on that date. Re-check before reusing.

- Classic Meet chat clears when you leave, late joiners see nothing earlier, recording saves an .SBV chat log: [support.google.com/meet/answer/9308979](https://support.google.com/meet/answer/9308979?hl=en), [9308681](https://support.google.com/meet/answer/9308681?hl=en).
- Continuous meeting chat: announced Nov 3 2025, Rapid Release Dec 8 2025, Scheduled Release Mar 23 2026; Business, Enterprise, Enterprise Essentials, Frontline only; not instant meetings, waiting rooms, breakout rooms, live streams, huddles, CSE, events without a Meet ID; external guests only see chat while present; no .SBV with recordings ([announcement](https://workspaceupdates.googleblog.com/2025/11/continue-conversations-google-chat-google-meet.html)).
- Meetings section in Google Chat, Mar 20 2026, opt-in ([post](https://workspaceupdates.googleblog.com/2026/03/introducing-new-meetings-section-in-Google-Chat.html)). Meeting recaps in Chat, Oct 19 2026 ([post](https://workspaceupdates.googleblog.com/2026/10/follow-through-on-your-meeting-tasks-with-meeting-recaps-in-Google-Chat.html)).
- Caption history: 30-minute scrollback for everyone, rolling out from Feb 18 2025 ([post](https://workspaceupdates.googleblog.com/2025/02/google-meet-caption-history.html)). Transcripts exclude chat and work on computer, laptop or Android ([12849897](https://support.google.com/meet/answer/12849897?hl=en)).
- Recurring Calendar events get a separate Meeting Conversation per occurrence, named event + date ([9308979](https://support.google.com/meet/answer/9308979?hl=en)). No Google page says whether a recurring series reuses one Meet link; posts tell readers to check their invite.
- Meeting codes from the Meet homepage or Gmail expire 365 days after last use; Calendar codes after 60 days unused with no future events ([10710509](https://support.google.com/meet/answer/10710509)).
- Personal accounts without a Meet subscription: 1:1 up to 24 h, 3+ participants up to 60 min (chime at 50), max 100 participants ([7317473](https://support.google.com/meet/answer/7317473?hl=en)).
- Mute shortcut Ctrl/Command + d ([15738543](https://support.google.com/meet/answer/15738543?hl=en)).
- Join chime only for the first 5 participants ([9303069](https://support.google.com/meet/answer/9303069?hl=en)).
- Competitor store data and pricing (Enhancement Suite $5/mo or $60/yr, 7-day trial; Tactiq Pro $8/user/mo annual; Meet Plus pricing not published) as of 2026-10-25.
- HN threads used: 43440772 (Othman's own 2025 Show HN), 42322595, 24195130, 45188825, 28057969, 41615584.

- Wave 2 sources (2026-10-26): meeting access types and Google's note-taker sentence (support.google.com/a/users/answer/12172260, /11989526); safeguarded guest admit flow, deny-by-default review queue, Mar 24 2026, all account types; host management (meet/answer/16229038), co-hosts (10885841), waiting rooms (16523457); Take notes for me (14754931); Chrome permission warning strings (developer.chrome.com/docs/extensions/reference/permissions-list); store review applies to every update (developer.chrome.com/docs/webstore/review-process); Featured badge being retired (developer.chrome.com/blog/cws-review-updates-2026, Aug 20 2026); Meet add-ons SDK and usage (developers.google.com/workspace/meet/add-ons, support.google.com/meet/answer/13961388); Marketplace app review (developers.google.com/workspace/marketplace/about-app-review); remote code excludes JSON data (developer.chrome.com/docs/extensions/develop/migrate/remote-hosted-code). Roundup store numbers as of 2026-10-26.
- Founder material: extension commit history (first commit 2023-11-27; Aug 2025 selector fixes for the People tab and English-label selectors; selectors loaded from Firestore at startup) and the Marketplace review thread (Mar 23 to May 5, 2026; listing still unapproved and last updated Apr 2 as of 2026-10-26).

## Claims that failed verification (do not reintroduce)

- "Meet has no caption scrollback." False since Feb 2025 (30 minutes). Better Chat's angle is captions kept per meeting link in the browser and downloadable as .txt.
- A 500-character limit on Meet chat. Only third-party sources; no Google page. (Better Chat's own input is capped at 500 characters; that's ours, not Meet's.)
- Meet auto-mutes the sixth person to join. Third-party only.
- Native replies/threads in Meet's call chat. Not documented.
- Whether a knock request plays a sound. Not documented.
- "Transcriptions: 24-hour persistence" (from the 2025 Show HN). Current code keeps captions in the browser's IndexedDB per meeting code and resets them after 22 hours, so the number is 22, not 24.
- Better Chat exporting chat. It doesn't; only captions download.
- Meet transcripts are "computer only". The help page says computer, laptop or Android.
- "Google improved caption history after the 2025 Show HN." It rolled out Feb to Mar 2025, around the same time.
- Enhancement Suite chimes on join/leave/new message in its free tier. The store listing puts "Always Play Chimes" (join, leave and new-message chimes) under Basic, but the vendor's pricing page lists entry/join chimes as Pro: state both. Its listing never says "free": say "Basic tier".
- Meet Plus default mic/camera state, and whether its message history survives a reload. Neither is on its listing or site.
- Meet Plus trial length: listing says 3 and 5 days, site says 3. State both.
- A Google page saying recurring Calendar events always share one Meet link. Not found.
- Whether "Take notes for me" adds a participant to the call. Google doesn't say.
- A Google label for notetaker bots. "With potential risks" is Fireflies' wording for the review queue, not Google's.
- An admin setting aimed specifically at third-party notetaker bots. Not found.
- "Extensions are invisible to other participants." Reasoning only, and Better Chat posts into Meet's chat anyway.
- "Meet add-ons on iOS aren't documented." False: the iPhone & iPad tab of support.google.com/meet/answer/13961388 has steps for joining an activity; non-hosts on mobile can't start one.
- Better Chat keeps chat across days or weeks. False: chat display and stored captions reset after 22 hours (gm-pro ChatMessages.tsx). Verify product claims against gm-pro origin/master, not the local checkout, which can lag.
- Lobby notifier alerts hosts to knock requests. False: it plays a sound for someone waiting on the pre-join screen when another person joins.
- Shuffler reposts when someone leaves. False: only on join.

## Decisions

- Pages Router stays (next.config `i18n` rules out mixing in the App Router), so feed, sitemap and llms.txt are `getServerSideProps` routes gated on `BUILD_TIME` rather than request time.
- Em dash banned everywhere. Disclosure in parentheses wins over unslop's no-parentheses rule (voice file outranks skills).
- Competitors may be named only on comparison-style pages with a "where they win" note (`MARKETING.md`).
- The store listing's marketing composite stands in as the product screenshot until real light/dark captures exist.

## Recheck before these dates

- 2026-12-07 roundup: store user counts, ratings and prices drift; re-fetch.
- 2026-12-13 and 2026-12-15: both posts say the Better Chat add-on listing "hasn't been approved for Google Meet yet" as of October 2026. If it gets approved or renamed before then, update both posts.

## Open questions for Othman

1. ~~Approve `MARKETING.md`~~ Approved 2026-10-25.
2. Your origin story for the manifesto post (why you built it, the meeting where it broke). Not written, since I won't invent it.
3. Landing page says "All in one free extension" in the hero while the product is paid with a trial. Change the hero?
4. Capture real light and dark screenshots of the chat panel at 2x for posts. Three posts (save chat, reactions, two comparisons) reuse the store composite meanwhile.
5. Create the deploy hook and dev.to account, add both secrets.
6. Better Chat's manifest (`gm-pro/manifest.js`) still matches `https://*.example.com/*` in content_scripts, boilerplate from the template. The store install prompt likely names it. Remove it in the next release; the safety post deliberately doesn't describe Better Chat's prompt.
7. The auto-join "Are you still there?" handling matches English text (`'Are you still there?'`, `'Keep waiting'`), so it won't fire in other languages.
8. Review the two founder posts (Dec 11, Dec 15): they quote your April 30 email to the Marketplace reviewer and describe the review timeline.

## Fact audit log

- 2026-10-25: initial sources gathered; wave 1 (17 posts, Oct 28 to Dec 1) written against them, competitor listings re-checked that day. Next audit: 2026-11-25 (re-fetch Enhancement Suite, Meet Plus, Tactiq and Shuffler listings and pricing before then).
