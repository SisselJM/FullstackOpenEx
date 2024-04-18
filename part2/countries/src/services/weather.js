import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const APIKEY = 'donotcommit'

const getByCity = (city) => {
    const request = axios.get(baseUrl + `?q=${city}&APPID=${APIKEY}`)
    return request.then(response => response.data)    
  }
  
  const getLondon = () => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${APIKEY}`)
    return request.then(response => response.data)
  }

export default { getLondon, getByCity }