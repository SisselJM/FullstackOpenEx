import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setNotification = (text) => {
    setErrorMessage(text)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //console.log('Wrong credentials')
      setNotification('Wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    //console.log('logging out')
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const addBlog = (event) => {
    event.preventDefault()
    //console.log('Add')
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }
    blogService
      .create(blogObject)
      .then(blog => {
        //console.log('blog created. ', blog)
        setBlogs(blogs.concat(blog))
        setNotification('Blog created')
        setNewBlog({ title: '', author: '', url: ''})
      })
      .catch(error => {
        //console.log('Something went wrong: ', error)
        setNotification('Something went wrong')
      })
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
        <p><Notification message={errorMessage} /></p>
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      <p><Notification message={errorMessage} /></p>

      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

      <Togglable buttonLabel="New blog">
        <NewBlogForm
            handleSubmit={addBlog}
            title={newBlog.title}
            author={newBlog.author}
            url={newBlog.url}
            handleBlogChange={handleBlogChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
            />
      </Togglable>

      <p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </p>
    </div>
  )
}

export default App