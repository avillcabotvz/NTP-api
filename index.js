const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const getQueries = require('./get')
const createQueries = require('./create')
const deleteQueries = require('./delete')
const port = 2000

var cors = require('cors')
const { checkAuth, handleLogin } = require('./auth')

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

app.get('/tasks', checkAuth, getQueries.getTasks)
app.post('/tasks', checkAuth, createQueries.createTasks)
app.delete('/tasks/:id', checkAuth, deleteQueries.deleteTask)


app.get('/categories', checkAuth, getQueries.getCategories)
app.post('/categories', checkAuth, createQueries.createCategory)

app.get('/status', checkAuth, getQueries.getStatus)
app.post('/status', checkAuth, createQueries.createStatus)

app.get('/person', checkAuth, getQueries.getPerson)
app.post('/person', checkAuth, createQueries.createPerson)

app.post('/login', handleLogin);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})