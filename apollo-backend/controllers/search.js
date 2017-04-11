'use strict';
/**
 *  Apollo
 *  @description: Search route handlers
 *  @author: Out-N-In Team
 *  @license: MIT
 */

var express = require('express');
var router = express.Router();
var usersService = require('../services/users');
var responseObject = require('./controller').responseObject;

// Routes permitted per route
var _OPTIONS = {
	"/": {
		"METHODS": [
			"GET"
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
 * @description: Get all users
 * @param: {none}
 * @return: {object} users - Collection of users
 */
router.get('/', function(req, res){
	var query = req.query.q;
	var userID = req.user;
	// TODO:(mcervco) Only searching for friends right now.
	// Search everything later
	
	// Get all users that match the query to the username
	usersService.getUsersByQuery(query).then((results) => {
		let response = new responseObject();
		response.setSuccess(true);
		response.setResults(results);
		res.status(200).json(response.toJSON());
	}).catch((err) => {
		// Error
		var error = {
			"code": 1000,
			"message": "System error"
		};
		let response = new responseObject();
		response.setSuccess(true);
		response.setErrors(error);
		res.status(200).json(response.toJSON());
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
		res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
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
