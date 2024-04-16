//part3 is in another repository: https://github.com/SisselJM/phonebook - C:\Users\sisse\source\repos\React\phonebook
const http = require('http')

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain'})
    response.end('Hello world')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)