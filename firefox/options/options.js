const task = {
  name: "Do 20 pushups",
  duration: "20 minutes",
  perDay: "10",
  activeTime: ["11:40", "18:00"]
}

// fix on empty
const getTaskList = async () => {
  const storageObj = await browser.storage.sync.get('taskList')
  const taskList = JSON.parse(storageObj.taskList)
  return Array.isArray(taskList) ? taskList : []
}

const setTask = async (task) => {
  const taskList = await getTaskList()
  taskList.push(task)
  browser.storage.sync.set({ taskList: JSON.stringify(taskList) })
}

const addTask = async () => {
  await setTask(task)
  rmRenderedTasks()
  renderTasks()
}

const deleteTask = async (index) => {
  const taskList = await getTaskList()
  const newList = taskList.filter((task, i) => i !== index )
  await browser.storage.sync.set({ taskList: JSON.stringify(newList) })
  rmRenderedTasks()
  renderTasks()
}


const renderTasks = async () => {
  const taskList = await getTaskList()
  const fragment = new DocumentFragment()

  taskList.map((task, index) => {
    const tableRow = document.createElement('tr')

    Object.values(task).forEach(value => {
      const tableCell = document.createElement('td')
      tableCell.textContent = value
      tableRow.append(tableCell)
    })

    const deleteBtn = document.createElement('button')
    deleteBtn.id = index
    deleteBtn.className = 'deleteBtn'
    deleteBtn.textContent = 'Delete'
    deleteBtn.onclick = () => deleteTask(index)

    tableRow.append(deleteBtn)
    fragment.append(tableRow)
  })

  const tableBody = document.querySelector("#taskBody")
  tableBody.appendChild(fragment)
}

const rmRenderedTasks = () => {
  const tableBody = document.querySelector("#taskBody")
  tableBody.textContent = ''
}

document.addEventListener('DOMContentLoaded', renderTasks)
document.getElementById("addNew").addEventListener("click", addTask)
