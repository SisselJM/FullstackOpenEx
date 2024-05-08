const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'log in' }).click()
  await page.getByRole('textbox').first().fill(username)
  await page.getByRole('textbox').last().fill(password)
  await page.getByRole('button', { name: 'login' }).click()
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
  //OBS if save fails, the blog (title) will not be displayed - timeout
  await page.getByText(title, { exact: false }).waitFor()
}

export { loginWith, createBlog }