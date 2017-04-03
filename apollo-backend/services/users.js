// Import Database
var db = require('../modules/database');
var uuid = require('uuid/v1');

exports.getAll = function(){
    var sql = "SELECT * FROM users";
    return db.pool.query(sql);
};

exports.getUserByUsername = function(username){
    var sql = "SELECT * FROM users WHERE username = ?";
    return db.pool.query(sql, [username]);
};

exports.getUserByEmail = function(email){
    var sql = "SELECT * FROM users WHERE email = ?";
	return db.pool.query(sql, [email]);
};

exports.getUserIDList = function(){
	var sql = "SELECT * FROM users";
	return db.pool.query(sql);
};

exports.getUserByUUID = function(uuid){
	var sql = "SELECT * FROM users WHERE uuid = ?";
	return db.pool.query(sql, [uuid]);
};

exports.getUUIDByUsername = function(username){
	var sql = "SELECT uuid FROM users WHERE username = ?";
	return db.pool.query(sql, [username]);
};

exports.createUser = function(email, username, fullname, password){
	var u = uuid();
    var sql = "INSERT INTO users VALUES ('', ?, ?, ?, ?, ?, '', '')";
    return db.pool.query(sql, [u, email, fullname, username, password]);
};

//store socket id
exports.storeSocketID = function(userID, sockID){
	var sql = "UPDATE users SET socket = ? WHERE uuid = ?";
	return db.pool.query(sql, [sockID, userID]);
};

//get socket id
exports.getSocketID = function(userID){
	var sql = 'SELECT socket FROM users WHERE uuid = ?';
	return db.pool.query(sql, [userID]);
};
