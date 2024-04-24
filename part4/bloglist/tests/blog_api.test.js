const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially some items saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    let blog = new Blog(helper.initialBlogs[0])
    await blog.save()
    blog = new Blog(helper.initialBlogs[1])
    await blog.save()
  })

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

  test('get with a valid id', async () => {
    const itemsAtStart = await helper.blogsInDb()

    const item = itemsAtStart[0]

    const resultItem = await api
      .get(`/api/blogs/${item.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultItem.body, item)
  })

  describe('addition of a new note', () => {
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

      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

      assert(title.includes('My second blog'))
    })

    //4.11
    test('likes default to 0, creator is set', async () => {
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

      //console.log('body: ', response.body)

      const likes = response.body.likes
      assert.strictEqual(likes, 0)
      const creator = response.body.creator
      //console.log('creator: ', creator)
      assert(creator !== undefined && creator !== '')
    })
  })

  //4.12
  describe('missing request data, returns 400 Bad request', () => {
    test('Title is missing', async () => {

      await api
        .post('/api/blogs')
        .send({
          author: "Newbie Blogger",
          url: "http://my.blog.no/2"
        })
        .expect(400)
    }),
    test('Url is missing', async () => {

      await api
        .post('/api/blogs')
        .send({
          title: "The blog",
          author: "Newbie Blogger"
        })
        .expect(400)
    })
    
  })

  //4.9
  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body[0]) //
    const id = response.body.map(r => r.id)[0]
    assert.notStrictEqual(id, undefined)

    await api
      .get(`/api/blogs/${id}`)
      .expect(200)
      
  })

  //4.14
  describe('Update a blog', () => {
    test('Add 1 like', async () => {
      const itemsAtStart = await helper.blogsInDb()

      const item = itemsAtStart[0]
      item.likes += 1

      const resultItem = await api
        .put(`/api/blogs/${item.id}`)
        .send(item)
        .expect(200)

      //console.log('resultItem: ', resultItem)
      assert.deepStrictEqual(resultItem.body, item)
    })

    test('Change properties', async () => {
      const itemsAtStart = await helper.blogsInDb()

      const item = itemsAtStart[1]
      item.title = 'Changed title'
      item.author = 'Changed author'
      item.url = 'Changed url'

      const resultItem = await api
        .put(`/api/blogs/${item.id}`)
        .send(item)
        .expect(200)

      assert.deepStrictEqual(resultItem.body, item)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const itemsAtStart = await helper.blogsInDb()
      const itemToDelete = itemsAtStart[0]

      await api
        .delete(`/api/blogs/${itemToDelete.id}`)
        .expect(204)

      const itemsAtEnd = await helper.blogsInDb()

      assert.strictEqual(itemsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = itemsAtEnd.map(r => r.title)
      assert(!titles.includes(itemToDelete.title))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})