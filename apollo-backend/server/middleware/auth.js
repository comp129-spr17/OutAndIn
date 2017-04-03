var jwt = require('jsonwebtoken');
var ResponsePayload = require('../../controllers/controller');

module.exports = function(req, res, next) {
    // Get token from Authorization header
	var token = req.headers["authorization"];
    if (!token){
        // Token does not exist. User must login or register
		var response = new ResponsePayload();
		response.setStatus(401);
		response.setCount(1);
		response.setType("authorization");
		response.pushResult({
			"code": "InsufficientPermissions",
			"message": "User is not authenticated",
			"objectName": "authentication"
		});
		return res.status(401).json(response.getResponse());
	}

    // Parse token
    token = token.replace('Bearer ', '');
    // Verify the token
	jwt.verify(token, "super-secret", function(err, user){
		if(err){
			var response = new ResponsePayload();
			response.setStatus(401);
			response.setCount(1);
			response.setType("authorization");
			response.pushResult({
				"code": "InsufficientPermissions",
				"message": "Token is invalid",
				"objectName": "authentication"
			});
			return res.status(401).json(response.getResponse());
        } else {
            req.user = user;
            next();
        }
    });
};
