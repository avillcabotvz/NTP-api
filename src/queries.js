const pool = require('./dbConnection');

const getTasks = (request, response) => {
  pool.query('SELECT tasks.id,taskname,taskdesc,startdate,enddate,status.status,categories.category,person.firstname,person.lastname FROM tasks INNER JOIN status ON statusid=status.id INNER JOIN categories ON categoryid=categories.id INNER JOIN person ON personid=person.id', (error, results) => {
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

const createTasks = (request, response) => {
  const {taskname,taskdesc,startdate,enddate,categoryid,statusid,personid} = request.body

  pool.query('INSERT INTO tasks(taskname,taskdesc,startdate,enddate,categoryid,statusid,personid) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id', [taskname,taskdesc,startdate,enddate,categoryid,statusid,personid], (error, result) => {
    if (error) {
        throw error
    }

    response.status(201).json({ id: result.rows[0].id });
  });
  
}

module.exports = {
  getTasks,
  getCategories,
  getStatus,
  getPerson,
  createTasks,
}