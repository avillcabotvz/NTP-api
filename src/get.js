const pool = require('./dbConnection');

const getTasks = (request, response) => {
  pool.query('SELECT tasks.id,taskname,taskdesc,startdate,enddate,categoryid,statusid,personid,status.status,categories.category,person.firstname,person.lastname FROM tasks INNER JOIN status ON statusid=status.id INNER JOIN categories ON categoryid=categories.id INNER JOIN person ON personid=person.id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
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
  getTasks,
  getCategories,
  getStatus,
  getPerson,
}