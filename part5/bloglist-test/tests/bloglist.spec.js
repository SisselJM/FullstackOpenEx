const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
    //await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible()
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    //feiler fordi denne brukeren er i prod, ikke test
    await page.getByRole('textbox').first().fill('blogger1')
    await page.getByRole('textbox').last().fill('12345678')
    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('The Best Blogger logged in')).toBeVisible()
  })

})
