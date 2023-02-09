import * as requestUtils from "../utils/requestUtils.js"
import * as listService from "../services/listService.js"
import * as itemService from "../services/itemService.js"
import { renderFile } from "../deps.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8"}
}

const addList = async (request) => {
  const formData = await request.formData()
  const name = formData.get("name")

  await listService.create(name)

  return requestUtils.redirectTo("/lists")
}

const viewLists = async (request) => {
  const data = {
    lists: await listService.findAllActiveLists(),
  }
  return new Response(await renderFile("lists.eta", data), responseDetails);
}

const viewList = async (request) => {
  const url = new URL(request.url)
  const urlParts = url.pathname.split("/")


  const data = {
    list: await listService.findListById(urlParts[2]),
    items: await itemService.findItemsById(urlParts[2]),
  }

  return new Response(await renderFile("list.eta", data), responseDetails)
}

const deactivateList = async (request) => {
  const url = new URL(request.url)
  const urlParts = url.pathname.split("/")
  await listService.deactivateListById(urlParts[2])

  return requestUtils.redirectTo("/lists")
}

export {addList, viewLists, viewList, deactivateList}