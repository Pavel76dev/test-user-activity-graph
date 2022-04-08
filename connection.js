import mysql from 'mysql2';
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from './constants/index.js';

let connection;
connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    // dateStrings: true
    multipleStatements: true,
});

connection.on('connect', () => {
    console.log(`Connected to database '${connection.config.database}'.`);
});

connection.on('error', err => {
    console.log('Connection error: ', err);
});

connection.connect();

export default connection;