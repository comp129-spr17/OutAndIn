var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var secret = "super-secret";
var crypto = require('crypto');

exports.generateSessionToken = function(){
	var sha = crypto.createHash('sha256');
	sha.update(Math.random().toString());
	return sha.digest('hex');
};

exports.generateToken = function(uuid){
	var payload = {
		exp: Math.floor(new Date()/1000) + (24*60*60),
		iat: Math.floor(new Date()/1000),
		sub: uuid[0]
	};
	return jwt.sign(payload, secret);
};

exports.hashPassword = function(password){
	return bcrypt.hashSync(password, 10);	
};

exports.comparePasswordAndHash = function(password, hash){
	return bcrypt.compareSync(password, hash);
};
