import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
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
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(blog => {
        //console.log('blog created. ', blog)
        setBlogs(blogs.concat(blog))
        setNotification('Blog created')
      })
      .catch(() => {
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
      .catch(() => {
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
        .catch(() => {
          //console.log('Something went wrong: ', error)
          setNotification('Something went wrong')
        })
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <h3>Blog app, by Fullstack open</h3>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <NewBlogForm createBlog={addBlog} />
        </Togglable>
        <br />
      </div>
      }

      <div>
        {/* For testing <div>The list {blogs.length}</div> */}
        <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
            <Blog key={blog.id} blog={blog} addLike={() => addLike(blog)} deleteBlog={() => deleteBlog(blog)} user={user} />
          </li>
        )}
        </ul>
      </div>
    </div>
  )
}

export default App