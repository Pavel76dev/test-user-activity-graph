import express from 'express';
import path from 'path';
import connection from './connection.js';
import { TABLE } from './constants/index.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/users', (req, res) => {
    connection.query(`SELECT * FROM ${TABLE}`, function (err, result, fields) {
    	if(err){
    		console.log('[SELECT ERROR] - ',err.message);
    		res.json({err: true, msg:'select fail'});
    		return;
    	}
    	res.json({err: false, users: result});    
    });
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
