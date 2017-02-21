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

//on initial connect
//namespace: UserInit
/*input:
{
	name: 'name'
}
*/
module.exports.connect = function(data){
	//create user 
	new Schemas.User(data.name);
	console.log('User added: ' + Lists.User.toString());
};

