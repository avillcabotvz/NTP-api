const Pool = require('pg').Pool;
const config = require('./config');

const defaultConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'ntp_projekt',
  password: 'root',
  port: 5432,
};

const pool = new Pool({
  // Override default settings with values set in config
  ...defaultConfig,
  ...config.database,
});

module.exports = pool;