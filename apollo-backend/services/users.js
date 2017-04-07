/**
 *  Apollo
 *  @description: Users services
 *  @author: Out-N-In Team
 *  @license: MIT
 */

var db = require('../modules/database');
var uuid = require('uuid/v1');

/**
 * GetUserByUsername
 * @description: Get the user by the username
 * @param: {string} username - Username of the user
 * @return: {promise} promise - SQL promise
 */
exports.getUserByUsername = function(username){
    var sql = "SELECT uuid, email, fullname, username, avatar FROM users WHERE username = ?";
    return db.pool.query(sql, [username]);
};

/**
 * GetUserByEmail
 * @description: Get the user by the email
 * @param: {string} email - Email of the user
 * @return: {promise} promise - SQL promise
 */
exports.getUserByEmail = function(email){
    var sql = "SELECT uuid, email, fullname, username, avatar FROM users WHERE email = ?";
	return db.pool.query(sql, [email]);
};

/**
 * GetAllUsers
 * @description: Get all users
 * @param: {none}
 * @return: {promise} promise - SQL promise
 */
exports.getAllUsers = function(){
	var sql = "SELECT uuid, email, fullname, username, avatar FROM users";
	return db.pool.query(sql);
};

/**
 * GetUserByUUID
 * @description: Get the user by their UUID
 * @param: {string} uuid - UUID of the user
 * @return: {promise} promise - SQL promise
 */
exports.getUserByUUID = function(uuid){
	var sql = "SELECT uuid, email, fullname, username, avatar FROM users WHERE uuid = ?";
	return db.pool.query(sql, [uuid]);
};

/**
 * GetUUIDByUsername
 * @description: Get the user's UUID by their username
 * @param: {string} username - Username of the user
 * @return: {promise} promise - SQL promise
 */
exports.getUUIDByUsername = function(username){
	var sql = "SELECT uuid FROM users WHERE username = ?";
	return db.pool.query(sql, [username]);
};

/**
 * GetSocketID
 * @description: Get the socket ID of the user
 * @param: {string} userID - User ID of the user
 * @return: {promise} promise - SQL promise
 */
exports.getSocketID = function(userID){
	var sql = 'SELECT socket FROM users WHERE uuid = ?';
	return db.pool.query(sql, [userID]);
};

/**
 * CreateUser
 * @description: Create a new user
 * @param: {string} email - Email of the user
 * @param: {string} username - Username of the user
 * @param: {string} fullname - Full Name of the user
 * @param: {string} password - Password of the user
 * @return: {promise} promise - SQL promise
 */
exports.createUser = function(email, username, fullname, password){
	var u = uuid();
    var sql = "INSERT INTO users VALUES ('', ?, ?, ?, ?, ?, '', '')";
    return db.pool.query(sql, [u, email, fullname, username, password]);
};

/**
 * DeleteUser
 * @description: Delete a user
 * @param: {string} uuid - UUID of the user
 * @return: {promise} promise - SQL promise
 */
exports.deleteUser = function(uuid){
    var sql = "DELETE FROM users WHERE uuid = ?";
    return db.pool.query(sql, [uuid]);
};

/**
 * StoreSocketID
 * @description: Store socket ID of the user
 * @param: {string} userID - User ID of the user
 * @param: {string} socketID - Socket ID of the user
 * @return: {promise} promise - SQL promise
 */
exports.storeSocketID = function(userID, socketID){
	var sql = "UPDATE users SET socket = ? WHERE uuid = ?";
	return db.pool.query(sql, [socketID, userID]);
};

