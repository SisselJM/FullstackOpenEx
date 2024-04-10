import { useState } from 'react'

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <p>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button>neutral</button>
        <button>bad</button>
      </p>
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {good+neutral+bad}</p>
      <p>Averge {good}</p>
      <p>Positive {good}</p>
    </div>
  )
}

export default App
