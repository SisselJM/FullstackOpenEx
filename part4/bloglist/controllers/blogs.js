const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('creator', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const note = await Blog.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title || !blog.url) {
    response.status(400).end()
    return
  }
  //4.17 any user from the database is designated as its creator 
  const users = await User.find({})
  if (users && users.length > 0) {
    blog.creator = users[0].id
  }
  if (!blog.likes) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updated)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter