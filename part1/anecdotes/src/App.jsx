import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(anecdotes.map(() => 0))
  //console.log(points)

  const [top, setTop] = useState(0)

  const getRandom = () => {
    const max = anecdotes.length
    return Math.floor(Math.random()*max)
  }

  const getRandomAnecdote = () => {
    var value = getRandom()
    //console.log(value)
    if (value === selected) {
      value = getRandom()
      //console.log('Again', value)
    }
    setSelected(value)
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    // get index of top
    const topIndex = copy.indexOf(Math.max(...copy))
    //console.log(topIndex)
    setTop(topIndex)
  }

  

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <p>
        <button onClick={vote}>Vote</button>
        <button onClick={getRandomAnecdote}>Next anecdote</button>
      </p>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[top]}</p>
      <p>has {points[top]} votes</p>
    </div>
  )
}

export default App