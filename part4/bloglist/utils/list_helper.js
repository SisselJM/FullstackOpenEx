const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    if (!blogs) {
        return 0
    }
    let sum = 0
    blogs.map((b) => {
        sum += b.likes
    })
    return sum 
}

const favoriteBlog = (blogs) => {
    if (!blogs) {
        return null
    }
    let result = { likes: 0 }
    blogs.map((b) => {
        if (b.likes > result.likes) {
            result = b
        }
    })
    return result 
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}