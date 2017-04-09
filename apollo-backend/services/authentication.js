/**
 *  Apollo
 *  @description: Authentication services
 *  @author: Out-N-In Team
 *  @license: MIT
 */

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var secret = "super-secret";
var crypto = require('crypto');
var uuid = require('uuid/v4');

/**
 * GenerateSessionToken
 * @description: Generate a session token
 * @param: {none}
 * @return: {string} token - Session token
 */
exports.generateSessionToken = function(){
	// Create a sha384 hash
	var sha = crypto.createHash('sha384');
	// Generate UUID
	var u = uuid();
	// Create hash of the UUID
	sha.update(u);
	// Encode the hash to base64
	return sha.digest('base64');
};

/**
 * GenerateJWT
 * @description: Generate JSON Web Token
 * @param: {string} uuid - UUID of the user
 * @return: {string} jwt - Signed JSON Web Token
 */
exports.generateJWT = function(userID, sessionToken){
	var payload = {
		exp: Math.floor(new Date()/1000) + (24*60*60),
		iat: Math.floor(new Date()/1000),
		iss: "localhost",
		sub: "session",
		sid: sessionToken,
		uid: userID
	};
	return jwt.sign(payload, secret);
};

/**
 * HashPassword
 * @description: Generate a Bcrypt hash of the user's password
 * @param: {string} password - Password of the user
 * @return: {string} hash - Hashed Password
 */
exports.hashPassword = function(password){
	// Create base64 encoded hash of the password
	let hash = crypto.createHash('sha384').update(password, 'utf8').digest('base64');
	return bcrypt.hashSync(hash, 10);
};

/**
 * ComparePasswordAndHash
 * @description: Compare the password and the Bcrypt hash of the password
 * @param: {string} username - Password of the user and the hashed version of the password
 * @return: {boolean} status - Whether the password and the hash match
 */
exports.comparePasswordAndHash = function(password, storedHash){
	// Create base64 encoded hash of the password
	let hash = crypto.createHash('sha384').update(password, 'utf8').digest('base64');
	return bcrypt.compareSync(hash, storedHash);
};

