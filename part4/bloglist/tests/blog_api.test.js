const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 2 blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 2)
})

  const initalBlogs = [
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

beforeEach(async () => {
    await Blog.deleteMany({})
    let blog = new Blog(initalBlogs[0])
    await blog.save()
    blog = new Blog(initalBlogs[1])
    await blog.save()
})

after(async () => {
  await mongoose.connection.close()
})