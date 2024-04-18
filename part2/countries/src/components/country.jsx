import { useEffect, useState } from 'react'
import weatherService from './../services/weather'

function Country(props) {
    const [weatherData, setWeatherData] = useState({ temperature: 0.0 });
    //console.log(props)
    const country = props.country
    const capital = country.capital[0]
    let weather = { temperature: 0.0 }
    
    useEffect(() => {
      const capital = 'London,uk'
      //weatherService.getByCity(capital)
      weatherService.getLondon()
      .then(result => {
        console.log(result)
        const weather = {
          temperature: result.main.temp
        }
        setWeatherData(weather)
        console.log(weatherData)
        //TODO refresh eller state
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
      <p>Temperature {weather.temperature}</p>
      <p>Image TODO</p>
      <p>Wind TODO</p>
      </>
    )
  }

  export default Country