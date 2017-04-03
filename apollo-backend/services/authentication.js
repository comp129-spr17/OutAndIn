var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var secret = "super-secret";
var salt = bcrypt.genSaltSync(10);

exports.generateToken = function(uuid){
	var payload = {
		exp: Math.floor(new Date()/1000) + (24*60*60),
		iat: Math.floor(new Date()/1000),
		sub: uuid[0]
	};
	return jwt.sign(payload, secret);
};

exports.hashPassword = function(password){
	return bcrypt.hashSync(password, salt);	
};
