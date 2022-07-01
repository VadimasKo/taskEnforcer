const defaultList = [
  "*://*.facebook.com/*",
  "*://*.reddit.com/*",
  "*://*.instagram.com/*",
  "*://*.youtube.com/*",
  "*://*.twitter.com/*",
  "*://*.tiktok.com/*",
  "*://*.snapchat.com/*",
]

//initialise blockList
let blockList
const setBlockList = async () => {
  const buffer = await browser.storage.sync.get('blockList')
  if (!buffer.blockList) {
    // onInstall && onStartup listeners/event are not working
    await browser.storage.sync.set({'blockList': defaultList })
    setBlockList()
  } else {
    blockList = buffer.blockList
    setOnBeforeListener()
  }
}
setBlockList()

//initialise Request listenere
const onBeforeRequest = browser.webRequest.onBeforeRequest
const blockCallBack = async () => { 
  const isBlocked = await browser.storage.sync.get('isBlocked').isBlocked
  return isBlocked ? { cancel: true } : null
}

const setOnBeforeListener = () => {
  onBeforeRequest.addListener(
    blockCallBack,
    { urls: blockList },
    ["blocking"]
  )
}

//listen for config changes and update
const bc = new BroadcastChannel('taskEnforcer');

bc.onmessage = async event => {
  const buffer = await browser.storage.sync.get('blockList')
  blockList = buffer.blockList
  onBeforeRequest.removeListener(blockCallBack)
  setOnBeforeListener()
}
