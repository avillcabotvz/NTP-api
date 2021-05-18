const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 2000

var cors = require('cors')

app.use(cors()) 

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/tasks', db.getTasks)
app.get('/categories', db.getCategories)
app.get('/status', db.getStatus)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})