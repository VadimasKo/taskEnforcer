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
const renderBlockList = async (isRendered) => {
  const blockList = await getBlockList()
  const listFragment = new DocumentFragment()
  
  blockList.forEach((url, index) => {
    const blockItem = document.createElement('li')
    blockItem.textContent = url
    
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'deleteBtn'
    deleteBtn.textContent = 'Delete'
    deleteBtn.onclick = () => removeBlock(index)
    
    blockItem.append(deleteBtn)
    listFragment.append(blockItem)    
  })

  const htmlList = document.querySelector("#blockList")
  if (isRendered) htmlList.textContent = ''
  htmlList.appendChild(listFragment)
}

document.addEventListener('DOMContentLoaded', renderBlockList)
