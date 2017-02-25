var mysql = require('promise-mysql');
var config = require('../config/config');

var pool = mysql.createPool({
    host: config['APOLLO_MYSQL_IP'],
    user: config['APOLLO_MYSQL_USER'],
    password: config['APOLLO_MYSQL_PASS'],
    port: config['APOLLO_MYSQL_PORT'],
    database: 'apollo',
    connectionLimit: 200,
    supportBigNumbers: true
});

exports.pool = pool;
