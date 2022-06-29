//initialise blockList
let blockList
const setBlockList = async () => {
  const buffer = await browser.storage.sync.get('blockList')
  blockList = buffer.blockList
  setOnBeforeListener()
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


//listen for config changes and update
browser.storage.onChanged.addListener(changes => {
  blockList = changes.blockList.newValue
  onBeforeRequest.removeListener(onBeforeListener)
  setOnBeforeListener()
})
