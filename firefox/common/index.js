const storage = browser.storage.local

const getTaskList = async () => {
  const { taskList } =  await storage.get('taskList')
  return JSON.parse(taskList || "[]")
}

const getBlockList = async () => {
  const { blockList } = await storage.get('blockList')
  return blockList || []
}
