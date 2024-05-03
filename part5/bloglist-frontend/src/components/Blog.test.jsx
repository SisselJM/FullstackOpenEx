import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect } from 'vitest'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This blog',
    author: 'Michael Blog',
    url: 'www.blog.com',
    likes: 5
  }

  const { container } = render(<Blog blog={blog} />)
  
  const header = container.querySelector('.header')
  expect(header).not.toHaveStyle('display: none')
  //does not render its URL or number of likes by default
  const div = container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})

/* 5.14 checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked
test('Click', async () => {
  const blog = {
    title: 'This blog',
    author: 'Michael Blog',
    url: 'www.blog.com',
    likes: 5
  }
  
  const mockHandler = vi.fn()

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  //expect(mockHandler.mock.calls).toHaveLength(1)
})
toggleVisibility={mockHandler}, men den er intern i Blog
*/