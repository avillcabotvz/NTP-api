const pool = require('./dbConnection');

const updateTasks = (request, response) => {
  const id = parseInt(request.params.id)
  const {taskname,taskdesc,startdate,enddate,statusid,categoryid,personid} = request.body

  pool.query(
    'UPDATE tasks SET taskname = $1, taskdesc = $2, startdate = $3, enddate= $4, statusid=$5, categoryid=$5, personid=$7 WHERE id = $8',
    [taskname,taskdesc,startdate,enddate,statusid,categoryid,personid],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}


module.exports = {
  updateTasks,
}