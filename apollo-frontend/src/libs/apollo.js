var axios = require('axios');

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
		"messageAdd": []
    };
    this.socket = require('socket.io-client')('http://localhost:4200');
    var _self = this;

	//creates on evetns for all keys in _events
	for(var evnt in this._events)
	{
		this.socket.on(evnt, function(data)
		{
	        for(var index in self._events[evnt])
			{
	            _self._events[evnt][index](data);
	        }
	    });
	}
};

Apollo.prototype.socketRegisterEvent = function(eventName, func) {
    this._events[eventName].push(func);
}

Apollo.prototype._get = function(url, parameters){
    //parameters = extend(parameters, this.credentials); // Add credentials to parameters
    return;
    var getURL = "";
    if(parameters.length > 0) {
        getURL = this.API_URL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters
    } else {
        getURL = this.API_URL + '/' + url;
    }
    return axios.get(getURL);
};

Apollo.prototype.usersGetAll = function()
{
    return this._get('users', {});
};

//emit events
Apollo.prototype.userInit = function(msg)
{
	this.socket.emit('userInit', msg);
};

Apollo.prototype.userDetails = function(msg)
{
	this.socket.emit('userDetails', msg);
};

Apollo.prototype.chatInit = function(msg)
{
	this.socket.emit('chatInit', msg);
};

Apollo.prototype.chatDetails = function(msg)
{
	this.socket.emit('chatDetails', msg);
};

Apollo.prototype.messageAdd = function(msg)
{
	this.socket.emit('messageAdd', msg);
};

module.exports = Apollo;
