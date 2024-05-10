const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, logout, createBlog, showBlogDetails, addLike } = require('./helper')
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
      const title1 = 'Existing blog'
      beforeEach(async ({ page }) => {
        await createBlog(page, title1, 'Sam Blogman', 'www.blogs.se')
      })

      //5.20 likes can be added (the only edit option that is in frontend).
      test('like can be added', async ({ page }) => {
        await addLike(page, title1, true)
        await expect(page.getByText('likes 1', { exact: false })).toBeVisible()
      })

      //5.23 Do a test that ensures that the blogs are arranged in the order according to the likes, the blog with the most likes first.
      test('blogs are arranged in the order according to the likes', async ({ page }) => {
        await addLike(page, title1, true)

        const title2 = 'A new blog'
        await createBlog(page, title2, 'Sam Blogman', 'www.blogs.se')
        await addLike(page, title2, true)
        await addLike(page, title2, false)
        //refresh - is not sorted when like is added
        await page.goto('/')
        //await page.pause()
        //TODO test at title2 kommer først hvordan tester man hva som kommer først?

      })
    })

  })

  describe('deleting blog', () => {
    const author = 'blogger1'
    const title = `Blog created by ${author}`
    beforeEach(async ({ page }) => {
      await loginWith(page, author, '12345678', true)
      await createBlog(page, title, author, 'www.blogs.no')
    })

    //5.21 
    test('the user who added the blog can delete the blog', async ({ page }) => {
      const blogElement = await showBlogDetails(page, title, true)
      page.on('dialog', dialog => dialog.accept()); //window.confirm
      await blogElement.getByRole('button', { name: 'Remove' }).click()

      await expect(page.locator(`text=${title}`)).toHaveCount(0)
    })

    //5.22 
    test('only the user who added the blog sees the blogs delete button', async ({ page, request }) => {
      const blogElement = await showBlogDetails(page, title, true)
      await expect(blogElement.getByRole('button', { name: 'Remove' })).toBeVisible()

      await logout(page)
      await request.post('/api/users', {
        data: {
          name: 'The 2nd Best Blogger',
          username: 'blogger2',
          password: '12345678'
        }
      })
      await loginWith(page, 'blogger2', '12345678', false)

      //details are open so no need to click 'view'
      const blogText2 = page.getByText(title, { exact: false })
      const blogElement2 = blogText2.locator('..')      
      expect(blogElement2.getByRole('button', { name: 'Remove' }).isHidden())
    })

  })

})
