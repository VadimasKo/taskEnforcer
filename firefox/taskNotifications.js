let isNotificationSet = false


const getUnixDeadline = (h, min) => {
  const hoursToUnix = (h) => h * 3600000
  const minToUnix = (min) => min * 60000

  const currentDate = new Date()
  const currentUnix = Date.now()
  const cHours = currentDate.getHours()
  const cMin = currentDate.getMinutes()

  const cFullDaysUnix = currentUnix - hoursToUnix(cHours) - minToUnix(cMin)
  
  const deadline = cFullDaysUnix + hoursToUnix(h) + minToUnix(min)

  return deadline
}

const disableTask = async (index) => {
  const storageObj = await browser.storage.sync.get('taskList')
  const taskList = JSON.parse(storageObj.taskList)
  const targetTask = taskList[index]
  targetTask.isActive = false
  
  const newList = [...taskList.filter((t, i) => i !== index), targetTask]
  
  await browser.storage.sync.set({ 'taskList': JSON.stringify(newList) })
}

const setNextTask = async () => {
  let { taskList } = await browser.storage.sync.get('taskList')
  if (!taskList) {
    await browser.storage.sync.set({ 'taskList': '[]' })
    setNextTask()
  } else if (!isNotificationSet) {
    taskList = JSON.parse(taskList) || []
    const task = taskList.find(t => t.isActive)
    if (!task)  return

    const [h, min] = task.deadline.split(":")
    const unixDeadline = getUnixDeadline(h, min)

    if (unixDeadline <= Date.now()) {
      await disableTask(0)
      setNextTask()
    } else {
      console.log('setAlarm', new Date(unixDeadline))
      browser.alarms.create(task.name, { when: unixDeadline })
      isNotificationSet = true
    }
  }
}

setNextTask()

browser.alarms.onAlarm.addListener(async alarm => {
  await browser.storage.sync.set({'isBlocked': true })
  browser.notifications.create({
    type: 'basic',
    iconUrl: 'icons/border-48.png',
    title: `Task Deadline`,
    message: `Dont forget to do ${alarm.name}`,
    priority: 1,
  })
})
