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

const setNextDeadline = async () => {
  const { isBlocked } = await storage.get('isBlocked')
  const taskList = await getTaskList()
  const task = taskList.find(t => t.isActive)

  if (task && !isBlocked) {
    const [h, min] = task.deadline.split(":")
    browser.alarms.create(task.name, { 
      when: getUnixDeadline(h, min) 
    })
  }
}

const deactivateTask = async () => {
  const taskList = await getTaskList()
  const firstTask = taskList.shift()
  firstTask.isActive = false
  taskList.push(firstTask)

  await storage.set({ taskList })
}

browser.runtime.onStartup.addListener(setNextDeadline)

browser.storage.onChanged.addListener(async changes => {
  if (Object.keys(changes).includes('taskList')) {
    browser.alarms.clearAll()
    await setNextDeadline()
  }
})

browser.alarms.onAlarm.addListener(alarm => {
  browser.storage.local.set({ 'isBlocked': true })
  browser.notifications.create({
    priority: 1,
    type:     'basic',
    title:    'Task Deadline',
    message:  `Don't forget to do ${alarm.name}`,
    iconUrl:  '../icons/border-46.png',
  })
})
