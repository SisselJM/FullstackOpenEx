import { useEffect, useState } from 'react'
import countriesService from './services/countries'

const CountriesList = (props) => {
  //console.log(props)
  //console.log(props.countries.length)
  if (props.countries.length > 10) {
    return (
      <p>Too many matches, specifiy another filter</p>
    )
  }
  else if (props.countries.length === 1) {
    const country = props.countries[0]
    return (
      <>
      <p>{country.name.common}</p>
      </>
    )
  }
  return (
    <ul>
      {
        props.countries.map(c =>          
          <li key={c.name.common}>{c.name.common}</li>            
        )
      }
    </ul>    
  )
}

function App() {
  const [searchName, setSearchName] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
  countriesService.getAll()
    .then(response => {
      //console.log(response)
      setAllCountries(response)
      setCountries(response)
    })
    .catch(() => {
      console.log('Something failed!')
    })
  }, [])

  const searchCountries = (event) => {
    //console.log(event.target.value)
    setSearchName(event.target.value)
    const filteredCountries = allCountries.filter(x => x.name.common.startsWith(event.target.value))
    //console.log(filteredCountries)
    setCountries(filteredCountries)
  }

  return (
    <>
      <p>
        Find countries <input value={searchName} onChange={searchCountries} />
      </p>
      <CountriesList countries={countries} />
    </>
  )
}

export default App
