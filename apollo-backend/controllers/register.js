'use strict';
/**
 *  Apollo
 *  @description: Register route handlers
 *  @author: Out-N-In Team
 *  @license: MIT
 */

var express = require('express');
var router = express.Router();
var usersService = require('../services/users');
var responseObject = require('./controller').responseObject;
var authService = require('../services/authentication');
var sessionService = require('../services/sessions');
var validator = require('validator');

// Routes permitted per route
var _OPTIONS = {
	"/": {
		"METHODS": [
			"POST"
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
 * POST - ["/"]
 * @description: Register a new user
 * @param: {string} email - Email of the user
 * @param: {string} fullname - Full Name of the user
 * @param: {string} username - Username of the user
 * @param: {string} password - Password of the user
 * @return: {string} token - JSON Web Token
 */
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
	// Check if values are the correct types
	var typeValues = [];
	var typeCount = 0;
	var keys = Object.keys(requestPayload);
	for(var key in keys){
		if(requestPayload[keys[key]] == "" || typeof requestPayload[keys[key]] == 'undefined' || requestPayload[keys[key]] == null){
			emptyValues.push(keys[key]);
			emptyCount = emptyCount + 1;
		}
		if(Array.isArray(requestPayload[keys[key]]) || typeof requestPayload[keys[key]] == 'object'){
			typeValues.push(keys[key]);
			typeCount = typeCount + 1;
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
		return res.status(200).json(response.toJSON());
	}
	// There are values that are either an array or an object
	if(typeCount > 0){
		var error = {
			"code": 1000,
			"message": []
		};
		let response = new responseObject();
		response.setSuccess(false);
		// Create response object and append errors
		for(var i = 0;i < typeCount;i++){
			let err = {
				"message": typeValues[i] + " is not a valid inputs",
				"property_name": typeValues[i]
			};
			error["message"].push(err);
		}
		response.setErrors(error);
		return res.status(200).json(response.toJSON());
	}
	// Valid input errors
	var inputErrors = {
		"code": 1000,
		"message": []
	};
	// Check if inputs are valid
	// Check for valid email
	if(!validator.isEmail(requestPayload["email"])){
		let error = {
			"message": "Email is not valid",
			"property_name": "email"
		};
		inputErrors["message"].push(error);
	}
	// Check for valid username
	// Regex to test for valid username
	var reg = /^@?(\w){1,15}$/;
	if(!reg.test(requestPayload["username"])){
		let error = {
			"message": "Username is not valid",
			"property_name": "username"
		};
		inputErrors["message"].push(error);
	}
	// Check for valid name
	if(!validator.isLength(requestPayload["fullname"], {min: 1, max: 64})){
		let error = {
			"message": "Full Name is not valid",
			"property_name": "fullname"
		};
		inputErrors["message"].push(error);
	}
	// Check for valid name
	if(!validator.isLength(requestPayload["password"], {min: 6, max: 64})){
		let error = {
			"message": "Password is not valid",
			"property_name": "password"
		};
		inputErrors["message"].push(error);
	}
	// There are values that are either an array or an object
	if(inputErrors["message"].length > 0){
		var error = {
			"code": 1000,
			"message": []
		};
		let response = new responseObject();
		response.setSuccess(false);
		response.setErrors(inputErrors);
		return res.status(200).json(response.toJSON());
	}
	// Check if both the username and email exists
	Promise.all([
		usersService.getUserByUsername(req.body.username),
		usersService.getUserByEmail(req.body.email)
	]).then((values) => {
		// Store results from each service function
		var userUsernameExists = values[0];
		var userEmailExists = values[1];
		// Both the username and email already exists
		if(userUsernameExists.length > 0 && userEmailExists.length > 0){
			// Error
			let errors = {
				"code": 1000,
				"message": [{
					"message": "Username already exists",
					"property_name": "username"
				},{
					"message": "Email already exists",
					"property_name": "email"
				}]
			};	
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors(errors);	
			res.status(200).json(response.toJSON());
			return false;
		}
		// Username already exists
		if(userUsernameExists.length > 0){
			// Error
			let error = {
				"code": 1000,
				"message": [{
					"message": "Username already exists",
					"property_name": "username"
				}]
			};
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			res.status(200).json(response.toJSON());
			return false;
		}
		// Email already exists
		if(userEmailExists.length > 0){
			// Error
			let error = {
				"code": 1000,
				"message": [{
					"message": "Email already exists",
					"property_name": "email"
				}]
			};
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			res.status(200).json(response.toJSON());
			return false;
		}
		// Create user
		// Hash the password before storing
		var hashedPassword = authService.hashPassword(requestPayload.password);
		return usersService.createUser(requestPayload.email, requestPayload.username, requestPayload.fullname, hashedPassword);
	}).then((user) => {
		// Handle previously finished requests and return
		if(user == false){
			return false;
		}
		// Get UUID for newly created user
		return usersService.getUUIDByUsername(requestPayload["username"]);
	}).then((uuid) => {
		// Handle previously completed promises
		if(uuid == false){
			return false;
		}
		// Generate session token
		var sessionToken = authService.generateSessionToken();
		// Return token to 'then' by resolving it in a promise
		var tokenPromise = new Promise((resolve, reject) => {
			resolve(sessionToken);
		});
		var uuid = uuid[0]["uuid"];
		// Return user uuid
		var uuidPromise = new Promise((resolve, reject) => {
			resolve(uuid);	
		});
		// Store session token in the database with the corresponding user id
		return Promise.all([sessionService.storeSessionToken(uuid, sessionToken), tokenPromise, uuidPromise]);
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
		var error = {
			"code": 1000,
			"message": "Registration failed"
		};
		let response = new responseObject();
		response.setSuccess(false);
		response.setErrors(error);
		res.status(500).json(response.toJSON());
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
