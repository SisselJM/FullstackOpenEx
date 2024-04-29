import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false) //controls if the details are being displayed or not

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{detailsVisible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br />
        likes {blog.likes} <button onClick={addLike}>like</button><br />
        {blog.creator ? blog.creator.name : ''}<br />
        {/* button for deleting a blog post only if the blog post was added by the user */}
        <button onClick={deleteBlog}>Remove</button>
      </div>
   
    </div>
  )
}

export default Blog