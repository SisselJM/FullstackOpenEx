import { useState } from 'react'

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
  <div>
    <h1>Statistics</h1>
    <p>Good {props.good}</p>
    <p>Neutral {props.neutral}</p>
    <p>Bad {props.bad}</p>
    <p>All {props.all}</p>
    <p>Averge {props.average}</p>
    <p>Positive {props.positive} %</p>
  </div>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={calculateAverage()} positive={calculatePositiveFeedback()} />
    </div>
  )
}

export default App
