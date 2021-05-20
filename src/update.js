const pool = require('./dbConnection');

const updateTasks = async (request, response) => {
  const id = parseInt(request.params.id)
  const { taskname, taskdesc, startdate, enddate, statusid, categoryid, personid } = request.body

  await pool.query(
    `UPDATE tasks
     SET
       taskname = $1,
       taskdesc = $2,
       startdate = $3,
       enddate = $4,
       statusid = $5,
       categoryid = $6,
       personid = $7
     WHERE id = $8
    `,
    [taskname, taskdesc, startdate, enddate, statusid, categoryid, personid, id]
  );

  response.status(200).send(`Task modified with ID: ${id}`);
}


module.exports = {
  updateTasks,
}