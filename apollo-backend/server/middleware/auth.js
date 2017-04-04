var ResponsePayload = require('../../controllers/controller');
var sessionService = require('../../services/sessions');
var util = require('util');
module.exports = function(req, res, next) {
	if(req.path == '/api/v1/register' || req.path == '/api/v1/session'){
		next();
		return;
	}
	// Check if session cookie is present and is signed
	if(!req.signedCookies["sid"]){
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
	var sessionToken = req.signedCookies["sid"];
	sessionService.getUserIDBySessionToken(sessionToken).then((user_id) => {
		if(user_id.length == 0){
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
		req.user = user_id[0]["user_id"];
		next();
	}).catch((err) => {
		var response = new ResponsePayload();
		response.setStatus("error");
		response.setCount(1);
		response.setType("error");
		response.pushResult({
			"code": "SystemError",
			"message": "Authentication failed",
			"objectName": "authentication"
		});
		return res.status(500).json(response.getResponse());
	});		
};
