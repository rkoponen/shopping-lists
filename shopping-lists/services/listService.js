import { sql } from "../database/database.js"

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
}

const findAllLists = async () => {
  return await sql`SELECT * FROM shopping_lists`
}

const findAllActiveLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`
}

const findListById = async (id) => {
  const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`

  if (rows && rows.length > 0) {
    return rows[0]
  }

  return { id: 0, name: "Unknown" }
}

const deactivateListById = async (id) => {
  await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`
}

const deleteAll = async () => {
  await sql`DELETE FROM shopping_lists`
}

const listCount = async () => {
  const rows = await sql`SELECT COUNT(id) FROM shopping_lists`

  if (rows) {
    return rows[0].count
  }
  return 0
}

export { create, findAllActiveLists, findAllLists, findListById, deactivateListById, deleteAll, listCount }