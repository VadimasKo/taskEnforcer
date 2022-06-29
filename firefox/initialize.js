browser.runtime.onStartup.addListener(async () => {
  await browser.storage.sync.set({'blockList': [
    "*://*.facebook.com/*",
    "*://*.reddit.com/*",
    "*://*.instagram.com/*",
    "*://*.youtube.com/*",
    "*://*.twitter.com/*",
    "*://*.tiktok.com/*",
    "*://*.snapchat.com/*",
  ]})
})
