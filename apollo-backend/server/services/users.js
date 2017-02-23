// Import Database
var db = require('../modules/database');
var Promise = require('bluebird');

exports.getAllUsers = function(){
    var sql = "SELECT * FROM user";
    return db.pool.query(sql);
};
