var responseObject = require('../../controllers/controller').responseObject;
var sessionService = require('../../services/sessions');
var jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
	// Ignore these paths
	if(req.path == "/api/v1/session" || req.path == "/api/v1/register" || req.method == "OPTIONS"){
		next();
		return;
	}
	// Get token from Authorization header
	var token = req.headers["authorization"];
    if (!token){
		// Token does not exist. User must login or register
		// Error
		var error = {
			"code": 1000,
			"message": "User is not authenticated"
		};
		var response = new responseObject();
		response.setSuccess(false);
		response.setErrors(error);
		return res.status(401).json(response.toJSON());
	}
    // Parse token
    token = token.replace('Bearer ', '');
    // Verify the token
	jwt.verify(token, "super-secret", function(err, user){
		if(err){
			// Error
			var error = {
				"code": 1000,
				"message": "Token is invalid"
			};
			var response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			return res.status(401).json(response.toJSON());
		}
		var sessionToken = user["sid"];  
		sessionService.getSessionToken(sessionToken).then((user_id) => {
			if(user_id.length == 0){
				// Error
				var error = {
					"code": 1000,
					"message": "User is not authenticated"
				};
				var response = new responseObject();
				response.setSuccess(false);
				response.setErrors(error);
				return res.status(401).json(response.toJSON());
			}
			req.user = user["uid"];
			next();
		}).catch((err) => {
			var error = {
				"code": 1000,
				"message": "Authentication failed"
			};
			var response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			res.status(500).json(response.toJSON());
		});	
    });
};
