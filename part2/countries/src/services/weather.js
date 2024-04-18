import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const APIKEY = process.env.MONGODB_URI

const getByCity = (city) => {
    const request = axios.get(baseUrl + `?q=${city}&units=metric&APPID=${APIKEY}`)
    return request.then(response => response.data)    
  }
  
export default { getByCity }