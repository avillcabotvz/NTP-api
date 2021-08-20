const pool = require('./dbConnection');

const getTasks = (request, response) => {
  let params = [];
  let where = '';
  if (request.query.search) {
    const searchStr = request.query.search.trim();
    params = [`%${searchStr}%`];
    where = 'WHERE taskname ILIKE $1';
  }

  const sql = `
    SELECT tasks.id,
      taskname,
      taskdesc,
      startdate,
      enddate,
      categoryid,
      statusid,
      personid,
      status.status,
      categories.category,
      person.firstname,
      person.lastname
    FROM tasks
      INNER JOIN status ON statusid = status.id
      INNER JOIN categories ON categoryid = categories.id
      INNER JOIN person ON personid = person.id
    ${where}`;

  pool.query(sql, params).then((results) => {
    response.status(200).json(results.rows)
  });
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