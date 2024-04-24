const Blog = require('../models/blog')
const User = require('../models/user')
const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

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
/*
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
*/
module.exports = {
  initialBlogs, blogsInDb, usersInDb, initialNotes, nonExistingId, notesInDb
}