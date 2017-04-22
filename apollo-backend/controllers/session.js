'use strict';
/**
 *  Apollo
 *  @description: Session route handlers
 *  @author: Out-N-In Team
 *  @license: MIT
 */

var express = require('express');
var router = express.Router();
var usersService = require('../services/users');
var authService = require('../services/authentication');
var sessionService = require('../services/sessions');
var responseObject = require('./controller').responseObject;
var jwt = require('jsonwebtoken');

// Routes permitted per route
var _OPTIONS = {
	// Default Users Route
	"/": {
		"METHODS": [
			"GET",
			"POST",
			"DELETE"
		],
		"HASHES": new Set()
	}
};

/**
 * Init
 * @constructor
 * @description: Initialize OPTIONS methods for each route
 * @param: {none}
 * @return: {none}
 */
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
/**
 * GET - ["/"]
 * @description: Create an authenticated session for a user
 * @param: {none}
 * @return: {string} token - JSON Web Token
 */

router.get('/', function(req, res){
	var token = req.headers["authorization"];
	token = token.replace('Bearer ', '');
	jwt.verify(token, "super-secret", function(err, user){
		if(err){
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors({
				code: 1000,
				message: "Token is invalid"
			});
			res.status(401).json(response.toJSON());
			return;
		}
		sessionService.getUserIDBySessionToken(user["sid"]).then((results) => {
			console.log(JSON.stringify(results));
			if(results.length == 0){
				let response = new responseObject();
				response.setSuccess(false);
				response.setErrors({
					code: 1000,
					message: "User is not authenticated"
				});
				res.status(401).json(response.toJSON());
				return;
			}
			let response = new responseObject();
			response.setSuccess(true);
			response.setResults({
				code: 1000,
				message: "User is authenticated"
			});
			res.status(200).json(response.toJSON());
		}).catch((err) => {
			let response = new responseObject();
			response.setSuccess(false);
			response.setResults({
				code: 1000,
				message: "System error"
			});
			res.status(500).json(response.toJSON());
		});
	});
});

/**
 * POST - ["/"]
 * @description: Create an authenticated session for a user
 * @param: {none}
 * @return: {string} token - JSON Web Token
 */
router.post('/', function(req, res){
	// Store body values
	var requestPayload = {
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
		var error = {
			"code": 1000,
			"message": []
		};
		let response = new responseObject();
		response.setSuccess(false);
		// Create response object and append errors
		for(var i = 0;i < emptyCount;i++){
			let err = {
				"message": emptyValues[i] + " must be supplied",
				"property_name": emptyValues[i]
			};
			error["message"].push(err);
		}
		response.setErrors(error);
		return res.status(400).json(response.toJSON());
	}
	// Check if user exists
	usersService.getFullUserByUsername(requestPayload["username"]).then((user) => {
		if(user.length == 0){
			let error = {
				"code": 1000,
				"message": "Username or Password is invalid"
			};
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			res.status(400).json(response.toJSON());
			return false;
		}
		var user = user[0];
		// Check if passwords match
		if(!authService.comparePasswordAndHash(requestPayload["password"], user["password"])){
			let error = {
				"code": 1000,
				"message": "Username or Password is invalid"
			};
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			res.status(400).json(response.toJSON());
			return false;
		}
		// Generate session token
		var sessionToken = authService.generateSessionToken();
		// Return token to 'then' by resolving it in a promise
		var tokenPromise = new Promise((resolve, reject) => {
			resolve(sessionToken);
		});
		// Return user UUID
		var uuidPromise = new Promise((resolve, reject) => {
			resolve(user["uuid"]);
		});
		// Store session token in the database with the corresponding user id
		return Promise.all([sessionService.storeSessionToken(user["uuid"], sessionToken), tokenPromise, uuidPromise]);
	}).then((values) => {
		// Handle previously completed promises
		if(values == false){
			return;
		}
		// Session token from previous promise
		var sessionToken = values[1];
		var uuid = values[2];
		var token = authService.generateJWT(uuid, sessionToken);
		let response = new responseObject();
		response.setSuccess(true);
		response.setResults({token: token});
		res.status(200).json(response.toJSON());
	}).catch((err) => {
		// Error
		let error = {
			"code": 1000,
			"message": "System error"
		};
		let response = new responseObject();
		response.setSuccess(false);
		response.setErrors(error);
		res.status(500).json(response.toJSON());
	});
});

/**
 * DELETE - ["/"]
 * @description: Delete an authenticated session for a user
 * @param: {none}
 * @return: {none} 
 */
router.delete('/', function(req, res){
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
			// TODO:(mcervco) Look at the error codes and create errors based on it
			// General error is fine for now
			var error = {
				"code": 1000,
				"message": "User log out failed"
			};
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			res.status(401).json(response.toJSON());
			return false;
		}
		var sessionToken = user["sid"];  
		sessionService.getSessionToken(sessionToken).then((user_id) => {
			if(user_id.length == 0){
				// Error
				var error = {
					"code": 1000,
					"message": "User log out failed"
				};
				let response = new responseObject();
				response.setSuccess(false);
				response.setErrors(error);
				res.status(401).json(response.toJSON());
				return false;
			}
			var uuid = user["uid"];
			// Delete the session token
			return sessionService.deleteSessionToken(uuid, sessionToken);
		}).then((result) => {
			if(result == false){
				return;
			}
			let response = new responseObject();
			response.setSuccess(true);
			res.status(200).json(response.toJSON());
		}).catch((err) => {
			var error = {
				"code": 1000,
				"message": "User log out failed"
			};
			var response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			res.status(500).json(response.toJSON());
		});	
    });
});

/**
 * OPTIONS - ["/"]
 * @description: Responds to authorized headers and methods request
 * @param: {none}
 * @return: {string} http headers - Authorized headers and methods
 */
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
		res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
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
