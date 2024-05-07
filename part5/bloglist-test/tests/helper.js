const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'log in' }).click()
  await page.getByRole('textbox').first().fill(username)
  await page.getByRole('textbox').last().fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async ( page, title, author, url ) => {
  //await page.pause() //sjekk om blog liste vises
  await page.getByRole('button', { name: 'New blog' }).click()
  page.getByLabel('Title: ').fill(title)
  //await page.pause()
  page.getByLabel('Author: ').fill(author)
  page.getByLabel('Url: ').fill(url)
  //await page.pause()
  await page.getByRole('button', { name: 'save' }).click()
  //await page.pause()
  //timeout 
  //await page.getByText(title, { exact: false }).waitFor()
  //notes: await page.getByText(content).waitFor()
  /* når jeg hadde fjernet Blog.Delete:
  //await page.getByText('Blog created', { exact: false }).waitFor()
  Error: locator.waitFor: Error: strict mode violation: getByText('Blog created') resolved to 2 elements:
    1) <div class="header">…</div> aka getByText('a blog created by playwright')
    2) <div class="header">…</div> aka getByText('another blog created by')
  */
}

export { loginWith, createBlog }