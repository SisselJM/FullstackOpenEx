import { useEffect, useState } from 'react'
import weatherService from './../services/weather'

function Country(props) {
    const [weatherData, setWeatherData] = useState({ temperature: '', icon: '', wind: '' });
    //console.log(props)
    const country = props.country
    const capital = country.capital[0]
    
    useEffect(() => {
      weatherService.getByCity(capital)
      .then(result => {
        console.log(result)
        const icon = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
        const weather = {
          temperature: result.main.temp,
          icon: icon,
          wind: result.wind.speed
        }
        setWeatherData(weather)
        //console.log(weatherData)
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
      <p>Temperature {weatherData.temperature} Celcius</p>
      <img src={weatherData.icon} />
      <p>Wind {weatherData.wind} m/s</p>
      </>
    )
  }

  export default Country