const pool = require('./dbConnection');
const { broadcast } = require('./udp-server');

const createTasks = (request, response) => {
  const {taskname,taskdesc,startdate,enddate,categoryid,statusid,personid} = request.body

  pool.query('INSERT INTO tasks(taskname,taskdesc,startdate,enddate,categoryid,statusid,personid) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id', [taskname,taskdesc,startdate,enddate,categoryid,statusid,personid], (error, result) => {
    if (error) {
        throw error
    }

    const id = result.rows[0].id;
    response.status(201).json({ id });
    broadcast(`NEWTASK ${id}`);
  });
}

const createStatus = (request, response) => {
  const {status} = request.body

  pool.query('INSERT INTO status(status) VALUES ($1) RETURNING id', [status], (error, result) => {
    if (error) {
        throw error
    }

    response.status(201).json({ id: result.rows[0].id });
  });
}

const createCategory = (request, response) => {
  const {category} = request.body

  pool.query('INSERT INTO categories(category) VALUES ($1) RETURNING id', [category], (error, result) => {
    if (error) {
        throw error
    }

    response.status(201).json({ id: result.rows[0].id });
  });
}

const createPerson= (request, response) => {
  const {firstname,lastname} = request.body

  pool.query('INSERT INTO person(firstname,lastname) VALUES ($1,$2) RETURNING id', [firstname, lastname], (error, result) => {
    if (error) {
        throw error
    }

    response.status(201).json({ id: result.rows[0].id });
  });
}

module.exports = {
  createTasks,
  createStatus,
  createCategory,
  createPerson,

}
