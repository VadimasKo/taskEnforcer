browser.runtime.onInstalled.addListener(async () => {
  await storage.set({ blockList: [
    "*://*.facebook.com/*",
    "*://*.reddit.com/*",
    "*://*.instagram.com/*",
    "*://*.youtube.com/*",
    "*://*.twitter.com/*",
    "*://*.tiktok.com/*",
    "*://*.snapchat.com/*",
  ]})
})

const blockCallback = () => { return { cancel: true }}

browser.runtime.onStartup.addListener(async () => {
  const blockList = await getBlockList()
  const isBlocked = await storage.get('isBlocked')

  if (isBlocked) {
    browser.webRequest.onBeforeRequest.addListener(
      blockCallback,
      { urls: blockList },
      ['blocking']
    )
  }
})

storage.onChanged.addListener(async ({ isBlocked, blockList }) => {
  if (isBlocked && blockList) {
    isBlocked = isBlocked.newValue
    blockList = blockList.newValue
  } else if (isBlocked && !blockList) {
    isBlocked = isBlocked.newValue
    blockList = await getBlockList() 
  } else if (!isBlocked && blockList) {
    isBlocked = await storage.get('isBLocked').isBLocked
    blockList = blockList.newValue
  } else {
    //if includes no relevant change
    return
  }

  if (isBlocked) {
    browser.webRequest.onBeforeRequest.addListener(
      blockCallback,
      { urls: blockList },
      ['blocking']
    )
  } else {
    browser.webRequest.onBeforeRequest.removeListener(blockCallback)
  }
})
