import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This blog',
    author: 'Michael Blog',
    url: 'www.blog.com',
    likes: 5
  }

  render(<Blog blog={blog} />)

  let element = screen.getByText(blog.title, { exact: false})
  //console.log('title: ', element.style)
  expect(element).toBeDefined()
  let computedStyle = window.getComputedStyle(element);
  expect(computedStyle.display).not.toBe('none');
  element = screen.getByText(blog.author, { exact: false})
  expect(element).toBeDefined()
  //does not render its URL or number of likes by default
  element = screen.getByText(blog.url, { exact: false})
  //console.log('url: ', element.style)
  computedStyle = window.getComputedStyle(element);
  expect(computedStyle.display).toBe('none');
  
  element = screen.getByText('likes', { exact: false})
  //console.log('likes: ', element)
  computedStyle = window.getComputedStyle(element);
  expect(computedStyle.display).toBe('none');
})