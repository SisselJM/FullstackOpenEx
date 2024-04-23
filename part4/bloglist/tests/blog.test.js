const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    //console.log(result)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, equals the sum of likes of all', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 7+5+12+10+2)
  })
  test('when list has no blogs, return 0', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list is null, runs ok', () => {
    const result = listHelper.totalLikes(null)
    assert.strictEqual(result, 0)
  })
})

describe('favorite blog', () => {
  test('when list has only one blog, equals that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('when list has multiple blogs, equals the one with highest likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })

  test('when list has no blogs, runs ok', () => {
    assert.doesNotThrow(() => listHelper.favoriteBlog([]))
  })
  test('when list is null, runs ok', () => {
    assert.doesNotThrow(() => listHelper.favoriteBlog(null))
  })
})

describe('most blogs', () => {
  test('when list has only one blog, equals that', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    //console.log(result)
    assert.strictEqual(result.author, listWithOneBlog[0].author)
    assert.strictEqual(result.blogs, 1)
  })

  test('when list has multiple blogs, equals the one with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    //console.log(result)
    assert.strictEqual(result.author, 'Robert C. Martin')
    assert.strictEqual(result.blogs, 3)
  })

  test('when list has no blogs, runs ok', () => {
    assert.doesNotThrow(() => listHelper.mostBlogs([]))
  })
  test('when list is null, runs ok', () => {
    assert.doesNotThrow(() => listHelper.mostBlogs(null))
  })
})

describe('most likes', () => {
  
  test('when list has only one blog, equals that', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.strictEqual(result.author, listWithOneBlog[0].author)
    assert.strictEqual(result.likes, listWithOneBlog[0].likes)
  })
  
  test('when list has two blogs, equals the one with most likes', () => {
    const listWith2Blogs = [
      {
        author: "Edsger W. Dijkstra",
        likes: 5
      },
      {
        author: "Michael Chan",
        likes: 7
      },
      {
        author: "Michael Chan",
        likes: 6
      }
    ]
    const result = listHelper.mostLikes(listWith2Blogs)
    assert.strictEqual(result.author, listWith2Blogs[1].author)
    assert.strictEqual(result.likes, listWith2Blogs[1].likes + 6)
  })

  test('when list has multiple blogs, equals the one with highest likes', () => {
    const result = listHelper.mostLikes(blogs)
    //console.log(result)
    assert.strictEqual(result.author, 'Edsger W. Dijkstra')
    assert.strictEqual(result.likes, 5+12)
  })

  test('when list has no blogs, runs ok', () => {
    assert.doesNotThrow(() => listHelper.mostLikes([]))
  })

  test('when list is null, runs ok', () => {
    assert.doesNotThrow(() => listHelper.mostLikes(null))
  })
})
