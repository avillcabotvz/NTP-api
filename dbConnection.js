const Pool = require('pg').Pool;

// Make a frikin' config file
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ntp_projekt',
  password: 'root',
  port: 5432,
});

// Note we're actually exporting the variable "pool", so all files importing this will get the same pool
// Otherwise we're creating a seperate pool with a bunch of connections in each file using the copy-pasted pool config
module.exports = pool;