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
			"GET",
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
	},
	"/messages/:id": {
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
		console.log("Chats for " + userID);
		console.log(chats);
		if(chats.length == 0){
			var error = {
				"code": 1000,
				"message": "User is not a part of any chats"
			};
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors(error);
			res.status(200).json(response.toJSON());
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

		//set default titles
		console.log("chats");
		console.log(JSON.stringify(chats));
		for(var i in chats){
			console.log("0");
			if(!(chats[i].name)){
				console.log("1");
				chats[i].name = "";
				for(var u in chats[i].users[0]){
					console.log("2");
					if(chats[i].users[0][u].uuid != userID)
						chats[i].name += chats[i].users[0][u].username + ",";
				}
				console.log("3: " + chats[i].name);
				//remove comma
				chats[i].name = chats[i].name.substring(0, chats[i].name.length - 1);
				console.log("4: " + chats[i].name);
			}
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
	var users = req.body.users;
	if(users){
		if(users.length == 0)
		{
			// Error
		var error = {
			"code": 2000,
			"message": "No users"
		};
		// Create response object
		let response = new responseObject();
		// Set attributes
		response.setSuccess(false);
		response.setErrors(error);
		// Send response
		res.status(500).json(response.toJSON());
			
		}
	}else{
		// Error
		var error = {
			"code": 3000,
			"message": "no users"
		};
		// Create response object
		let response = new responseObject();
		// Set attributes
		response.setSuccess(false);
		response.setErrors(error);
		// Send response
		res.status(500).json(response.toJSON());
		
	}

	//make chat
	chatsService.createChat(userID,chatID).then((chat) => {
		//make chat status
		return chatsService.setChatStatus(chatID);
	}).then((s) =>{
		//Add users to chat
		var prom = [];
		for(var i in users){
			console.log("Adding: " + users[i] + " - " + chatID);
			prom.push(chatsService.addUserToChat(users[i], chatID));
		}
		console.log("Adding - u: " + userID + " - " + chatID);
		prom.push(chatsService.addUserToChat(userID, chatID));

		return Promise.all(prom);
	}).then((u) => {
		//get sockets
		var prom = [];
		for(var i in users){
			prom.push(usersService.getSocketID(users[i]));
		}
		prom.push(usersService.getSocketID(userID));

		console.log("5");
		return Promise.all(prom);
	}).then((socks) => {
		for(var i in socks){
			if(res.socketIO.sockets.connected[socks[i][0].socket]){
				res.socketIO.sockets.connected[socks[i][0].socket].emit('chatAdded', {});
			}else{
				console.log("Socket not connected: " + socks[i][0].socket);
			}
		}
		let response = new responseObject();
		response.setSuccess(true);
		response.setResults({
			chatID: chatID
		});
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

/*
 *	GET - ["/:chatID/users"]
 *	@description: get users in a chat
 *	@param: {none}
 *	@return {array: object} Users
 * */
router.get("/:chatID/users", function(req,res){
	var chatID = req.params.chatID;
	var userID = req.user;

	chatsService.getUsersFromChat(chatID).then((chatUsers) => {
		if(chatUsers.length == 0){
			//no chat found
			let response = new responseObject();
			response.setSuccess(false);
			response.setErrors({
				code: 2000,
				message: "No chat found",
				chatID: chatID
			});
			res.status(401).json(response.toJSON());
			return false;
		}

		var proms = [];
		for(var i in chatUsers){
			if(chatUsers[i].uuid != userID){
				proms.push(usersService.getUserByUUID(chatUsers[i].uuid));
			}
		}
		return Promise.all(proms);
	}).then((users) => {
		if(!users){
			return;
		}
		let response = new responseObject();
		response.setSuccess(true);
		response.setResults(users);
		res.status(200).json(response.toJSON());
	}).catch((err) => {
		let response = new responseObject();
		response.setSuccess(false);
		response.setErrors({
			code: 1000,
			message: "Request Err",
			chatID: chatID
		});
		res.status(500).json(response.toJSON());
	});
});

/**
 * POST - ["/:chatID/users"]
 * @description: Add users to chat
 * @param: {none}
 * @return: {string} chatID - UUID of the chat
 */
router.post("/:chatID/users", function(req,res){
	var chatID = req.params.chatID;
	var userID = req.user;
	var usersToAdd = req.body.users;
	var userInChat = [];		//arr of bools

	var Promises = [];
	chatsService.getChatByUUID(chatID).then((chat) => {
		console.log('-3');
		if(chat.length == 0){
			console.log('no chat');
			// no chat
			var response = new responseObject();
			response.setSuccess(false);
			response.setError({
				code: 2000,
				message: 'no chat found',
				chatID: chatID
			});
			res.status(401).json(response.JSON());
			return false;
		}
		
		Promises = [];
		console.log("users");
		console.log(JSON.stringify(usersToAdd));
		for(var u in usersToAdd){
			Promises.push(chatsService.getUsersFromChat(chatID, usersToAdd[u]));
		}
		console.log('-2');
		return Promise.all(Promises);
	}).then((user) => {
		console.log('-1');
		if(!user){
			return;
		}

		console.log("0");
		//check if user is in chat
		for(var u in user){
			//0 if not in chat
			console.log(JSON.stringify(user[u]));
			userInChat[u] = user[u].length;
		}
		console.log("1");
		//add users to chat
		Promises = [];
		for(var u in usersToAdd){
			if(userInChat[u]){
				Promises.push(chatsService.addUserToChat(usersToAdd[u], chatID));
			}
		}
		console.log("2");
		return Promise.all(Promises);
		/*if(user.length != 0){
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
		return chatsService.addUserToChat(chatID, userID);*/
	}).then((added) => {
		//get all users in chat
		console.log("3");
		return chatsService.chatsGetUsersForChat(chatID);
	}).then((chatUsers) => {
		//get socket ids for users
		console.log("4");
		console.log(JSON.stringify(chatUsers));
		Promises = [];
		for(var c in chatUsers){
			Promises.push(usersService.getSocketID(chatUsers[c].user_id));
		}
		console.log("5");
		return Promise.all(Promises);
	}).then((sock) => {
		console.log("6");
		console.log("SOCK");
		console.log(sock);
		for(var i in sock){
			if(res.socketIO.sockets.connected[sock[i][0].socket]){
				console.log("EMIT: " + JSON.stringify(sock[i][0].socket));
				res.socketIO.sockets.connected[sock[i][0].socket].emit("chatAdded", chatID);
			}else{
				console.log("Socket not connected: " + sock[i][0].socket);
			}
		}
		console.log("7");
		
		var response = new responseObject();
		response.setSuccess(true);
		res.status(200).json(response.toJSON());
	
		/*// Handle previously completed promises
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
		// Create response object
		let response = new responseObject();
		// Set attributes
		response.setSuccess(false);
		// Send response
		res.status(200).json(response.toJSON());*/
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
router.get('/messages/:id', function(req, res){
	console.log('Getting: ' + req.params.id);
	chatsService.chatsGetMessagesForChat(req.params.id).then((msg) =>{
		//fine
		//TODO: check if user is part of chat
		var response = new responseObject();
		response.setSuccess(true);
		response.setResults(msg);
		res.status(200).json(response.toJSON());
	}).catch((err) =>{
		var response = new responseObject();
		response.setSuccess(false);
		response.setErrors({
			code: 1,
			err: err,
			message: "internal sql error"
		});
		res.status(500).json(response.toJSON());
	});
});

//add message to chat
/*
input:
{
	chatID: #,
	messageText: ''
}
*/
router.post('/messages/:id', function(req, res){
	console.log('message add');
	console.log(JSON.stringify(req.body));
	var userID = req.user;
	var chatID = req.params.id;
	var msg = req.body.messageText;

	chatsService.chatsAddMessageToChat(chatID, userID, msg).then((m) => {
		
		//get users for chat
		return chatsService.chatsGetUsersForChat(chatID);
	
	}).then((chatUsers) =>{

		//get socket ids
		var promises = [];
		for(var i in chatUsers){
			promises.push(usersService.getSocketID(chatUsers[i].user_id));
		}
		return Promise.all(promises);

	}).then((sock) => {
		console.log("SOCK");
		console.log(sock);
		for(var i in sock){
			if(res.socketIO.sockets.connected[sock[i][0].socket]){
				console.log("EMIT: " + JSON.stringify(sock[i][0].socket));
				res.socketIO.sockets.connected[sock[i][0].socket].emit("messageAdded", chatID);
			}else{
				console.log("Socket not connected: " + sock[i][0].socket);
			}
		}
		
		var response = new responseObject();
		response.setSuccess(true);
		res.status(200).json(response.toJSON());
	
	}).catch((err) => {
		var response = new responseObject();
		response.setSuccess(false);
		response.setErrors({
			code: 1,
			err: err,
			message: "internal sql error"
		});
		res.status(500).json(response.toJSON());	
	});
});

router.options('/messages', function(req, res){
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

router.options('/messages/:id', function(req, res){
	var origin = req.get('Origin');
	// Check if origin is set
	if(!origin){
		console.log('no origin');
		res.sendStatus(404);
		return;
	}
	// Check if method that is requested is in the methods hash set
	var method = req.get('Access-Control-Request-Method');
	if(_OPTIONS["/messages/:id"]["HASHES"].has(method)){

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
