const renderTask = async () => {
  const taskList = await getTaskList()
  const { isBlocked } = await storage.get('isBlocked')
  const task = taskList[0]

  const isToday = task && !isBeforeCurrentTime(convertDeadline(task))
  const taskInfoDiv = document.getElementById('taskInfo')
    
  if (isToday || !isToday && isBlocked) {
    const infoFragment = new DocumentFragment()
    
    const nameH2 = document.createElement('h2')
    nameH2.textContent = task.name

    const deadlineP = document.createElement('p')
    deadlineP.textContent = "Deadline " + task.deadline

    infoFragment.append(nameH2, deadlineP)

    taskInfoDiv.textContent = ''
    taskInfoDiv.appendChild(infoFragment)
    document.getElementById("complete").disabled = false

  } else {
    const infoH2 = document.createElement('h2')
    infoH2.textContent = "Where is no active task"

    taskInfoDiv.textContent = ''
    taskInfoDiv.appendChild(infoH2)
    document.getElementById("complete").disabled = true
  }
}

const disableCurrentTask = async () => {
  const taskList = await getTaskList()

  const firstTask = taskList.shift()
  if (firstTask.isRepeatable) {
    taskList.push(firstTask)
  }

  await storage.set({ 'taskList': JSON.stringify(taskList) })
}

document.addEventListener('DOMContentLoaded', renderTask)

document.getElementById("complete").addEventListener("click",
  async () => {
    await disableCurrentTask()
    await storage.set({ "isBlocked": false })
    await renderTask()
  }
)

document.getElementById("settings").addEventListener("click",() => {
  const settingsURL = browser.runtime.getURL("settings/settings.html")
  browser.tabs.create({ url: settingsURL })
})
