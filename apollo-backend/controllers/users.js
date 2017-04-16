'use strict';
/**
 *  Apollo
 *  @description: Users route handlers
 *  @author: Out-N-In Team
 *  @license: MIT
 */

var express = require('express');
var router = express.Router();
var usersService = require('../services/users');
var chatsService = require('../services/chats');
var responseObject = require('./controller').responseObject;

// Routes permitted per route
var _OPTIONS = {
	"/": {
		"METHODS": [
			"GET",
			"POST"
		],
		"HASHES": new Set()
	},
	"/:uuid": {
		"METHODS": [
			"GET"
		],
		"HASHES": new Set()
	},
	"/me": {
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
	usersService.getAllUsers().then((users) => {
		// Create response object
		let response = new responseObject();
		// Set attributes
		response.setSuccess(true);
		response.setResults(users);
		// Send response
		res.status(200).json(response.toJSON());
	}).catch((err) => {
		// Error object
		var error = {
			"code": 1000,
			"message": err
		};
		// Create response object
		let response = new responseObject();
		// Set attributes
		response.setSuccess(false);
		response.setErrors(error);
		// Send Response
		res.status(500).json(response.toJSON());
	});
});

/**
 * POST - ["/"]
 * @description: Create user
 * @param: {string} username - Username of the user
 * @return: {object} user - Details of the newly created user
 */
router.post('/', function(req, res){
	var username = req.body.username;
	usersService.getUserByUsername(username).then((users) => {
        // User already exists
		if(users.length != 0){
			// Error
			var error = {
				"code": 1000,
				"message": "User already exists"
			};
			// Create response object
			let response = new responseObject();
			// Set attributes
			response.setSuccess(false);
			response.setErrors(error);
			// Send response
			res.status(401).json(response.toJSON());
            return false;
        }
        // User does not exist, create the user
        return usersService.createUser("", username, "", "");
    }).then((data) => {
        if(data == false){
			// return error, user already exists
            return false;
        }
		return usersService.getUserByUsername(username);
    }).then((user) =>{
		if(user == false) {
            return false;
		}
		// Create response object
		let response = new responseObject();
		// Set attributes
		response.setSuccess(true);
		response.setResults(user);
		// Emit socket event
		res.io.sockets.emit('usersConnected', {});
		// Send response
		res.status(200).json(response.toJSON());
	}).catch((err) => {
		var error = {
			"code": 1000,
			"message": err
		};
		// Create response object
		let response = new responseObject();
		// Set attributes
		response.setSuccess(true);
		response.setErrors(error);
		// Emit socket event
		res.io.sockets.emit('usersConnected', {});
		// Send response
		res.status(500).json(response.toJSON());
    });
});

/**
 * GET - ["/:uuid"]
 * @description: Get user information by UUID
 * @param: {string} uuid - UUID of the user
 * @return: {object} user - Details of the user
 */
router.get('/:uuid', function(req, res){
	var uuid = req.params.uuid;
	usersService.getUserByUUID(uuid).then((user) => {
		// User does not exist
		if(user.length == 0){
			// Error
			var error = {
				"code": 1000,
				"message": "User does not exist"	
			};
			// Create response object
			let response = new responseObject();
			// Set attributes
			response.setSuccess(false);
			response.setErrors(error);
			// Send response
			res.status(200).json(response.toJSON());
			return;
		}
		// Create response object
		let response = new responseObject();
		// Set attributes
		response.setSuccess(true);
		response.setResults(user);
		// Send response
		res.status(200).json(response.toJSON());
	}).catch((err) => {
		// Error
		var error = {
			"code": 2000,
			"message": err
		};
		// Create response object
		let response = new responseObject();
		// Set attributes
		response.setSuccess(false);
		response.setErrors(error);
		// Send response
		res.status(500).json(response.toJSON());
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
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
		res.header("Access-Control-Max-Age", 86400);
		res.sendStatus(200);
		return;
	}
	// Send 404 if both of the above conditions are not met
	res.sendStatus(404);
});

/**
 * OPTIONS - ["/:uuid"]
 * @description: Responds to authorized headers and methods request
 * @param: {none}
 * @return: {string} http headers - Authorized headers and methods
 */
router.options('/:uuid', function(req, res){
	var origin = req.get('Origin');
	// Check if origin is set
	if(!origin){
		res.sendStatus(404);
		return;
	}
	// Check if method that is requested is in the methods hash set
	var method = req.get('Access-Control-Request-Method');
	if(_OPTIONS["/:uuid"]["HASHES"].has(method)){
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
		res.header("Access-Control-Max-Age", 86400);
		res.sendStatus(200);
		return;
	}
	// Send 404 if both of the above conditions are not met
	res.sendStatus(404);
});


/**
 * GET - ["/me"]
 * @description: Get the users own information
 * @param: {none}
 * @return: {object} user - User object
 */
router.get('/me', function(req, res){
	var user = req.user;
	// Get User by UUID
	usersService.getUserByUUID(user).then((user_info) => {
		// Create response object
		let response = new responseObject();
		response.setSuccess(true);
		response.setResults(user_info);
		// Send JSON of the response object
		res.status(200).json(response.toJSON());
	}).catch((err) => {
		var error = {
			"code": 1000,
			"message": err
		};
		// Create response object
		let response = new responseObject();
		// Set attributes
		response.setSuccess(true);
		response.setErrors(error);
		res.status(500).json(response.toJSON());
	});
});

/**
 * OPTIONS - ["/"]
 * @description: Responds to authorized headers and methods request
 * @param: {none}
 * @return: {string} http headers - Authorized headers and methods
 */
router.options('/me', function(req, res){
	var origin = req.get('Origin');
	// Check if origin is set
	if(!origin){
		res.sendStatus(404);
		return;
	}
	// Check if method that is requested is in the methods hash set
	var method = req.get('Access-Control-Request-Method');
	if(_OPTIONS["/me"]["HASHES"].has(method)){

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
