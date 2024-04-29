import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This blog',
    author: 'Michael Blog',
    likes: 5
  }

  render(<Blog blog={blog} />)

  let element = screen.getByText(blog.title, { exact: false})
  expect(element).toBeDefined()
  element = screen.getByText(blog.author, { exact: false})
  expect(element).toBeDefined()
})