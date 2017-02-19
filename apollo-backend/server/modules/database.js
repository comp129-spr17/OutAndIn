var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'username',
    database: 'dbName',
    connectionLimit: 200,
    supportBigNumbers: true,
});

exports.pool = pool;
