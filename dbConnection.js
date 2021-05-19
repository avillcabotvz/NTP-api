const Pool = require('pg').Pool;


const pool = new Pool({
  user: 'ntp_projekt',
  host: 'localhost',
  database: 'ntp_projekt',
  password: 'root',
  port: 5432,
});

module.exports = pool;