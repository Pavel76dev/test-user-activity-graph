import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import connection from './connection.js';
import { TABLE } from './constants/index.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/users', (req, res) => {
	connection.query(`SELECT * FROM ${TABLE}`, function (err, result, fields) {
		if (err) {
			console.log('[SELECT ERROR] - ', err.message);
			res.json({ err: true, msg: 'select fail' });
			return;
		}
		res.json({ err: false, users: result });
	});
});

app.delete('/users/:id', (req, res) => {
	const { id } = req.params;
	connection.query(`DELETE FROM ${TABLE} WHERE id = ${id}`, function (err, result, fields) {
		if (err) {
			console.log('[DELETE ERROR] - ', err.message);
			res.json({ err: true, msg: 'delete fail' });
			return;
		}
		res.json({ err: false });
	});
});

app.post('/users', (req, res) => {
	console.log(req.body);
	req.body.usersAdd.forEach(element => {
		if (req.body.usersIds.includes(element.id)) {
			var sql = `UPDATE ${TABLE} set date_registration =? , date_last_activity =?  WHERE id = ?`;
			const addSqlParams = [new Date(element.dateRegistration), new Date(element.dateLastActivity), element.id];
			connection.query(sql, addSqlParams, function (err, result) {
				if (err) {
					console.log('[UPDATE ERROR] - ', err.message);
					res.json({ err: true, msg: 'update fail' });
					return;
				}
			});
		} else {
			const sql = `INSERT INTO ${TABLE} (date_registration, date_last_activity) VALUES (?,?)`;
			const addSqlParams = [new Date(element.dateRegistration), new Date(element.dateLastActivity)];
			connection.query(sql, addSqlParams, function (err, result) {
				if (err) {
					console.log('[INSERT ERROR] - ', err.message);
					res.json({ err: true, msg: 'insert fail' });
					return;
				}
			});
		}
	});
});

app.listen(port, () => {
	console.log(`Server listening on the port::${port}`);
});
