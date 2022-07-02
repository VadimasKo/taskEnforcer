const renderTask = async () => {
  const taskList = await getTaskList()
  const task = taskList.find(t => t.isActive)
  const taskInfoDiv = document.getElementById('taskInfo')

  if (task) {
    const infoFragment = new DocumentFragment()
    
    const nameH2 = document.createElement('h2')
    nameH2.textContent = task.name

    const deadlineP = document.createElement('small')
    deadlineP.textContent = "Task deadline: " + task.deadline

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
  firstTask.isActive = false
  browser.alarms.clear(firstTask.name)
  taskList.push(targetTask)

  await storage.set({ 'taskList': JSON.stringify(taskList) })
}

document.addEventListener('DOMContentLoaded', renderTask)

document.getElementById("complete").addEventListener("click",
  async () => {
    await disableCurrentTask()
    await storage.set({ "isBlocked": false })
    renderTask()
  }
)

document.getElementById("settings").addEventListener("click",
  () => {
  const settingsURL = browser.runtime.getURL("options/options.html")
  browser.tabs.create({ url: settingsURL })
})
