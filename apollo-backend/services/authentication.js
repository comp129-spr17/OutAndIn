var jwt = require('jsonwebtoken');
var secret = "super-secret";

exports.generateToken = function(uuid){
	var payload = {
		exp: Math.floor(new Date()/1000) + (24*60*60),
		iat: Math.floor(new Date()/1000),
		sub: uuid[0]
	};
	return jwt.sign(payload, secret);
};

