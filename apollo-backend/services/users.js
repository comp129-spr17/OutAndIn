// Import Database
var db = require('../modules/database');
var Promise = require('bluebird');

exports.usersGetAll = function(){
    var sql = "SELECT * FROM users";
    return db.pool.query(sql);
};

exports.usersCreateUser = function(username){
    var sql = "INSERT INTO users VALUES ('', '', '', '', ?, '', '')";
    return db.pool.query(sql, [username]);
};

exports.usersGetUserByUsername = function(username){
    var sql = "SELECT id FROM users WHERE username = ?";
    return db.pool.query(sql, [username]);
};
