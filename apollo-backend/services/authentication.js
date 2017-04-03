var jwt = require('jwt-simple');
var secret = "super-secret";

exports.generateToken = function(uuid){
	var payload = {
		exp: Math.floor(new Date()/1000) + (24*60*60),
		iat: Math.floor(new Date()/1000),
		sub: uuid
	};
	return jwt.encode(payload, secret);
};

