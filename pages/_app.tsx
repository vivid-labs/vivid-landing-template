import "aos/dist/aos.css";
import "../styles/globals.css";

import AOS from "aos";
import type { AppProps } from "next/app";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { useEffect, useRef } from "react";
import { useDarkMode } from "usehooks-ts";

const siteTitle = "Better Chat: Supercharge Your Google Meet Experience";
const siteDescription =
  "Enhance chat functionality, streamline communication, and unlock powerful tools for your Google Meet meetings with Better Chat Chrome extension.";

const App = ({ Component, pageProps }: AppProps) => {
  const { isDarkMode, toggle: toggleDarkMode } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.setProperty("color-scheme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.setProperty("color-scheme", "light");
    }
  }, [isDarkMode]);

  // Initialize animations
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      AOS.init({
        once: true,
        // Animations always disabled in dev mode; disabled on phones in prod
        disable: process.env.NODE_ENV === "development" ? true : "phone",
        duration: 700,
        easing: "ease-out-cubic",
      });
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/images/logo.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/icons/favicon-48x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <NextSeo
        title={siteTitle}
        description={siteDescription}
        themeColor={isDarkMode ? "#18181b" : "#fafafa"}
        openGraph={{
          title: siteTitle,
          description: siteDescription,
          images: [{ url: "https://better-chat.vercel.app/images/logo-512.png" }],
        }}
      />
      <Component
        {...pageProps}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </>
  );
};

export default App;
