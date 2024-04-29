const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('creator', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const item = await Blog.findById(request.params.id)
  if (item) {
    response.json(item)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  //4.19 The user identified by the token is designated as the creator of the blog.
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user

  const blog = new Blog(request.body)
  if (!blog.title || !blog.url) {
    response.status(400).end()
    return
  }
  blog.creator = user._id
  if (!blog.likes) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
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
  //exercise 5.8 return creator info after update
  const item = await Blog.findById(request.params.id)
    .populate('creator', { username: 1, name: 1 })
  response.status(200).json(item)
})

blogsRouter.delete('/:id', async (request, response) => {
  //4.21 can be deleted only by the user who added it
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const userId = request.user._id
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if (!blog) {
    return response.status(400).json({ error: 'invalid blog' })
  }
  if (blog.creator && blog.creator.toString() !== userId.toString()) {
    //console.log('creator', blog.creator.toString())
    //console.log('user: ', userId.toString())
    return response.status(400).json({ error: 'only its creator can delete a blog' })
  }
  await Blog.findByIdAndDelete(blogId)
  response.status(204).end()
})

module.exports = blogsRouter