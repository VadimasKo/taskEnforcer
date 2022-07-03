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

storage.onChanged.addListener(async changes => {
  console.log('changes', changes)
  const hasBlockChanged = Object.keys(changes).includes('isBlocked')
  const hasListChanged = Object.keys(changes).includes('blockList')
  
  let isBlocked
  let blockList

  if (!hasListChanged && !hasBlockChanged){
    return

  } else if (hasListChanged && hasBlockChanged) {
    isBlocked = changes.isBLocked.newValue
    blockList = changes.blockList.newValue

  } else if (hasListChanged) {
    isBlocked = await storage.get('isBLocked').isBLocked
    blockList = changes.blockList.newValue

  } else if (hasBlockChanged) {
    isBlocked = changes.isBlocked.newValue
    blockList = await getBlockList()
    
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
