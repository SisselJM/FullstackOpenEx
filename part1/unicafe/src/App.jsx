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
    <StatisticLine text="Good" value={props.good} />
    <StatisticLine text="Neutral" value={props.neutral} />
    <StatisticLine text="Bad" value={props.bad} />
    <StatisticLine text="All" value={props.all} />
    <StatisticLine text="Averge" value={props.average} />
    <StatisticLine text="Positive" value={props.positive} />
  </div>
  )
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

// handles the functionality of each feedback submission button
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
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
        <Button handleClick={() => handleGoodClick()} text="good" />
        <Button handleClick={() => handleNeutralClick()} text="neutral" />
        <Button handleClick={() => handleBadClick()} text="bad" />
      </p>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={calculateAverage()} positive={calculatePositiveFeedback()} />
    </div>
  )
}

export default App
