import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mytasks',
  waitForConnections: true,
  connectionLimit: 10,
});
