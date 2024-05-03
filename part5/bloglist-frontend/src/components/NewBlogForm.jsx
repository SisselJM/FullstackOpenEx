import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({})

  const addBlog = (event) => {
    event.preventDefault()
    //console.log('Add')
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({ title: '', author: '', url: ''})
  }

  const handleBlogChange = async (event) => {
    //console.log('Change...', event.target.value)
    setNewBlog({ title: event.target.value, author: newBlog.author, url: newBlog.url })
  }

  const handleAuthorChange = async (event) => {
    setNewBlog({ author: event.target.value, title: newBlog.title, url: newBlog.url })
  }

  const handleUrlChange = async (event) => {
    setNewBlog({ url: event.target.value, title: newBlog.title, author: newBlog.author })
  }

  return (
    <form onSubmit={addBlog}>
      Title: <input value={newBlog.title} onChange={handleBlogChange} id='input-title' /><br />
      Author: <input value={newBlog.author} onChange={handleAuthorChange} id='input-author' /><br />
      Url: <input value={newBlog.url} onChange={handleUrlChange} id='input-url' /><br />
      <button type="submit">save</button>
    </form>  
  )
}

export default NewBlogForm