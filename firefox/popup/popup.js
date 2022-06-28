const onClick = () => {
  const settingsURL = browser.runtime.getURL("options/options.html")
  browser.tabs.create({ url: settingsURL })
  console.log('click')
}

const onBlock = () => {
  console.log('block')
  browser.storage.sync.set({ isBlocked: true })
}

const checkBlock =async  () => {
  const isBlocked =await browser.storage.sync.get('isBlocked')
  console.log(isBlocked)
}

document.getElementById("settings").addEventListener("click", onClick);

document.getElementById("block").addEventListener("click", onBlock);

document.getElementById("isBlocked").addEventListener("click", checkBlock);
