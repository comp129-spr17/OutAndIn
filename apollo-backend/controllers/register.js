'use-strict'

/**
 *  @(Project): Apollo Backend
 *  @(Filename): register.js
 *  @(Description): Register route handlers
 *  @(Authors): Out-N-In Team
 *  @(License): MIT
 */

var express = require('express');
var router = express.Router();
var usersService = require('../services/users');
var ResponsePayload = require('./controller');

// OPTIONS - Routes permitted per route
var _OPTIONS = {
	// Default Users Route
	"/": {
		"METHODS": [
			"POST"
		],
		"HASHES": new Set()
	}
};

function init(){
	// Initialize the OPTIONS methods for each route
	// Add all routes into the set
	var keys = Object.keys(_OPTIONS);
	keys.forEach(function(key){
		var methods = _OPTIONS[key]["METHODS"];
		methods.forEach(function(method){
			_OPTIONS[key]["HASHES"].add(method);
		});
	});
}

router.post('/', function(req, res){
	// Store body values
	var requestPayload = {
		email: req.body.email,
		fullname: req.body.fullname,
		username: req.body.username,
		password: req.body.password
	};
	// Check if values are empty
	var emptyValues = [];
	var emptyCount = 0;
	var keys = Object.keys(requestPayload);
	for(var key in keys){
		if(requestPayload[keys[key]] == "" || typeof requestPayload[keys[key]] == 'undefined'){
			emptyValues.push(keys[key]);
			emptyCount = emptyCount + 1;
		}
	}
	// There are values that are either blank or undefined
	if(emptyCount > 0){
		let response = new ResponsePayload();
		response.setStatus("error");
		response.setCount(emptyCount);
		response.setType("error");
		// Create response object and append errors
		for(var i = 0;i < emptyCount;i++){
			var result = {
				"code": "notNull",
				"message": null,
				"objectName": "register",
				"propertyName": null
			};
			result["message"] = emptyValues[i] + " must be supplied";
			result["propertyName"] = emptyValues[i];
			response.pushResult(result);	
		}
		res.status(400).json(response.getResponse());
		return;
	}
	// Check if both the username and email exists
	Promise.all([
		usersService.getUserByUsername(req.body.username),
		usersService.getUserByEmail(req.body.email)
	]).then((values) => {
		var response = new ResponsePayload();
		// Store results from each service function
		var userUsernameExists = values[0];
		var userEmailExists = values[1];
		// Both the username and email already exists
		if(userUsernameExists.length > 0 && userEmailExists > 0){
			response.setStatus("error");
			response.setCount(2);
			response.setType("error");
			response.pushResult({
				"code": "invalidArgument",
				"message": "Username already exists",
				"objectName": "register",
				"propertyName": "username"
			}, {
				"code": "invalidArgument",
				"message": "Email already exists",
				"objectName": "register",
				"propertyName": "email"
			});
			res.status(400).json(response.getResponse());
			return;
		}
		// Username already exists
		if(userUsernameExists.length > 0){
			response.setStatus("error");
			response.setCount(1);
			response.setType("error");
			response.pushResult({
				"code": "invalidArgument",
				"message": "Username already exists",
				"objectName": "register",
				"propertyName": "username"
			});
			res.status(400).json(response.getResponse());
			return;	
		}
		// Email already exists
		if(userEmailExists.length > 0){
			response.setStatus("error");
			response.setCount(1);
			response.setType("error");
			response.pushResult({
				"code": "invalidArgument",
				"message": "Email already exists",
				"objectName": "register",
				"propertyName": "email"
			});
			res.status(400).json(response.getResponse());
			return;	
		}
		// Create user and return a token
		res.sendStatus(200);
	}).catch((err) => {
		// Internal server error
		res.sendStatus(500);
	});
});

router.options('/', function(req, res){
	var origin = req.get('Origin');
	// Check if origin is set
	if(!origin){
		res.sendStatus(404);		
		return;
	}
	// Check if method that is requested is in the methods hash set
	var method = req.get('Access-Control-Request-Method');
	if(_OPTIONS["/"]["HASHES"].has(method)){
		res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
		res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
		res.header("Access-Control-Max-Age", 86400);
		res.sendStatus(200);
		return;
	}
	// Send 404 if both of the above conditions are not met
	res.sendStatus(404);
});

module.exports = {
	init: init,
	router: router
};

