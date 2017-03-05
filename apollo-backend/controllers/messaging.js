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
var LastID = {
	User: 0,
	Chat: 0,
	Message: 0
};

//Stores data
//TODO: move all data storage to mySQL
var Lists = {
	User:[],
	Chat:[],
	getUserIds:function(){
		var arr = [];
		for(var i = 0; i < Lists.User.length; i ++)
			arr.push(Lists.User[i].id);
		
		return arr;
	},

	getUser: function(id){
		//error checking
		if(typeof id != 'number')
			return {error: 'invalid id'};	
		
		for(var i = 0; i < Lists.User.length; i ++)
			if(Lists.User[i].id == id)
				return {user : Lists.User[i]};

		return {error: 'No user found'};
	},
	
	getChatIds: function(){
		var arr = [];
		for(var i = 0; i < Lists.Chat.length; i ++)
			arr.push(Lists.Chat[i].id);

		return arr;
	},	

	getChat: function(id){
		//error checking
		if(typeof id != 'number')
			return {error: 'invalid id'};	
		
		for(var i = 0; i < Lists.Chat.length; i ++)
			if(Lists.Chat[i].id == id)
				return {user : Lists.Chat[i]};

		return {error: 'No chat found'};

	}
};

//constructs data
var Schemas = {
	User:function(name){ 			// Create users here
		if(typeof name != 'string')
			name = 'NULL';

		this.id = LastID.User ++;
		this.name = name;

		//store
		Lists.User.push(this);
	},

	Chat:function(name, user1, user2){			// Create chats here
		if(typeof name != 'string')
			name = 'NULL';
		if(typeof user1 != 'number')
			user1 = -1;
		if(typeof user2 != 'number')
			user2 = -1;	
 
		//ref to self
		var _self = this;

		this.id = LastID.Chat ++;
		this.name = name;
		this.users = [user1, user2];
		this.messages = [];			// array or messages			

		this.addMessage = function(msg)
		{
			_self.messages.push(msg);
		}

		//store
		Lists.Chat.push(this);

	},

	Message:function(fromUser, msg){
		if(typeof fromUser != 'number')
			fromUser = -1;
		if(typeof msg != 'string')
			msg = 'null';

		this.id = LastID.Message ++;
		this.from = fromUser;
		this.msg = msg;
		this.timeStamp = Math.floor(new Date()/1000);
	}
};

//export function objects
var exp = module.exports;

var eventEmit = function(socket, evnt, object, action, code, message, data){

	var msg = {
		"object": object,
		"action": action,
		"code": code,
		"message": message,
		"details": data		//change to "data"???
	};

	socket.emit(evnt, msg);
};

exp.User = {};
exp.Chat = {};

//send error message to client on faulty message
exp.sendError = function(fromEvent, errorMsg, clientData, socket){
	//error checking
	if(typeof clientData != 'object')
	{
		console.error('sendError: clientData not an object');
		return;
	}

	var errorData = {
		error: fromEvent + ': ' + errorMsg
	};

	//send client data with error object
	for(var keys in clientData)
		if(clientData.hasOwnProperty(key))
			errorData[key] = clientData[key];

	socket.emit('error', errorData, socket.id);

};

//when user first registers
exp.User.init = function(data, socket){
	usersService.usersGetUserByUsername(data["details"]["username"]).then((res) => {
                if(res.length == 0) {
                    return usersService.usersCreateUser(data["details"]["username"]);             
                }
                // Username already exists
                throw 0;
            }).then((res) => {
                let response = {
                    "object": "USER",
                    "action": "INIT",
                    "code": "1",
                    "message": "Username acquired successfully",
                    "details": {
                        username: data["details"]["username"]
                    }
                };
                socket.emit('userInit', JSON.stringify(response));
            }).catch((err) => {
                if(err == 0){
                    let response = {
                        "object": "USER",
                        "action": "INIT",
                        "code": "0",
                        "message": "Username is already taken",
                        "details": {}
                    };
                    socket.emit('userInitError', JSON.stringify(response));    
                    return;
                }
                let response = {
                    "object": "USER",
                    "action": "INIT",
                    "code": "2",
                    "message": "Database Error",
                    "details": {}
                };
                socket.emit('userInitError', JSON.stringify(response));           
            }); 
};

//on initial connect to chat
//namespace: UserInit
/*
input:
{
	name: 'name'
}

output:
{
	userIds: []
}
*/
exp.User.add = function(data, socket){
	//error checking
	if(typeof data.name != 'string')
	{
		//send error to client
		exp.sendError('User.add', 'Invalid user name', data, socket);
		return;
	}

	//create user 
	new Schemas.User(data.name);
    //console.log("USERSSS: " + JSON.stringify(Lists.User));
	
	//send new user list to all clients
	socket.emit('userIdList', {
		userIds: Lists.getUserIds()
	});
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
exp.User.get = function(data, socket, sockId){
	//error checking
	if(typeof data.id != 'number')
	{
		//send error to client
		exp.sendError('User.get', 'invalid user id', data, socket);
		return;
	}

	var user = Lists.getUser(data.id);

	if(user.error != null){
		//send error to client
		exp.sendError('User.get', user.error, data, socket);
		return;
	}

	socket.emit('userData', {
		user: user 
	}, sockId);
};

/*
input:
{
	name: 'chat name',
	user1: 'user id',
	user2: 'user id'
}
output: 
{
	chatIDs: []
}
*/
exp.Chat.add = function(data, socket){
	//error checking
	var errors = '';
	if(typeof data.name != 'string')
		errors += 'invalid chat name; ';
	if(typeof data.user1 != 'number')
		errors += 'invlid user1 id; ';
	if(typeof data.user2 != 'number')
		errors != 'invalid user2 id';
	if(errors != '')
	{
		//send error to client
		exp.sendError('Chat.add', errors, data, socket);
		return;
	}
	
	//send client list of chat ids
	socket.emit('chatIdList', {
		chatIds: Lists.getChatIds()
	});

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
exp.Chat.get = function(data, socket, sockId){
	//error checking
	if(typeof data.id != 'number')
	{
		//send error to client
		exp.sendError('Chat.get', 'Invalid caht id', data, socket);
		return;
	}

	var chat = Lists.getChat(data.id);

	if(chat.error != null)
	{
		//send error to client
		exp.sendError('Chat.get', chat.error, data, socket);
		return;
	}

	//send client
	socket.emit('chatData', {
		chat: chat
	}, sockId);
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
exp.Chat.addMessage = function(data, socket){
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
		exp.sendError('Chat.addMessage', errors, data, socket);
		return;
	}
	
	var chat = Lists.getChat(data.chatId);
	if(chat.error)
	{
		//send error to client
		exp.sendError('Chat.addMessage', chat.error, data, socket);
		return;
	}

	//add message
	chat.addMessage(new Schemas.Message(data.fromUser, data.message));

	//send chat id
	socket.emit('chatUpdated', {
		chat: chat.id
	});
};
