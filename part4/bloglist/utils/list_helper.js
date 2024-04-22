const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    if (!hasItems(blogs)) {
        return 0
    }
    let sum = 0
    blogs.map((b) => {
        sum += b.likes
    })
    return sum 
}

const favoriteBlog = (blogs) => {
    if (!hasItems(blogs)) {
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

const mostBlogs = (blogs) => {
    if (!hasItems(blogs)) {
        return null
    }
    const authorCounts = _.countBy(blogs, 'author');
    //console.log(authorCounts)
    const mostOccurredAuthor = _.maxBy(Object.keys(authorCounts), (author) => authorCounts[author]);
    //console.log(mostOccurredAuthor)

    // Find the item with the most occurrences of the same author
    const mostOccurringItems = _.find(blogs, { 'author': mostOccurredAuthor });
    //console.log(mostOccurringItems)
    return { author: mostOccurringItems.author, blogs: authorCounts[mostOccurringItems.author] }
}

const mostLikes = (blogs) => {
    if (!hasItems(blogs)) {
        return null
    }
    const groupedByAuthor = _.groupBy(blogs, 'author');
    console.log(groupedByAuthor) //ok
    const mostLikedItems = _.mapValues(groupedByAuthor, (items) => _.maxBy(items, 'likes'));
    //console.log(mostLikedItems)
    const keys = Object.keys(mostLikedItems)
    //console.log(keys)
    const key = keys[0]
    return {
      author: key,
      likes: mostLikedItems[key].likes
    }
}

const hasItems = (blogs) => {
    if (!blogs || blogs.length == 0) {
        return false
    }
    return true
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}