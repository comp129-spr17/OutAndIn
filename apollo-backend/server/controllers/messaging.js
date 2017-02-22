/**
 *  @(Project): Apollo Backend
 *  @(Filename): messaging.js
 *  @(Description): Messaging route handlers
 *  @(Authors): Out-N-In Team
 *  @(License): MIT
 */

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

exp.User = {};
exp.Chat = {};

//on initial connect
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
		socket.emit('error', {
			error: 'User.add: Invalid user name'
		});
		return;
	}

	//create user 
	new Schemas.User(data.name);
	
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
	id: 'user id',
	name: 'user name'
}
*/
exp.User.get = function(data, socket){
	//error checking
	if(typeof data.id != 'number')
	{
		socket.emit('error'{
			error: 'User.get: invalid user id',
			id: data.id
		});
		return;
	}

	var user = Lists.getUser(data.id).name;

	if(user.error != null){
		//send user from id
		socket.emit('userData', {
			id: data.id, 
			name: Lists.getUser(data.id).name
		});
	}else{
		socket.emit('error', {
			errors: 'User.get: no user found',
			id: data.id
		});
	}
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
		socket.emit('error', {
			error: 'Chat.add: ' + errors,
			name: data.name,
			user1: data.user1,
			user2: data.user2
		});
	}
	
	socket.emit('chatIdList'{
		chatIds: Lists.getChatIds()
	});

};

//TODO: getChat, addMessage
