const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.map((b) => {
        sum += b.likes
    })
    return sum 
}

const favoriteBlog = (blogs) => {
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