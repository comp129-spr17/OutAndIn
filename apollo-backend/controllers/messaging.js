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
	Chat:[]
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

var msgSocket = function(socket){
	//define websockets here
};


var express = require('express');
var router = express.Router();

var globalMess = globalMess || [];

router.post('/global', function(req, res) {
    //Error handling
    if(!req.body.user)
        throw {message: "No user given"};
    if(!req.body.message)
        throw {message: "no message given"};
    if(typeof req.body.user != 'string')
        throw {message: "User is not a string"}
    if(typeof req.body.message != 'string')
        throw {message: "Message is not a string"}

	globalMess.push({
		user: req.body.user,
		message: req.body.message,
		timeStamp: Math.floor(Date.now() / 1000) // UNIX timestamp
	});

	res.send(JSON.stringify(globalMess));
});

module.exports = router;
