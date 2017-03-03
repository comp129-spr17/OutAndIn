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
        "message": [],
        "userInit": [],
        "userInitError": []
    };
    this.socket = require('socket.io-client')('http://localhost:4200');
    var self = this;
    this.socket.on('message', function(data) {
        for(var index in self._events["message"]){
            var func = self._events["message"][index]["callback"];
            func(data);
        }
    });
    this.socket.on('userInit', function(data){
        for(var index in self._events["userInit"]){
            var func = self._events["userInit"][index]["callback"];
            func(data);
        }
    });
    this.socket.on('userInitError', function(data){
        for(var index in self._events["userInitError"]){
            var func = self._events["userInitError"][index]["callback"];
            func(data);
        }       
    });
};

Apollo.prototype.socketRegisterEvent = function(eventName, func) {
    this._events[eventName].push({callback: func});
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

Apollo.prototype.usersGetAll = function(){
    return this._get('users', {});
};

Apollo.prototype.sendMessage = function(msg){
    this.socket.emit('message', msg);
};

Apollo.prototype.userInit = function(username){
    let req = {
        "object": "USER",
        "action": "INIT",
        "details": {
            "username": username
        }
    };
    this.socket.emit('userInit', req);
};

Apollo.prototype.userAdd = function(msg){
    this.socket.emit('addUser', msg);
};
Apollo.prototype.userGet = function(msg){
    this.socket.emit('getUser', msg);
};
Apollo.prototype.chatAdd = function(msg){
    this.socket.emit('addChat', msg);
};
Apollo.prototype.chatGet = function(msg){
    this.socket.emit('getChat', msg);
};
Apollo.prototype.message = function(msg){
    this.socket.emit('addMessage', msg);
};







module.exports = Apollo;
