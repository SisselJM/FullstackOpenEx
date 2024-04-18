import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'

const Country = (props) => {
  //console.log(props)
  const country = props.country
  const capital = country.capital[0]
  //let weather = { }
  
  useEffect(() => {
    const capital = 'London,uk'
    //weatherService.getByCity(capital)
    weatherService.getLondon()
    .then(result => {
      console.log(result)
      //weather.temperature = result
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <>
    <h3>{country.name.common}</h3>
    <p>Capital {capital}</p>
    <p>Area {country.area}</p>
    <h4>Languages:</h4>
    <ul>
      {
        Object.values(country.languages).map(c => 
          <li key={c}>{c}</li>
        )
      }
    </ul>
    <img src={country.flags.png} />
    
    <h4>Weather in {capital}</h4>
    <p>Temperature TODO</p>
    <p>Image TODO</p>
    <p>Wind TODO</p>
    </>
  )
}

const CountriesList = (props) => {
  //console.log(props)
  //console.log(props.countries.length)
  if (props.countries.length > 10) {
    return (
      <p>Too many matches, specifiy another filter</p>
    )
  }
  else if (props.countries.length === 0) {
    return (
      <p>No countries found</p>
    )
  }
  return (
    <ul>
      {
        props.countries.map(c =>          
          <li key={c.name.common}>{c.name.common} <button onClick={() => props.onSelect([c])}>Show</button></li>            
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
      {countries.length === 1 ? 
      <Country country={countries[0]} /> :
      <CountriesList countries={countries} onSelect={setCountries} />
    }
    </>
  )
}

export default App
