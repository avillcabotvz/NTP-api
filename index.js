const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const getQueries = require('./get')
const createQueries = require('./create')
const deleteQueries = require('./delete')
const port = 2000
const fs = require('fs')
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./ssl/localhost.key', 'utf8');
var certificate = fs.readFileSync('./ssl/localhost.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};


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
  response.json({ info: 'NTP Projekt REST API' })
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

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);