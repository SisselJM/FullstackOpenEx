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

//5.14
test('The blogs URL and number of likes are Visible after Click', async () => {
  const blog = {
    title: 'This blog',
    author: 'Michael Blog',
    url: 'www.blog.com',
    likes: 5
  }
  
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} toggleVisibility={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  //console.log('button: ', button)
  await user.click(button)

  const div = container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('display: none')
})

//5.15
test('Click twice: the event handler the component received as props is called twice', async () => {
  const blog = {
    title: 'This blog',
    author: 'Michael Blog',
    url: 'www.blog.com',
    likes: 5
  }
  
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} toggleVisibility={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const div = container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('display: none')

  const buttonHide = screen.getByText('hide')
  await user.click(buttonHide)
  const divHidden = container.querySelector('.togglableContent')
  expect(divHidden).toHaveStyle('display: none')
})
