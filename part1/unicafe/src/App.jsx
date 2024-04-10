import { useState } from 'react'

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  const calculateAverage = () => {
    if (all === 0) {
      return 0 
    }
    return (good - bad) / all
  }

  const calculatePositiveFeedback = () => {
    if (all === 0) {
      return 0 
    }
    return 100 * (good / all)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <p>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </p>
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {all}</p>
      <p>Averge {calculateAverage()}</p>
      <p>Positive {calculatePositiveFeedback()} %</p>
    </div>
  )
}

export default App
