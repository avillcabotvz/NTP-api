const pool = require('./dbConnection');

const getTasks = async (search = null) => {
  let params = [];
  let where = '';
  if (search) {
    const searchStr = search.trim();
    params = [`%${searchStr}%`];
    where = 'WHERE taskname ILIKE $1 OR status.status ILIKE $1 OR categories.category ILIKE $1';
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

  const { rows } = await pool.query(sql, params);
  return rows;
}

module.exports = { getTasks };