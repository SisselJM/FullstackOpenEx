import { useState } from 'react'
import countriesService from './services/countries'

function App() {
  const [searchName, setSearchName] = useState('')
  const searchCountries = (event) => {
    //console.log(event.target.value)
    setSearchName(event.target.value)
    countriesService.getAll()
      .then(response => {
        console.log(response)
        //filter event.target.value
      })
      .catch(() => {
        console.log('Something failed!')
      })
  }

  return (
    <>
      <p>
        Find countries <input value={searchName} onChange={searchCountries} />
      </p>
    </>
  )
}

export default App
