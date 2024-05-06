const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db 
    await request.post('http:localhost:3003/api/testing/reset')
    // create a user for the backend 
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'The Best Blogger',
        username: 'blogger1',
        password: '12345678'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
    //await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByRole('textbox').first().fill('blogger1')
      await page.getByRole('textbox').last().fill('12345678')
      await page.getByRole('button', { name: 'login' }).click()
    
      await expect(page.getByText('The Best Blogger logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByRole('textbox').first().fill('blogger1')
      await page.getByRole('textbox').last().fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong')).toBeVisible()
    })
  })

  })

})
