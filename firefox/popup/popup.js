const renderTask = async () => {
  const { taskList } = await browser.storage.sync.get('taskList')
  const task = JSON.parse(taskList).find(t => t.isActive)
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
  const storageObj = await browser.storage.sync.get('taskList')
  const taskList = JSON.parse(storageObj.taskList)

  const targetTask = taskList[0]
  targetTask.isActive = false
  browser.alarms.clear(targetTask.name)
  
  const newList = [...taskList.filter((t, i) => i !== 0), targetTask]
  
  await browser.storage.sync.set({ 'taskList': JSON.stringify(newList) })
}

document.addEventListener('DOMContentLoaded', renderTask)

document.getElementById("complete").addEventListener("click",async () => {
  await disableCurrentTask()
  await renderTask()
})

document.getElementById("settings").addEventListener("click", () => {
  const settingsURL = browser.runtime.getURL("options/options.html")
  browser.tabs.create({ url: settingsURL })
})
