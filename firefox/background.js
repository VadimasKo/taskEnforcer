const listener = async (details) => {
  const isBlocked = await checkBlock()
  if (isBlocked) {
    return { cancel: true }
  }
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

const checkBlock = async  () => {
  const isBlocked =await browser.storage.sync.get('isBlocked')
  console.log(isBlocked)
  return isBlocked
}
