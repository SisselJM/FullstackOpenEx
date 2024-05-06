const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db 
    await request.post('/api/testing/reset')
    // create a user for the backend 
    await request.post('/api/users', {
      data: {
        name: 'The Best Blogger',
        username: 'blogger1',
        password: '12345678'
      }
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Blog app, by Fullstack open')).toBeVisible()
  })

  test('Login button is shown', async ({ page }) => {
    //The exercise is actually to ensure that the application displays the login form by default. 
    //However, the application does not display the login form until the login button is displayed. 
    const locator = await page.getByText('log in')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'blogger1', '12345678')
      await expect(page.getByText('The Best Blogger logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'blogger1', 'wrong')

      await expect(page.getByText('wrong')).toBeVisible()
    })
  })

  })

})
