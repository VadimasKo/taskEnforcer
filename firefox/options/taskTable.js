//===== Task CRUD update/Edit is missing
const getTaskList = async () => {
  const storageObj = await browser.storage.sync.get('taskList')
  return JSON.parse(storageObj.taskList  || '[]')
}

const setTask = async (task) => {
  const taskList = await getTaskList()
  taskList.push(task)

  taskList.sort((task1, task2) => {
    if (task1.isActive && !task2.isActive) return -1
    if (!task1.isActive && task2.isActive) return +1

    const [h1, min1] = task1.deadline.split(':').map(val => parseInt(val))
    const [h2, min2] = task2.deadline.split(':').map(val => parseInt(val))

    return h1 < h2 || (h1 === h2 && min1 <= min2 ) ? -1 : + 1
  })

  await browser.storage.sync.set({ taskList: JSON.stringify(taskList) })
}

const deleteTask = async (index) => {
  const taskList = await getTaskList()
  const newList = taskList.filter((t, i) => i !== index)
  await browser.storage.sync.set({ taskList: JSON.stringify(newList) })
  renderTasks(true)
}

//===== HandleForm
const form = document.getElementById('newTaskForm')
form.addEventListener('submit', async e => {
  const data = new FormData(form)
  const task = {
    name:     data.get('name'),
    deadline: data.get('deadline'),
    duration: data.get('duration'),
    isActive: true,
  }
  await setTask(task)
  renderTasks(true)
})

//===== Rendering methods
const renderTasks = async (isRendered) => {

  const taskList = await getTaskList()
  const fragment = new DocumentFragment()

  taskList.map((task, index) => {
    const tableRow = document.createElement('tr')

    Object.values(task).forEach(value => {
      const tableCell = document.createElement('td')
      tableCell.textContent = value
      tableRow.append(tableCell)
    })

    tableRow.append(createEditDeleteCell(index))
    fragment.append(tableRow)
  })

  const tableBody = document.querySelector("#taskBody")
  if (isRendered) tableBody.textContent = '' //remove prev render
  tableBody.appendChild(fragment)
}

// Is there a shorthand method?
const createEditDeleteCell = (index) => {
  const tableCell = document.createElement('td')

  const deleteBtn = document.createElement('button')
  deleteBtn.id = index
  deleteBtn.className = 'deleteBtn'
  deleteBtn.textContent = 'Delete'
  deleteBtn.onclick = () => deleteTask(index)

  const editBtn = document.createElement('button')
  editBtn.id = index
  editBtn.disabled = true
  editBtn.className = 'editBtn'
  editBtn.textContent = 'Edit'

  tableCell.append(editBtn, deleteBtn)
  return tableCell
}


document.addEventListener('DOMContentLoaded', renderTasks)
