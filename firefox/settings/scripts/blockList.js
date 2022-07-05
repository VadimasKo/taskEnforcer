const removeBlock = async (index) => {
  const oldList = await getBlockList()
  const blockList = oldList.filter((url, i) => i !== index)
  await storage.set({ blockList })
  renderBlockList(true)
}

// Form addNewBlock
const blockForm = document.getElementById('newBlockForm')
blockForm.addEventListener('submit',async () => {
  const data = new FormData(blockForm)
  const blockList = await getBlockList()

  blockList.push(data.get('url'))
  await storage.set({ blockList })
})

// Render Method
const createDeleteBtn = (index) => {
  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'deleteBtn'
  deleteBtn.textContent = 'Delete'
  deleteBtn.onclick = () => removeBlock(index)

  return deleteBtn
}

const renderBlockList = async (isRendered) => {
  const blockList = await getBlockList()
  const tableFragment = new DocumentFragment()
  
  blockList.forEach((url, index) => {
    const blockRow = document.createElement('tr')
  
    const indexCell = document.createElement('th')
    indexCell.scope = 'row'
    indexCell.textContent = index

    const urlCell = document.createElement('td')
    urlCell.textContent = url

    const deleteCell = document.createElement('td')
    deleteCell.append(createDeleteBtn(index))

    blockRow.append(indexCell, urlCell, deleteCell)
    tableFragment.append(blockRow)    
  })

  const htmlList = document.querySelector("#blockBody")
  if (isRendered) htmlList.textContent = ''
  htmlList.appendChild(tableFragment)
}

document.addEventListener('DOMContentLoaded', renderBlockList)
