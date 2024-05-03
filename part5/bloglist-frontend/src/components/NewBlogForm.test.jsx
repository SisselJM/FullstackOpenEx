import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import NewBlogForm from './NewBlogForm'


//5.16
test('The form calls the event handler it received as props with the right details when a new blog is created.', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  const {container } = render(<NewBlogForm createBlog={mockHandler} />)

  const inputTitle = container.querySelector('#input-title')
  const inputAuthor = container.querySelector('#input-author')
  const inputUrl = container.querySelector('#input-url')
  const sendButton = screen.getByText('save')

  const title = 'The Blog Title'
  const author = 'The Author'
  const url = 'www.blog.com'
  await user.type(inputTitle, title)
  await user.type(inputAuthor, author)
  await user.type(inputUrl, url)
  await user.click(sendButton)

  //console.log(mockHandler.mock.calls)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe(title)
  expect(mockHandler.mock.calls[0][0].author).toBe(author)
  expect(mockHandler.mock.calls[0][0].url).toBe(url)

})
