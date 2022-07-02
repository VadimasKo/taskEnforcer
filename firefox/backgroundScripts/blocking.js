const blockRequest = async ({ documentUrl }) => {
  const { blockList } = await storage.get('blockList')
  const { isBlocked } = await storage.get('isBlocked')

  console.log('documentURL', documentUrl)

  if (blockList.includes(documentUrl) && isBlocked) {
    return { cancel: true }
  }
}

browser.webRequest.onBeforeRequest.addListener = () => {
  blockRequest,
  { urls:  ['<all_urls>']}
  ["blocking"]
}

browser.runtime.onInstalled.addListener(async () => {
  const blockList = [
    "*://*.facebook.com/*",
    "*://*.reddit.com/*",
    "*://*.instagram.com/*",
    "*://*.youtube.com/*",
    "*://*.twitter.com/*",
    "*://*.tiktok.com/*",
    "*://*.snapchat.com/*",
  ]

  await storage.set({ blockList })
})
