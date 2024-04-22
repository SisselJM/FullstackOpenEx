const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

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

//4.8
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

//4.9
test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body[0]) //
    const id = response.body.map(r => r.id)[0]
    assert.notStrictEqual(id, undefined)
  })

//4.10
test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "My second blog",
        author: "Newbie Blogger",
        url: "http://my.blog.no/2",
        likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const title = response.body.map(r => r.title)
  
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
  
    assert(title.includes('My second blog'))
})

//4.11
test('likes default to 0', async () => {
    const newBlog = {
        title: "My second blog",
        author: "Newbie Blogger",
        url: "http://my.blog.no/2"
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    console.log('body: ', response.body)
    console.log('likes: ', response.body.likes)
  
    const likes = response.body.likes
    assert.strictEqual(likes, 0)
})

beforeEach(async () => {
    await Blog.deleteMany({})
    let blog = new Blog(initialBlogs[0])
    await blog.save()
    blog = new Blog(initialBlogs[1])
    await blog.save()
})

after(async () => {
  await mongoose.connection.close()
})