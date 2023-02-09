import * as itemService from "../services/itemService.js"
import * as listService from "../services/listService.js"
import { renderFile } from "../deps.js"

const responseDetails = {
  headers: { "Content-Type": "text/html;charset-UTF-8"}
}

const viewStats = async (request) => {
  const data = {
    listCount: await listService.listCount(),
    itemCount: await itemService.itemCount()
  }

  return new Response(await renderFile("mainpage.eta", data), responseDetails)
}


export {viewStats}