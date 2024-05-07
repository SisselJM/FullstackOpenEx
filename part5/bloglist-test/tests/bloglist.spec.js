const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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

  describe('when logged in', () => {
    //because the execution of each test starts from the browser's "zero state", all changes made to the browser's state by the previous tests are reset.
    //so we need to log in again
    beforeEach(async ({ page, request }) => {
      await loginWith(page, 'blogger1', '12345678')
/*tror ikke dette funker, kanskje 401 eller at blogs ikke blir oppdatert
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
      //viser ikke liste over blogs, viser fortsatt NewBlogForm - tom
      //await page.pause()
      //timeout: waiting for getByText('another blog created by playwright')
      await expect(page.getByText(title, { exact: false })).toBeVisible()
      //will only pass the first time (ok hvis waitFor funker?)
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'playwright has created a blog', 'Sam Blogman', 'www.blogs.se')
      })

      test('the blog is visible', async ({ page }) => {
        /*
        const blog1 = page.getByText('The First Blog', { exact: false })
        console.log('blog1: ', blog1) 
        const blog2 = page.getByText('a blog created by playwright', { exact: false })
        console.log('blog2: ', blog2) 
        */
        //await expect(page.getByText('The list 0', { exact: false })).toBeVisible()
        //feiler, så blogs er tom - await expect(page.getByText('The list 2', { exact: false })).toBeVisible()
        // ok når jeg har opprettet 3 blogs i browser, og fjernet Blog.deleteMany fra backend, så det er Create som ikke funker
        await expect(page.getByText('The list 1', { exact: false })).toBeVisible()
        /*
        await expect(page.getByText('The First Blog', { exact: false })).toBeVisible()
        await expect(page.getByText('a blog created by playwright', { exact: false })).toBeVisible()
        */
//        await expect(page.getByText('Test', { exact: false })).toBeDefined()
        
      })

    })

  })

})
