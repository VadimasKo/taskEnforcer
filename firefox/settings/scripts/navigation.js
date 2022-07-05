const navIcon = document.getElementById('navIcon')
const taskOption = document.getElementById('taskOption')
const blockOption = document.getElementById('blockOption')
const iconWrapper = document.getElementById('iconWrapper')
const taskList = document.getElementById('taskList')
const blockList = document.getElementById('blockList')


const openCloseSidebar = () => {
  const navBar = document.getElementsByTagName('nav')[0]

  if (navBar.classList.contains('isClosed')) {
    navBar.classList.replace('isClosed', 'isOpen')

    const title = document.createElement('h2')
    title.textContent = 'Settings'
    iconWrapper.prepend(title)

    const taskOptionTag = document.createElement('p')
    taskOptionTag.textContent = 'Task List'
    taskOption.prepend(taskOptionTag)

    const blockOptionTag = document.createElement('p')
    blockOptionTag.textContent = 'Block List'
    blockOption.prepend(blockOptionTag)

  } else {
    navBar.classList.replace('isOpen', 'isClosed')
    
    iconWrapper.getElementsByTagName('h2')[0].remove()
    taskOption.getElementsByTagName('p')[0].remove()
    blockOption.getElementsByTagName('p')[0].remove()
  }
}

const handleTaskList = () => {
  if (!taskOption.classList.contains('isSelected')) {
    taskOption.classList.add('isSelected')
    blockOption.classList.remove('isSelected')

    taskList.classList.remove('isHidden')
    blockList.classList.add('isHidden')
  }
}

const handleBlockList = () => {
  if (!blockOption.classList.contains('isSelected')) {
    blockOption.classList.add('isSelected')
    taskOption.classList.remove('isSelected')

    blockList.classList.remove('isHidden')
    taskList.classList.add('isHidden')
  }
}

navIcon.addEventListener('click', openCloseSidebar)
taskOption.addEventListener('click', handleTaskList)
blockOption.addEventListener('click', handleBlockList)
