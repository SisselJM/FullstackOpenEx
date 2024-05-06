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
    //await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible()
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
