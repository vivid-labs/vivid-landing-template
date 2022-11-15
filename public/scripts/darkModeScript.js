// Insert this script in your index.html right after the <body> tag.
// This will help to prevent a flash if dark mode is the default.

(function () {
  // Change these if you use something different in your hook.
  let storageKey = "usehooks-ts-dark-mode";
  let classNameDark = "dark";

  const setClassOnDocumentBody = (darkMode) => {
    if (darkMode) {
      document.documentElement.classList.add(classNameDark);
      document.documentElement.style.setProperty("color-scheme", "dark");
    } else {
      document.documentElement.style.setProperty("color-scheme", "light");
    }
  };

  let preferDarkQuery = "(prefers-color-scheme: dark)";
  let mql = window.matchMedia(preferDarkQuery);
  let supportsColorSchemeQuery = mql.media === preferDarkQuery;
  let localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
  } catch (err) {}
  let localStorageExists = localStorageTheme !== null;
  if (localStorageExists) {
    localStorageTheme = JSON.parse(localStorageTheme);
  }

  // Determine the source of truth
  if (localStorageExists) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme);
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches);
    localStorage.setItem(storageKey, mql.matches);
  } else {
    // source of truth from document.body
    let isDarkMode = document.documentElement.classList.contains(classNameDark);
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
  }
})();
