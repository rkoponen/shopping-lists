import { sql } from "../database/database.js"

const create = async (id, name) => {
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${id}, ${name})`
}

const findItemsById = async (id) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id}`
}

const markCollectedById = async (id) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${id}`
}

const deleteAll = async () => {
  await sql`DELETE FROM shopping_list_items`
}

const itemCount = async () => {
  const rows = await sql`SELECT COUNT(id) FROM shopping_list_items`

  if (rows) {
    return rows[0].count
  }

  return 0
}

export {create, findItemsById, deleteAll, markCollectedById, itemCount}