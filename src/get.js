const pool = require('./dbConnection');
const { getTasks } = require('./tasks');

const listTasks = (request, response) => {
  getTasks(request.query.search).then((tasks) => {
    response.status(200).json(tasks);
  })
}

const getCategories = (request, response) => {
  pool.query('SELECT * FROM categories', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getStatus = (request, response) => {
  pool.query('SELECT * FROM status', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPerson = (request, response) => {
  pool.query('SELECT * FROM person', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  listTasks,
  getCategories,
  getStatus,
  getPerson,
}