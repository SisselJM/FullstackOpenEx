const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, logout, createBlog, showBlogDetails } = require('./helper')
const exp = require('constants')

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
      await loginWith(page, 'blogger1', '12345678', true)
      await expect(page.getByText('The Best Blogger logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'blogger1', 'wrong', true)

      await expect(page.getByText('wrong')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    //because the execution of each test starts from the browser's "zero state", all changes made to the browser's state by the previous tests are reset.
    //so we need to log in again
    beforeEach(async ({ page, request }) => {
      await loginWith(page, 'blogger1', '12345678', true)
/*tror ikke dette funker, kanskje 401 eller at blogs ikke blir oppdatert - url var required, endret nå
      await request.post('/api/blogs', {
        data: {
          title: 'The First Blog',
          author: 'The Best Blogger'
        }
      })*/
    })

    test('a new blog can be created', async ({ page }) => {
      const title = 'playwright has created a blog' // avoid using "Blog created", will be displayed as Notification and may test on it
      await createBlog(page, title, 'Sam Blogman', 'www.blogs.se')
      await expect(page.getByText(title, { exact: false })).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Existing blog', 'Sam Blogman', 'www.blogs.se')
      })

      //5.20 likes can be added (the only edit option that is in frontend).
      test('like can be added', async ({ page }) => {
        //click view button to show details, then like button
        const blogElement = await showBlogDetails(page, 'Existing blog')
        await blogElement.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1', { exact: false })).toBeVisible()
      })

    })

  })

  describe('deleting blog', () => {
    const author = 'blogger1'
    const title = `Blog created by ${author}`
    beforeEach(async ({ page, request }) => {
      await loginWith(page, author, '12345678', true)
      await createBlog(page, title, author, 'www.blogs.no')

      await request.post('/api/users', {
        data: {
          name: 'The 2nd Best Blogger',
          username: 'blogger2',
          password: '12345678'
        }
      })
    })
    //5.22 Make a test that ensures that only the user who added the blog sees the blog's delete button.
    test('only the user who added the blog sees the blogs delete button', async ({ page }) => {
      const blogElement = await showBlogDetails(page, title)
      await expect(blogElement.getByRole('button', { name: 'Remove' })).toBeVisible()

      await logout(page)
      await loginWith(page, 'blogger2', '12345678', false)

      //details are open so no need to click 'view'
      const blogText2 = page.getByText(title, { exact: false })
      const blogElement2 = blogText2.locator('..')      
      expect(blogElement2.getByRole('button', { name: 'Remove' }).isHidden())
    })

    //her står det ikke only, så trenger ikke teste med flere brukere - kan flytte post/user til test 5.22
    //5.21 Make a test that ensures that the user who added the blog can delete the blog. 
    test('the user who added the blog can delete the blog', async ({ page }) => {
      const blogElement = await showBlogDetails(page, title)
      await page.pause()
      await blogElement.getByRole('button', { name: 'Remove' }).click()
    //TODO If you use the window.confirm dialog in the delete operation, you may have to Google how to use the dialog in the Playwright tests.
    //sjekk at den forsvinner
  })

  })

})
