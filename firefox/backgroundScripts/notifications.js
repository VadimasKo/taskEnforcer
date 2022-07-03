const getUnixDeadline = (time) => {
  const date = new Date()
  isBeforeCurrentTime(time) && date.setDate(date.getDate() + 1)
  date.setHours(time[0])
  date.setMinutes(time[1])
  date.setSeconds(0)

  return date.getTime()
}

const setNextDeadline = async () => {
  const { isBlocked } = await storage.get('isBlocked')
  const taskList = await getTaskList()
  const task = taskList[0]
  
  if (task && !isBlocked) {
    const deadline = convertDeadline(task)
    browser.alarms.create(task.name, { 
      when: getUnixDeadline(deadline) 
    })
  }
}

const deactivateTask = async () => {
  const taskList = await getTaskList()

  const firstTask = taskList.shift()
  taskList.push(firstTask)

  await storage.set({ taskList })
}

browser.runtime.onStartup.addListener(setNextDeadline)

browser.storage.onChanged.addListener(async ({ taskList }) => {
  if (taskList) {
    if (taskList.newValue === taskList.oldValue) {
      // Edge case: only 1 task in taskList, 
      // completed ahead of time 
      // detected if JSON of new Value == oldValue
      browser.alarms.clearAll()      
    } else {
      await setNextDeadline()
      browser.alarms.clearAll()
    }
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
