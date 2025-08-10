const mariadb = require('mariadb');

export const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '1302',
  database: 'zappy',
  port: 3306,
  connectionLimit: 5,
});

export async function getConnection() {
  return pool.getConnection();
}
