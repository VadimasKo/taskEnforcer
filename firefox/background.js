const listener = (details) => {
  return { cancel: true }
}

browser.webRequest.onBeforeRequest.addListener(listener,
  { urls: [
    "*://*.facebook.com/*",
    "*://*.reddit.com/*",
    "*://*.instagram.com/*",
    "*://*.youtube.com/*",
    "*://*.twitter.com/*",
    "*://*.tiktok.com/*",
    "*://*.snapchat.com/*",
  ] },
  ["blocking"]
)
