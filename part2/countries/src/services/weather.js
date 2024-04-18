import axios, { HttpStatusCode } from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getByCity = (city) => {
    const request = axios.get(baseUrl + `&q=${city}&APPID=c15b5bf32fb3dd03d72f66800ce82301`)
    //return request.then(response => response.data)
    request
      .then(response => {
        console.log(response)
        return response
      })
      .catch(err => {
        console.log(err)
        return HttpStatusCode.InternalServerError
    })
  }
  
  const getLondon = () => {
    const request = axios.get('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c15b5bf32fb3dd03d72f66800ce82301')
    return request.then(response => response.data)
  }

export default { getLondon, getByCity }