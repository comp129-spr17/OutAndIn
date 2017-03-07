/**
 *  @(Project): Apollo Backend
 *  @(Filename): messaging.js
 *  @(Description): Messaging route handlers
 *  @(Authors): Out-N-In Team
 *  @(License): MIT
 */
'use strict'
var usersService = require('../services/users');

//Message Handler
//next free id
var LastID =
{
	User: 0,
	Chat: 0,
	Message: 0
};

//Stores data
//TODO: move all data storage to mySQL
var Lists =
{
	User:[],
	Chat:[],
	getUserIds:function()
	{
		return Lists.User;
	},

	getUser: function(id)
	{
		//error checking
		if(typeof id != 'number')
			return {error: 'invalid id'};

		for(var i = 0; i < Lists.User.length; i ++)
			if(Lists.User[i].id == id)
				return {user : Lists.User[i]};

		return {error: 'No user found'};
	},

	getChatIds: function()
	{
		return Lists.Chat;
	},

	getChat: function(id)
	{
		//error checking
		if(typeof id != 'number')
			return {error: 'invalid id'};

		for(var i = 0; i < Lists.Chat.length; i ++)
			if(Lists.Chat[i].id == id)
				return {user : Lists.Chat[i]};

		return {error: 'No chat found'};

	},
	getChatsForUser: function(userId)
	{
		var chats = [];
		for(var c in Lists.Chat)
			for(var u in c.users)
				if(u == userId)
					chats.push(c.id);

		return chats;
	}
};

//constructs data
var Schemas =
{
	User:function(name, socketId){ 			// Create users here
		if(typeof name != 'string')
			name = 'NULL';

		var _self = this;

		this.id = LastID.User ++;
		this.name = name;

		if(socketId)
			this.socketId = socketId;
		else
			this.socketId = null;

		this.socketAdd = function(id)
		{
			_self.socketId = id;
		};

		this.socketRemove = function()
		{
			_self.socketId = null;
		};

		//store
		Lists.User.push(this);
	},

	Chat:function(name){			// Create chats here
		if(typeof name != 'string')
			name = 'NULL';

		//ref to self
		var _self = this;

		this.id = LastID.Chat ++;
		this.name = name;
		this.users = [];
		this.messages = [];			// array or messages

		this.addMessage = function(msg)
		{
			_self.messages.push(msg);
		};

		this.addUser = function(id)
		{
			_self.users.push(id);
		};

		//store
		Lists.Chat.push(this);

	},

	Message:function(fromUser, msg){
		if(typeof fromUser != 'number')
			fromUser = -1;
		if(typeof msg != 'string')
			msg = 'null';

		this.id = LastID.Message ++;
		this.fromUser = fromUser;
		this.msg = msg;
		this.timeStamp = Math.floor(new Date()/1000);
	}
};

//export function objects
var exp = module.exports;

//object factory
var EventData = function(object, action, code, message, body)
{
	//type check
	if(typeof object != 'string')	object = 'N/A';
	if(typeof action != 'string')	action = 'N/A';
	if(typeof code != 'number')		code = -1;
	if(typeof message != 'string')	message = 'N/A';
	if(typeof body != 'object')		body = {error: 'NO body given'};

	this.header = {
		'object': object,
		'action': action,
		'code': code,
		'message': message
	};
	this.body = body;
};

//socketId is optional, use for single response
function eventEmit(evnt, data, socket, socketId){

	if(!(data instanceof EventData))
		data = new EventData();

	if(socketId)
		socket.emit(evnt, msg);
	else
		socket.emit(evnt, msg, socketId);
};

//when user first registers
exp.userInit = function(data, socket){

	let response = {
			"object": "USER",
			"action": "INIT",
			"code": 1,
			"message": "",
			"details": {}
   };

	//see if username is taken
	for(var u in Lists.User)
		if(u.name == data.name)
		{
			response["message"] = "Username already taken";
		   socket.emit('userInit', response, socket.id);
		   return;
		}

	var user = new Schemas.User(data.name, socket.id);

	response["code"] = 0;
	response["details"] = {
		"userID": user.id
	};
	socket.emit('userInit', response, socket.id);

	//emit userID list to everyone
	response["details"] = {
		"userIDList": Lists.getUserIds()
	};
	socket.broadcast.emit('userListUpdate', response);
	response['code'] = 2;
	socket.emit('userListUpdate', response);

	console.log("YEE");

	// usersService.usersGetUserByUsername(data["details"]["username"]).then((res) => {
    //             if(res.length == 0) {
    //                 return usersService.usersCreateUser(data["details"]["username"]);
    //             }
    //             // Username already exists
    //             throw 0;
    //         }).then((res) => {
    //             let response = {
    //                 "object": "USER",
    //                 "action": "INIT",
    //                 "code": 0,
    //                 "message": "Username acquired successfully",
    //                 "details": {
    //                     username: data["details"]["username"]
    //                 }
    //             };
	// 			//add to temp database
	// 			var user = new Schemas.User(data.name, socket.id);
	//
	// 			console.log("FINE");
	// 			//Emit id to regitered user
	// 			response["details"] = {
	// 				"userID": user.id
	// 			};
	// 			socket.emit('userInit', response, socket.id);
	//
	// 			//emit userID list to everyone
	// 			response["details"] = {
	// 				"userIDList": Lists.User.getUserIds()
	// 			};
	// 			socket.broadcast.emit('userListUpdate', response);
	// 			socket.emit('userListUpdate', response);
	//
    //         }).catch((err) => {
    //             if(err == 0){
	// 				//username given already taken
	// 				console.log("TAKEN");
    //                 let response = {
    //                     "object": "USER",
    //                     "action": "INIT",
    //                     "code": 1,
    //                     "message": "Username is already taken",
    //                     "details": {}
    //                 };
    //                 socket.emit('userInit', response, socket.id);
    //                 return;
    //             }
	// 			//Database error
	// 			console.log("ERROR");
    //             let response = {
    //                 "object": "USER",
    //                 "action": "INIT",
    //                 "code": 2,
    //                 "message": "Database Error",
    //                 "details": {}
    //             };
    //             socket.emit('userInit', response, socket.id);
    //         });
};

/*
input:
{
	id: 'user id'
}

outputs:
{
	user: {user object}
}
*/
exp.userDetails = function(data, socket){
	//error checking
	if(typeof data.id != 'number')
	{
		//send error to client
		let msg = new EventData("User", "Details", 2, "Invalid id", {});
		exp.eventEmit('userDetails', msg, socket, socket.id);
		return;
	}

	var user = Lists.getUser(data.id);

	if(user.error != null){
		//send error to client
		let msg = new EventData("User", "Details", 1, "No user found", {'id': data.id});
		eventEmit('userDetails', msg, socket, socket.id);
		return;
	}

	let msg = new EventData("User", "Details", 0, "success", {'user': user});
	eventEmit('userDetails', msg, socket, socket.id);
};

/*
input:
{
	name: 'chat name',
	users: [array of userids]
}
output:
{
	chatIDs: []
}
*/
exp.chatInit = function(data, socket)
{
	var chat = new Schema.Chat(data['name']);

	for(var userId in data['users'])
	{
		//add users to chat
		chat.addUser(userId);

		//send clients involded list of chat ids
		let msg = new EventData('Chat', 'Init', 0, 'success',
		{
			'chats': Lists.getChatsForUser(userId)
		});

		if(user.socketId != null)
			eventEmit('chatInit', msg, socket, Lists.getUser(userId).socketId);
		else
			console.log("ERROR: User <" + user.name + "> does not have a socket");
	}
};

/*
Returns chat with all messages
TODO: return specified amount of messages
input:
{
	id: 'chat id'
}
output:
{
	chat: {chat object}
}
*/
exp.chatDetails = function(data, socket){
	//error checking
	if(typeof data.id != 'number')
	{
		//send error to client
		let msg = new EventData('Chat', 'Details', 2, 'Invalid chat id', {'id': data.id});
		eventEmit('chatDetails', msg, socket, socket.id);
		return;
	}

	var chat = Lists.getChat(data.id);

	if(chat.error != null)
	{
		//send error to client
		let msg = new EventData('Chat', 'Details', 1, 'No chat found', {'id': data.id});
		eventEmit('chatDetails', msg, socket, socket.id);
		return;
	}

	//send client
	let msg = new EventData('Chat', 'Details', 0, 'success', {'chat': chat});
	eventEmit('chatDetails', msg, socket, socket.id);
};

/*
Adds
inputs:
{
	chatId: 'chat id',
	fromUser: 'user id',
	message: 'string'
}
outputs:
{
	chat: 'chat id' // return id of chat
}
*/
exp.messageAdd = function(data, socket){
	//error checking
	var errors = '';
	if(typeof data.chatId != 'number')
		errors += ' invalid chat id;';
	if(typeof data.fromUser != 'number')
		errors += ' invalid from user id;';
	if(typeof data.message != 'string')
		errors += ' invalid message string';
	if(errors != '')
	{
		//send error to client
		let msg = new EventData('Chat', 'messageAdd', 2, errors, {'data': data});
		eventEmit('messageAdd', msg, socket, socket.id);
		return;
	}

	var chat = Lists.getChat(data.chatId);
	if(chat.error)
	{
		//send error to client
		let msg = new EventData('Chat', 'messageAdd', 2, 'No chat found', {'data': data});
		eventEmit('messageAdd', msg, socket, socket.id);
		return;
	}

	//add message
	chat.addMessage(new Schemas.Message(data.fromUser, data.message));

	//send chat id to all clients involved
	let msg = new EventData('Chat', 'messageAdd', 0, 'success', {'chat': chat.id});
	for(var userId in chat.users)
	{
		let user = Lists.getUser(userId);
		if(user.socketId != null)
			eventEmit('messageAdd', msg, socket, user.socketId);
		else
			console.log("ERROR: user <" + user.name + "> has no socket");
	}
};
