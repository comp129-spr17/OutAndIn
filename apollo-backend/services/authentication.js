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

/**
 * GenerateSessionToken
 * @description: Generate a session token
 * @param: {none}
 * @return: {string} token - Session token
 */
exports.generateSessionToken = function(){
	var sha = crypto.createHash('sha256');
	sha.update(Math.random().toString());
	return sha.digest('hex');
};

/**
 * GenerateJWT
 * @description: Generate JSON Web Token
 * @param: {string} uuid - UUID of the user
 * @return: {string} jwt - Signed JSON Web Token
 */
exports.generateJWT = function(uuid){
	var payload = {
		exp: Math.floor(new Date()/1000) + (24*60*60),
		iat: Math.floor(new Date()/1000),
		sub: uuid[0]
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
	return bcrypt.hashSync(password, 10);	
};

/**
 * ComparePasswordAndHash
 * @description: Compare the password and the Bcrypt hash of the password
 * @param: {string} username - Password of the user and the hashed version of the password
 * @return: {boolean} status - Whether the password and the hash match
 */
exports.comparePasswordAndHash = function(password, hash){
	return bcrypt.compareSync(password, hash);
};

