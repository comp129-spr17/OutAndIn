'use strict';
/**
 *  Apollo
 *  @description: Files route handlers
 *  @author: Out-N-In Team
 *  @license: MIT
 */

var express = require('express');
var router = express.Router();
var mt = require('mime-types');
var fs = require('fs');
var multer = require('multer');
var responseObject = require('./controller').responseObject;

// Prepare files for uploading
var storage = multer.diskStorage({
	destination: function(req, file, callback){
		var filepath = "uploads" + "/" + req.user;
		if(!fs.existsSync('./' + filepath)){
			fs.mkdirSync("./" + filepath);
		}
		callback(null, filepath);
	},
	filename: function(req, file, callback){
		callback(null, file.originalname);
	}
});

// Upload object
var upload = multer({storage: storage}).single('file');

// Routes permitted per route
var _OPTIONS = {
	// Default Users Route
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
 * @description: Upload a single file
 * @param: {none}
 * @return: {string} token - JSON Web Token
 */
router.post('/', function(req, res){
	upload(req, res, function(err){
		if(err){
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors({
				code: 1000,
				message: "File upload failed"
			});
			res.status(400).send(response.toJSON());
			return;
		}
		let response = new responseObject();
		response.setSuccess(true);
		response.setResults({"message": "File uploaded successfully"});
		res.status(200).send(response.toJSON());
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
