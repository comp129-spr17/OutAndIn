var mysql = require('promise-mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'apollo', // running locally, no security concerns here
    database: 'apollo',
    connectionLimit: 200,
    supportBigNumbers: true
});

exports.pool = pool;
