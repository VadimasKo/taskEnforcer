const setTask = async (task) => {
  const taskList = await getTaskList()

  taskList.push(task)
  const sortedList = JSON.stringify(sortTasks(taskList))

  await storage.set({ taskList: sortedList })
}

const deleteTask = async (index) => {
  const taskList = await getTaskList()
  const newList = taskList.filter((t, i) => i !== index)
  await storage.set({ taskList: JSON.stringify(newList) })
  await renderTasks(true)
}

//===== HandleForm
const form = document.getElementById('newTaskForm')
form.addEventListener('submit',async () => {
  const data = new FormData(form)
  const task = {
    name:     data.get('name'),
    deadline: data.get('deadline'),
    duration: data.get('duration'),
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
  if (isRendered) tableBody.textContent = ''
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
