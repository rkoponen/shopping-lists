import * as itemService from "../services/itemService.js"
import * as requestUtils from "../utils/requestUtils.js"

const addItem = async (request) => {
  const url = new URL(request.url)
  const id = url.pathname.split("/")[2]

  const formData = await request.formData()
  const name = formData.get("name")

  await itemService.create(id, name)

  return requestUtils.redirectTo(`/lists/${id}`)
}

const markCollected = async (request) => {
  const url = new URL(request.url)
  const itemId = url.pathname.split("/")[4]
  const listId = url.pathname.split("/")[2]
  
  await itemService.markCollectedById(itemId)
  return requestUtils.redirectTo(`/lists/${listId}`)
}


export {addItem, markCollected}