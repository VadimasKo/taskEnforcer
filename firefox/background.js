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

let onBeforeListener
const setOnBeforeListener = () => {
  onBeforeListener = onBeforeRequest.addListener(
    () => {  return { cancel: true } },
    { urls: blockList?.length ? blockList : [''] },
    ["blocking"]
  )
}

//listen for config changes and updateQ
// WHY ARE YOU NOT RUNNING!!! 
// https://www.youtube.com/watch?v=dv0k5J9YDuM
// browser.storage.onChanged.addListener(changes => {
//   console(changes, 'onChanged')
//   blockList = changes.blockList.newValue
//   onBeforeRequest.removeListener(onBeforeListener)
//   setOnBeforeListener()
// })

const bc = new BroadcastChannel('taskEnforcer');

bc.onmessage = async event => {
  console.log(event.data)
  const buffer = await browser.storage.sync.get('blockList')
  blockList = buffer.blockList
  onBeforeRequest.removeListener(onBeforeListener)
  setOnBeforeListener()
}
