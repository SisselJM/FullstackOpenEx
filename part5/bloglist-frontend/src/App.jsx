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
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(blog => {
        //console.log('blog created. ', blog)
        setBlogs(blogs.concat(blog))
        setNotification('Blog created')
      })
      .catch(error => {
        //console.log('Something went wrong: ', error)
        setNotification('Something went wrong')
      })
  }

  const addLike = (blog) => {
    //console.log('Add like', ' likes before: ', blog.likes)

    blog.likes += 1
    blog.creator = blog.creator.id
    //console.log('likes after: ', blog.likes)

    blogService
      .update(blog)
      .then(blogUpdated => {
        //console.log('blog updated. ', blogUpdated)
        setBlogs(blogs.map(b => b.id !== blog.id ? b : blogUpdated))
      })
      .catch(error => {
        //console.log('Something went wrong: ', error)
        setNotification('Something went wrong')
      })
  }

  const deleteBlog = (blog) => {
    const id = blog.id
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
        })
        .catch(error => {
          //console.log('Something went wrong: ', error)
          setNotification('Something went wrong')
        })
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
        <Notification message={errorMessage} />
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />

      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

      <Togglable buttonLabel="New blog">
        <NewBlogForm createBlog={addBlog} />
      </Togglable>

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={() => addLike(blog)} deleteBlog={() => deleteBlog(blog)} user={user} />
        )}
      </div>
    </div>
  )
}

export default App