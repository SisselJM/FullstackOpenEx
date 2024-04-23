const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  describe('create users', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
      console.log('Done')
    })

    test('create with too short password fails', async () => {
      await api
        .post('/api/users')
        .send({
          username: 'mikajo',
          name: 'Mika Johnsen',
          password: 'sa',
        })
        .expect(400)
    })

    test('create without username fails', async () => {
        await api
        .post('/api/users')
        .send({
          name: 'Mika Johnsen',
          password: 'salainen',
        })
        .expect(400)
    })
    
  })

  describe('retrieve users', () => {
    test('users are returned as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('get users', async () => {
      const response = await api
        .get('/api/users')
        .expect(200)
        
      //console.log('users: ', response.body.length)
      assert.strictEqual(response.body.length, 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})