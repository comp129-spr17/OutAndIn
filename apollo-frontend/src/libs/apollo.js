var axios = require('axios');
var EventBus = require('eventbusjs');

var Apollo = function(){
	this.API_URL = 'http://localhost:4200/api/v1';
	this.credentials = {
		client_id: "",
		api_key: ""
	};
	this.socketEvents();
};

Apollo.prototype.socketEvents = function(){
	this._events = {
		"userInit": [], 	// array of callbacks
		"userDetails": [],
		"chatInit": [],
		"chatDetails": [],
		"messageAdd": [],
		"userIDList": [],
		"usersConnected": [],
		"chatsListUpdate": []
    };
    this.socket = require('socket.io-client')('http://localhost:4200');
    var _self = this;

	this.socket.on("chatsListUpdate", function(data){
		for(var index in _self._events["chatsListUpdate"]){
			_self._events["chatsListUpdate"][index](data);
		}
	});

	this.socket.on("usersConnected", function(data){
		for(var index in _self._events["usersConnected"]){
			_self._events["usersConnected"][index](data);
		}
    });

	this.socket.on("userInit", function(data){
		for(var index in _self._events["userInit"]){
			_self._events["userInit"][index](data);
		}
    });
	this.socket.on("userDetails", function(data){
		for(var index in _self._events["userDetails"]){
			_self._events["userDetails"][index](data);
		}
	});
	this.socket.on("chatInit", function(data){
		for(var index in _self._events["chatInit"]){
			_self._events["chatInit"][index](data);
		}
	});
	this.socket.on("chatDetails", function(data){
		for(var index in _self._events["chatDetails"]){
			_self._events["chatDetails"][index](data);
		}
	});
	this.socket.on("messageAdd", function(data){
		for(var index in _self._events["messageAdd"]){
			_self._events["messageAdd"][index](data);
		}
	});
	this.socket.on("userIDList", function(data){
		for(var index in _self._events["userIDList"]){
			_self._events["userIDList"][index](data);
		}
	});
};

Apollo.prototype.socketRegisterEvent = function(eventName, func){
	this._events[eventName].push(func);
	//EventBus.addEventListener(eventName, func);
};

Apollo.prototype.eventBusRegisterEvent = function(eventName, func){
	EventBus.addEventListener(eventName, func);
};

Apollo.prototype.eventBusDispatchEvent = function(eventName){
	EventBus.dispatch(eventName);
};

Apollo.prototype._get = function(url, parameters){
	//parameters = extend(parameters, this.credentials); // Add credentials to parameters
	var getURL = "";
	if(parameters.length > 0) {
		getURL = this.API_URL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters
	} else {
		getURL = this.API_URL + '/' + url;
	}
	return axios.get(getURL, {withCredentials: true});
};

Apollo.prototype._post = function(url, parameters){
	var getUrl = '';
	getUrl = this.API_URL + '/' + url;
	return axios.post(getUrl, parameters, {withCredentials: true});
}

//USERS
Apollo.prototype.usersGetAll = function(){
	return this._get('users', {});
};

// {name: 'name'}
Apollo.prototype.userInit = function(msg){
	return this._post('users', msg);
};

// {id: #}
Apollo.prototype.userDetails = function(msg){
	EventBus.dispatch("userDetails");
};

Apollo.prototype.userGetUserByID = function(id){
	return this._get('users/id/' + id, {});
};

//input: {user: id}
Apollo.prototype.userSetSocketID = function(msg){
	this.socket.emit('usersStoreSocketID', msg);
};

//get self info
Apollo.prototype.userGetMe = function(){
	return this._get('users/me', {});
};

//CHATS

//{id: #}
Apollo.prototype.chatGetAllByUser = function(msg){
	return this._get('chats/byUser/' + msg.id, {});
};

//{}
Apollo.prototype.chatInit = function(msg){
	return this._post('chats/create', {});
};

//{id: #}
Apollo.prototype.chatGetChatDetails = function(msg){
	return this._get('chats/id/' + msg.id, {});
};

//{chatID: #, userID: #}
Apollo.prototype.chatAddUser = function(msg){
	return this._post('chats/addUser', msg);
};

//{id: #}
Apollo.prototype.chatGetMessage = function(msg){
	return this._get('chats/messages/' + msg.id, {});
};

//{chatID: #, userID: #, message: 'text'}
Apollo.prototype.chatAddMessage = function(msg){
	return this._post('chats/messages', msg);
};

//SESSIONS
Apollo.prototype.sessionLogin = function(data){
	return this._post('session', data);
};

Apollo.prototype.sessionRegister = function(data){
	return this._post('register', data);
};

module.exports = Apollo;
