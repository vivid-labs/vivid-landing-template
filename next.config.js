// One value for every process that loads this config during a build.
process.env.BUILD_TIME ??= new Date().toISOString();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Blog posts go live once a deploy's build time passes their publish date.
  env: { BUILD_TIME: process.env.BUILD_TIME },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async rewrites() {
    const storage = "https://firebasestorage.googleapis.com/v0/b/gmpro-404802.firebasestorage.app/o";
    return [
      { source: "/blog/:slug/og.png", destination: "/api/og?slug=:slug" },
      // Short URLs for Better Chat attachments.
      { source: "/i/:file", destination: `${storage}/chat_images%2F:file?alt=media` },
      { source: "/f/:file", destination: `${storage}/chat_attachments%2F:file?alt=media` },
    ];
  },
  async headers() {
    return [
      {
        // Allow the sidepanel to be embedded in Google Meet's iframe
        source: "/sidepanel",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://meet.google.com https://*.google.com",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
