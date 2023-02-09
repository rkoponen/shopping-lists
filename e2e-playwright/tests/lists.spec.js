const { test, expect } = require("@playwright/test")

test("Can create a list.", async ({ page }) => {
  await page.goto("/lists")
  const listName = `${Math.random()}`
  await page.locator("input[name=name]").type(listName)
  await page.getByText("Add list").click()

  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName)
})

test("Can deactivate a list.", async ({ page }) => {
  await page.goto("/lists")
  const listName = `${Math.random()}`
  await page.locator("input[name=name]").type(listName)
  await page.getByText("Add list").click()
  await page.getByText("Deactivate list!").last().click()

  await expect(page.locator("li").last()).not.toContainText(listName)
})


test("Clicking a shopping list opens the shopping list.", async ({ page }) => {
  await page.goto("/lists")
  const listName = `${Math.random()}`
  await page.locator("input[name=name]").type(listName)
  await page.getByText("Add list").click()
  await page.locator(`a >> text='${listName}'`).click()

  await expect(page.locator(`a >> text='Shopping lists'`)).toHaveText('Shopping lists')
  await expect(page.locator("h2")).toHaveText(listName)
})

test("An item can be added to a shopping list.", async ({ page }) => {
  await page.goto("/lists")
  const listName = `${Math.random()}`
  await page.locator("input[name=name]").type(listName)
  await page.getByText("Add list").click()
  await page.locator(`a >> text='${listName}'`).click()

  const itemName = `${Math.random()}`
  await page.locator("input[name=name]").type(itemName)
  await page.getByText("Add to list").click()

  await expect(page.locator("li")).toHaveText(itemName)
})

test("An item can be collected", async ({ page }) => {
  await page.goto("/lists")
  await page.locator("input[name=name]").type("monday shopping")
  await page.getByText("Add list").click()
  await page.locator("a >> text='monday shopping'").first().click()
  
  await page.locator("input[name=name]").type("banana")
  await page.getByText("Add to list").click()
  await page.getByText("Mark collected!").first().click()

  await expect(page.locator("del >> text='banana'").first()).toHaveText('banana')
})

