// Import Database
var db = require('../modules/database');
var uuid = require('uuid/v1');

exports.usersGetAll = function(){
    var sql = "SELECT * FROM users";
    return db.pool.query(sql);
};

exports.usersGetUserByUsername = function(username){
    var sql = "SELECT * FROM users WHERE username = ?";
    return db.pool.query(sql, [username]);
};

exports.usersCreateUser = function(username, password){
	var u = uuid();
    var sql = "INSERT INTO users VALUES ('', ?, '', '', ?, ?, '')";
    return db.pool.query(sql, [u, username,password]);
};

exports.usersGetUserByUsername = function(username){
    var sql = "SELECT id FROM users WHERE username = ?";
    return db.pool.query(sql, [username]);
};
