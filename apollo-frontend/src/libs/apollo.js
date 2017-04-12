var axios = require('axios');
var EventBus = require('eventbusjs');

var Apollo = function(){
	this.API_URL = 'http://localhost:4200/api/v1';
	//axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem('token');
	console.log("token: " + this.sessionToken);
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
	console.log('Dispatch: ' + eventName);
	EventBus.dispatch(eventName);
};

Apollo.prototype._get = function(url, parameters){
	//parameters = extend(parameters, this.credentials); // Add credentials to parameters
	var getURL = "";
	if(JSON.stringify(parameters) != '{}') {
		console.log("par");
		var parString = "";
		for(var key in parameters){
			if(parameters.hasOwnProperty(key)){
				parString += key + '=' + parameters[key];
			}
		}
		getURL = this.API_URL + '/' + url + '?' + parString; // Construct URL with parameters
	} else {
		getURL = this.API_URL + '/' + url;
	}
	console.log("url:" + "asdsad");
	return axios.get(getURL, {
		withCredentials: true,
		headers:{
			"Authorization": "Bearer " + localStorage.getItem("token")
		}
	});
};

Apollo.prototype._post = function(url, parameters){
	var getUrl = '';
	getUrl = this.API_URL + '/' + url;
	return axios.post(getUrl, parameters, {withCredentials: true});
};

Apollo.prototype._delete = function(url, parameters){
	//parameters = extend(parameters, this.credentials); // Add credentials to parameters
	var getURL = "";
	getURL = this.API_URL + '/' + url;
	return axios.delete(getURL, {withCredentials: true});
};

//##########################################
//USERS-------------------------------------
Apollo.prototype.usersGetAll = function(){
	return this._get('users', {});
};

// {name: 'name'}
Apollo.prototype.usersInit = function(name){
	return this._post('users', {
		name: name
	});
};

// {id}
Apollo.prototype.userGet = function(id){
	return this._get('users/' + id, {});
};

//get self info
Apollo.prototype.userGetMe = function(){
	return this._get('users/me', {});
};

//input: {user: id}
Apollo.prototype.userSetSocketID = function(userID){
	this.socket.emit('usersStoreSocketID', {
		user: userID	
	});
};

//CHATS--------------------------------------
Apollo.prototype.chatsGetAll = function(){
	return this._get('chats', {});
};

//{friend: id}
Apollo.prototype.chatsInit = function(friend){
	return this._post('chats', {
		friendID: friend
	});
};

//{id: #}
Apollo.prototype.chatGetDetails = function(chatID){
	return this._get('chats/' + chatID, {});
};

//{chatID: #, userID: #}
Apollo.prototype.chatAddUser = function(chatID, userID){
	console.log('ADDING: ' + msg.userID);
	return this._post('chats/' + chatID + '/users', {
		userID: userID	
	});
};

//{id: #}
Apollo.prototype.chatGetMessage = function(chatID){
	return this._get('chats/messages/' + chatID, {});
};

//{chatID: #, userID: #, message: 'text'}
Apollo.prototype.chatAddMessage = function(chatID, userID, message){
	return this._post('chats/messages/' + chatID, {
		userID: userID,
		messageText: message
	});
};

//SESSIONS------------------------------------------
Apollo.prototype.sessionLogin = function(data){
	return this._post('session', data);
};

Apollo.prototype.sessionRegister = function(data){
	return this._post('register', data);
};

Apollo.prototype.sessionLogout = function(){
	return this._delete('session', {});
};

//Search-------------------------------------------
Apollo.prototype.search = function(keyword){
	return this._get('search/' + keyword, {});
};

module.exports = Apollo;
