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
        "userInit": [],		// array of callbacks
		"userDetails": [],
		"chatInit": [],
		"chatDetails": [],
		"messageAdd": [],
        "userIDList": [],
        "usersConnected": []
    };
    this.socket = require('socket.io-client')('http://localhost:4200');
    var _self = this;

	this.socket.on("usersConnected", function(data)
	{
		for(var index in _self._events["usersConnected"])
		{
			_self._events["usersConnected"][index](data);
		}
    });

	this.socket.on("userInit", function(data)
	{
		for(var index in _self._events["userInit"])
		{
			_self._events["userInit"][index](data);
		}
    });
	this.socket.on("userDetails", function(data)
	{
		for(var index in _self._events["userDetails"])
		{
			_self._events["userDetails"][index](data);
		}
	});
	this.socket.on("chatInit", function(data)
	{
		for(var index in _self._events["chatInit"])
		{
			_self._events["chatInit"][index](data);
		}
	});
	this.socket.on("chatDetails", function(data)
	{
		for(var index in _self._events["chatDetails"])
		{
			_self._events["chatDetails"][index](data);
		}
	});
	this.socket.on("messageAdd", function(data)
	{
		for(var index in _self._events["messageAdd"])
		{
			_self._events["messageAdd"][index](data);
		}
	});
	this.socket.on("userIDList", function(data)
	{
		for(var index in _self._events["userIDList"])
		{
			_self._events["userIDList"][index](data);
		}
	});

	//creates on evetns for all keys in _events
	// for(var evnt in this._events)
	// {
	// 	console.log(evnt);
	// 	this.socket.on(evnt, function(data)
	// 	{
	// 		console.log("FIRE: " + evnt);
	//         for(var index in _self._events[evnt])
	// 		{
	//             _self._events[evnt][index](data);
	//         }
	//     });
	// }
};

Apollo.prototype.socketRegisterEvent = function(eventName, func) {
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
    return axios.get(getURL);
};

Apollo.prototype._post = function(url, parameters){
	var getUrl = '';
	getUrl = this.API_URL + '/' + url;
	return axios.post(getUrl, parameters);
}

Apollo.prototype.usersGetAll = function()
{
    return this._get('users', {});
};

//emit events

// {name: 'name'}
Apollo.prototype.userInit = function(msg)
{
	//console.log("EMIT: User init");
	return this._post('users/create', msg);
    // this.socket.emit('userInit', msg);
};

// {id: #}
Apollo.prototype.userDetails = function(msg)
{
	//console.log("EMIT: User Details");
    //this.socket.emit('userDetails', msg);
    EventBus.dispatch("userDetails");
};

Apollo.prototype.userGetUserByID = function(id){
    return this._get('users/id/' + id, {});
};

Apollo.prototype.userIDList = function(msg)
{
	this.socket.emit('userIDList');
};

Apollo.prototype.userGetUsers = function(){
    return this._get('users', {});
};

//{name: 'chat name'}
Apollo.prototype.chatInit = function(msg)
{
	//console.log("EMIT: Chat init");

	this.socket.emit('chatInit', msg);
};

//{id: #}
Apollo.prototype.chatDetails = function(msg)
{
	//console.log("EMIT: Chat details");

	this.socket.emit('chatDetails', msg);
};

//{chatId: # fromUser: #, message: 'string'}
Apollo.prototype.messageAdd = function(msg)
{
	//console.log("EMIT: message add");

	this.socket.emit('messageAdd', msg);
};

//input: {user: id}
Apollo.prototype.userSetSocketID = function(msg){
	this.socket.emit('usersStoreSocketID', msg);
};

module.exports = Apollo;
