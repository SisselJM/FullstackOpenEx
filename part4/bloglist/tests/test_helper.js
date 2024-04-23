const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
      title: "My first blog",
      author: "Newbie Blogger",
      url: "http://my.blog.no/1",
      likes: 1
  },
  {
      title: "My 123rd blog",
      author: "Pro Blogger",
      url: "http://pro.blog.no/123",
      likes: 556
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}