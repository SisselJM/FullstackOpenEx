const loginWith = async (page, username, password, openLogin)  => {
  if (openLogin) { //kan man sette default verdi?
    await page.getByRole('button', { name: 'log in' }).click()
  }
  await page.getByRole('textbox').first().fill(username)
  await page.getByRole('textbox').last().fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const logout = async (page)  => {
  await page.getByRole('button', { name: 'Logout' }).click()
}

const createBlog = async ( page, title, author, url ) => {
  //await page.pause() //sjekk om blog liste vises
  await page.getByRole('button', { name: 'New blog' }).click()
  page.getByLabel('Author: ').fill(author)
  page.getByLabel('Url: ').fill(url)
  page.getByLabel('Title: ').fill(title)
  //sometimes data gets on the wrong property! Title is required, so populate this last
  //await page.pause()
  await page.getByRole('button', { name: 'save' }).click()
  //waitFor, to make sure the created not rendered, and avoid unexpected behaviours
  //OBS if save fails, the blog (title) will not be displayed - timeout. Hadde vært bra å kunne sjekke om save feiler og if..
  await page.getByText(title, { exact: false }).waitFor() 
  /* when running all tests, one test may fail: locator.waitFor: Test timeout of 30000ms exceeded. - waiting for getByText('Existing blog') to be visible
running the test separately ok, and running all tests again gets the same error on another test
bruker ikke tid på det!
  */
}

// click view button to show details
const showBlogDetails = async (page, text, clickView) => {
  const blogText = await page.getByText(text, { exact: false })
  const blogElement = await blogText.locator('..')
  if (clickView) {
    await blogElement.getByRole('button', { name: 'view' }).click()
  }
  return blogElement
}

//click blog's view and like button 
const addLike = async (page, text, clickView) => {

  const blogElement = await showBlogDetails(page, text, clickView)
  await blogElement.getByRole('button', { name: 'like' }).click()  
}

export { loginWith, logout, createBlog, showBlogDetails, addLike }