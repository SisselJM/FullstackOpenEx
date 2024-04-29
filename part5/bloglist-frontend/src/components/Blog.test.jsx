import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This blog'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('This blog')
  expect(element).toBeDefined()
})