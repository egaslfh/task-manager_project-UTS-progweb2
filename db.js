const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  user: process.env.PGUSER || 'postgres' ,
  password: process.env.PGPASSWORD || '',
  database: process.env.PGDATABASE || 'db_progweb2' ,
});

module.exports = { pool };
