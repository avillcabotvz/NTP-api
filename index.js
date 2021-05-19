const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const getQueries = require('./get')
const createQueries = require('./create')
const deleteQueries = require('./delete')
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
  response.json({ info: 'NTP Projekt REST API' })
})

app.get('/tasks', getQueries.getTasks)
app.post('/tasks', createQueries.createTasks)
app.delete('/tasks/:id', deleteQueries.deleteTask)


app.get('/categories', getQueries.getCategories)
app.post('/categories', createQueries.createCategory)

app.get('/status', getQueries.getStatus)
app.post('/status', createQueries.createStatus)

app.get('/person', getQueries.getPerson)
app.post('/person', createQueries.createPerson)



app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})