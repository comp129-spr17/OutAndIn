'use strict';
/**
 *  Apollo
 *  @description: Users route handlers
 *  @author: Out-N-In Team
 *  @license: MIT
 */

var express = require('express');
var router = express.Router();
var chatsService = require('../services/chats');
var usersService = require('../services/users');
var responseObject = require('./controller').responseObject;
var uuid = require('uuid/v4');
var Promise = require('bluebird');

// Routes permitted per route
var _OPTIONS = {
	"/": {
		"METHODS": [
			"GET",
			"POST"
		],
		"HASHES": new Set()
	},
	"/:chatID/users": {
		"METHODS": [
			"POST"
		],
		"HASHES": new Set()
	},
	"/byUser": {
		"METHODS": [
			"GET"
		],
		"HASHES": new Set()
	},
	"/messages": {
		"METHODS": [
			"GET",
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
 * GET - ["/"]
 * @description: Get all chats a user is a member of
 * @param: {none} 
 * @return: {array} chatID's - Collection of chats with their details
 */
router.get('/', function(req, res){
	var userID = req.user;
	chatsService.getChatsForUser(userID).then((chats) => {
		if(chats.length == 0){
			var error = {
				"code": 1000,
				"message": "User is not a part of any chats"
			};
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			res.status(401).json(response.toJSON());
			return false;
		}
		var promises = [];
		for(var chat in chats){
			var chatID = chats[chat]["uuid"];
			promises.push(chatsService.getUsersFromChat(chatID));
		}
		var returnChats = new Promise((resolve, reject) => {
			resolve(chats);	
		});
		promises.push(returnChats);
		return Promise.all(promises);
	}).then((results) => {
		if(results == false){
			return false;
		}
		// Store the chats from previous promise
		var chats = results[results.length-1];
		// Remove the chats from the users results
		results.pop();
		// Put users into chat objects
		for(var i in chats){
			chats[i]["users"] = [];
			chats[i]["users"].push(results[i]);
		}
		let response = new responseObject();
		response.setSuccess(true);
		response.setResults(chats);
		res.status(200).json(response.toJSON());
	}).catch((err) => {
		var error = {
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
 * POST - ["/"]
 * @description: Create chat
 * @param: {none}
 * @return: {string} chatID - UUID of the chat
 */
router.post('/', function(req, res){
	var userID = req.user;
	var chatID = uuid();
	var friendID = req.body.friendID;
	// TODO:(mcervco) check to make sure the friendID is passed in and validate it
	// Also check to make sure they are friends in the first place
	// Check if chat already exists between the two users
	Promise.all([
		chatsService.getLimitedChatsForUser(userID),
		chatsService.getLimitedChatsForUser(friendID)
	]).then((chats) => {
		// Check for undefined inputs <<<<<<<<<
		var userChats = chats[0];
		var friendChats = chats[1];
		var chatExists = false;
		for(var uchat in userChats){
			for(var	fchat in friendChats){
				// Need to add check to make sure the chat isnt a group chat
				if(userChats[uchat]["uuid"] == friendChats[fchat]["uuid"]){
					chatExists = true;
				}
			}
		}
		// Chat already exists
		if(chatExists){
			// Error
			var error = {
				"code": 1000,
				"message": "Chat already exists between the users"
			};
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			res.status(401).json(response.toJSON());
			return false;
		}
		// Create the chat
		return chatsService.createChat(userID, chatID);
	}).then((chat) => {
		if(chat == false){
			return false;
		}
		if(!chat.hasOwnProperty("affectedRows")){
			// TODO:(mcervco) Handle this error better
			throw new Error("Was not able to create chat");	
			return false;
		}
		return Promise.all([
			chatsService.addUserToChat(userID, chatID),
			chatsService.addUserToChat(friendID, chatID)
		]);
	}).then((results) => {
		if(results == false){
			return false;
		}
		// Couldnt add user to chat
		if(!results[0].hasOwnProperty("affectedRows") && !results[1].hasOwnProperty("affectedRows")){
			// TODO:(mcervco) Handle this error better
			throw new Error("Was not able to create chat");	
			return false;
		}
		return chatsService.setChatStatus(chatID);
	}).then((results) => {
		if(results == false){
			return;
		}
		// Create response object
		let response = new responseObject();
		// Set attributes
		response.setSuccess(true);
		// Send response
		res.status(200).json(response.toJSON());
	}).catch((err) => {
		// Error
		var error = {
			"code": 1000,
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
 * GET - ["/:chatID"]
 * @description: Get chat details
 * @param: {none}
 * @return: {string} chatID - UUID of the chat
 */
router.get('/:chatID', function(req, res){
	// TODO:(mcervco) Check whether the user is a part of the chat
	// Don't want users to just get chat info about any chat
	var uuid = req.params.chatID;
	var userID = req.user;
	chatsService.getLimitedChatsForUser(userID).then((chats) => {
		if(chats.length == 0){
			// Error
			var error = {
				"code": 1000,
				"message": "User is not a part of this chat"
			};
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			res.status(401).json(response.toJSON());
			return false;
		}
		var chatMember = false;
		var index = 0;
		// Check if user if a part of the chat
		for(var chat in chats){
			if(uuid == chats[chat]["uuid"]){
				chatMember = true;
				index = chat;
			}
		}
		// User is not
		if(!chatMember){
			// Error
			var error = {
				"code": 1000,
				"message": "User is not a part of this chat"
			};
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			res.status(401).json(response.toJSON());
			return false;

		}
		let response = new responseObject();
		response.setSuccess(true);
		response.setResults(chats[index]);
		res.status(200).json(response.toJSON());
	}).catch((err) => {
		// Error
		var error = {
			"code": 1000,
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
 * POST - ["/:chatID/users"]
 * @description: Add user to chat
 * @param: {none}
 * @return: {string} chatID - UUID of the chat
 */
router.post("/:chatID/users", function(req,res){
	var chatID = req.params.chatID;
	var userID = req.body.userID;
	chatsService.getUserFromChat(chatID, userID).then((user) => {
		if(user.length != 0){
			// Error
			var error = {
				"code": 1000,
				"message": "User already exists in the chat"
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
		return chatsService.addUserToChat(chatID, userID);
	}).then((chat) => {
		// Handle previously completed promises
		if(chat == false){
			return false;
		}
		return usersService.getSocketID(userID);
	}).then((socketID) => {
		// Handle previously completed promises
		if(socketID == false){
			return false;
		}
		if(!res.io.sockets.connected[sock[0].socket]){
			// Error
			var error = {
				"code": 1000,
				"message": "User socket does not exists"
			};
			// Create response object
			let response = new responseObject();
			// Set attributes
			response.setSuccess(false);
			response.setErrors(error);
			// Send response
			res.status(401).json(response.toJSON());
			return;
		}
		res.io.sockets.connected[sock[0].socket].emit('chatsListUpdate', {});
		// Create response object
		let response = new responseObject();
		// Set attributes
		response.setSuccess(false);
		// Send response
		res.status(200).json(response.toJSON());
	}).catch((err) => {
		// Error
		var error = {
			"code": 1000,
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
 * OPTIONS - ["/:chatID/users"]
 * @description: Responds to authorized headers and methods request
 * @param: {none}
 * @return: {string} http headers - Authorized headers and methods
 */
router.options('/:chatID/users', function(req, res){
	var origin = req.get('Origin');
	// Check if origin is set
	if(!origin){
		res.sendStatus(404);
		return;
	}
	// Check if method that is requested is in the methods hash set
	var method = req.get('Access-Control-Request-Method');
	if(_OPTIONS["/:chatID/users"]["HASHES"].has(method)){

		res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
		res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
		res.header("Access-Control-Max-Age", 86400);
		res.sendStatus(200);
		return;
	}
	// Send 404 if both of the above conditions are not met
	res.sendStatus(404);
});

//get messages for one chat
/*
input:
{
	chatID: #
},
output:
{
	messages: []
}
*/
router.get('/:chatID/messages/:id', function(req, res){
	console.log('Getting: ' + req.params.id);
	chatsService.chatsGetMessagesForChat(req.params.id).then((msg) =>{
		if(msg.length == 0){
			//no messages found
			res.json({
				header:{
					code: 2,
					message: 'No messages for chat'
				},
				body:{
					messages: msg
				}
			});
		}else{
			//fine
			res.json({
				header:{
					code: 0,
					message: 'success'
				},
				body:{
					messages: msg
				}
			});
		}
	}).catch((err) =>{
		res.json({
			header:{
				code: 1,
				message: 'ERROR: sql cannot get messages from chat'
			},
			body:{
				err : err
			}
		});
	});
});

//add message to chat
/*
input:
{
	chatID: #,
	userID: #,
	messageText: ''
}
*/
router.post('/:chatID/messages', function(req, res){
	console.log(JSON.stringify(req.body));
	chatsService.chatsAddMessageToChat(req.body.chatID,req.body.userID,req.body.messageText).then((msg) => {
		//emit event to all users in chat
		chatsService.chatsGetUsersForChat(req.body.chatID).then((users)=>{
			//collect all users
			for(var i in users){
				usersService.getSocketID(users[i].uuid).then((socket)=>{
					//send socket event
					if(res.io.connected[socket[0].socket]){
						res.io.connected[socket[0].socket].emit('messageAdd', {});
					}else{
						console.log("ERR: no such socket - " + JSON.stringify(socket));
					}
				}).catch((err)=>{
					res.json({
						header:{
							code: 3,
							message: 'ERROR: sql'
						},
						body: {
							err:err
						}
					});
				});
			}
		}).catch((err) =>{
			res.json({
				header:{
					code: 2,
					message: 'ERROR: sql cannot get chats for user'
				},
				body: {
					err:err
				}
			});
		});

		res.json({
			header:{
				code: 0,
				message: 'success'
			},
			body:{}
		});
	}).catch((err) =>{
		res.json({
			header:{
				code: 1,
				message: 'ERROR: sql cannot add message to chat '
			},
			body:{
				err : err
			}
		});
	});
});


router.options('/:chatID/messages', function(req, res){
	var origin = req.get('Origin');
	// Check if origin is set
	if(!origin){
		console.log('no origin');
		res.sendStatus(404);
		return;
	}
	// Check if method that is requested is in the methods hash set
	var method = req.get('Access-Control-Request-Method');
	if(_OPTIONS["/messages"]["HASHES"].has(method)){

		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
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
