const storage = browser.storage.local

const getTaskList = async () => {
  const { taskList } =  await storage.get('taskList')
  return JSON.parse(taskList || "[]")
}

const getBlockList = async () => {
  const { blockList } = await storage.get('blockList')
  return blockList || []
}

const convertDeadline = ({ deadline }) => {
  return deadline.split(':').map(v => parseInt(v))
}

// Time functions
const isFirstTimeSmaller = (time1, time2) => {
  const lessHours = time1[0] < time2[0]
  const sameHours = time1[0] === time2[0]
  const lessMinutes = time1[1] < time2[1]

  return lessHours || (sameHours && lessMinutes)
}

const isBeforeCurrentTime = (time) => {
  const cDate = new Date()
  const cTime = [cDate.getHours(), cDate.getMinutes()]

  return isFirstTimeSmaller(time, cTime)
}

const sortTasks = (taskList) => {

  taskList.sort((task1, task2) => {
    const time1 = convertDeadline(task1)
    const time2 = convertDeadline(task2)

    const isTime1Before = isBeforeCurrentTime(time1)
    const isTime2Before = isBeforeCurrentTime(time2)

    if (!isTime1Before && isTime2Before) return -1 //return task1
    if (isTime1Before && !isTime2Before) return 1 //return task2

    return isFirstTimeSmaller(time1, time2) ? -1 : 1
  })

  return taskList
}
