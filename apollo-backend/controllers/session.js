'use strict'
/**
 *  @(Project): Apollo Backend
 *  @(Filename): session.js
 *  @(Description): Session route handlers
 *  @(Authors): Out-N-In Team
 *  @(License): MIT
 */

var express = require('express');
var router = express.Router();
var usersService = require('../services/users');
var authService = require('../services/authentication');
var sessionService = require('../services/sessions');
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
	console.log(req.get('Origin'));
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
		let response = new ResponsePayload();
		response.setStatus("error");
		response.setCount(emptyCount);
		response.setType("error");
		// Create response object and append errors
		for(var i = 0;i < emptyCount;i++){
			var result = {
				"code": "notNull",
				"message": null,
				"objectName": "session",
				"propertyName": null
			};
			result["message"] = emptyValues[i] + " must be supplied";
			result["propertyName"] = emptyValues[i];
			response.pushResult(result);
		}
		res.status(400).json(response.getResponse());
		return;
	}
	// check if user exists
	usersService.getUserByUsername(requestPayload["username"]).then((user) => {
		if(user.length == 0){
			let response = new ResponsePayload();
			response.setStatus("error");
			response.setCount(emptyCount);
			response.setType("error");
			response.pushResult({
				"code": "invalidArgument",
				"message": "Username or Password is invalid",
				"objectName": "session"
			});
			res.status(400).json(response.getResponse());
			return false;
		}
		var user = user[0];
		// Check if passwords match
		if(!authService.comparePasswordAndHash(requestPayload["password"], user["password"])){
			let response = new ResponsePayload();
			response.setStatus("error");
			response.setCount(emptyCount);
			response.setType("error");
			response.pushResult({
				"code": "invalidArgument",
				"message": "Username or Password is invalid",
				"objectName": "session"
			});
			res.status(400).json(response.getResponse());
			return false;
		}
		// Generate session token
		var sessionToken = authService.generateSessionToken();
		// Return token to 'then' by resolving it in a promise
		var tokenPromise = new Promise((resolve, reject) => {
			resolve(sessionToken);
		});
		// Store session token in the database with the corresponding user id
		return Promise.all([sessionService.storeSessionToken(user["uuid"], sessionToken), tokenPromise]);
	}).then((values) => {
		// Handle previously completed promises
		if(values == false){
			return;
		}
		// Check if session token was successfully stored
		if(!values[0]["affectedRows"]){
			let response = new ResponsePayload();
			response.setStatus("error");
			response.setCount(emptyCount);
			response.setType("error");
			response.pushResult({
				"code": "SystemError",
				"message": "Unable to login. Try again",
				"objectName": "session"
			});
			res.status(400).json(response.getResponse());
			return;
		}
		// Session token from previous promise
		var sessionToken = values[1];
		let response = new ResponsePayload();
		response.setStatus("success");
		response.setCount(emptyCount);
		response.setType("session");
		//response.pushResult();
		res.cookie('sid', sessionToken, {
			path: '/',
			maxAge: 3600000 * 24 * 30,
			signed: true
		}).status(200).json(response.getResponse());
	}).catch((err) => {
		console.log(err);
		res.status(500).json(err);
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
