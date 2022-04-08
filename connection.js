import mysql from 'mysql2';
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from './constants/index.js';

let pool;
pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    // dateStrings: true
    multipleStatements: true,
});

pool.on('connect', () => {
    console.log(`Connected to database '${pool.config.database}'.`);
});

pool.on('error', err => {
    console.log('Connection error: ', err);
});

export default pool;