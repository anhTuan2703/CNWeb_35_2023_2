const { createPool } = require('mysql2/promise');

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'cnweb35',
  waitForConnections: true,
  connectionLimit: 10,
});

async function query(sql, values) {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(sql, values);
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error:', error);
  }
}


module.exports = { query };
