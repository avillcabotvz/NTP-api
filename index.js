const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const getQueries = require('./get')
const createQueries = require('./create')
const deleteQueries = require('./delete')
const http = require('http')
const https = require('https')
const fs = require('fs');
const httpPort = 2000
const httpsPort = 2443

const privateKey  = fs.readFileSync('certs/localhost.key', 'utf8');
const certificate = fs.readFileSync('certs/localhost.crt', 'utf8');

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

const httpServer = http.createServer(app);
const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app);

httpServer.listen(httpPort, () => {
  console.log(`App running on http://localhost:${httpPort}`);
});
httpsServer.listen(httpsPort, () => {
  console.log(`App running on https://localhost:${httpsPort}`);
});
